// =====================================================================
//  props13.js — the woche piece: a motorbike, the weekly race chart, phone notifications, a live cent counter
// =====================================================================
// a sporty motorbike (side view), wheels spin with `spin`
function motorbike(x, y, s, col = '#e8262f', spin = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 8, 360, 34, 0.4);
  const wheel = (wx) => { circ(wx, -110, 110, '#15151e'); circ(wx, -110, 78, '#3a3a4a'); circ(wx, -110, 66, '#c9cede'); ctx.save(); ctx.translate(wx, -110); ctx.rotate(spin); for (let i = 0; i < 5; i++) { ctx.rotate(TAU / 5); line(0, 0, 0, -62, 10, '#8a8fa6'); } ctx.restore(); circ(wx, -110, 18, '#555'); };
  wheel(-230); wheel(230);
  line(230, -110, 150, -330, 18, '#8a8fa6'); line(150, -330, 120, -380, 12, '#2b2b38'); line(120, -380, 60, -390, 12, '#2b2b38');
  poly([[-120, -150], [140, -150], [190, -260], [100, -330], [-60, -300], [-150, -240]], col);
  poly([[-60, -300], [100, -330], [60, -360], [-40, -340]], shade(col, 0.2));
  poly([[-230, -230], [-60, -300], [-40, -270], [-200, -205]], '#1b1530'); fillRR(-90, -170, 200, 40, 14, '#3a3a4a'); line(-120, -150, -230, -110, 16, '#8a8fa6');
  ell(170, -300, 34, 24, '#fff6c8'); glow(200, -300, 80, '#fff6c8', 0.35); poly([[-150, -240], [-250, -250], [-240, -225]], shade(col, -0.2));
  ctx.restore();
}
// the weekly race: two bars over a Mon..Sun axis. u = 0..1 through the week; Kevin jumps on Monday, Jonas climbs smoothly.
// Kevin's bar is a little taller on Monday, Jonas nearly reaches it by Sunday (no numbers shown).
function raceChart(x, y, s, u, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  fillRR(-420, -560, 840, 760, 36, 'rgba(10,8,30,0.82)'); fillRR(-400, -540, 800, 60, 20, 'rgba(255,255,255,0.06)');
  tText('WOCHENRENNEN', 0, -510, 40, { color: '#ffd23f', shadow: false, letter: 4 });
  const days = ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'], H = 540, base = 120;
  days.forEach((d, i) => { const dx = -330 + i * 110, act = Math.floor(u * 7 - 1e-6) === i; tText(d, dx, base + 50, 34, { color: act ? '#ffd23f' : '#9f95c9', shadow: false }); });
  line(-380, base, 380, base, 6, '#5a4f86');
  const kv = u > 0.01 ? 1 : 0, jv = clamp(u) * (o.jMax ?? 0.985), kx = -110, jx = 110, w = 170;
  const kh = H * EZ.o3(clamp(kv * (o.kGrow ?? 1))), jh = H * jv;
  fillRR(kx - w / 2, base - kh, w, kh, 16, '#2f6df6'); fillRR(kx - w / 2, base - kh, w, 24, 12, '#5b8dff');
  fillRR(jx - w / 2, base - jh, w, jh, 16, '#e2453c'); fillRR(jx - w / 2, base - jh, w, 24, 12, '#ff7466');
  tText('KEVIN', kx, base - kh - 40, 40, { color: '#5b8dff', shadow: false }); tText('JONAS', jx, base - jh - 40, 40, { color: '#ff7466', shadow: false });
  if (o.gap && kh > jh + 6) { const gx = 250; line(gx, base - kh, gx, base - jh, 6, '#ffd23f'); line(gx - 20, base - kh, gx + 20, base - kh, 6, '#ffd23f'); line(gx - 20, base - jh, gx + 20, base - jh, 6, '#ffd23f'); tText('VORSPRUNG', gx + 10, base - (kh + jh) / 2 - 10, 26, { color: '#ffd23f', shadow: false }); }
  ctx.restore();
}
// phone screen contents (inside phone(): -84..84 x -176..176): a list of deposit notifications
function notifScreen(items, o = {}) {
  ctx.fillStyle = o.bg ?? '#0e1a2e'; ctx.fillRect(-84, -176, 168, 352); tText(o.title ?? 'BANK', 0, -152, 16, { color: '#9fb4d8', shadow: false, letter: 2 });
  items.forEach(([t0, txt, col], i) => { if (TT < t0) return; const k = springEase(TT - t0, 320, 14), y = -112 + i * 52; ctx.save(); ctx.translate(0, y); ctx.scale(k, k); fillRR(-76, -22, 152, 44, 10, col ?? '#26a24c'); tText(txt, 0, 1, 22, { color: '#fff', shadow: false, maxW: 140 }); ctx.restore(); });
}
// a live counter: what 1 cent per second has earned since t0 (shown in euros with cents)
function liveCents(x, y, s, t0) {
  const v = Math.max(0, TT - t0) * 0.01; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  fillRR(-300, -110, 600, 220, 30, '#141026'); fillRR(-300, -110, 600, 54, 26, '#231c40');
  tText('JONAS · SEIT DU SCHAUST', 0, -82, 26, { color: '#9f95c9', shadow: false, letter: 2 });
  tText('+' + v.toFixed(2).replace('.', ',') + ' €', 0, 30, 110, { color: '#41f08a', shadow: false });
  ctx.restore();
}
