// =====================================================================
//  SCENES A — gancho + bunkers (0 – 26.31s)
// =====================================================================
const HEAD_H = 7.22 * RR;
const feetFor = (headY, s) => headY + HEAD_H * s;
const fmtN = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
function fnStars(n, key = 'st') { const R = RNG('stars', key); for (let i = 0; i < n; i++) { const x = R.r(-200, W + 200), y = R.r(-300, H + 200), tw = 0.5 + 0.5 * Math.sin(TT * (1 + R.f() * 3) + i); fnCirc(x, y, R.r(1, 3.2), `rgba(255,255,255,${0.25 + 0.6 * tw})`); } }
function fnGridBG(col = 'rgba(90,130,255,0.10)', step = 60) { for (let x = -300; x < W + 300; x += step) fnRect(x, -400, 2, H + 800, col); for (let y = -400; y < H + 400; y += step) fnRect(-300, y, W + 600, 2, col); }
// Rafael lying down (rotated rig): x,y = hips on the mattress; up = 0 lying … 1 sitting up
function fnRafaelLying(x, y, s, up, p = {}) { const th = lerp(-Math.PI / 2, -0.05, up), lg = th + Math.PI / 2; ctx.save(); ctx.translate(x, y); ctx.rotate(th); fnRafael(0, 2.9 * RR * s, s, { shadow: false, lL: [lg, 0], lR: [lg - 0.05, 0], ...p }); ctx.restore(); }
// Rafael's bedroom (São Paulo apartment)
function fnBedroom(o = {}) {
  fnRect(-300, -300, W + 600, H + 600, o.wall || '#2a2f5e'); for (let i = 0; i < 20; i++) fnRect(-300 + i * 90, -300, 3, H + 600, 'rgba(255,255,255,0.03)');
  fnRR(600, 300, 380, 360, 10, '#1a1f44'); ctx.save(); ctx.beginPath(); ctx.rect(620, 320, 340, 320); ctx.clip(); fnSky(o.sky0 || '#ffb070', o.sky1 || '#6a7ac8', 320, 640); fnCity(640, { seed: 4, cols: ['#3a4280', '#2f3670', '#454d90'] }); ctx.restore();
  fnRect(780, 300, 12, 360, '#1a1f44'); fnRect(600, 470, 380, 12, '#1a1f44');
  fnBRFlag(240, 420, 200, 0.4); fnRR(120, 560, 150, 190, 6, '#e85a7a'); fnBold('TAMO', 195, 630, 34, '#fff'); fnBold('JUNTO', 195, 672, 30, '#ffd23f');
  fnRect(-300, 1150, W + 600, 900, '#4a3424'); for (let i = 0; i < 12; i++) fnRect(-300, 1160 + i * 60, W + 600, 3, '#3a2818');
  fnRR(60, 880, 760, 220, 30, '#5a3d6a'); fnRR(40, 820, 80, 300, 20, '#4a3058'); fnRR(110, 900, 180, 80, 30, '#f0eef8');   // bed + pillow
  fnRR(840, 950, 160, 200, 10, '#6a4a30'); fnRR(860, 970, 120, 40, 6, '#5a3d28');   // nightstand
}
function fnAlarmClock(x, y, s, o = {}) {
  const ring = o.ring || 0, sh = ring ? Math.sin(TT * 60) * 6 * ring : 0;
  ctx.save(); ctx.translate(x + sh, y); ctx.rotate(sh * 0.01); ctx.scale(s, s);
  fnStroke([[-50, 50], [-70, 80]], 10, '#c0392b'); fnStroke([[50, 50], [70, 80]], 10, '#c0392b');
  fnCirc(-55, -62, 30, '#e04a3a'); fnCirc(55, -62, 30, '#e04a3a'); fnRect(-4, -96, 8, 20, '#c0392b');
  fnCirc(0, 0, 90, '#e04a3a'); fnCirc(0, 0, 72, '#f6f2e6');
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; fnLine(Math.sin(a) * 58, -Math.cos(a) * 58, Math.sin(a) * 66, -Math.cos(a) * 66, 4, '#333'); }
  fnLine(0, 0, 0, -44, 8, '#222'); fnLine(0, 0, 34, 10, 6, '#222'); fnCirc(0, 0, 6, '#c0392b');
  if (o.label) fnMono(o.label, 0, 30, 18, '#c0392b');
  ctx.restore();
  if (ring) for (let i = 0; i < 3; i++) { ctx.lineWidth = 5; ctx.strokeStyle = `rgba(255,220,120,${0.8 - i * 0.25})`; ctx.beginPath(); ctx.arc(x, y, 120 * s + i * 30 + mod(TT * 120, 30), -2.4, -0.8); ctx.stroke(); }
}
SCENE.wake = () => {
  const t = LT(); fnBedroom();
  const up = springMove(ATS(0.35), 0, 1, SPRING.smooth), stretch = t > 0.75 ? springMove(ATS(0.75), 0, 1, SPRING.playful) : 0;
  fnRafaelLying(420, 930, 1.05, up, { eyes: t < 0.3 ? 'closed' : 'open', brow: 'up', mouth: t > 0.8 ? 'open' : 'flat', look: [0.3, -0.2], aL: [lerp(0.2, -2.9, stretch), -0.1], aR: [lerp(-0.2, 2.9, stretch), 0.1], key: 'wk' });
  fnRR(80, 960, 700, 150, 40, '#7a5ab0'); fnRR(80, 960, 700, 30, 15, '#8d6cc4');   // blanket over the legs
  fnAlarmClock(920, 900, 0.55, { ring: t < 0.6 ? 1 : 0 });
  fnGlow(780, 470, 400, 'rgba(255,190,120,0.45)', 0.7);
};
SCENE.calendar = () => {
  const t = LT(); fnSky('#141a4a', '#06081a'); fnGridBG('rgba(90,130,255,0.07)', 80);
  const yr = Math.min(3026, Math.round(2026 + 1000 * EZ.i3(clamp(t / 1.6))));
  // pages tearing off and flying
  for (let i = 0; i < 14; i++) { const u = mod(t * 3 + i / 14, 1); ctx.save(); ctx.translate(540 + u * (i % 2 ? 500 : -500), 700 - u * 500 + u * u * 300); ctx.rotate(u * 6 * (i % 2 ? 1 : -1)); fnRR(-70, -80, 140, 160, 10, '#f4efe2'); fnRect(-70, -80, 140, 36, '#c0392b'); ctx.restore(); }
  ctx.save(); ctx.translate(540, 760); fnRR(-250, -270, 500, 540, 26, '#f6f2e6'); fnRR(-250, -270, 500, 140, 26, '#c0392b'); fnRect(-250, -160, 500, 30, '#c0392b');
  [-130, 130].forEach((x) => fnRR(x - 14, -300, 28, 70, 10, '#3a3e4c')); fnMono('ANO', 0, -200, 44, '#ffffff');
  fnBold(String(yr), 0, 50, 190, yr >= 3026 ? FN.red : '#1a1a2a'); ctx.restore();
  if (yr >= 3026) fnTag('MIL ANOS', 540, 1100, ATS(1.6), FN.red, 40);
};
SCENE.oldroom = () => {
  const t = LT(); fnBedroom({ wall: '#2a3a3a', sky0: '#8ad0a0', sky1: '#3a6a5a' });
  // dust, cobwebs, vines through the window
  fnWash('#203020', 0.25); for (let i = 0; i < 6; i++) fnStroke([[620 + i * 60, 300], [600 + i * 70, 500 + Math.sin(TT + i) * 10], [640 + i * 50, 700]], 10, '#2f8a55');
  ctx.save(); ctx.translate(-20, -20); ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(255,255,255,0.4)'; for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.arc(0, 0, i * 60, 0, Math.PI / 2); ctx.stroke(); } for (let a = 0; a < 5; a++) fnLine(0, 0, Math.cos(a * 0.39) * 260, Math.sin(a * 0.39) * 260, 2, 'rgba(255,255,255,0.4)'); ctx.restore();
  fnParticles('dust', 50, 'rgba(255,240,200,0.35)', { speed: 20, size: 3 });
  const look = [Math.sin(TT * 4) * 0.9, -0.2];
  fnRafaelLying(420, 930, 1.05, 1, { eyes: 'wide', brow: 'up', mouth: 'o', look, key: 'od', aL: [0.6, -0.4], aR: [-0.6, 0.4] });
  fnRR(80, 960, 700, 150, 40, '#5a4a70'); for (let i = 0; i < 8; i++) fnCirc(120 + i * 80, 970, 12, 'rgba(200,200,200,0.4)');
  fnTag('POEIRA DE 1000 ANOS', 540, 380, ATS(0.3), '#8a6a3a', 26);
};
SCENE.smile = () => {
  const t = LT(); fnSky('#ffb86a', '#ff7a8a', -300, 2000); for (let i = 0; i < 12; i++) { ctx.save(); ctx.translate(540, 700); ctx.rotate(i / 12 * TAU + TT * 0.3); fnPoly([[0, 0], [1400, -120], [1400, 120]], 'rgba(255,255,255,0.12)'); ctx.restore(); }
  const thumb = springMove(ATS(0.15), 0, 1, SPRING.playful);
  fnRafael(540, feetFor(640, 2.4), 2.4, { mouth: 'smile', brow: 'up', look: [0.3, -0.1], aR: [lerp(-0.12, -2.4, thumb), lerp(0.04, -0.6, thumb)], tilt: 0.08, key: 'sm', shadow: false,
    hold: (h) => { if (thumb > 0.4) { fnRR(h[0] - 14, h[1] - 60, 28, 50, 12, FN.skin); } } });
  for (let i = 0; i < 8; i++) { const u = mod(TT * 0.8 + i / 8, 1); fnAlpha(1 - u, () => fnBold('✦', 200 + i * 100, 900 - u * 500, 40, '#ffffff')); }
};
SCENE.bills = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#2a2f5e'); fnRect(-300, 1100, W + 600, 900, '#3a3f6a');
  fnRR(140, 900, 800, 40, 10, '#6a4a30'); fnRect(180, 940, 30, 200, '#5a3d28'); fnRect(870, 940, 30, 200, '#5a3d28');   // desk
  fnRR(560, 700, 300, 200, 14, '#1a1f44'); fnRR(580, 720, 260, 160, 8, '#4aa8ff'); fnMono('E-MAIL (999+)', 710, 800, 22, '#fff');
  const throwK = springMove(ATS(0.3), 0, 1, SPRING.snappy);
  fnRafael(380, 1180, 1.5, { mouth: 'open', brow: 'up', look: [0, -0.8], aL: [lerp(0.12, -2.8, throwK), -0.2], aR: [lerp(-0.12, 2.8, throwK), 0.2], key: 'bl', eyes: 'squint' });
  for (let i = 0; i < 16; i++) { const u = clamp((t - 0.3 - i * 0.03) / 1.4); if (u <= 0) continue; const R = RNG('bill', i), x = 380 + (R.f() - 0.5) * 900 * u, y = 560 - Math.sin(u * Math.PI) * 300 + u * 400;
    ctx.save(); ctx.translate(x, y); ctx.rotate(u * R.r(-6, 6)); fnRect(-50, -66, 100, 132, '#f4efe2'); fnRect(-50, -66, 100, 22, i % 3 ? '#2a57c9' : '#c0392b'); fnMono(i % 2 ? 'BOLETO' : 'CONTA', 0, -55, 13, '#fff'); for (let k = 0; k < 4; k++) fnRect(-36, -30 + k * 18, 72, 5, '#999'); fnBold('R$', 0, 45, 22, '#c0392b'); ctx.restore(); }
  fnTag('SEM BOLETO', 540, 400, ATS(1.0), FN.red, 34);
};
SCENE.smash = () => {
  const t = LT(); fnBedroom(); fnWash('#000020', 0.2);
  const hit = clamp((t - 0.35) / 0.12), smashed = t > 0.47;
  fnAlarmClock(560, 900 + (smashed ? 30 : 0), smashed ? 0.95 : 1.0, { ring: smashed ? 0 : 1, label: 'SEG' });
  if (smashed) for (let i = 0; i < 10; i++) { const u = clamp((t - 0.47) / 0.7), a = -Math.PI * (0.1 + 0.8 * i / 9); ctx.save(); ctx.translate(560 + Math.cos(a) * 360 * u, 880 + Math.sin(a) * 360 * u + 400 * u * u); ctx.rotate(u * 8 + i); if (i % 2) fnStroke(arcPts(0, 0, 18, 0, TAU * 1.5, 14), 4, '#c9ccd8'); else fnRect(-10, -6, 20, 12, '#e04a3a'); ctx.restore(); }
  // Rafael's fist coming down from above
  ctx.save(); ctx.translate(560, lerp(200, 760, EZ.i2(hit))); fnRR(-60, -700, 120, 640, 50, FN.hood); fnCirc(0, -40, 70, FN.skin); fnRR(-60, -70, 120, 50, 20, FN.skinD); ctx.restore();
  if (smashed) { fnTag('POW!', 760, 620, ATS(0.47), FN.yellow, 50, FN.navy0); }
};
SCENE.oneclock = () => {
  const t = LT(); fnSky('#0a0d26', '#03040c');
  fnCone(540, -100, 0, 1300, 380, 'rgba(255,240,200,0.9)', 0.3, 20);
  fnAlarmClock(540, 820, 1.3 + Math.sin(TT * 2) * 0.02, {});
  fnRafael(160, 1250, 1.1, { eyes: 'squint', brow: 'angry', mouth: 'frown', look: [1, 0], key: 'oc', side: 0.4 });
};
function fnDigital(x, y, s, txt, col = FN.red) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fnRR(-330, -150, 660, 300, 40, '#16171f'); fnRR(-300, -120, 600, 240, 20, '#0a0b10'); ctx.font = `900 170px ${FONT_MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'rgba(255,60,80,0.12)'; ctx.fillText('8888', 0, 10); ctx.fillStyle = col; ctx.fillText(txt, 0, 10); ctx.restore(); fnGlow(x, y, 400 * s, col, 0.35); }
SCENE.alarm3026 = () => {
  const t = LT(); fnSky('#10142e', '#05070f'); fnGridBG('rgba(255,60,80,0.06)', 70);
  const yr = t < 0.9 ? String(2026 + Math.floor(EZ.o3(clamp(t / 0.9)) * 1000)) : '3026';
  fnDigital(540, 760, 1.15, yr, t >= 0.9 ? FN.red : '#ff8a96');
  fnMono('DESPERTADOR PROGRAMADO PARA:', 540, 520, 30, '#ffb0b8');
  if (t > 0.9) fnTag('ANO 3026', 540, 1010, ATS(0.9), FN.red, 40);
};
SCENE.alarmzoom = () => {
  const t = LT(); fnSky('#10142e', '#05070f');
  fnDigital(540, 760, 1.15, mod(TT, 1) < 0.5 ? '3026' : '30:26', FN.red);
  for (let i = 0; i < 3; i++) { ctx.lineWidth = 4; ctx.strokeStyle = `rgba(255,60,80,${0.4 - i * 0.12})`; ctx.beginPath(); ctx.arc(540, 760, 420 + i * 40 + mod(TT * 60, 40), 0, TAU); ctx.stroke(); }
  fnMono('FALTAM: 1000 ANOS', 540, 1000, 32, '#ffb0b8');
};
SCENE.bunker = () => {
  const t = LT(); fnSky('#ffb07a', '#7a6ac8', -200, 1200);
  fnPoly([[-400, 1000], [200, 450], [540, 380], [880, 450], [1480, 1000]], '#4a5a8a'); fnPoly([[-400, 1000], [300, 600], [540, 560], [780, 600], [1480, 1000]], '#3a4878');
  const open = springMove(ATS(0.3), 0, 1, SPRING.heavy);
  ctx.save(); ctx.translate(540, 820); fnCirc(0, 0, 260, '#2a2f48'); fnCirc(0, 0, 230, '#0b0f24'); fnGlow(0, 0, 260, 'rgba(120,180,255,0.6)', open);
  ctx.save(); ctx.rotate(open * 1.6); ctx.beginPath(); ctx.arc(0, 0, 230, 0, TAU); ctx.clip(); ctx.translate(open * 470, 0);
  fnCirc(0, 0, 230, '#8a90a8'); for (let i = 0; i < 8; i++) { const a = i / 8 * TAU; fnCirc(Math.cos(a) * 190, Math.sin(a) * 190, 14, '#5a6078'); } fnCirc(0, 0, 70, '#5a6078'); fnRR(-120, -14, 240, 28, 10, '#5a6078'); ctx.restore();
  fnBold('BUNKER 01 · BRASIL', 0, -300, 36, '#ffffff', 'center', 8); ctx.restore();
  fnRect(-300, 1000, W + 600, 900, '#5a6a50');
  // the crowd walking in
  for (let i = 0; i < 22; i++) { const R = RNG('crowd', i), u = mod(t * 0.35 + R.f(), 1), side = i % 2 ? 1 : -1, x = 540 + side * lerp(600, 60, u), y = lerp(1250, 1010, u), s = lerp(0.6, 0.25, u);
    if (u > 0.95) continue; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const c = ['#e85a7a', '#4aa8ff', '#ffd23f', '#7ad866', '#a47ef0', '#ff9a3a'][i % 6]; fnRR(-30, -150, 60, 110, 20, c); fnCirc(0, -180, 30, ['#c4865a', '#f0c9a8', '#7a4a2a'][i % 3]); fnStroke([[-12, -40], [-12 + Math.sin(TT * 8 + i) * 12, 0]], 14, '#232a4f'); fnStroke([[12, -40], [12 - Math.sin(TT * 8 + i) * 12, 0]], 14, '#232a4f'); ctx.restore(); }
};
SCENE.robots = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#141a3a'); fnGridBG('rgba(120,180,255,0.06)', 90);
  for (let i = 0; i < 5; i++) { fnRR(-200 + i * 300, 360, 240, 160, 12, '#1d2448'); fnRR(-185 + i * 300, 375, 210, 130, 8, '#0b2a3a'); const P = []; for (let k = 0; k <= 20; k++) P.push([-180 + i * 300 + k * 10, 440 + (k % 6 === 3 ? -40 : 0) + Math.sin(TT * 4 + k) * 3]); fnStroke(P, 3, '#4aff9a'); }
  fnRect(-300, 1150, W + 600, 900, '#1d2448'); for (let i = 0; i < 10; i++) fnRect(-300 + i * 160, 1150, 4, 900, 'rgba(255,255,255,0.05)');
  [[mod(-200 + t * 300, 1500) - 200, 1, true], [mod(800 - t * 260, 1500) - 200, -1, false], [540, 1, false]].forEach(([x, f, tray], i) => fnRobot(x, 1150 - (i === 2 ? 40 : 0), i === 2 ? 1.6 : 1.2, { face: f, tray, arm: i === 2 ? (0.5 + 0.5 * Math.sin(TT * 4)) : 0 }));
  fnTag('SUPORTE DE VIDA: OK', 540, 640, ATS(0.4), FN.green, 28);
};
SCENE.pod = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#141a3a'); for (let i = 0; i < 6; i++) fnAlpha(0.5, () => fnPod(-100 + i * 260, 640, 0.35));
  fnRect(-300, 1150, W + 600, 900, '#1d2448');
  const lie = springMove(ATS(0.2), 0, 1, SPRING.smooth);
  fnPod(540, 1100, 1.2);
  fnRafaelLying(lerp(540, 300, lie), 1000, 0.95, lerp(1, 0, lie), { mouth: 'smile', brow: 'n', look: [0, -0.5], key: 'pd' });
  const catJ = clamp((t - 0.6) / 0.5); fnCat(lerp(1000, 760, catJ), 1010 - Math.sin(catJ * Math.PI) * 160, 0.9, { face: -1, look: [-1, 0] });
  fnPodLid(540, 1100, 1.2, 0, 0);
};
SCENE.eyes = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#0e1236'); fnGlow(540, 700, 600, 'rgba(120,180,255,0.4)', 0.7);
  const close = clamp(t / 0.7);
  fnRafael(540, feetFor(740, 3.3), 3.3, { eyes: close > 0.85 ? 'closed' : 'open', lid: close * 0.9, brow: 'n', mouth: 'smile', key: 'ey', shadow: false, blink: false, tilt: 0.05 });
  const lid = springMove(ATS(0.5), 0, 1, SPRING.heavy);
  ctx.save(); ctx.translate(540, lerp(-900, 0, lid)); ctx.fillStyle = 'rgba(170,210,255,0.28)'; ctx.fillRect(-900, -1000, 1800, 1700); fnLine(-900, 700, 900, 700, 14, 'rgba(220,235,255,0.8)'); ctx.restore();
  if (t > 0.9) fnParticles('frost', 40, 'rgba(255,255,255,0.4)', { speed: 10, size: 6 });
};
SCENE.counter = () => {
  const t = LT(); fnSky('#0e1446', '#05070f'); fnCity(1150, { seed: 9 });
  const n = Math.max(0, 8000000000 * (1 - EZ.o3(clamp(t / 1.4))));
  fnRR(110, 560, 860, 260, 20, 'rgba(11,15,36,0.92)'); ctx.lineWidth = 4; ctx.strokeStyle = FN.red; ctx.beginPath(); ctx.roundRect(110, 560, 860, 260, 20); ctx.stroke();
  fnMono('PESSOAS NA SUPERFÍCIE', 540, 620, 30, '#ff9aa4'); fnBold(fmtN(n), 540, 720, 110, n < 1 ? FN.red : '#ffffff');
  for (let i = 0; i < 40; i++) { const R = RNG('ppl', i), off = R.f() * 1.3; if (t < off) fnCirc(R.r(60, 1020), R.r(950, 1140), 6, '#ffd23f'); else if (t - off < 0.2) fnCirc(R.r(60, 1020), R.r(950, 1140), 14 * (1 - (t - off) / 0.2), 'rgba(255,255,255,0.6)'); }
};
SCENE.emptycity = () => {
  const t = LT(); fnSky('#ffb07a', '#5a6ac8', -200, 1100); fnCity(1050, { seed: 11, cols: ['#3a4280', '#454d90', '#2f3670'] });
  fnRect(-300, 1050, W + 600, 900, '#3a3f5a'); for (let i = 0; i < 8; i++) fnRect(-200 + i * 180 - mod(TT * 40, 180), 1180, 100, 14, '#e8e8ee');
  fnRR(100, 920, 260, 110, 30, '#c0392b'); fnCirc(160, 1030, 30, '#15161c'); fnCirc(300, 1030, 30, '#15161c'); fnRR(130, 940, 90, 50, 8, '#1d2748');   // a stopped car, door open
  fnRR(680, 900, 300, 130, 30, '#ffd23f'); fnCirc(740, 1030, 30, '#15161c'); fnCirc(920, 1030, 30, '#15161c'); fnBold('TÁXI', 830, 950, 30, '#1a1a1a');
  fnRR(480, 780, 120, 60, 8, '#1fae4b'); fnMono('AV. PAULISTA', 540, 810, 14, '#fff'); fnRect(535, 840, 10, 200, '#3a3e4c');
  for (let i = 0; i < 6; i++) { const u = mod(TT * 0.5 + i / 6, 1); ctx.save(); ctx.translate(-100 + u * 1300, 1120 - Math.sin(u * 9 + i) * 40); ctx.rotate(u * 9); fnEll(0, 0, 16, 8, '#c98a3e'); ctx.restore(); }
  fnTag('NINGUÉM', 540, 520, ATS(0.5), FN.red, 34);
};
SCENE.earth = () => {
  const t = LT(); fnSky('#05061a', '#0a0d26'); fnStars(160, 'e');
  const gx = 540, gy = 800, gr = 380 + t * 20;
  fnGlow(gx, gy, gr * 1.5, 'rgba(60,110,255,0.4)', 0.8); fnCirc(gx, gy, gr, '#1f3a8a');
  ctx.save(); ctx.beginPath(); ctx.arc(gx, gy, gr, 0, TAU); ctx.clip(); const rot = TT * 30;
  [[-120, -140, 150, 110], [110, -170, 130, 90], [60, 60, 120, 170], [-210, 40, 90, 70], [230, 10, 110, 130]].forEach(([lx, ly, rx, ry], i) => { const x = gx + mod(lx + rot + 600, 1200) - 600; fnEll(x, gy + ly, rx, ry, '#2f9a5e', i * 0.4); });
  fnCirc(gx + gr * 0.4, gy + gr * 0.3, gr, 'rgba(0,0,30,0.45)'); ctx.restore();
  fnRing(gx, gy, gr + 40, 'rgba(110,170,255,0.5)');
  const q = fnPop(ATS(1.6)); if (q > 0) { ctx.save(); ctx.translate(540, 360); ctx.scale(q, q); fnBold('?', 0, 0, 160, FN.yellow, 'center', 12); ctx.restore(); }
};
