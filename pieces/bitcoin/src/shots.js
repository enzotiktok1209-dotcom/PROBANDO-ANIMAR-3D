// =====================================================================
//  shots.js — Ein Bitcoin pro Tag, ein Jahr lang vs 50 Millionen sofort (DE). ~66 shots on the trimmed voice (90.0 s).
//  Kevin takes the 50 Mio. (49 Mio. at the end incl. penthouse, yacht, watches), Jonas a Bitcoin a day:
//  365 BTC x 134.000 € (67.000 € + 100 %) = 48.910.000 € -> Kevin wins by 90.000 € (never said).
//  Kevin stands left (green podium: the money), Jonas right (orange podium: Bitcoin).
// =====================================================================
function popText(str, x, y, t0, size, col, rot = 0, rise = 40) { if (TT < t0) return; const k = springEase(TT - t0, 300, 12); ctx.save(); ctx.translate(x, y - (TT - t0) * rise); ctx.rotate(rot); ctx.scale(k, k); tText(str, 0, 0, size, { color: col, stroke: '#1b0f2e', strokeW: size * 0.2 }); ctx.restore(); }
function info(str, t0, o = {}) { sticker(str, o.x ?? 540, o.y ?? 400, t0, { bg: o.bg ?? '#141026', fg: o.fg, size: o.size ?? 54, rot: o.rot ?? -0.03 }); }
function priceTag(x, y, s, txt, rot = -0.1, col = '#ffffff') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot + Math.sin(TT * 2) * 0.03); ctx.scale(s, s); line(-170, -70, -250, -150, 5, '#ddd'); poly([[-170, -80], [260, -80], [260, 80], [-170, 80], [-230, 0]], col); circ(-185, 0, 14, '#1b1530'); tText(txt, 45, 4, 70, { color: '#1b1530', shadow: false, maxW: 400 }); ctx.restore(); }
const CLOSE = (t0, t1, x = 540) => [[t0, x, 1000, 1.65], [t1, x, 978, 1.8]];
const cash = (seed, t0, n = 22, o = {}) => { if (TT > t0) billRain(seed, t0, n, { spread: 1.5, ...o }); };
const sp = (t0, k = 260, d = 13) => springEase(TT - t0, k, d);
const kevinT = (o = {}) => ({ emo: [[0, 'grin']], ...o });
const jonasT = (o = {}) => ({ emo: [[0, 'happy']], ...o, extras: { glasses: true, ...(o.extras || {}) } });
function choiceCard(x, y, top, big, sub, col, t0, icon) {
  if (TT < t0) return; const k = sp(t0, 260, 15), w = 450, h = 380;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  fillRR(-w / 2 + 8, -h / 2 + 12, w, h, 28, 'rgba(0,0,0,0.38)'); fillRR(-w / 2, -h / 2, w, h, 28, col); fillRR(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 22, shade(col, 0.12));
  tText(top, 0, -h / 2 + 36, 26, { color: 'rgba(255,255,255,0.9)', shadow: false, letter: 3, weight: 800 });
  fillRR(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18, 'rgba(10,8,30,0.30)');
  const bob = Math.sin(TT * 3 + x) * 4, ik = sp(t0 + 0.12, 280, 12);
  ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18); ctx.clip(); ctx.translate(0, -h / 2 + 150 + bob); ctx.scale(ik, ik); icon(); ctx.restore();
  tText(big, 0, h / 2 - 92, 44, { color: '#fff', maxW: w - 36 }); tText(sub, 0, h / 2 - 40, 26, { color: 'rgba(255,255,255,0.95)', shadow: false, weight: 800, maxW: w - 40 });
  ctx.restore();
}
const CARDS = (t0, y = 462) => { tText('WAS NIMMST DU?', 540, y - 262, 66, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14, maxW: 1000 });
  choiceCard(285, y, 'SOFORT', '50 MILLIONEN €', 'AUF DIE HAND', PAL.green, t0, () => { glow(0, 0, 200, '#a6f0b4', 0.3); briefcase(0, 60, 0.42, 1); });
  choiceCard(795, y, '1 JAHR LANG', '1 BITCOIN / TAG', '365 TAGE', PAL.orange, t0 + 0.06, () => { glow(0, 0, 200, '#ffd0a0', 0.35); btcCoin(-70, 0, 62, { spin: TT * 2, shadow: false }); calendarPage(95, 0, 0.3, 'TAGE', 365); });
  tText('VS', 540, y, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); };
// Kevin's penthouse in Dubai: the skyline behind a glass wall, a marble floor, a sofa
function setPenthouse(o = {}) {
  withBlur(o.blur, () => {
    ctx.save(); setDubai(); ctx.restore();
    if (o.night) { ctx.fillStyle = 'rgba(5,4,30,0.45)'; ctx.fillRect(-600, -400, 2300, 2800); }
    for (let i = 0; i < 6; i++) fillRR(-120 + i * 270, -400, 22, 1800, 6, 'rgba(230,236,255,0.55)');
    fillRR(-600, 1360, 2300, 26, 0, '#e8ecf8');
    ctx.fillStyle = lin(0, 1380, 0, 2000, [[0, o.night ? '#3a3a5a' : '#f2efe8'], [1, o.night ? '#22223a' : '#cfc8bb']]); ctx.fillRect(-600, 1386, 2300, 900);
    for (let i = 0; i < 9; i++) line(-600 + i * 300, 1386, -900 + i * 380, 2300, 3, 'rgba(0,0,0,0.06)');
    sofa(200, 1470, 0.9, '#f4f1ea'); plant(960, 1430, 0.8); glow(540, 1600, 600, '#ffe9b0', 0.12);
  });
}
// Jonas' small flat: a warm room, a bookshelf, a window
function setFlat(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1920, [[0, o.morning ? '#ffcf8a' : '#3a3f78'], [1, o.morning ? '#ff9d6b' : '#22265a']]); ctx.fillRect(-600, -400, 2300, 2800);
    windowFrame(760, 420, 360, 420, () => { ctx.fillStyle = lin(0, 300, 0, 900, o.morning ? [[0, '#ffd27a'], [1, '#ff8f6b']] : [[0, '#0b1030'], [1, '#2a2f78']]); ctx.fillRect(-600, -400, 2300, 2300); if (o.morning) { circ(940, 700, 80, '#fff3c0'); glow(940, 700, 200, '#fff3c0', 0.6); } else circ(940, 520, 50, '#fff3c0'); });
    bookshelf(60, 520, 300, 3, 0.9);
    ctx.fillStyle = lin(0, 1380, 0, 2000, [[0, '#8a5a3a'], [1, '#5a3a24']]); ctx.fillRect(-600, 1380, 2300, 900); fillRR(-600, 1370, 2300, 20, 0, '#6a4228');
    rugPattern(540, 1620, 520, 110, '#e8483c', '#ffcf6a');
  });
}
const onLaptop = (typed, state, o) => () => { ctx.translate(0, -198); ctx.scale(0.9, 0.9); loginScreen(typed, state, o); };

// =====================================================================  THE HOOK
// ---- 1 · "Einen Bitcoin pro…" — a giant Bitcoin slams in, spinning (a hard punch-in on frame one)
S(0.0, { tr: 'cut', lift: 0, cam: [[0, 540, 900, 2.0], [0.2, 540, 900, 1.0], [1.2, 540, 890, 1.08]],
  draw() { rays('#ff7a00', '#ffc23f', { cy: 900, spin: 0.5 }); glow(540, 900, 700, '#fff2b0', 0.5); twinkles('h1', 140, 300, 800, 1100, 14, { s: 30 });
    const k = sp(0.02, 240, 11); btcCoin(540, 900, 300 * k, { spin: (1 - EZ.o3(clamp(TT / 0.9))) * 9.4, glow: 0.5 }); impactLines(540, 900, 330, 620, 14, 0.05); },
  ui() { popText('1 BITCOIN', 540, 330, 0.51, 110, '#ffffff', -0.04, 0); },
  sfx: [[0.03, 'impact'], [0.08, 'coinBounce'], [0.51, 'pop', 1.1], [0.6, 'bling']] });
// ---- 2 · "…Tag, ein Jahr lang?" — 365 calendar pages flip past, a coin drops on each one
S(1.2, { tr: 'whipL', lift: 0, cam: [[1.2, 540, 980, 1.0], [2.3, 540, 960, 1.1]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); const day = Math.min(365, Math.floor(1 + Math.pow(clamp((TT - 1.25) / 0.95), 2) * 364));
    for (let i = 3; i >= 0; i--) { ctx.save(); ctx.translate(540 + i * 22, 980 - i * 14); ctx.rotate(i * 0.025); calendarPage(0, 0, 1.05, 'TAG', Math.max(1, day - i)); ctx.restore(); }
    const c = (TT * 3) % 1; btcCoin(840, 560 + c * 260, 70, { spin: TT * 10, shadow: false }); btcStack(230, 1420, 70, 2 + Math.floor(clamp((TT - 1.25) / 1) * 9)); },
  ui() { info('1 JAHR = 365 TAGE 📅', 1.73, { y: 360, bg: PAL.orange, size: 56 }); },
  sfx: [[1.25, 'flip'], [1.4, 'flip', 1.1], [1.55, 'flip', 1.2], [1.7, 'coinPour', 0.6], [1.95, 'flip', 1.3]] });
// ---- 3 · "Oder 50 Millionen…" — the cash mountain rises, the number slams (riser into the hit)
S(2.3, { tr: 'flash', tense: 1, cam: [[2.3, 540, 980, 1.0], [3.62, 540, 960, 1.1]], punch: [[2.73, 0.12]], shake: [[2.73, 14, 0.35]],
  draw() { rays('#0e8a45', '#2ee87a', { cy: 940, spin: 0.35 }); glow(540, 1000, 700, '#d8ffd0', 0.4); cashMountain(540, 1260, 1.2, clamp((TT - 2.32) / 0.5)); billRain('h3', 2.75, 30, { burst: [540, 820], spread: 1.6 }); },
  ui() { if (TT > 2.73) { const k = sp(2.73, 300, 11); ctx.save(); ctx.translate(540, 400); ctx.scale(k, k); tText('50.000.000 €', 0, 0, 118, { color: PAL.yellow, stroke: '#3a2400', strokeW: 22 }); ctx.restore(); } },
  sfx: [[2.32, 'whooshUp', 1], [2.75, 'cashCannon'], [3.12, 'coinPour'], [3.3, 'moneyRain', 0.8]] });
// ---- 4 · "…Euro sofort?" — the two at their buttons with both options (the cover)
S(3.62, { tr: 'zoomOut', lift: 110, cam: [[3.62, 540, 1020, 1.0], [4.55, 540, 1010, 1.04]],
  draw() { setStudio(); char('kevin', 300, FLOOR - 40, 0.8, kevinT({ look: [0.4, -0.4] })); char('jonas', 780, FLOOR - 40, 0.8, jonasT({ look: [-0.3, -0.3] })); studioPodiums(); },
  ui() { CARDS(3.64); },
  sfx: [[3.64, 'pop', 1], [3.7, 'pop', 1.2], [4.07, 'popHi', 1]] });

// =====================================================================  THE CHOICE
// ---- 5 · "Kevin überlegt keine Sekunde:" — he slams the green button before the question is over
S(4.55, { tr: 'cut', lift: 90, cam: [[4.55, 300, 1140, 1.4], [6.3, 310, 1090, 1.55]], shake: [[5.05, 20, 0.4]],
  draw() { setStudio({ blur: 3 }); char('jonas', 780, FLOOR - 40, 0.8, jonasT({ emo: [[0, 'confused']], look: [-0.6, 0.2] }));
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[4.55, 'raiseR'], [4.95, 'slamR', 0.08], [5.4, 'cheer', 0.2]], emo: [[4.55, 'grin'], [5.4, 'laugh']], look: [0.4, 0.5] });
    studioPodiums({ pressL: TT > 5.05 ? 1 : 0, litL: TT > 5.05 ? 0.9 : 0 }); impactLines(300, 1250, 120, 380, 12, 5.05); cash('k5', 5.1, 24); },
  ui() { info('KEINE SEKUNDE! ⏱️', 5.72, { y: 380, bg: PAL.green, size: 56 }); },
  sfx: [[4.95, 'whoosh', 1.3], [5.05, 'slam'], [5.08, 'buzzerWin'], [5.2, 'cashCannon']] });
// ---- 6 · "Die 50 Millionen!" — Kevin hugs the open briefcase, bills everywhere
S(6.3, { tr: 'whipR', cam: CLOSE(6.3, 7.55),
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'holdBoth']], emo: [[0, 'laugh']], holdR: () => briefcase(-70, 10, 0.3, 1) }); cash('k6', 6.35, 20); },
  ui() { popText('50 MILLIONEN! 🤑', 540, 380, 6.51, 82, PAL.yellow, -0.04, 0); },
  sfx: [[6.35, 'moneyRain'], [6.89, 'cashReg']] });
// ---- 7 · "Viel Spaß mit deinem Fantasiegeld," — Kevin points across and laughs, a toy banknote flutters
function toyNote(x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); fillRR(-170, -85, 340, 170, 16, '#ffb3d9'); fillRR(-155, -70, 310, 140, 10, '#ffd6ec'); circ(0, 6, 46, '#ff8fc0'); tText('₿?', 0, 10, 46, { color: '#fff', shadow: false }); tText('SPIELGELD', 0, -50, 24, { color: '#c92d7d', shadow: false }); tText('🤡', 120, 45, 40, { shadow: false }); ctx.restore(); }
S(7.55, { tr: 'zoomIn', cam: CLOSE(7.55, 9.2),
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[7.55, 'pointR'], [8.4, 'laughBelly', 0.2]], emo: [[7.55, 'smug'], [8.4, 'laugh']], look: [0.6, 0], lean: [[0, 0], [8.4, -0.08]] });
    if (TT > 8.53) toyNote(800, 720 + Math.sin(TT * 3) * 20, 0.75 * sp(8.53, 260, 12), -0.2 + Math.sin(TT * 2) * 0.1); },
  ui() { popText('FANTASIEGELD? 😂', 540, 380, 8.53, 78, '#ff8fc0', -0.04, 0); },
  sfx: [[7.6, 'swish', 1], [8.4, 'boing'], [8.6, 'rustle']] });
// ---- 8 · "…Jonas! Und Jonas jubelt:" — Jonas doesn't care: he throws both arms up
S(9.2, { tr: 'whipL', cam: [[9.2, 540, 1000, 1.65], [10.9, 540, 980, 1.8]],
  draw() { setStudio({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, jonasT({ pose: [[9.2, 'idle'], [9.9, 'armsUp', 0.18]], emo: [[9.2, 'smug'], [9.9, 'laugh']], jump: [[0, 0], [9.9, 0], [10.05, 50, 0.12], [10.25, 0, 0.12], [10.4, 40, 0.12], [10.6, 0, 0.12]] })); confetti('c8', 10.0, 50); },
  ui() { popText('JONAS JUBELT! 🎉', 540, 380, 10.4, 76, PAL.orange, -0.04, 0); },
  sfx: [[9.9, 'whooshUp', 1], [10.0, 'applause', 0.8], [10.4, 'sparkle']] });
// ---- 9 · "Danke!" — a bow towards Kevin, a big smile
S(10.9, { tr: 'cut', cam: [[10.9, 540, 1000, 1.8], [11.52, 540, 990, 1.9]], punch: [[10.94, 0.08]],
  draw() { setStudio({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, jonasT({ pose: [[0, 'offerR']], emo: [[0, 'grin']], lean: [[0, 0], [11.0, 0.2, 0.15], [11.3, 0, 0.2]] })); twinkles('d9', 200, 500, 680, 500, 8, { s: 26 }); },
  ui() { popText('DANKE! 😁', 540, 380, 10.94, 100, PAL.yellow, -0.04, 0); },
  sfx: [[10.94, 'ting']] });

// =====================================================================  JONAS' BET
// ---- 10 · "Ein Bitcoin ist gerade…" — Jonas shows the live price on his phone
S(11.52, { tr: 'whipR', cam: CLOSE(11.52, 12.65),
  draw() { setFlat({ blur: 9 }); char('jonas', 400, FLOOR + 170, 1.05, jonasT({ pose: [[0, 'phoneR']], emo: [[0, 'grin']], look: [0.6, -0.2], holdR: () => phone(0, -30, 0.3, 0.15, () => walletScreen(1, '67.000 €')) })); },
  ui() { const k = sp(11.75, 240, 13); ctx.save(); ctx.translate(790, 920); ctx.rotate(0.06); ctx.scale(k * 1.9, k * 1.9); phone(0, 0, 1, 0, () => walletScreen(1, '67.000 €', '#2ee87a', { spark: (u) => 0.4 + Math.sin(u * 9) * 0.15 + u * 0.3 })); ctx.restore(); },
  sfx: [[11.6, 'phoneTap'], [11.75, 'whoosh', 1.3], [12.06, 'notify']] });
// ---- 11 · "…67.000 Euro wert." — the price board slams in, 100s flutter down
S(12.65, { tr: 'zoomIn', cam: [[12.65, 540, 960, 1.0], [14.45, 540, 950, 1.1]], punch: [[12.7, 0.1]],
  draw() { rays('#ff7a00', '#ffb03f', { cy: 900, spin: 0.25 }); glow(540, 950, 600, '#fff2b0', 0.35); cash('p11', 12.75, 26, { spread: 1.8 });
    const k = sp(12.66, 240, 12); ctx.save(); ctx.translate(540, 950); ctx.scale(k, k); priceBoard(0, 0, 1.15, rollNum(10000, 67000, 12.7, 13.6)); ctx.restore(); },
  ui() { info('1 BITCOIN = 67.000 € 💶', 13.88, { y: 380, bg: '#141026', size: 52 }); },
  sfx: [[12.7, 'cashReg'], [12.75, 'coinTicks', 0.9, 8], [13.88, 'moneyRain', 0.8]] });
// ---- 12 · "Und wenn er steigt, noch viel mehr!" — the line climbs, a rocket takes off
const UP12 = [[0, 67000], [0.2, 72000], [0.35, 69000], [0.6, 95000], [0.8, 120000], [1, 160000]];
S(14.45, { tr: 'whipR', cam: [[14.45, 540, 960, 1.0], [16.3, 540, 940, 1.1]],
  draw() { setDark('#16204a', '#05030c'); priceChart(140, 640, 800, 640, UP12, clamp((TT - 14.5) / 1.5), { vmin: 40000, vmax: 180000 });
    if (TT > 15.2) { const u = clamp((TT - 15.2) / 1.0); rocket(820, 1500 - EZ.i3(u) * 1300, 0.6, 0.15); } },
  ui() { popText('NOCH VIEL MEHR! 🚀', 540, 380, 15.96, 76, '#2ee87a', -0.04, 0); },
  sfx: [[14.5, 'grow'], [15.2, 'rocket', 1.2], [15.96, 'pop', 1]] });
// ---- 13 · "Und wenn er fällt," — Kevin wags his finger, a grin
S(16.3, { tr: 'cut', cam: CLOSE(16.3, 17.2),
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'pointUpR']], emo: [[0, 'smug']], tilt: [[0, 0], [16.6, -0.08], [16.9, 0.06]] }); },
  ui() { popText('UND WENN ER FÄLLT? 📉', 540, 380, 16.92, 64, '#ff4545', -0.04, 0); },
  sfx: [[16.4, 'swish', 1.2], [16.92, 'pop', 1]] });
// ---- 14 · "…hast du fast nichts." — the coin cracks and drops, the wallet reads 0 €
S(17.2, { tr: 'glitch', cam: [[17.2, 540, 960, 1.0], [18.35, 540, 960, 1.08]],
  draw() { setDark('#3a0a12', '#05030c'); const u = clamp((TT - 17.6) / 0.6); btcCoin(540, 900 + EZ.i3(u) * 300, 220, { grey: u * 0.8, crack: clamp((TT - 17.5) / 0.1), spin: 0 });
    if (TT > 17.95) { const k = sp(17.98, 260, 12); ctx.save(); ctx.translate(540, 600); ctx.scale(k, k); tText('0 €', 0, 0, 180, { color: '#ff3b4a', stroke: '#2a0008', strokeW: 24 }); ctx.restore(); } },
  ui() { info('FAST NICHTS! 😬', 17.73, { y: 360, bg: PAL.red, size: 58 }); },
  sfx: [[17.5, 'crunch'], [17.6, 'descend'], [17.98, 'thud']] });

// =====================================================================  THE BET
// ---- 15 · "Wer am Ende weniger hat," — the two face to face, Kevin points at Jonas
S(18.35, { tr: 'zoomIn', lift: 200, tense: 1, cam: [[18.35, 540, 1150, 1.05], [19.55, 540, 1130, 1.15]],
  draw() { setStudio({ blur: 4 }); char('kevin', 320, FLOOR + 40, 0.9, { pose: [[0, 'pointR']], emo: [[0, 'smug']], look: [0.7, 0] }); char('jonas', 760, FLOOR + 40, 0.9, jonasT({ pose: [[0, 'hips']], emo: [[0, 'grin']], look: [-0.7, 0] })); },
  ui() { info('WER WENIGER HAT… 😏', 18.92, { y: 380, bg: '#141026', size: 56 }); },
  sfx: [[18.4, 'heartbeat', 1.0], [18.92, 'pop', 1]] });
// ---- 16 · "…rasiert sich eine Glatze!" — the clipper buzzes, hair falls, a shiny bald head
S(19.55, { tr: 'whipL', cam: [[19.55, 540, 960, 1.0], [20.74, 540, 950, 1.1]], punch: [[20.34, 0.1]],
  draw() { rays('#2a8aff', '#7ac8ff', { cy: 900, spin: 0.3 }); const R = RNG('hair');
    for (let i = 0; i < 26; i++) { const t0 = 19.6 + R.f() * 0.6, u = TT - t0, hx = 200 + R.f() * 680, hy = 600 + R.n(40), rr = R.n(2); if (u < 0) continue; ctx.save(); ctx.translate(hx, hy + u * 700); ctx.rotate(rr + u * 3); line(-18, 0, 18, 0, 8, '#8d5426'); ctx.restore(); }
    const k = sp(19.6, 240, 12); clipper(360, 980, 0.95 * k, -0.4 + Math.sin(TT * 7) * 0.1, 1);
    if (TT > 20.3) { const k2 = sp(20.34, 240, 11); baldHead(740, 940, 1.15 * k2); } },
  ui() { popText('GLATZE! 💈', 540, 380, 20.34, 104, '#ffffff', -0.04, 0); },
  sfx: [[19.58, 'rotor', 0.8], [19.6, 'printer', 0.7], [20.34, 'ting'], [20.4, 'sparkle']] });
// ---- 17 · "Abgemacht!" — the handshake slams
S(20.74, { tr: 'cut', lift: 200, cam: [[20.74, 540, 1150, 1.1], [21.5, 540, 1130, 1.18]], punch: [[20.78, 0.12]], shake: [[20.78, 12, 0.3]],
  draw() { const sh = TT > 20.78 ? Math.sin(TT * 30) * 0.05 * clamp(1 - (TT - 20.78) / 0.6) : 0; setStudio({ blur: 4 });
    char('kevin', 320, FLOOR + 40, 0.9, { pose: [[0, { la: [0.16, -0.12], ra: [0.85 + sh, -0.2] }]], emo: [[0, 'grin']], look: [0.7, 0] });
    char('jonas', 760, FLOOR + 40, 0.9, jonasT({ pose: [[0, { la: [0.85 - sh, -0.2], ra: [0.16, -0.12] }]], emo: [[0, 'grin']], look: [-0.7, 0] })); impactLines(540, 1200, 80, 260, 10, 20.78); },
  ui() { info('ABGEMACHT! 🤝', 20.78, { y: 380, bg: PAL.red, size: 66 }); },
  sfx: [[20.76, 'pat'], [20.78, 'impact']] });

// =====================================================================  KEVIN SPENDS
// ---- 18 · "Also kauft sich Kevin als Erstes…" — Kevin taps KAUFEN on his phone, in front of Dubai
S(21.5, { tr: 'zoomOut', cam: CLOSE(21.5, 23.2),
  draw() { setPenthouse({ blur: 10 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'phoneR']], emo: [[0, 'happy'], [22.8, 'grin']], look: [0.3, -0.2], extras: { shades: 1 },
    holdR: () => phone(0, -30, 0.3, 0.15, () => { ctx.fillStyle = '#0e1a2e'; ctx.fillRect(-84, -176, 168, 352); fillRR(-70, 100, 140, 50, 12, TT > 22.87 ? '#2ee87a' : '#26a24c'); tText('KAUFEN', 0, 126, 22, { color: '#fff', shadow: false }); }) }); },
  ui() { info('ALS ERSTES… 🏙️', 22.87, { y: 380, bg: PAL.blue, size: 56 }); },
  sfx: [[21.55, 'swish', 0.9], [22.87, 'phoneTap'], [22.9, 'ding']] });
// ---- 19 · "…ein Penthouse in Dubai…" — the tower rises out of the skyline, the penthouse lights up
S(23.2, { tr: 'whipR', lift: 0, cam: [[23.2, 540, 1080, 0.95], [24.55, 540, 1000, 1.05]],
  draw() { setDubai(); const k = sp(23.25, 160, 14); penthouseTower(540, 2050 + (1 - k) * 900, 1.15, clamp((TT - 23.45) / 0.3)); fireworks('f19', 24.03, 5); },
  ui() { info('PENTHOUSE IN DUBAI 🇦🇪', 24.03, { y: 340, bg: '#141026', size: 50 }); },
  sfx: [[23.25, 'whooshUp', 0.8], [23.45, 'powerOn'], [24.03, 'pop', 1], [24.1, 'sparkle']] });
// ---- 20 · "…für drei Millionen." — Kevin jumps for joy in his penthouse, the price tag swings in, bills fly
S(24.55, { tr: 'cut', lift: 120, cam: [[24.55, 540, 1100, 1.0], [25.45, 540, 1080, 1.07]],
  draw() { setPenthouse({ blur: 4 }); char('kevin', 540, FLOOR + 20, 0.85, { pose: [[0, 'cheer']], emo: [[0, 'laugh']], extras: { shades: 1 }, jump: [[0, 0], [24.75, 40, 0.12], [24.95, 0, 0.12]] }); cash('k20', 24.8, 20); },
  ui() { priceTag(560, 560, sp(24.62, 280, 12), '3 MIO. €', -0.08); },
  sfx: [[24.62, 'cashReg'], [24.8, 'moneyRain', 0.7]] });

// =====================================================================  JONAS, EVERY MORNING
// ---- 21 · "Und Jonas?" — the alarm rings at sunrise, Jonas stretches
S(25.45, { tr: 'iris', lift: 120, cam: [[25.45, 540, 1100, 1.0], [26.75, 540, 1080, 1.07]],
  draw() { setFlat({ morning: 1 }); alarmClock(250, 1430, 0.45, { ring: TT < 26.3 ? 1 : 0 }); char('jonas', 690, FLOOR + 20, 0.85, jonasT({ pose: [[25.45, 'idle'], [25.7, 'armsUp', 0.3]], emo: [[25.45, 'sleepy'], [26.1, 'happy', 0.3]] })); },
  ui() { popText('UND JONAS? ☀️', 540, 380, 25.68, 80, PAL.orange, -0.04, 0); },
  sfx: [[25.5, 'alarmRing', 0.8], [25.68, 'pop', 1], [26.1, 'birds', 0.8]] });
// ---- 22 · "Bekommt jeden Morgen seinen Bitcoin aufs Handy." — the lock screen: +1 BTC, day after day
S(26.75, { tr: 'zoomIn', cam: [[26.75, 540, 960, 1.0], [28.22, 540, 950, 1.06]],
  draw() { setFlat({ morning: 1, blur: 10 }); const k = sp(26.78, 240, 13); ctx.save(); ctx.translate(540, 1000); ctx.scale(k * 2.4, k * 2.4);
    phone(0, 0, 1, 0, () => { ctx.fillStyle = lin(0, -176, 0, 176, [[0, '#ff9d6b'], [1, '#6a3fd0']]); ctx.fillRect(-84, -176, 168, 352); tText('07:00', 0, -120, 40, { color: '#fff', shadow: false }); tText('GUTEN MORGEN', 0, -88, 12, { color: '#fff', shadow: false, letter: 2 }); }); ctx.restore(); },
  ui() { const days = [[26.9, 1], [27.15, 2], [27.4, 3], [27.65, 4], [27.9, 5]], n = days.filter(([u]) => TT >= u).length; days.forEach(([t, d], i) => { if (TT >= t) notifCard(540, 800 + (n - 1 - i) * 110, 560, t, 'TAG ' + d + ' · 7:00', '+1 BTC eingegangen ✅'); });
    info('JEDEN MORGEN +1 ₿', 26.77, { y: 380, bg: PAL.orange, size: 52 }); },
  sfx: [[26.9, 'notify'], [27.15, 'notify'], [27.4, 'notify'], [27.65, 'notify'], [27.9, 'notify']] });

// =====================================================================  THE MISTAKE (teased)
// ---- 23 · "Doch Kevin macht bald einen Fehler," — Kevin lounging carelessly, the warning sign slams
S(28.22, { tr: 'whipL', tense: 1, cam: [[28.22, 540, 1040, 1.25], [30.0, 540, 1020, 1.4]],
  draw() { setPenthouse({ blur: 6 }); char('kevin', 540, FLOOR + 60, 0.9, { pose: [[0, 'hips']], emo: [[0, 'smug']], extras: { shades: 1 } });
    if (TT > 29.66) { const k = sp(29.66, 300, 11); warnSign(830, 820, 0.55 * k, 0.1); } },
  ui() { info('⚠️ FEHLER!', 29.66, { y: 380, bg: PAL.red, size: 62 }); },
  sfx: [[28.3, 'swish', 0.8], [29.66, 'errorBuzz'], [29.7, 'impact']] });
// ---- 24 · "…der ihn richtig ärgern wird." — a flash-forward: Kevin, furious, a red tint
S(30.0, { tr: 'glitch', cam: CLOSE(30.0, 31.52), shake: [[30.85, 14, 0.5]],
  draw() { setPenthouse({ blur: 12, night: 1 }); ctx.fillStyle = 'rgba(200,20,30,0.28)'; ctx.fillRect(-600, -400, 2300, 2800);
    char('kevin', 540, FLOOR + 170, 1.05, { pose: [[30.0, 'idle'], [30.8, 'headGrab', 0.15]], emo: [[0, 'angry']], extras: { sweat: 1 } }); },
  ui() { popText('GRRR! 😡', 540, 380, 30.85, 96, '#ff4545', -0.06, 0); },
  sfx: [[30.05, 'recordScratch'], [30.85, 'grunt'], [30.9, 'punch']] });

// =====================================================================  THE CRASH
// ---- 25 · "Nach 100 Tagen…" — the pages race to TAG 100
S(31.52, { tr: 'iris', cam: [[31.52, 540, 960, 1.0], [32.75, 540, 940, 1.1]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); const n = Math.min(100, Math.round(rollNum(1, 100, 31.55, 32.3))); for (let i = 2; i >= 0; i--) { ctx.save(); ctx.translate(540 + i * 26, 980 - i * 16); ctx.rotate(i * 0.03); calendarPage(0, 0, 1.2, 'TAG', Math.max(1, n - i)); ctx.restore(); } },
  ui() { info('NACH 100 TAGEN', 31.83, { y: 360, bg: '#141026', size: 58 }); },
  sfx: [[31.55, 'clockSpin', 0.8], [32.34, 'flip']] });
// ---- 26 · "…stürzt Bitcoin ab." — the line dives, red alarm light, the coin plunges
const DOWN26 = [[0, 67000], [0.3, 70000], [0.45, 61000], [0.65, 64000], [1, 30000]];
S(32.75, { tr: 'flash', cam: [[32.75, 540, 960, 1.0], [33.95, 540, 960, 1.08]], shake: [[32.85, 18, 0.8]],
  draw() { setDark('#4a0810', '#05030c'); if (Math.floor(TT * 4) % 2) { ctx.fillStyle = 'rgba(255,30,40,0.18)'; ctx.fillRect(-600, -400, 2300, 2800); }
    priceChart(140, 640, 800, 640, DOWN26, clamp((TT - 32.8) / 0.9), { vmin: 20000, vmax: 80000 });
    const u = clamp((TT - 32.9) / 0.9); btcCoin(820, 500 + EZ.i3(u) * 1200, 80, { spin: TT * 8, shadow: false, crack: u }); },
  ui() { popText('ABSTURZ! 📉', 540, 380, 32.83, 100, '#ff4545', -0.05, 0); },
  sfx: [[32.83, 'siren', 1.1], [32.9, 'descend'], [33.62, 'thud']] });
// ---- 27 · "Nur noch 30.000 Euro." — the price board drops, the numbers roll down in red
S(33.95, { tr: 'cut', cam: [[33.95, 540, 960, 1.05], [35.62, 540, 950, 1.12]], punch: [[34.38, 0.08]],
  draw() { setDark('#3a0a12', '#05030c'); ctx.save(); ctx.globalAlpha = 0.6; cash('p27', 34.4, 14, { spread: 1.0 }); ctx.restore(); priceBoard(540, 950, 1.15, rollNum(67000, 30000, 34.0, 34.6), '#ff3b4a', { delta: ['-55 %', 34.6] }); },
  ui() { info('NUR NOCH 30.000 € 😱', 34.38, { y: 380, bg: PAL.red, size: 52 }); },
  sfx: [[34.0, 'coinTicks', 0.6, 10], [34.38, 'errorBuzz'], [34.6, 'pop', 0.8]] });
// ---- 28 · "Jonas' 100 Bitcoins…" — Jonas' towers of coins grow
S(35.62, { tr: 'zoomIn', cam: [[35.62, 540, 980, 1.0], [37.1, 540, 960, 1.08]],
  draw() { rays('#ff7a00', '#ffb03f', { cy: 900, spin: 0.2 }); const n = Math.round(rollNum(1, 10, 35.65, 36.5)); for (let i = 0; i < 3; i++) btcStack(300 + i * 240, 1300, 95, Math.max(1, n - (2 - i) * 2)); },
  ui() { info('JONAS: 100 ₿', 36.09, { y: 380, bg: PAL.orange, size: 62 }); },
  sfx: [[35.65, 'coinPour', 0.9], [36.09, 'pop', 1], [36.5, 'coin']] });
// ---- 29 · "…sind plötzlich nur noch 3 Millionen wert." — the wallet value drops; Jonas swallows
S(37.1, { tr: 'whipR', cam: CLOSE(37.1, 39.1),
  draw() { setFlat({ blur: 9 }); char('jonas', 400, FLOOR + 170, 1.05, jonasT({ pose: [[0, 'phoneR']], emo: [[0, 'neutral'], [38.1, 'scared', 0.2]], look: [0.6, -0.2], extras: { sweat: 1 } })); },
  ui() { const k = sp(37.15, 240, 13); ctx.save(); ctx.translate(790, 920); ctx.rotate(0.05); ctx.scale(k * 1.9, k * 1.9); phone(0, 0, 1, 0, () => walletScreen(100, rollNum(6700000, 3000000, 37.4, 38.3), '#ff3b4a')); ctx.restore(); popText('NUR 3 MIO.! 😰', 540, 380, 38.0, 76, '#ff4545', -0.04, 0); },
  sfx: [[37.15, 'whoosh', 1.2], [37.4, 'descend'], [38.0, 'gulp'], [38.3, 'errorBuzz']] });

// =====================================================================  THE CALL
// ---- 30 · "Kevin ruft sofort an." — Kevin on his sofa, dialling, grinning
S(39.1, { tr: 'whipR', cam: CLOSE(39.1, 40.45),
  draw() { setPenthouse({ blur: 10 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[39.1, 'idle'], [39.4, 'phoneR', 0.2]], emo: [[0, 'smug']], extras: { shades: 1 }, holdR: () => phone(0, -30, 0.3, 0.15, () => { ctx.fillStyle = '#123'; ctx.fillRect(-84, -176, 168, 352); tText('JONAS', 0, -80, 22, { color: '#fff', shadow: false }); circ(0, 110, 30, '#2ee87a'); }) }); },
  ui() { info('📞 ANRUF…', 39.56, { y: 380, bg: PAL.green, size: 58 }); },
  sfx: [[39.4, 'phoneTap'], [39.5, 'beep'], [39.8, 'buzzPhone', 0.6]] });
// ---- 31 · "Na, schon pleite?" — split screen call: Kevin laughing (top), Jonas listening (bottom)
const YD = 900;
function splitEven(top, bottom) {
  ctx.save(); ctx.beginPath(); ctx.rect(-300, -400, 1700, YD + 400); ctx.clip(); top(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-300, YD, 1700, 1500); ctx.clip(); bottom(); ctx.restore(); line(-300, YD, 1400, YD, 14, '#ffffff');
}
S(40.45, { tr: 'slide', capY: YD, cam: [[40.45, 540, 960, 1.0], [41.72, 540, 960, 1.03]],
  draw() { splitEven(() => { setPenthouse({ blur: 6 }); char('kevin', 540, 1230, 1.05, { pose: [[0, 'phoneR']], emo: [[0, 'smug'], [41.2, 'laugh']], extras: { shades: 1 }, holdR: () => phone(0, -30, 0.3, 0.15) }); },
    () => { ctx.save(); ctx.translate(0, 650); setFlat({ blur: 6 }); ctx.restore(); char('jonas', 540, 2060, 1.05, jonasT({ pose: [[0, 'phoneR']], emo: [[0, 'calm']], look: [0, -0.5], holdR: () => phone(0, -30, 0.3, 0.15) })); }); },
  ui() { popText('SCHON PLEITE? 😂', 540, 210, 41.21, 66, '#ff8fc0', -0.04, 0); },
  sfx: [[40.5, 'ding'], [41.21, 'pop', 1]] });
// ---- 32 · "Pleite?" — Jonas laughs it off
S(41.72, { tr: 'cut', cam: CLOSE(41.72, 42.48), punch: [[41.78, 0.08]],
  draw() { setFlat({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, jonasT({ pose: [[0, 'phoneR']], emo: [[0, 'laugh']], holdR: () => phone(0, -30, 0.3, 0.15) })); },
  ui() { popText('PLEITE? 😄', 540, 380, 41.78, 96, PAL.yellow, -0.04, 0); },
  sfx: [[41.78, 'boing']] });
// ---- 33 · "Ich verkaufe nicht." — arms crossed, diamond hands
S(42.48, { tr: 'zoomIn', cam: CLOSE(42.48, 43.45),
  draw() { setFlat({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, jonasT({ pose: [[0, 'armsCross']], emo: [[0, 'smug']], tilt: [[0, 0], [42.9, 0.08]] }));
    for (let i = 0; i < 2; i++) { const k = sp(42.7 + i * 0.12, 280, 12); ctx.save(); ctx.translate(i ? 830 : 250, 760); ctx.scale(k, k); diamond(0, 0, 70); ctx.restore(); } },
  ui() { info('ICH VERKAUFE NICHT! 💎🙌', 42.7, { y: 380, bg: '#141026', size: 48 }); },
  sfx: [[42.7, 'bling'], [43.2, 'stamp']] });
// ---- 34 · "Ich warte!" — the hourglass turns, Jonas relaxes with sunglasses
S(43.45, { tr: 'whipL', lift: 120, cam: [[43.45, 540, 1100, 1.0], [44.22, 540, 1080, 1.06]],
  draw() { setFlat({ morning: 1, blur: 4 }); lounger(560, 1500, 1.2); char('jonas', 480, FLOOR - 20, 0.8, jonasT({ pose: [[0, 'hips']], emo: [[0, 'calm']], extras: { shades: 1, glasses: false } }));
    const k = sp(43.5, 260, 12); hourglass(840, 1000, 0.6 * k, clamp((TT - 43.5) / 0.7), (1 - k) * 3); },
  ui() { popText('ICH WARTE! ⏳', 540, 380, 43.72, 90, '#ffffff', -0.04, 0); },
  sfx: [[43.5, 'swish'], [43.72, 'tick'], [43.95, 'tick']] });

// =====================================================================  KEVIN'S MISTAKE
// ---- 35 · "Und Kevins Fehler?" — a slow push on Kevin, a question mark
S(44.22, { tr: 'zoomIn', tense: 1, cam: [[44.22, 540, 1000, 1.6], [45.25, 540, 980, 1.85]],
  draw() { setPenthouse({ blur: 12, night: 1 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'thinkR']], emo: [[0, 'confused']] }); if (TT > 44.81) qMark(820, 760, 0.7 * sp(44.81, 280, 12)); },
  ui() { info('KEVINS FEHLER? 🤔', 44.81, { y: 380, bg: PAL.red, size: 56 }); },
  sfx: [[44.3, 'tension', 0.9], [44.81, 'pop', 1]] });
// ---- 36 · "Heimlich kauft er…" — at night, Kevin tiptoes to his laptop, glancing around
S(45.25, { tr: 'slide', lift: 120, cam: [[45.25, 540, 1100, 1.0], [46.2, 600, 1090, 1.08]],
  draw() { setPenthouse({ night: 1 }); fillRR(700, FLOOR - 230, 330, 30, 8, '#3a2a5a'); fillRR(720, FLOOR - 200, 24, 220, 6, '#24183c'); fillRR(986, FLOOR - 200, 24, 220, 6, '#24183c');
    laptopOpen(865, FLOOR - 232, 0.4, 1, onLaptop('', '')); glow(865, FLOOR - 320, 220, '#52b8ff', 0.3);
    const x = lerp(250, 560, EZ.io(clamp((TT - 45.3) / 0.8))); char('kevin', x, FLOOR + 20, 0.85, { walk: [[0, 0.7], [46.05, 0, 0.2]], pose: [[0, 'holdBoth']], emo: [[0, 'smug']], look: [Math.sin(TT * 6) * 0.8, 0], lean: 0.1 }); },
  ui() { info('HEIMLICH… 🤫', 45.29, { y: 380, bg: '#141026', size: 58 }); },
  sfx: [[45.3, 'footsteps', 0.8]] });
// ---- 37 · "…5 Bitcoins zum Schnäppchenpreis." — five coins bounce in, the bargain tag
S(46.2, { tr: 'whipR', cam: [[46.2, 540, 960, 1.0], [48.0, 540, 950, 1.08]],
  draw() { rays('#e8483c', '#ff8a5a', { cy: 900, spin: 0.25 }); cash('s37', 47.2, 16);
    for (let i = 0; i < 5; i++) { const t0 = 46.3 + i * 0.12; if (TT < t0) continue; const y = bounceY(TT - t0, 300, 960); btcCoin(220 + i * 160, y, 78, { spin: TT * 6 + i }); }
    const k = sp(47.19, 260, 11); ctx.save(); ctx.translate(540, 1270); ctx.rotate(-0.06); ctx.scale(k, k); fillRR(-260, -90, 520, 180, 30, '#ffd23f'); tText('SCHNÄPPCHEN!', 0, -20, 58, { color: '#c4161c', shadow: false }); tText('5 × 30.000 €', 0, 45, 40, { color: '#1b1530', shadow: false }); ctx.restore(); },
  ui() { info('5 BITCOINS 🛒', 46.24, { y: 380, bg: PAL.orange, size: 60 }); },
  sfx: [[46.3, 'coin'], [46.42, 'coin', 1.1], [46.54, 'coin', 1.2], [46.66, 'coin', 1.3], [46.78, 'coin', 1.4], [47.19, 'cashReg']] });
// ---- 38 · "Auf einen USB-Stick." — the coins shrink and fly into the stick, its LED blinks
S(48.0, { tr: 'zoomIn', cam: [[48.0, 540, 960, 1.0], [49.4, 540, 950, 1.1]],
  draw() { setDark('#1e2a5a', '#05030c'); const k = sp(48.05, 240, 13); usbStick(540, 1100, 1.25 * k, 0.12, { led: TT > 48.9, glow: TT > 48.4 && TT < 49.2 ? 0.6 : 0 });
    for (let i = 0; i < 5; i++) { const t0 = 48.3 + i * 0.12, u = clamp((TT - t0) / 0.45); if (TT < t0 || u >= 1) continue; const a = i / 5 * TAU; btcCoin(lerp(540 + Math.cos(a) * 380, 560, EZ.i3(u)), lerp(700 + Math.sin(a) * 200, 810, EZ.i3(u)), 70 * (1 - u * 0.8), { spin: TT * 8, shadow: false }); } },
  ui() { info('AUF EINEN USB-STICK 💾', 48.6, { y: 380, bg: '#141026', size: 52 }); },
  sfx: [[48.05, 'whooshDown'], [48.3, 'bubble'], [48.55, 'bubble'], [48.9, 'beep'], [49.05, 'beep', 1.2]] });
// ---- 39 · "Und vergisst das Passwort." — Kevin stares at the empty password field, scratching his head
S(49.4, { tr: 'cut', lift: 0, cam: [[49.4, 540, 1000, 1.0], [50.95, 540, 990, 1.06]],
  draw() { setPenthouse({ blur: 8, night: 1 }); laptopOpen(700, 1250, 0.95, 1, onLaptop('', ''));
    char('kevin', 210, 1760, 0.85, { pose: [[0, 'thinkR']], emo: [[0, 'neutral'], [49.84, 'confused']], look: [0.6, -0.1] });
    if (TT > 49.9) for (let i = 0; i < 3; i++) qMark(440 + i * 200, 560 - (i % 2) * 60 + Math.sin(TT * 4 + i) * 12, 0.45 * sp(49.9 + i * 0.12, 300, 12)); },
  ui() { info('PASSWORT VERGESSEN 🤯', 50.45, { y: 340, bg: PAL.red, size: 50 }); },
  sfx: [[49.5, 'typing', 0.5], [49.9, 'popHi', 1], [50.02, 'popHi', 1.15], [50.14, 'popHi', 1.3], [50.45, 'errorBuzz']] });
// ---- 40 · "Nein, nein, NEIN!" — Kevin grabs his head, screaming, the screen shakes
S(50.95, { tr: 'flash', cam: CLOSE(50.95, 51.98), shake: [[51.59, 22, 0.45]], punch: [[51.59, 0.12]],
  draw() { setPenthouse({ blur: 12, night: 1 }); ctx.fillStyle = 'rgba(200,20,30,0.22)'; ctx.fillRect(-600, -400, 2300, 2800);
    char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'headGrab']], emo: [[0, 'scared'], [51.59, 'shock']], extras: { sweat: 1 }, squash: [[0, 0], [51.6, -0.35, 0.08], [51.8, 0, 0.15]] }); },
  ui() { popText('NEIN, NEIN, NEIN!', 540, 380, 51.0, 80, '#ff4545', -0.04, 0); },
  sfx: [[51.0, 'gasp'], [51.59, 'shockHit']] });
// ---- 41-43 · "Kevin123?" "Lambo2027?" "Passwort?!" — each try typed, each one FALSCH, then locked
function tryShot(t0, t1, word, tWrong, state = 'wrong') {
  S(t0, { tr: state === 'locked' ? 'zoomIn' : 'cut', cam: [[t0, 540, 960, 1.0], [t1, 540, 960, 1.08]], shake: [[tWrong, 14, 0.35]],
    draw() { setPenthouse({ blur: 12, night: 1 }); if (TT > tWrong) { ctx.fillStyle = 'rgba(255,30,40,0.18)'; ctx.fillRect(-600, -400, 2300, 2800); }
      const n = Math.min(word.length, Math.floor((TT - t0 - 0.05) / 0.07)); laptopOpen(540, 1180, 1.4, 1, onLaptop(word.slice(0, Math.max(0, n)), TT > tWrong ? state : '', { t0: tWrong }));
      if (TT > tWrong) impactLines(540, 900, 380, 640, 12, tWrong); },
    ui() { info(state === 'locked' ? 'GESPERRT! 🔒' : 'FALSCH! ❌', tWrong, { y: 380, bg: PAL.red, size: 60 }); },
    sfx: [[t0 + 0.05, 'typing', Math.min(0.6, word.length * 0.07)], [tWrong, state === 'locked' ? 'doorSlam' : 'declined']] });
}
tryShot(51.98, 53.2, 'Kevin123', 52.85);
tryShot(53.2, 54.77, 'Lambo2027', 54.35);
tryShot(54.77, 55.57, 'Passwort', 55.25, 'locked');

// =====================================================================  1 IN 5 BITCOINS LOST
// ---- 44 · "Damit ist er nicht allein:" — a crowd of sad people, each holding a USB stick; Kevin among them
S(55.57, { tr: 'whipL', lift: 0, cam: [[55.57, 540, 1000, 1.0], [56.88, 540, 980, 1.06]],
  draw() { setDark('#2a1650', '#07030f'); const R = RNG('crowd44');
    for (let i = 0; i < 7; i++) { if (i === 3) continue; const x = 60 + i * 160 + R.n(14), y = 1260 - (i % 2) * 60, c = ['#4a3780', '#3a2f6a', '#55408a'][i % 3]; circ(x, y - 150, 58, c); fillRR(x - 80, y - 95, 160, 260, 66, c); circ(x - 18, y - 160, 7, '#cfc8ef'); circ(x + 18, y - 160, 7, '#cfc8ef'); ctx.beginPath(); ctx.arc(x, y - 118, 18, Math.PI + 0.3, TAU - 0.3); ctx.lineWidth = 6; ctx.strokeStyle = '#cfc8ef'; ctx.stroke();
      if (TT > 55.65 + i * 0.05) { const k = sp(55.65 + i * 0.05, 300, 13); usbStick(x + 40, y - 20, 0.25 * k, 0.3); } }
    char('kevin', 540, 1400, 0.62, { pose: [[0, 'sad']], emo: [[0, 'sad']], extras: { tear: 1 } }); },
  ui() { info('NICHT ALLEIN 😔', 56.27, { y: 380, bg: '#141026', size: 58 }); },
  sfx: [[55.65, 'sadTrombone', 0.6], [56.27, 'pop', 1]] });
// ---- 45 · "Fast jeder fünfte Bitcoin der Welt…" — the globe, five coins: one turns grey
S(56.88, { tr: 'zoomOut', cam: [[56.88, 540, 960, 1.0], [58.7, 540, 950, 1.06]],
  draw() { setDark('#0b1a4a', '#02020a'); twinkles('st45', 0, 0, 1080, 1900, 30, { s: 14 }); globe(540, 1200, 240, TT * 0.08);
    for (let i = 0; i < 5; i++) { const k = sp(57.0 + i * 0.08, 280, 12), g = i === 4 ? clamp((TT - 57.52) / 0.3) : 0; btcCoin(160 + i * 190, 760 - g * 30, 78 * k, { spin: g ? 0 : Math.sin(TT * 3 + i) * 0.4, grey: g, shadow: false });
      if (i === 4 && g > 0.5) { const k2 = sp(57.8, 300, 12); ctx.save(); ctx.translate(920, 730); ctx.scale(k2, k2); line(-70, -70, 70, 70, 18, '#ff3b4a'); line(70, -70, -70, 70, 18, '#ff3b4a'); ctx.restore(); } } },
  ui() { info('1 VON 5 BITCOINS 🌍', 57.52, { y: 380, bg: PAL.orange, size: 54 }); },
  sfx: [[57.0, 'popHi', 1], [57.08, 'popHi', 1.1], [57.16, 'popHi', 1.2], [57.24, 'popHi', 1.3], [57.32, 'popHi', 1.4], [57.6, 'powerDown'], [57.8, 'stamp']] });
// ---- 46 · "…ist für immer verloren." — grey coins sink into a dark hole, the stamp
S(58.7, { tr: 'cut', tense: 1, cam: [[58.7, 540, 960, 1.0], [60.1, 540, 960, 1.12]],
  draw() { setDark('#1a0a30', '#000'); abyss(540, 1200, 420, 130); const R = RNG('ab');
    for (let i = 0; i < 9; i++) { const t0 = 58.75 + i * 0.12, u = clamp((TT - t0) / 0.9), ox = R.n(300), oy = R.n(80); if (TT < t0 || u >= 1) continue; ctx.save(); ctx.globalAlpha = 1 - clamp((u - 0.8) / 0.2); btcCoin(540 + ox * (1 - u), lerp(400 + oy, 1200, EZ.i3(u)), 70 * (1 - u * 0.6), { grey: 0.8, spin: TT * 4 + i, shadow: false }); ctx.restore(); } },
  ui() { stampBox(540, 700, 59.56, 'FÜR IMMER VERLOREN', '#ff3b4a', -0.12, 60); },
  sfx: [[58.75, 'whooshDown', 0.8], [59.0, 'descend'], [59.56, 'stamp', 1.2], [59.6, 'dun']] });

// =====================================================================  KEVIN KEEPS SPENDING
// ---- 47 · "Währenddessen kauft sich Kevin eine Yacht…" — the yacht glides in, Kevin waving on deck
S(60.1, { tr: 'whipR', lift: 0, cam: [[60.1, 540, 1080, 1.0], [61.95, 540, 1060, 1.06]],
  draw() { setHarbor(); const x = 540 + 900 * (1 - sp(60.15, 90, 16)), bob = Math.sin(TT * 2) * 10; char('kevin', x - 40, 1100 + bob, 0.42, { pose: [[0, 'waveR']], emo: [[0, 'laugh']], extras: { shades: 1 } }); yacht(x, 1300 + bob, 2.1); },
  ui() { info('EINE YACHT 🛥️', 61.84, { y: 380, bg: PAL.blue, size: 60 }); },
  sfx: [[60.15, 'shipHorn'], [60.3, 'waves', 1.5], [61.84, 'pop', 1]] });
// ---- 48 · "…für fünf Millionen." — the price tag, bills fly off the deck
S(61.95, { tr: 'cut', lift: 0, cam: [[61.95, 540, 1150, 1.25], [62.97, 540, 1130, 1.32]], punch: [[62.2, 0.08]],
  draw() { setHarbor({ blur: 3 }); const bob = Math.sin(TT * 2) * 10; char('kevin', 500, 1100 + bob, 0.42, { pose: [[0, 'cheer']], emo: [[0, 'laugh']], extras: { shades: 1 } }); yacht(540, 1300 + bob, 2.1); cash('y48', 62.2, 20); },
  ui() { priceTag(560, 600, sp(62.2, 280, 12), '5 MIO. €', -0.08); },
  sfx: [[62.2, 'cashReg'], [62.3, 'moneyRain', 0.7]] });
// ---- 49 · "Und goldene Uhren…" — the velvet box opens: gold and diamonds
S(62.97, { tr: 'zoomIn', cam: [[62.97, 540, 960, 1.0], [64.0, 540, 950, 1.08]],
  draw() { setDark('#4a1030', '#0a0208'); glow(540, 950, 600, '#ffd27a', 0.25); const k = sp(63.0, 240, 13); ctx.save(); ctx.translate(540, 1000); ctx.scale(k, k); watchDisplay(0, 0, 1.3); ctx.restore(); },
  ui() { info('GOLDENE UHREN ⌚', 63.17, { y: 380, bg: PAL.yellow, fg: '#1b1530', size: 56 }); },
  sfx: [[63.0, 'creak', 1.4], [63.17, 'bling'], [63.66, 'glassClink']] });
// ---- 50 · "…für eine Million." — Kevin shows off his wrist, the tag swings in
S(64.0, { tr: 'whipL', cam: CLOSE(64.0, 64.92),
  draw() { setPenthouse({ blur: 10 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'tapWatch']], emo: [[0, 'smug']], extras: { shades: 1, watch: 1 } }); cash('w50', 64.48, 14); },
  ui() { priceTag(560, 560, sp(64.3, 280, 12), '1 MIO. €', -0.08); },
  sfx: [[64.3, 'cashReg'], [64.48, 'moneyRain', 0.5]] });

// =====================================================================  BITCOIN EXPLODES
// ---- 51 · "Doch im Herbst…" — autumn leaves fall across a calendar page
S(64.92, { tr: 'iris', cam: [[64.92, 540, 960, 1.0], [65.62, 540, 950, 1.06]],
  draw() { rays('#c96b10', '#ff9d3f', { cy: 900, spin: 0.25 }); const k = sp(64.95, 240, 13); ctx.save(); ctx.translate(540, 980); ctx.scale(k, k); calendarPage(0, 0, 1.1, 'HERBST', 10); ctx.restore(); leaves('lv51', 60, 26); },
  ui() { info('IM HERBST 🍂', 65.19, { y: 360, bg: '#141026', size: 58 }); },
  sfx: [[64.95, 'flip'], [65.0, 'rustle'], [65.19, 'pop', 1]] });
// ---- 52 · "…explodiert Bitcoin." — the line shoots up, coins burst (riser into the hit)
const UP52 = [[0, 30000], [0.2, 36000], [0.35, 33000], [0.55, 60000], [0.75, 95000], [1, 150000]];
S(65.62, { tr: 'flash', cam: [[65.62, 540, 960, 1.0], [66.9, 540, 950, 1.12]], punch: [[65.9, 0.12]], shake: [[65.9, 16, 0.5]],
  draw() { setDark('#0a3a20', '#020a05'); priceChart(140, 640, 800, 640, UP52, clamp((TT - 65.65) / 1.0), { vmin: 20000, vmax: 170000, label: false }); btcBurst('b52', 900, 700, 65.95, 14); },
  ui() { popText('BOOM! 🚀', 540, 380, 65.9, 110, '#2ee87a', -0.05, 0); },
  sfx: [[65.9, 'boom'], [65.95, 'coinPour', 1], [66.35, 'grow']] });
// ---- 53 · "Höher als je zuvor!" — a rocket breaks through the record line, up to the moon
S(66.9, { tr: 'zoomIn', cam: [[66.9, 540, 960, 1.0], [68.38, 540, 940, 1.1]],
  draw() { setDark('#0b0730', '#000'); twinkles('st53', 0, 0, 1080, 1900, 40, { s: 16 }); circ(860, 420, 120, '#f1f0ff'); circ(820, 390, 24, '#d8d6ee'); circ(900, 460, 18, '#d8d6ee');
    const u = clamp((TT - 66.95) / 1.2), y = 1700 - EZ.io(u) * 1300; line(-100, 900, 1200, 900, 8, '#ff3b4a'); tText('REKORD', 120, 860, 36, { color: '#ff3b4a', shadow: false, align: 'left' });
    if (TT > 67.4) impactLines(540, 900, 120, 420, 14, 67.45); rocket(540, y, 0.9, 0); },
  ui() { info('HÖHER ALS JE ZUVOR! 🌕', 67.39, { y: 380, bg: PAL.green, size: 50 }); },
  sfx: [[66.95, 'rocket', 1.4], [67.45, 'glassClink'], [67.5, 'impact'], [67.84, 'sparkle']] });
// ---- 54 · "Kevin lässt vor Schreck…" — Kevin sees the news on his phone, his jaw drops
S(68.38, { tr: 'whipR', cam: CLOSE(68.38, 69.55), punch: [[69.08, 0.1]],
  draw() { setPenthouse({ blur: 12 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[68.38, 'phoneR'], [69.08, 'shrug', 0.12]], emo: [[0, 'neutral'], [69.08, 'shock', 0.1]], extras: { watch: 1 }, squash: [[0, 0], [69.1, -0.35, 0.08], [69.3, 0, 0.15]], holdR: TT < 69.08 ? () => phone(0, -30, 0.3, 0.15) : undefined }); },
  ui() { popText('WAS?! 😱', 540, 380, 69.08, 100, PAL.yellow, -0.04, 0); },
  sfx: [[68.45, 'notify'], [69.08, 'shockHit']] });
// ---- 55 · "…seine goldene Uhr fallen." — the watch tumbles in slow motion and the floor glass cracks
S(69.55, { tr: 'cut', cam: [[69.55, 540, 960, 1.0], [70.65, 540, 980, 1.1]], shake: [[70.23, 16, 0.35]],
  draw() { setPenthouse({ blur: 10 }); const u = clamp((TT - 69.6) / 0.63), y = lerp(300, 1200, EZ.i3(u)); ctx.save(); ctx.translate(540, y); ctx.rotate(u * 2.6); goldWatch(0, 0, 0.42, TT); ctx.restore();
    if (TT > 70.23) { ctx.save(); ctx.translate(540, 1200); ctx.lineWidth = 6; ctx.strokeStyle = '#ffffff'; for (let i = 0; i < 7; i++) { const a = i / 7 * TAU; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * 90, Math.sin(a) * 90); ctx.lineTo(Math.cos(a + 0.2) * 150, Math.sin(a + 0.2) * 150); ctx.stroke(); } ctx.restore(); impactLines(540, 1200, 160, 380, 12, 70.23); } },
  ui() { info('KLIRR! 💥', 70.23, { y: 380, bg: PAL.red, size: 62 }); },
  sfx: [[69.6, 'whooshDown', 0.7], [70.23, 'glassClink'], [70.25, 'crunch'], [70.27, 'thud']] });

// =====================================================================  THE RECKONING
// ---- 56 · "Am 7. November 2027…" — the calendar: 7 · NOV 2027, one year later
S(70.65, { tr: 'iris', cam: [[70.65, 540, 960, 1.0], [72.95, 540, 940, 1.12]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); const k = sp(70.7, 220, 13); ctx.save(); ctx.translate(540, 980); ctx.scale(k, k); calendarPage(0, 0, 1.3, 'NOV 2027', 7); ctx.restore(); confetti('c56', 71.64, 30); },
  ui() { info('1 JAHR SPÄTER 📅', 71.11, { y: 360, bg: PAL.orange, size: 58 }); },
  sfx: [[70.7, 'clockSpin', 1.0], [71.11, 'pop', 1], [71.64, 'impact']] });
// ---- 57 · "…treffen sie sich zur Abrechnung." — face to face across a table (slow push, vignette)
S(72.95, { tr: 'zoomIn', tense: 1, lift: 200, cam: [[72.95, 540, 1150, 1.05], [74.6, 540, 1130, 1.16]],
  draw() { setStudio({ blur: 6 }); char('kevin', 320, FLOOR + 40, 0.9, { pose: [[0, 'hips']], emo: [[0, 'smug']], look: [0.7, 0], extras: { shades: 1 } }); char('jonas', 760, FLOOR + 40, 0.9, jonasT({ pose: [[0, 'armsCross']], emo: [[0, 'calm']], look: [-0.7, 0] })); fillRR(140, FLOOR - 170, 800, 50, 14, '#6a3f22'); },
  ui() { info('ABRECHNUNG ⚖️', 73.98, { y: 380, bg: '#141026', size: 58 }); },
  sfx: [[73.0, 'footsteps', 1.2], [73.5, 'heartbeat', 1.2], [73.98, 'pop', 1]] });
// ---- 58 · "Kevin knallt sein Konto auf den Tisch." — the statement slams down
S(74.6, { tr: 'cut', cam: [[74.6, 540, 1000, 1.0], [76.55, 540, 980, 1.08]], shake: [[75.05, 16, 0.35]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#6a4a2a'], [1, '#4a3018']]); ctx.fillRect(-600, -400, 2300, 2700); for (let i = 0; i < 10; i++) line(-600, 200 + i * 180, 1700, 220 + i * 180, 6, 'rgba(0,0,0,0.12)');
    const a = sp(74.9, 220, 13); statement(540, 1000 - (1 - a) * 900, 1.3, 'KEVIN', null, -0.04); impactLines(540, 1000, 300, 600, 14, 75.05); },
  ui() { info('KNALL! 💥', 75.05, { y: 380, bg: PAL.red, size: 58 }); },
  sfx: [[74.9, 'whooshDown', 1.2], [75.05, 'slam'], [75.08, 'thud']] });
// ---- 59 · "Konto, Penthouse, Yacht und Uhren:" — four tiles pop in, one per word
function assetTile(x, y, t0, label, fn, col) { if (TT < t0) return; const k = sp(t0, 300, 12); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); fillRR(-205, -190, 420, 380, 30, 'rgba(0,0,0,0.35)'); fillRR(-215, -200, 420, 380, 30, col); fillRR(-200, -185, 390, 260, 22, 'rgba(10,8,30,0.28)');
  ctx.save(); ctx.beginPath(); ctx.roundRect(-200, -185, 390, 260, 22); ctx.clip(); ctx.translate(-5, -55); fn(); ctx.restore(); tText(label, -5, 130, 46, { color: '#fff', maxW: 380 }); ctx.restore(); }
S(76.55, { tr: 'whipL', cam: [[76.55, 540, 960, 1.0], [78.78, 540, 960, 1.06]],
  draw() { rays('#1d48b8', '#2f6df6', { cy: 900, spin: 0.25 });
    assetTile(300, 720, 76.6, 'KONTO', () => statement(0, 20, 0.42, 'KEVIN', null, -0.04), PAL.blue);
    assetTile(780, 720, 77.09, 'PENTHOUSE', () => { ctx.save(); ctx.scale(0.21, 0.21); penthouseTower(0, 520, 1); ctx.restore(); }, '#7a3cff');
    assetTile(300, 1150, 77.64, 'YACHT', () => yacht(0, 30, 0.8), '#0e8a9a');
    assetTile(780, 1150, 78.19, 'UHREN', () => { ctx.save(); ctx.rotate(0.3); goldWatch(0, 0, 0.2, TT); ctx.restore(); }, '#c99a1a'); },
  sfx: [[76.6, 'pop', 1], [77.09, 'pop', 1.15], [77.64, 'pop', 1.3], [78.19, 'pop', 1.45]] });
// ---- 60 · "49 Millionen." — the total rolls up, a cash cannon (riser into the hit)
S(78.78, { tr: 'flash', cam: [[78.78, 540, 960, 1.0], [80.2, 540, 950, 1.1]], punch: [[78.85, 0.12]],
  draw() { rays('#0e8a45', '#2ee87a', { cy: 940, spin: 0.35 }); glow(540, 1000, 700, '#d8ffd0', 0.4); cashMountain(540, 1300, 1.0, 1); billRain('t60', 78.85, 30, { burst: [540, 900], spread: 1.6 }); },
  ui() { const k = sp(78.82, 300, 11); ctx.save(); ctx.translate(540, 700); ctx.scale(k, k); fillRR(-470, -110, 940, 220, 40, '#141026'); tText('KEVIN', 0, -70, 34, { color: '#9f95c9', shadow: false, letter: 6 }); tText(fmtEUR(Math.round(rollNum(40e6, 49e6, 78.85, 79.6) / 1000) * 1000), 0, 22, 110, { color: '#2ee87a', shadow: false, maxW: 900 }); ctx.restore(); },
  sfx: [[78.85, 'cashCannon'], [78.9, 'coinTicks', 0.8, 10], [79.56, 'cashReg']] });
// ---- 61 · "Schlag das mal!" — Kevin, arms crossed, challenging
S(80.2, { tr: 'whipR', cam: CLOSE(80.2, 81.15),
  draw() { setStudio({ blur: 10 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], tilt: [[0, 0], [80.5, -0.08]], extras: { shades: 1 } }); },
  ui() { popText('SCHLAG DAS MAL! 😏', 540, 380, 80.23, 76, PAL.yellow, -0.04, 0); },
  sfx: [[80.53, 'ting']] });
// ---- 62 · "Ich hab keinen einzigen Bitcoin verkauft." — Jonas calm, his wallet: every coin still there
S(81.15, { tr: 'zoomIn', cam: CLOSE(81.15, 83.28),
  draw() { setStudio({ blur: 10 }); char('jonas', 400, FLOOR + 170, 1.05, jonasT({ pose: [[0, 'phoneR']], emo: [[0, 'calm'], [82.4, 'smug', 0.3]], look: [0.6, -0.2] })); },
  ui() { const k = sp(81.25, 240, 13); ctx.save(); ctx.translate(790, 920); ctx.rotate(0.05); ctx.scale(k * 1.9, k * 1.9); phone(0, 0, 1, 0, () => walletScreen('365 BTC', 'VERKAUFT: 0', '#2ee87a')); ctx.restore(); info('KEINEN VERKAUFT! 💎', 82.8, { y: 380, bg: PAL.orange, size: 54 }); },
  sfx: [[81.25, 'whoosh', 1.2], [81.9, 'coin'], [82.8, 'stamp']] });
// ---- 63 · "Und seit dem ersten Tag ist Bitcoin um…" — the whole year on the chart, day 1 marked
const YEAR63 = [[0, 67000], [0.27, 30000], [0.45, 42000], [0.62, 38000], [0.85, 110000], [1, 134000]];
S(83.28, { tr: 'slide', cam: [[83.28, 540, 960, 1.0], [84.9, 540, 950, 1.06]],
  draw() { setDark('#16204a', '#05030c'); priceChart(140, 640, 800, 640, YEAR63, clamp((TT - 83.3) / 1.5), { vmin: 0, vmax: 160000, label: false, marks: [[0, 67000, 'TAG 1'], [1, 134000, 'HEUTE']] }); },
  ui() { info('TAG 1: 67.000 € 📈', 83.86, { y: 380, bg: '#141026', size: 56 }); },
  sfx: [[83.3, 'grow'], [83.86, 'pop', 1], [84.21, 'tick']] });
// ---- 64 · "…100 Prozent gestiegen." — +100 % slams in, the coin doubles in size
S(84.9, { tr: 'zoomIn', cam: [[84.9, 540, 960, 1.0], [86.75, 540, 950, 1.1]], punch: [[85.23, 0.12]], shake: [[85.23, 14, 0.4]],
  draw() { rays('#0e8a45', '#2ee87a', { cy: 900, spin: 0.4 }); const g = sp(85.23, 220, 11); btcCoin(540, 1000, 150 + 120 * g, { spin: Math.sin(TT * 3) * 0.3, glow: 0.4 }); btcBurst('b64', 540, 1000, 85.25, 12, { r: 40 }); },
  ui() { if (TT > 85.23) { const k = sp(85.23, 300, 10); ctx.save(); ctx.translate(540, 520); ctx.scale(k, k); tText('+100 %', 0, 0, 190, { color: '#ffffff', stroke: '#0a5a2a', strokeW: 28 }); ctx.restore(); } info('DOPPELT SO VIEL WERT!', 86.06, { y: 1330, bg: '#141026', size: 48 }); },
  sfx: [[85.25, 'coinPour', 0.8], [86.06, 'pop', 1], [86.1, 'sparkle']] });
// ---- 65 · "Rechne selbst!" — Jonas points into the camera, a calculator spins in
S(86.75, { tr: 'whipL', cam: CLOSE(86.75, 87.52), punch: [[86.8, 0.1]],
  draw() { setStudio({ blur: 10 }); char('jonas', 540, FLOOR + 160, 1.0, jonasT({ pose: [[0, 'pointR']], emo: [[0, 'grin']], look: [0, 0.3] })); const k = sp(86.85, 260, 12); ctx.save(); ctx.translate(820, 780); ctx.rotate((1 - k) * 2); ctx.scale(k * 0.45, k * 0.45); calculator(0, 0, 1, '?', 0); ctx.restore(); },
  ui() { popText('RECHNE SELBST! 🧮', 540, 380, 86.8, 76, PAL.yellow, -0.04, 0); },
  sfx: [[86.85, 'whoosh', 1.2], [87.2, 'ding']] });

// =====================================================================  THE QUESTION
// ---- 66 · "Wer hat am Ende mehr: Kevin oder Jonas?" — even split, both enter at once: Kevin 49 Mio. (top), Jonas ??? (bottom)
S(87.52, { tr: 'glitch', tense: 1, capY: YD, cam: [[87.52, 540, 960, 1.0], [90.6, 540, 960, 1.04]],
  draw() { const k = sp(87.54, 170, 13);
    splitEven(() => { rays('#1d48b8', '#2f6df6', { cy: 560, spin: 0.08 }); char('kevin', 330 - (1 - k) * 760, 860, 0.56, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], extras: { shades: 1 }, lean: (1 - k) * 0.25 }); },
      () => { rays('#c96b10', '#ff9d3f', { cy: 1220, spin: -0.08 }); char('jonas', 330, 1520 + (1 - k) * 600, 0.56, jonasT({ pose: [[0, 'hips']], emo: [[0, 'smug']] })); }); },
  ui() { hud('KONTO · KEVIN', [[0, 49e6]], { x: 760, y: 560, scale: 0.8, t0: 87.6 }); { const g = TT > 88.0 && TT < 88.3 ? Math.sin(TT * 90) * 12 : 0, kk = sp(87.65, 260, 14); ctx.save(); ctx.translate(760 + g, 1230); ctx.scale(0.8 * kk, 0.8 * kk); blurCounter(0, 0, 560, 210, 'KONTO · JONAS'); ctx.restore(); }
    if (TT > 88.6) { const k3 = sp(88.6, 260, 12); ctx.save(); ctx.translate(760, 1440); ctx.scale(k3, k3); btcCoin(-110, 0, 52, { spin: TT * 3, shadow: false }); tText('× 365', 60, 0, 60, { color: '#fff', stroke: '#3a1a00', strokeW: 14 }); ctx.restore(); }
    info('WER HAT MEHR? 🤔', 87.75, { y: 270, bg: PAL.yellow, fg: '#1b1530', size: 50 }); },
  sfx: [[87.6, 'whoosh', 1.1], [87.65, 'pop', 1], [88.0, 'glitch'], [88.1, 'coinTicks', 1.4, 4], [88.6, 'pop', 1.2], [89.8, 'heartbeat', 0.8]] });
