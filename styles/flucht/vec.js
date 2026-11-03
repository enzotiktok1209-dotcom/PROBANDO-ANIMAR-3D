// =====================================================================
//  styles/flucht/vec.js — draws the cast TRACED from the user's own frames (tools-trace/trace3.py -> vectors.js).
//  FLV[name] = { w, h, order, layers: { skin, hair, brow, white, pupil, mouth, blush, tear, ... } } in source pixels.
//  flVec(name, cx, cy, faceW, o): the face (the "skin" layer box) centred on (cx, cy), scaled so the face is faceW wide.
//    o.blink 0..1 closes the eyes with skin-coloured lids; o.look [x, y] moves the pupils inside the eye whites;
//    o.rot rotates about the face centre; o.alpha; o.hide: [layer names]; o.tint: [colour, alpha] over the drawing.
// =====================================================================
const FLV_PATHS = {};
function flvPaths(name, ln) {
  const k = name + '/' + ln; if (FLV_PATHS[k]) return FLV_PATHS[k];
  const L = FLV[name].layers[ln]; const out = L.paths.map((p) => { const P = new Path2D(); for (let i = 0; i < p.length; i += 2) (i ? P.lineTo(p[i], p[i + 1]) : P.moveTo(p[i], p[i + 1])); P.closePath(); return { P, box: flvBox(p) }; });
  return (FLV_PATHS[k] = out);
}
function flvBox(p) { let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; for (let i = 0; i < p.length; i += 2) { x0 = Math.min(x0, p[i]); x1 = Math.max(x1, p[i]); y0 = Math.min(y0, p[i + 1]); y1 = Math.max(y1, p[i + 1]); } return [x0, y0, x1, y1]; }
// the face box of a traced head: the skin layer's largest path
function flvFace(name) { const sk = flvPaths(name, FLV[name].layers.skin ? 'skin' : FLV[name].order[0]); let b = sk[0].box, a = 0; for (const s of sk) { const ar = (s.box[2] - s.box[0]) * (s.box[3] - s.box[1]); if (ar > a) { a = ar; b = s.box; } } return b; }
function flVec(name, cx, cy, faceW, o = {}) {
  const V = FLV[name]; if (!V) return;
  const fb = flvFace(name), s = faceW / (fb[2] - fb[0]), fx = (fb[0] + fb[2]) / 2, fy = (fb[1] + fb[3]) / 2 + (o.anchorDy ?? 0);
  ctx.save(); ctx.translate(cx, cy); if (o.rot) ctx.rotate(o.rot); if (o.flip) ctx.scale(-1, 1); ctx.scale(s, s); ctx.translate(-fx, -fy);
  if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  const lw = 1.3 / s * Math.max(1, s * 0.5);
  const order = V.order.filter((n) => !(o.hide || []).includes(n));
  // big layers first, small details last (eyes, pupils, mouth, tear on top)
  const top = ['white', 'pupil', 'brow', 'mouth', 'mouthIn', 'tear', 'scar', 'bruise', 'bloodL', 'button', 'strings'];
  const sorted = order.filter((n) => !top.includes(n)).concat(top.filter((n) => order.includes(n)));
  const skinC = (V.layers.skin || {}).c || '#f6c4a0';
  for (const ln of sorted) {
    const L = V.layers[ln], c = (o.colors && o.colors[ln]) || L.c;
    const ps = flvPaths(name, ln);
    ctx.fillStyle = c; ctx.strokeStyle = c; ctx.lineWidth = lw; ctx.lineJoin = 'round';
    if (ln === 'pupil' && (o.look || o.pupilK)) {
      const eyes = V.layers.white ? flvPaths(name, 'white') : [];
      ctx.save(); const clip = new Path2D(); eyes.forEach((e) => clip.addPath(e.P)); if (eyes.length) ctx.clip(clip, 'evenodd');
      const ew = eyes.length ? (eyes[0].box[2] - eyes[0].box[0]) : 20;
      ctx.translate((o.look?.[0] ?? 0) * ew * 0.22, (o.look?.[1] ?? 0) * ew * 0.18);
      for (const p of ps) { if (o.pupilK) { const bx = (p.box[0] + p.box[2]) / 2, by = (p.box[1] + p.box[3]) / 2; ctx.save(); ctx.translate(bx, by); ctx.scale(o.pupilK, o.pupilK); ctx.translate(-bx, -by); ctx.fill(p.P, 'evenodd'); ctx.restore(); } else { ctx.fill(p.P, 'evenodd'); ctx.stroke(p.P); } }
      ctx.restore(); continue;
    }
    for (const p of ps) { if (o.cutBelow != null && p.box[1] > o.cutBelow) continue; ctx.fill(p.P, 'evenodd'); if (ln !== 'pupil') ctx.stroke(p.P); }
  }
  // blink: skin lids over each eye white, from the top
  const bl = clamp(o.blink ?? 0);
  if (bl > 0 && V.layers.white) for (const e of flvPaths(name, 'white')) {
    const [x0, y0, x1, y1] = e.box; if ((x1 - x0) * (y1 - y0) < 20) continue;
    ctx.save(); ctx.clip(e.P); ctx.fillStyle = o.lidC || skinC; ctx.fillRect(x0 - 2, y0 - 2, x1 - x0 + 4, (y1 - y0 + 4) * bl); ctx.restore();
    if (bl > 0.85) { ctx.save(); ctx.strokeStyle = '#4a2a1a'; ctx.lineWidth = 2.2 / s * 2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0 + 2, (y0 + y1) / 2 + 1); ctx.quadraticCurveTo((x0 + x1) / 2, y1 - 1, x1 - 2, (y0 + y1) / 2 + 1); ctx.stroke(); ctx.restore(); }
  }
  if (o.tint) { ctx.globalCompositeOperation = 'source-atop'; }
  ctx.restore();
  return { s, fx, fy };
}
// where a traced head lands on screen (no rotation): sx / sy map source px, lbox(layer) = the layer's box
function flvMap(name, cx, cy, faceW) {
  const V = FLV[name], fb = flvFace(name), s = faceW / (fb[2] - fb[0]), fx = (fb[0] + fb[2]) / 2, fy = (fb[1] + fb[3]) / 2;
  const sx = (x) => cx + (x - fx) * s, sy = (y) => cy + (y - fy) * s;
  const lbox = (ln) => { if (!V.layers[ln]) return null; let b = [1e9, 1e9, -1e9, -1e9]; for (const q of flvPaths(name, ln)) b = [Math.min(b[0], q.box[0]), Math.min(b[1], q.box[1]), Math.max(b[2], q.box[2]), Math.max(b[3], q.box[3])]; return [sx(b[0]), sy(b[1]), sx(b[2]), sy(b[3])]; };
  return { s, fb, sx, sy, lbox, bottom: sy(V.h) };
}
// automatic blink on a deterministic clock (returns 0..1)
function flvBlink(key = 0, every = 3.3) { const p = mod(TT + key * 0.913, every); return p < 0.07 ? p / 0.07 : p < 0.14 ? 1 - (p - 0.07) / 0.07 : 0; }

// ---------------------------------------------------------------- expression map
const G_EXPR = { sad: 'g_12.5', up: 'g_36.5', fear: 'g_44.5', cry: 'g_58.5', angry: 'g_63.5', shout: 'g_66.3', calm: 'g_75.5', };
const K_EXPR = { angry: 'k_angry', shout: 'k_shout' };
const F_EXPR = { open: 'f_open' };
// ---------------------------------------------------------------- busts (traced head + the coat / hoodie / shirt of the references)
// Greta: a wide brown coat block (rounded top corners, centre seam, buttons right of it), as in the user's close-ups.
function flvGreta(cx, cy, faceW, o = {}) {
  const ex = G_EXPR[o.mood || 'sad'] || 'g_12.5', u = faceW / 280;
  const br = Math.sin(TT * (o.breath ?? 2.2)) * (o.breathAmp ?? 3) * u;
  if (o.body !== false) {
    const M = flvMap(ex, cx, cy, faceW), top = M.sy(M.fb[3]) - 10 * u - br, w = faceW * 2.05;
    ctx.save();
    ctx.fillStyle = flGrad(cx - w / 2, 0, cx + w / 2, 0, [[0, '#8f5e38'], [0.55, '#8a5a34'], [1, '#7c4f2d']]);
    ctx.beginPath(); ctx.roundRect(cx - w / 2, top, w, H * 2, 34 * u); ctx.fill();
    flRect(cx - w / 2, top, w, 10 * u, 6 * u, 'rgba(255,255,255,0.05)');
    flRect(cx - 3 * u, top + 6 * u, 6 * u, H * 2, 3 * u, '#734927');
    flRect(cx - w * 0.31, top + 30 * u, 4 * u, H * 2, 2 * u, 'rgba(90,55,30,0.45)'); flRect(cx + w * 0.31, top + 30 * u, 4 * u, H * 2, 2 * u, 'rgba(90,55,30,0.45)');
    for (let i = 0; i < 4; i++) flEll(cx + 16 * u, top + 150 * u + i * 135 * u, 9 * u, 9 * u, '#3b2416');
    if (o.blood) { flBlood(cx - w * 0.28, top + 170 * u, 1.3 * u * 1.6, o.blood, 'gvb1'); flBlood(cx + w * 0.22, top + 260 * u, 1.1 * u * 1.6, o.blood, 'gvb2'); flBlood(cx - w * 0.1, top + 380 * u, u * 1.6, o.blood, 'gvb3'); }
    ctx.restore();
  }
  flVec(ex, cx, cy, faceW, { blink: o.blink ?? (o.mood === 'calm' ? 0 : flvBlink(o.key || 0)), rot: o.rot, pupilK: o.pupilK, cutBelow: flvFace(ex)[3] - 2 });
  if (o.sweat) flEll(cx + faceW * 0.42, cy - faceW * 0.25 + mod(TT * 0.8, 1) * 30 * u, 5 * u, 8 * u, '#cfe8ff', 0.85);
}
// Klaus: the traced head already includes the hood and the hoodie's top; the hoodie continues below
function flvKlaus(cx, cy, faceW, o = {}) {
  const ex = K_EXPR[o.mood || 'angry'] || 'k_angry', u = faceW / 240;
  const M = flvMap(ex, cx, cy, faceW), hb = M.lbox('hood');
  if (o.body !== false) { const top = M.bottom - 30 * u, x0 = hb[0], x1 = hb[2], sw = faceW * 1.45; ctx.save(); ctx.fillStyle = '#3c3d48'; ctx.beginPath(); ctx.moveTo(x0 + 10 * u, top); ctx.lineTo(x1 - 10 * u, top); ctx.quadraticCurveTo(cx + sw, top + 40 * u, cx + sw, top + 220 * u); ctx.lineTo(cx + sw, H * 2); ctx.lineTo(cx - sw, H * 2); ctx.lineTo(cx - sw, top + 220 * u); ctx.quadraticCurveTo(cx - sw, top + 40 * u, x0 + 10 * u, top); ctx.fill(); flRect(cx - faceW * 0.5, top + 330 * u, faceW, 170 * u, 18 * u, '#33343e'); ctx.restore(); }
  flVec(ex, cx, cy, faceW, { blink: o.blink ?? flvBlink(o.key ?? 5, 4.1), rot: o.rot });
  // the two round lumps on the hood (darker), measured from the reference
  for (const sgn of [-1, 1]) flEll(cx + sgn * faceW * 0.5, hb[1] + faceW * 0.5, faceW * 0.13, faceW * 0.15, '#33343e');
  if (o.body !== false) for (const sgn of [-1, 1]) flLine([[cx + sgn * 26 * u, M.bottom - 10 * u], [cx + sgn * 28 * u, M.bottom + 140 * u]], '#d9d9de', 5 * u);
}
function flvFather(cx, cy, faceW, o = {}) {
  const u = faceW / 300;
  if (o.body !== false) { const M = flvMap('f_open', cx, cy, faceW), sb = M.lbox('shirt'), top = M.bottom - 4, hw = Math.max(cx - sb[0], sb[2] - cx); ctx.save(); ctx.fillStyle = flGrad(cx - hw, 0, cx + hw, 0, [[0, '#eeeeea'], [0.8, '#e6e6e1'], [1, '#c8cac6']]); ctx.fillRect(cx - hw, top, 2 * hw, H * 2); ctx.restore(); }
  flVec('f_open', cx, cy, faceW, { blink: o.closed ? 1 : (o.blink ?? 0), rot: o.rot, lidC: '#d9bcab' });
}
// ---------------------------------------------------------------- full bodies (proportions measured from the references)
// Greta: total height h ≈ 3.95 × head width; coat 2.25 head-heights, legs navy, small dark shoes, hands at the coat's edge
function flvGretaFull(x, y, h, o = {}) {
  const u = h / 380, hw = 76 * u;    // head (hair) width
  ctx.save(); ctx.translate(x, y); if (o.lean) ctx.rotate(o.lean);
  const g = o.gait ? flGait(TT, o.gait, 22) : null, kneel = o.kneel ?? 0;
  const legH = 67 * u * (1 - kneel * 0.6), coatTop = -h + 97 * u * 1, coatBot = -legH;
  // legs + shoes
  for (const s of [-1, 1]) { const a = g ? (s < 0 ? g.legL[0] : g.legR[0]) * DEG : 0; ctx.save(); ctx.translate(s * 13 * u, coatBot - 6 * u); ctx.rotate(a); flRect(-8 * u, 0, 16 * u, legH + 2 * u, 3 * u, '#26314f'); flEll(3 * u, legH + 2 * u, 13 * u, 6 * u, '#141414'); ctx.restore(); }
  // arms behind/along the coat, hands peeking out
  const arm = (s, ang) => { ctx.save(); ctx.translate(s * 46 * u, coatTop + 18 * u); ctx.rotate(-s * ang); flRect(-8 * u, 0, 16 * u, 110 * u, 8 * u, '#7c4f2d'); flEll(0, 116 * u, 10 * u, 10 * u, '#f0c3a2'); ctx.restore(); };
  const aL = o.armL ?? (g ? g.armL[0] * DEG * 0.6 : 0.05), aR = o.armR ?? (g ? g.armR[0] * DEG * 0.6 : 0.05);
  if (!o.armsFront) { arm(-1, aL); arm(1, aR); }
  // coat: slightly flared rectangle with rounded shoulders
  ctx.save(); ctx.fillStyle = flGrad(-60 * u, 0, 60 * u, 0, [[0, '#8f5e38'], [1, '#7c4f2d']]); ctx.beginPath();
  ctx.moveTo(-50 * u, coatTop + 12 * u); ctx.quadraticCurveTo(-50 * u, coatTop, -38 * u, coatTop); ctx.lineTo(38 * u, coatTop); ctx.quadraticCurveTo(50 * u, coatTop, 50 * u, coatTop + 12 * u);
  ctx.lineTo(54 * u, coatBot); ctx.lineTo(-54 * u, coatBot); ctx.closePath(); ctx.fill(); ctx.restore();
  flRect(-1.5 * u, coatTop + 4 * u, 3 * u, coatBot - coatTop - 4 * u, 1 * u, '#6e4526');
  for (let i = 0; i < 4; i++) flEll(5 * u, coatTop + 40 * u + i * 48 * u, 3.6 * u, 3.6 * u, '#3b2416');
  if (o.blood ?? 1) { const R = RNG('gfb'); for (let i = 0; i < 5; i++) flEll(R.r(-42, 42) * u, coatTop + R.r(90, 200) * u, 4.5 * u, 4.5 * u, '#d32a34'); }
  if (!o.armsFront) {} else { arm(-1, o.armL ?? 2.4); arm(1, o.armR ?? 2.4); }
  // neck + traced head
  flRect(-9 * u, coatTop - 12 * u, 18 * u, 16 * u, 4 * u, '#e9b896');
  flVec(G_EXPR[o.mood || 'sad'] || 'g_12.5', 0, coatTop - 50 * u, 70 * u, { cutBelow: flvFace(G_EXPR[o.mood || 'sad'] || 'g_12.5')[3] - 2, blink: flvBlink(o.key || 1) });
  if (o.extra) o.extra(u, coatTop);
  ctx.restore();
}
// Klaus full: hoodie block (hood merges into it), dark legs, a hanging arm, the traced head on top
function flvKlausFull(x, y, h, o = {}) {
  const u = h / 415; ctx.save(); ctx.translate(x, y); if (o.flip) ctx.scale(-1, 1);
  const g = o.gait ? flGait(TT, o.gait, 24) : null;
  const legH = 120 * u, bodyTop = -h + 120 * u, bodyBot = -legH;
  for (const s of [-1, 1]) { const a = g ? (s < 0 ? g.legL[0] : g.legR[0]) * DEG : 0; ctx.save(); ctx.translate(s * 15 * u, bodyBot - 4 * u); ctx.rotate(a); flRect(-9 * u, 0, 18 * u, legH, 4 * u, '#1d1d22'); flEll(4 * u, legH, 15 * u, 7 * u, '#0e0e10'); ctx.restore(); }
  ctx.save(); ctx.fillStyle = '#3c3e4c'; ctx.beginPath(); ctx.roundRect(-58 * u, bodyTop, 116 * u, bodyBot - bodyTop, [36 * u, 36 * u, 6 * u, 6 * u]); ctx.fill(); ctx.restore();
  flRect(-34 * u, bodyBot - 95 * u, 68 * u, 40 * u, 8 * u, '#33343f');
  for (const s of [-1, 1]) flLine([[s * 10 * u, bodyTop + 10 * u], [s * 11 * u, bodyTop + 52 * u]], '#d9d9de', 2.4 * u);
  const arm = (s, ang) => { ctx.save(); ctx.translate(s * 52 * u, bodyTop + 22 * u); ctx.rotate(-s * ang); flRect(-8 * u, 0, 16 * u, 125 * u, 8 * u, '#353744'); flEll(0, 130 * u, 10 * u, 10 * u, '#d1a495'); ctx.restore(); };
  arm(-1, o.armL ?? (g ? g.armL[0] * DEG * 0.6 : 0.04)); arm(1, o.armR ?? (g ? g.armR[0] * DEG * 0.6 : 0.04));
  flVec('k_angry', 0, bodyTop - 40 * u, 52 * u, { blink: flvBlink(5) });
  if (o.extra) o.extra(u, bodyTop);
  ctx.restore();
}
function flvFatherFull(x, y, h, o = {}) {
  const u = h / 400; ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot);
  const legH = 120 * u, bodyTop = -h + 110 * u, bodyBot = -legH;
  for (const s of [-1, 1]) { flRect(s * 15 * u - 9 * u, bodyBot - 4 * u, 18 * u, legH, 4 * u, '#3b3a40'); flEll(s * 15 * u + 4 * u, -2 * u, 15 * u, 7 * u, '#1d1c1f'); }
  ctx.save(); ctx.fillStyle = '#ecece8'; ctx.beginPath(); ctx.roundRect(-52 * u, bodyTop, 104 * u, bodyBot - bodyTop, [28 * u, 28 * u, 4 * u, 4 * u]); ctx.fill(); ctx.restore();
  flBlood(-20 * u, bodyTop + 50 * u, 0.35 * u, 1, 'ffb1'); flBlood(18 * u, bodyTop + 90 * u, 0.4 * u, 1, 'ffb2');
  flVec('f_open', 0, bodyTop - 30 * u, 56 * u, { blink: o.closed ? 1 : 0.2, lidC: '#d9bcab' });
  ctx.restore();
}

// ---------------------------------------------------------------- SOLDIERS traced from "Flucht" (fs 19.5): tall, olive vest, rifle across the chest
// (x, y) = between the feet, h = height. o.eyes: 'white' | 'red'; o.run: legs swing (drawn), o.lean, o.flip, o.alpha, o.bob
const SOLD = { hip: 274, legs: [[78, 98], [106, 124]], foot: 456, eyes: [[86, 77], [113.6, 77]] };
function flvSprite(name, o = {}) {
  const V = FLV[name]; const top = ['white', 'red'];
  const sorted = V.order.filter((n) => !top.includes(n)).concat(top.filter((n) => V.order.includes(n)));
  for (const ln of sorted) { const c = V.layers[ln].c; ctx.fillStyle = c; ctx.strokeStyle = c; ctx.lineWidth = 0.6; for (const p of flvPaths(name, ln)) { if (o.maxY != null && p.box[1] > o.maxY) continue; ctx.fill(p.P, 'evenodd'); ctx.stroke(p.P); } }
}
function flvSoldier(x, y, h, o = {}) {
  const V = FLV.s_full, s = h / (SOLD.foot - 20), cx = (SOLD.legs[0][0] + SOLD.legs[1][1]) / 2;
  ctx.save(); ctx.translate(x, y - (o.bob ?? 0)); if (o.flip) ctx.scale(-1, 1); if (o.lean) ctx.rotate(o.lean); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  ctx.scale(s, s); ctx.translate(-cx, -SOLD.foot);
  if (o.run != null) {
    // legs drawn: two olive bars swinging from the hip, black boots
    SOLD.legs.forEach(([a, b], i) => { const sw = Math.sin(o.run * TAU + (i ? Math.PI : 0)) * 0.45; ctx.save(); ctx.translate((a + b) / 2, SOLD.hip); ctx.rotate(sw); flRect(-(b - a) / 2, 0, b - a, SOLD.foot - SOLD.hip, 3, '#373d2f'); flEll(3, SOLD.foot - SOLD.hip, 11, 5, '#151515'); ctx.restore(); });
    ctx.save(); ctx.beginPath(); ctx.rect(-50, -50, V.w + 100, SOLD.hip + 50); ctx.clip(); flvSprite('s_full'); ctx.restore();
  } else flvSprite('s_full');
  // the goggles (one is lost in the trace): white, or glowing red at night
  for (const [ex, ey] of SOLD.eyes) { if (o.eyes === 'red') { flGlow(ex, ey, 18, 'rgba(255,40,50,0.7)'); flEll(ex, ey, 7, 4.5, '#ff2b3a'); } else { flEll(ex, ey, 7.5, 5.5, '#e2e5e8'); flEll(ex + 1, ey + 1, 3, 3, '#7f8590', 0.5); } }
  ctx.restore();
}
function flvMuzzle(x, y, h, flip) { const s = h / (SOLD.foot - 20), cx = (SOLD.legs[0][0] + SOLD.legs[1][1]) / 2; return [x + (180 - cx) * s * (flip ? -1 : 1), y + (235 - SOLD.foot) * s]; }
function flvSoldierHeadAt(x, y, h, flip) { const s = h / (SOLD.foot - 20), cx = (SOLD.legs[0][0] + SOLD.legs[1][1]) / 2; return [x + (100 - cx) * s * (flip ? -1 : 1), y + (85 - SOLD.foot) * s, s]; }
function flLaser(a, b, w = 4) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; flLine([a, b], 'rgba(255,40,60,0.55)', w); ctx.restore(); flGlow(b[0], b[1], 34, 'rgba(255,40,60,0.85)'); flEll(b[0], b[1], 7, 7, '#ff2b3a'); }
