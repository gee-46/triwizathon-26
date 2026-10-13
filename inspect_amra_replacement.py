import cv2
import os

video_path = 'public/team/amra/amra-wizard-source.mp4'
cap = cv2.VideoCapture(video_path)

fps = cap.get(cv2.CAP_PROP_FPS)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
duration = total_frames / fps if fps else 0

print(f"Amra Replacement Video Metadata: {w}x{h}, {total_frames} frames, {fps} fps, duration: {duration:.2f}s")

# Extract sample frames at 20%, 40%, 60%, 80%
for p in [0.2, 0.4, 0.6, 0.8]:
    idx = int(total_frames * p)
    cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
    ret, frame = cap.read()
    if ret:
        sample_path = f'public/team/amra/sample_badger_{int(p*100)}.png'
        cv2.imwrite(sample_path, frame)
        print(f"Saved {sample_path} from frame {idx}")

cap.release()
