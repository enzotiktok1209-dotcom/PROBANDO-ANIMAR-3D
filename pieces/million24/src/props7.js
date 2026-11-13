// =====================================================================
//  props7.js — new props and sets for "100 Millionen vs 1 € pro Sekunde, 4 Jahre"
//  electric sedan, 100-euro note, döner, imbiss stand, airfield, Jonas' street, tip jar, throne backdrop
// =====================================================================

// a sleek white electric sedan (side view, facing right). o: { col, wheelSpin, door (0..1 rear-hinged swing), lights }
function eCar(x, y, s, o = {}) {
  const col = o.col ?? '#f3f5fa', hi = '#ffffff', dk = shade(col, -0.18), dk2 = shade(col, -0.42), spin = o.wheelSpin ?? 0;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shadowEll(0, 6, 590, 44, 0.55); ell(0, 2, 520, 14, 'rgba(0,0,0,0.3)');
  const W1 = [-320, -46], W2 = [330, -46], TR = 100;
  // body: long smooth roofline, short nose, fastback tail
  const body = [[560, -60], [556, -104], [500, -128], [360, -150], [210, -168], [90, -256], [-60, -268], [-210, -250], [-380, -178], [-520, -160], [-560, -128], [-556, -70], [-520, -38], [520, -38]];
  ctx.beginPath(); body.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py))); ctx.closePath();
  ctx.fillStyle = lin(0, -270, 0, -38, [[0, hi], [0.45, col], [0.8, shade(col, -0.06)], [1, dk]]); ctx.fill();
  ctx.save(); ctx.clip();
  poly([[570, -84], [300, -112], [0, -122], [-300, -126], [-570, -118], [-570, 0], [570, 0]], dk);          // lower body in shade
  poly([[570, -88], [300, -116], [0, -126], [-300, -130], [-570, -122], [-570, -116], [-300, -122], [0, -118], [300, -108], [570, -80]], hi);
  ctx.globalAlpha = 0.6; poly([[470, -126], [300, -150], [200, -164], [196, -158], [300, -144], [462, -120]], '#ffffff'); ctx.globalAlpha = 1;
  fillRR(-230, -62, 480, 22, 8, '#1a1c26');                                                                // side skirt
  ctx.restore();
  // panoramic glass roof + side windows
  const win = [[205, -166], [88, -248], [-58, -258], [-200, -242], [-350, -182], [-120, -170]];
  ctx.beginPath(); win.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py))); ctx.closePath();
  ctx.fillStyle = lin(0, -258, 0, -166, [[0, '#26304a'], [1, '#0b0f1e']]); ctx.fill();
  ctx.save(); ctx.clip(); ctx.globalAlpha = 0.32; poly([[130, -260], [170, -260], [60, -160], [20, -160]], '#cfe0ff'); poly([[-80, -260], [-60, -260], [-170, -160], [-190, -160]], '#cfe0ff'); ctx.restore();
  line(-40, -258, -60, -172, 7, dk2);                                                                      // B-pillar
  // door seams and flush handles
  line(-60, -168, -50, -64, 4, dk2); line(205, -164, 214, -64, 4, dk2); line(-330, -170, -330, -66, 3, dk2);
  fillRR(90, -150, 70, 12, 6, dk2); fillRR(-200, -150, 70, 12, 6, dk2);
  poly([[190, -172], [160, -186], [146, -176], [170, -164]], dk2);                                        // mirror
  // light bars
  poly([[556, -104], [470, -118], [460, -112], [552, -94]], '#f4fbff'); glow(520, -106, 130, '#e6f4ff', o.lights ? 0.7 : 0.4);
  line(-560, -134, -470, -142, 9, '#ff2a3a'); glow(-520, -138, 110, '#ff3040', 0.35);
  // the driver door swings open (towards the viewer: it shortens and darkens)
  if (o.door > 0) { const d = o.door; ctx.save(); ctx.translate(-60, 0); ctx.scale(1 - 0.55 * d, 1); poly([[0, -250], [-150, -238], [-270, -180], [-270, -64], [0, -64]], shade(col, -0.1 - 0.15 * d)); line(0, -250, 0, -64, 6, dk2); ctx.restore(); poly([[-60, -248], [-60, -66], [-60 - 120 * (1 - 0.55 * d), -66]], 'rgba(10,12,22,0.55)'); }
  // wheels: aero rims
  for (const [wx, wy] of [W1, W2]) {
    ctx.save(); ctx.beginPath(); ctx.rect(wx - 140, -260, 280, 214); ctx.clip(); circ(wx, wy, TR + 14, '#07080d'); ctx.restore();
    circ(wx, wy, TR, '#111117'); circ(wx, wy, TR - 10, '#1d1e26'); circ(wx, wy, 70, '#c9ced9'); circ(wx, wy, 62, '#aeb4c2');
    for (let i = 0; i < 5; i++) { const a = spin + (i / 5) * TAU; ctx.save(); ctx.translate(wx, wy); ctx.rotate(a); poly([[-10, -14], [10, -14], [26, -58], [-26, -58]], '#e3e7ef'); ctx.restore(); }
    circ(wx, wy, 14, '#2a2c36');
  }
  ctx.restore();
}

// a 100-euro note (green-ish orange like the real one is too subtle: we keep the series' green cash look, big "100")
function euro100(x, y, w, rot = 0, flip = 1) {
  const h = w * 0.52;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, flip);
  fillRR(-w / 2 + 6, -h / 2 + 8, w, h, w * 0.05, 'rgba(0,0,0,0.25)');
  fillRR(-w / 2, -h / 2, w, h, w * 0.05, flip > 0 ? '#3fae5a' : '#2f8a47');
  fillRR(-w / 2 + w * 0.04, -h / 2 + h * 0.08, w * 0.92, h * 0.84, w * 0.04, flip > 0 ? '#6fd18a' : '#4fae68');
  circ(-w * 0.22, 0, h * 0.3, flip > 0 ? '#2f8a47' : '#226b3a');
  if (flip > 0) {
    tText('€', -w * 0.22, 2, h * 0.36, { color: '#e9ffe9', shadow: false });
    tText('100', w * 0.2, 4, h * 0.42, { color: '#ffffff', stroke: '#1f6b35', strokeW: h * 0.06, shadow: false });
    tText('100', -w * 0.38, -h * 0.3, h * 0.13, { color: '#e9ffe9', shadow: false });
  }
  ctx.restore();
}
// a falling note: flutters left/right, rocks, lands at yEnd and lies flat
function fallingNote(t0, x0, y0, yEnd, w) {
  if (TT < t0) { euro100(x0, y0, w, -0.2); return; }
  const t = TT - t0, v = 520, y = Math.min(yEnd, y0 + v * t + 60 * t * t), landed = y >= yEnd;
  const tl = landed ? (yEnd - y0) / v * 0.9 : t, x = x0 + Math.sin(tl * 4.2) * 110 + tl * 40, rot = landed ? 0.05 : Math.sin(tl * 5.2) * 0.7, sq = landed ? 0.22 : 0.5 + 0.5 * Math.abs(Math.cos(tl * 5.2));
  ctx.save(); ctx.translate(x, y); ctx.scale(1, sq); euro100(0, 0, w, rot); ctx.restore();
}

// a döner kebab in a flatbread, seen from the side
function doener(x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shadowEll(0, 150, 170, 22, 0.35);
  poly([[-150, -150], [150, -150], [40, 150], [-40, 150]], '#f4d7a1');                      // the bread pocket
  ctx.save(); ctx.beginPath(); ctx.moveTo(-150, -150); ctx.lineTo(150, -150); ctx.lineTo(40, 150); ctx.lineTo(-40, 150); ctx.closePath(); ctx.clip();
  for (let i = 0; i < 7; i++) ell(-110 + i * 36, -150, 34, 48, i % 2 ? '#8a4a24' : '#a85f2e');   // meat
  for (let i = 0; i < 6; i++) ell(-100 + i * 40, -175, 22, 14, '#4cc56d');                       // salad
  for (let i = 0; i < 4; i++) ell(-80 + i * 52, -160, 14, 10, '#e8483c');                        // tomato
  ell(0, -120, 120, 18, 'rgba(255,255,255,0.85)');                                               // sauce
  ctx.restore();
  poly([[-150, -150], [-112, -150], [-20, 150], [-40, 150]], 'rgba(160,110,40,0.25)');
  fillRR(-70, 40, 140, 120, 14, '#ffffff'); tText('DÖNER', 0, 100, 30, { color: '#e8483c', shadow: false });   // paper wrap
  ctx.restore();
}

// a döner shop counter at night: striped awning, menu board, a rotating spit
function setImbiss(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1600, [[0, '#2a1d4f'], [1, '#4a2a5a']]); ctx.fillRect(-600, -400, 2300, 2100);
    fillRR(-100, 300, 1280, 1300, 0, '#7a4630'); for (let i = 0; i < 12; i++) line(-100, 340 + i * 105, 1180, 340 + i * 105, 4, 'rgba(0,0,0,0.12)');
    for (let i = 0; i < 9; i++) poly([[-100 + i * 150, 260], [50 + i * 150, 260], [50 + i * 150, 400], [-100 + i * 150, 400]], i % 2 ? '#ffffff' : '#e8262f');
    for (let i = 0; i < 9; i++) ell(-25 + i * 150, 400, 75, 26, i % 2 ? '#ffffff' : '#e8262f');
    neonSign(540, 180, 'DÖNER · IMBISS', '#ffd23f');
    fillRR(120, 560, 840, 330, 22, '#141026'); tText('MENÜ', 540, 605, 44, { color: '#ffd23f', shadow: false });
    [['DÖNER', '7,50 €'], ['DÜRÜM', '8,00 €'], ['POMMES', '4,00 €']].forEach(([a, b], i) => { tText(a, 300, 680 + i * 70, 40, { color: '#fff', shadow: false, align: 'left' }); tText(b, 800, 680 + i * 70, 40, { color: '#41f08a', shadow: false }); });
    // the spit
    ctx.save(); ctx.translate(890, 1060); fillRR(-8, -230, 16, 330, 6, '#9aa0b8');
    for (let i = 0; i < 6; i++) { const ww = 120 - Math.abs(i - 2) * 16; fillRR(-ww / 2, -200 + i * 46, ww, 44, 18, i % 2 ? '#8a4a24' : '#a85f2e'); }
    glow(-60, -60, 160, '#ff8a3a', 0.35 + 0.1 * Math.sin(TT * 7)); ctx.restore();
    fillRR(-100, 1280, 1280, 70, 10, '#c9cbd8'); fillRR(-100, 1350, 1280, 400, 0, '#5a3a2a');
  });
}

// an airfield in the sun: sky, distant hangar, runway with markings
function setAirfield(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1300, [[0, '#4aa8ff'], [1, '#cfeeff']]); ctx.fillRect(-600, -400, 2300, 1800);
    circ(880, 300, 90, '#fff6c0'); glow(880, 300, 300, '#fff3b0', 0.5);
    for (let i = 0; i < 4; i++) ell(((120 + i * 330 + TT * 22) % 1600) - 250, 360 + (i % 2) * 120, 150, 42, 'rgba(255,255,255,0.9)');
    fillRR(60, 960, 560, 230, 30, '#9aa3b8'); fillRR(60, 960, 560, 40, 20, '#7d879e'); fillRR(180, 1040, 320, 150, 0, '#3c4256'); tText('HANGAR 1', 340, 1000, 30, { color: '#ffffff', shadow: false });
    ctx.fillStyle = '#5cbf5a'; ctx.fillRect(-600, 1180, 2300, 900);
    poly([[-600, 1250], [1700, 1250], [1700, 1700], [-600, 1700]], '#4a4d5c');
    for (let i = 0; i < 9; i++) fillRR(-500 + i * 260, 1462, 150, 22, 8, '#f5f5f5');
    line(-600, 1262, 1700, 1262, 8, '#f5e9a8'); line(-600, 1688, 1700, 1688, 8, '#f5e9a8');
  });
}

// the street in front of Jonas' house (day): his house, a fence, trees, the sidewalk and the road
function setJonasFront(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1240, [[0, '#7cc6ff'], [1, '#d8f0ff']]); ctx.fillRect(-600, -400, 2300, 1700);
    for (let i = 0; i < 3; i++) ell(((180 + i * 380 + TT * 14) % 1500) - 200, 260 + i * 70, 120, 38, '#ffffff');
    for (const [tx, ts] of [[80, 1.0], [1060, 0.9]]) { ctx.save(); ctx.translate(tx, 1240); ctx.scale(ts, ts); fillRR(-26, -420, 52, 420, 14, '#7a4a2a'); for (const [cx, cy, r] of [[0, -520, 170], [-110, -430, 120], [110, -430, 120], [0, -400, 130]]) circ(cx, cy, r, '#3fbf6a'); circ(-40, -560, 70, '#5bd47f'); ctx.restore(); }
    houseIcon(780, 1240, 1.12, 0); fillRR(740, 1180, 80, 60, 6, '#c9b8a0');
    for (let i = 0; i < 14; i++) fillRR(-100 + i * 90, 1150, 16, 90, 6, '#ffffff'); fillRR(-100, 1170, 1300, 12, 4, '#ffffff'); fillRR(-100, 1210, 1300, 12, 4, '#ffffff');
    ctx.fillStyle = '#c9cbd8'; ctx.fillRect(-600, 1240, 2300, 70); for (let i = 0; i < 12; i++) line(-500 + i * 160, 1240, -500 + i * 160, 1310, 3, 'rgba(0,0,0,0.12)');
    ctx.fillStyle = '#3d3a4f'; ctx.fillRect(-600, 1310, 2300, 1100); for (let i = 0; i < 8; i++) fillRR(-500 + i * 300, 1520, 160, 18, 9, '#f5e9a8');
  });
}
// the same street seen from close by, at foot level: pavement and the bottom of the fence
function setPavement(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 900, [[0, '#9fd6ff'], [1, '#e2f4ff']]); ctx.fillRect(-600, -400, 2300, 1400);
    for (let i = 0; i < 9; i++) fillRR(-100 + i * 150, 560, 34, 380, 10, '#ffffff'); fillRR(-200, 620, 1500, 24, 8, '#ffffff'); fillRR(-200, 820, 1500, 24, 8, '#ffffff');
    ctx.fillStyle = '#d3d5e0'; ctx.fillRect(-600, 940, 2300, 1300);
    for (let i = 0; i < 6; i++) line(-500 + i * 400, 940, -900 + i * 600, 2200, 5, 'rgba(0,0,0,0.10)');
    for (let i = 0; i < 4; i++) line(-600, 1150 + i * 260, 1700, 1150 + i * 260, 5, 'rgba(0,0,0,0.08)');
  });
}

// a glass tip jar with a label
function tipJar(x, y, s, fill = 0.25) {
  coinJar(x, y, s, fill);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fillRR(-150, -120, 300, 84, 14, '#fff6d8'); tText('TRINKGELD', 0, -78, 40, { color: '#c4520a', shadow: false }); ctx.restore();
}
// golden throne backdrop for "König der Welt"
function setThrone(o = {}) {
  withBlur(o.blur, () => {
    rays('#5a3a00', '#8a5f08', { cy: 900, spin: 0.12 });
    glow(540, 800, 700, '#ffe08a', 0.35);
    ctx.save(); ctx.translate(540, 1500);
    fillRR(-330, -1050, 660, 900, 120, '#b8132a'); fillRR(-290, -1010, 580, 830, 100, '#d81f3a');
    for (const sx of [-1, 1]) { fillRR(sx * 330 - 60, -1120, 120, 980, 50, PAL.gold); circ(sx * 330, -1150, 70, PAL.gold); circ(sx * 330, -1150, 40, '#fff1a8'); }
    fillRR(-420, -200, 840, 140, 40, PAL.gold); fillRR(-380, -60, 760, 120, 30, '#b48a1c');
    ctx.restore();
    ctx.fillStyle = '#3a2a5a'; ctx.fillRect(-600, 1560, 2300, 800); rugPattern(540, 1700, 520, 90, '#b8132a', PAL.gold);
  });
}
// small digital alarm clock (night stand) showing a ticking stopwatch value
function nightStopwatch(x, y, s) { stopwatch(x, y, s, (TT - 10) * 1.0); }
