#!/usr/bin/env python3
"""Trace a flat cartoon character from a frame into NAMED vector layers, using a palette sampled at given points.

usage: python3 -I trace2.py <frame.png> <x,y,w,h> <points.json> <out.json> [--scale 4] [--smooth 2.2] [--eps 0.7]
points.json: { "skin": [x, y], "hair": [x, y], ..., "_bg1": [x, y] }  (crop coordinates; names starting with "_" are
background and dropped). A name may hold a list of points ([[x,y],[x,y]]) averaged into one colour.
Each pixel takes the nearest palette colour (CIELAB); the label map is smoothed (one-hot gaussian + argmax) so edges are
clean curves; each kept label is contoured with holes and simplified.
Output: { w, h, order: [names], layers: { name: { c, paths: [[x,y,...]], box: [x0,y0,x1,y1] } } } in crop pixels.
"""
import sys, json, argparse
import numpy as np, cv2

ap = argparse.ArgumentParser()
ap.add_argument('frame'); ap.add_argument('crop'); ap.add_argument('points'); ap.add_argument('out')
ap.add_argument('--scale', type=int, default=4); ap.add_argument('--smooth', type=float, default=2.2)
ap.add_argument('--eps', type=float, default=0.7); ap.add_argument('--min-area', type=float, default=12)
ap.add_argument('--debug', default=None)
a = ap.parse_args()
img = cv2.imread(a.frame)
x, y, w, h = map(int, a.crop.split(','))
S = a.scale
crop = img[y:y + h, x:x + w]
big = cv2.resize(crop, (w * S, h * S), interpolation=cv2.INTER_CUBIC)
big = cv2.bilateralFilter(big, 7, 30, 7)
lab = cv2.cvtColor(big, cv2.COLOR_BGR2LAB).astype(np.float32)
P = json.load(open(a.points))
names, cols_lab, cols_bgr = [], [], []
def hexbgr(hx): return np.array([int(hx[5:7], 16), int(hx[3:5], 16), int(hx[1:3], 16)], np.float32)
def bgr2lab(c): return cv2.cvtColor(c.reshape(1, 1, 3).astype(np.uint8), cv2.COLOR_BGR2LAB).reshape(3).astype(np.float32)
if P.pop('_auto_bg', None):   # background colours: k-means of the crop's border pixels
    bd = np.concatenate([big[:3 * S].reshape(-1, 3), big[:, :3 * S].reshape(-1, 3), big[:, -3 * S:].reshape(-1, 3)]).astype(np.float32)
    _, _, cen = cv2.kmeans(bd, 6, None, (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 1), 3, cv2.KMEANS_PP_CENTERS)
    for i, c in enumerate(cen): P['_abg%d' % i] = '#%02x%02x%02x' % (int(c[2]), int(c[1]), int(c[0]))
for n, pts in P.items():
    if isinstance(pts, str):
        names.append(n); cb = hexbgr(pts); cols_bgr.append(cb); cols_lab.append(bgr2lab(cb)); continue
    if isinstance(pts[0], (int, float)): pts = [pts]
    acc_l, acc_b = [], []
    for px, py in pts:
        X, Y = int(px * S), int(py * S)
        acc_l.append(lab[Y - 2:Y + 3, X - 2:X + 3].reshape(-1, 3).mean(0)); acc_b.append(big[Y - 2:Y + 3, X - 2:X + 3].reshape(-1, 3).mean(0))
    names.append(n); cols_lab.append(np.mean(acc_l, 0)); cols_bgr.append(np.mean(acc_b, 0))
C = np.array(cols_lab)
d = ((lab[:, :, None, :] - C[None, None, :, :]) ** 2).sum(-1)
lbl = d.argmin(-1)
# smooth the label map
k = int(a.smooth * S) | 1
votes = np.stack([cv2.GaussianBlur((lbl == i).astype(np.float32), (0, 0), a.smooth * S / 2) for i in range(len(names))], -1)
lbl = votes.argmax(-1)
# the character: non-background labels, largest component, holes filled; background outside it
isbg = np.array([n.startswith('_') for n in names])
fg = (~isbg[lbl]).astype(np.uint8) * 255
fg = cv2.morphologyEx(fg, cv2.MORPH_OPEN, np.ones((3 * S, 3 * S), np.uint8))
n_, cc, st, _ = cv2.connectedComponentsWithStats(fg)
if n_ > 1: fg = (cc == (np.argmax(st[1:, cv2.CC_STAT_AREA]) + 1)).astype(np.uint8) * 255
cnts, _ = cv2.findContours(fg, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE); fg = np.zeros_like(fg); cv2.drawContours(fg, cnts, -1, 255, -1)
fg = (cv2.GaussianBlur(fg, (0, 0), 2.5 * S) > 127).astype(np.uint8) * 255
bgi = int(np.argmax(isbg)) if isbg.any() else -1
# small islands of any label take the majority label around them (kills anti-aliasing specks and edge rims)
minpx = a.min_area * S * S
for _ in range(2):
    for i in range(len(names)):
        m = ((lbl == i) & (fg > 0)).astype(np.uint8)
        n_, cc, st, _ = cv2.connectedComponentsWithStats(m)
        for j in range(1, n_):
            if st[j, cv2.CC_STAT_AREA] >= minpx: continue
            comp = (cc == j).astype(np.uint8); ring = cv2.dilate(comp, np.ones((5, 5), np.uint8)) & (1 - comp) & (fg > 0)
            vals = lbl[ring > 0]; vals = vals[~isbg[vals]] if (~isbg[vals]).any() else vals
            if len(vals): lbl[comp > 0] = np.bincount(vals).argmax()
inside_bg = (fg > 0) & isbg[lbl]
if inside_bg.any():   # background-coloured pixels inside the silhouette: nearest character label
    dist_lbl = lbl.copy(); dist_lbl[isbg[lbl]] = -1
    for _ in range(12):
        holes = (fg > 0) & (dist_lbl < 0)
        if not holes.any(): break
        dl = cv2.dilate((dist_lbl + 1).astype(np.uint8), np.ones((3, 3), np.uint8)).astype(np.int32) - 1
        dist_lbl[holes] = dl[holes]
    lbl = np.where(fg > 0, np.maximum(dist_lbl, 0), bgi)
else:
    lbl = np.where(fg > 0, lbl, bgi)
if a.debug:
    dbg = np.array(cols_bgr, np.uint8)[lbl]; cv2.imwrite(a.debug, np.hstack([big, dbg]))
out = {'w': w, 'h': h, 'order': [], 'layers': {}}
for i, n in enumerate(names):
    if n.startswith('_'): continue
    m = (lbl == i).astype(np.uint8) * 255
    if m.sum() == 0: continue
    cnts, hier = cv2.findContours(m, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
    paths = []
    for c in cnts:
        if cv2.contourArea(c) < a.min_area * S * S: continue
        p = cv2.approxPolyDP(c, a.eps * S, True).reshape(-1, 2) / S
        if len(p) >= 3: paths.append([round(float(v), 2) for v in p.ravel()])
    if not paths: continue
    ys, xs = np.nonzero(m)
    b, g, r = [int(round(v)) for v in cols_bgr[i]]
    out['layers'][n] = {'c': '#%02x%02x%02x' % (r, g, b), 'paths': paths, 'box': [round(xs.min() / S, 1), round(ys.min() / S, 1), round(xs.max() / S, 1), round(ys.max() / S, 1)], 'area': int(m.sum() // 255) // (S * S)}
    out['order'].append(n)
out['order'].sort(key=lambda n: -out['layers'][n]['area'])
json.dump(out, open(a.out, 'w'))
print(a.out, {n: (L['c'], len(L['paths'])) for n, L in out['layers'].items()})
