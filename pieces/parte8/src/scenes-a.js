// =====================================================================
//  scenes-a.js — S01..S24: the ambush, rule 1 (the countdown) and the impact.
//  Each shot: function Sxx(u, d) — u = seconds into the shot, d = its length. Main subject inside x 130–950, y 345–1150.
// =====================================================================
// ---- shared worlds
function nightBack(o = {}) { flSky({ moon: o.moon ?? true, mx: o.mx ?? 820, my: o.my ?? 330, key: o.key || 0 }); if (o.mtn !== false) flMountains(o.hy ?? 900, { off: o.off || 0, key: o.key || 0, s: o.ms ?? 1 }); }
function sirenWash(a = 0.25, x = 540, y = 600) { const c = flSirenColor(); flGlow(x, y, 900, c === FL.sirenR ? `rgba(255,40,60,${a})` : `rgba(40,110,255,${a})`); }
function carInteriorFrame(o = {}) {   // dark roof, A-pillars and the dash around a windshield view
  ctx.save();
  ctx.fillStyle = '#0b0c10';
  ctx.beginPath(); ctx.moveTo(-200, -200); ctx.lineTo(1280, -200); ctx.lineTo(1280, 2200); ctx.lineTo(-200, 2200); ctx.closePath();
  ctx.moveTo(120, 330); ctx.lineTo(960, 330); ctx.lineTo(1070, 1120); ctx.lineTo(10, 1120); ctx.closePath();
  ctx.fill('evenodd');
  ctx.restore();
  flRect(0, 1100, W, 900, 0, '#121318'); flRect(0, 1100, W, 30, 0, '#1d1f26');
  if (o.mirror !== false) { flRect(470, 340, 140, 60, 14, '#15161b'); flRect(480, 348, 120, 44, 10, '#2b3550'); }
  flGlow(300, 1180, 160, 'rgba(80,200,255,0.25)'); flGlow(780, 1180, 120, 'rgba(255,140,40,0.2)');
}
function roadPOV(speed, o = {}) {   // the road ahead, perspective, from the windshield
  const hy = o.hy ?? 720;
  flBg([[0, '#0d1222'], [0.36, '#1f2948'], [0.37, '#2a3558'], [1, '#2a3558']]);
  flStars(40, hy - 60, 3); flMountains(hy, { key: 2, s: 0.7 });
  flFill([[-400, 2000], [1480, 2000], [1480, hy], [-400, hy]], '#d6dfec');
  flFill([[540 - 30, hy], [540 + 30, hy], [1300, 1500], [-220, 1500]], '#4a5266');
  for (let i = 0; i < 9; i++) { const z = mod(i / 9 + TT * speed * 0.25, 1), y = hy + z ** 2 * 800, w = 6 + z ** 2 * 40, h = 10 + z ** 2 * 120; flRect(540 - w / 2, y, w, h, 3, '#e8d48c', 0.9); }
  for (const sx of [-1, 1]) for (let i = 0; i < 7; i++) { const z = mod(i / 7 + TT * speed * 0.25, 1); flPine(540 + sx * (80 + z ** 2 * 1300), hy + z ** 2 * 700, 60 + z ** 2 * 700, '#141c2a'); }
  if (o.block) { for (let i = 0; i < 7; i++) { const x = 480 + i * 20; flGlow(x, hy - 4, 40, (Math.floor(TT * 7 + i) % 2) ? 'rgba(255,40,60,0.9)' : 'rgba(40,110,255,0.9)'); flEll(x, hy - 4, 3, 3, '#fff'); } flGlow(540, hy, 160, 'rgba(255,250,220,0.5)'); }
  // snow streaking from the vanishing point
  const R = RNG('streak'); ctx.save(); ctx.strokeStyle = '#ffffff';
  for (let i = 0; i < 70; i++) { const a = R.r(0, TAU), z = mod(R.r(0, 1) + TT * speed * 0.35, 1), r0 = 40 + z ** 2 * 1100, r1 = r0 + 10 + z ** 3 * 120; ctx.globalAlpha = z * 0.9; ctx.lineWidth = 1 + z * 4; ctx.beginPath(); ctx.moveTo(540 + Math.cos(a) * r0, hy + Math.sin(a) * r0 * 0.7); ctx.lineTo(540 + Math.cos(a) * r1, hy + Math.sin(a) * r1 * 0.7); ctx.stroke(); }
  ctx.restore();
}
function soldierFrontAim(x, y, s, k, o = {}) {   // a soldier facing the camera, rifle raised by k (0..1), muzzle at the lens
  flHuman(x, y, s, { top: FL.olive, topS: FL.oliveS, topLen: -232, pants: FL.oliveS, shoe: '#111', hand: '#1a1a1a', belt: FL.oliveD,
    armL: [lerp(10, -30, k), lerp(10, -95, k)], armR: [lerp(10, -30, k), lerp(10, -95, k)], front: true,
    head: (hx, hy) => flSoldierHead(hx, hy - 10, 58, { eyes: o.eyes ?? 'red' }),
    extra: () => { const ry = lerp(-250, -420, k); flRect(-26, ry - 30, 52, 70, 10, FL.oliveD); flEll(0, ry - 26, 22, 22, '#0a0a0a'); flEll(0, ry - 26, 10, 10, '#000'); } });
  if (k > 0.85 && o.laser) { const mx = x, my = y + lerp(-250, -446, k) * s; ctx.save(); ctx.globalCompositeOperation = 'lighter'; flLine([[mx, my], [o.laser[0], o.laser[1]]], 'rgba(255,40,60,0.6)', 3 + s * 2); ctx.restore(); flEll(o.laser[0], o.laser[1], 8, 8, '#ff2b3a'); flGlow(o.laser[0], o.laser[1], 40, 'rgba(255,40,60,0.8)'); }
}
function snowBank(y, c = '#e7edf6') { ctx.save(); ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(-50, y); for (let x = -50; x <= W + 50; x += 60) ctx.lineTo(x, y - 20 - 18 * Math.sin(x * 0.013)); ctx.lineTo(W + 50, H + 50); ctx.lineTo(-50, H + 50); ctx.closePath(); ctx.fill(); ctx.restore(); }

// ---------------------------------------------------------------- S01 POV windshield
function S01(u, d) {
  ctx.save(); const z = 1 + EZ.io(u / d) * 0.12, [sx, sy] = flShake(TT, 4, 30, 1); ctx.translate(sx, sy); flCam(z, 540, 720, 540, 720);
  roadPOV(1.4, { block: true });
  carInteriorFrame();
  const a1 = -0.3 - Math.abs(Math.sin(u * 4.2)) * 1.2; flWiper(250, 1110, 420, a1 - 0.2); flWiper(620, 1110, 420, a1);
  ctx.restore();
  flSnow({ n: 50, wind: 0, speed: 2.2, alpha: 0.5, key: 1 });
}
// ---------------------------------------------------------------- S02 the wall of rifles
function S02(u, d) {
  ctx.save(); const z = lerp(1.18, 1.0, EZ.o3(u / 0.6)); flCam(z, 540, 820, 540, 820);
  nightBack({ moon: false, hy: 860 }); flGround(860);
  for (let i = 0; i < 5; i++) flPoliceFront(160 + i * 190, 900, 0.75, { ph: i });
  for (let r = 2; r >= 0; r--) {
    const n = [5, 7, 9][r], hh = [560, 400, 300][r], y = [1200, 1010, 915][r];
    for (let i = 0; i < n; i++) { const x = W / 2 + (i - (n - 1) / 2) * (r === 0 ? 205 : r === 1 ? 150 : 112); const k = EZ.o3(clamp((u - 0.08 - (i + r * 2) * 0.045) / 0.22)); ctx.save(); ctx.globalAlpha = r === 2 ? 0.8 : 1; flvSoldier(x, y + (1 - k) * 18, hh, { eyes: 'red', bob: k * 6 }); ctx.restore(); if (r === 0 && k > 0.9) flLaser(flvMuzzle(x, y, hh), [500 + (i - 2) * 30 + Math.sin(TT * 9 + i) * 8, 1460 + Math.cos(TT * 7 + i) * 8]); }
    if (r > 0) { ctx.save(); ctx.globalAlpha = 0.22; ctx.fillStyle = '#c8d2e4'; ctx.fillRect(-100, y - 520, W + 200, 540); ctx.restore(); }
  }
  ctx.restore();
  flSnow({ n: 140, wind: -30, key: 2 });
  if (u > 0.25) flSlam('100', 540, 400, 170, FL.red, SHOT.t0 + 0.25, { stroke: 10 });
}
// ---------------------------------------------------------------- S03 the rear-view mirror
function S03(u, d) {
  ctx.save(); const z = 1 + EZ.io(u / d) * 0.15; flCam(z, 540, 700, 540, 700);
  roadPOV(1.4, { hy: 980 }); ctx.save(); ctx.globalAlpha = 0.6; ctx.fillStyle = '#05060a'; ctx.fillRect(0, 0, W, H); ctx.restore();
  carInteriorFrame({ mirror: false });
  const [mx, my] = flShake(TT, 5, 35, 4), X = 540 + mx, Y = 680 + my, MW = 820, MH = 330;
  flRect(X - 30, 300, 60, Y - MH / 2 - 300, 10, '#15161b');
  flRect(X - MW / 2 - 18, Y - MH / 2 - 18, MW + 36, MH + 36, 46, '#15161b');
  ctx.save(); ctx.beginPath(); ctx.roundRect(X - MW / 2, Y - MH / 2, MW, MH, 34); ctx.clip();
  ctx.translate(X, Y); ctx.scale(0.42, 0.42); ctx.translate(-540, -900);
  nightBack({ hy: 900, mx: 300 }); flGround(900); flRoad(1000, { speed: -900 });
  for (let i = 0; i < 6; i++) flPine(mod(i * 260 + TT * 500, 1600) - 200, 960, 260, '#16202f');
  const g = lerp(0.65, 1.05, u / d); flAvalanche(540, 1060, 1500 * g, 900 * g, { key: 3, roll: 1.4 });
  ctx.restore();
  ctx.save(); ctx.globalAlpha = 0.18; ctx.fillStyle = flGrad(X - MW / 2, 0, X + MW / 2, 0, [[0, '#fff'], [0.4, 'rgba(255,255,255,0)'], [1, 'rgba(255,255,255,0.4)']]); ctx.beginPath(); ctx.roundRect(X - MW / 2, Y - MH / 2, MW, MH, 34); ctx.fill(); ctx.restore();
  ctx.restore();
}
// ---------------------------------------------------------------- S04 the wide chase
function S04(u, d) {
  ctx.save(); const [sx, sy] = flShake(TT, 6 + u * 10, 25, 2); ctx.translate(sx, sy);
  const off = -TT * 900;
  flSky({ mx: 860, my: 280, key: 4 }); flMountains(930, { off: off * 0.1, key: 4 }); flForest(980, { off: off * 0.35, key: 4, s: 0.8 });
  flGround(1000); flRoad(1060, { speed: 900 });
  const g = lerp(0.85, 1.05, u / d); flAvalanche(lerp(80, 180, u / d), 1080, 1100 * g, 950 * g, { key: 4, roll: 1.6, chunks: 26 });
  // trees snapping and flying
  for (let i = 0; i < 3; i++) { const t0 = 0.15 + i * 0.3, p = clamp((u - t0) / 0.7); if (u < t0) { flPine(380 + i * 70, 1000, 220, '#16202f'); continue; } ctx.save(); ctx.translate(380 + i * 70 + p * 260, 1000 - Math.sin(p * Math.PI) * 300); ctx.rotate(p * 4 * (i % 2 ? 1 : -1)); flPine(0, 0, 220, '#16202f'); ctx.restore(); }
  flCarSide(640, 1066, 0.95, { snow: true, bounce: Math.abs(Math.sin(TT * 14)) * 6 });
  ctx.restore();
  flSnow({ n: 140, wind: 260, key: 4 });
}
// ---------------------------------------------------------------- S05 Greta close-up + ID card
function S05(u, d) {
  ctx.save(); const z = 1 + EZ.io(u / d) * 0.07, [sx, sy] = flShake(TT, 5, 28, 5); ctx.translate(sx, sy); flCam(z, 520, 760, 520, 760);
  flBg([[0, '#141824'], [1, '#07080c']]);
  ctx.save(); ctx.beginPath(); ctx.roundRect(-60, 260, 520, 520, 40); ctx.clip(); roadPOV(1.2, { hy: 600 }); ctx.restore();
  flRect(-80, 240, 560, 560, 50, 'rgba(0,0,0,0)');
  flRect(-80, 760, 1300, 1300, 0, '#0e0f14'); flRect(560, 380, 560, 1500, 60, '#191b22');
  flvGreta(520, 720, 470, { mood: 'fear', sweat: true, breath: 7, breathAmp: 9, key: 1, blood: 1 });
  // laser dots trembling on her cheek and coat
  for (let i = 0; i < 3; i++) { const x = 600 + i * 60 + Math.sin(TT * 13 + i) * 10, y = 830 + i * 120 + Math.cos(TT * 11 + i) * 10; flGlow(x, y, 40, 'rgba(255,40,60,0.85)'); flEll(x, y, 7, 7, '#ff3040'); }
  ctx.restore();
  sirenWash(0.28, 300 + Math.sin(TT * 5) * 400, 700);
  flIdCard(700, 330, flIn(SHOT.t0 + 0.1));
}
// ---------------------------------------------------------------- S06 the globe
function S06(u, d) {
  flBg([[0, '#04050c'], [1, '#0b1030']]); flStars(140, H, 6);
  const r = lerp(1900, 380, EZ.o3(u / 0.7));
  flGlobe(540, 800, r, { dots: [[0.12, -0.18, FL.yellow, clamp((u - 0.25) / 0.3)]] });
  flWomenCounter(540, 300, 1, { k: flIn(SHOT.t0 + 0.35) });
}
// ---------------------------------------------------------------- S07 the father bleeds
function S07(u, d) {
  ctx.save(); const bump = u > 0.15 && u < 0.5 ? Math.sin((u - 0.15) * 40) * 14 * (1 - (u - 0.15) / 0.35) : 0, z = 1 + EZ.io(u / d) * 0.08;
  ctx.translate(0, bump); flCam(z, 540, 760, 540, 760);
  flBg([[0, '#11141d'], [1, '#06070a']]);
  ctx.save(); ctx.beginPath(); ctx.roundRect(80, 250, 920, 420, 60); ctx.clip(); nightBack({ hy: 600, off: -TT * 300, key: 7 }); flGround(600); flForest(640, { off: -TT * 600, key: 7, s: 0.6 }); ctx.restore();
  flRect(-50, 640, 1180, 1400, 80, '#22252e');
  flvFather(540, 690, 430, {});
  // Greta's hand pressing the wound, trembling
  const [hx, hy] = flShake(TT, 3, 40, 7); flLine([[1100, 1500], [700 + hx, 1170 + hy]], FL.coat, 90); flEll(660 + hx, 1150 + hy, 62, 50, FL.skin); for (let k = 0; k < 4; k++) flEll(610 + k * 30 + hx, 1110 + hy, 16, 26, FL.skin);
  ctx.restore();
  flECG(300, 250, 480, 110, 48, FL.red);
}
// ---------------------------------------------------------------- S08 Klaus at the wheel
function S08(u, d) {
  ctx.save(); const z = lerp(1, 1.12, EZ.io(u / d)); flCam(z, 540, 700, 540, 720);
  flBg([[0, '#101218'], [1, '#050608']]);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 200, W, 520); ctx.clip(); roadPOV(1.5, { hy: 520, block: true }); ctx.restore();
  flRect(-50, 700, 1180, 1400, 0, '#0d0e12');
  const [sx, sy] = flShake(TT, 3, 30, 8);
  flvKlaus(540 + sx, 650 + sy, 400, { look: [0.2, 0] });
  flSteering(540, 1290, 300, Math.sin(TT * 3) * 0.05);
  for (const s of [-1, 1]) { flEll(540 + s * 250, 1120, 50, 44, FL.kSkin); flEll(540 + s * 250, 1100, 52, 26, FL.hood); }
  ctx.restore();
  flNameTag('KLAUS', 'DER KOPFGELDJÄGER', 540, 380, flIn(SHOT.t0 + 0.35));
}
// ---------------------------------------------------------------- S09 the hands yank the wheel
function S09(u, d) {
  const rot = springMove(SHOT.t0 + 0.08, 0, -2.4, SPRING.heavy), roll = -0.26 * EZ.io(clamp(u / 0.8));
  ctx.save(); flCam(1, 540, 760, 540, 760, roll);
  roadPOV(1.5, { hy: 560 });
  ctx.save(); ctx.globalAlpha = 0.55; ctx.fillStyle = '#05060a'; ctx.fillRect(-500, -500, 2100, 2900); ctx.restore();
  for (let g = 3; g >= 0; g--) { const rr = rot + (g ? (rot - springMove(SHOT.t0 + 0.08 - g * 0.03, 0, -2.4, SPRING.heavy)) * -0.6 : 0); ctx.save(); ctx.globalAlpha = g ? 0.18 : 1; flSteering(540, 780, 400, rr); for (const s of [-1, 1]) { const a = rr + (s > 0 ? 0 : Math.PI); const hx = 540 + Math.cos(a) * 380, hy = 780 + Math.sin(a) * 380; flLine([[hx, hy], [hx + s * 300, hy + 600]], FL.hood, 110); flEll(hx, hy, 70, 60, FL.kSkin); } ctx.restore(); }
  ctx.restore();
}
// ---------------------------------------------------------------- S10 top-down drift
function S10(u, d) {
  const p = EZ.io(clamp(u / 1.1)), rot = lerp(-Math.PI / 2, 0.15, p), cx = 540 + lerp(-40, 60, p), cy = lerp(1050, 760, EZ.o2(u / d));
  ctx.save(); flCam(1, cx, cy, 540, 760, -rot * 0.15 - 0.1);
  ctx.fillStyle = '#dfe6f1'; ctx.fillRect(-1000, -1000, 3200, 4000);
  const R = RNG('tex'); for (let i = 0; i < 80; i++) flEll(R.r(-500, 1600), R.r(-500, 2500), R.r(10, 40), R.r(5, 14), '#c9d3e3', 0.6);
  flRect(340, -1000, 400, 4000, 0, '#596178');
  for (let i = 0; i < 12; i++) flRect(530, -1000 + i * 300, 20, 140, 4, '#e8d48c', 0.9);
  // skid marks along the drift
  ctx.save(); ctx.strokeStyle = 'rgba(30,30,36,0.7)'; ctx.lineWidth = 22; for (const off of [-60, 60]) { ctx.beginPath(); for (let k = 0; k <= 20; k++) { const q = k / 20 * p, r2 = lerp(-Math.PI / 2, 0.15, q), x = 540 + lerp(-40, 60, q) + Math.cos(r2 + Math.PI / 2) * off, y = lerp(1500, 760, q) + Math.sin(r2 + Math.PI / 2) * off + 140; k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); } ctx.restore();
  // the block at the top
  for (let i = 0; i < 4; i++) { const x = 300 + i * 160; flRect(x - 60, 200, 120, 220, 26, FL.police); flRect(x - 40, 280, 80, 18, 6, flSirenColor(i)); flGlow(x, 290, 140, flSirenColor(i) === FL.sirenR ? 'rgba(255,40,60,0.45)' : 'rgba(40,110,255,0.45)'); }
  // snow spray arcs
  const R2 = RNG('spray'); for (let i = 0; i < 60; i++) { const ph = mod(R2.r(0, 1) + u * 2.2, 1), a = rot + Math.PI + R2.r(-0.9, 0.9), dd = ph * R2.r(150, 420); flEll(cx + Math.cos(a) * (120 + dd), cy + Math.sin(a) * (120 + dd), 10 * (1 - ph) + 4, 10 * (1 - ph) + 4, '#ffffff', (1 - ph) * 0.95); }
  flCarTop(cx, cy, 1.25, rot + Math.PI / 2 * 0 - Math.PI / 2 + Math.PI / 2);
  ctx.restore();
}
// ---------------------------------------------------------------- S11 the car stops across
function S11(u, d) {
  ctx.save(); const z = 1 + EZ.io(u / d) * 0.06; flCam(z, 540, 900, 540, 860);
  nightBack({ hy: 960, key: 11, mx: 200, my: 300 }); flGround(960);
  flAvalanche(130, 980, 620, 600 * lerp(0.8, 0.95, u / d), { key: 11, roll: 1.2 });
  for (let i = 0; i < 3; i++) flPoliceFront(800 + i * 130, 990, 0.5, { ph: i });
  const sp = springEase(u, 120, 7), bounce = (1 - sp) * 34 * Math.cos(u * 12) * Math.exp(-u * 3);
  flCarSide(540, 1120, 1.45, { lights: true, spin: 0, bounce, snow: true, rot: (1 - sp) * 0.05 });
  // snow settling
  const R = RNG('settle'); for (let i = 0; i < 40; i++) { const ph = clamp(u / 1.2 + R.r(-0.2, 0.2)), x = 540 + R.r(-450, 450), y = 1100 - R.r(0, 300) * (1 - ph) - Math.sin(ph * Math.PI) * 80; flEll(x, y, R.r(4, 12), R.r(4, 10), '#ffffff', 1 - ph * 0.8); }
  snowBank(1180);
  ctx.restore();
  flSnow({ n: 90, wind: 40, key: 11 });
}
// ---------------------------------------------------------------- S12 the reflection in the goggles
function S12(u, d) {
  ctx.save(); const z = 1 + EZ.io(u / d) * 0.1; flCam(z, 540, 720, 540, 740);
  flBg([[0, '#121729'], [1, '#05060c']]); sirenWash(0.4, 540 + Math.sin(TT * 4) * 300, 500);
  flRect(170, 1000, 740, 900, 160, FL.olive);
  flSoldierHead(540, 720, 270, { eyes: 'white', refl: lerp(0.3, 1.25, EZ.io(u / d)), pr: lerp(12, 7, u / d), look: [0, 0.2] });
  for (let k = 0; k < 2; k++) { const ph = mod(u * 0.9 + k * 0.5, 1); flEll(540, 960 + ph * 60, 60 + ph * 100, 30 + ph * 40, '#e8eef7', 0.4 * (1 - ph)); }
  ctx.restore();
  flSnow({ n: 80, wind: -40, key: 12 });
}
// ---------------------------------------------------------------- S13 over the soldiers' shoulders
function S13(u, d) {
  ctx.save(); const z = lerp(1.15, 1.0, EZ.io(u / d)), [sx, sy] = flShake(TT, 3 + u * 6, 28, 13); ctx.translate(sx, sy); flCam(z, 540, 900, 540, 880);
  nightBack({ hy: 1000, key: 13, moon: false }); flGround(1000);
  const g = lerp(0.9, 1.15, u / d); flAvalanche(540, 1060, 1600 * g, 1050 * g, { key: 13, roll: 1.5, chunks: 30 });
  ctx.save(); ctx.globalAlpha = 0.35 * (u / d); ctx.fillStyle = '#0a0d18'; ctx.fillRect(-200, 950, 1500, 600); ctx.restore();
  flCarSide(540, 1080, 0.75, { lights: true, spin: 0 });
  // two soldiers' backs in the foreground
  for (const [x, s] of [[110, 1.15], [960, 1.25]]) { ctx.save(); ctx.translate(x, 1700); ctx.scale(s, s); flSmooth([[-230, 400], [-220, -80], [-150, -170], [150, -170], [220, -80], [230, 400]], FL.oliveD); flEll(0, -250, 105, 105, FL.mask); flSmooth([[-125, -250], [-112, -330], [-60, -372], [60, -372], [112, -330], [125, -250]], FL.oliveS); ctx.restore(); }
  ctx.restore();
  flSnow({ n: 120, wind: 120, key: 13 });
}
// ---------------------------------------------------------------- S14 one runs
function S14(u, d) {
  ctx.save(); flCam(1.05 + EZ.io(u / d) * 0.05, 540, 900, 540, 860);
  nightBack({ hy: 960, key: 14, moon: false }); flGround(960);
  for (let i = 0; i < 4; i++) flPoliceFront(200 + i * 230, 990, 0.6, { ph: i });
  for (let i = 0; i < 4; i++) flvSoldier(150 + i * 260, 1010, 300, { eyes: 'red' });
  const turned = u > 0.15, x = 540 - (turned ? EZ.i2((u - 0.15) / 0.6) * 620 : 0);
  flvSoldier(x, 1200, 560, { eyes: 'red', flip: turned, run: turned ? TT * 2.4 : null, lean: turned ? 0.12 : 0, bob: turned ? Math.abs(Math.sin(TT * 2.4 * TAU)) * 14 : 0 });
  if (turned) { const R = RNG('kick14'); for (let i = 0; i < 10; i++) { const ph = mod(u * 3 + R.r(0, 1), 1); flEll(x + 60 + ph * 120, 1195 - Math.sin(ph * Math.PI) * 60, 8, 6, '#ffffff', 1 - ph); } }
  ctx.restore();
  flSnow({ n: 100, wind: 80, key: 14 });
}
// ---------------------------------------------------------------- S15 then all
function S15(u, d) {
  ctx.save(); const [sx, sy] = flShake(TT, 6, 30, 15); ctx.translate(sx, sy); flCam(1 + EZ.io(u / d) * 0.06, 540, 900, 540, 860);
  nightBack({ hy: 960, key: 15, moon: false }); flGround(960);
  for (let i = 0; i < 5; i++) flPoliceFront(120 + i * 210, 990, 0.62, { ph: i });
  const R = RNG('flee');
  for (let i = 0; i < 9; i++) { const dir = i % 2 ? 1 : -1, hh = R.r(300, 560), x = R.r(160, 920) + dir * u * R.r(400, 800), y = 1000 + hh * 0.35; const ph = TT * R.r(2.2, 2.8) + i;
    flvSoldier(x, y, hh, { eyes: 'red', flip: dir < 0, run: ph, lean: 0.12, bob: Math.abs(Math.sin(ph * TAU)) * 12 });
    flBeam(x + dir * 40, y - hh * 0.62, (dir > 0 ? 0 : Math.PI) + Math.sin(TT * 6 + i) * 0.6, 500, 80, 0.22); }
  ctx.restore();
  flSnow({ n: 100, wind: 60, key: 15 });
}
// ---------------------------------------------------------------- S16 five seconds
function S16(u, d) {
  ctx.save(); ctx.filter = 'blur(12px) brightness(0.55)'; flBg([[0, '#141824'], [1, '#07080c']]); flvGreta(540, 720, 480, { mood: 'cry', key: 2 }); ctx.restore();
  const pulse = 0.5 + 0.5 * Math.sin(TT * 10); ctx.save(); ctx.fillStyle = flRad(540, 900, 300, 1200, [[0, 'rgba(0,0,0,0)'], [1, `rgba(220,20,40,${0.35 + 0.25 * pulse})`]]); ctx.fillRect(0, 0, W, H); ctx.restore();
  const k = clamp(u / 0.16), s = lerp(2.6, 1, EZ.o3(k)) * (1 + 0.04 * Math.sin(TT * 12));
  ctx.save(); ctx.translate(540, 760); ctx.scale(s, s); flText('5', 0, 190, 540, FL.yellow, { stroke: 18, blur: 40 }); ctx.restore();
}
// ---------------------------------------------------------------- S17 REGEL 1
function S17(u, d) { flRegelCard(1, SHOT.t0); flSnow({ n: 40, wind: 20, alpha: 0.3, key: 17 }); }
// ---------------------------------------------------------------- S18 the key, engine off
function S18(u, d) {
  ctx.save(); const z = 1 + EZ.io(u / d) * 0.12; flCam(z, 540, 760, 540, 760);
  flBg([[0, '#15171d'], [1, '#08090c']]);
  flRect(-40, 300, 1160, 300, 40, '#1b1d24');
  const off = (i) => u > 0.32 + i * 0.09;
  for (let i = 0; i < 6; i++) { const x = 180 + i * 145, on = !off(i); flRect(x - 40, 420, 80, 50, 10, '#0d0e12'); if (on) { const c = ['#3be37a', '#ffb23b', '#2fa8ff', '#ff3b4e', '#3be37a', '#ffd21f'][i]; flRect(x - 30, 430, 60, 30, 8, c); flGlow(x, 445, 70, flRGBA(c, 0.5)); } }
  flSpeedo(220, 1000, 150, springMove(SHOT.t0 + 0.2, 160, 0, SPRING.heavy));
  flEll(600, 900, 170, 170, '#22242c'); flEll(600, 900, 120, 120, '#2e313a'); flEll(600, 900, 70, 70, '#16171c');
  ctx.save(); ctx.font = `800 28px ${FL_MONO}`; ctx.fillStyle = '#9aa3b2'; ctx.textAlign = 'center'; ctx.fillText('OFF', 470, 790); ctx.fillText('ON', 735, 790); ctx.restore();
  const a = springMove(SHOT.t0 + 0.06, 0.55, -0.55, SPRING.snappy);
  ctx.save(); ctx.translate(600, 900); ctx.rotate(a); flRect(-18, -90, 36, 120, 8, '#c9ced6'); flRect(-70, -200, 140, 120, 40, '#2b2d33'); flEll(0, -160, 18, 18, '#0d0e12');
  flEll(-30, -150, 90, 75, FL.kSkin); for (let k = 0; k < 3; k++) flEll(-90 + k * 50, -230, 26, 50, FL.kSkin); flLine([[-60, -120], [-280, 300]], FL.hood, 150);
  ctx.restore();
  ctx.restore();
}
// ---------------------------------------------------------------- S19 the exhaust under snow
function S19(u, d) {
  ctx.save(); const z = lerp(1, 1.25, EZ.io(u / d)); flCam(z, 640, 900, 540, 760);
  nightBack({ hy: 800, key: 19, moon: false }); flGround(800);
  flRect(150, 500, 780, 560, 70, FL.car); flRect(200, 540, 680, 250, 40, FL.glassD); flRect(150, 860, 780, 90, 20, FL.carS);
  for (const x of [200, 820]) { flRect(x - 40, 760, 80, 60, 12, '#ff3a3a'); flGlow(x, 790, 90, 'rgba(255,40,40,0.5)'); }
  flRect(360, 820, 360, 70, 8, '#d9dde4'); ctx.save(); ctx.font = `900 46px ${FL_MONO}`; ctx.fillStyle = '#1a1c22'; ctx.textAlign = 'center'; ctx.fillText('M · K 8812', 540, 872); ctx.restore();
  flRect(620, 950, 110, 50, 20, '#5b5f68'); flEll(728, 975, 22, 26, '#16171c');
  for (let k = 0; k < 3; k++) { const ph = mod(u * 1.4 + k / 3, 1); flEll(760 + ph * 120, 975 - ph * 90, 30 + ph * 60, 24 + ph * 40, '#aab3c2', 0.5 * (1 - ph) * (1 - u / d)); }
  const lvl = lerp(1180, 950, EZ.io(clamp((u - 0.3) / 1.2)));
  ctx.save(); ctx.fillStyle = '#eef3fa'; ctx.beginPath(); ctx.moveTo(-200, lvl); for (let x = -200; x <= 1300; x += 50) ctx.lineTo(x, lvl - 18 * Math.sin(x * 0.02 + u * 2)); ctx.lineTo(1300, 2000); ctx.lineTo(-200, 2000); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.restore();
  // x-ray inset on the pipe
  const k = flIn(SHOT.t0 + 0.5); if (k > 0) { ctx.save(); ctx.translate(800, 470); ctx.scale(k, k); flEll(0, 0, 150, 150, 'rgba(10,20,40,0.88)'); ctx.lineWidth = 6; ctx.strokeStyle = FL.blue; ctx.beginPath(); ctx.arc(0, 0, 150, 0, TAU); ctx.stroke(); flRect(-120, -26, 160, 52, 16, '#5b5f68'); flRect(30, -40, 100, 80, 10, '#eef3fa'); flText('BLOCKIERT', 0, 100, 26, FL.red, { font: FL_MONO, weight: 800, shadow: false }); ctx.restore(); }
  flSnow({ n: 120, wind: 10, speed: 1.4, key: 19 });
}
// ---------------------------------------------------------------- S20 cross-section: toxic gas
function S20(u, d) {
  flBg([[0, '#0b1a33'], [1, '#06101f']]);
  ctx.save(); ctx.globalAlpha = 0.25; ctx.strokeStyle = '#3c6fb0'; ctx.lineWidth = 2; for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } ctx.restore();
  ctx.save(); flCam(lerp(1, 1.06, u / d), 540, 760, 540, 760);
  flSmooth([[60, 420], [300, 360], [600, 390], [1020, 350], [1040, 1150], [40, 1150]], '#dfe7f2');
  ctx.save(); ctx.globalAlpha = 0.5; flSmooth([[60, 420], [300, 360], [600, 390], [1020, 350], [1040, 470], [40, 520]], '#ffffff'); ctx.restore();
  flCarSide(540, 960, 1.35, { lights: false, spin: 0 });
  // the gas: from the buried exhaust into the cabin
  const gk = clamp(u / 1.4), fade = 1 - clamp((u - 2.0) / 0.5);
  for (let i = 0; i < 14; i++) { const ph = mod(u * 0.5 + i / 14, 1) * gk, x = lerp(250, 640, ph) + Math.sin(i * 2 + u * 3) * 40, y = lerp(930, 720, ph) + Math.cos(i + u * 2) * 30; flEll(x, y, 40 + ph * 50, 30 + ph * 36, '#7c8596', 0.55 * fade * gk); }
  ctx.restore();
  const pk = flIn(SHOT.t0 + 0.6); if (pk > 0) { ctx.save(); ctx.translate(540, 470); ctx.scale(pk * (1 + 0.06 * Math.sin(TT * 9)), pk * (1 + 0.06 * Math.sin(TT * 9))); flEll(0, 0, 70, 64, '#ffffff'); flRect(-34, 30, 68, 50, 12, '#ffffff'); for (const s of [-1, 1]) flEll(s * 26, -6, 18, 22, '#0b1a33'); flFill([[0, 14], [-10, 34], [10, 34]], '#0b1a33'); flText('CO', 150, 30, 90, FL.red, { stroke: 6 }); ctx.restore(); }
  if (u > 2.0) { const k = clamp((u - 2.0) / 0.15), s = lerp(2, 1, EZ.o3(k)); ctx.save(); ctx.translate(540, 760); ctx.scale(s, s); ctx.globalAlpha = k; flLine([[-260, -260], [260, 260]], FL.red, 54); flLine([[260, -260], [-260, 260]], FL.red, 54); ctx.restore(); }
}
// ---------------------------------------------------------------- S21 seatbelt
function S21(u, d) {
  ctx.save(); const z = 1 + EZ.io(u / d) * 0.08; flCam(z, 540, 760, 540, 760);
  flBg([[0, '#121318'], [1, '#07080a']]);
  flvGreta(540, 400, 520, { mood: 'angry', key: 4, blood: 1 });
  const p = EZ.io(clamp(u / 0.35)), bx = lerp(980, 300, p), by = lerp(420, 1080, p);
  flLine([[1040, 300], [bx, by]], '#2b2e36', 70, 1, 'butt'); flLine([[1040, 300], [bx, by]], '#3a3e48', 14, 1, 'butt');
  flRect(bx - 50, by - 30, 100, 60, 12, '#c9ced6');
  flRect(230, 1050, 120, 150, 18, '#1a1b20'); flRect(250, 1040, 80, 30, 6, '#c9ced6');
  flEll(bx + 50, by - 10, 60, 48, FL.skin);
  if (u > 0.35) { const k = clamp((u - 0.35) / 0.2); flGlow(300, 1060, 160 * (1 - k), 'rgba(255,255,255,0.8)'); }
  ctx.restore();
}
// ---------------------------------------------------------------- S22 arms in front of the face
function S22(u, d) {
  ctx.save(); const z = 1 + EZ.io(u / d) * 0.06; flCam(z, 540, 760, 540, 760);
  flBg([[0, '#20242e'], [1, '#0a0b0f']]);
  ctx.save(); ctx.beginPath(); ctx.roundRect(60, 220, 960, 560, 40); ctx.clip(); flBg([[0, '#9aa6ba'], [1, '#dfe6f1']]); flAvalanche(540, 900, 1400, 700, { key: 22, roll: 2 }); ctx.restore();
  flvGreta(540, 690, 460, { mood: 'fear', key: 5, blood: 1 });
  const p = EZ.o3(clamp(u / 0.3));
  for (const s of [-1, 1]) { const x0 = 540 + s * 330, y0 = 1500, x1 = lerp(540 + s * 260, 540 - s * 120, p), y1 = lerp(1250, 700, p); flLine([[x0, y0], [x1, y1]], FL.coat, 110); flEll(x1 - s * 30, y1 - 20, 54, 50, FL.skin); }
  if (u > 0.3) { const k = clamp((u - 0.3) / 0.25); ctx.save(); ctx.globalAlpha = k; ctx.lineWidth = 10; ctx.strokeStyle = FL.green; ctx.shadowColor = FL.green; ctx.shadowBlur = 30; ctx.beginPath(); ctx.ellipse(540, 760, 280 * (1.2 - 0.2 * k), 190 * (1.2 - 0.2 * k), 0, 0, TAU); ctx.stroke(); ctx.restore(); flText('LUFTRAUM', 540, 520, 40, FL.green, { font: FL_MONO, weight: 800 }); }
  ctx.restore();
}
// ---------------------------------------------------------------- S23 the last breath (silence)
function S23(u, d) {
  ctx.save(); const z = 1 + EZ.io(u / d) * 0.12; flCam(z, 560, 740, 540, 760);
  flBg([[0, '#1a1d26'], [1, '#08090c']]);
  ctx.save(); ctx.beginPath(); ctx.roundRect(40, 200, 1000, 620, 40); ctx.clip(); flBg([[0, '#1c2440'], [1, '#2a3558']]); flMountains(820, { key: 23 });
  const cover = EZ.io(clamp(u / d)); flAvalanche(540, lerp(-200, 900, cover), 1600, 1100, { key: 23, roll: 0.8 }); ctx.restore();
  ctx.save(); ctx.globalAlpha = 0.6; flVec('f_open', 150, 720, 250, { blink: 1, lidC: '#d9bcab' }); ctx.restore();
  flvGreta(600, 690, 460, { mood: 'calm', breath: 1.2, breathAmp: 16, key: 6, blood: 1 });
  ctx.save(); ctx.globalAlpha = 0.45 * EZ.i2(u / d); ctx.fillStyle = '#000'; ctx.fillRect(-200, -200, 1500, 2400); ctx.restore();
  ctx.restore();
}
// ---------------------------------------------------------------- S24 WHITE
function S24(u, d) {
  flBg([[0, '#ffffff'], [1, '#e6ecf5']]);
  ctx.save(); const [sx, sy] = flShake(TT, 40 * (1 - u / d), 50, 24); ctx.translate(sx, sy);
  flAvalanche(540, 1500, 1800, 1500, { key: 24, roll: 3, edge: '#cfd8e6', chunks: 30 });
  ctx.save(); ctx.globalAlpha = clamp((u - 0.1) / 0.2) * 0.85; ctx.translate(540, 820); ctx.rotate(u * 6); flSmooth([[-230, -40], [-232, -110], [-120, -210], [90, -212], [222, -122], [232, -40]], '#4a4f5c'); flEll(-140, -30, 50, 50, '#3a3e48'); flEll(150, -30, 50, 50, '#3a3e48'); ctx.restore();
  flAvalanche(540, 700, 1800, 600, { key: 25, roll: 3, edge: '#dfe6f1', chunks: 0, puff: 0.8 });
  ctx.restore();
}
