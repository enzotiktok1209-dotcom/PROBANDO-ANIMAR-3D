// =====================================================================
//  props18.js — 1 Million in 24 Stunden: the countdown HUD, a LED countdown board, a payment terminal with states
//  (paid / declined / loading), a padlock, a popcorn bucket, Monaco, a hotel suite, a shop door with an OPEN/CLOSED sign,
//  a contract, price slams ("fact" tags) that pop in as data, a receipt.
// =====================================================================
// story clock: seconds left in the 24 hours, keyed to the voice; FAKE = Jonas' clocks one hour ahead
const LEFT = [[0, 86400], [13.98, 86400], [15.4, 86000], [20.24, 82800], [23.09, 81000], [27.6, 79200], [31.78, 78000], [34.24, 67200], [36.45, 66000], [38.57, 64800],
  [42.41, 54000], [46.08, 50400], [48.92, 43200], [51.95, 36000], [57.9, 28800], [62.73, 25200], [65.6, 21600], [71.27, 1200], [73.92, 1150], [76.5, 840], [80.08, 480], [83.9, 240], [86.76, 60], [89.82, 20], [95.78, 3], [102.4, 1]];
function secsLeft(t = TT) { let v = LEFT[0][1]; for (let i = 1; i < LEFT.length; i++) { const [a, va] = LEFT[i - 1], [b, vb] = LEFT[i]; if (t >= a && t <= b) return lerp(va, vb, (t - a) / Math.max(0.001, b - a)); if (t > b) v = vb; } return v; }
const fakeOn = () => TT > 56.6 && TT < 64.21;
function fmtClock(s) { s = Math.max(0, Math.floor(s)); const h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60, x = s % 60; return [h, m, x].map((v) => String(v).padStart(2, '0')).join(':'); }
// the HUD at the top: a black pill, "NOCH" + the clock (red under one hour), flickers when Jonas tampers / Kevin gets the hour back
function timerHUD(o = {}) {
  if (TT < 13.98) return; const k = springEase(TT - 13.98, 260, 15), fake = fakeOn(), s = secsLeft() - (fake ? 3600 : 0), low = s < 3600;
  const y = o.y ?? 262, R = RNG('hud', Math.round(TT * 30)), gl = fake && TT < 57.4 ? R.n(14) : 0;
  ctx.save(); ctx.translate(540 + gl, y); ctx.scale(k * (o.s ?? 1), k * (o.s ?? 1));
  fillRR(-250, -52, 500, 104, 52, 'rgba(0,0,0,0.78)'); ctx.lineWidth = 5; ctx.strokeStyle = low || fake ? '#ff3b3b' : '#ffffff'; rrPath(-250, -52, 500, 104, 52); ctx.stroke();
  circ(-196, 0, 16, low || fake ? (Math.sin(TT * 12) > 0 ? '#ff3b3b' : '#5a1010') : '#41f08a'); tText('NOCH', -128, 2, 30, { color: '#cfd3e2', shadow: false, letter: 2 });
  tText(fmtClock(s), 70, 4, 58, { color: low || fake ? '#ff4545' : '#ffffff', shadow: false });
  if (TT > 64.21 && TT < 66.2) { const u = (TT - 64.21) / 2; ctx.globalAlpha = 1 - u; tText('+1:00:00', 120, -90 - u * 60, 46, { color: '#41f08a', stroke: '#06180c', strokeW: 9 }); }
  if (fake && TT < 58.4) { ctx.globalAlpha = clamp(1.6 - (TT - 56.6)); tText('–1:00:00', 120, -90, 46, { color: '#ff4545', stroke: '#2a0606', strokeW: 9 }); }
  ctx.restore();
}
// a data tag that slams in (diagonal, with a flash): price, fact, stamp
function fact(str, t0, x, y, o = {}) {
  if (TT < t0) return; const u = TT - t0, k = springEase(u, 380, 13), sc = k * (1 + 0.5 * Math.max(0, 1 - u / 0.1)), size = o.size ?? 64, w = textW(str, size, 900) + size * 1.1;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -0.06); ctx.scale(sc, sc);
  if (u < 0.15) glow(0, 0, w * 0.7, '#ffffff', 0.6 * (1 - u / 0.15));
  fillRR(-w / 2 + 10, -size * 0.75 + 12, w, size * 1.5, 12, 'rgba(0,0,0,0.45)'); fillRR(-w / 2, -size * 0.75, w, size * 1.5, 12, o.bg ?? '#ff2e4d');
  fillRR(-w / 2, -size * 0.75, 18, size * 1.5, 6, o.edge ?? '#ffffff');
  tText(str, 9, 2, size, { color: o.fg ?? '#ffffff', shadow: false, maxW: 960 }); ctx.restore();
}
// a rubber stamp that thuds down (text in a frame)
function stampMark(str, t0, x, y, col = '#ff2e4d', size = 96, rot = -0.18) {
  if (TT < t0) return; const u = TT - t0, sc = u < 0.12 ? lerp(2.4, 1, EZ.i3(u / 0.12)) : 1;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha = 0.92; const w = textW(str, size, 900) + 60;
  ctx.lineWidth = 12; ctx.strokeStyle = col; rrPath(-w / 2, -size * 0.75, w, size * 1.5, 18); ctx.stroke(); tText(str, 0, 4, size, { color: col, shadow: false }); ctx.restore();
}
// a big LED countdown board (HH:MM:SS) on a frame
function ledBoard(x, y, s, secs, col = '#ff3030') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fillRR(-420, -150, 840, 300, 30, '#141018'); fillRR(-400, -130, 800, 260, 20, '#08060c');
  glow(0, 0, 420, col, 0.25); tText(fmtClock(secs), 0, 8, 170, { color: col, shadow: false }); for (let i = 0; i < 26; i++) line(-400, -130 + i * 10, 400, -130 + i * 10, 2, 'rgba(0,0,0,0.35)'); ctx.restore();
}
// a payment terminal: state 'pay' (amount), 'ok' (green tick), 'no' (red cross), 'load' (spinner)
function payTerminal(x, y, s, state, amount = '', t0 = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 280, 200, 26, 0.35);
  fillRR(-160, -270, 320, 540, 44, '#22232e'); fillRR(-160, -270, 320, 40, 20, '#33354a'); fillRR(-128, -226, 256, 200, 18, '#0d1420');
  const sc = state === 'no' ? '#ff3b4a' : state === 'ok' ? '#41f08a' : '#52b8ff';
  if (state === 'pay') { tText('BETRAG', 0, -186, 22, { color: '#8fa0c0', shadow: false, letter: 3 }); tText(amount, 0, -120, 42, { color: '#ffffff', shadow: false, maxW: 236 }); tText('KARTE AUFLEGEN', 0, -60, 18, { color: '#52b8ff', shadow: false }); }
  else if (state === 'load') { for (let i = 0; i < 10; i++) { const a = i / 10 * TAU + TT * 6; ctx.globalAlpha = (i + 1) / 10; circ(Math.cos(a) * 50, -150 + Math.sin(a) * 50, 10, '#52b8ff'); } ctx.globalAlpha = 1; tText('BITTE WARTEN…', 0, -50, 20, { color: '#cfd8ea', shadow: false }); }
  else { glow(0, -126, 220, sc, 0.35); circ(0, -140, 54, sc); if (state === 'ok') { ctx.lineCap = 'round'; ctx.lineWidth = 16; ctx.strokeStyle = '#06180c'; ctx.beginPath(); ctx.moveTo(-24, -140); ctx.lineTo(-6, -120); ctx.lineTo(28, -160); ctx.stroke(); } else { line(-22, -162, 22, -118, 16, '#2a0606'); line(22, -162, -22, -118, 16, '#2a0606'); }
    tText(state === 'ok' ? 'BEZAHLT' : 'ABGELEHNT', 0, -60, 30, { color: sc, shadow: false }); }
  for (let i = 0; i < 12; i++) fillRR(-104 + (i % 3) * 72, 10 + Math.floor(i / 3) * 56, 62, 44, 10, i === 11 ? '#2a9a4a' : i === 9 ? '#c0392b' : '#3a3c52');
  for (let i = 0; i < 4; i++) { ctx.save(); ctx.globalAlpha = 0.3 * (1 - i / 4); ctx.lineWidth = 6; ctx.strokeStyle = '#ffffff'; ctx.beginPath(); ctx.arc(0, -296, 24 + i * 18, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
// a padlock (closed), red glow
function padlock(x, y, s, col = '#ff3b4a') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); glow(0, 0, 220, col, 0.35); ctx.lineWidth = 34; ctx.strokeStyle = '#c0c6d6'; ctx.beginPath(); ctx.arc(0, -70, 80, Math.PI, 0); ctx.lineTo(80, 0); ctx.moveTo(-80, 0); ctx.lineTo(-80, -70); ctx.stroke(); fillRR(-120, -10, 240, 190, 30, col); circ(0, 70, 26, '#2a0606'); fillRR(-10, 70, 20, 60, 8, '#2a0606'); ctx.restore(); }
// a striped popcorn bucket
function popcorn(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 16; i++) { const R = RNG('pc', i); circ(R.n(110), -200 - R.f() * 70, 34 + R.f() * 12, i % 3 ? '#fff6dc' : '#ffe9a6'); }
  ctx.beginPath(); ctx.moveTo(-130, -200); ctx.lineTo(130, -200); ctx.lineTo(100, 0); ctx.lineTo(-100, 0); ctx.closePath(); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.save(); ctx.clip(); for (let i = -3; i <= 3; i++) poly([[i * 60 - 20, -210], [i * 60 + 20, -210], [i * 46 + 16, 10], [i * 46 - 16, 10]], '#e8262f'); ctx.restore();
  fillRR(-70, -140, 140, 60, 12, '#ffd23f'); tText('POPCORN', 0, -110, 22, { color: '#8a1a1a', shadow: false }); ctx.restore(); }
// Monaco at sunset: mountains, the old town on the rock, the casino dome, the harbour full of yachts
function setMonaco(o = {}) {
  withBlur(o.blur, () => {
    const n = o.night ?? 0;
    ctx.fillStyle = n ? lin(0, -400, 0, 1100, [[0, '#0d0a2e'], [0.6, '#3a1d6e'], [1, '#c54a8a']]) : lin(0, -400, 0, 1100, [[0, '#ff7a59'], [0.55, '#ffb86b'], [1, '#ffe2a8']]); ctx.fillRect(-600, -400, 2300, 1500);
    if (!n) { glow(300, 520, 380, '#fff1b0', 0.55); circ(300, 560, 90, '#fff3c8'); }
    ctx.fillStyle = n ? '#2a1d4a' : '#9a5a6a'; ctx.beginPath(); ctx.moveTo(-600, 900); ctx.lineTo(-200, 420); ctx.lineTo(120, 700); ctx.lineTo(420, 380); ctx.lineTo(800, 760); ctx.lineTo(1100, 460); ctx.lineTo(1700, 900); ctx.closePath(); ctx.fill();
    for (let i = 0; i < 22; i++) { const x = -200 + i * 70, h = 120 + ((i * 53) % 200), yb = 1000 - (i % 4) * 20; fillRR(x, yb - h, 62, h, 4, ['#f2d0b0', '#e8b8a0', '#f6e2c8', '#d9a890'][i % 4]); for (let r = 0; r < h / 34 - 1; r++) fillRR(x + 10, yb - h + 14 + r * 32, 42, 12, 3, n ? 'rgba(255,220,140,0.85)' : 'rgba(80,60,90,0.35)'); poly([[x - 4, yb - h], [x + 31, yb - h - 26], [x + 66, yb - h]], '#c05a3a'); }
    ctx.save(); ctx.translate(760, 930); fillRR(-180, -140, 360, 140, 8, '#f4ead6'); ell(0, -150, 110, 90, '#7aa6a0'); ell(0, -150, 80, 70, '#9ac8c0'); for (let i = 0; i < 6; i++) fillRR(-150 + i * 56, -110, 30, 90, 14, n ? '#ffd27a' : '#c9b48a'); tText('CASINO', 0, -10, 30, { color: '#7a5a2a', shadow: false, letter: 4 }); if (n) glow(0, -80, 260, '#ffd27a', 0.35); ctx.restore();
    ctx.fillStyle = n ? lin(0, 1000, 0, 1700, [[0, '#3a3a8a'], [1, '#0a1240']]) : lin(0, 1000, 0, 1700, [[0, '#2aa6e8'], [1, '#0b5c98']]); ctx.fillRect(-600, 1000, 2300, 1400);
    for (let i = 0; i < 12; i++) { const y = 1030 + i * 44, off = Math.sin(TT * 1.6 + i) * 30, a = (i * 137) % 300; line(-600 + off + a, y, -330 + off + a, y, 4, 'rgba(255,255,255,0.3)'); }
    for (let i = 0; i < 6; i++) { const b = Math.sin(TT * 2 + i) * 3; ctx.save(); ctx.translate(-80 + i * 230, 1090 + (i % 2) * 40 + b); ctx.scale(0.36, 0.36); poly([[-200, 0], [220, 0], [170, 70], [-170, 70]], '#ffffff'); poly([[-120, 0], [-100, -60], [120, -60], [150, 0]], '#e8edf7'); for (let k = 0; k < 4; k++) fillRR(-90 + k * 55, -48, 34, 22, 6, '#4b7bd8'); ctx.restore(); }
    tText('MONACO', 540, 600, 110, { color: 'rgba(255,255,255,0.92)', stroke: 'rgba(60,20,60,0.5)', strokeW: 14, letter: 10 });
  });
}
// the most expensive hotel suite: a huge window over Monaco at night, a chandelier, a king-size bed, gold details
function setSuite(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, -400, 0, 1600, [[0, '#2a1d3a'], [1, '#4a3048']]); ctx.fillRect(-600, -400, 2300, 2400);
    ctx.save(); rrPath(80, 220, 920, 760, 16); ctx.clip(); ctx.translate(80, 220); ctx.scale(920 / 1080, 760 / 1300); setMonaco({ night: 1 }); ctx.restore();
    for (const x of [80, 540, 1000]) fillRR(x - 14, 210, 28, 780, 6, '#d9a520'); fillRR(70, 200, 940, 28, 6, '#d9a520'); fillRR(70, 970, 940, 28, 6, '#d9a520');
    for (const x of [20, 1060]) { ctx.fillStyle = lin(x - 80, 0, x + 80, 0, [[0, '#7a1f3a'], [1, '#a8304f']]); ctx.fillRect(x - 80, 160, 160, 1000); }
    line(540, -200, 540, 100, 6, '#d9a520'); for (let i = 0; i < 9; i++) { const a = i / 8 * Math.PI; circ(540 + Math.cos(a) * 130, 110 + Math.sin(a) * 40, 14, '#fff6c8'); line(540 + Math.cos(a) * 130, 110 + Math.sin(a) * 40, 540 + Math.cos(a) * 130, 160 + Math.sin(a) * 40, 4, '#ffe9a6'); } glow(540, 130, 300, '#fff1c0', 0.35);
    ctx.fillStyle = '#3a2238'; ctx.fillRect(-600, 1160, 2300, 1000); for (let i = 0; i < 14; i++) line(-600 + i * 180, 1160, -900 + i * 250, 2000, 3, 'rgba(255,255,255,0.05)');
    fillRR(180, 1080, 720, 260, 30, '#f6efe4'); fillRR(160, 1000, 760, 110, 30, '#7a1f3a'); fillRR(220, 1110, 220, 90, 40, '#ffffff'); fillRR(640, 1110, 220, 90, 40, '#ffffff'); fillRR(180, 1260, 720, 80, 20, '#d9a520');
  });
}
// a shop's glass door (front view) with a hanging sign: OFFEN / GESCHLOSSEN; open 0..1 swings it
function glassDoor(x, y, s, sign = 'OFFEN', flip = 0, open = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  fillRR(-260, -900, 520, 900, 8, '#30364e'); const k = 1 - open * 0.8;
  ctx.save(); ctx.translate(-240, 0); ctx.scale(k, 1); fillRR(0, -880, 480, 880, 6, 'rgba(160,210,255,0.32)'); line(0, -880, 0, 0, 12, '#9aa3b8'); line(480, -880, 480, 0, 12, '#9aa3b8'); line(70, -820, 140, -600, 10, 'rgba(255,255,255,0.45)'); fillRR(420, -500, 20, 140, 8, '#c0c6d6');
  ctx.save(); ctx.translate(240, -560); ctx.scale(Math.cos(flip * Math.PI) || 0.02, 1); line(-80, -120, 0, -180, 4, '#888'); line(80, -120, 0, -180, 4, '#888'); const cl = (flip < 0.5) === (sign === 'OFFEN');
    fillRR(-150, -120, 300, 120, 14, cl ? '#1e9a4a' : '#c0392b'); tText(cl ? 'OFFEN' : 'GESCHLOSSEN', 0, -58, cl ? 50 : 34, { color: '#fff', shadow: false }); ctx.restore();
  ctx.restore(); ctx.restore();
}
// a contract on a desk with a signature line that is drawn on with progress p
function contract(x, y, s, p, title = 'KAUFVERTRAG · FERRARI') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 330, 340, 30, 0.3); fillRR(-300, -360, 600, 700, 14, '#ffffff'); fillRR(-300, -360, 600, 90, 14, '#c0392b'); tText(title, 0, -315, 30, { color: '#fff', shadow: false, maxW: 560 });
  for (let i = 0; i < 9; i++) fillRR(-240, -230 + i * 44, i % 3 === 2 ? 300 : 480, 14, 7, '#dde1ea'); tText('240.000 €', 0, 200, 56, { color: '#1b1530', shadow: false }); line(-220, 290, 220, 290, 4, '#1b1530');
  if (p > 0) { ctx.save(); ctx.beginPath(); ctx.rect(-220, 180, 440 * p, 110); ctx.clip(); ctx.lineWidth = 7; ctx.strokeStyle = '#1d3fb0'; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const u = i / 60, px = -200 + u * 400, py = 262 - Math.sin(u * 22) * 22 * (1 - u * 0.5) - u * 20; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
// a receipt that prints the purchases one by one (items shown up to `n`)
const BUYS = [['LAMBORGHINI', '250.000 €'], ['ROLEX', '50.000 €'], ['PRIVATJET', '100.000 €'], ['HOTELSUITE', '30.000 €'], ['PARTY', '200.000 €'], ['DIAMANTKETTE', '100.000 €'], ['GOLDENE PS5', '20.000 €'], ['FERRARI', '240.000 €']];
function receipt(x, y, s, n) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const h = 140 + n * 70; fillRR(-300, -40, 600, h, 6, '#fbfaf4'); for (let i = 0; i < 20; i++) poly([[-300 + i * 30, h - 40], [-285 + i * 30, h - 22], [-270 + i * 30, h - 40]], '#fbfaf4');
  tText('KEVINS KASSENBON', 0, 10, 34, { color: '#1b1530', shadow: false, letter: 2 }); line(-260, 46, 260, 46, 3, '#c0c4d4');
  for (let i = 0; i < n; i++) { ctx.textAlign = 'left'; tText(BUYS[i][0], -150, 100 + i * 70, 34, { color: '#1b1530', shadow: false }); tText('– ' + BUYS[i][1], 140, 100 + i * 70, 34, { color: '#c0392b', shadow: false }); }
  ctx.restore();
}
// Jonas' banking app: "incoming transfer" with a value that is hidden (???)
function transferPhone(x, y, s, rot = 0, show = 1) {
  phone(x, y, s, rot, () => { ctx.fillStyle = lin(0, -176, 0, 176, [[0, '#0e1a2e'], [1, '#1d2a4a']]); ctx.fillRect(-84, -176, 168, 352);
    tText('BANK · JONAS', 0, -150, 14, { color: '#9fb4d8', shadow: false, letter: 2 }); fillRR(-74, -110, 148, 140, 16, '#14223c'); tText('EINGEHENDE', 0, -84, 13, { color: '#cfd8ea', shadow: false }); tText('ÜBERWEISUNG', 0, -66, 13, { color: '#cfd8ea', shadow: false });
    if (show) tText('??? €', 0, -18, 36, { color: '#41f08a', shadow: false }); for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + TT * 5; ctx.globalAlpha = (i + 1) / 8; circ(Math.cos(a) * 22, 80 + Math.sin(a) * 22, 6, '#52b8ff'); } ctx.globalAlpha = 1; });
}
