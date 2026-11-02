// =====================================================================
//  shots-2.js — 0:34.6–1:10.9  the 450 € pizza, robbed by himself, Leo's patience, the notebook
// =====================================================================
const hudLeo = (v, o = {}) => hud('KONTOSTAND · LEO', [[0, v]], { cents: true, ...o });

// ---- 22 · the doorbell; the courier with a huge velvet box
S(34.62, { tr: 'whipL', cam: [[34.62, 560, 1100, 1.05], [36.2, 600, 1080, 1.12]],
  draw() { setDaniRoom(); door(820, FLOOR - 20, 0.95, EZ.io(clamp((TT - 34.95) / 0.4)), '#7b4a2c');
    if (TT > 35.0) char('bote', 830, FLOOR - 20, 0.82, { pose: [[0, 'holdBoth']], emo: [[0, 'neutral']], look: [-0.6, 0], holdL: () => {}, holdR: () => {} });
    if (TT > 35.0) velvetBox(800, FLOOR - 330, 0.36);
    char('dani', 300, FLOOR + 20, 0.9, { pose: [[34.62, 'idle'], [35.3, 'cheer']], emo: [[34.62, 'neutral'], [35.3, 'grin']], look: [[34.62, [0.8, 0]], [35.3, [0.8, 0.1]]], extras: { watch: 1, chain: 1, shades: 1 }, walk: [[34.62, 0], [34.9, 1], [35.6, 0]], turn: 0.4 }); },
  ui() { hudDani({ scale: 0.8, y: 220 }); if (TT < 35.2) { const k = springEase(TT - 34.66, 300, 12); ctx.save(); ctx.translate(820, 560); ctx.rotate(0.1); ctx.scale(k, k); tText('DING DONG!', 0, 0, 64, { color: PAL.yellow, stroke: '#3a2010', strokeW: 14 }); ctx.restore(); } },
  sfx: [[34.66, 'doorbell'], [34.95, 'creak'], [35.3, 'footsteps', 0.6]] });

// ---- 23 · POV: opening the box, golden light
S(36.2, { tr: 'zoomIn', cam: [[36.2, 540, 1000, 1.0], [37.45, 540, 980, 1.1]],
  draw() { setDaniRoom({ blur: 10 }); const lid = EZ.io(clamp((TT - 36.35) / 0.55));
    velvetBox(540, 1350, 1.35, lid, lid * 0.9);
    if (lid > 0.3) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.22 + Math.sin(TT * 2 + i) * 0.03; ctx.fillStyle = `rgba(255,230,140,${0.12 * lid})`; ctx.beginPath(); ctx.moveTo(540, 1130); ctx.lineTo(540 + Math.cos(a - 0.06) * 1400, 1130 + Math.sin(a - 0.06) * 1400); ctx.lineTo(540 + Math.cos(a + 0.06) * 1400, 1130 + Math.sin(a + 0.06) * 1400); ctx.fill(); } ctx.restore(); }
    bigArm('dani', -200, 1900, 210 + lid * 60, 1180 - lid * 80, 170, true); bigArm('dani', 1280, 1900, 870 - lid * 60, 1180 - lid * 80, 170, true); },
  sfx: [[36.35, 'creak', 1.3], [36.6, 'choir']] });

// ---- 24 · inside: a pizza the size of a biscuit
S(37.45, { tr: 'cut', cam: [[37.45, 540, 1000, 1.0], [38.55, 540, 1040, 1.35]], punch: [[38.6, 0.25]],
  draw() { ctx.fillStyle = '#4a0c22'; ctx.fillRect(-600, -400, 2300, 2800); ctx.fillStyle = rad(540, 1040, 50, 900, [[0, '#a3264f'], [1, '#3a0818']]); ctx.fillRect(-600, -400, 2300, 2800);
    for (let i = 0; i < 9; i++) line(-200, 300 + i * 200, 1300, 260 + i * 200, 6, 'rgba(0,0,0,0.12)');
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = rad(540, 1040, 0, 360, [[0, 'rgba(255,240,180,0.45)'], [1, 'rgba(0,0,0,0)']]); ctx.fillRect(0, 600, 1080, 900); ctx.restore();
    tinyPizza(540, 1040, 110);
    const m = EZ.o3(clamp((TT - 38.15) / 0.35)); if (m > 0) { line(430, 1170, 430 + 220 * m, 1170, 8, '#fff'); line(430, 1148, 430, 1192, 8, '#fff'); if (m > 0.99) line(650, 1148, 650, 1192, 8, '#fff'); } },
  ui() { sticker('Ø 8 CM', 540, 700, 38.3, { bg: '#ffffff', fg: '#1b1530', size: 64 }); },
  sfx: [[37.5, 'recordScratch'], [38.3, 'pop', 1.2], [38.6, 'squeak'], [38.7, 'sadTrombone']] });

// ---- 25 · "450 euros for THIS?!"
S(39.2, { tr: 'zoomIn', capY: 1480, cam: [[39.2, 540, 1000, 1.6], [41.55, 540, 960, 1.75]], punch: [[41.05, 0.16]], shake: [[39.25, 22, 0.5], [41.05, 18, 0.4]],
  draw() { setDaniRoom({ blur: 8 });
    char('dani', 540, FLOOR + 160, 1.05, { pose: [[39.2, 'headGrab'], [40.5, 'holdR']], emo: [[39.2, 'shock'], [40.4, 'angry']], extras: { watch: 1, chain: 1, sweat: 1 }, holdR: () => tinyPizzaIcon(0, -30) });
    impactLines(540, 800, 380, 700, 18, 39.25, { w: 16, c: 'rgba(255,255,255,0.8)' }); },
  sfx: [[39.25, 'shockHit'], [40.5, 'swish', 0.8], [41.05, 'zoomIn']] });

// ---- 26 · the courier, unbothered (bubble gum pops)
S(41.55, { tr: 'whipR', capY: 1480, cam: [[41.55, 830, 1030, 1.75], [43.0, 830, 1010, 1.85]],
  draw() { setDaniRoom({ blur: 8 }); door(820, FLOOR - 20, 0.95, 1, '#7b4a2c');
    char('bote', 830, FLOOR - 20, 0.82, { pose: [[0, 'idle'], [42.3, 'shrug']], emo: [[41.55, 'calm'], [42.3, 'smug']], look: [-0.3, 0] });
    const b = TT < 42.0 ? 0 : TT < 42.6 ? EZ.o2((TT - 42.0) / 0.6) : 0; if (b > 0) { circ(830, 1050, 20 + b * 46, '#ff8fc8'); circ(816, 1036, 10 * b, 'rgba(255,255,255,0.6)'); } },
  ui() { if (TT > 42.6 && TT < 43) { const k = springEase(TT - 42.6, 300, 12); ctx.save(); ctx.translate(560, 640); ctx.scale(k, k); tText('PLOPP', 0, 0, 70, { color: '#ff8fc8', stroke: '#3a0f2a', strokeW: 14 }); ctx.restore(); } },
  sfx: [[42.0, 'bubble'], [42.6, 'popHi', 0.8]] });

// ---- 27 · "the tip is mandatory" — a pat on the shoulder
S(43.0, { tr: 'slide', cam: [[43.0, 560, 1100, 1.15], [44.55, 560, 1080, 1.2]],
  draw() { setDaniRoom({ blur: 2 }); door(820, FLOOR - 20, 0.95, 1, '#7b4a2c');
    char('dani', 400, FLOOR + 20, 0.9, { pose: [[0, 'holdR']], emo: [[43.0, 'angry'], [43.5, 'shock']], look: [0.6, 0], extras: { watch: 1, chain: 1 }, holdR: () => tinyPizzaIcon(0, -30) });
    char('bote', 780, FLOOR - 20, 0.82, { pose: [[43.0, 'idle'], [43.15, { la: [1.35, -0.25], ra: [0.16, -0.12] }], [43.6, 'idle']], emo: [[0, 'smug']], look: [-0.6, 0] }); },
  ui() { hudDani({ scale: 0.8, y: 220 }); sticker('PFLICHT-TRINKGELD  +50 €', 540, 560, 43.4, { bg: PAL.green, size: 46 }); },
  sfx: [[43.2, 'pat'], [43.4, 'pop', 1], [43.5, 'cashReg']] });

// ---- 28 · door slam, the rain cloud
S(44.55, { tr: 'whipL', cam: [[44.55, 600, 1050, 1.1], [46.3, 620, 1000, 1.25]], shake: [[44.75, 20, 0.35]],
  draw() { setDaniRoom({ blur: 2 }); door(820, FLOOR - 20, 0.95, 1 - EZ.i3(clamp((TT - 44.55) / 0.2)), '#7b4a2c');
    char('dani', 700, FLOOR + 20, 0.9, { pose: [[44.55, 'idle'], [44.9, 'sad']], emo: [[44.55, 'angry'], [45.0, 'sad']], look: [[44.55, [0.5, 0]], [45.0, [0, 0.6]]], lean: [[44.55, 0], [44.9, 0.1, 0.4]], extras: { watch: 1, chain: 1 } });
    rainCloud(700, 560, 45.3); },
  ui() { hudDani({ scale: 0.8, y: 220 }); sticker('OPFER UND TÄTER', 540, 560, 46.0, { bg: PAL.red, size: 52 }); },
  sfx: [[44.75, 'doorSlam'], [45.35, 'thunder'], [45.4, 'rain', 2.8], [46.0, 'pop', 0.9]] });
function rainCloud(x, y, t0) {
  const k = springEase(TT - t0, 200, 14); if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  for (const [cx, cy, r] of [[-90, 10, 70], [0, -20, 95], [90, 10, 70], [0, 30, 80]]) circ(cx, cy, r, '#5b6378');
  for (const [cx, cy, r] of [[-60, 0, 50], [10, -30, 60]]) circ(cx, cy, r, '#6f788f');
  ctx.restore();
  const R = RNG('drops'); for (let i = 0; i < 26; i++) { const dx = x - 150 + R.f() * 300, ph = R.f(), u = ((TT - t0) * 1.6 + ph) % 1; if (TT < t0 + 0.2) continue; line(dx, y + 60 + u * 520, dx - 6, y + 90 + u * 520, 6, 'rgba(140,200,255,0.8)'); }
  if (((TT - t0) % 1.6) < 0.08 && TT > t0 + 0.1) { poly([[x + 10, y + 40], [x - 30, y + 160], [x + 6, y + 160], [x - 24, y + 280], [x + 40, y + 130], [x + 4, y + 130]], '#fff36b'); }
}

// ---- 29 · close-up: a tear and a bite of the 450 € pizza
S(46.3, { tr: 'zoomIn', capY: 1480, cam: [[46.3, 540, 1040, 1.7], [48.22, 540, 1000, 1.85]],
  draw() { setDaniRoom({ blur: 9 });
    char('dani', 540, FLOOR + 220, 1.05, { pose: [[46.3, 'holdR'], [46.85, 'drinkR'], [47.2, 'holdR']], emo: [[46.3, 'sad']], extras: { watch: 1, chain: 1, tear: 1 }, holdR: (sd, a) => tinyPizzaIcon(0, -30) });
    rainCloud(540, 340, 46.0); },
  sfx: [[46.35, 'rain', 1.9], [47.05, 'crunch'], [47.6, 'sadTrombone', 0.6]] });

// ---- 30 · split: Dani's million shrinks / Leo
S(48.22, { tr: 'glitch', cam: [[48.22, 540, 960, 1.0]],
  draw() { ctx.fillStyle = '#250d1e'; ctx.fillRect(-600, -400, 2300, 1360); ctx.fillStyle = rad(540, 500, 40, 700, [[0, '#7a1d2e'], [1, '#250d1e']]); ctx.fillRect(-100, 0, 1280, 960);
    const v = 819500 - EZ.i2(clamp((TT - 48.4) / 1.6)) * 9000; tText(fmtEUR(v), 540, 440, 120, { color: '#ff4a4a', stroke: '#2a0a10', strokeW: 18 });
    for (let i = 0; i < 3; i++) { const y = 600 + ((TT * 300 + i * 90) % 280); poly([[540 - 40 + i * 0, y], [540 + 40, y], [540, y + 50]], 'rgba(255,74,74,0.7)'); }
    tText('DANI', 540, 230, 60, { color: '#ff9db0', shadow: false, letter: 8 });
    ctx.save(); ctx.beginPath(); ctx.rect(-100, 960, 1280, 1000); ctx.clip(); ctx.translate(0, 360); setLeoRoom({ blur: 3 }); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(-100, 960, 1280, 1000); ctx.clip(); char('leo', 540, 1980, 0.75, { pose: [[0, 'polish']], emo: [[0, 'calm']], look: [0, 0.6], holdR: () => coin(0, -30, 26, { sx: 1 }) }); ctx.restore();
    line(-100, 960, 1180, 960, 14, '#fff'); },
  sfx: [[48.4, 'descend'], [49.5, 'swish', 0.7]] });

// ---- 31 · Leo polishes his cent on a cushion
S(50.1, { tr: 'whipR', cam: [[50.1, 540, 1150, 1.15], [51.9, 540, 1130, 1.25]],
  draw() { setLeoRoom();
    char('leo', 540, FLOOR + 30, 0.95, { pose: [[0, 'polish'], [50.5, { la: [0.42, -1.55], ra: [0.7, -1.0] }], [50.8, 'polish'], [51.1, { la: [0.42, -1.55], ra: [0.7, -1.0] }], [51.4, 'polish']], emo: [[0, 'happy']], look: [0, 0.7], holdL: () => { fillRR(-60, -10, 120, 46, 20, '#ff4fa3'); coin(0, -22, 30, { sx: 1 }); } });
    twinkles('p31', 380, 1050, 300, 200, 6, { s: 26 }); },
  ui() { hudLeo(0.01, { scale: 0.8, y: 220 }); },
  sfx: [[50.3, 'polish'], [50.9, 'polish'], [51.4, 'sparkle']] });

// ---- 32 · "Easy, champ. We've got 30 days."
S(51.9, { tr: 'zoomIn', capY: 1480, cam: [[51.9, 540, 1000, 1.75], [54.08, 540, 980, 1.9]],
  draw() { setLeoRoom({ blur: 9 });
    char('leo', 540, FLOOR + 230, 1.05, { pose: [[0, 'holdR']], emo: [[0, 'love']], look: [0.3, 0.5], holdR: () => coin(0, -40, 40, { sx: Math.cos(TT * 1.5) }) });
    if (Math.sin(TT * 3) > 0.7) sparkle(700, 1080, 30, '#fff', TT); },
  sfx: [[52.55, 'ting'], [53.6, 'sparkle']] });

// ---- 33 · the counter: day 1
function counterSet(day, cnt, born) {
  rays('#0c7a3e', '#11954c', { cy: 1000 });
  const cols = Math.min(cnt, 4), rows = Math.ceil(cnt / 4), r = cnt > 8 ? 55 : cnt > 4 ? 70 : cnt > 1 ? 95 : 140;
  for (let i = 0; i < cnt; i++) { const t0 = born[i] ?? 0, k = springEase(TT - t0, 320, 13), x = 540 + ((i % cols) - (cols - 1) / 2) * r * 2.4, yb = 1000 + (Math.floor(i / cols) - (rows - 1) / 2) * r * 2.4;
    const y = TT - t0 < 0.5 ? bounceY(TT - t0, yb - 500, yb, 5200, 0.4) : yb; if (TT >= t0) coin(x, y, r * Math.min(1, k * 1.2), { sx: Math.cos(TT * 2 + i) }); }
}
S(54.08, { tr: 'flash', cam: [[54.08, 540, 960, 1.0], [55.75, 540, 960, 1.06]],
  draw() { counterSet(1, 1, [54.2]); },
  ui() { tText('TAG 1', 540, 470, 120, { color: '#fff', stroke: '#063d1e', strokeW: 22 }); hudLeo(0.01, { y: 1580, scale: 0.9 }); },
  sfx: [[54.2, 'coinBounce'], [54.15, 'pop', 1]] });

// ---- 34 · 2, 4, 8 ...
S(55.75, { tr: 'cut', cam: [[55.75, 540, 960, 1.06], [57.4, 540, 960, 0.92]],
  draw() { const st = [55.8, 56.4, 56.9], n = st.filter((t) => TT >= t).length, cnt = 2 ** n, born = [];
    for (let i = 0; i < cnt; i++) born.push(i < cnt / 2 ? 0 : st[n - 1] + (i - cnt / 2) * 0.04); counterSet(n + 1, cnt, born); },
  ui() { const n = [55.8, 56.4, 56.9].filter((t) => TT >= t).length; tText('TAG ' + (n + 1), 540, 470, 120, { color: '#fff', stroke: '#063d1e', strokeW: 22 });
    hud('KONTOSTAND · LEO', [[0, 0.01], [55.8, 0.02], [56.4, 0.04], [56.9, 0.08]], { cents: true, y: 1580, scale: 0.9 }); },
  sfx: [[55.8, 'coin', 1.2], [56.4, 'coin', 1.45], [56.9, 'coin', 1.7], [56.95, 'coin', 1.9]] });

// ---- 35 · Dani visits; Leo at his desk
S(57.4, { tr: 'whipL', cam: [[57.4, 540, 1120, 1.05], [59.1, 560, 1110, 1.12]],
  draw() { setLeoDesk(); char('leo', 760, FLOOR - 100, 0.82, { pose: [[0, 'writeR']], emo: [[0, 'calm']], look: [-0.2, 0.7] }); desk(760, FLOOR + 20, 0.9);
    notebook(760, FLOOR - 470, 0.4, [['TAG 1', '0,01 €'], ['TAG 2', '0,02 €'], ['TAG 3', '0,04 €'], ['TAG 4', '0,08 €'], ['TAG 5', '0,16 €']], { rot: -0.15 });
    const wx = lerp(-200, 270, EZ.o2(clamp((TT - 57.4) / 1.2)));
    char('dani', wx, FLOOR + 30, 0.9, { pose: [[0, 'spinKeys']], emo: [[0, 'smug']], look: [0.6, 0], walk: [[57.4, 1], [58.6, 0]], extras: { watch: 1, chain: 1 }, holdR: () => { ctx.rotate(TT * 12); fillRR(-8, -40, 16, 40, 6, '#c0c4d4'); circ(0, -46, 16, '#222'); } }); },
  sfx: [[57.45, 'footsteps', 1.2], [57.6, 'keys'], [58.3, 'keys']] });

// ---- 36 · the notebook
S(59.1, { tr: 'zoomIn', cam: [[59.1, 540, 960, 1.0], [60.24, 540, 960, 1.08]],
  draw() { setLeoDesk({ blur: 10 }); notebook(540, 980, 1.25, [['TAG 1', '0,01 €'], ['TAG 2', '0,02 €'], ['TAG 3', '0,04 €'], ['TAG 4', '0,08 €'], ['TAG 5', '0,16 €']], { reveal: Math.floor(clamp((TT - 59.15) / 0.8) * 5) + 1 }); },
  sfx: [[59.15, 'flip'], [59.3, 'pencil', 0.8]] });

// ---- 37 · "Wait... a notebook for pocket change?"
S(60.24, { tr: 'whipR', capY: 1480, cam: [[60.24, 400, 1000, 1.6], [62.4, 400, 980, 1.7]],
  draw() { setLeoDesk({ blur: 8 });
    char('dani', 400, FLOOR + 160, 1.0, { pose: [[60.24, 'idle'], [60.5, 'pointR']], emo: [[60.24, 'confused'], [61.7, 'smug']], look: [0.8, 0.3], turn: 0.4, extras: { watch: 1, chain: 1 } }); },
  ui() { if (TT > 61.75) { const k = springEase(TT - 61.75, 300, 12); ctx.save(); ctx.translate(780, 560); ctx.scale(k, k); tText('?', 0, 0, 170, { color: '#fff', stroke: PAL.pink, strokeW: 18 }); ctx.restore(); } },
  sfx: [[60.5, 'swish', 0.8], [61.75, 'popHi', 1]] });

// ---- 38 · "...seriously?" — he snorts
S(62.4, { tr: 'cut', cam: [[62.4, 540, 1100, 1.15], [63.82, 540, 1080, 1.2]],
  draw() { setLeoDesk({ blur: 2 }); char('leo', 760, FLOOR - 100, 0.82, { pose: [[0, 'idle']], emo: [[0, 'calm']], look: [-0.6, 0] }); desk(760, FLOOR + 20, 0.9);
    char('dani', 300, FLOOR + 30, 0.9, { pose: [[62.4, 'laughBelly'], [63.2, 'hips']], emo: [[62.4, 'laugh'], [63.2, 'smug']], look: [0.6, 0], lean: [[62.4, -0.06], [62.7, 0.05, 0.2], [63.0, -0.03, 0.2]], extras: { watch: 1, chain: 1 } }); },
  ui() { for (const [t, x, y] of [[62.6, 220, 560], [62.9, 380, 480]]) if (TT > t) { const k = springEase(TT - t, 300, 12); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); tText('PFF', 0, 0, 60, { color: PAL.yellow, stroke: '#2a1a00', strokeW: 12 }); ctx.restore(); } },
  sfx: [[62.6, 'popHi', 1.2], [62.9, 'popHi', 1.35]] });

// ---- 39 · Leo puts his glasses on — "my retirement plan"
S(63.82, { tr: 'zoomIn', capY: 1480, cam: [[63.82, 760, 1000, 1.8], [65.25, 760, 980, 1.9]],
  draw() { setLeoDesk({ blur: 9 }); char('leo', 760, FLOOR + 120, 0.95, { pose: [[63.82, 'thinkR'], [64.3, 'idle']], emo: [[0, 'serious'], [64.3, 'calm']], look: [-0.3, 0], extras: { glasses: TT > 64.15 } });
    if (TT < 64.15) { const y = lerp(560, 900, EZ.i2(clamp((TT - 63.85) / 0.3))); fillRR(640, y - 14, 240, 28, 10, '#1b1530'); }
    if (TT > 64.15 && TT < 64.5) sparkle(720, 930, 40 * (1 - (TT - 64.15) / 0.35), '#fff', TT * 4); },
  ui() { sticker('FINANZBERATER', 760, 520, 64.3, { bg: PAL.blue, size: 54 }); },
  sfx: [[64.15, 'ting'], [64.3, 'pop', 1]] });

// ---- 40 · "Bro, my pizza box is worth more than your whole inheritance"
S(65.25, { tr: 'whipL', cam: [[65.25, 380, 1100, 1.3], [66.9, 380, 1080, 1.4]],
  draw() { setLeoDesk({ blur: 5 }); char('dani', 380, FLOOR + 60, 0.95, { pose: [[0, 'holdBoth']], emo: [[0, 'grin'], [66.2, 'smug']], look: [0.5, 0], extras: { watch: 1, chain: 1 }, holdR: () => {}, holdL: () => {} });
    velvetBox(380, FLOOR - 260, 0.34); },
  ui() { sticker('SCHACHTEL > ERBE', 540, 560, 66.2, { bg: PAL.pink, size: 54 }); },
  sfx: [[65.35, 'swish', 0.9], [66.2, 'pop', 1]] });

// ---- 41 · the scale: the box outweighs the coin... for now
S(66.9, { tr: 'slide', cam: [[66.9, 540, 1000, 1.0], [68.75, 540, 980, 1.05]],
  draw() { setLeoDesk({ blur: 10 }); const drop = clamp((TT - 66.95) / 0.3), tilt = -0.32 * springEase(TT - 67.25, 160, 9);
    balance(540, 1500, 1.05, tilt, () => { const y = lerp(-600, 0, EZ.i2(drop)); velvetBox(0, y - 10, 0.32); }, () => coin(0, -30, 40, { sx: 1 })); },
  ui() { tText('PIZZASCHACHTEL', 220, 420, 46, { color: '#fff', stroke: '#1b1530', strokeW: 12 }); tText('1 CENT', 860, 420, 46, { color: PAL.yellow, stroke: '#1b1530', strokeW: 12 }); },
  sfx: [[67.25, 'thud'], [67.3, 'scaleCreak']] });

// ---- 42 · "Tell me that again in 25 days."
S(68.75, { tr: 'zoomIn', capY: 1480, cam: [[68.75, 760, 980, 1.85], [70.9, 760, 960, 2.05]],
  draw() { setLeoDesk({ blur: 10 }); char('leo', 760, FLOOR + 120, 0.95, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], look: [-0.4, 0], extras: { glasses: true }, tilt: -0.05 }); },
  ui() { vignette(0.5); sticker('COUNTDOWN: ' + (TT < 70.2 ? 25 : 25) + ' TAGE', 540, 520, 69.8, { bg: '#141026', size: 54 }); },
  sfx: [[69.75, 'boom'], [69.8, 'tick'], [70.3, 'tick'], [70.8, 'tick']] });
