// =====================================================================
//  SCENES B — celular, escola, o giro (29.46 – end)
// =====================================================================
function fnPhoneUI(o = {}) {   // draws inside fnPhone's screen (−115..115 × −232..232)
  fnRect(-115, -232, 230, 464, o.bg || '#141a3a'); fnMono('06:50', 0, -210, 18, '#ffffff');
  if (o.draw) o.draw();
}
function fnChatBubble(x, y, w, txt, mine, col) { fnRR(x - w / 2, y - 26, w, 52, 18, col || (mine ? '#2f8a55' : '#2a3060')); fnMono(txt, x, y, 15, '#ffffff'); }
// a Brazilian state school corridor: lockers, a mural, the flag, a bulletin board
function fnCorridor(o = {}) {
  fnSetLight(-0.6, 1, 0.5);
  fnRect(-300, -300, W + 600, H + 600, '#d8c8a0'); fnRect(-300, 700, W + 600, 500, '#4a8ab0');
  for (let i = 0; i < 12; i++) { const x = -260 + i * 120 - (o.scroll || 0); fnRR(x, 640, 110, 500, 6, i % 2 ? '#3a7aa0' : '#4a8ab8'); fnRect(x + 15, 680, 80, 8, 'rgba(0,0,0,0.25)'); fnRect(x + 15, 700, 80, 8, 'rgba(0,0,0,0.25)'); fnCirc(x + 90, 900, 7, '#c9ccd8'); }
  fnRR(380 - (o.scroll || 0) * 0.5, 300, 320, 220, 10, '#a87a4a'); for (let k = 0; k < 5; k++) fnRect(400 + k * 60 - (o.scroll || 0) * 0.5, 320 + (k % 2) * 40, 50, 60, ['#ffd23f', '#ff9ac4', '#ffffff', '#8ad0c0', '#ffb070'][k]);
  fnBRFlag(900 - (o.scroll || 0) * 0.3, 380, 160, 0.4);
  fnRect(-300, 1150, W + 600, 900, '#b0a080'); for (let i = 0; i < 12; i++) fnRect(-300 + i * 140 - mod(o.scroll || 0, 140), 1150, 4, 900, 'rgba(0,0,0,0.08)');
  for (let i = 0; i < 4; i++) { const x = 100 + i * 300; fnRR(x, 80, 160, 30, 10, '#fffbe8'); fnGlow(x + 80, 120, 200, 'rgba(255,250,220,0.5)', 0.6); }
}
const STU = [{ skin: '#7a4a2a', hair: '#141010', hood: '#2a57c9', hoodD: '#1f449e', jeans: '#232a4f' }, { skin: '#f0c9a8', hair: '#b08040', hood: '#e85a7a', hoodD: '#c84a6a', jeans: '#2a2f48' }, { skin: '#a8683f', hair: '#2a1a12', hood: '#2f8a55', hoodD: '#257048', jeans: '#232a4f' }];
SCENE.phonebuzz = () => {
  const t = LT(); fnJuliaRoom(); fnWash('#000020', 0.2);
  const bz = Math.sin(TT * 70) * 6 * (mod(TT, 0.7) < 0.45 ? 1 : 0);
  ctx.save(); ctx.translate(540 + bz, 820); ctx.rotate(-0.08 + bz * 0.005); fnPhone(0, 0, 0.75, { screen: () => fnPhoneUI({ draw: () => { fnBold('300', 0, -40, 80, FN.red); fnMono('notificações', 0, 20, 18, '#ffffff'); } }) }); ctx.restore();
  if (bz) { fnGlow(540, 820, 300, '#4aa8ff', 0.4); for (let i = 0; i < 2; i++) { ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.beginPath(); ctx.arc(540, 820, 230 + i * 40, -0.4, 0.4); ctx.stroke(); ctx.beginPath(); ctx.arc(540, 820, 230 + i * 40, Math.PI - 0.4, Math.PI + 0.4); ctx.stroke(); } }
};
SCENE.phoneup = () => {
  const t = LT(); fnJuliaRoom();
  const lift = springMove(ATS(0.05), 0, 1, SPRING.smooth);
  fnWoman(540, feetFor(640, 2.2), 2.2, ju({ look: [0.3, 0.8], eyes: 'open', lid: 0.1, brow: 'worry', mouth: 'flat', key: 'pu', shadow: false, aR: [lerp(-0.12, -0.9, lift), lerp(0.04, -1.6, lift)],
    hold: (h) => { if (lift > 0.3) { ctx.save(); ctx.translate(h[0], h[1] - 40); ctx.rotate(-0.2); fnRR(-40, -70, 80, 140, 12, '#1a1a22'); fnRR(-34, -62, 68, 124, 8, '#4aa8ff'); ctx.restore(); } } }));
};
SCENE.messages = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#0e1236');
  fnPhone(540, 760, 1.35, { screen: () => fnPhoneUI({ draw: () => {
    const n = Math.min(14, Math.floor(t * 14)); const icons = ['#25d366', '#e1306c', '#4aa8ff', '#ff5fb0'];
    for (let i = 0; i < n; i++) { const y = -170 + i * 30 - Math.max(0, n - 12) * 30; if (y > 200) continue; fnRR(-100, y - 12, 200, 26, 8, 'rgba(255,255,255,0.14)'); fnCirc(-86, y, 8, icons[i % 4]); fnRect(-70, y - 4, 100 + (i * 37) % 60, 7, 'rgba(255,255,255,0.6)'); } } }) });
  const c = Math.round(300 * EZ.o3(clamp(t / 0.8))); fnBubble(String(c), 840, 360, ATS(0.05), { size: 70, bg: FN.red, fg: '#ffffff' });
};
SCENE.yourmsg = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#0e1236');
  fnPhone(540, 760, 1.35, { screen: () => fnPhoneUI({ bg: '#0b1a1a', draw: () => {
    fnRect(-115, -200, 230, 50, '#1f3a34'); fnCirc(-80, -175, 16, '#c4865a'); fnMono('Rafael', 0, -175, 18, '#ffffff');
    fnChatBubble(-20, -90, 180, 'oi, tudo bem? :)', false); fnChatBubble(-10, -20, 200, 'vi aquele filme...', false); fnMono('✓✓ 22:47', 40, 20, 13, '#4aa8ff');
  } }) });
};
SCENE.seen = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#0e1236'); fnGlow(540, 700, 500, 'rgba(255,60,80,0.25)', 0.8);
  fnAt(540, 700, 3.4, () => fnWomanHead(RR, ju({ look: [0, 0.5], eyes: 'open', lid: 0.35, brow: 'sad', mouth: 'frown', key: 'sn', blink: false })));
  const k = fnPop(ATS(0.4)); if (k > 0) { ctx.save(); ctx.translate(540, 360); ctx.scale(k, k); ctx.rotate(-0.12); ctx.lineWidth = 10; ctx.strokeStyle = FN.red; ctx.beginPath(); ctx.roundRect(-260, -60, 520, 120, 14); ctx.stroke(); fnBold('VISUALIZADO', 0, 4, 60, FN.red); ctx.restore(); }
  for (let i = 0; i < 4; i++) { const u = mod(TT * 0.8 + i / 4, 1); fnAlpha(1 - u, () => fnEll(300 + i * 160, 380 + u * 900, 6, 14, '#9fd6ff')); }   // rain of sadness
};
SCENE.gallery = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#0e1236');
  fnPhone(540, 760, 1.35, { screen: () => fnPhoneUI({ draw: () => {
    const sc = t * 300; ctx.save(); ctx.beginPath(); ctx.rect(-115, -190, 230, 420); ctx.clip();
    for (let i = 0; i < 30; i++) { const x = -110 + (i % 3) * 74, y = -180 + Math.floor(i / 3) * 74 - sc % 740; fnRR(x, y, 70, 70, 6, ['#ff9ac4', '#8ad0c0', '#ffd27a', '#a8b8ff', '#ffb070'][i % 5]); }
    ctx.restore(); } }) });
  fnMono('GALERIA', 540, 300, 34, '#ffffff');
};
SCENE.folder = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#0e1236'); fnGlow(540, 760, 500, 'rgba(255,210,63,0.25)', 0.8);
  const k = fnPop(ATS(0.1), 0.3); ctx.save(); ctx.translate(540, 760); ctx.scale(k, k);
  fnRR(-280, -200, 220, 70, 16, '#e0a830'); fnRR(-280, -160, 560, 360, 24, '#ffc840'); fnRR(-280, -100, 560, 300, 24, '#ffd860');
  fnBold('PESSOAS', 0, 20, 70, '#7a4a00'); fnBold('ALEATÓRIAS', 0, 100, 70, '#7a4a00'); ctx.restore();
  fnMono('📁 1 ARQUIVO', 540, 1080, 26, '#ffe9a0');
};
SCENE.folderopen = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#0e1236');
  const open = springMove(ATS(0.05), 0, 1, SPRING.smooth);
  ctx.save(); ctx.translate(540, 900); fnRR(-300, -200, 600, 400, 24, '#ffc840'); ctx.restore();
  ctx.save(); ctx.translate(540, lerp(900, 620, open)); ctx.rotate(lerp(0, -0.05, open)); fnRect(-200, -240, 400, 460, '#f6efe4'); fnRect(-180, -220, 360, 360, '#2a3170'); fnAt(0, -40, 2.0, () => fnRafaelHead(RR, { look: [0, 0], key: 'fo', mouth: 'smile' })); ctx.restore();
  ctx.save(); ctx.translate(540, 900); fnRR(-300, -120, 600, 320, 24, '#ffd860'); ctx.restore();
};
SCENE.yourphoto = () => {
  const t = LT(); fnSky('#3a1a3a', '#120818'); fnGlow(540, 700, 600, 'rgba(255,95,176,0.45)', 0.9);
  ctx.save(); ctx.translate(540, 700); ctx.rotate(-0.04); fnRect(-300, -360, 600, 680, '#f6efe4'); fnRect(-270, -330, 540, 540, '#2a3170');
  fnAt(0, -60, 2.6, () => fnRafaelHead(RR, { look: [0, 0], key: 'yp', mouth: 'smile', brow: 'up' })); ctx.font = 'italic 700 46px "FreeSerif", serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#5a2a4a'; ctx.fillText('???', 0, 280); ctx.restore();
  for (let i = 0; i < 10; i++) { const u = mod(TT * 0.5 + i / 10, 1); fnAlpha(1 - u, () => fnBold('♥', 120 + (i * 97) % 840, 1200 - u * 900, 36, '#ff5fb0')); }
  fnTag('SUA FOTO', 540, 1120, ATS(0.3), FN.pink, 34);
};
SCENE.school = () => {
  const t = LT(); fnSetLight(0.6, 1, 0.5); fnSky('#8ac8ff', '#e0f0ff', -200, 1000); fnCirc(860, 300, 80, '#fff4c0');
  fnRect(80, 420, 920, 680, '#e8d8a8'); fnRect(80, 420, 920, 60, '#c0392b'); for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) fnRR(120 + c * 150, 520 + r * 160, 110, 110, 6, '#4a8ab0');
  fnRR(420, 880, 240, 220, 10, '#5a3d28'); fnRR(330, 360, 420, 80, 10, '#1d3a8a'); fnBold('E.E. JOSÉ BONIFÁCIO', 540, 400, 30, '#ffffff');
  fnLine(980, 160, 980, 420, 8, '#c9ccd8'); fnBRFlag(1040, 200, 120, 1);
  fnRect(-300, 1100, W + 600, 900, '#7a8a6a');
  for (let i = 0; i < 6; i++) { const u = mod(TT * 0.25 + i / 6, 1); fnPerson(lerp(-100, 520, u) + i * 20, 1150 + (i % 2) * 40, 0.6, { ...fnWalkPose(TT * 1.6 + i, 1), side: 0.6, key: 'sch' + i }, STU[i % 3]); }
};
SCENE.holddoor = () => {
  const t = LT(); fnCorridor();
  const bow = springMove(ATS(0.2), 0, 1, SPRING.smooth);
  fnRR(640, 360, 300, 790, 10, '#5a3d28'); fnRR(660, 380, 260, 300, 8, '#a8c8dc');
  fnPerson(860, 1150, 1.25, { look: [-1, 0], mouth: 'smile', brow: 'up', lean: -0.2 * bow, aL: [-1.2, -0.4], aR: [0.3, 0.2], key: 'hd', side: 0.5, face: -1 }, STU[0]);
  fnWoman(330, 1150, 1.25, ju({ outfit: 'uniform', look: [1, 0], eyes: 'wide', lid: 0, brow: 'up', mouth: 'o', key: 'jd' }));
};
SCENE.hallway = () => {
  const t = LT(); fnCorridor({ scroll: t * 200 });
  [[160, 1, 'smile'], [400, 2, 'smile'], [880, 0, 'smile']].forEach(([x, c, m], i) => fnPerson(x, 1150, 1.0, { look: [i === 2 ? -1 : 1, 0], mouth: m, brow: 'up', aR: [-2.6 - Math.sin(TT * 10 + i) * 0.3, -0.2], key: 'hw' + i, side: 0.4, face: i === 2 ? -1 : 1 }, STU[c]));
  fnWoman(640, 1150, 1.2, ju({ outfit: 'uniform', look: [Math.sin(TT * 2), 0], eyes: 'wide', lid: 0, brow: 'up', mouth: 'smile', key: 'jh', ...fnWalkPose(TT * 1.4, 0.7) }));
  for (let i = 0; i < 3; i++) fnBubble('OI JÚ!', [200, 420, 880][i], 520 - i * 20, ATS(0.2 + i * 0.25), { size: 32 });
};
SCENE.teacher = () => {
  const t = LT(); fnSetLight(0.5, 1, 0.45); fnRect(-300, -300, W + 600, H + 600, '#d8c8a0');
  fnRR(60, 260, 960, 520, 10, '#2a5a3a'); fnRR(40, 240, 1000, 30, 6, '#8a5a3a'); ctx.save(); ctx.font = 'italic 700 46px "FreeSerif", serif'; ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.fillText('Revolução Francesa — 1789', 120, 360); ctx.fillText('Liberté, égalité…', 120, 440); ctx.restore();
  fnRect(-300, 1150, W + 600, 900, '#b0a080');
  const laugh = Math.abs(Math.sin(TT * 9));
  fnPerson(700, 1150 + laugh * 6, 1.5, { bald: true, beard: true, glasses: true, look: [-0.6, 0], eyes: 'squeeze', mouth: 'open', brow: 'up', key: 'pf', aL: [0.6, 1.4], aR: [-0.4, -0.6], lean: -0.1 + laugh * 0.04, tilt: -0.1 }, { skin: '#d8a070', hair: '#5a5a60', hood: '#8a6a4a', hoodD: '#6a5038', jeans: '#3a3a40' });
  fnWoman(250, 1150, 1.2, ju({ outfit: 'uniform', look: [1, 0], eyes: 'open', lid: 0.1, brow: 'up', mouth: 'smile', key: 'jt' }));
  for (let i = 0; i < 3; i++) fnBold('HA', 820 + i * 60, 540 - i * 50 + laugh * 10, 50, FN.yellow, 'center', 8);
};
SCENE.seehim = () => {
  const t = LT(); fnCorridor(); fnWash('#000020', 0.25);
  fnAt(540, 720, 3.3, () => fnWomanHead(RR, ju({ look: [0.9, 0], eyes: 'wide', lid: 0, brow: 'worry', mouth: 'o', key: 'sh', blink: false })));
};
SCENE.himself = () => {
  const t = LT(); fnCorridor(); fnCone(540, -100, 0, 1400, 380, 'rgba(255,240,200,0.9)', 0.25, 20);
  fnRafael(540, 1150, 1.45, { look: [0, 0.3], mouth: 'flat', brow: 'n', key: 'hs', ...fnWalkPose(TT * 1.2, 0.5) });
  fnTag('VOCÊ', 540, 380, ATS(0.2), FN.yellow, 40, FN.navy0);
};
SCENE.walking = () => {
  const t = LT(); fnCorridor({ scroll: t * 160 });
  fnRafael(lerp(260, 640, clamp(t / 1.1)), 1150, 1.35, { ...fnWalkPose(TT * 1.6, 1), side: 0.5, look: [0.4, 0.6], mouth: 'flat', key: 'wk' });
  fnRR(760, 1110, 140, 90, 20, '#c0392b'); fnRR(780, 1090, 100, 30, 10, '#a02a20');   // a backpack on the floor
};
SCENE.trip = () => {
  const t = LT(); fnCorridor();
  const fall = clamp((t - 0.15) / 0.5), land = t > 0.65;
  fnRR(500, 1110, 140, 90, 20, '#c0392b');
  ctx.save(); ctx.translate(560, 1150); ctx.rotate(EZ.i2(fall) * 1.35); fnRafael(0, 0, 1.35, { eyes: 'wide', mouth: 'open', brow: 'up', key: 'tr', aL: [-2.4, 0.2], aR: [2.4, -0.2], lL: [0.5, 0], lR: [-0.9, 0.4], shadow: false }); ctx.restore();
  if (land) { for (let i = 0; i < 10; i++) { const u = clamp((t - 0.65) / 0.4); fnCirc(820 + Math.cos(i) * 160 * u, 1150 - Math.abs(Math.sin(i)) * 100 * u, 12 * (1 - u), 'rgba(200,190,160,0.7)'); } fnTag('PLOFT', 760, 780, ATS(0.65), FN.yellow, 44, FN.navy0); }
};
SCENE.understand = () => {
  const t = LT(); fnCorridor(); fnWash('#000020', 0.2);
  const s2 = clamp(t / 1.2);
  fnAt(540, 720, 3.2, () => fnWomanHead(RR, ju({ look: [0.6, 0.3], eyes: 'open', lid: lerp(0, 0.35, s2), brow: 'sad', mouth: 'flat', key: 'un', blink: false })));
};
SCENE.facepalm = () => {
  const t = LT(); fnCorridor();
  const palm = springMove(ATS(0.1), 0, 1, SPRING.snappy);
  fnWoman(540, feetFor(680, 2.3), 2.3, ju({ outfit: 'uniform', look: [0, 0.4], eyes: 'closed', brow: 'worry', mouth: 'flat', key: 'fp', shadow: false, aR: [lerp(-0.12, -0.6, palm), lerp(0.04, -2.55, palm)] }));
  fnTag('AI, AI…', 540, 380, ATS(0.4), '#8a6aa8', 32);
};
SCENE.typing = () => {
  const t = LT(); fnSetLight(-0.5, 1, 0.5); fnSky('#ff9a6a', '#5a4a98', -200, 1200); fnRect(-300, 1100, W + 600, 900, '#5a4a6a');
  fnPhone(540, 760, 1.35, { screen: () => fnPhoneUI({ bg: '#0b1a1a', draw: () => {
    fnRect(-115, -200, 230, 50, '#1f3a34'); fnCirc(-80, -175, 16, '#c4865a'); fnMono('Rafael', 0, -175, 18, '#ffffff');
    const msg = 'Tá livre sábado?', n = Math.floor(clamp(t / 1.1) * msg.length);
    fnRR(-105, 150, 210, 40, 14, '#2a3036'); fnMono(msg.slice(0, n) + (mod(TT, 0.8) < 0.4 ? '|' : ''), 0, 170, 15, '#ffffff');
    for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) fnRR(-108 + c * 27, 196 + r * 12, 22, 9, 3, 'rgba(255,255,255,0.2)');
  } }) });
};
SCENE.send = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#0e1236');
  fnPhone(540, 760, 1.35, { screen: () => fnPhoneUI({ bg: '#0b1a1a', draw: () => {
    fnRect(-115, -200, 230, 50, '#1f3a34'); fnMono('Rafael', 0, -175, 18, '#ffffff');
    const u = springMove(ATS(0.1), 0, 1, SPRING.snappy); fnChatBubble(lerp(0, 20, u), lerp(170, 20, u), 190, 'Tá livre sábado?', true); if (t > 0.5) fnMono('✓ enviada', 40, 60, 13, '#9aa0c0');
  } }) });
  if (t > 0.1 && t < 0.5) fnParticles('snd', 20, 'rgba(120,220,160,0.6)', { x0: 300, x1: 780, y0: 500, y1: 900, speed: -400, size: 4 });
};
SCENE.otherside = () => {
  const t = LT(); fnSetLight(0.6, 1, 0.5); fnRect(-300, -300, W + 600, H + 600, '#2a2f5e'); fnRR(600, 300, 380, 360, 10, '#1a1f44'); ctx.save(); ctx.beginPath(); ctx.rect(620, 320, 340, 320); ctx.clip(); fnSky('#ff9a6a', '#5a4a98', 320, 640); ctx.restore(); fnBRFlag(240, 420, 200, 0.4);
  fnRect(-300, 1150, W + 600, 900, '#4a3424');
  const bz = mod(TT, 0.7) < 0.4 ? Math.sin(TT * 70) * 4 : 0;
  fnRafael(500, 1150, 1.5, { look: [0.6, 0.6], mouth: 'flat', brow: 'n', key: 'os', aR: [-0.9, -1.6], hold: (h) => { ctx.save(); ctx.translate(h[0] + bz, h[1] - 40); ctx.rotate(-0.2); fnRR(-40, -70, 80, 140, 12, '#1a1a22'); fnRR(-34, -62, 68, 124, 8, '#2f8a55'); ctx.restore(); fnGlow(h[0], h[1] - 40, 120, '#8af0b0', 0.5); } });
  fnTag('NOVA MENSAGEM', 540, 380, ATS(0.2), FN.green, 28);
};
SCENE.reads = () => {
  const t = LT(); fnRect(-300, -300, W + 600, H + 600, '#1a1f44'); fnGlow(540, 760, 400, 'rgba(120,240,170,0.35)', 0.8);
  // Rafael's face… but the expression (and the lashes of the thought bubble) is Júlia's
  fnAt(540, 760, 3.3, () => fnRafaelHead(RR, { look: [0, 0.5], eyes: 'open', lid: 0.3, brow: 'up', mouth: 'smirk', key: 'rd', blink: false }));
  const k = fnPop(ATS(0.6)); if (k > 0) { ctx.save(); ctx.translate(850, 380); ctx.scale(k, k); fnCirc(0, 0, 110, '#ffffff'); fnCirc(-90, 120, 22, '#ffffff'); fnAt(0, 0, 0.85, () => fnWomanHead(RR, ju({ lid: 0.3, mouth: 'smile', key: 'rdj', blink: false }))); ctx.restore(); }
};
SCENE.twist = () => {
  const t = LT(); fnSky('#2a0a3a', '#05030f');
  fnRect(-300, -300, 840, H + 600, '#3a1a4a'); fnRect(540, -300, 840, H + 600, '#1a2a4a'); fnLine(540, -300, 540, H + 300, 8, '#ffffff');
  fnRafael(270, 1150, 1.25, { look: [1, 0], mouth: 'smirk', lid: 0.3, brow: 'up', key: 'tw1' }); fnWoman(810, 1150, 1.25, ju({ outfit: 'uniform', look: [-1, 0], eyes: 'wide', lid: 0, brow: 'worry', mouth: 'o', key: 'tw2' }));
  fnMono('JÚLIA', 270, 380, 36, FN.pink); fnMono('RAFAEL', 810, 380, 36, FN.blueL); fnBold('⇄', 540, 760, 110, FN.yellow, 'center', 10);
};
SCENE.question = () => {
  const t = LT(); fnSky('#3a1a3a', '#120818'); for (let i = 0; i < 14; i++) { const u = mod(TT * 0.4 + i / 14, 1); fnAlpha(1 - u, () => fnBold('♥', 80 + (i * 137) % 920, 1300 - u * 1100, 30 + (i % 3) * 14, '#ff5fb0')); }
  const k = fnPop(ATS(0.1)); ctx.save(); ctx.translate(540, 720); ctx.scale(k, k); fnBold('E SE FOSSE', 0, -60, 80, '#ffffff', 'center', 10); fnBold('VOCÊ?', 0, 50, 130, FN.pink, 'center', 12); ctx.restore();
};
SCENE.firstthing = () => {
  const t = LT(); fnSky('#141a4a', '#06081a'); fnGridBG('rgba(255,95,176,0.06)', 80);
  const items = [['🚽', 'XIXI SENTADO'], ['📱', 'VER O CELULAR'], ['💬', 'MANDAR MENSAGEM']];
  items.forEach(([ic, txt], i) => { const x = springMove(ATS(0.1 + i * 0.25), 1500, 540, SPRING.snappy); fnRR(x - 380, 480 + i * 170, 760, 130, 24, 'rgba(11,15,36,0.92)'); ctx.lineWidth = 5; ctx.strokeStyle = [FN.yellow, FN.blueL, FN.pink][i]; ctx.beginPath(); ctx.roundRect(x - 380, 480 + i * 170, 760, 130, 24); ctx.stroke(); fnBold(String(i + 1), x - 300, 545 + i * 170, 64, [FN.yellow, FN.blueL, FN.pink][i]); fnBold(txt, x + 40, 548 + i * 170, 50, '#ffffff'); });
};
SCENE.cta = () => {
  const t = LT(); fnSky('#3a1a3a', '#120818'); fnGlow(540, 600, 600, 'rgba(255,95,176,0.4)', 0.8);
  fnAt(330, 560, 1.6, () => fnRafaelHead(RR, { look: [1, 0], mouth: 'smile', key: 'c1' })); fnAt(750, 560, 1.6, () => fnWomanHead(RR, ju({ look: [-1, 0], lid: 0.2, mouth: 'smile', key: 'c2' })));
  fnBold('♥', 540, 560, 90, FN.pink, 'center', 8);
  const k = fnPop(ATS(0.1)); ctx.save(); ctx.translate(540, 860); ctx.scale(k, k); fnBold('A PRIMEIRA COISA', 0, -40, 66, '#ffffff', 'center', 10); fnBold('QUE VOCÊ FARIA?', 0, 40, 70, FN.yellow, 'center', 10); ctx.restore();
  const k2 = fnPop(ATS(1.0)); if (k2 > 0) { ctx.save(); ctx.translate(540, 1080); ctx.scale(k2, k2); fnRR(-250, -50, 500, 100, 50, FN.yellow); fnBold('COMENTA 👇', 0, 3, 52, FN.navy0); ctx.restore(); }
  if (t > 3.0) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = `rgba(0,0,0,${clamp((t - 3.0) / 0.5)})`; ctx.fillRect(0, 0, W, H); ctx.restore(); }
};
