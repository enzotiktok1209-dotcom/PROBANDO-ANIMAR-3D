  const MARK = []; const mk = (t) => { MARK.push(t); return t; };
  const g0 = (t, peak, a, d) => { const g = ac.createGain(); env(g, t, a, peak, d); return g; };
  function nz2(t, dur, type, f, q, vel, pan = 0, send = 0, to2 = 0) { mk(t); noiseHit(t, dur, type, f, q, vel, pan, send, to2); }
  function tone(t, f0, f1, dur, vel, type = 'sine', pan = 0, send = 0.15) { mk(t); const o = osc(type, f0, t, t + dur + 0.05); if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur); const g = g0(t, vel, 0.004, dur); o.connect(g); out(g, pan, send); }
  function whoosh(t, dur, up = true, vel = 0.5, pan = 0) { mk(t); const src = ac.createBufferSource(); src.buffer = noise; const f = ac.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 1.4; f.frequency.setValueAtTime(up ? 300 : 3000, t); f.frequency.exponentialRampToValueAtTime(up ? 3500 : 250, t + dur); const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vel, t + dur * 0.7); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); src.connect(f); f.connect(g); out(g, pan, 0.2); src.start(t, (t * 3.7) % 2); src.stop(t + dur + 0.05); }
  function impact(t, vel = 1, ring = 0) { mk(t); sub(t, vel); nz2(t, 0.25, 'lowpass', 400, 0.8, vel * 0.7, 0, 0.4); if (ring) [523, 787, 1130].forEach((f, i) => tone(t, f, f * 0.99, 0.8, vel * 0.06 / (i + 1), 'triangle', (i - 1) * 0.3, 0.5)); }
  function boom(t, vel = 1) { mk(t); const o = osc('sine', 90, t, t + 2.2); o.frequency.exponentialRampToValueAtTime(30, t + 1.6); const g = g0(t, vel, 0.005, 1.8); o.connect(g); out(g, 0, 0.3); nz2(t, 0.6, 'lowpass', 250, 0.7, vel * 0.6, 0, 0.6); }
  function rise(t0, t1, vel = 0.25) { mk(t0); riser(t0, t1, vel); for (let t = t0; t < t1; t += 0.35) mk(t); const o = osc('sine', 55, t0, t1); const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel * 1.6, t1); g.gain.linearRampToValueAtTime(0.0001, t1 + 0.02); o.connect(g); out(g); }
  function clank(t, vel = 0.5, f = 1800) { mk(t); nz2(t, 0.12, 'bandpass', f, 8, vel, 0, 0.4); [f * 0.37, f * 0.61, f * 0.93].forEach((ff, i) => tone(t, ff, ff * 0.98, 0.35, vel * 0.12, 'triangle', 0, 0.4)); }
  function click(t, vel = 0.25, f = 2400) { mk(t); tone(t, f, f * 0.7, 0.03, vel, 'square'); }
  function step(t, wet = 1, vel = 0.35, pan = 0) { mk(t); nz2(t, 0.07, 'lowpass', 600, 1, vel, pan); if (wet) nz2(t + 0.01, 0.16, 'highpass', 2500, 0.7, vel * 0.5 * wet, pan); }
  function splash(t, vel = 0.5) { mk(t); nz2(t, 0.4, 'highpass', 1800, 0.5, vel, 0, 0.3, 6000); nz2(t, 0.25, 'bandpass', 700, 1, vel * 0.5); }
  function heart(t, vel = 0.7) { mk(t); [0, 0.16].forEach((d, i) => { const o = osc('sine', 62, t + d, t + d + 0.25); o.frequency.exponentialRampToValueAtTime(40, t + d + 0.2); const g = g0(t + d, vel * (i ? 0.7 : 1), 0.005, 0.18); o.connect(g); out(g); }); }
  function siren(t0, t1, vel = 0.08, pan = 0, f0 = 700) { mk(t0); const o = osc('sawtooth', f0, t0, t1 + 0.1); for (let t = t0, k = 0; t < t1; t += 0.42, k++) o.frequency.setValueAtTime(k % 2 ? f0 * 0.75 : f0, t); const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2200; const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t0 + 0.3); g.gain.setValueAtTime(vel, t1 - 0.2); g.gain.exponentialRampToValueAtTime(0.0001, t1); o.connect(lp); lp.connect(g); out(g, pan, 0.4); for (let t = t0; t < t1; t += 0.9) mk(t); }
  function hum(t0, t1, f = 180, vel = 0.05, trem = 30) { mk(t0); const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1400; const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t0 + 0.2); for (let t = t0 + 0.2; trem > 0 && t < t1 - 0.2; t += 1 / trem) { g.gain.setValueAtTime(vel, t); g.gain.linearRampToValueAtTime(vel * 0.6, t + 0.5 / trem); } g.gain.linearRampToValueAtTime(0.0001, t1); [f, f * 1.01, f * 2.02].forEach((ff) => osc('sawtooth', ff, t0, t1 + 0.05).connect(lp)); lp.connect(g); out(g, 0, 0.2); }
  function heli(t0, t1, vel = 0.25) { mk(t0); for (let t = t0; t < t1; t += 1 / 11) { const k = Math.min(1, (t - t0) / 0.6, (t1 - t) / 0.4); noiseHit(t, 0.06, 'lowpass', 300, 1, vel * Math.max(0.05, k)); } for (let t = t0; t < t1; t += 1) mk(t); }
  function bark(t, vel = 0.6) { mk(t); const o = osc('sawtooth', 520, t, t + 0.16); o.frequency.exponentialRampToValueAtTime(260, t + 0.14); const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 900; bp.Q.value = 1.2; const g = g0(t, vel, 0.005, 0.13); o.connect(bp); bp.connect(g); out(g, 0.2, 0.3); nz2(t, 0.1, 'bandpass', 1400, 1.5, vel * 0.5, 0.2); }
  function engine(t0, t1, vel = 0.2, f0 = 45, f1 = 75) { mk(t0); const o = osc('sawtooth', f0, t0, t1 + 0.05); o.frequency.linearRampToValueAtTime(f1, t1); const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 500; const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t0 + 0.2); for (let t = t0 + 0.2; t < t1 - 0.1; t += 0.06) { g.gain.setValueAtTime(vel, t); g.gain.linearRampToValueAtTime(vel * 0.55, t + 0.03); } g.gain.linearRampToValueAtTime(0.0001, t1); o.connect(lp); lp.connect(g); out(g, 0, 0.2); for (let t = t0; t < t1; t += 0.8) mk(t); }
  function screech(t0, t1, vel = 0.18) { mk(t0); const o = osc('sawtooth', 1900, t0, t1 + 0.05); for (let t = t0; t < t1; t += 0.05) o.frequency.setValueAtTime(1900 + Math.sin(t * 90) * 120 - (t - t0) * 300, t); const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2200; bp.Q.value = 4; const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t0 + 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t1); o.connect(bp); bp.connect(g); out(g, 0, 0.3); sweep(t0, t1, vel * 0.8, 3000, 1500); }
  function paper(t, vel = 0.25) { for (let i = 0; i < 5; i++) nz2(t + i * 0.035, 0.03, 'highpass', 3000 + i * 400, 0.7, vel * (1 - i * 0.15)); }
  function glitchS(t, vel = 0.18) { const R = RNG('gls', Math.round(t * 100)); for (let i = 0; i < 7; i++) tone(t + i * 0.025, R.r(300, 3000), R.r(200, 4000), 0.02, vel, 'square', R.r(-0.8, 0.8)); }
  function tick(t, vel = 0.12, f = 3200) { mk(t); tone(t, f, f, 0.015, vel, 'square'); }
  function gull(t) { mk(t); [0, 0.22].forEach((d) => tone(t + d, 1500, 950, 0.18, 0.05, 'triangle', 0.6, 0.5)); }
  // ---- transitions: a different sound per type, with variations
  let TV = 0;
  for (let i = 1; i < SHOT_LIST.length; i++) {
    const t = SHOT_LIST[i][0], ty = SHOT_LIST[i][3]; TV++;
    to = 's';
    if (ty === 'zoomblur') { whoosh(t - 0.25, 0.3, true, 0.45 + 0.1 * (TV % 3), (TV % 2) - 0.5); }
    else if (ty === 'out') { whoosh(t - 0.05, 0.35, false, 0.45); nz2(t, 0.15, 'lowpass', 200, 1, 0.4); }
    else if (ty === 'whip' || ty === 'whipdown' || ty === 'whipup') { whoosh(t - 0.18, 0.24, ty !== 'whipdown', 0.55, TV % 2 ? 0.6 : -0.6); nz2(t, 0.05, 'bandpass', 1200 + (TV % 4) * 300, 2, 0.2); }
    else if (ty === 'flash' || ty === 'light') { impact(t, 0.5, 1); nz2(t, 0.4, 'highpass', 4000, 0.5, 0.25, 0, 0.6); }
    else if (ty === 'burn') { nz2(t - 0.1, 0.5, 'bandpass', 2500, 0.6, 0.25); for (let k = 0; k < 6; k++) click(t - 0.1 + k * 0.05, 0.06, 4000 + k * 300); }
    else if (ty === 'dip') { impact(t, 0.45, 0); }
    else if (ty === 'glitch') glitchS(t - 0.05, 0.16);
    else if (ty === 'wipe') { whoosh(t - 0.2, 0.28, true, 0.4, -0.6); nz2(t, 0.08, 'bandpass', 600, 1, 0.3); }
    else if (ty === 'rack') { tone(t - 0.1, 400, 900, 0.25, 0.04, 'sine', 0, 0.6); whoosh(t - 0.12, 0.2, true, 0.2); }
    else if (ty === 'tapestop') { tone(t, 300, 40, 0.7, 0.18, 'sawtooth'); nz2(t, 0.3, 'lowpass', 300, 1, 0.3); }
    else if (ty === 'hard') { nz2(t, 0.06, 'lowpass', 900, 1, 0.35); tone(t, 140, 70, 0.12, 0.25); }
  }

  // ---- every slow (vignetted) push-in: a rising tension under the shot, a dramatic hit on the next cut
  for (let i = 0; i < SHOT_LIST.length - 1; i++) { const [t0, , cam] = SHOT_LIST[i], t1 = SHOT_LIST[i + 1][0]; if (cam.m !== 'slow') continue; to = 's'; rise(t0 + 0.05, t1 - 0.03, 0.12 + 0.12 * (cam.vig || 0.5)); if ((cam.vig || 0) >= 0.6) boom(t1, 0.55 + 0.4 * (cam.vig || 0)); else impact(t1, 0.45, 1); }
  // ---- fast snaps: a short air punch
  for (let i = 1; i < SHOT_LIST.length; i++) { const [t0, , cam] = SHOT_LIST[i]; if (cam.m === 'snap') { to = 's'; tone(t0 + 0.02, 180, 90, 0.12, 0.18); } if (cam.m === 'out') { to = 's'; whoosh(t0, 0.3, false, 0.25); } }
  // ---- music bed: a tense, quiet pulse; a light romantic motif in the school; a heartbeat-like bass at the twist
  to = 'm';
  drone(0, 17.1, nz('D2'), 0.045, { att: 0.8, rel: 0.4 });
  pad(3.3, 17.1, ['D3', 'F3', 'A3'], 0.02, { cut: 700, att: 1.0 });
  const pulse = (t0, t1, vel, notes) => { for (let t = t0, k = 0; t < t1 - 0.05; t += E8, k++) bass(t, nz(notes[Math.floor(k / 8) % notes.length]), vel * (k % 2 ? 0.7 : 1)); };
  pulse(17.12, 29.4, 0.16, ['D2', 'F2', 'A1', 'D2']);
  for (let t = 22.0, k = 0; t < 29.4; t += E8, k++) if (k % 2 === 0) pluck(t, nz(['A4', 'D5', 'Fs5', 'D5'][Math.floor(k / 2) % 4]), 0.04, 0, 0.3, 2600, 0.2);
  pad(29.46, 42.3, ['D3', 'F3', 'A3', 'C4'], 0.02, { cut: 900, att: 0.6 }); pulse(29.46, 42.3, 0.14, ['D2', 'A1']);
  for (let t = 42.33, k = 0; t < 58.3; t += E8, k++) { if (k % 2 === 0) pluck(t, nz(['D4', 'Fs4', 'A4', 'B4', 'A4', 'Fs4'][Math.floor(k / 2) % 6]), 0.05, 0, 0.3, 2800, 0.25); }
  pulse(42.33, 58.3, 0.16, ['D2', 'B1', 'G1', 'A1']);
  pad(58.38, 67.7, ['D3', 'F3', 'A3', 'C4'], 0.025, { cut: 1100, att: 0.5 });
  for (let t = 58.38; t < 64.7; t += BEAT) heart(t, 0.35);
  // ---- sound effects by scene
  to = 's';
  boom(0.0, 0.9); for (let t = 0.05; t < 1.4; t += 0.8) for (let k = 0; k < 4; k++) nz2(t + k * 0.08, 0.05, 'bandpass', 180, 2, 0.25);   // phone vibrating on wood
  tone(1.5, 800, 1600, 0.2, 0.06, 'triangle'); chime(1.55, [nz('D5'), nz('Fs5'), nz('A5')], 0.08);
  for (let t = 2.4; t < 3.3; t += 0.06) tone(t, 300 + (t - 2.4) * 900, 600 + (t - 2.4) * 900, 0.05, 0.04, 'sawtooth', Math.sin(t * 20)); glitchS(3.1, 0.12);
  nz2(3.4, 1.8, 'bandpass', 400, 0.4, 0.06); tone(3.6, 2400, 2600, 0.08, 0.025, 'sine', 0.6); tone(3.8, 2800, 2600, 0.08, 0.025, 'sine', 0.6);
  for (let t = 4.5; t < 5.3; t += 0.6) nz2(t, 0.5, 'lowpass', 400, 1, 0.08);   // breathing
  nz2(5.4, 0.3, 'bandpass', 900, 0.8, 0.15); tone(5.9, 500, 700, 0.12, 0.05, 'triangle'); tone(6.3, 700, 500, 0.12, 0.05, 'triangle');
  for (let t = 6.9; t < 8.1; t += 0.2) nz2(t, 0.15, 'highpass', 4000, 0.6, 0.12);   // hair rustle
  for (let t = 8.25; t < 9.2; t += 0.12) nz2(t, 0.1, 'highpass', 3500 + (t * 500) % 800, 0.6, 0.15); tone(8.9, 600, 900, 0.15, 0.06, 'square');
  nz2(9.3, 0.15, 'bandpass', 700, 2, 0.3); nz2(9.55, 0.12, 'bandpass', 900, 2, 0.3); tone(9.75, 300, 200, 0.12, 0.1, 'sawtooth');   // ptui
  tone(10.1, 900, 1400, 0.6, 0.08, 'sawtooth', 0, 0.5); nz2(10.1, 0.7, 'bandpass', 1500, 0.6, 0.2);   // the scream
  for (let t = 11.3; t < 12.2; t += 0.15) tone(t, 900 + Math.sin(t * 30) * 300, 1200, 0.1, 0.04, 'sine', 0, 0.4); impact(12.3, 0.6, 1);
  for (let t = 13.35; t < 14.9; t += 0.18) step(t, 0, 0.25, Math.sin(t * 6) * 0.4); whoosh(14.6, 0.3, true, 0.3);
  nz2(15.1, 1.0, 'bandpass', 3000, 0.4, 0.05); tone(16.1, 1200, 1250, 0.6, 0.06, 'triangle', 0, 0.6); impact(16.12, 0.8, 1);
  tone(17.15, 200, 120, 0.3, 0.2, 'sawtooth'); for (let t = 17.2; t < 18.4; t += 0.3) heart(t, 0.5);
  for (let t = 18.6; t < 19.5; t += 0.2) nz2(t, 0.08, 'lowpass', 500, 1, 0.15); tone(19.0, 600, 900, 0.3, 0.05, 'sine');
  clank(19.7, 0.3, 700); for (let t = 19.8; t < 20.5; t += 0.06) nz2(t, 0.04, 'bandpass', 400, 4, 0.08); [19.9, 20.1, 20.3].forEach((t) => step(t, 0, 0.3));
  nz2(20.7, 1.2, 'bandpass', 300, 0.4, 0.05); for (let i = 0; i < 3; i++) tone(20.95 + i * 0.25, 500 + i * 100, 700 + i * 100, 0.1, 0.05, 'triangle');
  nz2(22.1, 0.3, 'lowpass', 400, 1, 0.3); clank(22.3, 0.2, 900);
  for (let t = 23.4; t < 25.4; t += 0.05) nz2(t, 0.06, 'bandpass', 1800 + Math.sin(t * 9) * 200, 2, 0.04);   // water
  tone(24.0, 300, 600, 0.6, 0.04, 'sine', 0, 0.6);
  impact(24.52, 0.6, 1); chime(24.6, [nz('D5'), nz('Fs5'), nz('A5'), nz('D6')], 0.14); for (let i = 0; i < 10; i++) tone(24.7 + i * 0.05, 1200 + i * 100, 1600 + i * 100, 0.04, 0.04, 'triangle', (i % 2) - 0.5);
  tone(26.1, 700, 1100, 0.2, 0.05, 'sine'); for (let t = 26.3; t < 27.6; t += 0.4) tick(t, 0.03, 1500);
  chime(27.75, [nz('A5'), nz('D6')], 0.1); for (let t = 27.9; t < 29.3; t += 0.3) tone(t, 2000 + (t * 600) % 600, 2400, 0.08, 0.04, 'triangle', Math.sin(t * 5) * 0.5);
  for (let t = 29.5; t < 30.6; t += 0.7) for (let k = 0; k < 4; k++) nz2(t + k * 0.08, 0.05, 'bandpass', 180, 2, 0.3);
  nz2(30.75, 0.3, 'bandpass', 900, 0.8, 0.15); click(31.3, 0.2, 1800);
  for (let i = 0; i < 18; i++) tone(31.98 + i * 0.05, 1500 + (i % 3) * 300, 1500 + (i % 3) * 300, 0.04, 0.06, 'sine', ((i % 3) - 1) * 0.6);
  tone(33.1, 900, 900, 0.1, 0.06, 'sine'); tone(33.25, 1200, 1200, 0.1, 0.05, 'sine'); for (let t = 33.5; t < 34.4; t += 0.3) tick(t, 0.04, 2000);
  impact(34.55, 0.7, 0); tone(34.7, 500, 300, 0.8, 0.06, 'triangle', 0, 0.6); for (let t = 35.0; t < 35.9; t += 0.25) nz2(t, 0.05, 'highpass', 5000, 1, 0.05);
  for (let t = 36.0; t < 37.3; t += 0.08) nz2(t, 0.04, 'bandpass', 2600, 3, 0.06);   // scrolling
  tone(37.5, 300, 600, 0.3, 0.06, 'triangle'); for (let t = 37.6; t < 38.9; t += 0.5) heart(t, 0.4); click(39.05, 0.3, 1500); nz2(39.1, 0.3, 'bandpass', 1200, 0.8, 0.15);
  chime(40.7, [nz('D5'), nz('A5'), nz('Fs6')], 0.12); for (let i = 0; i < 6; i++) tone(40.9 + i * 0.2, 2200, 2600, 0.08, 0.03, 'triangle', (i % 2) - 0.5);
  tone(42.35, 1046, 1046, 0.4, 0.1, 'triangle', 0, 0.5); tone(42.6, 1318, 1318, 0.4, 0.08, 'triangle', 0, 0.5);   // school bell
  for (let t = 42.5; t < 43.2; t += 0.25) step(t, 0, 0.15, Math.sin(t * 4) * 0.5);
  clank(43.4, 0.25, 500); nz2(43.6, 0.6, 'bandpass', 400, 1, 0.12); tone(44.0, 600, 400, 0.15, 0.04, 'triangle');
  for (let i = 0; i < 3; i++) tone(44.9 + i * 0.25, 900 + i * 150, 1200 + i * 150, 0.1, 0.05, 'triangle', (i - 1) * 0.5); nz2(44.8, 1.3, 'bandpass', 800, 0.4, 0.08);   // crowd chatter
  for (let t = 46.2; t < 48.0; t += 0.14) tone(t, 220 + (t * 50) % 60, 180, 0.08, 0.06, 'sawtooth');   // the teacher laughing
  impact(48.1, 0.5, 0); tone(48.2, 400, 380, 1.0, 0.04, 'triangle', 0, 0.6);
  for (let t = 49.5; t < 50.2; t += 0.35) step(t, 0, 0.25);
  for (let t = 50.3; t < 51.3; t += 0.35) step(t, 0, 0.25); whoosh(51.5, 0.3, false, 0.35); impact(51.95, 0.9, 0); nz2(52.0, 0.4, 'lowpass', 400, 1, 0.3); tone(52.1, 800, 300, 0.4, 0.05, 'triangle');
  tone(52.6, 500, 480, 1.2, 0.03, 'triangle', 0, 0.6);
  nz2(54.1, 0.08, 'bandpass', 1200, 1, 0.4); tone(54.3, 400, 300, 0.5, 0.05, 'sine');
  for (let t = 55.6; t < 56.7; t += 0.09) click(t, 0.07, 3000 + (t * 1000) % 600);
  whoosh(57.05, 0.35, true, 0.4); tone(57.3, 1400, 2000, 0.12, 0.08, 'triangle');
  for (let t = 58.4; t < 59.6; t += 0.7) for (let k = 0; k < 4; k++) nz2(t + k * 0.08, 0.05, 'bandpass', 180, 2, 0.3); tone(58.5, 1600, 1600, 0.15, 0.06, 'sine');
  rise(59.8, 61.3, 0.22); boom(61.35, 1.0); impact(61.35, 1.0, 1);
  for (let t = 61.4; t < 62.2; t += 0.06) tone(t, 400 + (t - 61.4) * 600, 400, 0.05, 0.03, 'sawtooth');
  tone(62.3, 600, 900, 0.3, 0.05, 'sine', 0, 0.5); [63.6, 63.85, 64.1].forEach((t, i) => { whoosh(t - 0.1, 0.2, true, 0.25, 0.6); click(t + 0.1, 0.2, 1500 + i * 300); });
  impact(64.8, 0.5, 1); for (let t = 64.9; t < 68.2; t += 0.5) tone(t, (t * 2) % 2 < 1 ? 2100 : 1700, 2000, 0.03, 0.08, 'square'); [65.8, 65.95].forEach((t, i) => tone(t, i ? 1568 : 1319, i ? 1568 : 1319, 0.15, 0.1, 'sine', 0, 0.4)); boom(67.75, 0.7);
  // ---- gap filler
  const M2 = MARK.slice().sort((a, b) => a - b);
  for (let i = 1; i < M2.length; i++) { const a = M2[i - 1], b = M2[i]; if (b - a > 1.0) for (let t = a + 0.5; t < b - 0.25; t += 0.7) nz2(t, 0.16, 'bandpass', 900 + (t * 731) % 1500, 1.2, 0.06, Math.sin(t) * 0.5, 0.4); }
