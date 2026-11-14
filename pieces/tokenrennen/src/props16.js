// =====================================================================
//  props16.js — 50 Mio. vs 2 €/s: the 2-euro coin, "+2 €" pops, Berlin (TV tower, Brandenburg Gate), a bank office,
//  an office chair, a stock chart that crashes and recovers, a kiosk, a phone chat with a photo.
// =====================================================================
// the 2-euro coin: silver ring, gold core, a big "2"; sx < 1 squashes it for a spin
function coin2(x, y, r, o = {}) {
  const sx = o.sx ?? 1; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0); ctx.scale(Math.max(0.04, Math.abs(sx)), 1);
  circ(r * 0.05, r * 0.08, r * 1.02, 'rgba(0,0,0,0.25)'); circ(0, 0, r, '#c9cfdb'); circ(0, 0, r * 0.92, '#e9edf6'); circ(0, 0, r * 0.68, '#d9a520'); circ(0, 0, r * 0.6, '#f2c94c');
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; circ(Math.cos(a) * r * 0.8, Math.sin(a) * r * 0.8, r * 0.035, '#b9c0d2'); }
  if (Math.abs(sx) > 0.3) tText('2', 0, r * 0.04, r * 0.85, { color: '#8a5a00', shadow: false }); tText('EURO', 0, r * 0.5, r * 0.14, { color: '#8a5a00', shadow: false });
  ell(-r * 0.35, -r * 0.4, r * 0.18, r * 0.08, 'rgba(255,255,255,0.6)', -0.6); ctx.restore();
}
// "+2 €" pops rising at `rate` per second since t0
function plus2(cx, cy, rate, t0, seed = 'p2', spread = 230) {
  if (TT < t0) return; const n = Math.floor((TT - t0) * rate);
  for (let k = Math.max(0, n - 14); k <= n; k++) { const tb = t0 + k / rate, u = (TT - tb) / 1.1; if (u < 0 || u > 1) continue; const R = RNG(seed, k);
    ctx.save(); ctx.globalAlpha = u < 0.75 ? 1 : 1 - (u - 0.75) / 0.25; ctx.translate(cx + R.n(spread), cy - u * 320 - R.f() * 60); const k2 = springEase(TT - tb, 320, 12); ctx.scale(k2, k2);
    tText('+2 €', 0, 0, 66, { color: '#41f08a', stroke: '#0a3a1a', strokeW: 12 }); ctx.restore(); }
}
// Berlin: the TV tower, the Brandenburg Gate, Altbau rows, a sunny sky
function setBerlin(o = {}) {
  withBlur(o.blur, () => {
    const night = o.night ?? 0;
    ctx.fillStyle = night ? lin(0, -400, 0, 1500, [[0, '#060824'], [1, '#2a1d58']]) : lin(0, -400, 0, 1500, [[0, '#3f8cf0'], [0.7, '#9fd8ff'], [1, '#ffe8c0']]); ctx.fillRect(-600, -400, 2300, 1900);
    if (!night) { glow(900, 220, 300, '#fff1a0', 0.45); circ(900, 220, 76, '#fff6c8'); for (const [x, y, s] of [[160, 260, 1], [620, 160, 0.8]]) { const dx = (TT * 12) % 60; ell(x + dx, y, 120 * s, 40 * s, 'rgba(255,255,255,0.9)'); ell(x + dx + 70 * s, y - 24 * s, 76 * s, 42 * s, 'rgba(255,255,255,0.9)'); } }
    else starfield('bn', 60);
    const c = night ? '#1a1440' : '#8a9ac0';
    // TV tower
    line(250, 1300, 250, 300, 30, c); circ(250, 520, 70, night ? '#2a2060' : '#b9c4de'); fillRR(230, 430, 40, 30, 6, c); line(250, 300, 250, 160, 10, c); if (night) circ(250, 160, 8, Math.sin(TT * 4) > 0 ? '#ff4545' : '#5a1010');
    // Altbau rows
    const R = RNG('bln');
    for (let i = 0; i < 11; i++) { const bw = 120 + R.f() * 60, bh = 300 + R.f() * 220, bx = -260 + i * 140, by = 1300 - bh, col = night ? '#241a50' : ['#f1e3c8', '#e7d2b2', '#f4ead6', '#d9c3a3'][i % 4];
      fillRR(bx, by, bw, bh + 300, 4, col); poly([[bx - 6, by], [bx + bw + 6, by], [bx + bw - 20, by - 50], [bx + 20, by - 50]], night ? '#1a1236' : '#a0522d');
      for (let wy = by + 30; wy < 1280; wy += 70) for (let wx = bx + 16; wx < bx + bw - 30; wx += 40) fillRR(wx, wy, 22, 40, 4, night ? (hash(i, wy, wx) % 3 ? 'rgba(255,214,140,0.8)' : '#14102a') : '#7fa6c8'); }
    // Brandenburg Gate
    if (o.gate !== false) { const gx = 760, gy = 1300, gc = night ? '#2a2060' : '#e9dcc0', gd = night ? '#1a1440' : '#cdbb94';
      fillRR(gx - 230, gy - 300, 460, 40, 4, gc); fillRR(gx - 250, gy - 340, 500, 44, 4, gd); for (let i = 0; i < 6; i++) fillRR(gx - 220 + i * 84, gy - 262, 28, 262, 4, gc);
      fillRR(gx - 50, gy - 400, 100, 60, 8, gd); circ(gx, gy - 420, 26, night ? '#3a6a4a' : '#5aa070'); }
    fillRR(-600, 1300, 2300, 1000, 0, night ? '#14102a' : '#9a8f86'); for (let i = 0; i < 16; i++) line(-600 + i * 140, 1300, -900 + i * 200, 2300, 3, 'rgba(0,0,0,0.12)');
  });
}
// a bank office: wall with the bank name, a window, a desk with a monitor
function setBank(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1600, [[0, '#dfe6f2'], [1, '#c3cee2']]); ctx.fillRect(-600, -400, 2300, 2100);
    fillRR(-600, 1480, 2300, 900, 0, '#6a4a3a'); for (let i = 0; i < 12; i++) line(-600 + i * 200, 1480, -600 + i * 200, 2400, 4, 'rgba(0,0,0,0.12)');
    fillRR(80, 180, 920, 150, 20, '#1d48b8'); tText('DEUTSCHE GELDBANK', 540, 255, 64, { color: '#ffffff', shadow: false, maxW: 860 });
    windowFrame(700, 450, 320, 360, () => { ctx.fillStyle = '#9fd8ff'; ctx.fillRect(-600, -400, 2300, 2300); for (let i = 0; i < 4; i++) fillRR(720 + i * 80, 650 - i * 40, 60, 300, 4, '#8a9ac0'); });
    plant(110, 1480, 0.9); for (let i = 0; i < 3; i++) fillRR(90 + i * 170, 520, 130, 170, 10, ['#ffd23f', '#52b8ff', '#41f08a'][i]);
  });
}
function officeDesk(x, y, s, screenFn) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 10, 420, 34, 0.3);
  fillRR(-400, -330, 800, 50, 12, '#8a5631'); fillRR(-380, -280, 40, 280, 8, '#6a3f22'); fillRR(340, -280, 40, 280, 8, '#6a3f22');
  fillRR(-40, -420, 80, 100, 8, '#2a2438'); fillRR(-220, -640, 440, 250, 16, '#1b1626'); ctx.save(); rrPath(-206, -626, 412, 222, 10); ctx.clip(); ctx.fillStyle = '#0e1a2e'; ctx.fillRect(-206, -626, 412, 222); screenFn && screenFn(-206, -626, 412, 222); ctx.restore(); ctx.restore(); }
function officeChair(x, y, s, tilt = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(tilt); ctx.scale(s, s);
  fillRR(-150, -720, 300, 380, 60, '#2a2438'); fillRR(-170, -370, 340, 70, 30, '#3a3448'); line(0, -300, 0, -60, 26, '#6a6f86'); for (const a of [-1, -0.4, 0.4, 1]) line(0, -60, a * 160, -10, 16, '#6a6f86'); for (const a of [-1, -0.4, 0.4, 1]) circ(a * 160, -4, 18, '#1b1626'); ctx.restore(); }
// a transfers list scrolling fast on a screen: "+2,00 € · KEVIN"
function transferList(x, y, w, h, t0) { const sc = Math.max(0, TT - t0) * 360; for (let i = -1; i < 9; i++) { const yy = y + ((i * 44 - sc) % (44 * 9) + 44 * 9) % (44 * 9); if (yy > y + h - 30) continue; fillRR(x + 12, yy + 6, w - 24, 34, 6, i % 2 ? '#14243e' : '#1a2e4e'); tText('ÜBERWEISUNG', x + 30, yy + 23, 18, { color: '#9fb4d8', shadow: false, align: 'left' }); tText('+2,00 €', x + w - 30, yy + 23, 20, { color: '#41f08a', shadow: false, align: 'right' }); } }
// a stock chart: points [[u, v]] (u 0..1 time, v 0..1 value), drawn up to prog, red where falling
function stockChart(x, y, w, h, pts, prog, o = {}) {
  ctx.save(); ctx.translate(x, y); fillRR(-24, -24, w + 48, h + 48, 26, 'rgba(10,8,25,0.82)');
  for (let i = 1; i < 5; i++) line(0, (h * i) / 5, w, (h * i) / 5, 2, 'rgba(255,255,255,0.10)');
  if (o.labels) o.labels.forEach(([u, t]) => tText(t, u * w, h + 10, 24, { color: '#9f95c9', shadow: false }));
  const P = []; for (let i = 0; i < pts.length; i++) { if (pts[i][0] > prog) { if (i) { const a = pts[i - 1], b = pts[i], k = (prog - a[0]) / (b[0] - a[0]); P.push([prog, a[1] + (b[1] - a[1]) * k]); } break; } P.push(pts[i]); }
  for (let i = 1; i < P.length; i++) line(P[i - 1][0] * w, h - P[i - 1][1] * h, P[i][0] * w, h - P[i][1] * h, 12, P[i][1] < P[i - 1][1] ? '#ff4545' : '#41f08a');
  if (P.length) { const L = P[P.length - 1]; circ(L[0] * w, h - L[1] * h, 16, '#ffffff'); glow(L[0] * w, h - L[1] * h, 60, '#ffffff', 0.4); }
  if (o.title) tText(o.title, w / 2, -60, 40, { color: '#ffffff', maxW: w });
  ctx.restore();
}
// a street kiosk with a striped awning and sweets
function setKiosk(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1500, [[0, '#7fc8ff'], [1, '#ffe2a8']]); ctx.fillRect(-600, -400, 2300, 1900);
    fillRR(60, 300, 960, 1100, 10, '#3a6ea5'); for (let i = 0; i < 8; i++) poly([[60 + i * 120, 300], [180 + i * 120, 300], [180 + i * 120, 440], [60 + i * 120, 440]], i % 2 ? '#ffffff' : '#e8262f');
    fillRR(130, 480, 820, 520, 10, '#1d2a4a'); for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) fillRR(150 + c * 88, 500 + r * 120, 70, 100, 8, ['#ff8fc0', '#ffd23f', '#41f08a', '#52b8ff'][(r + c) % 4]);
    tText('KIOSK', 540, 370, 80, { color: '#1b1530', shadow: false }); fillRR(-600, 1400, 2300, 900, 0, '#b9b2a8'); fillRR(60, 1020, 960, 80, 12, '#8a5631');
  });
}
// a chat screen with a photo of Kevin's bank app inside a bubble
function chatPhoto(t0) {
  ctx.fillStyle = '#0e1a2e'; ctx.fillRect(-84, -176, 168, 352); fillRR(-84, -176, 168, 40, 0, '#1d2a4a'); tText('KEVIN', 0, -156, 16, { color: '#fff', shadow: false });
  if (TT > t0) { const k = springEase(TT - t0, 300, 13); ctx.save(); ctx.translate(-8, -20); ctx.scale(k, k); fillRR(-70, -100, 150, 200, 14, '#26a24c'); fillRR(-62, -92, 134, 150, 10, '#f4f6ff'); tText('KONTO', 5, -70, 12, { color: '#5b5f78', shadow: false }); tText('30.000.000 €+', 5, -36, 15, { color: '#18793a', shadow: false, maxW: 126 }); tText('😎📸', 5, 10, 22, { shadow: false }); tText('Na? 😏', 5, 78, 14, { color: '#fff', shadow: false }); ctx.restore(); }
}
// a calendar showing a month name
function monthCal(x, y, s, month, col = '#e8262f') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 260, 220, 26, 0.3); fillRR(-220, -240, 440, 480, 26, '#ffffff'); fillRR(-220, -240, 440, 120, 26, col); fillRR(-220, -150, 440, 30, 0, col);
  tText(month, 0, -180, 54, { color: '#fff', shadow: false, maxW: 400 }); for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) fillRR(-180 + c * 62, -80 + r * 70, 44, 44, 8, '#e6e8f0'); ctx.restore(); }
function snow(seed, n = 40) { const R = RNG('snow', seed); for (let i = 0; i < n; i++) { const x = (R.f() * 1300 - 100 + Math.sin(TT + i) * 30), y = ((R.f() * 2200 + TT * (80 + R.f() * 80)) % 2200) - 200; circ(x, y, 4 + R.f() * 6, 'rgba(255,255,255,0.9)'); } }
function sunIcon(x, y, r) { glow(x, y, r * 2.2, '#ffd23f', 0.5); for (let i = 0; i < 10; i++) { const a = i / 10 * TAU + TT * 0.6; line(x + Math.cos(a) * r * 1.2, y + Math.sin(a) * r * 1.2, x + Math.cos(a) * r * 1.6, y + Math.sin(a) * r * 1.6, r * 0.14, '#ffb020'); } circ(x, y, r, '#ffd23f'); }
