// =====================================================================
//  shots.js — Eine Kreditkarte ohne Limit für 24 Stunden vs 10 Millionen sofort (DE). ~58 shots on the trimmed voice (108.3 s).
//  Kevin takes the 10 Mio. (9,5 Mio. left), Jonas the card: Rolex 50.000 + painting 2 Mio. + G-Class 200.000 + jet 8 Mio. = 10.250.000 EUR (never said).
//  New in this piece: a countdown clock as the spine (always on screen), each player has a table with TWO buttons, a giant receipt as the ending.
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
function splitEven(top, bottom) {
  ctx.save(); ctx.beginPath(); ctx.rect(-300, -400, 1700, YD + 400); ctx.clip(); top(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-300, YD, 1700, 1500); ctx.clip(); bottom(); ctx.restore(); line(-300, YD, 1400, YD, 14, '#ffffff');
}
const myBank = (value, col = '#18a050', sub = 'KONTO · KEVIN') => () => { ctx.fillStyle = lin(0, -176, 0, 176, [[0, '#f4f6ff'], [1, '#e2e7fb']]); ctx.fillRect(-84, -176, 168, 352); fillRR(-84, -176, 168, 56, 0, '#1d48b8'); tText('MEINE BANK', 0, -148, 16, { color: '#fff', shadow: false });
  tText(sub, 0, -80, 12, { color: '#5b5f78', shadow: false, weight: 800 }); tText(value, 0, -45, value.length > 11 ? 20 : 26, { color: col, shadow: false, maxW: 156 }); };
// the countdown pill stays on screen while the 24 hours run (drawn over every shot, under the captions' layer)
const _captions = captions;
captions = function (g) { _captions(g); if (TT > 13.0 && TT < 103.9) { const s = shotAt(TT); if (s.noClock) return; ctx = g; ctx.setTransform(SC, 0, 0, SC, 0, 0); clockHud(13.0); } };
const KJ = (o = {}) => ({ emo: [[0, 'grin']], ...o });
function clockShot(t0, t1, o = {}) {
  S(t0, { tr: o.tr ?? 'zoomIn', tense: o.tense, noClock: 1, cam: [[t0, 540, 960, 1.0], [t1, 540, 950, o.z1 ?? 1.12]], shake: o.shake,
    draw() { rays(o.c0 ?? '#1b1530', o.c1 ?? '#2a2050', { cy: 900, spin: 0.3 }); const left = clockLeft(), red = left < 3 * 3600; const k = sp(t0 + 0.02, 240, 12); ctx.save(); ctx.translate(540, 960); ctx.scale(k, k); digitalClock(0, 0, 1.1, hms(left), red ? '#ff3b4a' : '#2ee87a', { label: 'NOCH' }); ctx.restore(); if (o.extra) o.extra(); },
    ui() { if (o.info) info(o.info[0], o.info[1], { y: 400, bg: o.info[2] ?? '#141026', size: 56 }); },
    sfx: [[t0 + 0.04, 'tick'], [t0 + 0.4, 'tick'], [t0 + 0.8, 'tick'], ...(o.sfx || [])] });
}

// =====================================================================  THE HOOK
// ---- 1 · "Eine Kreditkarte ohne Limit…" — the black card spins in and slams (hard punch-in on frame one)
S(0.0, { tr: 'cut', cam: [[0, 540, 940, 2.0], [0.22, 540, 940, 1.0], [1.72, 540, 930, 1.08]],
  draw() { rays('#3a2a00', '#8a6a10', { cy: 900, spin: 0.4 }); glow(540, 900, 700, '#ffe08a', 0.4); twinkles('h1', 140, 400, 800, 900, 14, { s: 30 }); const k = sp(0.02, 240, 11); blackCard(540, 930, 1.55 * k, { spin: (1 - EZ.o3(clamp(TT / 0.9))) * 9.4, glow: 0.5 }); impactLines(540, 930, 380, 640, 14, 0.05); },
  ui() { if (TT > 1.38) { const k = sp(1.38, 300, 11); ctx.save(); ctx.translate(540, 400); ctx.rotate(-0.05); ctx.scale(k, k); fillRR(-300, -70, 600, 140, 30, PAL.red); tText('OHNE LIMIT ∞', 0, 4, 80, { color: '#fff', shadow: false }); ctx.restore(); } },
  sfx: [[0.03, 'impact'], [0.08, 'whoosh', 1.3], [0.5, 'cardIn'], [1.38, 'stamp']] });
// ---- 2 · "…für 24 Stunden?" — a digital clock flips on: 24:00:00
S(1.72, { tr: 'whipL', noClock: 1, cam: [[1.72, 540, 960, 1.0], [3.05, 540, 950, 1.08]],
  draw() { rays('#1b1530', '#2a2050', { cy: 900, spin: 0.3 }); const k = sp(1.74, 240, 12); ctx.save(); ctx.translate(540, 960); ctx.scale(k, k); digitalClock(0, 0, 1.1, '24:00:00', '#2ee87a', { label: '24 STUNDEN' }); ctx.restore(); },
  sfx: [[1.76, 'powerOn'], [2.6, 'beep']] });
// ---- 3 · "Oder 10 Millionen Euro sofort?" — the cash mountain rises, the number slams
S(3.05, { tr: 'flash', noClock: 1, cam: [[3.05, 540, 980, 1.0], [4.7, 560, 960, 1.1]], punch: [[3.5, 0.12]], shake: [[3.5, 14, 0.35]],
  draw() { rays('#0e8a45', '#2ee87a', { cy: 940, spin: 0.35 }); glow(540, 1000, 700, '#d8ffd0', 0.4); cashMountain(540, 1300, 1.2, clamp((TT - 3.07) / 0.5)); billRain('h3', 3.52, 30, { burst: [540, 900], spread: 1.6 }); },
  ui() { if (TT > 3.5) { const k = sp(3.5, 300, 11); ctx.save(); ctx.translate(540, 400); ctx.scale(k, k); tText('10.000.000 €', 0, 0, 120, { color: PAL.yellow, stroke: '#3a2400', strokeW: 22 }); ctx.restore(); } info('SOFORT ⚡', 4.74, { y: 580, bg: PAL.red, size: 60 }); },
  sfx: [[3.07, 'whooshUp', 1], [3.52, 'cashCannon'], [4.0, 'coinPour']] });

// =====================================================================  THE CHOICE: two buttons per player
// ---- 4 · "Kevin schnappt sich…" — each behind a table with two buttons, hands up; Kevin slams the green one
S(4.7, { tr: 'zoomOut', noClock: 1, lift: 60, cam: [[4.7, 540, 1060, 1.0], [6.3, 400, 1080, 1.15]], shake: [[5.75, 16, 0.4]],
  draw() { setStudio(); char('kevin', 290, FLOOR - 90, 0.72, { pose: [[4.7, 'raiseR'], [5.6, 'slamR', 0.08], [6.0, 'cheer', 0.2]], emo: [[0, 'grin'], [6.0, 'laugh']], look: [0.2, 0.5] });
    char('jonas', 790, FLOOR - 90, 0.72, jonasT({ pose: [[0, 'raiseR']], emo: [[0, 'calm']], look: [-0.4, 0.3] }));
    twoButtonDesk(290, FLOOR - 120, 0.85, { pressL: TT > 5.69, litL: TT > 5.69 ? 0.9 : 0.3 }); twoButtonDesk(790, FLOOR - 120, 0.85, { litL: 0.3, litR: 0.3 }); impactLines(180, 1380, 100, 320, 12, 5.72); cash('k4', 5.75, 18); },
  ui() { tText('WAS NIMMST DU?', 540, 330, 70, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14 }); info('10 MIO.! 💰', 5.75, { y: 470, x: 290, bg: PAL.green, size: 46 }); },
  sfx: [[4.75, 'pop', 1], [5.6, 'whoosh', 1.3], [5.72, 'slam'], [5.75, 'buzzerWin'], [5.8, 'cashCannon']] });
// ---- 5 · "…die 10 Millionen." — Kevin hugs the stacks
S(6.3, { tr: 'cut', noClock: 1, cam: CLOSE(6.3, 7.3),
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'holdBoth']], emo: [[0, 'laugh']], holdR: () => briefcase(-70, 10, 0.3, 1) }); cash('k5', 6.32, 20); },
  ui() { popText('10 MILLIONEN! 🤑', 540, 380, 6.37, 80, PAL.yellow, -0.04, 0); },
  sfx: [[6.35, 'moneyRain'], [6.59, 'cashReg']] });
// ---- 6 · "24 Stunden shoppen?" — Kevin mocks, finger wagging
S(7.3, { tr: 'whipR', noClock: 1, cam: [[7.3, 620, 1000, 1.6], [9.1, 520, 980, 1.75]],
  draw() { setStudio({ blur: 9 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'pointUpR']], emo: [[0, 'smug'], [8.6, 'laugh', 0.2]], tilt: [[0, 0], [8.0, -0.08], [8.6, 0.06]] }); },
  ui() { popText('NUR SHOPPEN? 😂', 540, 380, 8.61, 80, '#ff8fc0', -0.04, 0); },
  sfx: [[7.35, 'swish'], [8.61, 'boing']] });
// ---- 7 · "Danach hast du nur Einkaufstüten, Jonas!" — Kevin's picture of it: Jonas buried under shopping bags
S(9.1, { tr: 'zoomIn', noClock: 1, lift: 120, cam: [[9.1, 540, 1100, 1.0], [11.3, 560, 1090, 1.08]],
  draw() { setStreet({ blur: 4 }); ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#ff8fc0'; ctx.fillRect(-600, -400, 2300, 2800); ctx.restore();
    char('jonas', 540, FLOOR + 20, 0.85, jonasT({ pose: [[0, 'shrug']], emo: [[0, 'confused']] })); const n = Math.min(9, Math.floor((TT - 9.2) * 6)); if (n > 0) shoppingBags(540, FLOOR + 30, 1.05, n);
    if (TT > 10.0) thoughtBubble(800, 520, 300, 170, () => tText('😂', 0, 4, 90, { shadow: false })); },
  ui() { info('NUR EINKAUFSTÜTEN 🛍️', 10.08, { y: 380, bg: PAL.pink, size: 52 }); },
  sfx: [[9.2, 'rustle'], [9.6, 'rustle'], [10.08, 'pop', 1], [10.84, 'boing']] });
// ---- 8 · "Jonas nimmt die Karte." — Jonas picks up the black card, calm; it gleams
S(11.3, { tr: 'whipL', noClock: 1, cam: [[11.3, 640, 1000, 1.6], [12.7, 520, 980, 1.75]],
  draw() { setStudio({ blur: 9 }); char('jonas', 540, FLOOR + 170, 1.05, jonasT({ pose: [[11.3, 'idle'], [11.7, { la: [0.16, -0.12], ra: [1.9, -0.6] }, 0.25]], emo: [[0, 'calm']], look: [0.6, -0.4] }));
    if (TT > 11.75) blackCard(760, 720, 0.32 * sp(11.75, 260, 12), { rot: -0.15, glow: 0.4 }); },
  ui() { info('DIE KARTE 💳', 12.19, { y: 380, bg: '#141026', size: 56 }); },
  sfx: [[11.75, 'cardIn'], [12.0, 'sparkle']] });

// =====================================================================  THE CLOCK STARTS
// ---- 9 · "Und die Uhr beginnt zu laufen." — the clock face: 24:00:00 starts ticking; the pill flies to the top
clockShot(12.7, 14.3, { tr: 'cut', info: ['DIE UHR LÄUFT! ⏱️', 13.29, PAL.green], sfx: [[13.29, 'powerOn'], [13.84, 'clockSpin', 0.4]] });
// ---- 10 · "Doch schon die erste Sekunde ist ein Schock:" — Jonas bursts out the door and freezes (slow push, vignette)
S(14.3, { tr: 'whipR', tense: 1, lift: 0, cam: [[14.3, 540, 1100, 1.1], [16.35, 540, 1050, 1.35]],
  draw() { setStreet(); door(860, 1500, 0.9, 1); const x = lerp(860, 540, EZ.o3(clamp((TT - 14.35) / 0.6))); char('jonas', x, 1520, 0.85, jonasT({ run: [[0, 1], [15.0, 0, 0.2]], emo: [[0, 'happy'], [15.6, 'shock', 0.15]] })); if (TT > 16.06) qMark(760, 800, 0.6 * sp(16.06, 280, 12)); },
  ui() { popText('SCHOCK! 😱', 540, 400, 16.06, 96, '#ff4545', -0.04, 0); },
  sfx: [[14.35, 'doorSlam'], [14.4, 'footsteps', 0.6], [15.6, 'recordScratch'], [16.06, 'shockHit']] });
// ---- 11 · "Heute ist Sonntag." — the calendar page: SONNTAG
S(16.35, { tr: 'cut', cam: [[16.35, 540, 960, 1.05], [17.55, 540, 950, 1.14]], punch: [[17.02, 0.1]],
  draw() { rays('#b6302b', '#e8483c', { cy: 900, spin: 0.3 }); const k = sp(16.38, 240, 12); ctx.save(); ctx.translate(540, 1000); ctx.scale(k, k); calendarPage(0, 0, 1.3, 'SONNTAG', 7); ctx.restore(); },
  ui() { info('HEUTE IST SONNTAG! 📅', 17.02, { y: 400, bg: '#141026', size: 54 }); },
  sfx: [[16.4, 'flip'], [17.02, 'dun']] });
// ---- 12 · "Und in Deutschland haben fast alle Läden zu." — the camera pans along a row of shuttered shops
S(17.55, { tr: 'whipL', lift: 0, cam: [[17.55, 300, 1100, 1.0], [19.95, 1050, 1090, 1.0]],
  draw() { setStreet({ blur: 2 }); closedShops(-200, 1500, 5); fillRR(-600, 1500, 2600, 900, 0, '#8a8aa0'); char('jonas', lerp(200, 1000, clamp((TT - 17.6) / 2.3)), 1700, 0.7, jonasT({ walk: [[0, 0.8]], emo: [[0, 'sad']], look: [0, -0.3] })); },
  ui() { info('ALLE LÄDEN ZU! 🔒', 19.31, { y: 400, bg: PAL.red, size: 56 }); },
  sfx: [[17.6, 'footsteps', 2.0], [18.4, 'ratchet'], [19.31, 'errorBuzz']] });

// =====================================================================  KEVIN'S PARTY vs JONAS' RUN
// ---- 13 · (laughs) "Kevin lacht sich kaputt…" — Kevin doubled over with laughter
S(19.95, { tr: 'zoomIn', cam: [[19.95, 540, 1000, 1.65], [22.4, 540, 980, 1.85]],
  draw() { setPenthouse({ blur: 10 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'laughBelly']], emo: [[0, 'laugh']], extras: { shades: 1 }, lean: Math.sin(TT * 10) * 0.08, squash: Math.abs(Math.sin(TT * 10)) * -0.15 }); },
  ui() { popText('HAHAHA! 🤣', 540, 380, 20.0, 100, PAL.yellow, -0.04, 0); },
  sfx: [[20.0, 'boing'], [21.39, 'pop', 1.2]] });
// ---- 14 · "…und schmeißt eine Party für die ganze Straße." — lights, speakers, the whole street dancing
S(22.4, { tr: 'flash', lift: 0, cam: [[22.4, 400, 1000, 1.0], [24.3, 680, 990, 1.06]],
  draw() { setStreetParty(); char('kevin', 540, 1560, 0.75, { pose: [[0, 'cheer'], [23.0, 'armsUp', 0.15], [23.5, 'cheer', 0.15]], emo: [[0, 'laugh']], extras: { shades: 1 }, jump: [[0, 0], [22.6, 30, 0.1], [22.8, 0, 0.1], [23.2, 30, 0.1], [23.4, 0, 0.1], [23.8, 30, 0.1], [24.0, 0, 0.1]] }); confetti('c14', 22.5, 40); },
  ui() { info('PARTY! 🎉', 22.62, { y: 400, bg: PAL.pink, size: 64 }); },
  sfx: [[22.45, 'carMusic', 1.8], [22.62, 'pop', 1], [23.4, 'applause', 0.8]] });
// ---- 15 · "Jonas dagegen rennt zum Flughafen." — Jonas sprints towards the camera, the runway behind him
S(24.3, { tr: 'whipR', lift: 0, cam: [[24.3, 540, 1100, 1.0], [26.5, 540, 1060, 1.12]],
  draw() { setAirfield(); privateJet(((TT * 300) % 2400) - 600, 700, 0.5, -0.1); char('jonas', 540, 1580, 0.9, jonasT({ run: [[0, 1]], emo: [[0, 'grin']] })); speedLines(10, 0.25, 'sl15'); },
  ui() { info('AB ZUM FLUGHAFEN! ✈️', 25.79, { y: 400, bg: PAL.blue, size: 54 }); },
  sfx: [[24.35, 'footsteps', 2.0], [24.8, 'planeWhoosh', 1.4], [25.79, 'pop', 1]] });
// ---- 16 · "Denn Läden an Flughäfen…" — inside the terminal: the shops are lit and OPEN
S(26.5, { tr: 'slide', lift: 0, cam: [[26.5, 380, 1100, 1.0], [27.95, 640, 1090, 1.05]],
  draw() { setTerminal(); char('jonas', 540, 1680, 0.65, jonasT({ pose: [[0, 'armsUp']], emo: [[0, 'laugh']] })); },
  ui() { info('GEÖFFNET! ✅', 27.27, { y: 400, bg: PAL.green, size: 62 }); },
  sfx: [[26.55, 'ding'], [27.0, 'doorbell'], [27.27, 'pop', 1]] });
// ---- 17 · "…und Bahnhöfen dürfen auch sonntags öffnen." — the rule as two icons: airport + station = open on Sundays
S(27.95, { tr: 'zoomIn', cam: [[27.95, 540, 960, 1.0], [29.9, 540, 950, 1.08]],
  draw() { rays('#0e8a45', '#2ee87a', { cy: 900, spin: 0.3 }); const a = sp(28.0, 260, 12), b = sp(28.3, 260, 12);
    ctx.save(); ctx.translate(310, 950); ctx.scale(a, a); fillRR(-200, -200, 400, 400, 50, '#ffffff'); privateJet(0, 30, 0.32, -0.2); tText('FLUGHAFEN', 0, 150, 36, { color: '#1b1530', shadow: false }); ctx.restore();
    ctx.save(); ctx.translate(770, 950); ctx.scale(b, b); fillRR(-200, -200, 400, 400, 50, '#ffffff'); fillRR(-120, -110, 240, 160, 30, '#e8262f'); fillRR(-90, -80, 80, 60, 10, '#cfe8ff'); fillRR(10, -80, 80, 60, 10, '#cfe8ff'); circ(-70, 70, 26, '#1b1530'); circ(70, 70, 26, '#1b1530'); tText('BAHNHOF', 0, 150, 36, { color: '#1b1530', shadow: false }); ctx.restore(); },
  ui() { info('AUCH SONNTAGS OFFEN! 🛍️', 29.09, { y: 400, bg: '#141026', size: 50 }); },
  sfx: [[28.0, 'pop', 1], [28.3, 'pop', 1.2], [29.09, 'ding']] });

// =====================================================================  THE ROLEX, THE BLOCKED CARD
// ---- 18 · "Noch 20 Stunden."
clockShot(29.9, 31.15, { info: ['NOCH 20 STUNDEN', 30.24] });
// ---- 19 · "Im Duty-free: eine goldene Rolex…" — the glass case, Jonas points at the gold watch
S(31.15, { tr: 'whipL', lift: 120, cam: [[31.15, 420, 1100, 1.0], [33.4, 600, 1090, 1.08]],
  draw() { setTerminal({ blur: 6 }); fillRR(560, FLOOR - 300, 460, 300, 20, '#cfe8ff'); fillRR(560, FLOOR - 300, 460, 30, 10, '#ffffff'); ctx.save(); ctx.translate(790, FLOOR - 190); ctx.rotate(0.2); goldWatch(0, 0, 0.2, TT); ctx.restore(); glow(790, FLOOR - 190, 200, '#ffe08a', 0.5);
    char('jonas', 330, FLOOR + 20, 0.85, jonasT({ pose: [[0, 'pointR']], emo: [[0, 'grin']], look: [0.6, 0.2] })); },
  ui() { info('DUTY-FREE ✈️', 31.4, { y: 400, bg: '#141026', size: 56 }); },
  sfx: [[31.2, 'doorbell'], [31.4, 'pop', 1], [32.49, 'bling']] });
// ---- 20 · "…für 50.000 Euro." — the price tag swings in, the card taps, bills
S(33.4, { tr: 'cut', cam: [[33.4, 540, 960, 1.0], [34.85, 540, 950, 1.08]], punch: [[33.62, 0.08]],
  draw() { rays('#c99a1a', '#f6d365', { cy: 900, spin: 0.3 }); const k = sp(33.42, 240, 12); ctx.save(); ctx.translate(540, 1050); ctx.rotate(0.15); ctx.scale(k, k); goldWatch(0, 0, 0.55, TT); ctx.restore(); cash('r20', 33.65, 14); },
  ui() { priceTag(560, 520, sp(33.62, 280, 12), '50.000 €', -0.08); },
  sfx: [[33.62, 'cashReg'], [33.8, 'moneyRain', 0.6]] });
// ---- 21 · "Manche Rolex-Modelle sind später sogar mehr wert als im Laden." — the watch on a value chart that keeps climbing
S(34.85, { tr: 'zoomIn', cam: [[34.85, 540, 960, 1.0], [38.1, 560, 950, 1.1]],
  draw() { setDark('#16204a', '#05030c'); priceChart(140, 640, 800, 640, [[0, 50], [0.3, 56], [0.5, 54], [0.75, 66], [1, 78]], clamp((TT - 34.9) / 2.4), { vmin: 30, vmax: 90, title: 'ROLEX · WERT', label: false, col: '#2ee87a' }); ctx.save(); ctx.translate(300, 820); ctx.rotate(-0.2); goldWatch(0, 0, 0.16, TT); ctx.restore(); },
  ui() { info('WERT STEIGT! 📈', 37.0, { y: 400, bg: PAL.green, size: 56 }); },
  sfx: [[34.9, 'grow'], [37.0, 'pop', 1], [37.4, 'sparkle']] });
// ---- 22 · "Doch dann: Karte abgelehnt!" — the terminal flashes red: ABGELEHNT
S(38.1, { tr: 'glitch', cam: [[38.1, 540, 960, 1.05], [39.95, 540, 960, 1.12]], shake: [[39.25, 18, 0.4]],
  draw() { setDark('#3a0a12', '#05030c'); if (TT > 39.25 && Math.floor(TT * 6) % 2) { ctx.fillStyle = 'rgba(255,30,40,0.18)'; ctx.fillRect(-600, -400, 2300, 2800); } const k = sp(38.12, 240, 12); payTerminal(540, 1000, 1.4 * k, TT > 39.25 ? 'no' : 'wait'); if (TT < 39.25) blackCard(540, 640 + Math.sin(TT * 3) * 10, 0.6, { rot: 0.1 }); },
  ui() { popText('ABGELEHNT! ❌', 540, 400, 39.25, 96, '#ff4545', -0.04, 0); },
  sfx: [[38.15, 'cardIn'], [38.42, 'beep'], [38.8, 'beep', 1.1], [39.25, 'declined'], [39.3, 'errorBuzz']] });
// ---- 23 · "Die Bank sperrt sie wegen verdächtiger Ausgaben." — a fraud alert on the phone, a padlock clamps on the card
S(39.95, { tr: 'cut', cam: [[39.95, 540, 960, 1.0], [42.45, 540, 950, 1.1]], shake: [[40.45, 12, 0.3]],
  draw() { setTerminal({ blur: 12 }); blackCard(540, 1100, 1.0, { rot: -0.08 }); if (TT > 40.45) padlock(540, bounceY(TT - 40.45, 400, 1060), 0.8, 0); },
  ui() { const k = sp(41.17, 260, 12); ctx.save(); ctx.translate(540, 560); ctx.scale(k, k); fillRR(-380, -90, 760, 180, 30, '#ffffff'); tText('⚠️ VERDÄCHTIGE AUSGABEN', 0, -30, 40, { color: '#d81b2b', shadow: false }); tText('Karte vorübergehend gesperrt', 0, 34, 32, { color: '#1b1530', shadow: false, weight: 800 }); ctx.restore(); },
  sfx: [[40.0, 'notify'], [40.45, 'doorSlam'], [41.17, 'pop', 1]] });
// ---- 24 · "Nein! Jede Minute zählt!" — Jonas grabs his head; the clock keeps running behind him (slow push)
S(42.45, { tr: 'flash', tense: 1, cam: CLOSE(42.45, 44.6), shake: [[42.51, 16, 0.4]],
  draw() { setTerminal({ blur: 12 }); ctx.fillStyle = 'rgba(200,20,30,0.18)'; ctx.fillRect(-600, -400, 2300, 2800); char('jonas', 540, FLOOR + 170, 1.05, jonasT({ pose: [[0, 'headGrab'], [43.6, 'tapWatch', 0.2]], emo: [[0, 'shock'], [43.6, 'scared', 0.2]], extras: { sweat: 1 } })); },
  ui() { popText('JEDE MINUTE ZÄHLT! ⏱️', 540, 400, 43.25, 66, '#ff4545', -0.04, 0); },
  sfx: [[42.51, 'shockHit'], [43.25, 'tick'], [43.6, 'tick'], [43.95, 'tick'], [44.3, 'tick']] });

// =====================================================================  THE PARTY GETS OUT OF HAND
// ---- 25 · "Auf Kevins Party kracht es:" — the bass booms, the speakers jump
S(44.6, { tr: 'whipR', lift: 0, cam: [[44.6, 540, 1000, 1.05], [46.5, 540, 990, 1.15]], shake: [[45.92, 18, 0.5]],
  draw() { setStreetParty(); char('kevin', 540, 1560, 0.75, { pose: [[0, 'armsUp']], emo: [[0, 'laugh']], extras: { shades: 1 }, jump: [[0, 0], [45.0, 30, 0.1], [45.2, 0, 0.1], [45.6, 30, 0.1], [45.8, 0, 0.1]] }); impactLines(540, 1000, 300, 600, 14, 45.92); },
  ui() { popText('BUMM! 🔊', 540, 400, 45.92, 110, '#ff8fc0', -0.04, 0); },
  sfx: [[44.65, 'carMusic', 1.8], [45.92, 'bassDrop']] });
// ---- 26 · "Um 22 Uhr beginnt in Deutschland die Nachtruhe." — the clock strikes 22:00, a neighbour throws his window open
S(46.5, { tr: 'cut', lift: 0, cam: [[46.5, 540, 960, 1.0], [49.4, 560, 950, 1.08]],
  draw() { setNightStreet(); fillRR(100, 300, 880, 1200, 14, '#3a3f5a'); for (let i = 0; i < 4; i++) fillRR(160 + i * 210, 380, 140, 180, 8, '#1b2040'); neighbourWindow(540, 900, 1.1, 47.6); digitalClock(540, 1300, 0.55, '22:00', '#ffd23f', { label: 'UHR' }); circ(900, 200, 70, '#fff3c0'); },
  ui() { info('NACHTRUHE AB 22 UHR 🌙', 47.37, { y: 400, bg: '#141026', size: 52 }); bubble(800, 640, 'RUHE!!! 😡', 48.3, { rot: 0.06, tail: -40 }); },
  sfx: [[46.55, 'clockSpin', 0.5], [47.37, 'ding'], [47.6, 'creak'], [48.3, 'grunt']] });
// ---- 27 · "Die Nachbarn rufen die Polizei." — a police car swings in, lights flashing
S(49.4, { tr: 'whipL', lift: 0, cam: [[49.4, 540, 1100, 1.0], [51.1, 540, 1080, 1.08]],
  draw() { setStreetParty({ blur: 3 }); const x = lerp(1500, 540, EZ.o3(clamp((TT - 49.45) / 0.8))); policeCar(x, 1500, 1.0, x / 90); },
  ui() { info('POLIZEI! 🚨', 50.5, { y: 400, bg: PAL.blue, size: 62 }); },
  sfx: [[49.45, 'siren', 1.6], [50.2, 'skid'], [50.5, 'pop', 1]] });
// ---- 28 · "Kevin checkt sein Konto:" — Kevin, unbothered, looks at his phone
S(51.1, { tr: 'cut', cam: [[51.1, 600, 1000, 1.6], [52.4, 520, 990, 1.7]],
  draw() { setStreetParty({ blur: 10 }); char('kevin', 400, FLOOR + 170, 1.05, { pose: [[0, 'phoneR']], emo: [[0, 'smug']], look: [0.6, -0.2], extras: { shades: 1 } }); },
  ui() { const k = sp(51.15, 240, 13); ctx.save(); ctx.translate(790, 920); ctx.rotate(0.05); ctx.scale(k * 1.9, k * 1.9); phone(0, 0, 1, 0, myBank(fmtEUR(Math.round(rollNum(10000000, 9500000, 51.3, 52.2))))); ctx.restore(); },
  sfx: [[51.15, 'whoosh', 1.2], [51.5, 'phoneTap'], [51.93, 'coinTicks', 0.5, 8]] });
// ---- 29 · "…noch 9,5 Millionen." — the card slams: 9.500.000 €
S(52.4, { tr: 'zoomIn', cam: [[52.4, 540, 960, 1.0], [54.3, 540, 950, 1.08]], punch: [[52.66, 0.1]],
  draw() { rays('#1d48b8', '#2f6df6', { cy: 940, spin: 0.35 }); cashMountain(540, 1350, 0.95, 1); cash('k29', 52.7, 16); },
  ui() { moneyCard(540, 640, 0.95 * sp(52.45, 300, 12), 'KONTO · KEVIN', 9500000); },
  sfx: [[52.45, 'pop', 1], [52.66, 'cashReg'], [53.0, 'moneyRain', 0.6]] });
// ---- 30 · "Und Jonas kauft gerade Uhren am Flughafen." — Kevin laughs to his party friends, mimes a watch
S(54.3, { tr: 'whipR', lift: 0, cam: [[54.3, 420, 1000, 1.0], [56.9, 640, 990, 1.06]],
  draw() { setStreetParty({ blur: 4 }); char('kevin', 540, 1560, 0.85, { pose: [[0, 'tapWatch'], [55.8, 'laughBelly', 0.2]], emo: [[0, 'smug'], [55.8, 'laugh', 0.2]], extras: { shades: 1 } }); },
  ui() { bubble(540, 560, 'UHREN?! 😂', 55.69, { size: 50 }); },
  sfx: [[54.4, 'swish'], [55.69, 'pop', 1], [56.0, 'boing']] });
// ---- 31 · "Ich hab schon gewonnen!" — Kevin raises a trophy over his head
S(56.9, { tr: 'cut', cam: CLOSE(56.9, 58.1), punch: [[57.52, 0.1]],
  draw() { setStreetParty({ blur: 10 }); char('kevin', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsUp']], emo: [[0, 'laugh']], extras: { shades: 1 } }); crown(540, 560 + Math.sin(TT * 6) * 10, 0.8); confetti('c31', 57.52, 40); },
  ui() { popText('SCHON GEWONNEN! 🏆', 540, 400, 57.52, 70, PAL.gold, -0.04, 0); },
  sfx: [[57.52, 'sting'], [57.6, 'applause', 0.6]] });

// =====================================================================  THE CARD IS BACK — AND THE AUCTION
// ---- 32 · "Jonas' Karte? Nach einem Anruf bei der Bank wieder frei." — Jonas on the phone; the padlock springs open
S(58.1, { tr: 'whipL', cam: [[58.1, 540, 960, 1.0], [60.95, 540, 950, 1.1]],
  draw() { setTerminal({ blur: 10 }); blackCard(540, 1150, 0.9, { rot: -0.08, glow: TT > 60.7 ? 0.5 : 0 }); const o = clamp((TT - 60.6) / 0.2); padlock(540, 1100, 0.75, o, o > 0.5 ? '#2ee87a' : '#ff3b4a'); char('jonas', 230, 1900, 0.75, jonasT({ pose: [[0, 'phoneR']], emo: [[0, 'scared'], [60.7, 'happy', 0.2]] })); },
  ui() { info('📞 ANRUF BEI DER BANK', 59.2, { y: 400, bg: '#141026', size: 50 }); if (TT > 60.7) popText('WIEDER FREI! ✅', 540, 600, 60.7, 76, '#2ee87a', -0.04, 0); },
  sfx: [[58.2, 'buzzPhone', 0.8], [59.54, 'phoneTap'], [60.6, 'keys'], [60.7, 'ding']] });
// ---- 33 · "Aber drei Stunden sind weg." — the clock jumps back three hours, red
clockShot(60.95, 62.45, { tr: 'glitch', c0: '#3a0a12', c1: '#5a1020', info: ['−3 STUNDEN! 😫', 61.37, PAL.red], sfx: [[61.37, 'descend'], [61.97, 'errorBuzz']], shake: [[61.37, 14, 0.4]] });
// ---- 34 · "Noch 12 Stunden."
clockShot(62.45, 63.65, { tr: 'cut', info: ['NOCH 12 STUNDEN', 62.77] });
// ---- 35 · "Eine Online-Kunstauktion." — Jonas in the lounge with his laptop: the auction page
S(63.65, { tr: 'zoomIn', cam: [[63.65, 540, 1000, 1.05], [65.25, 540, 990, 1.12]],
  draw() { setTerminal({ blur: 8 }); laptopOpen(540, 1300, 1.3, 1, () => { ctx.translate(0, -198); ctx.fillStyle = '#f4f6fb'; ctx.fillRect(-300, -200, 600, 400); fillRR(-300, -200, 600, 60, 0, '#1b1530'); tText('KUNSTAUKTION · LIVE', 0, -170, 26, { color: '#fff', shadow: false }); ctx.save(); ctx.translate(-130, 30); painting(0, 0, 0.3); ctx.restore(); tText('AKTUELL', 140, -40, 22, { color: '#6a6f86', shadow: false }); tText('1.200.000 €', 140, 0, 34, { color: '#1b1530', shadow: false }); fillRR(60, 60, 160, 50, 12, '#ff8a1e'); tText('BIETEN', 140, 86, 22, { color: '#fff', shadow: false }); }); },
  ui() { info('KUNSTAUKTION 🖼️', 64.1, { y: 400, bg: '#141026', size: 56 }); },
  sfx: [[63.7, 'typing', 0.6], [64.1, 'pop', 1]] });
// ---- 36 · "Doch ein anonymer Bieter…" — a dark figure with a question mark raises his paddle
S(65.25, { tr: 'whipR', tense: 1, cam: [[65.25, 540, 1000, 1.0], [66.75, 540, 990, 1.12]],
  draw() { rays('#3a1a6a', '#6a3fd0', { cy: 900, spin: 0.2 }); glow(540, 1000, 520, '#c9a8ff', 0.35); bidder(540, 1450, 1.2, clamp((TT - 66.0) / 0.3)); },
  ui() { info('ANONYMER BIETER? 🕵️', 65.67, { y: 400, bg: PAL.red, size: 52 }); },
  sfx: [[65.3, 'tension', 1.4], [66.0, 'whooshUp', 1.2]] });
// ---- 37 · "…treibt den Preis immer weiter hoch." — the bids race up, Jonas sweats over the BIETEN button
S(66.75, { tr: 'cut', cam: [[66.75, 540, 960, 1.05], [68.35, 540, 950, 1.15]],
  draw() { setTerminal({ blur: 12 }); char('jonas', 300, FLOOR + 170, 1.05, jonasT({ pose: [[0, 'pressR']], emo: [[0, 'scared']], extras: { sweat: 1 } })); },
  ui() { const v = Math.round(rollNum(1200000, 1950000, 66.8, 68.2) / 50000) * 50000; moneyCard(540, 640, 0.85, 'AKTUELLES GEBOT', v, '#ffd23f'); for (let i = 0; i < 5; i++) bubble(i % 2 ? 820 : 760, 880 + i * 0, ['+50.000 €', '+100.000 €', '+50.000 €', '+200.000 €', '+100.000 €'][i], 66.9 + i * 0.28, { size: 34, bg: i % 2 ? '#ffd23f' : '#ffffff' }); },
  sfx: [[66.9, 'popHi', 1], [67.18, 'popHi', 1.1], [67.46, 'popHi', 1.2], [67.74, 'popHi', 1.3], [68.02, 'popHi', 1.4]] });
// ---- 38 · "Kein Wunder: Das teuerste Gemälde der Welt…" — a museum hall, one painting under a spotlight (slow push)
S(68.35, { tr: 'zoomOut', tense: 1, cam: [[68.35, 540, 960, 1.0], [70.5, 540, 940, 1.15]],
  draw() { ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#2a1d14'], [1, '#120c08']]); ctx.fillRect(-600, -400, 2300, 2800); fillRR(-600, 1450, 2300, 900, 0, '#3a2a1a'); for (let i = 0; i < 8; i++) line(-600 + i * 300, 1450, -900 + i * 380, 2300, 3, 'rgba(0,0,0,0.2)');
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; poly([[440, -300], [640, -300], [820, 1450], [260, 1450]], 'rgba(255,240,190,0.10)'); ctx.restore(); painting(540, 900, 1.05, { glow: 0.25 }); fillRR(380, 1250, 320, 60, 10, '#1b1530'); tText('DAS TEUERSTE', 540, 1280, 30, { color: '#ffd23f', shadow: false }); },
  ui() { info('KEIN WUNDER… 👀', 68.62, { y: 400, bg: '#141026', size: 56 }); },
  sfx: [[68.4, 'whooshDown', 0.6], [68.62, 'pop', 1], [69.36, 'choir']] });
// ---- 39 · "…ging für über 450 Millionen Dollar weg." — the gavel slams: 450.000.000 $
S(70.5, { tr: 'flash', cam: [[70.5, 540, 960, 1.0], [73.75, 540, 950, 1.1]], punch: [[71.51, 0.12]], shake: [[71.51, 16, 0.4]],
  draw() { rays('#8a6a10', '#e8c040', { cy: 900, spin: 0.35 }); gavel(540, 1250, 1.3, TT > 71.3 ? clamp((TT - 71.3) / 0.12) : 0); impactLines(400, 1300, 200, 480, 14, 71.45); billRain('m39', 71.55, 30, { burst: [540, 900], spread: 1.6 }); },
  ui() { if (TT > 71.51) { const k = sp(71.51, 300, 11); ctx.save(); ctx.translate(540, 620); ctx.scale(k, k); tText('450.000.000 $', 0, 0, 112, { color: '#ffffff', stroke: '#3a2400', strokeW: 22 }); ctx.restore(); } info('REKORD! 🏆', 73.09, { y: 400, bg: PAL.red, size: 60 }); },
  sfx: [[71.45, 'stamp', 1.4], [71.55, 'cashCannon'], [73.09, 'pop', 1]] });
// ---- 40 · "Am Ende gewinnt Jonas:" — the gavel again: VERKAUFT AN JONAS; Jonas jumps
S(73.75, { tr: 'whipL', cam: [[73.75, 540, 1000, 1.6], [75.2, 540, 980, 1.72]], punch: [[74.36, 0.1]],
  draw() { setTerminal({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, jonasT({ pose: [[0, 'pressR'], [74.36, 'cheer', 0.15]], emo: [[0, 'scared'], [74.36, 'laugh', 0.15]], jump: [[0, 0], [74.4, 50, 0.15], [74.7, 0, 0.15]] })); confetti('c40', 74.36, 40); },
  ui() { stampBox(540, 420, 74.36, 'VERKAUFT AN JONAS!', '#2ee87a', -0.1, 58); },
  sfx: [[74.36, 'stamp', 1.2], [74.4, 'applause', 0.8]] });
// ---- 41 · "…ein Gemälde für 2 Millionen Euro." — the painting arrives, the price tag
S(75.2, { tr: 'cut', cam: [[75.2, 540, 960, 1.0], [77.4, 560, 950, 1.08]],
  draw() { setTerminal({ blur: 8 }); const k = sp(75.22, 220, 13); painting(540, 1000 - (1 - k) * 700, 1.0, { rot: -0.03, glow: 0.2 }); cash('g41', 76.2, 16); },
  ui() { priceTag(560, 460, sp(76.19, 280, 12), '2 MIO. €', -0.08); },
  sfx: [[75.25, 'whooshDown'], [75.6, 'thud'], [76.19, 'cashReg']] });

// =====================================================================  THE G-CLASS
// ---- 42 · "Noch 3 Stunden."
clockShot(77.4, 78.6, { tr: 'zoomIn', info: ['NOCH 3 STUNDEN! 😬', 77.74, PAL.red], sfx: [[77.74, 'dun']] });
// ---- 43 · "Eine Mercedes G-Klasse für 200.000 Euro." — the black G-Class rolls in, the price tag
S(78.6, { tr: 'whipR', lift: 0, cam: [[78.6, 380, 1150, 1.0], [81.75, 640, 1140, 1.06]],
  draw() { setShowroom(); const x = lerp(-300, 540, EZ.o3(clamp((TT - 78.65) / 1.0))); gWagon(x, 1480, 0.95, { spin: x / 105 }); if (TT > 80.32) cash('g43', 80.35, 16); },
  ui() { info('MERCEDES G-KLASSE 🚙', 79.0, { y: 400, bg: '#141026', size: 52 }); priceTag(560, 640, sp(80.32, 280, 12), '200.000 €', -0.08); },
  sfx: [[78.65, 'engine'], [79.4, 'carDoor'], [80.32, 'cashReg']] });
// ---- 44 · "Ein Auto, das seit 1979 fast gleich aussieht." — 1979 (sepia) above, today below: nearly the same car
S(81.75, { tr: 'slide', cam: [[81.75, 540, 960, 1.0], [85.4, 540, 960, 1.05]],
  draw() { setDark('#2a2a3a', '#05030c'); const a = sp(81.8, 240, 12), b = sp(82.4, 240, 12);
    ctx.save(); ctx.translate(540, 730); ctx.scale(a * 0.8, a * 0.8); fillRR(-480, -420, 960, 520, 30, '#d8c7a0'); gWagon(0, 40, 0.75, { sepia: 1 }); tText('1979', -360, -360, 64, { color: '#5a4020', shadow: false }); ctx.restore();
    ctx.save(); ctx.translate(540, 1170); ctx.scale(b * 0.8, b * 0.8); fillRR(-480, -420, 960, 520, 30, '#cfe0ff'); gWagon(0, 40, 0.75); tText('HEUTE', -330, -360, 64, { color: '#1d48b8', shadow: false }); ctx.restore(); },
  ui() { info('SEIT 1979 FAST GLEICH! 😲', 82.79, { y: 330, bg: PAL.orange, size: 50 }); },
  sfx: [[81.8, 'shutter'], [82.4, 'shutter'], [82.79, 'pop', 1], [84.46, 'ding']] });

// =====================================================================  THE JET — THE LAST MINUTES
// ---- 45 · "Noch 10 Minuten." — red clock (slow push, vignette)
clockShot(85.4, 86.6, { tr: 'flash', tense: 1, c0: '#3a0a12', c1: '#5a1020', info: ['NOCH 10 MINUTEN! 🚨', 85.66, PAL.red], sfx: [[85.66, 'heartbeat', 1.0]] });
// ---- 46 · "Am Rollfeld steht ein Privatjet." — the camera tracks along the jet on the apron
S(86.6, { tr: 'whipL', lift: 0, cam: [[86.6, 260, 1000, 1.2], [88.45, 820, 990, 1.25]],
  draw() { setAirfield(); privateJet(540, 1200, 1.0, 0); fillRR(-600, 1300, 2300, 900, 0, '#6a6f80'); for (let i = 0; i < 8; i++) fillRR(-500 + i * 300, 1500, 160, 20, 6, '#ffffff'); },
  ui() { info('PRIVATJET ✈️', 87.72, { y: 400, bg: PAL.blue, size: 60 }); },
  sfx: [[86.65, 'planeWhoosh', 1.4], [87.72, 'pop', 1]] });
// ---- 47 · "Zu verkaufen. Für 8 Millionen Euro." — the FOR SALE sign, the price
S(88.45, { tr: 'cut', lift: 0, cam: [[88.45, 540, 1100, 1.05], [91.0, 540, 1090, 1.12]], punch: [[89.68, 0.1]],
  draw() { setAirfield({ blur: 4 }); privateJet(540, 1250, 0.85, 0); fillRR(-600, 1330, 2300, 900, 0, '#6a6f80'); const k = sp(88.5, 260, 12); saleSign(540, 900, 0.9 * k, '8 MIO. €'); cash('j47', 89.7, 18); },
  ui() { if (TT > 89.68) popText('8 MILLIONEN! 💸', 540, 400, 89.68, 84, PAL.yellow, -0.04, 0); },
  sfx: [[88.5, 'pop', 1], [89.68, 'cashCannon']] });
// ---- 48 · (laughs) "Doch der Verkäufer lacht nur:" — the seller in his suit, laughing
S(91.0, { tr: 'whipR', cam: CLOSE(91.0, 93.0),
  draw() { setAirfield({ blur: 10 }); char('seller', 540, FLOOR + 170, 1.05, { pose: [[0, 'laughBelly']], emo: [[0, 'laugh']], lean: Math.sin(TT * 9) * 0.06 }); },
  ui() { popText('HAHA! 🤣', 540, 400, 91.05, 100, '#ffffff', -0.04, 0); },
  sfx: [[91.05, 'boing']] });
// ---- 49 · "Mit einer Kreditkarte? Niemals!" — arms crossed, head shaking
S(93.0, { tr: 'cut', cam: [[93.0, 540, 1000, 1.75], [95.65, 540, 985, 1.9]], punch: [[94.65, 0.08]],
  draw() { setAirfield({ blur: 10 }); char('seller', 540, FLOOR + 170, 1.05, { pose: [[0, 'armsCross']], emo: [[0, 'smug'], [94.65, 'angry', 0.15]], tilt: Math.sin(TT * 8) * 0.06 }); },
  ui() { popText('NIEMALS! ✋', 540, 400, 94.65, 100, '#ff4545', -0.04, 0); },
  sfx: [[93.7, 'cardIn'], [94.65, 'errorBuzz']] });
// ---- 50 · "Kevin am Telefon: Gib auf, das schaffst du nie!" — split call: Kevin at his party (top), Jonas at the jet (bottom)
S(95.65, { tr: 'slide', capY: YD, cam: [[95.65, 540, 960, 1.0], [98.7, 540, 960, 1.03]],
  draw() { splitEven(() => { setStreetParty({ blur: 6 }); char('kevin', 540, 1230, 1.05, { pose: [[0, 'phoneR']], emo: [[0, 'laugh']], extras: { shades: 1 }, holdR: () => phone(0, -30, 0.3, 0.15) }); },
    () => { ctx.save(); ctx.translate(0, 650); setAirfield({ blur: 6 }); ctx.restore(); char('jonas', 540, 2060, 1.05, jonasT({ pose: [[0, 'phoneR']], emo: [[0, 'serious']], look: [0, -0.5], holdR: () => phone(0, -30, 0.3, 0.15) })); }); },
  ui() { popText('GIB AUF! 😂', 540, 210, 96.85, 70, '#ff8fc0', -0.04, 0); },
  sfx: [[95.7, 'buzzPhone', 0.5], [96.85, 'pop', 1]] });

// =====================================================================  THE FINAL SECONDS
// ---- 51 · "Noch 10 Sekunden." — the red clock, the riser starts
clockShot(98.7, 99.95, { tr: 'glitch', tense: 1, c0: '#3a0a12', c1: '#5a1020', z1: 1.2, info: ['NOCH 10 SEKUNDEN!', 98.99, PAL.red], sfx: [[98.8, 'heartbeat', 1.2]] });
// ---- 52 · "Jonas hält die Karte ans Gerät." — slow motion: the card moves towards the terminal
S(99.95, { tr: 'zoomIn', tense: 1, noClock: 0, cam: [[99.95, 540, 960, 1.0], [101.65, 540, 960, 1.18]],
  draw() { setAirfield({ blur: 12 }); payTerminal(620, 1100, 1.2, 'wait', 0.05); const u = EZ.io(clamp((TT - 100.0) / 1.6)); blackCard(lerp(150, 520, u), lerp(600, 880, u), 0.7, { rot: lerp(-0.4, 0.1, u), glow: 0.3 }); },
  sfx: [[100.0, 'whoosh', 0.6], [100.7, 'heartbeat', 0.9]] });
// ---- 53-55 · "Drei." "Zwei." "Eins." — one giant number per cut
function countShot(t0, t1, n) { S(t0, { tr: 'cut', tense: 1, noClock: 1, cam: [[t0, 540, 960, 1.0], [t1, 540, 960, 1.12]], punch: [[t0 + 0.02, 0.14]],
  draw() { rays('#3a0a12', '#7a1020', { cy: 900, spin: 0.6 }); const k = sp(t0 + 0.01, 320, 10); ctx.save(); ctx.translate(540, 960); ctx.scale(k, k); tText(String(n), 0, 0, 640, { color: '#ffffff', stroke: '#2a0008', strokeW: 40 }); ctx.restore(); },
  sfx: [[t0 + 0.02, 'impact'], [t0 + 0.05, 'beep', 0.8]] }); }
countShot(101.65, 102.15, 3); countShot(102.15, 102.7, 2); countShot(102.7, 103.3, 1);
// ---- 56 · "Piep." — the card touches the terminal: BITTE WARTEN
S(103.3, { tr: 'cut', tense: 1, noClock: 1, cam: [[103.3, 560, 1000, 1.5], [103.9, 560, 1000, 1.6]],
  draw() { setAirfield({ blur: 12 }); payTerminal(620, 1100, 1.2, 'wait', 0.05); blackCard(560, 900, 0.7, { rot: 0.1 }); impactLines(600, 950, 120, 320, 10, 103.33); },
  sfx: [[103.33, 'beep', 1.2]] });
// ---- 57 · "Zahlung erfolgreich!" — green check, the jet's engines roar, Jonas jumps for joy
S(103.9, { tr: 'flash', noClock: 1, lift: 0, cam: [[103.9, 540, 1050, 1.0], [105.35, 540, 1030, 1.08]], punch: [[103.96, 0.12]],
  draw() { setAirfield(); privateJet(540, 1100, 0.8, 0); fillRR(-600, 1200, 2300, 900, 0, '#6a6f80'); char('jonas', 540, 1650, 0.75, jonasT({ pose: [[0, 'armsUp']], emo: [[0, 'laugh']], jump: [[0, 0], [104.0, 60, 0.15], [104.3, 0, 0.15], [104.6, 50, 0.15], [104.9, 0, 0.15]] })); confetti('c57', 103.96, 60); },
  ui() { const k = sp(103.96, 300, 11); ctx.save(); ctx.translate(540, 520); ctx.scale(k, k); fillRR(-380, -90, 760, 180, 40, '#18a050'); tText('✔ ZAHLUNG ERFOLGREICH', 0, 4, 54, { color: '#fff', shadow: false }); ctx.restore(); },
  sfx: [[103.96, 'buzzerWin'], [104.0, 'engine'], [104.48, 'applause', 1.0]] });

// =====================================================================  THE QUESTION: the receipt
// ---- 58 · "Wie viel hat Jonas in seinen 24 Stunden ausgegeben?" — the receipt prints line by line, the total stays ???
S(105.35, { tr: 'zoomOut', tense: 1, noClock: 1, cam: [[105.35, 540, 960, 1.0], [108.9, 540, 950, 1.06]],
  draw() { rays('#3a1a6a', '#5a2bd6', { cy: 900, spin: 0.15 }); bigReceipt(540, 250, 1.15, [['ROLEX', '50.000 €'], ['GEMÄLDE', '2.000.000 €'], ['G-KLASSE', '200.000 €'], ['PRIVATJET', '8.000.000 €']], 105.4, 0.22);
    char('jonas', 110, 1300, 0.45, jonasT({ pose: [[0, 'hips']], emo: [[0, 'smug']] })); char('kevin', 970, 1300, 0.45, { pose: [[0, 'headGrab']], emo: [[0, 'shock']], extras: { shades: 1 } }); },
  sfx: [[105.4, 'printer', 1.2], [105.7, 'tick'], [105.92, 'tick'], [106.14, 'tick'], [106.36, 'tick'], [106.7, 'cashReg'], [107.5, 'heartbeat', 1.2]] });
