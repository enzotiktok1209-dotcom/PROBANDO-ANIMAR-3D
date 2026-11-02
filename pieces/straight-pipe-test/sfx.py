import numpy as np, wave
SR=48000; D=5.0; N=int(SR*D); t=np.arange(N)/SR; rng=np.random.default_rng(3)
def bp(x,lo,hi):
    X=np.fft.rfft(x); f=np.fft.rfftfreq(len(x),1/SR); X[(f<lo)|(f>hi)]=0; return np.fft.irfft(X,len(x))
def env(t0,a,d,shape=None):
    e=np.zeros(N); i0=int(t0*SR); n=int((a+d)*SR); i1=min(N,i0+n); tt=np.arange(i1-i0)/SR
    e[i0:i1]=np.where(tt<a,tt/max(a,1e-4),np.exp(-(tt-a)/max(d/5,1e-4))); return e
out=np.zeros(N)
# room tone
out+=bp(rng.standard_normal(N),60,400)*.01
# saw rasps: 0.25-1.6, stroke 3.2 Hz (each half stroke = rasp)
noise=bp(rng.standard_normal(N),1800,7000)
ph=(t-.2)*3.2*2*np.pi; rasp=np.abs(np.sin(ph))**1.5*((t>.25)&(t<1.6))
grit=1+.5*np.sin(2*np.pi*55*t)
out+=noise*rasp*grit*.22
# snap at cut 1.62
out+=bp(rng.standard_normal(N),2500,9000)*env(1.62,.002,.08)*.5
# clank when muffler hits floor ~1.97 + small bounce 2.05
def clank(t0,g):
    s=np.zeros(N)
    for f,dc in [(310,.5),(587,.35),(1243,.25),(2210,.15),(3170,.1)]:
        s+=np.sin(2*np.pi*f*t)*env(t0,.001,dc)
    s+=bp(rng.standard_normal(N),200,3000)*env(t0,.001,.06)*2
    return s*g
out+=clank(1.97,.28)+clank(2.06,.1)
# whoosh into shot 2 (2.0-2.15)
w=bp(rng.standard_normal(N),300,3000)*np.clip(1-np.abs(t-2.08)/.12,0,1)**2
out+=w*.25
# engine: starter crank 2.2-2.35 then straight-pipe rumble from 2.35
crank=np.sin(2*np.pi*14*t)>0.3
out+=bp(rng.standard_normal(N),150,1200)*crank*((t>2.15)&(t<2.4))*.12
on=np.clip((t-2.35)/.08,0,1)
fire=42  # firings per second
pul=np.maximum(0,np.sin(2*np.pi*fire*t+.6*np.sin(2*np.pi*3*t)))**6
rumble=bp(rng.standard_normal(N)*pul,30,900)*3+np.sin(2*np.pi*fire*t)*.5*pul
rev=1+.6*np.exp(-((t-2.6)/.18)**2)   # little blip on start
out+=rumble*on*.22*rev
# pops at 3.5 and 4.95
for p in(3.5,4.95):
    out+=bp(rng.standard_normal(N),80,4000)*env(p,.001,.12)*.7
    out+=np.sin(2*np.pi*70*t)*env(p,.001,.15)*.5
out/=np.max(np.abs(out))*1.12
out=np.clip(out,-1,1)
with wave.open('sfx.wav','wb') as wf:
    wf.setnchannels(1);wf.setsampwidth(2);wf.setframerate(SR);wf.writeframes((out*32767).astype('<i2').tobytes())
