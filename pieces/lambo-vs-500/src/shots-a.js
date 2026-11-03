// =====================================================================
//  shots-a.js — 0:00–0:44  the choice, Kevin's laugh, the hidden costs, the scratch
// =====================================================================
const carV = (y) => 250000 * Math.pow(0.85, y);
const depV = (y) => { const r = 0.07 / 12, m = Math.round(y * 12); return m <= 0 ? 0 : 500 * (Math.pow(1 + r, m) - 1) / r; };
const COSTS = [[0, 0], [26.9, 900], [28.25, 1250], [29.65, 5250], [37.45, 12250]];
const hudCost = (o = {}) => hud('AUSGABEN · KEVIN', COSTS, { color: '#ff5a5a', ...o });
const KX = { chain: 1 };   // Kevin's bling once he owns the car
function bigArm(id, x0, y0, x1, y1, w = 150, open = false) {
  const L = LOOKS[id];
  line(x0, y0, x1, y1, w, L.top); line(x0 + w * 0.18, y0, x1 + w * 0.12, y1, w * 0.25, L.topD);
  const a = Math.atan2(y1 - y0, x1 - x0);
  circ(x1 - Math.cos(a) * w * 0.25, y1 - Math.sin(a) * w * 0.25, w * 0.55, L.topD);
  ctx.save(); ctx.translate(x1 + Math.cos(a) * w * 0.25, y1 + Math.sin(a) * w * 0.25); ctx.rotate(a);
  if (open) { fillRR(-w * 0.4, -w * 0.55, w * 0.95, w * 1.1, w * 0.4, L.skin); for (let i = 0; i < 4; i++) fillRR(w * 0.4, -w * 0.5 + i * w * 0.28, w * 0.5, w * 0.22, w * 0.11, L.skin); fillRR(-w * 0.1, -w * 0.85, w * 0.45, w * 0.3, w * 0.15, L.skin); }
  else { circ(0, 0, w * 0.55, L.skin); for (let i = 0; i < 4; i++) circ(w * 0.38, -w * 0.36 + i * w * 0.24, w * 0.16, L.skinD); }
  ctx.restore();
}
function popText(str, x, y, t0, size, col, rot = 0, rise = 40) { if (TT < t0) return; const k = springEase(TT - t0, 300, 12); ctx.save(); ctx.translate(x, y - (TT - t0) * rise); ctx.rotate(rot); ctx.scale(k, k); tText(str, 0, 0, size, { color: col, stroke: '#1b0f2e', strokeW: size * 0.2 }); ctx.restore(); }
function rainCloud(x, y, t0) {
  const k = springEase(TT - t0, 200, 14); if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  for (const [cx, cy, r] of [[-90, 10, 70], [0, -20, 95], [90, 10, 70], [0, 30, 80]]) circ(cx, cy, r, '#5b6378');
  for (const [cx, cy, r] of [[-60, 0, 50], [10, -30, 60]]) circ(cx, cy, r, '#6f788f'); ctx.restore();
  const R = RNG('drops'); for (let i = 0; i < 26; i++) { const dx = x - 150 + R.f() * 300, u = ((TT - t0) * 1.6 + R.f()) % 1; if (TT < t0 + 0.2) continue; line(dx, y + 60 + u * 520, dx - 6, y + 90 + u * 520, 6, 'rgba(140,200,255,0.8)'); }
}
function musicNotes(x, y, seed) { const R = RNG('mn', seed); for (let i = 0; i < 6; i++) { const u = ((TT * 0.8 + R.f()) % 1), px = x + R.n(160) + Math.sin(TT * 3 + i) * 30, py = y - u * 420; ctx.save(); ctx.globalAlpha = 1 - u; tText(i % 2 ? '♪' : '♫', px, py, 70, { color: [PAL.pink, PAL.yellow, PAL.blueL][i % 3], shadow: false }); ctx.restore(); } }
function priceTag(x, y, s, txt, rot = -0.1, col = '#ffffff') { ctx.save(); ctx.translate(x, y); ctx.rotate(rot + Math.sin(TT * 2) * 0.03); ctx.scale(s, s); line(-170, -70, -250, -150, 5, '#ddd'); poly([[-170, -80], [220, -80], [220, 80], [-170, 80], [-230, 0]], col); circ(-185, 0, 14, '#1b1530'); tText(txt, 30, 4, 78, { color: '#1b1530', shadow: false, maxW: 360 }); ctx.restore(); }

// a choice card with a picture: the car, or a fan of banknotes — read in a glance, before the words
function iconCard(x, y, top, big, sub, col, t0, icon) {
  if (TT < t0) return;
  const k = springEase(TT - t0, 260, 15), w = 450, h = 380;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  fillRR(-w / 2 + 8, -h / 2 + 12, w, h, 28, 'rgba(0,0,0,0.38)'); fillRR(-w / 2, -h / 2, w, h, 28, col); fillRR(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 22, shade(col, 0.12));
  tText(top, 0, -h / 2 + 36, 26, { color: 'rgba(255,255,255,0.9)', shadow: false, letter: 3, weight: 800 });
  // the picture window
  fillRR(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18, 'rgba(10,8,30,0.30)');
  const ik = springEase(TT - t0 - 0.12, 280, 12), bob = Math.sin(TT * 3 + x) * 4;
  ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18); ctx.clip(); ctx.translate(0, -h / 2 + 150 + bob); ctx.scale(ik, ik);
  if (icon === 'car') { glow(0, -20, 200, '#fff3b0', 0.35); supercar(0, 45, 0.34, { wheelSpin: TT * 0.5 }); sparkle(-120, -50, 16 * (0.6 + 0.4 * Math.sin(TT * 7)), '#fff'); sparkle(110, -60, 12 * (0.6 + 0.4 * Math.sin(TT * 9 + 1)), '#fff'); }
  else { for (let i = 0; i < 5; i++) bill(0, 10, 190, -0.5 + i * 0.25 + Math.sin(TT * 2 + i) * 0.02, 1, { label: '500' }); coin(130, 40, 26, { sx: Math.cos(TT * 3), label: '€' }); coin(-135, 45, 22, { sx: Math.cos(TT * 3 + 1), label: '€' }); }
  ctx.restore();
  tText(big, 0, h / 2 - 92, 52, { color: '#fff', maxW: w - 36 });
  tText(sub, 0, h / 2 - 40, 28, { color: 'rgba(255,255,255,0.95)', shadow: false, weight: 800 });
  ctx.restore();
}
// ---- 1 · the game show: the two choices
S(0.0, { tr: 'cut', lift: 110, cam: [[0, 540, 1020, 1.0], [0.62, 540, 1010, 1.03]],
  draw() { setStudio(); char('kevin', 300, FLOOR - 40, 0.8, { emo: [[0, 'grin']], look: [0.4, 0.4], jump: [[0, 0], [0.25, 18, 0.12], [0.4, 0, 0.12]] }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']], look: [-0.3, 0] }); studioPodiums(); },
  ui() { tText('LAMBO ODER 500 €?', 540, 200, 70, { color: PAL.yellow, stroke: '#240b5e', strokeW: 16 }); iconCard(285, 462, 'OPTION 1', 'LAMBORGHINI', 'SOFORT', PAL.green, 0.03, 'car'); iconCard(795, 462, 'OPTION 2', '500 € / MONAT', '10 JAHRE', PAL.orange, 0.15, 'cash'); tText('VS', 540, 462, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); },
  sfx: [[0.0, 'sting'], [0.03, 'pop', 1], [0.15, 'pop', 1.2]] });
// ---- 2 · insert: the car rolls into the spotlight
S(0.62, { tr: 'zoomIn', cam: [[0.62, 540, 1180, 1.0], [1.64, 540, 1160, 1.1]],
  draw() { setShowroom(); const x = 540 + 900 * (1 - springEase(TT - 0.66, 110, 16)); supercar(x, 1560, 0.95, { wheelSpin: (x - 540) / 98 }); twinkles('s2', 120, 1200, 840, 200, 6, { s: 26 }); },
  ui() { priceTag(540, 620, 0.9, '250.000 €', -0.08); },
  sfx: [[0.66, 'engine'], [1.0, 'sparkle'], [0.95, 'pop', 1]] });
// ---- 3 · insert: 500 € every month
S(1.64, { tr: 'whipL', cam: [[1.64, 540, 960, 1.08], [3.1, 540, 960, 1.0]],
  draw() { rays('#e86c0e', '#ff8a1e', { cy: 950 }); const k = springEase(TT - 1.8, 220, 13); bill(540, 960, 520 * k, Math.sin(TT * 2) * 0.05, 1, { num: '500', label: '500 €' }); twinkles('b3', 200, 700, 680, 500, 7, { s: 24 }); },
  ui() { tText('500 €', 540, 470, 150, { color: '#fff', stroke: '#7a2a00', strokeW: 24 }); sticker('JEDEN MONAT', 540, 1300, 2.8, { bg: PAL.purple, size: 58 }); },
  sfx: [[1.82, 'cashReg'], [2.8, 'pop', 1.1]] });
// ---- 4 · insert: for 10 years (a stack grows, month by month)
S(3.1, { tr: 'flash', cam: [[3.1, 540, 1000, 1.0], [4.75, 540, 940, 1.1]],
  draw() { rays('#c4520a', '#e86c0e', { cy: 900 }); const n = Math.floor(clamp((TT - 3.15) / 1.4) * 120);
    for (let i = 0; i < Math.min(n, 60); i++) bill(540 + ((i % 2) * 2 - 1) * 4, 1500 - i * 14, 380, ((i * 37) % 9 - 4) * 0.01, 1);
    calendarPage(540, 520, 0.6, 'MONAT', Math.max(1, n)); },
  ui() { sticker('10 JAHRE', 540, 1700, 4.02, { bg: '#141026', size: 62 }); },
  sfx: [[3.15, 'clockSpin', 1.4], [4.02, 'pop', 1], [3.6, 'moneyRain', 1.0]] });
// ---- 5 · Kevin pressed before the question was over
S(4.75, { tr: 'whipR', cam: [[4.75, 320, 1140, 1.55], [6.4, 310, 1110, 1.7]], shake: [[5.45, 18, 0.35]],
  draw() { setStudio({ blur: 3 }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']] });
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[4.75, 'idle'], [4.95, 'raiseR'], [5.3, 'slamR']], emo: [[4.75, 'grin'], [5.3, 'angry'], [5.7, 'smug']], look: [[4.75, [0.4, 0.6]]] });
    studioPodiums({ pressL: TT > 5.42 ? 1 : 0, litL: TT > 5.42 ? 0.8 : 0 }); impactLines(300, 1250, 120, 380, 12, 5.42); },
  ui() { questionTyping('FRAGE: WILLST DU DEN LAMBO ODER LIEB—', 4.8, 6.6, 5.42); sticker('ZU SPÄT!', 760, 400, 5.5, { bg: PAL.red, rot: 0.08, size: 60 }); },
  sfx: [[4.85, 'typing', 0.55], [4.95, 'whooshUp', 1.2], [5.42, 'slam'], [5.5, 'buzzerWin']] });
function questionTyping(str, t0, t1, cutAt) {
  const n = Math.floor(clamp((TT - t0) / (t1 - t0)) * str.length), shown = str.slice(0, cutAt != null && TT > cutAt ? Math.floor(clamp((cutAt - t0) / (t1 - t0)) * str.length) : n);
  const k = TT > (cutAt ?? 1e9) ? RNG('qt', F).n(8) * clamp(1 - (TT - cutAt) * 2) : 0;
  fillRR(70, 170, 940, 130, 30, 'rgba(15,10,35,0.85)'); tText(shown + (Math.floor(TT * 4) % 2 ? '|' : ''), 540 + k, 236, 48, { color: '#fff', maxW: 880, shadow: false });
}
// ---- 6 · the key drops into his hand
S(6.4, { tr: 'cut', cam: [[6.4, 540, 1000, 1.0], [7.62, 540, 1040, 1.1]],
  draw() { rays('#2a1170', '#3a1696', { cy: 950 }); bigArm('kevin', 1300, 1950, 640, 1250, 220, true);
    const y = bounceY(TT - 6.5, 200, 1120, 4500, 0.35); ctx.save(); ctx.translate(600, y); ctx.rotate(TT < 6.9 ? TT * 9 : 0.4); fillRR(-70, -110, 140, 170, 40, '#15151d'); fillRR(-50, -90, 100, 40, 14, PAL.gold); fillRR(-14, 60, 28, 120, 8, '#c0c4d4'); ctx.restore();
    confetti('k6', 6.95, 50, { x: 600, y: 1100 }); },
  ui() { sticker('LAMBORGHINI!', 540, 520, 6.95, { bg: PAL.gold, fg: '#1b1530', size: 66 }); },
  sfx: [[6.5, 'whooshDown', 0.8], [6.93, 'keys'], [6.95, 'cashCannon']] });
// ---- 7 · HAHAHA
S(7.62, { tr: 'flash', cam: [[7.62, 540, 1080, 1.1], [8.94, 540, 1050, 1.2]],
  draw() { setStudio(); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'neutral']], look: [-0.7, -0.2] });
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[0, 'armsUp']], emo: [[0, 'laugh']], jump: [[7.62, 0], [7.7, 150, 0.2], [7.95, 0, 0.18], [8.2, 100, 0.18], [8.45, 0, 0.18]] }); studioPodiums({ litL: 0.5 });
    billRain('r7', 7.4, 30, { spread: 1.4 }); },
  ui() { popText('HAHAHA!', 330, 560, 7.7, 92, PAL.yellow, -0.1, 30); },
  sfx: [[7.7, 'boing'], [8.2, 'boing'], [7.65, 'applause', 1.2]] });
// ---- 8 · "500 euros?" — one bill, held like trash
S(8.94, { tr: 'whipL', cam: [[8.94, 540, 1000, 1.65], [10.3, 540, 980, 1.75]],
  draw() { setStudio({ blur: 8 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'holdR']], emo: [[8.94, 'smug'], [9.6, 'confused']], look: [0.4, 0.2], holdR: () => bill(10, -40, 170, 0.6 + Math.sin(TT * 5) * 0.1, 1, { label: '500' }) }); },
  ui() { popText('PFF…', 820, 560, 9.6, 70, '#ffffff', 0.1, 20); },
  sfx: [[9.0, 'rustle'], [9.6, 'popHi', 0.9]] });
// ---- 9 · "I can't even fill up with that" — the pump races past 500
S(10.3, { tr: 'cut', cam: [[10.3, 540, 1000, 1.0], [12.1, 540, 960, 1.12]],
  draw() { setGasStation({ blur: 4 }); const v = Math.min(612, (TT - 10.4) * 420); fuelPump(540, 1560, 1.45, { disp: fmtEUR(Math.max(0, v), true) }); },
  ui() { if (TT > 11.6) sticker('1× TANKEN = 612 €', 540, 480, 11.6, { bg: PAL.red, size: 52 }); },
  sfx: [[10.4, 'pump', 1.6], [11.6, 'pop', 0.9]] });
// ---- 10 · Jonas presses orange, calmly
S(12.1, { tr: 'whipR', cam: [[12.1, 780, 1150, 1.6], [14.0, 780, 1170, 1.72]],
  draw() { setStudio({ blur: 3 }); char('kevin', 300, FLOOR - 40, 0.8, { pose: [[0, 'cheer']], emo: [[0, 'laugh']] });
    char('jonas', 780, FLOOR - 40, 0.8, { pose: [[12.1, 'idle'], [12.7, 'raiseR'], [13.15, 'pressR']], emo: [[12.1, 'calm'], [13.4, 'happy']], look: [[12.1, [0, 0.2]], [12.7, [0.2, 0.7]]] });
    studioPodiums({ pressR: TT > 13.3 ? 0.6 : 0, litR: TT > 13.3 ? 0.6 : 0 }); if (TT > 13.3) twinkles('j10', 650, 1050, 260, 200, 6, { s: 22 }); },
  sfx: [[12.7, 'swish', 0.7], [13.3, 'click'], [13.36, 'ding']] });
// ---- 11 · close-up: Jonas with his first 500
S(14.0, { tr: 'zoomIn', cam: [[14.0, 540, 1000, 1.7], [15.6, 540, 980, 1.8]],
  draw() { setStudio({ blur: 8 }); char('jonas', 540, FLOOR + 160, 1.0, { pose: [[0, 'holdR']], emo: [[0, 'calm']], look: [0.3, 0.5], holdR: () => bill(0, -40, 160, -0.2, 1, { label: '500' }) }); },
  ui() { sticker('500 € / MONAT', 540, 420, 14.4, { bg: PAL.orange, size: 56 }); },
  sfx: [[14.4, 'pop', 1], [14.6, 'sparkle']] });
// ---- 12 · Kevin laughs at him
S(15.6, { tr: 'whipL', cam: [[15.6, 540, 1080, 1.15], [17.0, 540, 1060, 1.22]],
  draw() { setStudio({ blur: 2 }); char('jonas', 780, FLOOR - 40, 0.8, { pose: [[0, 'holdR']], emo: [[0, 'serious']], look: [-0.6, 0], holdR: () => bill(0, -40, 120, -0.2, 1) });
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[15.6, 'laughBelly'], [16.2, 'pointR']], emo: [[0, 'laugh']], lean: [[15.6, -0.08], [15.9, 0.06, 0.2], [16.2, -0.04, 0.2]] }); studioPodiums(); },
  ui() { popText('HA', 200, 560, 15.75, 70, PAL.yellow, -0.2); popText('HA', 420, 470, 16.05, 70, PAL.yellow, 0.1); popText('HA', 260, 380, 16.35, 70, PAL.yellow); },
  sfx: [[15.75, 'popHi', 1], [16.05, 'popHi', 1.15], [16.35, 'popHi', 1.3]] });
// ---- 13 · "Dude, you ride a bike..."
S(17.0, { tr: 'cut', cam: [[17.0, 540, 1000, 1.65], [18.84, 540, 980, 1.75]],
  draw() { setStudio({ blur: 8 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[17.0, 'pointR'], [17.9, 'shrug']], emo: [[17.0, 'smug'], [17.9, 'grin']], look: [0.5, 0], turn: 0.25 });
    if (TT > 17.9) { ctx.save(); ctx.translate(820, 760); ctx.scale(springEase(TT - 17.9, 300, 12), springEase(TT - 17.9, 300, 12)); bicycle(0, 0, 0.6, TT * 5); ctx.restore(); } },
  sfx: [[17.9, 'bikeBell'], [17.92, 'pop', 1.1]] });
// ---- 14 · "...and I drive a LAMBO!"
S(18.84, { tr: 'whipR', cam: [[18.84, 540, 1180, 1.15], [20.36, 540, 1140, 1.25]], punch: [[19.6, 0.16]],
  draw() { setShowroom(); char('kevin', 330, FLOOR + 40, 0.9, { pose: [[0, 'hips'], [19.55, 'cheer']], emo: [[0, 'grin']], extras: { chain: 1, shades: clamp((TT - 19.0) / 0.25) } }); supercar(620, 1620, 0.85, {}); billRain('r14', 19.5, 24, { spread: 1 }); },
  ui() { sticker('LAMBO-KÖNIG', 540, 420, 19.65, { bg: PAL.gold, fg: '#1b1530', size: 58, rot: -0.06 }); },
  sfx: [[19.0, 'bling'], [19.6, 'bassDrop'], [19.65, 'pop', 0.9]] });
// ---- 15 · BUT Kevin had forgotten something
S(20.36, { tr: 'glitch', cam: [[20.36, 540, 1000, 1.6], [22.2, 540, 980, 1.9]],
  draw() { setShowroom({ blur: 10 }); ctx.fillStyle = 'rgba(10,5,25,0.45)'; ctx.fillRect(-600, -400, 2300, 2800);
    char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'cheer']], emo: [[0, 'grin']], extras: { chain: 1, shades: 1 } }); },
  ui() { vignette(0.6); ctx.save(); ctx.globalAlpha = clamp((TT - 21.5) / 0.3); tText('?', 860, 560, 200, { color: '#fff', stroke: PAL.red, strokeW: 20 }); ctx.restore(); },
  sfx: [[20.5, 'tension', 1.6], [21.52, 'dun']] });
// ---- 16 · you don't pay for a Lamborghini just once — the bills rain down
S(22.2, { tr: 'zoomIn', cam: [[22.2, 540, 980, 1.0], [24.7, 540, 1020, 1.1]],
  draw() { setDark('#3a1020', '#0a0408'); supercar(540, 1560, 0.9, {});
    const R = RNG('bills16'); for (let i = 0; i < 16; i++) { const t0 = 22.3 + i * 0.12, x = 260 + R.f() * 560, y = bounceY(TT - t0, -300, 1180 - (i % 5) * 40, 3600, 0.2); if (TT > t0) letter(x, y, 0.5, ['VERSICHERUNG', 'STEUER', 'SERVICE', 'REIFEN'][i % 4], ['900 €', '1.200 €', '2.500 €', '4.000 €'][i % 4], R.n(0.4)); } },
  ui() { sticker('NICHT NUR EINMAL', 540, 420, 23.75, { bg: PAL.red, size: 56 }); },
  sfx: [[22.3, 'paperPile', 2.0], [23.75, 'stamp']] });
// ---- 17 · the insurance letter
S(24.7, { tr: 'whipL', cam: [[24.7, 540, 1150, 1.1], [26.4, 540, 1100, 1.25]],
  draw() { setDaniRoom(); char('kevin', 540, FLOOR + 30, 0.95, { pose: [[0, 'holdBoth']], emo: [[24.7, 'neutral'], [25.9, 'confused']], look: [0, 0.6], extras: KX, holdR: () => {}, holdL: () => {} });
    const open = clamp((TT - 25.2) / 0.5); ctx.save(); ctx.translate(540, FLOOR - 440); ctx.scale(0.5, 0.5); fillRR(-220, -150, 440, 300, 16, '#f5f0e6'); poly([[-220, -150], [220, -150], [0, -150 + 180 * (1 - open * 2)]], '#e0d6c2'); ctx.restore(); },
  ui() { hudCost({ scale: 0.8, y: 220 }); },
  sfx: [[25.2, 'paperTear'], [25.9, 'popHi', 0.8]] });
S(26.4, { tr: 'zoomIn', cam: [[26.4, 540, 960, 1.0], [27.85, 540, 960, 1.08]],
  draw() { setDaniRoom({ blur: 12 }); letter(540, 980, 1.6, 'VERSICHERUNG', '900 €', -0.04); },
  ui() { hudCost({ scale: 0.8, y: 220 }); },
  sfx: [[26.9, 'cashReg'], [26.95, 'stamp', 0.6]] });
// ---- 18 · then the fuel
S(27.85, { tr: 'whipR', cam: [[27.85, 540, 1100, 1.05], [28.7, 540, 1080, 1.12]],
  draw() { setGasStation(); fuelPump(820, FLOOR, 0.9, { disp: fmtEUR(Math.min(350, (TT - 27.9) * 600), true) }); supercar(400, 1620, 0.8, {}); },
  ui() { hudCost({ scale: 0.8, y: 220 }); },
  sfx: [[27.9, 'pump', 0.8], [28.25, 'cashReg']] });
// ---- 19 · then new tyres: 4.000 €
S(28.7, { tr: 'slide', cam: [[28.7, 540, 1150, 1.0], [31.0, 540, 1120, 1.1]],
  draw() { setGarage(); for (let i = 0; i < 4; i++) { const t0 = 28.85 + i * 0.12, y = bounceY(TT - t0, 200, FLOOR - 40 - 0, 4200, 0.4); if (TT > t0) { ctx.save(); ctx.translate(230 + i * 210, y); ell(0, 0, 90, 90, '#15151d'); ell(0, 0, 58, 58, '#d9a514'); ell(0, 0, 20, 20, '#15151d'); ctx.restore(); } } },
  ui() { hudCost({ scale: 0.8, y: 220 }); sticker('REIFEN  4.000 €', 540, 560, 29.65, { bg: PAL.red, size: 58 }); },
  sfx: [[28.95, 'thud'], [29.07, 'thud'], [29.19, 'thud'], [29.31, 'thud'], [29.65, 'cashReg'], [29.7, 'pop', 1]] });
// ---- 20 · "Whatever! I'm a star!"
S(31.0, { tr: 'flash', cam: [[31.0, 540, 1000, 1.6], [33.1, 540, 980, 1.75]], punch: [[32.4, 0.15]],
  draw() { setShowroom({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[31.0, 'hips'], [31.9, 'cheer']], emo: [[0, 'grin']], extras: { chain: 1, shades: 1 } });
    for (let i = 0; i < 5; i++) { const a = TT * 1.5 + (i / 5) * TAU; sparkle(540 + Math.cos(a) * 330, 760 + Math.sin(a) * 120, 40, PAL.yellow, a); } },
  ui() { sticker('STAR', 540, 420, 32.4, { bg: PAL.yellow, fg: '#1b1530', size: 70 }); },
  sfx: [[31.9, 'sparkle'], [32.4, 'bling'], [32.42, 'pop', 1]] });
// ---- 21 · BUT then: a shopping trolley rolls toward the car
S(33.1, { tr: 'zoomOut', cam: [[33.1, 540, 1150, 1.0], [34.6, 600, 1180, 1.12]],
  draw() { setStreet(); supercar(560, 1640, 0.85, {}); const u = clamp((TT - 33.2) / 1.45), x = lerp(-200, 690, EZ.i2(u)); trolley(x, 1640, 0.8, TT * 6); },
  sfx: [[33.2, 'trolley', 1.45]] });
function trolley(x, y, s, spin) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 10; ctx.strokeStyle = '#c0c4d4';
  ctx.strokeRect(-150, -330, 300, 200); for (let i = 1; i < 5; i++) line(-150 + i * 60, -330, -150 + i * 60, -130, 6, '#c0c4d4'); line(-150, -130, -110, -40, 10, '#c0c4d4'); line(150, -130, 110, -40, 10, '#c0c4d4'); line(-150, -330, -220, -380, 10, '#c0c4d4'); fillRR(-250, -400, 70, 28, 12, PAL.red);
  for (const wx of [-100, 100]) { circ(wx, -24, 26, '#1b1b24'); line(wx, -24, wx + Math.cos(spin) * 20, -24 + Math.sin(spin) * 20, 5, '#888'); } ctx.restore(); }
// ---- 22 · KRRRTSCH — the scratch
S(34.6, { tr: 'cut', cam: [[34.6, 700, 1500, 2.4], [35.4, 700, 1500, 2.6]], shake: [[34.76, 14, 0.4]],
  draw() { setStreet({ blur: 6 }); supercar(560, 1640, 0.85, { scratch: clamp((TT - 34.76) / 0.35) }); trolley(700, 1640, 0.8, 0);
    if (TT > 34.76 && TT < 35.3) { const R = RNG('spk', F); for (let i = 0; i < 12; i++) sparkle(640 + R.f() * 80, 1540 + R.n(20), 6 + R.f() * 10, '#fff36b'); } },
  ui() { popText('KRRRTSCH!', 540, 560, 34.78, 90, '#ff5a5a', -0.08, 10); },
  sfx: [[34.76, 'screech'], [34.78, 'punch']] });
// ---- 23 · a tiny scratch (magnifying glass)
S(35.4, { tr: 'zoomIn', cam: [[35.4, 540, 960, 1.0], [37.0, 540, 960, 1.15]],
  draw() { ctx.fillStyle = PAL.yellow; ctx.fillRect(-600, -400, 2300, 2800); ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#ffd23f'], [1, '#e8a800']]); ctx.fillRect(-600, -400, 2300, 2800);
    line(380, 980, 700, 1010, 10, '#7a5a00'); line(400, 1000, 640, 1022, 5, '#fff3c0');
    const mx = 540 + Math.sin(TT * 2) * 40; ctx.beginPath(); ctx.arc(mx, 990, 230, 0, TAU); ctx.lineWidth = 34; ctx.strokeStyle = '#2b2b36'; ctx.stroke(); ctx.fillStyle = 'rgba(200,240,255,0.18)'; ctx.fill(); line(mx + 160, 1150, mx + 360, 1400, 50, '#5a3a20'); },
  ui() { sticker('WINZIG', 540, 520, 36.2, { bg: '#ffffff', fg: '#1b1530', size: 66 }); },
  sfx: [[35.5, 'ting'], [36.2, 'pop', 1.2], [36.3, 'squeak']] });
// ---- 24 · the mechanic: "That'll be 7.000 euros, boss."
S(37.0, { tr: 'whipR', cam: [[37.0, 760, 1050, 1.6], [38.78, 760, 1030, 1.7]],
  draw() { setGarage({ blur: 6 }); supercar(380, 1640, 0.8, { scratch: 1 });
    char('mech', 760, FLOOR + 150, 0.98, { pose: [[0, 'holdR']], emo: [[0, 'smug']], look: [-0.4, 0], holdR: () => { fillRR(-60, -120, 120, 160, 10, '#ffffff'); tText('7.000 €', 0, -40, 26, { color: PAL.red, shadow: false }); } }); },
  ui() { hudCost({ scale: 0.8, y: 220 }); },
  sfx: [[37.45, 'cashReg'], [37.2, 'ratchet']] });
// ---- 25 · "7.000 euros for THIS?!"
S(38.78, { tr: 'zoomIn', cam: [[38.78, 540, 1000, 1.6], [40.9, 540, 960, 1.78]], punch: [[40.24, 0.18]], shake: [[38.85, 22, 0.5], [40.24, 18, 0.4]],
  draw() { setGarage({ blur: 9 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[38.78, 'headGrab'], [39.9, 'pointR']], emo: [[38.78, 'shock'], [39.8, 'angry']], extras: { chain: 1, sweat: 1 } }); impactLines(540, 800, 380, 700, 18, 38.85, { w: 16 }); },
  sfx: [[38.85, 'shockHit']] });
// ---- 26 · "I don't have a Lamborghini..."
S(40.9, { tr: 'whipL', cam: [[40.9, 540, 1150, 1.1], [42.8, 540, 1120, 1.22]],
  draw() { setStreet({ blur: 3 }); supercar(620, 1640, 0.85, { scratch: 1 }); char('kevin', 300, FLOOR + 40, 0.9, { pose: [[0, 'sad']], emo: [[0, 'sad']], look: [0.6, 0.4], extras: { chain: 1 }, lean: [[40.9, 0], [41.4, 0.08, 0.6]] }); rainCloud(300, 520, 41.2); },
  ui() { hudCost({ scale: 0.8, y: 220 }); },
  sfx: [[41.2, 'thunder', 0.7], [41.3, 'rain', 1.5]] });
// ---- 27 · "...the Lamborghini has me."
S(42.8, { tr: 'cut', cam: [[42.8, 540, 1000, 1.7], [44.44, 540, 980, 1.85]],
  draw() { setStreet({ blur: 10 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'sad']], emo: [[0, 'sad']], extras: { chain: 1, tear: 1 } }); rainCloud(540, 340, 42.6); },
  ui() { sticker('BESITZT IHN DAS AUTO?', 540, 420, 43.9, { bg: PAL.red, size: 50 }); },
  sfx: [[42.85, 'rain', 1.5], [43.9, 'stamp', 0.7], [43.2, 'sadTrombone', 0.6]] });
