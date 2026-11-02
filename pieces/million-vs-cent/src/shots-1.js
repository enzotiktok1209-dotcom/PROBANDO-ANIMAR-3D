// =====================================================================
//  shots-1.js — 0:00–0:34.6  the dilemma, Dani slams the button, Leo takes the cent, the shopping spree
// =====================================================================
const DANI_KEYS = [[0, 1e6], [25.95, 880000], [27.45, 820000], [31.85, 819550], [43.5, 819500], [92.2, 819460]];
const hudDani = (o = {}) => hud('KONTOSTAND · DANI', DANI_KEYS, o);
// a big arm reaching into frame (close-ups): sleeve from (x0,y0) to the fist at (x1,y1)
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
function questionTyping(str, t0, t1, cutAt) {
  const n = Math.floor(clamp((TT - t0) / (t1 - t0)) * str.length), shown = str.slice(0, cutAt != null && TT > cutAt ? Math.min(n, str.length) : n);
  const k = TT > (cutAt ?? 1e9) ? RNG('qt', F).n(10) : 0;
  fillRR(70, 170, 940, 130, 30, 'rgba(15,10,35,0.85)');
  tText(shown + (Math.floor(TT * 4) % 2 ? '|' : ''), 540 + k, 236, 50, { color: '#fff', maxW: 880, shadow: false });
}

// ---- 1 · the game show: two choices
S(0.0, { tr: 'cut', cam: [[0, 540, 1020, 1.0], [0.7, 540, 1000, 1.06]],
  draw() { setStudio(); char('dani', 300, FLOOR - 40, 0.8, { pose: [[0, 'idle']], emo: [[0, 'grin']], jump: [[0, 0], [0.3, 20, 0.15], [0.45, 0, 0.15]], look: [0.4, 0.3] });
    char('leo', 780, FLOOR - 40, 0.8, { pose: [[0, 'idle']], emo: [[0, 'calm']], look: [-0.3, 0] }); studioPodiums(); },
  ui() { tText('MILLION ODER CENT?', 540, 260, 74, { color: PAL.yellow, stroke: '#240b5e', strokeW: 16 });
    choiceCard(290, 470, 420, 240, 'OPTION 1', '1.000.000 €', 'JETZT', PAL.green, 0.05); choiceCard(790, 470, 420, 240, 'OPTION 2', '1 CENT ×2', '30 TAGE', PAL.orange, 0.2);
    tText('VS', 540, 470, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); },
  sfx: [[0.0, 'sting'], [0.05, 'pop', 1], [0.2, 'pop', 1.2], [0.33, 'boing']] });

// ---- 2 · insert: a million, right now
S(0.7, { tr: 'zoomIn', cam: [[0.7, 540, 960, 1.0], [1.62, 540, 960, 1.12]],
  draw() { rays('#0e8a45', '#14a956', { cy: 900 });
    for (let r = 0; r < 4; r++) for (let i = 0; i < 7 - r; i++) bill(240 + i * 100 + r * 50, 1350 - r * 60, 200, 0, 1, { num: '500' });
    billRain('m2', 0.72, 40, { burst: [540, 1300], spread: 0.3, w: 120 }); },
  ui() { const k = springEase(TT - 0.75, 300, 14); ctx.save(); ctx.translate(540, 600); ctx.scale(k, k); tText('1.000.000 €', 0, 0, 130, { color: '#fff', stroke: '#064d26', strokeW: 22 }); ctx.restore();
    sticker('JETZT', 540, 760, 0.95, { bg: PAL.yellow, fg: '#1b1530', size: 54 }); },
  sfx: [[0.76, 'cashReg'], [0.8, 'moneyRain', 0.8], [0.95, 'pop', 1.4]] });

// ---- 3 · insert: one cent
S(1.62, { tr: 'whipL', cam: [[1.62, 540, 960, 1.1], [2.8, 540, 960, 1.0]],
  draw() { rays('#e86c0e', '#ff8a1e', { cy: 900 }); glow(540, 900, 520, '#fff1a0', 0.7);
    const k = springEase(TT - 1.66, 200, 12); coin(540, 900 + Math.sin(TT * 3) * 12, 230 * k, { sx: Math.cos(TT * 2.4) });
    twinkles('c3', 200, 600, 680, 600, 9, { s: 26 }); },
  ui() { tText('1 CENT', 540, 470, 140, { color: '#fff', stroke: '#8a3000', strokeW: 24 }); },
  sfx: [[1.72, 'coin', 1.0], [2.1, 'sparkle'], [2.5, 'sparkle']] });

// ---- 4 · insert: it doubles every day, for 30 days
S(2.8, { tr: 'flash', cam: [[2.8, 540, 980, 1.0], [4.4, 540, 940, 1.1]],
  draw() { rays('#c4520a', '#e86c0e', { cy: 900 });
    const steps = [2.95, 3.25, 3.55, 3.85], n = 1 + steps.filter((t) => TT >= t).length, cnt = 2 ** (n - 1);
    const cols = Math.min(cnt, 4), rows = Math.ceil(cnt / 4), r = cnt > 8 ? 52 : cnt > 4 ? 70 : 100;
    for (let i = 0; i < cnt; i++) { const born = i < cnt / 2 || cnt === 1 ? 2.8 : steps[n - 2], k = springEase(TT - born, 320, 13);
      const x = 540 + ((i % cols) - (cols - 1) / 2) * r * 2.3, y = 1010 + (Math.floor(i / cols) - (rows - 1) / 2) * r * 2.3; coin(x, y, r * k, { sx: Math.cos(TT * 3 + i) }); } },
  ui() { const n = 1 + [2.95, 3.25, 3.55, 3.85].filter((t) => TT >= t).length;
    tText('×2', 540, 470, 150, { color: PAL.yellow, stroke: '#5a1f00', strokeW: 24 });
    tText((2 ** (n - 1)) + ' CENT', 540, 1500, 90, { color: '#fff', stroke: '#5a1f00', strokeW: 18 });
    sticker('30 TAGE', 540, 640, 3.72, { bg: PAL.purple, size: 56 }); },
  sfx: [[2.95, 'coin', 1.2], [3.25, 'coin', 1.4], [3.55, 'coin', 1.6], [3.85, 'coin', 1.8], [3.4, 'riserShort', 0.9], [3.72, 'pop', 1]] });

// ---- 5 · Dani didn't even let the question finish
S(4.4, { tr: 'whipR', cam: [[4.4, 330, 1150, 1.55], [6.2, 320, 1120, 1.7]],
  draw() { setStudio({ blur: 3 }); char('leo', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']] });
    char('dani', 300, FLOOR - 40, 0.8, { pose: [[4.4, 'idle'], [5.0, 'pressR'], [5.25, 'idle'], [5.5, 'pressR'], [5.75, 'idle']], emo: [[4.4, 'grin'], [5.6, 'smug']], look: [[4.4, [0.3, 0.6]], [5.6, [0.6, 0.2]]], jump: [[4.4, 0], [4.9, 12, 0.1], [5.05, 0, 0.1], [5.4, 12, 0.1], [5.55, 0, 0.1]] });
    studioPodiums(); },
  ui() { questionTyping('FRAGE: WIE LANGE KANNST DU WARTEN, BEV—', 4.5, 6.6, 5.9); sticker('UNTERBROCHEN!', 760, 380, 5.95, { bg: PAL.red, rot: 0.06 }); },
  sfx: [[4.5, 'typing', 1.4], [5.02, 'tap'], [5.52, 'tap'], [5.95, 'recordScratch']] });

// ---- 6 · his eyes narrow
S(6.2, { tr: 'zoomIn', capY: 1480, cam: [[6.2, 300, 960, 3.2], [7.18, 300, 950, 3.6]],
  draw() { setStudio({ blur: 6 }); char('dani', 300, FLOOR - 40, 0.8, { emo: [[6.2, 'smug'], [6.6, 'angry']], look: [0.4, 0.6], extras: {} }); studioPodiums();
    if (TT > 6.55) sparkle(272, 958, 28 * springEase(TT - 6.55, 300, 12), '#fff', TT * 3); },
  sfx: [[6.25, 'tension', 0.95], [6.55, 'ting']] });

// ---- 7 · PATSCH: the hand slams the green button
S(7.18, { tr: 'cut', cam: [[7.18, 540, 1000, 1.0], [8.7, 540, 1020, 1.08]], shake: [[8.04, 26, 0.45]],
  draw() { rays('#2a1170', '#3a1696', { cy: 1000, spin: 0.08 });
    const press = TT < 8.02 ? 0 : TT < 8.25 ? 1 : 1 - EZ.o3((TT - 8.25) / 0.3) * 0.7;
    podium(540, 1900, 2.3, PAL.green, press, TT > 8.04 ? 0.8 : 0.2);
    // the arm winds up, then slams
    const up = clamp((TT - 7.3) / 0.5), down = EZ.i3(clamp((TT - 7.85) / 0.19));
    const hy = lerp(lerp(620, 300, EZ.o3(up)), 920, down), hx = lerp(820, 600, down);
    bigArm('dani', 1250, -100, hx, hy, 210); impactLines(540, 980, 260, 620, 14, 8.04, { w: 20 }); },
  ui() { sticker('PATSCH!', 540, 520, 8.06, { bg: PAL.yellow, fg: '#1b1530', size: 96, rot: -0.12 }); },
  sfx: [[7.32, 'whooshUp', 0.8], [7.86, 'whoosh', 1.3], [8.04, 'slam'], [8.12, 'buzzerWin']] });

// ---- 8 · the money cannon, Dani jumps
S(8.7, { tr: 'flash', cam: [[8.7, 540, 1000, 1.0], [10.8, 540, 1020, 1.08]],
  draw() { setStudio(); confetti('c8', 8.72, 70, { x: 300, y: 1220, spreadA: 0.9 });
    char('leo', 780, FLOOR - 40, 0.8, { emo: [[8.7, 'neutral'], [9.4, 'calm']], look: [-0.7, -0.2] });
    char('dani', 300, FLOOR - 40, 0.8, { pose: [[8.7, 'armsUp'], [10.2, 'cheer']], emo: [[8.7, 'laugh']], jump: [[8.7, 0], [8.8, 160, 0.2], [9.05, 0, 0.18], [9.3, 110, 0.18], [9.55, 0, 0.18], [9.8, 60, 0.18], [10.0, 0, 0.18]] });
    studioPodiums({ pressL: TT < 9.2 ? 0.8 : 0, litL: 0.6 }); billRain('c8b', 8.72, 60, { burst: [300, 1250], spread: 0.6, w: 110 }); billRain('c8r', 9.3, 26, { spread: 1.4 }); },
  ui() { const k = springEase(TT - 9.1, 300, 12); ctx.save(); ctx.translate(330, 560); ctx.rotate(-0.1); ctx.scale(k, k); tText('HAHAHA!', 0, 0, 92, { color: PAL.yellow, stroke: '#3a0f7a', strokeW: 18 }); ctx.restore(); },
  sfx: [[8.72, 'cashCannon'], [8.75, 'moneyRain', 1.8], [8.8, 'applause', 1.8], [8.82, 'boing'], [9.32, 'boing'], [9.82, 'boing']] });

// ---- 9 · "I don't even wait 30 seconds!"
S(10.8, { tr: 'whipL', cam: [[10.8, 330, 1000, 1.9], [12.95, 330, 980, 2.0]], punch: [[12.18, 0.22]],
  draw() { setStudio({ blur: 7 }); billRain('c9', 10.5, 30, { spread: 2.5 });
    char('dani', 300, FLOOR - 40, 0.8, { pose: [[10.8, 'hips'], [11.3, 'pointR'], [12.15, 'raiseR']], emo: [[10.8, 'grin'], [11.3, 'smug'], [12.15, 'grin']], look: [0.3, 0.1], turn: 0.25 }); studioPodiums(); },
  ui() { sticker('NULL GEDULD', 760, 520, 12.2, { bg: PAL.red, size: 56, rot: 0.08 }); },
  sfx: [[11.3, 'swish'], [12.15, 'zoomIn'], [12.2, 'pop', 0.8]] });

// ---- 10 · Leo presses orange, gently
S(12.95, { tr: 'whipR', cam: [[12.95, 780, 1150, 1.6], [14.6, 780, 1170, 1.75]],
  draw() { setStudio({ blur: 3 }); char('dani', 300, FLOOR - 40, 0.8, { pose: [[0, 'cheer']], emo: [[0, 'laugh']] });
    char('leo', 780, FLOOR - 40, 0.8, { pose: [[12.95, 'idle'], [13.6, 'raiseR'], [14.15, 'pressR']], emo: [[12.95, 'calm'], [14.3, 'happy']], look: [[12.95, [0, 0.2]], [13.6, [0.2, 0.7]]] });
    studioPodiums({ pressR: TT > 14.3 ? 0.6 : 0, litR: TT > 14.3 ? 0.6 : 0 });
    if (TT > 14.3) twinkles('l10', 650, 1050, 260, 200, 6, { s: 22 }); },
  sfx: [[13.6, 'swish', 0.7], [14.3, 'click'], [14.36, 'ding']] });

// ---- 11 · the cent drops into his palm
S(14.6, { tr: 'zoomIn', cam: [[14.6, 540, 1000, 1.0], [16.3, 540, 1040, 1.08]],
  draw() { rays('#e86c0e', '#ff8a1e', { cy: 900, spin: 0.02 }); glow(540, 1000, 500, '#fff1a0', 0.4);
    bigArm('leo', 1300, 1900, 600, 1250, 220, true);
    const y = bounceY(TT - 15.1, 200, 1080, 4200, 0.42); coin(560, y, 90, { sx: TT < 15.5 ? Math.cos(TT * 14) : Math.cos(15.5 * 14) * (1 - clamp((TT - 15.5) * 3)) + clamp((TT - 15.5) * 3) });
    if (TT > 15.55) twinkles('c11', 400, 900, 300, 200, 6, { s: 24 }); },
  ui() { sticker('1 CENT', 540, 520, 15.6, { bg: PAL.orange, size: 60 }); },
  sfx: [[15.1, 'whooshDown', 0.6], [15.5, 'coinBounce']] });

// ---- 12 · Dani laughs at him
S(16.3, { tr: 'whipL', cam: [[16.3, 540, 1080, 1.15], [18.2, 540, 1060, 1.22]],
  draw() { setStudio({ blur: 2 });
    char('leo', 780, FLOOR - 40, 0.8, { pose: [[0, 'holdR']], emo: [[16.3, 'neutral'], [17.4, 'serious']], look: [-0.6, 0], holdR: () => coin(0, -40, 34, { sx: 1 }) });
    char('dani', 300, FLOOR - 40, 0.8, { pose: [[16.3, 'laughBelly'], [17.3, 'pointR']], emo: [[16.3, 'laugh'], [17.3, 'grin']], lean: [[16.3, -0.08], [16.6, 0.06, 0.2], [16.9, -0.06, 0.2], [17.3, 0, 0.2]] });
    studioPodiums(); },
  ui() { for (const [t, x, y, r] of [[16.5, 200, 560, -0.2], [16.8, 420, 470, 0.1], [17.1, 260, 380, -0.05]]) { const k = springEase(TT - t, 300, 12); if (TT < t) continue; ctx.save(); ctx.translate(x, y - (TT - t) * 40); ctx.rotate(r); ctx.scale(k, k); tText('HA', 0, 0, 70, { color: PAL.yellow, stroke: '#3a0f7a', strokeW: 14 }); ctx.restore(); } },
  sfx: [[16.5, 'popHi', 1], [16.8, 'popHi', 1.15], [17.1, 'popHi', 1.3], [17.3, 'swish']] });

// ---- 13 · Leo, deadpan — "worst decision of the year"
S(18.2, { tr: 'cut', cam: [[18.2, 780, 1000, 1.9], [20.5, 780, 980, 2.05]],
  draw() { setStudio({ blur: 7 }); char('leo', 780, FLOOR - 40, 0.8, { pose: [[18.2, 'holdR']], emo: [[18.2, 'serious'], [19.5, 'calm']], look: [0, 0.1], holdR: () => coin(0, -40, 34, { sx: Math.cos(TT * 2) }) }); },
  ui() { sticker('SCHLECHTESTE ENTSCHEIDUNG', 540, 420, 19.45, { bg: PAL.red, size: 44, rot: -0.05 }); sticker('DES JAHRES', 540, 500, 19.55, { bg: PAL.red, size: 44, rot: 0.03 }); },
  sfx: [[19.45, 'stamp'], [19.55, 'stamp', 0.7]] });

// ---- 14 · the calculation he skipped (glitch in)
S(20.5, { tr: 'glitch', cam: [[20.5, 540, 1000, 1.0], [22.2, 540, 960, 1.1]], shake: [[21.7, 16, 0.5]],
  draw() { setDark('#2a1640', '#07040f');
    const keyT = [20.7, 20.95, 21.2, 21.45], kp = keyT.findIndex((t) => TT >= t && TT < t + 0.12), err = TT > 21.7;
    calculator(540, 1000, 1.25, err ? 'FEHLER' : ['1.000.000', '1.000.000 ×', '30', '= ?'][Math.max(0, keyT.filter((t) => TT >= t).length - 1)], err, kp >= 0 ? [3, 7, 12, 14][kp] : -1); },
  ui() { sticker('DIE RECHNUNG?', 540, 300, 21.75, { bg: PAL.yellow, fg: '#1b1530', size: 54 }); },
  sfx: [[20.7, 'beep', 1], [20.95, 'beep', 1.1], [21.2, 'beep', 1.2], [21.45, 'beep', 1.3], [21.7, 'errorBuzz'], [21.75, 'pop', 0.8]] });

// ---- 15 · ...while Dani hugs his money
S(22.2, { tr: 'zoomOut', cam: [[22.2, 540, 1180, 1.25], [23.86, 540, 1150, 1.45]],
  draw() { setStudio({ blur: 4 });
    char('dani', 540, FLOOR + 10, 0.9, { pose: [[0, 'holdBoth']], emo: [[22.2, 'love']], holdR: () => bill(-60, -20, 170, -0.3, 1), holdL: () => bill(40, -30, 170, 0.25, 1), extras: { blush: 1 }, lean: [[22.2, -0.05], [23, 0.05, 0.8]] });
    for (let r = 0; r < 4; r++) for (let i = 0; i < 7 - r; i++) bill(250 + i * 95 + r * 47, 1640 - r * 45, 190, (hash(i, r) % 7 - 3) * 0.04, 1);
    twinkles('h15', 300, 1000, 480, 300, 6, { s: 22, c: '#ffe9a6' }); },
  ui() { ctx.save(); ctx.globalAlpha = clamp((TT - 23.1) / 0.3); tText('?', 800, 700, 180, { color: '#fff', stroke: PAL.purple, strokeW: 20 }); ctx.restore(); },
  sfx: [[22.3, 'kiss'], [23.18, 'dun']] });

// ---- 16 · 30 minutes later
S(23.86, { tr: 'spin', cam: [[23.86, 540, 960, 1.0], [25.6, 540, 960, 1.08]],
  draw() { rays('#1d3fb0', '#2f6df6', { cy: 960, spin: 0.2 }); clockFace(540, 1000, 290, 9 + EZ.io(clamp((TT - 24.0) / 1.4)) * 0.5); },
  ui() { sticker('30 MINUTEN SPÄTER', 540, 520, 24.0, { bg: '#141026', size: 56 }); },
  sfx: [[23.95, 'clockSpin', 1.5], [24.0, 'pop', 1]] });

// ---- 17 · a diamond watch
S(25.6, { tr: 'whipL', cam: [[25.6, 540, 1050, 1.25], [26.76, 560, 1030, 1.35]],
  draw() { setDaniRoom({ blur: 4 });
    char('dani', 540, FLOOR + 40, 0.95, { pose: [[25.6, 'idle'], [25.7, 'tapWatch']], emo: [[25.6, 'grin']], look: [0.5, 0.5], extras: { watch: 1 } });
    if (TT > 25.8) twinkles('w17', 500, 1050, 260, 200, 7, { s: 30 }); },
  ui() { hudDani(); sticker('DIAMANTUHR  −120.000 €', 540, 600, 25.85, { bg: PAL.blue, size: 46 }); },
  sfx: [[25.8, 'sparkle'], [25.95, 'cashReg'], [25.85, 'pop', 1]] });

// ---- 18 · a rented sports car
S(26.76, { tr: 'whipR', cam: [[26.76, 540, 1150, 1.0], [28.3, 540, 1170, 1.08]],
  draw() { setStreet(); const cx = 540 + 900 * (1 - springEase(TT - 26.8, 120, 16));
    char('dani', 220, 1640, 0.85, { pose: [[26.76, 'spinKeys'], [27.5, 'pointR']], emo: [[26.76, 'grin'], [27.5, 'smug']], look: [0.6, 0], extras: { watch: 1 }, holdR: () => { ctx.rotate(TT * 12); fillRR(-8, -40, 16, 40, 6, '#c0c4d4'); circ(0, -46, 16, '#222'); } });
    sportsCar(cx + 120, 1690, 0.9); },
  ui() { hudDani(); sticker('SPORTWAGEN (MIETE)  −60.000 €', 540, 600, 27.4, { bg: PAL.red, size: 42 }); },
  sfx: [[26.8, 'engine'], [27.45, 'cashReg'], [27.4, 'pop', 1.1]] });

// ---- 19 · ordering a pizza with edible gold
S(28.3, { tr: 'zoomIn', cam: [[28.3, 540, 960, 1.0], [30.4, 540, 940, 1.1]],
  draw() { setDaniRoom({ blur: 9 });
    bigArm('dani', 1250, 1900, 640, 1250, 190);
    phone(560, 1000, 2.2, -0.06, () => {
      ctx.fillStyle = lin(0, -176, 0, 176, [[0, '#2a1c55'], [1, '#120c2a']]); ctx.fillRect(-84, -176, 168, 352);
      tText('PIZZA GOLD', 0, -130, 20, { color: PAL.gold, shadow: false }); tinyPizzaIcon(0, -40);
      tText('ESSBARES GOLD', 0, 40, 13, { color: '#fff', shadow: false }); tText('450 €', 0, 70, 26, { color: PAL.gold, shadow: false });
      const k = TT > 29.5 && TT < 29.7 ? 0.9 : 1; ctx.save(); ctx.translate(0, 125); ctx.scale(k, k); fillRR(-62, -22, 124, 44, 22, TT > 29.5 ? PAL.green : PAL.orange); tText(TT > 29.5 ? '✓ BESTELLT' : 'BESTELLEN', 0, 1, 14, { color: '#fff', shadow: false }); ctx.restore(); });
    const tap = TT > 29.35 && TT < 29.75; bigFinger(tap ? 600 : 700, tap ? 1290 : 1420); },
  sfx: [[28.95, 'phoneTap'], [29.5, 'phoneTap'], [29.62, 'notify'], [28.6, 'sparkle']] });
function tinyPizzaIcon(x, y) { circ(x, y, 46, '#d98f3a'); circ(x, y, 38, '#f2c94c'); circ(x - 12, y - 8, 8, '#c0392b'); circ(x + 14, y + 6, 8, '#c0392b'); sparkle(x + 4, y - 18, 10, PAL.gold); }
function bigFinger(x, y) { const L = LOOKS.dani; fillRR(x - 34, y - 10, 68, 260, 34, L.skin); ell(x, y + 6, 26, 18, '#ffe2cf'); }

// ---- 20 · the receipt prints
S(30.4, { tr: 'slide', cam: [[30.4, 540, 900, 1.0], [32.62, 540, 980, 1.05]],
  draw() { setDark('#2a2140', '#0a0716'); receipt(540, 420, EZ.o2(clamp((TT - 30.45) / 1.15)), [['Pizza (8 cm)', '15 €'], ['Essbares Gold', '200 €'], ['Limo-Lieferung', '180 €'], ['Samtbox', '55 €']], '450 €', 31.75); },
  ui() { hudDani({ y: 230, scale: 0.85 }); },
  sfx: [[30.45, 'printer', 1.15], [31.75, 'stamp'], [31.85, 'cashReg']] });

// ---- 21 · SCHEICH-LEVEL
S(32.62, { tr: 'flash', cam: [[32.62, 540, 1050, 1.15], [34.62, 540, 1000, 1.25]], punch: [[33.78, 0.18]],
  draw() { setDaniRoom({ blur: 3 }); billRain('r21', 32.4, 40, { spread: 2 });
    char('dani', 540, FLOOR + 30, 0.95, { pose: [[32.62, 'hips'], [33.75, 'cheer']], emo: [[32.62, 'smug'], [33.75, 'grin']], extras: { watch: 1, chain: 1, shades: clamp((TT - 32.7) / 0.25) } }); },
  ui() { hudDani(); sticker('SCHEICH-MODUS', 540, 600, 33.8, { bg: PAL.gold, fg: '#1b1530', size: 60, rot: -0.07 }); },
  sfx: [[32.72, 'bling'], [33.78, 'bassDrop'], [33.8, 'pop', 0.9], [32.65, 'moneyRain', 1.9]] });
