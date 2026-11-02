// =====================================================================
//  SETS B — the corridor, the door, the blackout, the bathroom, the plan, the elevator, the wheelchair, the stairs,
//  the roof, the choice and the end card.
// =====================================================================
// ---- one-point corridor: s = depth 0 (front) .. 1 (back wall), v = 0 ceiling .. 1 floor, u = across 0..1
const cL = (s, v) => [lerp(0, 430, s), lerp(lerp(60, 740, s), lerp(1760, 1010, s), v)];
const cR = (s, v) => [lerp(1080, 650, s), lerp(lerp(60, 740, s), lerp(1760, 1010, s), v)];
const cC = (s, u) => [lerp(lerp(0, 430, s), lerp(1080, 650, s), u), lerp(60, 740, s)];
const cF = (s, u) => [lerp(lerp(0, 430, s), lerp(1080, 650, s), u), lerp(1760, 1010, s)];
const cD = (k) => 1 - 1 / (1 + k);
function corridorBase(o = {}) {
  fillAll(FC.wall);
  fcPoly([cC(0, 0), cC(0, 1), cC(1, 1), cC(1, 0)], FC.ceil, { line: false });
  fcPoly([cF(0, 0), [0, 1920], [1080, 1920], cF(0, 1), cF(1, 1), cF(1, 0)], FC.floor, { line: false });
  fcPoly([cL(0, 0), cL(1, 0), cL(1, 1), cL(0, 1)], FC.wall, { line: false });
  fcPoly([cR(0, 0), cR(1, 0), cR(1, 1), cR(0, 1)], '#566886', { line: false });
  fcRect(430, 740, 220, 270, '#43536f', { w: 3 });
  if (o.exit !== false) { fcRect(505, 760, 70, 26, '#2fa35a', { r: 3, w: 2 }); }
  for (let i = 0; i < 4; i++) {
    const a = cD(i * 1.1 + 0.25), b = cD(i * 1.1 + 0.6), on = !o.flicker || hash(i, Math.floor(TT * 12)) % 7 > 1;
    fcPoly([cC(a, 0.36), cC(a, 0.64), cC(b, 0.62), cC(b, 0.38)], on ? '#e9f0ff' : '#5a6478', { w: 2 });
    if (on) { fcGlow(...cC((a + b) / 2, 0.5), 200 * (1 - a), 'rgba(200,220,255,0.6)', 0.35); const [fx, fy] = cF((a + b) / 2, 0.5); fcGlow(fx, fy, 260 * (1 - a), 'rgba(190,205,230,0.7)', 0.25); }
  }
  for (const side of [cL, cR]) {
    fcLine([side(0, 0.97), side(1, 0.97)], '#3a465c', 10);
    fcLine([side(0, 0.6), side(1, 0.6)], FC.wood, 12); fcLine([side(0, 0.6), side(1, 0.6)], FC.line, 2);
    for (let i = 0; i < 3; i++) {
      const a = cD(i * 1.3 + 0.15), b = cD(i * 1.3 + 0.55);
      fcPoly([side(a, 0.3), side(b, 0.3), side(b, 0.99), side(a, 0.99)], FC.wood);
      fcPoly([side(a + (b - a) * 0.2, 0.36), side(a + (b - a) * 0.45, 0.36), side(a + (b - a) * 0.45, 0.6), side(a + (b - a) * 0.2, 0.6)], '#2a3446', { w: 2.5 });
    }
    fcPoly([side(cD(0.95), 0.22), side(cD(1.1), 0.22), side(cD(1.1), 0.27), side(cD(0.95), 0.27)], '#e9ecf2', { w: 2 });
  }
  // a gurney left in the hall, a wet-floor sign: life in the set
  const g0 = cD(0.7), g1 = cD(1.0);
  fcPoly([cF(g0, 0.08), cF(g1, 0.08), cF(g1, 0.3), cF(g0, 0.3)].map(([x, y]) => [x, y - 90 * (1 - g0)]), '#c9d2e0', { w: 2.5 });
  const [wx, wy] = cF(cD(0.4), 0.82); fcPoly([[wx - 30, wy], [wx, wy - 110], [wx + 30, wy]], '#f5c542', { w: 3 });
}
function horde(list, o = {}) {   // [depth k, across u, seed]; o.approach: how far they've come (depth units)
  const Z = list.map(([k, u, seed]) => [Math.max(0.05, k - (o.approach || 0)), u, seed]).sort((a, b) => b[0] - a[0]);
  for (const [k, u, seed] of Z) {
    const s = cD(k) + Math.sin(TT * 0.5 + seed) * 0.004, [x, y] = cF(s, u), wallH = lerp(1700, 270, s);
    const eyes = o.eyesAt == null || TT > o.eyesAt + (seed % 5) * 0.08;
    fcZombie(x, y, wallH * 0.62 / 600, { seed, arms: o.arms ?? 0.75, lean: (seed % 2 ? 0.1 : -0.08), noEyes: !eyes });
  }
}
const HORDE = [[3.2, 0.40, 1], [2.9, 0.60, 2], [2.3, 0.30, 3], [1.9, 0.66, 4], [1.5, 0.44, 6], [1.2, 0.72, 5], [2.6, 0.5, 7], [3.6, 0.55, 8]];
SCENES.corridor = (a, i) => {
  const { lt } = shotT(i);
  corridorBase({ flicker: a.red || a.ding });
  horde(a.close ? HORDE.map(([k, u, s]) => [k * 0.55, u, s]) : HORDE, { approach: a.walk ? lt * 0.35 : 0, eyesAt: a.turn ? SHOT_LIST[i][0] + 0.15 : null, arms: a.ding ? 1 : 0.75 });
  if (a.red) { alarmWash(0.85); }
  if (a.ding) fcTint('rgba(255,180,60,1)', 0.08 * Math.exp(-lt * 2), 'source-over');
  endScene(0.05);
};
// ---- the door plate outside 317, shadows sliding along the wall
SCENES.doorPlate = (a, i) => {
  const { lt } = shotT(i);
  fillAll('#4f6080'); fcRect(-10, 1350, W + 20, 700, '#6f7b90', { line: false });
  fcRect(560, 200, 600, 1200, FC.wood, { w: 4 });
  fcRect(180, 380, 360, 420, '#e9ecf2', { r: 14 }); fcRect(180, 380, 360, 90, '#2a5ea8', { r: [14, 14, 0, 0] });
  ctx.save(); ctx.fillStyle = '#fff'; ctx.font = `600 34px ${FCF}`; ctx.fillText('STATION 3', 210, 438); ctx.fillStyle = FC.ink; ctx.font = `700 170px ${FCF}`; ctx.fillText('317', 210, 650); ctx.font = `600 32px ${FCF}`; ctx.fillStyle = '#4a5160'; ctx.fillText('A: L. BRAUN', 210, 720); ctx.fillText('B: —', 210, 765); ctx.restore();
  // shadows of the infected sliding across the wall
  ctx.save(); ctx.fillStyle = 'rgba(10,12,20,0.55)';
  for (let k = 0; k < 4; k++) { const x = -500 + ((lt * 280 + k * 260) % 1700); ctx.save(); ctx.translate(x, 1350); ctx.transform(1, 0, -0.6, 1, 0, 0); ctx.beginPath(); ctx.ellipse(0, -700, 60, 70, 0, 0, TAU); ctx.rect(-80, -630, 160, 400); ctx.rect(-70, -230, 50, 230); ctx.rect(20, -230, 50, 230); ctx.fill(); ctx.restore(); }
  ctx.restore();
  endScene(0.05);
};
// ---- the door of 317 from inside. handle | sign | wide | press | horde
function doorScene(a, lt) {
  fillAll(FC.wall); fcRect(-10, 1450, W + 20, 600, FC.floor, { w: 3 });
  fcRect(-10, 1150, W + 20, 20, FC.wallL, { w: 2 });
  const x0 = a.wide ? 260 : 170, w = a.wide ? 560 : 740, y0 = a.wide ? 380 : 180, h = 1450 - y0;
  fcRect(x0 - 30, y0 - 30, w + 60, h + 30, '#5e6f8e');
  const shakeX = a.horde ? Math.sin(TT * 50) * 4 * (0.5 + 0.5 * Math.sin(TT * 3)) : a.press ? Math.sin(TT * 60) * 3 * Math.exp(-lt * 2) : 0;
  ctx.save(); ctx.translate(shakeX, 0);
  fcRect(x0, y0, w, h, FC.wood, { w: 4 });
  for (let k = 0; k < 6; k++) fcLine([[x0 + 40 + k * w / 6, y0 + 10], [x0 + 30 + k * w / 6, y0 + h - 10]], 'rgba(120,80,40,0.25)', 3);
  // the window: wired glass, what's behind it
  const gx = x0 + w * 0.36, gy = y0 + 120, gw = w * 0.22, gh = h * 0.46;
  fcRect(gx, gy, gw, gh, '#1a2130', { w: 5 });
  fcClip((g) => g.rect(gx, gy, gw, gh), () => {
    fillAll(a.horde ? '#3a5a9a' : '#7d90b2'); fcGlow(gx + gw / 2, gy, gh, 'rgba(220,235,255,1)', 0.5);
    if (a.horde) { const R = RNG('hordeEyes'); for (let k = 0; k < 18; k++) { const ex = gx + R.r(0, gw), ey = gy + R.r(0, gh), s = R.r(0.8, 1.4), j = Math.sin(TT * 3 + k) * 6; fcCirc(ex + j, ey, 46 * s, '#0c0f16', { line: false }); fcGlow(ex + j, ey - 6, 50 * s, 'rgba(220,240,255,1)', 0.5); fcCirc(ex + j - 14 * s, ey - 6, 7 * s, '#fff', { line: false }); fcCirc(ex + j + 14 * s, ey - 6, 7 * s, '#fff', { line: false }); } for (let k = 0; k < 5; k++) fcHandShape(gx + 30 + k * gw / 5, gy + gh * 0.4 + Math.sin(TT * 4 + k) * 20, -Math.PI / 2, 26, '#262b36', 'open'); }
    else { const s = a.press ? 1.6 : 1.0, zy = a.press ? gy + gh * 0.55 : gy + gh * 0.75; fcZombie(gx + gw / 2, zy + 600 * 0.6 * s, 0.6 * s, { seed: 9, arms: 0.2, lean: 0.03 }); if (a.press) fcHandShape(gx + gw * 0.62, gy + gh * 0.35 + Math.sin(TT * 5) * 6, -Math.PI / 2, 40, '#22262f', 'open'); }
    ctx.save(); ctx.strokeStyle = 'rgba(200,210,230,0.35)'; ctx.lineWidth = 2; for (let k = -10; k < 20; k++) { ctx.beginPath(); ctx.moveTo(gx + k * 26, gy); ctx.lineTo(gx + k * 26 + gh, gy + gh); ctx.moveTo(gx + k * 26 + gh, gy); ctx.lineTo(gx + k * 26, gy + gh); ctx.stroke(); } ctx.restore();
    fcGlow(gx + gw * 0.3, gy + gh * 0.2, gw, 'rgba(255,255,255,0.25)', 0.3);
  });
  // the handle: turns down when it "moves"
  const hx = x0 + w * 0.12, hy = y0 + h * 0.55, turn = a.handle ? EZ.io(clamp((lt - 0.4) / 0.6)) * 0.55 * (1 + 0.15 * Math.sin(TT * 14)) : 0;
  fcCirc(hx, hy, 34, '#c9d0dc');
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(turn); fcRect(-10, -16, 190, 32, '#d8dee8', { r: 16 }); ctx.restore();
  fcRect(x0 + 20, y0 + h - 160, w - 40, 130, '#9aa3b2', { r: 6 });
  ctx.restore();
  if (a.handle && turn > 0.05) for (let k = 0; k < 3; k++) fcLine([[hx + 220, hy - 40 + k * 40], [hx + 260, hy - 50 + k * 40]], '#ffffff', 5);
  if (a.sign) {
    const k = EZ.o3(clamp((lt - 0.1) / 0.3));
    fcDefer(() => { ctx.save(); ctx.globalAlpha = k; fcSign('KEIN SCHLOSS', 'DAMIT DAS PERSONAL REINKOMMT', 540, 220, { size: 110 }); ctx.restore(); });
    ctx.save(); ctx.setLineDash([16, 12]); ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.beginPath(); ctx.arc(hx + 40, hy, 110 + Math.sin(TT * 4) * 6, 0, TAU); ctx.stroke(); ctx.restore();
    fcCirc(hx, hy + 260, 50, '#2a2f3a'); ctx.save(); ctx.fillStyle = '#fff'; ctx.font = `700 50px ${FCF}`; ctx.textAlign = 'center'; ctx.fillText('🔓', hx, hy + 278); ctx.restore(); fcLine([[hx - 45, hy + 300], [hx + 45, hy + 220]], FC.red, 8);
  }
  if (a.horde) { const p = 0.5 + 0.5 * Math.sin(TT * 2); fcTint('rgba(40,90,200,1)', 0.25 + 0.1 * p, 'multiply'); darkWash(0.25); }
}
SCENES.door = (a, i) => { const { lt } = shotT(i); doorScene(a, lt); endScene(a.handle || a.horde ? 0.1 : 0); };
// ---- the group in the room at 6:48; the blackout
function groupRoom(o) {
  roomBg({ curtain: true });
  fcRect(760, 230, 220, 220, '#e9ecf2', { r: 110 }); fcCirc(870, 340, 96, '#f6f7f9', { w: 3 });
  const mAng = TAU * (48 / 60) - Math.PI / 2, hAng = TAU * ((6 + 48 / 60) / 12) - Math.PI / 2;
  fcLine([[870, 340], [870 + Math.cos(hAng) * 50, 340 + Math.sin(hAng) * 50]], FC.line, 9); fcLine([[870, 340], [870 + Math.cos(mAng) * 78, 340 + Math.sin(mAng) * 78]], FC.line, 6);
  const sec = TAU * (TT % 60) / 60 - Math.PI / 2; fcLine([[870, 340], [870 + Math.cos(sec) * 82, 340 + Math.sin(sec) * 82]], FC.red, 3);
  fcFigure('jana', 330, 1520, 1000, { arms: 'hold', face: o.face || 'determined', flip: false });
  fcFigure('lukas', 690, 1540, 900, { arms: 'down', face: o.lface || 'scared', flip: true });
  fcDog(420, 1600, 0.85, { pose: 'sit', earUp: true });
}
SCENES.group = (a, i) => {
  const { lt } = shotT(i);
  if (!a.blackout) { groupRoom({}); endScene(); return; }
  const cut = 0.45, on = lt < cut ? (hash(Math.floor(lt * 20)) % 3 > 0) : false;
  groupRoom({ face: 'shocked', lface: 'panic' });
  if (!on) { darkWash(0.86); fcGlow(420 + 70, 1600 - 230, 30, 'rgba(160,255,120,1)', 0.8); fcCirc(495, 1365, 6, '#cfffb0', { line: false }); }
  endScene(0.15);
};
// ---- the dark: Jana in her flashlight, Keks's eyes
function lightHole(x, y, r, dark = 0.93) {
  ctx.save(); screen(); const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r); g.addColorStop(0, 'rgba(3,5,10,0)'); g.addColorStop(1, `rgba(3,5,10,${dark})`);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
}
SCENES.janaDark = (a, i) => {
  fillAll('#1a2234');
  fcRect(780, 220, 200, 520, '#121826', { w: 3 });
  const R = RNG('winEyes'); for (let k = 0; k < 6; k++) { const ex = 820 + R.r(0, 120), ey = 260 + R.r(0, 420); if (Math.sin(TT * 2 + k) > -0.4) { fcCirc(ex, ey, 4, '#e8f0ff', { line: false }); fcCirc(ex + 12, ey, 4, '#e8f0ff', { line: false }); } }
  fcBust('jana', 520, a.close ? 700 : 780, a.close ? 1.45 : 1.15, { face: 'determined' });
  fcTint('rgba(70,110,200,1)', 0.35);
  lightHole(470 + Math.sin(TT * 1.3) * 20, 820, 520);
  fcGlow(220, 1300, 160, 'rgba(200,220,255,1)', 0.7);
  endScene(0.1);
};
SCENES.dogDark = (a, i) => {
  fillAll('#141a28');
  fcDog(560, 1480, 1.6, { pose: 'sit', glow: true, earUp: true });
  fcTint('rgba(60,90,170,1)', 0.45); darkWash(0.45);
  const bx = 200 + Math.sin(TT * 0.9) * 300; ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(bx, 900, 10, bx, 900, 260); g.addColorStop(0, 'rgba(120,140,190,0.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
  fcGlow(560 + 160, 1480 - 1.6 * 278, 60, 'rgba(160,255,120,1)', 0.8);
  endScene(0.12);
};
// ---- into the bathroom
function bathRoom() {
  fillAll('#8fa3b3'); for (let y = 0; y < 1500; y += 90) for (let x = (y / 90 % 2) * 45; x < W; x += 90) fcRect(x, y, 88, 88, '#9db0c0', { w: 1.5, line: '#7e93a4' });
  fcRect(-10, 1500, W + 20, 500, '#6f8494', { line: false });
  fcPath((g) => g.roundRect(700, 1080, 260, 420, [20, 20, 60, 60]), '#f1f4f8'); fcPath((g) => g.ellipse(830, 1100, 140, 50, 0, 0, TAU), '#e2e8ef');
  fcRect(80, 900, 340, 140, '#f1f4f8', { r: 20 }); fcRect(140, 500, 240, 300, '#c7d6e2', { r: 14 });
  fcLine([[40, 300], [40, 1500]], '#c43c35', 6); fcRect(20, 1200, 40, 40, '#c43c35', { r: 6 });
}
SCENES.bathPush = (a, i) => {
  const { lt } = shotT(i), k = springMove(SHOT_LIST[i][0], 0, 1, SPRING.snappy);
  bathRoom();
  fcRect(-200, 300, 380, 1250, '#0d1018', { w: 4 });
  fcFigure('lukas', lerp(-40, 380, k), 1560, 880, { arms: 'up', face: 'panic', walk: true });
  fcFigure('jana', lerp(-260, 120, k), 1580, 1000, { arms: 'push', face: 'shout', walk: true });
  fcDog(lerp(-300, 560, k), 1640, 0.8, { pose: 'stand', pant: true });
  darkWash(0.35); fcTint('rgba(60,100,190,1)', 0.25);
  endScene();
};
// ---- the plan: two rooms, one bathroom
SCENES.blueprint = (a, i) => {
  const { lt } = shotT(i);
  fillAll('#0f2440');
  ctx.save(); ctx.strokeStyle = 'rgba(120,170,230,0.12)'; ctx.lineWidth = 1; for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } ctx.restore();
  ctx.save(); ctx.fillStyle = FC.yellow; ctx.font = `700 46px ${FCF}`; ctx.letterSpacing = '4px'; ctx.textAlign = 'center'; ctx.fillText('ZWEI ZIMMER · EIN BAD', 540, 330);
  ctx.fillStyle = '#fff'; ctx.font = `700 60px ${FCF}`; ctx.fillText('317', 260, 450); ctx.fillText('319', 820, 450); ctx.font = `700 40px ${FCF}`; ctx.fillText('BAD', 540, 450); ctx.restore();
  const wl = (P) => fcLine(P, '#e9f1ff', 8);
  wl([[100, 480], [980, 480], [980, 1080], [100, 1080], [100, 480]]); wl([[440, 480], [440, 1080]]); wl([[640, 480], [640, 1080]]); wl([[440, 760], [640, 760]]);
  ctx.save(); ctx.strokeStyle = '#e9f1ff'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(440, 640, 90, -Math.PI / 2, 0); ctx.stroke(); ctx.beginPath(); ctx.arc(640, 640, 90, Math.PI, Math.PI * 1.5); ctx.stroke(); ctx.restore();
  fcRect(150, 560, 120, 220, 'rgba(120,170,230,0.3)', { line: '#9cc0ea', w: 2 }); fcRect(810, 560, 120, 220, 'rgba(120,170,230,0.3)', { line: '#9cc0ea', w: 2 });
  fcRect(100, 1080, 880, 200, 'rgba(255,255,255,0.04)', { line: '#e9f1ff', w: 4 });
  ctx.save(); ctx.fillStyle = '#9cc0ea'; ctx.font = `600 30px ${FCF}`; ctx.letterSpacing = '3px'; ctx.fillText('FLUR', 880, 1320); ctx.restore();
  const R = RNG('reds'); for (let k = 0; k < 22; k++) { const x = R.r(130, 520) + Math.sin(TT * 2 + k) * 8, y = R.r(1110, 1250); fcCirc(x, y, 12, '#ff4b3e', { line: false }); }
  ctx.save(); ctx.lineWidth = 8; ctx.strokeStyle = '#ff4b3e'; ctx.beginPath(); ctx.moveTo(150, 1080); ctx.lineTo(430, 1080); ctx.stroke(); ctx.restore();
  // the path: 317 -> bath -> 319, drawn on, the three dots following it
  const P = [[300, 900], [400, 700], [540, 640], [700, 700], [840, 900], [880, 1060]], k = EZ.io(clamp((lt - 0.2) / 1.6));
  const S = subPath(resample(P, false, 6), k); ctx.save(); ctx.setLineDash([18, 14]); fcLine(S, '#ffffff', 6); ctx.restore();
  const head = S[S.length - 1]; fcCirc(head[0], head[1], 16, '#5aa9e6', { line: false }); fcCirc(head[0] - 30, head[1] + 10, 12, '#f5b731', { line: false }); fcCirc(head[0] - 52, head[1] + 22, 10, '#f4efe4', { line: false });
  endScene();
};
SCENES.dogSilent = (a, i) => {
  const { lt } = shotT(i);
  bathRoom(); darkWash(0.3);
  fcDog(420, 1600, 1.8, { pose: 'sit', pant: lt < 0.4, earUp: true });
  fcArm([1300, 200], [1000, 420], [760, 560], 'jana', { pose: 'open', w: 90 });
  fcDefer(() => fcSign('TRAINIERT', 'STILL SEIN', 760, 230, { size: 90 }));
  endScene();
};
SCENES.gownBack = (a, i) => {
  const { lt } = shotT(i), sw = Math.sin(TT * 6);
  bathRoom(); darkWash(0.25);
  const x = 540, y = 1600;
  fcLimb([[x - 70, y - 520], [x - 80 + sw * 20, y - 260], [x - 80 + sw * 30, y - 20]], CAST.lukas.skin, 70); fcLimb([[x + 70, y - 520], [x + 80 - sw * 20, y - 260], [x + 80 - sw * 30, y - 20]], CAST.lukas.skin, 70);
  fcRect(x - 130 + sw * 30, y - 50, 110, 50, '#e8823a', { r: 16 }); fcRect(x + 20 - sw * 30, y - 50, 110, 50, '#e8823a', { r: 16 });
  // boxers with hearts in the gap of the open gown
  fcRect(x - 140, y - 700, 280, 210, '#c0392b', { r: 30 }); ctx.save(); ctx.fillStyle = '#fff'; ctx.font = `700 40px ${FCF}`; for (let k = 0; k < 6; k++) ctx.fillText('♥', x - 120 + (k % 3) * 85, y - 630 + Math.floor(k / 3) * 80); ctx.restore();
  fcPath((g) => { g.moveTo(x - 260, y - 1260); g.lineTo(x - 40, y - 1260); g.lineTo(x - 70, y - 620); g.lineTo(x - 280, y - 560); g.closePath(); }, CAST.lukas.cloth);
  fcPath((g) => { g.moveTo(x + 260, y - 1260); g.lineTo(x + 40, y - 1260); g.lineTo(x + 70, y - 620); g.lineTo(x + 280, y - 560); g.closePath(); }, CAST.lukas.cloth);
  fcClip((g) => g.rect(x - 300, y - 1270, 600, 720), () => { fcRect(x - 40, y - 1260, 80, 600, CAST.lukas.skin, { line: false }); });
  fcLine([[x - 30, y - 1150], [x + 30, y - 1150]], '#f3f1ea', 6); fcLine([[x - 30, y - 950], [x + 30, y - 950]], '#f3f1ea', 6);
  fcLimb([[x - 250, y - 1200], [x - 330, y - 950], [x - 300 + sw * 20, y - 760]], CAST.lukas.skin, 64); fcLimb([[x + 250, y - 1200], [x + 330, y - 950], [x + 300 - sw * 20, y - 760]], CAST.lukas.skin, 64);
  fcCirc(x, y - 1420, 190, CAST.lukas.hairColor);
  fcCirc(x - 190, y - 1400, 34, CAST.lukas.skin); fcCirc(x + 190, y - 1400, 34, CAST.lukas.skin);
  if (lt > 0.5) fcDefer(() => { ctx.save(); ctx.font = `700 120px ${FCF}`; ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center'; ctx.globalAlpha = clamp((lt - 0.5) / 0.15); ctx.fillText('😳', 860, 420); ctx.restore(); });
  endScene();
};
// ---- the elevators
function elevHallBg() {
  fillAll(FC.wall); fcRect(-10, 1500, W + 20, 500, FC.floor, { w: 3 }); fcRect(-10, 1150, W + 20, 20, FC.wallL, { w: 2 });
  for (const x of [80, 600]) { fcRect(x, 500, 420, 1000, FC.steelD, { r: 6 }); fcRect(x + 30, 530, 360, 970, FC.steel); fcLine([[x + 210, 530], [x + 210, 1500]], FC.line, 3); fcRect(x + 150, 400, 120, 70, '#121418', { r: 10 }); }
  ctx.save(); ctx.fillStyle = FC.orange; ctx.font = `700 54px ${FCF}`; ctx.fillText('1', 205, 455); ctx.fillText(String(Math.min(3, 1 + Math.floor(TT * 2) % 3)), 725, 455); ctx.restore();
  fcRect(515, 900, 70, 160, '#9aa5b8', { r: 12 }); fcCirc(550, 945, 20, '#d9dee7'); fcCirc(550, 1010, 20, '#d9dee7');
  fcRect(620, 1180, 160, 100, '#c4342e', { r: 8 }); ctx.save(); ctx.fillStyle = '#fff'; ctx.font = `600 22px ${FCF}`; ctx.textAlign = 'center'; ctx.fillText('IM BRANDFALL', 700, 1222); ctx.fillText('TREPPE NUTZEN', 700, 1254); ctx.restore();
}
SCENES.elevHall = (a, i) => {
  const { lt } = shotT(i);
  elevHallBg();
  fcFigure('lukas', lerp(350, 430, clamp(lt / 1.4)), 1640, 900, { arms: lt > 0.6 ? 'point' : 'down', face: 'calm', walk: lt < 1.0 });
  fcFigure('jana', 860, 1660, 1000, { arms: 'down', face: { mouth: 'flat', brows: 0.4, look: [-0.8, 0] }, flip: true });
  fcDog(980, 1700, 0.75, { pose: 'sit', flip: true });
  endScene();
};
SCENES.button = (a, i) => {
  const { lt } = shotT(i);
  fillAll('#9aa5b8'); fcRect(300, 200, 480, 1200, '#b7c0cf', { r: 60 });
  const lit = a.stop || lt > 0.35;
  for (const [y, up] of [[620, true], [1060, false]]) { fcCirc(540, y, 180, '#d4d9e2'); fcCirc(540, y, 140, '#eceff4'); if (up && lit) { ctx.save(); ctx.lineWidth = 16; ctx.strokeStyle = '#f39c26'; ctx.shadowColor = '#f39c26'; ctx.shadowBlur = 30; ctx.beginPath(); ctx.arc(540, y, 150, 0, TAU); ctx.stroke(); ctx.restore(); } fcPoly(up ? [[480, y + 40], [540, y - 50], [600, y + 40]] : [[480, y - 40], [540, y + 50], [600, y - 40]], up && lit ? '#f39c26' : '#5d6779'); }
  if (!a.stop) { const k = EZ.io(clamp(lt / 0.35)); fcArm([1300, 1500], [1050, lerp(1300, 1000, k)], [lerp(900, 640, k), lerp(900, 700, k)], 'lukas', { pose: 'point', band: true, w: 100 }); }
  else {
    fcArm([1300, 1500], [1050, 1000], [660, 720], 'lukas', { pose: 'point', band: true, w: 100 });
    const k = springMove(SHOT_LIST[i][0] + 0.1, 0, 1, SPRING.snappy); fcArm([-300, 1400], [lerp(-100, 200, k), 1100], [lerp(-50, 520, k), lerp(1100, 860, k)], 'jana', { pose: 'fist', w: 110 });
    fcDefer(() => { fcRect(330, 180, 420, 150, '#121418', { r: 18 }); ctx.save(); ctx.fillStyle = FC.orange; ctx.shadowColor = FC.orange; ctx.shadowBlur = 20; ctx.font = `700 120px ${FCF}`; ctx.fillText('▲', 380, 300); ctx.fillText(String(Math.min(3, 1 + Math.floor(lt * 2.2))), 600, 300); ctx.restore(); });
  }
  endScene();
};
SCENES.elevator = (a, i) => {
  const { lt } = shotT(i);
  fillAll(FC.wall); fcRect(-10, 1580, W + 20, 400, FC.floor, { w: 3 }); fcRect(-10, 1180, W + 20, 20, FC.wallL, { w: 2 });
  fcRect(430, 540, 220, 92, '#121418', { r: 12 });
  ctx.save(); ctx.fillStyle = FC.orange; ctx.shadowColor = FC.orange; ctx.shadowBlur = 16; ctx.font = `700 70px ${FCF}`; ctx.beginPath(); ctx.moveTo(470, 612); ctx.lineTo(500, 562); ctx.lineTo(530, 612); ctx.fill(); ctx.fillText(a.open ? '3' : String(Math.min(3, 2 + Math.floor(lt * 1.2))), 568, 614); ctx.restore();
  fcRect(220, 650, 640, 950, FC.steelD, { r: 6 }); fcRect(260, 690, 560, 890, '#cfd5e0');
  const g = ctx.createLinearGradient(0, 690, 0, 1580); g.addColorStop(0, 'rgba(255,255,255,0.6)'); g.addColorStop(1, 'rgba(120,130,150,0.2)'); ctx.fillStyle = g; ctx.fillRect(260, 690, 560, 890);
  fcRect(300, 1060, 480, 14, '#aab3c3', { w: 2 });
  const op = a.open ? EZ.io(clamp((lt - 0.05) / 0.5)) : 0;
  if (op > 0.05) fcZombie(540, 1560, 1.38, { seed: 7, arms: 0.95, lean: 0.03, rim: '#3a4560' });
  fcRect(260, 690, 280 * (1 - op) + 2, 890, FC.steel); fcRect(820 - 280 * (1 - op) - 2, 690, 280 * (1 - op) + 2, 890, FC.steel);
  ctx.save(); ctx.globalAlpha = 0.25 * op; ctx.fillStyle = '#e8eef8'; ctx.beginPath(); ctx.moveTo(260, 1580); ctx.lineTo(820, 1580); ctx.lineTo(980, 1920); ctx.lineTo(100, 1920); ctx.fill(); ctx.restore();
  fcRect(910, 960, 80, 170, '#9aa5b8', { r: 12 }); fcCirc(950, 1010, 22, '#f39c26'); fcCirc(950, 1080, 22, '#d9dee7');
  if (a.rule || a.open) fcDefer(() => fcRule(2, 'NIMM NIEMALS', 'DEN AUFZUG', { u: a.open ? 1 : EZ.o3(clamp((lt - 0.15) / 0.3)), size: 84 }));
  endScene(0.05);
};
SCENES.rush = (a, i) => {
  const { lt } = shotT(i), k = springMove(SHOT_LIST[i][0], 0, 1, SPRING.snappy);
  elevHallBg();
  fcZombie(lerp(120, 330, k), 1580, 1.25, { seed: 3, arms: 1, lean: 0.25 });
  fcZombie(lerp(-80, 120, k), 1600, 1.2, { seed: 5, arms: 1, lean: 0.2 });
  fcFigure('jana', 560, 1640, 1000, { arms: 'push', armsB: 'push', face: 'angry', flip: true });
  fcFigure('lukas', 820, 1660, 900, { arms: 'up', armsB: 'up', face: 'panic', flip: true });
  fcDog(980, 1720, 0.8, { pose: 'stand', flip: false, pant: true });
  endScene();
};
// ---- the wheelchair
function wheelchair(x, y, s, spin = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  fcRect(-160, -420, 30, 340, '#3d4452'); fcRect(-170, -120, 300, 40, '#2c6fb3', { r: 10 }); fcRect(-170, -360, 40, 260, '#2c6fb3', { r: 10 });
  for (const [cx, r] of [[-60, 150], [150, 50]]) { ctx.save(); ctx.translate(cx, -r); ctx.rotate(spin); fcCirc(0, 0, r, null, { w: 14 }); fcCirc(0, 0, r - 12, null, { w: 4, line: '#aeb7c6' }); for (let k = 0; k < 8; k++) { ctx.rotate(TAU / 8); fcLine([[0, 0], [0, r - 10]], '#aeb7c6', 3); } ctx.restore(); }
  fcLine([[-150, -420], [-230, -440]], FC.line, 16);
  ctx.restore();
}
SCENES.wheelchair = (a, i) => {
  const { lt } = shotT(i), k = springMove(SHOT_LIST[i][0] + 0.05, 0, 1, SPRING.heavy);
  elevHallBg(); darkWash(0.2);
  wheelchair(560, 1680, 1.5);
  fcBust('lukas', 600, lerp(560, 860, k), 0.9, { face: 'scared', arms: { l: [[-1.2, 2.4], [-0.6, 3.0], 'open'], r: [[1.3, 2.4], [1.6, 3.0], 'open'] } });
  fcLimb([[560, 1560], [800, 1560], [820, 1700]], CAST.lukas.skin, 80);
  fcFigure('jana', 230, 1700, 1050, { arms: 'push', face: 'shout' });
  endScene();
};
SCENES.wheelRun = (a, i) => {
  const { lt } = shotT(i);
  corridorBase({ flicker: true });
  horde(HORDE.map(([k, u, s]) => [k + 0.6, u, s]), { approach: lt * 0.25 });
  const bob = Math.sin(TT * 14) * 8, x = 540 + Math.sin(TT * 2) * 20;
  wheelchair(x - 40, 1720 + bob, 1.25, TT * 10);
  fcBust('lukas', x, 1010 + bob, 0.75, { face: 'panic' });
  fcFigure('jana', x + 140, 1740 + bob, 1180, { arms: 'push', face: 'determined', walk: true, flip: true });
  for (let k = 0; k < 10; k++) { const yy = (k * 197 + TT * 1900) % 1920; fcLine([[k % 2 ? 40 : 1040, yy], [k % 2 ? 40 : 1040, yy + 160]], 'rgba(255,255,255,0.35)', 6); }
  endScene();
};
SCENES.wheelClose = (a, i) => {
  fillAll('#5a6880'); fcRect(-10, 1400, W + 20, 600, '#7f8ba0', { line: false });
  for (let k = 0; k < 8; k++) { const xx = ((k * 220 - TT * 2400) % 1800 + 1800) % 1800 - 300; fcRect(xx, 1400, 60, 520, '#6d7a90', { line: false }); }
  ctx.save(); ctx.translate(560, 1100); ctx.rotate(TT * 14); fcCirc(0, 0, 330, null, { w: 30 }); fcCirc(0, 0, 300, null, { w: 6, line: '#aeb7c6' }); for (let k = 0; k < 12; k++) { ctx.rotate(TAU / 12); fcLine([[0, 0], [0, 300]], '#aeb7c6', 5); } fcCirc(0, 0, 40, '#3d4452'); ctx.restore();
  fcDog(lerp(-300, 300, (TT * 0.6) % 1), 1620, 1.1, { pose: 'stand', pant: true });
  for (let k = 0; k < 7; k++) { const y = 300 + k * 160; fcLine([[1080 - ((TT * 2000 + k * 300) % 1400), y], [1080 - ((TT * 2000 + k * 300) % 1400) + 260, y]], 'rgba(255,255,255,0.4)', 6); }
  endScene();
};
// ---- the radio, the stairwell
SCENES.radio = (a, i) => {
  const { lt } = shotT(i);
  faceBg('stairs'); darkWash(0.15);
  ctx.save(); ctx.translate(560, 1000); ctx.rotate(-0.12);
  fcRect(-150, -330, 300, 620, '#22262f', { r: 40 }); fcLine([[90, -330], [100, -560]], '#22262f', 30);
  fcRect(-110, -270, 220, 160, '#3c8f5a', { r: 14 }); ctx.fillStyle = '#d9ffe6'; ctx.font = `700 40px ${FCF}`; ctx.fillText('CH 4 · ZNA', -90, -180);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) fcCirc(-90 + c * 36, -40 + r * 36, 9, '#11141a', { line: false });
  fcCirc(60, -380, 14, (F % 16) < 8 ? '#46e08a' : '#1c5a35', { line: false });
  ctx.restore();
  fcHandShape(560, 1180, -Math.PI / 2 - 0.1, 140, CAST.jana.skin, 'fist');
  for (let k = 0; k < 3; k++) { const r = 80 + ((lt * 220 + k * 70) % 210); ctx.save(); ctx.globalAlpha = 1 - r / 290; ctx.lineWidth = 8; ctx.strokeStyle = '#ffffff'; ctx.beginPath(); ctx.arc(660, 440, r, -1.2, -0.2); ctx.stroke(); ctx.restore(); }
  endScene();
};
function stairBg() {
  fillAll('#5d6470'); fcRect(-10, 1300, W + 20, 700, '#4a505b', { line: false });
  ctx.save(); ctx.font = `700 600px ${FCF}`; ctx.fillStyle = '#6b7380'; ctx.fillText('3', 600, 1000); ctx.restore();
  for (let k = 0; k < 9; k++) fcRect(-20 + k * 70, 1300 - k * 60, 72, 62 + k * 60, '#565c67', { w: 2.5 });
  fcLine([[0, 1000], [640, 560]], '#c9a227', 14); fcLine([[0, 1000], [640, 560]], FC.line, 2);
  fcRect(780, 260, 200, 70, '#c62f2a', { r: 6 }); ctx.save(); ctx.fillStyle = '#fff'; ctx.font = `700 40px ${FCF}`; ctx.fillText('TREPPE B', 800, 310); ctx.restore();
}
SCENES.stairGroup = (a, i) => {
  stairBg();
  fcFigure('jana', 380, 1640, 1050, { arms: 'hold', face: { mouth: 'flat', brows: 0.6, look: [0.3, 0.4] } });
  fcFigure('lukas', 720, 1660, 900, { arms: 'down', face: 'scared', flip: true });
  fcDog(560, 1720, 0.8, { pose: 'sit' });
  endScene();
};
function stairShaft(dir, lt) {
  fillAll('#3a3f48');
  for (let k = 0; k < 14; k++) {
    const s = Math.pow(0.8, k), w = 1000 * s, h = 1700 * s, x = 540 - w / 2, y = 960 - h / 2;
    fcRect(x, y, w, h, k % 2 ? '#4f5561' : '#5a606c', { w: 2 });
    fcRect(x + w * 0.06, y + h * 0.06, w * 0.88, h * 0.88, null, { w: 6, line: '#c9a227' });
    if (dir < 0 && k > 3 && k < 12) { const R = RNG('sh', k); for (let n = 0; n < 5; n++) { const ang = R.r(0, TAU), zx = 540 + Math.cos(ang) * w * 0.4, zy = 960 + Math.sin(ang) * h * 0.4; fcCirc(zx, zy, 34 * s * 2, '#0c0f16', { line: false }); fcCirc(zx - 8 * s * 2, zy - 4, 4, '#e8f0ff', { line: false }); fcCirc(zx + 8 * s * 2, zy - 4, 4, '#e8f0ff', { line: false }); } }
  }
  if (dir < 0) { fcGlow(540, 960, 240, 'rgba(255,40,40,1)', 0.75 + 0.2 * Math.sin(TT * 5)); fcTint('rgba(255,120,120,1)', 0.12, 'source-over'); }
  else { fcGlow(540, 960, 260, 'rgba(255,240,200,1)', 0.85); }
}
SCENES.stairDown = (a, i) => {
  const { lt } = shotT(i);
  stairShaft(-1, lt);
  for (let k = 0; k < 5; k++) { const ang = k / 5 * TAU + TT * 0.2; fcHandShape(540 + Math.cos(ang) * 300, 960 + Math.sin(ang) * 520, ang + Math.PI, 40, '#1a1e28', 'open'); }
  fcDefer(() => fcSign('NOTAUFNAHME', '▼ ERDGESCHOSS', 540, 230, { size: 90 }));
  endScene(0.1);
};
SCENES.stairUp = (a, i) => {
  const { lt } = shotT(i);
  stairShaft(1, lt);
  fcRect(410, 900, 260, 120, '#f2d14b', { r: 8 }); ctx.save(); ctx.fillStyle = '#1b1d22'; ctx.font = `700 36px ${FCF}`; ctx.textAlign = 'center'; ctx.fillText('DACH ▲', 540, 950); ctx.font = `600 22px ${FCF}`; ctx.fillText('HUBSCHRAUBER', 540, 990); ctx.restore();
  fcDefer(() => fcSign('7 STOCKWERKE', 'BIS ZUM DACH', 540, 230, { size: 100 }));
  endScene(0.05);
};
SCENES.helipad = (a, i) => {
  const { lt } = shotT(i);
  const g = ctx.createLinearGradient(0, 0, 0, 1100); g.addColorStop(0, '#2a3460'); g.addColorStop(0.7, '#c86b5a'); g.addColorStop(1, '#f1a560'); fillAll('#2a3460'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  fcCirc(800, 1000, 120, '#ffd38a', { line: false }); fcGlow(800, 1000, 400, 'rgba(255,200,120,1)', 0.4);
  const R = RNG('sky2'); for (let x = -20; x < W; x += R.r(50, 110)) { const h = R.r(80, 260); fcRect(x, 1060 - h, R.r(60, 120), h, '#262a3d', { line: false }); }
  fcPath((g2) => { g2.moveTo(-100, 1920); g2.lineTo(140, 1080); g2.lineTo(940, 1080); g2.lineTo(1180, 1920); g2.closePath(); }, '#3b4253');
  fcPath((g2) => g2.ellipse(540, 1400, 380, 220, 0, 0, TAU), null, { w: 10, line: '#f2d14b' });
  ctx.save(); ctx.translate(540, 1400); ctx.scale(1, 0.58); ctx.fillStyle = '#ffffff'; ctx.font = `700 360px ${FCF}`; ctx.textAlign = 'center'; ctx.fillText('H', 0, 130); ctx.restore();
  for (let k = 0; k < 8; k++) { const ang = k / 8 * TAU, on = (F + k * 4) % 32 < 10; fcCirc(540 + Math.cos(ang) * 420, 1400 + Math.sin(ang) * 250, 12, on ? '#46e08a' : '#1c5a35', { line: false }); }
  fcLine([[900, 1080], [900, 900]], '#d9dee7', 8);
  fcPath((g2) => { const fl = Math.sin(TT * 8) * 12; g2.moveTo(900, 900); g2.lineTo(1040, 915 + fl); g2.lineTo(1040, 955 + fl); g2.lineTo(900, 950); g2.closePath(); }, '#ef7d2d');
  endScene();
};
// ---- the choice and the end card
SCENES.choice = (a, i) => {
  const { lt } = shotT(i), A = a.pick === 'A';
  fillAll('#141a28');
  const panel = (y, h, on, col, big, l1, l2, arrow) => {
    fcRect(60, y, 960, h, on ? col : '#252d40', { r: 30, w: 4, line: on ? '#ffffff' : '#3a4560' });
    ctx.save(); ctx.globalAlpha = on ? 1 : 0.45; ctx.fillStyle = '#fff'; ctx.font = `700 260px ${FCF}`; ctx.fillText(big, 110, y + h - 70);
    ctx.font = `700 76px ${FCF}`; ctx.fillText(l1, 330, y + h * 0.45); ctx.fillText(l2, 330, y + h * 0.45 + 90); ctx.font = `700 120px ${FCF}`; ctx.fillText(arrow, 860, y + h * 0.62); ctx.restore();
  };
  const pop = 1 + 0.04 * Math.exp(-lt * 6);
  ctx.save(); ctx.translate(540, 960); ctx.scale(pop, pop); ctx.translate(-540, -960);
  panel(280, 460, A, '#2f7a4d', 'A', 'HOCH AUFS', 'DACH', '▲');
  panel(800, 460, !A, '#a3302b', 'B', 'RUNTER IN DIE', 'NOTAUFNAHME', '▼');
  ctx.restore();
  fcBust('lukas', 300, 1340, 0.42, { face: A ? 'scared' : 'worried' }); fcBust('jana', 780, 1340, 0.42, { face: A ? 'worried' : 'determined' });
  endScene();
};
SCENES.endcard = (a, i) => {
  const { lt } = shotT(i), k = EZ.o3(clamp(lt / 0.4));
  fillAll('#121827');
  ctx.save(); ctx.globalAlpha = k; ctx.textAlign = 'center';
  ctx.fillStyle = '#9aa7bd'; ctx.font = `600 34px ${FCF}`; ctx.letterSpacing = '4px'; ctx.fillText('ZOMBIE-APOKALYPSE IM KRANKENHAUS', 540, 640);
  ctx.letterSpacing = '0px'; ctx.fillStyle = '#ffffff'; ctx.font = `700 120px ${FCF}`; ctx.fillText('HOCH', 540, 800); ctx.fillText('ODER RUNTER?', 540, 930);
  ctx.fillStyle = FC.red; ctx.fillRect(390, 980, 300 * EZ.o3(clamp((lt - 0.2) / 0.4)), 6);
  ctx.fillStyle = FC.yellow; ctx.font = `700 54px ${FCF}`; ctx.letterSpacing = '3px'; ctx.fillText('TEIL 2 · FOLG FÜR MEHR', 540, 1080);
  ctx.fillStyle = '#c9d2e0'; ctx.font = `600 38px ${FCF}`; ctx.fillText('SCHREIB A ODER B IN DIE KOMMENTARE', 540, 1160);
  ctx.restore();
  endScene();
};
