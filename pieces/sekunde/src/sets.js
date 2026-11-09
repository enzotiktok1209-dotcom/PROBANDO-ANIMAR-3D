// =====================================================================
//  sets.js — the places, drawn in world space (1080 x 1920, floor at y ≈ 1560).
//  Each set takes { blur } for a depth-of-field look in close-ups, and keeps 3+ things alive.
// =====================================================================
// depth of field: draw the layer once into a scratch canvas, then blur it in a single pass (per-shape blur is far too slow at 1440p)
const BLURCV = {};
function withBlur(px, fn) {
  if (!px) return fn();
  const key = ctx.canvas.width + 'x' + ctx.canvas.height;
  if (!BLURCV[key]) { BLURCV[key] = document.createElement('canvas'); BLURCV[key].width = ctx.canvas.width; BLURCV[key].height = ctx.canvas.height; }
  const sc = BLURCV[key], g = sc.getContext('2d'), T = ctx.getTransform(), prev = ctx;
  g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, sc.width, sc.height); g.filter = 'none'; g.globalAlpha = 1; g.setTransform(T);
  ctx = g; try { fn(); } finally { ctx = prev; }
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = `blur(${Math.round(px * SC)}px)`; ctx.drawImage(sc, 0, 0); ctx.restore();
}
const FLOOR = 1560;

function setStudio(o = {}) {
  withBlur(o.blur, () => {
    rays('#3a1696', '#4d22bd', { cy: 760, n: 22, spin: 0.03 });
    // back wall arcs and the marquee bulbs
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(540, 1250, 620 + i * 120, Math.PI, TAU); ctx.lineWidth = 18; ctx.strokeStyle = `rgba(160,110,255,${0.25 - i * 0.06})`; ctx.stroke(); }
    for (let i = 0; i < 15; i++) { const a = Math.PI + (i / 14) * Math.PI, on = (Math.floor(TT * 6) + i) % 3 !== 0;
      const bx = 540 + Math.cos(a) * 640, by = 1250 + Math.sin(a) * 640; circ(bx, by, 14, on ? '#fff3b0' : '#7a64b8'); if (on) glow(bx, by, 46, '#ffd86b', 0.5); }
    ledScreen(-120, 520, 260, 360, '€', PAL.green); ledScreen(940, 520, 260, 360, '¢', PAL.orange);
    // floor
    ctx.fillStyle = lin(0, 1380, 0, 1920, [[0, '#2a1170'], [1, '#12073a']]); ctx.fillRect(-600, 1380, 2300, 900);
    ell(540, 1600, 760, 150, '#3b1a9c'); ell(540, 1600, 620, 110, '#4a24c0');
    // spotlight cones (additive)
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (const [x0, x1, c] of [[150, 300, 'rgba(160,120,255,0.16)'], [930, 780, 'rgba(160,120,255,0.16)'], [540, 540, 'rgba(255,240,200,0.10)']]) {
      ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(x0 - 30, -100); ctx.lineTo(x0 + 30, -100); ctx.lineTo(x1 + 260, 1650); ctx.lineTo(x1 - 260, 1650); ctx.fill(); }
    ctx.restore();
    // dust motes in the light
    audience(1930, 11);
    const R = RNG('dust'); for (let i = 0; i < 26; i++) { const x = R.f() * 1080, y = (R.f() * 1900 - TT * (10 + R.f() * 20)) % 1900; circ(x, (y + 1900) % 1900, 2 + R.f() * 3, 'rgba(255,255,255,0.25)'); }
  });
}
function studioPodiums(o = {}) {
  podium(300, FLOOR + 20, o.s ?? 0.82, PAL.green, o.pressL ?? 0, o.litL ?? 0);
  podium(780, FLOOR + 20, o.s ?? 0.82, PAL.orange, o.pressR ?? 0, o.litR ?? 0);
}

function citySky(x, y, w, h, night = true) {
  ctx.fillStyle = night ? lin(0, y, 0, y + h, [[0, '#1b1f5c'], [1, '#6a3d9a']]) : lin(0, y, 0, y + h, [[0, '#7cc6ff'], [1, '#d8f0ff']]); ctx.fillRect(x, y, w, h);
  const R = RNG('city', x);
  for (let i = 0; i < 9; i++) { const bw = 60 + R.f() * 70, bh = 120 + R.f() * h * 0.6, bx = x + (i / 9) * w + R.n(10);
    ctx.fillStyle = night ? '#141238' : '#9fb8d8'; ctx.fillRect(bx, y + h - bh, bw, bh);
    if (night) for (let j = 0; j < 12; j++) { if (R.f() < 0.45) continue; const on = (hash(i, j, Math.floor(TT / 2)) % 5) !== 0; ctx.fillStyle = on ? '#ffd86b' : '#2a2660'; ctx.fillRect(bx + 8 + (j % 3) * (bw / 3), y + h - bh + 12 + Math.floor(j / 3) * 26, 10, 14); } }
}
function setDaniRoom(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1560, [[0, '#f3dcb8'], [1, '#e5bf8c']]); ctx.fillRect(-600, -400, 2300, 2000);
    // LED strip glow at the ceiling
    ctx.fillStyle = lin(0, 0, 0, 260, [[0, 'rgba(160,80,255,0.55)'], [1, 'rgba(160,80,255,0)']]); ctx.fillRect(-600, 0, 2300, 260);
    windowFrame(-60, 340, 520, 640, () => citySky(-60, 340, 520, 640, true));
    // shelf with sneaker boxes
    fillRR(640, 520, 460, 24, 6, '#8a5a36'); fillRR(640, 800, 460, 24, 6, '#8a5a36');
    const cols = [PAL.red, PAL.blue, PAL.orange, PAL.green, PAL.pink, PAL.yellow];
    for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) { const c = cols[(i + r * 2) % 6]; fillRR(655 + i * 108, 440 + r * 280, 96, 80, 6, c); fillRR(655 + i * 108, 440 + r * 280, 96, 22, 6, shade(c, -0.2)); }
    // gold record frame
    fillRR(700, 1000, 220, 260, 10, '#3a2a1a'); fillRR(716, 1016, 188, 228, 6, '#1b1530'); circ(810, 1120, 70, PAL.gold); circ(810, 1120, 18, '#1b1530');
    for (let i = 0; i < 14; i++) line(-600 + i * 160, 0, -600 + i * 160, 1380, 4, 'rgba(120,70,30,0.10)');
    neonSign(540, 210, '$', '#ff4fa3'); tvWall(-40, 1040, 360, 210); floorLamp(1000, 1390, 0.9);
    for (let i = 0; i < 4; i++) { circ(140 + i * 260, 40, 26, '#fff7d6'); glow(140 + i * 260, 40, 120, '#fff1b0', 0.45); }
    // floor + rug
    ctx.fillStyle = '#9b5e34'; ctx.fillRect(-600, 1380, 2300, 900); fillRR(-600, 1366, 2300, 22, 4, '#6b3d20');
    for (let i = 0; i < 9; i++) line(-600, 1420 + i * 60, 1700, 1420 + i * 60, 3, 'rgba(60,30,10,0.25)');
    for (let i = 0; i < 14; i++) line(-600 + i * 180 + (i % 2) * 90, 1380, -700 + i * 180, 1920, 3, 'rgba(60,30,10,0.18)');
    rugPattern(540, 1650, 540, 120, '#7b2fd6', '#9a52ef');
  });
}
function setStreet(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1400, [[0, '#ff7eb3'], [0.55, '#ffb36b'], [1, '#ffd98a']]); ctx.fillRect(-600, -400, 2300, 1900);
    circ(760, 760, 180, '#fff1b8'); glow(760, 760, 420, '#ffdd88', 0.5);
    const R = RNG('st'); for (let i = 0; i < 12; i++) { const bw = 110 + R.f() * 90, bh = 300 + R.f() * 600, bx = -200 + i * 130; ctx.fillStyle = i % 2 ? '#7a3f8f' : '#8f4f9e'; ctx.fillRect(bx, 1300 - bh, bw, bh);
      for (let j = 0; j < 10; j++) { ctx.fillStyle = (hash(i, j) % 3) ? '#ffcf7a' : '#5e2f70'; ctx.fillRect(bx + 14 + (j % 2) * (bw / 2), 1300 - bh + 20 + Math.floor(j / 2) * 50, 22, 28); } }
    ctx.fillStyle = '#c9b8d8'; ctx.fillRect(-600, 1300, 2300, 120);
    ctx.fillStyle = '#3d3a4f'; ctx.fillRect(-600, 1420, 2300, 700);
    for (let i = 0; i < 8; i++) fillRR(-500 + i * 300 - (TT * 0) % 300, 1700, 160, 20, 10, '#f5e9a8');
  });
}
function setLeoRoom(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1560, [[0, '#cdebff'], [1, '#9fd0f2']]); ctx.fillRect(-600, -400, 2300, 2000);
    windowFrame(80, 300, 400, 480, () => { ctx.fillStyle = lin(0, 300, 0, 780, [[0, '#8fd3ff'], [1, '#e8f7ff']]); ctx.fillRect(80, 300, 400, 480);
      circ(380, 420, 60, '#fff3a6'); for (let i = 0; i < 3; i++) ell(((150 + i * 160 + TT * 18) % 520) + 40, 600 + i * 40, 60, 22, '#ffffff'); });
    curtains(80, 300, 400, 480, '#ffb84d'); wallClock(600, 260, 70);
    fillRR(700, 360, 220, 260, 10, '#ffffff'); fillRR(716, 376, 188, 228, 6, '#ffe9a6'); coin(810, 490, 60, { sx: 1 });
    bookshelf(720, 700, 300, 3, 0.9); frames(-40, 860, [[0, 0, 150, 110, '#9be3b3'], [180, 20, 110, 140, '#ffd0e0']]);
    fillRR(830, 1180, 180, 20, 8, '#7a4a2a'); fillRR(900, 1200, 40, 180, 8, '#7a4a2a'); piggyBank(920, 1110, 0.8);
    ctx.fillStyle = '#c99a6b'; ctx.fillRect(-600, 1380, 2300, 900);
    for (let i = 0; i < 9; i++) line(-600, 1420 + i * 60, 1700, 1420 + i * 60, 3, 'rgba(90,50,20,0.2)');
    rugPattern(540, 1640, 520, 110, '#ffcf5a', '#ffe08a'); sofa(540, 1400, 0.95, '#6d4bd8'); plant(1000, 1380, 0.9);
    fillRR(-20, 860, 24, 520, 8, '#3a3157'); poly([[-80, 860], [80, 860], [40, 760], [-40, 760]], '#ffcf5a'); glow(-8, 900, 220, '#ffe9a6', 0.35);
  });
}
function setLeoDesk(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1560, [[0, '#d6f5e3'], [1, '#a9dfc1']]); ctx.fillRect(-600, -400, 2300, 2000);
    fillRR(660, 320, 360, 230, 14, '#ffffff'); tText('SPAREN', 840, 410, 60, { color: PAL.green, shadow: false }); tText('= FREIHEIT', 840, 480, 40, { color: '#2a6b48', shadow: false });
    fillRR(60, 300, 380, 24, 6, '#7a4a2a'); for (let i = 0; i < 6; i++) fillRR(80 + i * 56, 170, 44, 130, 6, [PAL.blue, PAL.red, PAL.yellow, PAL.green, PAL.purple, PAL.orange][i]);
    pinboard(560, 620, 460, 330); wallClock(160, 520, 80);
    fillRR(-60, 640, 420, 560, 12, '#ffffff'); ctx.save(); rrPath(-50, 650, 400, 540, 8); ctx.clip(); ctx.fillStyle = lin(0, 650, 0, 1190, [[0, '#8fd3ff'], [1, '#e8f7ff']]); ctx.fillRect(-50, 650, 400, 540); for (let i = 0; i < 12; i++) fillRR(-50, 660 + i * 46, 400, 22, 4, 'rgba(255,255,255,0.75)'); ctx.restore();
    plant(-20, 1380, 1.0);
    ctx.fillStyle = '#b07a4a'; ctx.fillRect(-600, 1380, 2300, 900);
    for (let i = 0; i < 9; i++) line(-600, 1420 + i * 60, 1700, 1420 + i * 60, 3, 'rgba(90,50,20,0.2)');
  });
}
function desk(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 10, 480, 40, 0.35); fillRR(-460, -440, 920, 60, 14, '#8a5631'); fillRR(-430, -380, 40, 380, 10, '#6a3f22'); fillRR(390, -380, 40, 380, 10, '#6a3f22'); ctx.restore(); }
function setPink(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1560, [[0, '#ffd3e6'], [1, '#f6a9cb']]); ctx.fillRect(-600, -400, 2300, 2000);
    windowFrame(640, 300, 360, 440, () => { ctx.fillStyle = lin(0, 300, 0, 740, [[0, '#9ad8ff'], [1, '#e9f8ff']]); ctx.fillRect(640, 300, 360, 440); for (let i = 0; i < 2; i++) ell(((700 + i * 180 + TT * 20) % 420) + 620, 470 + i * 70, 50, 18, '#fff'); });
    stringLights(-40, 1120, 150, 60); curtains(640, 300, 360, 440, '#ff8fc0');
    fillRR(80, 380, 260, 300, 10, '#ffffff'); fillRR(96, 396, 228, 268, 6, '#9be3b3'); growthGraphStatic(116, 420, 188, 220);
    fillRR(120, 820, 300, 20, 8, '#b4588a'); for (let i = 0; i < 3; i++) { fillRR(150 + i * 90, 740, 50, 80, 10, [PAL.gold, '#c0c4d4', '#d98f3a'][i]); circ(175 + i * 90, 730, 26, [PAL.gold, '#c0c4d4', '#d98f3a'][i]); }
    frames(700, 840, [[0, 0, 140, 170, '#ffe9a6'], [170, 30, 140, 120, '#b9e6ff']]); wallClock(900, 1150, 60);
    ctx.fillStyle = '#a8724a'; ctx.fillRect(-600, 1380, 2300, 900);
    for (let i = 0; i < 9; i++) line(-600, 1420 + i * 60, 1700, 1420 + i * 60, 3, 'rgba(90,50,20,0.2)');
    rugPattern(540, 1650, 520, 110, '#ff6aa8', '#ff9cc6'); plant(60, 1380, 0.85); ell(990, 1450, 130, 90, '#7a3fd6'); ell(990, 1420, 110, 70, '#9a5ff0');
  });
}
function growthGraphStatic(x, y, w, h) { ctx.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30, v = (2 ** (u * 6) - 1) / 63; i ? ctx.lineTo(x + u * w, y + h - v * h) : ctx.moveTo(x + u * w, y + h - v * h); } ctx.lineWidth = 8; ctx.strokeStyle = PAL.greenD; ctx.stroke(); }
function setDark(c0 = '#1a1430', c1 = '#05030c', o = {}) {
  ctx.fillStyle = rad(o.x ?? 540, o.y ?? 900, 50, 1300, [[0, c0], [1, c1]]); ctx.fillRect(-600, -400, 2300, 2800);
  if (o.cone) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = lin(0, 0, 0, 1700, [[0, 'rgba(255,240,200,0.35)'], [1, 'rgba(255,240,200,0.05)']]);
    ctx.beginPath(); ctx.moveTo(500, -100); ctx.lineTo(580, -100); ctx.lineTo(880, 1500); ctx.lineTo(200, 1500); ctx.fill(); ctx.restore(); ell(540, 1500, 360, 70, 'rgba(255,240,200,0.18)'); }
}

// ---------------------------------------------------------------- set dressing (detail + background life)
function neonSign(x, y, txt, c) { const f = 0.75 + 0.25 * Math.sin(TT * 11 + x) * (Math.sin(TT * 0.7) > 0.9 ? 1 : 0.2); glow(x, y, 200, c, 0.5 * f); tText(txt, x, y, 90, { color: '#fff', stroke: c, strokeW: 14, shadow: false }); }
function tvWall(x, y, w, h) { fillRR(x - 10, y - 10, w + 20, h + 20, 14, '#14121c'); ctx.save(); rrPath(x, y, w, h, 6); ctx.clip();
  ctx.fillStyle = lin(x, y, x + w, y + h, [[0, '#2b0f55'], [1, '#0f3b6b']]); ctx.fillRect(x, y, w, h);
  for (let i = 0; i < 6; i++) { const bh = (0.3 + 0.6 * Math.abs(Math.sin(TT * 2 + i))) * h * 0.7; fillRR(x + 20 + i * (w - 40) / 6, y + h - 20 - bh, (w - 40) / 6 - 12, bh, 6, ['#ff4fa3', '#ffd23f', '#41f08a', '#52b8ff', '#ff8a1e', '#a77bff'][i]); }
  ctx.restore(); glow(x + w / 2, y + h / 2, w * 0.8, '#6a5cff', 0.18); fillRR(x + w / 2 - 60, y + h + 10, 120, 16, 6, '#14121c'); }
function floorLamp(x, y, s, c = '#ffe9a6') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line(0, 0, 0, -620, 14, '#2b2440'); ell(0, 0, 80, 18, '#2b2440'); poly([[-90, -600], [90, -600], [60, -720], [-60, -720]], '#ffcf5a'); ctx.restore(); glow(x, y - 640 * s, 300 * s, c, 0.35); }
function curtains(x, y, w, h, c) { for (const sd of [0, 1]) { const cx = x + sd * w; ctx.save(); ctx.translate(cx, y); for (let i = 0; i < 4; i++) fillRR((sd ? -1 : 1) * i * 22 - 20 - (sd ? 60 : 0), -20, 44, h + 40, 20, i % 2 ? c : shade(c, -0.12)); ctx.restore(); } fillRR(x - 80, y - 40, w + 160, 20, 10, '#5b3b28'); }
function bookshelf(x, y, w, rows, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fillRR(-12, -12, w + 24, rows * 150 + 24, 10, '#6a3f22');
  const R = RNG('books', x, y); for (let r = 0; r < rows; r++) { fillRR(0, r * 150, w, 140, 4, '#3a2214'); let bx = 8; while (bx < w - 30) { const bw = 18 + R.f() * 22, bh = 80 + R.f() * 50; fillRR(bx, r * 150 + 140 - bh, bw, bh, 4, R.pick(['#e8483c', '#2f6df6', '#ffd23f', '#41c06a', '#a77bff', '#ff8a1e', '#f2f2f2'])); bx += bw + 4; if (R.f() < 0.12) { bx += 30; } } }
  ctx.restore(); }
function wallClock(x, y, r) { circ(x, y + 6, r, 'rgba(0,0,0,0.15)'); clockFace(x, y, r, (TT / 3600) * 60 + 10.1 + TT / 60); }
function piggyBank(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ell(0, 0, 90, 70, '#ff8fc0'); circ(80, -10, 34, '#ff8fc0'); ell(104, -6, 16, 12, '#ff6aa8'); circ(64, -32, 7, '#1b1530');
  poly([[30, -60], [50, -100], [62, -56]], '#ff6aa8'); for (const lx of [-50, -10, 30, 60]) fillRR(lx - 12, 40, 24, 40, 8, '#ff6aa8'); fillRR(-20, -72, 40, 10, 5, '#b03a70'); ctx.restore(); }
function pinboard(x, y, w, h) { fillRR(x, y, w, h, 10, '#c98d58'); fillRR(x + 12, y + 12, w - 24, h - 24, 6, '#e0a46a'); const R = RNG('pins', x);
  for (let i = 0; i < 6; i++) { const nx = x + 30 + R.f() * (w - 150), ny = y + 30 + R.f() * (h - 140), c = R.pick(['#fff59a', '#ffffff', '#9ef0c0', '#ffc1dc']); ctx.save(); ctx.translate(nx + 50, ny + 50); ctx.rotate(R.n(0.15)); fillRR(-50, -50, 100, 100, 4, c); for (let j = 0; j < 3; j++) line(-34, -22 + j * 20, 30, -22 + j * 20, 4, 'rgba(0,0,0,0.18)'); circ(0, -44, 8, PAL.red); ctx.restore(); } }
function laptop(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fillRR(-170, -230, 340, 220, 14, '#2b2a3a'); fillRR(-156, -216, 312, 192, 8, '#0e1a2e');
  ctx.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20, v = (2 ** (u * 5) - 1) / 31; const px = -140 + u * 280, py = -40 - v * 160 + Math.sin(TT * 3 + i) * 2; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.lineWidth = 6; ctx.strokeStyle = '#41f08a'; ctx.stroke();
  poly([[-200, -10], [200, -10], [230, 10], [-230, 10]], '#4a4960'); ctx.restore(); }
function mug(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fillRR(-40, -80, 80, 80, 14, '#ffffff'); ctx.beginPath(); ctx.arc(46, -44, 22, -1.4, 1.4); ctx.lineWidth = 10; ctx.strokeStyle = '#ffffff'; ctx.stroke();
  for (let i = 0; i < 3; i++) { const k = (TT * 0.6 + i / 3) % 1; ctx.globalAlpha = 0.5 * (1 - k); ell(-14 + i * 14 + Math.sin(TT * 3 + i) * 8, -100 - k * 90, 10, 16, '#ffffff'); } ctx.globalAlpha = 1; ctx.restore(); }
function stringLights(x0, x1, y, sag) { ctx.beginPath(); ctx.moveTo(x0, y); ctx.quadraticCurveTo((x0 + x1) / 2, y + sag * 2, x1, y); ctx.lineWidth = 3; ctx.strokeStyle = '#4a3a3a'; ctx.stroke();
  for (let i = 1; i < 14; i++) { const u = i / 14, px = lerp(x0, x1, u), py = y + sag * 4 * u * (1 - u), on = (Math.floor(TT * 3) + i) % 4 !== 0, c = ['#ffd86b', '#ff8fc0', '#9fe8ff'][i % 3]; circ(px, py + 12, 10, on ? c : '#7a6a6a'); if (on) glow(px, py + 12, 40, c, 0.5); } }
function frames(x, y, list) { list.forEach(([dx, dy, w, h, c, fn]) => { fillRR(x + dx - 8, y + dy - 8, w + 16, h + 16, 6, '#3a2a1a'); fillRR(x + dx, y + dy, w, h, 4, c); fn && fn(x + dx, y + dy, w, h); }); }
function rugPattern(x, y, rx, ry, c1, c2) { ell(x, y, rx, ry, c1); ell(x, y, rx * 0.82, ry * 0.8, c2); for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU; circ(x + Math.cos(a) * rx * 0.91, y + Math.sin(a) * ry * 0.9, 8, c2); } ell(x, y, rx * 0.4, ry * 0.36, c1); }
function audience(y, n = 12, c = '#120a2e') { const R = RNG('aud'); for (let i = 0; i < n; i++) { const x = -60 + i * (1200 / n) + R.n(20), bob = Math.abs(Math.sin(TT * 5 + i)) * (TT > 8.7 && TT < 11 ? 30 : 6), hy = y - bob; circ(x, hy, 58 + R.f() * 10, c); fillRR(x - 80, hy + 40, 160, 220, 60, c); if (TT > 8.7 && TT < 11 && i % 3 === 0) { line(x - 40, hy + 60, x - 90, hy - 80 - bob, 30, c); } } }
function ledScreen(x, y, w, h, txt, c) { fillRR(x - 8, y - 8, w + 16, h + 16, 10, '#0c0820'); ctx.save(); rrPath(x, y, w, h, 6); ctx.clip(); ctx.fillStyle = shade(c, -0.6); ctx.fillRect(x, y, w, h);
  for (let i = 0; i < w; i += 14) for (let j = 0; j < h; j += 14) if ((hash(i, j) % 9) === 0) circ(x + i, y + j, 2, 'rgba(255,255,255,0.15)'); tText(txt, x + w / 2, y + h / 2 + Math.sin(TT * 3) * 6, h * 0.55, { color: c, shadow: false }); ctx.restore(); glow(x + w / 2, y + h / 2, w, c, 0.2); }
