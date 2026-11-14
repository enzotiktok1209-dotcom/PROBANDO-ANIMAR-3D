// =====================================================================
//  props6.js — 1 Million vs 1 Cent pro Sekunde: giant cheque, copper cent, gold watch, club party,
//  Jonas' coin jar, a crown, a white flag, a gum bubble, floating maths.
// =====================================================================
function giantCheck(x, y, s, amount = '1.000.000 €', rot = -0.05) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  fillRR(-430 + 12, -210 + 16, 860, 420, 22, 'rgba(0,0,0,0.35)');
  fillRR(-430, -210, 860, 420, 22, '#fffdf2'); fillRR(-430, -210, 860, 70, 18, PAL.green); fillRR(-430, -160, 860, 20, 0, PAL.green);
  tText('SHOW-BANK', -260, -174, 34, { color: '#fff', shadow: false, letter: 4 }); tText('Nr. 000001', 300, -174, 26, { color: '#dfffe9', shadow: false });
  tText('Auszahlung an:', -390, -80, 30, { align: 'left', color: '#6a6a80', shadow: false, weight: 700 }); tText('KEVIN', -150, -80, 46, { align: 'left', color: '#1b1530', shadow: false });
  line(-390, -40, 390, -40, 3, '#c9c9d6');
  fillRR(-390, -10, 780, 120, 16, '#eefaf2'); tText(amount, 0, 52, 96, { color: PAL.greenD, shadow: false, maxW: 740 });
  line(120, 170, 380, 170, 3, '#9a9ab0'); tText('Moderator', 250, 150, 30, { color: '#2f6df6', shadow: false, weight: 700 });
  ctx.restore();
}
// a copper 1-cent coin (not the gold coin of earlier videos)
function copperCent(x, y, r, o = {}) {
  const sx = o.sx ?? 1, a = Math.abs(sx);
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0);
  ell(r * 0.07 * Math.sign(sx || 1), r * 0.07, r * a + r * 0.07, r, '#7a3d16');
  ell(0, 0, r * a, r, '#c9743a'); ell(0, 0, r * 0.84 * a, r * 0.84, '#e08a4c');
  if (a > 0.35) { ctx.save(); ctx.scale(a, 1);
    tText('1', -r * 0.12, -r * 0.06, r * 0.9, { color: '#7a3d16', shadow: false }); tText('CENT', 0, r * 0.5, r * 0.26, { color: '#7a3d16', shadow: false, letter: 2 });
    for (let i = 0; i < 12; i++) { const ang = (i / 12) * TAU; sparkle(Math.cos(ang) * r * 0.7, Math.sin(ang) * r * 0.7, r * 0.05, '#f2b07a'); } ctx.restore(); }
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, r * a, r, 0, 0, TAU); ctx.clip(); ctx.globalAlpha = 0.4; poly([[-r * 1.2, -r * 0.2], [-r * 0.5, -r * 1.2], [-r * 0.2, -r * 1.2], [-r * 0.9, r * 0.1]], '#ffd9b8'); ctx.restore();
  ctx.restore();
}
function goldWatch(x, y, s, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  fillRR(-120, -520, 240, 1040, 40, '#c99a1a'); for (let i = 0; i < 14; i++) { fillRR(-120, -520 + i * 74, 240, 10, 4, '#a07a10'); fillRR(-40, -520 + i * 74, 80, 64, 8, '#e8c040'); }
  circ(0, 0, 250, '#a07a10'); circ(0, 0, 230, '#e8c040');
  for (let i = 0; i < 24; i++) { const a = (i / 24) * TAU; ctx.save(); ctx.rotate(a); fillRR(-10, -232, 20, 26, 6, '#fff3b0'); ctx.restore(); }
  circ(0, 0, 196, '#0f3d2a'); for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU - Math.PI / 2; circ(Math.cos(a) * 160, Math.sin(a) * 160, i % 3 ? 10 : 16, '#ffffff'); if (i % 3 === 0) sparkle(Math.cos(a) * 160, Math.sin(a) * 160, 20, '#dff6ff', t); }
  const m = (t * 6) % 60, ha = -Math.PI / 2 + 0.6, ma = (m / 60) * TAU - Math.PI / 2, sa = (t % 60) / 60 * TAU - Math.PI / 2;
  line(0, 0, Math.cos(ha) * 90, Math.sin(ha) * 90, 16, '#e8e8f2'); line(0, 0, Math.cos(ma) * 140, Math.sin(ma) * 140, 10, '#e8e8f2'); line(0, 0, Math.cos(sa) * 160, Math.sin(sa) * 160, 4, PAL.gold);
  circ(0, 0, 16, PAL.gold); fillRR(-60, 80, 120, 44, 8, '#e8e8f2'); tText(String(5 + Math.floor(t) % 26).padStart(2, '0'), 0, 103, 30, { color: '#1b1530', shadow: false });
  fillRR(240, -30, 40, 60, 12, '#c99a1a');
  ctx.save(); ctx.globalAlpha = 0.35; ctx.beginPath(); ctx.arc(0, 0, 196, Math.PI * 1.1, Math.PI * 1.5); ctx.lineTo(0, 0); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore();
  ctx.restore();
}
function setClub(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = '#0a0618'; ctx.fillRect(-600, -400, 2300, 2800);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 8; i++) { const a = Math.sin(TT * 1.5 + i) * 0.8 + (i - 3.5) * 0.18, c = ['rgba(255,79,163,0.35)', 'rgba(82,184,255,0.35)', 'rgba(65,240,138,0.3)'][i % 3];
      ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(540, 160); ctx.lineTo(540 + Math.sin(a - 0.03) * 2000, 160 + Math.cos(a - 0.03) * 2000); ctx.lineTo(540 + Math.sin(a + 0.03) * 2000, 160 + Math.cos(a + 0.03) * 2000); ctx.fill(); }
    ctx.restore();
    circ(540, 160, 70, '#c0c4d4'); for (let i = 0; i < 30; i++) { const R = RNG('ball', i); fillRR(540 + R.n(55) - 8, 160 + R.n(55) - 8, 16, 16, 2, (Math.floor(TT * 8) + i) % 3 ? '#e8ecff' : '#7a86b0'); }
    fillRR(240, 900, 600, 220, 20, '#1b1530'); fillRR(260, 920, 560, 40, 10, '#ff4fa3'); for (let i = 0; i < 2; i++) { circ(380 + i * 320, 1030, 70, '#2b2440'); circ(380 + i * 320, 1030, 20 + 6 * Math.sin(TT * 20 + i), '#41f08a'); }
    tText('KEVINS PARTY', 540, 960, 40, { color: '#fff', shadow: false });
    ctx.fillStyle = '#05030c'; ctx.fillRect(-600, 1360, 2300, 900);
    const R = RNG('crowd'); for (let i = 0; i < 16; i++) { const x = -60 + i * 76 + R.n(10), bob = Math.abs(Math.sin(TT * 8 + i)) * 26, hy = 1440 - bob - (i % 2) * 30; circ(x, hy, 46, '#120a2e'); fillRR(x - 60, hy + 34, 120, 260, 50, '#120a2e'); if (i % 3 === 0) line(x + 20, hy + 40, x + 60, hy - 110 - bob, 26, '#120a2e'); }
  });
}
function coinJar(x, y, s, fill = 0.3) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 10, 260, 30, 0.35);
  fillRR(-220, -560, 440, 560, 70, 'rgba(210,240,255,0.25)');
  ctx.save(); ctx.beginPath(); ctx.roundRect(-210, -550, 420, 540, 64); ctx.clip();
  const top = -20 - 520 * fill, R = RNG('jar'); for (let i = 0; i < 160; i++) { const cx = -190 + R.f() * 380, cy = -20 - R.f() * 520 * fill; copperCent(cx, cy, 30, { sx: 0.4 + R.f() * 0.6, rot: R.n(1) }); }
  ctx.restore();
  rrPath(-220, -560, 440, 560, 70); ctx.lineWidth = 10; ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.stroke();
  fillRR(-150, -620, 300, 70, 16, '#7a4a2a'); line(-150, -480, -150, -100, 16, 'rgba(255,255,255,0.35)');
  ctx.restore();
}
function crown(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); poly([[-120, 0], [120, 0], [140, -120], [70, -50], [0, -150], [-70, -50], [-140, -120]], PAL.gold); fillRR(-120, -20, 240, 30, 8, PAL.goldD); for (const cx of [-70, 0, 70]) circ(cx, -6, 12, [PAL.red, PAL.blue, PAL.green][(cx + 70) / 70]); circ(0, -150, 14, PAL.red); sparkle(80, -100, 22 * (0.6 + 0.4 * Math.sin(TT * 9)), '#fff'); ctx.restore(); }
function whiteFlag(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line(0, 0, 0, -300, 10, '#7a4a2a'); ctx.beginPath(); ctx.moveTo(0, -300); for (let i = 0; i <= 10; i++) ctx.lineTo(i * 20, -300 + Math.sin(TT * 8 + i * 0.6) * 10); for (let i = 10; i >= 0; i--) ctx.lineTo(i * 20, -180 + Math.sin(TT * 8 + i * 0.6) * 10); ctx.closePath(); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); }
function thoughtBubble(x, y, w, h, fn) { circ(x - w * 0.3, y + h * 0.62, 18, '#fff'); circ(x - w * 0.2, y + h * 0.52, 28, '#fff'); fillRR(x - w / 2, y - h / 2, w, h, h * 0.45, '#ffffff'); ctx.save(); ctx.translate(x, y); fn && fn(); ctx.restore(); }
function gum(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fillRR(-120, -40, 240, 80, 14, '#ff8fc0'); fillRR(-120, -40, 70, 80, 14, '#ffffff'); fillRR(50, -40, 70, 80, 14, '#ffffff'); tText('KAUGUMMI', 0, 2, 22, { color: '#8a1f55', shadow: false }); ctx.restore(); }
function floatingMath(cx, cy, seed = 'fm') { const sym = ['+', '×', '=', '?', '€', '÷', '?', '¢']; const R = RNG(seed);
  for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU + TT * 0.5, r = 260 + R.f() * 140 + Math.sin(TT * 2 + i) * 20; ctx.save(); ctx.globalAlpha = 0.85; tText(sym[i % sym.length], cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.75, 60 + R.f() * 40, { color: ['#ffd23f', '#ff8fc0', '#52b8ff', '#ffffff'][i % 4], stroke: '#1b0f2e', strokeW: 10 }); ctx.restore(); } }
function startFlag(x, y, s, wave = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line(0, 0, 0, -420, 14, '#2b2440'); for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const px = c * 50, py = -420 + r * 50 + Math.sin(TT * 9 + c * 0.7) * 14 * wave; fillRR(px, py, 50, 50, 0, (r + c) % 2 ? '#ffffff' : '#1b1530'); } ctx.restore(); }
