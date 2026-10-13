import cv2
import numpy as np

img = cv2.imread('public/team/jonathan/sample_frame_50.png')
h, w, _ = img.shape

hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

bg_sample = hsv[50, 50]
print(f"Background HSV at (50, 50): {bg_sample}")
blue_sample = hsv[270, 240]
print(f"Blue cowl HSV at (270, 240): {blue_sample}")
broom_sample = hsv[500, 115]
print(f"Broomstick handle HSV at (500, 115): {broom_sample}")
bristles_sample = hsv[730, 130]
print(f"Broom bristles HSV at (730, 130): {bristles_sample}")

# Green range
lower_green = np.array([40, 60, 40])
upper_green = np.array([85, 255, 255])
green_mask = cv2.inRange(hsv, lower_green, upper_green)

# Cursor check in top region y < 60
for y in range(min(60, h)):
    for x in range(w):
        if hsv[y, x, 1] < 60 and hsv[y, x, 2] > 160:
            green_mask[y, x] = 255
        if y < 30:
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

cv2.imwrite('public/team/jonathan/test_composite.png', composite)
b_ch, g_ch, r_ch = cv2.split(despilled)
rgba = cv2.merge([b_ch, g_ch, r_ch, alpha_soft])
cv2.imwrite('public/team/jonathan/test_transparent.png', rgba)

print("Saved test_composite.png and test_transparent.png successfully")
