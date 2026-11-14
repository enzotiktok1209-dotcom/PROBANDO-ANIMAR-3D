// =====================================================================
//  props14.js — the frueher piece: a streaming camera, a podcast mic, a download bar, the ad contract,
//  a villa with pool, a sun lounger, a subscription alert, a viewer icon, an RGB streaming room
// =====================================================================
function streamCam(x, y, s, on = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 8, 180, 24, 0.4);
  line(0, 0, -120, -10, 10, '#2b2b38'); line(0, 0, 120, -10, 10, '#2b2b38'); line(0, 0, 0, -380, 14, '#3a3a4a');
  fillRR(-150, -560, 300, 190, 30, '#1b1b26'); fillRR(-150, -560, 300, 40, 20, '#2a2a3a');
  circ(30, -465, 78, '#0c0c14'); circ(30, -465, 60, '#1d2a48'); circ(30, -465, 36, '#2f4f8a'); circ(14, -482, 12, 'rgba(255,255,255,0.6)');
  if (on) { glow(-110, -530, 60, '#ff3b3b', 0.7); circ(-110, -530, 14, Math.floor(TT * 3) % 2 ? '#ff3b3b' : '#a01818'); }
  fillRR(-120, -600, 80, 40, 10, '#2a2a3a'); ctx.restore();
}
function podMic(x, y, s, on = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  line(-200, 60, -40, -120, 14, '#3a3a4a'); line(-40, -120, 0, -200, 14, '#3a3a4a'); fillRR(-240, 40, 90, 40, 10, '#2b2b38');
  fillRR(-70, -460, 140, 300, 70, '#2b2b38'); for (let i = 0; i < 8; i++) line(-50, -420 + i * 30, 50, -420 + i * 30, 6, '#4a4a5c');
  fillRR(-84, -260, 168, 30, 10, '#1b1b26'); if (on) { glow(0, -310, 220, '#41f08a', 0.35); fillRR(-60, -200, 120, 14, 7, '#41f08a'); }
  ctx.restore();
}
function downloadBar(x, y, w, u, label = 'GTA VI') {
  fillRR(x - w / 2, y - 90, w, 180, 24, 'rgba(10,8,30,0.88)'); tText('DOWNLOAD · ' + label, x, y - 50, 34, { color: '#9f95c9', shadow: false, letter: 2 });
  fillRR(x - w / 2 + 30, y - 10, w - 60, 44, 22, '#2a2440'); fillRR(x - w / 2 + 30, y - 10, Math.max(44, (w - 60) * u), 44, 22, u >= 1 ? '#41f08a' : '#ff4fa3');
  tText(Math.round(u * 100) + ' %' + (u >= 1 ? ' ✓' : ''), x, y + 62, 40, { color: '#fff', shadow: false });
}
function adContract(x, y, s, sign = 0, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); fillRR(-230, -300, 460, 600, 14, 'rgba(0,0,0,0.25)'); fillRR(-240, -310, 460, 600, 14, '#ffffff');
  fillRR(-240, -310, 460, 100, 14, '#7b2fd6'); tText('WERBEVERTRAG', -10, -260, 42, { color: '#fff', shadow: false });
  for (let i = 0; i < 6; i++) line(-190, -160 + i * 36, 170 - (i % 2) * 70, -160 + i * 36, 6, '#d6d9e6');
  tText('1.000.000 €', -10, 110, 66, { color: '#26a24c', shadow: false }); line(-190, 230, 170, 230, 4, '#9aa0b4');
  if (sign > 0) { ctx.save(); ctx.beginPath(); ctx.rect(-190, 170, 360 * sign, 60); ctx.clip(); ctx.beginPath(); ctx.moveTo(-180, 215); for (let i = 0; i <= 30; i++) ctx.lineTo(-180 + i * 11, 210 - Math.sin(i * 1.3) * 18 - (i % 7) * 2); ctx.lineWidth = 6; ctx.strokeStyle = '#1d48b8'; ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
function poolVilla(x, y, s, splashT) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  villa(0, -60, 1.0, 1);
  fillRR(-460, 0, 920, 230, 30, '#e8e2d0'); fillRR(-420, 30, 840, 170, 24, '#29b6f6');
  for (let i = 0; i < 6; i++) { const off = Math.sin(TT * 2 + i) * 20; line(-380 + off + i * 130, 70 + (i % 3) * 40, -310 + off + i * 130, 70 + (i % 3) * 40, 6, 'rgba(255,255,255,0.6)'); }
  for (const px of [-520, 520]) { line(px, 0, px + 20, -420, 22, '#8a5a33'); for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * 0.5; ell(px + 20 + Math.cos(a) * 90, -420 + Math.sin(a) * 50, 110, 26, '#26a24c', a); } }
  ctx.restore();
}
function lounger(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line(-260, 0, -240, 60, 10, '#ddd'); line(220, 0, 240, 60, 10, '#ddd'); fillRR(-280, -30, 380, 40, 14, '#ff8a5a'); ctx.save(); ctx.translate(100, -10); ctx.rotate(-0.6); fillRR(0, -30, 220, 40, 14, '#ff8a5a'); ctx.restore(); ctx.restore(); }
function subAlert(x, y, t0, txt = 'NEUES ABO ⭐') { if (TT < t0 || TT > t0 + 1.4) return; const k = springEase(TT - t0, 300, 12), out = clamp((TT - t0 - 1.1) / 0.3); ctx.save(); ctx.translate(x, y - out * 60); ctx.globalAlpha = 1 - out; ctx.scale(k, k); fillRR(-190, -50, 380, 100, 22, '#ff4fa3'); tText(txt, 0, 2, 40, { color: '#fff', shadow: false }); ctx.restore(); }
function viewerIcon(x, y, s, col = '#9fb4d8') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); circ(0, -60, 40, col); ctx.beginPath(); ctx.arc(0, 40, 70, Math.PI, 0); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
function setStreamRoom(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1400, [[0, '#1a0f3a'], [1, '#0e0826']]); ctx.fillRect(-600, -400, 2300, 1800);
    for (let i = 0; i < 7; i++) { const h = (TT * 50 + i * 50) % 360; fillRR(-200 + i * 220, 200, 120, 120, 16, '#120a2a'); for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) fillRR(-190 + i * 220 + c * 36, 210 + r * 36, 30, 30, 4, `hsla(${(h + r * 20 + c * 15) % 360},70%,45%,0.6)`); }
    const hue = (TT * 70) % 360; ctx.fillStyle = `hsla(${hue},90%,60%,0.8)`; ctx.fillRect(-600, 120, 2300, 14); glow(540, 127, 900, `hsl(${hue},90%,60%)`, 0.25);
    ctx.beginPath(); ctx.arc(900, 560, 120, 0, TAU); ctx.lineWidth = 24; ctx.strokeStyle = '#fff8e0'; ctx.stroke(); glow(900, 560, 260, '#fff8e0', 0.3); line(900, 680, 900, 1380, 10, '#3a3a4a');
    ctx.fillStyle = '#140c2a'; ctx.fillRect(-600, 1380, 2300, 900); rugPattern(540, 1650, 520, 110, '#3a1a6a', '#5a2bd6');
  });
}
