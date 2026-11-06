// =====================================================================
//  CAMERAS, TRANSITIONS, VIGNETTE, HUD — read by kit/morph.js (BRIDGES = [] : every boundary is a cut,
//  and each cut is dressed by a transition drawn in pieceOverlay with its own sound in score.js)
// =====================================================================
const ERA_BG = ERA_LIST.map(() => '#0b0f24');
const BRIDGES = [];
// camera shakes [t, amplitude px, duration]
const SHAKES = SHOT_LIST.filter((s) => s[2].m === "snap" || s[3] === "flash").map((s) => [s[0], 12, 0.35]);
function camShake(t) { let x = 0, y = 0; for (const [s, a, d] of SHAKES) { const u = (t - s) / d; if (u <= 0 || u >= 1) continue; const k = a * (1 - u) ** 2; x += Math.sin(t * 87 + s * 13) * k; y += Math.cos(t * 71 + s * 7) * k; } return [x, y]; }
function camZoom(era, t) {
  const [t0, , cam] = SHOT_LIST[era], t1 = ERA_LIST[era][1], u = clamp((t - t0) / (t1 - t0)), [z0, z1] = cam.z;
  if (cam.m === 'snap') return lerp(z0, z1, springEase(t - t0, 260, 22)) + (z1 - z0) * 0.08 * u;   // fast punch-in, then a slow creep
  if (cam.m === 'out') return lerp(z0, z1, springEase(t - t0, 200, 24)) - 0.03 * u;
  if (cam.m === 'pulse') { const n = 3, st = Math.min(n - 1, Math.floor(u * n)); const a = st / n, b = (st + 1) / n; return lerp(z0, z1, lerp(a, b, springEase(t - (t0 + st * (t1 - t0) / n), 300, 24))); }
  if (cam.m === 'drift') return lerp(z0, z1, EZ.io(u));
  return lerp(z0, z1, u);   // slow
}
function pieceCam(era, t) {
  const cam = SHOT_LIST[era][2], z = camZoom(era, t), [sx, sy] = camShake(t), br = Math.sin(t * 1.3) * 4;
  const c = camOf({ z, p: cam.p, to: [C0[0] + sx + br, C0[1] + sy] });
  if (cam.rot) { /* rotation is applied by the scene itself (fnRotWorld) */ }
  return c;
}
// vignette: stronger while a slow zoom builds tension
function pieceVignette(t) {
  const e = Math.max(0, eraAt(t)), cam = SHOT_LIST[e][2], u = clamp((t - SHOT_LIST[e][0]) / (ERA_LIST[e][1] - SHOT_LIST[e][0]));
  const base = cam.vig ?? (cam.m === 'slow' ? 0.4 : 0.22);
  return cam.m === 'slow' ? base * (0.55 + 0.45 * u) + 0.1 : base;
}
// ---- transitions: drawn over the finished frame around each cut (±TR seconds)
const TR = 0.14;
function fxCopy() { const t = layer(2), g = t.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'copy'; g.drawImage(ctx.canvas, 0, 0); g.globalCompositeOperation = 'source-over'; return t; }
function pieceOverlay(t) {
  let best = null;
  for (let i = 1; i < SHOT_LIST.length; i++) { const c = SHOT_LIST[i][0], d = t - c; if (Math.abs(d) < TR + 0.06 && (!best || Math.abs(d) < Math.abs(best.d))) best = { c, d, type: SHOT_LIST[i][3] }; }
  if (!best || best.type === 'none' || best.type === 'hard') return;
  const k = 1 - Math.abs(best.d) / TR; if (k <= 0) return;
  const ty = best.type, before = best.d < 0;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (ty === 'flash' || ty === 'light' || ty === 'burn') {
    ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = EZ.o2(k) * (ty === 'light' ? 0.95 : 0.85);
    ctx.fillStyle = ty === 'burn' ? '#ff9a3a' : '#ffffff'; ctx.fillRect(0, 0, W, H);
  } else if (ty === 'dip') {
    ctx.globalAlpha = EZ.o2(k); ctx.fillStyle = '#000000'; ctx.fillRect(0, 0, W, H);
  } else if (ty === 'whip' || ty === 'whipdown' || ty === 'whipup') {
    const src = fxCopy(), dir = ty === 'whip' ? [1, 0] : ty === 'whipdown' ? [0, 1] : [0, -1], amt = EZ.i2(k) * 220 * (before ? -1 : 1);
    ctx.globalCompositeOperation = 'copy'; ctx.globalAlpha = 1; ctx.drawImage(src, dir[0] * amt, dir[1] * amt);
    ctx.globalCompositeOperation = 'source-over';
    for (let i = 1; i <= 6; i++) { ctx.globalAlpha = 0.18 * k; ctx.drawImage(src, dir[0] * (amt + i * 60 * k), dir[1] * (amt + i * 60 * k)); ctx.drawImage(src, dir[0] * (amt - i * 60 * k), dir[1] * (amt - i * 60 * k)); }
  } else if (ty === 'zoomblur' || ty === 'out') {
    const src = fxCopy(); ctx.globalCompositeOperation = 'source-over';
    for (let i = 1; i <= 7; i++) { const s = 1 + (ty === 'out' ? -0.04 : 0.06) * i * k; ctx.globalAlpha = 0.14 * k; ctx.drawImage(src, W / 2 - W * s / 2, H * 0.4 - H * 0.4 * s, W * s, H * s); }
    ctx.globalAlpha = 0.25 * k; ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
  } else if (ty === 'glitch') {
    const src = fxCopy(), R = RNG('gl', Math.round(t * FPS)); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
    for (let i = 0; i < 14; i++) { const y = R.r(0, H), h = R.r(10, 90), dx = R.r(-80, 80) * k; ctx.drawImage(src, 0, y, W, h, dx, y, W, h); }
    ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.35 * k; ctx.drawImage(src, 14 * k, 0); ctx.fillStyle = 'rgba(255,0,60,0.12)'; ctx.fillRect(0, 0, W, H);
  } else if (ty === 'wipe') {
    const x = before ? lerp(-W * 1.2, 0, 1 - Math.abs(best.d) / TR) : lerp(0, W * 1.2, 1 - k);
    ctx.fillStyle = '#0b0f24'; ctx.beginPath(); ctx.moveTo(x - 300, 0); ctx.lineTo(x + W, 0); ctx.lineTo(x + W - 300, H); ctx.lineTo(x - 600, H); ctx.closePath(); ctx.fill();
    ctx.fillStyle = FN.yellow; ctx.fillRect(0, 0, 0, 0);
  } else if (ty === 'rack') {
    const src = fxCopy(); ctx.filter = `blur(${Math.round(18 * k)}px)`; ctx.globalCompositeOperation = 'copy'; ctx.drawImage(src, 0, 0); ctx.filter = 'none';
  } else if (ty === 'tapestop') {
    const src = fxCopy(); ctx.filter = `grayscale(${k}) brightness(${1 - 0.3 * k})`; ctx.globalCompositeOperation = 'copy'; ctx.drawImage(src, 0, 0); ctx.filter = 'none';
  }
  ctx.restore();
}
// HUD: chapter pill + HOMENS: 1 (the CTA has its own card)
function pieceHUD(t) {
  let lab = HUD_AT[0][1]; for (const [s, l] of HUD_AT) if (t >= s - 1e-6) lab = l;
  const k = SHOT_LIST[Math.max(0, eraAt(t))][1];
  if (k === 'cta' || k.startsWith('tag')) return;
  fnHUD(lab, { counter: t < 20.5 ? 'HUMANOS ACORDADOS: 8 BI' : 'HUMANOS ACORDADOS: 0' });
}
