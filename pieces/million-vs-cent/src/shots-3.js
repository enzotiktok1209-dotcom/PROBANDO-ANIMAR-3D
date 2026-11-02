// =====================================================================
//  shots-3.js — 1:10.9–1:49  the cent accelerates, the paper plane, "your impatience", the race, cliffhanger
// =====================================================================

// ---- 43 · 5 days later: the calendar flips 5 -> 10
S(70.9, { tr: 'spin', cam: [[70.9, 540, 960, 1.0], [73.1, 540, 940, 1.08]],
  draw() { rays('#d4520a', '#ff7a12', { cy: 900, spin: 0.15 });
    const flips = [71.25, 71.55, 71.85, 72.15, 72.45], n = flips.filter((t) => TT >= t + 0.16).length, cur = flips.findIndex((t) => TT >= t && TT < t + 0.16);
    calendarPage(540, 960, 1.15, 'TAG', 5 + n, cur >= 0 ? (TT - flips[cur]) / 0.16 : 0); },
  ui() { sticker('5 TAGE SPÄTER', 540, 400, 71.0, { bg: '#141026', size: 58 }); },
  sfx: [[71.0, 'pop', 1], [71.25, 'flip'], [71.55, 'flip', 1.1], [71.85, 'flip', 1.2], [72.15, 'flip', 1.3], [72.45, 'flip', 1.4], [72.75, 'dun']] });

// ---- 44 · the cent hits the gas (rocket coin + exponential curve)
S(73.1, { tr: 'whipU', cam: [[73.1, 540, 960, 1.0], [75.55, 540, 960, 1.1]], shake: [[74.7, 12, 0.8]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#090a2a'], [1, '#2b1a6a']]); ctx.fillRect(-600, -400, 2300, 2800);
    const R = RNG('stars'); for (let i = 0; i < 80; i++) { const x = R.f() * 1080, y = (R.f() * 1920 + TT * (300 + R.f() * 500)) % 1920; line(x, y, x, y + 30 + R.f() * 50, 3, 'rgba(255,255,255,0.5)'); }
    growthGraph(120, 520, 840, 760, clamp((TT - 73.2) / 2.1), PAL.green);
    const k = clamp((TT - 73.2) / 2.1), v = (2 ** (k * 9) - 1) / 511, cx = 120 + k * 840, cy = 520 + 760 - v * 760;
    ctx.save(); ctx.translate(cx, cy - 40); ctx.rotate(-0.5 - v * 0.6);
    const fl = 80 + 40 * Math.sin(TT * 40) + (TT > 74.6 ? 120 : 0);
    poly([[-30, 60], [30, 60], [0, 60 + fl]], '#ff8a1e'); poly([[-16, 60], [16, 60], [0, 60 + fl * 0.6]], '#fff36b');
    coin(0, 0, 70, { sx: 1 }); ctx.restore();
    if (TT > 74.6) speedLines(40, 0.35, 'r44'); },
  ui() { sticker('VOLLGAS!', 540, 380, 74.7, { bg: PAL.green, size: 60, rot: -0.06 }); },
  sfx: [[73.2, 'rocket', 2.3], [74.7, 'whooshUp', 1.3], [74.72, 'pop', 0.9]] });

// ---- 45 · day 10: 5,12 € — the notification
S(75.55, { tr: 'zoomIn', cam: [[75.55, 540, 960, 1.0], [77.62, 540, 940, 1.06]],
  draw() { setLeoRoom({ blur: 10 });
    char('leo', 540, FLOOR + 560, 1.5, { pose: [[0, 'idle']], emo: [[75.55, 'calm'], [76.5, 'happy']], look: [0, 0.8] });
    bigArm('leo', 1250, 1950, 640, 1180, 180);
    phone(560, 1000, 2.0, 0.05, () => { ctx.fillStyle = lin(0, -176, 0, 176, [[0, '#e8f6ff'], [1, '#c4e4ff']]); ctx.fillRect(-84, -176, 168, 352);
      tText('09:41', 0, -120, 30, { color: '#1b1530', shadow: false });
      const k = springEase(TT - 76.4, 300, 16); if (k > 0) { ctx.save(); ctx.translate(0, -40 - (1 - k) * 80); fillRR(-76, -40, 152, 92, 16, '#ffffff'); fillRR(-76, -40, 152, 26, 12, '#e7eaf5');
        tText('BANK', -40, -27, 12, { color: '#5b5f78', shadow: false }); tText('Kontostand heute', 0, 4, 12, { color: '#5b5f78', shadow: false, weight: 700 }); tText('5,12 €', 0, 32, 30, { color: PAL.green, shadow: false }); ctx.restore(); } }); },
  ui() { if (TT > 76.5) sticker('TAG 10', 540, 400, 76.5, { bg: PAL.green, size: 60 }); },
  sfx: [[76.4, 'notify'], [76.5, 'pop', 1.1], [76.9, 'sparkle']] });

// ---- 46 · Dani is back with a 50, folding it into a plane
S(77.62, { tr: 'whipL', cam: [[77.62, 540, 1080, 1.15], [79.55, 480, 1050, 1.3]],
  draw() { setPink();
    char('leo', 800, FLOOR + 20, 0.88, { pose: [[0, 'idle']], emo: [[0, 'calm']], look: [-0.6, 0], extras: { glasses: true } });
    const fold = clamp((TT - 78.9) / 0.5), wx = lerp(-150, 320, EZ.o2(clamp((TT - 77.62) / 1.0)));
    char('dani', wx, FLOOR + 30, 0.92, { pose: [[0, 'holdBoth']], emo: [[0, 'smug'], [78.9, 'grin']], look: [0.5, 0.3], walk: [[77.62, 1], [78.6, 0]], extras: { watch: 1, chain: 1 }, holdR: () => {}, holdL: () => {} });
    if (fold < 1) bill(wx, FLOOR - 470, 170 * (1 - fold * 0.45), fold * 0.4, 1 - fold * 1.6, { num: '50' }); else paperPlane(wx, FLOOR - 470, 1.1, -0.2); },
  ui() { hudDani({ scale: 0.8, y: 220 }); },
  sfx: [[77.7, 'footsteps', 0.9], [78.95, 'fold'], [79.25, 'fold', 1.2]] });

// ---- 47 · the paper plane lands in Leo's hair
S(79.55, { tr: 'cut', cam: [[79.55, 540, 1080, 1.1], [81.82, 600, 1020, 1.25]],
  draw() { setPink();
    char('leo', 780, FLOOR + 20, 0.88, { pose: [[0, 'idle']], emo: [[79.55, 'calm'], [81.0, 'serious']], look: [[79.55, [-0.6, -0.2]], [80.4, [0, -1]]], extras: { glasses: true } });
    char('dani', 300, FLOOR + 30, 0.92, { pose: [[79.55, 'throwR'], [79.75, 'throwR2'], [80.2, 'hips']], emo: [[0, 'grin']], look: [0.6, -0.2], extras: { watch: 1, chain: 1 } });
    const u = clamp((TT - 79.75) / 1.25), x = lerp(400, 770, u), y = lerp(1090, 770, u) - Math.sin(u * Math.PI) * 280;
    if (TT > 79.75) paperPlane(x, y, 1.0, -0.4 + u * 0.7 + Math.sin(TT * 9) * 0.08); },
  sfx: [[79.75, 'whoosh', 0.9], [80.0, 'planeWhoosh', 1.0], [81.0, 'crumple']] });

// ---- 48 · "Here, Cent-Magnate."
S(81.82, { tr: 'zoomIn', cam: [[81.82, 330, 1000, 1.7], [83.46, 330, 980, 1.8]],
  draw() { setPink({ blur: 9 }); char('dani', 330, FLOOR + 160, 1.0, { pose: [[0, 'hips'], [82.2, 'pointR']], emo: [[0, 'smug']], look: [0.6, 0], turn: 0.3, extras: { watch: 1, chain: 1, shades: 1 } }); },
  ui() { sticker('CENT-MAGNAT', 540, 420, 82.7, { bg: PAL.gold, fg: '#1b1530', size: 60, rot: 0.06 }); },
  sfx: [[82.2, 'swish', 0.8], [82.7, 'pop', 1], [82.75, 'bling']] });

// ---- 49 · "Treat yourself. But don't go broke." — Leo pulls the bill out of his hair
S(83.46, { tr: 'whipR', cam: [[83.46, 540, 1080, 1.15], [86.1, 540, 1060, 1.22]],
  draw() { setPink({ blur: 2 });
    char('dani', 300, FLOOR + 30, 0.92, { pose: [[83.46, 'waveR'], [84.6, 'laughBelly']], emo: [[83.46, 'grin'], [84.6, 'laugh']], look: [0.6, 0], extras: { watch: 1, chain: 1 } });
    char('leo', 780, FLOOR + 20, 0.88, { pose: [[83.46, 'idle'], [84.0, 'raiseR'], [84.6, 'holdR']], emo: [[0, 'serious']], look: [-0.5, 0], extras: { glasses: true }, holdR: () => (TT > 84.6 ? paperPlane(0, -30, 0.7, -0.3) : null) });
    if (TT < 84.6) paperPlane(790, 690, 0.85, 0.3); },
  sfx: [[84.0, 'swish', 0.7], [84.55, 'rustle']] });

// ---- 50 · "Do you know what costs you the most?"
S(86.1, { tr: 'zoomIn', cam: [[86.1, 780, 1000, 1.8], [87.78, 780, 980, 1.95]],
  draw() { setPink({ blur: 10 }); char('leo', 780, FLOOR + 150, 0.98, { pose: [[0, 'idle']], emo: [[0, 'serious']], look: [-0.3, 0], extras: { glasses: true } }); },
  ui() { vignette(0.55); },
  sfx: [[86.15, 'tension', 1.5]] });

// ---- 51 · "The watch?"
S(87.78, { tr: 'cut', cam: [[87.78, 540, 960, 1.0], [88.38, 540, 960, 1.12]],
  draw() { setPink({ blur: 12 }); bigArm('dani', -200, 1500, 560, 960, 260); circ(450, 960, 120, '#d9e6ff'); circ(450, 960, 92, '#7fd6ff'); clockFace(450, 960, 70, 3.2);
    twinkles('w51', 330, 830, 260, 260, 8, { s: 34 }); },
  ui() { const k = springEase(TT - 87.85, 300, 12); ctx.save(); ctx.translate(800, 620); ctx.scale(k, k); tText('?', 0, 0, 170, { color: '#fff', stroke: PAL.blue, strokeW: 18 }); ctx.restore(); },
  sfx: [[87.82, 'bling'], [87.9, 'popHi', 1]] });

// ---- 52 · "Your impatience."
S(88.38, { tr: 'whipL', cam: [[88.38, 780, 1000, 1.8], [90.1, 780, 980, 1.9]],
  draw() { setPink({ blur: 10 }); char('leo', 780, FLOOR + 150, 0.98, { pose: [[0, 'idle'], [88.5, 'pointL']], emo: [[0, 'serious']], look: [-0.5, 0], extras: { glasses: true } }); },
  ui() { sticker('EILE KOSTET', 540, 420, 89.0, { bg: PAL.red, size: 60 }); },
  sfx: [[88.5, 'swish', 0.8], [89.0, 'stamp']] });

// ---- 53 · "...and the bill comes on day 30."
S(90.1, { tr: 'zoomOut', cam: [[90.1, 540, 1080, 1.15], [91.55, 540, 1060, 1.2]],
  draw() { setPink({ blur: 3 });
    const k = springEase(TT - 90.85, 220, 14); if (k > 0) { ctx.save(); ctx.translate(540, 560); ctx.scale(k * 0.55, k * 0.55); glow(0, 0, 500, '#ff3030', 0.5); calendarPage(0, 0, 1, 'TAG', 30); ctx.restore(); }
    char('dani', 300, FLOOR + 30, 0.92, { pose: [[0, 'hips'], [90.9, 'idle']], emo: [[90.1, 'smug'], [90.9, 'scared']], look: [[90.1, [0.6, 0]], [90.9, [0.6, -0.8]]], extras: { watch: 1, chain: 1, sweat: TT > 91 } });
    char('leo', 780, FLOOR + 20, 0.88, { pose: [[0, 'armsCross']], emo: [[0, 'calm']], look: [-0.5, 0], extras: { glasses: true } }); },
  sfx: [[90.85, 'boom'], [90.9, 'thunder', 0.6]] });

// ---- 54 · a 40 € premium shake
S(91.55, { tr: 'whipR', cam: [[91.55, 380, 1050, 1.5], [92.8, 380, 1030, 1.6]],
  draw() { setPink({ blur: 7 });
    char('dani', 380, FLOOR + 120, 0.98, { pose: [[0, 'holdR'], [92.2, 'drinkR']], emo: [[0, 'smug'], [92.2, 'calm']], look: [0.3, 0], extras: { watch: 1, chain: 1 }, holdR: () => shakeCup(0, -60, 0.55, 1 - clamp((TT - 92.3) / 2)) }); },
  ui() { hudDani({ scale: 0.8, y: 220 }); sticker('PREMIUM-SHAKE  40 €', 540, 560, 91.7, { bg: PAL.gold, fg: '#1b1530', size: 50 }); },
  sfx: [[91.7, 'pop', 1], [92.25, 'slurp', 0.9], [92.2, 'cashReg', 0.7]] });

// ---- 55 · K.O. — the shake comes out of his nose
S(92.8, { tr: 'cut', cam: [[92.8, 540, 1040, 1.65], [94.35, 540, 1000, 1.75]], shake: [[93.5, 24, 0.5], [93.85, 20, 0.4]], punch: [[93.85, 0.15]],
  draw() { setPink({ blur: 9 });
    char('dani', 540, FLOOR + 170, 1.05, { pose: [[92.8, 'drinkR'], [93.45, 'headGrab']], emo: [[92.8, 'calm'], [93.45, 'shock']], extras: { watch: 1, chain: 1, sweat: 1 }, holdR: () => shakeCup(0, -60, 0.55, 0.5), lean: [[93.45, 0], [93.6, -0.12, 0.15], [93.9, 0, 0.3]] });
    const u = TT - 93.48; if (u > 0 && u < 1.2) { const R = RNG('spit'); for (let i = 0; i < 40; i++) { const a = -Math.PI / 2 + R.n(1.0), sp = 600 + R.f() * 900; const x = 540 + Math.cos(a) * sp * u * 0.6, y = 1015 + Math.sin(a) * sp * u * 0.6 + 900 * u * u; circ(x, y, 8 + R.f() * 14, i % 3 ? '#ffe07a' : '#fff4c2'); } } },
  ui() { sticker('K.O.!', 540, 420, 93.85, { bg: PAL.red, size: 110, rot: -0.1 }); },
  sfx: [[93.48, 'spit'], [93.85, 'punch'], [93.9, 'pop', 0.7]] });

// ---- 56-61 · the race: split screen, Dani (top) vs Leo (bottom)
const RACE = { dani: [[0, 819460], [95.5, 724460], [96.6, 672460], [98.1, 671538.64]], leo: [[0, 163.84], [95.5, 5242.88], [96.6, 167772.16], [98.1, 671088.64]] };
const DAYS = [[94.35, 15], [95.42, 20], [96.55, 25], [97.9, 27]];
function raceSplit(o = {}) {
  // top: Dani's world (blue)
  ctx.save(); ctx.beginPath(); ctx.rect(-200, -400, 1480, 1360); ctx.clip();
  rays('#173a9e', '#1f4fd0', { cy: 520, spin: 0.08 });
  char('dani', 270, 1180, 0.82, { pose: [[0, o.daniPose ?? 'hips']], emo: [[0, o.daniEmo ?? 'smug']], look: [0.6, 0], extras: { watch: 1, chain: 1, sweat: o.sweat, pale: o.pale } });
  o.daniProp && o.daniProp();
  ctx.restore();
  // bottom: Leo's world (green)
  ctx.save(); ctx.beginPath(); ctx.rect(-200, 960, 1480, 1300); ctx.clip();
  rays('#0c7a3e', '#11954c', { cy: 1440, spin: -0.08 });
  growthGraph(470, 1190, 520, 380, clamp(o.graph ?? 0.5), '#45f08f');
  char('leo', 260, 1990, 0.82, { pose: [[0, 'armsCross']], emo: [[0, o.leoEmo ?? 'calm']], look: [0.5, 0], extras: { glasses: true } });
  ctx.restore();
  line(-200, 960, 1280, 960, 16, '#ffffff');
}
function raceUI(day, t0) {
  hud('KONTOSTAND · DANI', RACE.dani, { cents: true, x: 700, y: 330, scale: 0.92 });
  hud('KONTOSTAND · LEO', RACE.leo, { cents: true, x: 700, y: 1090, scale: 0.92, color: '#41f08a' });
  const k = springEase(TT - t0, 320, 14); ctx.save(); ctx.translate(540, 960); ctx.scale(k, k);
  fillRR(-150, -62, 300, 124, 30, PAL.red); fillRR(-150, -62, 300, 124, 30, 'rgba(0,0,0,0)'); tText('TAG ' + day, 0, 2, 70, { color: '#fff', shadow: false }); ctx.restore();
}
S(94.35, { tr: 'flash', noCap: false, capY: 1790, cam: [[94.35, 540, 960, 1.0]],
  draw() { raceSplit({ graph: 0.4 }); }, ui() { raceUI(15, 94.4); },
  sfx: [[94.4, 'tick'], [94.45, 'pop', 1]] });
S(95.42, { tr: 'whipL', capY: 1790, cam: [[95.42, 540, 960, 1.0]],
  draw() { raceSplit({ graph: 0.6, daniPose: 'cheer', daniEmo: 'grin', daniProp: () => yacht(760, 820 + Math.sin(TT * 3) * 8, 0.9) }); },
  ui() { raceUI(20, 95.45); sticker('YACHT-PARTY  −95.000 €', 700, 540, 95.55, { bg: PAL.blue, size: 40 }); },
  sfx: [[95.5, 'cashReg'], [95.55, 'pop', 1], [95.6, 'whoosh', 1.2]] });
S(96.55, { tr: 'whipL', capY: 1790, cam: [[96.55, 540, 960, 1.0]],
  draw() { raceSplit({ graph: 0.8, daniPose: 'idle', daniEmo: 'neutral', daniProp: () => goldChainIcon(780, 700, 0.9) }); },
  ui() { raceUI(25, 96.6); sticker('GOLDKETTE  −52.000 €', 700, 540, 96.65, { bg: PAL.gold, fg: '#1b1530', size: 40 }); },
  sfx: [[96.6, 'cashReg'], [96.65, 'pop', 1], [96.7, 'whoosh', 1.4]] });
S(97.9, { tr: 'zoomIn', capY: 1790, cam: [[97.9, 540, 960, 1.0], [99.22, 540, 960, 1.06]],
  draw() { raceSplit({ graph: 0.97, daniPose: 'headGrab', daniEmo: 'scared', sweat: 1, leoEmo: 'smug', daniProp: () => ticket(790, 720, 1.0, 0.12 * springEase(TT - 98.05, 300, 10), '−921,36 €') }); },
  ui() { raceUI(27, 97.95); },
  sfx: [[97.95, 'heartbeat', 1.3], [98.05, 'stamp', 0.8], [98.1, 'cashReg', 0.8]] });

// ---- 60 · 450 € apart
S(99.22, { tr: 'cut', capY: 1790, cam: [[99.22, 540, 960, 1.0], [100.95, 540, 960, 1.08]],
  draw() { setDark('#2a1640', '#05030c');
    tText('DANI', 540, 470, 56, { color: '#7fb0ff', shadow: false, letter: 10 }); tText('671.538,64 €', 540, 590, 110, { color: '#fff', stroke: '#0a0718', strokeW: 16 });
    tText('LEO', 540, 1130, 56, { color: '#7ff0a8', shadow: false, letter: 10 }); tText('671.088,64 €', 540, 1250, 110, { color: '#41f08a', stroke: '#0a0718', strokeW: 16 });
    const on = TT > 100.96 && Math.floor(TT * 6) % 2 === 0; ctx.save(); ctx.translate(540, 910); ctx.scale(on ? 1.06 : 1, on ? 1.06 : 1);
    fillRR(-300, -66, 600, 132, 34, TT > 100.96 ? PAL.yellow : '#2a2440'); tText(TT > 100.96 ? 'DIFFERENZ: 450 €' : 'DIFFERENZ: …', 0, 2, 54, { color: TT > 100.96 ? '#1b1530' : '#8f87b8', shadow: false }); ctx.restore();
    if (TT > 100.96) glow(540, 910, 420, '#ffd23f', 0.35); },
  sfx: [[99.25, 'heartbeat', 1.6], [100.96, 'impact'], [101.0, 'pop', 1]] });

// ---- 61 · ...exactly the price of the pizza (callback)
S(100.95 + 1.0, { tr: 'flash', capY: 1790, cam: [[101.95, 540, 960, 1.0], [102.72, 540, 960, 1.12]],
  draw() { ctx.fillStyle = rad(540, 960, 50, 900, [[0, '#a3264f'], [1, '#3a0818']]); ctx.fillRect(-600, -400, 2300, 2800); glow(540, 960, 500, '#ffe9a6', 0.5); tinyPizza(540, 960, 170); },
  ui() { sticker('= 450 € PIZZA', 540, 520, 102.0, { bg: PAL.gold, fg: '#1b1530', size: 60 }); },
  sfx: [[101.98, 'ting'], [102.0, 'pop', 1]] });

// ---- 62 · Dani, pale
S(102.72, { tr: 'whipR', cam: [[102.72, 540, 1000, 1.65], [104.0, 540, 980, 1.8]],
  draw() { setDaniRoom({ blur: 10 }); char('dani', 540, FLOOR + 170, 1.05, { pose: [[0, 'sad']], emo: [[0, 'scared']], look: [0, 0], extras: { watch: 1, chain: 1, sweat: 1, pale: 1 } }); },
  sfx: [[102.75, 'gulp'], [103.3, 'heartbeat', 0.8]] });

// ---- 63 · Leo, a half smile — three days left
S(104.0, { tr: 'whipL', cam: [[104.0, 540, 1000, 1.65], [105.85, 540, 980, 1.85]],
  draw() { setLeoRoom({ blur: 10 }); char('leo', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], look: [0.2, 0], extras: { glasses: true } }); },
  ui() { sticker('NOCH 3 TAGE', 540, 420, 104.5, { bg: PAL.red, size: 62 }); },
  sfx: [[104.5, 'tick'], [105.0, 'tick'], [105.5, 'tick'], [104.52, 'pop', 1]] });

// ---- 64 · to be continued
S(105.85, { tr: 'zoomOut', noCap: true, cam: [[105.85, 540, 960, 1.0], [109, 540, 960, 1.05]],
  draw() { setLeoRoom({ blur: 18 }); ctx.fillStyle = 'rgba(10,6,24,0.62)'; ctx.fillRect(-600, -400, 2300, 2800); },
  ui() { const k = springEase(TT - 106.0, 220, 15); ctx.save(); ctx.translate(540, 780); ctx.scale(k, k); tText('WIRD', 0, -70, 110, { color: '#fff', stroke: '#140c22', strokeW: 18 }); tText('FORTGESETZT…', 0, 60, 110, { color: '#fff', stroke: '#140c22', strokeW: 18, maxW: 980 }); ctx.restore();
    sticker('TAG 28: WER LIEGT VORNE?', 540, 1010, 106.5, { bg: PAL.yellow, fg: '#1b1530', size: 54 });
    if (TT > 107.2) { const p = 1 + 0.05 * Math.sin(TT * 8); ctx.save(); ctx.translate(540, 1160); ctx.scale(p, p); sticker('ZU TEIL 2 >>', 0, 0, 107.2, { bg: PAL.red, size: 50 }); ctx.restore(); } },
  sfx: [[105.9, 'impact'], [106.0, 'riser', 1.8], [106.5, 'pop', 1], [107.2, 'pop', 1.2]] });
