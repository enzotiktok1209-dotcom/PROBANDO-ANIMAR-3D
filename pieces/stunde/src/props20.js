// =====================================================================
//  props20.js — Token race: detailed sets and depth layers.
//  setJonasDen (big TV, LED strips, leather sofa, trophy shelf, posters, plants, night skyline window),
//  setTeamRoom (Kevin's room: four RGB desks, posters, cable trays, a window), deskFG (a foreground desk with keyboard,
//  mouse, cans: depth in close shots), streamerTile / streamerWall (20 live webcams), envelope (1.000 €), rimLight.
// =====================================================================
function ledStrip(x0, y0, x1, y1, hue0 = 0, w = 10) { const n = 26; for (let i = 0; i < n; i++) { const u = i / (n - 1), h = (hue0 + u * 200 + TT * 60) % 360; line(lerp(x0, x1, u), lerp(y0, y1, u), lerp(x0, x1, u + 1 / n), lerp(y0, y1, u + 1 / n), w, `hsl(${h},95%,60%)`); } glow((x0 + x1) / 2, (y0 + y1) / 2, Math.hypot(x1 - x0, y1 - y0) * 0.6, `hsl(${(hue0 + TT * 60) % 360},95%,60%)`, 0.12); }
function poster(x, y, w, h, c0, c1, txt) { ctx.save(); ctx.translate(x, y); fillRR(-w / 2 + 6, -h / 2 + 8, w, h, 6, 'rgba(0,0,0,0.3)'); ctx.fillStyle = lin(0, -h / 2, 0, h / 2, [[0, c0], [1, c1]]); ctx.fillRect(-w / 2, -h / 2, w, h); ctx.lineWidth = 6; ctx.strokeStyle = '#f4f4f8'; ctx.strokeRect(-w / 2, -h / 2, w, h);
  circ(0, -h * 0.1, w * 0.22, 'rgba(255,255,255,0.25)'); poly([[-w * 0.3, h * 0.2], [0, -h * 0.25], [w * 0.3, h * 0.2]], 'rgba(255,255,255,0.18)'); tText(txt, 0, h * 0.36, w * 0.17, { color: '#ffffff', shadow: false, maxW: w - 20 }); ctx.restore(); }
function skylineWindow(x, y, w, h, night = 1) {
  ctx.save(); rrPath(x, y, w, h, 8); ctx.clip(); ctx.fillStyle = night ? lin(0, y, 0, y + h, [[0, '#0b0730'], [1, '#3a1d6e']]) : lin(0, y, 0, y + h, [[0, '#5ab0ff'], [1, '#cfeaff']]); ctx.fillRect(x, y, w, h);
  if (night) { const R = RNG('sky' + x); for (let i = 0; i < 20; i++) circ(x + R.f() * w, y + R.f() * h * 0.4, 1.5 + R.f() * 2, 'rgba(255,255,255,0.7)'); circ(x + w * 0.78, y + h * 0.2, 26, '#fff3c0'); }
  for (let i = 0; i < 12; i++) { const bw = w / 9, bx = x + i * bw * 0.85 - 10, bh = h * (0.3 + ((i * 37) % 40) / 100); fillRR(bx, y + h - bh, bw * 0.8, bh, 3, night ? '#1d1840' : '#8aa8c8'); for (let r = 0; r < bh / 22 - 1; r++) for (let c = 0; c < 2; c++) fillRR(bx + 6 + c * bw * 0.36, y + h - bh + 8 + r * 20, bw * 0.2, 9, 2, (r + c + i) % 3 ? (night ? 'rgba(255,214,120,0.85)' : 'rgba(255,255,255,0.5)') : 'rgba(0,0,0,0.25)'); }
  ctx.restore(); ctx.lineWidth = 14; ctx.strokeStyle = '#e8e6f0'; rrPath(x, y, w, h, 8); ctx.stroke(); line(x + w / 2, y, x + w / 2, y + h, 10, '#e8e6f0');
}
// Jonas' gaming den: dark teal walls with panels, LED strips, a huge TV with the game, a leather sofa, a trophy shelf, posters, a plant
function setJonasDen(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, -400, 0, 1600, [[0, '#0f2430'], [1, '#14303c']]); ctx.fillRect(-600, -400, 2300, 2400);
    for (let i = 0; i < 9; i++) fillRR(-300 + i * 220, 120, 200, 1160, 8, 'rgba(255,255,255,0.025)');
    ledStrip(-300, 110, 1400, 110, 180); ledStrip(-300, 1290, 1400, 1290, 300, 8);
    skylineWindow(-180, 260, 360, 560, 1);
    poster(1000, 360, 200, 280, '#ff4fa3', '#7b3fe4', 'NO.1'); poster(780, 300, 150, 200, '#ffd23f', '#ff7a22', 'GG');
    // shelf with trophies
    fillRR(240, 520, 300, 18, 6, '#6a4a2a'); for (const [tx, c] of [[290, '#ffd23f'], [370, '#c0c6d6'], [450, '#d9a520']]) { fillRR(tx - 16, 470, 32, 50, 6, c); ell(tx, 462, 30, 18, c); fillRR(tx - 22, 512, 44, 10, 4, '#3a2a1a'); }
    // the big TV on the wall
    fillRR(330, 640, 560, 330, 14, '#08070c'); ctx.save(); rrPath(345, 655, 530, 300, 8); ctx.clip(); ctx.translate(610, 805); gameScreen(0, 0, 530, 300, { label: o.tvLabel ?? 'RUNDE 1', chests: 5 }); ctx.restore(); glow(610, 800, 380, '#52b8ff', 0.18);
    // floor + rug
    ctx.fillStyle = lin(0, 1300, 0, 2100, [[0, '#2a2a36'], [1, '#18181f']]); ctx.fillRect(-600, 1290, 2300, 900); ell(540, 1560, 620, 120, '#3a2050'); ell(540, 1560, 560, 100, '#4a2a68');
    // plant
    ctx.save(); ctx.translate(1010, 1290); fillRR(-50, -110, 100, 110, 16, '#c45a10'); for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.32 + Math.sin(TT + i) * 0.03; ell(Math.cos(a) * 70, -110 + Math.sin(a) * 90, 70, 18, '#2f9e57', a); } ctx.restore();
    if (o.sofa !== 0) { ctx.save(); ctx.translate(540, 1460); fillRR(-420, -150, 840, 180, 50, '#5a3220'); fillRR(-440, -40, 880, 120, 40, '#6e3e28'); fillRR(-470, -120, 90, 210, 40, '#4a2818'); fillRR(380, -120, 90, 210, 40, '#4a2818'); for (const sx of [-200, 0, 200]) fillRR(sx - 90, -40, 180, 20, 10, 'rgba(255,255,255,0.06)'); ctx.restore(); }
  });
}
// Kevin's team room: four RGB desks with monitors, posters, a window with daylight / night, cable trays, a fridge
function setTeamRoom(o = {}) {
  withBlur(o.blur, () => {
    const n = o.night ?? 0;
    ctx.fillStyle = lin(0, -400, 0, 1600, [[0, n ? '#14102a' : '#2a2050'], [1, n ? '#1d1838' : '#352a64']]); ctx.fillRect(-600, -400, 2300, 2400);
    skylineWindow(380, 160, 320, 300, n); poster(140, 300, 170, 230, '#41f08a', '#1d3fb0', 'TEAM'); poster(930, 300, 170, 230, '#ff4fa3', '#ff7a22', 'LOOT');
    ledStrip(-300, 520, 1400, 520, 90, 8);
    for (let i = 0; i < 4; i++) { const x = 140 + i * 267; fillRR(x - 110, 700, 220, 150, 10, '#0a0910'); ctx.save(); rrPath(x - 100, 710, 200, 130, 6); ctx.clip(); gameScreen(x, 775, 200, 130, { label: '', chests: 3 }); ctx.restore(); fillRR(x - 10, 850, 20, 40, 4, '#2b2b36'); fillRR(x - 60, 886, 120, 12, 4, '#2b2b36'); glow(x, 775, 160, `hsl(${(i * 80 + TT * 40) % 360},90%,60%)`, 0.15); }
    fillRR(-100, 900, 1280, 40, 8, '#3a2a1a'); fillRR(-100, 940, 1280, 14, 4, '#2a1e12'); for (let i = 0; i < 4; i++) { const x = 140 + i * 267; fillRR(x - 80, 905, 160, 22, 6, '#1b1b24'); for (let k = 0; k < 10; k++) fillRR(x - 72 + k * 15, 909, 11, 6, 2, `hsl(${(k * 30 + TT * 120) % 360},90%,60%)`); ell(x + 110, 915, 18, 12, '#1b1b24'); }
    ctx.fillStyle = lin(0, 954, 0, 2100, [[0, '#2a2438'], [1, '#141020']]); ctx.fillRect(-600, 954, 2300, 1300); for (let i = 0; i < 12; i++) line(-600 + i * 200, 954, -900 + i * 280, 2100, 3, 'rgba(255,255,255,0.04)');
  });
}
// a foreground desk edge with keyboard, mouse, a can and a headset stand: gives close shots depth (drawn last)
function deskFG(y = 1620, o = {}) {
  fillRR(-200, y, 1480, 600, 0, '#241a14'); fillRR(-200, y, 1480, 26, 0, '#3a2a1e');
  ctx.save(); ctx.translate(540, y + 70); fillRR(-330, -26, 660, 84, 14, '#15141c'); for (let r = 0; r < 4; r++) for (let c = 0; c < 18; c++) fillRR(-316 + c * 35.5, -16 + r * 18, 30, 14, 3, `hsl(${(c * 18 + r * 30 + TT * 90) % 360},85%,${o.rgb === 0 ? 30 : 58}%)`); ctx.restore();
  ell(960, y + 90, 50, 66, '#15141c'); line(960, y + 40, 960, y + 80, 4, '#52b8ff');
  if (o.can !== 0) energyCan(110, y + 130, 1.1, 0, o.canCol ?? '#41f08a');
}
// one live webcam tile (a streamer with a headset, a LIVE badge, a chest counter)
function streamerTile(x, y, w, h, i, o = {}) {
  const ids = ['mia', 'leo', 'zoe', 'dani', 'lea', 'jason', 'lucia', 'mech'], id = ids[i % ids.length], hue = (i * 47) % 360;
  ctx.save(); ctx.translate(x, y); rrPath(-w / 2, -h / 2, w, h, 10); ctx.clip(); ctx.fillStyle = lin(0, -h / 2, 0, h / 2, [[0, `hsl(${hue},45%,28%)`], [1, `hsl(${hue},45%,16%)`]]); ctx.fillRect(-w / 2, -h / 2, w, h);
  ledStrip(-w / 2, -h / 2 + 10, w / 2, -h / 2 + 10, hue, 4);
  const s = h / 900; char(id, 0, h / 2 + h * 0.62, s * 1.15, { pose: [[0, o.pose ?? 'holdBoth']], emo: [[0, o.emo ?? (i % 3 ? 'happy' : 'laugh')]], extras: { headset: 1 } });
  fillRR(-w / 2 + 6, -h / 2 + 6, 46, 20, 5, '#e8262f'); tText('LIVE', -w / 2 + 29, -h / 2 + 16, 13, { color: '#fff', shadow: false });
  ctx.restore(); ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(255,255,255,0.35)'; rrPath(x - w / 2, y - h / 2, w, h, 10); ctx.stroke();
}
function streamerWall(cx, cy, cols, rows, w, h, gap, n, o = {}) { let k = 0; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { if (k >= n) return; const x = cx + (c - (cols - 1) / 2) * (w + gap), y = cy + (r - (rows - 1) / 2) * (h + gap); const t0 = (o.t0 ?? -9) + k * (o.stagger ?? 0.04); if (TT >= t0) { const kk = springEase(TT - t0, 320, 14); ctx.save(); ctx.translate(x, y); ctx.scale(kk, kk); streamerTile(0, 0, w, h, k, o); ctx.restore(); } k++; } }
// a cash envelope with an amount
function envelope(x, y, s, amount = '1.000 €', rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); fillRR(-160, -100, 320, 200, 12, '#f4ead0'); poly([[-160, -100], [0, 10], [160, -100]], '#e6d8b8'); for (let i = 0; i < 3; i++) bill(-60 + i * 30, -110 - i * 6, 150, -0.2 + i * 0.1); tText(amount, 0, 60, 46, { color: '#1b1530', shadow: false }); ctx.restore(); }
// a cool rim light behind a character (makes figures pop off the background)
function rimLight(x, y, r, col = '#7fd8ff', a = 0.28) { glow(x, y, r, col, a); }
