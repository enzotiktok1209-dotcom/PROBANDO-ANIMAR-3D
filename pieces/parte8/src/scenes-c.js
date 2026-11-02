// =====================================================================
//  scenes-c.js — S49..S87: the search (helicopter, dogs, the soldier who covers for her), the hut, the radio,
//  sleep, the footprints, the door, three soft knocks.
// =====================================================================
function forestNight(o = {}) { flSky({ key: o.key || 50, moon: o.moon ?? true, mx: o.mx ?? 820, my: 280 }); flMountains(860, { key: o.key || 50, s: 0.8 }); flForest(980, { key: o.key || 50, n: 16, s: 1.1, off: o.off || 0 }); flGround(980, { c0: '#cfd8e6', c1: '#8e9bb2' }); }
function hutInside(o = {}) {
  flPlanks(-60, -60, W + 120, 1400, { c: '#6e4426', key: 65 });
  flRect(-60, 1180, W + 120, 900, 0, '#4a2a16'); for (let i = 0; i < 9; i++) flRect(-60, 1180 + i * 70, W + 120, 4, 0, '#3a2010', 0.8);
  if (o.antlers !== false) flAntlers(540, 330, 0.9);
  flLantern(170, 420, 1.1, 1);
  const warm = o.fire ?? 1; if (warm > 0) { ctx.save(); ctx.globalCompositeOperation = 'soft-light'; ctx.fillStyle = flRad(860, 1000, 50, 1300, [[0, `rgba(255,150,60,${0.8 * warm})`], [1, 'rgba(0,0,0,0)']]); ctx.fillRect(0, 0, W, H); ctx.restore(); }
}
function bed(x, y, s) { flRect(x - 300 * s, y - 40 * s, 600 * s, 160 * s, 20 * s, '#5a3418'); flRect(x - 290 * s, y - 90 * s, 580 * s, 80 * s, 26 * s, '#cfd3da'); flRect(x - 280 * s, y - 130 * s, 150 * s, 70 * s, 30 * s, '#f0f0ee'); }

// ---------------------------------------------------------------- S49 minutes later
function S49(u, d) {
  ctx.save(); flCam(lerp(1.1, 1, EZ.io(u / d)), 540, 900, 540, 860);
  forestNight({ key: 49 });
  flAvalanche(540, 1080, 1300, 220, { key: 49, roll: 0.2, chunks: 0, puff: 0.6 });
  ctx.restore();
  flSnow({ n: 70, key: 49 });
  const n = Math.floor(clamp(u / 0.5) * 14); flText('MINUTEN SPÄTER'.slice(0, n) + (Math.floor(TT * 4) % 2 ? '_' : ''), 540, 600, 70, '#e8ecf3', { font: FL_MONO, weight: 800 });
}
// ---------------------------------------------------------------- S50 helicopter
function S50(u, d) {
  ctx.save(); const [sx, sy] = flShake(TT, 5, 40, 50); ctx.translate(sx, sy);
  forestNight({ key: 50, moon: false });
  flHeli(lerp(200, 640, EZ.o2(u / d)), lerp(780, 560, EZ.o2(u / d)), 1.5, { light: true, tilt: 0.1, sweep: Math.sin(u * 3) * 200 });
  ctx.restore(); flSnow({ n: 120, wind: 260, key: 50 });
}
// ---------------------------------------------------------------- S51 searchlight
function S51(u, d) {
  flBg([[0, '#0a0d18'], [1, '#1a2034']]); flGround(500, { c0: '#3a465e', c1: '#1c2436' });
  const R = RNG('tr51'); for (let i = 0; i < 14; i++) flPine(R.r(0, W), R.r(700, 1500), R.r(160, 320), '#0d1420');
  const ang = lerp(-0.7, 0.6, EZ.io(u / d)); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.translate(540, -100); ctx.rotate(ang); ctx.fillStyle = flGrad(0, 0, 0, 1900, [[0, 'rgba(255,250,220,0.6)'], [1, 'rgba(255,250,220,0.08)']]); ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(30, 0); ctx.lineTo(320, 1900); ctx.lineTo(-320, 1900); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.save(); ctx.translate(540, -100); ctx.rotate(ang); ctx.globalCompositeOperation = 'lighter'; flEll(0, 1250, 330, 120, 'rgba(255,250,220,0.35)'); ctx.restore();
  flSnow({ n: 90, wind: 60, key: 51 });
}
// ---------------------------------------------------------------- S52 dogs
function S52(u, d) {
  ctx.save(); flCam(1.05, 540, 1000, 540, 900);
  forestNight({ key: 52, moon: false });
  flHuman(800, 1250, 0.95, { top: FL.olive, topS: FL.oliveS, topLen: -232, pants: FL.oliveS, shoe: '#111', hand: '#1a1a1a', armR: [55, 20], armL: [10, 10], head: (hx, hy) => flSoldierHead(hx, hy - 10, 58, { eyes: 'red' }) });
  const bark = Math.sin(u * 14) > 0.3;
  flDog(380, 1240, 1.6, { growl: bark, walk: true, headRot: bark ? -0.15 : 0 });
  flLine([[620, 1040], [845, 1080]], '#2b2b2b', 5);
  ctx.restore(); flSnow({ n: 80, key: 52 });
}
// ---------------------------------------------------------------- S53 signal found
function S53(u, d) {
  ctx.save(); flCam(1 + EZ.io(u / d) * 0.08, 540, 760, 540, 760);
  flBg([[0, '#10141f'], [1, '#05060a']]); flSnow({ n: 50, key: 53 });
  const lock = u > 0.55; flScanner(540, 760, 1.55, { dot: [lerp(-60, 30, clamp(u / 0.5)), lerp(40, -10, clamp(u / 0.5))], label: lock ? 'SIGNAL GEFUNDEN' : 'SUCHE…', lock });
  for (const s of [-1, 1]) { flEll(540 + s * 300, 1150, 70, 60, '#1a1a1a'); flLine([[540 + s * 300, 1150], [540 + s * 420, 1700]], FL.olive, 120); }
  ctx.restore();
}
// ---------------------------------------------------------------- S54 they dig all night (time-lapse)
function S54(u, d) {
  const p = u / d;
  flBg([[0, lerp(0, 1, p) > 0.85 ? '#1f2b4a' : '#0d1222'], [1, '#2a3558']]); flStars(70, 900, 54);
  const ma = lerp(Math.PI * 1.1, Math.PI * 1.9, p); flMoon(540 + Math.cos(ma) * 420, 760 + Math.sin(ma) * 420, 40);
  flMountains(900, { key: 54 }); flGround(960);
  ctx.save(); ctx.globalAlpha = 0.9; flAvalanche(540, 1060, 1100, 200, { key: 54, roll: 0.2, chunks: 0, puff: 0.6 }); ctx.restore();
  for (let i = 0; i < 5; i++) { const x = 260 + i * 140, ph = Math.sin(TT * 9 + i * 1.3); flSoldier(x, 1080, 0.55, { aim: 0, rifle: false, eyes: 'red', armR: [70 + ph * 40, 40], armL: [70 + ph * 40, 40], crouch: 0.3 }); ctx.save(); ctx.translate(x + 40, 860 + ph * 20); ctx.rotate(0.5 + ph * 0.4); flRect(-6, -60, 12, 150, 4, '#5a4632'); flRect(-26, 80, 52, 50, 10, '#7d8592'); ctx.restore(); }
  flRect(820, 300, 200, 80, 12, 'rgba(10,12,22,0.85)'); const hh = Math.floor(lerp(2, 5.9, p)), mm = Math.floor(mod(lerp(14, 59 * 4, p), 60)); flText(`0${hh}:${String(mm).padStart(2, '0')}`, 920, 360, 46, FL.hudY, { font: FL_MONO, weight: 800, shadow: false });
}
// ---------------------------------------------------------------- S55 you crawl through the forest
function S55(u, d) {
  ctx.save(); flCam(1, 540, 1000, 540, 900);
  forestNight({ key: 55, off: -u * 140 });
  flvKlausFull(lerp(280, 520, u / d), 1260, 520, { gait: 1.1 });
  ctx.save(); ctx.translate(lerp(280, 520, u / d) - 10, 1260 - 470); ctx.rotate(-1.45); flvFatherFull(0, 0, 360, { closed: true }); ctx.restore();
  flvGretaFull(lerp(560, 760, u / d), 1280, 470, { mood: 'fear', gait: 1.2, lean: 0.15 });
  for (const [x, y] of [[lerp(560, 760, u / d), 900], [lerp(280, 520, u / d), 790]]) { const ph = mod(u * 1.2, 1); flEll(x + 30 + ph * 30, y - ph * 60, 20 + ph * 30, 14 + ph * 18, '#d8e2ef', 0.5 * (1 - ph)); }
  if (u > 0.9 && u < 1.2) { flLine([[900, 1240], [960, 1210]], '#3a2a1a', 8); flLine([[960, 1210], [1010, 1240]], '#3a2a1a', 8); }
  ctx.restore();
}
// ---------------------------------------------------------------- S56 a dog stops
function S56(u, d) {
  ctx.save(); flCam(1.1, 540, 1060, 540, 900);
  forestNight({ key: 56, moon: false });
  const sn = Math.floor(u * 8) % 2 ? 0.06 : -0.02; flDog(470, 1240, 1.7, { headRot: sn, wag: 0.5 });
  ctx.restore(); flSnow({ n: 50, key: 56 });
}
// ---------------------------------------------------------------- S57 right beside you
function S57(u, d) {
  ctx.save(); flCam(1 + EZ.io(u / d) * 0.06, 540, 760, 540, 760);
  forestNight({ key: 57, moon: false }); ctx.save(); ctx.globalAlpha = 0.4; ctx.fillStyle = '#05070d'; ctx.fillRect(-100, -100, 1300, 2200); ctx.restore();
  const M = flvMap('g_44.5', 440, 760, 400);
  flvGreta(440, 760, 400, { mood: 'fear', look: [0.8, 0], blood: 1 });
  const mb = M.lbox('mouth') || [420, 860, 460, 880]; flEll((mb[0] + mb[2]) / 2, (mb[1] + mb[3]) / 2 + 6, 90, 60, '#f0c3a2'); for (let k = 0; k < 4; k++) flRect((mb[0] + mb[2]) / 2 - 70 + k * 36, (mb[1] + mb[3]) / 2 - 70, 30, 70, 15, '#f0c3a2');
  flRect(-100, 1030, 1300, 220, 60, '#4a3220'); flRect(-100, 1030, 1300, 30, 15, '#5e4029'); for (let i = 0; i < 6; i++) flEll(80 + i * 200, 1140, 40, 20, '#3a2614');
  flRect(-100, 1010, 1300, 40, 20, '#eef3fa');
  const sn = Math.sin(u * 22) * 6; ctx.save(); ctx.translate(1180 - EZ.o2(clamp(u / 0.4)) * 220 + sn, 760); ctx.scale(-1, 1); ctx.scale(2.2, 2.2); flSmooth([[-30, 20], [-20, -40], [30, -50], [70, -30], [110, -10], [112, 18], [60, 34], [0, 40]], '#a8743c'); flEll(108, -4, 11, 9, '#111'); ctx.restore();
  ctx.restore();
}
// ---------------------------------------------------------------- S58 it growls
function S58(u, d) {
  ctx.save(); const [sx, sy] = flShake(TT, 6, 40, 58); ctx.translate(sx, sy); flCam(1 + EZ.io(u / d) * 0.1, 540, 760, 540, 760);
  flBg([[0, '#0d1220'], [1, '#1c2440']]);
  flDog(540 - 200 * 3.4, 760 + 190 * 3.4, 3.4, { growl: true, headRot: -0.05 });
  ctx.restore();
}
// ---------------------------------------------------------------- S59 a voice
function S59(u, d) {
  forestNight({ key: 59, moon: false }); ctx.save(); ctx.globalAlpha = 0.5; ctx.fillStyle = '#04060c'; ctx.fillRect(0, 0, W, H); ctx.restore();
  flBeam(1150, 700, lerp(2.4, 2.9, EZ.io(u / d)), 1300, 200, 0.55);
  for (let i = 0; i < 3; i++) flFootprint(900 - i * 90, 1250 + (i % 2) * 30, 1.6, -1.5, '#56627a', clamp(u * 3 - i));
}
// ---------------------------------------------------------------- S60 "Hier ist nichts!"
function S60(u, d) {
  ctx.save(); flCam(1 + EZ.io(u / d) * 0.06, 540, 760, 540, 760);
  forestNight({ key: 60, moon: false }); ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = '#04060c'; ctx.fillRect(-100, -100, 1300, 2200); ctx.restore();
  flRect(240, 960, 600, 900, 140, FL.olive); flRect(240, 960, 600, 60, 30, FL.oliveS);
  flYoungHead(540, 700, 250, { mouth: 'shout', look: [-0.6, 0], blink: false });
  flRect(740, 880, 60, 120, 12, '#1d1f24'); flRect(760, 830, 12, 60, 4, '#1d1f24'); flEll(770, 990, 50, 44, '#2a2a26');
  ctx.restore();
}
// ---------------------------------------------------------------- S61 the soldier from before: a tiny nod
function S61(u, d) {
  ctx.save(); flCam(1 + EZ.io(u / d) * 0.1, 540, 700, 540, 720);
  forestNight({ key: 61, moon: true, mx: 300 }); ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = '#04060c'; ctx.fillRect(-100, -100, 1300, 2200); ctx.restore();
  flRect(240, 960, 600, 900, 140, FL.olive);
  const nod = u > 0.7 && u < 1.1 ? Math.sin((u - 0.7) / 0.4 * Math.PI) * 0.12 : 0;
  flYoungHead(540, 700 + nod * 100, 260, { look: [0.7, 0.2], blink: u > 0.4 && u < 0.5 });
  ctx.restore();
}
// ---------------------------------------------------------------- S62 he calls the dog back
function S62(u, d) {
  ctx.save(); flCam(1, 540, 1000, 540, 900);
  forestNight({ key: 62, moon: false });
  const x = lerp(560, 120, EZ.i2(u / d)); const g = flGait(TT, 1.4, 26);
  flHuman(x + 240, 1250, 0.95, { top: FL.olive, topS: FL.oliveS, topLen: -232, pants: FL.oliveS, shoe: '#111', hand: '#1a1a1a', flip: true, ...g, head: (hx, hy) => flYoungHead(hx, hy - 6, 60, {}) });
  flDog(x, 1250, 1.5, { flip: true, walk: true, wag: 4 });
  flLine([[x - 150, 1050], [x + 200, 1000]], '#2b2b2b', 5);
  ctx.restore(); flSnow({ n: 60, key: 62 });
}
// ---------------------------------------------------------------- S63 your heart in your throat
function S63(u, d) {
  ctx.save(); const [sx, sy] = flShake(TT, 3, 30, 63); ctx.translate(sx, sy); flCam(1 + EZ.io(u / d) * 0.07, 540, 720, 540, 740);
  forestNight({ key: 63, moon: false }); ctx.save(); ctx.globalAlpha = 0.45; ctx.fillStyle = '#04060c'; ctx.fillRect(-100, -100, 1300, 2200); ctx.restore();
  flvGreta(540, 720, 470, { mood: 'cry', blood: 1, breath: 9, breathAmp: 10 });
  ctx.restore();
  flECG(300, 250, 480, 110, Math.round(lerp(160, 118, clamp((u - 1) / 0.8))), FL.red);
}
// ---------------------------------------------------------------- S64 day nine: the hunting hut
function S64(u, d) {
  ctx.save(); flCam(lerp(1, 1.12, EZ.io(u / d)), 540, 860, 540, 800);
  flBg([[0, '#1d2340'], [0.5, '#5b4a6a'], [1, '#c98a6a']]); flMountains(900, { key: 64, c: '#3a3c5c' }); flForest(980, { key: 64, n: 10, c: '#1a1e2c' }); flGround(980, { c0: '#e6dce4', c1: '#9da6bd' });
  flPlanks(330, 760, 420, 280, { key: 64 }); flFill([[300, 780], [540, 600], [780, 780]], '#3a2414'); flFill([[300, 780], [540, 600], [780, 780], [740, 760], [540, 630], [340, 760]], '#f2f6fb');
  flRect(640, 640, 50, 110, 4, '#4a2a16'); for (let k = 0; k < 4; k++) { const ph = mod(u * 0.6 + k / 4, 1); flEll(665 + ph * 60, 630 - ph * 220, 26 + ph * 40, 20 + ph * 30, '#b8b4c4', 0.5 * (1 - ph)); }
  flRect(400, 860, 100, 90, 6, '#ffcf7a'); flGlow(450, 905, 140, 'rgba(255,190,90,0.6)'); flRect(560, 880, 110, 160, 6, '#4a2a16');
  ctx.restore(); flSnow({ n: 40, wind: 20, speed: 0.6, key: 64 });
}
// ---------------------------------------------------------------- S65 inside
function S65(u, d) {
  ctx.save(); flCam(lerp(1.1, 1, EZ.io(u / d)), 540, 760, 540, 760);
  hutInside({ fire: 0.2 });
  flShutterWindow(820, 640, 260, 300, 0.05, { inside: () => flBg([[0, '#2a3050'], [1, '#5b4a6a']]) });
  flRect(120, 1040, 520, 40, 10, '#5a3418'); flRect(150, 1080, 30, 200, 6, '#4a2a16'); flRect(580, 1080, 30, 200, 6, '#4a2a16');
  flRadio(380, 990, 0.55, { on: 0 });
  ctx.restore();
}
// ---------------------------------------------------------------- S66 a fire
function S66(u, d) {
  ctx.save(); flCam(1 + EZ.io(u / d) * 0.12, 540, 900, 540, 800);
  flBg([[0, '#2a1a10'], [1, '#120a06']]);
  flRect(220, 560, 640, 640, 30, '#5b5450'); flRect(300, 680, 480, 520, 20, '#1c1612'); for (let i = 0; i < 6; i++) flRect(220, 560 + i * 107, 640, 6, 0, '#4a4440');
  const k = EZ.o3(clamp(u / 0.35)); if (k > 0) flFire(540, 1150, 1.6, k);
  ctx.restore();
}
// ---------------------------------------------------------------- S67 silence: warm
function S67(u, d) {
  ctx.save(); flCam(lerp(1.15, 1, EZ.io(u / d)), 540, 800, 540, 780);
  hutInside({ fire: 1 });
  flvGreta(540, 700, 420, { mood: 'calm', breath: 1.5, breathAmp: 6 });
  ctx.save(); ctx.fillStyle = '#5d6a86'; ctx.beginPath(); ctx.moveTo(110, 1900); ctx.lineTo(160, 1080); ctx.quadraticCurveTo(540, 980, 920, 1080); ctx.lineTo(970, 1900); ctx.closePath(); ctx.fill(); ctx.restore();
  for (let i = 0; i < 6; i++) flRect(170 + i * 130, 1100, 12, 800, 6, '#4f5a73');
  ctx.restore();
}
// ---------------------------------------------------------------- S68 your father breathes calmly
function S68(u, d) {
  ctx.save(); flCam(1 + EZ.io(u / d) * 0.06, 540, 760, 540, 760);
  hutInside({ fire: 0.8, antlers: false });
  bed(540, 1130, 1.5);
  ctx.save(); ctx.translate(540, 760); ctx.rotate(-0.12); flvFather(0, 0, 380, { closed: true }); ctx.restore();
  ctx.save(); ctx.fillStyle = '#6a7690'; ctx.fillRect(60, 1060, 960, 900); ctx.restore();
  ctx.restore();
  flECG(300, 250, 480, 110, 62, FL.green);
}
// ---------------------------------------------------------------- S69 the radio
function S69(u, d) {
  ctx.save(); flCam(1 + EZ.io(u / d) * 0.08, 540, 760, 540, 760);
  hutInside({ fire: 0.8, antlers: false });
  flRect(-60, 960, 1200, 80, 10, '#5a3418');
  flRadio(540, 900, 1.35, { on: clamp(u / 0.2), dial: 0.55 });
  ctx.restore();
}
// ---------------------------------------------------------------- S70 the speaker
function S70(u, d) {
  ctx.save(); flCam(1, 540, 760, 540, 760);
  flBg([[0, '#3a2412'], [1, '#1a0f08']]);
  flRadio(820, 900, 3.3, { on: 1, waves: true, dial: 0.55 });
  ctx.restore();
}
// ---------------------------------------------------------------- S71 BREAKING: DEAD
function S71(u, d) {
  flBg([[0, '#0b0e18'], [1, '#05060a']]);
  flNewsCard(540, 760, flIn(SHOT.t0 + 0.05), clamp((u - 0.25) / 0.2));
  flWomenCounter(540, 260, u < 0.9 ? 1 : 0, { k: 1, glitch: u > 0.75 && u < 1.0, alt: 0 });
}
// ---------------------------------------------------------------- S72 Klaus switches the radio off
function S72(u, d) {
  if (u < 0.8) {
    ctx.save(); flCam(1, 540, 760, 540, 760); flBg([[0, '#3a2412'], [1, '#1a0f08']]);
    const a = springMove(SHOT.t0 + 0.1, 1, -0.6, SPRING.snappy); flRadio(540, 900, 2.2, { on: u < 0.25 ? 1 : 0, knob: a });
    flEll(540 + 60 * 2.2 - 540 + 540, 900 + 35 * 2.2 + 40, 90, 80, '#d1a495'); flLine([[680, 1040], [900, 1500]], '#3c3d48', 160);
    ctx.restore();
  } else {
    ctx.save(); flCam(1 + EZ.io((u - 0.8) / (d - 0.8)) * 0.06, 540, 700, 540, 720); hutInside({ fire: 1 });
    flvKlaus(540, 640, 400, { look: [-0.5, 0], blink: 0 }); ctx.restore();
  }
}
// ---------------------------------------------------------------- S73 nobody is looking for you any more
function S73(u, d) {
  flBg([[0, '#0b1220'], [1, '#05080f']]);
  ctx.save(); ctx.globalAlpha = 0.35; ctx.strokeStyle = '#2f6fb0'; ctx.lineWidth = 2; for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 300); ctx.lineTo(x, 1150); ctx.stroke(); } for (let y = 300; y <= 1150; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } ctx.restore();
  flSmooth([[120, 900], [300, 520], [520, 600], [760, 420], [960, 640], [900, 1080], [480, 1100]], '#16324f');
  const R = RNG('map'); for (let i = 0; i < 9; i++) { const x = R.r(200, 880), y = R.r(450, 1050), off = SHOT.t0 + 0.2 + i * 0.17; const a = TT < off ? 1 : clamp(1 - (TT - off) / 0.15); if (a <= 0) continue; flGlow(x, y, 70, `rgba(255,40,60,${0.6 * a})`); flEll(x, y, 12, 12, FL.red, a); }
  flText('SUCHE BEENDET', 540, 400, 52, FL.green, { font: FL_MONO, weight: 800 });
}
// ---------------------------------------------------------------- S74 you fall asleep
function S74(u, d) {
  ctx.save(); flCam(1 + EZ.io(u / d) * 0.06, 540, 800, 540, 780);
  hutInside({ fire: 0.6, antlers: false }); ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = '#0a0c18'; ctx.fillRect(-100, -100, 1300, 2200); ctx.restore();
  bed(540, 1050, 1.6);
  ctx.save(); ctx.translate(380, 880); ctx.rotate(-1.3); flvGreta(0, 0, 230, { mood: 'calm', body: false }); ctx.restore();
  ctx.save(); ctx.fillStyle = '#7d89a6'; ctx.beginPath(); ctx.roundRect(470, 880, 520, 220, 60); ctx.fill(); ctx.restore();
  for (let i = 0; i < 3; i++) { const ph = mod(u * 0.8 + i / 3, 1); flText('Z', 520 + ph * 160 + i * 20, 700 - ph * 260, 50 + i * 16, '#e8ecf3', { alpha: 1 - ph }); }
  ctx.restore();
  flECG(300, 250, 480, 110, 58, FL.green);
}
// ---------------------------------------------------------------- S75 the shutters open
function S75(u, d) {
  ctx.save(); flCam(1 + EZ.io(u / d) * 0.05, 540, 760, 540, 760);
  flPlanks(-60, -60, W + 120, 2100, { c: '#5e3a20', key: 75 });
  const op = springMove(SHOT.t0 + 0.25, 0, 1, SPRING.heavy);
  flShutterWindow(540, 700, 640, 700, op, { inside: () => { flBg([[0, '#bcd6ff'], [1, '#fff3da']]); flMountains(900, { key: 75, c: '#9bb0d4', snow: '#ffffff' }); flGround(950, { c0: '#ffffff', c1: '#e6edf8' }); } });
  if (op > 0.1) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.35 * op; ctx.fillStyle = flGrad(0, 350, 0, 1700, [[0, '#fff2d0'], [1, 'rgba(255,240,200,0)']]); ctx.beginPath(); ctx.moveTo(220, 350); ctx.lineTo(860, 350); ctx.lineTo(1160, 1800); ctx.lineTo(-80, 1800); ctx.closePath(); ctx.fill(); ctx.restore(); const R = RNG('dust'); for (let i = 0; i < 30; i++) flEll(R.r(150, 950), mod(R.r(350, 1600) + u * 30, 1300) + 350, 3, 3, '#fff6dc', 0.6 * op); }
  ctx.restore();
}
// ---------------------------------------------------------------- S76 fresh snow
function S76(u, d) {
  flBg([[0, '#a9c4ef'], [0.4, '#dfe9fb'], [1, '#ffffff']]); flMountains(820, { key: 76, c: '#9bb0d4', snow: '#ffffff' }); flForest(860, { key: 76, c: '#2e3d55', s: 0.7 }); flGround(860, { c0: '#ffffff', c1: '#e3eaf6' });
  const R = RNG('spark'); for (let i = 0; i < 26; i++) { const tw = Math.max(0, Math.sin(TT * 4 + i * 1.7)); if (tw > 0.6) star4(R.r(60, 1020), R.r(900, 1500), 10 * tw, '#ffffff'); }
}
// ---------------------------------------------------------------- S77 the camera tilts down
function S77(u, d) {
  const p = EZ.io(u / d) * 900; ctx.save(); ctx.translate(0, -p);
  flBg([[0, '#a9c4ef'], [0.4, '#dfe9fb'], [1, '#ffffff']]); flMountains(820, { key: 76, c: '#9bb0d4', snow: '#ffffff' }); flGround(860, { c0: '#ffffff', c1: '#e3eaf6' });
  ctx.restore(); ctx.save(); ctx.fillStyle = flGrad(0, 1900 - p, 0, 2800 - p, [[0, '#f4f7fd'], [1, '#e3eaf6']]); ctx.fillRect(0, Math.max(0, 1900 - p - 900), W, H); ctx.restore();
}
// ---------------------------------------------------------------- footprints shared by S78..S82
function snowTop(o = {}) { flBg([[0, '#f6f9fe'], [1, '#e3eaf6']]); const R = RNG('ts'); for (let i = 0; i < 40; i++) flEll(R.r(0, W), R.r(0, H), R.r(20, 60), R.r(8, 20), '#dfe7f3', 0.7); }
function printsLine(n, t0, o = {}) { for (let i = 0; i < n; i++) { const t = t0 + i * (o.step ?? 0.07); if (TT < t) continue; const k = EZ.back(clamp((TT - t) / 0.12)); flFootprint(540 + (i % 2 ? 40 : -40), 1500 - i * 150, 1.9 * k, 0, '#9fb0c8'); } }
function S78(u, d) { ctx.save(); flCam(1 + EZ.io(u / d) * 0.08, 540, 900, 540, 800); snowTop(); printsLine(9, SHOT.t0 + 0.05); ctx.restore(); }
function S79(u, d) {
  ctx.save(); flCam(2.4, 540, 900, 540, 760); snowTop(); flFootprint(540, 900, 1.9, 0, '#9fb0c8'); ctx.restore();
  const k = flIn(SHOT.t0 + 0.05); ctx.save(); ctx.globalAlpha = clamp(k); ctx.strokeStyle = FL.yellow; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(400, 640); ctx.lineTo(380, 640); ctx.lineTo(380, 900); ctx.lineTo(400, 900); ctx.stroke(); ctx.restore(); flText('22 CM', 260, 790, 46, FL.yellow, { font: FL_MONO, weight: 800 });
}
function S80(u, d) {
  ctx.save(); flCam(2.4, 540, 900, 540, 760); snowTop(); flFootprint(540, 900, 1.9, 0, '#9fb0c8'); ctx.restore();
  const k = flIn(SHOT.t0 + 0.05); ctx.save(); ctx.globalAlpha = clamp(k); ctx.strokeStyle = FL.yellow; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(480, 560); ctx.lineTo(480, 540); ctx.lineTo(600, 540); ctx.lineTo(600, 560); ctx.stroke(); ctx.restore(); flText('8 CM', 540, 500, 46, FL.yellow, { font: FL_MONO, weight: 800 });
}
function S81(u, d) {
  ctx.save(); flCam(lerp(1.6, 1.25, EZ.io(u / d)), 540, 900, 540, 760); snowTop();
  flFootprint(450, 900, 1.9, 0, '#9fb0c8'); const k = flIn(SHOT.t0 + 0.25); if (k > 0) { ctx.save(); ctx.translate(680, 900); ctx.scale(k, k); flBootprint(0, 0, 2.2, 0); ctx.restore(); }
  ctx.restore();
  flText('MANN', 760, 470, 40, FL.grey, { font: FL_MONO, weight: 800 }); flText('?', 340, 470, 60, FL.red, { font: FL_MONO, weight: 800 });
}
function S82(u, d) {
  const p = EZ.io(u / d); ctx.save(); flCam(1, 540, lerp(1500, 300, p), 540, 760); snowTop();
  for (let i = 0; i < 12; i++) flFootprint(540 + (i % 2 ? 40 : -40), 1500 - i * 140, 1.9, 0, '#9fb0c8');
  flRect(330, -200, 420, 280, 10, '#6e4426'); flRect(300, -240, 480, 50, 10, '#3a2414'); flRect(-200, -900, 1500, 720, 0, '#5e3a20');
  ctx.restore();
}
// ---------------------------------------------------------------- S83 the last woman in the world?
function S83(u, d) {
  ctx.save(); flCam(1 + EZ.io(u / d) * 0.1, 540, 720, 540, 760);
  hutInside({ fire: 0.4, antlers: false }); ctx.save(); ctx.globalAlpha = 0.2; ctx.fillStyle = '#e8f0ff'; ctx.fillRect(-100, -100, 1300, 2200); ctx.restore();
  flvGreta(540, 720, 480, { mood: 'shout', blink: 0, tremble: true });
  ctx.restore();
  flWomenCounter(540, 260, 1, { k: 1, glitch: true, alt: 2 });
}
// ---------------------------------------------------------------- S84 that's you: a second dot
function S84(u, d) {
  flBg([[0, '#04050c'], [1, '#0b1030']]); flStars(140, H, 84);
  flGlobe(540, 800, lerp(460, 380, EZ.io(u / d)), { dots: [[0.12, -0.18, FL.yellow, 1], [0.24, -0.08, FL.pink, u > 0.4 ? (Math.floor(TT * 6) % 2 ? 1 : 0.4) : 0]] });
  flWomenCounter(540, 260, 1, { k: 1, glitch: u > 0.4, alt: 2 });
}
// ---------------------------------------------------------------- S85 the door, silence
function S85(u, d) {
  ctx.save(); flCam(1 + EZ.io(u / d) * 0.1, 540, 840, 540, 800);
  flBg([[0, '#1a1410'], [1, '#0a0806']]); flPlanks(-60, -60, W + 120, 2100, { c: '#3e2614', key: 85 });
  flDoor(540, 1180, 420, 820, { light: 1, feet: clamp((u - 0.8) / 0.6) });
  ctx.restore();
}
// ---------------------------------------------------------------- S86 three soft knocks
function S86(u, d) {
  const knocks = [0.05, 0.45, 0.85], hit = knocks.reduce((a, t) => a + (u > t && u < t + 0.12 ? Math.sin((u - t) / 0.12 * Math.PI) : 0), 0);
  ctx.save(); flCam(1.12 + hit * 0.02, 540, 840, 540, 800);
  flBg([[0, '#1a1410'], [1, '#0a0806']]); flPlanks(-60, -60, W + 120, 2100, { c: '#3e2614', key: 85 });
  flDoor(540, 1180, 420, 820, { light: 1, feet: 1, shake: hit * 8 });
  const R = RNG('dust86'); knocks.forEach((t, i) => { if (u < t) return; const p = clamp((u - t) / 0.8); for (let k = 0; k < 6; k++) flEll(320 + R.r(0, 440), 350 + p * 200 + R.r(0, 40), 4, 4, '#b89a7a', 1 - p); });
  ctx.restore();
  const n = knocks.filter((t) => u > t).length; for (let i = 0; i < n; i++) flEll(440 + i * 100, 330, 18, 18, FL.red);
  if (u > d - 0.35) { ctx.save(); ctx.globalAlpha = clamp((u - (d - 0.35)) / 0.35); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
}
function S87(u, d) { flBg([[0, '#000'], [1, '#000']]); if (u > 0.15) flWomenCounter(540, 860, 2, { k: clamp((u - 0.15) / 0.2) * 0.5, glitch: true, alt: 1 }); }
