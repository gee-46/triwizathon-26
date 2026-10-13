import cv2
import numpy as np

img = cv2.imread('public/team/tanushree/sample_50.png')
h, w, _ = img.shape

hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Background sample (top left)
bg_sample = hsv[100, 100]
print(f"Background HSV at (100, 100): {bg_sample}")

# Robe lapel sample (around x=280, y=450)
lapel_sample = hsv[450, 280]
print(f"Robe lapel HSV at (450, 280): {lapel_sample}")

# Tie sample (around x=430, y=360)
tie_sample = hsv[360, 430]
print(f"Tie HSV at (360, 430): {tie_sample}")

# Snake sample (around x=550, y=830)
snake_sample = hsv[830, 550]
print(f"Snake HSV at (830, 550): {snake_sample}")

# Notice the bright lime green background:
# Hue is ~65, Sat is ~220, Val is ~195!
# While the robe lapel has Val ~ 60-80!
# Snake has Val ~ 50-90!
# So background has: Hue 48..75, Sat > 130, Val > 120!

lower_green = np.array([48, 120, 110])
upper_green = np.array([78, 255, 255])
green_mask = cv2.inRange(hsv, lower_green, upper_green)

# Remove diamond watermark at bottom right (x > 570, y > 850)
for y in range(860, min(950, h)):
    for x in range(580, min(660, w)):
        if hsv[y, x, 1] < 120 and hsv[y, x, 2] > 140:
            green_mask[y, x] = 255

# Despill algorithm:
# Only suppress green spill if it exceeds red and blue AND Val > 90
b, g, r = cv2.split(img.astype(np.float32))
spill_limit = np.maximum(r, b)
spill = np.maximum(0.0, g - spill_limit)
# Gentle despill to not dull the emerald robe
g_despilled = g - spill * 0.70
despilled = cv2.merge([b, g_despilled, r]).clip(0, 255).astype(np.uint8)

# Alpha matte with erosion and soft Gaussian feather
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
alpha = 255 - green_mask
alpha = cv2.erode(alpha, kernel, iterations=1)
alpha_soft = cv2.GaussianBlur(alpha, (5, 5), 1.2)

bg_emerald = np.zeros_like(img)
bg_emerald[:, :] = [4, 14, 7] # Dark emerald BGR

alpha_f = (alpha_soft / 255.0)[:, :, np.newaxis]
composite = (despilled * alpha_f + bg_emerald * (1 - alpha_f)).astype(np.uint8)

cv2.imwrite('public/team/tanushree/test_composite.png', composite)
print("Saved test_composite.png successfully")
