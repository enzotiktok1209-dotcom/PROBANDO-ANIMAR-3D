// =====================================================================
//  SCENES 3 — escondido + fuga (34.32 – 58.93s)
// =====================================================================
// the container aisle: stacks left and right, a wet floor running back to the port lights
function fnAisle(o = {}) {
  fnSky('#0e1446', '#05070f'); fnGlow(540, 640, 300, 'rgba(255,220,150,0.35)', 0.8);
  fnPoly([[330, 1250], [750, 1250], [600, 700], [480, 700]], '#161a30');
  for (let i = 0; i < 8; i++) { const u = i / 8, y = lerp(700, 1250, u * u); fnRect(lerp(480, 330, u * u), y, lerp(120, 420, u * u), 2, 'rgba(255,255,255,0.05)'); }
  fnRect(-300, 1250, W + 600, 900, '#121528');
  const L = ['#c0392b', '#2a57c9', '#1f8a4e', '#7a3bb0'], Rc = ['#2a57c9', '#7a3bb0', '#c0392b', '#d98b1a'];
  [0, 1, 2].forEach((j) => { fnContainer(-120, 1250 - (j + 1) * 300, 450, 296, L[(j + (o.seed || 0)) % 4], j === 0 ? 'HLXU 2290' : 'MSCU 4471', { sticker: j === 0 ? 'FRÁGIL' : null }); fnContainer(750, 1250 - (j + 1) * 300, 450, 296, Rc[(j + (o.seed || 0)) % 4], j === 1 ? 'HLXU 2291' : 'CMAU 8812'); });
  fnWetGround(1250, '#121528', [[540, '#ffd27a', 0.18]]);
  fnParticles('adrz', 50, 'rgba(180,200,255,0.25)', { speed: 900, streak: 22, size: 1.3 });
}
SCENE.jump = () => {
  const t = LT(); fnPierBG({ horizon: 820 });
  fnBoat(120, 1000, 1.1, {});
  for (let i = 0; i < 4; i++) {
    const t0 = i * 0.18, u = clamp((t - t0) / 0.6), land = t - t0 - 0.6;
    const x = lerp(220 + i * 40, 520 + i * 150, u), y = lerp(860, 1180, u) - Math.sin(u * Math.PI) * 220;
    const sq = land > 0 && land < 0.25 ? Math.sin(land / 0.25 * Math.PI) * 0.12 : 0;
    const air = u > 0 && u < 1;
    fnWoman(x, y, 0.9, { outfit: 'vest', hair: i % 2 ? 'bun' : null, hairC: ['#3a2418', '#6b3e1f', '#d9b24a', '#2a1a12'][i], look: [0.6, 0.3], lid: 0.4, brow: 'angry', mouth: 'grit', key: 'j' + i, lean: air ? 0.25 : 0.1, lL: air ? [0.7, -1.2] : [0.35, -0.5], lR: air ? [-0.3, 0.9] : [-0.35, 0.5], aL: [-1.2, -0.6], aR: [1.6, 0.4], bob: sq * 60,
      hold: (h) => { if (land > 0.1) fnFlashlight(h, -1.4, clamp((land - 0.1) / 0.1)); } });
  }
};
SCENE.sky = () => {
  const t = LT(); fnSky('#18205a', '#070a1c'); fnStars(80, 'sky');
  // Corcovado + the Cristo, lit
  fnPoly([[-300, 1500], [200, 1100], [430, 900], [540, 860], [650, 900], [900, 1120], [1380, 1500]], '#121a44'); fnGlow(540, 640, 300, 'rgba(255,240,210,0.35)', 0.8);
  ctx.save(); ctx.translate(540, 860); fnRR(-22, -190, 44, 190, 10, '#e6e2d6'); fnRR(-150, -170, 300, 30, 12, '#e6e2d6'); fnCirc(0, -210, 24, '#e6e2d6'); fnRR(-40, -60, 80, 60, 6, '#d6d2c6'); ctx.restore();
  [[200, 400], [860, 380], [500, 280]].forEach(([x, y], i) => fnAlpha(0.35, () => fnRR(x - 200 + Math.sin(TT * 0.4 + i) * 40, y, 400, 70, 35, '#3a4480')));
  const P = [[-200, 300, 270, 480], [1300, 320, 820, 500], [540, -200, 540, 360]];
  P.forEach(([x0, y0, x1, y1], i) => { const u = springMove(ATS(0.05 + i * 0.15), 0, 1, SPRING.smooth), x = lerp(x0, x1, u), y = lerp(y0, y1, u) + Math.sin(TT * 3 + i) * 8;
    fnDrone(x, y, 0.85, { tilt: (1 - u) * 0.4 * (x1 > x0 ? 1 : -1) }); if (u > 0.8) fnMono('DRONE 0' + (i + 1), x, y - 70, 20, '#ff9aa4'); });
  const hu = springMove(ATS(1.0), 0, 1, SPRING.heavy);
  if (hu > 0.01) { const hx = lerp(1300, 760, hu), hy = 700;
    fnCone(hx, hy + 30, 0.5 + Math.sin(TT * 2) * 0.35, 1300, 240, 'rgba(255,255,240,0.9)', 0.25, 20);
    ctx.save(); ctx.translate(hx, hy); ctx.rotate(-0.08); fnRR(-120, -50, 240, 100, 50, '#1d2448'); fnRR(80, -20, 200, 24, 12, '#1d2448'); fnRR(-60, -40, 90, 50, 20, '#5a7ad0');
    fnEll(0, -64, 260 * Math.abs(Math.cos(TT * 40)), 8, 'rgba(200,210,230,0.5)'); fnRect(-4, -64, 8, 16, '#1d2448'); fnMono('POLÍCIA', 20, 20, 22, '#ffffff'); ctx.restore();
    fnCirc(hx - 110, hy, 8, mod(TT, 0.8) < 0.4 ? FN.red : '#5a1a22'); }
};
SCENE.containers = () => {
  const t = LT(); fnAisle({ seed: 0 });
  const u = EZ.io(clamp(t / 0.85)), x = lerp(560, 430, u), y = lerp(900, 1240, u), s = lerp(0.6, 1.45, u), hit = t > 0.85;
  const pose = hit ? { lean: -0.05, aL: [0.4, -0.3], aR: [-0.2, 0.1] } : fnRunPose(TT * 2.2, 1);
  fnRafael(x, y, s, { ...pose, face: -1, side: 0.4, look: [-0.6, 0], brow: 'worry', mouth: hit ? 'grit' : 'pant', sweat: 0.8, key: 'ct', eyes: hit ? 'squeeze' : 'open' });
  if (hit) { const k = clamp((t - 0.85) / 0.3); for (let i = 0; i < 10; i++) { const a = -Math.PI * (0.2 + 0.6 * i / 9); fnCirc(330 + Math.cos(a) * 120 * k, 900 + Math.sin(a) * 120 * k + 100 * k * k, 5 * (1 - k), '#ff9a3a'); } }
};
SCENE.hoodup = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#0b0f24'); fnContainer(-200, 120, 1480, 1200, '#b03526', 'HLXU 2290', { sticker: 'FRÁGIL' }); fnRect(-300, 1320, W + 600, 700, '#121528');
  fnGlow(900, 300, 500, 'rgba(255,220,150,0.25)', 0.6);
  const up = springMove(ATS(0.15), 0, 1, SPRING.snappy), down = springMove(ATS(0.6), 0, 1, SPRING.smooth), arm = up * (1 - down);
  fnRafael(540, feetFor(680, 2.1), 2.1, { hood: t > 0.45, look: [-0.7, 0], brow: 'worry', mouth: 'grit', sweat: 1, key: 'hu', aL: [lerp(0.12, -2.6, arm), lerp(-0.04, 0.9, arm)], aR: [lerp(-0.12, 2.6, arm), lerp(0.04, -0.9, arm)], shadow: false, breath: 0.5 });
};
SCENE.breath = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#0b0f24'); fnContainer(-200, -100, 1480, 1700, '#9a2e22', null);
  fnGlow(200, 300, 500, 'rgba(120,150,255,0.25)', 0.6);
  const cover = springMove(ATS(0.05), 0, 1, SPRING.snappy), tr = Math.sin(TT * 40) * 0.015;
  fnRafael(540, feetFor(700, 3.2), 3.2, { hood: true, eyes: 'squeeze', brow: 'worry', mouth: 'puff', sweat: 1, key: 'br', shadow: false, tilt: tr, aR: [lerp(-0.12, -0.5, cover), lerp(0.04, -2.55, cover)], aL: [0.12, -0.04] });
  const sec = t < 0.55 ? '00:01' : '00:02';
  fnTag('PRENDENDO A RESPIRAÇÃO ' + sec, 540, 330, ATS(0.08), mod(TT, 0.5) < 0.25 ? FN.red : '#a01c2a', 26);
};
SCENE.beam = () => {
  const t = LT(); fnAisle({ seed: 2 });
  const ang = lerp(1.1, -0.2, EZ.io(clamp(t / 0.7)));
  fnCone(-60, 760, -Math.PI / 2 + ang * 0.5 - 0.2, 1300, 300, 'rgba(255,248,210,0.95)', 0.45, 40);
  fnGlow(-40, 760, 160, '#fffbe0', 1);
};
SCENE.boots = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#0b0f24'); fnRect(-300, 900, W + 600, 1100, '#121528');
  fnEll(540, 1060, 380, 90, '#0d1440'); fnGlow(200, 800, 400, 'rgba(255,248,210,0.25)', 0.8);
  [[0, 380], [0.32, 700]].forEach(([d, x], i) => { const u = clamp((t - d) / 0.25); if (t < d - 0.3) return; const y = lerp(820, 1040, EZ.i2(u));
    ctx.save(); ctx.translate(x, y); fnRR(-60, -600, 120, 560, 30, '#3a4170'); fnRR(-80, -90, 230, 110, 26, '#2a2c38'); fnRR(-80, 10, 240, 24, 8, '#5a5c68'); fnRR(-60, -380, 120, 40, 6, '#262b47'); ctx.restore();
    if (u >= 1) { const k = clamp((t - d - 0.25) / 0.35); for (let j = 0; j < 9; j++) { const a = -Math.PI * (0.1 + 0.8 * j / 8); fnCirc(x + 30 + Math.cos(a) * 180 * k, 1050 + Math.sin(a) * 200 * k + 220 * k * k, 7 * (1 - k), '#9fb8ff'); } } });
};
SCENE.closer = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#0b0f24'); fnContainer(-200, 100, 1480, 1300, '#2a57c9', 'CMAU 8812');
  const u = clamp(t / 1.5);
  // the policewoman's shadow grows on the container, the light creeps in from the left
  fnAlpha(0.55, () => { ctx.save(); ctx.translate(lerp(-300, 120, u), 1250); ctx.scale(lerp(1.4, 2.4, u), lerp(1.4, 2.4, u)); fnEll(0, -380, 50, 52, '#000'); fnRR(-60, -320, 120, 220, 40, '#000'); fnRR(-40, -100, 80, 100, 10, '#000'); ctx.restore(); });
  fnCone(-200, 800, -Math.PI / 2 + 0.05, lerp(500, 900, u), 260, 'rgba(255,248,210,0.9)', 0.35, 20);
  fnRafael(680, feetFor(700, 2.2), 2.2, { hood: true, look: [-1, 0], brow: 'worry', mouth: 'flat', sweat: 1, eyes: 'wide', key: 'cl', shadow: false, aL: [0.3, -0.2], aR: [-0.2, 0.1] });
};
SCENE.drone = () => {
  const t = LT(); fnAisle({ seed: 1 });
  const y = springMove(ATS(0), 200, 560, { k: 220, d: 14 }), tilt = Math.sin((TT - E0) * 9) * 0.12 * Math.exp(-(TT - E0) * 3);
  fnCone(540, y + 40, 0, 900, 260, 'rgba(255,40,60,0.9)', 0.35, 10);
  fnDrone(540, y, 1.4, { tilt });
  fnEll(540, 1180, 260, 50, 'rgba(255,40,60,0.35)');
};
SCENE.lookup = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#121528'); for (let i = 0; i < 12; i++) fnRect(-300 + i * 120, -300, 4, H + 600, 'rgba(255,255,255,0.04)');
  const k = clamp(t / 1.1);
  fnCirc(540, 800, 420, 'rgba(255,40,60,0.22)'); fnGlow(540, 800, 500, FN.red, 0.4);
  fnRafael(540, 1120, 1.5, { hood: true, look: [0, -1], eyes: 'wide', brow: 'worry', mouth: 'o', tilt: 0.0, key: 'lu', aL: [0.5, -0.4], aR: [-0.5, 0.4] });
  const rr = lerp(520, 220, EZ.o3(k)); ctx.save(); ctx.translate(540, 700); ctx.rotate(k * 1.2); ctx.lineWidth = 6; ctx.strokeStyle = FN.red; ctx.beginPath(); ctx.arc(0, 0, rr, 0, TAU); ctx.stroke();
  for (let i = 0; i < 4; i++) { ctx.rotate(Math.PI / 2); fnLine(rr - 40, 0, rr + 40, 0, 6, FN.red); } ctx.restore();
};
SCENE.thermal = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#1a0a3a'); for (let i = 0; i < 40; i++) fnRect(-300, -300 + i * 70, W + 600, 2, 'rgba(255,255,255,0.05)');
  [[-100, 300, 400, 900], [780, 300, 400, 900]].forEach(([x, y, w, h]) => fnRect(x, y, w, h, '#2a1060'));
  ctx.save(); ctx.filter = 'blur(6px)'; const g = fnLinGrad(0, 520, 0, 1150, [[0, '#ffff80'], [0.4, '#ff9a20'], [1, '#d02060']]);
  ctx.translate(540, 1150); ctx.scale(1.5, 1.5); ctx.fillStyle = g;
  ctx.beginPath(); ctx.ellipse(0, -340, 58, 62, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.roundRect(-60, -280, 120, 180, 30); ctx.fill(); ctx.fillRect(-40, -110, 30, 110); ctx.fillRect(10, -110, 30, 110); ctx.restore();
  ctx.filter = 'none';
  fnBrackets(330, 520, 420, 660, '#ffffff', 50, 4); fnMono('22°53\'48"S  43°11\'02"W', 540, 1220, 24, '#ffffff');
  if (mod(TT, 0.4) < 0.28) fnTag('ALVO LOCALIZADO', 540, 380, ATS(0.02), FN.red, 44);
  fnMono('DRONE 02 · TÉRMICA', 540, 160, 24, '#ff9ac4'); fnMono('● REC', 120, 230, 24, FN.red, 'left');
};
SCENE.run = () => {
  const t = LT(); fnSky('#0e1446', '#05070f'); fnGlow(900, 500, 400, 'rgba(255,220,150,0.25)', 0.6);
  const sp = TT * 900;
  for (let i = 0; i < 6; i++) { const x = mod(i * 420 - sp * 0.4, 2520) - 600; fnContainer(x, 450, 410, 300, ['#2a57c9', '#c0392b', '#1f8a4e'][i % 3], null); fnContainer(x + 30, 750, 410, 300, ['#7a3bb0', '#d98b1a', '#2a57c9'][i % 3], null); }
  fnRect(-300, 1050, W + 600, 900, '#121528');
  for (let i = 0; i < 8; i++) { const x = mod(i * 300 - sp, 2400) - 600; fnEll(x, 1120 + (i % 3) * 30, 90, 14, 'rgba(120,150,255,0.25)'); }
  const ph = TT * 2.6, p = fnRunPose(ph, 1.1);
  fnRafael(540, 1060, 1.35, { ...p, side: 0.7, face: 1, hood: true, look: [1, 0], brow: 'worry', mouth: 'pant', sweat: 1, key: 'rn' });
  if (mod(ph, 0.5) < 0.12) for (let j = 0; j < 6; j++) fnCirc(500 - j * 18, 1050 - j * 9, 6, '#9fb8ff');
  for (let i = 0; i < 12; i++) { const y = 300 + i * 90, x = mod(i * 211 - sp * 1.6, 1500) - 200; fnRect(x, y, 160, 3, 'rgba(255,255,255,0.12)'); }   // speed lines
};
SCENE.wall = () => {
  const t = LT(); fnSky('#121848', '#06081a'); fnCity(860, { seed: 3 });
  fnRect(-300, 860, W + 600, 1100, '#121528');
  fnRect(120, 700, 840, 380, '#6a6e80'); for (let i = 0; i < 6; i++) fnRect(120, 760 + i * 60, 840, 3, 'rgba(0,0,0,0.15)');
  ctx.save(); ctx.translate(540, 900); ctx.rotate(-0.04); fnBold('PORTO', -120, -40, 90, '#ff5fb0'); fnBold('MARAVILHA', 60, 50, 80, '#33d16a'); ctx.restore();
  for (let i = 0; i < 12; i++) { const x = 140 + i * 72; fnStroke([[x, 700], [x + 36, 660], [x + 72, 700]], 3, '#9aa0b0'); }
  const u = clamp((t - 0.1) / 0.75), x = lerp(180, 900, u), y = 1180 - Math.sin(u * Math.PI) * 600, over = u > 0 && u < 1;
  const land = t - 0.85;
  fnRafael(x, y, 1.15, { ...(over ? { lean: 0.9 * Math.sin(u * Math.PI), lL: [0.9, -1.4], lR: [0.6, -1.2], aL: [-2.4, 0.3], aR: [2.0, -0.3] } : fnRunPose(TT * 2.6, 1)), side: 0.7, hood: true, look: [1, 0.3], brow: 'worry', mouth: 'grit', key: 'wl', squash: land > 0 && land < 0.2 ? Math.sin(land / 0.2 * Math.PI) * 0.12 : 0 });
  if (land > 0) { const k = clamp(land / 0.4); for (let i = 0; i < 10; i++) fnCirc(900 + (i - 5) * 26 * k * 2, 1180 - Math.sin(i) * 40 * k, 8 * (1 - k), 'rgba(200,200,220,0.6)'); }
};
SCENE.vlt = () => {
  const t = LT(); fnSky('#121848', '#06081a');
  // the big colourful mural of faces (abstract)
  fnRect(-300, 260, W + 600, 820, '#20264e');
  const mc = ['#ff5fb0', '#ffd23f', '#33d16a', '#4aa8ff', '#ff7a3a', '#a47ef0'];
  for (let i = 0; i < 5; i++) { const x = 60 + i * 230; for (let k = 0; k < 6; k++) fnPoly([[x - 100 + k * 30, 300], [x + 20 + k * 30, 300], [x - 20 + k * 30, 1060], [x - 140 + k * 30, 1060]], mc[(i + k) % 6]);
    fnEll(x, 620, 80, 110, 'rgba(255,230,200,0.85)'); fnCirc(x - 30, 600, 12, '#1a1412'); fnCirc(x + 30, 600, 12, '#1a1412'); fnLine(x - 20, 680, x + 20, 680, 6, '#1a1412'); }
  fnRect(-300, 1080, W + 600, 900, '#1c2035'); [1150, 1210].forEach((y) => { fnRect(-300, y, W + 600, 8, '#8a90a8'); }); fnLine(-300, 240, W + 300, 240, 3, '#5a6080');
  const tu = clamp((t - 0.35) / 0.9), tx = lerp(1700, -1900, tu);
  if (tu > 0 && tu < 1) { fnRR(tx, 760, 1600, 400, 40, '#eef0f6'); for (let i = 0; i < 9; i++) fnRR(tx + 60 + i * 170, 820, 130, 150, 14, '#24305a'); fnRect(tx, 1010, 1600, 30, '#1fae4b'); fnMono('VLT CARIOCA', tx + 800, 1080, 34, '#1d2a6a'); fnLine(tx + 800, 760, tx + 760, 240, 5, '#3a3d48'); if (mod(TT, 0.2) < 0.08) fnGlow(tx + 760, 240, 60, '#bfe0ff', 1); }
  const u = clamp(t / 1.7), x = lerp(-80, 1150, u);
  fnRafael(x, 1240, 1.25, { ...fnRunPose(TT * 2.6, 1), side: 0.7, hood: true, look: [t > 0.5 && t < 1.0 ? -1 : 1, 0], brow: 'worry', mouth: t > 0.5 && t < 1.0 ? 'o' : 'pant', key: 'vl' });
  fnRR(820, 300, 220, 90, 10, '#1fae4b'); fnMono('PARADA', 930, 330, 22, '#ffffff'); fnMono('UTOPIA AQWA', 930, 362, 18, '#ffffff');
};
SCENE.stairs = () => {
  const t = LT(); fnSky('#121848', '#06081a');
  const hc = ['#e85a7a', '#4aa8ff', '#ffd23f', '#7ad866', '#ff9a3a', '#a47ef0'];
  for (let i = 0; i < 7; i++) { const x = -100 + i * 190, y = 1400 - i * 170; fnRect(x, y - 360, 200, 380, hc[i % 6]); fnRect(x + 30, y - 300, 50, 60, 'rgba(10,14,40,0.7)'); fnRect(x + 120, y - 300, 50, 60, mod(i, 3) ? 'rgba(245,199,90,0.85)' : 'rgba(10,14,40,0.7)'); fnRect(x - 10, y - 380, 220, 24, '#8a5a3a'); }
  ctx.save(); fnPath([[-300, 1700], [-300, 1500], [1380, 200], [1380, 400]]); ctx.fillStyle = '#6a6e80'; ctx.fill(); ctx.restore();
  for (let i = 0; i < 30; i++) { const x = -300 + i * 60, y = 1500 - i * 46.6; fnRect(x, y, 60, 10, '#8a8fa0'); }
  fnLine(-300, 1380, 1380, 80, 6, '#c9ccd8');
  [[0, 300, 1080, 180], [-100, 500, 1180, 420]].forEach(([x0, y0, x1, y1]) => fnStroke([[x0, y0], [(x0 + x1) / 2, (y0 + y1) / 2 + 60], [x1, y1]], 3, '#14161f'));
  fnClothes(80, 520, 600, 6, 'st'); fnFlags(500, 420, 1180, 360, 40, 10);
  const u = clamp(t / 1.5), x = lerp(300, 720, u), y = lerp(1220, 900, u);
  fnRafael(x, y, 1.15, { ...fnRunPose(TT * 1.8, 0.8), lean: 0.35, side: 0.6, hood: true, look: [0.8, -0.5], brow: 'worry', mouth: 'pant', sweat: 1, key: 'sr' });
  const cu = clamp((t - 0.6) / 0.5); ctx.save(); ctx.translate(lerp(900, 700, cu), 640 - Math.sin(cu * Math.PI) * 160); fnEll(0, 0, 40, 22, '#2a2a30'); fnCirc(34, -14, 16, '#2a2a30'); fnPoly([[26, -26], [32, -40], [40, -26]], '#2a2a30'); fnStroke([[-40, 0], [-70, -30 + Math.sin(TT * 10) * 8]], 6, '#2a2a30'); fnCirc(40, -16, 3, '#ffd23f'); ctx.restore();
};
function fnAlleyBG(seed) {
  fnSky('#0e1446', '#05070f'); fnGlow(540, 500, 300, 'rgba(255,200,120,0.4)', 0.8);
  fnBrick(-300, -300, 520, H + 600, '#8a4a30'); fnBrick(860, -300, 520, H + 600, '#7a4030', { plaster: true });
  fnRect(220, 300, 640, 960, '#141a34'); fnBrick(220, 600, 640, 660, '#6a3a28');
  fnRect(-300, 1250, W + 600, 900, '#121528'); fnLine(-100, 300, 1180, 380, 3, '#14161f'); fnLine(-100, 340, 1180, 300, 3, '#14161f');
  fnRR(460, 330, 30, 40, 6, '#2a2228'); fnGlow(475, 380, 200, 'rgba(255,200,120,0.6)', 0.8);
  fnAt(980, 520, 1, () => { fnRect(-60, -40, 120, 80, '#d8d8d8'); fnEll(0, 0, 60, 60, '#c0c0c8'); });   // a satellite dish
}
SCENE.alley1 = () => {
  const t = LT(); fnAlleyBG(1);
  const u = clamp(t / 0.55), x = lerp(200, 640, EZ.o2(u));
  fnRafael(x, 1250, 1.45, { ...fnRunPose(TT * 2.6, 1), lean: lerp(0.3, -0.35, u), side: 0.7, hood: true, look: [1, 0], brow: 'worry', mouth: 'grit', key: 'a1' });
  for (let i = 0; i < 8; i++) fnCirc(x - 40 - i * 20, 1250 - i * 4, 8 - i, 'rgba(200,200,220,0.4)');
};
SCENE.dog = () => {
  const t = LT(); fnAlleyBG(2);
  fnRect(300, 640, 480, 600, '#5a6070'); for (let i = 0; i < 8; i++) fnRect(300 + i * 60, 640, 6, 600, '#4a4f5c');
  fnRR(360, 700, 360, 90, 8, '#f3efe2'); fnBold('CUIDADO', 540, 730, 40, '#c0302a'); fnBold('CÃO BRAVO', 540, 768, 32, '#1a1a1a');
  const j = springMove(ATS(0.05), 0, 1, { k: 300, d: 16 }), bark = Math.abs(Math.sin(TT * 16));
  fnDog(lerp(560, 600, j), lerp(1100, 1180, j), lerp(0.9, 1.6, j), { bark, face: -1 });
  const jump = springMove(ATS(0.15), 0, 1, SPRING.playful);
  fnRafael(lerp(330, 270, jump), 1250 - Math.sin(clamp((t - 0.15) / 0.4) * Math.PI) * 120, 1.2, { lean: -0.3 * jump, eyes: 'wide', brow: 'up', mouth: 'open', hood: true, look: [1, 0], aL: [-2.0, -0.4], aR: [2.4, 0.3], key: 'dg', side: 0.4 });
};
SCENE.alley2 = () => {
  const t = LT(); fnAlleyBG(3);
  const u = clamp(t / 0.8), x = lerp(120, 900, u);
  fnRafael(x, 1250, 1.35, { ...fnRunPose(TT * 2.8, 1.1), side: 0.7, hood: true, look: [1, 0], brow: 'worry', mouth: 'pant', key: 'a2' });
  const fu = clamp((t - 0.25) / 0.4), roll = clamp((t - 0.5) / 0.4);
  ctx.save(); ctx.translate(760 + roll * -250, 1180 + fu * 40); ctx.rotate(fu * Math.PI / 2 + roll * 4); fnRR(-60, -120, 120, 170, 10, '#3a7a4a'); fnRR(-70, -132, 140, 22, 6, '#2a5a3a'); ctx.restore();
  if (fu >= 1) for (let i = 0; i < 6; i++) fnRR(760 - i * 50 - roll * 120, 1225, 40, 18, 4, ['#e8e8e8', '#c0302a', '#ffd23f'][i % 3]);
};
SCENE.lungs = () => {
  const t = LT(); fnAlleyBG(4); fnWash('#000020', 0.25);
  const br = Math.sin(TT * TAU / 0.5);
  fnRafael(540, feetFor(720, 2.2) + 120, 2.2, { lean: 0.42, aL: [-0.15, 0.15], aR: [0.15, -0.15], lL: [0.25, -0.3], lR: [-0.25, 0.3], hood: true, eyes: 'squint', brow: 'sad', mouth: 'pant', breath: 0.5, sweat: 1, key: 'lg', bob: br * 6, shadow: false });
  ctx.save(); ctx.globalAlpha = 0.85; fnRR(700, 330, 300, 150, 12, 'rgba(11,15,36,0.85)'); fnMono('PULSO 182', 850, 360, 26, FN.red);
  const P = []; for (let i = 0; i <= 60; i++) { const x = 720 + i * 4.3, ph = mod(i / 60 * 3 + TT * 3, 1); P.push([x, 430 - (ph > 0.45 && ph < 0.5 ? 50 : ph > 0.5 && ph < 0.55 ? -30 : 0)]); } fnStroke(P, 4, FN.red); ctx.restore();
};
SCENE.map = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#0a1030');
  for (let i = 0; i < 14; i++) { fnRect(-300 + i * 110 + (i % 3) * 20, -300, 18 + (i % 2) * 12, H + 600, '#1a2458'); fnRect(-300, -300 + i * 170, W + 600, 16, '#1a2458'); }
  fnRing(540, 760, 260, 'rgba(110,170,255,0.4)');
  const exits = [[540, 260], [1050, 760], [40, 900]];
  exits.forEach(([x, y], i) => { const closed = t > 0.45 + i * 0.35; fnStroke([[540, 760], [x, y]], 14, closed ? 'rgba(255,40,60,0.8)' : 'rgba(80,220,120,0.7)'); if (closed) fnBold('✕', x, y, 70, FN.red); });
  for (let i = 0; i < 7; i++) { const a = i / 7 * TAU + 0.3, r0 = 620, r1 = lerp(620, 280, EZ.io(clamp(t / 1.6))), x = 540 + Math.cos(a) * r1, y = 760 + Math.sin(a) * r1 * 1.1; const sr = fnSiren(TT + i * 0.2, 2.5);
    for (let k = 1; k < 5; k++) fnCirc(540 + Math.cos(a) * (r1 + k * 30), 760 + Math.sin(a) * (r1 + k * 30) * 1.1, 10 - k * 2, 'rgba(255,255,255,0.15)');
    fnCirc(x, y, 18, sr.red > sr.blue ? FN.red : FN.blue); fnGlow(x, y, 70, sr.red > sr.blue ? FN.red : FN.blue, 0.8); }
  fnCirc(540, 760, 22, FN.yellow); fnGlow(540, 760, 90, FN.yellow, 0.8 + 0.2 * Math.sin(TT * 10));
  const n = t < 0.45 ? 3 : t < 0.8 ? 2 : t < 1.15 ? 1 : 0;
  fnTag('ROTAS DE FUGA: ' + n, 540, 400, ATS(0.05), n ? FN.blue : FN.red, 30); fnTag('VIATURAS: 7', 540, 1110, ATS(0.2), FN.red, 26);
};
