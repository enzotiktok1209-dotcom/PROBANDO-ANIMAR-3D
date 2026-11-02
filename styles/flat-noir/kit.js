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
const fcZ = () => { const T = ctx.getTransform(); return (Math.hypot(T.a, T.b) || 1) / (ctx.canvas.__k || 1); };   // the camera zoom (not the output scale)
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

// ---- characters. face: { mouth: 'o'|'big'|'flat'|'wavy'|'smile'|'grit'|'frown', eyes: 'dot'|'wide'|'shut'|'narrow', brows: -1..1 (+ worried, - angry), sweat, look: [dx, dy] }
// expressions by name, so shots stay short
const FC_EXPR = {
  neutral: { mouth: 'flat', brows: 0.2 }, calm: { mouth: 'smile', brows: 0 },
  worried: { mouth: 'wavy', brows: 0.9 }, scared: { mouth: 'o', brows: 1, sweat: true, eyes: 'wide' },
  panic: { mouth: 'big', brows: 1.2, sweat: true, eyes: 'wide' }, wince: { mouth: 'grit', brows: 0.8, eyes: 'shut', sweat: true },
  angry: { mouth: 'grit', brows: -1, eyes: 'narrow' }, determined: { mouth: 'frown', brows: -0.7 }, shout: { mouth: 'big', brows: -1, eyes: 'narrow' },
  shocked: { mouth: 'o', brows: 1.3, eyes: 'wide' }, sad: { mouth: 'frown', brows: 1 },
};
function fcHead(x, y, r, o = {}) {
  const skin = o.skin || FC.skin, f = Object.assign({}, typeof o.face === 'string' ? FC_EXPR[o.face] : o.face || {});
  const hairC = o.hairColor || FC.hair, [lx, ly] = f.look || [0, 0];
  // behind the head: ponytail / bun
  if (o.hair === 'pony') {
    const sw = Math.sin(TT * 2.1 + (o.seed || 0)) * 0.12;
    fcPath((g) => { g.moveTo(x + r * 0.55, y - r * 0.75); g.quadraticCurveTo(x + r * (1.55 + sw), y - r * 0.6, x + r * (1.25 + sw), y + r * 0.7); g.quadraticCurveTo(x + r * (1.05 + sw * 0.5), y + r * 0.1, x + r * 0.7, y - r * 0.2); g.closePath(); }, hairC);
    fcRect(x + r * 0.58, y - r * 0.82, r * 0.22, r * 0.2, '#c0392b', { r: 4, w: 2.5 });
  }
  if (o.hair === 'bun') fcCirc(x + r * 0.05, y - r * 1.12, r * 0.42, hairC);
  if (o.ear !== false) { fcCirc(x - r * 0.95 - lx * r * 0.1, y + r * 0.1, r * 0.17, skin, { ry: r * 0.22 }); fcCirc(x + r * 0.95 - lx * r * 0.1, y + r * 0.1, r * 0.17, skin, { ry: r * 0.22 }); }
  fcCirc(x, y, r, skin);
  // a soft shade on the lower face (one tone, no gradient)
  fcClip((g) => g.ellipse(x, y, r, r, 0, 0, TAU), () => { ctx.fillStyle = 'rgba(120,60,30,0.10)'; ctx.beginPath(); ctx.ellipse(x + r * 0.35, y + r * 0.55, r * 1.0, r * 0.6, -0.3, 0, TAU); ctx.fill(); });
  fcCirc(x, y, r, null);
  if (o.freckles) { ctx.save(); ctx.fillStyle = 'rgba(150,80,40,0.55)'; for (const s of [-1, 1]) for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(x + s * r * (0.42 + i * 0.09) + lx * r * 0.08, y + r * (0.24 + (i % 2) * 0.06), r * 0.022, 0, TAU); ctx.fill(); } ctx.restore(); }
  // hair on top
  if (o.hair === 'spiky') {
    const P = [], n = 11;
    for (let i = 0; i <= n; i++) { const a = Math.PI * (1.02 + i / n * 0.98), rr = r * (i % 2 ? 1.32 : 1.04); P.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr - r * 0.08]); }
    P.push([x + r * 0.98, y - r * 0.05], [x + r * 0.6, y - r * 0.42], [x + r * 0.2, y - r * 0.3], [x - r * 0.3, y - r * 0.5], [x - r * 0.75, y - r * 0.2], [x - r * 1.0, y - r * 0.02]);
    fcPoly(P, hairC);
  } else if (o.hair === 'swoop') {   // Lukas: a brown swept fringe with a few loose strands
    const bob = Math.sin(TT * 1.7) * r * 0.015;
    fcPath((g) => {
      g.moveTo(x - r * 1.04, y + r * 0.05); g.bezierCurveTo(x - r * 1.2, y - r * 0.9, x - r * 0.3, y - r * 1.35, x + r * 0.45, y - r * 1.12 + bob);
      g.bezierCurveTo(x + r * 0.95, y - r * 0.95, x + r * 1.15, y - r * 0.45, x + r * 1.03, y + r * 0.02);
      g.quadraticCurveTo(x + r * 0.92, y - r * 0.32, x + r * 0.7, y - r * 0.4);
      g.quadraticCurveTo(x + r * 0.55, y - r * 0.18, x + r * 0.2, y - r * 0.28);   // the fringe sweeps right to left
      g.quadraticCurveTo(x - r * 0.15, y - r * 0.12, x - r * 0.5, y - r * 0.3);
      g.quadraticCurveTo(x - r * 0.75, y - r * 0.2, x - r * 1.04, y + r * 0.05); g.closePath();
    }, hairC);
    fcLine([[x - r * 0.2, y - r * 0.85], [x + r * 0.35, y - r * 0.6]], 'rgba(255,220,180,0.35)', 4);
    fcLine([[x + r * 0.1, y - r * 1.05 + bob], [x + r * 0.32, y - r * 1.3 + bob], [x + r * 0.42, y - r * 1.18 + bob]], hairC, 7);
  } else if (o.hair === 'pony' || o.hair === 'bun') {
    fcPath((g) => { g.ellipse(x, y - r * 0.18, r * 1.04, r * 0.92, 0, Math.PI * 1.0, Math.PI * 2.0); g.quadraticCurveTo(x + r * 0.55, y - r * 0.45, x + r * 0.1, y - r * 0.55); g.quadraticCurveTo(x - r * 0.45, y - r * 0.5, x - r * 1.04, y - r * 0.1); }, hairC);
    fcLine([[x - r * 0.1, y - r * 1.02], [x + r * 0.05, y - r * 0.55]], 'rgba(0,0,0,0.25)', 4);
  }
  if (o.cap) { fcPath((g) => { g.ellipse(x, y - r * 0.55, r * 1.02, r * 0.55, 0, Math.PI, TAU); g.closePath(); }, o.cap); }
  // eyes: black ovals with a white catchlight; 'wide' = a white eye with a small pupil; blinks every ~3s
  const blink = f.eyes !== 'wide' && ((F + (o.seed || 0) * 13) % 101) < 3;
  for (const s of [-1, 1]) {
    const ex = x + s * r * 0.36 + lx * r * 0.1, ey = y + r * 0.02 + ly * r * 0.08;
    if (f.eyes === 'shut') fcLine([[ex + s * r * 0.1, ey - r * 0.07], [ex - s * r * 0.06, ey], [ex + s * r * 0.1, ey + r * 0.07]], FC.line, 6);
    else if (blink) fcLine([[ex - r * 0.1, ey], [ex + r * 0.1, ey]], FC.line, 6);
    else if (f.eyes === 'wide') {
      const tr = 0.6 + 0.4 * Math.sin(TT * 23 + s) * 0.3;
      fcCirc(ex, ey, r * 0.15, '#fbfbf7', { ry: r * 0.17, w: 3 });
      fcCirc(ex + lx * r * 0.04 + Math.sin(TT * 31 + s) * r * 0.006, ey + ly * r * 0.04, r * 0.06 * tr + r * 0.02, '#121318', { line: false });
    } else {
      fcCirc(ex, ey, r * 0.11, '#121318', { line: false, ry: r * (f.eyes === 'narrow' ? 0.09 : 0.14) });
      fcCirc(ex + r * 0.04, ey - r * 0.05, r * 0.035, '#ffffff', { line: false });
    }
    if (f.brows != null) { const b = f.brows, by = ey - r * (f.eyes === 'wide' ? 0.3 : 0.26); fcLine([[ex - r * 0.14, by + (s < 0 ? b : -b) * r * 0.06], [ex + r * 0.14, by + (s < 0 ? -b : b) * r * 0.06]], o.browColor || FC.line, 7); }
  }
  const mx = x + lx * r * 0.08, my = y + r * 0.44 + ly * r * 0.04, talk = o.talk ? 0.5 + 0.5 * Math.sin(TT * 18) : 1;
  if (f.mouth === 'o') fcCirc(mx, my, r * 0.08, '#3a1d1d', { ry: r * 0.1 * (0.7 + 0.3 * talk), w: 3 });
  else if (f.mouth === 'big') fcPath((g) => { g.moveTo(mx - r * 0.18, my - r * 0.06); g.quadraticCurveTo(mx, my - r * 0.12, mx + r * 0.18, my - r * 0.06); g.quadraticCurveTo(mx + r * 0.12, my + r * 0.24 * talk, mx, my + r * 0.24 * talk); g.quadraticCurveTo(mx - r * 0.12, my + r * 0.24 * talk, mx - r * 0.18, my - r * 0.06); }, '#3a1d1d', { w: 3 });
  else if (f.mouth === 'grit') { fcRect(mx - r * 0.15, my - r * 0.05, r * 0.3, r * 0.1, '#f4f1ea', { r: 4, w: 3 }); fcLine([[mx - r * 0.15, my], [mx + r * 0.15, my]], FC.line, 2); }
  else if (f.mouth === 'wavy') fcLine([[mx - r * 0.14, my], [mx - r * 0.05, my - r * 0.06], [mx + r * 0.04, my + r * 0.03], [mx + r * 0.13, my - r * 0.04]], '#3a1d1d', 5);
  else if (f.mouth === 'smile') fcLine([[mx - r * 0.12, my - r * 0.03], [mx, my + r * 0.04], [mx + r * 0.12, my - r * 0.03]], '#3a1d1d', 5);
  else if (f.mouth === 'frown') fcLine([[mx - r * 0.12, my + r * 0.04], [mx, my - r * 0.03], [mx + r * 0.12, my + r * 0.04]], '#3a1d1d', 5);
  else fcLine([[mx - r * 0.1, my], [mx + r * 0.1, my]], '#3a1d1d', 5);
  if (f.sweat) for (const k0 of [0, 0.5]) { const k = (TT * 0.7 + (o.seed || 0) + k0) % 1, sy = y - r * 0.5 + k * r * 0.35, sx = x + (k0 ? -r * 0.68 : r * 0.72); ctx.save(); ctx.globalAlpha = 1 - k * 0.6; fcPath((g) => { g.moveTo(sx, sy - r * 0.16); g.quadraticCurveTo(sx + r * 0.11, sy, sx, sy + r * 0.04); g.quadraticCurveTo(sx - r * 0.11, sy, sx, sy - r * 0.16); }, '#8fd0f5', { w: 2.5 }); ctx.restore(); }
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
    o.armUp ? [[52, -420], [80, -560], [70 - 20 * o.armUp, -700 - 40 * o.armUp]] : [[52, -420], [52 + 70 * arm, -390 + Math.sin(ph + 2) * 24], [52 + 150 * arm, -385 + Math.sin(ph + 2) * 40]],
  ];
  const torso = (g) => { g.moveTo(-70, -410); g.quadraticCurveTo(-74, -462, -30, -466); g.lineTo(30, -466); g.quadraticCurveTo(76, -462, 70, -410); g.lineTo(52, -240); g.quadraticCurveTo(0, -222, -52, -240); g.closePath(); };
  ctx.save(); ctx.translate(x, y); ctx.rotate(lean + sw * 0.3); ctx.scale(s, s);
  const lw = 4 / (s * fcZ());
  for (const pass of [0, 1]) {
    ctx.strokeStyle = pass ? (o.fill || FC.zomb) : (o.rim || FC.zombRim); ctx.fillStyle = ctx.strokeStyle; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (const [i, L] of limbs.entries()) { ctx.lineWidth = (i < 2 ? 54 : 40) + (pass ? 0 : lw * 2); ctx.beginPath(); L.forEach(([px, py], j) => (j ? ctx.lineTo(px, py) : ctx.moveTo(px, py))); ctx.stroke(); }
    ctx.beginPath(); torso(ctx); ctx.fill(); if (!pass) { ctx.lineWidth = lw * 2; ctx.stroke(); }
    ctx.beginPath(); ctx.ellipse(hx, hy, 64 + (pass ? 0 : lw), 68 + (pass ? 0 : lw), 0, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.ellipse(hx * 0.4, -455, 26 + (pass ? 0 : lw), 30, 0, 0, TAU); ctx.fill();   // neck
  }
  // eyes (in the rotated frame so they follow the head)
  if (!o.noEyes) for (const d of [-1, 1]) { const T = ctx.getTransform(), m = T.transformPoint(new DOMPoint(hx + d * 24, hy - 6)), k = Math.hypot(T.a, T.b);
    ctx.save(); ctx.resetTransform(); fcGlow(m.x, m.y, 46 * k, 'rgba(220,235,255,0.9)', 0.55); ctx.fillStyle = FC.eye; ctx.beginPath(); ctx.arc(m.x, m.y, 10 * k, 0, TAU); ctx.fill(); ctx.restore(); }
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
    let total = toks.reduce((a, [t]) => a + wOf(t), 0);
    if (total > (o.maxW ?? 940)) { const f = (o.maxW ?? 940) / total; ctx.translate(W / 2, y); ctx.scale(f, f); ctx.translate(-W / 2, -y); }
    let x = (o.x ?? W / 2) - total / 2;
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
//  CAST (Zombie-Klinik): Lukas (patient), Jana (night nurse), Keks (therapy dog) — busts, full figures, hands
// =====================================================================
const CAST = {
  lukas: { skin: '#f1c9a1', hair: 'swoop', hairColor: '#5b3a22', cloth: '#9fd6c8', clothD: '#2f7466', freckles: true },
  jana:  { skin: '#d9a07a', hair: 'pony', hairColor: '#d8a443', cloth: '#1f6f78', clothD: '#175a61' },
};
// a limb: thick round-capped stroke with a dark outline (outline pass first, wider)
function fcLimb(P, color, w) {
  const z = fcZ(); ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const pass of [0, 1]) { ctx.strokeStyle = pass ? color : FC.line; ctx.lineWidth = pass ? w : w + 7 / z; ctx.beginPath(); P.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); }
  ctx.restore();
}
// a hand at (x, y) pointing along angle a. pose: 'open' | 'point' | 'fist' | 'pinch'. s = size (palm radius)
function fcHandShape(x, y, a, s, skin, pose = 'open') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(a);
  const fingers = pose === 'fist' ? [] : pose === 'point' ? [[0.1, 1.9]] : pose === 'pinch' ? [[0.15, 1.3], [-0.15, 1.1]] : [[0.45, 1.5], [0.15, 1.75], [-0.15, 1.7], [-0.45, 1.4]];
  for (const [dy, L] of fingers) fcLimb([[s * 0.5, dy * s], [s * L, dy * s * 1.08]], skin, s * 0.42);
  fcCirc(0, 0, s, skin, { ry: s * 0.85 });
  if (pose !== 'point') fcLimb([[s * 0.1, s * 0.75], [s * 0.75, s * 1.05]], skin, s * 0.42);   // thumb
  else { fcLimb([[s * 0.2, -s * 0.7], [s * 0.7, -s * 0.85]], skin, s * 0.4); fcLimb([[s * 0.6, s * 0.3], [s * 0.9, s * 0.5]], skin, s * 0.38); }
  if (pose === 'fist') for (let i = 0; i < 3; i++) fcLine([[s * 0.55, (i - 1) * s * 0.35], [s * 0.85, (i - 1) * s * 0.35]], FC.line, 2.5);
  ctx.restore();
}
// an arm: shoulder -> elbow -> wrist, sleeve over the upper part, hand at the wrist
function fcArm(sh, el, wr, who, o = {}) {
  const c = CAST[who] || CAST.lukas, w = o.w ?? 46, a = Math.atan2(wr[1] - el[1], wr[0] - el[0]);
  fcLimb([sh, el, wr], c.skin, w);
  const m = [lerp(sh[0], el[0], o.sleeve ?? 0.85), lerp(sh[1], el[1], o.sleeve ?? 0.85)];
  fcLimb([sh, m], c.cloth, w * 1.35);
  if (o.band) { const b = [lerp(el[0], wr[0], 0.82), lerp(el[1], wr[1], 0.82)]; fcLimb([[b[0] - Math.cos(a) * 6, b[1] - Math.sin(a) * 6], [b[0] + Math.cos(a) * 6, b[1] + Math.sin(a) * 6]], '#f6f7fb', w * 1.12); }
  fcHandShape(wr[0] + Math.cos(a) * w * 0.35, wr[1] + Math.sin(a) * w * 0.35, a, w * 0.62, c.skin, o.pose || 'open');
}
// a bust: head r = 150 * s at (x, y). o.face (name or object), o.look, o.arms: { l: [el, wr, pose], r: [...] } in head-relative units
function fcBust(who, x, y, s, o = {}) {
  const c = CAST[who], r = 150 * s, br = Math.sin(TT * 2.3 + x) * r * 0.025;
  const sy = y + r * 1.0 + br, w = r * 2.5, h = r * 2.6;
  // torso: rounded shoulders, then the print / scrubs details
  const build = (g) => { g.moveTo(x - w * 0.5, sy + h); g.lineTo(x - w * 0.5, sy + h * 0.25); g.quadraticCurveTo(x - w * 0.5, sy, x - w * 0.18, sy); g.lineTo(x + w * 0.18, sy); g.quadraticCurveTo(x + w * 0.5, sy, x + w * 0.5, sy + h * 0.25); g.lineTo(x + w * 0.5, sy + h); g.closePath(); };
  fcRect(x - r * 0.2, y + r * 0.7, r * 0.4, r * 0.5, c.skin);   // neck
  fcPath(build, c.cloth);
  fcClip(build, () => {
    if (who === 'lukas') { ctx.save(); ctx.fillStyle = c.clothD; for (let yy = sy + 20, row = 0; yy < sy + h; yy += 40 * s + 8, row++) for (let xx = x - w / 2 + (row % 2) * 22 * s; xx < x + w / 2; xx += 44 * s + 6) { ctx.beginPath(); ctx.moveTo(xx, yy - 6 * s); ctx.lineTo(xx + 5 * s, yy); ctx.lineTo(xx, yy + 6 * s); ctx.lineTo(xx - 5 * s, yy); ctx.fill(); } ctx.restore(); }
    else { ctx.fillStyle = c.clothD; ctx.fillRect(x - w / 2, sy + h * 0.55, w, 6); fcRect(x + w * 0.18, sy + h * 0.32, r * 0.42, r * 0.5, null, { w: 3 }); }
    ctx.fillStyle = 'rgba(0,0,0,0.12)'; ctx.fillRect(x + w * 0.12, sy, w, h);
  });
  fcPath(build, null);
  if (who === 'lukas') { fcLine([[x - r * 0.3, sy + 4], [x, sy + r * 0.45], [x + r * 0.3, sy + 4]], FC.line, 4); fcLine([[x - r * 0.05, sy + r * 0.42], [x - r * 0.2, sy + r * 0.75]], '#f3f1ea', 5); }
  else {
    fcPath((g) => { g.moveTo(x - r * 0.4, sy); g.lineTo(x, sy + r * 0.6); g.lineTo(x + r * 0.4, sy); }, c.skin);
    fcLine([[x - r * 0.62, sy + 6], [x - r * 0.35, sy + r * 0.9], [x - r * 0.3, sy + r * 1.4]], '#2d3138', 8); fcLine([[x + r * 0.62, sy + 6], [x + r * 0.4, sy + r * 0.8]], '#2d3138', 8);
    fcCirc(x - r * 0.3, sy + r * 1.48, r * 0.1, '#b8c0cc', { w: 3 });
    fcRect(x + r * 0.55, sy + r * 0.5, r * 0.38, r * 0.5, '#f4f6fa', { r: 6, w: 3 }); fcRect(x + r * 0.6, sy + r * 0.56, r * 0.28, r * 0.16, '#6aa5d8', { line: false });
  }
  if (o.armsBack) o.armsBack();
  fcHead(x, y + br * 0.5, r, { hair: c.hair, hairColor: c.hairColor, skin: c.skin, freckles: c.freckles, face: o.face || 'neutral', seed: who.length, talk: o.talk, browColor: who === 'jana' ? '#7a5520' : '#3d2614' });
  if (o.look) {}   // look is part of face
  for (const side of ['l', 'r']) if (o.arms && o.arms[side]) { const [el, wr, pose] = o.arms[side], d = side === 'l' ? -1 : 1; fcArm([x + d * w * 0.4, sy + r * 0.3], [x + el[0] * r, y + el[1] * r], [x + wr[0] * r, y + wr[1] * r], who, { w: 44 * s / 0.75 * 0.75 * 1.0 * (s >= 1 ? 1.25 : 1), pose, band: who === 'lukas' }); }
}
// a full figure, feet at (x, y), height hgt. o.walk: phase (0 = still), o.arms: 'down'|'push'|'reach'|'hold'|'up', o.flip
function fcFigure(who, x, y, hgt, o = {}) {
  const c = CAST[who], r = hgt * 0.16, k = o.flip ? -1 : 1, ph = o.walk ? TT * 7 + (o.seed || 0) : 0, sw = o.walk ? Math.sin(ph) : 0;
  const hip = [x, y - hgt * 0.38 - (o.walk ? Math.abs(Math.cos(ph)) * hgt * 0.015 : 0)], sh = [x, y - hgt * 0.66];
  const legW = r * 0.42, legC = who === 'jana' ? c.cloth : c.skin;
  // legs
  for (const d of [-1, 1]) { const f = [x + d * r * 0.25 + sw * d * hgt * 0.08, y - 6]; fcLimb([[hip[0] + d * r * 0.25, hip[1]], [lerp(hip[0], f[0], 0.5) + k * r * 0.05, lerp(hip[1], f[1], 0.5)], f], legC, legW); fcRect(f[0] - r * 0.12 + k * r * 0.05, f[1] - r * 0.12, r * 0.5 * 1.0, r * 0.22, who === 'jana' ? '#f1f2f5' : '#e8823a', { r: 8, w: 3 }); }
  // torso
  const tw = r * 1.5;
  const torso = (g) => { g.moveTo(sh[0] - tw / 2, sh[1] + r * 0.3); g.quadraticCurveTo(sh[0] - tw / 2, sh[1], sh[0] - tw * 0.2, sh[1]); g.lineTo(sh[0] + tw * 0.2, sh[1]); g.quadraticCurveTo(sh[0] + tw / 2, sh[1], sh[0] + tw / 2, sh[1] + r * 0.3); g.lineTo(sh[0] + tw * 0.55, hip[1] + (who === 'lukas' ? r * 0.7 : r * 0.15)); g.lineTo(sh[0] - tw * 0.55, hip[1] + (who === 'lukas' ? r * 0.7 : r * 0.15)); g.closePath(); };
  fcPath(torso, c.cloth);
  if (who === 'lukas') fcClip(torso, () => { ctx.save(); ctx.fillStyle = c.clothD; const st = r * 0.28; for (let yy = sh[1] + 8, row = 0; yy < hip[1] + r; yy += st, row++) for (let xx = sh[0] - tw + (row % 2) * st / 2; xx < sh[0] + tw; xx += st) { ctx.beginPath(); ctx.moveTo(xx, yy - st * 0.14); ctx.lineTo(xx + st * 0.12, yy); ctx.lineTo(xx, yy + st * 0.14); ctx.lineTo(xx - st * 0.12, yy); ctx.fill(); } ctx.restore(); });
  else { fcRect(sh[0] + k * tw * 0.12, sh[1] + r * 0.5, r * 0.3, r * 0.36, '#f4f6fa', { r: 4, w: 2.5 }); fcLine([[sh[0] - tw * 0.3, sh[1] + 4], [sh[0] - tw * 0.18, sh[1] + r * 0.8]], '#2d3138', 5); }
  fcPath(torso, null);
  // arms
  const A = { down: [[-0.55, 0.55], [-0.6, 1.1]], push: [[0.6, 0.15], [1.25, 0.05]], reach: [[0.5, -0.1], [1.15, -0.25]], hold: [[0.45, 0.5], [0.9, 0.55]], up: [[0.5, -0.35], [0.45, -0.95]], point: [[0.6, 0.0], [1.3, -0.2]] };
  for (const [d, pose] of [[-1, o.armsB || 'down'], [1, o.arms || 'down']]) {
    const [e, w] = A[pose] || A.down, swing = pose === 'down' ? sw * d * 0.25 : 0;
    const s0 = [sh[0] + d * k * tw * 0.42, sh[1] + r * 0.18];
    const ex = pose === 'down' ? s0[0] + d * k * Math.abs(e[0]) * r * 0.4 + swing * r : s0[0] + k * e[0] * r, wx = pose === 'down' ? s0[0] + d * k * r * 0.3 + swing * r * 1.5 : s0[0] + k * w[0] * r;
    fcLimb([s0, [ex, s0[1] + e[1] * r], [wx, s0[1] + w[1] * r]], c.skin, r * 0.34);
    fcLimb([s0, [lerp(s0[0], ex, 0.7), s0[1] + e[1] * r * 0.7]], c.cloth, r * 0.46);
    fcCirc(wx, s0[1] + w[1] * r, r * 0.2, c.skin);
  }
  fcHead(x + k * r * 0.05, sh[1] - r * 0.95, r, { hair: c.hair, hairColor: c.hairColor, skin: c.skin, face: o.face || 'neutral', seed: who.length + 2, freckles: c.freckles, browColor: who === 'jana' ? '#7a5520' : '#3d2614' });
}
// Keks: a white terrier with brown patches and a red therapy vest. pose 'sit' | 'stand' | 'lie'; faces right (o.flip = left)
function fcDog(x, y, s, o = {}) {
  const W0 = '#f4efe4', BR = '#a8662f', V = '#c73a32', k = o.flip ? -1 : 1, wag = Math.sin(TT * (o.wag ?? 9)) * 0.5, pant = o.pant ? Math.abs(Math.sin(TT * 9)) : 0;
  ctx.save(); ctx.translate(x, y); ctx.scale(k * s, s);
  const sit = (o.pose || 'sit') === 'sit', lie = o.pose === 'lie';
  // tail
  fcLimb([[-120, sit ? -40 : -120], [-170 - wag * 20, sit ? -60 + wag * 30 : -170 + wag * 30]], W0, 22);
  // back legs
  if (sit) { fcCirc(-70, -50, 70, W0, { ry: 55 }); fcRect(-60, -20, 70, 26, W0, { r: 12 }); }
  else if (!lie) { fcLimb([[-90, -110], [-100, -40], [-95, 0]], W0, 34); fcLimb([[60, -110], [70, -40], [66, 0]], W0, 34); }
  // body
  if (lie) fcCirc(0, -60, 140, W0, { ry: 60 }); else fcPath((g) => g.ellipse(sit ? -10 : 0, sit ? -130 : -140, sit ? 85 : 130, sit ? 110 : 62, sit ? -0.5 : 0, 0, TAU), W0);
  fcPath((g) => g.ellipse(sit ? -30 : -40, sit ? -110 : -150, 45, 32, 0.4, 0, TAU), BR, { w: 2.5 });
  // vest
  if (!lie) { const vb = (g) => g.roundRect(sit ? -70 : -80, sit ? -200 : -195, sit ? 120 : 150, sit ? 100 : 70, 20); fcPath(vb, V); ctx.save(); ctx.fillStyle = '#fff'; ctx.font = `700 ${sit ? 16 : 17}px ${FCF}`; ctx.textAlign = 'center'; ctx.fillText('THERAPIEHUND', sit ? -10 : -5, sit ? -145 : -155); ctx.restore(); fcLine([[sit ? -60 : -70, sit ? -190 : -190], [sit ? 40 : 60, sit ? -200 : -190]], '#f2c94c', 4); }
  // front legs
  if (!lie) { fcLimb([[30, sit ? -110 : -110], [36, -40], [38, 0]], W0, 30); fcLimb([[sit ? 60 : 100, sit ? -100 : -110], [sit ? 66 : 108, -40], [sit ? 70 : 110, 0]], W0, 30); fcCirc(44, -4, 20, W0, { ry: 11 }); fcCirc(sit ? 78 : 118, -4, 20, W0, { ry: 11 }); }
  // head
  const hx = sit ? 60 : 140, hy = (sit ? -270 : lie ? -120 : -230) + Math.sin(TT * 2) * 3;
  fcPath((g) => g.ellipse(hx + 55, hy + 30, 50, 34, 0.2, 0, TAU), W0);   // muzzle
  fcCirc(hx, hy, 70, W0);
  fcPath((g) => g.ellipse(hx - 15, hy - 10, 40, 48, -0.3, 0, TAU), BR, { w: 2.5 });   // eye patch
  fcCirc(hx + 102, hy + 22, 13, '#1b1716', { ry: 10 });   // nose
  if (pant) fcPath((g) => g.ellipse(hx + 75, hy + 58 + pant * 6, 14, 18 + pant * 6, 0.1, 0, TAU), '#d9667a', { w: 2.5 });
  else fcLine([[hx + 60, hy + 52], [hx + 85, hy + 50]], FC.line, 3);
  const blink = ((F + 29) % 113) < 3;
  if (o.glow) { fcGlow(hx + 25, hy - 8, 40, 'rgba(160,255,120,0.9)', 0.6); fcCirc(hx + 25, hy - 8, 8, '#cfffb0', { line: false }); }
  else if (blink) fcLine([[hx + 14, hy - 8], [hx + 36, hy - 8]], FC.line, 5);
  else { fcCirc(hx + 25, hy - 8, 11, '#141210', { line: false, ry: 13 }); fcCirc(hx + 29, hy - 13, 4, '#fff', { line: false }); }
  fcPath((g) => { g.ellipse(hx - 45, hy + 10 + (o.earUp ? -30 : 0), 30, 62, (o.earUp ? 0.2 : 0.35) + Math.sin(TT * 3) * 0.05, 0, TAU); }, BR);   // floppy ear
  fcLimb([[hx - 40, hy + 55], [hx + 30, hy + 70]], V, 14);   // collar
  ctx.restore();
}
// ---- the grade: a little more saturation and contrast, then the piece's overlays (captions, labels, HUD)
function fcGrade() {
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'copy'; ctx.filter = 'saturate(1.22) contrast(1.07)';
  ctx.drawImage(ctx.canvas, 0, 0); ctx.restore();
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
  post() { fcGrade(); if (typeof pieceOverlay === 'function') pieceOverlay(); },   // grade, then captions/labels/HUD at screen size
  ones: true,
};
