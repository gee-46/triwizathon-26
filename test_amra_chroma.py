import cv2
import numpy as np

img = cv2.imread('public/team/amra/sample_frame_50.png')
h, w, _ = img.shape

# Examine HSV values of background vs yellow robe/collar
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Background green sample (top left corner)
bg_sample = hsv[50, 50]
print(f"Background HSV at (50, 50): {bg_sample}")

# Let's check yellow collar sample (e.g. around x=260, y=240)
yellow_sample = hsv[240, 260]
print(f"Yellow collar HSV around (240, 260): {yellow_sample}")

# Cursor mask: in the top region y < 60, if it's near white (high value, low sat), treat as background
# Notice cursor at (175, 45):
print(f"Cursor HSV at (45, 175): {hsv[45, 175]}")

# Green range for chroma key:
# OpenCV Hue is 0-180. Pure green is around 60.
# Let's set lower_green = [42, 60, 40], upper_green = [85, 255, 255]
lower_green = np.array([42, 60, 40])
upper_green = np.array([85, 255, 255])
green_mask = cv2.inRange(hsv, lower_green, upper_green)

# Also mask the cursor in top area y < 70
# Any pixel in y < 70 that is white/grey cursor (e.g. S < 40 and V > 180) or where green_mask is active
for y in range(70):
    for x in range(w):
        # If it's near the cursor
        if hsv[y, x, 1] < 60 and hsv[y, x, 2] > 160:
            green_mask[y, x] = 255
        # If it's pure background
        if y < 35:
            green_mask[y, x] = 255

# Despill:
# Amra has yellow parts, so spill suppression should only suppress excess green where G > R and G > B
# For yellow parts, R is typically higher than or close to G.
b, g, r = cv2.split(img.astype(np.float32))
# Only despill if G > max(R, B) - i.e. pure green bounce on black robe/hair/edges
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

cv2.imwrite('public/team/amra/test_composite.png', composite)
cv2.imwrite('public/team/amra/test_alpha.png', alpha_soft)

b_ch, g_ch, r_ch = cv2.split(despilled)
rgba = cv2.merge([b_ch, g_ch, r_ch, alpha_soft])
cv2.imwrite('public/team/amra/test_transparent.png', rgba)

print("Saved test_composite.png and test_transparent.png")
