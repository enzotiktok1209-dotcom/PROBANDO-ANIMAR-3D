// =====================================================================
//  SCENES C — um mês → dez anos, CTA (48.01 – end)
// =====================================================================
function fnStreet(o = {}) {
  fnSky(o.sky0 || '#ffb07a', o.sky1 || '#6a7ac8', -200, 1100);
  const cols = ['#c27a4a', '#4a8ab0', '#8a5ab0', '#5aa070', '#d0a040'];
  for (let i = 0; i < 5; i++) { const x = -150 + i * 280, h = 620 + (i % 2) * 120; fnRect(x, 1080 - h, 260, h, cols[i]);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) fnRect(x + 30 + c * 75, 1080 - h + 40 + r * 120, 50, 70, (r + c + i) % 3 ? '#1d2448' : '#2a3170');
    fnRect(x, 1080 - 150, 260, 26, fnDark(cols[i], 0.3)); }
  fnRect(-300, 1080, W + 600, 900, '#4a4f5a'); fnRect(-300, 1080, W + 600, 30, '#6a6f7a');
  if (o.grass) { const R = RNG('grass'); for (let i = 0; i < 90 * o.grass; i++) { const x = R.r(-300, 1380), y = R.r(1090, 1800), h = R.r(20, 60) * o.grass; fnPoly([[x - 8, y], [x + Math.sin(TT * 2 + i) * 6, y - h], [x + 8, y]], i % 3 ? '#3aa860' : '#2f8a55'); } }
}
SCENE.wildcity = () => {
  const t = LT(); fnStreet({ grass: 1 });
  for (let i = 0; i < 4; i++) fnStroke([[-150 + i * 280 + 40, 460], [-150 + i * 280 + 20, 700], [-150 + i * 280 + 60, 1000]], 12, '#2f8a55');
  // a deer crosses the street
  const u = clamp(t / 2.1), x = lerp(-150, 1250, u), ph = TT * 2.4 * TAU;
  ctx.save(); ctx.translate(x, 1200); fnEll(0, 4, 90, 12, 'rgba(0,0,0,0.3)');
  [-50, 50].forEach((lx, i) => fnStroke([[lx, -110], [lx + Math.sin(ph + i * 3) * 20, -50], [lx + Math.sin(ph + i * 3) * 14, 0]], 12, '#8a5a30'));
  fnRR(-80, -170, 160, 70, 35, '#a8703a'); fnRR(50, -250, 34, 100, 14, '#a8703a'); fnEll(80, -260, 34, 24, '#a8703a'); fnCirc(90, -266, 5, '#111');
  fnStroke([[70, -280], [60, -330], [40, -350]], 6, '#6a4a2a'); fnStroke([[60, -330], [80, -360]], 6, '#6a4a2a'); ctx.restore();
  fnTag('VIDA SELVAGEM', 540, 400, ATS(0.4), FN.green, 30);
};
SCENE.cracks = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#5a5f6a'); const R = RNG('asph'); for (let i = 0; i < 300; i++) fnCirc(R.r(-300, 1380), R.r(-300, 2000), R.r(2, 6), 'rgba(0,0,0,0.12)');
  fnStroke([[100, 300], [300, 600], [260, 800], [540, 900], [700, 1100], [980, 1200]], 18, '#2a2d34'); fnStroke([[540, 900], [420, 1150]], 12, '#2a2d34');
  const g = clamp(t / 1.2);
  [[300, 600], [260, 800], [540, 900], [700, 1100], [420, 1150]].forEach(([x, y], i) => { for (let k = 0; k < 6; k++) { const h = (60 + k * 14) * EZ.o3(clamp(g * 1.4 - i * 0.12)); fnPoly([[x - 10 + k * 5, y], [x + (k - 3) * 14 + Math.sin(TT * 3 + k) * 5, y - h], [x + k * 5 + 6, y]], k % 2 ? '#33d16a' : '#2f8a55'); } });
  const f = fnPop(ATS(0.8)); if (f > 0) { ctx.save(); ctx.translate(540, 880); ctx.scale(f, f); for (let p = 0; p < 5; p++) fnCirc(Math.cos(p * 1.26) * 26, -60 + Math.sin(p * 1.26) * 26, 20, '#ffd23f'); fnCirc(0, -60, 16, '#ff7a3a'); ctx.restore(); }
};
SCENE.birds = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#8a5ab0'); for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) fnRect(80 + c * 330, 200 + r * 380, 240, 300, '#2a2148');
  ctx.save(); ctx.translate(540, 760); fnRR(-200, -180, 400, 300, 10, '#2a2148'); fnLine(-200, -180, 200, 120, 6, 'rgba(255,255,255,0.3)'); fnLine(200, -180, -200, 120, 6, 'rgba(255,255,255,0.3)');   // broken window
  fnEll(0, 100, 140, 40, '#8a6a3a'); for (let i = 0; i < 16; i++) fnLine(-130 + i * 16, 90 + (i % 3) * 8, -110 + i * 16, 110, 4, '#6a4a2a');
  [-60, 0, 60].forEach((x, i) => { const open = mod(TT * 3 + i, 1) < 0.5; ctx.save(); ctx.translate(x, 80); fnCirc(0, -10, 22, '#c9a37a'); fnPoly([[-8, -30], [0, -30 - (open ? 26 : 10)], [8, -30]], '#ff9a3a'); ctx.restore(); });
  ctx.restore();
  const u = clamp(t / 0.6); fnBird(lerp(1150, 600, u), lerp(400, 820, u), 2.2, '#5a6a8a', 0);
};
SCENE.lion = () => {
  const t = LT(); fnStreet({ grass: 0.6, sky0: '#ff9a6a', sky1: '#5a5aa8' });
  ctx.save(); ctx.translate(780, 760); fnRect(-220, -380, 440, 420, '#c0392b'); fnRR(-200, -360, 400, 70, 10, '#ffd23f'); fnBold('CHURRASCARIA', 0, -325, 40, '#c0392b'); fnRR(-60, -200, 120, 240, 10, '#5a3d28'); fnRR(-200, -260, 120, 100, 6, '#1d2448'); fnRR(80, -260, 120, 100, 6, '#1d2448');
  for (let i = 0; i < 8; i++) fnPoly([[-220 + i * 55, -280], [-165 + i * 55, -280], [-192 + i * 55, -240]], i % 2 ? '#ffffff' : '#c0392b'); ctx.restore();
  const u = clamp(t / 1.8), x = lerp(-200, 470, EZ.o2(u));
  fnLion(x, 1120, 1.0, { walk: u < 0.95 ? TT * 1.6 : 0, mood: u > 0.9 ? 'hungry' : 'n', look: [1, 0], face: 1, tilt: u > 0.9 ? -0.08 : 0 });
};
SCENE.closed = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#c0392b'); fnRR(240, 260, 600, 760, 14, '#5a3d28');
  const sw = Math.sin(TT * 4) * 0.08 * Math.exp(-t * 1.5);
  ctx.save(); ctx.translate(540, 480); ctx.rotate(sw); fnLine(-80, -120, 0, -40, 4, '#c9ccd8'); fnLine(80, -120, 0, -40, 4, '#c9ccd8'); fnRR(-180, -40, 360, 140, 14, '#ffffff'); fnBold('FECHADO', 0, 30, 70, FN.red); ctx.restore();
  fnLion(330, 1180, 1.25, { mood: 'annoyed', look: [1, -0.5], face: 1 });
  const stars = 1; const k = fnPop(ATS(0.7)); if (k > 0) { ctx.save(); ctx.translate(800, 820); ctx.scale(k, k); fnRR(-180, -60, 360, 120, 20, 'rgba(11,15,36,0.9)'); for (let i = 0; i < 5; i++) fnBold('★', -120 + i * 60, 0, 54, i < stars ? FN.yellow : '#4a4f6a'); ctx.restore(); fnTag('PÉSSIMO', 800, 940, ATS(0.9), FN.red, 30); }
};
SCENE.ship = () => {
  const t = LT(); fnSky('#ff9a6a', '#4a4a98', -200, 1000); fnCirc(820, 700, 90, '#ffe0a0');
  fnRect(-300, 900, W + 600, 1000, '#1d3a7a'); for (let i = 0; i < 20; i++) fnRect(mod(i * 173 + TT * 20, 1500) - 200, 920 + i * 30, 120, 4, 'rgba(255,255,255,0.15)');
  const drift = t * 30, rot = Math.sin(TT * 0.8) * 0.04;
  ctx.save(); ctx.translate(500 + drift, 940); ctx.rotate(rot);
  fnPoly([[-460, -60], [440, -60], [380, 80], [-420, 80]], '#2a2f48'); fnRect(-460, 0, 900, 20, '#c0392b');
  const cc = ['#c0392b', '#2a57c9', '#1f8a4e', '#d98b1a', '#7a3bb0']; for (let r = 0; r < 3; r++) for (let c = 0; c < 7; c++) fnRect(-380 + c * 100, -150 - r * 80, 94, 76, cc[(r * 3 + c) % 5]);
  fnRR(300, -360, 120, 300, 10, '#dfe4ee'); for (let k = 0; k < 4; k++) fnRect(315, -340 + k * 60, 90, 30, '#1d2448');
  ctx.restore();
  // the frayed rope
  fnStroke([[60, 1000], [200 + drift * 0.5, 960], [260 + drift, 920]], 6, '#c9a46a'); fnRect(0, 960, 80, 100, '#4a4f5a');
  fnTag('À DERIVA', 540, 420, ATS(0.5), '#2a57c9', 32);
};
SCENE.crash = () => {
  const t = LT(); fnSky('#ff9a6a', '#4a4a98', -200, 1000);
  fnRect(-300, 900, W + 600, 1000, '#1d3a7a'); fnRect(580, 820, 800, 400, '#6a6f7a');   // the dock
  const hit = t > 0.35, push = hit ? springMove(ATS(0.35), 0, 1, { k: 300, d: 14 }) : 0;
  ctx.save(); ctx.translate(lerp(120, 300, clamp(t / 0.35)) - push * 30, 960); ctx.rotate(push * 0.06);
  fnPoly([[-460, -60], [440, -60], [400, 80], [-420, 80]], '#2a2f48'); fnRect(-460, 0, 900, 20, '#c0392b');
  const cc = ['#c0392b', '#2a57c9', '#1f8a4e', '#d98b1a']; for (let r = 0; r < 3; r++) for (let c = 0; c < 7; c++) { if (r === 2 && c > 3 && hit) continue; fnRect(-380 + c * 100, -150 - r * 80, 94, 76, cc[(r + c) % 4]); }
  ctx.restore();
  if (hit) { const u = clamp((t - 0.35) / 0.8); [[700, 0], [820, 1], [940, 2]].forEach(([x, i]) => { ctx.save(); ctx.translate(x + u * 120, 640 + u * 260 + u * u * 200); ctx.rotate(u * (i + 1)); fnRect(-47, -38, 94, 76, cc[i]); ctx.restore(); });
    for (let i = 0; i < 16; i++) { const a = -Math.PI * (0.1 + 0.8 * i / 15); fnCirc(640 + Math.cos(a) * 300 * u, 920 + Math.sin(a) * 300 * u + 300 * u * u, 10 * (1 - u), '#bfe0ff'); } fnTag('CRASH!', 540, 460, ATS(0.36), FN.red, 50); }
};
SCENE.gulls = () => {
  const t = LT(); fnSky('#ffcf8a', '#7aa0d8', -200, 1100); fnRect(-300, 1050, W + 600, 900, '#a8a090'); for (let i = 0; i < 10; i++) fnRect(-300 + i * 150, 1050, 6, 900, 'rgba(0,0,0,0.1)');
  const tug = Math.sin(TT * 6) * 40;
  ctx.save(); ctx.translate(540 + tug, 1010); ctx.rotate(Math.sin(TT * 6) * 0.15); fnRR(-80, -60, 160, 110, 14, '#ffd23f'); fnBold('SALGADINHO', 0, -10, 22, '#c0392b'); fnPoly([[-80, -60], [-60, -80], [-40, -60], [-20, -80], [0, -60], [20, -80], [40, -60], [60, -80], [80, -60]], '#ffd23f'); ctx.restore();
  fnGull(300 + tug * 0.5, 1050, 2.0, { face: 1, flap: true, beakOpen: true });
  fnGull(780 + tug * 0.5, 1050, 2.0, { face: -1, flap: true, beakOpen: mod(TT * 4, 1) < 0.5 });
  fnGull(540, 600 + Math.sin(TT * 3) * 20, 1.4, { face: 1, fly: true });
  for (let i = 0; i < 8; i++) { const u = mod(TT * 2 + i / 8, 1); fnEll(540 + (i - 4) * 40, 900 - u * 200, 10, 6, `rgba(255,255,255,${1 - u})`); }
};
SCENE.cafe = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#5a3d28'); fnRect(-300, 1100, W + 600, 900, '#7a5034');
  fnRR(100, 300, 880, 200, 14, '#2a1a12'); fnBold('CAFÉ DA ESQUINA', 540, 380, 60, '#ffd23f'); fnMono('EXPRESSO · PÃO DE QUEIJO', 540, 450, 24, '#f4e0c0');
  fnRect(-300, 820, 1100, 280, '#8a5a3a'); fnRect(-300, 800, 1100, 30, '#c9a46a'); fnRR(260, 640, 200, 160, 20, '#3a3e4c'); fnRR(290, 600, 140, 50, 10, '#2a2d38');   // counter + espresso machine
  for (let i = 0; i < 4; i++) fnRR(560 + i * 80, 760, 50, 40, 8, '#e8e0d0');
  fnParticles('cd', 40, 'rgba(255,240,200,0.3)', { speed: 15, size: 3 });
  fnStroke([[900, 300], [940, 600], [900, 900]], 14, '#2f8a55'); fnWash('#203020', 0.15);
  fnTag('FECHADO HÁ 1 ANO', 540, 600, ATS(0.5), '#8a6a3a', 28);
};
SCENE.tree = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#5a3d28'); fnRect(-300, 1100, W + 600, 900, '#7a5034');
  const g = EZ.o3(clamp(t / 1.1));
  // the floor cracks open, a tree bursts up
  fnPoly([[340, 1100], [740, 1100], [700, 1140], [380, 1140]], '#2a1a10'); for (let i = 0; i < 6; i++) { ctx.save(); ctx.translate(540 + (i - 3) * 70, 1100 - g * 40); ctx.rotate((i - 3) * 0.3 * g); fnRect(-30, -10, 60, 20, '#8a5a3a'); ctx.restore(); }
  fnRR(500, 1100 - 700 * g, 80, 700 * g, 30, '#6a4a2a'); fnStroke([[540, 1100 - 500 * g], [400, 1100 - 650 * g]], 24, '#6a4a2a'); fnStroke([[540, 1100 - 560 * g], [700, 1100 - 720 * g]], 24, '#6a4a2a');
  [[540, 360], [400, 440], [700, 420], [470, 300], [620, 300]].forEach(([x, y], i) => fnCirc(x, 1100 - (1100 - y) * g, 150 * g, i % 2 ? '#2f8a55' : '#3aa860'));
  if (t > 0.3) fnParticles('leaf', 20, 'rgba(80,200,120,0.7)', { speed: 80, size: 7 });
  const k = fnPop(ATS(0.9)); if (k > 0) { ctx.save(); ctx.translate(820, 1000); ctx.scale(k, k); fnRR(-60, -40, 120, 70, 10, '#e8e0d0'); fnBold('☕', 0, -5, 40, '#5a3d28'); ctx.restore(); }
};
SCENE.beach = () => {
  const t = LT(); fnSky('#4aa8ff', '#bfe6ff', -200, 900); fnCirc(860, 360, 90, '#fff0a0'); fnGlow(860, 360, 300, '#fff0a0', 0.6);
  fnPoly([[-300, 900], [200, 760], [420, 800], [600, 700], [900, 820], [1380, 760], [1380, 900]], '#3a6a8a');   // Pão de Açúcar-ish hills
  fnRect(-300, 900, W + 600, 200, '#2a8ad0'); for (let i = 0; i < 8; i++) fnRect(mod(i * 190 + TT * 40, 1500) - 200, 920 + i * 20, 140, 6, 'rgba(255,255,255,0.4)');
  fnRect(-300, 1100, W + 600, 900, '#f2d9a0'); for (let i = 0; i < 14; i++) fnRect(-300 + i * 110, 1100, 60, 900, i % 2 ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)');
  ctx.save(); ctx.translate(780, 1100); fnRect(-8, -600, 16, 600, '#8a5a3a'); for (let i = 0; i < 6; i++) { ctx.save(); ctx.translate(0, -600); ctx.rotate(-1.2 + i * 0.5 + Math.sin(TT * 1.5 + i) * 0.05); fnEll(110, 0, 120, 22, '#2f8a55'); ctx.restore(); } ctx.restore();
  fnRR(300, 1030, 360, 40, 10, '#ff5fb0'); fnLine(330, 1070, 300, 1130, 8, '#c9ccd8'); fnLine(630, 1070, 660, 1130, 8, '#c9ccd8');   // beach chair
  fnRaccoon(480, 1060, 1.25, { stand: true, shades: true, look: [0.4, 0], tilt: -0.15, mouth: 'chew',
    hold: () => { fnCirc(30, -110, 30, '#7a4a2a'); fnLine(30, -140, 50, -180, 4, '#ff5fb0'); } });
  fnTag('VIDA NOVA', 540, 520, ATS(0.5), '#ff5fb0', 30);
};
SCENE.vines = () => {
  const t = LT(); fnSky('#ff9a6a', '#5a5aa8', -200, 1100);
  fnRect(240, 200, 600, 900, '#8a7a6a'); for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) fnRect(280 + c * 140, 240 + r * 140, 90, 100, '#1d2448');
  fnRect(-300, 1100, W + 600, 900, '#4a5a3a');
  const g = clamp(t / 2.2);
  for (let v = 0; v < 7; v++) { const x0 = 260 + v * 90, P = []; const n = Math.floor(30 * g); for (let i = 0; i <= n; i++) P.push([x0 + Math.sin(i * 0.6 + v) * 30, 1100 - i * 30]);
    if (P.length > 1) { fnStroke(P, 10, '#2f6a3a'); P.forEach(([x, y], i) => { if (i % 2) fnEll(x + (i % 4 ? 18 : -18), y, 18, 10, '#3aa860', i); }); } }
  fnTag('PRÉDIO ABANDONADO · 5 ANOS', 540, 420, ATS(0.4), '#2f8a55', 24);
};
SCENE.roots = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#7a7f8a'); for (let r = 0; r < 10; r++) for (let c = 0; c < 8; c++) fnRect(-200 + c * 170 + (r % 2) * 85, -100 + r * 190, 164, 184, '#8a8f9a');
  const g = EZ.o3(clamp(t / 0.8));
  for (let i = 0; i < 5; i++) { const a = -0.5 + i * 0.25; ctx.save(); ctx.translate(540, 1300); ctx.rotate(a); fnRR(-20, -900 * g, 40, 900 * g, 20, '#6a4a2a'); ctx.restore(); }
  for (let i = 0; i < 8; i++) { ctx.save(); ctx.translate(540 + (i - 4) * 120 * g, 800 - Math.abs(i - 4) * 40 * g); ctx.rotate((i - 4) * 0.2 * g); fnRect(-80, -90, 160, 180, '#8a8f9a'); fnRect(-80, -90, 160, 8, '#9aa0aa'); ctx.restore(); }
  if (t > 0.2) for (let i = 0; i < 20; i++) { const u = clamp((t - 0.2) / 0.6), a = i / 20 * TAU; fnCirc(540 + Math.cos(a) * 300 * u, 800 + Math.sin(a) * 300 * u, 8 * (1 - u), '#6a6f7a'); }
};
function fnTimes(dark, leaves) {
  fnSky('#1a1f5a', '#06081a');
  [[-60, 200, 360, 900], [720, 180, 400, 950], [300, 120, 480, 520]].forEach(([x, y, w, h], i) => { fnRect(x, y, w, h, '#232a5e'); fnRR(x + 30, y + 40, w - 60, h * 0.45, 10, dark ? '#0b0f24' : ['#ff3fa4', '#4aa8ff', '#ffd23f'][i]);
    if (leaves) { const R = RNG('lv', i); for (let k = 0; k < 40 * leaves; k++) fnEll(x + 30 + R.f() * (w - 60), y + 40 + R.f() * h * 0.45, 26, 14, k % 2 ? '#2f8a55' : '#3aa860', R.f() * 3); } });
  fnRect(-300, 1100, W + 600, 900, '#3a3f5a'); for (let i = 0; i < 7; i++) fnRect(-200 + i * 200, 1240, 110, 18, '#e8e8ee');
  fnRR(420, 700, 240, 70, 10, '#1fae4b'); fnMono('TIMES SQ', 540, 735, 30, '#ffffff');
}
SCENE.times = () => { fnTimes(true, 0); const R = RNG('ts'); for (let i = 0; i < 12; i++) fnBird(R.r(100, 980), R.r(1150, 1400), 1.6, ['#8a5a3a', '#5a6a8a', '#b07a4a'][i % 3], 20); fnTag('TRÂNSITO: 0', 540, 560, ATS(0.4), FN.green, 28); };
SCENE.birds2 = () => {
  const t = LT(); fnTimes(true, 0.3);
  for (let i = 0; i < 10; i++) { const u = mod(TT * 0.5 + i / 10, 1); ctx.save(); ctx.translate(-100 + u * 1300, 700 - Math.sin(u * Math.PI) * 200 + i * 20); fnGull(0, 0, 0.7, { fly: true }); ctx.restore(); }
  fnBird(540, 1180, 3.2, '#b07a4a', 30);
};
SCENE.leaves = () => {
  const t = LT(); fnTimes(true, clamp(t / 1.6));
  fnParticles('fall', 40, 'rgba(70,180,100,0.8)', { speed: 120, size: 9, drift: 10 });
  fnTag('TELÕES → FOLHAS', 540, 560, ATS(0.6), FN.green, 26);
};
SCENE.iss = () => {
  const t = LT(); fnSky('#02030c', '#05061a'); fnStars(200, 'iss');
  ctx.save(); ctx.beginPath(); ctx.arc(540, 2300, 1500, 0, TAU); ctx.fillStyle = '#1f3a8a'; ctx.fill(); ctx.restore(); fnGlow(540, 900, 900, 'rgba(90,160,255,0.35)', 0.8);
  const y = lerp(520, 700, t / 1.7), rot = 0.1 + t * 0.15;
  ctx.save(); ctx.translate(540, y); ctx.rotate(rot); for (const sx of [-1, 1]) { fnRect(sx * 120 - 50 + (sx < 0 ? -110 : 110) - 60, -110, 120, 220, '#2a57c9'); for (let k = 0; k < 5; k++) fnRect(sx * 230 - 60, -110 + k * 44, 120, 3, '#1a3a8a'); }
  fnRect(-240, -10, 480, 20, '#c9ccd8'); fnRR(-80, -40, 160, 80, 30, '#dfe4ee'); fnRR(-30, -80, 60, 160, 20, '#c9ccd8'); ctx.restore();
  fnTag('ALTITUDE ↓', 540, 1100, ATS(0.4), FN.red, 30);
  fnMono('ESTAÇÃO ESPACIAL INTERNACIONAL', 540, 330, 26, '#9fb4ff');
};
SCENE.fire = () => {
  const t = LT(); fnSky('#1a1f5a', '#3a2a5a'); fnStars(80, 'fr'); fnPoly([[-300, 1250], [200, 1050], [540, 1100], [900, 1000], [1380, 1250]], '#141a3a'); fnRect(-300, 1250, W + 600, 900, '#0b0f24');
  const u = clamp(t / 1.5), x = lerp(1250, -150, u), y = lerp(220, 860, u);
  for (let i = 0; i < 30; i++) { const k = i / 30; fnCirc(x + k * 500, y - k * 230, (1 - k) * 34, `rgba(255,${Math.round(200 - k * 150)},80,${(1 - k) * 0.8})`); }
  fnCirc(x, y, 30, '#fff6c8'); fnGlow(x, y, 300, '#ff9a3a', 0.9);
  fnWash('#ff7a3a', 0.08 + 0.05 * Math.sin(TT * 20));
};
SCENE.nobody2 = () => {
  const t = LT(); fnSky('#1a1f5a', '#3a2a5a'); fnStars(60, 'nb');
  const u = clamp(t / 1.8); for (let i = 0; i < 20; i++) { const k = i / 20; fnCirc(lerp(1100, 200, u) + k * 300, lerp(260, 420, u) - k * 140, (1 - k) * 16, `rgba(255,180,80,${(1 - k) * 0.7})`); }
  fnPoly([[-300, 1000], [200, 760], [540, 720], [880, 760], [1380, 1000]], '#3a4878'); ctx.save(); ctx.translate(540, 900); fnCirc(0, 0, 150, '#2a2f48'); fnCirc(0, 0, 120, '#8a90a8'); fnBold('BUNKER 01', 0, -190, 32, '#ffffff', 'center', 6); ctx.restore();
  fnRect(-300, 1000, W + 600, 900, '#5a6a50');
  for (let i = 0; i < 3; i++) { const u2 = mod(TT * 0.6 + i / 3, 1); fnAlpha(1 - u2, () => fnBold('Z', 620 + i * 30 + u2 * 60, 820 - u2 * 200, 40 + i * 16, '#cfe0ff')); }
};
SCENE.begin = () => {
  const t = LT(); fnSky('#ffb07a', '#5a6ac8', -200, 1100);
  for (let i = 0; i < 6; i++) { const x = -200 + i * 240, h = 500 + (i % 3) * 200; fnRect(x, 1100 - h, 220, h, '#5a5f6a'); for (let v = 0; v < 4; v++) fnStroke([[x + 30 + v * 50, 1100], [x + 20 + v * 50 + Math.sin(v) * 20, 1100 - h * 0.8]], 14, '#2f8a55'); fnCirc(x + 110, 1100 - h, 90, '#3aa860'); }
  fnRect(-300, 1100, W + 600, 900, '#3a6a3a'); fnParticles('pol', 40, 'rgba(255,240,160,0.4)', { speed: -20, size: 3 });
  fnBold('2036', 540, 400, 140, '#ffffff', 'center', 12);
};
SCENE.countdown = () => {
  const t = LT(); fnSky('#10142e', '#05070f'); fnGridBG('rgba(255,60,80,0.06)', 70);
  const n = Math.round(lerp(1000, 990, EZ.o3(clamp(t / 0.9))));
  fnDigital(540, 760, 1.1, String(n), FN.red); fnMono('ANOS RESTANTES', 540, 980, 34, '#ffb0b8');
  fnAlarmClock(540, 420, 0.6, {});
};
SCENE.sleeping = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#0e1236'); fnGlow(540, 800, 600, 'rgba(120,180,255,0.35)', 0.8);
  for (let i = 0; i < 5; i++) fnAlpha(0.4, () => fnPod(-150 + i * 340, 600, 0.4));
  fnPod(540, 1100, 1.5); fnRafaelLying(260, 990, 1.2, 0, { eyes: 'closed', mouth: 'smile', key: 'sl', blink: false }); fnCat(720, 1000, 1.3, { sleep: true, face: -1 }); fnPodLid(540, 1100, 1.5, 1, 0.8);
  fnMono('DESPERTAR EM: 990 ANOS', 540, 560, 28, '#ff9aa4');
};
SCENE.cta = () => {
  const t = LT(); fnSky('#1a1f5a', '#070a1c'); fnGridBG('rgba(255,210,63,0.05)', 80);
  fnAlarmClock(540, 420, 0.7, { ring: mod(TT, 1) < 0.5 ? 1 : 0 });
  const k = fnPop(ATS(0.05)); ctx.save(); ctx.translate(540, 700); ctx.scale(k, k); fnBold('O QUE SOBRA', 0, -45, 84, '#ffffff', 'center', 10); fnBold('DO MUNDO?', 0, 45, 96, FN.yellow, 'center', 10); ctx.restore();
  const k2 = fnPop(ATS(0.6)); if (k2 > 0) { ctx.save(); ctx.translate(540, 940); ctx.scale(k2, k2); fnRR(-250, -50, 500, 100, 50, FN.yellow); fnBold('💬 COMENTA', 0, 3, 52, FN.navy0); ctx.restore(); }
  if (t > 2.0) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = `rgba(0,0,0,${clamp((t - 2.2) / 0.5)})`; ctx.fillRect(0, 0, W, H); ctx.restore(); }
};
