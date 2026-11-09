// =====================================================================
//  props8.js — new props and sets for "40 Millionen vs 1 € pro Sekunde, 1 Jahr"
//  twin-bell alarm clock, paper cup, private island, Dubai skyline, fireworks, diamond necklace,
//  shower, city bus, a laptop that opens, a water splash, a phone call screen
// =====================================================================

// classic twin-bell alarm clock. ring 0..1 shakes it and the hammer hits the bells
function alarmClock(x, y, s, o = {}) {
  const ring = o.ring ?? 0, sh = ring ? Math.sin(TT * 70) * 0.06 * ring : 0;
  ctx.save(); ctx.translate(x, y); ctx.rotate(sh); ctx.scale(s, s);
  shadowEll(0, 300, 230, 34, 0.4);
  for (const sd of [-1, 1]) { line(sd * 150, 200, sd * 200, 290, 26, '#2a2440'); }                       // legs
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 150, -230); ctx.rotate(sd * 0.5); ell(0, 0, 105, 70, '#ff3b4a'); ell(0, -12, 82, 46, '#ff6b76'); ctx.restore(); }   // bells
  const hm = ring ? Math.sin(TT * 70) * 60 : 0; line(0, -250, hm, -300, 14, '#3a3157'); circ(hm, -300, 22, '#3a3157');
  fillRR(-20, -300, 40, 60, 10, '#3a3157');
  circ(0, 0, 270, '#ff3b4a'); circ(0, 0, 238, '#ffffff'); circ(0, 0, 238, 'rgba(0,0,0,0)');
  for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU; line(Math.cos(a) * 196, Math.sin(a) * 196, Math.cos(a) * 222, Math.sin(a) * 222, i % 3 ? 7 : 14, '#1d1a33'); }
  const t = o.t ?? TT, hA = t * 0.5 - Math.PI / 2, mA = t * 6 - Math.PI / 2;
  line(0, 0, Math.cos(hA) * 110, Math.sin(hA) * 110, 18, '#1d1a33'); line(0, 0, Math.cos(mA) * 170, Math.sin(mA) * 170, 11, '#1d1a33');
  if (o.label) { fillRR(-110, 70, 220, 70, 18, '#1d1a33'); tText(o.label, 0, 106, 40, { color: '#ffd23f', shadow: false }); }
  circ(0, 0, 18, '#ff3b4a');
  if (ring) for (let i = 0; i < 3; i++) { const k = ((TT * 3 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - k; ctx.beginPath(); ctx.arc(0, -230, 200 + k * 160, -2.6, -0.5); ctx.lineWidth = 10; ctx.strokeStyle = '#ffd23f'; ctx.stroke(); ctx.restore(); }
  ctx.restore();
}

// a paper cup standing on the pavement
function paperCup(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 4, 90, 16, 0.35);
  poly([[-70, -170], [70, -170], [52, 0], [-52, 0]], '#f2efe6'); poly([[-70, -170], [70, -170], [66, -140], [-66, -140]], '#d8d2c2'); ell(0, -170, 70, 16, '#3a2a1a');
  fillRR(-50, -110, 100, 50, 10, '#c9b896'); ctx.restore();
}

// a private island seen from the side: sand mound, palms, a beach hut, shallow water ring
function privateIsland(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ell(0, 20, 620, 90, '#5fd4e8'); ell(0, 10, 540, 70, '#8be6f2');
  ctx.beginPath(); ctx.moveTo(-480, 20); ctx.quadraticCurveTo(-200, -210, 60, -200); ctx.quadraticCurveTo(360, -190, 480, 20); ctx.closePath(); ctx.fillStyle = '#f3d9a0'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-300, -40); ctx.quadraticCurveTo(-60, -200, 200, -150); ctx.quadraticCurveTo(300, -100, 330, -30); ctx.closePath(); ctx.fillStyle = '#5bbf5a'; ctx.fill();
  // beach hut
  fillRR(120, -300, 200, 130, 10, '#c98a4a'); poly([[90, -300], [220, -390], [350, -300]], '#8a5a2a'); fillRR(190, -260, 60, 90, 8, '#5a3a1a');
  for (const [px, sc, lean] of [[-260, 1.0, -0.08], [-80, 0.85, 0.06]]) { ctx.save(); ctx.translate(px, -110); ctx.scale(sc, sc); ctx.rotate(lean);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(30, -220, 0, -420); ctx.lineWidth = 30; ctx.strokeStyle = '#7a4a2a'; ctx.stroke();
    for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.5 + Math.sin(TT * 1.4 + i + px) * 0.05; ell(Math.cos(a) * 110, -420 + Math.sin(a) * 55, 130, 24, '#2f9e57', a); } ctx.restore(); }
  // a flag with a K on it
  line(380, -200, 380, -360, 8, '#ddd'); poly([[380, -360], [480 + Math.sin(TT * 6) * 10, -335], [380, -310]], '#2f6df6'); tText('K', 412, -336, 34, { color: '#fff', shadow: false });
  ctx.restore();
}

// Dubai at night: a tall needle tower, skyline, water, fireworks overhead
function setDubai(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1500, [[0, '#0b0730'], [0.6, '#3a1a6a'], [1, '#ff7a5a']]); ctx.fillRect(-600, -400, 2300, 1900);
    const R = RNG('dbs'); for (let i = 0; i < 40; i++) circ(R.f() * 1300 - 100, R.f() * 600, 1.5 + R.f() * 2, 'rgba(255,255,255,0.6)');
    for (let i = 0; i < 12; i++) { const bx = -150 + i * 115, bh = 260 + (hash(i, 7) % 360); fillRR(bx, 1250 - bh, 90, bh, 6, '#1a1238'); for (let w = 0; w < bh / 40 - 1; w++) for (let c = 0; c < 3; c++) if ((hash(i, w, c) % 3) !== 0) fillRR(bx + 12 + c * 26, 1250 - bh + 20 + w * 40, 14, 18, 3, '#ffd86b'); }
    // the needle tower
    ctx.save(); ctx.translate(540, 1250); poly([[-90, 0], [90, 0], [50, -500], [20, -900], [6, -1150], [-6, -1150], [-20, -900], [-50, -500]], '#2a2058'); for (let i = 0; i < 18; i++) fillRR(-30 + i * 1.5, -60 - i * 60, 60 - i * 3, 10, 4, '#ffd86b'); line(0, -1150, 0, -1260, 8, '#9aa0ff'); glow(0, -1260, 60, '#ff4fa3', 0.6 + 0.3 * Math.sin(TT * 8)); ctx.restore();
    ctx.fillStyle = '#1a2a6a'; ctx.fillRect(-600, 1250, 2300, 800); for (let i = 0; i < 9; i++) line(-300 + i * 180 + Math.sin(TT * 2 + i) * 20, 1300 + (i % 3) * 60, -200 + i * 180, 1300 + (i % 3) * 60, 6, 'rgba(255,216,107,0.4)');
    if (o.fireworks !== false) fireworks('dbf', o.t0 ?? 0);
  });
}
// bursts of fireworks: each burst at its own time, spreading sparks with gravity
function fireworks(seed, t0, n = 6) {
  for (let k = 0; k < n; k++) { const R = RNG(seed, k), tb = t0 + k * 0.45 + R.f() * 0.2, u = TT - tb; if (u < 0 || u > 1.6) continue;
    const cx = 140 + R.f() * 800, cy = 180 + R.f() * 420, col = ['#ff4fa3', '#ffd23f', '#52b8ff', '#41f08a'][k % 4];
    ctx.save(); ctx.globalAlpha = clamp(1.4 - u); for (let i = 0; i < 22; i++) { const a = (i / 22) * TAU, r = 220 * EZ.o3(clamp(u / 0.9)); circ(cx + Math.cos(a) * r, cy + Math.sin(a) * r + u * u * 90, 7, col); } glow(cx, cy, 160, col, 0.4 * clamp(1 - u)); ctx.restore(); }
}

// a diamond necklace (chain of diamonds with a big pendant)
function diamondNecklace(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i <= 16; i++) { const u = i / 16, a = Math.PI * (0.1 + 0.8 * u), px = Math.cos(a) * 260, py = Math.sin(a) * 200 - 100; diamond(px, py, 26); }
  diamond(0, 150, 70);
  for (let i = 0; i < 4; i++) sparkle(-200 + i * 140, -40 + (i % 2) * 140, 22 + 10 * Math.sin(TT * 7 + i), '#fff', TT * 2 + i);
  ctx.restore();
}
function diamond(x, y, r) { poly([[x - r, y - r * 0.3], [x - r * 0.5, y - r * 0.8], [x + r * 0.5, y - r * 0.8], [x + r, y - r * 0.3], [x, y + r]], '#bfefff'); poly([[x - r * 0.5, y - r * 0.8], [x, y - r * 0.3], [x + r * 0.5, y - r * 0.8]], '#ffffff'); poly([[x - r, y - r * 0.3], [x, y - r * 0.3], [x, y + r]], '#8fd8f2'); }

// a shower: tiles, a shower head with water falling, a curtain half open
function setShower(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = '#d8eef6'; ctx.fillRect(-600, -400, 2300, 2800);
    for (let i = 0; i < 16; i++) line(-600, i * 130, 1700, i * 130, 4, 'rgba(90,140,170,0.35)'); for (let i = 0; i < 18; i++) line(-600 + i * 130, -400, -600 + i * 130, 2400, 4, 'rgba(90,140,170,0.35)');
    line(540, 120, 540, 330, 18, '#9aa0b8'); fillRR(440, 330, 200, 50, 24, '#b8bed0');
    const R = RNG('drops', Math.floor(TT * 30)); for (let i = 0; i < 46; i++) { const px = 460 + R.f() * 160 + (R.f() - 0.5) * 300 * R.f(), py = 400 + R.f() * 1300; line(px, py, px - 4, py + 46, 5, 'rgba(80,170,230,0.55)'); }
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; for (let i = 0; i < 6; i++) ell(280 + i * 110, 300 + Math.sin(TT + i) * 30, 90, 50, 'rgba(255,255,255,0.35)');
    fillRR(-600, 1560, 2300, 600, 0, '#b8d8e6');
  });
}
function showerCurtain(open) { // drawn in front of the character: a curtain closing from the right
  ctx.save(); const x0 = lerp(160, 700, open); line(-100, 220, 1200, 220, 14, '#c0c4d4');
  for (let i = 0; i < 9; i++) { const px = x0 + i * 60; poly([[px, 220], [px + 70, 220], [px + 80, 1700], [px - 10, 1700]], i % 2 ? '#ff8fc0' : '#ffb0d4'); } ctx.restore();
}

// inside a city bus: windows with the city passing by, poles, seats
function setBus(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = '#f2f0e8'; ctx.fillRect(-600, -400, 2300, 2800);
    ctx.save(); rrPath(-200, 300, 1480, 620, 30); ctx.clip(); ctx.fillStyle = lin(0, 300, 0, 920, [[0, '#7cc6ff'], [1, '#cfeeff']]); ctx.fillRect(-200, 300, 1480, 620);
    const off = (TT * 420) % 400; for (let i = -1; i < 6; i++) { const bx = -200 + i * 400 - off, bh = 260 + (hash(i + Math.floor(TT * 420 / 400)) % 220); fillRR(bx, 920 - bh, 300, bh, 8, ['#9aa3b8', '#c98a6a', '#7a8ab8'][((i % 3) + 3) % 3]); }
    for (let i = 0; i < 4; i++) { const tx = ((i * 380 - TT * 900) % 1600 + 1600) % 1600 - 200; circ(tx, 820, 60, '#3fbf6a'); fillRR(tx - 8, 820, 16, 100, 4, '#7a4a2a'); }
    ctx.restore(); for (let i = 0; i < 4; i++) fillRR(-200 + i * 370, 300, 26, 620, 6, '#3a3f52');
    line(160, -400, 160, 1600, 20, '#ffd23f'); line(920, -400, 920, 1600, 20, '#ffd23f');
    fillRR(-200, 1180, 1480, 120, 20, '#2f6df6'); fillRR(-200, 1300, 1480, 300, 0, '#4a5068');
    ctx.fillStyle = '#5a6078'; ctx.fillRect(-600, 1560, 2300, 600);
  });
}

// a laptop seen from the front at an angle that opens (open 0..1); its screen glows with a hidden number
function laptopOpen(x, y, s, open, screenFn) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shadowEll(0, 30, 360, 40, 0.4);
  poly([[-330, 0], [330, 0], [360, 40], [-360, 40]], '#5a5970'); fillRR(-300, 6, 600, 18, 6, '#3a394c');
  const h = 400 * Math.sin(open * Math.PI / 2);
  if (h > 2) { ctx.save(); ctx.translate(0, 0); fillRR(-320, -h, 640, h, 18, '#2b2a3a'); fillRR(-296, -h + 22, 592, h - 40, 10, '#0e1a2e');
    if (open > 0.6 && screenFn) { ctx.save(); rrPath(-296, -h + 22, 592, h - 40, 10); ctx.clip(); ctx.globalAlpha = clamp((open - 0.6) / 0.4); screenFn(h); ctx.restore(); }
    glow(0, -h / 2, 420, '#52b8ff', 0.25 * open); ctx.restore(); }
  ctx.restore();
}

// a water splash (drops flying up and falling) at t0
function splash(x, y, t0, s = 1) {
  const u = TT - t0; if (u < 0 || u > 1.2) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 16; i++) { const R = RNG('spl', i), vx = R.n(320), vy = -380 - R.f() * 420, px = vx * u, py = vy * u + 900 * u * u; ctx.globalAlpha = clamp(1.2 - u); circ(px, py, 12 + R.f() * 12, '#bfefff'); }
  ctx.globalAlpha = clamp(1 - u); ctx.beginPath(); ctx.ellipse(0, 0, 60 + u * 260, 16 + u * 50, 0, 0, TAU); ctx.lineWidth = 10; ctx.strokeStyle = '#ffffff'; ctx.stroke();
  ctx.restore();
}

// a phone held up, its screen showing a video call (fn draws the caller inside the screen)
function callScreen(x, y, s, fn, label) {
  phone(x, y, s, 0, () => { ctx.fillStyle = '#10142a'; ctx.fillRect(-84, -176, 168, 352); fn && fn();
    fillRR(-70, -168, 140, 26, 12, 'rgba(0,0,0,0.45)'); tText(label ?? 'VIDEOCALL', 0, -155, 12, { color: '#fff', shadow: false, letter: 2 });
    circ(-34, 150, 16, '#ff3b4a'); circ(34, 150, 16, '#41f08a'); });
}

// a coconut drink with a straw and a tiny umbrella
function coconut(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); circ(0, 0, 70, '#7a4a2a'); ell(0, -50, 56, 18, '#f4f0e6'); line(10, -50, 40, -150, 8, '#ff4fa3'); poly([[-60, -120], [0, -170], [60, -120]], '#ffd23f'); line(0, -170, 0, -60, 4, '#8a5a2a'); ctx.restore(); }
