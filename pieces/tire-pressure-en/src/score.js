  // =====================================================================
  //  SCORE BODY (inside buildScore) — every sound is synthesized here.
  //  1) a library of realistic-leaning sound effects (air, engine, road, water, metal, rubber, weather, UI),
  //  2) a whoosh / hit for every transition, a zoom swish for every camera punch,
  //  3) each shot's own sounds (shots.js `sfx`), 4) a low cinematic bed that follows the story
  //     (riser + braam in the hook, drones under the tension lines, the payoff hit on "full").
  // =====================================================================
  const RS = RNG('score');
  const bp = (t, dur, f0, f1, q, vel, pan = 0, send = 0) => noiseHit(t, dur, 'bandpass', f0, q, vel, pan, send, f1);
  const tone = (t, type, f0, f1, dur, vel, pan = 0, send = 0, att = 0.004) => { const o = osc(type, f0, t, t + dur + 0.05); if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur); const g = ac.createGain(); env(g, t, att, vel, dur); o.connect(g); out(g, pan, send); return o; };
  const lowTone = (t, type, f0, f1, dur, vel, cut, pan = 0, send = 0) => { const o = osc(type, f0, t, t + dur + 0.05); if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + dur); const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = cut; const g = ac.createGain(); env(g, t, 0.006, vel, dur); o.connect(lp); lp.connect(g); out(g, pan, send); return o; };
  const metal = (t, f, vel, dec = 0.6, pan = 0) => [1, 2.76, 5.4, 8.93].forEach((m, i) => tone(t, 'sine', f * m, 0, dec / (1 + i * 0.7), vel / (1 + i * 1.2), pan, 0.25, 0.001));
  // a sustained filtered-noise bed with fades and an optional wobble (air, wind, road, rooms)
  function bed(t, d, type, f, q, vel, o = {}) {
    if (d <= 0.02) return;
    const src = ac.createBufferSource(); src.buffer = noise; src.loop = true;
    const fl = ac.createBiquadFilter(); fl.type = type; fl.frequency.setValueAtTime(f, t); fl.Q.value = q;
    if (o.f1) fl.frequency.exponentialRampToValueAtTime(o.f1, t + d);
    const g = ac.createGain(), a = Math.min(o.att ?? 0.08, d / 3), r = Math.min(o.rel ?? 0.12, d / 3);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vel, t + a); g.gain.setValueAtTime(vel, t + d - r); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    let last = g;
    if (o.lfo) { const l = osc('sine', o.lfo, t, t + d + 0.05), lg = ac.createGain(), am = ac.createGain(); lg.gain.value = (o.depth ?? 0.5) * 0.5; am.gain.value = 1 - (o.depth ?? 0.5) * 0.5; l.connect(lg); lg.connect(am.gain); g.connect(am); last = am; }
    if (o.fl) { const l = osc('sine', o.fl, t, t + d + 0.05), lg = ac.createGain(); lg.gain.value = o.flDepth ?? f * 0.3; l.connect(lg); lg.connect(fl.frequency); }
    src.connect(fl); fl.connect(g); out(last, o.pan ?? 0, o.send ?? 0); src.start(t, (t * 1.37) % 2.5); src.stop(t + d + 0.05);
  }
  const SFX = {
    // ---- transitions
    whoosh: (t, r = 1, pan = 0) => { sweep(t, t + 0.3 / r, 0.06, 300 * r, 3400 * r, pan); bp(t + 0.05, 0.3 / r, 600 * r, 2800 * r, 0.9, 0.06, pan, 0.25); },
    whooshDown: (t, r = 1) => { sweep(t, t + 0.34 / r, 0.06, 4200 * r, 280); tone(t, 'sine', 800, 140, 0.32 / r, 0.03); },
    swish: (t, r = 1, pan = 0) => bp(t, 0.16 / r, 1600 * r, 6500 * r, 1.4, 0.06, pan, 0.1),
    zoomIn: (t) => { sweep(t, t + 0.3, 0.07, 200, 6000); tone(t, 'sawtooth', 110, 520, 0.3, 0.012); noiseHit(t + 0.3, 0.07, 'lowpass', 900, 0.7, 0.1); },
    zoomOut: (t) => { sweep(t, t + 0.34, 0.07, 5200, 220); tone(t, 'sine', 700, 120, 0.34, 0.03); },
    timeCut: (t) => { bed(t - 0.35, 0.37, 'highpass', 1500, 0.7, 0.05, { att: 0.33, rel: 0.02, f1: 7000 }); tone(t - 0.35, 'sine', 300, 1800, 0.35, 0.02, 0, 0.4); noiseHit(t, 0.05, 'highpass', 3000, 0.7, 0.12); tone(t, 'sine', 2600, 0, 0.6, 0.025, 0, 0.6, 0.001); },
    // ---- the cinematic hits
    hitStart: (t) => { sub(t, 0.5); noiseHit(t, 0.25, 'lowpass', 2400, 0.8, 0.25, 0, 0.4, 200); SFX.whoosh(t, 1.3); },
    riser: (t, d = 4) => { riser(t, t + d, 0.035); bed(t, d, 'bandpass', 500, 2, 0.03, { f1: 6000, att: d * 0.8, rel: 0.03 }); for (let x = 0; x < d; x += 0.25 * Math.max(0.3, 1 - x / d)) tone(t + x, 'sine', 1200 + x * 300, 0, 0.05, 0.006 + 0.012 * x / d, RS.n(0.6)); },
    riserShort: (t, d = 1.5) => { riser(t, t + d, 0.03); bed(t, d, 'bandpass', 400, 2, 0.025, { f1: 5000, att: d * 0.85, rel: 0.02 }); },
    braam: (t) => { // a big low brass-like "braam" with a sub drop and a long tail
      sub(t, 0.7);
      for (const [n, v] of [['D1', 0.12], ['D2', 0.1], ['A2', 0.06], ['D3', 0.04], ['F3', 0.025]]) for (const det of [-9, 0, 9]) { const o = osc('sawtooth', nz(n), t, t + 2.8); o.detune.value = det; const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 3; lp.frequency.setValueAtTime(220, t); lp.frequency.exponentialRampToValueAtTime(1300, t + 0.18); lp.frequency.exponentialRampToValueAtTime(260, t + 2.6); const g = ac.createGain(); env(g, t, 0.03, v / 2.2, 2.6); o.connect(lp); lp.connect(g); out(g, det / 30, 0.5); }
      noiseHit(t, 0.6, 'lowpass', 1800, 0.7, 0.2, 0, 0.6, 120);
    },
    lowHit: (t) => { sub(t, 0.45); lowTone(t, 'sawtooth', 73, 0, 1.2, 0.1, 360); lowTone(t, 'sine', 55, 0, 1.4, 0.2, 300); noiseHit(t, 0.3, 'lowpass', 900, 0.7, 0.1, 0, 0.5, 100); },
    impact: (t) => { sub(t, 0.7); ['D3', 'A3', 'D4', 'F4'].forEach((n) => tone(t, 'sawtooth', nz(n), 0, 0.5, 0.025, 0, 0.5)); noiseHit(t, 0.4, 'lowpass', 3000, 0.7, 0.25, 0, 0.6, 200); },
    payoffHit: (t) => { SFX.impact(t); ['D4', 'Fs4', 'A4', 'D5'].forEach((n, i) => tone(t + 0.02 * i, 'triangle', nz(n), 0, 1.6, 0.03, (i - 1.5) * 0.3, 0.7)); chime(t + 0.05, [nz('D6'), nz('A5'), nz('Fs5')], 0.04); },
    endHit: (t) => { sub(t, 0.6); noiseHit(t, 1.2, 'lowpass', 600, 0.7, 0.2, 0, 0.7, 60); ['D3', 'A3', 'D4'].forEach((n) => tone(t, 'triangle', nz(n), 0, 1.6, 0.03, 0, 0.7)); },
    drone: (t, d, f = 55) => { drone(t, t + d, f, 0.09, { att: 0.25, rel: 0.25 }); drone(t, t + d, f * 1.5, 0.03, { att: 0.4, rel: 0.25 }); bed(t, d, 'lowpass', 180, 0.7, 0.05, { att: 0.3 }); },
    heartbeat: (t, d = 1.5) => { for (let x = 0; x < d; x += 0.78) { lowTone(t + x, 'sine', 72, 40, 0.14, 0.4, 220); lowTone(t + x + 0.2, 'sine', 62, 38, 0.12, 0.28, 220); } },
    // ---- air, gauges, the pump
    airHiss: (t, d = 1) => { bed(t, d, 'bandpass', 4200, 0.9, 0.05, { fl: 13, flDepth: 600, att: 0.03, rel: 0.15 }); bed(t, d, 'highpass', 7000, 0.7, 0.025, { att: 0.03 }); },
    compressor: (t, d = 1) => { const o = osc('sawtooth', 48, t, t + d + 0.05), l = osc('sine', 24, t, t + d), lg = ac.createGain(); lg.gain.value = 4; l.connect(lg); lg.connect(o.frequency); const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 320; const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.06, t + 0.08); g.gain.setValueAtTime(0.06, t + d - 0.1); g.gain.exponentialRampToValueAtTime(0.0001, t + d); o.connect(lp); lp.connect(g); out(g, -0.3); bed(t, d, 'bandpass', 900, 3, 0.012, { lfo: 24, depth: 0.8, pan: -0.3 }); },
    gaugePress: (t) => { noiseHit(t, 0.02, 'highpass', 2500, 0.7, 0.12); bp(t + 0.01, 0.12, 5000, 2500, 1, 0.05); tone(t + 0.12, 'square', 2200, 0, 0.05, 0.015); },
    chuckOff: (t) => { noiseHit(t, 0.02, 'highpass', 2000, 0.7, 0.14); bp(t, 0.35, 6000, 2500, 0.8, 0.07); metal(t + 0.02, 1500, 0.03, 0.25); },
    beep2: (t) => { tone(t, 'square', 1880, 0, 0.09, 0.018); tone(t + 0.14, 'square', 1880, 0, 0.12, 0.018); },
    beepBad: (t) => { tone(t, 'square', 420, 0, 0.16, 0.022); tone(t, 'square', 446, 0, 0.16, 0.02); tone(t + 0.2, 'square', 420, 0, 0.22, 0.022); },
    confirm: (t) => { tone(t, 'sine', 1320, 0, 0.12, 0.04, 0, 0.3); tone(t + 0.1, 'sine', 1760, 0, 0.35, 0.04, 0, 0.4); },
    ding: (t) => { tone(t, 'sine', 1568, 0, 0.9, 0.05, 0, 0.35); tone(t, 'sine', 3136, 0, 0.5, 0.015); },
    tick: (t) => { noiseHit(t, 0.012, 'highpass', 3500, 0.7, 0.1); tone(t, 'sine', 2800, 0, 0.02, 0.02); },
    tickRun: (t, d = 1.2) => { let x = 0, dt = 0.11; while (x < d) { noiseHit(t + x, 0.01, 'highpass', 4000, 0.7, 0.07); tone(t + x, 'sine', 2400 + x * 600, 0, 0.015, 0.01); x += dt; dt = Math.max(0.028, dt * 0.88); } },
    countDown: (t, d = 0.9) => { for (let i = 0; i < 4; i++) tone(t + i * d / 4, 'square', 1400 - i * 160, 0, 0.06, 0.014); },
    tagPop: (t) => { tone(t, 'sine', 620, 240, 0.08, 0.06); noiseHit(t, 0.015, 'highpass', 3000, 0.7, 0.04); },
    stamp: (t) => { lowTone(t, 'sine', 140, 55, 0.2, 0.25, 500); noiseHit(t, 0.07, 'lowpass', 1800, 0.7, 0.15); },
    tap: (t) => { noiseHit(t, 0.02, 'bandpass', 1800, 2, 0.12); lowTone(t, 'sine', 170, 90, 0.08, 0.1, 600); },
    notify: (t) => { tone(t, 'sine', 1319, 0, 0.25, 0.05, 0, 0.3, 0.002); tone(t + 0.11, 'sine', 1760, 0, 0.45, 0.05, 0, 0.35, 0.002); },
    // ---- places
    nightAmb: (t, d = 2) => { bed(t, d, 'lowpass', 220, 0.7, 0.05, { att: 0.2, rel: 0.2 }); const h = osc('sine', 120, t, t + d), g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.006, t + 0.2); g.gain.setValueAtTime(0.006, t + d - 0.2); g.gain.exponentialRampToValueAtTime(0.0001, t + d); h.connect(g); out(g, 0.4); bed(t, d, 'bandpass', 1200, 4, 0.006, { lfo: 0.3, depth: 0.6, pan: -0.5 }); },
    morningAmb: (t, d = 2) => { bed(t, d, 'lowpass', 600, 0.7, 0.025, { att: 0.2 }); for (let x = 0.1; x < d; x += 0.35 + RS.f() * 0.5) { const f = 2600 + RS.f() * 2200, n = 2 + Math.floor(RS.f() * 3); for (let k = 0; k < n; k++) tone(t + x + k * 0.07, 'sine', f, f * (0.8 + RS.f() * 0.5), 0.05, 0.012, RS.n(0.8), 0.4); } },
    crickets: (t, d = 2) => { for (let x = 0; x < d; x += 0.42) { const pan = RS.n(0.8); for (let k = 0; k < 4; k++) tone(t + x + k * 0.035, 'sine', 4600 + RS.f() * 300, 0, 0.022, 0.012, pan); } bed(t, d, 'lowpass', 200, 0.7, 0.03); },
    garageAmb: (t, d = 1.5) => { bed(t, d, 'lowpass', 300, 0.7, 0.03); const h = osc('sine', 100, t, t + d), g = ac.createGain(); env(g, t, 0.1, 0.008, d); h.connect(g); out(g); },
    roomTone: (t, d = 1.5) => { bed(t, d, 'lowpass', 400, 0.7, 0.02); for (let x = 0; x < d; x += 0.5) SFX.tick(t + x); },
    labHum: (t, d = 2) => { const h = osc('sine', 100, t, t + d), g = ac.createGain(); env(g, t, 0.1, 0.012, d); h.connect(g); out(g); tone(t, 'sine', 7800, 0, d, 0.002); for (let x = 0.2; x < d; x += 0.45 + RS.f() * 0.3) tone(t + x, 'square', 1800 + RS.f() * 1500, 0, 0.03, 0.005, RS.n(0.6)); },
    scan: (t, d = 1) => { tone(t, 'sine', 900, 2800, d, 0.02, 0, 0.3, 0.05); bed(t, d, 'bandpass', 2000, 4, 0.02, { f1: 5000 }); },
    carInterior: (t, d = 2) => { bed(t, d, 'lowpass', 160, 0.7, 0.04, { att: 0.2 }); bed(t, d, 'bandpass', 700, 1, 0.006, { lfo: 0.2, depth: 0.5 }); },
    // ---- road and car
    engine: (t, d = 1.5, rev = 0) => { if (d <= 0.05) return; const o = osc('sawtooth', 62, t, t + d + 0.05), o2 = osc('square', 31, t, t + d + 0.05); if (rev) { o.frequency.linearRampToValueAtTime(96, t + d); o2.frequency.linearRampToValueAtTime(48, t + d); }
      const l = osc('sine', 26, t, t + d), lg = ac.createGain(); lg.gain.value = 5; l.connect(lg); lg.connect(o.frequency);
      const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = rev ? 900 : 650; const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.05, t + 0.08); g.gain.setValueAtTime(0.05, t + d - 0.1); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(lp); o2.connect(lp); lp.connect(g); out(g, 0.2, 0.05); },
    engineRev: (t, d = 2) => SFX.engine(t, d, 1),
    roadRoar: (t, d = 1.5) => { bed(t, d, 'lowpass', 520, 0.7, 0.05, { att: 0.06, rel: 0.1 }); bed(t, d, 'bandpass', 1400, 0.8, 0.012, { att: 0.06 }); },
    roadRoarSlow: (t, d = 2) => { bed(t, d, 'lowpass', 260, 0.7, 0.06, { att: 0.1 }); for (let x = 0.1; x < d; x += 0.08) noiseHit(t + x, 0.02, 'bandpass', 1500 + RS.f() * 2000, 2, 0.01, RS.n(0.5)); },
    wind: (t, d = 1.5) => bed(t, d, 'bandpass', 700, 0.8, 0.03, { fl: 0.6, flDepth: 250, att: 0.1, rel: 0.2 }),
    passBy: (t) => { const src = ac.createBufferSource(); src.buffer = noise; src.loop = true; const f = ac.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 1.2; f.frequency.setValueAtTime(1800, t); f.frequency.exponentialRampToValueAtTime(500, t + 0.8); const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.08, t + 0.35); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9); const p = ac.createStereoPanner(); p.pan.setValueAtTime(-0.9, t); p.pan.linearRampToValueAtTime(0.9, t + 0.9); src.connect(f); f.connect(g); g.connect(p); p.connect(sfxBus); src.start(t); src.stop(t + 1); },
    squish: (t) => { lowTone(t, 'sine', 220, 70, 0.25, 0.22, 500); bp(t, 0.22, 700, 250, 1.5, 0.08); },
    rubberBounce: (t) => { const o = tone(t, 'sine', 140, 0, 0.35, 0.12); for (let i = 0; i < 6; i++) o.frequency.setValueAtTime(140 + 90 * (1 - i / 6) * (i % 2 ? 1 : -1) * 0.5 + 60, t + i * 0.05); },
    sizzle: (t, d = 1.5) => { for (let x = 0; x < d; x += 0.03 + RS.f() * 0.05) noiseHit(t + x, 0.012, 'highpass', 5000 + RS.f() * 3000, 0.7, 0.012 + 0.02 * x / d, RS.n(0.5)); bed(t, d, 'highpass', 6000, 0.7, 0.01, { att: d * 0.7 }); },
    sizzleShort: (t) => { SFX.sizzle(t, 0.6); bed(t, 0.7, 'bandpass', 3000, 1, 0.02, { f1: 6000 }); },
    // ---- desk
    clink: (t) => { metal(t, 2400, 0.07, 0.4, 0.1); metal(t + 0.09, 2600, 0.03, 0.25, 0.1); },
    creak: (t) => { const o = osc('sawtooth', 120, t, t + 0.35); for (let i = 0; i < 8; i++) o.frequency.setValueAtTime(110 + RS.f() * 90, t + i * 0.04); const f = ac.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1900; f.Q.value = 5; const g = ac.createGain(); env(g, t, 0.03, 0.03, 0.3); o.connect(f); f.connect(g); out(g, 0.15, 0.15); metal(t, 2200, 0.008, 0.15); },
    warmSwell: (t, d = 1.8) => { bed(t, d, 'bandpass', 300, 1.5, 0.03, { f1: 1600, att: d * 0.7 }); pad(t, t + d, ['D3', 'A3', 'F4'], 0.01, { cut: 900, att: d * 0.6 }); },
    particles: (t, d = 1.5) => { for (let x = 0; x < d; x += 0.025) noiseHit(t + x, 0.01, 'bandpass', 2500 + RS.f() * 4000, 3, 0.008 + RS.f() * 0.01, RS.n(0.8)); },
    // ---- the night, the cold
    timelapse: (t, d = 1.8) => { for (let x = 0; x < d; x += 0.09) noiseHit(t + x, 0.01, 'highpass', 4200, 0.7, 0.05); sweep(t, t + d, 0.03, 2000, 400); },
    coldSwell: (t, d = 1.4) => { bed(t, d, 'highpass', 5000, 0.7, 0.02, { att: d * 0.5 }); tone(t, 'sine', 2637, 0, d, 0.006, 0, 0.6, 0.3); tone(t, 'sine', 3520, 0, d, 0.004, 0.3, 0.6, 0.3); },
    shrinkDown: (t) => { tone(t, 'sine', 600, 120, 0.6, 0.04, 0, 0.3); sweep(t, t + 0.5, 0.03, 3000, 300); },
    windHowl: (t, d = 2) => { bed(t, d, 'bandpass', 500, 3, 0.05, { fl: 0.35, flDepth: 260, att: 0.2, rel: 0.3 }); tone(t, 'sine', 820, 980, d, 0.004, 0.3, 0.5, 0.4); },
    freezeHit: (t) => { noiseHit(t, 0.08, 'highpass', 3500, 0.7, 0.12); [3100, 4300, 5200].forEach((f, i) => tone(t + i * 0.015, 'sine', f, 0, 0.7, 0.012, RS.n(0.5), 0.6, 0.001)); sub(t, 0.25); },
    balloonRub: (t) => { const o = tone(t, 'sine', 900, 1300, 0.25, 0.02); const l = osc('sine', 38, t, t + 0.3), lg = ac.createGain(); lg.gain.value = 120; l.connect(lg); lg.connect(o.frequency); },
    balloonShrink: (t, d = 0.8) => { for (let i = 0; i < 5; i++) { const tt = t + i * d / 5; const o = tone(tt, 'sine', 1300 - i * 120, 800 - i * 80, 0.12, 0.012, RS.n(0.4)); } for (let i = 0; i < 10; i++) bp(t + RS.f() * d, 0.03, 2500 + RS.f() * 3000, 0, 2, 0.02, RS.n(0.5)); },
    // ---- water
    splash: (t) => { noiseHit(t, 0.5, 'lowpass', 4000, 0.7, 0.35, 0, 0.4, 500); sub(t, 0.25); for (let i = 0; i < 14; i++) { const tt = t + 0.05 + RS.f() * 0.6; tone(tt, 'sine', 300 + RS.f() * 400, 900 + RS.f() * 900, 0.05, 0.02, RS.n(0.7), 0.3); } },
    waterSettle: (t, d = 0.6) => { for (let i = 0; i < 6; i++) tone(t + RS.f() * d, 'sine', 700 + RS.f() * 700, 1500, 0.04, 0.012, RS.n(0.6), 0.4); bed(t, d, 'lowpass', 700, 0.7, 0.02); },
    underwater: (t, d = 1.2) => { bed(t, d, 'lowpass', 300, 1.5, 0.08, { fl: 0.5, flDepth: 80, att: 0.06 }); },
  };
  const play = (t, name, ...a) => { if (SFX[name]) SFX[name](t, ...a); else console.warn('no sfx', name); };

  // ---- 1) transitions: each its own sound
  to = 's';
  for (const s of SHOTS) {
    if (!s.i) continue; const t = s.t0, d = TR_DUR[s.tr] ?? 0, a = t - d / 2, r = 0.85 + RS.f() * 0.35;
    switch (s.tr) {
      case 'whipL': SFX.whoosh(a, r, 0.6); SFX.swish(t, r, -0.6); break;
      case 'whipR': SFX.whoosh(a, r, -0.6); SFX.swish(t, r, 0.6); break;
      case 'zoomIn': SFX.zoomIn(a); break;
      case 'zoomOut': SFX.zoomOut(a); break;
      case 'flash': break;   // the shot's own timeCut sound
      case 'dissolve': sweep(a, t + d / 2, 0.04, 3000, 500); break;
      default: lowTone(t, 'sine', 150, 60, 0.14, 0.2, 500); noiseHit(t, 0.03, 'bandpass', 2200, 1, 0.06); SFX.swish(t - 0.08, 1.2);
    }
  }
  for (const s of SHOTS) for (const [t, a] of s.punch || []) { if (a > 0) { sweep(t - 0.14, t, 0.04, 600, 4200); lowTone(t, 'sine', 120, 55, 0.15, 0.14, 500); } else SFX.whooshDown(t - 0.05, 1.6); }
  // ---- 2) every shot's own sounds
  for (const s of SHOTS) for (const [t, name, ...a] of s.sfx || []) play(t, name, ...a);

  // ---- 3) the bed (music bus): low, cinematic, ducked under the voice
  to = 'm';
  const pulse = (t0, t1, bt, v = 1) => { for (let t = t0; t < t1 - 0.05; t += bt) { lowTone(t, 'sine', 90, 42, 0.22, 0.2 * v, 300); } };
  const arp = (t0, t1, notes, bt, v = 1) => { let i = 0; for (let t = t0; t < t1 - 0.05; t += bt, i++) pluck(t, nz(notes[i % notes.length]), 0.035 * v, ((i % 3) - 1) * 0.3, 0.4, 1800, 0.35); };
  drone(0, 4.5, 36.7, 0.12, { att: 1.5, rel: 0.3 });                                  // under the hook's riser
  pad(T.leaking - 0.4, T.heres, ['D3', 'A3', 'F4'], 0.012, { cut: 800, att: 0.6 });       // the test
  pulse(T.leaking - 0.4, T.heres, 0.6, 0.6);
  pad(T.every2, T.so, ['D3', 'A3', 'C4', 'F4'], 0.013, { cut: 1000, att: 0.4 });          // the mechanism: driving pulse + arpeggio
  pulse(T.every2, T.so, 0.5, 0.8); arp(T.every2, T.so, ['D4', 'F4', 'A4', 'C5'], 0.25, 0.8);
  drone(T.so, T.thats, 49, 0.1, { att: 0.2, rel: 0.2 });                                // tension
  pad(T.thats, T.then, ['D3', 'A3', 'F4'], 0.012, { cut: 900 }); pulse(T.thats, T.then, 0.5, 0.7); arp(T.thats, T.then, ['D4', 'A4', 'F4', 'A4'], 0.25, 0.6);
  pad(T.then, T.its2, ['D3', 'F3', 'A3', 'E4'], 0.014, { cut: 700, att: 0.6 });            // night: cold and slow
  drone(T.air5, T.its2, 41.2, 0.1, { att: 0.3, rel: 0.3 });
  pad(T.its2, T.so3, ['A3', 'E4', 'C5'], 0.01, { cut: 1600, att: 0.5 }); arp(T.its2, T.so3, ['E5', 'C5', 'A4', 'C5'], 0.5, 0.5);   // the balloon: glassy
  drone(T.so3, T.full, 36.7, 0.12, { att: 0.5, rel: 0.05 });                             // build to the payoff
  pad(T.full, T.and9, ['D3', 'Fs3', 'A3', 'D4'], 0.016, { cut: 1500, att: 0.15 }); pulse(T.full + 0.6, T.and9, 0.5, 0.7); arp(T.full + 0.6, T.and9, ['D4', 'Fs4', 'A4', 'D5'], 0.25, 0.7);   // resolution
  pad(T.and9, DURATION, ['D3', 'A3', 'D4', 'Fs4'], 0.018, { cut: 1800, att: 0.2, rel: 0.6 }); pulse(T.and9, DURATION - 0.6, 0.5, 0.9); arp(T.and9, DURATION - 0.6, ['D5', 'A4', 'Fs4', 'A4'], 0.25, 0.8);
