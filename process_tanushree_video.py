import cv2
import numpy as np
import subprocess
import os

ffmpeg_exe = r'C:\Users\Dell\AppData\Roaming\Python\Python313\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe'
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))

input_video = 'public/team/tanushree/tanushree-slytherin-source.mp4'
output_webm = 'public/team/tanushree/tanushree-wizard-transparent.webm'
output_poster = 'public/team/tanushree/tanushree-portrait-fallback.png'
output_poster_webp = 'public/team/tanushree/tanushree-portrait-fallback.webp'

cap = cv2.VideoCapture(input_video)
fps = cap.get(cv2.CAP_PROP_FPS) or 24.0
total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
print(f"Tanushree: {w}x{h}, {total} frames at {fps} fps", flush=True)

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
    '-b:v', '2600k',
    '-deadline', 'realtime',
    '-cpu-used', '4',
    '-auto-alt-ref', '0',
    output_webm
]

proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)
poster_idx = int(total * 0.45)

lower_green = np.array([48, 120, 110])
upper_green = np.array([78, 255, 255])

for idx in range(total):
    ret, frame = cap.read()
    if not ret:
        break

    # Despill (gentle to preserve emerald silk robe lapels)
    b, g, r = cv2.split(frame.astype(np.float32))
    spill_limit = np.maximum(r, b)
    spill = np.maximum(0.0, g - spill_limit)
    g_despilled = g - spill * 0.70
    despilled = cv2.merge([b, g_despilled, r]).clip(0, 255).astype(np.uint8)

    # Chroma key
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    green_mask = cv2.inRange(hsv, lower_green, upper_green)

    # Mask bottom right watermark diamond in air
    green_mask[870:940, 580:650] = 255

    # Alpha matte
    alpha = 255 - green_mask
    alpha = cv2.erode(alpha, kernel, iterations=1)
    alpha_soft = cv2.GaussianBlur(alpha, (5, 5), 1.2)

    # RGBA for ffmpeg
    b_ch, g_ch, r_ch = cv2.split(despilled)
    rgba = cv2.merge([r_ch, g_ch, b_ch, alpha_soft])
    proc.stdin.write(rgba.tobytes())

    if idx == poster_idx:
        bgra = cv2.merge([b_ch, g_ch, r_ch, alpha_soft])
        cv2.imwrite(output_poster, bgra)
        cv2.imwrite(output_poster_webp, bgra)
        print("Saved fallback poster for Tanushree", flush=True)

    if idx % 40 == 0:
        print(f"[Tanushree] Frame {idx}/{total} ({idx/total*100:.1f}%)", flush=True)

cap.release()
proc.stdin.close()
proc.wait()
print(f"Finished Tanushree: {output_webm} (Size: {os.path.getsize(output_webm)} bytes)", flush=True)
