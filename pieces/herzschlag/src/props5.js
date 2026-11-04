// =====================================================================
//  props5.js — Herzschlag: luxury garage, private island, heart monitor (no numbers), Jonas training,
//  Kevin asleep, a beating heart icon.
// =====================================================================
function setLuxGarage(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1400, [[0, '#101320'], [1, '#1c2236']]); ctx.fillRect(-600, -400, 2300, 1800);
    for (let i = 0; i < 7; i++) { const x = -60 + i * 200; fillRR(x - 6, 0, 12, 1380, 4, 'rgba(255,255,255,0.05)'); fillRR(x - 50, 40, 100, 14, 6, '#e8f0ff'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = lin(0, 54, 0, 1500, [[0, 'rgba(220,235,255,0.18)'], [1, 'rgba(0,0,0,0)']]); ctx.beginPath(); ctx.moveTo(x - 40, 54); ctx.lineTo(x + 40, 54); ctx.lineTo(x + 160, 1500); ctx.lineTo(x - 160, 1500); ctx.fill(); ctx.restore(); }
    neonSign(540, 300, 'KEVINS GARAGE', '#ff4fa3');
    ctx.fillStyle = lin(0, 1300, 0, 1920, [[0, '#2a3048'], [1, '#0e1120']]); ctx.fillRect(-600, 1300, 2300, 900);
    for (let i = 0; i < 6; i++) line(-600 + i * 400, 1300, -900 + i * 520, 1920, 4, 'rgba(255,255,255,0.06)');
  });
}
function setIsland(o = {}) {
  withBlur(o.blur, () => {
    const night = o.night ?? 0;
    ctx.fillStyle = night ? lin(0, 0, 0, 1200, [[0, '#120c3a'], [1, '#6a2a7a']]) : lin(0, 0, 0, 1200, [[0, '#4ec3ff'], [1, '#bfeaff']]); ctx.fillRect(-600, -400, 2300, 1700);
    if (night) { const R = RNG('stars'); for (let i = 0; i < 50; i++) circ(R.f() * 1080, R.f() * 800, 2 + R.f() * 2, 'rgba(255,255,255,0.7)'); circ(820, 300, 70, '#fff3c0'); }
    else { circ(820, 300, 110, '#fff3a6'); glow(820, 300, 360, '#fff3a6', 0.4); }
    ctx.fillStyle = night ? '#2a3a8a' : '#1e9be0'; ctx.fillRect(-600, 1000, 2300, 500);
    for (let i = 0; i < 7; i++) line(-200 + i * 220 + Math.sin(TT * 2 + i) * 30, 1080 + (i % 3) * 90, -80 + i * 220 + Math.sin(TT * 2 + i) * 30, 1080 + (i % 3) * 90, 8, 'rgba(255,255,255,0.45)');
    ctx.beginPath(); ctx.moveTo(-600, 1320); ctx.quadraticCurveTo(540, 1180, 1700, 1320); ctx.lineTo(1700, 2300); ctx.lineTo(-600, 2300); ctx.closePath(); ctx.fillStyle = night ? '#b89a70' : '#f3d9a0'; ctx.fill();
    for (const [px, sc] of [[60, 1.0], [980, 0.9]]) { ctx.save(); ctx.translate(px, 1330); ctx.scale(sc, sc); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(40, -300, 10, -560); ctx.lineWidth = 34; ctx.strokeStyle = '#7a4a2a'; ctx.stroke();
      for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.5 + Math.sin(TT * 1.3 + i) * 0.04; ell(10 + Math.cos(a) * 120, -560 + Math.sin(a) * 60, 140, 26, '#2f9e57', a); } circ(-6, -545, 18, '#6a3a1a'); circ(24, -540, 18, '#6a3a1a'); ctx.restore(); }
    if (o.party) for (let i = 0; i < 8; i++) { const u = i / 7, px = lerp(120, 960, u), py = 520 + 120 * Math.sin(u * Math.PI); circ(px, py, 14, ['#ff4fa3', '#ffd23f', '#52b8ff'][i % 3]); glow(px, py, 60, ['#ff4fa3', '#ffd23f', '#52b8ff'][i % 3], 0.5 + 0.3 * Math.sin(TT * 8 + i)); }
  });
}
// a smartwatch / monitor: a running ECG line and a pulsing heart — deliberately no numbers
function heartMonitor(x, y, w, h, o = {}) {
  fillRR(x - w / 2, y - h / 2, w, h, 30, '#0d0b1a'); fillRR(x - w / 2 + 12, y - h / 2 + 12, w - 24, h - 24, 22, '#06150c');
  ctx.save(); rrPath(x - w / 2 + 12, y - h / 2 + 12, w - 24, h - 24, 22); ctx.clip();
  for (let i = 0; i < 8; i++) line(x - w / 2 + i * w / 8, y - h / 2, x - w / 2 + i * w / 8, y + h / 2, 2, 'rgba(65,240,138,0.08)');
  const speed = o.speed ?? 1, per = 0.85 / speed; ctx.beginPath();
  for (let px = 0; px <= w; px += 4) { const t = TT * 1.4 - (w - px) / w * 1.4, ph = ((t % per) + per) % per / per; let v = 0;
    if (ph > 0.3 && ph < 0.34) v = -0.15; else if (ph > 0.36 && ph < 0.4) v = 0.9; else if (ph > 0.4 && ph < 0.44) v = -0.45; else if (ph > 0.55 && ph < 0.65) v = 0.12;
    const yy = y + 20 - v * h * 0.35; px ? ctx.lineTo(x - w / 2 + px, yy) : ctx.moveTo(x - w / 2, yy); }
  ctx.lineWidth = 7; ctx.strokeStyle = '#41f08a'; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
  const beat = ((TT % per) / per), k = 1 + 0.25 * Math.max(0, 1 - beat * 6); heartIcon(x + w / 2 - 70, y - h / 2 + 70, 34 * k, '#ff3b5c');
}
function heartIcon(x, y, r, col = '#ff3b5c') { ctx.save(); ctx.translate(x, y); ctx.beginPath(); ctx.moveTo(0, r * 0.9); ctx.bezierCurveTo(-r * 1.6, -r * 0.2, -r * 0.8, -r * 1.3, 0, -r * 0.45); ctx.bezierCurveTo(r * 0.8, -r * 1.3, r * 1.6, -r * 0.2, 0, r * 0.9); ctx.fillStyle = col; ctx.fill(); ell(-r * 0.45, -r * 0.55, r * 0.22, r * 0.14, 'rgba(255,255,255,0.5)', -0.5); ctx.restore(); }
// push-ups (side view): a simple figure in Jonas' colours going up and down
function pushups(x, y, s) {
  const L = LOOKS.jonas, k = (Math.sin(TT * 7) + 1) / 2, sh = -90 - k * 70;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 8, 340, 26, 0.35);
  line(-300, -20, 200, sh + 30, 70, L.pants); line(-300, -20, -330, -10, 40, L.shoe);
  line(-40, sh + 20, 200, sh, 90, L.top); line(170, sh + 10, 190, -10, 40, L.top); circ(195, -12, 24, L.skin);
  circ(290, sh - 30, 70, L.skin); for (let i = 0; i < 6; i++) poly([[250 + i * 14, sh - 80], [260 + i * 14, sh - 140 - (i % 3) * 14], [276 + i * 14, sh - 80]], L.hair); ell(270, sh - 80, 66, 30, L.hair);
  circ(318, sh - 34, 6, '#1b1530'); if (k > 0.6) poly([[340, sh - 60], [348, sh - 44], [336, sh - 44]], '#9fd8ff');
  ctx.restore();
}
function stairs(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 9; i++) { fillRR(-500 + i * 110, -i * 90, 1100 - i * 110, 90, 0, i % 2 ? '#b8bfd6' : '#c9cfe2'); line(-500 + i * 110, -i * 90, 600, -i * 90, 4, '#8a93b0'); } ctx.restore(); }
function sleepingKevin(x, y, s, awake = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const br = Math.sin(TT * 1.6) * 6 * (1 - awake);
  fillRR(-460, -60, 920, 260, 30, '#d9c4a0'); fillRR(-440, -120, 880, 140, 30, '#ffffff'); fillRR(-440, -150, 260, 110, 50, '#f4efe6');
  const L = LOOKS.kevin, hy = -190 - awake * 90; circ(-300, hy, 100, L.skin); ctx.beginPath(); ctx.ellipse(-300, hy - 30, 104, 70, 0, Math.PI, TAU); ctx.closePath(); ctx.fillStyle = L.beanie; ctx.fill();
  if (awake < 0.5) { line(-340, hy, -310, hy, 6, '#1b1530'); line(-280, hy, -250, hy, 6, '#1b1530'); } else { circ(-325, hy, 16, '#fff'); circ(-265, hy, 16, '#fff'); circ(-322, hy + 2, 7, '#1b1530'); circ(-262, hy + 2, 7, '#1b1530'); ell(-295, hy + 45, 16, 20, '#5a1420'); }
  ctx.beginPath(); ctx.moveTo(-200, -100 - br); ctx.quadraticCurveTo(100, -170 - br, 440, -110); ctx.lineTo(440, 30); ctx.lineTo(-200, 30); ctx.closePath(); ctx.fillStyle = '#2f6df6'; ctx.fill();
  if (awake < 0.5) for (let i = 0; i < 3; i++) { const u = ((TT * 0.5 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - u; tText('Z', -180 + u * 160 + i * 30, -300 - u * 240, 50 + i * 16, { color: '#ffffff', shadow: false }); ctx.restore(); }
  ctx.restore();
}
