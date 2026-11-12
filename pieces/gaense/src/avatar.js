// Foto de perfil del canal «In dieser Stadt» (1080×1080, pensada para el recorte en círculo de TikTok):
// el narrador saludando (sin elementos de un vídeo concreto), delante de los tejados de un pueblo, fondo de rayos y el nombre en arco.
import { THREE, applyPose, V } from './engine.js';
import { FONT } from './props.js';
import { makeIch } from './gvolk.js';
import { loadKitFaces, kitFace } from './vivo.js';
await document.fonts.load('700 40px Cap'); await loadKitFaces();
const S = 1080, stage = document.getElementById('stage');
const R = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true }); R.setPixelRatio(1); R.setSize(S, S); R.toneMapping = THREE.NeutralToneMapping; R.toneMappingExposure = 1.08; R.setClearColor(0, 0);
const sc = new THREE.Scene(); sc.add(new THREE.HemisphereLight(0xffffff, 0x8a7a6a, 1.6)); const key = new THREE.DirectionalLight(0xfff2e0, 2.6); key.position.set(-6, 10, 12); sc.add(key); const rim = new THREE.DirectionalLight(0x9fd8ff, 2.2); rim.position.set(8, 6, -8); sc.add(rim);
const cam = new THREE.PerspectiveCamera(30, 1, .1, 200);
const ich = makeIch(sc); kitFace(ich, 'hero'); ich.root.rotation.y = -.12; applyPose(ich, { aRx: 2.7, aRz: .45, aRe: .45, headZ: .08, headY: .1, lean: -.04 }); ich.setFace({ expr: 'happy', eyes: 'happy', mouth: 'open_smile' });
cam.position.set(.6, 6.2, 17.5); cam.lookAt(.6, 4.4, 0); R.render(sc, cam);
const out = document.createElement('canvas'); out.width = out.height = S; stage.appendChild(out); const c = out.getContext('2d');
// fondo: degradado radial + rayos
const gr = c.createRadialGradient(S / 2, S * .45, 40, S / 2, S / 2, S * .72); gr.addColorStop(0, '#fff7a0'); gr.addColorStop(.45, '#E2FD07'); gr.addColorStop(1, '#ff9a1a'); c.fillStyle = gr; c.fillRect(0, 0, S, S);
c.save(); c.translate(S / 2, S * .45); for (let i = 0; i < 24; i++) { c.rotate(Math.PI * 2 / 24); c.fillStyle = i % 2 ? 'rgba(255,255,255,.22)' : 'rgba(255,170,0,.12)'; c.beginPath(); c.moveTo(0, 0); c.lineTo(-90, -900); c.lineTo(90, -900); c.closePath(); c.fill(); } c.restore();
// tejados del pueblo detrás (siluetas de casas de colores con ventanas)
[[60, 640, 150, 230, '#f2b8c6'], [200, 600, 130, 270, '#a8d8f0'], [320, 660, 140, 210, '#b9e3b0'], [760, 650, 130, 220, '#d4b8f2'], [880, 600, 150, 270, '#f4c09a'], [1000, 660, 120, 210, '#9fd0c8']].forEach(([x, y, w, h, col]) => {
  c.fillStyle = col; c.strokeStyle = '#1d2238'; c.lineWidth = 8; c.beginPath(); c.moveTo(x - w / 2, y + h); c.lineTo(x - w / 2, y); c.lineTo(x, y - w * .45); c.lineTo(x + w / 2, y); c.lineTo(x + w / 2, y + h); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#b8483a'; c.beginPath(); c.moveTo(x - w / 2 - 10, y + 4); c.lineTo(x, y - w * .45 - 8); c.lineTo(x + w / 2 + 10, y + 4); c.lineTo(x + w / 2 - 6, y + 20); c.lineTo(x, y - w * .45 + 12); c.lineTo(x - w / 2 + 6, y + 20); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#fff2b0'; for (const dx of [-w * .22, w * .22]) for (const dy of [h * .25, h * .6]) { c.fillRect(x + dx - 16, y + dy, 32, 40); c.strokeRect(x + dx - 16, y + dy, 32, 40); } });
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
