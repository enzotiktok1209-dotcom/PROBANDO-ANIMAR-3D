// =====================================================================
//  styles/flat-noite/animals.js — flat animal rigs + helper robots, same look as the human rigs
//  Origin = feet on the ground; s scales; o.face = 1 (right) / -1 (left).
// =====================================================================
function fnEye2(x, y, r, o = {}) {
  if (o.closed) { fnStroke(arcPts(x, y, r * 0.8, 0.15 * Math.PI, 0.85 * Math.PI, 8), r * 0.35, '#1a1412'); return; }
  fnCirc(x, y, r, '#ffffff'); const l = o.look || [0, 0]; fnCirc(x + l[0] * r * 0.35, y + l[1] * r * 0.35, r * 0.6, '#0d0a0a'); fnCirc(x + l[0] * r * 0.35 + r * 0.2, y + l[1] * r * 0.35 - r * 0.22, r * 0.18, '#ffffff');
  if (o.lid) { ctx.save(); ctx.beginPath(); ctx.arc(x, y, r + 0.5, 0, TAU); ctx.clip(); fnRect(x - r - 1, y - r - 1, r * 2 + 2, (r * 2 + 2) * o.lid, o.lidC || '#777'); ctx.restore(); }
}
// raccoon: grey, black mask, ringed tail, can stand on two legs (o.stand) and hold things (o.hold)
function fnRaccoon(x, y, s, o = {}) {
  const f = o.face || 1, g = '#8a8f9e', gd = '#6a6f7e', k = '#2a2c34';
  ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s);
  fnEll(0, 3, 70, 12, 'rgba(0,0,0,0.3)');
  const ph = (o.walk || 0) * TAU, st = o.stand ? 1 : 0;
  // tail (ringed, swishing)
  ctx.save(); ctx.translate(-50, -40 - st * 10); ctx.rotate(-0.6 + Math.sin(TT * 4) * 0.25);
  for (let i = 0; i < 5; i++) fnEll(-20 - i * 16, -i * 6, 18, 16, i % 2 ? k : g); ctx.restore();
  if (!st) {   // on four legs
    [[-35, Math.sin(ph)], [35, -Math.sin(ph)]].forEach(([lx, a]) => fnStroke([[lx, -40], [lx + a * 14, -18], [lx + a * 10, 0]], 14, gd));
    fnRR(-60, -85, 120, 55, 27, g);
    [[-25, -Math.sin(ph)], [45, Math.sin(ph)]].forEach(([lx, a]) => fnStroke([[lx, -40], [lx + a * 14, -18], [lx + a * 10, 0]], 14, g));
  } else {     // standing like a little person
    fnStroke([[-14, -50], [-16, 0]], 16, gd); fnStroke([[14, -50], [16, 0]], 16, gd);
    fnEll(0, -80, 40, 50, g); fnEll(4, -70, 24, 34, '#c9ccd6');
    const hold = o.hold;
    fnStroke([[-28, -105], [-40, -80], [-20 + (hold ? 30 : 0), -70 - (hold ? 20 : 0)]], 12, gd); fnStroke([[28, -105], [44, -82], [30 - (hold ? 20 : 0), -72 - (hold ? 20 : 0)]], 12, gd);
    if (hold) hold();
  }
  // head
  const hx = st ? 0 : 62, hy = st ? -150 : -90 + Math.sin(ph * 2) * 2;
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(o.tilt || 0);
  fnPoly([[-36, -20], [-30, -52], [-12, -30]], g); fnPoly([[36, -20], [30, -52], [12, -30]], g); fnPoly([[-31, -26], [-28, -44], [-18, -30]], '#f0c0c8'); fnPoly([[31, -26], [28, -44], [18, -30]], '#f0c0c8');
  fnEll(0, 0, 44, 38, g); fnEll(0, 14, 26, 18, '#e8e8ee');
  fnEll(-17, -2, 20, 13, k, -0.2); fnEll(17, -2, 20, 13, k, 0.2);   // mask
  fnEye2(-15, -3, 8, { look: o.look, closed: o.sleep, lid: o.lid, lidC: k }); fnEye2(15, -3, 8, { look: o.look, closed: o.sleep, lid: o.lid, lidC: k });
  fnCirc(0, 14, 7, '#1a1412');
  if (o.mouth === 'open') fnEll(0, 26, 8, 6, '#5a1e22'); else if (o.mouth === 'chew') fnEll(0, 26, 7, 2 + Math.abs(Math.sin(TT * 12)) * 5, '#5a1e22'); else fnStroke(arcPts(0, 18, 8, 0.2 * Math.PI, 0.8 * Math.PI, 6), 2.5, '#1a1412');
  if (o.shades) { fnRR(-36, -14, 30, 18, 6, '#111'); fnRR(6, -14, 30, 18, 6, '#111'); fnLine(-8, -8, 8, -8, 4, '#111'); fnLine(-30, -10, -24, -6, 3, 'rgba(255,255,255,0.5)'); }
  ctx.restore(); ctx.restore();
}
// cat (orange tabby) — o.sleep curls it into a ball with zzz
function fnCat(x, y, s, o = {}) {
  const c = '#e8964a', cd = '#c7743a', f = o.face || 1;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s);
  if (o.sleep) {
    const br = 1 + Math.sin(TT * 2.2) * 0.03;
    ctx.save(); ctx.scale(1, br); fnEll(0, -30, 70, 34, c); for (let i = 0; i < 4; i++) fnLine(-30 + i * 18, -60, -36 + i * 18, -40, 6, cd); ctx.restore();
    fnStroke(arcPts(10, -20, 60, 0.1 * Math.PI, 0.9 * Math.PI, 12), 16, c);
    fnEll(-48, -36, 30, 26, c); fnPoly([[-70, -52], [-66, -76], [-52, -58]], c); fnPoly([[-40, -58], [-30, -80], [-26, -54]], c);
    fnStroke(arcPts(-58, -36, 6, 0.1 * Math.PI, 0.9 * Math.PI, 6), 3, '#3a2418'); fnStroke(arcPts(-38, -36, 6, 0.1 * Math.PI, 0.9 * Math.PI, 6), 3, '#3a2418'); fnCirc(-48, -28, 3, '#e86a7a');
    for (let i = 0; i < 3; i++) { const u = mod(TT * 0.6 + i / 3, 1); fnAlpha(1 - u, () => fnBold('z', -40 + u * 60 + i * 6, -90 - u * 90, 22 + i * 8, '#cfe0ff')); }
  } else {
    fnStroke([[-50, -40], [-90, -80 + Math.sin(TT * 3) * 10], [-80, -110]], 12, c);
    fnRR(-55, -75, 110, 50, 25, c); [[-40], [-20], [30], [45]].forEach(([lx]) => fnStroke([[lx, -40], [lx, 0]], 12, cd));
    fnEll(55, -90, 34, 30, c); fnPoly([[30, -108], [34, -138], [50, -114]], c); fnPoly([[62, -114], [76, -138], [80, -106]], c);
    fnEye2(45, -94, 8, { look: o.look }); fnEye2(68, -94, 8, { look: o.look }); fnCirc(57, -80, 3.5, '#e86a7a');
  }
  ctx.restore();
}
// lion: big mane, can make an annoyed face (o.mood: 'annoyed' | 'hungry' | 'n'), walks (o.walk phase)
function fnLion(x, y, s, o = {}) {
  const c = '#e0a54a', cd = '#c2862e', m = '#a8541e', f = o.face || 1, ph = (o.walk || 0) * TAU;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s);
  fnEll(0, 4, 150, 20, 'rgba(0,0,0,0.3)');
  fnStroke([[-110, -110], [-170, -150 + Math.sin(TT * 3) * 20], [-180, -110]], 14, c); fnCirc(-180, -108, 14, m);
  [[-70, Math.sin(ph)], [60, -Math.sin(ph)]].forEach(([lx, a]) => fnStroke([[lx, -100], [lx + a * 24, -50], [lx + a * 18, 0]], 30, cd));
  fnRR(-120, -170, 230, 100, 50, c);
  [[-50, -Math.sin(ph)], [80, Math.sin(ph)]].forEach(([lx, a]) => fnStroke([[lx, -100], [lx + a * 24, -50], [lx + a * 18, 0]], 30, c));
  ctx.save(); ctx.translate(110, -190); ctx.rotate(o.tilt || 0);
  for (let i = 0; i < 14; i++) { const a = i / 14 * TAU; fnCirc(Math.cos(a) * 70, Math.sin(a) * 70, 36, i % 2 ? m : '#94481a'); }
  fnCirc(0, 0, 70, m); fnEll(0, 6, 56, 54, c);
  fnCirc(-40, -46, 14, c); fnCirc(40, -46, 14, c);
  const mood = o.mood || 'n';
  fnEye2(-20, -6, 11, { look: o.look, lid: mood === 'annoyed' ? 0.55 : 0, lidC: c }); fnEye2(20, -6, 11, { look: o.look, lid: mood === 'annoyed' ? 0.55 : 0, lidC: c });
  if (mood === 'annoyed') { fnLine(-34, -24, -8, -18, 5, '#5a2a10'); fnLine(34, -24, 8, -18, 5, '#5a2a10'); }
  fnEll(0, 22, 28, 20, '#f4dcb0'); fnPoly([[-10, 12], [10, 12], [0, 22]], '#3a1a10');
  if (mood === 'annoyed') fnStroke(arcPts(0, 46, 12, 1.2 * Math.PI, 1.8 * Math.PI, 8), 4, '#3a1a10');
  else if (mood === 'hungry') { fnEll(0, 38, 14, 10, '#5a1e22'); fnLine(-8, 30, -8, 38, 3, '#fff'); fnLine(8, 30, 8, 38, 3, '#fff'); }
  else fnStroke([[-10, 36], [0, 40], [10, 36]], 4, '#3a1a10');
  ctx.restore(); ctx.restore();
}
// seagull, wings flapping; o.fly
function fnGull(x, y, s, o = {}) {
  const f = o.face || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s);
  if (!o.fly) { fnStroke([[-6, -20], [-8, 0]], 4, '#e8a33a'); fnStroke([[6, -20], [8, 0]], 4, '#e8a33a'); }
  fnEll(0, -40, 36, 22, '#f2f2f6'); fnEll(-10, -44, 26, 14, '#b9bcc8');
  const fl = o.fly ? Math.sin(TT * 18 + x) : (o.flap ? Math.sin(TT * 25) : -0.2);
  ctx.save(); ctx.translate(-4, -48); ctx.rotate(-0.4 + fl * 0.7); fnEll(-20, -10, 30, 10, '#9aa0b0'); ctx.restore();
  fnCirc(26, -60, 16, '#f2f2f6'); fnEye2(30, -64, 4.5, { look: [1, 0] }); fnLine(26, -70, 36, -66, 3, '#3a3a40');
  fnPoly([[38, -60], [58, -56 + (o.beakOpen ? 6 : 0)], [38, -52]], '#f0b030'); if (o.beakOpen) fnPoly([[38, -54], [56, -48], [38, -50]], '#e09020');
  ctx.restore();
}
// little bird (sparrow) for nests / Times Square
function fnBird(x, y, s, c = '#8a5a3a', hop = 0) { ctx.save(); ctx.translate(x, y - Math.abs(Math.sin(TT * 8 + x)) * hop); ctx.scale(s, s); fnEll(0, -12, 14, 10, c); fnCirc(10, -20, 7, c); fnCirc(12, -21, 2, '#111'); fnPoly([[16, -20], [23, -18], [16, -16]], '#f0b030'); fnPoly([[-12, -14], [-24, -18], [-12, -8]], fnDark(c, 0.2)); ctx.restore(); }
// helper robot: rolling base, round head with screen face, arms
function fnRobot(x, y, s, o = {}) {
  const f = o.face || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s);
  fnEll(0, 4, 70, 12, 'rgba(0,0,0,0.3)'); fnEll(0, -14, 50, 16, '#3a3e4c'); fnCirc(-30, -8, 10, '#22252e'); fnCirc(30, -8, 10, '#22252e');
  fnRR(-46, -140, 92, 120, 30, '#dfe4ee'); fnRR(-46, -140, 92, 30, 14, '#c9d0de'); fnRR(-20, -100, 40, 26, 6, '#2a57c9'); fnCirc(0, -87, 6 + Math.sin(TT * 6) * 2, '#8fd0ff');
  const a = o.arm || 0; fnStroke([[-46, -110], [-74, -80 + a * -40], [-70, -50 + a * -60]], 10, '#9aa3b6'); fnStroke([[46, -110], [74, -80], [70, -50]], 10, '#9aa3b6');
  if (o.tray) { fnRR(50, -58, 70, 10, 4, '#c9ccd8'); fnRR(60, -78, 18, 20, 4, '#ffd23f'); fnRR(84, -74, 22, 16, 6, '#e85a7a'); }
  ctx.save(); ctx.translate(0, -180 + Math.sin(TT * 3 + x) * 3); fnRR(-50, -40, 100, 80, 30, '#eef1f7'); fnRR(-40, -30, 80, 58, 22, '#141a3a');
  const bl = mod(TT + x * 0.01, 3) < 0.12; if (bl) { fnLine(-26, -2, -10, -2, 5, '#8fd0ff'); fnLine(10, -2, 26, -2, 5, '#8fd0ff'); } else { fnRR(-26, -12, 14, 20, 6, '#8fd0ff'); fnRR(12, -12, 14, 20, 6, '#8fd0ff'); }
  fnStroke(arcPts(0, 4, 12, 0.2 * Math.PI, 0.8 * Math.PI, 6), 4, '#8fd0ff'); fnLine(0, -40, 0, -60, 4, '#9aa3b6'); fnCirc(0, -62, 7, mod(TT, 1) < 0.5 ? FN.red : '#ffd23f');
  ctx.restore(); ctx.restore();
}
// the sleep pod (capsule): glass lid 0..1 closed, glow, little screen
function fnPod(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  fnEll(0, 10, 330, 34, 'rgba(0,0,0,0.4)'); fnRR(-320, -90, 640, 110, 50, '#cfd6e4'); fnRR(-320, -30, 640, 50, 25, '#b0b9cc');
  fnRR(-290, -70, 580, 40, 18, '#eef1f7'); fnRR(-60, -10, 120, 22, 8, '#141a3a'); fnRR(-50, -6, 100 * (0.5 + 0.5 * Math.sin(TT)), 14, 6, '#4aa8ff');
  fnGlow(0, -80, 300, 'rgba(120,180,255,0.4)', 0.6);
  ctx.restore();
}
function fnPodLid(x, y, s, closed = 1, frost = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.translate(-300, -70); ctx.rotate(-(1 - closed) * 1.1); ctx.translate(300, 70);
  ctx.beginPath(); ctx.ellipse(0, -70, 300, 150, 0, Math.PI, TAU); ctx.closePath(); ctx.fillStyle = `rgba(170,210,255,${0.22 + frost * 0.3})`; ctx.fill();
  ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(220,235,255,0.8)'; ctx.stroke(); fnLine(-200, -160, -120, -195, 10, 'rgba(255,255,255,0.45)');
  if (frost) { const R = RNG('frost'); for (let i = 0; i < 40 * frost; i++) fnCirc(R.r(-260, 260), R.r(-200, -80), R.r(3, 9), 'rgba(255,255,255,0.35)'); }
  ctx.restore();
}
