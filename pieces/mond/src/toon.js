// =====================================================================
//  toon.js — the look: flat cartoon shapes (no outlines), soft shading, ray backdrops,
//  bold outlined type, stickers, the money HUD, and deterministic particle physics.
// =====================================================================
const PAL = {
  ink: '#1b1530', white: '#ffffff', paper: '#fff7ea',
  purple: '#5a2bd6', purpleD: '#2a1170', purpleL: '#8c5cff',
  green: '#1fae5b', greenD: '#0b6b37', greenL: '#5be38f',
  orange: '#ff8a1e', orangeD: '#d4520a', orangeL: '#ffc35c',
  blue: '#2f6df6', blueD: '#1d48b8', blueL: '#7fb0ff',
  red: '#ef3b3b', redD: '#a81f2a', pink: '#ff4fa3', yellow: '#ffd23f', gold: '#ffc21a', goldD: '#c98a00',
  cash: '#4fbf6b', cashD: '#2e8a4a', cashL: '#a6f0b4',
};
const STYLE = { name: 'flat-toon', paper: '#120e22', ones: true, backdrop() {}, window() {}, blob() {}, hero() {}, post() {} };

// ---------------------------------------------------------------- shapes
function rrPath(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, Math.max(0, Math.min(r, w / 2, h / 2))); }
function fillRR(x, y, w, h, r, c) { rrPath(x, y, w, h, r); ctx.fillStyle = c; ctx.fill(); }
function circ(x, y, r, c) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, TAU); ctx.fillStyle = c; ctx.fill(); }
function ell(x, y, rx, ry, c, rot = 0) { ctx.beginPath(); ctx.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot, 0, TAU); ctx.fillStyle = c; ctx.fill(); }
function poly(P, c) { ctx.beginPath(); P.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.fillStyle = c; ctx.fill(); }
function line(x0, y0, x1, y1, w, c, cap = 'round') { ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.lineWidth = w; ctx.strokeStyle = c; ctx.lineCap = cap; ctx.stroke(); }
function lin(x0, y0, x1, y1, stops) { const g = ctx.createLinearGradient(x0, y0, x1, y1); stops.forEach(([o, c]) => g.addColorStop(o, c)); return g; }
function rad(x, y, r0, r1, stops) { const g = ctx.createRadialGradient(x, y, r0, x, y, r1); stops.forEach(([o, c]) => g.addColorStop(o, c)); return g; }
function shadowEll(x, y, rx, ry, a = 0.35) {
  ctx.save(); ctx.translate(x, y); ctx.scale(1, ry / rx);
  ctx.fillStyle = rad(0, 0, 0, rx, [[0, `rgba(10,5,30,${a})`], [0.6, `rgba(10,5,30,${a * 0.5})`], [1, 'rgba(10,5,30,0)']]);
  ctx.beginPath(); ctx.arc(0, 0, rx, 0, TAU); ctx.fill(); ctx.restore();
}
function glow(x, y, r, c, a = 0.6) {
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha *= a;
  ctx.fillStyle = rad(x, y, 0, r, [[0, c], [1, 'rgba(0,0,0,0)']]); ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore();
}
const shade = (hex, k) => { const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const f = (v) => Math.round(k < 0 ? v * (1 + k) : v + (255 - v) * k); return `rgb(${f(r)},${f(g)},${f(b)})`; };

// ---------------------------------------------------------------- backdrops
// full-frame sunburst (the reference's signature backdrop), rotating slowly
function rays(c0, c1, o = {}) {
  const cx = o.cx ?? W / 2, cy = o.cy ?? H * 0.42, n = o.n ?? 18, rot = (o.rot ?? 0) + TT * (o.spin ?? 0.05);
  ctx.fillStyle = c0; ctx.fillRect(-W, -H, W * 3, H * 3);
  ctx.fillStyle = c1;
  for (let i = 0; i < n; i++) {
    const a = rot + (i / n) * TAU, b = a + (TAU / n) * 0.5;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * 3000, cy + Math.sin(a) * 3000); ctx.lineTo(cx + Math.cos(b) * 3000, cy + Math.sin(b) * 3000); ctx.fill();
  }
  ctx.fillStyle = rad(cx, cy, 0, 1100, [[0, 'rgba(255,255,255,0.32)'], [0.5, 'rgba(255,255,255,0.06)'], [1, 'rgba(0,0,0,0.38)']]);
  ctx.fillRect(-W, -H, W * 3, H * 3);
}
function vignette(a = 0.55, r0 = 0.45) {
  ctx.save(); screenT();
  ctx.fillStyle = rad(W / 2, H / 2, H * r0 * 0.5, H * 0.78, [[0, 'rgba(0,0,0,0)'], [1, `rgba(0,0,0,${a})`]]);
  ctx.fillRect(0, 0, W, H); ctx.restore();
}
function screenT() { ctx.setTransform(SC, 0, 0, SC, 0, 0); }

// ---------------------------------------------------------------- type
function tText(str, x, y, size, o = {}) {
  ctx.save();
  ctx.font = `${o.weight ?? 900} ${size}px ${FONT}`; ctx.textAlign = o.align ?? 'center'; ctx.textBaseline = 'middle';
  if (o.letter) ctx.letterSpacing = o.letter + 'px';
  let s = 1; if (o.maxW) { const w = ctx.measureText(str).width; if (w > o.maxW) s = o.maxW / w; }
  ctx.translate(x, y); ctx.scale(s, s);
  if (o.shadow !== false) { ctx.fillStyle = o.shadowC ?? 'rgba(0,0,0,0.45)'; ctx.fillText(str, 0, size * 0.07); }
  if (o.stroke) { ctx.lineJoin = 'round'; ctx.lineWidth = o.strokeW ?? size * 0.16; ctx.strokeStyle = o.stroke; ctx.strokeText(str, 0, 0); }
  ctx.fillStyle = o.color ?? '#fff'; ctx.fillText(str, 0, 0);
  ctx.restore();
}
function textW(str, size, weight = 900) { ctx.save(); ctx.font = `${weight} ${size}px ${FONT}`; const w = ctx.measureText(str).width; ctx.restore(); return w; }

// sticker / tag: a pill that pops in on a spring at t0 (absolute), tilts a little, has a hard shadow
function sticker(str, x, y, t0, o = {}) {
  if (TT < t0) return;
  const k = springEase(TT - t0, 300, 13), size = o.size ?? 46, padX = size * 0.55, w = textW(str, size, 900) + padX * 2, h = size * 1.55;
  ctx.save(); ctx.translate(x, y); ctx.rotate((o.rot ?? -0.04) * (2 - k)); ctx.scale(k, k);
  if (o.out && TT > o.out) { const u = clamp((TT - o.out) / 0.18); ctx.scale(1 - u, 1 - u); }
  fillRR(-w / 2 + 8, -h / 2 + 10, w, h, h * 0.28, 'rgba(0,0,0,0.35)');
  fillRR(-w / 2, -h / 2, w, h, h * 0.28, o.bg ?? PAL.red);
  if (o.border !== false) { rrPath(-w / 2 + 5, -h / 2 + 5, w - 10, h - 10, h * 0.22); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.stroke(); }
  tText(str, 0, 2, size, { color: o.fg ?? '#fff', shadow: false });
  ctx.restore();
}

// ---------------------------------------------------------------- money HUD (top of frame, screen space)
const fmtEUR = (v, cents = false) => {
  const neg = v < 0; v = Math.abs(v);
  const [i, d] = v.toFixed(cents ? 2 : 0).split('.');
  return (neg ? '−' : '') + i.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (cents ? ',' + d : '') + ' €';
};
// value rolls between keyframes [[t, v], ...] (absolute times); deltas pop out in red/green
function hud(title, keys, o = {}) {
  const x = o.x ?? W / 2, y = o.y ?? 250, cents = o.cents ?? false;
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++) { const u = EZ.o3(clamp((TT - keys[i][0]) / 0.7)); v += (keys[i][1] - keys[i - 1][1]) * u; }
  const s = o.scale ?? 1, k = o.t0 != null ? springEase(TT - o.t0, 280, 18) : 1;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k);
  const val = fmtEUR(v, cents), w = Math.max(360, textW(val, 74, 800) + 90);
  fillRR(-w / 2 + 6, -70 + 10, w, 150, 26, 'rgba(0,0,0,0.35)');
  fillRR(-w / 2, -70, w, 150, 26, '#141026');
  fillRR(-w / 2, -70, w, 46, { tl: 26 } ? 26 : 0, '#231c40'); ctx.fillStyle = '#141026'; ctx.fillRect(-w / 2, -40, w, 16);
  tText(title, 0, -46, 26, { color: '#9f95c9', shadow: false, letter: 4, weight: 800 });
  const flash = keys.slice(1).some(([t]) => TT >= t && TT < t + 0.25);
  tText(val, 0, 22, 74, { color: o.color ?? (flash ? '#ffffff' : '#41f08a'), shadow: false, weight: 800 });
  ctx.restore();
  // the deltas fly out of the box
  for (let i = 1; i < keys.length; i++) {
    const [t, b] = keys[i], d = b - keys[i - 1][1], u = (TT - t) / 1.2;
    if (u < 0 || u > 1 || Math.abs(d) < 0.001) continue;
    ctx.save(); ctx.globalAlpha = u < 0.75 ? 1 : 1 - (u - 0.75) / 0.25;
    const sc = springEase(TT - t, 300, 12);
    ctx.translate(x + (o.dx ?? 0) * s, y + 128 * s + u * 50); ctx.scale(sc, sc); ctx.rotate(-0.05);
    tText((d > 0 ? '+' : '') + fmtEUR(d, cents), 0, 0, 54, { color: d < 0 ? '#ff4a4a' : '#41f08a', stroke: '#1b0f2e', strokeW: 10 });
    ctx.restore();
  }
}

// ---------------------------------------------------------------- small things
function sparkle(x, y, s, c = '#fff', rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath();
  for (let i = 0; i < 8; i++) { const r = i % 2 ? s * 0.22 : s; const a = (i / 8) * TAU; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
  ctx.closePath(); ctx.fillStyle = c; ctx.fill(); ctx.restore();
}
function twinkles(seed, x, y, w, h, n, o = {}) {
  const R = RNG('tw', seed);
  for (let i = 0; i < n; i++) {
    const px = x + R.f() * w, py = y + R.f() * h, ph = R.f() * TAU, sp = 3 + R.f() * 4, s = (o.s ?? 18) * (0.5 + R.f());
    const k = Math.max(0, Math.sin(TT * sp + ph)); if (k < 0.05) continue;
    sparkle(px, py, s * k, o.c ?? '#fff', TT * 2 + ph);
  }
}
function impactLines(x, y, r0, r1, n, t0, o = {}) {
  const u = clamp((TT - t0) / (o.d ?? 0.35)); if (u <= 0 || u >= 1) return;
  const R = RNG('imp', t0);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + R.n(0.15), a0 = r0 + (r1 - r0) * EZ.o3(u) * 0.5, a1 = r0 + (r1 - r0) * EZ.o3(u);
    line(x + Math.cos(a) * a0, y + Math.sin(a) * a0, x + Math.cos(a) * a1, y + Math.sin(a) * a1, (o.w ?? 12) * (1 - u), o.c ?? '#fff');
  }
}
function speedLines(n, a = 0.5, seed = 'sl') {
  const R = RNG(seed, Math.floor(TT * 15));
  ctx.save(); screenT(); ctx.globalAlpha = a;
  for (let i = 0; i < n; i++) {
    const ang = R.f() * TAU, r0 = 420 + R.f() * 260, r1 = 1300;
    ctx.beginPath(); ctx.moveTo(W / 2 + Math.cos(ang) * r0, H / 2 + Math.sin(ang) * r0);
    ctx.lineTo(W / 2 + Math.cos(ang + 0.012) * r1, H / 2 + Math.sin(ang + 0.012) * r1); ctx.lineTo(W / 2 + Math.cos(ang - 0.012) * r1, H / 2 + Math.sin(ang - 0.012) * r1);
    ctx.fillStyle = '#fff'; ctx.fill();
  }
  ctx.restore();
}

// ---------------------------------------------------------------- money and coins
function bill(x, y, w, rot = 0, flip = 1, o = {}) {
  const h = w * 0.5;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, flip);
  fillRR(-w / 2, -h / 2, w, h, w * 0.05, flip > 0 ? PAL.cash : PAL.cashD);
  fillRR(-w / 2 + w * 0.05, -h / 2 + h * 0.1, w * 0.9, h * 0.8, w * 0.04, flip > 0 ? '#63d17e' : '#3b9e58');
  circ(0, 0, h * 0.3, flip > 0 ? PAL.cashD : '#226b3a');
  if (w > 50) tText(o.label ?? '€', 0, 1, h * 0.4, { color: PAL.cashL, shadow: false, weight: 900 });
  if (w > 120 && o.num) { tText(o.num, -w * 0.33, -h * 0.25, h * 0.2, { color: PAL.cashL, shadow: false }); tText(o.num, w * 0.33, h * 0.25, h * 0.2, { color: PAL.cashL, shadow: false }); }
  ctx.restore();
}
// coin seen at angle: sx = |cos| of the spin, shows the rim when thin
function coin(x, y, r, o = {}) {
  const sx = o.sx ?? 1;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0);
  ell(r * 0.06 * Math.sign(sx || 1), r * 0.08, r * Math.abs(sx) + r * 0.06, r, PAL.goldD);
  ell(0, 0, r * Math.abs(sx), r, PAL.gold);
  ell(0, 0, r * 0.78 * Math.abs(sx), r * 0.78, '#ffd75a');
  if (Math.abs(sx) > 0.35) { ctx.save(); ctx.scale(Math.abs(sx), 1); tText(o.label ?? '1', 0, r * 0.04, r * 0.95, { color: PAL.goldD, shadow: false, weight: 900 }); ctx.restore(); }
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, r * Math.abs(sx), r, 0, 0, TAU); ctx.clip();
  ctx.globalAlpha = 0.55; poly([[-r * 1.2, -r * 0.2], [-r * 0.5, -r * 1.2], [-r * 0.2, -r * 1.2], [-r * 0.9, -r * 0.2 + r * 0.3]], '#fff8d0'); ctx.restore();
  ctx.restore();
}

// ---------------------------------------------------------------- deterministic physics
// falling banknotes: spawn above, terminal velocity, side-to-side flutter, rotation and a 3D flip
function billRain(seed, t0, n, o = {}) {
  const lt = TT - t0; if (lt < 0) return;
  const R = RNG('rain', seed), x0 = o.x0 ?? -100, x1 = o.x1 ?? W + 100, top = o.top ?? -200, bottom = o.bottom ?? H + 200;
  for (let i = 0; i < n; i++) {
    const delay = R.f() * (o.spread ?? 1.6), x = x0 + R.f() * (x1 - x0), v = 380 + R.f() * 380, sway = 40 + R.f() * 90, fr = 1.5 + R.f() * 2.5, ph = R.f() * TAU;
    const w = (o.w ?? 110) * (0.65 + R.f() * 0.6), t = lt - delay; if (t < 0) continue;
    // a burst launches notes up first (o.burst: origin), else they just fall
    let px, py;
    if (o.burst) { const ang = -Math.PI / 2 + R.n(1.1), sp = 900 + R.f() * 900; px = o.burst[0] + Math.cos(ang) * sp * t * Math.exp(-t * 1.2) + Math.sin(t * fr + ph) * sway * clamp(t); py = o.burst[1] + Math.sin(ang) * sp * t * Math.exp(-t * 1.6) + 260 * t * t; }
    else { px = x + Math.sin(t * fr + ph) * sway; py = top + v * t; }
    if (py > bottom) continue;
    bill(px, py, w, Math.sin(t * fr * 0.8 + ph) * 0.9 + R.n(0.4), Math.cos(t * (3 + R.f() * 4) + ph));
  }
}
// a coin dropped from (x, y0) bouncing on floor y1: piecewise parabolas, restitution e
function bounceY(t, y0, y1, g = 4200, e = 0.45) {
  const h = y1 - y0; if (t <= 0) return y0;
  let v = Math.sqrt(2 * g * h), tf = v / g;   // first fall
  if (t < tf) return y0 + 0.5 * g * t * t;
  t -= tf; v *= e;
  for (let k = 0; k < 6; k++) { const tb = (2 * v) / g; if (t < tb) return y1 - (v * t - 0.5 * g * t * t); t -= tb; v *= e; }
  return y1;
}
function confetti(seed, t0, n, o = {}) {
  const lt = TT - t0; if (lt < 0 || lt > (o.life ?? 3)) return;
  const R = RNG('conf', seed), cols = o.cols ?? [PAL.yellow, PAL.pink, PAL.blueL, PAL.greenL, '#fff'];
  for (let i = 0; i < n; i++) {
    const ang = -Math.PI / 2 + R.n(o.spreadA ?? 1.3), sp = 700 + R.f() * 1300, x = (o.x ?? W / 2) + Math.cos(ang) * sp * (1 - Math.exp(-lt * 2.2)) / 2.2;
    const y = (o.y ?? H / 2) + Math.sin(ang) * sp * (1 - Math.exp(-lt * 2.2)) / 2.2 + 300 * lt * lt;
    const s = 10 + R.f() * 14;
    ctx.save(); ctx.translate(x, y); ctx.rotate(lt * (4 + R.f() * 6)); ctx.scale(1, Math.cos(lt * 8 + i));
    ctx.fillStyle = cols[i % cols.length]; ctx.fillRect(-s / 2, -s / 3, s, s * 0.66); ctx.restore();
  }
}
