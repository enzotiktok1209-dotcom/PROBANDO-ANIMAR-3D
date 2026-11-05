// =====================================================================
//  shots.js — 100 Millionen Euro sofort vs 1 Euro pro Sekunde für 4 Jahre (DE). 48 shots on the trimmed voice (75.9 s).
//  Every subject sits in the centre band above the captions; helper texts in German; Jonas' total is never readable.
// =====================================================================
const KONTO = [[0, 1e8], [20.05, 94e6], [22.55, 90.1e6], [26.45, 90e6]];
const hudKevin = (o = {}) => hud('KONTO · KEVIN', KONTO, { ...o });
const KS = { chain: 1, shades: 1 };

function bigArm(id, x0, y0, x1, y1, w = 150, open = false) {
  const L = LOOKS[id]; line(x0, y0, x1, y1, w, L.top); line(x0 + w * 0.18, y0, x1 + w * 0.12, y1, w * 0.25, L.topD);
  const a = Math.atan2(y1 - y0, x1 - x0); circ(x1 - Math.cos(a) * w * 0.25, y1 - Math.sin(a) * w * 0.25, w * 0.55, L.topD);
  ctx.save(); ctx.translate(x1 + Math.cos(a) * w * 0.25, y1 + Math.sin(a) * w * 0.25); ctx.rotate(a);
  if (open) { fillRR(-w * 0.4, -w * 0.55, w * 0.95, w * 1.1, w * 0.4, L.skin); for (let i = 0; i < 4; i++) fillRR(w * 0.4, -w * 0.5 + i * w * 0.28, w * 0.5, w * 0.22, w * 0.11, L.skin); fillRR(-w * 0.1, -w * 0.85, w * 0.45, w * 0.3, w * 0.15, L.skin); }
  else { circ(0, 0, w * 0.55, L.skin); for (let i = 0; i < 4; i++) circ(w * 0.38, -w * 0.36 + i * w * 0.24, w * 0.16, L.skinD); }
  ctx.restore();
}
// a pointing hand (index finger out) at x1,y1, coming from x0,y0
function fingerArm(id, x0, y0, x1, y1, w = 130) {
  const L = LOOKS[id]; line(x0, y0, x1, y1, w, L.top); line(x0 + w * 0.18, y0, x1 + w * 0.12, y1, w * 0.25, L.topD);
  const a = Math.atan2(y1 - y0, x1 - x0); circ(x1 - Math.cos(a) * w * 0.2, y1 - Math.sin(a) * w * 0.2, w * 0.52, L.topD);
  ctx.save(); ctx.translate(x1 + Math.cos(a) * w * 0.3, y1 + Math.sin(a) * w * 0.3); ctx.rotate(a);
  circ(0, 0, w * 0.5, L.skin); fillRR(w * 0.2, -w * 0.16, w * 0.85, w * 0.32, w * 0.16, L.skin); circ(w * 0.05, w * 0.42, w * 0.2, L.skinD);
  ctx.restore();
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
  if (icon === 'cash') { glow(0, 0, 200, '#a6f0b4', 0.3); briefcase(0, 60, 0.42, 1); }
  else { stopwatch(-90, 0, 0.26, TT * 10); coin(90, 0, 58, { sx: Math.cos(TT * 3), label: '1€' }); }
  ctx.restore();
  tText(big, 0, h / 2 - 92, 46, { color: '#fff', maxW: w - 36 }); tText(sub, 0, h / 2 - 40, 28, { color: 'rgba(255,255,255,0.95)', shadow: false, weight: 800 });
  ctx.restore();
}
const plus1 = (cx, cy, rate, t0, seed) => euroPops(cx, cy, rate, t0, seed);

// =====================================================================  THE HOOK
// ---- 1 · the choice: 100 million now — or 1 € a second
S(0.0, { tr: 'cut', lift: 110, cam: [[0, 540, 1020, 1.45], [0.28, 540, 1020, 1.0], [1.28, 540, 1010, 1.04]],
  draw() { setStudio(); char('kevin', 300, FLOOR - 40, 0.8, { emo: [[0, 'grin']], look: [0.4, -0.4], jump: [[0, 0], [0.3, 16, 0.12], [0.45, 0, 0.12]] }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']], look: [-0.3, -0.3], extras: { glasses: true } }); studioPodiums(); },
  ui() {
    tText('WAS NIMMST DU?', 540, 200, 66, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14, maxW: 1000 });
    iconCard(285, 462, 'OPTION 1', '100 MIO. €', 'SOFORT', PAL.green, 0.03, 'cash'); iconCard(795, 462, 'OPTION 2', '1 € / SEKUNDE', '4 JAHRE LANG', PAL.orange, 0.18, 'watch'); tText('VS', 540, 462, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); },
  sfx: [[0.03, 'pop', 1], [0.18, 'pop', 1.2], [0.5, 'applause', 0.7], [0.9, 'sparkle']] });
// ---- 2 · insert: the briefcase snaps open — 100.000.000 €
S(1.28, { tr: 'zoomIn', cam: [[1.28, 540, 960, 1.0], [2.18, 540, 960, 1.1]],
  draw() { rays('#0e8a45', '#14a956', { cy: 940 }); const op = EZ.o3(clamp((TT - 1.4) / 0.3)); briefcase(540, 1220, 1.35, op); if (TT > 1.45) billRain('bc2', 1.45, 30, { spread: 1.4 }); },
  ui() { popText('100.000.000 €', 540, 560, 1.5, 96, PAL.yellow, -0.04, 0); info('SOFORT!', 1.62, { y: 360, bg: PAL.red, size: 62 }); },
  sfx: [[1.4, 'click'], [1.45, 'cashCannon'], [1.62, 'pop', 1.1]] });
// ---- 3 · insert: one euro every second
S(2.18, { tr: 'whipL', cam: [[2.18, 540, 960, 1.08], [3.96, 540, 960, 1.0]],
  draw() { rays('#c4520a', '#e86c0e', { cy: 940 }); glow(540, 900, 460, '#ffe2a8', 0.4); const k = springEase(TT - 2.25, 200, 12); coin(380, 900, 170 * k, { sx: Math.cos(TT * 2.6), label: '1€' });
    stopwatch(760, 930, 0.62 * springEase(TT - 2.4, 220, 13), (TT - 2.4) * 6); },
  ui() { tText('1 € PRO SEKUNDE', 540, 380, 88, { color: '#fff', stroke: '#6a2a00', strokeW: 18, maxW: 1000 }); for (const t of [2.9, 3.25, 3.6]) popText('+1 €', 540 + (t * 97 % 200) - 100, 1250, t, 70, '#41f08a', 0, 60); },
  sfx: [[2.25, 'coin', 0.9], [2.5, 'tick'], [2.9, 'coin', 1.2], [3.25, 'coin', 1.25], [3.6, 'coin', 1.3]] });
// ---- 4 · insert: four years (the year card flips 1 → 4)
S(3.96, { tr: 'flash', cam: [[3.96, 540, 960, 1.0], [5.02, 540, 940, 1.12]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.2 }); const flips = [4.1, 4.35, 4.6], n = flips.filter((t) => TT >= t).length, f = flips.find((t) => TT >= t && TT < t + 0.18);
    calendarPage(540, 980, 1.25, 'JAHR', String(1 + n), f ? (TT - f) / 0.18 : 0); },
  ui() { info('4 JAHRE LANG', 4.6, { y: 360, bg: PAL.orange, size: 64 }); },
  sfx: [[4.1, 'flip'], [4.35, 'flip', 1.15], [4.6, 'flip', 1.3], [4.62, 'pop', 1]] });

// =====================================================================  THE CHOICE
// ---- 5 · Kevin winds up, eyes on the green button
S(5.02, { tr: 'whipR', cam: [[5.02, 540, 1000, 1.6], [6.0, 540, 980, 1.75]],
  draw() { setStudio({ blur: 8 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[5.02, 'idle'], [5.3, 'raiseR']], emo: [[5.02, 'grin'], [5.5, 'angry']], look: [0.5, 0.5], lean: [[5.02, 0], [5.3, -0.08]] }); },
  ui() { info('KEINE SEKUNDE NACHGEDACHT', 5.2, { y: 380, bg: PAL.red, size: 46 }); },
  sfx: [[5.1, 'whooshUp', 1.1], [5.2, 'pop', 1]] });
// ---- 6 · SLAM on the green button (money bursts out of the podium)
S(6.0, { tr: 'cut', lift: 90, cam: [[6.0, 330, 1140, 1.5], [7.26, 310, 1100, 1.68]], shake: [[6.62, 22, 0.4]], punch: [[6.62, 0.1]],
  draw() { setStudio({ blur: 3 }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']], look: [-0.6, 0.2], extras: { glasses: true } });
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[6.0, 'raiseR'], [6.5, 'slamR', 0.12]], emo: [[6.0, 'angry'], [6.62, 'grin']], look: [0.4, 0.6] });
    studioPodiums({ pressL: TT > 6.62 ? 1 : 0, litL: TT > 6.62 ? 0.9 : 0 }); impactLines(300, 1250, 120, 380, 12, 6.62); if (TT > 6.65) billRain('sl6', 6.65, 26, { spread: 1.2 }); },
  ui() { info('BAMM!', 6.66, { y: 380, bg: PAL.yellow, fg: '#1b1530', size: 70, rot: 0.06 }); },
  sfx: [[6.62, 'slam'], [6.66, 'buzzerWin'], [6.7, 'cashCannon']] });
// ---- 7 · HAHAHA!
S(7.26, { tr: 'zoomIn', cam: [[7.26, 540, 1000, 1.65], [8.22, 540, 980, 1.8]],
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'laughBelly']], emo: [[0, 'laugh']], lean: [[7.26, -0.08], [7.5, 0.08, 0.12], [7.75, -0.08, 0.12], [8.0, 0.06, 0.12]] }); },
  ui() { popText('HA', 300, 560, 7.3, 80, PAL.yellow, -0.2); popText('HA', 780, 500, 7.55, 86, PAL.yellow, 0.2); popText('HAHAHA!', 540, 360, 7.8, 96, PAL.yellow, -0.05, 10); },
  sfx: [[7.3, 'popHi', 1], [7.55, 'popHi', 1.2], [7.8, 'pop', 1.3]] });
// ---- 8 · "1 Euro?" — he holds the coin up between two fingers
S(8.22, { tr: 'whipL', cam: [[8.22, 540, 1000, 1.65], [9.18, 540, 985, 1.75]],
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[8.22, 'idle'], [8.35, 'holdR']], emo: [[0, 'smug']], look: [0.5, 0.3], tilt: [[8.22, 0], [8.5, 0.08]], holdR: () => coin(0, -50, 34, { sx: Math.cos(TT * 5), label: '1€' }) }); },
  ui() { info('1 EURO? 🙄', 8.4, { y: 380, bg: PAL.orange, size: 56 }); },
  sfx: [[8.3, 'coin', 1.2], [8.4, 'pop', 1], [8.7, 'swish', 0.8]] });
// ---- 9 · "Den lass ich als Trinkgeld liegen!" — he flicks the coin into a tip jar
S(9.18, { tr: 'cut', lift: 240, cam: [[9.18, 540, 1140, 1.05], [10.82, 540, 1120, 1.12]],
  draw() { setDaniRoom({ blur: 4 }); fillRR(560, FLOOR - 250, 460, 40, 10, '#8a5a3a'); fillRR(590, FLOOR - 210, 30, 210, 8, '#6a4228'); fillRR(960, FLOOR - 210, 30, 210, 8, '#6a4228');
    tipJar(790, FLOOR - 260, 0.62, 0.2);
    char('kevin', 330, FLOOR + 40, 0.92, { pose: [[9.18, 'holdR'], [9.75, 'throwR', 0.12], [10.1, 'hips']], emo: [[9.18, 'smug'], [10.4, 'laugh']], look: [0.8, 0.2], extras: KS,
      holdR: () => (TT < 9.85 ? coin(0, -40, 26, { sx: 1, label: '1€' }) : null) });
    if (TT >= 9.85) { const u = clamp((TT - 9.85) / 0.5), x = lerp(440, 790, u), y = lerp(1160, 1240, u) - Math.sin(u * Math.PI) * 330; if (u < 1) coin(x, y, 26, { sx: Math.cos(TT * 18), label: '1€' }); } },
  ui() { info('TRINKGELD 😏', 10.4, { y: 380, bg: PAL.gold, fg: '#1b1530', size: 56 }); },
  sfx: [[9.85, 'swish', 1.2], [10.35, 'coinJar'], [10.4, 'pop', 1]] });

// ---- 10 · Jonas just grins
S(10.82, { tr: 'whipR', cam: [[10.82, 540, 1000, 1.75], [12.0, 540, 985, 1.88]],
  draw() { setStudio({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[10.82, 'calm'], [11.1, 'smug']], look: [[10.82, [-0.4, 0]], [11.1, [0, 0]]], tilt: [[10.82, 0], [11.1, -0.06]], extras: { glasses: true } });
    if (TT > 11.1 && TT < 11.6) { const u = (TT - 11.1) / 0.5; sparkle(480, 950, 46 * (1 - u), '#fff', TT * 5); sparkle(600, 950, 46 * (1 - u), '#fff', TT * 5); } },
  ui() { info('JONAS GRINST NUR', 10.9, { y: 380, bg: PAL.blue, size: 52 }); },
  sfx: [[10.9, 'pop', 0.9], [11.1, 'ting'], [11.6, 'swish', 0.6]] });
// ---- 11 · ...and starts a stopwatch (his thumb clicks the crown)
S(12.0, { tr: 'zoomIn', cam: [[12.0, 540, 960, 1.0], [13.3, 540, 940, 1.08]],
  draw() { setLeoRoom({ blur: 12 }); const on = TT > 12.58; glow(540, 960, 520, '#ffe2a8', on ? 0.45 : 0.2); stopwatch(540, 1000, 1.05, on ? (TT - 12.58) * 1.0 : 0);
    const press = TT > 12.45 && TT < 12.7 ? 26 : 0; bigArm('jonas', 1200, 140, 700, 560 + press, 150); },
  ui() { info('START!', 12.6, { y: 360, bg: PAL.green, size: 62 }); if (TT > 12.6) plus1(540, 1330, 1, 12.6, 's11'); },
  sfx: [[12.55, 'click'], [12.6, 'startGun'], [12.65, 'tick'], [13.0, 'coin', 1.3]] });
// ---- 12 · "Viel Glück beim Warten, Einstein!"
S(13.3, { tr: 'whipL', cam: [[13.3, 540, 1000, 1.65], [15.04, 540, 980, 1.78]],
  draw() { setStudio({ blur: 8 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[13.3, 'waveR'], [13.9, 'pointR']], emo: [[13.3, 'smug'], [14.3, 'laugh']], extras: { shades: 0 }, look: [0.2, 0] }); },
  ui() { info('„EINSTEIN" 🤓', 14.3, { y: 380, bg: PAL.yellow, fg: '#1b1530', size: 58 }); },
  sfx: [[13.35, 'swish', 0.9], [13.95, 'whoosh', 1.2], [14.3, 'pop', 1.1], [14.6, 'boing']] });

// =====================================================================  KEVIN SHOPS
// ---- 13 · king of the world: a crown drops on his head, he spreads his arms on a throne
S(15.04, { tr: 'zoomOut', cam: [[15.04, 540, 1040, 1.35], [16.84, 540, 1000, 1.5]],
  draw() { setThrone(); char('kevin', 540, 1450, 0.95, { pose: [[15.04, 'hips'], [16.15, 'cheer']], emo: [[0, 'grin']], extras: { chain: 1, shades: clamp((TT - 15.5) / 0.25) } });
    const y = TT < 15.7 ? -300 : bounceY(TT - 15.7, -300, 520, 4200, 0.25); crown(540, y, 0.85); if (TT > 16.1) confetti('cf13', 16.1, 50, { x: 540, y: 600 }); },
  ui() { info('KÖNIG DER WELT 👑', 16.1, { y: 360, bg: PAL.gold, fg: '#1b1530', size: 54 }); },
  sfx: [[15.1, 'choir'], [15.7, 'whooshDown', 0.8], [16.02, 'ting'], [16.1, 'pop', 1], [16.15, 'applause', 0.6]] });
// ---- 14 · "wird sofort geshoppt" — card into the terminal, approved
S(16.84, { tr: 'whipR', cam: [[16.84, 540, 960, 1.0], [18.76, 540, 960, 1.06]],
  draw() { rays('#1d3fb0', '#2f6df6', { cy: 960 }); const st = TT < 17.5 ? 0 : TT < 17.95 ? 1 : 2; cardTerminal(540, 1080, 1.3, st);
    const u = EZ.io(clamp((TT - 16.95) / 0.5)); creditCard(lerp(1200, 560, u), lerp(400, 820, u), 0.9, lerp(0.5, 0, u)); },
  ui() { info('SHOPPING-TOUR!', 16.95, { y: 360, bg: PAL.pink, size: 58 }); if (TT > 17.95) popText('✓ BEZAHLT', 540, 1380, 17.95, 72, '#41f08a', -0.04, 0); },
  sfx: [[16.95, 'whoosh', 1.2], [17.5, 'cardIn'], [17.6, 'beep'], [17.75, 'beep', 1.1], [17.95, 'cashReg']] });
// ---- 15 · a villa for 6 million
S(18.76, { tr: 'slide', lift: 0, cam: [[18.76, 540, 1000, 1.0], [20.78, 540, 980, 1.08]],
  draw() { setIsland(); const k = springEase(TT - 18.82, 180, 14); ctx.save(); ctx.translate(540, 1300); ctx.scale(k, k); villa(0, 0, 0.95, 1); ctx.restore(); twinkles('v15', 160, 800, 760, 300, 6, { s: 26 }); },
  ui() { hudKevin({ y: 240, scale: 0.82 }); priceTag(540, 600, 0.9 * springEase(TT - 19.82, 300, 12), '6.000.000 €', -0.08); },
  sfx: [[18.82, 'whooshDown'], [19.1, 'thud'], [19.3, 'birds', 1.2], [19.82, 'pop', 1], [20.05, 'cashReg']] });
// ---- 16 · a private jet for 3.9 million (it swoops in and lands)
S(20.78, { tr: 'whipU', lift: 0, cam: [[20.78, 540, 1000, 1.0], [23.48, 540, 1000, 1.05]],
  draw() { setAirfield(); const u = EZ.o3(clamp((TT - 20.82) / 1.5)), x = lerp(1500, 540, u), y = lerp(500, 1250, u), r = lerp(0.18, 0, u); privateJet(x, y, 0.82, r);
    if (u > 0.95) { ctx.save(); ctx.globalAlpha = clamp(1 - (TT - 22.3) / 0.6); for (let i = 0; i < 5; i++) circ(300 + i * 40, 1280 + Math.sin(i) * 8, 30 + (TT - 22.3) * 60, 'rgba(255,255,255,0.6)'); ctx.restore(); } },
  ui() { hudKevin({ y: 240, scale: 0.82 }); priceTag(540, 600, 0.9 * springEase(TT - 22.4, 300, 12), '3.900.000 €', -0.06, PAL.yellow); },
  sfx: [[20.82, 'rocket', 1.5], [22.3, 'skid'], [22.4, 'pop', 1], [22.55, 'cashReg']] });
// ---- 17 · "damit der Jet nicht so allein ist" — the jet alone on the runway, a tumbleweed rolls by
S(23.48, { tr: 'zoomOut', lift: 0, cam: [[23.48, 540, 1100, 1.25], [25.28, 540, 1080, 1.12]],
  draw() { setAirfield(); privateJet(540, 1250, 0.82, 0); ctx.save(); ctx.globalAlpha = 0.85; tText('…', 820, 960, 90, { color: '#fff' }); ctx.restore();
    const x = lerp(-150, 1250, clamp((TT - 23.6) / 1.6)), y = 1500 - Math.abs(Math.sin(TT * 7)) * 40; ctx.save(); ctx.translate(x, y); ctx.rotate(TT * 6); for (let i = 0; i < 8; i++) { ctx.rotate(0.8); ell(0, 0, 50, 18, '#b58a4a'); } circ(0, 0, 30, '#9a7034'); ctx.restore(); },
  ui() { hudKevin({ y: 240, scale: 0.82 }); info('SO ALLEIN… 🥺', 23.6, { y: 420, bg: '#141026', size: 56 }); },
  sfx: [[23.6, 'crickets', 1.5], [23.65, 'pop', 0.8], [24.2, 'rustle'], [24.8, 'rustle']] });
// ---- 18 · ...so a Tesla for 100.000 € glides in beside it
S(25.28, { tr: 'whipL', lift: 0, cam: [[25.28, 540, 1100, 1.15], [27.46, 540, 1090, 1.2]],
  draw() { setAirfield({ blur: 3 }); privateJet(260, 1180, 0.55, 0); const u = EZ.o3(clamp((TT - 25.32) / 0.8)), x = lerp(1500, 640, u); eCar(x, 1440, 0.72, { wheelSpin: x / 70, lights: 1 }); if (TT > 26.1 && TT < 26.5) { sparkle(760, 1300, 40, '#fff', TT * 6); } },
  ui() { hudKevin({ y: 240, scale: 0.82 }); priceTag(560, 640, 0.9 * springEase(TT - 26.3, 300, 12), '100.000 €', -0.06); info('+ TESLA', 25.4, { y: 900, bg: PAL.blue, size: 50 }); },
  sfx: [[25.32, 'whooshT', 0.8], [25.4, 'pop', 1], [25.9, 'skid'], [26.1, 'ting'], [26.3, 'pop', 1.1], [26.45, 'cashReg']] });
// ---- 19 · "Und trotzdem hab ich noch 90 Millionen!" — Kevin in front of his villa, Tesla, jet
S(27.46, { tr: 'zoomIn', cam: [[27.46, 540, 1050, 1.3], [29.38, 540, 1020, 1.42]],
  draw() { withBlur(7, () => { setIsland(); villa(540, 1250, 0.9, 1); }); eCar(860, 1330, 0.36, { wheelSpin: 0 });
    char('kevin', 460, FLOOR + 60, 0.95, { pose: [[27.46, 'hips'], [28.5, 'cheer']], emo: [[27.46, 'smug'], [28.5, 'grin']], extras: KS, jump: [[28.5, 0], [28.7, 30, 0.12], [28.9, 0, 0.14]] }); if (TT > 28.6) billRain('k19', 28.6, 24, { spread: 1.4 }); },
  ui() { hudKevin({ y: 300, scale: 1.05, t0: 27.5 }); info('TROTZDEM 90 MIO.!', 28.55, { y: 520, bg: PAL.green, size: 52 }); },
  sfx: [[27.5, 'pop', 1], [28.52, 'cashReg'], [28.6, 'moneyRain', 1.2]] });
// ---- 20 · "Wer ist hier der Dumme?" — he points straight at us
S(29.38, { tr: 'cut', cam: [[29.38, 540, 1000, 1.6], [30.96, 540, 960, 1.82]], punch: [[30.5, 0.14]],
  draw() { withBlur(9, () => { setIsland(); villa(540, 1250, 0.9, 1); }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[29.38, 'pointR'], [30.4, 'laughBelly']], emo: [[29.38, 'smug'], [30.4, 'laugh']], look: [0, 0], extras: KS }); },
  ui() { info('WER IST HIER DER DUMME? 😂', 29.45, { y: 380, bg: PAL.red, size: 44 }); },
  sfx: [[29.42, 'swish', 1], [29.45, 'pop', 1.1], [30.5, 'boing']] });

// =====================================================================  JONAS
// ---- 21 · Jonas at the döner shop: looks, shakes his head, walks on
S(30.96, { tr: 'glitch', cam: [[30.96, 540, 1080, 1.1], [33.4, 540, 1060, 1.18]],
  draw() { setImbiss({ blur: 3 }); doener(360, 1120, 0.95, Math.sin(TT * 2) * 0.05);
    char('jonas', 730, FLOOR + 60, 0.95, { pose: [[30.96, 'idle'], [31.9, 'thinkR'], [32.5, { la: [0.16, -0.12], ra: [1.4, -0.6] }]], emo: [[30.96, 'neutral'], [32.0, 'serious']], look: [[30.96, [-0.7, 0]], [32.3, [-0.4, 0]], [32.5, [0.5, 0]], [32.75, [-0.5, 0]], [33.0, [0.4, 0]]], extras: { glasses: true } }); },
  ui() { info('NICHT MAL EIN DÖNER 🥙', 31.6, { y: 250, bg: PAL.orange, size: 50 }); if (TT > 32.6) popText('✗', 360, 1080, 32.6, 200, '#ff4545', 0, 0); },
  sfx: [[31.0, 'doorbell'], [31.6, 'pop', 1], [32.6, 'errorBuzz'], [32.9, 'swish', 0.7]] });
// ---- 22 · "...während er arbeitet" — at his desk, the stopwatch ticks beside the laptop
S(33.4, { tr: 'whipR', cam: [[33.4, 540, 1020, 1.25], [34.74, 540, 1010, 1.32]],
  draw() { setLeoDesk({ blur: 5 }); char('jonas', 540, FLOOR + 80, 0.95, { pose: [[0, 'writeR']], emo: [[0, 'serious']], look: [0, 0.6], extras: { glasses: true } }); laptop(540, 1560, 0.8); stopwatch(880, 1180, 0.3, TT - 10); },
  ui() { info('ARBEITEN', 33.45, { y: 380, bg: PAL.blue, size: 56 }); plus1(540, 900, 2, 33.5, 'w22'); },
  sfx: [[33.45, 'pop', 1], [33.5, 'typing', 1.2], [33.6, 'coinTicks', 1.1, 2]] });
// ---- 23 · "isst" — biting a bread roll
S(34.74, { tr: 'cut', cam: [[34.74, 540, 1000, 1.6], [35.2, 540, 990, 1.66]],
  draw() { setLeoRoom({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'drinkR']], emo: [[0, 'happy']], extras: { glasses: true }, holdR: () => broetchen(0, -40, 0.5) }); },
  ui() { info('ESSEN', 34.76, { y: 380, bg: PAL.orange, size: 56 }); plus1(540, 880, 2, 34.76, 'w23'); },
  sfx: [[34.76, 'pop', 1.1], [34.85, 'crunch'], [35.0, 'coin', 1.3]] });
// ---- 24 · "oder schläft" — asleep, the stopwatch on the night stand keeps running
S(35.2, { tr: 'whipL', cam: [[35.2, 540, 1000, 1.0], [36.0, 540, 990, 1.05]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#141a44'], [1, '#2a2160']]); ctx.fillRect(-600, -400, 2300, 2700); windowFrame(760, 520, 360, 420, () => { ctx.fillStyle = '#0b1030'; ctx.fillRect(-400, -400, 800, 800); circ(60, -60, 50, '#e8ecff'); }); sleepingJonas(500, 1300, 1.0); fillRR(820, 1180, 220, 240, 18, '#5a3a24'); stopwatch(930, 1080, 0.3, TT - 10); },
  ui() { info('SCHLAFEN', 35.22, { y: 380, bg: '#3a2f8a', size: 56 }); plus1(540, 900, 2, 35.22, 'w24'); },
  sfx: [[35.22, 'pop', 0.9], [35.3, 'snore', 0.7], [35.6, 'coin', 1.2]] });
// ---- 25 · his account grows with every tick
S(36.0, { tr: 'zoomIn', cam: [[36.0, 540, 960, 1.0], [38.62, 540, 960, 1.1]],
  draw() { rays('#0e8a45', '#14a956', { cy: 960, spin: 0.15 }); const s = Math.floor((TT - 36.0) * 2); stopwatch(540, 1020, 0.72, (TT - 36) * 1.0);
    for (let i = 0; i < Math.min(s, 6); i++) { const t0 = 36.0 + (i + 1) * 0.5; coin(330 + i * 84, bounceY(TT - t0, 560, 690, 5200, 0.3), 36, { sx: Math.cos(TT * 8 + i), label: '1€' }); } },
  ui() { blurCounter(540, 420, 760, 230, 'KONTO · JONAS'); plus1(540, 1500, 2, 36.0, 'w25'); },
  sfx: [[36.05, 'pop', 1], [36.1, 'coinTicks', 2.4, 2], [37.3, 'grow']] });
// ---- 26 · after one month (the days fly past 1 → 30)
S(38.62, { tr: 'spin', cam: [[38.62, 540, 960, 1.0], [39.9, 540, 940, 1.1]],
  draw() { rays('#d4520a', '#ff7a12', { cy: 900, spin: 0.25 }); const d = Math.min(30, 1 + Math.floor(clamp((TT - 38.7) / 0.9) * 29)); calendarPage(540, 980, 1.2, 'TAG', d); },
  ui() { info('NACH 1 MONAT…', 38.7, { y: 360, bg: '#141026', size: 56 }); },
  sfx: [[38.7, 'pop', 1], [38.7, 'clockSpin', 0.9], [39.62, 'stamp']] });
// ---- 27 · secretly a millionaire: "psst" — gold glow, a finger on his lips
S(39.9, { tr: 'flash', cam: [[39.9, 540, 1000, 1.7], [41.48, 540, 975, 1.86]],
  draw() { setLeoRoom({ blur: 9 }); glow(540, 900, 600, '#ffe08a', 0.35 + 0.1 * Math.sin(TT * 6)); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[39.9, 'idle'], [40.4, 'facepalm']], emo: [[39.9, 'smug'], [40.4, 'calm']], look: [0.3, -0.1], extras: { glasses: true } }); twinkles('m27', 200, 700, 680, 500, 8, { s: 30 }); },
  ui() { info('HEIMLICH MILLIONÄR 🤫', 40.2, { y: 380, bg: PAL.gold, fg: '#1b1530', size: 50 }); },
  sfx: [[40.2, 'bling'], [40.25, 'pop', 1], [40.6, 'kiss'], [41.0, 'sparkle']] });
// ---- 28 · he tells no-one: walks past the neighbours as if nothing happened
S(41.48, { tr: 'slide', lift: 230, cam: [[41.48, 600, 1150, 1.0], [43.36, 480, 1140, 1.05]],
  draw() { setStreet(); char('mia', 220, FLOOR + 40, 0.72, { pose: [[0, 'waveR']], emo: [[0, 'happy']], look: [0.5, 0] }); char('lea', 900, FLOOR + 40, 0.72, { pose: [[0, 'phoneR']], emo: [[0, 'neutral']] });
    const x = lerp(820, 470, clamp((TT - 41.48) / 1.88)); char('jonas', x, FLOOR + 50, 0.78, { walk: 1, flip: true, emo: [[0, 'calm']], look: [-0.4, 0], extras: { glasses: true } }); },
  ui() { info('ER SAGT NIEMANDEM WAS 🤐', 41.55, { y: 400, bg: '#141026', size: 46 }); },
  sfx: [[41.55, 'pop', 1], [41.6, 'footsteps', 1.7], [42.2, 'birds', 1]] });

// =====================================================================  TWO YEARS LATER
// ---- 29 · two years later
S(43.36, { tr: 'iris', cam: [[43.36, 540, 960, 1.0], [44.26, 540, 940, 1.12]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); const f = TT > 43.6 && TT < 43.78 ? (TT - 43.6) / 0.18 : 0; calendarPage(540, 980, 1.25, 'JAHRE', '+2', f); },
  ui() { info('2 JAHRE SPÄTER', 43.45, { y: 360, bg: PAL.orange, size: 62 }); },
  sfx: [[43.45, 'pop', 1], [43.6, 'flip'], [43.8, 'clockSpin', 0.4]] });
// ---- 30 · Kevin pulls up at Jonas' house in the Tesla and gets out behind the car
S(44.26, { tr: 'whipR', lift: 0, cam: [[44.26, 540, 1000, 1.0], [46.68, 560, 990, 1.06]],
  draw() { setJonasFront();
    char('jonas', 780, 1250, 0.52, { pose: [[0, 'idle'], [45.9, 'armsCross']], emo: [[0, 'calm']], look: [-0.7, 0], extras: { glasses: true } });
    const out = EZ.o2(clamp((TT - 45.75) / 0.45)); if (TT > 45.7) { ctx.save(); ctx.beginPath(); ctx.rect(-200, 0, 1500, 1262); ctx.clip(); char('kevin', 330, 1255 + (1 - out) * 230, 0.62, { pose: [[0, 'hips']], emo: [[0, 'smug']], look: [0.7, 0], extras: KS }); ctx.restore(); }
    const x = lerp(-900, 300, EZ.o3(clamp((TT - 44.3) / 1.1))); eCar(x, 1330, 0.95, { wheelSpin: x / 70, door: clamp((TT - 45.55) / 0.25) * (TT < 46.3 ? 1 : clamp(1 - (TT - 46.3) / 0.2)) }); },
  ui() { info('BEI JONAS', 44.32, { y: 360, size: 54 }); },
  sfx: [[44.3, 'whooshT', 0.7], [45.2, 'skid'], [45.55, 'carDoor'], [46.32, 'doorSlam'], [45.95, 'footsteps', 0.6]] });
// ---- 31 · "Na, Jonas? Zählst du immer noch Sekunden?"
S(46.68, { tr: 'zoomIn', cam: [[46.68, 540, 1000, 1.65], [48.86, 540, 975, 1.8]],
  draw() { setJonasFront({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[46.68, 'waveR'], [47.5, 'pointR']], emo: [[46.68, 'smug'], [48.0, 'laugh']], extras: KS }); },
  ui() { info('„IMMER NOCH SEKUNDEN?" 😂', 47.55, { y: 380, bg: PAL.yellow, fg: '#1b1530', size: 44 }); },
  sfx: [[46.72, 'swish', 1], [47.55, 'pop', 1.1], [48.2, 'popHi', 1]] });
// ---- 32 · "Lach ruhig. Abgerechnet wird erst am Schluss."
S(48.86, { tr: 'whipL', cam: [[48.86, 540, 1000, 1.72], [51.22, 540, 970, 1.95]], punch: [[49.6, 0.08], [50.72, 0.12]],
  draw() { setJonasFront({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[48.86, 'calm'], [50.5, 'smug']], look: [0, 0], extras: { glasses: true } }); if (TT > 50.72 && TT < 51.1) { const u = (TT - 50.72) / 0.38; sparkle(480, 950, 50 * (1 - u), '#fff', TT * 5); sparkle(600, 950, 50 * (1 - u), '#fff', TT * 5); } },
  ui() { info('LACH RUHIG.', 48.9, { y: 340, bg: PAL.blue, size: 54 }); info('ABGERECHNET WIRD AM SCHLUSS', 50.0, { y: 470, bg: PAL.red, size: 42, rot: 0.03 }); },
  sfx: [[48.9, 'pop', 1], [49.4, 'tension', 1.2], [50.0, 'pop', 1.2], [50.72, 'ting']] });

// =====================================================================  THE 100-EURO NOTE
// ---- 33 · Kevin laughs and pulls a 100-euro note from his pocket
S(51.22, { tr: 'cut', lift: 200, cam: [[51.22, 540, 1150, 1.0], [52.96, 540, 1130, 1.06]],
  draw() { setJonasFront({ blur: 4 }); char('jonas', 790, FLOOR + 40, 0.9, { pose: [[0, 'armsCross']], emo: [[0, 'calm']], look: [-0.7, 0], extras: { glasses: true } });
    char('kevin', 290, FLOOR + 40, 0.9, { pose: [[51.22, 'laughBelly'], [52.1, 'holdR']], emo: [[0, 'laugh']], look: [0.7, 0], extras: KS, lean: [[51.22, -0.06], [51.5, 0.06, 0.15], [51.8, -0.04, 0.15]], holdR: () => (TT > 52.2 ? euro100(10, -40, 120, -0.3) : null) }); },
  ui() { info('100 €', 52.3, { x: 360, y: 760, bg: PAL.green, size: 56 }); },
  sfx: [[51.3, 'popHi', 1], [51.6, 'popHi', 1.15], [52.1, 'rustle'], [52.3, 'pop', 1]] });
// ---- 34 · ...and throws it at Jonas (slow-motion close on the note leaving his hand)
S(52.96, { tr: 'whipR', lift: 0, cam: [[52.96, 430, 1000, 1.3], [53.6, 520, 1040, 1.35]],
  draw() { setJonasFront({ blur: 8 }); char('kevin', 290, FLOOR + 40, 0.9, { pose: [[52.96, 'holdR'], [53.05, 'throwR2', 0.1]], emo: [[0, 'laugh']], look: [0.7, 0.3], extras: KS, holdR: () => (TT < 53.1 ? euro100(10, -40, 120, -0.3) : null) });
    if (TT >= 53.1) { const u = (TT - 53.1) / 0.5; euro100(lerp(430, 760, u), lerp(1080, 1260, u) - Math.sin(u * Math.PI) * 80, 130, Math.sin(TT * 9) * 0.8); } },
  ui() {},
  sfx: [[53.05, 'whoosh', 1.3], [53.1, 'paperTear']] });
// ---- 35 · the note flutters down and lands at Jonas' feet
S(53.6, { tr: 'cut', lift: 0, cam: [[53.6, 540, 1160, 1.0], [54.76, 540, 1200, 1.05]],
  draw() { setPavement(); const L = LOOKS.jonas;
    for (const sx of [-1, 1]) { line(540 + sx * 130, -400, 540 + sx * 120, 1290, 130, L.pants); fillRR(540 + sx * 120 - 110 + sx * 30, 1260, 230, 90, 40, L.shoe); fillRR(540 + sx * 120 - 110 + sx * 30, 1330, 234, 30, 14, L.sole); }
    fallingNote(53.62, 560, 260, 1400, 330); },
  ui() { info('VOR DIE FÜSSE', 53.65, { y: 340, bg: PAL.red, size: 54 }); },
  sfx: [[53.65, 'pop', 1], [53.7, 'rustle'], [54.0, 'rustle'], [54.28, 'pat']] });
// ---- 36 · "Hier. Damit's ein bisschen schneller geht."
S(54.76, { tr: 'zoomIn', cam: [[54.76, 540, 1000, 1.65], [56.36, 540, 975, 1.8]],
  draw() { setJonasFront({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[54.76, 'offerR'], [55.5, 'laughBelly']], emo: [[54.76, 'smug'], [55.5, 'laugh']], extras: KS, lean: [[55.5, -0.05], [55.75, 0.05, 0.15], [56.0, -0.04, 0.15]] }); },
  ui() { info('„DAMIT\'S SCHNELLER GEHT" 😂', 55.2, { y: 380, bg: PAL.yellow, fg: '#1b1530', size: 42 }); },
  sfx: [[54.8, 'swish', 1], [55.2, 'pop', 1.1], [55.6, 'popHi', 1.2], [55.9, 'popHi', 1.3]] });
// ---- 37 · Jonas glances down at the note — and ignores it
S(56.36, { tr: 'whipL', cam: [[56.36, 540, 1000, 1.72], [58.36, 540, 975, 1.88]],
  draw() { setJonasFront({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[56.36, 'neutral'], [57.0, 'serious']], look: [[56.36, [0, 0]], [56.6, [0.1, 0.9]], [57.3, [0, 0]]], tilt: [[56.36, 0], [56.6, 0.08], [57.3, 0]], extras: { glasses: true } }); },
  ui() { info('JONAS IGNORIERT IHN', 57.1, { y: 380, bg: '#141026', size: 50 }); },
  sfx: [[56.6, 'swish', 0.6], [57.1, 'pop', 0.9], [57.3, 'dun']] });
// ---- 38 · ...and puts a calculator into Kevin's hand
const CALC_SWAP = 59.62;
S(58.36, { tr: 'cut', lift: 200, cam: [[58.36, 540, 1150, 1.05], [60.84, 540, 1120, 1.16]],
  draw() { setJonasFront({ blur: 4 });
    const calc = () => calculator(0, -30, 0.2, '0', false);
    char('kevin', 320, FLOOR + 40, 0.9, { pose: [[58.36, 'hips'], [59.25, 'offerR', 0.3]], emo: [[58.36, 'smug'], [59.7, 'confused']], look: [0.7, 0.2], extras: KS, holdR: () => (TT >= CALC_SWAP ? calc() : null) });
    char('jonas', 760, FLOOR + 40, 0.9, { pose: [[58.36, 'idle'], [58.5, { la: [1.15, -0.35], ra: [0.16, -0.12] }, 0.35]], emo: [[0, 'smug']], look: [-0.7, 0], extras: { glasses: true }, holdL: () => (TT < CALC_SWAP ? calc() : null) }); },
  ui() { info('TASCHENRECHNER', 58.9, { y: 380, bg: PAL.orange, size: 54 }); },
  sfx: [[58.5, 'swish', 0.9], [58.9, 'pop', 1], [CALC_SWAP, 'pat'], [CALC_SWAP + 0.05, 'click'], [60.2, 'boing']] });
// ---- 39 · "Wenn du so schlau bist, dann tipp das mal ein."
S(60.84, { tr: 'zoomIn', cam: [[60.84, 540, 1000, 1.72], [63.16, 540, 975, 1.9]],
  draw() { setJonasFront({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[60.84, 'armsCross'], [62.1, 'pointL']], emo: [[0, 'smug']], look: [-0.3, 0.1], extras: { glasses: true } }); },
  ui() { info('„DANN TIPP DAS MAL EIN"', 61.3, { y: 380, bg: PAL.blue, size: 46 }); },
  sfx: [[61.3, 'pop', 1], [62.1, 'whoosh', 1.2], [62.6, 'ting']] });

// =====================================================================  THE CALCULATION
const CALC_KEYS = [[63.3, '1'], [63.55, '1×60'], [63.85, '×60'], [64.15, '×24'], [64.5, '×365']];
const calcDisp = () => { let d = '0'; for (const [t, s] of CALC_KEYS) if (TT >= t) d = s; return d; };
// ---- 40 · Kevin starts typing (his finger hits the keys)
S(63.16, { tr: 'whipU', cam: [[63.16, 540, 980, 1.0], [64.9, 540, 960, 1.08]],
  draw() { setDaniRoom({ blur: 14 }); const keyIdx = [8, 3, 3, 4, 15], ki = CALC_KEYS.findIndex(([t]) => TT >= t && TT < t + 0.12);
    calculator(540, 1050, 1.35, calcDisp(), false, ki >= 0 ? keyIdx[ki] : -1);
    const tap = CALC_KEYS.reduce((a, [t]) => a + Math.max(0, 1 - Math.abs(TT - t) / 0.08), 0); fingerArm('kevin', 1250, 1900, 760 - Math.sin(TT * 9) * 60, 1180 + tap * 24, 120); },
  ui() { info('KEVIN TIPPT…', 63.2, { y: 300, bg: PAL.blue, size: 54 }); },
  sfx: [[63.2, 'pop', 1], ...CALC_KEYS.map(([t]) => [t, 'beep', 1 + (t % 0.5)])] });
// ---- 41-44 · Sekunden, Minuten, Tage, Jahre (fast inserts)
S(64.9, { tr: 'flash', cam: [[64.9, 540, 960, 1.0], [65.62, 540, 960, 1.12]],
  draw() { rays('#c4520a', '#e86c0e', { cy: 960, spin: 0.3 }); stopwatch(540, 1000, 1.0, (TT - 64.9) * 12); },
  ui() { info('SEKUNDEN', 64.92, { y: 360, size: 64 }); },
  sfx: [[64.92, 'tickRun', 0.7], [65.0, 'pop', 1]] });
S(65.62, { tr: 'whipL', cam: [[65.62, 540, 960, 1.0], [66.46, 540, 960, 1.12]],
  draw() { rays('#1d3fb0', '#2f6df6', { cy: 960, spin: -0.3 }); clockFace(540, 1000, 320, (TT - 65.62) * 3); },
  ui() { info('MINUTEN', 65.64, { y: 360, size: 64 }); },
  sfx: [[65.64, 'clockSpin', 0.8], [65.7, 'pop', 1.1]] });
S(66.46, { tr: 'whipR', cam: [[66.46, 540, 960, 1.0], [67.14, 540, 960, 1.12]],
  draw() { rays('#0e8a45', '#14a956', { cy: 960, spin: 0.3 }); calendarPage(540, 1000, 1.2, 'TAG', 1 + Math.floor((TT - 66.46) * 40) % 365); },
  ui() { info('TAGE', 66.48, { y: 360, size: 64 }); },
  sfx: [[66.48, 'flip', 1.2], [66.6, 'flip', 1.3], [66.75, 'flip', 1.4], [66.5, 'pop', 1.2]] });
S(67.14, { tr: 'whipU', cam: [[67.14, 540, 960, 1.0], [67.72, 540, 960, 1.14]],
  draw() { rays('#8a1730', '#c4203f', { cy: 960, spin: -0.3 }); calendarPage(540, 1000, 1.2, 'JAHR', Math.min(4, 1 + Math.floor((TT - 67.14) * 7))); },
  ui() { info('JAHRE', 67.16, { y: 360, size: 64 }); },
  sfx: [[67.16, 'stamp'], [67.2, 'pop', 1.3]] });
// ---- 45 · the longer he types, the paler he gets (slow push-in)
S(67.72, { tr: 'zoomIn', cam: [[67.72, 540, 1040, 1.5], [70.18, 540, 990, 1.85]],
  draw() { setDaniRoom({ blur: 10 }); const p = clamp((TT - 68.0) / 2.0);
    char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, { la: [0.16, -0.12], ra: [0.9, -2.3] }]], emo: [[67.72, 'confused'], [68.9, 'scared'], [69.6, 'shock']], look: [0.2, 0.75], extras: { chain: 1, pale: p, sweat: TT > 68.6 ? 1 : 0 },
      holdR: () => calculator(0, -40, 0.34, ['×4', '=', '= ?'][Math.min(2, Math.floor((TT - 67.72) / 0.8))], false, Math.floor(TT * 6) % 16) }); },
  ui() { if (TT > 69.0) info('IMMER BLASSER…', 69.0, { y: 360, bg: '#141026', size: 52 }); },
  sfx: [[67.75, 'typing', 2.2], [68.2, 'heartbeat', 2.0], [69.0, 'pop', 0.8], [69.6, 'gulp']] });
// ---- 46 · the calculator slips out of his hand and smashes on the floor (slow motion)
const DROP = 70.5, HIT = 71.62;
S(70.18, { tr: 'cut', cam: [[70.18, 540, 1100, 1.2], [HIT, 540, 1250, 1.3], [72.12, 540, 1270, 1.34]], shake: [[HIT, 26, 0.45]],
  draw() { setDaniRoom({ blur: 6 }); const u = clamp((TT - DROP) / (HIT - DROP)), y = TT < HIT ? lerp(980, 1520, u * u) : bounceY(TT - HIT, 1520, 1520, 5000, 0.2), rot = TT < HIT ? u * 2.4 : 2.4 + Math.min(0.3, (TT - HIT) * 2);
    char('kevin', 540, FLOOR + 520, 1.0, { pose: [[70.18, 'holdR'], [DROP, 'sad', 0.25]], emo: [[0, 'shock']], look: [0, 0.9], extras: { chain: 1, pale: 1, sweat: 1 }, holdR: () => (TT < DROP ? calculator(0, -30, 0.24, '= ?', false) : null) });
    if (TT >= DROP) { ctx.save(); ctx.translate(540, y); ctx.rotate(rot); calculator(0, 0, 0.42, TT < HIT ? '= ?' : 'ERROR', TT >= HIT); ctx.restore(); if (TT >= HIT) impactLines(540, 1560, 140, 420, 14, HIT); } },
  ui() { if (TT >= HIT) popText('KRACH!', 540, 420, HIT, 100, '#ff4545', -0.06, 0); },
  sfx: [[DROP, 'whooshDown', 0.6], [HIT, 'punch'], [HIT + 0.02, 'crunch'], [HIT + 0.1, 'glitch']] });

// =====================================================================  THE QUESTION
// ---- 47 · Kevin: still 90 million (top half)
S(72.12, { tr: 'glitch', cam: [[72.12, 540, 960, 1.0], [73.96, 540, 960, 1.03]],
  draw() { ctx.save(); ctx.beginPath(); ctx.rect(-200, -400, 1500, 1360); ctx.clip(); rays('#1d48b8', '#2f6df6', { cy: 560, spin: 0.08 }); char('kevin', 330, 900, 0.62, { pose: [[0, 'headGrab']], emo: [[0, 'shock']], extras: { chain: 1, pale: 1, sweat: 1 } }); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(-200, 960, 1500, 1400); ctx.clip(); rays('#b6302b', '#e8483c', { cy: 1400, spin: -0.08 }); ctx.restore(); line(-200, 960, 1300, 960, 14, '#ffffff'); },
  ui() { hud('KONTO · KEVIN', [[0, 9e7]], { x: 720, y: 560, scale: 0.85, t0: 72.2 }); },
  sfx: [[72.2, 'pop', 1], [72.25, 'cashReg'], [72.9, 'heartbeat', 1.0]] });
// ---- 48 · ...and Jonas? (bottom half: his account stays hidden) — cut on the question
S(73.96, { tr: 'cut', cam: [[73.96, 540, 960, 1.0], [76.2, 540, 960, 1.05]], punch: [[75.25, 0.06]],
  draw() { ctx.save(); ctx.beginPath(); ctx.rect(-200, -400, 1500, 1360); ctx.clip(); rays('#1d48b8', '#2f6df6', { cy: 560, spin: 0.08 }); char('kevin', 330, 900, 0.62, { pose: [[0, 'headGrab']], emo: [[0, 'shock']], extras: { chain: 1, pale: 1, sweat: 1 } }); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(-200, 960, 1500, 1400); ctx.clip(); rays('#b6302b', '#e8483c', { cy: 1400, spin: -0.08 }); const k = springEase(TT - 74.0, 200, 14); char('jonas', 280, 1420 + (1 - k) * 500, 0.46, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], extras: { glasses: true } }); ctx.restore();
    line(-200, 960, 1300, 960, 14, '#ffffff'); },
  ui() { hud('KONTO · KEVIN', [[0, 9e7]], { x: 720, y: 560, scale: 0.85 }); if (TT > 74.1) { const k = springEase(TT - 74.1, 260, 14); ctx.save(); ctx.translate(720, 1200); ctx.scale(k * 0.85, k * 0.85); blurCounter(0, 0, 560, 210, 'KONTO · JONAS'); ctx.restore(); }
    info('WIE VIEL HAT JONAS? 🤔', 75.25, { y: 960, bg: PAL.yellow, fg: '#1b1530', size: 54 }); },
  sfx: [[74.1, 'pop', 1.2], [74.15, 'glitch'], [75.25, 'pop', 1], [74.3, 'coinTicks', 1.8, 4]] });
