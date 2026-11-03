// =====================================================================
//  props2.js — the Lambo story: supercar, bicycle, fuel pump, card terminal, tyres, sale sign, places
// =====================================================================
// a low wedge supercar (side view, facing right). o: { col, roof (0 = open), scratch, wheelSpin, shake, dirt }
function supercar(x, y, s, o = {}) {
  const col = o.col ?? '#ffc21a', dk = shade(col, -0.3), lt = shade(col, 0.35), spin = o.wheelSpin ?? 0;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shadowEll(0, 8, 520, 50, 0.55);
  // body
  poly([[-500, -60], [-470, -150], [-300, -175], [-120, -265], [120, -268], [330, -175], [480, -150], [520, -95], [505, -30], [-495, -30]], col);
  poly([[-500, -60], [505, -60], [505, -30], [-495, -30]], dk);
  poly([[-470, -150], [-300, -175], [-120, -265], [-100, -255], [-290, -160], [-460, -138]], lt);
  // cabin / roof
  if ((o.roof ?? 1) > 0.5) { poly([[-110, -250], [110, -254], [270, -172], [-270, -168]], '#16192a'); poly([[-96, -238], [-6, -240], [-6, -180], [-238, -176]], '#4a6fb8'); poly([[10, -240], [104, -242], [236, -180], [10, -180]], '#4a6fb8'); line(-80, -236, -150, -186, 8, 'rgba(255,255,255,0.35)'); }
  else { poly([[-60, -205], [180, -205], [270, -172], [-270, -168]], '#16192a'); fillRR(-200, -230, 60, 60, 20, '#2a2a3a'); }
  // side intake, door line, lights, wing
  poly([[-260, -110], [-90, -140], [-60, -90], [-230, -80]], '#16192a'); line(-60, -160, -40, -40, 4, dk);
  fillRR(440, -150, 70, 24, 10, '#fff8d0'); glow(500, -140, 120, '#fff4b0', 0.4); fillRR(-500, -140, 40, 22, 8, '#ff3030');
  poly([[-470, -175], [-360, -175], [-350, -160], [-480, -160]], dk); line(-440, -160, -430, -140, 10, dk);
  if (o.scratch) { const k = o.scratch; line(60, -120, 60 + 90 * k, -112 + 10 * k, 5, '#7a5a00'); line(70, -110, 70 + 70 * k, -103 + 8 * k, 3, '#fff3c0'); }
  if (o.dirt) { ctx.globalAlpha = 0.35 * o.dirt; for (let i = 0; i < 18; i++) circ(-450 + (hash(i) % 900), -40 - (hash(i, 2) % 90), 10 + (hash(i, 3) % 20), '#6b5a3a'); ctx.globalAlpha = 1; }
  // wheels (gold rims)
  for (const wx of [-320, 330]) { circ(wx, -20, 98, '#121220'); circ(wx, -20, 60, '#d9a514'); circ(wx, -20, 20, '#121220');
    for (let i = 0; i < 6; i++) { const a = spin + (i / 6) * TAU; line(wx + Math.cos(a) * 18, -20 + Math.sin(a) * 18, wx + Math.cos(a) * 56, -20 + Math.sin(a) * 56, 12, '#9a7408'); } }
  ctx.restore();
}
function bicycle(x, y, s, spin = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const wx of [-170, 170]) { ctx.beginPath(); ctx.arc(wx, -110, 110, 0, TAU); ctx.lineWidth = 16; ctx.strokeStyle = '#1b1b24'; ctx.stroke(); for (let i = 0; i < 8; i++) { const a = spin + (i / 8) * TAU; line(wx, -110, wx + Math.cos(a) * 104, -110 + Math.sin(a) * 104, 3, '#9aa0b8'); } circ(wx, -110, 12, '#9aa0b8'); }
  line(-170, -110, -20, -110, 12, '#2fb36a'); line(-20, -110, 90, -260, 12, '#2fb36a'); line(-170, -110, -60, -260, 12, '#2fb36a'); line(-60, -260, 90, -260, 12, '#2fb36a'); line(90, -260, 170, -110, 12, '#2fb36a');
  line(-60, -260, -80, -300, 10, '#2fb36a'); fillRR(-130, -316, 110, 26, 12, '#1b1b24'); line(90, -260, 110, -330, 10, '#2fb36a'); line(80, -334, 150, -334, 12, '#1b1b24');
  circ(-20, -110, 26, '#9aa0b8');
  ctx.restore();
}
function fuelPump(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shadowEll(0, 6, 150, 24, 0.35);
  fillRR(-110, -520, 220, 520, 20, '#e8483c'); fillRR(-90, -490, 180, 120, 12, '#14121c');
  tText(o.disp ?? '0,00 €', 0, -430, 40, { color: '#41f08a', shadow: false });
  fillRR(-90, -340, 180, 60, 10, '#ffffff'); tText('SUPER', 0, -310, 34, { color: '#e8483c', shadow: false });
  fillRR(90, -300, 40, 120, 10, '#2b2b36'); ctx.beginPath(); ctx.moveTo(130, -200); ctx.quadraticCurveTo(220, -60, 160, -20); ctx.lineWidth = 14; ctx.strokeStyle = '#1b1b24'; ctx.stroke();
  ctx.restore();
}
function cardTerminal(x, y, s, state) {
  // state: 'idle' | 'wait' | 'no'
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  fillRR(-150, -260, 300, 520, 40, '#2a2b38'); fillRR(-120, -230, 240, 170, 16, state === 'no' ? '#3a0f14' : '#cfe8c4');
  const txt = state === 'no' ? 'ABGELEHNT' : state === 'wait' ? 'BITTE WARTEN…' : 'KARTE EINSTECKEN';
  tText(txt, 0, -145, state === 'no' ? 40 : 24, { color: state === 'no' ? '#ff3b4a' : '#1d2a1a', shadow: false, maxW: 220 });
  if (state === 'no') glow(0, -145, 260, '#ff2030', 0.4 + 0.2 * Math.sin(TT * 20));
  for (let i = 0; i < 12; i++) fillRR(-100 + (i % 3) * 70, -20 + Math.floor(i / 3) * 62, 60, 50, 10, '#4a4c60');
  fillRR(-60, 210, 120, 16, 8, '#111');
  ctx.restore();
}
function creditCard(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); fillRR(-170, -105, 340, 210, 22, '#1b1530'); fillRR(-170, -105, 340, 210, 22, 'rgba(255,194,26,0.15)'); fillRR(-130, -40, 70, 54, 10, PAL.gold); tText('KEVIN', -70, 60, 34, { color: '#fff', shadow: false, align: 'left' }); tText('GOLD', 110, -70, 30, { color: PAL.gold, shadow: false }); ctx.restore(); }
function tyreStack(x, y, s, n = 3) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < n; i++) { ell(0, -40 - i * 70, 150, 50, '#15151d'); ell(0, -40 - i * 70 - 10, 120, 36, '#26262f'); ell(0, -40 - i * 70 - 10, 60, 18, '#15151d'); } ctx.restore(); }
function letter(x, y, s, title, amount, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); fillRR(-200, -260, 400, 520, 12, '#ffffff'); fillRR(-200, -260, 400, 90, 12, PAL.blue); tText(title, 0, -215, 36, { color: '#fff', shadow: false, maxW: 360 });
  for (let i = 0; i < 6; i++) line(-150, -120 + i * 40, 150 - (i % 2) * 60, -120 + i * 40, 6, '#d6d9e6'); tText(amount, 0, 170, 70, { color: PAL.red, shadow: false }); ctx.restore(); }
function saleSign(x, y, s, price) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.05); fillRR(-200, -130, 400, 260, 16, '#ffe14d'); rrPath(-186, -116, 372, 232, 12); ctx.lineWidth = 6; ctx.strokeStyle = PAL.red; ctx.stroke(); tText('ZU VERKAUFEN', 0, -50, 44, { color: PAL.red, shadow: false }); tText(price, 0, 40, 60, { color: '#1b1530', shadow: false }); ctx.restore(); }
function depotChart(x, y, w, h, prog, o = {}) {
  // two curves: Jonas' depot (green, rising) and the car's value (yellow, falling), years 0..10
  ctx.save(); ctx.translate(x, y);
  fillRR(-24, -24, w + 48, h + 48, 26, 'rgba(10,8,25,0.72)');
  for (let i = 1; i < 5; i++) line(0, (h * i) / 5, w, (h * i) / 5, 2, 'rgba(255,255,255,0.10)');
  const maxV = 250000, N = 100, yr = 10 * prog;
  const car = (t) => 250000 * Math.pow(0.85, t), dep = (t) => { const m = Math.round(t * 12), r = 0.07 / 12; return m <= 0 ? 0 : 500 * (Math.pow(1 + r, m) - 1) / r; };
  for (const [fn, c] of [[car, PAL.yellow], [dep, '#45f08f']]) {
    ctx.beginPath(); for (let i = 0; i <= N; i++) { const t = (i / N) * yr; const px = (t / 10) * w, py = h - (fn(t) / maxV) * h; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    ctx.lineWidth = 12; ctx.strokeStyle = c; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
    const px = (yr / 10) * w, py = h - (fn(yr) / maxV) * h; circ(px, py, 15, '#fff'); glow(px, py, 70, c, 0.6);
  }
  tText('JAHR ' + Math.floor(yr), w / 2, h + 70, 40, { color: '#fff', shadow: false });
  ctx.restore();
}

// ---------------------------------------------------------------- places
function setShowroom(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1400, [[0, '#14182a'], [1, '#262c48']]); ctx.fillRect(-600, -400, 2300, 1800);
    for (let i = 0; i < 6; i++) { fillRR(-300 + i * 300, 200, 250, 1100, 6, 'rgba(120,160,255,0.08)'); line(-300 + i * 300, 200, -300 + i * 300, 1300, 6, 'rgba(180,200,255,0.25)'); }
    for (let i = 0; i < 5; i++) { const x = 60 + i * 240; fillRR(x - 40, 60, 80, 20, 8, '#e8ecff'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = lin(0, 80, 0, 1500, [[0, 'rgba(255,255,255,0.20)'], [1, 'rgba(255,255,255,0)']]); ctx.beginPath(); ctx.moveTo(x - 30, 80); ctx.lineTo(x + 30, 80); ctx.lineTo(x + 200, 1500); ctx.lineTo(x - 200, 1500); ctx.fill(); ctx.restore(); }
    neonSign(540, 300, 'SUPERCARS', '#ffc21a');
    ctx.fillStyle = lin(0, 1300, 0, 1920, [[0, '#3a4166'], [1, '#141830']]); ctx.fillRect(-600, 1300, 2300, 900);
    for (let i = 0; i < 10; i++) line(-600 + i * 240, 1300, -900 + i * 330, 1920, 3, 'rgba(255,255,255,0.08)');
    ell(540, 1600, 620, 120, 'rgba(255,255,255,0.08)');
  });
}
function setGarage(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1400, [[0, '#4a4f5e'], [1, '#30343f']]); ctx.fillRect(-600, -400, 2300, 1800);
    for (let i = 0; i < 9; i++) line(-600 + i * 260, -400, -600 + i * 260, 1350, 6, 'rgba(0,0,0,0.15)');
    fillRR(560, 360, 460, 340, 12, '#2a2d38'); for (let i = 0; i < 6; i++) { const tx = 600 + (i % 3) * 140, ty = 420 + Math.floor(i / 3) * 150; line(tx, ty, tx, ty + 110, 10, '#c0c4d4'); circ(tx, ty, 18, '#c0c4d4'); }
    neonSign(300, 260, 'WERKSTATT', '#52b8ff');
    tyreStack(120, 1380, 0.8, 4); tyreStack(980, 1380, 0.7, 3);
    fillRR(-60, 900, 260, 380, 10, '#c0392b'); for (let i = 0; i < 4; i++) fillRR(-40, 920 + i * 90, 220, 70, 6, '#a5302a');
    ctx.fillStyle = '#5a5f6e'; ctx.fillRect(-600, 1380, 2300, 900); for (let i = 0; i < 6; i++) ell(100 + i * 200, 1700 + (i % 2) * 60, 90, 22, 'rgba(0,0,0,0.25)');
    fillRR(-100, 1380, 1280, 20, 4, '#ffd23f');
  });
}
function setGasStation(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1400, [[0, '#0b0f2e'], [1, '#2c2560']]); ctx.fillRect(-600, -400, 2300, 1800);
    const R = RNG('gst'); for (let i = 0; i < 40; i++) circ(R.f() * 1080, R.f() * 700, 2 + R.f() * 2, 'rgba(255,255,255,0.6)');
    fillRR(-200, 380, 1480, 120, 10, '#e8483c'); fillRR(-200, 500, 1480, 30, 6, '#ffffff');
    for (let i = 0; i < 6; i++) { circ(40 + i * 200, 540, 18, '#fff7d6'); glow(40 + i * 200, 560, 260, '#fff1b0', 0.35); }
    fillRR(860, 560, 180, 300, 10, '#14121c'); tText('SUPER', 950, 620, 30, { color: '#fff', shadow: false }); tText('2,19', 950, 700, 64, { color: '#ffd23f', shadow: false }); tText('€/L', 950, 770, 30, { color: '#fff', shadow: false });
    fillRR(-20, 530, 50, 850, 10, '#d9dce8'); fillRR(1060, 530, 50, 850, 10, '#d9dce8');
    ctx.fillStyle = '#2d2f3d'; ctx.fillRect(-600, 1380, 2300, 900); for (let i = 0; i < 6; i++) fillRR(-300 + i * 300, 1720, 160, 18, 9, '#f5e9a8');
  });
}
function setNightStreet(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1400, [[0, '#1b1f5c'], [1, '#6a3d9a']]); ctx.fillRect(-600, -400, 2300, 1800);
    citySky(-200, 300, 1500, 1050, true);
    for (let i = 0; i < 5; i++) { const x = -40 + i * 300; fillRR(x - 8, 700, 16, 680, 6, '#3a3157'); circ(x + 40, 700, 22, '#fff1b0'); glow(x + 40, 720, 220, '#fff1b0', 0.35); }
    ctx.fillStyle = '#c9b8d8'; ctx.fillRect(-600, 1300, 2300, 90); ctx.fillStyle = '#2d2f3d'; ctx.fillRect(-600, 1390, 2300, 700);
    for (let i = 0; i < 8; i++) fillRR(-500 + i * 300 - ((o.scroll ?? 0) % 300), 1700, 160, 20, 10, '#f5e9a8');
  });
}
