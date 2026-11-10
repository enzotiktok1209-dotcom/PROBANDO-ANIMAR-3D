// =====================================================================
//  shots.js — 50 Millionen sofort vs 2 € pro Sekunde, 1 Jahr (DE). ~50 shots on the trimmed voice (74.65 s).
//  Kevin chooses first (2 €/s), Jonas takes 50 Mio.: villa in Berlin 10 Mio., 40 Mio. in shares (summer crash, +10 %) = 44 Mio. + villa.
//  Kevin: 2 € x 31.536.000 s = 63.072.000 € -> Kevin wins (never said on screen).
//  New outfits: Kevin in a green jacket and a yellow beanie, Jonas in a navy blazer with a white shirt.
// =====================================================================
Object.assign(LOOKS.kevin, { top: '#2fae55', topD: '#1f8a3e', topL: '#5ac878', beanie: '#ffcf33', beanieD: '#e0aa10', pants: '#2a2f45', pantsD: '#1c2033' });
Object.assign(LOOKS.jonas, { top: '#1d2a4a', topD: '#121c34', topL: '#2c3d66', blazer: 1, pants: '#3a3f52', pantsD: '#262a38' });
const BERATER = { look: { top: '#3a3f52', topD: '#262a38', blazer: 1, hair: '#6a6f86', hairD: '#4a4f66' }, glasses: true };
function popText(str, x, y, t0, size, col, rot = 0, rise = 40) { if (TT < t0) return; const k = springEase(TT - t0, 300, 12); ctx.save(); ctx.translate(x, y - (TT - t0) * rise); ctx.rotate(rot); ctx.scale(k, k); tText(str, 0, 0, size, { color: col, stroke: '#1b0f2e', strokeW: size * 0.2, maxW: 980 }); ctx.restore(); }
function info(str, t0, o = {}) { sticker(str, o.x ?? 540, o.y ?? 380, t0, { bg: o.bg ?? '#141026', fg: o.fg, size: o.size ?? 54, rot: o.rot ?? -0.03, out: o.out }); }
function slamNum(str, t0, y = 400, size = 104, col = PAL.yellow) { if (TT < t0) return; const k = springEase(TT - t0, 300, 11), sc = k * (1 + 0.6 * Math.max(0, 1 - (TT - t0) / 0.12)); ctx.save(); ctx.translate(540, y); ctx.scale(sc, sc); tText(str, 0, 0, size, { color: col, stroke: '#3a2400', strokeW: size * 0.2, maxW: 1000 }); ctx.restore(); }
const CLOSE = (t0, t1, x = 540) => [[t0, x, 1000, 1.65], [t1, x, 978, 1.8]];
const CLOSEJ = (t0, t1) => [[t0, 540, 1000, 1.72], [t1, 540, 980, 1.88]];
const cash = (seed, t0, n = 22, o = {}) => { if (TT > t0) billRain(seed, t0, n, { spread: 1.5, ...o }); };
const kRoom = (b = 8) => setGamerRoom({ blur: b });
const JON = { glasses: true };
function fingerArm(id, x0, y0, x1, y1, w = 130) {
  const L = LOOKS[id]; line(x0, y0, x1, y1, w, L.top); line(x0 + w * 0.18, y0, x1 + w * 0.12, y1, w * 0.25, L.topD);
  const a = Math.atan2(y1 - y0, x1 - x0); circ(x1 - Math.cos(a) * w * 0.2, y1 - Math.sin(a) * w * 0.2, w * 0.52, L.topD);
  ctx.save(); ctx.translate(x1 + Math.cos(a) * w * 0.3, y1 + Math.sin(a) * w * 0.3); ctx.rotate(a); circ(0, 0, w * 0.5, L.skin); fillRR(w * 0.2, -w * 0.16, w * 0.85, w * 0.32, w * 0.16, L.skin); circ(w * 0.05, w * 0.42, w * 0.2, L.skinD); ctx.restore();
}
function iconCard(x, y, top, big, sub, col, t0, icon) {
  if (TT < t0) return; const k = springEase(TT - t0, 260, 15), w = 450, h = 380;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  fillRR(-w / 2 + 8, -h / 2 + 12, w, h, 28, 'rgba(0,0,0,0.38)'); fillRR(-w / 2, -h / 2, w, h, 28, col); fillRR(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 22, shade(col, 0.12));
  tText(top, 0, -h / 2 + 36, 26, { color: 'rgba(255,255,255,0.9)', shadow: false, letter: 3, weight: 800 });
  fillRR(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18, 'rgba(10,8,30,0.4)');
  const ik = springEase(TT - t0 - 0.12, 280, 12), bob = Math.sin(TT * 3 + x) * 4;
  ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18); ctx.clip(); ctx.translate(0, -h / 2 + 147 + bob); ctx.scale(ik, ik);
  if (icon === 'cash') { glow(0, 0, 200, '#a6f0b4', 0.3); briefcase(0, 60, 0.42, 1); } else { glow(0, 0, 200, '#ffe08a', 0.3); coin2(-60, 0, 60, { sx: Math.cos(TT * 4) }); stopwatch(90, 20, 0.22, TT); }
  ctx.restore();
  tText(big, 0, h / 2 - 92, 46, { color: '#fff', maxW: w - 36 }); tText(sub, 0, h / 2 - 40, 26, { color: 'rgba(255,255,255,0.95)', shadow: false, weight: 800, maxW: w - 40 });
  ctx.restore();
}
// Jonas stands left (green: the money), Kevin right (orange: 2 € per second)
const cards = (t0) => { tText('WAS NIMMST DU?', 540, 200, 66, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14, maxW: 1000 });
  iconCard(285, 462, 'SOFORT', '50 MIO. €', 'AUF DIE HAND', PAL.green, t0, 'cash'); iconCard(795, 462, '1 JAHR LANG', '2 € / SEKUNDE', 'JEDE SEKUNDE', PAL.orange, t0 + 0.06, 'coin'); tText('VS', 540, 462, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); };
const duoStudio = (jT = {}, kT = {}, o = {}) => { setStudio(o); char('jonas', 300, FLOOR - 40, 0.8, { emo: [[0, 'happy']], look: [0.4, -0.4], extras: JON, ...jT }); char('kevin', 780, FLOOR - 40, 0.8, { emo: [[0, 'grin']], look: [-0.3, -0.3], ...kT }); };
const CRASH = [[0, 0.5], [0.15, 0.56], [0.3, 0.6], [0.45, 0.3], [0.55, 0.22], [0.7, 0.4], [0.85, 0.55], [1, 0.66]];

// =====================================================================  THE HOOK
// ---- 1 · "50 Millionen…" — a wall of cash slams in (hard punch-in on frame one), the number lands
S(0.0, { tr: 'cut', lift: 0, cam: [[0, 540, 960, 2.4], [0.22, 540, 960, 1.0], [1.19, 540, 950, 1.1]], shake: [[0.33, 16, 0.4]],
  draw() { rays('#9a6a00', '#e8b400', { cy: 940, spin: 0.35 }); glow(540, 1000, 700, '#fff2b0', 0.4); cashMountain(540, 1300, 1.3, clamp(TT / 0.4)); if (TT > 0.33) billRain('h1', 0.33, 30, { burst: [540, 900], spread: 0.9 }); },
  ui() { slamNum('50.000.000 €', 0.33, 400, 116); },
  sfx: [[0.02, 'impact'], [0.33, 'cashCannon']] });
// ---- 2 · "…sofort?" — a briefcase snaps open towards the camera
S(1.19, { tr: 'zoomIn', lift: 0, cam: [[1.19, 540, 980, 1.0], [1.9, 540, 960, 1.12]],
  draw() { setDark('#1a3a20', '#04100a'); glow(540, 1000, 500, '#41f08a', 0.3); ctx.save(); ctx.translate(540, 1100); briefcase(0, 0, 1.25, clamp((TT - 1.22) / 0.25)); ctx.restore(); },
  ui() { info('SOFORT ⚡', 1.25, { y: 380, bg: PAL.red, size: 76 }); },
  sfx: [[1.22, 'cardIn'], [1.3, 'bling']] });
// ---- 3 · "Oder 2 Euro pro…" — under a single spotlight, one 2-euro coin drops and spins on the table
S(1.9, { tr: 'whipL', lift: 0, cam: [[1.9, 540, 1000, 1.0], [3.2, 540, 990, 1.15]],
  draw() { setDark('#2a2a3a', '#05050a', { cone: 1 }); const u = clamp((TT - 1.95) / 0.45), y = lerp(-200, 1060, EZ.i3(u)) - (u >= 1 ? Math.abs(Math.sin((TT - 2.4) * 9)) * 60 * Math.exp(-(TT - 2.4) * 3) : 0); ell(540, 1180, 300, 50, 'rgba(0,0,0,0.35)'); coin2(540, y, 170, { sx: Math.cos(TT * 9) }); },
  ui() { slamNum('2 €', 2.55, 380, 140, '#ffd23f'); },
  sfx: [[2.0, 'whooshDown', 1.2], [2.4, 'coinBounce'], [2.55, 'pop', 1.1]] });
// ---- 4 · "…Sekunde, ein Jahr lang?" — a stopwatch ticks; every second "+2 €" pops off it
S(3.2, { tr: 'cut', lift: 0, cam: [[3.2, 540, 980, 1.0], [4.64, 540, 960, 1.1]],
  draw() { rays('#3a1a6a', '#5a2bd6', { cy: 900, spin: 0.2 }); stopwatch(540, 1000, 1.05, TT * 6); plus2(540, 700, 3, 3.25, 'p4'); },
  ui() { info('JEDE SEKUNDE · 1 JAHR ⏱️', 3.84, { y: 360, bg: PAL.orange, size: 52 }); },
  sfx: [[3.25, 'tickRun', 1.3], [3.84, 'pop', 1], [4.3, 'coin', 1.2]] });
// ---- 5 · "Wer ist am Ende reicher?" — a balance: the cash pile against a pile of 2-euro coins, rocking
S(4.64, { tr: 'zoomOut', lift: 0, tense: 1, cam: [[4.64, 540, 960, 1.0], [5.99, 540, 950, 1.1]],
  draw() { rays('#2a1660', '#3d1f8a', { cy: 900, spin: 0.08 }); const tilt = Math.sin(TT * 3.2) * 0.22 * clamp((TT - 4.7) / 0.3);
    balance(540, 1380, 1.0, tilt, () => { cashMountain(0, -10, 0.3, 1); }, () => { for (let i = 0; i < 6; i++) coin2(-50 + (i % 3) * 50, -30 - Math.floor(i / 3) * 50, 34); }); },
  ui() { info('WER IST REICHER? 🤔', 5.16, { y: 360, bg: PAL.yellow, fg: '#1b1530', size: 58 }); },
  sfx: [[4.7, 'scaleCreak'], [5.16, 'pop', 1], [5.5, 'scaleCreak']] });

// =====================================================================  THE CHOICE
// ---- 6 · "Kevin haut sofort…" — both at their buttons with the two cards; Kevin's hand shoots up first
S(5.99, { tr: 'flash', lift: 110, cam: [[5.99, 540, 1020, 1.0], [7.13, 540, 1010, 1.05]],
  draw() { duoStudio({ emo: [[0, 'confused']], look: [0.6, 0] }, { pose: [[5.99, 'idle'], [6.44, 'raiseR', 0.12]], emo: [[5.99, 'serious'], [6.44, 'grin']] }); studioPodiums(); },
  ui() { cards(6.01); },
  sfx: [[6.01, 'pop', 1], [6.07, 'pop', 1.2], [6.44, 'whooshUp', 1.3]] });
// ---- 7 · "…auf den Knopf." — the slam on the orange button
S(7.13, { tr: 'zoomIn', lift: 90, cam: [[7.13, 780, 1140, 1.45], [7.96, 770, 1100, 1.6]], shake: [[7.59, 20, 0.4]],
  draw() { setStudio({ blur: 3 }); char('jonas', 300, FLOOR - 40, 0.8, { emo: [[0, 'shock']], look: [0.6, 0.2], extras: JON });
    char('kevin', 780, FLOOR - 40, 0.8, { pose: [[7.13, 'raiseR'], [7.5, 'slamR', 0.08], [7.75, 'cheer', 0.2]], emo: [[7.13, 'serious'], [7.75, 'grin']], look: [-0.3, 0.5] });
    studioPodiums({ pressR: TT > 7.59 ? 1 : 0, litR: TT > 7.59 ? 0.9 : 0 }); impactLines(780, 1250, 120, 380, 12, 7.59); },
  ui() { info('2 € / SEKUNDE! ⏱️', 7.62, { y: 380, bg: PAL.orange, size: 58 }); },
  sfx: [[7.59, 'slam'], [7.62, 'buzzerWin']] });
// ---- 8 · "Nicht dieses Mal!" — Kevin wags his finger at the camera
S(7.96, { tr: 'whipR', cam: CLOSE(7.96, 9.06), punch: [[8.22, 0.08]],
  draw() { kRoom(9); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[7.96, 'pointUpR'], [8.2, { la: [0.16, -0.12], ra: [2.0, 0.4] }, 0.1], [8.4, 'pointUpR', 0.1], [8.6, { la: [0.16, -0.12], ra: [2.0, 0.4] }, 0.1], [8.8, 'pointUpR', 0.1]], emo: [[0, 'serious']], tilt: [[7.96, 0], [8.3, 0.06], [8.6, -0.06]] }); },
  ui() { popText('NICHT DIESES MAL! ☝️', 540, 380, 8.0, 72, '#ffffff', -0.04, 0); },
  sfx: [[8.0, 'pop', 1], [8.22, 'swish', 1.2], [8.6, 'swish', 1.1]] });
// ---- 9 · "Diesmal bin ich nicht der Dumme." — he taps his temple, a little brain lights up
S(9.06, { tr: 'cut', cam: CLOSE(9.06, 10.59),
  draw() { kRoom(9); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'thinkR']], emo: [[9.06, 'smug']], tilt: [[9.06, 0], [9.6, 0.08]] }); if (TT > 9.95) { const k = springEase(TT - 9.95, 300, 12); ctx.save(); ctx.translate(820, 700); ctx.scale(k, k); glow(0, 0, 140, '#ff8fc0', 0.5); ell(-30, 0, 70, 60, '#ff8fc0'); ell(30, 0, 70, 60, '#ff6aa8'); ctx.restore(); } },
  ui() { info('NICHT DER DUMME 🧠', 10.12, { y: 380, bg: PAL.pink, size: 58 }); },
  sfx: [[9.4, 'tap'], [9.6, 'tap'], [9.95, 'ding'], [10.12, 'pop', 1]] });
// ---- 10 · "Ich nehme die 2 Euro!" — Kevin holds a giant 2-euro coin up to the light
S(10.59, { tr: 'zoomIn', lift: 0, cam: [[10.59, 540, 980, 1.0], [12.28, 540, 960, 1.12]],
  draw() { rays('#c96b10', '#ffb020', { cy: 700, spin: 0.25 }); char('kevin', 540, 1700, 0.95, { pose: [[0, 'raiseR']], emo: [[0, 'grin']], look: [0.2, -0.6], holdR: () => coin2(0, -60, 110, { sx: Math.cos(TT * 2) }) }); twinkles('t10', 600, 400, 300, 300, 8, { s: 26 }); },
  ui() { popText('ICH NEHME DIE 2 €! 🪙', 540, 300, 11.48, 66, PAL.yellow, -0.04, 0); },
  sfx: [[10.65, 'whooshUp', 1], [11.48, 'bling'], [11.72, 'coin', 1.1]] });
// ---- 11 · "Jonas lacht." — Jonas doubles over laughing
S(12.28, { tr: 'whipL', cam: CLOSEJ(12.28, 13.4),
  draw() { setStudio({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'laughBelly']], emo: [[0, 'laugh']], tilt: [[12.28, 0.06], [12.6, -0.08], [12.9, 0.06], [13.2, -0.05]], extras: JON }); },
  ui() { popText('HAHAHA 😂', 540, 380, 12.4, 90, '#ffffff', -0.05, 0); },
  sfx: [[12.4, 'pop', 1], [12.6, 'boing']] });
// ---- 12 · "Dann nehme ich die 50 Millionen!" — Jonas slams the green button, a cash cannon
S(13.4, { tr: 'zoomIn', lift: 90, cam: [[13.4, 300, 1140, 1.45], [15.4, 310, 1090, 1.6]], shake: [[14.45, 20, 0.4]],
  draw() { setStudio({ blur: 3 }); char('kevin', 780, FLOOR - 40, 0.8, { emo: [[0, 'smug']], look: [-0.6, 0.2], pose: [[0, 'armsCross']] });
    char('jonas', 300, FLOOR - 40, 0.8, { pose: [[13.4, 'raiseR'], [14.3, 'slamR', 0.08], [14.7, 'cheer', 0.2]], emo: [[13.4, 'grin'], [14.7, 'laugh']], look: [0.4, 0.5], extras: JON });
    studioPodiums({ pressR: 1, litR: 0.5, pressL: TT > 14.45 ? 1 : 0, litL: TT > 14.45 ? 0.9 : 0 }); impactLines(300, 1250, 120, 380, 12, 14.45); cash('j12', 14.5, 26); },
  ui() { info('50 MILLIONEN! 💰', 14.65, { y: 380, bg: PAL.green, size: 60 }); },
  sfx: [[14.45, 'slam'], [14.48, 'buzzerWin'], [14.55, 'cashCannon']] });
// ---- 13 · "Mit 2 Euro kaufst du dir…" — Jonas waves a döner at Kevin
S(15.4, { tr: 'cut', cam: CLOSEJ(15.4, 16.53),
  draw() { setImbiss({ blur: 8 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'offerR']], emo: [[0, 'smug']], look: [0.4, 0], extras: JON, holdR: () => doener(10, -40, 0.4, 0.3) }); },
  ui() { info('MIT 2 €? 😏', 15.78, { y: 380, bg: PAL.blue, size: 60 }); },
  sfx: [[15.45, 'swish', 1], [15.78, 'pop', 1]] });
// ---- 14 · "…nicht mal einen Döner!" — the price tag: DÖNER 7 € — the 2-euro coin gets a red cross
S(16.53, { tr: 'whipR', lift: 0, cam: [[16.53, 540, 980, 1.0], [17.97, 540, 960, 1.1]],
  draw() { setImbiss({ blur: 3 }); doener(380, 1000, 1.05, -0.08); coin2(820, 1000, 110); if (TT > 17.3) { const k = springEase(TT - 17.3, 300, 12); ctx.save(); ctx.translate(820, 1000); ctx.scale(k, k); line(-120, -120, 120, 120, 26, '#ff3b3b'); line(120, -120, -120, 120, 26, '#ff3b3b'); ctx.restore(); } },
  ui() { info('DÖNER: 7,50 € 🥙', 16.9, { y: 380, bg: PAL.red, size: 62 }); },
  sfx: [[16.9, 'cashReg', 0.6], [17.3, 'errorBuzz'], [17.5, 'crunch']] });

// =====================================================================  JONAS IS SMARTER
// ---- 15 · "Doch Jonas ist schlauer…" — the light drops; one spotlight, Jonas straightens his blazer and smirks
S(17.97, { tr: 'iris', tense: 1, cam: CLOSEJ(17.97, 19.36),
  draw() { setDark('#1d2a4a', '#03050c', { cone: 1 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[17.97, 'idle'], [18.3, 'polish', 0.2]], emo: [[17.97, 'serious'], [18.8, 'smug']], extras: JON, look: [0, 0.2] }); },
  ui() { info('SCHLAUER, ALS DU DENKST… 🤫', 19.04, { y: 380, bg: '#141026', size: 48 }); },
  sfx: [[18.0, 'dun'], [18.3, 'swish', 0.9], [19.04, 'pop', 1]] });
// ---- 16 · "…als Kevin denkt." — his plan on a whiteboard: 1. VILLA  2. AKTIEN
S(19.36, { tr: 'slide', lift: 0, cam: [[19.36, 540, 960, 1.0], [20.59, 540, 950, 1.08]],
  draw() { ctx.fillStyle = '#e9edf6'; ctx.fillRect(-600, -400, 2300, 2800); fillRR(140, 520, 800, 760, 20, '#ffffff'); ctx.lineWidth = 12; ctx.strokeStyle = '#9aa3b8'; ctx.strokeRect(140, 520, 800, 760);
    tText('JONAS · PLAN', 540, 600, 54, { color: '#1d2a4a', shadow: false }); if (TT > 19.6) tText('1. VILLA 🏡', 540, 800, 76, { color: '#e8262f', shadow: false }); if (TT > 20.0) tText('2. AKTIEN 📈', 540, 1000, 76, { color: '#18793a', shadow: false });
    char('jonas', 980, 2050, 1.0, { pose: [[0, 'pointL']], emo: [[0, 'smug']], extras: JON, look: [-0.6, -0.3] }); },
  sfx: [[19.4, 'pencil', 0.4], [19.6, 'pop', 1], [20.0, 'pop', 1.2]] });
// ---- 17 · "Er kauft sich nur eine Villa in Berlin," — Berlin: TV tower, Brandenburg Gate; a villa drops in
S(20.59, { tr: 'whipU', lift: 0, cam: [[20.59, 540, 1060, 1.0], [22.5, 540, 1040, 1.08]],
  draw() { setBerlin(); const k = springEase(TT - 20.9, 200, 13); ctx.save(); ctx.translate(380, 1500 - (1 - k) * 1200); villa(0, 0, 0.62, 1); ctx.restore(); },
  ui() { info('VILLA IN BERLIN 🏡', 21.56, { y: 380, bg: PAL.blue, size: 58 }); },
  sfx: [[20.9, 'whooshDown', 1.1], [21.2, 'thud'], [21.56, 'pop', 1], [21.8, 'birds', 0.6]] });
// ---- 18 · "…für 10 Millionen." — the price tag swings; his account drops from 50 to 40
S(22.5, { tr: 'cut', lift: 0, cam: [[22.5, 540, 960, 1.0], [23.62, 540, 950, 1.1]], punch: [[22.7, 0.08]],
  draw() { rays('#18793a', '#26a24c', { cy: 900, spin: 0.15 }); bankApp(540, 980, 2.0, TT > 23.0 ? '40.000.000 €' : '50.000.000 €', TT > 23.0 ? '#e8262f' : '#18793a'); },
  ui() { slamNum('– 10 MIO. €', 22.7, 380, 96, '#ff6b6b'); },
  sfx: [[22.7, 'cashReg'], [23.0, 'descend']] });
// ---- 19 · "Den Rest steckt er in Aktien." — Jonas at a laptop: 40 Mio. go into a rising chart
S(23.62, { tr: 'zoomIn', lift: 0, cam: [[23.62, 540, 980, 1.0], [25.26, 540, 960, 1.1]],
  draw() { setBank({ blur: 6 }); stockChart(160, 600, 760, 520, [[0, 0.3], [0.3, 0.42], [0.6, 0.5], [1, 0.62]], clamp((TT - 23.8) / 1.2), { title: 'DEPOT · JONAS' }); },
  ui() { info('40 MIO. IN AKTIEN 📈', 24.71, { y: 300, bg: PAL.green, size: 56 }); },
  sfx: [[23.7, 'typing', 0.8], [24.3, 'grow'], [24.71, 'pop', 1]] });

// =====================================================================  KEVIN'S FIRST EURO
// ---- 20 · "Und Kevin?" — in his room, phone buzzes: +2 €
S(25.26, { tr: 'whipL', cam: CLOSE(25.26, 26.01),
  draw() { kRoom(9); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'phoneR']], emo: [[0, 'happy']], holdR: () => phone(0, -30, 0.3, 0.15, () => notifScreen([[25.4, '+2,00 €']], { title: 'BANK' })) }); },
  ui() { info('UND KEVIN? 🤔', 25.3, { y: 380, bg: PAL.orange, size: 60 }); },
  sfx: [[25.3, 'pop', 1], [25.4, 'notify']] });
// ---- 21 · "Seine ersten 2 Euro reichen gerade…" — at a kiosk he slides one coin over the counter
S(26.01, { tr: 'cut', lift: 0, cam: [[26.01, 540, 1060, 1.0], [27.43, 540, 1040, 1.08]],
  draw() { setKiosk(); char('kevin', 540, 1700, 0.85, { pose: [[0, 'offerR']], emo: [[0, 'grin']], look: [0, -0.2] }); coin2(lerp(560, 760, EZ.io(clamp((TT - 26.5) / 0.5))), 1040, 40); },
  ui() { info('SEINE ERSTEN 2 € 🪙', 26.64, { y: 300, bg: '#141026', size: 56 }); },
  sfx: [[26.5, 'coin', 1.1], [26.64, 'pop', 1], [27.0, 'cashReg', 0.4]] });
// ---- 22 · "…für einen Kaugummi." — he chews, blows a bubble… pop!
S(27.43, { tr: 'zoomIn', cam: CLOSE(27.43, 28.96),
  draw() { setKiosk({ blur: 9 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'holdR']], emo: [[0, 'calm']], holdR: () => gum(0, -20, 0.5) }); const b = TT < 28.6 ? clamp((TT - 27.9) / 0.7) : 0; if (b > 0) circ(540, 1110, 30 + b * 110, 'rgba(255,143,192,0.85)'); if (TT > 28.6 && TT < 28.8) for (let i = 0; i < 10; i++) { const a = i / 10 * TAU; circ(540 + Math.cos(a) * 160 * (TT - 28.6) * 6, 1110 + Math.sin(a) * 160 * (TT - 28.6) * 6, 10, '#ff8fc0'); } },
  ui() { popText('EIN KAUGUMMI 🍬', 540, 380, 28.35, 76, '#ff8fc0', -0.04, 0); },
  sfx: [[27.6, 'slurp', 0.4], [28.35, 'pop', 1], [28.6, 'popHi', 0.7]] });
// ---- 23 · "Doch das Geld hört nicht auf." — the phone fills with "+2 €" notifications, faster and faster
S(28.96, { tr: 'glitch', lift: 0, cam: [[28.96, 540, 960, 1.0], [30.45, 540, 950, 1.12]],
  draw() { setDark('#0e2a1a', '#020a05'); phone(540, 980, 2.5, 0, () => { ctx.fillStyle = '#0e1a2e'; ctx.fillRect(-84, -176, 168, 352); tText('BANK', 0, -152, 16, { color: '#9fb4d8', shadow: false }); const n = Math.floor((TT - 29.0) * 6); for (let i = 0; i < 6; i++) { const y = -112 + i * 50; if (n - i < 0) continue; fillRR(-76, y - 20, 152, 42, 10, '#26a24c'); tText('+2,00 €', 0, y + 1, 20, { color: '#fff', shadow: false }); } }); plus2(540, 700, 5, 29.0, 'p23', 380); },
  ui() { info('ES HÖRT NICHT AUF! 📲', 29.41, { y: 300, bg: PAL.green, size: 56 }); },
  sfx: [[29.0, 'coinTicks', 1.4, 6], [29.41, 'pop', 1], [30.1, 'notify']] });
// ---- 24 · "7.200 Euro…" — the clock's hand whips round once: one hour
S(30.45, { tr: 'whipR', lift: 0, cam: [[30.45, 540, 980, 1.0], [31.62, 540, 960, 1.12]],
  draw() { rays('#3a1a6a', '#5a2bd6', { cy: 900, spin: 0.3 }); stopwatch(540, 1000, 1.05, (TT - 30.45) * 50); plus2(540, 700, 8, 30.5, 'p24', 300); },
  ui() { slamNum('7.200 €', 30.86, 380, 130, '#41f08a'); },
  sfx: [[30.5, 'clockSpin', 1.0], [30.86, 'cashReg']] });
// ---- 25 · "…jede Stunde." — a coin waterfall into a growing pile
S(31.62, { tr: 'cut', lift: 0, cam: [[31.62, 540, 980, 1.0], [33.29, 540, 960, 1.1]],
  draw() { setDark('#3a2a00', '#0c0800'); glow(540, 1000, 500, '#ffd23f', 0.3); for (let i = 0; i < 18; i++) { const R = RNG('cw', i), u = ((TT - 31.62) * 1.4 + R.f()) % 1; coin2(470 + R.n(80), 300 + u * 900, 36, { sx: Math.cos(TT * 10 + i) }); }
    const h = 0.4 + 0.6 * clamp((TT - 31.62) / 1.6); for (let r = 0; r < 6 * h; r++) for (let c = 0; c < 7 - r; c++) coin2(540 - (6 - r) * 40 + c * 80, 1460 - r * 46, 40); },
  ui() { info('JEDE STUNDE ⏰', 32.37, { y: 300, bg: PAL.orange, size: 60 }); },
  sfx: [[31.65, 'coinPour', 1.5], [32.37, 'pop', 1]] });
// ---- 26 · "Auch nachts." — Kevin asleep; "+2 €" keeps popping over his bed
S(33.29, { tr: 'iris', lift: 0, cam: [[33.29, 540, 1000, 1.0], [34.12, 540, 990, 1.06]],
  draw() { setBedroom({ blur: 3 }); sleepingKevin(540, 1300, 0.95); plus2(540, 900, 3, 33.3, 'p26', 260); },
  ui() { info('AUCH NACHTS 🌙', 33.62, { y: 300, bg: '#5a2bd6', size: 60 }); },
  sfx: [[33.3, 'snore', 0.8], [33.62, 'pop', 0.9]] });

// =====================================================================  THE BANK CALLS
// ---- 27 · "Nach einer Woche ruft seine Bank an:" — a calendar flips 7 days; the phone rings: BANK
S(34.12, { tr: 'zoomIn', cam: CLOSE(34.12, 36.16),
  draw() { kRoom(9); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[34.12, 'idle'], [35.3, 'phoneR', 0.2]], emo: [[34.12, 'happy'], [35.5, 'confused']], holdR: TT > 35.3 ? () => phone(Math.sin(TT * 60) * 2, -30, 0.3, 0.15, () => { ctx.fillStyle = '#1d48b8'; ctx.fillRect(-84, -176, 168, 352); tText('BANK', 0, -40, 30, { color: '#fff', shadow: false }); tText('ANRUF …', 0, 0, 16, { color: '#9fd8ff', shadow: false }); circ(-44, 120, 24, '#ff4545'); circ(44, 120, 24, '#26c25a'); }) : undefined });
    if (TT < 35.3) { const k = springEase(TT - 34.15, 260, 13); ctx.save(); ctx.translate(780, 760); ctx.scale(k * 0.4, k * 0.4); calendarPage(0, 0, 1, 'TAGE', Math.min(7, 1 + Math.floor((TT - 34.2) * 8))); ctx.restore(); } },
  ui() { info('NACH 1 WOCHE 📅', 34.69, { y: 380, bg: PAL.orange, size: 58 }); },
  sfx: [[34.2, 'flip'], [34.45, 'flip'], [34.69, 'pop', 1], [35.3, 'ringtone', 0.9]] });
// ---- 28 · "So viele Überweisungen?" — the bank adviser stares at his monitor: transfers scrolling non-stop
S(36.16, { tr: 'whipL', lift: 0, cam: [[36.16, 540, 1060, 1.0], [37.69, 540, 1040, 1.1]],
  draw() { setBank(); officeDesk(380, 1600, 0.95, (x, y, w, h) => transferList(x, y, w, h, 36.2)); char('leo', 800, 1700, 0.85, { pose: [[0, 'thinkR']], emo: [[36.16, 'confused'], [36.7, 'shock']], extras: BERATER, look: [-0.6, -0.1] }); },
  ui() { info('SO VIELE ÜBERWEISUNGEN?! 😳', 36.68, { y: 300, bg: PAL.blue, size: 50 }); },
  sfx: [[36.2, 'typing', 1.3], [36.68, 'pop', 1], [37.2, 'beep', 1.3]] });
// ---- 29 · "Das sieht nach Betrug aus!" — red alarm light, the adviser jumps up and points
S(37.69, { tr: 'glitch', cam: [[37.69, 540, 1000, 1.65], [39.4, 540, 980, 1.8]], shake: [[38.34, 12, 0.4]],
  draw() { setBank({ blur: 9 }); const a = Math.sin(TT * 14) > 0 ? 0.25 : 0.05; ctx.fillStyle = `rgba(255,40,40,${a})`; ctx.fillRect(-600, -400, 2300, 2800); char('leo', 540, FLOOR + 170, 1.05, { pose: [[0, 'pointR']], emo: [[0, 'angry']], extras: { ...BERATER, sweat: 1 } }); },
  ui() { popText('BETRUG?! 🚨', 540, 380, 38.34, 100, '#ff4545', -0.05, 0); },
  sfx: [[37.75, 'siren', 1.4], [38.34, 'shockHit']] });
// ---- 30 · "Kevin zeigt nur seinen Vertrag." — Kevin slaps the contract onto the desk: 2 € / SEKUNDE
S(39.4, { tr: 'cut', lift: 0, cam: [[39.4, 540, 980, 1.0], [41.45, 540, 960, 1.1]], shake: [[40.84, 10, 0.3]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#8a5631'], [1, '#6a3f22']]); ctx.fillRect(-600, -400, 2300, 2800); const k = springEase(TT - 40.6, 240, 13);
    ctx.save(); ctx.translate(540, 1000 - (1 - k) * 900); ctx.rotate(-0.05); fillRR(-300, -380, 600, 760, 16, '#ffffff'); fillRR(-300, -380, 600, 120, 16, PAL.orange); tText('VERTRAG', 0, -320, 64, { color: '#fff', shadow: false });
    for (let i = 0; i < 5; i++) line(-230, -200 + i * 50, 230 - (i % 2) * 80, -200 + i * 50, 8, '#d6d9e6'); tText('2 € / SEKUNDE', 0, 120, 70, { color: '#c96b10', shadow: false, maxW: 540 }); tText('1 JAHR LANG', 0, 210, 46, { color: '#1b1530', shadow: false }); line(-200, 320, 60, 320, 4, '#9aa0b4'); tText('Kevin', -70, 290, 44, { color: '#1d48b8', shadow: false, weight: 700 }); ctx.restore();
    fingerArm('kevin', -200, 1700, lerp(-100, 330, EZ.o3(clamp((TT - 40.4) / 0.4))), lerp(1700, 1150, EZ.o3(clamp((TT - 40.4) / 0.4))), 120); },
  ui() { info('DER VERTRAG 📄', 40.37, { y: 300, bg: PAL.orange, size: 58 }); },
  sfx: [[40.37, 'pop', 1], [40.6, 'whooshDown', 1.1], [40.84, 'slam']] });
// ---- 31 · "Und der Bankberater…" — he reads it, his glasses slide down
S(41.45, { tr: 'zoomIn', cam: CLOSE(41.45, 42.75),
  draw() { setBank({ blur: 9 }); char('leo', 540, FLOOR + 170, 1.05, { pose: [[0, 'holdBoth']], emo: [[41.45, 'confused'], [42.2, 'shock']], extras: BERATER, look: [0, 0.5], holdR: () => { fillRR(-110, -150, 220, 280, 10, '#ffffff'); fillRR(-110, -150, 220, 50, 10, PAL.orange); } }); },
  ui() { info('DER BANKBERATER… 👓', 41.89, { y: 380, bg: '#141026', size: 54 }); },
  sfx: [[41.5, 'rustle'], [41.89, 'pop', 1], [42.2, 'gasp']] });
// ---- 32 · "…fällt fast vom Stuhl." — the chair tips back, arms flail, Kevin grins in the doorway
S(42.75, { tr: 'cut', lift: 0, cam: [[42.75, 540, 1060, 1.0], [43.79, 540, 1040, 1.08]], shake: [[43.3, 12, 0.3]],
  draw() { setBank({ blur: 3 }); const tilt = -0.55 * EZ.o3(clamp((TT - 42.85) / 0.4)) + 0.2 * EZ.io(clamp((TT - 43.3) / 0.3)); ctx.save(); ctx.translate(380, 1640); ctx.rotate(tilt); officeChair(0, 0, 0.9); char('leo', 0, 20, 0.8, { pose: [[0, 'headGrab']], emo: [[0, 'shock']], extras: BERATER }); ctx.restore();
    char('kevin', 850, 1660, 0.75, { pose: [[0, 'hips']], emo: [[0, 'laugh']], look: [-0.6, 0] }); },
  ui() { popText('FAST VOM STUHL! 😵', 540, 380, 43.22, 70, PAL.yellow, -0.04, 0); },
  sfx: [[42.85, 'creak', 1.3], [43.22, 'pop', 1], [43.3, 'thud']] });

// =====================================================================  JONAS' SUMMER CRASH
// ---- 33 · "Währenddessen bekommt Jonas einen Schock:" — Jonas at his villa's desk, the laptop glows red on his face
S(43.79, { tr: 'whipR', cam: CLOSEJ(43.79, 45.84), punch: [[45.5, 0.1]],
  draw() { setBerlin({ blur: 10, gate: false }); ctx.fillStyle = `rgba(255,40,40,${0.12 + 0.1 * Math.sin(TT * 10)})`; ctx.fillRect(-600, -400, 2300, 2800); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[43.79, 'pressR'], [45.3, 'headGrab', 0.15]], emo: [[43.79, 'calm'], [45.3, 'shock']], extras: { ...JON, sweat: TT > 45.3 ? 1 : 0 }, look: [0, 0.5] }); },
  ui() { popText('SCHOCK! 😱', 540, 380, 45.5, 96, '#ff4545', -0.05, 0); },
  sfx: [[43.85, 'typing', 0.6], [45.5, 'shockHit']] });
// ---- 34 · "Im Sommer stürzen seine Aktien ab." — a blazing summer sun; the chart nosedives in red
S(45.84, { tr: 'glitch', lift: 0, cam: [[45.84, 540, 960, 1.0], [47.9, 540, 950, 1.1]], shake: [[46.9, 14, 0.5]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#ff9a3c'], [1, '#c0392b']]); ctx.fillRect(-600, -400, 2300, 2800); sunIcon(860, 260, 90); stockChart(160, 620, 760, 520, CRASH, 0.3 + 0.27 * clamp((TT - 46.2) / 1.0), { title: 'DEPOT · JONAS' }); },
  ui() { info('SOMMER ☀️', 46.03, { y: 280, x: 380, bg: PAL.orange, size: 56 }); slamNum('CRASH 📉', 46.9, 1340, 100, '#ff4545'); },
  sfx: [[46.03, 'pop', 1], [46.3, 'descend'], [46.9, 'boom'], [47.2, 'errorBuzz']] });
// ---- 35 · "Und genau da schickt Kevin ihm ein Foto:" — Jonas' phone buzzes: a message from Kevin
S(47.9, { tr: 'cut', cam: CLOSEJ(47.9, 50.32),
  draw() { setBerlin({ blur: 10, gate: false }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'phoneR']], emo: [[47.9, 'sad'], [49.8, 'shock']], extras: { ...JON, sweat: 1 }, holdR: () => phone(0, -30, 0.3, 0.15, () => chatPhoto(49.8)) }); },
  ui() { info('EIN FOTO VON KEVIN 📸', 48.97, { y: 380, bg: PAL.green, size: 52 }); },
  sfx: [[48.5, 'buzzPhone', 0.6], [48.97, 'pop', 1], [49.8, 'shutter']] });
// ---- 36 · "über 30 Millionen auf dem Konto." — the photo full screen: Kevin's selfie with his bank app
S(50.32, { tr: 'zoomIn', lift: 0, cam: [[50.32, 540, 960, 1.0], [52.68, 540, 950, 1.1]],
  draw() { kRoom(4); char('kevin', 400, 1700, 0.95, { pose: [[0, 'phoneR']], emo: [[0, 'grin']], look: [0.3, 0], extras: { shades: 1 } }); bankApp(780, 960, 1.7, '30.000.000 €+', '#18793a', { rot: 0.08 }); },
  ui() { slamNum('ÜBER 30 MIO. €', 50.97, 300, 92, '#41f08a'); },
  sfx: [[50.4, 'shutter'], [50.97, 'cashReg'], [51.6, 'bling']] });
// ---- 37 · "Jonas schwitzt." — close-up: sweat drops, a heartbeat
S(52.68, { tr: 'whipL', cam: [[52.68, 540, 980, 2.0], [53.66, 540, 975, 2.15]],
  draw() { setBerlin({ blur: 12, gate: false }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'idle']], emo: [[0, 'scared']], extras: { ...JON, sweat: 1 } }); },
  ui() { popText('*SCHWITZ* 💦', 540, 380, 52.75, 84, '#9fd8ff', -0.04, 0); },
  sfx: [[52.7, 'heartbeat', 1.0], [52.75, 'pop', 0.9]] });
// ---- 38 · "Aber er verkauft nicht." — his finger hovers over the red VERKAUFEN button… and pulls back
S(53.66, { tr: 'cut', lift: 0, cam: [[53.66, 540, 980, 1.0], [55.01, 540, 960, 1.1]], tense: 1,
  draw() { setDark('#3a0a12', '#08020a'); const k = springEase(TT - 53.7, 260, 13); ctx.save(); ctx.translate(540, 1050); ctx.scale(k, k); fillRR(-300, -120, 600, 240, 40, '#3a0a12'); fillRR(-280, -110, 560, 200, 34, TT > 54.66 ? '#7a2020' : '#e8262f'); tText('VERKAUFEN', 0, -10, 80, { color: '#fff', shadow: false }); ctx.restore();
    const reach = TT < 54.5 ? EZ.o3(clamp((TT - 53.8) / 0.5)) : 1 - EZ.io(clamp((TT - 54.5) / 0.4)); fingerArm('jonas', 1300, 1700, lerp(1100, 720, reach), lerp(1500, 1120, reach), 120); },
  ui() { info('NICHT VERKAUFEN! ✋', 54.66, { y: 380, bg: '#141026', size: 56 }); },
  sfx: [[53.8, 'tension', 0.8], [54.5, 'whoosh', 0.8], [54.66, 'pop', 1]] });
// ---- 39 · "Er wartet." — Jonas, arms crossed, eyes closed, the clock ticks
S(55.01, { tr: 'zoomOut', cam: CLOSEJ(55.01, 55.82),
  draw() { setBerlin({ blur: 10, gate: false }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[0, 'calm']], extras: JON }); wallClock(740, 640, 80); },
  ui() { info('ER WARTET… ⏳', 55.23, { y: 380, bg: '#5a2bd6', size: 58 }); },
  sfx: [[55.05, 'tick'], [55.23, 'pop', 1], [55.45, 'tick']] });
// ---- 40 · "Bis Dezember erholen sich seine Aktien." — snow, a December calendar, the chart climbs back
S(55.82, { tr: 'iris', lift: 0, cam: [[55.82, 540, 960, 1.0], [57.86, 540, 950, 1.1]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#1d3c7a'], [1, '#0a1430']]); ctx.fillRect(-600, -400, 2300, 2800); snow('s40', 50); monthCal(820, 420, 0.6, 'DEZEMBER', '#1d48b8'); stockChart(160, 760, 760, 480, CRASH, 0.57 + 0.43 * clamp((TT - 56.2) / 1.4), { title: 'DEPOT · JONAS' }); },
  ui() { info('DEZEMBER ❄️', 55.98, { y: 300, x: 330, bg: PAL.blue, size: 54 }); },
  sfx: [[55.98, 'pop', 1], [56.3, 'grow'], [57.4, 'sparkle']] });
// ---- 41 · "Am Ende: plus 10 Prozent." — +10 % slams in, Jonas pumps his fist
S(57.86, { tr: 'flash', cam: CLOSEJ(57.86, 59.65), punch: [[58.73, 0.1]],
  draw() { rays('#18793a', '#26a24c', { cy: 700, spin: 0.25 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[57.86, 'idle'], [58.6, 'cheer', 0.15]], emo: [[57.86, 'calm'], [58.6, 'laugh']], extras: JON }); if (TT > 58.73) confetti('c41', 58.73, 36, { y: 700 }); },
  ui() { slamNum('+10 %', 58.73, 380, 150, '#41f08a'); },
  sfx: [[58.47, 'whooshUp', 1], [58.73, 'sting'], [59.0, 'applause', 0.8]] });

// =====================================================================  ONE YEAR LATER: THE RECKONING
// ---- 42 · "Schließlich, nach einem Jahr," — the calendar spins through the whole year
S(59.65, { tr: 'whipU', lift: 0, cam: [[59.65, 540, 960, 1.0], [61.42, 540, 940, 1.1]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); const d = Math.min(365, Math.floor(1 + 364 * EZ.io(clamp((TT - 59.7) / 1.3)))); const k = springEase(TT - 59.7, 220, 13); ctx.save(); ctx.translate(540, 980); ctx.scale(k, k); calendarPage(0, 0, 1.25, 'TAG', d); ctx.restore(); },
  ui() { info('1 JAHR SPÄTER ⏳', 60.23, { y: 360, bg: PAL.orange, size: 60 }); },
  sfx: [[59.7, 'clockSpin', 1.4], [60.23, 'pop', 1], [61.0, 'ding']] });
// ---- 43 · "…die Abrechnung." — face to face across a table, heartbeat
S(61.42, { tr: 'zoomIn', tense: 1, lift: 200, cam: [[61.42, 540, 1150, 1.05], [62.28, 540, 1130, 1.14]],
  draw() { setStudio({ blur: 6 }); char('jonas', 320, FLOOR + 40, 0.9, { pose: [[0, 'armsCross']], emo: [[0, 'serious']], look: [0.7, 0], extras: JON }); char('kevin', 760, FLOOR + 40, 0.9, { pose: [[0, 'hips']], emo: [[0, 'smug']], look: [-0.7, 0] }); fillRR(140, FLOOR - 170, 800, 50, 14, '#6a3f22'); },
  ui() { info('ABRECHNUNG ⚖️', 61.6, { y: 380, bg: '#141026', size: 60 }); },
  sfx: [[61.6, 'pop', 1], [61.75, 'heartbeat', 0.6]] });
// ---- 44 · "Jonas knallt sein Konto auf den Tisch." — the statement smacks onto the wood
S(62.28, { tr: 'cut', cam: [[62.28, 540, 1000, 1.0], [64.37, 540, 980, 1.08]], shake: [[63.17, 16, 0.35]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#6a4a2a'], [1, '#4a3018']]); ctx.fillRect(-600, -400, 2300, 2700); for (let i = 0; i < 10; i++) line(-600, 200 + i * 180, 1700, 220 + i * 180, 6, 'rgba(0,0,0,0.12)');
    const a = springEase(TT - 63.0, 220, 13); statement(540, 1000 - (1 - a) * 900, 1.3, 'JONAS', null, -0.04); impactLines(540, 1000, 300, 600, 14, 63.17); fingerArm('jonas', 1300, 1500, 760, lerp(1600, 1180, EZ.o3(clamp((TT - 62.75) / 0.4))), 120); },
  sfx: [[62.9, 'whooshDown', 1.2], [63.17, 'slam'], [63.2, 'thud']] });
// ---- 45 · "44 Millionen in Aktien." — the statement up close: 44 MIO. €
S(64.37, { tr: 'zoomIn', cam: [[64.37, 540, 1000, 1.2], [66.58, 540, 1000, 1.3]], punch: [[64.66, 0.08]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#6a4a2a'], [1, '#4a3018']]); ctx.fillRect(-600, -400, 2300, 2700); statement(540, 1000, 1.3, 'JONAS', '44 MIO. €', -0.04); },
  ui() { popText('44.000.000 € 📈', 540, 380, 64.66, 84, '#41f08a', -0.04, 0); },
  sfx: [[64.66, 'cashReg'], [65.86, 'pop', 1]] });
// ---- 46 · "Plus meine Villa." — a photo of the Berlin villa slides on top: + VILLA
S(66.58, { tr: 'slide', lift: 0, cam: [[66.58, 540, 960, 1.0], [67.59, 540, 950, 1.06]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#6a4a2a'], [1, '#4a3018']]); ctx.fillRect(-600, -400, 2300, 2700); const k = springEase(TT - 66.62, 260, 13); ctx.save(); ctx.translate(540, 980); ctx.rotate(0.05); ctx.scale(k, k); fillRR(-380, -300, 760, 600, 12, '#ffffff'); ctx.save(); ctx.beginPath(); ctx.rect(-350, -270, 700, 480); ctx.clip(); ctx.translate(-540, -1000); setBerlin({ gate: true }); ctx.translate(380, 1500); villa(0, 0, 0.5, 1); ctx.restore(); tText('VILLA · BERLIN', 0, 250, 44, { color: '#1b1530', shadow: false }); ctx.restore(); },
  ui() { info('+ VILLA 🏡', 66.77, { y: 300, bg: PAL.blue, size: 62 }); },
  sfx: [[66.6, 'swish', 1], [66.77, 'pop', 1]] });
// ---- 47 · "Das holst du nie ein!" — Jonas, arms crossed, the smuggest grin
S(67.59, { tr: 'whipL', cam: CLOSEJ(67.59, 68.92),
  draw() { setStudio({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], tilt: [[67.59, 0], [67.9, 0.08]], extras: JON }); },
  ui() { popText('DAS HOLST DU NIE EIN! 😏', 540, 380, 67.62, 66, PAL.yellow, -0.04, 0); },
  sfx: [[67.62, 'pop', 1], [68.3, 'ting']] });
// ---- 48–51 · Kevin's clues: 2 € / Sekunde, 1 ganzes Jahr, then "Rechne selbst!"
const clue = (t0, x, y, txt, col) => { if (TT < t0) return; const k = springEase(TT - t0, 300, 12); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); fillRR(-230, -70, 460, 140, 26, col); tText(txt, 0, 4, 52, { color: '#fff', shadow: false, maxW: 420 }); ctx.restore(); };
const CLUES = () => { clue(70.02, 300, 320, '2 € / SEKUNDE', PAL.orange); clue(71.63, 780, 320, '× 1 JAHR', PAL.blue); };
S(68.92, { tr: 'whipR', cam: CLOSE(68.92, 70.02),
  draw() { kRoom(9); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'hips']], emo: [[0, 'smug']] }); },
  ui() { popText('KEVIN GRINST 😎', 540, 380, 69.39, 70, '#ffffff', -0.04, 0); },
  sfx: [[69.39, 'pop', 1], [69.6, 'ting']] });
S(70.02, { tr: 'cut', cam: CLOSE(70.02, 71.63),
  draw() { kRoom(9); char('kevin', 540, FLOOR + 130, 0.9, { pose: [[0, 'pointUpR']], emo: [[0, 'grin']], holdR: () => coin2(0, -60, 50, { sx: Math.cos(TT * 4) }) }); },
  ui() { CLUES(); },
  sfx: [[70.05, 'pop', 1], [70.3, 'coin', 1.1]] });
S(71.63, { tr: 'zoomIn', cam: CLOSE(71.63, 72.81),
  draw() { kRoom(9); char('kevin', 540, FLOOR + 130, 0.9, { pose: [[0, 'pointL']], emo: [[0, 'smug']] }); },
  ui() { CLUES(); },
  sfx: [[71.66, 'popHi', 1.2], [72.0, 'flip']] });
S(72.81, { tr: 'whipL', cam: CLOSE(72.81, 73.65), punch: [[72.84, 0.1]],
  draw() { kRoom(10); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'pointR']], emo: [[0, 'laugh']], look: [0, 0.3] }); const k = springEase(TT - 72.95, 260, 12); ctx.save(); ctx.translate(820, 780); ctx.rotate((1 - k) * 2); ctx.scale(k * 0.45, k * 0.45); calculator(0, 0, 1, '?', 0); ctx.restore(); },
  ui() { popText('RECHNE SELBST! 🧮', 540, 380, 72.84, 76, PAL.yellow, -0.04, 0); },
  sfx: [[72.84, 'pop', 1], [72.95, 'whoosh', 1.2], [73.26, 'ding']] });

// =====================================================================  THE QUESTION
// ---- 52 · "Wie viel hat Kevin?" — even split: both enter at once (Jonas 44 Mio. + villa on top, Kevin "???" below)
const YD = 900;
function splitEven(top, bottom) {
  ctx.save(); ctx.beginPath(); ctx.rect(-300, -400, 1700, YD + 400); ctx.clip(); top(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-300, YD, 1700, 1500); ctx.clip(); bottom(); ctx.restore(); line(-300, YD, 1400, YD, 14, '#ffffff');
}
S(73.65, { tr: 'glitch', tense: 1, capY: YD, cam: [[73.65, 540, 960, 1.0], [75.0, 540, 960, 1.03]],
  draw() { const k = springEase(TT - 73.67, 170, 13);
    splitEven(() => { rays('#121c34', '#1d2a4a', { cy: 560, spin: 0.08 }); char('jonas', 330 - (1 - k) * 760, 860, 0.6, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], extras: JON, lean: (1 - k) * 0.25 }); },
      () => { rays('#c96b10', '#ff8a1e', { cy: 1220, spin: -0.08 }); char('kevin', 330 + (1 - k) * 760, 1840, 0.6, { pose: [[0, 'hips']], emo: [[0, 'smug']], extras: { shades: 1 }, lean: -(1 - k) * 0.25 }); }); },
  ui() { hud('JONAS · 44 MIO. + VILLA', [[0, 54e6]], { x: 760, y: 560, scale: 0.62, t0: 73.72 }); { const g = TT > 74.1 && TT < 74.35 ? Math.sin(TT * 90) * 12 : 0, kk = springEase(TT - 73.78, 260, 14); ctx.save(); ctx.translate(760 + g, 1500); ctx.scale(0.66 * kk, 0.66 * kk); blurCounter(0, 0, 560, 210, 'KONTO · KEVIN'); ctx.restore(); }
    info('WIE VIEL HAT KEVIN? 🤔', 73.84, { y: 250, bg: PAL.yellow, fg: '#1b1530', size: 50 }); },
  sfx: [[73.68, 'whoosh', 1.1], [73.72, 'pop', 1], [74.1, 'glitch'], [74.15, 'coinTicks', 0.6, 5]] });
