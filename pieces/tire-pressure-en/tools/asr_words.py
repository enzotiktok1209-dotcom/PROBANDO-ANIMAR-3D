import sys, json, wave, numpy as np, sherpa_onnx as so
d="sherpa-onnx-zipformer-en-2023-06-26/"
r=so.OfflineRecognizer.from_transducer(encoder=d+"encoder-epoch-99-avg-1.int8.onnx",decoder=d+"decoder-epoch-99-avg-1.onnx",joiner=d+"joiner-epoch-99-avg-1.int8.onnx",tokens=d+"tokens.txt",num_threads=4,decoding_method="greedy_search")
w=wave.open(sys.argv[1]); sr=w.getframerate(); x=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
# resample to 16k
import math
n=int(len(x)*16000/sr); xi=np.interp(np.arange(n)*sr/16000, np.arange(len(x)), x).astype(np.float32)
words=[]; CH=20.0; off=0.0
# chunk at low-energy points
hop=160; e=np.sqrt(np.convolve(xi**2,np.ones(800)/800,'same'))
pos=0
while pos<n:
    end=min(n,pos+int(CH*16000))
    if end<n:
        lo=end-int(4*16000); seg=e[lo:end]; end=lo+int(np.argmin(seg))
    s=r.create_stream(); s.accept_waveform(16000, xi[pos:end]); r.decode_stream(s)
    res=s.result
    cur=None
    for tok,ts in zip(res.tokens,res.timestamps):
        t=ts+pos/16000
        if tok.startswith("▁") or tok.startswith(" ") or cur is None:
            if cur: words.append(cur)
            cur=dict(w=tok.replace("▁","").strip(),s=round(t,3))
        else: cur["w"]+=tok
        cur["e"]=round(t+0.08,3)
    if cur: words.append(cur)
    pos=end
print(" ".join(w["w"] for w in words))
json.dump(words,open(sys.argv[2],"w"))
