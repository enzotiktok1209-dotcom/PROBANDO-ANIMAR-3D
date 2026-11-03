// =====================================================================
//  PROPS — reusable set pieces for the piece's scenes (flat-noite look)
// =====================================================================
const LT = () => TT - E0;                       // local time inside the current shot
const ATS = (dt) => E0 + dt;                    // a time relative to the shot start
// shade helper: darken a hex by k (0..1)
function fnDark(hex, k) { const n = parseInt(hex.slice(1), 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255; return `rgb(${Math.round(r * (1 - k))},${Math.round(g * (1 - k))},${Math.round(b * (1 - k))})`; }
function fnLight(hex, k) { const n = parseInt(hex.slice(1), 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255; return `rgb(${Math.round(r + (255 - r) * k)},${Math.round(g + (255 - g) * k)},${Math.round(b + (255 - b) * k)})`; }
// a shipping container side: corrugated, code stencil, rust spots, a sticker
function fnContainer(x, y, w, h, col, code = 'HLXU 2290', o = {}) {
  fnRect(x, y, w, h, col);
  const n = Math.max(6, Math.round(w / 34));
  for (let i = 0; i < n; i++) { const xx = x + (i + 0.5) * w / n; fnRect(xx - w / n * 0.18, y + 12, w / n * 0.36, h - 24, fnDark(col, 0.22)); }
  fnRect(x, y, w, 12, fnLight(col, 0.18)); fnRect(x, y + h - 14, w, 14, fnDark(col, 0.35));
  fnRect(x, y, 10, h, fnDark(col, 0.4)); fnRect(x + w - 10, y, 10, h, fnDark(col, 0.4));
  const R = RNG('rust', code, Math.round(x)); for (let i = 0; i < 7; i++) fnEll(x + R.r(20, w - 20), y + R.r(20, h - 20), R.r(6, 18), R.r(3, 9), 'rgba(120,60,20,0.35)');
  if (code) { ctx.save(); ctx.font = `800 ${Math.min(46, w * 0.12)}px ${FONT_MONO}`; ctx.fillStyle = 'rgba(255,255,255,0.78)'; ctx.textAlign = 'left'; ctx.fillText(code, x + w * 0.12, y + h * 0.2); ctx.restore(); }
  if (o.sticker) { fnRR(x + w * 0.6, y + h * 0.55, 90, 54, 4, '#f3efe2'); fnMono(o.sticker, x + w * 0.6 + 45, y + h * 0.55 + 27, 18, '#c0302a'); }
}
// a brick wall (unplastered, Rio favela style)
function fnBrick(x, y, w, h, col = '#9a4f33', o = {}) {
  fnRect(x, y, w, h, fnDark(col, 0.25));
  const bw = o.bw || 62, bh = o.bh || 26, R = RNG('brick', Math.round(x), Math.round(y));
  for (let j = 0; j * bh < h; j++) for (let i = -1; i * bw < w; i++) {
    const bx = x + i * bw + (j % 2) * bw / 2 + 2, by = y + j * bh + 2;
    if (bx > x + w || bx + bw < x) continue;
    const v = R.f(); fnRect(Math.max(x, bx), by, Math.min(bw - 4, x + w - bx), bh - 4, v < 0.15 ? fnDark(col, 0.12) : v > 0.9 ? fnLight(col, 0.08) : col);
  }
  if (o.plaster) { R.f(); for (let i = 0; i < 4; i++) fnRR(x + R.r(0, w - 200), y + R.r(0, h - 120), R.r(120, 260), R.r(60, 140), 20, '#c8b8a0'); }
}
// wet ground with reflections of lights
function fnWetGround(y, col, refl = []) {
  fnRect(-400, y, W + 800, H + 600 - y, col);
  for (let i = 0; i < 9; i++) fnRect(-400, y + 30 + i * i * 9, W + 800, 2, 'rgba(255,255,255,0.03)');
  refl.forEach(([x, c, a]) => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = a ?? 0.35; ctx.fillStyle = fnLinGrad(0, y, 0, y + 500, [[0, c], [1, 'rgba(0,0,0,0)']]); ctx.fillRect(x - 30, y, 60, 500); ctx.restore(); });
}
// distant port skyline: cranes, Museu do Amanhã silhouette, Rio-Niterói bridge lights
function fnPortSkyline(y, o = {}) {
  const c = o.c || '#1a2150';
  fnRect(-400, y - 6, W + 800, 6, '#2b3576');
  for (let i = 0; i < 26; i++) { const x = -300 + i * 70; fnCirc(x, y - 30 - Math.sin(i) * 4, 3, 'rgba(255,220,140,0.75)'); }   // bridge lights
  // cranes
  [[120, 1], [860, -1]].forEach(([x, f]) => { fnRect(x - 10, y - 360, 20, 360, c); fnRect(x - 10 - (f < 0 ? 260 : 0), y - 370, 280, 18, c); fnLine(x, y - 360, x + f * 250, y - 352, 4, c); fnCirc(x + f * 250, y - 375, 6, mod(TT, 1.4) < 0.7 ? FN.red : '#5a1a22'); fnGlow(x + f * 250, y - 375, 40, FN.red, mod(TT, 1.4) < 0.7 ? 0.6 : 0); });
  // Museu do Amanhã: a long spine with ribs (simplified, glowing)
  if (o.museu !== false) { const mx = o.mx ?? 540; fnPoly([[mx - 300, y], [mx - 220, y - 60], [mx + 200, y - 80], [mx + 320, y - 20], [mx + 330, y]], '#2c3a7a'); for (let i = 0; i < 12; i++) fnLine(mx - 220 + i * 36, y - 60 - i * 1.6, mx - 250 + i * 40, y - 140 - Math.sin(i / 11 * Math.PI) * 40, 6, '#3b4c9a'); fnGlow(mx, y - 40, 260, 'rgba(90,140,255,0.35)', 0.6); }
}
// a police car (Brazilian: white with blue stripe, roof bar); face: 1 = facing right
function fnPoliceCar(x, y, s, face = 1, sirenRate = 2.4) {
  const sr = fnSiren(TT + x * 0.001, sirenRate);
  ctx.save(); ctx.translate(x, y); ctx.scale(s * face, s);
  fnEll(0, 6, 230, 22, 'rgba(0,0,0,0.4)');
  fnRR(-220, -120, 440, 90, 30, '#e9ecf4'); fnRR(-130, -190, 250, 90, 40, '#e9ecf4');
  fnRR(-115, -178, 105, 66, 14, '#22305a'); fnRR(5, -178, 100, 66, 14, '#22305a');
  fnRect(-220, -82, 440, 16, '#2257c9'); fnMono('POLÍCIA', -10, -52, 30, '#2257c9');
  fnRR(-60, -214, 120, 24, 8, '#222'); fnRR(-58, -212, 56, 20, 6, sr.red > 0.1 ? '#ff3b4a' : '#5a1a22'); fnRR(2, -212, 56, 20, 6, sr.blue > 0.1 ? '#2f7bff' : '#1a2a5a');
  fnCirc(-130, -28, 42, '#15161c'); fnCirc(130, -28, 42, '#15161c'); fnCirc(-130, -28, 18, '#9aa0b0'); fnCirc(130, -28, 18, '#9aa0b0');
  fnEll(212, -95, 14, 12, '#fff6c8'); fnGlow(212, -95, 70, '#fff3b0', 0.5);
  ctx.restore();
  fnGlow(x - 30 * s * face, y - 210 * s, 300 * s, FN.red, sr.red * 0.75); fnGlow(x + 30 * s * face, y - 210 * s, 300 * s, FN.blue, sr.blue * 0.75);
  return sr;
}
// a quadcopter drone with a red eye
function fnDrone(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.tilt || 0); ctx.scale(s, s);
  [[-110, -1], [110, 1]].forEach(([dx]) => { fnLine(0, 0, dx, -20, 14, '#2c2f3a'); const sp = TT * 60; fnEll(dx, -30, 70 * Math.abs(Math.cos(sp + dx)), 8, 'rgba(200,210,230,0.45)'); fnCirc(dx, -24, 8, '#3a3d48'); });
  fnRR(-55, -20, 110, 46, 18, '#3a3d4a'); fnRR(-40, 18, 80, 18, 8, '#23252d'); fnCirc(0, 34, 12, '#111');
  const on = mod(TT * 2, 1) < 0.5; fnCirc(0, 34, 6, on ? FN.red : '#5a1a22'); fnCirc(-42, -4, 5, on ? FN.red : '#5a1a22');
  ctx.restore(); fnGlow(x, y + 34 * s, 50 * s, FN.red, on ? 0.7 : 0.2);
}
// floodlight lamp head
function fnLamp(x, y, s, on, ang = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  fnRR(-60, -40, 120, 80, 14, '#2a2d38'); fnRR(-50, -30, 100, 60, 10, on ? '#fffdf0' : '#3a3e4c');
  ctx.restore(); if (on) { fnGlow(x, y, 260 * s, '#ffffff', 0.9 * on); fnGlow(x, y, 600 * s, 'rgba(255,250,220,0.6)', 0.5 * on); }
}
// string of festa junina flags / bandeirinhas
function fnFlags(x0, y0, x1, y1, sag, n, cols = ['#ffd23f', '#1fae4b', '#2f7bff', '#ff3b4a', '#ffffff']) {
  const P = []; for (let i = 0; i <= n; i++) { const u = i / n; P.push([lerp(x0, x1, u), lerp(y0, y1, u) + Math.sin(u * Math.PI) * sag]); }
  fnStroke(P, 2, 'rgba(255,255,255,0.4)');
  for (let i = 0; i < n; i++) { const [x, y] = P[i], [x2, y2] = P[i + 1], sw = Math.sin(TT * 3 + i) * 3; fnPoly([[x, y], [x2, y2], [(x + x2) / 2 + sw, (y + y2) / 2 + 34]], cols[i % cols.length]); }
}
// clothesline with clothes swaying
function fnClothes(x0, y0, x1, n, seed) {
  fnLine(x0, y0, x1, y0 + 10, 2, '#bbb'); const R = RNG('cl', seed);
  for (let i = 0; i < n; i++) { const x = lerp(x0, x1, (i + 0.5) / n), w = R.r(50, 90), h = R.r(60, 120), c = ['#e85a7a', '#4aa8ff', '#ffd23f', '#ffffff', '#7ad866'][i % 5];
    ctx.save(); ctx.translate(x, y0 + 5); ctx.rotate(Math.sin(TT * 2.2 + i) * 0.08); fnRR(-w / 2, 0, w, h, 6, c); fnRR(-w / 2, 0, w, 10, 3, fnDark(c, 0.2)); ctx.restore(); }
}
// a little Brazil flag
function fnBRFlag(x, y, w, wave = 1) {
  const h = w * 0.7; ctx.save(); ctx.translate(x, y); ctx.transform(1, Math.sin(TT * 2) * 0.03 * wave, 0, 1, 0, 0);
  fnRect(-w / 2, -h / 2, w, h, '#1fae4b'); fnPoly([[0, -h * 0.42], [w * 0.44, 0], [0, h * 0.42], [-w * 0.44, 0]], '#ffd23f'); fnCirc(0, 0, h * 0.25, '#1d3b9a');
  fnLine(-h * 0.25, -h * 0.03, h * 0.25, h * 0.05, h * 0.05, '#ffffff'); ctx.restore();
}
// a night city block (São Paulo / Rio), lit windows flicker
function fnCity(y, o = {}) {
  const R = RNG('city', o.seed || 1), cols = o.cols || [FN.navy3, '#252c66', '#323a80'];
  let x = -300;
  while (x < W + 300) { const w = R.r(120, 240), h = R.r(300, 900), c = cols[Math.floor(R.f() * cols.length)];
    fnRect(x, y - h, w, h, c); for (let wy = y - h + 30; wy < y - 40; wy += 46) for (let wx = x + 18; wx < x + w - 30; wx += 40) { const v = R.f(); if (v < 0.42) { const fl = (v < 0.03 && mod(TT * 3 + wx, 2) < 0.2) ? 0.3 : 1; fnRect(wx, wy, 22, 28, `rgba(245,199,90,${0.85 * fl})`); } else fnRect(wx, wy, 22, 28, 'rgba(10,14,40,0.5)'); }
    x += w + R.r(4, 20); }
}
// a rotating radar/HUD ring
function fnRing(x, y, r, col, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(TT * 0.6); ctx.setLineDash([18, 14]); ctx.lineWidth = 3; ctx.strokeStyle = col; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.stroke(); ctx.setLineDash([]); ctx.rotate(-TT * 1.4); ctx.beginPath(); ctx.arc(0, 0, r * 0.86, 0.2, 1.6); ctx.stroke(); ctx.restore(); }
// corner brackets around a target box
function fnBrackets(x, y, w, h, col, len = 50, lw = 6) {
  [[x, y, 1, 1], [x + w, y, -1, 1], [x, y + h, 1, -1], [x + w, y + h, -1, -1]].forEach(([a, b, sx, sy]) => fnStroke([[a, b + sy * len], [a, b], [a + sx * len, b]], lw, col));
}
// the Kombi (VW T2, white over a faded blue bottom, rust, "Jesus te ama" sticker), front 3/4 → drawn as side view
function fnKombi(x, y, s, face = 1, o = {}) {
  ctx.save(); ctx.translate(x, y + (o.pitch ? Math.sin(o.pitch) * 0 : 0)); ctx.scale(s * face, s); ctx.rotate(o.nose || 0);
  fnEll(0, 8, 330, 28, 'rgba(0,0,0,0.45)');
  fnRR(-310, -330, 620, 300, 70, '#ecebe2'); fnRR(-310, -170, 620, 140, 40, '#5f86b8');
  fnRect(-310, -175, 620, 14, '#d9d6c8');
  [-230, -100, 30].forEach((wx) => fnRR(wx, -305, 110, 95, 16, '#1d2748')); fnRR(165, -305, 120, 110, 20, '#24305a');
  fnRR(150, -160, 150, 22, 8, '#c9c6b8'); fnEll(292, -120, 20, 18, '#fff7c8');
  fnCirc(-190, -30, 58, '#15161c'); fnCirc(190, -30, 58, '#15161c'); fnCirc(-190, -30, 26, '#c9c9d2'); fnCirc(190, -30, 26, '#c9c9d2');
  const R = RNG('kombirust'); for (let i = 0; i < 9; i++) fnEll(R.r(-280, 280), R.r(-80, -40), R.r(8, 22), R.r(4, 10), 'rgba(140,70,30,0.55)');
  fnRR(-140, -300, 70, 22, 4, '#f3efe2'); ctx.save(); ctx.font = `800 12px ${FONT_MONO}`; ctx.fillStyle = '#c0302a'; ctx.textAlign = 'center'; ctx.fillText('JESUS TE AMA', -105, -285); ctx.restore();
  fnRR(200, -85, 96, 34, 4, '#ffffff'); fnRect(200, -85, 96, 9, '#1d3b9a'); fnMono('BRA2E19', 248, -62, 18, '#111');
  ctx.restore();
  if (o.lights) { fnGlow(x + 292 * s * face, y - 120 * s, 260 * s, '#fff3c0', o.lights); fnCone(x + 292 * s * face, y - 120 * s, -face * Math.PI / 2, 1400 * s, 300 * s, 'rgba(255,245,200,0.9)', 0.3 * o.lights); }
}
// a palm-sized smartphone (mom's phone: floral case)
function fnPhone(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  fnRR(-130, -250, 260, 500, 40, '#e86a9a'); const R = RNG('flor'); for (let i = 0; i < 14; i++) { const fx = R.r(-115, 115), fy = R.r(-235, 235); for (let p = 0; p < 5; p++) fnCirc(fx + Math.cos(p * 1.26) * 9, fy + Math.sin(p * 1.26) * 9, 6, '#ffe1ee'); fnCirc(fx, fy, 5, '#ffd23f'); }
  fnRR(-115, -232, 230, 464, 30, '#0d1230');
  if (o.screen) o.screen();
  ctx.restore();
}
