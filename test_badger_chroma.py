import cv2
import numpy as np

img = cv2.imread('public/team/amra/sample_badger_40.png')
h, w, _ = img.shape

hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

bg_sample = hsv[100, 100]
print(f"Background HSV at (100, 100): {bg_sample}")
scarf_sample = hsv[310, 480]
print(f"Scarf HSV at (310, 480): {scarf_sample}")
badger_sample = hsv[220, 280]
print(f"Badger white fur HSV at (220, 280): {badger_sample}")
wand_sample = hsv[750, 250]
print(f"Wand HSV at (750, 250): {wand_sample}")

# Let's inspect the diamond icon around x=625, y=905
diamond_sample = hsv[905, 625]
print(f"Diamond icon HSV around (905, 625): {diamond_sample}")

# Green range
lower_green = np.array([38, 70, 40])
upper_green = np.array([85, 255, 255])
green_mask = cv2.inRange(hsv, lower_green, upper_green)

# Any background watermark in bottom right (x > 570 and y > 860 and outside character)
# If x > 560 and y > 850:
for y in range(860, min(950, h)):
    for x in range(580, min(660, w)):
        # If it's the diamond shape
        if hsv[y, x, 1] < 120 and hsv[y, x, 2] > 140:
            green_mask[y, x] = 255

# Despill algorithm
b, g, r = cv2.split(img.astype(np.float32))
spill_limit = np.maximum(r, b)
spill = np.maximum(0.0, g - spill_limit)
g_despilled = g - spill * 0.85
despilled = cv2.merge([b, g_despilled, r]).clip(0, 255).astype(np.uint8)

# Alpha matte with erosion and soft Gaussian feather
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
alpha = 255 - green_mask
alpha = cv2.erode(alpha, kernel, iterations=1)
alpha_soft = cv2.GaussianBlur(alpha, (5, 5), 1.2)

# Save composite on dark emerald background to verify quality
bg_emerald = np.zeros_like(img)
bg_emerald[:, :] = [4, 14, 7] # Dark emerald BGR

alpha_f = (alpha_soft / 255.0)[:, :, np.newaxis]
composite = (despilled * alpha_f + bg_emerald * (1 - alpha_f)).astype(np.uint8)

cv2.imwrite('public/team/amra/test_badger_composite.png', composite)
b_ch, g_ch, r_ch = cv2.split(despilled)
rgba = cv2.merge([b_ch, g_ch, r_ch, alpha_soft])
cv2.imwrite('public/team/amra/test_badger_transparent.png', rgba)

print("Saved test_badger_composite.png successfully")
