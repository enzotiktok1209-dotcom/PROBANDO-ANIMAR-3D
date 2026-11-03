  // =====================================================================
  //  SCORE BODY — O Último Homem P2 (inside buildScore). Everything synthesized: risers → hits, a whoosh/hit on
  //  every cut (varied by transition type), foley for each action, a tense pulse bed, and a gap-filler so that
  //  no stretch longer than ~1.2s goes without a sound.
  // =====================================================================
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
  // ---- the music bed (dark synth pulse) — enters with the boat, intensifies in the chase, cuts at the dead end
  to = 'm';
  drone(0.0, 13.3, nz('D2'), 0.05, { att: 1.0, rel: 0.5 });
  const pulse = (t0, t1, vel, notes) => { for (let t = t0, k = 0; t < t1 - 0.05; t += E8, k++) bass(t, nz(notes[Math.floor(k / 8) % notes.length]), vel * (k % 2 ? 0.7 : 1)); };
  pulse(13.27, 47.64, 0.22, ['D2', 'D2', 'F2', 'A1']);
  pad(13.27, 34.3, ['D3', 'F3', 'A3'], 0.02, { cut: 700, att: 1.2 });
  pulse(47.64, 58.93, 0.3, ['D2', 'F2', 'D2', 'A1']);
  for (let t = 47.64; t < 58.9; t += BEAT) nz2(t, 0.05, 'highpass', 6000, 0.7, 0.05);   // hats in the chase
  pad(47.64, 58.93, ['D3', 'A3', 'D4'], 0.025, { cut: 1100, att: 0.3, rel: 0.05 });
  drone(61.44, 64.6, nz('D2'), 0.06, { att: 0.5, rel: 0.05 });
  pulse(64.64, 71.8, 0.26, ['A1', 'D2']);
  // ---- sound effects, by scene
  to = 's';
  // GANCHO: a drop on the first frame, a rising tension into a dramatic hit on each beat of the hook
  boom(0.0, 1.0); rise(0.25, 2.0, 0.22); for (let t = 0.3; t < 1.9; t += 0.09) tick(t, 0.05, 2600 + (t * 900) % 1400);
  for (let t = 0.5; t < 1.8; t += 0.18) tone(t, 900 - t * 200, 500, 0.05, 0.03, 'sine', 0.3);
  tone(1.9, 2000, 2000, 0.4, 0.08, 'sine', 0, 0.6);
  impact(2.04, 1.0, 1); tone(2.1, 1200, 1250, 0.1, 0.05); hum(2.3, 3.1, 120, 0.04, 40); clank(3.1, 0.25, 2500);
  tone(3.55, 200, 120, 0.15, 0.2); nz2(4.0, 0.12, 'lowpass', 300, 1, 0.3); tick(4.4, 0.08);
  whoosh(4.75, 0.3, false, 0.4); impact(5.1, 0.9, 0); paper(5.35, 0.3); for (let t = 5.5; t < 6.15; t += 0.05) tick(t, 0.05, 4200);
  click(6.25, 0.2, 800); [6.6, 6.9, 7.2, 7.4, 7.6].forEach((t, i) => tone(t, 300 + i * 120, 600 + i * 150, 0.08, 0.08, 'triangle', (i % 2) - 0.5));
  nz2(7.6, 0.6, 'bandpass', 800, 0.6, 0.12); rise(6.6, 8.2, 0.22); impact(8.25, 0.9, 1);
  // RECAP
  nz2(8.3, 1.6, 'bandpass', 500, 0.4, 0.08, 0, 0.3, 900); tone(8.6, 2400, 2600, 0.08, 0.03, 'sine', 0.6); tone(8.75, 2800, 2600, 0.08, 0.03, 'sine', 0.6);
  paper(8.9, 0.25); nz2(9.4, 0.2, 'bandpass', 900, 1, 0.15); paper(9.8, 0.3);
  for (let t = 10.05; t < 11.6; t += 0.11) nz2(t, 0.05, 'bandpass', 3500, 3, 0.05); nz2(10.6, 0.2, 'highpass', 2500, 1, 0.12); gull(11.2);
  for (let t = 11.8; t < 12.45; t += 0.06) tick(t, 0.06, 1800); chime(12.45, [nz('D3'), nz('A3'), nz('D4')], 0.25); boom(12.45, 0.6); splash(12.9, 0.2);
  // O GIRO
  nz2(13.4, 0.5, 'lowpass', 400, 2, 0.15); nz2(14.2, 0.3, 'bandpass', 300, 3, 0.15); step(14.9, 1, 0.3); step(15.4, 1, 0.3);
  [15.35, 15.8, 16.25].forEach((t) => impact(t, 0.35, 0)); for (let i = 0; i < 11; i++) tick(15.45 + i * 0.1, 0.08, 1800 + i * 120); nz2(16.6, 0.2, 'bandpass', 1500, 0.8, 0.15);
  splash(16.85, 0.15); nz2(17.8, 0.5, 'bandpass', 1100, 0.8, 0.25, 0, 0.8); sweep(18.0, 18.35, 0.06, 2000, 5000); tone(18.1, 1800, 1900, 0.3, 0.05, 'sawtooth', 0, 0.5); nz2(18.4, 0.15, 'highpass', 1800, 0.7, 0.15);
  click(18.55, 0.3, 1500); nz2(18.57, 0.08, 'highpass', 3000, 1, 0.2); tone(18.9, nz('A5'), nz('A5'), 0.5, 0.05, 'triangle', 0.2, 0.6); tone(19.3, nz('Fs5'), nz('Fs5'), 0.5, 0.05, 'triangle', -0.2, 0.6); paper(20.3, 0.2);
  rise(19.6, 21.4, 0.18); nz2(20.8, 0.5, 'lowpass', 300, 1, 0.5, 0, 0.7); splash(20.95, 0.35); nz2(21.3, 0.12, 'highpass', 1000, 1, 0.2);
  [21.45, 21.7, 21.95, 22.2].forEach((t, i) => { clank(t, 0.4, 900 + i * 220); impact(t, 0.35, 0); }); hum(22.3, 22.9, 120, 0.05, 60); nz2(22.6, 0.2, 'bandpass', 2000, 2, 0.12);
  siren(23.0, 34.3, 0.06, -0.4, 720); siren(23.3, 34.3, 0.05, 0.4, 610); screech(23.4, 23.9, 0.12); impact(23.9, 0.5, 0); clank(24.3, 0.3, 700);
  tone(24.6, 70, 60, 0.9, 0.12, 'sawtooth', 0, 0.3); [25.6, 25.76, 25.92, 26.08, 26.24].forEach((t, i) => nz2(t, 0.12, 'bandpass', 1600 + i * 250, 2, 0.3, (i - 2) * 0.3)); whoosh(26.3, 0.25, false, 0.3);
  nz2(26.65, 0.3, 'bandpass', 600, 0.8, 0.25); nz2(27.1, 0.2, 'bandpass', 2500, 1.5, 0.2); tone(27.5, 2600, 3200, 0.25, 0.07, 'triangle', 0, 0.6); splash(28.4, 0.35);
  for (let i = 0; i < 3; i++) tone(29.0 + i * 0.12, 180, 180, 0.08, 0.12, 'square'); click(29.6, 0.3, 1200); nz2(29.8, 0.9, 'bandpass', 1200, 2, 0.12); boom(30.8, 0.7);
  tone(30.35, 300, 280, 0.8, 0.03, 'triangle', 0, 0.6); heart(30.6, 0.4);
  [31.25, 32.0, 32.85].forEach((t, i) => { impact(t, 0.35, 0); nz2(t + 0.3, 0.18, 'bandpass', 2500 + i * 300, 2, 0.2); }); nz2(33.4, 0.2, 'bandpass', 900, 4, 0.15);
  rise(31.3, 33.55, 0.22); clank(33.6, 0.8, 1400); boom(33.7, 1.0);
  // ESCONDIDO
  whoosh(34.35, 0.5, true, 0.25); [34.9, 35.05, 35.2, 35.4].forEach((t) => step(t, 0, 0.5)); clank(35.2, 0.2, 2200); [35.5, 35.6].forEach((t) => click(t, 0.2, 1800));
  hum(35.75, 40.2, 210, 0.04, 35); hum(36.0, 40.2, 260, 0.025, 28); [36.4, 37.0].forEach((t) => tone(t, 1400, 1400, 0.08, 0.06)); heli(36.8, 46.4, 0.2);
  [38.0, 38.2, 38.4, 38.6].forEach((t) => step(t, 1, 0.3)); nz2(38.8, 0.3, 'bandpass', 900, 1, 0.2); impact(38.85, 0.3, 1); nz2(39.4, 0.25, 'bandpass', 700, 0.8, 0.18);
  nz2(40.25, 0.35, 'bandpass', 1200, 0.7, 0.25, 0, 0, 400); heart(40.5, 0.6); heart(41.0, 0.6);
  click(41.36, 0.3, 1500); hum(41.4, 42.0, 900, 0.015, 0); step(42.07, 1, 0.5); step(42.4, 1, 0.5); heart(41.6, 0.5); heart(42.1, 0.55);
  [42.75, 43.25, 43.75].forEach((t, i) => step(t, 1, 0.3 + i * 0.12, -0.5)); for (let t = 43.3; t < 43.7; t += 0.03) tone(t, 900 + Math.sin(t * 300) * 400, 800, 0.025, 0.02, 'square'); heart(43.0, 0.6); heart(43.5, 0.7); heart(43.95, 0.75);
  hum(44.25, 47.5, 230, 0.06, 40); tone(45.1, 300, 160, 0.25, 0.08, 'sawtooth'); for (let i = 0; i < 9; i++) tone(45.5 + i * 0.09 * (1 - i * 0.06), 1800, 1800, 0.04, 0.1, 'square'); tone(46.3, 2400, 2400, 0.25, 0.12, 'square');
  rise(44.3, 46.4, 0.18); [46.5, 46.8].forEach((t) => { tone(t, 1600, 1600, 0.18, 0.12, 'square'); tone(t, 1200, 1200, 0.18, 0.08, 'square'); }); impact(46.45, 0.7, 0); tone(47.1, 400, 900, 0.5, 0.06, 'sawtooth');
  // FUGA
  impact(47.65, 0.6, 0); siren(47.7, 58.9, 0.06, -0.5, 700); siren(48.2, 58.9, 0.05, 0.5, 590);
  for (let t = 47.85; t < 58.85; t += 0.19) step(t, (t > 48.8 && t < 50.1) || t > 53.4 ? 0.3 : 1, 0.22, Math.sin(t * 3) * 0.3);
  for (let t = 48.3; t < 58.9; t += 0.38) nz2(t, 0.12, 'bandpass', 500, 0.8, 0.08);   // breathing
  nz2(49.2, 0.1, 'lowpass', 700, 1, 0.4); whoosh(49.25, 0.4, true, 0.35); impact(49.8, 0.5, 0);
  tone(50.1, 1320, 1320, 0.25, 0.08, 'triangle', 0, 0.6); tone(50.35, 1320, 1320, 0.25, 0.08, 'triangle', 0, 0.6);
  { const o = osc('sawtooth', 160, 50.4, 51.7); o.frequency.setValueAtTime(190, 50.4); o.frequency.exponentialRampToValueAtTime(120, 51.6); const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; const g = ac.createGain(); g.gain.setValueAtTime(0.0001, 50.4); g.gain.exponentialRampToValueAtTime(0.2, 50.95); g.gain.exponentialRampToValueAtTime(0.0001, 51.7); o.connect(lp); lp.connect(g); out(g, 0, 0.3); mk(50.4); mk(51.2); }
  nz2(50.6, 1.0, 'bandpass', 600, 0.5, 0.25, 0, 0.2); for (let i = 0; i < 5; i++) tone(51.1 + i * 0.05, 3000 + i * 500, 2000, 0.03, 0.05, 'square', 0.5); clank(51.6, 0.2, 2600);
  clank(52.4, 0.15, 900); tone(52.8, 700, 500, 0.15, 0.05, 'triangle', 0.6); tone(52.95, 800, 450, 0.2, 0.05, 'triangle', 0.6);
  nz2(53.45, 0.3, 'bandpass', 2500, 3, 0.18); [54.0, 54.25, 54.5, 54.75].forEach((t) => bark(t, 0.55)); clank(54.05, 0.5, 600); nz2(54.4, 0.4, 'bandpass', 3000, 6, 0.08);
  clank(55.3, 0.5, 800); for (let i = 0; i < 6; i++) clank(55.5 + i * 0.07, 0.15, 500 + i * 60); nz2(55.1, 0.3, 'lowpass', 500, 1, 0.3);
  for (let t = 55.9; t < 57.1; t += 0.33) { tone(t, 1000, 1000, 0.05, 0.08); heart(t + 0.1, 0.5); } nz2(56.7, 0.25, 'bandpass', 700, 0.8, 0.25);
  for (let t = 57.25; t < 58.9; t += 0.45) tone(t, 1200, 1200, 0.06, 0.07, 'sine', 0, 0.5); [57.9, 58.25, 58.6].forEach((t, i) => tone(t, 180 + i * 60, 180 + i * 60, 0.2, 0.12, 'square'));
  // SEM SAÍDA: the music cuts hard; only foley, breath, heartbeat
  impact(59.1, 0.6, 0); nz2(59.1, 0.1, 'lowpass', 1500, 1, 0.4); for (let i = 0; i < 6; i++) clank(59.6 + i * 0.06, 0.2, 400 + i * 40); nz2(60.4, 0.15, 'highpass', 3000, 0.7, 0.2);
  for (let t = 60.4; t < 61.4; t += 0.25) nz2(t, 0.18, 'bandpass', 600, 0.7, 0.12); heart(60.3, 0.6); heart(60.9, 0.65);
  [61.45, 61.8, 62.1].forEach((t) => click(t, 0.3, 1500)); for (let t = 62.4; t < 63.2; t += 0.3) step(t, 1, 0.35, -0.4); nz2(62.9, 0.5, 'bandpass', 1400, 2, 0.08);
  rise(61.5, 64.6, 0.2); clank(63.9, 0.35, 500); engine(63.6, 67.0, 0.22, 40, 70);
  // THE KOMBI
  screech(65.2, 66.1, 0.2); impact(66.15, 0.8, 0); nz2(66.2, 0.5, 'lowpass', 300, 2, 0.3); clank(66.8, 0.3, 700); for (let t = 66.3; t < 66.9; t += 0.12) nz2(t, 0.05, 'bandpass', 400, 2, 0.15);
  engine(67.0, 71.8, 0.08, 38, 38); for (let t = 67.25; t < 68.0; t += 0.1) nz2(t, 0.05, 'bandpass', 2200, 6, 0.12); clank(67.9, 0.25, 600);
  for (let i = 0; i < 4; i++) tone(68.9 + i * 0.06, 3200 + i * 300, 3000, 0.05, 0.03, 'triangle', 0.3); for (let t = 69.4; t < 70.4; t += 0.22) nz2(t, 0.04, 'bandpass', 1800, 3, 0.04); siren(69.8, 73.3, 0.04, -0.6, 700);
  tone(70.45, 1600, 1700, 0.5, 0.05, 'sawtooth', 0, 0.6); click(71.0, 0.2, 2000); nz2(71.6, 0.3, 'bandpass', 900, 0.8, 0.25);
  // silence before "Agora": a dry door, then the loudest hit
  click(72.2, 0.4, 900); nz2(72.22, 0.25, 'lowpass', 600, 1, 0.5); boom(72.7, 1.1); impact(72.7, 1.0, 1); [72.9, 73.1].forEach((t) => step(t, 0, 0.3, -0.6));
  // CTA: clock ticking, card pops, button clicks, notification
  for (let t = 73.3, k = 0; t < 79.0; t += 0.5, k++) tone(t, k % 2 ? 1700 : 2100, k % 2 ? 1700 : 2100, 0.03, 0.12, 'square');
  impact(73.35, 0.4, 1); tone(74.45, 1200, 1800, 0.08, 0.2, 'triangle'); click(74.5, 0.3, 2600); tone(75.9, 900, 600, 0.1, 0.2, 'triangle'); click(75.95, 0.3, 1600);
  siren(76.2, 78.6, 0.02, 0.6, 650); [77.45, 77.6].forEach((t, i) => tone(t, i ? 1568 : 1319, i ? 1568 : 1319, 0.15, 0.12, 'sine', 0, 0.4)); boom(78.7, 0.9);
  // ---- gap filler: nothing silent for more than ~1.2s
  const M2 = MARK.slice().sort((a, b) => a - b);
  for (let i = 1; i < M2.length; i++) { const a = M2[i - 1], b = M2[i]; if (b - a > 1.2) for (let t = a + 0.6; t < b - 0.3; t += 0.8) nz2(t, 0.18, 'bandpass', 900 + (t * 731) % 1500, 1.2, 0.07, Math.sin(t) * 0.5, 0.4); }
