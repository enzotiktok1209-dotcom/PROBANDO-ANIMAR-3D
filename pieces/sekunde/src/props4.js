// =====================================================================
//  props4.js — 30 Millionen vs 1 € pro Sekunde: briefcase, stopwatch, bread roll, villa, private jet,
//  Jonas asleep, a blurred counter, a bank app.
// =====================================================================
function briefcase(x, y, s, open = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 10, 330, 40, 0.45);
  fillRR(-300, -260, 600, 260, 26, '#2b2b36'); fillRR(-300, -260, 600, 40, 18, '#3a3a48');
  fillRR(-70, -300, 140, 50, 16, '#1b1b24'); fillRR(-46, -290, 92, 26, 10, '#3a3a48');
  for (const sx of [-200, 200]) fillRR(sx - 30, -250, 60, 30, 8, PAL.gold);
  if (open > 0) {
    ctx.save(); ctx.translate(0, -260); ctx.scale(1, -Math.max(0.05, open)); fillRR(-300, 0, 600, 240, 24, '#3a3a48'); fillRR(-280, 20, 560, 200, 18, '#20202a'); ctx.restore();
    for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) { fillRR(-270 + i * 135, -240 + r * 70, 125, 62, 6, PAL.cash); fillRR(-250 + i * 135, -240 + r * 70, 20, 62, 2, '#f2e6c0'); }
    glow(0, -200, 380, '#a6f0b4', 0.4 * open);
  }
  ctx.restore();
}
function stopwatch(x, y, s, t, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  fillRR(-40, -330, 80, 60, 14, '#c0c4d4'); fillRR(-70, -360, 140, 40, 16, '#9aa0b8'); ctx.save(); ctx.rotate(0.6); fillRR(180, -250, 50, 40, 10, '#9aa0b8'); ctx.restore();
  circ(0, 0, 290, '#1d1a33'); circ(0, 0, 260, '#fbfbff');
  for (let i = 0; i < 60; i++) { const a = (i / 60) * TAU - Math.PI / 2, r0 = i % 5 ? 228 : 205; line(Math.cos(a) * r0, Math.sin(a) * r0, Math.cos(a) * 245, Math.sin(a) * 245, i % 5 ? 4 : 10, '#1d1a33'); }
  const a = (t % 60) / 60 * TAU - Math.PI / 2; line(0, 0, Math.cos(a) * 225, Math.sin(a) * 225, 10, PAL.red); circ(0, 0, 22, PAL.red);
  if (o.label) tText(o.label, 0, 110, 60, { color: '#1d1a33', shadow: false });
  ctx.restore();
}
function broetchen(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ell(0, 0, 150, 95, '#d98f3a'); ell(-10, -14, 130, 72, '#eaa95a'); line(-90, -30, 80, -40, 10, '#b06a20'); ell(-40, -40, 40, 14, 'rgba(255,255,255,0.35)'); ctx.restore(); }
function villa(x, y, s, lit = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 10, 620, 60, 0.4);
  ell(-420, -60, 160, 50, '#46c2ff'); ell(-420, -66, 130, 38, '#8fdcff');   // pool
  fillRR(-300, -460, 760, 460, 10, '#f4efe6'); fillRR(-340, -500, 840, 50, 10, '#d9d2c4'); fillRR(-120, -760, 460, 300, 10, '#ffffff'); fillRR(-150, -790, 520, 40, 10, '#d9d2c4');
  for (let i = 0; i < 5; i++) fillRR(-260 + i * 140, -380, 100, 300, 6, lit ? '#9fd8ff' : '#4a6fb8');
  for (let i = 0; i < 3; i++) fillRR(-80 + i * 140, -700, 100, 180, 6, lit ? '#ffe7a6' : '#4a6fb8');
  for (const px of [-500, 560]) { line(px, 0, px + 20, -340, 18, '#7a4a2a'); for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * 0.55; ell(px + 20 + Math.cos(a) * 70, -340 + Math.sin(a) * 40, 80, 18, '#2f9e57', a); } }
  ctx.restore();
}
function privateJet(x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-520, -20); ctx.quadraticCurveTo(-540, -110, -380, -120); ctx.lineTo(380, -120); ctx.quadraticCurveTo(560, -110, 560, -40); ctx.quadraticCurveTo(520, 10, 380, 10); ctx.lineTo(-380, 10); ctx.closePath(); ctx.fillStyle = '#f6f7fb'; ctx.fill();
  poly([[-380, -120], [-520, -300], [-440, -300], [-300, -120]], '#e8eaf2'); poly([[-60, -10], [160, -10], [-40, 180], [-130, 180]], '#e1e4ee'); poly([[-60, -120], [120, -120], [-30, -260], [-110, -260]], '#e8eaf2');
  for (let i = 0; i < 9; i++) ell(-260 + i * 60, -68, 16, 20, '#4a6fb8'); poly([[440, -110], [520, -80], [470, -60]], '#2b3550');
  line(-480, -40, 520, -40, 8, PAL.gold); fillRR(-470, -130, 90, 50, 18, '#c0c4d4'); fillRR(-470, -40, 90, 50, 18, '#c0c4d4');
  ctx.restore();
}
function sleepingJonas(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const br = Math.sin(TT * 1.6) * 6;
  fillRR(-460, -60, 920, 260, 30, '#6a4a2a'); fillRR(-440, -120, 880, 140, 30, '#f4f4f8');           // bed + mattress
  fillRR(-440, -150, 260, 110, 50, '#ffffff');                                                          // pillow
  const L = LOOKS.jonas; circ(-300, -190, 100, L.skin);
  for (let i = 0; i < 8; i++) poly([[-380 + i * 22, -250], [-370 + i * 22, -320 - (i % 3) * 18], [-350 + i * 22, -250]], L.hair);
  ell(-300, -250, 90, 40, L.hair); line(-340, -190, -310, -190, 6, '#1b1530'); line(-280, -190, -250, -190, 6, '#1b1530'); ctx.beginPath(); ctx.arc(-295, -150, 14, 0.2, Math.PI - 0.2); ctx.lineWidth = 5; ctx.strokeStyle = '#7a2a2a'; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-200, -100 - br); ctx.quadraticCurveTo(100, -170 - br, 440, -110); ctx.lineTo(440, 30); ctx.lineTo(-200, 30); ctx.closePath(); ctx.fillStyle = '#e8483c'; ctx.fill();   // blanket
  for (let i = 0; i < 3; i++) { const u = ((TT * 0.5 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - u; tText('Z', -180 + u * 160 + i * 30, -300 - u * 240, 50 + i * 16, { color: '#ffffff', shadow: false }); ctx.restore(); }
  ctx.restore();
}
// a counter that is visibly running but impossible to read: flickering digit-shaped blocks, never real numbers
function blurCounter(x, y, w, h, label, o = {}) {
  fillRR(x - w / 2, y - h / 2, w, h, 26, '#141026'); tText(label, x, y - h / 2 + 34, 26, { color: '#9f95c9', shadow: false, letter: 4 });
  const n = o.digits ?? 8, cw = (w - 120) / (n + 2), ch = (h - 110) * 0.8, cy = y + 22, R = RNG('bc', Math.floor(TT * 24));
  for (let i = 0; i < n; i++) {
    const cx = x - (n * cw) / 2 + i * cw + cw / 2 + (i >= n - 3 ? cw * 0.3 : 0) + (i >= n - 6 ? cw * 0.3 : 0), hh = ch * (0.55 + R.f() * 0.45);
    ctx.save(); ctx.globalAlpha = 0.85; fillRR(cx - cw * 0.34, cy - hh / 2, cw * 0.68, hh, cw * 0.22, '#41f08a'); ctx.globalAlpha = 0.5;
    for (let k = 0; k < 3; k++) line(cx - cw * 0.3, cy - ch / 2 + R.f() * ch, cx + cw * 0.3, cy - ch / 2 + R.f() * ch, 6, '#0b3d22'); ctx.restore();
  }
  ctx.save(); ctx.globalAlpha = 0.55; fillRR(x - w / 2 + 16, cy - ch / 2 - 10, w - 32, ch + 20, 16, 'rgba(20,16,38,0.55)'); ctx.restore();
  tText('€', x + w / 2 - 60, cy, h * 0.3, { color: '#41f08a', shadow: false });
  tText('???', x, cy, h * 0.45, { color: '#ffffff', stroke: '#141026', strokeW: 14 });
}
function bankApp(x, y, s, value, col, o = {}) {
  phone(x, y, s, o.rot ?? 0, () => { ctx.fillStyle = lin(0, -176, 0, 176, [[0, '#f4f6ff'], [1, '#e2e7fb']]); ctx.fillRect(-84, -176, 168, 352);
    fillRR(-84, -176, 168, 60, 0, '#1d48b8'); tText('MEINE BANK', 0, -140, 16, { color: '#fff', shadow: false });
    tText('KONTOSTAND', 0, -80, 13, { color: '#5b5f78', shadow: false, weight: 800 }); tText(value, 0, -45, value.length > 12 ? 19 : 24, { color: col, shadow: false, maxW: 150 });
    for (let i = 0; i < 4; i++) { fillRR(-70, 0 + i * 40, 140, 30, 8, '#ffffff'); tText(['Villa', 'Yacht', 'Jet', 'Personal'][i], -40, 15 + i * 40, 11, { color: '#3a3a48', shadow: false, weight: 700 }); tText('−', 50, 15 + i * 40, 14, { color: PAL.red, shadow: false }); } });
}
