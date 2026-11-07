// =====================================================================
//  props15.js — the Bitcoin piece: coin, price chart, wallet phone, USB stick, password screen,
//  clipper, rocket, penthouse tower, lost-coin abyss, globe, autumn leaves, hourglass, warning sign.
// =====================================================================
const BTC_O = '#f7931a', BTC_D = '#c46f00', BTC_L = '#ffc266';

// a Bitcoin coin seen face-on; spin turns it on its vertical axis (shows the rim), grey = lost, crack = broken
function btcCoin(x, y, r, o = {}) {
  const spin = o.spin ?? 0, sx = Math.cos(spin), grey = o.grey ?? 0;
  const C = (h) => (grey ? mixHex(h, '#7d7f8c', grey) : h);
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0);
  if (o.shadow !== false) shadowEll(0, r * 1.08, r * 0.9, r * 0.16, 0.3);
  if (o.glow) glow(0, 0, r * 2.1, '#ffcf6a', o.glow);
  // the rim (thickness shows while turning)
  const th = r * 0.16 * Math.abs(Math.sin(spin)) + r * 0.03;
  ctx.save(); ctx.translate(Math.sign(Math.sin(spin) || 1) * th * 0.5, 0); ctx.scale(Math.max(0.04, Math.abs(sx)), 1); circ(0, 0, r, C(BTC_D)); ctx.restore();
  ctx.save(); ctx.scale(Math.max(0.04, Math.abs(sx)), 1);
  circ(0, 0, r, C(BTC_O)); circ(0, 0, r * 0.86, C('#e98300')); circ(0, 0, r * 0.8, C(BTC_O));
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r * 0.8, 0, TAU); ctx.clip(); ctx.globalAlpha = 0.35; poly([[-r, -r], [-r * 0.35, -r], [r * 0.4, r], [-r * 0.25, r]], '#ffd9a0'); ctx.restore();
  if (Math.abs(sx) > 0.15) {
    ctx.save(); ctx.scale(sx < 0 ? -1 : 1, 1); ctx.rotate(0.22);
    const s = r / 100; line(-14 * s, -70 * s, -14 * s, 70 * s, 11 * s, '#ffffff', 'butt'); line(14 * s, -70 * s, 14 * s, 70 * s, 11 * s, '#ffffff', 'butt');
    tText('B', 6 * s, 3 * s, 118 * s, { color: '#ffffff', shadow: false, weight: 900 });
    ctx.restore();
  }
  // a gleam sweeping across
  if (!grey) { const g = ((TT * 0.6 + (o.ph ?? 0)) % 1.6) - 0.3; ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.clip(); ctx.globalAlpha = 0.45; ctx.rotate(-0.5); ctx.fillStyle = '#fff'; ctx.fillRect(-r * 1.5 + g * r * 2.4, -r * 1.5, r * 0.22, r * 3); ctx.restore(); }
  ctx.restore();
  if (o.crack) { ctx.save(); ctx.globalAlpha = clamp(o.crack); ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-r * 0.1, -r * 0.95); ctx.lineTo(r * 0.12, -r * 0.4); ctx.lineTo(-r * 0.15, -r * 0.05); ctx.lineTo(r * 0.2, r * 0.35); ctx.lineTo(-r * 0.05, r * 0.95); ctx.lineWidth = r * 0.07; ctx.strokeStyle = '#3a1c00'; ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
// a stack of coins (seen from the side), n coins high
function btcStack(x, y, r, n, o = {}) {
  ctx.save(); ctx.translate(x, y); shadowEll(0, 6, r * 1.1, r * 0.2, 0.35);
  for (let i = 0; i < n; i++) { const yy = -i * r * 0.2; ell(0, yy, r, r * 0.3, BTC_D); ell(0, yy - r * 0.07, r, r * 0.3, i === n - 1 ? BTC_O : '#e98300'); }
  const top = -(n - 1) * r * 0.2 - r * 0.07; ell(0, top, r * 0.72, r * 0.2, BTC_L); tText('₿', 0, top, r * 0.34, { color: '#fff', shadow: false, sy: 0.4 });
  ctx.restore();
}
// coins flying along a path (a burst outward from x,y)
function btcBurst(seed, cx, cy, t0, n = 14, o = {}) {
  if (TT < t0) return; const R = RNG(seed);
  for (let i = 0; i < n; i++) { const a = R.f() * TAU, sp = 500 + R.f() * 900, u = TT - t0 - i * 0.01; if (u < 0) continue; const x = cx + Math.cos(a) * sp * u, y = cy + Math.sin(a) * sp * u * 0.8 + 1400 * u * u;
    if (y > 2300) continue; btcCoin(x, y, (o.r ?? 46) * (0.7 + R.f() * 0.6), { spin: TT * (4 + R.f() * 6) + i, shadow: false }); }
}
// a falling rain of coins
function btcRain(seed, t0, n = 16, o = {}) {
  if (TT < t0) return; const R = RNG(seed);
  for (let i = 0; i < n; i++) { const tb = t0 + R.f() * (o.spread ?? 1.2), u = TT - tb; if (u < 0) continue; const x = (o.x0 ?? 60) + R.f() * (o.w ?? 960), y = -150 + u * u * 1600 + u * 300;
    if (y > 2200) continue; btcCoin(x, y, (o.r ?? 50) * (0.7 + R.f() * 0.5), { spin: TT * (3 + R.f() * 5) + i, shadow: false }); }
}

// price chart: pts = [[x 0..1, value], ...]; drawn up to prog (0..1 of x); colour per segment (up green, down red)
function priceChart(x, y, w, h, pts, prog, o = {}) {
  const vmin = o.vmin ?? 0, vmax = o.vmax ?? Math.max(...pts.map((p) => p[1])) * 1.15;
  const X = (u) => x + u * w, Y = (v) => y + h - (v - vmin) / (vmax - vmin) * h;
  ctx.save();
  fillRR(x - 40, y - 90, w + 80, h + 150, 34, 'rgba(8,10,24,0.86)'); fillRR(x - 40, y - 90, w + 80, 70, { } ? 34 : 0, 'rgba(255,255,255,0.06)');
  tText(o.title ?? 'BITCOIN · BTC/EUR', x - 10, y - 55, 30, { color: '#cfd3f0', shadow: false, align: 'left', letter: 2 });
  for (let i = 0; i <= 4; i++) line(x, y + i * h / 4, x + w, y + i * h / 4, 3, 'rgba(255,255,255,0.08)');
  // the visible part of the polyline
  const vis = [pts[0]];
  for (let i = 1; i < pts.length; i++) { const [u0, v0] = pts[i - 1], [u1, v1] = pts[i]; if (u1 <= prog) vis.push(pts[i]); else { if (prog > u0) { const k = (prog - u0) / (u1 - u0); vis.push([prog, lerp(v0, v1, k)]); } break; } }
  const last = vis[vis.length - 1], up = vis.length < 2 || last[1] >= vis[vis.length - 2][1], col = o.col ?? (up ? '#2ee87a' : '#ff3b4a');
  // area
  ctx.beginPath(); ctx.moveTo(X(vis[0][0]), Y(vis[0][1])); for (const p of vis) ctx.lineTo(X(p[0]), Y(p[1])); ctx.lineTo(X(last[0]), y + h); ctx.lineTo(X(vis[0][0]), y + h); ctx.closePath();
  ctx.fillStyle = lin(0, y, 0, y + h, [[0, col + '66'], [1, col + '00']]); ctx.fill();
  for (let i = 1; i < vis.length; i++) { const c = vis[i][1] >= vis[i - 1][1] ? '#2ee87a' : '#ff3b4a'; line(X(vis[i - 1][0]), Y(vis[i - 1][1]), X(vis[i][0]), Y(vis[i][1]), 14, o.col ?? c); }
  const px = X(last[0]), py = Y(last[1]); glow(px, py, 90, col, 0.6); circ(px, py, 18, '#fff'); circ(px, py, 11, col);
  if (o.label !== false) { const txt = o.fmt ? o.fmt(last[1]) : fmtEUR(Math.round(last[1] / 100) * 100); const tw = textW(txt, 40, 900) + 40, lx = clamp(px - tw / 2, x - 30, x + w + 30 - tw); fillRR(lx, py - 100, tw, 64, 18, col); tText(txt, lx + tw / 2, py - 68, 40, { color: '#fff', shadow: false }); }
  if (o.marks) for (const [u, v, t] of o.marks) if (prog >= u) { line(X(u), Y(v) - 30, X(u), y + h, 3, 'rgba(255,255,255,0.35)'); tText(t, X(u), y + h + 34, 26, { color: '#cfd3f0', shadow: false }); }
  ctx.restore();
}
// the big price board: "1 ₿ = 67.000 €"
function priceBoard(x, y, s, value, col = '#2ee87a', o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  fillRR(-420, -150, 840, 300, 40, 'rgba(0,0,0,0.35)'); fillRR(-430, -160, 840, 300, 40, '#0e1124'); fillRR(-420, -150, 820, 280, 32, '#151a36');
  btcCoin(-280, -10, 95, { spin: Math.sin(TT * 2) * 0.4, shadow: false });
  tText('=', -140, -10, 90, { color: '#ffffff', shadow: false });
  const txt = typeof value === 'number' ? fmtEUR(Math.round(value / 100) * 100) : value;
  tText(txt, 120, -10, 108, { color: col, shadow: false, maxW: 470 });
  if (o.delta) { const k = springEase(TT - o.delta[1], 300, 12); ctx.save(); ctx.translate(250, 110); ctx.scale(k, k); fillRR(-110, -34, 220, 68, 20, o.delta[2] ?? '#ff3b4a'); tText(o.delta[0], 0, 0, 40, { color: '#fff', shadow: false }); ctx.restore(); }
  ctx.restore();
}
// a wallet app on the phone screen: n coins and a value
function walletScreen(n, value, col = '#2ee87a', o = {}) {
  ctx.fillStyle = lin(0, -176, 0, 176, [[0, '#121733'], [1, '#0a0d20']]); ctx.fillRect(-84, -176, 168, 352);
  fillRR(-84, -176, 168, 56, 0, BTC_O); tText('₿ WALLET', 0, -146, 18, { color: '#fff', shadow: false });
  btcCoin(0, -70, 34, { spin: Math.sin(TT * 3) * 0.5, shadow: false });
  tText(typeof n === 'number' ? n + ' BTC' : n, 0, -10, 24, { color: '#fff', shadow: false, maxW: 150 });
  tText('WERT', 0, 30, 12, { color: '#8c93b8', shadow: false, letter: 2 });
  tText(typeof value === 'number' ? fmtEUR(Math.round(value)) : value, 0, 56, value && String(value).length > 11 ? 17 : 21, { color: col, shadow: false, maxW: 156 });
  if (o.spark) { ctx.save(); ctx.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20, v = o.spark(u); i ? ctx.lineTo(-70 + u * 140, 130 - v * 40) : ctx.moveTo(-70, 130 - v * 40); } ctx.lineWidth = 4; ctx.strokeStyle = col; ctx.stroke(); ctx.restore(); }
}
// a push notification card (on a lock screen)
function notifCard(x, y, w, t0, title, body, o = {}) {
  if (TT < t0) return; const k = springEase(TT - t0, 320, 15);
  ctx.save(); ctx.translate(x, y - (1 - k) * 80); ctx.globalAlpha = clamp((TT - t0) / 0.12);
  fillRR(-w / 2, -48, w, 96, 22, 'rgba(255,255,255,0.94)'); btcCoin(-w / 2 + 50, 0, 28, { shadow: false });
  tText(title, -w / 2 + 92, -16, 22, { color: '#1b1530', shadow: false, align: 'left', maxW: w - 110 }); tText(body, -w / 2 + 92, 16, 20, { color: o.col ?? '#18a050', shadow: false, align: 'left', weight: 800, maxW: w - 110 });
  ctx.restore();
}

// USB stick (orange body with a ₿ sticker); glow while the coins go in
function usbStick(x, y, s, rot = 0, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shadowEll(0, 250, 150, 26, 0.35);
  fillRR(-60, -290, 120, 120, 12, '#c9ced9'); fillRR(-46, -276, 92, 100, 8, '#e8ebf2'); fillRR(-30, -260, 22, 22, 4, '#6a6f80'); fillRR(8, -260, 22, 22, 4, '#6a6f80');
  fillRR(-95, -180, 190, 420, 46, '#1e2235'); fillRR(-80, -168, 160, 396, 38, '#2a2f4a'); fillRR(-80, -168, 50, 396, { } ? 38 : 0, 'rgba(255,255,255,0.06)');
  circ(0, 40, 62, BTC_O); tText('₿', 0, 42, 70, { color: '#fff', shadow: false });
  circ(0, 190, 16, o.led ? (Math.floor(TT * 8) % 2 ? '#2ee87a' : '#0b5c2c') : '#0b5c2c');
  if (o.glow) glow(0, -230, 220, '#ffcf6a', o.glow);
  ctx.restore();
}
// laptop screen content: a wallet login. typed = shown chars, state: '' | 'wrong' | 'locked'
function loginScreen(typed, state = '', o = {}) {
  ctx.fillStyle = lin(0, -200, 0, 200, [[0, '#121733'], [1, '#090c1d']]); ctx.fillRect(-290, -200, 580, 400);
  btcCoin(0, -120, 44, { spin: 0, shadow: false });
  tText('₿ WALLET · 5 BTC', 0, -50, 28, { color: '#fff', shadow: false });
  const sh = state === 'wrong' && o.t0 != null ? Math.sin((TT - o.t0) * 60) * 14 * clamp(1 - (TT - o.t0) / 0.5) : 0;
  ctx.save(); ctx.translate(sh, 0);
  const red = state === 'wrong' || state === 'locked';
  fillRR(-210, 0, 420, 76, 16, red ? '#ff3b4a' : '#5a6290'); fillRR(-204, 6, 408, 64, 12, '#ffffff');
  tText('PASSWORT', -196, -18, 18, { color: '#8c93b8', shadow: false, align: 'left', letter: 2 });
  tText(typed, -186, 39, 34, { color: '#1b1530', shadow: false, align: 'left', weight: 800 });
  if (!state && Math.floor(TT * 3) % 2) { const tw = textW(typed, 34, 800); line(-182 + tw, 18, -182 + tw, 60, 4, '#1b1530'); }
  ctx.restore();
  if (state === 'wrong') { fillRR(-150, 104, 300, 62, 18, '#ff3b4a'); tText('✖ FALSCH!', 0, 136, 32, { color: '#fff', shadow: false }); }
  else if (state === 'locked') { fillRR(-190, 104, 380, 62, 18, '#ff3b4a'); tText('🔒 GESPERRT', 0, 136, 32, { color: '#fff', shadow: false }); }
  else { fillRR(-110, 104, 220, 62, 18, BTC_O); tText('ÖFFNEN', 0, 136, 28, { color: '#fff', shadow: false }); }
}
// hair clipper, buzzing
function clipper(x, y, s, rot = 0, buzz = 1) {
  const b = Math.sin(TT * 90) * 4 * buzz;
  ctx.save(); ctx.translate(x + b, y); ctx.rotate(rot); ctx.scale(s, s);
  fillRR(-70, -60, 140, 420, 60, '#2a2f45'); fillRR(-56, -40, 112, 380, 50, '#3c435f'); fillRR(-56, -40, 40, 380, { } ? 50 : 0, 'rgba(255,255,255,0.08)');
  fillRR(-90, -130, 180, 90, 18, '#c9ced9'); for (let i = 0; i < 9; i++) fillRR(-84 + i * 19.5, -160, 12, 40, 4, '#e8ebf2');
  circ(0, 120, 22, '#ff3b4a'); line(0, 360, 0, 470, 14, '#1b1b24');
  ctx.restore();
}
// a shiny bald head (icon)
function baldHead(x, y, s, skin = '#f6cfaa') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  circ(-120, 20, 36, shade(skin, 0.12)); circ(120, 20, 36, shade(skin, 0.12)); circ(0, 0, 130, skin); circ(0, 30, 120, skin);
  ell(-40, -70, 40, 22, 'rgba(255,255,255,0.7)', -0.5); sparkle(-60, -90, 30, '#fff');
  circ(-40, 20, 10, '#1b1530'); circ(40, 20, 10, '#1b1530'); ctx.beginPath(); ctx.arc(0, 60, 30, 0.2, Math.PI - 0.2); ctx.lineWidth = 8; ctx.strokeStyle = '#1b1530'; ctx.stroke();
  ctx.restore();
}
// a warning triangle
function warnSign(x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(0, -200); ctx.lineTo(210, 160); ctx.lineTo(-210, 160); ctx.closePath(); ctx.lineWidth = 50; ctx.strokeStyle = '#1b1530'; ctx.stroke(); ctx.fillStyle = '#ffd23f'; ctx.fill();
  fillRR(-18, -90, 36, 150, 16, '#1b1530'); circ(0, 110, 22, '#1b1530');
  ctx.restore();
}
// a rocket with a flame
function rocket(x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const f = 1 + Math.sin(TT * 40) * 0.15;
  poly([[-40, 150], [40, 150], [70 * f, 150 + 220 * f], [0, 150 + 320 * f], [-70 * f, 150 + 220 * f]], '#ff8a1e'); poly([[-24, 150], [24, 150], [36, 260 * f], [0, 330 * f], [-36, 260 * f]], '#ffe27a');
  poly([[-80, 60], [-150, 180], [-80, 160]], '#ff3b4a'); poly([[80, 60], [150, 180], [80, 160]], '#ff3b4a');
  ctx.beginPath(); ctx.moveTo(0, -260); ctx.quadraticCurveTo(110, -120, 85, 160); ctx.lineTo(-85, 160); ctx.quadraticCurveTo(-110, -120, 0, -260); ctx.fillStyle = '#f4f6ff'; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = '#d7dcef'; ctx.fillRect(30, -300, 100, 500); ctx.restore();
  poly([[-55, -150], [55, -150], [0, -262]], '#ff3b4a'); circ(0, -40, 46, '#2f6df6'); circ(0, -40, 32, '#9fd0ff'); btcCoin(0, 70, 34, { shadow: false });
  ctx.restore();
}
// a Dubai tower with a glowing penthouse on top
function penthouseTower(x, y, s, lit = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  poly([[-120, 0], [120, 0], [95, -900], [-95, -900]], '#2a3570'); poly([[20, 0], [120, 0], [95, -900], [10, -900]], '#1e2858');
  for (let r = 0; r < 26; r++) for (let c = 0; c < 4; c++) { const R = RNG('pt', r * 4 + c); fillRR(-82 + c * 42 + r * 0.7, -60 - r * 32, 30, 18, 3, R.f() < 0.55 ? '#ffd98a' : '#3a4a8a'); }
  // the penthouse: a glass crown on top
  fillRR(-150, -1010, 300, 120, 20, '#9fe0ff'); fillRR(-150, -1010, 300, 18, 8, '#ffffff'); for (let i = 0; i < 6; i++) line(-150 + i * 60, -992, -150 + i * 60, -890, 5, '#ffffff');
  glow(0, -950, 320, '#fff3b0', 0.55 * lit); fillRR(-170, -900, 340, 22, 8, '#e8ecf8');
  ctx.restore();
}
// a dark abyss where coins vanish
function abyss(x, y, w, h) { ctx.save(); ctx.translate(x, y); ell(0, 0, w, h, '#05030c'); ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, w, h, 0, 0, TAU); ctx.clip(); ctx.fillStyle = rad(0, 0, 0, w, [[0, '#000'], [1, '#2a1650']]); ctx.fillRect(-w, -h, w * 2, h * 2); ctx.restore(); ctx.beginPath(); ctx.ellipse(0, 0, w, h, 0, 0, TAU); ctx.lineWidth = 12; ctx.strokeStyle = '#6a3fd0'; ctx.stroke(); ctx.restore(); }
// a cartoon globe
function globe(x, y, r, spin = 0) {
  ctx.save(); ctx.translate(x, y); glow(0, 0, r * 1.6, '#52b8ff', 0.35); circ(0, 0, r, '#2f8cf0');
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.clip();
  const off = (spin % 1) * r * 2;
  for (let k = -1; k <= 1; k++) { ctx.save(); ctx.translate(k * r * 2 - off, 0); ell(-r * 0.35, -r * 0.35, r * 0.38, r * 0.26, '#3fd17a', 0.3); ell(-r * 0.15, r * 0.3, r * 0.2, r * 0.38, '#3fd17a', -0.2); ell(r * 0.45, -r * 0.2, r * 0.32, r * 0.22, '#3fd17a', -0.2); ell(r * 0.55, r * 0.45, r * 0.18, r * 0.12, '#3fd17a'); ctx.restore(); }
  ctx.fillStyle = rad(-r * 0.4, -r * 0.4, 0, r * 1.4, [[0, 'rgba(255,255,255,0.25)'], [1, 'rgba(0,0,40,0.35)']]); ctx.fillRect(-r, -r, r * 2, r * 2); ctx.restore();
  ctx.restore();
}
// falling autumn leaves (screen-wide)
function leaves(seed, t0, n = 18) {
  const R = RNG(seed);
  for (let i = 0; i < n; i++) { const ph = R.f() * 10, sp = 160 + R.f() * 160, x0 = R.f() * 1080, u = (TT - t0 + ph); const y = -200 + ((u * sp) % 2400), x = x0 + Math.sin(u * 1.6 + i) * 90;
    ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(u * 2 + i) * 1.2); const c = ['#ff8a1e', '#e8483c', '#ffc23f', '#c96b10'][i % 4]; ell(0, 0, 34, 18, c); line(-34, 0, 34, 0, 3, shade(c, 0.25)); ctx.restore(); }
}
// an hourglass, prog 0..1 of the sand fallen
function hourglass(x, y, s, prog, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  fillRR(-150, -250, 300, 36, 12, '#8a5a2a'); fillRR(-150, 214, 300, 36, 12, '#8a5a2a'); fillRR(-140, -214, 16, 428, 6, '#6a4220'); fillRR(124, -214, 16, 428, 6, '#6a4220');
  ctx.beginPath(); ctx.moveTo(-110, -214); ctx.lineTo(110, -214); ctx.lineTo(14, 0); ctx.lineTo(110, 214); ctx.lineTo(-110, 214); ctx.lineTo(-14, 0); ctx.closePath(); ctx.fillStyle = 'rgba(200,230,255,0.35)'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = '#e8f4ff'; ctx.stroke();
  const top = 1 - prog; if (top > 0) poly([[-100 * top, -20 - 180 * top], [100 * top, -20 - 180 * top], [0, -10]], '#ffcf6a');
  if (prog > 0) poly([[-110 * Math.sqrt(prog), 214], [110 * Math.sqrt(prog), 214], [0, 214 - 190 * prog]], '#ffcf6a');
  if (prog < 1) line(0, -10, 0, 214 - 190 * prog, 6, '#ffcf6a');
  ctx.restore();
}
// a little magnifier / question mark bubble
function qMark(x, y, s, col = '#ffd23f') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); tText('?', 0, 0, 200, { color: col, stroke: '#1b0f2e', strokeW: 22 }); ctx.restore(); }
// a stamp "VERLOREN" etc.
function stampBox(x, y, t0, txt, col = '#ff3b4a', rot = -0.15, size = 80) {
  if (TT < t0) return; const k = 1 + 1.6 * (1 - EZ.o3(clamp((TT - t0) / 0.18)));
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.globalAlpha = clamp((TT - t0) / 0.1);
  const w = textW(txt, size, 900) + 70; ctx.lineWidth = 14; ctx.strokeStyle = col; rrPath(-w / 2, -size * 0.8, w, size * 1.6, 20); ctx.stroke();
  tText(txt, 0, 4, size, { color: col, shadow: false }); ctx.restore();
}
// a big number counter that rolls from a to b between t0 and t1
function rollNum(a, b, t0, t1) { return lerp(a, b, EZ.o3(clamp((TT - t0) / Math.max(0.01, t1 - t0)))); }
// a luxury watch box with two watches
function watchDisplay(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  velvetBox(0, 120, 1.15, 1, 0.5);
  ctx.save(); ctx.translate(-150, -40); ctx.rotate(-0.12); goldWatch(0, 0, 0.36, TT); ctx.restore();
  ctx.save(); ctx.translate(150, -40); ctx.rotate(0.12); diamondRolex(0, 0, 0.36, TT); ctx.restore();
  twinkles('wd', -300, -260, 600, 300, 8, { s: 26 });
  ctx.restore();
}
