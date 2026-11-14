import sys, json
from faster_whisper import WhisperModel
m=WhisperModel(sys.argv[1],device="cpu",compute_type="int8",cpu_threads=4)
import wave,numpy as np
w=wave.open(sys.argv[2]);a=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
segs,info=m.transcribe(a,language="de",word_timestamps=True,beam_size=5,vad_filter=False)
words=[]
for s in segs:
    print(f"[{s.start:6.2f}-{s.end:6.2f}] {s.text}")
    for w in s.words: words.append(dict(w=w.word.strip(),s=round(w.start,3),e=round(w.end,3)))
json.dump(words,open(sys.argv[3],'w'),ensure_ascii=False)
