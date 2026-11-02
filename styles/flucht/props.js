// =====================================================================
//  styles/flucht/props.js — worlds and objects: night mountains, snow, avalanche, cars, patrols, the car
//  interior, the globe, the radio, the hut, the door, footprints, the helicopter, the knife and the chip.
// =====================================================================
// ---------------------------------------------------------------- the night world
function flSky(o = {}) {
  flBg([[0, o.top || '#0d1222'], [0.55, o.mid || '#1c2542'], [1, o.bot || '#2c3a60']]);
  flStars(o.stars ?? 70, o.starY ?? 900, o.key || 0);
  if (o.moon !== false) flMoon(o.mx ?? 800, o.my ?? 300, o.mr ?? 46);
}
function flMountains(y, o = {}) {
  const R = RNG('mtn', o.key || 0), n = o.n ?? 6, c = o.c || '#3a4a70', cs = o.snow || '#dbe3f0', off = o.off ?? 0;
  for (let i = 0; i < n; i++) {
    const x = mod(R.r(-200, W + 200) + off, W + 600) - 300, w = R.r(260, 480) * (o.s ?? 1), h = R.r(220, 420) * (o.s ?? 1);
    flFill([[x - w, y], [x, y - h], [x + w, y]], c);
    flFill([[x - w * 0.32, y - h * 0.68], [x, y - h], [x + w * 0.32, y - h * 0.68], [x + w * 0.12, y - h * 0.6], [x, y - h * 0.7], [x - w * 0.14, y - h * 0.58]], cs);
  }
}
function flPine(x, y, h, c = '#16202f', snow = true) {
  const w = h * 0.42;
  for (let k = 0; k < 3; k++) { const yy = y - h * (0.28 + k * 0.26), ww = w * (1 - k * 0.25); flFill([[x - ww, yy + h * 0.22], [x, yy - h * 0.28], [x + ww, yy + h * 0.22]], c); if (snow) flFill([[x - ww * 0.4, yy - h * 0.06], [x, yy - h * 0.28], [x + ww * 0.4, yy - h * 0.06], [x, yy - h * 0.12]], '#e8eef8', 0.9); }
  flRect(x - h * 0.03, y - h * 0.08, h * 0.06, h * 0.1, 2, '#2a1e16');
}
function flForest(y, o = {}) { const R = RNG('forest', o.key || 0); for (let i = 0; i < (o.n ?? 14); i++) { const x = mod(R.r(-100, W + 100) + (o.off ?? 0), W + 300) - 150; flPine(x, y + R.r(-10, 30), R.r(140, 300) * (o.s ?? 1), o.c || '#16202f', o.snow ?? true); } }
function flGround(y, o = {}) {
  ctx.save(); ctx.fillStyle = flGrad(0, y, 0, H, [[0, o.c0 || '#e3e9f3'], [1, o.c1 || '#aab6ca']]); ctx.fillRect(-W, y, 3 * W, 3 * H); ctx.restore();
  ctx.save(); ctx.fillStyle = flGrad(0, y - 120, 0, y + 80, [[0, 'rgba(230,236,246,0)'], [0.6, 'rgba(230,236,246,0.55)'], [1, 'rgba(230,236,246,0)']]); ctx.fillRect(-W, y - 120, 3 * W, 200); ctx.restore();
}
function flRoad(y, o = {}) {   // side-view mountain road with banks and a dashed line moving with speed
  flRect(-W, y - 26, 3 * W, 60, 0, '#4b5263');
  const sp = o.speed ?? 0; for (let i = -2; i < 14; i++) flRect(mod(i * 140 - TT * sp, W + 280) - 140, y, 70, 8, 2, '#e6d28a', 0.85);
  flRect(-W, y - 34, 3 * W, 10, 0, '#cfd8e6');
}
// ---------------------------------------------------------------- the avalanche: rolling puffs with swirls
function flAvalanche(x, y, w, h, o = {}) {
  const R = RNG('ava', o.key || 0), n = o.n ?? 26, t = TT * (o.roll ?? 1);
  ctx.save();
  for (let i = 0; i < n; i++) {
    const u = i / (n - 1), px = x + (R.r(-0.5, 0.5)) * w, py = y - R.r(0, 1) ** 0.8 * h, r = R.r(0.16, 0.3) * Math.min(w, h * 1.4) * (o.puff ?? 1);
    const bob = Math.sin(t * 2 + i) * r * 0.06, rr = r * (1 + Math.sin(t * 3 + i * 1.7) * 0.04);
    ctx.fillStyle = flRad(px - rr * 0.3, py - rr * 0.35 + bob, rr * 0.1, rr, [[0, '#ffffff'], [0.6, '#e6ebf3'], [1, o.edge || '#aeb9cc']]);
    ctx.beginPath(); ctx.arc(px, py + bob, rr, 0, TAU); ctx.fill();
    ctx.save(); ctx.globalAlpha = 0.45; ctx.strokeStyle = '#9aa7bd'; ctx.lineWidth = Math.max(2, rr * 0.035); ctx.beginPath(); const a0 = t * 1.5 + i; ctx.arc(px, py + bob, rr * 0.55, a0, a0 + 2.2); ctx.stroke(); ctx.beginPath(); ctx.arc(px + rr * 0.15, py + bob, rr * 0.3, a0 + 3, a0 + 4.8); ctx.stroke(); ctx.restore();
  }
  // flying chunks
  for (let i = 0; i < (o.chunks ?? 18); i++) { const ph = mod(t * 0.9 + R.r(0, 1), 1), cx = x + R.r(-0.5, 0.5) * w + ph * w * 0.25 * (o.dir ?? 1), cy = y - h * R.r(0.2, 1) - Math.sin(ph * Math.PI) * h * 0.25; flEll(cx, cy, R.r(6, 16), R.r(5, 12), '#f4f7fb', 1 - ph); }
  ctx.restore();
}
// ---------------------------------------------------------------- vehicles
function flWheel(x, y, r, spin) { flEll(x, y, r, r, FL.tire); flEll(x, y, r * 0.55, r * 0.55, FL.rim); for (let k = 0; k < 5; k++) { const a = spin + k * TAU / 5; flLine([[x, y], [x + Math.cos(a) * r * 0.5, y + Math.sin(a) * r * 0.5]], '#5d636c', r * 0.12); } flEll(x, y, r * 0.14, r * 0.14, '#3a3e45'); }
function flBeam(x, y, ang, len, spread, a = 0.35, c = '255,244,214') { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.translate(x, y); ctx.rotate(ang); ctx.fillStyle = flGrad(0, 0, len, 0, [[0, `rgba(${c},${a})`], [1, `rgba(${c},0)`]]); ctx.beginPath(); ctx.moveTo(0, -spread * 0.08); ctx.lineTo(len, -spread); ctx.lineTo(len, spread); ctx.lineTo(0, spread * 0.08); ctx.closePath(); ctx.fill(); ctx.restore(); }
// the SUV, side view, facing +x; (x, y) = ground under its middle
function flCarSide(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s); if (o.rot) ctx.rotate(o.rot);
  const spin = (o.spin ?? TT * 18), bounce = o.bounce ?? 0;
  ctx.translate(0, -bounce);
  if (o.lights !== false) flBeam(215, -78, 0.04, 900, 160, 0.4);
  flSmooth([[-230, -40], [-232, -110], [-200, -128], [-120, -210], [90, -212], [150, -140], [222, -122], [236, -80], [232, -40]], FL.car);
  flFill([[-108, -196], [82, -198], [132, -138], [-180, -134]], FL.glassD);
  flFill([[-100, -188], [-10, -189], [-10, -142], [-166, -140]], FL.glass, 0.55); flFill([[5, -190], [76, -190], [118, -142], [5, -142]], FL.glass, 0.55);
  flRect(-6, -196, 10, 60, 2, FL.car);
  flRect(-228, -76, 460, 10, 4, FL.carS); flRect(-40, -110, 34, 6, 3, FL.carD);
  flEll(226, -92, 12, 9, '#fff6d8'); flGlow(226, -92, 60, 'rgba(255,240,200,0.6)');
  flRect(-236, -104, 12, 22, 3, '#ff3a3a'); flGlow(-232, -94, 40, 'rgba(255,40,40,0.5)');
  for (const wx of [-140, 150]) { flEll(wx, -40, 62, 62, FL.carD); flWheel(wx, -38, 48, spin); }
  if (o.snow) flSmooth([[-200, -128], [-120, -214], [90, -216], [130, -200], [-180, -136]], '#f2f6fb', 0.95);
  ctx.restore();
}
// top view, facing +x (rot rotates it)
function flCarTop(x, y, s, rot, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  flRect(-130, -70, 270, 140, 34, '#1a1c21', 0.35);
  flRect(-136, -64, 272, 128, 30, FL.car);
  flRect(20, -54, 60, 108, 14, FL.glassD); flRect(-96, -52, 40, 104, 12, FL.glassD);
  flRect(-50, -56, 64, 112, 10, FL.carS);
  for (const [wx, wy] of [[-86, -70], [86, -70], [-86, 70], [86, 70]]) flRect(wx - 26, wy - 10, 52, 20, 6, FL.tire);
  if (o.lights !== false) { flBeam(136, -40, 0, 600, 90, 0.3); flBeam(136, 40, 0, 600, 90, 0.3); }
  ctx.restore();
}
function flSirenColor(i = 0) { return (Math.floor(TT * 7 + i) % 2) ? FL.sirenR : FL.sirenB; }
// a patrol car, front view (for the road block); (x, y) = ground centre
function flPoliceFront(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  flSmooth([[-150, -30], [-150, -110], [-110, -130], [-90, -200], [90, -200], [110, -130], [150, -110], [150, -30]], FL.police);
  flFill([[-80, -190], [80, -190], [100, -134], [-100, -134]], FL.glassD);
  flRect(-150, -80, 300, 40, 8, FL.policeS); flRect(-60, -70, 120, 24, 5, '#2a2d35');
  for (const sx of [-1, 1]) { flEll(sx * 112, -100, 26, 18, '#fffbe8'); flGlow(sx * 112, -100, 130, 'rgba(255,248,220,0.7)'); }
  const c1 = flSirenColor(o.ph || 0), c2 = c1 === FL.sirenR ? FL.sirenB : FL.sirenR;
  flRect(-70, -222, 66, 22, 6, c1); flRect(4, -222, 66, 22, 6, c2);
  flGlow(-37, -211, 170, c1 === FL.sirenR ? 'rgba(255,40,60,0.55)' : 'rgba(40,110,255,0.55)'); flGlow(37, -211, 170, c2 === FL.sirenR ? 'rgba(255,40,60,0.55)' : 'rgba(40,110,255,0.55)');
  for (const sx of [-1, 1]) flRect(sx * 120 - 22, -40, 44, 40, 8, FL.tire);
  ctx.restore();
}
function flPoliceSide(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s); if (o.rot) ctx.rotate(o.rot);
  flSmooth([[-220, -40], [-222, -100], [-150, -120], [-100, -185], [80, -186], [130, -122], [215, -110], [222, -40]], FL.police);
  flFill([[-92, -174], [72, -175], [112, -126], [-140, -122]], FL.glassD);
  flRect(-220, -84, 440, 22, 4, '#2e7d4f');
  const c1 = flSirenColor(o.ph || 0); flRect(-50, -204, 100, 20, 6, c1); flGlow(0, -194, 160, c1 === FL.sirenR ? 'rgba(255,40,60,0.55)' : 'rgba(40,110,255,0.55)');
  for (const wx of [-130, 140]) flWheel(wx, -38, 44, TT * 16);
  ctx.restore();
}
// ---------------------------------------------------------------- car interior pieces
function flSteering(x, y, r, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.lineWidth = r * 0.16; ctx.strokeStyle = '#1b1c20'; ctx.stroke(); flEll(0, 0, r * 0.26, r * 0.26, '#26272c'); for (const a of [Math.PI * 0.15, Math.PI * 0.85, Math.PI * 1.5]) flLine([[0, 0], [Math.cos(a) * r, Math.sin(a) * r]], '#1b1c20', r * 0.12); flRect(-r * 0.12, -r * 0.95, r * 0.24, r * 0.1, 4, '#c9cdd4'); ctx.restore(); }
function flSpeedo(x, y, r, v, max = 200) {
  flEll(x, y, r * 1.08, r * 1.08, '#0c0d10'); flEll(x, y, r, r, '#15171c');
  for (let i = 0; i <= 10; i++) { const a = Math.PI * 0.75 + i / 10 * Math.PI * 1.5; flLine([[x + Math.cos(a) * r * 0.78, y + Math.sin(a) * r * 0.78], [x + Math.cos(a) * r * 0.92, y + Math.sin(a) * r * 0.92]], i > 7 ? '#ff4a4a' : '#d9dee6', 4); }
  const a = Math.PI * 0.75 + clamp(v / max) * Math.PI * 1.5; flLine([[x, y], [x + Math.cos(a) * r * 0.8, y + Math.sin(a) * r * 0.8]], '#ff3b3b', 6);
  flEll(x, y, 10, 10, '#d9dee6');
  ctx.save(); ctx.font = `900 ${r * 0.34}px ${FL_FONT}`; ctx.textAlign = 'center'; ctx.fillStyle = '#ffffff'; ctx.fillText(String(Math.round(v)), x, y + r * 0.55); ctx.restore();
}
function flWiper(px, py, len, ang) { ctx.save(); ctx.translate(px, py); ctx.rotate(ang); flRect(0, -5, len, 10, 5, '#0d0e11'); ctx.restore(); }
// ---------------------------------------------------------------- the globe (viral reference)
function flGlobe(x, y, r, o = {}) {
  flGlow(x, y, r * 1.5, 'rgba(70,120,255,0.25)');
  flEll(x, y, r, r, '#1e3c8c');
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip();
  const R = RNG('globe'), rot = (o.rot ?? TT * 0.05) * r;
  for (let i = 0; i < 9; i++) { const cx = x - r + mod(R.r(0, 2 * r) + rot, 2.6 * r) - 0.3 * r, cy = y + R.r(-0.7, 0.7) * r; flSmooth(ellipsePts(cx, cy, R.r(0.14, 0.32) * r, R.r(0.1, 0.24) * r, R.r(0, 3), 9).map(([a, b], k) => [a + R.n(r * 0.05), b + R.n(r * 0.05)]), '#3e64c8'); }
  ctx.globalAlpha = 0.18; ctx.strokeStyle = '#9fc0ff'; ctx.lineWidth = 2;
  for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.ellipse(x, y + k * r * 0.27, r * Math.sqrt(1 - (k * 0.27) ** 2), r * 0.06, 0, 0, TAU); ctx.stroke(); }
  for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.ellipse(x, y, r * Math.abs(Math.cos(k * 0.52 + TT * 0.05)), r, 0, 0, TAU); ctx.stroke(); }
  ctx.restore();
  ctx.save(); ctx.fillStyle = flRad(x - r * 0.4, y - r * 0.4, r * 0.1, r * 1.2, [[0, 'rgba(255,255,255,0.12)'], [1, 'rgba(0,0,20,0.45)']]); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore();
  (o.dots || []).forEach(([dx, dy, c, k]) => { if (k <= 0) return; const px = x + dx * r, py = y + dy * r, p = mod(TT * 1.2, 1); ctx.save(); ctx.globalAlpha = k * (1 - p); ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(px, py, 14 + p * 60, 0, TAU); ctx.stroke(); ctx.restore(); flGlow(px, py, 50 * k, c === FL.yellow ? 'rgba(255,210,31,0.8)' : 'rgba(255,79,180,0.8)', k); flEll(px, py, 13 * k, 13 * k, c); });
}
// ---------------------------------------------------------------- hut, radio, fire, door, window
function flPlanks(x, y, w, h, o = {}) { flRect(x, y, w, h, 0, o.c || FL.wood); const n = Math.ceil(h / (o.ph ?? 70)); for (let i = 0; i <= n; i++) { flRect(x, y + i * (o.ph ?? 70), w, 5, 0, FL.woodD, 0.7); } const R = RNG('knots', o.key || 0); for (let i = 0; i < 14; i++) flEll(x + R.r(0, w), y + R.r(0, h), R.r(6, 12), R.r(3, 6), FL.woodS, 0.8); }
function flRadio(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  flLine([[110, -150], [190, -290]], '#2b2b2b', 6); flEll(190, -290, 8, 8, '#555');
  flRect(-210, -150, 420, 250, 30, '#8a5a32'); flRect(-210, -150, 420, 40, 20, '#9c6a3c'); flRect(-200, 70, 400, 30, 14, '#6e4424');
  flEll(-95, -20, 82, 82, '#5a3a1e'); for (let k = 0; k < 5; k++) { ctx.save(); ctx.beginPath(); ctx.arc(-95, -20, 18 + k * 13, 0, TAU); ctx.lineWidth = 4; ctx.strokeStyle = '#3e2712'; ctx.stroke(); ctx.restore(); }
  const on = o.on ?? 0; flRect(10, -110, 180, 80, 12, on ? '#ffd76a' : '#7a6640'); if (on) flGlow(100, -70, 160, 'rgba(255,215,100,0.5)', on);
  for (let k = 0; k < 9; k++) flRect(22 + k * 19, -100, 3, k % 2 ? 22 : 34, 1, '#6a4a14');
  flRect(30 + clamp(o.dial ?? 0.6) * 120, -112, 6, 84, 2, '#d42a2a');
  for (const [kx, kr] of [[60, o.knob ?? 0], [150, 1]]) { ctx.save(); ctx.translate(kx, 35); ctx.rotate(kr); flEll(0, 0, 30, 30, '#3a2412'); flRect(-4, -28, 8, 22, 3, '#d9c08a'); ctx.restore(); }
  if (o.waves) for (let k = 0; k < 3; k++) { const p = mod(TT * 1.4 + k / 3, 1); ctx.save(); ctx.globalAlpha = 1 - p; ctx.strokeStyle = '#ffd76a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(-95, -20, 90 + p * 160, -0.9, 0.9, false); ctx.stroke(); ctx.beginPath(); ctx.arc(-95, -20, 90 + p * 160, Math.PI - 0.9, Math.PI + 0.9, false); ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
function flFire(x, y, s, k = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k);
  flGlow(0, -60, 260, 'rgba(255,140,40,0.55)');
  for (const [c, sc, ph] of [[FL.fireD, 1, 0], [FL.fire, 0.72, 1.3], [FL.fireL, 0.42, 2.1]]) {
    const P = []; for (let i = 0; i <= 16; i++) { const u = i / 16, a = u * Math.PI, fl = 1 + 0.25 * Math.sin(TT * 9 + i * 1.7 + ph) + 0.15 * Math.sin(TT * 15 + i * 3); const rr = Math.sin(a) ** 0.6 * 70 * sc; const yy = -(Math.sin(a) ** 2) * 170 * sc * fl * (1 - Math.abs(u - 0.5) * 0.6); P.push([Math.cos(a) * 70 * sc, yy]); }
    flSmooth(P, c);
  }
  for (let i = 0; i < 6; i++) { const p = mod(TT * 0.9 + i / 6, 1); flEll(Math.sin(i * 2.3 + TT * 2) * 40, -120 - p * 260, 4, 4, '#ffcc66', 1 - p); }
  flRect(-90, -8, 180, 22, 8, '#3b2414'); flRect(-70, -22, 140, 20, 8, '#5a3620');
  ctx.restore();
}
function flDoor(x, y, w, h, o = {}) {
  const sh = o.shake ?? 0;
  ctx.save(); ctx.translate(x + sh, y);
  flRect(-w / 2 - 26, -h - 26, w + 52, h + 26, 6, '#3a2414');
  flRect(-w / 2, -h, w, h, 4, '#6e4426');
  flRect(-w / 2 + 30, -h + 40, w - 60, h * 0.38, 6, '#5d381e'); flRect(-w / 2 + 30, -h * 0.5, w - 60, h * 0.4, 6, '#5d381e');
  flEll(w / 2 - 40, -h * 0.5, 12, 12, '#d6a84a');
  ctx.restore();
  if (o.light) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; flRect(x - w / 2, y - 6, w, 8, 2, `rgba(255,235,180,${0.9 * o.light})`); ctx.fillStyle = flGrad(0, y, 0, y + 200, [[0, `rgba(255,225,160,${0.45 * o.light})`], [1, 'rgba(255,225,160,0)']]); ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); ctx.lineTo(x + w / 2 + 120, y + 200); ctx.lineTo(x - w / 2 - 120, y + 200); ctx.closePath(); ctx.fill(); ctx.restore(); }
  if (o.feet) for (const fx of [-40, 40]) flRect(x + fx - 26 + sh, y - 6, 52 * o.feet, 8, 3, '#140d08', o.feet);
}
function flShutterWindow(x, y, w, h, open, o = {}) {
  flRect(x - w / 2 - 20, y - h / 2 - 20, w + 40, h + 40, 8, '#4a2c16');
  ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y - h / 2, w, h); ctx.clip();
  if (o.inside) o.inside(); else { ctx.fillStyle = flGrad(0, y - h / 2, 0, y + h / 2, [[0, '#cfe3ff'], [1, '#fff7e0']]); ctx.fillRect(x - w / 2, y - h / 2, w, h); }
  ctx.restore();
  flRect(x - 6, y - h / 2, 12, h, 2, '#4a2c16'); flRect(x - w / 2, y - 6, w, 12, 2, '#4a2c16');
  for (const sx of [-1, 1]) { const ang = open * 1.45; ctx.save(); ctx.translate(x + sx * w / 2, y); ctx.scale(sx * Math.cos(ang), 1); flRect(-w / 2, -h / 2, w / 2, h, 4, '#7a4a28'); for (let k = 1; k < 7; k++) flRect(-w / 2 + 8, -h / 2 + k * h / 7, w / 2 - 16, 6, 2, '#5a3418'); ctx.restore(); }
}
function flAntlers(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); flRect(-34, -20, 68, 60, 14, '#6e4426'); for (const sx of [-1, 1]) { flLine([[sx * 20, -10], [sx * 90, -80], [sx * 120, -170]], '#e8dcc0', 14); flLine([[sx * 60, -50], [sx * 40, -120]], '#e8dcc0', 10); flLine([[sx * 100, -110], [sx * 150, -140]], '#e8dcc0', 10); } ctx.restore(); }
function flLantern(x, y, s, k = 1) { ctx.save(); ctx.translate(x, y + Math.sin(TT * 2) * 3); ctx.scale(s, s); flLine([[0, -120], [0, -60]], '#2a2a2a', 4); flRect(-34, -60, 68, 100, 12, '#3a2a1a'); flRect(-24, -50, 48, 80, 8, '#ffd27a'); flGlow(0, -10, 200, 'rgba(255,200,110,0.5)', k); ctx.restore(); }
function flFootprint(x, y, s, rot = 0, c = '#9fb0c8', a = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); flEll(0, -14, 13, 20, c, a); flEll(0, 18, 10, 12, c, a); ctx.restore(); }
function flBootprint(x, y, s, rot = 0, c = '#8fa1bb') { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); flRect(-24, -44, 48, 62, 18, c); flRect(-20, 26, 40, 34, 12, c); for (let i = 0; i < 4; i++) flRect(-18, -36 + i * 14, 36, 5, 2, '#7a8ca6'); ctx.restore(); }
// ---------------------------------------------------------------- helicopter, searchlight
function flHeli(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s); ctx.rotate(o.tilt ?? 0.06);
  if (o.light) { ctx.save(); ctx.rotate(-(o.tilt ?? 0.06)); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = flGrad(0, 40, 0, 1100, [[0, 'rgba(255,250,220,0.55)'], [1, 'rgba(255,250,220,0)']]); const sw = o.sweep ?? 0; ctx.beginPath(); ctx.moveTo(-14, 40); ctx.lineTo(14, 40); ctx.lineTo(240 + sw, 1100); ctx.lineTo(-140 + sw, 1100); ctx.closePath(); ctx.fill(); ctx.restore(); }
  flRect(80, -24, 260, 26, 10, '#2c3036'); flRect(310, -70, 24, 60, 6, '#2c3036');
  flSmooth([[-130, 10], [-120, -60], [-40, -90], [90, -80], [120, -20], [100, 40], [-80, 50]], '#3a3f47');
  flFill([[-122, -20], [-110, -62], [-40, -82], [-30, -20]], '#8fb4d6', 0.7);
  flRect(-90, 56, 200, 10, 5, '#1d2025'); flLine([[-60, 40], [-70, 58]], '#1d2025', 6); flLine([[60, 40], [70, 58]], '#1d2025', 6);
  flRect(-10, -104, 20, 18, 4, '#1d2025');
  const bl = Math.abs(Math.sin(TT * 40)); flRect(-260 * bl - 30, -110, 520 * bl + 60, 9, 4, '#16181c', 0.85);
  flEll(0, -106, 260, 10, 'rgba(30,30,30,0.15)');
  const blink = Math.floor(TT * 3) % 2; flEll(330, -70, 8, 8, blink ? '#ff3030' : '#601010'); if (blink) flGlow(330, -70, 50, 'rgba(255,40,40,0.7)');
  ctx.restore();
}
// ---------------------------------------------------------------- knife, chip, scanner, hand
function flKnife(x, y, s, rot, glint = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); flRect(-120, -16, 120, 32, 12, '#2a1c12'); flRect(-8, -22, 14, 44, 4, '#888'); flFill([[6, -14], [230, -6], [250, 4], [6, 14]], '#d7dde5'); flFill([[6, 2], [250, 4], [6, 14]], '#aab3be'); if (glint > 0) { const gx = lerp(10, 240, glint); flGlow(gx, -2, 80, 'rgba(255,255,255,0.9)'); flEll(gx, -2, 6, 6, "#fff"); } ctx.restore(); }
function flChip(x, y, s, on = 1) { flGlow(x, y, 90 * s * on, 'rgba(255,40,50,0.8)', on); flRect(x - 26 * s, y - 16 * s, 52 * s, 32 * s, 8 * s, '#2a2d33'); flEll(x, y, 9 * s, 9 * s, on > 0.5 ? '#ff2b3a' : '#5a1a20'); }
function flScanner(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  flRect(-170, -260, 340, 520, 40, '#22262e'); flRect(-140, -220, 280, 300, 16, '#0d2a1c');
  ctx.save(); ctx.beginPath(); ctx.rect(-140, -220, 280, 300); ctx.clip();
  for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.arc(0, -70, k * 50, 0, TAU); ctx.strokeStyle = 'rgba(80,255,150,0.35)'; ctx.lineWidth = 2; ctx.stroke(); }
  const a = TT * 3; ctx.fillStyle = 'rgba(80,255,150,0.25)'; ctx.beginPath(); ctx.moveTo(0, -70); ctx.arc(0, -70, 200, a, a + 0.6); ctx.closePath(); ctx.fill();
  if (o.dot) { flEll(o.dot[0], o.dot[1] - 70, 12, 12, '#ff2b3a'); flGlow(o.dot[0], o.dot[1] - 70, 50, 'rgba(255,40,50,0.8)'); }
  ctx.restore();
  if (o.label) { ctx.save(); ctx.font = `800 30px ${FL_MONO}`; ctx.textAlign = 'center'; ctx.fillStyle = o.lock ? '#ff3b4e' : '#5dffa0'; ctx.fillText(o.label, 0, 150); ctx.restore(); }
  flEll(-60, 200, 26, 26, '#3a3f49'); flEll(60, 200, 26, 26, '#3a3f49');
  ctx.restore();
}
function flGloveHand(x, y, s, rot, o = {}) {   // an olive glove sticking out of snow, fingers curl with o.curl
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  flRect(-40, 0, 80, 200, 20, FL.oliveS);
  flRect(-50, -60, 100, 90, 30, '#2a2a26');
  const c = o.curl ?? 0;
  for (let i = 0; i < 4; i++) { const fx = -36 + i * 24; ctx.save(); ctx.translate(fx, -56); ctx.rotate(-c * 1.6); flRect(-10, -60, 20, 66, 10, '#2a2a26'); ctx.restore(); }
  ctx.save(); ctx.translate(46, -20); ctx.rotate(0.7 - c * 1.2); flRect(-10, -50, 20, 56, 10, '#2a2a26'); ctx.restore();
  ctx.restore();
}
