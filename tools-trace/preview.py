#!/usr/bin/env python3
"""Render a traced JSON next to its source crop: python3 -I preview.py <frame.png> <x,y,w,h> <traced.json> <out.png>"""
import sys, json, numpy as np, cv2
img = cv2.imread(sys.argv[1]); x, y, w, h = map(int, sys.argv[2].split(',')); J = json.load(open(sys.argv[3]))
S = 3; crop = cv2.resize(img[y:y+h, x:x+w], (w*S, h*S), interpolation=cv2.INTER_CUBIC)
out = np.full_like(crop, (40, 30, 20))
for L in J['layers']:
    c = tuple(int(L['c'][i:i+2], 16) for i in (5, 3, 1))
    polys = [np.array(p, np.float32).reshape(-1, 2) * S for p in L['paths']]
    m = np.zeros(out.shape[:2], np.uint8)
    for p in polys: cv2.fillPoly(m, [p.astype(np.int32)], 255, lineType=cv2.LINE_AA) if False else None
    # even-odd: xor each polygon
    for p in polys:
        t = np.zeros_like(m); cv2.fillPoly(t, [np.round(p).astype(np.int32)], 255); m = cv2.bitwise_xor(m, t)
    out[m > 0] = c
cv2.imwrite(sys.argv[4], np.hstack([crop, out]))
