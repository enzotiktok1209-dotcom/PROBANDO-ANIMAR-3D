// =====================================================================
//  shots.js — 30 Millionen sofort vs 1 € pro Sekunde, 1 Jahr. 37 shots on the trimmed voice (67.2 s) + end card.
//  Every helper text on screen is German; every subject sits in the centre band (y 300–1350), above the captions.
// =====================================================================
const KONTO = [[0, 30e6], [25.3, 21e6], [26.1, 13.5e6], [27.0, 5.5e6], [46.7, 4.4e6], [48.3, 3.6e6], [50.8, 2.9e6], [58.3, 2.3e6]];
const hudKevin = (o = {}) => hud('KONTO · KEVIN', KONTO, { ...o });
const KX = { chain: 1 };

// ---- helpers
function bigArm(id, x0, y0, x1, y1, w = 150, open = false) {
  const L = LOOKS[id]; line(x0, y0, x1, y1, w, L.top); line(x0 + w * 0.18, y0, x1 + w * 0.12, y1, w * 0.25, L.topD);
  const a = Math.atan2(y1 - y0, x1 - x0); circ(x1 - Math.cos(a) * w * 0.25, y1 - Math.sin(a) * w * 0.25, w * 0.55, L.topD);
  ctx.save(); ctx.translate(x1 + Math.cos(a) * w * 0.25, y1 + Math.sin(a) * w * 0.25); ctx.rotate(a);
  if (open) { fillRR(-w * 0.4, -w * 0.55, w * 0.95, w * 1.1, w * 0.4, L.skin); for (let i = 0; i < 4; i++) fillRR(w * 0.4, -w * 0.5 + i * w * 0.28, w * 0.5, w * 0.22, w * 0.11, L.skin); fillRR(-w * 0.1, -w * 0.85, w * 0.45, w * 0.3, w * 0.15, L.skin); }
  else { circ(0, 0, w * 0.55, L.skin); for (let i = 0; i < 4; i++) circ(w * 0.38, -w * 0.36 + i * w * 0.24, w * 0.16, L.skinD); }
  ctx.restore();
}
function popText(str, x, y, t0, size, col, rot = 0, rise = 40) { if (TT < t0) return; const k = springEase(TT - t0, 300, 12); ctx.save(); ctx.translate(x, y - (TT - t0) * rise); ctx.rotate(rot); ctx.scale(k, k); tText(str, 0, 0, size, { color: col, stroke: '#1b0f2e', strokeW: size * 0.2 }); ctx.restore(); }
function priceTag(x, y, s, txt, rot = -0.1, col = '#ffffff') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot + Math.sin(TT * 2) * 0.03); ctx.scale(s, s); line(-170, -70, -250, -150, 5, '#ddd'); poly([[-170, -80], [220, -80], [220, 80], [-170, 80], [-230, 0]], col); circ(-185, 0, 14, '#1b1530'); tText(txt, 30, 4, 70, { color: '#1b1530', shadow: false, maxW: 360 }); ctx.restore(); }
function iconCard(x, y, top, big, sub, col, t0, icon) {
  if (TT < t0) return; const k = springEase(TT - t0, 260, 15), w = 450, h = 380;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  fillRR(-w / 2 + 8, -h / 2 + 12, w, h, 28, 'rgba(0,0,0,0.38)'); fillRR(-w / 2, -h / 2, w, h, 28, col); fillRR(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 22, shade(col, 0.12));
  tText(top, 0, -h / 2 + 36, 26, { color: 'rgba(255,255,255,0.9)', shadow: false, letter: 3, weight: 800 });
  fillRR(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18, 'rgba(10,8,30,0.30)');
  const ik = springEase(TT - t0 - 0.12, 280, 12), bob = Math.sin(TT * 3 + x) * 4;
  ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18); ctx.clip(); ctx.translate(0, -h / 2 + 150 + bob); ctx.scale(ik, ik);
  if (icon === 'cash') { glow(0, 0, 200, '#a6f0b4', 0.35); briefcase(0, 70, 0.42, 1); }
  else { stopwatch(-60, 0, 0.28, TT * 10); coin(110, 10, 40, { sx: Math.cos(TT * 4), label: '1€' }); }
  ctx.restore();
  tText(big, 0, h / 2 - 92, 50, { color: '#fff', maxW: w - 36 }); tText(sub, 0, h / 2 - 40, 28, { color: 'rgba(255,255,255,0.95)', shadow: false, weight: 800 });
  ctx.restore();
}
function info(str, t0, o = {}) { sticker(str, o.x ?? 540, o.y ?? 400, t0, { bg: o.bg ?? '#141026', fg: o.fg, size: o.size ?? 54, rot: o.rot ?? -0.03 }); }

// ---- 1 · the choice
S(0.0, { tr: 'cut', lift: 110, cam: [[0, 540, 1020, 1.0], [0.95, 540, 1010, 1.03]],
  draw() { setStudio(); char('kevin', 300, FLOOR - 40, 0.8, { emo: [[0, 'grin']], look: [0.4, -0.4], jump: [[0, 0], [0.3, 16, 0.12], [0.45, 0, 0.12]] }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']], look: [-0.3, -0.3] }); studioPodiums(); },
  ui() { tText('MILLIONEN ODER SEKUNDEN?', 540, 200, 60, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14, maxW: 1000 });
    iconCard(285, 462, 'OPTION 1', '30 MILLIONEN', 'SOFORT', PAL.green, 0.03, 'cash'); iconCard(795, 462, 'OPTION 2', '1 € / SEKUNDE', '1 JAHR LANG', PAL.orange, 0.15, 'watch'); tText('VS', 540, 462, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); },
  sfx: [[0.0, 'sting'], [0.03, 'pop', 1], [0.15, 'pop', 1.2]] });
// ---- 2 · insert: 30 million, right now
S(0.95, { tr: 'zoomIn', cam: [[0.95, 540, 960, 1.0], [1.9, 540, 960, 1.1]],
  draw() { rays('#0e8a45', '#14a956', { cy: 940 }); briefcase(540, 1200, 1.3, EZ.o3(clamp((TT - 1.0) / 0.4))); billRain('m2', 1.1, 30, { burst: [540, 1000], spread: 0.3, w: 120 }); },
  ui() { const k = springEase(TT - 1.0, 300, 14); ctx.save(); ctx.translate(540, 470); ctx.scale(k, k); tText('30.000.000 €', 0, 0, 120, { color: '#fff', stroke: '#064d26', strokeW: 22, maxW: 1000 }); ctx.restore(); },
  sfx: [[1.0, 'cashReg'], [1.05, 'moneyRain', 0.8]] });
// ---- 3 · insert: 1 € every second (stopwatch, a coin per tick)
S(1.9, { tr: 'whipL', cam: [[1.9, 540, 960, 1.08], [3.3, 540, 960, 1.0]],
  draw() { rays('#e86c0e', '#ff8a1e', { cy: 940 }); stopwatch(540, 960, 1.15, (TT - 1.9) * 8);
    for (let i = 0; i < 6; i++) { const t0 = 2.0 + i * 0.22, y = bounceY(TT - t0, 300, 1430, 4800, 0.3); if (TT > t0) coin(300 + i * 95, y, 44, { sx: Math.cos(TT * 5 + i), label: '1€' }); } },
  ui() { tText('1 € PRO SEKUNDE', 540, 380, 96, { color: '#fff', stroke: '#7a2a00', strokeW: 20, maxW: 1000 }); },
  sfx: [[2.0, 'tick'], [2.22, 'coin', 1.4], [2.44, 'tick'], [2.66, 'coin', 1.5], [2.88, 'tick'], [3.1, 'coin', 1.6]] });
// ---- 4 · insert: for one whole year
S(3.3, { tr: 'flash', cam: [[3.3, 540, 960, 1.0], [4.7, 540, 940, 1.08]],
  draw() { rays('#c4520a', '#e86c0e', { cy: 900 }); const flips = [3.4, 3.6, 3.8, 4.0, 4.2], n = flips.filter((t) => TT >= t).length; calendarPage(540, 980, 1.2, ['JAN', 'MÄR', 'JUN', 'SEP', 'NOV', 'DEZ'][n], ['1', '1', '1', '1', '1', '31'][n]); },
  ui() { info('1 JAHR LANG', 4.05, { y: 360, bg: PAL.purple, size: 64 }); },
  sfx: [[3.4, 'flip'], [3.6, 'flip', 1.1], [3.8, 'flip', 1.2], [4.0, 'flip', 1.3], [4.2, 'flip', 1.4], [4.05, 'pop', 1]] });
// ---- 5 · Kevin didn't even do the maths
S(4.7, { tr: 'whipR', lift: 90, cam: [[4.7, 320, 1140, 1.55], [6.6, 310, 1110, 1.7]], shake: [[5.5, 18, 0.35]],
  draw() { setStudio({ blur: 3 }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']] });
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[4.7, 'idle'], [5.0, 'raiseR'], [5.35, 'slamR']], emo: [[4.7, 'grin'], [5.35, 'angry'], [5.8, 'smug']], look: [0.4, 0.6] });
    studioPodiums({ pressL: TT > 5.5 ? 1 : 0, litL: TT > 5.5 ? 0.8 : 0 }); impactLines(300, 1250, 120, 380, 12, 5.5);
    if (TT > 5.0 && TT < 5.5) { ctx.save(); ctx.globalAlpha = 0.9; calculatorMini(560, 820, 0.35); ctx.restore(); } },
  ui() { info('OHNE NACHZURECHNEN!', 5.6, { y: 380, bg: PAL.red, size: 54 }); },
  sfx: [[5.0, 'whooshUp', 1.2], [5.5, 'slam'], [5.6, 'buzzerWin']] });
function calculatorMini(x, y, s) { calculator(x, y, s, '?', false, -1); line(x - 90, y - 120, x + 90, y + 120, 18, PAL.red); line(x + 90, y - 120, x - 90, y + 120, 18, PAL.red); }
// ---- 6 · he takes the 30 million
S(6.6, { tr: 'cut', cam: [[6.6, 540, 1000, 1.25], [8.62, 540, 980, 1.35]],
  draw() { setStudio({ blur: 6 }); char('kevin', 540, FLOOR + 60, 0.95, { pose: [[0, 'holdBoth']], emo: [[6.6, 'shock'], [7.4, 'grin']], look: [0, 0.5], holdR: () => {}, holdL: () => {} });
    const open = EZ.o3(clamp((TT - 7.5) / 0.4)); briefcase(540, FLOOR - 300, 0.62, open); if (open > 0) confetti('c6', 7.6, 50, { x: 540, y: 900 }); },
  ui() { hudKevin({ y: 260, t0: 7.3 }); info('30 MILLIONEN!', 7.9, { y: 470, bg: PAL.green, size: 60 }); },
  sfx: [[7.5, 'creak', 1.3], [7.6, 'cashCannon'], [7.9, 'pop', 1]] });
// ---- 7 · HAHAHA
S(8.62, { tr: 'flash', lift: 280, cam: [[8.62, 540, 1080, 1.1], [9.68, 540, 1050, 1.18]],
  draw() { setStudio(); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'neutral']], look: [-0.7, -0.2] });
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[0, 'armsUp']], emo: [[0, 'laugh']], jump: [[8.62, 0], [8.72, 150, 0.2], [8.97, 0, 0.18], [9.2, 100, 0.18], [9.45, 0, 0.18]] }); studioPodiums({ litL: 0.5 }); billRain('r7', 8.4, 30, { spread: 1.2 }); },
  ui() { popText('HAHAHA!', 330, 560, 8.7, 92, PAL.yellow, -0.1, 30); },
  sfx: [[8.72, 'boing'], [9.2, 'boing'], [8.65, 'applause', 1.0]] });
// ---- 8 · "1 euro? That won't even buy me a bread roll!"
S(9.68, { tr: 'whipL', cam: [[9.68, 540, 1000, 1.65], [12.7, 540, 980, 1.78]],
  draw() { setStudio({ blur: 8 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[9.68, 'holdR'], [11.0, 'shrug']], emo: [[9.68, 'smug'], [11.0, 'laugh']], look: [0.4, 0], holdR: () => coin(0, -40, 34, { sx: 1, label: '1€' }) });
    if (TT > 11.9) { const k = springEase(TT - 11.9, 280, 12); ctx.save(); ctx.translate(820, 760); ctx.scale(k * 0.8, k * 0.8); broetchen(0, 0, 1); ctx.restore(); } },
  ui() { info('1 € = 1 BRÖTCHEN?', 11.95, { y: 400, bg: PAL.orange, size: 54 }); },
  sfx: [[9.72, 'coin', 1.4], [11.0, 'swish', 0.8], [11.95, 'pop', 1]] });
// ---- 9 · Jonas, calm, takes the seconds
S(12.7, { tr: 'whipR', lift: 90, cam: [[12.7, 780, 1150, 1.6], [15.15, 780, 1170, 1.72]],
  draw() { setStudio({ blur: 3 }); char('kevin', 300, FLOOR - 40, 0.8, { pose: [[0, 'cheer']], emo: [[0, 'laugh']] });
    char('jonas', 780, FLOOR - 40, 0.8, { pose: [[12.7, 'idle'], [13.3, 'raiseR'], [13.85, 'pressR']], emo: [[12.7, 'calm'], [14.2, 'happy']], look: [[12.7, [0, 0.2]], [13.3, [0.2, 0.7]]] });
    studioPodiums({ pressR: TT > 14.1 ? 0.6 : 0, litR: TT > 14.1 ? 0.6 : 0 }); if (TT > 14.1) twinkles('j9', 650, 1050, 260, 200, 6, { s: 22 }); },
  ui() { info('DIE SEKUNDEN', 14.5, { x: 780, y: 420, bg: PAL.orange, size: 52 }); },
  sfx: [[13.3, 'swish', 0.7], [14.1, 'click'], [14.16, 'ding'], [14.5, 'pop', 1.1]] });
// ---- 10 · Kevin laughs at him
S(15.15, { tr: 'whipL', lift: 280, cam: [[15.15, 540, 1080, 1.15], [17.6, 540, 1060, 1.22]],
  draw() { setStudio({ blur: 2 }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'serious']], look: [-0.6, 0] });
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[15.15, 'laughBelly'], [16.3, 'pointR']], emo: [[0, 'laugh']], lean: [[15.15, -0.08], [15.4, 0.06, 0.2], [15.65, -0.04, 0.2]] }); studioPodiums(); },
  ui() { popText('HA', 200, 560, 15.3, 70, PAL.yellow, -0.2); popText('HA', 420, 470, 15.6, 70, PAL.yellow, 0.1); popText('HA', 260, 380, 15.9, 70, PAL.yellow); },
  sfx: [[15.3, 'popHi', 1], [15.6, 'popHi', 1.15], [15.9, 'popHi', 1.3], [16.3, 'swish']] });
// ---- 11 · second 1: 1 euro
S(17.6, { tr: 'zoomIn', cam: [[17.6, 540, 960, 1.0], [19.6, 540, 960, 1.08]],
  draw() { rays('#0c7a3e', '#11954c', { cy: 940 }); stopwatch(540, 880, 0.9, TT > 18.5 ? 1 : 0); const y = bounceY(TT - 18.3, 200, 1360, 4800, 0.35); if (TT > 18.3) coin(540, y, 80, { sx: Math.cos(TT * 6), label: '1€' }); },
  ui() { info('SEKUNDE 1', 17.7, { y: 330, size: 58 }); if (TT > 18.5) tText('+1 €', 820, 640, 90, { color: '#41f08a', stroke: '#063d1e', strokeW: 16 }); },
  sfx: [[17.7, 'pop', 1], [18.5, 'tick'], [18.55, 'coinBounce']] });
// ---- 12 · Kevin laughs
S(19.6, { tr: 'cut', cam: [[19.6, 540, 1000, 1.7], [20.42, 540, 990, 1.78]],
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'laughBelly']], emo: [[0, 'laugh']], lean: [[19.6, -0.06], [19.85, 0.06, 0.15], [20.1, -0.04, 0.15]] }); },
  ui() { popText('LOL', 820, 560, 19.7, 70, PAL.yellow, 0.1, 20); },
  sfx: [[19.7, 'popHi', 1.2]] });
// ---- 13 · minute 1 (the hand sweeps a full turn, coins pour)
S(20.42, { tr: 'whipR', cam: [[20.42, 540, 960, 1.0], [21.55, 540, 960, 1.06]],
  draw() { rays('#0c7a3e', '#11954c', { cy: 940 }); stopwatch(540, 860, 0.9, clamp((TT - 20.45) / 0.9) * 60);
    for (let i = 0; i < 24; i++) { const t0 = 20.5 + i * 0.035; if (TT > t0) coin(300 + (i % 8) * 70, Math.min(1420, 300 + (TT - t0) * 2600) - Math.floor(i / 8) * 50, 34, { sx: Math.cos(TT * 6 + i), label: '1€' }); } },
  ui() { info('MINUTE 1', 20.45, { y: 330, size: 58 }); },
  sfx: [[20.45, 'clockSpin', 0.9], [20.5, 'coinPour', 0.9]] });
// ---- 14 · Kevin still laughing
S(21.55, { tr: 'cut', lift: 280, cam: [[21.55, 540, 1080, 1.15], [22.78, 540, 1060, 1.2]],
  draw() { setStudio({ blur: 2 }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']], look: [-0.6, 0] }); char('kevin', 300, FLOOR - 40, 0.8, { pose: [[0, 'laughBelly']], emo: [[0, 'laugh']], lean: [[21.55, -0.1], [21.8, 0.08, 0.15], [22.05, -0.06, 0.15], [22.3, 0.04, 0.15]] }); studioPodiums(); },
  ui() { info('IMMER NOCH 😂', 22.0, { x: 300, y: 400, bg: PAL.yellow, fg: '#1b1530', size: 50 }); },
  sfx: [[22.0, 'pop', 1.1], [21.6, 'popHi', 1.4]] });
// ---- 15 · because he thought he had won
S(22.78, { tr: 'zoomOut', cam: [[22.78, 540, 1000, 1.6], [25.2, 540, 980, 1.7]],
  draw() { setDaniRoom({ blur: 8 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[22.78, 'holdBoth'], [24.0, 'cheer']], emo: [[0, 'grin']], extras: { shades: clamp((TT - 23.2) / 0.3) }, holdR: () => {}, holdL: () => {} }); billRain('r15', 23.9, 24, { spread: 1.2 }); },
  ui() { hudKevin({ y: 260, scale: 0.85 }); info('„SCHON GEWONNEN!"', 23.98, { y: 470, bg: PAL.green, size: 52 }); },
  sfx: [[23.25, 'bling'], [23.98, 'pop', 1], [24.0, 'moneyRain', 1.0]] });
// ---- 16-18 · villa, yacht, private jet (the account drops each time)
function buyShot(t0, tr, draw, label, at) {
  S(t0, { tr, cam: [[t0, 540, 960, 1.0], [t0 + 1.0, 540, 960, 1.06]],
    draw, ui() { hudKevin({ y: 260, scale: 0.85 }); info(label, at, { y: 460, bg: PAL.red, size: 52 }); },
    sfx: [[at, 'cashReg'], [at + 0.03, 'pop', 1]] });
}
buyShot(25.2, 'whipL', () => { ctx.fillStyle = lin(0, 0, 0, 1400, [[0, '#7cc6ff'], [1, '#d8f0ff']]); ctx.fillRect(-600, -400, 2300, 1800); ctx.fillStyle = '#9fd28a'; ctx.fillRect(-600, 1300, 2300, 900); const k = springEase(TT - 25.22, 200, 14); ctx.save(); ctx.translate(540, 1300); ctx.scale(k, k); villa(0, 0, 0.75); ctx.restore(); }, 'VILLA  −9 MIO. €', 25.3);
buyShot(26.0, 'whipR', () => { ctx.fillStyle = lin(0, 0, 0, 1400, [[0, '#7cc6ff'], [1, '#bfe9ff']]); ctx.fillRect(-600, -400, 2300, 1800); ctx.fillStyle = '#2f8fd8'; ctx.fillRect(-600, 1150, 2300, 900); for (let i = 0; i < 6; i++) line(-100 + i * 240 + Math.sin(TT * 2 + i) * 20, 1250 + (i % 2) * 80, 60 + i * 240, 1250 + (i % 2) * 80, 8, 'rgba(255,255,255,0.5)'); yacht(540 + Math.sin(TT * 2) * 6, 1150 + Math.sin(TT * 3) * 8, 2.0); }, 'YACHT  −7,5 MIO. €', 26.1);
buyShot(26.9, 'whipL', () => { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#4aa8ff'], [1, '#d8f0ff']]); ctx.fillRect(-600, -400, 2300, 2800); for (let i = 0; i < 4; i++) ell(((i * 340 - TT * 300) % 1600 + 1600) % 1600 - 260, 500 + i * 220, 140, 40, '#ffffff'); privateJet(540, 960, 0.95, -0.08); }, 'PRIVATJET  −8 MIO. €', 27.0);
// ---- 19 · "I'm the richest man in town!"
S(27.6, { tr: 'flash', cam: [[27.6, 540, 1000, 1.6], [30.25, 540, 980, 1.75]], punch: [[28.78, 0.15]],
  draw() { setDaniRoom({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[27.6, 'hips'], [28.7, 'cheer']], emo: [[0, 'grin']], extras: { chain: 1, shades: 1 } }); billRain('r19', 27.4, 30, { spread: 2 }); },
  ui() { hudKevin({ y: 260, scale: 0.85 }); info('REICHSTER MANN DER STADT', 28.8, { y: 460, bg: PAL.gold, fg: '#1b1530', size: 46 }); },
  sfx: [[28.8, 'bassDrop'], [28.85, 'pop', 0.9], [27.65, 'moneyRain', 1.8]] });
// ---- 20 · meanwhile Jonas sleeps
S(30.25, { tr: 'zoomIn', cam: [[30.25, 540, 1000, 1.0], [31.9, 540, 990, 1.08]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#0f1440'], [1, '#2a2160']]); ctx.fillRect(-600, -400, 2300, 2800); windowFrame(640, 260, 320, 320, () => { ctx.fillStyle = '#0b1030'; ctx.fillRect(640, 260, 320, 320); circ(860, 360, 50, '#fff3c0'); });
    sleepingJonas(540, 1180, 0.95); fillRR(940, 1060, 120, 160, 10, '#5a3a20'); phone(1000, 1010, 0.35, 0.1, () => { ctx.fillStyle = '#0b1030'; ctx.fillRect(-84, -176, 168, 352); tText('€ ↑', 0, 0, 50, { color: '#41f08a', shadow: false }); }); },
  ui() { info('WÄHRENDDESSEN…', 30.3, { y: 360, size: 54 }); },
  sfx: [[30.3, 'pop', 0.9], [30.6, 'snore', 1.3]] });
// ---- 21 · ...but his counter keeps running (unreadable on purpose)
S(31.9, { tr: 'cut', cam: [[31.9, 540, 960, 1.0], [33.5, 540, 960, 1.08]],
  draw() { rays('#0c7a3e', '#11954c', { cy: 940 }); for (let i = 0; i < 18; i++) { const u = ((TT * 0.9 + i / 18) % 1); coin(160 + (i * 211) % 760, 300 + u * 1200, 36, { sx: Math.cos(TT * 5 + i), label: '1€' }); } blurCounter(540, 930, 820, 300, 'KONTO · JONAS'); },
  ui() { info('DER ZÄHLER LÄUFT', 32.0, { y: 400, bg: PAL.green, size: 54 }); },
  sfx: [[32.0, 'pop', 1], [32.1, 'tickRun', 1.3]] });
// ---- 22 · day and night (sun and moon race across the sky)
S(33.5, { tr: 'whipL', cam: [[33.5, 540, 960, 1.0], [34.75, 540, 960, 1.05]],
  draw() { const u = clamp((TT - 33.5) / 1.2), day = Math.sin(u * TAU) > 0; ctx.fillStyle = day ? lin(0, 0, 0, 1400, [[0, '#7cc6ff'], [1, '#ffe6b0']]) : lin(0, 0, 0, 1400, [[0, '#0b1030'], [1, '#2a2160']]); ctx.fillRect(-600, -400, 2300, 1800);
    const a = Math.PI + u * TAU * 2; circ(540 + Math.cos(a) * 420, 1100 + Math.sin(a) * 600, 90, day ? '#fff1a0' : '#e8ecff'); houseIcon(540, 1380, 0.85, day ? 0 : 1); ctx.fillStyle = '#3d7a3a'; ctx.fillRect(-600, 1380, 2300, 700); },
  ui() { info('TAG UND NACHT', 33.55, { y: 360, size: 54 }); },
  sfx: [[33.55, 'whoosh', 0.8], [34.1, 'whoosh', 1.1]] });
// ---- 23 · every single second
S(34.75, { tr: 'whipR', cam: [[34.75, 540, 960, 1.0], [36.45, 540, 940, 1.12]],
  draw() { rays('#e86c0e', '#ff8a1e', { cy: 940 }); stopwatch(540, 900, 1.1, (TT - 34.75) * 2); const n = Math.floor((TT - 34.75) * 3); for (let i = 0; i < Math.min(n, 5); i++) { const t0 = 34.75 + i / 3; coin(540, bounceY(TT - t0, 1300, 1440, 4800, 0.3), 46, { label: '1€', sx: Math.cos(TT * 6 + i) }); } },
  ui() { info('JEDE SEKUNDE: +1 €', 34.8, { y: 330, bg: PAL.green, size: 54 }); },
  sfx: [[35.1, 'tick'], [35.43, 'tick'], [35.76, 'tick'], [36.09, 'tick'], [35.12, 'coin', 1.5], [35.78, 'coin', 1.6]] });
// ---- 24 · 6 months later: Kevin drops by
S(36.45, { tr: 'zoomOut', lift: 260, cam: [[36.45, 540, 1150, 1.0], [38.5, 560, 1130, 1.08]],
  draw() { setLeoRoom(); char('jonas', 800, FLOOR + 40, 0.88, { emo: [[0, 'calm']], look: [-0.6, 0], extras: { glasses: true } }); const x = lerp(-150, 300, EZ.o2(clamp((TT - 36.5) / 1.3)));
    char('kevin', x, FLOOR + 40, 0.9, { pose: [[0, 'hips']], emo: [[0, 'smug']], look: [0.6, 0], walk: [[36.45, 1], [37.8, 0]], extras: { chain: 1, shades: 1 } }); },
  ui() { info('6 MONATE SPÄTER', 36.5, { y: 360, size: 56 }); },
  sfx: [[36.5, 'pop', 1], [36.55, 'footsteps', 1.3]] });
// ---- 25 · "So? How much do you have? I had 30 million!"
S(38.5, { tr: 'cut', cam: [[38.5, 540, 1000, 1.65], [41.35, 540, 980, 1.8]],
  draw() { setLeoRoom({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[38.5, 'pointR'], [39.7, 'hips']], emo: [[38.5, 'smug'], [39.7, 'grin']], look: [0.5, 0], extras: { chain: 1, shades: 1 } }); },
  ui() { info('„ICH HATTE 30 MIO.!"', 40.1, { y: 400, bg: PAL.green, size: 52 }); },
  sfx: [[38.55, 'swish', 0.9], [40.1, 'pop', 1]] });
// ---- 26 · "HAD. Have you checked your account?"
S(41.35, { tr: 'zoomIn', cam: [[41.35, 540, 1000, 1.75], [43.8, 540, 980, 1.9]],
  draw() { setLeoRoom({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[41.35, 'armsCross'], [42.3, 'pointL']], emo: [[0, 'smug']], look: [-0.3, 0], extras: { glasses: true } }); },
  ui() { info('HATTE.', 41.45, { y: 380, bg: PAL.red, size: 80, rot: -0.06 }); },
  sfx: [[41.45, 'stamp'], [42.3, 'swish', 0.8]] });
// ---- 27 · "What for? 30 million doesn't just disappear!"
S(43.8, { tr: 'whipL', cam: [[43.8, 540, 1000, 1.65], [46.45, 540, 980, 1.78]],
  draw() { setLeoRoom({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[43.8, 'shrug'], [45.0, 'laughBelly']], emo: [[43.8, 'smug'], [45.0, 'laugh']], extras: { chain: 1, shades: 1 } }); },
  ui() { info('„WOZU?"', 43.9, { y: 380, bg: PAL.yellow, fg: '#1b1530', size: 64 }); },
  sfx: [[43.9, 'pop', 1.1], [45.0, 'popHi', 1.2]] });
// ---- 28-29 · the running costs pile up
S(46.45, { tr: 'slide', cam: [[46.45, 540, 960, 1.0], [48.0, 540, 980, 1.06]],
  draw() { setDark('#3a1020', '#0a0408'); villa(540, 1400, 0.6, 0);
    const R = RNG('bills28'); for (let i = 0; i < 10; i++) { const t0 = 46.55 + i * 0.12, x = 260 + R.f() * 560, y = bounceY(TT - t0, -300, 1050 - (i % 4) * 40, 3600, 0.2); if (TT > t0) letter(x, y, 0.45, ['STROM', 'PERSONAL', 'POOL', 'STEUER'][i % 4], ['12.000 €', '40.000 €', '8.000 €', '90.000 €'][i % 4], R.n(0.4)); } },
  ui() { hudKevin({ y: 260, scale: 0.85 }); info('KOSTEN: VILLA', 46.6, { y: 460, bg: PAL.red, size: 50 }); },
  sfx: [[46.55, 'paperPile', 1.3], [46.7, 'cashReg', 0.7]] });
S(48.0, { tr: 'whipR', cam: [[48.0, 540, 960, 1.0], [50.45, 540, 960, 1.08]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#4aa8ff'], [1, '#d8f0ff']]); ctx.fillRect(-600, -400, 2300, 2800); yacht(320, 1050, 1.2); privateJet(700, 700, 0.55, -0.05);
    const R = RNG('bills29'); for (let i = 0; i < 8; i++) { const t0 = 48.1 + i * 0.15, x = 240 + R.f() * 600, y = bounceY(TT - t0, -300, 1250 - (i % 4) * 40, 3600, 0.2); if (TT > t0) letter(x, y, 0.42, ['HAFEN', 'PILOT', 'KEROSIN', 'CREW'][i % 4], ['40.000 €', '25.000 €', '60.000 €', '35.000 €'][i % 4], R.n(0.4)); } },
  ui() { hudKevin({ y: 260, scale: 0.85 }); info('JEDEN MONAT', 48.8, { y: 460, bg: PAL.red, size: 52 }); },
  sfx: [[48.1, 'paperPile', 1.5], [48.3, 'cashReg', 0.7], [48.8, 'pop', 1]] });
// ---- 30 · Kevin's account keeps shrinking
S(50.45, { tr: 'glitch', cam: [[50.45, 540, 960, 1.0], [52.68, 540, 960, 1.05]],
  draw() { ctx.fillStyle = rad(540, 700, 40, 900, [[0, '#7a1d2e'], [1, '#250d1e']]); ctx.fillRect(-600, -400, 2300, 2800);
    ctx.beginPath(); const N = 40; for (let i = 0; i <= N * clamp((TT - 50.5) / 1.6); i++) { const u = i / N, px = 140 + u * 800, py = 560 + u * 600 + Math.sin(u * 20) * 18; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.lineWidth = 14; ctx.strokeStyle = '#ff4a4a'; ctx.lineCap = 'round'; ctx.stroke();
    for (let i = 0; i < 3; i++) { const y = 900 + ((TT * 300 + i * 90) % 280); poly([[500, y], [580, y], [540, y + 50]], 'rgba(255,74,74,0.7)'); } },
  ui() { hudKevin({ y: 300 }); info('IMMER KLEINER', 50.6, { y: 1350, bg: PAL.red, size: 52 }); },
  sfx: [[50.5, 'descend'], [51.6, 'swish', 0.7]] });
// ---- 31 · the last day of the year
S(52.68, { tr: 'spin', cam: [[52.68, 540, 960, 1.0], [54.42, 540, 940, 1.08]],
  draw() { rays('#d4520a', '#ff7a12', { cy: 900, spin: 0.15 }); calendarPage(540, 980, 1.2, 'DEZ', 31); twinkles('ny', 160, 500, 760, 900, 8, { s: 26, c: PAL.yellow }); },
  ui() { info('LETZTER TAG DES JAHRES', 52.75, { y: 360, size: 50 }); },
  sfx: [[52.75, 'pop', 1], [53.2, 'tension', 1.2]] });
// ---- 32 · Kevin opens his account for the first time
S(54.42, { tr: 'zoomIn', cam: [[54.42, 540, 1000, 1.6], [57.1, 540, 960, 1.8]],
  draw() { setDaniRoom({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'holdR']], emo: [[54.42, 'confused'], [55.6, 'scared']], look: [0.2, 0.6], extras: { chain: 1, sweat: TT > 55.6 }, holdR: () => phone(0, -60, 0.32, -0.1, () => { ctx.fillStyle = '#1d48b8'; ctx.fillRect(-84, -176, 168, 352); tText('BANK', 0, 0, 34, { color: '#fff', shadow: false }); }) }); },
  ui() { info('ZUM ERSTEN MAL', 55.6, { y: 400, bg: PAL.blue, size: 52 }); },
  sfx: [[54.5, 'phoneTap'], [55.0, 'phoneTap'], [55.6, 'heartbeat', 1.4]] });
// ---- 33 · 2.300.000 € — nothing more is left
S(57.1, { tr: 'cut', cam: [[57.1, 540, 960, 1.0], [60.7, 540, 960, 1.12]], shake: [[57.15, 16, 0.5]],
  draw() { setDaniRoom({ blur: 14 }); bankApp(540, 1000, 2.6, TT > 57.15 ? '2.300.000 €' : '…', PAL.red); if (TT > 57.15) glow(540, 900, 520, '#ff3030', 0.3); },
  ui() { info('MEHR IST NICHT ÜBRIG', 59.7, { y: 330, bg: PAL.red, size: 52 }); },
  sfx: [[57.15, 'impact'], [57.2, 'declined'], [59.7, 'stamp']] });
// ---- 34 · "That can't be..."
S(60.7, { tr: 'zoomIn', cam: [[60.7, 540, 1000, 1.75], [62.22, 540, 980, 1.95]],
  draw() { setDaniRoom({ blur: 11 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'sad']], emo: [[0, 'scared']], extras: { chain: 1, sweat: 1, pale: 1 } }); },
  ui() { vignette(0.6); },
  sfx: [[60.75, 'gulp'], [61.2, 'sadTrombone', 0.5]] });
// ---- 35 · And Jonas? 1 € a second. A whole year.
S(62.22, { tr: 'whipL', cam: [[62.22, 540, 1000, 1.7], [64.55, 540, 980, 1.85]],
  draw() { setLeoRoom({ blur: 10 }); glow(540, 900, 600, '#fff3b0', 0.3); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], look: [0.1, 0], extras: { glasses: true } }); },
  ui() { info('1 € / SEKUNDE', 63.1, { y: 340, bg: PAL.orange, size: 56 }); info('1 GANZES JAHR', 64.6, { y: 470, bg: PAL.purple, size: 50 }); },
  sfx: [[63.1, 'tick'], [63.15, 'pop', 1], [64.6, 'pop', 1.2]] });
// ---- 36 · Kevin: 2.300.000 € — Jonas: ???
S(64.55, { tr: 'zoomIn', capY: 1790, cam: [[64.55, 540, 960, 1.0], [67.2, 540, 960, 1.04]],
  draw() { ctx.save(); ctx.beginPath(); ctx.rect(-200, -400, 1480, 1360); ctx.clip(); rays('#7a1d2e', '#9a2a3e', { cy: 560, spin: 0.06 }); char('kevin', 250, 1180, 0.82, { pose: [[0, 'headGrab']], emo: [[0, 'scared']], extras: { chain: 1, sweat: 1, pale: 1 } }); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(-200, 960, 1480, 1300); ctx.clip(); rays('#0c7a3e', '#11954c', { cy: 1440, spin: -0.06 }); char('jonas', 250, 1990, 0.82, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], extras: { glasses: true } }); ctx.restore();
    line(-200, 960, 1280, 960, 16, '#ffffff'); },
  ui() { hud('KONTO · KEVIN', [[0, 2.3e6]], { x: 700, y: 520, scale: 0.95, color: '#ff5a5a' }); blurCounter(700, 1380, 560, 230, 'KONTO · JONAS', { q: true }); },
  sfx: [[64.6, 'heartbeat', 1.5], [65.9, 'impact']] });
// ---- 37 · end card: the question
S(67.2, { tr: 'zoomOut', noCap: true, cam: [[67.2, 540, 960, 1.0], [70.5, 540, 960, 1.05]],
  draw() { setLeoRoom({ blur: 18 }); ctx.fillStyle = 'rgba(10,6,24,0.66)'; ctx.fillRect(-600, -400, 2300, 2800); },
  ui() { const k = springEase(TT - 67.3, 220, 15); ctx.save(); ctx.translate(540, 700); ctx.scale(k, k); tText('WIE VIEL HAT', 0, -70, 96, { color: '#fff', stroke: '#140c22', strokeW: 16 }); tText('JONAS JETZT?', 0, 50, 96, { color: PAL.yellow, stroke: '#140c22', strokeW: 16 }); ctx.restore();
    sticker('1 € × SEKUNDE × 1 JAHR = ???', 540, 960, 67.9, { bg: PAL.orange, size: 46 });
    if (TT > 68.6) { const p = 1 + 0.05 * Math.sin(TT * 8); ctx.save(); ctx.translate(540, 1110); ctx.scale(p, p); sticker('SCHREIB\'S IN DIE KOMMENTARE 👇', 0, 0, 68.6, { bg: PAL.red, size: 42 }); ctx.restore(); } },
  sfx: [[67.3, 'pop', 0.7], [67.9, 'pop', 1], [68.6, 'pop', 1.2]] });
