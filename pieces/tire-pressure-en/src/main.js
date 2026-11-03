// =====================================================================
//  main.js — shots, camera, transitions, captions, grade. renderFrame(t) draws one frame.
//  A shot: S(t0, { tr, cam, punch, shake, tense, draw, ui, sfx }) — every time is absolute (seconds).
//    cam   [[t, x, y, z], ...]  the world point (x, y) sits at the screen focus (540, FOCUS_Y), zoom z, eased between keys
//    punch [[t, amount], ...]   fast spring zoom steps (each one stays)
//    shake [[t, amp, dur], ...] decaying screen shake
//    tense [t0, t1]             heavy vignette + a little desaturation (the slow push is in cam)
//    tr    the transition INTO this shot: cut | whipL | whipR | whipU | zoomIn | zoomOut | flash | slide | dissolve
// =====================================================================
const SHOTS = [];
function S(t0, o) { SHOTS.push({ t0, ...o }); }
const TR_DUR = { cut: 0, flash: 0.3, whipL: 0.28, whipR: 0.28, whipU: 0.28, zoomIn: 0.32, zoomOut: 0.34, slide: 0.32, dissolve: 0.5 };

function finalizeShots() {
  SHOTS.sort((a, b) => a.t0 - b.t0);
  SHOTS.forEach((s, i) => { s.t1 = i + 1 < SHOTS.length ? SHOTS[i + 1].t0 : DURATION; s.i = i; s.tr = s.tr || 'cut'; });
}
function shotAt(t) { let s = SHOTS[0]; for (const x of SHOTS) if (t + 1e-6 >= x.t0) s = x; return s; }

function camAt(s) {
  const K = s.cam || [[s.t0, 0, 0, 1]];
  let x = K[0][1], y = K[0][2], z = K[0][3];
  for (let i = 1; i < K.length; i++) {
    const [t, kx, ky, kz, ez] = K[i], [tp] = K[i - 1];
    if (TT <= tp) break;
    const e = (EZ[ez || 'io'] || EZ.io)(clamp((TT - tp) / Math.max(0.001, t - tp)));
    x = lerp(K[i - 1][1], kx, e); y = lerp(K[i - 1][2], ky, e); z = lerp(K[i - 1][3], kz, e);
  }
  for (const [t, a] of s.punch || []) z *= 1 + a * springEase(TT - t, 380, 19);
  let sx = 0, sy = 0;
  for (const [t, amp, dur = 0.4] of s.shake || []) { const u = (TT - t) / dur; if (u < 0 || u > 1) continue; const R = RNG('shk', Math.round(TT * FPS)); sx += R.n(amp) * (1 - u) ** 2; sy += R.n(amp) * (1 - u) ** 2; }
  return { x, y, z, sx, sy };
}
let CAM = { x: 0, y: 0, z: 1 };
function drawShot(s, c) {
  ctx = c.getContext('2d'); E0 = s.t0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none'; ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#05070c'; ctx.fillRect(0, 0, W, H);
  const cm = camAt(s); CAM = cm;
  ctx.setTransform(cm.z, 0, 0, cm.z, W / 2 - cm.x * cm.z + cm.sx, (s.fy ?? FOCUS_Y) - cm.y * cm.z + cm.sy);
  ctx.save(); s.draw && s.draw(); ctx.restore();
  ctx.setTransform(1, 0, 0, 1, cm.sx * 0.4, cm.sy * 0.4);
  ctx.save(); s.ui && s.ui(); ctx.restore();
}

// ---------------------------------------------------------------- transitions
function blurCopies(g, src, dx, dy, n = 6, scale = 1, alpha = 1) {
  for (let k = 0; k < n; k++) {
    const f = n === 1 ? 0 : k / (n - 1) - 0.5;
    g.save(); g.globalAlpha = alpha / (n === 1 ? 1 : n * 0.5);
    g.translate(W / 2 + dx + f * dx * 0.3, H / 2 + dy + f * dy * 0.3); g.scale(scale, scale);
    g.drawImage(src, -W / 2, -H / 2, W, H); g.restore();
  }
}
function composeTransition(g, A, B, type, u) {
  const e = EZ.io(u);
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.filter = 'none';
  g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
  if (type === 'whipL' || type === 'whipR' || type === 'whipU') {
    const dir = type === 'whipL' ? [-1, 0] : type === 'whipR' ? [1, 0] : [0, -1], span = type === 'whipU' ? H : W;
    const n = 1 + Math.round(Math.sin(u * Math.PI) * 7);
    blurCopies(g, A, dir[0] * e * span, dir[1] * e * span, n);
    blurCopies(g, B, dir[0] * (e - 1) * span, dir[1] * (e - 1) * span, n);
  } else if (type === 'slide') {
    g.drawImage(A, -e * W * 0.3, 0, W, H); g.save(); g.shadowColor = 'rgba(0,0,0,0.6)'; g.shadowBlur = 60; g.drawImage(B, (1 - e) * W, 0, W, H); g.restore();
  } else if (type === 'zoomIn') {
    if (u < 0.5) { const k = EZ.i3(u * 2); blurCopies(g, A, 0, 0, 1 + Math.round(k * 4), 1 + k * 1.6); g.fillStyle = `rgba(255,255,255,${k * 0.25})`; g.fillRect(0, 0, W, H); }
    else { const k = EZ.o3((u - 0.5) * 2); blurCopies(g, B, 0, 0, 1 + Math.round((1 - k) * 4), 1.7 - 0.7 * k); g.fillStyle = `rgba(255,255,255,${(1 - k) * 0.25})`; g.fillRect(0, 0, W, H); }
  } else if (type === 'zoomOut') {
    if (u < 0.5) { const k = EZ.i3(u * 2); blurCopies(g, A, 0, 0, 1 + Math.round(k * 4), 1 - k * 0.45); }
    else { const k = EZ.o3((u - 0.5) * 2); blurCopies(g, B, 0, 0, 1 + Math.round((1 - k) * 4), 1.5 - 0.5 * k); }
  } else if (type === 'flash') {
    g.drawImage(u < 0.5 ? A : B, 0, 0, W, H); g.fillStyle = `rgba(255,255,255,${Math.pow(1 - Math.abs(u - 0.5) * 2, 1.3)})`; g.fillRect(0, 0, W, H);
  } else if (type === 'dissolve') {
    g.drawImage(A, 0, 0, W, H); g.save(); g.globalAlpha = e; g.drawImage(B, 0, 0, W, H); g.restore();
  } else g.drawImage(u < 0.5 ? A : B, 0, 0, W, H);
}

// ---------------------------------------------------------------- captions (the reference's karaoke: spoken word bright, the rest dim, keyword in a selection box)
function captions(g) {
  const c = CHUNKS.find((k) => TT >= k.t0 - 0.03 && TT < k.t1); if (!c) return;
  const s = shotAt(TT); if (s.noCap) return;
  ctx = g; ctx.setTransform(1, 0, 0, 1, 0, 0);
  const size = 74, sp = size * 0.28, ws = [];
  for (let i = c.a; i <= c.b; i++) ws.push(WORDS[i]);
  const wid = ws.map((w) => textW(w.w, size, 800));
  let lines = [[0, ws.length]]; const total = wid.reduce((a, b) => a + b, 0) + sp * (ws.length - 1);
  if (total > 900 && ws.length > 1) { let acc = 0, cut = 1; for (let i = 0; i < ws.length; i++) { acc += wid[i] + sp; if (acc > total / 2) { cut = Math.max(1, i); break; } } lines = [[0, cut], [cut, ws.length]]; }
  const lh = size * 1.22;
  ctx.save(); ctx.translate(W / 2, s.capY ?? CAP_Y);
  lines.forEach(([a, b], li) => {
    const lw = wid.slice(a, b).reduce((p, q) => p + q, 0) + sp * (b - a - 1);
    let x = -lw / 2; const y = (li - (lines.length - 1) / 2) * lh;
    for (let i = a; i < b; i++) {
      const w = ws[i], k = clamp((TT - w.s + 0.04) / 0.12), act = TT >= w.s - 0.04 && TT < w.e;
      if (k <= 0) { x += wid[i] + sp; continue; }
      const cx = x + wid[i] / 2;
      ctx.save(); ctx.translate(cx, y + (1 - EZ.o3(k)) * 18); ctx.globalAlpha = EZ.o2(k);
      if (w.k && TT >= w.s - 0.04) {                 // selection box with handles
        const bk = springEase(TT - w.s, 420, 22), bw = wid[i] + 26, bh = size * 1.18;
        ctx.save(); ctx.scale(0.9 + 0.1 * bk, 0.9 + 0.1 * bk);
        fillRR(-bw / 2, -bh / 2, bw, bh, 8, 'rgba(40,92,255,0.28)');
        ctx.lineWidth = 3.5; ctx.strokeStyle = PAL.select; rrPath(-bw / 2, -bh / 2, bw, bh, 8); ctx.stroke();
        for (const [hx, hy] of [[-1, -1], [1, 1]]) { circle(hx * bw / 2, hy * bh / 2, 7, '#fff'); ctx.lineWidth = 3; ctx.strokeStyle = PAL.select; ctx.beginPath(); ctx.arc(hx * bw / 2, hy * bh / 2, 7, 0, TAU); ctx.stroke(); }
        ctx.restore();
      }
      const col = act || w.k ? '#ffffff' : 'rgba(230,234,245,0.62)';
      const tint = w.c === 'hot' && act ? '#ffd2a0' : w.c === 'cold' && act ? '#d4ecff' : col;
      tText(w.w, 0, 0, size, { color: tint, weight: act || w.k ? 800 : 700, shadowC: 'rgba(0,0,0,0.75)', stroke: 'rgba(0,0,0,0.35)', strokeW: 8 });
      ctx.restore(); x += wid[i] + sp;
    }
  });
  ctx.restore();
}

// ---------------------------------------------------------------- grade: contrast, vignette (heavy on tension), grain, letterbox breath
let GRAIN = null;
function grainTile() {
  if (GRAIN) return GRAIN; GRAIN = document.createElement('canvas'); GRAIN.width = GRAIN.height = 256;
  const g = GRAIN.getContext('2d'), d = g.createImageData(256, 256), R = RNG('grain');
  for (let i = 0; i < d.data.length; i += 4) { const v = 128 + R.n(70); d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  g.putImageData(d, 0, 0); return GRAIN;
}
function tenseK(t) {
  let k = 0;
  for (const s of SHOTS) { if (!s.tense) continue; const [a, b] = s.tense; k = Math.max(k, clamp((t - a) / 0.35) * clamp((b - t) / 0.3 + 0.0001)); }
  return clamp(k);
}
function vignetteFx(g, a, r0) {
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
  const gr = g.createRadialGradient(W / 2, H * 0.46, H * r0, W / 2, H * 0.46, H * 0.75);
  gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, `rgba(0,0,0,${a})`);
  g.fillStyle = gr; g.fillRect(0, 0, W, H); g.restore();
}

const CV = {};
function cvs(name) { if (!CV[name]) { CV[name] = document.createElement('canvas'); CV[name].width = PW; CV[name].height = PH; } return CV[name]; }
function renderFrame(t, target) {
  if (!SHOTS.length || SHOTS[0].t1 == null) finalizeShots();
  const main = target || document.getElementById('c');
  F = Math.round(t * FPS); B = Math.floor(t * 12); TT = t;
  const s = shotAt(t), A = cvs('A'), Bc = cvs('B'), M = cvs('M'), g = M.getContext('2d');
  g.setTransform(1, 0, 0, 1, 0, 0); g.filter = 'none'; g.globalAlpha = 1;
  let done = false;
  for (const nx of [s, SHOTS[s.i + 1]]) {
    if (!nx || nx.i === 0) continue;
    const d = TR_DUR[nx.tr] ?? 0; if (!d) continue;
    const a = nx.t0 - d / 2, b = nx.t0 + d / 2;
    if (t >= a && t < b) { drawShot(SHOTS[nx.i - 1], A); drawShot(nx, Bc); composeTransition(g, A, Bc, nx.tr, (t - a) / d); done = true; break; }
  }
  if (!done) { drawShot(s, A); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(A, 0, 0); }
  const out = main.getContext('2d'), tk = tenseK(t);
  out.setTransform(1, 0, 0, 1, 0, 0); out.globalAlpha = 1; out.globalCompositeOperation = 'source-over';
  out.filter = `saturate(${1.12 - 0.25 * tk}) contrast(${1.05 + 0.08 * tk})`;
  const cutK = s.tr === 'cut' && s.i > 0 ? 1 + 0.05 * (1 - springEase(t - s.t0, 300, 16)) : 1;
  out.save(); out.translate(W / 2, H / 2); out.scale(cutK, cutK); out.drawImage(M, -W / 2, -H / 2, W, H); out.restore();
  out.filter = 'none';
  vignetteFx(out, 0.42 + 0.5 * tk, 0.3 - 0.12 * tk);
  captions(out);
  out.setTransform(1, 0, 0, 1, 0, 0);
  out.save(); out.globalAlpha = 0.05; out.globalCompositeOperation = 'overlay'; const R = RNG('gofs', F);
  out.translate(-R.f() * 256, -R.f() * 256); out.fillStyle = out.createPattern(grainTile(), 'repeat'); out.fillRect(0, 0, W + 256, H + 256); out.restore();
  // fade in from black at the very start, out at the end
  const fin = clamp(t / 0.25), fout = clamp((DURATION - t) / 0.5);
  if (fin < 1 || fout < 1) { out.fillStyle = `rgba(0,0,0,${1 - Math.min(fin, fout)})`; out.fillRect(0, 0, W, H); }
}
window.renderFrame = renderFrame;
