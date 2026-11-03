// =====================================================================
//  props.js — the handheld gauge, counters, thermometer, the follow card, splashes, shock rings, icons.
//  ws(x, y) turns a world point of the current shot into a screen point (for UI attached to the action).
// =====================================================================
const ws = (x, y) => [W / 2 + (x - CAM.x) * CAM.z, FOCUS_Y + (y - CAM.y) * CAM.z];
const valvePt = (R = WR, rot = 0, a = -2.2, cx = 0, cy = 0, sag = 0) => [cx + Math.cos(rot + a) * R * 0.705, cy + sag * R * 0.1 + Math.sin(rot + a) * R * 0.705];

// a handheld digital tyre gauge pressed on the valve (world space). (x, y) = the valve, ang = the gauge's direction
function handGauge(x, y, ang, psi, color, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(o.s ?? 1, o.s ?? 1);
  // nozzle
  fillRR(-9, -60, 18, 64, 6, lin(-9, 0, 9, 0, [[0, '#e2e6eb'], [1, '#7c838c']]));
  // body
  ctx.translate(0, -60);
  fillRR(-46, -300, 92, 300, 34, lin(-46, 0, 46, 0, [[0, '#2a2d34'], [0.5, '#3c4049'], [1, '#17191e']]));
  fillRR(-50, -150, 100, 150, 30, lin(-50, 0, 50, 0, [[0, '#d79a12'], [0.5, '#ffc93a'], [1, '#a87508']]));   // yellow grip
  for (let i = 0; i < 5; i++) fillRR(-40, -138 + i * 26, 80, 10, 5, 'rgba(0,0,0,0.18)');
  // the screen faces the camera: counter-rotate
  ctx.save(); ctx.translate(0, -225); ctx.rotate(-ang);
  fillRR(-92, -50, 184, 100, 16, '#1d2027'); fillRR(-82, -40, 164, 80, 10, '#06080d');
  lcd(String(psi), 4, 0, 52, color, { ghost: rgba('#ffffff', 0.04) });
  tText('PSI', 62, 26, 15, { weight: 800, color: 'rgba(255,255,255,0.6)', shadow: false });
  ctx.restore();
  ctx.restore();
}

function checkIcon(x, y, r, c = '#3ee07f') { circle(x, y, r, c); ctx.save(); ctx.strokeStyle = '#06210f'; ctx.lineWidth = r * 0.28; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - r * 0.45, y + r * 0.02); ctx.lineTo(x - r * 0.1, y + r * 0.38); ctx.lineTo(x + r * 0.5, y - r * 0.35); ctx.stroke(); ctx.restore(); }
function flakeIcon(x, y, r, c = '#9fd8ff') { ctx.save(); ctx.translate(x, y); ctx.strokeStyle = c; ctx.lineWidth = r * 0.18; ctx.lineCap = 'round'; for (let i = 0; i < 6; i++) { ctx.rotate(Math.PI / 3); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -r); ctx.moveTo(0, -r * 0.55); ctx.lineTo(r * 0.3, -r * 0.8); ctx.moveTo(0, -r * 0.55); ctx.lineTo(-r * 0.3, -r * 0.8); ctx.stroke(); } ctx.restore(); }
function flameIcon(x, y, r) { ctx.save(); ctx.translate(x, y); ctx.beginPath(); ctx.moveTo(0, -r); ctx.bezierCurveTo(r * 0.9, -r * 0.2, r * 0.8, r, 0, r); ctx.bezierCurveTo(-r * 0.8, r, -r * 0.9, -r * 0.1, 0, -r); ctx.fillStyle = '#ff7a1a'; ctx.fill(); ctx.beginPath(); ctx.moveTo(0, -r * 0.2); ctx.bezierCurveTo(r * 0.45, r * 0.2, r * 0.4, r * 0.8, 0, r * 0.8); ctx.bezierCurveTo(-r * 0.4, r * 0.8, -r * 0.45, r * 0.3, 0, -r * 0.2); ctx.fillStyle = '#ffd26a'; ctx.fill(); ctx.restore(); }
function warnIcon(x, y, r) { ctx.save(); ctx.translate(x, y); poly([[0, -r], [r * 0.95, r * 0.75], [-r * 0.95, r * 0.75]], '#ffd23a'); fillRR(-r * 0.09, -r * 0.45, r * 0.18, r * 0.7, r * 0.09, '#2a1a00'); circle(0, r * 0.47, r * 0.11, '#2a1a00'); ctx.restore(); }

// a counting number with a label (screen space)
function counter(x, y, t0, t1, v0, v1, label, o = {}) {
  if (TT < t0) return;
  const k = springEase(TT - t0, 320, 15), v = Math.round(lerp(v0, v1, EZ.o2((TT - t0) / (t1 - t0))));
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  const str = String(v), size = o.size ?? 120, w = Math.max(360, textW(str, size, 900) + textW(label, size * 0.42, 800) + 110), h = size * 1.45;
  fillRR(-w / 2, -h / 2 + 10, w, h, 34, 'rgba(0,0,0,0.35)');
  fillRR(-w / 2, -h / 2, w, h, 34, o.bg ?? 'rgba(18,14,28,0.88)');
  rrPath(-w / 2 + 2, -h / 2 + 2, w - 4, h - 4, 32); ctx.lineWidth = 4; ctx.strokeStyle = rgba(o.c ?? '#ffd23a', 0.6); ctx.stroke();
  const tw = textW(str, size, 900), lw = textW(label, size * 0.42, 800), x0 = -(tw + 20 + lw) / 2;
  tText(str, x0 + tw / 2, 4, size, { weight: 900, color: o.c ?? '#ffd23a', glowC: o.c ?? '#ffd23a', glowB: 22, shadow: false });
  tText(label, x0 + tw + 20 + lw / 2, size * 0.18, size * 0.42, { weight: 800, color: o.c ?? '#ffd23a', shadow: false });
  ctx.restore();
}

// a vertical thermometer HUD (screen space)
function thermometer(x, y, tempF, o = {}) {
  const k = clamp((tempF - 10) / 80), h = 420;
  ctx.save(); ctx.translate(x, y); ctx.scale(o.s ?? 1, o.s ?? 1);
  fillRR(-50, -h / 2 - 40, 100, h + 130, 50, 'rgba(10,14,26,0.82)');
  fillRR(-18, -h / 2, 36, h, 18, 'rgba(255,255,255,0.12)');
  const col = mixC('#4fb4ff', '#ff6a1a', k);
  fillRR(-12, -h / 2 + h * (1 - k), 24, h * k, 12, col); circle(0, h / 2 + 30, 34, col); glow(col, 20, () => circle(0, h / 2 + 30, 22, col));
  for (let i = 0; i <= 8; i++) { ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(22, -h / 2 + i * h / 8, i % 2 ? 10 : 18, 3); }
  ctx.restore();
  tText(Math.round(tempF) + '°F', x, y - h / 2 - 90, 54, { weight: 900, color: mixC('#9fd8ff', '#ffb36a', k), shadowC: 'rgba(0,0,0,0.7)' });
}

// water splash droplets (world space)
function splash(x, y, t0, n = 36, s = 1) {
  const u = TT - t0; if (u < 0 || u > 1.4) return;
  const img = dotSprite('#bfe6ff', 32);
  ctx.save();
  for (let i = 0; i < n; i++) { const R = RNG('spl', t0, i), vx = R.n(900) * s, vy = -R.r(500, 1300) * s, g = 2600 * s; const px = x + R.n(200) * s + vx * u, py = y + vy * u + 0.5 * g * u * u; if (py > y + 40) continue; const r = R.r(8, 22) * s; ctx.globalAlpha = clamp(1 - u / 1.2); ell(px, py, r, r * 1.3, 'rgba(190,230,255,0.85)', Math.atan2(vy + g * u, vx) + Math.PI / 2); sprite(img, px - r * 0.3, py - r * 0.4, r * 0.9, 0.7); }
  ctx.restore();
  // the crown sheet
  withAlpha(clamp(1 - u / 0.5), () => { ctx.fillStyle = 'rgba(200,235,255,0.6)'; for (const sd of [-1, 1]) { poly([[x + sd * 160 * s, y], [x + sd * (160 + 140 * EZ.o2(u / 0.4)) * s, y - 260 * EZ.o2(u / 0.3) * s * (1 - u)], [x + sd * 240 * s, y]]); ctx.fill(); } });
}
// an expanding ring (pressure pulse / impact)
function shockRing(x, y, t0, r0, r1, color, dur = 0.6, lw = 14) {
  const u = (TT - t0) / dur; if (u < 0 || u > 1) return;
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = rgba(color, 0.9 * (1 - u)); ctx.lineWidth = lw * (1 - u * 0.6); ctx.shadowColor = color; ctx.shadowBlur = 30;
  ctx.beginPath(); ctx.arc(x, y, lerp(r0, r1, EZ.o3(u)), 0, TAU); ctx.stroke(); ctx.restore();
}
// HUD corner brackets (screen space) for the scan shots
function hudFrame(label, t0) {
  const k = EZ.o3((TT - t0) / 0.35); if (k <= 0) return;
  ctx.save(); ctx.globalAlpha = k; ctx.strokeStyle = 'rgba(140,200,255,0.8)'; ctx.lineWidth = 5; const m = 70, L = 90, y0 = 260, y1 = 1300;
  for (const [x, y, sx, sy] of [[m, y0, 1, 1], [W - m, y0, -1, 1], [m, y1, 1, -1], [W - m, y1, -1, -1]]) { ctx.beginPath(); ctx.moveTo(x, y + sy * L); ctx.lineTo(x, y); ctx.lineTo(x + sx * L, y); ctx.stroke(); }
  tText(label, m + 10, y0 - 34, 30, { weight: 700, align: 'left', color: 'rgba(160,210,255,0.9)', shadow: false, letter: 3 });
  const blink = Math.sin(TT * 8) > 0; if (blink) circle(W - m - 14, y0 - 34, 10, '#ff3b3b');
  tText('REC', W - m - 34, y0 - 34, 26, { weight: 800, align: 'right', color: 'rgba(255,255,255,0.8)', shadow: false });
  ctx.restore();
}

// the follow card (screen space)
function followCard(t0, tTap) {
  const k = springEase(TT - t0, 300, 16); if (k <= 0) return;
  const tapped = TT >= tTap, press = TT >= tTap - 0.08 && TT < tTap + 0.12 ? 0.92 : 1;
  ctx.save(); ctx.translate(W / 2, 1040); ctx.scale(k * press, k * press);
  const w = 560, h = 140;
  fillRR(-w / 2, -h / 2 + 12, w, h, h / 2, 'rgba(0,0,0,0.4)');
  fillRR(-w / 2, -h / 2, w, h, h / 2, tapped ? lin(0, -h / 2, 0, h / 2, [[0, '#3a3f4c'], [1, '#262a33']]) : lin(0, -h / 2, 0, h / 2, [[0, '#ff4a6e'], [1, '#e0244c']]));
  if (!tapped) glow('#ff2d5a', 40, () => { rrPath(-w / 2, -h / 2, w, h, h / 2); ctx.strokeStyle = 'rgba(255,255,255,0.0)'; ctx.stroke(); });
  if (tapped) checkIcon(-150, 0, 34); else { ctx.save(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-180, 0); ctx.lineTo(-130, 0); ctx.moveTo(-155, -25); ctx.lineTo(-155, 25); ctx.stroke(); ctx.restore(); }
  tText(tapped ? 'Following' : 'Follow', 40, 2, 64, { weight: 900, color: '#fff', shadow: false });
  ctx.restore();
  if (tapped) shockRing(W / 2, 1040, tTap, 200, 520, '#ff4a6e', 0.6, 10);
  // the finger / cursor coming in to tap
  const fu = EZ.io(clamp((TT - (tTap - 0.5)) / 0.42)), fo = clamp((TT - tTap - 0.4) / 0.3);
  if (fu > 0 && fo < 1) withAlpha(1 - fo, () => {
    const fx = lerp(860, 610, fu), fy = lerp(1500, 1085, fu);
    ctx.save(); ctx.translate(fx, fy); ctx.rotate(-0.35);
    fillRR(-34, -10, 68, 190, 34, lin(-34, 0, 34, 0, [[0, '#f2c7a5'], [1, '#d59e78']])); ell(0, -4, 34, 40, '#f5cfb0'); ell(0, -24, 22, 18, 'rgba(255,255,255,0.35)');
    ctx.restore();
  });
}
