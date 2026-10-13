import cv2
import numpy as np
import subprocess
import os

input_video = 'public/team/amra/amra-wizard-source.mp4'
output_webm = 'public/team/amra/amra-wizard-transparent.webm'
output_poster = 'public/team/amra/amra-portrait-fallback.png'
output_poster_webp = 'public/team/amra/amra-portrait-fallback.webp'

cap = cv2.VideoCapture(input_video)
fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

print(f"Processing Amra's video: {w}x{h}, {total_frames} frames at {fps} fps")

ffmpeg_exe = r'C:\Users\Dell\AppData\Roaming\Python\Python313\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe'

ffmpeg_cmd = [
    ffmpeg_exe,
    '-y',
    '-f', 'rawvideo',
    '-vcodec', 'rawvideo',
    '-s', f'{w}x{h}',
    '-pix_fmt', 'rgba',
    '-r', str(fps),
    '-i', '-',
    '-c:v', 'libvpx-vp9',
    '-pix_fmt', 'yuva420p',
    '-b:v', '2500k',
    '-auto-alt-ref', '0',
    output_webm
]

proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE, stderr=subprocess.PIPE)

kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
lower_green = np.array([42, 60, 40])
upper_green = np.array([85, 255, 255])

poster_frame_idx = int(total_frames * 0.45)
poster_saved = False

for idx in range(total_frames):
    ret, frame = cap.read()
    if not ret:
        break
    
    # 1. Despill algorithm (suppress green bounce/fringing without hurting yellow Hufflepuff trim)
    b, g, r = cv2.split(frame.astype(np.float32))
    spill_limit = np.maximum(r, b)
    spill = np.maximum(0.0, g - spill_limit)
    g_despilled = g - spill * 0.85
    despilled = cv2.merge([b, g_despilled, r]).clip(0, 255).astype(np.uint8)

    # 2. Chroma key mask in HSV space
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    green_mask = cv2.inRange(hsv, lower_green, upper_green)

    # Remove recording cursor in top region y < 70
    for y in range(min(70, h)):
        for x in range(w):
            if hsv[y, x, 1] < 60 and hsv[y, x, 2] > 160:
                green_mask[y, x] = 255
            if y < 35:
                green_mask[y, x] = 255

    # 3. Alpha matte with edge feathering
    alpha = 255 - green_mask
    alpha = cv2.erode(alpha, kernel, iterations=1)
    alpha_soft = cv2.GaussianBlur(alpha, (5, 5), 1.2)

    # Combine into RGBA for FFmpeg
    b_ch, g_ch, r_ch = cv2.split(despilled)
    rgba = cv2.merge([r_ch, g_ch, b_ch, alpha_soft]) # RGBA order for rawvideo rgba

    # Write raw frame to FFmpeg stdin
    proc.stdin.write(rgba.tobytes())

    # Save representative still portrait for fallback
    if idx == poster_frame_idx:
        bgra = cv2.merge([b_ch, g_ch, r_ch, alpha_soft])
        cv2.imwrite(output_poster, bgra)
        cv2.imwrite(output_poster_webp, bgra)
        poster_saved = True

    if idx % 50 == 0:
        print(f"Processed frame {idx}/{total_frames} ({idx/total_frames*100:.1f}%)")

cap.release()
proc.stdin.close()
stderr_output = proc.stderr.read()
proc.wait()

print(f"Done! WebM return code: {proc.returncode}")
if os.path.exists(output_webm):
    print(f"Generated {output_webm}: {os.path.getsize(output_webm)} bytes")
if os.path.exists(output_poster):
    print(f"Generated {output_poster}: {os.path.getsize(output_poster)} bytes")
if os.path.exists(output_poster_webp):
    print(f"Generated {output_poster_webp}: {os.path.getsize(output_poster_webp)} bytes")
