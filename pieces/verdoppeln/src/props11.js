// =====================================================================
//  props11.js — "Eine halbe Million vs 1 Cent pro Sekunde": helicopter, jet ski, maid outfit, world-trip globe,
//  a lollipop, a gold phone, a phone ad, bank statements
// =====================================================================
// a sleek helicopter (side view); rotor spins, skids, tinted canopy
function helicopter(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.tilt ?? 0); ctx.scale(s, s);
  const col = o.col ?? '#1b1b28', hi = '#3a3a52';
  line(-80, 120, 260, 120, 12, '#9aa0b8'); line(-40, 70, -40, 120, 10, '#9aa0b8'); line(200, 70, 200, 120, 10, '#9aa0b8');   // skids
  ctx.beginPath(); ctx.moveTo(-360, -10); ctx.lineTo(-120, -30); ctx.lineTo(-120, 20); ctx.lineTo(-360, 0); ctx.closePath(); ctx.fillStyle = col; ctx.fill();   // tail boom
  poly([[-380, -90], [-340, -90], [-330, 10], [-370, 10]], col); circ(-355, -40, 46, 'rgba(200,210,230,0.25)');                                    // tail fin + rotor disc
  ctx.save(); ctx.translate(-355, -40); ctx.rotate(TT * 40); line(-50, 0, 50, 0, 8, '#c0c4d4'); ctx.restore();
  ctx.beginPath(); ctx.ellipse(70, 0, 230, 95, 0, 0, TAU); ctx.fillStyle = col; ctx.fill(); ctx.beginPath(); ctx.ellipse(70, -10, 230, 70, 0, Math.PI, TAU); ctx.fillStyle = hi; ctx.fill();
  ctx.beginPath(); ctx.ellipse(170, -10, 120, 70, 0, -Math.PI * 0.95, 0.15); ctx.fillStyle = '#7ad6ff'; ctx.fill(); ctx.save(); ctx.globalAlpha = 0.45; poly([[150, -70], [190, -70], [140, 30], [110, 30]], '#ffffff'); ctx.restore();
  line(-70, 10, 280, 10, 6, PAL.gold);
  fillRR(40, -125, 60, 30, 8, '#2a2a3a'); const blur = o.spin ?? 1; ctx.save(); ctx.translate(70, -125); ctx.scale(1, 0.18); ctx.globalAlpha = 0.5 + 0.3 * blur; circ(0, 0, 420, 'rgba(200,210,230,0.25)'); ctx.globalAlpha = 1; ctx.rotate(TT * 30 * blur); for (let i = 0; i < 4; i++) { ctx.rotate(Math.PI / 2); fillRR(0, -10, 420, 20, 10, '#c0c4d4'); } ctx.restore();
  ctx.restore();
}
// a jet ski (side view)
function jetski(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-200, 0); ctx.quadraticCurveTo(-210, -60, -120, -70); ctx.lineTo(120, -90); ctx.quadraticCurveTo(220, -80, 230, -20); ctx.lineTo(200, 20); ctx.lineTo(-180, 20); ctx.closePath(); ctx.fillStyle = '#ff3b4a'; ctx.fill();
  poly([[-120, -70], [60, -86], [40, -60], [-110, -50]], '#ffffff'); fillRR(-60, -120, 120, 40, 18, '#1b1b28'); line(60, -100, 110, -150, 10, '#1b1b28'); line(90, -150, 140, -150, 12, '#1b1b28');
  line(-180, 20, 200, 20, 8, '#1b1b28'); ctx.restore(); }
// a maid outfit icon: black dress with a white apron, a frilly headband and a feather duster
function maidOutfit(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  poly([[-70, -160], [70, -160], [150, 160], [-150, 160]], '#1b1b28'); poly([[-60, -60], [60, -60], [110, 150], [-110, 150]], '#ffffff');
  for (let i = 0; i < 9; i++) circ(-110 + i * 27.5, 155, 16, '#ffffff'); fillRR(-80, -200, 160, 50, 20, '#1b1b28'); line(-90, -70, 90, -70, 10, '#ffffff');
  ctx.save(); ctx.translate(0, -260); for (let i = 0; i < 7; i++) circ(-60 + i * 20, 0, 14, '#ffffff'); fillRR(-70, 6, 140, 14, 7, '#1b1b28'); ctx.restore();
  ctx.save(); ctx.translate(170, -40); ctx.rotate(0.4); line(0, 0, 0, 160, 10, '#8a5a2a'); for (let i = 0; i < 8; i++) ell(Math.sin(i) * 20, -20 - i * 10, 40, 14, ['#ff8fc0', '#ffd23f', '#52b8ff'][i % 3], i * 0.4); ctx.restore();
  ctx.restore(); }
// a globe with a plane flying around it
function globePlane(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); circ(0, 0, 260, '#2f8fd8'); ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 260, 0, TAU); ctx.clip();
  const o = (TT * 60) % 520; for (const [cx, cy, rx, ry] of [[-120, -60, 90, 70], [80, 40, 120, 80], [180, -120, 60, 50], [-200, 120, 80, 50]]) ell(((cx + o + 260) % 780) - 390, cy, rx, ry, '#41c06a'); ctx.restore();
  ctx.beginPath(); ctx.arc(0, 0, 260, 0, TAU); ctx.lineWidth = 10; ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.stroke();
  const a = TT * 1.8; ctx.save(); ctx.translate(Math.cos(a) * 340, Math.sin(a) * 140); ctx.rotate(a + Math.PI / 2); privateJet(0, 0, 0.18, 0); ctx.restore(); ctx.restore(); }
function lolli(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); line(0, 0, 0, 260, 14, '#f4f4f4'); circ(0, -60, 110, '#ff4fa3'); ctx.beginPath(); for (let i = 0; i < 40; i++) { const a = i * 0.45, r = i * 2.6; i ? ctx.lineTo(Math.cos(a) * r, -60 + Math.sin(a) * r) : ctx.moveTo(0, -60); } ctx.lineWidth = 14; ctx.strokeStyle = '#ffffff'; ctx.stroke(); ctx.restore(); }
// a gold phone (sparkles)
function goldPhone(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); glow(0, 0, 320, '#ffe08a', 0.45); fillRR(-110, -220, 220, 440, 40, '#d4af37'); fillRR(-96, -206, 192, 412, 32, '#f6d365'); fillRR(-82, -190, 164, 380, 24, '#1b1530');
  ctx.save(); ctx.globalAlpha = 0.35; poly([[-82, -120], [-20, -190], [20, -190], [-82, -60]], '#ffffff'); ctx.restore(); tText('24K', 0, 0, 60, { color: PAL.gold, shadow: false }); for (let i = 0; i < 4; i++) sparkle(-120 + i * 80, -240 + (i % 2) * 480, 24 + 8 * Math.sin(TT * 8 + i), '#fff', TT * 3); ctx.restore(); }
// a phone showing the jet ski ad, the KAUFEN button glows; pressed 0..1
function adPhone(x, y, s, o = {}) { phone(x, y, s, 0, () => { ctx.fillStyle = lin(0, -176, 0, 176, [[0, '#4ec3ff'], [1, '#1d48b8']]); ctx.fillRect(-84, -176, 168, 352);
  fillRR(-76, -166, 152, 30, 10, '#ffd23f'); tText('ANGEBOT!', 0, -151, 16, { color: '#1b1530', shadow: false }); jetski(0, -40, 0.32); tText('JETSKI', 0, 30, 24, { color: '#fff', shadow: false }); tText('45.000 €', 0, 62, 26, { color: '#ffd23f', shadow: false });
  const on = 0.5 + 0.5 * Math.sin(TT * 8); fillRR(-62, 100, 124, 44, 22, o.declined ? '#6a6f86' : `rgba(65,240,138,${0.75 + 0.25 * on})`); tText(o.declined ? '✗ NEIN' : 'KAUFEN', 0, 123, 18, { color: '#fff', shadow: false }); }); }
// a bank statement on paper; value hidden or shown
function statement(x, y, s, name, value, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shadowEll(0, 260, 220, 26, 0.3); fillRR(-200, -260, 400, 520, 12, '#fbfbf6');
  fillRR(-200, -260, 400, 80, 12, '#1d48b8'); tText('KONTOAUSZUG', 0, -220, 30, { color: '#fff', shadow: false, letter: 2 }); tText(name, 0, -140, 40, { color: '#1b1530', shadow: false });
  for (let i = 0; i < 5; i++) { line(-160, -80 + i * 44, 60, -80 + i * 44, 8, '#d8d8e4'); line(100, -80 + i * 44, 160, -80 + i * 44, 8, '#d8d8e4'); }
  line(-170, 150, 170, 150, 4, '#1b1530'); tText('SALDO', -100, 200, 28, { color: '#6a6f86', shadow: false });
  if (value) tText(value, 70, 200, 44, { color: '#18793a', shadow: false, maxW: 240 }); else { for (let i = 0; i < 6; i++) fillRR(10 + i * 30, 180, 22, 40, 6, '#41f08a'); ctx.save(); ctx.globalAlpha = 0.85; fillRR(0, 172, 200, 56, 10, 'rgba(20,16,38,0.55)'); ctx.restore(); tText('???', 100, 200, 44, { color: '#ffffff', stroke: '#141026', strokeW: 10 }); }
  ctx.restore(); }
