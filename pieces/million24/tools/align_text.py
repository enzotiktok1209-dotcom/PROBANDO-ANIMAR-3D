# Aligns the known script (voice/script.txt) to the trimmed voice (voice/vo.wav) without an ASR model:
# speech runs are split at pauses, words are assigned to runs by dynamic programming (duration ~ spoken length,
# breaks preferred at punctuation), then spread inside each run by their spoken length. Writes words_asr.json.
import json, re, sys, wave, numpy as np
ROOT = sys.argv[1]
txt = open(f"{ROOT}/voice/script.txt").read().replace('"', '').replace('„', '').replace('“', '')
words = txt.split()
SPOKEN = {'10': 'zehn', '40': 'vierzig', '9': 'neun', 'Lamborghini.': 'lamborgini', 'Lamborghini?': 'lamborgini', 'Download': 'daunlod', 'Gaming-Marke': 'gemingmarke', 'Stream': 'strim', '300.000': 'dreihunderttausend', '300.000.': 'dreihunderttausend', '300.000?': 'dreihunderttausend', '6.000': 'sechstausend', '20.000': 'zwanzigtausend', '15.000.': 'fünfzehntausend', '30.000': 'dreißigtausend', '277.000': 'zweihundertsiebenundsiebzigtausend', '1': 'ein', 'Ibiza': 'ibitsa', 'GTA': 'gete a', '6': 'sechs', '100.000': 'hunderttausend', '40': 'vierzig', '2': 'zwei', '500.000': 'fünfhunderttausend', '37': 'siebenunddreißig', 'Vice': 'weis', 'City': 'siti', 'Energydrinks': 'enerdschidrinks', 'Deal!': 'dil', 'Controller': 'kontroler', 'Job': 'dschob', '20': 'zwanzig', '50': 'fünfzig', '800.000': 'achthunderttausend', '200.000.': 'zweihunderttausend', '18': 'achtzehn', 'Yacht': 'jacht', 'Videocall': 'widejokol', 'Champagner': 'schampanja', 'Party': 'parti', 'Jonas\'': 'jonasses', '24': 'vierundzwanzig', '250.000': 'zweihundertfünfzigtausend', '50.000.': 'fünfzigtausend', '100.000.': 'hunderttausend', '30.000': 'dreißigtausend', '200.000.': 'zweihunderttausend', '240.000': 'zweihundertvierzigtausend', '23': 'dreiundzwanzig', '59.': 'neunundfünfzig', 'PS5': 'pe es fünf', 'Lamborghini': 'lamborgini', 'Rolex': 'rolex', 'Monaco': 'monako', 'Hotelsuite': 'hotelswite', 'Privatjet': 'priwatdschet'}
def syl(w):
    k = re.sub(r"[^\wäöüß']", '', w); s = SPOKEN.get(w, SPOKEN.get(k, k)).lower()
    v = len(re.findall(r"[aeiouyäöü]+", s)); return max(1, v) + 0.15 * len(s) / 3
WT = np.array([syl(w) for w in words]); N = len(words)
PUNCT = np.array([2.0 if re.search(r"[.?!…:]$", w) else (1.0 if w.endswith(',') else 0.0) for w in words])
w = wave.open(f"{ROOT}/voice/vo.wav"); sr = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
hop = sr // 100; n = len(x) // hop; db = 20 * np.log10(np.sqrt(np.mean(x[:n * hop].reshape(n, hop) ** 2, 1) + 1e-12))
sil = db < -38
gaps = []; i = 0   # silent runs (start, end) in 10 ms frames
while i < n:
    if sil[i]:
        j = i
        while j < n and sil[j]: j += 1
        gaps.append((i, j)); i = j
    else: i += 1
MINGAP = int(sys.argv[2]) if len(sys.argv) > 2 else 10
cuts = [(a, b) for a, b in gaps if b - a >= MINGAP and a > 0 and b < n]
st = [0 if not sil[0] else gaps[0][1]] + [b for a, b in cuts]; en = [a for a, b in cuts] + [n if not sil[-1] else gaps[-1][0]]
runs = list(zip(st, en))
mr = []   # merge tiny runs (< 0.15 s: breaths, clicks, plosive tails) into the closer neighbour
for a, b in runs:
    if mr and (b - a < 15 or mr[-1][1] - mr[-1][0] < 15) and a - mr[-1][1] < 25: mr[-1] = (mr[-1][0], b)
    else: mr.append((a, b))
runs = mr; K = len(runs)
dur = np.array([(b - a) / 100 for a, b in runs]); gapd = np.array([(runs[k + 1][0] - runs[k][1]) / 100 for k in range(K - 1)] + [0])
rate = WT.sum() / dur.sum()
cw = np.concatenate([[0], np.cumsum(WT)])
# DP over (runs, words): each run gets a contiguous non-empty word group; a run may also be "merged" with the
# next by allowing a group boundary only where we decide; to stay simple: every run = one group.
INF = 1e18; D = np.full((K + 1, N + 1), INF); B = np.zeros((K + 1, N + 1), int); D[0, 0] = 0
for k in range(1, K + 1):
    for j in range(k, N - (K - k) + 1):
        best = INF; bi = -1
        for i in range(max(k - 1, j - 40), j):
            if D[k - 1, i] >= INF: continue
            e = (cw[j] - cw[i]) / rate; c = np.log((dur[k - 1] + 0.05) / (e + 0.05)) ** 2 * 4
            if k < K: c += 0 if PUNCT[j - 1] >= 1 else (0.6 if gapd[k - 1] < 0.2 else 2.5)
            if D[k - 1, i] + c < best: best = D[k - 1, i] + c; bi = i
        D[k, j] = best; B[k, j] = bi
grp = []; j = N
for k in range(K, 0, -1): i = B[k, j]; grp.append((i, j)); j = i
grp = grp[::-1]
import os
if os.path.exists(f"{ROOT}/voice/runs.txt"):   # verified grouping (whisper-small per run, see voice/runs.txt)
    L = [[] if l.strip() == '-' else l.split() for l in open(f"{ROOT}/voice/runs.txt").read().strip().split('\n')]   # '-' = a run with no words (a cough, a laugh)
    assert sum(map(len, L)) == N and len(L) == K, (sum(map(len, L)), N, len(L), K)
    grp = []; i = 0
    for l in L: grp.append((i, i + len(l))); assert words[i:i + len(l)] == l, (words[i:i + len(l)], l); i += len(l)
out = []
for (a, b), (i, j) in zip(runs, grp):
    if j == i: continue
    t0, t1 = a / 100, b / 100; tot = cw[j] - cw[i]; acc = t0
    for q in range(i, j):
        d = (t1 - t0) * WT[q] / tot; out.append(dict(w=words[q], s=round(acc, 3), e=round(acc + d, 3))); acc += d
print('runs', K, 'words', N, 'cost', round(D[K, N], 2))
for (a, b), (i, j) in zip(runs, grp): print(f"{a/100:6.2f}-{b/100:6.2f} {' '.join(words[i:j])}")
json.dump(out, open(f"{ROOT}/voice/words_asr.json", 'w'), ensure_ascii=False)
