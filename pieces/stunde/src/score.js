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
  Object.assign(SFX, {
    splashSfx: (t) => { noiseHit(t, 0.5, 'lowpass', 1800, 0.7, 0.3, 0, 0.4, 300); for (let i = 0; i < 14; i++) bp(t + 0.05 + RS.f() * 0.6, 0.05, 1500 + RS.f() * 3000, 0, 2, 0.05, RS.n(0.7)); lowTone(t, 'sine', 180, 60, 0.25, 0.2, 600); },
    alarmRing: (t, d = 1) => { for (let x = 0; x < d; x += 0.035) { tone(t + x, 'square', 2300 + (Math.round(x / 0.035) % 2) * 300, 0, 0.03, 0.03, (Math.round(x / 0.035) % 2 ? 0.3 : -0.3)); metal(t + x, 3200, 0.012, 0.08); } },
    poof: (t) => { noiseHit(t, 0.45, 'lowpass', 2200, 0.7, 0.18, 0, 0.4, 500); tone(t, 'sine', 500, 1200, 0.2, 0.04); SFX.sparkle(t + 0.15); },
    rotor: (t, d = 1) => { for (let x = 0; x < d; x += 0.07) { lowTone(t + x, 'sine', 90, 60, 0.05, 0.12 * Math.min(1, x / 0.3 + 0.3), 500); noiseHit(t + x, 0.04, 'bandpass', 600, 1.5, 0.05); } },
    glassClink: (t) => { metal(t, 3200, 0.06, 0.5); metal(t + 0.05, 3600, 0.04, 0.4); },
    shutter: (t) => { noiseHit(t, 0.03, 'highpass', 3000, 0.7, 0.15); noiseHit(t + 0.06, 0.03, 'highpass', 2500, 0.7, 0.12); },
    buzzPhone: (t, d = 0.5) => { for (let x = 0; x < d; x += 0.25) { const o = osc('sawtooth', 160, t + x, t + x + 0.18); const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 400; const g = ac.createGain(); env(g, t + x, 0.01, 0.08, 0.16); o.connect(lp); lp.connect(g); out(g); } },
    breath: (t) => { noiseHit(t, 0.6, 'bandpass', 900, 0.8, 0.06, 0, 0.2, 500); noiseHit(t + 0.7, 0.5, 'bandpass', 700, 0.8, 0.05, 0, 0.2, 1200); },
    gasp: (t) => { noiseHit(t, 0.35, 'bandpass', 1200, 1.5, 0.08, 0, 0.2, 2200); },
    siren: (t, d = 1.2) => { for (let x = 0; x < d; x += 0.5) { tone(t + x, 'triangle', 700, 1000, 0.25, 0.03, -0.3); tone(t + x + 0.25, 'triangle', 1000, 700, 0.25, 0.03, 0.3); } },
    powerOn: (t) => { tone(t, 'sine', 200, 900, 0.35, 0.04, 0, 0.3); tone(t + 0.3, 'sine', 1320, 0, 0.4, 0.04, 0, 0.4); },
  });
  Object.assign(SFX, {
    hop: (t) => { lowTone(t, 'sine', 90, 50, 0.25, 0.18, 300); noiseHit(t, 0.35, 'lowpass', 700, 0.7, 0.08, 0, 0.3, 200); sweep(t + 0.05, t + 0.5, 0.025, 400, 1600); },
    ringtone: (t, d = 1) => { for (let x = 0; x < d; x += 0.5) ['E6', 'B5', 'E6', 'Gs6'].forEach((n, i) => tone(t + x + i * 0.09, 'sine', nz(n), 0, 0.08, 0.045, 0, 0.3, 0.002)); },
    cough: (t) => { for (const dt of [0, 0.18]) { noiseHit(t + dt, 0.12, 'bandpass', 700, 1.2, 0.18, 0, 0.1, 400); lowTone(t + dt, 'sawtooth', 180, 120, 0.08, 0.06, 900); } },
    whistle: (t) => { const o = tone(t, 'sine', 2900, 0, 0.5, 0.05); const l = osc('sine', 28, t, t + 0.5), lg = ac.createGain(); lg.gain.value = 140; l.connect(lg); lg.connect(o.frequency); },
  });
  const play = (t, name, ...a) => { if (SFX[name]) SFX[name](t, ...a); };

  Object.assign(SFX, {
    rumble: (t, d = 1.6) => { drone(t, t + d, 38, 0.1, { att: 0.4, rel: 0.2 }); noiseHit(t, d, 'lowpass', 180, 0.7, 0.12, 0, 0.3); },
    pizzSneak: (t) => { ['C4', 'Eb4', 'G4', 'F4', 'Eb4', 'C4'].forEach((n, i) => pluck(t + i * 0.16, nz(n), 0.09, 0, 0.18, 2400, 0.1)); },
    canOpen: (t) => { noiseHit(t, 0.05, 'highpass', 3000, 0.7, 0.12); noiseHit(t + 0.03, 0.35, 'bandpass', 5000, 1, 0.05, 0, 0, 2500); },
    knock: (t) => { lowTone(t, 'sine', 220, 120, 0.06, 0.3, 900); noiseHit(t, 0.03, 'bandpass', 2600, 2, 0.12); metal(t, 3100, 0.03, 0.15); },
    drip: (t) => { tone(t, 'sine', 1400, 2600, 0.06, 0.06); tone(t + 0.07, 'sine', 900, 1500, 0.05, 0.03); },
  });
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
      case 'slash': bp(a, 0.18, 4000, 900, 2, 0.08, 0.4, 0.2); noiseHit(t, 0.02, 'highpass', 5000, 0.7, 0.08); metal(t, 2600, 0.02, 0.3); break;
      case 'blinds': for (let i = 0; i < 6; i++) noiseHit(a + i * 0.045, 0.02, 'bandpass', 1800 + i * 300, 3, 0.07, (i % 2 ? 0.5 : -0.5)); break;
      case 'push': sweep(a, a + d, 0.05, 2500, 300); lowTone(t + 0.1, 'sine', 90, 50, 0.2, 0.2, 400); break;
      case 'ink': bp(a, d, 200, 1200, 0.9, 0.07, -0.4, 0.3); tone(a, 'sine', 300, 120, d, 0.03); break;
      case 'rgb': for (let i = 0; i < 4; i++) tone(a + i * 0.04, 'square', 300 + RS.f() * 900, 0, 0.03, 0.02); noiseHit(a, 0.12, 'highpass', 3000, 0.7, 0.05); break;
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
  const TB = 0.43;   // 140 BPM half-time trap: kick on 1, snare on 3, 8th hats with rolls, an 808 that glides
  const snare = (t, v = 1) => { noiseHit(t, 0.16, 'bandpass', 1900, 0.9, 0.13 * v, 0, 0.3); tone(t, 'triangle', 220, 160, 0.08, 0.05 * v); };
  const b808 = (t, n, d = 0.6, v = 1) => { const o = osc('sine', nz(n) / 2, t, t + d + 0.05); o.frequency.exponentialRampToValueAtTime(nz(n) / 2.2, t + d); const g = ac.createGain(); env(g, t, 0.005, 0.32 * v, d); const sh = ac.createWaveShaper(); const c = new Float32Array(256); for (let i = 0; i < 256; i++) { const x = i / 128 - 1; c[i] = Math.tanh(x * 2.2); } sh.curve = c; o.connect(sh); sh.connect(g); out(g); };
  function trap(t0, t1, o = {}) {
    const roots = o.roots ?? ['A2', 'A2', 'F2', 'E2'];
    for (let t = t0, b = 0; t < t1 - 0.05; t += TB / 2, b++) {
      const st = b % 16, bar = Math.floor(b / 16);
      if (st === 0 || st === 10) { kick(t, 1); b808(t, roots[bar % roots.length], st ? 0.4 : 0.8, o.bassV ?? 1); }
      if (st === 8) snare(t, o.snV ?? 1);
      if (o.hats !== false) { hat(t, st % 2 ? 0.6 : 0.9); if (st === 14 || st === 15) { hat(t + TB / 6, 0.5); hat(t + TB / 3, 0.5); } }
      if (o.lead && st % 4 === 2) pluck(t, nz(['E5', 'C5', 'A4', 'B4'][(bar + st) % 4]), 0.05, 0.3, 0.2, 3000, 0.3);
    }
  }
  // stunde: a new "bounce" bed — 118 BPM swing, a tuba-ish bass on 1 and 3, off-beat staccato stabs, claps, a shaker
  const BB = 60 / 118;
  const tuba = (t, n, d = 0.22, v = 1) => { const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 600; const g = ac.createGain(); env(g, t, 0.01, 0.2 * v, d); osc('square', nz(n) / 2, t, t + d + 0.05).connect(lp); lp.connect(g); out(g, 0, 0.05); };
  const shaker = (t, v = 1) => noiseHit(t, 0.04, 'highpass', 6000, 0.7, 0.022 * v, 0.3);
  function bounce(t0, t1, o = {}) {
    const prog = o.prog ?? FMAJ;
    for (let t = t0, b = 0; t < t1 - 0.05; t += BB / 2, b++) {
      const st = b % 8, bar = Math.floor(b / 8), [root, ch] = prog[bar % prog.length], sw = st % 2 ? BB * 0.08 : 0;
      if (o.kick !== false && (st === 0 || st === 4)) kick(t, 0.8);
      if (st === 0 || st === 4) tuba(t, root.replace(/\d/, (d) => String(Number(d) + 1)), 0.2, o.bassV ?? 1);
      if (st === 3 || st === 7) tuba(t + sw, ch[0].replace(/\d/, (d) => String(Number(d))), 0.12, 0.6);
      if (st === 2 || st === 6) clap(t, o.clapV ?? 0.9);
      if (st % 2 === 1) for (const n of ch) pluck(t + sw, nz(n.replace(/\d/, (d) => String(Number(d) + 1))), 0.022 * (o.stabV ?? 1), 0.2, 0.09, 4200, 0.15);
      shaker(t + sw, st % 2 ? 1 : 0.6); shaker(t + BB / 4 + sw, 0.4);
      if (o.lead && st === 0 && bar % 2 === 0) pluck(t, nz(['A5', 'C6', 'G5', 'F5'][Math.floor(bar / 2) % 4]), 0.05, -0.2, 0.3, 3200, 0.3);
    }
  }
  trap(0.25, 5.3, { roots: ['F1', 'F1', 'Db2', 'Eb2'], lead: true });
  bounce(5.37, 14.0, { prog: FMAJ, lead: true });
  groove(14.03, 19.0, { prog: CMAJ, hat16: true, clapV: 1.1 });
  bounce(19.01, 29.7, { prog: CMAJ, lead: true, clapV: 1.0 });
  groove(29.78, 34.95, { prog: AMIN, hat16: true });
  drone(35.09, 41.7, 49, 0.05, { att: 0.15, rel: 0.05 }); for (let t = 35.2; t < 41.6; t += 0.43) pizz(t, ['E4', 'G4', 'B4', 'G4'][Math.round((t - 35.2) / 0.43) % 4], 0.5);
  pad(41.78, 46.0, ['A2', 'E3', 'C4'], 0.022, { cut: 900 }); for (let t = 41.8; t < 46.0; t += 0.5) noiseHit(t, 0.01, 'highpass', 4000, 0.7, 0.06);
  for (let t = 45.4; t < 46.1; t += 0.43 / 4) hat(t, 0.6);
  trap(46.15, 50.0, { roots: ['A1', 'A1', 'F1', 'E1'], snV: 1.0 });
  bounce(50.06, 53.0, { prog: FMAJ, kick: false, clapV: 1.1 });
  trap(53.04, 63.2, { roots: ['D2', 'D2', 'Bb1', 'C2'], lead: true });
  pad(63.27, 70.4, ['D3', 'A3', 'F4'], 0.022, { cut: 800 }); groove(66.31, 70.4, { prog: AMIN, kick: false, clapV: 0.6, pizzV: 0.6 });
  bounce(70.53, 80.2, { prog: FMAJ, stabV: 0.8, clapV: 0.8 });
  trap(80.28, 82.4, { roots: ['F1', 'F1', 'Db2', 'C2'], lead: true, snV: 0.9 });
  // ---- risers into dramatic hits on the key / reveal moments
  to = 's';
  // a cinematic "braam": a low detuned saw chord through a closing filter, a sub drop and a reverb burst
  function dramaHit(t, v = 1) {
    ['D1', 'D2', 'A2', 'D3', 'F3'].forEach((n, i) => { for (const det of [-9, 9]) { const o = osc('sawtooth', nz(n), t, t + 1.7); o.detune.value = det + i * 2;
      const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 3; lp.frequency.setValueAtTime(2600, t); lp.frequency.exponentialRampToValueAtTime(260, t + 1.4);
      const g = ac.createGain(); env(g, t, 0.01, 0.06 * v, 1.6); o.connect(lp); lp.connect(g); out(g, (i - 2) * 0.15, 0.5); } });
    sub(t, 0.6 * v); noiseHit(t, 1.2, 'lowpass', 900, 0.7, 0.22 * v, 0, 0.7, 120); noiseHit(t, 0.06, 'highpass', 2500, 0.7, 0.18 * v);
  }
  // a rising build that ends exactly on the hit
  function build(t1, d, v = 1) { const t0 = t1 - d; riser(t0, t1 - 0.02, 0.06 * v); for (let x = 0; x < d - 0.05; x += Math.max(0.05, 0.25 * (1 - x / d))) noiseHit(t0 + x, 0.03, 'bandpass', 600 + 2400 * (x / d), 3, 0.03 * v * (0.4 + x / d)); }
  const KEYS = [
    [0.22, 0, 1.1], [15.45, 0.9, 0.95], [34.0, 1.0, 1.05], [46.15, 1.2, 1.1], [61.9, 1.0, 1.05], [68.0, 0.6, 0.85], [73.2, 0, 0.8],
  ];
  for (const [t, d, v] of KEYS) { if (d > 0) build(t, d, v); dramaHit(t, v); }
  // every sticker, pop-text and price tag that springs in gets its own sound (unless the shot already has one there)
  {
    const POPS = ['pop', 'popHi', 'swish'];
    for (const sh of SHOTS) {
      const src = String(sh.ui || ''), own = (sh.sfx || []).map(([t]) => t), seen = [];
      const re = /(?:info|popText)\((['"`])(?:\\.|(?!\1).)*\1,\s*(?:[^,]+,\s*[^,]+,\s*)?([\d.]+)|springEase\(TT - ([\d.]+)/g;
      let m; while ((m = re.exec(src))) { const t = parseFloat(m[2] ?? m[3]); if (!(t >= sh.t0 - 0.05 && t < sh.t1) || own.some((u) => Math.abs(u - t) < 0.1) || seen.some((u) => Math.abs(u - t) < 0.1)) continue;
        seen.push(t); const k = Math.round(t * 10) % 3; play(t, POPS[k], 0.9 + (k * 0.15)); if (k === 2) SFX.pop(t + 0.03, 1.2); }
    }
  }
  // dramatic accents where the picture had room to breathe
  for (const [t, name, ...a] of [[5.37, 'dun'], [19.01, 'bassDrop'], [35.09, 'dun'], [41.78, 'dun'], [53.04, 'bassDrop'], [63.27, 'dun'], [70.53, 'bassDrop'], [80.28, 'bassDrop']]) play(t, name, ...a);
  // the hook: a fast zoom on the first frame with its swoosh (the riser starts right under it)
  SFX.whooshDown(0.0, 1.4); SFX.whoosh(0.02, 1.2, 0);
  {
    const E = [0.02];
    for (const sh of SHOTS) { if (sh.i) E.push(sh.t0 - (TR_DUR[sh.tr] ?? 0) / 2, sh.t0); for (const [t] of sh.sfx || []) E.push(t); for (const [t] of sh.punch || []) E.push(t); }
    for (const [t, d] of KEYS) E.push(t - Math.max(d, 0.01), t);
    E.sort((a, b) => a - b);
    for (let i = 0; i + 1 < E.length; i++) { const a = E[i], b = E[i + 1]; if (b - a > 1.1 && a < DURATION - 1) for (let t = a + 0.55; t < b - 0.3; t += 0.6) SFX.tickSoft(t, 1 + (Math.round(t * 10) % 3) * 0.1); }
  }
