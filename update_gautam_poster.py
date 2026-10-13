import cv2
import numpy as np

img = cv2.imread('public/team/gautam/sample_new_50.png')
h, w, _ = img.shape

lower_green = np.array([38, 70, 40])
upper_green = np.array([85, 255, 255])

# Despill
b, g, r = cv2.split(img.astype(np.float32))
spill_limit = np.maximum(r, b)
spill = np.maximum(0.0, g - spill_limit)
g_despilled = g - spill * 0.85
despilled = cv2.merge([b, g_despilled, r]).clip(0, 255).astype(np.uint8)

# Chroma key
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
green_mask = cv2.inRange(hsv, lower_green, upper_green)

for y in range(860, min(950, h)):
    for x in range(580, min(660, w)):
        if hsv[y, x, 1] < 120 and hsv[y, x, 2] > 140:
            green_mask[y, x] = 255

kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
alpha = 255 - green_mask
alpha = cv2.erode(alpha, kernel, iterations=1)
alpha_soft = cv2.GaussianBlur(alpha, (5, 5), 1.2)

b_ch, g_ch, r_ch = cv2.split(despilled)
bgra = cv2.merge([b_ch, g_ch, r_ch, alpha_soft])
cv2.imwrite('public/team/gautam/gautam-portrait-fallback.png', bgra)
cv2.imwrite('public/team/gautam/gautam-portrait-fallback.webp', bgra)
print("Updated Gautam fallback poster to frame 120 where face is clear")
