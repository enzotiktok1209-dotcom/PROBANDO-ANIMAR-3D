// =====================================================================
//  props10.js — "Bezahlt fürs Schlafen": a pillow, a flying electric car with hover jets, a night bedroom,
//  a cartoon change-puff, a moon-and-stars sky
// =====================================================================
function pillow(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shadowEll(0, 70, 170, 20, 0.25);
  ctx.beginPath(); ctx.moveTo(-170, -70); ctx.quadraticCurveTo(0, -110, 170, -70); ctx.quadraticCurveTo(200, 0, 170, 70); ctx.quadraticCurveTo(0, 110, -170, 70); ctx.quadraticCurveTo(-200, 0, -170, -70); ctx.closePath(); ctx.fillStyle = '#ffffff'; ctx.fill();
  ell(-40, -20, 80, 30, 'rgba(180,190,220,0.35)'); line(-120, 30, 120, 30, 4, 'rgba(150,160,200,0.4)'); ctx.restore(); }
// the electric car flying: hover jets glowing under it, a slight bob
function flyingCar(x, y, s, t = TT) {
  const bob = Math.sin(t * 4) * 12;
  ctx.save(); ctx.translate(x, y + bob);
  for (const jx of [-320 * s, 330 * s]) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const fl = 0.8 + 0.2 * Math.sin(t * 40 + jx); poly([[jx - 50 * s, 0], [jx + 50 * s, 0], [jx, 220 * s * fl]], 'rgba(106,240,255,0.55)'); glow(jx, 40 * s, 160 * s, '#6af0ff', 0.6); ctx.restore(); }
  eCar(0, 0, s, { wheelSpin: 0, lights: 1 });
  ctx.restore();
}
// a night bedroom: window with moon, a bed with blanket, a night stand and lamp
function setBedroom(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, 0, 0, 1920, [[0, '#1b2160'], [1, '#2a2f78']]); ctx.fillRect(-600, -400, 2300, 2700);
    windowFrame(640, 420, 340, 400, () => { ctx.fillStyle = '#0b1030'; ctx.fillRect(-600, -400, 2300, 2300); circ(860, 520, 54, '#fff3c0'); circ(880, 505, 50, '#0b1030'); const R = RNG('st'); for (let i = 0; i < 14; i++) circ(650 + R.f() * 330, 430 + R.f() * 380, 2 + R.f() * 2, '#fff'); });
    curtains(600, 380, 420, 480, '#5a3a8a');
    fillRR(-600, 1400, 2300, 900, 0, '#3a2a5a'); rugPattern(540, 1650, 480, 90, '#4a3a7a', '#6a5aa0');
    fillRR(800, 1180, 240, 230, 16, '#6a4a2a'); floorLamp(920, 1180, 0.6, '#ffe9a6');
  });
}
// a cartoon puff of smoke for a quick costume change
function puff(x, y, t0, s = 1) { const u = (TT - t0) / 0.45; if (u < 0 || u > 1) return; ctx.save(); ctx.globalAlpha = 1 - u; for (let i = 0; i < 9; i++) { const a = (i / 9) * TAU, r = 120 * s * EZ.o3(u); circ(x + Math.cos(a) * r, y + Math.sin(a) * r * 0.7, 90 * s * (1 - u * 0.4), '#ffffff'); } ctx.restore(); }
