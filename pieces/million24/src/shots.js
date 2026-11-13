// =====================================================================
//  shots.js — 1 Million in 24 Stunden ausgeben (DE). ~66 short shots on the trimmed voice (101.6 s).
//  Kevin must spend 1 Mio. in 24 h; whatever is left goes to Jonas, who sabotages him (card blocked, clocks
//  set forward, "closed" sign). Purchases: Lambo 250k, Rolex 50k, jet 100k, suite 30k, party 200k, necklace 100k,
//  gold PS5 20k, Ferrari 240k = 990.000 -> Jonas gets 10.000 € (never said on screen).
//  New look (not the old template): no studio/buttons, no split screen; a 24 h countdown on top (props18 timerHUD),
//  block captions, data tags that slam in, new transitions (slash, blinds, push, ink, rgb).
//  Outfits: Kevin in a teal hoodie + black beanie, Jonas in a purple hoodie + glasses.
// =====================================================================
Object.assign(LOOKS.kevin, { top: '#14a39a', topD: '#0c7a73', topL: '#3cc6bd' });
Object.assign(LOOKS.jonas, { top: '#7b3fe4', topD: '#5a28b0', topL: '#9d6bff' });
function popText(str, x, y, t0, size, col, rot = 0, rise = 30) { if (TT < t0) return; const k = springEase(TT - t0, 300, 12); ctx.save(); ctx.translate(x, y - (TT - t0) * rise); ctx.rotate(rot); ctx.scale(k, k); tText(str, 0, 0, size, { color: col, stroke: '#0b0912', strokeW: size * 0.2, maxW: 980 }); ctx.restore(); }
function info(str, t0, o = {}) { sticker(str, o.x ?? 540, o.y ?? 420, t0, { bg: o.bg ?? '#141026', fg: o.fg, size: o.size ?? 52, rot: o.rot ?? -0.03 }); }
const price = (str, t0, y = 560) => fact('– ' + str, t0, 540, y, { size: 76, bg: '#ff2e4d' });
const CLOSE = (t0, t1, x = 540) => [[t0, x, 1000, 1.65], [t1, x, 978, 1.8]];
const WIDEC = (t0, t1, y = 1060, z0 = 1.0, z1 = 1.1) => [[t0, 540, y, z0], [t1, 540, y - 20, z1]];
const cash = (seed, t0, n = 22, o = {}) => { if (TT > t0) billRain(seed, t0, n, { spread: 1.5, ...o }); };
const JON = { glasses: true };
const kv = (x, y, s, T = {}) => char('kevin', x, y, s, T);
const jn = (x, y, s, T = {}) => char('jonas', x, y, s, { ...T, extras: { ...JON, ...(T.extras || {}) } });
const keyRun = (t0) => [[t0, 0], [t0 + 0.05, 1, 0.1]];

// =====================================================================  THE HOOK
// ---- 1 · "Kevin hat genau…" — Kevin sprints at the camera down a neon street, a briefcase of cash (hard punch-in)
S(0.0, { tr: 'cut', lift: 0, cam: [[0, 540, 1100, 2.3], [0.22, 540, 1100, 1.15], [0.95, 540, 1080, 1.22]], shake: [[0.22, 16, 0.4]], noHud: 1,
  draw() { setNightStreet(); speedLines(26, 0.35, 'h1'); kv(540, 1640, 1.0, { run: 1, emo: [[0, 'grin']], holdR: () => briefcase(0, 90, 0.36, 1) }); cash('h1', 0.2, 24, { burst: [540, 1000] }); },
  ui() { fact('1.000.000 €', 0.22, 540, 470, { size: 100, bg: '#18a34a' }); },
  sfx: [[0.02, 'impact'], [0.22, 'cashCannon'], [0.3, 'footsteps', 0.7]] });
// ---- 2 · "…24 Stunden," — the LED board slams in: 24:00:00
S(0.95, { tr: 'rgb', lift: 0, raise: 0, cam: [[0.95, 540, 900, 1.0], [2.08, 540, 900, 1.08]], noHud: 1,
  draw() { setDark('#3a0a12', '#05030a'); const k = springEase(TT - 1.0, 260, 12); ctx.save(); ctx.translate(540, 900); ctx.scale(k, k); ledBoard(0, 0, 1.15, 86400); ctx.restore(); },
  ui() { fact('NUR 24 STUNDEN ⏱️', 1.25, 540, 1220, { size: 60, bg: '#141026' }); },
  sfx: [[1.0, 'slam'], [1.1, 'beep', 1.4], [1.25, 'pop', 1]] });
// ---- 3 · "…um eine Million Euro auszugeben." — a mountain of cash, bills raining down
S(2.08, { tr: 'slash', lift: 0, cam: WIDEC(2.08, 4.19, 1080), shake: [[2.99, 14, 0.35]], noHud: 1,
  draw() { rays('#0f5a2a', '#24a24c', { cy: 900, spin: 0.3 }); glow(540, 1000, 700, '#d9ffd0', 0.35); cashMountain(540, 1380, 1.2, clamp((TT - 2.1) / 0.6)); cash('h3', 2.4, 30); },
  ui() { fact('1 MILLION', 2.99, 540, 470, { size: 92, bg: '#18a34a' }); fact('AUSGEBEN!', 3.5, 540, 600, { size: 60, bg: '#ff2e4d', rot: 0.05 }); },
  sfx: [[2.15, 'moneyRain', 1.6], [2.99, 'cashReg'], [3.5, 'stamp']] });
// ---- 4 · "Und jeder Euro, der übrig bleibt," — a single euro coin left on a table under a spotlight
S(4.19, { tr: 'blinds', lift: 0, cam: [[4.19, 540, 1040, 1.05], [6.2, 540, 1020, 1.2]], noHud: 1,
  draw() { setDark('#2a2440', '#05050a', { cone: 1 }); ell(540, 1210, 320, 50, 'rgba(0,0,0,0.35)'); const y = lerp(-200, 1100, EZ.i3(clamp((TT - 4.3) / 0.45))); coin(540, y, 120); },
  ui() { info('JEDER EURO, DER ÜBRIG BLEIBT…', 4.4, { y: 430, size: 46 }); },
  sfx: [[4.3, 'whooshDown', 1.2], [4.75, 'coinBounce']] });
// ---- 5 · "…gehört Jonas." — Jonas catches it, an arrow with his name
S(6.2, { tr: 'whipR', cam: CLOSE(6.2, 7.41), noHud: 1,
  draw() { setLuxGarage({ blur: 9 }); jn(540, FLOOR + 170, 1.05, { pose: [[6.2, 'idle'], [6.5, 'raiseR', 0.12]], emo: [[6.2, 'happy'], [6.6, 'grin']], holdR: () => (TT > 6.5 ? coin(0, -40, 50) : null) }); },
  ui() { fact('GEHÖRT JONAS 😏', 6.6, 540, 430, { size: 62, bg: '#7b3fe4' }); },
  sfx: [[6.5, 'coin', 1.3], [6.6, 'whoosh', 1.3]] });
// ---- 6 · "Jonas lacht:" — he cracks up
S(7.41, { tr: 'cut', cam: [[7.41, 540, 990, 1.85], [8.97, 540, 975, 2.0]], noHud: 1,
  draw() { setLuxGarage({ blur: 10 }); jn(540, FLOOR + 170, 1.05, { pose: [[0, 'laughBelly']], emo: [[0, 'laugh']], tilt: [[7.41, 0.07], [7.8, -0.07], [8.2, 0.06], [8.6, -0.05]] }); },
  ui() { popText('HAHAHA', 540, 430, 7.5, 96, '#ffe14d', -0.05, 10); },
  sfx: [[7.5, 'boing'], [8.0, 'popHi', 1.1]] });
// ---- 7 · "Eine Million an einem Tag?" — one finger up, mocking
S(8.97, { tr: 'push', lift: 0, cam: WIDEC(8.97, 10.81, 1080, 1.1, 1.18), noHud: 1,
  draw() { setLuxGarage({ blur: 4 }); supercar(830, 1420, 0.55, { col: '#ffffff' }); jn(380, FLOOR + 60, 0.95, { pose: [[0, 'pointUpR']], emo: [[8.97, 'smug'], [9.8, 'laugh']], look: [0.4, -0.2] }); },
  ui() { fact('1 MIO. AN 1 TAG?', 9.4, 540, 450, { size: 64, bg: '#141026' }); },
  sfx: [[9.0, 'swish', 1.1], [9.4, 'pop', 1]] });
// ---- 8 · "Das schaffst du nie!" — close, the finger at the lens, a stamp: NIEMALS
S(10.81, { tr: 'zoomIn', cam: CLOSE(10.81, 11.98), punch: [[11.2, 0.08]], noHud: 1,
  draw() { setLuxGarage({ blur: 10 }); jn(540, FLOOR + 170, 1.05, { pose: [[0, 'pointR']], emo: [[0, 'smug']] }); },
  ui() { stampMark('NIEMALS', 11.3, 540, 450, '#ff2e4d', 100); },
  sfx: [[11.3, 'stamp', 1.2]] });
// ---- 9 · "Kevin grinst nur:" — Kevin, calm, a slow grin
S(11.98, { tr: 'whipL', cam: CLOSE(11.98, 13.03), noHud: 1,
  draw() { setNightStreet({ blur: 10 }); kv(540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[11.98, 'calm'], [12.4, 'smug']], tilt: [[11.98, 0], [12.5, 0.06]] }); if (TT > 12.5 && TT < 13) sparkle(470, 940, 40 * (1 - (TT - 12.5) * 2), '#fff', TT * 6); },
  sfx: [[12.5, 'ting']] });
// ---- 10 · "Wetten, dass doch?" — handshake, both grinning, "DEAL"
S(13.03, { tr: 'flash', lift: 0, cam: WIDEC(13.03, 13.98, 1100, 1.15, 1.22), noHud: 1,
  draw() { setNightStreet({ blur: 4 }); kv(360, FLOOR + 40, 0.9, { pose: [[0, 'offerR']], emo: [[0, 'grin']], look: [0.6, 0] }); jn(720, FLOOR + 40, 0.9, { pose: [[0, 'offerR']], flip: 1, emo: [[0, 'smug']], look: [-0.6, 0] }); },
  ui() { fact('DEAL 🤝', 13.35, 540, 460, { size: 80, bg: '#ffb020', fg: '#1b1530' }); },
  sfx: [[13.3, 'pat'], [13.35, 'stamp']] });

// =====================================================================  THE CLOCK RUNS
// ---- 11 · "Punkt Mitternacht läuft die Uhr." — the clock tower strikes 12, the HUD drops in
S(13.98, { tr: 'zoomOut', lift: 0, raise: 40, cam: [[13.98, 540, 980, 1.0], [15.41, 540, 960, 1.1]], shake: [[14.05, 14, 0.6]],
  draw() { setDark('#141a3a', '#04030c'); const R = RNG('st'); for (let i = 0; i < 50; i++) circ(R.f() * 1300 - 100, R.f() * 1600 - 300, 2 + R.f() * 2, 'rgba(255,255,255,0.6)'); fillRR(340, 500, 400, 1300, 10, '#2a2d44'); poly([[320, 500], [540, 260], [760, 500]], '#1d2034'); circ(540, 760, 170, '#f4efe0'); clockFace(540, 760, 160, 12 + clamp((TT - 13.98) / 0.3) * 0.0); glow(540, 760, 300, '#fff1c0', 0.2 + 0.2 * Math.sin(TT * 8)); },
  ui() { fact('00:00 UHR · LOS!', 14.3, 540, 1200, { size: 66, bg: '#18a34a' }); },
  sfx: [[14.0, 'choir'], [14.05, 'doorbell'], [14.3, 'startGun']] });
// ---- 12 · "Kevin rennt sofort zum Autohaus" — Kevin sprints through the night city
S(15.41, { tr: 'whipL', lift: 0, cam: WIDEC(15.41, 17.14, 1120, 1.15, 1.25),
  draw() { setNightStreet({ blur: 2 }); speedLines(30, 0.4, 's12'); const x = lerp(-120, 700, (TT - 15.41) / 1.7); kv(x, FLOOR + 40, 0.85, { walk: 1.6, emo: [[0, 'grin']], lean: 0.12 }); },
  ui() { info('SOFORT ZUM AUTOHAUS 🏃', 15.6, { size: 48 }); },
  sfx: [[15.45, 'footsteps', 1.6], [15.6, 'pop', 1], [16.4, 'carHorn']] });
// ---- 13 · "…und kauft einen Lamborghini" — spotlights reveal a yellow Lamborghini
S(17.14, { tr: 'iris', lift: 0, cam: WIDEC(17.14, 18.35, 1120, 1.0, 1.08),
  draw() { setShowroom(); const k = clamp((TT - 17.2) / 0.4); ctx.save(); ctx.globalAlpha = 0.3 + 0.7 * k; supercar(540, 1440, 0.95, { col: '#ffb800' }); ctx.restore(); glow(540, 1250, 520, '#fff1c0', 0.3 * k); },
  ui() { fact('LAMBORGHINI', 17.5, 540, 460, { size: 76, bg: '#ffb800', fg: '#1b1530' }); fact('0–100: 2,9 S', 17.9, 540, 580, { size: 44, bg: '#141026', rot: 0.04 }); },
  sfx: [[17.2, 'powerOn'], [17.5, 'engine'], [17.9, 'pop', 1.2]] });
// ---- 14 · "…für 250.000 Euro." — card on the terminal: paid; the price slams
S(18.35, { tr: 'cut', lift: 0, cam: [[18.35, 540, 1000, 1.0], [20.24, 540, 980, 1.08]], punch: [[19.0, 0.07]],
  draw() { setShowroom({ blur: 8 }); payTerminal(540, 1130, 1.25, TT > 19.0 ? 'ok' : 'pay', '250.000 €'); const cy = lerp(700, 860, EZ.o3(clamp((TT - 18.5) / 0.4))); creditCard(560, cy, 0.9, -0.15); },
  ui() { price('250.000 €', 19.0, 470); },
  sfx: [[18.6, 'whoosh', 1.2], [18.95, 'beep', 1.6], [19.0, 'cashReg']] });
// ---- 15 · "Gleich danach holt er sich eine Rolex" — a velvet box opens: the Rolex glitters
S(20.24, { tr: 'ink', lift: 0, cam: [[20.24, 540, 1020, 1.05], [21.69, 540, 1000, 1.2]],
  draw() { setDark('#3a2a10', '#0a0604'); glow(540, 1000, 500, '#ffd27a', 0.3); velvetBox(540, 1200, 1.2, clamp((TT - 20.4) / 0.4), clamp((TT - 20.6) / 0.3)); if (TT > 20.6) { const k = springEase(TT - 20.6, 260, 13); ctx.save(); ctx.translate(540, 1000); ctx.scale(k * 0.32, k * 0.32); diamondRolex(0, 0, 1.0, TT); ctx.restore(); twinkles('t15', 380, 800, 320, 320, 8, { s: 26 }); } },
  ui() { fact('ROLEX ⌚', 20.7, 540, 460, { size: 72, bg: '#1f6a4a' }); },
  sfx: [[20.4, 'creak', 2.2], [20.6, 'bling'], [20.7, 'pop', 1]] });
// ---- 16 · "…für 50.000." — Kevin admires it on his wrist
S(21.69, { tr: 'whipU', cam: CLOSE(21.69, 23.09), punch: [[22.0, 0.07]],
  draw() { setShowroom({ blur: 10 }); kv(540, FLOOR + 170, 1.05, { pose: [[0, 'raiseR']], emo: [[0, 'love']], look: [0.5, -0.5], holdR: () => { circ(0, 0, 30, '#d9a520'); circ(0, 0, 20, '#1b1530'); sparkle(20, -30, 18 * (0.5 + 0.5 * Math.sin(TT * 9)), '#fff'); } }); },
  ui() { price('50.000 €', 22.0, 470); },
  sfx: [[22.0, 'cashReg'], [22.3, 'ting']] });

// =====================================================================  SABOTAGE 1: THE CARD
// ---- 17 · "Doch Jonas hat einen Plan:" — dark room, Jonas rubs his hands, a red light
S(23.09, { tr: 'glitch', tense: 1, cam: CLOSE(23.09, 24.83),
  draw() { setDark('#4a0a2a', '#05020a', { cone: 1 }); jn(540, FLOOR + 170, 1.05, { pose: [[0, 'holdBoth']], emo: [[0, 'smug']], look: [0, 0.2] }); glow(540, 700, 400, '#ff2e4d', 0.15 + 0.08 * Math.sin(TT * 4)); },
  ui() { fact('JONAS HAT EINEN PLAN 😈', 23.4, 540, 430, { size: 54, bg: '#7b3fe4' }); },
  sfx: [[23.15, 'dun'], [23.4, 'whoosh', 0.9], [24.0, 'tension', 0.8]] });
// ---- 18 · "Er ruft bei der Bank an" — phone to the ear, the screen: BANK HOTLINE
S(24.83, { tr: 'slide', lift: 0, cam: [[24.83, 540, 1040, 1.25], [25.96, 540, 1020, 1.35]],
  draw() { setDark('#2a0a2a', '#05020a'); jn(380, FLOOR + 80, 0.95, { pose: [[0, 'phoneR']], emo: [[0, 'smug']], look: [0.4, 0] }); phone(790, 1060, 0.95, 0.06, () => { ctx.fillStyle = '#c0392b'; ctx.fillRect(-84, -176, 168, 352); tText('BANK', 0, -70, 34, { color: '#fff', shadow: false }); tText('HOTLINE', 0, -30, 20, { color: '#fff', shadow: false }); circ(0, 90, 30, '#41f08a'); }); },
  ui() { info('ANRUF BEI DER BANK 📞', 25.0, { size: 48 }); },
  sfx: [[24.9, 'ringtone'], [25.0, 'pop', 1]] });
// ---- 19 · "…und lässt Kevins Karte sperren." — the card, a padlock slams onto it: GESPERRT
S(25.96, { tr: 'cut', lift: 0, cam: [[25.96, 540, 1000, 1.0], [27.6, 540, 990, 1.1]], shake: [[26.8, 18, 0.4]],
  draw() { rays('#5a0a14', '#a8142a', { cy: 1000, spin: 0.2 }); creditCard(540, 1000, 2.0, -0.08); if (TT > 26.8) { const k = springEase(TT - 26.8, 300, 12); ctx.save(); ctx.translate(540, 1000); ctx.scale(k, k); padlock(0, 0, 1.2); ctx.restore(); } },
  ui() { stampMark('GESPERRT', 26.85, 540, 480, '#ff2e4d', 80); },
  sfx: [[26.4, 'click'], [26.8, 'slam'], [26.85, 'stamp']] });
// ---- 20 · "Kevin will an der Kasse bezahlen," — at the till, card in hand
S(27.6, { tr: 'whipR', lift: 0, cam: WIDEC(27.6, 29.22, 1080, 1.15, 1.25),
  draw() { setKiosk(); kv(420, FLOOR + 60, 0.95, { pose: [[0, 'offerR']], emo: [[0, 'happy']], look: [0.5, 0.2], holdR: () => creditCard(0, -10, 0.3, 0.3) }); payTerminal(800, 1260, 0.7, 'pay', '1.200 €'); },
  ui() { info('AN DER KASSE 🛒', 27.7, { size: 48 }); },
  sfx: [[27.7, 'pop', 1], [28.6, 'beep', 1.4]] });
// ---- 21 · "abgelehnt." — red cross
S(29.22, { tr: 'cut', lift: 0, raise: 30, cam: [[29.22, 540, 980, 1.0], [29.96, 540, 970, 1.06]], shake: [[29.25, 14, 0.3]],
  draw() { setKiosk({ blur: 10 }); payTerminal(540, 1050, 1.5, 'no'); },
  ui() { stampMark('ABGELEHNT', 29.3, 540, 440, '#ff2e4d', 92); },
  sfx: [[29.25, 'declined'], [29.3, 'errorBuzz']] });
// ---- 22 · "Mit dem Handy," — he holds his phone to the terminal
S(29.96, { tr: 'rgb', lift: 0, cam: [[29.96, 540, 1000, 1.1], [30.72, 540, 990, 1.16]],
  draw() { setKiosk({ blur: 8 }); payTerminal(700, 1150, 1.1, 'load'); phone(380, 900, 1.0, 0.25, () => { ctx.fillStyle = '#111'; ctx.fillRect(-84, -176, 168, 352); fillRR(-70, -60, 140, 90, 12, '#14a39a'); tText('PAY', 0, -14, 26, { color: '#fff', shadow: false }); }); },
  ui() { info('MIT DEM HANDY 📱', 30.0, { size: 48 }); },
  sfx: [[30.0, 'phoneTap'], [30.3, 'beep', 1.2]] });
// ---- 23 · "wieder abgelehnt." — red again, Kevin's shocked face
S(30.72, { tr: 'zoomIn', cam: CLOSE(30.72, 31.78), shake: [[30.8, 12, 0.3]],
  draw() { setKiosk({ blur: 10 }); kv(540, FLOOR + 170, 1.05, { pose: [[0, 'headGrab']], emo: [[0, 'shock']], extras: { sweat: 1 } }); },
  ui() { stampMark('WIEDER ABGELEHNT', 30.8, 540, 440, '#ff2e4d', 70); },
  sfx: [[30.78, 'declined'], [30.8, 'gasp']] });
// ---- 24 · "Drei Stunden lang kann er gar nichts kaufen," — on the kerb, the clock races 3 hours forward
S(31.78, { tr: 'blinds', lift: 0, cam: WIDEC(31.78, 34.24, 1100, 1.15, 1.22),
  draw() { setStreet({ blur: 3 }); kv(540, FLOOR + 40, 0.95, { pose: [[0, 'sad']], emo: [[0, 'sad']], look: [0, 0.4] }); ctx.save(); ctx.translate(820, 780); clockFace(0, 0, 120, 1 + clamp((TT - 31.9) / 2.2) * 3); ctx.restore(); },
  ui() { fact('3 STUNDEN NICHTS 😩', 32.0, 540, 450, { size: 58, bg: '#141026' }); },
  sfx: [[31.9, 'clockSpin', 2.2], [32.0, 'pop', 1], [33.4, 'sadTrombone', 0.6]] });
// ---- 25 · "…und Jonas schaut ihm dabei mit Popcorn zu." — Jonas on a bench, popcorn, laughing
S(34.24, { tr: 'slash', cam: [[34.24, 540, 1040, 1.3], [36.45, 540, 1020, 1.4]],
  draw() { setStreet({ blur: 6 }); fillRR(200, 1420, 680, 40, 10, '#8a5a3a'); fillRR(220, 1460, 30, 140, 8, '#5a3a24'); fillRR(830, 1460, 30, 140, 8, '#5a3a24');
    jn(540, FLOOR + 60, 0.95, { pose: [[0, 'holdR'], [34.9, 'drinkR', 0.15], [35.2, 'holdR', 0.15], [35.6, 'drinkR', 0.15], [35.9, 'holdR', 0.15]], emo: [[0, 'laugh']], holdL: () => popcorn(0, 60, 0.45) }); },
  ui() { fact('🍿 POPCORN-TIME', 34.6, 540, 450, { size: 58, bg: '#ffb020', fg: '#1b1530' }); },
  sfx: [[34.6, 'pop', 1], [34.9, 'crunch'], [35.6, 'crunch'], [35.3, 'boing']] });

// =====================================================================  MONACO
// ---- 26 · "Als die Karte endlich wieder funktioniert," — green tick, Kevin cheers
S(36.45, { tr: 'flash', lift: 0, cam: [[36.45, 540, 1040, 1.05], [38.57, 540, 1020, 1.15]],
  draw() { rays('#0f5a2a', '#24a24c', { cy: 900, spin: 0.25 }); payTerminal(720, 1180, 0.95, 'ok'); kv(330, FLOOR + 60, 0.9, { pose: [[36.45, 'idle'], [37.3, 'cheer', 0.2]], emo: [[36.45, 'calm'], [37.3, 'laugh']], jump: [[0, 0], [37.3, 60, 0.15], [37.6, 0, 0.2]] }); },
  ui() { fact('KARTE GEHT WIEDER ✅', 37.2, 540, 450, { size: 56, bg: '#18a34a' }); },
  sfx: [[37.15, 'buzzerWin'], [37.3, 'applause', 0.6]] });
// ---- 27 · "bucht Kevin einen Privatjet nach Monaco" — on the runway, the jet; a map line to Monaco
S(38.57, { tr: 'push', lift: 0, cam: WIDEC(38.57, 40.71, 1080, 1.0, 1.08),
  draw() { setAirfield(); privateJet(540, 1250, 1.0); kv(260, FLOOR + 20, 0.6, { pose: [[0, 'waveR']], emo: [[0, 'grin']] }); },
  ui() { fact('PRIVATJET ✈️', 38.9, 540, 450, { size: 70, bg: '#1d3fb0' }); fact('→ MONACO 🇲🇨', 39.6, 540, 575, { size: 52, bg: '#ffffff', fg: '#c0392b', edge: '#c0392b' }); },
  sfx: [[38.7, 'rotor'], [38.9, 'pop', 1], [39.6, 'whoosh', 1.1]] });
// ---- 28 · "…und zurück für 100.000." — the jet takes off over the clouds
S(40.71, { tr: 'whipU', lift: 0, cam: [[40.71, 540, 960, 1.0], [42.41, 540, 940, 1.08]],
  draw() { ctx.fillStyle = lin(0, -400, 0, 2000, [[0, '#2f6df6'], [1, '#bfe4ff']]); ctx.fillRect(-600, -400, 2300, 2600); for (let i = 0; i < 8; i++) { const x = ((i * 260 - TT * 400) % 1600 + 1600) % 1600 - 300; ell(x, 1300 + (i % 3) * 120, 240, 70, 'rgba(255,255,255,0.9)'); } privateJet(540, 980 - (TT - 40.71) * 60, 0.95, -0.12); speedLines(18, 0.3, 's28'); },
  ui() { price('100.000 €', 41.5, 470); },
  sfx: [[40.75, 'rocket', 1.4], [41.5, 'cashReg']] });
// ---- 29 · "Dort nimmt er die teuerste Hotelsuite der Stadt" — Monaco at sunset, the yachts, the casino
S(42.41, { tr: 'zoomOut', lift: 0, cam: WIDEC(42.41, 44.28, 1080, 1.0, 1.08),
  draw() { setMonaco(); },
  ui() { fact('DIE TEUERSTE SUITE 🏨', 43.2, 540, 700, { size: 56, bg: '#d9a520', fg: '#1b1530' }); },
  sfx: [[42.5, 'waves', 1.2], [42.7, 'birds', 0.7], [43.2, 'pop', 1]] });
// ---- 30 · "…für 30.000 Euro," — the suite: a chandelier, the view, gold
S(44.28, { tr: 'ink', lift: 0, cam: WIDEC(44.28, 46.08, 1080, 1.0, 1.08),
  draw() { setSuite(); kv(540, FLOOR + 60, 0.75, { pose: [[0, 'armsUp']], emo: [[0, 'laugh']] }); },
  ui() { price('30.000 €', 44.9, 470); },
  sfx: [[44.35, 'doorbell'], [44.9, 'cashReg'], [45.3, 'ting']] });
// ---- 31 · "nur für eine Nacht." — he jumps onto the bed; "1 NACHT"
S(46.08, { tr: 'cut', lift: 0, cam: [[46.08, 540, 1120, 1.25], [47.34, 540, 1100, 1.32]],
  draw() { setSuite({ blur: 2 }); kv(540, 1240, 0.7, { pose: [[0, 'armsUp']], emo: [[0, 'laugh']], jump: [[0, 0], [46.2, 180, 0.2], [46.5, 0, 0.2], [46.8, 120, 0.2], [47.1, 0, 0.2]] }); },
  ui() { fact('NUR 1 NACHT 🌙', 46.2, 540, 450, { size: 62, bg: '#141026' }); },
  sfx: [[46.4, 'hop'], [46.6, 'boing'], [47.0, 'hop']] });
// ---- 32 · "Und weil das immer noch nicht reicht," — Kevin checks the money left, shrugs
S(47.34, { tr: 'rgb', cam: CLOSE(47.34, 48.92),
  draw() { setSuite({ blur: 10 }); kv(540, FLOOR + 170, 1.05, { pose: [[0, 'phoneR']], emo: [[47.34, 'confused'], [48.2, 'grin']], holdR: () => phone(0, -30, 0.32, 0.15, () => { ctx.fillStyle = '#0e1a2e'; ctx.fillRect(-84, -176, 168, 352); tText('NOCH', 0, -40, 18, { color: '#9fb4d8', shadow: false }); tText('570.000 €', 0, 0, 24, { color: '#41f08a', shadow: false }); }) }); },
  ui() { fact('NOCH 570.000 € 😬', 47.5, 540, 430, { size: 56, bg: '#18a34a' }); },
  sfx: [[47.5, 'notify'], [48.2, 'swish', 1]] });
// ---- 33 · "…schmeißt er eine riesige Party" — the club: lasers, DJ, crowd
S(48.92, { tr: 'flash', lift: 0, raise: 0, cam: [[48.92, 540, 960, 1.0], [50.64, 540, 950, 1.06]],
  draw() { setClubInterior(48.92); for (const [id, x] of [['mia', 180], ['lea', 900], ['zoe', 360], ['dani', 720]]) char(id, x, 1820, 0.55, { pose: [[0, 'armsUp']], emo: [[0, 'laugh']], jump: [[0, 0], [49.0 + (x % 7) * 0.05, 40, 0.15], [49.3 + (x % 7) * 0.05, 0, 0.15], [49.8, 40, 0.15], [50.1, 0, 0.15]] }); kv(540, 1780, 0.7, { pose: [[0, 'cheer']], emo: [[0, 'laugh']] }); confetti('c33', 49.0, 60); },
  ui() { fact('RIESIGE PARTY 🎉', 49.4, 540, 450, { size: 64, bg: '#ff4fa3' }); },
  sfx: [[48.95, 'bassDrop'], [49.2, 'applause', 1.4], [49.4, 'pop', 1]] });
// ---- 34 · "…für 200.000." — champagne tower, the price
S(50.64, { tr: 'slash', lift: 0, raise: 0, cam: [[50.64, 540, 980, 1.1], [51.95, 540, 970, 1.18]], punch: [[51.1, 0.07]],
  draw() { setClubInterior(48.92); for (let r = 0; r < 4; r++) for (let i = 0; i <= r; i++) champGlass(540 + (i - r / 2) * 110, 900 + r * 170, 0.7, 0.9); champBottle(540, 760, 0.7, 2.6, { spray: 1 }); },
  ui() { price('200.000 €', 51.1, 470); },
  sfx: [[50.7, 'glassClink'], [51.1, 'cashReg'], [51.3, 'slurp', 0.8]] });

// =====================================================================  SABOTAGE 2: THE CLOCKS
// ---- 35 · "Aber Jonas ist ihm heimlich gefolgt." — Jonas behind a palm, sunglasses, sneaking
S(51.95, { tr: 'glitch', tense: 1, lift: 0, cam: WIDEC(51.95, 54.14, 1080, 1.1, 1.2),
  draw() { setMonaco({ night: 1, blur: 3 }); jn(560, FLOOR + 40, 0.95, { pose: [[0, 'holdBoth']], emo: [[0, 'smug']], extras: { shades: 1 }, look: [0.6, 0], lean: 0.1 }); for (let i = 0; i < 7; i++) ell(360 + Math.cos(i) * 40, 760 + i * 70, 140, 26, '#2f9e57', -0.4 + i * 0.12); fillRR(330, 760, 50, 900, 20, '#7a4a2a'); },
  ui() { fact('JONAS IST IHM GEFOLGT 👀', 52.3, 540, 450, { size: 54, bg: '#7b3fe4' }); },
  sfx: [[52.0, 'dun'], [52.3, 'pizzSneak'], [53.2, 'footsteps', 0.6]] });
// ---- 36 · "Er schleicht sich auf die Party" — tiptoeing through the crowd
S(54.14, { tr: 'whipL', lift: 0, raise: 0, cam: [[54.14, 540, 980, 1.05], [55.59, 560, 970, 1.12]],
  draw() { setClubInterior(48.92); const x = lerp(160, 620, (TT - 54.14) / 1.45); jn(x, 1760, 0.7, { walk: 0.5, pose: [[0, 'holdBoth']], emo: [[0, 'smug']], extras: { shades: 1 }, lean: 0.15 }); for (const [id, xx] of [['mia', 880], ['lea', 300]]) char(id, xx, 1840, 0.6, { pose: [[0, 'armsUp']], emo: [[0, 'laugh']] }); },
  ui() { info('HEIMLICH… 🤫', 54.3, { size: 52 }); },
  sfx: [[54.2, 'pizzSneak'], [54.3, 'pop', 0.8]] });
// ---- 37 · "…und stellt alle Uhren eine Stunde vor." — his finger spins the wall clock forward; the HUD jumps
S(55.59, { tr: 'zoomIn', lift: 0, raise: 30, cam: [[55.59, 540, 960, 1.0], [57.9, 540, 950, 1.1]], shake: [[56.6, 12, 0.5]],
  draw() { setClubInterior(48.92); ctx.fillStyle = 'rgba(0,0,0,0.45)'; ctx.fillRect(-600, -400, 2300, 2800); circ(540, 960, 330, '#f4efe0'); clockFace(540, 960, 310, 3 + clamp((TT - 55.8) / 0.8) * 1); fingerPoke(760, 760, TT); },
  ui() { fact('+1 STUNDE VORGESTELLT ⏩', 56.6, 540, 1310, { size: 50, bg: '#ff2e4d' }); },
  sfx: [[55.8, 'ratchet'], [56.2, 'ratchet'], [56.6, 'glitch'], [56.65, 'shockHit']] });
function fingerPoke(x, y, t) { const L = LOOKS.jonas, w = 120; line(x + 300, y - 200, x, y, w, L.top); circ(x, y, w * 0.5, L.skin); fillRR(x - 70, y - 14, 70, 28, 14, L.skin); }
// ---- 38 · "Kevin gerät in Panik" — Kevin sees the HUD, panics, sweat
S(57.9, { tr: 'rgb', tense: 1, cam: [[57.9, 540, 990, 1.85], [59.53, 540, 975, 2.0]], shake: [[58.0, 10, 1.4]],
  draw() { setClubInterior(48.92); kv(540, FLOOR + 170, 1.05, { pose: [[0, 'headGrab']], emo: [[0, 'scared']], extras: { sweat: 1 } }); },
  ui() { popText('PANIK!! 😱', 540, 440, 58.0, 96, '#ff4545', -0.06, 0); },
  sfx: [[58.0, 'siren'], [58.05, 'gasp'], [58.6, 'heartbeat', 1.0]] });
// ---- 39 · "…und kauft in letzter Sekunde eine Diamantkette" — a jeweller's case, the necklace sparkles
S(59.53, { tr: 'blinds', lift: 0, cam: [[59.53, 540, 1020, 1.0], [61.87, 540, 1000, 1.1]],
  draw() { setDark('#1a1a3a', '#040410', { cone: 1 }); fillRR(200, 1200, 680, 200, 20, '#2a2d44'); ctx.save(); ctx.translate(540, 1000); const k = springEase(TT - 59.8, 240, 12); ctx.scale(k, k); diamondNecklace(0, 0, 1.0); ctx.restore(); twinkles('t39', 300, 700, 480, 400, 10, { s: 28 }); },
  ui() { fact('DIAMANTKETTE 💎', 60.0, 540, 450, { size: 64, bg: '#52b8ff', fg: '#0b1a33' }); fact('IN LETZTER SEKUNDE', 60.6, 540, 570, { size: 44, bg: '#141026', rot: 0.04 }); },
  sfx: [[59.8, 'sparkle'], [60.0, 'bling'], [60.6, 'pop', 1.2]] });
// ---- 40 · "…für 100.000." — the price; the necklace on Kevin
S(61.87, { tr: 'cut', cam: CLOSE(61.87, 62.73), punch: [[62.0, 0.08]],
  draw() { setDark('#1a1a3a', '#040410'); kv(540, FLOOR + 170, 1.05, { emo: [[0, 'grin']], extras: { chain: 1 } }); },
  ui() { price('100.000 €', 62.0, 470); },
  sfx: [[62.0, 'cashReg']] });
// ---- 41 · "Erst dann merkt er den Trick:" — his phone shows the real time, the wall clock is wrong: a lightbulb
S(62.73, { tr: 'push', lift: 0, cam: [[62.73, 540, 1000, 1.05], [64.21, 540, 980, 1.15]],
  draw() { setClubInterior(48.92); ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(-600, -400, 2300, 2800); circ(300, 760, 150, '#f4efe0'); clockFace(300, 760, 140, 4); phone(760, 900, 0.95, 0.08, () => { ctx.fillStyle = '#0e1a2e'; ctx.fillRect(-84, -176, 168, 352); tText('03:00', 0, -40, 44, { color: '#fff', shadow: false }); tText('ECHTE ZEIT', 0, 10, 14, { color: '#9fb4d8', shadow: false }); });
    if (TT > 63.4) { const k = springEase(TT - 63.4, 300, 12); ctx.save(); ctx.translate(540, 520); ctx.scale(k, k); glow(0, 0, 160, '#ffe14d', 0.6); circ(0, 0, 60, '#ffe14d'); fillRR(-26, 50, 52, 40, 8, '#c0c6d6'); ctx.restore(); } },
  ui() { fact('DIE UHR LÜGT!', 63.4, 540, 1240, { size: 58, bg: '#ff2e4d' }); },
  sfx: [[62.8, 'tick'], [63.1, 'tick'], [63.4, 'ding']] });
// ---- 42 · "Netter Versuch, Jonas!" — Kevin points at Jonas, caught red-handed in the crowd
S(64.21, { tr: 'whipR', lift: 0, raise: 0, cam: [[64.21, 540, 980, 1.05], [65.6, 540, 970, 1.12]],
  draw() { setClubInterior(48.92); kv(330, 1780, 0.8, { pose: [[0, 'pointR']], emo: [[0, 'smug']], look: [0.6, 0] }); jn(790, 1780, 0.8, { pose: [[0, 'shrug']], emo: [[0, 'shock']], extras: { shades: 0, sweat: 1 }, look: [-0.6, 0] }); },
  ui() { fact('NETTER VERSUCH! 😎', 64.3, 540, 450, { size: 60, bg: '#14a39a' }); },
  sfx: [[64.3, 'recordScratch'], [64.6, 'pop', 1.1]] });
// ---- 43 · "Jetzt hat Kevin sogar eine Stunde mehr," — the HUD +1:00:00, Kevin relaxed
S(65.6, { tr: 'zoomOut', lift: 0, cam: [[65.6, 540, 1040, 1.1], [67.35, 540, 1020, 1.2]],
  draw() { rays('#0f5a2a', '#24a24c', { cy: 900, spin: 0.25 }); kv(540, FLOOR + 60, 0.95, { pose: [[0, 'hips']], emo: [[0, 'smug']] }); },
  ui() { fact('+1 STUNDE GESCHENKT 🎁', 65.9, 540, 450, { size: 54, bg: '#18a34a' }); },
  sfx: [[65.7, 'grow'], [65.9, 'bling']] });
// ---- 44 · "…und kauft sich noch eine goldene PS5" — a golden PS5 rises on a pedestal, light rays
S(67.35, { tr: 'iris', lift: 0, cam: [[67.35, 540, 1000, 1.0], [70.03, 540, 980, 1.1]],
  draw() { rays('#8a6400', '#e8b400', { cy: 900, spin: 0.3 }); fillRR(340, 1300, 400, 300, 20, '#1b1530'); ctx.save(); const k = springEase(TT - 67.5, 220, 12); ctx.translate(540, 1300 + (1 - k) * 400); goldPS5(0, 0, 1.0); ctx.restore(); twinkles('t44', 300, 600, 480, 600, 12, { s: 26 }); },
  ui() { fact('GOLDENE PS5 🎮', 68.0, 540, 450, { size: 66, bg: '#d9a520', fg: '#1b1530' }); },
  sfx: [[67.5, 'whooshUp', 1.1], [67.9, 'choir'], [68.0, 'bling']] });
// ---- 45 · "…für 20.000 Euro." — Kevin hugs it
S(70.03, { tr: 'cut', cam: CLOSE(70.03, 71.27), punch: [[70.2, 0.07]],
  draw() { rays('#8a6400', '#e8b400', { cy: 900, spin: 0.2 }); kv(540, FLOOR + 170, 1.05, { pose: [[0, 'holdBoth']], emo: [[0, 'love']], extras: { chain: 1 } }); },
  ui() { price('20.000 €', 70.2, 470); },
  sfx: [[70.2, 'cashReg'], [70.6, 'kiss']] });

// =====================================================================  THE LAST 20 MINUTES
// ---- 46 · "Zurück in Deutschland" — the jet lands at dusk, a German sign
S(71.27, { tr: 'whipL', lift: 0, cam: WIDEC(71.27, 72.18, 1080, 1.0, 1.06),
  draw() { setBerlin(); privateJet(lerp(1200, 560, EZ.o3(clamp((TT - 71.27) / 0.8))), 760, 0.55, 0.1); },
  ui() { fact('ZURÜCK IN DEUTSCHLAND 🇩🇪', 71.4, 540, 450, { size: 52, bg: '#141026' }); },
  sfx: [[71.3, 'planeWhoosh', 0.9], [71.4, 'pop', 1]] });
// ---- 47 · "…bleiben nur noch 20 Minuten." — the LED board, red: 00:20:00
S(72.18, { tr: 'glitch', tense: 1, lift: 0, raise: 0, cam: [[72.18, 540, 900, 1.0], [73.92, 540, 900, 1.1]], shake: [[72.3, 12, 0.5]], noHud: 1,
  draw() { setDark('#4a0a12', '#05030a'); ledBoard(540, 900, 1.15, secsLeft()); },
  ui() { stampMark('NUR NOCH 20 MIN!', 72.4, 540, 1250, '#ff4545', 70, 0.04); },
  sfx: [[72.2, 'alarmRing', 0.6], [72.4, 'stamp'], [73.0, 'tickRun', 0.9]] });
// ---- 48 · "Kevin rennt zum letzten Autohaus, das noch offen hat." — night sprint, a showroom with "OFFEN" in the distance
S(73.92, { tr: 'slash', lift: 0, cam: WIDEC(73.92, 76.5, 1120, 1.1, 1.22),
  draw() { setNightStreet({ blur: 1 }); speedLines(30, 0.45, 's48'); ctx.save(); ctx.translate(880, 1260); glassDoor(0, 0, 0.5, 'OFFEN'); ctx.restore(); kv(lerp(-80, 560, (TT - 73.92) / 2.6), FLOOR + 40, 0.85, { walk: 1.8, emo: [[0, 'serious']], lean: 0.14, extras: { sweat: 1 } }); },
  ui() { fact('LETZTES AUTOHAUS · OFFEN', 74.4, 540, 450, { size: 50, bg: '#18a34a' }); },
  sfx: [[73.95, 'footsteps', 2.4], [74.4, 'pop', 1], [75.5, 'breath']] });
// ---- 49 · "Doch Jonas steht schon vor der Tür:" — Jonas in front of the glass door, arms crossed
S(76.5, { tr: 'cut', lift: 0, cam: WIDEC(76.5, 78.27, 1100, 1.1, 1.18),
  draw() { setNightStreet({ blur: 4 }); glassDoor(540, 1540, 1.0, 'OFFEN'); jn(540, FLOOR + 60, 0.9, { pose: [[0, 'armsCross']], emo: [[0, 'smug']] }); },
  ui() { info('JONAS IST SCHON DA 😈', 76.6, { size: 50, y: 440 }); },
  sfx: [[76.55, 'dun'], [76.6, 'pop', 1]] });
// ---- 50 · "Sorry, die haben gerade zugemacht!" — he flips the sign: GESCHLOSSEN
S(78.27, { tr: 'push', cam: [[78.27, 540, 1000, 1.45], [80.08, 540, 980, 1.55]],
  draw() { setNightStreet({ blur: 6 }); glassDoor(540, 1540, 1.0, 'OFFEN', clamp((TT - 78.7) / 0.3)); jn(400, FLOOR + 60, 0.9, { pose: [[78.27, 'idle'], [78.6, 'raiseR', 0.12]], emo: [[78.27, 'smug'], [79.0, 'laugh']], look: [0.5, -0.3] }); },
  ui() { stampMark('GESCHLOSSEN', 79.0, 540, 440, '#ff2e4d', 84); },
  sfx: [[78.7, 'flip'], [79.0, 'stamp'], [79.4, 'boing']] });
// ---- 51 · "Kevin klopft so lange gegen die Scheibe," — knocking, the glass shakes
S(80.08, { tr: 'rgb', lift: 0, cam: [[80.08, 540, 1060, 1.2], [82.46, 540, 1040, 1.3]], shake: [[80.4, 8, 0.2], [80.8, 8, 0.2], [81.2, 8, 0.2], [81.6, 8, 0.2], [82.0, 8, 0.2]],
  draw() { setNightStreet({ blur: 6 }); kv(540, FLOOR + 60, 0.95, { pose: [[80.08, 'raiseR'], [80.35, 'pressR', 0.06], [80.55, 'raiseR', 0.06], [80.75, 'pressR', 0.06], [80.95, 'raiseR', 0.06], [81.15, 'pressR', 0.06], [81.35, 'raiseR', 0.06], [81.55, 'pressR', 0.06]], emo: [[0, 'angry']], extras: { sweat: 1 } }); ctx.save(); ctx.fillStyle = 'rgba(160,210,255,0.22)'; ctx.fillRect(-600, -400, 2300, 2800); line(80, 300, 220, 900, 10, 'rgba(255,255,255,0.4)'); ctx.restore(); },
  ui() { popText('KLOPF! KLOPF! KLOPF!', 540, 440, 80.4, 70, '#ffffff', -0.04, 0); },
  sfx: [[80.4, 'knock'], [80.8, 'knock'], [81.2, 'knock'], [81.6, 'knock'], [82.0, 'knock']] });
// ---- 52 · "…bis der Verkäufer doch noch aufmacht." — the door opens, the salesman with keys
S(82.46, { tr: 'ink', lift: 0, cam: WIDEC(82.46, 83.9, 1100, 1.05, 1.12),
  draw() { setShowroom({ blur: 3 }); glassDoor(540, 1540, 1.0, 'GESCHLOSSEN', 0, clamp((TT - 82.6) / 0.5)); char('seller', 540, FLOOR + 60, 0.85, { pose: [[0, 'waveR']], emo: [[0, 'happy']] }); },
  ui() { info('DER VERKÄUFER MACHT AUF 🔑', 82.6, { size: 46, y: 440 }); },
  sfx: [[82.6, 'creak'], [82.7, 'keys'], [83.2, 'doorbell']] });
// ---- 53 · "Ein Ferrari" — a red Ferrari, the cover comes off
S(83.9, { tr: 'flash', lift: 0, cam: WIDEC(83.9, 84.86, 1120, 1.0, 1.06), shake: [[84.0, 10, 0.4]],
  draw() { setShowroom(); supercar(540, 1440, 0.95, { col: '#e8262f' }); const u = clamp((TT - 83.95) / 0.5); if (u < 1) { ctx.fillStyle = '#5a5f73'; ctx.fillRect(-100, 1000 - u * 900, 1300, 460); } },
  ui() { fact('FERRARI 🏎️', 84.1, 540, 450, { size: 80, bg: '#e8262f' }); },
  sfx: [[83.95, 'rustle'], [84.0, 'engine'], [84.1, 'pop', 1]] });
// ---- 54 · "…für 240.000 Euro." — the price slams
S(84.86, { tr: 'cut', lift: 0, raise: 0, cam: [[84.86, 540, 960, 1.0], [86.76, 540, 950, 1.08]], punch: [[85.4, 0.08]],
  draw() { rays('#6a0a10', '#c0141e', { cy: 900, spin: 0.3 }); supercar(540, 1100, 0.85, { col: '#e8262f' }); },
  ui() { price('240.000 €', 85.4, 520); },
  sfx: [[85.4, 'cashReg'], [85.6, 'coinTicks', 0.6, 3]] });
// ---- 55 · "Kevin unterschreibt" — the pen scribbles a signature on the contract
S(86.76, { tr: 'whipU', lift: 0, raise: 30, cam: [[86.76, 540, 980, 1.0], [87.8, 540, 970, 1.06]],
  draw() { setShowroom({ blur: 10 }); contract(540, 960, 1.05, clamp((TT - 86.85) / 0.8)); },
  ui() {},
  sfx: [[86.85, 'pencil', 0.8]] });
// ---- 56 · "…um 23 Uhr 59." — the LED board: 23:59 — one minute left
S(87.8, { tr: 'blinds', tense: 1, lift: 0, raise: 0, cam: [[87.8, 540, 900, 1.0], [89.82, 540, 900, 1.12]], noHud: 1,
  draw() { setDark('#4a0a12', '#05030a'); ledBoard(540, 900, 1.15, secsLeft()); },
  ui() { fact('23:59 UHR', 88.1, 540, 1250, { size: 76, bg: '#ff2e4d' }); },
  sfx: [[88.1, 'stamp'], [88.4, 'tick'], [88.9, 'tick'], [89.4, 'tick']] });

// =====================================================================  THE TERMINAL LOADS…
// ---- 57 · "Das Kartenterminal lädt…" — the spinner, close
S(89.82, { tr: 'zoomIn', tense: 1, lift: 0, raise: 30, cam: [[89.82, 540, 960, 1.0], [91.69, 540, 930, 1.25]],
  draw() { setShowroom({ blur: 12 }); payTerminal(540, 1050, 1.6, 'load'); },
  ui() {},
  sfx: [[89.9, 'beep', 1.2], [90.6, 'heartbeat', 1.2]] });
// ---- 58 · "…und lädt…" — both faces, sweating, side by side
S(91.69, { tr: 'cut', tense: 1, lift: 0, cam: [[91.69, 540, 1000, 1.35], [92.67, 540, 990, 1.45]],
  draw() { setShowroom({ blur: 10 }); kv(330, FLOOR + 120, 1.0, { emo: [[0, 'scared']], extras: { sweat: 1 }, look: [0.4, 0.5] }); jn(760, FLOOR + 120, 1.0, { emo: [[0, 'scared']], extras: { sweat: 1 }, look: [-0.4, 0.5] }); },
  ui() {},
  sfx: [[91.7, 'heartbeat', 1.0], [92.2, 'gulp']] });
// ---- 59 · "Jonas starrt auf sein Handy" — Jonas, the phone glowing in his face
S(92.67, { tr: 'slash', tense: 1, cam: CLOSE(92.67, 94.08),
  draw() { setDark('#1a1430', '#05030c'); jn(540, FLOOR + 170, 1.05, { pose: [[0, 'phoneR']], emo: [[0, 'serious']], look: [0.2, 0.3], holdR: () => transferPhone(0, -30, 0.32, 0.15) }); glow(560, 760, 300, '#52b8ff', 0.25); },
  ui() {},
  sfx: [[92.7, 'buzzPhone'], [93.4, 'tick']] });
// ---- 60 · "…und wartet auf seine Überweisung." — the banking app, "incoming transfer: ??? €"
S(94.08, { tr: 'zoomIn', tense: 1, lift: 0, raise: 30, cam: [[94.08, 540, 960, 1.0], [95.78, 540, 950, 1.06]],
  draw() { setDark('#1a1430', '#05030c'); transferPhone(540, 960, 3.2, 0); },
  ui() {},
  sfx: [[94.1, 'notify'], [94.6, 'heartbeat', 1.0]] });
// ---- 61 · "Kevin hat eine Million Euro in 24 Stunden ausgegeben," — the receipt prints all eight purchases
S(95.78, { tr: 'push', lift: 0, raise: 0, cam: [[95.78, 540, 900, 1.0], [99.54, 540, 900, 1.04]],
  draw() { rays('#1a1430', '#2a2050', { cy: 900, spin: 0.15 }); receipt(540, 380, 1.1, Math.min(8, 1 + Math.floor((TT - 95.85) / 0.4))); },
  ui() {},
  sfx: [[95.85, 'printer', 3.4], [96.2, 'cashReg'], [99.0, 'ding']] });
// ---- 62 · "…fast." — freeze, record scratch, Kevin's face
S(99.54, { tr: 'cut', lift: 0, cam: [[99.54, 540, 990, 1.85], [100.08, 540, 990, 1.9]], noCap: 0,
  draw() { setShowroom({ blur: 12 }); kv(540, FLOOR + 170, 1.05, { emo: [[0, 'shock']] }); ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fillRect(-600, -400, 2300, 2800); },
  ui() { stampMark('FAST…', 99.6, 540, 450, '#ffe14d', 100); },
  sfx: [[99.55, 'recordScratch'], [99.6, 'stamp']] });
// ---- 63 · "Wie viel Geld bekommt Jonas?" — Jonas with the phone: ??? €, a slow push
S(100.08, { tr: 'rgb', tense: 1, lift: 0, cam: [[100.08, 540, 1040, 1.1], [102.4, 540, 1010, 1.25]], punch: [[100.6, 0.06]],
  draw() { setNightStreet({ blur: 6 }); jn(380, FLOOR + 80, 0.95, { pose: [[0, 'phoneR']], emo: [[0, 'confused']], look: [0.5, 0] }); transferPhone(790, 1050, 1.15, 0.06); },
  ui() { fact('WIE VIEL BEKOMMT JONAS? 🤔', 100.2, 540, 450, { size: 52, bg: '#ffe14d', fg: '#1b1530' }); },
  sfx: [[100.15, 'whoosh', 1.1], [100.6, 'coinTicks', 0.8, 5], [101.4, 'heartbeat', 1.0]] });
function goldPS5(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 10, 260, 30, 0.35);
  fillRR(-220, -560, 440, 560, 16, '#e7b93a'); ctx.fillStyle = lin(-220, -560, 220, 0, [[0, '#fff1a6'], [0.5, '#d9a520'], [1, '#9a6e08']]); rrPath(-220, -560, 440, 560, 16); ctx.fill();
  fillRR(-220, -560, 440, 110, 16, '#1b1530'); tText('PS5', 0, -505, 76, { color: '#ffd23f', shadow: false }); tText('GOLD EDITION', 0, -380, 34, { color: '#5a3a00', shadow: false, letter: 3 });
  ctx.save(); ctx.translate(0, -220); ctx.rotate(-0.1); fillRR(-90, -150, 70, 300, 30, '#fff6d0'); fillRR(20, -150, 70, 300, 30, '#fff6d0'); fillRR(-50, -120, 100, 240, 20, '#1b1530'); ctx.restore();
  fillRR(-200, -540, 30, 520, 12, 'rgba(255,255,255,0.35)'); ctx.restore(); }
