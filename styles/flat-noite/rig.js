// =====================================================================
//  styles/flat-noite/rig.js — articulated characters: Rafael (hero), women (police, Kombi driver), dog.
//  Local coords: origin = between the feet on the ground; r = head radius (48 at s = 1); y grows down.
//  Limb angles are measured from straight down, positive turns toward +x (screen right). Knee/elbow are relative.
// =====================================================================
const RR = 48;
const fnDir = (a) => [Math.sin(a), Math.cos(a)];
function fnLimb(x, y, a1, a2, l1, l2, w, c, cEnd, endR) {
  const [dx1, dy1] = fnDir(a1), ex = x + dx1 * l1, ey = y + dy1 * l1, [dx2, dy2] = fnDir(a1 + a2), hx = ex + dx2 * l2, hy = ey + dy2 * l2;
  fnStroke([[x, y], [ex, ey], [hx, hy]], w, c);
  if (cEnd) fnCirc(hx, hy, endR, cEnd);
  return [hx, hy, a1 + a2];
}
function fnShoe(x, y, ang, face, r) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(-ang * 0.6);
  fnEll(face * r * 0.18, r * 0.02, r * 0.42, r * 0.2, FN.shoe); fnRR(face * r * 0.18 - r * 0.42, r * 0.1, r * 0.84, r * 0.1, r * 0.05, FN.sole);
  ctx.restore();
}
// auto blink: closed for ~0.12s every 2.5–4s (per key)
function fnBlink(key) { const R = RNG('blink', key), per = 2.6 + R.f() * 1.4, ph = R.f() * per; return mod(TT + ph, per) < 0.12; }

// ---------- faces (drawn at head centre, radius r)
function fnEyes(r, o, look, lid) {
  const ex = 0.38 * r, ey = -0.02 * r, mode = o.blink && (o.eyes || 'open') !== 'wide' && fnBlink(o.key || 'h') ? 'closed' : (o.eyes || 'open');
  const sx = (o.side || 0) * 0.3 * r * (o.face || 1);
  for (const sgn of [-1, 1]) {
    const x = sgn * ex + sx * (sgn === (o.face || 1) ? 1.15 : 0.85), y = ey;
    if (mode === 'closed') { fnStroke(arcPts(x, y + 0.02 * r, 0.2 * r, 0.15 * Math.PI, 0.85 * Math.PI, 10), 0.07 * r, FN.hair); continue; }
    if (mode === 'squeeze') { fnStroke([[x - sgn * 0.18 * r, y - 0.12 * r], [x + sgn * 0.08 * r, y], [x - sgn * 0.18 * r, y + 0.12 * r]], 0.075 * r, FN.hair); continue; }
    const wr = (mode === 'wide' ? 0.31 : 0.27) * r, pr = (mode === 'wide' ? 0.075 : 0.12) * r;
    fnCirc(x, y, wr, '#ffffff');
    const px = x + clamp(look[0], -1, 1) * (wr - pr - 0.03 * r), py = y + clamp(look[1], -1, 1) * (wr - pr - 0.03 * r);
    fnCirc(px, py, pr, '#111118'); fnCirc(px + pr * 0.35, py - pr * 0.4, pr * 0.32, '#ffffff');
    const L = mode === 'squint' ? 0.55 : lid;   // eyelid: skin over the top part of the eye
    if (L > 0) { ctx.save(); ctx.beginPath(); ctx.arc(x, y, wr + 0.5, 0, TAU); ctx.clip(); fnRect(x - wr - 2, y - wr - 2, wr * 2 + 4, (wr * 2 + 4) * L, o.skin || FN.skin); fnLine(x - wr, y - wr + (wr * 2 + 4) * L, x + wr, y - wr + (wr * 2 + 4) * L, 0.05 * r, o.lidLine || FN.hair); ctx.restore(); }
  }
  return sx;
}
function fnBrows(r, o, sx) {
  const m = o.brow || 'n', lift = o.browLift || 0;
  const tilt = { n: 0, worry: -0.38, angry: 0.42, up: -0.1, sad: -0.25, cold: 0.2 }[m] ?? 0, y = -0.4 * r - (m === 'up' ? 0.1 * r : 0) - lift * r;
  for (const sgn of [-1, 1]) {
    const cx = sgn * 0.38 * r + sx, a = tilt * sgn;   // inner end up for worry (negative tilt raises the inner end)
    const dx = Math.cos(a) * 0.17 * r, dy = Math.sin(a) * 0.17 * r;
    fnLine(cx - dx, y - dy, cx + dx, y + dy, 0.065 * r, o.browC || FN.hair);
  }
}
function fnMouth(r, o, sx) {
  const m = o.mouth || 'flat', x = sx * 1.05, y = 0.46 * r, dark = '#3a1418';
  const br = 0.5 + 0.5 * Math.sin(TT * TAU / (o.breath || 1.2));
  if (m === 'flat') fnLine(x - 0.12 * r, y, x + 0.12 * r, y, 0.055 * r, dark);
  else if (m === 'smile') fnStroke(arcPts(x, y - 0.12 * r, 0.16 * r, 0.2 * Math.PI, 0.8 * Math.PI, 10), 0.055 * r, dark);
  else if (m === 'frown') fnStroke(arcPts(x, y + 0.14 * r, 0.15 * r, 1.2 * Math.PI, 1.8 * Math.PI, 10), 0.055 * r, dark);
  else if (m === 'o') fnEll(x, y, 0.09 * r, 0.12 * r, dark);
  else if (m === 'open' || m === 'shout') { const h = m === 'shout' ? 0.22 : 0.16; fnEll(x, y + 0.02 * r, 0.16 * r, h * r, dark); fnEll(x, y + h * 0.55 * r, 0.09 * r, 0.05 * r, '#d9566a'); }
  else if (m === 'pant') { fnEll(x, y + 0.02 * r, 0.13 * r, (0.07 + 0.08 * br) * r, dark); }
  else if (m === 'grit') { fnRR(x - 0.17 * r, y - 0.06 * r, 0.34 * r, 0.13 * r, 0.04 * r, '#ffffff'); fnLine(x - 0.17 * r, y, x + 0.17 * r, y, 0.02 * r, '#999'); }
  else if (m === 'wobble') { const P = []; for (let i = 0; i <= 6; i++) P.push([x - 0.15 * r + i * 0.05 * r, y + ((i % 2) ? -0.03 : 0.03) * r * (1 + 0.4 * Math.sin(TT * 30))]); fnStroke(P, 0.05 * r, dark); }
  else if (m === 'puff') { fnCirc(x, y, 0.045 * r, dark); }
  else if (m === 'smirk') fnStroke([[x - 0.12 * r, y + 0.02 * r], [x + 0.06 * r, y], [x + 0.14 * r, y - 0.06 * r]], 0.05 * r, dark);
  else if (m === 'chew') { const k = Math.abs(Math.sin(TT * 9)); fnEll(x, y, 0.1 * r, (0.03 + 0.05 * k) * r, dark); }
}
function fnSweat(r, o) {
  const k = o.sweat || 0; if (k <= 0) return;
  const u = mod(TT * 0.7 + hash(o.key || 's') % 10 / 10, 1), x = -0.82 * r * (o.face || 1), y = -0.3 * r + u * 0.6 * r;
  fnAlpha(k * (1 - u * 0.6), () => { ctx.beginPath(); ctx.moveTo(x, y - 0.14 * r); ctx.quadraticCurveTo(x + 0.08 * r, y, x, y + 0.05 * r); ctx.quadraticCurveTo(x - 0.08 * r, y, x, y - 0.14 * r); ctx.fillStyle = '#9fd6ff'; ctx.fill(); });
}
// ---------- Rafael's head (traced from Parte 1: smooth black cap with sideburns, big white eyes with large pupils,
//            thin arched brows, strong pink cheeks, a tiny nose, small ears, slightly tall oval head)
function fnRafaelHead(r, o) {
  const look = o.look || [0, 0], sx0 = (o.side || 0) * 0.3 * r * (o.face || 1), ry = 1.06 * r;
  if (o.hood) fnEll(0, 0.1 * r, 1.32 * r, 1.3 * r, FN.hoodD);
  if (o.back) {
    fnEll(-0.98 * r, 0.12 * r, 0.17 * r, 0.22 * r, FN.skinD); fnEll(0.98 * r, 0.12 * r, 0.17 * r, 0.22 * r, FN.skinD); fnEll(0, 0, r, ry, FN.skin);
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, r, ry, 0, 0, TAU); ctx.clip(); fnRect(-1.2 * r, -1.2 * r, 2.4 * r, 1.75 * r, FN.hair); fnEll(0, 0.55 * r, 0.9 * r, 0.2 * r, FN.hair); ctx.restore();
    if (o.hood) { ctx.beginPath(); ctx.ellipse(0, 0.1 * r, 1.34 * r, 1.32 * r, 0, 0, TAU); ctx.fillStyle = FN.hood; ctx.fill(); }
    return;
  }
  fnEll(-0.98 * r + sx0 * 0.4, 0.12 * r, 0.17 * r, 0.22 * r, FN.skin); fnEll(0.98 * r + sx0 * 0.4, 0.12 * r, 0.17 * r, 0.22 * r, FN.skin);   // ears
  fnEll(-0.98 * r + sx0 * 0.4, 0.12 * r, 0.08 * r, 0.12 * r, FN.skinD); fnEll(0.98 * r + sx0 * 0.4, 0.12 * r, 0.08 * r, 0.12 * r, FN.skinD);
  fnEll(0, 0, r, ry, FN.skin);
  // hair cap: covers the top, a smooth hairline arching over the forehead, sideburns down to the ears
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, r * 1.01, ry * 1.01, 0, 0, TAU); ctx.clip();
  ctx.beginPath(); ctx.moveTo(-1.1 * r, 0.2 * r); ctx.lineTo(-0.9 * r, 0.2 * r);
  ctx.quadraticCurveTo(-0.86 * r + sx0 * 0.3, -0.36 * r, -0.35 * r + sx0 * 0.4, -0.5 * r);
  ctx.quadraticCurveTo(0.05 * r + sx0 * 0.4, -0.58 * r, 0.42 * r + sx0 * 0.4, -0.48 * r);
  ctx.quadraticCurveTo(0.86 * r + sx0 * 0.3, -0.36 * r, 0.9 * r, 0.2 * r); ctx.lineTo(1.1 * r, 0.2 * r); ctx.lineTo(1.1 * r, -1.2 * r); ctx.lineTo(-1.1 * r, -1.2 * r); ctx.closePath();
  ctx.fillStyle = FN.hair; ctx.fill(); ctx.restore();
  ctx.beginPath(); ctx.ellipse(0, -0.06 * r, 1.04 * r, 1.04 * ry, 0, Math.PI * 1.08, Math.PI * 1.92); ctx.lineTo(0.6 * r, -0.55 * r); ctx.lineTo(-0.6 * r, -0.55 * r); ctx.closePath(); ctx.fillStyle = FN.hair; ctx.fill();   // a little volume on top
  if (o.hood) { ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0.1 * r, 1.34 * r, 1.32 * r, 0, 0, TAU); ctx.ellipse(sx0 * 0.4, 0.14 * r, 1.0 * r, 1.08 * r, 0, 0, TAU, true); ctx.fillStyle = FN.hood; ctx.fill('evenodd'); ctx.restore(); }
  fnEll(-0.56 * r + sx0, 0.3 * r, 0.17 * r, 0.1 * r, FN.cheek); fnEll(0.56 * r + sx0, 0.3 * r, 0.17 * r, 0.1 * r, FN.cheek);
  const sx = fnRafEyes(r, o, look);
  fnRafBrows(r, o, sx);
  ctx.beginPath(); ctx.arc(sx * 1.1 + 0.02 * r, 0.2 * r, 0.07 * r, -0.4 * Math.PI, 0.5 * Math.PI); ctx.lineWidth = 0.04 * r; ctx.strokeStyle = FN.skinD; ctx.lineCap = 'round'; ctx.stroke();   // nose
  if (o.mouth === 'puff' || o.puff) { fnCirc(-0.45 * r + sx, 0.42 * r, 0.2 * r, FN.skinL); fnCirc(0.45 * r + sx, 0.42 * r, 0.2 * r, FN.skinL); }
  ctx.save(); ctx.translate(0, 0.04 * r); ctx.scale(0.82, 0.82); fnMouth(r, o, sx / 0.82); ctx.restore();
  fnSweat(r, o);
  if (o.tear) fnAlpha(o.tear, () => { fnEll(-0.36 * r + sx, 0.3 * r, 0.05 * r, 0.1 * r, '#9fd6ff'); fnEll(0.36 * r + sx, 0.34 * r, 0.05 * r, 0.12 * r, '#9fd6ff'); });
}
function fnRafEyes(r, o, look) {
  const mode = o.blink !== false && (o.eyes || 'open') !== 'wide' && fnBlink(o.key || 'h') ? 'closed' : (o.eyes || 'open');
  const sx = (o.side || 0) * 0.3 * r * (o.face || 1), ey = 0.02 * r;
  for (const sgn of [-1, 1]) {
    const x = sgn * 0.37 * r + sx * (sgn === (o.face || 1) ? 1.15 : 0.85), y = ey;
    if (mode === 'closed') { fnStroke(arcPts(x, y - 0.02 * r, 0.17 * r, 0.15 * Math.PI, 0.85 * Math.PI, 10), 0.06 * r, FN.hair); continue; }
    if (mode === 'squeeze') { fnStroke([[x - sgn * 0.16 * r, y - 0.1 * r], [x + sgn * 0.06 * r, y], [x - sgn * 0.16 * r, y + 0.1 * r]], 0.065 * r, FN.hair); continue; }
    const wr = (mode === 'wide' ? 0.25 : 0.21) * r, pr = (mode === 'wide' ? 0.08 : 0.13) * r;
    fnCirc(x, y, wr, '#ffffff');
    const px = x + clamp(look[0], -1, 1) * (wr - pr - 0.02 * r), py = y + clamp(look[1], -1, 1) * (wr - pr - 0.02 * r);
    fnCirc(px, py, pr, '#0d0a0a'); fnCirc(px + pr * 0.38, py - pr * 0.38, pr * 0.22, 'rgba(255,255,255,0.85)');
    const L = mode === 'squint' ? 0.5 : (o.lid || 0);
    if (L > 0) { ctx.save(); ctx.beginPath(); ctx.arc(x, y, wr + 0.5, 0, TAU); ctx.clip(); fnRect(x - wr - 2, y - wr - 2, wr * 2 + 4, (wr * 2 + 4) * L, FN.skin); ctx.restore(); }
  }
  return sx;
}
function fnRafBrows(r, o, sx) {
  const m = o.brow || 'n', tilt = { n: 0, worry: -0.4, angry: 0.45, up: -0.05, sad: -0.3, cold: 0.2 }[m] ?? 0, y = -0.32 * r - (m === 'up' ? 0.1 * r : 0) - (o.browLift || 0) * r;
  for (const sgn of [-1, 1]) {
    const cx = sgn * 0.37 * r + sx; ctx.save(); ctx.translate(cx, y); ctx.rotate(tilt * sgn);
    ctx.beginPath(); ctx.arc(0, 0.16 * r, 0.2 * r, -0.78 * Math.PI, -0.22 * Math.PI); ctx.lineWidth = 0.05 * r; ctx.strokeStyle = FN.hair; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore();
  }
}
// ---------- Rafael (traced proportions: slim, long torso, thin limbs, small white sneakers; ~8.4 head radii tall)
//  p.outfit: 'hoodie' (default, grey with white strings) | 'tee' (green)
function fnRafael(x, y, s, p = {}) {
  const r = RR, face = p.face || 1, tee = p.outfit === 'tee';
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (p.shadow !== false) fnEll(0, 3, r * 1.05 * (1 - (p.bob || 0) / 300), r * 0.16, 'rgba(0,0,0,0.32)');
  const bob = p.bob || 0, lean = p.lean || 0, squash = p.squash || 0;
  ctx.translate(0, bob); ctx.scale(1 + squash * 0.5, 1 - squash);
  const hipY = -2.9 * r;
  const lL = p.lL || [0.03, 0], lR = p.lR || [-0.03, 0];
  const legW = 0.4 * r, l1 = 1.48 * r, l2 = 1.42 * r;
  const fL = fnLimb(-0.26 * r, hipY, lL[0], lL[1], l1, l2, legW, FN.jeansD);
  const fR = fnLimb(0.26 * r, hipY, lR[0], lR[1], l1, l2, legW, FN.jeans);
  [[fL, lL], [fR, lR]].forEach(([f, l]) => { ctx.save(); ctx.translate(f[0], f[1]); ctx.rotate(-(l[0] + l[1]) * 0.6); fnEll(face * 0.08 * r, 0.02 * r, 0.3 * r, 0.11 * r, FN.shoe); fnRect(face * 0.08 * r - 0.3 * r, 0.06 * r, 0.6 * r, 0.05 * r, FN.sole); ctx.restore(); });
  ctx.save(); ctx.translate(0, hipY); ctx.rotate(lean);
  const sh = -3.1 * r, armW = 0.3 * r, tw = tee ? 1.02 : 1.12, body = tee ? FN.tee : FN.hood, bodyD = tee ? FN.teeD : FN.hoodD;
  const aL = p.aL || [0.12, -0.04], aR = p.aR || [-0.12, 0.04];
  const handL = fnLimb(-tw * r + 0.12 * r, sh + 0.28 * r, aL[0], aL[1], 1.6 * r, 1.45 * r, armW, tee ? FN.skin : bodyD, FN.skin, 0.23 * r);
  if (tee) { const [dx, dy] = fnDir(aL[0]); fnStroke([[-tw * r + 0.12 * r, sh + 0.28 * r], [-tw * r + 0.12 * r + dx * 0.55 * r, sh + 0.28 * r + dy * 0.55 * r]], 0.42 * r, bodyD); }
  // torso: a long rounded box, the far half a shade darker (as in the reference)
  fnRR(-tw * r, sh, tw * 2 * r, -sh + (tee ? 0.15 : 0.3) * r, 0.42 * r, body);
  ctx.save(); ctx.beginPath(); ctx.roundRect(-tw * r, sh, tw * 2 * r, -sh + (tee ? 0.15 : 0.3) * r, 0.42 * r); ctx.clip(); fnRect(0.05 * r, sh, tw * r, -sh + r, 'rgba(0,0,0,0.13)'); ctx.restore();
  if (!tee) {
    fnRR(-tw * r, 0.05 * r, tw * 2 * r, 0.25 * r, 0.1 * r, bodyD);                // waistband
    fnRR(-0.62 * r, -1.05 * r, 1.24 * r, 0.62 * r, 0.16 * r, 'rgba(0,0,0,0.12)');  // kangaroo pocket
    if (!p.hood) { fnRR(-0.72 * r, sh - 0.2 * r, 1.44 * r, 0.42 * r, 0.21 * r, bodyD); fnRR(-0.3 * r, sh - 0.12 * r, 0.6 * r, 0.3 * r, 0.15 * r, FN.skinD); }
    const sw = Math.sin(TT * 6 + (p.run || 0)) * (p.run ? 0.12 : 0.02) * r;
    fnLine(-0.17 * r, sh + 0.15 * r, -0.18 * r + sw, sh + 1.0 * r, 0.05 * r, '#f2f2f6'); fnLine(0.17 * r, sh + 0.15 * r, 0.18 * r - sw, sh + 1.0 * r, 0.05 * r, '#f2f2f6');
  } else fnRR(-0.3 * r, sh - 0.06 * r, 0.6 * r, 0.22 * r, 0.11 * r, FN.skinD);
  // neck + head
  ctx.save(); ctx.translate(0, sh - 1.22 * r); ctx.rotate(p.tilt || 0);
  fnRR(-0.15 * r, 0.78 * r, 0.3 * r, 0.62 * r, 0.08 * r, '#b67a50');
  fnRafaelHead(r, { ...p, face, key: p.key || 'raf', blink: p.blink !== false });
  ctx.restore();
  const handR = fnLimb(tw * r - 0.12 * r, sh + 0.28 * r, aR[0], aR[1], 1.6 * r, 1.45 * r, armW, tee ? FN.skin : body, FN.skin, 0.23 * r);
  if (tee) { const [dx, dy] = fnDir(aR[0]); fnStroke([[tw * r - 0.12 * r, sh + 0.28 * r], [tw * r - 0.12 * r + dx * 0.55 * r, sh + 0.28 * r + dy * 0.55 * r]], 0.42 * r, body); }
  if (p.hold) p.hold(handR, handL);
  ctx.restore();
  ctx.restore();
  return { head: [x, y + (bob + hipY + sh - 1.22 * r) * s] };
}
// a run cycle: phase in cycles; returns pose fields
function fnRunPose(ph, amt = 1) {
  const a = Math.sin(ph * TAU), b = Math.cos(ph * TAU);
  return {
    lL: [0.75 * a * amt, Math.max(0, -1.1 * b) * amt - 0.1], lR: [-0.75 * a * amt, Math.max(0, 1.1 * b) * amt - 0.1],
    aL: [-0.9 * a * amt, -1.2 * amt], aR: [0.9 * a * amt, 1.2 * amt],
    bob: -Math.abs(Math.sin(ph * TAU)) * 22 * amt, lean: 0.18 * amt, run: ph * 7,
  };
}
function fnWalkPose(ph, amt = 1) {
  const a = Math.sin(ph * TAU);
  return { lL: [0.35 * a * amt, Math.max(0, -0.4 * Math.cos(ph * TAU)) * amt], lR: [-0.35 * a * amt, Math.max(0, 0.4 * Math.cos(ph * TAU)) * amt], aL: [-0.3 * a * amt, -0.2], aR: [0.3 * a * amt, 0.2], bob: -Math.abs(Math.sin(ph * TAU)) * 8 * amt };
}
// ---------- women: police (raincoat/vest), the Kombi driver. o: { hair, hairC, outfit, beard, hat, eyes, mouth, brow, look, aL, aR, ... }
function fnWomanHead(r, o) {
  const hc = o.hairC || '#6b3e1f', look = o.look || [0, 0];
  if (o.hair !== 'afro' && o.hair !== 'bun') { fnRR(-1.25 * r, -0.95 * r, 2.5 * r, 2.15 * r, 1.1 * r, hc); }
  if (o.hair === 'afro') { fnCirc(0, -0.25 * r, 1.3 * r, hc); [[-0.8, -0.9], [0.1, -1.25], [0.85, -0.85]].forEach(([a, b]) => fnCirc(a * r, b * r, 0.5 * r, hc)); fnCirc(0.6 * r, -1.0 * r, 0.22 * r, '#b9bcc8'); }
  if (o.hair === 'bun') { fnCirc(0, -1.15 * r, 0.42 * r, hc); fnCirc(0, -0.15 * r, 1.08 * r, hc); }
  fnCirc(0, 0, r, o.skin || FN.wSkin);
  if (o.hair !== 'afro') { ctx.beginPath(); ctx.arc(0, -0.05 * r, 1.08 * r, Math.PI * 1.02, Math.PI * 1.98); ctx.quadraticCurveTo(0.3 * r, -0.5 * r, -1.0 * r, -0.12 * r); ctx.closePath(); ctx.fillStyle = hc; ctx.fill(); }
  else { ctx.beginPath(); ctx.arc(0, -0.05 * r, 1.04 * r, Math.PI * 1.05, Math.PI * 1.95); ctx.quadraticCurveTo(0, -0.62 * r, -1.0 * r, -0.3 * r); ctx.fillStyle = hc; ctx.fill(); }
  if (o.earring) { fnCirc(-1.02 * r, 0.35 * r, 0.12 * r, '#f2c14e'); fnCirc(1.02 * r, 0.35 * r, 0.12 * r, '#f2c14e'); }
  fnEll(-0.55 * r, 0.28 * r, 0.17 * r, 0.1 * r, FN.cheek); fnEll(0.55 * r, 0.28 * r, 0.17 * r, 0.1 * r, FN.cheek);
  const sx = fnEyes(r, { ...o, skin: o.skin || FN.wSkin, lidLine: '#3a2418' }, look, o.lid ?? 0.42);
  fnBrows(r, { ...o, browC: '#3a2418' }, sx);
  fnStroke(arcPts(sx, 0.13 * r, 0.07 * r, 0.1 * Math.PI, 0.9 * Math.PI, 8), 0.04 * r, o.skinD || FN.wSkinD);
  fnMouth(r, o, sx);
  if (o.beard > 0) {   // a fake beard: black, a bit crooked, peeling off by (1 - beard)
    ctx.save(); const off = (1 - o.beard); ctx.translate(off * 0.9 * r, off * 1.6 * r); ctx.rotate(off * 0.7 + 0.04);
    fnAlpha(clamp(o.beard * 3), () => { ctx.beginPath(); ctx.moveTo(-0.85 * r, 0.05 * r); ctx.quadraticCurveTo(-0.9 * r, 1.0 * r, 0, 1.15 * r); ctx.quadraticCurveTo(0.9 * r, 1.0 * r, 0.85 * r, 0.05 * r); ctx.quadraticCurveTo(0.4 * r, 0.6 * r, 0.25 * r, 0.32 * r); ctx.lineTo(-0.25 * r, 0.32 * r); ctx.quadraticCurveTo(-0.4 * r, 0.6 * r, -0.85 * r, 0.05 * r); ctx.fillStyle = '#18120f'; ctx.fill(); fnEll(0, 0.36 * r, 0.32 * r, 0.08 * r, '#18120f'); });
    ctx.restore();
  }
  if (o.hat) { fnEll(0, -0.62 * r, 1.4 * r, 0.32 * r, '#e0a91f'); fnRR(-0.85 * r, -1.25 * r, 1.7 * r, 0.75 * r, 0.4 * r, '#f2c230'); }
}
function fnWoman(x, y, s, o = {}) {
  const r = RR;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
  if (o.shadow !== false) fnEll(0, 4, r * 1.25, r * 0.2, 'rgba(0,0,0,0.35)');
  ctx.translate(0, o.bob || 0);
  const hipY = -2.9 * r, coat = { raincoat: '#f2c230', vest: '#16171e', denim: '#4a6fa5', purple: '#6b4fa0' }[o.outfit || 'vest'], coatD = { raincoat: '#c99a1a', vest: '#0d0e13', denim: '#36527c', purple: '#4f3a7a' }[o.outfit || 'vest'];
  const lL = o.lL || [0.05, 0], lR = o.lR || [-0.05, 0];
  const fL = fnLimb(-0.24 * r, hipY, lL[0], lL[1], 1.48 * r, 1.42 * r, 0.38 * r, '#1c2035');
  const fR = fnLimb(0.24 * r, hipY, lR[0], lR[1], 1.48 * r, 1.42 * r, 0.38 * r, '#262b47');
  [fL, fR].forEach((f) => { fnEll(f[0] + 0.06 * r, f[1] + 0.02 * r, 0.28 * r, 0.1 * r, '#e9e9ee'); });
  ctx.save(); ctx.translate(0, hipY); ctx.rotate(o.lean || 0);
  const sh = -3.0 * r, aL = o.aL || [0.12, -0.04], aR = o.aR || [-0.12, 0.04];
  const hL = fnLimb(-0.86 * r, sh + 0.28 * r, aL[0], aL[1], 1.55 * r, 1.4 * r, 0.3 * r, coatD, o.skin || FN.wSkin, 0.22 * r);
  fnRR(-0.98 * r, sh, 1.96 * r, -sh + 0.25 * r, 0.4 * r, coat); ctx.save(); ctx.beginPath(); ctx.roundRect(-0.98 * r, sh, 1.96 * r, -sh + 0.25 * r, 0.4 * r); ctx.clip(); fnRect(0.05 * r, sh, r, -sh + r, 'rgba(0,0,0,0.13)'); ctx.restore();
  if (o.outfit === 'vest') { fnRR(-0.62 * r, sh + 0.7 * r, 1.24 * r, 0.34 * r, 0.06 * r, 'rgba(255,255,255,0.08)'); ctx.save(); ctx.font = `900 ${0.27 * r}px ${FONT_SUB}`; ctx.textAlign = 'center'; ctx.fillStyle = '#ffffff'; ctx.fillText('POLÍCIA', 0, sh + 0.97 * r); ctx.restore(); fnRR(-0.7 * r, sh + 1.25 * r, 0.4 * r, 0.5 * r, 0.06 * r, '#262833'); fnRR(0.3 * r, sh + 1.25 * r, 0.4 * r, 0.5 * r, 0.06 * r, '#262833'); }
  if (o.outfit === 'raincoat') { fnLine(0, sh + 0.2 * r, 0, 0.2 * r, 0.05 * r, coatD); [0.5, 1.0, 1.5].forEach((k) => fnCirc(0.12 * r, sh + k * r, 0.05 * r, coatD)); }
  if (o.outfit === 'denim') { fnPath([[-0.3 * r, sh], [0, sh + 0.7 * r], [0.3 * r, sh]]); ctx.fillStyle = '#2b2b2b'; ctx.fill(); }
  ctx.save(); ctx.translate(0, sh - 1.22 * r); ctx.rotate(o.tilt || 0);
  fnRR(-0.15 * r, 0.78 * r, 0.3 * r, 0.6 * r, 0.08 * r, o.skinD || FN.wSkinD);
  fnWomanHead(r, { ...o, key: o.key || 'w', blink: o.blink !== false });
  ctx.restore();
  const hR = fnLimb(0.86 * r, sh + 0.28 * r, aR[0], aR[1], 1.55 * r, 1.4 * r, 0.3 * r, coat, o.skin || FN.wSkin, 0.22 * r);
  if (o.hold) o.hold(hR, hL);
  ctx.restore(); ctx.restore();
}
// a flashlight held at hand h=[x,y,ang], beam toward world angle (cone drawn by the caller in world space if needed)
function fnFlashlight(h, ang, beam = 1) {
  const [x, y] = h; ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
  fnRR(-8, -6, 16, 46, 4, '#2b2d36'); fnRR(-11, 34, 22, 14, 4, '#3a3d48'); fnCirc(0, 49, 9, '#fffbe0');
  if (beam > 0) fnCone(0, 50, 0, 900, 260, 'rgba(255,248,210,0.9)', 0.28 * beam, 26);
  ctx.restore();
}
// ---------- the street dog (caramel vira-lata). o: { bark: 0..1, run, face }
function fnDog(x, y, s, o = {}) {
  const c = '#c98a3e', cd = '#a46c2a', bark = o.bark || 0, f = o.face || 1;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s);
  fnEll(0, 4, 120, 16, 'rgba(0,0,0,0.3)');
  const leg = (lx, a) => fnStroke([[lx, -70], [lx + Math.sin(a) * 30, -35], [lx + Math.sin(a) * 22, 0]], 18, cd);
  const ph = (o.run || 0) * TAU;
  leg(-60, Math.sin(ph) * 0.6); leg(55, -Math.sin(ph) * 0.6);
  fnRR(-90, -120, 180, 70, 35, c);
  fnStroke([[-88, -105], [-125, -140 + Math.sin(TT * 14) * 12], [-140, -150]], 12, c);   // wagging tail
  leg(-40, -Math.sin(ph) * 0.6); leg(75, Math.sin(ph) * 0.6);
  ctx.save(); ctx.translate(95, -135); ctx.rotate(-0.2 - bark * 0.25);
  fnRR(-10, -45, 80, 70, 30, c); fnRR(45, -10 + bark * 6, 55, 26, 12, c);   // head + snout
  fnRR(45, 14, 50, 12 + bark * 26, 8, '#5a1e22');   // open jaw
  if (bark > 0.2) fnRR(52, 14, 36, 8, 3, '#ffffff');
  fnRR(45, 18 + bark * 26, 55, 16, 8, cd);   // lower jaw
  fnCirc(95, -2, 9, '#1a1412'); fnCirc(30, -20, 10, '#ffffff'); fnCirc(33, -20, 5.5, '#111');
  fnLine(26, -36, 40, -32 + bark * 8, 5, '#3a2418');   // angry brow
  fnPoly([[-5, -40], [15, -75], [30, -38]], cd); fnPoly([[20, -42], [55, -62], [45, -30]], cd);   // one folded ear
  ctx.restore(); ctx.restore();
}
