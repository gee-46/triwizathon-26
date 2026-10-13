import cv2
import numpy as np
import subprocess
import os

ffmpeg_exe = r'C:\Users\Dell\AppData\Roaming\Python\Python313\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe'
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
lower_green = np.array([38, 70, 40])
upper_green = np.array([85, 255, 255])

tasks = [
    {
        'name': 'gautam',
        'src': 'public/team/gautam/gautam-wizard-source.mp4',
        'webm': 'public/team/gautam/gautam-wizard-transparent.webm',
        'poster': 'public/team/gautam/gautam-portrait-fallback.png',
        'poster_webp': 'public/team/gautam/gautam-portrait-fallback.webp'
    },
    {
        'name': 'jonathan',
        'src': 'public/team/jonathan/jonathan-wizard-source.mp4',
        'webm': 'public/team/jonathan/jonathan-wizard-transparent.webm',
        'poster': 'public/team/jonathan/jonathan-portrait-fallback.png',
        'poster_webp': 'public/team/jonathan/jonathan-portrait-fallback.webp'
    }
]

for t in tasks:
    print(f"\n==================== PROCESSING {t['name'].upper()} ====================", flush=True)
    cap = cv2.VideoCapture(t['src'])
    fps = cap.get(cv2.CAP_PROP_FPS) or 24.0
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    print(f"{t['name']}: {w}x{h}, {total} frames at {fps} fps", flush=True)

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
        t['webm']
    ]

    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)
    poster_idx = int(total * 0.40)

    for idx in range(total):
        ret, frame = cap.read()
        if not ret:
            break

        # Despill
        b, g, r = cv2.split(frame.astype(np.float32))
        spill_limit = np.maximum(r, b)
        spill = np.maximum(0.0, g - spill_limit)
        g_despilled = g - spill * 0.85
        despilled = cv2.merge([b, g_despilled, r]).clip(0, 255).astype(np.uint8)

        # Chroma key
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        green_mask = cv2.inRange(hsv, lower_green, upper_green)

        # Mask bottom right watermark diamond outside character
        for y in range(860, min(950, h)):
            for x in range(580, min(660, w)):
                if hsv[y, x, 1] < 120 and hsv[y, x, 2] > 140:
                    green_mask[y, x] = 255

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
            cv2.imwrite(t['poster'], bgra)
            cv2.imwrite(t['poster_webp'], bgra)
            print(f"Saved fallback poster for {t['name']}", flush=True)

        if idx % 40 == 0:
            print(f"[{t['name']}] Frame {idx}/{total} ({idx/total*100:.1f}%)", flush=True)

    cap.release()
    proc.stdin.close()
    proc.wait()
    print(f"Finished {t['name']}: {t['webm']} (Size: {os.path.getsize(t['webm'])} bytes)", flush=True)
