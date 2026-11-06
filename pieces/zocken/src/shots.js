// =====================================================================
//  shots.js — GTA 6 zocken für 1 Euro pro Sekunde vs 1 Million Euro sofort (DE). ~44 shots on the trimmed voice (80.7 s).
//  Subjects in the centre band above the captions; German helper texts; money on screen whenever money is said;
//  Jonas' total is never readable. The game is drawn in the series' flat style (generic wordmark, no official art).
// =====================================================================
const KONTO = [[0, 1e6], [19.7, 992000], [22.5, 842000], [25.3, 800000]];
const hudKevin = (o = {}) => hud('KONTO · KEVIN', KONTO, { ...o });
const KS = { chain: 1, shades: 1 };
function bigArm(id, x0, y0, x1, y1, w = 150) {
  const L = LOOKS[id]; line(x0, y0, x1, y1, w, L.top); line(x0 + w * 0.18, y0, x1 + w * 0.12, y1, w * 0.25, L.topD);
  const a = Math.atan2(y1 - y0, x1 - x0); circ(x1 - Math.cos(a) * w * 0.25, y1 - Math.sin(a) * w * 0.25, w * 0.55, L.topD);
  ctx.save(); ctx.translate(x1 + Math.cos(a) * w * 0.25, y1 + Math.sin(a) * w * 0.25); ctx.rotate(a); circ(0, 0, w * 0.55, L.skin); for (let i = 0; i < 4; i++) circ(w * 0.38, -w * 0.36 + i * w * 0.24, w * 0.16, L.skinD); ctx.restore();
}
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
  if (icon === 'cash') { glow(0, 0, 200, '#a6f0b4', 0.3); briefcase(0, 60, 0.42, 1); } else { gamepad(-70, 10, 0.42); coin(110, 0, 52, { sx: Math.cos(TT * 3), label: '1€' }); }
  ctx.restore();
  tText(big, 0, h / 2 - 92, 46, { color: '#fff', maxW: w - 36 }); tText(sub, 0, h / 2 - 40, 28, { color: 'rgba(255,255,255,0.95)', shadow: false, weight: 800 });
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

// =====================================================================  THE HOOK
// ---- 1 · the two at their buttons and both options — a fast zoom with its swoosh (short riser into the first cut)
S(0.0, { tr: 'cut', lift: 110, cam: [[0, 540, 1020, 1.45], [0.28, 540, 1020, 1.0], [0.75, 540, 1015, 1.03]],
  draw() { setStudio(); char('kevin', 300, FLOOR - 40, 0.8, { emo: [[0, 'grin']], look: [0.4, -0.4] }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'happy']], look: [-0.3, -0.3], extras: { glasses: true } }); studioPodiums(); },
  ui() { tText('WAS NIMMST DU?', 540, 200, 66, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14, maxW: 1000 });
    iconCard(285, 462, 'OPTION 1', 'GTA 6 ZOCKEN', '1 € / SEKUNDE', PAL.pink, 0.03, 'pad'); iconCard(795, 462, 'OPTION 2', '1 MIO. €', 'SOFORT', PAL.green, 0.12, 'cash'); tText('VS', 540, 462, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); },
  sfx: [[0.03, 'pop', 1], [0.12, 'pop', 1.2], [0.4, 'applause', 0.4]] });
// ---- 1b · "GTA 6 zocken" — the neon Vice City title slams in, the gamepad pops up
S(0.75, { tr: 'zoomIn', cam: [[0.75, 540, 960, 1.12], [1.9, 540, 960, 1.0]],
  draw() { setVice(); const k = springEase(TT - 0.78, 260, 12); gtaTitle(500, 760, 1.1, k); gamepad(540, 1230, 1.1 * springEase(TT - 0.95, 240, 13), Math.sin(TT * 3) * 0.06, Math.floor(TT * 6) % 4); },
  ui() { info('ZOCKEN = KASSIEREN?', 1.1, { y: 300, bg: PAL.pink, size: 52 }); },
  sfx: [[0.78, 'bling'], [0.95, 'pop', 1.2], [1.1, 'pop', 1], [1.4, 'click'], [1.6, 'click']] });
// ---- 2 · "...und für jede Sekunde 1 Euro kassieren?" — coin after coin drops into a jar while the gamepad clicks
const DROPS = Array.from({ length: 6 }, (_, k) => 1.95 + k * 0.19);
S(1.9, { tr: 'whipL', cam: [[1.9, 540, 960, 1.04], [3.46, 540, 960, 1.0]],
  draw() { rays('#c4520a', '#e86c0e', { cy: 940 }); glow(540, 1000, 460, '#ffe2a8', 0.4); const n = DROPS.filter((t) => TT > t + 0.57).length; coinJar(540, 1360, 1.0, 0.05 + n * 0.04);
    DROPS.forEach((t0, k) => { if (TT < t0 || TT > t0 + 0.6) return; const R = RNG('drop', k), x = 540 + R.n(70), y = lerp(250, 1120, clamp((TT - t0) / 0.57) ** 2); coin(x, y, 54, { sx: Math.cos(TT * 9 + k), label: '1€' }); });
    stopwatch(850, 760, 0.36 * springEase(TT - 1.92, 220, 13), (TT - 1.92) * 6); gamepad(230, 780, 0.45, -0.2, Math.floor(TT * 8) % 4); },
  ui() { tText('1 € PRO SEKUNDE', 540, 380, 88, { color: '#fff', stroke: '#6a2a00', strokeW: 18, maxW: 1000 }); DROPS.forEach((t) => popText('+1 €', 360, 1000, t + 0.57, 64, '#41f08a', 0, 120)); },
  sfx: [[1.92, 'tick'], ...DROPS.map((t) => [t + 0.57, 'coinJar']), ...DROPS.map((t) => [t, 'tickSoft'])] });
// ---- 3 · "Oder 1 Million Euro sofort?" — the two at their buttons, the cards, cash flies
S(3.46, { tr: 'whipL', lift: 110, cam: [[3.46, 540, 1020, 1.08], [5.7, 540, 1010, 1.0]],
  draw() { setStudio(); char('kevin', 300, FLOOR - 40, 0.8, { emo: [[0, 'grin']], look: [0.4, -0.4] }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'happy']], look: [-0.3, -0.3], extras: { glasses: true } }); studioPodiums(); cash('h3', 4.12, 18); },
  ui() { tText('WAS NIMMST DU?', 540, 200, 66, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14, maxW: 1000 });
    iconCard(285, 462, 'OPTION 1', 'GTA 6 ZOCKEN', '1 € / SEKUNDE', PAL.pink, 3.5, 'pad'); iconCard(795, 462, 'OPTION 2', '1 MIO. €', 'SOFORT', PAL.green, 3.9, 'cash'); tText('VS', 540, 462, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); },
  sfx: [[3.5, 'pop', 1], [3.9, 'pop', 1.2], [4.12, 'cashCannon'], [4.8, 'applause', 0.8]] });

// =====================================================================  JONAS IS FASTER
// ---- 4 · this time Jonas is faster — he slams the pink button before Kevin can move
S(5.7, { tr: 'zoomIn', lift: 90, cam: [[5.7, 760, 1140, 1.45], [7.12, 770, 1100, 1.62]], shake: [[6.5, 20, 0.4]],
  draw() { setStudio({ blur: 3 }); char('kevin', 300, FLOOR - 40, 0.8, { pose: [[5.7, 'idle'], [6.6, 'shrug']], emo: [[5.7, 'grin'], [6.6, 'shock']], look: [0.7, 0.2] });
    char('jonas', 780, FLOOR - 40, 0.8, { pose: [[5.7, 'raiseR'], [6.35, 'slamR', 0.12]], emo: [[5.7, 'grin'], [6.5, 'happy']], look: [0.2, 0.6], extras: { glasses: true } });
    studioPodiums({ pressR: TT > 6.5 ? 1 : 0, litR: TT > 6.5 ? 0.9 : 0 }); impactLines(780, 1250, 120, 380, 12, 6.5); },
  ui() { info('JONAS IST SCHNELLER! ⚡', 6.0, { y: 380, bg: PAL.blue, size: 52 }); },
  sfx: [[5.75, 'whooshUp', 1.2], [6.5, 'slam'], [6.55, 'buzzerWin'], [6.7, 'gasp']] });
// ---- 5 · "Jaaa! Endlich werd ich fürs Zocken bezahlt!" — Jonas jumps for joy, confetti
S(7.12, { tr: 'whipR', cam: CLOSEJ(7.12, 9.78),
  draw() { setStudio({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[7.12, 'cheer'], [8.4, 'armsUp']], emo: [[0, 'laugh']], extras: { glasses: true }, jump: [[7.12, 0], [7.3, 40, 0.12], [7.5, 0, 0.12], [7.75, 40, 0.12], [7.95, 0, 0.12]] }); confetti('cf5', 7.2, 70, { x: 540, y: 500 }); },
  ui() { info('FÜRS ZOCKEN BEZAHLT! 🎮💸', 8.5, { y: 380, bg: PAL.green, size: 46 }); },
  sfx: [[7.15, 'applause', 1.2], [7.3, 'boing'], [7.75, 'boing'], [8.5, 'pop', 1.1], [9.0, 'sparkle']] });
// ---- 6 · Kevin grabs the million with a grin (green button, a briefcase pops up, cash flies)
S(9.78, { tr: 'slide', lift: 90, cam: [[9.78, 330, 1140, 1.45], [11.96, 320, 1090, 1.6]], shake: [[10.3, 16, 0.35]],
  draw() { setStudio({ blur: 3 }); char('jonas', 780, FLOOR - 40, 0.8, { pose: [[0, 'cheer']], emo: [[0, 'laugh']], extras: { glasses: true } });
    const grab = TT > 10.9; char('kevin', 300, FLOOR - 40, 0.8, { pose: [[9.78, 'raiseR'], [10.15, 'slamR', 0.12], [10.6, 'idle'], [10.9, 'holdR', 0.15]], emo: [[9.78, 'smug'], [10.9, 'grin']], look: [0.4, 0.4], holdR: () => (grab ? briefcase(10, 40, 0.3, 0) : null) });
    studioPodiums({ pressL: TT > 10.3 ? 1 : 0, litL: TT > 10.3 ? 0.9 : 0, pressR: 1, litR: 0.6 }); if (TT > 10.35 && !grab) briefcase(330, bounceY(TT - 10.35, 1420, 1290, 4200, 0.3), 0.3, 0); cash('k6', 10.4, 22); },
  ui() { info('1 MILLION! 💰', 10.5, { y: 380, bg: PAL.green, size: 56 }); },
  sfx: [[10.3, 'slam'], [10.4, 'cashCannon'], [10.9, 'swish', 1.1], [11.2, 'cashReg']] });
// ---- 7 · "Zock du ruhig, Bruder." — Kevin waves him off
S(11.96, { tr: 'zoomIn', cam: CLOSE(11.96, 13.4),
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[11.96, 'waveR'], [12.8, 'pointR']], emo: [[0, 'smug']], look: [0.4, 0], holdR: () => briefcase(0, 60, 0.22, 0) }); },
  ui() { info('„ZOCK DU RUHIG" 😏', 12.1, { y: 380, bg: PAL.yellow, fg: '#1b1530', size: 52 }); },
  sfx: [[12.0, 'swish', 1], [12.1, 'pop', 1], [12.9, 'whoosh', 1.1]] });
// ---- 8 · "Ich zock ab jetzt das echte Leben!" — the shades drop on, the city behind
S(13.4, { tr: 'whipL', cam: CLOSE(13.4, 15.22),
  draw() { setStreet({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[13.4, 'hips'], [14.4, 'cheer']], emo: [[13.4, 'smug'], [14.4, 'grin']], extras: { chain: TT > 14.2 ? 1 : 0, shades: clamp((TT - 13.7) / 0.25) } }); cash('k8', 14.5, 18); },
  ui() { info('DAS ECHTE LEBEN 😎', 14.35, { y: 380, bg: PAL.gold, fg: '#1b1530', size: 54 }); },
  sfx: [[13.7, 'whooshDown', 1.2], [14.2, 'bling'], [14.35, 'pop', 1], [14.5, 'moneyRain', 0.9]] });

// =====================================================================  KEVIN SPENDS
// ---- 9 · "Und weil Kevin jetzt Millionär ist, legt er sofort los" — the account, money rain
S(15.22, { tr: 'flash', cam: [[15.22, 540, 1000, 1.45], [18.1, 540, 980, 1.58]],
  draw() { setClub({ blur: 10 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[15.22, 'hips'], [16.5, 'cheer']], emo: [[0, 'grin']], extras: KS }); cash('k9', 15.4, 30); },
  ui() { hudKevin({ y: 300, scale: 1.0, t0: 15.3 }); info('MILLIONÄR 🤑', 16.0, { y: 480, bg: PAL.gold, fg: '#1b1530', size: 52 }); },
  sfx: [[15.3, 'cashReg'], [15.4, 'moneyRain', 1.6], [16.0, 'pop', 1], [17.3, 'whooshUp', 1]] });
// ---- 10 · a gaming room for 8.000 € (RGB, big screen, the chair rolls in)
S(18.1, { tr: 'whipR', lift: 0, cam: [[18.1, 540, 1000, 1.0], [20.28, 540, 980, 1.07]],
  draw() { setGamerRoom(); const k = springEase(TT - 18.15, 200, 14); ctx.save(); ctx.translate(540, 1500 + (1 - k) * 600); gamingDesk(0, 0, 1.0, (x, y, w, h) => gameScreen(x, y, w, h)); ctx.restore(); },
  ui() { hudKevin({ y: 240, scale: 0.82 }); priceTag(540, 620, 0.9 * springEase(TT - 19.5, 300, 12), '8.000 €', -0.08); },
  sfx: [[18.15, 'whooshUp', 0.9], [18.5, 'powerOn'], [19.0, 'click'], [19.5, 'pop', 1], [19.7, 'cashReg']] });
// ---- 11 · a sports car for 150.000 €
S(20.28, { tr: 'whipL', lift: 200, cam: [[20.28, 540, 1150, 1.0], [22.86, 540, 1120, 1.07]],
  draw() { setShowroom(); const x = 540 + 900 * (1 - springEase(TT - 20.32, 110, 16)); supercar(x, 1560, 0.95, { col: '#ff2a8a', wheelSpin: (x - 540) / 98 }); twinkles('s11', 120, 1200, 840, 200, 6, { s: 26 }); },
  ui() { hudKevin({ y: 240, scale: 0.82 }); priceTag(540, 640, 0.9 * springEase(TT - 22.3, 300, 12), '150.000 €', -0.08, PAL.yellow); },
  sfx: [[20.32, 'engine'], [21.3, 'skid'], [22.3, 'pop', 1], [22.5, 'cashReg']] });
// ---- 12 · a party night for 42.000 €
S(22.86, { tr: 'zoomIn', cam: [[22.86, 540, 1000, 1.0], [25.74, 540, 980, 1.06]],
  draw() { setClub(); char('kevin', 540, 1150, 0.75, { pose: [[0, 'cheer']], emo: [[0, 'laugh']], extras: KS, jump: [[22.86, 0], [23.1, 30, 0.12], [23.3, 0, 0.12], [23.55, 30, 0.12], [23.75, 0, 0.12], [24.0, 30, 0.12], [24.2, 0, 0.12]] }); cash('p12', 23.0, 30); },
  ui() { hudKevin({ y: 240, scale: 0.82 }); priceTag(540, 600, 0.9 * springEase(TT - 25.0, 300, 12), '42.000 €', -0.06, PAL.pink); },
  sfx: [[22.9, 'carMusic', 2.8], [23.0, 'moneyRain', 1.2], [23.6, 'applause', 1.2], [25.0, 'pop', 1.1], [25.3, 'cashReg']] });
// ---- 13 · Jonas only buys a PS5 for 650 € (the box drops onto the floor, he hugs it)
S(25.74, { tr: 'slide', lift: 200, cam: [[25.74, 540, 1150, 1.05], [29.54, 540, 1120, 1.14]],
  draw() { setLeoRoom({ blur: 4 }); char('jonas', 360, FLOOR + 40, 0.9, { pose: [[25.74, 'idle'], [27.4, 'cheer']], emo: [[25.74, 'calm'], [27.4, 'happy']], look: [0.7, 0.4], extras: { glasses: true } });
    const y = TT < 26.2 ? -400 : bounceY(TT - 26.2, -400, FLOOR + 40, 5200, 0.2); ps5Box(730, y, 0.85, 0); },
  ui() { info('NUR EINE PS5', 25.9, { y: 380, bg: PAL.blue, size: 54 }); priceTag(560, 640, 0.9 * springEase(TT - 28.4, 300, 12), '650 €', -0.06); },
  sfx: [[25.9, 'pop', 1], [26.2, 'whooshDown', 0.9], [26.55, 'thud'], [27.4, 'ting'], [28.4, 'pop', 1.1], [28.6, 'cashReg']] });
// ---- 14 · "Denn ab jetzt bringt ihm jede Sekunde im Spiel einen Euro." — on the sofa, gamepad in hand, euros pop with every second
S(29.54, { tr: 'zoomIn', lift: 0, cam: [[29.54, 540, 1050, 1.1], [33.12, 540, 1030, 1.2]],
  draw() { setLeoRoom({ blur: 6 }); gameTV(540, 760, 620, 360, (x, y, w, h) => gameScreen(x, y, w, h)); sofa(540, 1580, 1.2); char('jonas', 540, 1520, 0.8, { pose: [[0, 'holdBoth']], emo: [[0, 'happy']], look: [0, -0.6], extras: { glasses: true }, holdR: () => gamepad(-60, -20, 0.22, 0, Math.floor(TT * 8) % 4) }); },
  ui() { plus1(540, 1050, 2, 29.6, 'z14'); info('JEDE SEKUNDE: +1 €', 30.0, { y: 300, bg: PAL.green, size: 52 }); },
  sfx: [[29.6, 'coinTicks', 3.4, 2], [30.0, 'pop', 1], [30.3, 'click'], [31.1, 'click'], [32.0, 'cashReg']] });

// =====================================================================  KEVIN'S LIFE
// ---- 15 · by day Kevin cruises through the city in his sports car
S(33.12, { tr: 'whipR', lift: 0, cam: [[33.12, 540, 1150, 1.0], [36.04, 540, 1130, 1.05]],
  draw() { setStreet(); const x = lerp(-300, 1400, (TT - 33.12) / 2.9); supercar(x, 1420, 0.95, { col: '#ff2a8a', wheelSpin: x / 70, roof: 0 }); ctx.save(); ctx.beginPath(); ctx.rect(-600, -400, 2300, 1730); ctx.clip(); char('kevin', x - 60, 1470, 0.42, { pose: [[0, 'waveR']], emo: [[0, 'grin']], extras: KS }); ctx.restore(); speedLines(14, 0.35, 'sl15'); },
  ui() { info('TAGSÜBER: CRUISEN 😎', 33.2, { y: 380, bg: PAL.yellow, fg: '#1b1530', size: 50 }); },
  sfx: [[33.15, 'engine'], [33.2, 'pop', 1], [34.4, 'carHorn'], [35.2, 'engine']] });
// ---- 16 · "Und nachts?" — night, Kevin in his gaming room, the screen glows
S(36.04, { tr: 'iris', lift: 0, cam: [[36.04, 540, 1050, 1.0], [37.88, 540, 1030, 1.08]],
  draw() { setGamerRoom({ dark: 0.5 }); gameTV(540, 720, 640, 360, (x, y, w, h) => gameNeonStreet(x, y, w, h)); char('kevin', 540, 1560, 0.8, { pose: [[0, 'holdBoth']], emo: [[0, 'grin']], look: [0, -0.6], extras: { chain: 1 }, holdR: () => gamepad(-60, -20, 0.22, 0, Math.floor(TT * 8) % 4) }); },
  ui() { info('UND NACHTS? 🌙', 36.1, { y: 300, bg: '#3a2f8a', size: 54 }); },
  sfx: [[36.1, 'pop', 0.9], [36.3, 'crickets', 0.8], [36.9, 'click'], [37.3, 'click']] });
// ---- 17 · in the game: the neon nightclub (pink lights, a door, music bumping)
S(37.88, { tr: 'zoomIn', lift: 0, cam: [[37.88, 540, 960, 1.0], [39.4, 540, 940, 1.1]],
  draw() { gameTV(540, 960, 980, 1400, (x, y, w, h) => { ctx.save(); ctx.translate(x, y); ctx.scale(w / 1080, h / 1920); setClubInterior(37.88); ctx.restore(); }); },
  ui() { info('IM SPIEL: NACHTCLUB 😏', 38.0, { y: 300, bg: PAL.pink, size: 50 }); },
  sfx: [[37.9, 'carMusic', 1.5], [38.0, 'pop', 1], [38.2, 'applause', 1.0], [38.8, 'popHi', 0.9]] });
// ---- 18 · "Natürlich nur wegen der… Musik." — Kevin, eyebrows up, a guilty grin
S(39.4, { tr: 'cut', tense: 1, cam: CLOSE(39.4, 41.68),
  draw() { setGamerRoom({ blur: 9, dark: 0.4 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'shrug']], emo: [[39.4, 'smug'], [40.5, 'love']], look: [[39.4, [0.6, 0]], [40.5, [0, 0]]], tilt: [[39.4, 0], [40.5, 0.1]], extras: { chain: 1, blush: 1 } }); },
  ui() { info('NUR WEGEN DER MUSIK… 🎵😏', 40.6, { y: 380, bg: PAL.yellow, fg: '#1b1530', size: 46 }); },
  sfx: [[39.45, 'dun'], [40.6, 'pop', 1], [40.9, 'kiss']] });
// ---- 19 · "So lässt es sich leben!" — leaned back in the gaming chair, cash raining
S(41.68, { tr: 'whipR', cam: CLOSE(41.68, 43.64),
  draw() { setGamerRoom({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'cheer']], emo: [[0, 'laugh']], lean: -0.1, extras: KS }); cash('k19', 41.8, 24); },
  ui() { info('„SO LÄSST ES SICH LEBEN!"', 42.2, { y: 380, bg: PAL.gold, fg: '#1b1530', size: 46 }); },
  sfx: [[41.75, 'moneyRain', 1.4], [42.2, 'pop', 1], [42.8, 'bling']] });

// =====================================================================  JONAS STREAMS
// ---- 20 · Jonas plays one hour a day — live: the LIVE badge, the viewer count climbs
S(43.64, { tr: 'glitch', lift: 0, cam: [[43.64, 540, 1000, 1.05], [47.0, 540, 980, 1.14]],
  draw() { setGamerRoom({ blur: 5 }); char('jonas', 540, 1500, 0.85, { pose: [[0, 'holdBoth']], emo: [[0, 'happy']], extras: { glasses: true, headset: 1 }, holdR: () => gamepad(-60, -20, 0.22, 0, Math.floor(TT * 8) % 4) }); fillRR(250, 1300, 580, 40, 10, '#2a2140'); alarmClock(860, 1280, 0.18, { t: TT * 3, label: '1 STD' }); },
  ui() { liveBadge(170, 300, 43.8); viewerCount(860, 300, [[43.64, 120], [45.0, 3400, 1.2], [46.5, 18500, 0.8]]); info('NUR 1 STUNDE AM TAG', 44.3, { y: 450, bg: PAL.blue, size: 50 }); if (TT > 45.8) info('LIVE IM STREAM 🔴', 45.85, { y: 570, bg: PAL.red, size: 46, rot: 0.03 }); },
  sfx: [[43.8, 'liveOn'], [44.3, 'pop', 1], [45.0, 'notify'], [45.85, 'pop', 1.2], [46.3, 'donation']] });
// ---- 21 · in the game: a bank heist with Jason (money bags fly)
S(47.0, { tr: 'whipL', lift: 0, cam: [[47.0, 540, 960, 1.0], [48.32, 540, 950, 1.08]],
  draw() { gameTV(540, 960, 980, 1400, (x, y, w, h) => { gameBank(x, y, w, h); jasonHuman(430, y + h * 0.92, 1.0); for (let i = 0; i < 3; i++) moneyBag(700 + i * 70, y + h * 0.82 - (i % 2) * 40, 0.55); }); },
  ui() { info('BANKÜBERFALL MIT JASON 💰', 47.05, { y: 300, bg: PAL.green, size: 46 }); },
  sfx: [[47.05, 'pop', 1], [47.2, 'alarmRing', 0.9], [47.6, 'cashReg'], [48.0, 'rustle']] });
// ---- 22 · a car chase through Vice City (police lights behind)
S(48.32, { tr: 'whipR', lift: 0, cam: [[48.32, 540, 960, 1.0], [49.98, 540, 960, 1.06]],
  draw() { gameTV(540, 960, 980, 1400, (x, y, w, h) => { gameNeonStreet(x, y, w, h, 0.5); const b = Math.sin(TT * 9) * 6; supercar(600, y + h * 0.66 + b, 0.6, { col: '#ff2a8a', wheelSpin: TT * 30 }); policeCar(200, y + h * 0.68 - b, 0.45, TT * 30); speedLines(12, 0.4, 'sl22'); }); },
  ui() { info('VERFOLGUNGSJAGD 🚔', 48.4, { y: 300, bg: PAL.red, size: 50 }); },
  sfx: [[48.35, 'engine'], [48.4, 'pop', 1], [48.6, 'siren'], [49.4, 'skid']] });
// ---- 23 · "Doch sobald Lucia auftaucht…" — she walks into frame in the neon sunset; the chat starts typing
S(49.98, { tr: 'zoomIn', lift: 0, cam: [[49.98, 540, 1000, 1.0], [53.66, 540, 940, 1.15]], tense: 1,
  draw() { gameTV(540, 960, 980, 1400, (x, y, w, h) => { ctx.save(); ctx.translate(x, y); ctx.scale(w / 1080, h / 1920); setVice(); ctx.restore();
    const wk = TT < 50.9 ? 1 : 0, lx = lerp(900, 540, EZ.o2(clamp((TT - 50.0) / 0.9))); char('lucia', lx, y + h * 0.93, 0.95, { walk: wk, flip: TT < 50.9, pose: [[50.0, 'idle'], [50.95, 'hips']], emo: [[50.0, 'calm'], [51.0, 'smug']], look: [0, 0], tilt: [[50.9, 0], [51.2, -0.06]] });
    if (TT > 50.95) for (let i = 0; i < 4; i++) sparkle(420 + i * 80, y + h * 0.42 + (i % 2) * 60, 26 + 8 * Math.sin(TT * 7 + i), '#fff', TT * 3); }); },
  ui() { info('LUCIA… 😍', 50.5, { y: 300, bg: PAL.pink, size: 58 }); chatFeed(640, 1000, 400, 360, [['max99', 'warte...'], ['lea_x', 'OMG'], ['kev', '???'], ['tom', 'LUCIA 😍'], ['finn', 'WOW']], 51.6, 6); },
  sfx: [[50.0, 'footsteps', 0.9], [50.5, 'pop', 1.1], [50.95, 'choir'], [51.0, 'bling'], [51.6, 'typing', 1.3]] });
// ---- 24 · "LUCIAAA!" — the whole chat explodes, hearts everywhere, viewers skyrocket
S(53.66, { tr: 'flash', cam: [[53.66, 540, 960, 1.0], [54.88, 540, 960, 1.08]], punch: [[53.7, 0.12]],
  draw() { rays('#b8135a', '#ff3d8a', { cy: 960, spin: 0.4 }); chatFlood(53.66, 40); },
  ui() { popText('LUCIAAA! 😍', 540, 820, 53.7, 120, '#ffffff', -0.05, 0); viewerCount(540, 300, [[53.66, 18500], [54.6, 96000, 0.8]]); },
  sfx: [[53.7, 'impact'], [53.75, 'applause', 1.1], [53.8, 'notify'], [54.0, 'notify'], [54.2, 'donation', 1.2], [54.5, 'notify']] });

// =====================================================================  ONE MONTH LATER
// ---- 25 · after one month (the days fly)
S(54.88, { tr: 'spin', cam: [[54.88, 540, 960, 1.0], [56.48, 540, 940, 1.1]],
  draw() { rays('#d4520a', '#ff7a12', { cy: 900, spin: 0.25 }); const d = Math.min(30, 1 + Math.floor(clamp((TT - 54.95) / 1.1) * 29)); ctx.save(); ctx.translate(540, 980); ctx.scale(springEase(TT - 54.9, 220, 13), springEase(TT - 54.9, 220, 13)); calendarPage(0, 0, 1.2, 'TAG', d); ctx.restore(); },
  ui() { info('NACH 1 MONAT…', 54.95, { y: 360, bg: '#141026', size: 58 }); },
  sfx: [[54.95, 'pop', 1], [54.95, 'clockSpin', 1.1], [56.1, 'stamp']] });
// ---- 26 · over 100.000 € — a mountain of cash, the counter stays blurred
S(56.48, { tr: 'zoomIn', cam: [[56.48, 540, 960, 1.0], [58.24, 540, 950, 1.08]],
  draw() { rays('#0e8a45', '#14a956', { cy: 960, spin: 0.2 }); moneyPyramid(540, 1400, 1.1, EZ.o3(clamp((TT - 56.5) / 0.8))); cash('m26', 56.9, 30); },
  ui() { blurCounter(540, 420, 760, 230, 'KONTO · JONAS'); info('ÜBER 100.000 € 💰', 57.0, { y: 640, bg: PAL.gold, fg: '#1b1530', size: 56 }); },
  sfx: [[56.55, 'coinPour', 1.0], [56.9, 'cashCannon'], [57.0, 'pop', 1.1], [57.8, 'cashReg']] });
// ---- 27 · "Und plötzlich lacht Kevin nicht mehr ganz so laut." — his laugh dies down (slow push, vignette)
S(58.24, { tr: 'cut', tense: 1, cam: CLOSE(58.24, 61.12),
  draw() { setGamerRoom({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[58.24, 'laughBelly'], [59.4, 'idle', 0.5]], emo: [[58.24, 'laugh'], [59.3, 'grin'], [60.0, 'confused']], extras: KS, lean: [[58.24, -0.06], [58.5, 0.06, 0.15], [58.8, -0.04, 0.15], [59.2, 0, 0.3]] }); },
  ui() { if (TT > 59.9) info('…NICHT MEHR SO LAUT', 59.95, { y: 380, bg: '#141026', size: 48 }); },
  sfx: [[58.3, 'popHi', 1], [58.6, 'popHi', 0.9], [59.0, 'popHi', 0.75], [59.95, 'dun'], [60.2, 'gulp']] });
// ---- 28 · "Nur eine Stunde?" — Kevin, defensive, pointing
S(61.12, { tr: 'whipL', cam: CLOSE(61.12, 62.42),
  draw() { setGamerRoom({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'pointR']], emo: [[0, 'angry']], extras: KS }); },
  ui() { info('„NUR EINE STUNDE?"', 61.2, { y: 380, bg: PAL.red, size: 54 }); },
  sfx: [[61.15, 'whoosh', 1.2], [61.2, 'pop', 1]] });
// ---- 29 · "Ich zock jede Nacht bis 5 Uhr morgens!" — the clock hits 5:00, Kevin red-eyed at the screen
S(62.42, { tr: 'zoomOut', lift: 0, cam: [[62.42, 540, 1050, 1.0], [64.94, 540, 1030, 1.08]],
  draw() { setGamerRoom({ dark: 0.6 }); gameTV(540, 720, 640, 360, (x, y, w, h) => gameNeonStreet(x, y, w, h)); char('kevin', 540, 1560, 0.8, { pose: [[0, 'holdBoth']], emo: [[0, 'grin']], look: [0, -0.6], extras: { chain: 1, sweat: 1 }, holdR: () => gamepad(-60, -20, 0.22, 0, Math.floor(TT * 10) % 4) });
    ctx.save(); ctx.translate(820, 1020); ctx.scale(springEase(TT - 62.6, 240, 13), springEase(TT - 62.6, 240, 13)); fillRR(-120, -60, 240, 120, 16, '#0d0c14'); tText(TT < 63.7 ? '04:59' : '05:00', 0, 4, 64, { color: '#ff3b4a', shadow: false }); ctx.restore(); },
  ui() { info('BIS 5 UHR MORGENS 😵', 62.5, { y: 300, bg: '#3a2f8a', size: 48 }); },
  sfx: [[62.5, 'pop', 1], [62.6, 'beep'], [63.7, 'beep', 1.2], [63.75, 'alarmRing', 0.4], [64.2, 'click']] });
// ---- 30 · Jonas, deadpan: "Und wie viel hast du dafür bekommen?" (slow push, vignette)
S(64.94, { tr: 'cut', tense: 1, cam: CLOSEJ(64.94, 66.42),
  draw() { setGamerRoom({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[0, 'serious']], tilt: [[64.94, 0], [65.6, 0.06]], extras: { glasses: true } }); },
  ui() { info('„UND WIE VIEL HAST DU BEKOMMEN?"', 65.0, { y: 380, bg: PAL.blue, size: 40 }); popText('0 €', 540, 560, 65.85, 110, '#ff4545', -0.05, 0); },
  sfx: [[65.0, 'pop', 1], [65.85, 'errorBuzz']] });

// =====================================================================  ONE YEAR LATER
// ---- 31 · one year later
S(66.42, { tr: 'iris', cam: [[66.42, 540, 960, 1.0], [67.64, 540, 940, 1.12]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); ctx.save(); ctx.translate(540, 980); const k = springEase(TT - 66.45, 220, 13); ctx.scale(k, k); calendarPage(0, 0, 1.25, 'JAHR', 1); ctx.restore(); },
  ui() { info('1 JAHR SPÄTER', 66.5, { y: 360, bg: PAL.orange, size: 62 }); },
  sfx: [[66.5, 'pop', 1], [66.6, 'clockSpin', 0.9]] });
// ---- 32 · Kevin: eye bags, a hangover, cold pizza, deflated balloons
S(67.64, { tr: 'whipR', lift: 200, cam: [[67.64, 540, 1150, 1.05], [71.02, 540, 1110, 1.16]],
  draw() { setGamerRoom({ blur: 5, dark: 0.3 }); pizzaBox(820, FLOOR + 40, 0.7); for (let i = 0; i < 3; i++) { const bx = 160 + i * 90; line(bx, FLOOR + 40, bx + 10, FLOOR - 120, 3, '#ddd'); ell(bx + 10, FLOOR - 150, 40, 30, ['#ff4fa3', '#ffd23f', '#52b8ff'][i]); }
    char('kevin', 520, FLOOR + 40, 0.92, { pose: [[67.64, 'sad'], [69.0, 'facepalm']], emo: [[67.64, 'sad'], [69.0, 'serious']], extras: { chain: 1, pale: 0.5, sweat: 1 }, lean: 0.08 });
    ctx.save(); ctx.globalAlpha = 0.5; for (let i = 0; i < 3; i++) tText('Z', 620 + i * 30, 700 - ((TT * 40 + i * 40) % 120), 40 + i * 10, { color: '#9f95c9', shadow: false }); ctx.restore(); },
  ui() { info('AUGENRINGE 😵', 67.7, { y: 340, bg: '#141026', size: 50 }); if (TT > 68.6) info('KATER 🤢', 68.65, { y: 460, bg: PAL.green, size: 50, rot: 0.04 }); },
  sfx: [[67.7, 'pop', 0.9], [68.0, 'sadTrombone', 0.6], [68.65, 'pop', 1], [69.3, 'gulp']] });
// ---- 33 · the doorbell — Jonas at Kevin's door
S(71.02, { tr: 'slide', lift: 0, cam: [[71.02, 540, 1000, 1.0], [72.86, 560, 990, 1.06]],
  draw() { setJonasFront(); char('jonas', 760, 1250, 0.55, { pose: [[71.02, 'idle'], [71.4, 'pressR', 0.1], [71.7, 'armsCross']], emo: [[0, 'smug']], look: [-0.7, 0], extras: { glasses: true } }); },
  ui() { info('DING DONG 🔔', 71.1, { y: 360, size: 54 }); },
  sfx: [[71.1, 'pop', 1], [71.45, 'doorbell'], [72.3, 'creak']] });
// ---- 34 · "Na, Kevin? Zeig mir dein Konto, dann zeig ich dir meins." (slow push, vignette)
S(72.86, { tr: 'zoomIn', tense: 1, cam: CLOSEJ(72.86, 75.66),
  draw() { setJonasFront({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[72.86, 'armsCross'], [74.0, 'pointR']], emo: [[0, 'smug']], tilt: [[72.86, 0], [73.3, -0.06]], extras: { glasses: true } }); },
  ui() { info('„ZEIG MIR DEIN KONTO…"', 73.62, { y: 380, bg: PAL.red, size: 48 }); },
  sfx: [[73.62, 'pop', 1], [74.66, 'ting'], [75.0, 'heartbeat', 0.8]] });

// =====================================================================  THE QUESTION
// ---- 35 · Kevin: 800.000 € (top half)
S(75.66, { tr: 'glitch', tense: 1, cam: [[75.66, 540, 960, 1.0], [77.98, 540, 960, 1.03]],
  draw() { splitTopBottom(() => { rays('#1d48b8', '#2f6df6', { cy: 560, spin: 0.08 }); char('kevin', 280, 900, 0.62, { pose: [[0, 'hips']], emo: [[0, 'serious']], extras: KS }); cash('k35', 76.46, 14); }, () => { rays('#b6302b', '#e8483c', { cy: 1400, spin: -0.08 }); }); },
  ui() { hud('KONTO · KEVIN', [[0, 8e5]], { x: 720, y: 560, scale: 0.85, t0: 75.7 }); },
  sfx: [[75.7, 'pop', 1], [76.46, 'cashReg'], [77.0, 'heartbeat', 1.0]] });
// ---- 36 · ...and Jonas? (bottom half; his account stays hidden) — cut on the question
S(77.98, { tr: 'cut', tense: 1, cam: [[77.98, 540, 960, 1.0], [81.0, 540, 960, 1.05]], punch: [[78.9, 0.06]],
  draw() { splitTopBottom(() => { rays('#1d48b8', '#2f6df6', { cy: 560, spin: 0.08 }); char('kevin', 280, 900, 0.62, { pose: [[0, 'hips']], emo: [[0, 'serious']], extras: KS }); },
    () => { rays('#b6302b', '#e8483c', { cy: 1400, spin: -0.08 }); const k = springEase(TT - 78.0, 200, 14); char('jonas', 280, 1420 + (1 - k) * 500, 0.46, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], extras: { glasses: true } }); }); },
  ui() { hud('KONTO · KEVIN', [[0, 8e5]], { x: 720, y: 560, scale: 0.85 }); if (TT > 78.05) { const k = springEase(TT - 78.05, 260, 14); ctx.save(); ctx.translate(720, 1200); ctx.scale(k * 0.85, k * 0.85); blurCounter(0, 0, 560, 210, 'KONTO · JONAS'); ctx.restore(); }
    info('WIE VIEL HAT JONAS? 🤔', 78.9, { y: 960, bg: PAL.yellow, fg: '#1b1530', size: 54 }); },
  sfx: [[78.05, 'pop', 1.2], [78.1, 'glitch'], [78.3, 'coinTicks', 1.8, 4], [78.9, 'pop', 1]] });
