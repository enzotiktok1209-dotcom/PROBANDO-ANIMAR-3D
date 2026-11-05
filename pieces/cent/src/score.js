  // =====================================================================
  //  SCORE BODY (inside buildScore) — every sound is synthesized here.
  //  1) an SFX library (~60 sounds), 2) a sound for every transition (varied), 3) each shot's own sfx,
  //  4) a music bed (100 BPM) that changes with the story: game show, party, tension, sad, Leo, race, silence, cliffhanger.
  // =====================================================================
  const RS = RNG('score');
  const bp = (t, dur, f0, f1, q, vel, pan = 0, send = 0) => noiseHit(t, dur, 'bandpass', f0, q, vel, pan, send, f1);
  const tone = (t, type, f0, f1, dur, vel, pan = 0, send = 0, att = 0.004) => { const o = osc(type, f0, t, t + dur + 0.05); if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur); const g = ac.createGain(); env(g, t, att, vel, dur); o.connect(g); out(g, pan, send); return o; };
  const lowTone = (t, type, f0, f1, dur, vel, cut, pan = 0) => { const o = osc(type, f0, t, t + dur + 0.05); if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + dur); const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = cut; const g = ac.createGain(); env(g, t, 0.006, vel, dur); o.connect(lp); lp.connect(g); out(g, pan); };
  const metal = (t, f, vel, dec = 0.6, pan = 0) => [1, 2.76, 5.4, 8.93].forEach((m, i) => tone(t, 'sine', f * m, 0, dec / (1 + i * 0.7), vel / (1 + i * 1.2), pan, 0.25, 0.001));
  const SFX = {
    whoosh: (t, r = 1, pan = 0) => { sweep(t, t + 0.3 / r, 0.05, 300 * r, 3200 * r, pan); bp(t, 0.32 / r, 500 * r, 2600 * r, 0.9, 0.05, pan, 0.2); },
    whooshUp: (t, r = 1) => { sweep(t, t + 0.35 / r, 0.06, 250, 5000 * r); tone(t, 'sine', 200, 900 * r, 0.32 / r, 0.03); },
    whooshDown: (t, r = 1) => { sweep(t, t + 0.35 / r, 0.05, 4000 * r, 300); tone(t, 'sine', 900, 160, 0.32 / r, 0.03); },
    swish: (t, r = 1, pan = 0) => bp(t, 0.16 / r, 1600 * r, 6500 * r, 1.4, 0.05, pan, 0.1),
    zoomIn: (t) => { sweep(t, t + 0.3, 0.07, 200, 6000); tone(t, 'sawtooth', 120, 600, 0.3, 0.012); noiseHit(t + 0.3, 0.06, 'lowpass', 900, 0.7, 0.08); },
    zoomOut: (t) => { sweep(t, t + 0.34, 0.06, 5000, 220); tone(t, 'sine', 700, 120, 0.34, 0.03); },
    pop: (t, p = 1) => { tone(t, 'sine', 700 * p, 220 * p, 0.09, 0.09); noiseHit(t, 0.015, 'highpass', 3000, 0.7, 0.03); },
    popHi: (t, p = 1) => { tone(t, 'sine', 1300 * p, 500 * p, 0.07, 0.07); },
    boing: (t) => { const o = tone(t, 'sine', 180, 0, 0.45, 0.07); for (let i = 0; i < 9; i++) o.frequency.setValueAtTime(180 + 260 * (i / 9) + (i % 2 ? 60 : -60) * (1 - i / 9), t + i * 0.045); },
    click: (t) => { noiseHit(t, 0.012, 'highpass', 2500, 0.7, 0.12); tone(t, 'sine', 1800, 900, 0.03, 0.05); },
    tap: (t) => { noiseHit(t, 0.02, 'bandpass', 1800, 2, 0.1); lowTone(t, 'sine', 160, 90, 0.08, 0.08, 600); },
    ding: (t) => { tone(t, 'sine', 1568, 0, 0.9, 0.06, 0, 0.3); tone(t, 'sine', 3136, 0, 0.5, 0.02); },
    ting: (t) => { tone(t, 'sine', 3200, 0, 0.7, 0.05, 0.2, 0.4, 0.001); tone(t, 'sine', 4800, 0, 0.4, 0.025, 0.2); },
    sparkle: (t) => { for (let i = 0; i < 6; i++) tone(t + i * 0.045, 'sine', 2600 + RS.f() * 2600, 0, 0.35, 0.025, RS.n(0.7), 0.5, 0.001); },
    bling: (t) => { SFX.sparkle(t); chime(t, [nz('E6'), nz('B5') * 2, nz('E6') * 1.5], 0.05); },
    coin: (t, p = 1) => metal(t, 1900 * p, 0.09, 0.7),
    coinBounce: (t) => { let dt = 0, a = 0.1; for (let i = 0; i < 6; i++) { metal(t + dt, 2000 + i * 40, a, 0.35); dt += 0.3 * Math.pow(0.55, i); a *= 0.62; } },
    cashReg: (t) => { tone(t, 'sine', 2093, 0, 0.9, 0.07, 0, 0.3, 0.001); tone(t, 'sine', 2637, 0, 0.8, 0.05, 0, 0.3, 0.001); noiseHit(t + 0.05, 0.16, 'bandpass', 900, 1.2, 0.06, 0, 0, 2400); for (let i = 0; i < 5; i++) metal(t + 0.12 + i * 0.035, 3000 + RS.f() * 1500, 0.025, 0.2, RS.n(0.5)); },
    moneyRain: (t, d = 1.5) => { for (let i = 0; i < d * 26; i++) { const tt = t + RS.f() * d; bp(tt, 0.05 + RS.f() * 0.05, 2500 + RS.f() * 3000, 0, 2, 0.025, RS.n(0.8)); } },
    cashCannon: (t) => { sub(t, 0.35); noiseHit(t, 0.4, 'lowpass', 1500, 0.7, 0.2, 0, 0.3, 300); SFX.moneyRain(t + 0.05, 1.2); },
    applause: (t, d = 1.5) => { for (let i = 0; i < d * 60; i++) { const tt = t + RS.f() * d, k = 1 - (tt - t) / d; bp(tt, 0.012, 1100 + RS.f() * 1800, 0, 1.5, 0.05 * (0.4 + 0.6 * k), RS.n(0.9)); } },
    sting: (t) => { ['C5', 'E5', 'G5'].forEach((n, i) => tone(t + i * 0.07, 'square', nz(n), 0, 0.12, 0.035, 0, 0.2)); ['C5', 'E5', 'G5', 'C6'].forEach((n) => tone(t + 0.22, 'sawtooth', nz(n), 0, 0.5, 0.02, 0, 0.4)); sub(t + 0.22, 0.2); },
    typing: (t, d = 1) => { for (let x = 0; x < d; x += 0.06 + RS.f() * 0.05) { noiseHit(t + x, 0.012, 'bandpass', 2500 + RS.f() * 1500, 3, 0.06, RS.n(0.3)); } },
    recordScratch: (t) => { for (let k = 0; k < 2; k++) { const tt = t + k * 0.14; bp(tt, 0.12, 800, 3500 - k * 1500, 4, 0.12); } },
    tension: (t, d = 1) => { drone(t, t + d, 55, 0.06, { att: 0.2, rel: 0.2 }); for (let x = 0; x < d; x += 0.06) tone(t + x, 'sawtooth', nz('A5') * 1.06, 0, 0.05, 0.006, 0.3); },
    slam: (t) => { sub(t, 0.5); noiseHit(t, 0.18, 'lowpass', 2500, 0.8, 0.3, 0, 0.3, 200); noiseHit(t, 0.02, 'highpass', 3000, 0.7, 0.2); },
    buzzerWin: (t) => { tone(t, 'triangle', nz('E5'), 0, 0.18, 0.06); tone(t + 0.18, 'triangle', nz('A5'), 0, 0.4, 0.06, 0, 0.3); },
    stamp: (t, v = 1) => { lowTone(t, 'sine', 140, 55, 0.18, 0.25 * v, 500); noiseHit(t, 0.06, 'lowpass', 1800, 0.7, 0.15 * v); },
    beep: (t, p = 1) => tone(t, 'square', 1250 * p, 0, 0.08, 0.025),
    errorBuzz: (t) => { tone(t, 'square', 140, 0, 0.55, 0.04); tone(t, 'square', 147, 0, 0.55, 0.04); },
    glitch: (t) => { for (let i = 0; i < 7; i++) tone(t + i * 0.03, 'square', 200 + RS.f() * 1800, 0, 0.025, 0.03, RS.n(0.8)); noiseHit(t, 0.2, 'highpass', 4000, 0.7, 0.04); },
    kiss: (t) => { tone(t, 'sine', 1200, 2400, 0.06, 0.05); noiseHit(t + 0.05, 0.02, 'highpass', 3000, 0.7, 0.05); },
    dun: (t) => { lowTone(t, 'sawtooth', 73, 0, 0.9, 0.12, 400); lowTone(t, 'sine', 55, 0, 1.0, 0.2, 300); },
    clockSpin: (t, d = 1.5) => { let x = 0, dt = 0.12; while (x < d) { noiseHit(t + x, 0.01, 'highpass', 4000, 0.7, 0.07); x += dt; dt = Math.max(0.03, dt * 0.88); } sweep(t, t + d, 0.02, 300, 2000); },
    engine: (t) => { const o = osc('sawtooth', 50, t, t + 1.2); o.frequency.linearRampToValueAtTime(130, t + 0.45); o.frequency.linearRampToValueAtTime(80, t + 0.7); o.frequency.linearRampToValueAtTime(150, t + 1.0);
      const lfo = osc('sine', 28, t, t + 1.2), lg = ac.createGain(); lg.gain.value = 18; lfo.connect(lg); lg.connect(o.frequency);
      const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 700; const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.12, t + 0.1); g.gain.setValueAtTime(0.12, t + 0.9); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
      o.connect(lp); lp.connect(g); out(g, 0.3, 0.1); noiseHit(t, 1.1, 'lowpass', 400, 0.7, 0.05, 0.3); bp(t + 0.1, 0.4, 2500, 1200, 6, 0.04, 0.4); },
    phoneTap: (t) => { noiseHit(t, 0.01, 'highpass', 3500, 0.7, 0.07); tone(t, 'sine', 2200, 0, 0.03, 0.02); },
    notify: (t) => { tone(t, 'sine', 1319, 0, 0.25, 0.06, 0, 0.3, 0.002); tone(t + 0.11, 'sine', 1760, 0, 0.4, 0.06, 0, 0.3, 0.002); },
    printer: (t, d = 1) => { for (let x = 0; x < d; x += 0.035) noiseHit(t + x, 0.02, 'bandpass', 2200 + (x * 1000) % 600, 3, 0.04); drone(t, t + d, 120, 0.02, { att: 0.05, rel: 0.05 }); },
    bassDrop: (t) => { const o = osc('sine', 130, t, t + 0.9); o.frequency.exponentialRampToValueAtTime(32, t + 0.8); const g = ac.createGain(); env(g, t, 0.005, 0.5, 0.85); o.connect(g); out(g); noiseHit(t, 0.3, 'lowpass', 2000, 0.7, 0.15, 0, 0.3, 200); },
    doorbell: (t) => { for (const [n, dt] of [['E5', 0], ['C5', 0.42]]) { tone(t + dt, 'sine', nz(n), 0, 1.0, 0.09, 0, 0.4, 0.002); tone(t + dt, 'sine', nz(n) * 3, 0, 0.4, 0.015, 0, 0.3, 0.002); } },
    creak: (t, r = 1) => { const o = osc('sawtooth', 90 * r, t, t + 0.55); for (let i = 0; i < 11; i++) o.frequency.setValueAtTime((90 + RS.f() * 60) * r, t + i * 0.05);
      const f = ac.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 900 * r; f.Q.value = 3; const g = ac.createGain(); env(g, t, 0.05, 0.05, 0.5); o.connect(f); f.connect(g); out(g, 0.2, 0.2); },
    footsteps: (t, d = 1) => { for (let x = 0; x < d; x += 0.32) { lowTone(t + x, 'sine', 120, 60, 0.08, 0.12, 400, x % 0.64 ? 0.2 : -0.2); noiseHit(t + x, 0.04, 'bandpass', 900, 1.5, 0.04); } },
    choir: (t) => { [['A3', 0], ['E4', 0], ['A4', 0], ['Cs5', 0]].forEach(([n]) => { const o = osc('sawtooth', nz(n), t, t + 1.4); const f = ac.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 2; const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.03, t + 0.4); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4); o.connect(f); f.connect(g); out(g, RS.n(0.5), 0.7); }); },
    squeak: (t) => { const o = tone(t, 'sine', 1800, 2800, 0.16, 0.06); const l = osc('sine', 40, t, t + 0.2), lg = ac.createGain(); lg.gain.value = 120; l.connect(lg); lg.connect(o.frequency); },
    sadTrombone: (t, v = 1) => { [['Bb3', 0, 0.3], ['A3', 0.32, 0.3], ['Ab3', 0.64, 0.3], ['G3', 0.96, 0.9]].forEach(([n, dt, d]) => { const o = osc('sawtooth', nz(n), t + dt, t + dt + d + 0.05); const l = osc('sine', 6, t + dt, t + dt + d), lg = ac.createGain(); lg.gain.value = dt > 0.9 ? 6 : 2; l.connect(lg); lg.connect(o.frequency);
      const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; const g = ac.createGain(); env(g, t + dt, 0.03, 0.06 * v, d); o.connect(lp); lp.connect(g); out(g, 0, 0.2); }); },
    shockHit: (t) => { sub(t, 0.45); ['D3', 'A3', 'D4', 'F4'].forEach((n) => tone(t, 'sawtooth', nz(n), 0, 0.35, 0.03, 0, 0.5)); noiseHit(t, 0.25, 'lowpass', 3000, 0.7, 0.2, 0, 0.4, 400); },
    bubble: (t) => tone(t, 'sine', 160, 420, 0.6, 0.03, 0, 0, 0.3),
    pat: (t) => { lowTone(t, 'sine', 180, 90, 0.07, 0.12, 700); noiseHit(t, 0.03, 'bandpass', 1200, 1.2, 0.06); },
    doorSlam: (t) => { sub(t, 0.55); noiseHit(t, 0.3, 'lowpass', 1200, 0.8, 0.3, 0, 0.4, 150); for (let i = 0; i < 4; i++) noiseHit(t + 0.05 + i * 0.04, 0.03, 'bandpass', 2500, 3, 0.05); },
    thunder: (t, v = 1) => { noiseHit(t, 0.08, 'highpass', 2000, 0.7, 0.08 * v); noiseHit(t + 0.02, 2.2, 'lowpass', 300, 0.7, 0.35 * v, 0, 0.5, 80); },
    rain: (t, d = 2) => { const src = ac.createBufferSource(); src.buffer = noise; src.loop = true; const f = ac.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 5000; f.Q.value = 0.5;
      const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.035, t + 0.3); g.gain.setValueAtTime(0.035, t + d - 0.3); g.gain.exponentialRampToValueAtTime(0.0001, t + d); src.connect(f); f.connect(g); out(g, 0, 0.2); src.start(t); src.stop(t + d + 0.05);
      for (let x = 0; x < d; x += 0.05 + RS.f() * 0.1) noiseHit(t + x, 0.01, 'highpass', 5000, 0.7, 0.03, RS.n(0.8)); },
    crunch: (t) => { for (let i = 0; i < 5; i++) noiseHit(t + i * 0.05 + RS.f() * 0.02, 0.04, 'bandpass', 1500 + RS.f() * 2500, 1.2, 0.12); },
    descend: (t) => { for (let i = 0; i < 6; i++) tone(t + i * 0.22, 'square', 880 * Math.pow(0.84, i), 0, 0.15, 0.025); },
    polish: (t) => { const o = tone(t, 'sine', 1300, 1700, 0.28, 0.035); const l = osc('sine', 22, t, t + 0.3), lg = ac.createGain(); lg.gain.value = 90; l.connect(lg); lg.connect(o.frequency); },
    keys: (t) => { for (let i = 0; i < 7; i++) metal(t + RS.f() * 0.25, 3500 + RS.f() * 2500, 0.025, 0.25, RS.n(0.5)); },
    flip: (t, p = 1) => { noiseHit(t, 0.07, 'highpass', 2500 * p, 0.7, 0.1); bp(t, 0.12, 900 * p, 3000 * p, 1, 0.04); },
    pencil: (t, d = 0.8) => { for (let x = 0; x < d; x += 0.04) bp(t + x, 0.03, 3000 + RS.f() * 2000, 0, 3, 0.02); },
    thud: (t) => { lowTone(t, 'sine', 110, 45, 0.3, 0.3, 400); noiseHit(t, 0.08, 'lowpass', 800, 0.7, 0.15); },
    scaleCreak: (t) => SFX.creak(t, 1.6),
    boom: (t) => { sub(t, 0.6); noiseHit(t, 1.6, 'lowpass', 220, 0.7, 0.3, 0, 0.6, 60); },
    tick: (t) => { noiseHit(t, 0.012, 'highpass', 3500, 0.7, 0.1); tone(t, 'sine', 2800, 0, 0.02, 0.02); },
    rocket: (t, d = 2) => { sweep(t, t + d, 0.05, 200, 2500); noiseHit(t, d, 'lowpass', 600, 0.7, 0.12, 0, 0.2, 1800); tone(t, 'sawtooth', 60, 240, d, 0.03); },
    fold: (t, p = 1) => { bp(t, 0.09, 3000 * p, 1500 * p, 1.2, 0.08); noiseHit(t + 0.05, 0.03, 'highpass', 4000, 0.7, 0.05); },
    planeWhoosh: (t, d = 1) => { sweep(t, t + d, 0.03, 800, 2400); },
    crumple: (t) => { for (let i = 0; i < 8; i++) bp(t + RS.f() * 0.3, 0.03, 2000 + RS.f() * 4000, 0, 2, 0.06); },
    rustle: (t) => { for (let i = 0; i < 6; i++) bp(t + RS.f() * 0.35, 0.05, 3000 + RS.f() * 3000, 0, 1.5, 0.04); },
    slurp: (t, d = 0.9) => { const src = ac.createBufferSource(); src.buffer = noise; const f = ac.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 6; for (let i = 0; i < 12; i++) f.frequency.setValueAtTime(500 + (i % 2) * 400 + RS.f() * 300, t + i * d / 12);
      const g = ac.createGain(); env(g, t, 0.05, 0.08, d); src.connect(f); f.connect(g); out(g); src.start(t, 0.3); src.stop(t + d + 0.05); },
    spit: (t) => { noiseHit(t, 0.25, 'bandpass', 2500, 0.8, 0.25, 0, 0.2, 700); tone(t, 'sine', 300, 120, 0.2, 0.08); for (let i = 0; i < 6; i++) tone(t + 0.1 + RS.f() * 0.4, 'sine', 500 + RS.f() * 700, 1400, 0.05, 0.02, RS.n(0.6)); },
    punch: (t) => { sub(t, 0.5); noiseHit(t, 0.05, 'bandpass', 1500, 1, 0.3); noiseHit(t, 0.15, 'lowpass', 900, 0.7, 0.2); },
    heartbeat: (t, d = 1.2) => { for (let x = 0; x < d; x += 0.75) { lowTone(t + x, 'sine', 70, 40, 0.14, 0.45, 200); lowTone(t + x + 0.2, 'sine', 62, 38, 0.12, 0.32, 200); } },
    impact: (t) => { sub(t, 0.7); ['D3', 'A3', 'D4', 'Fs4', 'A4'].forEach((n) => tone(t, 'sawtooth', nz(n), 0, 0.6, 0.03, 0, 0.5)); noiseHit(t, 0.5, 'lowpass', 3000, 0.7, 0.25, 0, 0.6, 200); },
    gulp: (t) => { tone(t, 'sine', 240, 110, 0.12, 0.12); tone(t + 0.14, 'sine', 200, 90, 0.1, 0.08); },
    riserShort: (t, d = 0.9) => riser(t, t + d, 0.025),
    riser: (t, d = 1.8) => riser(t, t + d, 0.04),
    whooshT: (t, r) => SFX.whoosh(t, r),
  };
  Object.assign(SFX, {
    pump: (t, d = 1.5) => { drone(t, t + d, 180, 0.03, { att: 0.05, rel: 0.1 }); for (let x = 0; x < d; x += 0.09) noiseHit(t + x, 0.03, 'bandpass', 1400, 4, 0.02); tone(t + d, 'sine', 1800, 0, 0.12, 0.04); },
    bikeBell: (t) => { for (const dt of [0, 0.12]) { tone(t + dt, 'sine', 3100, 0, 0.5, 0.05, 0.2, 0.3, 0.001); tone(t + dt, 'sine', 4650, 0, 0.3, 0.02, 0.2); } },
    paperPile: (t, d = 2) => { for (let x = 0; x < d; x += 0.12) { bp(t + x, 0.08, 2500 + RS.f() * 2000, 1200, 1.2, 0.07, RS.n(0.6)); noiseHit(t + x + 0.05, 0.04, 'lowpass', 600, 0.7, 0.05); } },
    paperTear: (t) => { for (let i = 0; i < 10; i++) bp(t + i * 0.03, 0.03, 3000 + RS.f() * 3000, 0, 2, 0.06); },
    trolley: (t, d = 1.4) => { for (let x = 0; x < d; x += 0.07) noiseHit(t + x, 0.03, 'bandpass', 900 + RS.f() * 500, 3, 0.02 + 0.04 * x / d); for (let x = 0; x < d; x += 0.23) metal(t + x, 2400 + RS.f() * 900, 0.012, 0.15); },
    screech: (t) => { const o = osc('sawtooth', 1800, t, t + 0.5); o.frequency.linearRampToValueAtTime(2400, t + 0.45); const f = ac.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 3000; f.Q.value = 6; const g = ac.createGain(); env(g, t, 0.01, 0.06, 0.45); o.connect(f); f.connect(g); out(g, 0.2, 0.2); bp(t, 0.45, 4000, 6000, 3, 0.06); },
    ratchet: (t) => { for (let i = 0; i < 8; i++) noiseHit(t + i * 0.05, 0.015, 'bandpass', 3000, 4, 0.06); },
    skid: (t) => bp(t, 0.6, 1800, 900, 5, 0.08, 0.2, 0.2),
    carMusic: (t, d = 1.8) => { for (let x = 0; x < d; x += 0.3) { lowTone(t + x, 'sine', 70, 40, 0.18, 0.4, 200); if (Math.round(x / 0.3) % 2) noiseHit(t + x, 0.08, 'bandpass', 1500, 1, 0.05); } },
    tickRun: (t, d = 1) => { for (let x = 0; x < d; x += 0.092) { noiseHit(t + x, 0.01, 'highpass', 4000, 0.7, 0.06); tone(t + x, 'sine', 1600 + x * 400, 0, 0.04, 0.015); } },
    grow: (t) => { tone(t, 'sine', 300, 1200, 1.2, 0.04, 0, 0.4, 0.2); SFX.sparkle(t + 0.9); },
    cardIn: (t) => { bp(t, 0.15, 800, 2400, 2, 0.06); noiseHit(t + 0.15, 0.02, 'highpass', 3000, 0.7, 0.08); },
    declined: (t) => { tone(t, 'square', 420, 0, 0.18, 0.05); tone(t + 0.22, 'square', 300, 0, 0.4, 0.05); },
    strain: (t, d = 2.5) => { for (let x = 0; x < d; x += 0.7) { lowTone(t + x, 'sawtooth', 110, 85, 0.35, 0.05, 500); bp(t + x, 0.35, 400, 300, 3, 0.03); } SFX.footsteps(t, d); },
    bikeRoll: (t, d = 1.8) => { for (let x = 0; x < d; x += 0.06) noiseHit(t + x, 0.02, 'bandpass', 5000, 6, 0.012); sweep(t, t + d, 0.02, 600, 900); },
  });
  Object.assign(SFX, {
    crickets: (t, d = 1) => { for (let x = 0; x < d; x += 0.45) for (let k = 0; k < 3; k++) tone(t + x + k * 0.05, 'sine', 4300, 0, 0.035, 0.03, 0.3); },
    liveOn: (t) => { tone(t, 'sine', 880, 0, 0.12, 0.05); tone(t + 0.12, 'sine', 1320, 0, 0.3, 0.06, 0, 0.3); noiseHit(t, 0.02, 'highpass', 3000, 0.7, 0.05); },
    donation: (t, p = 1) => { tone(t, 'triangle', 1046 * p, 0, 0.12, 0.05); tone(t + 0.1, 'triangle', 1568 * p, 0, 0.3, 0.05, 0, 0.3); SFX.coin(t + 0.05, 1.3 * p); },
    flicker: (t) => { for (let i = 0; i < 6; i++) noiseHit(t + i * 0.11 + RS.f() * 0.04, 0.03, 'bandpass', 120, 2, 0.12); },
    powerDown: (t) => { const o = osc('sawtooth', 240, t, t + 0.9); o.frequency.exponentialRampToValueAtTime(30, t + 0.85); const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; const g = ac.createGain(); env(g, t, 0.01, 0.12, 0.85); o.connect(lp); lp.connect(g); out(g); noiseHit(t, 0.05, 'highpass', 2500, 0.7, 0.12); },
    genStart: (t, d = 1) => { for (let i = 0; i < 3; i++) bp(t + i * 0.12, 0.1, 300, 900, 2, 0.06); const o = osc('sawtooth', 45, t + 0.4, t + 0.4 + d); const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 400; const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t + 0.4); g.gain.exponentialRampToValueAtTime(0.08, t + 0.5); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4 + d); o.connect(lp); lp.connect(g); out(g); },
    mopedHorn: (t) => { tone(t, 'square', 520, 0, 0.18, 0.04); tone(t + 0.22, 'square', 520, 0, 0.18, 0.04); },
    carHorn: (t) => { tone(t, 'sawtooth', 392, 0, 0.35, 0.03); tone(t, 'sawtooth', 494, 0, 0.35, 0.03); },
  });
  Object.assign(SFX, {
    coinPour: (t, d = 1) => { for (let x = 0; x < d; x += 0.035) metal(t + x, 2200 + RS.f() * 1800, 0.02, 0.18, RS.n(0.7)); },
    snore: (t, d = 1.3) => { for (let x = 0; x < d; x += 1.2) { bp(t + x, 0.5, 180, 260, 4, 0.06); tone(t + x + 0.6, 'sine', 900, 1400, 0.35, 0.012); } },
  });
  Object.assign(SFX, {
    waves: (t, d = 1) => { const src = ac.createBufferSource(); src.buffer = noise; src.loop = true; const f = ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 900; const g = ac.createGain();
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.06, t + d * 0.4); g.gain.exponentialRampToValueAtTime(0.0001, t + d); src.connect(f); f.connect(g); out(g, 0, 0.3); src.start(t); src.stop(t + d + 0.05); },
    grunt: (t) => { lowTone(t, 'sawtooth', 140, 110, 0.18, 0.05, 600); bp(t, 0.15, 500, 350, 3, 0.03); },
    coinTicks: (t, d = 1, rate = 3) => { for (let k = 0; k < d * rate; k++) metal(t + k / rate, 2600 + (k % 4) * 180, 0.03, 0.22, (k % 2 ? 0.3 : -0.3)); },
    startGun: (t) => { noiseHit(t, 0.06, 'highpass', 1500, 0.7, 0.3); sub(t, 0.35); noiseHit(t + 0.02, 0.6, 'lowpass', 1200, 0.7, 0.12, 0, 0.6, 200); },
    coinJar: (t) => { metal(t, 2300, 0.07, 0.5); tone(t + 0.02, 'sine', 620, 0, 0.25, 0.03, 0, 0.3); noiseHit(t, 0.02, 'highpass', 4000, 0.7, 0.04); },
    carDoor: (t) => { lowTone(t, 'sine', 160, 70, 0.12, 0.2, 500); noiseHit(t, 0.05, 'bandpass', 1400, 1.2, 0.1); },
    shipHorn: (t) => { lowTone(t, 'sawtooth', 98, 0, 1.0, 0.07, 500); lowTone(t, 'sawtooth', 147, 0, 1.0, 0.04, 600); },
    tickSoft: (t, p = 1) => { noiseHit(t, 0.01, 'highpass', 4500, 0.7, 0.045); tone(t, 'sine', 2600 * p, 0, 0.02, 0.012); },
    birds: (t, d = 1.5) => { for (let x = 0; x < d; x += 0.3 + RS.f() * 0.3) { const f = 2800 + RS.f() * 1500; tone(t + x, 'sine', f, f * 1.3, 0.08, 0.025, RS.n(0.6)); tone(t + x + 0.1, 'sine', f * 1.2, f, 0.06, 0.02, RS.n(0.6)); } },
  });
  const play = (t, name, ...a) => { if (SFX[name]) SFX[name](t, ...a); };

  // ---- 1) transitions: each type its own sound, varied per cut
  to = 's';
  for (const s of SHOTS) {
    if (!s.i) continue; const t = s.t0, d = TR_DUR[s.tr] ?? 0, a = t - d / 2, r = 0.85 + RS.f() * 0.4;
    switch (s.tr) {
      case 'whipL': SFX.whoosh(a, r, 0.6); SFX.swish(t, r, -0.6); break;
      case 'whipR': SFX.whoosh(a, r, -0.6); SFX.swish(t, r, 0.6); break;
      case 'whipU': SFX.whooshUp(a, r); break;
      case 'zoomIn': SFX.zoomIn(a); break;
      case 'zoomOut': SFX.zoomOut(a); break;
      case 'flash': noiseHit(t - 0.02, 0.25, 'highpass', 2500, 0.7, 0.07, 0, 0.4); tone(t, 'sine', 2400, 0, 0.3, 0.025, 0, 0.5); break;
      case 'glitch': SFX.glitch(a); break;
      case 'spin': sweep(a, a + d, 0.05, 400, 4000); for (let i = 0; i < 5; i++) bp(a + i * d / 5, 0.06, 1500 + i * 600, 0, 3, 0.03, (i % 2 ? 0.6 : -0.6)); break;
      case 'slide': bp(a, d, 300, 1400, 0.8, 0.06, 0, 0.1); break;
      case 'iris': SFX.swish(a, 0.8); SFX.pop(t + 0.1, 0.8); break;
      default: lowTone(t, 'sine', 140, 60, 0.12, 0.18, 500); noiseHit(t, 0.03, 'bandpass', 2000, 1, 0.05);
    }
  }
  // camera punches get a little zoom hit
  for (const s of SHOTS) for (const [t] of s.punch || []) { sweep(t - 0.12, t, 0.04, 600, 4000); lowTone(t, 'sine', 120, 55, 0.15, 0.15, 500); }
  // ---- 2) every shot's own sounds
  for (const s of SHOTS) for (const [t, name, ...a] of s.sfx || []) play(t, name, ...a);

  // ---- 3) the music bed, 100 BPM (0.6 s a beat); sections follow the story
  to = 'm';
  const BT = 0.6;
  const kick = (t, v = 1) => { const o = osc('sine', 150, t, t + 0.3); o.frequency.exponentialRampToValueAtTime(45, t + 0.12); const g = ac.createGain(); env(g, t, 0.003, 0.32 * v, 0.25); o.connect(g); out(g); };
  const clap = (t, v = 1) => { for (let i = 0; i < 3; i++) noiseHit(t + i * 0.012, 0.03, 'bandpass', 1300, 1.2, 0.09 * v, 0, 0.25); noiseHit(t + 0.036, 0.14, 'bandpass', 1200, 1, 0.06 * v, 0, 0.35); };
  const hat = (t, v = 1, open = false) => noiseHit(t, open ? 0.14 : 0.03, 'highpass', 7500, 0.7, 0.035 * v, 0.15);
  const bassN = (t, n, d = 0.25, v = 1) => { const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 420; const g = ac.createGain(); env(g, t, 0.005, 0.16 * v, d); osc('sawtooth', nz(n) / 2, t, t + d + 0.05).connect(lp); osc('sine', nz(n) / 2, t, t + d + 0.05).connect(lp); lp.connect(g); out(g); };
  const pizz = (t, n, v = 1) => pluck(t, nz(n), 0.09 * v, RS.n(0.4), 0.22, 3400, 0.25);
  function groove(t0, t1, o = {}) {
    const prog = o.prog ?? [['C3', ['C4', 'E4', 'G4']], ['A2', ['A3', 'C4', 'E4']], ['F2', ['F3', 'A3', 'C4']], ['G2', ['G3', 'B3', 'D4']]];
    for (let t = t0, b = 0; t < t1 - 0.05; t += BT / 2, b++) {
      const beat = b % 8, bar = Math.floor(b / 8), [root, ch] = prog[bar % prog.length];
      if (o.kick !== false && (beat === 0 || beat === 3 || beat === 4)) kick(t, beat === 3 ? 0.6 : 1);
      if (o.clap !== false && (beat === 2 || beat === 6)) clap(t, o.clapV ?? 1);
      if (o.hats !== false) { hat(t, beat % 2 ? 0.7 : 1, beat === 7); if (o.hat16) hat(t + BT / 4, 0.5); }
      if (o.bass !== false && (beat === 0 || beat === 3 || beat === 5)) bassN(t, root.replace(/\d/, (d) => String(Number(d) + 1)), 0.22);
      if (o.pizz !== false && beat % 2 === 1) pizz(t, ch[(beat + bar) % 3].replace(/\d/, (d) => String(Number(d) + 1)), o.pizzV ?? 0.8);
    }
  }
  const CMAJ = [['C3', ['C4', 'E4', 'G4']], ['A2', ['A3', 'C4', 'E4']], ['F2', ['F3', 'A3', 'C4']], ['G2', ['G3', 'B3', 'D4']]];
  const AMIN = [['A2', ['A3', 'C4', 'E4']], ['F2', ['F3', 'A3', 'C4']], ['D2', ['D3', 'F3', 'A3']], ['E2', ['E3', 'Gs3', 'B3']]];
  const FMAJ = [['F2', ['F3', 'A3', 'C4']], ['C3', ['C4', 'E4', 'G4']], ['G2', ['G3', 'B3', 'D4']], ['A2', ['A3', 'C4', 'E4']]];
  groove(0.25, 5.05, { prog: CMAJ, clapV: 0.8 });                      // game show
  groove(5.1, 23.3, { prog: CMAJ, hat16: true });                      // Kevin takes the million, mocks, the bet
  groove(23.38, 30.25, { prog: FMAJ, clap: false, pizzV: 0.8 });       // the race starts, cent by cent
  groove(30.3, 45.0, { prog: CMAJ, hat16: true, clapV: 1.1 });        // the spree
  groove(45.02, 49.45, { prog: FMAJ, hat16: true, pizzV: 0.7 });      // Jonas' counter
  groove(49.5, 57.2, { prog: CMAJ, kick: false, clapV: 0.7 });         // the visit
  groove(57.24, 61.7, { prog: CMAJ, hat16: true });                     // the yacht
  drone(61.76, 66.95, 55, 0.07, { att: 0.3, rel: 0.1 }); pad(61.76, 66.95, ['A2', 'E3', 'Bb3'], 0.02, { cut: 700 });   // who wins? close...
  drone(66.98, 71.2, 49, 0.07, { att: 0.3, rel: 0.05 });
  groove(71.4, 75.9, { prog: CMAJ, kick: false, clapV: 0.8 });          // Kevin's 420.000
  pad(75.96, 82.3, ['D3', 'A3', 'F4'], 0.025, { cut: 900, att: 0.2 }); drone(75.96, 82.3, 73.4, 0.05);   // Jonas, smug
  pad(82.38, 87.75, ['A2', 'E3', 'Bb3'], 0.022, { cut: 700 }); for (let t = 82.5; t < 87.6; t += BT / 2) hat(t, 0.5);   // counting...
  pad(87.85, 90.9, ['D3', 'A3', 'D4', 'F4'], 0.035, { cut: 1400, att: 0.2, rel: 0.6 });
  // ---- risers into dramatic hits on the key / reveal moments
  to = 's';
  // a cinematic "braam": a low detuned saw chord through a closing filter, a sub drop and a reverb burst
  function dramaHit(t, v = 1) {
    ['D1', 'D2', 'A2', 'D3', 'F3'].forEach((n, i) => { for (const det of [-9, 9]) { const o = osc('sawtooth', nz(n), t, t + 1.7); o.detune.value = det + i * 2;
      const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 3; lp.frequency.setValueAtTime(2600, t); lp.frequency.exponentialRampToValueAtTime(260, t + 1.4);
      const g = ac.createGain(); env(g, t, 0.01, 0.045 * v, 1.6); o.connect(lp); lp.connect(g); out(g, (i - 2) * 0.15, 0.5); } });
    sub(t, 0.6 * v); noiseHit(t, 1.2, 'lowpass', 900, 0.7, 0.22 * v, 0, 0.7, 120); noiseHit(t, 0.06, 'highpass', 2500, 0.7, 0.18 * v);
  }
  // a rising build that ends exactly on the hit
  function build(t1, d, v = 1) { const t0 = t1 - d; riser(t0, t1 - 0.02, 0.035 * v); for (let x = 0; x < d - 0.05; x += Math.max(0.05, 0.25 * (1 - x / d))) noiseHit(t0 + x, 0.03, 'bandpass', 600 + 2400 * (x / d), 3, 0.03 * v * (0.4 + x / d)); }
  const KEYS = [
    [1.12, 1.1, 1.0],    // hook, first phrase: the giant cheque — 1 MILLION
    [5.1, 1.2, 1.0],     // end of the hook question → Kevin
    [7.7, 0.6, 0.8],     // the slam
    [22.66, 1.0, 0.9],   // "Die Wette gilt!"
    [24.4, 0.9, 0.8],    // the race starts
    [49.55, 0.8, 0.7],   // 6 months later
    [66.2, 1.1, 1.0],    // "Sehr knapp!"
    [71.26, 2.2, 1.3],   // the reveal: 420.000 €
    [77.35, 1.0, 1.0],   // "Setz dich lieber hin, Kevin."
    [85.0, 1.2, 1.0],    // the question
    [87.82, 1.0, 1.1],   // end card
  ];
  for (const [t, d, v] of KEYS) { build(t, d, v); dramaHit(t, v); }
  dramaHit(0.02, 0.7);
  {
    const E = [0.02];
    for (const sh of SHOTS) { if (sh.i) E.push(sh.t0 - (TR_DUR[sh.tr] ?? 0) / 2, sh.t0); for (const [t] of sh.sfx || []) E.push(t); for (const [t] of sh.punch || []) E.push(t); }
    for (const [t, d] of KEYS) E.push(t - d, t);
    E.sort((a, b) => a - b);
    for (let i = 0; i + 1 < E.length; i++) { const a = E[i], b = E[i + 1]; if (b - a > 1.1 && a < DURATION - 1) for (let t = a + 0.55; t < b - 0.3; t += 0.6) SFX.tickSoft(t, 1 + (Math.round(t * 10) % 3) * 0.1); }
  }
