import cv2

cap = cv2.VideoCapture('reference_screen_recording.mp4')
total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

for p in [0.2, 0.4, 0.6, 0.8, 0.98]:
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(total * p))
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(f'frame_{int(p*100)}.png', frame)

print("Frames extracted successfully")
