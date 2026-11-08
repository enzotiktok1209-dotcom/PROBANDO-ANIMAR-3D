// =====================================================================
//  shots.js — 1 Million sofort vs 1 Euro, der sich 30 Tage lang verdoppelt (DE). ~63 shots on the trimmed voice (99.6 s).
//  Kevin takes the million (invests, ends with 2 Mio.), Jonas the euro: day 30 = 2^29 = 536.870.912 EUR (never said).
//  Kevin stands left (green podium: the million), Jonas right (orange podium: the doubling euro).
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

const YD = 900;
LOOKS.seller = LOOKS.seller || { ...LOOKS.leo, top: '#5a5f73', topD: '#40445a', topL: '#7a8096', pants: '#2a2a33', pantsD: '#1c1c24', hair: '#a8a8b4', hairD: '#80808c', shoe: '#2b2b2b', shoeD: '#111' };
const myBank = (value, col = '#18a050') => () => { ctx.fillStyle = lin(0, -176, 0, 176, [[0, '#f4f6ff'], [1, '#e2e7fb']]); ctx.fillRect(-84, -176, 168, 352); fillRR(-84, -176, 168, 56, 0, '#1d48b8'); tText('MEINE BANK', 0, -148, 16, { color: '#fff', shadow: false });
  tText('KONTOSTAND', 0, -80, 13, { color: '#5b5f78', shadow: false, weight: 800 }); tText(value, 0, -45, value.length > 11 ? 20 : 26, { color: col, shadow: false, maxW: 156 }); euroCoin(0, 50, 40, { spin: Math.sin(TT * 3) * 0.4, shadow: false }); tText('1 € × 2 · JEDEN TAG', 0, 120, 11, { color: '#5b5f78', shadow: false, weight: 800 }); };
function splitEven(top, bottom) {
  ctx.save(); ctx.beginPath(); ctx.rect(-300, -400, 1700, YD + 400); ctx.clip(); top(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-300, YD, 1700, 1500); ctx.clip(); bottom(); ctx.restore(); line(-300, YD, 1400, YD, 14, '#ffffff');
}
const CARDS = (t0, y = 462) => { tText('WÄHL SCHNELL!', 540, y - 262, 70, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14, maxW: 1000 });
  choiceCard(285, y, 'SOFORT', '1 MILLION €', 'AUF DIE HAND', PAL.green, t0, () => { glow(0, 0, 200, '#a6f0b4', 0.3); briefcase(0, 60, 0.42, 1); });
  choiceCard(795, y, '30 TAGE LANG', '1 € × 2', 'JEDEN TAG VERDOPPELT', PAL.orange, t0 + 0.06, () => { glow(0, 0, 200, '#fff2b0', 0.4); euroCoin(-70, 0, 62, { spin: Math.sin(TT * 2) * 0.35, shadow: false }); tText('×2', 90, 4, 80, { color: '#fff', stroke: '#7a3a00', strokeW: 14 }); });
  tText('VS', 540, y, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); };
const pan = (t0, t1, x0, x1, y = 960, z0 = 1, z1 = 1.06) => [[t0, x0, y, z0], [t1, x1, y - 20, z1]];
const KJ = (o = {}) => ({ emo: [[0, 'grin']], ...o });
function bowTieOn(x, y, t0, s = 0.5) { if (TT < t0) return; const k = sp(t0, 260, 12); bowTie(x, y, s * k, Math.sin(TT * 4) * 0.08); }
function calShot(t0, t1, label, num, info0, tInfo, o = {}) {
  S(t0, { tr: o.tr ?? 'iris', tense: o.tense, cam: [[t0, 540, 960, 1.0], [t1, 540, 940, 1.12]],
    draw() { rays(o.c0 ?? '#5a2bd6', o.c1 ?? '#7a3cff', { cy: 900, spin: 0.3 }); const n = o.roll ? Math.max(1, Math.round(rollNum(o.roll, num, t0 + 0.05, t0 + 0.7))) : num;
      for (let i = 2; i >= 0; i--) { ctx.save(); ctx.translate(540 + i * 26, 980 - i * 16); ctx.rotate(i * 0.03); const kk = sp(t0 + 0.02, 220, 13); ctx.scale(kk, kk); calendarPage(0, 0, 1.25, label, Math.max(1, n - i)); ctx.restore(); }
      if (o.extra) o.extra(); },
    ui() { info(info0, tInfo, { y: 360, bg: o.bg ?? '#141026', size: 58 }); },
    sfx: [[t0 + 0.05, o.roll ? 'clockSpin' : 'flip', 0.8], ...(o.sfx || [])] });
}

// =====================================================================  THE HOOK
// ---- 1 · "Wähl schnell:" — the two at their buttons, hands raised, about to press; both options above (hard punch-in on frame one)
S(0.0, { tr: 'cut', lift: 110, cam: [[0, 540, 1000, 1.9], [0.22, 540, 1020, 1.0], [1.07, 560, 1010, 1.05]],
  draw() { setStudio(); char('kevin', 300, FLOOR - 40, 0.8, KJ({ pose: [[0, 'raiseR']], emo: [[0, 'grin']], look: [0.3, 0.4] })); char('jonas', 780, FLOOR - 40, 0.8, jonasT({ pose: [[0, 'raiseR']], emo: [[0, 'calm']], look: [-0.3, 0.4] })); studioPodiums({ litL: 0.4 + Math.sin(TT * 8) * 0.3, litR: 0.4 + Math.cos(TT * 8) * 0.3 }); },
  ui() { CARDS(0.02); },
  sfx: [[0.03, 'impact'], [0.05, 'pop', 1], [0.1, 'pop', 1.2], [0.45, 'tickSoft'], [0.7, 'tickSoft', 1.2]] });
// ---- 2 · "1 Million Euro sofort" — the briefcase snaps open on a cash mountain, the number slams
S(1.05, { tr: 'flash', cam: [[1.05, 540, 980, 1.0], [2.88, 560, 960, 1.1]], punch: [[1.32, 0.12]], shake: [[1.32, 14, 0.35]],
  draw() { rays('#0e8a45', '#2ee87a', { cy: 940, spin: 0.35 }); glow(540, 1000, 700, '#d8ffd0', 0.4); cashMountain(540, 1300, 1.1, clamp((TT - 1.07) / 0.5)); briefcase(540, 1120, 0.9 * sp(1.1, 260, 12), clamp((TT - 1.25) / 0.25)); billRain('h2', 1.35, 30, { burst: [540, 900], spread: 1.6 }); },
  ui() { if (TT > 1.32) { const k = sp(1.32, 300, 11); ctx.save(); ctx.translate(540, 400); ctx.scale(k, k); tText('1.000.000 €', 0, 0, 130, { color: PAL.yellow, stroke: '#3a2400', strokeW: 22 }); ctx.restore(); } info('SOFORT ⚡', 2.29, { y: 580, bg: PAL.red, size: 60 }); },
  sfx: [[1.1, 'whooshUp', 1], [1.25, 'carDoor'], [1.35, 'cashCannon'], [2.29, 'pop', 1]] });
// ---- 3 · "oder 1 Euro," — a single coin falls into a spotlight, bounces and spins
S(2.88, { tr: 'whipL', tense: 1, cam: [[2.88, 540, 1000, 1.0], [4.22, 540, 980, 1.14]],
  draw() { setDark('#3a2a12', '#05030c'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; poly([[440, -300], [640, -300], [880, 1500], [200, 1500]], 'rgba(255,240,190,0.10)'); ctx.restore(); ell(540, 1360, 300, 60, 'rgba(255,240,190,0.18)');
    const y = bounceY(TT - 2.9, 200, 1180); euroCoin(540, y, 150, { spin: (TT - 2.9) * 7, glow: 0.3 }); },
  ui() { popText('NUR 1 EURO?! 🤔', 540, 400, 3.28, 80, '#ffffff', -0.04, 0); },
  sfx: [[2.95, 'whooshDown', 0.8], [3.25, 'coinBounce'], [3.47, 'popHi', 1]] });
// ---- 4 · "…der sich 30 Tage lang…" — 30 calendar days flip past, the coin rides on top
S(4.22, { tr: 'zoomIn', cam: [[4.22, 540, 980, 1.0], [5.78, 520, 960, 1.08]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); const day = Math.min(30, Math.floor(1 + clamp((TT - 4.25) / 1.1) * 29));
    for (let i = 3; i >= 0; i--) { ctx.save(); ctx.translate(540 + i * 22, 1000 - i * 14); ctx.rotate(i * 0.025); calendarPage(0, 0, 1.05, 'TAG', Math.max(1, day - i)); ctx.restore(); }
    euroCoin(820, 650, 80, { spin: TT * 4, shadow: false }); },
  ui() { info('30 TAGE 📅', 4.65, { y: 360, bg: PAL.orange, size: 60 }); },
  sfx: [[4.3, 'flip'], [4.5, 'flip', 1.1], [4.7, 'flip', 1.2], [4.9, 'flip', 1.3], [5.1, 'flip', 1.4]] });
// ---- 5 · "…jeden Tag verdoppelt?" — 1, 2, 4, 8, 16: the coins double on screen
S(5.78, { tr: 'cut', cam: [[5.78, 540, 960, 1.0], [6.5, 540, 960, 1.06]], punch: [[5.81, 0.08]],
  draw() { rays('#c96b10', '#ffb03f', { cy: 900, spin: 0.4 }); const n = [1, 2, 4, 8, 16, 32][Math.min(5, Math.floor((TT - 5.8) / 0.12))]; doublingGrid(540, 1000, 800, 640, Math.max(1, n), 5.8, 0.004); },
  ui() { popText('× 2 JEDEN TAG!', 540, 400, 5.81, 92, '#ffffff', -0.04, 0); },
  sfx: [[5.82, 'popHi', 1], [5.94, 'popHi', 1.1], [6.06, 'popHi', 1.2], [6.18, 'popHi', 1.3], [6.3, 'popHi', 1.45]] });

// =====================================================================  THE CHOICE
// ---- 6 · "Kevin greift sofort…" — Kevin slams the green button, the camera whips to him
S(6.5, { tr: 'whipR', lift: 90, cam: [[6.5, 540, 1100, 1.15], [7.8, 330, 1110, 1.4]], shake: [[6.95, 18, 0.4]],
  draw() { setStudio({ blur: 3 }); char('jonas', 780, FLOOR - 40, 0.8, jonasT({ emo: [[0, 'calm']], look: [-0.6, 0.2] }));
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[6.5, 'raiseR'], [6.85, 'slamR', 0.08], [7.3, 'cheer', 0.2]], emo: [[6.5, 'grin'], [7.3, 'laugh']], look: [0.4, 0.5] });
    studioPodiums({ pressL: TT > 6.95 ? 1 : 0, litL: TT > 6.95 ? 0.9 : 0 }); impactLines(300, 1250, 120, 380, 12, 6.95); cash('k6', 7.0, 22); },
  ui() { info('SOFORT! 💨', 7.09, { y: 380, bg: PAL.green, size: 58 }); },
  sfx: [[6.85, 'whoosh', 1.3], [6.95, 'slam'], [6.98, 'buzzerWin'], [7.1, 'cashCannon']] });
// ---- 7 · "…nach dem Koffer mit der Million." — he snatches the briefcase off the podium
S(7.8, { tr: 'cut', cam: [[7.8, 470, 1000, 1.6], [9.08, 560, 980, 1.75]],
  draw() { setStudio({ blur: 9 }); const u = clamp((TT - 7.85) / 0.35); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[7.8, 'offerR'], [8.2, 'holdBoth', 0.15]], emo: [[0, 'grin']], lean: [[0, 0.15], [8.2, 0, 0.2]], holdR: TT > 8.2 ? () => briefcase(-70, 10, 0.3, 0) : undefined });
    if (TT < 8.2) briefcase(lerp(900, 700, EZ.io(u)), 1050, 0.55, 0); },
  ui() { info('DER KOFFER! 💼', 7.83, { y: 380, bg: '#141026', size: 56 }); },
  sfx: [[7.85, 'swish', 1.1], [8.2, 'thud'], [8.56, 'cashReg']] });
// ---- 8 · "Eine Million!" — Kevin hugs the open briefcase, bills everywhere
S(9.08, { tr: 'whipR', cam: CLOSE(9.08, 10.35),
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'holdBoth']], emo: [[0, 'laugh']], holdR: () => briefcase(-70, 10, 0.3, 1) }); cash('k8', 9.1, 22); },
  ui() { popText('EINE MILLION! 🤑', 540, 380, 9.65, 82, PAL.yellow, -0.04, 0); },
  sfx: [[9.12, 'moneyRain'], [9.65, 'cashReg']] });
// ---- 9 · "Einen Euro gibt man…" — Kevin holds the coin up between two fingers, sneering
S(10.35, { tr: 'zoomIn', cam: [[10.35, 600, 1000, 1.65], [11.75, 520, 980, 1.8]],
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, { la: [0.16, -0.12], ra: [1.9, -0.6] }]], emo: [[0, 'smug'], [11.1, 'laugh']], look: [0.6, -0.3], tilt: [[0, 0], [11.0, -0.08]] }); euroCoin(760, 720, 46, { spin: Math.sin(TT * 3) * 0.4, shadow: false, glow: 0.2 }); },
  ui() { popText('NUR 1 EURO? 😂', 540, 380, 10.73, 80, '#ff8fc0', -0.04, 0); },
  sfx: [[10.4, 'swish'], [10.73, 'coin', 1.2], [11.1, 'boing']] });
// ---- 10 · "…einem Obdachlosen, Jonas!" — the coin flicked through the air, slow motion, into a paper cup
S(11.75, { tr: 'cut', lift: 0, cam: [[11.75, 300, 1100, 1.1], [12.9, 760, 1180, 1.25]],
  draw() { setStreet({ blur: 5 }); fillRR(-600, 1380, 2300, 900, 0, '#8a8aa0'); for (let i = 0; i < 6; i++) line(-600 + i * 380, 1380, -700 + i * 420, 2300, 4, 'rgba(0,0,0,0.12)');
    paperCup(820, 1440, 0.9); const u = clamp((TT - 11.8) / 0.75), x = lerp(200, 820, u), y = lerp(900, 1330, u) - Math.sin(u * Math.PI) * 380; if (u < 1) euroCoin(x, y, 40, { spin: TT * 14, shadow: false }); else euroCoin(820, 1310, 34, { spin: 0.2, shadow: false }); },
  ui() { info('FÜR DEN BECHER… 🪙', 12.1, { y: 380, bg: '#141026', size: 52 }); },
  sfx: [[11.8, 'ting'], [11.82, 'planeWhoosh', 0.7], [12.55, 'coinJar'], [12.47, 'pop', 1]] });
// ---- 11 · "Jonas nimmt den Euro und lächelt nur." — Jonas picks the coin up, holds it to the light, a calm smile
S(12.9, { tr: 'whipL', cam: [[12.9, 640, 1000, 1.6], [15.0, 520, 980, 1.78]],
  draw() { setStudio({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, jonasT({ pose: [[12.9, 'idle'], [13.3, { la: [0.16, -0.12], ra: [1.9, -0.6] }, 0.25]], emo: [[0, 'neutral'], [14.31, 'calm', 0.3]], look: [0.6, -0.4] }));
    if (TT > 13.4) euroCoin(760, 720, 46 * sp(13.4, 260, 12), { spin: Math.sin(TT * 2) * 0.3, shadow: false, glow: 0.5 }); twinkles('j11', 640, 600, 260, 260, 6, { s: 22 }); },
  ui() { info('ER LÄCHELT NUR 🙂', 14.31, { y: 380, bg: PAL.orange, size: 54 }); },
  sfx: [[13.35, 'coin', 1.4], [13.6, 'sparkle'], [14.31, 'pop', 1]] });
// ---- 12 · "Wart's ab." — close: Jonas raises a finger, confident
S(15.0, { tr: 'cut', cam: [[15.0, 540, 980, 1.85], [15.84, 540, 970, 1.95]], punch: [[15.04, 0.08]],
  draw() { setStudio({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, jonasT({ pose: [[0, 'pointUpR']], emo: [[0, 'smug']], tilt: [[0, 0], [15.3, 0.08]] })); },
  ui() { popText("WART'S AB! ☝️", 540, 380, 15.04, 92, PAL.yellow, -0.04, 0); },
  sfx: [[15.42, 'ting']] });
// ---- 13 · "Wer am Ende weniger hat," — face to face, a slow push, the vignette closes
S(15.84, { tr: 'zoomIn', lift: 200, tense: 1, cam: [[15.84, 540, 1150, 1.05], [17.5, 540, 1130, 1.18]],
  draw() { setStudio({ blur: 4 }); char('kevin', 320, FLOOR + 40, 0.9, { pose: [[0, 'hips']], emo: [[0, 'smug']], look: [0.7, 0] }); char('jonas', 760, FLOOR + 40, 0.9, jonasT({ pose: [[0, 'pointL']], emo: [[0, 'smug']], look: [-0.7, 0] })); },
  ui() { info('WER WENIGER HAT… 😏', 16.47, { y: 380, bg: '#141026', size: 56 }); },
  sfx: [[15.9, 'heartbeat', 1.5], [16.47, 'pop', 1]] });
// ---- 14 · "…ist einen Monat lang der Butler des anderen!" — a bow tie and a silver tray drop in
S(17.5, { tr: 'whipR', cam: [[17.5, 540, 960, 1.0], [19.2, 540, 950, 1.1]], punch: [[18.17, 0.1]],
  draw() { rays('#1b1b2a', '#3a3a5a', { cy: 900, spin: 0.2 }); glow(540, 900, 600, '#ffffff', 0.15); const k = sp(17.55, 240, 12); silverTray(540, 1250, 1.3 * k, clamp((TT - 18.4) / 0.4));
    if (TT > 18.45) { const k2 = sp(18.45, 260, 12); ctx.save(); ctx.translate(540, 1050 - 140 * clamp((TT - 18.4) / 0.4)); ctx.scale(k2, k2); tText('1', 0, 0, 120, { color: '#fff', stroke: '#1b1530', strokeW: 18 }); tText('MONAT', 0, 90, 46, { color: '#fff', stroke: '#1b1530', strokeW: 10 }); ctx.restore(); }
    if (TT > 18.17) bowTie(540, 700, 1.2 * sp(18.17, 260, 11), Math.sin(TT * 4) * 0.08); },
  ui() { popText('BUTLER! 🤵', 540, 380, 18.17, 100, '#ffffff', -0.04, 0); },
  sfx: [[17.55, 'whooshDown'], [17.7, 'glassClink'], [18.17, 'ting'], [18.45, 'creak', 1.5], [18.6, 'sparkle']] });
// ---- 15 · "Abgemacht!" — the handshake slams
S(19.2, { tr: 'cut', lift: 200, cam: [[19.2, 540, 1150, 1.1], [19.95, 540, 1130, 1.18]], punch: [[19.24, 0.12]], shake: [[19.24, 12, 0.3]],
  draw() { const sh = TT > 19.24 ? Math.sin(TT * 30) * 0.05 * clamp(1 - (TT - 19.24) / 0.6) : 0; setStudio({ blur: 4 });
    char('kevin', 320, FLOOR + 40, 0.9, { pose: [[0, { la: [0.16, -0.12], ra: [0.85 + sh, -0.2] }]], emo: [[0, 'grin']], look: [0.7, 0] });
    char('jonas', 760, FLOOR + 40, 0.9, jonasT({ pose: [[0, { la: [0.85 - sh, -0.2], ra: [0.16, -0.12] }]], emo: [[0, 'grin']], look: [-0.7, 0] })); impactLines(540, 1200, 80, 260, 10, 19.24); },
  ui() { info('ABGEMACHT! 🤝', 19.24, { y: 380, bg: PAL.red, size: 66 }); },
  sfx: [[19.22, 'pat'], [19.24, 'impact']] });

// =====================================================================  KEVIN'S PORSCHE
// ---- 16 · "Noch am selben Tag fährt Kevin mit einem…" — the silver Porsche rolls out of the showroom, the camera tracks it
S(19.95, { tr: 'zoomOut', lift: 0, cam: [[19.95, 380, 1120, 1.0], [21.9, 700, 1100, 1.08]],
  draw() { setShowroom(); const x = lerp(-200, 640, EZ.o3(clamp((TT - 20.0) / 1.6))); char('kevin', x - 20, 1400, 0.5, { pose: [[0, 'waveR']], emo: [[0, 'laugh']], extras: { shades: 1 } }); supercar(x, 1420, 1.0, { col: '#c9ced9', wheelSpin: x / 98, roof: 0 }); if (TT < 21.6) speedLines(10, 0.25, 'sl16'); },
  ui() { info('NOCH AM SELBEN TAG 🏎️', 20.37, { y: 360, bg: '#141026', size: 50 }); },
  sfx: [[20.0, 'engine'], [20.37, 'pop', 1], [21.3, 'skid']] });
// ---- 17 · "…Porsche 911…" — a slow pass along the car, the badge
S(21.9, { tr: 'whipL', lift: 0, cam: [[21.9, 300, 1300, 1.7], [23.15, 760, 1290, 1.8]],
  draw() { setShowroom({ blur: 4 }); char('kevin', 520, 1400, 0.5, { pose: [[0, 'idle']], emo: [[0, 'grin']], extras: { shades: 1 } }); supercar(540, 1420, 1.0, { col: '#c9ced9', wheelSpin: TT * 0.5, roof: 0 }); twinkles('p17', 200, 1150, 700, 250, 8, { s: 26 }); },
  ui() { info('PORSCHE 911 🔥', 22.17, { y: 380, bg: PAL.red, size: 62 }); },
  sfx: [[21.95, 'carDoor'], [22.17, 'pop', 1], [22.58, 'engine'], [22.9, 'sparkle']] });
// ---- 18 · "…für 200.000 Euro vom Hof." — the price tag swings in, bills fly, he roars off
S(23.15, { tr: 'cut', lift: 0, cam: [[23.15, 540, 1180, 1.15], [25.1, 620, 1170, 1.22]], punch: [[23.18, 0.08]],
  draw() { setShowroom({ blur: 3 }); const x = 540 + Math.pow(clamp((TT - 24.6) / 0.5), 2) * 900; char('kevin', x - 20, 1400, 0.5, { pose: [[0, 'cheer']], emo: [[0, 'laugh']], extras: { shades: 1 } }); supercar(x, 1420, 1.0, { col: '#c9ced9', wheelSpin: x / 98, roof: 0 }); cash('p18', 23.2, 20); if (TT > 24.6) speedLines(12, 0.4, 'sl18'); },
  ui() { priceTag(560, 620, sp(23.18, 280, 12), '200.000 €', -0.08); },
  sfx: [[23.18, 'cashReg'], [23.3, 'moneyRain', 0.8], [24.6, 'engine'], [24.79, 'screech']] });
// ---- 19 · "Dazu das neue iPhone Duo, in Gold." — a gold phone spins in, Kevin takes a selfie
S(25.1, { tr: 'zoomIn', cam: [[25.1, 540, 1000, 1.6], [27.5, 520, 980, 1.75]],
  draw() { setPenthouse({ blur: 10 }); char('kevin', 400, FLOOR + 170, 1.05, { pose: [[0, 'phoneR']], emo: [[0, 'grin'], [26.9, 'love', 0.2]], look: [0.6, -0.3], extras: { shades: 1 } });
    const k = sp(25.15, 240, 12); goldPhone(810, 880, 0.75 * k, (1 - k) * 3 + Math.sin(TT * 2) * 0.06); if (TT > 27.13) twinkles('g19', 650, 600, 340, 560, 10, { s: 30 }); },
  ui() { info('IPHONE DUO 📱', 26.06, { y: 380, bg: '#141026', size: 58 }); if (TT > 27.13) popText('IN GOLD! ✨', 540, 560, 27.13, 70, PAL.gold, -0.04, 0); },
  sfx: [[25.15, 'whoosh', 1.2], [25.4, 'bling'], [26.06, 'pop', 1], [26.4, 'shutter'], [27.13, 'sparkle']] });

// =====================================================================  JONAS, POOR AND TEMPTED
// ---- 20 · "Jonas dagegen hat nach einer Woche…" — TAG 7, the doubling coins pile up: still tiny
calShot(27.5, 29.35, 'TAG', 7, 'NACH 1 WOCHE…', 29.05, { roll: 1, c0: '#c96b10', c1: '#ffb03f' });
// ---- 21 · "…gerade mal 64 Euro." — Jonas at home with his phone, a shrug; 64 € on the screen
S(29.35, { tr: 'whipR', cam: [[29.35, 600, 1000, 1.6], [31.15, 520, 980, 1.75]],
  draw() { setFlat({ blur: 9 }); char('jonas', 400, FLOOR + 170, 1.05, jonasT({ pose: [[29.35, 'phoneR'], [30.6, 'shrug', 0.2]], emo: [[0, 'neutral'], [30.6, 'calm', 0.2]], look: [0.6, -0.2] })); },
  ui() { const k = sp(29.4, 240, 13); ctx.save(); ctx.translate(790, 920); ctx.rotate(0.05); ctx.scale(k * 1.9, k * 1.9); phone(0, 0, 1, 0, myBank('64,00 €')); ctx.restore(); popText('NUR 64 €! 😅', 540, 380, 30.04, 80, '#ffffff', -0.04, 0); },
  sfx: [[29.4, 'phoneTap'], [30.04, 'coin'], [30.6, 'sadTrombone', 0.5]] });
// ---- 22 · "Und es wird schlimmer:" — rain on the window, a slow push on Jonas, thunder
S(31.15, { tr: 'cut', tense: 1, cam: [[31.15, 540, 1000, 1.7], [32.05, 540, 980, 1.95]],
  draw() { setFlat({ blur: 12 }); ctx.fillStyle = 'rgba(10,10,40,0.35)'; ctx.fillRect(-600, -400, 2300, 2800); if (Math.floor(TT * 10) % 7 === 0) { ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fillRect(-600, -400, 2300, 2800); }
    const R = RNG('rain', Math.floor(TT * 30)); for (let i = 0; i < 40; i++) line(R.f() * 1300 - 100, R.f() * 2000 - 100, 0, 0, 0, 'rgba(0,0,0,0)'); for (let i = 0; i < 40; i++) { const x = R.f() * 1300 - 100, y = R.f() * 2000; line(x, y, x - 20, y + 60, 3, 'rgba(200,220,255,0.35)'); }
    char('jonas', 540, FLOOR + 170, 1.05, jonasT({ emo: [[0, 'scared']], look: [0.3, -0.2] })); },
  ui() { popText('SCHLIMMER… 😟', 540, 380, 31.64, 80, '#ff4545', -0.04, 0); },
  sfx: [[31.2, 'rain', 1.0], [31.4, 'thunder', 0.8]] });
// ---- 23 · "Am zwölften Tag steht sein Vermieter vor der Tür." — the doorbell, the door swings open: an angry landlord
S(32.05, { tr: 'whipL', lift: 0, cam: [[32.05, 540, 1060, 1.0], [34.5, 560, 1040, 1.1]],
  draw() { setFlat(); const o = clamp((TT - 33.1) / 0.4); door(540, 1380, 1.0, o); if (o > 0) { ctx.save(); ctx.beginPath(); ctx.rect(375, 680, 330, 700); ctx.clip(); ctx.globalAlpha = clamp(o * 1.5); char('seller', 560, 1420, 0.9, { pose: [[0, 'holdR']], emo: [[0, 'angry']], look: [0, 0.3], holdR: () => letter(0, -30, 0.2, 'MIETE', '900 €', 0.1) }); ctx.restore(); } },
  ui() { info('TAG 12 📅', 32.27, { y: 360, bg: '#141026', size: 56 }); if (TT > 33.28) info('DER VERMIETER! 😠', 33.28, { y: 520, bg: PAL.red, size: 52 }); },
  sfx: [[32.3, 'doorbell'], [33.1, 'creak'], [33.28, 'pop', 1], [33.9, 'footsteps', 0.4]] });
// ---- 24 · "Die Miete ist fällig." — the letter, the red stamp FÄLLIG
S(34.5, { tr: 'zoomIn', cam: [[34.5, 540, 960, 1.0], [35.6, 540, 950, 1.08]], shake: [[35.19, 12, 0.3]],
  draw() { setDark('#3a1a12', '#05030c'); const k = sp(34.52, 240, 13); letter(540, 980 - (1 - k) * 800, 1.6, 'MIETE', '900 €', -0.04); },
  ui() { stampBox(560, 1150, 35.19, 'FÄLLIG!', '#ff3b4a', -0.18, 90); },
  sfx: [[34.52, 'paperTear'], [34.7, 'fold'], [35.19, 'stamp', 1.3]] });
// ---- 25 · "Jonas könnte sein Geld abheben." — his thumb hovers over AUSZAHLEN, sweat
S(35.6, { tr: 'cut', cam: [[35.6, 540, 960, 1.0], [37.3, 540, 950, 1.1]],
  draw() { setFlat({ blur: 12 }); const k = sp(35.62, 240, 13); ctx.save(); ctx.translate(540, 1000); ctx.scale(2.3 * k, 2.3 * k); phone(0, 0, 1, 0, () => { ctx.fillStyle = '#f4f6ff'; ctx.fillRect(-84, -176, 168, 352); fillRR(-84, -176, 168, 52, 0, '#1d48b8'); tText('MEINE BANK', 0, -150, 16, { color: '#fff', shadow: false }); tText('2.048 €', 0, -60, 30, { color: '#18a050', shadow: false }); fillRR(-66, 60, 132, 54, 14, '#ff8a1e'); tText('AUSZAHLEN', 0, 87, 17, { color: '#fff', shadow: false }); }); ctx.restore();
    const hov = Math.sin(TT * 6) * 14; ctx.save(); ctx.translate(560 + hov, 1310 + Math.max(0, 120 - (TT - 35.6) * 200)); circ(0, 0, 70, '#f6cfaa'); fillRR(-50, 0, 100, 420, 40, '#e2453c'); ctx.restore(); },
  ui() { info('ABHEBEN? 🤔', 36.52, { y: 380, bg: PAL.orange, size: 60 }); },
  sfx: [[35.65, 'whoosh', 1.2], [36.52, 'pop', 1], [36.6, 'tension', 0.7]] });
// ---- 26 · "Doch dann wäre die Wette verloren." — the nightmare: Jonas in a bow tie, serving Kevin (slow push, vignette)
S(37.3, { tr: 'iris', tense: 1, lift: 200, cam: [[37.3, 540, 1150, 1.05], [39.1, 540, 1120, 1.18]],
  draw() { setPenthouse({ blur: 5 }); ctx.fillStyle = 'rgba(40,0,60,0.25)'; ctx.fillRect(-600, -400, 2300, 2800);
    char('kevin', 330, FLOOR + 40, 0.9, { pose: [[0, 'armsCross']], emo: [[0, 'laugh']], extras: { shades: 1 }, look: [0.7, 0] });
    char('jonas', 760, FLOOR + 40, 0.9, jonasT({ pose: [[0, 'holdBoth']], emo: [[0, 'sad']], look: [-0.7, 0.2], holdR: () => silverTray(-60, -20, 0.35, 0) })); bowTie(760, FLOOR + 40 - 0.9 * 520, 0.3, 0); },
  ui() { stampBox(540, 270, 38.51, 'WETTE VERLOREN', '#ff3b4a', -0.1, 64); },
  sfx: [[37.35, 'creak', 1.2], [37.6, 'tension', 1.0], [38.51, 'stamp']] });

// =====================================================================  KEVIN'S NEW FRIENDS
// ---- 27 · "Währenddessen hat Kevin plötzlich…" — Kevin with his Porsche, people start walking towards him
S(39.1, { tr: 'whipR', lift: 0, cam: [[39.1, 360, 1080, 1.0], [41.0, 640, 1060, 1.06]],
  draw() { setStreet(); supercar(780, 1480, 0.8, { col: '#c9ced9', roof: 0 }); char('kevin', 450, 1500, 0.75, { pose: [[0, 'spinKeys']], emo: [[0, 'smug']], extras: { shades: 1 } });
    for (let i = 0; i < 5; i++) { const t0 = 39.6 + i * 0.2, x = lerp(-150 - i * 60, 60 + i * 50, EZ.o3(clamp((TT - t0) / 0.8))); if (TT < t0) continue; const c = ['#4a3780', '#e8483c', '#26a24c', '#ff8a1e', '#52b8ff'][i]; circ(x, 1150 - (i % 2) * 40, 50, '#f3c9a5'); fillRR(x - 70, 1200 - (i % 2) * 40, 140, 260, 60, c); } },
  ui() { info('WÄHRENDDESSEN… 👀', 39.4, { y: 360, bg: '#141026', size: 54 }); },
  sfx: [[39.2, 'carMusic', 1.5], [39.6, 'footsteps', 1.2]] });
// ---- 28 · "…zwanzig neue beste Freunde." — a crowd with hearts, the friend counter rolls to 20
S(41.0, { tr: 'cut', lift: 0, cam: [[41.0, 540, 1000, 1.0], [42.5, 540, 990, 1.08]],
  draw() { setStreet({ blur: 4 }); const R = RNG('fr');
    for (let i = 0; i < 9; i++) { const x = 80 + i * 115 + R.n(15), y = 1350 - (i % 3) * 60, c = ['#4a3780', '#e8483c', '#26a24c', '#ff8a1e', '#52b8ff'][i % 5]; circ(x, y - 170, 52, ['#f3c9a5', '#c98b62', '#e2a77c'][i % 3]); fillRR(x - 72, y - 120, 144, 280, 60, c); if (TT > 41.1 + i * 0.05) heartIcon(x, y - 260 - Math.sin(TT * 4 + i) * 10, 26); }
    char('kevin', 540, 1560, 0.75, { pose: [[0, 'armsUp']], emo: [[0, 'laugh']], extras: { shades: 1 } }); },
  ui() { const n = Math.round(rollNum(0, 20, 41.05, 42.0)); info('+' + n + ' BESTE FREUNDE 🤝', 41.02, { y: 380, bg: PAL.pink, size: 54 }); },
  sfx: [[41.05, 'coinTicks', 1.0, 18], [41.41, 'applause', 1.0], [42.02, 'kiss']] });
// ---- 29 · "Alle wollen etwas von seiner Million." — hands grab at the briefcase from every side, bubbles beg
S(42.5, { tr: 'zoomIn', cam: [[42.5, 540, 960, 1.0], [44.25, 540, 950, 1.1]], shake: [[43.3, 8, 0.6]],
  draw() { rays('#3a1a6a', '#5a2bd6', { cy: 900, spin: 0.3 }); briefcase(540, 1080, 0.9, 1); grabHands('gh', 540, 950, 6, 42.55); },
  ui() { bubble(300, 520, 'LEIH MIR 10K! 🙏', 42.84, { rot: -0.06 }); bubble(780, 640, 'BRO, NUR KURZ!', 43.14, { rot: 0.05, tail: 30 }); bubble(330, 760, 'MEIN AUTO… 🚗', 43.57, { rot: -0.03 }); },
  sfx: [[42.55, 'rustle'], [42.84, 'pop', 1], [43.14, 'pop', 1.15], [43.57, 'pop', 1.3], [43.87, 'cashReg']] });
// ---- 30 · "Doch Kevin hat einen Plan,…" — Kevin taps his temple with a sly grin, a lightbulb flicks on
S(44.25, { tr: 'whipL', tense: 1, cam: [[44.25, 540, 1000, 1.65], [45.7, 540, 980, 1.85]],
  draw() { setPenthouse({ blur: 12, night: 1 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'thinkR']], emo: [[0, 'smug']], extras: { shades: 1 } });
    if (TT > 45.5) { const k = sp(45.5, 300, 12); ctx.save(); ctx.translate(830, 660); ctx.scale(k, k); glow(0, 0, 160, '#fff3a0', 0.7); circ(0, 0, 60, '#ffe14d'); fillRR(-30, 50, 60, 50, 10, '#9aa0ae'); ctx.restore(); } },
  ui() { info('EIN PLAN… 💡', 45.5, { y: 380, bg: PAL.yellow, fg: '#1b1530', size: 58 }); },
  sfx: [[44.3, 'tension', 1.3], [45.5, 'ding']] });
// ---- 31 · "…von dem keiner etwas weiß." — a sealed envelope: GEHEIM
S(45.7, { tr: 'cut', tense: 1, cam: [[45.7, 540, 960, 1.05], [47.2, 540, 960, 1.18]],
  draw() { setDark('#1a1430', '#05030c'); const k = sp(45.72, 240, 13); ctx.save(); ctx.translate(540, 1000); ctx.rotate(-0.06); ctx.scale(k, k); fillRR(-330, -210, 660, 420, 24, '#e9e2d0'); poly([[-330, -210], [330, -210], [0, 40]], '#d8cfb8'); circ(0, 30, 60, '#c4161c'); tText('K', 0, 34, 54, { color: '#fff', shadow: false }); ctx.restore(); },
  ui() { stampBox(540, 620, 46.3, 'GEHEIM 🤫', '#ff3b4a', -0.12, 80); },
  sfx: [[45.75, 'paperPile', 0.5], [46.3, 'stamp'], [46.52, 'tickSoft']] });

// =====================================================================  JONAS PAYS THE RENT
// ---- 32 · "Und Jonas' Miete?" — Jonas eyes the door, worried
S(47.2, { tr: 'whipR', cam: CLOSE(47.2, 48.2),
  draw() { setFlat({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, jonasT({ pose: [[0, 'thinkR']], emo: [[0, 'scared']], look: [-0.6, 0], extras: { sweat: 1 } })); },
  ui() { popText('UND DIE MIETE? 😬', 540, 380, 47.43, 78, '#ffffff', -0.04, 0); },
  sfx: [[47.3, 'gulp']] });
// ---- 33 · "Er verkauft seine PlayStation," — the console box, the SOLD stamp, Jonas hugs it goodbye
S(48.2, { tr: 'cut', cam: [[48.2, 600, 1000, 1.25], [49.7, 520, 990, 1.35]],
  draw() { setFlat({ blur: 6 }); char('jonas', 330, FLOOR + 80, 0.95, jonasT({ pose: [[0, 'holdBoth']], emo: [[0, 'sad']], look: [0.6, 0.2], extras: { tear: 1 } })); ps5Box(760, FLOOR - 40, 0.75, 0.05); },
  ui() { stampBox(760, 760, 49.1, 'VERKAUFT', '#ff3b4a', -0.15, 70); },
  sfx: [[48.3, 'trolley', 0.8], [49.1, 'stamp'], [49.3, 'cashReg']] });
// ---- 34 · "…nur um durchzuhalten." — he hands the cash to the landlord; the door shuts, Jonas breathes out
S(49.7, { tr: 'whipL', lift: 200, cam: [[49.7, 480, 1150, 1.05], [50.95, 600, 1140, 1.12]],
  draw() { setFlat(); char('seller', 780, FLOOR + 40, 0.9, { pose: [[0, 'offerR']], emo: [[0, 'neutral'], [50.2, 'happy', 0.2]], look: [-0.6, 0], flip: 1 }); char('jonas', 320, FLOOR + 40, 0.9, jonasT({ pose: [[0, 'offerR']], emo: [[0, 'calm']], look: [0.6, 0] }));
    if (TT < 50.3) bill(560 + (TT - 49.7) * 300, 1030, 140, -0.1); },
  ui() { info('MIETE BEZAHLT ✅', 50.12, { y: 380, bg: PAL.green, size: 56 }); },
  sfx: [[49.75, 'rustle'], [50.12, 'pop', 1], [50.6, 'doorSlam']] });

// =====================================================================  DAY 21
// ---- 35 · "Am 21. Tag passiert es:" — TAG 21, slow push, tension rises
calShot(50.95, 53.0, 'TAG', 21, 'TAG 21… 😳', 51.15, { tense: 1, roll: 13, sfx: [[52.33, 'heartbeat', 0.8]] });
// ---- 36 · "Jonas hat zum ersten Mal…" — Jonas stares at his phone, the number climbs
S(53.0, { tr: 'zoomIn', cam: CLOSE(53.0, 54.5),
  draw() { setFlat({ blur: 9 }); char('jonas', 400, FLOOR + 170, 1.05, jonasT({ pose: [[0, 'phoneR']], emo: [[0, 'neutral'], [54.0, 'shock', 0.2]], look: [0.6, -0.2] })); },
  ui() { const k = sp(53.05, 240, 13); ctx.save(); ctx.translate(790, 920); ctx.rotate(0.05); ctx.scale(k * 1.9, k * 1.9); phone(0, 0, 1, 0, myBank(fmtEUR(Math.round(rollNum(524288, 1048576, 53.2, 54.3))))); ctx.restore(); },
  sfx: [[53.05, 'whoosh', 1.2], [53.2, 'coinTicks', 1.1, 10]] });
// ---- 37 · "…mehr als eine Million." — the card slams: 1.048.576 €, Jonas jumps
S(54.5, { tr: 'flash', cam: [[54.5, 540, 960, 1.0], [55.85, 540, 950, 1.08]], punch: [[55.33, 0.12]],
  draw() { rays('#0e8a45', '#2ee87a', { cy: 940, spin: 0.35 }); char('jonas', 540, 1650, 0.8, jonasT({ pose: [[0, 'cheer']], emo: [[0, 'laugh']], jump: [[0, 0], [54.7, 60, 0.15], [55.0, 0, 0.15], [55.2, 50, 0.15], [55.5, 0, 0.15]] })); confetti('c37', 55.33, 50); cash('j37', 55.35, 16); },
  ui() { moneyCard(540, 520, 0.95 * sp(54.55, 300, 12), 'JONAS · TAG 21', 1048576); info('ÜBER 1 MILLION! 🤯', 55.33, { y: 290, bg: PAL.orange, size: 52 }); },
  sfx: [[54.55, 'pop', 1], [55.33, 'cashCannon'], [55.4, 'applause', 0.8]] });
// ---- 38 · "Und dann sperrt die Bank sein Konto." — the bank front, a giant red padlock slams down
S(55.85, { tr: 'glitch', lift: 0, cam: [[55.85, 540, 1000, 1.0], [57.8, 540, 980, 1.08]], shake: [[56.33, 18, 0.4]],
  draw() { setDark('#1e2a5a', '#05030c'); bankFront(540, 1500, 0.9); if (TT > 56.33) { for (let i = 0; i < 7; i++) fillRR(150 + i * 130, 700, 22, 820, 8, '#2a2f45'); } const k = TT > 56.2 ? bounceY(TT - 56.2, -300, 900) : -500; padlock(540, k, 1.1, 0); },
  ui() { info('KONTO GESPERRT! 🔒', 56.8, { y: 360, bg: PAL.red, size: 56 }); },
  sfx: [[55.9, 'whooshDown'], [56.33, 'doorSlam'], [56.4, 'errorBuzz'], [56.8, 'pop', 1]] });
// ---- 39 · "Verdacht auf Geldwäsche!" — a washing machine full of banknotes spins, the stamp
S(57.8, { tr: 'zoomIn', cam: [[57.8, 540, 960, 1.0], [59.2, 540, 950, 1.1]],
  draw() { setDark('#3a0a12', '#05030c'); const sh = Math.sin(TT * 40) * 6; moneyWasher(540 + sh, 980, 1.25, TT * 9); },
  ui() { stampBox(540, 420, 58.49, 'GELDWÄSCHE?!', '#ff3b4a', -0.1, 72); },
  sfx: [[57.85, 'pump', 1.2], [58.49, 'stamp', 1.2], [58.6, 'siren', 0.6]] });
// ---- 40 · "Nein! Das ist mein Geld!" — Jonas loses his calm: hands on his head, the red lock on his phone
S(59.2, { tr: 'flash', cam: CLOSE(59.2, 61.2), shake: [[59.25, 18, 0.4]], punch: [[59.25, 0.1]],
  draw() { setFlat({ blur: 12 }); ctx.fillStyle = 'rgba(200,20,30,0.2)'; ctx.fillRect(-600, -400, 2300, 2800); char('jonas', 540, FLOOR + 170, 1.05, jonasT({ pose: [[0, 'headGrab'], [60.3, 'shrug', 0.2]], emo: [[0, 'shock'], [60.3, 'angry', 0.2]], extras: { sweat: 1 } })); },
  ui() { popText('NEIN!!! 😱', 540, 380, 59.25, 100, '#ff4545', -0.04, 0); const k = sp(60.0, 260, 12); ctx.save(); ctx.translate(850, 900); ctx.rotate(0.08); ctx.scale(k * 1.3, k * 1.3); phone(0, 0, 1, 0, () => bankLockScreen(true)); ctx.restore(); },
  sfx: [[59.25, 'shockHit'], [60.0, 'whoosh', 1.3], [60.72, 'errorBuzz']] });

// =====================================================================  KEVIN'S PLAN
// ---- 41 · "Und Kevins Plan?" — back to Kevin, smug on his sofa
S(61.2, { tr: 'whipR', cam: [[61.2, 620, 1000, 1.6], [62.2, 540, 990, 1.72]],
  draw() { setPenthouse({ blur: 10 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'hips']], emo: [[0, 'smug']], extras: { shades: 1 } }); },
  ui() { popText('KEVINS PLAN? 🤔', 540, 380, 61.45, 80, PAL.blue, -0.04, 0); },
  sfx: [[61.3, 'swish'], [61.9, 'tickSoft']] });
// ---- 42 · "Er kauft ganz normale Aktien," — the stock app: his thumb taps KAUFEN
S(62.2, { tr: 'zoomIn', cam: [[62.2, 540, 960, 1.0], [63.75, 540, 950, 1.08]],
  draw() { setPenthouse({ blur: 12 }); const k = sp(62.22, 240, 13); ctx.save(); ctx.translate(540, 1000); ctx.scale(2.3 * k, 2.3 * k); phone(0, 0, 1, 0, () => stockScreen(0.3, TT > 62.42 ? clamp((TT - 62.42) / 0.5) : 0, { value: '+0,4 %' })); ctx.restore();
    const tap = TT > 62.3 && TT < 62.6; ctx.save(); ctx.translate(560, tap ? 1300 : 1400); circ(0, 0, 70, '#f3c9a5'); fillRR(-50, 0, 100, 420, 40, '#2f6df6'); ctx.restore(); },
  ui() { info('NORMALE AKTIEN 📈', 63.31, { y: 380, bg: '#141026', size: 56 }); },
  sfx: [[62.25, 'whoosh', 1.2], [62.42, 'phoneTap'], [62.45, 'ding'], [63.31, 'pop', 1]] });
// ---- 43 · "…einfach in seiner Banking-App." — Kevin lounging, phone up, tapping casually
S(63.75, { tr: 'cut', lift: 120, cam: [[63.75, 420, 1100, 1.0], [65.2, 600, 1090, 1.07]],
  draw() { setPenthouse(); char('kevin', 360, FLOOR + 20, 0.85, { pose: [[0, 'phoneR']], emo: [[0, 'happy']], extras: { shades: 1 }, holdR: () => phone(0, -30, 0.3, 0.15, () => stockScreen(0.5, 0)) }); },
  ui() { info('EINFACH PER APP 📱', 64.13, { y: 380, bg: PAL.blue, size: 56 }); },
  sfx: [[63.8, 'phoneTap'], [64.13, 'pop', 1], [64.62, 'phoneTap']] });
// ---- 44 · "Und hat Glück:" — fingers crossed, a four-leaf clover pops
S(65.2, { tr: 'whipL', cam: CLOSE(65.2, 66.0),
  draw() { setPenthouse({ blur: 10 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'cheer']], emo: [[0, 'grin']], extras: { shades: 1 } }); },
  ui() { popText('GLÜCK! 🍀', 540, 380, 65.66, 100, '#2ee87a', -0.04, 0); },
  sfx: [[65.66, 'sparkle']] });
// ---- 45 · "Der Kurs explodiert!" — the line shoots up, BOOM (riser into the hit)
const UP45 = [[0, 100], [0.25, 104], [0.4, 101], [0.6, 135], [0.8, 170], [1, 200]];
S(66.0, { tr: 'flash', cam: [[66.0, 540, 960, 1.0], [67.45, 540, 950, 1.12]], punch: [[66.55, 0.12]], shake: [[66.55, 16, 0.5]],
  draw() { setDark('#0a3a20', '#020a05'); priceChart(140, 640, 800, 640, UP45, clamp((TT - 66.05) / 1.0), { vmin: 80, vmax: 220, title: 'KEVINS AKTIEN', label: false }); cash('a45', 66.6, 18); },
  ui() { popText('KURS EXPLODIERT! 🚀', 540, 380, 66.55, 80, '#2ee87a', -0.05, 0); },
  sfx: [[66.55, 'boom'], [66.6, 'grow'], [66.9, 'moneyRain', 0.6]] });
// ---- 46 · "Ha! Ich bin ein Genie!" — Kevin cheers, a crown drops onto his head
S(67.45, { tr: 'zoomIn', cam: CLOSE(67.45, 69.2), punch: [[68.58, 0.1]],
  draw() { setPenthouse({ blur: 10 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsUp']], emo: [[0, 'laugh']], extras: { shades: 1 }, jump: [[0, 0], [67.6, 40, 0.12], [67.8, 0, 0.12]] });
    if (TT > 68.0) { const y = TT < 68.58 ? lerp(300, 600, EZ.i3(clamp((TT - 68.0) / 0.58))) : 600; crown(540, y, 0.9); } confetti('c46', 68.58, 40); },
  ui() { popText('ICH BIN EIN GENIE! 👑', 540, 380, 68.58, 70, PAL.gold, -0.04, 0); },
  sfx: [[67.5, 'whooshUp', 1], [68.58, 'bling'], [68.6, 'applause', 0.8]] });
// ---- 47 · "Warren Buffett kann einpacken!" — Kevin dances, phone held high; a sticker for the most famous investor
S(69.2, { tr: 'whipR', lift: 120, cam: [[69.2, 400, 1100, 1.0], [71.0, 640, 1090, 1.08]],
  draw() { setPenthouse(); char('kevin', 540, FLOOR + 20, 0.85, { pose: [[0, 'cheer'], [69.6, 'pointUpR', 0.12], [70.0, 'cheer', 0.12], [70.4, 'pointUpR', 0.12]], emo: [[0, 'laugh']], extras: { shades: 1 }, lean: Math.sin(TT * 9) * 0.12, jump: [[0, 0], [69.4, 30, 0.1], [69.6, 0, 0.1], [69.8, 30, 0.1], [70.0, 0, 0.1], [70.2, 30, 0.1], [70.4, 0, 0.1]] }); },
  ui() { info('SORRY, WARREN BUFFETT 😎', 69.66, { y: 380, bg: '#141026', size: 48 }); },
  sfx: [[69.3, 'carMusic', 1.6], [69.66, 'pop', 1], [70.28, 'boing']] });
// ---- 48 · "Jonas, polier schon mal meine Schuhe, Butler!" — Kevin props his sneaker up; the shoe gleams
S(71.0, { tr: 'cut', cam: [[71.0, 540, 1000, 1.6], [72.4, 540, 980, 1.75]],
  draw() { setPenthouse({ blur: 10 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'pointR']], emo: [[0, 'smug'], [72.0, 'laugh', 0.2]], look: [0.4, 0.6], extras: { shades: 1 } }); },
  ui() { popText('POLIER MEINE SCHUHE! 👟', 540, 380, 71.38, 62, PAL.yellow, -0.04, 0); },
  sfx: [[71.05, 'swish'], [71.38, 'pop', 1]] });
S(72.4, { tr: 'zoomIn', cam: [[72.4, 540, 960, 1.0], [73.3, 540, 950, 1.1]],
  draw() { rays('#1d48b8', '#2f6df6', { cy: 900, spin: 0.3 }); const k = sp(72.42, 240, 12); shinyShoe(540, 1050, 1.6 * k, -0.08); if (TT > 72.86) bowTie(540, 640, 0.9 * sp(72.86, 260, 11), Math.sin(TT * 4) * 0.1); },
  ui() { popText('BUTLER! 🤵', 540, 380, 72.86, 96, '#ffffff', -0.04, 0); },
  sfx: [[72.45, 'polish'], [72.6, 'sparkle'], [72.86, 'ting']] });

// =====================================================================  JONAS' ACCOUNT IS FREED
// ---- 49 · "Und Jonas' Konto?" — the locked phone, a question
S(73.3, { tr: 'whipL', cam: [[73.3, 540, 960, 1.0], [74.35, 540, 950, 1.06]],
  draw() { setFlat({ blur: 12 }); const k = sp(73.32, 240, 13); ctx.save(); ctx.translate(540, 1000); ctx.scale(2.3 * k, 2.3 * k); phone(0, 0, 1, 0, () => bankLockScreen(true)); ctx.restore(); },
  ui() { popText('UND JONAS? 🔒', 540, 380, 73.53, 80, PAL.orange, -0.04, 0); },
  sfx: [[73.35, 'whoosh', 1.1], [73.89, 'tickSoft']] });
// ---- 50 · "Zwei Tage später gibt die Bank es frei." — the padlock springs open, green
S(74.35, { tr: 'cut', cam: [[74.35, 540, 960, 1.0], [76.4, 540, 950, 1.1]],
  draw() { rays('#0e8a45', '#2ee87a', { cy: 900, spin: 0.25 }); const o = clamp((TT - 76.0) / 0.25); padlock(540, 1050, 1.3, o, o > 0.5 ? '#2ee87a' : '#ff3b4a'); if (TT > 76.08) impactLines(540, 1000, 260, 520, 12, 76.08); },
  ui() { info('2 TAGE SPÄTER ⏳', 74.57, { y: 380, bg: '#141026', size: 56 }); if (TT > 76.08) popText('FREI! ✅', 540, 560, 76.08, 100, '#ffffff', -0.04, 0); },
  sfx: [[74.4, 'clockSpin', 1.0], [74.57, 'pop', 1], [76.0, 'keys'], [76.08, 'ding']] });
// ---- 51 · "Alles sauber." — Jonas breathes out, a sparkle-clean thumbs-up
S(76.4, { tr: 'whipR', cam: CLOSE(76.4, 77.2),
  draw() { setFlat({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, jonasT({ pose: [[0, 'offerR']], emo: [[0, 'happy']] })); twinkles('s51', 250, 500, 580, 500, 10, { s: 30 }); },
  ui() { popText('ALLES SAUBER! ✨', 540, 380, 76.42, 80, '#2ee87a', -0.04, 0); },
  sfx: [[76.45, 'sparkle'], [76.77, 'ting']] });

// =====================================================================  DAY 25: THE TURN
// ---- 52 · "Doch am 25. Tag…" — TAG 25 (slow push, vignette; the riser starts)
calShot(77.2, 78.75, 'TAG', 25, 'TAG 25…', 77.63, { tense: 1, roll: 22, c0: '#3a0a5a', c1: '#6a1a9a' });
// ---- 53 · "…hat Jonas plötzlich über 16 Millionen." — the counter rolls into the millions, a cash avalanche (riser into the hit)
S(78.75, { tr: 'zoomIn', cam: [[78.75, 540, 960, 1.0], [81.25, 540, 950, 1.12]], punch: [[80.16, 0.12]], shake: [[80.16, 16, 0.5]],
  draw() { rays('#0e8a45', '#2ee87a', { cy: 940, spin: 0.4 }); glow(540, 1000, 700, '#d8ffd0', 0.4); cashMountain(540, 1350, 1.25, clamp((TT - 79.0) / 1.0)); if (TT > 80.16) billRain('t53', 80.16, 34, { burst: [540, 900], spread: 1.8 }); },
  ui() { moneyCard(540, 560, 0.95 * sp(78.8, 300, 12), 'JONAS · TAG 25', rollNum(1048576, 16777216, 79.0, 80.16)); if (TT > 80.16) info('ÜBER 16 MILLIONEN! 😱', 80.16, { y: 330, bg: PAL.orange, size: 52 }); },
  sfx: [[78.8, 'pop', 1], [79.0, 'coinTicks', 1.1, 12], [80.16, 'cashCannon'], [80.3, 'applause', 0.8]] });
// ---- 54 · "Kevin fällt der Kaffee aus der Hand." — Kevin sees it on his phone; the mug slips and smashes
S(81.25, { tr: 'whipL', cam: CLOSE(81.25, 82.3), punch: [[81.6, 0.08]],
  draw() { setPenthouse({ blur: 10 }); const drop = TT > 81.97; char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'drinkR'], [81.97, 'shrug', 0.1]], emo: [[0, 'neutral'], [81.6, 'shock', 0.1]], extras: { shades: 0 }, holdR: drop ? undefined : () => mug(0, -30, 0.5) }); },
  ui() { popText('WAS?! ☕', 540, 380, 81.6, 96, PAL.yellow, -0.04, 0); },
  sfx: [[81.3, 'slurp', 0.6], [81.6, 'gasp']] });
S(82.3, { tr: 'cut', cam: [[82.3, 540, 1000, 1.1], [82.97, 540, 1050, 1.2]], shake: [[82.67, 14, 0.3]],
  draw() { setPenthouse({ blur: 8 }); const u = clamp((TT - 82.3) / 0.37), y = lerp(500, 1400, EZ.i3(u)); if (u < 1) { ctx.save(); ctx.translate(540, y); ctx.rotate(u * 3); mug(0, 0, 1.6); ctx.restore(); } else { splash(540, 1400, 82.67, 1.4); for (let i = 0; i < 5; i++) { const R = RNG('sh', i); ctx.save(); ctx.translate(540 + R.n(260) * clamp((TT - 82.67) * 4), 1400 - R.f() * 120); ctx.rotate(R.n(3)); poly([[0, 0], [50, 10], [20, 50]], '#ffffff'); ctx.restore(); } } },
  sfx: [[82.32, 'whooshDown', 0.7], [82.67, 'glassClink'], [82.69, 'crunch'], [82.7, 'splashSfx', 0.6]] });
// ---- 55 · "Das kann nicht sein!" — Kevin grabs his head, red tint
S(82.97, { tr: 'flash', cam: CLOSE(82.97, 84.05), shake: [[83.21, 16, 0.4]],
  draw() { setPenthouse({ blur: 12 }); ctx.fillStyle = 'rgba(200,20,30,0.22)'; ctx.fillRect(-600, -400, 2300, 2800); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'headGrab']], emo: [[0, 'shock']], extras: { sweat: 1 } }); },
  ui() { popText('DAS KANN NICHT SEIN! 😨', 540, 380, 83.0, 62, '#ff4545', -0.04, 0); },
  sfx: [[83.0, 'shockHit'], [83.73, 'errorBuzz']] });
// ---- 56 · "Das war doch nur ein Euro!" — Kevin, desperate, holds up a tiny coin; it grows huge in his face
S(84.05, { tr: 'zoomIn', cam: [[84.05, 540, 1000, 1.6], [85.6, 540, 980, 1.8]],
  draw() { setPenthouse({ blur: 12 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, { la: [0.16, -0.12], ra: [1.9, -0.6] }]], emo: [[0, 'scared']], look: [0.6, -0.3], extras: { sweat: 1 } });
    const g = clamp((TT - 84.6) / 0.8); euroCoin(lerp(760, 600, g), lerp(720, 800, g), lerp(46, 150, EZ.io(g)), { spin: TT * 2, shadow: false, glow: 0.3 }); },
  ui() { popText('NUR EIN EURO?! 🪙', 540, 380, 84.73, 80, '#ffffff', -0.04, 0); },
  sfx: [[84.1, 'whoosh', 0.8], [84.73, 'coin', 0.9], [85.14, 'grow']] });

// =====================================================================  DAY 30: THE RECKONING
// ---- 57 · "Am 30. Tag…" — TAG 30
calShot(85.6, 87.05, 'TAG', 30, 'TAG 30 ⚖️', 85.83, { roll: 26, bg: PAL.orange });
// ---- 58 · "…treffen sie sich zur Abrechnung." — face to face across a table
S(87.05, { tr: 'zoomIn', tense: 1, lift: 200, cam: [[87.05, 500, 1150, 1.05], [88.1, 580, 1130, 1.14]],
  draw() { setStudio({ blur: 6 }); char('kevin', 320, FLOOR + 40, 0.9, { pose: [[0, 'hips']], emo: [[0, 'smug']], look: [0.7, 0], extras: { shades: 1 } }); char('jonas', 760, FLOOR + 40, 0.9, jonasT({ pose: [[0, 'armsCross']], emo: [[0, 'calm']], look: [-0.7, 0] })); fillRR(140, FLOOR - 170, 800, 50, 14, '#6a3f22'); },
  ui() { info('ABRECHNUNG ⚖️', 87.47, { y: 380, bg: '#141026', size: 58 }); },
  sfx: [[87.1, 'footsteps', 0.8], [87.47, 'pop', 1], [87.6, 'heartbeat', 0.6]] });
// ---- 59 · "Kevin knallt sein Konto auf den Tisch." — the statement slams down
S(88.1, { tr: 'cut', cam: [[88.1, 540, 1000, 1.0], [90.1, 540, 980, 1.08]], shake: [[88.53, 16, 0.35]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#6a4a2a'], [1, '#4a3018']]); ctx.fillRect(-600, -400, 2300, 2700); for (let i = 0; i < 10; i++) line(-600, 200 + i * 180, 1700, 220 + i * 180, 6, 'rgba(0,0,0,0.12)');
    const a = sp(88.38, 220, 13); statement(540, 1000 - (1 - a) * 900, 1.3, 'KEVIN', null, -0.04); impactLines(540, 1000, 300, 600, 14, 88.53); },
  ui() { info('KNALL! 💥', 88.53, { y: 380, bg: PAL.red, size: 58 }); },
  sfx: [[88.38, 'whooshDown', 1.2], [88.53, 'slam'], [88.56, 'thud']] });
// ---- 60 · "Meine Aktien sind explodiert:" — Kevin, smug, shows the green chart on his phone
S(90.1, { tr: 'whipL', cam: [[90.1, 600, 1000, 1.6], [91.8, 520, 980, 1.75]],
  draw() { setStudio({ blur: 10 }); char('kevin', 400, FLOOR + 170, 1.05, { pose: [[0, 'phoneR']], emo: [[0, 'smug']], look: [0.6, -0.2], extras: { shades: 1 } }); },
  ui() { const k = sp(90.15, 240, 13); ctx.save(); ctx.translate(790, 920); ctx.rotate(0.05); ctx.scale(k * 1.9, k * 1.9); phone(0, 0, 1, 0, () => stockScreen(1, 0, { value: '+100 %' })); ctx.restore(); },
  sfx: [[90.15, 'whoosh', 1.2], [91.12, 'grow']] });
// ---- 61 · "2 Millionen! Und du?" — the total slams, cash; then Kevin points: "UND DU?"
S(91.8, { tr: 'flash', cam: [[91.8, 540, 960, 1.0], [93.5, 540, 950, 1.08]], punch: [[91.85, 0.1]],
  draw() { rays('#1d48b8', '#2f6df6', { cy: 940, spin: 0.35 }); cashMountain(540, 1350, 0.9, 1); billRain('t61', 91.85, 22, { burst: [540, 900], spread: 1.4 }); char('kevin', 540, 1720, 0.6, { pose: [[0, 'cheer'], [93.0, 'pointR', 0.12]], emo: [[0, 'laugh']], extras: { shades: 1 } }); },
  ui() { moneyCard(540, 560, 0.95 * sp(91.85, 300, 12), 'KEVIN', 2000000, '#2ee87a'); if (TT > 93.01) info('UND DU? 😏', 93.01, { y: 330, bg: PAL.blue, size: 56 }); },
  sfx: [[91.85, 'cashCannon'], [92.11, 'cashReg'], [93.01, 'pop', 1]] });
// ---- 62 · "Ich hab den Euro nie angefasst." — Jonas, calm, holds up the very same coin; it glows
S(93.5, { tr: 'whipR', cam: [[93.5, 640, 1000, 1.6], [95.1, 520, 980, 1.78]],
  draw() { setStudio({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, jonasT({ pose: [[0, { la: [0.16, -0.12], ra: [1.9, -0.6] }]], emo: [[0, 'calm'], [94.5, 'smug', 0.2]], look: [0.6, -0.4] })); euroCoin(760, 720, 52, { spin: Math.sin(TT * 2) * 0.3, shadow: false, glow: 0.6 }); twinkles('j62', 640, 600, 260, 260, 6, { s: 22 }); },
  ui() { info('NIE ANGEFASST 🪙', 94.36, { y: 380, bg: PAL.orange, size: 56 }); },
  sfx: [[93.55, 'swish'], [94.04, 'coin', 1.3], [94.36, 'pop', 1]] });
// ---- 63 · "Rechne selbst, Butler!" — Jonas points into the camera, a bow tie flies at Kevin's side of the screen
S(95.1, { tr: 'cut', cam: CLOSE(95.1, 96.3), punch: [[95.15, 0.1]],
  draw() { setStudio({ blur: 10 }); char('jonas', 540, FLOOR + 160, 1.0, jonasT({ pose: [[0, 'pointR']], emo: [[0, 'grin']], look: [0, 0.3] })); const k = sp(95.2, 260, 12); ctx.save(); ctx.translate(820, 760); ctx.rotate((1 - k) * 2); ctx.scale(k * 0.42, k * 0.42); calculator(0, 0, 1, '?', 0); ctx.restore(); },
  ui() { popText('RECHNE SELBST, BUTLER! 🤵', 540, 380, 95.15, 58, PAL.yellow, -0.04, 0); },
  sfx: [[95.2, 'whoosh', 1.2], [95.78, 'ting']] });

// =====================================================================  THE QUESTION
// ---- 64 · "Schaffst du es auszurechnen, wie viel Jonas am 30. Tag hat?" — even split, both enter at once:
//      Kevin (top) 2.000.000 € with the bow tie waiting, Jonas (bottom) ??? € with the hint 1 € x2 x 30 TAGE
S(96.3, { tr: 'glitch', tense: 1, capY: YD, cam: [[96.3, 540, 960, 1.0], [100.2, 540, 960, 1.04]],
  draw() { const k = sp(96.32, 170, 13);
    splitEven(() => { rays('#1d48b8', '#2f6df6', { cy: 560, spin: 0.08 }); char('kevin', 330 - (1 - k) * 760, 860, 0.56, { pose: [[0, 'armsCross']], emo: [[0, 'smug'], [98.0, 'confused', 0.3]], extras: { shades: 1 }, lean: (1 - k) * 0.25 }); },
      () => { rays('#c96b10', '#ff9d3f', { cy: 1220, spin: -0.08 }); char('jonas', 330, 1520 + (1 - k) * 600, 0.56, jonasT({ pose: [[0, 'hips']], emo: [[0, 'smug']] })); }); },
  ui() { hud('KONTO · KEVIN', [[0, 2e6]], { x: 760, y: 560, scale: 0.8, t0: 96.4 }); { const g = TT > 96.8 && TT < 97.1 ? Math.sin(TT * 90) * 12 : 0, kk = sp(96.45, 260, 14); ctx.save(); ctx.translate(760 + g, 1230); ctx.scale(0.8 * kk, 0.8 * kk); blurCounter(0, 0, 560, 210, 'KONTO · JONAS'); ctx.restore(); }
    if (TT > 97.4) { const k3 = sp(97.4, 260, 12); ctx.save(); ctx.translate(760, 1440); ctx.scale(k3, k3); euroCoin(-150, 0, 46, { spin: TT * 3, shadow: false }); tText('× 2 · 30 TAGE', 60, 0, 44, { color: '#fff', stroke: '#3a1a00', strokeW: 12 }); ctx.restore(); }
    info('WIE VIEL HAT JONAS? 🤔', 96.6, { y: 270, bg: PAL.yellow, fg: '#1b1530', size: 48 }); },
  sfx: [[96.4, 'whoosh', 1.1], [96.45, 'pop', 1], [96.8, 'glitch'], [96.9, 'coinTicks', 1.4, 4], [97.4, 'pop', 1.2], [98.6, 'heartbeat', 1.2]] });
