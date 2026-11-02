// =====================================================================
//  render.js — this piece's own renderer: one shot function per shot, drawn on an offscreen layer, then
//  composited with its transition (whip pans with streaks, zoom-throughs with blur, flashes, glitch slices,
//  dips to black, shakes), a saturation boost, the vignette, the HUD and the karaoke subtitles on top.
//  Shots draw in world = screen coords (1080x1920) and use flCam() for their camera moves.
// =====================================================================
let SHOT = null, U = 0, SD = 1;   // the current shot, its local time, its duration
const TRD = 0.14;                 // half-length of a transition (≈4 frames each side)
function flCam(z, px, py, tx = 540, ty = 760, rot = 0) {   // world point (px, py) to screen (tx, ty) at zoom z
  ctx.translate(tx, ty); if (rot) ctx.rotate(rot); ctx.scale(z, z); ctx.translate(-px, -py);
}
const LAYERS = {};
function flLayer(name) { if (!LAYERS[name]) { const c = document.createElement('canvas'); c.width = W; c.height = H; LAYERS[name] = c; } return LAYERS[name]; }
function shotIndexAt(t) { for (let i = SHOTS.length - 1; i >= 0; i--) if (t >= SHOTS[i].t0 - 1e-6) return i; return 0; }
function drawShot(i, t, target) {
  const saved = ctx; ctx = target.getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none';
  ctx.fillStyle = '#05060a'; ctx.fillRect(0, 0, W, H);
  const s = SHOTS[i], keepT = TT; SHOT = s; TT = t; U = t - s.t0; SD = s.t1 - s.t0; E0 = s.t0;
  ctx.save(); const fn = window[s.key]; if (fn) fn(U, SD); ctx.restore();
  TT = keepT; ctx = saved;
}
// composite a layer with a transition transform: kind, p = -1..0 (outgoing, approaching the cut) or 0..1 (incoming)
function blit(src, kind, p) {
  const a = Math.abs(p), sgn = p < 0 ? -1 : 1; ctx.save();
  if (kind === 'whipL' || kind === 'whipR') {
    const dir = kind === 'whipL' ? -1 : 1, sh = (1 - a) ** 2, dx = (p < 0 ? dir : -dir) * sh * W * 0.7;
    ctx.drawImage(src, dx, 0);
    if (sh > 0.02) { ctx.filter = `blur(${(sh * 26).toFixed(1)}px)`; for (let k = 1; k <= 4; k++) { ctx.globalAlpha = 0.22; ctx.drawImage(src, dx - dir * k * 45 * sh, 0); } ctx.filter = 'none'; ctx.globalAlpha = 1; }
  } else if (kind === 'zoomIn' || kind === 'zoomOut') {
    const k = 1 - a, s = kind === 'zoomIn' ? (p < 0 ? 1 + k * 0.6 : 1 - k * 0.25) : (p < 0 ? 1 - k * 0.3 : 1 + k * 0.5);
    ctx.translate(W / 2, H * 0.42); ctx.scale(s, s); ctx.translate(-W / 2, -H * 0.42);
    if (k > 0.05) ctx.filter = `blur(${(k * 14).toFixed(1)}px)`; ctx.drawImage(src, 0, 0);
  } else if (kind === 'spin') {
    const k = 1 - a; ctx.translate(W / 2, H * 0.42); ctx.rotate((p < 0 ? 1 : -1) * k * 0.5); ctx.scale(1 + k * 0.3, 1 + k * 0.3); ctx.translate(-W / 2, -H * 0.42); if (k > 0.05) ctx.filter = `blur(${(k * 10).toFixed(1)}px)`; ctx.drawImage(src, 0, 0);
  } else if (kind === 'shake' && p > 0) {
    const k = (1 - a) ** 1.5, [sx, sy] = flShake(TT, 34 * k, 60, 3); ctx.translate(sx, sy); ctx.translate(W / 2, H / 2); ctx.scale(1 + 0.04 * k, 1 + 0.04 * k); ctx.translate(-W / 2, -H / 2); ctx.drawImage(src, 0, 0);
  } else if (kind === 'glitch') {
    const k = 1 - a; ctx.drawImage(src, 0, 0);
    if (k > 0.05) { const R = RNG('gl', F); for (let i = 0; i < 9; i++) { const y = R.r(0, H), h = R.r(20, 160), dx = R.n(120 * k); ctx.drawImage(src, 0, y, W, h, dx, y, W, h); }
      ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.35 * k; ctx.drawImage(src, 14 * k, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; }
  } else ctx.drawImage(src, 0, 0);
  ctx.restore();
}
function renderFrame(t, canvas) {
  const cv = canvas || document.getElementById('c');
  ctx = cv.getContext('2d');
  F = ((Math.round(t * FPS) % NFRAMES) + NFRAMES) % NFRAMES; B = F; TT = F / FPS;
  const i = shotIndexAt(TT), s = SHOTS[i], nx = SHOTS[i + 1];
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none'; ctx.globalCompositeOperation = 'source-over';
  const L = flLayer('a'); drawShot(i, TT, L);
  // which transition is active: incoming (start of this shot) or outgoing (end of this shot, the next one's kind)
  let kind = 'cut', p = 0;
  if (TT - s.t0 < TRD && s.tr !== 'cut') { kind = s.tr; p = (TT - s.t0) / TRD; }
  else if (nx && nx.t0 - TT < TRD && nx.tr !== 'cut') { kind = nx.tr; p = -(nx.t0 - TT) / TRD; }
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  ctx.filter = 'saturate(1.2) contrast(1.05)';
  const sat = flLayer('sat'), sg = sat.getContext('2d'); sg.setTransform(1, 0, 0, 1, 0, 0); sg.filter = 'saturate(1.2) contrast(1.05)'; sg.clearRect(0, 0, W, H); sg.drawImage(L, 0, 0); sg.filter = 'none';
  ctx.filter = 'none';
  // a slow push-in on every shot (every fifth one pulls out instead) — keeps the eye locked on the centre
  const NOZ = { S17: 1, S26: 1, S37: 1, S87: 1 }, prog = EZ.io(clamp((TT - s.t0) / (s.t1 - s.t0)));
  const gz = NOZ[s.key] ? 1 : (i % 5 === 4 ? lerp(1.12, 1.0, prog) : lerp(1.0, 1.12, prog));
  ctx.save(); ctx.translate(540, 780); ctx.scale(gz, gz); ctx.translate(-540, -780);
  blit(sat, kind, p);
  ctx.restore();
  // overlays tied to transitions
  const k = 1 - Math.abs(p);
  if (kind === 'flash' || kind === 'flashS') { ctx.save(); ctx.globalAlpha = (kind === 'flash' ? 1 : 0.6) * k ** 1.5; ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  if (kind === 'red') { ctx.save(); ctx.globalAlpha = 0.85 * k ** 1.3; ctx.fillStyle = '#e0102a'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  if (kind === 'black') { ctx.save(); ctx.globalAlpha = k ** 0.8; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  if (!(SHOT_FLAGS[s.key] || {}).noVig) flVignette(0.9);
  // the reference darkens the bottom of every frame: the subtitles stay readable on snow
  ctx.save(); ctx.fillStyle = flGrad(0, 1050, 0, H, [[0, 'rgba(0,0,0,0)'], [0.35, 'rgba(0,0,0,0.42)'], [1, 'rgba(0,0,0,0.85)']]); ctx.fillRect(0, 1050, W, H - 1050); ctx.restore();
  flHUD();
  flSubs();
  ctx.restore();
  return s.id;
}
window.renderFrame = renderFrame;
window.anchorAt = () => null;
const SHOT_FLAGS = { S17: { noVig: true }, S26: { noVig: true }, S37: { noVig: true } };

// ---- the HUD timeline
function flHUD() {
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const t = TT; if (t > 107.6) { ctx.restore(); return; }
  const tag = t < 33.4 ? ['LAWINE', FL.hudR] : t < 47.69 ? ['UNTER DEM SCHNEE', FL.hudW] : t < 63.16 ? ['LAWINE', FL.hudR] : t < 80.06 ? ['WALD · 02:14', FL.hudG] : t < 93.21 ? ['TAG 9 · JAGDHÜTTE', FL.hudA] : ['TAG 10 · 06:12', FL.hudW];
  if (!(t >= 32.75 && t < 33.4)) flChip(tag[0], W / 2, 70, { size: 26, c: tag[1] });
  if (t < 80.06) flChecklist([
    { text: '1. MOTOR AUS', t: 22.6, done: 34.6 },
    { text: '2. FINDE OBEN', t: 34.62, done: 47.0 },
    { text: '3. STIRB FÜR DIE WELT', t: 47.8, done: 57.2 },
  ]);
  // top-right counters
  if (t >= 2.9 && t < 32.75) {
    const m = t < 21.1 ? Math.round(lerp(300, 60, seg(t, 2.9, 21.1)) / 10) * 10 : Math.round(lerp(50, 0, seg(t, 21.1, 32.7)));
    const red = t >= 21.1, blink = red && Math.floor(t * 4) % 2;
    flChip(`LAWINE ${m} M`, W - 30, 165, { size: 24, align: 'right', c: red ? (blink ? FL.hudR : '#ff8a96') : FL.hudY, bar: 1 - m / 300, k: flIn(2.9) });
  }
  if (t >= 15.0 && t < 21.1) flChip('SPERRE 20 M', W - 30, 238, { size: 24, align: 'right', c: FL.hudR, k: flIn(15.0) });
  // the countdown 5..1 in the corner during rule 1
  const cd = t >= 23.58 && t < 32.75 ? (t < 26.3 ? 4 : t < 28.99 ? 3 : t < 31.07 ? 2 : 1) : 0;
  if (cd) { const t0 = [0, 31.07, 28.99, 26.3, 23.58][cd]; flSlam(String(cd), W - 110, 330, 120, cd <= 2 ? FL.red : FL.yellow, t0, { from: 1.8 }); }
  if (t >= 104.02) { /* silence: HUD stays, nothing new */ }
  ctx.restore();
}
