  // =====================================================================
  //  SCORE BODY — Zombie-Klinik: cinematic sound design under the German voice-over.
  //  's' = sound effects (not ducked by the score's own duck), 'm' = the music bed (ducked under the voice).
  //  Every cut gets a whoosh sized by its camera; the story beats get risers, hits, booms and real-world sounds.
  // =====================================================================
  const A = (s) => at(s);
  const verbS = verbs.s;
  // ---- custom instruments
  function whoosh(t, dur, vel, f0 = 300, f1 = 3800, pan = 0) {
    const src = ac.createBufferSource(); src.buffer = noise; src.loop = true;
    const f = ac.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 0.9; f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vel, t + dur * 0.65); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const p = ac.createStereoPanner(); p.pan.setValueAtTime(-pan, t); p.pan.linearRampToValueAtTime(pan, t + dur);
    src.connect(f); f.connect(g); g.connect(p); p.connect(to === 'm' ? duck : sfxBus); const s2 = ac.createGain(); s2.gain.value = 0.25; g.connect(s2); s2.connect(verbs[to]);
    src.start(t, (t * 1.7) % 2); src.stop(t + dur + 0.05);
  }
  function boom(t, vel, len = 2.2) {   // a cinematic low hit: sine drop + rumble + a crack, into the reverb
    const o = osc('sine', 90, t, t + len); o.frequency.exponentialRampToValueAtTime(28, t + len * 0.8);
    const g = ac.createGain(); env(g, t, 0.005, vel, len); o.connect(g); out(g, 0, 0.5);
    noiseHit(t, len * 0.6, 'lowpass', 220, 0.7, vel * 0.7, 0, 0.6);
    noiseHit(t, 0.12, 'bandpass', 1800, 0.8, vel * 0.5, 0, 0.4);
  }
  function hit(t, vel) { sub(t, vel); noiseHit(t, 0.35, 'lowpass', 900, 0.8, vel * 0.5, 0, 0.5); noiseHit(t, 0.08, 'highpass', 3000, 0.7, vel * 0.25); }
  function swell(t1, dur, vel) {   // a reverse-cymbal swell that lands on t1
    const t0 = t1 - dur, src = ac.createBufferSource(); src.buffer = noise; src.loop = true;
    const f = ac.createBiquadFilter(); f.type = 'highpass'; f.frequency.setValueAtTime(800, t0); f.frequency.exponentialRampToValueAtTime(5000, t1);
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t1 - 0.01); g.gain.linearRampToValueAtTime(0.0001, t1 + 0.01);
    src.connect(f); f.connect(g); out(g, 0, 0.3); src.start(t0, (t0 * 2.3) % 2); src.stop(t1 + 0.05);
  }
  function tense(t0, t1, vel) {   // a rising tremolo string riser + noise swell
    for (const [n, det] of [['D3', 0], ['Eb3', 0], ['A3', 4]]) {
      const o = osc('sawtooth', nz(n.replace('Eb', 'Ds').replace('Ds3', 'D3')) * (n === 'Eb3' ? 1.0595 : 1), t0, t1 + 0.05); o.detune.value = det;
      o.frequency.exponentialRampToValueAtTime((nz('D3') * (n === 'A3' ? 1.5 : n === 'Eb3' ? 1.0595 : 1)) * 2, t1);
      const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.setValueAtTime(500, t0); lp.frequency.exponentialRampToValueAtTime(3200, t1);
      const trem = ac.createGain(), lfo = osc('sine', 9, t0, t1 + 0.05), lg = ac.createGain(); lg.gain.value = 0.5; lfo.connect(lg); lg.connect(trem.gain); trem.gain.value = 0.5;
      const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t1 - 0.02); g.gain.linearRampToValueAtTime(0.0001, t1 + 0.02);
      o.connect(lp); lp.connect(trem); trem.connect(g); out(g, 0, 0.4);
    }
    swell(t1, Math.min(2, t1 - t0), vel * 0.8);
  }
  function heart(t, vel) { for (const [dt, k] of [[0, 1], [0.17, 0.7]]) { const o = osc('sine', 75, t + dt, t + dt + 0.25); o.frequency.exponentialRampToValueAtTime(38, t + dt + 0.15); const g = ac.createGain(); env(g, t + dt, 0.004, vel * k, 0.2); o.connect(g); out(g); } }
  function beep(t, f, dur, vel, pan = 0.15) { const o = osc('sine', f, t, t + dur + 0.02); const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vel, t + 0.005); g.gain.setValueAtTime(vel, t + dur - 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); o.connect(g); out(g, pan, 0.15); }
  function alarm(t0, t1, vel) { for (let t = t0; t < t1 - 0.2; t += 0.9) [0, 0.2, 0.4].forEach((d, k) => { if (t + d < t1) beep(t + d, k === 1 ? 784 : 988, 0.14, vel); }); }
  function groan(t, dur, vel, f = 85, pan = 0) {   // a zombie groan: a low buzzy voice through a vowel formant, wobbling
    const o = osc('sawtooth', f, t, t + dur + 0.05); o.frequency.linearRampToValueAtTime(f * 0.78, t + dur);
    const vib = osc('sine', 5.5, t, t + dur), vg = ac.createGain(); vg.gain.value = f * 0.05; vib.connect(vg); vg.connect(o.frequency);
    const f1 = ac.createBiquadFilter(); f1.type = 'bandpass'; f1.frequency.setValueAtTime(520, t); f1.frequency.linearRampToValueAtTime(380, t + dur); f1.Q.value = 4;
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vel, t + dur * 0.3); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(f1); f1.connect(g); out(g, pan, 0.5);
  }
  function thud(t, vel, f = 260) { noiseHit(t, 0.18, 'lowpass', f, 1, vel); const o = osc('sine', 110, t, t + 0.2); o.frequency.exponentialRampToValueAtTime(50, t + 0.15); const g = ac.createGain(); env(g, t, 0.003, vel * 0.8, 0.15); o.connect(g); out(g); }
  function clank(t, vel) { noiseHit(t, 0.25, 'bandpass', 2600, 9, vel, 0.1, 0.4); noiseHit(t, 0.4, 'bandpass', 900, 6, vel * 0.7, -0.1, 0.4); thud(t, vel * 0.6, 400); }
  function click(t, vel, f = 4000) { noiseHit(t, 0.03, 'bandpass', f, 3, vel); }
  function rip(t, dur, vel) { for (let k = 0; k < dur * 60; k++) noiseHit(t + k / 60, 0.02, 'bandpass', 2500 + (k % 3) * 900, 2, vel * (0.6 + 0.4 * ((k * 7) % 5) / 5)); }
  function creak(t, dur, vel) { const o = osc('sawtooth', 180, t, t + dur); o.frequency.linearRampToValueAtTime(140, t + dur * 0.5); o.frequency.linearRampToValueAtTime(210, t + dur); const f = ac.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 8; const am = osc('square', 31, t, t + dur), ag = ac.createGain(); ag.gain.value = 0.5; am.connect(ag); const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vel, t + 0.08); g.gain.setValueAtTime(vel, t + dur - 0.1); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); ag.connect(g.gain); o.connect(f); f.connect(g); out(g, 0.2, 0.4); }
  function ding(t, vel) { [[1318.5, 1], [1046.5, 0.8]].forEach(([fq, k], i) => { const ti = t + i * 0.32; for (const m of [1, 2.76, 5.4]) { const o = osc('sine', fq * m, ti, ti + 2.5); const g = ac.createGain(); env(g, ti, 0.003, vel * k / (m * m * 0.6 + 0.4), 2.2 / m); o.connect(g); out(g, 0, 0.6); } }); }
  function staticNoise(t0, t1, vel) { const src = ac.createBufferSource(); src.buffer = noise; src.loop = true; const f = ac.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2200; f.Q.value = 0.6; const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); for (let t = t0; t < t1; t += 0.06) g.gain.setValueAtTime(vel * (0.4 + 0.6 * (hash(Math.round(t * 100)) % 100) / 100), t); g.gain.setValueAtTime(0.0001, t1); src.connect(f); f.connect(g); out(g, -0.2, 0.1); src.start(t0); src.stop(t1 + 0.05); }
  function hum(t0, t1, vel) { for (const [fq, k] of [[50, 1], [100, 0.5], [150, 0.25]]) { const o = osc('sine', fq, t0, t1 + 0.1); const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel * k, t0 + 0.3); g.gain.setValueAtTime(vel * k, t1 - 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t1); o.connect(g); out(g); } }
  function room(t0, t1, vel) { const src = ac.createBufferSource(); src.buffer = noise; src.loop = true; const f = ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 500; const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t0 + 0.5); g.gain.setValueAtTime(vel, t1 - 0.1); g.gain.exponentialRampToValueAtTime(0.0001, t1); src.connect(f); f.connect(g); out(g); src.start(t0, 0.3); src.stop(t1 + 0.05); }
  function powerDown(t) { const o = osc('sawtooth', 240, t, t + 1.4); o.frequency.exponentialRampToValueAtTime(25, t + 1.3); const f = ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(2000, t); f.frequency.exponentialRampToValueAtTime(120, t + 1.3); const g = ac.createGain(); env(g, t, 0.01, 0.5, 1.35); o.connect(f); f.connect(g); out(g, 0, 0.4); clank(t, 0.4); }
  function powerUp(t) { const o = osc('sawtooth', 40, t, t + 0.8); o.frequency.exponentialRampToValueAtTime(220, t + 0.7); const f = ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1200; const g = ac.createGain(); env(g, t, 0.3, 0.3, 0.6); o.connect(f); f.connect(g); out(g); clank(t + 0.7, 0.5); }
  function steps(t0, t1, every, vel, f = 300) { for (let t = t0, k = 0; t < t1; t += every, k++) thud(t, vel * (k % 2 ? 0.8 : 1), f); }
  function siren(t0, t1, vel) { const o = osc('sine', 650, t0, t1); for (let t = t0; t < t1; t += 1.2) { o.frequency.linearRampToValueAtTime(900, t + 0.6); o.frequency.linearRampToValueAtTime(650, t + 1.2); } const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vel, t0 + 0.4); g.gain.exponentialRampToValueAtTime(0.0001, t1); o.connect(g); out(g, -0.5, 0.8); }
  function rotor(t0, t1, vel) { for (let t = t0; t < t1; t += 1 / 11) noiseHit(t, 0.06, 'lowpass', 300, 1, vel * Math.min(1, (t - t0) / 0.8) * Math.min(1, (t1 - t) / 0.5)); }

  // =====================================================================
  //  MUSIC BED ('m'): a low D-minor drone that thickens with the story; drops out for the blackout
  // =====================================================================
  to = 'm';
  const T42 = A('l42'), T45 = A('l45');
  drone(0, T42, nz('D2'), 0.05, { att: 0.05, rel: 0.2 });
  pad(0.0, 8.0, ['D3', 'A3', 'F3'], 0.035, { cut: 700, att: 0.05 });
  pad(8.0, 22.0, ['D3', 'F3', 'A3'], 0.03, { cut: 550, att: 1.0 });
  pad(22.0, A('l29:stumm'), ['D3', 'F3', 'Gs3'.replace('Gs3', 'A3'), 'C4'], 0.045, { cut: 900, att: 0.5, rel: 0.05 });
  pad(A('l29:stumm') + 0.6, T42, ['D3', 'F3', 'A3'], 0.03, { cut: 600, att: 1.2, rel: 0.1 });
  for (let t = 22.0; t < A('l29:stumm'); t += E8 * 2) bass(t, nz('D2'), 0.16);   // a pulse under the racing heart
  pad(T45, A('l56'), ['D3', 'F3', 'A3', 'D4'], 0.04, { cut: 800, att: 0.3 });
  drone(T45, DURATION - 0.5, nz('D2'), 0.05, { att: 0.3, rel: 1.5 });
  pad(A('l56'), A('l62'), ['D3', 'G3', 'A3', 'C4'], 0.05, { cut: 1200, att: 0.2 });
  for (let t = A('l58'); t < A('l62'); t += E8) bass(t, nz(Math.floor((t - A('l58')) / E8) % 4 === 3 ? 'F2' : 'D2'), 0.2);   // the chase: 8ths
  pad(A('l62'), A('l67'), ['D3', 'F3', 'A3'], 0.035, { cut: 650, att: 0.4 });
  pad(A('l67'), A('l70'), ['F3', 'A3', 'C4', 'E4'], 0.04, { cut: 1600, att: 0.6 });   // up there: a little light
  pad(A('l70'), DURATION - 0.3, ['D3', 'A3', 'D4', 'F4'], 0.04, { cut: 1000, att: 0.3, rel: 1.2 });

  // =====================================================================
  //  SOUND EFFECTS ('s')
  // =====================================================================
  to = 's';
  // ---- every cut: a whoosh sized by the camera; impacts on the shake shots
  SHOT_LIST.forEach(([t0, sc, cam], i) => {
    if (i === 0) return;
    if (cam === 'fin') { whoosh(t0 - 0.22, 0.42, 0.35, 400, 5200, 0.3); click(t0, 0.15, 6000); }
    else if (cam === 'fout') whoosh(t0 - 0.05, 0.5, 0.3, 4500, 300, -0.3);
    else if (cam === 'shake') { whoosh(t0 - 0.2, 0.3, 0.3, 300, 3000); hit(t0, 0.55); }
    else whoosh(t0 - 0.15, 0.55, 0.12, 250, 1800, i % 2 ? 0.4 : -0.4);
  });
  // ---- the hook: an impact on frame 0, the code-blue pager, a riser into the title, a hit on the warning
  boom(0.0, 0.9); hit(0.0, 0.7);
  for (let t = 0.05; t < 2.3; t += 0.75) { beep(t, 698, 0.18, 0.12); beep(t + 0.22, 880, 0.28, 0.12); }
  groan(1.0, 1.4, 0.10, 78);
  tense(0.9, A('l03'), 0.08); boom(A('l03'), 0.6); whoosh(A('l03') - 0.1, 0.5, 0.3, 500, 4000);
  heart(A('l03:während'), 0.5); heart(A('l03:während') + 0.75, 0.5);
  swell(VW('l04', 'Herzmonitor'), 1.2, 0.25); hit(VW('l04', 'Herzmonitor'), 0.6); beep(VW('l04', 'Herzmonitor') + 0.05, 1000, 0.1, 0.15);
  boom(A('l05'), 0.7, 2.8); swell(A('l05'), 0.7, 0.2);
  // ---- Leipzig: wind, a distant siren
  room(A('l05'), A('l07'), 0.03); siren(A('l05') + 0.2, A('l07') + 0.3, 0.025);
  // ---- the room: a slow monitor beep, a quiet hum
  hum(A('l07'), T42, 0.012); room(A('l07'), T42, 0.012);
  for (let t = A('l07') + 0.2; t < A('l11'); t += 60 / 88) beep(t, 1000, 0.07, 0.04, 0.4);
  for (let t = A('l09'); t < A('l10'); t += 0.33) noiseHit(t, 0.06, 'bandpass', 900, 2, 0.05, -0.2);   // Keks panting
  for (let t = A('l10'); t < A('l11'); t += 1) click(t, 0.08, 3000);   // the clock
  // ---- the man in bed B
  groan(A('l11') + 0.4, 1.6, 0.06, 70, 0.3);
  hit(A('l12'), 0.6); beep(A('l12') + 0.02, 1000, 1.5, 0.1, 0.5);   // the flatline
  tense(A('l12') + 0.4, A('l13') + 0.1, 0.06);
  creak(A('l13') + 0.05, 0.5, 0.06); thud(A('l13') + 0.75, 0.45, 200); thud(A('l13') + 1.1, 0.4, 200); boom(A('l13') + 0.75, 0.35);
  swell(A('l14'), 0.8, 0.22);
  // ---- the racing heart: a thump and a monitor beep on every beat, at the pulse on screen
  for (let t = A('l14'); t < A('l18'); ) { const b = bpmAt(t); heart(t, 0.5); beep(t + 0.04, 1000, 0.08, 0.1, 0.3); t += 60 / b; }
  for (let t = A('l18'); t < A('l29:stumm'); ) { heart(t, 0.32); t += 60 / bpmAt(t); }
  groan(A('l15:bei'), 1.5, 0.12, 90, 0.4);
  tense(A('l16'), A('l17') + 0.25, 0.08);
  click(A('l17') + 0.25, 0.4, 2500); noiseHit(A('l17') + 0.25, 0.1, 'bandpass', 1200, 2, 0.3);   // the clip pops off
  // ---- the alarm: from the scream until Jana silences it (then a beat of near-silence)
  boom(A('l18'), 0.75); alarm(A('l18'), A('l29:stumm'), 0.16);
  alarm(A('l20') + 0.1, A('l21'), 0.05);   // the station's echo
  // ---- the hallway hears it
  for (let k = 0; k < 6; k++) groan(A('l21') + k * 0.35, 1.6, 0.07 + k * 0.01, 70 + k * 9, (k % 3 - 1) * 0.6);
  steps(A('l21:hat'), A('l23'), 0.42, 0.18, 220);
  tense(A('l22') - 0.4, A('l23'), 0.1);
  hit(A('l23'), 0.8); clank(A('l23'), 0.5); steps(A('l23') + 0.1, A('l24'), 0.18, 0.25, 300);   // the door slams open, Jana runs in
  creak(A('l26') + 0.4, 1.0, 0.05); clank(A('l27') + 0.12, 0.8);   // the bed, the brake
  whoosh(A('l28') - 0.05, 0.35, 0.3, 2000, 6000); thud(A('l28') + 0.05, 0.3, 1200);   // the rule card slaps on
  click(A('l29:stumm'), 0.5, 3000); boom(A('l29:stumm'), 0.35, 1.5);
  rip(A('l30') + 0.08, 0.12, 0.25); rip(A('l30') + 0.23, 0.12, 0.25); rip(A('l30') + 0.38, 0.12, 0.25);   // the leads come off
  beep(VW('l31', 'niemals'), 220, 0.35, 0.12); beep(VW('l31', 'niemals') + 0.4, 220, 0.35, 0.12);   // the warning buzz
  for (let k = 0; k < 5; k++) click(A('l32') + 0.05 + k * 0.08, 0.3, 3500);   // clamp: the roller clicks
  rip(A('l33') + 0.05, 0.4, 0.2);                                        // tape
  whoosh(A('l34') + 0.05, 0.4, 0.12, 2000, 600); noiseHit(A('l34') + 0.2, 0.15, 'bandpass', 700, 3, 0.12);   // slide out
  thud(A('l35') + 0.08, 0.35, 500);                                      // press
  // ---- the door handle moves
  tense(A('l36'), A('l37'), 0.06); creak(A('l36') + 0.4, 0.8, 0.12); clank(A('l36') + 1.1, 0.25);
  click(A('l37') + 0.2, 0.3, 2000); click(A('l37') + 0.35, 0.3, 2000);
  groan(A('l38'), 1.5, 0.08, 80, -0.3);
  swell(A('l39'), 1.2, 0.3); boom(A('l39'), 0.8); thud(A('l39') + 0.02, 0.6, 1500);   // the face hits the glass
  for (let t = A('l40'); t < T42; t += 1) click(t, 0.12, 3000);
  // ---- the blackout: the power dies, nothing but the heart and the seconds
  powerDown(T42 + 0.15);
  for (let t = T42 + 0.5; t < T45; t += 0.85) heart(t, 0.45);
  for (let t = T42 + 1.25; t < T45; t += 1) click(t, 0.18, 2200);
  groan(A('l44') + 0.3, 2.2, 0.05, 65, 0.6);
  // ---- the generator kicks in and the whole floor is at the door
  powerUp(T45 - 0.5); boom(T45, 0.95, 3.0); hum(T45, A('l56'), 0.01);
  for (let k = 0; k < 10; k++) thud(T45 + 0.25 + k * 0.19 + (k % 3) * 0.04, 0.5, 700);   // banging on the door
  for (let k = 0; k < 6; k++) groan(T45 + 0.1 + k * 0.25, 1.8, 0.09, 70 + k * 7, (k % 2 ? 0.5 : -0.5));
  steps(A('l46') + 0.1, A('l48'), 0.16, 0.25, 300); clank(A('l47') + 0.2, 0.4);   // into the bathroom, the door shuts
  for (let k = 0; k < 6; k++) blip(A('l48') + 0.3 + k * 0.25, 1200 + k * 120, 1500 + k * 120, 0.06, 0.06);   // the plan draws
  noiseHit(A('l49') + 0.3, 0.5, 'highpass', 4000, 0.7, 0.05);   // "psst"
  blip(A('l51') + 0.5, 600, 300, 0.25, 0.12); blip(A('l51') + 0.8, 300, 900, 0.3, 0.12);   // the comic beat
  // ---- the elevator
  steps(A('l52'), A('l52:tausendmal'), 0.45, 0.12, 300);
  click(A('l52:tausendmal') + 0.35, 0.5, 2500); blip(A('l52:tausendmal') + 0.36, 880, 880, 0.12, 0.1);
  hit(A('l53'), 0.5); tense(A('l53'), A('l55'), 0.09);
  noiseHit(A('l54'), 1.3, 'lowpass', 200, 1, 0.12);   // the car rumbling up
  boom(A('l55'), 0.85); whoosh(A('l55'), 0.6, 0.25, 1800, 400);
  ding(A('l56') - 0.02, 0.35);   // "Pling"
  for (let k = 0; k < 8; k++) groan(A('l57') + k * 0.15, 1.6, 0.12, 75 + k * 6, (k % 3 - 1) * 0.7);
  hit(A('l58'), 0.8); thud(A('l58') + 0.1, 0.6, 400);
  thud(A('l59') + 0.25, 0.7, 250); creak(A('l59') + 0.3, 0.3, 0.06);   // into the chair
  // ---- the run: wheels rattling, feet, the chase
  for (let t = A('l60'); t < A('l62'); t += 0.07) noiseHit(t, 0.04, 'bandpass', 600 + (hash(Math.round(t * 100)) % 5) * 150, 2, 0.06);
  steps(A('l60'), A('l62'), 0.2, 0.22, 300);
  for (let k = 0; k < 4; k++) groan(A('l60') + k * 0.6, 1.4, 0.08, 80, 0.4);
  // ---- the radio, the stairwell
  click(A('l62') - 0.05, 0.4, 1800); beep(A('l62') - 0.02, 1500, 0.06, 0.08); staticNoise(A('l62'), A('l65'), 0.04);
  steps(A('l64'), A('l65'), 0.4, 0.18, 350);
  boom(A('l65'), 0.75, 3.0); for (let k = 0; k < 6; k++) groan(A('l65') + 0.2 + k * 0.2, 2.0, 0.07, 60 + k * 5, (k % 2 ? 0.6 : -0.6));
  swell(A('l67'), 0.8, 0.2); room(A('l67'), A('l70'), 0.04);   // wind from the roof
  rotor(A('l69'), A('l70') + 0.3, 0.12);
  // ---- the choice: a tick on A, a tick on B, a riser to the end card and the last boom
  hit(A('l70'), 0.5); beep(A('l70') + 0.02, 1320, 0.1, 0.1); hit(A('l72'), 0.5); beep(A('l72') + 0.02, 660, 0.1, 0.1);
  tense(A('l72') + 0.2, 107.45, 0.1); boom(107.45, 0.9, 2.4);
