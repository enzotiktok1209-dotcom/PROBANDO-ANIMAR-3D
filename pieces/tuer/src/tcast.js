// Tür — reparto propio y los Fellriesen.
// Narrador (12): piel morena, rizos negros cortos, impermeable rojo con capucha, vaqueros, botas de agua amarillas, mochila verde con parches.
// Mila (6): coletas pelirrojas con lazos azules, peto vaquero sobre camiseta de rayas rojas y blancas.
// Mama: delantal de flores, pañuelo verde. Herr Fuchs: chaleco de punto verde, gorra de cuadros, bastón. Su madre: gafas redondas, chal lila, moño gris.
// Fellriesen: pelo gris ceniza enmarañado con mechones de musgo, brazos larguísimos, flequillo que tapa los ojos, sonrisa enorme de dientes humanos planos.
import { THREE, mat, box, cyl, sphere, canvasTex, checkTex, character, CUSTOM_FACES, RNG } from './engine.js';
import { mk, hairS, glasses } from './props.js';
import { robloxify } from './roblox.js';

const knit = (a, b) => canvasTex(64, 64, (c, w, h) => { c.fillStyle = a; c.fillRect(0, 0, w, h); c.strokeStyle = b; c.lineWidth = 2; for (let x = 0; x < w; x += 8) for (let y = 0; y < h; y += 8) { c.beginPath(); c.moveTo(x, y); c.lineTo(x + 4, y + 6); c.lineTo(x + 8, y); c.stroke(); } }, true);
const stripesT = (a, b) => canvasTex(64, 64, (c, w, h) => { c.fillStyle = a; c.fillRect(0, 0, w, h); c.fillStyle = b; for (let y = 0; y < h; y += 12) c.fillRect(0, y, w, 6); }, true);
const floral = canvasTex(64, 64, (c, w, h) => { c.fillStyle = '#f4e8d0'; c.fillRect(0, 0, w, h); const r = RNG(3); for (let i = 0; i < 14; i++) { const x = r() * w, y = r() * h; c.fillStyle = ['#e8607a', '#f2c23a', '#7ab8e8'][i % 3]; for (let k = 0; k < 5; k++) { c.beginPath(); c.arc(x + Math.cos(k * 1.256) * 3, y + Math.sin(k * 1.256) * 3, 2.4, 0, 7); c.fill(); } } }, true);
function curlsShort(col) { return (h) => { const m = mat(col, { roughness: .7 }); const c = new THREE.Mesh(new THREE.SphereGeometry(.72, 24, 12, 0, 6.283, 0, 1.3), m); c.position.y = 1.0; c.scale.set(1.03, .62, 1.03); h.add(c); const r = RNG(21);
  for (let i = 0; i < 26; i++) { const a = r() * 6.283, y = 1.05 + r() * .35, rr = .5 + r() * .18; if (Math.sin(a) > .6 && y < 1.15) continue; sphere(.17 + r() * .06, m, h, Math.cos(a) * rr, y, Math.sin(a) * rr, 8, 6); } }; }
function pigtails(col, bow) { return (h) => { const m = mat(col, { roughness: .5 }); const c = new THREE.Mesh(new THREE.SphereGeometry(.72, 24, 12, 0, 6.283, 0, 1.3), m); c.position.y = 1.0; c.scale.set(1.03, .64, 1.03); h.add(c);
  box(1.36, .3, .28, m, .12, h, 0, 1.1, .5); for (const s of [-1, 1]) { const t = new THREE.Group(); t.position.set(s * .8, .95, -.1); h.add(t); sphere(.3, m, t, s * .2, -.2, 0, 12, 10); const tail = cyl(.2, .1, .9, m, 10, t, s * .3, -.7, 0); tail.rotation.z = s * .3; const b = box(.5, .25, .15, mat(bow), .08, t, 0, .05, .05); } }; }
function hood(col) { return o => { const m = mat(col, { roughness: .4 }); const hd = box(1.6, .9, .7, m, .3, o.spine, 0, 2.05, -.62); hd.rotation.x = .35; }; }
function raincoat(sp) { const m = mat(0xd8283a, { roughness: .35, metalness: .05 }); box(2.12, 2.1, 1.14, m, .14, sp, 0, 1.0, 0); for (let i = 0; i < 4; i++) box(.2, .14, .06, mat(0xf2c23a), .03, sp, .32, .4 + i * .44, .6); for (const s of [-1, 1]) box(.6, .45, .08, mat(0xb81e2e), .05, sp, s * .55, .45, .6); box(.06, 1.9, .05, mat(0x8a1420), 0, sp, 0, 1.0, .59); }
function backpackG(o) { const g = new THREE.Group(); g.position.set(0, 1.0, -.78); o.spine.add(g); const m = mat(0x2f8a4a, { roughness: .8 }); box(1.7, 1.9, .75, m, .28, g, 0, 0, 0); box(1.4, .7, .25, m, .12, g, 0, -.35, -.45); box(1.72, .5, .78, mat(0x1f6a3a), .14, g, 0, .8, 0);
  for (const [x, y, c] of [[-.4, -.2, 0xf2c23a], [.45, .3, 0x2a6ad8], [.3, -.5, 0xff7a2a]]) box(.4, .4, .06, mat(c), .08, g, x, y, -.4); for (const s of [-1, 1]) { box(.24, 1.9, .08, mat(0x1f4a2a), .03, o.spine, s * .55, 1.05, .6); box(.3, .7, .3, mat(0x1f4a2a), .1, g, s * .9, .2, .2); } o.props.pack = g; }
export function makeKid(scene) {
  return mk(scene, { seed: 601, scale: .84, skin: 0x8d5a3b, skinCss: '#8d5a3b', shirt: 0xd8283a, shirt2: 0xd8283a, cuffs: 0xb81e2e, pants: 0x3a5a8e, shoes: 0xf2c23a, sole: 0x3a3a3a, socks: 0xf2c23a, hair: 0x141414, hairBuild: curlsShort(0x141414), noBelt: true, torsoDetail: raincoat,
    face: { iris: '#3a2210', browColor: '#141414', blush: .15 } }, [hood(0xd8283a), backpackG, o => { for (const lg of [o.lL, o.lR]) { box(1.0, .9, 1.02, mat(0xf2c23a, { roughness: .3 }), .1, lg.kn, 0, -.5, 0); } }]);
}
export function makeMila(scene) {
  return mk(scene, { seed: 602, scale: .62, headScale: 1.08, skin: 0x8d5a3b, skinCss: '#8d5a3b', shirtMap: stripesT('#f4f4f4', '#d8323a'), shirt2: null, cuffs: 0xf4f4f4, pants: 0x4a78b8, shoes: 0x8d5a3b, sole: 0x7a4a2e, hair: 0xd8642a, hairBuild: pigtails(0xd8642a, 0x2a7ad8), noBelt: true,
    torsoDetail: sp => { const d = mat(0x4a78b8, { roughness: .8 }); box(1.6, 1.2, 1.12, d, .1, sp, 0, .55, 0); for (const s of [-1, 1]) { box(.24, 1.2, .06, d, .02, sp, s * .5, 1.5, .58); sphere(.08, mat(0xf2c23a, { metalness: .7 }), sp, s * .5, 1.95, .62, 8, 6); } box(.6, .4, .05, d, .03, sp, 0, .9, .58); },
    face: { iris: '#3a2210', browColor: '#a8481a', freckles: 1, blush: .5 } });
}
export function makeMom(scene) {
  return mk(scene, { seed: 603, skin: 0xa86a42, skinCss: '#a86a42', shirt: 0x6a8ab8, shirt2: 0x6a8ab8, pants: 0x4a3a5a, skirt: 0x4a3a5a, apron: 0xf4e8d0, shoes: 0x3a2a1a, hair: 0x1a1210, hairBuild: hairS(0x1a1210, 'bun'),
    face: { iris: '#2a1608', browColor: '#1a1210', blush: .2 } }, [o => { const m = mat(0x2f8a5a, { roughness: .8 }); const c = new THREE.Mesh(new THREE.SphereGeometry(.76, 24, 12, 0, 6.283, 0, 1.25), m); c.position.y = 1.02; c.scale.set(1.04, .7, 1.06); o.head.add(c); box(.5, .4, .2, m, .1, o.head, .4, .7, -.7); },
    o => { const a = box(1.5, 1.6, .08, new THREE.MeshStandardMaterial({ map: floral }), .04, o.spine, 0, .9, .6); }]);
}
export function makeFuchs(scene) {
  return mk(scene, { seed: 604, scale: 1.0, skin: 0xf2c8a8, skinCss: '#f2c8a8', shirt: 0xf4f0e6, shirt2: 0xf4f0e6, pants: 0x5a4a3a, shoes: 0x3a2a1a, hair: 0xd8d8d8, hairBuild: hairS(0xd8d8d8, 'bald'),
    torsoDetail: sp => { const v = mat(0xffffff, { map: knit('#3a7a4a', 'rgba(0,0,0,.18)') }); for (const s of [-1, 1]) box(.72, 1.8, 1.12, v, .1, sp, s * .66, .95, 0); box(2.06, 1.8, .5, v, .1, sp, 0, .95, -.32); for (let i = 0; i < 4; i++) sphere(.07, mat(0x5a3a1a), sp, .32, .35 + i * .35, .6, 8, 6); },
    face: { iris: '#4a6a8a', browColor: '#d8d8d8', bags: .5 } }, [o => { const m = mat(0xffffff, { map: checkTex('#8a6a4a', '#5a4430', 6) }); box(1.5, .36, 1.42, m, .18, o.head, 0, 1.28, -.02); const pk = box(1.3, .12, .6, m, .06, o.head, 0, 1.12, .84); pk.rotation.x = .18; for (const s of [-1, 1]) box(.3, .35, .3, mat(0xd8d8d8), .1, o.head, s * .68, .8, -.1); },
    o => { const c = cyl(.08, .08, 3.6, mat(0x5a3a1e), 8, o.aR.hand, 0, -1.6, .2); const h = new THREE.Mesh(new THREE.TorusGeometry(.3, .08, 6, 12, Math.PI), mat(0x5a3a1e)); h.position.set(.3, .1, .2); o.aR.hand.add(h); o.props.cane = c; }]);
}
export function makeOma(scene) {
  return mk(scene, { seed: 605, scale: .92, skin: 0xf2d0b8, skinCss: '#f2d0b8', shirt: 0xb898d8, shirt2: 0xb898d8, pants: 0x5a4a6a, skirt: 0x5a4a6a, shoes: 0x3a2a3a, hair: 0xc8c8cc, hairBuild: hairS(0xc8c8cc, 'bun'),
    face: { iris: '#5a7a9a', browColor: '#c8c8cc', blush: .3 } }, [o => glasses(o.head), o => { const s = box(2.3, .8, 1.3, mat(0x9a6ac8, { roughness: 1, map: knit('#9a6ac8', 'rgba(0,0,0,.2)') }), .3, o.spine, 0, 1.8, 0); }]);
}
// ---------- Fellriesen ----------
const furTex = (a, b, c2) => canvasTex(128, 128, (c, w, h) => { c.fillStyle = a; c.fillRect(0, 0, w, h); const r = RNG(a.length + 7); for (let i = 0; i < 700; i++) { c.strokeStyle = [b, c2, 'rgba(0,0,0,.25)'][i % 3]; c.lineWidth = 1 + r() * 2; const x = r() * w, y = r() * h; c.beginPath(); c.moveTo(x, y); c.lineTo(x + (r() - .5) * 6, y + 6 + r() * 10); c.stroke(); } }, true);
CUSTOM_FACES.beast = (c, s) => { const fur = s.fur || '#8a8a86'; c.fillStyle = fur; c.fillRect(0, 0, 512, 512); const r = RNG(5); for (let i = 0; i < 500; i++) { c.strokeStyle = i % 2 ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.2)'; c.lineWidth = 3; const x = r() * 512, y = r() * 300; c.beginPath(); c.moveTo(x, y); c.lineTo(x + (r() - .5) * 10, y + 24); c.stroke(); }
  const open = s.open || 0, y0 = 330; c.fillStyle = '#3a1418'; c.beginPath(); c.moveTo(40, y0 - 40); c.quadraticCurveTo(256, y0 + 30, 472, y0 - 40); c.quadraticCurveTo(256, y0 + 150 + open * 80, 40, y0 - 40); c.fill();
  c.save(); c.clip(); const tooth = (x, y, w, h) => { c.fillStyle = '#e8dcb8'; c.beginPath(); c.roundRect(x, y, w, h, 6); c.fill(); c.strokeStyle = '#8a7a58'; c.lineWidth = 3; c.stroke(); };
  for (let i = 0; i < 14; i++) { const x = 52 + i * 29.5; const top = y0 - 40 + Math.pow((x - 256) / 216, 2) * 0 + 70 * (1 - Math.pow((x - 256) / 216, 2)) * .9; tooth(x, top - 34, 27, 44); tooth(x + 4, top + 22 + open * 50 + 30 * (1 - Math.pow((x - 256) / 216, 2)), 25, 40); } c.restore();
  c.strokeStyle = '#2a1012'; c.lineWidth = 8; c.beginPath(); c.moveTo(40, y0 - 40); c.quadraticCurveTo(256, y0 + 30, 472, y0 - 40); c.stroke(); };
const BEAST_FUR = [['#8a8a86', 0x8a8a86, '#a8a8a2', '#5a6a4a'], ['#7a7670', 0x7a7670, '#9a958e', '#4a5a3a'], ['#96928a', 0x96928a, '#b4b0a8', '#62704e']];
export function makeBeast(scene, i = 0, sc = 3.4) { const [css, hex, light, moss] = BEAST_FUR[i % 3]; const ft = furTex(css, light, moss); const fm = mat(0xffffff, { map: ft, roughness: 1 });
  const o = robloxify(character(scene, { seed: 700 + i, scale: sc * (.92 + (i % 3) * .06), headScale: 1.25, skin: hex, skinCss: css, shirtMap: ft, shirt2: null, pants: hex, shoes: 0x3a3632, sole: 0x2a2622, noBelt: true, face: { custom: 'beast', fur: css }, hairBuild: () => {} }), { hs: 1.25 });
  const m2 = mat(hex, { roughness: 1 }), mm = mat(0x5a6a4a, { roughness: 1 }), r = RNG(40 + i);
  // flequillo largo que tapa los ojos
  const fr = new THREE.Group(); fr.position.set(0, 1.35, .3); o.head.add(fr); for (let k = 0; k < 13; k++) { const cn = new THREE.Mesh(new THREE.ConeGeometry(.16, .8 + r() * .3, 5), k % 4 ? m2 : mm); cn.position.set(-.72 + k * .12, -.02, .55); cn.rotation.x = Math.PI + .25; o.head && fr.add(cn); }
  const capF = new THREE.Mesh(new THREE.SphereGeometry(.88, 20, 12, 0, 6.283, 0, 1.4), fm); capF.position.y = 1.15; capF.scale.set(1.0, .7, 1.0); o.head.add(capF);
  // mechones por el cuerpo y los brazos
  const tuft = (parent, x, y, z, s = .3, rx = 0) => { const cn = new THREE.Mesh(new THREE.ConeGeometry(s, s * 3, 5), r() > .8 ? mm : m2); cn.position.set(x, y, z); cn.rotation.set(Math.PI + rx, 0, (r() - .5) * .6); parent.add(cn); };
  for (let k = 0; k < 26; k++) tuft(o.spine, (r() - .5) * 2.1, .2 + r() * 1.9, (r() > .5 ? .56 : -.56), .22 + r() * .12, (r() - .5) * .4);
  for (const a of [o.aL, o.aR]) { for (let k = 0; k < 6; k++) tuft(a.sh, (r() - .5) * .9, -.2 - r() * 1, (r() - .5) * .9, .2); for (let k = 0; k < 5; k++) tuft(a.el, (r() - .5) * .8, -.1 - r() * .7, (r() - .5) * .8, .18); a.sh.scale.y = 1.55; a.hand.scale.set(1.3, 1.1, 1.3); }
  for (const s of [-1, 1]) for (let k = 0; k < 4; k++) tuft(o.spine, s * 1.0, 1.9 + k * .02, (k - 1.5) * .3, .3, .3);
  o.root.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); o.isBeast = true; return o; }
