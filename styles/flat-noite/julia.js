// =====================================================================
//  styles/flat-noite/julia.js — Júlia, the crush: a pretty, clearly feminine design in the same flat look.
//  Long wavy hair with a side-swept fringe and face-framing locks, almond eyes with lashes and a coloured iris,
//  pink lips, soft oval face, slim neck, cinched waist. fnJulia(x, y, s, o) / fnJuliaHead(r, o, part)
//  o: hairC, skin, skinD, outfit ('purple' pyjama top | 'uniform'), look, eyes, lid, brow, mouth, flip, + limb poses
// =====================================================================
const JHL = (c) => fnLight(c, 0.18);
function fnJuliaHairBack(r, o) {
  const hc = o.hairC || '#4a2a18', sw = Math.sin(TT * 2.2) * 0.04 * r;
  ctx.beginPath(); ctx.moveTo(-1.05 * r, -0.4 * r);
  ctx.bezierCurveTo(-1.35 * r, 0.6 * r, -1.3 * r + sw, 1.8 * r, -1.0 * r + sw, 2.6 * r);
  for (let i = 0; i <= 6; i++) { const x = lerp(-1.0, 1.0, i / 6) * r + sw, y = 2.6 * r + (i % 2 ? 0.18 : 0) * r; ctx.lineTo(x, y); }
  ctx.bezierCurveTo(1.3 * r + sw, 1.8 * r, 1.35 * r, 0.6 * r, 1.05 * r, -0.4 * r);
  ctx.ellipse(0, -0.2 * r, 1.08 * r, 1.0 * r, 0, 0, Math.PI, true); ctx.closePath(); ctx.fillStyle = fnDark(hc, 0.15); ctx.fill();
}
function fnJuliaEyes(r, o) {
  const look = o.look || [0, 0], mode = o.blink !== false && (o.eyes || 'open') !== 'wide' && fnBlink(o.key || 'j') ? 'closed' : (o.eyes || 'open');
  for (const sgn of [-1, 1]) {
    const x = sgn * 0.36 * r, y = 0.04 * r, lash = '#1e120c';
    if (mode === 'closed') { fnStroke(arcPts(x, y - 0.04 * r, 0.19 * r, 0.12 * Math.PI, 0.88 * Math.PI, 12), 0.05 * r, lash); for (let k = 0; k < 3; k++) { const a = (0.2 + k * 0.12) * Math.PI * (sgn > 0 ? 1 : 1), px = x + sgn * Math.cos(0.15 * Math.PI) * 0.19 * r; fnLine(px - sgn * k * 0.05 * r, y + 0.1 * r - k * 0.01 * r, px - sgn * k * 0.05 * r + sgn * 0.06 * r, y + 0.16 * r, 0.03 * r, lash); } continue; }
    if (mode === 'squeeze') { fnStroke([[x - sgn * 0.17 * r, y - 0.1 * r], [x + sgn * 0.06 * r, y], [x - sgn * 0.17 * r, y + 0.1 * r]], 0.055 * r, lash); continue; }
    const ew = (mode === 'wide' ? 0.25 : 0.23) * r, eh = (mode === 'wide' ? 0.24 : 0.19) * r;
    ctx.save(); ctx.beginPath(); ctx.ellipse(x, y, ew, eh, 0, 0, TAU); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.clip();
    const ir = (mode === 'wide' ? 0.12 : 0.15) * r, px = x + clamp(look[0], -1, 1) * (ew - ir) * 0.8, py = y + clamp(look[1], -1, 1) * (eh - ir) * 0.6;
    fnCirc(px, py, ir, o.iris || '#6a3a1a'); fnCirc(px, py + ir * 0.25, ir * 0.7, fnLight(o.iris || '#6a3a1a', 0.15)); fnCirc(px, py, ir * 0.5, '#120a06');
    fnCirc(px + ir * 0.4, py - ir * 0.4, ir * 0.28, '#ffffff'); fnCirc(px - ir * 0.35, py + ir * 0.35, ir * 0.12, 'rgba(255,255,255,0.8)');
    const L = mode === 'squint' ? 0.45 : (o.lid || 0); if (L > 0) fnRect(x - ew - 2, y - eh - 2, ew * 2 + 4, (eh * 2 + 4) * L, o.skin || '#e8b48a');
    ctx.restore();
    // upper lid line + lashes flicking out at the outer corner
    const top = y - eh + (eh * 2) * (mode === 'squint' ? 0.45 : (o.lid || 0));
    ctx.beginPath(); ctx.ellipse(x, y + (top - (y - eh)), ew * 1.04, eh, 0, Math.PI * 1.05, Math.PI * 1.95); ctx.lineWidth = 0.055 * r; ctx.strokeStyle = '#1e120c'; ctx.lineCap = 'round'; ctx.stroke();
    const yc = y + (top - (y - eh));
    for (let k = 0; k < 3; k++) { const th = sgn < 0 ? Math.PI * (1.1 + k * 0.08) : Math.PI * (1.9 - k * 0.08), cx2 = x + Math.cos(th) * ew * 1.04, cy2 = yc + Math.sin(th) * eh; fnLine(cx2, cy2, cx2 + Math.cos(th) * 0.11 * r, cy2 + Math.sin(th) * 0.11 * r - 0.03 * r, 0.035 * r, '#1e120c'); }
  }
}
function fnJuliaBrows(r, o) {
  const tilt = { n: 0, worry: -0.35, angry: 0.4, up: -0.05, sad: -0.28, cold: 0.15 }[o.brow || 'n'] ?? 0, y = -0.3 * r - (o.brow === 'up' ? 0.08 * r : 0);
  for (const sgn of [-1, 1]) { ctx.save(); ctx.translate(sgn * 0.36 * r, y); ctx.rotate(tilt * sgn); ctx.beginPath(); ctx.moveTo(-0.18 * r * sgn, 0.03 * r); ctx.quadraticCurveTo(0, -0.07 * r, 0.2 * r * sgn, 0.02 * r); ctx.lineWidth = 0.045 * r; ctx.strokeStyle = fnDark(o.hairC || '#4a2a18', 0.2); ctx.lineCap = 'round'; ctx.stroke(); ctx.restore(); }
}
function fnJuliaMouth(r, o) {
  const m = o.mouth || 'flat', y = 0.52 * r, lip = '#e0607a', lipD = '#b8445e';
  if (m === 'flat') { fnEll(0, y - 0.015 * r, 0.12 * r, 0.035 * r, lip); fnEll(0, y + 0.03 * r, 0.1 * r, 0.04 * r, lipD); fnLine(-0.11 * r, y + 0.005 * r, 0.11 * r, y + 0.005 * r, 0.015 * r, '#8a2a40'); }
  else if (m === 'smile') { ctx.beginPath(); ctx.moveTo(-0.16 * r, y - 0.03 * r); ctx.quadraticCurveTo(0, y + 0.16 * r, 0.16 * r, y - 0.03 * r); ctx.quadraticCurveTo(0, y + 0.03 * r, -0.16 * r, y - 0.03 * r); ctx.fillStyle = lip; ctx.fill(); fnStroke(arcPts(0, y - 0.07 * r, 0.16 * r, 0.22 * Math.PI, 0.78 * Math.PI, 10), 0.02 * r, '#8a2a40'); }
  else if (m === 'smirk') { ctx.beginPath(); ctx.moveTo(-0.12 * r, y); ctx.quadraticCurveTo(0.04 * r, y + 0.06 * r, 0.15 * r, y - 0.05 * r); ctx.lineWidth = 0.05 * r; ctx.strokeStyle = lip; ctx.lineCap = 'round'; ctx.stroke(); }
  else if (m === 'frown') { fnStroke(arcPts(0, y + 0.12 * r, 0.12 * r, 1.2 * Math.PI, 1.8 * Math.PI, 8), 0.05 * r, lip); }
  else { ctx.save(); ctx.translate(0, 0); fnMouth(r * 0.85, { ...o }, 0); ctx.restore(); ctx.lineWidth = 0.03 * r; ctx.strokeStyle = lip; }
}
function fnJuliaHead(r, o = {}, part = 'all') {
  const hc = o.hairC || '#4a2a18', skin = o.skin || '#e8b48a', skinD = o.skinD || '#c99070';
  if (part !== 'front') fnJuliaHairBack(r, o);
  if (part === 'back') return;
  // face: soft oval with a gentle chin
  ctx.beginPath(); ctx.moveTo(-0.92 * r, -0.1 * r); ctx.bezierCurveTo(-0.95 * r, 0.55 * r, -0.45 * r, 1.0 * r, 0, 1.02 * r); ctx.bezierCurveTo(0.45 * r, 1.0 * r, 0.95 * r, 0.55 * r, 0.92 * r, -0.1 * r); ctx.ellipse(0, -0.1 * r, 0.92 * r, 0.95 * r, 0, 0, Math.PI, true); ctx.closePath(); ctx.fillStyle = skin; ctx.fill();
  ctx.save(); ctx.clip(); { const gx = 0.9 * r * (FN_LIGHT.dx < 0 ? 1 : -1), g = ctx.createRadialGradient(gx, 0.4 * r, 0.1 * r, gx, 0.4 * r, 1.1 * r); g.addColorStop(0, 'rgba(120,50,30,0.14)'); g.addColorStop(1, 'rgba(120,50,30,0)'); ctx.fillStyle = g; ctx.fillRect(-1.2 * r, -1.2 * r, 2.4 * r, 2.4 * r); } ctx.restore();
  fnEll(-0.55 * r, 0.32 * r, 0.17 * r, 0.09 * r, 'rgba(255,110,130,0.5)'); fnEll(0.55 * r, 0.32 * r, 0.17 * r, 0.09 * r, 'rgba(255,110,130,0.5)');
  fnJuliaEyes(r, { ...o, skin }); fnJuliaBrows(r, o);
  ctx.beginPath(); ctx.moveTo(0.02 * r, 0.18 * r); ctx.quadraticCurveTo(0.08 * r, 0.3 * r, -0.03 * r, 0.32 * r); ctx.lineWidth = 0.03 * r; ctx.strokeStyle = skinD; ctx.lineCap = 'round'; ctx.stroke();   // nose
  fnJuliaMouth(r, o);
  fnSweat(r, o);
  if (o.tear) fnAlpha(o.tear, () => { fnEll(-0.36 * r, 0.3 * r, 0.05 * r, 0.1 * r, '#9fd6ff'); });
  // front hair: a side-swept fringe and two face-framing locks
  const sw = Math.sin(TT * 2.2) * 0.03 * r;
  ctx.beginPath(); ctx.moveTo(-1.02 * r, -0.15 * r); ctx.bezierCurveTo(-1.08 * r, -0.9 * r, -0.3 * r, -1.25 * r, 0.4 * r, -1.08 * r); ctx.bezierCurveTo(0.95 * r, -0.95 * r, 1.1 * r, -0.3 * r, 1.0 * r, 0.25 * r);
  ctx.bezierCurveTo(0.88 * r, -0.2 * r, 0.6 * r, -0.45 * r, 0.25 * r, -0.5 * r); ctx.bezierCurveTo(-0.2 * r, -0.52 * r, -0.6 * r, -0.55 * r, -0.92 * r, -0.2 * r); ctx.closePath(); ctx.fillStyle = hc; ctx.fill();
  ctx.beginPath(); ctx.moveTo(0.45 * r, -1.0 * r); ctx.bezierCurveTo(0.0, -0.75 * r, -0.4 * r, -0.55 * r, -0.75 * r, -0.05 * r); ctx.lineWidth = 0.035 * r; ctx.strokeStyle = 'rgba(255,220,190,0.22)'; ctx.stroke();   // shine
  [-1, 1].forEach((sg) => { ctx.beginPath(); ctx.moveTo(sg * 0.9 * r, -0.2 * r); ctx.bezierCurveTo(sg * 1.05 * r + sw, 0.6 * r, sg * 0.95 * r + sw, 1.3 * r, sg * 0.8 * r + sw, 1.9 * r); ctx.lineTo(sg * 0.62 * r + sw, 1.75 * r); ctx.bezierCurveTo(sg * 0.8 * r, 1.1 * r, sg * 0.86 * r, 0.5 * r, sg * 0.78 * r, -0.05 * r); ctx.closePath(); ctx.fillStyle = hc; ctx.fill(); });
  fnCirc(-0.86 * r, 0.42 * r, 0.06 * r, '#f2c14e'); fnCirc(0.86 * r, 0.42 * r, 0.06 * r, '#f2c14e');   // tiny gold earrings
}
function fnJulia(x, y, s, o = {}) {
  const r = RR, skin = o.skin || '#e8b48a', skinD = o.skinD || '#c99070', uni = o.outfit === 'uniform';
  const top = uni ? '#f4f4f8' : '#b38fd8', topD = uni ? '#d6d8e2' : '#9470bf', legC = uni ? '#2a3466' : '#7a5aa8', legD = uni ? '#222a55' : '#6a4a98';
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
  if (o.shadow !== false) fnCastShadow(0, 4, 8.3 * r, r * 0.85);
  ctx.translate(0, o.bob || 0);
  const hipY = -2.95 * r, lL = o.lL || [0.05, 0], lR = o.lR || [-0.05, 0];
  const fL = fnLimb(-0.2 * r, hipY, lL[0], lL[1], 1.5 * r, 1.45 * r, 0.32 * r, legD);
  const fR = fnLimb(0.2 * r, hipY, lR[0], lR[1], 1.5 * r, 1.45 * r, 0.32 * r, legC);
  [fL, fR].forEach((f) => { fnEll(f[0] + 0.07 * r, f[1] + 0.02 * r, 0.25 * r, 0.09 * r, '#f2f2f6'); fnRect(f[0] - 0.18 * r, f[1] + 0.06 * r, 0.5 * r, 0.04 * r, '#c9ccd8'); });
  ctx.save(); ctx.translate(0, hipY); ctx.rotate(o.lean || 0);
  const sh = -2.9 * r, aL = o.aL || [0.1, -0.04], aR = o.aR || [-0.1, 0.04];
  const headY = sh - 1.25 * r;
  ctx.save(); ctx.translate(0, headY); ctx.rotate(o.tilt || 0); fnJuliaHead(r, o, 'back'); ctx.restore();
  const hL = fnLimb(-0.78 * r, sh + 0.28 * r, aL[0], aL[1], 1.5 * r, 1.38 * r, 0.25 * r, uni ? skin : topD, skin, 0.19 * r);
  // torso: shoulders, a cinched waist, hips
  ctx.beginPath(); ctx.moveTo(-0.85 * r, sh + 0.15 * r); ctx.quadraticCurveTo(-0.9 * r, sh - 0.05 * r, -0.6 * r, sh - 0.08 * r); ctx.lineTo(0.6 * r, sh - 0.08 * r); ctx.quadraticCurveTo(0.9 * r, sh - 0.05 * r, 0.85 * r, sh + 0.15 * r);
  ctx.bezierCurveTo(0.72 * r, sh + 1.2 * r, 0.55 * r, sh + 1.6 * r, 0.62 * r, sh + 2.1 * r); ctx.lineTo(0.75 * r, 0.1 * r); ctx.lineTo(-0.75 * r, 0.1 * r); ctx.lineTo(-0.62 * r, sh + 2.1 * r); ctx.bezierCurveTo(-0.55 * r, sh + 1.6 * r, -0.72 * r, sh + 1.2 * r, -0.85 * r, sh + 0.15 * r); ctx.closePath();
  ctx.fillStyle = top; ctx.fill(); ctx.save(); ctx.clip(); fnRect(FN_LIGHT.dx < 0 ? 0.05 * r : -r, sh - r, r, 4 * r, `rgba(0,0,0,${0.1 + 0.1 * FN_LIGHT.k})`);
  if (uni) { fnPoly([[-0.35 * r, sh - 0.08 * r], [0, sh + 0.45 * r], [0.35 * r, sh - 0.08 * r]], '#2a57c9'); fnCirc(0.4 * r, sh + 0.8 * r, 0.13 * r, '#2a57c9'); fnRect(-r, sh + 2.05 * r, 2 * r, 0.9 * r, legC); }
  else { fnRect(-r, sh + 2.0 * r, 2 * r, 0.12 * r, '#ffffff'); for (let i = 0; i < 4; i++) fnCirc(-0.4 * r + i * 0.27 * r, sh + 1.0 * r, 0.06 * r, '#ffffff'); fnRect(-r, sh + 2.12 * r, 2 * r, 0.9 * r, legC); }
  ctx.restore();
  fnRR(-0.13 * r, sh - 0.55 * r, 0.26 * r, 0.6 * r, 0.08 * r, skinD);   // slim neck
  ctx.save(); ctx.translate(0, headY); ctx.rotate(o.tilt || 0); fnJuliaHead(r, o, 'front'); ctx.restore();
  const hR = fnLimb(0.78 * r, sh + 0.28 * r, aR[0], aR[1], 1.5 * r, 1.38 * r, 0.25 * r, uni ? skin : top, skin, 0.19 * r);
  if (uni) { const [dx, dy] = fnDir(aR[0]); fnStroke([[0.78 * r, sh + 0.28 * r], [0.78 * r + dx * 0.5 * r, sh + 0.28 * r + dy * 0.5 * r]], 0.36 * r, top); const [ex, ey] = fnDir(aL[0]); fnStroke([[-0.78 * r, sh + 0.28 * r], [-0.78 * r + ex * 0.5 * r, sh + 0.28 * r + ey * 0.5 * r]], 0.36 * r, topD); }
  if (o.hold) o.hold(hR, hL);
  ctx.restore(); ctx.restore();
}
