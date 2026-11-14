// =====================================================================
//  props17.js — 20 Mio. vs 50 Cent/s: the 50-cent coin, "+0,50 €" pops, a wall calendar that gets crossed off,
//  a big luxury yacht, the yacht deck (day / party night), champagne bottle + glass, a traffic jam,
//  a giant curling wave, dripping water, a sofa cushion lifted on hidden coins.
// =====================================================================
// the 50-cent coin: Nordic-gold, ridged rim, a big "50", "EURO CENT"; sx < 1 squashes it for a spin
function coin50(x, y, r, o = {}) {
  const sx = o.sx ?? 1, a = Math.max(0.04, Math.abs(sx)); ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0); ctx.scale(a, 1);
  circ(r * 0.06, r * 0.09, r * 1.02, 'rgba(0,0,0,0.28)'); circ(0, 0, r, '#b8860b'); circ(0, 0, r * 0.93, '#e7b93a'); circ(0, 0, r * 0.8, '#f5cf5a');
  for (let i = 0; i < 36; i++) { const an = i / 36 * TAU; line(Math.cos(an) * r * 0.94, Math.sin(an) * r * 0.94, Math.cos(an) * r * 0.99, Math.sin(an) * r * 0.99, r * 0.025, '#9a6e08'); }
  for (let i = 0; i < 12; i++) { const an = i / 12 * TAU - Math.PI / 2; sparkle(Math.cos(an) * r * 0.86, Math.sin(an) * r * 0.86, r * 0.035, '#fff4c0'); }
  if (a > 0.3) { tText('50', 0, -r * 0.08, r * 0.78, { color: '#8a5a00', shadow: false }); tText('EURO CENT', 0, r * 0.45, r * 0.15, { color: '#8a5a00', shadow: false, letter: 1 }); }
  ell(-r * 0.38, -r * 0.42, r * 0.2, r * 0.08, 'rgba(255,255,255,0.55)', -0.6); ctx.restore();
}
// "+0,50 €" pops rising at `rate` per second since t0 (rate 2 = one every half second)
function plus50(cx, cy, rate, t0, seed = 'p50', spread = 230, size = 62) {
  if (TT < t0) return; const n = Math.floor((TT - t0) * rate);
  for (let k = Math.max(0, n - 16); k <= n; k++) { const tb = t0 + k / rate, u = (TT - tb) / 1.1; if (u < 0 || u > 1) continue; const R = RNG(seed, k);
    ctx.save(); ctx.globalAlpha = u < 0.75 ? 1 : 1 - (u - 0.75) / 0.25; ctx.translate(cx + R.n(spread), cy - u * 300 - R.f() * 50); const k2 = springEase(TT - tb, 320, 12); ctx.scale(k2, k2);
    tText('+0,50 €', 0, 0, size, { color: '#41f08a', stroke: '#0a3a1a', strokeW: size * 0.18 }); ctx.restore(); }
}
// a small live counter box: Kevin's account, growing 0,50 € per second from t0 (offset v0)
function kevinTicker(x, y, s, t0, v0 = 0, rate = 0.5, label = 'KONTO · KEVIN') {
  const v = v0 + Math.max(0, TT - t0) * rate; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  fillRR(-260 + 6, -80 + 10, 520, 160, 26, 'rgba(0,0,0,0.35)'); fillRR(-260, -80, 520, 160, 26, '#0f2a1a'); fillRR(-260, -80, 520, 46, 22, '#1a4a2c');
  tText(label, 0, -57, 24, { color: '#a6f0c0', shadow: false, letter: 3 });
  tText(fmtEUR(v, true), 0, 28, 62, { color: '#41f08a', stroke: '#06180c', strokeW: 10 }); ctx.restore();
}
// a wall calendar: "2027 · 365 TAGE", a 7 x 5 grid; `crossed` cells get a red X (drawn on with progress p for the last one)
function wallCalendar(x, y, s, crossed = 0, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot ?? 0);
  line(0, -330, 0, -290, 10, '#555'); circ(0, -336, 14, '#888'); circ(0, -336, 7, '#444');   // the nail
  fillRR(-266 + 10, -290 + 14, 532, 600, 22, 'rgba(0,0,0,0.25)'); fillRR(-266, -290, 532, 600, 22, '#ffffff'); fillRR(-266, -290, 532, 130, 22, '#e8262f'); ctx.fillStyle = '#e8262f'; ctx.fillRect(-266, -190, 532, 30);
  for (let i = -3; i <= 3; i++) { circ(i * 70, -290, 12, '#2b2b36'); }
  tText(o.title ?? '1 JAHR · 365 TAGE', 0, -228, 46, { color: '#fff', shadow: false, maxW: 500 });
  const days = ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO']; days.forEach((d, i) => tText(d, -210 + i * 70, -128, 22, { color: '#8a8fa6', shadow: false }));
  const cells = 35, last = o.last ?? false;
  for (let k = 0; k < cells; k++) { const c = k % 7, r = Math.floor(k / 7), cx = -210 + c * 70, cy = -70 + r * 74;
    fillRR(cx - 30, cy - 30, 60, 60, 10, last && k === cells - 1 ? '#ffe14d' : '#eef0f6');
    tText(last && k === cells - 1 ? '365' : String(o.start != null ? o.start + k : k + 1), cx, cy + 2, last && k === cells - 1 ? 24 : 28, { color: '#1b1530', shadow: false });
    const p = k < crossed - 1 ? 1 : k === crossed - 1 ? (o.p ?? 1) : 0;
    if (p > 0) { ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 9; ctx.strokeStyle = '#e8262f'; const u1 = clamp(p * 2), u2 = clamp(p * 2 - 1);
      ctx.beginPath(); ctx.moveTo(cx - 24, cy - 24); ctx.lineTo(cx - 24 + 48 * u1, cy - 24 + 48 * u1); ctx.stroke(); if (u2 > 0) { ctx.beginPath(); ctx.moveTo(cx + 24, cy - 24); ctx.lineTo(cx + 24 - 48 * u2, cy - 24 + 48 * u2); ctx.stroke(); } ctx.restore(); } }
  ctx.restore();
}
// a thick red marker (held in a hand: its tip at 0,0 pointing down-left)
function marker(x, y, s, rot = -0.6) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); fillRR(-14, -150, 28, 130, 10, '#e8262f'); fillRR(-14, -150, 28, 30, 8, '#b01a20'); poly([[-14, -20], [14, -20], [6, 6], [-6, 6]], '#f4f4f8'); poly([[-6, 6], [6, 6], [0, 18]], '#e8262f'); ctx.restore(); }
// a hammer
function hammer(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); fillRR(-12, -20, 24, 190, 10, '#a8733f'); fillRR(-70, -60, 140, 50, 10, '#5a5f73'); fillRR(-70, -60, 140, 14, 6, '#8a90a6'); ctx.restore(); }
// a big luxury yacht (side view): three white decks, dark windows, a gold stripe, a name, a flag; `party` adds string lights
function bigYacht(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const bob = Math.sin(TT * 1.8) * 6, rk = Math.sin(TT * 1.3) * 0.012; ctx.translate(0, bob); ctx.rotate(rk);
  ell(0, 60, 560, 40, 'rgba(10,40,80,0.35)');
  poly([[-520, -40], [520, -40], [430, 70], [-470, 70]], '#ffffff'); poly([[-520, -40], [520, -40], [505, -20], [-510, -20]], '#e9edf6');
  line(-500, 22, 470, 22, 12, '#d9a520'); line(-470, 66, 430, 66, 10, '#1d2a4a');
  tText(o.name ?? 'JONAS I', -300, -2, 40, { color: '#1d2a4a', shadow: false, letter: 3 });
  for (let i = 0; i < 9; i++) ell(-120 + i * 62, -2, 16, 9, '#1d2a4a');
  poly([[-380, -40], [-340, -150], [380, -150], [450, -40]], '#f6f7fb'); fillRR(-320, -130, 660, 54, 14, '#1b2440'); for (let i = 0; i < 8; i++) line(-280 + i * 80, -130, -280 + i * 80, -76, 4, '#f6f7fb');
  poly([[-240, -150], [-200, -240], [250, -240], [300, -150]], '#ffffff'); fillRR(-190, -226, 420, 46, 12, '#1b2440');
  poly([[-120, -240], [-90, -300], [160, -300], [190, -240]], '#eef1f8'); fillRR(-70, -292, 220, 34, 10, '#1b2440');
  line(30, -300, 30, -420, 8, '#c0c6d6'); line(-20, -380, 80, -380, 6, '#c0c6d6'); circ(30, -424, 12, '#e8262f');
  { const w = Math.sin(TT * 6) * 10; poly([[-470, -40], [-470, -150], [-400 + w, -130], [-470, -110]], '#e8262f'); line(-470, -40, -470, -160, 6, '#8a8fa6'); }
  for (let i = 0; i < 5; i++) { const hx = -360 + i * 170; line(hx, -40, hx, -70, 4, '#c0c6d6'); } line(-380, -70, 420, -70, 4, '#c0c6d6');
  if (o.party) { for (let i = 0; i < 14; i++) { const u = i / 13, px = lerp(-460, 30, u), py = -150 + Math.sin(u * Math.PI) * 60 - 260 * u; const col = ['#ff4fa3', '#ffd23f', '#52b8ff', '#41f08a'][i % 4]; glow(px, py, 30, col, 0.6 * (0.6 + 0.4 * Math.sin(TT * 7 + i))); circ(px, py, 9, col); }
    for (let i = 0; i < 14; i++) { const u = i / 13, px = lerp(30, 500, u), py = -410 + 370 * u - Math.sin(u * Math.PI) * 50; const col = ['#52b8ff', '#ff4fa3', '#ffd23f'][i % 3]; glow(px, py, 30, col, 0.6 * (0.6 + 0.4 * Math.sin(TT * 6 + i))); circ(px, py, 9, col); } }
  ctx.restore();
}
// open sea backdrop (day or party night): sky, sun / moon, far coast with a villa, glinting water
function setSea(o = {}) {
  withBlur(o.blur, () => {
    const n = o.night ?? 0;
    ctx.fillStyle = n ? lin(0, -400, 0, 1000, [[0, '#0b0730'], [0.7, '#3a1a6a'], [1, '#ff6a8a']]) : lin(0, -400, 0, 1000, [[0, '#2f8cf0'], [0.75, '#9fd8ff'], [1, '#ffe7b0']]); ctx.fillRect(-600, -400, 2300, 1500);
    if (n) { const R = RNG('seaStars'); for (let i = 0; i < 60; i++) circ(R.f() * 1500 - 200, R.f() * 700 - 300, 1.5 + R.f() * 2.5, 'rgba(255,255,255,0.7)'); circ(840, 230, 70, '#fff3c0'); glow(840, 230, 240, '#fff3c0', 0.3); }
    else { glow(820, 260, 360, '#fff3a6', 0.45); circ(820, 260, 100, '#fff6c8'); for (const [cx, cy, sc] of [[160, 200, 1], [560, 90, 0.7]]) { const dx = (TT * 12) % 60; ell(cx + dx, cy, 120 * sc, 40 * sc, 'rgba(255,255,255,0.9)'); ell(cx + dx + 70 * sc, cy - 24 * sc, 76 * sc, 44 * sc, 'rgba(255,255,255,0.9)'); } }
    ctx.fillStyle = n ? '#2a2550' : '#5a9a6a'; ctx.beginPath(); ctx.moveTo(-600, 1000); ctx.quadraticCurveTo(-200, 900, 200, 960); ctx.quadraticCurveTo(450, 990, 560, 1000); ctx.closePath(); ctx.fill();
    ctx.fillStyle = n ? lin(0, 990, 0, 1700, [[0, '#2a3a8a'], [1, '#0a1240']]) : lin(0, 990, 0, 1700, [[0, '#2aa6e8'], [1, '#0b5c98']]); ctx.fillRect(-600, 995, 2300, 1300);
    for (let i = 0; i < 16; i++) { const yy = 1020 + i * 40, off = Math.sin(TT * 1.6 + i) * 34, a = (i * 137) % 300, b = (i * 91) % 240; line(-600 + off + a, yy, -320 + off + a, yy, 4 + i * 0.3, n ? 'rgba(255,200,240,0.25)' : 'rgba(255,255,255,0.35)'); line(520 - off - b, yy + 16, 800 - off - b, yy + 16, 4 + i * 0.3, n ? 'rgba(255,200,240,0.2)' : 'rgba(255,255,255,0.3)'); }
    if (!n) { const gx = ((TT * 80) % 1600) - 260, f = Math.sin(TT * 11) * 14; ctx.save(); ctx.translate(gx, 520 + Math.sin(TT * 3) * 20); ctx.lineWidth = 6; ctx.strokeStyle = '#fff'; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-40, f); ctx.quadraticCurveTo(-20, -20, 0, 0); ctx.quadraticCurveTo(20, -20, 40, f); ctx.stroke(); ctx.restore(); }
  });
}
// on the yacht's deck: teak floor, white railing, the sea behind, a lounger, an ice bucket; party adds lights + glow
function setYachtDeck(o = {}) {
  withBlur(o.blur, () => {
    setSea({ night: o.night });
    ctx.fillStyle = '#f6f7fb'; ctx.fillRect(-600, 1180, 2300, 30); for (let i = 0; i < 26; i++) line(-600 + i * 90, 1180, -600 + i * 90, 1330, 8, '#e1e5ef'); line(-600, 1180, 1700, 1180, 14, '#ffffff'); line(-600, 1260, 1700, 1260, 6, '#e1e5ef');
    ctx.fillStyle = lin(0, 1330, 0, 2100, [[0, '#c98a4a'], [1, '#8a5a2a']]); ctx.fillRect(-600, 1330, 2300, 900); for (let i = 0; i < 30; i++) line(-600 + i * 80, 1330, -600 + i * 80 + (i - 15) * 30, 2200, 4, 'rgba(60,30,10,0.35)');
    // ice bucket with a bottle
    ctx.save(); ctx.translate(900, 1420); fillRR(-60, -20, 120, 110, 18, '#c0c6d6'); fillRR(-60, -20, 120, 20, 8, '#e1e5ef'); champBottle(10, -20, 0.55, -0.25); ctx.restore();
    if (o.night) { for (let i = 0; i < 18; i++) { const u = i / 17, px = lerp(-100, 1180, u), py = 260 + 140 * Math.sin(u * Math.PI); const col = ['#ff4fa3', '#ffd23f', '#52b8ff', '#41f08a'][i % 4]; glow(px, py, 40, col, 0.55 * (0.6 + 0.4 * Math.sin(TT * 7 + i))); circ(px, py, 12, col); }
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 4; i++) { const a = Math.sin(TT * 1.5 + i * 1.7) * 0.5; ctx.save(); ctx.translate(140 + i * 270, 1340); ctx.rotate(a); ctx.fillStyle = ['rgba(255,79,163,0.18)', 'rgba(82,184,255,0.18)', 'rgba(255,210,63,0.16)', 'rgba(65,240,138,0.16)'][i]; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(14, 0); ctx.lineTo(160, -1200); ctx.lineTo(-160, -1200); ctx.fill(); ctx.restore(); } ctx.restore(); }
  });
}
// a champagne bottle (base at 0,0) and a flute (base at 0,0, lvl = how full)
function champBottle(x, y, s, rot = 0, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  fillRR(-50, -260, 100, 260, 30, '#1f5a2e'); poly([[-50, -230], [50, -230], [22, -330], [-22, -330]], '#1f5a2e'); fillRR(-22, -420, 44, 100, 10, '#1f5a2e');
  fillRR(-24, -430, 48, 90, 10, '#d9a520'); fillRR(-46, -190, 92, 110, 10, '#f4ead0'); tText('CHAMPAGNER', 0, -150, 13, { color: '#8a5a00', shadow: false }); circ(0, -110, 16, '#d9a520');
  fillRR(-36, -240, 14, 200, 7, 'rgba(255,255,255,0.25)');
  if (o.spray) { for (let i = 0; i < 26; i++) { const R = RNG('spray', i), u = ((TT * 2.2 + R.f()) % 1); ctx.globalAlpha = 1 - u; circ(R.n(40) * u * 4, -440 - u * (380 + R.f() * 200), 8 + R.f() * 10, '#fff4c8'); } ctx.globalAlpha = 1; }
  ctx.restore();
}
function champGlass(x, y, s, lvl = 1, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ell(0, 0, 50, 12, 'rgba(255,255,255,0.8)'); line(0, 0, 0, -110, 8, 'rgba(255,255,255,0.85)');
  ctx.save(); ctx.beginPath(); ctx.moveTo(-38, -260); ctx.lineTo(38, -260); ctx.lineTo(24, -110); ctx.lineTo(-24, -110); ctx.closePath(); ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fill(); ctx.clip();
  ctx.fillStyle = lin(0, -260, 0, -110, [[0, '#ffe58a'], [1, '#e7b93a']]); ctx.fillRect(-40, -110 - 150 * lvl, 80, 150 * lvl);
  for (let i = 0; i < 5; i++) { const R = RNG('bub', i), u = (TT * 0.9 + R.f()) % 1; circ(R.n(18), -112 - u * 140 * lvl, 3, 'rgba(255,255,255,0.8)'); } ctx.restore();
  ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(255,255,255,0.9)'; ctx.beginPath(); ctx.moveTo(-38, -260); ctx.lineTo(-24, -110); ctx.lineTo(24, -110); ctx.lineTo(38, -260); ctx.stroke();
  ctx.restore();
}
// a traffic jam: city towers, a highway with rows of cars and brake lights, a "STAU" sign
function setTraffic(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, -400, 0, 1100, [[0, '#ff9a5a'], [0.6, '#ffc88a'], [1, '#ffe2b8']]); ctx.fillRect(-600, -400, 2300, 1500);
    glow(540, 700, 500, '#fff1c0', 0.35);
    for (let i = 0; i < 16; i++) { const x = -200 + i * 96, h = 260 + ((i * 71) % 380); fillRR(x, 1000 - h, 84, h, 4, i % 2 ? '#6a5a8a' : '#7d6c9e'); for (let r = 0; r < h / 46 - 1; r++) for (let c = 0; c < 3; c++) fillRR(x + 10 + c * 24, 1000 - h + 18 + r * 44, 16, 24, 3, (r + c + i) % 4 ? 'rgba(255,230,160,0.55)' : 'rgba(40,30,70,0.5)'); }
    ctx.fillStyle = '#4a4a5a'; ctx.fillRect(-600, 1000, 2300, 1200); for (let i = 0; i < 4; i++) for (let k = 0; k < 14; k++) fillRR(-500 + k * 160 + (i % 2) * 60, 1080 + i * 150, 80, 12, 6, '#f2f2f2');
    for (let row = 0; row < 3; row++) for (let k = 0; k < 7; k++) { const cx = -120 + k * 230 + row * 70, cy = 1060 + row * 110, s = 0.28 + row * 0.06; compactCar(cx, cy, s, ['#52b8ff', '#ffd23f', '#41f08a', '#ff4fa3', '#ffffff', '#ff8a1e'][(k + row * 2) % 6]); glow(cx - 150 * s, cy - 60 * s, 30, '#ff2a2a', 0.5 + 0.3 * Math.sin(TT * 4 + k)); glow(cx + 150 * s, cy - 60 * s, 30, '#ff2a2a', 0.5 + 0.3 * Math.sin(TT * 4 + k + 1)); }
    ctx.save(); ctx.translate(880, 560); line(0, 0, 0, 420, 16, '#8a90a6'); fillRR(-150, -90, 300, 150, 16, '#1e7a3a'); fillRR(-140, -80, 280, 130, 12, '#2a9a4a'); tText('STAU', 0, -24, 56, { color: '#fff', shadow: false }); tText('12 KM', 0, 30, 32, { color: '#ffe14d', shadow: false }); ctx.restore();
  });
}
// a giant curling wave rising from the right (u: 0 nothing .. 1 at full height, crash: 0..1 breaking over)
function bigWave(x, y, s, u, crash = 0) {
  if (u <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const h = 1200 * EZ.o3(clamp(u)), lip = crash * 500;
  ctx.fillStyle = lin(0, -h, 0, 200, [[0, '#7fe0ff'], [0.4, '#1fa0e0'], [1, '#0a4a8a']]);
  ctx.beginPath(); ctx.moveTo(-700, 200); ctx.quadraticCurveTo(-300, 80, -100, -h * 0.4); ctx.quadraticCurveTo(0, -h, 260 - lip, -h * 0.96); ctx.quadraticCurveTo(80 - lip, -h * 0.9, 40 - lip * 0.8, -h * 0.62 + lip * 0.3); ctx.quadraticCurveTo(300, -h * 0.85, 700, -h * 0.5); ctx.lineTo(900, 200); ctx.closePath(); ctx.fill();
  ctx.lineWidth = 26; ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-100, -h * 0.4); ctx.quadraticCurveTo(0, -h, 260 - lip, -h * 0.96); ctx.stroke();
  for (let i = 0; i < 26; i++) { const R = RNG('foam', i), a = R.f(); circ(lerp(-100, 260 - lip, a) + R.n(40), -h * (0.4 + 0.56 * Math.sin(a * Math.PI / 2)) + R.n(30) - Math.sin(TT * 8 + i) * 8, 14 + R.f() * 22, 'rgba(255,255,255,0.92)'); }
  for (let i = 0; i < 6; i++) line(-500 + i * 140, -h * 0.15 + i * 20, -380 + i * 140, -h * 0.2 + i * 20, 8, 'rgba(255,255,255,0.35)');
  ctx.restore();
}
// water dripping off something (n drops falling in a loop from y0 within a width)
function drips(x, y, w, n = 10, seed = 'dr') { for (let i = 0; i < n; i++) { const R = RNG(seed, i), u = (TT * (1.4 + R.f()) + R.f()) % 1; ctx.globalAlpha = 1 - u * 0.6; ell(x + R.n(w / 2), y + u * 260, 9, 14, '#8fdcff'); ctx.globalAlpha = 1; } }
// a sofa cushion lifted on a pile of coins (Jonas' "unterm Sofa")
function sofaCoins(x, y, s, lift) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 9; i++) { const R = RNG('sc', i); coin50(-160 + i * 40 + R.n(10), 30 + R.n(10), 26, { rot: R.n(1) }); }
  for (let i = 0; i < 5; i++) { const R = RNG('scc', i); copperCent(-120 + i * 60, 50, 18, { rot: R.n(1) }); } ctx.restore(); }
// the front door of Kevin's flat in the evening: a brick wall, a lit lamp, the door with "KEVIN" on the bell, a doormat
function setKevinDoor(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, -400, 0, 1600, [[0, '#2a1a4a'], [1, '#5a2a5a']]); ctx.fillRect(-600, -400, 2300, 2200);
    for (let r = 0; r < 40; r++) for (let c = 0; c < 16; c++) fillRR(-300 + c * 110 + (r % 2) * 55, -200 + r * 46, 100, 38, 4, (r * 7 + c * 3) % 5 ? '#9a4a3a' : '#8a3f32');
    glow(300, 420, 420, '#ffd27a', 0.45); fillRR(270, 360, 60, 90, 14, '#ffe9a6'); fillRR(262, 346, 76, 20, 8, '#2b2b36');
    door(620, 1560, 1.25, o.open ?? 0, '#3a5a8a');
    fillRR(330, 760, 110, 150, 14, '#c0c6d6'); fillRR(346, 776, 78, 40, 8, '#ffffff'); tText('KEVIN', 385, 797, 22, { color: '#1b1530', shadow: false }); circ(385, 860, 22, '#ffd23f');
    ctx.fillStyle = '#5a5a6a'; ctx.fillRect(-600, 1560, 2300, 700); fillRR(440, 1560, 360, 50, 10, '#7a5a3a'); tText('WILLKOMMEN', 620, 1586, 22, { color: '#e8d8b0', shadow: false });
  });
}
