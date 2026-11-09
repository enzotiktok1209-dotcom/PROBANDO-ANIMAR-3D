// =====================================================================
//  shots.js — Eine halbe Million sofort vs 1 Cent pro Sekunde, 1 Jahr (DE). ~42 shots on the trimmed voice (72.2 s).
//  Subjects in the centre band above the captions; German helper texts; cash whenever money is said;
//  Jonas' total never readable. The spree is cut faster (about every 1.3–1.8 s).
// =====================================================================
const KONTO = [[0, 5e5], [25.1, 4e5], [28.2, 3.6e5], [30.6, 3.5e5]];
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
  if (icon === 'cash') { glow(0, 0, 200, '#a6f0b4', 0.3); briefcase(0, 60, 0.42, 1); } else { stopwatch(-80, 0, 0.26, TT * 10); copperCent(90, 0, 58, { sx: Math.cos(TT * 3) }); }
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

// =====================================================================  THE HOOK
// ---- 1 · the two at their buttons and both options — a subtle 0.2 s punch-in with its swoosh, a short riser into the cut
S(0.0, { tr: 'cut', lift: 110, cam: [[0, 540, 1020, 1.14], [0.2, 540, 1020, 1.0], [0.7, 540, 1018, 1.02]],
  draw() { setStudio(); char('kevin', 300, FLOOR - 40, 0.8, { emo: [[0, 'grin']], look: [0.4, -0.4] }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']], look: [-0.3, -0.3], extras: { glasses: true } }); studioPodiums(); },
  ui() { tText('WAS NIMMST DU?', 540, 200, 66, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14, maxW: 1000 });
    iconCard(285, 462, 'OPTION 1', '½ MILLION €', 'SOFORT', PAL.green, 0.02, 'cash'); iconCard(795, 462, 'OPTION 2', '1 CENT / SEKUNDE', '1 JAHR LANG', PAL.orange, 0.08, 'cent'); tText('VS', 540, 462, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); },
  sfx: [[0.02, 'pop', 1], [0.08, 'pop', 1.2]] });
// ---- 2 · "Eine halbe Million sofort?" — the briefcase snaps open, 100s fly
S(0.7, { tr: 'zoomIn', cam: [[0.7, 540, 960, 1.0], [1.98, 540, 950, 1.1]],
  draw() { rays('#0e8a45', '#14a956', { cy: 940, spin: 0.25 }); glow(540, 1000, 600, '#a6f0b4', 0.35); const k = springEase(TT - 0.72, 220, 13), op = EZ.o3(clamp((TT - 0.82) / 0.25));
    ctx.save(); ctx.translate(540, 1240); ctx.scale(k, k); briefcase(0, 0, 1.35, op); ctx.restore();
    for (let i = 0; i < 5; i++) { const t0 = 0.86 + i * 0.1; if (TT > t0) { const u = TT - t0, R = RNG('stk', i); euro100(540 + R.n(320) + u * R.n(200), 1000 - u * 700 + u * u * 500, 220, R.n(0.8) + u * R.n(3)); } } cash('m2', 0.86, 36); },
  ui() { popText('500.000 €', 540, 560, 0.9, 110, PAL.yellow, -0.04, 0); info('SOFORT!', 1.2, { y: 360, bg: PAL.red, size: 64 }); },
  sfx: [[0.82, 'click'], [0.86, 'cashCannon'], [0.95, 'moneyRain', 1.0], [1.2, 'pop', 1.1], [1.6, 'cashReg']] });
// ---- 3 · "Oder 1 Cent pro Sekunde" — a copper cent drops into the jar every beat, the stopwatch ticks
const DROPS = Array.from({ length: 5 }, (_, k) => 2.0 + k * 0.18);
S(1.98, { tr: 'whipL', cam: [[1.98, 540, 960, 1.04], [3.44, 540, 960, 1.0]],
  draw() { rays('#c4520a', '#e86c0e', { cy: 940 }); glow(540, 1000, 460, '#ffe2a8', 0.4); const n = DROPS.filter((t) => TT > t + 0.57).length; coinJar(540, 1360, 1.0, 0.03 + n * 0.02);
    DROPS.forEach((t0, k) => { if (TT < t0 || TT > t0 + 0.6) return; const R = RNG('drop', k), x = 540 + R.n(70), y = lerp(250, 1120, clamp((TT - t0) / 0.57) ** 2); copperCent(x, y, 44, { sx: Math.cos(TT * 9 + k) }); });
    stopwatch(850, 760, 0.36 * springEase(TT - 2.0, 220, 13), (TT - 2.0) * 6); },
  ui() { tText('1 CENT PRO SEKUNDE', 540, 380, 84, { color: '#fff', stroke: '#6a2a00', strokeW: 18, maxW: 1000 }); DROPS.forEach((t) => popText('+1 CENT', 360, 1000, t + 0.57, 56, '#ffb07a', 0, 120)); },
  sfx: [[2.0, 'tick'], ...DROPS.map((t) => [t + 0.57, 'coinJar']), ...DROPS.map((t) => [t, 'tickSoft'])] });
// ---- 4 · "…ein Jahr lang?" — the year card drops in spinning
S(3.44, { tr: 'flash', cam: [[3.44, 540, 960, 1.0], [4.56, 540, 940, 1.12]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.2 }); const k = springEase(TT - 3.46, 220, 13); ctx.save(); ctx.translate(540, 980 - (1 - k) * 300); ctx.scale(k, k); ctx.rotate((1 - k) * 0.6); calendarPage(0, 0, 1.25, 'JAHR', 1); ctx.restore(); },
  ui() { info('1 JAHR LANG', 3.7, { y: 360, bg: PAL.orange, size: 64 }); },
  sfx: [[3.46, 'whooshDown', 1.1], [3.58, 'thud'], [3.7, 'pop', 1]] });
// ---- 5 · "Fast jeder wählt hier falsch." — back on the two; a red stamp slams, question marks over both options (slow push)
S(4.56, { tr: 'zoomOut', lift: 110, tense: 1, cam: [[4.56, 540, 1020, 1.0], [6.16, 540, 1000, 1.08]],
  draw() { setStudio({ blur: 2 }); char('kevin', 300, FLOOR - 40, 0.8, { emo: [[0, 'confused']], look: [0.4, -0.4] }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'serious']], look: [-0.3, -0.3], extras: { glasses: true } }); studioPodiums(); },
  ui() { for (const [x, t] of [[300, 4.7], [780, 4.85]]) popText('?', x, 560, t, 200, '#ffffff', 0, 0);
    if (TT > 5.45) { const k = springEase(TT - 5.45, 300, 10); ctx.save(); ctx.translate(540, 420); ctx.rotate(-0.12); ctx.scale(1.6 - 0.6 * k, 1.6 - 0.6 * k); ctx.globalAlpha = clamp((TT - 5.45) / 0.1); fillRR(-330, -70, 660, 140, 20, 'rgba(0,0,0,0)'); ctx.lineWidth = 14; ctx.strokeStyle = PAL.red; rrPath(-330, -70, 660, 140, 20); ctx.stroke(); tText('FAST JEDER WÄHLT FALSCH', 0, 4, 46, { color: PAL.red, shadow: false, maxW: 620 }); ctx.restore(); } },
  sfx: [[4.7, 'popHi', 1], [4.85, 'popHi', 1.2], [5.45, 'stamp'], [5.5, 'shockHit']] });

// =====================================================================  THE BET
// ---- 6 · Kevin slams the button
S(6.16, { tr: 'whipR', lift: 90, cam: [[6.16, 330, 1140, 1.45], [8.04, 320, 1090, 1.6]], shake: [[7.4, 20, 0.4]],
  draw() { setStudio({ blur: 3 }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']], look: [-0.6, 0.2], extras: { glasses: true } });
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[6.16, 'raiseR'], [7.25, 'slamR', 0.1], [7.7, 'cheer', 0.2]], emo: [[6.16, 'grin'], [7.4, 'angry'], [7.7, 'laugh']], look: [0.4, 0.5] });
    studioPodiums({ pressL: TT > 7.4 ? 1 : 0, litL: TT > 7.4 ? 0.9 : 0 }); impactLines(300, 1250, 120, 380, 12, 7.4); cash('k6', 7.45, 22); },
  ui() { info('DIE HALBE MILLION!', 7.5, { y: 380, bg: PAL.green, size: 54 }); },
  sfx: [[6.2, 'whooshUp', 1.2], [7.4, 'slam'], [7.45, 'buzzerWin'], [7.5, 'cashCannon']] });
// ---- 7 · "Ein Cent?" — he holds a copper cent up between two fingers
S(8.04, { tr: 'zoomIn', cam: CLOSE(8.04, 9.16),
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[8.04, 'idle'], [8.15, 'holdR']], emo: [[0, 'smug']], look: [0.5, 0.3], tilt: [[8.04, 0], [8.4, 0.08]], holdR: () => copperCent(0, -50, 30, { sx: Math.cos(TT * 5) }) }); },
  ui() { info('EIN CENT? 🙄', 8.3, { y: 380, bg: PAL.orange, size: 58 }); },
  sfx: [[8.1, 'coin', 1.2], [8.3, 'pop', 1], [8.8, 'swish', 0.8]] });
// ---- 8 · "Den heb ich nicht mal von der Straße auf!" — the cent lies on the pavement, he steps over it laughing
S(9.16, { tr: 'whipL', lift: 230, cam: [[9.16, 540, 1150, 1.02], [10.92, 560, 1120, 1.1]],
  draw() { setStreet({ blur: 2 }); glow(700, FLOOR + 30, 140, '#ffd9b8', 0.5); copperCent(700, FLOOR + 30, 40, { sx: 0.5 + 0.1 * Math.sin(TT * 3) });
    const x = lerp(280, 820, clamp((TT - 9.2) / 1.6)); char('kevin', x, FLOOR + 40, 0.9, { walk: 1, pose: [[0, 'laughBelly']], emo: [[0, 'laugh']], look: [0.5, 0.7] }); },
  ui() { info('NICHT MAL AUFHEBEN 😂', 9.3, { y: 380, bg: PAL.red, size: 50 }); },
  sfx: [[9.2, 'footsteps', 1.6], [9.3, 'pop', 1], [9.9, 'coin', 0.7], [10.3, 'popHi', 1]] });
// ---- 9 · "Wetten, dass ich am Ende mehr habe?" — he points at Jonas: the challenge
S(10.92, { tr: 'cut', cam: CLOSE(10.92, 12.62), punch: [[11.34, 0.08]],
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'pointR']], emo: [[0, 'smug']], look: [0.6, 0], lean: 0.05 }); },
  ui() { popText('WETTEN? 😏', 540, 380, 11.0, 90, PAL.yellow, -0.05, 0); },
  sfx: [[10.95, 'whoosh', 1.2], [11.0, 'pop', 1.1], [11.34, 'ting']] });
// ---- 10 · Jonas holds out his hand
S(12.62, { tr: 'whipR', lift: 200, cam: [[12.62, 540, 1150, 1.05], [13.98, 540, 1130, 1.14]],
  draw() { twoShot({ pose: [[0, 'hips']], emo: [[0, 'smug']] }, { pose: [[12.62, 'idle'], [12.95, { la: [1.15, -0.35], ra: [0.16, -0.12] }, 0.3]], emo: [[0, 'calm']] }); },
  ui() {},
  sfx: [[12.7, 'swish', 0.8], [13.1, 'tickSoft']] });
// ---- 11 · "Die Wette gilt." — the handshake slams, the bet is on
S(13.98, { tr: 'cut', lift: 200, cam: [[13.98, 540, 1150, 1.1], [15.52, 540, 1120, 1.22]], punch: [[14.2, 0.12]], shake: [[14.2, 12, 0.3]],
  draw() { const sh = TT > 14.15 ? Math.sin(TT * 30) * 0.05 * clamp(1 - (TT - 14.15) / 0.6) : 0;
    twoShot({ pose: [[0, { la: [0.16, -0.12], ra: [0.85 + sh, -0.2] }]], emo: [[0, 'smug']] }, { pose: [[0, { la: [0.85 - sh, -0.2], ra: [0.16, -0.12] }]], emo: [[0, 'smug']] }); impactLines(540, 1200, 80, 260, 10, 14.2); },
  ui() { info('DIE WETTE GILT! 🤝', 14.2, { y: 380, bg: PAL.red, size: 58 }); },
  sfx: [[14.15, 'pat'], [14.2, 'impact'], [14.25, 'pop', 1]] });
// ---- 12 · "Wer verliert, wird eine Woche lang das Dienstmädchen des anderen." — the stake: a maid outfit swings into view
S(15.52, { tr: 'zoomIn', cam: [[15.52, 540, 960, 1.0], [18.12, 540, 940, 1.08]],
  draw() { rays('#3a0a2a', '#ff4fa3', { cy: 960, spin: 0.2 }); const k = springEase(TT - 15.6, 200, 11); ctx.save(); ctx.translate(540, 1000); ctx.rotate(Math.sin((TT - 15.6) * 4) * 0.15 * Math.exp(-(TT - 15.6))); ctx.scale(k, k); maidOutfit(0, 0, 1.6); ctx.restore(); },
  ui() { info('DER VERLIERER…', 15.6, { y: 340, bg: '#141026', size: 52 }); if (TT > 16.5) info('…WIRD 1 WOCHE DIENSTMÄDCHEN 🧹', 16.55, { y: 470, bg: PAL.pink, size: 42, rot: 0.03 }); },
  sfx: [[15.6, 'whooshDown', 1], [15.75, 'boing'], [16.55, 'pop', 1.2], [17.2, 'sparkle']] });
// ---- 13 · "Abgemacht! Ich will Kaffee ans Bett!" — Kevin, cocky, a mug pops up
S(18.12, { tr: 'whipL', cam: CLOSE(18.12, 20.18),
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[18.12, 'cheer'], [19.1, 'pointUpR']], emo: [[18.12, 'grin'], [19.1, 'laugh']] }); if (TT > 19.2) { const k = springEase(TT - 19.2, 260, 12); ctx.save(); ctx.translate(800, 760); ctx.scale(k * 2.2, k * 2.2); mug(0, 0, 1); ctx.restore(); } },
  ui() { info('„ABGEMACHT!"', 18.2, { y: 340, bg: PAL.green, size: 54 }); if (TT > 19.2) info('KAFFEE ANS BETT ☕', 19.25, { y: 470, bg: PAL.yellow, fg: '#1b1530', size: 46, rot: 0.03 }); },
  sfx: [[18.2, 'pop', 1], [19.2, 'popHi', 1.1], [19.3, 'slurp', 0.5]] });

// =====================================================================  THE SPREE (fast cuts)
// ---- 14 · "Und weil Kevin jetzt eine halbe Million hat…" — his account, cash rain, shades
S(20.18, { tr: 'flash', cam: [[20.18, 540, 1000, 1.45], [22.28, 540, 980, 1.58]],
  draw() { setClub({ blur: 10 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[20.18, 'hips'], [21.4, 'cheer']], emo: [[0, 'grin']], extras: { chain: 1, shades: clamp((TT - 20.5) / 0.25) } }); cash('k14', 20.3, 30); },
  ui() { hudKevin({ y: 300, scale: 1.0, t0: 20.25 }); },
  sfx: [[20.25, 'cashReg'], [20.3, 'moneyRain', 1.6], [20.5, 'whooshDown', 1.2], [21.4, 'bling']] });
// ---- 15 · "…legt er sofort los:" — the card goes in, approved
S(22.28, { tr: 'whipR', cam: [[22.28, 540, 960, 1.0], [23.7, 540, 960, 1.08]],
  draw() { rays('#1d3fb0', '#2f6df6', { cy: 960 }); const st = TT < 22.8 ? 0 : TT < 23.2 ? 1 : 2; cardTerminal(540, 1080, 1.3, st); const u = EZ.io(clamp((TT - 22.3) / 0.45)); creditCard(lerp(1200, 560, u), lerp(400, 820, u), 0.9, lerp(0.5, 0, u)); },
  ui() { if (TT > 23.2) popText('✓ BEZAHLT', 540, 1380, 23.2, 72, '#41f08a', -0.04, 0); },
  sfx: [[22.3, 'whoosh', 1.2], [22.8, 'cardIn'], [22.95, 'beep'], [23.2, 'cashReg']] });
// ---- 16 · a helicopter for 100.000 € — it lifts off the pad
S(23.7, { tr: 'whipU', lift: 0, cam: [[23.7, 540, 1000, 1.0], [24.9, 540, 960, 1.06]],
  draw() { setAirfield(); const u = EZ.i2(clamp((TT - 23.9) / 1.0)); helicopter(560, lerp(1300, 900, u), 1.1, { tilt: -0.08 * u }); if (TT < 24.6) { ctx.save(); ctx.globalAlpha = 0.5; for (let i = 0; i < 6; i++) ell(380 + i * 70, 1420, 60 + (TT - 23.7) * 80, 18, '#ffffff'); ctx.restore(); } },
  ui() { info('HELIKOPTER 🚁', 23.8, { y: 360, bg: PAL.blue, size: 54 }); },
  sfx: [[23.75, 'rotor', 1.3], [23.8, 'pop', 1]] });
S(24.9, { tr: 'zoomOut', lift: 0, cam: [[24.9, 540, 960, 1.0], [26.0, 540, 960, 1.05]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1900, [[0, '#4aa8ff'], [1, '#cfeeff']]); ctx.fillRect(-600, -400, 2300, 2400); for (let i = 0; i < 4; i++) ell(((TT * 200 + i * 400) % 1600) - 300, 400 + i * 300, 160, 50, 'rgba(255,255,255,0.85)'); helicopter(540, 900 + Math.sin(TT * 3) * 10, 1.2, { tilt: -0.1 }); char('kevin', 660, 900, 0.22, { pose: [[0, 'waveR']], emo: [[0, 'grin']], extras: KS }); },
  ui() { hudKevin({ y: 240, scale: 0.82 }); priceTag(540, 1300, 0.9 * springEase(TT - 24.95, 300, 12), '100.000 €', -0.06); },
  sfx: [[24.95, 'pop', 1], [25.1, 'cashReg'], [25.4, 'rotor', 0.6]] });
// ---- 17 · a trip around the world in first class for 40.000 €
S(26.0, { tr: 'spin', cam: [[26.0, 540, 960, 1.0], [27.2, 540, 960, 1.08]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#0b1240'], [1, '#2a2f78']]); ctx.fillRect(-600, -400, 2300, 2700); const R = RNG('sky'); for (let i = 0; i < 40; i++) circ(R.f() * 1080, R.f() * 1920, 2 + R.f() * 2, 'rgba(255,255,255,0.6)'); const k = springEase(TT - 26.02, 220, 13); ctx.save(); ctx.translate(540, 1000); ctx.scale(k, k); globePlane(0, 0, 1.3); ctx.restore(); },
  ui() { info('WELTREISE ✈️', 26.1, { y: 360, bg: PAL.orange, size: 56 }); },
  sfx: [[26.05, 'planeWhoosh', 1.1], [26.1, 'pop', 1], [26.7, 'whoosh', 0.8]] });
S(27.2, { tr: 'whipL', cam: [[27.2, 540, 1000, 1.2], [28.5, 540, 980, 1.3]],
  draw() { ctx.fillStyle = '#e8e2d6'; ctx.fillRect(-600, -400, 2300, 2700); fillRR(140, 400, 300, 380, 140, '#9fd6ff'); ctx.save(); ctx.beginPath(); ctx.roundRect(140, 400, 300, 380, 140); ctx.clip(); for (let i = 0; i < 3; i++) ell(((TT * 300 + i * 160) % 500) + 60, 520 + i * 90, 90, 26, '#ffffff'); ctx.restore();
    fillRR(560, 700, 420, 900, 60, '#7a2a3a'); fillRR(600, 740, 340, 300, 40, '#9a3a4a'); char('kevin', 770, FLOOR + 40, 0.85, { pose: [[0, 'drinkR']], emo: [[0, 'happy']], extras: KS, holdR: () => { line(0, -30, 0, 20, 6, '#ddd'); poly([[-24, -90], [24, -90], [6, -30], [-6, -30]], 'rgba(255,240,180,0.8)'); } }); },
  ui() { info('ERSTE KLASSE 🥂', 27.25, { y: 300, bg: PAL.gold, fg: '#1b1530', size: 50 }); hudKevin({ y: 160, scale: 0.7 }); priceTag(540, 420, 0.8 * springEase(TT - 27.9, 300, 12), '40.000 €', -0.06, PAL.yellow); },
  sfx: [[27.25, 'pop', 1], [27.5, 'glassClink'], [27.9, 'pop', 1.1], [28.2, 'cashReg']] });
// ---- 18 · a gold-plated phone for 10.000 €
S(28.5, { tr: 'flash', cam: [[28.5, 540, 960, 1.0], [29.7, 540, 940, 1.1]],
  draw() { rays('#5a4210', '#8a6a18', { cy: 960, spin: 0.3 }); const k = springEase(TT - 28.52, 220, 12); ctx.save(); ctx.translate(540, 1000); ctx.scale(k * Math.cos((TT - 28.5) * 3) , k); goldPhone(0, 0, 1.6); ctx.restore(); },
  ui() { info('VERGOLDETES HANDY ✨', 28.6, { y: 340, bg: PAL.gold, fg: '#1b1530', size: 48 }); },
  sfx: [[28.55, 'sparkle'], [28.6, 'pop', 1], [29.1, 'bling']] });
S(29.7, { tr: 'whipR', cam: CLOSE(29.7, 31.12),
  draw() { setClub({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'phoneR']], emo: [[0, 'grin']], extras: KS, holdR: () => goldPhone(0, -30, 0.3, 0.15) }); if (TT > 30.0 && TT < 30.15) { ctx.save(); ctx.globalAlpha = 0.7; ctx.fillStyle = '#fff'; ctx.fillRect(-600, -400, 2300, 2800); ctx.restore(); } },
  ui() { hudKevin({ y: 240, scale: 0.82 }); priceTag(540, 600, 0.9 * springEase(TT - 30.3, 300, 12), '10.000 €', -0.06, PAL.yellow); },
  sfx: [[30.0, 'shutter'], [30.3, 'pop', 1], [30.6, 'cashReg']] });

// =====================================================================  THE TAUNT
// ---- 19 · "Und du, Jonas? Was kaufst du dir von deinen Cents? Einen Lolli?"
S(31.12, { tr: 'zoomIn', cam: CLOSE(31.12, 34.2),
  draw() { setClub({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[31.12, 'pointR'], [33.4, 'laughBelly']], emo: [[31.12, 'smug'], [33.4, 'laugh']], extras: KS }); if (TT > 33.6) { const k = springEase(TT - 33.6, 260, 12); ctx.save(); ctx.translate(820, 760); ctx.scale(k, k); lolli(0, 0, 0.9, 0.3); ctx.restore(); } },
  ui() { info('„UND DU, JONAS?"', 31.2, { y: 340, bg: PAL.yellow, fg: '#1b1530', size: 50 }); if (TT > 33.6) info('EINEN LOLLI? 🍭😂', 33.65, { y: 470, bg: PAL.pink, size: 48, rot: 0.03 }); },
  sfx: [[31.15, 'swish', 1], [31.2, 'pop', 1], [33.6, 'popHi', 1.1], [33.8, 'boing']] });
// ---- 20 · "Gar nichts. Denn mein Geld wächst sogar, während ich schlafe." (slow push, vignette)
S(34.2, { tr: 'whipL', tense: 1, cam: CLOSEJ(34.2, 35.5),
  draw() { setLeoRoom({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[34.2, 'calm'], [35.0, 'smug']], tilt: [[34.2, 0], [34.6, -0.05]], extras: { glasses: true } }); },
  ui() { info('„GAR NICHTS."', 34.3, { y: 380, bg: PAL.blue, size: 54 }); },
  sfx: [[34.3, 'pop', 1], [34.9, 'ting']] });
S(35.5, { tr: 'iris', lift: 0, cam: [[35.5, 540, 1100, 1.15], [37.18, 540, 1080, 1.25]],
  draw() { setBedroom(); sleepingJonas(680, 1330, 1.0); for (let i = 0; i < 5; i++) { const t0 = 35.6 + i * 0.32; if (TT > t0) copperCent(520 + i * 70, bounceY(TT - t0, 600, 1210, 5200, 0.3), 26, { sx: Math.cos(TT * 9 + i) }); } },
  ui() { info('SOGAR IM SCHLAF 😴', 35.6, { y: 340, bg: '#3a2f8a', size: 52 }); plus1c(600, 980, 3, 35.6, 'z20'); },
  sfx: [[35.6, 'pop', 0.9], [35.65, 'coinTicks', 1.5, 3], [36.0, 'snore', 1.1]] });

// =====================================================================  THREE MONTHS LATER
// ---- 21 · "Doch nach drei Monaten passiert etwas…" — months fly (1 → 3), riser
S(37.18, { tr: 'spin', tense: 1, cam: [[37.18, 540, 960, 1.0], [39.2, 540, 940, 1.12]],
  draw() { rays('#d4520a', '#ff7a12', { cy: 900, spin: 0.25 }); const m = Math.min(3, 1 + Math.floor(clamp((TT - 37.3) / 0.9) * 3)); const k = springEase(TT - 37.2, 220, 13); ctx.save(); ctx.translate(540, 980); ctx.scale(k, k); calendarPage(0, 0, 1.2, 'MONAT', m); ctx.restore(); },
  ui() { info('NACH 3 MONATEN…', 37.25, { y: 360, bg: '#141026', size: 58 }); },
  sfx: [[37.25, 'pop', 1], [37.3, 'flip'], [37.6, 'flip', 1.15], [37.9, 'flip', 1.3], [38.4, 'tension', 0.8]] });
// ---- 22 · "…womit Kevin nicht gerechnet hat:" — Kevin, carefree on his world trip, no idea
S(39.2, { tr: 'whipR', cam: [[39.2, 540, 1050, 1.3], [40.84, 540, 1030, 1.4]],
  draw() { setIsland({ blur: 6 }); char('kevin', 540, FLOOR + 60, 0.95, { pose: [[0, 'drinkR']], emo: [[0, 'happy']], extras: KS, holdR: () => coconut(0, -30, 0.5) }); },
  ui() { info('KEVIN AHNT NICHTS 🍹', 39.3, { y: 380, bg: PAL.yellow, fg: '#1b1530', size: 50 }); },
  sfx: [[39.3, 'pop', 1], [39.4, 'waves', 1.3], [40.0, 'slurp', 0.6]] });
// ---- 23 · "Jonas hat schon über 77.000 Euro." — a mountain of cash
S(40.84, { tr: 'zoomIn', cam: [[40.84, 540, 960, 1.0], [43.62, 540, 950, 1.1]],
  draw() { rays('#0e8a45', '#14a956', { cy: 960, spin: 0.2 }); moneyPyramid(540, 1400, 1.0, EZ.o3(clamp((TT - 40.9) / 0.8))); cash('m23', 41.5, 30); },
  ui() { info('ÜBER 77.000 € 💰', 41.8, { y: 420, bg: PAL.gold, fg: '#1b1530', size: 58 }); },
  sfx: [[40.9, 'coinPour', 1.0], [41.5, 'cashCannon'], [41.8, 'pop', 1.1], [42.6, 'cashReg']] });
// ---- 24 · "Zum ersten Mal wird Kevin nervös." — the smile fades, sweat (slow push, vignette)
S(43.62, { tr: 'glitch', tense: 1, cam: CLOSE(43.62, 45.92),
  draw() { setIsland({ blur: 10 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[43.62, 'hips'], [44.6, 'headGrab', 0.4]], emo: [[43.62, 'happy'], [44.4, 'confused'], [45.0, 'scared']], extras: { chain: 1, shades: TT < 44.3 ? 1 : 0, sweat: TT > 44.6 ? 1 : 0, pale: clamp((TT - 44.6) / 1.0) * 0.4 } }); },
  ui() { if (TT > 45.0) info('NERVÖS… 😰', 45.05, { y: 380, bg: '#141026', size: 54 }); },
  sfx: [[44.3, 'swish', 0.8], [44.6, 'heartbeat', 1.3], [45.05, 'pop', 0.9]] });
// ---- 25 · "Okay… ab heute gebe ich keinen Cent mehr aus!" — he snaps his credit card in two
S(45.92, { tr: 'whipL', cam: CLOSE(45.92, 48.86),
  draw() { setIsland({ blur: 9 }); const snap = TT > 47.6; char('kevin', 540, FLOOR + 160, 1.0, { pose: [[45.92, 'holdBoth'], [47.6, { la: [0.6, -1.2], ra: [0.6, -1.2] }, 0.12]], emo: [[45.92, 'serious'], [47.6, 'angry']], extras: { chain: 1, sweat: 1 }, holdR: () => (snap ? creditCard(30, -20, 0.22, 0.6) : creditCard(-60, -20, 0.3, 0)) }); },
  ui() { info('„KEINEN CENT MEHR!"', 47.0, { y: 380, bg: PAL.red, size: 52 }); if (TT > 47.6) popText('KNACK!', 820, 760, 47.6, 72, '#ffffff', 0.1, 10); },
  sfx: [[46.0, 'gulp'], [47.0, 'pop', 1], [47.6, 'crunch'], [47.65, 'stamp', 0.7]] });

// =====================================================================  THE JET SKI AD
// ---- 26 · "Trotzdem ploppt kurz darauf eine Werbung auf:" — the phone buzzes, an ad pops up
S(48.86, { tr: 'zoomIn', cam: [[48.86, 540, 960, 1.0], [51.86, 540, 940, 1.12]],
  draw() { setIsland({ blur: 12 }); const k = springEase(TT - 49.2, 260, 12), buzz = TT > 49.2 && TT < 49.7 ? Math.sin(TT * 80) * 8 : 0; ctx.save(); ctx.translate(540 + buzz, 1000); ctx.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); adPhone(0, 0, 3.4); ctx.restore(); },
  ui() { info('WERBUNG! 📲', 49.3, { y: 300, bg: PAL.orange, size: 54 }); },
  sfx: [[49.2, 'notify'], [49.25, 'buzzPhone'], [49.3, 'pop', 1], [51.2, 'popHi', 1.2], [51.3, 'waves', 0.6]] });
// ---- 27 · "Jetski, nur 45.000 Euro. Kevins Finger schwebt schon über dem Kaufen-Button." — the finger hovers (slow push, heartbeat)
S(51.86, { tr: 'cut', tense: 1, cam: [[51.86, 540, 1100, 1.05], [55.76, 540, 1180, 1.35]],
  draw() { setIsland({ blur: 12 }); adPhone(540, 1000, 3.4); const hov = Math.sin(TT * 5) * 14, y = lerp(1900, 1470, EZ.o3(clamp((TT - 53.4) / 0.8))); fingerArm('kevin', 1250, 2100, 640 + hov, y, 120); },
  ui() { info('KAUFEN? 🤔', 52.0, { y: 300, bg: PAL.yellow, fg: '#1b1530', size: 54 }); },
  sfx: [[52.0, 'pop', 1], [52.5, 'cashReg', 0.6], [53.5, 'whoosh', 0.8], [53.6, 'heartbeat', 2.0]] });
// ---- 28 · "Und genau diese eine Entscheidung wird am Ende alles verändern." — a scale wobbles between the jet ski and Kevin's cash
S(55.76, { tr: 'glitch', tense: 1, cam: [[55.76, 540, 1000, 1.0], [59.3, 540, 960, 1.12]],
  draw() { setDark('#2a1640', '#05030c'); const tilt = Math.sin(TT * 2.5) * 0.12 * Math.exp(-(TT - 55.8) * 0.2); balance(540, 1450, 1.0, tilt, () => jetski(0, -40, 0.35), () => briefcase(0, 0, 0.25, 1)); },
  ui() { info('EINE ENTSCHEIDUNG…', 55.9, { y: 340, bg: PAL.red, size: 54 }); if (TT > 57.5) info('…ÄNDERT ALLES', 57.55, { y: 470, bg: '#141026', size: 54, rot: 0.03 }); },
  sfx: [[55.9, 'pop', 1], [56.0, 'scaleCreak'], [57.55, 'pop', 1.1], [58.0, 'tension', 1.2]] });
// ---- 29 · "Kevin atmet tief durch… und klickt die Werbung weg." — eyes closed, a breath, swipe
S(59.3, { tr: 'cut', tense: 1, cam: CLOSE(59.3, 60.9),
  draw() { setIsland({ blur: 10 }); const br = clamp((TT - 59.4) / 0.9); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'phoneR']], emo: [[59.3, 'sleepy'], [60.4, 'serious']], extras: { chain: 1, sweat: 1 }, squash: [[59.3, 0], [59.9, -0.6, 0.6], [60.4, 0, 0.3]], holdR: () => phone(0, -30, 0.3, 0.15, () => { ctx.fillStyle = '#1d48b8'; ctx.fillRect(-84, -176, 168, 352); }) }); },
  ui() { info('TIEF DURCHATMEN… 😮‍💨', 59.4, { y: 380, bg: '#141026', size: 46 }); },
  sfx: [[59.4, 'breath'], [60.2, 'heartbeat', 0.8]] });
S(60.9, { tr: 'whipL', cam: [[60.9, 540, 1000, 1.0], [62.0, 540, 990, 1.05]],
  draw() { setIsland({ blur: 12 }); const sw = EZ.i3(clamp((TT - 61.2) / 0.35)); ctx.save(); ctx.translate(540 - sw * 1300, 1000); ctx.rotate(-sw * 0.4); adPhone(0, 0, 3.4, { declined: TT > 61.05 }); ctx.restore(); fingerArm('kevin', 1250, 2100, lerp(700, 200, EZ.io(clamp((TT - 61.0) / 0.4))), 1470, 120); },
  ui() { if (TT > 61.5) popText('WEGGEKLICKT ✓', 540, 900, 61.5, 80, '#41f08a', -0.04, 0); },
  sfx: [[61.0, 'phoneTap'], [61.2, 'whoosh', 1.4], [61.5, 'ding']] });
// ---- 30 · "Siehst du, Jonas? Ich kann auch sparen!"
S(62.0, { tr: 'zoomIn', cam: CLOSE(62.0, 63.86),
  draw() { setIsland({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[62.0, 'pointR'], [62.9, 'hips']], emo: [[0, 'smug']], extras: KS }); piggyBank(820, FLOOR - 120, 0.9 * springEase(TT - 62.9, 260, 12)); },
  ui() { info('„ICH KANN AUCH SPAREN!"', 62.9, { y: 380, bg: PAL.green, size: 48 }); },
  sfx: [[62.05, 'swish', 1], [62.9, 'pop', 1], [63.0, 'coin', 1.1]] });
// ---- 31 · "Wir werden sehen." — Jonas, one eyebrow up (slow push, vignette)
S(63.86, { tr: 'whipR', tense: 1, cam: CLOSEJ(63.86, 64.72),
  draw() { setLeoRoom({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], tilt: [[63.86, 0], [64.1, 0.06]], extras: { glasses: true } }); },
  ui() { info('„WIR WERDEN SEHEN."', 63.9, { y: 380, bg: PAL.blue, size: 50 }); },
  sfx: [[63.9, 'pop', 1], [64.3, 'dun']] });

// =====================================================================  ONE YEAR LATER
// ---- 32 · one year later
S(64.72, { tr: 'iris', cam: [[64.72, 540, 960, 1.0], [65.7, 540, 940, 1.1]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); const k = springEase(TT - 64.74, 220, 13); ctx.save(); ctx.translate(540, 980); ctx.scale(k, k); calendarPage(0, 0, 1.25, 'JAHR', 1); ctx.restore(); },
  ui() { info('1 JAHR SPÄTER', 64.8, { y: 360, bg: PAL.orange, size: 62 }); },
  sfx: [[64.8, 'pop', 1], [64.85, 'clockSpin', 0.8]] });
// ---- 33 · both bank statements land on the table (slow push, vignette)
S(65.7, { tr: 'zoomIn', tense: 1, lift: 0, cam: [[65.7, 540, 1000, 1.0], [67.64, 540, 980, 1.1]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#6a4a2a'], [1, '#4a3018']]); ctx.fillRect(-600, -400, 2300, 2700); for (let i = 0; i < 10; i++) line(-600, 200 + i * 180, 1700, 220 + i * 180, 6, 'rgba(0,0,0,0.12)');
    const a = springEase(TT - 65.8, 200, 13), b = springEase(TT - 66.2, 200, 13); statement(300, 1000 - (1 - a) * 900, 0.95, 'KEVIN', null, -0.06); statement(780, 1000 - (1 - b) * 900, 0.95, 'JONAS', null, 0.06); },
  ui() { info('KONTOAUSZÜGE 📄', 65.8, { y: 340, bg: '#141026', size: 52 }); },
  sfx: [[65.8, 'fold'], [65.85, 'thud'], [66.2, 'fold', 1.2], [66.25, 'thud'], [66.9, 'heartbeat', 0.8]] });

// =====================================================================  THE QUESTION
// ---- 34 · Kevin: 350.000 € (top half)
S(67.64, { tr: 'glitch', tense: 1, cam: [[67.64, 540, 960, 1.0], [70.2, 540, 960, 1.03]],
  draw() { splitTopBottom(() => { rays('#1d48b8', '#2f6df6', { cy: 560, spin: 0.08 }); char('kevin', 280, 900, 0.62, { pose: [[0, 'hips']], emo: [[0, 'smug']], extras: { chain: 1, sweat: 1 } }); cash('k34', 68.3, 12); }, () => { rays('#b6302b', '#e8483c', { cy: 1400, spin: -0.08 }); }); },
  ui() { hud('KONTO · KEVIN', [[0, 3.5e5]], { x: 720, y: 560, scale: 0.85, t0: 67.7 }); },
  sfx: [[67.7, 'pop', 1], [68.3, 'cashReg'], [69.0, 'heartbeat', 1.0]] });
// ---- 35 · …and Jonas? (bottom half; his statement stays blurred) — cut on the question
S(70.2, { tr: 'cut', tense: 1, cam: [[70.2, 540, 960, 1.0], [72.6, 540, 960, 1.05]], punch: [[70.88, 0.06]],
  draw() { splitTopBottom(() => { rays('#1d48b8', '#2f6df6', { cy: 560, spin: 0.08 }); char('kevin', 280, 900, 0.62, { pose: [[0, 'hips']], emo: [[0, 'smug']], extras: { chain: 1, sweat: 1 } }); },
    () => { rays('#b6302b', '#e8483c', { cy: 1400, spin: -0.08 }); const k = springEase(TT - 70.22, 200, 14); char('jonas', 280, 1420 + (1 - k) * 500, 0.46, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], extras: { glasses: true } }); }); },
  ui() { hud('KONTO · KEVIN', [[0, 3.5e5]], { x: 720, y: 560, scale: 0.85 }); if (TT > 70.25) { const k = springEase(TT - 70.25, 260, 14); ctx.save(); ctx.translate(720, 1200); ctx.scale(k * 0.85, k * 0.85); blurCounter(0, 0, 560, 210, 'KONTO · JONAS'); ctx.restore(); }
    info('WIE VIEL HAT JONAS? 🤔', 70.88, { y: 960, bg: PAL.yellow, fg: '#1b1530', size: 54 }); },
  sfx: [[70.25, 'pop', 1.2], [70.3, 'glitch'], [70.5, 'coinTicks', 1.4, 4], [70.88, 'pop', 1]] });
