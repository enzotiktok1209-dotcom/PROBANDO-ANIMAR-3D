// =====================================================================
//  styles/flat-noite/kit.js — flat vector night look (matched to "O Último Homem – Parte 1")
//  Flat shapes, no outlines, one shade layer, rim/colour light from sources, bloom, vignette, fine grain.
//  Motion on 1s (smooth, physical). Helpers are prefixed fn… / FN… so they never clash with kit/core.js.
// =====================================================================
const FN = {
  navy0: '#0b0f24', navy1: '#141a3a', navy2: '#1f2556', navy3: '#2a3170', navy4: '#38408a',
  win: '#f5c75a', winD: '#c99a3a', red: '#ff3b4a', blue: '#2f7bff', blueL: '#4aa8ff', green: '#1fae4b', yellow: '#ffd23f',
  pink: '#ff5fb0', magenta: '#ff3fa4', white: '#ffffff', grey: '#8a90b0',
  skin: '#c4865a', skinD: '#a86c44', skinL: '#d29a6c', hair: '#1c140f',
  hood: '#4c4845', hoodD: '#3b3836', hoodL: '#5a5653', jeans: '#232a4f', jeansD: '#1b2142', shoe: '#e9e9ee', sole: '#c9c9d2', tee: '#2f8a55', teeD: '#287a4a',
  wSkin: '#f0c9a8', wSkinD: '#d9a882', cheek: 'rgba(236,104,104,0.6)',
};
const FONT_SUB = '"Inter Display Black", "Inter Black", "Inter", "Arial Black", "Helvetica Neue", Arial, sans-serif';
const FONT_MONO = '"JetBrains Mono", "DejaVu Sans Mono", Consolas, monospace';

// ---------- primitives
function fnPath(P) { ctx.beginPath(); P.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); }
function fnPoly(P, c) { fnPath(P); ctx.fillStyle = c; ctx.fill(); }
function fnRect(x, y, w, h, c) { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); }
function fnRR(x, y, w, h, r, c) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fillStyle = c; ctx.fill(); }
function fnCirc(x, y, r, c) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, TAU); ctx.fillStyle = c; ctx.fill(); }
function fnEll(x, y, rx, ry, c, rot = 0) { ctx.beginPath(); ctx.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot, 0, TAU); ctx.fillStyle = c; ctx.fill(); }
function fnLine(x1, y1, x2, y2, w, c, cap = 'round') { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineWidth = w; ctx.strokeStyle = c; ctx.lineCap = cap; ctx.stroke(); }
function fnStroke(P, w, c, closed = false) { ctx.beginPath(); P.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); if (closed) ctx.closePath(); ctx.lineWidth = w; ctx.strokeStyle = c; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
function fnLinGrad(x0, y0, x1, y1, stops) { const g = ctx.createLinearGradient(x0, y0, x1, y1); stops.forEach(([o, c]) => g.addColorStop(o, c)); return g; }
function fnSky(c0, c1, y0 = -200, y1 = 2100) { ctx.fillStyle = fnLinGrad(0, y0, 0, y1, [[0, c0], [1, c1]]); ctx.fillRect(-600, -600, W + 1200, H + 1200); }
function fnAlpha(a, f) { const k = ctx.globalAlpha; ctx.globalAlpha = k * clamp(a); f(); ctx.globalAlpha = k; }
function fnAt(x, y, s, f, rot = 0) { ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot); ctx.scale(s, Math.abs(s)); f(); ctx.restore(); }
// soft light: radial glow, additive
function fnGlow(x, y, r, c, a = 1) {
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha *= a;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, c); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore();
}
// volumetric cone from (x,y) towards angle ang (0 = down), half-width at length L
function fnCone(x, y, ang, L, half, c, a = 0.35, dust = 0) {
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha *= a;
  ctx.translate(x, y); ctx.rotate(ang);
  const g = ctx.createLinearGradient(0, 0, 0, L); g.addColorStop(0, c); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.beginPath(); ctx.moveTo(-half * 0.08, 0); ctx.lineTo(half * 0.08, 0); ctx.lineTo(half, L); ctx.lineTo(-half, L); ctx.closePath(); ctx.fillStyle = g; ctx.fill();
  if (dust) { const R = RNG('dust', Math.round(x), Math.round(y)); for (let i = 0; i < dust; i++) { const v = R.f(), yy = ((v * L + TT * 40 * (0.5 + R.f())) % L), xx = (R.f() * 2 - 1) * half * (yy / L); fnCirc(xx, yy, 1.5 + R.f() * 2.5, 'rgba(255,255,255,0.5)'); } }
  ctx.restore();
}
// coloured wash over everything drawn so far (siren light)
function fnWash(c, a) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = clamp(a); ctx.fillStyle = c; ctx.fillRect(0, 0, W, H); ctx.restore(); }
// siren phase: 0..1 red, blue alternating
const fnSiren = (t, rate = 2.2) => { const p = (t * rate) % 1; return { red: Math.max(0, Math.sin(p * TAU)), blue: Math.max(0, -Math.sin(p * TAU)) }; };
// rain / drizzle / particles in screen-ish world space
function fnParticles(key, n, c, o = {}) {
  const R = RNG('pt', key), sp = o.speed ?? 60, sz = o.size ?? 2.5, x0 = o.x0 ?? -100, x1 = o.x1 ?? W + 100, y0 = o.y0 ?? -100, y1 = o.y1 ?? H + 100;
  for (let i = 0; i < n; i++) {
    const bx = R.r(x0, x1), by = R.r(y0, y1), ph = R.f() * TAU, v = 0.5 + R.f();
    const y = y0 + mod(by - y0 + TT * sp * v, y1 - y0), x = bx + Math.sin(TT * 0.8 + ph) * 20 + (o.drift ?? 0) * TT * v;
    if (o.streak) fnLine(x, y, x - o.streak * 0.3, y - o.streak, sz, c); else fnCirc(mod(x - x0, x1 - x0) + x0, y, sz * (0.6 + 0.5 * R.f()), c);
  }
}
// ---------- easing / motion helpers
const fnE = (t, a, d, f = EZ.io) => f(clamp((TT - t) / d));           // eased progress of an action at t over d
const fnSpring = (t, a, b, p) => springMove(t, a, b, p || SPRING.snappy);
const fnShake = (t, amp, dur = 0.35, key = 'sh') => { const u = clamp((TT - t) / dur); if (u <= 0 || u >= 1) return [0, 0]; const k = amp * (1 - u) * (1 - u); return [Math.sin(TT * 91 + hash(key) % 7) * k, Math.cos(TT * 77 + 3) * k]; };
const fnPop = (t, d = 0.28) => { const u = clamp((TT - t) / d); if (u <= 0) return 0; return 1 + Math.sin(u * Math.PI) * 0.18 * (1 - u) + (EZ.o3(u) - 1); };
