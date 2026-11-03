// =====================================================================
//  SCENES 4 — sem saída, a Kombi, CTA (58.93 – end)
// =====================================================================
function fnDeadEnd() {
  fnSky('#0e1446', '#05070f');
  fnBrick(-300, -300, 460, H + 600, '#7a4030'); fnBrick(920, -300, 460, H + 600, '#8a4a30');
  fnBrick(160, 200, 760, 1060, '#9a5236', { plaster: true });
  fnRect(320, 560, 440, 690, '#4a4f5c'); for (let i = 0; i < 7; i++) fnRect(320 + i * 66, 560, 6, 690, '#3a3e4a'); fnRect(320, 900, 440, 12, '#3a3e4a');
  fnLine(330, 900, 380, 880, 10, '#ff9a3a'); fnLine(700, 900, 750, 915, 10, '#ff9a3a');   // welded shut
  fnRect(-300, 1250, W + 600, 900, '#121528');
  const R = RNG('glass'); for (let i = 0; i < 14; i++) fnPoly([[R.r(200, 900), 1260 + R.r(0, 60)], [R.r(200, 900), 1270 + R.r(0, 60)], [R.r(200, 900), 1255 + R.r(0, 60)]], 'rgba(180,220,200,0.5)');
}
SCENE.deadend = () => {
  const t = LT(); fnDeadEnd();
  const hit = springMove(ATS(0.15), 0, 1, SPRING.snappy), push = springMove(ATS(0.6), 0, 1, SPRING.snappy);
  const look = t < 0.9 ? [0, -0.5] : t < 1.1 ? [-1, 0] : t < 1.25 ? [1, 0] : [0, -1];
  fnRafael(540, 1250, 1.5, { back: false, hood: true, look, eyes: 'wide', brow: 'worry', mouth: 'grit', sweat: 1, key: 'de',
    aR: [lerp(-0.12, -2.0, Math.max(hit, push) * (t < 0.9 ? 1 : 0.2)), lerp(0.04, -0.8, hit)], aL: [lerp(0.12, 2.0, push * (t < 0.9 ? 1 : 0.2)), lerp(-0.04, 0.8, push)] });
  const [gx] = fnShake(ATS(0.62), 10, 0.4, 'gate'); if (gx) fnRect(320 + gx, 560, 440, 8, '#6a6f7c');
  fnTag('SEM SAÍDA', 540, 420, ATS(0.05), FN.red, 38);
};
SCENE.cornered = () => {
  const t = LT(); fnDeadEnd(); fnWash('#000020', 0.25);
  const back = springMove(ATS(0.05), 0, 1, SPRING.heavy);
  fnRafael(540, feetFor(720, 2.4) - back * 40, 2.4, { hood: true, look: [Math.sin(TT * 7) * 0.8, 0.1], eyes: 'wide', brow: 'worry', mouth: 'wobble', sweat: 1, key: 'co', shadow: false, tilt: Math.sin(TT * 30) * 0.01, aL: [0.5, -0.2], aR: [-0.5, 0.2] });
};
SCENE.backlights = () => {
  const t = LT(); fnSky('#0e1446', '#05070f'); fnBrick(-300, -300, 420, H + 600, '#7a4030'); fnBrick(960, -300, 420, H + 600, '#8a4a30');
  fnRect(120, 300, 840, 960, '#1a2048'); fnGlow(540, 760, 500, 'rgba(255,248,210,0.35)', 0.9); fnRect(-300, 1250, W + 600, 900, '#121528');
  for (let i = 0; i < 3; i++) { const x = 330 + i * 210, adv = springMove(ATS(i * 0.12), 0, 1, SPRING.smooth); const s = lerp(0.9, 1.15, clamp(t / 1.7));
    fnAlpha(1, () => { ctx.save(); ctx.translate(x, 1250); ctx.scale(s, s); fnEll(0, -350, 48, 52, '#06070e'); fnRR(-70, -300, 140, 300, 40, '#06070e'); ctx.restore(); });
    if (t >= i * 0.12) fnCone(x + 50, 1250 - 280 * s, Math.PI - 0.15 + i * 0.15, 1200, 300, 'rgba(255,248,210,0.95)', 0.32 * adv, 30); fnGlow(x + 50, 1250 - 280 * s, 90, '#fffbe0', adv); }
  fnRafael(540, 1700, 1.6, { back: true, hood: true, key: 'bl' });
};
SCENE.headlights = () => {
  const t = LT(); fnDeadEnd(); fnWash('#000020', 0.35);
  const on = t > 0.35 ? springMove(ATS(0.35), 0, 1, SPRING.snappy) : 0;
  fnGlow(420, 640, 300 * on, '#fff6c8', on); fnGlow(660, 640, 300 * on, '#fff6c8', on); fnCirc(420, 640, 46 * on, '#fffbe0'); fnCirc(660, 640, 46 * on, '#fffbe0');
  fnWash('#fff8e0', on * 0.22);
  const turn = springMove(ATS(0.0), 0, 1, SPRING.smooth), cover = springMove(ATS(0.4), 0, 1, SPRING.snappy);
  fnAlpha(0.7, () => fnPoly([[480, 1250], [600, 1250], [700, 1900], [380, 1900]], 'rgba(0,0,0,0.6)'));
  fnRafael(540, 1250, 1.55, { back: turn < 0.5, hood: true, eyes: on ? 'squeeze' : 'wide', brow: 'angry', mouth: 'grit', key: 'hl', aR: [lerp(-0.12, -2.7, cover), lerp(0.04, -1.0, cover)], aL: [0.3, -0.2] });
};
SCENE.kombi = () => {
  const t = LT(); fnSky('#0e1446', '#05070f'); fnBrick(-300, -300, 420, H + 600, '#7a4030'); fnBrick(960, -300, 420, H + 600, '#8a4a30'); fnRect(-300, 1250, W + 600, 900, '#121528');
  const u = EZ.o3(clamp(t / 1.0)), x = lerp(1700, 640, u), nose = t > 0.8 ? -Math.sin(clamp((t - 0.8) / 0.4) * Math.PI) * 0.05 : 0;
  fnRafael(270, 1250, 1.3, { hood: true, eyes: 'wide', brow: 'up', mouth: 'open', key: 'kb', lean: -0.2, aL: [-2.6, 0.4], aR: [2.6, -0.4], look: [1, 0] });
  fnKombi(x, 1250, 1.05, -1, { nose, lights: 1 });
  if (t > 0.6) fnParticles('smk', 30, 'rgba(220,220,230,0.35)', { x0: x - 300, x1: x + 400, y0: 1050, y1: 1260, speed: -80, size: 18 });
};
SCENE.kombistop = () => {
  const t = LT(); fnSky('#0e1446', '#05070f'); fnBrick(-300, -300, 420, H + 600, '#7a4030'); fnBrick(960, -300, 420, H + 600, '#8a4a30'); fnRect(-300, 1250, W + 600, 900, '#121528');
  const bounce = Math.sin(t * 14) * Math.exp(-t * 4) * 0.03;
  fnKombi(560, 1250, 1.35, -1, { nose: bounce, lights: 0.8 });
  fnParticles('smk2', 26, 'rgba(220,220,230,0.3)', { x0: 100, x1: 1000, y0: 1000, y1: 1260, speed: -60, size: 22 });
};
SCENE.window = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#ecebe2'); fnRect(-300, 1100, W + 600, 900, '#5f86b8');
  fnRR(140, 330, 800, 640, 40, '#1d2748');
  const d = EZ.io(clamp((t - 0.05) / 0.8));
  ctx.save(); ctx.beginPath(); ctx.roundRect(160, 350, 760, 600, 30); ctx.clip();
  fnRect(160, 350, 760, 600, '#2a2238'); fnGlow(300, 800, 300, 'rgba(255,190,120,0.5)', 0.8);
  fnAt(540, 700, 1.6, () => fnWomanHead(RR * 1.4, { hair: 'afro', hairC: '#1a1412', skin: '#7a4a2a', skinD: '#5e3820', earring: true, look: [0, 0], lid: 0.3, brow: 'cold', mouth: 'flat', key: 'kw0' }));
  fnRect(160, 350 + 600 * d, 760, 600, 'rgba(90,120,180,0.55)'); const sr = fnSiren(TT, 2); fnRect(160 + 600 * d, 350 + 600 * d, 120, 600, `rgba(255,${sr.red > 0.3 ? 80 : 160},200,0.25)`);
  ctx.restore();
  fnRR(960, 700, 40, 120, 10, '#c9c6b8'); ctx.save(); ctx.translate(980, 760); ctx.rotate(TT * 8 * (t < 0.85 ? 1 : 0)); fnRR(-8, -60, 16, 60, 6, '#9aa0b0'); ctx.restore();
};
function fnKombiInside() {
  fnRect(-300, -300, W + 600, H + 600, '#1c1a28'); fnRect(-300, 1150, W + 600, 900, '#2a2636');
  fnRR(-100, 1000, 900, 140, 30, '#3a3448'); fnCirc(820, 1120, 200, '#2a2436'); fnCirc(820, 1120, 160, '#1c1a28');   // dashboard + wheel
  fnLine(540, 250, 540, 420, 3, '#c9a24a'); fnCirc(540, 430, 14, '#c9a24a'); for (let i = 0; i < 8; i++) fnCirc(540 + Math.sin(TT * 2) * i * 2, 260 + i * 20, 6, '#8a6a3a');   // the rosary
  fnRR(600, 270, 30, 140, 4, '#2f8a55'); fnRR(640, 270, 26, 120, 4, '#ffd23f');   // Senhor do Bonfim ribbons
  const sr = fnSiren(TT, 2.0); fnGlow(-100, 600, 600, FN.red, sr.red * 0.5); fnGlow(-100, 700, 600, FN.blue, sr.blue * 0.5); fnGlow(900, 1000, 400, 'rgba(255,190,120,0.6)', 0.6);
}
SCENE.woman = () => {
  const t = LT(); fnKombiInside();
  const lookMir = t < 0.6 ? [0.6, -0.8] : [-0.8, 0.1];
  fnWoman(540, feetFor(660, 2.3), 2.3, { outfit: 'denim', hair: 'afro', hairC: '#1a1412', skin: '#7a4a2a', skinD: '#5e3820', earring: true, look: lookMir, lid: 0.3, brow: 'cold', mouth: 'chew', key: 'kw', shadow: false, aR: [0.6, -1.4], aL: [-0.6, 1.4] });
};
SCENE.suspicious = () => {
  const t = LT(); fnDeadEnd(); fnWash('#000020', 0.2); const sr = fnSiren(TT, 2.0); fnGlow(1000, 600, 600, FN.red, sr.red * 0.4); fnGlow(1000, 700, 600, FN.blue, sr.blue * 0.4);
  const lean = springMove(ATS(0.05), 0, 1, SPRING.smooth);
  fnRafael(540, feetFor(700, 2.6), 2.6, { hood: true, eyes: 'squint', brow: 'angry', mouth: 'flat', look: [0.6, 0], tilt: -0.12 * lean, lean: -0.06 * lean, key: 'su', shadow: false, side: 0.2 });
};
SCENE.shock = () => {
  const t = LT(); fnDeadEnd(); fnWash('#000020', 0.2); fnGlow(540, 640, 400, 'rgba(255,120,200,0.35)', 0.8);
  fnRafael(540, feetFor(700, 3.1), 3.1, { hood: true, eyes: 'wide', brow: 'up', mouth: 'o', look: [0.3, 0], key: 'sk', shadow: false, tilt: springMove(ATS(0.05), 0.12, 0, SPRING.playful) });
  fnTag('ELA SABE O NOME DELE', 540, 330, ATS(0.1), FN.pink, 30);
};
SCENE.getin = () => {
  const t = LT(); fnKombiInside();
  const lean = springMove(ATS(0.05), 0, 1, SPRING.smooth), door = springMove(ATS(0.4), 0, 1, SPRING.snappy);
  // the open passenger door (dark), flashlights growing outside
  fnRR(140, 380, 300 + door * 120, 640, 20, '#0a0a12'); for (let i = 0; i < 3; i++) fnGlow(220 + i * 70, 700, 60 + t * 60, '#fffbe0', 0.5 + t * 0.3);
  fnWoman(700, feetFor(640, 2.2) + lean * 30, 2.2, { outfit: 'denim', hair: 'afro', hairC: '#1a1412', skin: '#7a4a2a', skinD: '#5e3820', earring: true, look: [-1, 0], lid: 0.15, brow: 'angry', mouth: t > 0.9 ? 'shout' : 'open', key: 'gi', shadow: false, lean: -0.2 * lean, aR: [0.3, -0.5], aL: [lerp(0.1, 1.9, door), lerp(0, 0.3, door)] });
  fnBubble('ENTRA, RAFAEL.\nAGORA.', 540, 300, ATS(0.1), { size: 56, shake: t > 0.9 });
};
SCENE.cta = () => {
  const t = LT();
  // the frozen Kombi frame, dark and blurred under the voting card
  { const L3 = layer(3), main = ctx; ctx = L3.getContext('2d'); ctx.setTransform(1, 0, 0, 1, 0, 0); fnSky('#0e1446', '#05070f'); fnBrick(-300, -300, 420, H + 600, '#7a4030'); fnBrick(960, -300, 420, H + 600, '#8a4a30'); fnKombi(560, 1250, 1.35, -1, { lights: 0.6 }); ctx = main;
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'blur(10px) brightness(0.45) saturate(0.6)'; ctx.drawImage(L3, 0, 0); ctx.restore(); ctx.filter = 'none'; }
  const left = Math.max(0, 8 - Math.floor(t / (5.9 / 8)));
  const k0 = fnPop(ATS(0.0)); ctx.save(); ctx.translate(540, 360); ctx.scale(k0, k0);
  ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.beginPath(); ctx.arc(0, 0, 70, 0, TAU); ctx.stroke();
  ctx.strokeStyle = FN.red; ctx.beginPath(); ctx.arc(0, 0, 70, -Math.PI / 2, -Math.PI / 2 + TAU * (1 - mod(t, 5.9 / 8) / (5.9 / 8))); ctx.stroke();
  fnBold(String(left), 0, 4, 70, '#ffffff'); ctx.restore();
  const k1 = fnPop(ATS(0.02)); ctx.save(); ctx.translate(540, 560); ctx.scale(k1, k1); fnBold('ELE DEVE ENTRAR', 0, -40, 72, '#ffffff', 'center', 10); fnBold('NA KOMBI?', 0, 45, 84, FN.yellow, 'center', 10); ctx.restore();
  [[1.15, 'A', 'SIM, ENTRA AGORA', FN.green, -1], [2.6, 'B', 'NÃO, CONTINUA CORRENDO', FN.red, 1]].forEach(([d, L, txt, col, dir], i) => {
    const x = springMove(ATS(d), 540 + dir * 1100, 540, SPRING.snappy); if (TT < ATS(d)) return;
    const y = 780 + i * 170, pulse = 1 + 0.03 * Math.sin(TT * 6 + i);
    ctx.save(); ctx.translate(x, y); ctx.scale(pulse, pulse);
    fnGlow(0, 0, 420, col, 0.25); fnRR(-400, -64, 800, 128, 20, 'rgba(11,15,36,0.92)'); ctx.lineWidth = 6; ctx.strokeStyle = col; ctx.beginPath(); ctx.roundRect(-400, -64, 800, 128, 20); ctx.stroke();
    fnBold(L, -330, 4, 64, col); fnBold(txt, 30, 4, 44, '#ffffff'); ctx.restore();
  });
  if (TT >= ATS(4.13)) { const k = fnPop(ATS(4.13)); ctx.save(); ctx.translate(540, 1110); ctx.scale(k, k); fnRR(-230, -40, 460, 80, 40, FN.yellow); fnBold('💬 COMENTA', 0, 3, 44, FN.navy0); ctx.restore(); }
  if (t > 5.7) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = `rgba(0,0,0,${clamp((t - 5.7) / 0.3)})`; ctx.fillRect(0, 0, W, H); ctx.restore(); }
};
