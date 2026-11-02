// =====================================================================
//  SCENES — Zombie-Klinik (look check: three style frames). World coords 1080x1920, style flat-noir.
// =====================================================================

// ---- 1. Leo in bed: the character, a name label, the bedside monitor
function sceneRoom() {
  SHOT_PIVOT[0] = [430, 900];
  fillAll(FC.wall);
  fcRect(-10, 1180, W + 20, 24, FC.wallL, { w: 2 });
  fcRect(-10, 1204, W + 20, 800, FC.wallD, { line: false });
  // headwall panel: outlets, gas valves
  fcRect(30, 420, 560, 190, '#5c6e8e', { r: 10 });
  [[90, 470], [170, 470]].forEach(([x, y]) => { fcRect(x, y, 56, 70, '#e8ebf0', { r: 6, w: 2.5 }); fcRect(x + 14, y + 18, 8, 14, '#333', { line: false }); fcRect(x + 34, y + 18, 8, 14, '#333', { line: false }); });
  [[300, 470], [380, 470]].forEach(([x, y]) => { fcRect(x, y, 50, 66, '#c43c35', { r: 6, w: 2.5 }); fcCirc(x + 25, y + 33, 12, '#7a1f1b', { w: 2 }); });
  fcRect(470, 470, 90, 66, '#2b3346', { r: 6, w: 2.5 });
  // IV pole + bag
  fcLine([[150, 160], [150, 1500]], '#9aa6bb', 9); fcLine([[150, 160], [150, 1500]], FC.line, 2);
  fcPath((g) => g.roundRect(100, 200, 100, 150, 18), 'rgba(225,236,245,0.85)');
  ctx.save(); ctx.fillStyle = '#3b4c6b'; ctx.font = `600 22px ${FCF}`; ctx.fillText('NaCl 0,9%', 108, 260); ctx.restore();
  // monitor on its arm
  fcLine([[860, 180], [860, 300]], '#2a3140', 16);
  fcMonitor(620, 280, 420, 320, Math.round(119 + ev(0.6, 1.2) * 2));
  // the bed: backrest, pillow, mattress, frame
  fcPoly([[130, 1200], [420, 640], [560, 700], [330, 1230]], FC.sheet);
  fcCirc(430, 760, 150, '#e6ebf3', { ry: 90, rot: -0.5 });
  fcRect(40, 1290, 1060, 70, FC.steel, { r: 14 });
  fcRect(90, 1360, 26, 160, FC.steelD); fcRect(960, 1360, 26, 160, FC.steelD);
  fcCirc(103, 1530, 26, '#2b3140'); fcCirc(973, 1530, 26, '#2b3140');
  fcRect(60, 1000, 30, 300, FC.steel, { r: 10 });   // side rail post
  // Leo: gown torso, head, arm with the IV line, blanket over the legs
  const breathe = Math.sin(TT * 2.4) * 4;
  ctx.save(); ctx.translate(380, 930); ctx.rotate(-0.28); fcGown(0, breathe, 330, 360); ctx.restore();
  fcPath((g) => { g.moveTo(330, 1290); g.quadraticCurveTo(300, 1120, 520, 1110); g.lineTo(980, 1150); g.quadraticCurveTo(1040, 1200, 1000, 1290); g.closePath(); }, FC.sheet);
  fcLine([[560, 1150], [960, 1180]], FC.sheetD, 4); fcLine([[520, 1210], [940, 1240]], FC.sheetD, 4);
  fcPath((g) => g.ellipse(1010, 1180, 46, 60, -0.3, 0, TAU), FC.sock);
  fcPath((g) => g.ellipse(1010, 1180, 30, 44, -0.3, 0, TAU), '#c9a42a', { w: 2 });
  // forearm on the blanket, wristband, IV tube from the bag
  const fy = Math.sin(TT * 1.1) * 3;
  fcPath((g) => { g.moveTo(470, 1010); g.quadraticCurveTo(560, 1110 + fy, 690, 1090 + fy); g.lineTo(700, 1130 + fy); g.quadraticCurveTo(560, 1160 + fy, 440, 1060); g.closePath(); }, FC.skin);
  fcCirc(720, 1105 + fy, 34, FC.skin, { ry: 28 });
  fcRect(600, 1095 + fy, 30, 44, '#f4f6fa', { w: 2.5 });
  ctx.save(); ctx.beginPath(); ctx.moveTo(150, 350); ctx.bezierCurveTo(160, 900, 420, 1240, 660, 1120 + fy); ctx.lineWidth = 3.5; ctx.strokeStyle = 'rgba(230,240,250,0.9)'; ctx.stroke(); ctx.restore();
  fcHead(430, 760 + breathe * 0.5, 150, { hair: 'spiky', seed: 3, face: { mouth: 'wavy', look: [-0.6, 0.2], sweat: false } });
  fcVignette();
  fcLabel('LEO · 19', 'BLINDDARM-OP LETZTE NACHT', { a: ev(0.15, 0.25) });
  fcCaption('LEO IST *19*.');
}

// ---- 2. the corridor: one-point perspective, silhouettes at every depth, the red danger tint, the pulse pill
const fcL = (s, v) => [lerp(0, 430, s), lerp(lerp(60, 740, s), lerp(1760, 1010, s), v)];
const fcR = (s, v) => [lerp(1080, 650, s), lerp(lerp(60, 740, s), lerp(1760, 1010, s), v)];
const fcC = (s, u) => [lerp(lerp(0, 430, s), lerp(1080, 650, s), u), lerp(60, 740, s)];
const fcFl = (s, u) => [lerp(lerp(0, 430, s), lerp(1080, 650, s), u), lerp(1760, 1010, s)];
const fcD = (k) => 1 - 1 / (1 + k);   // depth spacing: equal steps in the world get closer on screen
function sceneCorridor() {
  SHOT_PIVOT[1] = [540, 880];
  fillAll(FC.wall);
  fcPoly([fcC(0, 0), fcC(0, 1), fcC(1, 1), fcC(1, 0)], FC.ceil, { line: false });
  fcPoly([fcFl(0, 0), [0, 1920], [1080, 1920], fcFl(0, 1), fcFl(1, 1), fcFl(1, 0)], FC.floor, { line: false });
  fcPoly([fcL(0, 0), fcL(1, 0), fcL(1, 1), fcL(0, 1)], FC.wall, { line: false });
  fcPoly([fcR(0, 0), fcR(1, 0), fcR(1, 1), fcR(0, 1)], '#566886', { line: false });
  fcRect(430, 740, 220, 270, '#43536f', { w: 3 });
  fcRect(500, 820, 80, 190, FC.woodD, { w: 2.5 });
  // ceiling lights + their pools on the floor
  for (let i = 0; i < 4; i++) {
    const a = fcD(i * 1.1 + 0.25), b = fcD(i * 1.1 + 0.6);
    fcPoly([fcC(a, 0.36), fcC(a, 0.64), fcC(b, 0.62), fcC(b, 0.38)], '#e9f0ff', { w: 2 });
    fcGlow(...fcC((a + b) / 2, 0.5), 200 * (1 - a), 'rgba(200,220,255,0.6)', 0.35);
    const [fx, fy] = fcFl((a + b) / 2, 0.5); fcGlow(fx, fy, 260 * (1 - a), 'rgba(190,205,230,0.7)', 0.25);
  }
  // baseboards, handrails, doors on both walls
  for (const side of [fcL, fcR]) {
    fcLine([side(0, 0.97), side(1, 0.97)], '#3a465c', 10);
    fcLine([side(0, 0.6), side(1, 0.6)], FC.wood, 12); fcLine([side(0, 0.6), side(1, 0.6)], FC.line, 2);
    for (let i = 0; i < 3; i++) {
      const a = fcD(i * 1.3 + 0.15), b = fcD(i * 1.3 + 0.55);
      fcPoly([side(a, 0.3), side(b, 0.3), side(b, 0.99), side(a, 0.99)], FC.wood);
      fcPoly([side(a + (b - a) * 0.2, 0.36), side(a + (b - a) * 0.45, 0.36), side(a + (b - a) * 0.45, 0.6), side(a + (b - a) * 0.2, 0.6)], '#2a3446', { w: 2.5 });
    }
    fcPoly([side(fcD(0.95), 0.22), side(fcD(1.1), 0.22), side(fcD(1.1), 0.27), side(fcD(0.95), 0.27)], '#e9ecf2', { w: 2 });
  }
  // the infected: further ones first, feet on the floor at their depth, height ~ 72% of the wall there
  const Z = [[3.2, 0.40, 1], [2.9, 0.60, 2], [2.3, 0.30, 3], [1.9, 0.66, 4], [1.5, 0.44, 6], [0.5, 0.64, 5]];
  for (const [k, u, seed] of Z) {
    const s = fcD(k) + Math.sin(TT * 0.5 + seed) * 0.004, [x, y] = fcFl(s, u), wallH = lerp(1700, 270, s);
    fcZombie(x, y, wallH * 0.62 / 600, { seed, arms: 0.75, lean: (seed % 2 ? 0.1 : -0.08) });
  }
  fcTint('#e8a4a4', 1); fcTint('rgba(140,20,30,1)', 0.12, 'source-over');
  fcVignette(0.7);
  fcPill(152);
  fcCaption('JEDER ^INFIZIERTE^');
}

// ---- 3. the elevator: an open car, one silhouette inside, a rule card
function sceneElevator() {
  SHOT_PIVOT[2] = [540, 1000];
  fillAll(FC.wall);
  fcRect(-10, 1580, W + 20, 400, FC.floor, { w: 3 });
  fcRect(-10, 1180, W + 20, 20, FC.wallL, { w: 2 });
  // floor indicator
  fcRect(430, 540, 220, 92, '#121418', { r: 12 });
  ctx.save(); ctx.fillStyle = FC.orange; ctx.shadowColor = FC.orange; ctx.shadowBlur = 16; ctx.font = `700 70px ${FCF}`;
  ctx.beginPath(); ctx.moveTo(470, 612); ctx.lineTo(500, 562); ctx.lineTo(530, 612); ctx.fill(); ctx.fillText(String(Math.min(4, 1 + Math.floor(TT * 1.5))), 568, 614); ctx.restore();
  // the frame, the lit car, the doors pulled back
  fcRect(220, 650, 640, 950, FC.steelD, { r: 6 });
  fcRect(260, 690, 560, 890, '#cfd5e0');
  const g = ctx.createLinearGradient(0, 690, 0, 1580); g.addColorStop(0, 'rgba(255,255,255,0.5)'); g.addColorStop(1, 'rgba(120,130,150,0.2)'); ctx.fillStyle = g; ctx.fillRect(260, 690, 560, 890);
  fcRect(300, 1060, 480, 14, '#aab3c3', { w: 2 });   // handrail inside
  fcZombie(540, 1560, 1.38, { seed: 7, arms: 0.95, lean: 0.03, rim: '#3a4560' });
  const op = 0.5 + 0.5 * EZ.io(ev(4.1, 1.2));
  fcRect(260, 690, 280 * (1 - op) + 40, 890, FC.steel); fcRect(820 - 280 * (1 - op) - 40, 690, 280 * (1 - op) + 40, 890, FC.steel);
  // light spill on the floor
  ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#e8eef8'; ctx.beginPath(); ctx.moveTo(260, 1580); ctx.lineTo(820, 1580); ctx.lineTo(980, 1920); ctx.lineTo(100, 1920); ctx.fill(); ctx.restore();
  // call buttons, the fire sign
  fcRect(910, 960, 80, 170, '#9aa5b8', { r: 12 });
  fcCirc(950, 1010, 22, '#d9dee7'); fcCirc(950, 1080, 22, '#d9dee7');
  fcRect(860, 1220, 170, 110, '#c4342e', { r: 8 });
  ctx.save(); ctx.fillStyle = '#fff'; ctx.font = `600 24px ${FCF}`; ctx.textAlign = 'center'; ctx.fillText('IM BRANDFALL', 945, 1265); ctx.fillText('TREPPE NUTZEN', 945, 1300); ctx.restore();
  fcVignette();
  fcRule(2, 'NIEMALS DEN', 'AUFZUG NEHMEN', { u: EZ.o3(ev(4.2, 0.3)) });
  fcCaption('NIEMALS DEN ^AUFZUG^.');
}
