// =====================================================================
//  shots.js — 40 Millionen Euro sofort vs 1 Euro pro Sekunde für ein Jahr (DE). ~42 shots on the trimmed voice (77.1 s).
//  Subjects sit in the centre band above the captions; helper texts in German; Jonas' total is never readable,
//  and nothing hints at who wins.
// =====================================================================
const KONTO = [[0, 4e7], [22.3, 37e6], [24.95, 36.5e6], [27.75, 35.5e6], [31.5, 35e6]];
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
// the camera's world point for a close-up on one character standing at x (feet at FLOOR + 160, scale 1)
const CLOSE = (t0, t1, x = 540) => [[t0, x, 1000, 1.65], [t1, x, 978, 1.8]];

// =====================================================================  THE HOOK
// ---- 1 · the choice: a fast zoom onto the two at their buttons (swoosh + a short riser in the score)
S(0.0, { tr: 'cut', lift: 110, cam: [[0, 540, 1020, 1.45], [0.28, 540, 1020, 1.0], [0.8, 540, 1015, 1.03]],
  draw() { setStudio(); char('kevin', 300, FLOOR - 40, 0.8, { emo: [[0, 'grin']], look: [0.4, -0.4], jump: [[0, 0], [0.4, 16, 0.12], [0.55, 0, 0.12]] }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']], look: [-0.3, -0.3], extras: { glasses: true } }); studioPodiums(); },
  ui() { tText('WAS NIMMST DU?', 540, 200, 66, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14, maxW: 1000 });
    iconCard(285, 462, 'OPTION 1', '40 MIO. €', 'SOFORT', PAL.green, 0.05, 'cash'); iconCard(795, 462, 'OPTION 2', '1 € / SEKUNDE', '1 JAHR LANG', PAL.orange, 0.22, 'watch'); tText('VS', 540, 462, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); },
  sfx: [[0.05, 'pop', 1], [0.22, 'pop', 1.2], [0.45, 'applause', 0.6]] });
// ---- 1b · insert: 40 million euros — the briefcase snaps open, cash explodes out
S(0.8, { tr: 'zoomIn', cam: [[0.8, 540, 960, 1.0], [1.7, 540, 960, 1.1]],
  draw() { rays('#0e8a45', '#14a956', { cy: 940, spin: 0.2 }); const k = springEase(TT - 0.82, 220, 13), op = EZ.o3(clamp((TT - 0.9) / 0.25)); ctx.save(); ctx.translate(540, 1240); ctx.scale(k, k); briefcase(0, 0, 1.35, op); ctx.restore(); if (TT > 0.95) billRain('b1b', 0.95, 32, { spread: 1.5 }); },
  ui() { popText('40.000.000 €', 540, 560, 0.95, 100, PAL.yellow, -0.04, 0); info('SOFORT!', 1.16, { y: 360, bg: PAL.red, size: 64 }); },
  sfx: [[0.85, 'whooshDown', 1.2], [0.92, 'click'], [0.95, 'cashCannon'], [1.16, 'pop', 1.1], [1.3, 'cashReg']] });
// ---- 2 · one euro every second: coin after coin drops into a glass jar, the stopwatch ticks
const DROPS = Array.from({ length: 8 }, (_, k) => 1.8 + k * 0.22);
S(1.7, { tr: 'whipL', cam: [[1.7, 540, 960, 1.04], [3.6, 540, 960, 1.0]],
  draw() { rays('#c4520a', '#e86c0e', { cy: 940 }); glow(540, 1000, 460, '#ffe2a8', 0.4);
    const n = DROPS.filter((t) => TT > t + 0.57).length; coinJar(540, 1360, 1.0, 0.05 + n * 0.035);
    DROPS.forEach((t0, k) => { if (TT < t0 || TT > t0 + 0.6) return; const R = RNG('drop', k), x = 540 + R.n(70), y = lerp(250, 1120, clamp((TT - t0) / 0.57) ** 2); coin(x, y, 54, { sx: Math.cos(TT * 9 + k), label: '1€' }); });
    stopwatch(850, 760, 0.36 * springEase(TT - 1.75, 220, 13), (TT - 1.75) * 6); },
  ui() { tText('1 € PRO SEKUNDE', 540, 380, 88, { color: '#fff', stroke: '#6a2a00', strokeW: 18, maxW: 1000 }); DROPS.forEach((t) => popText('+1 €', 360, 1000, t + 0.57, 64, '#41f08a', 0, 120)); },
  sfx: [[1.75, 'tick'], ...DROPS.map((t, k) => [t + 0.57, 'coinJar']), ...DROPS.map((t) => [t, 'tickSoft'])] });
// ---- 3 · for one year (the year card drops in, the months fly)
S(3.6, { tr: 'flash', cam: [[3.6, 540, 960, 1.0], [4.58, 540, 940, 1.12]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.2 }); const k = springEase(TT - 3.62, 220, 13); ctx.save(); ctx.translate(540, 980 - (1 - k) * 300); ctx.scale(k, k); ctx.rotate((1 - k) * 0.6); calendarPage(0, 0, 1.25, 'JAHR', 1); ctx.restore(); },
  ui() { info('1 JAHR LANG', 4.0, { y: 360, bg: PAL.orange, size: 64 }); },
  sfx: [[3.62, 'whooshDown', 1.1], [3.75, 'thud'], [4.0, 'pop', 1]] });

// =====================================================================  KEVIN GRABS THE MONEY
// ---- 4 · Kevin slams the green button; a briefcase of cash pops up and he snatches it
S(4.58, { tr: 'whipR', lift: 90, cam: [[4.58, 330, 1140, 1.45], [6.82, 320, 1090, 1.62]], shake: [[5.15, 20, 0.4]],
  draw() { setStudio({ blur: 3 }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']], look: [-0.6, 0.2], extras: { glasses: true } });
    const grab = TT > 5.9; char('kevin', 300, FLOOR - 40, 0.8, { pose: [[4.58, 'raiseR'], [5.0, 'slamR', 0.12], [5.6, 'idle'], [5.9, 'holdR', 0.15]], emo: [[4.58, 'grin'], [5.15, 'angry'], [5.9, 'laugh']], look: [0.4, 0.4],
      holdR: () => (grab ? briefcase(10, 40, 0.3, 0) : null) });
    studioPodiums({ pressL: TT > 5.15 ? 1 : 0, litL: TT > 5.15 ? 0.9 : 0 }); impactLines(300, 1250, 120, 380, 12, 5.15);
    if (TT > 5.2 && !grab) { const y = bounceY(TT - 5.2, 1420, 1290, 4200, 0.3); briefcase(330, y, 0.3, 0); } if (TT > 5.2) billRain('k4', 5.2, 20, { spread: 1.2 }); },
  ui() { info('40 MIO. — SOFORT!', 5.25, { y: 380, bg: PAL.green, size: 58 }); },
  sfx: [[4.62, 'whooshUp', 1.1], [5.15, 'slam'], [5.18, 'buzzerWin'], [5.25, 'cashCannon'], [5.9, 'swish', 1.1], [6.0, 'cashReg']] });
// ---- 5 · "1 Euro?" — he holds a single coin up, unimpressed
S(6.82, { tr: 'zoomIn', cam: CLOSE(6.82, 7.68),
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[6.82, 'idle'], [6.95, 'holdR']], emo: [[0, 'smug']], look: [0.5, 0.3], tilt: [[6.82, 0], [7.1, 0.08]], holdR: () => coin(0, -50, 34, { sx: Math.cos(TT * 5), label: '1€' }) }); },
  ui() { info('1 EURO? 🙄', 6.95, { y: 380, bg: PAL.orange, size: 58 }); },
  sfx: [[6.88, 'coin', 1.2], [6.95, 'pop', 1], [7.3, 'swish', 0.8]] });
// ---- 6 · "Den schenk ich doch jedem Obdachlosen auf der Straße!" — he flicks it into a paper cup on the pavement
S(7.68, { tr: 'whipL', lift: 230, cam: [[7.68, 540, 1150, 1.02], [10.12, 540, 1120, 1.1]],
  draw() { setStreet({ blur: 3 }); paperCup(800, TT < 7.75 ? -300 : bounceY(TT - 7.75, 600, FLOOR + 40, 5200, 0.2), 0.85);
    char('kevin', 330, FLOOR + 40, 0.92, { pose: [[7.68, 'holdR'], [8.55, 'throwR', 0.12], [8.9, 'hips']], emo: [[7.68, 'smug'], [9.2, 'laugh']], look: [0.8, 0.3], extras: {},
      holdR: () => (TT < 8.62 ? coin(0, -40, 26, { sx: 1, label: '1€' }) : null) });
    if (TT >= 8.62) { const u = clamp((TT - 8.62) / 0.5), x = lerp(440, 800, u), y = lerp(1160, 1440, u) - Math.sin(u * Math.PI) * 360; if (u < 1) coin(x, y, 24, { sx: Math.cos(TT * 18), label: '1€' }); } },
  ui() { info('„DEN SCHENK ICH WEG" 😏', 9.2, { y: 380, bg: PAL.gold, fg: '#1b1530', size: 48 }); },
  sfx: [[7.75, 'footsteps', 0.6], [8.62, 'swish', 1.2], [9.12, 'coinJar'], [9.2, 'pop', 1], [9.6, 'popHi', 1]] });

// =====================================================================  JONAS AND THE ALARM CLOCK
// ---- 7 · Jonas just grins
S(10.12, { tense: 1, tr: 'whipR', cam: [[10.12, 540, 1000, 1.75], [11.24, 540, 985, 1.86]],
  draw() { setStudio({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[10.12, 'calm'], [10.4, 'smug']], look: [[10.12, [-0.4, 0]], [10.4, [0, 0]]], tilt: [[10.12, 0], [10.4, -0.06]], extras: { glasses: true } });
    if (TT > 10.4 && TT < 10.9) { const u = (TT - 10.4) / 0.5; sparkle(480, 950, 46 * (1 - u), '#fff', TT * 5); sparkle(600, 950, 46 * (1 - u), '#fff', TT * 5); } },
  ui() { info('JONAS GRINST NUR 😏', 10.2, { y: 380, bg: PAL.blue, size: 52 }); },
  sfx: [[10.2, 'pop', 0.9], [10.4, 'ting'], [10.9, 'swish', 0.6]] });
// ---- 8 · he sets an alarm clock to exactly one year (the hands spin, his finger turns the knob)
S(11.24, { tense: 1, tr: 'zoomIn', cam: [[11.24, 540, 960, 1.0], [13.6, 540, 940, 1.08]],
  draw() { setLeoRoom({ blur: 12 }); glow(540, 980, 520, '#ffe2a8', 0.35); const spin = TT < 12.9 ? (TT - 11.24) * 30 : 50; alarmClock(540, 1020 + (1 - springEase(TT - 11.26, 220, 13)) * 900, 0.95, { t: spin, label: TT > 12.9 ? '1 JAHR' : null });
    const tw = Math.sin(TT * 14) * (TT < 12.9 ? 14 : 0); bigArm('jonas', 1250, 300, 760 + tw, 760, 140); },
  ui() { info('WECKER: GENAU 1 JAHR', 11.35, { y: 340, bg: PAL.red, size: 52 }); },
  sfx: [[11.35, 'pop', 1], [11.5, 'ratchet'], [12.0, 'ratchet'], [12.5, 'ratchet'], [12.95, 'ding'], [13.1, 'click']] });
// ---- 9 · "Ein Wecker?" — Kevin bursts out laughing
S(13.6, { tr: 'whipL', cam: CLOSE(13.6, 14.46),
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'laughBelly']], emo: [[0, 'laugh']], extras: {}, lean: [[13.6, -0.08], [13.85, 0.08, 0.12], [14.1, -0.06, 0.12]] }); },
  ui() { popText('EIN WECKER? 😂', 540, 380, 13.7, 74, PAL.yellow, -0.05, 10); },
  sfx: [[13.65, 'popHi', 1], [13.9, 'popHi', 1.2], [14.2, 'boing']] });
// ---- 10 · "Willst du ein ganzes Jahr lang schlafen, oder was?" — he points, a thought bubble shows Jonas snoring
S(14.46, { tr: 'cut', cam: [[14.46, 540, 1060, 1.45], [16.78, 540, 1030, 1.55]],
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[14.46, 'pointR'], [15.8, 'shrug']], emo: [[14.46, 'smug'], [15.8, 'laugh']], look: [0.3, 0], extras: {} }); },
  ui() { if (TT > 14.9) { const k = springEase(TT - 14.9, 260, 13); ctx.save(); ctx.translate(560, 520); ctx.scale(k, k); thoughtBubble(0, 0, 560, 320, () => sleepingJonas(30, 80, 0.36)); ctx.restore(); } },
  sfx: [[14.5, 'swish', 1], [14.9, 'bubble'], [15.3, 'snore', 1.2], [15.8, 'popHi', 1]] });

// =====================================================================  KEVIN SPENDS
// ---- 11 · "weil Kevin jetzt Multimillionär ist" — shades drop on, a gold chain, money everywhere
S(16.78, { tr: 'zoomOut', cam: [[16.78, 540, 1000, 1.6], [18.84, 540, 975, 1.76]],
  draw() { setClub({ blur: 10 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[16.78, 'hips'], [17.6, 'cheer']], emo: [[0, 'grin']], extras: { chain: clamp((TT - 17.3) / 0.2) > 0.5 ? 1 : 0, shades: clamp((TT - 17.1) / 0.25) } }); billRain('m11', 17.5, 26, { spread: 1.6 }); },
  ui() { info('MULTIMILLIONÄR 😎', 17.55, { y: 380, bg: PAL.gold, fg: '#1b1530', size: 54 }); },
  sfx: [[17.1, 'whooshDown', 1.2], [17.3, 'bling'], [17.55, 'pop', 1], [17.6, 'moneyRain', 1.2]] });
// ---- 12 · "...lässt er es richtig krachen" — fireworks over the club
S(18.84, { tr: 'flash', cam: [[18.84, 540, 1020, 1.25], [20.34, 540, 1000, 1.35]], punch: [[19.66, 0.1]],
  draw() { setClub(); fireworks('fw12', 18.9, 4); char('kevin', 540, 1330, 0.82, { pose: [[0, 'cheer']], emo: [[0, 'laugh']], extras: KS, jump: [[18.84, 0], [19.0, 34, 0.12], [19.2, 0, 0.12], [19.45, 34, 0.12], [19.65, 0, 0.12], [19.9, 34, 0.12], [20.1, 0, 0.12]] }); confetti('cf12', 19.66, 60, { x: 540, y: 500 }); },
  ui() { info('JETZT KRACHT\'S! 🎆', 19.66, { y: 230, bg: PAL.pink, size: 56 }); },
  sfx: [[18.9, 'rocket', 0.5], [19.4, 'boom'], [19.66, 'pop', 1.1], [19.9, 'boom'], [20.0, 'applause', 0.4]] });
// ---- 13 · a private island for 3 million euros (it rises out of the sea)
S(20.34, { tr: 'whipU', lift: 0, cam: [[20.34, 540, 1000, 1.0], [23.12, 540, 980, 1.06]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1300, [[0, '#4ec3ff'], [1, '#bfeaff']]); ctx.fillRect(-600, -400, 2300, 1900); circ(840, 330, 100, '#fff3a6'); glow(840, 330, 340, '#fff3a6', 0.4);
    ctx.fillStyle = '#1e9be0'; ctx.fillRect(-600, 1180, 2300, 900); for (let i = 0; i < 8; i++) line(-200 + i * 200 + Math.sin(TT * 2 + i) * 30, 1260 + (i % 3) * 110, -80 + i * 200 + Math.sin(TT * 2 + i) * 30, 1260 + (i % 3) * 110, 8, 'rgba(255,255,255,0.45)');
    const k = EZ.o3(clamp((TT - 20.45) / 0.8)); privateIsland(540, 1250 + (1 - k) * 380, 1.0); if (TT > 20.45 && TT < 21.5) splash(540, 1210, 20.5, 1.6); twinkles('i13', 160, 700, 760, 300, 6, { s: 26 }); },
  ui() { hudKevin({ y: 240, scale: 0.82 }); priceTag(540, 620, 0.9 * springEase(TT - 22.1, 300, 12), '3.000.000 €', -0.08); },
  sfx: [[20.45, 'waves', 1.2], [20.5, 'whooshUp', 0.8], [21.2, 'birds', 1.2], [22.1, 'pop', 1], [22.3, 'cashReg']] });
// ---- 14 · a Lamborghini for half a million
S(23.12, { tr: 'whipL', lift: 200, cam: [[23.12, 540, 1150, 1.0], [25.46, 540, 1120, 1.07]],
  draw() { setShowroom(); const x = 540 + 900 * (1 - springEase(TT - 23.18, 110, 16)); supercar(x, 1560, 0.95, { col: '#ffc400', wheelSpin: (x - 540) / 98 }); twinkles('s14', 120, 1200, 840, 200, 6, { s: 26 }); },
  ui() { hudKevin({ y: 240, scale: 0.82 }); priceTag(540, 640, 0.9 * springEase(TT - 24.7, 300, 12), '500.000 €', -0.08, PAL.yellow); },
  sfx: [[23.18, 'engine'], [24.2, 'skid'], [24.7, 'pop', 1], [24.95, 'cashReg']] });
// ---- 15 · a party in Dubai for a whole million
S(25.46, { tr: 'zoomIn', lift: 0, cam: [[25.46, 540, 1000, 1.0], [28.0, 540, 980, 1.06]],
  draw() { setDubai({ t0: 25.6 }); char('kevin', 540, 1330, 0.75, { pose: [[0, 'cheer']], emo: [[0, 'laugh']], extras: KS, jump: [[25.46, 0], [25.7, 30, 0.12], [25.9, 0, 0.12], [26.15, 30, 0.12], [26.35, 0, 0.12], [26.6, 30, 0.12], [26.8, 0, 0.12]] }); },
  ui() { hudKevin({ y: 240, scale: 0.82 }); info('PARTY IN DUBAI 🎉', 25.6, { y: 420, bg: PAL.pink, size: 52 }); priceTag(540, 600, 0.9 * springEase(TT - 27.5, 300, 12), '1.000.000 €', -0.06); },
  sfx: [[25.5, 'carMusic', 2.4], [25.6, 'pop', 1], [26.0, 'boom'], [26.5, 'boom'], [27.5, 'pop', 1.1], [27.75, 'cashReg']] });
// ---- 16 · and as the crowning touch: a diamond necklace for 500.000 € (a velvet box opens)
S(28.0, { tr: 'slide', cam: [[28.0, 540, 960, 1.0], [32.06, 540, 940, 1.12]],
  draw() { rays('#3a0a2a', '#6d1430', { cy: 940 }); glow(540, 900, 560, '#fff2b0', 0.35); const lid = clamp((TT - 28.6) / 0.5); velvetBox(540, 1320 + (1 - springEase(TT - 28.05, 200, 14)) * 700, 1.15, lid, lid * 0.6);
    if (TT > 29.3) { const k = springEase(TT - 29.3, 200, 12); ctx.save(); ctx.translate(540, 900 - (1 - k) * 200); ctx.scale(k, k); diamondNecklace(0, 0, 1.0); ctx.restore(); } },
  ui() { hudKevin({ y: 240, scale: 0.82 }); info('ALS KRÖNUNG 👑', 28.4, { y: 420, bg: PAL.gold, fg: '#1b1530', size: 54 }); priceTag(540, 1500, 0.9 * springEase(TT - 31.2, 300, 12), '500.000 €', -0.06, '#bfefff'); },
  sfx: [[28.4, 'pop', 1], [28.6, 'creak', 1.3], [29.3, 'choir'], [29.4, 'bling'], [30.3, 'sparkle'], [31.2, 'pop', 1.1], [31.5, 'cashReg']] });
// ---- 17 · "5 Millionen weg und ich bin immer noch steinreich!" — wearing the diamonds
S(32.06, { tr: 'zoomIn', cam: CLOSE(32.06, 35.18),
  draw() { setIsland({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[32.06, 'hips'], [33.6, 'cheer']], emo: [[32.06, 'smug'], [33.6, 'grin']], extras: KS });
    ctx.save(); ctx.translate(540, FLOOR + 160 - 590); for (let i = 0; i <= 10; i++) { const a = Math.PI * (0.15 + 0.7 * i / 10); diamond(Math.cos(a) * 70, Math.sin(a) * 60, 12); } diamond(0, 80, 26); ctx.restore(); },
  ui() { info('−5 MIO. 💸', 32.2, { y: 340, bg: PAL.red, size: 56 }); if (TT > 33.6) info('IMMER NOCH STEINREICH!', 33.7, { y: 470, bg: PAL.green, size: 46, rot: 0.03 }); },
  sfx: [[32.2, 'pop', 1], [32.4, 'whooshDown', 0.8], [33.0, 'sparkle'], [33.7, 'pop', 1.2], [34.4, 'bling']] });
// ---- 18 · "Das nennt man Leben, Bruder!" — in a hammock between the palms, a coconut drink
S(35.18, { tr: 'whipR', lift: 0, cam: [[35.18, 540, 1050, 1.15], [36.76, 540, 1030, 1.22]],
  draw() { setIsland(); char('kevin', 540, FLOOR + 40, 0.9, { pose: [[35.18, 'drinkR'], [36.0, 'cheer']], emo: [[35.18, 'happy'], [36.0, 'laugh']], extras: KS, holdR: () => (TT < 36.0 ? coconut(0, -30, 0.5) : null) }); },
  ui() { info('„DAS NENNT MAN LEBEN!"', 35.25, { y: 380, bg: PAL.yellow, fg: '#1b1530', size: 48 }); },
  sfx: [[35.25, 'pop', 1], [35.4, 'waves', 1.3], [35.9, 'slurp', 0.6]] });

// =====================================================================  JONAS' ACCOUNT NEVER SLEEPS
// ---- 19 · "Doch Jonas' Konto schläft nie." — the counter runs, coins rain into it
S(36.76, { tense: 1, tr: 'glitch', cam: [[36.76, 540, 960, 1.0], [38.54, 540, 960, 1.08]],
  draw() { rays('#0e8a45', '#14a956', { cy: 960, spin: 0.2 }); alarmClock(540, 1100 + (1 - springEase(TT - 36.8, 220, 13)) * 800, 0.7, { t: TT * 4 }); for (let i = 0; i < 8; i++) { const t0 = 36.8 + i * 0.2; if (TT > t0) coin(300 + (i % 4) * 160, bounceY(TT - t0, 520, 760, 5200, 0.3), 34, { sx: Math.cos(TT * 8 + i), label: '1€' }); } },
  ui() { blurCounter(540, 420, 760, 230, 'KONTO · JONAS'); plus1(540, 1480, 3, 36.8, 'w19'); info('SCHLÄFT NIE', 37.6, { y: 620, bg: PAL.green, size: 52 }); },
  sfx: [[36.8, 'coinTicks', 1.7, 3], [37.6, 'pop', 1], [38.0, 'tick']] });
// ---- 20 · "Während Kevin in Dubai die Party startet" — split: Kevin dancing / Jonas asleep, the +1 € keep popping
function splitTopBottom(top, bottom) {
  ctx.save(); ctx.beginPath(); ctx.rect(-300, -400, 1700, 1360); ctx.clip(); top(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-300, 960, 1700, 1400); ctx.clip(); bottom(); ctx.restore(); line(-300, 960, 1400, 960, 14, '#ffffff');
}
S(38.54, { tr: 'slide', cam: [[38.54, 540, 960, 1.0], [40.72, 540, 960, 1.03]],
  draw() { splitTopBottom(() => { ctx.save(); ctx.translate(0, -420); setDubai({ t0: 38.6 }); ctx.restore(); char('kevin', 540, 860, 0.5, { pose: [[0, 'cheer']], emo: [[0, 'laugh']], extras: KS, jump: [[38.54, 0], [38.8, 26, 0.12], [39.0, 0, 0.12], [39.3, 26, 0.12], [39.5, 0, 0.12], [39.8, 26, 0.12], [40.0, 0, 0.12]] }); },
    () => { ctx.fillStyle = lin(0, 960, 0, 1920, [[0, '#141a44'], [1, '#2a2160']]); ctx.fillRect(-300, 960, 1700, 1000); sleepingJonas(520, 1380, 0.62); }); },
  ui() { info('KEVIN: PARTY', 38.6, { y: 140, bg: PAL.pink, size: 44 }); info('JONAS: SCHLÄFT', 40.0, { y: 1040, bg: '#3a2f8a', size: 44 }); },
  sfx: [[38.6, 'carMusic', 2.0], [38.65, 'pop', 1], [39.4, 'boom'], [40.0, 'pop', 0.9], [40.3, 'snore', 0.8]] });
// ---- 21 · "verdient Jonas im Tiefschlaf" — close on Jonas sleeping, euros keep landing
S(40.72, { tr: 'zoomIn', cam: [[40.72, 540, 1150, 1.25], [42.32, 520, 1120, 1.4]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#141a44'], [1, '#2a2160']]); ctx.fillRect(-600, -400, 2300, 2700); windowFrame(740, 560, 300, 360, () => { ctx.fillStyle = '#0b1030'; ctx.fillRect(-600, -400, 2300, 2300); circ(820, 640, 40, '#e8ecff'); }); sleepingJonas(500, 1330, 0.95); alarmClock(860, 1170, 0.22, { t: TT * 4 }); },
  ui() { info('IM TIEFSCHLAF 😴', 40.8, { y: 380, bg: '#3a2f8a', size: 54 }); plus1(560, 1000, 3, 40.8, 'w21'); },
  sfx: [[40.8, 'pop', 0.9], [40.9, 'coinTicks', 1.4, 3], [41.3, 'snore', 0.9]] });
// ---- 22 · "während Kevin seinen Lamborghini volltankt" — the pump display races up
S(42.32, { tr: 'whipL', lift: 0, cam: [[42.32, 600, 1150, 1.05], [44.6, 600, 1130, 1.12]],
  draw() { setGasStation(); supercar(330, 1470, 0.7, { col: '#ffc400' }); const v = clamp((TT - 42.5) / 1.9) * 148.4; fuelPump(860, 1460 + (1 - springEase(TT - 42.35, 220, 14)) * 600, 0.95, { disp: v.toFixed(2).replace('.', ',') + ' €' });
    char('kevin', 640, 1470, 0.62, { pose: [[0, 'offerR']], emo: [[0, 'smug']], look: [0.6, 0], extras: KS }); },
  ui() { info('TANKEN ⛽', 42.4, { y: 380, bg: PAL.red, size: 54 }); },
  sfx: [[42.4, 'pop', 1], [42.5, 'pump', 1.9], [44.4, 'ding']] });
// ---- 23 · "verdient Jonas unter der Dusche mehr als die ganze Tankfüllung" — showering, euros pop with the drops
S(44.6, { tr: 'whipU', cam: [[44.6, 540, 1000, 1.45], [47.88, 540, 980, 1.55]],
  draw() { setShower(); char('jonas', 540, FLOOR + 160, 1.0, { pose: [[0, { la: [2.6, 1.6], ra: [2.6, 1.6] }]], emo: [[0, 'happy']], extras: {} }); showerCurtain(0.9); },
  ui() { info('UNTER DER DUSCHE 🚿', 44.7, { y: 380, bg: PAL.blue, size: 50 }); plus1(540, 980, 3, 44.7, 'w23'); if (TT > 46.4) info('MEHR ALS DIE TANKFÜLLUNG!', 46.5, { y: 500, bg: PAL.green, size: 42, rot: 0.03 }); },
  sfx: [[44.7, 'rain', 3.0], [44.75, 'pop', 1], [45.2, 'coinTicks', 1.2, 3], [46.5, 'pop', 1.2], [46.9, 'cashReg']] });
// ---- 24 · after two weeks (days flip 1 → 14)
S(47.88, { tr: 'spin', cam: [[47.88, 540, 960, 1.0], [49.36, 540, 940, 1.1]],
  draw() { rays('#d4520a', '#ff7a12', { cy: 900, spin: 0.25 }); const d = Math.min(14, 1 + Math.floor(clamp((TT - 47.95) / 1.0) * 13)); ctx.save(); ctx.translate(540, 980); const k = springEase(TT - 47.9, 220, 13); ctx.scale(k, k); calendarPage(0, 0, 1.2, 'TAG', d); ctx.restore(); },
  ui() { info('NACH 2 WOCHEN…', 47.95, { y: 360, bg: '#141026', size: 56 }); },
  sfx: [[47.95, 'pop', 1], [47.95, 'clockSpin', 1.0], [48.95, 'stamp']] });
// ---- 25 · over a million — Jonas, smug, a gold glow
S(49.36, { tense: 1, tr: 'flash', cam: [[49.36, 540, 1000, 1.7], [50.72, 540, 980, 1.84]],
  draw() { setLeoRoom({ blur: 9 }); glow(540, 900, 600, '#ffe08a', 0.35 + 0.1 * Math.sin(TT * 6)); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], extras: { glasses: true } }); twinkles('m25', 200, 700, 680, 500, 8, { s: 30 }); },
  ui() { info('ÜBER 1 MILLION 💰', 49.45, { y: 380, bg: PAL.gold, fg: '#1b1530', size: 54 }); },
  sfx: [[49.45, 'bling'], [49.5, 'pop', 1], [50.1, 'cashReg']] });

// =====================================================================  THE VIDEO CALL
// ---- 26 · six months later
S(50.72, { tr: 'iris', cam: [[50.72, 540, 960, 1.0], [51.68, 540, 940, 1.12]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); const m = Math.min(7, 1 + Math.floor(clamp((TT - 50.8) / 0.6) * 6)); ctx.save(); ctx.translate(540, 980); const k = springEase(TT - 50.75, 220, 13); ctx.scale(k, k); calendarPage(0, 0, 1.2, 'MONAT', m); ctx.restore(); },
  ui() { info('6 MONATE SPÄTER', 50.78, { y: 360, bg: PAL.orange, size: 60 }); },
  sfx: [[50.78, 'pop', 1], [50.8, 'flip'], [51.0, 'flip', 1.1], [51.2, 'flip', 1.2], [51.4, 'flip', 1.3]] });
// ---- 27 · Kevin on his island dials Jonas
S(51.68, { tr: 'whipR', cam: [[51.68, 540, 1050, 1.3], [53.3, 540, 1030, 1.4]],
  draw() { setIsland(); char('kevin', 540, FLOOR + 60, 0.95, { pose: [[0, 'phoneR']], emo: [[0, 'smug']], look: [0.3, -0.2], extras: KS, holdR: () => phone(0, -30, 0.32, 0.15, () => { ctx.fillStyle = '#1d48b8'; ctx.fillRect(-84, -176, 168, 352); }) }); },
  ui() { info('VIDEOCALL 📱', 51.75, { y: 380, bg: PAL.blue, size: 54 }); },
  sfx: [[51.75, 'pop', 1], [52.0, 'phoneTap'], [52.25, 'phoneTap'], [52.6, 'notify'], [52.9, 'waves', 0.8]] });
// ---- 28 · Jonas in the bus, his phone rings, he answers
S(53.3, { tr: 'slide', cam: [[53.3, 540, 1050, 1.35], [54.84, 540, 1030, 1.45]],
  draw() { setBus(); char('jonas', 540, FLOOR + 60, 0.95, { pose: [[53.3, 'idle'], [53.9, 'phoneR']], emo: [[53.3, 'neutral'], [54.2, 'calm']], extras: { glasses: true }, look: [0, 0], holdR: () => (TT > 53.9 ? phone(0, -30, 0.32, 0.15, () => { ctx.fillStyle = '#41f08a'; ctx.fillRect(-84, -176, 168, 352); }) : null) }); },
  ui() { info('JONAS IM BUS 🚌', 53.35, { y: 380, bg: PAL.yellow, fg: '#1b1530', size: 52 }); },
  sfx: [[53.35, 'pop', 1], [53.4, 'notify'], [53.8, 'notify'], [54.2, 'click'], [53.3, 'engine']] });
// ---- 29 · the call: Kevin on Jonas' screen — "Na, Jonas? Immer noch im Bus?"
S(54.84, { tr: 'zoomIn', cam: [[54.84, 540, 960, 1.0], [56.76, 540, 950, 1.06]],
  draw() { setBus({ blur: 12 }); callScreen(540, 960, 3.4, () => { ctx.save(); ctx.scale(0.38, 0.38); ctx.translate(0, 120); setIslandMini(); char('kevin', 0, 330, 0.7, { pose: [[0, 'pointR']], emo: [[54.84, 'smug'], [55.9, 'laugh']], extras: KS }); ctx.restore(); }, 'KEVIN · VIDEOCALL'); },
  ui() { info('„IMMER NOCH IM BUS?" 😂', 55.82, { y: 260, bg: PAL.yellow, fg: '#1b1530', size: 46 }); },
  sfx: [[54.9, 'notify'], [55.82, 'pop', 1.1], [56.3, 'popHi', 1]] });
function setIslandMini() { ctx.fillStyle = lin(0, -480, 0, 200, [[0, '#4ec3ff'], [1, '#bfeaff']]); ctx.fillRect(-300, -560, 600, 800); ctx.fillStyle = '#1e9be0'; ctx.fillRect(-300, 100, 600, 120); ctx.fillStyle = '#f3d9a0'; ctx.fillRect(-300, 200, 600, 400); }
// ---- 30 · "Schau mal, so sieht ein echter Strand aus!" — he flips the camera to the beach
S(56.76, { tr: 'whipL', cam: [[56.76, 540, 960, 1.0], [59.24, 540, 950, 1.06]],
  draw() { setBus({ blur: 12 }); const flip = clamp((TT - 56.9) / 0.3); callScreen(540, 960, 3.4, () => { ctx.save(); ctx.scale(Math.abs(Math.cos(flip * Math.PI)) || 0.02, 1); if (flip < 0.5) { ctx.save(); ctx.scale(0.38, 0.38); ctx.translate(0, 120); setIslandMini(); char('kevin', 0, 330, 0.7, { emo: [[0, 'smug']], extras: KS }); ctx.restore(); }
      else { ctx.save(); ctx.scale(0.17, 0.17); ctx.translate(-540, -1050); setIsland(); ctx.restore(); } ctx.restore(); }, 'KEVIN · VIDEOCALL'); },
  ui() { info('„SO SIEHT EIN STRAND AUS!"', 57.5, { y: 260, bg: PAL.blue, size: 44 }); },
  sfx: [[56.9, 'swish', 1.2], [57.2, 'waves', 1.6], [57.5, 'pop', 1], [58.2, 'birds', 0.8]] });
// ---- 31 · Jonas, calm: "Genieß die Aussicht, solange du noch kannst."
S(59.24, { tense: 1, tr: 'zoomIn', cam: [[59.24, 540, 1000, 1.72], [61.38, 540, 975, 1.9]], punch: [[60.7, 0.08]],
  draw() { setBus({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'phoneR']], emo: [[59.24, 'calm'], [60.3, 'smug']], look: [0.2, 0], extras: { glasses: true }, holdR: () => phone(0, -30, 0.32, 0.15, () => { ctx.fillStyle = '#1d48b8'; ctx.fillRect(-84, -176, 168, 352); }) }); },
  ui() { info('„GENIESS DIE AUSSICHT…"', 59.35, { y: 380, bg: PAL.blue, size: 46 }); },
  sfx: [[59.35, 'pop', 1], [59.8, 'tension', 1.2], [60.7, 'ting']] });
// ---- 32 · Kevin laughs so hard he drops the phone
S(61.38, { tr: 'whipR', cam: CLOSE(61.38, 62.6),
  draw() { setIsland({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[61.38, 'phoneR'], [61.7, 'laughBelly']], emo: [[0, 'laugh']], extras: KS, lean: [[61.38, -0.08], [61.6, 0.08, 0.12], [61.85, -0.08, 0.12], [62.1, 0.06, 0.12]], holdR: () => (TT < 61.7 ? phone(0, -40, 0.3, 0.2, null) : null) }); },
  ui() { popText('HAHAHA!', 540, 360, 61.45, 90, PAL.yellow, -0.05, 10); },
  sfx: [[61.45, 'popHi', 1], [61.7, 'popHi', 1.2], [62.0, 'pop', 1.3]] });
// ---- 33 · ...and it falls into the sea (slow tumble, splash)
S(62.6, { tr: 'cut', lift: 0, cam: [[62.6, 540, 1050, 1.1], [64.12, 540, 1120, 1.18]], shake: [[63.62, 10, 0.3]],
  draw() { setIsland(); const u = clamp((TT - 62.65) / 0.95), y = lerp(500, 1150, u * u), rot = u * 5; if (TT < 63.62) phone(560 + u * 60, y, 0.9, rot, () => { ctx.fillStyle = '#1d48b8'; ctx.fillRect(-84, -176, 168, 352); }); splash(620, 1140, 63.62, 1.5); },
  ui() { if (TT > 63.62) popText('PLATSCH!', 540, 420, 63.62, 92, '#52b8ff', -0.06, 0); },
  sfx: [[62.65, 'whooshDown', 0.7], [63.62, 'splashSfx'], [63.7, 'popHi', 0.8]] });

// =====================================================================  THE ALARM RINGS
// ---- 34 · the alarm clock rings: one year is over
S(64.12, { tense: 1, tr: 'glitch', cam: [[64.12, 540, 960, 1.0], [65.52, 540, 940, 1.1]], shake: [[64.5, 14, 1.0]],
  draw() { rays('#8a1730', '#c4203f', { cy: 940, spin: 0.3 }); ctx.save(); ctx.translate(540, 1000); const kk = springEase(TT - 64.14, 240, 12); ctx.scale(kk, kk); alarmClock(0, 0, 1.0, { ring: TT > 64.45 ? 1 : 0, t: 0, label: '1 JAHR' }); ctx.restore(); },
  ui() { info('DAS JAHR IST UM!', 64.6, { y: 340, bg: PAL.yellow, fg: '#1b1530', size: 58 }); },
  sfx: [[64.45, 'alarmRing', 1.0], [64.6, 'pop', 1]] });
// ---- 35 · Kevin is at Jonas' door at once (walks in, knocks)
S(65.52, { tr: 'whipL', lift: 0, cam: [[65.52, 540, 1000, 1.0], [67.4, 560, 990, 1.06]],
  draw() { setJonasFront(); const x = lerp(-100, 620, EZ.o2(clamp((TT - 65.55) / 0.9))); char('kevin', x, 1255, 0.55, { walk: TT < 66.45 ? 1 : 0, pose: [[65.52, 'idle'], [66.6, 'raiseR'], [66.75, 'pressR', 0.08], [66.9, 'raiseR', 0.08], [67.05, 'pressR', 0.08]], emo: [[0, 'smug']], look: [0.7, 0], extras: KS }); },
  ui() { info('SOFORT ZU JONAS', 65.6, { y: 360, size: 54 }); },
  sfx: [[65.55, 'footsteps', 0.9], [65.6, 'pop', 1], [66.75, 'tap'], [66.9, 'tap'], [67.05, 'tap']] });
// ---- 36 · "Na, los, Jonas. Zeig her, wie viel du hast!"
S(67.4, { tense: 1, tr: 'zoomIn', cam: CLOSE(67.4, 69.52),
  draw() { setJonasFront({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[67.4, 'hips'], [68.3, 'pointR']], emo: [[67.4, 'grin'], [68.3, 'smug']], extras: KS }); },
  ui() { info('„ZEIG HER!"', 68.35, { y: 380, bg: PAL.red, size: 60 }); },
  sfx: [[67.45, 'swish', 1], [68.35, 'pop', 1.1], [68.9, 'whoosh', 1.1]] });
// ---- 37 · Jonas grins
S(69.52, { tense: 1, tr: 'whipR', cam: [[69.52, 540, 1000, 1.75], [70.48, 540, 985, 1.86]],
  draw() { setJonasFront({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], tilt: [[69.52, 0], [69.8, -0.06]], extras: { glasses: true } }); if (TT > 69.8 && TT < 70.3) { const u = (TT - 69.8) / 0.5; sparkle(480, 950, 46 * (1 - u), '#fff', TT * 5); sparkle(600, 950, 46 * (1 - u), '#fff', TT * 5); } },
  ui() {},
  sfx: [[69.6, 'swish', 0.8], [69.8, 'ting']] });
// ---- 38 · the laptop opens — its screen glows, the number stays hidden
S(70.48, { tense: 1, tr: 'zoomIn', cam: [[70.48, 540, 1000, 1.0], [71.86, 540, 960, 1.15]],
  draw() { setLeoDesk({ blur: 12 }); const op = EZ.o3(clamp((TT - 70.6) / 0.7)); laptopOpen(540, 1300, 1.25, op, (h) => { ctx.save(); ctx.translate(0, -h / 2); blurCounter(0, 0, 520, 200, 'KONTO · JONAS'); ctx.restore(); }); },
  ui() { info('JETZT WIRD ABGERECHNET', 71.0, { y: 360, bg: PAL.red, size: 48 }); },
  sfx: [[70.6, 'creak', 1.6], [71.0, 'pop', 1], [71.3, 'powerOn']] });
// ---- 39 · both lean in towards the screen (two-shot, tension)
S(71.86, { tense: 1, tr: 'cut', lift: 200, cam: [[71.86, 540, 1150, 1.05], [73.28, 540, 1100, 1.2]],
  draw() { setLeoRoom({ blur: 5 }); glow(540, 1150, 400, '#52b8ff', 0.3);
    char('kevin', 330, FLOOR + 40, 0.9, { pose: [[0, 'hips']], emo: [[0, 'smug']], look: [0.6, 0.5], lean: 0.08, extras: KS });
    char('jonas', 760, FLOOR + 40, 0.9, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], look: [-0.6, 0.5], lean: -0.08, extras: { glasses: true } });
    laptopOpen(545, FLOOR - 120, 0.5, 1, (h) => { ctx.save(); ctx.translate(0, -h / 2); blurCounter(0, 0, 520, 200, 'KONTO · JONAS'); ctx.restore(); }); },
  ui() {},
  sfx: [[71.9, 'heartbeat', 1.4]] });

// =====================================================================  THE QUESTION
// ---- 40 · Kevin: 35 million (top half)
S(73.28, { tense: 1, tr: 'glitch', cam: [[73.28, 540, 960, 1.0], [75.3, 540, 960, 1.03]],
  draw() { splitTopBottom(() => { rays('#1d48b8', '#2f6df6', { cy: 560, spin: 0.08 }); char('kevin', 280, 900, 0.62, { pose: [[0, 'hips']], emo: [[0, 'smug']], extras: KS }); }, () => { rays('#b6302b', '#e8483c', { cy: 1400, spin: -0.08 }); }); },
  ui() { hud('KONTO · KEVIN', [[0, 35e6]], { x: 720, y: 560, scale: 0.85, t0: 73.35 }); },
  sfx: [[73.35, 'pop', 1], [73.4, 'cashReg'], [74.0, 'heartbeat', 1.2]] });
// ---- 41 · ...and Jonas? (bottom half; his account stays hidden) — cut on the question
S(75.3, { tense: 1, tr: 'cut', cam: [[75.3, 540, 960, 1.0], [77.4, 540, 960, 1.05]], punch: [[76.3, 0.06]],
  draw() { splitTopBottom(() => { rays('#1d48b8', '#2f6df6', { cy: 560, spin: 0.08 }); char('kevin', 280, 900, 0.62, { pose: [[0, 'hips']], emo: [[0, 'smug']], extras: KS }); },
    () => { rays('#b6302b', '#e8483c', { cy: 1400, spin: -0.08 }); const k = springEase(TT - 75.35, 200, 14); char('jonas', 280, 1420 + (1 - k) * 500, 0.46, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], extras: { glasses: true } }); }); },
  ui() { hud('KONTO · KEVIN', [[0, 35e6]], { x: 720, y: 560, scale: 0.85 }); if (TT > 75.4) { const k = springEase(TT - 75.4, 260, 14); ctx.save(); ctx.translate(720, 1200); ctx.scale(k * 0.85, k * 0.85); blurCounter(0, 0, 560, 210, 'KONTO · JONAS'); ctx.restore(); }
    info('WIE VIEL HAT JONAS? 🤔', 76.3, { y: 960, bg: PAL.yellow, fg: '#1b1530', size: 54 }); },
  sfx: [[75.4, 'pop', 1.2], [75.45, 'glitch'], [75.6, 'coinTicks', 1.6, 4], [76.3, 'pop', 1]] });
