// =====================================================================
//  main.js — shots, camera, transitions, captions, grade. renderFrame(t) draws one frame.
//  A shot: S(t0, { tr, cam, punch, shake, draw, ui, sfx, capY }) — every time is absolute (seconds).
//    cam   [[t, x, y, z], ...]  the world point (x, y) sits at the screen centre, zoom z, eased between keys
//    punch [[t, amount], ...]   spring zoom steps (each one stays), the "zoom punch"
//    shake [[t, amp, dur], ...] decaying screen shake
//    tr    the transition INTO this shot: cut | whipL | whipR | whipU | zoomIn | zoomOut | flash | glitch | spin | slide | iris
//    sfx   [[t, name, ...args]] sounds for this shot (score.js plays them; transitions add their own)
// =====================================================================
const SHOTS = [];
function S(t0, o) { SHOTS.push({ t0, ...o }); }
const TR_DUR = { cut: 0, flash: 0.28, whipL: 0.26, whipR: 0.26, whipU: 0.26, zoomIn: 0.3, zoomOut: 0.32, glitch: 0.24, spin: 0.34, slide: 0.3, iris: 0.36 };
const CAPCOL = { name: '#ff63b8', money: '#ffd23f', neg: '#ff4545', obj: '#52b8ff', pos: '#45f08f', plain: '#ffffff' };

function finalizeShots() {
  SHOTS.sort((a, b) => a.t0 - b.t0);
  SHOTS.forEach((s, i) => { s.t1 = i + 1 < SHOTS.length ? SHOTS[i + 1].t0 : DURATION; s.i = i; s.tr = s.tr || 'cut'; });
  // keep the subject centred, above the captions: shots that stand on the floor are lifted on screen
  SHOTS.forEach((s) => { if (s.lift != null) return; const src = String(s.draw || ''), z0 = s.cam ? s.cam[0][3] : 1;
    s.lift = s.capY != null && s.capY > 1600 ? 0 : /FLOOR|supercar\(|bicycle\(|fuelPump\(|podium/.test(src) ? (z0 < 1.3 ? 280 : 90) : 0; });
}
function shotAt(t) { let s = SHOTS[0]; for (const x of SHOTS) if (t + 1e-6 >= x.t0) s = x; return s; }

function camAt(s) {
  const K = s.cam || [[s.t0, 540, 960, 1]];
  let x = K[0][1], y = K[0][2], z = K[0][3];
  for (let i = 1; i < K.length; i++) {
    const [t, kx, ky, kz] = K[i], [tp] = K[i - 1];
    if (TT <= tp) break;
    const u = EZ.io(clamp((TT - tp) / Math.max(0.001, t - tp)));
    x = lerp(K[i - 1][1], kx, u); y = lerp(K[i - 1][2], ky, u); z = lerp(K[i - 1][3], kz, u);
  }
  y += s.lift || 0;
  for (const [t, a] of s.punch || []) z *= 1 + a * springEase(TT - t, 340, 17);
  let sx = 0, sy = 0;
  for (const [t, amp, dur = 0.4] of s.shake || []) { const u = (TT - t) / dur; if (u < 0 || u > 1) continue; const R = RNG('shk', Math.round(TT * FPS)); sx += R.n(amp) * (1 - u); sy += R.n(amp) * (1 - u); }
  return { x, y, z, sx, sy };
}
function drawShot(s, c) {
  ctx = c.getContext('2d'); E0 = s.t0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none'; ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#120e22'; ctx.fillRect(0, 0, PW, PH);
  const cm = camAt(s);
  ctx.setTransform(cm.z * SC, 0, 0, cm.z * SC, (W / 2 - cm.x * cm.z + cm.sx) * SC, (H / 2 - cm.y * cm.z + cm.sy) * SC);
  ctx.save(); s.draw && s.draw(); ctx.restore();
  ctx.setTransform(SC, 0, 0, SC, cm.sx * 0.5 * SC, cm.sy * 0.5 * SC);
  ctx.save(); s.ui && s.ui(); ctx.restore();
}

// ---------------------------------------------------------------- transitions
function blurCopies(g, src, dx, dy, n = 6, scale = 1, rot = 0, alpha = 1) {
  for (let k = 0; k < n; k++) {
    const f = n === 1 ? 0 : k / (n - 1) - 0.5;
    g.save(); g.globalAlpha = alpha / (n === 1 ? 1 : n * 0.55);
    g.translate(W / 2 + dx + f * dx * 0.35, H / 2 + dy + f * dy * 0.35); g.rotate(rot); g.scale(scale, scale);
    g.drawImage(src, -W / 2, -H / 2, W, H); g.restore();
  }
}
function composeTransition(g, A, B, type, u) {
  const e = EZ.io(u);
  g.setTransform(SC, 0, 0, SC, 0, 0);
  g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
  if (type === 'whipL' || type === 'whipR' || type === 'whipU') {
    const dir = type === 'whipL' ? [-1, 0] : type === 'whipR' ? [1, 0] : [0, -1], span = type === 'whipU' ? H : W;
    const n = 1 + Math.round(Math.sin(u * Math.PI) * 7);
    blurCopies(g, A, dir[0] * e * span, dir[1] * e * span, n);
    blurCopies(g, B, dir[0] * (e - 1) * span, dir[1] * (e - 1) * span, n);
  } else if (type === 'slide') {
    g.drawImage(A, -e * W * 0.35, 0, W, H); g.save(); g.shadowColor = 'rgba(0,0,0,0.6)'; g.shadowBlur = 60; g.drawImage(B, (1 - e) * W, 0, W, H); g.restore();
  } else if (type === 'zoomIn') {
    if (u < 0.5) { const k = EZ.i3(u * 2); g.save(); g.filter = `blur(${k * 18}px)`; blurCopies(g, A, 0, 0, 1, 1 + k * 2.2); g.restore(); g.fillStyle = `rgba(255,255,255,${k * 0.35})`; g.fillRect(0, 0, W, H); }
    else { const k = EZ.o3((u - 0.5) * 2); g.save(); g.filter = `blur(${(1 - k) * 18}px)`; blurCopies(g, B, 0, 0, 1, 1.9 - 0.9 * k); g.restore(); g.fillStyle = `rgba(255,255,255,${(1 - k) * 0.35})`; g.fillRect(0, 0, W, H); }
  } else if (type === 'zoomOut') {
    if (u < 0.5) { const k = EZ.i3(u * 2); g.save(); g.filter = `blur(${k * 14}px)`; blurCopies(g, A, 0, 0, 1, 1 - k * 0.55); g.restore(); }
    else { const k = EZ.o3((u - 0.5) * 2); g.save(); g.filter = `blur(${(1 - k) * 14}px)`; blurCopies(g, B, 0, 0, 1, 0.6 + 0.4 * k + 0.0); g.restore(); if (k < 1) { g.globalAlpha = 1 - k; g.fillStyle = '#000'; g.fillRect(0, 0, W, H); g.globalAlpha = 1; } }
  } else if (type === 'spin') {
    const a = u < 0.5 ? EZ.i3(u * 2) : EZ.o3((u - 0.5) * 2), src = u < 0.5 ? A : B, rot = u < 0.5 ? a * 0.9 : -(1 - a) * 0.9, sc = u < 0.5 ? 1 + a * 1.2 : 2.2 - 1.2 * a;
    g.save(); g.filter = `blur(${(u < 0.5 ? a : 1 - a) * 16}px)`; blurCopies(g, src, 0, 0, 1, sc, rot); g.restore();
  } else if (type === 'flash') {
    g.drawImage(u < 0.5 ? A : B, 0, 0, W, H); g.fillStyle = `rgba(255,255,255,${Math.pow(1 - Math.abs(u - 0.5) * 2, 1.4)})`; g.fillRect(0, 0, W, H);
  } else if (type === 'glitch') {
    const src = u < 0.5 ? A : B, R = RNG('gl', Math.round(TT * FPS));
    g.drawImage(src, 0, 0, W, H);
    for (let i = 0; i < 14; i++) { const y = R.f() * H, h = 20 + R.f() * 120, dx = R.n(160); g.drawImage(src, 0, y * SC, PW, h * SC, dx, y, W, h); }
    g.save(); g.globalCompositeOperation = 'screen'; g.globalAlpha = 0.5; g.fillStyle = '#ff00aa'; g.fillRect(R.n(30), 0, W, H * 0.02 + R.f() * 30); g.fillStyle = '#00e5ff'; g.fillRect(0, R.f() * H, W, 8 + R.f() * 40); g.restore();
    g.save(); g.globalAlpha = 0.35; g.globalCompositeOperation = 'lighter'; g.drawImage(src, 14, 0, W, H); g.restore();
  } else if (type === 'iris') {
    g.drawImage(A, 0, 0, W, H); const r = EZ.io(u) * 1300;
    g.save(); g.beginPath(); g.arc(W / 2, H / 2, r, 0, TAU); g.clip(); g.drawImage(B, 0, 0, W, H); g.restore();
    g.beginPath(); g.arc(W / 2, H / 2, r, 0, TAU); g.lineWidth = 26; g.strokeStyle = '#fff'; g.stroke();
  } else g.drawImage(u < 0.5 ? A : B, 0, 0, W, H);
  g.setTransform(1, 0, 0, 1, 0, 0);
}

// ---------------------------------------------------------------- captions (karaoke)
function captions(g) {
  const c = CHUNKS.find((k) => TT >= k.t0 - 0.02 && TT < k.t1); if (!c) return;
  const s = shotAt(TT); if (s.noCap) return;
  const size = 78, y0 = s.capY ?? 1480, ws = [];
  ctx = g; ctx.setTransform(SC, 0, 0, SC, 0, 0);
  for (let i = c.a; i <= c.b; i++) ws.push({ ...WORDS[i], txt: WORDS[i].w.toUpperCase() });
  // lay out on 1 or 2 lines within 940 px
  const sp = size * 0.3, wid = ws.map((w) => textW(w.txt, size, 900));
  let lines = [[0, ws.length]], total = wid.reduce((a, b) => a + b, 0) + sp * (ws.length - 1);
  if (total > 940 && ws.length > 1) { let acc = 0, cut = 1; for (let i = 0; i < ws.length; i++) { acc += wid[i] + sp; if (acc > total / 2) { cut = Math.max(1, i); break; } } lines = [[0, cut], [cut, ws.length]]; }
  const pop = springEase(TT - c.t0, 420, 20), lh = size * 1.12;
  ctx.save(); ctx.translate(W / 2, y0); ctx.scale(0.86 + 0.14 * pop, 0.86 + 0.14 * pop);
  lines.forEach(([a, b], li) => {
    const lw = wid.slice(a, b).reduce((p, q) => p + q, 0) + sp * (b - a - 1);
    let x = -lw / 2; const y = (li - (lines.length - 1) / 2) * lh;
    for (let i = a; i < b; i++) {
      const w = ws[i], on = TT >= w.s - 0.03, act = TT >= w.s - 0.03 && TT < w.e + 0.05;
      const k = act ? 1 + 0.12 * Math.sin(clamp((TT - w.s) / 0.18) * Math.PI) : 1;
      ctx.save(); ctx.translate(x + wid[i] / 2, y); ctx.scale(k, k);
      tText(w.txt, 0, 0, size, { color: on ? CAPCOL[w.c] : '#c9c4d8', stroke: '#140c22', strokeW: 15, shadowC: 'rgba(0,0,0,0.55)' });
      ctx.restore(); x += wid[i] + sp;
    }
  });
  ctx.restore();
}

// ---------------------------------------------------------------- grade: saturation, contrast, vignette, grain
let GRAIN = null;
function grainTile() {
  if (GRAIN) return GRAIN; GRAIN = document.createElement('canvas'); GRAIN.width = GRAIN.height = 256;
  const g = GRAIN.getContext('2d'), d = g.createImageData(256, 256), R = RNG('grain');
  for (let i = 0; i < d.data.length; i += 4) { const v = 128 + R.n(60); d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  g.putImageData(d, 0, 0); return GRAIN;
}

// ---------------------------------------------------------------- the frame
const CV = {};
function cvs(name) { if (!CV[name]) { CV[name] = document.createElement('canvas'); CV[name].width = PW; CV[name].height = PH; } return CV[name]; }
function renderFrame(t, target) {
  if (!SHOTS.length || SHOTS[0].t1 == null) finalizeShots();
  const main = target || document.getElementById('c');
  F = Math.round(t * FPS); B = F; TT = t;
  const s = shotAt(t), A = cvs('A'), Bc = cvs('B'), M = cvs('M'), g = M.getContext('2d');
  g.setTransform(1, 0, 0, 1, 0, 0); g.filter = 'none'; g.globalAlpha = 1;
  // inside a transition window?  (centred on the cut)
  let done = false;
  for (const nx of [s, SHOTS[s.i + 1]]) {
    if (!nx || nx.i === 0) continue;
    const d = TR_DUR[nx.tr] ?? 0; if (!d) continue;
    const a = nx.t0 - d / 2, b = nx.t0 + d / 2;
    if (t >= a && t < b) { drawShot(SHOTS[nx.i - 1], A); drawShot(nx, Bc); composeTransition(g, A, Bc, nx.tr, (t - a) / d); done = true; break; }
  }
  if (!done) { drawShot(s, A); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(A, 0, 0); }
  // a hard cut lands with a small punch
  const out = main.getContext('2d');
  out.setTransform(1, 0, 0, 1, 0, 0); out.globalAlpha = 1; out.globalCompositeOperation = 'source-over';
  out.filter = 'saturate(1.3) contrast(1.07)';
  const cutK = s.tr === 'cut' && s.i > 0 ? 1 + 0.06 * (1 - springEase(t - s.t0, 300, 16)) : 1;
  out.setTransform(SC, 0, 0, SC, 0, 0);
  out.save(); out.translate(W / 2, H / 2); out.scale(cutK, cutK); out.drawImage(M, -W / 2, -H / 2, W, H); out.restore();
  out.filter = 'none';
  captions(out);
  ctx = out; vignette(0.62, 0.4);
  out.setTransform(SC, 0, 0, SC, 0, 0);
  out.save(); out.globalAlpha = 0.045; out.globalCompositeOperation = 'overlay'; const R = RNG('gofs', F);
  out.translate(-R.f() * 256, -R.f() * 256); out.fillStyle = out.createPattern(grainTile(), 'repeat'); out.fillRect(0, 0, W + 256, H + 256); out.restore();
}
window.renderFrame = renderFrame;
