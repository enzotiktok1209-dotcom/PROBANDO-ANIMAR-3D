  // =====================================================================
  //  SCORE BODY — Zombie-Klinik: an apocalyptic horror score + a sound effect for every action on screen.
  //  'm' = music (ducked under the voice), 's' = sound effects. Times come from the voice (A, VW) and the shots (S).
  // =====================================================================
  const A = (s) => at(s), S = (n) => SHOT_LIST[n - 1][0];
  // ---------------------------------------------------------------- building blocks
  const shaper = (amt) => { const w = ac.createWaveShaper(), n = 2048, c = new Float32Array(n); for (let i = 0; i < n; i++) { const x = i / (n - 1) * 2 - 1; c[i] = Math.tanh(amt * x) / Math.tanh(amt); } w.curve = c; return w; };
  const brown = (() => { const b = ac.createBuffer(1, ac.sampleRate * 4, ac.sampleRate), d = b.getChannelData(0), R = RNG('brown'); let l = 0; for (let i = 0; i < d.length; i++) { l = (l + 0.02 * (R.f() * 2 - 1)) / 1.02; d[i] = l * 3.5; } return b; })();
  const filt = (type, f, q = 0.7) => { const b = ac.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = q; return b; };
  const chain = (...n) => { for (let i = 0; i < n.length - 1; i++) n[i].connect(n[i + 1]); return n[n.length - 1]; };
  const genv = (t, a, peak, hold, rel) => { const g = ac.createGain(); g.gain.value = 0.0001; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + a); g.gain.setValueAtTime(Math.max(0.0002, peak), t + a + hold); g.gain.exponentialRampToValueAtTime(0.0001, t + a + hold + rel); return g; };
  const bsrc = (buf, t, dur) => { const s = ac.createBufferSource(); s.buffer = buf; s.loop = true; s.start(t, (t * 1.37) % 3); s.stop(t + dur + 0.05); return s; };
  const toLong = (node, lvl) => { const g = ac.createGain(); g.gain.value = lvl; node.connect(g); g.connect(longVerb); };
  const rnd = (k) => (hash(k) % 1000) / 1000;
  const hz = (n) => nz(n);

  // ---------------------------------------------------------------- MUSIC instruments
  function braam(t, vel, dur = 2.6, notes = ['D1', 'D2', 'A2', 'F2']) {   // the trailer brass: detuned saws through a distortion, filter blooms then closes
    const lp = filt('lowpass', 180, 2.5); lp.frequency.setValueAtTime(180, t); lp.frequency.exponentialRampToValueAtTime(2200, t + 0.09); lp.frequency.exponentialRampToValueAtTime(320, t + dur);
    const g = genv(t, 0.03, vel, dur * 0.25, dur * 0.75), sh = shaper(2.5);
    notes.forEach((n) => [-12, 0, 12].forEach((d) => { const o = osc('sawtooth', hz(n), t, t + dur + 0.1); o.detune.value = d; o.connect(lp); }));
    chain(lp, sh, g); out(g, 0, 0.5); toLong(g, 0.35);
  }
  function taiko(t, vel, pan = 0) {
    const o = osc('sine', 95, t, t + 0.7); o.frequency.exponentialRampToValueAtTime(42, t + 0.35); const g = genv(t, 0.003, vel, 0.02, 0.5); chain(o, g); out(g, pan, 0.25);
    const n = bsrc(brown, t, 0.3), g2 = genv(t, 0.002, vel * 0.9, 0.01, 0.22); chain(n, filt('bandpass', 140, 1.2), g2); out(g2, pan, 0.25);
    const n2 = bsrc(noise, t, 0.05), g3 = genv(t, 0.001, vel * 0.25, 0.0, 0.04); chain(n2, filt('bandpass', 1600, 1), g3); out(g3, pan);
  }
  function drums(t0, t1, pat, vel) {   // pat: 16 steps, 'X' accent, 'x' hit, '.' rest, on the 16th grid
    for (let t = t0, k = 0; t < t1 - 0.01; t += E16, k++) { const c = pat[k % pat.length]; if (c === 'X') taiko(t, vel, (k % 2) * 0.3 - 0.15); else if (c === 'x') taiko(t, vel * 0.55, (k % 3 - 1) * 0.3); }
  }
  function strings(t0, t1, notes, vel, o = {}) {   // a section: detuned saws, a body filter, optional tremolo
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t0 + (o.att ?? 0.8)); g.gain.setValueAtTime(vel, t1 - (o.rel ?? 0.5)); g.gain.exponentialRampToValueAtTime(0.0001, t1);
    const bp = filt('lowpass', o.cut ?? 2200, 0.8), trem = ac.createGain();
    if (o.trem) { trem.gain.value = 0.55; const l = osc('sine', o.trem, t0, t1 + 0.05), lg = ac.createGain(); lg.gain.value = 0.45; chain(l, lg); lg.connect(trem.gain); }
    notes.forEach((n, i) => [-9, 0, 9].forEach((d) => { const oo = osc('sawtooth', hz(n), t0, t1 + 0.05); oo.detune.value = d + i * 2; const vb = osc('sine', 5 + i * 0.3, t0, t1), vg = ac.createGain(); vg.gain.value = hz(n) * 0.004; chain(vb, vg); vg.connect(oo.frequency); oo.connect(bp); }));
    chain(bp, filt('highpass', 90), trem, g); out(g, o.pan ?? 0, 0.45); toLong(g, o.verb ?? 0.2);
  }
  function choir(t0, t1, notes, vel, o = {}) {   // dark "aah": saws through three vowel formants, slow swell, long reverb
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t0 + (o.att ?? 1.5)); g.gain.setValueAtTime(vel, t1 - (o.rel ?? 0.8)); g.gain.exponentialRampToValueAtTime(0.0001, t1);
    const sum = ac.createGain(); sum.gain.value = 1;
    notes.forEach((n, i) => [-14, 0, 14].forEach((d) => { const oo = osc('sawtooth', hz(n), t0, t1 + 0.05); oo.detune.value = d; const vb = osc('sine', 4.6 + i * 0.2, t0, t1), vg = ac.createGain(); vg.gain.value = hz(n) * 0.008; chain(vb, vg); vg.connect(oo.frequency); oo.connect(sum); }));
    for (const [f, q, l] of [[650, 9, 1], [1080, 10, 0.6], [2650, 12, 0.25]]) { const b = filt('bandpass', f, q), lg = ac.createGain(); lg.gain.value = l * 2.2; chain(sum, b, lg, g); }
    out(g, 0, 0.6); toLong(g, 0.6);
  }
  function piano(t, n, vel, pan = 0) {   // the horror piano: a low, detuned, ringing note
    for (const [m, k] of [[1, 1], [2.003, 0.35], [3.01, 0.12]]) for (const d of [-6, 6]) { const o = osc(m === 1 ? 'triangle' : 'sine', hz(n) * m, t, t + 4); o.detune.value = d; const g = genv(t, 0.004, vel * k, 0.02, 3.6 / m); chain(o, g); out(g, pan, 0.5); toLong(g, 0.4); }
  }
  function screech(t0, t1, f, vel) {   // a high violin harmonic sliding, eerie
    const o = osc('sawtooth', f, t0, t1 + 0.05); o.frequency.linearRampToValueAtTime(f * 1.06, t1); const vb = osc('sine', 6.5, t0, t1), vg = ac.createGain(); vg.gain.value = f * 0.012; chain(vb, vg); vg.connect(o.frequency);
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t0 + (t1 - t0) * 0.6); g.gain.exponentialRampToValueAtTime(0.0001, t1); chain(o, filt('bandpass', f * 1.5, 2), g); out(g, 0.4, 0.5); toLong(g, 0.5);
  }
  function ostinato(t0, t1, notes, vel) {   // low strings on 16ths: the chase engine
    for (let t = t0, k = 0; t < t1 - 0.01; t += E16, k++) { const f = hz(notes[k % notes.length]), o = osc('sawtooth', f, t, t + 0.14), o2 = osc('sawtooth', f * 1.005, t, t + 0.14); const lp = filt('lowpass', 900, 1.5); lp.frequency.setValueAtTime(1600, t); lp.frequency.exponentialRampToValueAtTime(300, t + 0.12); const g = genv(t, 0.004, vel * (k % 4 === 0 ? 1 : 0.7), 0.03, 0.09); o.connect(lp); o2.connect(lp); chain(lp, g); out(g, (k % 2) * 0.3 - 0.15, 0.15); }
  }
  function subDrone(t0, t1, f, vel) {
    const o = osc('sine', f, t0, t1 + 0.1), g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t0 + 1); g.gain.setValueAtTime(vel, t1 - 0.5); g.gain.exponentialRampToValueAtTime(0.0001, t1);
    const l = osc('sine', 0.25, t0, t1), lg = ac.createGain(); lg.gain.value = vel * 0.4; chain(l, lg); lg.connect(g.gain); chain(o, g); out(g);
    const n = bsrc(brown, t0, t1 - t0), g2 = ac.createGain(); g2.gain.setValueAtTime(0.0001, t0); g2.gain.exponentialRampToValueAtTime(vel * 0.8, t0 + 1.5); g2.gain.setValueAtTime(vel * 0.8, t1 - 0.5); g2.gain.exponentialRampToValueAtTime(0.0001, t1); chain(n, filt('lowpass', 90, 1), shaper(1.5), g2); out(g2);
  }
  function shepard(t0, t1, vel) {   // an endlessly rising tone: six octave-spaced voices climbing, faded in and out by height
    const d = t1 - t0;
    for (let v = 0; v < 6; v++) { const f0 = 55 * 2 ** v, o = osc('sawtooth', f0, t0, t1 + 0.05); o.frequency.exponentialRampToValueAtTime(f0 * 2 ** (d / 4), t1); const g = ac.createGain(), w = Math.exp(-((v - 2.5) ** 2) / 2.5); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel * w + 0.0002, t0 + d * 0.4); g.gain.exponentialRampToValueAtTime(vel * w * 1.5 + 0.0002, t1 - 0.02); g.gain.linearRampToValueAtTime(0.0001, t1); chain(o, filt('lowpass', 2500), g); out(g, 0, 0.3); }
  }
  function tick(t, vel) { const n = bsrc(noise, t, 0.03), g = genv(t, 0.001, vel, 0, 0.025); chain(n, filt('bandpass', 3200, 10), g); out(g, 0.2); const o = osc('sine', 2100, t, t + 0.04), g2 = genv(t, 0.001, vel * 0.4, 0, 0.03); chain(o, g2); out(g2, 0.2); }
  function ticking(t0, t1, every, vel) { for (let t = t0, k = 0; t < t1; t += every, k++) tick(t, vel * (k % 2 ? 0.7 : 1)); }

  // ---------------------------------------------------------------- SFX instruments
  function whoosh(t, dur, vel, f0 = 300, f1 = 3800, pan = 0) {
    const n = bsrc(noise, t, dur), f = filt('bandpass', f0, 0.9); f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vel, t + dur * 0.65); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const p = ac.createStereoPanner(); p.pan.setValueAtTime(-pan, t); p.pan.linearRampToValueAtTime(pan, t + dur); chain(n, f, g, p); p.connect(to === 'm' ? duck : sfxBus); const s2 = ac.createGain(); s2.gain.value = 0.25; g.connect(s2); s2.connect(verbs[to]);
  }
  function boom(t, vel, len = 2.2) { const o = osc('sine', 90, t, t + len); o.frequency.exponentialRampToValueAtTime(28, t + len * 0.8); const g = genv(t, 0.005, vel, 0.05, len); chain(o, g); out(g, 0, 0.5); const n = bsrc(brown, t, len), g2 = genv(t, 0.01, vel, 0.1, len * 0.8); chain(n, filt('lowpass', 200), shaper(2), g2); out(g2, 0, 0.6); noiseHit(t, 0.12, 'bandpass', 1800, 0.8, vel * 0.5, 0, 0.4); }
  function hit(t, vel) { sub(t, vel); noiseHit(t, 0.35, 'lowpass', 900, 0.8, vel * 0.5, 0, 0.5); noiseHit(t, 0.08, 'highpass', 3000, 0.7, vel * 0.25); }
  function swell(t1, dur, vel) { const t0 = t1 - dur, n = bsrc(noise, t0, dur), f = filt('highpass', 800); f.frequency.setValueAtTime(800, t0); f.frequency.exponentialRampToValueAtTime(5000, t1); const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t1 - 0.01); g.gain.linearRampToValueAtTime(0.0001, t1 + 0.01); chain(n, f, g); out(g, 0, 0.3); }
  function heart(t, vel) { for (const [dt, k] of [[0, 1], [0.17, 0.7]]) { const o = osc('sine', 75, t + dt, t + dt + 0.25); o.frequency.exponentialRampToValueAtTime(38, t + dt + 0.15); const g = genv(t + dt, 0.004, vel * k, 0.0, 0.2); chain(o, g); out(g); } }
  function beep(t, f, dur, vel, pan = 0.15) { const o = osc('sine', f, t, t + dur + 0.02), g = genv(t, 0.004, vel, Math.max(0, dur - 0.03), 0.02); chain(o, g); out(g, pan, 0.15); }
  function alarm(t0, t1, vel) { for (let t = t0; t < t1 - 0.2; t += 0.9) [0, 0.2, 0.4].forEach((d, k) => { if (t + d < t1) beep(t + d, k === 1 ? 784 : 988, 0.14, vel); }); }
  function groan(t, dur, vel, f = 85, pan = 0) {   // a zombie: a buzzy throat + a breathy rasp through a vowel, wobbling
    const o = osc('sawtooth', f, t, t + dur + 0.05); o.frequency.linearRampToValueAtTime(f * 0.75, t + dur);
    const vb = osc('sine', 4 + rnd(t * 100) * 3, t, t + dur), vg = ac.createGain(); vg.gain.value = f * 0.08; chain(vb, vg); vg.connect(o.frequency);
    const f1 = filt('bandpass', 520, 4); f1.frequency.setValueAtTime(600, t); f1.frequency.linearRampToValueAtTime(360, t + dur);
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vel, t + dur * 0.3); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    chain(o, shaper(3), f1, g); out(g, pan, 0.5);
    const n = bsrc(noise, t, dur), g2 = ac.createGain(); g2.gain.setValueAtTime(0.0001, t); g2.gain.exponentialRampToValueAtTime(vel * 0.5, t + dur * 0.4); g2.gain.exponentialRampToValueAtTime(0.0001, t + dur); chain(n, filt('bandpass', 900, 3), g2); out(g2, pan, 0.4);
  }
  function screamZ(t, vel, pan = 0) { const o = osc('sawtooth', 340, t, t + 0.9); o.frequency.exponentialRampToValueAtTime(170, t + 0.8); const g = genv(t, 0.02, vel, 0.2, 0.6); chain(o, shaper(5), filt('bandpass', 1300, 2), g); out(g, pan, 0.5); noiseHit(t, 0.8, 'bandpass', 2500, 1.5, vel * 0.6, pan, 0.4, 900); }
  function snap(t, vel, pan = 0) { [0, 0.018, 0.041].forEach((d, k) => noiseHit(t + d, 0.018, 'bandpass', 2600 - k * 500, 2.5, vel * (1 - k * 0.2), pan)); thud(t, vel * 0.3, 900); }
  function thud(t, vel, f = 260) { noiseHit(t, 0.18, 'lowpass', f, 1, vel); const o = osc('sine', 110, t, t + 0.2); o.frequency.exponentialRampToValueAtTime(50, t + 0.15); const g = genv(t, 0.003, vel * 0.8, 0, 0.15); chain(o, g); out(g); }
  function clank(t, vel) { noiseHit(t, 0.35, 'bandpass', 2600, 9, vel, 0.1, 0.4); noiseHit(t, 0.5, 'bandpass', 900, 6, vel * 0.7, -0.1, 0.4); thud(t, vel * 0.6, 400); }
  function click(t, vel, f = 4000, pan = 0) { noiseHit(t, 0.03, 'bandpass', f, 3, vel, pan); }
  function rip(t, dur, vel) { for (let k = 0; k < dur * 70; k++) noiseHit(t + k / 70, 0.02, 'bandpass', 2400 + (k % 3) * 900, 2, vel * (0.6 + 0.4 * rnd(k + t))); }
  function creak(t, dur, vel, f = 180, pan = 0.2) { const o = osc('sawtooth', f, t, t + dur); o.frequency.linearRampToValueAtTime(f * 0.78, t + dur * 0.5); o.frequency.linearRampToValueAtTime(f * 1.15, t + dur); const am = osc('square', 23 + rnd(t) * 15, t, t + dur), ag = ac.createGain(); ag.gain.value = 0.5; chain(am, ag); const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vel, t + 0.06); g.gain.setValueAtTime(vel, t + dur - 0.08); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); ag.connect(g.gain); chain(o, filt('bandpass', 900, 8), g); out(g, pan, 0.4); }
  function rustle(t, dur, vel, pan = 0) { for (let k = 0; k < dur * 30; k++) { const tt = t + k / 30 + rnd(k * 3 + t) * 0.02; noiseHit(tt, 0.05 + rnd(k) * 0.04, 'bandpass', 1200 + rnd(k + 7) * 1800, 0.9, vel * (0.4 + 0.6 * Math.sin(Math.PI * k / (dur * 30))), pan); } }
  function rings(t, dur, vel) { for (let k = 0; k < dur * 35; k++) { const tt = t + k / 35 + rnd(k + t * 3) * 0.015; noiseHit(tt, 0.03, 'bandpass', 4200 + rnd(k) * 2500, 14, vel * (0.5 + rnd(k + 1) * 0.5), 0.3); } }
  function squeak(t, vel, pan = 0) { const o = osc('sine', 1700 + rnd(t) * 500, t, t + 0.1); o.frequency.linearRampToValueAtTime(2600, t + 0.04); o.frequency.linearRampToValueAtTime(2000, t + 0.09); const g = genv(t, 0.005, vel, 0.03, 0.05); chain(o, g); out(g, pan, 0.25); }
  function shoes(t0, t1, every, vel, pan = 0) { for (let t = t0, k = 0; t < t1; t += every, k++) { thud(t, vel, 350); if (k % 3 === 1) squeak(t + 0.02, vel * 0.35, pan); } }
  function bare(t0, t1, every, vel) { for (let t = t0; t < t1; t += every) { noiseHit(t, 0.06, 'bandpass', 700, 1.2, vel); noiseHit(t, 0.03, 'highpass', 2500, 0.7, vel * 0.4); } }
  function shuffle(t0, t1, vel, pan = 0) { for (let t = t0; t < t1; t += 0.22 + rnd(t * 10) * 0.2) { noiseHit(t, 0.25, 'bandpass', 500 + rnd(t) * 400, 1, vel, pan + (rnd(t + 2) - 0.5) * 0.6); } }
  function jingle(t, vel) { [3520, 4710, 6150].forEach((f, k) => { const o = osc('sine', f + rnd(t + k) * 200, t + k * 0.02, t + 0.4), g = genv(t + k * 0.02, 0.002, vel / (k + 1), 0, 0.25); chain(o, g); out(g, 0.3, 0.3); }); }
  function pant(t0, t1, vel) { for (let t = t0, k = 0; t < t1; t += 0.17, k++) noiseHit(t, 0.12, 'bandpass', k % 2 ? 1100 : 1500, 2, vel, -0.2); }
  function whimper(t, vel, f = 900) { const o = osc('sine', f, t, t + 0.5); o.frequency.linearRampToValueAtTime(f * 1.45, t + 0.15); o.frequency.linearRampToValueAtTime(f * 0.85, t + 0.45); const g = genv(t, 0.03, vel, 0.2, 0.2); chain(o, g); out(g, -0.2, 0.3); }
  function dogGrowl(t, dur, vel) { const o = osc('sawtooth', 95, t, t + dur), am = osc('sine', 28, t, t + dur), ag = ac.createGain(); ag.gain.value = 0.4; chain(am, ag); const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vel, t + 0.2); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); ag.connect(g.gain); chain(o, shaper(2), filt('bandpass', 420, 3), g); out(g, -0.2, 0.3); }
  function breath(t, dur, vel, inhale = true, pan = 0) { const n = bsrc(noise, t, dur), f = filt('bandpass', inhale ? 900 : 1300, 1.2); f.frequency.setValueAtTime(inhale ? 700 : 1500, t); f.frequency.linearRampToValueAtTime(inhale ? 1600 : 800, t + dur); const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vel, t + dur * 0.5); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); chain(n, f, g); out(g, pan, 0.2); }
  function panicBreath(t0, t1, vel) { for (let t = t0, k = 0; t < t1; t += 0.36, k++) breath(t, 0.3, vel, k % 2 === 0); }
  function gasp(t, vel) { breath(t, 0.35, vel, true); }
  function glassBang(t, vel) { thud(t, vel, 500); noiseHit(t, 0.6, 'bandpass', 1900, 18, vel * 0.6, 0, 0.4); noiseHit(t + 0.01, 0.4, 'bandpass', 3100, 14, vel * 0.4, 0.2, 0.3); }
  function scratch(t, dur, vel) { for (let k = 0; k < dur * 40; k++) noiseHit(t + k / 40, 0.03, 'bandpass', 3400 + rnd(k + t) * 1500, 6, vel * (0.5 + rnd(k + 3) * 0.5), 0.2); }
  function knock(t, vel) { noiseHit(t, 0.12, 'bandpass', 520, 2, vel); thud(t, vel * 0.5, 400); }
  function rattle(t, dur, vel) { for (let k = 0; k < dur * 22; k++) { click(t + k / 22, vel * (0.6 + rnd(k) * 0.4), 2100 + rnd(k + 9) * 600); } }
  function buzz(t0, t1, vel, flick = false) { const o = osc('square', 100, t0, t1), g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t0 + 0.1); if (flick) for (let t = t0; t < t1; t += 0.05) g.gain.setValueAtTime(rnd(Math.round(t * 20)) > 0.3 ? vel : vel * 0.05, t); g.gain.setValueAtTime(vel, t1 - 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t1); chain(o, filt('bandpass', 400, 3), g); out(g, 0.3, 0.1); }
  function crackle(t, dur, vel) { for (let k = 0; k < dur * 30; k++) if (rnd(k + t * 7) > 0.4) click(t + k / 30 + rnd(k) * 0.02, vel * rnd(k + 1), 1500 + rnd(k + 2) * 4000); }
  function hum(t0, t1, vel) { for (const [fq, k] of [[50, 1], [100, 0.5], [150, 0.25]]) { const o = osc('sine', fq, t0, t1 + 0.1), g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel * k, t0 + 0.3); g.gain.setValueAtTime(vel * k, t1 - 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t1); chain(o, g); out(g); } }
  function room(t0, t1, vel, f = 500) { const n = bsrc(brown, t0, t1 - t0), g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t0 + 0.5); g.gain.setValueAtTime(vel, t1 - 0.1); g.gain.exponentialRampToValueAtTime(0.0001, t1); chain(n, filt('lowpass', f), g); out(g); }
  function wind(t0, t1, vel) { const n = bsrc(noise, t0, t1 - t0), f = filt('bandpass', 500, 1.5); for (let t = t0; t < t1; t += 0.8) f.frequency.linearRampToValueAtTime(400 + rnd(t) * 900, t); const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t0 + 0.8); g.gain.exponentialRampToValueAtTime(0.0001, t1); chain(n, f, g); out(g, -0.3, 0.3); }
  function powerDown(t) { const o = osc('sawtooth', 240, t, t + 1.4); o.frequency.exponentialRampToValueAtTime(25, t + 1.3); const g = genv(t, 0.01, 0.5, 0, 1.35); chain(o, filt('lowpass', 1500), g); out(g, 0, 0.4); clank(t, 0.6); boom(t + 0.05, 0.4, 1.5); }
  function powerUp(t) { const o = osc('sawtooth', 40, t, t + 0.8); o.frequency.exponentialRampToValueAtTime(220, t + 0.7); const g = genv(t, 0.3, 0.35, 0.1, 0.3); chain(o, filt('lowpass', 1200), g); out(g); clank(t + 0.7, 0.6); crackle(t + 0.6, 0.3, 0.2); }
  function siren(t0, t1, vel) { const o = osc('sine', 650, t0, t1); for (let t = t0; t < t1; t += 1.2) { o.frequency.linearRampToValueAtTime(900, t + 0.6); o.frequency.linearRampToValueAtTime(650, t + 1.2); } const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t0 + 0.4); g.gain.exponentialRampToValueAtTime(0.0001, t1); chain(o, g); out(g, -0.5, 0.8); }
  function rotor(t0, t1, vel) { for (let t = t0; t < t1; t += 1 / 11) noiseHit(t, 0.06, 'lowpass', 300, 1, vel * Math.min(1, (t - t0) / 0.8) * Math.min(1, (t1 - t) / 0.5)); }
  function ding(t, vel) { [[1318.5, 1], [1046.5, 0.8]].forEach(([fq, k], i) => { const ti = t + i * 0.32; for (const m of [1, 2.76, 5.4]) { const o = osc('sine', fq * m, ti, ti + 2.5), g = genv(ti, 0.003, vel * k / (m * m * 0.6 + 0.4), 0, 2.2 / m); chain(o, g); out(g, 0, 0.6); } }); }
  function staticNoise(t0, t1, vel) { const n = bsrc(noise, t0, t1 - t0), g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); for (let t = t0; t < t1; t += 0.06) g.gain.setValueAtTime(vel * (0.3 + 0.7 * rnd(Math.round(t * 100))), t); g.gain.setValueAtTime(0.0001, t1); chain(n, filt('bandpass', 2200, 0.6), g); out(g, -0.2, 0.1); }
  function squelch(t, vel) { beep(t, 1450, 0.07, vel); staticNoise(t + 0.06, t + 0.3, vel * 0.8); }
  function slam(t, vel) { thud(t, vel, 300); noiseHit(t, 0.5, 'lowpass', 1200, 0.8, vel * 0.6, 0, 0.6); clank(t + 0.01, vel * 0.3); }
  function paper(t, vel) { whoosh(t - 0.12, 0.2, vel * 0.6, 1500, 5000); noiseHit(t, 0.06, 'highpass', 2000, 0.7, vel); thud(t, vel * 0.5, 800); }
  function ui(t, vel) { beep(t, 1600, 0.04, vel); beep(t + 0.05, 2400, 0.05, vel * 0.8); }
  function typeOn(t, n, vel) { for (let k = 0; k < n; k++) click(t + k * 0.035, vel * (0.6 + rnd(k) * 0.4), 3000 + rnd(k + 5) * 1500); }
  function signSlam(t, vel) { whoosh(t - 0.15, 0.2, vel * 0.5, 600, 3000); hit(t, vel); clank(t, vel * 0.25); }
  function scratchRec(t, vel) { const n = bsrc(noise, t, 0.4), f = filt('bandpass', 600, 4); f.frequency.setValueAtTime(600, t); f.frequency.exponentialRampToValueAtTime(2600, t + 0.12); f.frequency.exponentialRampToValueAtTime(400, t + 0.35); const g = genv(t, 0.01, vel, 0.25, 0.1); chain(n, f, g); out(g); }
  function boing(t, vel) { const o = osc('sine', 300, t, t + 0.6); for (let k = 0; k < 6; k++) o.frequency.linearRampToValueAtTime(k % 2 ? 260 : 520, t + 0.05 + k * 0.08); const g = genv(t, 0.01, vel, 0.2, 0.35); chain(o, g); out(g, 0, 0.2); }
  function wheels(t0, t1, vel) { for (let t = t0; t < t1; t += 0.06) noiseHit(t, 0.04, 'bandpass', 500 + rnd(Math.round(t * 100)) * 700, 2, vel); const o = osc('sine', 2900, t0, t1), g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); for (let t = t0; t < t1; t += 0.4) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vel * 0.25, t + 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.15); } chain(o, g); out(g, 0.2); }
  function motor(t0, t1, vel) { const o = osc('sawtooth', 55, t0, t1); o.frequency.linearRampToValueAtTime(80, t1); const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t1 - 0.1); g.gain.exponentialRampToValueAtTime(0.0001, t1); chain(o, filt('lowpass', 300), g); out(g); room(t0, t1, vel * 0.6, 300); }
  function doors(t, dur, vel) { const n = bsrc(brown, t, dur), g = genv(t, 0.05, vel, dur * 0.6, dur * 0.3); chain(n, filt('lowpass', 900), g); out(g, 0, 0.3); clank(t + dur, vel * 0.5); }
  function explosion(t, vel) { boom(t, vel, 3); const n = bsrc(noise, t, 2), g = genv(t, 0.01, vel * 0.5, 0.2, 1.6); chain(n, filt('lowpass', 700), g); out(g, 0.4, 0.8); }
  function velcro(t, vel) { rip(t, 0.1, vel); }

  // =====================================================================
  //  MUSIC — apocalyptic: braams, war drums, dissonant strings, a dark choir, horror piano, a ticking clock
  // =====================================================================
  to = 'm';
  const T42 = A('l42'), T45 = A('l45'), MUTE = A('l29:stumm'), END = 107.45;
  // the hook (0-8s): braam on frame 0, drums at full pelt, a tremolo cluster, a second braam on the title, the choir into Leipzig
  braam(0.0, 0.5, 3.2); drums(0.0, A('l05'), 'X..x..x.X.x.x..x', 0.55);
  strings(0.0, A('l05') + 0.3, ['D3', 'Eb3', 'A3', 'D4'], 0.05, { trem: 11, att: 0.3 });
  subDrone(0, A('l05'), 36.7, 0.12);
  braam(A('l03'), 0.45, 2.6); choir(A('l03'), A('l05') + 0.6, ['D3', 'F3', 'A3', 'D4'], 0.05, { att: 1.0 });
  shepard(A('l04'), A('l05'), 0.03); braam(A('l05'), 0.5, 3.5, ['D1', 'D2', 'Bb2'.replace('Bb2', 'A2')]);
  // the setup (8-22s): a cold drone, the horror piano, screeching harmonics, the clock
  subDrone(A('l05'), A('l14'), 36.7, 0.1);
  strings(A('l05') + 0.5, A('l14'), ['D3', 'A3', 'Eb4'], 0.025, { att: 2, cut: 1200 });
  [['D2', 0], ['Eb2', 2.6], ['A1', 5.2], ['D2', 7.8], ['Bb1', 10.4], ['Eb2', 12.4]].forEach(([n, dt]) => piano(A('l05') + 0.6 + dt, n.replace('Bb1', 'A1'), 0.18));
  screech(A('l11'), A('l12') + 0.2, 2200, 0.025); screech(A('l13'), A('l14'), 2600, 0.03);
  ticking(A('l07'), A('l14'), 0.5, 0.05);
  braam(A('l12'), 0.35, 2.2); braam(A('l14'), 0.45, 2.0);
  // the racing heart (22-29s): an ostinato, drums on 8ths, the rising tone
  ostinato(A('l14'), A('l18'), ['D2', 'D2', 'Eb2', 'D2'], 0.09);
  drums(A('l14'), A('l18'), 'X.......x.......', 0.45); shepard(A('l16'), A('l18'), 0.035);
  // the alarm (29-46.5s): everything; braams on the scream and on "Runter!", the choir, drums on 16ths. A hard stop when it's silenced.
  braam(A('l18'), 0.6, 3.0); braam(A('l23'), 0.6, 2.6);
  ostinato(A('l18'), MUTE, ['D2', 'D2', 'Eb2', 'D2', 'F2', 'D2', 'Eb2', 'C2'.replace('C2', 'D2')], 0.1);
  drums(A('l18'), MUTE, 'X.x.x.X.X.x.x.x.', 0.5);
  strings(A('l18'), MUTE, ['D3', 'Eb3', 'A3', 'D4'], 0.05, { trem: 12, att: 0.2, rel: 0.05 });
  choir(A('l21'), MUTE, ['D3', 'F3', 'A3', 'C4'], 0.045, { att: 1.0, rel: 0.05 });
  subDrone(A('l18'), MUTE, 36.7, 0.12);
  // after the silence (48-61s): a quiet pulse, the clock, piano, strings rising toward the door
  subDrone(MUTE + 0.8, T42, 36.7, 0.09); ticking(MUTE + 0.8, T42, 0.5, 0.05);
  ostinato(A('l30'), A('l36'), ['D2', '.', 'D2', '.'].map((n) => n === '.' ? 'D2' : n), 0.04);
  piano(A('l31'), 'Eb2', 0.16); piano(A('l35'), 'D2', 0.16);
  strings(A('l36'), A('l39') + 0.3, ['D3', 'Eb3', 'Ab3'.replace('Ab3', 'A3')], 0.04, { trem: 9, att: 1.5 }); shepard(A('l36'), A('l39'), 0.035);
  braam(A('l39'), 0.6, 2.8); drums(A('l39'), A('l40') + 0.4, 'X...x...X.x.x...', 0.45);
  // the blackout (63-67.5s): nothing but a sub and the heart (sfx)
  subDrone(T42 + 0.3, T45, 30, 0.13);
  // the whole floor at the door: the biggest braam, choir, drums
  braam(T45, 0.75, 3.5); choir(T45, A('l48'), ['D3', 'F3', 'A3', 'D4'], 0.06, { att: 0.4 }); drums(T45, A('l48'), 'X.x.X.x.X.x.XxXx', 0.55);
  strings(T45, A('l48') + 0.3, ['D3', 'Eb3', 'A3'], 0.05, { trem: 13, att: 0.1 });
  // the bathroom (70-79s): tense, quiet; the joke gets a hole in the music
  subDrone(A('l48'), A('l51'), 36.7, 0.09); ticking(A('l48'), A('l51'), 0.25, 0.04);
  strings(A('l48'), A('l51'), ['D3', 'A3', 'Eb4'], 0.025, { att: 1 }); piano(A('l49'), 'D2', 0.15); piano(A('l50'), 'Eb2', 0.15);
  // the elevator (79-86.7s): the rising tone, strings, a braam when the doors open
  subDrone(A('l52'), A('l56'), 36.7, 0.1); strings(A('l52'), A('l55'), ['D3', 'Eb3', 'A3', 'D4'], 0.04, { trem: 10, att: 2 }); shepard(A('l53'), A('l55'), 0.04);
  braam(A('l53'), 0.4, 1.8); braam(A('l55'), 0.7, 3.2); choir(A('l55'), A('l57'), ['D3', 'F3', 'Ab3'.replace('Ab3', 'A3'), 'D4'], 0.05, { att: 0.3 });
  // the chase (86.7-93.7s): drums, ostinato, strings, braams on the hits
  drums(A('l57'), A('l62'), 'X.xxX.x.X.xxX.xX', 0.55); ostinato(A('l57'), A('l62'), ['D2', 'D2', 'F2', 'D2', 'Eb2', 'D2', 'A2'.replace('A2', 'D2'), 'C2'.replace('C2', 'D2')], 0.11);
  strings(A('l57'), A('l62'), ['D3', 'F3', 'A3', 'D4'], 0.05, { trem: 12, att: 0.2 }); braam(A('l58'), 0.55, 2.0); braam(A('l60'), 0.45, 2.0);
  subDrone(A('l57'), A('l62'), 36.7, 0.11);
  // the stairs (93.7-104s): radio tension, the ER below (braam, choir), the roof above (a lighter choir)
  subDrone(A('l62'), A('l67'), 36.7, 0.1); strings(A('l62'), A('l65'), ['D3', 'A3', 'Eb4'], 0.03, { att: 1 }); ticking(A('l62'), A('l65'), 0.5, 0.04);
  braam(A('l65'), 0.6, 3.0); choir(A('l65'), A('l67') + 0.3, ['D3', 'F3', 'A3'], 0.06, { att: 0.5 });
  choir(A('l67'), A('l70'), ['F3', 'A3', 'C4', 'F4'], 0.05, { att: 1.0 }); strings(A('l67'), A('l70'), ['F3', 'C4', 'F4'], 0.03, { att: 1 });
  // the choice and the end: drums building, the last braam, the tail
  drums(A('l70'), END, 'X...x...X.x.x.x.', 0.5); shepard(A('l70'), END, 0.04); strings(A('l70'), END, ['D3', 'Eb3', 'A3', 'D4'], 0.045, { trem: 12, att: 0.5, rel: 0.05 });
  braam(END, 0.75, 3.0); choir(END, DURATION - 0.1, ['D3', 'F3', 'A3', 'D4'], 0.05, { att: 0.2, rel: 1.4 }); subDrone(END, DURATION - 0.1, 36.7, 0.12);

  // =====================================================================
  //  SOUND EFFECTS — every cut, every action
  // =====================================================================
  to = 's';
  SHOT_LIST.forEach(([t0, sc, cam], i) => {   // every cut: a whoosh sized by the camera; an impact on the shake shots
    if (i === 0) return;
    if (cam === 'fin') { whoosh(t0 - 0.22, 0.42, 0.4, 400, 5200, 0.3); click(t0, 0.15, 6000); }
    else if (cam === 'fout') whoosh(t0 - 0.05, 0.5, 0.35, 4500, 300, -0.3);
    else if (cam === 'shake') { whoosh(t0 - 0.2, 0.3, 0.35, 300, 3000); hit(t0, 0.6); }
    else whoosh(t0 - 0.15, 0.55, 0.15, 250, 1800, i % 2 ? 0.4 : -0.4);
  });
  // 1-3 the hook: the code-blue pager, he sits up (bones, bed, cloth), the hand on the curtain, the title
  hit(0, 0.8); boom(0, 0.7);
  for (let t = 0.05; t < 2.3; t += 0.75) { beep(t, 698, 0.18, 0.12); beep(t + 0.22, 880, 0.28, 0.12); }
  creak(0.1, 0.7, 0.12, 140); snap(0.25, 0.4, -0.2); snap(0.55, 0.35, 0.1); rustle(0.1, 0.8, 0.12); groan(0.3, 1.2, 0.12, 80); breath(0.15, 0.5, 0.08, true);
  rustle(S(2), 0.7, 0.18, 0.2); snap(S(2) + 0.3, 0.3); rings(S(2) + 0.65, 0.4, 0.12); thud(S(2) + 0.7, 0.2, 700); groan(S(2) + 0.5, 0.9, 0.1, 72);
  typeOn(S(3) + 0.1, 8, 0.12); paper(S(3) + 0.12, 0.3); creak(S(3) + 0.3, 0.5, 0.08, 120); snap(S(3) + 0.8, 0.25, 0.3); groan(S(3) + 0.6, 1.2, 0.1, 68);
  // 4-5 Lukas, the monitor, the finger
  gasp(S(4) + 0.05, 0.25); rustle(S(4) + 0.3, 0.5, 0.06); heart(S(4) + 0.2, 0.45); heart(S(4) + 0.95, 0.45);
  for (let t = S(5); t < S(6); t += 60 / 122) beep(t, 1000, 0.08, 0.08, 0.3);
  breath(S(5) + 0.2, 0.5, 0.1, true); breath(S(5) + 0.8, 0.5, 0.08, false); swell(VW('l04', 'Herzmonitor'), 1.0, 0.25); hit(VW('l04', 'Herzmonitor'), 0.5);
  // 6 Leipzig: wind, sirens, a far explosion, a helicopter
  wind(S(6), S(7) + 0.3, 0.08); siren(S(6) + 0.1, S(7) + 0.4, 0.035); explosion(S(6) + 0.6, 0.35); rotor(S(6), S(7), 0.05);
  // 7-10 the room: label, monitor, the wince, the dog
  hum(S(7), T42, 0.012); room(S(7), T42, 0.015);
  ui(S(7) + 0.12, 0.08); typeOn(S(7) + 0.15, 10, 0.06); for (let t = S(7) + 0.2; t < S(11); t += 60 / 88) beep(t, 1000, 0.07, 0.035, 0.4);
  breath(S(8) + 0.1, 0.4, 0.15, false); rustle(S(8) + 0.1, 0.6, 0.08); signSlam(S(8) + 0.2, 0.25); creak(S(8) + 0.5, 0.4, 0.05, 200);
  ui(S(9) + 0.12, 0.08); typeOn(S(9) + 0.15, 6, 0.06); pant(S(9), S(10), 0.08); for (let t = S(9) + 0.1; t < S(10); t += 0.98) { jingle(t, 0.1); rustle(t, 0.3, 0.05); }
  signSlam(S(10) + 0.1, 0.22); whimper(S(10) + 0.35, 0.08, 700); ticking(S(10), S(11), 1, 0.12); pant(S(10) + 0.3, S(10) + 0.8, 0.05);
  // 11-13 the man in bed B: breath behind the curtain, the flatline, the feet on the floor
  breath(S(11) + 0.2, 1.2, 0.05, false); rustle(S(11) + 1, 0.5, 0.05);
  hit(S(12), 0.6); beep(S(12) + 0.02, 1000, 1.7, 0.12, 0.5); signSlam(S(12) + 0.3, 0.2);
  creak(S(13), 0.5, 0.1, 130); snap(S(13) + 0.2, 0.35); thud(S(13) + 0.7, 0.55, 220); thud(S(13) + 1.05, 0.5, 220); boom(S(13) + 0.7, 0.35); groan(S(13) + 0.6, 1.2, 0.08, 66);
  // 14-18 the racing heart, the man stands, the reach, the clip
  gasp(S(14) + 0.02, 0.35); ui(S(14) + 0.05, 0.1);
  for (let t = S(14); t < A('l18'); ) { const b = bpmAt(t); heart(t, 0.55); beep(t + 0.04, 1000, 0.08, 0.1, 0.3); t += 60 / b; }
  for (let t = A('l18'); t < MUTE; ) { heart(t, 0.35); t += 60 / bpmAt(t); }
  rings(S(16), 0.5, 0.1); rustle(S(16), 1.0, 0.12); snap(S(16) + 0.2, 0.3, 0.3); snap(S(16) + 0.6, 0.3, -0.3); groan(S(16) + 0.1, 1.3, 0.16, 88, 0.3);
  panicBreath(S(17), S(18), 0.1); rustle(S(17) + 0.2, 0.6, 0.08);
  click(S(18) + 0.25, 0.5, 2500); thud(S(18) + 0.25, 0.25, 1200); whoosh(S(18) + 0.2, 0.3, 0.25, 800, 3000); squeak(S(18) + 0.27, 0.12);
  // 19-21 the alarm: the scream, the station echo, the empty chair
  boom(A('l18'), 0.7); alarm(A('l18'), MUTE, 0.17); gasp(S(20), 0.3);
  alarm(S(21) + 0.05, S(22), 0.06); creak(S(21) + 0.2, 1.2, 0.05, 300, -0.3); buzz(S(21), S(22), 0.01);
  // 22-24 the hallway turns: necks cracking one by one, groans, shuffling, shadows passing the door
  buzz(S(22), S(25), 0.015, true);
  for (let k = 0; k < 8; k++) snap(S(22) + 0.15 + k * 0.08, 0.28, (k % 3 - 1) * 0.6);
  for (let k = 0; k < 6; k++) groan(S(22) + 0.2 + k * 0.3, 1.6, 0.08 + k * 0.01, 70 + k * 9, (k % 3 - 1) * 0.6);
  shuffle(S(23), S(25), 0.18); screamZ(S(23) + 0.1, 0.1, 0.3); shuffle(S(24), S(25), 0.22, 0.5); groan(S(24) + 0.3, 1.2, 0.1, 75, 0.5);
  // 25-29 Jana bursts in, the dog, the bed, the brake
  slam(S(25), 0.8); shoes(S(25) + 0.05, S(26), 0.16, 0.25); breath(S(25) + 0.2, 0.3, 0.1, false);
  ui(S(26) + 0.12, 0.08); typeOn(S(26) + 0.15, 12, 0.06);
  jingle(S(27) + 0.2, 0.12); jingle(S(27) + 0.9, 0.08); pant(S(27), S(28), 0.05); rustle(S(27) + 0.4, 0.4, 0.05);
  signSlam(S(28) + 0.1, 0.3); creak(S(28) + 0.5, 1.2, 0.08, 110); squeak(S(28) + 1.4, 0.06);
  thud(S(29) + 0.1, 0.5, 300); clank(S(29) + 0.12, 0.85); signSlam(S(29) + 0.15, 0.2);
  // 30 the rule card, the hand, the mute button — then silence
  paper(A('l28'), 0.4); whoosh(MUTE - 0.45, 0.4, 0.2, 400, 2000); click(MUTE, 0.6, 3000); thud(MUTE, 0.3, 900); boom(MUTE, 0.3, 1.5);
  // 31-36 the leads, the IV: rips, the warning, the clamp, the tape, the slide, the press
  velcro(S(31) + 0.08, 0.3); velcro(S(31) + 0.23, 0.3); velcro(S(31) + 0.38, 0.3); breath(S(31), 0.3, 0.08, true);
  whoosh(S(32) + 0.2, 0.3, 0.2, 500, 2500); for (let k = 0; k < 4; k++) beep(S(32) + 0.6 + k * 0.67, 220, 0.4, 0.1);
  for (let k = 0; k < 7; k++) click(S(33) + 0.04 + k * 0.07, 0.35, 3500);
  rip(S(34) + 0.05, 0.45, 0.22);
  whoosh(S(35) + 0.05, 0.4, 0.12, 2000, 600); noiseHit(S(35) + 0.25, 0.15, 'bandpass', 700, 3, 0.15); breath(S(35) + 0.1, 0.25, 0.12, true);
  thud(S(36) + 0.08, 0.35, 500); rustle(S(36), 0.3, 0.05);
  // 37-40 the door: the handle moves, the lock that isn't, scratching, the face hits the glass
  rattle(S(37) + 0.4, 0.7, 0.2); creak(S(37) + 0.4, 0.8, 0.14, 220); clank(S(37) + 1.15, 0.3); breath(S(37) + 0.2, 0.6, 0.08, true);
  signSlam(S(38) + 0.15, 0.3); click(S(38) + 0.5, 0.25, 2000); click(S(38) + 0.62, 0.25, 2000);
  scratch(S(39), 1.6, 0.12); knock(S(39) + 0.5, 0.25); knock(S(39) + 1.2, 0.25); groan(S(39), 1.5, 0.08, 80, -0.3);
  glassBang(A('l39'), 0.9); screamZ(A('l39') + 0.05, 0.2); scratch(A('l39') + 0.3, 0.8, 0.15);
  // 41-45 6:48, the blackout: lights flicker, the breaker, the dark, a flashlight, a growl, the seconds
  ticking(S(41), T42, 1, 0.2); buzz(S(41), T42, 0.012);
  crackle(T42, 0.45, 0.3); buzz(T42, T42 + 0.45, 0.04, true); powerDown(T42 + 0.45);
  for (let t = T42 + 0.7; t < T45; t += 0.8) heart(t, 0.5);
  for (let t = T42 + 1.25; t < T45; t += 1) tick(t, 0.25);
  click(S(43), 0.4, 2500); breath(S(43) + 0.2, 0.5, 0.1, true); breath(S(43) + 0.8, 0.6, 0.08, false);
  dogGrowl(S(44) + 0.1, 1.1, 0.1); groan(S(44) + 0.4, 1.8, 0.05, 62, 0.6);
  breath(S(45), 0.4, 0.1, true); breath(S(45) + 0.5, 0.6, 0.08, false); scratch(S(45) + 0.3, 1.0, 0.06);
  // 46 the generator, and the whole floor at the door
  powerUp(T45 - 0.6); boom(T45, 0.95, 3.0); hum(T45, A('l56'), 0.012); buzz(T45, A('l48'), 0.02, true);
  for (let k = 0; k < 12; k++) knock(T45 + 0.2 + k * 0.16 + rnd(k) * 0.05, 0.45);
  for (let k = 0; k < 4; k++) glassBang(T45 + 0.3 + k * 0.45, 0.4); scratch(T45, 1.8, 0.15);
  for (let k = 0; k < 8; k++) groan(T45 + 0.1 + k * 0.2, 1.8, 0.1, 68 + k * 6, (k % 2 ? 0.5 : -0.5)); screamZ(T45 + 0.4, 0.15, -0.4);
  // 47-51 into the bathroom, the plan, the silent dog, the gown
  shoes(S(47), S(48), 0.15, 0.28); bare(S(47) + 0.07, S(48), 0.15, 0.15); jingle(S(47) + 0.2, 0.08); slam(S(47) + 1.0, 0.5);
  for (let k = 0; k < 9; k++) beep(S(48) + 0.2 + k * 0.18, 1400 + k * 90, 0.04, 0.05); ui(S(48) + 0.05, 0.08); typeOn(S(48) + 0.1, 10, 0.05);
  noiseHit(S(49) + 0.25, 0.5, 'highpass', 4000, 0.7, 0.08); whimper(S(49) + 0.7, 0.05, 1000); signSlam(S(49) + 0.15, 0.2); pant(S(49), S(49) + 0.4, 0.05);
  gasp(S(50) + 0.02, 0.3); panicBreath(S(50) + 0.4, S(51), 0.1);
  scratchRec(S(51), 0.3); boing(S(51) + 0.5, 0.15); bare(S(51), S(52), 0.3, 0.1); wind(S(51), S(51) + 1.0, 0.05);
  // 52-56 the elevator: bare feet, the button, "no no no", the motor, the doors
  bare(S(52), S(53), 0.4, 0.14); shoes(S(52) + 0.2, S(53), 0.5, 0.12); buzz(S(52), S(55), 0.012);
  click(S(53) + 0.35, 0.6, 2500); beep(S(53) + 0.37, 880, 0.12, 0.12); motor(S(53) + 0.4, A('l55'), 0.08);
  whoosh(S(54), 0.25, 0.25, 600, 3000); thud(S(54) + 0.12, 0.4, 600); breath(S(54) + 0.1, 0.3, 0.12, true); for (let k = 0; k < 3; k++) beep(S(54) + 0.3 + k * 0.45, 1320, 0.05, 0.05);
  paper(S(55) + 0.15, 0.4);
  doors(A('l55'), 0.5, 0.25); screamZ(A('l55') + 0.15, 0.2); boom(A('l55'), 0.7);
  // 57-61 "Pling", the lunge, the chair, the run
  ding(A('l56') - 0.02, 0.4);
  for (let k = 0; k < 8; k++) snap(S(57) + 0.1 + k * 0.07, 0.25, (k % 3 - 1) * 0.6);
  for (let k = 0; k < 8; k++) groan(S(57) + 0.2 + k * 0.15, 1.6, 0.13, 75 + k * 6, (k % 3 - 1) * 0.7); shuffle(S(57) + 0.5, S(59), 0.25);
  hit(S(58), 0.8); thud(S(58) + 0.1, 0.6, 400); screamZ(S(58) + 0.05, 0.18, -0.3); shoes(S(58), S(59), 0.2, 0.2);
  thud(S(59) + 0.25, 0.7, 250); creak(S(59) + 0.3, 0.3, 0.07, 300); squeak(S(59) + 0.35, 0.1);
  wheels(S(60), S(62), 0.08); shoes(S(60), S(62), 0.19, 0.24); for (let k = 0; k < 5; k++) groan(S(60) + k * 0.5, 1.4, 0.1, 80, 0.4); buzz(S(60), S(61), 0.03, true);
  for (let t = S(60) + 0.2; t < S(62); t += 0.55) whoosh(t, 0.3, 0.1, 800, 2500, 0.6);
  pant(S(61), S(62), 0.06); jingle(S(61) + 0.3, 0.06); bare(S(61), S(62), 0.12, 0.08);
  // 62-69 the radio, the stairs, the ER below, the roof above, the helipad
  squelch(S(62) - 0.03, 0.12); staticNoise(S(62), S(63), 0.05); ui(S(62) + 0.12, 0.06); typeOn(S(62) + 0.15, 10, 0.05);
  squelch(S(63) + 0.85, 0.08); explosion(S(63) + 0.3, 0.2); breath(S(63) + 0.1, 0.5, 0.08, false);
  slam(S(64), 0.35); shoes(S(64) + 0.1, S(65), 0.42, 0.18); bare(S(64) + 0.3, S(65), 0.42, 0.1); clank(S(64) + 0.9, 0.15);
  room(S(65), S(66), 0.08, 250); for (let k = 0; k < 10; k++) groan(S(65) + 0.1 + k * 0.15, 2.0, 0.08, 58 + k * 4, (k % 2 ? 0.6 : -0.6)); screamZ(S(65) + 0.6, 0.12); signSlam(S(65) + 0.1, 0.25);
  wind(S(66), S(67), 0.1); signSlam(S(66) + 0.1, 0.25);
  wind(S(67), S(68), 0.14); rotor(S(67), S(68) + 0.4, 0.12); for (let t = S(67); t < S(68); t += 0.12) noiseHit(t, 0.05, 'bandpass', 1500, 2, 0.04);   // the windsock flapping
  // 68-70 the choice, the end
  hit(S(68), 0.55); whoosh(S(68) - 0.2, 0.3, 0.3); beep(S(68) + 0.02, 1320, 0.1, 0.1);
  hit(S(69), 0.55); whoosh(S(69) - 0.2, 0.3, 0.3); beep(S(69) + 0.02, 660, 0.1, 0.1);
  boom(END, 0.9, 2.5); whoosh(END - 0.3, 0.35, 0.35, 300, 4000);
