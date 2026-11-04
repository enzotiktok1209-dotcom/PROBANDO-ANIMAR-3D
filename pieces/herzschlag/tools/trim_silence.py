import sys, wave, numpy as np
src, dst = sys.argv[1], sys.argv[2]
w = wave.open(src); sr = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32)/32768
hop = int(sr*0.01); n = len(x)//hop
rms = np.sqrt(np.mean(x[:n*hop].reshape(n,hop)**2,axis=1)+1e-12)
db = 20*np.log10(rms)
sil = db < -40
KEEP = 0.06  # seconds of silence kept at each phrase boundary (total gap = 2*KEEP)
keep = np.ones(n, bool)
i = 0
while i < n:
    if sil[i]:
        j = i
        while j < n and sil[j]: j += 1
        L = j - i
        k = int(KEEP*100)
        if i == 0: keep[i:max(i, j-3)] = False
        elif j == n: keep[i+3:j] = False
        elif L > 2*k: keep[i+k:j-k] = False
        i = j
    else: i += 1
# build output with 5ms crossfades at cuts
out = []; f = int(sr*0.005); prev = None
segs = []; i = 0
while i < n:
    if keep[i]:
        j = i
        while j < n and keep[j]: j += 1
        segs.append((i*hop, j*hop)); i = j
    else: i += 1
y = np.concatenate([x[a:b].copy() for a,b in segs])
# fade edges of each segment
pos = 0
for a,b in segs:
    L=b-a; r=min(f,L//2)
    y[pos:pos+r]*=np.linspace(0,1,r); y[pos+L-r:pos+L]*=np.linspace(1,0,r); pos+=L
y = y/ max(1e-6, np.abs(y).max())*0.95
o = wave.open(dst,'w'); o.setnchannels(1); o.setsampwidth(2); o.setframerate(sr); o.writeframes((y*32767).astype(np.int16).tobytes())
print(f"in {len(x)/sr:.2f}s -> out {len(y)/sr:.2f}s, cuts {len(segs)}")
