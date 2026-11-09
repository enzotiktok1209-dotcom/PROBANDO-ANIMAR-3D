// =====================================================================
//  shots.js — 10 Millionen Euro sofort vs 1 Euro pro Sekunde, aber nur im Schlaf, 1 Jahr (DE). ~36 shots on the trimmed voice (68.6 s).
//  Subjects in the centre band above the captions; German helper texts; cash on screen whenever money is said;
//  Jonas' total never readable, nothing hints at the winner.
// =====================================================================
const KONTO = [[0, 1e7], [24.6, 9e6], [27.6, 7.8e6], [30.2, 7.3e6]];
const hudKevin = (o = {}) => hud('KONTO · KEVIN', KONTO, { ...o });
const KS = { chain: 1, shades: 1 };
function popText(str, x, y, t0, size, col, rot = 0, rise = 40) { if (TT < t0) return; const k = springEase(TT - t0, 300, 12); ctx.save(); ctx.translate(x, y - (TT - t0) * rise); ctx.rotate(rot); ctx.scale(k, k); tText(str, 0, 0, size, { color: col, stroke: '#1b0f2e', strokeW: size * 0.2 }); ctx.restore(); }
function info(str, t0, o = {}) { sticker(str, o.x ?? 540, o.y ?? 400, t0, { bg: o.bg ?? '#141026', fg: o.fg, size: o.size ?? 54, rot: o.rot ?? -0.03 }); }
function priceTag(x, y, s, txt, rot = -0.1, col = '#ffffff') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot + Math.sin(TT * 2) * 0.03); ctx.scale(s, s); line(-170, -70, -250, -150, 5, '#ddd'); poly([[-170, -80], [260, -80], [260, 80], [-170, 80], [-230, 0]], col); circ(-185, 0, 14, '#1b1530'); tText(txt, 45, 4, 70, { color: '#1b1530', shadow: false, maxW: 400 }); ctx.restore(); }
function iconCard(x, y, top, big, sub, col, t0, icon) {
  if (TT < t0) return; const k = springEase(TT - t0, 260, 15), w = 450, h = 380;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  fillRR(-w / 2 + 8, -h / 2 + 12, w, h, 28, 'rgba(0,0,0,0.38)'); fillRR(-w / 2, -h / 2, w, h, 28, col); fillRR(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 22, shade(col, 0.12));
  tText(top, 0, -h / 2 + 36, 26, { color: 'rgba(255,255,255,0.9)', shadow: false, letter: 3, weight: 800 });
  fillRR(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18, 'rgba(10,8,30,0.30)');
  const ik = springEase(TT - t0 - 0.12, 280, 12), bob = Math.sin(TT * 3 + x) * 4;
  ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18); ctx.clip(); ctx.translate(0, -h / 2 + 150 + bob); ctx.scale(ik, ik);
  if (icon === 'cash') { glow(0, 0, 200, '#a6f0b4', 0.3); briefcase(0, 60, 0.42, 1); } else { pillow(-70, 10, 0.42); tText('Z', -40, -40, 46, { color: '#fff' }); coin(110, 0, 52, { sx: Math.cos(TT * 3), label: '1€' }); }
  ctx.restore();
  tText(big, 0, h / 2 - 92, 44, { color: '#fff', maxW: w - 36 }); tText(sub, 0, h / 2 - 40, 26, { color: 'rgba(255,255,255,0.95)', shadow: false, weight: 800, maxW: w - 40 });
  ctx.restore();
}
const plus1 = (cx, cy, rate, t0, seed) => euroPops(cx, cy, rate, t0, seed);
const CLOSE = (t0, t1, x = 540) => [[t0, x, 1000, 1.65], [t1, x, 978, 1.8]];
const CLOSEJ = (t0, t1) => [[t0, 540, 1000, 1.72], [t1, 540, 980, 1.88]];
const cash = (seed, t0, n = 22) => { if (TT > t0) billRain(seed, t0, n, { spread: 1.5 }); };
function splitTopBottom(top, bottom) {
  ctx.save(); ctx.beginPath(); ctx.rect(-300, -400, 1700, 1360); ctx.clip(); top(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-300, 960, 1700, 1400); ctx.clip(); bottom(); ctx.restore(); line(-300, 960, 1400, 960, 14, '#ffffff');
}
const zzz = (x, y, t0 = 0, s = 1) => { for (let i = 0; i < 3; i++) { const u = ((TT * 0.6 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - u; tText('Z', x + u * 120 * s + i * 20 * s, y - u * 200 * s, (40 + i * 14) * s, { color: '#ffffff', stroke: '#2a2f78', strokeW: 6 }); ctx.restore(); } };

// =====================================================================  THE HOOK
// ---- 1 · the two at their buttons and both options — a subtle 0.2 s punch-in with its swoosh, a short riser into the cut
S(0.0, { tr: 'cut', lift: 110, cam: [[0, 540, 1020, 1.14], [0.2, 540, 1020, 1.0], [0.5, 540, 1018, 1.02]],
  draw() { setStudio(); char('kevin', 300, FLOOR - 40, 0.8, { emo: [[0, 'grin']], look: [0.4, -0.4] }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']], look: [-0.3, -0.3], extras: { glasses: true } }); studioPodiums(); },
  ui() { tText('WAS NIMMST DU?', 540, 200, 66, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14, maxW: 1000 });
    iconCard(285, 462, 'OPTION 1', '10 MIO. €', 'SOFORT', PAL.green, 0.02, 'cash'); iconCard(795, 462, 'OPTION 2', '1 € / SEKUNDE', 'NUR IM SCHLAF · 1 JAHR', '#3a4ac0', 0.08, 'sleep'); tText('VS', 540, 462, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); },
  sfx: [[0.02, 'pop', 1], [0.08, 'pop', 1.2]] });
// ---- 2 · "10 Millionen Euro sofort?" — the briefcase snaps open, cash explodes out, 100s fly
S(0.5, { tr: 'zoomIn', cam: [[0.5, 540, 960, 1.0], [1.92, 540, 950, 1.1]],
  draw() { rays('#0e8a45', '#14a956', { cy: 940, spin: 0.25 }); glow(540, 1000, 600, '#a6f0b4', 0.35); const k = springEase(TT - 0.52, 220, 13), op = EZ.o3(clamp((TT - 0.62) / 0.25));
    ctx.save(); ctx.translate(540, 1240); ctx.scale(k, k); briefcase(0, 0, 1.35, op); ctx.restore();
    for (let i = 0; i < 6; i++) { const t0 = 0.66 + i * 0.1; if (TT > t0) { const u = TT - t0, R = RNG('stk', i); euro100(540 + R.n(320) + u * R.n(200), 1000 - u * 700 + u * u * 500, 220, R.n(0.8) + u * R.n(3)); } } cash('m2', 0.66, 40); },
  ui() { popText('10.000.000 €', 540, 560, 0.7, 104, PAL.yellow, -0.04, 0); info('SOFORT!', 1.02, { y: 360, bg: PAL.red, size: 64 }); },
  sfx: [[0.62, 'click'], [0.66, 'cashCannon'], [0.75, 'moneyRain', 1.1], [1.02, 'pop', 1.1], [1.4, 'cashReg']] });
// ---- 3 · "Oder 1 Euro pro Sekunde" — coin after coin drops into a jar
const DROPS = Array.from({ length: 5 }, (_, k) => 1.98 + k * 0.2);
S(1.92, { tr: 'whipL', cam: [[1.92, 540, 960, 1.04], [3.48, 540, 960, 1.0]],
  draw() { rays('#c4520a', '#e86c0e', { cy: 940 }); glow(540, 1000, 460, '#ffe2a8', 0.4); const n = DROPS.filter((t) => TT > t + 0.57).length; coinJar(540, 1360, 1.0, 0.05 + n * 0.045);
    DROPS.forEach((t0, k) => { if (TT < t0 || TT > t0 + 0.6) return; const R = RNG('drop', k), x = 540 + R.n(70), y = lerp(250, 1120, clamp((TT - t0) / 0.57) ** 2); coin(x, y, 54, { sx: Math.cos(TT * 9 + k), label: '1€' }); });
    stopwatch(850, 760, 0.36 * springEase(TT - 1.94, 220, 13), (TT - 1.94) * 6); },
  ui() { tText('1 € PRO SEKUNDE', 540, 380, 88, { color: '#fff', stroke: '#6a2a00', strokeW: 18, maxW: 1000 }); DROPS.forEach((t) => popText('+1 €', 360, 1000, t + 0.57, 64, '#41f08a', 0, 120)); },
  sfx: [[1.94, 'tick'], ...DROPS.map((t) => [t + 0.57, 'coinJar']), ...DROPS.map((t) => [t, 'tickSoft'])] });
// ---- 4 · "…aber nur, während du schläfst" — a night sky, a sleeper, euros rise with every snore
S(3.48, { tr: 'flash', lift: 0, cam: [[3.48, 540, 1100, 1.15], [5.16, 540, 1080, 1.25]],
  draw() { setBedroom(); sleepingJonas(680, 1330, 1.0); },
  ui() { info('ABER NUR IM SCHLAF 😴', 3.6, { y: 340, bg: '#3a2f8a', size: 52 }); plus1(560, 1000, 3, 3.6, 'h4'); },
  sfx: [[3.6, 'pop', 1], [3.7, 'snore', 1.3], [3.75, 'coinTicks', 1.3, 3]] });
// ---- 5 · "…ein Jahr lang?" — the year card drops in spinning
S(5.16, { tr: 'zoomIn', cam: [[5.16, 540, 960, 1.0], [6.14, 540, 940, 1.12]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.2 }); const k = springEase(TT - 5.18, 220, 13); ctx.save(); ctx.translate(540, 980 - (1 - k) * 300); ctx.scale(k, k); ctx.rotate((1 - k) * 0.6); calendarPage(0, 0, 1.25, 'JAHR', 1); ctx.restore(); },
  ui() { info('1 JAHR LANG', 5.4, { y: 360, bg: PAL.orange, size: 64 }); },
  sfx: [[5.18, 'whooshDown', 1.1], [5.3, 'thud'], [5.4, 'pop', 1]] });

// =====================================================================  KEVIN GRABS IT
// ---- 6 · Kevin slams the button so fast he almost falls over
S(6.14, { tr: 'whipR', lift: 90, cam: [[6.14, 330, 1140, 1.45], [8.1, 320, 1090, 1.6]], shake: [[7.3, 22, 0.45]],
  draw() { setStudio({ blur: 3 }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']], look: [-0.6, 0.2], extras: { glasses: true } });
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[6.14, 'raiseR'], [7.15, 'slamR', 0.08], [7.5, 'armsUp', 0.15], [7.9, 'idle', 0.2]], emo: [[6.14, 'grin'], [7.3, 'shock'], [7.9, 'grin']], look: [0.4, 0.5], lean: [[6.14, 0], [7.3, 0.35, 0.15], [7.55, -0.25, 0.15], [7.85, 0.05, 0.2]], jump: [[7.4, 0], [7.5, 30, 0.1], [7.65, 0, 0.12]] });
    studioPodiums({ pressL: TT > 7.3 ? 1 : 0, litL: TT > 7.3 ? 0.9 : 0 }); impactLines(300, 1250, 120, 380, 12, 7.3); speedLines(10, TT > 7.0 && TT < 7.4 ? 0.5 : 0, 'sl6'); cash('k6', 7.35, 20); },
  ui() { info('BLITZSCHNELL! ⚡', 6.9, { y: 380, bg: PAL.yellow, fg: '#1b1530', size: 56 }); },
  sfx: [[6.2, 'whooshUp', 1.3], [7.3, 'slam'], [7.35, 'buzzerWin'], [7.4, 'cashCannon'], [7.6, 'squeak'], [7.9, 'thud']] });
// ---- 7 · he grabs the briefcase, still wobbling
S(8.1, { tr: 'cut', cam: CLOSE(8.1, 9.0),
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'holdR']], emo: [[0, 'grin']], lean: [[8.1, 0.12], [8.35, -0.1, 0.12], [8.6, 0.05, 0.12]], holdR: () => briefcase(10, 60, 0.3, 0) }); cash('k7', 8.1, 14); },
  ui() { info('10 MIO.! 💰', 8.2, { y: 380, bg: PAL.green, size: 56 }); },
  sfx: [[8.15, 'swish', 1], [8.2, 'pop', 1], [8.5, 'cashReg']] });
// ---- 8 · "Schlafen?" — he shrugs, laughing
S(9.0, { tr: 'whipL', cam: CLOSE(9.0, 9.88),
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'shrug']], emo: [[0, 'laugh']], tilt: [[9.0, 0], [9.3, 0.1]] }); },
  ui() { popText('SCHLAFEN? 😂', 540, 380, 9.05, 80, PAL.yellow, -0.05, 10); },
  sfx: [[9.05, 'popHi', 1], [9.4, 'boing']] });
// ---- 9 · "Bruder, Schlaf ist was für Arme!" — pointing, belly laugh
S(9.88, { tr: 'zoomIn', cam: CLOSE(9.88, 11.94),
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[9.88, 'pointR'], [11.0, 'laughBelly']], emo: [[9.88, 'smug'], [11.0, 'laugh']], lean: [[11.0, -0.06], [11.25, 0.06, 0.12], [11.5, -0.04, 0.12]] }); },
  ui() { info('„SCHLAF IST WAS FÜR ARME!"', 10.5, { y: 380, bg: PAL.red, size: 44 }); },
  sfx: [[9.92, 'swish', 1.1], [10.5, 'pop', 1], [11.05, 'popHi', 1.1], [11.4, 'popHi', 1.25]] });

// =====================================================================  JONAS GETS READY
// ---- 10 · Jonas, calm, in his room
S(11.94, { tr: 'whipR', cam: [[11.94, 540, 1050, 1.35], [13.46, 540, 1030, 1.45]],
  draw() { setLeoRoom({ blur: 6 }); char('jonas', 540, FLOOR + 80, 0.95, { pose: [[0, 'armsCross']], emo: [[0, 'calm']], extras: { glasses: true } }); },
  ui() { info('JONAS BLEIBT GANZ RUHIG', 12.0, { y: 380, bg: PAL.blue, size: 50 }); },
  sfx: [[12.0, 'pop', 0.9], [12.5, 'tickSoft'], [13.0, 'tickSoft', 1.1]] });
// ---- 11 · puff! — into his pyjamas, and he grabs his pillow
S(13.46, { tr: 'cut', cam: [[13.46, 540, 1050, 1.35], [15.72, 540, 1030, 1.45]],
  draw() { setLeoRoom({ blur: 6 }); const pj = TT > 13.7; char(pj ? 'jonasPJ' : 'jonas', 540, FLOOR + 80, 0.95, { pose: [[13.46, 'idle'], [14.6, 'holdR', 0.2]], emo: [[13.46, 'calm'], [14.2, 'happy']], extras: { glasses: true }, holdR: () => (TT > 14.75 ? pillow(20, -10, 0.4, -0.2) : null) });
    if (TT < 14.75) pillow(860, FLOOR - 40, 0.6); puff(540, FLOOR - 400, 13.62, 1.6); },
  ui() { info('PYJAMA AN 😴', 13.8, { y: 380, bg: '#3a4ac0', size: 52 }); if (TT > 14.75) info('KISSEN!', 14.8, { y: 500, bg: PAL.pink, size: 46, rot: 0.04 }); },
  sfx: [[13.62, 'poof'], [13.8, 'pop', 1], [14.7, 'swish', 0.9], [14.8, 'pop', 1.2]] });
// ---- 12 · "Gute Nacht, Kevin."
S(15.72, { tr: 'zoomIn', cam: CLOSEJ(15.72, 16.62),
  draw() { setLeoRoom({ blur: 10 }); char('jonasPJ', 540, FLOOR + 170, 1.05, { pose: [[0, 'holdR']], emo: [[0, 'smug']], extras: { glasses: true }, holdR: () => pillow(20, -10, 0.4, -0.2) }); },
  ui() { info('„GUTE NACHT, KEVIN."', 15.8, { y: 380, bg: '#3a2f8a', size: 50 }); },
  sfx: [[15.8, 'pop', 1], [16.1, 'ting']] });
// ---- 13 · "In einem Jahr stehst du heulend vor mir. Wetten?" — slow push, the vignette closes in
S(16.62, { tr: 'cut', tense: 1, cam: [[16.62, 540, 990, 1.8], [19.36, 540, 960, 2.05]],
  draw() { setLeoRoom({ blur: 11 }); char('jonasPJ', 540, FLOOR + 170, 1.05, { pose: [[16.62, 'holdR'], [18.6, 'pointR']], emo: [[16.62, 'smug'], [18.6, 'grin']], tilt: [[16.62, 0], [17.2, -0.06]], extras: { glasses: true }, holdR: () => (TT < 18.6 ? pillow(20, -10, 0.4, -0.2) : null) }); },
  ui() { info('„IN 1 JAHR HEULST DU" 😏', 17.4, { y: 360, bg: PAL.red, size: 48 }); if (TT > 18.9) popText('WETTEN?', 540, 520, 18.9, 96, PAL.yellow, -0.05, 0); },
  sfx: [[17.4, 'pop', 1], [17.8, 'tension', 1.0], [18.9, 'stamp']] });

// =====================================================================  KEVIN SPENDS
// ---- 14 · "Und weil Kevin jetzt zehnfacher Millionär ist, gönnt er sich alles:" — the account, money rain, shades on
S(19.36, { tr: 'flash', cam: [[19.36, 540, 1000, 1.45], [22.7, 540, 980, 1.58]],
  draw() { setClub({ blur: 10 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[19.36, 'hips'], [21.6, 'cheer']], emo: [[0, 'grin']], extras: { chain: 1, shades: clamp((TT - 19.8) / 0.25) } }); cash('k14', 19.5, 30); },
  ui() { hudKevin({ y: 300, scale: 1.0, t0: 19.45 }); info('ZEHNFACHER MILLIONÄR 🤑', 20.4, { y: 480, bg: PAL.gold, fg: '#1b1530', size: 46 }); },
  sfx: [[19.45, 'cashReg'], [19.5, 'moneyRain', 1.8], [19.8, 'whooshDown', 1.2], [20.4, 'pop', 1], [21.64, 'bling']] });
// ---- 15 · a flying Tesla for 1 million (it rises on its hover jets over the city)
S(22.7, { tr: 'whipU', lift: 0, cam: [[22.7, 540, 1000, 1.0], [25.14, 540, 980, 1.06]],
  draw() { setStreet(); const k = EZ.o3(clamp((TT - 22.75) / 1.1)); flyingCar(540, lerp(1500, 1050, k), 0.72); char('kevin', 520, lerp(1500, 1050, k) - 150, 0.3, { pose: [[0, 'waveR']], emo: [[0, 'grin']], extras: KS }); },
  ui() { hudKevin({ y: 240, scale: 0.82 }); info('FLIEGENDER TESLA 🚀', 22.8, { y: 400, bg: PAL.blue, size: 50 }); priceTag(540, 1450, 0.9 * springEase(TT - 24.3, 300, 12), '1.000.000 €', -0.06); },
  sfx: [[22.75, 'rocket', 1.3], [23.4, 'whooshUp', 0.8], [24.3, 'pop', 1], [24.6, 'cashReg']] });
// ---- 16 · a huge luxury yacht for 1,2 million
S(25.14, { tr: 'whipL', lift: 0, cam: [[25.14, 540, 960, 1.0], [27.92, 540, 960, 1.06]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1400, [[0, '#7cc6ff'], [1, '#bfe9ff']]); ctx.fillRect(-600, -400, 2300, 1800); circ(860, 300, 90, '#fff3a6'); ctx.fillStyle = '#2f8fd8'; ctx.fillRect(-600, 1150, 2300, 900);
    for (let i = 0; i < 6; i++) line(-100 + i * 240 + Math.sin(TT * 2 + i) * 20, 1250 + (i % 2) * 80, 60 + i * 240, 1250 + (i % 2) * 80, 8, 'rgba(255,255,255,0.5)');
    const x = lerp(1400, 540, EZ.o3(clamp((TT - 25.2) / 1.0))); yacht(x + Math.sin(TT * 2) * 6, 1150 + Math.sin(TT * 3) * 8, 2.3); char('kevin', x + 20, 960, 0.42, { pose: [[0, 'cheer']], emo: [[0, 'grin']], extras: KS }); },
  ui() { hudKevin({ y: 240, scale: 0.82 }); priceTag(540, 600, 0.9 * springEase(TT - 27.3, 300, 12), '1.200.000 €', -0.06, PAL.yellow); },
  sfx: [[25.2, 'waves', 1.6], [25.5, 'shipHorn'], [27.3, 'pop', 1], [27.6, 'cashReg']] });
// ---- 17 · a beach party for 500.000 € (night, lanterns, fireworks)
S(27.92, { tr: 'zoomIn', lift: 0, cam: [[27.92, 540, 1050, 1.15], [30.76, 540, 1030, 1.22]],
  draw() { setIsland({ night: 1, party: 1 }); fireworks('fw17', 28.0, 5); char('kevin', 540, FLOOR + 40, 0.8, { pose: [[0, 'cheer']], emo: [[0, 'laugh']], extras: KS, jump: [[27.92, 0], [28.15, 30, 0.12], [28.35, 0, 0.12], [28.6, 30, 0.12], [28.8, 0, 0.12], [29.05, 30, 0.12], [29.25, 0, 0.12]] }); cash('p17', 28.3, 24); },
  ui() { hudKevin({ y: 240, scale: 0.82 }); info('STRANDPARTY 🏝️', 28.1, { y: 400, bg: PAL.pink, size: 52 }); priceTag(540, 560, 0.9 * springEase(TT - 29.9, 300, 12), '500.000 €', -0.06); },
  sfx: [[27.95, 'carMusic', 2.8], [28.1, 'pop', 1], [28.5, 'boom'], [29.0, 'boom'], [29.9, 'pop', 1.1], [30.2, 'cashReg']] });
// ---- 18 · "Schlafen kann ich, wenn ich alt bin!"
S(30.76, { tr: 'whipR', cam: CLOSE(30.76, 32.7),
  draw() { setIsland({ night: 1, party: 1, blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[30.76, 'waveR'], [31.6, 'cheer']], emo: [[0, 'laugh']], extras: KS }); },
  ui() { info('„SCHLAFEN KANN ICH, WENN ICH ALT BIN!"', 31.0, { y: 380, bg: PAL.yellow, fg: '#1b1530', size: 38 }); },
  sfx: [[30.8, 'swish', 1], [31.0, 'pop', 1], [31.6, 'applause', 0.8]] });

// =====================================================================  JONAS SLEEPS
// ---- 19 · "Und Jonas? Der liegt jeden Abend pünktlich im Bett…"
S(32.7, { tr: 'iris', lift: 0, cam: [[32.7, 540, 1100, 1.1], [35.1, 540, 1080, 1.2]],
  draw() { setBedroom(); sleepingJonas(680, 1330, 1.0); alarmClock(900, 1150, 0.22, { t: TT * 3 }); },
  ui() { info('JEDEN ABEND PÜNKTLICH 🛏️', 32.8, { y: 380, bg: '#3a2f8a', size: 48 }); },
  sfx: [[32.8, 'pop', 0.9], [33.0, 'crickets', 1.4], [34.2, 'snore', 1.0]] });
// ---- 20 · "…und schläft so um die acht Stunden." — the clock hands race around
S(35.1, { tr: 'zoomIn', cam: [[35.1, 540, 960, 1.0], [36.86, 540, 950, 1.08]],
  draw() { rays('#1b2160', '#2a2f78', { cy: 960, spin: 0.15 }); const k = springEase(TT - 35.12, 220, 13); ctx.save(); ctx.translate(540, 1000); ctx.scale(k, k); clockFace(0, 0, 300, (TT - 35.1) * 4.5); ctx.restore(); },
  ui() { info('≈ 8 STUNDEN', 35.6, { y: 360, bg: '#3a4ac0', size: 62 }); },
  sfx: [[35.12, 'clockSpin', 1.5], [35.6, 'pop', 1]] });
// ---- 21 · "Und während er schnarcht, klingelt sein Konto im Sekundentakt." — close on the sleeper, coins every second
S(36.86, { tr: 'whipL', lift: 0, cam: [[36.86, 540, 1150, 1.25], [40.06, 520, 1120, 1.4]],
  draw() { setBedroom({ blur: 3 }); sleepingJonas(660, 1330, 0.95); for (let i = 0; i < 6; i++) { const t0 = 37.0 + i * 0.5; if (TT > t0) coin(500 + i * 70, bounceY(TT - t0, 600, 1200, 5200, 0.3), 30, { sx: Math.cos(TT * 9 + i), label: '1€' }); } },
  ui() { blurCounter(540, 360, 700, 210, 'KONTO · JONAS'); plus1(560, 980, 2, 37.0, 'w21'); },
  sfx: [[36.9, 'snore', 1.2], [37.0, 'coinTicks', 3.0, 2], [38.06, 'notify'], [38.5, 'snore', 1.2]] });
// ---- 22 · after one month (the days fly)…
S(40.06, { tr: 'spin', cam: [[40.06, 540, 960, 1.0], [41.56, 540, 940, 1.1]],
  draw() { rays('#d4520a', '#ff7a12', { cy: 900, spin: 0.25 }); const d = Math.min(30, 1 + Math.floor(clamp((TT - 40.12) / 1.0) * 29)); const k = springEase(TT - 40.08, 220, 13); ctx.save(); ctx.translate(540, 980); ctx.scale(k, k); calendarPage(0, 0, 1.2, 'TAG', d); ctx.restore(); },
  ui() { info('NACH 1 MONAT…', 40.1, { y: 360, bg: '#141026', size: 58 }); },
  sfx: [[40.1, 'pop', 1], [40.12, 'clockSpin', 1.0], [41.2, 'stamp']] });
// ---- 23 · …almost a million — a mountain of cash
S(41.56, { tr: 'zoomIn', cam: [[41.56, 540, 960, 1.0], [42.98, 540, 950, 1.08]],
  draw() { rays('#0e8a45', '#14a956', { cy: 960, spin: 0.2 }); moneyPyramid(540, 1400, 1.1, EZ.o3(clamp((TT - 41.6) / 0.7))); cash('m23', 41.8, 30); },
  ui() { info('FAST 1 MILLION! 💰', 41.9, { y: 420, bg: PAL.gold, fg: '#1b1530', size: 58 }); },
  sfx: [[41.6, 'coinPour', 0.9], [41.8, 'cashCannon'], [41.9, 'pop', 1.1], [42.5, 'cashReg']] });
// ---- 24 · "Und das nur fürs Schlafen." — Jonas asleep, smiling, cash on the blanket
S(42.98, { tr: 'whipR', lift: 0, cam: [[42.98, 520, 1150, 1.3], [44.62, 520, 1120, 1.42]],
  draw() { setBedroom({ blur: 3 }); sleepingJonas(660, 1330, 0.95); for (let i = 0; i < 7; i++) { const R = RNG('blk', i); euro100(480 + i * 60, 1230 + R.n(30), 120, R.n(0.6)); } cash('m24', 43.0, 14); },
  ui() { info('NUR FÜRS SCHLAFEN 😴💸', 43.1, { y: 380, bg: '#3a2f8a', size: 48 }); },
  sfx: [[43.1, 'pop', 1], [43.3, 'snore', 1.2], [43.9, 'rustle']] });

// =====================================================================  KEVIN IS WORN OUT
// ---- 25 · Kevin after a month: eye bags (slow push, vignette)
S(44.62, { tr: 'glitch', tense: 1, cam: CLOSE(44.62, 47.88),
  draw() { setIsland({ night: 1, party: 1, blur: 10 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[44.62, 'cheer'], [45.9, 'sad', 0.5]], emo: [[44.62, 'grin'], [46.0, 'sad']], extras: { chain: 1, shades: TT < 46.6 ? 1 : 0, pale: clamp((TT - 46.0) / 1.0) * 0.5, sweat: 1 } });
    if (TT > 47.18) { ctx.save(); ctx.translate(540, FLOOR + 160 - 655); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * 44, 28, 26, 0.2, Math.PI - 0.2); ctx.lineWidth = 9; ctx.strokeStyle = 'rgba(90,60,140,0.7)'; ctx.stroke(); } ctx.restore(); } },
  ui() { if (TT > 47.18) popText('AUGENRINGE 😵', 540, 380, 47.18, 80, '#9f95ff', -0.05, 0); },
  sfx: [[44.7, 'carMusic', 1.2], [46.0, 'powerDown'], [46.6, 'swish', 0.8], [47.18, 'pop', 1]] });
// ---- 26 · "Acht, neun Stunden schlafen? So verschwendest du dein Leben!"
S(47.88, { tr: 'whipL', cam: CLOSE(47.88, 51.08),
  draw() { setIsland({ night: 1, blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[47.88, 'shrug'], [49.4, 'pointR']], emo: [[47.88, 'laugh'], [49.4, 'smug']], extras: { chain: 1, sweat: 1, pale: 0.4 } }); },
  ui() { info('„8, 9 STUNDEN SCHLAFEN?"', 48.0, { y: 340, bg: PAL.yellow, fg: '#1b1530', size: 46 }); if (TT > 49.4) info('VERSCHWENDETES LEBEN!', 49.45, { y: 470, bg: PAL.red, size: 44, rot: 0.03 }); },
  sfx: [[47.95, 'popHi', 1], [48.0, 'pop', 1], [49.45, 'pop', 1.2], [50.3, 'boing']] });
// ---- 27 · "Mag sein. Aber ich werde dafür bezahlt." (slow push, vignette)
S(51.08, { tr: 'zoomIn', tense: 1, cam: CLOSEJ(51.08, 53.04),
  draw() { setBedroom({ blur: 10 }); char('jonasPJ', 540, FLOOR + 170, 1.05, { pose: [[0, 'holdR']], emo: [[51.08, 'calm'], [52.0, 'smug']], extras: { glasses: true }, holdR: () => pillow(20, -10, 0.4, -0.2) }); cash('j27', 52.6, 18); },
  ui() { info('„ICH WERDE DAFÜR BEZAHLT."', 51.9, { y: 380, bg: PAL.green, size: 46 }); },
  sfx: [[51.9, 'pop', 1], [52.6, 'cashReg'], [52.65, 'moneyRain', 0.8]] });

// =====================================================================  ONE YEAR LATER
// ---- 28 · one year later
S(53.04, { tr: 'iris', cam: [[53.04, 540, 960, 1.0], [54.6, 540, 940, 1.12]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); const k = springEase(TT - 53.06, 220, 13); ctx.save(); ctx.translate(540, 980); ctx.scale(k, k); calendarPage(0, 0, 1.25, 'JAHR', 1); ctx.restore(); },
  ui() { info('1 JAHR SPÄTER', 53.1, { y: 360, bg: PAL.orange, size: 62 }); },
  sfx: [[53.1, 'pop', 1], [53.2, 'clockSpin', 0.9]] });
// ---- 29 · Kevin falls asleep standing up (sways, nods off)
S(54.6, { tr: 'whipR', cam: CLOSE(54.6, 56.68),
  draw() { setIsland({ night: 1, blur: 9 }); const sway = Math.sin(TT * 2.2) * 0.12; char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'sad']], emo: [[54.6, 'sad'], [55.2, 'sleepy']], lean: sway, tilt: [[54.6, 0], [55.5, 0.25, 0.5]], extras: { chain: 1, pale: 0.6 } }); if (TT > 55.3) zzz(640, 520); },
  ui() { info('IM STEHEN EINGESCHLAFEN 😴', 55.4, { y: 380, bg: '#3a2f8a', size: 46 }); },
  sfx: [[54.7, 'grunt'], [55.3, 'snore', 1.4], [55.4, 'pop', 1]] });
// ---- 30 · "Nur leider ohne einen Cent dafür zu bekommen." — 0 € pops over him
S(56.68, { tr: 'cut', cam: CLOSE(56.68, 58.88),
  draw() { setIsland({ night: 1, blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'sad']], emo: [[56.68, 'sleepy'], [57.6, 'sad']], tilt: 0.15, extras: { chain: 1, pale: 0.6 } }); zzz(640, 520); },
  ui() { popText('0 €', 540, 420, 57.6, 130, '#ff4545', -0.05, 0); },
  sfx: [[57.6, 'errorBuzz'], [57.8, 'sadTrombone', 0.7]] });
// ---- 31 · then he knocks on Jonas' door
S(58.88, { tr: 'slide', lift: 0, cam: [[58.88, 540, 1000, 1.0], [60.66, 560, 990, 1.06]],
  draw() { setJonasFront(); const x = lerp(-100, 620, EZ.o2(clamp((TT - 58.9) / 0.8))); char('kevin', x, 1255, 0.55, { walk: TT < 59.7 ? 1 : 0, pose: [[58.88, 'idle'], [59.75, 'raiseR'], [59.9, 'pressR', 0.08], [60.05, 'raiseR', 0.08], [60.2, 'pressR', 0.08]], emo: [[0, 'confused']], look: [0.7, 0], extras: { chain: 1, pale: 0.5, sweat: 1 } }); },
  ui() { info('KLOPF KLOPF 🚪', 59.0, { y: 360, size: 54 }); },
  sfx: [[58.9, 'footsteps', 0.8], [59.0, 'pop', 1], [59.9, 'tap'], [60.05, 'tap'], [60.2, 'tap']] });
// ---- 32 · "Okay, Jonas. Wer von uns hat jetzt mehr?" (slow push, vignette)
S(60.66, { tr: 'zoomIn', tense: 1, cam: CLOSE(60.66, 62.82),
  draw() { setJonasFront({ blur: 10 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'idle']], emo: [[0, 'scared']], extras: { chain: 1, pale: 0.5, sweat: 1 } }); },
  ui() { info('„WER HAT JETZT MEHR?"', 61.6, { y: 380, bg: PAL.red, size: 50 }); },
  sfx: [[60.7, 'gulp'], [61.6, 'pop', 1], [62.0, 'heartbeat', 0.9]] });

// =====================================================================  THE QUESTION
// ---- 33 · Kevin: 7,3 million (top half)
S(62.82, { tr: 'glitch', tense: 1, cam: [[62.82, 540, 960, 1.0], [64.88, 540, 960, 1.03]],
  draw() { splitTopBottom(() => { rays('#1d48b8', '#2f6df6', { cy: 560, spin: 0.08 }); char('kevin', 280, 900, 0.62, { pose: [[0, 'idle']], emo: [[0, 'serious']], extras: { chain: 1, pale: 0.4 } }); cash('k33', 63.3, 12); }, () => { rays('#b6302b', '#e8483c', { cy: 1400, spin: -0.08 }); }); },
  ui() { hud('KONTO · KEVIN', [[0, 7.3e6]], { x: 720, y: 560, scale: 0.85, t0: 62.9 }); },
  sfx: [[62.9, 'pop', 1], [63.3, 'cashReg'], [64.0, 'heartbeat', 0.8]] });
// ---- 34 · …and Jonas — and you? (bottom half; his account stays hidden) — cut on the question
S(64.88, { tr: 'cut', tense: 1, cam: [[64.88, 540, 960, 1.0], [69.0, 540, 960, 1.05]], punch: [[65.58, 0.06]],
  draw() { splitTopBottom(() => { rays('#1d48b8', '#2f6df6', { cy: 560, spin: 0.08 }); char('kevin', 280, 900, 0.62, { pose: [[0, 'idle']], emo: [[0, 'serious']], extras: { chain: 1, pale: 0.4 } }); },
    () => { rays('#b6302b', '#e8483c', { cy: 1400, spin: -0.08 }); const k = springEase(TT - 64.9, 200, 14); char('jonasPJ', 280, 1420 + (1 - k) * 500, 0.46, { pose: [[0, 'holdR']], emo: [[0, 'smug']], extras: { glasses: true }, holdR: () => pillow(20, -10, 0.4, -0.2) }); }); },
  ui() { hud('KONTO · KEVIN', [[0, 7.3e6]], { x: 720, y: 560, scale: 0.85 }); if (TT > 64.95) { const k = springEase(TT - 64.95, 260, 14); ctx.save(); ctx.translate(720, 1200); ctx.scale(k * 0.85, k * 0.85); blurCounter(0, 0, 560, 210, 'KONTO · JONAS'); ctx.restore(); }
    info('UND DU? 🤔', 66.34, { y: 960, bg: PAL.yellow, fg: '#1b1530', size: 60 }); },
  sfx: [[64.95, 'pop', 1.2], [65.0, 'glitch'], [65.2, 'coinTicks', 1.0, 4], [66.34, 'pop', 1]] });
