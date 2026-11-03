# Removes every silence from the voice-over: each pause is cut down to KEEP s (a 5 ms crossfade at each edge).
import sys, wave, numpy as np
src, dst = sys.argv[1], sys.argv[2]
KEEP = float(sys.argv[3]) if len(sys.argv) > 3 else 0.03
w = wave.open(src); sr = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32)/32768
hop = int(sr*0.005); n = len(x)//hop
db = 20*np.log10(np.sqrt(np.mean(x[:n*hop].reshape(n,hop)**2,axis=1))+1e-9)
sil = db < -42
keep = np.ones(n, bool); k = max(1, int(KEEP/0.005/2))
i = 0
while i < n:
    if sil[i]:
        j = i
        while j < n and sil[j]: j += 1
        if i == 0: keep[0:max(0, j-2)] = False
        elif j == n: keep[i+4:] = False
        elif j - i > max(2*k, int(0.11/0.005)): keep[i+k:j-k] = False  # only real pauses, not the closures inside words
        i = j
    else: i += 1
segs = []; i = 0
while i < n:
    if keep[i]:
        j = i
        while j < n and keep[j]: j += 1
        segs.append((i*hop, j*hop)); i = j
    else: i += 1
f = int(sr*0.005); parts = []
for a, b in segs:
    s = x[a:b].copy(); r = min(f, len(s)//2); s[:r] *= np.linspace(0,1,r); s[len(s)-r:] *= np.linspace(1,0,r); parts.append(s)
y = np.concatenate(parts); y = y/max(1e-6, np.abs(y).max())*0.95
o = wave.open(dst,'w'); o.setnchannels(1); o.setsampwidth(2); o.setframerate(sr); o.writeframes((y*32767).astype(np.int16).tobytes())
print(f"in {len(x)/sr:.2f}s -> out {len(y)/sr:.2f}s, {len(segs)} segments")
