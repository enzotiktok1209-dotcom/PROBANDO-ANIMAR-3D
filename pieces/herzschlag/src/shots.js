// =====================================================================
//  shots.js — 35 Millionen sofort vs 1 € pro Herzschlag, 1 Jahr. ~43 shots on the trimmed voice (82.9 s) + end card.
// =====================================================================
const KONTO = [[0, 35e6], [27.3, 21e6], [29.0, 9e6], [31.8, 6.5e6], [48.1, 4.5e6], [62.6, 2.9e6], [65.4, 2.2e6], [70.5, 1.8e6]];
const hudKevin = (o = {}) => hud('KONTO · KEVIN', KONTO, { ...o });
const GIRLS = ['mia', 'lea', 'zoe'];

function bigArm(id, x0, y0, x1, y1, w = 150, open = false) {
  const L = LOOKS[id]; line(x0, y0, x1, y1, w, L.top); line(x0 + w * 0.18, y0, x1 + w * 0.12, y1, w * 0.25, L.topD);
  const a = Math.atan2(y1 - y0, x1 - x0); circ(x1 - Math.cos(a) * w * 0.25, y1 - Math.sin(a) * w * 0.25, w * 0.55, L.topD);
  ctx.save(); ctx.translate(x1 + Math.cos(a) * w * 0.25, y1 + Math.sin(a) * w * 0.25); ctx.rotate(a);
  if (open) { fillRR(-w * 0.4, -w * 0.55, w * 0.95, w * 1.1, w * 0.4, L.skin); for (let i = 0; i < 4; i++) fillRR(w * 0.4, -w * 0.5 + i * w * 0.28, w * 0.5, w * 0.22, w * 0.11, L.skin); fillRR(-w * 0.1, -w * 0.85, w * 0.45, w * 0.3, w * 0.15, L.skin); }
  else { circ(0, 0, w * 0.55, L.skin); for (let i = 0; i < 4; i++) circ(w * 0.38, -w * 0.36 + i * w * 0.24, w * 0.16, L.skinD); }
  ctx.restore();
}
function popText(str, x, y, t0, size, col, rot = 0, rise = 40) { if (TT < t0) return; const k = springEase(TT - t0, 300, 12); ctx.save(); ctx.translate(x, y - (TT - t0) * rise); ctx.rotate(rot); ctx.scale(k, k); tText(str, 0, 0, size, { color: col, stroke: '#1b0f2e', strokeW: size * 0.2 }); ctx.restore(); }
function info(str, t0, o = {}) { sticker(str, o.x ?? 540, o.y ?? 400, t0, { bg: o.bg ?? '#141026', fg: o.fg, size: o.size ?? 54, rot: o.rot ?? -0.03 }); }
function iconCard(x, y, top, big, sub, col, t0, icon) {
  if (TT < t0) return; const k = springEase(TT - t0, 260, 15), w = 450, h = 380;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  fillRR(-w / 2 + 8, -h / 2 + 12, w, h, 28, 'rgba(0,0,0,0.38)'); fillRR(-w / 2, -h / 2, w, h, 28, col); fillRR(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 22, shade(col, 0.12));
  tText(top, 0, -h / 2 + 36, 26, { color: 'rgba(255,255,255,0.9)', shadow: false, letter: 3, weight: 800 });
  fillRR(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18, 'rgba(10,8,30,0.30)');
  const ik = springEase(TT - t0 - 0.12, 280, 12), bob = Math.sin(TT * 3 + x) * 4;
  ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18); ctx.clip(); ctx.translate(0, -h / 2 + 150 + bob); ctx.scale(ik, ik);
  if (icon === 'cash') { glow(0, 0, 200, '#a6f0b4', 0.35); briefcase(0, 70, 0.42, 1); }
  else { const kk = 1 + 0.2 * Math.max(0, 1 - ((TT % 0.85) / 0.85) * 6); heartIcon(-70, 0, 60 * kk); coin(100, 10, 40, { sx: Math.cos(TT * 4), label: '1€' }); }
  ctx.restore();
  tText(big, 0, h / 2 - 92, 46, { color: '#fff', maxW: w - 36 }); tText(sub, 0, h / 2 - 40, 28, { color: 'rgba(255,255,255,0.95)', shadow: false, weight: 800 });
  ctx.restore();
}
const KS = { chain: 1 };

// ---- 1 · the choice
S(0.0, { tr: 'cut', lift: 110, cam: [[0, 540, 1020, 1.0], [1.2, 540, 1010, 1.03]],
  draw() { setStudio(); char('kevin', 300, FLOOR - 40, 0.8, { emo: [[0, 'grin']], look: [0.4, -0.4], jump: [[0, 0], [0.3, 16, 0.12], [0.45, 0, 0.12]] }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']], look: [-0.3, -0.3] }); studioPodiums(); },
  ui() { tText('MILLIONEN ODER HERZSCHLÄGE?', 540, 200, 56, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14, maxW: 1000 });
    iconCard(285, 462, 'OPTION 1', '35 MILLIONEN', 'SOFORT', PAL.green, 0.03, 'cash'); iconCard(795, 462, 'OPTION 2', '1 € / HERZSCHLAG', '1 JAHR LANG', PAL.red, 0.15, 'heart'); tText('VS', 540, 462, 50, { color: '#fff', stroke: PAL.purple, strokeW: 26 }); },
  sfx: [[0.0, 'sting'], [0.03, 'pop', 1], [0.15, 'pop', 1.2]] });
// ---- 2 · insert: 35 million
S(1.2, { tr: 'zoomIn', cam: [[1.2, 540, 960, 1.0], [2.45, 540, 960, 1.1]],
  draw() { rays('#0e8a45', '#14a956', { cy: 940 }); briefcase(540, 1200, 1.3, EZ.o3(clamp((TT - 1.25) / 0.4))); billRain('m2', 1.3, 30, { burst: [540, 1000], spread: 0.3, w: 120 }); },
  ui() { const k = springEase(TT - 1.25, 300, 14); ctx.save(); ctx.translate(540, 470); ctx.scale(k, k); tText('35.000.000 €', 0, 0, 120, { color: '#fff', stroke: '#064d26', strokeW: 22, maxW: 1000 }); ctx.restore(); },
  sfx: [[1.25, 'cashReg'], [1.3, 'moneyRain', 0.9]] });
// ---- 3 · insert: 1 € for every heartbeat
S(2.45, { tr: 'whipL', cam: [[2.45, 540, 960, 1.08], [4.0, 540, 960, 1.0]],
  draw() { rays('#2a1150', '#3d1a70', { cy: 940 }); glow(540, 900, 520, '#ff3b5c', 0.35); const per = 0.85, k = 1 + 0.25 * Math.max(0, 1 - ((TT % per) / per) * 6); heartIcon(540, 900, 240 * k);
    for (let i = 0; i < 4; i++) { const t0 = 2.6 + i * 0.85, y = bounceY(TT - t0, 1000, 1430, 4800, 0.3); if (TT > t0) coin(300 + i * 160, y, 46, { sx: Math.cos(TT * 5 + i), label: '1€' }); } },
  ui() { tText('1 € PRO HERZSCHLAG', 540, 380, 84, { color: '#fff', stroke: '#5a0a18', strokeW: 18, maxW: 1000 }); },
  sfx: [[2.5, 'heartbeat', 1.6], [2.62, 'coin', 1.4], [3.47, 'coin', 1.5]] });
// ---- 4 · insert: one year
S(4.0, { tr: 'flash', cam: [[4.0, 540, 960, 1.0], [5.62, 540, 940, 1.08]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900 }); const flips = [4.1, 4.3, 4.5, 4.7, 4.9], n = flips.filter((t) => TT >= t).length; calendarPage(540, 980, 1.2, ['JAN', 'MÄR', 'JUN', 'SEP', 'NOV', 'DEZ'][n], ['1', '1', '1', '1', '1', '31'][n]); },
  ui() { info('1 JAHR LANG', 4.8, { y: 360, bg: PAL.red, size: 64 }); },
  sfx: [[4.1, 'flip'], [4.3, 'flip', 1.1], [4.5, 'flip', 1.2], [4.7, 'flip', 1.3], [4.9, 'flip', 1.4], [4.8, 'pop', 1]] });
// ---- 5 · Kevin didn't hesitate for a second
S(5.62, { tr: 'whipR', lift: 90, cam: [[5.62, 320, 1140, 1.55], [7.5, 310, 1110, 1.7]], shake: [[6.6, 18, 0.35]],
  draw() { setStudio({ blur: 3 }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']] });
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[5.62, 'idle'], [5.95, 'raiseR'], [6.45, 'slamR']], emo: [[5.62, 'grin'], [6.45, 'angry'], [6.9, 'smug']], look: [0.4, 0.6] });
    studioPodiums({ pressL: TT > 6.6 ? 1 : 0, litL: TT > 6.6 ? 0.8 : 0 }); impactLines(300, 1250, 120, 380, 12, 6.6); },
  ui() { info('KEINE SEKUNDE GEZÖGERT', 6.7, { y: 380, bg: PAL.red, size: 50 }); },
  sfx: [[5.95, 'whooshUp', 1.2], [6.6, 'slam'], [6.7, 'buzzerWin']] });
// ---- 6 · "35 million. Now. Give it here!"
S(7.5, { tr: 'cut', cam: [[7.5, 540, 1000, 1.25], [10.0, 540, 980, 1.35]],
  draw() { setStudio({ blur: 6 }); char('kevin', 540, FLOOR + 60, 0.95, { pose: [[0, 'holdBoth']], emo: [[7.5, 'grin'], [9.4, 'laugh']], look: [0, 0.5], holdR: () => {}, holdL: () => {} });
    const open = EZ.o3(clamp((TT - 8.75) / 0.4)); briefcase(540, FLOOR - 300, 0.62, open); if (open > 0) confetti('c6', 8.8, 50, { x: 540, y: 900 }); },
  ui() { hudKevin({ y: 260, t0: 7.6 }); info('HER DAMIT!', 9.45, { y: 470, bg: PAL.green, size: 62 }); },
  sfx: [[8.75, 'creak', 1.3], [8.8, 'cashCannon'], [9.45, 'pop', 1]] });
// ---- 7 · HAHAHA
S(10.0, { tr: 'flash', lift: 280, cam: [[10.0, 540, 1080, 1.1], [11.14, 540, 1050, 1.18]],
  draw() { setStudio(); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'neutral']], look: [-0.7, -0.2] });
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[0, 'armsUp']], emo: [[0, 'laugh']], jump: [[10.0, 0], [10.1, 150, 0.2], [10.35, 0, 0.18], [10.6, 100, 0.18], [10.85, 0, 0.18]] }); studioPodiums({ litL: 0.5 }); billRain('r7', 9.8, 30, { spread: 1.2 }); },
  ui() { popText('HAHAHA!', 330, 560, 10.05, 92, PAL.yellow, -0.1, 30); },
  sfx: [[10.1, 'boing'], [10.6, 'boing'], [10.05, 'applause', 1.0]] });
// ---- 8 · "1 € per heartbeat? Am I a hospital or what?"
S(11.14, { tr: 'whipL', cam: [[11.14, 540, 1000, 1.65], [14.5, 540, 980, 1.78]],
  draw() { setStudio({ blur: 8 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[11.14, 'holdR'], [12.8, 'shrug']], emo: [[11.14, 'smug'], [12.8, 'laugh']], look: [0.4, 0], holdR: () => coin(0, -40, 34, { sx: 1, label: '1€' }) });
    if (TT > 13.1) { const k = springEase(TT - 13.1, 280, 12); ctx.save(); ctx.translate(830, 720); ctx.scale(k, k); fillRR(-90, -90, 180, 180, 24, '#ffffff'); fillRR(-22, -66, 44, 132, 8, PAL.red); fillRR(-66, -22, 132, 44, 8, PAL.red); ctx.restore(); } },
  ui() { info('KRANKENHAUS? 🏥', 13.15, { y: 400, bg: PAL.red, size: 54 }); },
  sfx: [[11.2, 'coin', 1.4], [12.8, 'swish', 0.8], [13.15, 'pop', 1], [13.2, 'heartbeat', 0.8]] });
// ---- 9 · Jonas laces up his running shoes
S(14.5, { tr: 'whipR', cam: [[14.5, 540, 960, 1.0], [16.6, 540, 960, 1.08]],
  draw() { setStudio({ blur: 10 }); const pull = EZ.io(clamp((TT - 15.5) / 0.6));
    ctx.save(); ctx.translate(540, 1050); ctx.scale(1.6, 1.6); fillRR(-180, -50, 360, 120, 60, '#ff4fa3'); fillRR(-180, 40, 380, 40, 20, '#ffffff'); fillRR(-60, -90, 140, 70, 30, '#ff7ab8');
    for (let i = 0; i < 4; i++) line(-40 + i * 30, -70, 10 + i * 30, -40, 6, '#ffffff'); ctx.beginPath(); ctx.moveTo(40, -80); ctx.quadraticCurveTo(80, -140 - pull * 40, 130 - pull * 30, -110); ctx.lineWidth = 7; ctx.strokeStyle = '#ffffff'; ctx.stroke(); ctx.restore();
    bigArm('jonas', 1300, 1900, 820, 1000, 160, false); },
  ui() { info('LAUFSCHUHE AN', 15.6, { y: 400, bg: PAL.pink, size: 56 }); },
  sfx: [[15.5, 'swish', 1.2], [15.8, 'squeak'], [15.6, 'pop', 1]] });
// ---- 10 · ...and takes the heartbeats
S(16.6, { tr: 'cut', lift: 90, cam: [[16.6, 780, 1150, 1.6], [18.5, 780, 1170, 1.72]],
  draw() { setStudio({ blur: 3 }); char('kevin', 300, FLOOR - 40, 0.8, { pose: [[0, 'holdBoth']], emo: [[0, 'grin']], holdR: () => {}, holdL: () => {} });
    char('jonas', 780, FLOOR - 40, 0.8, { pose: [[16.6, 'raiseR'], [17.1, 'pressR']], emo: [[16.6, 'calm'], [17.4, 'happy']], look: [0.2, 0.7] });
    studioPodiums({ pressR: TT > 17.3 ? 0.6 : 0, litR: TT > 17.3 ? 0.6 : 0 }); if (TT > 17.3) heartIcon(960, 860, 46 * (1 + 0.2 * Math.sin(TT * 9))); },
  sfx: [[17.3, 'click'], [17.35, 'heartbeat', 0.8]] });
// ---- 11 · Kevin almost falls off his chair laughing
S(18.5, { tr: 'whipL', lift: 260, cam: [[18.5, 540, 1150, 1.05], [21.2, 540, 1120, 1.12]],
  draw() { setDaniRoom({ blur: 3 }); const fall = EZ.i2(clamp((TT - 20.1) / 0.45));
    ctx.save(); ctx.translate(540, FLOOR + 30); ctx.rotate(fall * 0.5); fillRR(-120, -320, 240, 40, 12, '#2b2440'); fillRR(-100, -280, 20, 280, 6, '#2b2440'); fillRR(80, -280, 20, 280, 6, '#2b2440'); ctx.restore();
    char('kevin', 540 + fall * 80, FLOOR + 30 + fall * 60, 0.9, { pose: [[0, 'laughBelly']], emo: [[0, 'laugh']], lean: [[18.5, -0.1], [18.8, 0.08, 0.15], [19.1, -0.08, 0.15], [19.4, 0.08, 0.15], [20.1, 0.9, 0.4]], extras: KS }); },
  ui() { popText('HAHA', 260, 520, 18.7, 70, PAL.yellow, -0.15); popText('HAHA', 820, 460, 19.1, 70, PAL.yellow, 0.15); },
  sfx: [[18.7, 'popHi', 1], [19.1, 'popHi', 1.2], [20.5, 'thud'], [20.55, 'punch']] });
// ---- 12 · BUMM — 1 €. BUMM — another 1 €.
S(21.2, { tr: 'zoomIn', cam: [[21.2, 540, 960, 1.0], [23.82, 540, 960, 1.1]],
  draw() { rays('#2a1150', '#3d1a70', { cy: 940 }); glow(540, 900, 520, '#ff3b5c', 0.35); const beats = [21.2, 22.5], last = beats.filter((t) => TT >= t).pop() ?? 0, k = 1 + 0.35 * Math.max(0, 1 - (TT - last) * 5); heartIcon(540, 900, 210 * k);
    beats.forEach((t, i) => { if (TT > t + 0.1) coin(300 + i * 480, bounceY(TT - t - 0.1, 600, 1180, 4800, 0.3), 70, { label: '1€', sx: Math.cos(TT * 5 + i) }); }); },
  ui() { popText('BUMM!', 540, 520, 21.2, 110, '#ffffff', -0.05, 0); if (TT > 22.5) popText('BUMM!', 540, 520, 22.5, 120, '#ffffff', 0.05, 0); hud('KONTO · JONAS', [[0, 0], [21.85, 1], [23.3, 2]], { y: 260, scale: 0.9 }); },
  sfx: [[21.2, 'heartbeat', 0.5], [21.85, 'coin', 1.4], [22.5, 'heartbeat', 0.5], [23.3, 'coin', 1.6]] });
// ---- 13 · because he thought he'd won...
S(23.82, { tr: 'zoomOut', cam: [[23.82, 540, 1000, 1.6], [25.74, 540, 980, 1.7]],
  draw() { setDaniRoom({ blur: 8 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[23.82, 'holdBoth'], [24.9, 'cheer']], emo: [[0, 'grin']], extras: { chain: 1, shades: clamp((TT - 24.2) / 0.3) }, holdR: () => {}, holdL: () => {} }); billRain('r13', 24.8, 24, { spread: 1 }); },
  ui() { hudKevin({ y: 260, scale: 0.85 }); info('„SCHON GEWONNEN!"', 25.05, { y: 470, bg: PAL.green, size: 52 }); },
  sfx: [[24.25, 'bling'], [25.05, 'pop', 1], [24.9, 'moneyRain', 0.8]] });
// ---- 14 · a garage full of supercars
S(25.74, { tr: 'whipL', lift: 200, cam: [[25.74, 540, 1150, 1.0], [28.14, 540, 1120, 1.06]],
  draw() { setLuxGarage(); const cols = ['#ffb800', '#e8262f', '#2f6df6', '#41c06a'];
    cols.forEach((c, i) => { const t0 = 25.9 + i * 0.3, k = springEase(TT - t0, 200, 14); if (TT < t0) return; ctx.save(); ctx.translate(540, 1150 + i * 150); ctx.scale(0.55 + i * 0.08, 0.55 + i * 0.08); ctx.globalAlpha = Math.min(1, k); supercar((1 - k) * 900, 0, 1, { col: c }); ctx.restore(); }); },
  ui() { hudKevin({ y: 260, scale: 0.85 }); info('SUPERSPORTWAGEN  −14 MIO. €', 27.3, { y: 470, bg: PAL.red, size: 44 }); },
  sfx: [[25.9, 'engine'], [26.5, 'carHorn'], [27.3, 'cashReg'], [27.32, 'pop', 1]] });
// ---- 15 · his own island
S(28.14, { tr: 'whipR', cam: [[28.14, 540, 960, 1.0], [29.4, 540, 960, 1.06]],
  draw() { setIsland(); const k = springEase(TT - 28.2, 180, 14); ctx.save(); ctx.translate(540, 1300); ctx.scale(k * 0.45, k * 0.45); villa(0, 0, 1); ctx.restore(); },
  ui() { hudKevin({ y: 260, scale: 0.85 }); info('EIGENE INSEL  −12 MIO. €', 29.0, { y: 470, bg: PAL.red, size: 48 }); },
  sfx: [[28.2, 'whoosh', 0.9], [28.4, 'waves', 1.0], [29.0, 'cashReg']] });
// ---- 16 · ...and suddenly lots of new girlfriends
S(29.4, { tr: 'flash', lift: 230, cam: [[29.4, 540, 1150, 1.0], [32.7, 540, 1120, 1.08]],
  draw() { setIsland({ party: 1 });
    GIRLS.forEach((g, i) => { const t0 = 30.3 + i * 0.35, x = [230, 830, 690][i]; if (TT < t0) return; const k = springEase(TT - t0, 260, 13); char(g, x, FLOOR + 40 + (1 - k) * 600, 0.78, { pose: [[0, i === 1 ? 'waveR' : 'hips']], emo: [[0, 'love']], look: [i === 0 ? 0.6 : -0.6, 0] }); });
    char('kevin', 450, FLOOR + 60, 0.88, { pose: [[0, 'cheer']], emo: [[0, 'grin']], extras: { chain: 1, shades: 1 } });
    for (let i = 0; i < 5; i++) heartIcon(250 + i * 160, 700 - ((TT * 120 + i * 80) % 300), 22, '#ff4fa3'); },
  ui() { hudKevin({ y: 260, scale: 0.85 }); info('NEUE „FREUNDINNEN"', 31.76, { y: 470, bg: PAL.pink, size: 50 }); },
  sfx: [[30.3, 'pop', 1.2], [30.65, 'pop', 1.35], [31.0, 'pop', 1.5], [31.76, 'kiss'], [31.8, 'cashReg', 0.8], [29.5, 'carMusic', 2.8]] });
// ---- 17 · "My heart only beats for luxury!"
S(32.7, { tr: 'zoomIn', cam: [[32.7, 540, 1000, 1.65], [35.34, 540, 980, 1.8]], punch: [[34.66, 0.14]],
  draw() { setIsland({ party: 1, blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[32.7, 'hips'], [34.2, 'cheer']], emo: [[0, 'grin']], extras: { chain: 1, shades: 1 } }); },
  ui() { info('NUR NOCH LUXUS', 34.7, { y: 400, bg: PAL.gold, fg: '#1b1530', size: 56 }); },
  sfx: [[34.7, 'bling'], [34.75, 'pop', 1]] });
// ---- 18 · meanwhile Jonas trains: jogging
S(35.34, { tr: 'glitch', lift: 260, cam: [[35.34, 540, 1150, 1.0], [37.0, 540, 1130, 1.05]],
  draw() { setStreet({ blur: 2 }); char('jonas', 540, FLOOR + 40, 0.9, { pose: [[0, { la: [0.9, -1.3], ra: [0.9, -1.3] }]], emo: [[0, 'happy']], look: [0.6, 0], walk: 1.3 }); speedLines(16, 0.25, 'jog'); },
  ui() { info('WÄHRENDDESSEN…', 35.4, { y: 360, size: 54 }); heartMonitor(820, 560, 360, 200, { speed: 1.6 }); },
  sfx: [[35.4, 'pop', 0.9], [35.5, 'footsteps', 1.5], [35.8, 'heartbeat', 1.0]] });
S(37.0, { tr: 'whipR', lift: 260, cam: [[37.0, 540, 1150, 1.0], [38.26, 540, 1130, 1.05]],
  draw() { setLeoRoom({ blur: 3 }); char('jonas', 540 + Math.sin(TT * 12) * 6, FLOOR + 40, 0.9, { pose: [[0, { la: [0.9, -1.3], ra: [0.9, -1.3] }]], emo: [[0, 'happy']], walk: 1.4, extras: { sweat: 1 } }); },
  ui() { info('JOGGEN', 37.05, { y: 360, bg: PAL.green, size: 56 }); heartMonitor(820, 560, 360, 200, { speed: 1.9 }); },
  sfx: [[37.05, 'pop', 1], [37.1, 'footsteps', 1.1], [37.4, 'coin', 1.5]] });
// ---- 19 · push-ups
S(38.26, { tr: 'whipL', cam: [[38.26, 540, 1050, 1.0], [39.3, 540, 1030, 1.08]],
  draw() { setLeoDesk({ blur: 6 }); pushups(520, 1200, 1.1); },
  ui() { info('LIEGESTÜTZE', 38.3, { y: 360, bg: PAL.orange, size: 56 }); heartMonitor(820, 560, 360, 200, { speed: 2.2 }); },
  sfx: [[38.3, 'pop', 1.1], [38.5, 'grunt'], [38.95, 'grunt'], [38.7, 'coin', 1.6]] });
// ---- 20 · sprinting up the stairs
S(39.3, { tr: 'whipU', cam: [[39.3, 540, 1000, 1.0], [40.6, 540, 940, 1.05]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#dfe5f5'], [1, '#aab3cc']]); ctx.fillRect(-600, -400, 2300, 2800); stairs(540, 1550, 1.0); const u = clamp((TT - 39.3) / 1.3), x = lerp(120, 900, u), y = lerp(1550, 830, u);
    char('jonas', x, y, 0.75, { pose: [[0, { la: [0.9, -1.3], ra: [0.9, -1.3] }]], emo: [[0, 'happy']], walk: 1.6, extras: { sweat: 1 } }); },
  ui() { info('TREPPEN-SPRINT', 39.35, { y: 360, bg: PAL.purple, size: 56 }); heartMonitor(820, 560, 360, 200, { speed: 2.6 }); },
  sfx: [[39.35, 'pop', 1.2], [39.4, 'footsteps', 1.2], [39.8, 'heartbeat', 0.8]] });
// ---- 21 · every beat rings his account (counter visibly running, unreadable)
S(40.6, { tr: 'zoomIn', cam: [[40.6, 540, 960, 1.0], [42.92, 540, 960, 1.08]],
  draw() { rays('#0c7a3e', '#11954c', { cy: 940 }); for (let i = 0; i < 18; i++) { const u = ((TT * 0.9 + i / 18) % 1); coin(160 + (i * 211) % 760, 300 + u * 1200, 36, { sx: Math.cos(TT * 5 + i), label: '1€' }); } blurCounter(540, 930, 820, 300, 'KONTO · JONAS'); },
  ui() { info('JEDER SCHLAG = +1 €', 40.7, { y: 400, bg: PAL.green, size: 52 }); heartMonitor(540, 1250, 520, 200, { speed: 2.4 }); },
  sfx: [[40.7, 'pop', 1], [41.2, 'coinPour', 1.3], [41.68, 'cashReg', 0.7]] });
// ---- 22 · one morning Kevin wakes up...
S(42.92, { tr: 'zoomOut', cam: [[42.92, 540, 1000, 1.0], [44.72, 540, 990, 1.06]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#ffe6b0'], [1, '#f6c48a']]); ctx.fillRect(-600, -400, 2300, 2800); windowFrame(640, 260, 320, 320, () => { ctx.fillStyle = '#7cc6ff'; ctx.fillRect(640, 260, 320, 320); circ(820, 380, 60, '#fff3a6'); });
    sleepingKevin(540, 1180, 0.95, clamp((TT - 44.1) / 0.3)); },
  ui() { info('EINES MORGENS…', 43.0, { y: 360, size: 54 }); },
  sfx: [[43.0, 'pop', 0.9], [43.1, 'birds', 1.5], [44.1, 'swish', 0.8]] });
// ---- 23 · ...the girlfriends are gone
S(44.72, { tr: 'cut', lift: 230, cam: [[44.72, 540, 1150, 1.0], [46.38, 560, 1130, 1.06]],
  draw() { setIsland(); char('kevin', 540, FLOOR + 40, 0.9, { pose: [[0, 'shrug']], emo: [[0, 'confused']], look: [[44.72, [-0.8, 0]], [45.4, [0.8, 0]]], extras: { chain: 1 } });
    for (let i = 0; i < 3; i++) { ctx.save(); ctx.globalAlpha = 0.5; fillRR(150 + i * 300, FLOOR - 30, 160, 20, 10, 'rgba(0,0,0,0.2)'); ctx.restore(); } },
  ui() { info('DIE FREUNDINNEN: WEG', 45.9, { y: 400, bg: PAL.red, size: 52 }); },
  sfx: [[45.0, 'tension', 1.2], [45.9, 'dun']] });
// ---- 24 · with three sports cars
S(46.38, { tr: 'whipR', cam: [[46.38, 540, 1100, 1.0], [47.6, 540, 1080, 1.05]],
  draw() { setStreet(); ['#ffb800', '#e8262f', '#2f6df6'].forEach((c, i) => { const x = lerp(-400 - i * 700, 1900, EZ.i2(clamp((TT - 46.45 - i * 0.12) / 1.1))); supercar(x, 1500 + i * 120, 0.6, { col: c, wheelSpin: x / 60 });
    const g = GIRLS[i]; ctx.save(); ctx.beginPath(); ctx.rect(x - 200, 1100 + i * 120, 300, 300); ctx.clip(); char(g, x - 60, 1530 + i * 120, 0.42, { pose: [[0, 'waveR']], emo: [[0, 'smug']] }); ctx.restore(); }); },
  ui() { info('MIT 3 SPORTWAGEN', 46.8, { y: 400, bg: PAL.red, size: 54 }); },
  sfx: [[46.45, 'engine'], [46.6, 'skid'], [46.8, 'pop', 1], [47.0, 'carHorn']] });
// ---- 25 · ...and his credit card
S(47.6, { tr: 'zoomIn', cam: [[47.6, 540, 960, 1.0], [48.96, 540, 960, 1.1]],
  draw() { setStreet({ blur: 10 }); const fly = clamp((TT - 47.9) / 0.9); creditCard(540 + fly * 520, 960 - Math.sin(fly * Math.PI) * 300, 1.6 * (1 - fly * 0.6), fly * 3); },
  ui() { hudKevin({ y: 260, scale: 0.85 }); info('+ SEINE KREDITKARTE', 48.1, { y: 590, bg: PAL.red, size: 52 }); },
  sfx: [[47.9, 'whoosh', 1.1], [48.1, 'cashReg'], [48.15, 'pop', 1]] });
// ---- 26 · "They robbed me!"
S(48.96, { tr: 'zoomIn', cam: [[48.96, 540, 1000, 1.7], [50.56, 540, 960, 1.85]], shake: [[49.0, 22, 0.5]], punch: [[49.46, 0.15]],
  draw() { setIsland({ blur: 10 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'headGrab']], emo: [[0, 'shock']], extras: { chain: 1, sweat: 1 } }); },
  ui() { info('AUSGERAUBT!', 49.5, { y: 380, bg: PAL.red, size: 74, rot: -0.07 }); },
  sfx: [[49.0, 'shockHit'], [49.5, 'stamp']] });
// ---- 27 · Jonas just shakes his head
S(50.56, { tr: 'whipL', cam: [[50.56, 540, 1000, 1.75], [52.1, 540, 980, 1.85]],
  draw() { setLeoRoom({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[0, 'serious']], extras: { glasses: true, sweat: 0 }, turn: [[50.56, 0], [50.8, -0.5, 0.15], [51.05, 0.5, 0.15], [51.3, -0.5, 0.15], [51.55, 0, 0.15]] }); },
  sfx: [[50.7, 'swish', 0.7], [51.0, 'swish', 0.8]] });
// ---- 28 · "Show off with money and you won't find love, bro."
S(52.1, { tr: 'cut', cam: [[52.1, 540, 1000, 1.75], [54.8, 540, 980, 1.92]],
  draw() { setLeoRoom({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[52.1, 'pointL'], [53.4, 'armsCross']], emo: [[0, 'serious']], extras: { glasses: true } }); },
  ui() { info('ANGEBEN ≠ LIEBE', 53.84, { y: 400, bg: PAL.pink, size: 58 }); },
  sfx: [[52.2, 'swish', 0.9], [53.84, 'pop', 1], [53.9, 'heartbeat', 0.6]] });
// ---- 29 · "Only people who love your money."
S(54.8, { tr: 'zoomIn', cam: [[54.8, 540, 960, 1.0], [57.1, 540, 960, 1.08]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 940 }); const k = springEase(TT - 54.9, 220, 12); ctx.save(); ctx.translate(540, 960); ctx.scale(k, k); heartIcon(0, 0, 230, '#ff4fa3'); tText('€', 0, 10, 220, { color: '#ffffff', stroke: '#8a1f55', strokeW: 18 }); ctx.restore();
    if (TT > 55.6) { ctx.save(); ctx.translate(540, 960); ctx.rotate(-0.7); fillRR(-320, -18, 640, 36, 18, PAL.red); ctx.restore(); } },
  ui() { info('SIE LIEBEN DEIN GELD', 55.6, { y: 380, bg: PAL.red, size: 52 }); },
  sfx: [[54.9, 'pop', 0.8], [55.6, 'stamp'], [55.65, 'glitch']] });
// ---- 30 · "Whatever! 35 million never runs out!"
S(57.1, { tr: 'whipR', cam: [[57.1, 540, 1000, 1.65], [60.02, 540, 980, 1.78]],
  draw() { setIsland({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[57.1, 'shrug'], [58.2, 'cheer']], emo: [[57.1, 'smug'], [58.2, 'laugh']], extras: { chain: 1, shades: 1 } }); },
  ui() { info('„GEHT NIE ZU ENDE!"', 58.3, { y: 400, bg: PAL.yellow, fg: '#1b1530', size: 54 }); },
  sfx: [[57.15, 'swish', 0.9], [58.3, 'pop', 1.1]] });
// ---- 31-32 · garage, island, parties: the costs pile up
S(60.02, { tr: 'slide', cam: [[60.02, 540, 960, 1.0], [62.5, 540, 980, 1.06]],
  draw() { setDark('#3a1020', '#0a0408'); supercar(540, 1400, 0.7, { col: '#ffb800' });
    const R = RNG('bills31'); for (let i = 0; i < 12; i++) { const t0 = 60.1 + i * 0.13, x = 260 + R.f() * 560, y = bounceY(TT - t0, -300, 1080 - (i % 4) * 40, 3600, 0.2); if (TT > t0) letter(x, y, 0.42, ['GARAGE', 'INSEL', 'PARTY', 'PERSONAL'][i % 4], ['60.000 €', '250.000 €', '120.000 €', '80.000 €'][i % 4], R.n(0.4)); } },
  ui() { hudKevin({ y: 260, scale: 0.85 }); info('JEDEN MONAT', 60.3, { y: 470, bg: PAL.red, size: 52 }); },
  sfx: [[60.1, 'paperPile', 1.6], [60.3, 'pop', 1], [62.6, 'cashReg', 0.7]] });
S(62.5, { tr: 'glitch', cam: [[62.5, 540, 960, 1.0], [66.16, 540, 960, 1.05]],
  draw() { ctx.fillStyle = rad(540, 700, 40, 900, [[0, '#7a1d2e'], [1, '#250d1e']]); ctx.fillRect(-600, -400, 2300, 2800);
    ctx.beginPath(); const N = 40; for (let i = 0; i <= N * clamp((TT - 62.6) / 2.6); i++) { const u = i / N, px = 140 + u * 800, py = 560 + u * 600 + Math.sin(u * 20) * 18; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.lineWidth = 14; ctx.strokeStyle = '#ff4a4a'; ctx.lineCap = 'round'; ctx.stroke(); },
  ui() { hudKevin({ y: 300 }); info('KONTO SCHRUMPFT', 65.35, { y: 1300, bg: PAL.red, size: 52 }); },
  sfx: [[62.6, 'descend'], [65.35, 'pop', 0.9], [65.4, 'cashReg', 0.6]] });
// ---- 33 · the last day of the year
S(66.16, { tr: 'spin', cam: [[66.16, 540, 960, 1.0], [68.42, 540, 940, 1.08]],
  draw() { rays('#d4520a', '#ff7a12', { cy: 900, spin: 0.15 }); calendarPage(540, 980, 1.2, 'DEZ', 31); },
  ui() { info('LETZTER TAG DES JAHRES', 66.25, { y: 360, size: 50 }); },
  sfx: [[66.25, 'pop', 1], [66.6, 'tension', 1.5]] });
// ---- 34 · Kevin opens his account
S(68.42, { tr: 'zoomIn', cam: [[68.42, 540, 1000, 1.6], [69.76, 540, 970, 1.75]],
  draw() { setIsland({ night: 1, blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'holdR']], emo: [[0, 'scared']], look: [0.2, 0.6], extras: { chain: 1, sweat: 1 }, holdR: () => phone(0, -60, 0.32, -0.1, () => { ctx.fillStyle = '#1d48b8'; ctx.fillRect(-84, -176, 168, 352); tText('BANK', 0, 0, 34, { color: '#fff', shadow: false }); }) }); },
  sfx: [[68.5, 'phoneTap'], [68.9, 'phoneTap'], [69.0, 'heartbeat', 0.8]] });
// ---- 35 · 1.800.000 € — nothing more left
S(69.76, { tr: 'cut', cam: [[69.76, 540, 960, 1.0], [73.34, 540, 960, 1.12]], shake: [[69.8, 16, 0.5]],
  draw() { setIsland({ night: 1, blur: 14 }); bankApp(540, 1000, 2.6, '1.800.000 €', PAL.red); glow(540, 900, 520, '#ff3030', 0.3); },
  ui() { info('MEHR IST NICHT ÜBRIG', 72.3, { y: 330, bg: PAL.red, size: 52 }); },
  sfx: [[69.8, 'declined'], [72.3, 'stamp']] });
// ---- 36 · Kevin's heart races like never before...
S(73.34, { tr: 'zoomIn', cam: [[73.34, 540, 1000, 1.75], [75.48, 540, 980, 1.95]],
  draw() { setIsland({ night: 1, blur: 11 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'headGrab']], emo: [[0, 'scared']], extras: { chain: 1, sweat: 1, pale: 1 } }); },
  ui() { heartMonitor(540, 420, 520, 200, { speed: 3.2 }); },
  sfx: [[73.4, 'heartbeat', 2.0]] });
// ---- 37 · ...but not one beat counts for him
S(75.48, { tr: 'cut', cam: [[75.48, 540, 960, 1.0], [78.0, 540, 960, 1.06]],
  draw() { setDark('#2a1640', '#05030c'); const per = 0.4, k = 1 + 0.3 * Math.max(0, 1 - ((TT % per) / per) * 6); heartIcon(540, 900, 190 * k, '#ff3b5c'); tText('0 €', 540, 1250, 150, { color: '#ff5a5a', stroke: '#1b0f2e', strokeW: 18 }); },
  ui() { info('FÜR KEVIN: 0 € PRO SCHLAG', 76.1, { y: 360, bg: PAL.red, size: 46 }); },
  sfx: [[75.5, 'heartbeat', 2.4], [76.1, 'pop', 0.8]] });
// ---- 38 · And Jonas? 1 € per heartbeat. A whole year.
S(78.0, { tr: 'whipL', cam: [[78.0, 540, 1000, 1.7], [80.34, 540, 980, 1.85]],
  draw() { setLeoRoom({ blur: 10 }); glow(540, 900, 600, '#fff3b0', 0.3); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], extras: { glasses: true } }); },
  ui() { info('1 € / HERZSCHLAG', 78.8, { y: 340, bg: PAL.red, size: 54 }); heartMonitor(820, 560, 340, 180, { speed: 1.3 }); },
  sfx: [[78.8, 'pop', 1], [78.9, 'heartbeat', 1.2]] });
// ---- 39 · Kevin: 1.800.000 € — Jonas: ???
S(80.34, { tr: 'zoomIn', capY: 1790, cam: [[80.34, 540, 960, 1.0], [82.9, 540, 960, 1.04]],
  draw() { ctx.save(); ctx.beginPath(); ctx.rect(-200, -400, 1480, 1360); ctx.clip(); rays('#7a1d2e', '#9a2a3e', { cy: 560, spin: 0.06 }); char('kevin', 250, 1180, 0.82, { pose: [[0, 'headGrab']], emo: [[0, 'scared']], extras: { chain: 1, sweat: 1, pale: 1 } }); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(-200, 960, 1480, 1300); ctx.clip(); rays('#0c7a3e', '#11954c', { cy: 1440, spin: -0.06 }); char('jonas', 250, 1990, 0.82, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], extras: { glasses: true } }); ctx.restore();
    line(-200, 960, 1280, 960, 16, '#ffffff'); },
  ui() { hud('KONTO · KEVIN', [[0, 1.8e6]], { x: 700, y: 520, scale: 0.95, color: '#ff5a5a' }); blurCounter(700, 1380, 560, 230, 'KONTO · JONAS', { q: true }); },
  sfx: [[80.4, 'heartbeat', 1.4]] });
// ---- 40 · end card: the question
S(82.9, { tr: 'zoomOut', noCap: true, cam: [[82.9, 540, 960, 1.0], [86.0, 540, 960, 1.05]],
  draw() { setLeoRoom({ blur: 18 }); ctx.fillStyle = 'rgba(10,6,24,0.66)'; ctx.fillRect(-600, -400, 2300, 2800); const k = 1 + 0.2 * Math.max(0, 1 - ((TT % 0.85) / 0.85) * 6); heartIcon(540, 1380, 70 * k, '#ff3b5c'); },
  ui() { const k = springEase(TT - 83.0, 220, 15); ctx.save(); ctx.translate(540, 700); ctx.scale(k, k); tText('WIE VIEL HAT', 0, -70, 96, { color: '#fff', stroke: '#140c22', strokeW: 16 }); tText('JONAS JETZT?', 0, 50, 96, { color: PAL.yellow, stroke: '#140c22', strokeW: 16 }); ctx.restore();
    sticker('1 € × HERZSCHLAG × 1 JAHR = ???', 540, 960, 83.5, { bg: PAL.red, size: 42 });
    if (TT > 84.2) { const p = 1 + 0.05 * Math.sin(TT * 8); ctx.save(); ctx.translate(540, 1110); ctx.scale(p, p); sticker('SCHREIB\'S IN DIE KOMMENTARE 👇', 0, 0, 84.2, { bg: PAL.purple, size: 42 }); ctx.restore(); } },
  sfx: [[83.5, 'pop', 1], [84.2, 'pop', 1.2]] });
