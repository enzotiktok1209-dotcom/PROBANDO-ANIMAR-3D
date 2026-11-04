// =====================================================================
//  shots.js — GTA 6 (as the only one) vs a paperclip. 46 shots, timed to the trimmed voice (86.4 s) + end card.
// =====================================================================
const EARN = [[0, 0], [23.05, 1200], [28.8, 6000], [75.6, 8000]];
const VIEW = [[0, 0], [20.9, 10000, 1.2], [63.0, 12, 0.4]];
const VAL = [[0, 0.01], [36.14, 2], [37.76, 25], [39.5, 60], [48.1, 450], [66.84, 1500], [68.52, 4500], [70.78, 8000]];
const hudEarn = (o = {}) => hud('EINNAHMEN · KEVIN', EARN, { ...o });
const hudVal = (o = {}) => hud('WERT · JONAS', VAL, { cents: true, ...o });
const KEV = { headset: 1 };
const CHAT = [['xXGamer', 'GTA 6?!? WIE', '#52b8ff'], ['lena99', 'Neid 😭', '#ff8fc0'], ['Bro_77', 'Zeig die Map!', '#41f08a'], ['max', 'Wie bist du dran gekommen?', '#ffd23f'], ['NoScope', 'GOAT 🐐', '#ff8a1e'], ['tim', '10€ für dich!', '#41f08a'], ['sarah', 'Ich will auch 😩', '#ff8fc0']];

// ---- helpers
function bigArm(id, x0, y0, x1, y1, w = 150, open = false) {
  const L = LOOKS[id]; line(x0, y0, x1, y1, w, L.top); line(x0 + w * 0.18, y0, x1 + w * 0.12, y1, w * 0.25, L.topD);
  const a = Math.atan2(y1 - y0, x1 - x0); circ(x1 - Math.cos(a) * w * 0.25, y1 - Math.sin(a) * w * 0.25, w * 0.55, L.topD);
  ctx.save(); ctx.translate(x1 + Math.cos(a) * w * 0.25, y1 + Math.sin(a) * w * 0.25); ctx.rotate(a);
  if (open) { fillRR(-w * 0.4, -w * 0.55, w * 0.95, w * 1.1, w * 0.4, L.skin); for (let i = 0; i < 4; i++) fillRR(w * 0.4, -w * 0.5 + i * w * 0.28, w * 0.5, w * 0.22, w * 0.11, L.skin); fillRR(-w * 0.1, -w * 0.85, w * 0.45, w * 0.3, w * 0.15, L.skin); }
  else { circ(0, 0, w * 0.55, L.skin); for (let i = 0; i < 4; i++) circ(w * 0.38, -w * 0.36 + i * w * 0.24, w * 0.16, L.skinD); }
  ctx.restore();
}
function popText(str, x, y, t0, size, col, rot = 0, rise = 40) { if (TT < t0) return; const k = springEase(TT - t0, 300, 12); ctx.save(); ctx.translate(x, y - (TT - t0) * rise); ctx.rotate(rot); ctx.scale(k, k); tText(str, 0, 0, size, { color: col, stroke: '#1b0f2e', strokeW: size * 0.2 }); ctx.restore(); }
function priceTag(x, y, s, txt, rot = -0.1, col = '#ffffff') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot + Math.sin(TT * 2) * 0.03); ctx.scale(s, s); line(-170, -70, -250, -150, 5, '#ddd'); poly([[-170, -80], [220, -80], [220, 80], [-170, 80], [-230, 0]], col); circ(-185, 0, 14, '#1b1530'); tText(txt, 30, 4, 78, { color: '#1b1530', shadow: false, maxW: 360 }); ctx.restore(); }
function questionTyping(str, t0, t1, cutAt) {
  const n = Math.floor(clamp((TT - t0) / (t1 - t0)) * str.length), shown = str.slice(0, TT > cutAt ? Math.floor(clamp((cutAt - t0) / (t1 - t0)) * str.length) : n);
  const k = TT > cutAt ? RNG('qt', F).n(8) * clamp(1 - (TT - cutAt) * 2) : 0;
  fillRR(70, 170, 940, 130, 30, 'rgba(15,10,35,0.85)'); tText(shown + (Math.floor(TT * 4) % 2 ? '|' : ''), 540 + k, 236, 48, { color: '#fff', maxW: 880, shadow: false });
}
function iconCard(x, y, top, big, sub, col, t0, icon) {
  if (TT < t0) return; const k = springEase(TT - t0, 260, 15), w = 450, h = 380;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  fillRR(-w / 2 + 8, -h / 2 + 12, w, h, 28, 'rgba(0,0,0,0.38)'); fillRR(-w / 2, -h / 2, w, h, 28, col); fillRR(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 22, shade(col, 0.12));
  tText(top, 0, -h / 2 + 36, 26, { color: 'rgba(255,255,255,0.9)', shadow: false, letter: 3, weight: 800 });
  fillRR(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18, 'rgba(10,8,30,0.30)');
  const ik = springEase(TT - t0 - 0.12, 280, 12), bob = Math.sin(TT * 3 + x) * 4;
  ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2 + 22, -h / 2 + 62, w - 44, 170, 18); ctx.clip(); ctx.translate(0, -h / 2 + 150 + bob); ctx.scale(ik, ik);
  if (icon === 'game') { glow(0, -10, 200, '#ff9ad0', 0.35); gameConsole(-70, 75, 0.27); gameCase(70, 0, 0.36, 0.08); sparkle(150, -60, 14 * (0.6 + 0.4 * Math.sin(TT * 7)), '#fff'); }
  else { glow(0, 0, 160, '#ffffff', 0.2); paperclip(0, 0, 0.36, 0.5); }
  ctx.restore();
  tText(big, 0, h / 2 - 92, 50, { color: '#fff', maxW: w - 36 }); tText(sub, 0, h / 2 - 40, 28, { color: 'rgba(255,255,255,0.95)', shadow: false, weight: 800 });
  ctx.restore();
}
const raycol = (a, b) => rays(a, b, { cy: 940 });

// ---- 1 · the choice
S(0.0, { tr: 'cut', lift: 110, cam: [[0, 540, 1020, 1.0], [1.1, 540, 1010, 1.03]],
  draw() { setStudio(); char('kevin', 300, FLOOR - 40, 0.8, { emo: [[0, 'grin']], look: [0.4, -0.4], jump: [[0, 0], [0.3, 16, 0.12], [0.45, 0, 0.12]] }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']], look: [-0.3, -0.3] }); studioPodiums(); },
  ui() { tText('GTA 6 ODER BÜROKLAMMER?', 540, 200, 62, { color: PAL.yellow, stroke: '#240b5e', strokeW: 14, maxW: 1000 });
    iconCard(285, 462, 'OPTION 1', 'GTA 6', 'ALS EINZIGER', PAL.green, 0.03, 'game'); iconCard(795, 462, 'OPTION 2', 'BÜROKLAMMER', 'EINE EINZIGE', PAL.orange, 0.15, 'clip'); tText('VS', 540, 462, 50, { color: '#fff', stroke: PAL.red, strokeW: 26 }); },
  sfx: [[0.0, 'sting'], [0.03, 'pop', 1], [0.15, 'pop', 1.2]] });
// ---- 2 · insert: the only copy in the world
S(1.1, { tr: 'zoomIn', cam: [[1.1, 540, 960, 1.0], [2.2, 540, 960, 1.1]],
  draw() { raycol('#5a2bd6', '#7a3cff'); glow(540, 960, 520, '#ff9ad0', 0.5); const k = springEase(TT - 1.15, 220, 13); gameConsole(380, 1250, 0.95 * k); gameCase(700, 960, 1.05 * k, 0.08); twinkles('g2', 150, 600, 780, 700, 9, { s: 26 }); },
  ui() { sticker('ALS EINZIGER', 540, 420, 1.4, { bg: PAL.red, size: 62 }); },
  sfx: [[1.15, 'sparkle'], [1.4, 'pop', 1], [1.2, 'choir']] });
// ---- 3 · insert: ...or a paperclip (crickets)
S(2.2, { tr: 'whipL', cam: [[2.2, 540, 960, 1.15], [4.0, 540, 960, 1.0]],
  draw() { raycol('#c4520a', '#e86c0e'); const k = springEase(TT - 2.3, 200, 12); paperclip(540, 960, 2.4 * k, 0.4 + Math.sin(TT * 2) * 0.05); },
  ui() { tText('1 BÜROKLAMMER', 540, 420, 100, { color: '#fff', stroke: '#7a2a00', strokeW: 20, maxW: 980 }); popText('*zirp zirp*', 540, 1350, 3.2, 54, '#ffffff', 0, 10); },
  sfx: [[2.35, 'pop', 0.7], [3.2, 'crickets', 0.8]] });
// ---- 4 · Kevin slams before the question is over
S(4.0, { tr: 'whipR', lift: 90, cam: [[4.0, 320, 1140, 1.55], [6.0, 310, 1110, 1.7]], shake: [[4.9, 18, 0.35]],
  draw() { setStudio({ blur: 3 }); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'calm']] });
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[4.0, 'idle'], [4.4, 'raiseR'], [4.75, 'slamR']], emo: [[4.0, 'grin'], [4.75, 'angry'], [5.2, 'smug']], look: [0.4, 0.6] });
    studioPodiums({ pressL: TT > 4.88 ? 1 : 0, litL: TT > 4.88 ? 0.8 : 0 }); impactLines(300, 1250, 120, 380, 12, 4.88); },
  ui() { questionTyping('FRAGE: GTA 6 ODER EINE BÜRO—', 4.05, 6.2, 4.88); sticker('ZU SPÄT!', 760, 400, 4.95, { bg: PAL.red, rot: 0.08, size: 60 }); },
  sfx: [[4.1, 'typing', 0.7], [4.4, 'whooshUp', 1.2], [4.88, 'slam'], [4.95, 'buzzerWin']] });
// ---- 5 · the console drops into his arms
S(6.0, { tr: 'cut', cam: [[6.0, 540, 1000, 1.25], [7.75, 540, 980, 1.35]],
  draw() { setStudio({ blur: 6 }); const y = bounceY(TT - 6.05, -300, 0, 4200, 0.3);
    char('kevin', 540, FLOOR + 60, 0.95, { pose: [[0, 'holdBoth']], emo: [[6.0, 'shock'], [6.5, 'grin']], look: [0, -0.5], holdR: () => {}, holdL: () => {} });
    gameCase(540, FLOOR - 500 + y, 0.55, 0.05); confetti('c5', 6.45, 60, { x: 540, y: 900 }); },
  ui() { sticker('GTA 6!', 540, 420, 6.45, { bg: PAL.pink, size: 76, rot: -0.06 }); },
  sfx: [[6.05, 'whooshDown', 0.9], [6.45, 'cashCannon'], [6.5, 'pop', 1]] });
// ---- 6 · HAHAHA
S(7.75, { tr: 'flash', lift: 280, cam: [[7.75, 540, 1080, 1.1], [9.9, 540, 1050, 1.2]],
  draw() { setStudio(); char('jonas', 780, FLOOR - 40, 0.8, { emo: [[0, 'neutral']], look: [-0.7, -0.2], pose: [[0, 'holdR']], holdR: () => paperclip(0, -30, 0.18, 0.4) });
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[0, 'armsUp']], emo: [[0, 'laugh']], jump: [[7.75, 0], [7.85, 150, 0.2], [8.1, 0, 0.18], [8.35, 100, 0.18], [8.6, 0, 0.18]] }); studioPodiums({ litL: 0.5 }); confetti('c6', 7.7, 40, { x: 300, y: 1100 }); },
  ui() { popText('HAHAHA!', 330, 560, 7.85, 92, PAL.yellow, -0.1, 30); popText('GTA 6, BABY!', 560, 740, 9.0, 66, '#ff8fc0', 0.06, 10); },
  sfx: [[7.85, 'boing'], [8.35, 'boing'], [7.8, 'applause', 1.4], [9.0, 'pop', 1.1]] });
// ---- 7 · "Have fun with your office supplies!"
S(9.9, { tr: 'whipL', cam: [[9.9, 540, 1000, 1.65], [12.3, 540, 980, 1.78]],
  draw() { setStudio({ blur: 8 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'holdR'], [11.0, 'pointR']], emo: [[9.9, 'smug'], [11.0, 'laugh']], look: [0.4, 0], holdR: () => gameCase(0, -40, 0.3, -0.2) }); },
  ui() { popText('BÜROZEUG 😂', 780, 560, 11.55, 60, '#ffffff', 0.08, 10); },
  sfx: [[9.95, 'swish', 0.9], [11.55, 'popHi', 1]] });
// ---- 8 · Jonas, calm, takes the paperclip
S(12.3, { tr: 'whipR', lift: 90, cam: [[12.3, 780, 1150, 1.6], [14.6, 780, 1170, 1.72]],
  draw() { setStudio({ blur: 3 }); char('kevin', 300, FLOOR - 40, 0.8, { pose: [[0, 'cheer']], emo: [[0, 'laugh']] });
    char('jonas', 780, FLOOR - 40, 0.8, { pose: [[12.3, 'idle'], [12.9, 'raiseR'], [13.4, 'pressR']], emo: [[12.3, 'calm'], [13.7, 'happy']], look: [[12.3, [0, 0.2]], [12.9, [0.2, 0.7]]] });
    studioPodiums({ pressR: TT > 13.6 ? 0.6 : 0, litR: TT > 13.6 ? 0.6 : 0 }); if (TT > 13.6) twinkles('j8', 650, 1050, 260, 200, 6, { s: 22 }); },
  sfx: [[12.9, 'swish', 0.7], [13.6, 'click'], [13.66, 'ding']] });
// ---- 9 · the paperclip: worth 0,01 €
S(14.6, { tr: 'zoomIn', cam: [[14.6, 540, 960, 1.0], [16.2, 540, 960, 1.08]],
  draw() { setStudio({ blur: 10 }); bigArm('jonas', 1300, 1950, 640, 1150, 220, true); paperclip(620, 1040, 0.8, 0.5); },
  ui() { hudVal({ y: 300 }); sticker('WERT: 0,01 €', 540, 560, 14.8, { bg: PAL.orange, size: 56 }); },
  sfx: [[14.8, 'pop', 1], [15.0, 'coin', 1.6]] });
// ---- 10 · Kevin laughs at him
S(16.2, { tr: 'whipL', lift: 280, cam: [[16.2, 540, 1080, 1.15], [17.16, 540, 1060, 1.2]],
  draw() { setStudio({ blur: 2 }); char('jonas', 780, FLOOR - 40, 0.8, { pose: [[0, 'holdR']], emo: [[0, 'serious']], look: [-0.6, 0], holdR: () => paperclip(0, -30, 0.18, 0.4) });
    char('kevin', 300, FLOOR - 40, 0.8, { pose: [[0, 'laughBelly']], emo: [[0, 'laugh']], lean: [[16.2, -0.08], [16.45, 0.06, 0.2], [16.7, -0.04, 0.2]] }); studioPodiums(); },
  ui() { popText('HA', 200, 560, 16.3, 70, PAL.yellow, -0.2); popText('HA', 420, 470, 16.6, 70, PAL.yellow, 0.1); },
  sfx: [[16.3, 'popHi', 1], [16.6, 'popHi', 1.2]] });
// ---- 11 · the only one with GTA 6 → he goes live (gamer room)
S(17.16, { tr: 'zoomOut', lift: 260, cam: [[17.16, 540, 1150, 1.0], [19.4, 540, 1120, 1.08]],
  draw() { setGamerRoom(); gamingDesk(700, FLOOR + 60, 0.72, gameScreen); char('kevin', 250, FLOOR + 40, 0.9, { pose: [[17.16, 'idle'], [17.6, 'pointR'], [18.6, 'cheer']], emo: [[17.16, 'grin']], look: [0.6, 0], extras: KEV }); },
  ui() { sticker('DER EINZIGE MIT GTA 6', 540, 420, 18.3, { bg: PAL.pink, size: 50 }); },
  sfx: [[17.3, 'click'], [17.6, 'keys'], [18.3, 'pop', 1]] });
// ---- 12 · LIVE — the viewers pour in
S(19.4, { tr: 'cut', cam: [[19.4, 540, 960, 1.0], [22.2, 540, 960, 1.1]],
  draw() { setGamerRoom({ blur: 12 }); monitor(80, 560, 920, 540, gameScreen); },
  ui() { liveBadge(200, 640, 20.08); viewerCount(860, 640, VIEW); chatFeed(120, 1180, 840, 300, CHAT, 20.1, 6); popText('10.000 ZUSCHAUER!', 540, 440, 20.9, 64, '#41f08a', -0.04, 10); },
  sfx: [[20.08, 'liveOn'], [20.3, 'tickRun', 0.9], [20.9, 'impact']] });
// ---- 13 · donations: 1.200 € on the first night
S(22.2, { tr: 'whipR', cam: [[22.2, 540, 960, 1.05], [25.1, 540, 960, 1.0]],
  draw() { setGamerRoom({ blur: 12 }); monitor(80, 560, 920, 540, gameScreen); billRain('d13', 22.6, 30, { spread: 2.2 }); },
  ui() { hudEarn({ y: 300 }); [[22.4, '5 €'], [22.75, '20 €'], [23.05, '100 €'], [23.5, '50 €'], [23.9, '200 €']].forEach(([t, a], i) => donation(540, 1250 - (i % 2) * 140, t, a)); sticker('1. NACHT', 540, 480, 22.3, { bg: '#141026', size: 50 }); },
  sfx: [[22.4, 'donation'], [22.75, 'donation', 1.1], [23.05, 'cashReg'], [23.5, 'donation', 1.2], [23.9, 'donation', 1.3]] });
// ---- 14 · "Follow me, I'm getting rich gaming!"
S(25.1, { tr: 'zoomIn', cam: [[25.1, 540, 1000, 1.65], [28.0, 540, 980, 1.8]], punch: [[26.94, 0.14]],
  draw() { setGamerRoom({ blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[25.1, 'pointR'], [26.6, 'cheer']], emo: [[25.1, 'grin'], [26.6, 'laugh']], extras: KEV }); },
  ui() { liveBadge(170, 300, 25.1); sticker('REICH MIT ZOCKEN', 540, 460, 26.95, { bg: PAL.gold, fg: '#1b1530', size: 54 }); },
  sfx: [[25.2, 'swish', 0.8], [26.95, 'bling']] });
// ---- 15 · after a week: 6.000 €
S(28.0, { tr: 'flash', cam: [[28.0, 540, 960, 1.0], [30.18, 540, 960, 1.06]],
  draw() { raycol('#0c7a3e', '#11954c'); for (let i = 0; i < 24; i++) { const t = 28.3 + i * 0.04, yb = 1420 - Math.floor(i / 6) * 70, yy = TT - t < 0.4 ? bounceY(TT - t, 600, yb, 5200, 0.3) : yb; if (TT > t) bill(330 + (i % 6) * 84, yy, 200, 0, 1); } },
  ui() { tText('1 WOCHE', 540, 470, 120, { color: '#fff', stroke: '#063d1e', strokeW: 22 }); hudEarn({ y: 760, scale: 1.1 }); },
  sfx: [[28.3, 'moneyRain', 0.9], [28.8, 'cashReg']] });
// ---- 16 · BUT Jonas had a plan too (lightbulb)
S(30.18, { tr: 'glitch', cam: [[30.18, 540, 1000, 1.7], [32.05, 540, 980, 1.85]],
  draw() { setLeoRoom({ blur: 10 }); char('jonas', 540, FLOOR + 160, 1.0, { pose: [[0, 'thinkR']], emo: [[30.18, 'serious'], [31.4, 'smug']], look: [0.3, -0.4], holdR: () => {} });
    if (TT > 31.4) { const k = springEase(TT - 31.4, 300, 12); ctx.save(); ctx.translate(780, 660); ctx.scale(k, k); glow(0, 0, 160, '#fff3b0', 0.8); circ(0, 0, 60, '#ffe066'); fillRR(-24, 50, 48, 40, 8, '#9aa0b8'); ctx.restore(); } },
  sfx: [[31.4, 'ting'], [31.45, 'pop', 1.2]] });
// ---- 17 · TAUSCHEN — off to the flea market
S(32.05, { tr: 'whipL', lift: 260, cam: [[32.05, 540, 1150, 1.0], [35.0, 560, 1130, 1.08]],
  draw() { setFleaMarket(); const x = lerp(-150, 540, EZ.o2(clamp((TT - 32.05) / 1.6)));
    char('jonas', x, FLOOR + 40, 0.88, { pose: [[0, 'holdR']], emo: [[0, 'happy']], look: [0.6, 0], walk: [[32.05, 1], [33.6, 0]], holdR: () => paperclip(0, -30, 0.2, 0.4) }); },
  ui() { sticker('TAUSCHEN!', 540, 420, 32.1, { bg: PAL.green, size: 72, rot: -0.06 }); hudVal({ y: 230, scale: 0.8 }); },
  sfx: [[32.1, 'pop', 1], [32.2, 'footsteps', 1.5]] });
// ---- 18-20 · clip → pen → lamp → camping stove
function tradeShot(t0, t, oldFn, newFn, oldV, newV, tr) {
  S(t0, { tr, cam: [[t0, 540, 960, 1.0], [t0 + 1.6, 540, 960, 1.07]],
    draw() { setFleaMarket({ blur: 9 }); tradeSwap(540, 1050, t, oldFn, newFn, oldV, newV); },
    ui() { hudVal({ y: 230, scale: 0.8 }); popText('TAUSCH!', 540, 560, t, 70, '#41f08a', -0.06, 10); },
    sfx: [[t - 0.12, 'whoosh', 1.3], [t + 0.1, 'thud'], [t + 0.15, 'cashReg']] });
}
tradeShot(35.0, 36.14, () => paperclip(0, 0, 0.9, 0.5), () => penObj(0, 0, 1.4, 0.5), '0,01 €', '2 €', 'cut');
tradeShot(36.7, 37.76, () => penObj(0, 0, 1.4, 0.5), () => deskLamp(0, 200, 1.3), '2 €', '25 €', 'whipR');
tradeShot(38.3, 39.5, () => deskLamp(0, 200, 1.3), () => campStove(0, 120, 1.5, 1), '25 €', '60 €', 'whipL');
// ---- 21 · meanwhile Kevin streams... the lights flicker
S(40.4, { tr: 'zoomOut', lift: 260, cam: [[40.4, 540, 1150, 1.05], [41.95, 540, 1120, 1.15]],
  draw() { const fl = TT > 41.2 && (Math.floor(TT * 18) % 3 === 0); setGamerRoom({ dark: fl ? 0.7 : 0 }); gamingDesk(700, FLOOR + 60, 0.72, gameScreen); char('kevin', 250, FLOOR + 40, 0.9, { pose: [[0, 'holdBoth']], emo: [[40.4, 'grin'], [41.2, 'confused']], look: [[40.4, [0.6, 0]], [41.2, [0, -0.8]]], extras: KEV, holdR: () => {}, holdL: () => {} }); },
  sfx: [[40.5, 'tension', 1.4], [41.2, 'flicker']] });
// ---- 22 · BLACKOUT
S(41.95, { tr: 'cut', lift: 260, cam: [[41.95, 540, 1150, 1.05], [44.3, 540, 1100, 1.2]],
  draw() { setGamerRoom({ dark: 1 }); gamingDesk(700, FLOOR + 60, 0.72, gameScreen, { dark: true }); ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(-600, -400, 2300, 2800); char('kevin', 330, FLOOR + 40, 0.9, { pose: [[0, 'headGrab']], emo: [[0, 'shock']], extras: KEV }); ctx.fillStyle = rad(330, 1100, 0, 600, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,0.6)']]); ctx.fillRect(-600, -400, 2300, 2800); },
  ui() { sticker('STROMAUSFALL', 540, 300, 42.0, { bg: '#222034', size: 66 }); },
  sfx: [[41.96, 'powerDown'], [42.0, 'pop', 0.6]] });
// ---- 23 · "NO! I was live!" (lit by his phone)
S(44.3, { tr: 'zoomIn', cam: [[44.3, 540, 1000, 1.7], [46.25, 540, 960, 1.85]], shake: [[44.35, 22, 0.5]], punch: [[45.52, 0.14]],
  draw() { setGamerRoom({ dark: 1, blur: 8 }); char('kevin', 540, FLOOR + 170, 1.03, { pose: [[0, 'headGrab']], emo: [[0, 'shock']], extras: { ...KEV, sweat: 1 } });
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = rad(540, 1200, 0, 700, [[0, 'rgba(160,200,255,0.25)'], [1, 'rgba(0,0,0,0)']]); ctx.fillRect(-200, 400, 1500, 1400); ctx.restore(); },
  ui() { sticker('NICHT GESPEICHERT', 540, 420, 45.2, { bg: PAL.red, size: 52 }); },
  sfx: [[44.35, 'shockHit'], [45.2, 'errorBuzz']] });
// ---- 24 · ding dong — who's there? Jonas
S(46.25, { tr: 'whipR', lift: 230, cam: [[46.25, 600, 1100, 1.1], [47.85, 640, 1080, 1.2]],
  draw() { setDaniRoom(); ctx.fillStyle = 'rgba(2,1,10,0.7)'; ctx.fillRect(-600, -400, 2300, 2800); door(820, FLOOR - 20, 0.95, EZ.io(clamp((TT - 46.8) / 0.4)), '#7b4a2c');
    if (TT > 46.9) { char('jonas', 830, FLOOR - 20, 0.82, { pose: [[0, 'waveR']], emo: [[0, 'happy']], look: [-0.6, 0] }); } },
  ui() { if (TT < 47.0) popText('DING DONG!', 820, 560, 46.58, 66, PAL.yellow, 0.1, 10); },
  sfx: [[46.58, 'doorbell'], [46.85, 'creak']] });
// ---- 25 · ...with a generator — the light comes back
S(47.85, { tr: 'cut', lift: 230, cam: [[47.85, 640, 1120, 1.15], [49.35, 640, 1100, 1.22]],
  draw() { setDaniRoom(); const on = TT > 48.3; if (!on) { ctx.fillStyle = 'rgba(2,1,10,0.7)'; ctx.fillRect(-600, -400, 2300, 2800); }
    door(820, FLOOR - 20, 0.95, 1, '#7b4a2c'); char('jonas', 870, FLOOR - 20, 0.82, { pose: [[0, 'hips']], emo: [[0, 'smug']], look: [-0.6, 0] }); generator(560, FLOOR + 20, 0.9, on); if (on) glow(560, FLOOR - 200, 500, '#fff3b0', 0.25); },
  ui() { sticker('STROMGENERATOR', 540, 460, 48.1, { bg: PAL.orange, size: 54 }); },
  sfx: [[48.1, 'pop', 1], [48.3, 'genStart', 1.0]] });
// ---- 26 · the trade: camping stove → generator (60 → 450 €)
S(49.35, { tr: 'slide', cam: [[49.35, 540, 960, 1.0], [51.1, 540, 960, 1.06]],
  draw() { setFleaMarket({ blur: 9 }); tradeSwap(540, 1100, 49.6, () => campStove(0, 120, 1.5, 1), () => generator(0, 130, 1.2, true), '60 €', '450 €'); },
  ui() { hudVal({ y: 230, scale: 0.8 }); popText('TAUSCH!', 540, 560, 49.6, 70, '#41f08a', -0.06, 10); },
  sfx: [[49.5, 'whoosh', 1.3], [49.7, 'thud'], [49.75, 'cashReg']] });
// ---- 27 · "Need power? I'll trade it for your PlayStation."
S(51.1, { tr: 'zoomIn', cam: [[51.1, 540, 1000, 1.75], [53.7, 540, 980, 1.9]],
  draw() { setDaniRoom({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[51.1, 'hips'], [52.3, 'pointL']], emo: [[0, 'smug']], look: [-0.3, 0] }); },
  ui() { sticker('GENERATOR ⇄ PLAYSTATION?', 540, 420, 52.6, { bg: PAL.blue, size: 46 }); },
  sfx: [[52.3, 'swish', 0.8], [52.6, 'pop', 1]] });
// ---- 28 · "Never! I'm a streamer!"
S(53.7, { tr: 'whipL', cam: [[53.7, 540, 1000, 1.65], [55.48, 540, 980, 1.8]], punch: [[53.75, 0.14]],
  draw() { setGamerRoom({ dark: 0.6, blur: 9 }); char('kevin', 540, FLOOR + 160, 1.0, { pose: [[0, 'holdBoth']], emo: [[53.7, 'angry'], [54.8, 'smug']], extras: KEV, holdR: () => {}, holdL: () => {} }); gameConsole(540, FLOOR - 120, 0.55); },
  ui() { sticker('NIEMALS!', 540, 420, 53.75, { bg: PAL.red, size: 80, rot: -0.08 }); },
  sfx: [[53.75, 'punch'], [53.8, 'pop', 0.8]] });
// ---- 29 · one week later: GTA 6 is out for everyone
S(55.48, { tr: 'spin', cam: [[55.48, 540, 960, 1.0], [58.7, 540, 960, 1.08]],
  draw() { raycol('#5a2bd6', '#7a3cff'); for (let i = 0; i < 14; i++) { const t0 = 56.9 + i * 0.07, R = RNG('cs', i); if (TT < t0) continue; const y = bounceY(TT - t0, -300, 1050 + R.n(260), 4200, 0.25); gameCase(120 + (i % 7) * 140 + R.n(20), y, 0.42, R.n(0.4)); } },
  ui() { sticker('1 WOCHE SPÄTER', 540, 380, 55.55, { bg: '#141026', size: 56 }); if (TT > 57.0) sticker('JETZT FÜR ALLE!', 540, 520, 57.0, { bg: PAL.pink, size: 62, rot: -0.05 }); },
  sfx: [[55.55, 'pop', 1], [57.0, 'impact'], [57.1, 'paperPile', 1.4]] });
// ---- 30 · suddenly everyone has the game
S(58.7, { tr: 'whipR', lift: 260, cam: [[58.7, 540, 1150, 1.0], [60.3, 540, 1130, 1.06]],
  draw() { setStreet(); const ids = ['jonas', 'bote', 'mech', 'dani', 'leo'];
    ids.forEach((id, i) => char(id, 120 + i * 210, FLOOR + 40 - (i % 2) * 40, 0.62, { pose: [[0, 'holdR']], emo: [[0, 'happy']], look: [0.2, 0.3], holdR: () => gameCase(0, -30, 0.2, 0) })); },
  ui() { popText('JEDER HAT ES!', 540, 460, 58.9, 70, PAL.yellow, -0.05, 10); },
  sfx: [[58.8, 'applause', 1.2], [58.9, 'pop', 1.1]] });
// ---- 31 · Kevin's viewers: 10.000 → 12
S(60.3, { tr: 'cut', cam: [[60.3, 540, 960, 1.0], [62.2, 540, 960, 1.1]],
  draw() { setGamerRoom({ blur: 12 }); monitor(80, 560, 920, 540, gameScreen); },
  ui() { liveBadge(200, 640, 60.3); viewerCount(860, 640, VIEW); chatFeed(120, 1180, 840, 300, [['Bro_77', 'hab es jetzt selbst', '#41f08a'], ['lena99', 'bye 👋', '#ff8fc0'], ['max', '…', '#ffd23f']], 60.4, 1.5); },
  sfx: [[60.4, 'descend'], [61.6, 'swish', 0.7]] });
// ---- 32 · from 10.000 ... to 12
S(62.2, { tr: 'zoomIn', cam: [[62.2, 540, 1000, 1.7], [63.9, 540, 980, 1.85]],
  draw() { setGamerRoom({ blur: 10 }); char('kevin', 540, FLOOR + 170, 1.03, { pose: [[0, 'sad']], emo: [[0, 'sad']], extras: { ...KEV, tear: 1 } }); },
  ui() { popText('12', 820, 520, 63.26, 140, '#ff5a5a', 0.06, 0); },
  sfx: [[62.3, 'sadTrombone', 0.6], [63.26, 'crickets', 0.6]] });
// ---- 33 · so Jonas kept trading
S(63.9, { tr: 'whipL', lift: 260, cam: [[63.9, 540, 1150, 1.0], [65.7, 560, 1130, 1.06]],
  draw() { setStreet(); const x = lerp(-150, 440, EZ.o2(clamp((TT - 63.9) / 1.5))); char('jonas', x, FLOOR + 40, 0.88, { pose: [[0, 'offerR']], emo: [[0, 'happy']], look: [0.6, 0], walk: [[63.9, 1], [65.3, 0]] }); generator(x + 260, FLOOR + 40, 0.6, false); },
  ui() { hudVal({ y: 230, scale: 0.8 }); },
  sfx: [[63.95, 'footsteps', 1.4], [64.6, 'trolley', 1.0]] });
// ---- 34-36 · generator → moped → van → car
S(65.7, { tr: 'cut', cam: [[65.7, 540, 960, 1.0], [67.4, 540, 960, 1.06]],
  draw() { setStreet({ blur: 9 }); tradeSwap(540, 1100, 66.84, () => generator(0, 130, 1.1), () => moped(0, 150, 1.2, TT * 3), '450 €', '1.500 €'); },
  ui() { hudVal({ y: 230, scale: 0.8 }); popText('TAUSCH!', 540, 560, 66.84, 70, '#41f08a', -0.06, 10); },
  sfx: [[66.72, 'whoosh', 1.2], [66.9, 'mopedHorn'], [66.95, 'cashReg']] });
S(67.4, { tr: 'whipR', cam: [[67.4, 540, 960, 1.0], [69.3, 540, 960, 1.06]],
  draw() { setStreet({ blur: 9 }); tradeSwap(540, 1100, 68.52, () => moped(0, 150, 1.2), () => van(0, 180, 0.95, TT * 3), '1.500 €', '4.500 €'); },
  ui() { hudVal({ y: 230, scale: 0.8 }); popText('TAUSCH!', 540, 560, 68.52, 70, '#41f08a', -0.06, 10); },
  sfx: [[68.4, 'whoosh', 1.0], [68.6, 'thud'], [68.65, 'cashReg']] });
S(69.3, { tr: 'whipL', cam: [[69.3, 540, 960, 1.0], [71.2, 540, 960, 1.08]],
  draw() { setStreet({ blur: 9 }); tradeSwap(540, 1100, 70.78, () => van(0, 180, 0.95), () => compactCar(0, 160, 1.05, '#e8262f', TT * 3), '4.500 €', '8.000 €'); },
  ui() { hudVal({ y: 230, scale: 0.8 }); popText('TAUSCH!', 540, 560, 70.78, 70, '#41f08a', -0.06, 10); },
  sfx: [[70.66, 'whoosh', 0.9], [70.85, 'carHorn'], [70.9, 'cashReg']] });
// ---- 37 · Jonas parks in front of Kevin's window
S(71.2, { tr: 'zoomOut', lift: 260, cam: [[71.2, 540, 1200, 1.0], [72.9, 560, 1180, 1.06]],
  draw() { setNightStreet(); fillRR(60, 600, 340, 380, 12, '#1b1530'); fillRR(78, 618, 304, 344, 6, '#3a2a6a'); ctx.save(); ctx.beginPath(); ctx.rect(78, 618, 304, 344); ctx.clip(); char('kevin', 230, 1330, 0.6, { pose: [[0, 'sad']], emo: [[0, 'sad']], look: [0.8, 0.4], extras: KEV }); ctx.restore(); line(230, 618, 230, 962, 10, '#1b1530'); line(78, 790, 382, 790, 10, '#1b1530');
    const x = lerp(1500, 680, EZ.o3(clamp((TT - 71.25) / 1.2))); compactCar(x, 1690, 0.8, '#e8262f', x / 70); },
  sfx: [[71.3, 'engine'], [72.4, 'carHorn']] });
// ---- 38 · "Want a ride, streamer?"
S(72.9, { tr: 'zoomIn', cam: [[72.9, 540, 1000, 1.75], [74.3, 540, 980, 1.9]],
  draw() { setNightStreet({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'waveR']], emo: [[0, 'smug']], look: [-0.4, 0], extras: { glasses: true } }); },
  ui() { sticker('STREAMER 😏', 540, 420, 73.8, { bg: PAL.blue, size: 60 }); },
  sfx: [[73.0, 'carHorn'], [73.8, 'pop', 1]] });
// ---- 39-40 · Kevin earned 8.000 € — Jonas' car is worth 8.000 € — TIE
function splitBoth(o = {}) {
  ctx.save(); ctx.beginPath(); ctx.rect(-200, -400, 1480, 1360); ctx.clip(); rays('#5a2bd6', '#7a3cff', { cy: 560, spin: 0.08 });
  char('kevin', 270, 1180, 0.82, { pose: [[0, o.kPose ?? 'idle']], emo: [[0, o.kEmo ?? 'neutral']], look: [0.6, 0], extras: KEV }); gameConsole(760, 900, 0.5); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-200, 960, 1480, 1300); ctx.clip(); rays('#0c7a3e', '#11954c', { cy: 1440, spin: -0.08 });
  char('jonas', 270, 1990, 0.82, { pose: [[0, 'armsCross']], emo: [[0, o.jEmo ?? 'calm']], look: [0.5, 0], extras: { glasses: true } }); compactCar(780, 1720, 0.5); ctx.restore();
  line(-200, 960, 1280, 960, 16, '#ffffff');
}
S(74.3, { tr: 'flash', capY: 1790, cam: [[74.3, 540, 960, 1.0]],
  draw() { splitBoth({ kPose: 'cheer', kEmo: 'grin' }); },
  ui() { hud('EINNAHMEN · KEVIN', EARN, { x: 700, y: 330, scale: 0.92 }); hud('WERT · JONAS', [[0, 8000]], { x: 700, y: 1250, scale: 0.92, color: '#8ff0b0' }); },
  sfx: [[75.6, 'cashReg'], [75.62, 'pop', 1]] });
S(77.0, { tr: 'whipL', capY: 1790, cam: [[77.0, 540, 960, 1.0], [79.42, 540, 960, 1.05]],
  draw() { splitBoth({ kEmo: 'confused', jEmo: 'smug' }); },
  ui() { hud('EINNAHMEN · KEVIN', [[0, 8000]], { x: 700, y: 330, scale: 0.92 }); hud('WERT · JONAS', [[0, 4500], [78.05, 8000]], { x: 700, y: 1250, scale: 0.92 }); },
  sfx: [[77.1, 'heartbeat', 1.6], [78.05, 'cashReg']] });
S(79.42, { tr: 'cut', capY: 1790, cam: [[79.42, 540, 960, 1.0], [80.1, 540, 960, 1.04]],
  draw() { splitBoth({ kEmo: 'scared', kPose: 'headGrab', jEmo: 'smug' }); },
  ui() { hud('EINNAHMEN · KEVIN', [[0, 8000]], { x: 700, y: 330, scale: 0.92 }); hud('WERT · JONAS', [[0, 8000]], { x: 700, y: 1250, scale: 0.92 });
    const k = springEase(TT - 79.45, 320, 13); ctx.save(); ctx.translate(540, 960); ctx.scale(k, k); fillRR(-300, -66, 600, 132, 34, PAL.yellow); tText('GLEICHSTAND', 0, 2, 70, { color: '#1b1530', shadow: false }); ctx.restore(); },
  sfx: [[79.45, 'impact']] });
// ---- 41 · but Jonas has one more trade...
S(80.1, { tr: 'whipR', cam: [[80.1, 540, 1000, 1.7], [81.9, 540, 980, 1.85]],
  draw() { setNightStreet({ blur: 10 }); char('jonas', 540, FLOOR + 170, 1.05, { pose: [[0, 'holdR']], emo: [[0, 'smug']], look: [0.3, -0.2], extras: { glasses: true }, holdR: () => { fillRR(-30, -60, 60, 90, 20, '#15151d'); fillRR(-8, 30, 16, 50, 6, '#c0c4d4'); } }); },
  ui() { vignette(0.5); },
  sfx: [[80.15, 'keys'], [80.6, 'tension', 1.2]] });
// ---- 42 · ...and the next one is a HOUSE
S(81.9, { tr: 'zoomIn', cam: [[81.9, 540, 1000, 1.0], [83.46, 540, 980, 1.08]],
  draw() { setDark('#1a2a50', '#05060f'); const lit = clamp((TT - 83.1) / 0.3); houseIcon(540, 1250, 1.2, lit); if (lit < 1) { ctx.fillStyle = `rgba(5,6,15,${0.75 * (1 - lit)})`; ctx.fillRect(-600, -400, 2300, 2800); } },
  ui() { sticker('NÄCHSTER TAUSCH: ???', 540, 400, 82.0, { bg: '#141026', size: 56 }); if (TT > 83.16) sticker('EIN HAUS!', 540, 540, 83.16, { bg: PAL.green, size: 70 }); },
  sfx: [[82.0, 'pop', 0.9], [82.2, 'riserShort', 0.9], [83.16, 'impact']] });
// ---- 43 · and Kevin? streams for 12 people
S(83.46, { tr: 'whipL', cam: [[83.46, 540, 1050, 1.5], [86.4, 540, 1010, 1.65]],
  draw() { setGamerRoom({ blur: 8, dark: 0.4 }); char('kevin', 540, FLOOR + 150, 1.0, { pose: [[0, 'holdBoth']], emo: [[83.46, 'sad'], [85.3, 'confused']], extras: KEV, holdR: () => {}, holdL: () => {} }); },
  ui() { liveBadge(170, 300, 83.5); viewerCount(860, 300, [[0, 12]]); popText('*zirp zirp*', 540, 560, 85.0, 54, '#ffffff', 0, 10); },
  sfx: [[83.5, 'liveOn'], [85.0, 'crickets', 1.2]] });
// ---- 44 · to be continued
S(86.4, { tr: 'zoomOut', noCap: true, cam: [[86.4, 540, 960, 1.0], [89.5, 540, 960, 1.05]],
  draw() { setNightStreet({ blur: 18 }); ctx.fillStyle = 'rgba(10,6,24,0.62)'; ctx.fillRect(-600, -400, 2300, 2800); },
  ui() { const k = springEase(TT - 86.5, 220, 15); ctx.save(); ctx.translate(540, 780); ctx.scale(k, k); tText('WIRD', 0, -70, 110, { color: '#fff', stroke: '#140c22', strokeW: 18 }); tText('FORTGESETZT…', 0, 60, 110, { color: '#fff', stroke: '#140c22', strokeW: 18, maxW: 980 }); ctx.restore();
    sticker('TAUSCH 14: EIN HAUS?', 540, 1010, 87.0, { bg: PAL.yellow, fg: '#1b1530', size: 54 });
    if (TT > 87.7) { const p = 1 + 0.05 * Math.sin(TT * 8); ctx.save(); ctx.translate(540, 1160); ctx.scale(p, p); sticker('ZU TEIL 2 >>', 0, 0, 87.7, { bg: PAL.red, size: 50 }); ctx.restore(); } },
  sfx: [[86.45, 'impact'], [86.5, 'riser', 1.8], [87.0, 'pop', 1], [87.7, 'pop', 1.2]] });
