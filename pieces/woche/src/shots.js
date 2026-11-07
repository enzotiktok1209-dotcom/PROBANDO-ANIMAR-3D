// =====================================================================
//  shots.js — Über 300.000 € im Jahr vs 1 Cent pro Sekunde, 1 Jahr (DE). ~40 shots on the trimmed voice (65.3 s).
//  Subjects in the centre band above the captions; German helper texts; cash whenever money is said;
//  Jonas' total never readable. Jonas wins by 8.360 € (285.360 vs 277.000) — the video never says it.
// =====================================================================
const KONTO = [[0, 277e3]];
const hudKevin = (o = {}) => hud('KONTO · KEVIN', KONTO, { ...o });
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
  if (icon === 'cash') { glow(0, 0, 200, '#a6f0b4', 0.3); briefcase(0, 60, 0.42, 1); } else { glow(0, 0, 200, '#ffd0a0', 0.3); stopwatch(-80, 0, 0.26, TT * 10); copperCent(90, 0, 58, { sx: Math.cos(TT * 3) }); }
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

const studioTwo = (kT = {}, jT = {}) => { setStudio(); char('kevin', 300, FLOOR - 40, 0.8, { emo: [[0, 'grin']], look: [0.4, -0.4], ...kT }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'happy']], look: [-0.3, -0.3], extras: { glasses: true }, ...jT }); };
const optionCards = (t0) => { tText('WAS NIMMST DU?', 540, 200, 66, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14, maxW: 1000 });
  iconCard(285, 462, 'IM JAHR', 'ÜBER 300.000 €', '6.000 € PRO WOCHE', PAL.green, t0, 'cash'); iconCard(795, 462, 'PRO SEKUNDE', '1 CENT', '1 JAHR LANG', PAL.orange, t0 + 0.06, 'cent'); tText('VS', 540, 462, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); };
const phoneShot = (screen, o = {}) => { const k = springEase(TT - (o.t0 ?? 0), 240, 13), buzz = o.buzz && TT > o.buzz && TT < o.buzz + 0.9 ? Math.sin(TT * 80) * 10 : 0; ctx.save(); ctx.translate(540 + buzz, o.y ?? 980); ctx.scale(k, k); ctx.rotate(o.rot ?? 0); phone(0, 0, o.s ?? 2.4, 0, screen); ctx.restore(); };

// =====================================================================  THE HOOK
// ---- 1 · "Über 300.000 Euro im Jahr?" — a mountain of cash builds, the number slams, a calendar "1 JAHR" (0.2 s punch-in on frame one)
S(0.0, { tr: 'cut', lift: 0, tense: 1, cam: [[0, 540, 980, 1.16], [0.2, 540, 980, 1.0], [2.34, 540, 960, 1.08]],
  draw() { rays('#0e8a45', '#14a956', { cy: 940, spin: 0.3 }); glow(540, 1000, 640, '#a6f0b4', 0.4); cashMountain(540, 1220, 1.05, clamp((TT - 0.05) / 0.9)); cash('h1', 0.41, 20);
    if (TT > 1.9) { const k = springEase(TT - 1.9, 260, 12); ctx.save(); ctx.translate(860, 700); ctx.rotate(0.1); ctx.scale(k * 0.5, k * 0.5); calendarPage(0, 0, 1, 'JAHR', 1); ctx.restore(); } },
  ui() { if (TT > 0.41) { const k = springEase(TT - 0.41, 300, 11); ctx.save(); ctx.translate(540, 420); ctx.scale(k, k); tText('300.000 €', 0, 0, 140, { color: PAL.yellow, stroke: '#0a4a22', strokeW: 24 }); ctx.restore(); } info('IM JAHR', 1.9, { y: 580, bg: PAL.red, size: 60 }); },
  sfx: [[0.41, 'cashCannon'], [0.45, 'impact'], [1.2, 'coinPour'], [1.9, 'pop', 1], [1.95, 'flip']] });
// ---- 2 · "Oder 1 Cent" — darkness, one tiny copper cent spins in a spotlight
S(2.34, { tr: 'whipL', lift: 0, cam: [[2.34, 540, 960, 1.0], [3.5, 540, 950, 1.12]],
  draw() { setDark('#3a1a08', '#0a0402'); ctx.save(); ctx.globalAlpha = 0.6; poly([[460, -200], [620, -200], [780, 1500], [300, 1500]], 'rgba(255,220,170,0.25)'); ctx.restore(); glow(540, 980, 360, '#ffcf8a', 0.45);
    const k = springEase(TT - 2.4, 240, 12); copperCent(540, 980 - (1 - k) * 600, 110 * k, { sx: Math.cos(TT * 6) }); },
  ui() { popText('1 CENT 🪙', 540, 420, 2.8, 110, '#ffb07a', -0.04, 0); },
  sfx: [[2.4, 'whooshDown', 1.2], [2.6, 'coin', 1.2], [2.8, 'pop', 1], [3.1, 'ting']] });
// ---- 3 · "…pro Sekunde, ein Jahr lang?" — a cent drops into the jar with every tick of the stopwatch
const DROPS = Array.from({ length: 6 }, (_, k) => 3.55 + k * 0.2);
S(3.5, { tr: 'cut', cam: [[3.5, 540, 960, 1.04], [5.02, 540, 960, 1.0]],
  draw() { rays('#c4520a', '#e86c0e', { cy: 940 }); glow(540, 1000, 460, '#ffe2a8', 0.4); const n = DROPS.filter((t) => TT > t + 0.45).length; coinJar(540, 1320, 1.0, 0.04 + n * 0.02);
    DROPS.forEach((t0, k) => { if (TT < t0 || TT > t0 + 0.46) return; const R = RNG('drop', k); copperCent(540 + R.n(60), lerp(250, 1080, clamp((TT - t0) / 0.45) ** 2), 44, { sx: Math.cos(TT * 9 + k) }); });
    stopwatch(850, 760, 0.36 * springEase(TT - 3.52, 220, 13), (TT - 3.5) * 6); },
  ui() { tText('PRO SEKUNDE', 540, 380, 90, { color: '#fff', stroke: '#6a2a00', strokeW: 18 }); info('1 JAHR LANG', 4.39, { y: 540, bg: '#141026', size: 56 }); DROPS.forEach((t) => popText('+1 CENT', 330, 1000, t + 0.45, 52, '#ffb07a', 0, 120)); },
  sfx: [...DROPS.map((t) => [t + 0.45, 'coinJar']), [3.52, 'tick'], [4.39, 'pop', 1]] });

// =====================================================================  THE CHOICE
// ---- 4 · "Kevin muss nicht mal rechnen." — the two at their buttons with both options (the cover)
S(5.02, { tr: 'zoomOut', lift: 110, cam: [[5.02, 540, 1020, 1.0], [6.24, 540, 1010, 1.05]],
  draw() { studioTwo({ pose: [[5.02, 'idle'], [5.6, 'raiseR', 0.2]], emo: [[5.02, 'grin'], [5.7, 'laugh']] }); studioPodiums(); },
  ui() { optionCards(5.04); },
  sfx: [[5.04, 'pop', 1], [5.1, 'pop', 1.2], [5.6, 'whooshUp', 1.1]] });
// ---- 5 · "Er nimmt die 300.000." — the slam on the green button, cash bursts
S(6.24, { tr: 'zoomIn', lift: 90, cam: [[6.24, 330, 1140, 1.45], [7.77, 320, 1090, 1.6]], shake: [[6.4, 20, 0.4]],
  draw() { setStudio({ blur: 3 }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'happy']], look: [-0.6, 0.2], extras: { glasses: true } });
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[6.24, 'raiseR'], [6.34, 'slamR', 0.08], [6.8, 'cheer', 0.2]], emo: [[6.24, 'angry'], [6.7, 'laugh']], look: [0.4, 0.5] });
    studioPodiums({ pressL: TT > 6.4 ? 1 : 0, litL: TT > 6.4 ? 0.9 : 0 }); impactLines(300, 1250, 120, 380, 12, 6.4); cash('k5', 6.45, 22); },
  ui() { info('300.000 € IM JAHR! 💰', 6.75, { y: 380, bg: PAL.green, size: 54 }); },
  sfx: [[6.4, 'slam'], [6.45, 'buzzerWin'], [6.75, 'cashCannon']] });
// ---- 6 · "Über 300.000 im Jahr!" — Kevin throws his arms up in a rain of notes
S(7.77, { tr: 'whipR', cam: CLOSE(7.77, 9.8),
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[7.77, 'cheer'], [8.9, 'armsUp', 0.2]], emo: [[0, 'laugh']], jump: [[7.77, 0], [8.0, 60, 0.15], [8.25, 0, 0.15]], extras: KS }); cash('k6', 7.8, 26); },
  ui() { popText('ÜBER 300.000 € 🤑', 540, 380, 8.2, 76, PAL.yellow, -0.04, 0); },
  sfx: [[7.8, 'moneyRain'], [8.2, 'pop', 1], [8.9, 'whoosh', 1]] });
// ---- 7 · "Das ist mehr, als mein Chef verdient!" — a thought bubble: his boss in a suit, a small payslip
S(9.8, { tr: 'zoomIn', cam: CLOSE(9.8, 11.76),
  draw() { setStudio({ blur: 10 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[9.8, 'thinkR'], [10.9, 'pointUpR', 0.2]], emo: [[9.8, 'smug'], [10.9, 'grin']], look: [0.4, -0.5], extras: KS }); },
  ui() { if (TT > 10.2) { const k = springEase(TT - 10.2, 240, 12); ctx.save(); ctx.translate(560, 520); ctx.scale(k, k); thoughtBubble(0, 0, 620, 440, () => { ctx.save(); ctx.beginPath(); ctx.roundRect(-310, -220, 620, 440, 200); ctx.clip(); char('seller', -110, 320, 0.55, { pose: [[0, 'sad']], emo: [[0, 'sad']] }); ctx.restore(); fillRR(70, -90, 190, 230, 14, '#ffffff'); tText('CHEF', 165, -55, 30, { color: '#1b1530', shadow: false }); tText('LOHN', 165, 0, 26, { color: '#9f95c9', shadow: false }); tText('😬', 165, 70, 60, { shadow: false }); }); ctx.restore(); }
    if (TT > 10.94) info('MEHR ALS MEIN CHEF! 😎', 10.94, { y: 1000, bg: PAL.pink, size: 46 }); },
  sfx: [[10.2, 'bubble'], [10.94, 'pop', 1], [11.17, 'ding']] });
// ---- 8 · "Wetten, dass mein Cent dich schlägt?" — Jonas, cheerful, holds a cent up between two fingers
S(11.76, { tr: 'whipL', tense: 1, cam: CLOSEJ(11.76, 13.48), punch: [[12.64, 0.08]],
  draw() { setStudio({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[11.76, 'idle'], [11.9, 'holdR', 0.15], [12.6, 'raiseR', 0.2]], emo: [[11.76, 'grin'], [12.9, 'laugh']], look: [-0.4, 0], extras: { glasses: true }, holdR: () => copperCent(0, -40, 36, { sx: Math.cos(TT * 5) }) }); },
  ui() { popText('WETTEN? 😏', 540, 380, 11.8, 96, PAL.yellow, -0.05, 0); },
  sfx: [[11.8, 'pop', 1.1], [12.64, 'coin', 1.2], [13.1, 'ting']] });
// ---- 9 · "Ein Cent gegen 300.000?" — the scale slams down on the cash side, the cent flies up
S(13.48, { tr: 'cut', cam: [[13.48, 540, 1000, 1.0], [15.92, 540, 980, 1.08]], shake: [[14.45, 14, 0.35]],
  draw() { rays('#3a1a6a', '#5a2bd6', { cy: 960, spin: 0.2 }); const tilt = TT < 14.45 ? 0 : 0.32 * (1 - Math.exp(-(TT - 14.45) * 8) * Math.cos((TT - 14.45) * 18));
    balance(540, 1400, 1.1, tilt, () => copperCent(0, -30, 40, { sx: Math.cos(TT * 4) }), () => briefcase(0, 0, 0.3, 1)); },
  ui() { info('1 CENT', 13.72, { x: 300, y: 560, bg: PAL.orange, size: 50 }); info('300.000 €', 14.45, { x: 780, y: 560, bg: PAL.green, size: 50, rot: 0.04 }); },
  sfx: [[13.72, 'pop', 1.3], [14.45, 'thud'], [14.5, 'scaleCreak'], [14.6, 'cashReg', 0.8]] });
// ---- 10 · "Das ist keine Wette, das ist ein Geschenk!" — Kevin laughs from the belly, a gift box pops open
S(15.92, { tr: 'whipR', cam: CLOSE(15.92, 18.01),
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[15.92, 'pointR'], [17.3, 'laughBelly', 0.2]], emo: [[15.92, 'smug'], [17.3, 'laugh']], extras: KS, lean: [[15.92, 0], [17.3, -0.06], [17.55, 0.05, 0.12], [17.8, -0.03, 0.1]] });
    if (TT > 17.4) { const k = springEase(TT - 17.4, 240, 12); ctx.save(); ctx.translate(850, 1120); ctx.scale(k * 0.55, k * 0.55); giftBox(0, 0, 1, clamp((TT - 17.6) / 0.3)); ctx.restore(); } },
  ui() { popText('EIN GESCHENK! 🎁', 540, 380, 17.52, 80, PAL.pink, -0.04, 0); },
  sfx: [[16.0, 'swish', 1], [17.4, 'pop', 1.3], [17.52, 'pop', 1], [17.6, 'sparkle']] });

// =====================================================================  PAYDAY vs THE CENT
// ---- 11 · "Montag, acht Uhr:" — the alarm clock rings at 8:00
S(18.01, { tr: 'iris', cam: [[18.01, 540, 960, 1.0], [19.33, 540, 940, 1.1]],
  draw() { rays('#ff8a1e', '#ffb347', { cy: 900, spin: 0.25 }); const k = springEase(TT - 18.05, 240, 12); alarmClock(540, 900, 0.75 * k, { ring: TT > 18.6 ? 1 : 0, t: 8 * 60 / 60 * 0 + 2.0, label: '8:00' }); },
  ui() { info('MONTAG, 8:00 ⏰', 18.1, { y: 360, bg: '#141026', size: 60 }); },
  sfx: [[18.05, 'pop', 1], [18.6, 'alarmRing']] });
// ---- 12 · "Kevins Handy vibriert." — the phone buzzes across the night stand
S(19.33, { tr: 'cut', tense: 1, cam: [[19.33, 540, 1000, 1.0], [20.55, 540, 980, 1.12]],
  draw() { setBedroom({ blur: 8 }); fillRR(140, 1180, 800, 60, 14, '#6a3f22'); fillRR(160, 1240, 760, 400, 10, '#5a331b');
    phoneShot(() => { ctx.fillStyle = '#0e1a2e'; ctx.fillRect(-84, -176, 168, 352); tText('KEVIN', 0, -40, 26, { color: '#9fb4d8', shadow: false }); tText('📳', 0, 30, 60, { shadow: false }); }, { y: 1000, s: 1.8, rot: Math.PI / 2 * 0.9, buzz: 19.6 }); },
  ui() { info('BZZZ! 📳', 19.7, { y: 380, bg: PAL.blue, size: 60 }); },
  sfx: [[19.6, 'buzzPhone'], [19.7, 'pop', 1], [20.04, 'buzzPhone']] });
// ---- 13 · "6.000 Euro, und das jede Woche." — the deposit lands, cash rain
S(20.55, { tr: 'zoomIn', cam: [[20.55, 540, 960, 1.0], [23.3, 540, 940, 1.1]], punch: [[20.6, 0.1]],
  draw() { rays('#1d48b8', '#2f6df6', { cy: 900, spin: 0.25 }); phoneShot(() => notifScreen([[20.6, '+6.000 €']], { title: 'KEVINS BANK' }), { t0: 20.55, y: 1000, s: 2.4 }); cash('k13', 20.65, 26); },
  ui() { popText('+6.000 €', 540, 380, 20.6, 120, '#41f08a', -0.04, 0); info('JEDE WOCHE 🔁', 22.25, { y: 560, bg: PAL.orange, size: 56 }); },
  sfx: [[20.6, 'notify'], [20.65, 'cashCannon'], [22.25, 'pop', 1], [22.7, 'coinTicks', 1, 3]] });
// ---- 14 · "Jonas bekommt in derselben Sekunde:" — Jonas stares at his phone, waiting (slow push, vignette)
S(23.3, { tr: 'whipL', tense: 1, cam: CLOSEJ(23.3, 25.31),
  draw() { setLeoRoom({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'phoneR']], emo: [[23.3, 'happy'], [24.5, 'serious']], look: [0.3, -0.2], extras: { glasses: true }, holdR: () => phone(0, -30, 0.3, 0.15, () => { ctx.fillStyle = '#0e1a2e'; ctx.fillRect(-84, -176, 168, 352); }) }); },
  ui() { info('IN DERSELBEN SEKUNDE…', 23.64, { y: 360, bg: '#141026', size: 48 }); },
  sfx: [[23.4, 'swish', 0.8], [23.64, 'pop', 1], [24.2, 'heartbeat', 0.8]] });
// ---- 15 · "einen Cent." — the screen: +0,01 €. A tiny ding.
S(25.31, { tr: 'zoomIn', cam: [[25.31, 540, 960, 1.1], [26.16, 540, 960, 1.18]],
  draw() { rays('#c4520a', '#e86c0e', { cy: 900, spin: 0.15 }); phoneShot(() => notifScreen([[25.4, '+0,01 €', '#e86c0e']], { title: 'JONAS BANK' }), { t0: 25.31, y: 980, s: 2.4 }); },
  ui() { popText('1 CENT. 😐', 540, 380, 25.4, 96, '#ffb07a', -0.04, 0); },
  sfx: [[25.4, 'ting'], [25.6, 'crickets', 0.6]] });
// ---- 16 · "Doch der Cent kommt wieder. Und wieder." — notifications stack faster and faster
const CENTS = [26.3, 26.55, 26.8, 27.0, 27.5, 27.7, 27.9];
S(26.16, { tr: 'cut', cam: [[26.16, 540, 980, 1.05], [28.22, 540, 960, 1.15]],
  draw() { rays('#c4520a', '#e86c0e', { cy: 900, spin: 0.4 }); phoneShot(() => notifScreen(CENTS.slice(-6).map((t) => [t, '+0,01 €', '#e86c0e']), { title: 'JONAS BANK' }), { y: 980, s: 2.4 }); },
  ui() { info('UND WIEDER… 🔁', 27.46, { y: 360, bg: '#141026', size: 56 }); },
  sfx: [...CENTS.map((t, i) => [t, 'ting', 1 + i * 0.05]), [27.46, 'pop', 1]] });
// ---- 17 · "Sechzig Mal pro Minute" — the stopwatch, +1 CENT flying off every second
S(28.22, { tr: 'whipR', cam: [[28.22, 540, 960, 1.0], [29.96, 540, 940, 1.1]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); stopwatch(540, 1000, 0.9 * springEase(TT - 28.25, 220, 13), (TT - 28.2) * 6); plus1c(540, 900, 5, 28.3, 's17'); },
  ui() { tText('60× PRO MINUTE', 540, 380, 90, { color: '#fff', stroke: '#240b5e', strokeW: 18 }); },
  sfx: [[28.25, 'pop', 1], [28.3, 'tickRun', 1.6]] });
// ---- 18 · "Tag und Nacht." — the sky turns from sun to moon over Jonas asleep, the cents keep coming
S(29.96, { tr: 'flash', cam: [[29.96, 540, 1000, 1.0], [30.86, 540, 990, 1.06]],
  draw() { const n = clamp((TT - 30.15) / 0.4); ctx.fillStyle = lin(0, 0, 0, 1920, [[0, mixHex('#4aa8ff', '#0b0b2e', n)], [1, mixHex('#bfe6ff', '#24164a', n)]]); ctx.fillRect(-600, -400, 2300, 2800);
    circ(lerp(800, 1300, n), lerp(380, 900, n), 110, '#fff2a0'); circ(lerp(-300, 280, n), lerp(900, 380, n), 90, '#f4f4ff'); if (n > 0.5) twinkles('st18', 0, 100, 1080, 700, 14, { s: 16 });
    sleepingJonas(540, 1350, 1.0); plus1c(540, 1050, 4, 30.0, 's18'); },
  ui() { info('TAG ☀️ UND NACHT 🌙', 30.0, { y: 360, bg: '#141026', size: 54 }); },
  sfx: [[30.0, 'pop', 1], [30.2, 'whooshDown', 0.9], [30.5, 'snore']] });
// ---- 19 · "Während du dieses Video schaust…" — a phone playing this very video, its progress bar running
S(30.86, { tr: 'zoomOut', cam: [[30.86, 540, 980, 1.0], [32.51, 540, 970, 1.08]],
  draw() { rays('#1a1430', '#2a1650', { cy: 900, spin: 0.15 }); phoneShot(() => { ctx.fillStyle = '#120e22'; ctx.fillRect(-84, -176, 168, 352); rays('#5a2bd6', '#7a3cff', { cy: -20, spin: 0.3 }); ctx.save(); ctx.beginPath(); ctx.rect(-84, -176, 168, 352); ctx.clip(); char('jonas', 0, 110, 0.18, { emo: [[0, 'grin']], extras: { glasses: true } }); ctx.restore(); fillRR(-74, 156, 148, 6, 3, 'rgba(255,255,255,0.3)'); fillRR(-74, 156, 148 * TT / DURATION, 6, 3, '#ff4f6a'); tText('▶', 0, -140, 22, { color: '#fff', shadow: false }); }, { t0: 30.86, y: 980, s: 2.6 }); },
  ui() { info('DU SCHAUST GERADE 👀', 31.3, { y: 330, bg: PAL.pink, size: 52 }); },
  sfx: [[30.9, 'whooshUp', 1], [31.3, 'pop', 1], [31.9, 'click']] });
// ---- 20 · "…hat Jonas schon fast einen Euro verdient." — a live counter: what the cent has earned since the video started
S(32.51, { tr: 'zoomIn', tense: 1, cam: [[32.51, 540, 960, 1.0], [34.88, 540, 950, 1.1]],
  draw() { rays('#0e8a45', '#14a956', { cy: 940, spin: 0.3 }); liveCents(540, 960, 1.4 * springEase(TT - 32.55, 260, 13), 0); copperCent(540, 1300, 70, { sx: Math.cos(TT * 5) }); },
  ui() { info('BIS ZUM ENDE: FAST 1 € 😳', 33.5, { y: 380, bg: '#141026', size: 46 }); },
  sfx: [[32.55, 'pop', 1], [32.6, 'coinTicks', 1.2, 6], [33.5, 'pop', 1.1], [34.32, 'ding']] });

// =====================================================================  THE SPENDING
// ---- 21 · "Kevin gönnt sich sofort eine Rolex…" — the gold Rolex on his wrist
S(34.88, { tr: 'whipL', cam: CLOSE(34.88, 36.58),
  draw() { setLuxGarage({ blur: 10 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[34.88, 'idle'], [35.2, 'raiseR', 0.2]], emo: [[0, 'smug']], look: [0.5, -0.5], extras: KS, holdR: () => goldWatch(0, 10, 0.2, TT) }); twinkles('r21', 560, 380, 300, 300, 5, { s: 26 }); },
  ui() { info('ROLEX ⌚', 36.24, { y: 380, bg: '#141026', size: 60 }); },
  sfx: [[35.2, 'whoosh', 1], [35.5, 'bling'], [36.24, 'pop', 1]] });
// ---- 22 · "…für 20.000 Euro" — the watch close up, the price
S(36.58, { tr: 'zoomIn', cam: [[36.58, 540, 960, 1.0], [37.77, 540, 940, 1.08]],
  draw() { rays('#2a2a34', '#4a4a5a', { cy: 960, spin: 0.2 }); glow(540, 960, 620, '#fff6d0', 0.3); goldWatch(540, 1000, 1.1 * springEase(TT - 36.6, 220, 13), TT); },
  ui() { priceTag(600, 560, springEase(TT - 36.75, 280, 12), '20.000 €', -0.08); popText('−20.000 €', 540, 1300, 37.0, 70, '#ff4a4a', 0, 60); },
  sfx: [[36.6, 'whooshDown', 1], [36.75, 'cashReg'], [37.0, 'coinTicks', 1, 3]] });
// ---- 23 · "und eine Woche Ibiza für 15.000." — beach party: Kevin with a drink under the palms, the price
S(37.77, { tr: 'slide', lift: 200, cam: [[37.77, 540, 1120, 1.0], [40.16, 540, 1100, 1.08]],
  draw() { setIsland(); char('kevin', 540, FLOOR + 40, 0.85, { pose: [[37.77, 'drinkR'], [38.6, 'cheer', 0.2]], emo: [[0, 'laugh']], jump: [[38.6, 0], [38.8, 60, 0.15], [39.0, 0, 0.15]], extras: KS2 }); confetti('c23', 38.6, 30); },
  ui() { sticker('IBIZA 🌴', 540, 330, 38.6, { bg: PAL.pink, size: 62 }); priceTag(560, 520, springEase(TT - 39.27, 280, 12), '15.000 €', 0.06); },
  sfx: [[37.8, 'waves', 0.8], [38.6, 'pop', 1], [38.65, 'carMusic', 0.7], [39.27, 'cashReg']] });
// ---- 24 · "Jonas kauft sich nur eine Sache:" — Jonas holds up one finger
S(40.16, { tr: 'whipR', cam: CLOSEJ(40.16, 41.92),
  draw() { setLeoRoom({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[40.16, 'idle'], [40.5, 'pointUpR', 0.2]], emo: [[40.16, 'smug'], [41.0, 'grin']], extras: { glasses: true } }); },
  ui() { popText('NUR EINE SACHE ☝️', 540, 380, 40.9, 72, PAL.yellow, -0.04, 0); },
  sfx: [[40.5, 'swish', 1], [40.9, 'pop', 1]] });
// ---- 25 · "ein Motorrad für 30.000 Euro." — the red bike rolls in, Jonas jumps for joy beside it
S(41.92, { tr: 'zoomOut', lift: 0, cam: [[41.92, 540, 1150, 1.0], [44.24, 540, 1130, 1.06]],
  draw() { setShowroom(); const k = springEase(TT - 41.95, 120, 16), x = 640 + 900 * (1 - k); motorbike(x, 1500, 0.95, '#e8262f', (x - 640) / 90);
    char('jonas', 230, 1500, 0.75, { pose: [[41.92, 'idle'], [42.6, 'cheer', 0.2]], emo: [[41.92, 'happy'], [42.6, 'laugh']], jump: [[42.6, 0], [42.8, 90, 0.15], [43.05, 0, 0.15]], extras: { glasses: true } }); },
  ui() { info('MOTORRAD 🏍️', 42.12, { y: 380, bg: PAL.red, size: 60 }); priceTag(620, 600, springEase(TT - 42.91, 280, 12), '30.000 €', -0.06); },
  sfx: [[41.95, 'engine'], [42.12, 'pop', 1], [42.6, 'boing'], [42.91, 'cashReg']] });

// =====================================================================  THE WEEKLY RACE
// ---- 26 · "Jeden Montag liegt Kevin weit vorne." — the race chart: Monday, Kevin's bar shoots up
S(44.24, { tr: 'glitch', cam: [[44.24, 540, 960, 1.0], [46.52, 540, 950, 1.06]],
  draw() { rays('#1a1430', '#2a1650', { cy: 900, spin: 0.2 }); raceChart(540, 1080, 1.0, clamp((TT - 44.5) / 6) * 0.15 + 0.02, { kGrow: clamp((TT - 44.6) / 0.4), gap: 1 }); },
  ui() { info('MONTAG: KEVIN VORNE 🚀', 44.7, { y: 330, bg: PAL.blue, size: 50 }); },
  sfx: [[44.6, 'whooshUp', 1.2], [44.7, 'pop', 1], [45.97, 'dun']] });
// ---- 27 · "Doch bis Sonntag schmilzt sein Vorsprung auf ein paar Euro." — the days run, Jonas' bar climbs almost level (slow push, vignette)
S(46.52, { tr: 'cut', tense: 1, cam: [[46.52, 540, 960, 1.0], [49.54, 540, 940, 1.14]],
  draw() { rays('#1a1430', '#2a1650', { cy: 900, spin: 0.2 }); raceChart(540, 1080, 1.0, 0.17 + 0.83 * EZ.io(clamp((TT - 46.6) / 2.4)), { gap: 1 }); },
  ui() { if (TT > 49.0) info('NUR EIN PAAR EURO 😮', 49.0, { y: 330, bg: PAL.red, size: 50 }); },
  sfx: [[46.6, 'tickRun', 1.4], [47.4, 'tickSoft'], [48.2, 'tickSoft'], [49.0, 'pop', 1]] });
// ---- 28 · "Nach drei Monaten" — the calendar flips to 3 months
S(49.54, { tr: 'iris', cam: [[49.54, 540, 960, 1.0], [50.46, 540, 940, 1.1]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); const k = springEase(TT - 49.56, 220, 13); ctx.save(); ctx.translate(540, 980); ctx.scale(k, k); calendarPage(0, 0, 1.25, 'MONATE', 3); ctx.restore(); },
  ui() { info('3 MONATE SPÄTER', 49.6, { y: 360, bg: PAL.orange, size: 62 }); },
  sfx: [[49.6, 'pop', 1], [49.65, 'clockSpin', 0.8]] });
// ---- 29 · "…vergleichen sie ihre Apps." — side by side, phones out
S(50.46, { tr: 'zoomIn', lift: 200, cam: [[50.46, 540, 1150, 1.05], [51.9, 540, 1130, 1.12]],
  draw() { twoShot({ pose: [[0, 'phoneR']], emo: [[0, 'smug']], extras: KS, holdR: () => phone(0, -30, 0.3, 0.15, () => { ctx.fillStyle = '#1d48b8'; ctx.fillRect(-84, -176, 168, 352); }) },
    { pose: [[0, 'phoneR']], emo: [[0, 'grin']], holdR: () => phone(0, -30, 0.3, -0.15, () => { ctx.fillStyle = '#b6302b'; ctx.fillRect(-84, -176, 168, 352); }) }, setLeoRoom); },
  ui() { info('APPS VERGLEICHEN 📱', 51.0, { y: 380, bg: '#141026', size: 52 }); },
  sfx: [[50.5, 'swish', 0.9], [51.0, 'pop', 1], [51.3, 'phoneTap']] });
// ---- 30 · "Der Unterschied: nur ein paar hundert Euro." — two screens, both totals blurred, a small gap marker
S(51.9, { tr: 'cut', tense: 1, cam: [[51.9, 540, 960, 1.0], [54.46, 540, 950, 1.1]],
  draw() { rays('#1a1430', '#2a1650', { cy: 900, spin: 0.15 }); for (const [x, c, nm, rot] of [[300, '#1d48b8', 'KEVIN', -0.06], [780, '#b6302b', 'JONAS', 0.06]]) { const k = springEase(TT - 51.95, 240, 13); ctx.save(); ctx.translate(x, 960); ctx.rotate(rot); ctx.scale(k, k); phone(0, 0, 1.9, 0, () => { ctx.fillStyle = c; ctx.fillRect(-84, -176, 168, 352); tText(nm, 0, -130, 22, { color: '#fff', shadow: false }); ctx.save(); ctx.scale(0.28, 0.28); blurCounter(0, 0, 520, 200, 'KONTO'); ctx.restore(); }); ctx.restore(); } },
  ui() { if (TT > 53.27) { const k = springEase(TT - 53.27, 280, 12); ctx.save(); ctx.translate(540, 1300); ctx.scale(k, k); tText('≈ PAAR HUNDERT €', 0, 0, 64, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14 }); ctx.restore(); } info('DER UNTERSCHIED:', 52.1, { y: 360, bg: '#141026', size: 54 }); },
  sfx: [[51.95, 'whooshDown', 1], [52.1, 'pop', 1], [53.27, 'popHi', 1.1], [53.9, 'heartbeat', 0.9]] });
// ---- 31 · "Aber wer liegt vorne?" — darkness, both faces, a huge "?" (slow push, vignette)
S(54.46, { tr: 'glitch', tense: 1, lift: 200, cam: [[54.46, 540, 1150, 1.05], [56.11, 540, 1120, 1.15]],
  draw() { twoShot({ emo: [[0, 'serious']], extras: KS, look: [0.6, 0] }, { emo: [[0, 'serious']], look: [-0.6, 0] }, (o) => setDark('#2a1640', '#05030c', o)); },
  ui() { popText('?', 540, 520, 55.06, 260, '#ffffff', 0, 0); info('WER LIEGT VORNE? 🤔', 55.06, { y: 300, bg: PAL.yellow, fg: '#1b1530', size: 52 }); },
  sfx: [[54.5, 'heartbeat', 1.2], [55.06, 'pop', 1]] });
// ---- 32 · "Ein paar hundert Euro?" — Kevin shrugs it off
S(56.11, { tr: 'whipL', cam: CLOSE(56.11, 57.57),
  draw() { setLeoRoom({ blur: 10 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'shrug']], emo: [[0, 'smug']], tilt: [[56.11, 0], [56.5, 0.08]], extras: KS }); },
  ui() { popText('PAAR HUNDERT? 🙄', 540, 380, 56.3, 76, PAL.yellow, -0.04, 0); },
  sfx: [[56.15, 'swish', 1], [56.3, 'pop', 1]] });
// ---- 33 · "Die hol ich mir am Montag zurück!" — he jabs at a calendar page: MONTAG
S(57.57, { tr: 'cut', cam: CLOSE(57.57, 59.11), punch: [[58.36, 0.08]],
  draw() { setLeoRoom({ blur: 10 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[57.57, 'idle'], [57.8, 'pointUpR', 0.15]], emo: [[0, 'grin']], extras: KS }); },
  ui() { info('AM MONTAG HOL ICH\'S ZURÜCK! 💪', 58.36, { y: 380, bg: PAL.blue, size: 40 }); sticker('📅 MONTAG', 800, 560, 58.3, { bg: '#ffffff', fg: '#1b1530', size: 50, rot: 0.08 }); },
  sfx: [[58.3, 'pop', 1.2], [58.36, 'ting']] });
// ---- 34 · "Und ich bis Sonntag!" — Jonas laughs, a calendar page: SONNTAG
S(59.11, { tr: 'whipR', cam: CLOSEJ(59.11, 60.42), punch: [[59.82, 0.08]],
  draw() { setLeoRoom({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[59.11, 'cheer']], emo: [[0, 'laugh']], extras: { glasses: true } }); },
  ui() { popText('UND ICH BIS SONNTAG! 😂', 540, 380, 59.2, 62, PAL.yellow, -0.04, 0); sticker('📅 SONNTAG', 280, 560, 59.75, { bg: '#ffffff', fg: '#1b1530', size: 50, rot: -0.08 }); },
  sfx: [[59.2, 'pop', 1], [59.75, 'pop', 1.2], [59.82, 'boing']] });

// =====================================================================  ONE YEAR LATER: THE QUESTION
// ---- 35 · "Ein Jahr später"
S(60.42, { tr: 'iris', cam: [[60.42, 540, 960, 1.0], [61.34, 540, 940, 1.1]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); const k = springEase(TT - 60.44, 220, 13); ctx.save(); ctx.translate(540, 980); ctx.scale(k, k); calendarPage(0, 0, 1.25, 'JAHR', 1); ctx.restore(); },
  ui() { info('1 JAHR SPÄTER', 60.5, { y: 360, bg: PAL.orange, size: 62 }); },
  sfx: [[60.5, 'pop', 1], [60.55, 'clockSpin', 0.8]] });
// ---- 36 · "…hat Kevin noch 277.000 Euro." — even split: both enter at once (Kevin with his Rolex, Jonas with his helmet); captions on the divider
const YD = 900;
function splitEven(top, bottom) {
  ctx.save(); ctx.beginPath(); ctx.rect(-300, -400, 1700, YD + 400); ctx.clip(); top(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-300, YD, 1700, 1500); ctx.clip(); bottom(); ctx.restore(); line(-300, YD, 1400, YD, 14, '#ffffff');
}
function helmet(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.arc(0, 0, 120, Math.PI, 0); ctx.lineTo(120, 60); ctx.lineTo(-120, 60); ctx.closePath(); ctx.fillStyle = '#e8262f'; ctx.fill(); fillRR(-90, -30, 150, 60, 24, '#1b1530'); fillRR(-80, -24, 60, 14, 6, 'rgba(255,255,255,0.35)'); ctx.restore(); }
const kevinHalf = (t0) => { rays('#1d48b8', '#2f6df6', { cy: 560, spin: 0.08 }); const k = t0 == null ? 1 : springEase(TT - t0, 170, 13); char('kevin', 350 - (1 - k) * 760, 860, 0.56, { pose: [[0, { la: [0.16, -0.12], ra: [1.05, -0.35] }]], emo: [[0, 'smug']], extras: KS2, lean: (1 - k) * 0.25, holdR: () => goldWatch(0, 0, 0.09, TT) }); };
const jonasHalf = (t0) => { rays('#b6302b', '#e8483c', { cy: 1220, spin: -0.08 }); const k = t0 == null ? 1 : springEase(TT - t0, 170, 13); char('jonas', 350, 1520 + (1 - k) * 600, 0.56, { pose: [[0, { la: [1.05, -0.35], ra: [0.16, -0.12] }]], emo: [[0, 'smug']], extras: { glasses: true }, holdL: () => helmet(0, -60, 0.7) }); };
S(61.34, { tr: 'glitch', tense: 1, capY: YD, cam: [[61.34, 540, 960, 1.0], [64.23, 540, 960, 1.03]],
  draw() { splitEven(() => { kevinHalf(61.36); cash('k36', 61.9, 12); }, () => jonasHalf(61.36)); },
  ui() { hud('KONTO · KEVIN', [[0, 277e3]], { x: 775, y: 560, scale: 0.8, t0: 61.45 }); const k = springEase(TT - 61.5, 260, 14); ctx.save(); ctx.translate(775, 1230); ctx.scale(k * 0.8, k * 0.8); blurCounter(0, 0, 560, 210, 'KONTO · JONAS'); ctx.restore(); },
  sfx: [[61.4, 'whoosh', 1.1], [61.45, 'pop', 1], [61.5, 'pop', 1.2], [61.89, 'cashReg'], [62.8, 'heartbeat', 1.0]] });
// ---- 37 · "Wie viel bleibt Jonas?" — cut on the question; Jonas' counter glitches
S(64.23, { tr: 'cut', tense: 1, capY: YD, cam: [[64.23, 540, 960, 1.0], [65.8, 540, 960, 1.04]], punch: [[64.23, 0.05], [64.88, 0.06]],
  draw() { splitEven(() => kevinHalf(), () => jonasHalf()); },
  ui() { hud('KONTO · KEVIN', [[0, 277e3]], { x: 775, y: 560, scale: 0.8 }); { const g = TT > 64.3 && TT < 64.6 ? Math.sin(TT * 90) * 12 : 0; ctx.save(); ctx.translate(775 + g, 1230); ctx.scale(0.8, 0.8); blurCounter(0, 0, 560, 210, 'KONTO · JONAS'); ctx.restore(); }
    info('WIE VIEL BLEIBT JONAS? 🤔', 64.3, { y: 270, bg: PAL.yellow, fg: '#1b1530', size: 50 }); },
  sfx: [[64.3, 'glitch'], [64.35, 'pop', 1], [64.5, 'coinTicks', 1.4, 4]] });
