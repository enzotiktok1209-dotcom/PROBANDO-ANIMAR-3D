// =====================================================================
//  shots.js — 20 Millionen sofort vs 50 Cent pro Sekunde, 1 Jahr (DE). ~46 shots on the trimmed voice (77.05 s).
//  Follows the 40 Mio. sequence: hook at the buttons -> the choice + the object (a calendar) -> Jonas spends
//  (yacht 1 Mio., villa 800.000, party 200.000: 20 -> 18 Mio., always on top) -> parallel ("while Jonas…, Kevin earns…")
//  -> video call after 6 months, "watch the waves" -> the last day crossed off -> door, laptop, split screen.
//  Kevin: 0,50 € x 31.536.000 s = 15.768.000 € -> Jonas (18 Mio.) is richer (never said on screen).
//  Original outfits: Kevin in his blue hoodie + black beanie, Jonas in his red hoodie + glasses.
// =====================================================================
function popText(str, x, y, t0, size, col, rot = 0, rise = 40) { if (TT < t0) return; const k = springEase(TT - t0, 300, 12); ctx.save(); ctx.translate(x, y - (TT - t0) * rise); ctx.rotate(rot); ctx.scale(k, k); tText(str, 0, 0, size, { color: col, stroke: '#1b0f2e', strokeW: size * 0.2, maxW: 980 }); ctx.restore(); }
function info(str, t0, o = {}) { sticker(str, o.x ?? 540, o.y ?? 400, t0, { bg: o.bg ?? '#141026', fg: o.fg, size: o.size ?? 54, rot: o.rot ?? -0.03, out: o.out }); }
function slamNum(str, t0, y = 400, size = 104, col = PAL.yellow) { if (TT < t0) return; const k = springEase(TT - t0, 300, 11), sc = k * (1 + 0.6 * Math.max(0, 1 - (TT - t0) / 0.12)); ctx.save(); ctx.translate(540, y); ctx.scale(sc, sc); tText(str, 0, 0, size, { color: col, stroke: '#3a2400', strokeW: size * 0.2, maxW: 1000 }); ctx.restore(); }
const CLOSE = (t0, t1, x = 540) => [[t0, x, 1000, 1.65], [t1, x, 978, 1.8]];
const CLOSEJ = (t0, t1) => [[t0, 540, 1000, 1.72], [t1, 540, 980, 1.88]];
const cash = (seed, t0, n = 22, o = {}) => { if (TT > t0) billRain(seed, t0, n, { spread: 1.5, ...o }); };
const JON = { glasses: true };
const JWET = { glasses: true, sweat: 1, look: { hair: '#7a5028', hairD: '#5a3a1a' } };
// Jonas' account, always on top while he spends (20 -> 19 -> 18,2 -> 18 Mio.)
const JACC = [[0, 20e6], [22.3, 19e6], [24.9, 18.2e6], [28.9, 18e6]];
const jAcc = (o = {}) => hud('KONTO · JONAS', JACC, { x: 540, y: 300, scale: o.scale ?? 0.6, t0: o.t0 });
const kRoom = (b = 8) => setLeoRoom({ blur: b });
function kRoomCal(b = 8, crossed = 1) { setLeoRoom({ blur: b }); }
function iconCard(x, y, top, big, sub, col, t0, icon) {
  if (TT < t0) return; const k = springEase(TT - t0, 260, 15), w = 450, h = 380;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  fillRR(-w / 2 + 8, -h / 2 + 12, w, h, 28, 'rgba(0,0,0,0.38)'); fillRR(-w / 2, -h / 2, w, h, 28, col); fillRR(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 22, shade(col, 0.12));
  tText(top, 0, -h / 2 + 36, 26, { color: 'rgba(255,255,255,0.9)', shadow: false, letter: 3, weight: 800 });
  fillRR(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18, 'rgba(10,8,30,0.4)');
  const ik = springEase(TT - t0 - 0.12, 280, 12), bob = Math.sin(TT * 3 + x) * 4;
  ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18); ctx.clip(); ctx.translate(0, -h / 2 + 147 + bob); ctx.scale(ik, ik);
  if (icon === 'cash') { glow(0, 0, 200, '#a6f0b4', 0.3); briefcase(0, 60, 0.42, 1); } else { glow(0, 0, 200, '#ffe08a', 0.3); coin50(-60, 0, 62, { sx: Math.cos(TT * 4) }); stopwatch(90, 20, 0.22, TT); }
  ctx.restore();
  tText(big, 0, h / 2 - 92, 46, { color: '#fff', maxW: w - 36 }); tText(sub, 0, h / 2 - 40, 26, { color: 'rgba(255,255,255,0.95)', shadow: false, weight: 800, maxW: w - 40 });
  ctx.restore();
}
// Jonas stands left (green: 20 Mio. now), Kevin right (orange: 50 cents a second)
const cards = (t0) => { tText('WAS NIMMST DU?', 540, 250, 66, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14, maxW: 1000 });
  iconCard(285, 520, 'SOFORT', '20 MIO. €', 'AUF DIE HAND', PAL.green, t0, 'cash'); iconCard(795, 520, '1 JAHR LANG', '0,50 € / SEK.', 'JEDE SEKUNDE', PAL.orange, t0 + 0.06, 'coin'); tText('VS', 540, 520, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); };
const duoStudio = (jT = {}, kT = {}, o = {}) => { setStudio(o); char('jonas', 300, FLOOR - 40, 0.8, { emo: [[0, 'happy']], look: [0.4, -0.4], extras: JON, ...jT }); char('kevin', 780, FLOOR - 40, 0.8, { emo: [[0, 'grin']], look: [-0.3, -0.3], ...kT }); };
// the calendar on Kevin's wall: room + calendar (crossed days, the last one drawing with p)
function calWall(b, crossed, p, o = {}) { setLeoRoom({ blur: b }); ctx.save(); ctx.translate(o.x ?? 720, o.y ?? 760); wallCalendar(0, 0, o.s ?? 0.95, crossed, { p, ...o }); ctx.restore(); }
// guests at the party (Mia, Lea, Zoe in party clothes)
const GUESTS = [['mia', 160], ['lea', 920], ['zoe', 1180]];

// =====================================================================  THE HOOK
// ---- 1 · both at their buttons, the two options (0.8 s, hard punch-in on frame one)
S(0.0, { tr: 'cut', lift: 0, raise: 60, cam: [[0, 540, 1000, 2.2], [0.2, 540, 1000, 1.0], [0.8, 540, 990, 1.06]], shake: [[0.2, 14, 0.3]],
  draw() { duoStudio({ emo: [[0, 'grin']], look: [0.5, -0.3], pose: [[0, 'raiseR']] }, { emo: [[0, 'smug']], look: [-0.5, -0.3], pose: [[0, 'raiseR']] }); studioPodiums(); },
  ui() { cards(0.0); },
  sfx: [[0.02, 'impact'], [0.2, 'pop', 1.1], [0.3, 'pop', 1.3]] });
// ---- 2 · "…Millionen sofort?" — the briefcase bursts open, a cash cannon, 20.000.000 € slams in
S(0.8, { tr: 'zoomIn', lift: 0, cam: [[0.8, 540, 980, 1.0], [1.87, 540, 960, 1.12]], shake: [[0.95, 18, 0.4]],
  draw() { rays('#1a6a2a', '#2fae55', { cy: 940, spin: 0.35 }); glow(540, 1000, 700, '#d9ffd0', 0.4); cashMountain(540, 1320, 1.15, clamp((TT - 0.8) / 0.35)); ctx.save(); ctx.translate(540, 1050); briefcase(0, 0, 1.0, clamp((TT - 0.85) / 0.2)); ctx.restore(); cash('h2', 0.95, 30, { burst: [540, 900], spread: 0.9 }); },
  ui() { slamNum('20.000.000 €', 0.95, 400, 112); info('SOFORT ⚡', 1.3, { y: 560, bg: PAL.red, size: 64 }); },
  sfx: [[0.95, 'cashCannon'], [1.0, 'slam'], [1.3, 'pop', 1]] });
// ---- 3 · "Oder 50 Cent…" — under a spotlight a single 50-cent coin drops and spins
S(1.87, { tr: 'whipL', lift: 0, cam: [[1.87, 540, 1000, 1.0], [3.0, 540, 990, 1.15]],
  draw() { setDark('#3a2a1a', '#05050a', { cone: 1 }); const u = clamp((TT - 1.9) / 0.4), y = lerp(-200, 1040, EZ.i3(u)) - (u >= 1 ? Math.abs(Math.sin((TT - 2.3) * 9)) * 60 * Math.exp(-(TT - 2.3) * 3) : 0); ell(540, 1170, 300, 50, 'rgba(0,0,0,0.35)'); coin50(540, y, 180, { sx: Math.cos(TT * 9) }); },
  ui() { slamNum('0,50 €', 2.35, 400, 140, PAL.yellow); },
  sfx: [[1.92, 'whooshDown', 1.2], [2.3, 'coinBounce'], [2.35, 'pop', 1.1]] });
// ---- 4 · "…pro Sekunde, ein Jahr lang?" — a stopwatch ticks; "+0,50 €" pops off it every half second
S(3.0, { tr: 'cut', lift: 0, cam: [[3.0, 540, 980, 1.0], [4.49, 540, 960, 1.1]],
  draw() { rays('#3a1a6a', '#5a2bd6', { cy: 900, spin: 0.2 }); stopwatch(540, 1000, 1.05, TT * 6); plus50(540, 700, 2, 3.05, 'p4'); },
  ui() { info('JEDE SEKUNDE · 1 JAHR ⏱️', 3.6, { y: 400, bg: PAL.orange, size: 52 }); },
  sfx: [[3.05, 'tickRun', 1.4], [3.6, 'pop', 1], [3.8, 'coin', 1.2], [4.2, 'coin', 1.3]] });

// =====================================================================  THE CHOICE + THE CALENDAR
// ---- 5 · "Jonas schnappt sich sofort…" — Jonas slams the green button
S(4.49, { tr: 'flash', lift: 90, cam: [[4.49, 300, 1140, 1.4], [5.7, 310, 1100, 1.55]], shake: [[5.1, 20, 0.4]],
  draw() { setStudio({ blur: 3 }); char('kevin', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']], look: [-0.6, 0.2], pose: [[0, 'armsCross']] });
    char('jonas', 300, FLOOR - 40, 0.8, { pose: [[4.49, 'raiseR'], [4.95, 'slamR', 0.08], [5.3, 'cheer', 0.2]], emo: [[4.49, 'grin'], [5.3, 'laugh']], look: [0.4, 0.5], extras: JON });
    studioPodiums({ pressL: TT > 5.1 ? 1 : 0, litL: TT > 5.1 ? 0.9 : 0 }); impactLines(300, 1250, 120, 380, 12, 5.1); },
  ui() { info('JONAS: SOFORT! 💥', 5.15, { y: 400, bg: PAL.green, size: 58 }); },
  sfx: [[5.1, 'slam'], [5.13, 'buzzerWin'], [4.6, 'whooshUp', 1.2]] });
// ---- 6 · "…die 20 Millionen." — he hugs the open briefcase, bills rain, his account appears
S(5.7, { tr: 'zoomIn', cam: [[5.7, 540, 1040, 1.3], [6.99, 540, 1010, 1.42]],
  draw() { rays('#1a6a2a', '#2fae55', { cy: 900, spin: 0.2 }); char('jonas', 540, FLOOR + 60, 0.95, { pose: [[0, 'holdBoth']], emo: [[0, 'laugh']], extras: JON, holdR: () => briefcase(-150, 40, 0.42, 1) }); cash('j6', 5.75, 24); },
  ui() { jAcc({ t0: 5.8 }); },
  sfx: [[5.75, 'moneyRain', 1.2], [5.8, 'cashReg'], [6.3, 'bling']] });
// ---- 7 · "50 Cent?" — Jonas holds the little coin up between two fingers, unimpressed
S(6.99, { tr: 'whipR', cam: CLOSEJ(6.99, 8.58),
  draw() { setStudio({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'raiseR']], emo: [[6.99, 'confused'], [7.7, 'smug']], look: [0.4, -0.5], extras: JON, holdR: () => coin50(0, -40, 46, { sx: Math.cos(TT * 3) }) }); },
  ui() { popText('50 CENT? 🤨', 540, 400, 7.05, 84, '#ffffff', -0.04, 0); },
  sfx: [[7.05, 'pop', 1], [7.3, 'coin', 1.4], [7.7, 'boing']] });
// ---- 8 · "So was finde ich unterm Sofa!" — he lifts a sofa cushion: coins under it, he bursts out laughing
S(8.58, { tr: 'slide', lift: 0, cam: [[8.58, 600, 1180, 1.3], [10.17, 600, 1160, 1.4]],
  draw() { setLeoRoom({ blur: 3 }); sofa(540, 1420, 1.25, '#e2453c'); sofaCoins(540, 1290, 1.2); const up = EZ.o3(clamp((TT - 8.7) / 0.3)); ctx.save(); ctx.translate(380, 1240 - up * 90); ctx.rotate(-0.2 * up); fillRR(-170, -50, 340, 100, 40, '#ff7466'); fillRR(-150, -40, 300, 30, 20, 'rgba(255,255,255,0.18)'); ctx.restore();
    char('jonas', 800, 1600, 0.8, { pose: [[8.58, 'pointL'], [9.4, 'laughBelly', 0.2]], emo: [[8.58, 'grin'], [9.4, 'laugh']], look: [-0.6, 0.3], extras: JON }); },
  ui() { info('UNTERM SOFA! 😂', 9.1, { y: 400, bg: PAL.red, size: 60 }); },
  sfx: [[8.7, 'rustle'], [8.85, 'coinPour'], [9.1, 'pop', 1], [9.45, 'boing']] });
// ---- 9 · "Kevin dagegen grinst nur" — Kevin, calm, a slow knowing grin
S(10.17, { tr: 'zoomIn', cam: CLOSE(10.17, 11.42),
  draw() { kRoom(9); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[10.17, 'calm'], [10.6, 'smug']], tilt: [[10.17, 0], [10.7, 0.06]] }); if (TT > 10.7 && TT < 11.3) { const u = (TT - 10.7) / 0.6; sparkle(470, 940, 46 * (1 - u), '#fff', TT * 5); sparkle(610, 940, 46 * (1 - u), '#fff', TT * 5); } },
  ui() { info('KEVIN GRINST NUR 😏', 10.3, { y: 400, bg: PAL.blue, size: 56 }); },
  sfx: [[10.3, 'pop', 1], [10.7, 'ting']] });
// ---- 10 · "…und hängt einen Kalender an die Wand." — he hammers a nail, the calendar swings onto it
S(11.42, { tr: 'whipL', lift: 0, cam: [[11.42, 600, 1000, 1.05], [13.39, 640, 980, 1.15]],
  draw() { setLeoRoom({ blur: 2 }); const sw = TT > 12.4 ? Math.sin((TT - 12.4) * 9) * 0.25 * Math.exp(-(TT - 12.4) * 3) : 0, k = springEase(TT - 12.3, 240, 12);
    if (TT > 12.3) { ctx.save(); ctx.translate(760, 760 - (1 - k) * 120); wallCalendar(0, 0, 0.85, 0, { rot: sw }); ctx.restore(); } else { line(760, 480, 760, 515, 10, '#555'); circ(760, 476, 14, '#888'); }
    const hit = TT < 12.3 ? Math.abs(Math.sin((TT - 11.5) * 7)) : 0; char('kevin', 400, FLOOR + 60, 0.95, { pose: [[0, 'raiseR']], emo: [[11.42, 'serious'], [12.4, 'grin']], look: [0.6, -0.4], holdR: () => (TT < 12.3 ? hammer(0, -30, 0.7, -0.6 - hit * 0.6) : null) }); },
  ui() { info('EIN KALENDER 📅', 12.45, { y: 400, bg: PAL.red, size: 58 }); },
  sfx: [[11.55, 'tap'], [11.98, 'tap'], [12.3, 'whooshDown', 1.3], [12.4, 'thud'], [12.45, 'pop', 1]] });
// ---- 11 · "Dann streicht er den ersten Tag durch." — close on the calendar, a red X on day 1
S(13.39, { tr: 'zoomIn', lift: 0, raise: 0, cam: [[13.39, 600, 820, 1.55], [15.34, 600, 810, 1.7]], punch: [[14.6, 0.06]],
  draw() { setLeoRoom({ blur: 6 }); const p = clamp((TT - 14.2) / 0.5); ctx.save(); ctx.translate(560, 820); wallCalendar(0, 0, 1.0, 1, { p }); ctx.restore();
    const cx = 560 - 210 + 48 * (p < 0.5 ? p * 2 : 1) - (p > 0.5 ? 48 * (p - 0.5) * 2 : 0), cy = 820 - 70 - 24 + 48 * (p < 0.5 ? p * 2 : (p - 0.5) * 2); marker(cx, cy, 1.0, -0.5); },
  ui() { info('TAG 1 ✔️', 14.7, { y: 330, bg: PAL.green, size: 58 }); },
  sfx: [[14.2, 'pencil', 0.25], [14.47, 'pencil', 0.25], [14.7, 'ding']] });
// ---- 12 · "Ein Kalender?" — Jonas bursts out laughing, pointing at it
S(15.34, { tr: 'whipR', cam: CLOSEJ(15.34, 16.43),
  draw() { setLeoRoom({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'pointL']], emo: [[0, 'laugh']], look: [-0.5, 0], extras: JON, tilt: [[15.34, 0.06], [15.7, -0.06], [16.1, 0.05]] }); },
  ui() { popText('EIN KALENDER?! 😂', 540, 400, 15.4, 74, '#ffffff', -0.04, 0); },
  sfx: [[15.4, 'pop', 1], [15.6, 'boing'], [16.0, 'popHi', 1]] });
// ---- 13 · "Willst du jetzt ein Jahr lang Tage zählen, oder was?" — he mocks, a thought bubble of Kevin counting 1…365
S(16.43, { tr: 'cut', lift: 0, cam: [[16.43, 540, 1060, 1.1], [18.84, 540, 1040, 1.2]],
  draw() { setLeoRoom({ blur: 4 }); char('jonas', 300, FLOOR + 100, 0.95, { pose: [[16.43, 'shrug'], [17.6, 'laughBelly', 0.2]], emo: [[16.43, 'smug'], [17.6, 'laugh']], look: [0.5, -0.3], extras: JON });
    if (TT > 16.6) { const k = springEase(TT - 16.6, 260, 14); ctx.save(); ctx.translate(760, 760); ctx.scale(k, k); for (const [x, y, r] of [[-200, 260, 22], [-160, 200, 34]]) circ(x, y, r, '#ffffff'); ell(0, 0, 280, 220, '#ffffff'); char('kevin', -80, 170, 0.32, { emo: [[0, 'sleepy']], pose: [[0, 'writeR']] });
      const n = Math.min(365, Math.floor(1 + Math.pow(clamp((TT - 16.8) / 1.8), 2) * 364)); tText(String(n), 120, -40, 120, { color: '#e8262f', shadow: false }); tText('TAGE…', 120, 60, 44, { color: '#1b1530', shadow: false }); ctx.restore(); } },
  ui() { info('365 TAGE ZÄHLEN? 🥱', 18.0, { y: 400, bg: PAL.yellow, fg: '#1b1530', size: 54 }); },
  sfx: [[16.6, 'bubble'], [16.8, 'tickRun', 1.6], [18.0, 'pop', 1], [17.6, 'boing']] });

// =====================================================================  JONAS SPENDS (his account stays on top)
// ---- 14 · "Also gibt Jonas sofort richtig Gas:" — shades on, a gold chain, a money gun at night in the city
S(18.84, { tr: 'zoomOut', lift: 0, cam: [[18.84, 540, 1080, 1.05], [21.13, 540, 1050, 1.15]],
  draw() { setDubai({ blur: 2 }); fireworks('f14', 19.0, 4); char('jonas', 540, 1700, 1.0, { pose: [[18.84, 'idle'], [19.2, 'throwR', 0.15], [19.6, 'cheer', 0.2]], emo: [[0, 'laugh']], extras: { glasses: true, shades: TT > 19.1 ? 1 : 0, chain: TT > 19.1 ? 1 : 0 }, look: [0, -0.2] }); cash('j14', 19.3, 30, { burst: [600, 900] }); },
  ui() { jAcc(); info('JONAS GIBT GAS! 🔥', 19.4, { y: 470, bg: PAL.red, size: 56 }); },
  sfx: [[19.1, 'swish', 1.2], [19.3, 'cashCannon'], [19.4, 'pop', 1], [20.2, 'moneyRain', 0.9]] });
// ---- 15 · "zuerst eine Yacht für eine Million." — a huge yacht glides into the harbour, the price slams in
S(21.13, { tr: 'whipL', lift: 0, cam: [[21.13, 540, 1080, 1.0], [23.14, 540, 1060, 1.08]], punch: [[22.3, 0.07]],
  draw() { setHarbor(); const x = lerp(1500, 520, EZ.o3(clamp((TT - 21.15) / 1.0))); bigYacht(x, 1320, 0.95, { name: 'JONAS I' }); },
  ui() { jAcc(); info('YACHT 🛥️', 21.6, { y: 470, bg: PAL.blue, size: 58 }); slamNum('– 1.000.000 €', 22.3, 620, 84, '#ff6b6b'); },
  sfx: [[21.2, 'shipHorn'], [21.6, 'pop', 1], [22.0, 'waves', 0.8], [22.3, 'cashReg'], [22.5, 'descend']] });
// ---- 16 · "Dann eine Villa am Meer für 800.000 Euro." — a villa rises out of the beach, a sign drops: 800.000 €
S(23.14, { tr: 'whipU', lift: 0, cam: [[23.14, 540, 1080, 1.0], [25.91, 540, 1060, 1.08]], punch: [[24.9, 0.07]],
  draw() { setIsland(); const k = springEase(TT - 23.3, 200, 13); ctx.save(); ctx.translate(560, 1340 + (1 - k) * 900); villa(0, 0, 0.7, 1); ctx.restore(); },
  ui() { jAcc(); info('VILLA AM MEER 🏝️', 23.6, { y: 470, bg: PAL.green, size: 56 }); slamNum('– 800.000 €', 24.9, 620, 84, '#ff6b6b'); },
  sfx: [[23.3, 'whooshUp', 1.1], [23.55, 'thud'], [23.6, 'pop', 1], [23.9, 'birds', 0.8], [24.9, 'cashReg'], [25.1, 'descend']] });
// ---- 17 · "Und zur Einweihung sogar eine Party" — night: the yacht lit up, fireworks over the sea
S(25.91, { tr: 'flash', lift: 0, cam: [[25.91, 540, 1100, 1.0], [27.84, 540, 1070, 1.1]],
  draw() { setSea({ night: 1 }); fireworks('f17', 26.0, 6); bigYacht(540, 1330, 0.95, { party: 1, name: 'JONAS I' }); },
  ui() { jAcc(); info('PARTY! 🎉', 26.5, { y: 470, bg: PAL.pink, size: 64 }); },
  sfx: [[26.0, 'rocket', 0.6], [26.45, 'boom'], [26.5, 'pop', 1], [26.9, 'boom'], [27.3, 'applause', 0.8]] });
// ---- 18 · "…auf der Yacht für 200.000." — on deck: guests dancing, Jonas the DJ, the price
S(27.84, { tr: 'whipR', lift: 0, cam: [[27.84, 540, 1080, 1.0], [29.6, 540, 1060, 1.08]], punch: [[28.9, 0.07]],
  draw() { setYachtDeck({ night: 1 }); for (const [id, x] of GUESTS) char(id, x, 1720, 0.62, { pose: [[0, 'cheer'], [27.84 + (x % 3) * 0.1, 'armsUp', 0.2]], emo: [[0, 'laugh']], jump: [[0, 0], [27.9 + (x % 5) * 0.07, 40, 0.15], [28.2 + (x % 5) * 0.07, 0, 0.15], [28.6, 40, 0.15], [28.9, 0, 0.15]] });
    char('jonas', 540, 1760, 0.75, { pose: [[0, 'cheer']], emo: [[0, 'laugh']], extras: { glasses: true, shades: 1, chain: 1 }, jump: [[0, 0], [28.1, 50, 0.15], [28.4, 0, 0.15], [29.0, 50, 0.15], [29.3, 0, 0.15]] }); confetti('c18', 27.9, 50); },
  ui() { jAcc(); slamNum('– 200.000 €', 28.9, 620, 84, '#ff6b6b'); },
  sfx: [[27.9, 'applause', 1.2], [28.9, 'cashReg'], [29.1, 'descend']] });
// ---- 19 · "2 Millionen weg," — Jonas on deck throws bills over the railing; the account big: 18 Mio.
S(29.6, { tr: 'zoomIn', cam: [[29.6, 540, 1040, 1.3], [30.73, 540, 1020, 1.4]], shake: [[29.7, 16, 0.35]],
  draw() { setYachtDeck({ blur: 4 }); char('jonas', 540, FLOOR + 60, 0.95, { pose: [[29.6, 'throwR'], [29.9, 'throwR2', 0.1], [30.2, 'throwR', 0.1]], emo: [[0, 'laugh']], extras: { glasses: true, shades: 1, chain: 1 } }); cash('j19', 29.7, 26, { burst: [700, 800] }); },
  ui() { jAcc({ scale: 0.75 }); slamNum('– 2 MIO. 💸', 29.75, 560, 100, '#ff6b6b'); },
  sfx: [[29.7, 'cashCannon'], [29.75, 'slam'], [30.2, 'swish', 1.1]] });
// ---- 20 · "…und ich bin immer noch steinreich!" — champagne spray, he poses on the bow
S(30.73, { tr: 'whipL', cam: CLOSEJ(30.73, 32.69), punch: [[31.6, 0.07]],
  draw() { setYachtDeck({ blur: 8 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'raiseR']], emo: [[30.73, 'grin'], [31.4, 'laugh']], extras: { glasses: true, shades: 1, chain: 1 }, holdR: () => champBottle(0, 60, 0.42, -0.3, { spray: 1 }) }); },
  ui() { jAcc({ scale: 0.6 }); popText('NOCH STEINREICH! 🤑', 540, 520, 31.4, 58, PAL.yellow, -0.04, 0); },
  sfx: [[30.8, 'pop', 0.6], [30.85, 'slurp', 1.2], [31.4, 'bling'], [32.0, 'applause', 0.7]] });

// =====================================================================  MEANWHILE KEVIN (+0,50 € all the time)
// ---- 21 · "Doch während Jonas auf seiner Yacht anstößt," — glasses clink on deck
S(32.69, { tr: 'slide', lift: 0, cam: [[32.69, 540, 1080, 1.0], [34.54, 540, 1060, 1.08]],
  draw() { setYachtDeck({ night: 1, blur: 2 }); char('mia', 280, 1740, 0.7, { pose: [[0, 'drinkR']], emo: [[0, 'laugh']], holdR: () => champGlass(0, 60, 0.55, 0.8) });
    char('jonas', 760, 1740, 0.75, { pose: [[0, 'drinkR']], emo: [[0, 'laugh']], flip: 1, extras: { glasses: true, shades: 1, chain: 1 }, holdR: () => champGlass(0, 60, 0.55, 0.8) }); if (TT > 33.6 && TT < 34.1) sparkle(520, 1050, 60 * (1 - (TT - 33.6) / 0.5), '#fff', TT * 6); },
  ui() { info('PROST! 🥂', 33.62, { y: 400, bg: PAL.pink, size: 60 }); },
  sfx: [[33.6, 'glassClink'], [33.62, 'pop', 1], [33.9, 'applause', 0.6]] });
// ---- 22 · "…verdient Kevin sogar im Stau." — Kevin in his little car in a traffic jam, relaxed, the +0,50 € keep popping
S(34.54, { tr: 'whipR', lift: 0, cam: [[34.54, 540, 1160, 1.2], [36.83, 540, 1140, 1.3]],
  draw() { setTraffic(); char('kevin', 470, 1340, 0.6, { pose: [[0, 'idle']], emo: [[34.54, 'calm'], [35.4, 'grin']], look: [0.5, -0.4] }); compactCar(540, 1480, 0.95, '#2f6df6'); plus50(560, 1000, 2, 34.6, 'p22', 200); },
  ui() { kevinTicker(540, 300, 0.75, 34.6, 1000); info('KEVIN IM STAU 🚗', 35.0, { y: 470, bg: PAL.blue, size: 52 }); },
  sfx: [[34.6, 'carHorn'], [35.0, 'pop', 1], [35.4, 'coin', 1.2], [35.9, 'coin', 1.3], [36.4, 'carHorn']] });
// ---- 23 · "Und während Jonas' Gäste…" — the guests at the bar raise their glasses
S(36.83, { tr: 'zoomOut', lift: 0, cam: [[36.83, 540, 1080, 1.0], [38.57, 540, 1060, 1.08]],
  draw() { setYachtDeck({ night: 1, blur: 3 }); [['lea', 260], ['zoe', 540], ['mia', 820]].forEach(([id, x], i) => char(id, x, 1740, 0.66, { pose: [[0, 'drinkR']], emo: [[0, i === 1 ? 'happy' : 'laugh']], holdR: () => champGlass(0, 60, 0.55, 0.9) })); },
  ui() { info('JONAS\' GÄSTE 🥂', 37.0, { y: 400, bg: PAL.pink, size: 56 }); },
  sfx: [[37.0, 'pop', 1], [37.3, 'glassClink'], [37.9, 'applause', 0.6]] });
// ---- 24 · "…ein Glas Champagner trinken," — one flute empties in a single gulp
S(38.57, { tr: 'cut', lift: 0, cam: [[38.57, 540, 980, 1.0], [39.57, 540, 960, 1.1]],
  draw() { setDark('#4a1a5a', '#0a0418'); glow(540, 900, 500, '#ffd23f', 0.25); champGlass(540, 1280, 1.8, 1 - clamp((TT - 38.7) / 0.7)); },
  ui() { info('1 GLAS 🥂', 38.62, { y: 400, bg: PAL.yellow, fg: '#1b1530', size: 60 }); },
  sfx: [[38.62, 'pop', 1], [38.75, 'gulp'], [39.1, 'gulp']] });
// ---- 25 · "…verdient Kevin die ganze Flasche." — Kevin holds up a giant bottle while coins pour around it
S(39.57, { tr: 'whipU', lift: 0, cam: [[39.57, 540, 1060, 1.05], [41.52, 540, 1040, 1.15]], punch: [[40.6, 0.07]],
  draw() { rays('#1a6a2a', '#2fae55', { cy: 800, spin: 0.25 }); char('kevin', 540, 1720, 0.95, { pose: [[0, 'raiseR']], emo: [[39.57, 'smug'], [40.6, 'grin']], look: [0.2, -0.5], holdR: () => champBottle(0, 80, 0.8, -0.1) }); plus50(540, 1000, 2, 39.6, 'p25', 300); },
  ui() { kevinTicker(540, 300, 0.75, 39.6, 1000); popText('DIE GANZE FLASCHE! 🍾', 540, 520, 40.6, 62, PAL.yellow, -0.04, 0); },
  sfx: [[39.7, 'whooshUp', 1], [40.6, 'bling'], [40.9, 'coin', 1.2], [41.2, 'coin', 1.3]] });
// ---- 26 · "Dadurch hat Kevin nach nur einer Woche" — the calendar: seven days crossed in a row
S(41.52, { tr: 'iris', lift: 0, raise: 0, cam: [[41.52, 560, 820, 1.35], [43.17, 560, 810, 1.45]],
  draw() { setLeoRoom({ blur: 6 }); const n = 1 + Math.floor(clamp((TT - 41.6) / 1.1) * 6), p = clamp(((TT - 41.6) / 1.1 * 6) % 1 + (n >= 7 ? 1 : 0)); ctx.save(); ctx.translate(560, 820); wallCalendar(0, 0, 1.0, n, { p }); ctx.restore(); },
  ui() { info('1 WOCHE 📅', 42.2, { y: 330, bg: PAL.red, size: 60 }); },
  sfx: [[41.6, 'pencil', 0.2], [41.8, 'pencil', 0.2], [42.0, 'pencil', 0.2], [42.2, 'pop', 1], [42.4, 'pencil', 0.2], [42.6, 'pencil', 0.2], [42.75, 'ding']] });
// ---- 27 · "…schon über 300.000 Euro." — Kevin's account slams to 302.400 €, a stack of cash
S(43.17, { tr: 'zoomIn', lift: 0, cam: [[43.17, 540, 1040, 1.0], [45.49, 540, 1020, 1.1]], shake: [[44.1, 16, 0.4]],
  draw() { rays('#1d48b8', '#2f6df6', { cy: 900, spin: 0.25 }); cashMountain(540, 1500, 0.8, clamp((TT - 43.3) / 0.6)); char('kevin', 540, 1720, 0.9, { pose: [[43.17, 'idle'], [44.1, 'cheer', 0.2]], emo: [[43.17, 'happy'], [44.1, 'laugh']] }); cash('k27', 44.1, 22); },
  ui() { hud('KONTO · KEVIN', [[0, 1000], [43.3, 1000], [44.1, 302400]], { x: 540, y: 330, scale: 0.85, t0: 43.25 }); info('ÜBER 300.000 € 🤯', 44.2, { y: 520, bg: PAL.green, size: 56 }); },
  sfx: [[43.3, 'coinTicks', 0.8, 5], [44.1, 'cashCannon'], [44.2, 'pop', 1]] });

// =====================================================================  6 MONTHS LATER: THE VIDEO CALL
// ---- 28 · "Trotzdem kann Jonas es nicht lassen:" — on his lounger he grabs the phone, a cheeky grin
S(45.49, { tr: 'whipL', cam: CLOSEJ(45.49, 47.57),
  draw() { setYachtDeck({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[45.49, 'idle'], [46.2, 'phoneR', 0.2]], emo: [[45.49, 'smug'], [46.4, 'grin']], look: [0.4, 0], extras: { glasses: true, shades: 1, chain: 1 }, holdR: () => (TT > 46.2 ? phone(0, -30, 0.32, 0.15, () => { ctx.fillStyle = '#2f6df6'; ctx.fillRect(-84, -176, 168, 352); }) : null) }); },
  ui() { info('ER KANN ES NICHT LASSEN 😈', 45.6, { y: 400, bg: PAL.red, size: 48 }); },
  sfx: [[45.6, 'pop', 1], [46.2, 'swish', 1.1], [46.6, 'phoneTap'], [46.85, 'phoneTap']] });
// ---- 29 · "Sechs Monate später" — the month calendar flips JAN -> JUL
S(47.57, { tr: 'glitch', lift: 0, cam: [[47.57, 540, 960, 1.0], [48.65, 540, 940, 1.1]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); const M = ['JANUAR', 'FEBRUAR', 'MÄRZ', 'APRIL', 'MAI', 'JUNI', 'JULI'], m = Math.min(6, Math.floor(clamp((TT - 47.6) / 0.75) * 6.99)); const k = springEase(TT - 47.6, 240, 13); ctx.save(); ctx.translate(540, 1000); ctx.scale(k, k); monthCal(0, 0, 1.25, M[m]); ctx.restore(); },
  ui() { info('6 MONATE SPÄTER', 47.62, { y: 380, bg: PAL.orange, size: 60 }); },
  sfx: [[47.62, 'pop', 1], [47.7, 'flip'], [47.85, 'flip', 1.1], [48.0, 'flip', 1.2], [48.15, 'flip', 1.3], [48.3, 'flip', 1.4]] });
// ---- 30 · "…ruft er Kevin per Videocall an." — Kevin's phone rings in his room, next to the calendar
S(48.65, { tr: 'whipR', lift: 0, cam: [[48.65, 600, 1060, 1.1], [50.54, 600, 1040, 1.2]],
  draw() { calWall(3, 35, 1, { x: 800, y: 700, s: 0.7, start: 180 }); const ring = TT > 48.75 ? Math.sin(TT * 60) * 0.06 : 0; char('kevin', 400, FLOOR + 80, 0.95, { pose: [[48.65, 'idle'], [49.6, 'phoneR', 0.2]], emo: [[48.65, 'neutral'], [49.6, 'calm']], look: [0.4, -0.2], holdR: () => (TT > 49.6 ? phone(0, -30, 0.32, 0.15, () => { ctx.fillStyle = '#e2453c'; ctx.fillRect(-84, -176, 168, 352); tText('JONAS', 0, -40, 26, { color: '#fff', shadow: false }); }) : null) });
    if (TT < 49.6) { ctx.save(); ctx.translate(760, 1290); ctx.rotate(ring); phone(0, 0, 0.5, 0, () => { ctx.fillStyle = '#e2453c'; ctx.fillRect(-84, -176, 168, 352); tText('JONAS', 0, -60, 26, { color: '#fff', shadow: false }); tText('VIDEOCALL', 0, -20, 16, { color: '#fff', shadow: false }); circ(-34, 130, 18, '#ff3b4a'); circ(34, 130, 18, '#41f08a'); }); ctx.restore(); } },
  ui() { info('VIDEOCALL 📱', 48.8, { y: 400, bg: PAL.blue, size: 56 }); },
  sfx: [[48.75, 'ringtone'], [48.8, 'pop', 1], [49.6, 'click'], [49.9, 'notify']] });
// ---- 31 · "Na, immer noch am Tage zählen?" — on Kevin's screen: Jonas on his yacht, mocking
S(50.54, { tr: 'zoomIn', lift: 0, raise: 40, cam: [[50.54, 540, 960, 1.0], [52.28, 540, 950, 1.06]],
  draw() { setLeoRoom({ blur: 12 }); callScreen(540, 960, 3.4, () => { ctx.save(); ctx.scale(0.17, 0.17); ctx.translate(-540, -1050); setYachtDeck(); char('jonas', 540, 1900, 1.2, { pose: [[0, 'pointR']], emo: [[50.54, 'smug'], [51.4, 'laugh']], extras: { glasses: true, shades: 1, chain: 1 } }); ctx.restore(); }, 'JONAS · VIDEOCALL'); },
  ui() { info('„IMMER NOCH TAGE ZÄHLEN?" 😂', 50.65, { y: 260, bg: PAL.yellow, fg: '#1b1530', size: 42 }); },
  sfx: [[50.6, 'notify'], [50.65, 'pop', 1.1], [51.4, 'popHi', 1], [51.6, 'waves', 0.6]] });
// ---- 32 · "Schau mal, so sieht ein echtes Leben aus!" — he flips the camera: the yacht, the sea, the party
S(52.28, { tr: 'whipL', lift: 0, raise: 40, cam: [[52.28, 540, 960, 1.0], [54.66, 540, 950, 1.06]],
  draw() { setLeoRoom({ blur: 12 }); const flip = clamp((TT - 52.4) / 0.3); callScreen(540, 960, 3.4, () => { ctx.save(); ctx.scale(Math.abs(Math.cos(flip * Math.PI)) || 0.02, 1);
      if (flip < 0.5) { ctx.save(); ctx.scale(0.17, 0.17); ctx.translate(-540, -1050); setYachtDeck(); char('jonas', 540, 1900, 1.2, { emo: [[0, 'smug']], extras: { glasses: true, shades: 1, chain: 1 } }); ctx.restore(); }
      else { ctx.save(); ctx.scale(0.17, 0.17); ctx.translate(-540, -1100); setSea(); bigYacht(540, 1330, 0.8, { party: 1 }); for (const [id, x] of [['mia', 250], ['lea', 830]]) char(id, x, 1700, 0.5, { pose: [[0, 'cheer']], emo: [[0, 'laugh']] }); ctx.restore(); } ctx.restore(); }, 'JONAS · VIDEOCALL'); },
  ui() { info('„SO SIEHT ECHTES LEBEN AUS!"', 53.0, { y: 260, bg: PAL.blue, size: 42 }); },
  sfx: [[52.4, 'swish', 1.2], [52.6, 'waves', 1.4], [53.0, 'pop', 1], [53.6, 'applause', 0.7], [54.2, 'shipHorn']] });
// ---- 33 · "Kevin antwortet nur:" — Kevin, calm, phone to his ear, a long look
S(54.66, { tr: 'zoomIn', tense: 1, cam: CLOSE(54.66, 55.95),
  draw() { calWall(10, 35, 1, { x: 820, y: 700, s: 0.7, start: 180 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'phoneR']], emo: [[0, 'calm']], look: [0.2, 0], holdR: () => phone(0, -30, 0.32, 0.15, () => { ctx.fillStyle = '#e2453c'; ctx.fillRect(-84, -176, 168, 352); }) }); },
  ui() {},
  sfx: [[54.7, 'swish', 0.8], [55.2, 'tension', 0.7]] });
// ---- 34 · "Pass auf die Wellen auf." — he raises a finger; the warning in a speech bubble
S(55.95, { tr: 'cut', tense: 1, cam: [[55.95, 540, 990, 1.85], [57.17, 540, 975, 2.0]], punch: [[56.5, 0.07]],
  draw() { calWall(10, 35, 1, { x: 820, y: 700, s: 0.7, start: 180 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'pointUpR']], emo: [[55.95, 'calm'], [56.5, 'smug']], look: [0, -0.1] }); },
  ui() { info('„PASS AUF DIE WELLEN AUF." 🌊', 56.05, { y: 400, bg: PAL.blue, size: 46 }); },
  sfx: [[56.05, 'pop', 1], [56.5, 'ting'], [56.7, 'waves', 0.8]] });
// ---- 35 · "Genau in dem Moment trifft eine riesige Welle…" — at sea the yacht; behind it a giant wave rises
S(57.17, { tr: 'whipR', tense: 1, lift: 0, cam: [[57.17, 540, 1080, 1.0], [58.96, 540, 980, 0.92]], shake: [[57.6, 8, 1.4]],
  draw() { setSea(); bigWave(700, 1250, 1.0, clamp((TT - 57.3) / 1.6)); bigYacht(460, 1350, 0.8, { name: 'JONAS I' }); char('jonas', 360, 1150, 0.28, { pose: [[0, 'phoneR']], emo: [[0, 'laugh']], extras: { glasses: true, shades: 1 } }); },
  ui() { info('EINE RIESIGE WELLE! 🌊', 57.9, { y: 400, bg: PAL.red, size: 52 }); },
  sfx: [[57.3, 'waves', 1.8], [57.4, 'rumble'], [57.9, 'pop', 1]] });
// ---- 36 · "…die Yacht." — the wave breaks over the yacht: a massive splash
S(58.96, { tr: 'cut', lift: 0, cam: [[58.96, 540, 1060, 1.1], [60.47, 540, 1060, 1.2]], shake: [[60.1, 26, 0.6]],
  draw() { setSea(); bigYacht(520, 1350, 0.9, { name: 'JONAS I' }); bigWave(620, 1300, 1.05, 1, clamp((TT - 59.3) / 0.8)); if (TT > 60.1) { ctx.save(); ctx.globalAlpha = clamp(1 - (TT - 60.1) / 0.5); ctx.fillStyle = '#e6faff'; ctx.fillRect(-600, -400, 2300, 2800); ctx.restore(); } splash(520, 1250, 60.1, 3.0); },
  ui() { if (TT > 60.1) popText('PLATSCH! 💦', 540, 450, 60.1, 110, '#52b8ff', -0.06, 0); },
  sfx: [[59.3, 'whooshDown', 0.6], [60.1, 'splashSfx'], [60.12, 'boom'], [60.2, 'waves', 2.0]] });
// ---- 37 · "Jonas ist klatschnass." — Jonas soaked: hair flat, glasses fogged, a fish on his head, dripping
S(60.47, { tr: 'zoomIn', cam: CLOSEJ(60.47, 62.38),
  draw() { setYachtDeck({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'sad']], emo: [[60.47, 'shock'], [61.3, 'sad']], extras: JWET, look: [0, 0.2] });
    const fy = 625 + Math.sin(TT * 14) * 6; ctx.save(); ctx.translate(560, fy); ctx.rotate(Math.sin(TT * 10) * 0.15); ell(0, 0, 70, 28, '#f08a24'); poly([[60, 0], [110, -30], [110, 30]], '#f08a24'); circ(-40, -6, 7, '#1b1530'); ctx.restore();
    drips(540, 760, 380, 14, 'd37'); drips(540, 1300, 500, 10, 'd37b'); },
  ui() { popText('KLATSCHNASS! 💦', 540, 400, 60.55, 78, '#8fdcff', -0.04, 0); },
  sfx: [[60.55, 'pop', 1], [60.7, 'drip'], [61.0, 'drip'], [61.3, 'sadTrombone', 0.8], [62.0, 'drip']] });

// =====================================================================  THE LAST DAY
// ---- 38 · "Schließlich streicht Kevin den letzten…" — Kevin in front of the calendar, marker up: day 364 done
S(62.38, { tr: 'iris', lift: 0, cam: [[62.38, 600, 1040, 1.1], [64.26, 620, 1010, 1.2]],
  draw() { calWall(2, 34, 1, { x: 780, y: 720, s: 0.85, start: 331, last: 1 }); char('kevin', 360, FLOOR + 80, 0.95, { pose: [[0, 'raiseR']], emo: [[62.38, 'serious'], [63.5, 'smug']], look: [0.7, -0.4], holdR: () => marker(0, -20, 0.9, 0.4) }); },
  ui() { info('DER LETZTE TAG 📅', 62.5, { y: 380, bg: PAL.red, size: 56 }); },
  sfx: [[62.5, 'pop', 1], [63.0, 'heartbeat', 1.2]] });
// ---- 39 · "…Tag im Kalender durch." — close: day 365 gets its red X — the year is over
S(64.26, { tr: 'zoomIn', lift: 0, raise: 0, tense: 1, cam: [[64.26, 760, 1060, 1.9], [65.72, 760, 1050, 2.05]], punch: [[65.0, 0.08]],
  draw() { const p = clamp((TT - 64.4) / 0.55); setLeoRoom({ blur: 6 }); ctx.save(); ctx.translate(560, 820); wallCalendar(0, 0, 1.0, 35, { p, start: 331, last: 1 }); ctx.restore();
    const cx = 770 - 24 + 48 * (p < 0.5 ? p * 2 : 1) - (p > 0.5 ? 48 * (p - 0.5) * 2 : 0), cy = 1046 - 24 + 48 * (p < 0.5 ? p * 2 : (p - 0.5) * 2); marker(cx, cy, 1.0, -0.5); },
  ui() { info('1 JAHR IST UM! ⏰', 65.0, { y: 380, bg: PAL.yellow, fg: '#1b1530', size: 56 }); },
  sfx: [[64.4, 'pencil', 0.28], [64.7, 'pencil', 0.28], [65.0, 'alarmRing', 0.6]] });
// ---- 40 · "Deshalb steht Jonas noch am selben Abend vor seiner Tür." — evening, Jonas walks up and rings
S(65.72, { tr: 'whipL', lift: 0, cam: [[65.72, 540, 1020, 1.0], [68.64, 560, 1000, 1.08]],
  draw() { setKevinDoor(); const x = lerp(-150, 300, EZ.o2(clamp((TT - 65.75) / 1.1))); char('jonas', x, 1640, 0.85, { walk: TT < 66.85 ? 1 : 0, pose: [[65.72, 'idle'], [67.3, 'pressR', 0.1]], emo: [[0, 'serious']], look: [0.6, -0.1], extras: JON }); },
  ui() { info('AM SELBEN ABEND 🌙', 65.9, { y: 380, bg: '#141026', size: 54 }); },
  sfx: [[65.75, 'footsteps', 1.1], [65.9, 'pop', 1], [67.4, 'doorbell']] });
// ---- 41 · "Na los, zeig her, wie viel du hast!" — Jonas, impatient, points at Kevin (the door open behind)
S(68.64, { tr: 'zoomIn', tense: 1, cam: CLOSEJ(68.64, 70.39),
  draw() { setKevinDoor({ blur: 9, open: 1 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[68.64, 'hips'], [69.2, 'pointR', 0.15]], emo: [[68.64, 'grin'], [69.2, 'angry']], extras: JON }); },
  ui() { info('„ZEIG HER!" 👉', 69.1, { y: 400, bg: PAL.red, size: 60 }); },
  sfx: [[68.7, 'creak'], [69.1, 'pop', 1.1], [69.5, 'whoosh', 1.1]] });
// ---- 42 · "Kevin grinst und klappt seinen Laptop auf." — a grin, the laptop opens: the number stays hidden
S(70.39, { tr: 'whipR', tense: 1, lift: 0, cam: [[70.39, 540, 1040, 1.0], [71.9, 540, 1000, 1.12]],
  draw() { setLeoDesk({ blur: 10 }); char('kevin', 540, 1180, 0.7, { pose: [[0, 'armsCross']], emo: [[70.39, 'neutral'], [70.6, 'grin']], look: [0, 0.4] }); const op = EZ.o3(clamp((TT - 70.9) / 0.7)); laptopOpen(540, 1330, 0.85, op, (h) => { ctx.save(); ctx.translate(0, -h / 2); blurCounter(0, 0, 520, 200, 'KONTO · KEVIN'); ctx.restore(); }); },
  ui() { info('KEVIN GRINST 😏', 70.45, { y: 380, bg: PAL.blue, size: 54 }); },
  sfx: [[70.45, 'pop', 1], [70.9, 'creak', 1.6], [71.4, 'powerOn']] });
// ---- 43 · both lean in to the glowing screen (two-shot, tension)
S(71.9, { tense: 1, tr: 'cut', lift: 200, cam: [[71.9, 540, 1150, 1.05], [72.86, 540, 1110, 1.16]],
  draw() { setLeoRoom({ blur: 5 }); glow(540, 1150, 400, '#52b8ff', 0.3);
    char('kevin', 330, FLOOR + 40, 0.9, { pose: [[0, 'hips']], emo: [[0, 'smug']], look: [0.6, 0.5], lean: [[71.9, 0], [72.1, 0.12, 0.6]] });
    char('jonas', 760, FLOOR + 40, 0.9, { pose: [[0, 'armsCross']], emo: [[0, 'scared']], look: [-0.6, 0.5], lean: [[71.9, 0], [72.1, -0.12, 0.6]], extras: JON });
    laptopOpen(545, FLOOR - 120, 0.5, 1, (h) => { ctx.save(); ctx.translate(0, -h / 2); blurCounter(0, 0, 520, 200, 'KONTO · KEVIN'); ctx.restore(); }); },
  ui() {},
  sfx: [[71.95, 'heartbeat', 1.0], [72.2, 'tension', 0.6]] });

// =====================================================================  THE QUESTION — even split, both enter at once
const YD = 900;
function splitEven(top, bottom) {
  ctx.save(); ctx.beginPath(); ctx.rect(-300, -400, 1700, YD + 400); ctx.clip(); top(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-300, YD, 1700, 1500); ctx.clip(); bottom(); ctx.restore(); line(-300, YD, 1400, YD, 14, '#ffffff');
}
function finalSplit(k) {
  splitEven(() => { setSea({ blur: 6 }); ctx.fillStyle = 'rgba(120,20,20,0.25)'; ctx.fillRect(-300, -400, 1700, 1400); char('jonas', 300 - (1 - k) * 760, 860, 0.6, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], extras: JON, lean: (1 - k) * 0.25 }); },
    () => { setLeoRoom({ blur: 6 }); ctx.fillStyle = 'rgba(20,40,140,0.3)'; ctx.fillRect(-300, YD, 1700, 1400); char('kevin', 300 + (1 - k) * 760, 1800, 0.6, { pose: [[0, 'hips']], emo: [[0, 'smug']], lean: -(1 - k) * 0.25 }); });
}
function kevinQ(x, y, s) { const g = Math.sin(TT * 40) * (Math.sin(TT * 3) > 0.6 ? 10 : 0); ctx.save(); ctx.translate(x + g, y); ctx.scale(s, s); fillRR(-280, -105, 560, 210, 26, '#141026'); tText('KONTO · KEVIN', 0, -72, 26, { color: '#9f95c9', shadow: false, letter: 4 }); tText('??? €', 0, 26, 100, { color: PAL.yellow, stroke: '#3a2400', strokeW: 16 }); ctx.restore(); }
// ---- 44 · "Jonas hat noch 18 Millionen." — Jonas on top with 18.000.000 €, Kevin below: ???
S(72.86, { tr: 'glitch', tense: 1, capY: YD, raise: 0, cam: [[72.86, 540, 960, 1.0], [74.96, 540, 960, 1.03]],
  draw() { finalSplit(springEase(TT - 72.88, 170, 13)); },
  ui() { hud('KONTO · JONAS', [[0, 18e6]], { x: 740, y: 560, scale: 0.62, t0: 72.95 }); { const kk = springEase(TT - 72.98, 260, 14); kevinQ(740, 1480, 0.66 * kk); } },
  sfx: [[72.9, 'whoosh', 1.1], [72.95, 'cashReg'], [73.0, 'pop', 1], [73.8, 'coinTicks', 0.6, 5]] });
// ---- 45 · "Aber wie viel hat Kevin nach einem Jahr?" — the question, a punch-in, the "???" glitches
S(74.96, { tr: 'cut', tense: 1, capY: YD, raise: 0, cam: [[74.96, 540, 960, 1.0], [77.6, 540, 960, 1.06]], punch: [[75.7, 0.05]],
  draw() { finalSplit(1); },
  ui() { hud('KONTO · JONAS', [[0, 18e6]], { x: 740, y: 560, scale: 0.62 }); kevinQ(740, 1480, 0.66); info('WIE VIEL HAT KEVIN? 🤔', 75.0, { y: 270, bg: PAL.yellow, fg: '#1b1530', size: 50 }); },
  sfx: [[75.0, 'pop', 1], [75.1, 'glitch'], [75.7, 'heartbeat', 1.6]] });
