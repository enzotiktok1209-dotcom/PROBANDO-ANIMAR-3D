// =====================================================================
//  shots-b.js — 0:44–1:44  Jonas invests, the drive-by, the value falls, the declined card, the race, the cliffhanger
// =====================================================================
const hudJonas = (keys, o = {}) => hud('DEPOT · JONAS', keys, { cents: true, ...o });

// ---- 28 · meanwhile (split): Kevin's costs up / Jonas' room
S(44.44, { tr: 'glitch', cam: [[44.44, 540, 960, 1.0]],
  draw() { ctx.fillStyle = rad(540, 480, 40, 700, [[0, '#7a1d2e'], [1, '#250d1e']]); ctx.fillRect(-600, -400, 2300, 1360);
    tText('AUSGABEN', 540, 230, 56, { color: '#ff9db0', shadow: false, letter: 8 }); tText(fmtEUR(12250 + EZ.i2(clamp((TT - 44.6) / 1.6)) * 8000), 540, 420, 120, { color: '#ff4a4a', stroke: '#2a0a10', strokeW: 18 });
    for (let i = 0; i < 3; i++) { const y = 560 + ((TT * 300 + i * 90) % 280); poly([[500, y + 50], [580, y + 50], [540, y]], 'rgba(255,74,74,0.7)'); }
    ctx.save(); ctx.beginPath(); ctx.rect(-100, 960, 1280, 1000); ctx.clip(); ctx.translate(0, 360); setLeoRoom({ blur: 3 }); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(-100, 960, 1280, 1000); ctx.clip(); char('jonas', 540, 1990, 0.75, { pose: [[0, 'holdR']], emo: [[0, 'calm']], look: [0, 0.6], holdR: () => bill(0, -30, 110, -0.2, 1) }); ctx.restore();
    line(-100, 960, 1180, 960, 14, '#fff'); },
  sfx: [[44.6, 'descend'], [45.6, 'swish', 0.7]] });
// ---- 29 · every month: 500 € into the depot
S(46.3, { tr: 'whipR', cam: [[46.3, 540, 1000, 1.0], [48.05, 540, 980, 1.08]],
  draw() { setLeoDesk({ blur: 10 }); bigArm('jonas', 1300, 1950, 700, 1300, 190);
    phone(560, 1000, 2.2, -0.04, () => { ctx.fillStyle = lin(0, -176, 0, 176, [[0, '#eafff2'], [1, '#c8f3d9']]); ctx.fillRect(-84, -176, 168, 352);
      tText('DEPOT', 0, -140, 22, { color: PAL.greenD, shadow: false }); tText('Sparplan', 0, -100, 14, { color: '#3a5a48', shadow: false, weight: 700 }); tText('500 € / Monat', 0, -60, 20, { color: '#1b1530', shadow: false });
      const ok = TT > 47.24; fillRR(-66, 90, 132, 46, 23, ok ? PAL.green : PAL.blue); tText(ok ? '✓ AKTIV' : 'INVESTIEREN', 0, 114, 14, { color: '#fff', shadow: false });
      if (ok) for (let i = 0; i < 4; i++) { const u = ((TT - 47.24) * 1.2 + i * 0.25) % 1; coin(-40 + i * 26, 60 - u * 120, 12, { sx: 1 }); } });
    if (TT > 47.0 && TT < 47.4) circ(600, 1290, 30, 'rgba(255,255,255,0.5)'); },
  sfx: [[47.24, 'phoneTap'], [47.3, 'notify'], [47.5, 'coin', 1.3]] });
// ---- 30 · totally boring (Jonas sips tea)
S(48.05, { tr: 'cut', cam: [[48.05, 540, 1150, 1.15], [49.1, 540, 1130, 1.2]],
  draw() { setLeoRoom(); char('jonas', 540, FLOOR + 30, 0.95, { pose: [[0, 'drinkR']], emo: [[0, 'calm']], look: [0, -0.3], holdR: () => mug(0, -10, 0.6) }); },
  ui() { popText('GÄHN…', 820, 560, 48.4, 60, '#ffffff', 0.08, 15); },
  sfx: [[48.2, 'slurp', 0.6], [48.4, 'popHi', 0.8]] });
// ---- 31 · totally automatic (the months tick by, ✓ ✓ ✓)
S(49.1, { tr: 'slide', cam: [[49.1, 540, 960, 1.0], [50.4, 540, 960, 1.05]],
  draw() { rays('#0c7a3e', '#11954c', { cy: 900 }); const n = Math.floor(clamp((TT - 49.15) / 1.1) * 12) + 1;
    for (let i = 0; i < 12; i++) { const x = 230 + (i % 3) * 310, y = 520 + Math.floor(i / 3) * 230; fillRR(x - 120, y - 80, 240, 160, 20, i < n ? '#ffffff' : 'rgba(255,255,255,0.25)'); tText(['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ'][i], x, y - 30, 34, { color: '#1b1530', shadow: false }); if (i < n) tText('✓ 500 €', x, y + 30, 34, { color: PAL.green, shadow: false }); } },
  sfx: [[49.15, 'tickRun', 1.1]] });
// ---- 32 · "Boring makes you rich."
S(50.4, { tr: 'zoomIn', cam: [[50.4, 540, 1000, 1.75], [51.95, 540, 980, 1.9]],
  draw() { setLeoRoom({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], look: [0.2, 0], extras: { glasses: TT > 50.6 } }); if (TT > 50.6 && TT < 50.9) sparkle(450, 950, 40, '#fff', TT * 4); },
  ui() { sticker('LANGWEILIG = REICH', 540, 420, 51.3, { bg: PAL.green, size: 54 }); },
  sfx: [[50.6, 'ting'], [51.3, 'pop', 1]] });
// ---- 33-34 · year 1, year 3
function depotSet(y, t0) { rays('#0c7a3e', '#11954c', { cy: 1000 }); const v = depV(y), n = Math.max(1, Math.round(v / 1000));
  for (let i = 0; i < Math.min(n, 24); i++) { const t = t0 + i * 0.03, yy = TT - t < 0.4 ? bounceY(TT - t, 600, 1420 - Math.floor(i / 6) * 70, 5200, 0.3) : 1420 - Math.floor(i / 6) * 70; if (TT > t) bill(330 + (i % 6) * 84, yy, 200, 0, 1); } }
S(51.95, { tr: 'flash', cam: [[51.95, 540, 960, 1.0], [53.95, 540, 960, 1.05]],
  draw() { depotSet(1, 52.1); }, ui() { tText('JAHR 1', 540, 470, 120, { color: '#fff', stroke: '#063d1e', strokeW: 22 }); hudJonas([[0, 0], [52.82, depV(1)]], { y: 760, scale: 1.1 }); },
  sfx: [[52.1, 'moneyRain', 0.6], [52.82, 'cashReg']] });
S(53.95, { tr: 'cut', cam: [[53.95, 540, 960, 1.05], [55.7, 540, 960, 0.95]],
  draw() { depotSet(3, 54.05); }, ui() { tText('JAHR 3', 540, 470, 120, { color: '#fff', stroke: '#063d1e', strokeW: 22 }); hudJonas([[0, depV(1)], [54.74, depV(3)]], { y: 760, scale: 1.1 }); },
  sfx: [[54.05, 'moneyRain', 0.8], [54.74, 'cashReg']] });
// ---- 35 · Kevin pulls up: roof down, music loud
S(55.7, { tr: 'whipL', cam: [[55.7, 540, 1250, 1.0], [57.35, 540, 1230, 1.08]],
  draw() { setNightStreet({ scroll: TT * 600 }); const x = lerp(-500, 560, EZ.o3(clamp((TT - 55.75) / 1.2)));
    char('kevin', x - 60, 1560, 0.75, { pose: [[0, 'waveR']], emo: [[0, 'grin']], extras: { chain: 1, shades: 1 } }); supercar(x, 1690, 0.9, { roof: 0, wheelSpin: x / 90 }); musicNotes(x, 1200, 'n35'); },
  sfx: [[55.75, 'engine'], [56.8, 'skid']] });
// ---- 36 · close-up: head bobbing to the bass
S(57.35, { tr: 'cut', cam: [[57.35, 540, 1080, 1.6], [59.2, 540, 1060, 1.7]],
  draw() { setNightStreet({ blur: 9 }); char('kevin', 540, FLOOR + 140, 1.0, { pose: [[0, 'pointUpR']], emo: [[0, 'grin']], extras: { chain: 1, shades: 1 }, tilt: [[57.35, 0], [57.6, 0.1, 0.12], [57.9, -0.1, 0.12], [58.2, 0.1, 0.12], [58.5, -0.1, 0.12], [58.8, 0.05, 0.12]] }); supercar(540, 1900, 1.2, { roof: 0 }); musicNotes(540, 900, 'n36'); },
  sfx: [[57.4, 'carMusic', 1.8]] });
// ---- 37 · "So? Still no car?"
S(59.2, { tr: 'whipR', cam: [[59.2, 560, 1180, 1.1], [61.0, 560, 1160, 1.18]],
  draw() { setNightStreet(); char('jonas', 860, FLOOR + 20, 0.85, { pose: [[0, 'idle']], emo: [[0, 'calm']], look: [-0.6, 0] });
    char('kevin', 300, 1560, 0.75, { pose: [[59.2, 'pointR']], emo: [[0, 'smug']], look: [0.7, 0], extras: { chain: 1, shades: 1 } }); supercar(360, 1690, 0.9, { roof: 0 }); },
  sfx: [[59.3, 'swish', 0.9]] });
// ---- 38 · "Sure. I'm just waiting until yours gets cheaper."
S(61.0, { tr: 'zoomIn', cam: [[61.0, 540, 1000, 1.75], [63.4, 540, 980, 1.9]],
  draw() { setNightStreet({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[61.0, 'calm'], [62.4, 'smug']], look: [-0.3, 0], extras: { glasses: true } }); },
  ui() { sticker('GEDULD', 540, 420, 62.5, { bg: PAL.blue, size: 60 }); },
  sfx: [[62.5, 'pop', 1], [62.55, 'ting']] });
// ---- 39-40 · "My Lambo? Cheaper? NEVER!"
S(63.4, { tr: 'whipL', cam: [[63.4, 540, 1050, 1.5], [65.8, 540, 1030, 1.6]],
  draw() { setNightStreet({ blur: 8 }); char('kevin', 540, FLOOR + 150, 1.0, { pose: [[63.4, 'laughBelly'], [64.8, 'hips']], emo: [[63.4, 'laugh'], [64.9, 'smug']], extras: { chain: 1, shades: 1 }, lean: [[63.4, -0.06], [63.7, 0.05, 0.2], [64.0, -0.04, 0.2]] }); },
  ui() { popText('HA', 240, 560, 63.6, 64, PAL.yellow, -0.2); popText('HA', 840, 500, 63.9, 64, PAL.yellow, 0.2); },
  sfx: [[63.6, 'popHi', 1], [63.9, 'popHi', 1.2]] });
S(65.8, { tr: 'zoomIn', cam: [[65.8, 540, 900, 2.6], [66.75, 540, 900, 2.7]], punch: [[65.94, 0.14]], shake: [[65.94, 16, 0.4]],
  draw() { setNightStreet({ blur: 12 }); char('kevin', 540, FLOOR + 150, 1.0, { pose: [[0, 'pointR']], emo: [[0, 'angry']], extras: { chain: 1, shades: 0 } }); },
  ui() { sticker('NIEMALS!', 540, 420, 65.95, { bg: PAL.red, size: 80, rot: -0.08 }); },
  sfx: [[65.95, 'punch'], [66.0, 'pop', 0.8]] });
// ---- 41 · BUT that is exactly what happens — every year (the chart)
S(66.75, { tr: 'spin', cam: [[66.75, 540, 960, 1.0], [69.3, 540, 960, 1.05]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#090a2a'], [1, '#2b1a6a']]); ctx.fillRect(-600, -400, 2300, 2800); depotChart(120, 560, 840, 640, clamp((TT - 66.9) / 2.3) * 0.8); },
  ui() { tText('LAMBO', 260, 420, 52, { color: PAL.yellow, stroke: '#1b1530', strokeW: 12 }); tText('JONAS', 820, 420, 52, { color: '#45f08f', stroke: '#1b1530', strokeW: 12 }); sticker('JEDES JAHR', 540, 1500, 68.5, { bg: '#141026', size: 56 }); },
  sfx: [[66.9, 'riserShort', 2.2], [68.5, 'pop', 1]] });
// ---- 42 · because the car loses value (the price tag melts)
S(69.3, { tr: 'whipL', cam: [[69.3, 540, 1150, 1.0], [71.2, 540, 1120, 1.12]],
  draw() { setShowroom({ blur: 4 }); supercar(540, 1600, 0.95, { dirt: clamp((TT - 69.5) / 1.5) }); const y = clamp((TT - 69.4) / 1.6) * 5; priceTag(540, 860, 0.95, fmtEUR(carV(y)), -0.08 + y * 0.03); },
  ui() { popText('−15 % / JAHR', 540, 420, 70.4, 64, '#ff5a5a', 0, 10); },
  sfx: [[69.4, 'descend'], [70.4, 'pop', 0.8]] });
// ---- 43 · while Jonas' money grows (a money tree)
S(71.2, { tr: 'whipR', cam: [[71.2, 540, 1100, 1.0], [73.0, 540, 1060, 1.1]],
  draw() { setLeoRoom({ blur: 5 }); const g = EZ.o3(clamp((TT - 71.25) / 1.5));
    fillRR(470, 1300, 140, 160, 20, '#d9643a'); line(540, 1300, 540, 1300 - 520 * g, 40 * (0.5 + g * 0.5), '#7a4a2a');
    const R = RNG('tree'); for (let i = 0; i < 18; i++) { const k = clamp(g * 1.4 - i / 30); if (k <= 0) continue; const a = R.f() * TAU, r = R.f() * 300 * g; ell(540 + Math.cos(a) * r, 800 - 200 * g + Math.sin(a) * r * 0.6, 70 * k, 50 * k, i % 2 ? '#3fbf6a' : '#2f9e57'); }
    if (g > 0.6) for (let i = 0; i < 8; i++) bill(540 + Math.cos(i) * 230 * g, 820 + Math.sin(i * 1.7) * 140, 90, Math.sin(TT * 3 + i) * 0.4, 1); },
  ui() { hudJonas([[0, depV(3)], [71.3, depV(5)]], { scale: 0.85, y: 220 }); },
  sfx: [[71.25, 'grow'], [72.2, 'sparkle']] });
// ---- 44 · 5 years later, at the petrol station
S(73.0, { tr: 'zoomOut', cam: [[73.0, 540, 1150, 1.0], [75.5, 560, 1120, 1.1]],
  draw() { setGasStation(); supercar(380, 1640, 0.85, { dirt: 1 }); fuelPump(840, FLOOR, 0.9, { disp: fmtEUR(Math.min(180, Math.max(0, TT - 73.5) * 120), true) });
    char('kevin', 640, FLOOR + 30, 0.82, { pose: [[0, 'holdR']], emo: [[0, 'neutral']], look: [0.6, 0], extras: { chain: 1 } }); },
  ui() { sticker('5 JAHRE SPÄTER', 540, 420, 73.1, { bg: '#141026', size: 58 }); },
  sfx: [[73.1, 'pop', 1], [73.5, 'pump', 1.6]] });
// ---- 45 · the card: DECLINED
S(75.5, { tr: 'cut', cam: [[75.5, 540, 960, 1.0], [77.5, 540, 960, 1.12]], shake: [[76.62, 14, 0.4]],
  draw() { setGasStation({ blur: 10 }); cardTerminal(540, 980, 1.5, TT < 75.9 ? 'idle' : TT < 76.62 ? 'wait' : 'no');
    const ins = EZ.o2(clamp((TT - 75.55) / 0.3)); creditCard(540, lerp(1700, 1420, ins), 1.1, 0); },
  sfx: [[75.6, 'cardIn'], [75.9, 'beep', 1], [76.2, 'beep', 1], [76.62, 'declined']] });
// ---- 46 · "Declined?! I drive a Lambo!"
S(77.5, { tr: 'zoomIn', cam: [[77.5, 540, 1000, 1.65], [79.45, 540, 980, 1.8]], punch: [[78.64, 0.15]], shake: [[77.55, 20, 0.45]],
  draw() { setGasStation({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.03, { pose: [[77.5, 'headGrab'], [78.3, 'pointR']], emo: [[77.5, 'shock'], [78.3, 'angry']], extras: { chain: 1, sweat: 1 } }); },
  sfx: [[77.55, 'shockHit'], [78.64, 'zoomIn']] });
// ---- 47 · Kevin pushes his Lamborghini home
S(79.45, { tr: 'whipL', cam: [[79.45, 540, 1250, 1.0], [82.3, 600, 1230, 1.06]],
  draw() { setNightStreet({ scroll: TT * 60 }); const x = 380 + (TT - 79.45) * 40;
    supercar(x + 230, 1690, 0.85, { dirt: 1, wheelSpin: TT * 0.6 }); char('kevin', x - 280, 1700, 0.8, { pose: [[0, { la: [-1.2, -0.3], ra: [1.35, -0.35] }]], emo: [[0, 'scared']], look: [0.8, 0], extras: { chain: 1, sweat: 1 }, lean: 0.32, walk: 0.45, flip: false }); },
  ui() { popText('ÄCHZ…', 260, 560, 80.3, 60, '#ffffff', -0.08, 10); },
  sfx: [[79.5, 'strain', 2.6], [80.3, 'popHi', 0.7]] });
// ---- 48 · ...and Jonas rides past on his bike
S(82.3, { tr: 'whipR', cam: [[82.3, 540, 1250, 1.0], [84.25, 540, 1230, 1.06]],
  draw() { setNightStreet(); supercar(560, 1690, 0.85, { dirt: 1 }); char('kevin', 180, 1700, 0.8, { pose: [[0, { la: [-1.2, -0.3], ra: [1.35, -0.35] }]], emo: [[0, 'scared']], look: [0.8, 0], extras: { chain: 1, sweat: 1 }, lean: 0.32 });
    const bx = lerp(-300, 760, EZ.o2(clamp((TT - 82.35) / 1.8))); char('jonas', bx + 10, 1620, 0.7, { pose: [[0, { la: [-0.9, -0.3], ra: [0.9, 0.3] }]], emo: [[0, 'happy']], look: [0.3, 0], walk: 0.6 }); bicycle(bx, 1700, 0.75, TT * 8); },
  sfx: [[82.4, 'bikeRoll', 1.8], [82.9, 'bikeBell']] });
// ---- 49 · "Need a hand pushing, star?"
S(84.25, { tr: 'zoomIn', cam: [[84.25, 540, 1050, 1.6], [86.05, 540, 1030, 1.7]],
  draw() { setNightStreet({ blur: 9 }); char('jonas', 540, FLOOR + 150, 1.0, { pose: [[0, 'waveR']], emo: [[0, 'smug']], look: [-0.4, 0], extras: { glasses: true } }); },
  ui() { sticker('AUTSCH!', 540, 420, 85.4, { bg: PAL.red, size: 74, rot: -0.08 }); },
  sfx: [[84.3, 'bikeBell'], [85.4, 'punch'], [85.45, 'pop', 0.8]] });
// ---- 50-52 · the race: year 6, 7, 8 (split: Lambo value up top, Jonas' depot below)
function raceSplit(o = {}) {
  ctx.save(); ctx.beginPath(); ctx.rect(-200, -400, 1480, 1360); ctx.clip(); rays('#7a5a00', '#a77d00', { cy: 560, spin: 0.08 });
  supercar(700, 930, 0.62, { dirt: o.dirt ?? 0.6 }); char('kevin', 230, 1180, 0.82, { pose: [[0, o.kPose ?? 'idle']], emo: [[0, o.kEmo ?? 'neutral']], look: [0.6, 0], extras: { chain: 1, sweat: o.sweat } }); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-200, 960, 1480, 1300); ctx.clip(); rays('#0c7a3e', '#11954c', { cy: 1440, spin: -0.08 });
  char('jonas', 230, 1990, 0.82, { pose: [[0, 'armsCross']], emo: [[0, o.jEmo ?? 'calm']], look: [0.5, 0], extras: { glasses: true } }); ctx.restore();
  line(-200, 960, 1280, 960, 16, '#ffffff');
}
function raceUI(year, t0, prevYear) {
  hud('WERT · LAMBO', [[0, carV(prevYear)], [t0, carV(year)]], { x: 700, y: 330, scale: 0.92, color: PAL.yellow });
  hud('DEPOT · JONAS', [[0, depV(prevYear)], [t0, depV(year)]], { x: 700, y: 1250, scale: 0.92 });
  const k = springEase(TT - t0, 320, 14); ctx.save(); ctx.translate(540, 960); ctx.scale(k, k); fillRR(-170, -62, 340, 124, 30, PAL.red); tText('JAHR ' + year, 0, 2, 70, { color: '#fff', shadow: false }); ctx.restore();
}
S(86.05, { tr: 'flash', capY: 1790, draw() { raceSplit({}); }, ui() { raceUI(6, 86.12, 5); }, sfx: [[86.12, 'tick'], [86.15, 'pop', 1]] });
S(86.9, { tr: 'whipL', capY: 1790, draw() { raceSplit({ dirt: 0.8, kEmo: 'confused' }); }, ui() { raceUI(7, 86.92, 6); }, sfx: [[86.95, 'pop', 1.1]] });
S(87.72, { tr: 'zoomIn', capY: 1790, cam: [[87.72, 540, 960, 1.0], [89.4, 540, 960, 1.05]], draw() { raceSplit({ dirt: 1, kEmo: 'scared', kPose: 'headGrab', sweat: 1, jEmo: 'smug' }); }, ui() { raceUI(8, 87.76, 7); },
  sfx: [[87.76, 'heartbeat', 1.6], [87.8, 'pop', 1.2]] });
// ---- 53 · the Lambo is still worth 68.000 € ... Jonas has 64.000
S(89.4, { tr: 'cut', cam: [[89.4, 540, 1150, 1.0], [91.45, 540, 1120, 1.08]],
  draw() { setShowroom({ blur: 4 }); supercar(540, 1600, 0.95, { dirt: 1 }); priceTag(540, 860, 1.0, '68.123 €', -0.06, PAL.yellow); },
  sfx: [[89.58, 'cashReg'], [90.4, 'heartbeat', 1.0]] });
S(91.45, { tr: 'whipR', cam: [[91.45, 540, 960, 1.0], [93.5, 540, 960, 1.08]],
  draw() { depotSet(8, 91.5); }, ui() { tText('JONAS', 540, 470, 90, { color: '#fff', stroke: '#063d1e', strokeW: 18 }); hudJonas([[0, depV(7)], [92.26, depV(8)]], { y: 760, scale: 1.1 }); },
  sfx: [[91.5, 'moneyRain', 0.8], [92.26, 'cashReg']] });
// ---- 54 · the difference: 4.000 €
S(93.5, { tr: 'cut', capY: 1600, cam: [[93.5, 540, 960, 1.0], [95.6, 540, 960, 1.08]],
  draw() { setDark('#2a1640', '#05030c');
    tText('LAMBO', 540, 470, 56, { color: PAL.yellow, shadow: false, letter: 10 }); tText('68.123 €', 540, 590, 120, { color: '#fff', stroke: '#0a0718', strokeW: 16 });
    tText('JONAS', 540, 1130, 56, { color: '#7ff0a8', shadow: false, letter: 10 }); tText('64.093 €', 540, 1250, 120, { color: '#41f08a', stroke: '#0a0718', strokeW: 16 });
    const on = TT > 94.46 && Math.floor(TT * 6) % 2 === 0; ctx.save(); ctx.translate(540, 910); ctx.scale(on ? 1.06 : 1, on ? 1.06 : 1);
    fillRR(-320, -66, 640, 132, 34, TT > 94.46 ? PAL.yellow : '#2a2440'); tText(TT > 94.46 ? 'DIFFERENZ: ≈ 4.000 €' : 'DIFFERENZ: …', 0, 2, 52, { color: TT > 94.46 ? '#1b1530' : '#8f87b8', shadow: false }); ctx.restore();
    if (TT > 94.46) glow(540, 910, 420, '#ffd23f', 0.35); },
  sfx: [[93.55, 'heartbeat', 0.8], [94.46, 'impact'], [94.5, 'pop', 1]] });
// ---- 55 · ...exactly the price of the tyres (callback)
S(95.6, { tr: 'flash', cam: [[95.6, 540, 1000, 1.0], [97.4, 540, 1000, 1.1]],
  draw() { ctx.fillStyle = rad(540, 1000, 50, 900, [[0, '#5a5f6e'], [1, '#1b1d26']]); ctx.fillRect(-600, -400, 2300, 2800); glow(540, 1000, 500, '#ffe9a6', 0.4);
    for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(320 + (i % 2) * 440, 820 + Math.floor(i / 2) * 400); ctx.rotate(TT * 0.6 + i); ell(0, 0, 150, 150, '#15151d'); ell(0, 0, 96, 96, '#d9a514'); ell(0, 0, 32, 32, '#15151d'); ctx.restore(); } },
  ui() { sticker('= 4.000 € REIFEN', 540, 420, 95.7, { bg: PAL.gold, fg: '#1b1530', size: 60 }); },
  sfx: [[95.7, 'pop', 1], [96.8, 'ting']] });
// ---- 56 · and now Kevin wants to sell
S(97.4, { tr: 'whipR', cam: [[97.4, 540, 1180, 1.05], [99.1, 560, 1150, 1.15]],
  draw() { setNightStreet(); supercar(600, 1690, 0.9, { dirt: 1 }); char('kevin', 230, FLOOR + 40, 0.88, { pose: [[0, 'holdBoth']], emo: [[0, 'sad']], look: [0.6, 0], extras: { chain: 1 }, holdR: () => {}, holdL: () => {} });
    const k = springEase(TT - 98.3, 260, 14); if (k > 0) { ctx.save(); ctx.translate(620, 1430); ctx.scale(k * 0.8, k * 0.8); saleSign(0, 0, 1, '68.000 €'); ctx.restore(); } },
  sfx: [[98.3, 'stamp'], [98.35, 'pop', 1]] });
// ---- 57 · guess who wants to buy (glasses glint in the dark)
S(99.1, { tr: 'zoomIn', cam: [[99.1, 540, 1000, 1.7], [100.9, 540, 980, 1.95]],
  draw() { setDark('#141026', '#020106'); ctx.save(); ctx.globalAlpha = 0.35 + 0.65 * clamp((TT - 99.4) / 1.2); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], extras: { glasses: true } }); ctx.restore();
    if (TT > 99.9 && TT < 100.4) { sparkle(500, 1010, 50, '#fff', TT * 5); sparkle(580, 1010, 50, '#fff', TT * 5); } },
  ui() { vignette(0.7); },
  sfx: [[99.2, 'tension', 1.6], [99.95, 'ting']] });
// ---- 58 · to be continued
S(100.9, { tr: 'zoomOut', noCap: true, cam: [[100.9, 540, 960, 1.0], [104, 540, 960, 1.05]],
  draw() { setNightStreet({ blur: 18 }); ctx.fillStyle = 'rgba(10,6,24,0.62)'; ctx.fillRect(-600, -400, 2300, 2800); },
  ui() { const k = springEase(TT - 101.0, 220, 15); ctx.save(); ctx.translate(540, 780); ctx.scale(k, k); tText('WIRD', 0, -70, 110, { color: '#fff', stroke: '#140c22', strokeW: 18 }); tText('FORTGESETZT…', 0, 60, 110, { color: '#fff', stroke: '#140c22', strokeW: 18, maxW: 980 }); ctx.restore();
    sticker('JAHR 9: WER KAUFT DEN LAMBO?', 540, 1010, 101.5, { bg: PAL.yellow, fg: '#1b1530', size: 50 });
    if (TT > 102.2) { const p = 1 + 0.05 * Math.sin(TT * 8); ctx.save(); ctx.translate(540, 1160); ctx.scale(p, p); sticker('ZU TEIL 2 >>', 0, 0, 102.2, { bg: PAL.red, size: 50 }); ctx.restore(); } },
  sfx: [[100.95, 'impact'], [101.0, 'riser', 1.8], [101.5, 'pop', 1], [102.2, 'pop', 1.2]] });
