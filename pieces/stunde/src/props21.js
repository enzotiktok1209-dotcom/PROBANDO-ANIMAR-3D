// =====================================================================
//  props21.js — stunde: Toni's influencer room, Kevin's kitchen, the pay app, the guru video, the HUD,
//  price tickets, a wallet, a calculator with a face, a sunrise window, a night bedroom tweak.
// =====================================================================
const KC = '#a3264a', KCD = '#741834', TC = '#39e07a', TCD = '#1f9e55';   // Kevin burgundy, Toni neon green

// ---- Toni's room: magenta/purple, LED strips, neon sign, ring light, a night-city window, posters, sneaker shelf
function setToniRoom(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, -400, 0, 1600, [[0, '#2a0b45'], [1, '#4a1360']]); ctx.fillRect(-600, -400, 2300, 2400);
    for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) fillRR(700 + c * 96 + (r % 2) * 20, 560 + r * 96, 84, 84, 10, r % 2 === c % 2 ? '#3a1458' : '#33104f');   // acoustic foam
    skylineWindow(-60, 420, 430, 560, 1); curtains(-60, 420, 430, 560, '#6b1f8a');
    ledStrip(-600, 120, 1700, 120, 280, 14); ledStrip(-600, 1360, 1700, 1360, 120, 10);
    neonSign(540, 250, 'TONI LIVE', '#ff4fa3');
    poster(560, 640, 200, 270, '#ff4fa3', '#7b3fe4', '1K FOLLOWER'); poster(130, 1120, 170, 220, '#39e07a', '#0f7a4a', 'HYPE');
    // ring light on a stand (right)
    const rl = 0.8 + 0.2 * Math.sin(TT * 3); ctx.beginPath(); ctx.arc(1040, 560, 120, 0, TAU); ctx.lineWidth = 26; ctx.strokeStyle = '#fff8e0'; ctx.stroke(); glow(1040, 560, 300, '#fff4d0', 0.32 * rl); line(1040, 680, 1040, 1400, 12, '#2a2440');
    // sneaker shelf + plant
    fillRR(420, 1010, 330, 16, 6, '#1b1030'); for (let i = 0; i < 3; i++) { fillRR(436 + i * 104, 940, 92, 70, 8, ['#ff6a2a', '#ffffff', '#52b8ff'][i]); fillRR(436 + i * 104, 940, 92, 18, 6, 'rgba(0,0,0,0.2)'); }
    ctx.fillStyle = lin(0, 1380, 0, 2000, [[0, '#24102e'], [1, '#12081a']]); ctx.fillRect(-600, 1380, 2300, 900);
    rugPattern(540, 1650, 520, 110, '#ff4fa3', '#7b3fe4'); plant(-20, 1390, 1.0);
    glow(540, 1380, 900, '#ff4fa3', 0.12);
  });
}
// ---- Kevin's kitchen: warm tiles, wooden cabinets, a window (day / night), pendant lamp, fridge, kettle, fruit
function setKevinKitchen(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = o.night ? '#3b3350' : '#f1dfc0'; ctx.fillRect(-600, -400, 2300, 2400);
    skylineWindow(330, 300, 420, 420, o.night ? 1 : 0);
    for (const [x, w] of [[-260, 560], [800, 560]]) { fillRR(x, 240, w, 420, 14, o.night ? '#5a3e33' : '#9b6b43'); for (let i = 0; i < Math.floor(w / 190); i++) { fillRR(x + 16 + i * 190, 256, 170, 388, 10, o.night ? '#664638' : '#b07c50'); fillRR(x + 150 + i * 190, 420, 10, 60, 5, '#e8d6b0'); } }
    ctx.fillStyle = o.night ? '#4a4566' : '#ffffff'; ctx.fillRect(-600, 760, 2300, 470);
    for (let r = 0; r < 8; r++) for (let c = -6; c < 22; c++) { ctx.strokeStyle = o.night ? 'rgba(0,0,0,0.25)' : 'rgba(150,170,200,0.45)'; ctx.lineWidth = 3; ctx.strokeRect(c * 90 + (r % 2) * 45, 760 + r * 60, 90, 60); }
    line(540, -400, 540, 120, 6, '#2b2440'); poly([[440, 210], [640, 210], [590, 120], [490, 120]], '#ffcf5a'); glow(540, 240, 380, '#ffe9a6', o.night ? 0.45 : 0.25);
    wallClock(150, 860, 70);
    // fridge (right)
    fillRR(870, 640, 300, 760, 30, '#e3e8f0'); fillRR(870, 900, 300, 10, 4, '#b8c0cf'); fillRR(890, 700, 16, 160, 8, '#9aa3b8'); fillRR(890, 940, 16, 220, 8, '#9aa3b8');
    for (const [x, y, c] of [[960, 760, '#ff4fa3'], [1020, 800, '#ffd23f'], [980, 1000, '#52b8ff']]) circ(x, y, 16, c);
    // counter
    fillRR(-600, 1210, 1470, 40, 8, '#e9e4da'); ctx.fillStyle = o.night ? '#4a3a33' : '#8a5a3a'; ctx.fillRect(-600, 1250, 1470, 330);
    for (let i = 0; i < 6; i++) { fillRR(-560 + i * 240, 1270, 220, 290, 10, o.night ? '#55433a' : '#9b6b43'); fillRR(-470 + i * 240, 1300, 40, 10, 5, '#e8d6b0'); }
    // kettle, fruit bowl, plant, coffee machine
    fillRR(60, 1080, 120, 130, 30, '#e8262f'); fillRR(90, 1060, 60, 24, 10, '#2b2b36'); line(178, 1110, 212, 1100, 14, '#e8262f');
    ell(700, 1200, 110, 30, '#ffffff'); for (const [x, c] of [[640, '#ff8a1e'], [690, '#e8262f'], [740, '#ffd23f'], [715, '#41f08a']]) circ(x, 1170, 30, c);
    fillRR(-180, 1040, 150, 170, 18, '#2b2b36'); fillRR(-160, 1060, 110, 40, 8, '#52b8ff'); mug(-105, 1205, 0.7);
    plant(820, 1210, 0.6);
    ctx.fillStyle = o.night ? '#2e2a3e' : '#d8cbb4'; ctx.fillRect(-600, 1580, 2300, 900);
    for (let r = 0; r < 6; r++) for (let c = -6; c < 22; c++) if ((r + c) % 2) { ctx.fillStyle = o.night ? '#262236' : '#c7b89e'; ctx.fillRect(c * 120, 1580 + r * 120, 120, 120); }
    if (o.night) { ctx.fillStyle = 'rgba(20,20,60,0.25)'; ctx.fillRect(-600, -400, 2300, 2800); }
  });
}
// ---- a sunrise over the city (24 hours later)
function setSunrise(o = {}) {
  withBlur(o.blur, () => {
    ctx.fillStyle = lin(0, -400, 0, 1500, [[0, '#2a2a7a'], [0.45, '#ff7a6a'], [1, '#ffd27a']]); ctx.fillRect(-600, -400, 2300, 2400);
    const sy = 1180 - EZ.o2(clamp((TT - (o.t0 ?? 0)) / 2)) * 160; glow(540, sy, 700, '#fff0a0', 0.6); circ(540, sy, 150, '#fff4c0');
    for (let i = 0; i < 16; i++) { const R = RNG('sr', i), bw = 90 + R.f() * 80, bh = 280 + R.f() * 520, bx = -260 + i * 110; fillRR(bx, 1500 - bh, bw, bh + 400, 4, '#3a2a5a');
      for (let r = 0; r < bh / 60; r++) for (let c = 0; c < bw / 40 - 1; c++) if (R.f() > 0.55) fillRR(bx + 14 + c * 36, 1500 - bh + 24 + r * 60, 20, 26, 3, '#ffd96a'); }
    ctx.fillStyle = '#231a3a'; ctx.fillRect(-600, 1500, 2300, 900);
  });
}

// ---- price ticket for an option (the hook + the final question)
function offerTicket(x, y, s, big, sub, col, o = {}) {
  const k = o.t0 != null ? springEase(TT - o.t0, 300, 12) : 1; if (o.t0 != null && TT < o.t0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0); ctx.scale(s * k, s * k);
  fillRR(-300 + 12, -170 + 16, 600, 340, 34, 'rgba(0,0,0,0.4)'); fillRR(-300, -170, 600, 340, 34, col); fillRR(-284, -154, 568, 308, 26, shade(col, 0.18));
  for (const sd of [-1, 1]) circ(sd * 300, 0, 34, o.hole ?? '#1a0f2e');
  for (let i = -5; i <= 5; i++) circ(i * 50, 92, 5, 'rgba(255,255,255,0.45)');
  if (o.top) tText(o.top, 0, -110, 34, { color: 'rgba(255,255,255,0.85)', shadow: false, letter: 4 });
  tText(big, 0, -20, o.bigSize ?? 130, { color: '#ffffff', stroke: shade(col, -0.45), strokeW: 14, maxW: 520 });
  tText(sub, 0, 130, 48, { color: '#ffffff', shadow: false, maxW: 520 });
  if (o.check) { const u = clamp((TT - o.check) / 0.2); if (u > 0) { ctx.save(); ctx.translate(240, -140); ctx.scale(u, u); circ(0, 0, 60, '#ffffff'); poly([[-30, 0], [-8, 24], [32, -24], [24, -32], [-8, 8], [-22, -8]], '#18a34a'); ctx.restore(); } }
  ctx.restore();
}
// ---- the pay app on a phone: name, live total, rate, a payout bar
function payApp(x, y, s, who, value, rate, col, o = {}) {
  phone(x, y, s, o.rot ?? 0, () => {
    ctx.fillStyle = lin(0, -176, 0, 176, [[0, '#14112a'], [1, '#221b44']]); ctx.fillRect(-84, -176, 168, 352);
    fillRR(-84, -176, 168, 64, 0, col); tText(who, 0, -146, 20, { color: '#fff', shadow: false, letter: 2 });
    tText('VERDIENT', 0, -88, 12, { color: '#9f95c9', shadow: false, letter: 2 });
    tText(value, 0, -48, value.length > 8 ? 24 : 30, { color: o.valCol ?? '#41f08a', shadow: false, maxW: 156 });
    tText(rate, 0, -6, 13, { color: '#ffffff', shadow: false, maxW: 150 });
    if (o.wait != null) { fillRR(-66, 30, 132, 14, 7, '#3a3360'); fillRR(-66, 30, 132 * clamp(o.wait), 14, 7, col); tText(o.waitTxt ?? 'NÄCHSTE ZAHLUNG', 0, 60, 10, { color: '#9f95c9', shadow: false }); }
    if (o.notif) { const u = springEase(TT - o.notif, 320, 13); if (TT > o.notif) { ctx.save(); ctx.translate(0, -120 + (1 - u) * -60); fillRR(-78, -26, 156, 52, 12, '#ffffff'); tText(o.notifTxt ?? '+100,00 €', 0, 0, 22, { color: '#18a34a', shadow: false }); ctx.restore(); } }
    for (let i = 0; i < 3; i++) fillRR(-70, 90 + i * 26, 140, 18, 6, 'rgba(255,255,255,0.06)');
  });
}
// ---- the finance guru's vertical video: "PRO SEKUNDE GEWINNT IMMER!" (+ the fine print)
function guruVideo(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  fillRR(-210, -370, 420, 740, 40, '#0e0c18'); ctx.save(); rrPath(-196, -356, 392, 712, 30); ctx.clip();
  ctx.fillStyle = lin(0, -356, 0, 356, [[0, '#0d3a2a'], [1, '#04140e']]); ctx.fillRect(-196, -356, 392, 712);
  ctx.globalAlpha = 0.5; for (let i = 0; i < 8; i++) line(-196 + i * 56, -100 - i * 30 + Math.sin(TT * 2 + i) * 6, -140 + i * 56, -130 - i * 30, 10, '#41f08a'); ctx.globalAlpha = 1;
  char('seller', 0, 330, 0.36, { pose: [[0, 'pointUpR']], emo: [[0, 'grin']], extras: { shades: true } });
  fillRR(-180, -330, 360, 150, 18, 'rgba(0,0,0,0.6)'); tText('PRO SEKUNDE', 0, -290, 40, { color: '#ffffff', shadow: false, maxW: 340 }); tText('GEWINNT IMMER!', 0, -230, 40, { color: '#ffe14d', shadow: false, maxW: 340 });
  if (o.fine) { const u = clamp((TT - o.fine) / 0.3); fillRR(-170, -160, 340, 70, 14, `rgba(255,255,255,${0.95 * u})`); tText('BEI 1 € PRO SEKUNDE', 0, -125, 26, { color: `rgba(232,38,47,${u})`, shadow: false, maxW: 320 }); }
  for (let i = 0; i < 3; i++) { heartIcon(160, 40 + i * 90, 22, ['#ff3b5c', '#ffffff', '#ffffff'][i]); }
  tText('2,1 Mio.', 160, 76, 14, { color: '#fff', shadow: false });
  ctx.restore(); fillRR(-60, -364, 120, 18, 9, '#0e0c18');
  ctx.restore();
}
// ---- top HUD: the story clock + both totals (screen space)
function hudBar(clock, kv, tn, o = {}) {
  ctx.save(); ctx.translate(540, 262);
  fillRR(-470 + 8, -58 + 10, 940, 116, 30, 'rgba(0,0,0,0.4)'); fillRR(-470, -58, 940, 116, 30, '#120d22');
  fillRR(-470, -58, 250, 116, 30, '#ffe14d'); tText('⏱ ' + clock, -345, 2, 40, { color: '#120d22', shadow: false, maxW: 220 });
  fillRR(-206, -44, 330, 88, 20, KC); tText('KEVIN', -150, -14, 22, { color: '#ffd0dc', shadow: false, letter: 2 }); tText(kv, -40, 18, 38, { color: '#ffffff', shadow: false, maxW: 300 });
  fillRR(132, -44, 330, 88, 20, TCD); tText('TONI', 186, -14, 22, { color: '#c8ffe0', shadow: false, letter: 2 }); tText(tn, 296, 18, 38, { color: '#ffffff', shadow: false, maxW: 300 });
  if (o.lead) { const x = o.lead === 'k' ? -40 : 296; ctx.save(); ctx.translate(x, -64); ctx.scale(0.8 + 0.1 * Math.sin(TT * 8), 0.8 + 0.1 * Math.sin(TT * 8)); tText('👑', 0, 0, 40, { shadow: false }); ctx.restore(); }
  ctx.restore();
}
// ---- a big scoreboard: two columns, the leader glows
function scoreBoard(x, y, s, kv, tn, lead, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  fillRR(-420 + 12, -260 + 16, 840, 520, 40, 'rgba(0,0,0,0.45)'); fillRR(-420, -260, 840, 520, 40, '#120d22'); fillRR(-420, -260, 840, 90, 36, '#221a40');
  tText(o.title ?? 'KONTOSTAND', 0, -214, 40, { color: '#ffe14d', shadow: false, letter: 6 });
  for (const [sd, name, v, col, k] of [[-1, 'KEVIN', kv, KC, 'k'], [1, 'TONI', tn, TCD, 't']]) {
    const cx = sd * 205; if (lead === k) glow(cx, 40, 260, col, 0.5);
    fillRR(cx - 190, -150, 380, 380, 30, col); tText(name, cx, -100, 46, { color: '#ffffff', shadow: false, letter: 4 });
    tText(v, cx, 40, v.length > 6 ? 76 : 96, { color: '#ffffff', stroke: '#0b0912', strokeW: 12, maxW: 350 });
    tText(k === 'k' ? '100 € / STD' : '1 CT / SEK', cx, 170, 32, { color: 'rgba(255,255,255,0.8)', shadow: false });
    if (lead === k) tText('👑', cx, -180, 70, { shadow: false });
  }
  ctx.restore();
}
// ---- an open wallet with a few coins
function wallet(x, y, s, amount, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shadowEll(0, 190, 280, 40, 0.4);
  fillRR(-280, -170, 560, 340, 40, '#5a3a24'); fillRR(-262, -152, 524, 304, 30, '#7a4e30'); line(-262, 0, 262, 0, 6, '#4a2e1a');
  for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) { const xx = -180 + i * 120, yy = -70 + j * 120; circ(xx, yy, 46, ['#d9a520', '#c0c4d4', '#c9743a'][(i + j) % 3]); circ(xx, yy, 36, ['#ffd23f', '#e2e6f0', '#e08a4c'][(i + j) % 3]); }
  fillRR(-180, -230, 360, 90, 20, '#141026'); tText(amount, 0, -184, 56, { color: o.col ?? '#ffffff', shadow: false });
  ctx.restore();
}
// ---- the calculator with a face (it is against Toni): angry eyes, it shakes its head
function calcFace(x, y, s, disp) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(TT * 14) * 0.06); calculator(0, 0, s, disp, false);
  ctx.scale(s, s);
  for (const sd of [-1, 1]) { ell(sd * 80, -390, 54, 44, '#ffffff'); circ(sd * 80 + Math.sin(TT * 5) * 10, -384, 20, '#1b1530'); line(sd * 120, -450, sd * 34, -428, 16, '#1b1530'); }
  ctx.restore();
}
// ---- a little "speech" burst used for shouts
function burst(x, y, r, col, t0) { if (TT < t0) return; const k = springEase(TT - t0, 320, 12); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.beginPath(); for (let i = 0; i < 24; i++) { const a = i / 24 * TAU, rr = r * (i % 2 ? 0.78 : 1); ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
// the calculator with a display that always fits (long entries shrink instead of running off the screen)
function calc2(x, y, s, disp, err = false, press = -1) {
  calculator(x, y, s, '', false, press); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  tText(disp, 160, -208, 84, { align: 'right', color: '#1d2a1a', shadow: false, weight: 800, maxW: 330 }); ctx.restore();
}
