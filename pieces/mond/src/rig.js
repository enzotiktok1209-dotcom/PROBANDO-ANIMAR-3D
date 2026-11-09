// =====================================================================
//  rig.js — the characters: a jointed rig (shoulder/elbow, hip/knee), a face with emotion parameters,
//  lip-sync from the voice loudness (VENV) while the character speaks, blinks, breathing, hand-held props.
//  char(id, x, y, s, T): x,y = between the feet (world px), s = scale (1 => ~830 px tall)
//  T = { pose: [[t, name|{...}], ...], emo: [[t, name], ...], look, turn, tilt, lean, jump, extras, holdR, holdL, walk }
//  times in T are absolute seconds (TT).
// =====================================================================
const LOOKS = {
  mia: { skin: '#f1c19a', skinD: '#d9a07a', top: '#ff4fa3', topD: '#c92d7d', topL: '#ff8fc0', pants: '#2b2240', pantsD: '#1d1730', skirt: '#2b2240',
    shoe: '#ff4fa3', shoeD: '#c92d7d', sole: '#ffffff', hair: '#3a2216', hairD: '#2a170f', girl: 1, lip: '#d6336c' },
  lea: { skin: '#c98b62', skinD: '#a96f4a', top: '#ffd23f', topD: '#c9a20f', topL: '#ffe58a', pants: '#1b1b24', pantsD: '#111', skirt: '#1b1b24',
    shoe: '#ffd23f', shoeD: '#c9a20f', sole: '#ffffff', hair: '#1b1210', hairD: '#0e0907', girl: 1, lip: '#b8325a' },
  zoe: { skin: '#f6d2b5', skinD: '#e2b394', top: '#f4f4fb', topD: '#d8dbe6', topL: '#ffffff', pants: '#3a6ea5', pantsD: '#28507c', skirt: '#3a6ea5',
    shoe: '#f4f4fb', shoeD: '#d8dbe6', sole: '#c0c4d4', hair: '#e8c46a', hairD: '#c9a24a', girl: 1, lip: '#e05a7a' },
  kevin: { skin: '#f3c9a5', skinD: '#dda482', top: '#2f6df6', topD: '#1d48b8', topL: '#5b8dff', pants: '#1f2537', pantsD: '#151a28',
    shoe: '#ffffff', shoeD: '#cfd3e2', sole: '#e9e9f2', hair: '#2a1c16', beanie: '#1d1d27', beanieD: '#2e2e3c' },
  jonas: { skin: '#f6cfaa', skinD: '#e2aa86', top: '#e2453c', topD: '#b22f2b', topL: '#ff7466', pants: '#2a2f45', pantsD: '#1c2033',
    shoe: '#f4f4f4', shoeD: '#cfd3e2', sole: '#8a8fa6', hair: '#b8763c', hairD: '#8d5426' },
  mech: { skin: '#c98b62', skinD: '#a96f4a', top: '#3a6ea5', topD: '#28507c', topL: '#5f92c8', pants: '#3a6ea5', pantsD: '#28507c',
    shoe: '#2b2b2b', shoeD: '#111', sole: '#555', hair: '#2a1c16', cap: '#f08a24', capD: '#c96b10', capB: '#c96b10' },
  dani: { skin: '#e2a77c', skinD: '#c78358', top: '#2f6df6', topD: '#1d48b8', topL: '#5b8dff', pants: '#232a45', pantsD: '#171c30',
    shoe: '#ffffff', shoeD: '#cfd3e2', sole: '#ef3b3b', hair: '#2a1c16', cap: '#f6f6fa', capD: '#d4d6e3', capB: '#ef3b3b' },
  leo: { skin: '#f6caa6', skinD: '#e2a585', top: '#e8483c', topD: '#b6302b', topL: '#ff7466', pants: '#4a5368', pantsD: '#363d50',
    shoe: '#7a4a2a', shoeD: '#5a331b', sole: '#f1e7d6', hair: '#8a4b22', hairD: '#663414', collar: '#ffffff' },
  jonasPJ: { skin: '#f6cfaa', skinD: '#e2aa86', top: '#7aa8ff', topD: '#5a86e0', topL: '#a6c4ff', pants: '#7aa8ff', pantsD: '#5a86e0',
    shoe: '#f4f4f4', shoeD: '#cfd3e2', sole: '#8a8fa6', hair: '#b8763c', hairD: '#8d5426' },
  lucia: { skin: '#c98b62', skinD: '#a96f4a', top: '#f6f6f2', topD: '#d8d8d2', topL: '#ffffff', pants: '#3f6aa8', pantsD: '#2d4f80', skirt: '#3f6aa8',
    shoe: '#1b1b24', shoeD: '#111', sole: '#f2f2f2', hair: '#1b1210', hairD: '#0e0907', girl: 1, lip: '#b8325a' },
  jason: { skin: '#e8b48c', skinD: '#c9926a', top: '#6b7a52', topD: '#4f5c3b', topL: '#8a9a6a', pants: '#3a3f52', pantsD: '#262a38',
    shoe: '#5a3a24', shoeD: '#3a2414', sole: '#d9c9a8', hair: '#3a2618', hairD: '#24170e' },
  bote: { skin: '#b5744d', skinD: '#975a37', top: '#26a24c', topD: '#18793a', topL: '#4cc56d', pants: '#2b313f', pantsD: '#1d222c',
    shoe: '#222', shoeD: '#111', sole: '#666', hair: '#1d1410', cap: '#26a24c', capD: '#18793a', capB: '#147033' },
};
// arms: [shoulder angle, elbow bend] per side (0 = hanging down, + = outward/up); legs: [hip, knee]
const POSES = {
  idle: { la: [0.16, -0.12], ra: [0.16, -0.12] },
  armsUp: { la: [2.75, 0.25], ra: [2.75, 0.25] },
  cheer: { la: [2.25, 0.7], ra: [2.25, 0.7] },
  pointR: { la: [0.18, -0.15], ra: [1.62, 0.04] },
  pointL: { la: [1.62, 0.04], ra: [0.18, -0.15] },
  pointUpR: { la: [0.18, -0.15], ra: [2.2, 0.1] },
  hips: { la: [0.75, -2.15], ra: [0.75, -2.15] },
  shrug: { la: [0.85, 1.55], ra: [0.85, 1.55] },
  holdR: { la: [0.16, -0.12], ra: [0.45, -1.55] },
  holdL: { la: [0.45, -1.55], ra: [0.16, -0.12] },
  holdBoth: { la: [0.42, -1.5], ra: [0.42, -1.5] },
  offerR: { la: [0.16, -0.12], ra: [1.15, -0.35] },
  raiseR: { la: [0.16, -0.12], ra: [2.65, 0.3] },
  slamR: { la: [0.3, -0.2], ra: [0.95, -0.95] },
  pressR: { la: [0.2, -0.2], ra: [0.75, -0.75] },
  phoneR: { la: [0.16, -0.12], ra: [2.0, -4.0] },
  drinkR: { la: [0.16, -0.12], ra: [1.75, -3.85] },
  thinkR: { la: [0.55, -2.0], ra: [1.9, -3.95] },
  facepalm: { la: [0.16, -0.12], ra: [2.05, -4.1] },
  headGrab: { la: [2.45, 1.75], ra: [2.45, 1.75] },
  armsCross: { la: [0.55, -2.3], ra: [0.55, -2.35] },
  laughBelly: { la: [0.5, -1.45], ra: [0.5, -1.45] },
  polish: { la: [0.42, -1.55], ra: [0.55, -1.25] },
  waveR: { la: [0.16, -0.12], ra: [2.3, 0.6] },
  throwR: { la: [0.3, -0.2], ra: [2.4, -0.4] },
  throwR2: { la: [0.3, -0.2], ra: [1.3, -0.1] },
  spinKeys: { la: [0.16, -0.12], ra: [1.0, 1.4] },
  writeR: { la: [0.4, -1.3], ra: [0.5, -1.2] },
  lean: { la: [0.16, -0.12], ra: [0.16, -0.12] },
  sad: { la: [0.05, -0.05], ra: [0.05, -0.05] },
  tapWatch: { la: [0.42, -1.6], ra: [0.5, -1.65] },
};
const EMOS = {
  neutral: { eye: 1, brow: 0, browA: 0, smile: 0.15, open: 0, wide: 1 },
  happy: { eye: 0.95, brow: 0.25, browA: -0.05, smile: 0.85, open: 0.15, wide: 1.15 },
  grin: { eye: 0.9, brow: 0.15, browA: 0.05, smile: 1, open: 0.35, wide: 1.35, teeth: 1 },
  laugh: { eye: 0.0, brow: 0.35, browA: -0.1, smile: 1, open: 0.75, wide: 1.3, squint: 1 },
  smug: { eye: 0.62, brow: 0.1, browA: 0.2, smile: 0.7, open: 0, wide: 1.1, asym: 1 },
  angry: { eye: 1.05, brow: -0.2, browA: 0.55, smile: -0.55, open: 0.25, wide: 1.1 },
  shock: { eye: 1.35, brow: 0.9, browA: -0.1, smile: -0.2, open: 0.85, wide: 0.75, round: 1 },
  sad: { eye: 0.8, brow: 0.15, browA: -0.55, smile: -0.7, open: 0, wide: 0.9 },
  calm: { eye: 0.72, brow: 0.05, browA: 0, smile: 0.4, open: 0, wide: 1 },
  confused: { eye: 1.05, brow: 0.3, browA: 0.3, smile: -0.15, open: 0.2, wide: 0.7, asym: -1, round: 0.6 },
  serious: { eye: 0.82, brow: -0.1, browA: 0.28, smile: -0.12, open: 0, wide: 0.95 },
  scared: { eye: 1.25, brow: 0.6, browA: -0.45, smile: -0.5, open: 0.4, wide: 1.2 },
  sleepy: { eye: 0.06, brow: -0.05, browA: -0.1, smile: -0.05, open: 0.12, wide: 0.9 },
  love: { eye: 0.9, brow: 0.4, browA: -0.2, smile: 0.9, open: 0.1, wide: 1 },
};
const POSE_KEYS = ['la', 'ra'];
function blendKeys(keys, lib, dur = 0.22) {
  // keys: [[t, name|obj], ...] -> blended object (eased over dur after each key)
  const get = (k) => (typeof k === 'string' ? lib[k] : k);
  let cur = JSON.parse(JSON.stringify(get(keys[0][1])));
  for (let i = 1; i < keys.length; i++) {
    const [t, k] = keys[i]; if (TT < t) break;
    const u = EZ.io(clamp((TT - t) / (keys[i].length > 2 ? keys[i][2] : dur))), nx = get(k);
    for (const p in nx) {
      if (Array.isArray(nx[p])) cur[p] = nx[p].map((v, j) => lerp(cur[p] ? cur[p][j] : v, v, u));
      else cur[p] = lerp(cur[p] ?? 0, nx[p], u);
    }
    for (const p in cur) if (!(p in nx) && !Array.isArray(cur[p]) && typeof cur[p] === 'number') cur[p] = lerp(cur[p], 0, u);
  }
  return cur;
}
const speaking = (id) => SPEAK.some(([who, a, b]) => who === id && TT >= a && TT <= b);
const venv = () => VENV[clamp(Math.round(TT * FPS), 0, VENV.length - 1)] || 0;
function mixHex(a, b, u) { const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * u).toString(16).padStart(2, '0')).join(''); }
function track(keys) { if (typeof keys === 'number') return keys; let v = keys[0][1]; for (let i = 1; i < keys.length; i++) { const u = EZ.io(clamp((TT - keys[i][0]) / (keys[i][2] ?? 0.3))); v += (keys[i][1] - keys[i - 1][1]) * u; } return v; }

// ---------------------------------------------------------------- the character
function char(id, x, y, s, T = {}) {
  const ex = T.extras || {}, L = ex.suit ? { ...LOOKS[id], top: '#f1f3f9', topD: '#c3cadb', topL: '#ffffff', pants: '#e4e8f1', pantsD: '#bcc3d4', shoe: '#8f98ad', shoeD: '#6c7488', sole: '#5a6174' } : LOOKS[id];
  const P = blendKeys(T.pose || [[0, 'idle']], POSES), E = blendKeys(T.emo || [[0, 'neutral']], EMOS, 0.18);
  const ph = hash(id) % 100 / 17;
  const breath = Math.sin(TT * 2.2 + ph) * 0.012;
  const jump = T.jump ? track(T.jump) : 0, lean = (T.lean ? track(T.lean) : 0) + Math.sin(TT * 1.3 + ph) * 0.012;
  const sq = T.squash ? track(T.squash) : 0;
  ctx.save(); ctx.translate(x, y);
  shadowEll(0, 6, 150 * s * (1 - clamp(jump / 600) * 0.4), 28 * s, 0.32);
  ctx.translate(0, -jump * s); ctx.scale(s * (1 + sq * 0.12), s * (1 - sq * 0.12));
  if (T.flip) ctx.scale(-1, 1);
  // legs (walk cycle or stance)
  const wk = T.walk ? track(T.walk) : 0, wph = TT * 9;
  const lgL = [0.06 + Math.sin(wph) * 0.42 * wk, Math.max(0, -Math.sin(wph)) * 0.5 * wk], lgR = [0.06 - Math.sin(wph) * 0.42 * wk, Math.max(0, Math.sin(wph)) * 0.5 * wk];
  ctx.translate(0, -Math.abs(Math.sin(wph)) * 14 * wk);
  const run = T.run ? track(T.run) : 0;
  if (run > 0) {   // running towards camera: knees lift alternately (foreshortened), the body bounces
    const ph = TT * 10.5, lL = Math.max(0, Math.sin(ph)) * run, lR = Math.max(0, -Math.sin(ph)) * run;
    ctx.translate(0, -Math.abs(Math.sin(ph)) * 22 * run); leg(L, -1, [0.05, 0], lL); leg(L, 1, [0.05, 0], lR);
  } else { leg(L, -1, lgL); leg(L, 1, lgR); }
  // body leans about the hips
  ctx.translate(0, -330); ctx.rotate(lean); ctx.scale(1 + breath * 0.5, 1 + breath);
  const front = [];
  for (const side of [-1, 1]) { const a = P[side < 0 ? 'la' : 'ra']; const inFront = a[0] > 1.6 && a[1] < -3; if (inFront) front.push(side); else arm(L, side, a, side < 0 ? T.holdL : T.holdR, id, ex); }
  torso(L, id, ex);
  ctx.save(); ctx.translate(0, -255); ctx.rotate((T.tilt ? track(T.tilt) : 0) + Math.sin(TT * 1.7 + ph) * 0.02);
  head(L, id, E, T, ex); ctx.restore();
  for (const side of front) arm(L, side, P[side < 0 ? 'la' : 'ra'], side < 0 ? T.holdL : T.holdR, id, ex);
  ctx.restore();
}
function leg(L, side, [a1, a2], lift = 0) {
  const hx = side * 40, hy = -330, l1 = 168, l2 = 160;
  const d1 = [side * Math.sin(a1), Math.cos(a1)], kx = hx + d1[0] * l1, ky = hy + d1[1] * l1 * (1 - 0.5 * lift);
  const d2 = [side * Math.sin(a1 - a2), Math.cos(a1 - a2)], fx = kx + d2[0] * l2 - side * lift * 12, fy = ky + d2[1] * l2 * (1 - 0.8 * lift);
  line(hx, hy, kx, ky, 64, L.pants); line(kx, ky, fx, fy, 58, L.pants);
  line(hx + side * 14, hy + 20, kx + side * 12, ky, 14, L.pantsD);
  // shoe
  ctx.save(); ctx.translate(fx, fy); ctx.scale(side, 1 - 0.4 * lift);
  fillRR(-34, -16, 86, 38, 18, L.shoe); fillRR(-34, 10, 88, 14, 7, L.sole); fillRR(-20, -14, 26, 22, 8, L.shoeD);
  ctx.restore();
}
function arm(L, side, [a1, a2], prop, id, ex) {
  const sx = side * 96, sy = -205, l1 = 138, l2 = 128;
  const d1 = [side * Math.sin(a1), Math.cos(a1)], ex0 = sx + d1[0] * l1, ey0 = sy + d1[1] * l1;
  const tot = a1 + a2, d2 = [side * Math.sin(tot), Math.cos(tot)], hx = ex0 + d2[0] * l2, hy = ey0 + d2[1] * l2;
  line(sx, sy, ex0, ey0, 52, L.top); line(ex0, ey0, hx - d2[0] * 18, hy - d2[1] * 18, 46, L.top);
  line(sx + side * 6, sy + 10, ex0 + side * 6, ey0, 14, L.topD);
  // cuff + hand
  circ(hx - d2[0] * 16, hy - d2[1] * 16, 25, L.topD);
  if (side > 0 && ex.watch) { circ(hx - d2[0] * 20, hy - d2[1] * 20, 22, '#d9e6ff'); circ(hx - d2[0] * 20, hy - d2[1] * 20, 15, '#7fd6ff'); sparkle(hx - d2[0] * 20 + 10, hy - d2[1] * 20 - 12, 14 + 6 * Math.sin(TT * 9), '#fff'); }
  circ(hx, hy, 27, L.skin); circ(hx + side * 10, hy - 8, 11, L.skin); ell(hx - side * 5, hy + 6, 14, 10, L.skinD);
  if (prop) { ctx.save(); ctx.translate(hx, hy); ctx.rotate(-side * tot * 0 ); prop(side, tot); ctx.restore(); }
}
function torso(L, id, ex) {
  // body from hips (y=0) to shoulders (y=-215)
  const P = [[-92, -6], [-100, -150], [-96, -205], [-60, -228], [60, -228], [96, -205], [100, -150], [92, -6]];
  ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]);
  for (let i = 1; i < P.length; i++) ctx.lineTo(P[i][0], P[i][1]);
  ctx.quadraticCurveTo(0, 14, -92, -6); ctx.fillStyle = L.top; ctx.fill();
  // shading on the right, waistband
  ctx.save(); ctx.clip(); ctx.fillStyle = L.topD; ctx.fillRect(55, -240, 60, 260); ctx.fillRect(-110, -26, 230, 30); ctx.restore();
  if (id === 'dani' || id === 'kevin' || (id === 'jonas' || id === 'jonasPJ')) {   // hoodie: hood collar, strings, pocket
    ell(0, -222, 80, 26, L.topD); ell(0, -226, 52, 16, L.skinD);
    line(-24, -210, -28, -140, 7, '#f2f2f2'); line(24, -210, 28, -140, 7, '#f2f2f2'); circ(-28, -136, 7, '#f2f2f2'); circ(28, -136, 7, '#f2f2f2');
    fillRR(-62, -96, 124, 58, 20, L.topD);
  } else if (id === 'seller') { // suit: white shirt, red tie, lapels, buttons
    poly([[-46, -230], [0, -140], [46, -230]], '#ffffff'); fillRR(-13, -226, 26, 20, 7, '#a3161f');
    poly([[-12, -208], [12, -208], [18, -128], [0, -104], [-18, -128]], '#c8202c');
    poly([[-48, -232], [-6, -140], [-64, -186]], L.topD); poly([[48, -232], [6, -140], [64, -186]], L.topD);
    circ(0, -84, 7, '#0e1428'); circ(0, -52, 7, '#0e1428'); fillRR(40, -170, 34, 8, 3, '#ffffff');
  } else if (id === 'leo') { // sweater with a shirt collar
    poly([[-40, -226], [0, -196], [40, -226], [30, -236], [0, -214], [-30, -236]], L.collar);
    for (let i = 0; i < 4; i++) line(-80, -170 + i * 40, 80, -170 + i * 40, 5, 'rgba(0,0,0,0.08)');
    if (ex.freckleBadge) circ(55, -150, 10, '#ffd23f');
  } else if (L.girl) {   // fitted top with a neckline, a necklace, a short skirt
    poly([[-40, -228], [0, -175], [40, -228]], L.skin); line(-34, -214, 34, -214, 0.01, L.skin);
    ctx.beginPath(); ctx.moveTo(-36, -224); ctx.quadraticCurveTo(0, -190, 36, -224); ctx.lineWidth = 4; ctx.strokeStyle = PAL.gold; ctx.stroke(); circ(0, -196, 7, PAL.gold);
    poly([[-98, -30], [98, -30], [128, 70], [-128, 70]], L.skirt); line(-98, -28, 98, -28, 10, shade(L.skirt, 0.2));
  } else {               // courier jacket: zip, chest logo
    line(0, -222, 0, -10, 6, L.topD); fillRR(-78, -175, 56, 34, 8, '#ffd23f'); tText('LIEFER', -50, -158, 13, { color: '#18793a', shadow: false });
    poly([[-60, -228], [0, -200], [60, -228], [50, -236], [-50, -236]], L.topD);
  }
  if (ex.chain) {   // gold chain with a € pendant, swings a little
    const sw = Math.sin(TT * 3) * 4;
    ctx.beginPath(); ctx.moveTo(-58, -222); ctx.quadraticCurveTo(0 + sw, -110, 58, -222); ctx.lineWidth = 11; ctx.strokeStyle = PAL.gold; ctx.stroke();
    ctx.lineWidth = 4; ctx.strokeStyle = '#fff3a0'; ctx.stroke();
    circ(sw, -150, 30, PAL.gold); circ(sw, -150, 22, '#ffd75a'); tText('€', sw, -149, 30, { color: PAL.goldD, shadow: false });
    sparkle(sw + 18, -168, 12 * (0.5 + 0.5 * Math.sin(TT * 7)), '#fff');
  }
}
function head(L, id, E, T, ex) {
  const R = 118, turn = T.turn ? track(T.turn) : 0, tx = turn * 26;
  // neck
  fillRR(-28, 0, 56, 50, 12, L.skinD);
  ctx.translate(0, -60);
  // ears
  ell(-R * 0.93 + tx * 0.4, 8, 20, 30, L.skin); ell(R * 0.93 + tx * 0.4, 8, 20, 30, L.skin);
  ell(-R * 0.93 + tx * 0.4, 8, 10, 18, L.skinD); ell(R * 0.93 + tx * 0.4, 8, 10, 18, L.skinD);
  // back hair / cap brim behind
  if (id === 'lucia') { circ(0, -R * 1.05, R * 0.42, L.hairD); circ(0, -R * 1.08, R * 0.34, L.hair); }
  if (id === 'leo') { const R2 = RNG('curl'); for (let i = 0; i < 16; i++) { const a = Math.PI + (i / 15) * Math.PI; circ(Math.cos(a) * R * 0.98, Math.sin(a) * R * 0.95 + 4, 34 + R2.f() * 10, L.hairD); } }
  if (id === 'dani') { fillRR(-54, -196, 108, 64, 20, L.capB); }
  if ((id === 'jonas' || id === 'jonasPJ')) { for (let i = 0; i < 9; i++) { const a = Math.PI * 1.08 + (i / 8) * Math.PI * 0.84; poly([[Math.cos(a - 0.17) * R * 0.92, Math.sin(a - 0.17) * R * 0.92 - 10], [Math.cos(a) * R * 1.32, Math.sin(a) * R * 1.32 - 10], [Math.cos(a + 0.17) * R * 0.92, Math.sin(a + 0.17) * R * 0.92 - 10]], L.hairD); } }
  if (L.girl) { fillRR(-R * 1.08, -R * 0.95, R * 2.16, R * 2.15, R * 0.95, L.hairD); fillRR(-R * 1.0, -R * 0.9, R * 2.0, R * 2.05, R * 0.9, L.hair); }
  ell(0, 0, R * 0.95, R, ex.pale ? mixHex(L.skin, '#e4e6dc', Math.min(1, +ex.pale)) : L.skin);
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, R * 0.95, R, 0, 0, TAU); ctx.clip();
  ell(R * 0.95, 20, R * 0.45, R * 1.1, 'rgba(160,80,50,0.16)');
  if (ex.pale) { ctx.fillStyle = `rgba(150,200,255,${0.3 * Math.min(1, +ex.pale)})`; ctx.fillRect(-R, -R, R * 2, R * 2); }
  ctx.restore();
  if (id === 'lucia') for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * R * 0.95 + tx * 0.4, 52, 24, 0, TAU); ctx.lineWidth = 7; ctx.strokeStyle = PAL.gold; ctx.stroke(); }
  if (id === 'jason') { ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, R * 0.95, R, 0, 0, TAU); ctx.clip(); ctx.globalAlpha = 0.35; ell(tx, 70, R * 0.75, R * 0.45, L.hairD); ctx.restore(); }
  // hair / caps
  if (id === 'dani') {
    ell(-R * 0.86, -R * 0.2, 18, 34, L.hair); ell(R * 0.86, -R * 0.2, 18, 34, L.hair);
    ctx.beginPath(); ctx.ellipse(0, -84, R * 1.02, R * 0.66, 0, Math.PI, TAU); ctx.closePath(); ctx.fillStyle = L.cap; ctx.fill();
    ctx.save(); ctx.clip(); ell(R * 0.7, -110, R * 0.5, R * 0.6, L.capD); ctx.restore();
    fillRR(-R * 1.02, -96, R * 2.04, 22, 10, L.capD);
    fillRR(-24, -132, 48, 18, 8, '#2a1c16'); circ(0, -84 - R * 0.66 + 6, 9, L.capB);
  } else if (id === 'kevin') {   // black beanie pulled down to the brows
    ctx.beginPath(); ctx.ellipse(0, -76, R * 1.04, R * 0.82, 0, Math.PI, TAU); ctx.closePath(); ctx.fillStyle = L.beanie; ctx.fill();
    ctx.save(); ctx.clip(); for (let i = -6; i <= 6; i++) line(i * 18, -190, i * 16, -70, 5, L.beanieD); ell(R * 0.55, -140, R * 0.35, R * 0.5, 'rgba(255,255,255,0.06)'); ctx.restore();
    fillRR(-R * 1.05, -100, R * 2.1, 34, 14, L.beanieD); for (let i = -8; i <= 8; i++) line(i * 14, -96, i * 14, -70, 4, L.beanie);
    ell(-R * 0.9, -40, 12, 22, L.hair); ell(R * 0.9, -40, 12, 22, L.hair);
  } else if ((id === 'jonas' || id === 'jonasPJ')) {   // light-brown spiky hair
    ctx.beginPath(); ctx.ellipse(0, -62, R * 0.98, R * 0.62, 0, Math.PI, TAU); ctx.closePath(); ctx.fillStyle = L.hair; ctx.fill();
    for (let i = 0; i < 8; i++) { const x = -R * 0.85 + i * R * 0.245, h = 50 + (i % 3) * 18 + Math.sin(TT * 2 + i) * 2; poly([[x - 26, -100], [x + 6 + (i % 2 ? 8 : -6), -100 - h - 40], [x + 30, -100]], L.hair); }
    poly([[-R * 0.8, -70], [-R * 0.45, -110], [-R * 0.1, -72], [R * 0.25, -112], [R * 0.55, -74], [R * 0.85, -100], [R * 0.95, -60], [-R * 0.95, -60]], L.hair);
  } else if (L.girl) {
    ctx.beginPath(); ctx.ellipse(0, -60, R * 1.0, R * 0.66, 0, Math.PI, TAU); ctx.closePath(); ctx.fillStyle = L.hair; ctx.fill();
    poly([[-R * 0.95, -60], [-R * 0.2, -112], [R * 0.4, -70], [R * 0.95, -60], [R * 0.95, -20], [R * 0.5, -66], [-R * 0.3, -80], [-R * 0.96, -10]], L.hair);
    ell(-R * 0.95, 30, 22, 90, L.hair); ell(R * 0.95, 30, 22, 90, L.hair);
  } else if (id === 'leo') {
    const R2 = RNG('curlF');
    for (let i = 0; i < 13; i++) { const a = Math.PI * 1.05 + (i / 12) * Math.PI * 0.9; circ(Math.cos(a) * R * 0.86, Math.sin(a) * R * 0.86 - 6, 30 + R2.f() * 8, L.hair); }
    circ(-30, -R * 0.62, 34, L.hair); circ(28, -R * 0.66, 30, L.hair);
    for (const [fx, fy] of [[-50, 40], [-38, 50], [-60, 52], [50, 40], [38, 50], [60, 52]]) circ(fx + tx, fy, 4, 'rgba(170,90,50,0.55)');
  } else if (id === 'seller') {   // slicked-back dark hair with a side part
    ctx.beginPath(); ctx.ellipse(0, -70, R * 1.0, R * 0.74, 0, Math.PI, TAU); ctx.closePath(); ctx.fillStyle = L.hair; ctx.fill();
    for (const sd of [-1, 1]) fillRR(sd * R * 0.93 - 14, -78, 28, 70, 12, L.hair);
    line(-R * 0.35, -R * 0.68, -R * 0.2, -R * 1.2, 6, L.hairD); for (let i = 0; i < 4; i++) line(-R * 0.1 + i * 26, -R * 0.75, i * 30 + 20, -R * 1.15, 4, 'rgba(255,255,255,0.12)');
  } else {
    ctx.beginPath(); ctx.ellipse(0, -82, R * 1.02, R * 0.66, 0, Math.PI, TAU); ctx.closePath(); ctx.fillStyle = L.cap; ctx.fill();
    fillRR(-R * 0.3 + tx, -98, R * 1.35, 28, 14, L.capB);
    fillRR(-16, -150, 32, 22, 8, '#ffd23f');
  }
  face(L, id, E, T, ex, R, tx);
}
function face(L, id, E, T, ex, R, tx) {
  const talk = speaking(id) ? venv() : 0;
  const look = T.look ? (Array.isArray(T.look[0]) ? [track(T.look.map(([t, v]) => [t, v[0]])), track(T.look.map(([t, v]) => [t, v[1]]))] : T.look) : [0, 0];
  // blink: 3 frames every ~3.3 s, phase per character
  const per = 3.3 + (hash(id) % 7) * 0.13, bl = ((TT + (hash(id) % 50) / 17) % per) < 0.1 ? 0.05 : 1;
  const eyeY = -6, ex0 = 40, eo = E.eye * bl;
  // brows
  for (const sd of [-1, 1]) {
    const a = E.browA * sd * -1 + (E.asym ? sd * E.asym * 0.12 : 0), by = eyeY - 50 - E.brow * 26 - (E.asym && sd > 0 ? E.asym * 10 : 0);
    ctx.save(); ctx.translate(sd * ex0 + tx, by); ctx.rotate(a);
    fillRR(-24, -7, 48, 14, 7, id === 'leo' || (id === 'jonas' || id === 'jonasPJ') ? L.hairD : '#2a1c16'); ctx.restore();
  }
  // eyes
  for (const sd of [-1, 1]) {
    const x = sd * ex0 + tx, y = eyeY;
    if (E.squint && E.squint > 0.5) { ctx.beginPath(); ctx.arc(x, y + 8, 16, Math.PI * 1.15, Math.PI * 1.85); ctx.lineWidth = 8; ctx.strokeStyle = '#1b1530'; ctx.lineCap = 'round'; ctx.stroke(); continue; }
    const ry = 24 * Math.max(0.06, eo), rx = 19 * (E.eye > 1.2 ? 1.12 : 1);
    ell(x, y, rx, ry, '#ffffff');
    if (eo > 0.15) {
      ctx.save(); ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, TAU); ctx.clip();
      const pr = E.eye > 1.2 ? 8 : 11;
      circ(x + look[0] * 8 + tx * 0.15, y + look[1] * 8 + 2, pr, '#1b1530'); circ(x + look[0] * 8 - 4, y + look[1] * 8 - 4, 4, '#fff');
      if (E.eye < 0.8) { ctx.fillStyle = L.skin; ctx.fillRect(x - rx, y - ry - 2, rx * 2, ry * (1 - E.eye) * 1.4); }
      ctx.restore();
    } else line(x - 16, y, x + 16, y, 6, '#1b1530');
  }
  if (L.girl) for (const sd of [-1, 1]) { const x = sd * ex0 + tx; for (let k = -1; k <= 1; k++) line(x + k * 10 + sd * 6, eyeY - 22 * eo, x + k * 14 + sd * 12, eyeY - 34 * eo, 4, '#1b1530'); }
  // nose
  ell(tx * 1.2, 24, 12, 9, L.skinD);
  // mouth: open amount = emotion + voice
  const open = clamp(E.open + talk * 0.75 * (0.8 + 0.4 * Math.sin(TT * 31)), 0, 1.1), smile = E.smile, wd = 34 * (E.wide ?? 1) * (1 - open * 0.15);
  const my = 62, mx = tx * 1.1 + (E.asym ? E.asym * 6 : 0);
  if (open < 0.08) {
    ctx.beginPath(); ctx.moveTo(mx - wd, my - smile * 6 + (E.asym || 0) * -6); ctx.quadraticCurveTo(mx, my + smile * 24, mx + wd, my - smile * 6 - (E.asym || 0) * 8);
    ctx.lineWidth = 8; ctx.strokeStyle = L.lip || '#7a2a2a'; ctx.lineCap = 'round'; ctx.stroke();
  } else {
    const h = 10 + open * 40, rnd = E.round ?? 0;
    ctx.beginPath();
    if (rnd > 0.5) ctx.ellipse(mx, my + 6, wd * 0.6, h * 0.62, 0, 0, TAU);
    else { ctx.moveTo(mx - wd, my - smile * 4); ctx.quadraticCurveTo(mx, my - smile * 6 + 2, mx + wd, my - smile * 4); ctx.quadraticCurveTo(mx, my + h + smile * 10, mx - wd, my - smile * 4); }
    ctx.fillStyle = '#5a1420'; ctx.fill();
    ctx.save(); ctx.clip();
    if (E.teeth || smile > 0.5) { ctx.fillStyle = '#fff'; ctx.fillRect(mx - wd, my - 14, wd * 2, 14); }
    ell(mx, my + h * 0.75, wd * 0.5, h * 0.35, '#e0566a'); ctx.restore();
  }
  // cheeks, sweat, tears
  if (smile > 0.6 || ex.blush) { ell(-66 + tx, 44, 18, 10, 'rgba(255,90,110,0.35)'); ell(66 + tx, 44, 18, 10, 'rgba(255,90,110,0.35)'); }
  if (ex.sweat) { const k = (TT * 0.8) % 1; ctx.save(); ctx.translate(R * 0.75, -40 + k * 60); poly([[0, -16], [10, 4], [0, 12], [-10, 4]], '#9fd8ff'); ctx.restore(); }
  if (ex.tear) { const k = (TT * 1.1) % 1; ell(-ex0 + tx - 6, eyeY + 26 + k * 70, 7, 11, '#8fd0ff'); fillRR(-ex0 + tx - 10, eyeY + 18, 8, 26 + k * 70, 4, 'rgba(143,208,255,0.6)'); }
  if (ex.glasses) {
    for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * ex0 + tx, eyeY, 30, 0, TAU); ctx.lineWidth = 7; ctx.strokeStyle = '#1b1530'; ctx.stroke(); ctx.fillStyle = 'rgba(200,240,255,0.18)'; ctx.fill(); }
    line(-10 + tx, eyeY, 10 + tx, eyeY, 6, '#1b1530');
  }
  if (ex.shades) {
    const k = ex.shades === true ? 1 : clamp(ex.shades);
    ctx.save(); ctx.translate(0, -40 * (1 - k)); ctx.globalAlpha = k;
    fillRR(-82 + tx, eyeY - 24, 72, 46, 16, '#0f0c1c'); fillRR(10 + tx, eyeY - 24, 72, 46, 16, '#0f0c1c'); line(-12 + tx, eyeY - 12, 12 + tx, eyeY - 12, 8, '#0f0c1c');
    line(-70 + tx, eyeY - 10, -46 + tx, eyeY - 18, 6, 'rgba(255,255,255,0.55)'); line(22 + tx, eyeY - 10, 46 + tx, eyeY - 18, 6, 'rgba(255,255,255,0.55)');
    ctx.restore();
  }
  if (ex.headset) {
    ctx.beginPath(); ctx.arc(0, -10, R * 1.1, Math.PI * 1.06, Math.PI * 1.94); ctx.lineWidth = 18; ctx.strokeStyle = '#1b1b24'; ctx.lineCap = 'round'; ctx.stroke();
    for (const sd of [-1, 1]) { fillRR(sd * R * 0.98 - 26, -30, 52, 90, 20, '#1b1b24'); fillRR(sd * R * 0.98 - 16, -18, 32, 66, 14, `hsl(${(TT * 60 + (sd > 0 ? 180 : 0)) % 360},90%,60%)`); }
    ctx.beginPath(); ctx.moveTo(-R * 0.98, 40); ctx.quadraticCurveTo(-R * 0.8, 90, -40, 84); ctx.lineWidth = 8; ctx.strokeStyle = '#1b1b24'; ctx.stroke(); circ(-36, 84, 12, '#1b1b24');
  }
  if (ex.helmet) {   // astronaut bubble helmet: glass dome, rim, reflections
    ctx.save(); ctx.globalAlpha = 0.22; circ(0, -6, R * 1.55, '#bfe6ff'); ctx.restore();
    ctx.beginPath(); ctx.arc(0, -6, R * 1.55, 0, TAU); ctx.lineWidth = 10; ctx.strokeStyle = 'rgba(230,245,255,0.85)'; ctx.stroke();
    ctx.save(); ctx.globalAlpha = 0.55; ctx.beginPath(); ctx.arc(0, -6, R * 1.38, Math.PI * 1.08, Math.PI * 1.45); ctx.lineWidth = 16; ctx.strokeStyle = '#ffffff'; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore();
    ell(R * 0.62, -R * 0.9, 16, 26, 'rgba(255,255,255,0.7)', 0.5);
    fillRR(-R * 1.25, R * 1.18, R * 2.5, 46, 20, '#e9edf6'); fillRR(-R * 1.25, R * 1.18 + 30, R * 2.5, 16, 8, '#b9c0d2');
  }
  if (id === 'bote') { ctx.beginPath(); ctx.moveTo(-36 + tx, 46); ctx.quadraticCurveTo(tx, 30, 36 + tx, 46); ctx.quadraticCurveTo(tx, 56, -36 + tx, 46); ctx.fillStyle = '#1d1410'; ctx.fill(); }
}
