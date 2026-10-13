import cv2

for name, video_path in [('gautam', 'public/team/gautam/gautam-wizard-source.mp4'), ('jonathan', 'public/team/jonathan/jonathan-wizard-source.mp4')]:
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 24.0
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    duration = total / fps if fps else 0
    print(f"{name.upper()}: {w}x{h}, {total} frames at {fps} fps, {duration:.2f}s")
    for p in [0.25, 0.5, 0.75]:
        idx = int(total * p)
        cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
        ret, frame = cap.read()
        if ret:
            cv2.imwrite(f'public/team/{name}/sample_new_{int(p*100)}.png', frame)
    cap.release()
