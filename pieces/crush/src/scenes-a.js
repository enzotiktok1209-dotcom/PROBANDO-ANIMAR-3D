// =====================================================================
//  SCENES A — acordar, espelho, banheiro (0 – 29.46s). Rafael wakes up in Júlia's body.
//  Lighting: every scene sets FN_LIGHT (direction of the cast shadows) — dawn from the window on the left.
// =====================================================================
const HEAD_H = 7.22 * RR;
const feetFor = (headY, s) => headY + HEAD_H * s;
function fnStars(n, key = 'st') { const R = RNG('stars', key); for (let i = 0; i < n; i++) { const x = R.r(-200, W + 200), y = R.r(-300, H + 200), tw = 0.5 + 0.5 * Math.sin(TT * (1 + R.f() * 3) + i); fnCirc(x, y, R.r(1, 3.2), `rgba(255,255,255,${0.25 + 0.6 * tw})`); } }
function fnGridBG(col = 'rgba(90,130,255,0.10)', step = 60) { for (let x = -300; x < W + 300; x += step) fnRect(x, -400, 2, H + 800, col); for (let y = -400; y < H + 400; y += step) fnRect(-300, y, W + 600, 2, col); }
// Júlia: the crush (long dark-brown hair, light-tan skin). In most shots Rafael is inside her — the face acts like him.
const JU = { hairC: '#4a2a18', skin: '#e8b48a', skinD: '#c99070' };
const ju = (o) => ({ ...JU, outfit: 'purple', ...o });
// a light shaft from a window (dust floating in it)
function fnShaft(x, y, ang, len, w, a = 0.25) { fnCone(x, y, ang, len, w, 'rgba(255,214,160,0.9)', a, 24); }
// Júlia's bedroom: lilac walls, fairy lights, a mirror, posters, a plant
function fnJuliaRoom(o = {}) {
  fnSetLight(0.7, 1, 0.55);
  fnRect(-300, -300, W + 600, H + 600, '#5a4a7a'); for (let i = 0; i < 24; i++) fnRect(-300 + i * 70, -300, 3, H + 600, 'rgba(255,255,255,0.03)');
  fnRR(40, 260, 340, 380, 10, '#3a2f58'); ctx.save(); ctx.beginPath(); ctx.rect(60, 280, 300, 340); ctx.clip(); fnSky('#ffc48a', '#8a8ad8', 280, 620); fnCity(620, { seed: 21, cols: ['#6a5aa0', '#5a4a90'] }); ctx.restore(); fnRect(205, 260, 10, 380, '#3a2f58'); fnRect(40, 445, 340, 10, '#3a2f58');
  fnShaft(210, 450, -1.0, 1300, 380, o.shaft ?? 0.22);
  for (let i = 0; i < 12; i++) { const x = 420 + i * 55, y = 300 + Math.sin(i * 0.9) * 26, on = mod(TT * 2 + i * 0.3, 1) < 0.7; fnCirc(x, y, 7, on ? '#ffe08a' : '#8a7a5a'); if (on) fnGlow(x, y, 34, '#ffd27a', 0.5); }
  fnRR(760, 360, 180, 240, 8, '#ff9ac4'); fnBold('K-POP', 850, 450, 34, '#ffffff'); fnRR(560, 420, 150, 190, 8, '#8ad0c0'); fnCirc(635, 500, 50, '#ffffff');
  fnRect(-300, 1150, W + 600, 900, '#6a4a3a'); for (let i = 0; i < 12; i++) fnRect(-300, 1160 + i * 60, W + 600, 3, '#5a3a2a');
  fnEll(620, 1250, 380, 70, '#d88ab0');   // rug
  fnRR(80, 880, 760, 230, 30, '#f2d4e6'); fnRR(60, 820, 80, 300, 20, '#e0b0cc'); fnRR(130, 890, 200, 80, 30, '#ffffff');   // bed
  fnRR(880, 940, 150, 210, 10, '#e8d0e0'); fnRR(930, 900, 50, 50, 20, '#3aa860');   // nightstand + plant
}
// a tall standing mirror; draws the reflection of whatever pose is given (mirrored)
function fnTallMirror(cx, floor, w, h, refl) {
  fnRR(cx - w / 2 - 22, floor - h - 22, w + 44, h + 22, 30, '#e0c890'); fnRR(cx - w / 2, floor - h, w, h, 20, '#b8d2e6');
  ctx.save(); ctx.beginPath(); ctx.roundRect(cx - w / 2, floor - h, w, h, 20); ctx.clip(); fnRect(cx - w / 2, floor - h, w, h, '#a8c6dc'); if (refl) refl(); fnLine(cx - w / 2 + 30, floor - h + 60, cx - w / 2 + 120, floor - h + 10, 26, 'rgba(255,255,255,0.35)'); fnLine(cx + w / 2 - 80, floor - 60, cx + w / 2 - 10, floor - 110, 18, 'rgba(255,255,255,0.25)'); ctx.restore();
  fnRR(cx - w / 2 - 40, floor - 10, 40, 20, 6, '#c0a070'); fnRR(cx + w / 2, floor - 10, 40, 20, 6, '#c0a070');
}
function fnRafaelFace(x, y, s, o = {}) { fnAt(x, y, s, () => fnRafaelHead(RR, { look: [0, 0], key: 'rf', ...o })); }
SCENE.bedroom = () => {
  const t = LT(); fnJuliaRoom();
  // she walks across the room (still half asleep), then stops in front of the mirror and sees herself
  const u = clamp(t / 1.0), x = lerp(120, 380, EZ.io(u)), stop = t > 1.0;
  const pose = stop ? { lL: [0.04, 0], lR: [-0.04, 0] } : fnWalkPose(TT * 1.5, 0.9);
  fnTallMirror(700, 1150, 300, 640, () => fnJulia(700 + (700 - x) * 0.25, 1150, 1.05, ju({ ...pose, flip: true, look: [-1, 0], eyes: stop ? 'wide' : 'squint', lid: stop ? 0 : 0.5, brow: stop ? 'up' : 'n', mouth: stop ? 'o' : 'flat', key: 'bm', shadow: false })));
  fnJulia(x, 1150, 1.3, ju({ ...pose, look: [1, 0], eyes: stop ? 'wide' : 'squint', lid: stop ? 0 : 0.5, brow: stop ? 'up' : 'n', mouth: stop ? 'o' : 'flat', key: 'bw', aR: stop ? [-0.3, -2.4] : pose.aR }));
};
SCENE.crush = () => {
  const t = LT(); fnSky('#3a1a3a', '#120818'); for (let i = 0; i < 16; i++) { const u = mod(TT * 0.4 + i / 16, 1); fnAlpha(1 - u, () => fnBold('♥', 80 + (i * 137) % 920, 1300 - u * 1100, 30 + (i % 3) * 16, '#ff5fb0')); }
  fnGlow(540, 700, 600, 'rgba(255,95,176,0.45)', 0.9);
  const k = springMove(ATS(0.0), 0, 1, SPRING.smooth);
  ctx.save(); ctx.translate(540, 720); ctx.rotate(lerp(-0.25, -0.05, k)); ctx.scale(lerp(0.7, 1, k), lerp(0.7, 1, k));
  fnRect(-300, -380, 600, 720, 'rgba(0,0,0,0.4)'); fnRect(-310, -390, 620, 720, '#f6efe4'); fnRect(-280, -360, 560, 560, '#ffb4cc');
  fnAt(0, -80, 2.3, () => fnJuliaHead(RR, ju({ look: [0.2, 0], lid: 0.25, mouth: 'smile', key: 'jc', blink: false })));
  ctx.font = 'italic 700 52px "FreeSerif", serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#5a2a4a'; ctx.fillText('Júlia', -20, 280); fnBold('♥', 110, 266, 50, FN.red);
  ctx.restore();
  fnTag('CRUSH', 540, 360, ATS(0.3), FN.pink, 38);
};
SCENE.swap = () => {
  const t = LT(); fnSky('#1a0a3a', '#05030f'); fnGridBG('rgba(255,95,176,0.06)', 80);
  const u = EZ.io(clamp(t / 0.8)), sw = Math.sin(u * Math.PI);
  for (let i = 0; i < 3; i++) { ctx.lineWidth = 6; ctx.strokeStyle = `rgba(255,120,200,${0.5 - i * 0.15})`; ctx.beginPath(); ctx.arc(540, 760, 200 + i * 60 + sw * 40, TT * 3 + i, TT * 3 + i + 4); ctx.stroke(); }
  const ax = lerp(300, 780, u), bx = lerp(780, 300, u);
  fnAt(ax, 760 - sw * 120, 1.7, () => fnRafaelHead(RR, { look: [u > 0.5 ? -1 : 1, 0], eyes: 'wide', mouth: 'o', key: 'sw1' }));
  fnAt(bx, 760 + sw * 120, 1.7, () => fnJuliaHead(RR, ju({ look: [u > 0.5 ? 1 : -1, 0], eyes: 'wide', mouth: 'o', lid: 0, key: 'sw2' })));
  fnGlow(540, 760, 300, '#ff9ad0', sw);
  fnBold('⇄', 540, 760, 120, '#ffffff', 'center', 10);
};
SCENE.pinkroom = () => {
  const t = LT(); fnJuliaRoom();
  // standing by the bed, stretching and yawning — no idea yet
  const st = springMove(ATS(0.1), 0, 1, SPRING.smooth);
  fnJulia(540, 1150, 1.45, ju({ look: [0, -0.6], eyes: 'closed', brow: 'up', mouth: t > 0.3 ? 'open' : 'flat', key: 'pr', aL: [lerp(0.12, -2.9, st), -0.1], aR: [lerp(-0.12, 2.9, st), 0.1], lean: -0.04 * st }));
  fnTag('QUARTO DA JÚLIA', 540, 400, ATS(0.3), FN.pink, 28);
};
SCENE.sleepface = () => {
  const t = LT(); fnJuliaRoom();
  // rubbing her eyes, still sleepy, full body
  const rub = Math.sin(TT * 10) * 0.15;
  fnJulia(540, 1150, 1.5, ju({ look: [0, 0], eyes: 'closed', brow: 'n', mouth: 'flat', key: 'sf', aR: [-0.5, -2.6 + rub], aL: [0.5, 2.6 - rub], tilt: 0.05 }));
  for (let i = 0; i < 3; i++) { const u = mod(TT * 0.6 + i / 3, 1); fnAlpha(1 - u, () => fnBold('z', 700 + u * 80 + i * 10, 500 - u * 160, 34 + i * 12, '#ffffff')); }
};
SCENE.wakeup = () => {
  const t = LT(); fnJuliaRoom();
  // the eyes open… something brushes the face: she freezes, full body
  const open = t > 0.25, freeze = springMove(ATS(0.7), 0, 1, SPRING.snappy);
  fnJulia(540, 1150, 1.5, ju({ look: [Math.sin(TT * 3) * 0.5, -0.2], eyes: open ? 'open' : 'closed', lid: open ? lerp(0.6, 0, clamp((t - 0.25) / 0.4)) : 0, brow: open ? 'worry' : 'n', mouth: 'flat', key: 'wu', aL: [lerp(0.12, -0.6, freeze), lerp(-0.04, 2.2, freeze)], aR: [-0.12, 0.04] }));
  if (t > 0.6) fnBold('?', 820, 420, 120, '#ffffff', 'center', 8);
};
SCENE.hairtouch = () => {
  const t = LT(); fnJuliaRoom();
  const lift = springMove(ATS(0.1), 0, 1, SPRING.smooth), tug = Math.sin(TT * 5) * 0.15 * clamp(t / 0.6);
  fnJulia(540, feetFor(700, 2.2), 2.2, ju({ look: [-0.7, -0.1], eyes: 'wide', lid: 0, brow: 'worry', mouth: 'o', key: 'ht', shadow: false,
    aL: [lerp(0.12, -2.4 + tug, lift), lerp(-0.04, -1.1, lift)], aR: [-0.12, 0.04] }));
  fnStroke([[380, 600], [330, 760 + Math.sin(TT * 4) * 10], [360, 900]], 14, JU.hairC);   // a lock of hair pulled out in front
};
SCENE.morehair = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#5a4a7a'); fnGlow(540, 700, 500, 'rgba(255,200,150,0.3)', 0.8);
  fnJulia(540, feetFor(700, 2.6), 2.6, ju({ look: [0, 0.2], eyes: 'wide', lid: 0, brow: 'worry', mouth: 'grit', key: 'mh', shadow: false, aL: [-2.0, -1.4], aR: [2.0, 1.4] }));
  const g = clamp(t / 0.9);
  for (let i = 0; i < 18; i++) { const a = -Math.PI + i / 17 * Math.PI, L = 160 + 260 * g; fnStroke([[540 + Math.cos(a) * 200, 640 + Math.sin(a) * 200], [540 + Math.cos(a) * L * 1.4 + Math.sin(TT * 3 + i) * 20, 640 + Math.sin(a) * L + 300 * g]], 22, JU.hairC); }
};
SCENE.hairmouth = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#4a3a6a');
  fnAt(540, 720, 4.2, () => fnJuliaHead(RR, ju({ look: [0, 0], eyes: 'squeeze', brow: 'angry', mouth: 'open', key: 'hm', blink: false })));
  const sp = clamp((t - 0.25) / 0.4);
  for (let i = 0; i < 5; i++) fnStroke([[500 + i * 20, 900], [440 + i * 40 - sp * 60, 1000 + sp * 120], [400 + i * 50 - sp * 120, 1100 + sp * 200]], 10, JU.hairC);
  if (sp > 0) for (let i = 0; i < 8; i++) fnCirc(540 + (i - 4) * 30 * sp * 4, 930 + sp * 200 + i * 4, 6, 'rgba(200,230,255,0.8)');
  fnTag('ECA!', 820, 480, ATS(0.3), FN.green, 44);
};
SCENE.scream = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#3a2a5a'); const [sx, sy] = fnShake(ATS(0.1), 14, 1.0, 'scr');
  fnAt(540 + sx, 720 + sy, 3.6, () => fnJuliaHead(RR, ju({ look: [0, 0], eyes: 'wide', lid: 0, brow: 'up', mouth: 'shout', key: 'sc', blink: false })));
  for (let i = 0; i < 4; i++) { ctx.lineWidth = 8; ctx.strokeStyle = `rgba(255,255,255,${0.5 - i * 0.1})`; ctx.beginPath(); ctx.arc(540, 900, 260 + i * 60 + mod(TT * 300, 60), -2.6, -0.5); ctx.stroke(); }
};
SCENE.voice = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#2a1a3a');
  fnAt(540, 640, 3.0, () => fnJuliaHead(RR, ju({ look: [0, 0.4], eyes: 'wide', lid: 0, brow: 'worry', mouth: 'o', key: 'vc', blink: false })));
  // the waveform is pink and high — not his
  const P = []; for (let i = 0; i <= 80; i++) { const x = 120 + i * 10.5; P.push([x, 1040 + Math.sin(i * 0.9 + TT * 18) * 60 * Math.sin(i / 80 * Math.PI) * (0.6 + 0.4 * Math.sin(TT * 7))]); } fnStroke(P, 8, FN.pink); fnGlow(540, 1040, 400, FN.pink, 0.35);
  fnMono('VOZ: AGUDA', 540, 1140, 26, '#ffb0d8');
};
SCENE.shock = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#1a1030'); fnGlow(540, 700, 600, 'rgba(120,80,255,0.4)', 0.8);
  const cover = springMove(ATS(0.05), 0, 1, SPRING.snappy);
  fnJulia(540, feetFor(680, 2.7), 2.7, ju({ look: [0, 0], eyes: 'wide', lid: 0, brow: 'up', mouth: 'o', key: 'sk', shadow: false, aR: [lerp(-0.12, -0.6, cover), lerp(0.04, -2.4, cover)], aL: [lerp(0.12, 0.6, cover), lerp(-0.04, 2.4, cover)] }));
};
SCENE.runmirror = () => {
  const t = LT(); fnSetLight(-0.5, 1, 0.5);
  fnRect(-300, -300, W + 600, H + 600, '#6a5a8a'); for (let i = 0; i < 6; i++) { const x = mod(i * 360 - TT * 700, 2160) - 500; fnRR(x, 360, 200, 300, 10, '#4a3a6a'); fnRR(x + 30, 400, 140, 220, 6, ['#ff9ac4', '#8ad0c0', '#ffd27a'][i % 3]); }
  fnRect(-300, 1100, W + 600, 900, '#7a5a4a'); for (let i = 0; i < 10; i++) fnRect(mod(i * 220 - TT * 1100, 2200) - 500, 1100, 6, 900, 'rgba(0,0,0,0.12)');
  const p = fnRunPose(TT * 2.6, 1.0);
  fnJulia(540, 1100, 1.4, ju({ ...p, look: [1, 0], eyes: 'wide', lid: 0, brow: 'worry', mouth: 'open', key: 'rm', lean: 0.2 }));
  for (let i = 0; i < 10; i++) { const y = 300 + i * 90, x = mod(i * 211 - TT * 1800, 1500) - 200; fnRect(x, y, 160, 3, 'rgba(255,255,255,0.15)'); }
};
function fnMirrorFrame(cx, cy, w, h) { fnRR(cx - w / 2 - 30, cy - h / 2 - 30, w + 60, h + 60, 40, '#e0c890'); fnRR(cx - w / 2, cy - h / 2, w, h, 24, '#bcd8ec'); }
SCENE.mirror = () => {
  const t = LT(); fnSetLight(0.4, 1, 0.4); fnRect(-300, -300, W + 600, H + 600, '#8ab0c0'); for (let y = -300; y < H + 300; y += 80) for (let x = -300; x < W + 300; x += 80) fnRect(x + 3, y + 3, 74, 74, 'rgba(255,255,255,0.08)');
  fnMirrorFrame(540, 700, 640, 840);
  ctx.save(); ctx.beginPath(); ctx.roundRect(220, 280, 640, 840, 24); ctx.clip(); fnRect(220, 280, 640, 840, '#a8c8dc');
  fnJulia(540, feetFor(640, 1.9), 1.9, ju({ look: [0, 0], eyes: 'wide', lid: 0, brow: 'worry', mouth: 'o', key: 'mr', shadow: false }));
  fnLine(300, 320, 420, 260, 30, 'rgba(255,255,255,0.35)'); fnLine(700, 1060, 820, 980, 20, 'rgba(255,255,255,0.25)'); ctx.restore();
  fnRect(-300, 1150, W + 600, 900, '#e8e8f0'); fnRR(240, 1150, 600, 60, 20, '#ffffff');
};
SCENE.mirrorface = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#8ab0c0'); fnMirrorFrame(540, 720, 860, 980);
  ctx.save(); ctx.beginPath(); ctx.roundRect(110, 230, 860, 980, 24); ctx.clip(); fnRect(110, 230, 860, 980, '#a8c8dc');
  fnAt(540, 720, 4.0, () => fnJuliaHead(RR, ju({ look: [0, 0], eyes: 'wide', lid: 0, brow: 'up', mouth: 'o', key: 'mf', blink: false }))); ctx.restore();
  const k = fnPop(ATS(0.3)); if (k > 0) { ctx.save(); ctx.translate(860, 380); ctx.scale(k, k); fnCirc(0, 0, 110, '#ffffff'); fnCirc(-90, 120, 22, '#ffffff'); fnCirc(-120, 160, 12, '#ffffff'); fnAt(0, 0, 0.85, () => fnRafaelHead(RR, { eyes: 'wide', mouth: 'o', brow: 'up', key: 'mfr' })); ctx.restore(); }
  fnTag('É ELA', 540, 1120, ATS(0.5), FN.pink, 36);
};
SCENE.panic = () => {
  const t = LT(); fnJuliaRoom(); fnWash('#300010', 0.2);
  const [sx] = fnShake(ATS(0.0), 10, 1.2, 'pn');
  fnJulia(540 + sx, feetFor(680, 2.3), 2.3, ju({ look: [Math.sin(TT * 9), 0], eyes: 'wide', lid: 0, brow: 'worry', mouth: 'grit', key: 'pn', shadow: false, aL: [-2.2, -1.5], aR: [2.2, 1.5], sweat: 1 }));
  fnTag('PÂNICO', 540, 380, ATS(0.2), FN.red, 40);
};
SCENE.needpee = () => {
  const t = LT(); fnJuliaRoom();
  const wob = Math.sin(TT * 14) * 0.08;
  fnJulia(500, 1150, 1.5, ju({ look: [0.6, 0.4], eyes: 'squint', brow: 'worry', mouth: 'grit', key: 'np', lL: [0.35 + wob, -0.2], lR: [-0.35 - wob, 0.2], aL: [0.6, 0.6], aR: [-0.6, -0.6], sweat: 1 }));
  const v = Math.min(99, Math.round(70 + t * 30)); fnRR(760, 520, 220, 70, 12, 'rgba(11,15,36,0.9)'); fnMono('BEXIGA ' + v + '%', 870, 556, 24, FN.yellow); fnRR(780, 600, 180, 24, 10, '#2a2f48'); fnRR(780, 600, 180 * v / 100, 24, 10, FN.yellow);
};
SCENE.bathdoor = () => {
  const t = LT(); fnSetLight(-0.4, 1, 0.5); fnRect(-300, -300, W + 600, H + 600, '#6a5a8a'); fnRect(-300, 1150, W + 600, 900, '#7a5a4a');
  const open = springMove(ATS(0.3), 0, 1, SPRING.smooth);
  fnRR(320, 360, 440, 790, 10, '#2a2238'); fnRect(320, 360, 440, 790, '#d8e8f0'); fnRR(540, 700, 200, 200, 100, 'rgba(255,255,255,0.4)');
  ctx.save(); ctx.translate(320, 360); ctx.scale(Math.cos(open * 1.3), 1); fnRR(0, 0, 440, 790, 10, '#f2e6d8'); fnRR(40, 40, 360, 300, 10, '#e8d8c8'); fnRR(40, 400, 360, 340, 10, '#e8d8c8'); fnCirc(390, 420, 18, '#c9a46a'); ctx.restore();
  fnRR(460, 300, 160, 50, 10, FN.pink); fnBold('WC', 540, 326, 34, '#ffffff');
  fnJulia(170, 1150, 1.2, ju({ look: [1, 0], eyes: 'wide', lid: 0, brow: 'worry', mouth: 'grit', key: 'bd', lL: [0.3, -0.2], lR: [-0.3, 0.2], sweat: 1 }));
};
function fnBathroom() { fnSetLight(0.3, 1, 0.45); fnRect(-300, -300, W + 600, H + 600, '#9ac0d0'); for (let y = -300; y < H + 300; y += 80) for (let x = -300; x < W + 300; x += 80) fnRect(x + 3, y + 3, 74, 74, 'rgba(255,255,255,0.12)'); fnRect(-300, 1150, W + 600, 900, '#e8e8f0'); for (let i = 0; i < 16; i++) fnRect(-300 + i * 90, 1150, 4, 900, 'rgba(0,0,0,0.06)'); }
function fnToilet(x, y, s, lid = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fnRR(-120, -420, 240, 220, 20, '#ffffff'); fnRR(-120, -420, 240, 30, 14, '#e0e4ec'); fnRR(-60, -200, 120, 200, 20, '#f2f4f8'); fnEll(0, -190, 170, 50, '#ffffff'); fnEll(0, -196, 130, 34, lid ? '#e8ecf2' : '#8ab8d8'); fnRR(80, -380, 40, 16, 6, '#c9ccd8'); ctx.restore(); }
SCENE.toilet = () => {
  const t = LT(); fnBathroom(); fnToilet(700, 1150, 1.4, 0);
  fnJulia(300, 1150, 1.45, ju({ look: [1, 0.6], eyes: 'wide', lid: 0, brow: 'worry', mouth: 'flat', key: 'tl', aL: [0.3, 0.3], aR: [-0.9, -1.6], tilt: Math.sin(TT * 2) * 0.08 }));
  for (let i = 0; i < 3; i++) { const k = fnPop(ATS(0.3 + i * 0.25)); if (k > 0) { ctx.save(); ctx.translate(380 + i * 110, 380 - i * 30); ctx.scale(k, k); ctx.rotate(Math.sin(TT * 3 + i) * 0.2); fnBold('?', 0, 0, 90, '#2a2238', 'center', 0); ctx.restore(); } }
};
SCENE.sit = () => {
  const t = LT(); fnBathroom(); fnToilet(540, 1150, 1.5, 0);
  const sit = springMove(ATS(0.1), 0, 1, SPRING.heavy);
  fnJulia(540, 1150 - sit * 230, 1.45, ju({ look: [0, 0.3], eyes: 'squint', brow: 'worry', mouth: 'flat', key: 'st', shadow: false, lL: [lerp(0, -1.4, sit), lerp(0, 1.4, sit)], lR: [lerp(0, -1.4, sit), lerp(0, 1.4, sit)], aL: [0.3, 0.6], aR: [-0.3, -0.6] }));
  fnRR(380, 1100, 320, 50, 10, '#2a2238'); fnMono('ROTEIRO: NOVO', 540, 1126, 18, '#ffffff');
};
SCENE.firsttime = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#9ac0d0'); fnGlow(540, 640, 600, 'rgba(255,255,255,0.4)', 0.8);
  const relief = clamp(t / 1.0);
  fnAt(540, 700, 3.4, () => fnJuliaHead(RR, ju({ look: [0, -0.4], eyes: relief > 0.6 ? 'closed' : 'squint', brow: relief > 0.6 ? 'up' : 'worry', mouth: relief > 0.6 ? 'smile' : 'flat', key: 'ft', blink: false })));
  for (let i = 0; i < 6; i++) { const u = mod(TT * 0.7 + i / 6, 1); fnAlpha((1 - u) * relief, () => fnBold('✦', 200 + i * 130, 1000 - u * 600, 36, '#ffffff')); }
};
SCENE.achievement = () => {
  const t = LT(); fnSky('#141a4a', '#06081a'); fnGridBG('rgba(255,210,63,0.06)', 80);
  for (let i = 0; i < 12; i++) { ctx.save(); ctx.translate(540, 760); ctx.rotate(i / 12 * TAU + TT * 0.6); fnPoly([[0, 0], [1400, -70], [1400, 70]], 'rgba(255,210,63,0.08)'); ctx.restore(); }
  const k = fnPop(ATS(0.05), 0.3); ctx.save(); ctx.translate(540, 760); ctx.scale(k, k);
  fnRR(-400, -140, 800, 280, 30, 'rgba(11,15,36,0.95)'); ctx.lineWidth = 6; ctx.strokeStyle = FN.yellow; ctx.beginPath(); ctx.roundRect(-400, -140, 800, 280, 30); ctx.stroke();
  fnCirc(-270, 0, 90, FN.yellow); fnBold('🏆', -270, 6, 90, '#7a4a00'); fnMono('CONQUISTA DESBLOQUEADA', 90, -60, 26, '#ffe9a0'); fnBold('XIXI SENTADO', 90, 10, 64, '#ffffff'); fnMono('+100 XP', 90, 80, 26, FN.green);
  ctx.restore();
  if (t > 0.2) for (let i = 0; i < 24; i++) { const R = RNG('cf2', i), u = clamp((t - 0.2) / 1.2); ctx.save(); ctx.translate(540 + Math.cos(R.f() * TAU) * 600 * u, 760 + Math.sin(R.f() * TAU) * 600 * u + 300 * u * u); ctx.rotate(u * 10 + i); fnRect(-10, -5, 20, 10, ['#ffd23f', '#33d16a', '#4aa8ff', '#ff5fb0'][i % 4]); ctx.restore(); }
};
SCENE.think = () => {
  const t = LT(); fnBathroom();
  fnJulia(320, 1150, 1.4, ju({ look: [0.6, -0.8], eyes: 'open', lid: 0.2, brow: 'up', mouth: 'flat', key: 'tk', aR: [-0.3, -2.6], aL: [0.2, 0.1] }));
  const k = fnPop(ATS(0.15)); if (k > 0) { ctx.save(); ctx.translate(680, 520); ctx.scale(k, k); fnEll(0, 0, 300, 190, '#ffffff'); fnCirc(-240, 210, 34, '#ffffff'); fnCirc(-290, 280, 18, '#ffffff');
    fnBold('POR QUE', 0, -70, 54, FN.navy0); fnBold('NINGUÉM', 0, -10, 54, FN.navy0); fnBold('ME CONTOU?', 0, 50, 54, FN.navy0); ctx.restore(); }
};
SCENE.comfort = () => {
  const t = LT(); fnSky('#ffb86a', '#ff7a9a', -300, 2000); for (let i = 0; i < 12; i++) { ctx.save(); ctx.translate(540, 700); ctx.rotate(i / 12 * TAU + TT * 0.3); fnPoly([[0, 0], [1400, -110], [1400, 110]], 'rgba(255,255,255,0.12)'); ctx.restore(); }
  fnAt(540, 720, 3.4, () => fnJuliaHead(RR, ju({ look: [0, -0.3], eyes: 'closed', brow: 'up', mouth: 'smile', key: 'cm', blink: false })));
  const k = fnPop(ATS(0.4)); if (k > 0) { ctx.save(); ctx.translate(540, 1120); ctx.scale(k, k); fnRR(-280, -50, 560, 100, 50, FN.green); fnBold('MUITO CONFORTÁVEL', 0, 3, 46, '#ffffff'); ctx.restore(); }
  for (let i = 0; i < 5; i++) fnBold('★', 300 + i * 120, 380 + Math.sin(TT * 4 + i) * 16, 56, FN.yellow, 'center', 6);
};
