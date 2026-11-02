#!/usr/bin/env python3
"""Find a character's head box in a frame from its key colours: python3 -I autocrop.py <frame> <#hex,#hex,...> [--margin 14] [--tol 22]
prints x,y,w,h of the largest blob of pixels near those colours (the head: hair + skin)."""
import sys, numpy as np, cv2, argparse
ap = argparse.ArgumentParser(); ap.add_argument('frame'); ap.add_argument('cols'); ap.add_argument('--margin', type=int, default=14); ap.add_argument('--tol', type=float, default=22)
ap.add_argument('--ymax', type=int, default=None)
a = ap.parse_args(); im = cv2.imread(a.frame); lab = cv2.cvtColor(im, cv2.COLOR_BGR2LAB).astype(np.float32)
m = np.zeros(im.shape[:2], bool)
for hx in a.cols.split(','):
    c = np.array([[[int(hx[5:7], 16), int(hx[3:5], 16), int(hx[1:3], 16)]]], np.uint8); cl = cv2.cvtColor(c, cv2.COLOR_BGR2LAB).reshape(3).astype(np.float32)
    m |= np.sqrt(((lab - cl) ** 2).sum(-1)) < a.tol
if a.ymax: m[a.ymax:] = False
m = cv2.morphologyEx(m.astype(np.uint8) * 255, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
n, cc, st, _ = cv2.connectedComponentsWithStats(m); j = np.argmax(st[1:, cv2.CC_STAT_AREA]) + 1
x, y, w, h = st[j, :4]; M = a.margin; H, W = im.shape[:2]
x0, y0 = max(0, x - M), max(0, y - M); x1, y1 = min(W, x + w + M), min(H, y + h + (M if not a.ymax else 2))
print(f'{x0},{y0},{x1 - x0},{y1 - y0}')
