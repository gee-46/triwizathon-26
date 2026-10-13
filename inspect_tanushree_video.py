import cv2
import shutil

src = 'public/team/tanushree/tanushree-slytherin-source.mp4'
dst = 'public/team/tanushree/tanushree-slytherin.mp4'
shutil.copyfile(src, dst)

cap = cv2.VideoCapture(src)
fps = cap.get(cv2.CAP_PROP_FPS) or 24.0
total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
duration = total / fps if fps else 0

print(f"Tanushree Video: {w}x{h}, {total} frames at {fps} fps, {duration:.2f}s")

for p in [0.25, 0.5, 0.75]:
    idx = int(total * p)
    cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(f'public/team/tanushree/sample_{int(p*100)}.png', frame)

cap.release()
print("Saved sample frames successfully")
