#!/usr/bin/env python3
"""Trace a flat cartoon character from a video frame into NAMED vector layers.

usage: python3 -I trace3.py <frame.png> <x,y,w,h> <palette.json> <out.json> [--scale 4] [--smooth 2.0] [--eps 0.6] [--debug dbg.png]

palette.json: { "skin": "#f6c4a0", "hair": "#d8ad73", "!pupil": "#222223", "_coat": "#885636", "_auto_bg": 1, ... }
  name      a character colour: it decides the silhouette and is traced
  !name     an inner colour (pupils, mouth, tear): only looked for INSIDE the silhouette (it may resemble the background)
  _name     background: dropped.  "_auto_bg": 1 adds the crop's top/left/right border colours as background.
  a value may also be [x, y] (sample the frame at that crop point) instead of a hex colour.
Every palette colour is adapted to this frame: snapped to the nearest k-means colour of the crop (lighting shifts).
Pass 1 labels with character + background colours -> silhouette (largest blob, holes filled, smoothed).
Pass 2 labels the silhouette's pixels with character + inner colours only; the label map is smoothed; islands merge.
Output: { w, h, order, layers: { name: { c, paths, box, area } } } in crop pixels; layers sorted largest first.
"""
import json, argparse
import numpy as np, cv2

ap = argparse.ArgumentParser()
ap.add_argument('frame'); ap.add_argument('crop'); ap.add_argument('palette'); ap.add_argument('out')
ap.add_argument('--scale', type=int, default=4); ap.add_argument('--smooth', type=float, default=2.0)
ap.add_argument('--eps', type=float, default=0.6); ap.add_argument('--min-area', type=float, default=10)
ap.add_argument('--adapt', type=float, default=12); ap.add_argument('--sym', default=None, help='layer:axis_x — mirror the layer about x (fills an occluded half)'); ap.add_argument('--debug', default=None)
a = ap.parse_args()
img = cv2.imread(a.frame)
x, y, w, h = map(int, a.crop.split(','))
S = a.scale
crop = img[y:y + h, x:x + w]
big = cv2.resize(crop, (w * S, h * S), interpolation=cv2.INTER_CUBIC)
big = cv2.bilateralFilter(big, 7, 30, 7)
lab = cv2.cvtColor(big, cv2.COLOR_BGR2LAB).astype(np.float32)
toLab = lambda c: cv2.cvtColor(np.array(c, np.float32).reshape(1, 1, 3).clip(0, 255).astype(np.uint8), cv2.COLOR_BGR2LAB).reshape(3).astype(np.float32)
hexbgr = lambda hx: np.array([int(hx[5:7], 16), int(hx[3:5], 16), int(hx[1:3], 16)], np.float32)
P = json.load(open(a.palette))
# frame palette for adaptation
px = crop.reshape(-1, 3).astype(np.float32)
_, _, cen = cv2.kmeans(px, 18, None, (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 1), 3, cv2.KMEANS_PP_CENTERS)
cen_lab = np.array([toLab(c) for c in cen])
ent = []   # (name, kind, bgr, lab)  kind: 'c' character, 'i' inner, 'b' background
if P.pop('_auto_bg', None):
    bd = np.concatenate([crop[:3].reshape(-1, 3), crop[:, :3].reshape(-1, 3), crop[:, -3:].reshape(-1, 3)]).astype(np.float32)
    _, _, bc = cv2.kmeans(bd, 6, None, (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 1), 3, cv2.KMEANS_PP_CENTERS)
    for i, c in enumerate(bc): ent.append(('_abg%d' % i, 'b', c, toLab(c)))
items = []
for n, v in P.items():
    if isinstance(v, list) and v and isinstance(v[0], str): items += [(n, q) for q in v]
    else: items.append((n, v))
for n, v in items:
    kind = 'b' if n.startswith('_') else 'i' if n.startswith('!') else 'c'
    name = n.lstrip('!')
    if isinstance(v, str): c = hexbgr(v)
    else: X, Y = int(v[0] * S), int(v[1] * S); c = big[Y - 2:Y + 3, X - 2:X + 3].reshape(-1, 3).mean(0)
    L = toLab(c)
    if isinstance(v, str) and kind != 'b':
        d = np.sqrt(((cen_lab - L) ** 2).sum(-1)); j = d.argmin()
        if d[j] < a.adapt: c = cen[j]; L = cen_lab[j]
    ent.append((name, kind, c, L))
names = [e[0] for e in ent]; kinds = np.array([e[1] for e in ent]); C = np.array([e[3] for e in ent])
def label(allowed):
    d = ((lab[:, :, None, :] - C[None, None, :, :]) ** 2).sum(-1)
    d[:, :, ~allowed] = 1e12
    return d.argmin(-1)
def smooth(lbl, allowed):
    v = np.full(lbl.shape + (len(names),), -1, np.float32)
    for i in np.nonzero(allowed)[0]: v[:, :, i] = cv2.GaussianBlur((lbl == i).astype(np.float32), (0, 0), a.smooth * S / 2)
    return v.argmax(-1)
# pass 1: silhouette
l1 = smooth(label(kinds != 'i'), kinds != 'i')
fg = (kinds[l1] == 'c').astype(np.uint8) * 255
fg = cv2.morphologyEx(fg, cv2.MORPH_OPEN, np.ones((3 * S, 3 * S), np.uint8))
n_, cc, st, _ = cv2.connectedComponentsWithStats(fg)
if n_ > 1: fg = (cc == (np.argmax(st[1:, cv2.CC_STAT_AREA]) + 1)).astype(np.uint8) * 255
cnts, _ = cv2.findContours(fg, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE); fg = np.zeros_like(fg); cv2.drawContours(fg, cnts, -1, 255, -1)
fg = (cv2.GaussianBlur(fg, (0, 0), 2.0 * S) > 127).astype(np.uint8) * 255
# pass 2: inside the silhouette, character + inner colours only
inner = kinds != 'b'
lbl = smooth(label(inner), inner)
minpx = a.min_area * S * S
for _ in range(2):
    for i in np.nonzero(inner)[0]:
        m = ((lbl == i) & (fg > 0)).astype(np.uint8)
        n_, cc, st, _ = cv2.connectedComponentsWithStats(m)
        for j in range(1, n_):
            if st[j, cv2.CC_STAT_AREA] >= minpx: continue
            comp = (cc == j).astype(np.uint8); ring = cv2.dilate(comp, np.ones((5, 5), np.uint8)) & (1 - comp) & (fg > 0).astype(np.uint8)
            vals = lbl[ring > 0]
            if len(vals): lbl[comp > 0] = np.bincount(vals).argmax()
if a.debug:
    pal = np.array([e[2] for e in ent], np.uint8); dbg = pal[lbl]; dbg[fg == 0] = (60, 40, 25); cv2.imwrite(a.debug, np.hstack([big, dbg]))
out = {'w': w, 'h': h, 'order': [], 'layers': {}}
done = set()
for i, n in enumerate(names):
    if kinds[i] == 'b' or n in done: continue
    done.add(n)
    idx = [j for j, q in enumerate(names) if q == n]
    m = (np.isin(lbl, idx) & (fg > 0)).astype(np.uint8) * 255
    if a.sym and a.sym.split(':')[0] == n:
        ax = int(float(a.sym.split(':')[1]) * S); W2 = m.shape[1]; mm = m.copy()
        for xx in range(W2):
            src = 2 * ax - xx
            if 0 <= src < W2: mm[:, xx] = np.maximum(mm[:, xx], m[:, src])
        cs, _ = cv2.findContours(mm, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        hull = cv2.convexHull(np.concatenate(cs)); m = np.zeros_like(mm); cv2.fillPoly(m, [hull], 255)
    if m.sum() == 0: continue
    cnts, _ = cv2.findContours(m, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
    paths = []
    for c in cnts:
        if cv2.contourArea(c) < minpx: continue
        p = cv2.approxPolyDP(c, a.eps * S, True).reshape(-1, 2) / S
        if len(p) >= 3: paths.append([round(float(v), 2) for v in p.ravel()])
    if not paths: continue
    ys, xs = np.nonzero(m); b, g, r = [int(round(float(v))) for v in ent[i][2]]
    out['layers'][n] = {'c': '#%02x%02x%02x' % (r, g, b), 'paths': paths, 'box': [round(xs.min() / S, 1), round(ys.min() / S, 1), round(xs.max() / S, 1), round(ys.max() / S, 1)], 'area': int(m.sum() // 255) // (S * S)}
    out['order'].append(n)
out['order'].sort(key=lambda n: -out['layers'][n]['area'])
json.dump(out, open(a.out, 'w'))
print(a.out, ' '.join(f"{n}:{out['layers'][n]['c']}/{len(out['layers'][n]['paths'])}" for n in out['order']))
