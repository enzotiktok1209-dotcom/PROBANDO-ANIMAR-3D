// =====================================================================
//  props3.js — the GTA 6 vs paperclip story: console, game case, the trade-up objects, the gamer room,
//  the flea market, a stream overlay. Everything generic (no logos).
// =====================================================================
function gameConsole(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 8, 170, 26, 0.45);
  ctx.beginPath(); ctx.moveTo(-120, 0); ctx.quadraticCurveTo(-150, -260, -95, -520); ctx.lineTo(-40, -520); ctx.lineTo(-40, 0); ctx.closePath(); ctx.fillStyle = '#f4f6fb'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(120, 0); ctx.quadraticCurveTo(150, -260, 95, -520); ctx.lineTo(40, -520); ctx.lineTo(40, 0); ctx.closePath(); ctx.fillStyle = '#e3e7f1'; ctx.fill();
  fillRR(-42, -540, 84, 540, 16, '#15161e'); line(-38, -520, -38, -10, 4, o.on === false ? '#333' : '#4aa8ff'); if (o.on !== false) glow(-38, -260, 120, '#4aa8ff', 0.35);
  ctx.restore();
}
function gameCase(x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  fillRR(-140, -190, 280, 380, 14, '#0b2a6b'); fillRR(-140, -190, 280, 46, 12, '#1d4ed8');
  ctx.save(); rrPath(-128, -136, 256, 314, 8); ctx.clip();
  ctx.fillStyle = lin(0, -136, 0, 178, [[0, '#ff4fa3'], [0.55, '#ff9a3c'], [1, '#2a1550']]); ctx.fillRect(-128, -136, 256, 314);
  circ(0, 10, 70, '#ffd86b'); for (const px of [-80, 70]) { line(px, 178, px + 10, 20, 10, '#1b0f2e'); for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * 0.5; ell(px + 10 + Math.cos(a) * 34, 20 + Math.sin(a) * 18, 36, 9, '#1b0f2e', a); } }
  fillRR(-128, 120, 256, 58, 0, '#1b0f2e'); ctx.restore();
  tText('GTA', 0, -60, 70, { color: '#fff', stroke: '#1b0f2e', strokeW: 10 }); tText('6', 0, 10, 110, { color: '#ffd23f', stroke: '#1b0f2e', strokeW: 14 });
  ctx.restore();
}
function paperclip(x, y, s, rot = 0, col = '#e8262f') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(30, 60); ctx.lineTo(30, -110); ctx.arc(0, -110, 30, 0, Math.PI, true); ctx.lineTo(-30, 120); ctx.arc(10, 120, 40, Math.PI, 0, true); ctx.lineTo(50, -140); ctx.arc(-5, -140, 55, 0, Math.PI, true); ctx.lineTo(-60, 40);
  ctx.lineWidth = 18; ctx.strokeStyle = shade(col, -0.3); ctx.stroke(); ctx.lineWidth = 12; ctx.strokeStyle = col; ctx.stroke(); ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.stroke();
  ctx.restore();
}
function penObj(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); fillRR(-20, -170, 40, 300, 18, '#2f6df6'); fillRR(-20, -170, 40, 70, 18, '#1d48b8'); poly([[-20, 128], [20, 128], [0, 180]], '#f2d0a0'); poly([[-5, 165], [5, 165], [0, 182]], '#1b1530'); fillRR(14, -160, 10, 120, 5, '#c0c4d4'); ctx.restore(); }
function deskLamp(x, y, s, on = true) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ell(0, 0, 110, 26, '#2b2440'); line(0, -10, 60, -200, 22, '#ffcf3a'); line(60, -200, -40, -330, 22, '#ffcf3a'); circ(60, -200, 20, '#2b2440'); ctx.save(); ctx.translate(-40, -330); ctx.rotate(0.6); poly([[-80, 40], [80, 40], [40, -50], [-40, -50]], '#ffcf3a'); ctx.restore(); if (on) glow(-80, -260, 220, '#fff3b0', 0.5); ctx.restore(); }
function campStove(x, y, s, flame = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 6, 180, 26, 0.4); fillRR(-170, -150, 340, 150, 18, '#2f9e57'); fillRR(-160, -170, 320, 30, 10, '#5c6170');
  for (const bx of [-80, 80]) { ell(bx, -175, 60, 14, '#2b2b36'); if (flame) for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU; poly([[bx + Math.cos(a) * 30, -178], [bx + Math.cos(a) * 36, -210 - 14 * Math.sin(TT * 20 + i)], [bx + Math.cos(a) * 42, -178]], '#4aa8ff'); } }
  fillRR(-130, -110, 70, 50, 10, '#e8e8f0'); ctx.restore(); }
function generator(x, y, s, on = false) { ctx.save(); ctx.translate(x + (on ? Math.sin(TT * 60) * 2 : 0), y); ctx.scale(s, s); shadowEll(0, 6, 230, 30, 0.45);
  for (const sx of [-1, 1]) { line(sx * 190, 0, sx * 190, -300, 22, '#1b1b24'); } line(-190, -300, 190, -300, 22, '#1b1b24');
  fillRR(-170, -270, 340, 230, 26, '#f08a24'); fillRR(-150, -250, 140, 180, 14, '#c96b10'); for (let i = 0; i < 5; i++) line(-140, -230 + i * 34, -20, -230 + i * 34, 6, '#a05208');
  fillRR(20, -240, 130, 90, 12, '#2b2b36'); circ(60, -120, 18, on ? '#41f08a' : '#555'); if (on) glow(60, -120, 70, '#41f08a', 0.6); circ(110, -120, 14, '#e8e8f0');
  for (const wx of [-130, 130]) { circ(wx, -10, 34, '#1b1b24'); circ(wx, -10, 14, '#777'); }
  ctx.restore(); }
function moped(x, y, s, spin = 0, col = '#3fbfdf') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 6, 260, 30, 0.45);
  for (const wx of [-170, 170]) { circ(wx, -80, 80, '#16161e'); circ(wx, -80, 40, '#c0c4d4'); for (let i = 0; i < 5; i++) { const a = spin + (i / 5) * TAU; line(wx, -80, wx + Math.cos(a) * 36, -80 + Math.sin(a) * 36, 6, '#8a8fa6'); } }
  ctx.beginPath(); ctx.moveTo(-230, -150); ctx.quadraticCurveTo(-200, -260, -40, -240); ctx.lineTo(60, -150); ctx.lineTo(120, -150); ctx.lineTo(170, -330); ctx.lineTo(210, -330); ctx.lineTo(180, -150); ctx.lineTo(210, -110); ctx.lineTo(-240, -110); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  fillRR(-200, -290, 190, 40, 18, '#1b1b24'); line(150, -340, 250, -350, 12, '#1b1b24'); fillRR(205, -330, 40, 30, 10, '#fff7c2'); glow(225, -315, 70, '#fff4b0', 0.4); ctx.restore(); }
function van(x, y, s, spin = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 6, 470, 40, 0.5);
  fillRR(-440, -470, 640, 400, 30, '#f2f2f6'); poly([[200, -470], [330, -470], [440, -280], [440, -70], [200, -70]], '#e6e8ef'); poly([[230, -440], [320, -440], [410, -290], [230, -290]], '#4a6fb8');
  fillRR(-420, -380, 600, 110, 10, '#2f9e57'); tText('LIEFERUNG', -120, -325, 60, { color: '#fff', shadow: false }); fillRR(400, -150, 50, 40, 10, '#fff7c2'); fillRR(-445, -160, 20, 50, 6, '#ff3030');
  for (const wx of [-280, 300]) { circ(wx, -60, 76, '#16161e'); circ(wx, -60, 40, '#c0c4d4'); for (let i = 0; i < 5; i++) { const a = spin + (i / 5) * TAU; line(wx, -60, wx + Math.cos(a) * 34, -60 + Math.sin(a) * 34, 7, '#8a8fa6'); } }
  ctx.restore(); }
function compactCar(x, y, s, col = '#e8262f', spin = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 6, 420, 40, 0.5);
  ctx.beginPath(); ctx.moveTo(-400, -60); ctx.lineTo(-390, -170); ctx.quadraticCurveTo(-300, -200, -220, -210); ctx.lineTo(-130, -330); ctx.lineTo(160, -330); ctx.lineTo(270, -210); ctx.quadraticCurveTo(380, -200, 405, -150); ctx.lineTo(410, -60); ctx.closePath();
  ctx.fillStyle = lin(0, -330, 0, -60, [[0, shade(col, 0.3)], [1, shade(col, -0.25)]]); ctx.fill();
  poly([[-110, -310], [10, -310], [10, -215], [-195, -215]], '#4a6fb8'); poly([[30, -310], [150, -310], [245, -215], [30, -215]], '#4a6fb8'); line(-110, -300, -150, -230, 8, 'rgba(255,255,255,0.4)');
  line(20, -320, 20, -70, 5, shade(col, -0.35)); fillRR(370, -170, 40, 30, 10, '#fff7c2'); fillRR(-405, -170, 22, 40, 8, '#ff3030'); fillRR(-200, -170, 50, 12, 6, '#1b1b24');
  for (const wx of [-240, 250]) { circ(wx, -50, 74, '#16161e'); circ(wx, -50, 44, '#c0c4d4'); for (let i = 0; i < 5; i++) { const a = spin + (i / 5) * TAU; line(wx, -50, wx + Math.cos(a) * 38, -50 + Math.sin(a) * 38, 8, '#8a8fa6'); } }
  ctx.restore(); }
function houseIcon(x, y, s, lit = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (lit) glow(0, -250, 520, '#ffe9a6', 0.5 * lit);
  fillRR(-300, -360, 600, 360, 10, '#f3dcb8'); poly([[-350, -340], [0, -620], [350, -340]], '#c0392b'); fillRR(180, -600, 60, 150, 6, '#8a3a2a');
  fillRR(-60, -200, 120, 200, 10, '#7b4a2c'); for (const wx of [-200, 200]) { fillRR(wx - 70, -300, 140, 120, 8, lit ? '#ffd86b' : '#4a6fb8'); line(wx, -300, wx, -180, 8, '#fff'); line(wx - 70, -240, wx + 70, -240, 8, '#fff'); }
  ctx.restore(); }

// ---- stream overlay pieces
function liveBadge(x, y, t0) { if (TT < t0) return; const k = springEase(TT - t0, 300, 12); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); fillRR(-80, -30, 160, 60, 14, '#ef2b2b'); circ(-48, 0, 10, Math.floor(TT * 2) % 2 ? '#fff' : '#ffb0b0'); tText('LIVE', 16, 2, 34, { color: '#fff', shadow: false }); ctx.restore(); }
function viewerCount(x, y, keys) { const v = Math.round(track(keys)); fillRR(x - 110, y - 30, 220, 60, 14, 'rgba(0,0,0,0.6)'); circ(x - 74, y, 10, '#ef2b2b'); tText(v.toLocaleString('de-DE'), x + 14, y + 2, 34, { color: '#fff', shadow: false }); }
function chatFeed(x, y, w, h, msgs, t0, rate = 4) {
  fillRR(x, y, w, h, 18, 'rgba(10,8,30,0.82)'); tText('CHAT', x + w / 2, y + 30, 26, { color: '#9f95c9', shadow: false, letter: 4 });
  const n = Math.max(0, Math.floor((TT - t0) * rate)); ctx.save(); ctx.beginPath(); ctx.rect(x, y + 56, w, h - 60); ctx.clip();
  for (let i = 0; i < 7; i++) { const k = n - i; if (k < 0) break; const m = msgs[k % msgs.length], yy = y + h - 30 - i * 44; tText(m[0] + ':', x + 18, yy, 22, { align: 'left', color: m[2] ?? '#ff8fc0', shadow: false }); tText(m[1], x + 30 + textW(m[0] + ':', 22, 900), yy, 22, { align: 'left', color: '#fff', shadow: false, weight: 700 }); }
  ctx.restore();
}
function donation(x, y, t0, amount) { if (TT < t0 || TT > t0 + 1.6) return; const k = springEase(TT - t0, 300, 12), out = clamp((TT - t0 - 1.3) / 0.3); ctx.save(); ctx.translate(x, y - out * 60); ctx.globalAlpha = 1 - out; ctx.scale(k, k);
  fillRR(-190, -50, 380, 100, 22, '#7b2fd6'); tText('SPENDE ' + amount, 0, 2, 40, { color: '#fff', shadow: false }); ctx.restore(); }
function gameScreen(x, y, w, h) {   // the game on the monitor: a neon city at dusk, a car driving
  ctx.save(); rrPath(x, y, w, h, 8); ctx.clip();
  ctx.fillStyle = lin(0, y, 0, y + h, [[0, '#ff4fa3'], [0.5, '#ff9a3c'], [1, '#2a1550']]); ctx.fillRect(x, y, w, h);
  circ(x + w * 0.7, y + h * 0.45, h * 0.18, '#ffd86b');
  const R = RNG('gsc'); for (let i = 0; i < 12; i++) { const bw = w * (0.05 + R.f() * 0.06), bh = h * (0.2 + R.f() * 0.4), bx = x + ((i * w * 0.09 - TT * 60) % (w * 1.1) + w * 1.1) % (w * 1.1) - w * 0.05; ctx.fillStyle = '#2a1550'; ctx.fillRect(bx, y + h * 0.75 - bh, bw, bh); }
  ctx.fillStyle = '#1b0f2e'; ctx.fillRect(x, y + h * 0.75, w, h * 0.25); for (let i = 0; i < 6; i++) fillRR(x + ((i * w / 5 - TT * 300) % w + w) % w, y + h * 0.86, w * 0.08, h * 0.02, 4, '#ffd23f');
  supercar(x + w * 0.45, y + h * 0.84, w / 2600, { col: '#ff2a8a', wheelSpin: TT * 20 });
  ctx.restore();
}
function monitor(x, y, w, h, fn) { fillRR(x - 14, y - 14, w + 28, h + 28, 18, '#14121c'); fn ? fn(x, y, w, h) : (ctx.fillStyle = '#06050c', ctx.fillRect(x, y, w, h)); fillRR(x + w / 2 - 20, y + h + 14, 40, 70, 6, '#14121c'); fillRR(x + w / 2 - 110, y + h + 80, 220, 18, 8, '#14121c'); }

// ---- places
function setGamerRoom(o = {}) {
  withBlur(o.blur, () => {
    const dark = o.dark ?? 0;
    ctx.fillStyle = lin(0, 0, 0, 1400, [[0, '#2a1650'], [1, '#170c33']]); ctx.fillRect(-600, -400, 2300, 1800);
    for (let i = 0; i < 6; i++) fillRR(-300 + i * 280, 200, 12, 1100, 6, 'rgba(255,255,255,0.04)');
    const hue = (TT * 60) % 360; if (!dark) { ctx.fillStyle = `hsla(${hue},90%,60%,0.75)`; ctx.fillRect(-600, 90, 2300, 16); glow(540, 98, 900, `hsl(${hue},90%,60%)`, 0.22); }
    fillRR(40, 260, 230, 320, 10, '#ff4fa3'); tText('GAME', 155, 380, 56, { color: '#fff', shadow: false }); tText('OVER', 155, 450, 56, { color: '#1b1530', shadow: false });
    fillRR(820, 260, 230, 320, 10, '#2f6df6'); for (let i = 0; i < 4; i++) circ(935 + Math.cos(i * 1.6) * 60, 420 + Math.sin(i * 1.6) * 60, 26, ['#ffd23f', '#41f08a', '#ff4fa3', '#fff'][i]);
    fillRR(700, 680, 360, 18, 6, '#3a2a5a'); for (let i = 0; i < 5; i++) { fillRR(720 + i * 66, 600, 46, 80, 10, ['#41f08a', '#ffd23f', '#ff4fa3', '#52b8ff', '#ff8a1e'][i]); circ(743 + i * 66, 590, 20, ['#41f08a', '#ffd23f', '#ff4fa3', '#52b8ff', '#ff8a1e'][i]); }
    windowFrame(-80, 640, 360, 360, () => citySky(-80, 640, 360, 360, true));
    ctx.fillStyle = '#1b1030'; ctx.fillRect(-600, 1380, 2300, 900); rugPattern(540, 1650, 520, 110, '#4a2a8a', '#6a3fb0');
    if (dark) { ctx.fillStyle = `rgba(2,1,8,${0.88 * dark})`; ctx.fillRect(-600, -400, 2300, 2800); }
  });
}
function gamingDesk(x, y, s, screenFn, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  fillRR(-460, -420, 920, 40, 10, '#2a2140'); fillRR(-430, -380, 30, 380, 8, '#1b1530'); fillRR(400, -380, 30, 380, 8, '#1b1530');
  if (o.dark) { monitor(-330, -880, 660, 380, null); } else { monitor(-330, -880, 660, 380, screenFn); glow(0, -690, 520, '#ff7ad0', 0.18); }
  fillRR(-280, -450, 260, 26, 10, '#14121c'); fillRR(140, -455, 60, 34, 14, '#14121c');
  gameConsole(330, -420, 0.42, { on: !o.dark });
  ctx.restore();
}
function setFleaMarket(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1300, [[0, '#7cc6ff'], [1, '#d8f0ff']]); ctx.fillRect(-600, -400, 2300, 1800);
    for (let i = 0; i < 3; i++) ell(((200 + i * 380 + TT * 15) % 1500) - 200, 240 + i * 60, 110, 36, '#ffffff');
    ctx.fillStyle = '#9fd28a'; ctx.fillRect(-600, 1000, 2300, 400);
    for (let k = 0; k < 3; k++) { const sx = -40 + k * 420; fillRR(sx, 760, 12, 600, 4, '#7a4a2a'); fillRR(sx + 340, 760, 12, 600, 4, '#7a4a2a');
      for (let i = 0; i < 6; i++) poly([[sx + i * 59, 740], [sx + (i + 1) * 59, 740], [sx + (i + 1) * 59 - 10, 830], [sx + i * 59 + 10, 830]], i % 2 ? '#ffffff' : ['#ef3b3b', '#2f6df6', '#ffb800'][k]);
      fillRR(sx - 10, 1180, 372, 30, 8, '#b07a4a'); for (let i = 0; i < 4; i++) fillRR(sx + 20 + i * 85, 1120, 60, 60, 10, ['#ffd23f', '#41f08a', '#ff8fc0', '#52b8ff'][(i + k) % 4]); }
    ctx.beginPath(); ctx.moveTo(-100, 640); ctx.quadraticCurveTo(540, 760, 1180, 640); ctx.lineWidth = 4; ctx.strokeStyle = '#555'; ctx.stroke();
    for (let i = 0; i < 12; i++) { const u = i / 11, px = lerp(-100, 1180, u), py = 640 + 120 * 4 * u * (1 - u) * 0.5; poly([[px - 26, py], [px + 26, py], [px, py + 54]], ['#ef3b3b', '#ffd23f', '#2f6df6', '#41f08a'][i % 4]); }
    ctx.fillStyle = '#d9c4a0'; ctx.fillRect(-600, 1380, 2300, 900); for (let i = 0; i < 10; i++) ell(-200 + i * 160, 1600 + (i % 3) * 80, 40, 14, 'rgba(0,0,0,0.12)');
  });
}
// the trade: the old item flies out left, the new one drops in with a value tag
function tradeSwap(x, y, t, oldFn, newFn, oldVal, newVal) {
  const u = clamp((TT - t) / 0.35);
  if (u < 1) { ctx.save(); ctx.translate(x - EZ.i2(u) * 700, y - Math.sin(u * Math.PI) * 160); ctx.rotate(-u * 1.5); ctx.globalAlpha = 1 - u * 0.6; oldFn(); ctx.restore(); }
  if (TT > t + 0.1) { const k = springEase(TT - t - 0.1, 240, 11); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); newFn(); ctx.restore(); }
  if (TT > t + 0.15) priceTag(x + 230, y - 300, 0.55 * springEase(TT - t - 0.15, 300, 12), newVal, -0.1, PAL.yellow);
  else priceTag(x + 230, y - 300, 0.55, oldVal, -0.1);
}
