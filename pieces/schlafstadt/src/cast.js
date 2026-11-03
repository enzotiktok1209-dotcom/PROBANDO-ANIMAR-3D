// Reparto: Finn (11), Opa (el relojero), Herr Wachter (el del café) y vecinos con ojeras.
import { THREE, character, box, mat, cyl, sphere, RNG } from './engine.js';

const brass = () => mat(0xd9a531, { metalness: .75, roughness: .28 });

// pelo de Finn: mechones en bloque desordenados
function finnHair(head, m, hs) {
  box(1.42, 0.4, 1.32, m, 0.15, head, 0, 1.2, -0.02);
  box(1.42, 0.85, 0.34, m, 0.12, head, 0, 0.95, -0.52);
  const tufts = [[-0.45, 1.48, 0.25, 0.4, 0.3], [0.05, 1.55, 0.35, 0.5, -0.2], [0.45, 1.46, 0.2, 0.35, 0.5], [-0.15, 1.5, -0.3, 0.45, -0.4], [0.35, 1.47, -0.35, 0.4, 0.3], [-0.55, 1.2, 0.55, 0.3, 0.6]];
  for (const [x, y, z, s, r] of tufts) { const t = box(s, s * 0.8, s, m, 0.08, head, x, y, z); t.rotation.set(r * 0.5, r, r * 0.6); }
  box(1.1, 0.26, 0.2, m, 0.08, head, -0.1, 1.08, 0.6).rotation.z = 0.12;   // flequillo
  // lupa de relojero del abuelo en la frente (cinta + lente)
  box(1.46, 0.14, 1.36, mat(0x3b2a20), 0.05, head, 0, 1.02, 0);
  const loupe = cyl(0.22, 0.26, 0.28, brass(), 20, head, 0.36, 1.1, 0.68); loupe.rotation.x = Math.PI / 2;
  const glass = cyl(0.17, 0.17, 0.05, new THREE.MeshStandardMaterial({ color: 0x9fe3ff, roughness: .05, metalness: .2, emissive: 0x2a6f8f, emissiveIntensity: .4 }), 20, head, 0.36, 1.1, 0.83); glass.rotation.x = Math.PI / 2;
}
function finnTorso(sp, k) {
  const { box, mat } = k;
  // sudadera amarilla con capucha, bolsillo canguro, cordones, cremallera
  box(1.5, 0.55, 0.5, mat(0xf2ae22), 0.2, sp, 0, 2.0, -0.55);           // capucha caída
  box(1.2, 0.5, 0.08, mat(0xf2ae22), 0.06, sp, 0, 0.6, 0.55);            // bolsillo
  for (const s of [-1, 1]) box(0.07, 0.6, 0.06, mat(0xffffff), 0.02, sp, s * 0.22, 1.6, 0.56);
  box(0.42, 0.18, 0.06, mat(0xd8333f), 0.03, sp, 0, 1.95, 0.53);        // bufanda roja (nudo)
  box(2.08, 0.32, 1.12, mat(0xd8333f), 0.12, sp, 0, 2.0, 0);            // bufanda
  const tail = box(0.34, 0.8, 0.08, mat(0xd8333f), 0.04, sp, 0.42, 1.55, 0.6); tail.rotation.z = 0.12;
  box(0.24, 0.08, 0.02, mat(0x5a3a22), 0.01, sp, -0.55, 1.4, 0.54);     // parche cosido
}
export function makeFinn(scene) {
  return character(scene, {
    scale: 0.82, headScale: 1.08, skin: 0xf7d2b6, skinCss: '#f7d2b6', shirt: 0xffc23a, shirt2: 0xffc23a, cuffs: 0xe8a316,
    pants: 0x3f5fae, shoes: 0xff5a4d, sole: 0xffffff, belt: 0x3f5fae, hair: 0x6b3b1e,
    face: { iris: '#4f86c6', freckles: 1, bags: 0.25, browColor: '#5a2f16' },
    hairBuild: finnHair, torsoDetail: finnTorso,
  });
}

function opaHair(head, m, hs) {
  // calvo arriba, pelo blanco a los lados, gafas redondas, bigote blanco
  for (const s of [-1, 1]) { box(0.3, 0.55, 1.0, m, 0.12, head, s * 0.66, 0.85, -0.12); box(0.25, 0.25, 0.25, m, 0.08, head, s * 0.72, 1.1, 0.1); }
  box(1.36, 0.5, 0.3, m, 0.12, head, 0, 0.8, -0.5);
  const fr = mat(0x8a6a2a, { metalness: .7, roughness: .3 });
  for (const s of [-1, 1]) { const g = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 8, 24), fr); g.position.set(s * 0.29, 0.86, 0.64); head.add(g);
    const l = new THREE.Mesh(new THREE.CircleGeometry(0.19, 24), new THREE.MeshStandardMaterial({ color: 0xdff4ff, transparent: true, opacity: .25, roughness: .05 })); l.position.set(s * 0.29, 0.86, 0.645); head.add(l); }
  box(0.2, 0.04, 0.04, fr, 0, head, 0, 0.88, 0.64);
  const mo = box(0.7, 0.18, 0.12, m, 0.06, head, 0, 0.42, 0.64);
  // gorro de dormir (para el Schlafgarten) se añade aparte
}
function opaTorso(sp, k) {
  const { box, mat } = k;
  box(2.06, 1.7, 1.1, mat(0x7a4a2a, { roughness: .8 }), 0.1, sp, 0, 1.1, 0.0);   // chaleco marrón
  box(0.5, 1.7, 0.06, mat(0xf6f1e6), 0.03, sp, 0, 1.1, 0.56);                     // camisa visible
  for (let i = 0; i < 3; i++) box(0.1, 0.1, 0.05, mat(0xd9a531, { metalness: .8, roughness: .3 }), 0.03, sp, 0.32, 0.6 + i * 0.4, 0.57);
  box(0.5, 0.2, 0.1, mat(0x2f5b8f), 0.05, sp, 0, 1.95, 0.56);                   // pajarita
  const chain = box(0.7, 0.05, 0.05, mat(0xd9a531, { metalness: .8, roughness: .3 }), 0.02, sp, -0.45, 0.85, 0.58); chain.rotation.z = -0.4;
}
export function makeOpa(scene, nightcap = false) {
  const o = character(scene, {
    scale: 0.96, skin: 0xf1c8a8, skinCss: '#f1c8a8', shirt: 0xf6f1e6, shirt2: 0xf6f1e6, pants: 0x5b4a3a, shoes: 0x4a3020, sole: 0x2a1a10, hair: 0xf2f2f2,
    face: { iris: '#6b8fae', browColor: '#e8e8e8', eyes: 'closed', mouth: 'smile', bags: 0 }, hairBuild: opaHair, torsoDetail: opaTorso,
  });
  if (nightcap) {
    const capM = mat(0x5b7fd6, { roughness: .8 });
    const c = new THREE.Mesh(new THREE.ConeGeometry(0.78, 1.8, 24), capM); c.position.set(0.25, 1.75, -0.1); c.rotation.z = -0.7; c.castShadow = true; o.head.add(c);
    box(1.48, 0.3, 1.38, mat(0xffffff), 0.14, o.head, 0, 1.3, 0);
    sphere(0.25, mat(0xffffff), o.head, 1.0, 1.85, -0.1);
  }
  return o;
}

function wachterHair(head, m, hs) {
  // pelo negro engominado con raya, brillo
  const shine = mat(0x141018, { roughness: .2, metalness: .1 });
  box(1.42, 0.36, 1.32, shine, 0.14, head, 0, 1.22, -0.02);
  box(1.42, 0.8, 0.3, shine, 0.1, head, 0, 0.95, -0.52);
  const swoop = box(0.9, 0.3, 1.1, shine, 0.14, head, 0.22, 1.42, 0.02); swoop.rotation.z = -0.18;
}
// el bigote torcido = las agujas del reloj del ayuntamiento (una larga, una corta)
function addMoustache(o) {
  const m = mat(0x141018, { roughness: .25, metalness: .4 });
  const g = new THREE.Group(); g.position.set(0, 0.42, 0.66); o.head.add(g);
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.08, 16), mat(0xd9a531, { metalness: .8, roughness: .25 })); hub.rotation.x = Math.PI / 2; g.add(hub);
  const longH = new THREE.Group(); g.add(longH); const lh = box(0.85, 0.11, 0.06, m, 0.03, longH, 0.42, 0, 0); box(0.16, 0.16, 0.06, m, 0.04, longH, 0.82, 0, 0).rotation.z = Math.PI / 4;
  const shortH = new THREE.Group(); g.add(shortH); box(0.48, 0.14, 0.06, m, 0.03, shortH, -0.24, 0, 0); box(0.18, 0.18, 0.06, m, 0.04, shortH, -0.46, 0, 0).rotation.z = Math.PI / 4;
  longH.rotation.z = 0.22; shortH.rotation.z = -0.12;
  o.props.moustache = { g, longH, shortH };
}
function wachterTorso(sp, k) {
  const { box, mat } = k;
  box(2.08, 1.8, 1.12, mat(0x7a1830, { roughness: .6 }), 0.1, sp, 0, 1.08, 0);   // chaleco burdeos
  // rayas finas del chaleco
  for (let i = -3; i <= 3; i++) box(0.04, 1.78, 0.02, mat(0x9c2a46), 0, sp, i * 0.26, 1.08, 0.57);
  box(0.46, 1.8, 0.06, mat(0xffffff), 0.02, sp, 0, 1.12, 0.57);
  box(0.56, 0.22, 0.1, mat(0x111111), 0.06, sp, 0, 1.95, 0.6);                 // pajarita negra
  for (let i = 0; i < 4; i++) box(0.09, 0.09, 0.05, mat(0xd9a531, { metalness: .8, roughness: .3 }), 0.03, sp, 0.3, 0.45 + i * 0.36, 0.6);
  // delantal de barista
  box(1.7, 1.3, 0.06, mat(0x2a2422, { roughness: .9 }), 0.03, sp, 0, -0.2, 0.6);
  // pin con una taza
  box(0.26, 0.22, 0.04, mat(0xd9a531, { metalness: .8, roughness: .3 }), 0.03, sp, -0.6, 1.55, 0.6);
}
export function makeWachter(scene) {
  const o = character(scene, {
    scale: 1.12, skin: 0xefc7a4, skinCss: '#efc7a4', shirt: 0xffffff, shirt2: 0xffffff, cuffs: 0xffffff, pants: 0x1d1a22, shoes: 0x111111, sole: 0x050505, hair: 0x141018,
    face: { iris: '#3b2a1a', eyes: 'wide', brows: 0.6, browColor: '#141018', mouth: 'smirk', bags: 0 }, hairBuild: wachterHair, torsoDetail: wachterTorso,
  });
  addMoustache(o);
  return o;
}

// taza de café (con plato y vapor opcional)
export function coffeeCup(parent, x = 0, y = 0, z = 0, s = 1) {
  const g = new THREE.Group(); g.position.set(x, y, z); g.scale.setScalar(s); parent.add(g);
  const white = mat(0xffffff, { roughness: .25 });
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.26, 0.45, 24, 1, true), white); cup.position.y = 0.25; g.add(cup);
  const bot = new THREE.Mesh(new THREE.CircleGeometry(0.26, 24), white); bot.rotation.x = -Math.PI / 2; bot.position.y = 0.03; g.add(bot);
  const cof = new THREE.Mesh(new THREE.CircleGeometry(0.31, 24), mat(0x3b2112, { roughness: .2 })); cof.rotation.x = -Math.PI / 2; cof.position.y = 0.4; g.add(cof);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.04, 8, 16, Math.PI * 1.4), white); handle.position.set(0.36, 0.25, 0); handle.rotation.z = -Math.PI * 0.7; g.add(handle);
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.45, 0.05, 28), white); g.add(plate);
  g.traverse(o => { if (o.isMesh) o.castShadow = true; });
  return g;
}

// vecinos cansados (ojeras hasta la barbilla)
const TOWN = [
  { shirt: 0x6f8fd8, pants: 0x2d3550, hair: 0x2a1a10 }, { shirt: 0xd86f9f, pants: 0x3a2a40, hair: 0xd9a531, skin: 0xd8a27a, skinCss: '#d8a27a' },
  { shirt: 0x5fb38a, pants: 0x24304a, hair: 0x101010, skin: 0x8d5a3b, skinCss: '#8d5a3b' }, { shirt: 0xb58cf0, pants: 0x30304a, hair: 0x7a3a1a },
  { shirt: 0xf08a4b, pants: 0x34405a, hair: 0x3a2a1a }, { shirt: 0x4fb6c9, pants: 0x403040, hair: 0xe8e0d0, skin: 0xc68b5e, skinCss: '#c68b5e' },
];
export function makeTownsperson(scene, i, extra = {}) {
  const t = TOWN[i % TOWN.length];
  return character(scene, { skin: 0xf3cbb0, skinCss: '#f3cbb0', ...t, shirt2: t.shirt, shoes: 0x3a3a46, sole: 0x111111,
    face: { eyes: 'half', bags: 1, mouth: 'flat', brows: -0.3, iris: '#4a3a2a' }, ...extra });
}
