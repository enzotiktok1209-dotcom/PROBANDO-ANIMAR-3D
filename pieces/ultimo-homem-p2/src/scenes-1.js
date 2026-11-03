// =====================================================================
//  SCENES 1 — gancho + recap (0 – 13.27s)
// =====================================================================
const HEAD_H = 7.22 * RR;                        // feet → head centre at s = 1
const feetFor = (headY, s) => headY + HEAD_H * s;
function fnStars(n, key = 'st') { const R = RNG('stars', key); for (let i = 0; i < n; i++) { const x = R.r(-200, W + 200), y = R.r(-300, H + 200), tw = 0.5 + 0.5 * Math.sin(TT * (1 + R.f() * 3) + i); fnCirc(x, y, R.r(1, 3.2), `rgba(255,255,255,${0.25 + 0.6 * tw})`); } }
function fnGridBG(col = 'rgba(90,130,255,0.10)', step = 60) { for (let x = -300; x < W + 300; x += step) fnRect(x, -400, 2, H + 800, col); for (let y = -400; y < H + 400; y += step) fnRect(-300, y, W + 600, 2, col); }
const fmtN = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

SCENE.globe = () => {
  const t = LT(); fnSky('#070a1c', '#141a3a'); fnStars(160, 'g');
  const gx = 540, gy = 780, gr = 360;
  fnGlow(gx, gy, gr * 1.5, 'rgba(60,110,255,0.35)', 0.8);
  fnCirc(gx, gy, gr, '#16235e');
  ctx.save(); ctx.beginPath(); ctx.arc(gx, gy, gr, 0, TAU); ctx.clip();
  const R = RNG('land'), rot = TT * 40;
  const lands = [[-120, -140, 150, 110], [110, -170, 130, 90], [60, 60, 120, 170], [-210, 40, 90, 70], [230, 10, 110, 130], [-40, 220, 80, 60]];
  lands.forEach(([lx, ly, rx, ry], i) => { const x = gx + mod(lx + rot + 600, 1200) - 600; fnEll(x, gy + ly, rx, ry, '#1f8a4e', i * 0.4); fnEll(x - 12, gy + ly - 10, rx * 0.7, ry * 0.6, '#27a45d', i * 0.4); });
  // the men: dots that go out in waves from the rim toward Brazil
  const bz = [gx + 70, gy + 120];
  for (let i = 0; i < 260; i++) {
    const a = R.f() * TAU, rr = Math.sqrt(R.f()) * gr * 0.95, x = gx + Math.cos(a) * rr, y = gy + Math.sin(a) * rr;
    const d = Math.hypot(x - bz[0], y - bz[1]), off = 0.25 + 1.5 * (1 - d / (gr * 1.9)), k = clamp((off - t) / 0.12);
    if (k > 0) { fnCirc(x, y, 4.5, `rgba(140,200,255,${0.9 * k})`); fnGlow(x, y, 16, '#8cc8ff', 0.5 * k); }
    else if (t - off < 0.25) fnCirc(x, y, 10 * (1 - (t - off) / 0.25), 'rgba(255,255,255,0.5)');   // the little flash as it goes out
  }
  ctx.restore();
  fnCirc(gx - gr * 0.3, gy - gr * 0.35, gr * 0.5, 'rgba(255,255,255,0.04)');
  fnRing(gx, gy, gr + 50, 'rgba(110,170,255,0.6)'); fnRing(gx, gy, gr + 90, 'rgba(110,170,255,0.25)');
  // the last man, in Brazil
  const pulse = 0.5 + 0.5 * Math.sin(TT * 9); fnCirc(bz[0], bz[1], 9 + pulse * 3, FN.yellow); fnGlow(bz[0], bz[1], 80, FN.yellow, 0.8); if (t > 1.85) fnRing(bz[0], bz[1], 40 + (t - 1.85) * 200, FN.yellow, 1 - (t - 1.85) * 4);
  // counter
  const n = t > 1.9 ? 1 : Math.max(1, 3968514002 * (1 - EZ.o3(t / 1.9)));
  const k = fnPop(ATS(0.05));
  ctx.save(); ctx.translate(540, 330); ctx.scale(k, k);
  fnRR(-250, -62, 500, 124, 12, 'rgba(11,15,36,0.88)'); ctx.lineWidth = 3; ctx.strokeStyle = FN.red; ctx.beginPath(); ctx.roundRect(-250, -62, 500, 124, 12); ctx.stroke();
  fnMono('HOMENS NA TERRA', 0, -32, 22, '#ff9aa4'); fnMono(fmtN(n), 0, 18, 56, n === 1 ? FN.yellow : '#ffffff');
  ctx.restore();
};
SCENE.scan = () => {
  const t = LT(); fnSky('#18205a', '#0d1230'); fnGridBG();
  fnAlpha(0.16, () => fnBRFlag(540, 520, 520, 0.6)); fnGlow(540, 700, 500, 'rgba(70,120,255,0.35)', 0.8);
  fnEll(540, 1150, 260, 40, 'rgba(60,110,255,0.25)');
  const look = t < 0.15 ? [0, 0.8] : [0.05, -0.1];
  const tilt = t < 0.12 ? 0.25 : springMove(ATS(0.12), 0.25, -0.06, SPRING.playful);
  const arm = springMove(ATS(0.55), 0, 1, SPRING.smooth);
  fnRafael(540, 1090, 1.25, { tilt, look, eyes: t > 0.15 ? 'wide' : 'open', brow: t > 0.15 ? 'up' : 'worry', mouth: t > 0.15 ? 'o' : 'flat', lean: -0.02, aR: [lerp(-0.18, -0.55, arm), lerp(0.1, -2.1, arm)], aL: [0.2, -0.15], bob: Math.sin(TT * 5) * 2 });
  // scan line + brackets
  const sy = 380 + mod(t * 900, 820); fnRect(250, sy, 580, 4, 'rgba(90,170,255,0.9)'); fnGlow(540, sy, 300, 'rgba(90,170,255,0.5)', 0.5);
  const bk = fnPop(ATS(0.0), 0.3); ctx.save(); ctx.translate(540, 770); ctx.scale(lerp(1.4, 1, bk), lerp(1.4, 1, bk)); fnBrackets(-280, -400, 560, 800, FN.win, 70, 7); ctx.restore();
  // ID card slides in
  const cx = springMove(ATS(0.35), 1350, 800, SPRING.snappy);
  ctx.save(); ctx.translate(cx, 470); ctx.scale(0.8, 0.8); fnRR(-150, -120, 300, 240, 14, 'rgba(11,15,36,0.9)'); ctx.lineWidth = 3; ctx.strokeStyle = FN.win; ctx.beginPath(); ctx.roundRect(-150, -120, 300, 240, 14); ctx.stroke();
  fnRR(-125, -95, 90, 100, 8, '#2a3170'); fnAt(-80, -10, 0.32, () => fnRafaelHead(RR * 1.6, { look: [0, 0], key: 'idc' })); fnMono('ID · BR', 60, -70, 22, '#9fb4ff'); fnMono('NOME', -95, 50, 18, '#8a90b0', 'left'); fnBold('RAFAEL', 115, 50, 36, '#ffffff', 'right');
  if (t > 1.0) fnMono('✓ ENCONTRADO', 0, 96, 22, FN.red);
  ctx.restore();
};
SCENE.face = () => {
  const t = LT(); fnSky('#1b2462', '#0b0f24'); fnGridBG('rgba(90,130,255,0.07)', 80);
  fnGlow(240, 500, 500, 'rgba(70,120,255,0.5)', 0.7);
  const gulp = Math.max(0, Math.sin(clamp((t - 0.45) / 0.35) * Math.PI));
  fnRafael(540, feetFor(720, 3.0), 3.0, { look: [-0.35 + Math.sin(TT * 2) * 0.1, 0.1], brow: 'worry', mouth: gulp > 0.3 ? 'wobble' : 'flat', sweat: 1, bob: -gulp * 18 + Math.sin(TT * 2.4) * 4, tilt: -0.04, shadow: false });
  const k = fnPop(ATS(0.06), 0.3); ctx.save(); ctx.translate(850, 470); ctx.scale(k, k); ctx.rotate(0.08);
  fnRR(-110, -95, 220, 190, 22, 'rgba(11,15,36,0.85)'); ctx.lineWidth = 4; ctx.strokeStyle = FN.yellow; ctx.beginPath(); ctx.roundRect(-110, -95, 220, 190, 22); ctx.stroke();
  fnBold('23', 0, 10, 120, FN.yellow); fnMono('IDADE', 0, 70, 22, '#ffe9a0'); ctx.restore();
};
SCENE.poster = () => {
  const t = LT(); fnSky('#241a2c', '#120c18'); fnBrick(-300, -300, W + 600, H + 600, '#7a3b2a');
  fnGlow(860, 260, 520, 'rgba(255,190,90,0.55)', 0.9); fnRR(840, 180, 40, 70, 10, '#2a2228'); fnCirc(860, 262, 22, '#fff1c0');
  // torn posters around
  [[150, 470, -0.1, '#e7dcc4'], [880, 1050, 0.12, '#d9cfb5']].forEach(([x, y, r, c]) => { ctx.save(); ctx.translate(x, y); ctx.rotate(r); fnRect(-130, -170, 260, 300, c); fnMono('DISQUE', 0, -120, 26, '#c0302a'); fnBold('181', 0, -60, 70, '#c0302a'); fnPoly([[-130, 130], [-60, 90], [10, 140], [130, 100], [130, 130]], '#5a2b20'); ctx.restore(); });
  fnAlpha(0.8, () => { ctx.save(); ctx.translate(200, 1180); ctx.rotate(-0.15); fnBold('FORA', 0, 0, 90, '#2fd0c0'); ctx.restore(); });
  // the poster, shaking on the stamp
  const [shx, shy] = fnShake(ATS(0.4), 12, 0.35, 'post');
  ctx.save(); ctx.translate(540 + shx, 760 + shy); ctx.rotate(-0.02 + Math.sin(TT * 3) * 0.004);
  fnRect(-260, -370, 520, 740, '#f1e7cf'); fnRect(-260, -370, 520, 110, '#c0302a'); fnBold('PROCURADO', 0, -315, 76, '#ffffff');
  fnRect(-180, -230, 360, 300, '#2a3170'); fnAt(0, -80, 1.05, () => fnRafaelHead(RR * 2.2, { look: [0, 0], brow: 'worry', key: 'post' }));
  fnBold('RAFAEL · 23 · 1,78 m', 0, 120, 34, '#1a1a1a'); fnMono('RECOMPENSA', 0, 175, 24, '#555');
  const money = Math.min(50000000, 50000000 * EZ.o3(clamp((t - 0.6) / 0.7)));
  fnBold('R$ ' + fmtN(money), 0, 245, 60, '#c0302a');
  fnPoly([[-260, 370], [-200, 345], [-120, 372], [0, 340], [140, 368], [260, 350], [260, 370]], '#7a3b2a');
  ctx.restore();
  // the stamp falls and slams
  const st = clamp((t - 0.15) / 0.25), land = t > 0.4;
  ctx.save(); ctx.translate(560, lerp(-200, 840, EZ.i2(st))); ctx.rotate(-0.22); const sc = land ? 1 + Math.max(0, 0.12 - (t - 0.4)) : 1.3; ctx.scale(sc, sc);
  ctx.lineWidth = 10; ctx.strokeStyle = 'rgba(214,30,50,0.92)'; ctx.beginPath(); ctx.roundRect(-250, -70, 500, 140, 12); ctx.stroke(); fnBold('ÚLTIMO HOMEM', 0, 4, 70, 'rgba(214,30,50,0.92)');
  ctx.restore();
  if (land) fnParticles('pdust', 40, 'rgba(240,220,190,0.5)', { x0: 250, x1: 830, y0: 600, y1: 1100, speed: -50, size: 3 });
};
SCENE.screens = () => {
  const t = LT(); fnSky('#0c1030', '#05070f');
  const cells = [[1, 1], [0, 0], [2, 0], [0, 2], [2, 2], [1, 0], [0, 1], [2, 1], [1, 2]];
  const txt = ['CADÊ ELE?', 'WHERE IS HE?', 'WO IST ER?', '¿DÓNDE ESTÁ?', 'OÙ EST-IL?', 'DOV’È?', 'GDZIE ON JEST?', 'NEREDE?', 'CADÊ ELE?'];
  const hues = ['#2b3a8a', '#8a2b4a', '#2b7a6a', '#7a5a2b', '#5a2b8a', '#2b5a8a', '#8a4a2b', '#3a8a2b', '#2b3a8a'];
  cells.forEach(([cx, cy], i) => {
    const t0 = i === 0 ? 0 : 0.18 + i * 0.13, k = fnPop(ATS(t0), 0.22); if (k <= 0) return;
    const x = 200 + cx * 340, y = 420 + cy * 360, w = 310, h = 320;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    fnRR(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20, 14, '#05060c'); fnRR(-w / 2, -h / 2, w, h, 8, hues[i]);
    ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 8); ctx.clip();
    if (i === 0) {   // the crowd of women looks up at him
      fnRR(-90, -140, 180, 120, 8, '#0d1230'); fnAt(0, -78, 0.38, () => fnRafaelHead(RR * 2, { look: [0, 0], key: 'scr0' }));
      const up = springMove(ATS(1.3), 0, 1, SPRING.snappy);
      [-110, -40, 40, 110].forEach((wx, j) => fnAt(wx, 150, 0.36, () => fnWomanHead(RR * 1.5, { hairC: ['#6b3e1f', '#d9b24a', '#3a2418', '#c98a3e'][j], look: [0, lerp(0.5, -1, up)], lid: lerp(0.3, 0.55, up), brow: up > 0.5 ? 'cold' : 'n', key: 'cw' + j, mouth: 'flat' })));
    } else { fnRR(-80, -120, 160, 140, 8, 'rgba(0,0,0,0.3)'); fnAt(0, -50, 0.4, () => fnRafaelHead(RR * 2, { look: [0, 0], key: 'scr' + i })); }
    fnRect(-w / 2, h / 2 - 70, w, 70, 'rgba(0,0,0,0.55)'); fnBold(txt[i], 0, h / 2 - 35, 34, i === 0 ? FN.yellow : '#ffffff');
    fnRect(-w / 2, -h / 2, w, 6 + (B % 3), 'rgba(255,255,255,0.08)');   // scanline
    ctx.restore(); ctx.restore();
    fnMono(i % 2 ? '● AO VIVO' : 'LIVE', x - w / 2 + 50, y - h / 2 + 22, 16, FN.red);
  });
};
SCENE.veranda = () => {
  const t = LT(); fnSky('#f0a46a', '#5a6aa8', 0, 1400);
  fnGlow(780, 520, 400, 'rgba(255,220,150,0.8)', 0.8); fnCirc(780, 520, 70, '#ffe3a0');
  [[0.0, '#4a5a9a', 760], [0.3, '#3a4880', 860], [0.6, '#2c3666', 960]].forEach(([d, c, y], j) => { ctx.beginPath(); ctx.moveTo(-400, H); for (let x = -400; x <= W + 400; x += 60) ctx.lineTo(x + Math.sin(TT * 0.05) * 10 * j, y - 120 * Math.sin(x * 0.004 + j * 2) - 60 * Math.sin(x * 0.011 + j)); ctx.lineTo(W + 400, H); ctx.fillStyle = c; ctx.fill(); });
  fnAlpha(0.5, () => { fnRR(-300, 860 + Math.sin(TT) * 6, 900, 70, 35, '#e9eaf6'); fnRR(300, 920 - Math.sin(TT) * 6, 1000, 60, 30, '#e9eaf6'); });
  [[120, 980], [930, 1020], [420, 1040]].forEach(([x, y], i) => { fnRect(x - 8, y - 230, 16, 240, '#1d2448'); for (let k = 0; k < 4; k++) fnEll(x, y - 230 + k * 30, 90 - k * 12, 16, '#1d2c48'); });
  // the wooden veranda
  fnRect(-300, 1090, W + 600, 900, '#5a3a24'); for (let i = 0; i < 14; i++) fnRect(-300, 1100 + i * 60, W + 600, 4, '#4a2e1c');
  fnRect(-300, 1000, W + 600, 30, '#7a5034'); for (let i = 0; i < 12; i++) fnRect(-200 + i * 120, 1030, 22, 70, '#6a4430');
  fnRR(140, 940, 60, 70, 10, '#3a7a3a'); fnRect(165, 900, 8, 50, '#c0a070');   // a mate cup
  fnRR(880, 950, 80, 60, 8, '#ffd23f');   // a rubber boot (yellow)
  // the note: wind lifts a corner; Rafael's hand catches it at 0.9s
  const caught = springMove(ATS(0.9), 0, 1, SPRING.snappy), lift = (1 - caught) * (0.5 + 0.5 * Math.sin(TT * 9));
  ctx.save(); ctx.translate(540, 985 - lift * 30 - caught * 120); ctx.rotate(-0.05 + lift * 0.2 - caught * 0.1);
  fnPoly([[-110, -70], [110, -70 - lift * 40], [110, 70], [-110, 70]], '#f5efdc'); for (let i = 0; i < 4; i++) fnRect(-90, -40 + i * 26, 170 - i * 20, 6, 'rgba(40,40,80,0.45)');
  ctx.restore();
  const reach = springMove(ATS(0.55), 0, 1, SPRING.smooth);
  fnRafael(780, feetFor(640, 1.7), 1.7, { face: -1, side: 0.6, look: [-0.8, 0.5], brow: 'worry', mouth: 'flat', lean: -0.15 * reach, aR: [lerp(-0.2, -2.0, reach), lerp(0.1, -0.2, reach)], aL: [0.2, -0.2], shadow: false });
};
SCENE.note = () => {
  const t = LT(); fnSky('#3a2a24', '#1a1210'); fnRect(-300, -300, W + 600, H + 600, '#4a3020'); for (let i = 0; i < 30; i++) fnRect(-300, -300 + i * 90, W + 600, 3, '#3a2418');
  fnGlow(540, 700, 700, 'rgba(255,200,140,0.35)', 0.8);
  ctx.save(); ctx.translate(540, 780); ctx.rotate(-0.04);
  fnRect(-380, -430, 760, 860, 'rgba(0,0,0,0.35)'); fnRect(-370, -440, 740, 860, '#f4ecd6');
  for (let i = 0; i < 12; i++) fnRect(-370, -340 + i * 66, 740, 2, 'rgba(80,110,200,0.25)'); fnRect(-290, -440, 3, 860, 'rgba(220,80,80,0.35)');
  const lines = ['Você não é o único.', 'Somos onze.', 'Rio de Janeiro.', 'O porto.', 'Sábado, meia-noite.'], starts = [-0.6, 0.0, 0.95, 1.25, 1.55];
  ctx.font = 'italic 700 66px "FreeSerif", "Caladea", serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  lines.forEach((l, i) => { const n = Math.floor(clamp((t - starts[i]) / 0.5) * l.length); if (n <= 0) return; ctx.fillStyle = '#1d2a6a'; ctx.fillText(l.slice(0, n), -260, -270 + i * 132); });
  if (t > 0.4) { const u = clamp((t - 0.4) / 0.3); fnLine(-262, -126, -262 + 400 * u, -118, 6, FN.red); }
  if (t > 1.15) { const u = clamp((t - 1.15) / 0.3); ctx.lineWidth = 6; ctx.strokeStyle = FN.red; ctx.beginPath(); ctx.ellipse(-30, 0, 270, 70, -0.05, 0, TAU * u); ctx.stroke(); }
  ctx.restore();
  fnFlags(-100, 330, 1180, 300, 50, 16);
};
SCENE.clock = () => {
  const t = LT(); fnSky('#0d1440', '#05070f'); fnStars(60, 'cl');
  fnPortSkyline(1060); fnWetGround(1060, '#0d1230', [[220, '#ffd27a', 0.3], [760, '#7aa0ff', 0.35]]);
  fnParticles('drz', 80, 'rgba(180,200,255,0.35)', { speed: 900, streak: 26, size: 1.6 });
  // the clock on a pole (the pier clock)
  fnRect(530, 760, 20, 300, '#2a2f48');
  const hit = t > 0.66, ang = hit ? springMove(ATS(0.66), -0.4, 0, SPRING.playful) : -TAU * 3 * (1 - EZ.o2(t / 0.66)) - 0.4;
  ctx.save(); ctx.translate(540, 620); fnCirc(0, 0, 175, '#2a2f48'); fnCirc(0, 0, 155, '#f5f0dc'); fnGlow(0, 0, 300, 'rgba(255,240,200,0.4)', 0.6);
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; fnLine(Math.sin(a) * 130, -Math.cos(a) * 130, Math.sin(a) * 145, -Math.cos(a) * 145, i % 3 ? 5 : 10, '#1a1a2a'); }
  ctx.rotate(ang); fnLine(0, 0, 0, -90, 14, '#1a1a2a'); ctx.rotate(ang * 11); fnLine(0, 0, 0, -130, 8, '#1a1a2a'); ctx.restore(); fnCirc(540, 620, 12, FN.red);
  const k = fnPop(ATS(0.02)); ctx.save(); ctx.translate(540, 360); ctx.scale(k, k); fnRR(-170, -45, 340, 90, 45, FN.yellow); fnBold('SÁBADO', 0, 4, 54, FN.navy0); ctx.restore();
  if (hit) { fnRing(540, 620, 190 + (t - 0.66) * 500, 'rgba(255,240,200,0.8)', 1 - (t - 0.66) * 2); fnTag('00:00', 540, 880, ATS(0.68), FN.red, 40); }
};
