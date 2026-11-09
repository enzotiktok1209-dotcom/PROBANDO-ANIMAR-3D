// =====================================================================
//  props15.js — the moon piece: space, the moon (craters, plots, the logo), the earth, a rocket, the moon surface,
//  a TV with news, billboards in New York and Tokyo, the G-Klasse, Jonas' own city, a football stadium, a rooftop.
// =====================================================================
function starfield(seed, n = 160, o = {}) {
  const R = RNG('stars', seed);
  for (let i = 0; i < n; i++) {
    const x = R.f() * 1700 - 300, y = R.f() * 2800 - 450, r = 0.8 + R.f() * 2.8, a = 0.35 + 0.65 * Math.abs(Math.sin(TT * (0.8 + R.f() * 2.2) + i));
    const dx = (o.drift ?? 0) * TT * (0.3 + r * 0.25);
    ctx.globalAlpha = a; circ(((x - dx) % 1700 + 1700) % 1700 - 300, y, r, i % 9 ? '#ffffff' : '#bfe0ff'); if (r > 3.2) sparkle(x - dx, y, r * 4 * a, '#ffffff');
  }
  ctx.globalAlpha = 1;
}
function setSpace(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = rad(o.nx ?? 300, o.ny ?? 700, 50, 1700, [[0, '#2c1b62'], [0.45, '#0e0b2e'], [1, '#03020a']]); ctx.fillRect(-600, -400, 2300, 2800);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(180, 520, 650, '#7a3cff', 0.22); glow(950, 1500, 760, '#ff4fa3', 0.13); glow(760, 260, 420, '#52b8ff', 0.14); ctx.restore();
    starfield(o.seed ?? 'sp', o.n ?? 190, { drift: o.drift ?? 0 });
  });
}
function nightSky(o = {}) {   // a city night sky (deep blue to violet), stars
  ctx.fillStyle = lin(0, -400, 0, 1500, [[0, '#060824'], [0.6, '#1b1450'], [1, '#4a2a78']]); ctx.fillRect(-600, -400, 2300, 1900);
  starfield(o.seed ?? 'ns', 70);
}
// a cartoon phone brand (made up): "NOVA" — a phone outline with a four-point star
function brandLogo(x, y, s, a = 1, col = '#52b8ff') {
  if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a;
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(0, 0, 330, col, 0.55); ctx.restore();
  ctx.beginPath(); ctx.roundRect(-70, -130, 140, 230, 30); ctx.lineWidth = 22; ctx.strokeStyle = '#ffffff'; ctx.stroke();
  poly([[0, -70], [16, -16], [70, 0], [16, 16], [0, 70], [-16, 16], [-70, 0], [-16, -16]], '#ffffff'); circ(0, 78, 9, '#ffffff');
  tText('NOVA', 0, 175, 92, { color: '#ffffff', stroke: col, strokeW: 14, shadow: false, letter: 8 });
  ctx.restore();
}
// the moon: maria, craters with a lit rim, the terminator; o.logo (0..1) projects the brand, o.plots/o.sold the grid
function moonBall(x, y, r, o = {}) {
  ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot);
  glow(0, 0, r * 1.6, o.haloC ?? '#dfe6ff', o.halo ?? 0.32);
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.clip();
  ctx.fillStyle = rad(-r * 0.35, -r * 0.38, r * 0.1, r * 1.25, [[0, '#f6f5ee'], [0.55, '#d3d3d8'], [1, '#9b9caa']]); ctx.fillRect(-r, -r, 2 * r, 2 * r);
  const R = RNG('moonM');
  for (let i = 0; i < 8; i++) ell(R.n(r * 0.62), R.n(r * 0.62), r * (0.14 + R.f() * 0.22), r * (0.1 + R.f() * 0.17), 'rgba(118,122,140,0.42)', R.n(1));
  const C = RNG('moonC');
  for (let i = 0; i < 30; i++) {
    const cx = C.n(r * 0.95), cy = C.n(r * 0.95), cr = r * (0.025 + C.f() * 0.09);
    circ(cx, cy, cr, 'rgba(105,108,126,0.55)'); circ(cx + cr * 0.2, cy + cr * 0.2, cr * 0.76, 'rgba(150,152,168,0.6)');
    ctx.beginPath(); ctx.arc(cx, cy, cr, Math.PI * 0.85, Math.PI * 1.75); ctx.lineWidth = Math.max(1.5, cr * 0.18); ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.stroke();
  }
  if (o.plots) {
    const k = o.plots, n = 8, st = (2 * r) / n; ctx.globalAlpha = 0.8 * k;
    for (let i = 0; i <= n; i++) { line(-r + i * st, -r, -r + i * st, r, Math.max(2, r * 0.012), '#ffd23f'); line(-r, -r + i * st, r, -r + i * st, Math.max(2, r * 0.012), '#ffd23f'); }
    ctx.globalAlpha = 1;
    if (o.sold) { const S = RNG('sold'); for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const q = S.f(); if (q < o.sold) { const kk = clamp((o.sold - q) * 8); ctx.globalAlpha = 0.6 * kk; fillRR(-r + i * st + 4, -r + j * st + 4, st - 8, st - 8, 6, '#41f08a'); ctx.globalAlpha = 1; } } }
  }
  ctx.fillStyle = rad(r * 0.62, r * 0.55, r * 0.25, r * 1.45, [[0, 'rgba(12,8,34,0)'], [1, 'rgba(12,8,34,0.6)']]); ctx.fillRect(-r, -r, 2 * r, 2 * r);
  ctx.restore();
  if (o.logo) brandLogo(0, -r * 0.05, r / 330, o.logo);
  if (o.scaffold) {   // a billboard frame around the moon: "das einzige Plakat"
    const k = o.scaffold; ctx.globalAlpha = k; const w = r * 2.5, h = r * 2.3;
    ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.lineWidth = r * 0.05; ctx.strokeStyle = '#ffd23f'; ctx.stroke();
    for (let i = 0; i < 6; i++) { const bx = -w / 2 + (i + 0.5) * w / 6; fillRR(bx - r * 0.05, -h / 2 - r * 0.12, r * 0.1, r * 0.08, 4, '#ffffff'); glow(bx, -h / 2 - r * 0.02, r * 0.35, '#fff6c8', 0.35 * k); }
    ctx.globalAlpha = 1;
  }
  ctx.restore();
}
function earthBall(x, y, r, o = {}) {
  ctx.save(); ctx.translate(x, y);
  glow(0, 0, r * 1.45, '#6ec8ff', o.halo ?? 0.4);
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.clip();
  ctx.fillStyle = rad(-r * 0.3, -r * 0.35, r * 0.1, r * 1.2, [[0, '#4fb4ff'], [0.6, '#1f6fd6'], [1, '#0c3a8a']]); ctx.fillRect(-r, -r, 2 * r, 2 * r);
  const sp = (o.spin ?? 0.05) * TT * r, R = RNG('land');
  for (let i = 0; i < 9; i++) { const lx = ((R.f() * 3 * r + sp) % (3 * r)) - 1.5 * r, ly = R.n(r * 0.75), lw = r * (0.18 + R.f() * 0.3);
    ell(lx, ly, lw, lw * (0.5 + R.f() * 0.4), i % 3 ? '#3dbb62' : '#59cc6f', R.n(1)); ell(lx + lw * 0.3, ly + lw * 0.1, lw * 0.5, lw * 0.3, '#c9b77a', R.n(1)); }
  const Cl = RNG('cloud');
  for (let i = 0; i < 10; i++) { const cx = ((Cl.f() * 3 * r + sp * 1.6) % (3 * r)) - 1.5 * r, cy = Cl.n(r * 0.85); ell(cx, cy, r * (0.12 + Cl.f() * 0.2), r * 0.05, 'rgba(255,255,255,0.75)', Cl.n(0.3)); }
  if (o.night) { ctx.fillStyle = 'rgba(5,8,30,0.55)'; ctx.fillRect(-r, -r, 2 * r, 2 * r); const L = RNG('cityL'); for (let i = 0; i < 70; i++) circ(L.n(r * 0.9), L.n(r * 0.9), 1.5 + L.f() * 2.5, `rgba(255,214,120,${0.5 + 0.5 * Math.sin(TT * 3 + i)})`); }
  ctx.fillStyle = rad(r * 0.5, r * 0.45, r * 0.3, r * 1.4, [[0, 'rgba(5,6,26,0)'], [1, 'rgba(5,6,26,0.6)']]); ctx.fillRect(-r, -r, 2 * r, 2 * r);
  ctx.restore();
  ctx.beginPath(); ctx.arc(0, 0, r * 1.01, 0, TAU); ctx.lineWidth = r * 0.04; ctx.strokeStyle = 'rgba(160,220,255,0.55)'; ctx.stroke();
  ctx.restore();
}
// a rocket (upright at rest): white body, red nose and fins, a round window, a living flame when fl > 0
function rocket(x, y, s, fl = 0, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  if (fl > 0) {
    const f = 1 + Math.sin(TT * 60) * 0.12 + Math.sin(TT * 37) * 0.08;
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(0, 330, 260 * fl, '#ffb347', 0.6); ctx.restore();
    poly([[-70, 230], [70, 230], [0, 230 + 420 * fl * f]], '#ff6a1e'); poly([[-46, 230], [46, 230], [0, 230 + 300 * fl * f]], '#ffd23f'); poly([[-22, 230], [22, 230], [0, 230 + 170 * fl * f]], '#ffffff');
  }
  poly([[-150, 140], [-80, 40], [-80, 230], [-160, 250]], '#e8262f'); poly([[150, 140], [80, 40], [80, 230], [160, 250]], '#b81d24');
  ctx.beginPath(); ctx.moveTo(-90, 230); ctx.lineTo(-95, -150); ctx.quadraticCurveTo(-80, -360, 0, -460); ctx.quadraticCurveTo(80, -360, 95, -150); ctx.lineTo(90, 230); ctx.closePath();
  ctx.fillStyle = lin(-95, 0, 95, 0, [[0, '#ffffff'], [0.6, '#e9ecf5'], [1, '#b9c0d4']]); ctx.fill();
  ctx.save(); ctx.clip(); poly([[-120, -300], [120, -300], [120, -520], [-120, -520]], '#e8262f'); fillRR(-120, -310, 240, 26, 4, '#b81d24'); fillRR(-120, 170, 240, 30, 4, '#c3cadb'); ctx.restore();
  circ(0, -110, 62, '#8a93ab'); circ(0, -110, 50, '#1b2a52'); ell(-16, -128, 18, 12, 'rgba(255,255,255,0.7)', -0.5);
  fillRR(-24, 238, 48, 30, 6, '#5a6174');
  tText('MOND-1', 0, 60, 34, { color: '#1b1530', shadow: false, letter: 2, maxW: 160 });
  ctx.restore();
}
function smokeCloud(seed, x, y, t0, n = 12, s = 1) {
  const lt = TT - t0; if (lt < 0) return; const R = RNG('smk', seed);
  for (let i = 0; i < n; i++) { const a = R.f() * Math.PI - Math.PI, sp = 200 + R.f() * 380, u = 1 - Math.exp(-lt * 1.8);
    const px = x + Math.cos(a) * sp * u * 1.6 * s, py = y - Math.abs(Math.sin(a)) * sp * u * 0.4 * s, r = (60 + R.f() * 70) * (0.6 + u) * s;
    ctx.globalAlpha = clamp(1.2 - lt * 0.35); circ(px, py, r, i % 3 ? '#e9e6f2' : '#c9c4da'); }
  ctx.globalAlpha = 1;
}
// the moon surface: black sky, stars, the earth up high, grey regolith with craters and rocks
function setMoonSurface(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = '#04030c'; ctx.fillRect(-600, -400, 2300, 2800); starfield(o.seed ?? 'ms', 150);
    if (o.earth !== false) earthBall(o.ex ?? 820, o.ey ?? 330, o.er ?? 120, { spin: 0.04 });
    const hy = o.hy ?? 1180;
    ctx.beginPath(); ctx.moveTo(-600, hy + 60); for (let x = -600; x <= 1700; x += 60) ctx.lineTo(x, hy + Math.sin(x * 0.006) * 40 + Math.sin(x * 0.017) * 14); ctx.lineTo(1700, 2500); ctx.lineTo(-600, 2500); ctx.closePath();
    ctx.fillStyle = lin(0, hy - 60, 0, 2000, [[0, '#cfd0d8'], [0.4, '#a9aab6'], [1, '#6f7080']]); ctx.fill();
    const R = RNG('mcr', o.seed ?? 1);
    for (let i = 0; i < 14; i++) { const cx = R.f() * 1500 - 200, cy = hy + 80 + R.f() * 900, cw = 60 + R.f() * 220, k = 0.25 + (cy - hy) / 1600;
      ell(cx, cy, cw * k * 2, cw * k * 0.55, 'rgba(90,92,108,0.55)'); ell(cx + cw * k * 0.25, cy + cw * k * 0.12, cw * k * 1.6, cw * k * 0.38, 'rgba(160,162,176,0.6)');
      ctx.beginPath(); ctx.ellipse(cx, cy, cw * k * 2, cw * k * 0.55, 0, Math.PI * 1.05, Math.PI * 1.95); ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.stroke(); }
    for (let i = 0; i < 16; i++) { const rx = R.f() * 1400 - 150, ry = hy + 120 + R.f() * 820, rs = (12 + R.f() * 30) * (0.4 + (ry - hy) / 900); ell(rx, ry, rs * 1.3, rs, '#8d8e9c'); ell(rx - rs * 0.3, ry - rs * 0.35, rs * 0.6, rs * 0.4, '#d8d9e0'); }
  });
}
function moonFlag(x, y, s, t0) {
  if (TT < t0) return; const k = springEase(TT - t0, 260, 13); ctx.save(); ctx.translate(x, y); ctx.scale(s, s * k);
  line(0, 0, 0, -420, 12, '#d9dde8'); const wv = Math.sin(TT * 5) * 8;
  ctx.beginPath(); ctx.moveTo(0, -410); ctx.quadraticCurveTo(110, -420 + wv, 230, -400); ctx.lineTo(230, -270); ctx.quadraticCurveTo(110, -290 - wv, 0, -280); ctx.closePath(); ctx.fillStyle = PAL.blue; ctx.fill();
  tText('KEVIN', 115, -340, 48, { color: '#fff', shadow: false, maxW: 200 }); ctx.restore();
}
function dustPuff(seed, x, y, t0, s = 1) {
  const lt = TT - t0; if (lt < 0 || lt > 1.4) return; const R = RNG('dust', seed);
  for (let i = 0; i < 10; i++) { const a = -Math.PI * (0.1 + R.f() * 0.8), sp = 160 + R.f() * 260, u = 1 - Math.exp(-lt * 3);
    ctx.globalAlpha = clamp(1 - lt / 1.4) * 0.85; circ(x + Math.cos(a) * sp * u * s, y + Math.sin(a) * sp * u * 0.5 * s, (18 + R.f() * 26) * s * (0.7 + u), '#d7d6df'); }
  ctx.globalAlpha = 1;
}
// a phone call screen from the brand
function novaCall(t0) {
  ctx.fillStyle = lin(0, -176, 0, 176, [[0, '#0d1b3a'], [1, '#1d3c7a']]); ctx.fillRect(-84, -176, 168, 352);
  ctx.save(); ctx.scale(0.28, 0.28); brandLogo(0, -260, 0.9, 1); ctx.restore();
  tText('NOVA', 0, 10, 26, { color: '#fff', shadow: false }); tText('ANRUF …', 0, 44, 16, { color: '#9fd8ff', shadow: false });
  const p = 0.5 + 0.5 * Math.sin(TT * 10); circ(-44, 120, 24 + p * 4, '#ff4545'); circ(44, 120, 24 + p * 4, '#26c25a');
}
// a TV on a stand: bezel, screen content via fn, a power LED
function tvSet(x, y, w, h, on, fn) {
  ctx.save(); ctx.translate(x, y);
  shadowEll(0, h / 2 + 150, w * 0.42, 26, 0.35); fillRR(-w * 0.18, h / 2 + 60, w * 0.36, 26, 10, '#2a2438'); fillRR(-14, h / 2, 28, 70, 6, '#2a2438');
  fillRR(-w / 2 - 22, -h / 2 - 22, w + 44, h + 44, 22, '#15121e'); fillRR(-w / 2 - 22, h / 2 + 4, w + 44, 18, 9, '#221d30');
  ctx.save(); rrPath(-w / 2, -h / 2, w, h, 10); ctx.clip(); ctx.fillStyle = '#05050a'; ctx.fillRect(-w / 2, -h / 2, w, h);
  if (on > 0) { ctx.globalAlpha = clamp(on); fn && fn(-w / 2, -h / 2, w, h); ctx.globalAlpha = 1; if (on < 1) { ctx.fillStyle = `rgba(255,255,255,${(1 - on) * 0.8})`; ctx.fillRect(-w / 2, -h / 2 + h / 2 * on, w, h * (1 - on)); } }
  ctx.fillStyle = 'rgba(255,255,255,0.05)'; for (let i = 0; i < h; i += 6) ctx.fillRect(-w / 2, -h / 2 + i, w, 2);
  ctx.restore(); circ(w / 2 - 30, h / 2 + 12, 5, on > 0 ? '#41f08a' : '#ff4545'); ctx.restore();
}
// the news look inside a screen: studio blue, a picture, a red "EILMELDUNG" bar and a ticker
function newsScreen(x, y, w, h, title, sub, pic, ch = 'MOND-TV') {
  ctx.fillStyle = lin(x, y, x, y + h, [[0, '#0a2a6a'], [1, '#061636']]); ctx.fillRect(x, y, w, h);
  for (let i = 0; i < 6; i++) line(x + i * w / 5, y, x + i * w / 5 - 60, y + h, 3, 'rgba(120,180,255,0.15)');
  ctx.save(); ctx.beginPath(); ctx.rect(x + w * 0.06, y + h * 0.08, w * 0.88, h * 0.58); ctx.clip(); pic && pic(x + w * 0.06, y + h * 0.08, w * 0.88, h * 0.58); ctx.restore();
  fillRR(x + w * 0.06, y + h * 0.08, w * 0.2, h * 0.1, 6, '#e8262f'); tText('LIVE', x + w * 0.16, y + h * 0.13, h * 0.06, { color: '#fff', shadow: false });
  fillRR(x, y + h * 0.69, w, h * 0.13, 0, '#e8262f'); tText(title, x + w / 2, y + h * 0.755, h * 0.075, { color: '#fff', shadow: false, maxW: w * 0.94 });
  fillRR(x, y + h * 0.82, w, h * 0.1, 0, '#ffffff'); tText(sub, x + w / 2, y + h * 0.87, h * 0.055, { color: '#0a1a3a', shadow: false, maxW: w * 0.94 });
  fillRR(x, y + h * 0.92, w, h * 0.08, 0, '#0a1430'); const tk = (TT * 140) % (w * 1.6);
  ctx.save(); ctx.beginPath(); ctx.rect(x, y + h * 0.92, w, h * 0.08); ctx.clip(); tText('+++ MOND VERKAUFT +++ NOVA-LOGO AM HIMMEL +++ KEVIN: „DER MOND GEHÖRT MIR“ +++', x + w - tk + w * 0.3, y + h * 0.96, h * 0.045, { color: '#ffd23f', shadow: false, align: 'left' }); ctx.restore();
  fillRR(x + w * 0.74, y + h * 0.02, w * 0.24, h * 0.07, 6, 'rgba(0,0,0,0.45)'); tText(ch, x + w * 0.86, y + h * 0.055, h * 0.04, { color: '#fff', shadow: false, maxW: w * 0.22 });
}
// a billboard on two posts with spot lights; fn draws the poster (clipped)
function billboard(x, y, w, h, fn, lit = 1) {
  ctx.save(); ctx.translate(x, y);
  fillRR(-w * 0.32 - 14, h / 2, 28, 380, 6, '#2a2438'); fillRR(w * 0.32 - 14, h / 2, 28, 380, 6, '#2a2438');
  fillRR(-w / 2 - 16, -h / 2 - 16, w + 32, h + 32, 10, '#1b1626');
  ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.clip(); fn && fn(-w / 2, -h / 2, w, h); ctx.restore();
  for (let i = 0; i < 3; i++) { const lx = -w / 3 + i * w / 3; fillRR(lx - 20, h / 2 + 14, 40, 22, 6, '#3a3448'); if (lit) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,240,190,0.10)'; ctx.beginPath(); ctx.moveTo(lx - 16, h / 2 + 14); ctx.lineTo(lx - w * 0.22, -h / 2); ctx.lineTo(lx + w * 0.22, -h / 2); ctx.lineTo(lx + 16, h / 2 + 14); ctx.fill(); ctx.restore(); } }
  ctx.restore();
}
// Kevin's poster: him with shades, the moon behind, a German headline
function kevinPoster(x, y, w, h, title = 'DER MONDKÖNIG') {
  ctx.fillStyle = lin(x, y, x, y + h, [[0, '#2f6df6'], [1, '#7a3cff']]); ctx.fillRect(x, y, w, h);
  moonBall(x + w * 0.72, y + h * 0.35, h * 0.3, { halo: 0.2 });
  const s = h / 1050; char('kevin', x + w * 0.32, y + h * 1.18, s, { pose: [[0, 'pointUpR']], emo: [[0, 'grin']], extras: { shades: 1 } });
  fillRR(x, y + h * 0.78, w, h * 0.22, 0, 'rgba(10,8,30,0.82)'); tText(title, x + w / 2, y + h * 0.89, h * 0.12, { color: '#ffd23f', shadow: false, maxW: w * 0.92 });
}
// New York at dusk: towers with lit windows, an antenna tower, yellow cabs on the street
function setNewYork(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, -400, 0, 1500, [[0, '#241a5a'], [0.55, '#c0508a'], [1, '#ffb36b']]); ctx.fillRect(-600, -400, 2300, 1900);
    const R = RNG('ny');
    for (let layer = 0; layer < 2; layer++) for (let i = 0; i < 13; i++) {
      const bw = 90 + R.f() * 110, bh = 400 + R.f() * 700 + (layer ? 0 : 200), bx = -300 + i * 135 + R.n(20), by = 1420 - bh, c = layer ? '#2a1d48' : '#3c2a62';
      fillRR(bx, by, bw, bh + 200, 4, c); if (i === 6 && !layer) { poly([[bx + bw / 2 - 30, by], [bx + bw / 2 + 30, by], [bx + bw / 2, by - 260]], c); line(bx + bw / 2, by - 250, bx + bw / 2, by - 360, 6, c); }
      for (let wy = by + 30; wy < 1400; wy += 46) for (let wx = bx + 14; wx < bx + bw - 20; wx += 30) if ((hash(i, wy, wx, layer) % 5) > 1) fillRR(wx, wy, 16, 22, 3, layer ? 'rgba(255,214,140,0.55)' : 'rgba(255,224,160,0.85)');
    }
    fillRR(-600, 1420, 2300, 900, 0, '#2a2438'); for (let i = 0; i < 12; i++) fillRR(-300 + i * 160, 1640, 90, 14, 6, '#ffd23f');
    const cx = ((TT * 260) % 1800) - 400; for (const off of [0, 760]) { const xx = cx + off; fillRR(xx, 1530, 230, 70, 18, '#ffcc00'); fillRR(xx + 40, 1492, 130, 52, 14, '#ffcc00'); fillRR(xx + 56, 1500, 100, 34, 8, '#7fc8ff'); circ(xx + 50, 1602, 26, '#1b1626'); circ(xx + 180, 1602, 26, '#1b1626'); fillRR(xx + 88, 1478, 40, 16, 4, '#1b1626'); }
  });
}
// Tokyo at night: neon signs (made-up words), lit towers, a pink/blue glow
function setTokyo(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, -400, 0, 1500, [[0, '#07051c'], [0.6, '#241048'], [1, '#5a1a6a']]); ctx.fillRect(-600, -400, 2300, 1900); starfield('tk', 40);
    const R = RNG('tk2'), NE = ['#ff4fa3', '#52b8ff', '#41f08a', '#ffd23f'];
    for (let i = 0; i < 12; i++) { const bw = 110 + R.f() * 90, bh = 500 + R.f() * 800, bx = -300 + i * 140, by = 1420 - bh; fillRR(bx, by, bw, bh + 200, 4, i % 2 ? '#1a1236' : '#22184a');
      for (let wy = by + 30; wy < 1400; wy += 40) for (let wx = bx + 12; wx < bx + bw - 16; wx += 26) if ((hash(i, wy, wx) % 4) > 1) fillRR(wx, wy, 12, 18, 2, 'rgba(160,200,255,0.45)');
      if (i % 3 === 1) { const c = NE[i % 4], f = 0.7 + 0.3 * Math.sin(TT * 9 + i); ctx.save(); ctx.globalAlpha = f; fillRR(bx + bw - 30, by + 60, 46, 300, 10, c); ctx.restore(); glow(bx + bw - 8, by + 210, 160, c, 0.3 * f); } }
    fillRR(-600, 1420, 2300, 900, 0, '#1a1428');
    for (let i = 0; i < 9; i++) { const c = NE[i % 4]; ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(-200 + i * 170, 1460, 140, c, 0.25); ctx.restore(); }
  });
}
// the G-Klasse: a boxy black luxury SUV (side view), chrome trim, a spare wheel on the back
function gKlasse(x, y, s, o = {}) {
  const spin = o.spin ?? 0; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (o.flip) ctx.scale(-1, 1);
  shadowEll(0, 8, 420, 34, 0.45);
  const body = o.col ?? '#16161c', hi = shade(body, 0.35);
  fillRR(-400, -250, 800, 190, 26, body); fillRR(-300, -440, 560, 200, 22, body);
  fillRR(-272, -416, 230, 150, 12, '#7fa6c8'); fillRR(-26, -416, 250, 150, 12, '#7fa6c8'); ctx.save(); ctx.globalAlpha = 0.35; poly([[-260, -410], [-170, -410], [-250, -280]], '#ffffff'); poly([[-10, -410], [70, -410], [-10, -300]], '#ffffff'); ctx.restore();
  line(-300, -440, 260, -440, 8, hi); fillRR(-396, -160, 792, 16, 8, '#c9cfdb'); fillRR(-420, -200, 34, 90, 10, '#c9cfdb');
  fillRR(-420, -240, 40, 40, 10, '#fff6c8'); fillRR(384, -230, 26, 50, 8, '#e8262f'); line(-40, -230, -40, -70, 4, shade(body, 0.2)); line(-300, -230, -300, -70, 4, shade(body, 0.2));
  fillRR(-120, -210, 50, 12, 6, '#c9cfdb'); fillRR(140, -210, 50, 12, 6, '#c9cfdb');
  circ(430, -170, 92, '#111'); circ(430, -170, 60, '#2a2a33'); circ(430, -170, 24, '#c9cfdb');
  for (const wx of [-250, 250]) { circ(wx, -50, 104, '#0c0c10'); circ(wx, -50, 66, '#c9cfdb'); circ(wx, -50, 22, '#6a6f80'); ctx.save(); ctx.translate(wx, -50); ctx.rotate(spin); for (let k = 0; k < 5; k++) { ctx.rotate(TAU / 5); fillRR(-8, 18, 16, 44, 6, '#8a90a2'); } ctx.restore(); }
  ctx.restore();
}
// a giant bow on top (the stake)
function bigBow(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ell(-90, 0, 100, 52, '#ff3b5c', -0.4); ell(90, 0, 100, 52, '#ff3b5c', 0.4); ell(-90, 0, 54, 26, '#d81b43', -0.4); ell(90, 0, 54, 26, '#d81b43', 0.4); circ(0, 0, 38, '#d81b43'); poly([[-20, 20], [-70, 120], [-30, 110]], '#ff3b5c'); poly([[20, 20], [70, 120], [30, 110]], '#ff3b5c'); ctx.restore(); }
// Jonas' own city: towers with a giant golden sign on top
function setJonasCity(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, -400, 0, 1500, [[0, '#3a7bd5'], [0.6, '#8fd0ff'], [1, '#ffe2a8']]); ctx.fillRect(-600, -400, 2300, 1900);
    glow(860, 260, 300, '#fff1a0', 0.45); circ(860, 260, 80, '#fff6c8');
    const R = RNG('jc');
    for (let i = 0; i < 12; i++) { const bw = 100 + R.f() * 100, bh = 380 + R.f() * 620, bx = -260 + i * 130, by = 1400 - bh, c = ['#e9eef8', '#cfdaf0', '#f5e7c8'][i % 3];
      fillRR(bx, by, bw, bh + 300, 6, c); fillRR(bx + bw - 22, by, 22, bh + 300, 0, shade(c, -0.12));
      for (let wy = by + 26; wy < 1380; wy += 44) for (let wx = bx + 14; wx < bx + bw - 26; wx += 30) fillRR(wx, wy, 18, 26, 3, '#7fb2e0'); }
    fillRR(-600, 1400, 2300, 900, 0, '#4a5470'); for (let i = 0; i < 10; i++) fillRR(-300 + i * 170, 1560, 100, 14, 6, '#ffffff');
  });
}
function citySign(x, y, s, txt, t0) {
  if (TT < t0) return; const k = springEase(TT - t0, 200, 12); ctx.save(); ctx.translate(x, y - (1 - k) * 900); ctx.scale(s, s);
  line(-260, 60, -260, 260, 14, '#6a6f86'); line(260, 60, 260, 260, 14, '#6a6f86');
  const w = Math.max(560, textW(txt, 110) + 80); fillRR(-w / 2 + 10, -80, w, 170, 24, 'rgba(0,0,0,0.3)'); fillRR(-w / 2, -90, w, 170, 24, '#ffd23f'); fillRR(-w / 2 + 12, -78, w - 24, 146, 18, '#ffbf1a');
  tText(txt, 0, -6, 110, { color: '#ffffff', stroke: '#8a5a00', strokeW: 16 });
  for (let i = 0; i < 9; i++) circ(-w / 2 + 30 + i * (w - 60) / 8, 64, 9, Math.sin(TT * 8 + i) > 0 ? '#ffffff' : '#ffe9a6');
  ctx.restore();
}
// a football stadium seen from the stands: pitch with lines, floodlights, a crowd that jumps, a banner
function setStadium(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, -400, 0, 900, [[0, '#0a1030'], [1, '#2a2a6a']]); ctx.fillRect(-600, -400, 2300, 1400);
    for (const fx of [40, 1040]) { line(fx, 600, fx, -60, 18, '#3a3f5a'); fillRR(fx - 90, -140, 180, 90, 10, '#e9eef8'); for (let i = 0; i < 6; i++) circ(fx - 70 + i * 28, -95, 10, '#fffbe0'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,250,210,0.10)'; ctx.beginPath(); ctx.moveTo(fx - 80, -60); ctx.lineTo(fx + (fx < 540 ? 800 : -800), 1400); ctx.lineTo(fx + (fx < 540 ? 300 : -300), 1400); ctx.lineTo(fx + 80, -60); ctx.fill(); ctx.restore(); }
    ctx.fillStyle = '#3a1d5e'; ctx.beginPath(); ctx.moveTo(-600, 380); ctx.quadraticCurveTo(540, 160, 1700, 380); ctx.lineTo(1700, 900); ctx.lineTo(-600, 900); ctx.fill();
    const R = RNG('crowdS'), C = ['#ff4fa3', '#ffd23f', '#52b8ff', '#e8262f', '#ffffff', '#41f08a'];
    for (let row = 0; row < 7; row++) for (let i = 0; i < 26; i++) { const x = -260 + i * 62 + (row % 2) * 30, y = 330 + row * 78 - Math.sin((x - 540) / 900) * 0 + Math.abs(x - 540) * 0.08, j = Math.max(0, Math.sin(TT * 9 + i * 1.7 + row)) * (o.jump ?? 10);
      circ(x, y - j, 20, '#f1c19a'); fillRR(x - 24, y + 14 - j, 48, 50, 16, C[(i + row * 3) % 6]); }
    ctx.fillStyle = lin(0, 900, 0, 2200, [[0, '#2fae55'], [1, '#1d8a3e']]); ctx.fillRect(-600, 900, 2300, 1500);
    for (let i = 0; i < 9; i++) { ctx.fillStyle = i % 2 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'; ctx.fillRect(-600 + i * 280, 900, 280, 1500); }
    ctx.lineWidth = 10; ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.beginPath(); ctx.ellipse(540, 1350, 300, 110, 0, 0, TAU); ctx.stroke(); line(-600, 1350, 1700, 1350, 10, 'rgba(255,255,255,0.85)'); line(-600, 960, 1700, 960, 10, 'rgba(255,255,255,0.85)');
  });
}
function football(x, y, r, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); circ(0, 0, r, '#ffffff'); poly([0, 1, 2, 3, 4].map((i) => [Math.cos(i / 5 * TAU - 1.57) * r * 0.38, Math.sin(i / 5 * TAU - 1.57) * r * 0.38]), '#1b1530');
  for (let i = 0; i < 5; i++) { const a = i / 5 * TAU - 1.57; circ(Math.cos(a) * r * 0.86, Math.sin(a) * r * 0.86, r * 0.2, '#1b1530'); } ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.lineWidth = r * 0.06; ctx.strokeStyle = '#1b1530'; ctx.stroke(); ctx.restore(); }
function clubCrest(x, y, s, txt = 'FC JONAS') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-150, -170); ctx.lineTo(150, -170); ctx.lineTo(150, 30); ctx.quadraticCurveTo(150, 150, 0, 210); ctx.quadraticCurveTo(-150, 150, -150, 30); ctx.closePath(); ctx.fillStyle = '#e2453c'; ctx.fill(); ctx.lineWidth = 16; ctx.strokeStyle = '#ffd23f'; ctx.stroke();
  fillRR(-150, -60, 300, 70, 0, '#ffffff'); tText(txt, 0, -24, 50, { color: '#e2453c', shadow: false, maxW: 270 }); football(0, 100, 52, TT); crown(0, -150, 0.55); ctx.restore(); }
// Jonas' rooftop terrace at night: railing, string lights, a city glow below, the moon in the sky (logo optional)
function setRooftop(o = {}) {
  withBlur(o.blur, () => {
    nightSky({ seed: 'rt' }); moonBall(o.mx ?? 760, o.my ?? 300, o.mr ?? 120, { logo: o.logo ?? 0, halo: 0.4 });
    const R = RNG('rtc'); for (let i = 0; i < 16; i++) { const bx = -300 + i * 110, bh = 200 + R.f() * 380; fillRR(bx, 1150 - bh, 96, bh + 300, 3, '#1a1440'); for (let wy = 1170 - bh; wy < 1140; wy += 34) for (let wx = bx + 10; wx < bx + 86; wx += 22) if (hash(i, wy, wx) % 3) fillRR(wx, wy, 10, 14, 2, 'rgba(255,214,140,0.7)'); }
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(540, 1150, 900, '#ff8a3c', 0.18); ctx.restore();
    fillRR(-600, 1150, 2300, 1300, 0, '#4a3a5a'); for (let i = 0; i < 14; i++) line(-600 + i * 180, 1150, -900 + i * 260, 2400, 4, 'rgba(0,0,0,0.18)');
    for (let i = 0; i < 18; i++) line(-300 + i * 90, 1150, -300 + i * 90, 990, 8, '#c9cfdb'); line(-600, 990, 1700, 990, 12, '#e9edf6');
    stringLights(-300, 1400, 120, 70); ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 14; i++) glow(-260 + i * 120, 120 + Math.sin((i / 13) * Math.PI) * 70, 50, '#ffd98a', 0.4); ctx.restore();
    plant(80, 1250, 0.8); plant(1000, 1250, 0.8);
  });
}
function cocktail(x, y, s, lvl = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); poly([[-60, -90], [60, -90], [0, 0]], 'rgba(220,240,255,0.55)'); if (lvl > 0) poly([[-60 * lvl, -90 + 90 * (1 - lvl)], [60 * lvl, -90 + 90 * (1 - lvl)], [0, 0]], '#ff6aa8'); line(0, 0, 0, 80, 7, 'rgba(220,240,255,0.8)'); ell(0, 84, 40, 9, 'rgba(220,240,255,0.8)'); circ(46, -96, 16, '#ffd23f'); line(-20, -140, 10, -40, 5, '#41f08a'); ctx.restore(); }
function remote(x, y, s, rot = 0, press = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); fillRR(-40, -150, 80, 300, 30, '#22202c'); circ(0, -110, 16, press ? '#ff8080' : '#e8262f'); for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) circ(-16 + j * 32, -50 + i * 40, 10, '#4a4658'); ctx.restore(); }
// a deed for a plot on the moon, with a stamp
function moonDeed(x, y, s, stampT, rot = -0.05) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shadowEll(0, 250, 260, 24, 0.3);
  fillRR(-260, -230, 520, 460, 14, '#fbf3dc'); ctx.lineWidth = 10; ctx.strokeStyle = '#c9a24a'; ctx.strokeRect(-236, -206, 472, 412);
  tText('URKUNDE', 0, -160, 50, { color: '#8a5a00', shadow: false, letter: 4 }); tText('GRUNDSTÜCK AUF DEM MOND', 0, -100, 28, { color: '#1b1530', shadow: false, maxW: 440 });
  moonBall(0, 10, 70, { halo: 0, plots: 1, sold: 0.15 }); for (let i = 0; i < 3; i++) line(-180, 120 + i * 32, 180, 120 + i * 32, 5, '#d9cfb0');
  if (TT > stampT) { const k = springEase(TT - stampT, 300, 12), sc = 1 + (1 - k) * 1.2; ctx.save(); ctx.translate(90, 60); ctx.rotate(-0.25); ctx.scale(sc, sc); ctx.globalAlpha = clamp(k * 1.4);
    ctx.lineWidth = 12; ctx.strokeStyle = '#e8262f'; ctx.strokeRect(-150, -48, 300, 96); tText('VERKAUFT', 0, 4, 58, { color: '#e8262f', shadow: false }); ctx.restore(); }
  ctx.restore();
}
// a sales booth on the moon: a counter with the moon map, a sign
function moonBooth(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  fillRR(-420, -260, 840, 260, 18, '#7a3cff'); fillRR(-420, -260, 840, 60, 18, '#5a2bd6'); for (let i = 0; i < 7; i++) fillRR(-410 + i * 120, -200, 60, 200, 0, 'rgba(255,255,255,0.08)');
  line(-380, -260, -380, -720, 16, '#c9cfdb'); line(380, -260, 380, -720, 16, '#c9cfdb'); fillRR(-440, -800, 880, 130, 20, '#ffd23f'); tText('MOND-GRUNDSTÜCKE', 0, -735, 64, { color: '#1b1530', shadow: false, maxW: 820 });
  ctx.restore(); }
