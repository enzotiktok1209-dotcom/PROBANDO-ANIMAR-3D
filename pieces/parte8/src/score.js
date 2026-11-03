  // =====================================================================
  //  SCORE BODY — Teil 8 (inside buildScore(); kit/score-head.js). Everything synthesized:
  //  a foley kit (engine, tyres, avalanche, wind, glass, snow, knocks, dog, rotor, radio, fire...), a transition kit
  //  (12 different whooshes / hits rotated so no two cuts in a row sound alike), and a tension score.
  //  Rules from the brief: ≥ 1 sound every 1.5s, silence before the two payoffs (31.07 / 104.02), loudest on them.
  // =====================================================================
  const T = TIMELINE, SH = SHOTS;
  const EVT = [];                       // every sfx time (for the gap filler)
  const mark = (t) => EVT.push(t);
  const R = RNG('sfx');
  // ---------------------------------------------------------------- low-level helpers
  const nsrc = (t, dur, loop = false) => { const s = ac.createBufferSource(); s.buffer = noise; s.loop = loop; s.start(t, (t * 7.31) % 2.0); s.stop(t + dur + 0.05); return s; };
  const filt = (type, f, q = 1) => { const b = ac.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = q; return b; };
  function noiseEnv(t, dur, type, f, q, vel, pan = 0, att = 0.005, send = 0.1, f1 = 0) { const s = nsrc(t, dur), b = filt(type, f, q); if (f1) b.frequency.exponentialRampToValueAtTime(f1, t + dur); const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vel, t + att); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); s.connect(b); b.connect(g); out(g, pan, send); }
  function tone(t, type, f0, f1, dur, vel, pan = 0, send = 0.15, att = 0.004) { const o = osc(type, f0, t, t + dur + 0.05); if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur); const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vel, t + att); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); o.connect(g); out(g, pan, send); }
  function loopNoise(t0, t1, type, f, q, vel, o = {}) { const s = nsrc(t0, t1 - t0, true), b = filt(type, f, q), g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t0 + (o.att ?? 0.3)); if (o.swell) g.gain.linearRampToValueAtTime(o.swell, t1 - 0.2); g.gain.setValueAtTime(o.swell || vel, t1 - (o.rel ?? 0.3)); g.gain.exponentialRampToValueAtTime(0.0001, t1); if (o.f1) b.frequency.exponentialRampToValueAtTime(o.f1, t1); if (o.am) { const lfo = osc('sine', o.am, t0, t1), lg = ac.createGain(); lg.gain.value = vel * 0.6; lfo.connect(lg); lg.connect(g.gain); } s.connect(b); b.connect(g); out(g, o.pan ?? 0, o.send ?? 0.1); }
  // ---------------------------------------------------------------- the foley kit (to = 's')
  const S = {
    whoosh: (t, d = 0.35, up = true, v = 0.5, pan = 0) => { sweep(t, t + d, v * 0.05, up ? 400 : 5000, up ? 5000 : 300, pan); mark(t); },
    whooshLow: (t) => { noiseEnv(t, 0.45, 'lowpass', 900, 0.8, 0.5, 0, 0.12, 0.2, 140); mark(t); },
    whip: (t, pan = 0) => { noiseEnv(t, 0.22, 'bandpass', 900, 1.5, 0.6, pan, 0.03, 0.15, 6000); mark(t); },
    swipe: (t) => { noiseEnv(t, 0.18, 'highpass', 2500, 0.7, 0.35, 0.3, 0.02, 0.1, 9000); mark(t); },
    revFlash: (t) => { noiseEnv(t - 0.3, 0.32, 'bandpass', 3000, 0.8, 0.45, 0, 0.29, 0.3); tone(t, 'sine', 1800, 300, 0.4, 0.12); mark(t); },
    impact: (t, v = 0.9) => { sub(t, v); noiseEnv(t, 0.6, 'lowpass', 600, 0.7, v * 0.7, 0, 0.003, 0.4, 80); mark(t); },
    thud: (t, v = 0.6) => { tone(t, 'sine', 110, 45, 0.3, v); noiseEnv(t, 0.12, 'lowpass', 700, 0.7, v * 0.5); mark(t); },
    glitch: (t) => { for (let i = 0; i < 6; i++) tone(t + i * 0.025, 'square', R.r(200, 2400), R.r(200, 2400), 0.03, 0.05, R.n(0.6), 0); noiseEnv(t, 0.15, 'highpass', 4000, 0.7, 0.2); mark(t); },
    shutter: (t) => { noiseEnv(t, 0.04, 'bandpass', 3500, 2, 0.5); noiseEnv(t + 0.06, 0.05, 'bandpass', 2500, 2, 0.4); mark(t); },
    heart: (t, v = 0.8) => { tone(t, 'sine', 70, 40, 0.18, v, 0, 0); tone(t + 0.16, 'sine', 62, 38, 0.2, v * 0.75, 0, 0); mark(t); },
    tick: (t, v = 0.35) => { noiseEnv(t, 0.03, 'highpass', 5000, 0.7, v); tone(t, 'sine', 2400, 2400, 0.03, v * 0.3); mark(t); },
    ui: (t, f = 1400) => { blip(t, f, f * 1.5, 0.08, 0.18); mark(t); },
    check: (t) => { blip(t, 880, 880, 0.08, 0.2); blip(t + 0.08, 1320, 1320, 0.14, 0.2); mark(t); },
    type: (t, n = 6, step = 0.05) => { for (let i = 0; i < n; i++) noiseEnv(t + i * step, 0.025, 'bandpass', 2200 + R.r(-300, 300), 2, 0.3, R.n(0.3)); mark(t); },
    ding: (t) => { chime(t, [nz('A5'), nz('E6')], 0.08); mark(t); },
    slide: (t) => { noiseEnv(t, 0.25, 'bandpass', 2000, 1, 0.25, 0.4, 0.05, 0.1, 500); mark(t); },
    stamp: (t) => { S.thud(t, 0.8); noiseEnv(t, 0.2, 'bandpass', 1200, 1, 0.4); mark(t); },
    crunch: (t, v = 0.4, pan = 0) => { for (let i = 0; i < 5; i++) noiseEnv(t + i * 0.012, 0.03, 'bandpass', 1400 + R.r(-500, 800), 1.4, v * R.r(0.5, 1), pan); mark(t); },
    steps: (t, n, step = 0.28, v = 0.35) => { for (let i = 0; i < n; i++) S.crunch(t + i * step, v, (i % 2 ? 0.2 : -0.2)); },
    glass: (t, v = 0.6) => { noiseEnv(t, 0.3, 'highpass', 3000, 0.7, v); for (let i = 0; i < 10; i++) tone(t + R.r(0, 0.25), 'sine', R.r(2500, 6500), R.r(2500, 6500), R.r(0.05, 0.25), v * 0.12, R.n(0.7), 0.4); mark(t); },
    crack: (t, v = 0.5) => { noiseEnv(t, 0.08, 'highpass', 2500, 0.8, v); tone(t, 'triangle', 1800, 600, 0.12, v * 0.2); mark(t); },
    metal: (t, v = 0.4) => { noiseEnv(t, 0.06, 'bandpass', 3200, 3, v); tone(t, 'triangle', 2600, 2400, 0.12, v * 0.25); mark(t); },
    rifle: (t) => { S.metal(t, 0.35); S.metal(t + 0.09, 0.4); },
    clatter: (t) => { S.metal(t, 0.5); S.metal(t + 0.15, 0.3); S.thud(t + 0.15, 0.3); },
    drip: (t) => { tone(t, 'sine', 1400, 500, 0.12, 0.2); mark(t); },
    spit: (t) => { noiseEnv(t, 0.08, 'bandpass', 2600, 1.4, 0.3); mark(t); },
    blade: (t) => { noiseEnv(t, 0.5, 'bandpass', 5000, 6, 0.25, 0.2, 0.2, 0.2, 9000); tone(t + 0.35, 'sine', 5200, 5200, 0.5, 0.08, 0.3, 0.6); mark(t); },
    cut: (t) => { noiseEnv(t, 0.15, 'bandpass', 3000, 1, 0.6, 0, 0.003, 0.1, 900); mark(t); },
    muffled: (t) => { noiseEnv(t, 0.35, 'lowpass', 500, 1, 0.5); tone(t, 'sawtooth', 220, 160, 0.3, 0.06); mark(t); },
    knock: (t, v = 1.0) => { tone(t, 'sine', 190, 140, 0.16, v, 0, 0.35); noiseEnv(t, 0.07, 'bandpass', 600, 1.4, v * 0.8, 0, 0.002, 0.35); tone(t, 'triangle', 420, 300, 0.06, v * 0.3); mark(t); },
    bark: (t, pan = -0.3) => { noiseEnv(t, 0.14, 'bandpass', 900, 2, 0.6, pan, 0.01, 0.2); tone(t, 'sawtooth', 420, 260, 0.14, 0.12, pan); mark(t); },
    growl: (t, d) => { loopNoise(t, t + d, 'lowpass', 300, 2, 0.35, { am: 22, att: 0.08 }); tone(t, 'sawtooth', 85, 70, d, 0.1); mark(t); },
    sniff: (t) => { for (let i = 0; i < 3; i++) noiseEnv(t + i * 0.09, 0.06, 'highpass', 3000, 0.7, 0.18); mark(t); },
    whistle: (t) => { tone(t, 'sine', 1500, 2300, 0.18, 0.15, 0.3); tone(t + 0.22, 'sine', 2300, 1700, 0.25, 0.15, 0.3); mark(t); },
    whine: (t) => { tone(t, 'sine', 900, 650, 0.4, 0.08, -0.2); mark(t); },
    jingle: (t) => { for (let i = 0; i < 4; i++) tone(t + i * 0.04, 'triangle', 3000 + i * 300, 3000 + i * 300, 0.08, 0.04, 0.2); mark(t); },
    flashlight: (t) => { noiseEnv(t, 0.03, 'bandpass', 2000, 4, 0.4); mark(t); },
    squelch: (t) => { noiseEnv(t, 0.25, 'bandpass', 1800, 1, 0.3); mark(t); },
    shovel: (t) => { noiseEnv(t, 0.22, 'bandpass', 1500, 1.2, 0.3, R.n(0.4), 0.05, 0.1, 700); mark(t); },
    ignite: (t) => { noiseEnv(t, 0.6, 'lowpass', 2000, 0.7, 0.5, 0, 0.08, 0.2, 400); mark(t); },
    click: (t) => { noiseEnv(t, 0.02, 'bandpass', 2500, 3, 0.5); tone(t, 'square', 900, 900, 0.015, 0.05); mark(t); },
    creak: (t, d = 0.5) => { tone(t, 'sawtooth', 120, 90, d, 0.06); loopNoise(t, t + d, 'bandpass', 700, 6, 0.08, { am: 30, att: 0.05 }); mark(t); },
    bird: (t) => { for (let i = 0; i < 3; i++) tone(t + i * 0.12, 'sine', 3500 + i * 400, 4300 + i * 300, 0.07, 0.05, 0.5); mark(t); },
    sparkle: (t) => { chime(t, [nz('E6'), nz('A6')], 0.05, 0.3); mark(t); },
    sonar: (t, f = 1200) => { tone(t, 'sine', f, f, 0.6, 0.18, 0, 0.6); mark(t); },
    bell: (t) => { chime(t, [110, 220, 330.5], 0.25); sub(t, 0.3); mark(t); },
    piano: (t, n, v = 0.2) => { pluck(t, nz(n), v, 0, 1.6, 1800, 0.5); mark(t); },
    inhale: (t, d) => { noiseEnv(t, d, 'bandpass', 1500, 0.6, 0.35, 0, d * 0.8, 0.1); mark(t); },
    exhale: (t) => { noiseEnv(t, 0.8, 'bandpass', 900, 0.6, 0.25, 0, 0.05, 0.1, 400); mark(t); },
    gasp: (t) => { noiseEnv(t, 0.25, 'bandpass', 2000, 0.8, 0.4, 0, 0.03); mark(t); },
    groan: (t) => { tone(t, 'sawtooth', 140, 110, 0.6, 0.06); noiseEnv(t, 0.6, 'lowpass', 600, 1, 0.12, 0, 0.1); mark(t); },
    rattle: (t) => { for (let i = 0; i < 6; i++) noiseEnv(t + i * 0.04, 0.04, 'bandpass', 600 + R.r(0, 600), 2, 0.3); S.thud(t, 0.4); },
    beep: (t, f = 1000, v = 0.12) => { tone(t, 'square', f, f, 0.09, v * 0.5); mark(t); },
  };
  // ---------------------------------------------------------------- transitions: a different sound for each kind, rotated
  const TR_KIT = {
    zoomIn: [(t) => S.whoosh(t - 0.2, 0.3, true, 0.6), (t) => S.revFlash(t), (t) => { S.whoosh(t - 0.15, 0.22, true, 0.5); S.tick(t); }],
    zoomOut: [(t) => S.whoosh(t - 0.05, 0.4, false, 0.6), (t) => S.whooshLow(t - 0.05), (t) => { S.whoosh(t, 0.3, false, 0.5); S.sonar(t + 0.05, 600); }],
    whipL: [(t) => S.whip(t - 0.1, -0.6), (t) => S.swipe(t - 0.05), (t) => { S.whip(t - 0.08, -0.4); S.tick(t, 0.2); }],
    whipR: [(t) => S.whip(t - 0.1, 0.6), (t) => S.swipe(t - 0.05), (t) => { S.whip(t - 0.08, 0.4); S.click(t); }],
    flash: [(t) => S.revFlash(t), (t) => { S.revFlash(t); S.impact(t, 0.5); }],
    flashS: [(t) => S.shutter(t), (t) => { S.shutter(t); S.ui(t + 0.05, 1800); }],
    glitch: [(t) => S.glitch(t), (t) => { S.glitch(t); S.thud(t, 0.5); }],
    black: [(t) => S.whooshLow(t - 0.1), (t) => { S.heart(t); }],
    shake: [(t) => S.impact(t, 0.7), (t) => S.thud(t, 0.8)],
    red: [(t) => { S.impact(t, 0.6); S.cut(t); }],
    spin: [(t) => S.whoosh(t - 0.1, 0.4, true, 0.5)],
    cut: [(t) => S.tick(t, 0.25), (t) => S.click(t)],
  };
  to = 's';
  const used = {};
  SH.forEach((s, i) => { if (i === 0) return; const kit = TR_KIT[s.tr] || TR_KIT.cut; const k = (used[s.tr] = (used[s.tr] ?? -1) + 1) % kit.length; if (s.t0 > 31.0 && s.t0 < 32.7) return; if (s.t0 > 104 && s.t0 < 106.2) return; kit[k](s.t0); });
  // ---------------------------------------------------------------- foley, shot by shot
  // THE HOOK: a hit on frame 0, a riser into the wall of rifles, a braam on it
  const braam = (t, v = 1, dur = 1.6) => { const lp = filt('lowpass', 180, 3); lp.frequency.setValueAtTime(180, t); lp.frequency.exponentialRampToValueAtTime(2200, t + 0.12); lp.frequency.exponentialRampToValueAtTime(260, t + dur); const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.45 * v, t + 0.04); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); [36.7, 55, 73.4, 110, 73.4 * 1.007, 55 * 0.996].forEach((f) => osc('sawtooth', f, t, t + dur + 0.05).connect(lp)); lp.connect(g); out(g, 0, 0.3); sub(t, 0.9 * v); mark(t); };
  S.impact(0.0, 1.0); S.glass(0.02, 0.3); sub(0.0, 1.0);
  riser(0.05, 1.38, 0.09); sweep(0.6, 1.38, 0.06, 300, 9000, 0);
  for (let t = 0.1; t < 1.4; t += 0.33) S.heart(t, 0.9);
  braam(1.4, 1.0); S.rifle(1.42);
  braam(5.1, 0.7); braam(16.35, 0.6, 1.2); braam(17.9, 0.9); braam(21.1, 0.9);
  braam(47.7, 0.6); braam(57.45, 0.6); braam(63.16, 0.5); braam(86.2, 0.6); braam(101.74, 0.7);
  riser(3.9, 5.05, 0.05); riser(14.5, 16.3, 0.05); riser(56.0, 57.4, 0.05); riser(99.0, 101.7, 0.05);
  // S01-S04: engine, wipers, wind, rifles, lasers, the mirror, the avalanche
  const eng = (t0, t1, f0, f1, v) => { const o1 = osc('sawtooth', f0, t0, t1), o2 = osc('square', f0 * 0.5, t0, t1); o1.frequency.linearRampToValueAtTime(f1, t1); o2.frequency.linearRampToValueAtTime(f1 * 0.5, t1); const lp = filt('lowpass', 420, 2), g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(v, t0 + 0.2); g.gain.setValueAtTime(v, t1 - 0.1); g.gain.exponentialRampToValueAtTime(0.0001, t1); o1.connect(lp); o2.connect(lp); lp.connect(g); out(g, 0, 0.05); };
  eng(0.0, 23.75, 52, 64, 0.12); eng(23.75, 24.6, 64, 18, 0.12);
  loopNoise(0.0, 21.1, 'bandpass', 600, 0.5, 0.06, { am: 0.3 });                          // wind
  [0.3, 0.75, 1.2].forEach((t) => { S.creak(t, 0.18); });                                  // wipers
  for (let i = 0; i < 5; i++) S.rifle(1.48 + i * 0.07);
  loopNoise(2.0, 2.8, 'bandpass', 3000, 8, 0.06, { am: 40 });                              // laser hum
  S.tick(2.4); S.stamp(1.75);
  loopNoise(2.85, 33.0, 'lowpass', 160, 0.7, 0.05, { swell: 0.45, att: 1 });              // the avalanche: a rumble that grows to the impact
  S.crack(3.95, 0.5); S.crack(4.25, 0.45); S.crack(4.55, 0.4); S.impact(4.4, 0.4);
  // sirens (two-tone, distant)
  for (let t = 0.5; t < 21; t += 0.6) { tone(t, 'triangle', 960, 960, 0.28, 0.018, 0.4); tone(t + 0.3, 'triangle', 720, 720, 0.28, 0.018, 0.4); }
  // S05-S08
  S.slide(5.2); S.ui(5.4, 1600); S.heart(5.6, 0.5); S.heart(6.4, 0.5); S.sonar(7.0, 1000); S.tick(7.4); S.ding(7.6);
  S.rattle(8.35); S.groan(9.0); S.beep(9.4, 700); S.beep(10.2, 700); S.creak(10.55, 0.3); S.stamp(10.95); eng(11.5, 12.0, 64, 90, 0.08);
  // S09-S11: the wheel, the drift, the stop
  S.whip(12.0, -0.3); loopNoise(12.3, 15.0, 'bandpass', 2600, 6, 0.18, { att: 0.1, f1: 1800, send: 0.2 }); tone(12.3, 'sawtooth', 900, 620, 2.6, 0.03, 0, 0.1, 0.1);
  loopNoise(13.7, 15.0, 'highpass', 3000, 0.7, 0.12, { att: 0.1 }); S.crunch(14.2, 0.5); S.crunch(14.6, 0.4);
  S.thud(15.0, 0.9); S.creak(15.25, 0.3); S.crunch(15.6, 0.3); S.tick(16.0);
  // S12-S15
  S.inhale(16.4, 0.5); S.exhale(17.0); S.impact(18.6, 0.5); S.thud(19.2, 0.6); S.clatter(19.75); S.steps(20.0, 2, 0.15);
  for (let i = 0; i < 8; i++) S.crunch(20.45 + i * 0.08, 0.35, R.n(0.7)); S.muffled(20.5); S.muffled(20.75);
  // S16-S23: rule 1, the countdown
  for (let t = 21.15; t < 31.0; t += 0.5) S.tick(t, 0.28);
  S.impact(21.15, 0.6); S.type(22.5, 6); S.thud(22.9, 0.6);
  S.click(23.62); S.ui(24.0, 500); S.beep(24.1, 600); S.beep(24.25, 500); S.beep(24.4, 400);
  S.crunch(25.3, 0.5); S.crunch(25.9, 0.5); S.tick(25.9);
  loopNoise(26.4, 28.4, 'lowpass', 900, 1, 0.15, { att: 0.3 }); S.beep(27.2, 1800, 0.2); S.beep(27.45, 1800, 0.2); tone(28.4, 'sawtooth', 120, 110, 0.4, 0.08); S.stamp(28.35);
  S.slide(29.05); S.metal(29.4, 0.6); S.click(29.42);
  S.slide(30.15); S.ui(30.6, 1100);
  riser(27.0, 31.05, 0.05);
  S.inhale(31.25, 1.1);                                                                       // the silence: only her breath
  // S24: THE IMPACT (loudest)
  S.impact(32.75, 1.0); S.impact(32.78, 0.9); S.glass(32.8, 0.8); sub(32.75, 1.0); noiseEnv(32.75, 1.4, 'lowpass', 1200, 0.7, 0.8, 0, 0.003, 0.4, 60);
  S.crack(33.0, 0.4); S.thud(33.2, 0.6);
  // S25-S36 under the snow
  tone(33.45, 'sine', 4200, 4200, 1.2, 0.03, 0, 0.1, 0.2); S.creak(33.9, 0.6);
  S.check(34.6); S.thud(35.0, 0.5); S.heart(35.6, 0.5); S.crunch(36.1, 0.3);
  S.whoosh(36.7, 1.0, true, 0.4); S.crunch(37.6, 0.3); S.heart(38.4, 0.5); S.whoosh(38.0, 0.8, false, 0.3);
  S.spit(39.35); S.tick(39.7); S.drip(40.0); S.swipe(40.6); S.drip(41.0);
  S.whoosh(41.35, 0.4, true, 0.4); S.click(41.9);
  S.thud(42.64, 0.8); S.crack(42.66, 0.5); S.thud(43.14, 0.9); S.glass(43.2, 0.6);
  S.muffled(43.85); for (let t = 43.95; t < 45.8; t += 0.18) S.crunch(t, 0.35, R.n(0.5));
  S.gasp(44.8); S.groan(45.2);
  riser(45.9, 46.72, 0.035);
  S.crunch(46.78, 0.6); noiseEnv(46.78, 0.5, 'highpass', 2000, 0.7, 0.3); loopNoise(46.9, 47.69, 'bandpass', 500, 0.5, 0.08);
  // S37-S48 rule 3
  S.check(47.75); S.thud(48.1, 0.5); S.bell(48.85); loopNoise(49.0, 50.0, 'bandpass', 600, 0.5, 0.07);
  for (let t = 50.1; t < 52.5; t += 0.62) S.beep(t, 1300, 0.18); loopNoise(51.2, 52.6, 'lowpass', 300, 1, 0.05, { am: 12 });
  S.blade(52.65); S.tick(53.4);
  S.cut(53.92); S.muffled(53.98); S.heart(54.2, 0.8);
  S.beep(54.7, 1300, 0.18); S.beep(55.3, 1300, 0.18); S.crunch(56.0, 0.4); S.slide(56.5); S.beep(57.1, 700, 0.1); S.check(57.2);
  S.gasp(57.5); S.thud(57.8, 0.4); tone(58.6, 'sine', 55, 55, 1.4, 0.15); S.heart(59.1, 0.6);
  S.tick(59.6, 0.3); S.tick(60.0, 0.3); S.heart(60.2, 0.5);
  noiseEnv(60.35, 1.2, 'highpass', 2500, 0.6, 0.12, 0, 0.3); S.slide(61.0); S.inhale(61.5, 0.4);
  S.whip(62.0, 0.5); loopNoise(62.3, 63.2, 'bandpass', 500, 0.5, 0.08); tone(62.8, 'sine', 420, 380, 0.3, 0.05, 0.5);
  // S49-S63 the search
  S.type(63.2, 14, 0.035); S.ding(63.9);
  loopNoise(64.15, 69.4, 'lowpass', 900, 1, 0.22, { am: 13, att: 0.2, pan: 0.2 });         // the rotor
  S.click(64.9); loopNoise(64.95, 65.6, 'bandpass', 120, 4, 0.08);
  S.bark(65.7); S.bark(66.0, 0.3); S.jingle(66.2);
  S.beep(66.5, 1600, 0.2); S.beep(66.75, 1600, 0.2); S.beep(67.0, 2000, 0.25); S.beep(67.1, 2000, 0.25);
  for (let t = 67.6; t < 69.3; t += 0.22) S.shovel(t); for (let t = 67.6; t < 69.3; t += 0.12) S.tick(t, 0.18);
  S.steps(69.45, 4, 0.3, 0.3); S.crack(70.3, 0.4);
  S.sniff(70.8); S.jingle(71.3); S.sniff(71.85); S.heart(72.2, 0.9);
  S.growl(72.82, 0.7);
  S.flashlight(73.58); S.steps(73.9, 2, 0.3, 0.4);
  S.squelch(74.52); S.muffled(74.6);
  S.piano(75.62, 'D5', 0.18); S.tick(76.4);
  S.whistle(77.05); S.jingle(77.5); S.whine(77.85);
  S.heart(78.3, 0.9); S.heart(78.9, 0.8); S.heart(79.5, 0.6); S.exhale(79.7);
  // S64-S74 the hut: calm
  S.type(80.1, 10, 0.035); loopNoise(80.2, 81.0, 'bandpass', 600, 0.5, 0.05);
  S.creak(80.95, 0.5); S.jingle(81.4);
  S.ignite(81.8); for (let t = 82.0; t < 93.2; t += R.r(0.12, 0.35)) noiseEnv(t, 0.02, 'highpass', 3500, 0.7, R.r(0.04, 0.12), R.n(0.4));   // crackle
  S.exhale(83.2); S.beep(83.6, 900, 0.08); S.beep(84.6, 900, 0.08);
  S.click(84.02); loopNoise(84.05, 87.9, 'bandpass', 3000, 0.6, 0.04);                       // radio static
  S.stamp(86.45); S.tick(87.0); tone(87.3, 'sine', 98, 98, 0.8, 0.12);
  S.click(87.97); S.creak(88.4, 0.3);
  for (let i = 0; i < 6; i++) S.ui(89.8 + i * 0.17, 1200 - i * 120); S.piano(90.8, 'A4', 0.15);
  S.exhale(91.7); chime(92.3, [nz('D6')], 0.04);
  // S75-S86 the morning, the prints, the door
  S.type(93.25, 8, 0.035); S.creak(93.75, 0.25); S.thud(94.0, 0.5); S.bird(94.4); S.bird(94.9);
  S.sparkle(95.15); S.bird(95.6);
  S.whoosh(96.02, 0.5, false, 0.35);
  for (let i = 0; i < 9; i++) S.crunch(96.68 + i * 0.07, 0.3, R.n(0.3));
  S.ui(97.5, 1500); S.ui(98.05, 1900);
  tone(98.7, 'sine', 73, 73, 0.9, 0.2); S.crunch(99.4, 0.5);
  S.whoosh(100.05, 0.5, true, 0.4); S.steps(100.4, 4, 0.18, 0.3); S.thud(101.3, 0.5);
  S.glitch(101.8); riser(102.0, 103.1, 0.03); S.sonar(103.15, 1000); S.sonar(103.6, 1500); S.glitch(103.7);
  S.creak(105.3, 0.4);                                                                        // the silence: one floorboard
  // the three knocks (loudest at the end), then a sub drop
  S.knock(106.35, 1.0); S.knock(106.75, 1.0); S.knock(107.15, 1.0); sub(107.4, 0.9);
  // ---------------------------------------------------------------- fill any gap > 1.4s with a soft, varied air sound (never in the silences)
  EVT.sort((a, b) => a - b);
  const fillers = [(t) => S.tick(t, 0.4), (t) => S.whoosh(t, 0.3, true, 0.5), (t) => S.ui(t, 900), (t) => S.crunch(t, 0.45), (t) => S.swipe(t), (t) => S.heart(t, 0.6)];
  let last = 0, fi = 0;
  for (const t of EVT.concat([DURATION])) { while (t - last > 1.25) { const ft = last + 1.05; if (!((ft > 31.0 && ft < 32.75) || (ft > 104.0 && ft < 106.3))) fillers[fi++ % fillers.length](ft); last = ft; } last = Math.max(last, t); }
  // ---------------------------------------------------------------- MUSIC (to = 'm'): tension → silence → hit → muffled → release → hunt → calm → silence → knocks
  to = 'm';
  pad(0.0, 21.1, ['D2', 'A2', 'F3'], 0.03, { type: 'sawtooth', cut: 500, att: 0.6, swellTo: 0.05, swellAt: 20.5 });
  for (let t = 0.6; t < 21.0; t += 0.6) bass(t, nz('D2'), 0.16);
  pad(21.1, 31.05, ['D2', 'Gs2', 'D3'], 0.05, { type: 'sawtooth', cut: 700, att: 0.3, rel: 0.03 });
  for (let t = 21.1; t < 31.0; t += 0.3) bass(t, nz(t < 26 ? 'D2' : 'F2'), 0.2);
  drone(33.4, 46.75, 55, 0.05, { att: 1.0 });
  pad(46.75, 50.0, ['D4', 'F4', 'A4', 'D5'], 0.035, { type: 'triangle', cut: 2200, att: 0.4, send: 0.6 });
  pad(48.8, 63.2, ['D2', 'A2', 'Eb3'], 0.03, { type: 'sawtooth', cut: 600, att: 0.5 });
  for (let t = 49.0; t < 63.0; t += 0.6) bass(t, nz('D2'), 0.13);
  pad(63.2, 80.0, ['C2', 'G2', 'Eb3'], 0.03, { type: 'sawtooth', cut: 520, att: 0.5 });
  for (let t = 63.2; t < 80.0; t += 1.2) bass(t, nz('C2'), 0.15);
  pad(80.06, 101.7, ['D3', 'F3', 'A3', 'C4'], 0.03, { type: 'triangle', cut: 1600, att: 1.0, send: 0.5 });
  [[81.0, 'A4'], [82.6, 'F4'], [84.8, 'D5'], [88.0, 'C5'], [92.5, 'A4'], [95.2, 'E5'], [97.8, 'D5']].forEach(([t, n]) => pluck(t, nz(n), 0.12, 0, 1.6, 1600, 0.5));
  pad(101.7, 104.0, ['D2', 'Gs2', 'D3'], 0.04, { type: 'sawtooth', cut: 800, att: 0.3, rel: 0.02 });
  pad(106.32, 108.1, ['D2', 'A2'], 0.05, { type: 'sawtooth', cut: 400, att: 0.02 });
  to = 's';
