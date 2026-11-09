// =====================================================================
//  shots.js — Der Mond gehört dir vs 1 Billion Euro sofort (DE). ~64 shots on the trimmed voice (82.85 s).
//  Jonas takes 1 Billion (900 Mrd. after his city and the club), Kevin takes the moon:
//  logo 500 Mrd. + 1 Mio. plots x 1 Mio. € = 1,5 Billionen -> Kevin wins (never said on screen).
// =====================================================================
const KS = { chain: 1, shades: 1 };
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
  fillRR(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18, 'rgba(10,8,30,0.45)');
  const ik = springEase(TT - t0 - 0.12, 280, 12), bob = Math.sin(TT * 3 + x) * 4;
  ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18); ctx.clip(); ctx.translate(0, -h / 2 + 147 + bob); ctx.scale(ik, ik);
  if (icon === 'cash') { glow(0, 0, 200, '#a6f0b4', 0.3); briefcase(0, 60, 0.42, 1); } else { starfield('ic', 40); moonBall(0, 0, 66, { halo: 0.4 }); }
  ctx.restore();
  tText(big, 0, h / 2 - 92, 46, { color: '#fff', maxW: w - 36 }); tText(sub, 0, h / 2 - 40, 26, { color: 'rgba(255,255,255,0.95)', shadow: false, weight: 800, maxW: w - 40 });
  ctx.restore();
}
const cards = (t0) => { tText('WAS NIMMST DU?', 540, 200, 66, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14, maxW: 1000 });
  iconCard(285, 462, 'SOFORT', '1 BILLION €', '1.000.000.000.000 €', PAL.green, t0, 'cash'); iconCard(795, 462, 'FÜR IMMER', 'DER MOND', 'GEHÖRT DIR', '#5a2bd6', t0 + 0.06, 'moon'); tText('VS', 540, 462, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); };
const duoStudio = (jT = {}, kT = {}, o = {}) => { setStudio(o); char('jonas', 300, FLOOR - 40, 0.8, { emo: [[0, 'happy']], look: [0.4, -0.4], extras: JON, ...jT }); char('kevin', 780, FLOOR - 40, 0.8, { emo: [[0, 'grin']], look: [-0.3, -0.3], ...kT }); };
const KONTO_J = [[0, 1e12], [31.05, 9e11]];

// =====================================================================  THE HOOK
// ---- 1 · "Der Mond gehört…" — the moon rushes at the camera out of deep space (hard punch-in on frame one)
S(0.0, { tr: 'cut', lift: 0, cam: [[0, 540, 900, 2.6], [0.22, 540, 900, 1.0], [1.21, 540, 900, 1.12]],
  draw() { setSpace({ drift: 30 }); const k = springEase(TT - 0.02, 160, 14); moonBall(540, 900, 420 * (0.35 + 0.65 * k), { halo: 0.5 }); speedLines(14, 0.25 * clamp(1 - TT / 0.6), 'sl1'); },
  ui() { slamNum('DER MOND', 0.33, 300, 130, '#ffffff'); },
  sfx: [[0.02, 'impact'], [0.33, 'stamp'], [0.63, 'sparkle']] });
// ---- 2 · "…dir. Für immer." — the moon wrapped like a gift, a gold tag "FÜR DICH", then the stamp "FÜR IMMER"
S(1.21, { tr: 'zoomIn', lift: 0, cam: [[1.21, 540, 940, 1.0], [2.48, 540, 920, 1.1]], punch: [[1.5, 0.08]],
  draw() { setSpace({ seed: 'sp2', drift: 10 }); moonBall(540, 900, 380, { halo: 0.45 }); const k = springEase(TT - 1.25, 260, 13);
    ctx.save(); ctx.globalAlpha = k; fillRR(500, 520, 80, 760, 0, 'rgba(255,59,92,0.92)'); fillRR(160, 860, 760, 80, 0, 'rgba(255,59,92,0.92)'); ctx.restore(); bigBow(540, 520, 1.4 * k);
    if (TT > 1.5) { const k2 = springEase(TT - 1.5, 300, 12); ctx.save(); ctx.translate(800, 1180); ctx.rotate(0.15 + Math.sin(TT * 3) * 0.05); ctx.scale(k2, k2); line(-60, -90, -150, -200, 6, '#ffd23f'); fillRR(-80, -80, 300, 140, 20, '#ffd23f'); tText('FÜR DICH', 70, -10, 46, { color: '#1b1530', shadow: false }); ctx.restore(); } },
  ui() { info('FÜR IMMER ♾️', 1.78, { y: 300, bg: '#5a2bd6', size: 66 }); },
  sfx: [[1.25, 'whooshUp', 1.2], [1.3, 'fold'], [1.5, 'pop', 1.2], [1.78, 'stamp'], [2.0, 'sparkle']] });
// ---- 3 · "Oder eine Billion…" — gold rays, a mountain of cash grows, 1.000.000.000.000 € slams
S(2.48, { tr: 'whipL', tense: 1, cam: [[2.48, 540, 980, 1.0], [3.75, 540, 960, 1.1]], punch: [[3.31, 0.12]], shake: [[3.31, 18, 0.4]],
  draw() { rays('#9a6a00', '#e8b400', { cy: 940, spin: 0.3 }); glow(540, 1000, 700, '#fff2b0', 0.4); cashMountain(540, 1260, 1.25, clamp((TT - 2.5) / 0.8)); if (TT > 3.31) billRain('h3', 3.31, 30, { burst: [540, 820], spread: 1.4 }); },
  ui() { slamNum('1.000.000.000.000 €', 3.31, 400, 92); },
  sfx: [[2.5, 'coinPour', 0.7], [3.31, 'cashCannon']] });
// ---- 4 · "…Euro sofort?" — a vault door swings open, notes blast out, SOFORT
S(3.75, { tr: 'cut', cam: [[3.75, 540, 1000, 1.05], [4.71, 540, 990, 1.18]],
  draw() { setDark('#3a2a00', '#0c0800'); glow(540, 980, 600, '#ffd23f', 0.35); vault(540, 1080, 1.05, clamp((TT - 3.8) / 0.5), 1); if (TT > 4.0) billRain('h4', 4.0, 26, { burst: [540, 980], spread: 0.8 }); },
  ui() { info('SOFORT ⚡', 4.16, { y: 360, bg: PAL.red, size: 74 }); },
  sfx: [[3.8, 'creak', 0.8], [4.0, 'moneyRain', 1.2], [4.16, 'pop', 1.1], [4.5, 'cashReg', 0.6]] });
// ---- 5 · "Was ist am Ende mehr wert?" — a giant balance: the moon against the cash, rocking, undecided
S(4.71, { tr: 'zoomOut', tense: 1, lift: 0, cam: [[4.71, 540, 960, 1.0], [6.16, 540, 950, 1.1]],
  draw() { rays('#2a1660', '#3d1f8a', { cy: 900, spin: 0.08 }); const tilt = Math.sin(TT * 3.2) * 0.22 * clamp((TT - 4.75) / 0.3);
    balance(540, 1380, 1.0, tilt, () => { moonBall(0, -70, 95, { halo: 0.3 }); }, () => { cashMountain(0, -10, 0.32, 1); }); },
  ui() { info('WAS IST MEHR WERT? ⚖️', 5.09, { y: 360, bg: PAL.yellow, fg: '#1b1530', size: 56 }); },
  sfx: [[4.75, 'scaleCreak'], [5.09, 'pop', 1], [5.5, 'scaleCreak'], [5.84, 'tick']] });

// =====================================================================  THE CHOICE
// ---- 6 · "Jonas schnappt sich sofort…" — both at their buttons with the two cards; Jonas' hand shoots up
S(6.16, { tr: 'flash', lift: 110, cam: [[6.16, 540, 1020, 1.0], [7.12, 540, 1010, 1.05]],
  draw() { duoStudio({ pose: [[6.16, 'idle'], [6.6, 'raiseR', 0.15]], emo: [[6.16, 'happy'], [6.6, 'grin']] }, { emo: [[0, 'confused']], look: [-0.6, 0] }); studioPodiums(); },
  ui() { cards(6.18); },
  sfx: [[6.18, 'pop', 1], [6.24, 'pop', 1.2], [6.6, 'whooshUp', 1.2], [6.88, 'swish', 1]] });
// ---- 7 · "…das Geld." — the slam on the green button, a cash cannon
S(7.12, { tr: 'zoomIn', lift: 90, cam: [[7.12, 300, 1140, 1.45], [8.16, 310, 1090, 1.6]], shake: [[7.6, 20, 0.4]],
  draw() { setStudio({ blur: 3 }); char('kevin', 780, FLOOR - 40, 0.8, { emo: [[0, 'confused']], look: [-0.6, 0.2] });
    char('jonas', 300, FLOOR - 40, 0.8, { pose: [[7.12, 'raiseR'], [7.5, 'slamR', 0.08], [7.8, 'cheer', 0.2]], emo: [[7.12, 'grin'], [7.8, 'laugh']], look: [0.4, 0.5], extras: JON });
    studioPodiums({ pressL: TT > 7.6 ? 1 : 0, litL: TT > 7.6 ? 0.9 : 0 }); impactLines(300, 1250, 120, 380, 12, 7.6); cash('j7', 7.62, 26); },
  ui() { info('DAS GELD! 💰', 7.79, { y: 380, bg: PAL.green, size: 60 }); },
  sfx: [[7.6, 'slam'], [7.62, 'buzzerWin'], [7.7, 'cashCannon']] });
// ---- 8 · "Eine Billion!" — Jonas hugs an open briefcase, notes rain down
S(8.16, { tr: 'whipR', cam: CLOSEJ(8.16, 9.13), punch: [[8.63, 0.08]],
  draw() { setStudio({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'holdBoth']], emo: [[0, 'laugh']], extras: JON, holdR: () => briefcase(-70, 10, 0.3, 1) }); cash('j8', 8.2, 20); },
  ui() { popText('1 BILLION! 🤑', 540, 380, 8.63, 96, PAL.yellow, -0.04, 0); },
  sfx: [[8.2, 'moneyRain', 1.4], [8.63, 'coinBounce']] });
// ---- 9 · "Ich bin der reichste…" — a golden throne room; Jonas on the throne, a crown drops onto his head
S(9.13, { tr: 'cut', lift: 0, cam: [[9.13, 540, 1040, 1.1], [10.39, 540, 1020, 1.22]],
  draw() { setThrone({ blur: 4 }); cashMountain(540, 1500, 1.4, 1); char('jonas', 540, 1420, 0.85, { pose: [[9.13, 'cheer'], [9.9, 'armsUp', 0.2]], emo: [[0, 'laugh']], extras: JON });
    const k = clamp((TT - 9.5) / 0.4), cy = lerp(200, 770, EZ.o3(k)); if (TT > 9.5) { ctx.save(); ctx.translate(540, cy); crown(0, 0, 0.75); ctx.restore(); } if (TT > 9.9) twinkles('c9', 380, 620, 320, 200, 8, { s: 26 }); },
  ui() { info('DER REICHSTE 👑', 9.87, { y: 360, bg: PAL.yellow, fg: '#1b1530', size: 60 }); },
  sfx: [[9.5, 'whooshDown', 1.1], [9.87, 'bling'], [9.95, 'applause', 1.0]] });
// ---- 10 · "…Mensch der Welt!" — the world ranking board: Jonas jumps to place 1
S(10.39, { tr: 'whipU', lift: 0, cam: [[10.39, 540, 960, 1.0], [11.74, 540, 950, 1.08]],
  draw() { setSpace({ seed: 'rk' }); earthBall(540, 1580, 520, { spin: 0.03 }); fillRR(170, 520, 740, 640, 36, 'rgba(10,8,30,0.85)'); tText('REICHSTE MENSCHEN DER WELT', 540, 580, 36, { color: '#9fd8ff', shadow: false, maxW: 680 });
    const up = EZ.io(clamp((TT - 10.6) / 0.6)), rows = [['JONAS', '1.000 MRD. €'], ['TECH-BOSS', '480 MRD. €'], ['ÖL-KÖNIG', '310 MRD. €']];
    rows.forEach(([n, v], i) => { const slot = i === 0 ? lerp(3, 0, up) : i - 1 + up; const y = 680 + slot * 150; fillRR(210, y, 660, 120, 20, i === 0 ? '#ffd23f' : '#2a2450'); tText(`${Math.round(slot) + 1}.`, 270, y + 60, 50, { color: i === 0 ? '#1b1530' : '#fff', shadow: false }); tText(n, 470, y + 60, 46, { color: i === 0 ? '#1b1530' : '#fff', shadow: false, maxW: 300 }); tText(v, 730, y + 60, 34, { color: i === 0 ? '#1b1530' : '#9fd8ff', shadow: false, maxW: 240 }); });
    if (TT > 11.2) confetti('c10', 11.2, 40, { y: 700 }); },
  ui() { info('PLATZ 1 🥇', 11.2, { y: 380, bg: PAL.green, size: 62 }); },
  sfx: [[10.6, 'whooshUp', 1], [11.2, 'sting'], [11.3, 'pop', 1.2]] });

// =====================================================================  KEVIN DANCES
// ---- 11 · (a laugh) "Kevin dagegen…" — in his room under a moon poster, Kevin bursts into a dance
const discoBall = (x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line(0, -200, 0, -60, 6, '#c9cfdb'); circ(0, 0, 70, '#c9cfdb'); for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) if (i * i + j * j < 10) fillRR(i * 18 - 8, j * 18 - 8, 16, 16, 3, ((i + j + Math.floor(TT * 8)) % 3) ? '#ffffff' : '#9fd8ff'); ctx.restore();
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 6; i++) { const a = TT * 1.5 + i; glow(x + Math.cos(a) * 400, y + 500 + Math.sin(a * 1.3) * 300, 120, ['#ff4fa3', '#52b8ff', '#41f08a'][i % 3], 0.25); } ctx.restore(); };
const kevDance = (t0) => ({ pose: [[t0, 'cheer'], [t0 + 0.3, 'pointUpR', 0.12], [t0 + 0.6, 'pointL', 0.12], [t0 + 0.9, 'armsUp', 0.12], [t0 + 1.2, 'pointUpR', 0.12], [t0 + 1.5, 'cheer', 0.12], [t0 + 1.8, 'pointL', 0.12], [t0 + 2.1, 'armsUp', 0.12]],
  jump: [[t0, 0], [t0 + 0.15, 40, 0.12], [t0 + 0.3, 0, 0.12], [t0 + 0.45, 40, 0.12], [t0 + 0.6, 0, 0.12], [t0 + 0.75, 40, 0.12], [t0 + 0.9, 0, 0.12], [t0 + 1.05, 40, 0.12], [t0 + 1.2, 0, 0.12], [t0 + 1.35, 40, 0.12], [t0 + 1.5, 0, 0.12], [t0 + 1.65, 40, 0.12], [t0 + 1.8, 0, 0.12]],
  tilt: [[t0, 0], [t0 + 0.3, 0.15], [t0 + 0.6, -0.15], [t0 + 0.9, 0.15], [t0 + 1.2, -0.15], [t0 + 1.5, 0.15], [t0 + 1.8, -0.15]], lean: [[t0, 0.08], [t0 + 0.45, -0.08], [t0 + 0.9, 0.08], [t0 + 1.35, -0.08], [t0 + 1.8, 0.08]] });
S(11.29, { tr: 'spin', lift: 140, cam: [[11.29, 540, 1060, 1.0], [12.75, 540, 1040, 1.1]],
  draw() { kRoom(3); discoBall(540, 330, 1); char('kevin', 540, FLOOR + 30, 0.95, { ...kevDance(11.3), emo: [[0, 'laugh']] }); },
  ui() { info('KEVIN 🌕', 11.74, { y: 380, bg: PAL.blue, size: 60 }); },
  sfx: [[11.35, 'boing'], [11.74, 'pop', 1], [12.15, 'squeak'], [12.5, 'boing']] });
// ---- 12 · "…tanzt vor Freude." — close: the happiest dance moves, confetti
S(12.75, { tr: 'whipL', cam: CLOSE(12.75, 13.74), punch: [[13.19, 0.07]],
  draw() { kRoom(9); discoBall(540, 330, 0.8); char('kevin', 540, FLOOR + 170, 1.02, { ...kevDance(12.75), emo: [[0, 'grin'], [13.2, 'laugh']] }); confetti('c12', 12.8, 30, { y: 700 }); },
  ui() { popText('TANZT VOR FREUDE 🕺', 540, 380, 12.98, 66, PAL.yellow, -0.04, 0); },
  sfx: [[12.8, 'sparkle'], [12.98, 'pop', 1.1], [13.19, 'boing'], [13.5, 'squeak']] });
// ---- 13 · "Obwohl er gerade den größten…" — record scratch: freeze-frame mid-jump, colour drains, a red ring
S(13.74, { tr: 'cut', lift: 140, cam: [[13.74, 540, 1060, 1.05], [15.28, 540, 1040, 1.22]], tense: 1,
  draw() { ctx.save(); ctx.filter = `saturate(${1 - 0.85 * clamp((TT - 13.76) / 0.25)})`; kRoom(3); discoBall(540, 330, 1); char('kevin', 540, FLOOR + 30, 0.95, { pose: [[0, 'pointUpR']], emo: [[0, 'grin']], jump: [[0, 40]], tilt: [[0, 0.15]] }); ctx.restore();
    if (TT > 14.25) { const k = springEase(TT - 14.25, 260, 12); ctx.save(); ctx.translate(540, 820); ctx.scale(k, k); ctx.beginPath(); ctx.arc(0, 0, 330, 0, TAU); ctx.lineWidth = 20; ctx.strokeStyle = '#ff3b3b'; ctx.stroke(); ctx.restore(); } },
  ui() { info('STOPP! ⏸️', 13.78, { y: 360, bg: PAL.red, size: 62 }); },
  sfx: [[13.74, 'recordScratch'], [14.25, 'whoosh', 0.9], [14.75, 'heartbeat', 0.8]] });
// ---- 14 · "…Fehler seines Lebens gemacht hat." — the moon is just grey dust next to a mountain of gold: a giant red "?" stamp
S(15.28, { tr: 'glitch', lift: 0, cam: [[15.28, 540, 960, 1.0], [16.99, 540, 950, 1.1]], shake: [[15.3, 14, 0.4]],
  draw() { setDark('#3a0a12', '#08020a'); ctx.save(); ctx.filter = 'saturate(0.3)'; moonBall(300, 960, 200, { halo: 0.1 }); ctx.restore(); cashMountain(780, 1120, 0.55, 1); glow(780, 1000, 280, '#ffd23f', 0.25);
    tText('VS', 540, 960, 70, { color: '#fff', stroke: PAL.red, strokeW: 22 }); },
  ui() { info('DER GRÖSSTE FEHLER? 😬', 15.3, { y: 380, bg: PAL.red, size: 52 }); if (TT > 16.32) { const k = springEase(TT - 16.32, 300, 12); ctx.save(); ctx.translate(540, 1240); ctx.rotate(-0.12); ctx.scale(k, k); ctx.lineWidth = 14; ctx.strokeStyle = '#ff3b3b'; ctx.strokeRect(-330, -70, 660, 140); tText('SEINES LEBENS', 0, 4, 66, { color: '#ff3b3b', shadow: false }); ctx.restore(); } },
  sfx: [[15.3, 'errorBuzz'], [16.32, 'stamp'], [16.5, 'sadTrombone', 0.7]] });
// ---- 15 · "Oder?" — Kevin turns to the camera and winks
S(16.99, { tr: 'zoomIn', cam: [[16.99, 540, 990, 1.85], [17.58, 540, 985, 2.0]], punch: [[17.05, 0.1]],
  draw() { kRoom(10); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'pointR']], emo: [[16.99, 'smug']], look: [0, 0.2], tilt: [[16.99, 0], [17.2, -0.1]] }); },
  ui() { popText('ODER? 😏', 540, 380, 17.05, 96, '#ffffff', -0.05, 0); },
  sfx: [[17.05, 'ting'], [17.2, 'kiss']] });
// ---- 16 · "Der Mond gehört mir!" — at his window, the full moon outside; he flings the window open, arms up
S(17.58, { tr: 'whipR', lift: 0, cam: [[17.58, 540, 1000, 1.0], [19.51, 540, 980, 1.12]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#2a1650'], [1, '#170c33']]); ctx.fillRect(-600, -400, 2300, 2800);
    windowFrame(170, 260, 740, 760, () => { nightSky({ seed: 'w16' }); moonBall(540, 600, 230, { halo: 0.5 }); });
    char('kevin', 540, 2050, 1.25, { pose: [[17.58, 'pointUpR'], [18.3, 'armsUp', 0.2]], emo: [[0, 'grin'], [18.3, 'laugh']], look: [0, -0.7] }); if (TT > 18.31) confetti('c16', 18.31, 34, { y: 700 }); },
  ui() { popText('DER MOND GEHÖRT MIR! 🌕', 540, 200, 18.31, 60, PAL.yellow, -0.04, 0); },
  sfx: [[17.6, 'creak', 1.2], [18.31, 'impact'], [18.4, 'applause', 0.8]] });

// =====================================================================  THE DEAL
// ---- 17 · "Was willst du mit dem Mond?" — Jonas laughs, holding his belly
S(19.51, { tr: 'slide', cam: CLOSEJ(19.51, 21.03),
  draw() { setStudio({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[19.51, 'laughBelly'], [20.4, 'pointR', 0.15]], emo: [[0, 'laugh']], tilt: [[19.51, 0.05], [19.9, -0.08], [20.3, 0.05]], extras: JON }); },
  ui() { popText('WAS WILLST DU DAMIT? 😂', 540, 380, 19.76, 60, '#ffffff', -0.04, 0); },
  sfx: [[19.6, 'pop', 1], [20.4, 'swish', 1.1], [20.77, 'boing']] });
// ---- 18 · "Da gibt's nicht mal WLAN!" — on the grey moon, a phone: no signal, the wifi icon crossed out
const noWifi = (k) => { ctx.fillStyle = '#10142a'; ctx.fillRect(-84, -176, 168, 352); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(0, 20, 30 + i * 26, -2.4, -0.74); ctx.lineWidth = 12; ctx.strokeStyle = '#6a6f86'; ctx.stroke(); } circ(0, 20, 9, '#6a6f86'); if (k > 0) { line(-70, -60, 70, 80, 14 * k, '#ff3b3b'); } tText('KEIN NETZ', 0, 120, 18, { color: '#ff8080', shadow: false }); };
S(21.03, { tr: 'cut', lift: 0, cam: [[21.03, 540, 1000, 1.0], [22.46, 540, 980, 1.1]],
  draw() { setMoonSurface({ blur: 5, seed: 18 }); const k = springEase(TT - 21.1, 260, 13); phone(540, 960, 2.5 * k, Math.sin(TT * 2) * 0.05, () => noWifi(clamp((TT - 21.6) / 0.2))); },
  ui() { info('KEIN WLAN! 📵', 21.82, { y: 360, bg: PAL.red, size: 64 }); },
  sfx: [[21.1, 'whooshUp', 1], [21.6, 'declined'], [21.82, 'pop', 1], [22.1, 'crickets', 0.4]] });
// ---- 19 · "Deal: Wer in einem Jahr…" — Jonas points; a calendar flips to 365 days
S(22.46, { tr: 'whipL', tense: 1, cam: CLOSEJ(22.46, 23.78),
  draw() { setStudio({ blur: 9 }); char('jonas', 400, FLOOR + 170, 1.0, { pose: [[22.46, 'idle'], [22.6, 'pointR', 0.15]], emo: [[0, 'grin']], look: [0.5, 0], extras: JON });
    if (TT > 23.2) { const k = springEase(TT - 23.2, 260, 12); ctx.save(); ctx.translate(690, 930); ctx.rotate(0.06); ctx.scale(k * 0.4, k * 0.42); calendarPage(0, 0, 1, 'TAGE', 365); ctx.restore(); } },
  ui() { popText('DEAL? 🤝', 540, 380, 22.5, 100, PAL.yellow, -0.05, 0); },
  sfx: [[22.5, 'pop', 1.1], [23.2, 'flip'], [23.59, 'tick']] });
// ---- 20 · "…weniger hat, kauft dem anderen…" — two account bars, the shorter one blinks red
S(23.78, { tr: 'zoomIn', lift: 0, cam: [[23.78, 540, 960, 1.0], [25.34, 540, 940, 1.1]],
  draw() { rays('#3a1a6a', '#5a2bd6', { cy: 900, spin: 0.2 }); const g = EZ.o3(clamp((TT - 23.85) / 0.6));
    fillRR(260, 1300 - 600 * g, 220, 600 * g, 20, PAL.green); fillRR(600, 1300 - 380 * g, 220, 380 * g, 20, Math.sin(TT * 14) > 0 && TT > 24.3 ? '#ff3b3b' : PAL.blue);
    line(180, 1300, 900, 1300, 10, '#ffffff'); tText('?', 370, 1360, 60, { color: '#fff' }); tText('?', 710, 1360, 60, { color: '#fff' }); if (TT > 24.3) tText('WENIGER', 710, 860, 48, { color: '#ff8080', maxW: 260 }); },
  ui() { info('WER WENIGER HAT… 📉', 24.29, { y: 380, bg: PAL.red, size: 56 }); },
  sfx: [[23.85, 'grow'], [24.29, 'pop', 1.2], [24.5, 'errorBuzz']] });
// ---- 21 · "…eine G-Klasse." — a black G-Klasse rolls in, a giant bow drops on its roof
S(25.34, { tr: 'whipR', lift: 0, cam: [[25.34, 540, 1100, 1.0], [26.2, 540, 1090, 1.06]],
  draw() { setShowroom(); const x = 540 + 900 * (1 - springEase(TT - 25.36, 110, 16)); gKlasse(x, 1460, 1.05, { spin: (x - 540) / 98 }); if (TT > 25.75) bigBow(540, 950 - (1 - springEase(TT - 25.75, 300, 12)) * 400, 1.1); },
  ui() { info('EINE G-KLASSE 🎁', 25.67, { y: 380, bg: '#141026', size: 62 }); },
  sfx: [[25.36, 'engine'], [25.67, 'pop', 1], [25.75, 'whooshDown', 1.1], [25.95, 'thud']] });
// ---- 22 · "Abgemacht!" — the handshake slams
S(26.2, { tr: 'cut', lift: 200, cam: [[26.2, 540, 1150, 1.1], [26.96, 540, 1130, 1.18]], punch: [[26.22, 0.12]], shake: [[26.22, 12, 0.3]],
  draw() { const sh = TT > 26.22 ? Math.sin(TT * 30) * 0.05 * clamp(1 - (TT - 26.22) / 0.6) : 0; setStudio({ blur: 4 });
    char('jonas', 320, FLOOR + 40, 0.9, { pose: [[0, { la: [0.16, -0.12], ra: [0.85 + sh, -0.2] }]], emo: [[0, 'grin']], look: [0.7, 0], extras: JON });
    char('kevin', 760, FLOOR + 40, 0.9, { pose: [[0, { la: [0.85 - sh, -0.2], ra: [0.16, -0.12] }]], emo: [[0, 'grin']], look: [-0.7, 0] }); impactLines(540, 1200, 80, 260, 10, 26.22); },
  ui() { info('ABGEMACHT! 🤝', 26.22, { y: 380, bg: PAL.red, size: 66 }); },
  sfx: [[26.2, 'pat'], [26.22, 'impact']] });

// =====================================================================  JONAS SPENDS
// ---- 23 · "Also kauft Jonas…" — Jonas taps KAUFEN on his phone
S(26.96, { tr: 'zoomOut', cam: CLOSEJ(26.96, 27.8),
  draw() { setStreet({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'phoneR']], emo: [[26.96, 'happy'], [27.47, 'grin']], look: [0.3, -0.2], extras: JON, holdR: () => phone(0, -30, 0.3, 0.15, () => { ctx.fillStyle = '#0e1a2e'; ctx.fillRect(-84, -176, 168, 352); fillRR(-70, 100, 140, 50, 12, TT > 27.47 ? '#41f08a' : '#26a24c'); tText('KAUFEN', 0, 126, 22, { color: '#fff', shadow: false }); }) }); },
  ui() { info('JONAS KAUFT… 🛒', 27.29, { y: 380, bg: PAL.green, size: 56 }); },
  sfx: [[27.0, 'swish', 0.9], [27.29, 'pop', 1], [27.47, 'phoneTap'], [27.55, 'cashReg', 0.5]] });
// ---- 24 · "…seine eigene Stadt" — a whole city; a giant golden sign "JONAS-STADT" drops onto the skyline, fireworks
S(27.8, { tr: 'whipU', lift: 0, cam: [[27.8, 540, 980, 1.0], [28.94, 540, 960, 1.08]],
  draw() { setJonasCity(); citySign(540, 620, 1, 'JONAS-STADT', 28.1); if (TT > 28.35) fireworks('f24', 28.35, 4); },
  ui() { info('SEINE EIGENE STADT 🏙️', 28.62, { y: 1180, bg: PAL.blue, size: 54 }); },
  sfx: [[28.1, 'whooshDown', 1.2], [28.3, 'slam'], [28.4, 'applause', 0.6], [28.62, 'pop', 1]] });
// ---- 25 · "…und einen Fußballverein." — a full stadium, the crowd jumps, the crest "FC JONAS" springs up, a ball flies
S(28.94, { tr: 'flash', lift: 0, cam: [[28.94, 540, 900, 1.0], [30.29, 540, 880, 1.1]],
  draw() { setStadium({ jump: 18 }); const k = springEase(TT - 29.3, 240, 12); ctx.save(); ctx.translate(540, 1000); ctx.scale(k * 1.1, k * 1.1); clubCrest(0, 0, 1); ctx.restore();
    if (TT > 29.6) { const u = clamp((TT - 29.6) / 0.6); football(lerp(-100, 900, u), 900 - Math.sin(u * Math.PI) * 400, 40, TT * 10); } },
  ui() { info('FUSSBALLVEREIN ⚽', 29.46, { y: 360, bg: PAL.red, size: 58 }); },
  sfx: [[28.96, 'applause', 1.4], [29.3, 'pop', 1], [29.46, 'pop', 1.2], [29.6, 'punch'], [29.9, 'whistle']] });
// ---- 26 · "Für 100 Milliarden." — his account drops from 1.000 to 900 Mrd., the price tag swings in
S(30.29, { tr: 'cut', lift: 0, cam: [[30.29, 540, 960, 1.0], [31.82, 540, 940, 1.08]], punch: [[30.57, 0.08]],
  draw() { rays('#18793a', '#26a24c', { cy: 900, spin: 0.15 }); const k = springEase(TT - 30.3, 260, 13); ctx.save(); ctx.translate(540, 960); ctx.scale(k, k); bankApp(0, 0, 2.0, TT > 31.05 ? '900.000.000.000 €' : '1.000.000.000.000 €', TT > 31.05 ? '#e8262f' : '#18793a'); ctx.restore(); },
  ui() { slamNum('– 100 MILLIARDEN €', 30.57, 380, 80, '#ff6b6b'); },
  sfx: [[30.3, 'whooshUp', 1], [30.57, 'cashReg'], [31.05, 'descend']] });

// =====================================================================  KEVIN TO THE MOON
// ---- 27 · "Und Kevin?" — Kevin in a space suit beside his rocket, thumbs up
S(31.82, { tr: 'iris', lift: 0, cam: [[31.82, 540, 1000, 1.0], [32.49, 540, 990, 1.06]],
  draw() { setAirfield({ blur: 4 }); rocket(760, 1180, 1.25); char('kevin', 330, 1560, 0.9, { pose: [[0, 'pointUpR']], emo: [[0, 'grin']], extras: { suit: 1, helmet: 1 }, look: [0.4, -0.3] }); },
  ui() { info('UND KEVIN? 🚀', 31.9, { y: 360, bg: PAL.blue, size: 62 }); },
  sfx: [[31.9, 'pop', 1], [32.1, 'beep', 1.2], [32.3, 'beep', 1.4]] });
// ---- 28 · "Er fliegt mit einer Rakete…" — lift-off: smoke billows, the rocket climbs, the ground shakes
S(32.49, { tr: 'cut', lift: 0, cam: [[32.49, 540, 1000, 1.0], [33.91, 540, 860, 1.05]], shake: [[32.6, 18, 1.2]],
  draw() { setAirfield({ blur: 2 }); const u = EZ.i3(clamp((TT - 32.9) / 1.0)); smokeCloud('l28', 540, 1600, 32.55, 16, 1.2); rocket(540, 1240 - u * 1500, 1.35, clamp((TT - 32.55) / 0.3)); },
  ui() { info('3… 2… 1… START! 🔥', 32.6, { y: 340, bg: PAL.orange, size: 52 }); },
  sfx: [[32.55, 'rocket', 1.5], [32.6, 'thunder', 0.6], [33.39, 'whooshUp', 1]] });
// ---- 29 · "…zu seinem Mond" — through space, the rocket streaks towards a growing moon
S(33.91, { tr: 'whipU', lift: 0, cam: [[33.91, 540, 960, 1.0], [34.8, 540, 960, 1.12]],
  draw() { setSpace({ seed: 'r29', drift: 400 }); moonBall(760, 420, 160 + (TT - 33.91) * 160, { halo: 0.5 }); speedLines(10, 0.3, 'sl29'); rocket(380 + (TT - 33.91) * 160, 1260 - (TT - 33.91) * 300, 0.8, 0.9, 0.6); },
  ui() { info('ZUM MOND 🌕', 34.08, { y: 1150, bg: '#5a2bd6', size: 56 }); },
  sfx: [[33.95, 'rocket', 0.9], [34.08, 'pop', 1], [34.44, 'whoosh', 1.3]] });
// ---- 30 · "…und hüpft federleicht…" — on the surface: slow, high moon hops, dust puffs on every landing
const HOPS = (t0, n, dur = 0.85, h = 300) => { const K = [[t0, 0]]; for (let i = 0; i < n; i++) { K.push([t0 + i * dur + dur / 2, h, dur / 2]); K.push([t0 + (i + 1) * dur, 0, dur / 2]); } return K; };
S(34.8, { tr: 'zoomIn', lift: 0, cam: [[34.8, 540, 1150, 1.0], [35.55, 600, 1130, 1.06]],
  draw() { setMoonSurface({ seed: 30 }); rocket(150, 1330, 0.55); const x = lerp(260, 760, (TT - 34.8) / 0.75);
    char('kevin', x, 1560, 0.72, { pose: [[0, 'armsUp']], emo: [[0, 'laugh']], extras: { suit: 1, helmet: 1 }, jump: HOPS(34.8, 2, 0.75, 260), tilt: [[0, 0.1]] }); dustPuff('d30a', 260, 1560, 34.8, 0.8); dustPuff('d30b', 520, 1560, 35.55, 0.8); },
  ui() { info('FEDERLEICHT 🪶', 35.0, { y: 380, bg: '#141026', size: 56 }); },
  sfx: [[34.85, 'hop'], [35.0, 'pop', 1], [35.55, 'hop']] });
// ---- 31 · "…über die Krater." — a giant hop right over a crater, he plants his flag "KEVIN"
S(35.55, { tr: 'cut', lift: 0, cam: [[35.55, 540, 1150, 1.0], [36.55, 540, 1100, 1.1]],
  draw() { setMoonSurface({ seed: 31, er: 140 }); ell(540, 1600, 360, 90, 'rgba(90,92,108,0.7)'); ell(560, 1612, 300, 66, 'rgba(160,162,176,0.7)');
    const u = clamp((TT - 35.55) / 0.85); char('kevin', lerp(160, 900, u), 1560, 0.7, { pose: [[0, 'cheer']], emo: [[0, 'grin']], extras: { suit: 1, helmet: 1 }, jump: [[35.55, Math.sin(u * Math.PI) * 420]] });
    dustPuff('d31', 900, 1560, 36.4, 0.9); moonFlag(820, 1580, 0.8, 36.07); },
  ui() { info('ÜBER DIE KRATER! 🌑', 35.89, { y: 380, bg: PAL.blue, size: 54 }); },
  sfx: [[35.6, 'whooshUp', 0.8], [35.89, 'pop', 1], [36.07, 'stamp', 0.7], [36.4, 'hop']] });
// ---- 32 · "Doch er findet nur Staub." — on his knees, dust trickles out of his glove
S(36.55, { tr: 'slide', lift: 0, cam: [[36.55, 540, 1080, 1.35], [38.04, 540, 1060, 1.5]],
  draw() { setMoonSurface({ seed: 32, blur: 6 }); char('kevin', 540, 1720, 1.0, { pose: [[0, { la: [0.4, -1.4], ra: [0.9, -1.6] }]], emo: [[36.55, 'confused'], [37.4, 'sad']], extras: { suit: 1, helmet: 1 }, look: [0.3, 0.6] });
    for (let i = 0; i < 14; i++) { const R = RNG('st32', i), u = ((TT - 36.6) * 1.3 + R.f()) % 1; if (TT > 36.6) circ(650 + R.n(14), 1180 + u * 400, 6 * (1 - u * 0.5), '#d7d6df'); } },
  ui() { info('NUR STAUB… 😐', 37.66, { y: 380, bg: '#3a3a4a', size: 56 }); },
  sfx: [[36.6, 'rustle'], [37.2, 'crumple'], [37.66, 'pop', 0.8]] });
// ---- 33 · "Steine." — he holds up a grey rock, knocks on it: nothing
S(38.04, { tr: 'cut', cam: CLOSE(38.04, 38.7),
  draw() { setMoonSurface({ seed: 33, blur: 9 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'holdR']], emo: [[0, 'serious']], extras: { suit: 1, helmet: 1 }, holdR: () => { ell(10, -20, 70, 54, '#8d8e9c'); ell(-10, -40, 36, 24, '#c9cad3'); } }); },
  ui() { popText('STEINE 🪨', 540, 380, 38.06, 90, '#c9cad3', -0.04, 0); },
  sfx: [[38.1, 'tap'], [38.3, 'tap'], [38.45, 'thud']] });
// ---- 34 · "Und null Euro." — his bank app: 0,00 €, red; crickets on the moon
S(38.7, { tr: 'zoomIn', lift: 0, cam: [[38.7, 540, 960, 1.0], [39.73, 540, 950, 1.1]],
  draw() { setDark('#2a2a3a', '#05050a'); bankApp(540, 980, 2.3, '0,00 €', '#e8262f'); },
  ui() { slamNum('0,00 €', 39.16, 380, 110, '#ff4545'); },
  sfx: [[38.75, 'notify'], [39.16, 'sadTrombone', 0.8], [39.4, 'crickets', 0.4]] });
// ---- 35 · "Bis er zur Erde schaut." — Kevin turns; the earth hangs huge over the horizon; a light bulb
S(39.73, { tr: 'whipL', lift: 0, cam: [[39.73, 540, 1050, 1.0], [41.21, 540, 1010, 1.12]], tense: 1,
  draw() { setMoonSurface({ seed: 35, ex: 540, ey: 560, er: 330 }); char('kevin', 540, 1720, 0.95, { pose: [[39.73, 'sad'], [40.6, 'pointUpR', 0.2]], emo: [[39.73, 'sad'], [40.6, 'shock']], extras: { suit: 1, helmet: 1 }, look: [0, -0.8] });
    if (TT > 40.83) { const k = springEase(TT - 40.83, 300, 12); ctx.save(); ctx.translate(780, 980); ctx.scale(k, k); glow(0, 0, 160, '#fff6a0', 0.6); circ(0, 0, 60, '#fff3a0'); fillRR(-26, 50, 52, 40, 8, '#9aa3b8'); ctx.restore(); } },
  ui() { info('DIE ERDE 🌍', 40.4, { y: 250, bg: PAL.blue, size: 54 }); },
  sfx: [[39.8, 'whoosh', 0.8], [40.4, 'pop', 1], [40.83, 'ding']] });
// ---- 36 · "Der Mond ist das einzige Plakat," — a billboard frame clamps around the moon, spot lights flick on
S(41.21, { tr: 'zoomOut', lift: 0, cam: [[41.21, 540, 900, 1.0], [43.19, 540, 880, 1.1]],
  draw() { setSpace({ seed: 's36' }); moonBall(540, 900, 300, { halo: 0.5, scaffold: EZ.o3(clamp((TT - 42.1) / 0.4)) }); },
  ui() { info('DAS EINZIGE PLAKAT… 🪧', 42.74, { y: 360, bg: PAL.yellow, fg: '#1b1530', size: 54 }); },
  sfx: [[41.3, 'whoosh', 0.9], [42.1, 'ratchet'], [42.4, 'flicker'], [42.74, 'pop', 1]] });
// ---- 37 · "…das die ganze Welt…" — a crowd of silhouettes on rooftops, faces up, phones out: 8 Mrd. Menschen
S(43.19, { tr: 'cut', lift: 0, cam: [[43.19, 540, 960, 1.0], [44.29, 540, 940, 1.08]],
  draw() { nightSky({ seed: 'c37' }); moonBall(540, 420, 170, { halo: 0.55 }); const R = RNG('cr37');
    for (let row = 0; row < 4; row++) for (let i = 0; i < 9; i++) { const x = -40 + i * 140 + (row % 2) * 70 + R.n(20), y = 1100 + row * 190, s = 0.7 + row * 0.15, c = shade('#120a2e', row * 0.06); circ(x, y - 90 * s, 46 * s, c); fillRR(x - 60 * s, y - 50 * s, 120 * s, 200 * s, 44 * s, c); if ((i + row) % 3 === 0) { fillRR(x + 30 * s, y - 170 * s, 36 * s, 60 * s, 6, '#9fd8ff'); glow(x + 48 * s, y - 140 * s, 40 * s, '#9fd8ff', 0.4); } } },
  ui() { info('8 MRD. MENSCHEN 👀', 43.63, { y: 760, bg: PAL.blue, size: 54 }); },
  sfx: [[43.25, 'shutter'], [43.63, 'pop', 1], [43.9, 'shutter']] });
// ---- 38 · "…jede Nacht sieht." — the night side of the earth, every city light points up at the moon
S(44.29, { tr: 'whipR', lift: 0, cam: [[44.29, 540, 960, 1.0], [45.31, 540, 950, 1.1]],
  draw() { setSpace({ seed: 's38' }); earthBall(540, 1300, 430, { night: 1 }); moonBall(540, 420, 140, { halo: 0.6 }); for (let i = 0; i < 9; i++) { const a = -Math.PI * (0.2 + i * 0.075); ctx.save(); ctx.globalAlpha = 0.35; line(540 + Math.cos(a) * 430, 1300 + Math.sin(a) * 430, 540, 470, 3, '#fff3a0'); ctx.restore(); } },
  ui() { info('JEDE NACHT 🌙', 44.71, { y: 700, bg: '#5a2bd6', size: 56 }); },
  sfx: [[44.35, 'grow'], [44.71, 'pop', 1]] });
// ---- 39 · "Am nächsten Tag ruft…" — on the moon, Kevin's phone rings and vibrates
S(45.31, { tr: 'iris', cam: CLOSE(45.31, 46.49),
  draw() { setMoonSurface({ seed: 39, blur: 9 }); const sh = Math.sin(TT * 60) * 6; char('kevin', 540, FLOOR + 170, 1.05, { pose: [[45.31, 'idle'], [45.9, 'phoneR', 0.2]], emo: [[45.31, 'confused'], [46.0, 'shock']], extras: { suit: 1, helmet: 1 }, holdR: TT > 45.9 ? () => phone(sh * 0.3, -30, 0.3, 0.15, () => novaCall()) : undefined }); },
  ui() { info('AM NÄCHSTEN TAG ☀️', 45.47, { y: 380, bg: PAL.orange, size: 54 }); },
  sfx: [[45.47, 'pop', 1], [45.6, 'buzzPhone', 0.8], [45.95, 'ringtone', 0.9]] });
// ---- 40 · "…eine riesige Handymarke an:" — the call screen fills the frame: NOVA
S(46.49, { tr: 'zoomIn', lift: 0, cam: [[46.49, 540, 960, 1.0], [47.94, 540, 950, 1.1]],
  draw() { setDark('#0d1b3a', '#020610'); const k = springEase(TT - 46.5, 240, 13); phone(540, 980, 2.6 * k, Math.sin(TT * 40) * 0.02, () => novaCall()); },
  ui() { info('RIESIGE HANDYMARKE 📱', 46.98, { y: 360, bg: PAL.blue, size: 54 }); },
  sfx: [[46.5, 'ringtone', 1.2], [46.98, 'pop', 1], [47.64, 'phoneTap']] });
// ---- 41 · "500 Milliarden" — a giant cheque slams down, notes explode
S(47.94, { tr: 'flash', lift: 0, cam: [[47.94, 540, 960, 1.0], [49.09, 540, 940, 1.1]], shake: [[48.17, 22, 0.45]], punch: [[48.17, 0.12]],
  draw() { rays('#9a6a00', '#e8b400', { cy: 940, spin: 0.35 }); const k = springEase(TT - 47.98, 260, 13); giantCheck(540, 1000 - (1 - k) * 800, 1.05, '500 MRD. €', -0.05); if (TT > 48.17) billRain('c41', 48.17, 34, { burst: [540, 1000], spread: 1.0 }); },
  ui() { slamNum('500.000.000.000 €', 48.17, 380, 90); },
  sfx: [[48.17, 'cashCannon'], [48.5, 'coinBounce']] });
// ---- 42 · "…für ihr Logo auf dem Mond." — the brand logo lights up across the moon
S(49.09, { tr: 'zoomOut', lift: 0, cam: [[49.09, 540, 900, 1.0], [50.59, 540, 880, 1.12]],
  draw() { setSpace({ seed: 's42' }); moonBall(540, 900, 380, { halo: 0.55, logo: EZ.o3(clamp((TT - 49.33) / 0.4)) }); },
  ui() { info('LOGO AUF DEM MOND! 🌕', 49.76, { y: 300, bg: PAL.blue, size: 54 }); },
  sfx: [[49.33, 'powerOn'], [49.5, 'sparkle'], [49.76, 'pop', 1]] });

// =====================================================================  JONAS SEES IT
// ---- 43 · "Nachts auf seiner Dachterrasse…" — Jonas lounges on his rooftop, cocktail in hand
S(50.59, { tr: 'slide', lift: 0,
  cam: [[50.59, 540, 1060, 1.3], [52.24, 540, 1040, 1.4]],
  draw() { setRooftop({ logo: 0 }); char('jonas', 540, 1480, 0.85, { pose: [[0, 'drinkR']], emo: [[0, 'calm']], extras: JON, look: [0.2, 0], holdR: () => cocktail(0, -40, 0.5, 1) }); },
  ui() { info('DACHTERRASSE 🍹', 51.33, { y: 380, bg: '#5a2bd6', size: 56 }); },
  sfx: [[50.6, 'glassClink'], [51.33, 'pop', 1], [51.8, 'slurp', 0.5]] });
// ---- 44 · "…schaut Jonas nach oben" — over his shoulder: the moon, with the logo glowing
S(52.24, { tr: 'whipU', lift: 0, cam: [[52.24, 540, 900, 1.0], [53.25, 540, 860, 1.12]], tense: 1,
  draw() { setRooftop({ logo: 1, mx: 560, my: 520, mr: 260 }); char('jonas', 250, 1640, 0.8, { pose: [[0, 'drinkR']], emo: [[0, 'confused']], look: [0, -0.9], extras: JON, holdR: () => cocktail(0, -40, 0.5, 1) }); },
  ui() { info('NACH OBEN… 👀', 52.59, { y: 300, bg: '#141026', size: 56 }); },
  sfx: [[52.3, 'whooshUp', 0.8], [52.59, 'pop', 1], [52.9, 'heartbeat', 0.5]] });
// ---- 45 · "…und verschluckt sich an seinem Drink." — he spits his cocktail, coughing
S(53.25, { tr: 'cut', cam: CLOSEJ(53.25, 55.38), shake: [[54.45, 12, 0.4]],
  draw() { setRooftop({ blur: 10, logo: 1 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[53.25, 'drinkR'], [54.45, 'facepalm', 0.15]], emo: [[53.25, 'calm'], [54.4, 'shock']], extras: { ...JON, sweat: 1 }, holdR: TT < 54.45 ? () => cocktail(0, -40, 0.5, 1) : undefined });
    if (TT > 54.45 && TT < 55.3) { const u = (TT - 54.45) / 0.85; for (let i = 0; i < 16; i++) { const R = RNG('sp45', i); circ(540 + R.n(60) + u * 320 * (R.f() - 0.2), 820 + R.n(40) + u * u * 320, 13 * (1 - u), '#ff6aa8'); } } },
  ui() { popText('*HUST* *HUST* 🍹', 540, 380, 54.6, 76, '#ffffff', -0.06, 0); },
  sfx: [[53.4, 'slurp', 0.8], [54.45, 'spit'], [54.6, 'cough'], [55.0, 'cough']] });
// ---- 46 · "Ist das ein Logo?!" — Jonas points at the sky, shocked
S(55.38, { tr: 'zoomIn', cam: CLOSEJ(55.38, 56.73), punch: [[56.12, 0.1]],
  draw() { setRooftop({ blur: 10, logo: 1 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'pointUpR']], emo: [[0, 'shock']], look: [0.2, -0.7], extras: { ...JON, sweat: 1 } }); },
  ui() { popText('IST DAS EIN LOGO?! 😱', 540, 380, 55.63, 70, PAL.yellow, -0.04, 0); },
  sfx: [[55.63, 'pop', 1], [56.12, 'shockHit']] });
// ---- 47 · "Er schaltet den Fernseher ein:" — the remote click, the TV blinks on
S(56.73, { tr: 'whipL', lift: 0, cam: [[56.73, 540, 1000, 1.0], [58.17, 540, 980, 1.08]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#2a1d48'], [1, '#14102a']]); ctx.fillRect(-600, -400, 2300, 2800); floorLamp(980, 1500, 1); plant(110, 1500, 1);
    tvSet(540, 820, 820, 480, clamp((TT - 57.4) / 0.25), (x, y, w, h) => newsScreen(x, y, w, h, 'EILMELDUNG', 'WEM GEHÖRT DER MOND?', (px, py, pw, ph) => { setSpace({ seed: 'tv47' }); moonBall(px + pw / 2, py + ph / 2, ph * 0.4, { logo: 1 }); }));
    remote(860, 1300 - springEase(TT - 56.8, 260, 13) * 120, 0.9, -0.2, TT > 57.39 && TT < 57.6 ? 1 : 0); },
  ui() { info('FERNSEHER AN 📺', 57.39, { y: 360, bg: '#141026', size: 56 }); },
  sfx: [[56.8, 'swish', 1], [57.39, 'click'], [57.42, 'powerOn'], [57.7, 'pop', 1]] });
// ---- 48 · "Kevin. Auf jedem Sender." — channel after channel: Kevin waving from the moon
const kevTV = (px, py, pw, ph, c) => { setMoonSurface({ seed: 'tv' + c, er: 60, ex: px + pw * 0.8, ey: py + ph * 0.2 }); ctx.save(); ctx.translate(px + pw / 2, py + ph); const s = ph / 1100; char('kevin', 0, 0, s * 1.4, { pose: [[0, 'waveR']], emo: [[0, 'grin']], extras: { suit: 1, helmet: 1 } }); ctx.restore(); };
S(58.17, { tr: 'glitch', lift: 0, cam: [[58.17, 540, 880, 1.05], [59.94, 540, 870, 1.12]],
  draw() { ctx.fillStyle = '#14102a'; ctx.fillRect(-600, -400, 2300, 2800); const ch = TT < 58.93 ? 0 : TT < 59.37 ? 1 : 2, names = ['KANAL 1', 'NEWS 24', 'SPORT+'];
    tvSet(540, 880, 820, 480, 1, (x, y, w, h) => { newsScreen(x, y, w, h, ['KEVIN!', 'WIEDER KEVIN!', 'NUR NOCH KEVIN!'][ch], 'LIVE VOM MOND', (px, py, pw, ph) => kevTV(px, py, pw, ph, ch), names[ch]); if (TT - [58.17, 58.93, 59.37][ch] < 0.12) { ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(x, y, w, h); } }); },
  ui() { info('AUF JEDEM SENDER 📡', 58.93, { y: 380, bg: PAL.red, size: 56 }); },
  sfx: [[58.17, 'click'], [58.93, 'glitch'], [58.95, 'click'], [59.37, 'glitch'], [59.4, 'click']] });
// ---- 49 · "Der Mann, dem der Mond gehört." — the news headline, Kevin on the moon with his flag
S(59.94, { tr: 'zoomIn', lift: 0, cam: [[59.94, 540, 900, 1.0], [61.85, 540, 880, 1.1]],
  draw() { ctx.fillStyle = '#0a1430'; ctx.fillRect(-600, -400, 2300, 2800); newsScreen(60, 340, 960, 980, 'DER MANN, DEM DER MOND GEHÖRT', 'KEVIN (23) – BESITZER DES MONDES', (px, py, pw, ph) => { setMoonSurface({ seed: 'n49', ex: px + pw * 0.8, ey: py + ph * 0.25, er: 90 }); moonFlag(px + pw * 0.72, py + ph * 0.98, 0.7, 0); ctx.save(); ctx.translate(px + pw * 0.4, py + ph * 0.98); char('kevin', 0, 0, ph / 760, { pose: [[0, 'waveR']], emo: [[0, 'grin']], extras: { suit: 1, helmet: 1 } }); ctx.restore(); }, 'MOND-TV'); },
  sfx: [[59.96, 'sting'], [60.46, 'whoosh', 0.8], [61.23, 'ding']] });
// ---- 50 · "Sogar auf Plakaten in New York…" — a giant poster of Kevin over Times-Square-like streets, cabs pass
S(61.85, { tr: 'whipR', lift: 0, cam: [[61.85, 540, 900, 1.0], [63.72, 540, 880, 1.08]],
  draw() { setNewYork(); billboard(540, 760, 820, 560, (x, y, w, h) => kevinPoster(x, y, w, h, 'DER MONDKÖNIG')); },
  ui() { info('NEW YORK 🗽', 63.15, { y: 300, bg: PAL.yellow, fg: '#1b1530', size: 60 }); },
  sfx: [[61.9, 'carHorn'], [62.41, 'shutter'], [63.15, 'pop', 1], [63.4, 'carHorn']] });
// ---- 51 · "…und Tokio:" — neon Tokyo, the same face on a glowing screen
S(63.72, { tr: 'glitch', lift: 0, cam: [[63.72, 540, 900, 1.0], [64.21, 540, 890, 1.06]],
  draw() { setTokyo(); billboard(540, 760, 820, 560, (x, y, w, h) => kevinPoster(x, y, w, h, 'KEVIN – MOND')); },
  ui() { info('TOKIO 🗼', 63.75, { y: 300, bg: PAL.pink, size: 60 }); },
  sfx: [[63.75, 'pop', 1.2], [63.9, 'flicker']] });
// ---- 52 · "Kevin." — Kevin himself, shades on, the proudest grin
S(64.21, { tr: 'zoomIn', cam: CLOSE(64.21, 64.81), punch: [[64.25, 0.1]],
  draw() { setTokyo({ blur: 10 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'hips']], emo: [[0, 'smug']], extras: { shades: 1 } }); },
  ui() { popText('KEVIN 😎', 540, 380, 64.25, 100, PAL.yellow, -0.04, 0); },
  sfx: [[64.25, 'bling']] });

// =====================================================================  THE PLOTS
// ---- 53 · "Währenddessen verkauft Kevin…" — his booth on the moon, a queue of buyers hopping towards it
S(64.81, { tr: 'slide', lift: 0, cam: [[64.81, 540, 1060, 1.0], [66.22, 540, 1040, 1.08]],
  draw() { setMoonSurface({ seed: 53, hy: 1100 }); moonBooth(540, 1400, 0.95); char('kevin', 540, 1340, 0.7, { pose: [[64.81, 'offerR'], [65.5, 'pointL', 0.15]], emo: [[0, 'grin']], extras: { suit: 1 } });
    ['mia', 'leo', 'lea', 'zoe'].forEach((id, i) => { const x = 1180 + i * 210 - (TT - 64.81) * 330; char(id, x, 1700, 0.55, { pose: [[0, 'raiseR']], emo: [[0, 'happy']], extras: { suit: 1, helmet: 1 }, jump: HOPS(64.81 + i * 0.2, 3, 0.5, 60) }); }); },
  ui() { info('GRUNDSTÜCKE ZU VERKAUFEN 🏷️', 65.52, { y: 360, bg: PAL.green, size: 48 }); },
  sfx: [[64.85, 'hop'], [65.35, 'hop'], [65.52, 'pop', 1], [65.88, 'cashReg', 0.6]] });
// ---- 54 · "Grundstücke." — the deed: VERKAUFT stamped
S(66.22, { tr: 'cut', lift: 0, cam: [[66.22, 540, 960, 1.05], [66.9, 540, 950, 1.12]],
  draw() { rays('#3a1a6a', '#5a2bd6', { cy: 900, spin: 0.2 }); moonDeed(540, 980, 1.5, 66.4); },
  sfx: [[66.25, 'paperTear'], [66.4, 'stamp']] });
// ---- 55 · "Eine Million Grundstücke." — the moon's grid fills with sold plots, the counter runs to 1.000.000
S(66.9, { tr: 'zoomOut', lift: 0, cam: [[66.9, 540, 900, 1.0], [68.56, 540, 880, 1.1]],
  draw() { setSpace({ seed: 's55' }); moonBall(540, 920, 380, { halo: 0.45, plots: 1, sold: clamp((TT - 66.95) / 1.3) }); },
  ui() { const v = Math.round(1e6 * EZ.o3(clamp((TT - 66.95) / 1.3))); slamNum(v.toLocaleString('de-DE') + ' VERKAUFT', 67.0, 300, 76, '#41f08a'); },
  sfx: [[66.95, 'coinTicks', 1.4, 7], [67.32, 'grow'], [68.3, 'ding']] });
// ---- 56 · "Jedes für eine Million Euro." — stars and millionaires throw cash at the booth: 1.000.000 € pro Stück
S(68.56, { tr: 'whipL', lift: 0, cam: [[68.56, 540, 1060, 1.0], [70.55, 540, 1040, 1.1]],
  draw() { setMoonSurface({ seed: 56, hy: 1100, blur: 3 }); moonBooth(540, 1400, 0.95); char('kevin', 540, 1340, 0.7, { pose: [[68.56, 'cheer'], [69.6, 'armsUp', 0.15]], emo: [[0, 'laugh']], extras: { suit: 1 } });
    [['mia', 170], ['leo', 380], ['lea', 700], ['zoe', 910]].forEach(([id, x], i) => char(id, x, 1760, 0.6, { pose: [[68.56, 'throwR'], [68.8 + i * 0.12, 'throwR2', 0.1], [69.2 + i * 0.12, 'throwR', 0.15]], emo: [[0, 'happy']], extras: { suit: 1, helmet: 1 }, flip: x > 540 })); cash('c56', 68.75, 34, { burst: [540, 1500] }); },
  ui() { slamNum('1.000.000 € / STÜCK', 69.59, 360, 72, PAL.yellow); },
  sfx: [[68.8, 'moneyRain', 1.6], [69.59, 'cashReg'], [70.0, 'coinBounce']] });

// =====================================================================  ONE YEAR LATER: THE RECKONING
// ---- 57 · "Schließlich, nach einem Jahr," — a calendar spins through 365 days
S(70.55, { tr: 'iris', lift: 0, cam: [[70.55, 540, 960, 1.0], [72.32, 540, 940, 1.1]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); const d = Math.min(365, Math.floor(1 + 364 * EZ.io(clamp((TT - 70.6) / 1.2)))); const k = springEase(TT - 70.6, 220, 13); ctx.save(); ctx.translate(540, 980); ctx.scale(k, k); calendarPage(0, 0, 1.25, 'TAG', d); ctx.restore(); },
  ui() { info('1 JAHR SPÄTER ⏳', 71.13, { y: 360, bg: PAL.orange, size: 60 }); },
  sfx: [[70.6, 'clockSpin', 1.4], [71.13, 'pop', 1], [71.9, 'ding']] });
// ---- 58 · "…die Abrechnung." — face to face across a table, slow push, heartbeat
S(72.32, { tr: 'zoomIn', tense: 1, lift: 200, cam: [[72.32, 540, 1150, 1.05], [73.19, 540, 1130, 1.14]],
  draw() { setStudio({ blur: 6 }); char('jonas', 320, FLOOR + 40, 0.9, { pose: [[0, 'armsCross']], emo: [[0, 'serious']], look: [0.7, 0], extras: JON }); char('kevin', 760, FLOOR + 40, 0.9, { pose: [[0, 'hips']], emo: [[0, 'smug']], look: [-0.7, 0] }); fillRR(140, FLOOR - 170, 800, 50, 14, '#6a3f22'); },
  ui() { info('ABRECHNUNG ⚖️', 72.5, { y: 380, bg: '#141026', size: 60 }); },
  sfx: [[72.5, 'pop', 1], [72.7, 'heartbeat', 0.8]] });
// ---- 59 · "Jonas knallt sein Konto auf den Tisch." — Jonas slams; the statement smacks onto the wood
S(73.19, { tr: 'cut', cam: [[73.19, 540, 1000, 1.0], [75.19, 540, 980, 1.08]], shake: [[74.03, 16, 0.35]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#6a4a2a'], [1, '#4a3018']]); ctx.fillRect(-600, -400, 2300, 2700); for (let i = 0; i < 10; i++) line(-600, 200 + i * 180, 1700, 220 + i * 180, 6, 'rgba(0,0,0,0.12)');
    const a = springEase(TT - 73.9, 220, 13); statement(540, 1000 - (1 - a) * 900, 1.3, 'JONAS', null, -0.04); impactLines(540, 1000, 300, 600, 14, 74.03); fingerArm('jonas', 1300, 1500, 760, lerp(1600, 1180, EZ.o3(clamp((TT - 73.6) / 0.4))), 120); },
  sfx: [[73.8, 'whooshDown', 1.2], [74.03, 'slam'], [74.06, 'thud']] });
// ---- 60 · "900 Milliarden." — the statement up close: 900.000.000.000 €
S(75.19, { tr: 'zoomIn', cam: [[75.19, 540, 1000, 1.2], [76.6, 540, 1000, 1.3]], punch: [[75.51, 0.08]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#6a4a2a'], [1, '#4a3018']]); ctx.fillRect(-600, -400, 2300, 2700); statement(540, 1000, 1.3, 'JONAS', '900 MRD. €', -0.04); },
  ui() { popText('900.000.000.000 €', 540, 380, 75.51, 88, '#41f08a', -0.04, 0); },
  sfx: [[75.51, 'cashReg'], [75.55, 'pop', 1]] });
// ---- 61 · "Schlag das mal!" — Jonas, arms crossed, challenging
S(76.6, { tr: 'whipL', cam: CLOSEJ(76.6, 77.63),
  draw() { setStudio({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], tilt: [[76.6, 0], [76.9, 0.08]], extras: JON }); },
  ui() { popText('SCHLAG DAS MAL! 😏', 540, 380, 76.63, 76, PAL.yellow, -0.04, 0); },
  sfx: [[76.63, 'pop', 1], [77.2, 'ting']] });
// ---- 62–65 · Kevin's clues: the logo, 1 Mio. plots, x 1 Mio. €, then "Rechne selbst!"
const clue = (t0, x, y, txt, col) => { if (TT < t0) return; const k = springEase(TT - t0, 300, 12); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); fillRR(-230, -70, 460, 140, 26, col); tText(txt, 0, 4, 50, { color: '#fff', shadow: false, maxW: 420 }); ctx.restore(); };
const CLUES = () => { clue(77.83, 540, 320, 'LOGO: 500 MRD. €', PAL.blue); clue(79.32, 300, 490, '1 MIO. GRUNDSTÜCKE', PAL.green); clue(80.59, 780, 490, '× 1 MIO. €', PAL.orange); };
S(77.63, { tr: 'whipR', cam: CLOSE(77.63, 78.34),
  draw() { setSpace({ seed: 'k62', blur: 6 }); moonBall(720, 880, 105, { logo: 1, halo: 0.4 }); char('kevin', 540, FLOOR + 130, 0.9, { pose: [[77.63, 'pointUpR']], emo: [[0, 'smug']] }); },
  ui() { CLUES(); },
  sfx: [[77.83, 'pop', 1], [78.0, 'sparkle']] });
S(78.34, { tr: 'cut', cam: CLOSE(78.34, 80.04),
  draw() { setSpace({ seed: 'k63', blur: 6 }); moonBall(720, 880, 105, { plots: 1, sold: 1, halo: 0.4 }); char('kevin', 540, FLOOR + 130, 0.9, { pose: [[78.34, 'pointR'], [79.3, 'pointL', 0.15]], emo: [[0, 'grin']] }); },
  ui() { CLUES(); },
  sfx: [[78.4, 'whoosh', 1.1], [79.32, 'popHi', 1], [79.6, 'tick']] });
S(80.04, { tr: 'zoomIn', cam: CLOSE(80.04, 81.15),
  draw() { setSpace({ seed: 'k64', blur: 6 }); char('kevin', 540, FLOOR + 130, 0.9, { pose: [[0, 'hips']], emo: [[0, 'smug']] }); cash('c64', 80.6, 14); },
  ui() { CLUES(); },
  sfx: [[80.2, 'swish', 1], [80.59, 'popHi', 1.2], [80.7, 'cashReg', 0.5]] });
S(81.15, { tr: 'whipL', cam: CLOSE(81.15, 81.97), punch: [[81.18, 0.1]],
  draw() { setStudio({ blur: 10 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'pointR']], emo: [[0, 'laugh']], look: [0, 0.3] }); const k = springEase(TT - 81.3, 260, 12); ctx.save(); ctx.translate(820, 780); ctx.rotate((1 - k) * 2); ctx.scale(k * 0.45, k * 0.45); calculator(0, 0, 1, '?', 0); ctx.restore(); },
  ui() { popText('RECHNE SELBST! 🧮', 540, 380, 81.18, 76, PAL.yellow, -0.04, 0); },
  sfx: [[81.18, 'pop', 1], [81.3, 'whoosh', 1.2], [81.59, 'ding']] });

// =====================================================================  THE QUESTION
// ---- 66 · "Wie viel hat Kevin?" — even split: both enter at once (Jonas 900 Mrd. on top, Kevin "???" below), the captions on the line
const YD = 900;
function splitEven(top, bottom) {
  ctx.save(); ctx.beginPath(); ctx.rect(-300, -400, 1700, YD + 400); ctx.clip(); top(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-300, YD, 1700, 1500); ctx.clip(); bottom(); ctx.restore(); line(-300, YD, 1400, YD, 14, '#ffffff');
}
S(81.97, { tr: 'glitch', tense: 1, capY: YD, cam: [[81.97, 540, 960, 1.0], [83.2, 540, 960, 1.03]],
  draw() { const k = springEase(TT - 81.99, 170, 13);
    splitEven(() => { rays('#b6302b', '#e8483c', { cy: 560, spin: 0.08 }); char('jonas', 330 - (1 - k) * 760, 860, 0.6, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], extras: JON, lean: (1 - k) * 0.25 }); },
      () => { setSpace({ seed: 'q' }); moonBall(820, 1130, 120, { logo: 1, halo: 0.3 }); char('kevin', 330 + (1 - k) * 760, 1840, 0.6, { pose: [[0, 'hips']], emo: [[0, 'smug']], extras: { shades: 1 }, lean: -(1 - k) * 0.25 }); }); },
  ui() { hud('KONTO · JONAS', [[0, 9e11]], { x: 760, y: 560, scale: 0.62, t0: 82.05 }); { const g = TT > 82.5 && TT < 82.75 ? Math.sin(TT * 90) * 12 : 0, kk = springEase(TT - 82.1, 260, 14); ctx.save(); ctx.translate(760 + g, 1560); ctx.scale(0.66 * kk, 0.66 * kk); blurCounter(0, 0, 560, 210, 'KONTO · KEVIN', { digits: 10 }); ctx.restore(); }
    info('WIE VIEL HAT KEVIN? 🤔', 82.14, { y: 250, bg: PAL.yellow, fg: '#1b1530', size: 50 }); },
  sfx: [[82.0, 'whoosh', 1.1], [82.05, 'pop', 1], [82.5, 'glitch'], [82.55, 'coinTicks', 0.6, 5]] });
