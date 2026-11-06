// =====================================================================
//  SCENES B — 24h, uma semana (26.31 – 48.01s)
// =====================================================================
// full-screen time card: big label, a year counter rolling, a progress bar of the 1000 years
function fnTimeCard(big, year, frac) {
  const t = LT(); fnSky('#1a1f5a', '#070a1c'); fnGridBG('rgba(255,210,63,0.06)', 80);
  for (let i = 0; i < 10; i++) { ctx.save(); ctx.translate(540, 760); ctx.rotate(i / 10 * TAU + TT * 0.4); fnPoly([[0, 0], [1500, -60], [1500, 60]], 'rgba(255,210,63,0.05)'); ctx.restore(); }
  const k = fnPop(ATS(0.02), 0.3); ctx.save(); ctx.translate(540, 720); ctx.scale(k, k);
  fnBold(big, 0, 0, 120, FN.yellow, 'center', 14); ctx.restore();
  const k2 = fnPop(ATS(0.18), 0.25); ctx.save(); ctx.translate(540, 870); ctx.scale(k2, k2); fnRR(-170, -40, 340, 80, 40, 'rgba(11,15,36,0.9)'); fnMono('ANO ' + year, 0, 2, 40, '#ffffff'); ctx.restore();
  const w = 760, x0 = 160, y = 1010; fnRR(x0, y, w, 20, 10, 'rgba(255,255,255,0.15)'); fnRR(x0, y, Math.max(20, w * frac * clamp(t / 0.4)), 20, 10, FN.yellow);
  fnMono('2026', x0, y + 50, 22, '#9aa0c0', 'left'); fnMono('3026', x0 + w, y + 50, 22, '#9aa0c0', 'right');
  fnAlarmClock(540, 470, 0.5, {});
}
SCENE.tag24 = () => fnTimeCard('24 HORAS DEPOIS', '2026', 0.001);
SCENE.tag1w = () => fnTimeCard('1 SEMANA DEPOIS', '2026', 0.003);
SCENE.tag1m = () => fnTimeCard('1 MÊS DEPOIS', '2026', 0.006);
SCENE.tag1y = () => fnTimeCard('1 ANO DEPOIS', '2027', 0.012);
SCENE.tag5y = () => fnTimeCard('5 ANOS DEPOIS', '2031', 0.05);
SCENE.tag10y = () => fnTimeCard('10 ANOS DEPOIS', '2036', 0.1);
SCENE.power = () => {
  const t = LT(); fnSky('#1a1f4a', '#06081a');
  fnRR(140, 380, 800, 700, 20, '#2a2f48'); fnRR(170, 410, 740, 640, 14, '#1d2238');
  const off = t > 0.6; const fl = !off && mod(TT * 13, 1) < 0.3;
  for (let i = 0; i < 6; i++) { const x = 230 + i * 120; fnRR(x, 460, 80, 180, 10, '#3a3e4c'); fnCirc(x + 40, 500, 18, off ? '#3a1a22' : (fl && i % 2 ? '#3a1a22' : FN.green)); fnRR(x + 25, 560, 30, 60, 6, '#14161f'); }
  // the big lever drops
  const lv = springMove(ATS(0.5), 0, 1, SPRING.snappy);
  ctx.save(); ctx.translate(540, 860); fnRR(-120, -40, 240, 80, 20, '#3a3e4c'); ctx.rotate(lerp(-0.8, 0.8, lv)); fnRR(-12, -200, 24, 200, 10, '#c9ccd8'); fnCirc(0, -200, 34, FN.red); ctx.restore();
  fnBold(off ? 'OFF' : 'ON', 540, 990, 60, off ? FN.red : FN.green);
  if (t > 0.5 && t < 0.9) for (let i = 0; i < 14; i++) { const R = RNG('spk', i, B), a = R.r(0, TAU), r = R.r(20, 160); fnLine(540 + Math.cos(a) * 20, 700 + Math.sin(a) * 20, 540 + Math.cos(a) * r, 700 + Math.sin(a) * r, 4, '#fff3a0'); }
  if (off) fnWash('#000010', 0.4);
};
SCENE.blackout = () => {
  const t = LT(); fnSky('#0e1446', '#05070f'); fnStars(60, 'bo');
  const R = RNG('city2'); let x = -300;
  while (x < W + 300) { const w = R.r(120, 230), h = R.r(400, 1000); fnRect(x, 1250 - h, w, h, '#232a5e');
    for (let wy = 1250 - h + 30; wy < 1210; wy += 46) for (let wx = x + 18; wx < x + w - 30; wx += 40) { const v = R.f(); const off = t > 0.15 + ((wy - 300) / 900) * 0.8 + v * 0.1; fnRect(wx, wy, 22, 28, v < 0.5 && !off ? 'rgba(245,199,90,0.9)' : 'rgba(10,14,40,0.6)'); }
    x += w + 8; }
  fnRect(-300, 1250, W + 600, 900, '#0b0f24');
};
SCENE.wifi = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#1d2448'); fnRect(-300, 1050, W + 600, 900, '#4a3424');
  fnRR(330, 900, 420, 150, 30, '#16171f'); for (let i = 0; i < 4; i++) { const on = t < 0.25 + i * 0.12; fnCirc(400 + i * 90, 990, 12, on ? FN.green : '#2a2e3a'); if (on) fnGlow(400 + i * 90, 990, 40, FN.green, 0.6); }
  fnLine(400, 900, 360, 760, 14, '#16171f'); fnLine(680, 900, 720, 760, 14, '#16171f');
  for (let i = 0; i < 3; i++) { const on = t < 0.6 - i * 0.15; ctx.lineWidth = 18; ctx.strokeStyle = on ? '#4aa8ff' : 'rgba(255,255,255,0.08)'; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(540, 700, 80 + i * 80, -2.4, -0.74); ctx.stroke(); }
  fnCirc(540, 700, 20, t < 0.6 ? '#4aa8ff' : 'rgba(255,255,255,0.1)');
  if (t > 0.65) { const k = fnPop(ATS(0.65)); ctx.save(); ctx.translate(540, 560); ctx.scale(k, k); fnLine(-160, -100, 160, 140, 20, FN.red); ctx.restore(); fnTag('SEM INTERNET', 540, 400, ATS(0.7), FN.red, 32); }
};
function fnPhoneScreen(empty) {
  fnRect(-115, -232, 230, 464, '#141a3a'); fnMono('09:41', 0, -190, 22, '#ffffff');
  if (!empty) { for (let i = 0; i < 4; i++) { fnRR(-100, -140 + i * 76, 200, 64, 12, 'rgba(255,255,255,0.15)'); fnRR(-88, -128 + i * 76, 36, 36, 8, ['#25d366', '#e1306c', '#1da1f2', '#ff0000'][i]); fnRect(-40, -124 + i * 76, 120, 10, 'rgba(255,255,255,0.6)'); fnRect(-40, -104 + i * 76, 90, 8, 'rgba(255,255,255,0.35)'); } }
  else { ctx.save(); ctx.translate(0, -30); fnPoly([[-40, 30], [-30, -20], [0, -40], [30, -20], [40, 30]], '#9aa0c0'); fnCirc(0, 40, 10, '#9aa0c0'); ctx.restore(); fnMono('Nenhuma', 0, 60, 22, '#9aa0c0'); fnMono('notificação', 0, 90, 22, '#9aa0c0'); fnBold('z', 50 + Math.sin(TT * 2) * 6, -90 - mod(TT * 20, 30), 30, '#cfe0ff'); }
}
SCENE.phone = () => {
  const t = LT(); fnBedroom(); fnWash('#000020', 0.45);
  fnRR(200, 980, 700, 40, 10, '#6a4a30'); fnRect(240, 1020, 30, 200, '#5a3d28'); fnRect(830, 1020, 30, 200, '#5a3d28');
  ctx.save(); ctx.translate(540, 900); ctx.rotate(-Math.PI / 2 * 0.0); fnPhone(0, 0, 0.55, { screen: () => fnPhoneScreen(t > 1.1) }); ctx.restore();
  fnGlow(540, 900, 260, 'rgba(120,160,255,0.5)', t > 1.1 ? 0.2 : 0.6);
};
SCENE.nonotif = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#0e1236');
  fnPhone(540, 760, 1.25, { screen: () => fnPhoneScreen(true) });
  fnBubble('0', 820, 420, ATS(0.4), { size: 70, bg: FN.red, fg: '#ffffff' });
};
SCENE.vegas = () => {
  const t = LT(); fnSky('#2a0a4a', '#0a0420'); fnStars(40, 'lv');
  const cols = ['#ff3fa4', '#4aa8ff', '#ffd23f', '#33d16a', '#ff7a3a'];
  for (let i = 0; i < 6; i++) { const x = -100 + i * 230, h = 500 + (i % 3) * 180; fnRect(x, 1150 - h, 200, h, '#1a0f30'); for (let k = 0; k < 6; k++) { const on = mod(TT * 3 + i + k, 2) < 1.4; fnRect(x + 20, 1150 - h + 30 + k * 70, 160, 14, on ? cols[(i + k) % 5] : '#2a1a40'); if (on) fnGlow(x + 100, 1150 - h + 37 + k * 70, 90, cols[(i + k) % 5], 0.25); } }
  // the welcome sign
  ctx.save(); ctx.translate(540, 640); fnRect(-8, 0, 16, 420, '#c9ccd8'); fnPoly([[-260, -190], [260, -190], [230, 150], [-230, 150]], '#f6f2e6');
  for (let i = 0; i < 20; i++) { const a = i / 20 * TAU; fnCirc(Math.cos(a) * 240, Math.sin(a) * 160 - 20, 8, mod(TT * 8 + i, 2) < 1 ? '#ffd23f' : '#c0302a'); }
  fnMono('WELCOME TO', 0, -110, 30, '#c0302a'); fnBold('LAS VEGAS', 0, -30, 80, '#c0302a'); fnMono('NEVADA', 0, 60, 26, '#2a57c9'); ctx.restore();
  fnGlow(540, 600, 500, 'rgba(255,80,180,0.35)', 0.8);
  fnRect(-300, 1150, W + 600, 900, '#140a24'); for (let i = 0; i < 5; i++) fnRect(-200 + i * 300 - mod(TT * 40, 300), 1300, 160, 14, '#ffd23f');
};
SCENE.casino = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#3a0a1a'); for (let i = 0; i < 30; i++) fnCirc(-200 + (i % 10) * 160, 200 + Math.floor(i / 10) * 80, 10, mod(TT * 6 + i, 2) < 1 ? '#ffd23f' : '#5a2a1a');
  fnRect(-300, 1150, W + 600, 900, '#5a0a1a'); const R = RNG('carpet'); for (let i = 0; i < 60; i++) fnCirc(R.r(-300, 1380), R.r(1150, 1920), R.r(6, 16), 'rgba(255,210,63,0.25)');
  [[200, 0.7], [880, 0.7], [540, 1.0]].forEach(([x, s], j) => { ctx.save(); ctx.translate(x, 1150); ctx.scale(s, s);
    fnRR(-170, -620, 340, 620, 30, '#c0302a'); fnRR(-150, -580, 300, 90, 16, '#ffd23f'); fnBold('JACKPOT', 0, -535, 46, '#c0302a');
    fnRR(-140, -460, 280, 170, 12, '#ffffff'); for (let k = 0; k < 3; k++) { const sp = j === 2 && t < 0.9 + k * 0.2; const sym = sp ? ['7', '$', '★', '♦'][Math.floor(TT * 20 + k) % 4] : '7'; fnBold(sym, -90 + k * 90, -375 + (sp ? mod(TT * 400, 60) - 30 : 0), 80, '#c0302a'); }
    fnRR(140, -470, 20, 140, 10, '#c9ccd8'); fnCirc(150, -480, 26, '#c0302a'); fnRR(-120, -240, 240, 60, 10, '#3a0a1a');
    ctx.restore(); fnGlow(x, 1150 - 500 * s, 300 * s, '#ffd23f', 0.3); });
  if (t > 1.0) for (let i = 0; i < 18; i++) { const u = clamp((t - 1.0) / 0.6), a = -Math.PI * (0.15 + 0.7 * i / 17); fnCirc(540 + Math.cos(a) * 400 * u, 920 + Math.sin(a) * 400 * u + 600 * u * u, 16, '#ffd23f'); }
};
SCENE.nobody = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#2a0a1a'); fnRect(-300, 1150, W + 600, 900, '#4a0a1a');
  fnCone(540, -100, 0, 1400, 360, 'rgba(255,230,180,0.9)', 0.3, 30);
  for (let i = 0; i < 5; i++) { const x = 140 + i * 200; fnRR(x - 50, 1000, 100, 30, 10, '#c0302a'); fnRect(x - 6, 1030, 12, 120, '#c9ccd8'); fnRR(x - 50, 900, 100, 110, 20, '#9a1a2a'); }
  const tw = mod(t * 0.6, 1); ctx.save(); ctx.translate(lerp(-150, 1200, tw), 1110 - Math.abs(Math.sin(tw * 20)) * 50); ctx.rotate(tw * 20); ctx.lineWidth = 6; ctx.strokeStyle = '#a07a40'; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(0, 0, 30 + k * 6, k, k + 4); ctx.stroke(); } ctx.restore();
  fnTag('0 JOGADORES', 540, 560, ATS(0.3), FN.red, 34);
};
function fnKitchen(o = {}) {
  fnRect(-300, -300, W + 600, H + 600, o.wall || '#3a4a6a'); for (let y = 300; y < 900; y += 60) for (let x = -300; x < 1400; x += 60) fnRect(x + 2, y + 2, 56, 56, 'rgba(255,255,255,0.05)');
  fnRect(-300, 1150, W + 600, 900, '#5a4a3a'); for (let i = 0; i < 16; i++) fnRect(-300 + i * 100, 1150, 4, 900, 'rgba(0,0,0,0.15)');
  fnRect(-300, 900, 1000, 250, '#6a4a30'); fnRect(-300, 880, 1000, 30, '#c9ccd8'); for (let i = 0; i < 4; i++) fnRR(-260 + i * 240, 940, 200, 180, 10, '#5a3d28');
  fnRR(60, 300, 380, 300, 10, '#1a1f44'); ctx.save(); ctx.beginPath(); ctx.rect(80, 320, 340, 260); ctx.clip(); fnSky('#0e1446', '#2a3170', 320, 580); fnCirc(330, 400, 40, '#f6f0d0'); ctx.restore();
  fnRR(760, 380, 300, 770, 20, '#dfe4ee'); fnRect(760, 700, 300, 8, '#b0b8c8'); fnRR(790, 500, 16, 120, 8, '#9aa0b0'); fnRR(790, 760, 16, 160, 8, '#9aa0b0');   // fridge
}
SCENE.raccoon = () => {
  const t = LT(); fnKitchen();
  const u = clamp(t / 1.2), jump = clamp((t - 1.2) / 0.5);
  if (t < 1.2) fnRaccoon(lerp(150, 330, u), 600, 0.9, { walk: TT * 2, look: [1, 0], face: 1 });   // on the window sill
  else fnRaccoon(lerp(330, 520, jump), 880 - Math.sin(jump * Math.PI) * 200 + (jump >= 1 ? 0 : 0), 1.0, { walk: 0, look: [1, 0.3], face: 1, mouth: 'open' });
  fnTag('INTRUSO DETECTADO', 540, 360, ATS(0.6), FN.red, 26);
};
SCENE.fridge = () => {
  const t = LT(); fnKitchen({ wall: '#2a3a5a' }); fnWash('#000020', 0.3);
  const open = springMove(ATS(0.1), 0, 1, SPRING.smooth);
  ctx.save(); ctx.translate(540, 780); fnRR(-220, -420, 440, 840, 20, '#c9d0de'); fnRR(-200, -400, 400, 800, 14, '#2a3036');
  for (let i = 0; i < 3; i++) fnRect(-200, -200 + i * 200, 400, 8, '#4a5058');
  fnRR(-150, -170, 90, 60, 8, '#6a7a3a'); fnRR(30, -180, 70, 70, 30, '#5a6a2a'); fnRR(-120, 30, 110, 50, 8, '#7a5a3a'); fnEll(80, 60, 50, 30, '#4a6a2a');
  for (let i = 0; i < 4; i++) fnStroke([[-140 + i * 90, -150 + (i % 2) * 200], [-140 + i * 90 + Math.sin(TT * 3 + i) * 10, -120 + (i % 2) * 200 - 40]], 6, 'rgba(140,200,120,0.4)');   // stink
  ctx.save(); ctx.translate(-220, 0); ctx.scale(Math.cos(open * 1.4), 1); fnRR(0, -420, 440, 840, 20, '#dfe4ee'); ctx.restore();
  ctx.restore();
  for (let i = 0; i < 6; i++) { const x = 540 + Math.sin(TT * 5 + i * 2) * 200, y = 600 + Math.cos(TT * 4 + i) * 160; fnCirc(x, y, 7, '#111'); fnEll(x - 6, y - 6, 7, 4, 'rgba(255,255,255,0.6)'); fnEll(x + 6, y - 6, 7, 4, 'rgba(255,255,255,0.6)'); }
  fnBold('0°C → 28°C', 540, 360, 50, FN.red, 'center', 8);
};
SCENE.cookies = () => {
  const t = LT(); fnKitchen();
  const pull = springMove(ATS(0.1), 0, 1, SPRING.playful);
  fnRaccoon(540, 1150, 1.6, { stand: true, look: [0, -0.2], mouth: t > 0.6 ? 'chew' : 'open', tilt: Math.sin(TT * 3) * 0.05,
    hold: () => { ctx.save(); ctx.translate(0, -110 - pull * 20); ctx.rotate(-0.1); fnRR(-50, -40, 100, 70, 10, '#2a57c9'); fnBold('BISCOITO', 0, -8, 18, '#ffd23f'); fnCirc(-20, 18, 12, '#c98a3e'); fnCirc(10, 18, 12, '#c98a3e'); ctx.restore(); } });
  if (t > 0.5) for (let i = 0; i < 10; i++) { const u = mod(TT * 1.4 + i / 10, 1); fnCirc(540 + (i - 5) * 18 + u * 30 * Math.sin(i), 960 + u * 200, 5, '#c98a3e'); }
};
SCENE.resident = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#3a2a5a'); fnRect(-300, 1150, W + 600, 900, '#5a4a6a');
  fnRR(140, 820, 800, 300, 60, '#e85a7a'); fnRR(140, 760, 800, 120, 50, '#c84a6a'); fnRR(100, 860, 120, 260, 40, '#c84a6a'); fnRR(860, 860, 120, 260, 40, '#c84a6a');
  fnRaccoon(540, 1000, 1.4, { stand: true, shades: true, look: [0.5, 0], tilt: 0.1, mouth: 'chew' });
  for (let i = 0; i < 30; i++) { const R = RNG('conf', i), u = mod(t * 0.7 + R.f(), 1); ctx.save(); ctx.translate(R.r(0, 1080), -100 + u * 1500); ctx.rotate(u * 12 + i); fnRect(-8, -4, 16, 8, ['#ffd23f', '#33d16a', '#4aa8ff', '#ff5fb0'][i % 4]); ctx.restore(); }
  const k = fnPop(ATS(0.25)); ctx.save(); ctx.translate(540, 470); ctx.scale(k, k); ctx.rotate(-0.04); fnRR(-280, -60, 560, 120, 20, FN.green); fnBold('NOVO MORADOR', 0, 4, 64, '#ffffff'); ctx.restore();
};
SCENE.cat = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#141a3a'); fnGlow(540, 800, 600, 'rgba(120,180,255,0.35)', 0.8);
  fnPod(540, 1100, 1.5);
  fnRafaelLying(260, 990, 1.2, 0, { eyes: 'closed', mouth: 'smile', key: 'ct', blink: false });
  fnCat(720, 1000, 1.3, { sleep: true, face: -1 });
  fnPodLid(540, 1100, 1.5, 1, 0.5);
  fnMono('BATIMENTOS: 58 · TEMP: 36,5°', 540, 600, 24, '#8fd0ff');
};
