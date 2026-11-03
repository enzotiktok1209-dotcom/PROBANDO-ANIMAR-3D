// =====================================================================
//  car.js — the two constant characters: THE WHEEL and THE RED CAR (side view, facing left, like the reference).
//  drawWheel(cx, cy, R, o)   cy = wheel centre at full pressure; the ground is at cy + R.
//    o.rot      rotation (rad)          o.heat   0..1 orange glow of hot rubber
//    o.sag      0..1 under-inflated     o.xray   0..1 see-through tyre with the air inside
//    o.temp     -1..1 colour of the air  o.energy speed of the air particles   o.cavity 0.8..1.1 size of the air ring
//    o.marker   yellow mark on the sidewall (shows the turning)     o.spin 0..1 motion blur of a fast wheel
//    o.outline  0..1 dashed green "really full" outline              o.splash / o.wet water on the tyre
//  drawCar(x, y, o)   x, y = front wheel centre; the rear wheel is at x + 640. o.wheel = options for both wheels.
// =====================================================================
const WR = 120;                                       // the wheel radius at car scale
const WHEELBASE = 640;

function tirePts(R, sag, n = 96) {
  const drop = sag * R * 0.1, bulge = sag * 0.09, P = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU; let x = Math.cos(a) * R, y = Math.sin(a) * R + drop;
    if (y > R) y = R;
    const low = clamp((Math.sin(a) - 0.25) / 0.75); x *= 1 + bulge * low * low * 1.4;
    P.push([x, y]);
  }
  return { P, drop };
}
function pathPts(P) { ctx.beginPath(); P.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); }

function sidewallText(str, r, a0, size, color) {
  ctx.save(); ctx.font = `800 ${size}px ${FONT}`; ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  let a = a0; const per = (size * 0.66) / r;
  for (const ch of str) { ctx.save(); ctx.rotate(a); ctx.translate(0, -r); ctx.fillText(ch, 0, 0); ctx.restore(); a += per * (ch === ' ' ? 0.6 : 1); }
  ctx.restore();
}

function drawWheel(cx, cy, R, o = {}) {
  const rot = o.rot ?? 0, heat = clamp(o.heat ?? 0), sag = clamp(o.sag ?? 0), xray = clamp(o.xray ?? 0), spin = clamp(o.spin ?? 0);
  const { P, drop } = tirePts(R, sag);
  ctx.save(); ctx.translate(cx, cy);
  // contact shadow
  ell(0, R + 4, R * (0.95 + sag * 0.25), R * 0.09, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = rad(0, R, 0, R * 1.3, [[0, 'rgba(0,0,0,0.35)'], [1, 'rgba(0,0,0,0)']]); ctx.fillRect(-R * 1.4, R - 30, R * 2.8, 60);
  // ---- the tyre
  withAlpha(1 - xray * 0.72, () => {
    pathPts(P);
    ctx.fillStyle = rad(-R * 0.25, -R * 0.3 + drop, R * 0.2, R * 1.1, [[0, '#33363d'], [0.7, '#1d1f24'], [1, '#101114']]); ctx.fill();
    // tread blocks on the edge
    ctx.save(); pathPts(P); ctx.clip();
    ctx.strokeStyle = 'rgba(0,0,0,0.55)'; ctx.lineWidth = R * 0.035;
    for (let i = 0; i < 44; i++) { const a = rot + (i / 44) * TAU; ctx.beginPath(); ctx.moveTo(Math.cos(a) * R * 0.94, Math.sin(a) * R * 0.94 + drop); ctx.lineTo(Math.cos(a) * R * 1.02, Math.sin(a) * R * 1.02 + drop); ctx.stroke(); }
    ctx.restore();
    // sidewall: a lit rim on the upper left, embossed lettering
    ctx.save(); ctx.translate(0, drop);
    ctx.lineWidth = R * 0.05; ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.beginPath(); ctx.arc(0, 0, R * 0.82, Math.PI * 1.05, Math.PI * 1.75); ctx.stroke();
    ctx.lineWidth = R * 0.012; ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.beginPath(); ctx.arc(0, 0, R * 0.7, 0, TAU); ctx.stroke();
    ctx.rotate(rot);
    if (spin < 0.6) withAlpha(1 - spin / 0.6, () => {
      sidewallText('205/55 R16 91V', R * 0.8, -0.95, R * 0.085, 'rgba(160,166,178,0.38)');
      sidewallText('TUBELESS', R * 0.8, 2.1, R * 0.08, 'rgba(160,166,178,0.33)');
    });
    if (o.marker) { ctx.save(); ctx.rotate(-0.2); glow('rgba(255,210,58,0.8)', R * 0.12, () => fillRR(-R * 0.03, -R * 0.93, R * 0.06, R * 0.2, R * 0.03, PAL.yellow)); ctx.restore(); }
    ctx.restore();
    if (spin > 0) { ctx.save(); ctx.translate(0, drop); ctx.strokeStyle = `rgba(150,155,165,${0.12 * spin})`; for (let i = 0; i < 6; i++) { ctx.lineWidth = 2 + i; ctx.beginPath(); ctx.arc(0, 0, R * (0.74 + i * 0.04), 0, TAU); ctx.stroke(); } ctx.restore(); }
    // heat: hot rubber glows from the contact patch up
    if (heat > 0) {
      ctx.save(); pathPts(P); ctx.clip();
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = rad(0, R * 0.9, R * 0.1, R * 1.6, [[0, rgba('#ff8a1e', 0.95 * heat)], [0.5, rgba('#ff5a0a', 0.55 * heat)], [1, rgba('#ff3a00', 0.18 * heat)]]);
      ctx.fillRect(-R * 1.2, -R * 1.2, R * 2.4, R * 2.4);
      ctx.restore();
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.lineWidth = R * 0.05; ctx.strokeStyle = rgba('#ffb04a', 0.6 * heat); ctx.shadowColor = '#ff7a1a'; ctx.shadowBlur = R * 0.45 * heat;
      pathPts(P); ctx.stroke(); ctx.restore();
      bloom(0, R * 0.95, R * 0.9, '#ff7a1a', 0.55 * heat);
    }
  });
  if (o.wet) withAlpha(o.wet, () => { ctx.save(); pathPts(P); ctx.clip(); ctx.fillStyle = lin(0, -R, 0, R, [[0, 'rgba(160,210,255,0.25)'], [1, 'rgba(60,120,200,0.05)']]); ctx.fillRect(-R, -R, R * 2, R * 2); ctx.restore(); });
  // ---- x-ray: the air inside the tyre
  if (xray > 0) {
    const cav = o.cavity ?? 1;
    ctx.save(); ctx.translate(0, drop);
    withAlpha(xray, () => {
      ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(150,200,255,0.55)'; pathPts(P.map(([x, y]) => [x, y - drop])); ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, R * 0.95 * cav, 0, TAU); ctx.arc(0, 0, R * 0.68, 0, TAU, true);
      ctx.fillStyle = 'rgba(42,91,184,0.16)'; ctx.fill('evenodd');
      airParticles(R, o, cav);
    });
    ctx.restore();
  }
  // ---- the rim (rotates), the disc and the caliper
  ctx.save(); ctx.translate(0, drop);
  circle(0, 0, R * 0.665, '#0d0e11');
  ctx.save(); ctx.rotate(rot);
  circle(0, 0, R * 0.52, lin(-R * 0.5, -R * 0.5, R * 0.5, R * 0.5, [[0, '#9ba1aa'], [1, '#4c5058']]));
  ctx.strokeStyle = 'rgba(40,42,48,0.6)'; ctx.lineWidth = R * 0.02; ctx.beginPath(); ctx.arc(0, 0, R * 0.36, 0, TAU); ctx.stroke();
  for (let i = 0; i < 18; i++) { const a = (i / 18) * TAU; circle(Math.cos(a) * R * 0.44, Math.sin(a) * R * 0.44, R * 0.016, 'rgba(30,32,36,0.8)'); }
  ctx.restore();
  // caliper (fixed): red, upper right like the reference
  ctx.save(); ctx.rotate(-0.75);
  ctx.beginPath(); ctx.arc(0, 0, R * 0.55, -0.42, 0.42); ctx.arc(0, 0, R * 0.36, 0.42, -0.42, true); ctx.closePath();
  ctx.fillStyle = lin(R * 0.36, -R * 0.2, R * 0.55, R * 0.2, [[0, '#ff4a3d'], [0.5, '#e01b1b'], [1, '#8f0b0b']]); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.beginPath(); ctx.arc(0, 0, R * 0.52, -0.3, 0.1); ctx.arc(0, 0, R * 0.5, 0.1, -0.3, true); ctx.closePath(); ctx.fill();
  ctx.restore();
  // spokes (with motion blur copies when spinning fast)
  const copies = spin > 0.05 ? 1 + Math.round(spin * 7) : 1;
  for (let k = 0; k < copies; k++) {
    ctx.save(); ctx.rotate(rot - (copies > 1 ? (k / copies) * 0.55 * spin : 0)); ctx.globalAlpha *= copies > 1 ? (k === 0 ? 0.55 : 0.6 / copies) : 1;
    for (let s = 0; s < 5; s++) {
      ctx.save(); ctx.rotate((s / 5) * TAU);
      const r0 = R * 0.12, r1 = R * 0.62, w0 = R * 0.075, w1 = R * 0.13;
      ctx.beginPath(); ctx.moveTo(-w0, -r0); ctx.lineTo(-w1, -r1); ctx.quadraticCurveTo(0, -r1 - R * 0.03, w1, -r1); ctx.lineTo(w0, -r0); ctx.closePath();
      ctx.fillStyle = lin(-w1, 0, w1, 0, [[0, '#f2f4f7'], [0.48, '#c3c8d0'], [0.52, '#8c929c'], [1, '#6b717a']]); ctx.fill();
      ctx.strokeStyle = 'rgba(20,22,26,0.45)'; ctx.lineWidth = R * 0.012; ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  }
  // rim lip
  ctx.beginPath(); ctx.arc(0, 0, R * 0.665, 0, TAU); ctx.arc(0, 0, R * 0.605, 0, TAU, true);
  ctx.fillStyle = lin(0, -R * 0.66, 0, R * 0.66, [[0, '#f4f6f9'], [0.45, '#b9bec6'], [1, '#5f646c']]); ctx.fill('evenodd');
  ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = R * 0.01; ctx.beginPath(); ctx.arc(0, 0, R * 0.605, 0, TAU); ctx.stroke();
  // valve stem
  ctx.save(); ctx.rotate(rot + (o.valveA ?? -2.2)); fillRR(-R * 0.022, -R * 0.7, R * 0.044, R * 0.09, R * 0.015, '#2b2d31'); circle(0, -R * 0.705, R * 0.025, '#a7adb5'); ctx.restore();
  // hub
  circle(0, 0, R * 0.15, lin(-R * 0.15, -R * 0.15, R * 0.15, R * 0.15, [[0, '#eef0f3'], [1, '#70757d']]));
  ctx.save(); ctx.rotate(rot); for (let i = 0; i < 5; i++) { const a = (i / 5) * TAU + 0.6; circle(Math.cos(a) * R * 0.09, Math.sin(a) * R * 0.09, R * 0.022, '#3b3e44'); } ctx.restore();
  circle(0, 0, R * 0.045, '#25272c');
  ctx.restore();
  // dashed outline: the size a really full tyre would have
  if (o.outline) {
    const u = clamp(o.outline);
    ctx.save(); ctx.translate(0, 0); ctx.setLineDash([R * 0.09, R * 0.06]); ctx.lineDashOffset = -TT * 40;
    ctx.lineWidth = R * 0.04; ctx.strokeStyle = rgba('#3ee07f', u); ctx.shadowColor = '#3ee07f'; ctx.shadowBlur = R * 0.25 * u;
    ctx.beginPath(); ctx.arc(0, 0, R * (1.02 + 0.06 * (1 - u)), -Math.PI / 2, -Math.PI / 2 + TAU * EZ.o3(u)); ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

// the air: deterministic particles drifting in the tyre's ring. Hot air is orange and fast, cold air blue and slow.
function airParticles(R, o, cav = 1) {
  const n = o.count ?? 240, energy = o.energy ?? 1, temp = o.temp ?? 0;
  const tq = Math.round(clamp((temp + 1) / 2) * 10) / 10 * 2 - 1;
  const img = dotSprite(tempC(tq).replace(/rgb\((\d+),(\d+),(\d+)\)/, (m, r, g, b) => '#' + [r, g, b].map((v) => (+v).toString(16).padStart(2, '0')).join('')), 48);
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const t = TT * (0.35 + energy * 0.9);
  for (let i = 0; i < n; i++) {
    const Rr = RNG('air', i), a0 = Rr.f() * TAU, u0 = Rr.f(), w1 = Rr.r(0.6, 1.6), w2 = Rr.r(0.8, 2.2), ph = Rr.f() * TAU;
    const a = a0 + Math.sin(t * w1 + ph) * 0.12 * energy + t * 0.04 * (Rr.f() - 0.5);
    const u = clamp(u0 + Math.sin(t * w2 * 1.7 + ph * 2) * 0.22 * energy, 0.02, 0.98);
    const r = R * (0.7 + u * (0.95 * cav - 0.7));
    const s = R * (0.075 + Rr.f() * 0.05) * (o.psize ?? 1);
    sprite(img, Math.cos(a) * r, Math.sin(a) * r, s, 0.55 + 0.45 * Math.sin(t * 3 + ph));
  }
  ctx.restore();
}

// ---------------------------------------------------------------- the red car (front wheel at 0,0, facing left)
function carBodyPath() {
  const r = WR + 24, s = 0.58;
  ctx.beginPath();
  ctx.moveTo(-262, 82);
  ctx.bezierCurveTo(-292, 70, -300, 20, -288, -14);
  ctx.bezierCurveTo(-280, -48, -262, -72, -222, -88);
  ctx.bezierCurveTo(-120, -116, 60, -132, 176, -150);
  ctx.bezierCurveTo(240, -210, 290, -268, 352, -288);
  ctx.bezierCurveTo(440, -310, 540, -306, 600, -290);
  ctx.bezierCurveTo(690, -255, 760, -200, 820, -168);
  ctx.bezierCurveTo(880, -150, 915, -128, 922, -70);
  ctx.bezierCurveTo(928, -10, 920, 50, 900, 80);
  ctx.lineTo(WHEELBASE + r + 6, 82);
  ctx.arc(WHEELBASE, 0, r, s, Math.PI - s, true);
  ctx.lineTo(r + 4, 88);
  ctx.arc(0, 0, r, s, Math.PI - s, true);
  ctx.closePath();
}
function drawCar(x, y, o = {}) {
  const wo = o.wheel || {}, env = o.env || {};
  ctx.save(); ctx.translate(x, y); ctx.scale(o.scale ?? 1, o.scale ?? 1);
  // shadow on the ground
  ctx.fillStyle = rad(320, WR + 6, 40, 700, [[0, 'rgba(0,0,0,0.6)'], [0.6, 'rgba(0,0,0,0.25)'], [1, 'rgba(0,0,0,0)']], 320, WR + 6);
  ctx.save(); ctx.translate(320, WR + 6); ctx.scale(1, 0.06); ctx.beginPath(); ctx.arc(0, 0, 700, 0, TAU); ctx.restore(); ctx.fill();
  // wheel-arch interiors
  for (const wx of [0, WHEELBASE]) circle(wx, 0, WR + 22, '#07080a');
  // wheels (behind the body's arch lip)
  drawWheel(WHEELBASE, 0, WR, { ...wo, ...(o.rear || {}), heat: (wo.heat ?? 0) * 0.85, xray: o.rearXray ?? 0 });
  drawWheel(0, 0, WR, wo);
  // body
  ctx.save(); carBodyPath();
  ctx.fillStyle = lin(0, -310, 0, 90, [[0, env.top ?? '#ff6a66'], [0.18, '#ff3438'], [0.45, '#d4121c'], [0.8, '#8e0a12'], [1, '#4e0408']]); ctx.fill();
  ctx.clip();
  // environment reflection on the flank (the sky/ground line)
  ctx.fillStyle = lin(0, -40, 0, 40, [[0, 'rgba(255,255,255,0)'], [0.5, rgba(env.refl ?? '#ffffff', 0.10)], [1, 'rgba(0,0,0,0.12)']]); ctx.fillRect(-320, -60, 1300, 110);
  // shoulder highlight streak
  ctx.fillStyle = lin(0, -150, 0, -95, [[0, 'rgba(255,255,255,0)'], [0.5, rgba(env.hi ?? '#ffffff', 0.32)], [1, 'rgba(255,255,255,0)']]);
  ctx.beginPath(); ctx.moveTo(-230, -96); ctx.bezierCurveTo(-100, -120, 100, -134, 900, -130); ctx.lineTo(900, -100); ctx.bezierCurveTo(100, -104, -100, -92, -230, -74); ctx.closePath(); ctx.fill();
  // lower body shade
  ctx.fillStyle = 'rgba(0,0,0,0.28)'; ctx.fillRect(-320, 40, 1300, 60);
  // rim light from the key light
  if (env.rim) { ctx.strokeStyle = rgba(env.rim, 0.55); ctx.lineWidth = 10; ctx.shadowColor = env.rim; ctx.shadowBlur = 25; carBodyPath(); ctx.stroke(); }
  ctx.restore();
  // windows
  ctx.beginPath(); ctx.moveTo(196, -152); ctx.bezierCurveTo(250, -208, 300, -262, 356, -276); ctx.bezierCurveTo(440, -294, 540, -292, 590, -278); ctx.bezierCurveTo(670, -246, 730, -206, 776, -176); ctx.closePath();
  ctx.fillStyle = lin(300, -290, 520, -150, [[0, env.glassTop ?? '#3a4a66'], [0.55, '#151c2b'], [1, '#090c14']]); ctx.fill();
  ctx.save(); ctx.clip();
  ctx.fillStyle = 'rgba(255,255,255,0.13)'; poly([[300, -300], [360, -300], [250, -140], [190, -140]]); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.07)'; poly([[400, -300], [430, -300], [320, -140], [290, -140]]); ctx.fill();
  if (o.frost) withAlpha(o.frost, () => { ctx.fillStyle = 'rgba(220,240,255,0.55)'; ctx.fillRect(150, -320, 700, 200); for (let i = 0; i < 60; i++) { const R = RNG('fr', i); circle(R.r(190, 780), R.r(-290, -150), R.r(2, 6), 'rgba(255,255,255,0.6)'); } });
  ctx.restore();
  ctx.strokeStyle = '#1a0306'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(470, -290); ctx.lineTo(462, -160); ctx.stroke();   // B-pillar
  // door seam, handle, mirror, side intake
  ctx.strokeStyle = 'rgba(60,0,6,0.7)'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(205, -140); ctx.bezierCurveTo(190, -60, 192, 20, 205, 84); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(612, -150); ctx.bezierCurveTo(600, -60, 600, 20, 610, 84); ctx.stroke();
  fillRR(520, -118, 58, 14, 7, lin(0, -118, 0, -104, [[0, '#ff8a86'], [1, '#7a0a10']]));
  ctx.beginPath(); ctx.moveTo(190, -160); ctx.bezierCurveTo(170, -190, 210, -205, 240, -190); ctx.lineTo(236, -158); ctx.closePath(); ctx.fillStyle = lin(0, -205, 0, -158, [[0, '#ff5054'], [1, '#8a0a12']]); ctx.fill();
  ctx.beginPath(); ctx.moveTo(150, -40); ctx.lineTo(186, -50); ctx.lineTo(186, 20); ctx.lineTo(160, 26); ctx.closePath(); ctx.fillStyle = '#16080a'; ctx.fill();
  // side skirt
  fillRR(150, 70, 340, 20, 8, '#14070a');
  // headlight + front bumper detail + tail light
  ctx.beginPath(); ctx.moveTo(-268, -40); ctx.bezierCurveTo(-250, -70, -200, -84, -150, -86); ctx.bezierCurveTo(-170, -64, -210, -44, -262, -30); ctx.closePath();
  ctx.fillStyle = lin(-268, -86, -150, -30, [[0, '#ffffff'], [1, '#b9c7d8']]); ctx.fill();
  if (o.lights) { glow('rgba(255,250,235,1)', 60, () => { ctx.fillStyle = 'rgba(255,255,245,0.95)'; ctx.fill(); }); bloom(-250, -55, 220, '#fff6dc', 0.5 * o.lights); }
  fillRR(-290, 28, 70, 22, 10, '#16080a');
  ctx.beginPath(); ctx.moveTo(905, -110); ctx.lineTo(922, -60); ctx.lineTo(890, -58); ctx.lineTo(880, -104); ctx.closePath(); ctx.fillStyle = '#ff2a2a'; ctx.fill();
  if (o.lights) bloom(905, -82, 120, '#ff2020', 0.5 * o.lights);
  // arch lips over the wheels
  ctx.lineWidth = 10; ctx.strokeStyle = '#5a050b';
  for (const wx of [0, WHEELBASE]) { ctx.beginPath(); ctx.arc(wx, 0, WR + 26, Math.PI + 0.5, -0.5); ctx.stroke(); }
  ctx.restore();
}
