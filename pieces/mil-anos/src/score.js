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
  // ---- music bed: a light, curious pulse for the dream, darker as the world empties
  to = 'm';
  drone(0, 13.9, nz('D2'), 0.04, { att: 0.8, rel: 0.4 });
  for (let t = 0.0, k = 0; t < 13.9; t += E8, k++) if (k % 2 === 0) pluck(t, nz(['D4', 'Fs4', 'A4', 'Fs4'][Math.floor(k / 2) % 4]), 0.05, 0, 0.3, 2400, 0.2);
  const pulse = (t0, t1, vel, notes) => { for (let t = t0, k = 0; t < t1 - 0.05; t += E8, k++) bass(t, nz(notes[Math.floor(k / 8) % notes.length]), vel * (k % 2 ? 0.7 : 1)); };
  pad(13.96, 26.3, ['D3', 'F3', 'A3'], 0.02, { cut: 800, att: 1.0 });
  pulse(26.31, 78.8, 0.18, ['D2', 'F2', 'A1', 'D2']);
  pad(26.31, 78.8, ['D3', 'A3', 'D4'], 0.016, { cut: 900, att: 0.6 });
  for (let t = 48.01; t < 78.8; t += BEAT) nz2(t, 0.04, 'highpass', 6500, 0.7, 0.035);
  pad(78.81, 89.9, ['D3', 'F3', 'A3', 'C4'], 0.025, { cut: 1200, att: 0.8 });
  // ---- sound effects by scene
  to = 's';
  boom(0.0, 0.9); for (let t = 0.0; t < 0.6; t += 0.07) tone(t, 2400, 2400, 0.04, 0.08, 'square');   // the alarm ringing
  nz2(0.5, 0.5, 'bandpass', 600, 0.6, 0.2); tone(0.9, 300, 600, 0.3, 0.05, 'triangle'); nz2(1.0, 0.3, 'bandpass', 900, 0.8, 0.15);
  for (let t = 1.6; t < 3.3; t += 0.08) nz2(t, 0.05, 'highpass', 3000 + (t * 900) % 1500, 1, 0.08);   // calendar pages
  for (let t = 1.6; t < 3.2; t += 0.12) tick(t, 0.06, 1800 + (t * 400) % 600); impact(3.2, 0.6, 1);
  nz2(3.5, 1.2, 'bandpass', 400, 0.5, 0.06); gull(4.2); tone(4.6, 500, 300, 0.25, 0.05, 'triangle');
  tone(5.3, 600, 1200, 0.15, 0.08, 'triangle'); chime(5.45, [nz('D5'), nz('Fs5'), nz('A5')], 0.1); click(5.6, 0.2, 2200);
  whoosh(6.4, 0.4, true, 0.35); paper(6.6, 0.35); paper(6.9, 0.3); paper(7.2, 0.3); paper(7.5, 0.25); for (let t = 7.1; t < 7.9; t += 0.2) tone(t, 1200, 1100, 0.05, 0.04, 'triangle', Math.sin(t * 5) * 0.6);
  for (let t = 8.15; t < 8.6; t += 0.06) tone(t, 2400, 2400, 0.04, 0.08, 'square'); whoosh(8.35, 0.15, false, 0.3); impact(8.62, 1.0, 1); clank(8.65, 0.6, 1800); for (let i = 0; i < 6; i++) clank(8.75 + i * 0.07, 0.15, 900 + i * 200);
  nz2(9.4, 0.3, 'bandpass', 2600, 4, 0.1);
  for (let t = 10.2; t < 11.0; t += 0.5) tick(t, 0.12, 1500);
  for (let t = 11.1; t < 12.0; t += 0.05) tick(t, 0.06, 1200 + (t * 2000) % 900); tone(12.0, 1600, 1600, 0.3, 0.15, 'square'); tone(12.0, 1200, 1200, 0.3, 0.1, 'square');
  for (let t = 12.6; t < 13.9; t += 0.5) { tone(t, 2000, 2000, 0.05, 0.1, 'square'); heart(t + 0.2, 0.4); }
  nz2(14.3, 1.6, 'lowpass', 200, 1, 0.3, 0, 0.4); clank(14.4, 0.4, 500); for (let t = 14.5; t < 16.1; t += 0.25) step(t, 0, 0.12, Math.sin(t * 3) * 0.6);
  hum(16.2, 17.8, 150, 0.04, 20); [16.4, 16.9, 17.4].forEach((t) => tone(t, 900, 1300, 0.08, 0.06, 'sine')); for (let t = 16.3; t < 17.8; t += 0.3) tone(t, 1800, 1800, 0.03, 0.05, 'square', 0.4);
  nz2(18.0, 0.4, 'bandpass', 700, 0.8, 0.2); tone(18.5, 700, 400, 0.12, 0.08, 'triangle', 0.5); nz2(18.6, 0.3, 'bandpass', 1500, 1, 0.12);
  hum(19.6, 20.4, 220, 0.05, 0); nz2(19.8, 0.6, 'bandpass', 1200, 0.6, 0.15, 0, 0.5, 300); tone(20.2, 900, 400, 0.4, 0.06, 'sine', 0, 0.6);
  for (let t = 20.5; t < 21.9; t += 0.06) tick(t, 0.05, 2200 - (t - 20.5) * 600); tone(21.9, 400, 200, 0.3, 0.12, 'square');
  nz2(22.2, 1.8, 'bandpass', 500, 0.4, 0.07, 0, 0.3, 900); for (let i = 0; i < 5; i++) paper(22.4 + i * 0.35, 0.1);
  hum(23.7, 26.2, 60, 0.05, 0);
  impact(26.35, 0.7, 1); for (let t = 26.5; t < 27.0; t += 0.1) tick(t, 0.06, 2400);
  hum(27.1, 27.7, 120, 0.08, 60); clank(27.6, 0.6, 700); for (let i = 0; i < 8; i++) nz2(27.62 + i * 0.03, 0.03, 'highpass', 5000, 1, 0.2); tone(27.7, 300, 30, 0.9, 0.2, 'sawtooth');
  for (let i = 0; i < 10; i++) click(28.95 + i * 0.1, 0.12, 900 + i * 50); tone(30.0, 1200, 300, 0.5, 0.1, 'sawtooth'); [30.3, 30.42, 30.54, 30.66].forEach((t) => click(t, 0.15, 1400));
  tone(31.3, 880, 880, 0.15, 0.06, 'sine'); tone(31.5, 660, 660, 0.15, 0.05, 'sine'); for (let t = 31.8; t < 32.9; t += 0.55) tick(t, 0.05, 1600);
  tone(33.1, 400, 200, 0.4, 0.05, 'triangle'); nz2(33.6, 0.3, 'bandpass', 900, 0.8, 0.12); tone(34.3, 600, 300, 0.4, 0.05, 'sine', 0, 0.5);
  hum(35.0, 36.6, 120, 0.05, 50); for (let t = 35.1; t < 36.6; t += 0.25) tone(t, 1400 + (t * 700) % 700, 1400, 0.05, 0.05, 'square', Math.sin(t * 4) * 0.5);
  for (let t = 36.65; t < 37.6; t += 0.05) tick(t, 0.05, 2600); tone(37.7, 1046, 1046, 0.2, 0.1, 'triangle'); for (let i = 0; i < 10; i++) clank(37.7 + i * 0.06, 0.1, 3000 + i * 100);
  nz2(38.0, 0.8, 'bandpass', 300, 0.6, 0.1, 0, 0.3, 200); tone(38.3, 300, 280, 0.5, 0.04, 'triangle', 0, 0.6);
  impact(38.85, 0.7, 1); for (let t = 39.0; t < 39.5; t += 0.1) tick(t, 0.06, 2400);
  for (let t = 39.7; t < 40.8; t += 0.15) step(t, 0, 0.12, -0.4); tone(40.4, 1200, 900, 0.1, 0.05, 'triangle'); nz2(40.8, 0.25, 'lowpass', 600, 1, 0.3); clank(41.2, 0.3, 1200); tone(41.4, 700, 500, 0.12, 0.06, 'sawtooth');
  nz2(41.8, 0.4, 'bandpass', 400, 2, 0.2); for (let t = 42.0; t < 42.9; t += 0.08) tone(t, 220 + Math.sin(t * 40) * 40, 220, 0.06, 0.03, 'sawtooth', Math.sin(t * 9));   // flies buzzing
  nz2(42.95, 0.3, 'highpass', 2500, 0.7, 0.25); for (let t = 43.2; t < 44.1; t += 0.14) nz2(t, 0.06, 'bandpass', 2000, 2, 0.15);   // crunch crunch
  impact(44.2, 0.5, 1); for (let i = 0; i < 12; i++) tone(44.3 + i * 0.05, 1000 + i * 120, 1500 + i * 120, 0.04, 0.05, 'triangle', (i % 2) - 0.5); chime(44.5, [nz('D5'), nz('A5'), nz('D6')], 0.1);
  hum(45.9, 47.9, 200, 0.02, 0); for (let t = 46.0; t < 47.9; t += 0.6) { nz2(t, 0.4, 'bandpass', 300, 0.8, 0.1); tone(t + 0.3, 90, 70, 0.3, 0.06); }   // purring
  impact(48.05, 0.7, 1); for (let t = 48.9; t < 50.9; t += 0.2) step(t, 0, 0.12, 0.3); for (let i = 0; i < 4; i++) tone(49.2 + i * 0.4, 2200, 2800, 0.1, 0.04, 'triangle', 0.6);
  for (let t = 51.0; t < 52.2; t += 0.12) nz2(t, 0.08, 'bandpass', 3000, 1, 0.08); tone(51.8, 900, 1300, 0.2, 0.06, 'sine');
  for (let t = 52.4; t < 53.7; t += 0.2) tone(t, 3000 + (t * 900) % 800, 2500, 0.06, 0.05, 'triangle', 0.3);
  for (let t = 53.8; t < 55.6; t += 0.45) step(t, 0, 0.3); tone(55.7, 120, 80, 0.8, 0.15, 'sawtooth', 0, 0.3); nz2(55.7, 0.8, 'bandpass', 400, 0.6, 0.2);   // the roar
  clank(56.05, 0.4, 1300); tone(56.6, 160, 100, 0.5, 0.1, 'sawtooth'); [56.75, 56.9, 57.05, 57.2, 57.35].forEach((t, i) => tone(t, 1500, 1500, 0.06, i ? 0.04 : 0.1, 'square'));
  impact(57.98, 0.7, 1); for (let t = 58.1; t < 58.6; t += 0.1) tick(t, 0.06, 2400);
  nz2(58.9, 1.7, 'lowpass', 300, 0.6, 0.15, 0, 0.4); tone(59.4, 80, 70, 1.0, 0.08, 'sawtooth'); [59.6, 60.2].forEach((t) => nz2(t, 0.3, 'bandpass', 500, 3, 0.15)); gull(60.0);
  impact(60.95, 1.0, 0); clank(61.0, 0.7, 500); for (let i = 0; i < 3; i++) impact(61.3 + i * 0.25, 0.4, 0); splash(61.6, 0.5);
  [62.2, 62.5, 62.8, 63.1, 63.4, 63.7].forEach((t, i) => { tone(t, 1500, 950, 0.15, 0.06, 'triangle', i % 2 ? 0.6 : -0.6); nz2(t + 0.05, 0.1, 'highpass', 3000, 1, 0.1); });
  nz2(64.2, 1.2, 'bandpass', 600, 0.5, 0.06); for (let t = 64.4; t < 65.3; t += 0.3) tick(t, 0.03, 1200);
  impact(65.45, 0.6, 0); for (let i = 0; i < 8; i++) clank(65.5 + i * 0.06, 0.15, 400 + i * 80); nz2(65.8, 0.8, 'bandpass', 2500, 0.5, 0.15);
  nz2(66.9, 2.0, 'bandpass', 500, 0.3, 0.1, 0, 0.3, 900); gull(67.3); tone(67.8, 2000, 1500, 0.1, 0.04, 'triangle'); nz2(68.3, 0.15, 'highpass', 2500, 1, 0.15);
  impact(69.1, 0.7, 1); for (let t = 69.2; t < 69.7; t += 0.1) tick(t, 0.06, 2400);
  for (let t = 70.0; t < 72.1; t += 0.18) nz2(t, 0.1, 'bandpass', 1800 + (t * 500) % 800, 3, 0.08);
  impact(72.25, 0.8, 0); for (let i = 0; i < 10; i++) nz2(72.3 + i * 0.05, 0.05, 'lowpass', 800, 1, 0.25); clank(72.5, 0.3, 600);
  nz2(74.3, 1.4, 'bandpass', 500, 0.4, 0.06); for (let t = 74.4; t < 75.6; t += 0.25) tone(t, 3200 + (t * 1000) % 900, 2600, 0.07, 0.05, 'triangle', Math.sin(t * 5) * 0.6);
  for (let t = 75.8; t < 76.9; t += 0.18) tone(t, 2600 + (t * 700) % 800, 3000, 0.05, 0.05, 'triangle', 0.3);
  for (let t = 77.0; t < 78.7; t += 0.15) nz2(t, 0.12, 'bandpass', 3500, 1, 0.07, Math.sin(t * 7) * 0.6);
  hum(78.9, 80.4, 400, 0.02, 0); for (let t = 79.0; t < 80.4; t += 0.4) tone(t, 1000, 1000, 0.08, 0.05, 'square');
  nz2(80.55, 1.6, 'bandpass', 800, 0.5, 0.35, 0, 0.5, 200); sweep(80.6, 82.0, 0.12, 4000, 400); boom(81.7, 0.9);
  tone(82.3, 400, 380, 1.2, 0.03, 'triangle', 0, 0.6); for (let t = 82.4; t < 83.9; t += 0.6) heart(t, 0.3);
  impact(83.98, 0.7, 1); for (let t = 84.1; t < 84.6; t += 0.1) tick(t, 0.06, 2400); gull(85.6); nz2(85.5, 1.2, 'bandpass', 500, 0.4, 0.07);
  for (let t = 86.75; t < 87.7; t += 0.05) tick(t, 0.06, 1400); tone(87.7, 1600, 1600, 0.2, 0.12, 'square');
  for (let t = 88.5; t < 89.9; t += 0.5) tick(t, 0.1, 2000);
  impact(90.0, 0.5, 1); for (let t = 90.1; t < 92.4; t += 0.5) tone(t, (t * 2) % 2 < 1 ? 2100 : 1700, 2000, 0.03, 0.1, 'square'); tone(90.7, 1200, 1800, 0.08, 0.15, 'triangle'); [91.5, 91.65].forEach((t, i) => tone(t, i ? 1568 : 1319, i ? 1568 : 1319, 0.15, 0.1, 'sine', 0, 0.4)); boom(92.3, 0.7);
  // ---- gap filler
  const M2 = MARK.slice().sort((a, b) => a - b);
  for (let i = 1; i < M2.length; i++) { const a = M2[i - 1], b = M2[i]; if (b - a > 1.0) for (let t = a + 0.5; t < b - 0.25; t += 0.7) nz2(t, 0.16, 'bandpass', 900 + (t * 731) % 1500, 1.2, 0.06, Math.sin(t) * 0.5, 0.4); }
