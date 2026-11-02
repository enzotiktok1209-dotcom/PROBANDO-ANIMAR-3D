// =====================================================================
//  scenes-b.js — S25..S48: under the snow (rule 2), dying for the world (rule 3), the soldier who points.
// =====================================================================
function darkCar(a = 0.75) { flBg([[0, '#0e1220'], [1, '#05060a']]); flRect(60, 260, 960, 560, 50, '#1a2030'); ctx.save(); ctx.beginPath(); ctx.roundRect(90, 290, 900, 500, 40); ctx.clip(); flBg([[0, '#c9d3e3'], [1, '#e8eef6']]); const R = RNG('press'); for (let i = 0; i < 40; i++) flEll(R.r(90, 990), R.r(290, 790), R.r(30, 90), R.r(20, 60), '#b5c1d4', 0.6); ctx.restore(); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#05070d'; ctx.fillRect(-500, -500, 2100, 2900); ctx.restore(); }
function snowField(y = 1000) { flSky({ key: 8, mx: 780, my: 300 }); flMountains(y - 40, { key: 8 }); flForest(y - 10, { key: 8, s: 0.7 }); flGround(y); }

// ---------------------------------------------------------------- S25 dark, silence
function S25(u, d) {
  flBg([[0, '#04050a'], [1, '#000']]);
  flGlow(540, 1080, 260, 'rgba(60,220,140,0.18)');
  ctx.save(); ctx.globalAlpha = 0.28; flvGreta(540, 700, 460, { mood: 'calm', blink: 1, body: true }); ctx.restore();
  for (let k = 0; k < 2; k++) { const ph = mod(u * 0.8 + k * 0.5, 1); flEll(560 + ph * 40, 900 - ph * 120, 40 + ph * 80, 26 + ph * 40, '#c8d6e8', 0.35 * (1 - ph)); }
}
// ---------------------------------------------------------------- S26 REGEL 2
function S26(u, d) { flRegelCard(2, SHOT.t0); }
// ---------------------------------------------------------------- S27 find up: disoriented in the buried car
function S27(u, d) {
  ctx.save(); const z = 1 + EZ.io(u / d) * 0.08; flCam(z, 540, 700, 540, 760);
  darkCar(0.55);
  const lk = [Math.sin(u * 5) * 0.9, Math.cos(u * 3) * 0.4];
  flvGreta(540, 690, 460, { mood: 'fear', look: lk, blood: 1, key: 7 });
  ctx.restore();
  ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.restore();
}
// ---------------------------------------------------------------- S28 the world turns
function S28(u, d) {
  const rot = EZ.io(u / d) * TAU * 0.9;
  ctx.save(); flCam(1.05, 540, 760, 540, 760, rot);
  darkCar(0.5);
  flvGreta(540, 690, 460, { mood: 'cry', look: [Math.sin(u * 4), 0], blood: 1, key: 8 });
  const R = RNG('float'); for (let i = 0; i < 18; i++) { const a = R.r(0, TAU) + u * R.r(-1, 1), r = R.r(200, 600); flEll(540 + Math.cos(a) * r, 760 + Math.sin(a) * r, R.r(4, 10), R.r(4, 10), '#dfe7f2', 0.6); }
  ctx.restore();
  ctx.save(); ctx.globalAlpha = 0.3; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.restore();
}
// ---------------------------------------------------------------- S29 she spits (extreme close-up on the mouth)
function S29(u, d) {
  flBg([[0, '#2a2018'], [1, '#120c08']]);
  ctx.save(); const z = 1 + EZ.io(u / d) * 0.06; flCam(z, 540, 760, 540, 760);
  const M = flvMap('g_58.5', 540, 300, 1500);
  flvGreta(540, 300, 1500, { mood: 'cry', blink: 0, body: false });
  const mb = M.lbox('mouth'), mx = (mb[0] + mb[2]) / 2, my = (mb[1] + mb[3]) / 2;
  if (u > 0.3) { const p = clamp((u - 0.3) / 0.5); flEll(mx + p * 30, my + 40 + p * 90, 26 * (1 - p * 0.3), 34 * (1 - p * 0.3), '#d8ecff', 0.9); flEll(mx + p * 30 - 8, my + 30 + p * 90, 8, 8, '#ffffff', 0.9); }
  ctx.restore();
  ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.restore();
}
// ---------------------------------------------------------------- S30 the drop runs to the left
function S30(u, d) {
  flBg([[0, '#2a2018'], [1, '#120c08']]);
  ctx.save(); flCam(1, 540, 760, 540, 760);
  flvGreta(700, 380, 1700, { mood: 'cry', blink: 0, body: false });
  const p = EZ.i2(clamp(u / (d * 0.9))), x = lerp(720, 220, p), y = lerp(900, 980, p);
  flEll(x, y, 28, 22, '#d8ecff', 0.95); flEll(x - 6, y - 8, 7, 7, '#fff');
  ctx.save(); ctx.globalAlpha = 0.6; ctx.strokeStyle = '#d8ecff'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(720, 900); ctx.lineTo(x + 20, y - 4); ctx.stroke(); ctx.restore();
  ctx.restore();
  const k = flIn(SHOT.t0 + 0.2); if (k > 0) { ctx.save(); ctx.translate(540, 470); ctx.scale(k, k); flLine([[200, 0], [-200, 0]], FL.yellow, 16); flFill([[-240, 0], [-180, -40], [-180, 40]], FL.yellow); ctx.restore(); flText('UNTEN', 540, 420, 44, FL.yellow, { font: FL_MONO, weight: 800 }); }
}
// ---------------------------------------------------------------- S31 up is right: the car lies on its side
function S31(u, d) {
  const rot = springMove(SHOT.t0 + 0.05, 0, -Math.PI / 2, SPRING.heavy);
  flBg([[0, '#dfe6f1'], [1, '#aab6ca']]);
  ctx.save(); ctx.translate(540, 760); ctx.rotate(rot * 0.25); ctx.translate(-540, -760);
  const R = RNG('snowmass'); for (let i = 0; i < 30; i++) flEll(R.r(-100, 1200), R.r(0, 1900), R.r(60, 160), R.r(40, 120), '#c9d3e3', 0.6);
  ctx.save(); ctx.translate(540, 760); ctx.rotate(rot); flCarSide(0, 150, 1.6, { lights: false, spin: 0 }); ctx.restore();
  ctx.restore();
  const k = flIn(SHOT.t0 + 0.55); if (k > 0) { ctx.save(); ctx.translate(540, 380); ctx.scale(k, k); flRect(-200, -60, 400, 120, 20, 'rgba(10,12,22,0.85)'); flText('OBEN →', 0, 30, 76, FL.yellow, { font: FL_MONO, weight: 800 }); ctx.restore(); }
}
// ---------------------------------------------------------------- S32 kicking the window
function S32(u, d) {
  const k1 = 0.12, k2 = 0.62, hit = (t) => u > t && u < t + 0.12 ? Math.sin((u - t) / 0.12 * Math.PI) : 0;
  ctx.save(); const [sx, sy] = flShake(TT, (hit(k1) + hit(k2)) * 26, 60, 32); ctx.translate(sx, sy);
  flBg([[0, '#121620'], [1, '#07080c']]);
  flRect(90, 280, 900, 760, 60, '#1c2230'); ctx.save(); ctx.beginPath(); ctx.roundRect(140, 330, 800, 660, 40); ctx.clip(); flBg([[0, '#cfd8e6'], [1, '#e8eef6']]); ctx.restore();
  const cx = 560, cy = 640;
  const cr = u > k1 ? (u > k2 ? 1 : 0.45) : 0;
  if (cr > 0) { const R = RNG('crack'); ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,0.95)'; ctx.lineWidth = 4; for (let i = 0; i < 14; i++) { const a = i / 14 * TAU + R.r(-0.1, 0.1), len = R.r(200, 420) * cr; ctx.beginPath(); ctx.moveTo(cx, cy); let px = cx, py = cy; for (let j = 1; j <= 4; j++) { px = cx + Math.cos(a + R.n(0.15)) * len * j / 4; py = cy + Math.sin(a + R.n(0.15)) * len * j / 4; ctx.lineTo(px, py); } ctx.stroke(); } for (let r = 1; r <= 3; r++) { ctx.beginPath(); ctx.arc(cx, cy, r * 90 * cr, 0, TAU); ctx.stroke(); } ctx.restore(); }
  if (u > k2 + 0.15) { const p = clamp((u - k2 - 0.15) / 0.4), R = RNG('shard'); for (let i = 0; i < 18; i++) { const a = R.r(0, TAU), dd = p * R.r(100, 500); ctx.save(); ctx.translate(cx + Math.cos(a) * dd, cy + Math.sin(a) * dd + p * p * 200); ctx.rotate(p * R.r(-6, 6)); flFill([[0, -20], [16, 10], [-14, 12]], 'rgba(220,235,255,0.9)'); ctx.restore(); } }
  // the boot: kicks in from below
  const kick = Math.max(hit(k1), hit(k2)), by = lerp(1500, 760, kick * 0.95 + 0.05 * Math.sin(u * 10));
  flRect(470, by + 40, 150, 900, 30, '#26314f'); flEll(545, by, 120, 70, '#141414'); flRect(430, by - 20, 230, 50, 20, '#141414');
  ctx.restore();
}
// ---------------------------------------------------------------- S33 digging
function S33(u, d) {
  flBg([[0, '#9fadc4'], [1, '#e3e9f3']]);
  const R = RNG('dig'); for (let i = 0; i < 26; i++) { const ph = mod(R.r(0, 1) + u * 1.8, 1); flEll(R.r(100, 980), lerp(-80, 1500, ph), R.r(20, 60), R.r(16, 40), '#f2f6fb', 0.95); }
  for (const s of [-1, 1]) { const ph = Math.sin(u * 12 + (s > 0 ? Math.PI : 0)), hx = 540 + s * 200, hy = 640 + ph * 120; flLine([[540 + s * 380, 1600], [hx, hy + 60]], '#7c4f2d', 120); flEll(hx, hy, 70, 62, '#f0c3a2'); for (let k = 0; k < 4; k++) flEll(hx - 45 + k * 30, hy - 55, 15, 30, '#f0c3a2'); flEll(hx, hy - 50, 80, 30, '#f2f6fb', 0.8); }
}
// ---------------------------------------------------------------- S34 bloody hands
function S34(u, d) {
  ctx.save(); ctx.filter = 'blur(8px)'; flBg([[0, '#2a3040'], [1, '#0d0f16']]); flvGreta(540, 560, 520, { mood: 'angry', blink: 0, body: true }); ctx.restore();
  ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.restore();
  const tr = flShake(TT, 4, 30, 34);
  for (const s of [-1, 1]) { ctx.save(); ctx.translate(540 + s * 190 + tr[0], 900 + tr[1]); ctx.rotate(s * 0.25); flLine([[0, 120], [0, 700]], '#7c4f2d', 130); flEll(0, 0, 95, 115, '#f0c3a2'); for (let k = 0; k < 4; k++) flRect(-70 + k * 40, -190, 32, 120, 16, '#f0c3a2'); flRect(s * 70 - 16, -60, 32, 100, 16, '#f0c3a2'); const R = RNG('scr', s); for (let i = 0; i < 6; i++) flLine([[R.r(-60, 60), R.r(-150, 60)], [R.r(-60, 60), R.r(-150, 60)]], '#c0182c', 6); flBlood(0, -30, 1.4, 0.8, 'hb' + s); ctx.restore(); }
}
// ---------------------------------------------------------------- S35 the tunnel up
function S35(u, d) {
  const g = flRad(540, 520, 30, 1100, [[0, '#cfe0ff'], [0.12, '#7d8fb0'], [0.3, '#3a465e'], [1, '#07090f']]); ctx.save(); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
  for (let k = 0; k < 8; k++) { const r = 120 + k * 120 + mod(u * 300, 120); ctx.save(); ctx.globalAlpha = 0.25; ctx.strokeStyle = '#c9d3e3'; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(540, 520, r, r * 0.8, 0, 0, TAU); ctx.stroke(); ctx.restore(); }
  for (const s of [-1, 1]) { const hy = 1200 - EZ.o2(u / d) * 260 + Math.sin(u * 12 + s) * 30; flLine([[540 + s * 300, 1900], [540 + s * 140, hy]], '#7c4f2d', 110); flEll(540 + s * 140, hy - 30, 60, 70, '#f0c3a2'); }
}
// ---------------------------------------------------------------- S36 the starry sky
function S36(u, d) {
  ctx.save(); const z = lerp(1.15, 1, EZ.o3(u / 0.8)); flCam(z, 540, 1000, 540, 900);
  snowField(1050);
  const p = EZ.o3(clamp(u / 0.35)); const R = RNG('burst'); for (let i = 0; i < 30; i++) { const a = -Math.PI / 2 + R.r(-1.2, 1.2), dd = p * R.r(60, 260); flEll(540 + Math.cos(a) * dd, 1060 + Math.sin(a) * dd + p * p * 60, R.r(8, 18) * (1 - p * 0.5), R.r(8, 18) * (1 - p * 0.5), '#ffffff', 1 - p * 0.7); }
  flLine([[540, 1200], [540, lerp(1150, 940, p)]], '#7c4f2d', 60); flEll(540, lerp(1120, 910, p), 42, 48, '#f0c3a2'); for (let k = 0; k < 4; k++) flRect(512 + k * 16, lerp(1080, 840, p), 14, 60, 7, '#f0c3a2');
  flEll(540, 1060, 120, 30, '#f4f7fb');
  ctx.restore();
  flSnow({ n: 50, wind: 10, speed: 0.5, key: 36 });
}
// ---------------------------------------------------------------- S37 REGEL 3
function S37(u, d) { flRegelCard(3, SHOT.t0); }
// ---------------------------------------------------------------- S38 die for the world: small in the white
function S38(u, d) {
  ctx.save(); const z = lerp(1.25, 1, EZ.io(u / d)); flCam(z, 540, 960, 540, 820);
  snowField(820);
  for (let i = 0; i < 6; i++) flFootprint(540 - 60 - i * 70, 1010 + (i % 2) * 24, 1, -1.5, '#9fb0c8', clamp(1 - u * 0.6 - i * 0.12));
  flvGretaFull(560, 1000, 330, { mood: 'sad', blood: 1 });
  ctx.restore();
  flSnow({ n: 120, wind: -90, key: 38 });
  const k = flIn(SHOT.t0 + 0.4); if (k > 0) { ctx.save(); ctx.translate(540, 420); ctx.scale(k, k); flText('†', 0, 40, 130, '#e8ecf3', { shadow: true }); ctx.restore(); }
}
// ---------------------------------------------------------------- S39 the red light under the skin; helicopters on the horizon
function S39(u, d) {
  ctx.save(); const z = lerp(1, 1.12, EZ.io(u / d)); flCam(z, 540, 760, 540, 760);
  flSky({ moon: false, key: 39 }); flMountains(560, { key: 39, s: 0.6 });
  for (let i = 0; i < 3; i++) { const x = 200 + i * 280 + u * 30, b = Math.floor(TT * 3 + i) % 2; flEll(x, 470 + i * 10, 6, 6, b ? '#ff3030' : '#fff'); flGlow(x, 470 + i * 10, 40, b ? 'rgba(255,40,40,0.7)' : 'rgba(255,255,255,0.6)'); }
  flSmooth([[-100, 2000], [-100, 760], [200, 600], [900, 640], [1200, 900], [1200, 2000]], '#8a5a34');
  flSmooth([[180, 620], [880, 660], [900, 760], [160, 740]], '#734927');
  ctx.save(); ctx.beginPath(); ctx.ellipse(560, 880, 230, 160, 0, 0, TAU); ctx.clip(); flBg([[0, '#f0c3a2'], [1, '#e2ae8e']]); ctx.restore();
  flBlood(470, 960, 2.2, 0.9, 's39');
  const pulse = 0.5 + 0.5 * Math.sin(TT * TAU * 1.6); flGlow(580, 860, 260 * (0.6 + pulse * 0.6), 'rgba(255,30,45,0.85)'); flEll(580, 860, 26, 26, '#ff2b3a', 0.6 + pulse * 0.4);
  ctx.restore();
}
// ---------------------------------------------------------------- S40 Klaus draws his knife
function S40(u, d) {
  ctx.save(); flCam(1 + EZ.io(u / d) * 0.06, 540, 700, 540, 720);
  snowField(1000); ctx.save(); ctx.globalAlpha = 0.45; ctx.fillStyle = '#0a0d18'; ctx.fillRect(-100, -100, 1300, 2200); ctx.restore();
  flvKlaus(540, 640, 400, { look: [-0.3, 0.2] });
  for (let i = 0; i < 6; i++) flEll(380 + i * 60, 330 + (i % 2) * 14, 26, 12, '#f2f6fb', 0.95);
  const p = springMove(SHOT.t0 + 0.08, 0, 1, SPRING.snappy); flKnife(lerp(860, 760, p), lerp(1200, 1000, p), 1.4, lerp(0.6, -0.5, p), clamp((u - 0.4) / 0.4));
  flEll(lerp(860, 760, p) - 40, lerp(1200, 1000, p) + 10, 52, 46, '#d1a495');
  ctx.restore();
}
// ---------------------------------------------------------------- S41 one cut
function S41(u, d) {
  ctx.save(); const [sx, sy] = flShake(TT, 14 * (1 - u / d), 50, 41); ctx.translate(sx, sy);
  flBg([[0, '#1a1418'], [1, '#08060a']]);
  const M = flvMap('g_63.5', 540, 690, 480);
  flvGreta(540, 690, 480, { mood: 'angry', blink: 1, blood: 1 });
  const mb = M.lbox('mouth'); flRect(mb[0] - 90, mb[1] - 30, (mb[2] - mb[0]) + 180, 90, 40, '#2a2a26');
  ctx.restore();
  const fl = u < 0.12 ? 1 - u / 0.12 : 0; if (fl) { ctx.save(); ctx.globalAlpha = fl * 0.8; ctx.fillStyle = '#e0102a'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
}
// ---------------------------------------------------------------- S42 the transmitter in your palm
function S42(u, d) {
  ctx.save(); flCam(1 + EZ.io(u / d) * 0.1, 540, 760, 540, 760);
  flBg([[0, '#1c2440'], [1, '#0c1020']]); flSnow({ n: 40, key: 42 });
  flLine([[540, 1900], [540, 1100]], '#7c4f2d', 260); flEll(540, 820, 300, 330, '#f0c3a2'); for (let k = 0; k < 4; k++) flRect(330 + k * 110, 400, 90, 260, 45, '#f0c3a2'); flRect(800, 700, 90, 230, 45, '#f0c3a2');
  flBlood(470, 900, 2, 0.9, 'p42'); flBlood(640, 760, 1.4, 0.7, 'p42b');
  const on = Math.floor(TT * 3) % 2 ? 1 : 0.35; flChip(560, 800, 2.6, on);
  ctx.restore();
}
// ---------------------------------------------------------------- S43 into the buried soldier's hand
function S43(u, d) {
  ctx.save(); flCam(1, 540, 820, 540, 760);
  snowField(1100); flGround(820, { c0: '#eef3fa', c1: '#c9d3e3' });
  const curl = EZ.io(clamp((u - 0.45) / 0.7));
  flGloveHand(540, 1000, 1.6, 0.15, { curl });
  if (curl < 0.6) flChip(560, 860, 1.5, Math.floor(TT * 3) % 2 ? 1 : 0.4);
  const gp = EZ.io(clamp(u / 0.45)); flLine([[1200, 400], [lerp(900, 640, gp), lerp(600, 780, gp)]], '#7c4f2d', 100); flEll(lerp(880, 620, gp), lerp(620, 800, gp), 60, 52, '#f0c3a2');
  ctx.restore();
}
// ---------------------------------------------------------------- S44 one is still alive
function S44(u, d) {
  ctx.save(); flCam(1 + EZ.io(u / d) * 0.06, 540, 760, 540, 760);
  flBg([[0, '#1c2440'], [1, '#2a3558']]);
  flYoungHead(540, 700, 260, { mood: 'fear', blink: u < 0.25, pr: 7, mouth: 'o' });
  ctx.save(); ctx.fillStyle = '#eef3fa'; ctx.beginPath(); ctx.moveTo(-50, 900); for (let x = -50; x <= 1150; x += 60) ctx.lineTo(x, 900 + 30 * Math.sin(x * 0.012)); ctx.lineTo(1150, 2000); ctx.lineTo(-50, 2000); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.restore();
  flSnow({ n: 60, key: 44 });
}
// ---------------------------------------------------------------- S45 eye to eye
function S45(u, d) {
  if (u < d / 2) { flBg([[0, '#1c2440'], [1, '#0e1220']]); flYoungHead(540, 820, 900, { mood: 'fear', blink: false, pr: 7, look: [-0.4, 0] }); }
  else { flBg([[0, '#2a2018'], [1, '#120c08']]); flvGreta(540, 980, 1500, { mood: 'fear', blink: 0, body: false, look: [0.4, 0] }); }
}
// ---------------------------------------------------------------- S46 too long
function S46(u, d) {
  flBg([[0, '#1c2440'], [1, '#0e1220']]);
  flYoungHead(540, 820, lerp(900, 1000, EZ.io(u / d)), { mood: 'fear', blink: false, pr: 6, look: [-0.4, 0] });
}
// ---------------------------------------------------------------- S47 slowly he lifts his hand
function S47(u, d) {
  ctx.save(); flCam(1, 540, 820, 540, 760);
  flBg([[0, '#1c2440'], [1, '#2a3558']]); flMountains(700, { key: 47 });
  ctx.save(); ctx.fillStyle = '#eef3fa'; ctx.fillRect(-100, 1000, 1300, 1000); ctx.restore();
  const p = EZ.io(clamp(u / d)), tr = flShake(TT, 5, 40, 47);
  flGloveHand(560 + tr[0], lerp(1180, 700, p) + tr[1], 1.4, -0.1, { curl: 0.2 });
  const R = RNG('slide'); for (let i = 0; i < 12; i++) { const ph = mod(R.r(0, 1) + u, 1); flEll(560 + R.r(-70, 70), lerp(1180, 700, p) + 40 + ph * 300, 10, 8, '#ffffff', 1 - ph); }
  flRect(-100, 1000, 1300, 1000, 0, '#eef3fa');
  ctx.restore();
}
// ---------------------------------------------------------------- S48 ... and points to the forest
function S48(u, d) {
  const pan = EZ.io(clamp((u - 0.2) / 0.5)) * 700;
  ctx.save(); ctx.translate(-pan, 0);
  flSky({ key: 48, mx: 1400, my: 300 }); flMountains(900, { key: 48 }); flGround(1000);
  for (let i = 0; i < 9; i++) flPine(900 + i * 110, 1010 + (i % 3) * 20, 380 + (i % 4) * 70, '#101824');
  ctx.save(); ctx.translate(420, 820); ctx.rotate(-0.1); flRect(-30, -30, 300, 60, 30, FL.oliveS); flRect(250, -30, 80, 60, 26, '#2a2a26'); flRect(300, -18, 110, 30, 15, '#2a2a26'); ctx.restore();
  ctx.restore();
}
