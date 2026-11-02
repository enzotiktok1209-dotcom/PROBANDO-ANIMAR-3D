// =====================================================================
//  styles/flucht/kit.js — the look of "Flucht" (Die letzte Frau, Teil 7): flat 2D vector, no outlines,
//  one-tone-darker flat shading, soft gradients, night navy + snow white, heavy vignette, snowfall.
//  Primitives + palette + STYLE hooks. Characters live in chars.js, props/worlds in props.js, HUD/subs in hud.js.
//  Built on kit/core.js. Helper prefix: fl…
// =====================================================================
const FL = {
  night0: '#0f1424', night1: '#1c2440', night2: '#2a3558', navy: '#1b2236',
  snow: '#eef3fa', snowS: '#c9d3e3', snowD: '#9fadc4', fog: '#dfe6f1',
  moon: '#f4f1e6',
  skin: '#f6d2b3', skinS: '#e9b896', blush: '#f2a0a0',
  hair: '#ecc766', hairS: '#d2a646', hairD: '#b98c32',
  coat: '#9a6a3d', coatS: '#83562e', coatD: '#6d4625', button: '#4e3119',
  pants: '#1f2a4a', shoe: '#2a221e',
  blood: '#d0142c', bloodD: '#8e0b1d', bloodL: '#f0384f',
  kSkin: '#c99268', kSkinS: '#b27c55', beard: '#7a4c2c', beardS: '#5f3a20', hood: '#4b4c54', hoodS: '#393a41', hoodD: '#26272c', brow: '#33241b', scar: '#8a5638',
  fSkin: '#ddb592', fSkinS: '#c99d79', fHair: '#a3a19c', fHairS: '#86847f', stub: '#a29c93', shirt: '#f3f2ee', shirtS: '#d9d8d2', bruise: '#6a4a7c', bruiseD: '#3d2a48',
  olive: '#5d6b3a', oliveS: '#4a5630', oliveD: '#36401f', mask: '#141414', eyeRed: '#ff2b3a',
  car: '#3a3d45', carS: '#2b2d33', carD: '#1d1f24', glass: '#8fb4d6', glassD: '#3d5878', tire: '#151515', rim: '#8d929b',
  police: '#e9edf2', policeS: '#c5ccd6', sirenR: '#ff2d3d', sirenB: '#2f7bff',
  wood: '#7a4a2a', woodS: '#62391f', woodD: '#4a2a16', woodL: '#94603a', fire: '#ffb02e', fireD: '#ff5a1f', fireL: '#fff0a0',
  white: '#ffffff', black: '#000000', ink: '#0b0d14',
  yellow: '#ffd21f', red: '#ff3b4e', blue: '#2fa8ff', green: '#3be37a', pink: '#ff4fb4', grey: '#8a8f9c',
  hudY: '#ffd21f', hudR: '#ff3b4e', hudW: '#e8ecf3', hudG: '#3be37a', hudA: '#ffb23b',
};
const FL_FONT = '"Poppins", "Montserrat", "Inter", "Inter Display", "Arial Black", "Liberation Sans", "DejaVu Sans", sans-serif';
const FL_MONO = '"DejaVu Sans Mono", Consolas, Menlo, "Liberation Mono", monospace';

// ---- primitives (world coords; no outlines in this look)
function flPath(P) { ctx.beginPath(); P.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); }
function flFill(P, c, a = 1) { ctx.save(); ctx.globalAlpha *= a; flPath(P); ctx.fillStyle = c; ctx.fill(); ctx.restore(); }
function flSmooth(P, c, a = 1) {   // a closed shape through midpoints (rounded corners)
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath();
  const n = P.length, mid = (i) => [(P[i % n][0] + P[(i + 1) % n][0]) / 2, (P[i % n][1] + P[(i + 1) % n][1]) / 2];
  const m0 = mid(n - 1); ctx.moveTo(m0[0], m0[1]);
  for (let i = 0; i < n; i++) { const m = mid(i); ctx.quadraticCurveTo(P[i][0], P[i][1], m[0], m[1]); }
  ctx.closePath(); ctx.fillStyle = c; ctx.fill(); ctx.restore();
}
function flEll(x, y, rx, ry, c, a = 1, rot = 0) { ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot, 0, TAU); ctx.fillStyle = c; ctx.fill(); ctx.restore(); }
function flRect(x, y, w, h, r, c, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fillStyle = c; ctx.fill(); ctx.restore(); }
function flLine(P, c, w, a = 1, cap = 'round') { ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); P.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.strokeStyle = c; ctx.lineWidth = w; ctx.lineCap = cap; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore(); }
function flCurve(x0, y0, cx, cy, x1, y1, c, w, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo(cx, cy, x1, y1); ctx.strokeStyle = c; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore(); }
// a capsule limb from a to b
function flLimb(a, b, w, c) { flLine([a, b], c, w); }
function flGrad(x0, y0, x1, y1, stops) { const g = ctx.createLinearGradient(x0, y0, x1, y1); stops.forEach(([o, c]) => g.addColorStop(o, c)); return g; }
function flRad(x, y, r0, r1, stops) { const g = ctx.createRadialGradient(x, y, r0, x, y, r1); stops.forEach(([o, c]) => g.addColorStop(o, c)); return g; }
function flGlow(x, y, r, c, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = flRad(x, y, 0, r, [[0, c], [1, 'rgba(0,0,0,0)']]); ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.restore(); }
function flBg(stops, x0 = 0, y0 = 0, x1 = 0, y1 = H) { ctx.save(); ctx.fillStyle = flGrad(x0, y0, x1, y1, stops); ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.restore(); }
const flRGBA = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
// spring pop helpers on the shot clock
const flIn = (t, d = 0.35) => springEase(TT - t, 260, 18) * (TT >= t ? 1 : 0);   // 0 -> 1 with overshoot
const flE = (t, d) => EZ.io(clamp((TT - t) / d));
// deterministic hand shake (camera / tremble)
function flShake(t, amp, freq = 22, key = 1) { return [Math.sin(t * freq + key) * amp + Math.sin(t * freq * 1.7 + key * 3) * amp * 0.5, Math.cos(t * freq * 1.3 + key * 2) * amp + Math.sin(t * freq * 2.3 + key) * amp * 0.4]; }

// ---- falling snow (world-space, 3 parallax layers), wind dx per second
function flSnow(o = {}) {
  const n = o.n ?? 120, wind = o.wind ?? 40, speed = o.speed ?? 1, t = TT, R = RNG('snow', o.key ?? 0);
  ctx.save();
  for (let i = 0; i < n; i++) {
    const layer = i % 3, sz = [2.2, 3.6, 6][layer] * (o.size ?? 1), v = [70, 120, 210][layer] * speed;
    const x0 = R.r(-200, W + 200), y0 = R.r(0, H), ph = R.r(0, TAU);
    const y = mod(y0 + t * v, H + 40) - 20, x = mod(x0 + t * wind * (0.6 + layer * 0.4) + Math.sin(t * 1.3 + ph) * 18, W + 400) - 200;
    ctx.globalAlpha = (o.alpha ?? 0.85) * [0.45, 0.7, 0.95][layer];
    ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(x, y, sz, 0, TAU); ctx.fill();
  }
  ctx.restore();
}
// stars twinkle
function flStars(n = 60, y1 = 900, key = 0) { const R = RNG('stars', key); ctx.save(); for (let i = 0; i < n; i++) { const x = R.r(0, W), y = R.r(0, y1), s = R.r(1, 3), tw = 0.5 + 0.5 * Math.sin(TT * R.r(1, 4) + i); ctx.globalAlpha = 0.35 + 0.6 * tw; ctx.fillStyle = '#fff'; ctx.fillRect(x, y, s, s); } ctx.restore(); }
function flMoon(x, y, r) { flGlow(x, y, r * 4, 'rgba(220,230,255,0.35)'); flEll(x, y, r, r, FL.moon); flEll(x - r * 0.3, y - r * 0.2, r * 0.18, r * 0.18, '#e3dfd1'); flEll(x + r * 0.25, y + r * 0.3, r * 0.12, r * 0.12, '#e3dfd1'); }

// ---- the vignette of the reference (heavy, dark corners) and a soft grain
function flVignette(k = 1) {
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = flRad(W / 2, H * 0.42, H * 0.22, H * 0.78, [[0, 'rgba(0,0,0,0)'], [0.55, `rgba(0,0,0,${0.18 * k})`], [1, `rgba(0,0,0,${0.82 * k})`]]);
  ctx.fillRect(0, 0, W, H); ctx.restore();
}

// =====================================================================
//  STYLE hooks (the piece uses its own hard-cut renderer; these satisfy the contract and the board)
// =====================================================================
const STYLE = {
  name: 'flucht',
  paper: '#0f1424',
  backdrop(c) { fillAll(c); },
  window(P, key, src) { ctx.save(); trace(P, true); ctx.clip(); ctx.drawImage(src, 0, 0); ctx.restore(); },
  blob(P, c) { flFill(P, c); },
  hero(x, y, r) { flEll(x, y, r, r, FL.hair); },
  heroColor: '#ecc766',
  post() {},
  ones: true,
};
