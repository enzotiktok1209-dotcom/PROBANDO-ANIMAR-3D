// =====================================================================
//  props12.js — the villa piece: the yacht seller, the harbour, energy cans, cables, the gift box,
//  the diamond Rolex, stink lines, a key, a bank card in a hand, a Miami welcome sign, a shopping cart.
// =====================================================================
LOOKS.seller = { skin: '#d9a27a', skinD: '#bf855e', top: '#1f2b4d', topD: '#141c36', topL: '#33467a', pants: '#1f2b4d', pantsD: '#141c36',
  shoe: '#2a1a12', shoeD: '#160d08', sole: '#3a2a20', hair: '#3b2a1e', hairD: '#24180f' };
// a sunny harbour: sky, Miami skyline far away, the sea with moving glints, sailboats, a wooden pier, a seagull
function setHarbor(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, -400, 0, 1100, [[0, '#3f9cf6'], [0.7, '#9fd8ff'], [1, '#ffe2a8']]); ctx.fillRect(-600, -400, 2300, 1500);
    glow(880, 250, 320, '#fff1a0', 0.45); circ(880, 250, 92, '#fff6c8');
    for (const [x, y, s] of [[150, 260, 1], [560, 150, 0.8], [1000, 430, 0.7]]) { const dx = (TT * 14) % 80; ell(x + dx, y, 120 * s, 42 * s, 'rgba(255,255,255,0.92)'); ell(x + dx + 70 * s, y - 24 * s, 76 * s, 44 * s, 'rgba(255,255,255,0.92)'); ell(x + dx - 70 * s, y + 4, 60 * s, 30 * s, 'rgba(255,255,255,0.92)'); }
    for (let i = 0; i < 15; i++) { const x = -160 + i * 92, h = 110 + ((i * 53) % 150); fillRR(x, 1030 - h, 78, h, 4, i % 2 ? '#86aed2' : '#a3c4e4'); for (let r = 0; r < h / 40 - 1; r++) fillRR(x + 12, 1030 - h + 16 + r * 36, 54, 10, 3, 'rgba(255,255,255,0.35)'); }
    ctx.fillStyle = lin(0, 1020, 0, 1600, [[0, '#1f8fd0'], [1, '#0b5c98']]); ctx.fillRect(-600, 1020, 2300, 800);
    for (let i = 0; i < 14; i++) { const y = 1050 + i * 34, off = Math.sin(TT * 1.6 + i) * 34, a = (i * 137) % 300, b = (i * 91) % 220; line(-600 + off + a, y, -330 + off + a, y, 4, 'rgba(255,255,255,0.35)'); line(520 - off - b, y + 14, 790 - off - b, y + 14, 4, 'rgba(255,255,255,0.3)'); }
    for (const [x, y, s] of [[130, 1070, 0.5], [990, 1090, 0.42]]) { const b = Math.sin(TT * 2 + x) * 4; ctx.save(); ctx.translate(x, y + b); ctx.scale(s, s); poly([[-90, 0], [90, 0], [66, 34], [-66, 34]], '#ffffff'); poly([[0, -12], [0, -220], [100, -12]], '#f4f4f8'); poly([[-6, -30], [-6, -170], [-70, -30]], '#ff8a5a'); line(0, 0, 0, -230, 6, '#555'); ctx.restore(); }
    ctx.fillStyle = '#8a5a33'; ctx.fillRect(-600, 1500, 2300, 600); for (let i = 0; i < 32; i++) line(-600 + i * 76, 1500, -600 + i * 76, 2100, 4, 'rgba(0,0,0,0.18)'); fillRR(-600, 1488, 2300, 26, 4, '#a8733f');
    for (const x of [70, 1010]) { fillRR(x - 30, 1410, 60, 96, 14, '#2b2b38'); fillRR(x - 40, 1400, 80, 24, 10, '#45455a'); }
    ctx.beginPath(); ctx.moveTo(70, 1440); ctx.quadraticCurveTo(540, 1530, 1010, 1440); ctx.lineWidth = 12; ctx.strokeStyle = '#d9c08a'; ctx.stroke();
    const gx = ((TT * 90) % 1600) - 260, f = Math.sin(TT * 11) * 16; ctx.save(); ctx.translate(gx, 560 + Math.sin(TT * 3) * 20); ctx.lineWidth = 7; ctx.strokeStyle = '#ffffff'; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-44, f); ctx.quadraticCurveTo(-22, -22, 0, 0); ctx.quadraticCurveTo(22, -22, 44, f); ctx.stroke(); ctx.restore();
  });
}
// an energy-drink can (tall, a lightning bolt), lying when rot = ±π/2
function energyCan(x, y, s, rot = 0, col = '#41f08a', dent = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  fillRR(-40, -124, 80, 124, 14, col); fillRR(-40, -124, 80, 16, 6, '#d8dbe6'); fillRR(-40, -16, 80, 16, 6, '#b8bcca'); ell(0, -124, 40, 10, '#eceef6'); ell(6, -126, 10, 5, '#9aa0b4');
  poly([[8, -102], [-16, -60], [2, -60], [-10, -22], [18, -72], [0, -72]], '#1b1530');
  fillRR(-30, -110, 10, 86, 5, 'rgba(255,255,255,0.38)'); if (dent) poly([[40, -80], [22, -64], [40, -48]], shade(col, -0.3));
  ctx.restore();
}
// a heap of tangled cables (deterministic)
function cables(seed, x, y, w, h, n = 8) {
  const R = RNG('cab', seed), cols = ['#15151e', '#2a2a3a', '#ff4fa3', '#52b8ff', '#ffd23f', '#41f08a', '#f4f4f4'];
  for (let i = 0; i < n; i++) {
    ctx.beginPath(); let px = x + R.f() * w, py = y + R.f() * h; ctx.moveTo(px, py);
    for (let k = 0; k < 4; k++) { const ex = x + R.f() * w, ey = y + R.f() * h; ctx.bezierCurveTo(px + R.n(260), py + R.n(220), ex + R.n(260), ey + R.n(220), ex, ey); px = ex; py = ey; }
    ctx.lineWidth = 9 + R.f() * 7; ctx.strokeStyle = cols[i % cols.length]; ctx.lineCap = 'round'; ctx.stroke();
    fillRR(px - 14, py - 9, 28, 18, 4, '#3a3a4a');
  }
}
// a red gift box with a gold ribbon; lid 0..1 lifts the lid, a big "?" floats out
function giftBox(x, y, s, lid = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 8, 200, 30, 0.35);
  if (lid > 0.2) { glow(0, -280, 360, '#fff2a0', 0.5 * lid); tText('?', 0, -330 - lid * 120, 190, { color: '#ffd23f', stroke: '#5a0a10', strokeW: 22 }); }
  fillRR(-170, -250, 340, 250, 18, '#e8262f'); fillRR(-170, -250, 340, 40, 12, '#c81b24'); fillRR(-28, -250, 56, 250, 6, '#ffd23f'); fillRR(-14, -250, 10, 250, 4, 'rgba(255,255,255,0.35)');
  ctx.save(); ctx.translate(0, -250 - lid * 170); ctx.rotate(-lid * 0.45);
  fillRR(-190, -64, 380, 72, 16, '#ff3d45'); fillRR(-30, -64, 60, 72, 6, '#ffd23f');
  ell(-58, -86, 58, 30, '#ffd23f', -0.45); ell(58, -86, 58, 30, '#ffd23f', 0.45); ell(-58, -86, 26, 12, '#d9a800', -0.45); ell(58, -86, 26, 12, '#d9a800', 0.45); circ(0, -76, 24, '#e8b400');
  ctx.restore(); ctx.restore();
}
// the gold watch with a ring of diamonds on the bezel and diamond hour markers
function diamondRolex(x, y, s, t = 0) {
  goldWatch(x, y, s, t);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 28; i++) { const a = (i / 28) * TAU; ctx.save(); ctx.translate(Math.cos(a) * 240, Math.sin(a) * 240); ctx.rotate(a + Math.PI / 2); diamond(0, 0, 17); ctx.restore(); }
  for (let i = 0; i < 6; i++) { const a = TT * 0.9 + i * 1.7; sparkle(Math.cos(a) * 240, Math.sin(a) * 240, 26 + 12 * Math.sin(TT * 8 + i), '#ffffff', TT * 3 + i); }
  ctx.restore();
}
// wavy green stink lines rising from (x, y)
function stinkLines(x, y, s = 1) {
  for (let i = 0; i < 3; i++) { const ph = TT * 3 + i * 2.1, u = (TT * 0.8 + i / 3) % 1; ctx.save(); ctx.globalAlpha = Math.sin(u * Math.PI) * 0.85; ctx.translate(x + (i - 1) * 70 * s, y - u * 180 * s); ctx.beginPath();
    for (let k = 0; k <= 12; k++) { const yy = -k * 14 * s, xx = Math.sin(ph + k * 0.7) * 18 * s; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.lineWidth = 12 * s; ctx.strokeStyle = '#8fd14f'; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore(); }
}
// a key on a ring with a little yacht tag
function yachtKey(x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); ctx.arc(0, 0, 34, 0, TAU); ctx.lineWidth = 9; ctx.strokeStyle = '#c9cede'; ctx.stroke();
  fillRR(20, -14, 110, 28, 10, '#d9b14a'); fillRR(118, -14, 18, 44, 4, '#d9b14a'); fillRR(92, 6, 14, 24, 4, '#d9b14a'); circ(28, 0, 22, '#e8c560'); circ(28, 0, 8, '#8a6a20');
  fillRR(-70, 22, 90, 110, 18, '#ffffff'); ctx.save(); ctx.translate(-25, 80); ctx.scale(0.16, 0.16); yacht(0, 160, 1.0); ctx.restore();
  ctx.restore();
}
// "WILLKOMMEN IN MIAMI" — a pink neon sign that flickers on
function miamiSign(x, y, s, t0) {
  if (TT < t0) return; const k = springEase(TT - t0, 260, 13), on = TT - t0 > 0.25 || Math.floor(TT * 30) % 2;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); fillRR(-330, -120, 660, 240, 30, 'rgba(20,6,40,0.75)');
  if (on) glow(0, 0, 420, '#ff4fd8', 0.45);
  tText('WILLKOMMEN IN', 0, -46, 54, { color: on ? '#fff' : '#a88', stroke: '#ff4fd8', strokeW: on ? 10 : 0, shadow: false });
  tText('MIAMI', 0, 50, 120, { color: on ? '#fff' : '#a88', stroke: '#31e3ff', strokeW: on ? 16 : 0, shadow: false });
  ctx.restore();
}
// a shopping cart with a big price tag "?" (the one purchase that decides everything)
function shopCart(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 12, 260, 34, 0.35);
  line(-300, -360, -220, -360, 18, '#c9cede'); line(-220, -360, -150, -60, 16, '#c9cede');
  poly([[-200, -300], [260, -300], [210, -80], [-150, -80]], 'rgba(200,210,230,0.25)');
  for (let i = 0; i < 6; i++) line(-190 + i * 78, -300, -150 + i * 64, -80, 8, '#c9cede'); for (let j = 0; j < 4; j++) line(-200 + j * 12, -300 + j * 70, 260 - j * 16, -300 + j * 70, 8, '#c9cede');
  line(-150, -80, 210, -80, 12, '#aab0c4'); line(-150, -80, -120, -20, 10, '#aab0c4'); line(210, -80, 180, -20, 10, '#aab0c4');
  circ(-110, 0, 30, '#2b2b38'); circ(170, 0, 30, '#2b2b38'); circ(-110, 0, 12, '#888'); circ(170, 0, 12, '#888');
  ctx.restore();
}
