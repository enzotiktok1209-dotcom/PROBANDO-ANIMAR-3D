// =====================================================================
//  styles/flucht/chars.js — the cast, traced from the "Flucht" references.
//  Faces are drawn in a 100-unit box around the face centre (flUnit); bodies by flHuman (feet at y = 0).
//  Greta: blond chin bob, round face, big eyes, pink blush, long light-brown coat, navy trousers, 3 blood stains.
//  Klaus: dark-grey hoodie, hood up with two round lumps, tan skin, brown beard, thick V brows, diagonal scar over left eye.
//  Vater: grey hair + stubble, forehead cut, black eye, white shirt with spreading blood.
//  Soldaten: olive helmet, black balaclava, red eyes at night / white goggles, olive uniform, rifle.
// =====================================================================
function flUnit(x, y, R, rot = 0) { ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot); ctx.scale(R / 100, R / 100); }
// eyes shared by the cast: o.look [-1..1, -1..1], o.wide, o.lid (0..1 upper lid closed), o.blink
function flEye(ex, ey, rx, ry, o = {}) {
  const lid = o.blink ? 1 : clamp(o.lid ?? 0);
  if (lid >= 0.95) { flCurve(ex - rx, ey + 2, ex, ey + ry * 0.55, ex + rx, ey + 2, o.lash || '#3a2a20', 4.5); return; }
  flEll(ex, ey, rx, ry, o.white || '#ffffff');
  const pr = o.pr ?? ry * 0.62, lx = (o.look?.[0] ?? 0) * rx * 0.35, ly = (o.look?.[1] ?? 0) * ry * 0.3;
  ctx.save(); ctx.beginPath(); ctx.ellipse(ex, ey, rx, ry, 0, 0, TAU); ctx.clip();
  flEll(ex + lx, ey + ly, pr, pr, o.pupil || '#111111');
  flEll(ex + lx + pr * 0.35, ey + ly - pr * 0.4, pr * 0.32, pr * 0.32, '#ffffff');
  if (lid > 0) flRect(ex - rx - 2, ey - ry - 2, rx * 2 + 4, (ry * 2 + 4) * lid, 0, o.lidC || FL.skin);
  ctx.restore();
}
function flBlink(key = 0, every = 3.7) { return mod(TT + key * 0.77, every) < 0.11; }

// ---------------------------------------------------------------- GRETA
// mood: neutral | fear | panic | pain | determined | calm | sleep | shock | sad | smile
function flGretaHead(x, y, R, o = {}) {
  const m = o.mood || 'neutral';
  flUnit(x, y, R, o.rot || 0);
  // hair behind (the bob reaching the jaw)
  flSmooth([[-108, 55], [-118, -40], [-90, -112], [0, -132], [90, -112], [118, -40], [108, 55], [70, 62], [-70, 62]], FL.hairS);
  // neck
  flRect(-26, 60, 52, 80, 10, FL.skinS);
  // face
  flSmooth([[-82, -50], [-84, 25], [-62, 82], [-20, 108], [20, 108], [62, 82], [84, 25], [82, -50], [55, -95], [0, -105], [-55, -95]], FL.skin);
  // hair front: cap + fringe swept to her right
  flSmooth([[-114, 48], [-118, -45], [-88, -112], [0, -134], [88, -112], [118, -45], [114, 50], [92, 52], [88, -12], [66, -52], [30, -60], [-20, -50], [-62, -32], [-86, -6], [-92, 50]], FL.hair);
  flCurve(-70, -95, -20, -128, 50, -110, FL.hairS, 4, 0.8); flCurve(-95, 10, -100, -60, -60, -100, FL.hairS, 4, 0.7);
  flCurve(95, 20, 100, -50, 70, -95, FL.hairS, 4, 0.7); flCurve(30, -60, 60, -80, 95, -60, FL.hairD, 3, 0.5);
  // brows
  const bIn = { fear: -12, panic: -14, shock: -16, pain: 6, determined: 8, sad: -10 }[m] ?? 0;
  for (const s of [-1, 1]) flLine([[s * 16, -26 + bIn], [s * 34, -34 + bIn * 0.3], [s * 52, -30]], FL.hairD, 6);
  // eyes
  const wide = { fear: 1.15, panic: 1.25, shock: 1.3 }[m] ?? 1, closed = m === 'sleep' || m === 'calm' || m === 'pain' || (o.blink ?? flBlink(o.key || 0));
  const pr = { panic: 7, shock: 6.5, fear: 8 }[m] ?? 10;
  for (const s of [-1, 1]) {
    if (m === 'pain') { flLine([[s * 20, 0], [s * 34, 6], [s * 48, -2]], '#3a2a20', 5); continue; }
    if (m === 'sleep' || m === 'calm') { flCurve(s * 18, 2, s * 33, 12, s * 48, 2, '#3a2a20', 4.5); continue; }
    const tr = o.tremble ? Math.sin(TT * 40) * 1.5 : 0;
    flEye(s * 33 + tr, 2, 16 * wide, 16 * wide, { look: o.look, pr, blink: closed, lidC: FL.skin, lid: m === 'determined' ? 0.25 : 0 });
  }
  // blush, nose
  for (const s of [-1, 1]) flEll(s * 54, 40, 14, 8, FL.blush, 0.65);
  flCurve(-2, 18, 4, 26, 0, 32, FL.skinS, 4);
  // mouth
  const my = 66;
  if (m === 'fear' || m === 'shock' || m === 'panic' || o.mouth === 'o') { const r = m === 'shock' ? 14 : 10; flEll(0, my, r * 0.85, r * (o.mouthK ?? 1.2), '#6b1f2a'); flEll(0, my + r * 0.5, r * 0.5, r * 0.35, '#c0505a'); }
  else if (m === 'pain' || m === 'determined' || o.mouth === 'teeth') { flRect(-20, my - 7, 40, 14, 5, '#ffffff'); flLine([[-18, my], [18, my]], '#c9b8b0', 2); }
  else if (m === 'sad') flCurve(-12, my + 5, 0, my - 4, 12, my + 5, '#a8505a', 4);
  else if (m === 'calm' || m === 'smile') flCurve(-14, my - 2, 0, my + 9, 14, my - 2, '#a8505a', 4.5);
  else if (o.mouth === 'puff') { flEll(0, my, 7, 6, '#a8505a'); for (const s of [-1, 1]) flEll(s * 58, 48, 16, 12, FL.blush, 0.4); }
  else flLine([[-10, my], [10, my]], '#a8505a', 4);
  // tear
  if (o.tear != null) { const k = mod(o.tear, 1); flEll(-40, 18 + k * 60, 5, 7, '#9fd3ff', 1 - k * 0.6); }
  if (o.sweat) flEll(72, -40 + mod(TT * 0.8, 1) * 30, 4, 6, '#cfe8ff', 0.85);
  ctx.restore();
}
// Greta's coat shoulders under a close-up head (u = face R)
function flGretaBust(x, y, R, o = {}) {
  flUnit(x, y, R);
  const br = Math.sin(TT * (o.breath ?? 2.2)) * (o.breathAmp ?? 3);
  flFill([[-262, 560], [-262, 262 - br], [-246, 200 - br], [-200, 172 - br], [-60, 146], [60, 146], [200, 172 - br], [246, 200 - br], [262, 262 - br], [262, 560]], FL.coat); flFill([[150, 560], [150, 230], [200, 172 - br], [246, 200 - br], [262, 262 - br], [262, 560]], FL.coatS, 0.55);
  flSmooth([[-60, 138], [0, 230], [60, 138], [40, 132], [0, 175], [-40, 132]], FL.coatD);
  flRect(-6, 230, 12, 300, 6, FL.coatS);
  for (let i = 0; i < 3; i++) flEll(14, 270 + i * 80, 9, 9, FL.button);
  if (o.blood) flBlood(-150, 300, 1, o.blood, 'gb1');
  ctx.restore();
  flGretaHead(x, y, R, o);
}
// a blood stain: clustered round blobs, grows with k (0..1)
function flBlood(x, y, s, k = 1, key = 'b') {
  const R = RNG('blood', key); const n = 5;
  for (let i = 0; i < n; i++) { const a = R.r(0, TAU), d = R.r(0, 22) * s, r = R.r(10, 20) * s * clamp(k * 1.2 - i * 0.08, 0, 1.3); if (r <= 0) continue; flEll(x + Math.cos(a) * d, y + Math.sin(a) * d, r, r, i === 0 ? FL.bloodD : FL.blood); }
  flEll(x - 4 * s, y - 6 * s, 6 * s * k, 6 * s * k, FL.bloodL, 0.6);
}

// ---------------------------------------------------------------- generic body (feet at y = 0, total height ≈ 600 units)
// o: top, topS, topLen (y where the top garment ends, e.g. -190 coat / -230 hoodie), pants, shoe, hand, sleeve,
// armL/armR = [shoulderDeg, elbowDeg] (0 = hanging; + = forward/outward to that side), legL/legR = [hipDeg, kneeDeg],
// head(x, y, R) draws the head at the neck, crouch 0..1, lean deg, front (arms drawn after head)
function flHuman(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (o.lean) ctx.rotate(o.lean * DEG); if (o.flip) ctx.scale(-1, 1);
  const cr = o.crouch ?? 0, hipY = -230 + cr * 90, shY = -450 + cr * 110;
  const leg = (sx, a) => { const [h, k] = a || [0, 0], p0 = [sx * 22, hipY], p1 = [p0[0] + Math.sin(h * DEG) * 120, p0[1] + Math.cos(h * DEG) * 120 * (1 - cr * 0.3)], p2 = [p1[0] + Math.sin((h - k) * DEG) * 115, p1[1] + Math.cos((h - k) * DEG) * 115]; flLimb(p0, p1, 40, o.pants); flLimb(p1, p2, 36, o.pants); flEll(p2[0] + 12, p2[1] + 4, 26, 13, o.shoe); };
  const arm = (sx, a) => { const [h, k] = a || [8, 4], p0 = [sx * 64, shY + 22], p1 = [p0[0] + sx * Math.sin(h * DEG) * 112, p0[1] + Math.cos(h * DEG) * 112], p2 = [p1[0] + sx * Math.sin((h + k) * DEG) * 104, p1[1] + Math.cos((h + k) * DEG) * 104]; flLimb(p0, p1, 36, o.sleeve || o.top); flLimb(p1, p2, 32, o.sleeve || o.top); flEll(p2[0], p2[1], 17, 17, o.hand || FL.skin); return p2; };
  leg(-1, o.legL); leg(1, o.legR);
  if (!o.front) arm(-1, o.armL);
  // torso / garment
  const tl = Math.min(o.topLen ?? -200, hipY + 20);
  flSmooth([[-66, shY + 6], [-40, shY - 12], [40, shY - 12], [66, shY + 6], [74, tl], [-74, tl]], o.top);
  flRect(-6, shY + 10, 12, tl - shY - 16, 5, o.topS);
  if (o.buttons) for (let i = 0; i < 4; i++) flEll(16, shY + 40 + i * ((tl - shY - 60) / 3), 7, 7, FL.button);
  if (o.collar) flSmooth([[-42, shY - 10], [0, shY + 50], [42, shY - 10]], o.collar);
  if (o.strings) for (const sx of [-1, 1]) flLine([[sx * 16, shY + 18], [sx * 16, shY + 90]], '#e8e8ea', 5);
  if (o.belt) flRect(-74, hipY - 10, 148, 20, 3, o.belt);
  if (o.blood) { flBlood(-30, shY + 90, 0.9, o.blood, 'hb1'); flBlood(34, shY + 170, 0.8, o.blood, 'hb2'); flBlood(-20, shY + 230, 0.7, o.blood, 'hb3'); }
  if (!o.front) arm(1, o.armR);
  if (o.head) o.head(0, shY - 62);
  let hands = null;
  if (o.front) hands = [arm(-1, o.armL), arm(1, o.armR)];
  if (o.extra) o.extra();
  ctx.restore();
  return hands;
}
function flGretaBody(x, y, s, o = {}) {
  return flHuman(x, y, s, { top: FL.coat, topS: FL.coatS, topLen: -175, pants: FL.pants, shoe: FL.shoe, buttons: true, collar: FL.coatD, blood: o.blood ?? 1, ...o,
    head: (hx, hy) => flGretaHead(hx, hy - 6, 62, { mood: o.mood, look: o.look, tear: o.tear, key: 3, mouth: o.mouth }) });
}
// walk / run cycles (degrees)
function flGait(t, speed = 1, amp = 28) { const p = Math.sin(t * TAU * speed); return { legL: [p * amp, Math.max(0, -p) * amp * 1.2], legR: [-p * amp, Math.max(0, p) * amp * 1.2], armL: [-p * amp * 0.9, 20], armR: [p * amp * 0.9, 20], bob: Math.abs(p) * 8 }; }

// ---------------------------------------------------------------- KLAUS
function flKlausHead(x, y, R, o = {}) {
  const m = o.mood || 'angry';
  flUnit(x, y, R, o.rot || 0);
  // hood lumps + hood
  for (const s of [-1, 1]) flEll(s * 108, -128, 46, 44, FL.hoodS);
  flSmooth([[-150, -40], [-138, -125], [-80, -168], [0, -175], [80, -168], [138, -125], [150, -40], [160, 120], [175, 270], [-175, 270], [-160, 120]], FL.hood);
  flEll(0, 8, 108, 128, FL.hoodD);
  // face
  flSmooth([[-82, -78], [82, -78], [88, 20], [72, 92], [0, 112], [-72, 92], [-88, 20]], FL.kSkin);
  // beard (mouth opening left in it)
  flSmooth([[-88, 5], [-80, 78], [-42, 122], [0, 134], [42, 122], [80, 78], [88, 5], [70, 22], [52, 52], [24, 60], [0, 58], [-24, 60], [-52, 52], [-70, 22]], FL.beard);
  flEll(0, 66, 30, 9, FL.beardS);
  // brows: thick V
  const bt = { angry: 14, shout: 18, calm: 2, soft: -4, worried: -8 }[m] ?? 10;
  for (const s of [-1, 1]) flFill([[s * 12, -36 + bt * 0.4], [s * 66, -50 - bt * 0.6], [s * 70, -38 - bt * 0.6], [s * 14, -22 + bt * 0.4]], FL.brow);
  // eyes
  for (const s of [-1, 1]) flEye(s * 36, -8, 22, 20, { look: o.look, pr: 12, blink: o.blink ?? flBlink(o.key || 5, 4.3), white: '#eceff2', lidC: FL.kSkin, lid: m === 'angry' ? 0.22 : m === 'soft' ? 0.35 : 0, lash: '#2a1c14' });
  // scar across his left eye (screen left)
  flLine([[-52, -82], [-38, -20], [-26, 48]], FL.scar, 4.5);
  for (const s of [-1, 1]) flEll(s * 58, 28, 16, 10, FL.blush, 0.55);
  // mouth
  if (m === 'shout') { flRect(-24, 62, 48, 30, 12, '#4a1a1e'); flRect(-20, 62, 40, 8, 3, '#ffffff'); }
  else if (m === 'soft') flCurve(-14, 66, 0, 72, 14, 64, '#c46a6a', 4.5);
  else { flRect(-18, 62, 36, 12, 4, '#5a2224'); flRect(-14, 62, 28, 4, 2, '#f2f2f2'); }
  if (o.cut) flLine([[52, -64], [64, -52]], FL.blood, 4);
  ctx.restore();
}
function flKlausBust(x, y, R, o = {}) {
  flUnit(x, y, R);
  flFill([[-280, 560], [-280, 270], [-262, 214], [-210, 186], [210, 186], [262, 214], [280, 270], [280, 560]], FL.hood);
  flSmooth([[-200, 182], [200, 182], [240, 230], [-240, 230]], FL.hoodS, 0.6);
  for (const s of [-1, 1]) flLine([[s * 32, 200], [s * 34, 330]], '#e6e6ea', 7);
  ctx.restore();
  flKlausHead(x, y, R, o);
}
function flKlausBody(x, y, s, o = {}) {
  return flHuman(x, y, s, { top: FL.hood, topS: FL.hoodS, topLen: -225, pants: '#2a2b31', shoe: '#18181b', hand: FL.kSkin, strings: true, ...o,
    head: (hx, hy) => flKlausHead(hx, hy - 10, 64, { mood: o.mood, look: o.look, key: 7 }) });
}

// ---------------------------------------------------------------- VATER
function flFatherHead(x, y, R, o = {}) {
  flUnit(x, y, R, o.rot || 0);
  flRect(-30, 60, 60, 100, 12, FL.fSkinS);
  flSmooth([[-88, -50], [-90, 30], [-66, 92], [-20, 116], [20, 116], [66, 92], [90, 30], [88, -50], [58, -100], [0, -110], [-58, -100]], FL.fSkin);
  // stubble
  flSmooth([[-90, 20], [-70, 92], [-22, 118], [22, 118], [70, 92], [90, 20], [66, 40], [40, 66], [0, 72], [-40, 66], [-66, 40]], FL.stub, 0.85);
  // receding grey hair
  flSmooth([[-96, 10], [-100, -60], [-70, -112], [-20, -122], [-10, -96], [-50, -84], [-80, -40], [-84, 12]], FL.fHair);
  flSmooth([[96, 10], [100, -60], [70, -112], [20, -122], [10, -96], [50, -84], [80, -40], [84, 12]], FL.fHair);
  flSmooth([[-40, -118], [40, -118], [30, -100], [-30, -100]], FL.fHairS);
  // wrinkles
  for (let i = 0; i < 3; i++) flCurve(-38, -70 + i * 10, 0, -76 + i * 10, 38, -70 + i * 10, FL.fSkinS, 2.5, 0.8);
  // bruise on his left eye (screen right)
  flEll(36, 8, 30, 24, FL.bruise, 0.9); flEll(38, 12, 20, 15, FL.bruiseD, 0.7);
  // eyes half-lidded
  const lid = o.lid ?? 0.5;
  for (const s of [-1, 1]) flEye(s * 34, 2, 17, 13, { look: o.look, pr: 8, lid, lidC: s > 0 ? '#5b4068' : FL.fSkin, blink: o.closed });
  for (const s of [-1, 1]) flLine([[s * 18, -22], [s * 50, -26]], '#6d6a66', 7);
  // cut + drip
  flLine([[-6, -96], [6, -60], [-2, -30]], FL.blood, 5);
  flEll(-2, -30 + mod(TT * 0.4, 1) * 18, 4, 5, FL.blood);
  // mouth
  if (o.mouth === 'groan') flEll(0, 70, 12, 8, '#5a2224'); else flCurve(-14, 72, 0, 66, 14, 72, '#8a4a4a', 4);
  ctx.restore();
}
function flFatherBust(x, y, R, o = {}) {
  flUnit(x, y, R);
  const br = Math.sin(TT * (o.breath ?? 1.4)) * (o.breathAmp ?? 2.5);
  flFill([[-262, 560], [-262, 262 - br], [-246, 200 - br], [-200, 176 - br], [-50, 152], [50, 152], [200, 176 - br], [246, 200 - br], [262, 262 - br], [262, 560]], FL.shirt);
  flSmooth([[-50, 150], [0, 230], [50, 150], [30, 146], [0, 190], [-30, 146]], FL.shirtS);
  flRect(-160, 240, 40, 300, 20, FL.shirtS, 0.5);
  const k = o.blood ?? 1;
  flBlood(-120, 300, 1.3, k, 'f1'); flBlood(-20, 330, 1.6, k * 1.05, 'f2'); flBlood(110, 380, 1.1, k * 0.9, 'f3');
  ctx.restore();
  flFatherHead(x, y, R, o);
}
function flFatherBody(x, y, s, o = {}) {
  return flHuman(x, y, s, { top: FL.shirt, topS: FL.shirtS, topLen: -230, pants: '#3b3a40', shoe: '#1d1c1f', hand: FL.fSkin, blood: o.blood ?? 1, ...o,
    head: (hx, hy) => flFatherHead(hx, hy - 6, 60, { lid: o.lid ?? 0.6, closed: o.closed }) });
}

// ---------------------------------------------------------------- SOLDATEN
function flSoldierHead(x, y, R, o = {}) {
  flUnit(x, y, R, o.rot || 0);
  flEll(0, 10, 92, 102, FL.mask);
  if (o.eyes === 'red') for (const s of [-1, 1]) { flGlow(s * 32, 0, 60, 'rgba(255,40,50,0.55)'); flEll(s * 32, 0, 16, 10, FL.eyeRed); }
  else for (const s of [-1, 1]) {
    flEll(s * 34, 2, 30, 30, '#f2f4f6');
    if (o.refl) { ctx.save(); ctx.beginPath(); ctx.ellipse(s * 34, 2, 30, 30, 0, 0, TAU); ctx.clip(); flEll(s * 34 - 6, 18, 34 * o.refl, 22 * o.refl, '#c9d3e3'); flEll(s * 34 - 10, 14, 22 * o.refl, 14 * o.refl, '#ffffff'); ctx.restore(); }
    flEll(s * 34 + (o.look?.[0] ?? 0) * 8, 4, o.pr ?? 11, o.pr ?? 11, '#151515');
  }
  if (o.mouth) flEll(0, 66, 18, 14 * o.mouth, '#6b1520');
  // helmet
  flSmooth([[-112, -18], [-100, -90], [-50, -130], [50, -130], [100, -90], [112, -18], [130, -6], [-130, -6]], FL.olive);
  flRect(-132, -22, 264, 22, 10, FL.oliveS);
  flCurve(-70, -100, 0, -126, 70, -100, '#6f7e47', 6, 0.7);
  ctx.restore();
}
function flRifle(x, y, ang, s = 1, c = FL.oliveD) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s); flRect(-40, -9, 210, 18, 4, c); flRect(-80, -12, 50, 24, 6, c); flRect(20, 6, 18, 36, 4, c); flRect(150, -14, 30, 10, 3, '#222'); ctx.restore(); }
function flSoldier(x, y, s, o = {}) {
  const aim = o.aim ?? 0;
  return flHuman(x, y, s, { top: FL.olive, topS: FL.oliveS, topLen: -232, pants: FL.oliveS, shoe: '#111', hand: '#1a1a1a', belt: FL.oliveD,
    armL: aim ? [-62, -28] : [10, 10], armR: aim ? [28, 62] : [12, 30], ...o,
    head: (hx, hy) => flSoldierHead(hx, hy - 10, 58, { eyes: o.eyes ?? 'red', look: o.look }),
    extra: () => { if (o.rifle !== false) flRifle(aim ? 20 : -10, (aim ? -392 : -360) + (o.crouch ?? 0) * 100, aim ? (o.rifleAng ?? -0.03) : 1.15, 1.05); if (o.laser) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; flLine([[200, -394], [200 + 2400, -394 + (o.laserDy ?? 260)]], 'rgba(255,40,60,0.55)', 4); ctx.restore(); } } });
}
// the young soldier (no balaclava after the avalanche): helmet, thin young face, plaster on the cheek
function flYoungHead(x, y, R, o = {}) {
  flUnit(x, y, R, o.rot || 0);
  flRect(-26, 60, 52, 80, 10, '#e2b894');
  flSmooth([[-78, -40], [-80, 30], [-58, 86], [0, 106], [58, 86], [80, 30], [78, -40], [50, -90], [-50, -90]], '#efc8a6');
  flSmooth([[-82, -20], [-70, -70], [-30, -80], [30, -80], [70, -70], [82, -20], [70, -40], [-70, -40]], '#6b4a30');
  for (const s of [-1, 1]) flEye(s * 32, 4, 15, 15, { look: o.look, pr: o.pr ?? 8, blink: o.blink ?? flBlink(9, 3.1), lidC: '#efc8a6' });
  const bi = o.mood === 'fear' ? -10 : 0;
  for (const s of [-1, 1]) flLine([[s * 16, -24 + bi], [s * 48, -28]], '#4a3220', 6);
  for (const s of [-1, 1]) flEll(s * 50, 38, 12, 7, FL.blush, 0.5);
  // plaster
  ctx.save(); ctx.translate(-52, 50); ctx.rotate(-0.4); flRect(-22, -9, 44, 18, 5, '#e9cf9c'); flLine([[-6, -7], [-6, 7]], '#cfb17c', 2); flLine([[6, -7], [6, 7]], '#cfb17c', 2); ctx.restore();
  if (o.mouth === 'shout') flRect(-16, 60, 32, 22, 9, '#5a1e22'); else if (o.mouth === 'o') flEll(0, 66, 8, 10, '#5a1e22'); else flLine([[-10, 66], [10, 66]], '#8a4a4a', 4);
  flSmooth([[-108, -22], [-98, -88], [-48, -124], [48, -124], [98, -88], [108, -22], [126, -10], [-126, -10]], FL.olive);
  flRect(-128, -26, 256, 20, 9, FL.oliveS);
  ctx.restore();
}

// ---------------------------------------------------------------- HUND (German shepherd, side view facing +x)
function flDog(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s);
  const t = TT, wag = Math.sin(t * (o.wag ?? 10)) * 0.4, walk = o.walk ? Math.sin(t * 9) * 18 : 0;
  flLine([[-120, -150], [-180, -190 + wag * 60]], '#5a3a1c', 22);
  for (const [lx, ph] of [[-90, 0], [-60, 1], [70, 1], [100, 0]]) flLimb([lx, -110], [lx + (ph ? walk : -walk) * 0.6, 0], 24, ph ? '#5a3a1c' : '#7a5230');
  flSmooth([[-140, -170], [-120, -205], [60, -210], [120, -180], [125, -110], [-130, -105]], '#a8743c');
  flSmooth([[-110, -205], [60, -212], [90, -175], [-100, -165]], '#2b1d12');
  ctx.save(); ctx.translate(120, -195); ctx.rotate(o.headRot ?? 0);
  flSmooth([[-30, 20], [-20, -40], [30, -50], [70, -30], [110, -10], [112, 18], [60, 34], [0, 40]], '#a8743c');
  flSmooth([[-20, -40], [30, -50], [40, -20], [-10, -10]], '#2b1d12');
  flFill([[-4, -38], [8, -100], [30, -46]], '#2b1d12'); flFill([[24, -46], [44, -104], [56, -40]], '#2b1d12');
  flEll(108, -4, 11, 9, '#111');
  flEll(44, -18, 7, 7, '#1a120a'); flEll(46, -20, 2.5, 2.5, '#fff');
  if (o.growl) { flRect(56, 12, 54, 18, 5, '#5a1e22'); for (let i = 0; i < 5; i++) flFill([[60 + i * 10, 12], [65 + i * 10, 22], [70 + i * 10, 12]], '#ffffff'); flLine([[50, -2], [90, 4]], '#3a2512', 3); }
  else flLine([[60, 22], [104, 18]], '#2b1d12', 3);
  ctx.restore();
  ctx.restore();
}
