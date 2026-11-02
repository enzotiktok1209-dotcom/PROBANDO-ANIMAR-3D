// =====================================================================
//  styles/flat-noir/kit.js — flat vector cartoon, cold slate-blue world, black silhouettes with glowing eyes.
//  Clean dark outlines of constant weight, flat fills with one shadow tone, no texture; a soft vignette.
//  Bold condensed captions (word by word) with yellow / red key words; white cards for names and rules.
//  Motion on 1s (30fps), a slow push-in on every shot. Built on kit/core.js; own helpers are prefixed fc.
// =====================================================================
const FC = {
  line: '#151a24', ink: '#1d2330',
  wall: '#4f6080', wallD: '#3d4c68', wallL: '#6a7c9c', ceil: '#3f4d68', floor: '#7f8ba0', floorD: '#69758b',
  steel: '#8e9ab0', steelD: '#6d7a92', wood: '#b88a55', woodD: '#946a3c',
  sheet: '#cfd7e6', sheetD: '#aab5ca', gown: '#a9c9e6', gownDot: '#2d4f80',
  skin: '#eabf91', skinD: '#cf9f70', skin2: '#8a5a3a', skin2D: '#6e452b', hair: '#17181d',
  scrub: '#233766', scrubD: '#192950',
  zomb: '#11141b', zombRim: '#2a3244', eye: '#f4f7ff',
  mon: '#10161d', ecg: '#3fd28a', spo: '#5aa9e6',
  yellow: '#f5b731', orange: '#f08a2c', red: '#e8443a', card: '#f1eee7', sock: '#e7c43a',
  paper: '#2b3447',
};
const FCF = '"Oswald", "Bebas Neue", Impact, "Arial Narrow", "Liberation Sans Narrow", sans-serif';

// ---- shapes: flat fill + constant dark outline (divided by the camera zoom so the line stays constant)
const fcZ = () => ctx.getTransform().a || 1;
function fcPoly(P, fill, o = {}) {
  ctx.save(); ctx.beginPath(); P.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); if (o.open !== true) ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (o.line !== false) { ctx.lineWidth = (o.w ?? 3.5) / fcZ() * (o.scale ?? 1); ctx.strokeStyle = o.line || FC.line; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); }
  ctx.restore();
}
function fcPath(build, fill, o = {}) {   // build(ctx) draws a path; then fill + outline
  ctx.save(); ctx.beginPath(); build(ctx);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (o.line !== false) { ctx.lineWidth = (o.w ?? 3.5) / fcZ(); ctx.strokeStyle = o.line || FC.line; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); }
  ctx.restore();
}
const fcRect = (x, y, w, h, fill, o = {}) => fcPath((g) => (o.r ? g.roundRect(x, y, w, h, o.r) : g.rect(x, y, w, h)), fill, o);
const fcCirc = (x, y, r, fill, o = {}) => fcPath((g) => g.ellipse(x, y, r, o.ry ?? r, o.rot ?? 0, 0, TAU), fill, o);
function fcLine(P, color, w = 3.5) { ctx.save(); ctx.beginPath(); P.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.lineWidth = w / fcZ(); ctx.strokeStyle = color; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore(); }
function fcClip(build, fn) { ctx.save(); ctx.beginPath(); build(ctx); ctx.clip(); fn(); ctx.restore(); }
function fcDots(bb, color, step, r, key) {   // the gown's dot pattern (offset rows)
  ctx.save(); ctx.fillStyle = color;
  for (let y = bb[1], row = 0; y < bb[3]; y += step, row++) for (let x = bb[0] + (row % 2) * step / 2; x < bb[2]; x += step) { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }
  ctx.restore();
}
function fcGlow(x, y, r, color, a = 0.6) {
  ctx.save(); const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, color); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.globalAlpha = a; ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore();
}
// the constant vignette: call last in every scene (before its captions, which go through DEFER)
function fcVignette(a = 0.62) {
  ctx.save(); screen(); const g = ctx.createRadialGradient(W / 2, H * 0.46, W * 0.35, W / 2, H * 0.5, H * 0.72);
  g.addColorStop(0, 'rgba(8,10,16,0)'); g.addColorStop(1, `rgba(8,10,16,${a})`); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
}
// a whole-frame colour wash (the red danger tint, the blackout): multiply, at screen size
function fcTint(color, a = 1, mode = 'multiply') { ctx.save(); screen(); ctx.globalCompositeOperation = mode; ctx.globalAlpha = a; ctx.fillStyle = color; ctx.fillRect(0, 0, W, H); ctx.restore(); }

// ---- the ECG trace (a heart monitor's line), scrolling with time
function fcEcg(x, y, w, h, color, o = {}) {
  const P = [], beat = o.beat ?? 70, ph = (TT * (o.speed ?? 160)) % beat;
  for (let px = 0; px <= w; px += 2) {
    const u = ((px + ph) % beat) / beat; let v = 0;
    if (o.flat) v = 0;
    else if (u > 0.30 && u < 0.34) v = -0.15; else if (u >= 0.34 && u < 0.38) v = 1; else if (u >= 0.38 && u < 0.42) v = -0.45; else if (u > 0.55 && u < 0.68) v = 0.18 * Math.sin((u - 0.55) / 0.13 * Math.PI);
    P.push([x + px, y - v * h]);
  }
  ctx.save(); ctx.shadowColor = color; ctx.shadowBlur = 10; fcLine(P, color, o.w ?? 4); ctx.restore();
}
function fcWave(x, y, w, h, color) {   // the pleth wave
  const P = []; for (let px = 0; px <= w; px += 3) { const u = (px + TT * 120) / 60; P.push([x + px, y - h * (0.5 + 0.5 * Math.sin(u * TAU)) * (0.6 + 0.4 * Math.sin(u * TAU * 0.5 + 1))]); }
  fcLine(P, color, 3.5);
}
// a bedside monitor: dark bezel, ECG, big HR number, SpO2
function fcMonitor(x, y, w, h, hr, o = {}) {
  fcRect(x, y, w, h, '#2a3140', { r: 26 });
  fcRect(x + 18, y + 18, w - 36, h - 90, FC.mon, { r: 10, w: 2 });
  fcEcg(x + 34, y + h * 0.36, w * 0.46, h * 0.13, o.alarm ? FC.ecg : FC.ecg, { flat: o.flat });
  fcWave(x + 34, y + h * 0.62, w * 0.46, h * 0.08, FC.spo);
  ctx.save(); ctx.fillStyle = o.flat ? FC.red : FC.ecg; ctx.font = `700 ${h * 0.28}px ${FCF}`; ctx.textAlign = 'right'; ctx.fillText(String(hr), x + w - 36, y + h * 0.42);
  ctx.fillStyle = FC.spo; ctx.font = `700 ${h * 0.18}px ${FCF}`; ctx.fillText('97', x + w - 36, y + h * 0.66); ctx.restore();
  for (let i = 0; i < 3; i++) fcRect(x + 30 + i * (w * 0.2), y + h - 56, w * 0.16, 26, '#39414f', { r: 8, w: 2 });
  fcCirc(x + w - 40, y + h - 43, 7, (B % 30) < 15 ? '#4be08f' : '#1f5a3c', { line: false });
}

// ---- characters. s = scale (1 = a head of radius 150). face: { mouth: 'o'|'flat'|'wavy'|'smile', sweat, look: [dx, dy], brows }
function fcHead(x, y, r, o = {}) {
  const skin = o.skin || FC.skin, sd = o.skinD || FC.skinD, f = o.face || {};
  if (o.ear !== false) fcCirc(x - r * 0.93, y + r * 0.1, r * 0.17, skin, { ry: r * 0.22 });
  fcCirc(x, y, r, skin);
  // hair (behind/above): spiky crown for Leo, bun for the nurse
  if (o.hair === 'spiky') {
    const P = []; const n = 11;
    for (let i = 0; i <= n; i++) { const a = Math.PI * (1.02 + i / n * 0.98), rr = r * (i % 2 ? 1.32 : 1.04); P.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr - r * 0.08]); }
    P.push([x + r * 0.98, y - r * 0.05], [x + r * 0.6, y - r * 0.42], [x + r * 0.2, y - r * 0.3], [x - r * 0.3, y - r * 0.5], [x - r * 0.75, y - r * 0.2], [x - r * 1.0, y - r * 0.02]);
    fcPoly(P, FC.hair);
  } else if (o.hair === 'bun') {
    fcCirc(x + r * 0.05, y - r * 1.12, r * 0.42, FC.hair);
    fcPath((g) => { g.ellipse(x, y - r * 0.2, r * 1.03, r * 0.9, 0, Math.PI * 1.02, Math.PI * 1.98); g.quadraticCurveTo(x + r * 0.4, y - r * 0.55, x, y - r * 0.5); g.quadraticCurveTo(x - r * 0.5, y - r * 0.55, x - r * 1.0, y - r * 0.12); }, FC.hair);
  }
  // eyes: black ovals with a white catchlight; a blink every ~3s
  const blink = ((F + (o.seed || 0)) % 97) < 3, [lx, ly] = f.look || [0, 0];
  for (const s of [-1, 1]) {
    const ex = x + s * r * 0.36 + lx * r * 0.08, ey = y + r * 0.02 + ly * r * 0.08;
    if (blink) { fcLine([[ex - r * 0.1, ey], [ex + r * 0.1, ey]], FC.line, 5); continue; }
    fcCirc(ex, ey, r * 0.11, '#121318', { line: false, ry: r * 0.14 });
    fcCirc(ex + r * 0.04, ey - r * 0.05, r * 0.035, '#ffffff', { line: false });
    if (f.brows) fcLine([[ex - r * 0.13, ey - r * 0.26 + (s < 0 ? f.brows : -f.brows) * r * 0.05], [ex + r * 0.13, ey - r * 0.26 + (s < 0 ? -f.brows : f.brows) * r * 0.05]], FC.line, 6);
  }
  const mx = x + lx * r * 0.06, my = y + r * 0.42;
  if (f.mouth === 'o') fcCirc(mx, my, r * 0.08, '#3a1d1d', { ry: r * 0.1, w: 3 });
  else if (f.mouth === 'wavy') fcLine([[mx - r * 0.14, my], [mx - r * 0.05, my - r * 0.06], [mx + r * 0.04, my + r * 0.03], [mx + r * 0.13, my - r * 0.04]], '#3a1d1d', 5);
  else if (f.mouth === 'smile') fcLine([[mx - r * 0.12, my - r * 0.03], [mx, my + r * 0.04], [mx + r * 0.12, my - r * 0.03]], '#3a1d1d', 5);
  else fcLine([[mx - r * 0.1, my], [mx + r * 0.1, my]], '#3a1d1d', 5);
  if (f.sweat) { const k = (TT * 0.6 + (o.seed || 0)) % 1, sy = y - r * 0.55 + k * r * 0.25; fcPath((g) => { g.moveTo(x + r * 0.72, sy - r * 0.16); g.quadraticCurveTo(x + r * 0.84, sy, x + r * 0.72, sy + r * 0.04); g.quadraticCurveTo(x + r * 0.6, sy, x + r * 0.72, sy - r * 0.16); }, '#8fd0f5', { w: 2.5 }); }
}
// the patient's gown: rounded shoulders, a dotted print, a V tie
function fcGown(x, y, w, h) {
  const build = (g) => { g.moveTo(x - w * 0.5, y + h); g.lineTo(x - w * 0.5, y + h * 0.22); g.quadraticCurveTo(x - w * 0.5, y, x - w * 0.22, y); g.lineTo(x + w * 0.22, y); g.quadraticCurveTo(x + w * 0.5, y, x + w * 0.5, y + h * 0.22); g.lineTo(x + w * 0.5, y + h); g.closePath(); };
  fcPath(build, FC.gown);
  fcClip(build, () => fcDots([x - w * 0.5, y + 10, x + w * 0.5, y + h], FC.gownDot, 34, 3.4));
  fcPath(build, null);
  fcLine([[x - w * 0.12, y + 4], [x, y + h * 0.16], [x + w * 0.12, y + 4]], FC.line, 3.5);
}
// a zombie: a flat black silhouette, a faint rim, two glowing white eyes with a halo. s = height / 600
function fcZombie(x, y, s, o = {}) {
  // drawn as thick round-capped limbs over a slumped torso: a rim pass (wider, lighter) then the black pass
  const ph = TT * 2.2 + (o.seed || 0), sw = Math.sin(ph) * 0.06, arm = o.arms ?? 1, lean = o.lean ?? 0.08;
  const hx = 8 + sw * 40, hy = -520;
  const limbs = [
    [[-18, -250], [-34, -120], [-40, 0]],                                          // left leg
    [[18, -250], [30, -130 + Math.sin(ph) * 8], [46, 0]],                          // right leg
    [[-52, -420], [-52 - 70 * arm, -380 + Math.sin(ph + 1) * 24], [-52 - 150 * arm, -370 + Math.sin(ph + 1) * 40]],   // arms reach out, swaying
    [[52, -420], [52 + 70 * arm, -390 + Math.sin(ph + 2) * 24], [52 + 150 * arm, -385 + Math.sin(ph + 2) * 40]],
  ];
  const torso = (g) => { g.moveTo(-70, -410); g.quadraticCurveTo(-74, -462, -30, -466); g.lineTo(30, -466); g.quadraticCurveTo(76, -462, 70, -410); g.lineTo(52, -240); g.quadraticCurveTo(0, -222, -52, -240); g.closePath(); };
  ctx.save(); ctx.translate(x, y); ctx.rotate(lean + sw * 0.3); ctx.scale(s, s);
  const lw = 4 / (s * fcZ());
  for (const pass of [0, 1]) {
    ctx.strokeStyle = pass ? FC.zomb : (o.rim || FC.zombRim); ctx.fillStyle = ctx.strokeStyle; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (const [i, L] of limbs.entries()) { ctx.lineWidth = (i < 2 ? 54 : 40) + (pass ? 0 : lw * 2); ctx.beginPath(); L.forEach(([px, py], j) => (j ? ctx.lineTo(px, py) : ctx.moveTo(px, py))); ctx.stroke(); }
    ctx.beginPath(); torso(ctx); ctx.fill(); if (!pass) { ctx.lineWidth = lw * 2; ctx.stroke(); }
    ctx.beginPath(); ctx.ellipse(hx, hy, 64 + (pass ? 0 : lw), 68 + (pass ? 0 : lw), 0, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.ellipse(hx * 0.4, -455, 26 + (pass ? 0 : lw), 30, 0, 0, TAU); ctx.fill();   // neck
  }
  // eyes (in the rotated frame so they follow the head)
  for (const d of [-1, 1]) { const T = ctx.getTransform(), m = T.transformPoint(new DOMPoint(hx + d * 24, hy - 6)), k = Math.hypot(T.a, T.b);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); fcGlow(m.x, m.y, 46 * k, 'rgba(220,235,255,0.9)', 0.55); ctx.fillStyle = FC.eye; ctx.beginPath(); ctx.arc(m.x, m.y, 10 * k, 0, TAU); ctx.fill(); ctx.restore(); }
  ctx.restore();
}

// ---- overlays at screen size (through DEFER): captions, name labels, rule cards, data signs, the top pill
const fcDefer = (f) => (DEFER ? DEFER.push(f) : f());
// caption: '*word*' = yellow, '^word^' = red. Bold condensed caps, white, soft dark shadow, centred low.
function fcCaption(str, o = {}) {
  fcDefer(() => {
    const size = o.size ?? 74, y = o.y ?? 1540;
    ctx.save(); ctx.font = `700 ${size}px ${FCF}`; ctx.textBaseline = 'alphabetic';
    const toks = str.toUpperCase().split(/(\*[^*]+\*|\^[^^]+\^)/).filter(Boolean).map((t) => (t[0] === '*' ? [t.slice(1, -1), FC.yellow] : t[0] === '^' ? [t.slice(1, -1), FC.red] : [t, '#ffffff']));
    ctx.letterSpacing = Math.round(size * 0.02) + 'px'; const wOf = (t) => ctx.measureText(t).width;
    const total = toks.reduce((a, [t]) => a + wOf(t), 0); let x = (o.x ?? W / 2) - total / 2;
    const k = o.pop ?? 1; ctx.translate(W / 2, y); ctx.scale(k, k); ctx.translate(-W / 2, -y);
    for (const [t, c] of toks) {
      ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 22; ctx.shadowOffsetY = 4; ctx.fillStyle = c; ctx.fillText(t, x, y);
      ctx.shadowBlur = 0; ctx.shadowOffsetY = 0; ctx.fillText(t, x, y); x += wOf(t);
    }
    ctx.restore();
  });
}
// name label: white card, red bar on the left, big name, small detail line
function fcLabel(name, detail, o = {}) {
  fcDefer(() => {
    const x = o.x ?? 64, y = o.y ?? 230, a = o.a ?? 1; ctx.save(); ctx.globalAlpha = a;
    ctx.font = `700 76px ${FCF}`; const w1 = ctx.measureText(name).width; ctx.font = `500 30px ${FCF}`; ctx.letterSpacing = '2px'; const w2 = ctx.measureText(detail).width; ctx.letterSpacing = '0px';
    const w = Math.max(w1, w2) + 70, h = 150;
    ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 8; ctx.fillStyle = FC.card; ctx.beginPath(); ctx.roundRect(x, y, w, h, 6); ctx.fill(); ctx.shadowColor = 'transparent';
    ctx.fillStyle = FC.red; ctx.fillRect(x, y, 12, h);
    ctx.fillStyle = FC.ink; ctx.font = `700 76px ${FCF}`; ctx.fillText(name, x + 38, y + 84);
    ctx.fillStyle = '#4a5160'; ctx.font = `500 30px ${FCF}`; ctx.letterSpacing = '2px'; ctx.fillText(detail, x + 38, y + 126);
    ctx.restore();
  });
}
// rule card: a dark pill "REGEL #n", two big lines, a red underline; slides down + fades in on cue
function fcRule(n, l1, l2, o = {}) {
  fcDefer(() => {
    const u = o.u ?? 1, cx = W / 2, y = (o.y ?? 210) - (1 - u) * 30, w = o.w ?? 800, h = 300;
    ctx.save(); ctx.globalAlpha = u;
    ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10; ctx.fillStyle = FC.card; ctx.beginPath(); ctx.roundRect(cx - w / 2, y, w, h, 10); ctx.fill(); ctx.shadowColor = 'transparent';
    ctx.fillStyle = FC.red; ctx.fillRect(cx - w / 2, y, w, 10);
    ctx.font = `700 30px ${FCF}`; ctx.letterSpacing = '2px'; const pt = `REGEL #${n}`, pw = ctx.measureText(pt).width + 44;
    ctx.fillStyle = '#2a2622'; ctx.beginPath(); ctx.roundRect(cx - pw / 2, y + 30, pw, 46, 23); ctx.fill();
    ctx.fillStyle = FC.yellow; ctx.textAlign = 'center'; ctx.fillText(pt, cx + 1, y + 64); ctx.letterSpacing = '0px';
    ctx.fillStyle = FC.ink; ctx.font = `700 ${o.size ?? 84}px ${FCF}`; ctx.fillText(l1, cx, y + 160); if (l2) ctx.fillText(l2, cx, y + 248);
    ctx.fillStyle = FC.red; ctx.fillRect(cx - w * 0.32, y + h - 26, w * 0.64 * ev(E0 + 0.2, 0.4), 6);
    ctx.restore();
  });
}
// data sign: black card, a big orange number, a small caption
function fcSign(big, small, x, y, o = {}) {
  fcDefer(() => {
    ctx.save(); ctx.font = `700 ${o.size ?? 110}px ${FCF}`; const w = Math.max(ctx.measureText(big).width, 260) + 70, h = (o.size ?? 110) + 90;
    ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 20; ctx.fillStyle = '#16181d'; ctx.beginPath(); ctx.roundRect(x - w / 2, y, w, h, 14); ctx.fill(); ctx.shadowColor = 'transparent';
    ctx.lineWidth = 3; ctx.strokeStyle = '#3a3e48'; ctx.stroke();
    ctx.textAlign = 'center'; ctx.fillStyle = FC.orange; ctx.fillText(big, x, y + (o.size ?? 110) + 14);
    ctx.fillStyle = '#e9e6df'; ctx.font = `600 30px ${FCF}`; ctx.letterSpacing = '2px'; ctx.fillText(small, x, y + h - 26); ctx.restore();
  });
}
// the top pill: a heart, the pulse, "BPM", a tiny ECG — the piece's tension clock
function fcPill(bpm, o = {}) {
  fcDefer(() => {
    const cx = W / 2, y = o.y ?? 150, w = 330, h = 62;
    ctx.save(); ctx.fillStyle = 'rgba(24,18,22,0.88)'; ctx.beginPath(); ctx.roundRect(cx - w / 2, y, w, h, 31); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#a3302b'; ctx.stroke();
    const beat = 1 + 0.18 * Math.exp(-((TT * bpm / 60) % 1) * 8), hx = cx - w / 2 + 44, hy = y + h / 2;
    ctx.save(); ctx.translate(hx, hy); ctx.scale(beat, beat); ctx.fillStyle = FC.red; ctx.beginPath(); ctx.moveTo(0, 12); ctx.bezierCurveTo(-24, -4, -12, -22, 0, -10); ctx.bezierCurveTo(12, -22, 24, -4, 0, 12); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#f3e7e4'; ctx.font = `700 36px ${FCF}`; ctx.fillText(String(bpm), hx + 30, y + 45); const nw = ctx.measureText(String(bpm)).width;
    ctx.font = `600 18px ${FCF}`; ctx.fillStyle = '#c99'; ctx.fillText('BPM', hx + 36 + nw, y + 44);
    const ex = cx + 30, P = []; for (let i = 0; i <= 100; i += 2) { const u = ((i + TT * 90) % 25) / 25; P.push([ex + i, hy + (u > 0.4 && u < 0.5 ? -18 : u >= 0.5 && u < 0.58 ? 10 : 0)]); }
    ctx.lineWidth = 3; ctx.strokeStyle = '#f08a80'; ctx.beginPath(); P.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py))); ctx.stroke();
    ctx.restore();
  });
}

// =====================================================================
//  STYLE hooks (styles/README.md). Pieces in this style cut hard (BRIDGES = []), so window/blob are plain.
// =====================================================================
const STYLE = {
  name: 'flat-noir',
  paper: FC.paper,
  backdrop(c) { fillAll(c); },
  window(P, key, src) { ctx.save(); trace(P, true); ctx.clip(); ctx.drawImage(src, 0, 0); ctx.restore(); },
  blob(P, c) { fcPoly(P, c); },
  hero(x, y, r, o) { fcHead(x, y, r * 0.6, { hair: 'spiky', face: { mouth: 'o' } }); },
  heroColor: FC.skin,
  post() {},   // the vignette is drawn by each scene (fcVignette) so captions sit on top of it
  ones: true,
};
