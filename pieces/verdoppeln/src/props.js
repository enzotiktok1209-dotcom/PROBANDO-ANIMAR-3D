// =====================================================================
//  props.js — objects: podium + buttons, choice cards, clock, calculator, watch, car, phone, receipt,
//  door, velvet box, tiny pizza, notebook, scale, calendar, paper plane, shake, graph, furniture.
//  All drawn around their own centre (x, y) at scale s.
// =====================================================================
function podium(x, y, s, col, press = 0, lit = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shadowEll(0, 8, 190, 30, 0.4);
  poly([[-150, 0], [-130, -330], [130, -330], [150, 0]], '#2b2440');
  poly([[-150, 0], [-130, -330], [-90, -330], [-104, 0]], '#3a3157');
  fillRR(-150, -60, 300, 22, 6, PAL.yellow); fillRR(-150, -270, 300, 14, 6, 'rgba(255,210,63,0.6)');
  fillRR(-175, -360, 350, 44, 12, '#1d1830');
  // the button: a dome that squashes when pressed
  const pz = press * 26;
  ell(0, -370, 112, 34, shade(col, -0.45));
  ell(0, -384 + pz * 0.5, 96, 30 - pz * 0.2, shade(col, -0.25));
  ctx.beginPath(); ctx.ellipse(0, -394 + pz, 92, 58 - pz * 1.4, 0, Math.PI, TAU); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  ell(-30, -418 + pz, 30, 12, 'rgba(255,255,255,0.55)', -0.3);
  if (lit > 0) glow(0, -400, 260, col, lit);
  ctx.restore();
}
function choiceCard(x, y, w, h, top, big, sub, col, t0) {
  if (TT < t0) return;
  const k = springEase(TT - t0, 260, 15);
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  fillRR(-w / 2 + 8, -h / 2 + 12, w, h, 26, 'rgba(0,0,0,0.35)');
  fillRR(-w / 2, -h / 2, w, h, 26, col); fillRR(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 20, shade(col, 0.12));
  tText(top, 0, -h * 0.3, h * 0.13, { color: 'rgba(255,255,255,0.85)', shadow: false, letter: 3, weight: 800 });
  tText(big, 0, 0, h * 0.27, { color: '#fff', maxW: w - 40 });
  tText(sub, 0, h * 0.3, h * 0.12, { color: 'rgba(255,255,255,0.9)', shadow: false, weight: 800, maxW: w - 40 });
  ctx.restore();
}
function clockFace(x, y, r, hours) {
  ctx.save(); ctx.translate(x, y);
  shadowEll(0, r * 1.05, r * 0.9, r * 0.12, 0.3);
  circ(0, 0, r * 1.08, '#1d1a33'); circ(0, 0, r, '#fbfbff');
  for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU; line(Math.cos(a) * r * 0.82, Math.sin(a) * r * 0.82, Math.cos(a) * r * 0.92, Math.sin(a) * r * 0.92, i % 3 ? 6 : 12, '#1d1a33'); }
  const m = (hours * 60) % 60, hA = (hours / 12) * TAU - Math.PI / 2, mA = (m / 60) * TAU - Math.PI / 2;
  line(0, 0, Math.cos(hA) * r * 0.5, Math.sin(hA) * r * 0.5, 16, '#1d1a33'); line(0, 0, Math.cos(mA) * r * 0.78, Math.sin(mA) * r * 0.78, 10, '#1d1a33');
  circ(0, 0, 14, PAL.red);
  ctx.restore();
}
function calculator(x, y, s, disp, err, pressKey = -1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shadowEll(0, 330, 260, 40, 0.5);
  fillRR(-230, -330, 460, 660, 40, '#2a2b38'); fillRR(-214, -314, 428, 628, 32, '#3a3c4e');
  fillRR(-180, -280, 360, 140, 18, err ? '#3a0f14' : '#b9d7a8');
  tText(disp, 160, -208, 84, { align: 'right', color: err ? '#ff3b4a' : '#1d2a1a', shadow: false, weight: 800 });
  if (err) glow(0, -210, 260, '#ff2030', 0.45 + 0.25 * Math.sin(TT * 20));
  const keys = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', ',', '=', '+'];
  keys.forEach((k, i) => { const cx = -135 + (i % 4) * 90, cy = -70 + Math.floor(i / 4) * 92, p = i === pressKey ? 6 : 0;
    fillRR(cx - 38, cy - 34 + p, 76, 70, 14, i % 4 === 3 ? PAL.orange : '#565a72'); tText(k, cx, cy + p, 40, { color: '#fff', shadow: false }); });
  ctx.restore();
}
function sportsCar(x, y, s, col = '#e8262f') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shadowEll(0, 10, 470, 46, 0.5);
  poly([[-440, -40], [-420, -120], [-260, -150], [-130, -235], [120, -240], [260, -150], [430, -125], [455, -50], [440, -10], [-430, -10]], col);
  poly([[-110, -215], [100, -220], [210, -150], [-230, -150]], '#1b2a44');
  poly([[-100, -205], [-10, -208], [-10, -158], [-200, -156]], '#5f8ad6'); poly([[10, -208], [95, -210], [185, -156], [10, -158]], '#5f8ad6');
  line(-420, -95, 420, -95, 10, shade(col, 0.35)); fillRR(380, -110, 60, 26, 10, '#fff7c2'); fillRR(-445, -100, 40, 22, 8, '#ff5a5a');
  for (const wx of [-270, 270]) { circ(wx, -10, 82, '#141420'); circ(wx, -10, 46, '#b8bccc'); circ(wx, -10, 16, '#141420'); for (let i = 0; i < 5; i++) { const a = TT * 0 + (i / 5) * TAU; line(wx, -10, wx + Math.cos(a) * 42, -10 + Math.sin(a) * 42, 8, '#8b90a6'); } }
  ctx.restore();
}
function phone(x, y, s, rot, screen) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  fillRR(-95, -190, 190, 380, 30, '#15131f'); fillRR(-84, -176, 168, 352, 22, '#f3f4fb');
  ctx.save(); rrPath(-84, -176, 168, 352, 22); ctx.clip(); if (screen) screen(); ctx.restore();
  fillRR(-26, -168, 52, 10, 5, '#15131f');
  ctx.restore();
}
function receipt(x, y, prog, lines, total, stampT) {
  // prints downward: prog 0..1 how much paper is out
  const w = 520, full = 160 + lines.length * 70 + 170, h = full * prog;
  ctx.save(); ctx.translate(x, y);
  fillRR(-w / 2 - 30, -40, w + 60, 60, 20, '#2b2a3a'); // the printer slot
  ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, 0, w, h); ctx.clip();
  shadowEll(0, full + 30, w * 0.5, 30, 0.3);
  ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.lineTo(w / 2, 0); ctx.lineTo(w / 2, full);
  for (let i = 0; i <= 16; i++) ctx.lineTo(w / 2 - (i / 16) * w, full + (i % 2 ? 18 : 0)); ctx.closePath(); ctx.fillStyle = '#fbfbf6'; ctx.fill();
  tText('RECHNUNG', 0, 70, 52, { color: '#1b1530', shadow: false, letter: 4 });
  line(-w / 2 + 40, 112, w / 2 - 40, 112, 4, '#c9c9c0');
  lines.forEach(([a, b], i) => { tText(a, -w / 2 + 40, 160 + i * 70, 34, { align: 'left', color: '#3b3a4a', shadow: false, weight: 700 }); tText(b, w / 2 - 40, 160 + i * 70, 34, { align: 'right', color: '#3b3a4a', shadow: false, weight: 700 }); });
  const ty = 160 + lines.length * 70 + 40; line(-w / 2 + 40, ty - 34, w / 2 - 40, ty - 34, 4, '#c9c9c0');
  tText('GESAMT', -w / 2 + 40, ty + 20, 46, { align: 'left', color: '#1b1530', shadow: false });
  tText(total, w / 2 - 40, ty + 20, 56, { align: 'right', color: PAL.red, shadow: false });
  ctx.restore();
  if (stampT != null && TT >= stampT) { const k = 1 + 2.2 * (1 - EZ.o3(clamp((TT - stampT) / 0.16))); ctx.save(); ctx.translate(90, ty - 90); ctx.rotate(-0.25); ctx.scale(k, k); ctx.globalAlpha = 0.85;
    rrPath(-170, -56, 340, 112, 16); ctx.lineWidth = 12; ctx.strokeStyle = PAL.red; ctx.stroke(); tText('BEZAHLT', 0, 4, 66, { color: PAL.red, shadow: false }); ctx.restore(); }
  ctx.restore();
}
function door(x, y, s, open, col = '#8a5a3a') {
  // open 0..1: the door swings (scaleX of the leaf)
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  fillRR(-190, -720, 380, 730, 10, '#5b3b28'); fillRR(-165, -700, 330, 700, 6, '#1a1424');
  const k = 1 - open * 0.85;
  ctx.save(); ctx.translate(-165, 0); ctx.scale(k, 1);
  fillRR(0, -700, 330, 700, 6, col); fillRR(30, -660, 270, 280, 10, shade(col, -0.15)); fillRR(30, -340, 270, 300, 10, shade(col, -0.15));
  circ(290, -350, 18, PAL.gold); ctx.restore();
  ctx.restore();
}
function velvetBox(x, y, s, lid = 0, glowA = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shadowEll(0, 20, 330, 50, 0.4);
  fillRR(-300, -170, 600, 190, 26, '#6d1430'); fillRR(-300, -170, 600, 40, 20, '#8d1d40'); line(-300, -60, 300, -60, 10, PAL.gold);
  if (glowA > 0) { glow(0, -170, 420, '#fff2b0', glowA); }
  // the lid hinges at the back edge
  ctx.save(); ctx.translate(0, -170); ctx.scale(1, Math.cos(lid * Math.PI * 0.62));
  fillRR(-310, -120, 620, 120, 26, '#8d1d40'); fillRR(-310, -40, 620, 40, 12, '#6d1430'); tText('PREMIUM', 0, -70, 46, { color: PAL.gold, shadow: false, letter: 6 });
  ctx.restore(); ctx.restore();
}
function tinyPizza(x, y, r) {
  ctx.save(); ctx.translate(x, y);
  shadowEll(0, r * 0.5, r * 1.1, r * 0.3, 0.4);
  ell(0, 0, r, r * 0.55, '#d98f3a'); ell(0, -r * 0.05, r * 0.85, r * 0.45, '#f2c94c');
  for (const [a, b] of [[-0.4, -0.1], [0.35, 0.05], [0, 0.18], [0.1, -0.2]]) ell(a * r, b * r, r * 0.13, r * 0.08, '#c0392b');
  sparkle(-r * 0.2, -r * 0.1, r * 0.14 * (1 + 0.4 * Math.sin(TT * 12)), PAL.gold); sparkle(r * 0.3, -r * 0.18, r * 0.1, '#fff1a0');
  ctx.restore();
}
function notebook(x, y, s, rows, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot ?? -0.03);
  shadowEll(0, 260, 380, 40, 0.35);
  fillRR(-360, -250, 720, 500, 18, '#2c3e6b'); fillRR(-340, -236, 330, 472, 8, '#fffdf4'); fillRR(10, -236, 330, 472, 8, '#fffdf4');
  for (let i = 0; i < 9; i++) { line(-330, -170 + i * 48, -20, -170 + i * 48, 2, '#cfe0f5'); line(20, -170 + i * 48, 330, -170 + i * 48, 2, '#cfe0f5'); }
  tText(o.title ?? 'ALTERSVORSORGE', -175, -205, 32, { color: '#1d48b8', shadow: false, maxW: 300 });
  rows.forEach(([a, b], i) => { if (o.reveal != null && i >= o.reveal) return; tText(a, -310, -150 + i * 48, 28, { align: 'left', color: '#2a2a3a', shadow: false, weight: 700 }); tText(b, -40, -150 + i * 48, 28, { align: 'right', color: PAL.green, shadow: false, weight: 800 }); });
  ctx.translate(180, 0); coin(0, -40, 60, { sx: Math.cos(TT * 2) });
  ctx.restore();
}
function balance(x, y, s, tilt, leftFn, rightFn) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shadowEll(0, 20, 260, 30, 0.4);
  poly([[-120, 10], [120, 10], [30, -40], [-30, -40]], '#3a3157'); fillRR(-16, -520, 32, 490, 10, '#4a4068');
  ctx.save(); ctx.translate(0, -510); ctx.rotate(tilt);
  fillRR(-380, -12, 760, 24, 12, '#5b5080'); circ(0, 0, 30, PAL.gold);
  for (const sd of [-1, 1]) {
    ctx.save(); ctx.translate(sd * 360, 0); ctx.rotate(-tilt);
    line(0, 0, -110, 240, 5, '#c9c2e6'); line(0, 0, 110, 240, 5, '#c9c2e6');
    ell(0, 250, 150, 30, '#8a7fb8'); ell(0, 244, 140, 22, '#a99ee0');
    ctx.translate(0, 236); (sd < 0 ? leftFn : rightFn)?.(); ctx.restore();
  }
  ctx.restore(); ctx.restore();
}
function calendarPage(x, y, s, label, num, flip = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shadowEll(0, 250, 260, 30, 0.35);
  fillRR(-230, -230, 460, 470, 36, '#ffffff'); fillRR(-230, -230, 460, 120, { } ? 36 : 0, PAL.red); ctx.fillStyle = PAL.red; ctx.fillRect(-230, -150, 460, 40);
  tText(label, 0, -170, 56, { color: '#fff', shadow: false, letter: 6 });
  tText(String(num), 0, 70, 250, { color: '#1b1530', shadow: false });
  if (flip > 0 && flip < 1) { ctx.save(); ctx.translate(0, -110); ctx.scale(1, Math.cos(flip * Math.PI)); fillRR(-230, 0, 460, 350, 30, flip < 0.5 ? '#f3f3f8' : '#d8d8e4'); ctx.restore(); }
  for (const sd of [-1, 1]) fillRR(sd * 120 - 14, -262, 28, 70, 14, '#3a3157');
  ctx.restore();
}
function paperPlane(x, y, s, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  poly([[90, 0], [-70, -50], [-40, 0]], '#63d17e'); poly([[90, 0], [-40, 0], [-70, 44]], '#3b9e58'); poly([[90, 0], [-40, 0], [-55, 18]], '#2e8a4a');
  tText('50', -10, -14, 22, { color: '#1b5e33', shadow: false });
  ctx.restore();
}
function shakeCup(x, y, s, level = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  poly([[-60, -130], [60, -130], [45, 90], [-45, 90]], 'rgba(255,255,255,0.85)');
  ctx.save(); ctx.beginPath(); ctx.moveTo(-60, -130); ctx.lineTo(60, -130); ctx.lineTo(45, 90); ctx.lineTo(-45, 90); ctx.closePath(); ctx.clip();
  ctx.fillStyle = lin(0, -130, 0, 90, [[0, '#ffe07a'], [1, '#e7a90e']]); ctx.fillRect(-70, -130 + 220 * (1 - level), 140, 230); ctx.restore();
  ell(0, -132, 66, 16, '#fff'); fillRR(10, -230, 14, 110, 7, PAL.pink);
  sparkle(-20, -40, 14 * (0.6 + 0.4 * Math.sin(TT * 9)), '#fff');
  ctx.restore();
}
function sofa(x, y, s, col = '#6d4bd8') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shadowEll(0, 10, 520, 40, 0.35);
  fillRR(-480, -330, 960, 230, 60, shade(col, -0.15)); fillRR(-500, -170, 1000, 170, 40, col);
  fillRR(-560, -260, 130, 260, 50, shade(col, -0.05)); fillRR(430, -260, 130, 260, 50, shade(col, -0.05));
  line(0, -160, 0, -40, 5, shade(col, -0.25));
  ctx.restore();
}
function plant(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.32 + Math.sin(TT * 1.4 + i) * 0.03; ctx.save(); ctx.rotate(a + Math.PI / 2); ell(0, -150, 34, 150, i % 2 ? '#2f9e57' : '#3fbf6a'); ctx.restore(); }
  poly([[-80, 0], [80, 0], [60, 150], [-60, 150]], '#d9643a'); fillRR(-90, -14, 180, 30, 10, '#ec7a4c');
  ctx.restore();
}
function windowFrame(x, y, w, h, sky) {
  fillRR(x - 16, y - 16, w + 32, h + 32, 14, '#ffffff');
  ctx.save(); rrPath(x, y, w, h, 6); ctx.clip(); sky(); ctx.restore();
  line(x + w / 2, y, x + w / 2, y + h, 14, '#ffffff'); line(x, y + h / 2, x + w, y + h / 2, 14, '#ffffff');
}
function growthGraph(x, y, w, h, prog, col = PAL.green) {
  ctx.save(); ctx.translate(x, y);
  fillRR(-20, -20, w + 40, h + 40, 24, 'rgba(10,8,25,0.55)');
  for (let i = 1; i < 4; i++) line(0, (h * i) / 4, w, (h * i) / 4, 2, 'rgba(255,255,255,0.12)');
  ctx.beginPath(); const N = 60;
  for (let i = 0; i <= N * prog; i++) { const u = i / N, v = (Math.pow(2, u * 9) - 1) / (Math.pow(2, 9) - 1); const px = u * w, py = h - v * h; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.lineWidth = 12; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
  const u = prog, v = (Math.pow(2, u * 9) - 1) / (Math.pow(2, 9) - 1); circ(u * w, h - v * h, 16, '#fff'); glow(u * w, h - v * h, 80, col, 0.7);
  ctx.restore();
}
function yacht(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  poly([[-200, 0], [220, 0], [170, 70], [-170, 70]], '#ffffff'); poly([[-120, 0], [-100, -60], [120, -60], [150, 0]], '#e8edf7'); fillRR(-70, -100, 150, 44, 10, '#d0d8ea');
  for (let i = 0; i < 4; i++) fillRR(-90 + i * 55, -48, 34, 22, 6, '#4b7bd8');
  line(-200, 70, 220, 70, 8, '#2f6df6'); ctx.restore();
}
function goldChainIcon(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 9; i++) { const a = Math.PI * 0.1 + (i / 8) * Math.PI * 0.8; ell(Math.cos(a) * 120, Math.sin(a) * 120, 22, 14, i % 2 ? PAL.gold : '#ffd75a', a + Math.PI / 2); } circ(0, 150, 40, PAL.gold); tText('€', 0, 152, 46, { color: PAL.goldD, shadow: false }); ctx.restore(); }
function ticket(x, y, s, rot, txt) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); fillRR(-170, -100, 340, 200, 14, '#ffe14d'); fillRR(-170, -100, 340, 50, 14, PAL.red); tText('STRAFZETTEL', 0, -74, 30, { color: '#fff', shadow: false }); tText(txt, 0, 30, 54, { color: '#1b1530', shadow: false }); ctx.restore(); }
