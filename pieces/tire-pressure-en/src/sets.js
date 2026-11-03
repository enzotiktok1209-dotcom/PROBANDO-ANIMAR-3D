// =====================================================================
//  sets.js — the environments, in world units around the car (front wheel centre at 0,0, ground at y = WR).
//  Every set covers a wide area so the camera can pull out to z ≈ 0.5. Static detail is cached as layers.
// =====================================================================
const GY = WR;   // ground line

// ---------------------------------------------------------------- shared pieces
function skyFill(stops, y0 = -2600, y1 = 400) { ctx.fillStyle = lin(0, y0, 0, y1, stops); ctx.fillRect(-4000, y0, 8000, y1 - y0); }
function groundFill(stops, y0 = GY, y1 = 3200) { ctx.fillStyle = lin(0, y0, 0, y1, stops); ctx.fillRect(-4000, y0, 8000, y1 - y0); }
function stars(n, key, y0, y1, a = 1, rot = 0) {
  const img = dotSprite('#cfe0ff', 24);
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) { const R = RNG(key, i); let x = R.r(-3000, 3000), y = R.r(y0, y1); if (rot) { const c = Math.cos(rot), s = Math.sin(rot), dx = x, dy = y - 3000; x = dx * c - dy * s; y = dy * c + dx * s + 3000; } sprite(img, x, y, R.r(6, 22), a * (0.4 + 0.6 * Math.abs(Math.sin(TT * R.r(1, 3) + i)))); }
  ctx.restore();
}
function skyline(key, w, h, base, lit, far = false) {
  return layer(key, w, h, () => {
    const R = RNG(key);
    let x = 0;
    while (x < w) {
      const bw = R.r(60, 190), bh = R.r(h * 0.25, h * 0.95);
      ctx.fillStyle = base; ctx.fillRect(x, h - bh, bw, bh);
      if (R.f() < 0.25) ctx.fillRect(x + bw * 0.45, h - bh - R.r(20, 70), 6, 70);
      for (let yy = h - bh + 14; yy < h - 10; yy += 22) for (let xx = x + 10; xx < x + bw - 12; xx += 18) if (R.f() < (far ? 0.18 : 0.28)) { ctx.fillStyle = R.pick(lit); ctx.globalAlpha = R.r(0.35, 0.9); ctx.fillRect(xx, yy, 8, 11); ctx.globalAlpha = 1; }
      x += bw + R.r(0, 14);
    }
  });
}
function woodTile() {
  return layer('wood', 1600, 1600, (w, h) => {
    ctx.fillStyle = lin(0, 0, w, h, [[0, '#7a4a26'], [0.5, '#8f5a2f'], [1, '#6a3d1e']]); ctx.fillRect(0, 0, w, h);
    const R = RNG('wood');
    for (let i = 0; i < 140; i++) {
      const y0 = R.r(-100, h + 100), amp = R.r(10, 60), fq = R.r(0.002, 0.006), ph = R.f() * TAU;
      ctx.strokeStyle = R.f() < 0.5 ? 'rgba(60,30,12,0.35)' : 'rgba(180,120,70,0.18)'; ctx.lineWidth = R.r(1.5, 6);
      ctx.beginPath(); for (let x = 0; x <= w; x += 20) { const y = y0 + Math.sin(x * fq + ph) * amp + Math.sin(x * fq * 3.1 + ph) * amp * 0.25; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
    }
    for (let i = 0; i < 6; i++) { const x = R.r(100, w - 100), y = R.r(100, h - 100); ctx.strokeStyle = 'rgba(50,24,8,0.4)'; ctx.lineWidth = 3; for (let k = 1; k < 7; k++) { ctx.beginPath(); ctx.ellipse(x, y, k * 16, k * 6, 0, 0, TAU); ctx.stroke(); } }
  });
}
function asphaltTile(key = 'asph', base = '#23252b') {
  return layer(key, 1024, 1024, (w, h) => {
    ctx.fillStyle = base; ctx.fillRect(0, 0, w, h); const R = RNG(key);
    for (let i = 0; i < 9000; i++) { const g = R.f(); ctx.fillStyle = g < 0.5 ? 'rgba(0,0,0,0.35)' : g < 0.85 ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.16)'; const s = R.r(1, 5); ctx.fillRect(R.f() * w, R.f() * h, s, s * R.r(0.5, 1)); }
  });
}
function tileFill(img, x0, y0, x1, y1, ox = 0, oy = 0) {
  ctx.save(); const p = ctx.createPattern(img, 'repeat'); p.setTransform(new DOMMatrix([1, 0, 0, 1, ox, oy])); ctx.fillStyle = p; ctx.fillRect(x0, y0, x1 - x0, y1 - y0); ctx.restore();
}
function dust(n, key, x0, x1, y0, y1, color = '#ffffff', a = 0.5, vx = 0, vy = -12) {
  const img = dotSprite(color, 24);
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) { const R = RNG(key, i), W2 = x1 - x0, H2 = y1 - y0; const x = x0 + mod(R.f() * W2 + TT * (vx + R.n(8)), W2), y = y0 + mod(R.f() * H2 + TT * (vy + R.n(6)), H2); sprite(img, x, y, R.r(5, 16), a * (0.3 + 0.7 * Math.abs(Math.sin(TT * 0.8 + i)))); }
  ctx.restore();
}

// ---------------------------------------------------------------- 1. the gas station at night
function setGasNight(o = {}) {
  skyFill([[0, '#04060d'], [0.55, '#0b1228'], [0.8, '#16224a'], [1, '#1d2b55']], -2600, -300);
  stars(90, 'gstar', -2600, -1500, 0.6);
  const sk = skyline('gsky', 3600, 520, '#0b1022', ['#ffd27a', '#ffe9b8', '#9fc3ff'], true);
  ctx.drawImage(sk, -1800 + (o.par ?? 0) * 0.2, -820, 3600, 520);
  // a road behind, with a car passing (light streak)
  ctx.fillStyle = '#0c0f18'; ctx.fillRect(-4000, -300, 8000, 70);
  const pass = mod(TT * 0.33 + 0.2, 1); if (pass < 0.5) { const px = lerp(2600, -2600, pass * 2); bloom(px, -270, 160, '#fff1c8', 0.8); bloom(px + 260, -268, 90, '#ff3030', 0.6); }
  // the forecourt
  groundFill([[0, '#202737'], [0.25, '#151a26'], [1, '#07090e']], -230, 3200);
  ctx.save(); ctx.globalAlpha = 0.5; tileFill(asphaltTile('gasph', '#1a1f2b'), -4000, -230, 4000, 3200); ctx.restore();
  // wet reflections of the canopy lights
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (const lx of [-1500, -700, 100, 900, 1700]) { ctx.fillStyle = lin(0, GY, 0, GY + 1400, [[0, 'rgba(200,220,255,0.16)'], [1, 'rgba(200,220,255,0)']]); ctx.fillRect(lx - 90, GY, 180, 1400); }
  ctx.restore();
  // parking lines, oil stains, a kerb island under the air machine
  ctx.fillStyle = 'rgba(255,255,255,0.55)'; for (const lx of [-1100, 1250]) { poly([[lx, GY + 30], [lx + 26, GY + 30], [lx + 90, GY + 900], [lx + 40, GY + 900]]); ctx.fill(); }
  ctx.fillStyle = 'rgba(240,200,60,0.6)'; ctx.fillRect(-2000, GY + 600, 4000, 14);
  for (let i = 0; i < 7; i++) { const R = RNG('oil', i); ell(R.r(-1400, 1500), GY + R.r(120, 800), R.r(40, 140), R.r(10, 30), 'rgba(0,0,0,0.3)'); }
  fillRR(-820, GY - 40, 520, 60, 10, lin(0, GY - 40, 0, GY + 20, [[0, '#cfd4dc'], [1, '#6c7380']]));
  for (let i = 0; i < 6; i++) fillRR(-820 + i * 90, GY - 40, 45, 60, 0, 'rgba(230,180,40,0.75)');
  // pillars
  for (const px of [-1350, 1550]) { ctx.fillStyle = lin(px - 70, 0, px + 70, 0, [[0, '#e8ebf0'], [0.5, '#aeb5c0'], [1, '#69707c']]); ctx.fillRect(px - 70, -1180, 140, 1300 + GY - 120); ctx.fillStyle = '#c2281d'; ctx.fillRect(px - 70, -300, 140, 26); }
  // background fuel pump
  pumpBG(-1820, GY); pumpBG(2050, GY);
  // the canopy
  ctx.fillStyle = lin(0, -1500, 0, -1150, [[0, '#0f1730'], [1, '#1b2648']]); ctx.fillRect(-3000, -1500, 6000, 340);
  ctx.fillStyle = '#f3f5f8'; ctx.fillRect(-3000, -1250, 6000, 40); ctx.fillStyle = '#1e5bd8'; ctx.fillRect(-3000, -1210, 6000, 36); ctx.fillStyle = '#d32020'; ctx.fillRect(-3000, -1174, 6000, 14);
  ctx.fillStyle = '#d8dde6'; ctx.fillRect(-3000, -1160, 6000, 26);
  for (const lx of [-1500, -700, 100, 900, 1700]) {
    const fl = lx === -700 ? 0.85 + 0.15 * (Math.sin(TT * 37) > 0.7 ? 0 : 1) : 1;
    glow('rgba(235,245,255,1)', 50, () => fillRR(lx - 150, -1136, 300, 24, 6, `rgba(245,250,255,${fl})`));
    lightCone(lx, -1112, 300, 1100, 1300, '#cfe1ff', 0.10 * fl);
    bloom(lx, -1124, 260, '#dfeaff', 0.4 * fl);
  }
  // moths around the nearest lamp
  const img = dotSprite('#fff2cf', 20);
  for (let i = 0; i < 9; i++) { const R = RNG('moth', i), a = TT * R.r(2, 4) + R.f() * TAU; sprite(img, 100 + Math.cos(a) * R.r(40, 160), -1060 + Math.sin(a * 1.3) * R.r(20, 70), 9, 0.9); }
  // the air machine
  airMachine(-560, GY - 40, o);
}
function pumpBG(x, gy) {
  ctx.save(); ctx.translate(x, gy);
  fillRR(-160, -620, 320, 640, 18, lin(0, -620, 0, 0, [[0, '#2c3446'], [1, '#141925']]));
  fillRR(-120, -560, 240, 150, 10, '#0a0f1c'); lcd('3.49', 0, -485, 70, '#7fd0ff', { glow: true });
  fillRR(-150, -380, 60, 120, 8, '#0f1524'); ctx.fillStyle = '#1e5bd8'; ctx.fillRect(-160, -640, 320, 30);
  ctx.restore();
}
function airMachine(x, gy, o = {}) {
  ctx.save(); ctx.translate(x, gy);
  // cabinet
  fillRR(-120, -560, 240, 560, 22, lin(-120, 0, 120, 0, [[0, '#a3141b'], [0.35, '#e0262c'], [0.7, '#c31b22'], [1, '#7b0c12']]));
  fillRR(-120, -560, 240, 560, 22, lin(0, -560, 0, 0, [[0, 'rgba(255,255,255,0.12)'], [0.3, 'rgba(255,255,255,0)'], [1, 'rgba(0,0,0,0.3)']]));
  // sign
  fillRR(-110, -640, 220, 76, 14, '#0f2e7a'); tText('AIR', 0, -600, 52, { weight: 900, color: '#ffffff', glowC: '#7fb2ff', glowB: 16, shadow: false });
  bloom(0, -600, 160, '#5f8fff', 0.35);
  // display panel
  fillRR(-92, -510, 184, 130, 14, '#05070d');
  lcd(String(Math.round(o.psi ?? 32)), 6, -450, 74, o.psiC ?? '#46ff8a', { ghost: 'rgba(70,255,138,0.06)' });
  tText('PSI', 64, -398, 20, { weight: 800, color: 'rgba(255,255,255,0.7)', shadow: false });
  // buttons, coin slot, hose hook
  circle(-50, -330, 20, '#ffd23a'); circle(10, -330, 20, '#3ee07f'); circle(70, -330, 20, '#ff3b3b');
  fillRR(-60, -260, 120, 18, 9, '#2a0508'); fillRR(-100, -200, 200, 120, 12, 'rgba(0,0,0,0.22)');
  for (let i = 0; i < 5; i++) ctx.fillRect(-90, -190 + i * 22, 180, 4);
  ctx.restore();
  // the hose: from the cabinet to the valve (or hanging), drawn in world space
  const hx = x + 110, hy = gy - 300;
  if (o.hose !== false) {
    const tx = o.hoseTo ? o.hoseTo[0] : x + 160, ty = o.hoseTo ? o.hoseTo[1] : gy - 120;
    ctx.save(); ctx.lineCap = 'round';
    ctx.strokeStyle = '#0d0e12'; ctx.lineWidth = 18;
    ctx.beginPath(); ctx.moveTo(hx, hy); ctx.bezierCurveTo(hx + 160, hy + 380, tx - 200, ty + 260, tx, ty); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 4; ctx.stroke();
    if (o.flow) {   // air flowing: green dots running along the hose, like the reference
      const img = dotSprite('#46ff8a', 32);
      for (let i = 0; i < 9; i++) { const u = mod(i / 9 + TT * 0.9, 1), q = 1 - u;
        const bx = q ** 3 * hx + 3 * q * q * u * (hx + 160) + 3 * q * u * u * (tx - 200) + u ** 3 * tx, by = q ** 3 * hy + 3 * q * q * u * (hy + 380) + 3 * q * u * u * (ty + 260) + u ** 3 * ty;
        sprite(img, bx, by, 30, o.flow); }
    }
    // the chuck at the end
    ctx.translate(tx, ty); ctx.rotate(o.chuckA ?? -0.6); fillRR(-14, -46, 28, 60, 8, lin(-14, 0, 14, 0, [[0, '#d9dde3'], [1, '#6e747c']])); fillRR(-10, -62, 20, 20, 4, '#30333a');
    ctx.restore();
  }
}

// ---------------------------------------------------------------- 2. home driveway — morning (frost) or night (time-lapse)
function setHome(o = {}) {
  const n = clamp(o.night ?? 0);           // 0 morning, 1 deep night
  const sky = [[0, mixC('#4e77b4', '#04060f', n)], [0.55, mixC('#9bbbe0', '#0b1230', n)], [0.85, mixC('#f3c9a1', '#18224a', n)], [1, mixC('#ffd9a8', '#1c2852', n)]];
  skyFill(sky, -2600, -200);
  if (n > 0.05) stars(160, 'hstar', -2600, -700, n, o.starRot ?? 0);
  // the moon (night) on an arc, the low sun (morning)
  if (n > 0.05) { const ma = o.moonA ?? 0.5, mx = lerp(-1800, 1800, ma), my = -1250 - Math.sin(ma * Math.PI) * 380; withAlpha(n, () => { bloom(mx, my, 360, '#bcd3ff', 0.55); circle(mx, my, 70, '#eef3ff'); circle(mx - 18, my - 10, 14, 'rgba(160,175,205,0.5)'); circle(mx + 20, my + 18, 10, 'rgba(160,175,205,0.45)'); }); }
  if (n < 0.95) withAlpha(1 - n, () => { bloom(1350, -560, 900, '#ffcf8a', 0.55); circle(1350, -560, 90, '#fff4d8'); });
  // far trees
  ctx.fillStyle = mixC('#5d6f8f', '#070b16', n);
  for (let i = 0; i < 40; i++) { const R = RNG('tree', i), x = -3000 + i * 160 + R.n(40), h = R.r(260, 520); ell(x, -260 - h * 0.45, R.r(80, 130), h * 0.55, ctx.fillStyle); }
  // the house
  const wall = mixC('#d9dfe8', '#1b2133', n), wallLo = mixC('#a9b2c2', '#121726', n);
  ctx.fillStyle = lin(0, -1500, 0, GY, [[0, wall], [1, wallLo]]); ctx.fillRect(-1700, -1350, 3000, 1350 + GY);
  ctx.strokeStyle = rgba('#000000', 0.07 + 0.08 * n); ctx.lineWidth = 3; for (let y = -1330; y < GY; y += 42) { ctx.beginPath(); ctx.moveTo(-1700, y); ctx.lineTo(1300, y); ctx.stroke(); }
  // roof
  poly([[-1820, -1340], [1420, -1340], [1150, -1720], [-1550, -1720]], mixC('#3d4658', '#0b0e17', n));
  ctx.fillStyle = mixC('#2b3242', '#07090f', n); ctx.fillRect(-1830, -1350, 3260, 34);
  // garage door behind the car
  fillRR(-260, -840, 1240, 840 + GY - 4, 6, lin(0, -840, 0, GY, [[0, mixC('#eef1f5', '#232a3d', n)], [1, mixC('#c3cad6', '#151a28', n)]]));
  ctx.strokeStyle = rgba('#000000', 0.12); ctx.lineWidth = 4; for (let y = -840 + 170; y < GY; y += 170) { ctx.beginPath(); ctx.moveTo(-260, y); ctx.lineTo(980, y); ctx.stroke(); }
  for (let i = 0; i < 5; i++) fillRR(-220 + i * 240, -800, 200, 90, 6, mixC('#9fb6d1', '#0d1322', n));
  // windows (lights go out one by one at night)
  const winOn = o.winOn ?? (n > 0.3 ? 1 : 0);
  for (const [wx, wy, k] of [[-1350, -1100, 0.15], [-900, -1100, 0.45], [1100, -1100, 0.8], [-1350, -560, 0.3]]) {
    const lit = n > 0.3 && winOn > k ? 1 : 0;
    fillRR(wx - 140, wy - 160, 280, 300, 8, mixC('#f6f8fb', '#0a0d16', n));
    fillRR(wx - 120, wy - 140, 240, 260, 4, lit ? lin(0, wy - 140, 0, wy + 120, [[0, '#ffd889'], [1, '#ff9f4a']]) : lin(0, wy - 140, 0, wy + 120, [[0, mixC('#9cc2ec', '#141c33', n)], [1, mixC('#cfe2f6', '#0b1020', n)]]));
    if (lit) bloom(wx, wy, 300, '#ffb35a', 0.45);
    ctx.fillStyle = mixC('#f6f8fb', '#0a0d16', n); ctx.fillRect(wx - 4, wy - 140, 8, 260); ctx.fillRect(wx - 120, wy - 14, 240, 8);
  }
  // porch lamp
  fillRR(-1620, -620, 40, 70, 8, '#20232b'); if (n > 0.3) { bloom(-1600, -580, 260, '#ffc46b', 0.6 * n); circle(-1600, -580, 14, '#ffe3a8'); }
  // lawn + hedge + mailbox
  const lawn = mixC('#9db7a1', '#0d1712', n);
  ctx.fillStyle = lin(0, -40, 0, 400, [[0, lawn], [1, mixC('#6f8a75', '#060a08', n)]]); ctx.fillRect(-4000, -10, 3700, 3000); ctx.fillRect(1100, -10, 3000, 3000);
  for (let i = 0; i < 18; i++) { const R = RNG('hedge', i); ell(-2600 + i * 120, -40, 110, 90 + R.r(0, 30), mixC('#5f7d66', '#08110c', n)); }
  ctx.fillStyle = '#20242c'; ctx.fillRect(-1240, -280, 16, 300); fillRR(-1300, -360, 130, 90, 30, mixC('#3a6fb8', '#0d1730', n));
  // the driveway
  ctx.fillStyle = lin(0, GY, 0, 2400, [[0, mixC('#c7ccd4', '#1a1f2c', n)], [1, mixC('#8d939d', '#0a0c12', n)]]);
  poly([[-300, -20], [1050, -20], [2400, 3000], [-1700, 3000]]); ctx.fill();
  ctx.strokeStyle = rgba('#000000', 0.15); ctx.lineWidth = 4; for (const y of [400, 900, 1500]) { ctx.beginPath(); ctx.moveTo(-1000, y); ctx.lineTo(2000, y); ctx.stroke(); }
  // frost: sparkles on the lawn and drive (stronger as the night gets colder)
  const fr = o.frost ?? 0;
  if (fr > 0) { const img = dotSprite('#e8f6ff', 20); ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 160; i++) { const R = RNG('frost', i); sprite(img, R.r(-2200, 2400), R.r(-10, 900), R.r(5, 12), fr * (0.2 + 0.8 * Math.max(0, Math.sin(TT * R.r(2, 5) + i)))); } ctx.restore();
    ctx.fillStyle = rgba('#e9f4ff', 0.18 * fr); ctx.fillRect(-4000, -10, 8000, 3000); }
  // low morning mist
  if (n < 0.6) withAlpha((1 - n) * 0.55, () => { ctx.fillStyle = lin(0, -300, 0, 300, [[0, 'rgba(255,240,225,0)'], [0.5, 'rgba(255,240,225,0.45)'], [1, 'rgba(255,240,225,0)']]); ctx.fillRect(-4000, -300, 8000, 600); });
}

// ---------------------------------------------------------------- 3. the workshop (the water test)
function setWorkshop(o = {}) {
  // block wall
  ctx.fillStyle = lin(0, -2200, 0, 300, [[0, '#262c38'], [1, '#3c4454']]); ctx.fillRect(-3000, -2200, 6000, 2500);
  ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 4;
  for (let y = -2200, r = 0; y < 300; y += 90, r++) { ctx.beginPath(); ctx.moveTo(-3000, y); ctx.lineTo(3000, y); ctx.stroke(); for (let x = -3000 + (r % 2) * 110; x < 3000; x += 220) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 90); ctx.stroke(); } }
  // pegboard with tools
  fillRR(-1500, -1500, 1100, 700, 10, '#8a6a46'); ctx.fillStyle = 'rgba(0,0,0,0.35)';
  for (let y = -1470; y < -820; y += 40) for (let x = -1470; x < -420; x += 40) { ctx.beginPath(); ctx.arc(x, y, 5, 0, TAU); ctx.fill(); }
  const tools = [[-1350, -1380, 30, 380, '#b8bec8'], [-1230, -1380, 50, 300, '#d63b2f'], [-1080, -1380, 26, 340, '#c9ced6'], [-940, -1380, 70, 200, '#2f6fd8'], [-780, -1380, 34, 360, '#e0b23a'], [-640, -1380, 40, 280, '#c9ced6']];
  for (const [x, y, w, h, c] of tools) { fillRR(x, y, w, h, w / 2, c); fillRR(x - w * 0.4, y + h - 40, w * 1.8, 60, 14, '#1c1f26'); }
  // shelf with cans
  ctx.fillStyle = '#2d2219'; ctx.fillRect(400, -1300, 1100, 26); ctx.fillRect(400, -900, 1100, 26);
  for (let i = 0; i < 7; i++) { const R = RNG('can', i); fillRR(440 + i * 150, -1300 - R.r(120, 200), 110, R.r(120, 200), 14, R.pick(['#c8352b', '#2f6fd8', '#e0b23a', '#3b8f5a', '#d9dde3'])); fillRR(440 + i * 150, -1220, 110, 30, 0, 'rgba(255,255,255,0.35)'); }
  // tyre stack
  for (let i = 0; i < 4; i++) { fillRR(1500, -120 - i * 150, 520, 150, 60, '#15161a'); fillRR(1530, -100 - i * 150, 460, 20, 10, 'rgba(255,255,255,0.05)'); }
  // fluorescent tubes
  for (const lx of [-900, 700]) { glow('#e8fbff', 40, () => fillRR(lx - 340, -2050, 680, 26, 13, '#f4fdff')); lightCone(lx, -2030, 680, 1800, 2200, '#d9f4ff', 0.07); }
  // floor
  groundFill([[0, '#4a505c'], [0.3, '#30353f'], [1, '#14171c']], 260, 3200);
  ctx.save(); ctx.globalAlpha = 0.25; tileFill(asphaltTile('wfloor', '#3a3f49'), -3000, 260, 3000, 3200); ctx.restore();
  ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(-3000, 260, 6000, 6);
}
// a steel tub of water; the wheel is drawn between back() and front()
function tubBack(x, y, w, h) { fillRR(x - w / 2, y, w, h, 30, lin(0, y, 0, y + h, [[0, '#59616e'], [1, '#2b3039']])); }
function tubFront(x, y, w, h, wl, o = {}) {
  // water body (translucent) with caustics, the front wall of the tub
  ctx.save(); rrPath(x - w / 2, y, w, h, 30); ctx.clip();
  ctx.fillStyle = lin(0, wl, 0, y + h, [[0, 'rgba(90,170,240,0.55)'], [1, 'rgba(20,70,150,0.8)']]); ctx.fillRect(x - w / 2, wl, w, y + h - wl);
  ctx.strokeStyle = 'rgba(190,235,255,0.25)'; ctx.lineWidth = 4;
  for (let i = 0; i < 9; i++) { const R = RNG('caus', i); ctx.beginPath(); for (let k = 0; k <= 12; k++) { const xx = x - w / 2 + k * w / 12, yy = wl + 60 + i * (h - 60) / 9 + Math.sin(k * 1.3 + TT * 2 + R.f() * 6) * 18; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
  // surface line
  ctx.strokeStyle = 'rgba(220,245,255,0.85)'; ctx.lineWidth = 6; ctx.beginPath(); for (let k = 0; k <= 40; k++) { const xx = x - w / 2 + k * w / 40, yy = wl + Math.sin(k * 0.7 + TT * 4) * (4 + (o.slosh ?? 0) * 26 * Math.sin(k * 0.3)); k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  ctx.restore();
  ctx.lineWidth = 16; ctx.strokeStyle = lin(x - w / 2, 0, x + w / 2, 0, [[0, '#8e96a3'], [0.5, '#d9dee6'], [1, '#7a828f']]); rrPath(x - w / 2, y, w, h, 30); ctx.stroke();
  fillRR(x - w / 2 - 20, y - 12, w + 40, 26, 12, lin(0, y - 12, 0, y + 14, [[0, '#eef1f5'], [1, '#8d95a1']]));
}

// ---------------------------------------------------------------- 4. the x-ray / blueprint lab
function setXray(o = {}) {
  ctx.fillStyle = rad(0, 0, 100, 2600, [[0, '#13254f'], [0.5, '#0a1534'], [1, '#040816']]); ctx.fillRect(-4000, -4000, 8000, 8000);
  ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(90,160,255,0.08)';
  for (let x = -3000; x <= 3000; x += 50) { ctx.beginPath(); ctx.moveTo(x, -3000); ctx.lineTo(x, 3000); ctx.stroke(); }
  for (let y = -3000; y <= 3000; y += 50) { ctx.beginPath(); ctx.moveTo(-3000, y); ctx.lineTo(3000, y); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(90,160,255,0.18)'; ctx.lineWidth = 3;
  for (let x = -3000; x <= 3000; x += 250) { ctx.beginPath(); ctx.moveTo(x, -3000); ctx.lineTo(x, 3000); ctx.stroke(); }
  for (let y = -3000; y <= 3000; y += 250) { ctx.beginPath(); ctx.moveTo(-3000, y); ctx.lineTo(3000, y); ctx.stroke(); }
  // rings + ticks around the subject
  const R0 = o.R ?? 260;
  ctx.strokeStyle = 'rgba(120,190,255,0.35)'; ctx.lineWidth = 3; ctx.setLineDash([14, 12]); ctx.lineDashOffset = TT * 30;
  ctx.beginPath(); ctx.arc(0, 0, R0 * 1.25, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
  for (let i = 0; i < 72; i++) { const a = i / 72 * TAU + TT * 0.1, l = i % 6 ? 12 : 30; ctx.beginPath(); ctx.moveTo(Math.cos(a) * R0 * 1.36, Math.sin(a) * R0 * 1.36); ctx.lineTo(Math.cos(a) * (R0 * 1.36 + l), Math.sin(a) * (R0 * 1.36 + l)); ctx.stroke(); }
  // dimension line
  ctx.strokeStyle = 'rgba(120,190,255,0.5)'; ctx.beginPath(); ctx.moveTo(-R0, R0 * 1.55); ctx.lineTo(R0, R0 * 1.55); ctx.stroke();
  for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(s * R0, R0 * 1.45); ctx.lineTo(s * R0, R0 * 1.65); ctx.stroke(); }
  tText('Ø 632 mm', 0, R0 * 1.55 - 26, 30, { weight: 700, color: 'rgba(160,210,255,0.8)', shadow: false });
}
function scanBeam(R, u) {   // a horizontal scan sweeping down over a wheel
  if (u <= 0 || u >= 1) return;
  const y = lerp(-R * 1.3, R * 1.3, u);
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = lin(0, y - 120, 0, y + 6, [[0, 'rgba(80,180,255,0)'], [1, 'rgba(80,180,255,0.35)']]); ctx.fillRect(-R * 1.6, y - 120, R * 3.2, 126);
  glow('#7fd0ff', 30, () => { ctx.fillStyle = '#bfe8ff'; ctx.fillRect(-R * 1.6, y - 3, R * 3.2, 6); });
  ctx.restore();
}

// ---------------------------------------------------------------- 5. the road at sunset (the car drives left; scenery scrolls right)
function setRoad(o = {}) {
  const tr = o.travel ?? 0;
  skyFill([[0, '#1b1640'], [0.35, '#4a2a6a'], [0.62, '#b14a6a'], [0.82, '#f07a4a'], [1, '#ffc06a']], -2600, -260);
  bloom(-300, -420, 1300, '#ffb46a', 0.6); circle(-300, -420, 150, '#ffe2a8'); bloom(-300, -420, 380, '#fff0c8', 0.6);
  // clouds
  const cl = layer('clouds', 3600, 700, (w, h) => { const R = RNG('cl'); for (let i = 0; i < 26; i++) { const x = R.r(0, w), y = R.r(80, h - 80), rx = R.r(160, 420), ry = R.r(18, 40); ctx.fillStyle = `rgba(${R.i(120, 190)},${R.i(60, 90)},${R.i(120, 150)},${R.r(0.35, 0.7)})`; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(255,190,140,0.35)'; ctx.beginPath(); ctx.ellipse(x, y + ry * 0.6, rx * 0.8, ry * 0.35, 0, 0, TAU); ctx.fill(); } });
  ctx.drawImage(cl, -1800 + mod(tr * 0.02, 400) - 200, -1900, 3600, 700);
  // mountains (two layers, parallax)
  const mtn = (key, col, amp, base, par) => { const img = layer(key, 4200, 900, (w, h) => { const R = RNG(key); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, h); for (let x = 0; x <= w; x += 30) { const y = h - base - Math.abs(Math.sin(x * 0.0021 + R.f() * 0.01)) * amp - Math.sin(x * 0.007) * amp * 0.2 - Math.sin(x * 0.0005 + 1) * amp * 0.4; ctx.lineTo(x, y); } ctx.lineTo(w, h); ctx.closePath(); ctx.fill(); }); const off = mod(tr * par, 2100); ctx.drawImage(img, -2900 + off, -1150, 4200, 900); ctx.drawImage(img, -2900 + off - 4200, -1150, 4200, 900); };
  mtn('mtnFar', '#6d3d72', 380, 120, 0.04); mtn('mtnMid', '#3e2452', 260, 30, 0.1);
  const sky2 = skyline('rsky', 3600, 420, '#2a1838', ['#ffc58a', '#ffe1b0'], true);
  ctx.drawImage(sky2, -1800 + mod(tr * 0.16, 1800) - 900, -680, 3600, 420);
  // fields
  ctx.fillStyle = lin(0, -260, 0, 40, [[0, '#2b1a35'], [1, '#170f20']]); ctx.fillRect(-4000, -262, 8000, 320);
  // power poles passing
  for (let i = -4; i <= 4; i++) { const x = mod(i * 900 + tr * 0.45, 7200) - 3600; ctx.fillStyle = '#120a18'; ctx.fillRect(x - 10, -900, 20, 860); ctx.fillRect(x - 90, -860, 180, 14); }
  ctx.strokeStyle = 'rgba(18,10,24,0.8)'; ctx.lineWidth = 3; for (let k = 0; k < 2; k++) { ctx.beginPath(); for (let i = -5; i <= 5; i++) { const x = mod(i * 900 + tr * 0.45, 7200) - 3600; } ctx.moveTo(-3600, -850 + k * 10); ctx.quadraticCurveTo(0, -760 + k * 10, 3600, -850 + k * 10); ctx.stroke(); }
  // guard rail (fast)
  const gr = mod(tr, 300);
  ctx.fillStyle = '#4a4252'; ctx.fillRect(-4000, -120, 8000, 26); ctx.fillStyle = 'rgba(255,200,150,0.35)'; ctx.fillRect(-4000, -120, 8000, 6);
  for (let x = -4000 + gr; x < 4000; x += 300) { ctx.fillStyle = '#2a2330'; ctx.fillRect(x, -100, 14, 110); }
  // the road
  groundFill([[0, '#3a3140'], [0.12, '#26222c'], [1, '#0c0a10']], 10, 3200);
  ctx.save(); ctx.globalAlpha = 0.6; tileFill(asphaltTile(), -4000, 10, 4000, 3200, mod(tr, 1024), 0); ctx.restore();
  // sun reflection on the road
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = lin(0, GY, 0, GY + 900, [[0, 'rgba(255,170,100,0.22)'], [1, 'rgba(255,170,100,0)']]); ctx.fillRect(-700, GY, 800, 900); ctx.restore();
  // lane dashes
  ctx.fillStyle = 'rgba(245,240,230,0.9)'; const ld = mod(tr, 700); for (let x = -4000 + ld; x < 4000; x += 700) fillRR(x, GY + 290, 380, 22, 6, 'rgba(245,240,230,0.85)');
  // motion streaks near the ground
  if (o.speed) { ctx.save(); ctx.globalAlpha = 0.25 * o.speed; ctx.strokeStyle = '#ffd9b0'; ctx.lineWidth = 3; for (let i = 0; i < 14; i++) { const R = RNG('streak', i), x = mod(R.r(-3000, 3000) + tr * 1.4, 6000) - 3000, y = GY + R.r(20, 600); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + R.r(200, 500), y); ctx.stroke(); } ctx.restore(); }
}
function mileMarker(x, y, label = '1 MI') {
  ctx.fillStyle = '#d9dde3'; ctx.fillRect(x - 8, y - 380, 16, 380);
  fillRR(x - 95, y - 520, 190, 150, 14, '#1f7a3e'); rrPath(x - 85, y - 510, 170, 130, 10); ctx.lineWidth = 5; ctx.strokeStyle = '#fff'; ctx.stroke();
  tText(label, x, y - 445, 50, { weight: 900, color: '#fff', shadow: false });
}

// ---------------------------------------------------------------- 6. macro: the contact patch
function setMacro(o = {}) {
  const tr = o.travel ?? 0;
  skyFill([[0, '#2c1b45'], [0.6, '#a2486a'], [1, '#f28a50']], -3000, GY);
  bloom(-900, GY - 200, 1400, '#ffb46a', 0.55);
  ctx.save(); ctx.globalAlpha = 0.95; tileFill(asphaltTile('macro', '#2a252d'), -4000, GY, 4000, 3000, mod(tr, 1024), 0); ctx.restore();
  ctx.fillStyle = lin(0, GY, 0, GY + 1400, [[0, 'rgba(255,150,90,0.18)'], [0.2, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,0.6)']]); ctx.fillRect(-4000, GY, 8000, 1400);
  // grit flying off the tread
  dust(40, 'grit', -900, 900, GY - 300, GY + 40, '#ffd2a8', 0.5, 600, -40);
}

// ---------------------------------------------------------------- 7. the desk (the paper clip)
function setDesk(o = {}) {
  tileFill(woodTile(), -4000, -4000, 4000, 4000, 0, 0);
  // lamp pool + vignette of the room
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = rad(-80, -260, 50, 1300, [[0, 'rgba(255,214,150,0.45)'], [1, 'rgba(255,214,150,0)']]); ctx.fillRect(-2000, -2000, 4000, 4000); ctx.restore();
  ctx.fillStyle = rad(0, 0, 500, 2400, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,0.75)']]); ctx.fillRect(-4000, -4000, 8000, 8000);
  // soft background props (out of focus): a notebook, a pencil, a mug with steam
  ctx.save(); ctx.filter = 'blur(10px)';
  fillRR(520, -900, 520, 680, 20, '#e9e2d0'); ctx.fillStyle = 'rgba(0,0,0,0.15)'; for (let y = -840; y < -260; y += 46) ctx.fillRect(560, y, 440, 4);
  fillRR(-1100, -760, 600, 46, 23, '#e0b23a'); fillRR(-560, -760, 70, 46, 10, '#e8a0a0');
  circle(-760, 520, 200, '#2b2f3a'); circle(-760, 520, 165, '#4a2d1a');
  ctx.restore();
  heatWaves(-760, 360, 180, 500, 0.6, 'mug');
}
function paperclip(x, y, s, bend, hot, o = {}) {
  // a clip straightened at one end: the free leg bends by `bend` (rad) around a hinge
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const shape = () => { ctx.beginPath(); ctx.moveTo(120, -50); ctx.lineTo(-210, -50); ctx.arc(-210, 0, 50, -Math.PI / 2, Math.PI / 2, true); ctx.lineTo(160, 50); ctx.arc(160, 15, 35, Math.PI / 2, -Math.PI / 2, true); ctx.lineTo(-150, -20); ctx.arc(-150, 2, 22, -Math.PI / 2, Math.PI / 2, true); ctx.lineTo(60, 24); };
  // shadow
  ctx.save(); ctx.translate(10, 22); ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 20; ctx.filter = 'blur(6px)'; shape(); ctx.stroke(); ctx.restore();
  ctx.strokeStyle = lin(0, -60, 0, 60, [[0, '#f6f8fb'], [0.5, '#9aa1ab'], [1, '#e1e5ea']]); ctx.lineWidth = 16; shape(); ctx.stroke();
  // the free leg from the hinge at (120,-50)
  ctx.save(); ctx.translate(120, -50); ctx.rotate(-bend);
  ctx.strokeStyle = lin(0, -10, 0, 10, [[0, '#f6f8fb'], [1, '#8f96a0']]); ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(230, 0); ctx.stroke();
  ctx.restore();
  // the hot spot at the hinge
  if (hot > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow('#ff7a1a', 40 * hot, () => circle(120, -50, 14, rgba('#ffb04a', hot))); ctx.restore(); bloom(120, -50, 140, '#ff7a1a', 0.8 * hot); bloom(120, -50, 50, '#fff0c8', 0.7 * hot); }
  ctx.restore();
}

// ---------------------------------------------------------------- 8. inside the car at night / in the morning (the balloon)
function setInterior(o = {}) {
  const m = clamp(o.morning ?? 0), fr = clamp(o.frost ?? 0);
  // the windshield / side window view: outside sky
  skyFill([[0, mixC('#050814', '#7fa6d6', m)], [1, mixC('#14203f', '#f2d3b0', m)]], -2400, 0);
  if (m < 0.9) stars(80, 'istar', -2400, -900, 1 - m);
  // frost creeping in from the window edges
  if (fr > 0) { const img = dotSprite('#e8f6ff', 32); ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 260; i++) { const R = RNG('ifr', i), edge = R.f() < 0.5 ? R.r(-2000, -1500) : R.r(-700, -380), y = R.r(-2300, -300); const x = R.f() < 0.5 ? R.r(-1800, 1800) : R.r(-1800, 1800); const d = Math.min(Math.abs(y + 2300), Math.abs(y + 300)) / 900; if (d > fr) continue; sprite(img, x, y, R.r(10, 40), 0.5 * (1 - d / Math.max(0.01, fr))); } ctx.restore(); ctx.fillStyle = rgba('#dfefff', 0.25 * fr); ctx.fillRect(-4000, -2400, 8000, 2400); }
  // out-of-focus lights outside the window (street lamps, houses)
  { const R = RNG('bokeh'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 26; i++) { const x = R.r(-1900, 1900), y = R.r(-1500, -380), r = R.r(30, 110), c = R.pick(m > 0.5 ? ['#ffe2b8', '#ffffff', '#ffd08a'] : ['#ffb457', '#ffd08a', '#9fc0ff', '#ff6a4a']); ctx.globalAlpha = (m > 0.5 ? 0.18 : 0.32) * (0.6 + 0.4 * Math.sin(TT * 0.7 + i)); circle(x, y, r, c); } ctx.restore(); }
  // the window's rounded frame and a rear-view mirror
  ctx.save(); ctx.lineWidth = 120; ctx.strokeStyle = mixC('#07090e', '#30333b', m * 0.6); rrPath(-2100, -2500, 4200, 2260, 320); ctx.stroke(); ctx.restore();
  fillRR(-1250, -2330, 420, 120, 40, mixC('#0c0e14', '#2c2f36', m * 0.6)); fillRR(-1230, -2312, 380, 84, 30, mixC('#1a2238', '#9fb6d6', m)); ctx.fillStyle = '#05060a'; ctx.fillRect(-1050, -2420, 26, 100);
  // window frame + door panel
  ctx.fillStyle = mixC('#0a0c12', '#3a3c44', m * 0.6); ctx.fillRect(-4000, -320, 8000, 3400); ctx.fillRect(-4000, -2700, 8000, 300);
  ctx.fillStyle = mixC('#11141c', '#4c4f58', m * 0.6); ctx.fillRect(-4000, -320, 8000, 40);
  // dashboard (left) with a glowing small display
  fillRR(-2200, -420, 900, 260, 60, mixC('#0d0f15', '#2c2f36', m * 0.6)); fillRR(-1820, -380, 300, 110, 14, '#05070c');
  tText(o.tempLabel ?? '23°F', -1670, -325, 56, { weight: 800, color: '#7fd0ff', glowC: '#4fb4ff', glowB: 18, shadow: false });
  // the passenger seat
  ctx.save(); ctx.translate(0, 300);
  fillRR(-700, -1300, 900, 1100, 160, lin(-700, 0, 200, 0, [[0, mixC('#1a1d26', '#4b4f5c', m * 0.7)], [1, mixC('#262a35', '#5f6472', m * 0.7)]]));
  fillRR(-880, -260, 1400, 480, 120, lin(0, -260, 0, 220, [[0, mixC('#242834', '#5c6170', m * 0.7)], [1, mixC('#10131a', '#363a45', m * 0.7)]]));
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 4; ctx.setLineDash([16, 14]);
  rrPath(-640, -1240, 780, 980, 130); ctx.stroke(); rrPath(-820, -220, 1280, 400, 100); ctx.stroke(); ctx.setLineDash([]);
  fillRR(-500, -1560, 500, 260, 80, mixC('#1a1d26', '#4b4f5c', m * 0.7));   // headrest
  ctx.fillStyle = '#0b0d12'; poly([[150, -1300], [210, -1300], [-500, -260], [-560, -260]]); ctx.fill();   // seat belt
  ctx.restore();
  // moonlight / morning light shaft
  lightCone(600, -2300, 500, 1600, 2600, m > 0.5 ? '#ffd9a0' : '#9fc0ff', 0.10);
}
function balloon(x, y, r, wr, o = {}) {
  // wr: 0 round, 1 wrinkled and smaller. The knot stays tied.
  const k = 1 - 0.28 * wr;
  ctx.save(); ctx.translate(x, y + (o.bob ?? Math.sin(TT * 1.4) * 6));
  // string
  ctx.strokeStyle = 'rgba(240,240,240,0.8)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, r * k * 1.12); ctx.bezierCurveTo(30, r * 1.5, -30, r * 1.9, 10, r * 2.3); ctx.stroke();
  ell(0, r * 2.5, r * 0.8, r * 0.12, 'rgba(0,0,0,0.3)');
  // body
  ctx.beginPath();
  const n = 80;
  for (let i = 0; i <= n; i++) { const a = (i / n) * TAU, wob = wr * (Math.sin(a * 7 + 1) * 0.05 + Math.sin(a * 13 + 2) * 0.03 + Math.sin(a * 23) * 0.015); const rr = r * k * (1 + wob) * (1 + 0.12 * Math.max(0, Math.sin(a))); const xx = Math.cos(a) * rr * 0.86, yy = Math.sin(a) * rr; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
  ctx.closePath();
  ctx.fillStyle = rad(-r * 0.35, -r * 0.4, r * 0.05, r * 1.3, [[0, '#ff6a6a'], [0.45, '#e41d26'], [1, '#7a0610']]); ctx.fill();
  if (wr > 0.02) { ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#5a0208', 0.5 * wr); ctx.lineWidth = 5; for (let i = 0; i < 9; i++) { const R = RNG('wrk', i); ctx.beginPath(); const a0 = R.f() * TAU; ctx.moveTo(Math.cos(a0) * r * 0.2, Math.sin(a0) * r * 0.2); ctx.quadraticCurveTo(Math.cos(a0 + 0.4) * r * 0.6, Math.sin(a0 + 0.4) * r * 0.6, Math.cos(a0) * r, Math.sin(a0) * r); ctx.stroke(); }
    const img = dotSprite('#ffffff', 16); for (let i = 0; i < 70; i++) { const R = RNG('bfr', i); sprite(img, R.r(-r, r), R.r(-r, r), R.r(4, 9), 0.5 * wr); } ctx.restore(); }
  // highlight
  ell(-r * 0.32 * k, -r * 0.45 * k, r * 0.18 * k, r * 0.28 * k, 'rgba(255,255,255,0.75)', -0.5);
  circle(-r * 0.1 * k, -r * 0.62 * k, r * 0.05, 'rgba(255,255,255,0.8)');
  // knot
  poly([[-r * 0.08, r * k * 1.1], [r * 0.08, r * k * 1.1], [0, r * k * 1.02]], '#b50f18');
  circle(0, r * k * 1.13, r * 0.055, '#9a0b14');
  ctx.restore();
}

// ---------------------------------------------------------------- 9. a snowy parking lot at night
function setSnowLot(o = {}) {
  skyFill([[0, '#03050c'], [0.7, '#0f1830'], [1, '#1c2a4a']], -2600, -100);
  const sk = skyline('snowsky', 3600, 460, '#0a0f1e', ['#ffcf88', '#ffe4b8'], true); ctx.drawImage(sk, -1800, -560, 3600, 460);
  groundFill([[0, '#c9d6e8'], [0.2, '#8fa1bb'], [1, '#2a3449']], -100, 3200);
  for (let i = 0; i < 8; i++) { const R = RNG('drift', i); ell(R.r(-2500, 2500), GY + R.r(-40, 600), R.r(200, 500), R.r(30, 70), 'rgba(240,246,255,0.45)'); }
  // the street lamp
  ctx.fillStyle = '#1a1e28'; ctx.fillRect(1150, -1400, 26, 1520); ctx.fillRect(950, -1400, 226, 22);
  fillRR(900, -1400, 120, 40, 16, '#2a2f3a'); glow('#ffbb55', 50, () => fillRR(915, -1366, 90, 14, 7, '#ffd08a'));
  lightCone(960, -1350, 120, 1500, 1600, '#ffb457', 0.16); bloom(960, -1360, 320, '#ffb457', 0.6);
  // a digital temperature sign
  fillRR(-1500, -900, 360, 170, 16, '#06080e'); ctx.fillStyle = '#20242e'; ctx.fillRect(-1335, -730, 30, 860);
  lcd(o.temp ?? '23', -1360, -815, 92, '#ff9a3a', { ghost: 'rgba(255,154,58,0.06)' }); tText('°F', -1210, -840, 48, { weight: 800, color: '#ff9a3a', shadow: false, glowC: '#ff7a1a', glowB: 12 });
}
function snowfall(n, key, x0, x1, y0, y1, k = 1) {
  const img = dotSprite('#ffffff', 24);
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) { const R = RNG(key, i), Wd = x1 - x0, Hd = y1 - y0, sp = R.r(60, 160); const y = y0 + mod(R.f() * Hd + TT * sp, Hd), x = x0 + mod(R.f() * Wd + Math.sin(TT * 0.8 + i) * 30 - TT * 20, Wd); sprite(img, x, y, R.r(6, 20), k * R.r(0.4, 0.9)); }
  ctx.restore();
}

// ---------------------------------------------------------------- 10. the dark stage (tension)
function setVoid(o = {}) {
  ctx.fillStyle = rad(0, 0, 50, 2200, [[0, o.c0 ?? '#1a2140'], [0.5, '#090c18'], [1, '#020306']]); ctx.fillRect(-4000, -4000, 8000, 8000);
  ctx.fillStyle = lin(0, GY, 0, GY + 500, [[0, 'rgba(120,150,220,0.12)'], [1, 'rgba(0,0,0,0)']]); ctx.fillRect(-3000, GY, 6000, 500);
  dust(50, 'vd', -1400, 1400, -1600, 900, '#9fb8ff', 0.35, 6, -10);
  // a top light
  lightCone(0, -1600, 200, 900, 1900, '#b9c8ff', 0.12);
}
