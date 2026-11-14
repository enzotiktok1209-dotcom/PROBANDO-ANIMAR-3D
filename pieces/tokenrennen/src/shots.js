// =====================================================================
//  shots.js — Wer zuerst den Piraten-Token findet, bekommt 1 Million (DE). ~56 shots of 1.2–1.8 s on the voice (73.7 s).
//  Fake-out golden chest at the start (Jonas: only a skin), Kevin's team of four vs Jonas' 20 paid streamers,
//  Jonas bribes two friends, the last night: Kevin's chest glows gold as a streamer calls Jonas — both open — cut.
//  Ends on a direct question to the viewer (how many chests have you opened?). Own drawings only (no game art).
//  Outfits: Kevin dark green hoodie + black beanie, Jonas mustard hoodie + glasses; headsets when gaming.
// =====================================================================
Object.assign(LOOKS.kevin, { top: '#2e7d4f', topD: '#1f5c38', topL: '#4fa36f' });
Object.assign(LOOKS.jonas, { top: '#e0a800', topD: '#b08000', topL: '#ffc933' });
function popText(str, x, y, t0, size, col, rot = 0, rise = 30) { if (TT < t0) return; const k = springEase(TT - t0, 300, 12); ctx.save(); ctx.translate(x, y - (TT - t0) * rise); ctx.rotate(rot); ctx.scale(k, k); tText(str, 0, 0, size, { color: col, stroke: '#0b0912', strokeW: size * 0.2, maxW: 980 }); ctx.restore(); }
function info(str, t0, o = {}) { sticker(str, o.x ?? 540, o.y ?? 420, t0, { bg: o.bg ?? '#141026', fg: o.fg, size: o.size ?? 52, rot: o.rot ?? -0.03 }); }
const CL = (t0, t1, x = 540, z = 1.7) => [[t0, x, 1000, z], [t1, x, 980, z + 0.14]];
const WD = (t0, t1, y = 1060, z0 = 1.0, z1 = 1.12) => [[t0, 540, y, z0], [t1, 540, y - 20, z1]];
const cash = (seed, t0, n = 22, o = {}) => { if (TT > t0) billRain(seed, t0, n, { spread: 1.5, ...o }); };
const HS = { headset: 1 };
const kv = (x, y, s, T = {}) => char('kevin', x, y, s, { ...T, extras: { ...HS, ...(T.extras || {}) } });
const jn = (x, y, s, T = {}) => char('jonas', x, y, s, { ...T, extras: { glasses: true, ...(T.extras || {}) } });
const FR = [['dani', 0], ['leo', 1], ['lucia', 2]];   // Kevin's three friends
const glowFace = (x, y, col = '#ffd23f', a = 0.35) => glow(x, y, 380, col, a * (0.8 + 0.2 * Math.sin(TT * 9)));

// =====================================================================  THE HOOK
// ---- 1 · "Wer zuerst den…" — the token bursts out of a chest, "1.000.000 €" (hard punch-in on frame one)
S(0.0, { tr: 'cut', lift: 0, raise: 0, cam: [[0, 540, 960, 2.3], [0.2, 540, 960, 1.0], [1.3, 540, 950, 1.06]], shake: [[0.2, 18, 0.4]],
  draw() { rays('#6a4a00', '#d9a520', { cy: 900, spin: 0.4 }); lootChest(540, 1420, 1.1, { gold: 1, open: 0.6 }); pirateToken(540, 860 - EZ.o3(clamp(TT / 0.5)) * 80, 220, { sx: Math.cos(TT * 1.1) }); cash('h1', 0.15, 28, { burst: [540, 900] }); },
  ui() { fact('1.000.000 €', 0.2, 540, 380, { size: 104, bg: '#18a34a' }); },
  sfx: [[0.02, 'impact'], [0.2, 'cashCannon'], [0.3, 'bling']] });
// ---- 2 · "…Piraten-Token in Fortnite" — the token spins inside our own battle-royale screen
S(1.3, { tr: 'zoomIn', lift: 0, raise: 0, cam: [[1.3, 540, 960, 1.0], [2.4, 540, 950, 1.1]],
  draw() { setJonasDen({ blur: 12, sofa: 0 }); ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(-600, -400, 2300, 2800); gameScreen(540, 960, 860, 560, { label: 'TOKEN-JAGD', chests: 9 }); pirateToken(540, 960, 120, { sx: Math.cos(TT * 6), glow: 0.8 }); },
  ui() { fact('PIRATEN-TOKEN 🏴‍☠️', 1.45, 540, 420, { size: 64, bg: '#1b1530' }); },
  sfx: [[1.35, 'powerOn'], [1.45, 'stamp', 0.8], [1.9, 'sparkle']] });
// ---- 3 · "…findet, bekommt eine" — two hands reach for the token from both sides
S(2.4, { tr: 'slash', lift: 0, raise: 0, cam: [[2.4, 540, 960, 1.05], [3.59, 540, 960, 1.15]],
  draw() { setDark('#2a1a50', '#05030c'); pirateToken(540, 900, 170, { sx: Math.cos(TT * 3) }); const u = EZ.o3(clamp((TT - 2.45) / 0.8));
    for (const [sd, L] of [[-1, LOOKS.kevin], [1, LOOKS.jonas]]) { const hx = 540 + sd * lerp(700, 250, u); line(540 + sd * 900, 1200, hx, 960, 150, L.top); circ(hx, 960, 70, L.skin); for (let f = 0; f < 4; f++) fillRR(hx - sd * 60 - 12, 900 + f * 30, sd * -70, 22, 11, L.skin); } },
  ui() { info('WER IST SCHNELLER?', 2.6, { y: 420, size: 50 }); },
  sfx: [[2.45, 'whoosh', 1.2], [2.6, 'pop', 1], [3.2, 'swish', 1.3]] });
// ---- 4 · "…Million Euro." — the cash slams: 1 MILLION
S(3.59, { tr: 'flash', lift: 0, raise: 0, cam: [[3.59, 540, 980, 1.0], [4.51, 540, 970, 1.08]], shake: [[3.65, 16, 0.4]],
  draw() { rays('#0f5a2a', '#24a24c', { cy: 960, spin: 0.35 }); cashMountain(540, 1380, 1.2, clamp((TT - 3.6) / 0.4)); cash('h4', 3.6, 30); },
  ui() { fact('1 MILLION €', 3.7, 540, 420, { size: 100, bg: '#18a34a' }); },
  sfx: [[3.62, 'slam'], [3.65, 'moneyRain', 0.9]] });
// ---- 5 · "Die Chance pro Truhe:" — a beach full of chests, a magnifying glass sweeps over them
S(4.51, { tr: 'whipL', lift: 0, cam: WD(4.51, 5.97, 1080, 1.0, 1.08),
  draw() { setIsland(); for (let r = 0; r < 4; r++) for (let i = 0; i < 6; i++) lootChest(110 + i * 175 + (r % 2) * 80, 1240 + r * 120, 0.32 + r * 0.05); const mx = 200 + ((TT - 4.5) / 1.5) * 700; ctx.lineWidth = 22; ctx.strokeStyle = '#2b2b36'; ctx.beginPath(); ctx.arc(mx, 1260, 110, 0, TAU); ctx.stroke(); line(mx + 80, 1340, mx + 200, 1460, 30, '#2b2b36'); ctx.save(); ctx.globalAlpha = 0.25; circ(mx, 1260, 100, '#bfeaff'); ctx.restore(); },
  ui() { fact('CHANCE PRO TRUHE?', 4.6, 540, 420, { size: 58, bg: '#1d3fb0' }); },
  sfx: [[4.55, 'waves', 1.0], [4.6, 'pop', 1], [5.2, 'creak', 1.6]] });
// ---- 6 · "1 zu…" — the odds slam: 1 : 137.500
S(5.97, { tr: 'rgb', tense: 1, lift: 0, raise: 0, cam: [[5.97, 540, 960, 1.0], [7.4, 540, 950, 1.1]], shake: [[6.3, 16, 0.4]],
  draw() { setDark('#3a0a2a', '#05020a'); for (let i = 0; i < 70; i++) { const R = RNG('ch6', i); lootChest(R.f() * 1200 - 60, 300 + R.f() * 1400, 0.12 + R.f() * 0.08); } ctx.fillStyle = 'rgba(5,2,10,0.6)'; ctx.fillRect(-600, -400, 2300, 2800); },
  ui() { fact('1 : 137.500', 6.3, 540, 960, { size: 130, bg: '#ff2e4d', rot: -0.04 }); },
  sfx: [[6.3, 'slam'], [6.35, 'shockHit'], [6.8, 'coinTicks', 1.0, 5]] });
// ---- 7 · "…137.500." — zoom out: one golden chest among thousands
S(7.4, { tr: 'zoomOut', tense: 1, lift: 0, raise: 0, cam: [[7.4, 540, 960, 1.6], [8.6, 540, 960, 0.9]],
  draw() { setDark('#140a2a', '#020108'); for (let r = 0; r < 18; r++) for (let c = 0; c < 12; c++) { const x = -260 + c * 140, y = 120 + r * 110; lootChest(x, y, 0.16, { gold: r === 8 && c === 6 ? 1 : 0 }); } },
  sfx: [[7.45, 'whooshDown', 0.8], [8.0, 'ting']] });
// ---- 8 · (laugh) — Jonas cracks up on his sofa
S(8.6, { tr: 'push', cam: CL(8.6, 9.51, 540, 1.75),
  draw() { setJonasDen({ blur: 9 }); rimLight(540, 860, 420, '#52b8ff'); jn(540, FLOOR + 170, 1.05, { pose: [[0, 'laughBelly']], emo: [[0, 'laugh']], tilt: [[8.6, 0.06], [8.9, -0.07], [9.2, 0.05]] }); },
  ui() { popText('HAHAHA', 540, 420, 8.65, 96, '#ffe14d', -0.05, 10); },
  sfx: [[8.65, 'boing'], [9.0, 'popHi', 1.1]] });
// ---- 9 · "Ich bin der beste Fortnite-Spieler…" — Jonas in his den, headset on, points at himself, trophies behind
S(9.51, { tr: 'whipR', lift: 0, cam: WD(9.51, 11.0, 1100, 1.15, 1.25),
  draw() { setJonasDen({ blur: 3 }); rimLight(540, 900, 460, '#ff4fa3', 0.2); jn(540, FLOOR + 80, 0.95, { pose: [[0, 'pointUpR']], emo: [[0, 'smug']], extras: { headset: 1 } }); },
  ui() { info('„DER BESTE SPIELER" 😎', 9.7, { size: 50, y: 400 }); },
  sfx: [[9.6, 'swish', 1], [9.7, 'pop', 1]] });
// ---- 10 · "…der Stadt." — he lifts the trophy, the skyline behind
S(11.0, { tr: 'cut', cam: CL(11.0, 12.06, 540, 1.6),
  draw() { setJonasDen({ blur: 8 }); rimLight(540, 820, 420, '#ffd23f', 0.25); jn(540, FLOOR + 170, 1.05, { pose: [[0, 'raiseR']], emo: [[0, 'laugh']], holdR: () => { fillRR(-30, -150, 60, 90, 10, '#ffd23f'); ell(0, -160, 60, 30, '#ffd23f'); fillRR(-40, -60, 80, 20, 6, '#3a2a1a'); sparkle(20, -150, 20 * (0.5 + 0.5 * Math.sin(TT * 9)), '#fff'); } }); },
  sfx: [[11.05, 'applause', 0.8], [11.3, 'ting']] });
// ---- 11 · "Die Million gehört mir!" — shouting at the camera, cash raining
S(12.06, { tr: 'zoomIn', cam: [[12.06, 540, 990, 1.85], [13.55, 540, 975, 2.0]], punch: [[12.6, 0.07]],
  draw() { setJonasDen({ blur: 10 }); rimLight(540, 820, 420, '#41f08a', 0.22); jn(540, FLOOR + 170, 1.05, { pose: [[0, 'cheer']], emo: [[0, 'laugh']], extras: { headset: 1 } }); cash('j11', 12.1, 22); },
  ui() { popText('MEINE MILLION! 💰', 540, 420, 12.2, 72, '#41f08a', -0.04, 0); },
  sfx: [[12.2, 'cashReg'], [12.6, 'moneyRain', 0.8]] });
// ---- 12 · "Kevin grinst nur" — Kevin at his desk, calm grin (foreground keyboard)
S(13.55, { tr: 'slash', cam: CL(13.55, 14.55, 540, 1.6),
  draw() { setTeamRoom({ blur: 9 }); rimLight(540, 860, 400, '#41f08a', 0.18); kv(540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[13.55, 'calm'], [13.9, 'smug']] }); if (TT > 14.0 && TT < 14.5) sparkle(470, 940, 40, '#fff', TT * 6); deskFG(1680); },
  sfx: [[14.0, 'ting']] });
// ---- 13 · "…und rechnet:" — numbers float around his head, a calculator in hand
S(14.55, { tr: 'cut', cam: CL(14.55, 15.46, 540, 1.6),
  draw() { setTeamRoom({ blur: 9 }); kv(540, FLOOR + 170, 1.05, { pose: [[0, 'thinkR']], emo: [[0, 'serious']], look: [0.3, -0.5] }); for (const [i, t] of ['×4', '+', '%', '='].entries()) { const a = TT * 1.5 + i * 1.6; tText(t, 540 + Math.cos(a) * 260, 640 + Math.sin(a) * 90, 64, { color: '#ffe14d', stroke: '#0b0912', strokeW: 12 }); } deskFG(1680); },
  sfx: [[14.6, 'beep', 1.2], [14.8, 'beep', 1.4], [15.0, 'beep', 1.1]] });
// ---- 14 · "Wer am meisten Truhen öffnet," — a bar chart: more chests, more chance
S(15.46, { tr: 'push', lift: 0, raise: 0, cam: [[15.46, 540, 960, 1.0], [16.5, 540, 950, 1.06]],
  draw() { setDark('#1a2a50', '#05070c'); fillRR(140, 500, 800, 820, 24, '#ffffff'); tText('MEHR TRUHEN = MEHR CHANCE', 540, 580, 40, { color: '#1d2a4a', shadow: false, maxW: 740 });
    for (let i = 0; i < 4; i++) { const h = clamp((TT - 15.5 - i * 0.12) / 0.4) * (120 + i * 140); fillRR(220 + i * 180, 1220 - h, 120, h, 10, ['#9aa3b8', '#52b8ff', '#41f08a', '#ffd23f'][i]); } },
  sfx: [[15.5, 'pop', 0.9], [15.62, 'pop', 1.0], [15.74, 'pop', 1.1], [15.86, 'pop', 1.2]] });
// ---- 15 · "…gewinnt." — the trophy: GEWINNT
S(16.5, { tr: 'cut', lift: 0, raise: 0, cam: [[16.5, 540, 960, 1.0], [17.48, 540, 950, 1.08]], punch: [[16.95, 0.07]],
  draw() { rays('#8a6400', '#e8b400', { cy: 960, spin: 0.35 }); ctx.save(); ctx.translate(540, 1050); const k = springEase(TT - 16.55, 260, 12); ctx.scale(k * 2.4, k * 2.4); fillRR(-40, -150, 80, 110, 14, '#ffd23f'); ell(0, -160, 80, 40, '#ffd23f'); fillRR(-60, -40, 120, 30, 8, '#3a2a1a'); ctx.restore(); },
  ui() { fact('GEWINNT! 🏆', 16.95, 540, 420, { size: 80, bg: '#18a34a' }); },
  sfx: [[16.6, 'whooshUp', 1], [16.95, 'buzzerWin']] });
// ---- 16 · "Also legen beide los." — both at their PCs, side by side; a start gun "LOS!"
S(17.48, { tr: 'blinds', lift: 0, cam: WD(17.48, 19.06, 1080, 1.05, 1.15),
  draw() { setTeamRoom({ blur: 3 }); kv(300, FLOOR + 40, 0.85, { pose: [[0, 'holdBoth']], emo: [[0, 'serious']], look: [0.2, -0.3] }); jn(780, FLOOR + 40, 0.85, { pose: [[0, 'holdBoth']], emo: [[0, 'grin']], look: [-0.2, -0.3], extras: { headset: 1 } }); deskFG(1700, { can: 0 }); },
  ui() { fact('LOS! 🏁', 18.45, 540, 420, { size: 90, bg: '#ff2e4d' }); },
  sfx: [[17.6, 'click'], [18.45, 'startGun'], [18.8, 'gasp']] });

// =====================================================================  THE FAKE-OUT
// ---- 17 · "Und schon in der ersten Runde" — Jonas' TV: round 1, chest markers
S(19.06, { tr: 'zoomIn', lift: 0, raise: 0, cam: [[19.06, 540, 960, 1.0], [20.38, 540, 950, 1.08]],
  draw() { setJonasDen({ blur: 10 }); ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(-600, -400, 2300, 2800); gameScreen(540, 960, 900, 600, { label: 'RUNDE 1', chests: 8 }); },
  ui() { fact('RUNDE 1', 19.2, 540, 420, { size: 70, bg: '#141026' }); },
  sfx: [[19.15, 'powerOn'], [19.2, 'pop', 1], [19.8, 'footsteps', 0.5]] });
// ---- 18 · "…leuchtet bei Jonas…" — Jonas' face lit gold from the screen, jaw drops
S(20.38, { tr: 'cut', cam: [[20.38, 540, 990, 1.85], [21.3, 540, 980, 1.95]],
  draw() { setJonasDen({ blur: 10 }); ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(-600, -400, 2300, 2800); glowFace(540, 800); jn(540, FLOOR + 170, 1.05, { pose: [[0, 'holdBoth']], emo: [[0, 'shock']], extras: { headset: 1 } }); },
  sfx: [[20.4, 'gasp'], [20.5, 'choir']] });
// ---- 19 · "…eine Truhe golden!" — the golden chest with light beams
S(21.3, { tr: 'flash', lift: 0, raise: 0, cam: [[21.3, 540, 960, 1.0], [22.33, 540, 950, 1.1]], shake: [[21.35, 12, 0.4]],
  draw() { setDark('#3a2a00', '#0a0600'); lootChest(540, 1250, 1.4, { gold: 1 }); twinkles('t19', 200, 500, 680, 700, 14, { s: 28 }); },
  ui() { fact('GOLDENE TRUHE ✨', 21.4, 540, 420, { size: 64, bg: '#d9a520', fg: '#1b1530' }); },
  sfx: [[21.35, 'bling'], [21.4, 'sparkle']] });
// ---- 20 · "Ich hab ihn!" — Jonas leaps off the sofa
S(22.33, { tr: 'whipU', lift: 0, cam: WD(22.33, 23.4, 1100, 1.15, 1.22),
  draw() { setJonasDen({ blur: 4 }); jn(540, FLOOR + 80, 0.95, { pose: [[0, 'armsUp']], emo: [[0, 'laugh']], jump: [[0, 0], [22.4, 160, 0.18], [22.75, 0, 0.18], [23.0, 90, 0.15], [23.3, 0, 0.15]], extras: { headset: 1 } }); confetti('c20', 22.4, 40); },
  ui() { popText('ICH HAB IHN!!', 540, 420, 22.4, 92, '#ffe14d', -0.05, 0); },
  sfx: [[22.4, 'hop'], [22.45, 'applause', 0.6], [23.0, 'hop']] });
// ---- 21 · "Die Million gehört mir!" — he already dreams of the money: a thought cloud of cash
S(23.4, { tr: 'ink', cam: CL(23.4, 24.51, 540, 1.6),
  draw() { setJonasDen({ blur: 9 }); jn(540, FLOOR + 170, 1.05, { pose: [[0, 'cheer']], emo: [[0, 'love']] }); const k = springEase(TT - 23.5, 260, 13); ctx.save(); ctx.translate(820, 560); ctx.scale(k, k); ell(0, 0, 220, 150, '#ffffff'); circ(-170, 150, 26, '#fff'); circ(-210, 200, 16, '#fff'); cashMountain(0, 80, 0.22, 1); ctx.restore(); },
  sfx: [[23.5, 'bubble'], [23.8, 'cashReg']] });
// ---- 22 · "Er öffnet sie," — the lid lifts, light pours out
S(24.51, { tr: 'cut', tense: 1, lift: 0, raise: 0, cam: [[24.51, 540, 1000, 1.2], [25.4, 540, 990, 1.35]],
  draw() { setDark('#3a2a00', '#0a0600'); lootChest(540, 1250, 1.4, { gold: 1, open: clamp((TT - 24.6) / 0.6) }); },
  sfx: [[24.6, 'creak', 1.2], [24.9, 'heartbeat', 0.6]] });
// ---- 23 · "…und drin ist nur ein goldener Skin." — out pops a golden outfit card, not the token
S(25.4, { tr: 'zoomIn', lift: 0, raise: 0, cam: [[25.4, 540, 960, 1.0], [26.4, 540, 950, 1.06]],
  draw() { rays('#8a6400', '#e8b400', { cy: 900, spin: 0.2 }); const k = springEase(TT - 25.45, 260, 12); ctx.save(); ctx.translate(540, 980); ctx.scale(k, k); fillRR(-230, -330, 460, 640, 30, '#b86bff'); fillRR(-210, -310, 420, 600, 24, '#d9a520'); char('jason', 0, 260, 0.62, { pose: [[0, 'hips']], emo: [[0, 'smug']], extras: { look: { top: '#ffd23f', topD: '#d9a520', topL: '#fff1a6', pants: '#d9a520', pantsD: '#b8860b' } } }); tText('GOLDENER SKIN', 0, -260, 40, { color: '#1b1530', shadow: false }); ctx.restore(); },
  sfx: [[25.45, 'pop', 0.8], [25.8, 'sparkle']] });
// ---- 24 · (…Skin.) — Jonas' grin freezes
S(26.4, { tr: 'cut', cam: [[26.4, 540, 990, 1.85], [27.46, 540, 985, 1.9]],
  draw() { setJonasDen({ blur: 10 }); jn(540, FLOOR + 170, 1.05, { pose: [[0, 'holdBoth']], emo: [[26.4, 'happy'], [26.8, 'confused']], extras: { headset: 1 } }); },
  sfx: [[26.8, 'recordScratch']] });
// ---- 25 · "Kein Token." — red stamp
S(27.46, { tr: 'rgb', lift: 0, raise: 0, cam: [[27.46, 540, 960, 1.0], [28.37, 540, 950, 1.06]], shake: [[27.5, 14, 0.3]],
  draw() { setDark('#3a0a12', '#05020a'); lootChest(540, 1250, 1.2, { gold: 0.3, open: 1 }); },
  ui() { stampMark('KEIN TOKEN', 27.5, 540, 700, '#ff2e4d', 100); },
  sfx: [[27.5, 'stamp', 1.2], [27.55, 'errorBuzz']] });
// ---- 26 · "Denn nicht in jeder goldenen Truhe…" — three golden chests; question marks, only one has a token
S(28.37, { tr: 'slide', lift: 0, raise: 0, cam: [[28.37, 540, 960, 1.0], [29.6, 540, 950, 1.06]],
  draw() { setDark('#2a1a00', '#0a0600'); for (let i = 0; i < 3; i++) { lootChest(220 + i * 320, 1180, 0.7, { gold: 0.8 }); tText('?', 220 + i * 320, 880, 110, { color: '#ffe14d', stroke: '#0b0912', strokeW: 18 }); } },
  sfx: [[28.45, 'pop', 0.9], [28.65, 'pop', 1.0], [28.85, 'pop', 1.1]] });
// ---- 27 · "…steckt der Token." — two of them show a skin, one the token
S(29.6, { tr: 'cut', lift: 0, raise: 0, cam: [[29.6, 540, 960, 1.0], [30.79, 540, 950, 1.06]],
  draw() { setDark('#2a1a00', '#0a0600'); for (let i = 0; i < 3; i++) { lootChest(220 + i * 320, 1180, 0.7, { gold: 0.8, open: 1 }); if (i === 2) pirateToken(220 + i * 320, 880, 80, { sx: Math.cos(TT * 5) }); else { fillRR(220 + i * 320 - 60, 800, 120, 160, 14, '#d9a520'); tText('SKIN', 220 + i * 320, 880, 30, { color: '#1b1530', shadow: false }); } } },
  ui() { fact('NUR 1 VON 137.500', 30.0, 540, 420, { size: 56, bg: '#ff2e4d' }); },
  sfx: [[29.7, 'creak', 1.4], [30.0, 'ding']] });

// =====================================================================  THE TEAMS
// ---- 28 · "Kevin holt sich drei Freunde…" — the door opens, three friends walk in
S(30.79, { tr: 'whipL', lift: 0, cam: WD(30.79, 31.7, 1080, 1.0, 1.06),
  draw() { setTeamRoom({ blur: 2 }); FR.forEach(([id, i]) => char(id, lerp(-200, 520 + i * 200, EZ.o2(clamp((TT - 30.85 - i * 0.12) / 0.7))), FLOOR + 40, 0.8, { walk: TT < 31.6 ? 1 : 0, emo: [[0, 'happy']], extras: HS })); kv(200, FLOOR + 40, 0.85, { pose: [[0, 'waveR']], emo: [[0, 'grin']] }); },
  ui() { info('3 FREUNDE 🤝', 30.9, { size: 54 }); },
  sfx: [[30.85, 'doorbell'], [30.9, 'footsteps', 0.9]] });
// ---- 29 · "…ins Team." — a team photo: TEAM KEVIN
S(31.7, { tr: 'flash', lift: 0, cam: WD(31.7, 32.7, 1100, 1.15, 1.2),
  draw() { setTeamRoom({ blur: 4 }); [['dani', 220], ['kevin', 420], ['leo', 640], ['lucia', 860]].forEach(([id, x]) => char(id, x, FLOOR + 60, 0.78, { pose: [[0, 'cheer']], emo: [[0, 'laugh']], extras: HS })); },
  ui() { fact('TEAM KEVIN 💚', 31.8, 540, 420, { size: 70, bg: '#2e7d4f' }); },
  sfx: [[31.72, 'shutter'], [31.8, 'pop', 1]] });
// ---- 30 · "Vier Leute," — four at the desks, keys flying
S(32.7, { tr: 'push', lift: 0, cam: WD(32.7, 33.8, 1060, 1.0, 1.08),
  draw() { setTeamRoom(); [['kevin', 140], ['dani', 407], ['leo', 674], ['lucia', 941]].forEach(([id, x]) => char(id, x, 1430, 0.56, { pose: [[0, 'holdBoth']], emo: [[0, 'serious']], extras: HS })); },
  ui() { fact('4 LEUTE', 32.8, 540, 420, { size: 74, bg: '#141026' }); },
  sfx: [[32.75, 'typing', 1.0], [32.8, 'pop', 1]] });
// ---- 31 · "…viermal so viele Truhen." — a counter ×4
S(33.8, { tr: 'cut', lift: 0, raise: 0, cam: [[33.8, 540, 960, 1.0], [34.81, 540, 950, 1.08]], punch: [[34.2, 0.07]],
  draw() { setDark('#1a2a50', '#05070c'); for (let i = 0; i < 4; i++) lootChest(200 + i * 230, 1250, 0.55, { open: clamp((TT - 33.9 - i * 0.1) / 0.3) }); },
  ui() { fact('× 4 TRUHEN', 34.2, 540, 420, { size: 92, bg: '#18a34a' }); },
  sfx: [[33.9, 'creak', 1.6], [34.2, 'stamp']] });
// ---- 32 · "Doch Jonas hat eine bessere Idee:" — Jonas on his sofa, a sly grin, a lightbulb
S(34.81, { tr: 'glitch', tense: 1, cam: CL(34.81, 35.8, 540, 1.6),
  draw() { setJonasDen({ blur: 9 }); ctx.fillStyle = 'rgba(30,0,40,0.3)'; ctx.fillRect(-600, -400, 2300, 2800); jn(540, FLOOR + 170, 1.05, { pose: [[0, 'holdBoth']], emo: [[0, 'smug']] }); },
  sfx: [[34.85, 'dun'], [35.3, 'tension', 0.5]] });
// ---- 33 · (…Idee:) — a lightbulb pops on above his head
S(35.8, { tr: 'cut', cam: CL(35.8, 36.71, 540, 1.75),
  draw() { setJonasDen({ blur: 9 }); jn(540, FLOOR + 170, 1.05, { pose: [[0, 'pointUpR']], emo: [[0, 'grin']] }); const k = springEase(TT - 35.9, 300, 12); ctx.save(); ctx.translate(540, 470); ctx.scale(k, k); glow(0, 0, 160, '#ffe14d', 0.6); circ(0, 0, 60, '#ffe14d'); fillRR(-26, 50, 52, 40, 8, '#c0c6d6'); ctx.restore(); },
  sfx: [[35.9, 'ding']] });
// ---- 34 · "Er bezahlt 20 Streamer" — the wall of 20 live webcams pops in tile by tile
S(36.71, { tr: 'blinds', lift: 0, raise: 0, cam: [[36.71, 540, 960, 1.0], [38.53, 540, 950, 1.05]],
  draw() { setDark('#140a2a', '#020108'); streamerWall(540, 960, 4, 5, 230, 250, 18, 20, { t0: 36.75, stagger: 0.05 }); },
  ui() { fact('20 STREAMER 🎥', 37.4, 540, 300, { size: 64, bg: '#7b3fe4' }); },
  sfx: [[36.8, 'liveOn'], [37.0, 'pop', 1.2], [37.4, 'stamp', 0.8]] });
// ---- 35 · "…mit je 500 Euro," — "+500 €" flies into every tile
S(38.53, { tr: 'cut', lift: 0, raise: 0, cam: [[38.53, 540, 960, 1.0], [39.66, 540, 950, 1.06]],
  draw() { setDark('#140a2a', '#020108'); streamerWall(540, 960, 4, 5, 230, 250, 18, 20); for (let k = 0; k < 20; k++) { const t0 = 38.6 + k * 0.04, u = clamp((TT - t0) / 0.6); if (u > 0 && u < 1) { const c = k % 4, r = Math.floor(k / 4); ctx.save(); ctx.globalAlpha = 1 - u; tText('+500 €', 540 + (c - 1.5) * 248, 960 + (r - 2) * 268 - u * 120, 40, { color: '#41f08a', stroke: '#06180c', strokeW: 8 }); ctx.restore(); } } },
  ui() { fact('JE 500 € 💸', 38.6, 540, 300, { size: 64, bg: '#18a34a' }); },
  sfx: [[38.6, 'cashReg'], [38.7, 'coinTicks', 0.8, 6]] });
// ---- 36 · "…damit sie für ihn suchen." — every streamer opens chests (tiny chests pop in the tiles)
S(39.66, { tr: 'zoomIn', lift: 0, raise: 0, cam: [[39.66, 540, 960, 1.05], [40.95, 540, 950, 1.12]],
  draw() { setDark('#140a2a', '#020108'); streamerWall(540, 960, 4, 5, 230, 250, 18, 20); for (let k = 0; k < 20; k++) { const c = k % 4, r = Math.floor(k / 4), ph = (TT * 2 + k * 0.37) % 1; lootChest(540 + (c - 1.5) * 248 + 70, 960 + (r - 2) * 268 + 90, 0.12, { open: ph }); } },
  sfx: [[39.7, 'creak', 1.8], [40.1, 'creak', 1.5], [40.5, 'creak', 1.7]] });
// ---- 37 · "Er selbst öffnet keine einzige Truhe mehr" — controller on the table, feet up
S(40.95, { tr: 'whipR', lift: 0, cam: WD(40.95, 42.6, 1100, 1.15, 1.22),
  draw() { setJonasDen({ blur: 3 }); jn(540, FLOOR + 30, 0.9, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], lean: -0.12 }); gamepad ? gamepad(780, 1520, 0.5) : null; },
  ui() { fact('0 TRUHEN 😎', 41.2, 540, 420, { size: 70, bg: '#141026' }); },
  sfx: [[41.0, 'swish', 0.8], [41.2, 'pop', 1], [41.8, 'breath']] });
// ---- 38 · "…und schaut nur noch zu." — popcorn, watching the 20 streams on his TV
S(42.6, { tr: 'slide', cam: CL(42.6, 44.27, 540, 1.55),
  draw() { setJonasDen({ blur: 7 }); glowFace(540, 800, '#52b8ff', 0.25); jn(540, FLOOR + 170, 1.05, { pose: [[0, 'holdR'], [43.2, 'drinkR', 0.15], [43.6, 'holdR', 0.15]], emo: [[0, 'happy']], holdL: () => popcorn(0, 60, 0.45) }); },
  ui() { info('NUR ZUSCHAUEN 🍿', 42.7, { size: 52 }); },
  sfx: [[42.7, 'pop', 1], [43.2, 'crunch'], [43.8, 'crunch']] });

// =====================================================================  ONE WEEK
// ---- 39 · "Nach einer Woche" — the calendar flips to day 7
S(44.27, { tr: 'iris', lift: 0, raise: 0, cam: [[44.27, 540, 960, 1.0], [45.6, 540, 950, 1.08]],
  draw() { rays('#2a2060', '#3a2a8a', { cy: 960, spin: 0.25 }); const d = Math.min(7, 1 + Math.floor(clamp((TT - 44.3) / 0.9) * 7)); ctx.save(); ctx.translate(540, 1000); calendarPage(0, 0, 1.3, 'TAG', d); ctx.restore(); },
  ui() { fact('1 WOCHE SPÄTER', 44.4, 540, 380, { size: 58, bg: '#ff9a3c', fg: '#1b1530' }); },
  sfx: [[44.3, 'flip'], [44.5, 'flip', 1.1], [44.7, 'flip', 1.2], [44.9, 'flip', 1.3], [45.1, 'ding']] });
// ---- 40 · "…hat Kevins Team…" — the team at night, tired, cans everywhere
S(45.6, { tr: 'cut', lift: 0, cam: WD(45.6, 46.8, 1060, 1.05, 1.1),
  draw() { setTeamRoom({ night: 1 }); [['kevin', 140], ['dani', 407], ['leo', 674], ['lucia', 941]].forEach(([id, x]) => char(id, x, 1430, 0.56, { pose: [[0, 'holdBoth']], emo: [[0, 'sleepy']], extras: HS })); for (let i = 0; i < 9; i++) energyCan(60 + i * 120, 935, 0.5, 0, ['#41f08a', '#ff4fa3', '#52b8ff'][i % 3]); },
  sfx: [[45.7, 'crickets'], [46.2, 'canOpen']] });
// ---- 41 · "…schon 40.000 Truhen geöffnet." — the counter slams 40.000
S(46.8, { tr: 'flash', lift: 0, raise: 0, cam: [[46.8, 540, 960, 1.0], [48.07, 540, 950, 1.08]], shake: [[47.1, 14, 0.4]],
  draw() { rays('#0f5a2a', '#24a24c', { cy: 960, spin: 0.3 }); chestCounter(540, 960, 1.5, lerp(28000, 40000, EZ.o3(clamp((TT - 46.85) / 0.4)))); },
  ui() { fact('40.000 TRUHEN 📦', 47.2, 540, 1300, { size: 64, bg: '#2e7d4f' }); },
  sfx: [[46.85, 'coinTicks', 0.4, 6], [47.1, 'slam'], [47.2, 'bling']] });

// =====================================================================  THE BRIBE
// ---- 42 · "Jonas wird nervös" — sweat, biting his nails, Kevin's counter on his TV
S(48.07, { tr: 'rgb', tense: 1, cam: CL(48.07, 49.24, 540, 1.7),
  draw() { setJonasDen({ blur: 9, tvLabel: 'KEVIN: 40.000' }); jn(540, FLOOR + 170, 1.05, { pose: [[0, 'thinkR']], emo: [[0, 'scared']], extras: { sweat: 1 } }); },
  sfx: [[48.1, 'gulp'], [48.5, 'heartbeat', 0.7]] });
// ---- 43 · "…und bietet Kevins Freunden heimlich je 1.000 Euro," — whispering into his phone, envelopes
S(49.24, { tr: 'slash', lift: 0, cam: WD(49.24, 51.13, 1100, 1.15, 1.22),
  draw() { setJonasDen({ blur: 4 }); ctx.fillStyle = 'rgba(30,0,40,0.35)'; ctx.fillRect(-600, -400, 2300, 2800); jn(360, FLOOR + 80, 0.95, { pose: [[0, 'phoneR']], emo: [[0, 'smug']], look: [0.5, 0] }); for (let i = 0; i < 3; i++) { const k = springEase(TT - 49.6 - i * 0.25, 260, 13); if (TT > 49.6 + i * 0.25) envelope(800, 700 + i * 260, 0.7 * k, '1.000 €', -0.1 + i * 0.08); } },
  ui() { info('HEIMLICH… 🤫', 49.3, { size: 52 }); },
  sfx: [[49.3, 'pizzSneak'], [49.6, 'rustle'], [49.85, 'rustle'], [50.1, 'rustle']] });
// ---- 44 · "…damit sie aufhören." — the friends read the offer on their phones
S(51.13, { tr: 'push', lift: 0, cam: WD(51.13, 53.11, 1080, 1.05, 1.12),
  draw() { setTeamRoom({ night: 1, blur: 3 }); FR.forEach(([id, i]) => char(id, 300 + i * 240, FLOOR + 40, 0.8, { pose: [[0, 'phoneR']], emo: [[0, i === 2 ? 'serious' : 'confused']], extras: HS, holdR: () => phone(0, -30, 0.3, 0.15, () => { ctx.fillStyle = '#075e54'; ctx.fillRect(-84, -176, 168, 352); tText('1.000 €', 0, 0, 28, { color: '#fff', shadow: false }); tText('HÖR AUF!', 0, 40, 18, { color: '#ffe14d', shadow: false }); }) })); },
  ui() { fact('1.000 € FÜRS AUFHÖREN', 51.3, 540, 420, { size: 54, bg: '#ff2e4d' }); },
  sfx: [[51.2, 'notify'], [51.4, 'notify'], [51.6, 'notify']] });
// ---- 45 · "Zwei von ihnen sagen sofort ja." — two take the envelope and leave
S(53.11, { tr: 'whipL', lift: 0, cam: WD(53.11, 55.48, 1080, 1.05, 1.1),
  draw() { setTeamRoom({ night: 1, blur: 2 }); char('lucia', 170, FLOOR + 40, 0.8, { pose: [[0, 'armsCross']], emo: [[0, 'serious']], extras: HS }); kv(390, FLOOR + 40, 0.82, { emo: [[53.11, 'shock'], [54.6, 'sad']], look: [0.6, 0] });
    [['dani', 0], ['leo', 1]].forEach(([id, i]) => char(id, lerp(640 + i * 210, 1400 + i * 210, EZ.i3(clamp((TT - 53.7) / 1.3))), FLOOR + 40, 0.8, { walk: TT > 53.7 ? 1 : 0, emo: [[0, 'grin']], holdR: () => envelope(0, 0, 0.2, '') })); },
  ui() { fact('2 × JA 😬', 53.3, 540, 420, { size: 74, bg: '#ff2e4d' }); },
  sfx: [[53.3, 'stamp'], [53.8, 'footsteps', 1.0], [54.8, 'doorSlam'], [55.1, 'breath']] });

// =====================================================================  THE LAST NIGHT
// ---- 46 · "Jetzt steht Kevin nur noch mit einem Freund da." — two empty chairs
S(55.48, { tr: 'iris', lift: 0, cam: WD(55.48, 57.61, 1080, 1.05, 1.12),
  draw() { setTeamRoom({ night: 1 }); kv(140, 1430, 0.56, { pose: [[0, 'holdBoth']], emo: [[0, 'sad']] }); char('lucia', 941, 1430, 0.56, { pose: [[0, 'holdBoth']], emo: [[0, 'serious']], extras: HS }); for (const x of [407, 674]) { fillRR(x - 70, 1150, 140, 190, 26, '#2b2b36'); fillRR(x - 10, 1340, 20, 80, 6, '#1b1b24'); ell(x, 1430, 80, 14, '#1b1b24'); } },
  ui() { info('NUR NOCH ZU ZWEIT', 55.6, { size: 52 }); },
  sfx: [[55.6, 'pop', 0.9], [56.2, 'sadTrombone', 0.5]] });
// ---- 47 · "Tag und Nacht," — the window cycles sun / moon fast
S(57.61, { tr: 'cut', lift: 0, cam: WD(57.61, 58.73, 1060, 1.1, 1.16),
  draw() { setTeamRoom({ night: Math.sin((TT - 57.6) * 8) > 0 ? 1 : 0 }); kv(540, FLOOR + 60, 0.9, { pose: [[0, 'holdBoth']], emo: [[0, 'sleepy']] }); },
  ui() { fact('TAG ☀️ UND NACHT 🌙', 57.7, 540, 420, { size: 58, bg: '#141026' }); },
  sfx: [[57.7, 'clockSpin', 1.0]] });
// ---- 48 · "Truhe für Truhe." — a quick montage of chests opening, nothing
S(58.73, { tr: 'blinds', lift: 0, raise: 0, cam: [[58.73, 540, 960, 1.0], [59.91, 540, 950, 1.06]],
  draw() { setDark('#1a1430', '#05030c'); const i = Math.floor((TT - 58.73) / 0.2); lootChest(540, 1220, 1.3, { open: ((TT - 58.73) % 0.2) / 0.2 }); chestCounter(540, 420, 0.9, 52000 + i * 1000); },
  ui() { fact('NICHTS… NICHTS… NICHTS', 58.8, 540, 640, { size: 50, bg: '#ff2e4d' }); },
  sfx: [[58.75, 'creak', 1.8], [58.95, 'creak', 1.6], [59.15, 'creak', 1.9], [59.35, 'creak', 1.7], [59.55, 'creak', 1.8]] });
// ---- 49 · "Doch genau in der letzten Nacht" — the event timer: last night
S(59.91, { tr: 'glitch', tense: 1, lift: 0, raise: 0, cam: [[59.91, 540, 960, 1.0], [61.7, 540, 950, 1.1]],
  draw() { setDark('#3a0a12', '#05020a'); pirateToken(540, 640, 150, { sx: Math.cos((TT - 59.9) * 1.2), glow: 0.5 }); eventTimer(540, 1060, 1.1, 'LETZTE NACHT · ' + fmtClock(3600 - (TT - 59.91) * 400)); },
  sfx: [[59.95, 'alarmRing', 0.4], [60.4, 'tick'], [60.9, 'tick'], [61.4, 'tick']] });
// ---- 50 · "…leuchtet bei Kevin…" — Kevin's face lit gold, eyes wide
S(61.7, { tr: 'cut', tense: 1, cam: [[61.7, 540, 990, 1.85], [62.7, 540, 980, 1.95]],
  draw() { setTeamRoom({ night: 1, blur: 10 }); ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(-600, -400, 2300, 2800); glowFace(540, 800); kv(540, FLOOR + 170, 1.05, { pose: [[0, 'holdBoth']], emo: [[0, 'shock']] }); },
  sfx: [[61.75, 'gasp'], [61.8, 'choir']] });
// ---- 51 · "…eine Truhe golden." — Kevin's golden chest on his monitor
S(62.7, { tr: 'flash', lift: 0, raise: 0, cam: [[62.7, 540, 960, 1.0], [63.66, 540, 950, 1.1]], shake: [[62.75, 12, 0.4]],
  draw() { setTeamRoom({ night: 1, blur: 12 }); fillRR(90, 600, 900, 640, 24, '#15131f'); fillRR(110, 620, 860, 600, 14, '#0b1a33'); lootChest(540, 1100, 0.9, { gold: 1 }); },
  ui() { fact('WIEDER GOLDEN?! ✨', 62.8, 540, 420, { size: 60, bg: '#d9a520', fg: '#1b1530' }); },
  sfx: [[62.75, 'bling'], [62.8, 'sparkle']] });
// ---- 52 · "Und im selben Moment ruft einer von Jonas' Streamern an:" — Jonas' phone rings on the sofa
S(63.66, { tr: 'whipR', lift: 0, cam: WD(63.66, 65.1, 1100, 1.15, 1.22),
  draw() { setJonasDen({ blur: 4 }); jn(540, FLOOR + 80, 0.95, { pose: [[63.66, 'holdBoth'], [64.6, 'phoneR', 0.15]], emo: [[63.66, 'sleepy'], [64.3, 'shock']], holdR: () => (TT > 64.6 ? phone(0, -30, 0.32, 0.15, () => { ctx.fillStyle = '#7b3fe4'; ctx.fillRect(-84, -176, 168, 352); tText('STREAMER', 0, -20, 18, { color: '#fff', shadow: false }); }) : null) }); if (TT < 64.6) { ctx.save(); ctx.translate(820, 1380); ctx.rotate(Math.sin(TT * 60) * 0.06); phone(0, 0, 0.5, 0, () => { ctx.fillStyle = '#7b3fe4'; ctx.fillRect(-84, -176, 168, 352); tText('STREAMER', 0, -40, 18, { color: '#fff', shadow: false }); }); ctx.restore(); } },
  ui() { info('ANRUF! 📞', 63.8, { size: 56 }); },
  sfx: [[63.7, 'ringtone'], [63.8, 'pop', 1], [64.6, 'click']] });
// ---- 53 · (…an:) — the video call opens: a streamer, headset, shouting
S(65.1, { tr: 'zoomIn', lift: 0, raise: 30, cam: [[65.1, 540, 960, 1.0], [66.34, 540, 950, 1.05]],
  draw() { setJonasDen({ blur: 12 }); callScreen(540, 960, 3.2, () => { ctx.save(); ctx.scale(0.17, 0.17); ctx.translate(-540, -1100); setGamerRoom(); char('dani', 540, 2000, 1.3, { pose: [[0, 'cheer']], emo: [[0, 'laugh']], extras: HS }); ctx.restore(); }, 'STREAMER · LIVE'); },
  sfx: [[65.15, 'notify'], [65.5, 'liveOn']] });
// ---- 54 · "Bruder, ich glaube, ich hab ihn!" — on the call: his chest glows gold too
S(66.34, { tr: 'cut', lift: 0, raise: 30, cam: [[66.34, 540, 960, 1.06], [67.97, 540, 950, 1.14]], punch: [[67.3, 0.06]],
  draw() { setJonasDen({ blur: 12 }); callScreen(540, 960, 3.2, () => { ctx.save(); ctx.scale(0.17, 0.17); ctx.translate(-540, -1100); setDark('#3a2a00', '#0a0600'); lootChest(540, 1300, 1.2, { gold: 1 }); char('dani', 300, 2050, 1.0, { pose: [[0, 'armsUp']], emo: [[0, 'laugh']], extras: HS }); ctx.restore(); }, 'STREAMER · LIVE'); },
  ui() { popText('„ICH HAB IHN!"', 540, 260, 66.5, 64, '#ffe14d', -0.04, 0); },
  sfx: [[66.4, 'bling'], [67.3, 'gasp']] });
// ---- 55 · "Beide Truhen gehen gleichzeitig auf." — split diagonal: both chests open, a white flash, black
S(67.97, { tr: 'rgb', tense: 1, lift: 0, raise: 0, cam: [[67.97, 540, 960, 1.0], [70.16, 540, 960, 1.12]], noCap: 0,
  draw() { const op = clamp((TT - 68.2) / 1.2); setDark('#3a2a00', '#0a0600');
    ctx.save(); ctx.beginPath(); ctx.moveTo(-300, -400); ctx.lineTo(1400, -400); ctx.lineTo(-300, 2300); ctx.closePath(); ctx.clip(); setTeamRoom({ night: 1, blur: 10 }); lootChest(330, 820, 0.9, { gold: 1, open: op }); tText('KEVIN', 330, 420, 64, { color: '#41f08a', stroke: '#0b0912', strokeW: 12 }); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.moveTo(1400, -400); ctx.lineTo(1400, 2300); ctx.lineTo(-300, 2300); ctx.closePath(); ctx.clip(); setGamerRoom({ blur: 10 }); lootChest(760, 1450, 0.9, { gold: 1, open: op }); tText('STREAMER', 760, 1080, 60, { color: '#b86bff', stroke: '#0b0912', strokeW: 12 }); ctx.restore();
    line(1400, -400, -300, 2300, 14, '#ffffff');
    const f = clamp((TT - 69.2) / 0.5); if (f > 0) { ctx.save(); ctx.globalAlpha = f < 0.5 ? f * 2 : 1; ctx.fillStyle = f < 0.6 ? '#ffffff' : '#000000'; ctx.fillRect(-600, -400, 2300, 2800); ctx.restore(); } },
  sfx: [[68.2, 'creak', 1.2], [68.25, 'creak', 1.5], [68.6, 'heartbeat', 0.8], [69.2, 'choir'], [69.6, 'boom']] });
// ---- 56 · "Und du?" — black; Kevin and Jonas lean into frame and point at the viewer
S(70.16, { tr: 'cut', lift: 0, cam: [[70.16, 540, 1040, 1.1], [71.4, 540, 1020, 1.18]],
  draw() { setDark('#1a1430', '#05030c'); rimLight(540, 900, 600, '#ffd23f', 0.2); kv(330, FLOOR + 80, 0.95, { pose: [[0, 'pointR']], emo: [[0, 'grin']], extras: { headset: 0 } }); jn(760, FLOOR + 80, 0.95, { pose: [[0, 'pointR']], flip: 1, emo: [[0, 'smug']] }); },
  ui() { popText('UND DU? 👉', 540, 420, 70.2, 92, '#ffe14d', -0.04, 0); },
  sfx: [[70.2, 'whoosh', 1.2], [70.25, 'pop', 1.2]] });
// ---- 57 · "Wie viele Truhen hast du schon geöffnet…" — an empty counter "DEINE TRUHEN: ???", a pile of chests
S(71.4, { tr: 'push', lift: 0, raise: 0, cam: [[71.4, 540, 960, 1.0], [74.3, 540, 950, 1.08]],
  draw() { setDark('#1a1430', '#05030c'); for (let i = 0; i < 26; i++) { const R = RNG('yp', i); lootChest(540 + R.n(480), 1350 + R.f() * 260, 0.22 + R.f() * 0.12, { open: R.f() > 0.5 ? 1 : 0 }); } pirateToken(540, 560, 130, { sx: Math.cos((TT - 71.4) * 1.0), glow: 0.6 });
    ctx.save(); ctx.translate(540, 960); ctx.scale(1.35, 1.35); fillRR(-320, -110, 640, 220, 30, '#141026'); fillRR(-320, -110, 640, 56, 26, '#2a2050'); tText('DEINE TRUHEN', 0, -82, 28, { color: '#ffd23f', shadow: false, letter: 4 }); tText(Math.sin(TT * 3) > 0 ? '???' : '??? |', 0, 30, 96, { color: '#ffffff', shadow: false }); ctx.restore(); },
  sfx: [[71.5, 'pop', 1], [72.2, 'typing', 0.6], [73.2, 'ding']] });
