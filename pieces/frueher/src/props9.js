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
function chatFlood(t0, n = 34, words) {
  for (let k = 0; k < n; k++) { const R = RNG('cf', k), tb = t0 + k * 0.035, u = (TT - tb) / 1.3; if (u < 0 || u > 1) continue;
    ctx.save(); ctx.globalAlpha = u < 0.8 ? 1 : (1 - u) / 0.2; const x = 120 + R.f() * 840, y = 1500 - u * 1100 - R.f() * 200, sc = springEase(TT - tb, 320, 12);
    ctx.translate(x, y); ctx.scale(sc, sc); ctx.rotate(R.n(0.15));
    if (k % 3 === 0) tText('❤', 0, 0, 80 + R.f() * 40, { color: '#ff4f8a', shadow: false });
    else { const W = words || ['LUCIAAA 😍', 'LUCIA!!!', 'OMG LUCIA', '😍😍😍', 'LUCIAAAA', '🔥🔥 LUCIA'], m = W[k % W.length]; const tw = textW(m, 40, 900) + 40; fillRR(-tw / 2, -32, tw, 64, 18, 'rgba(20,10,40,0.85)'); tText(m, 0, 2, 40, { color: ['#ff8fc0', '#ffd23f', '#6af0ff'][k % 3], shadow: false }); }
    ctx.restore(); }
}
// a pizza box with one cold slice left
function pizzaBox(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 10, 200, 26, 0.3); fillRR(-190, -40, 380, 50, 6, '#c9a36a'); ctx.save(); ctx.translate(0, -40); ctx.scale(1, 0.35); circ(0, 0, 150, '#e8b45a'); poly([[0, 0], [150, -30], [140, 50]], '#d8452a'); ctx.restore(); fillRR(-190, -340, 380, 300, 6, '#d9b87a'); tText('PIZZA', 0, -200, 60, { color: '#c4520a', shadow: false }); ctx.restore(); }

// Jason, drawn with human proportions (about 7 heads tall): short dark hair with a fade, a stubble beard,
// a fitted olive tee over a broad chest, jeans and boots; one hand carries a money bag, the other is a fist at his side.
function jasonHuman(x, y, s) {
  const skin = '#e3ad86', skinD = '#c48b64', tee = '#5f6b46', teeD = '#46502f', jean = '#34405a', jeanD = '#252e42', hair = '#2f2118';
  const sway = Math.sin(TT * 2.2) * 0.02, step = Math.sin(TT * 3);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 6, 150, 22, 0.35);
  // legs (slightly apart, weight on one leg)
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 46, -470); ctx.rotate(sd * 0.04);
    poly([[-38, 0], [38, 0], [32, 450], [-30, 450]], jean); poly([[sd > 0 ? 8 : -38, 0], [sd > 0 ? 38 : -8, 0], [sd > 0 ? 32 : -12, 450], [sd > 0 ? 12 : -30, 450]], jeanD);
    fillRR(-44, 432, 96, 46, 16, '#5a3a24'); fillRR(-44, 466, 98, 12, 6, '#2a1a10'); ctx.restore(); }
  fillRR(-92, -500, 184, 40, 10, '#2a2218'); fillRR(-14, -500, 28, 40, 6, '#b8a060');                  // belt + buckle
  ctx.save(); ctx.translate(0, -480); ctx.rotate(sway);
  // torso: V-shape tee with chest and shoulder shading
  ctx.beginPath(); ctx.moveTo(-96, 0); ctx.lineTo(-128, -300); ctx.quadraticCurveTo(-120, -350, -70, -362); ctx.lineTo(70, -362); ctx.quadraticCurveTo(120, -350, 128, -300); ctx.lineTo(96, 0); ctx.closePath(); ctx.fillStyle = tee; ctx.fill();
  ctx.save(); ctx.clip(); poly([[40, -362], [140, -330], [110, 0], [60, 0]], teeD); line(-60, -250, 60, -250, 6, 'rgba(0,0,0,0.12)'); line(0, -250, 0, -60, 4, 'rgba(0,0,0,0.08)'); ctx.restore();
  ctx.beginPath(); ctx.moveTo(-34, -362); ctx.quadraticCurveTo(0, -330, 34, -362); ctx.lineWidth = 8; ctx.strokeStyle = teeD; ctx.stroke();
  // left arm: hanging, fist
  ctx.save(); ctx.translate(-118, -330); ctx.rotate(0.12 + step * 0.03); fillRR(-30, 0, 60, 120, 26, tee); fillRR(-24, 100, 48, 170, 22, skin); line(-6, 150, -10, 250, 6, skinD); circ(0, 282, 30, skin); ctx.restore();
  // right arm: bent, carrying the money bag
  ctx.save(); ctx.translate(118, -330); ctx.rotate(-0.25); fillRR(-30, 0, 60, 120, 26, tee); fillRR(-24, 100, 48, 150, 22, skin); ctx.translate(0, 260); circ(0, 0, 30, skin); moneyBag(30, 90, 0.75, Math.sin(TT * 4) * 0.08); ctx.restore();
  // neck + head
  fillRR(-26, -400, 52, 50, 14, skinD);
  ctx.save(); ctx.translate(0, -470);
  ell(-58, 0, 12, 20, skinD); ell(58, 0, 12, 20, skinD);                                               // ears
  ctx.beginPath(); ctx.moveTo(-54, -40); ctx.quadraticCurveTo(-58, 40, -36, 66); ctx.quadraticCurveTo(0, 92, 36, 66); ctx.quadraticCurveTo(58, 40, 54, -40); ctx.quadraticCurveTo(0, -84, -54, -40); ctx.fillStyle = skin; ctx.fill();
  ctx.save(); ctx.clip(); ctx.globalAlpha = 0.55; ctx.beginPath(); ctx.moveTo(-56, 10); ctx.quadraticCurveTo(-48, 70, 0, 92); ctx.quadraticCurveTo(48, 70, 56, 10); ctx.lineTo(56, 100); ctx.lineTo(-56, 100); ctx.closePath(); ctx.fillStyle = hair; ctx.fill(); ctx.restore();   // stubble
  poly([[-56, -30], [-50, -70], [-20, -86], [20, -86], [50, -70], [56, -30], [40, -50], [-40, -50]], hair); ell(0, -62, 52, 22, hair);   // short hair, faded sides
  line(-34, -18, -14, -20, 6, hair); line(14, -20, 34, -18, 6, hair);                                  // brows
  for (const ex of [-24, 24]) { ell(ex, -2, 9, 6, '#ffffff'); circ(ex + 1, -2, 4, '#3a2a1a'); }        // eyes
  poly([[0, -2], [-7, 26], [6, 28]], skinD); line(-14, 46, 14, 44, 4, '#8a4a3a');                       // nose, mouth
  ctx.restore(); ctx.restore(); ctx.restore();
}

// a nightclub inside the game: neon sign, bar with glowing bottles, DJ booth, an LED dance floor, lasers, a disco ball,
// a stage with a pink spotlight, a dancing crowd in silhouette and a velvet VIP rope
function setClubInterior(t0 = 0) {
  ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#120626'], [1, '#05020c']]); ctx.fillRect(-100, -100, 1300, 2200);
  // back wall panels + neon sign
  for (let i = 0; i < 8; i++) fillRR(i * 140, 180, 120, 900, 8, i % 2 ? '#1a0b34' : '#160a2c');
  neonSign(540, 300, 'VICE NIGHTS', '#ff4fa3'); line(200, 380, 880, 380, 6, 'rgba(106,240,255,0.7)'); glow(540, 380, 500, '#6af0ff', 0.2);
  // bar on the left: shelves of glowing bottles
  fillRR(-20, 560, 330, 26, 6, '#3a2a5a'); fillRR(-20, 700, 330, 26, 6, '#3a2a5a');
  for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) { const bx = 10 + i * 50, by = 560 + r * 140, c = ['#41f08a', '#ffd23f', '#ff4fa3', '#52b8ff'][(i + r) % 4]; fillRR(bx, by - 80, 26, 80, 8, c); fillRR(bx + 8, by - 104, 10, 26, 4, c); glow(bx + 13, by - 40, 50, c, 0.35); }
  fillRR(-20, 900, 380, 170, 14, '#2a1a40'); fillRR(-20, 900, 380, 22, 8, '#ff4fa3'); glow(160, 910, 260, '#ff4fa3', 0.3);
  // DJ booth in the middle, the DJ bobbing with headphones
  const bob = Math.abs(Math.sin(TT * 7)) * 12; circ(560, 780 - bob, 48, '#0c0618'); fillRR(510, 820 - bob, 100, 140, 40, '#0c0618'); ctx.beginPath(); ctx.arc(560, 780 - bob, 58, Math.PI * 1.05, Math.PI * 1.95); ctx.lineWidth = 12; ctx.strokeStyle = '#6af0ff'; ctx.stroke();
  fillRR(420, 900, 280, 150, 16, '#1b0f2e'); for (let i = 0; i < 2; i++) { circ(480 + i * 160, 950, 40, '#2a1d44'); circ(480 + i * 160, 950, 10 + 4 * Math.sin(TT * 18 + i), '#41f08a'); }
  for (let i = 0; i < 10; i++) fillRR(440 + i * 26, 1010, 14, 18 + 14 * Math.abs(Math.sin(TT * 9 + i)), 3, ['#ff4fa3', '#ffd23f', '#41f08a'][i % 3]);
  // stage on the right with a pink spotlight and a dancer in silhouette
  fillRR(760, 960, 340, 60, 8, '#2a1a40'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,79,163,0.28)'; ctx.beginPath(); ctx.moveTo(900, 120); ctx.lineTo(950, 120); ctx.lineTo(1080, 980); ctx.lineTo(780, 980); ctx.fill(); ctx.restore();
  line(930, 380, 930, 965, 8, '#d9dce8'); const dz = Math.sin(TT * 4) * 10; ctx.save(); ctx.translate(930 + dz * 0.5, 960); ell(0, -280, 30, 36, '#0c0618'); poly([[-30, -250], [30, -250], [22, -140], [36, -10], [-36, -10], [-22, -140]], '#0c0618'); line(14, -230, 6 + dz, -330, 16, '#0c0618'); line(-14, -230, -50, -150, 16, '#0c0618'); ctx.restore();
  // disco ball + lasers
  circ(540, 140, 46, '#c0c4d4'); for (let i = 0; i < 20; i++) { const R = RNG('db', i); fillRR(540 + R.n(36) - 6, 140 + R.n(36) - 6, 12, 12, 2, (Math.floor(TT * 8) + i) % 3 ? '#e8ecff' : '#7a86b0'); }
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 8; i++) { const a = Math.sin(TT * 1.8 + i) * 0.9 + (i - 3.5) * 0.2; ctx.strokeStyle = ['rgba(106,240,255,0.5)', 'rgba(255,79,163,0.5)', 'rgba(65,240,138,0.45)'][i % 3]; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(540, 140); ctx.lineTo(540 + Math.sin(a) * 1800, 140 + Math.cos(a) * 1800); ctx.stroke(); } ctx.restore();
  // LED dance floor
  for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) { const on = (Math.floor(TT * 4) + r + c) % 3; fillRR(-20 + c * 126, 1100 + r * 120, 120, 112, 8, ['#ff4fa3', '#6af0ff', '#7a3cff'][on]); ctx.save(); ctx.globalAlpha = 0.55; fillRR(-20 + c * 126, 1100 + r * 120, 120, 112, 8, '#05020c'); ctx.restore(); }
  // dancing crowd in silhouette (heads bob on the beat, arms up)
  const R = RNG('crowd2'); for (let i = 0; i < 12; i++) { const cx = 40 + i * 92 + R.n(14), b = Math.abs(Math.sin(TT * 7 + i)) * 24, hy = 1330 - b - (i % 2) * 40; circ(cx, hy, 40, '#0c0618'); fillRR(cx - 48, hy + 30, 96, 300, 40, '#0c0618'); if (i % 3 !== 1) line(cx + (i % 2 ? 24 : -24), hy + 50, cx + (i % 2 ? 60 : -60), hy - 90 - b, 22, '#0c0618'); }
  // velvet VIP rope in front
  for (const px of [120, 960]) { fillRR(px - 12, 1560, 24, 200, 8, '#d4af37'); circ(px, 1560, 22, '#ffd86b'); } ctx.beginPath(); ctx.moveTo(120, 1580); ctx.quadraticCurveTo(540, 1700, 960, 1580); ctx.lineWidth = 22; ctx.strokeStyle = '#b8132a'; ctx.stroke();
  fillRR(440, 1610, 200, 60, 12, '#1b0f2e'); tText('VIP', 540, 1642, 40, { color: PAL.gold, shadow: false });
}
