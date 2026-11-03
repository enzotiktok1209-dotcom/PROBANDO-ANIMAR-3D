// =====================================================================
const STYLE = { name: "tire-vector", ones: true };   // the build wants a STYLE block; this piece draws through its own look.js
//  look.js — the drawing vocabulary: gradients, rounded shapes, glow, type, tags, LCD digits,
//  cached layers (static scenery drawn once per worker), glowing dot sprites.
// =====================================================================
const PAL = {
  red: '#d9161f', redHi: '#ff4d4f', redLo: '#6e070d', night: '#0b1020', navy: '#121a33',
  hot: '#ff7a1a', hotHi: '#ffc35a', cold: '#4fb4ff', coldHi: '#bfe6ff', good: '#3ee07f', bad: '#ff3b3b',
  yellow: '#ffd23a', rubber: '#1b1c20', steel: '#c9ced6', select: '#3f7cff',
};
const lin = (x0, y0, x1, y1, stops) => { const g = ctx.createLinearGradient(x0, y0, x1, y1); for (const [o, c] of stops) g.addColorStop(o, c); return g; };
const rad = (x, y, r0, r1, stops, x1 = x, y1 = y) => { const g = ctx.createRadialGradient(x, y, r0, x1, y1, r1); for (const [o, c] of stops) g.addColorStop(o, c); return g; };
function rrPath(x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function fillRR(x, y, w, h, r, fill) { rrPath(x, y, w, h, r); ctx.fillStyle = fill; ctx.fill(); }
function poly(P, fill, stroke, lw = 2) { ctx.beginPath(); P.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.stroke(); } }
function circle(x, y, r, fill) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.01, r), 0, TAU); ctx.fillStyle = fill; ctx.fill(); }
function ell(x, y, rx, ry, fill, rot = 0) { ctx.beginPath(); ctx.ellipse(x, y, Math.max(0.01, rx), Math.max(0.01, ry), rot, 0, TAU); ctx.fillStyle = fill; ctx.fill(); }
function glow(color, blur, fn) { ctx.save(); ctx.shadowColor = color; ctx.shadowBlur = blur; fn(); ctx.restore(); }
function withAlpha(a, fn) { if (a <= 0.001) return; ctx.save(); ctx.globalAlpha *= clamp(a); fn(); ctx.restore(); }
const mixC = (a, b, u) => { const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); const A = p(a), Bq = p(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, Bq[i], clamp(u)))).join(',')})`; };
const rgba = (h, a) => { const n = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); return `rgba(${n[0]},${n[1]},${n[2]},${a})`; };
// temperature colour: -1 cold blue, 0 neutral white-blue, 1 hot orange
const tempC = (k) => (k < 0 ? mixC('#cfe9ff', '#3d8cff', -k) : k < 0.5 ? mixC('#cfe9ff', '#ffd08a', k * 2) : mixC('#ffd08a', '#ff6a12', (k - 0.5) * 2));

// ---------------------------------------------------------------- type
function tText(str, x, y, size, o = {}) {
  ctx.save();
  ctx.font = `${o.weight ?? 800} ${size}px ${FONT}`; ctx.textAlign = o.align ?? 'center'; ctx.textBaseline = 'middle';
  if (o.letter) ctx.letterSpacing = o.letter + 'px';
  let s = 1; if (o.maxW) { const w = ctx.measureText(str).width; if (w > o.maxW) s = o.maxW / w; }
  ctx.translate(x, y); ctx.scale(s, s);
  if (o.shadow !== false) { ctx.fillStyle = o.shadowC ?? 'rgba(0,0,0,0.45)'; ctx.fillText(str, 0, size * 0.06); }
  if (o.stroke) { ctx.lineJoin = 'round'; ctx.lineWidth = o.strokeW ?? size * 0.14; ctx.strokeStyle = o.stroke; ctx.strokeText(str, 0, 0); }
  if (o.glowC) { ctx.shadowColor = o.glowC; ctx.shadowBlur = o.glowB ?? size * 0.5; }
  ctx.fillStyle = o.color ?? '#fff'; ctx.fillText(str, 0, 0);
  ctx.restore();
}
function textW(str, size, weight = 800) { ctx.save(); ctx.font = `${weight} ${size}px ${FONT}`; const w = ctx.measureText(str).width; ctx.restore(); return w; }

// a pill tag that springs in at t0 (and out at o.out), like the reference's value labels
function tag(str, x, y, t0, o = {}) {
  if (TT < t0 - 0.001) return;
  let k = springEase(TT - t0, 320, 15);
  if (o.out && TT > o.out) k *= 1 - EZ.i2((TT - o.out) / 0.2);
  if (k <= 0.001) return;
  const size = o.size ?? 44, padX = size * 0.5, w = textW(str, size, 800) + padX * 2 + (o.icon ? size * 1.0 : 0), h = size * 1.5;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  fillRR(-w / 2, -h / 2 + 8, w, h, h * 0.32, 'rgba(0,0,0,0.35)');
  fillRR(-w / 2, -h / 2, w, h, h * 0.32, o.bg ?? 'rgba(14,18,30,0.86)');
  rrPath(-w / 2 + 1.5, -h / 2 + 1.5, w - 3, h - 3, h * 0.3); ctx.lineWidth = 3; ctx.strokeStyle = o.edge ?? 'rgba(255,255,255,0.18)'; ctx.stroke();
  let tx = 0;
  if (o.icon) { const ix = -w / 2 + padX + size * 0.4; o.icon(ix, 0, size * 0.42); tx = size * 0.5; }
  tText(str, tx, 2, size, { color: o.fg ?? '#fff', shadow: false, glowC: o.glowC, glowB: o.glowB });
  ctx.restore();
}

// ---------------------------------------------------------------- 7-segment LCD digits
const SEG = { 0: 'abcdef', 1: 'bc', 2: 'abdeg', 3: 'abcdg', 4: 'bcfg', 5: 'acdfg', 6: 'acdefg', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg', '-': 'g', ' ': '' };
function lcd(str, x, y, h, color, o = {}) {
  const w = h * 0.52, t = h * 0.13, gap = h * 0.17;
  const segs = { a: [0, 0, 1, 0], b: [1, 0, 1, 0.5], c: [1, 0.5, 1, 1], d: [0, 1, 1, 1], e: [0, 0.5, 0, 1], f: [0, 0, 0, 0.5], g: [0, 0.5, 1, 0.5] };
  const total = [...str].reduce((s, ch) => s + (ch === '.' ? h * 0.18 : w + gap), -gap);
  let cx = o.align === 'left' ? x : o.align === 'right' ? x - total : x - total / 2;
  ctx.save(); ctx.lineCap = 'round';
  const draw = (ch, on) => {
    if (ch === '.') { if (on) circle(cx + h * 0.02, y + h / 2 - t * 0.4, t * 0.6, color); cx += h * 0.18; return; }
    const set = SEG[ch] ?? '';
    for (const [k, [x0, y0, x1, y1]] of Object.entries(segs)) {
      const lit = set.includes(k);
      if (!lit && !o.ghost) continue;
      ctx.strokeStyle = lit ? color : (o.ghost || 'rgba(255,255,255,0.05)'); ctx.lineWidth = t;
      const sx = cx + x0 * w - y0 * h * 0.08, sy = y - h / 2 + y0 * h, ex = cx + x1 * w - y1 * h * 0.08, ey = y - h / 2 + y1 * h;
      const shrink = 0.16;
      ctx.beginPath(); ctx.moveTo(lerp(sx, ex, shrink), lerp(sy, ey, shrink)); ctx.lineTo(lerp(sx, ex, 1 - shrink), lerp(sy, ey, 1 - shrink)); ctx.stroke();
    }
    cx += w + gap;
  };
  if (o.glow !== false) { ctx.shadowColor = color; ctx.shadowBlur = h * 0.35; }
  for (const ch of str) draw(ch, true);
  ctx.restore();
}

// ---------------------------------------------------------------- cached static layers (drawn once per worker, deterministic)
const LAYERS = {};
function layer(key, w, h, fn) {
  if (LAYERS[key]) return LAYERS[key];
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const prev = ctx; ctx = c.getContext('2d'); fn(w, h); ctx = prev;
  return (LAYERS[key] = c);
}
// a soft glowing dot sprite (for particles and lights), drawn with 'lighter'
function dotSprite(color, size = 64) {
  return layer('dot' + color + size, size, size, (w) => {
    ctx.fillStyle = rad(w / 2, w / 2, 0, w / 2, [[0, '#ffffff'], [0.18, color], [0.45, rgba(color, 0.35)], [1, rgba(color, 0)]]); ctx.fillRect(0, 0, w, w);
  });
}
function sprite(img, x, y, s, a = 1) { if (a <= 0.003) return; const ga = ctx.globalAlpha; ctx.globalAlpha = ga * a; ctx.drawImage(img, x - s / 2, y - s / 2, s, s); ctx.globalAlpha = ga; }

// soft light pool / god ray
function lightCone(x, y, topW, botW, len, color, a) {
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = lin(x, y, x, y + len, [[0, rgba(color, a)], [1, rgba(color, 0)]]);
  ctx.beginPath(); ctx.moveTo(x - topW / 2, y); ctx.lineTo(x + topW / 2, y); ctx.lineTo(x + botW / 2, y + len); ctx.lineTo(x - botW / 2, y + len); ctx.closePath(); ctx.fill();
  ctx.restore();
}
function bloom(x, y, r, color, a = 1) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha *= a; ctx.fillStyle = rad(x, y, 0, r, [[0, rgba(color, 0.9)], [0.25, rgba(color, 0.35)], [1, rgba(color, 0)]]); ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore(); }

// heat shimmer lines rising from a point
function heatWaves(x, y, w, h, k, key = 'hw') {
  if (k <= 0.01) return;
  ctx.save(); ctx.lineCap = 'round';
  for (let i = 0; i < 5; i++) {
    const R = RNG(key, i), x0 = x + (i - 2) * w / 5 + R.n(12), ph = TT * 1.6 + R.f() * 3, rise = (ph % 1);
    ctx.globalAlpha = k * 0.5 * Math.sin(rise * Math.PI);
    ctx.strokeStyle = 'rgba(255,220,170,0.9)'; ctx.lineWidth = 5;
    ctx.beginPath();
    for (let j = 0; j <= 20; j++) { const u = j / 20, yy = y - rise * h * 0.4 - u * h * 0.6, xx = x0 + Math.sin(u * 9 + TT * 5 + i) * 14 * u; j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
    ctx.stroke();
  }
  ctx.restore();
}
