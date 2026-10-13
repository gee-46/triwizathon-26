import cv2
import numpy as np
import os

width = 1920
height = 1080
fps = 30
total_frames = 210  # 7.0 seconds

img_est = cv2.imread('public/intro/bridge-establishing.jpg')
img_app = cv2.imread('public/intro/bridge-approach.jpg')
img_cld = cv2.imread('public/intro/clouds-overlay.jpg')
img_ent = cv2.imread('public/intro/castle-entrance.jpg')

# Resize all source images to 1920x1080
img_est = cv2.resize(img_est, (width, height))
img_app = cv2.resize(img_app, (width, height))
img_cld = cv2.resize(img_cld, (width, height))
img_ent = cv2.resize(img_ent, (width, height))

fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out_path = 'public/intro/hogwarts-arrival.mp4'
out = cv2.VideoWriter(out_path, fourcc, fps, (width, height))

def zoom_pan(img, scale, dx=0, dy=0):
    """Smooth camera zoom and translation"""
    h, w = img.shape[:2]
    # new dimensions
    nw, nh = int(w * scale), int(h * scale)
    resized = cv2.resize(img, (nw, nh), interpolation=cv2.INTER_LINEAR)
    
    # center crop back to w, h with offsets
    start_x = max(0, int((nw - w) / 2 + dx * (scale - 1) * w * 0.2))
    start_y = max(0, int((nh - h) / 2 + dy * (scale - 1) * h * 0.2))
    
    crop = resized[start_y:start_y+h, start_x:start_x+w]
    if crop.shape[0] != h or crop.shape[1] != w:
        crop = cv2.resize(crop, (w, h))
    return crop

print("Rendering cinematic camera frames...")

for i in range(total_frames):
    t = i / float(total_frames)  # 0.0 to 1.0
    
    # Cinematic multi-phase camera journey:
    # Phase 1: 0.00 - 0.32 (Beat A & early B: establishing bridge flight)
    # Phase 2: 0.28 - 0.60 (Beat B & C: approaching through bridge torches into clouds)
    # Phase 3: 0.55 - 0.85 (Beat C & D: piercing clouds and revealing illuminated castle)
    # Phase 4: 0.80 - 1.00 (Beat D & E: gliding into grand entrance portal)
    
    if t < 0.30:
        # Establishing flight
        prog = t / 0.30
        scale = 1.0 + 0.16 * prog
        frame = zoom_pan(img_est, scale, dx=0.05, dy=-0.08)
        
    elif t < 0.58:
        # Crossfade from establishing to bridge approach with forward camera push
        prog = (t - 0.28) / 0.30
        blend = 0.5 - 0.5 * np.cos(prog * np.pi)  # smooth cosine ease
        
        frame1 = zoom_pan(img_est, 1.16 + 0.12 * prog, dx=0.05, dy=-0.08)
        frame2 = zoom_pan(img_app, 1.0 + 0.18 * prog, dx=0.0, dy=-0.04)
        frame = cv2.addWeighted(frame1, 1 - blend, frame2, blend, 0)
        
    elif t < 0.82:
        # Emerging through clouds into castle entrance
        prog = (t - 0.56) / 0.26
        blend = 0.5 - 0.5 * np.cos(prog * np.pi)
        
        frame2 = zoom_pan(img_app, 1.18 + 0.12 * prog, dx=0.0, dy=-0.04)
        frame3 = zoom_pan(img_ent, 1.0 + 0.16 * prog, dx=0.0, dy=-0.02)
        
        # Volumetric cloud sweep
        cloud_alpha = np.sin(prog * np.pi) * 0.45
        cloud_layer = zoom_pan(img_cld, 1.0 + 0.3 * prog, dx=0.2 * prog, dy=0.0)
        
        blended_scene = cv2.addWeighted(frame2, 1 - blend, frame3, blend, 0)
        frame = cv2.addWeighted(blended_scene, 1 - cloud_alpha, cloud_layer, cloud_alpha, 0)
        
    else:
        # Arriving at grand illuminated entrance
        prog = (t - 0.80) / 0.20
        scale = 1.14 + 0.18 * (prog ** 1.3)
        frame = zoom_pan(img_ent, scale, dx=0.0, dy=-0.02)
        
        # Slight warm light blooming as we get close to the entrance
        if prog > 0.5:
            bloom_prog = (prog - 0.5) / 0.5
            warm_tint = np.zeros_like(frame)
            warm_tint[:, :] = (20, 60, 90) # subtle golden glow in BGR
            frame = cv2.addWeighted(frame, 1.0, warm_tint, bloom_prog * 0.25, 0)
    
    # Add subtle vignette & filmic contrast
    out.write(frame)

out.release()
print(f"Video generated successfully at: {out_path}, size: {os.path.getsize(out_path)} bytes")
