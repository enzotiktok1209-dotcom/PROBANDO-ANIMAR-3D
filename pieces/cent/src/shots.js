// =====================================================================
//  shots.js — 1 Million sofort vs 1 Cent pro Sekunde, 1 Jahr. ~46 shots on the trimmed voice (87.6 s) + end card.
//  Subjects sit in the centre band; helper texts in German; Jonas' total is never readable.
// =====================================================================
const KONTO = [[0, 1e6], [34.5, 720000], [37.2, 675000], [39.3, 555000], [59.9, 420000]];
const hudKevin = (o = {}) => hud('KONTO · KEVIN', KONTO, { ...o });
const KS = { chain: 1 };

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
function priceTag(x, y, s, txt, rot = -0.1, col = '#ffffff') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot + Math.sin(TT * 2) * 0.03); ctx.scale(s, s); line(-170, -70, -250, -150, 5, '#ddd'); poly([[-170, -80], [220, -80], [220, 80], [-170, 80], [-230, 0]], col); circ(-185, 0, 14, '#1b1530'); tText(txt, 30, 4, 70, { color: '#1b1530', shadow: false, maxW: 360 }); ctx.restore(); }
function iconCard(x, y, top, big, sub, col, t0, icon) {
  if (TT < t0) return; const k = springEase(TT - t0, 260, 15), w = 450, h = 380;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  fillRR(-w / 2 + 8, -h / 2 + 12, w, h, 28, 'rgba(0,0,0,0.38)'); fillRR(-w / 2, -h / 2, w, h, 28, col); fillRR(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 22, shade(col, 0.12));
  tText(top, 0, -h / 2 + 36, 26, { color: 'rgba(255,255,255,0.9)', shadow: false, letter: 3, weight: 800 });
  fillRR(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18, 'rgba(10,8,30,0.30)');
  const ik = springEase(TT - t0 - 0.12, 280, 12), bob = Math.sin(TT * 3 + x) * 4;
  ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18); ctx.clip(); ctx.translate(0, -h / 2 + 150 + bob); ctx.scale(ik, ik);
  if (icon === 'check') { glow(0, 0, 200, '#a6f0b4', 0.3); giantCheck(0, 0, 0.42, '1.000.000 €', -0.06); }
  else { stopwatch(-80, 0, 0.26, TT * 10); copperCent(90, 0, 58, { sx: Math.cos(TT * 3) }); }
  ctx.restore();
  tText(big, 0, h / 2 - 92, 46, { color: '#fff', maxW: w - 36 }); tText(sub, 0, h / 2 - 40, 28, { color: 'rgba(255,255,255,0.95)', shadow: false, weight: 800 });
  ctx.restore();
}

// ---- 1 · the choice
S(0.0, { tr: 'cut', lift: 110, cam: [[0, 540, 1020, 1.0], [1.1, 540, 1010, 1.03]],
  draw() { setStudio(); char('kevin', 300, FLOOR - 40, 0.8, { emo: [[0, 'grin']], look: [0.4, -0.4], jump: [[0, 0], [0.3, 16, 0.12], [0.45, 0, 0.12]] }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']], look: [-0.3, -0.3], extras: { glasses: true } }); studioPodiums(); },
  ui() { tText('MILLION ODER CENT?', 540, 200, 64, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14, maxW: 1000 });
    iconCard(285, 462, 'OPTION 1', '1 MILLION €', 'SOFORT', PAL.green, 0.03, 'check'); iconCard(795, 462, 'OPTION 2', '1 CENT / SEKUNDE', '1 JAHR LANG', PAL.orange, 0.15, 'cent'); tText('VS', 540, 462, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); },
  sfx: [[0.0, 'sting'], [0.03, 'pop', 1], [0.15, 'pop', 1.2], [0.6, 'applause', 0.5]] });
// ---- 2 · insert: the giant cheque
S(1.1, { tr: 'zoomIn', cam: [[1.1, 540, 960, 1.0], [2.0, 540, 960, 1.08]],
  draw() { rays('#0e8a45', '#14a956', { cy: 940 }); const k = springEase(TT - 1.12, 200, 13); giantCheck(540, 960, 1.15 * k, '1.000.000 €', -0.05 + (1 - k) * 0.4); confetti('ch', 1.15, 60, { x: 540, y: 900 }); },
  ui() { info('SOFORT!', 1.3, { y: 420, bg: PAL.yellow, fg: '#1b1530', size: 66 }); },
  sfx: [[1.15, 'cashReg'], [1.18, 'cashCannon'], [1.3, 'pop', 1]] });
// ---- 3 · insert: one copper cent per second
S(2.0, { tr: 'whipL', cam: [[2.0, 540, 960, 1.08], [3.6, 540, 960, 1.0]],
  draw() { rays('#c4520a', '#e86c0e', { cy: 940 }); glow(540, 900, 460, '#ffd9b8', 0.4); const k = springEase(TT - 2.05, 200, 12); copperCent(540, 880, 230 * k, { sx: Math.cos(TT * 2.2) });
    stopwatch(870, 1260, 0.4, (TT - 2.0) * 6); },
  ui() { tText('1 CENT PRO SEKUNDE', 540, 380, 84, { color: '#fff', stroke: '#6a2a00', strokeW: 18, maxW: 1000 }); },
  sfx: [[2.1, 'coin', 0.8], [2.4, 'tick'], [2.9, 'tick'], [3.4, 'tick']] });
// ---- 4 · insert: a whole year
S(3.6, { tr: 'flash', cam: [[3.6, 540, 960, 1.0], [5.1, 540, 940, 1.08]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900 }); const flips = [3.7, 3.9, 4.1, 4.3, 4.5], n = flips.filter((t) => TT >= t).length; calendarPage(540, 980, 1.2, ['JAN', 'MÄR', 'JUN', 'SEP', 'NOV', 'DEZ'][n], ['1', '1', '1', '1', '1', '31'][n]); },
  ui() { info('EIN GANZES JAHR', 4.4, { y: 360, bg: PAL.orange, size: 60 }); },
  sfx: [[3.7, 'flip'], [3.9, 'flip', 1.1], [4.1, 'flip', 1.2], [4.3, 'flip', 1.3], [4.5, 'flip', 1.4], [4.4, 'pop', 1]] });
// ---- 5 · because Kevin loves fast money (money flies into his eyes)
S(5.1, { tr: 'whipR', cam: [[5.1, 540, 1000, 1.65], [7.0, 540, 980, 1.78]],
  draw() { setStudio({ blur: 8 }); billRain('k5', 5.0, 26, { spread: 1.6 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[5.1, 'hips'], [6.2, 'cheer']], emo: [[5.1, 'grin'], [6.2, 'love']], look: [0, -0.4], extras: { blush: 1 } });
    for (const sd of [-1, 1]) tText('€', 540 + sd * 40, 900 - 4, 46, { color: PAL.green, stroke: '#063d1e', strokeW: 8 }); },
  ui() { info('SCHNELLES GELD 🤑', 5.6, { y: 400, bg: PAL.green, size: 54 }); },
  sfx: [[5.2, 'moneyRain', 1.6], [5.6, 'pop', 1], [6.25, 'bling']] });
// ---- 6 · not even a blink — SLAM
S(7.0, { tr: 'cut', lift: 90, cam: [[7.0, 320, 1140, 1.55], [8.42, 310, 1110, 1.7]], shake: [[7.7, 18, 0.35]],
  draw() { setStudio({ blur: 3 }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']], extras: { glasses: true } });
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[7.0, 'raiseR'], [7.55, 'slamR']], emo: [[7.0, 'grin'], [7.55, 'angry']], look: [0.4, 0.6] });
    studioPodiums({ pressL: TT > 7.7 ? 1 : 0, litL: TT > 7.7 ? 0.8 : 0 }); impactLines(300, 1250, 120, 380, 12, 7.7); },
  ui() { info('NICHT MAL GEBLINZELT!', 7.75, { y: 380, bg: PAL.red, size: 52 }); },
  sfx: [[7.1, 'whooshUp', 1.2], [7.7, 'slam'], [7.8, 'buzzerWin']] });
// ---- 7 · "The million! Now!"
S(8.42, { tr: 'zoomIn', cam: [[8.42, 540, 1000, 1.65], [10.4, 540, 980, 1.78]], punch: [[9.22, 0.15]],
  draw() { setStudio({ blur: 8 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[8.42, 'pointUpR'], [9.2, 'cheer']], emo: [[8.42, 'grin'], [9.2, 'laugh']] });
    if (TT > 9.3) { const k = springEase(TT - 9.3, 220, 13); giantCheck(540, 600 + (1 - k) * -500, 0.55, '1.000.000 €', -0.08); } },
  ui() { hudKevin({ y: 240, t0: 9.3, scale: 0.85 }); },
  sfx: [[8.45, 'swish', 1], [9.22, 'zoomIn'], [9.3, 'whooshDown', 0.9], [9.6, 'cashReg']] });
// ---- 8 · "A cent? Hahaha!"
S(10.4, { tr: 'whipL', cam: [[10.4, 540, 1000, 1.65], [12.04, 540, 980, 1.78]],
  draw() { setStudio({ blur: 8 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[10.4, 'holdR'], [11.2, 'laughBelly']], emo: [[10.4, 'smug'], [11.2, 'laugh']], holdR: () => (TT < 11.2 ? copperCent(0, -40, 28, { sx: 1 }) : null) });
    if (TT > 11.2) { const y = bounceY(TT - 11.2, 1100, 1500, 4800, 0.4); copperCent(700, y, 28, { sx: Math.cos(TT * 9) }); } },
  ui() { popText('HAHAHA!', 540, 400, 11.25, 96, PAL.yellow, -0.06, 20); },
  sfx: [[10.45, 'coin', 1.3], [11.2, 'coinBounce'], [11.3, 'popHi', 1]] });
// ---- 9 · "I wouldn't even bend down for it!" — the cent lies at his feet, he waves it off
S(12.04, { tr: 'cut', lift: 260, cam: [[12.04, 540, 1150, 1.05], [14.0, 540, 1130, 1.12]],
  draw() { setStudio({ blur: 3 }); glow(720, FLOOR + 10, 160, '#ffd9b8', 0.5); copperCent(730, FLOOR + 10, 46, { sx: 0.55 + 0.1 * Math.sin(TT * 3) });
    char('kevin', 470, FLOOR + 40, 0.92, { pose: [[12.04, 'pointR'], [12.9, 'shrug']], emo: [[12.04, 'smug'], [12.9, 'laugh']], look: [[12.04, [0.6, 0.8]], [12.9, [0, 0]]], extras: KS, lean: -0.05 }); },
  ui() { info('NICHT MAL BÜCKEN!', 13.38, { y: 380, bg: PAL.red, size: 56 }); },
  sfx: [[12.1, 'coin', 0.7], [12.9, 'swish', 0.9], [13.38, 'pop', 1]] });
// ---- 10 · but Jonas just pushes up his glasses
S(14.0, { tr: 'whipR', cam: [[14.0, 540, 1000, 1.75], [15.95, 540, 980, 1.9]],
  draw() { setStudio({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[14.0, 'idle'], [14.9, 'thinkR'], [15.5, 'idle']], emo: [[0, 'calm'], [15.5, 'smug']], look: [0, 0], extras: { glasses: true } });
    if (TT > 15.45 && TT < 15.9) { sparkle(480, 950, 46 * (1 - (TT - 15.45) / 0.45), '#fff', TT * 5); sparkle(600, 950, 46 * (1 - (TT - 15.45) / 0.45), '#fff', TT * 5); } },
  ui() { info('DOCH JONAS…', 14.1, { y: 380, bg: PAL.blue, size: 54 }); },
  sfx: [[14.1, 'pop', 0.9], [14.95, 'swish', 0.6], [15.5, 'ting']] });
// ---- 11 · "I'll take the seconds." (presses orange)
S(15.95, { tr: 'cut', lift: 90, cam: [[15.95, 780, 1150, 1.6], [17.14, 780, 1170, 1.7]],
  draw() { setStudio({ blur: 3 }); char('kevin', 300, FLOOR - 40, 0.8, { pose: [[0, 'cheer']], emo: [[0, 'laugh']] });
    char('jonas', 780, FLOOR - 40, 0.8, { pose: [[15.95, 'raiseR'], [16.4, 'pressR']], emo: [[0, 'smug']], look: [0.2, 0.7], extras: { glasses: true } });
    studioPodiums({ pressR: TT > 16.55 ? 0.6 : 0, litR: TT > 16.55 ? 0.6 : 0 }); },
  ui() { info('DIE SEKUNDEN', 16.5, { x: 780, y: 420, bg: PAL.orange, size: 52 }); },
  sfx: [[16.55, 'click'], [16.6, 'ding'], [16.5, 'pop', 1.1]] });
// ---- 12 · "Have fun, professor!"
S(17.14, { tr: 'whipL', cam: [[17.14, 540, 1000, 1.65], [18.58, 540, 980, 1.75]],
  draw() { setStudio({ blur: 8 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[17.14, 'waveR'], [17.9, 'pointR']], emo: [[17.14, 'smug'], [17.9, 'laugh']] }); },
  ui() { info('„PROFESSOR" 🤓', 17.96, { y: 400, bg: PAL.yellow, fg: '#1b1530', size: 56 }); },
  sfx: [[17.2, 'swish', 0.9], [17.96, 'pop', 1.1]] });
// ---- 13 · "...maybe a chewing gum in a year!"
S(18.58, { tr: 'zoomIn', cam: [[18.58, 540, 1050, 1.5], [21.28, 540, 1020, 1.6]],
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 140, 0.95, { pose: [[0, 'laughBelly']], emo: [[0, 'laugh']], lean: [[18.58, -0.06], [18.9, 0.05, 0.2], [19.2, -0.05, 0.2]] });
  },
  ui() { if (TT > 19.7) { const k = springEase(TT - 19.7, 260, 13); ctx.save(); ctx.translate(560, 470); ctx.scale(k, k); thoughtBubble(0, 0, 460, 260, () => gum(0, 0, 1.25)); ctx.restore(); } popText('1 KAUGUMMI? 😂', 540, 240, 20.1, 56, '#ff8fc0', -0.04, 0); },
  sfx: [[19.7, 'bubble'], [20.1, 'popHi', 1], [20.65, 'boing']] });
// ---- 14 · the bet — handshake
S(21.28, { tr: 'whipR', lift: 120, cam: [[21.28, 540, 1150, 1.15], [23.38, 540, 1120, 1.24]], punch: [[22.66, 0.12]],
  draw() { setStudio({ blur: 3 }); const shake = TT > 22.6 ? Math.sin(TT * 30) * 0.06 * clamp(1 - (TT - 22.6) / 0.6) : 0;
    char('kevin', 300, FLOOR + 40, 0.9, { pose: [[21.28, 'pointR'], [21.95, { la: [0.16, -0.12], ra: [0.85 + shake, -0.2] }]], emo: [[21.28, 'smug'], [22.6, 'grin']], look: [0.7, 0] });
    char('jonas', 780, FLOOR + 40, 0.9, { pose: [[21.28, 'armsCross'], [22.3, { la: [0.85 - shake, -0.2], ra: [0.16, -0.12] }]], emo: [[0, 'smug']], look: [-0.7, 0], extras: { glasses: true } }); },
  ui() { info('„WETTEN?"', 21.35, { y: 250, bg: PAL.yellow, fg: '#1b1530', size: 58 }); info('DIE WETTE GILT!', 22.66, { y: 370, bg: PAL.red, size: 58, rot: 0.04 }); },
  sfx: [[21.35, 'pop', 1], [22.55, 'pat'], [22.66, 'impact']] });
// ---- 15 · the race begins
S(23.38, { tr: 'flash', cam: [[23.38, 540, 960, 1.0], [24.92, 540, 960, 1.08]],
  draw() { rays('#1d3fb0', '#2f6df6', { cy: 960, spin: 0.2 }); startFlag(380, 1250, 1.5, 1); stopwatch(700, 900, 0.75, TT > 24.4 ? (TT - 24.4) * 6 : 0); },
  ui() { info('DAS RENNEN BEGINNT', 23.45, { y: 360, size: 56 }); if (TT > 24.4) popText('START!', 540, 1350, 24.4, 80, '#41f08a', 0, 0); },
  sfx: [[23.45, 'pop', 1], [24.4, 'startGun'], [24.45, 'tick']] });
// ---- 16-17 · second 1, second 2 — a cent drops into Jonas' jar each time
function centDropShot(t0, t1, beatAt, label) {
  S(t0, { tr: t0 < 26 ? 'zoomIn' : 'cut', cam: [[t0, 540, 960, 1.0], [t1, 540, 960, 1.06]],
    draw() { setLeoRoom({ blur: 9 }); coinJar(540, 1350, 0.9, 0.02); stopwatch(820, 620, 0.45, TT > beatAt ? 1 : 0); const y = bounceY(TT - beatAt + 0.35, 300, 1250, 4800, 0.3); if (TT > beatAt - 0.35) copperCent(540, y, 44, { sx: Math.cos(TT * 9) }); },
    ui() { info(label, t0 + 0.05, { y: 360, size: 56 }); popText('+1 CENT', 540, 760, beatAt, 70, '#ff9a5a', 0, 20); },
    sfx: [[beatAt - 0.05, 'tick'], [beatAt, 'coinJar'], [t0 + 0.05, 'pop', 1]] });
}
centDropShot(24.92, 26.72, 26.1, 'SEKUNDE 1');
centDropShot(26.72, 28.16, 27.9, 'SEKUNDE 2');
// ---- 18 · Kevin holds his belly laughing
S(28.16, { tr: 'whipL', lift: 260, cam: [[28.16, 540, 1150, 1.05], [30.3, 540, 1130, 1.12]],
  draw() { setDaniRoom({ blur: 3 }); char('kevin', 540, FLOOR + 40, 0.9, { pose: [[0, 'laughBelly']], emo: [[0, 'laugh']], extras: KS, lean: [[28.16, -0.1], [28.4, 0.08, 0.15], [28.65, -0.08, 0.15], [28.9, 0.08, 0.15], [29.15, -0.06, 0.15]] }); },
  ui() { popText('HAHA', 260, 520, 28.3, 70, PAL.yellow, -0.15); popText('HAHA', 820, 460, 28.7, 70, PAL.yellow, 0.15); popText('2 CENT! 😂', 540, 360, 29.2, 60, '#ff9a5a', 0, 10); },
  sfx: [[28.3, 'popHi', 1], [28.7, 'popHi', 1.2], [29.2, 'pop', 1]] });
// ---- 19 · because he already sees himself as the winner (a crown drops on his head)
S(30.3, { tr: 'zoomOut', cam: [[30.3, 540, 1000, 1.6], [33.44, 540, 980, 1.72]],
  draw() { setDaniRoom({ blur: 8 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[30.3, 'hips'], [31.4, 'cheer']], emo: [[0, 'grin']], extras: { chain: 1, shades: clamp((TT - 31.0) / 0.3) } });
    const y = TT < 31.1 ? -200 : bounceY(TT - 31.1, -200, 680, 4200, 0.25); crown(540, y, 0.9); },
  ui() { hudKevin({ y: 240, scale: 0.85 }); info('„SCHON GEWONNEN!"', 31.45, { y: 420, bg: PAL.gold, fg: '#1b1530', size: 50 }); },
  sfx: [[31.1, 'whooshDown', 0.8], [31.42, 'ting'], [31.45, 'pop', 1], [32.6, 'bling']] });
// ---- 20 · a sports car: 280.000 €
S(33.44, { tr: 'whipR', lift: 200, cam: [[33.44, 540, 1150, 1.0], [36.36, 540, 1120, 1.07]],
  draw() { setShowroom(); const x = 540 + 900 * (1 - springEase(TT - 33.5, 110, 16)); supercar(x, 1560, 0.95, { col: '#e8262f', wheelSpin: (x - 540) / 98 }); twinkles('s20', 120, 1200, 840, 200, 6, { s: 26 }); },
  ui() { hudKevin({ y: 240, scale: 0.85 }); priceTag(540, 640, 0.9 * springEase(TT - 34.4, 300, 12), '280.000 €', -0.08); },
  sfx: [[33.5, 'engine'], [34.4, 'pop', 1], [34.5, 'cashReg']] });
// ---- 21 · a Rolex: 45.000 €
S(36.36, { tr: 'whipL', cam: [[36.36, 540, 960, 1.0], [38.28, 540, 960, 1.08]],
  draw() { rays('#3a2a0a', '#5a4210', { cy: 940 }); glow(540, 960, 520, '#ffe9a6', 0.4); const k = springEase(TT - 36.4, 200, 13); ctx.save(); ctx.translate(540, 1000); ctx.scale(k, k); goldWatch(0, 0, 1.0, TT); ctx.restore(); },
  ui() { hudKevin({ y: 240, scale: 0.85 }); priceTag(540, 470, 0.85 * springEase(TT - 37.15, 300, 12), '45.000 €', -0.06, PAL.yellow); },
  sfx: [[36.45, 'sparkle'], [37.15, 'pop', 1], [37.2, 'cashReg'], [37.6, 'tick'], [37.9, 'tick']] });
// ---- 22 · a party for 120.000 €
S(38.28, { tr: 'slide', cam: [[38.28, 540, 960, 1.0], [40.4, 540, 960, 1.06]],
  draw() { setClub(); char('kevin', 540, 1080, 0.75, { pose: [[0, 'cheer']], emo: [[0, 'laugh']], extras: { chain: 1, shades: 1 }, jump: [[38.28, 0], [38.5, 30, 0.12], [38.7, 0, 0.12], [38.9, 30, 0.12], [39.1, 0, 0.12], [39.3, 30, 0.12], [39.5, 0, 0.12]] }); billRain('p22', 38.4, 30, { spread: 2 }); },
  ui() { hudKevin({ y: 240, scale: 0.85 }); info('PARTY  −120.000 €', 39.3, { y: 420, bg: PAL.pink, size: 54 }); },
  sfx: [[38.3, 'carMusic', 2.1], [39.3, 'cashReg'], [39.35, 'pop', 1], [38.5, 'applause', 1.6]] });
// ---- 23 · the whole town talks about it (phones, likes, hearts)
S(40.4, { tr: 'whipR', lift: 230, cam: [[40.4, 540, 1150, 1.0], [42.96, 540, 1130, 1.06]],
  draw() { setStreet(); ['mia', 'jonas', 'lea', 'zoe'].forEach((id, i) => { if (id === 'jonas') return; char(id, 200 + i * 230, FLOOR + 40, 0.72, { pose: [[0, 'phoneR']], emo: [[0, 'shock']], look: [0.3, -0.3] }); });
    char('bote', 660, FLOOR + 40, 0.72, { pose: [[0, 'phoneR']], emo: [[0, 'shock']] });
    for (let i = 0; i < 7; i++) { const u = ((TT * 0.7 + i / 7) % 1); ctx.save(); ctx.globalAlpha = 1 - u; tText(['❤', '👍', '🔥', '❤', '😱', '❤', '👀'][i], 160 + i * 130, 900 - u * 360, 70, { color: '#ff4fa3', shadow: false }); ctx.restore(); } },
  ui() { info('DIE GANZE STADT REDET', 41.0, { y: 400, bg: '#141026', size: 50 }); },
  sfx: [[40.5, 'notify'], [40.9, 'notify'], [41.3, 'phoneTap'], [41.0, 'pop', 1], [41.8, 'notify']] });
// ---- 24 · "I'm a millionaire, baby!"
S(42.96, { tr: 'zoomIn', cam: [[42.96, 540, 1000, 1.65], [45.02, 540, 980, 1.8]], punch: [[43.64, 0.14]],
  draw() { setClub({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[42.96, 'hips'], [43.6, 'cheer']], emo: [[0, 'grin']], extras: { chain: 1, shades: 1 } }); billRain('r24', 42.8, 26, { spread: 2 }); },
  ui() { info('MILLIONÄR, BABY!', 43.7, { y: 400, bg: PAL.gold, fg: '#1b1530', size: 56 }); },
  sfx: [[43.64, 'bassDrop'], [43.7, 'pop', 0.9], [42.96, 'moneyRain', 1.6]] });
// ---- 25 · meanwhile Jonas' counter runs (jar fills, unreadable counter)
S(45.02, { tr: 'glitch', cam: [[45.02, 540, 960, 1.0], [47.42, 540, 960, 1.06]],
  draw() { setLeoRoom({ blur: 9 }); coinJar(540, 1420, 0.85, 0.15 + clamp((TT - 45.0) / 2.4) * 0.3);
    for (let i = 0; i < 6; i++) { const t0 = 45.1 + i * 0.38; if (TT > t0) copperCent(470 + (i % 3) * 70, bounceY(TT - t0, 300, 1050, 4800, 0.2), 30, { sx: Math.cos(TT * 9 + i) }); } blurCounter(540, 560, 760, 240, 'KONTO · JONAS'); },
  ui() { info('WÄHRENDDESSEN…', 45.1, { y: 290, size: 52 }); },
  sfx: [[45.1, 'pop', 0.9], [45.1, 'coinTicks', 2.2, 2.6]] });
// ---- 26 · day and night
S(47.42, { tr: 'whipR', cam: [[47.42, 540, 960, 1.0], [48.64, 540, 960, 1.05]],
  draw() { const u = clamp((TT - 47.42) / 1.15), day = Math.sin(u * TAU) > 0; ctx.fillStyle = day ? lin(0, 0, 0, 1400, [[0, '#7cc6ff'], [1, '#ffe6b0']]) : lin(0, 0, 0, 1400, [[0, '#0b1030'], [1, '#2a2160']]); ctx.fillRect(-600, -400, 2300, 1800);
    const a = Math.PI + u * TAU * 2; circ(540 + Math.cos(a) * 420, 1100 + Math.sin(a) * 600, 90, day ? '#fff1a0' : '#e8ecff'); houseIcon(540, 1380, 0.85, day ? 0 : 1); ctx.fillStyle = '#3d7a3a'; ctx.fillRect(-600, 1380, 2300, 700); },
  ui() { info('TAG UND NACHT', 47.45, { y: 360, size: 54 }); },
  sfx: [[47.45, 'whoosh', 0.8], [47.95, 'whoosh', 1.1], [48.3, 'tick']] });
// ---- 27 · cent by cent
S(48.64, { tr: 'cut', cam: [[48.64, 540, 960, 1.0], [49.5, 540, 960, 1.08]],
  draw() { rays('#c4520a', '#e86c0e', { cy: 940 }); for (let i = 0; i < 8; i++) { const t0 = 48.66 + i * 0.1; if (TT > t0) copperCent(320 + (i % 4) * 150, bounceY(TT - t0, 300, 900 + Math.floor(i / 4) * 200, 5200, 0.3), 60, { sx: Math.cos(TT * 6 + i) }); } },
  ui() { info('CENT FÜR CENT', 48.7, { y: 360, bg: PAL.orange, size: 56 }); },
  sfx: [[48.7, 'coinPour', 0.8]] });
// the street in front of Jonas' house (day): his house, a fence, trees, the sidewalk and the road
function setJonasFront(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1240, [[0, '#7cc6ff'], [1, '#d8f0ff']]); ctx.fillRect(-600, -400, 2300, 1700);
    for (let i = 0; i < 3; i++) ell(((180 + i * 380 + TT * 14) % 1500) - 200, 260 + i * 70, 120, 38, '#ffffff');
    for (const [tx, ts] of [[80, 1.0], [1060, 0.9]]) { ctx.save(); ctx.translate(tx, 1240); ctx.scale(ts, ts); fillRR(-26, -420, 52, 420, 14, '#7a4a2a'); for (const [cx, cy, r] of [[0, -520, 170], [-110, -430, 120], [110, -430, 120], [0, -400, 130]]) circ(cx, cy, r, '#3fbf6a'); circ(-40, -560, 70, '#5bd47f'); ctx.restore(); }
    houseIcon(780, 1240, 1.12, 0); fillRR(740, 1180, 80, 60, 6, '#c9b8a0');
    for (let i = 0; i < 14; i++) fillRR(-100 + i * 90, 1150, 16, 90, 6, '#ffffff'); fillRR(-100, 1170, 1300, 12, 4, '#ffffff'); fillRR(-100, 1210, 1300, 12, 4, '#ffffff');
    ctx.fillStyle = '#c9cbd8'; ctx.fillRect(-600, 1240, 2300, 70); for (let i = 0; i < 12; i++) line(-500 + i * 160, 1240, -500 + i * 160, 1310, 3, 'rgba(0,0,0,0.12)');
    ctx.fillStyle = '#3d3a4f'; ctx.fillRect(-600, 1310, 2300, 1100); for (let i = 0; i < 8; i++) fillRR(-500 + i * 300, 1520, 160, 18, 9, '#f5e9a8');
  });
}
// ---- 28 · 6 months later: Kevin pulls up in front of Jonas' house and gets out
S(49.5, { tr: 'zoomOut', lift: 0, cam: [[49.5, 540, 1000, 1.0], [51.74, 560, 990, 1.05]],
  draw() { setJonasFront();
    char('jonas', 780, 1250, 0.52, { pose: [[0, 'idle'], [51.0, 'armsCross']], emo: [[0, 'calm']], look: [-0.7, 0], extras: { glasses: true } });
    const out = EZ.o2(clamp((TT - 50.9) / 0.4)); if (TT > 50.85) { ctx.save(); ctx.beginPath(); ctx.rect(-200, 0, 1500, 1262); ctx.clip(); char('kevin', 380, 1255 + (1 - out) * 230, 0.62, { pose: [[0, 'hips']], emo: [[0, 'smug']], look: [0.7, 0], extras: { chain: 1, shades: 1 } }); ctx.restore(); }
    const x = lerp(-900, 300, EZ.o3(clamp((TT - 49.55) / 1.15))); supercar(x, 1330, 1.15, { col: '#e8262f', wheelSpin: x / 90 });
    if (TT > 50.82 && TT < 51.0) { ctx.save(); ctx.globalAlpha = 0.6; poly([[260, 1050], [420, 1060], [430, 1290], [250, 1280]], '#ffffff'); ctx.restore(); } },
  ui() { info('6 MONATE SPÄTER', 49.55, { y: 360, size: 56 }); },
  sfx: [[49.55, 'pop', 1], [49.6, 'engine'], [50.6, 'skid'], [50.85, 'carDoor'], [51.3, 'footsteps', 0.4]] });
// ---- 29 · "I still have over half a million"
S(51.74, { tr: 'cut', cam: [[51.74, 540, 1000, 1.65], [54.5, 540, 980, 1.78]],
  draw() { setJonasFront({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[51.74, 'pointR'], [53.0, 'hips']], emo: [[0, 'smug']], extras: { chain: 1, shades: 1 } }); },
  ui() { hudKevin({ y: 240, scale: 0.85 }); info('ÜBER 1/2 MILLION', 53.94, { y: 420, bg: PAL.green, size: 54 }); },
  sfx: [[51.8, 'swish', 0.9], [53.94, 'pop', 1], [54.0, 'cashReg', 0.7]] });
// ---- 30 · "Giving up already?" (white flag)
S(54.5, { tr: 'whipL', cam: [[54.5, 540, 1000, 1.6], [55.4, 540, 990, 1.68]],
  draw() { setJonasFront({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'waveR']], emo: [[0, 'laugh']], extras: { chain: 1, shades: 1 } }); whiteFlag(800, 980, 1.0); },
  ui() { popText('AUFGEBEN? 🏳️', 540, 400, 54.6, 60, '#ffffff', -0.04, 10); },
  sfx: [[54.55, 'swish', 1.1], [54.6, 'popHi', 1]] });
// ---- 31 · "In the end only the last day counts."
S(55.4, { tr: 'zoomIn', cam: [[55.4, 540, 1000, 1.75], [57.24, 540, 980, 1.9]],
  draw() { setJonasFront({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], extras: { glasses: true } }); },
  ui() { info('DER LETZTE TAG ZÄHLT', 56.5, { y: 400, bg: PAL.blue, size: 52 }); },
  sfx: [[55.5, 'tension', 1.5], [56.5, 'pop', 1], [56.9, 'ting']] });
// ---- 32 · nevertheless Kevin books a yacht trip (phone)
S(57.24, { tr: 'whipR', cam: [[57.24, 540, 960, 1.0], [59.86, 540, 940, 1.08]],
  draw() { setDaniRoom({ blur: 10 }); bigArm('kevin', 1250, 1950, 640, 1250, 190);
    phone(560, 1000, 2.2, -0.05, () => { ctx.fillStyle = lin(0, -176, 0, 176, [[0, '#8fd3ff'], [1, '#1d48b8']]); ctx.fillRect(-84, -176, 168, 352); yacht(0, -40, 0.3); tText('YACHT-URLAUB', 0, 30, 15, { color: '#fff', shadow: false });
      const ok = TT > 59.2; fillRR(-62, 100, 124, 44, 22, ok ? PAL.green : PAL.orange); tText(ok ? '✓ GEBUCHT' : 'BUCHEN', 0, 123, 15, { color: '#fff', shadow: false }); }); },
  ui() { info('TROTZDEM…', 57.3, { y: 360, bg: PAL.red, size: 54 }); },
  sfx: [[57.3, 'pop', 1], [58.6, 'phoneTap'], [59.2, 'phoneTap'], [59.25, 'notify']] });
// ---- 33 · the yacht: 135.000 €
S(59.86, { tr: 'whipL', cam: [[59.86, 540, 960, 1.0], [61.76, 540, 960, 1.06]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1400, [[0, '#7cc6ff'], [1, '#bfe9ff']]); ctx.fillRect(-600, -400, 2300, 1800); ctx.fillStyle = '#2f8fd8'; ctx.fillRect(-600, 1150, 2300, 900);
    for (let i = 0; i < 6; i++) line(-100 + i * 240 + Math.sin(TT * 2 + i) * 20, 1250 + (i % 2) * 80, 60 + i * 240, 1250 + (i % 2) * 80, 8, 'rgba(255,255,255,0.5)');
    yacht(540 + Math.sin(TT * 2) * 6, 1150 + Math.sin(TT * 3) * 8, 2.0); char('kevin', 560, 1000, 0.42, { pose: [[0, 'cheer']], emo: [[0, 'grin']], extras: { shades: 1 } }); },
  ui() { hudKevin({ y: 240, scale: 0.85 }); priceTag(540, 560, 0.85 * springEase(TT - 59.9, 300, 12), '135.000 €', -0.06); },
  sfx: [[59.9, 'cashReg'], [59.95, 'pop', 1], [60.3, 'waves', 1.4], [61.0, 'shipHorn']] });
// ---- 34 · each one thinks the bet is in the bag (split screen)
S(61.76, { tr: 'slide', cam: [[61.76, 540, 960, 1.0], [65.16, 540, 960, 1.04]],
  draw() { ctx.save(); ctx.beginPath(); ctx.rect(-200, -400, 740, 2800); ctx.clip(); rays('#1d48b8', '#2f6df6', { cx: 270, cy: 900, spin: 0.08 }); char('kevin', 270, 1300, 0.78, { pose: [[0, 'hips']], emo: [[0, 'smug']], extras: { chain: 1, shades: 1 } }); crown(270, 480, 0.6); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(540, -400, 740, 2800); ctx.clip(); rays('#b6302b', '#e8483c', { cx: 810, cy: 900, spin: -0.08 }); char('jonas', 810, 1300, 0.78, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], extras: { glasses: true } }); ctx.restore();
    line(540, -400, 540, 2400, 16, '#ffffff'); },
  ui() { info('WER GEWINNT?', 62.0, { y: 320, size: 60 }); if (TT > 63.3) { popText('„ICH!"', 270, 1420, 63.3, 64, PAL.yellow, -0.05, 0); popText('„ICH!"', 810, 1420, 63.5, 64, PAL.yellow, 0.05, 0); } },
  sfx: [[62.0, 'pop', 1], [63.3, 'popHi', 1], [63.5, 'popHi', 1.2], [64.3, 'tension', 0.9]] });
// ---- 35 · it'll be close. Very close. (the scale barely moves)
S(65.16, { tr: 'zoomIn', cam: [[65.16, 540, 1000, 1.0], [66.98, 540, 980, 1.08]],
  draw() { setDark('#2a1640', '#05030c'); const tilt = Math.sin(TT * 3) * 0.06 * Math.exp(-(TT - 65.16) * 0.3);
    balance(540, 1450, 1.0, tilt, () => giantCheck(0, -60, 0.2, '???', 0), () => { for (let i = 0; i < 5; i++) copperCent(-60 + i * 30, -30 - i * 8, 22, { sx: 1 }); }); },
  ui() { info('KNAPP…', 65.3, { y: 360, bg: PAL.red, size: 60 }); info('SEHR KNAPP!', 66.2, { y: 480, bg: PAL.red, size: 66, rot: 0.05 }); },
  sfx: [[65.3, 'scaleCreak'], [65.4, 'heartbeat', 1.5], [66.2, 'stamp']] });
// ---- 36 · until the last day of the year
S(66.98, { tr: 'spin', cam: [[66.98, 540, 960, 1.0], [69.12, 540, 940, 1.08]],
  draw() { rays('#d4520a', '#ff7a12', { cy: 900, spin: 0.15 }); calendarPage(540, 980, 1.2, 'DEZ', 31); },
  ui() { info('LETZTER TAG DES JAHRES', 67.05, { y: 360, size: 50 }); },
  sfx: [[67.05, 'pop', 1], [67.6, 'clockSpin', 1.2]] });
// ---- 37 · Kevin opens his account
S(69.12, { tr: 'zoomIn', cam: [[69.12, 540, 1000, 1.6], [71.24, 540, 970, 1.78]],
  draw() { setDaniRoom({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'holdR']], emo: [[0, 'confused']], look: [0.2, 0.6], extras: { chain: 1, sweat: 1 }, holdR: () => phone(0, -60, 0.32, -0.1, () => { ctx.fillStyle = '#1d48b8'; ctx.fillRect(-84, -176, 168, 352); tText('BANK', 0, 0, 34, { color: '#fff', shadow: false }); }) }); },
  ui() { info('KONTO ÖFFNEN…', 69.2, { y: 400, bg: PAL.blue, size: 52 }); },
  sfx: [[69.2, 'phoneTap'], [69.9, 'phoneTap'], [70.2, 'heartbeat', 1.0]] });
// ---- 38 · 420.000 €
S(71.24, { tr: 'cut', cam: [[71.24, 540, 960, 1.0], [72.78, 540, 960, 1.1]], shake: [[71.26, 12, 0.4]],
  draw() { setDaniRoom({ blur: 14 }); bankApp(540, 1000, 2.6, '420.000 €', PAL.green); glow(540, 900, 520, '#41f08a', 0.3); },
  ui() { popText('420.000 €', 540, 380, 71.3, 96, '#41f08a', -0.03, 0); },
  sfx: [[71.3, 'cashReg']] });
// ---- 39 · despite sports car, Rolex, party and yacht
S(72.78, { tr: 'whipL', lift: 0, cam: [[72.78, 540, 960, 1.0], [75.96, 540, 960, 1.05]],
  draw() { rays('#1d3fb0', '#2f6df6', { cy: 960 }); const items = [[73.06, (x, y) => supercar(x, y + 60, 0.38, { col: '#e8262f' })], [74.0, (x, y) => goldWatch(x, y, 0.28, TT)], [74.66, (x, y) => { fillRR(x - 140, y - 90, 280, 180, 20, '#1b1530'); tText('PARTY', x, y, 50, { color: '#ff4fa3', shadow: false }); }], [75.28, (x, y) => yacht(x, y + 20, 0.6)]];
    items.forEach(([t, fn], i) => { if (TT < t) return; const k = springEase(TT - t, 280, 13), x = i % 2 ? 780 : 300, y = 700 + Math.floor(i / 2) * 420; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); fillRR(-220, -170, 440, 340, 30, 'rgba(255,255,255,0.15)'); fn(0, 0); ctx.restore(); tText('✓', x + 170, y - 130, 60, { color: '#41f08a', stroke: '#063d1e', strokeW: 10 }); }); },
  ui() { info('TROTZDEM 420.000 €', 72.85, { y: 330, bg: PAL.green, size: 52 }); },
  sfx: [[73.06, 'pop', 1], [74.0, 'pop', 1.15], [74.66, 'pop', 1.3], [75.28, 'pop', 1.45]] });
// ---- 40 · "And you, maths genius?"
S(75.96, { tr: 'zoomIn', cam: [[75.96, 540, 1000, 1.65], [77.34, 540, 980, 1.8]],
  draw() { setDaniRoom({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'pointR']], emo: [[0, 'smug']], extras: { chain: 1, shades: 1 } }); },
  ui() { info('„RECHENKÜNSTLER?"', 76.4, { y: 400, bg: PAL.yellow, fg: '#1b1530', size: 54 }); },
  sfx: [[76.0, 'swish', 0.9], [76.4, 'pop', 1.1]] });
// ---- 41 · "Better sit down, Kevin."
S(77.34, { tr: 'whipR', cam: [[77.34, 540, 1000, 1.75], [78.7, 540, 975, 1.9]],
  draw() { setLeoRoom({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[77.34, 'thinkR'], [77.8, 'armsCross']], emo: [[0, 'smug']], extras: { glasses: true }, tilt: -0.05 });
    if (TT > 77.7 && TT < 78.2) { sparkle(480, 950, 50, '#fff', TT * 5); sparkle(600, 950, 50, '#fff', TT * 5); } },
  ui() { vignette(0.45); info('„SETZ DICH LIEBER HIN."', 77.9, { y: 400, bg: '#141026', size: 48 }); },
  sfx: [[77.7, 'ting'], [77.9, 'pop', 0.9]] });
// ---- 42 · 1 cent per second. A whole year.
S(78.7, { tr: 'cut', cam: [[78.7, 540, 960, 1.0], [81.44, 540, 960, 1.08]],
  draw() { rays('#c4520a', '#e86c0e', { cy: 940 }); copperCent(380, 960, 170, { sx: Math.cos(TT * 2) }); stopwatch(780, 960, 0.6, (TT - 78.7) * 6);
    if (TT > 80.2) { const k = springEase(TT - 80.2, 280, 12); ctx.save(); ctx.translate(540, 1300); ctx.scale(k, k); calendarPage(0, 0, 0.45, 'JAHR', 1); ctx.restore(); } },
  ui() { info('1 CENT × SEKUNDE', 78.8, { y: 360, bg: PAL.orange, size: 56 }); },
  sfx: [[78.8, 'pop', 1], [79.4, 'tick'], [79.9, 'tick'], [80.2, 'pop', 1.2], [80.8, 'tick']] });
// ---- 43 · "Do the maths yourself."
S(81.44, { tr: 'zoomIn', cam: [[81.44, 540, 1000, 1.75], [82.38, 540, 985, 1.85]],
  draw() { setLeoRoom({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'pointR']], emo: [[0, 'smug']], look: [0, 0], extras: { glasses: true } }); },
  ui() { info('RECHNE SELBST!', 81.5, { y: 400, bg: PAL.red, size: 58 }); },
  sfx: [[81.5, 'pop', 1], [81.55, 'swish', 0.9]] });
// ---- 44 · Kevin starts counting, finger by finger
S(82.38, { tr: 'whipL', cam: [[82.38, 540, 1000, 1.6], [85.0, 540, 970, 1.8]],
  draw() { setDaniRoom({ blur: 10 }); const step = Math.floor((TT - 82.4) * 2.5) % 2; char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, step ? 'thinkR' : 'raiseR']], emo: [[0, 'confused']], look: [0.3, -0.7], extras: { chain: 1, sweat: 1 } });
    floatingMath(540, 820, 'k44'); },
  ui() { info('FINGER FÜR FINGER…', 83.85, { y: 360, bg: PAL.purple, size: 50 }); },
  sfx: [[82.5, 'tick'], [82.9, 'tick'], [83.3, 'tick'], [83.7, 'tick'], [83.85, 'pop', 1], [84.1, 'tick'], [84.5, 'tick']] });
// ---- 45 · Kevin: 420.000 € — Jonas: ???
S(85.0, { tr: 'zoomIn', capY: 1790, cam: [[85.0, 540, 960, 1.0], [87.8, 540, 960, 1.04]],
  draw() { ctx.save(); ctx.beginPath(); ctx.rect(-200, -400, 1480, 1360); ctx.clip(); rays('#1d48b8', '#2f6df6', { cy: 560, spin: 0.06 }); char('kevin', 250, 1180, 0.82, { pose: [[0, 'thinkR']], emo: [[0, 'confused']], extras: { chain: 1, sweat: 1 } }); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(-200, 960, 1480, 1300); ctx.clip(); rays('#b6302b', '#e8483c', { cy: 1440, spin: -0.06 }); char('jonas', 250, 1990, 0.82, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], extras: { glasses: true } }); ctx.restore();
    line(-200, 960, 1280, 960, 16, '#ffffff'); },
  ui() { hud('KONTO · KEVIN', [[0, 420000]], { x: 700, y: 520, scale: 0.95 }); blurCounter(700, 1380, 560, 230, 'KONTO · JONAS', { q: true }); },
  sfx: [[85.05, 'heartbeat', 1.4]] });
