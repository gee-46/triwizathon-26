import cv2
import numpy as np

img = cv2.imread('public/team/amra/sample_badger_40.png')
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

print("Area around (675, 555):")
for y in range(670, 685, 3):
    for x in range(550, 560, 3):
        print(f"({y},{x}): {hsv[y, x]}")
