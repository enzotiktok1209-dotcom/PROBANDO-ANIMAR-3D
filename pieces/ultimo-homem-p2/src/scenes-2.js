// =====================================================================
//  SCENES 2 — o giro (13.27 – 34.32s): the boat, the eleven, the trap
// =====================================================================
function fnPierBG(o = {}) {
  fnSky('#10164a', '#05070f'); fnStars(50, 'pier');
  fnPortSkyline(o.horizon ?? 860, { mx: o.mx ?? 760 });
  fnRect(-400, o.horizon ?? 860, W + 800, 220, '#0a1236');   // water
  for (let i = 0; i < 18; i++) { const y = (o.horizon ?? 860) + 10 + i * 12, x = mod(i * 137 + TT * 30 * (i % 2 ? 1 : -1), W + 400) - 200; fnRect(x, y, 120 + (i % 4) * 30, 3, 'rgba(120,160,255,0.18)'); }
  fnWetGround((o.horizon ?? 860) + 200, '#1a1f3a', o.refl || [[300, '#ffd27a', 0.25], [820, '#7aa0ff', 0.3]]);
  fnRect(-400, (o.horizon ?? 860) + 200, W + 800, 14, '#2c3358');   // the pier edge
  for (let i = 0; i < 9; i++) { const x = -60 + i * 150; fnRR(x, (o.horizon ?? 860) + 176, 34, 44, 8, '#3a3f5a'); }   // bollards
  fnParticles('pdrz', 60, 'rgba(180,200,255,0.28)', { speed: 900, streak: 24, size: 1.4 });
}
function fnBoat(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(TT * 1.6) * 0.025); ctx.translate(0, Math.sin(TT * 2.1) * 6); ctx.scale(s, s);
  fnPoly([[-420, -60], [440, -60], [360, 90], [-360, 90]], '#e9ecf4'); fnPoly([[-400, 10], [420, 10], [380, 50], [-385, 50]], '#2a57c9');
  fnBold(o.name || 'DONA CIDA', -150, -14, 40, '#1d2a6a');
  fnRR(-60, -260, 300, 200, 18, '#d6dae6'); [-35, 65, 160].forEach((wx) => fnRR(wx, -230, 70, 70, 10, o.lit ? '#ffe9a0' : '#1d2448'));
  fnRect(-260, -520, 14, 460, '#c9ccd8'); fnLine(-253, -500, 200, -260, 3, '#9aa0b8'); fnLine(-253, -500, -400, -60, 3, '#9aa0b8');
  if (o.lit) fnGlow(100, -190, 300, 'rgba(255,230,150,0.5)', 0.7);
  ctx.restore();
}
SCENE.boat = () => {
  const t = LT(); fnPierBG({ refl: [[540, '#5a6aa8', 0.15]] });
  fnBoat(560, 930, 1.0, {});
  // the eleven, dark silhouettes on deck
  for (let i = 0; i < 11; i++) fnAlpha(0.95, () => { const x = 260 + i * 62, y = 870; fnRR(x - 22, y - 70, 44, 70, 14, '#070914'); fnCirc(x, y - 92, 24, '#070914'); fnEll(x, y - 108, 34, 10, '#070914'); });
  const walk = clamp(t / 1.6), ph = TT * 1.6;
  fnRafael(lerp(120, 360, EZ.o2(walk)), 1330, 1.7, { ...fnWalkPose(ph, 1 - walk * 0.8), back: true, key: 'rb' });
  fnGlow(540, 520, 200, 'rgba(255,255,255,0.05)', 1);
};
SCENE.eleven = () => {
  const t = LT(); fnSky('#0e1446', '#05070f'); fnStars(40, 'el');
  // low angle: deck rail, the row of eleven in raincoats, hats and (fake) beards
  fnRect(-300, 1000, W + 600, 900, '#d6dae6'); fnRect(-300, 1000, W + 600, 30, '#a9aec2'); for (let i = 0; i < 16; i++) fnRect(-200 + i * 90, 900, 10, 110, '#c9ccd8'); fnRect(-300, 900, W + 600, 10, '#c9ccd8');
  for (let i = 0; i < 11; i++) {
    const x = 70 + i * 94, row = i % 2, turn = clamp((t - 0.1 - i * 0.05) / 0.25), sc = row ? 0.78 : 0.86, y = 1000 - row * 30;
    fnWoman(x, y, sc, { outfit: 'raincoat', hat: true, beard: 1, hairC: ['#6b3e1f', '#d9b24a', '#3a2418'][i % 3], look: [lerp(0.9, 0, turn), 0.3], lid: 0.5, brow: 'cold', mouth: 'flat', key: 'e' + i, aL: [0.1, 0], aR: [-0.1, 0], skin: '#c9a08a', skinD: '#a8806a' });
    const k = fnPop(ATS(0.15 + i * 0.1), 0.2); if (k > 0) { ctx.save(); ctx.translate(x, y - 420 * sc); ctx.scale(k, k); fnCirc(0, 0, 26, FN.yellow); fnBold(String(i + 1), 0, 2, 30, FN.navy0); ctx.restore(); }
  }
  fnWash('rgba(20,30,90,1)', 0.25);
};
SCENE.shout = () => {
  const t = LT();
  if (t < 1.2) {
    fnSky('#141a4a', '#06081a'); fnGlow(200, 500, 500, 'rgba(120,150,255,0.35)', 0.6);
    fnBoat(540, 1500, 1.8, {});
    const cup = springMove(ATS(0.55), 0, 1, SPRING.snappy), shout = t > 1.0;
    fnWoman(540, feetFor(640, 2.4), 2.4, { outfit: 'raincoat', hat: true, beard: 1, hairC: '#6b3e1f', look: [0, 0.1], lid: shout ? 0.1 : 0.45, brow: shout ? 'up' : 'n', mouth: shout ? 'shout' : 'flat', key: 'sh', aL: [lerp(0.12, -0.35, cup), lerp(-0.04, 2.75, cup)], aR: [lerp(-0.12, 0.35, cup), lerp(0.04, -2.75, cup)], skin: '#c9a08a', skinD: '#a8806a', shadow: false });
    if (shout) fnBubble('RAFINHA!!!', 540, 330, ATS(1.0), { size: 72, shake: true, fg: FN.navy0 });
  } else {   // cut: Rafael's face, hope that hurts
    fnPierBG({}); fnGlow(540, 640, 420, 'rgba(255,190,220,0.35)', 0.7);
    fnRafael(540, feetFor(700, 2.9), 2.9, { look: [0, -0.2], eyes: 'wide', brow: 'worry', mouth: 'o', tilt: springMove(ATS(1.2), 0.1, -0.05, SPRING.playful), shadow: false, key: 'shr' });
  }
};
SCENE.memory = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#2a1d14'); fnGlow(540, 760, 700, 'rgba(255,190,120,0.35)', 0.9);
  const fall = springMove(ATS(0), 0, 1, SPRING.heavy);
  ctx.save(); ctx.translate(540, lerp(-300, 760, fall)); ctx.rotate(lerp(0.8, -0.06, fall));
  fnRect(-330, -400, 660, 800, 'rgba(0,0,0,0.4)'); fnRect(-340, -410, 680, 800, '#f6efe0');
  ctx.save(); ctx.beginPath(); ctx.rect(-300, -370, 600, 600); ctx.clip();
  fnSky('#ffcf8a', '#e7a35a', -370, 230); fnCirc(200, -250, 60, '#fff0c0');
  fnCity(160, { seed: 7, cols: ['#c27a4a', '#b0683c', '#d08a58'] });
  fnRect(-300, 120, 600, 120, '#9a5a3a');   // the laje
  ctx.save(); ctx.translate(180 + Math.sin(TT * 2) * 20, -230 + Math.cos(TT * 1.7) * 14); ctx.rotate(0.6); fnPoly([[0, -40], [30, 0], [0, 40], [-30, 0]], '#ff5a7a'); ctx.restore();   // the pipa (kite)
  fnLine(180, -230, 30, 40, 2, '#ffffff');
  const pat = Math.sin(TT * 3) * 0.15;
  fnWoman(-60, 130, 0.95, { outfit: 'purple', hairC: '#3a2418', look: [0.6, 0.3], lid: 0.1, mouth: 'smile', brow: 'up', skin: '#a8683f', skinD: '#8a5230', aR: [-0.6, -1.6 + pat], aL: [0.2, 0], key: 'mae' });
  fnRafael(90, 130, 0.55, { look: [0.5, -0.8], mouth: 'smile', brow: 'up', aR: [2.6, 0.2], key: 'kid' });
  ctx.restore();
  ctx.font = 'italic 700 54px "FreeSerif", serif'; ctx.fillStyle = '#2a2a5a'; ctx.textAlign = 'center'; ctx.fillText('Rafinha, 6', -20, 320); fnBold('❤', 150, 305, 50, FN.red);
  ctx.restore();
  fnWash('rgba(255,160,80,1)', 0.08);
};
SCENE.step = () => {
  const t = LT(); fnSky('#0b1030', '#05070f');
  fnRect(-300, 700, W + 600, 1400, '#1a1f3a');
  // the puddle with the boat's reflection
  fnEll(540, 1000, 420, 150, '#0d1440'); fnAlpha(0.5, () => { ctx.save(); ctx.translate(540, 1000); ctx.scale(1, -0.35); fnBoat(0, 200, 0.6, {}); ctx.restore(); });
  const down = EZ.i2(clamp(t / 0.45)), land = t > 0.45;
  if (land) for (let i = 0; i < 3; i++) { const u = clamp((t - 0.45 - i * 0.12) / 0.6); ctx.lineWidth = 4 * (1 - u); ctx.strokeStyle = `rgba(180,200,255,${0.8 * (1 - u)})`; ctx.beginPath(); ctx.ellipse(540, 1000, 60 + 360 * u, 20 + 110 * u, 0, 0, TAU); ctx.stroke(); }
  if (land) { const u = clamp((t - 0.45) / 0.4); for (let i = 0; i < 12; i++) { const a = -Math.PI * (0.1 + 0.8 * i / 11); fnCirc(540 + Math.cos(a) * 200 * u, 1000 + Math.sin(a) * 260 * u + 300 * u * u, 8 * (1 - u), '#9fb8ff'); } }
  // the leg and shoe coming down (big)
  ctx.save(); ctx.translate(540, lerp(420, 960, down)); fnRR(-70, -700, 140, 640, 50, FN.jeans); fnRR(-80, -90, 230, 110, 50, FN.shoe); fnRR(-80, 0, 240, 30, 14, FN.sole); ctx.restore();
};
SCENE.lights = () => {
  const t = LT(); fnPierBG({ horizon: 780 });
  const on = [0.02, 0.27, 0.52, 0.77].map((d) => (t >= d ? 1 : 0)), n = on.reduce((a, b) => a + b, 0);
  // long shadow behind him, then he shields his eyes and steps back
  fnAlpha(0.6, () => fnPoly([[490, 1150], [590, 1150], [700, 700], [430, 700]], 'rgba(0,0,0,0.55)'));
  const flinch = springMove(ATS(0.06), 0, 1, SPRING.snappy), back = springMove(ATS(0.3), 0, 1, SPRING.smooth);
  fnRafael(540, 1150 - back * 30, 1.6 - back * 0.05, { eyes: 'squeeze', brow: 'angry', mouth: 'grit', aR: [lerp(-0.2, -2.7, flinch), lerp(0.1, -1.0, flinch)], aL: [0.4, -0.3], lean: 0.08 * back, lL: [0.1 + back * 0.3, 0], lR: [-0.1, 0], tilt: -0.1 * flinch, key: 'lt' });
  fnWash('#ffffff', 0.08 * n);
  [[170, 300], [400, 250], [680, 250], [910, 300]].forEach(([x, y], i) => { fnLamp(x, y, 0.9, on[i]); if (on[i]) fnCone(x, y, Math.atan2(540 - x, 900) * -1, 1000, 260, 'rgba(255,255,240,0.9)', 0.18, 18); });
  fnTag('ALERTA', 540, 470, ATS(0.8), FN.red, 34);
};
SCENE.sirens = () => {
  const t = LT(); ctx.save(); ctx.translate(540, 820); ctx.rotate(-0.05 + t * 0.06); ctx.translate(-540, -820);
  fnRect(-500, -500, W + 1000, H + 1000, '#232a4a');
  for (let i = 0; i < 9; i++) fnRect(-500, 200 + i * 220, W + 1000, 6, 'rgba(255,255,255,0.06)');
  const cols = ['#c0392b', '#2a57c9', '#1f9a4e', '#7a3bb0', '#d98b1a'];
  [[60, 300], [60, 520], [860, 300], [860, 1080], [60, 1080], [860, 1300], [60, 1300]].forEach(([x, y], i) => { fnRect(x, y, 200, 120, 'rgba(0,0,0,0.4)'); fnRect(x - 8, y - 8, 200, 120, cols[i % 5]); for (let k = 0; k < 7; k++) fnRect(x + 6 + k * 27, y, 10, 104, 'rgba(0,0,0,0.15)'); });
  fnRect(-500, 1500, W + 1000, 600, '#0a1236');   // the water edge
  // Rafael from above (tiny): head + shoulders
  fnEll(540, 830, 44, 30, FN.hood); fnCirc(540, 826, 24, FN.hair);
  // the cars converge from 4 sides
  const cars = [[-300, 830, 380, 830], [1380, 830, 720, 830], [540, -300, 540, 640], [540, 1900, 540, 1030], [-300, 400, 300, 560], [1380, 1250, 800, 1100], [1380, 420, 790, 560]];
  cars.forEach(([x0, y0, x1, y1], i) => {
    const u = EZ.o3(clamp((t - i * 0.12) / 0.7)), x = lerp(x0, x1, u), y = lerp(y0, y1, u), a = Math.atan2(y1 - y0, x1 - x0);
    ctx.save(); ctx.translate(x, y); ctx.rotate(a + (u > 0.85 ? (u - 0.85) * 1.4 : 0));
    fnRR(-90, -45, 180, 90, 20, '#e9ecf4'); fnRect(-90, -8, 180, 16, '#2257c9'); fnRR(-30, -38, 70, 76, 12, '#22305a');
    const sr = fnSiren(TT + i * 0.13, 2.6); fnRR(-10, -36, 22, 34, 4, sr.red > 0.2 ? FN.red : '#5a1a22'); fnRR(-10, 2, 22, 34, 4, sr.blue > 0.2 ? FN.blue : '#1a2a5a');
    ctx.restore(); fnGlow(x, y, 220, FN.red, sr.red * 0.6); fnGlow(x, y, 220, FN.blue, sr.blue * 0.6);
    if (u > 0.6 && u < 1) fnAlpha(1 - u, () => fnLine(x - Math.cos(a) * 120, y - Math.sin(a) * 120, x - Math.cos(a) * 300, y - Math.sin(a) * 300, 22, 'rgba(255,255,255,0.12)'));
  });
  ctx.restore();
  const n = Math.min(7, 4 + Math.floor(clamp((t - 0.3) / 0.9) * 3));
  fnTag('VIATURAS: ' + n, 540, 400, ATS(0.1), FN.blue, 32);
};
SCENE.beards = () => {
  const t = LT(); fnSky('#121848', '#06081a'); fnStars(30, 'bd');
  fnRect(-300, 1060, W + 600, 900, '#d6dae6'); for (let i = 0; i < 16; i++) fnRect(-200 + i * 90, 960, 10, 110, '#c9ccd8'); fnRect(-300, 960, W + 600, 10, '#c9ccd8');
  const sr = fnSiren(TT, 2.2);
  for (let i = 0; i < 5; i++) {
    const x = 140 + i * 200, tr = 1.0 + i * 0.16, pull = springMove(ATS(tr), 0, 1, SPRING.snappy), reach = springMove(ATS(tr - 0.25), 0, 1, SPRING.snappy) * (1 - pull);
    const hat = pull > 0.2;
    fnWoman(x, 1080, 1.05, { outfit: 'raincoat', hat: !hat, beard: 1 - pull, hairC: ['#6b3e1f', '#d9b24a', '#3a2418', '#c98a3e', '#6b3e1f'][i], look: [0, 0.1], lid: 0.45, brow: 'cold', mouth: pull > 0.5 ? 'smirk' : 'flat', key: 'bd' + i, aR: [lerp(-0.15, -2.2, Math.max(reach, pull)), lerp(0.1, -1.2 + pull * 1.4, Math.max(reach, pull))], aL: [0.15, -0.1] });
    if (hat) { const u = clamp((TT - ATS(tr)) / 0.5); ctx.save(); ctx.translate(x + u * 80, 1080 - 440 - u * 260 + u * u * 300); ctx.rotate(u * 3); fnEll(0, 0, 70, 16, '#e0a91f'); fnRR(-42, -34, 84, 36, 18, '#f2c230'); ctx.restore(); }
  }
  fnWash(FN.red, sr.red * 0.08); fnWash(FN.blue, sr.blue * 0.1);
};
SCENE.police = () => {
  const t = LT(); fnPierBG({ horizon: 900 }); const sr = fnSiren(TT, 2.2);
  const open = springMove(ATS(0.35), 0, 1, SPRING.smooth);
  const hand = springMove(ATS(0.75), 0, 1, SPRING.snappy);
  const r = 2.05;
  fnWoman(540, feetFor(560, r), r, { outfit: 'vest', hair: 'bun', hairC: '#3a2418', look: [0, 0.1], lid: 0.45, brow: 'cold', mouth: 'smirk', key: 'pol', aR: [lerp(-0.2, -1.9, hand), lerp(0.1, -0.9, hand)], aL: [0.2, -0.2], shadow: false,
    hold: (h) => { if (hand > 0.3) { const [x, y] = h; ctx.save(); ctx.translate(x, y - 20); fnRR(-40, -70, 80, 100, 14, '#c9a43a'); fnPoly([[0, -60], [30, -25], [0, 15], [-30, -25]], '#f5d55a'); ctx.restore(); fnGlow(x, y - 40, 120, '#fff5c0', mod(TT, 0.6) < 0.1 ? 1 : 0.3); } } });
  // the raincoat halves slide off
  [-1, 1].forEach((sg) => { const x = 540 + sg * (100 + open * 420); fnAlpha(1 - open * 0.8, () => fnRR(x - 110, 700, 220, 640, 30, '#f2c230')); });
  // the fake beard falls into a puddle (foreground)
  const fu = clamp((t - 1.25) / 0.6); if (fu > 0) { const y = lerp(820, 1120, EZ.i2(fu)); ctx.save(); ctx.translate(740, y); ctx.rotate(fu * 2.5); fnEll(0, 0, 90, 60, '#18120f'); ctx.restore(); if (fu >= 1) for (let i = 0; i < 8; i++) { const u = clamp((t - 1.85) / 0.4), a = -Math.PI * (0.15 + 0.7 * i / 7); fnCirc(740 + Math.cos(a) * 140 * u, 1120 + Math.sin(a) * 160 * u + 200 * u * u, 7 * (1 - u), '#9fb8ff'); } }
  fnEll(740, 1140, 160, 30, 'rgba(120,150,255,0.25)');
  fnWash(FN.red, sr.red * 0.07); fnWash(FN.blue, sr.blue * 0.09);
};
SCENE.phone = () => {
  const t = LT(); fnSky('#0e1446', '#05070f'); const sr = fnSiren(TT, 2.0);
  fnGlow(540, 1400, 700, 'rgba(255,255,255,0.15)', 1);
  const lift = springMove(ATS(0.0), 0, 1, SPRING.smooth), tap = t > 0.65;
  fnWoman(540, 2080, 2.3, { outfit: 'vest', hair: 'bun', hairC: '#2a1a12', look: [0, -0.4], lid: 0.5, brow: 'cold', mouth: 'smirk', key: 'cmd', aR: [-2.5, -0.5], aL: [0.3, -0.3], shadow: false });
  fnPhone(540, lerp(900, 640, lift), 1.2, { rot: -0.04, screen: () => {
    fnRect(-115, -232, 230, 464, '#141a3a'); fnMono('CELULAR DA MÃE', 0, -190, 18, '#ff9ac4');
    fnCirc(0, -110, 52, '#a8683f'); fnAt(0, -110, 0.9, () => fnWomanHead(RR * 1.0, { hairC: '#3a2418', look: [0, 0], lid: 0.1, mouth: 'smile', skin: '#a8683f', skinD: '#8a5230', key: 'mae2', blink: false }));
    fnBold('Rafinha ❤', 0, -20, 34, '#ffffff'); fnMono('ÁUDIO 0:04', 0, 20, 16, '#9aa0c0');
    for (let i = 0; i < 18; i++) { const h = tap ? 10 + Math.abs(Math.sin(TT * 14 + i * 1.7)) * 60 : 8; fnRR(-95 + i * 11, 100 - h / 2, 7, h, 3, tap ? '#ff9ac4' : '#4a5080'); }
    fnCirc(0, 190, 28, tap ? FN.green : '#2a3060'); fnPoly([[-8, 176], [14, 190], [-8, 204]], '#ffffff');
  } });
  if (tap) fnCirc(540, 830, 26 * (1 - clamp((t - 0.65) / 0.3)), 'rgba(255,255,255,0.6)');
  fnWash(FN.red, sr.red * 0.06); fnWash(FN.blue, sr.blue * 0.08);
};
SCENE.heartbreak = () => {
  const t = LT(); fnPierBG({}); const sr = fnSiren(TT, 2.0);
  const sad = clamp(t / 0.5);
  fnRafael(540, feetFor(700, 3.0), 3.0, { look: [0, 0.4], brow: 'sad', mouth: 'wobble', tear: sad, sweat: 0.5, tilt: Math.sin(TT * 18) * 0.012, shadow: false, key: 'hb', lid: 0.15 });
  fnWash(FN.red, sr.red * 0.08); fnWash(FN.blue, sr.blue * 0.1);
};
SCENE.board = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#a87a4a'); const R = RNG('cork'); for (let i = 0; i < 500; i++) fnCirc(R.r(-300, W + 300), R.r(-300, H + 300), R.r(1, 3), 'rgba(80,50,20,0.35)');
  [[120, 330, -0.1], [900, 1150, 0.12], [130, 1180, 0.06]].forEach(([x, y, r]) => { ctx.save(); ctx.translate(x, y); ctx.rotate(r); fnRect(-80, -60, 160, 120, '#f5e46a'); ctx.restore(); });
  const cards = [[540, 430, 'APELIDO', '“RAFINHA”', FN.pink], [300, 820, 'ENDEREÇO', 'CASA DA MÃE · SP', FN.green], [780, 820, 'BILHETE', '“SOMOS ONZE”', FN.yellow]];
  const T0 = [0.0, 0.77, 1.59];
  // red string
  const shown = T0.filter((d) => t >= d + 0.15).length;
  if (shown > 1) fnStroke([[540, 430], [300, 820]].slice(0, 2), 4, '#d0202a'); if (shown > 2) fnStroke([[300, 820], [780, 820], [540, 430]], 4, '#d0202a');
  cards.forEach(([x, y, lab, val, col], i) => {
    const k = fnPop(ATS(T0[i]), 0.25); if (k <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(i === 0 ? -0.03 : i === 1 ? 0.05 : -0.06);
    fnRect(-200, -150, 400, 300, 'rgba(0,0,0,0.3)'); fnRect(-205, -158, 400, 300, '#f6f0e0');
    fnMono(lab, -5, -120, 24, '#555');
    if (i === 0) { fnRect(-90, -95, 170, 140, '#e7a35a'); fnAt(-5, -20, 0.4, () => fnRafaelHead(RR * 2, { look: [0, 0], key: 'bk', mouth: 'smile' })); }
    if (i === 1) { fnPoly([[-90, 20], [-5, -80], [80, 20]], '#c0302a'); fnRect(-70, 20, 130, 30, '#e9d9b5'); fnRect(-70, -10, 130, 60, '#e9d9b5'); fnRect(-20, 10, 30, 40, '#7a5034'); }
    if (i === 2) { fnRect(-90, -85, 170, 130, '#f4ecd6'); for (let k2 = 0; k2 < 4; k2++) fnRect(-70, -60 + k2 * 26, 130, 6, 'rgba(30,40,110,0.5)'); }
    fnBold(val, -5, 95, 36, col === FN.yellow ? '#a07a00' : col);
    fnCirc(-5, -150, 14, '#d0202a');
    const ck = clamp((t - T0[i] - 0.35) / 0.2); if (ck > 0) fnStroke([[-120, -20], [-40 * ck - 60, 60 * ck - 10], [140 * ck - 60, -130 * ck + 60]].slice(0, 3), 14, '#d0202a');
    ctx.restore();
  });
};
SCENE.trap = () => {
  const t = LT(); fnSky('#2a0a12', '#05070f'); fnGlow(540, 760, 600, 'rgba(255,40,60,0.5)', 0.8);
  fnRafael(540, 1060, 1.2, { eyes: 'wide', brow: 'worry', mouth: 'o', key: 'tp', aL: [0.6, -0.3], aR: [-0.6, 0.3] });
  fnWash('#000020', 0.15);
  const c = t < 0.12 ? 0 : springMove(ATS(0.12), 0, 1, { k: 600, d: 30 });
  [-1, 1].forEach((sg) => { ctx.save(); ctx.translate(540, 1080); ctx.rotate(sg * lerp(1.25, 0.05, c)); ctx.scale(sg, 1);
    ctx.lineWidth = 34; ctx.strokeStyle = '#8a8f9e'; ctx.beginPath(); ctx.arc(0, 0, 420, -Math.PI / 2 - 1.2, -Math.PI / 2 + 0.05); ctx.stroke();
    for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 - 1.1 + i * 0.17; ctx.save(); ctx.rotate(a); fnPoly([[400, -14], [340, 0], [400, 14]], '#c9ccd8'); ctx.restore(); }
    ctx.restore(); });
  fnRect(400, 1060, 280, 40, '#5a5f6e');
  if (t > 0.15) { ctx.save(); ctx.translate(540, 470); const k = fnPop(ATS(0.15), 0.2); ctx.scale(k, k); ctx.rotate(-0.12); ctx.lineWidth = 10; ctx.strokeStyle = FN.red; ctx.beginPath(); ctx.roundRect(-270, -70, 540, 140, 12); ctx.stroke(); fnBold('ARMADILHA', 0, 4, 80, FN.red); ctx.restore(); }
};
