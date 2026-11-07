// =====================================================================
//  shots.js — Als Einziger GTA 6 zocken für 100.000 € am Tag vs 40 Millionen sofort (DE). 49 shots on the trimmed voice (80.1 s).
//  Subjects in the centre band above the captions; German helper texts; cash whenever money is said;
//  Jonas' yearly total never readable. Kevin wins by 500.000 € (37 M vs 36,5 M) — the video never says it.
// =====================================================================
const KONTO = [[0, 40e6], [28.3, 38e6], [30.2, 37.5e6], [34.3, 37e6]];
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
  if (icon === 'cash') { glow(0, 0, 200, '#a6f0b4', 0.3); briefcase(0, 60, 0.42, 1); } else { glow(0, 0, 200, '#ffd0a0', 0.3); gamepad(-60, 10, 0.4, Math.sin(TT * 3) * 0.08, Math.floor(TT * 6) % 4); calendarPage(110, 0, 0.3, 'TAG', 1); }
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

// =====================================================================  THE HOOK
// ---- 1 · "Als Einziger…" — a locked-out crowd in the dark, one spotlight: Jonas with the gamepad and a crown (0.2 s punch-in on frame one)
function lockIcon(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.arc(0, -26, 24, Math.PI, 0); ctx.lineWidth = 12; ctx.strokeStyle = '#c9cede'; ctx.stroke(); fillRR(-36, -26, 72, 56, 10, '#ff4545'); circ(0, -2, 8, '#5a0a10'); ctx.restore(); }
S(0.0, { tr: 'cut', lift: 0, cam: [[0, 540, 1390, 1.16], [0.2, 540, 1390, 1.0], [0.88, 540, 1370, 1.06]],
  draw() { setDark('#2a1650', '#07030f'); const R = RNG('crowd');
    for (let row = 0; row < 2; row++) for (let i = 0; i < 7; i++) { const x = -20 + i * 185 + row * 90 + R.n(20), y = 1180 + row * 260, c = row ? '#3a2a66' : '#4a3780'; circ(x, y - 150, 62, c); fillRR(x - 85, y - 95, 170, 260, 70, c); if (Math.abs(x - 540) > 150 && TT > 0.12 + (i + row * 7) * 0.025) lockIcon(x, y - 150, 0.85 * springEase(TT - 0.12 - (i + row * 7) * 0.025, 300, 13)); }
    ctx.save(); ctx.globalAlpha = 0.6; poly([[440, -200], [640, -200], [840, 1750], [240, 1750]], 'rgba(255,240,190,0.22)'); ctx.restore(); glow(540, 1350, 420, '#fff0c0', 0.4);
    char('jonas', 540, 1680, 0.8, { pose: [[0, 'raiseR']], emo: [[0, 'grin']], look: [0, -0.4], extras: { glasses: true }, holdR: () => gamepad(0, -30, 0.24, 0.2, Math.floor(TT * 8) % 4) });
    const cy = lerp(-200, 1035, EZ.o3(clamp((TT - 0.3) / 0.3))); ctx.save(); ctx.translate(540, cy); ctx.rotate(-0.08); crown(0, 0, 0.75); ctx.restore(); },
  ui() { info('NUR DU! 👑', 0.25, { y: 330, bg: PAL.pink, size: 64 }); },
  sfx: [[0.12, 'click', 1.2], [0.2, 'click', 1.0], [0.25, 'pop', 1], [0.3, 'whooshDown', 1.3], [0.6, 'bling']] });
// ---- 2 · "…GTA 6 zocken" — Jonas on the sofa with the gamepad, the console beside a big screen: Vice City, the GTA 6 title slams in on it
S(0.88, { tr: 'zoomIn', lift: 0, cam: [[0.88, 540, 800, 1.6], [1.28, 540, 790, 1.66], [1.72, 540, 1170, 1.04], [2.17, 540, 1150, 1.1]], punch: [[0.92, 0.06]],
  draw() { setGamerRoom({ dark: 0.15 }); fillRR(120, 1060, 840, 40, 10, '#2a2140'); fillRR(140, 1100, 30, 160, 8, '#1b1530'); fillRR(910, 1100, 30, 160, 8, '#1b1530');
    gameTV(540, 760, 880, 500, (x, y, w, h) => { const sc = w / 1080; ctx.save(); ctx.translate(x, y - 560 * sc); ctx.scale(sc, sc); setVice(); ctx.restore();
      if (TT > 0.9) { const k = springEase(TT - 0.9, 260, 12); gtaTitle(x + w / 2 - 30, y + h * 0.42, 0.62, k); }
      if (TT > 0.9 && TT < 1.02) { ctx.fillStyle = `rgba(255,255,255,${0.8 * (1 - (TT - 0.9) / 0.12)})`; ctx.fillRect(x, y, w, h); } });
    gameConsole(880, 1060, 0.36); glow(540, 760, 700, '#ff7ad0', 0.12);
    sofa(540, 1760, 1.0, '#3d6fd8');
    char('jonas', 540, 1650, 0.74, { pose: [[0, 'holdBoth']], emo: [[0.88, 'happy'], [1.5, 'grin']], look: [0, -0.7], extras: { glasses: true, headset: 1 } });
    fillRR(40, 1455, 1000, 320, 50, '#3d6fd8'); fillRR(40, 1455, 1000, 46, 22, shade('#3d6fd8', 0.12)); for (const sd of [-1, 1]) fillRR(540 + sd * 470 - 60, 1380, 120, 395, 50, shade('#3d6fd8', -0.12));
    gamepad(540, 1415, 0.42, Math.sin(TT * 4) * 0.05, Math.floor(TT * 9) % 4); },
  ui() { info('GTA 6 ZOCKEN 🎮', 1.5, { y: 250, bg: PAL.orange, size: 52 }); },
  sfx: [[0.9, 'impact'], [0.95, 'powerOn'], [1.28, 'zoomOut'], [1.5, 'pop', 1.1], [1.75, 'click'], [1.85, 'engine', 0.5]] });
// ---- 3 · "für 100.000 Euro am Tag?" — the day pages flip, every day a stack of cash lands
const DAYS = [2.38, 2.95, 3.5];
S(2.17, { tr: 'whipL', cam: [[2.17, 540, 960, 1.04], [4.22, 540, 950, 1.0]],
  draw() { rays('#0e8a45', '#14a956', { cy: 940, spin: 0.25 }); glow(540, 1000, 600, '#a6f0b4', 0.35); const n = DAYS.filter((t) => TT > t).length;
    calendarPage(300, 900, 0.75, 'TAG', Math.max(1, n), TT > DAYS[0] ? clamp(((TT - DAYS[0]) % 0.55) / 0.2) : 0);
    for (let i = 0; i < n; i++) { const t = DAYS[i], y = lerp(200, 1380 - i * 90, EZ.o3(clamp((TT - t) / 0.3))); ctx.save(); ctx.translate(760, y); moneyBag(0, 0, 0.85, Math.sin(TT * 2 + i) * 0.04); ctx.restore(); }
    cash('d3', 2.3, 16); },
  ui() { tText('100.000 € PRO TAG', 540, 380, 86, { color: '#fff', stroke: '#0a4a22', strokeW: 18, maxW: 1000 }); DAYS.forEach((t) => popText('+100.000 €', 520, 1180, t + 0.25, 60, '#a6f0b4', 0, 120)); },
  sfx: [[2.2, 'moneyRain'], ...DAYS.map((t) => [t, 'flip']), ...DAYS.map((t) => [t + 0.3, 'cashReg', 0.9])] });
// ---- 4 · "Oder 40 Millionen sofort?" — a mountain of cash rises, the 40 million slam on screen
S(4.22, { tr: 'flash', tense: 1, cam: [[4.22, 540, 960, 1.0], [6.41, 540, 930, 1.12]], punch: [[4.66, 0.1]],
  draw() { rays('#9a6a00', '#e8b400', { cy: 940, spin: 0.3 }); glow(540, 1000, 700, '#fff2b0', 0.4); cashMountain(540, 1250, 1.0, clamp((TT - 4.25) / 0.75)); cash('d4', 4.66, 28); },
  ui() { if (TT > 4.66) { const k = springEase(TT - 4.66, 300, 11); ctx.save(); ctx.translate(540, 420); ctx.scale(k, k); tText('40.000.000 €', 0, 0, 120, { color: PAL.yellow, stroke: '#3a2400', strokeW: 22, maxW: 1000 }); ctx.restore(); } info('SOFORT ⚡', 5.85, { y: 600, bg: PAL.red, size: 60 }); },
  sfx: [[4.3, 'whooshDown', 1.1], [4.66, 'cashCannon'], [5.2, 'coinPour'], [5.85, 'pop', 1]] });

// =====================================================================  THE CHOICE
// ---- 5 · "Kevin haut sofort…" — the two at their buttons with both options (the cover); Kevin's hand goes up at once
S(6.41, { tr: 'whipR', lift: 110, cam: [[6.41, 540, 1020, 1.0], [7.3, 540, 1010, 1.05]],
  draw() { setStudio(); char('kevin', 300, FLOOR - 40, 0.8, { pose: [[6.41, 'idle'], [6.75, 'raiseR', 0.2]], emo: [[6.41, 'grin'], [6.8, 'laugh']], look: [0.4, -0.4] }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'happy']], look: [-0.6, 0.1], extras: { glasses: true } }); studioPodiums(); },
  ui() { tText('WAS NIMMST DU?', 540, 200, 66, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14, maxW: 1000 });
    iconCard(795, 462, 'ZOCKEN', 'GTA 6 + 100.000 €', 'JEDEN TAG', PAL.orange, 6.43, 'game'); iconCard(285, 462, 'SOFORT', '40 MILLIONEN €', 'AUF DIE HAND', PAL.green, 6.48, 'cash'); tText('VS', 540, 462, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); },
  sfx: [[6.43, 'pop', 1], [6.48, 'pop', 1.2], [6.75, 'whooshUp', 1.2]] });
// ---- 5b · "…auf den Knopf." — the slam on the green button
S(7.3, { tr: 'zoomIn', lift: 90, cam: [[7.3, 330, 1140, 1.45], [8.1, 320, 1090, 1.6]], shake: [[7.75, 20, 0.4]],
  draw() { setStudio({ blur: 3 }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'happy']], look: [-0.6, 0.2], extras: { glasses: true } });
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[7.3, 'raiseR'], [7.62, 'slamR', 0.1], [8.0, 'cheer', 0.2]], emo: [[7.3, 'grin'], [7.7, 'angry'], [7.95, 'laugh']], look: [0.4, 0.5] });
    studioPodiums({ pressL: TT > 7.75 ? 1 : 0, litL: TT > 7.75 ? 0.9 : 0 }); impactLines(300, 1250, 120, 380, 12, 7.75); cash('k5', 7.8, 22); },
  ui() { info('40 MILLIONEN! 💰', 7.85, { y: 380, bg: PAL.green, size: 56 }); },
  sfx: [[7.75, 'slam'], [7.8, 'buzzerWin'], [7.85, 'cashCannon']] });
// ---- 6 · "Fürs Zocken bezahlt?" — Kevin laughs, a gamepad dangles from two fingers
S(8.1, { tr: 'zoomIn', cam: CLOSE(8.1, 9.62),
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[8.1, 'idle'], [8.2, 'holdR']], emo: [[8.1, 'smug'], [8.9, 'laugh']], look: [0.5, 0.3], tilt: [[8.1, 0], [8.9, 0.1]], extras: KS, holdR: () => gamepad(0, -30, 0.22, Math.sin(TT * 6) * 0.3) }); },
  ui() { popText('BEZAHLT? 😂', 540, 380, 8.93, 90, PAL.yellow, -0.05, 0); },
  sfx: [[8.15, 'swish', 1], [8.4, 'click'], [8.93, 'pop', 1], [9.2, 'boing']] });
// ---- 7 · "Bruder, wach auf!" — he snaps at the camera, an alarm clock rings
S(9.62, { tr: 'whipL', cam: [[9.62, 540, 1000, 1.7], [11.08, 540, 980, 1.85]], punch: [[10.28, 0.08]],
  draw() { setStudio({ blur: 10 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[9.62, 'idle'], [9.8, 'pointR', 0.15]], emo: [[0, 'grin']], look: [0, 0.2], lean: 0.06, extras: KS });
    if (TT > 10.2) { const k = springEase(TT - 10.2, 260, 12); alarmClock(820, 800, 0.32 * k, { ring: 1, t: TT }); } },
  ui() { info('WACH AUF! ⏰', 10.28, { y: 380, bg: PAL.orange, size: 60 }); },
  sfx: [[9.65, 'whoosh', 1.1], [10.2, 'pop', 1], [10.3, 'alarmRing']] });
// ---- 8 · "Ich nehm die Kohle." — he hugs the briefcase, cash bursts out
S(11.08, { tr: 'cut', cam: CLOSE(11.08, 12.15),
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'holdBoth']], emo: [[0, 'love']], extras: KS, holdR: () => briefcase(-70, 10, 0.3, clamp((TT - 11.6) / 0.2)) }); if (TT > 11.65) billRain('k8', 11.65, 18, { burst: [540, 1250], spread: 0.3 }); },
  ui() { info('ICH NEHM DIE KOHLE 💰', 11.65, { y: 380, bg: PAL.green, size: 52 }); },
  sfx: [[11.1, 'pat'], [11.6, 'click'], [11.65, 'cashCannon'], [11.7, 'pop', 1]] });

// =====================================================================  THE BET
// ---- 9 · "Jonas springt auf" — he jumps up from the podium, arms high
S(12.15, { tr: 'whipR', lift: 0, cam: [[12.15, 540, 1060, 0.98], [13.54, 540, 1040, 1.04]],
  draw() { setStudio({ blur: 4 }); char('jonas', 540, FLOOR - 20, 0.9, { jump: [[12.15, 0], [12.45, 280, 0.22], [12.95, 0, 0.3]], squash: [[12.15, 0], [12.3, -0.6, 0.12], [12.45, 0.4, 0.1], [12.95, 0, 0.1], [13.0, -0.5, 0.08], [13.2, 0, 0.15]], pose: [[12.15, 'idle'], [12.35, 'cheer', 0.15]], emo: [[12.15, 'happy'], [12.4, 'grin']], extras: { glasses: true } }); },
  ui() { popText('JONAS 🔥', 540, 300, 12.3, 80, PAL.pink, -0.04, 0); },
  sfx: [[12.3, 'boing'], [12.95, 'thud'], [12.3, 'pop', 1]] });
// ---- 10 · "und reißt den Controller in die Luft." — low angle, the gamepad held high, sparkles
S(13.54, { tr: 'whipU', cam: [[13.54, 540, 900, 1.25], [14.82, 540, 860, 1.35]],
  draw() { rays('#c4520a', '#ff8a1e', { cy: 600, spin: 0.4 }); glow(640, 520, 360, '#fff1c0', 0.5); char('jonas', 540, 1760, 1.2, { pose: [[13.54, 'holdR'], [13.75, 'raiseR', 0.15]], emo: [[0, 'grin']], look: [0.2, -0.6], extras: { glasses: true }, holdR: () => gamepad(0, -40, 0.3, 0.2, Math.floor(TT * 8) % 4) }); twinkles('t10', 380, 300, 500, 400, 6, { s: 30 }); },
  ui() { info('CONTROLLER IN DIE LUFT! 🎮', 14.12, { y: 300, bg: PAL.orange, size: 46 }); },
  sfx: [[13.6, 'whooshUp', 1.1], [13.9, 'sparkle'], [14.12, 'pop', 1], [14.5, 'bling']] });
// ---- 11 · "Wetten, dass ich in einem Jahr mehr habe als du?" — Jonas points, grinning, the challenge
S(14.82, { tr: 'cut', tense: 1, cam: CLOSEJ(14.82, 17.08), punch: [[15.97, 0.08]],
  draw() { setStudio({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[14.82, 'idle'], [14.95, 'pointL', 0.15], [16.2, 'hips', 0.25]], emo: [[14.82, 'grin'], [16.2, 'smug']], look: [-0.5, 0], lean: -0.05, extras: { glasses: true } }); },
  ui() { popText('WETTEN? 😏', 540, 360, 14.85, 92, PAL.yellow, -0.05, 0); if (TT > 15.97) info('IN 1 JAHR: WER HAT MEHR?', 15.97, { y: 520, bg: PAL.blue, size: 46, rot: 0.03 }); },
  sfx: [[14.85, 'pop', 1.1], [15.97, 'ting'], [16.8, 'swish', 0.8]] });
// ---- 12 · "Wer verliert, schenkt dem anderen…" — two-shot, Jonas holds out his hand
S(17.08, { tr: 'whipR', lift: 200, cam: [[17.08, 540, 1150, 1.05], [18.53, 540, 1130, 1.14]],
  draw() { twoShot({ pose: [[0, 'armsCross']], emo: [[0, 'smug']] }, { pose: [[17.08, 'idle'], [17.4, { la: [1.15, -0.35], ra: [0.16, -0.12] }, 0.3]], emo: [[0, 'grin']] }); },
  ui() { info('DER VERLIERER…', 17.26, { y: 380, bg: PAL.red, size: 54 }); },
  sfx: [[17.15, 'swish', 0.8], [17.26, 'pop', 1], [17.7, 'tickSoft']] });
// ---- 13 · "…seinen teuersten Kauf!" — the stake: a gift box, the lid pops, a "?"
S(18.53, { tr: 'zoomIn', cam: [[18.53, 540, 960, 1.0], [19.57, 540, 940, 1.08]],
  draw() { rays('#3a0a2a', '#ff4fa3', { cy: 960, spin: 0.2 }); const k = springEase(TT - 18.56, 220, 11); ctx.save(); ctx.translate(540, 1300); ctx.scale(k * 1.5, k * 1.5); giftBox(0, 0, 1, clamp((TT - 19.0) / 0.3)); ctx.restore(); },
  ui() { info('…SCHENKT SEINEN TEUERSTEN KAUF 🎁', 18.6, { y: 380, bg: PAL.pink, size: 40 }); },
  sfx: [[18.56, 'whooshDown', 1], [18.7, 'thud'], [19.0, 'pop', 1.3], [19.05, 'sparkle']] });
// ---- 14 · "Deal!" — the handshake slams
S(19.57, { tr: 'cut', lift: 200, cam: [[19.57, 540, 1150, 1.1], [20.23, 540, 1130, 1.18]], punch: [[19.62, 0.12]], shake: [[19.62, 12, 0.3]],
  draw() { const sh = TT > 19.6 ? Math.sin(TT * 30) * 0.05 * clamp(1 - (TT - 19.6) / 0.6) : 0;
    twoShot({ pose: [[0, { la: [0.16, -0.12], ra: [0.85 + sh, -0.2] }]], emo: [[0, 'grin']] }, { pose: [[0, { la: [0.85 - sh, -0.2], ra: [0.16, -0.12] }]], emo: [[0, 'grin']] }); impactLines(540, 1200, 80, 260, 10, 19.62); },
  ui() { info('DEAL! 🤝', 19.62, { y: 380, bg: PAL.red, size: 66 }); },
  sfx: [[19.6, 'pat'], [19.62, 'impact']] });
// ---- 15 · "Du kaufst dir ja eh nichts!" — Kevin, cocky, laughs from the belly
S(20.23, { tr: 'whipL', cam: CLOSE(20.23, 21.54),
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[20.23, 'pointR'], [21.0, 'laughBelly', 0.2]], emo: [[20.23, 'smug'], [21.0, 'laugh']], extras: KS, lean: [[20.23, 0], [21.0, -0.06], [21.25, 0.05, 0.12], [21.45, -0.03, 0.1]] }); },
  ui() { popText('DU KAUFST EH NICHTS! 😂', 540, 380, 20.45, 66, PAL.yellow, -0.04, 0); },
  sfx: [[20.25, 'swish', 1], [20.45, 'pop', 1], [21.2, 'boing']] });
// ---- 16 · "Doch ein einziger Kauf…" — darkness, a spotlight on one shopping cart, a price tag "???" (slow push, vignette)
S(21.54, { tr: 'glitch', tense: 1, cam: [[21.54, 540, 1000, 1.0], [22.9, 540, 980, 1.14]],
  draw() { setDark('#2a1640', '#05030c'); ctx.save(); ctx.globalAlpha = 0.5; poly([[420, -100], [660, -100], [880, 1650], [200, 1650]], 'rgba(255,240,200,0.25)'); ctx.restore(); glow(540, 1450, 420, '#fff0c0', 0.35);
    shopCart(560, 1500, 1.1 * springEase(TT - 21.6, 220, 13)); priceTag(560, 1080, springEase(TT - 22.55, 280, 12), '???', -0.08, PAL.yellow); },
  ui() { info('EIN EINZIGER KAUF…', 21.83, { y: 340, bg: PAL.red, size: 56 }); },
  sfx: [[21.6, 'trolley'], [21.83, 'pop', 1], [22.55, 'stamp'], [22.6, 'heartbeat', 1]] });
// ---- 17 · "…wird diese Wette entscheiden." — the scale wobbles between Kevin's cash and Jonas' gamepad
S(22.9, { tr: 'cut', tense: 1, cam: [[22.9, 540, 1000, 1.0], [24.33, 540, 960, 1.12]],
  draw() { setDark('#2a1640', '#05030c'); const tilt = Math.sin(TT * 2.5) * 0.14 * Math.exp(-(TT - 22.9) * 0.3); balance(540, 1450, 1.0, tilt, () => briefcase(0, 0, 0.25, 1), () => gamepad(0, -30, 0.35)); },
  ui() { info('…ENTSCHEIDET DIE WETTE ⚖️', 23.0, { y: 340, bg: '#141026', size: 50 }); },
  sfx: [[23.0, 'pop', 1], [23.1, 'scaleCreak'], [23.9, 'tension', 1]] });

// =====================================================================  THE SPREE: the real Vice City
// ---- 18 · "Kevin holt sich sofort das echte Vice City." — Miami at sunset, Kevin struts in, the neon sign flickers on
S(24.33, { tr: 'zoomOut', lift: 200, cam: [[24.33, 540, 1100, 1.0], [26.67, 540, 1080, 1.08]],
  draw() { setVice(); const x = lerp(-120, 540, EZ.o3(clamp((TT - 24.4) / 1.4))); char('kevin', x, FLOOR + 60, 0.8, { walk: [[24.33, 1], [25.8, 0, 0.3]], pose: [[24.33, 'idle'], [25.9, 'armsUp', 0.25]], emo: [[24.33, 'smug'], [25.9, 'grin']], extras: KS2 }); },
  ui() { miamiSign(540, 520, 1.0, 25.96); },
  sfx: [[24.4, 'footsteps', 1.5], [25.96, 'flicker'], [26.15, 'powerOn'], [26.2, 'carMusic', 0.6]] });
// ---- 19 · "Eine Villa in Miami für 2 Millionen." — the villa drops in, palms, the price, his account rolls down
S(26.67, { tr: 'whipL', cam: [[26.67, 540, 960, 1.0], [28.98, 540, 940, 1.08]],
  draw() { setVice({ blur: 6 }); const k = springEase(TT - 26.75, 200, 13); ctx.save(); ctx.translate(540, 1400 + (1 - k) * 700); villa(0, 0, 1.05, 1); ctx.restore(); priceTag(780, 820, springEase(TT - 28.11, 280, 12), '2 MIO. €', -0.1); },
  ui() { hudKevin(); info('VILLA IN MIAMI 🌴', 27.05, { y: 470, bg: PAL.pink, size: 50 }); },
  sfx: [[26.75, 'whooshDown', 1], [26.95, 'thud'], [27.05, 'pop', 1], [28.11, 'cashReg'], [28.3, 'coinTicks', 1, 3]] });
// ---- 20 · "Ein Ferrari für 500.000 Euro." — the red supercar slides into the showroom
S(28.98, { tr: 'whipR', cam: [[28.98, 540, 1150, 1.05], [31.38, 540, 1120, 1.12]],
  draw() { setShowroom(); const x = 540 + 900 * (1 - springEase(TT - 29.05, 110, 16)); supercar(x, 1560, 0.95, { col: '#e8262f', wheelSpin: (x - 540) / 98 }); twinkles('s20', 120, 1200, 840, 200, 6, { s: 26 }); priceTag(780, 1000, springEase(TT - 29.91, 280, 12), '500.000 €', -0.08); },
  ui() { hudKevin(); info('FERRARI 🏎️', 29.2, { y: 470, bg: PAL.red, size: 56 }); },
  sfx: [[29.05, 'engine'], [29.5, 'screech'], [29.91, 'cashReg'], [30.2, 'coinTicks', 1, 3]] });
// ---- 21 · "Und eine Rolex voller Diamanten…" — a velvet box opens: the diamond Rolex rises, glittering
S(31.38, { tr: 'flash', cam: [[31.38, 540, 960, 1.0], [33.28, 540, 940, 1.1]],
  draw() { rays('#2a2a34', '#4a4a5a', { cy: 960, spin: 0.15 }); glow(540, 960, 700, '#fff6d0', 0.3); const lid = clamp((TT - 31.45) / 0.35); velvetBox(540, 1560, 1.2, lid, lid * 0.6);
    const k = EZ.o3(clamp((TT - 31.8) / 0.5)); diamondRolex(540, lerp(1500, 980, k), 1.25 * (0.4 + 0.6 * k), TT); },
  ui() { info('ROLEX VOLLER DIAMANTEN 💎', 31.95, { y: 330, bg: '#141026', size: 48 }); },
  sfx: [[31.45, 'creak'], [31.8, 'whooshUp', 1], [31.95, 'pop', 1], [32.3, 'sparkle'], [32.6, 'bling']] });
// ---- 22 · "…für noch mal eine halbe Million." — Kevin shows off the watch on his wrist, the account rolls down
S(33.28, { tr: 'zoomIn', cam: CLOSE(33.28, 34.83),
  draw() { setVice({ blur: 12 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[33.28, 'idle'], [33.4, 'raiseR', 0.2]], emo: [[0, 'smug']], look: [0.5, -0.5], extras: KS2, holdR: () => diamondRolex(0, 10, 0.2, TT) }); },
  ui() { hudKevin(); priceTag(330, 620, springEase(TT - 33.98, 280, 12) * 0.8, '500.000 €', 0.08); },
  sfx: [[33.3, 'swish', 1], [33.5, 'bling'], [33.98, 'cashReg'], [34.3, 'coinTicks', 1, 3]] });

// =====================================================================  JONAS PLAYS
// ---- 23 · "Jonas dagegen klebt am Controller." — at his TV, headset on, thumbs flying
S(34.83, { tr: 'whipL', cam: [[34.83, 540, 1120, 1.25], [36.93, 540, 1140, 1.35]],
  draw() { setGamerRoom({ dark: 0.25 }); gameTV(540, 700, 680, 390, (x, y, w, h) => gameNeonStreet(x, y, w, h)); char('jonas', 540, 1620, 0.85, { pose: [[0, 'holdBoth']], emo: [[0, 'happy']], look: [0, -0.6], extras: { glasses: true, headset: 1 }, holdR: () => gamepad(-60, -20, 0.22, 0, Math.floor(TT * 9) % 4) }); },
  ui() { info('KLEBT AM CONTROLLER 🎮', 35.8, { y: 330, bg: PAL.blue, size: 50 }); },
  sfx: [[34.9, 'click'], [35.3, 'click'], [35.8, 'pop', 1], [36.2, 'click'], [36.5, 'typing', 0.4]] });
// ---- 24 · "Er ist der Einzige in ganz Vice City." — in the game: an empty neon street, one player
S(36.93, { tr: 'zoomIn', tense: 1, cam: [[36.93, 540, 960, 1.0], [39.14, 540, 960, 1.08]],
  draw() { gameTV(540, 960, 980, 1400, (x, y, w, h) => { gameNeonStreet(x, y, w, h, 0.62); jasonHuman(540, y + h * 0.9, 1.1); }); },
  ui() { sticker('SPIELER ONLINE: 1', 540, 400, 37.1, { bg: '#0c0820', fg: '#41f08a', size: 50 }); info('NUR ER 👑', 37.5, { y: 540, bg: PAL.pink, size: 54, rot: 0.04 }); },
  sfx: [[37.1, 'beep'], [37.5, 'pop', 1], [38.44, 'bling'], [38.7, 'crickets', 0.5]] });
// ---- 25 · "Und sein Konto wächst jeden Tag um…" — the day pages flip faster and faster
const FLIPS = Array.from({ length: 6 }, (_, k) => 39.2 + k * 0.24);
S(39.14, { tr: 'whipR', cam: [[39.14, 540, 960, 1.0], [40.7, 540, 940, 1.1]],
  draw() { rays('#0e8a45', '#14a956', { cy: 940, spin: 0.4 }); const n = FLIPS.filter((t) => TT > t).length; calendarPage(540, 960, 1.1, 'TAG', 1 + n, clamp(((TT - 39.2) % 0.24) / 0.12)); },
  ui() { info('JEDEN TAG…', 39.3, { y: 360, bg: '#141026', size: 56 }); FLIPS.forEach((t, k) => popText('+100.000 €', 300 + (k % 2) * 480, 1280, t + 0.1, 52, '#a6f0b4', (k % 2 ? 0.08 : -0.08), 160)); },
  sfx: [...FLIPS.map((t) => [t, 'flip']), [39.3, 'pop', 1], [39.6, 'clockSpin', 0.8]] });
// ---- 26 · "100.000 Euro." — his phone: the deposit notification, cash rains
S(40.7, { tr: 'zoomIn', cam: [[40.7, 540, 960, 1.0], [42.37, 540, 940, 1.1]], punch: [[41.0, 0.1]],
  draw() { rays('#1d48b8', '#2f6df6', { cy: 900, spin: 0.25 }); const k = springEase(TT - 40.75, 240, 13); ctx.save(); ctx.translate(540, 1000); ctx.scale(k, k); phone(0, 0, 1.6, 0, () => { ctx.fillStyle = '#0e1a2e'; ctx.fillRect(-84, -176, 168, 352); fillRR(-74, -120, 148, 70, 12, '#26a24c'); tText('+100.000 €', 0, -84, 26, { color: '#fff', shadow: false, maxW: 140 }); tText('EINGANG', 0, -30, 18, { color: '#9fb4d8', shadow: false }); }); ctx.restore(); cash('d26', 41.0, 22); },
  ui() { popText('+100.000 €', 540, 420, 41.0, 110, '#41f08a', -0.04, 0); },
  sfx: [[40.75, 'notify'], [41.0, 'cashReg'], [41.05, 'moneyRain'], [41.84, 'ding']] });
// ---- 27 · "Bester Job der Welt!" — Jonas cheers, gamepad high, confetti
S(42.37, { tr: 'cut', cam: CLOSEJ(42.37, 43.86), punch: [[42.9, 0.08]],
  draw() { setGamerRoom({ blur: 8 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[42.37, 'holdR'], [42.5, 'cheer', 0.15]], emo: [[0, 'laugh']], jump: [[42.37, 0], [42.6, 80, 0.15], [42.85, 0, 0.15]], extras: { glasses: true, headset: 1 } }); confetti('c27', 42.5, 40); },
  ui() { popText('BESTER JOB DER WELT! 🏆', 540, 380, 42.45, 64, PAL.yellow, -0.04, 0); },
  sfx: [[42.45, 'pop', 1], [42.5, 'applause', 0.6], [42.9, 'sparkle']] });
// ---- 28 · "Nach nur zehn Tagen ist er schon Millionär." — the pages race to day 10, the MILLIONÄR stamp
S(43.86, { tr: 'whipL', tense: 1, cam: [[43.86, 540, 960, 1.0], [46.15, 540, 930, 1.12]], punch: [[45.44, 0.1]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); const d = Math.min(10, 1 + Math.floor(clamp((TT - 43.95) / 1.0) * 9.99)); calendarPage(540, 960, 1.15, 'TAG', d, TT < 44.95 ? ((TT * 10) % 1) : 0);
    if (TT > 45.44) { const k = springEase(TT - 45.44, 300, 10); ctx.save(); ctx.translate(540, 1000); ctx.rotate(-0.15); ctx.scale(1.6 - 0.6 * k, 1.6 - 0.6 * k); ctx.globalAlpha = clamp((TT - 45.44) / 0.1); ctx.lineWidth = 16; ctx.strokeStyle = '#26c25a'; rrPath(-380, -90, 760, 180, 24); ctx.stroke(); tText('MILLIONÄR ✓', 0, 4, 100, { color: '#26c25a', shadow: false }); ctx.restore(); } },
  ui() { info('NACH NUR 10 TAGEN', 43.9, { y: 340, bg: '#141026', size: 56 }); },
  sfx: [[43.9, 'pop', 1], [44.0, 'clockSpin', 1.2], [45.44, 'stamp'], [45.5, 'cashCannon']] });
// ---- 29 · "Und er steht nicht mal zum Essen auf." — a pizza slice flies into his mouth, he never looks away
S(46.15, { tr: 'whipR', cam: [[46.15, 540, 1060, 1.3], [47.97, 540, 1040, 1.4]],
  draw() { setGamerRoom({ dark: 0.3, blur: 4 }); gameTV(540, 650, 640, 360, (x, y, w, h) => gameNeonStreet(x, y, w, h)); char('jonas', 540, 1650, 0.85, { pose: [[0, 'holdBoth']], emo: [[46.15, 'happy'], [46.9, 'grin']], look: [0, -0.6], extras: { glasses: true, headset: 1 }, holdR: () => gamepad(-60, -20, 0.22, 0, Math.floor(TT * 9) % 4) });
    pizzaBox(860, 1640, 0.6); const u = clamp((TT - 46.4) / 0.5); if (u < 1) { ctx.save(); ctx.translate(lerp(860, 560, u), lerp(1500, 1020, u) - Math.sin(u * Math.PI) * 220); ctx.rotate(u * 6); poly([[-40, -30], [40, -30], [0, 60]], '#f2c94c'); fillRR(-44, -40, 88, 18, 8, '#d98f3a'); circ(-10, -6, 9, '#c0392b'); circ(12, 12, 8, '#c0392b'); ctx.restore(); } },
  ui() { info('NICHT MAL ZUM ESSEN 🍕', 46.52, { y: 330, bg: PAL.orange, size: 50 }); },
  sfx: [[46.4, 'whoosh', 1.3], [46.9, 'crunch'], [47.3, 'gulp'], [47.6, 'click']] });

// =====================================================================  SIX MONTHS LATER: the surprise visit
// ---- 30 · "Sechs Monate später"
S(47.97, { tr: 'iris', cam: [[47.97, 540, 960, 1.0], [49.06, 540, 940, 1.1]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); const k = springEase(TT - 47.99, 220, 13); ctx.save(); ctx.translate(540, 980); ctx.scale(k, k); calendarPage(0, 0, 1.25, 'MONATE', 6); ctx.restore(); },
  ui() { info('6 MONATE SPÄTER', 48.05, { y: 360, bg: PAL.orange, size: 62 }); },
  sfx: [[48.05, 'pop', 1], [48.1, 'clockSpin', 0.8]] });
// ---- 31 · "platzt Kevin ohne Klopfen in Jonas' Wohnung." — the door bursts open, Kevin in the doorway
S(49.06, { tr: 'cut', lift: 120, cam: [[49.06, 540, 1150, 1.0], [51.42, 540, 1120, 1.1]], shake: [[49.5, 22, 0.45]], punch: [[49.5, 0.1]],
  draw() { setLeoRoom({ blur: 2 }); const op = EZ.o3(clamp((TT - 49.45) / 0.18)); door(540, FLOOR, 1.1, op);
    if (op > 0.3) { ctx.save(); ctx.beginPath(); ctx.rect(540 - 180, FLOOR - 770, 360, 770); ctx.clip(); char('kevin', 540, FLOOR + 10, 0.88, { pose: [[49.4, 'slamR'], [50.0, 'armsUp', 0.3]], emo: [[49.4, 'angry'], [50.0, 'grin']], walk: [[49.5, 0.8], [50.3, 0, 0.3]], extras: KS2 }); ctx.restore(); }
    impactLines(540, 1100, 200, 520, 14, 49.5); },
  ui() { info('OHNE ZU KLOPFEN! 🚪', 49.98, { y: 360, bg: PAL.red, size: 52 }); },
  sfx: [[49.1, 'footsteps', 1.6], [49.5, 'doorSlam'], [49.52, 'impact'], [49.98, 'pop', 1]] });
// ---- 32 · "Pizzakartons, leere Energydrinks," — the floor: boxes pile up, cans roll in
const BOX = [51.45, 51.7, 51.95], CAN = [52.75, 52.95, 53.12];
S(51.42, { tr: 'whipL', lift: 0, cam: [[51.42, 520, 1330, 1.12], [53.3, 600, 1320, 1.18]],
  draw() { setGamerRoom({ blur: 5, dark: 0.35 }); ctx.fillStyle = '#1b1030'; ctx.fillRect(-600, 1380, 2300, 900);
    BOX.forEach((t, i) => { if (TT < t) return; const k = springEase(TT - t, 260, 12), y = lerp(700, 1500 - i * 95, EZ.o3(clamp((TT - t) / 0.25))); ctx.save(); ctx.translate(360 + (i % 2) * 30, y); ctx.rotate((i - 1) * 0.07); ctx.scale(k, k); pizzaBox(0, 0, 1.0); ctx.restore(); });
    CAN.forEach((t, i) => { if (TT < t) return; const u = EZ.o3(clamp((TT - t) / 0.5)); energyCan(lerp(1400, 640 + i * 150, u), 1520 + (i % 2) * 40, 1.0, Math.PI / 2 + u * 8, ['#41f08a', '#ff4fa3', '#52b8ff'][i], 1); }); },
  ui() { info('PIZZAKARTONS 🍕', 51.5, { y: 360, bg: PAL.orange, size: 50 }); if (TT > 52.73) info('LEERE ENERGYDRINKS 🥫', 52.75, { y: 490, bg: PAL.green, size: 46, rot: 0.03 }); },
  sfx: [...BOX.map((t) => [t + 0.2, 'thud']), ...CAN.map((t) => [t, 'coinBounce', 0.6]), [52.75, 'crumple']] });
// ---- 33 · "überall Kabel." — Kevin steps over the cable jungle and nearly falls
S(53.3, { tr: 'cut', lift: 0, cam: [[53.3, 540, 1250, 1.2], [54.88, 540, 1230, 1.28]],
  draw() { setGamerRoom({ blur: 5, dark: 0.35 }); char('kevin', 540, 1560, 0.85, { pose: [[53.3, 'idle'], [53.8, 'armsUp', 0.15]], emo: [[53.3, 'confused'], [53.8, 'shock']], lean: [[53.3, 0], [53.8, 0.18, 0.15], [54.4, -0.05, 0.2]], extras: KS2 }); cables('c33', -60, 1380, 1200, 240, 11); },
  ui() { info('ÜBERALL KABEL 🔌', 54.0, { y: 360, bg: PAL.blue, size: 52 }); },
  sfx: [[53.4, 'footsteps', 1.2], [53.8, 'squeak'], [54.0, 'pop', 1], [54.4, 'thud']] });
// ---- 34 · "Bruder, hier riecht's nach Pizza und Verlierer!" — Kevin holds his nose, green stink lines
S(54.88, { tr: 'zoomIn', cam: CLOSE(54.88, 57.26),
  draw() { setGamerRoom({ blur: 10, dark: 0.3 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[54.88, 'facepalm'], [56.4, 'pointR', 0.2]], emo: [[54.88, 'confused'], [56.4, 'smug']], tilt: [[54.88, 0], [55.4, -0.08]], extras: KS2 }); stinkLines(240, 1150, 1.2); stinkLines(840, 1200, 1.0); },
  ui() { popText('PIZZA & VERLIERER 🤢', 540, 380, 56.53, 70, '#8fd14f', -0.04, 0); },
  sfx: [[55.0, 'breath'], [55.49, 'swish', 0.8], [56.53, 'pop', 1], [56.6, 'sadTrombone', 0.6]] });
// ---- 35 · "Falsch!" — Jonas, wagging his finger, grinning
S(57.26, { tr: 'whipR', cam: CLOSEJ(57.26, 58.02), punch: [[57.3, 0.1]],
  draw() { setGamerRoom({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[57.26, 'pointUpR']], emo: [[0, 'grin']], tilt: [[57.26, 0], [57.5, Math.sin(TT * 18) * 0.06]], extras: { glasses: true, headset: 1 } }); },
  ui() { popText('FALSCH! ☝️', 540, 380, 57.3, 100, PAL.red, -0.04, 0); },
  sfx: [[57.3, 'errorBuzz'], [57.32, 'pop', 1]] });
// ---- 36 · "Hier riecht's nach Geld!" — he laughs, notes burst out of the screen
S(58.02, { tr: 'cut', cam: [[58.02, 540, 1080, 1.25], [59.21, 540, 1060, 1.35]],
  draw() { setGamerRoom({ blur: 4 }); gameTV(540, 650, 640, 360, (x, y, w, h) => gameBank(x, y, w, h)); char('jonas', 540, 1650, 0.85, { pose: [[0, 'cheer']], emo: [[0, 'laugh']], extras: { glasses: true, headset: 1 } }); billRain('j36', 58.3, 24, { burst: [540, 700], spread: 0.4 }); },
  ui() { popText('NACH GELD! 💸', 540, 380, 58.83, 90, '#41f08a', -0.04, 0); },
  sfx: [[58.3, 'cashCannon'], [58.83, 'pop', 1], [58.9, 'moneyRain']] });

// =====================================================================  THE HARBOUR: one decision
// ---- 37 · "Im Hafen hält ihm ein Verkäufer den Schlüssel hin:" — the seller in a suit holds out the key
S(59.21, { tr: 'slide', lift: 200, cam: [[59.21, 540, 1150, 1.0], [61.59, 540, 1120, 1.08]],
  draw() { setHarbor(); yacht(540, 1260, 0.9); char('kevin', 290, FLOOR + 40, 0.82, { emo: [[59.21, 'smug'], [60.9, 'love']], look: [0.6, 0], extras: KS2 });
    char('seller', 790, FLOOR + 40, 0.82, { pose: [[59.21, 'idle'], [60.6, 'offerR', 0.3]], emo: [[0, 'happy']], look: [-0.6, 0], flip: 1, holdR: () => yachtKey(0, -20, 0.5, Math.sin(TT * 4) * 0.2) }); },
  ui() { info('IM HAFEN ⚓', 59.37, { y: 360, bg: PAL.blue, size: 56 }); },
  sfx: [[59.3, 'waves', 0.8], [59.37, 'pop', 1], [59.8, 'shipHorn', 0.5], [60.92, 'keys'], [61.0, 'birds', 0.6]] });
// ---- 38 · "eine Yacht für 2 Millionen." — the yacht, big and shining, the price; Kevin's account above it
S(61.59, { tr: 'zoomIn', tense: 1, cam: [[61.59, 540, 1100, 1.0], [63.56, 540, 1080, 1.1]],
  draw() { setHarbor({ blur: 3 }); glow(540, 1200, 600, '#ffffff', 0.25); yacht(540, 1320 + Math.sin(TT * 2) * 10, 2.0); twinkles('y38', 200, 1000, 700, 260, 7, { s: 30 }); priceTag(560, 820, springEase(TT - 62.51, 280, 12), '2 MIO. €', -0.08, PAL.yellow); },
  ui() { hud('KONTO · KEVIN', [[0, 37e6]], {}); info('YACHT 🛥️', 62.05, { y: 470, bg: PAL.blue, size: 56 }); },
  sfx: [[61.65, 'shipHorn'], [62.05, 'pop', 1], [62.51, 'cashReg'], [62.9, 'sparkle']] });
// ---- 39 · "Kevin zückt schon die Karte…" — he pulls out his black card (slow push, heartbeat)
S(63.56, { tr: 'cut', tense: 1, cam: [[63.56, 540, 1000, 1.65], [65.0, 540, 980, 1.85]],
  draw() { setHarbor({ blur: 12 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[63.56, 'idle'], [63.95, 'offerR', 0.3]], emo: [[63.56, 'smug'], [64.5, 'grin']], look: [0.3, 0.2], extras: KS2, holdR: () => creditCard(0, -20, 0.6, -0.3) }); },
  ui() { info('KAUFEN? 💳', 64.0, { y: 380, bg: PAL.yellow, fg: '#1b1530', size: 58 }); },
  sfx: [[63.95, 'cardIn'], [64.0, 'pop', 1], [64.2, 'heartbeat', 1.4]] });
// ---- 40 · "doch dann hört er Jonas' Lachen im Kopf." — he freezes; a thought bubble: Jonas laughing, "HAHA" echoes
S(65.0, { tr: 'glitch', tense: 1, cam: [[65.0, 540, 1000, 1.25], [67.15, 540, 960, 1.35]],
  draw() { setHarbor({ blur: 12 }); ctx.save(); ctx.fillStyle = 'rgba(20,10,40,0.35)'; ctx.fillRect(-600, -400, 2300, 2800); ctx.restore();
    char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'offerR']], emo: [[65.0, 'serious'], [65.7, 'shock']], extras: { ...KS2, sweat: 1 }, holdR: () => creditCard(0, -20, 0.35, -0.3) });
  },
  ui() { if (TT > 65.66) { const k = springEase(TT - 65.66, 240, 12); ctx.save(); ctx.translate(560, 560); ctx.scale(k, k); thoughtBubble(0, 0, 640, 470, () => { ctx.save(); ctx.beginPath(); ctx.roundRect(-320, -235, 640, 470, 200); ctx.clip(); char('jonas', 0, 330, 0.62, { pose: [[0, 'laughBelly']], emo: [[0, 'laugh']], extras: { glasses: true, headset: 1 }, lean: Math.sin(TT * 14) * 0.06 }); ctx.restore(); }); ctx.restore(); } for (const [t, x, y, r] of [[66.0, 190, 330, -0.2], [66.3, 900, 300, 0.2], [66.6, 880, 860, 0.1]]) popText('HAHA!', x, y, t, 70, '#ffffff', r, 30); },
  sfx: [[65.0, 'recordScratch'], [65.66, 'bubble'], [66.0, 'popHi', 1], [66.3, 'popHi', 1.2], [66.6, 'popHi', 1.4]] });
// ---- 41 · "Er steckt sie wieder ein." — the card goes back into his pocket, the seller's face falls
S(67.15, { tr: 'whipL', lift: 200, cam: [[67.15, 540, 1150, 1.05], [68.25, 540, 1130, 1.12]],
  draw() { setHarbor({ blur: 4 }); yacht(540, 1260, 0.9); char('kevin', 290, FLOOR + 40, 0.82, { pose: [[67.15, 'offerR'], [67.45, 'idle', 0.3]], emo: [[0, 'serious']], look: [0.6, 0], extras: KS2, holdR: TT < 67.45 ? () => creditCard(0, -20, 0.35, -0.3) : undefined });
    char('seller', 790, FLOOR + 40, 0.82, { pose: [[67.15, 'offerR'], [67.7, 'sad', 0.3]], emo: [[67.15, 'happy'], [67.6, 'sad']], look: [-0.6, 0], flip: 1 }); },
  ui() { info('NICHT GEKAUFT ✋', 67.5, { y: 360, bg: PAL.red, size: 54 }); },
  sfx: [[67.4, 'cardIn'], [67.5, 'pop', 1], [67.7, 'sadTrombone', 0.7]] });

// =====================================================================  ONE YEAR LATER
// ---- 42 · "Ein Jahr später"
S(68.25, { tr: 'iris', cam: [[68.25, 540, 960, 1.0], [69.04, 540, 940, 1.1]],
  draw() { rays('#5a2bd6', '#7a3cff', { cy: 900, spin: 0.3 }); const k = springEase(TT - 68.27, 220, 13); ctx.save(); ctx.translate(540, 980); ctx.scale(k, k); calendarPage(0, 0, 1.25, 'JAHR', 1); ctx.restore(); },
  ui() { info('1 JAHR SPÄTER', 68.3, { y: 360, bg: PAL.orange, size: 62 }); },
  sfx: [[68.3, 'pop', 1], [68.35, 'clockSpin', 0.8]] });
// ---- 43 · "legt Jonas den Controller weg." — slowly, the gamepad comes down onto the desk; the screen says PAUSE
S(69.04, { tr: 'zoomIn', tense: 1, cam: [[69.04, 540, 1050, 1.15], [70.72, 540, 1100, 1.3]],
  draw() { setGamerRoom({ dark: 0.35, blur: 3 }); gameTV(540, 650, 640, 360, (x, y, w, h) => { gameNeonStreet(x, y, w, h); ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(x, y, w, h); tText('PAUSE', x + w / 2, y + h / 2, 70, { color: '#fff' }); });
    fillRR(80, 1430, 920, 60, 14, '#3a2a5a'); const d = EZ.io(clamp((TT - 69.2) / 1.1)); char('jonas', 540, 1800, 1.0, { pose: [[0, 'holdBoth']], emo: [[69.04, 'calm'], [70.3, 'smug']], look: [0, 0.4], extras: { glasses: true }, holdR: d < 1 ? () => gamepad(-60, -20 + d * 60, 0.22) : undefined }); if (d >= 1) gamepad(540, 1420, 0.5); },
  ui() {},
  sfx: [[69.2, 'swish', 0.6], [70.3, 'thud'], [70.4, 'powerDown']] });
// ---- 44 · "Jetzt wird abgerechnet." — both bank statements slam on the table (slow push, vignette)
S(70.72, { tr: 'cut', tense: 1, lift: 0, cam: [[70.72, 540, 1000, 1.0], [72.27, 540, 980, 1.1]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#6a4a2a'], [1, '#4a3018']]); ctx.fillRect(-600, -400, 2300, 2700); for (let i = 0; i < 10; i++) line(-600, 200 + i * 180, 1700, 220 + i * 180, 6, 'rgba(0,0,0,0.12)');
    const a = springEase(TT - 70.8, 200, 13), b = springEase(TT - 71.2, 200, 13); statement(300, 1000 - (1 - a) * 900, 0.95, 'KEVIN', null, -0.06); statement(780, 1000 - (1 - b) * 900, 0.95, 'JONAS', null, 0.06); },
  ui() { info('ABRECHNUNG 📄', 70.8, { y: 340, bg: '#141026', size: 56 }); },
  sfx: [[70.8, 'fold'], [70.85, 'thud'], [71.2, 'fold', 1.2], [71.25, 'thud'], [71.6, 'heartbeat', 0.8]] });
// ---- 45 · "Ich hab noch 37 Millionen." — Kevin waves his statement, smug
S(72.27, { tr: 'whipL', tense: 1, cam: CLOSE(72.27, 74.09),
  draw() { setGamerRoom({ blur: 10, dark: 0.3 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[72.27, 'idle'], [72.4, 'raiseR', 0.2]], emo: [[0, 'smug']], extras: KS2, holdR: () => statement(0, -60, 0.32, 'KEVIN', 37e6, 0.1) }); if (TT > 72.74) cash('k45', 72.74, 12); },
  ui() { hud('KONTO · KEVIN', [[0, 37e6]], { t0: 72.4 }); popText('37 MILLIONEN 😎', 540, 560, 72.74, 72, PAL.yellow, -0.04, 0); },
  sfx: [[72.3, 'rustle'], [72.4, 'pop', 1], [72.74, 'cashReg'], [73.5, 'bling']] });
// ---- 46 · "Bereit, mir deinen teuersten Kauf zu schenken?" — he holds out his hand to Jonas, the gift box pops between them
S(74.09, { tr: 'cut', lift: 200, cam: [[74.09, 540, 1150, 1.05], [76.12, 540, 1130, 1.14]],
  draw() { twoShot({ pose: [[74.09, 'idle'], [74.4, 'offerR', 0.3]], emo: [[0, 'smug']], extras: KS2, lean: 0.06 }, { pose: [[0, 'armsCross']], emo: [[0, 'calm']], extras: { glasses: true, headset: 1 } }, setGamerRoom); if (TT > 75.3) { const k = springEase(TT - 75.3, 240, 12); ctx.save(); ctx.translate(540, 1100); ctx.scale(k * 0.5, k * 0.5); giftBox(0, 0, 1, clamp((TT - 75.6) / 0.3)); ctx.restore(); } },
  ui() { info('DEIN TEUERSTER KAUF? 🎁', 74.6, { y: 380, bg: PAL.pink, size: 50 }); },
  sfx: [[74.4, 'swish', 0.8], [74.6, 'pop', 1], [75.3, 'pop', 1.3], [75.6, 'sparkle']] });
// ---- 47 · "Erst rechnen, dann lachen!" — Jonas taps a calculator, grinning
S(76.12, { tr: 'whipR', cam: CLOSEJ(76.12, 77.87), punch: [[76.93, 0.08]],
  draw() { setGamerRoom({ blur: 10 }); const key = Math.floor((TT - 76.2) * 7) % 12; char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, { la: [0.16, -0.12], ra: [1.62, -3.15] }]], emo: [[76.12, 'smug'], [76.93, 'grin']], look: [0.3, 0.5], extras: { glasses: true, headset: 1 }, holdR: () => calculator(10, 30, 0.38, '???', 0, TT > 76.2 ? key : -1) }); },
  ui() { popText('ERST RECHNEN! 🧮', 540, 380, 76.15, 76, PAL.yellow, -0.04, 0); if (TT > 76.93) info('…DANN LACHEN 😏', 76.93, { y: 560, bg: PAL.blue, size: 50, rot: 0.03 }); },
  sfx: [[76.2, 'tap'], [76.35, 'tap'], [76.5, 'tap'], [76.65, 'tap'], [76.93, 'pop', 1], [77.2, 'ting']] });

// =====================================================================  THE QUESTION
// ---- 48 · Kevin: 37.000.000 € (top half) — both halves the same size; captions ride on the divider
const YD = 900;
function splitEven(top, bottom) {
  ctx.save(); ctx.beginPath(); ctx.rect(-300, -400, 1700, YD + 400); ctx.clip(); top(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-300, YD, 1700, 1500); ctx.clip(); bottom(); ctx.restore(); line(-300, YD, 1400, YD, 14, '#ffffff');
}
const kevinHalf = () => { rays('#1d48b8', '#2f6df6', { cy: 560, spin: 0.08 }); char('kevin', 350, 860, 0.56, { pose: [[0, 'hips']], emo: [[0, 'smug']], extras: KS2 }); };
const kevinIn = (t0) => { rays('#1d48b8', '#2f6df6', { cy: 560, spin: 0.08 }); const k = springEase(TT - t0, 170, 13); char('kevin', 350 - (1 - k) * 760, 860, 0.56, { pose: [[0, 'hips']], emo: [[0, 'smug']], extras: KS2, lean: (1 - k) * 0.25 }); };
const jonasHalf = (t0) => { rays('#b6302b', '#e8483c', { cy: 1220, spin: -0.08 }); const k = t0 == null ? 1 : springEase(TT - t0, 170, 13);
  char('jonas', 350, 1520 + (1 - k) * 600, 0.56, { pose: [[0, { la: [1.05, -0.35], ra: [1.05, -0.35] }]], emo: [[0, 'smug']], extras: { glasses: true, headset: 1 }, holdR: () => gamepad(0, -30, 0.36, 0.15, Math.floor(TT * 8) % 4), holdL: () => gtaCase(0, -60, 0.56, -0.12) }); };
S(77.87, { tr: 'glitch', tense: 1, capY: YD, cam: [[77.87, 540, 960, 1.0], [79.2, 540, 960, 1.02]],
  draw() { splitEven(() => { kevinIn(77.88); cash('k48', 78.2, 12); }, () => jonasHalf(77.88)); },
  ui() { hud('KONTO · KEVIN', [[0, 37e6]], { x: 775, y: 560, scale: 0.8, t0: 77.95 }); const k = springEase(TT - 78.0, 260, 14); ctx.save(); ctx.translate(775, 1230); ctx.scale(k * 0.8, k * 0.8); blurCounter(0, 0, 560, 210, 'KONTO · JONAS'); ctx.restore(); },
  sfx: [[77.9, 'pop', 1], [78.2, 'cashReg'], [78.6, 'heartbeat', 1.0]] });
// ---- 49 · …and Jonas? (bottom half: gamepad and the GTA 6 case in his hands; his total stays hidden) — cut on the question
S(79.2, { tr: 'cut', tense: 1, capY: YD, cam: [[79.2, 540, 960, 1.0], [80.5, 540, 960, 1.04]], punch: [[79.7, 0.06]],
  draw() { splitEven(() => kevinHalf(), () => jonasHalf()); },
  ui() { hud('KONTO · KEVIN', [[0, 37e6]], { x: 775, y: 560, scale: 0.8 }); { const g = TT > 79.3 && TT < 79.6 ? Math.sin(TT * 90) * 12 : 0; ctx.save(); ctx.translate(775 + g, 1230); ctx.scale(0.8 * (1 + springEase(TT - 79.25, 300, 10) * 0.0), 0.8); blurCounter(0, 0, 560, 210, 'KONTO · JONAS'); ctx.restore(); }
    info('WIE VIEL HAT JONAS? 🤔', 79.7, { y: 270, bg: PAL.yellow, fg: '#1b1530', size: 54 }); },
  sfx: [[79.25, 'pop', 1.2], [79.3, 'glitch'], [79.4, 'coinTicks', 1.4, 4], [79.7, 'pop', 1]] });
