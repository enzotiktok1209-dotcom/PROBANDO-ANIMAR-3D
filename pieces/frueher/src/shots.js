// =====================================================================
//  shots.js — GTA 6 eine Woche früher zocken vs 10 Millionen sofort (DE). ~50 shots on the trimmed voice (70.7 s).
//  Jonas takes the money (9 M after his house), Kevin streams GTA 6 a week early:
//  3 Mio. viewers/day x 0,40 € x 7 days + 1 Mio. contract = 9,4 Mio. -> Kevin wins (never said).
// =====================================================================
const KONTO = [[0, 10e6], [26.0, 9e6]];
const hudJonas = (o = {}) => hud('KONTO · JONAS', KONTO, { ...o });
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
  if (icon === 'cash') { glow(0, 0, 200, '#a6f0b4', 0.3); briefcase(0, 60, 0.42, 1); } else { glow(0, 0, 200, '#ffd0a0', 0.3); gamepad(-60, 10, 0.4, Math.sin(TT * 3) * 0.08, Math.floor(TT * 6) % 4); calendarPage(110, 0, 0.3, 'TAGE', 7); }
  ctx.restore();
  tText(big, 0, h / 2 - 92, 44, { color: '#fff', maxW: w - 36 }); tText(sub, 0, h / 2 - 40, 26, { color: 'rgba(255,255,255,0.95)', shadow: false, weight: 800, maxW: w - 40 });
  ctx.restore();
}
function fingerArm(id, x0, y0, x1, y1, w = 130) {
  const L = LOOKS[id]; line(x0, y0, x1, y1, w, L.top); line(x0 + w * 0.18, y0, x1 + w * 0.12, y1, w * 0.25, L.topD);
  const a = Math.atan2(y1 - y0, x1 - x0); circ(x1 - Math.cos(a) * w * 0.2, y1 - Math.sin(a) * w * 0.2, w * 0.52, L.topD);
  ctx.save(); ctx.translate(x1 + Math.cos(a) * w * 0.3, y1 + Math.sin(a) * w * 0.3); ctx.rotate(a); circ(0, 0, w * 0.5, L.skin); fillRR(w * 0.2, -w * 0.16, w * 0.85, w * 0.32, w * 0.16, L.skin); circ(w * 0.05, w * 0.42, w * 0.2, L.skinD); ctx.restore();
}
const plus1c = (cx, cy, rate, t0, seed) => { const n = Math.floor((TT - t0) * rate); for (let k = Math.max(0, n - 10); k <= n; k++) { const tb = t0 + k / rate, u = (TT - tb) / 1.1; if (u < 0 || u > 1) continue; const R = RNG(seed, k); ctx.save(); ctx.globalAlpha = u < 0.75 ? 1 : 1 - (u - 0.75) / 0.25; ctx.translate(cx + R.n(230), cy - u * 300); ctx.scale(springEase(TT - tb, 320, 12), springEase(TT - tb, 320, 12)); tText('+1 CENT', 0, 0, 60, { color: '#ff9a5a', stroke: '#3a1a00', strokeW: 10 }); ctx.restore(); } };
const CLOSE = (t0, t1, x = 540) => [[t0, x, 1000, 1.65], [t1, x, 978, 1.8]];
const CLOSEJ = (t0, t1) => [[t0, 540, 1000, 1.72], [t1, 540, 980, 1.88]];
const cash = (seed, t0, n = 22) => { if (TT > t0) billRain(seed, t0, n, { spread: 1.5 }); };
function splitTopBottom(top, bottom) {
  ctx.save(); ctx.beginPath(); ctx.rect(-300, -400, 1700, 1360); ctx.clip(); top(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-300, 960, 1700, 1400); ctx.clip(); bottom(); ctx.restore(); line(-300, 960, 1400, 960, 14, '#ffffff');
}
const twoShot = (kevinT, jonasT, set = setStudio) => { set({ blur: 4 }); char('kevin', 320, FLOOR + 40, 0.9, { look: [0.7, 0], ...kevinT }); char('jonas', 760, FLOOR + 40, 0.9, { look: [-0.7, 0], extras: { glasses: true }, ...jonasT }); };

const KS2 = { chain: 1, shades: 1 };
const mess = (seed, y0 = FLOOR - 20) => { const R = RNG('mess', seed); for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(120 + i * 270 + R.n(40), y0 + R.n(30)); ctx.rotate(R.n(0.2)); pizzaBox(0, 0, 0.55); ctx.restore(); } for (let i = 0; i < 6; i++) energyCan(80 + i * 190 + R.n(50), y0 + 60 + R.n(20), 0.55, Math.PI / 2 * (i % 2 ? 1 : -1) + R.n(0.3), ['#41f08a', '#ff4fa3', '#52b8ff'][i % 3], 1); };
const flyIn = (t0, dur = 0.5) => EZ.o3(clamp((TT - t0) / dur));

// Jonas stands left (green: the money), Kevin right (orange: GTA 6) in this piece
const duoStudio = (jT = {}, kT = {}, o = {}) => { setStudio(o); char('jonas', 300, FLOOR - 40, 0.8, { emo: [[0, 'happy']], look: [0.4, -0.4], extras: { glasses: true }, ...jT }); char('kevin', 780, FLOOR - 40, 0.8, { emo: [[0, 'grin']], look: [-0.3, -0.3], ...kT }); };
const cards = (t0) => { tText('WAS NIMMST DU?', 540, 200, 66, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14, maxW: 1000 });
  iconCard(285, 462, 'SOFORT', '10 MILLIONEN €', 'AUF DIE HAND', PAL.green, t0, 'cash'); iconCard(795, 462, '7 TAGE FRÜHER', 'GTA 6 ZOCKEN', 'VOR ALLEN ANDEREN', PAL.orange, t0 + 0.06, 'game'); tText('VS', 540, 462, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); };
const streamShot = (fn, o = {}) => { setStreamRoom({ blur: o.blur ?? 4 }); gameTV(540, 760, 900, 520, (x, y, w, h) => { const sc = w / 1080; ctx.save(); ctx.translate(x, y - 560 * sc); ctx.scale(sc, sc); setVice(); ctx.restore(); fn && fn(x, y, w, h); }); };
const VIEW = [[30.2, 0], [30.65, 10], [31.92, 10000, 0.6], [33.62, 3000000, 1.0]];
const MSGS = [['max_99', 'WIE GEIL IST DAS 😍'], ['lea.gg', 'GTA 6 SCHON?!', '#52b8ff'], ['tim', 'NEID 😭', '#ffd23f'], ['nina', 'ZEIG VICE CITY!', '#41f08a'], ['ben', 'LEGENDE 🔥'], ['ali', '+1 ABO ⭐', '#52b8ff']];

// =====================================================================  THE HOOK
// ---- 1 · "GTA 6" — Vice City at sunset, the title slams in (0.2 s punch-in on frame one)
S(0.0, { tr: 'cut', lift: 0, cam: [[0, 540, 940, 1.35], [0.2, 540, 940, 1.0], [1.06, 540, 930, 1.08]],
  draw() { setVice(); const k = springEase(TT - 0.03, 260, 12); gtaTitle(500, 820, 1.25, k); if (TT > 0.69) { const k2 = springEase(TT - 0.69, 260, 12); gamepad(540, 1300, 1.0 * k2, Math.sin(TT * 3) * 0.06, Math.floor(TT * 6) % 4); } },
  sfx: [[0.03, 'impact'], [0.69, 'pop', 1.1], [0.9, 'click']] });
// ---- 2 · "…eine Woche vor allen anderen zocken?" — the calendar: 19.11. for everyone, a week earlier for one; a locked crowd
function lockIcon(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.arc(0, -26, 24, Math.PI, 0); ctx.lineWidth = 12; ctx.strokeStyle = '#c9cede'; ctx.stroke(); fillRR(-36, -26, 72, 56, 10, '#ff4545'); circ(0, -2, 8, '#5a0a10'); ctx.restore(); }
S(1.06, { tr: 'whipL', lift: 0, tense: 1, cam: [[1.06, 540, 980, 1.0], [3.08, 540, 960, 1.1]],
  draw() { setDark('#2a1650', '#07030f'); const R = RNG('crowd2');
    for (let i = 0; i < 7; i++) { const x = -20 + i * 185 + R.n(20), y = 1500, c = '#4a3780'; circ(x, y - 150, 62, c); fillRR(x - 85, y - 95, 170, 260, 70, c); if (TT > 1.5 + i * 0.04) lockIcon(x, y - 150, 0.85 * springEase(TT - 1.5 - i * 0.04, 300, 13)); }
    const a = springEase(TT - 1.1, 240, 13), b = springEase(TT - 1.85, 240, 13);
    ctx.save(); ctx.translate(300, 860); ctx.rotate(-0.06); ctx.scale(a * 0.62, a * 0.62); calendarPage(0, 0, 1, 'NOV · ALLE', 19); ctx.restore();
    ctx.save(); ctx.translate(780, 860); ctx.rotate(0.06); ctx.scale(b * 0.62, b * 0.62); calendarPage(0, 0, 1, 'NOV · DU', 12); ctx.restore(); if (TT > 1.85) glow(780, 860, 320, '#ffd23f', 0.3 * b); },
  ui() { info('7 TAGE FRÜHER! ⏩', 2.17, { y: 360, bg: PAL.orange, size: 58 }); },
  sfx: [[1.1, 'flip'], [1.5, 'click', 1.2], [1.85, 'flip'], [1.9, 'sparkle'], [2.17, 'pop', 1]] });
// ---- 3 · "Oder 10 Millionen Euro sofort?" — the cash mountain rises, the number slams
S(3.08, { tr: 'flash', tense: 1, cam: [[3.08, 540, 980, 1.0], [5.3, 540, 960, 1.12]], punch: [[3.49, 0.1]],
  draw() { rays('#9a6a00', '#e8b400', { cy: 940, spin: 0.3 }); glow(540, 1000, 700, '#fff2b0', 0.4); cashMountain(540, 1240, 1.15, clamp((TT - 3.1) / 0.6)); if (TT > 3.4) billRain('d3b', 3.4, 26, { burst: [540, 820], spread: 1.6 }); },
  ui() { if (TT > 3.49) { const k = springEase(TT - 3.49, 300, 11); ctx.save(); ctx.translate(540, 400); ctx.scale(k, k); tText('10.000.000 €', 0, 0, 120, { color: PAL.yellow, stroke: '#3a2400', strokeW: 22 }); ctx.restore(); } info('SOFORT ⚡', 4.75, { y: 580, bg: PAL.red, size: 60 }); },
  sfx: [[3.1, 'whooshUp', 1], [3.49, 'cashCannon'], [4.0, 'coinPour'], [4.75, 'pop', 1]] });

// =====================================================================  THE CHOICE
// ---- 4 · "Jonas wählt zuerst." — the two at their buttons with both options (the cover); Jonas' hand goes up
S(5.3, { tr: 'zoomOut', lift: 110, cam: [[5.3, 540, 1020, 1.0], [6.73, 540, 1010, 1.05]],
  draw() { duoStudio({ pose: [[5.3, 'idle'], [5.95, 'raiseR', 0.2]], emo: [[5.3, 'happy'], [6.0, 'grin']] }, { emo: [[0, 'confused']] }); studioPodiums(); },
  ui() { cards(5.32); },
  sfx: [[5.32, 'pop', 1], [5.38, 'pop', 1.2], [5.95, 'whooshUp', 1], [6.0, 'pop', 1.1]] });
// ---- 5 · "Und er nimmt das Geld." — the slam on the green button, cash bursts
S(6.73, { tr: 'zoomIn', lift: 90, cam: [[6.73, 300, 1140, 1.45], [7.98, 310, 1090, 1.6]], shake: [[7.4, 20, 0.4]],
  draw() { setStudio({ blur: 3 }); char('kevin', 780, FLOOR - 40, 0.8, { emo: [[0, 'confused']], look: [-0.6, 0.2] });
    char('jonas', 300, FLOOR - 40, 0.8, { pose: [[6.73, 'raiseR'], [7.3, 'slamR', 0.08], [7.7, 'cheer', 0.2]], emo: [[6.73, 'grin'], [7.7, 'laugh']], look: [0.4, 0.5], extras: { glasses: true } });
    studioPodiums({ pressL: TT > 7.4 ? 1 : 0, litL: TT > 7.4 ? 0.9 : 0 }); impactLines(300, 1250, 120, 380, 12, 7.4); cash('j5', 7.45, 24); },
  ui() { info('DAS GELD! 💰', 7.62, { y: 380, bg: PAL.green, size: 58 }); },
  sfx: [[7.4, 'slam'], [7.45, 'buzzerWin'], [7.62, 'cashCannon']] });
// ---- 6 · "10 Millionen!" — Jonas hugs the open briefcase
S(7.98, { tr: 'whipR', cam: CLOSEJ(7.98, 8.91),
  draw() { setStudio({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'holdBoth']], emo: [[0, 'laugh']], extras: { glasses: true }, holdR: () => briefcase(-70, 10, 0.3, 1) }); cash('j6', 8.0, 16); },
  ui() { popText('10 MILLIONEN! 🤑', 540, 380, 8.0, 80, PAL.yellow, -0.04, 0); },
  sfx: [[8.0, 'moneyRain'], [8.05, 'pop', 1]] });
// ---- 7 · "Ein Spiel kann ich mir auch kaufen." — he waves a game case with a shrug
S(8.91, { tr: 'cut', cam: CLOSEJ(8.91, 10.45),
  draw() { setStudio({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[8.91, 'idle'], [9.1, { la: [0.16, -0.12], ra: [1.62, -3.15] }, 0.2]], emo: [[0, 'smug']], tilt: [[8.91, 0], [9.6, 0.08]], extras: { glasses: true }, holdR: () => gtaCase(10, 20, 0.5, 0.1) }); },
  ui() { info('EIN SPIEL KANN ICH KAUFEN 😏', 9.3, { y: 380, bg: PAL.blue, size: 44 }); },
  sfx: [[9.1, 'swish', 1], [9.3, 'pop', 1], [9.98, 'cashReg', 0.5]] });
// ---- 8 · "Kevin dagegen springt sofort auf die Konsole zu." — Kevin leaps across the studio at the console
S(10.45, { tr: 'whipL', lift: 120, cam: [[10.45, 540, 1100, 1.0], [12.86, 600, 1080, 1.08]],
  draw() { setStudio({ blur: 4 }); const u = clamp((TT - 10.6) / 1.5), x = lerp(120, 760, EZ.io(u)); gameConsole(900, FLOOR - 20, 0.6); glow(900, FLOOR - 200, 260, '#ffffff', 0.3);
    char('kevin', x, FLOOR + 20, 0.85, { run: [[10.45, 1], [12.1, 0, 0.2]], jump: [[10.45, 0], [11.25, 180, 0.3], [11.9, 0, 0.3]], pose: [[10.45, 'armsUp'], [12.2, 'holdBoth', 0.2]], emo: [[0, 'grin']], lean: 0.12 }); speedLines(10, 0.35, 'sl8'); },
  ui() { info('KEVIN: GTA 6! 🎮', 11.25, { y: 380, bg: PAL.orange, size: 56 }); },
  sfx: [[10.5, 'footsteps', 1.8], [11.25, 'whooshUp', 1.2], [11.3, 'pop', 1], [12.1, 'thud']] });
// ---- 9 · "Das meisterwartete Spiel aller Zeiten," — Kevin hugs the console, a trophy pops: most anticipated
S(12.86, { tr: 'zoomIn', cam: CLOSE(12.86, 14.75),
  draw() { setStreamRoom({ blur: 10 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'holdBoth']], emo: [[0, 'love']], tilt: [[12.86, 0], [13.4, -0.1]], holdR: () => gameConsole(-40, 60, 0.32) });
    if (TT > 13.4) { const k = springEase(TT - 13.4, 260, 12); ctx.save(); ctx.translate(850, 760); ctx.scale(k, k); crown(0, 0, 0.6); ctx.restore(); } },
  ui() { sticker('🏆 MEISTERWARTET ALLER ZEITEN', 540, 380, 13.07, { bg: PAL.yellow, fg: '#1b1530', size: 42 }); },
  sfx: [[12.9, 'swish', 1], [13.07, 'pop', 1], [13.4, 'bling']] });
// ---- 10 · "…und ich spiel's als Erster!" — a "#1" badge slams down, confetti
S(14.75, { tr: 'whipR', cam: [[14.75, 540, 960, 1.0], [16.6, 540, 940, 1.1]], punch: [[16.05, 0.1]],
  draw() { rays('#ff8a1e', '#ffd23f', { cy: 900, spin: 0.4 }); const k = springEase(TT - 15.95, 260, 11); ctx.save(); ctx.translate(540, 980); ctx.scale(k, k); circ(0, 0, 300, '#ffd23f'); circ(0, 0, 260, '#ff8a1e'); tText('#1', 0, 10, 260, { color: '#fff', stroke: '#7a3a00', strokeW: 24 }); ctx.restore(); confetti('c10', 16.05, 40); },
  ui() { info('ALS ERSTER! 🥇', 15.4, { y: 360, bg: '#141026', size: 60 }); },
  sfx: [[15.4, 'pop', 1], [15.95, 'whooshDown', 1.2], [16.05, 'impact'], [16.1, 'applause', 0.6]] });
// ---- 11 · "Das ist ein Wunder!" — Kevin on his knees, arms up, a beam of heavenly light, a choir
S(16.6, { tr: 'flash', cam: CLOSE(16.6, 17.87),
  draw() { setStreamRoom({ blur: 10 }); ctx.save(); ctx.globalAlpha = 0.55; poly([[420, -400], [660, -400], [820, 1700], [260, 1700]], 'rgba(255,250,220,0.5)'); ctx.restore(); glow(540, 700, 500, '#fff8d0', 0.5); twinkles('w11', 300, 300, 480, 600, 10, { s: 28 });
    char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'armsUp']], emo: [[0, 'love']], look: [0, -0.8], extras: { blush: 1 } }); },
  ui() { popText('EIN WUNDER! 🙏', 540, 380, 17.29, 86, '#fff6c8', -0.04, 0); },
  sfx: [[16.65, 'choir'], [17.29, 'pop', 1], [17.3, 'sparkle']] });

// =====================================================================  THE DEAL
// ---- 12 · "Dann machen wir einen Deal:" — Jonas points at Kevin, grinning
S(17.87, { tr: 'whipL', tense: 1, cam: CLOSEJ(17.87, 18.97),
  draw() { setStudio({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[17.87, 'idle'], [18.0, 'pointR', 0.15]], emo: [[0, 'grin']], look: [0.5, 0], extras: { glasses: true } }); },
  ui() { popText('DEAL? 🤝', 540, 380, 18.02, 100, PAL.yellow, -0.05, 0); },
  sfx: [[18.02, 'pop', 1.1], [18.7, 'ting']] });
// ---- 13 · "Wer in sieben Tagen weniger hat…" — the stake: a 7-day calendar, the loser…
S(18.97, { tr: 'zoomIn', cam: [[18.97, 540, 960, 1.0], [20.4, 540, 940, 1.1]],
  draw() { rays('#3a1a6a', '#5a2bd6', { cy: 900, spin: 0.2 }); const k = springEase(TT - 19.0, 240, 13); ctx.save(); ctx.translate(540, 980); ctx.scale(k, k); calendarPage(0, 0, 1.2, 'TAGE', 7); ctx.restore(); },
  ui() { info('IN 7 TAGEN…', 19.26, { y: 360, bg: '#141026', size: 58 }); if (TT > 19.83) info('WER WENIGER HAT…', 19.83, { y: 1380, bg: PAL.red, size: 52 }); },
  sfx: [[19.0, 'flip'], [19.26, 'pop', 1], [19.83, 'pop', 1.2], [20.0, 'tickSoft']] });
// ---- 14 · "…kauft dem anderen einen Lamborghini." — a yellow supercar with a giant bow drifts in
S(20.4, { tr: 'whipR', lift: 0, cam: [[20.4, 540, 1080, 1.0], [22.12, 540, 1060, 1.08]],
  draw() { setShowroom(); const x = 540 + 900 * (1 - springEase(TT - 20.45, 110, 16)); supercar(x, 1400, 1.0, { col: '#ffcc00', wheelSpin: (x - 540) / 98 });
    if (TT > 21.3) { const k = springEase(TT - 21.3, 260, 12); ctx.save(); ctx.translate(560, 1080); ctx.scale(k, k); ell(-80, 0, 90, 46, '#ff3b5c', -0.4); ell(80, 0, 90, 46, '#ff3b5c', 0.4); circ(0, 0, 34, '#d81b43'); ctx.restore(); } },
  ui() { info('…KAUFT DEM ANDEREN EINEN LAMBORGHINI 🎁', 21.42, { y: 380, bg: PAL.yellow, fg: '#1b1530', size: 38 }); },
  sfx: [[20.45, 'engine'], [21.0, 'screech'], [21.3, 'pop', 1.3], [21.42, 'pop', 1], [21.6, 'sparkle']] });
// ---- 15 · "Abgemacht!" — the handshake slams
S(22.12, { tr: 'cut', lift: 200, cam: [[22.12, 540, 1150, 1.1], [22.91, 540, 1130, 1.18]], punch: [[22.15, 0.12]], shake: [[22.15, 12, 0.3]],
  draw() { const sh = TT > 22.15 ? Math.sin(TT * 30) * 0.05 * clamp(1 - (TT - 22.15) / 0.6) : 0; setStudio({ blur: 4 });
    char('jonas', 320, FLOOR + 40, 0.9, { pose: [[0, { la: [0.16, -0.12], ra: [0.85 + sh, -0.2] }]], emo: [[0, 'grin']], look: [0.7, 0], extras: { glasses: true } });
    char('kevin', 760, FLOOR + 40, 0.9, { pose: [[0, { la: [0.85 - sh, -0.2], ra: [0.16, -0.12] }]], emo: [[0, 'grin']], look: [-0.7, 0] }); impactLines(540, 1200, 80, 260, 10, 22.15); },
  ui() { info('ABGEMACHT! 🤝', 22.15, { y: 380, bg: PAL.red, size: 66 }); },
  sfx: [[22.12, 'pat'], [22.15, 'impact']] });

// =====================================================================  JONAS' HOUSE
// ---- 16 · "Also kauft sich Jonas als Erstes…" — Jonas taps "KAUFEN" on his phone
S(22.91, { tr: 'zoomOut', cam: CLOSEJ(22.91, 24.84),
  draw() { setStreet({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'phoneR']], emo: [[22.91, 'happy'], [24.3, 'grin']], look: [0.3, -0.2], extras: { glasses: true }, holdR: () => phone(0, -30, 0.3, 0.15, () => { ctx.fillStyle = '#0e1a2e'; ctx.fillRect(-84, -176, 168, 352); fillRR(-70, 100, 140, 50, 12, '#26a24c'); tText('KAUFEN', 0, 126, 22, { color: '#fff', shadow: false }); }) }); },
  ui() { info('ALS ERSTES… 🏡', 24.07, { y: 380, bg: PAL.green, size: 56 }); },
  sfx: [[23.0, 'swish', 0.9], [24.07, 'pop', 1], [24.3, 'phoneTap']] });
// ---- 17 · "…ein Haus mit Pool für eine Million." — the villa with a pool drops in, the price, his account rolls down
S(24.84, { tr: 'whipL', cam: [[24.84, 540, 1000, 1.0], [26.51, 540, 980, 1.08]],
  draw() { rays('#3fb6ff', '#8fd8ff', { cy: 900, spin: 0.2 }); const k = springEase(TT - 24.9, 200, 13); ctx.save(); ctx.translate(540, 1300 + (1 - k) * 700); poolVilla(0, 0, 0.8); ctx.restore(); if (TT > 25.25) splash(540, 1340, 25.25, 1.0); },
  ui() { hudJonas(); priceTag(560, 560, springEase(TT - 25.6, 280, 12), '1 MIO. €', -0.08); },
  sfx: [[24.9, 'whooshDown', 1], [25.1, 'thud'], [25.25, 'splashSfx'], [25.6, 'cashReg'], [26.0, 'coinTicks', 1, 3]] });

// =====================================================================  KEVIN GOES LIVE (fast cuts)
// ---- 18 · "Und Kevin?" — Kevin rubs his hands in front of the screen
S(26.51, { tr: 'whipR', cam: CLOSE(26.51, 27.22),
  draw() { setStreamRoom({ blur: 10 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'holdBoth']], emo: [[0, 'grin']], look: [0, -0.3], lean: Math.sin(TT * 12) * 0.03 }); },
  ui() { popText('UND KEVIN? 🎮', 540, 380, 26.55, 80, PAL.orange, -0.04, 0); },
  sfx: [[26.55, 'pop', 1], [26.8, 'click']] });
// ---- 19 · "Download fertig." — the bar fills to 100 %
S(27.22, { tr: 'cut', cam: [[27.22, 540, 960, 1.05], [28.14, 540, 960, 1.15]],
  draw() { streamShot(); downloadBar(540, 1300, 860, clamp((TT - 27.25) / 0.5)); },
  sfx: [[27.25, 'whooshUp', 1.3], [27.75, 'ding']] });
// ---- 20 · "Kamera an." — the camera's red light comes on
S(28.14, { tr: 'zoomIn', cam: [[28.14, 540, 1000, 1.1], [28.76, 540, 1000, 1.2]],
  draw() { setStreamRoom({ blur: 8 }); streamCam(540, 1500, 1.6 * springEase(TT - 28.15, 300, 13), TT > 28.5); },
  ui() { info('KAMERA AN 🎥', 28.2, { y: 380, bg: '#141026', size: 58 }); },
  sfx: [[28.2, 'click'], [28.5, 'shutter'], [28.52, 'beep']] });
// ---- 21 · "Mikro an." — the mic lights up green
S(28.76, { tr: 'whipL', cam: [[28.76, 540, 1000, 1.1], [29.39, 540, 1000, 1.2]],
  draw() { setStreamRoom({ blur: 8 }); podMic(640, 1350, 1.4 * springEase(TT - 28.77, 300, 13), TT > 29.07); },
  ui() { info('MIKRO AN 🎙️', 28.8, { y: 380, bg: '#141026', size: 58 }); },
  sfx: [[28.8, 'click', 1.2], [29.07, 'powerOn']] });
// ---- 22 · "Stream an." — LIVE
S(29.39, { tr: 'flash', cam: [[29.39, 540, 960, 1.1], [30.18, 540, 960, 1.18]], punch: [[29.75, 0.1]],
  draw() { streamShot(); char('kevin', 540, 1520, 0.6, { pose: [[0, 'waveR']], emo: [[0, 'grin']] }); },
  ui() { liveBadge(540, 380, 29.75); },
  sfx: [[29.75, 'liveOn'], [29.8, 'impact']] });
// ---- 23 · "Erst schauen zehn Leute zu." — the viewer count: 10
S(30.18, { tr: 'cut', cam: [[30.18, 540, 1000, 1.0], [31.65, 540, 980, 1.06]],
  draw() { streamShot(); char('kevin', 540, 1520, 0.6, { pose: [[0, 'waveR']], emo: [[0, 'happy']] }); for (let i = 0; i < 3; i++) viewerIcon([170, 910, 300][i], [1080, 1080, 1240][i], 0.5 * springEase(TT - 30.5 - i * 0.12, 300, 13)); },
  ui() { liveBadge(380, 380, 0); viewerCount(700, 380, VIEW); },
  sfx: [[30.5, 'popHi', 1], [30.62, 'popHi', 1.1], [30.74, 'popHi', 1.2]] });
// ---- 24 · "Dann zehntausend." — the counter jumps, the chat starts to fly
S(31.65, { tr: 'zoomIn', cam: [[31.65, 540, 960, 1.0], [32.83, 540, 950, 1.06]],
  draw() { streamShot(); chatFeed(620, 1060, 400, 460, MSGS, 31.7, 6); char('kevin', 330, 1520, 0.6, { pose: [[0, 'cheer']], emo: [[0, 'grin']] }); },
  ui() { liveBadge(380, 380, 0); viewerCount(700, 380, VIEW); popText('10.000! 👀', 540, 560, 31.92, 80, '#41f08a', -0.04, 0); },
  sfx: [[31.92, 'pop', 1], [32.0, 'coinTicks', 1.4, 4], [32.3, 'notify']] });
// ---- 25 · "Und am Abend: drei Millionen." — night falls on the window, the counter races to 3.000.000, hearts flood (riser into the hit)
S(32.83, { tr: 'cut', tense: 1, cam: [[32.83, 540, 960, 1.0], [34.87, 540, 940, 1.14]],
  draw() { streamShot(); chatFlood(33.62, 34, ['GTA 6 LIVE 😍', 'KEVIN LEGENDE!!!', 'OMG VICE CITY', '😱😱😱', 'ABO DA! ⭐', '🔥🔥 KEVIN']); },
  ui() { liveBadge(380, 380, 0); viewerCount(700, 380, VIEW); info('AM ABEND 🌙', 33.0, { y: 560, bg: '#141026', size: 52 }); if (TT > 33.91) { const k = springEase(TT - 33.91, 300, 10); ctx.save(); ctx.translate(540, 1000); ctx.scale(k, k); tText('3.000.000', 0, 0, 150, { color: '#fff', stroke: '#ef2b2b', strokeW: 24 }); ctx.restore(); } },
  sfx: [[33.0, 'pop', 1], [33.62, 'impact'], [33.65, 'applause', 0.8]] });
// ---- 26 · "Drei Millionen?!" — Kevin's jaw drops
S(34.87, { tr: 'zoomIn', cam: CLOSE(34.87, 36.17), punch: [[35.17, 0.1]],
  draw() { setStreamRoom({ blur: 10 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[34.87, 'idle'], [35.1, 'headGrab', 0.15]], emo: [[0, 'shock']], squash: [[34.87, 0], [35.15, -0.4, 0.1], [35.4, 0, 0.2]] }); },
  ui() { popText('3 MILLIONEN?! 😱', 540, 380, 35.17, 80, PAL.yellow, -0.04, 0); },
  sfx: [[35.1, 'gasp'], [35.17, 'shockHit']] });
// ---- 27 · "Leute, ich liebe euch!" — a heart with his hands, hearts flying
S(36.17, { tr: 'whipR', cam: CLOSE(36.17, 37.89),
  draw() { setStreamRoom({ blur: 10 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'armsUp']], emo: [[0, 'love']], extras: { blush: 1 } }); for (let i = 0; i < 8; i++) { const t0 = 36.3 + i * 0.15, u = (TT - t0) / 1.2; if (u < 0 || u > 1) continue; const R = RNG('h27', i); ctx.save(); ctx.globalAlpha = 1 - u; heartIcon(540 + R.n(380), 1200 - u * 700, 40 + R.f() * 30); ctx.restore(); } },
  ui() { popText('ICH LIEBE EUCH! ❤️', 540, 380, 36.94, 78, '#ff8fc0', -0.04, 0); },
  sfx: [[36.3, 'kiss'], [36.94, 'pop', 1], [37.2, 'sparkle']] });

// =====================================================================  JONAS WATCHES
// ---- 28 · "Jonas sieht es auf seinem Handy." — on the sun lounger by his pool, phone in hand: Kevin's stream
S(37.89, { tr: 'slide', cam: [[37.89, 540, 1080, 1.0], [39.39, 540, 1060, 1.08]],
  draw() { rays('#3fb6ff', '#8fd8ff', { cy: 900, spin: 0.1 }); ctx.save(); ctx.translate(540, 1500); ctx.scale(1.4, 1.4); fillRR(-500, -40, 1000, 220, 30, '#29b6f6'); ctx.restore();
    char('jonas', 540, 1370, 0.8, { pose: [[0, 'phoneR']], emo: [[0, 'happy']], look: [0.3, -0.2], extras: { glasses: true }, holdR: () => phone(0, -30, 0.3, 0.15, () => { ctx.fillStyle = '#1a0f3a'; ctx.fillRect(-84, -176, 168, 352); char('kevin', 0, 120, 0.18, { emo: [[0, 'grin']] }); fillRR(-70, -168, 70, 26, 8, '#ef2b2b'); }) }); },
  ui() { info('JONAS SIEHT ZU 📱', 38.66, { y: 380, bg: PAL.blue, size: 54 }); },
  sfx: [[37.95, 'waves', 0.7], [38.66, 'pop', 1], [38.9, 'notify']] });
// ---- 29 · "Und sein Lächeln wird plötzlich kleiner." — close on Jonas, the smile fades (slow push, vignette)
S(39.39, { tr: 'cut', tense: 1, cam: [[39.39, 540, 1000, 1.7], [41.25, 540, 980, 2.0]],
  draw() { rays('#3fb6ff', '#8fd8ff', { cy: 900, spin: 0.05 }); char('jonas', 540, FLOOR + 160, 1.0, { emo: [[39.39, 'happy'], [40.3, 'neutral', 0.4], [40.8, 'serious', 0.3]], look: [0.2, 0.3], extras: { glasses: true } }); },
  sfx: [[40.3, 'recordScratch'], [40.74, 'dun']] });
// ---- 30 · "Und das ist erst der erste Tag." — TAG 1 of 7, six pages still to come
S(41.25, { tr: 'iris', cam: [[41.25, 540, 960, 1.0], [43.34, 540, 940, 1.1]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); for (let i = 6; i >= 0; i--) { const k = springEase(TT - 41.3 - i * 0.06, 260, 14); ctx.save(); ctx.translate(540 + i * 30, 980 - i * 18); ctx.rotate(i * 0.03); ctx.scale(k * 1.0, k * 1.0); calendarPage(0, 0, 1, 'TAG', i + 1); ctx.restore(); } },
  ui() { info('ERST TAG 1 VON 7! 😳', 42.48, { y: 360, bg: PAL.red, size: 54 }); },
  sfx: [[41.3, 'flip'], [41.6, 'flip', 1.1], [42.48, 'pop', 1], [42.96, 'impact']] });
// ---- 31 · "Jeder Zuschauer lässt im Schnitt 40 Cent da," — one viewer → 0,40 €
S(43.34, { tr: 'zoomIn', cam: [[43.34, 540, 960, 1.0], [45.81, 540, 950, 1.08]],
  draw() { rays('#0e8a45', '#14a956', { cy: 940, spin: 0.25 }); viewerIcon(300, 1060, 1.4 * springEase(TT - 43.4, 260, 13), '#ffffff'); if (TT > 44.6) { const k = springEase(TT - 44.6, 260, 12); ctx.save(); ctx.translate(560, 980); ctx.scale(k, k); tText('→', 0, 0, 140, { color: '#fff', shadow: false }); ctx.restore(); }
    if (TT > 44.85) { const k = springEase(TT - 44.85, 260, 12); ctx.save(); ctx.translate(820, 1000); ctx.scale(k, k); copperCent(-30, 0, 80, { sx: 1 }); copperCent(40, -20, 80, { sx: 1 }); ctx.restore(); } },
  ui() { info('PRO ZUSCHAUER', 43.74, { y: 380, bg: '#141026', size: 54 }); if (TT > 44.85) popText('Ø 0,40 €', 540, 1330, 44.85, 110, '#41f08a', -0.04, 0); },
  sfx: [[43.4, 'pop', 1], [43.74, 'pop', 1.1], [44.6, 'swish', 1], [44.85, 'coin'], [45.27, 'cashReg']] });
// ---- 32 · "…durch Spenden und Abos." — donation and sub alerts rain onto the stream
S(45.81, { tr: 'whipR', cam: [[45.81, 540, 960, 1.05], [47.12, 540, 950, 1.12]],
  draw() { streamShot(); },
  ui() { liveBadge(380, 380, 0); viewerCount(700, 380, [[0, 3000000]]); donation(540, 1100, 45.85, '5 €'); subAlert(540, 1250, 46.1); donation(540, 1400, 46.4, '20 €'); subAlert(540, 1100, 46.62, 'NEUES ABO ⭐'); },
  sfx: [[45.85, 'donation'], [46.1, 'ding'], [46.4, 'donation'], [46.62, 'ding', 1.2]] });

// =====================================================================  THE BRAND DEAL
// ---- 33 · "Am dritten Tag…" — TAG 3
S(47.12, { tr: 'iris', cam: [[47.12, 540, 960, 1.0], [48.62, 540, 940, 1.1]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); const k = springEase(TT - 47.14, 220, 13); ctx.save(); ctx.translate(540, 980); ctx.scale(k, k); calendarPage(0, 0, 1.25, 'TAG', 3); ctx.restore(); },
  ui() { info('TAG 3', 47.2, { y: 360, bg: PAL.orange, size: 62 }); },
  sfx: [[47.2, 'pop', 1], [47.25, 'clockSpin', 0.8]] });
// ---- 34 · "…ruft sogar eine riesige Gaming-Marke an:" — the phone rings: GAMING BRAND
S(48.62, { tr: 'zoomIn', cam: [[48.62, 540, 960, 1.0], [50.07, 540, 950, 1.1]],
  draw() { rays('#1d48b8', '#2f6df6', { cy: 900, spin: 0.25 }); const b = Math.sin(TT * 60) * 8 * (TT < 49.7 ? 1 : 0); ctx.save(); ctx.translate(b, 0); callScreen(540, 980, 2.4, () => { tText('🎮', 0, -40, 70, { shadow: false }); tText('GAMING', 0, 40, 26, { color: '#fff', shadow: false }); tText('MARKE', 0, 72, 26, { color: '#fff', shadow: false }); }, 'ANRUF'); ctx.restore(); },
  ui() { info('EINE RIESIGE GAMING-MARKE! 📞', 49.11, { y: 360, bg: PAL.pink, size: 44 }); },
  sfx: [[48.65, 'buzzPhone'], [49.11, 'pop', 1], [49.4, 'buzzPhone']] });
// ---- 35 · "…ein Werbevertrag über eine Million." — the contract slides in, Kevin signs, a giant cheque
S(50.07, { tr: 'whipL', cam: [[50.07, 540, 960, 1.0], [52.37, 540, 940, 1.1]], punch: [[51.84, 0.1]],
  draw() { setStreamRoom({ blur: 10 }); const k = springEase(TT - 50.1, 220, 13); adContract(540, 1000 - (1 - k) * 900, 1.3, clamp((TT - 50.9) / 0.8), -0.04); cash('c35', 51.84, 20); },
  ui() { popText('+1.000.000 €', 540, 380, 51.84, 100, '#41f08a', -0.04, 0); },
  sfx: [[50.1, 'whooshDown', 1], [50.3, 'fold'], [50.9, 'pencil'], [51.84, 'cashCannon']] });
// ---- 36 · "Jonas verschluckt sich an seinem Kaffee." — he sips… and sprays it out
S(52.37, { tr: 'whipR', cam: CLOSEJ(52.37, 54.7), shake: [[54.2, 12, 0.4]],
  draw() { rays('#3fb6ff', '#8fd8ff', { cy: 900, spin: 0.05 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[52.37, 'drinkR'], [54.2, 'facepalm', 0.15]], emo: [[52.37, 'happy'], [53.73, 'shock']], extras: { glasses: true }, holdR: TT < 54.2 ? () => mug(0, -30, 0.5) : undefined });
    if (TT > 54.2 && TT < 55) { const u = (TT - 54.2) / 0.8; for (let i = 0; i < 14; i++) { const R = RNG('sp', i); circ(540 + R.n(60) + u * 300 * (R.f() - 0.2), 760 + R.n(40) + u * u * 300, 12 * (1 - u), '#6b3f1f'); } } },
  ui() { popText('*HUST* ☕', 540, 380, 54.2, 90, '#ffffff', -0.06, 0); },
  sfx: [[52.5, 'slurp'], [54.2, 'spit'], [54.25, 'splashSfx', 0.6]] });
// ---- 37 · "Eine Million, nur fürs Zocken?!" — Jonas, outraged, phone in hand
S(54.7, { tr: 'cut', cam: CLOSEJ(54.7, 56.98), punch: [[55.22, 0.08]],
  draw() { rays('#b6302b', '#e8483c', { cy: 900, spin: 0.2 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[54.7, 'shrug'], [56.0, 'headGrab', 0.2]], emo: [[0, 'angry']], extras: { glasses: true, sweat: 1 } }); },
  ui() { popText('NUR FÜRS ZOCKEN?! 😤', 540, 380, 55.22, 70, PAL.yellow, -0.04, 0); },
  sfx: [[55.22, 'pop', 1], [56.0, 'errorBuzz']] });

// =====================================================================  DAY 7: THE RECKONING
// ---- 38 · "Am siebten Tag…" — TAG 7
S(56.98, { tr: 'iris', cam: [[56.98, 540, 960, 1.0], [57.97, 540, 940, 1.1]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); const k = springEase(TT - 57.0, 220, 13); ctx.save(); ctx.translate(540, 980); ctx.scale(k, k); calendarPage(0, 0, 1.25, 'TAG', 7); ctx.restore(); },
  ui() { info('TAG 7', 57.05, { y: 360, bg: PAL.orange, size: 62 }); },
  sfx: [[57.05, 'pop', 1], [57.1, 'clockSpin', 0.8]] });
// ---- 39 · "…treffen sie sich zur Abrechnung." — face to face across a table (slow push, vignette)
S(57.97, { tr: 'zoomIn', tense: 1, lift: 200, cam: [[57.97, 540, 1150, 1.05], [59.23, 540, 1130, 1.14]],
  draw() { setStudio({ blur: 6 }); char('jonas', 320, FLOOR + 40, 0.9, { pose: [[0, 'armsCross']], emo: [[0, 'serious']], look: [0.7, 0], extras: { glasses: true } }); char('kevin', 760, FLOOR + 40, 0.9, { pose: [[0, 'hips']], emo: [[0, 'smug']], look: [-0.7, 0] }); fillRR(140, FLOOR - 170, 800, 50, 14, '#6a3f22'); },
  ui() { info('ABRECHNUNG ⚖️', 58.35, { y: 380, bg: '#141026', size: 58 }); },
  sfx: [[58.0, 'footsteps', 1.2], [58.35, 'pop', 1], [58.8, 'heartbeat', 0.8]] });
// ---- 40 · "Jonas knallt sein Konto auf den Tisch." — the bank statement slams down
S(59.23, { tr: 'cut', cam: [[59.23, 540, 1000, 1.0], [61.18, 540, 980, 1.08]], shake: [[59.62, 16, 0.35]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#6a4a2a'], [1, '#4a3018']]); ctx.fillRect(-600, -400, 2300, 2700); for (let i = 0; i < 10; i++) line(-600, 200 + i * 180, 1700, 220 + i * 180, 6, 'rgba(0,0,0,0.12)');
    const a = springEase(TT - 59.5, 220, 13); statement(540, 1000 - (1 - a) * 900, 1.3, 'JONAS', null, -0.04); impactLines(540, 1000, 300, 600, 14, 59.62); },
  sfx: [[59.5, 'whooshDown', 1.2], [59.62, 'slam'], [59.65, 'thud']] });
// ---- 41 · "9 Millionen." — the statement up close: 9.000.000 €
S(61.18, { tr: 'zoomIn', cam: [[61.18, 540, 1000, 1.2], [62.17, 540, 1000, 1.3]], punch: [[61.41, 0.08]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#6a4a2a'], [1, '#4a3018']]); ctx.fillRect(-600, -400, 2300, 2700); statement(540, 1000, 1.3, 'JONAS', 9e6, -0.04); },
  ui() { popText('9.000.000 €', 540, 380, 61.41, 100, '#41f08a', -0.04, 0); },
  sfx: [[61.41, 'cashReg'], [61.45, 'pop', 1]] });
// ---- 42 · "Schlag das mal!" — Jonas, arms crossed, challenging
S(62.17, { tr: 'whipL', cam: CLOSEJ(62.17, 63.1),
  draw() { setStudio({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], tilt: [[62.17, 0], [62.5, 0.08]], extras: { glasses: true } }); },
  ui() { popText('SCHLAG DAS MAL! 😏', 540, 380, 62.2, 76, PAL.yellow, -0.04, 0); },
  sfx: [[62.2, 'pop', 1], [62.72, 'ting']] });
// ---- 43 · "Drei Millionen Zuschauer am Tag," — Kevin counts on his fingers, the first clue card
const clue = (t0, x, y, txt, col) => { if (TT < t0) return; const k = springEase(TT - t0, 300, 12); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); fillRR(-200, -70, 400, 140, 26, col); tText(txt, 0, 4, 52, { color: '#fff', shadow: false, maxW: 380 }); ctx.restore(); };
const CLUES = () => { clue(63.29, 540, 320, '3 MIO. / TAG', PAL.blue); clue(64.75, 300, 490, '× 0,40 €', PAL.green); clue(65.39, 780, 490, '× 7 TAGE', PAL.orange); clue(66.54, 540, 660, '+ 1 MIO. VERTRAG', PAL.pink); };
S(63.1, { tr: 'whipR', cam: CLOSE(63.1, 64.75),
  draw() { setStudio({ blur: 10 }); char('kevin', 540, FLOOR + 220, 0.9, { pose: [[63.1, 'pointUpR']], emo: [[0, 'smug']] }); },
  ui() { CLUES(); },
  sfx: [[63.29, 'pop', 1], [63.85, 'tick']] });
// ---- 44 · "40 Cent, sieben Tage." — the next two clues
S(64.75, { tr: 'cut', cam: CLOSE(64.75, 66.33),
  draw() { setStudio({ blur: 10 }); char('kevin', 540, FLOOR + 220, 0.9, { pose: [[64.75, 'pointR']], emo: [[0, 'grin']] }); },
  ui() { CLUES(); },
  sfx: [[64.75, 'popHi', 1], [65.39, 'popHi', 1.2]] });
// ---- 45 · "Plus der Vertrag." — the contract clue
S(66.33, { tr: 'zoomIn', cam: CLOSE(66.33, 67.27),
  draw() { setStudio({ blur: 10 }); char('kevin', 540, FLOOR + 220, 0.9, { pose: [[0, 'hips']], emo: [[0, 'smug']] }); },
  ui() { CLUES(); },
  sfx: [[66.54, 'pop', 1.2], [66.73, 'fold']] });
// ---- 46 · "Rechne selbst!" — Kevin points straight into the camera, a calculator spins in
S(67.27, { tr: 'whipL', cam: CLOSE(67.27, 68.21), punch: [[67.3, 0.1]],
  draw() { setStudio({ blur: 10 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'pointR']], emo: [[0, 'laugh']], look: [0, 0.3] }); const k = springEase(TT - 67.4, 260, 12); ctx.save(); ctx.translate(820, 780); ctx.rotate((1 - k) * 2); ctx.scale(k * 0.45, k * 0.45); calculator(0, 0, 1, '?', 0); ctx.restore(); },
  ui() { popText('RECHNE SELBST! 🧮', 540, 380, 67.3, 76, PAL.yellow, -0.04, 0); },
  sfx: [[67.3, 'pop', 1], [67.4, 'whoosh', 1.2], [67.79, 'ding']] });

// =====================================================================  THE QUESTION
// ---- 47 · "Wie viel hat Kevin? Und wer kauft den Lamborghini?" — even split: both enter at once (Jonas 9 Mio. on top, Kevin "???" below), the Lamborghini with a "?"
const YD = 900;
function splitEven(top, bottom) {
  ctx.save(); ctx.beginPath(); ctx.rect(-300, -400, 1700, YD + 400); ctx.clip(); top(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-300, YD, 1700, 1500); ctx.clip(); bottom(); ctx.restore(); line(-300, YD, 1400, YD, 14, '#ffffff');
}
S(68.21, { tr: 'glitch', tense: 1, capY: YD, cam: [[68.21, 540, 960, 1.0], [71.2, 540, 960, 1.04]],
  draw() { const k = springEase(TT - 68.23, 170, 13);
    splitEven(() => { rays('#b6302b', '#e8483c', { cy: 560, spin: 0.08 }); char('jonas', 350 - (1 - k) * 760, 860, 0.56, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], extras: { glasses: true }, lean: (1 - k) * 0.25 }); },
      () => { rays('#1d48b8', '#2f6df6', { cy: 1220, spin: -0.08 }); char('kevin', 350, 1520 + (1 - k) * 600, 0.56, { pose: [[0, 'hips']], emo: [[0, 'smug']], extras: { shades: 1 } }); }); },
  ui() { hud('KONTO · JONAS', [[0, 9e6]], { x: 775, y: 560, scale: 0.8, t0: 68.3 }); { const g = TT > 68.73 && TT < 69.0 ? Math.sin(TT * 90) * 12 : 0, kk = springEase(TT - 68.35, 260, 14); ctx.save(); ctx.translate(775 + g, 1230); ctx.scale(0.8 * kk, 0.8 * kk); blurCounter(0, 0, 560, 210, 'KONTO · KEVIN'); ctx.restore(); }
    if (TT > 69.18) { const k2 = springEase(TT - 69.18, 220, 13); ctx.save(); ctx.translate(540 + (1 - k2) * 900, 900); ctx.scale(0.42, 0.42); supercar(0, 120, 1.0, { col: '#ffcc00', wheelSpin: (1 - k2) * 10 }); ctx.restore(); }
    info('WER KAUFT DEN LAMBORGHINI? 🤔', 69.55, { y: 270, bg: PAL.yellow, fg: '#1b1530', size: 44 }); },
  sfx: [[68.25, 'whoosh', 1.1], [68.3, 'pop', 1], [68.73, 'glitch'], [68.8, 'coinTicks', 1.4, 4], [69.2, 'engine'], [69.55, 'pop', 1]] });
