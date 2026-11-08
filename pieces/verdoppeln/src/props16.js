// =====================================================================
//  props16.js — the doubling-euro piece: a 1-euro coin, a doubling grid, a money washing machine,
//  a padlock, a bank front, a stock app, butler bow tie + silver tray, a shiny shoe, a paper cup,
//  grabbing hands, a big money counter.
// =====================================================================
// a 1-euro coin seen face-on (bimetal: gold ring, silver centre); spin turns it about its vertical axis
function euroCoin(x, y, r, o = {}) {
  const spin = o.spin ?? 0, sx = Math.cos(spin);
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0);
  if (o.shadow !== false) shadowEll(0, r * 1.08, r * 0.9, r * 0.16, 0.3);
  if (o.glow) glow(0, 0, r * 2.2, '#fff2b0', o.glow);
  const th = r * 0.14 * Math.abs(Math.sin(spin)) + r * 0.03;
  ctx.save(); ctx.translate(Math.sign(Math.sin(spin) || 1) * th * 0.5, 0); ctx.scale(Math.max(0.04, Math.abs(sx)), 1); circ(0, 0, r, '#a8822a'); ctx.restore();
  ctx.save(); ctx.scale(Math.max(0.04, Math.abs(sx)), 1);
  circ(0, 0, r, '#e8c040'); circ(0, 0, r * 0.92, '#f6d365'); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; circ(Math.cos(a) * r * 0.82, Math.sin(a) * r * 0.82, r * 0.035, '#c99a1a'); }
  circ(0, 0, r * 0.66, '#9aa0ae'); circ(0, 0, r * 0.62, '#d8dce6');
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r * 0.62, 0, TAU); ctx.clip(); ctx.globalAlpha = 0.4; poly([[-r, -r], [-r * 0.4, -r], [r * 0.3, r], [-r * 0.3, r]], '#ffffff'); ctx.restore();
  if (Math.abs(sx) > 0.15) { ctx.save(); ctx.scale(sx < 0 ? -1 : 1, 1); tText('1', -r * 0.12, -r * 0.02, r * 0.78, { color: '#5a6070', shadow: false }); tText('EURO', r * 0.28, r * 0.28, r * 0.15, { color: '#5a6070', shadow: false }); ctx.restore(); }
  const g = ((TT * 0.6 + (o.ph ?? 0)) % 1.6) - 0.3; ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.clip(); ctx.globalAlpha = 0.4; ctx.rotate(-0.5); ctx.fillStyle = '#fff'; ctx.fillRect(-r * 1.5 + g * r * 2.4, -r * 1.5, r * 0.2, r * 3); ctx.restore();
  ctx.restore(); ctx.restore();
}
// the doubling grid: n coins (1, 2, 4, 8, 16 ...) pop in, packed into a w x h box
function doublingGrid(cx, cy, w, h, n, t0, dt = 0.05) {
  const cols = Math.ceil(Math.sqrt(n * w / h)), rows = Math.ceil(n / cols), cell = Math.min(w / cols, h / rows), r = cell * 0.42;
  for (let i = 0; i < n; i++) { const tb = t0 + Math.min(i, 40) * dt; if (TT < tb) continue; const k = springEase(TT - tb, 320, 13), c = i % cols, rr = Math.floor(i / cols);
    euroCoin(cx - (cols - 1) * cell / 2 + c * cell, cy - (rows - 1) * cell / 2 + rr * cell, r * k, { spin: Math.sin(TT * 3 + i) * 0.3, shadow: false, ph: i * 0.1 }); }
}
// a paper cup on the pavement
function paperCup(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 6, 90, 16, 0.35); poly([[-70, -150], [70, -150], [52, 0], [-52, 0]], '#e9e2d0'); fillRR(-78, -165, 156, 22, 8, '#f6f1e4'); fillRR(-62, -100, 124, 40, 6, '#c9b896'); ctx.restore(); }
// a washing machine full of banknotes ("Geldwäsche")
function moneyWasher(x, y, s, spin = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 300, 300, 34, 0.4);
  fillRR(-260, -300, 520, 600, 36, '#f4f6fb'); fillRR(-260, -300, 520, 120, 36, '#e2e6f2'); fillRR(-260, -220, 520, 40, 0, '#e2e6f2');
  for (let i = 0; i < 3; i++) circ(-170 + i * 70, -240, 18, ['#ff3b4a', '#2ee87a', '#52b8ff'][i]); fillRR(90, -262, 130, 44, 10, '#141026'); tText('GELD', 155, -240, 24, { color: '#2ee87a', shadow: false });
  circ(0, 60, 200, '#c9cede'); circ(0, 60, 170, '#1d2440');
  ctx.save(); ctx.beginPath(); ctx.arc(0, 60, 165, 0, TAU); ctx.clip(); ctx.translate(0, 60); ctx.rotate(spin); for (let i = 0; i < 9; i++) { const a = i / 9 * TAU; bill(Math.cos(a) * 90, Math.sin(a) * 90, 120, a + 0.5); } ctx.restore();
  ctx.save(); ctx.globalAlpha = 0.25; ell(-60, 0, 60, 30, '#ffffff', -0.6); ctx.restore();
  ctx.restore();
}
// a big padlock, open 0..1 lifts the shackle
function padlock(x, y, s, open = 0, col = '#ff3b4a') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const lift = open * 70;
  ctx.save(); ctx.translate(open * 40, -lift); ctx.beginPath(); ctx.arc(0, -90, 95, Math.PI, 0); ctx.lineTo(95, -30); ctx.moveTo(-95, -90); ctx.lineTo(-95, -30); ctx.lineWidth = 42; ctx.strokeStyle = '#c9cede'; ctx.stroke(); ctx.restore();
  fillRR(-150, -50, 300, 240, 34, col); fillRR(-150, -50, 300, 40, 20, shade(col, 0.2)); circ(0, 50, 30, '#1b1530'); fillRR(-12, 60, 24, 70, 8, '#1b1530');
  ctx.restore();
}
// a bank front with columns
function bankFront(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 10, 520, 40, 0.35);
  poly([[-480, -560], [480, -560], [0, -760]], '#e8ecf8'); fillRR(-500, -580, 1000, 40, 8, '#cfd5e6'); tText('BANK', 0, -640, 70, { color: '#1d48b8', shadow: false, letter: 10 });
  for (let i = 0; i < 6; i++) { fillRR(-420 + i * 165, -540, 70, 500, 10, '#f4f6fb'); fillRR(-430 + i * 165, -540, 90, 30, 6, '#cfd5e6'); }
  fillRR(-520, -40, 1040, 50, 8, '#cfd5e6'); fillRR(-90, -360, 180, 320, 12, '#3a3f5a');
  ctx.restore();
}
// a stock app on a phone screen: a green line, the BUY button
function stockScreen(prog, pressed = 0, o = {}) {
  ctx.fillStyle = lin(0, -176, 0, 176, [[0, '#0f1530'], [1, '#090c1d']]); ctx.fillRect(-84, -176, 168, 352);
  fillRR(-84, -176, 168, 52, 0, '#1d48b8'); tText('MEINE BANK', 0, -150, 16, { color: '#fff', shadow: false });
  tText('AKTIEN', -70, -104, 13, { color: '#8c93b8', shadow: false, align: 'left', letter: 2 }); tText(o.value ?? '+0 %', 70, -104, 15, { color: '#2ee87a', shadow: false, align: 'right' });
  ctx.save(); ctx.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30; if (u > prog) break; const v = (o.curve ?? ((q) => 0.15 + q * q * 0.8 + Math.sin(q * 14) * 0.04))(u); const px = -70 + u * 140, py = 40 - v * 110; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.lineWidth = 5; ctx.strokeStyle = '#2ee87a'; ctx.stroke(); ctx.restore();
  fillRR(-66, 92, 132, 48, 14, pressed ? '#2ee87a' : '#26a24c'); tText('KAUFEN', 0, 116, 20, { color: '#fff', shadow: false });
  if (pressed) { ctx.save(); ctx.globalAlpha = clamp(1 - pressed); circ(0, 116, 40 + pressed * 40, 'rgba(46,232,122,0.5)'); ctx.restore(); }
}
// a bank app: locked (red) or free (green)
function bankLockScreen(locked) {
  ctx.fillStyle = lin(0, -176, 0, 176, [[0, '#f4f6ff'], [1, '#e2e7fb']]); ctx.fillRect(-84, -176, 168, 352);
  fillRR(-84, -176, 168, 52, 0, locked ? '#d81b2b' : '#18a050'); tText(locked ? 'GESPERRT' : 'FREIGEGEBEN', 0, -150, 15, { color: '#fff', shadow: false });
  padlock(0, -20, 0.32, locked ? 0 : 1, locked ? '#ff3b4a' : '#2ee87a');
  tText(locked ? 'Verdacht auf' : 'Alles sauber ✅', 0, 80, 14, { color: '#1b1530', shadow: false, weight: 800 }); if (locked) tText('Geldwäsche', 0, 102, 16, { color: '#d81b2b', shadow: false });
}
// a butler's bow tie
function bowTie(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); poly([[0, 0], [-110, -60], [-110, 60]], '#1b1b24'); poly([[0, 0], [110, -60], [110, 60]], '#1b1b24'); fillRR(-26, -30, 52, 60, 14, '#2e2e3c'); ctx.restore(); }
// a silver tray with a cloche
function silverTray(x, y, s, lid = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 30, 240, 24, 0.3); ell(0, 0, 240, 34, '#c9cede'); ell(0, -6, 220, 26, '#e8ebf2');
  ctx.save(); ctx.translate(0, -lid * 120); ctx.beginPath(); ctx.arc(0, -10, 170, Math.PI, 0); ctx.fillStyle = lin(0, -180, 0, 0, [[0, '#ffffff'], [1, '#b9bfd0']]); ctx.fill(); circ(0, -185, 20, '#d8dce6'); ctx.restore(); ctx.restore(); }
// a shiny sneaker (side view)
function shinyShoe(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shadowEll(0, 70, 220, 26, 0.3);
  ctx.beginPath(); ctx.moveTo(-200, 60); ctx.lineTo(-200, -40); ctx.quadraticCurveTo(-180, -110, -90, -110); ctx.lineTo(-20, -60); ctx.quadraticCurveTo(120, -40, 200, 10); ctx.lineTo(200, 60); ctx.closePath(); ctx.fillStyle = '#ffffff'; ctx.fill();
  fillRR(-205, 40, 410, 34, 14, '#e8e9f2'); for (let i = 0; i < 4; i++) line(-80 + i * 26, -86 + i * 8, -40 + i * 26, -70 + i * 8, 6, '#2f6df6'); poly([[-60, -10], [60, -30], [100, 20], [-30, 30]], '#2f6df6');
  sparkle(-120, -120, 34, '#fff'); sparkle(140, -60, 24, '#fff'); ctx.restore(); }
// grabbing hands reaching in from the bottom (n hands)
function grabHands(seed, cx, cy, n, t0) { const R = RNG(seed); for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + R.n(1.1), d = 520 + R.f() * 200, t = t0 + i * 0.06, k = EZ.o3(clamp((TT - t) / 0.35)), wig = Math.sin(TT * 9 + i) * 10;
  const sx = cx + Math.cos(a + Math.PI) * d, sy = cy + Math.sin(a + Math.PI) * d * -1 + 300, ex = lerp(sx, cx + Math.cos(a) * -60, k), ey = lerp(sy, cy + 120, k) + wig, skin = ['#f3c9a5', '#c98b62', '#e2a77c', '#f6d2b5'][i % 4];
  line(sx, sy + 400, ex, ey, 70, ['#4a3780', '#2f6df6', '#e8483c', '#26a24c'][i % 4]); circ(ex, ey, 42, skin); for (let f = 0; f < 4; f++) line(ex - 30 + f * 20, ey - 20, ex - 34 + f * 22, ey - 60 - (f % 2) * 10, 14, skin); } }
// a big money counter card
function moneyCard(x, y, s, label, value, col = '#2ee87a') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fillRR(-470, -110, 940, 220, 40, 'rgba(0,0,0,0.35)'); fillRR(-480, -120, 940, 220, 40, '#141026');
  tText(label, -10, -80, 32, { color: '#9f95c9', shadow: false, letter: 6 }); tText(typeof value === 'number' ? fmtEUR(Math.round(value)) : value, -10, 14, 104, { color: col, shadow: false, maxW: 880 }); ctx.restore(); }
// a speech bubble with text
function bubble(x, y, txt, t0, o = {}) { if (TT < t0) return; const k = springEase(TT - t0, 300, 13), size = o.size ?? 40, w = textW(txt, size, 900) + 60, h = size * 1.8;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(o.rot ?? 0); poly([[-20, h / 2 - 4], [20, h / 2 - 4], [o.tail ?? -30, h / 2 + 40]], o.bg ?? '#ffffff'); fillRR(-w / 2, -h / 2, w, h, h / 2, o.bg ?? '#ffffff'); tText(txt, 0, 2, size, { color: o.fg ?? '#1b1530', shadow: false }); ctx.restore(); }
