// =====================================================================
//  props19.js — Piraten-Token: our own pirate token, loot chests (closed / opening / golden), loot (ammo, bandage, potion),
//  a battle-royale-ish game screen (own design, no real game art), an item shop grid, a marketplace listing on a phone,
//  a chat with the seller, a login screen, an empty inventory, a news screen, a chest counter, an event timer.
// =====================================================================
// the pirate token: a gold doubloon with a pirate hat and crossed swords; sx squashes it for a spin
function pirateToken(x, y, r, o = {}) {
  const sx = o.sx ?? 1, a = Math.max(0.05, Math.abs(sx)); ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0);
  if (o.glow !== 0) glow(0, 0, r * 2.4, '#ffd23f', 0.35 * (o.glow ?? 1));
  ctx.scale(a, 1); circ(r * 0.06, r * 0.09, r * 1.02, 'rgba(0,0,0,0.3)'); circ(0, 0, r, '#b8860b'); circ(0, 0, r * 0.92, '#f2c94c'); circ(0, 0, r * 0.78, '#e7b93a');
  for (let i = 0; i < 24; i++) { const an = i / 24 * TAU; circ(Math.cos(an) * r * 0.86, Math.sin(an) * r * 0.86, r * 0.025, '#9a6e08'); }
  if (a > 0.3) { line(-r * 0.45, r * 0.4, r * 0.45, -r * 0.35, r * 0.07, '#7a5200'); line(r * 0.45, r * 0.4, -r * 0.45, -r * 0.35, r * 0.07, '#7a5200');
    ctx.beginPath(); ctx.moveTo(-r * 0.55, -r * 0.05); ctx.quadraticCurveTo(0, -r * 0.75, r * 0.55, -r * 0.05); ctx.quadraticCurveTo(0, -r * 0.2, -r * 0.55, -r * 0.05); ctx.fillStyle = '#1b1530'; ctx.fill();
    circ(0, -r * 0.3, r * 0.1, '#f4f4f8'); circ(0, r * 0.12, r * 0.22, '#f4f4f8'); circ(-r * 0.08, r * 0.1, r * 0.05, '#1b1530'); circ(r * 0.08, r * 0.1, r * 0.05, '#1b1530'); }
  ell(-r * 0.4, -r * 0.45, r * 0.2, r * 0.08, 'rgba(255,255,255,0.6)', -0.6); ctx.restore();
}
// a loot chest: wood + metal bands; open 0..1 lifts the lid; gold = the rare golden one (glows, beams)
function lootChest(x, y, s, o = {}) {
  const open = o.open ?? 0, gold = o.gold ?? 0; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 8, 230, 30, 0.4);
  if (gold) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 9; i++) { const a = -Math.PI / 2 + (i - 4) * 0.22 + Math.sin(TT * 2 + i) * 0.03; ctx.fillStyle = `rgba(255,214,90,${0.12 * gold})`; ctx.beginPath(); ctx.moveTo(0, -160); ctx.lineTo(Math.cos(a - 0.06) * 1400, -160 + Math.sin(a - 0.06) * 1400); ctx.lineTo(Math.cos(a + 0.06) * 1400, -160 + Math.sin(a + 0.06) * 1400); ctx.fill(); } ctx.restore(); glow(0, -150, 420, '#ffd23f', 0.6 * gold); }
  const body = gold ? '#e7b93a' : '#8a5a2a', bodyD = gold ? '#b8860b' : '#6a4420', band = gold ? '#fff1a6' : '#5a5f73';
  fillRR(-200, -170, 400, 170, 16, body); for (let i = 0; i < 4; i++) line(-200, -150 + i * 44, 200, -150 + i * 44, 4, bodyD);
  for (const bx of [-150, 150]) fillRR(bx - 18, -172, 36, 174, 6, band); fillRR(-36, -150, 72, 60, 10, band); circ(0, -118, 12, '#1b1530');
  if (open > 0) { ell(0, -172, 190, 26 * open + 6, '#1b1006'); }
  ctx.save(); ctx.translate(0, -170 - open * 150); ctx.scale(1, 1 - open * 0.55);
  ctx.beginPath(); ctx.moveTo(-200, 0); ctx.quadraticCurveTo(-200, -120, 0, -120); ctx.quadraticCurveTo(200, -120, 200, 0); ctx.closePath(); ctx.fillStyle = body; ctx.fill();
  for (const bx of [-150, 150]) fillRR(bx - 18, -112, 36, 112, 6, band); ctx.restore();
  if (open > 0.2) { glow(0, -190, 260, gold ? '#ffffff' : '#7fe0ff', 0.5 * open); }
  ctx.restore();
}
// loot that flies out of a chest: ammo box, bandage roll, a small potion
function ammoBox(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); fillRR(-70, -45, 140, 90, 10, '#5a6a3a'); fillRR(-70, -45, 140, 24, 8, '#3f4c26'); for (let i = 0; i < 4; i++) { fillRR(-50 + i * 28, -80, 16, 40, 6, '#d9a520'); fillRR(-50 + i * 28, -88, 16, 14, 7, '#b0763a'); } tText('AMMO', 0, 14, 22, { color: '#f4ead0', shadow: false }); ctx.restore(); }
function bandage(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ell(0, 0, 60, 46, '#f4f4f8'); ell(0, 0, 22, 18, '#d8dbe6'); fillRR(30, -10, 70, 20, 6, '#f4f4f8'); line(-20, -30, 20, -30, 8, '#e8262f'); line(0, -50, 0, -10, 8, '#e8262f'); ctx.restore(); }
function potion(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); circ(0, 20, 52, '#52b8ff'); circ(-16, 4, 14, 'rgba(255,255,255,0.6)'); fillRR(-18, -60, 36, 40, 8, '#c0c6d6'); fillRR(-24, -70, 48, 16, 6, '#8a5a2a'); ctx.restore(); }
// our own battle-royale screen: a stylized island from above with chest markers; inside a monitor frame
function gameScreen(x, y, w, h, o = {}) {
  ctx.save(); ctx.translate(x, y); fillRR(-w / 2 - 20, -h / 2 - 20, w + 40, h + 40, 18, '#15131f'); ctx.save(); rrPath(-w / 2, -h / 2, w, h, 10); ctx.clip();
  ctx.fillStyle = '#1e8fd0'; ctx.fillRect(-w / 2, -h / 2, w, h); for (let i = 0; i < 8; i++) line(-w / 2, -h / 2 + i * h / 8 + Math.sin(TT * 2 + i) * 6, w / 2, -h / 2 + i * h / 8 + Math.sin(TT * 2 + i) * 6, 3, 'rgba(255,255,255,0.15)');
  ctx.fillStyle = '#f3d9a0'; ctx.beginPath(); ctx.ellipse(0, 0, w * 0.4, h * 0.38, 0.2, 0, TAU); ctx.fill(); ctx.fillStyle = '#4caf50'; ctx.beginPath(); ctx.ellipse(0, 0, w * 0.35, h * 0.32, 0.2, 0, TAU); ctx.fill();
  const R = RNG('gs'); for (let i = 0; i < 18; i++) circ(R.n(w * 0.28), R.n(h * 0.24), 14 + R.f() * 10, '#2f8a3e');
  for (let i = 0; i < (o.chests ?? 7); i++) { const px = R.n(w * 0.25), py = R.n(h * 0.22), pulse = 1 + 0.2 * Math.sin(TT * 6 + i); glow(px, py, 40 * pulse, '#ffd23f', 0.5); fillRR(px - 14, py - 10, 28, 20, 4, '#d9a520'); }
  fillRR(-w / 2 + 16, -h / 2 + 16, 170, 40, 10, 'rgba(0,0,0,0.5)'); tText(o.label ?? 'TRUHEN: 0', -w / 2 + 101, -h / 2 + 37, 20, { color: '#ffd23f', shadow: false });
  ctx.restore(); ctx.restore();
}
// item shop grid: rarity-coloured tiles with prices; free = 0..1 crosses the prices out and stamps GRATIS
function shopGrid(x, y, s, free = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fillRR(-420, -520, 840, 1040, 30, '#1a1440'); tText('ITEM-SHOP', 0, -460, 54, { color: '#ffffff', shadow: false, letter: 4 });
  const cols = ['#b86bff', '#52b8ff', '#ff9a3c', '#41f08a', '#ff4fa3', '#ffd23f']; const prices = ['2.000', '1.500', '1.200', '800', '2.000', '1.500'];
  for (let i = 0; i < 6; i++) { const cx = -200 + (i % 2) * 400, cy = -260 + Math.floor(i / 2) * 290; fillRR(cx - 180, cy - 120, 360, 250, 20, cols[i]); fillRR(cx - 180, cy + 70, 360, 60, 0, 'rgba(0,0,0,0.35)');
    ctx.save(); ctx.translate(cx, cy - 20); const R = RNG('item', i); if (i % 3 === 0) { circ(0, -20, 50, '#ffffff'); fillRR(-40, 20, 80, 70, 14, '#ffffff'); } else if (i % 3 === 1) { poly([[-70, 60], [0, -80], [70, 60]], '#ffffff'); } else { fillRR(-20, -80, 40, 160, 10, '#ffffff'); fillRR(-60, -10, 120, 20, 8, '#ffffff'); } ctx.restore();
    tText(prices[i] + ' V', cx, cy + 100, 34, { color: '#ffffff', shadow: false }); if (free > 0) { ctx.save(); ctx.globalAlpha = clamp(free * 3 - i * 0.3); line(cx - 90, cy + 112, cx + 90, cy + 88, 8, '#ff2e4d'); tText('GRATIS', cx, cy + 46, 40, { color: '#41f08a', stroke: '#06180c', strokeW: 9 }); ctx.restore(); } }
  ctx.restore();
}
// a marketplace listing on a phone screen: "Account mit Piraten-Token", price, a buy button (pressed when buy>0)
function listingScreen(price = '10.000 €', buy = 0, scam = 0) {
  ctx.fillStyle = '#f4f6fb'; ctx.fillRect(-84, -176, 168, 352); fillRR(-84, -176, 168, 40, 0, '#ffffff'); tText('eBay', -40, -156, 22, { color: '#e53238', shadow: false });
  fillRR(-74, -126, 148, 110, 10, '#1a1440'); pirateToken(0, -72, 36, { glow: 0.5 });
  tText('ACCOUNT MIT', 0, 6, 13, { color: '#1b1530', shadow: false }); tText('PIRATEN-TOKEN', 0, 24, 13, { color: '#1b1530', shadow: false }); tText(price, 0, 58, 28, { color: '#1b1530', shadow: false });
  fillRR(-70, 90, 140, 42, 21, buy > 0 ? '#1a8a3a' : '#3665f3'); tText(buy > 0 ? 'GEKAUFT ✓' : 'SOFORT KAUFEN', 0, 111, 15, { color: '#fff', shadow: false });
  if (scam > 0) { ctx.save(); ctx.globalAlpha = clamp(scam); ctx.translate(0, -10); ctx.rotate(-0.3); ctx.lineWidth = 6; ctx.strokeStyle = '#e8262f'; rrPath(-74, -26, 148, 52, 8); ctx.stroke(); tText('BETRUG', 0, 2, 30, { color: '#e8262f', shadow: false }); ctx.restore(); }
}
// a chat with the seller: messages [[t0, text, mine, col]]
function chatScreen(msgs, title = 'VERKÄUFER') {
  ctx.fillStyle = '#ece5dd'; ctx.fillRect(-84, -176, 168, 352); fillRR(-84, -176, 168, 44, 0, '#075e54'); circ(-58, -154, 13, '#2a2a3a'); tText(title, 6, -154, 14, { color: '#fff', shadow: false });
  let y = -112; for (const [t0, txt, mine, col] of msgs) { if (TT < t0) continue; const k = springEase(TT - t0, 320, 14), lines = String(txt).split('\n'), hh = 20 + lines.length * 16;
    ctx.save(); ctx.translate(mine ? 22 : -22, y + hh / 2); ctx.scale(k, k); fillRR(-58, -hh / 2, 116, hh, 10, col ?? (mine ? '#dcf8c6' : '#ffffff')); lines.forEach((l, i) => tText(l, 0, -hh / 2 + 18 + i * 16, 12, { color: '#1b1530', shadow: false, maxW: 108 })); ctx.restore(); y += hh + 8; }
}
// login screen: password dots typing, then loading / a result
function loginScreen(t0, state = 'type') {
  ctx.fillStyle = '#10142a'; ctx.fillRect(-84, -176, 168, 352); tText('LOGIN', 0, -130, 22, { color: '#fff', shadow: false, letter: 3 });
  fillRR(-70, -80, 140, 36, 8, '#1d2440'); tText('jonas_99', 0, -62, 14, { color: '#cfd8ea', shadow: false }); fillRR(-70, -30, 140, 36, 8, '#1d2440');
  const n = Math.min(8, Math.floor(Math.max(0, TT - t0) * 12)); for (let i = 0; i < n; i++) circ(-50 + i * 14, -12, 4, '#ffffff');
  if (state === 'load') for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + TT * 6; ctx.globalAlpha = (i + 1) / 8; circ(Math.cos(a) * 24, 70 + Math.sin(a) * 24, 6, '#52b8ff'); } ctx.globalAlpha = 1;
}
// an empty inventory (game locker) screen inside a monitor
function emptyLocker(x, y, w, h) {
  ctx.save(); ctx.translate(x, y); fillRR(-w / 2 - 20, -h / 2 - 20, w + 40, h + 40, 18, '#15131f'); fillRR(-w / 2, -h / 2, w, h, 10, '#1a1440');
  tText('SPIND · ITEMS', 0, -h / 2 + 50, 40, { color: '#cfd3e2', shadow: false, letter: 3 });
  for (let i = 0; i < 8; i++) { const cx = -w / 2 + 90 + (i % 4) * ((w - 120) / 4), cy = -h / 2 + 160 + Math.floor(i / 4) * 170; ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.setLineDash([12, 10]); rrPath(cx - 60, cy - 60, 120, 120, 14); ctx.stroke(); ctx.setLineDash([]); }
  tText('0 ITEMS', 0, h / 2 - 70, 70, { color: '#ff4545', shadow: false }); ctx.restore();
}
// a TV news screen: a red banner, a headline and an icon drawn by fn
function newsTV(x, y, s, headline, fn) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fillRR(-440, -280, 880, 560, 24, '#15131f'); ctx.save(); rrPath(-410, -250, 820, 500, 12); ctx.clip(); ctx.fillStyle = '#1d2a4a'; ctx.fillRect(-410, -250, 820, 500);
  fn && fn(); fillRR(-410, 110, 820, 140, 0, '#c0141e'); fillRR(-410, 110, 230, 50, 0, '#ffd23f'); tText('EILMELDUNG', -295, 136, 26, { color: '#1b1530', shadow: false }); tText(headline, 0, 196, 44, { color: '#ffffff', shadow: false, maxW: 780 });
  ctx.restore(); fillRR(-60, 280, 120, 40, 8, '#2b2b36'); ctx.restore();
}
// a counter box: "TRUHEN GEÖFFNET" n / 137.500
function chestCounter(x, y, s, n, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fillRR(-300 + 6, -90 + 10, 600, 180, 26, 'rgba(0,0,0,0.35)'); fillRR(-300, -90, 600, 180, 26, '#141026'); fillRR(-300, -90, 600, 50, 22, '#2a2050');
  tText(o.title ?? 'TRUHEN GEÖFFNET', 0, -64, 24, { color: '#ffd23f', shadow: false, letter: 3 }); tText(Math.round(n).toLocaleString('de-DE'), -30, 30, 76, { color: '#ffffff', shadow: false }); tText('/ 137.500', 190, 44, 30, { color: '#9f95c9', shadow: false });
  ctx.restore();
}
// the event timer banner
function eventTimer(x, y, s, txt = 'EVENT ENDET IN 23:59:59') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const p = 0.75 + 0.25 * Math.sin(TT * 8); glow(0, 0, 460, '#ff2e4d', 0.35 * p); fillRR(-420, -80, 840, 160, 30, '#1b0a14'); ctx.lineWidth = 8; ctx.strokeStyle = '#ff2e4d'; rrPath(-420, -80, 840, 160, 30); ctx.stroke(); tText(txt, 0, 6, 54, { color: '#ff4545', shadow: false, maxW: 780 }); ctx.restore(); }
// the shady seller: a dark hooded silhouette with a mask and glowing eyes, holding a phone
function shadySeller(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ell(0, -260, 170, 210, '#141018'); ctx.beginPath(); ctx.moveTo(-230, 200); ctx.quadraticCurveTo(-200, -80, 0, -110); ctx.quadraticCurveTo(200, -80, 230, 200); ctx.closePath(); ctx.fillStyle = '#1b1624'; ctx.fill();
  ell(0, -230, 110, 140, '#08060c'); fillRR(-80, -200, 160, 70, 20, '#2b2b36'); circ(-40, -270, 12, '#ff3b4a'); circ(40, -270, 12, '#ff3b4a'); glow(0, -270, 90, '#ff3b4a', 0.3); ctx.restore(); }
