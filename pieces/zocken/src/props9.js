// =====================================================================
//  props9.js — "GTA 6 zocken" props: a neon Vice-style title, a gamepad, the PS5 and its box, a police car,
//  money bags, a TV with an in-game scene, a flooding live chat, a pizza box, gaming-room RGB set.
//  The game is shown in the series' own flat style: a generic "GTA 6" wordmark, no official artwork.
// =====================================================================

// a Vice-City-style sunset backdrop: pink/orange sky, stripes on the sun, palm silhouettes, a neon skyline
function setVice(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, -400, 0, 1500, [[0, '#2a0f5a'], [0.45, '#ff3d8a'], [0.75, '#ff9a3c'], [1, '#ffd36b']]); ctx.fillRect(-600, -400, 2300, 1900);
    const sy = 900; ctx.save(); ctx.beginPath(); ctx.arc(540, sy, 330, 0, TAU); ctx.clip(); ctx.fillStyle = lin(0, sy - 330, 0, sy + 330, [[0, '#ffe66b'], [1, '#ff4f8a']]); ctx.fillRect(200, sy - 340, 700, 700);
    for (let i = 0; i < 7; i++) ctx.clearRect && fillRR(160, sy + 40 + i * 44, 760, 14 + i * 2, 0, '#ff6aa0'); ctx.restore();
    for (let i = 0; i < 14; i++) { const bx = -150 + i * 100, bh = 200 + (hash(i, 3) % 380); fillRR(bx, 1250 - bh, 84, bh, 4, '#2a0f4a'); for (let w = 0; w < bh / 50 - 1; w++) if (hash(i, w) % 2) fillRR(bx + 14, 1250 - bh + 24 + w * 50, 56, 10, 3, w % 3 ? '#ff7ad0' : '#6af0ff'); }
    for (const [px, sc, fl] of [[60, 1.2, 1], [1010, 1.05, -1], [240, 0.75, -1], [840, 0.7, 1]]) { ctx.save(); ctx.translate(px, 1260); ctx.scale(sc * fl, sc); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(50, -320, 20, -620); ctx.lineWidth = 30; ctx.strokeStyle = '#1a0830'; ctx.stroke();
      for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.48 + Math.sin(TT * 1.4 + i + px) * 0.05; ell(20 + Math.cos(a) * 130, -620 + Math.sin(a) * 60, 150, 26, '#1a0830', a); } ctx.restore(); }
    ctx.fillStyle = lin(0, 1250, 0, 2000, [[0, '#3a1460'], [1, '#12052a']]); ctx.fillRect(-600, 1250, 2300, 900);
    for (let i = 0; i < 9; i++) line(-300 + i * 180 + Math.sin(TT * 2 + i) * 20, 1300 + (i % 3) * 70, -190 + i * 180, 1300 + (i % 3) * 70, 6, 'rgba(255,122,208,0.45)');
  });
}
// a generic "GTA 6" wordmark: chunky letters with a pink-to-orange fill and a neon outline
function gtaTitle(x, y, s, k = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k);
  glow(0, 0, 420, '#ff4fa3', 0.5);
  ctx.font = `900 230px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  ctx.lineWidth = 40; ctx.strokeStyle = '#1a0830'; ctx.strokeText('GTA', -20, -20);
  ctx.fillStyle = lin(0, -130, 0, 90, [[0, '#ffe66b'], [0.5, '#ff7a3c'], [1, '#ff3d8a']]); ctx.fillText('GTA', -20, -20);
  ctx.font = `900 300px ${FONT}`; ctx.lineWidth = 44; ctx.strokeStyle = '#1a0830'; ctx.strokeText('6', 250, 20);
  ctx.fillStyle = lin(0, -150, 0, 160, [[0, '#6af0ff'], [1, '#b44fff']]); ctx.fillText('6', 250, 20);
  ctx.restore();
}
// a gamepad (white, two-tone) — buttons light when pressed
function gamepad(x, y, s, rot = 0, press = -1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shadowEll(0, 130, 230, 26, 0.3);
  ctx.beginPath(); ctx.moveTo(-170, -60); ctx.quadraticCurveTo(0, -110, 170, -60); ctx.quadraticCurveTo(260, 40, 230, 130); ctx.quadraticCurveTo(190, 170, 140, 90); ctx.lineTo(-140, 90); ctx.quadraticCurveTo(-190, 170, -230, 130); ctx.quadraticCurveTo(-260, 40, -170, -60); ctx.closePath();
  ctx.fillStyle = '#f4f6fb'; ctx.fill(); fillRR(-90, -60, 180, 90, 20, '#1b1c26'); glow(0, -20, 90, '#4aa8ff', 0.4);
  for (const [dx, dy] of [[-150, -10], [-170, 10], [-130, 10], [-150, 30]]) fillRR(dx - 10, dy - 10, 20, 20, 4, '#9aa0b8');
  [['#41f08a', 150, -20], ['#ff4545', 175, 5], ['#52b8ff', 125, 5], ['#ff8fc0', 150, 30]].forEach(([c, dx, dy], i) => { circ(dx, dy, 13, i === press ? '#fff' : c); });
  circ(-60, 50, 26, '#2a2c38'); circ(60, 50, 26, '#2a2c38'); ctx.restore();
}
// the PS5 box (white/blue)
function ps5Box(x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shadowEll(0, 10, 260, 30, 0.35);
  fillRR(-220, -560, 440, 560, 16, '#f4f6fb'); fillRR(-220, -560, 440, 120, 16, '#1d3fb0'); tText('PS5', 0, -500, 80, { color: '#fff', shadow: false });
  gameConsole(0, -40, 0.75); ctx.restore();
}
// police car with flashing lights
function policeCar(x, y, s, spin = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); compactCar(0, 0, 1, '#f4f6fb', spin);
  const on = Math.floor(TT * 8) % 2; fillRR(-70, -270, 70, 30, 8, on ? '#ff3030' : '#801818'); fillRR(0, -270, 70, 30, 8, on ? '#202080' : '#3a6aff'); glow(on ? -35 : 35, -255, 160, on ? '#ff3030' : '#3a6aff', 0.6);
  fillRR(-220, -120, 440, 40, 6, '#1d3fb0'); ctx.restore();
}
// a money bag with a € on it
function moneyBag(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ell(0, 0, 120, 110, '#c9a35a'); ell(-20, -20, 60, 40, 'rgba(255,255,255,0.18)'); poly([[-40, -100], [40, -100], [60, -150], [-60, -150]], '#b48a3a'); line(-50, -100, 50, -100, 14, '#7a5a1a'); tText('€', 0, 10, 110, { color: '#7a5a1a', shadow: false }); ctx.restore(); }
// a TV on a stand that shows an in-game scene (fn(x, y, w, h) draws inside it)
function gameTV(x, y, w, h, fn) { fillRR(x - w / 2 - 18, y - h / 2 - 18, w + 36, h + 36, 20, '#0d0c14'); ctx.save(); rrPath(x - w / 2, y - h / 2, w, h, 8); ctx.clip(); fn(x - w / 2, y - h / 2, w, h); ctx.restore(); glow(x, y, w * 0.8, '#ff7ad0', 0.15); }
// in-game scenes (drawn inside a rect)
function gameBank(x, y, w, h) { ctx.fillStyle = '#e8e2d0'; ctx.fillRect(x, y, w, h); for (let i = 0; i < 5; i++) fillRR(x + 30 + i * (w - 60) / 4 - 20, y + 20, 40, h * 0.6, 6, '#cfc6ae'); fillRR(x, y + h * 0.7, w, h * 0.3, 0, '#8a7a5a'); tText('BANK', x + w / 2, y + 40, h * 0.12, { color: '#5a4a2a', shadow: false }); }
function gameNeonStreet(x, y, w, h, road = 0.72) { ctx.fillStyle = lin(0, y, 0, y + h, [[0, '#2a0f5a'], [1, '#ff3d8a']]); ctx.fillRect(x, y, w, h); for (let i = 0; i < 10; i++) { const bx = x + ((i * w / 8 - TT * 200) % (w * 1.2) + w * 1.2) % (w * 1.2) - w * 0.1; fillRR(bx, y + h * 0.25, w * 0.08, h * 0.5, 3, '#1a0830'); } ctx.fillStyle = '#12052a'; ctx.fillRect(x, y + h * road, w, h * (1 - road)); }
// a flood of chat messages and hearts rising over the screen
function chatFlood(t0, n = 34) {
  for (let k = 0; k < n; k++) { const R = RNG('cf', k), tb = t0 + k * 0.035, u = (TT - tb) / 1.3; if (u < 0 || u > 1) continue;
    ctx.save(); ctx.globalAlpha = u < 0.8 ? 1 : (1 - u) / 0.2; const x = 120 + R.f() * 840, y = 1500 - u * 1100 - R.f() * 200, sc = springEase(TT - tb, 320, 12);
    ctx.translate(x, y); ctx.scale(sc, sc); ctx.rotate(R.n(0.15));
    if (k % 3 === 0) tText('❤', 0, 0, 80 + R.f() * 40, { color: '#ff4f8a', shadow: false });
    else { const m = ['LUCIAAA 😍', 'LUCIA!!!', 'OMG LUCIA', '😍😍😍', 'LUCIAAAA', '🔥🔥 LUCIA'][k % 6]; const tw = textW(m, 40, 900) + 40; fillRR(-tw / 2, -32, tw, 64, 18, 'rgba(20,10,40,0.85)'); tText(m, 0, 2, 40, { color: ['#ff8fc0', '#ffd23f', '#6af0ff'][k % 3], shadow: false }); }
    ctx.restore(); }
}
// a pizza box with one cold slice left
function pizzaBox(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 10, 200, 26, 0.3); fillRR(-190, -40, 380, 50, 6, '#c9a36a'); ctx.save(); ctx.translate(0, -40); ctx.scale(1, 0.35); circ(0, 0, 150, '#e8b45a'); poly([[0, 0], [150, -30], [140, 50]], '#d8452a'); ctx.restore(); fillRR(-190, -340, 380, 300, 6, '#d9b87a'); tText('PIZZA', 0, -200, 60, { color: '#c4520a', shadow: false }); ctx.restore(); }
