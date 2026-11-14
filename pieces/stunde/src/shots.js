// =====================================================================
//  shots.js — 100 € pro Stunde oder 1 Cent pro Sekunde? (DE). ~57 shots of 1.0–1.8 s on the voice (82.3 s).
//  Toni (new: loud wannabe influencer, platinum quiff, neon-green bomber, chain, shades on the hair) takes the cents
//  because a guru video said "per second always wins"; Kevin (burgundy hoodie, black beanie) takes 100 €/hour.
//  Sets: Toni's LED room, Kevin's kitchen, rooftop, Berlin, a sunrise, the Döner-Imbiss.
//  HUD: a story clock with both totals at the top.  Captions: whole chunk, spoken word on a box in the speaker's colour.
// =====================================================================
Object.assign(LOOKS.kevin, { top: KC, topD: KCD, topL: '#d0436c' });
function popText(str, x, y, t0, size, col, rot = 0, rise = 30) { if (TT < t0) return; const k = springEase(TT - t0, 300, 12); ctx.save(); ctx.translate(x, y - (TT - t0) * rise); ctx.rotate(rot); ctx.scale(k, k); tText(str, 0, 0, size, { color: col, stroke: '#0b0912', strokeW: size * 0.2, maxW: 980 }); ctx.restore(); }
function info(str, t0, o = {}) { sticker(str, o.x ?? 540, o.y ?? 440, t0, { bg: o.bg ?? '#141026', fg: o.fg, size: o.size ?? 52, rot: o.rot ?? -0.03 }); }
const CL = (t0, t1, x = 540, z = 1.7) => [[t0, x, 900, z], [t1, x, 885, z + 0.14]];
const WD = (t0, t1, y = 1060, z0 = 1.0, z1 = 1.12) => [[t0, 540, y - 290, z0], [t1, 540, y - 310, z1]];
const FULL = (t0, t1, z0 = 1.0, z1 = 1.08) => [[t0, 540, 960, z0], [t1, 540, 950, z1]];
const cash = (seed, t0, n = 22, o = {}) => { if (TT > t0) billRain(seed, t0, n, { spread: 1.5, ...o }); };
const kv = (x, y, s, T = {}) => char('kevin', x, y, s, T);
const tn = (x, y, s, T = {}) => char('toni', x, y, s, { ...T, extras: { chain: 1, shadesUp: 1, ...(T.extras || {}) } });
const dim = (a = 0.35, c = '0,0,0') => { ctx.fillStyle = `rgba(${c},${a})`; ctx.fillRect(-600, -400, 2300, 2800); };
const coinsUp = (seed, t0, n, x, y) => { for (let i = 0; i < n; i++) { const R = RNG(seed, i), t = t0 + i * 0.08, u = (TT - t) / 0.9; if (u < 0 || u > 1) continue; ctx.save(); ctx.globalAlpha = 1 - u; copperCent(x + R.n(260), y - u * 420 - R.f() * 80, 34, { sx: 0.6 + 0.4 * Math.cos(TT * 6 + i) }); ctx.restore(); } };
// HUD states
const HB = (clock, k, t, lead) => () => hudBar(clock, k, t, { lead });
const H1 = HB('0:01', '0,00 €', '0,60 €', 't'), H2 = HB('1:00', '0,00 €', '36,00 €', 't'), H3 = HB('1:00', '100 €', '36 €', 'k'), H8 = HB('8:00', '800 €', '288 €', 'k'), H24 = HB('24:00', '2.400 €', '864 €', 'k');

// =====================================================================  THE HOOK
// ---- 1 · "100 Euro pro Stunde?" — the written hook on frame one, hard zoom; the 100 €/STUNDE ticket over the night city
S(0.0, { tr: 'cut', lift: 0, raise: 0, cam: [[0, 540, 960, 2.4], [0.22, 540, 960, 1.0], [1.99, 540, 950, 1.07]], shake: [[0.22, 18, 0.4]],
  draw() { setRooftop(); dim(0.35, '10,0,30'); glow(540, 1000, 700, '#ffd23f', 0.25); offerTicket(540, 1020, 1.25, '100 €', 'PRO STUNDE', '#d9a520', { top: 'OPTION A', rot: -0.05 }); cash('h1', 0.2, 20, { burst: [540, 1000] }); },
  ui() { ctx.save(); const k = springEase(TT, 260, 12); ctx.translate(540, 470); ctx.scale(k, k); ctx.rotate(-0.04);
    fillRR(-500, -160, 1000, 320, 36, '#141026'); tText('100 € PRO STUNDE', 0, -62, 92, { color: '#ffd23f', shadow: false, maxW: 880 }); tText('ODER 1 CENT PRO SEKUNDE?', 0, 62, 76, { color: '#ffffff', shadow: false, maxW: 880 }); ctx.restore(); },
  sfx: [[0.02, 'impact'], [0.22, 'cashCannon'], [0.6, 'bling']] });
// ---- 2 · "Oder 1 Cent pro Sekunde?" — a giant copper cent spins in (never edge-on), the orange ticket
S(1.99, { tr: 'whipR', lift: 0, raise: 0, cam: FULL(1.99, 3.76, 1.0, 1.1), punch: [[2.4, 0.06]],
  draw() { rays('#5a1e00', '#a8420f', { cy: 900, spin: 0.4 }); copperCent(540, 760, 230, { sx: 0.55 + 0.45 * Math.abs(Math.cos((TT - 2) * 2.2)) }); offerTicket(540, 1260, 1.0, '1 CENT', 'PRO SEKUNDE', '#e8641e', { top: 'OPTION B', rot: 0.04, t0: 2.4, bigSize: 120 }); },
  ui() { info('ODER…?', 2.05, { y: 420, size: 60, bg: '#e8641e' }); },
  sfx: [[2.05, 'pop', 1.1], [2.4, 'coinBounce'], [3.0, 'ting']] });
// ---- 3 · "24 Stunden lang." — a big LED board counts 24:00:00, the city below
S(3.76, { tr: 'zoomIn', lift: 0, raise: 0, cam: FULL(3.76, 5.37, 1.0, 1.1), shake: [[3.85, 12, 0.3]],
  draw() { setBerlin({ blur: 8 }); dim(0.45, '20,10,40'); ledBoard(540, 900, 1.15, 24 * 3600 - Math.max(0, TT - 3.8) * 1800, '#ffd23f'); },
  ui() { fact('24 STUNDEN LANG', 3.9, 540, 1200, { size: 70, bg: '#7b3fe4' }); },
  sfx: [[3.85, 'stamp'], [4.1, 'tick'], [4.6, 'tick'], [5.1, 'tick']] });

// =====================================================================  THE CHOICE
// ---- 4 · "Ich nehm die Sekunden! Ich hab ein…" — Toni in his LED room, arms up
S(5.37, { tr: 'slash', cam: CL(5.37, 6.88, 540, 1.6),
  draw() { setToniRoom({ blur: 7 }); rimLight(540, 860, 440, '#ff4fa3', 0.25); tn(540, FLOOR + 170, 1.05, { pose: [[0, 'cheer']], emo: [[0, 'grin']], jump: [[5.37, 0], [5.5, 70, 0.15], [5.75, 0, 0.15]] }); },
  ui() { popText('SEKUNDEN!! 🔥', 540, 430, 5.5, 88, TC, -0.05, 0); },
  sfx: [[5.42, 'hop'], [5.5, 'sting']] });
// ---- 5 · "…Video gesehen: Pro Sekunde…" — the guru's video on Toni's phone
S(6.88, { tr: 'zoomIn', lift: 0, raise: 0, cam: [[6.88, 540, 960, 1.0], [8.4, 540, 940, 1.12]],
  draw() { setToniRoom({ blur: 14 }); dim(0.45); guruVideo(540, 960, 1.7); },
  ui() { info('„FINANZ-GURU" 🤓', 7.0, { y: 300, size: 46, bg: '#0f7a4a' }); },
  sfx: [[6.95, 'phoneTap'], [7.05, 'liveOn'], [7.6, 'cashReg']] });
// ---- 6 · "…gewinnt immer!" — Toni points to the sky, confetti
S(8.4, { tr: 'push', cam: CL(8.4, 9.48, 540, 1.7), punch: [[9.0, 0.07]],
  draw() { setToniRoom({ blur: 8 }); tn(540, FLOOR + 170, 1.05, { pose: [[0, 'pointUpR']], emo: [[0, 'laugh']] }); confetti('c6', 8.45, 36); },
  ui() { fact('GEWINNT IMMER!', 8.9, 540, 430, { size: 74, bg: TCD }); },
  sfx: [[8.45, 'whoosh', 1.3], [8.9, 'stamp', 0.8], [9.0, 'applause', 0.6]] });
// ---- 7 · "Hast du dir den Betrag…" — Kevin in his kitchen, coffee in hand, one eyebrow up
S(9.48, { tr: 'whipL', cam: CL(9.48, 10.9, 540, 1.6),
  draw() { setKevinKitchen({ blur: 6 }); rimLight(540, 860, 420, '#ffd27a', 0.2); kv(540, FLOOR + 170, 1.05, { pose: [[0, 'holdR']], emo: [[0, 'confused']], holdR: () => mug(0, 30, 0.8), look: [-0.3, 0] }); },
  ui() { info('BETRAG? 🤨', 9.6, { size: 54, bg: KC }); },
  sfx: [[9.55, 'slurp'], [9.9, 'squeak']] });
// ---- 8 · "…überhaupt angeschaut? Bruder," — a magnifier over the ticket: 0,01 €
S(10.9, { tr: 'cut', lift: 0, raise: 0, cam: [[10.9, 540, 1000, 1.0], [12.5, 540, 980, 1.25]],
  draw() { rays('#3a1a00', '#5a2a08', { cy: 1000, spin: 0.2 }); offerTicket(540, 1000, 1.2, '1 CENT', 'PRO SEKUNDE', '#e8641e', { top: 'OPTION B' });
    const mx = 540 + Math.sin((TT - 10.9) * 2.4) * 120, my = 980; ctx.save(); ctx.globalAlpha = 0.3; circ(mx, my, 190, '#bfeaff'); ctx.restore(); ctx.lineWidth = 34; ctx.strokeStyle = '#2b2b36'; ctx.beginPath(); ctx.arc(mx, my, 200, 0, TAU); ctx.stroke(); line(mx + 140, my + 140, mx + 330, my + 330, 50, '#2b2b36'); },
  ui() { fact('= 0,01 €', 11.2, 540, 430, { size: 90, bg: '#ff2e4d' }); },
  sfx: [[11.0, 'swish', 0.8], [11.2, 'stamp'], [11.7, 'boing']] });
// ---- 9 · "…ich weiß, wie das läuft." — Toni drops his shades onto his nose, arms crossed
S(12.5, { tr: 'rgb', cam: [[12.5, 540, 990, 1.85], [14.03, 540, 975, 2.0]],
  draw() { setToniRoom({ blur: 10 }); rimLight(540, 820, 420, TC, 0.25); const k = clamp((TT - 12.75) / 0.3);
    tn(540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], extras: { shadesUp: k < 1 ? 1 : 0, shades: k >= 1 ? 1 : 0 } }); if (k >= 1 && TT < 13.4) sparkle(470, 790, 40, '#fff', TT * 6); },
  ui() { popText('😎', 820, 520, 13.05, 110, '#fff', 0.1, 0); },
  sfx: [[12.75, 'swish', 1.4], [13.05, 'ting'], [13.4, 'kiss']] });
// ---- 10 · "Also drückt Toni auf 1 Cent pro…" — the pay app: his finger taps "1 CENT / SEK"
S(14.03, { tr: 'zoomIn', lift: 0, raise: 0, cam: FULL(14.03, 15.4, 1.0, 1.1),
  draw() { setToniRoom({ blur: 14 }); dim(0.4); phone(540, 960, 3.2, 0, () => { ctx.fillStyle = '#14112a'; ctx.fillRect(-84, -176, 168, 352); tText('DEIN GEHALT', 0, -140, 18, { color: '#ffe14d', shadow: false, letter: 2 });
      const sel = TT > 14.75; fillRR(-72, -100, 144, 96, 16, sel ? '#3a3360' : '#d9a520'); tText('100 € / STD', 0, -52, 20, { color: '#fff', shadow: false });
      fillRR(-72, 10, 144, 96, 16, sel ? TCD : '#e8641e'); tText('1 CENT / SEK', 0, 58, 20, { color: '#fff', shadow: false }); if (sel) tText('✓ GEWÄHLT', 0, 140, 18, { color: TC, shadow: false }); });
    const u = EZ.io(clamp((TT - 14.35) / 0.4)), fx = lerp(880, 600, u), fy = lerp(1500, 1180, u) + (TT > 14.75 && TT < 14.9 ? 14 : 0); line(fx + 40, fy + 90, fx + 160, fy + 420, 120, TC); circ(fx + 30, fy + 70, 72, '#efc29c'); fillRR(fx - 22, fy - 60, 44, 120, 22, '#efc29c'); ell(fx, fy - 52, 16, 12, '#ffe9de'); if (TT > 14.75) impactLines(600, 1150, 60, 160, 10, 14.75); },
  sfx: [[14.1, 'whoosh', 1.1], [14.75, 'tap'], [14.8, 'buzzerWin']] });
// ---- 11 · "…Sekunde." — Toni throws both arms up, cents fly
S(15.4, { tr: 'flash', cam: WD(15.4, 16.61, 1100, 1.15, 1.24), shake: [[15.45, 14, 0.35]],
  draw() { setToniRoom({ blur: 4 }); tn(540, FLOOR + 80, 0.95, { pose: [[0, 'armsUp']], emo: [[0, 'laugh']], jump: [[15.4, 0], [15.5, 110, 0.15], [15.8, 0, 0.18]] }); coinsUp('c11', 15.45, 12, 540, 900); },
  ui() { stampMark('DEAL!', 15.45, 540, 1250, TC, 120, -0.12); },
  sfx: [[15.45, 'slam'], [15.5, 'coinPour'], [15.9, 'hop']] });
// ---- 12 · "Kevin bleiben die 100 Euro…" — Kevin shrugs, the gold ticket slides to him
S(16.61, { tr: 'whipL', cam: WD(16.61, 17.9, 1100, 1.15, 1.22),
  draw() { setKevinKitchen({ blur: 4 }); kv(360, FLOOR + 80, 0.95, { pose: [[0, 'shrug']], emo: [[0, 'calm']], look: [0.5, 0] }); offerTicket(lerp(1400, 790, EZ.o3(clamp((TT - 16.7) / 0.5))), 1040, 0.62, '100 €', 'PRO STUNDE', '#d9a520', { top: 'FÜR KEVIN', rot: 0.08 }); },
  ui() { info('BLEIBT FÜR KEVIN', 16.75, { size: 50, bg: KC }); },
  sfx: [[16.7, 'whoosh', 0.8], [17.2, 'pop', 0.8]] });
// ---- 13 · "…pro Stunde." — a 100 € bill and a clock: once per hour
S(17.9, { tr: 'blinds', lift: 0, raise: 0, cam: FULL(17.9, 19.01, 1.0, 1.08),
  draw() { rays('#6a4a00', '#b88a10', { cy: 960, spin: 0.3 }); euro100(540, 820, 620, -0.06); clockFace(540, 1230, 150, (TT - 17.9) * 6); },
  ui() { fact('1× PRO STUNDE', 18.05, 540, 430, { size: 70, bg: '#141026' }); },
  sfx: [[18.0, 'rustle'], [18.05, 'pop', 0.9], [18.4, 'clockSpin', 0.6]] });

// =====================================================================  ONE MINUTE
// ---- 14 · "Nach einer Minute" — an alarm clock races to 1:00, the HUD appears
S(19.01, { tr: 'iris', lift: 0, raise: 0, cam: FULL(19.01, 20.3, 1.0, 1.1),
  draw() { setDark('#14304a', '#030812'); alarmClock(540, 1000, 1.25, { t: (TT - 19) * 12, label: '1 MIN', ring: TT > 19.9 ? 1 : 0 }); },
  ui() { fact('1 MINUTE SPÄTER', 19.1, 540, 480, { size: 62, bg: '#ffe14d', fg: '#141026' }); },
  hud: HB('0:01', '0,00 €', '0,60 €'),
  sfx: [[19.05, 'clockSpin', 0.9], [19.95, 'alarmRing', 0.4]] });
// ---- 15 · "…hat Toni schon 60 Cent." — Toni's pay app ticks to 0,60 €
S(20.3, { tr: 'cut', lift: 0, raise: 0, cam: [[20.3, 540, 980, 1.0], [21.59, 540, 960, 1.12]], punch: [[21.25, 0.07]],
  draw() { setToniRoom({ blur: 12 }); dim(0.35); payApp(540, 1040, 2.6, 'TONI', (Math.min(0.6, (TT - 20.3) * 0.6 + 0.2)).toFixed(2).replace('.', ',') + ' €', '1 CENT / SEKUNDE', TCD); coinsUp('c15', 20.4, 10, 540, 760); },
  ui() { fact('+60 CENT', 21.25, 540, 470, { size: 80, bg: TCD }); },
  hud: H1, sfx: [[20.35, 'coinTicks', 0.6, 6], [21.25, 'cashReg']] });
// ---- 16 · "Kevin wartet immer noch…" — Kevin at the counter, tapping his wrist, bored
S(21.59, { tr: 'slide', cam: CL(21.59, 22.95, 540, 1.6),
  draw() { setKevinKitchen({ blur: 7 }); kv(540, FLOOR + 170, 1.05, { pose: [[0, 'tapWatch']], emo: [[0, 'sleepy']], tilt: 0.08 }); },
  ui() { info('WARTEN… 🥱', 21.7, { size: 54, y: 470 }); },
  hud: H1, sfx: [[21.7, 'pop', 0.8], [22.2, 'tickSoft'], [22.6, 'tickSoft']] });
// ---- 17 · "…auf seine erste Zahlung." — Kevin's app: 0,00 €, the payout bar barely moving
S(22.95, { tr: 'cut', lift: 0, raise: 0, cam: [[22.95, 540, 980, 1.0], [24.03, 540, 960, 1.1]],
  draw() { setKevinKitchen({ blur: 12 }); dim(0.3); payApp(540, 1040, 2.6, 'KEVIN', '0,00 €', '100 € / STUNDE', KC, { valCol: '#ff8fb3', wait: 0.017 + (TT - 22.95) * 0.002, waitTxt: 'NOCH 59 MIN' }); },
  ui() { fact('ERSTE ZAHLUNG? ⏳', 23.1, 540, 470, { size: 60, bg: '#3a3360' }); },
  hud: H1, sfx: [[23.0, 'click'], [23.1, 'descend']] });

// =====================================================================  TONI SHOWS OFF
// ---- 18 · "Leute, schaut her!" — Toni's own live stream: hearts float, LIVE badge
S(24.03, { tr: 'whipU', lift: 0, raise: 0, cam: FULL(24.03, 25.18, 1.0, 1.06),
  draw() { setToniRoom({ blur: 2 }); tn(540, 1720, 1.15, { pose: [[0, 'waveR']], emo: [[0, 'grin']] }); for (let i = 0; i < 8; i++) { const u = ((TT - 24 + i * 0.27) % 1.6) / 1.6; heartIcon(920 + Math.sin(u * 9 + i) * 40, 1500 - u * 900, 26 + i % 3 * 6, i % 2 ? '#ff3b5c' : '#ff8fc0'); }
    ctx.lineWidth = 16; ctx.strokeStyle = 'rgba(255,255,255,0.85)'; rrPath(60, 120, 960, 1640, 40); ctx.stroke(); },
  ui() { liveBadge(180, 420, 24.1); info('👀 1.204', 24.3, { x: 860, y: 420, size: 38, bg: '#141026' }); },
  sfx: [[24.1, 'liveOn'], [24.3, 'bubble'], [24.7, 'bubble']] });
// ---- 19 · "Wer verdient hier Geld?" — Toni dances, cents pop around him
S(25.18, { tr: 'spin', cam: WD(25.18, 26.7, 1100, 1.15, 1.25),
  draw() { setToniRoom({ blur: 4 }); tn(540, FLOOR + 80, 0.95, { pose: [[25.18, 'cheer'], [25.5, 'armsUp', 0.15], [25.8, 'cheer', 0.15], [26.1, 'armsUp', 0.15], [26.4, 'cheer', 0.15]], emo: [[0, 'laugh']], lean: [[25.18, 0.1], [25.5, -0.1, 0.15], [25.8, 0.1, 0.15], [26.1, -0.1, 0.15], [26.4, 0.1, 0.15]] }); coinsUp('c19', 25.3, 14, 540, 900); },
  ui() { popText('WER VERDIENT HIER?! 💸', 540, 470, 25.3, 64, '#ffe14d', -0.04, 0); },
  hud: H1, sfx: [[25.3, 'coinPour'], [25.6, 'popHi'], [26.0, 'popHi', 1.2]] });
// ---- 20 · "60 Cent Vorsprung!" — the scoreboard: TONI 0,60 € vs KEVIN 0,00 €
S(26.7, { tr: 'glitch', lift: 0, raise: 0, cam: FULL(26.7, 28.45, 1.0, 1.08), shake: [[27.4, 12, 0.3]],
  draw() { setStudio({ blur: 6 }); scoreBoard(540, 960, 1.05, '0,00 €', '0,60 €', TT > 27.4 ? 't' : ''); },
  ui() { fact('60 CENT VORSPRUNG', 27.45, 540, 1290, { size: 58, bg: TCD }); },
  sfx: [[26.75, 'glitch'], [27.4, 'stamp'], [27.5, 'buzzerWin']] });
// ---- 21 · "Und es werden mehr!" — cents pour into a jar
S(28.45, { tr: 'cut', lift: 0, raise: 0, cam: FULL(28.45, 29.78, 1.05, 1.15),
  draw() { setToniRoom({ blur: 12 }); dim(0.35); coinJar(540, 1260, 1.5, 0.2 + (TT - 28.45) * 0.25); for (let i = 0; i < 9; i++) { const t = 28.5 + i * 0.13, u = (TT - t) / 0.45; if (u > 0 && u < 1) copperCent(540 + Math.sin(i * 2) * 60, lerp(300, 900, u * u), 40, { sx: 0.6 + 0.4 * Math.cos(TT * 9 + i) }); } },
  ui() { info('UND ES WERDEN MEHR!', 28.6, { size: 52, bg: TCD, y: 470 }); },
  hud: H1, sfx: [[28.5, 'coinJar'], [28.9, 'coin', 1.1], [29.2, 'coin', 1.25]] });

// =====================================================================  ONE HOUR
// ---- 22 · "Nach einer Stunde" — the Berlin skyline, a clock spins one turn
S(29.78, { tr: 'zoomOut', lift: 0, raise: 0, cam: FULL(29.78, 30.85, 1.1, 1.0),
  draw() { setBerlin(); clockFace(540, 1000, 220, 10 + clamp((TT - 29.8) / 0.8)); },
  ui() { fact('1 STUNDE SPÄTER', 29.9, 540, 470, { size: 64, bg: '#ff9a3c', fg: '#141026' }); },
  hud: H2, sfx: [[29.85, 'clockSpin', 0.8], [30.65, 'ding']] });
// ---- 23 · "…hat Toni 36 Euro." — Toni proud, holds up his phone: 36,00 €
S(30.85, { tr: 'push', cam: CL(30.85, 32.54, 540, 1.6),
  draw() { setToniRoom({ blur: 8 }); tn(540, FLOOR + 170, 1.05, { pose: [[0, 'raiseR']], emo: [[0, 'grin']], holdR: () => payApp(0, -60, 0.42, 'TONI', '36,00 €', '1 CT / SEK', TCD, { rot: 0.1 }) }); },
  ui() { fact('36 €', 31.3, 540, 470, { size: 100, bg: TCD }); },
  hud: H2, sfx: [[30.9, 'swish'], [31.3, 'cashReg']] });
// ---- 24 · "Dann landen Kevins erste 100 Euro." — Kevin's phone buzzes: +100,00 €
S(32.54, { tr: 'whipR', lift: 0, raise: 0, cam: [[32.54, 540, 980, 1.0], [33.95, 540, 960, 1.14]],
  draw() { setKevinKitchen({ blur: 12 }); dim(0.25); ctx.save(); ctx.translate(540, 1000); ctx.rotate(TT > 33.2 && TT < 33.6 ? Math.sin(TT * 70) * 0.04 : 0); payApp(0, 40, 2.6, 'KEVIN', TT > 33.25 ? '100,00 €' : '0,00 €', '100 € / STUNDE', KC, { notif: 33.2 }); ctx.restore(); },
  ui() { info('BZZZ! 📳', 32.65, { size: 54, bg: KC, y: 470 }); },
  hud: H2, sfx: [[33.2, 'buzzPhone'], [33.3, 'notify']] });
// ---- 25 · "…100 Euro." — a 100 € bill slams down, cash rains
S(33.95, { tr: 'flash', lift: 0, raise: 0, cam: FULL(33.95, 35.09, 1.0, 1.08), shake: [[34.0, 18, 0.4]],
  draw() { rays('#5a0f22', '#a3264a', { cy: 960, spin: 0.4 }); const k = clamp((TT - 33.95) / 0.12); euro100(540, lerp(400, 960, k), lerp(1100, 760, k), -0.08); cash('k25', 34.0, 26); },
  ui() { fact('+100 €', 34.05, 540, 470, { size: 110, bg: '#18a34a' }); },
  hud: H3, sfx: [[34.0, 'slam'], [34.05, 'moneyRain', 1.0]] });

// =====================================================================  THE DOUBT
// ---- 26 · "Moment… wieso…" — Toni freezes mid-dance, confused
S(35.09, { tr: 'cut', cam: [[35.09, 540, 990, 1.85], [36.25, 540, 985, 1.95]],
  draw() { setToniRoom({ blur: 10 }); dim(0.25, '0,20,60'); tn(540, FLOOR + 170, 1.05, { pose: [[0, 'cheer'], [35.3, 'shrug', 0.2]], emo: [[0, 'grin'], [35.25, 'confused']] }); },
  ui() { popText('MOMENT…', 540, 410, 35.15, 90, '#ffffff', -0.04, 0); },
  hud: H3, sfx: [[35.15, 'recordScratch']] });
// ---- 27 · "…hast du mehr als ich?" — the scoreboard flips: KEVIN 100 € leads
S(36.25, { tr: 'blinds', lift: 0, raise: 0, cam: FULL(36.25, 37.37, 1.0, 1.08),
  draw() { setStudio({ blur: 6 }); scoreBoard(540, 960, 1.05, '100 €', '36 €', 'k'); },
  ui() { fact('MEHR ALS ICH?!', 36.4, 540, 1290, { size: 64, bg: '#ff2e4d' }); },
  sfx: [[36.3, 'flip'], [36.4, 'shockHit']] });
// ---- 28 · "Weil du einen Cent genommen hast." — Kevin sips his coffee, cool
S(37.37, { tr: 'whipL', cam: CL(37.37, 39.17, 540, 1.65),
  draw() { setKevinKitchen({ blur: 7 }); kv(540, FLOOR + 170, 1.05, { pose: [[0, 'holdR'], [38.4, 'drinkR', 0.2]], emo: [[0, 'smug']], holdR: () => mug(0, 30, 0.8) }); },
  ui() { popText('1 CENT. 🙄', 540, 470, 37.9, 76, '#e8641e', -0.04, 0); },
  hud: H3, sfx: [[37.45, 'swish', 0.9], [38.5, 'slurp']] });
// ---- 29 · "Das muss ein Fehler sein!" — Toni grabs his head, red alarm light
S(39.17, { tr: 'rgb', cam: WD(39.17, 40.52, 1100, 1.15, 1.25), shake: [[39.8, 14, 0.4]],
  draw() { setToniRoom({ blur: 4 }); dim(0.25 + 0.2 * Math.max(0, Math.sin(TT * 14)), '255,0,40'); tn(540, FLOOR + 80, 0.95, { pose: [[0, 'headGrab']], emo: [[0, 'scared']], extras: { sweat: 1 } }); },
  ui() { stampMark('FEHLER?!', 39.8, 540, 490, '#ff2e4d', 110, -0.1); },
  hud: H3, sfx: [[39.2, 'siren', 0.6], [39.8, 'errorBuzz']] });
// ---- 30 · "Na los, rechne nach." — Kevin holds out a calculator
S(40.52, { tr: 'slide', cam: WD(40.52, 41.78, 1100, 1.15, 1.22),
  draw() { setKevinKitchen({ blur: 4 }); kv(420, FLOOR + 80, 0.95, { pose: [[0, 'offerR']], emo: [[0, 'smug']], holdR: () => calculator(40, -40, 0.32, '0', false) }); },
  ui() { info('RECHNE NACH 🧮', 40.6, { size: 52, bg: KC, y: 470 }); },
  hud: H3, sfx: [[40.6, 'pop', 1], [41.0, 'whoosh', 1.5]] });

// =====================================================================  THE CALCULATOR
// ---- 31 · "Toni tippt:" — Toni hunched over the calculator, sweating
S(41.78, { tr: 'cut', cam: [[41.78, 540, 1000, 1.8], [42.95, 540, 990, 1.9]],
  draw() { setToniRoom({ blur: 10 }); dim(0.35); tn(540, FLOOR + 170, 1.05, { pose: [[0, 'holdBoth']], emo: [[0, 'serious']], extras: { sweat: 1 }, look: [0, 0.6], holdR: () => calculator(-60, 20, 0.3, '3', false, (Math.floor(TT * 8) % 12)) }); },
  hud: H3, sfx: [[41.85, 'beep', 1.1], [42.1, 'beep', 1.3], [42.35, 'beep', 1.0], [42.6, 'beep', 1.2]] });
// ---- 32 · "3.600" — calculator close-up types 3.600 (60 × 60 seconds)
S(42.95, { tr: 'zoomIn', lift: 0, raise: 0, cam: FULL(42.95, 44.3, 1.0, 1.06),
  draw() { setDark('#20203a', '#05050c'); const n = Math.min(4, 1 + Math.floor((TT - 42.95) / 0.22)); calc2(540, 1000, 1.45, ['3', '36', '360', '3.600'][n - 1], false, [10, 10, 12, 12][n - 1]); },
  ui() { info('1 STUNDE = 3.600 SEKUNDEN', 43.3, { size: 44, y: 470, bg: '#141026' }); },
  hud: H3, sfx: [[42.98, 'beep', 1.0], [43.2, 'beep', 1.15], [43.42, 'beep', 0.9], [43.64, 'beep', 1.2]] });
// ---- 33 · "mal 0,01." — × 0,01
S(44.3, { tr: 'cut', lift: 0, raise: 0, cam: [[44.3, 540, 960, 1.06], [46.1, 540, 960, 1.18]], tense: 1,
  draw() { setDark('#20203a', '#05050c'); const n = Math.min(5, 1 + Math.floor((TT - 44.3) / 0.25)); calc2(540, 1000, 1.45, ['3.600 ×', '3.600 × 0', '3.600 × 0,', '3.600 × 0,0', '3.600 × 0,01'][n - 1], false, [7, 12, 13, 12, 8][n - 1]); },
  hud: H3, sfx: [[44.35, 'beep', 1.4], [44.6, 'beep', 1.0], [44.85, 'beep', 1.1], [45.1, 'beep', 1.0], [45.35, 'beep', 1.3], [45.9, 'tension', 0.3]] });
// ---- 34 · "36." — "=" … 36, slammed
S(46.1, { tr: 'flash', lift: 0, raise: 0, cam: FULL(46.1, 47.18, 1.15, 1.25), shake: [[46.15, 20, 0.4]],
  draw() { setDark('#4a0a14', '#0a0204'); glow(540, 700, 600, '#ff2e4d', 0.3); calc2(540, 1080, 1.45, '36', false, 14); },
  ui() { fact('= 36 €', 46.2, 540, 430, { size: 96, bg: '#ff2e4d' }); },
  hud: H3, sfx: [[46.12, 'beep', 0.8], [46.15, 'impact']] });
// ---- 35 · "Er löscht alles und tippt noch mal." — frantic retyping, motion streaks
S(47.18, { tr: 'glitch', lift: 0, raise: 0, cam: FULL(47.18, 48.75, 1.0, 1.08),
  draw() { setToniRoom({ blur: 12 }); dim(0.4); const j = Math.sin(TT * 40) * 10; calc2(540 + j, 1000, 1.3, TT < 47.6 ? '0' : ['3.600', '3.600 ×', '3.600 × 0,01'][Math.min(2, Math.floor((TT - 47.6) / 0.35))], false, Math.floor(TT * 14) % 16);
    for (let i = 0; i < 6; i++) line(200 + i * 140, 620 + (i % 2) * 40, 240 + i * 140, 560 + (i % 2) * 40, 12, 'rgba(255,255,255,0.6)'); },
  ui() { info('NOCHMAL!! 😤', 47.3, { size: 54, bg: '#ff2e4d', y: 470 }); },
  hud: H3, sfx: [[47.25, 'typing', 1.4], [47.3, 'grunt']] });
// ---- 36 · "Wieder 36." — 36 again, a stamp
S(48.75, { tr: 'cut', lift: 0, raise: 0, cam: FULL(48.75, 50.06, 1.1, 1.18), punch: [[49.15, 0.08]],
  draw() { setDark('#4a0a14', '#0a0204'); calc2(540, 1020, 1.45, '36', false, 14); },
  ui() { stampMark('WIEDER 36', 49.15, 540, 490, '#ff2e4d', 104, -0.14); },
  hud: H3, sfx: [[49.15, 'stamp', 1.2], [49.3, 'sadTrombone', 0.6]] });
// ---- 37 · "Bruder, sogar der…" — Kevin bursts out laughing
S(50.06, { tr: 'push', cam: CL(50.06, 51.1, 540, 1.75),
  draw() { setKevinKitchen({ blur: 9 }); kv(540, FLOOR + 170, 1.05, { pose: [[0, 'laughBelly']], emo: [[0, 'laugh']], tilt: [[50.06, 0.06], [50.4, -0.06], [50.75, 0.05]] }); },
  ui() { popText('HAHA 😂', 540, 470, 50.15, 92, '#ffe14d', -0.05, 10); },
  hud: H3, sfx: [[50.1, 'boing'], [50.5, 'popHi', 1.1]] });
// ---- 38 · "…Taschenrechner ist gegen dich!" — the calculator glares, shakes its head
S(51.1, { tr: 'whipU', lift: 0, raise: 0, cam: FULL(51.1, 53.04, 1.0, 1.1),
  draw() { rays('#1d2a4a', '#2a3d6a', { cy: 1000, spin: 0.3 }); calcFace(540, 1080, 1.15, '36'); },
  ui() { fact('GEGEN DICH 😈', 51.9, 540, 1280, { size: 64, bg: '#ff2e4d' }); },
  hud: H3, sfx: [[51.2, 'squeak'], [51.9, 'stamp', 0.8], [52.3, 'grunt']] });

// =====================================================================  8 HOURS · 24 HOURS
// ---- 39 · "Nach acht Stunden:" — Kevin's kitchen at night, the clock jumps to 8
S(53.04, { tr: 'iris', lift: 0, raise: 0, cam: FULL(53.04, 54.1, 1.05, 1.12),
  draw() { setKevinKitchen({ night: 1, blur: 8 }); dim(0.3); alarmClock(540, 900, 1.0, { t: (TT - 53) * 10, label: '8 STD' }); },
  ui() { fact('8 STUNDEN SPÄTER', 53.15, 540, 1280, { size: 60, bg: '#7b3fe4' }); },
  hud: H8, sfx: [[53.1, 'clockSpin', 0.8], [53.2, 'crickets']] });
// ---- 40 · "Kevin 800 Euro," — Kevin fans eight 100 € bills
S(54.1, { tr: 'whipR', cam: WD(54.1, 55.58, 1100, 1.15, 1.22),
  draw() { setKevinKitchen({ night: 1, blur: 4 }); kv(540, FLOOR + 80, 0.95, { pose: [[0, 'holdBoth']], emo: [[0, 'grin']] }); const n = Math.min(8, Math.floor((TT - 54.15) / 0.08) + 1); for (let i = 0; i < n; i++) euro100(540 + (i - 3.5) * 46, 1250 - Math.abs(i - 3.5) * 10, 170, (i - 3.5) * 0.14); },
  ui() { fact('KEVIN: 800 €', 54.5, 540, 470, { size: 74, bg: KC }); },
  hud: H8, sfx: [[54.15, 'rustle'], [54.5, 'cashReg']] });
// ---- 41 · "Toni 288." — Toni at night: a small pile of cents, sad
S(55.58, { tr: 'slash', cam: [[55.58, 540, 1000, 1.6], [57.66, 540, 980, 1.8]],
  draw() { setToniRoom({ blur: 8 }); dim(0.45, '0,0,40'); tn(540, FLOOR + 170, 1.05, { pose: [[0, 'sad']], emo: [[0, 'sad']] }); for (let i = 0; i < 14; i++) { const R = RNG('p41', i); copperCent(400 + R.f() * 280, 1450 - R.f() * 50, 22, { sx: 0.9 }); } },
  ui() { fact('TONI: 288 €', 56.0, 540, 470, { size: 74, bg: TCD }); },
  hud: H8, sfx: [[55.65, 'whoosh', 0.9], [56.0, 'pop', 0.7], [56.6, 'breath']] });
// ---- 42 · "Nach 24 Stunden" — sunrise over the city, 24:00
S(57.66, { tr: 'zoomOut', lift: 0, raise: 0, cam: FULL(57.66, 59.1, 1.1, 1.0),
  draw() { setSunrise({ t0: 57.66 }); ledBoard(540, 820, 0.9, 24 * 3600, '#ffd23f'); },
  ui() { fact('24 STUNDEN SPÄTER', 57.8, 540, 1230, { size: 60, bg: '#ff9a3c', fg: '#141026' }); },
  hud: H24, sfx: [[57.7, 'birds'], [57.8, 'alarmRing', 0.5]] });
// ---- 43 · "…hat Toni 864 Euro." — Toni holds his phone: 864 €
S(59.1, { tr: 'cut', cam: CL(59.1, 61.26, 540, 1.6),
  draw() { setToniRoom({ blur: 8 }); tn(540, FLOOR + 170, 1.05, { pose: [[0, 'raiseR']], emo: [[0, 'happy']], holdR: () => payApp(0, -60, 0.42, 'TONI', '864,00 €', '1 CT / SEK', TCD, { rot: 0.1 }) }); },
  ui() { fact('864 €', 59.5, 540, 470, { size: 100, bg: TCD }); },
  hud: H24, sfx: [[59.2, 'swish'], [59.5, 'coinPour']] });
// ---- 44 · "Kevin hat 2.400." — a cash mountain, rays, KEVIN 2.400 €
S(61.26, { tr: 'flash', lift: 0, raise: 0, cam: FULL(61.26, 63.27, 1.0, 1.1), shake: [[61.9, 18, 0.45]],
  draw() { rays('#5a0f22', '#a3264a', { cy: 960, spin: 0.35 }); cashMountain(540, 1350, 1.15, clamp((TT - 61.4) / 0.5)); cash('k44', 61.9, 30); kv(540, 1100, 0.6, { pose: [[0, 'armsUp']], emo: [[0, 'laugh']] }); },
  ui() { fact('2.400 €', 61.9, 540, 470, { size: 120, bg: '#18a34a' }); },
  hud: H24, sfx: [[61.9, 'cashCannon'], [62.3, 'applause', 0.9]] });

// =====================================================================  THE VIDEO
// ---- 45 · "Aber im Video hieß es doch:" — Toni desperate, shoving his phone at Kevin
S(63.27, { tr: 'whipL', cam: WD(63.27, 64.75, 1100, 1.15, 1.22),
  draw() { setKevinKitchen({ blur: 5 }); tn(380, FLOOR + 80, 0.95, { pose: [[0, 'offerR']], emo: [[0, 'scared']], holdR: () => guruVideo(30, -40, 0.22) }); kv(830, FLOOR + 80, 0.95, { flip: 1, pose: [[0, 'armsCross']], emo: [[0, 'calm']] }); },
  ui() { info('ABER DAS VIDEO!! 📱', 63.4, { size: 50, bg: TCD }); },
  sfx: [[63.35, 'whoosh', 1.2], [63.4, 'pop', 1.1]] });
// ---- 46 · "Nimm immer die Sekunden!" — the guru video full screen
S(64.75, { tr: 'zoomIn', lift: 0, raise: 0, cam: FULL(64.75, 66.31, 1.0, 1.08),
  draw() { setKevinKitchen({ blur: 14 }); dim(0.45); guruVideo(540, 960, 1.7); },
  ui() { popText('„NIMM IMMER DIE SEKUNDEN!"', 540, 300, 64.85, 54, '#ffe14d', -0.03, 0); },
  sfx: [[64.8, 'liveOn'], [65.6, 'cashReg']] });
// ---- 47 · (sigh) "Da ging's um…" — Kevin facepalms
S(66.31, { tr: 'cut', cam: CL(66.31, 67.4, 540, 1.75),
  draw() { setKevinKitchen({ blur: 9 }); kv(540, FLOOR + 170, 1.05, { pose: [[0, 'facepalm']], emo: [[0, 'sad']] }); },
  sfx: [[66.35, 'breath'], [66.5, 'pat']] });
// ---- 48 · "…einen Euro pro Sekunde." — zoom into the fine print, a red circle: 1 € PRO SEKUNDE
S(67.4, { tr: 'zoomIn', lift: 0, raise: 0, cam: [[67.4, 540, 960, 1.0], [69.01, 540, 820, 1.35]],
  draw() { setKevinKitchen({ blur: 14 }); dim(0.45); guruVideo(540, 960, 1.7, { fine: 67.7 }); const u = clamp((TT - 68.0) / 0.45); if (u > 0) { ctx.beginPath(); ctx.ellipse(540, 748, 330, 80, -0.05, 0, TAU * u); ctx.lineWidth = 16; ctx.strokeStyle = '#ff2e4d'; ctx.stroke(); } },
  sfx: [[67.7, 'paperTear'], [68.05, 'pencil']] });
// ---- 49 · "Du hast einen Cent genommen." — a giant cent drops on Toni's head: BONK
S(69.01, { tr: 'push', cam: WD(69.01, 70.53, 1100, 1.15, 1.22), shake: [[69.5, 16, 0.35]],
  draw() { setKevinKitchen({ blur: 4 }); const hit = TT > 69.5; tn(540, FLOOR + 80, 0.95, { pose: [[0, 'idle'], [69.5, 'headGrab', 0.12]], emo: [[0, 'confused'], [69.5, 'shock']], squash: [[69.5, 0], [69.52, 1, 0.06], [69.7, 0, 0.2]] });
    const y = hit ? 560 + (TT - 69.5) * 900 : lerp(-300, 560, EZ.i3(clamp((TT - 69.1) / 0.4))); copperCent(hit ? 540 + (TT - 69.5) * 300 : 540, y, 150, { sx: 0.9, rot: hit ? (TT - 69.5) * 6 : 0 });
    if (hit && TT < 70.0) for (let i = 0; i < 5; i++) { const a = TT * 6 + i * 1.26; sparkle(540 + Math.cos(a) * 160, 560 + Math.sin(a) * 40, 22, '#ffe14d'); } },
  ui() { popText('BONK!', 540, 400, 69.5, 100, '#e8641e', -0.08, 0); },
  sfx: [[69.1, 'whooshDown', 1.2], [69.5, 'punch'], [69.55, 'coinBounce']] });

// =====================================================================  THE DÖNER
// ---- 50 · "Am Abend an der Dönerbude" — night, the Imbiss, both walk in
S(70.53, { tr: 'iris', lift: 0, cam: WD(70.53, 72.15, 1080, 1.0, 1.08),
  draw() { setImbiss(); const u = EZ.o2(clamp((TT - 70.6) / 1.1)); kv(lerp(-150, 330, u), FLOOR + 40, 0.82, { walk: u < 1 ? 1 : 0, emo: [[0, 'happy']] }); tn(lerp(-350, 760, u), FLOOR + 40, 0.82, { walk: u < 1 ? 1 : 0, emo: [[0, 'neutral']] }); },
  ui() { info('AM ABEND 🌙', 70.65, { size: 52, y: 330 }); },
  sfx: [[70.6, 'footsteps', 1.2], [71.5, 'canOpen']] });
// ---- 51 · "…fehlt Toni genau ein Euro." — the wallet: 6,50 € vs DÖNER 7,50 € → −1 €
S(72.15, { tr: 'cut', lift: 0, raise: 0, cam: FULL(72.15, 73.84, 1.0, 1.08), punch: [[73.2, 0.07]],
  draw() { setImbiss({ blur: 10 }); dim(0.35); wallet(540, 1130, 1.2, '6,50 €', { col: '#ffffff' }); doener(840, 760, 0.8, 0.1); fillRR(690, 520, 300, 90, 20, '#141026'); tText('7,50 €', 840, 565, 56, { color: '#41f08a', shadow: false }); },
  ui() { fact('−1 € 😬', 73.2, 540, 470, { size: 100, bg: '#ff2e4d' }); },
  sfx: [[72.2, 'rustle'], [72.6, 'coin', 0.9], [73.2, 'errorBuzz']] });
// ---- 52 · "Kannst du mir einen Euro leihen?" — Toni, hands together, puppy eyes
S(73.84, { tr: 'slide', cam: CL(73.84, 75.36, 540, 1.7),
  draw() { setImbiss({ blur: 9 }); tn(540, FLOOR + 170, 1.05, { pose: [[0, 'polish']], emo: [[0, 'love']], tilt: 0.1, extras: { blush: 1 } }); },
  ui() { popText('BITTE? 🥺', 540, 470, 74.0, 84, '#ff8fc0', -0.05, 0); },
  sfx: [[73.9, 'squeak'], [74.0, 'pop', 1.3]] });
// ---- 53 · "Klar. Zahl ihn mir…" — Kevin grins, holds up a 1 € coin
S(75.36, { tr: 'whipR', cam: CL(75.36, 76.4, 540, 1.65),
  draw() { setImbiss({ blur: 9 }); kv(540, FLOOR + 170, 1.05, { pose: [[0, 'raiseR']], emo: [[0, 'smug']], holdR: () => coin(0, -40, 40, { sx: 0.7 + 0.3 * Math.cos(TT * 4) }) }); },
  ui() { info('KLAR 😏', 75.45, { size: 56, bg: KC, y: 470 }); },
  sfx: [[75.4, 'ting'], [75.5, 'coin', 1.2]] });
// ---- 54 · "…in 100 Sekunden zurück." — 1 € = 100 seconds, a timer counts down
S(76.4, { tr: 'blinds', lift: 0, raise: 0, cam: FULL(76.4, 77.88, 1.0, 1.08),
  draw() { setImbiss({ blur: 12 }); dim(0.5); ledBoard(540, 900, 1.0, 100 - (TT - 76.4) * 8, '#41f08a'); },
  ui() { fact('1 € = 100 SEKUNDEN', 76.5, 540, 1230, { size: 58, bg: '#141026' }); },
  sfx: [[76.45, 'tick'], [76.95, 'tick'], [77.45, 'tick']] });
// ---- 55 · (groan) "Ich hasse es, dass er das weiß." — Toni glares, Kevin eats his Döner happily
S(77.88, { tr: 'push', cam: WD(77.88, 80.28, 1100, 1.15, 1.24),
  draw() { setImbiss({ blur: 4 }); tn(360, FLOOR + 80, 0.95, { pose: [[0, 'armsCross']], emo: [[0, 'angry']], look: [0.6, 0] }); kv(780, FLOOR + 80, 0.95, { pose: [[0, 'drinkR']], emo: [[0, 'happy']], holdR: () => doener(0, -20, 0.35, -0.3) }); },
  ui() { info('😤', 78.0, { x: 360, y: 400, size: 70, bg: '#ff2e4d' }); },
  sfx: [[77.95, 'grunt'], [78.6, 'crunch'], [79.4, 'crunch']] });

// =====================================================================  THE QUESTION
// ---- 56 · "Und du?" — both point at the viewer
S(80.28, { tr: 'zoomIn', cam: WD(80.28, 80.86, 1100, 1.2, 1.26),
  draw() { setImbiss({ blur: 6 }); kv(330, FLOOR + 80, 0.95, { pose: [[0, 'pointR']], emo: [[0, 'grin']] }); tn(760, FLOOR + 80, 0.95, { pose: [[0, 'pointR']], flip: 1, emo: [[0, 'smug']] }); },
  ui() { popText('UND DU? 👉', 540, 400, 80.3, 92, '#ffe14d', -0.04, 0); },
  sfx: [[80.3, 'whoosh', 1.2]] });
// ---- 57 · "Hättest du auch die Sekunden genommen?" — the two tickets again: A or B?
S(80.86, { tr: 'flash', lift: 0, raise: 0, cam: FULL(80.86, 82.4, 1.0, 1.06),
  draw() { setRooftop(); dim(0.4, '10,0,30'); offerTicket(540, 690, 0.95, '100 €', 'PRO STUNDE', '#d9a520', { top: 'A', rot: -0.05 }); offerTicket(540, 1090, 0.95, '1 CENT', 'PRO SEKUNDE', '#e8641e', { top: 'B', rot: 0.05, bigSize: 120 });
    tText('VS', 540, 890, 70, { color: '#ffffff', stroke: '#141026', strokeW: 14 }); },
  ui() { fact('UND DU? A ODER B? 👇', 81.0, 540, 440, { size: 60, bg: '#ff2e4d' }); },
  sfx: [[80.9, 'sting'], [81.0, 'pop', 1.2]] });
