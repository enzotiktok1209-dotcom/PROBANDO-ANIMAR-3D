// Foto de perfil del canal «In dieser Stadt» (1080×1080, pensada para el recorte en círculo de TikTok):
// el protagonista saludando, con un ganso asomado, sobre un fondo de rayos amarillo-naranja y el nombre en arco.
import { THREE, applyPose, V } from './engine.js';
import { FONT } from './props.js';
import { makeIch } from './gvolk.js';
import { makeGoose, poseGoose } from './gans.js';
import { loadKitFaces, kitFace } from './vivo.js';
await document.fonts.load('700 40px Cap'); await loadKitFaces();
const S = 1080, stage = document.getElementById('stage');
const R = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true }); R.setPixelRatio(1); R.setSize(S, S); R.toneMapping = THREE.NeutralToneMapping; R.toneMappingExposure = 1.08; R.setClearColor(0, 0);
const sc = new THREE.Scene(); sc.add(new THREE.HemisphereLight(0xffffff, 0x8a7a6a, 1.6)); const key = new THREE.DirectionalLight(0xfff2e0, 2.6); key.position.set(-6, 10, 12); sc.add(key); const rim = new THREE.DirectionalLight(0x9fd8ff, 2.2); rim.position.set(8, 6, -8); sc.add(rim);
const cam = new THREE.PerspectiveCamera(30, 1, .1, 200);
const ich = makeIch(sc); kitFace(ich, 'hero'); ich.root.rotation.y = -.22; applyPose(ich, { aRx: 2.7, aRz: .45, aRe: .45, headZ: .08, headY: .1, lean: -.04 }); ich.setFace({ expr: 'happy', eyes: 'happy', mouth: 'open_smile' });
const g = makeGoose(sc, 0, { seed: 3, bow: 0xd8323a }); g.root.position.set(-3.3, 2.5, 1.6); g.root.rotation.y = .5; g.root.scale.setScalar(1.15); poseGoose(g, 1.2, { neck: 1, pitch: -.1, yaw: .5, eyes: 'happy', honk: .5 });
cam.position.set(-.8, 6.4, 19); cam.lookAt(-.8, 4.6, 0); R.render(sc, cam);
const out = document.createElement('canvas'); out.width = out.height = S; stage.appendChild(out); const c = out.getContext('2d');
// fondo: degradado radial + rayos
const gr = c.createRadialGradient(S / 2, S * .45, 40, S / 2, S / 2, S * .72); gr.addColorStop(0, '#fff7a0'); gr.addColorStop(.45, '#E2FD07'); gr.addColorStop(1, '#ff9a1a'); c.fillStyle = gr; c.fillRect(0, 0, S, S);
c.save(); c.translate(S / 2, S * .45); for (let i = 0; i < 24; i++) { c.rotate(Math.PI * 2 / 24); c.fillStyle = i % 2 ? 'rgba(255,255,255,.22)' : 'rgba(255,170,0,.12)'; c.beginPath(); c.moveTo(0, 0); c.lineTo(-90, -900); c.lineTo(90, -900); c.closePath(); c.fill(); } c.restore();
// personaje con contorno blanco (pegatina)
const tmp = document.createElement('canvas'); tmp.width = tmp.height = S; const t = tmp.getContext('2d'); t.drawImage(R.domElement, 0, 0);
c.save(); c.shadowColor = 'rgba(0,0,0,.35)'; c.shadowBlur = 30; c.shadowOffsetY = 14; for (let a = 0; a < 16; a++) c.drawImage(tmp, Math.cos(a / 16 * 6.283) * 12, Math.sin(a / 16 * 6.283) * 12); c.restore();
c.globalCompositeOperation = 'source-atop'; c.globalCompositeOperation = 'source-over';
const white = document.createElement('canvas'); white.width = white.height = S; const w = white.getContext('2d'); for (let a = 0; a < 16; a++) w.drawImage(tmp, Math.cos(a / 16 * 6.283) * 12, Math.sin(a / 16 * 6.283) * 12); w.globalCompositeOperation = 'source-in'; w.fillStyle = '#ffffff'; w.fillRect(0, 0, S, S);
c.drawImage(white, 0, 0); c.drawImage(tmp, 0, 0);
// nombre del canal en arco abajo, dentro del círculo
function arc(text, r, size) { c.save(); c.translate(S / 2, S / 2); c.font = `700 ${size}px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
  const gap = 6, ws = [...text].map(ch => c.measureText(ch).width), total = ws.reduce((x, y) => x + y, 0) + gap * (text.length - 1); let th = Math.PI / 2 + total / 2 / r;
  [...text].forEach((ch, i) => { th -= ws[i] / 2 / r; c.save(); c.translate(Math.cos(th) * r, Math.sin(th) * r); c.rotate(th - Math.PI / 2); c.lineWidth = size * .26; c.strokeStyle = '#000'; c.strokeText(ch, 0, 0); c.fillStyle = '#ffffff'; c.fillText(ch, 0, 0); c.restore(); th -= (ws[i] / 2 + gap) / r; }); c.restore(); }
// banda oscura curva para que el texto se lea
c.save(); c.beginPath(); c.arc(S / 2, S / 2, 520, .16 * Math.PI, .84 * Math.PI); c.arc(S / 2, S / 2, 400, .84 * Math.PI, .16 * Math.PI, true); c.closePath(); c.fillStyle = 'rgba(20,24,48,.88)'; c.fill(); c.restore();
arc('IN DIESER STADT', 458, 80);
window.__ready = true;
