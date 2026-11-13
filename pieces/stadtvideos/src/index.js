// Stadtvideos — planos sincronizados con audio/words.json (1080×1920, 30 fps). Cambio de escena cada ~1,8 s.
// Los planos están en src/p/*.js; armar.py los une en src/index.js.
import { THREE, W, H, FPS, makeRenderer, makeComposer, applyPose, V, lerp, clamp, easeOut, easeIn, easeInOut, spring, RNG, mat, box, sphere, cyl, textPlane, outline } from './engine.js';
import { nightSky } from './sets.js';
import { rimLight } from './roblox.js';
import { FONT, txt } from './props.js';
import { makeKumpel, makeJonas, makePapa, makeSie, makeEr, makeLena, makeKassiererin, makeFahrer, makeMayor, makeFeuerwehr, makeHero, makeOma, makeMama } from './gvolk.js';
import { stadt, kueche, bad, zimmer, klasse, flur, omaStube, barrio, mammut, turmRaum, hinterUhr, schacht, phone, vidTex, drawVid, faceIcon, fig, HERO_C, JONAS_C, drawHouses } from './svsets.js';
import { loadKitFaces, kitFace, kitLips, eyesAlive, actuar, mirar, caminar, saltar, aire, bandada, camaraEnMano, shiver } from './vivo.js';

await document.fonts.load('700 40px Cap'); await loadKitFaces();
const WORDS = await (await fetch('./audio/words.json')).json();
const DUR = 121.7, U = W / 720;
const stage = document.getElementById('stage'); const renderer = makeRenderer(stage); renderer.domElement.style.display = 'none';
const out = document.createElement('canvas'); out.width = W; out.height = H; stage.appendChild(out); const octx = out.getContext('2d');
const scene = new THREE.Scene(); scene.fog = new THREE.FogExp2(0xcfe6ff, .0008);
const camera = new THREE.PerspectiveCamera(50, W / H, .3, 4000); const { composer, bloom, grade, ao } = makeComposer(renderer, scene, camera); ao.enabled = false;
const sky = nightSky(scene); sky.sky.material.depthWrite = true; sky.clouds.forEach(c => c.visible = false); sky.moon.visible = false;
const hemi = new THREE.HemisphereLight(0xdfeeff, 0x8aa070, 1.2); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff2e0, 2.4); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -.0004; sun.shadow.normalBias = .3; sun.shadow.radius = 4; scene.add(sun, sun.target);
const rim = rimLight(scene);
const FILL = new THREE.PointLight(0xfff4e8, 0, 0, 1.3); scene.add(FILL);
function sh(p0, s = 30) { const q = 2 * s / 4096 * 4, p = V(Math.round(p0.x / q) * q, Math.round(p0.y / q) * q, Math.round(p0.z / q) * q); const c = sun.shadow.camera; Object.assign(c, { left: -s, right: s, top: s, bottom: -s, near: 1, far: 900 }); c.updateProjectionMatrix(); sun.target.position.copy(p); sun.position.copy(p).add(V(-80, 150, 70)); rim.target.position.copy(p); rim.position.copy(p).add(V(60, 40, -90)); }

// ---------- escenarios ----------
const KX = 1000, BX = 1100, ZX = 1200, JX = 1300, CX = 1400, FX = 1500, OX = 1600, NX = 2000, TX = 2400, UX = 2600, SX = 2800;
const ST = stadt(scene), KU = kueche(scene, KX), BA = bad(scene, BX), ZI = zimmer(scene, ZX), JZ = zimmer(scene, JX, '#2a3a5a', '#24344e', 'jonas'), KL = klasse(scene, CX), FL = flur(scene, FX), OS = omaStube(scene, OX), NB = barrio(scene, NX), TR = turmRaum(scene, TX), HU = hinterUhr(scene, UX), SC = schacht(scene, SX);
const SETS = { ST: ST.G, KU: KU.g, BA: BA.g, ZI: ZI.g, JZ: JZ.g, KL: KL.g, FL: FL.g, OS: OS.g, NB: NB.g, TR: TR.g, HU: HU.g, SC: SC.g };
for (const k in SETS) outline(SETS[k], 1.4);
const OMAH = NB.houses[2];   // casa de la Oma (lado oeste, z = 4)
// ---------- reparto ----------
const ich = makeHero(scene), jonas = makeJonas(scene), brandt = makePapa(scene), oma = makeOma(scene), mama = makeMama(scene), sie = makeSie(scene), er = makeEr(scene), lena = makeLena(scene), kasse = makeKassiererin(scene), fahrer = makeFahrer(scene), mayor = makeMayor(scene);
const K = Array.from({ length: 8 }, (_, i) => makeKumpel(scene, i)); const FW = [makeFeuerwehr(scene, 0), makeFeuerwehr(scene, 1)];
kitFace(ich, 'hero'); kitFace(jonas, 'plain'); kitFace(brandt, 'mustache'); kitFace(oma, 'girl'); kitFace(mama, 'girl'); kitFace(sie, 'girl'); kitFace(er, 'kid'); kitFace(lena, 'girl'); kitFace(kasse, 'girl'); kitFace(fahrer, 'plain'); kitFace(mayor, 'mustache');
K.forEach((c, i) => kitFace(c, ['plain', 'hero', 'kid', 'plain', 'girl', 'girl', 'kid', 'hero'][i])); FW.forEach(c => kitFace(c, 'plain'));
const POOL = [ich, jonas, brandt, oma, mama, sie, er, lena, kasse, fahrer, mayor, ...K, ...FW]; POOL.forEach(c => outline(c.root, 2));
const EXTRA = [K[0], K[1], K[2], K[3], K[4], K[5], K[6], K[7], sie, er, lena, kasse, fahrer, mayor, FW[0], FW[1], mama];
// ---------- mamuts ----------
const MAM = [mammut(scene, '#7a5232', '#4a2e18'), mammut(scene, '#8a6040', '#5a3a20'), mammut(scene, '#5a3a22', '#3a2210'), mammut(scene, '#a07040', '#6a4a28', { scale: .45 })];
MAM.forEach(m => outline(m.root, 2.2)); const BABY = MAM[3];
// ---------- atrezo ----------
const PH = Array.from({ length: 18 }, (_, i) => phone(scene, [0x1a1a22, 0xe8e8ec, 0x2a6ad8, 0xff5a85, 0x1a1a22, 0x3ad8a0][i % 6])); PH.forEach(p => outline(p, 1.4));
const TAB = (() => { const g = new THREE.Group(); scene.add(g); box(3.2, 2.2, .14, mat(0xe8e8ec, { metalness: .5, roughness: .3 }), .12, g, 0, 0, 0); const s = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 1.9), new THREE.MeshBasicMaterial({ color: new THREE.Color(.85, .85, .85), toneMapped: false })); s.position.z = .08; g.add(s); const cv = document.createElement('canvas'); cv.width = 480; cv.height = 315; const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; s.material.map = t; let key = null;
  g.userData.draw = (k, fn) => { if (k === key) return; key = k; fn(cv.getContext('2d'), 480, 315); t.needsUpdate = true; }; outline(g, 1.4); return g; })();
const CHALK = (() => { const g = new THREE.Group(); scene.add(g); box(.18, .7, .18, mat(0xffffff), .04, g, 0, 0, 0); return g; })();
const CARD = (() => { const g = new THREE.Group(); scene.add(g); box(1.6, 1, .06, mat(0xffd23f, { metalness: .4, roughness: .3 }), .08, g, 0, 0, 0); box(.4, .3, .08, mat(0xd9a531, { metalness: .8 }), .03, g, -.4, .1, 0); return g; })();
const CASH = Array.from({ length: 14 }, (_, i) => { const p = new THREE.Mesh(new THREE.PlaneGeometry(1.2, .6), new THREE.MeshStandardMaterial({ color: 0x8ad88a, roughness: .8, side: THREE.DoubleSide })); scene.add(p); return p; });
const CONF = Array.from({ length: 60 }, (_, i) => { const p = new THREE.Mesh(new THREE.PlaneGeometry(.3, .45), new THREE.MeshBasicMaterial({ color: [0xff4a8a, 0xffd23f, 0x3ab8ff, 0x8ad84a, 0xff8a3a][i % 5], side: THREE.DoubleSide })); scene.add(p); return p; });
const SMOKE = Array.from({ length: 22 }, (_, i) => { const s = new THREE.Mesh(new THREE.SphereGeometry(.5, 10, 8), new THREE.MeshStandardMaterial({ color: 0x5a5a62, transparent: true, opacity: .55, roughness: 1, depthWrite: false })); scene.add(s); return s; });
const SPARK = Array.from({ length: 24 }, () => { const s = new THREE.Mesh(new THREE.BoxGeometry(.08, .08, .3), new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 2, .6), toneMapped: false })); scene.add(s); return s; });
const DRIP = Array.from({ length: 10 }, () => { const s = sphere(.12, new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xff6a1a, emissiveIntensity: .6 }), scene, 0, 0, 0, 6, 4); return s; });
const SWEAT = sphere(.14, mat(0x9fd8ff, { roughness: .05, transparent: true, opacity: .85 }), scene, 0, 0, 0, 10, 8);
const BOWLS = Array.from({ length: 2 }, () => { const g = new THREE.Group(); scene.add(g); cyl(.9, .6, .7, mat(0xffffff), 16, g, 0, 0, 0); return g; });
const PROPS = [...PH, TAB, CHALK, CARD, ...CASH, ...CONF, ...SMOKE, ...SPARK, ...DRIP, SWEAT, ...BOWLS];
// ---------- ambiente ----------
const AIR = aire(scene, 260); const BIRDS = bandada(scene, 9);
function setSky(top, mid, hor) { const u = sky.sky.material.uniforms; u.top.value.setRGB(...top); u.mid.value.setRGB(...mid); u.hor.value.setRGB(...hor); }
let MODE = 'day';
const WINS = ST.wins;
function winLights(k) { for (const m of WINS) m.emissiveIntensity = k; }
function day() { MODE = 'day'; renderer.toneMappingExposure = .96; setSky([.22, .5, .95], [.5, .74, 1], [.84, .93, 1]); sky.moon.visible = false; hemi.intensity = 1.2; hemi.color.setRGB(.88, .94, 1); hemi.groundColor.setRGB(.55, .6, .45); sun.intensity = 2.4; sun.color.setRGB(1, .95, .86); rim.intensity = 1.0;
  scene.fog.color.setRGB(.82, .9, 1); scene.fog.density = .0008; bloom.strength = .14; bloom.threshold = .92; winLights(0); FILL.intensity = 0; }
function morning() { day(); setSky([.3, .5, .9], [.7, .76, .95], [1, .86, .7]); sun.color.setRGB(1, .86, .66); sun.intensity = 2.2; hemi.intensity = 1.1; scene.fog.color.setRGB(.95, .88, .8); }
function night() { MODE = 'night'; renderer.toneMappingExposure = .92; setSky([.02, .04, .14], [.06, .1, .3], [.16, .2, .42]); sky.moon.visible = true; sky.moon.position.set(-500, 700, -1200); hemi.intensity = .75; hemi.color.setRGB(.55, .66, 1); hemi.groundColor.setRGB(.18, .18, .28); sun.intensity = .9; sun.color.setRGB(.72, .78, 1); rim.intensity = 1.6;
  scene.fog.color.setRGB(.1, .14, .28); scene.fog.density = .0009; bloom.strength = .22; bloom.threshold = .9; winLights(.9); FILL.intensity = 30; }
function inside(h = .8, fill = 60) { MODE = 'in'; renderer.toneMappingExposure = .92; hemi.intensity = h; hemi.color.setRGB(.95, .95, 1); hemi.groundColor.setRGB(.5, .45, .4); sun.intensity = 0; rim.intensity = .5; bloom.strength = .14; bloom.threshold = .92; scene.fog.density = .0002; FILL.intensity = fill; }
function hideAll() {
  for (const c of POOL) { c.root.visible = false; c.root.rotation.set(0, 0, 0); c.root.scale.setScalar(c.spec.scale || 1); applyPose(c, {}); c.setFace({}); if (c.root.parent !== scene) { c.root.parent.remove(c.root); scene.add(c.root); } }
  for (const p of PROPS) { p.visible = false; p.rotation.set(0, 0, 0); p.scale.setScalar(1); if (p.parent !== scene) { p.parent.remove(p); scene.add(p); } }
  for (const m of MAM) { m.root.visible = false; m.root.rotation.set(0, 0, 0); m.root.scale.setScalar(m.scale); m.pose(0, 0); }
  for (const k in SETS) SETS[k].visible = false;
  OS.LAVA.visible = false; OS.LL.intensity = 0; OS.BUB.forEach(b => b.position.y = -5); FL.hot.emissiveIntensity = 0; FL.STEAM.forEach(s => s.visible = false); KL.FLOOR.intensity = 0; NB.PRINTS.visible = false;
  ZI.BLUE.intensity = 0; ZI.LMP.intensity = 120; JZ.BLUE.intensity = 0; JZ.LMP.intensity = 120; ST.GRILL.position.set(2.2, 2.4, .5); ST.GRILL.rotation.set(0, 0, 0);
  TR.SL.intensity = 0; TR.BEAM.visible = false; TR.dome.material.emissiveIntensity = .3; TR.panels.forEach((p, i) => { p.material.map = TR.texH[i]; }); TR.cap.position.y = 4.6; TR.L.intensity = 140; TR.CAMS.forEach(c => c.hd.rotation.set(0, 0, 0));
  grade.uniforms.vig.value = .4; grade.uniforms.flash.value = 0; grade.uniforms.lift.value = 0; grade.uniforms.sat.value = 1.42; grade.uniforms.sharp.value = 1.05; grade.uniforms.sepia.value = 0; DARK = 0; TINT = null; day(); }
const use = (...n) => { for (const k of n) SETS[k].visible = true; };
function put(ch, x, y, z, ry = 0) { ch.root.visible = true; ch.root.position.set(x, y, z); ch.root.rotation.set(0, ry, 0); return ch; }
const show = (o, x, y, z, ry = 0, s = 1) => { o.visible = true; o.position.set(x, y, z); o.rotation.set(0, ry, 0); o.scale.setScalar(s); return o; };
const attach = (obj, parent, p = [0, 0, 0], r = [0, 0, 0], s = 1) => { parent.add(obj); obj.position.set(...p); obj.rotation.set(...r); obj.scale.setScalar(s); obj.visible = true; return obj; };
// teléfono en la mano derecha, pantalla hacia la cara (con la pose 'phone_look')
const holdPhone = (i, ch, kind = 'lava', o = {}, r = 1) => { const p = attach(PH[i], (r ? ch.aR : ch.aL).hand, [0, -.55, .5], [-.35, 0, 0], 1.0); p.userData.set(kind, o); return p; };
// enseñar el móvil a cámara (pantalla hacia delante)
const SHOW = { aRx: 1.25, aRz: -.12, aRe: .55, aLz: .1, aLe: .2, headX: .12 };
const holdShow = (i, ch, kind = 'lava', o = {}, s = 1.3) => { const p = attach(PH[i], ch.aR.hand, [0, -.85, .05], [1.8, 0, 0], s); p.userData.set(kind, o); return p; };
// pantallas especiales del móvil/tableta (texturas cacheadas)
const PT = new Map(); const ptex = (key, fn, w = 300, h = 533) => { if (!PT.has(key)) { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; PT.set(key, t); } return PT.get(key); };
const LOOK = { aRx: 1.25, aRz: -.25, aRe: 1.6, aLx: .9, aLz: -.15, aLe: 1.6, headX: .38 };
function cam(p, t, fov = 50) { camera.position.set(...p); camera.up.set(0, 1, 0); camera.lookAt(...t); camera.fov = fov; }
function cm(a, b, k, e = easeInOut) { const q = e(clamp(k)), L = i => lerp(a[i], b[i], q); cam([L(0), L(1), L(2)], [L(3), L(4), L(5)], lerp(a[6] ?? 50, b[6] ?? 50, q)); }
const hp = ch => { ch.root.updateMatrixWorld(true); return ch.head.getWorldPosition(V(0, 0, 0)); };
const wpos = o => { o.updateMatrixWorld(true); return o.getWorldPosition(V(0, 0, 0)); };
function onFace(ch, dist, dy = 0, side = 0, fov = 40, k = 0, dist2 = null) { const h = hp(ch).add(V(0, .6 * (ch.spec.scale || 1), 0)), a = ch.root.rotation.y, fx = Math.sin(a), fz = Math.cos(a), d = lerp(dist, dist2 ?? dist * .8, easeInOut(k));
  cam([h.x + fx * d + fz * side, h.y + .3 + dy, h.z + fz * d - fx * side], [h.x, h.y - .5, h.z], fov); }
const proj = v => { camera.updateMatrixWorld(); const p = v.clone().project(camera); return [(p.x + 1) / 2 * W, (1 - p.y) / 2 * H, p.z]; };
function ojos(expr, T, sd) { const n = Math.sin(T * .9 + sd) * .55 + Math.sin(T * 2.3 + sd * 2.1) * .45;
  switch (expr) {
    case 'neutral': case 'talk': case undefined: return n > .25 ? 'half' : n < -.55 ? (sd % 2 ? 'side_l' : 'side_r') : 'normal';
    case 'sad': return n > -.1 ? 'half' : 'down';
    case 'happy': case 'smile': case 'relief': case 'joy': return n > -.3 ? 'happy' : 'half';
    case 'worried': return n > .45 ? 'side_l' : n < -.45 ? 'down' : 'worried';
    case 'scared': return n > .3 ? 'worried' : 'scared';
    case 'shock': case 'gasp': return n > -.2 ? 'wide' : 'scared';
    case 'determined': return n > .5 ? 'squint' : 'angry';
    case 'angry': case 'shout': return n > .55 ? 'squint' : 'angry';
    case 'confused': return n > 0 ? 'squint' : 'side_r';
    case 'sus': case 'smug': return n > .2 ? 'squint' : 'half';
    case 'bored': case 'tired': return 'half';
    case 'down': return 'down';
    default: return null; } }
function cara(ch, T, f = {}) { const s = { ...f }; if (!s.eyes && !s.noBlink) { const b = eyesAlive(T, ch.seed, 'normal'); const o = ojos(s.expr, T, ch.seed); if (b === 'closed') s.eyes = 'closed'; else if (o) s.eyes = o; } delete s.noBlink; ch.setFace(s); }
const spoken = (a, b) => WORDS.filter(w => w[0] >= a - .01 && w[0] < b);
const talk = (ch, T, a, b, expr = 'talk') => cara(ch, T, { expr, mouth: kitLips(T, spoken(a, b)) || 'flat' });
const laughF = (ch, T) => cara(ch, T, { expr: 'joy', eyes: 'happy', mouth: Math.sin(T * 18) > 0 ? 'laugh' : 'open_smile' });
const LAUGH = T => ({ lean: -.12 + Math.abs(Math.sin(T * 14)) * .06, headX: -.25, crouch: Math.abs(Math.sin(T * 14)) * .05 });
const sweat = (ch, T) => { const h = hp(ch); const k = (T * .8) % 1; SWEAT.visible = true; SWEAT.position.copy(h).add(V(.5, 1.3 - k * .9, .45)); SWEAT.scale.set(1, 1.4, 1); };
const faceTo = (from, to) => Math.atan2(to.x - from.x, to.z - from.z);
// partículas
function confetti(c, T0, T, n = 60) { CONF.forEach((f, i) => { if (i >= n) return; const r = RNG(i * 3 + 9), t = T - T0; if (t < 0) return; f.visible = true; const a = r() * 6.283, v = 3 + r() * 6; f.position.set(c.x + Math.cos(a) * v * Math.min(t, .4) * 2.4, c.y + 6 + v * Math.min(t, .3) * 2.4 - t * t * 2.5, c.z + Math.sin(a) * v * Math.min(t, .4) * 2.4); f.rotation.set(T * 6 + i, T * 4 + i, 0); }); }
function smoke(c, T, k = 1, n = 22, col = null) { SMOKE.forEach((s, i) => { if (i >= n) return; const r = RNG(i * 5 + 1), ph = (T * .55 + r()) % 1; s.visible = true; s.position.set(c.x + (r() - .5) * 1.2 + Math.sin(T + i) * ph * .8, c.y + ph * 6 * k, c.z + (r() - .5) * 1.2); s.scale.setScalar((.5 + ph * 2.2) * k); s.material.opacity = .6 * (1 - ph); if (col) s.material.color.set(col); else s.material.color.set(0x5a5a62); }); }
function sparks(c, T0, T, n = 24) { SPARK.forEach((s, i) => { if (i >= n) return; const r = RNG(i * 7 + 3), t = ((T - T0) * 1.3 + r()) % 1; s.visible = true; const a = r() * 6.283, v = 2 + r() * 3; s.position.set(c.x + Math.cos(a) * v * t, c.y + v * t * 1.3 - t * t * 4, c.z + Math.sin(a) * v * t); s.lookAt(c.x, c.y, c.z); }); }
function cashRain(c, T0, T, n = 14) { CASH.forEach((p, i) => { if (i >= n) return; const r = RNG(i * 11 + 2), t = T - T0; if (t < 0) return; p.visible = true; p.position.set(c.x + (r() - .5) * 8 + Math.sin(T * 2 + i) * .6, c.y + 10 - ((t * 3 + r() * 10) % 10), c.z + (r() - .5) * 4); p.rotation.set(T * 2 + i, T * 3 + i, T + i); }); }

// ---------- capa 2D ----------
const BAD_ = []; const badge = (kind, text, x, y, k, a = 1, sc = 1) => BAD_.push({ kind, text, x, y, s: spring(clamp(k) * 1.6) * sc, a, on: k > 0 });
const badge3 = (kind, text, w3, k, sc = 1) => BAD_.push({ kind, text, w3, s: spring(clamp(k) * 1.6) * sc, a: 1, on: k > 0 });
const bubble = (ch, text, k, dy = 2.4) => BAD_.push({ kind: 'bubble', text, w3: hp(ch).add(V(0, dy * (ch.spec.scale || 1) + .6, 0)), s: spring(clamp(k) * 1.6), a: 1, on: k > 0 });
function drawBadge(b) {
  if (!b.on) return; if (b.w3) { const [x, y, z] = proj(b.w3); if (z >= 1) return; b.x = clamp(x, 220, W - 220); b.y = clamp(y, 200, H * .62); } if (b.s <= .01 || b.a <= 0) return;
  const c = octx; c.save(); c.globalAlpha = b.a; c.translate(b.x, b.y); c.scale(b.s * U, b.s * U); c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
  if (b.kind === 'big' || b.kind === 'red' || b.kind === 'num') { c.font = `700 ${b.kind === 'num' ? 74 : 92}px ${FONT}`; const tw = c.measureText(b.text).width; if (tw > 600) { const k = 600 / tw; c.scale(k, k); }
    c.lineWidth = 22; c.strokeStyle = b.kind === 'red' ? '#4a0008' : '#0e1226'; c.strokeText(b.text, 0, 0); const g = c.createLinearGradient(0, -50, 0, 50); if (b.kind === 'red') { g.addColorStop(0, '#ff6a6a'); g.addColorStop(1, '#d6202f'); } else { g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#ffe07a'); } c.fillStyle = g; c.fillText(b.text, 0, 0); }
  else if (b.kind === 'tag') { c.font = `700 50px ${FONT}`; const w = c.measureText(b.text).width + 60; c.fillStyle = '#0e1226'; c.beginPath(); c.roundRect(-w / 2, -40, w, 80, 40); c.fill(); c.lineWidth = 6; c.strokeStyle = '#ffd23f'; c.stroke(); c.fillStyle = '#fff'; c.fillText(b.text, 0, 3); }
  else if (b.kind === 'bubble') { c.font = `700 42px ${FONT}`; const w = Math.max(160, c.measureText(b.text).width + 60); c.fillStyle = '#fff'; c.strokeStyle = '#1a1a1a'; c.lineWidth = 6; c.beginPath(); c.roundRect(-w / 2, -44, w, 88, 36); c.fill(); c.stroke(); c.beginPath(); c.moveTo(-18, 42); c.lineTo(10, 42); c.lineTo(-24, 78); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#1a1a1a'; c.fillText(b.text, 0, 3); }
  else if (b.kind === 'q') { c.font = `700 120px ${FONT}`; c.lineWidth = 18; c.strokeStyle = '#0e1226'; c.strokeText('?', 0, 0); c.fillStyle = '#ffd23f'; c.fillText('?', 0, 0); }
  c.restore(); }
const KEY = /^(Stadt|Stadt-Videos|jeder|Frühstück|Kinderwecken|Klo|Lehrer|Brandt|Mathe|Lava|zwanzig|Minuten|LAVA|Tafel|Oma|Gerda|Mammut|Baby-Mammut|1\.499|Euro|Frage|Videos|eigentlich|Namen|Kanal|Nacht|4:44|Jonas|drei|Nächte|Wand|Laptop|qualmen|Schulboden|heiß|Sohlen|geschmolzen|echtes|bestimmen|Bild|Uhr|Rathausturm|vier|Lüftungsgitter|Turm|Ziffernblatt|Bildschirme|fünfhundert|Haus|Kamera|allein|Atmen|Plötzlich|Kameras|mir|Sirene|ich|roter|Knopf|ALLES|LÖSCHEN|draufgehauen|keine|kein|getanzt|zurückbekommen|Fernseher|neues|verschwindet|Junge|wusste|Vier|Millionen|Aufrufe|Minute|hochgeladen)$/;
const CAPS = WORDS.map(w => { const t = w[2].replace(/[„“"”.,!?:…–]/g, '').replace(/^-|-$/g, '').trim(); return { t: w[0], txt: t, key: KEY.test(t) }; }).filter(w => w.txt);
function caption(T) { let cur = null; for (const w of CAPS) { if (w.t <= T) cur = w; else break; } if (!cur) return;
  const f = (T - cur.t) * FPS, s = f < 1 ? .2 : f < 2 ? 1.12 : 1, size = H * .046 * (cur.key ? 1.35 : 1), c = octx;
  c.save(); c.translate(W / 2, H * .74); c.scale(s, s); c.font = `700 ${size}px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
  const tw = c.measureText(cur.txt).width; if (tw > W * .9) { const k = W * .9 / tw; c.scale(k, k); }
  c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 14; c.shadowOffsetY = 6; c.lineWidth = size * .24; c.strokeStyle = '#000'; c.strokeText(cur.txt, 0, 0); c.shadowColor = 'transparent'; c.fillStyle = '#E2FD07'; c.fillText(cur.txt, 0, 0); c.restore(); }

// ---------- planos ----------
const S = []; const shot = (t0, tr, zoom, fn, sfx = []) => S.push({ t0, tr, zoom, fn, sfx });
const PI = Math.PI;
let DARK = 0, TINT = null;
// ===== utilidades de los planos =====
const city = (L, m = 'day') => { use('ST'); if (m === 'night') night(); else if (m === 'morning') morning(); else day(); };
const bigVid = (kind, o = {}) => ST.big.userData.draw(kind + JSON.stringify(o), (c, w, h) => drawVid(c, w, h, kind, o));
// gente con móvil: [personaje, x, z, ry, modo('walk'|'laugh'|'look'), vídeo]
function crowd(L, list, base = 0) { list.forEach(([c, x, z, ry, m, kind], i) => { const T = L.T + i * .37;
  if (m === 'walk') { caminar(c, L.lt + i * .5, { x, z, ry, speed: 2.4, T, extra: { aRx: 1.25, aRz: -.25, aRe: 1.6, headX: .38 } }); cara(c, T, { expr: i % 2 ? 'smile' : 'neutral', eyes: 'down' }); }
  else if (m === 'laugh') { put(c, x, 0, z, ry); actuar(c, L.lt, [[0, { ...LOOK, ...LAUGH(T) }]], { T }); laughF(c, T); }
  else { put(c, x, 0, z, ry); actuar(c, L.lt, [[0, LOOK]], { T }); cara(c, T, { expr: 'neutral', eyes: 'down', mouth: 'smile' }); }
  holdPhone(base + i, c, kind || ['lava', 'mammut', 'plain'][i % 3]); }); }
// pantallas especiales
const UI = (c, w, h, bg = '#ffffff') => { c.fillStyle = bg; c.fillRect(0, 0, w, h); };
function drawLock(c, w, h, notif = true) { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#1a1a4a'); g.addColorStop(1, '#4a2a6a'); c.fillStyle = g; c.fillRect(0, 0, w, h); txt(c, '4:44', w / 2, h * .2, w * .3, '#ffffff'); txt(c, 'Donnerstag, 3. Juni', w / 2, h * .3, w * .065, '#d8d8f8');
  if (notif) { c.fillStyle = 'rgba(255,255,255,.92)'; c.beginPath(); c.roundRect(w * .06, h * .4, w * .88, h * .16, 18); c.fill(); c.fillStyle = '#ff3a5a'; c.beginPath(); c.roundRect(w * .1, h * .425, w * .14, w * .14, 10); c.fill(); txt(c, '▶', w * .17, h * .425 + w * .07, w * .08, '#fff');
    c.textAlign = 'left'; c.fillStyle = '#1a1a1a'; c.font = `700 ${w * .055}px ${FONT}`; c.fillText('IN DIESER STADT', w * .28, h * .445); c.font = `700 ${w * .05}px ${FONT}`; c.fillStyle = '#4a4a5a'; c.fillText('Neues Video ist da!', w * .28, h * .5); } }
function drawNoName(c, w, h) { drawVid(c, w, h, 'mammut', { ui: false }); c.fillStyle = 'rgba(0,0,0,.6)'; c.fillRect(0, h * .72, w, h * .28); c.fillStyle = '#8a8a96'; c.beginPath(); c.arc(w * .16, h * .79, w * .08, 0, 7); c.fill(); txt(c, '?', w * .16, h * .79 + 2, w * .1, '#fff');
  c.textAlign = 'left'; c.font = `700 ${w * .07}px ${FONT}`; c.fillStyle = '#fff'; c.fillText('@ ? ? ?', w * .28, h * .785); c.font = `700 ${w * .05}px ${FONT}`; c.fillStyle = '#ff8a8a'; c.fillText('Kein Name · Kein Kanal', w * .08, h * .87); }
function drawShop(c, w, h, step = 0) { UI(c, w, h, '#fff6ea'); c.fillStyle = '#ff8a23'; c.fillRect(0, 0, w, h * .14); txt(c, 'TIER-SHOP', w / 2, h * .07, h * .075, '#fff');
  c.fillStyle = '#e8f4ff'; c.fillRect(w * .06, h * .18, w * .5, h * .58); c.fillStyle = '#a07040'; c.beginPath(); c.ellipse(w * .3, h * .5, w * .16, h * .13, 0, 0, 7); c.fill(); c.beginPath(); c.arc(w * .43, h * .41, w * .08, 0, 7); c.fill(); c.fillRect(w * .46, h * .44, w * .03, h * .14); c.fillRect(w * .19, h * .58, w * .05, h * .1); c.fillRect(w * .34, h * .58, w * .05, h * .1);
  c.fillStyle = '#1a1a1a'; c.beginPath(); c.arc(w * .45, h * .39, w * .012, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = w * .012; c.beginPath(); c.arc(w * .44, h * .48, w * .04, 1.3, 3.4); c.stroke(); c.fillStyle = '#ff5a85'; c.beginPath(); c.arc(w * .3, h * .38, w * .03, 0, 7); c.fill();
  c.textAlign = 'left'; c.fillStyle = '#1a1a1a'; c.font = `700 ${h * .075}px ${FONT}`; c.fillText('Baby-Mammut', w * .6, h * .26); c.font = `700 ${h * .05}px ${FONT}`; c.fillStyle = '#4a4a5a'; c.fillText('flauschig · 1 Jahr', w * .6, h * .36); c.fillStyle = '#d8201a'; c.font = `700 ${h * .1}px ${FONT}`; c.fillText('1.499 €', w * .6, h * .5);
  c.fillStyle = step ? '#2ec46a' : '#ffd23f'; c.beginPath(); c.roundRect(w * .6, h * .6, w * .36, h * .14, 14); c.fill(); txt(c, step ? '✓ BESTELLT' : 'IN DEN WARENKORB', w * .78, h * .67, h * (step ? .06 : .045), '#1a1a1a'); }
function drawRefund(c, w, h) { UI(c, w, h, '#eafff0'); c.fillStyle = '#2ec46a'; c.beginPath(); c.arc(w / 2, h * .32, h * .16, 0, 7); c.fill(); txt(c, '✓', w / 2, h * .33, h * .2, '#fff'); txt(c, 'ERSTATTUNG', w / 2, h * .6, h * .08, '#1a6a3a'); txt(c, '+ 1.499 €', w / 2, h * .76, h * .13, '#1a8a4a'); }
function drawClock(c, w, h, txt_) { c.fillStyle = '#05060a'; c.fillRect(0, 0, w, h); c.shadowColor = '#ff3a2a'; c.shadowBlur = 12; txt(c, txt_, w / 2, h / 2 + 3, h * .78, '#ff3a2a'); c.shadowBlur = 0; }
function drawPause(c, w, h, k) { c.fillStyle = '#1a1c24'; c.fillRect(0, 0, w, h); c.save(); c.beginPath(); c.rect(w * .25, h * .04, w * .5, h * .7); c.clip(); c.translate(w * .25, h * .04); drawVid(c, w * .5, h * .7, ['lava', 'mammut', 'plain'][Math.floor(k * 3) % 3], { ui: false }); c.restore();
  c.fillStyle = 'rgba(255,255,255,.85)'; c.fillRect(w * .46, h * .32, w * .03, h * .14); c.fillRect(w * .51, h * .32, w * .03, h * .14);
  for (let i = 0; i < 8; i++) { c.fillStyle = i === Math.floor(k * 8) % 8 ? '#ffd23f' : '#3a3e4a'; c.fillRect(w * (.04 + i * .12), h * .8, w * .1, h * .14); c.fillStyle = ['#ff8a3a', '#8fd0ff', '#f7c6dc'][i % 3]; c.fillRect(w * (.05 + i * .12), h * .82, w * .08, h * .1); }
  c.textAlign = 'left'; c.font = `700 ${h * .06}px ${FONT}`; c.fillStyle = '#fff'; c.fillText('BILD ' + (100 + Math.floor(k * 900)) + ' / 1800', w * .78, h * .1); }
// vídeo congelado con el reloj del Rathaus marcado al fondo
function drawClue(c, w, h, kind, zoom = 0) { c.save(); const z = 1 + zoom * 2.2; c.translate(w * .78, h * .25); c.scale(z, z); c.translate(-w * .78, -h * .25); drawVid(c, w, h, kind, { ui: false });
  c.fillStyle = '#e9dcc8'; c.fillRect(w * .72, h * .1, w * .12, h * .22); c.fillStyle = '#4fb39a'; c.beginPath(); c.moveTo(w * .7, h * .1); c.lineTo(w * .78, h * .03); c.lineTo(w * .86, h * .1); c.fill(); c.fillStyle = '#fdf6e0'; c.beginPath(); c.arc(w * .78, h * .16, w * .04, 0, 7); c.fill(); c.strokeStyle = '#1d2238'; c.lineWidth = 2; c.stroke();
  c.beginPath(); c.moveTo(w * .78, h * .16); c.lineTo(w * .795, h * .15); c.moveTo(w * .78, h * .16); c.lineTo(w * .79, h * .135); c.stroke(); c.restore();
  c.strokeStyle = '#ff2a2a'; c.lineWidth = w * .015; c.beginPath(); const r = w * (.08 + zoom * .18); c.arc(w * .78 + (w * .5 - w * .78) * zoom, h * .2 + (h * .4 - h * .2) * zoom, r, 0, 7); c.stroke(); }
// editor 3D de Jonas: muñeco que atraviesa la pared + error
function drawEditor(c, w, h, k = 0, err = 0) { c.fillStyle = '#2a2e3a'; c.fillRect(0, 0, w, h); c.fillStyle = '#3a3f4e'; c.fillRect(0, 0, w, h * .1); c.fillRect(0, 0, w * .16, h); txt(c, 'MEIN 3D-VIDEO', w * .58, h * .05, h * .06, '#fff');
  c.save(); c.beginPath(); c.rect(w * .18, h * .12, w * .8, h * .84); c.clip(); c.fillStyle = '#8fd0ff'; c.fillRect(w * .18, h * .12, w * .8, h * .84); c.fillStyle = '#5cc24a'; c.fillRect(w * .18, h * .75, w * .8, h * .21);
  c.fillStyle = '#b5564a'; c.fillRect(w * .6, h * .3, w * .1, h * .46); c.strokeStyle = '#8a3a30'; c.lineWidth = 2; for (let y = h * .3; y < h * .76; y += h * .05) { c.beginPath(); c.moveTo(w * .6, y); c.lineTo(w * .7, y); c.stroke(); }
  fig(c, w * (.3 + k * .4), h * .82, h / 330, '#3fa8ff', '#1a1a1a'); c.restore();
  if (err) { c.fillStyle = 'rgba(200,20,20,.9)'; c.beginPath(); c.roundRect(w * .3, h * .35, w * .5, h * .3, 12); c.fill(); txt(c, '⚠ FEHLER', w * .55, h * .45, h * .08, '#fff'); txt(c, 'Figur in Wand!', w * .55, h * .56, h * .055, '#ffe0e0'); } }

// ===== 0–9,6 s: el gancho y «todo el mundo los ve» =====
// 1 «In dieser Stadt» — golpe de zoom: yo en el centro de la plaza; alrededor todo el mundo con el móvil (unos andan, otros se ríen); detrás la pantalla gigante
shot(0, 'C', null, L => { city(L); bigVid('lava', { prog: .2 + L.T * .1 }); put(ich, 0, 0, 6, 0); actuar(ich, L.lt, [[0, { aRx: .3, aRz: .2, aLz: .15, headX: -.05 }]], { T: L.T }); cara(ich, L.T, { expr: 'smile', mouth: 'smile' });
  crowd(L, [[K[0], -3.4, 1.5, .4, 'laugh'], [K[4], 3.6, 0.5, -.5, 'laugh'], [sie, -9, -5, 1.57, 'walk'], [K[1], 8, -9, -1.57, 'walk'], [lena, -2, -6, .2, 'look'], [K[6], 2.8, -8, -.3, 'look'], [fahrer, -6, -12, .5, 'look'], [K[2], 6, -14, -.6, 'laugh'], [er, -1, -18, 0, 'walk'], [kasse, 4, -22, PI, 'walk']]);
  cm([0, 2.6, 21.4, 0, 1.9, 6, 52], [0, 2.6, 19.2, 0, 1.9, 6, 50], L.k, easeOut); sh(V(0, 0, 0), 40); }, [[0, 'whoosh_up', .7], [.05, 'city_amb', .6], [.2, 'kids_laugh', .4], [.4, 'notif', .5]]);
// 2 «schaut jeder diese» — grúa sobre la plaza: decenas de personas mirando el móvil; la pantalla gigante encendida
shot(.78, 'W', null, L => { city(L); bigVid('mammut', { prog: .5 }); crowd(L, [[K[0], -5, 10, 0, 'look'], [K[1], 5, 12, PI, 'look'], [K[2], -10, 0, .7, 'walk'], [K[3], 10, -2, -.7, 'look'], [K[4], -3, -6, .3, 'laugh'], [K[5], 4, -8, -.2, 'look'], [K[6], -8, -16, 1.2, 'walk'], [K[7], 8, -20, -1.4, 'walk'], [sie, 0, 3, PI / 2, 'walk'], [er, -12, 16, .4, 'laugh'], [lena, 11, 18, -.5, 'look'], [kasse, -2, -24, 0, 'look'], [fahrer, 6, 22, PI, 'look'], [mayor, -6, 22, 2.6, 'laugh']]);
  cm([12, 24, 34, 0, 3, -2, 50], [8, 21, 30, 0, 4, -6, 48], L.k); sh(V(0, 0, 0), 50); }, [[0, 'murmur', .5], [.3, 'notif', .5], [.7, 'vibrate', .5]]);
// 3 «„In dieser Stadt“-Videos.» — inserto: una chica enseña su móvil a cámara con el vídeo «IN DIESER STADT…»; se ríe a carcajadas
shot(1.84, 'Z', null, L => { city(L); bigVid('lava'); put(lena, 0, 0, -30, 0); actuar(lena, L.lt, [[0, { ...SHOW, ...LAUGH(L.T), headX: -.15 }]], { T: L.T }); laughF(lena, L.T); holdShow(0, lena, 'lava', { prog: .3 + L.k * .5 });
  crowd(L, [[K[3], -6, -38, .6, 'walk'], [K[5], 6, -40, -.4, 'look']], 1); const h = hp(lena); cm([h.x + .6, h.y - .3, h.z + 7.4, h.x, h.y - 1.4, h.z, 46], [h.x + .4, h.y - .4, h.z + 6.4, h.x, h.y - 1.4, h.z, 44], L.k); sh(V(0, 0, -30), 20); }, [[0, 'pop', .5], [.3, 'laugh_m', .5], [1.0, 'notif', .4]]);
// 4 «Und wenn ich jeder sage,» — yo a cámara, abriendo los brazos; detrás la gente pasa mirando el móvil
shot(3.52, 'S', null, L => { city(L); bigVid('plain'); put(ich, 2, 0, 20, -.15); actuar(ich, L.lt, [[0, 'idle'], [.25, { aLx: .7, aLz: .9, aRx: .7, aRz: .9, aLe: .5, aRe: .5, headZ: .1 }, { anti: .2 }]], { T: L.T }); talk(ich, L.T, 3.52, 4.88, 'smile');
  crowd(L, [[K[0], -8, 10, 1.57, 'walk'], [K[7], 10, 6, -1.57, 'walk'], [sie, -2, 6, .3, 'look'], [er, 5, 4, -.3, 'laugh']]); cm([2.6, 3.4, 33, 2, 2.6, 18, 48], [2.4, 3.3, 30.5, 2, 2.6, 18, 46], L.k); sh(V(2, 0, 16), 30); }, [[0, 'steps', .5], [.4, 'cloth', .4], [.9, 'notif', .4]]);
// 5 «dann meine ich jeder.» — travelling lateral por una fila: el bombero, el alcalde, la cajera, el conductor… todos con el móvil
shot(4.88, 'W', null, L => { city(L); bigVid('mammut'); const row = [FW[0], mayor, kasse, fahrer, K[6], FW[1]]; row.forEach((c, i) => { put(c, -10 + i * 4, 0, 30 + (i % 2) * 1.2, 0); actuar(c, L.lt, [[0, i % 3 === 1 ? { ...LOOK, ...LAUGH(L.T + i) } : LOOK]], { T: L.T + i }); if (i % 3 === 1) laughF(c, L.T + i); else cara(c, L.T + i, { expr: 'neutral', eyes: 'down', mouth: 'smile' }); holdPhone(i, c, ['plain', 'lava', 'mammut'][i % 3]); });
  const x = lerp(-8, 6, easeInOut(L.k)); cam([x, 4.4, 44], [x, 3.6, 30], 46); sh(V(0, 0, 30), 30); }, [[0, 'notif', .5], [.4, 'laugh_deep', .4], [.9, 'vibrate', .4], [1.3, 'notif', .3]]);
// 6 «Beim Frühstück,» — cocina: familia desayunando con los ojos en el móvil; la leche se desborda del bol
shot(6.5, 'Z', null, L => { use('KU'); inside(.9); const T0 = V(KX, 0, 2); sit(sie, KX - 3, 2.65, 7, PI); sit(K[2], KX + 3, 2.65, 7, PI); sit(er, KX, 2.65, -3, 0);
  [sie, K[2], er].forEach((c, i) => { actuar(c, L.lt, [[0, { ...SIT, aRx: 1.3, aRz: -.25, aRe: 1.6, aLx: 1.1, aLe: 1.2, headX: .4 }]], { T: L.T + i }); cara(c, L.T + i, { expr: i === 1 ? 'joy' : 'neutral', eyes: 'down', mouth: i === 1 ? 'open_smile' : 'smile' }); holdPhone(i, c, ['lava', 'mammut', 'plain'][i]); });
  const pour = clamp((L.lt - .2) / .3); KU.milk.rotation.z = lerp(0, 1.6, easeOut(pour)); const h = V(KX, 5, 2); cm([KX + 7, 9.5, 17, KX, 4.2, 3, 46], [KX + 5.6, 9, 15, KX, 4.2, 3, 44], L.k); sh(T0, 20); }, [[0, 'spoon', .6], [.2, 'cup_rattle', .4], [.4, 'splash', .4], [.6, 'notif', .3]]);
// 7 «beim Kinderwecken,» — mamá despierta al niño con una mano… y con la otra mira el móvil; el niño también tiene el suyo
shot(7.34, 'C', null, L => { use('ZI'); inside(.9); ZI.LMP.intensity = 150; const kid = er; put(kid, ZX + 13, 3.6, -5.4, 0); kid.root.rotation.x = -PI / 2; kid.root.scale.setScalar(.75); applyPose(kid, { aRx: 2.6, aRe: .9, aLz: .2, headX: -.2 }); cara(kid, L.T, { expr: 'neutral', eyes: 'half', mouth: 'smile' }); holdPhone(1, kid, 'plain');
  put(mama, ZX + 7.4, 0, -6, PI / 2); actuar(mama, L.lt, [[0, { aLx: 1.4, aLz: -.1, aLe: .4, lean: .2, aRx: 1.25, aRz: -.25, aRe: 1.6, headX: .38 }]], { T: L.T, extra: { aLx: 1.4 + Math.sin(L.T * 14) * .15 } }); cara(mama, L.T, { expr: 'neutral', eyes: 'down', mouth: 'talk' }); holdPhone(0, mama, 'lava');
  cm([ZX + 4, 9.5, 6, ZX + 10, 4, -6, 50], [ZX + 4.6, 9, 4.6, ZX + 10, 4, -6, 48], L.k); sh(V(ZX + 10, 0, -6), 20); }, [[0, 'yawn_f', .4], [.2, 'blanket', .5], [.5, 'notif', .4], [.7, 'cloth', .3]]);
// 8 «sogar auf dem Klo.» — baño: un señor sentado en el váter, riéndose con el vídeo
shot(8.26, 'R', null, L => { use('BA'); inside(.9); sit(fahrer, BX, 2.62, -4.6, 0); actuar(fahrer, L.lt, [[0, { ...SIT, ...LOOK, ...LAUGH(L.T) }]], { T: L.T }); laughF(fahrer, L.T); holdPhone(0, fahrer, 'lava');
  cm([BX + 2.6, 6.4, 7, BX, 4, -4.6, 48], [BX + 2, 6.2, 5.6, BX, 4, -4.6, 46], L.k); sh(V(BX, 0, -4), 15); }, [[0, 'laugh_deep', .5], [.3, 'water_bloop', .4], [.8, 'laugh_m', .4]]);
const SIT = { crouch: .2, lLx: 1.5, lRx: 1.5, lLk: 1.5, lRk: 1.5, aLz: .15, aRz: .15 };
function sit(ch, x, y, z, ry) { const s = ch.spec.scale || 1; put(ch, x, y - (2.05 - .2) * s + .08, z, ry); applyPose(ch, SIT); }

// ===== 9,6–21,4 s: el profesor =====
const BBtxt = (lava, k = 1) => KL.BB.userData.draw('bb' + lava + Math.round(k * 20), (c, w, h) => { c.fillStyle = '#1e3a2a'; c.fillRect(0, 0, w, h); c.globalAlpha = .9; txt(c, '2x + 3 = 11', w * .3, h * .3, 70, '#f4f4f4'); txt(c, 'x = ?', w * .3, h * .62, 70, '#f4f4f4');
  if (lava) { c.save(); c.beginPath(); c.rect(w * .5, 0, w * .5 * k, h); c.clip(); txt(c, 'LAVA', w * .75, h * .5, 170, '#ffffff'); c.restore(); } c.globalAlpha = 1; });
const students = (L, n = 6, e = 'neutral') => { [K[0], K[1], K[3], K[4], K[5], K[7]].slice(0, n).forEach((c, i) => { const d = KL.desks[i % 9]; const p = d.position; sit(c, CX + p.x, 2.55, p.z + 2.8, PI); c.root.scale.setScalar(.8); actuar(c, L.lt, [[0, { ...SIT, aLx: 1.2, aRx: 1.2, aLe: 1.2, aRe: 1.2, headX: .05 }]], { T: L.T + i }); cara(c, L.T + i, { expr: typeof e === 'function' ? e(i) : e }); }); };
// 9 «Gestern hat mein Lehrer, Herr Brandt,» — aula: el profe Brandt delante de la pizarra; alumnos en sus pupitres
shot(9.56, 'S', null, L => { use('KL'); inside(.9); BBtxt(false); put(brandt, CX + 3, 0, -12, 0); actuar(brandt, L.lt, [[0, 'idle'], [.4, { aRx: 2.3, aRz: -.2, aRe: .6, headY: -.4 }]], { T: L.T }); cara(brandt, L.T, { expr: 'neutral' }); attach(CHALK, brandt.aR.hand, [0, -.6, .2], [0, 0, 0]);
  students(L, 6); badge3('tag', 'Herr Brandt', hp(brandt).add(V(0, 2.4, 0)), (L.lt - 1.1) * 2.5); cm([CX - 4, 9, 18, CX + 1, 6, -8, 48], [CX - 3, 8.6, 15, CX + 1.6, 6, -9, 46], L.k); sh(V(CX, 0, -4), 25); }, [[0, 'classroom', .5], [.3, 'chalk', .5], [1.2, 'pop', .5], [1.6, 'cough', .3]]);
// 10 «mitten in Mathe so ein Video geschaut:» — el profe esconde el móvil detrás del libro de mates y lo mira a escondidas
shot(11.52, 'W', null, L => { use('KL'); inside(.9); BBtxt(false); put(brandt, CX - 8, 0, -12.8, 0); actuar(brandt, L.lt, [[0, { ...LOOK, aLx: 1.2, aLz: -.3, aLe: 1.5, lean: .1 }]], { T: L.T }); cara(brandt, L.T, { expr: 'smile', eyes: 'down', mouth: 'smile' }); holdPhone(0, brandt, 'lava'); sweat(brandt, L.T);
  const bk = show(TAB, 0, 0, 0); attach(TAB, brandt.aL.hand, [0, -.7, .5], [-1.2, 0, 0], 1.0); TAB.userData.draw('mathbook', (c, w, h) => { c.fillStyle = '#2a6ad8'; c.fillRect(0, 0, w, h); txt(c, 'MATHE 7', w / 2, h / 2, 90, '#fff'); });
  students(L, 4); cm([CX - 4, 6.6, -2, CX - 8, 5, -12.8, 44], [CX - 5, 6.4, -4, CX - 8, 5.2, -12.8, 40], L.k); sh(V(CX - 8, 0, -12), 18); }, [[0, 'pages', .5], [.4, 'notif', .4], [1.0, 'whisper', .3], [1.6, 'tick', .3]]);
// 11 «In dieser Stadt wird der Boden» — dentro del vídeo: el salón de la Oma; el suelo empieza a burbujear naranja, la gente sube a los muebles
function lavaRoom(L, k, jumpers = true) { use('OS'); inside(.9); OS.LAVA.visible = true; OS.LAVA.material.emissiveIntensity = .5 * k; OS.LAVA.position.y = lerp(-.3, .12, k); OS.LL.intensity = 200 * k; OS.LAVA.material.map.offset.set(L.T * .03, L.T * .02);
  OS.BUB.forEach((b, i) => { const r = RNG(i * 3 + 1), ph = (L.T * .8 + r()) % 1; b.position.set(-14 + r() * 28, .2 + Math.sin(ph * PI) * .6 * k, -10 + r() * 22); b.scale.setScalar((.4 + ph) * k); }); }
shot(13.76, 'F', null, L => { const k = clamp(L.lt / 1.1); lavaRoom(L, k); sit(K[3], OX + 8, 3.0, -9, 0); actuar(K[3], L.lt, [[0, { ...SIT, lLx: 1.5 + .4 * k, lRx: 1.5 + .4 * k, aLx: .6, aRx: .6, aLz: .5, aRz: .5 }]], { T: L.T }); cara(K[3], L.T, { expr: 'shock' });
  const j = saltar(K[6], L.lt, .5, { h: 3.2, dur: .55, base: [OX + 1, 0, 3], dx: 1.6 }); if (L.lt > 1.2) K[6].root.position.y = 3.0; K[6].root.visible = true; K[6].root.rotation.y = .3; cara(K[6], L.T, { expr: 'shock' });
  cm([OX - 6, 8, 18, OX + 3, 3, -2, 50], [OX - 4, 7, 15, OX + 3, 3, -2, 48], L.k); sh(V(OX, 0, 0), 25); }, [[0, 'fire_crackle', .5], [.4, 'water_bloop', .5], [.6, 'jump', .4], [1.0, 'gasp', .4]]);
// 12 «alle zwanzig Minuten zu Lava.» — la lava lo cubre todo; reloj «20 MIN»; todos sobre el sofá y la mesa
shot(15.04, 'C', null, L => { lavaRoom(L, 1); [[K[3], OX + 6, 3.6, -9.2, .1], [K[1], OX + 10, 3.6, -9.2, -.2], [K[6], OX + 2.6, 3.1, 3, .4]].forEach(([c, x, y, z, ry], i) => { put(c, x, y, z, ry); actuar(c, L.lt, [[0, i === 2 ? 'brace' : { ...shiver(L.T, 1), aLx: .5, aLz: .7, aRx: .5, aRz: .7, aLe: .8, aRe: .8 }]], { T: L.T + i }); cara(c, L.T + i, { expr: i === 1 ? 'scared' : 'shock' }); });
  badge('num', '⏱ 20 MIN', W / 2, H * .2, (L.lt - .1) * 2.5); cm([OX + 12, 10, 12, OX + 5, 2.5, -4, 50], [OX + 10, 9, 10, OX + 5, 2.6, -4, 48], L.k); sh(V(OX, 0, 0), 25); }, [[0, 'fire_roar', .5], [.3, 'tick', .5], [.6, 'tick', .5], [1.2, 'scream_girl', .3], [1.6, 'water_bloop', .4]]);
// 13 «Er war so abgelenkt,» — primer plano del profe: risita con el móvil, la mano escribe sola en la pizarra
shot(17.14, 'W', null, L => { use('KL'); inside(.9); BBtxt(false); put(brandt, CX + 2, 0, -12.6, PI - .4); actuar(brandt, L.lt, [[0, { aRx: 2.4, aRz: .1, aRe: .5, aLx: 1.25, aLz: .25, aLe: 1.6, headX: .35, headY: .5 }]], { T: L.T, extra: { aRz: .1 + Math.sin(L.T * 9) * .12 } }); cara(brandt, L.T, { expr: 'joy', eyes: 'happy', mouth: 'open_smile' }); attach(CHALK, brandt.aR.hand, [0, -.6, .2], [0, 0, 0]); holdPhone(0, brandt, 'lava', {}, 0);
  onFace(brandt, -6.8, .2, 2.4, 42, L.k, -5.6); sh(V(CX, 0, -12), 18); }, [[0, 'chalk', .6], [.4, 'laugh_old', .4], [.8, 'chalk', .5]]);
// 14 «dass er statt der Aufgabe» — los alumnos se miran entre ellos, confusos
shot(18.32, 'Z', null, L => { use('KL'); inside(.9); BBtxt(true, clamp(L.lt / .8) * .4); students(L, 6, i => i % 2 ? 'confused' : 'worried'); K[1].root.rotation.y = PI - .5; K[4].root.rotation.y = PI + .5;
  cm([CX + 4, 6, -12, CX, 4, 6, 50], [CX + 3, 6, -11, CX, 4, 6, 46], L.k); sh(V(CX, 0, 4), 25); }, [[0, 'murmur', .4], [.3, 'chair_roll', .4], [.6, 'hmm', .4]]);
// 15 «„LAVA“ an die Tafel geschrieben hat.» — la pizarra: «LAVA» enorme con tiza; el profe sigue riéndose con el móvil
shot(19.12, 'C', null, L => { use('KL'); inside(.9); const k = clamp(.4 + L.lt / 1.0); BBtxt(true, k); put(brandt, CX + 9, 0, -12.6, -.5); actuar(brandt, L.lt, [[0, { ...LOOK, ...LAUGH(L.T) }]], { T: L.T }); laughF(brandt, L.T); holdPhone(0, brandt, 'lava');
  cm([CX + 2, 10.6, 4, CX + 3, 10.3, -15.6, 50], [CX + 2.6, 10.4, 1, CX + 3.4, 10.3, -15.6, 46], L.k); sh(V(CX, 0, -10), 25); }, [[0, 'chalk', .7], [.3, 'chalk', .6], [.8, 'kids_laugh', .4], [1.4, 'gasp', .3]]);


// ---------- transiciones, sonidos, render ----------
for (let i = 0; i < S.length; i++) S[i].t1 = i + 1 < S.length ? S[i + 1].t0 : DUR;
const TRW = { W: 4, Z: 4, F: 3, S: 4, R: 5, I: 6, C: 4 };
const CUES = [];
S.forEach((s, i) => { for (const [lt, n, g] of s.sfx) CUES.push({ t: +(s.t0 + lt).toFixed(3), s: n, g: g ?? 1 });
  if (s.zoom === 'slow') { CUES.push({ t: s.t0 + .05, s: 'riser', g: .9, d: +(s.t1 - s.t0 - .05).toFixed(3) }); CUES.push({ t: s.t1 - .02, s: 'braam', g: 1 }); } });
CUES.push({ t: 0, s: 'zoom_fast', g: .9 });
CUES.sort((a, b) => a.t - b.t);
const shotAt = T => { for (let i = 0; i < S.length; i++) if (T < S[i].t1) return i; return S.length - 1; };
let COVER = null;
function renderShot(i, T, tr, a) {
  const s = S[i], lt = T - s.t0, d = s.t1 - s.t0, L = { lt, k: clamp(lt / d), T, d, t0: s.t0, t1: s.t1 };
  hideAll(); BAD_.length = 0; s.fn(L);
  if (s.zoom === 'slow') { const e = easeIn(L.k); grade.uniforms.vig.value = lerp(grade.uniforms.vig.value, .8, e); camera.fov *= lerp(1, .86, e); }
  if (i === 0) { const k = clamp(T / .22); camera.fov *= lerp(.58, 1, easeOut(k)); }
  let sh_ = 0; for (const c of CUES) { if (c.t > T) break; if (['impact', 'braam', 'zoom_fast', 'slam', 'boom', 'thud'].includes(c.s) && T - c.t < .16) sh_ = 1 - (T - c.t) / .16; }
  if (sh_) { const r = RNG(Math.floor(T * FPS) + 1); camera.position.x += (r() - .5) * .25 * sh_; camera.position.y += (r() - .5) * .25 * sh_; }
  if (COVER != null) { COVER.cam(); grade.uniforms.sharp.value = 1.5; grade.uniforms.vig.value = .6; grade.uniforms.sat.value = 1.5; grade.uniforms.lift.value = .01; }
  else camaraEnMano(camera, T, 1); camera.updateProjectionMatrix();
  if (tr === 'W' || tr === 'S') { grade.uniforms.blurAmt.value = a * .07; grade.uniforms.dir.value.set(tr === 'W' ? 1 : 0, tr === 'W' ? 0 : 1); } else grade.uniforms.blurAmt.value = 0;
  if (tr === 'F') grade.uniforms.flash.value = Math.max(grade.uniforms.flash.value, a * .95);
  const dir = new THREE.Vector3(); camera.getWorldDirection(dir); const ctr = camera.position.clone().addScaledVector(dir, 14);
  FILL.position.copy(camera.position).add(V(0, 3, 0)).addScaledVector(dir, 2);
  AIR.update(T, ctr, MODE === 'night' ? 'noche' : 'polvo', MODE === 'in' ? .3 : .4); BIRDS.update(T, ctr, SETS.ST.visible && MODE === 'day', false);
  if (ST.G.visible) ST.FTN.userData.update?.(T);
  sun.castShadow = sun.intensity >= .45; sky.sky.position.copy(camera.position); composer.render();
}
function renderAt(T) {
  const i = shotAt(T), s = S[i]; let tr = null, a = 0, ph = 0; const fO = (s.t1 - T) * FPS, fI = (T - s.t0) * FPS;
  if (s.tr && fO < TRW[s.tr] && i + 1 < S.length) { tr = s.tr; a = 1 - fO / TRW[s.tr]; ph = -1; } else if (i > 0 && S[i - 1].tr && fI < TRW[S[i - 1].tr]) { tr = S[i - 1].tr; a = 1 - fI / TRW[S[i - 1].tr]; ph = 1; }
  renderShot(i, T, tr, a);
  octx.save(); octx.fillStyle = '#000'; octx.fillRect(0, 0, W, H); octx.translate(W / 2, H / 2); const a2 = a * a;
  if (tr === 'W') octx.translate(ph * a2 * W * .45, 0); if (tr === 'S') octx.translate(0, ph * a2 * H * .35);
  if (tr === 'Z') { const sc = ph < 0 ? 1 + a2 * .6 : 1 + a2 * .35; octx.scale(sc, sc); octx.filter = `blur(${(a * 8).toFixed(1)}px)`; }
  if (tr === 'R') { octx.rotate((ph < 0 ? 1 : -1) * a2 * .55); octx.scale(1 + a2 * .3, 1 + a2 * .3); octx.filter = `blur(${(a * 7).toFixed(1)}px)`; }
  if (tr === 'C' && ph > 0) { const sc = 1 + a * .22; octx.scale(sc, sc); }
  if (tr === 'I') { octx.beginPath(); octx.arc(0, 0, Math.max(1, (1 - a2) * H * .62), 0, 7); octx.clip(); }
  octx.drawImage(renderer.domElement, -W / 2, -H / 2, W, H);
  if (tr === 'W') octx.drawImage(renderer.domElement, -W / 2 - ph * W, -H / 2, W, H); if (tr === 'S') octx.drawImage(renderer.domElement, -W / 2, -H / 2 - ph * H, W, H);
  octx.restore(); octx.filter = 'none';
  if (TINT) { octx.fillStyle = TINT; octx.fillRect(0, 0, W, H); }
  if (DARK > 0) { octx.fillStyle = `rgba(0,0,0,${DARK})`; octx.fillRect(0, 0, W, H); }
  for (const b of BAD_) drawBadge(b); caption(T);
}
// portadas (sin spoilers)
function coverText(l1, l2, col) { const c = octx; c.save(); c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
  for (const [t, y, sz, f] of [[l1, H * .115, 132, '#ffffff'], [l2, H * .195, 112, col]]) { c.font = `700 ${sz}px ${FONT}`; const tw = c.measureText(t).width, k = Math.min(1, W * .92 / tw); c.save(); c.translate(W / 2, y); c.scale(k, k);
    c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 24; c.lineWidth = sz * .22; c.strokeStyle = '#000'; c.strokeText(t, 0, 0); c.shadowColor = 'transparent'; c.fillStyle = f; c.fillText(t, 0, 0); c.restore(); } c.restore(); }
const COVERS = window.COVERS || [];
window.renderCover = v => { const C = COVERS[v], s = S[C.i], T = s.t0 + (s.t1 - s.t0) * C.k; COVER = C; renderShot(C.i, T, null, 0); COVER = null;
  octx.fillStyle = '#000'; octx.fillRect(0, 0, W, H); octx.drawImage(renderer.domElement, 0, 0, W, H); coverText('IN DIESER STADT', C.l2, '#E2FD07'); };
window.renderAt = renderAt; window.DUR = DUR; window.FPS = FPS; window.CUES = CUES; window.SHOTS = S.map(s => [s.t0, s.t1, s.tr, s.zoom]); window.__ready = true;
window.DBG = { renderer, composer, bloom, sun, grade, scene, camera };
