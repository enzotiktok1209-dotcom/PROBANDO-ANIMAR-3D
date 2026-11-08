// =====================================================================
//  props17.js — the credit-card piece: a black card, the 24-hour countdown, a table with two buttons
//  per player, a street of closed shops, shopping bags, a street party, an angry neighbour's window,
//  a card terminal (ok / declined), an auction (gavel, framed painting, bidder), a G-Class, an airport
//  terminal hall, and a giant receipt for the ending.
// =====================================================================
// the premium black card, edge-on spin like a coin
function blackCard(x, y, s, o = {}) {
  const spin = o.spin ?? 0, sx = Math.cos(spin);
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0); ctx.scale(s * Math.max(0.05, Math.abs(sx)), s);
  if (o.glow) glow(0, 0, 360, '#ffd76a', o.glow);
  fillRR(-232, -142, 470, 296, 30, 'rgba(0,0,0,0.35)'); fillRR(-240, -150, 480, 300, 30, '#14141c'); fillRR(-240, -150, 480, 300, 30, 'rgba(255,215,106,0.06)');
  ctx.save(); rrPath(-240, -150, 480, 300, 30); ctx.clip(); for (let i = 0; i < 8; i++) line(-260 + i * 80, -170, -100 + i * 80, 170, 2, 'rgba(255,255,255,0.05)');
  const g = ((TT * 0.5 + (o.ph ?? 0)) % 1.6) - 0.3; ctx.globalAlpha = 0.35; ctx.rotate(-0.4); ctx.fillStyle = '#fff'; ctx.fillRect(-300 + g * 600, -300, 40, 600); ctx.restore();
  if (sx > 0.15) {
    fillRR(-190, -60, 90, 70, 12, '#e8c040'); for (let i = 0; i < 3; i++) line(-190, -40 + i * 18, -100, -40 + i * 18, 2, '#a8822a');
    tText('))) ', 170, -100, 40, { color: '#9aa0ae', shadow: false }); tText('UNLIMITED', -190, 60, 30, { color: '#e8c040', shadow: false, align: 'left', letter: 4 });
    tText('**** **** **** 2424', -190, 100, 26, { color: '#d8dce6', shadow: false, align: 'left', letter: 2 }); tText('∞', 170, 82, 80, { color: '#e8c040', shadow: false });
  }
  ctx.restore();
}
// the remaining time (hh:mm:ss) of the 24 hours, piecewise linear on the voice
const CLOCK_KEYS = [[0, 86400], [12.74, 86400], [29.95, 72000], [60.99, 54000], [62.17, 43200], [62.5, 43200], [77.48, 10800], [85.44, 600], [98.76, 10], [101.71, 3], [102.19, 2], [102.74, 1], [103.33, 0.4]];
function clockLeft(t = TT) { const K = CLOCK_KEYS; if (t <= K[0][0]) return K[0][1]; for (let i = 1; i < K.length; i++) if (t < K[i][0]) { const u = (t - K[i - 1][0]) / (K[i][0] - K[i - 1][0]); return lerp(K[i - 1][1], K[i][1], u); } return K[K.length - 1][1]; }
const hms = (sec) => { sec = Math.max(0, Math.floor(sec)); const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60; return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':'); };
// a big digital clock face
function digitalClock(x, y, s, txt, col = '#ff3b4a', o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  fillRR(-420, -150, 840, 300, 40, 'rgba(0,0,0,0.4)'); fillRR(-430, -160, 840, 300, 40, '#0c0b14'); fillRR(-410, -140, 800, 260, 28, '#16141f');
  if (o.label) tText(o.label, -10, -108, 30, { color: '#8c88a8', shadow: false, letter: 6 });
  tText(txt, -10, 14, 150, { color: col, shadow: false, weight: 900 }); glow(-10, 10, 380, col, 0.15);
  ctx.restore();
}
// the small countdown pill that stays at the top of the screen (ui space)
function clockHud(t0) {
  if (TT < t0) return; const left = clockLeft(), k = springEase(TT - t0, 260, 14), red = left < 3 * 3600, blink = left < 600 && Math.floor(TT * 4) % 2;
  ctx.save(); ctx.translate(540, 245); ctx.scale(k, k); fillRR(-200, -46, 400, 92, 46, red ? (blink ? '#ff3b4a' : '#b81b2b') : '#141026'); ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(255,255,255,0.25)'; rrPath(-200, -46, 400, 92, 46); ctx.stroke();
  tText('⏱', -150, 2, 44, { shadow: false }); tText(hms(left), 30, 4, 56, { color: '#ffffff', shadow: false }); ctx.restore();
}
// a game-show stand with two buttons for one player (same height as the old podiums): green (money) left, orange (card) right
function twoButtonDesk(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shadowEll(0, 8, 300, 34, 0.4);
  poly([[-260, 0], [-235, -330], [235, -330], [260, 0]], '#2b2440'); poly([[-260, 0], [-235, -330], [-190, -330], [-212, 0]], '#3a3157');
  fillRR(-260, -60, 520, 22, 6, PAL.yellow); fillRR(-250, -270, 500, 14, 6, 'rgba(255,210,63,0.6)');
  fillRR(-285, -360, 570, 44, 12, '#1d1830');
  const btn = (bx, col, lab, press, lit) => { const pz = (press ? 1 : 0) * 26; if (lit) glow(bx, -400, 170, col, 0.55 * lit);
    ell(bx, -370, 104, 32, shade(col, -0.45)); ell(bx, -384 + pz * 0.5, 90, 28 - pz * 0.2, shade(col, -0.25));
    ctx.beginPath(); ctx.ellipse(bx, -394 + pz, 86, 54 - pz * 1.4, 0, Math.PI, TAU); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ell(bx - 28, -416 + pz, 28, 11, 'rgba(255,255,255,0.55)', -0.3);
    fillRR(bx - 95, -240, 190, 64, 14, '#141026'); tText(lab, bx, -208, 34, { color: col, shadow: false }); };
  btn(-125, PAL.green, '10 MIO.', o.pressL, o.litL); btn(125, PAL.orange, 'KARTE', o.pressR, o.litR);
  ctx.restore();
}
// a row of shops with their shutters down: GESCHLOSSEN
function closedShops(x0, y, n, o = {}) {
  const cols = ['#ff8a5a', '#52b8ff', '#41f08a', '#ff63b8', '#ffd23f', '#9a7aff'], names = ['MODE', 'TECHNIK', 'SCHMUCK', 'SCHUHE', 'AUTOHAUS', 'UHREN'];
  for (let i = 0; i < n; i++) { const x = x0 + i * 420; fillRR(x, y - 620, 400, 620, 10, '#e8e2d6'); fillRR(x, y - 620, 400, 90, 10, cols[i % 6]); tText(names[i % 6], x + 200, y - 575, 44, { color: '#fff', shadow: false });
    fillRR(x + 30, y - 500, 340, 470, 8, '#8a8fa0'); for (let k = 0; k < 14; k++) line(x + 30, y - 490 + k * 33, x + 370, y - 490 + k * 33, 4, 'rgba(0,0,0,0.18)');
    ctx.save(); ctx.translate(x + 200, y - 300); ctx.rotate(-0.06 + (i % 2) * 0.1); fillRR(-150, -40, 300, 80, 12, '#ff3b4a'); tText('GESCHLOSSEN', 0, 2, 34, { color: '#fff', shadow: false }); ctx.restore(); }
}
// a pile of shopping bags
function shoppingBags(x, y, s, n = 6) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const R = RNG('bags'); for (let i = 0; i < n; i++) { const bx = (i % 3 - 1) * 150 + R.n(30), by = -Math.floor(i / 3) * 160, c = ['#ff63b8', '#52b8ff', '#ffd23f', '#41f08a', '#ff8a5a', '#9a7aff'][i % 6];
  ctx.save(); ctx.translate(bx, by); ctx.rotate(R.n(0.15)); fillRR(-80, -200, 160, 200, 10, c); fillRR(-80, -200, 160, 30, 8, shade(c, -0.15)); ctx.beginPath(); ctx.arc(0, -200, 40, Math.PI, 0); ctx.lineWidth = 10; ctx.strokeStyle = shade(c, -0.3); ctx.stroke(); ctx.restore(); } ctx.restore(); }
// a loudspeaker tower, pumping
function speakerBox(x, y, s) { const p = 1 + Math.max(0, Math.sin(TT * 12)) * 0.06; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fillRR(-110, -380, 220, 380, 16, '#1b1b24'); for (const [cy, r] of [[-280, 70], [-110, 90]]) { circ(0, cy, r * p, '#3a3a48'); circ(0, cy, r * 0.55 * p, '#15151d'); circ(0, cy, r * 0.2, '#5a5a6a'); } ctx.restore(); }
// a window with an angry neighbour shouting
function neighbourWindow(x, y, s, t0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fillRR(-180, -220, 360, 440, 14, '#f4f0e6'); fillRR(-160, -200, 320, 400, 8, '#ffe9a6'); glow(0, 0, 260, '#ffe9a6', 0.5);
  if (TT > t0) { const k = springEase(TT - t0, 260, 13); ctx.save(); ctx.translate(0, 200 - k * 120); circ(0, -60, 90, '#f6d2b5'); fillRR(-120, 20, 240, 200, 60, '#7a8096'); circ(-30, -70, 10, '#1b1530'); circ(30, -70, 10, '#1b1530'); line(-50, -100, -15, -88, 8, '#1b1530'); line(50, -100, 15, -88, 8, '#1b1530'); ell(0, -20, 26, 18, '#5a1020'); ctx.restore(); }
  line(0, -200, 0, 200, 10, '#f4f0e6'); ctx.restore(); }
// card terminal: '' (insert), 'wait', 'no', 'ok'
function payTerminal(x, y, s, state, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shadowEll(0, 280, 180, 24, 0.35);
  fillRR(-150, -260, 300, 520, 40, '#2a2b38'); fillRR(-150, -260, 300, 40, 30, '#3a3b4a');
  const bg = state === 'no' ? '#5a0f18' : state === 'ok' ? '#0f5a2c' : '#cfe8c4'; fillRR(-120, -220, 240, 180, 16, bg);
  const txt = state === 'no' ? 'ABGELEHNT' : state === 'ok' ? 'ERFOLGREICH' : state === 'wait' ? 'BITTE WARTEN' : 'KARTE AUFLEGEN';
  tText(state === 'no' ? '✖' : state === 'ok' ? '✔' : ')))', 0, -150, 60, { color: state ? '#fff' : '#1b1530', shadow: false }); tText(txt, 0, -80, 26, { color: state === 'no' || state === 'ok' ? '#fff' : '#1b1530', shadow: false, maxW: 220 });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) fillRR(-100 + c * 72, -10 + r * 60, 56, 44, 10, r === 3 ? ['#ff3b4a', '#ffd23f', '#2ee87a'][c] : '#4a4b5a');
  ctx.restore();
}
// an auction gavel; hit 0..1 swings it down
function gavel(x, y, s, hit = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fillRR(-160, 60, 320, 50, 16, '#6a3f22'); ctx.save(); ctx.translate(120, 40); ctx.rotate(-0.9 + hit * 0.9); fillRR(-260, -14, 260, 28, 12, '#8a5a3a'); ctx.save(); ctx.translate(-260, 0); fillRR(-60, -60, 120, 120, 20, '#7a4a2a'); fillRR(-70, -60, 20, 120, 8, PAL.gold); fillRR(50, -60, 20, 120, 8, PAL.gold); ctx.restore(); ctx.restore(); ctx.restore(); }
// a framed painting (abstract colourful)
function painting(x, y, s, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0); ctx.scale(s, s); shadowEll(0, 330, 260, 26, 0.3); if (o.glow) glow(0, 0, 420, '#fff3c0', o.glow);
  fillRR(-280, -330, 560, 660, 16, '#c99a1a'); fillRR(-250, -300, 500, 600, 8, '#a07a10'); fillRR(-230, -280, 460, 560, 4, '#1d2a5a');
  ctx.save(); rrPath(-230, -280, 460, 560, 4); ctx.clip(); circ(-60, -80, 150, '#ffd23f'); circ(100, 80, 180, '#ff3b4a'); poly([[-230, 280], [0, 20], [230, 280]], '#2ee87a'); circ(-120, 150, 70, '#52b8ff'); line(-230, -200, 230, 120, 18, '#ffffff'); ctx.restore();
  fillRR(-90, 300, 180, 40, 6, '#e8c040'); ctx.restore(); }
// an anonymous bidder: a dark silhouette with a question mark and a raised paddle
function bidder(x, y, s, raise = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); circ(0, -360, 110, '#1b1530'); fillRR(-170, -250, 340, 420, 120, '#1b1530'); ell(0, -470, 160, 30, '#1b1530'); fillRR(-110, -560, 220, 100, 30, '#1b1530');
  tText('?', 0, -350, 120, { color: '#ffd23f', shadow: false }); ctx.save(); ctx.translate(160, -200 - raise * 140); line(0, 0, 0, 200, 16, '#8a5a3a'); circ(0, -40, 70, '#ffffff'); tText('7', 0, -36, 70, { color: '#1b1530', shadow: false }); ctx.restore(); ctx.restore(); }
// a Mercedes G-Class style boxy off-roader (side view); old = sepia version
function gWagon(x, y, s, o = {}) {
  const col = o.col ?? '#2a2d36', sep = o.sepia, C = (h) => (sep ? mixHex(h, '#a8865a', 0.6) : h), spin = o.spin ?? 0;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 10, 440, 40, 0.4);
  fillRR(-420, -300, 840, 240, 26, C(col)); fillRR(-300, -470, 560, 190, 18, C(col)); fillRR(-270, -445, 230, 140, 10, C('#9fd0ff')); fillRR(-10, -445, 240, 140, 10, C('#9fd0ff'));
  fillRR(-420, -150, 840, 30, 8, C(shade(col, -0.3))); fillRR(380, -260, 40, 60, 10, C('#ffe9a6')); fillRR(-430, -280, 30, 80, 8, C('#ff3b4a')); circ(-440, -200, 70, C('#1b1b24')); circ(-440, -200, 40, C('#5a5a6a'));
  for (const wx of [-260, 260]) { ctx.save(); ctx.translate(wx, -50); circ(0, 0, 105, C('#15151d')); circ(0, 0, 60, C('#c9ced9')); ctx.rotate(spin); for (let i = 0; i < 5; i++) { ctx.rotate(TAU / 5); line(0, 0, 0, 52, 12, C('#7a7f8c')); } circ(0, 0, 18, C('#2a2d36')); ctx.restore(); }
  circ(300, -230, 26, C('#c9ced9')); tText('⊛', 300, -228, 34, { color: C('#2a2d36'), shadow: false });
  if (sep) { ctx.globalAlpha = 0.25; for (let i = 0; i < 6; i++) line(-450 + i * 180, -480, -420 + i * 180, 60, 3, '#3a2a10'); }
  ctx.restore();
}
// an airport terminal hall: big windows with a plane outside, departure board, shop fronts (OPEN)
function setTerminal(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#dfe8f6'], [1, '#b9c6dc']]); ctx.fillRect(-600, -400, 2300, 2800);
    fillRR(-600, 120, 2300, 700, 0, '#7cc6ff'); for (let i = 0; i < 9; i++) fillRR(-600 + i * 260, 120, 18, 700, 4, '#e8eef8'); privateJet(((TT * 60) % 1800) - 300, 640, 0.5);
    fillRR(80, 880, 920, 150, 14, '#1b1b24'); tText('ABFLUG', 160, 920, 30, { color: '#ffd23f', shadow: false, align: 'left', letter: 4 }); ['DUBAI 10:40', 'NEW YORK 11:15', 'MALLORCA 11:30'].forEach((t, i) => tText(t, 160 + i * 300, 980, 24, { color: '#fff', shadow: false, align: 'left' }));
    for (let i = 0; i < 3; i++) { const x = -40 + i * 400; fillRR(x, 1080, 360, 320, 10, '#f4f6fb'); fillRR(x, 1080, 360, 70, 10, ['#c99a1a', '#1d48b8', '#ff63b8'][i]); tText(['DUTY FREE', 'UHREN', 'MODE'][i], x + 180, 1116, 32, { color: '#fff', shadow: false }); fillRR(x + 30, 1170, 300, 200, 8, '#cfe8ff');
      fillRR(x + 90, 1250, 180, 50, 25, '#2ee87a'); tText('GEÖFFNET', x + 180, 1276, 24, { color: '#fff', shadow: false }); }
    ctx.fillStyle = lin(0, 1400, 0, 1920, [[0, '#d8dce6'], [1, '#a8b0c2']]); ctx.fillRect(-600, 1400, 2300, 900); for (let i = 0; i < 10; i++) line(-600 + i * 300, 1400, -900 + i * 380, 2300, 3, 'rgba(0,0,0,0.06)');
  });
}
// a street party at night: string lights, speakers, dancing silhouettes
function setStreetParty(o = {}) {
  withBlur(o.blur, () => {
    ctx.save(); setNightStreet(); ctx.restore(); stringLights(-100, 1180, 300, 60); stringLights(-100, 1180, 520, 50);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 5; i++) { const a = Math.sin(TT * 2 + i) * 0.6; ctx.save(); ctx.translate(100 + i * 220, 1500); ctx.rotate(a); poly([[-30, 0], [30, 0], [140, -1400], [-140, -1400]], ['rgba(255,79,163,0.18)', 'rgba(82,184,255,0.18)', 'rgba(65,240,138,0.16)'][i % 3]); ctx.restore(); } ctx.restore();
    speakerBox(80, 1480, 0.9); speakerBox(1000, 1480, 0.9);
    const R = RNG('dance'); for (let i = 0; i < 8; i++) { const x = 150 + i * 110 + R.n(20), b = Math.abs(Math.sin(TT * 8 + i)) * 30, c = ['#4a3780', '#3a2f6a', '#55408a'][i % 3]; circ(x, 1250 - b, 50, c); fillRR(x - 66, 1300 - b, 132, 240, 60, c); line(x - 50, 1320 - b, x - 100, 1200 - b - Math.sin(TT * 8 + i) * 40, 26, c); line(x + 50, 1320 - b, x + 100, 1200 - b + Math.sin(TT * 8 + i) * 40, 26, c); }
  });
}
// the giant receipt for the ending: lines appear one by one; the total is ???
function bigReceipt(x, y, s, lines, t0, dt = 0.18, total = '??? €') {
  const w = 620, rowH = 92, h = 220 + lines.length * rowH + 190, prog = clamp((TT - t0) / 0.6);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  fillRR(-w / 2 - 40, -60, w + 80, 70, 24, '#2b2a3a'); ctx.save(); ctx.beginPath(); ctx.rect(-w / 2 - 20, -10, w + 40, h * prog + 10); ctx.clip();
  fillRR(-w / 2, -20, w, h, 6, '#fbfaf3'); for (let i = 0; i < 16; i++) poly([[-w / 2 + i * w / 16, h - 20], [-w / 2 + (i + 0.5) * w / 16, h], [-w / 2 + (i + 1) * w / 16, h - 20]], '#fbfaf3');
  tText('KASSENBON · JONAS', 0, 40, 40, { color: '#1b1530', shadow: false, letter: 3 }); tText('24 STUNDEN · KARTE ∞', 0, 92, 24, { color: '#6a6f86', shadow: false }); line(-w / 2 + 30, 130, w / 2 - 30, 130, 4, '#1b1530');
  lines.forEach(([name, price], i) => { const tl = t0 + 0.3 + i * dt; if (TT < tl) return; const k = clamp((TT - tl) / 0.15), yy = 190 + i * rowH; ctx.save(); ctx.globalAlpha = k; tText(name, -w / 2 + 40, yy, 40, { color: '#1b1530', shadow: false, align: 'left' }); tText(price, w / 2 - 40, yy, 40, { color: '#1b1530', shadow: false, align: 'right' }); ctx.restore(); });
  const ty = 190 + lines.length * rowH + 30; line(-w / 2 + 30, ty - 40, w / 2 - 30, ty - 40, 4, '#1b1530');
  if (TT > t0 + 0.3 + lines.length * dt) { tText('SUMME', -w / 2 + 40, ty + 30, 52, { color: '#1b1530', shadow: false, align: 'left' }); const jit = Math.sin(TT * 30) * 2; tText(total, w / 2 - 40 + jit, ty + 30, 60, { color: '#e8262f', shadow: false, align: 'right' }); }
  ctx.restore(); ctx.restore();
}
