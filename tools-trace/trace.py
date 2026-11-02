#!/usr/bin/env python3
"""Trace a flat-colour cartoon character out of a video frame into vector polygons (JSON).

usage: python3 -I trace.py <frame.png> <x,y,w,h crop> <out.json> [--k 10] [--scale 3] [--fg x,y,w,h] [--cut-below Y]

  1. crop the region, upscale it (smoother contours)
  2. separate the character from the background with GrabCut (initialised with --fg, the character's box inside the crop)
  3. quantise the character's pixels to k flat colours (k-means), merge near-identical colours
  4. for every colour: mask -> clean -> contours with holes -> simplified polygons
Output: { w, h, layers: [ { c: '#rrggbb', area, paths: [ [x0,y0,x1,y1,...], ... ] } ] } in crop pixels (before upscale),
layers sorted largest first, so drawing in order (even-odd per layer) rebuilds the character exactly.
"""
import sys, json, argparse
import numpy as np, cv2

ap = argparse.ArgumentParser()
ap.add_argument('frame'); ap.add_argument('crop'); ap.add_argument('out')
ap.add_argument('--k', type=int, default=10); ap.add_argument('--scale', type=int, default=3)
ap.add_argument('--fg', default=None); ap.add_argument('--cut-below', type=int, default=None)
ap.add_argument('--eps', type=float, default=1.2); ap.add_argument('--min-area', type=float, default=30)
ap.add_argument('--mask-out', default=None)
a = ap.parse_args()

img = cv2.imread(a.frame)
x, y, w, h = map(int, a.crop.split(','))
crop = img[y:y + h, x:x + w].copy()
S = a.scale
big = cv2.resize(crop, (w * S, h * S), interpolation=cv2.INTER_CUBIC)
big = cv2.bilateralFilter(big, 9, 40, 9)

# ---- foreground
mask = np.zeros(big.shape[:2], np.uint8)
if a.fg:
    fx, fy, fw, fh = map(int, a.fg.split(','))
    rect = (fx * S, fy * S, fw * S, fh * S)
else:
    rect = (4, 4, w * S - 8, h * S - 8)
bgd = np.zeros((1, 65), np.float64); fgd = np.zeros((1, 65), np.float64)
cv2.grabCut(big, mask, rect, bgd, fgd, 6, cv2.GC_INIT_WITH_RECT)
fg = np.where((mask == 1) | (mask == 3), 255, 0).astype(np.uint8)
fg = cv2.morphologyEx(fg, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
# keep the largest connected component(s)
n, lab, stats, _ = cv2.connectedComponentsWithStats(fg)
if n > 1:
    keep = np.argsort(-stats[1:, cv2.CC_STAT_AREA])[:1] + 1
    fg = np.isin(lab, keep).astype(np.uint8) * 255
# fill holes inside the silhouette
cnts, _ = cv2.findContours(fg, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
fg = np.zeros_like(fg); cv2.drawContours(fg, cnts, -1, 255, -1)
if a.cut_below is not None: fg[a.cut_below * S:, :] = 0
if a.mask_out: cv2.imwrite(a.mask_out, fg)

# ---- quantise
px = big[fg > 0].reshape(-1, 3).astype(np.float32)
crit = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 40, 0.5)
_, labels, centers = cv2.kmeans(px, a.k, None, crit, 4, cv2.KMEANS_PP_CENTERS)
# merge centres closer than 14 in Lab
lab_c = cv2.cvtColor(centers.reshape(-1, 1, 3).astype(np.uint8), cv2.COLOR_BGR2LAB).reshape(-1, 3).astype(float)
groups = list(range(a.k))
for i in range(a.k):
    for j in range(i):
        if np.linalg.norm(lab_c[i] - lab_c[j]) < 14: groups[i] = groups[j]
full = np.full(big.shape[:2], -1, np.int32); full[fg > 0] = np.array(groups)[labels.ravel()]
layers = []
for g in sorted(set(groups)):
    m = (full == g).astype(np.uint8) * 255
    if m.sum() == 0: continue
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
    sel = full == g
    col = big[sel].reshape(-1, 3).mean(0)   # the real average colour of the region
    cnts, hier = cv2.findContours(m, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
    paths = []
    for c in cnts:
        if cv2.contourArea(c) < a.min_area * S * S / 9: continue
        p = cv2.approxPolyDP(c, a.eps * S / 3 * 1.0, True).reshape(-1, 2) / S
        if len(p) < 3: continue
        paths.append([round(float(v), 2) for v in p.ravel()])
    if not paths: continue
    b, gg, r = [int(round(v)) for v in col]
    layers.append({'c': '#%02x%02x%02x' % (r, gg, b), 'area': int(m.sum() // 255), 'paths': paths})
layers.sort(key=lambda L: -L['area'])
json.dump({'w': w, 'h': h, 'layers': layers}, open(a.out, 'w'))
print(a.out, len(layers), 'layers', sum(len(L['paths']) for L in layers), 'paths', [L['c'] for L in layers])
