// =====================================================================
//  shots.js — Piraten-Token: eBay kaufen oder selbst suchen? (DE). ~42 short shots on the trimmed voice (80.4 s).
//  Jonas buys an "account with the token" on eBay (10.000 + 2.000 "fee"), gets an empty account: scam (Epic warns).
//  Kevin opens 1.000 chests a day; after 30 days the last chest glows gold. Question: chests still missing (137.500 - 30.000).
//  Everything is our own drawing (token, chests, shop, game screen) — no real game art, skins or logos.
//  Outfits: Kevin indigo hoodie + black beanie, Jonas orange hoodie + glasses.
// =====================================================================
Object.assign(LOOKS.kevin, { top: '#3a46b8', topD: '#27308a', topL: '#5d69d8' });
Object.assign(LOOKS.jonas, { top: '#ef7a22', topD: '#c45a10', topL: '#ff9a4a' });
LOOKS.seller = LOOKS.seller || LOOKS.jason;
function popText(str, x, y, t0, size, col, rot = 0, rise = 30) { if (TT < t0) return; const k = springEase(TT - t0, 300, 12); ctx.save(); ctx.translate(x, y - (TT - t0) * rise); ctx.rotate(rot); ctx.scale(k, k); tText(str, 0, 0, size, { color: col, stroke: '#0b0912', strokeW: size * 0.2, maxW: 980 }); ctx.restore(); }
function info(str, t0, o = {}) { sticker(str, o.x ?? 540, o.y ?? 420, t0, { bg: o.bg ?? '#141026', fg: o.fg, size: o.size ?? 52, rot: o.rot ?? -0.03 }); }
const CLOSE = (t0, t1, x = 540) => [[t0, x, 1000, 1.65], [t1, x, 978, 1.8]];
const WD = (t0, t1, y = 1060, z0 = 1.0, z1 = 1.1) => [[t0, 540, y, z0], [t1, 540, y - 20, z1]];
const cash = (seed, t0, n = 22, o = {}) => { if (TT > t0) billRain(seed, t0, n, { spread: 1.5, ...o }); };
const kv = (x, y, s, T = {}) => char('kevin', x, y, s, T);
const jn = (x, y, s, T = {}) => char('jonas', x, y, s, { ...T, extras: { glasses: true, ...(T.extras || {}) } });
const kRoom = (o = {}) => setGamerRoom(o);
const jRoom = (o = {}) => setDaniRoom(o);
// Kevin's progress, top of his shots
const kHud = (n) => () => chestCounter(540, 300, 0.85, typeof n === 'function' ? n() : n);
const phoneShot = (fn, rot = 0.04) => phone(540, 960, 3.0, rot, fn);
function pirateCove(o = {}) { setIsland({ night: o.night ?? 0, blur: o.blur }); }

// =====================================================================  THE HOOK (question on screen from frame one)
// ---- 1 · "Einen Fortnite-Account" — the token slams in over a pirate cove, the two options
S(0.0, { tr: 'cut', lift: 0, raise: 0, cam: [[0, 540, 960, 2.2], [0.2, 540, 960, 1.0], [1.21, 540, 950, 1.06]], shake: [[0.2, 16, 0.4]],
  draw() { pirateCove({ blur: 3 }); ctx.fillStyle = 'rgba(10,6,30,0.35)'; ctx.fillRect(-600, -400, 2300, 2800); pirateToken(540, 900, 230, { sx: Math.cos(TT * 3) }); },
  ui() { tText('KAUFEN', 540, 300, 104, { color: '#ffffff', stroke: '#0b0912', strokeW: 20 }); tText('ODER SUCHEN?', 540, 430, 92, { color: '#ffe14d', stroke: '#0b0912', strokeW: 18 }); fact('10.000 €', 0.3, 280, 1290, { size: 56, bg: '#18a34a', rot: -0.06 }); fact('1 : 137.500', 0.45, 790, 1290, { size: 56, bg: '#ff2e4d', rot: 0.06 }); },
  sfx: [[0.02, 'impact'], [0.2, 'coinBounce'], [0.3, 'bling']] });
// ---- 2 · "…mit Piraten-Token" — close on the spinning token, gold rays
S(1.21, { tr: 'zoomIn', lift: 0, raise: 0, cam: [[1.21, 540, 960, 1.0], [2.56, 540, 960, 1.15]],
  draw() { rays('#8a6400', '#e8b400', { cy: 960, spin: 0.4 }); pirateToken(540, 960, 300, { sx: Math.cos((TT - 1.2) * 5) }); twinkles('t2', 260, 600, 560, 700, 10, { s: 26 }); },
  ui() { fact('PIRATEN-TOKEN 🏴‍☠️', 1.4, 540, 430, { size: 66, bg: '#1b1530' }); },
  sfx: [[1.3, 'sparkle'], [1.4, 'stamp', 0.8]] });
// ---- 3 · "…für 10.000 Euro kaufen?" — the eBay listing on a phone, cash flying
S(2.56, { tr: 'slash', lift: 0, raise: 30, cam: [[2.56, 540, 960, 1.0], [4.05, 540, 950, 1.05]],
  draw() { setDark('#16304a', '#04070c'); cash('h3', 2.6, 18); phoneShot(() => listingScreen('10.000 €')); },
  ui() { fact('10.000 € 💸', 2.95, 540, 300, { size: 76, bg: '#18a34a' }); },
  sfx: [[2.6, 'moneyRain', 1.0], [2.95, 'cashReg']] });
// ---- 4 · "Oder mit einer Chance von 1…" — a sea of chests on the beach, only one might hold it
S(4.05, { tr: 'whipL', lift: 0, cam: [[4.05, 540, 1060, 1.0], [5.75, 540, 1040, 1.1]],
  draw() { pirateCove(); for (let r = 0; r < 4; r++) for (let i = 0; i < 6; i++) lootChest(110 + i * 175 + (r % 2) * 80, 1240 + r * 120, 0.32 + r * 0.05, { gold: r === 2 && i === 3 ? 0.4 + 0.3 * Math.sin(TT * 6) : 0 }); },
  ui() { fact('ODER SELBST SUCHEN?', 4.2, 540, 430, { size: 58, bg: '#1d3fb0' }); },
  sfx: [[4.1, 'waves', 1.2], [4.2, 'pop', 1], [4.9, 'creak', 1.4]] });
// ---- 5 · "…zu 137.500?" — the odds slam: 1 : 137.500
S(5.75, { tr: 'rgb', tense: 1, lift: 0, raise: 0, cam: [[5.75, 540, 960, 1.0], [8.18, 540, 950, 1.1]], shake: [[6.4, 14, 0.4]],
  draw() { setDark('#3a0a2a', '#05020a'); for (let i = 0; i < 60; i++) { const R = RNG('ch5', i); lootChest(R.f() * 1200 - 60, 400 + R.f() * 1300, 0.14 + R.f() * 0.08); } ctx.fillStyle = 'rgba(5,2,10,0.55)'; ctx.fillRect(-600, -400, 2300, 2800); },
  ui() { fact('CHANCE', 6.0, 540, 760, { size: 60, bg: '#141026' }); fact('1 : 137.500', 6.4, 540, 960, { size: 120, bg: '#ff2e4d', rot: -0.04 }); },
  sfx: [[6.0, 'pop', 1], [6.4, 'slam'], [6.6, 'coinTicks', 1.0, 5]] });
// ---- 6 · "Mit dem Piraten-Token ist fast der ganze Shop…" — the item shop
S(8.18, { tr: 'push', lift: 0, raise: 0, cam: [[8.18, 540, 960, 1.0], [10.03, 540, 950, 1.06]],
  draw() { setDark('#2a1a6a', '#0a0620'); shopGrid(540, 1000, 0.95, 0); },
  sfx: [[8.3, 'powerOn'], [8.6, 'click'], [9.2, 'click']] });
// ---- 7 · "…14 Tage lang gratis." — prices crossed out: GRATIS, a "14 TAGE" badge
S(10.03, { tr: 'cut', lift: 0, raise: 0, cam: [[10.03, 540, 960, 1.06], [12.03, 540, 950, 1.12]], punch: [[11.3, 0.06]],
  draw() { setDark('#2a1a6a', '#0a0620'); shopGrid(540, 1000, 0.95, clamp((TT - 10.3) / 1.2)); },
  ui() { fact('14 TAGE GRATIS 🎁', 11.3, 540, 300, { size: 66, bg: '#18a34a' }); },
  sfx: [[10.4, 'paperTear'], [10.8, 'paperTear'], [11.3, 'bling']] });

// =====================================================================  JONAS BUYS
// ---- 8 · "Jonas zögert keine Sekunde:" — he snatches his phone off the desk
S(12.03, { tr: 'whipR', cam: CLOSE(12.03, 13.73),
  draw() { jRoom({ blur: 9 }); jn(540, FLOOR + 170, 1.05, { pose: [[12.03, 'idle'], [12.4, 'phoneR', 0.12]], emo: [[12.03, 'serious'], [12.6, 'grin']], holdR: () => (TT > 12.4 ? phone(0, -30, 0.32, 0.15, () => listingScreen()) : null) }); },
  ui() { info('KEINE SEKUNDE ZÖGERN ⚡', 12.2, { size: 50 }); },
  sfx: [[12.35, 'swish', 1.3], [12.5, 'phoneTap']] });
// ---- 9 · "Er kauft sofort einen Account auf eBay." — thumb on SOFORT KAUFEN
S(13.73, { tr: 'zoomIn', lift: 0, raise: 30, cam: [[13.73, 540, 960, 1.0], [15.78, 540, 940, 1.08]],
  draw() { setDark('#2a1a10', '#08040a'); phoneShot(() => listingScreen('10.000 €', TT > 14.9 ? 1 : 0)); if (TT > 14.85 && TT < 15.1) glow(540, 1290, 260, '#ffffff', 0.7); },
  ui() { if (TT > 14.9) fact('GEKAUFT ✓', 14.95, 540, 300, { size: 70, bg: '#18a34a' }); },
  sfx: [[14.85, 'click'], [14.95, 'buzzerWin']] });
// ---- 10 · "10.000 Euro, direkt überwiesen." — the transfer: bills sucked into the phone, -10.000
S(15.78, { tr: 'blinds', lift: 0, raise: 30, cam: [[15.78, 540, 960, 1.0], [18.07, 540, 950, 1.06]],
  draw() { rays('#5a0a14', '#a8142a', { cy: 960, spin: 0.25 }); for (let i = 0; i < 12; i++) { const R = RNG('b10', i), u = ((TT - 15.8) * 0.9 + R.f()) % 1; bill(lerp(R.f() * 1080, 540, u), lerp(-100, 960, u), 160 * (1 - u * 0.7), u * 6 + R.f()); } bankApp(540, 980, 2.6, '– 10.000 €', '#e8262f'); },
  ui() { fact('ÜBERWIESEN ✈️', 16.9, 540, 300, { size: 64, bg: '#ff2e4d' }); },
  sfx: [[15.85, 'planeWhoosh', 1.2], [16.3, 'cashReg'], [16.9, 'stamp']] });
// ---- 11 · "Warum suchen, wenn man kaufen kann?" — Jonas scoffs, leans back, chuckles
S(18.07, { tr: 'whipL', cam: [[18.07, 540, 990, 1.85], [20.65, 540, 975, 2.0]],
  draw() { jRoom({ blur: 10 }); jn(540, FLOOR + 170, 1.05, { pose: [[18.07, 'shrug'], [19.6, 'armsCross', 0.2]], emo: [[18.07, 'smug'], [20.0, 'laugh']], tilt: [[18.07, 0], [18.4, -0.08], [20.0, 0.06], [20.3, -0.05]] }); },
  ui() { popText('„WARUM SUCHEN?" 😏', 540, 430, 18.4, 70, '#ffffff', -0.04, 0); },
  sfx: [[18.1, 'swish', 0.8], [20.0, 'boing']] });

// =====================================================================  KEVIN'S PLAN
// ---- 12 · "Kevin dagegen macht sich einen Plan:" — a whiteboard: 1.000 TRUHEN / TAG
S(20.65, { tr: 'ink', lift: 0, cam: WD(20.65, 22.47, 1060, 1.05, 1.12),
  draw() { kRoom({ blur: 3 }); fillRR(120, 480, 840, 520, 18, '#ffffff'); ctx.lineWidth = 10; ctx.strokeStyle = '#9aa3b8'; ctx.strokeRect(120, 480, 840, 520); tText('KEVINS PLAN', 540, 560, 54, { color: '#1d2a4a', shadow: false });
    if (TT > 21.4) tText('1.000 TRUHEN', 540, 720, 84, { color: '#e8262f', shadow: false }); if (TT > 21.8) tText('JEDEN TAG ✔', 540, 860, 64, { color: '#18793a', shadow: false });
    kv(880, 2020, 1.0, { pose: [[0, 'writeR']], emo: [[0, 'serious']], look: [-0.6, -0.4] }); },
  sfx: [[21.0, 'pencil', 0.4], [21.4, 'pop', 1], [21.8, 'pop', 1.2]] });
// ---- 13 · "Jeden Tag öffnet er genau 1.000 Truhen." — at his PC, chests on the map; the counter starts
S(22.47, { tr: 'push', lift: 0, cam: WD(22.47, 25.43, 1080, 1.05, 1.15), hud: kHud(() => clamp((TT - 22.6) / 2.6) * 1000),
  draw() { kRoom({ blur: 2 }); gameScreen(540, 820, 700, 440, { label: 'TRUHEN: ' + Math.round(clamp((TT - 22.6) / 2.6) * 1000) }); fillRR(160, 1120, 760, 30, 10, '#2b2b36'); kv(540, FLOOR + 240, 0.9, { pose: [[0, 'holdBoth']], emo: [[0, 'serious']], look: [0, -0.4] }); },
  sfx: [[22.6, 'typing', 2.4], [23.2, 'creak', 1.6], [23.9, 'creak', 1.8], [24.6, 'creak', 1.5]] });
// ---- 14 · "Nach dem ersten Tag: nichts." — the counter 1.000, a red "0 TOKEN"
S(25.43, { tr: 'cut', lift: 0, cam: [[25.43, 540, 1000, 1.05], [27.23, 540, 990, 1.1]], hud: kHud(1000),
  draw() { kRoom({ blur: 8 }); lootChest(540, 1250, 1.3, { open: 1 }); },
  ui() { fact('TAG 1', 25.5, 540, 480, { size: 60, bg: '#141026' }); stampMark('0 TOKEN', 26.6, 540, 640, '#ff2e4d', 90); },
  sfx: [[25.5, 'pop', 1], [26.6, 'errorBuzz']] });
// ---- 15 · "Nur Munition und ein paar Heilitems." — the loot flies out
S(27.23, { tr: 'whipU', lift: 0, cam: [[27.23, 540, 1000, 1.05], [29.49, 540, 990, 1.12]], hud: kHud(1000),
  draw() { kRoom({ blur: 8 }); lootChest(540, 1350, 1.2, { open: 1 }); const it = (t0, f, dx) => { const u = clamp((TT - t0) / 0.6); if (u <= 0) return; f(540 + dx * u, 1150 - Math.sin(u * Math.PI * 0.8) * 420 - u * 80, 1.3, u * 2); };
    it(27.4, ammoBox, -280); it(27.7, bandage, 280); it(28.0, potion, 0); },
  ui() { fact('MUNITION 🔫', 27.5, 300, 420, { size: 46, bg: '#5a6a3a', rot: -0.08 }); fact('HEILITEMS 🩹', 28.4, 780, 420, { size: 46, bg: '#52b8ff', fg: '#0b1a33', rot: 0.06 }); },
  sfx: [[27.4, 'pop', 0.9], [27.7, 'pop', 1.1], [28.0, 'bubble'], [28.4, 'pop', 1.3], [29.0, 'sadTrombone', 0.5]] });

// =====================================================================  JONAS WAITS
// ---- 16 · "Währenddessen wartet Jonas auf seine Zugangsdaten." — staring at an empty inbox
S(29.49, { tr: 'slash', cam: CLOSE(29.49, 32.03),
  draw() { jRoom({ blur: 9 }); jn(540, FLOOR + 170, 1.05, { pose: [[0, 'phoneR']], emo: [[29.49, 'neutral'], [31.0, 'confused']], holdR: () => phone(0, -30, 0.32, 0.15, () => { ctx.fillStyle = '#ffffff'; ctx.fillRect(-84, -176, 168, 352); tText('POSTEINGANG', 0, -140, 14, { color: '#1b1530', shadow: false }); tText('KEINE MAILS', 0, 0, 16, { color: '#9aa3b8', shadow: false }); }) }); },
  ui() { info('WARTEN AUF ZUGANGSDATEN… ⏳', 29.6, { size: 46 }); },
  sfx: [[29.6, 'pop', 1], [30.4, 'tick'], [31.0, 'tick'], [31.6, 'tick']] });
// ---- 17 · "Ein Tag." — the wall clock spins, the window goes from day to night
S(32.03, { tr: 'iris', lift: 0, cam: WD(32.03, 33.33, 1060, 1.1, 1.16),
  draw() { jRoom({ blur: 4 }); ctx.fillStyle = `rgba(10,10,40,${0.4 * Math.abs(Math.sin((TT - 32) * 2.5))})`; ctx.fillRect(-600, -400, 2300, 2800); circ(800, 560, 130, '#f4efe0'); clockFace(800, 560, 120, (TT - 32) * 18); jn(380, FLOOR + 60, 0.9, { pose: [[0, 'hips']], emo: [[0, 'confused']], look: [0.6, -0.4] }); },
  ui() { fact('1 TAG', 32.1, 540, 420, { size: 70, bg: '#141026' }); },
  sfx: [[32.05, 'clockSpin', 1.2], [32.1, 'pop', 1]] });
// ---- 18 · "Zwei Tage." — he lies upside down on the sofa, sighing
S(33.33, { tr: 'cut', lift: 0, cam: WD(33.33, 34.33, 1100, 1.15, 1.2),
  draw() { jRoom({ blur: 4 }); sofa(540, 1500, 1.25, '#5a5f73'); ctx.save(); ctx.translate(540, 1330); ctx.rotate(-Math.PI / 2); jn(0, 0, 0.6, { emo: [[0, 'sleepy']] }); ctx.restore(); },
  ui() { fact('2 TAGE 😩', 33.4, 540, 420, { size: 70, bg: '#141026' }); },
  sfx: [[33.4, 'pop', 1], [33.6, 'breath']] });
// ---- 19 · "Dann kommt endlich eine Nachricht vom Verkäufer:" — buzz, the chat opens
S(34.33, { tr: 'zoomIn', lift: 0, raise: 30, cam: [[34.33, 540, 960, 1.0], [36.59, 540, 950, 1.06]],
  draw() { setDark('#0a2a26', '#020806'); phoneShot(() => chatScreen([[34.6, '!!!', false, '#ffe14d']]), Math.sin(TT * 40) * (TT < 35 ? 0.03 : 0)); },
  ui() { fact('NEUE NACHRICHT 📩', 34.5, 540, 300, { size: 60, bg: '#075e54' }); },
  sfx: [[34.4, 'buzzPhone'], [34.5, 'notify']] });
// ---- 20 · "Noch 2.000 Euro Gebühr, dann bekommst du den Account." — the shady seller and his message
S(36.59, { tr: 'ink', lift: 0, raise: 0, cam: [[36.59, 540, 960, 1.0], [39.98, 540, 950, 1.06]],
  draw() { setDark('#2a0a14', '#05020a'); shadySeller(300, 1500, 1.4); phone(760, 960, 2.0, 0.06, () => chatScreen([[36.7, 'NOCH 2.000 €\nGEBÜHR', false], [38.3, 'DANN BEKOMMST\nDU DEN ACCOUNT', false]])); },
  ui() { fact('+ 2.000 € GEBÜHR?! 🤨', 37.4, 540, 300, { size: 56, bg: '#ff2e4d' }); },
  sfx: [[36.7, 'notify'], [37.4, 'dun'], [38.3, 'notify']] });
// ---- 21 · "Jonas überweist wieder." — annoyed, he taps send again
S(39.98, { tr: 'whipR', cam: CLOSE(39.98, 41.31),
  draw() { jRoom({ blur: 9 }); jn(540, FLOOR + 170, 1.05, { pose: [[0, 'phoneR']], emo: [[0, 'angry']], holdR: () => phone(0, -30, 0.32, 0.15, () => bankApp ? (ctx.fillStyle = '#1d48b8', ctx.fillRect(-84, -176, 168, 352), tText('– 2.000 €', 0, 0, 22, { color: '#fff', shadow: false })) : null) }); },
  ui() { info('SCHON WIEDER… 😤', 40.1, { size: 52 }); },
  sfx: [[40.1, 'pop', 1], [40.6, 'cashReg']] });
// ---- 22 · "Jetzt sind es schon 12.000 Euro." — the sum: 10.000 + 2.000 = 12.000
S(41.31, { tr: 'blinds', lift: 0, raise: 0, cam: [[41.31, 540, 960, 1.0], [44.13, 540, 950, 1.08]], shake: [[42.6, 14, 0.4]],
  draw() { rays('#5a0a14', '#a8142a', { cy: 960, spin: 0.2 }); },
  ui() { fact('10.000 €', 41.4, 540, 620, { size: 80, bg: '#141026' }); fact('+ 2.000 €', 41.9, 540, 780, { size: 80, bg: '#141026', rot: 0.04 }); fact('= 12.000 € WEG? 😬', 42.6, 540, 1000, { size: 76, bg: '#ff2e4d' }); },
  sfx: [[41.4, 'pop', 1], [41.9, 'pop', 1.2], [42.6, 'slam'], [42.65, 'cashReg']] });

// =====================================================================  KEVIN KEEPS GOING
// ---- 23 · "Kevin öffnet weiter Truhen, sogar nachts," — night, a yawn, the monitor glow
S(44.13, { tr: 'iris', cam: CLOSE(44.13, 46.54), hud: kHud(() => 5000 + (TT - 44.13) * 400),
  draw() { kRoom({ dark: 1, blur: 9 }); ctx.fillStyle = 'rgba(10,10,50,0.35)'; ctx.fillRect(-600, -400, 2300, 2800); glow(540, 900, 500, '#52b8ff', 0.25); circ(860, 420, 60, '#fff3c0'); kv(540, FLOOR + 170, 1.05, { pose: [[0, 'holdBoth']], emo: [[44.13, 'sleepy'], [45.4, 'serious']] }); },
  ui() { info('SOGAR NACHTS 🌙', 44.3, { size: 52 }); },
  sfx: [[44.3, 'pop', 1], [44.8, 'creak', 1.5], [45.5, 'crickets']] });
// ---- 24 · "…mit Energydrinks und Pizza." — the desk fills with cans and pizza boxes
S(46.54, { tr: 'cut', lift: 0, cam: [[46.54, 540, 1100, 1.15], [48.26, 540, 1090, 1.22]], raise: 0,
  draw() { kRoom({ dark: 1, blur: 6 }); fillRR(-100, 1240, 1280, 60, 10, '#2b2b36'); const n = Math.floor(clamp((TT - 46.6) / 1.4) * 7); for (let i = 0; i < n; i++) energyCan(130 + i * 95, 1240, 1.6, 0, ['#41f08a', '#ff4fa3', '#52b8ff'][i % 3]); for (let i = 0; i < Math.min(3, Math.floor((TT - 46.8) / 0.4)); i++) pizzaBox(800, 1230 - i * 70, 1.1); },
  ui() { fact('🥤 + 🍕', 46.7, 540, 450, { size: 80, bg: '#ff9a3c', fg: '#1b1530' }); },
  sfx: [[46.7, 'pop', 1], [47.0, 'canOpen'], [47.4, 'canOpen'], [47.8, 'crunch']] });

// =====================================================================  THE EMPTY ACCOUNT
// ---- 25 · "Am zehnten Tag bekommt Jonas endlich die Zugangsdaten." — day 10, an email, he cheers
S(48.26, { tr: 'whipL', lift: 0, cam: WD(48.26, 51.33, 1080, 1.1, 1.18),
  draw() { jRoom({ blur: 4 }); ctx.save(); ctx.translate(800, 620); monthCal(0, 0, 0.6, 'TAG 10'); ctx.restore(); jn(380, FLOOR + 60, 0.95, { pose: [[48.26, 'phoneR'], [50.0, 'cheer', 0.2]], emo: [[48.26, 'neutral'], [49.4, 'happy'], [50.0, 'laugh']], holdR: () => (TT < 50 ? phone(0, -30, 0.32, 0.15, () => { ctx.fillStyle = '#ffffff'; ctx.fillRect(-84, -176, 168, 352); tText('ZUGANGSDATEN', 0, -40, 14, { color: '#1b1530', shadow: false }); }) : null) }); },
  ui() { fact('ENDLICH! 📧', 49.5, 540, 420, { size: 66, bg: '#18a34a' }); },
  sfx: [[48.3, 'flip'], [49.4, 'notify'], [49.5, 'pop', 1], [50.0, 'applause', 0.5]] });
// ---- 26 · "Er loggt sich ein," — the login, password dots, loading
S(51.33, { tr: 'zoomIn', lift: 0, raise: 30, cam: [[51.33, 540, 960, 1.0], [52.59, 540, 950, 1.05]],
  draw() { setDark('#10142a', '#020308'); phoneShot(() => loginScreen(51.4, TT > 52 ? 'load' : 'type')); },
  sfx: [[51.4, 'typing', 0.6], [52.0, 'click']] });
// ---- 27 · "…und der Account ist leer." — the locker: 0 ITEMS
S(52.59, { tr: 'rgb', lift: 0, raise: 30, cam: [[52.59, 540, 960, 1.0], [53.89, 540, 950, 1.08]], shake: [[52.65, 12, 0.3]],
  draw() { setDark('#1a1440', '#05030c'); emptyLocker(540, 960, 860, 640); },
  sfx: [[52.6, 'gasp'], [52.7, 'powerDown']] });
// ---- 28 · "Kein Token. Gar nichts." — Jonas, frozen in shock; a tumbleweed rolls past
S(53.89, { tr: 'cut', tense: 1, cam: [[53.89, 540, 990, 1.85], [55.77, 540, 975, 2.0]],
  draw() { jRoom({ blur: 10 }); jn(540, FLOOR + 170, 1.05, { pose: [[0, 'headGrab']], emo: [[0, 'shock']], extras: { sweat: 1 } }); const x = lerp(-100, 1200, (TT - 54.4) / 1.4); if (TT > 54.4) { ctx.save(); ctx.translate(x, 1350); ctx.rotate(TT * 6); ctx.lineWidth = 6; ctx.strokeStyle = '#a8733f'; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.arc(0, 0, 50, i, i + 2.4); ctx.stroke(); } ctx.restore(); } },
  ui() { stampMark('KEIN TOKEN', 54.0, 540, 430, '#ff2e4d', 84); },
  sfx: [[54.0, 'stamp'], [54.5, 'whistle']] });
// ---- 29 · "Er schreibt dem Verkäufer." — frantic typing: HALLO???
S(55.77, { tr: 'whipU', lift: 0, raise: 30, cam: [[55.77, 540, 960, 1.0], [57.27, 540, 950, 1.06]],
  draw() { setDark('#0a2a26', '#020806'); phoneShot(() => chatScreen([[55.85, 'HALLO???', true], [56.25, 'WO IST DER\nTOKEN?!', true], [56.6, '???', true]])); },
  sfx: [[55.85, 'typing', 1.1], [56.25, 'phoneTap'], [56.6, 'phoneTap']] });
// ---- 30 · "Account gelöscht." — the seller's account turns grey: "gelöscht"
S(57.27, { tr: 'glitch', lift: 0, raise: 30, cam: [[57.27, 540, 960, 1.0], [58.42, 540, 950, 1.06]],
  draw() { setDark('#2a0a14', '#05020a'); phoneShot(() => { chatScreen([[0, 'HALLO???', true], [0, 'WO IST DER\nTOKEN?!', true]], 'GELÖSCHT'); ctx.fillStyle = 'rgba(80,80,90,0.55)'; ctx.fillRect(-84, -176, 168, 352); fillRR(-74, 40, 148, 60, 10, '#3a3a48'); tText('ACCOUNT', 0, 60, 16, { color: '#fff', shadow: false }); tText('GELÖSCHT', 0, 82, 16, { color: '#ff4545', shadow: false }); }); },
  sfx: [[57.3, 'glitch'], [57.6, 'gulp']] });
// ---- 31 · "Das Geld ist weg." — the bills fly away out of reach, -12.000
S(58.42, { tr: 'push', lift: 0, raise: 0, cam: [[58.42, 540, 960, 1.0], [59.6, 540, 950, 1.06]],
  draw() { setDark('#2a0a14', '#05020a'); for (let i = 0; i < 16; i++) { const R = RNG('fly', i), u = (TT - 58.42) * (0.8 + R.f() * 0.5); bill(540 + R.n(300) + u * R.n(600), 1100 - u * 900 - R.f() * 200, 170, u * 4 + R.f() * 3); } },
  ui() { fact('– 12.000 € 💸', 58.5, 540, 1300, { size: 84, bg: '#ff2e4d' }); },
  sfx: [[58.45, 'whoosh', 0.8], [58.5, 'descend']] });
// ---- 32 · "Und genau jetzt warnt sogar Epic Games:" — breaking news on the TV
S(59.6, { tr: 'flash', lift: 0, raise: 30, cam: [[59.6, 540, 960, 1.0], [61.98, 540, 950, 1.08]],
  draw() { jRoom({ blur: 10 }); newsTV(540, 960, 1.05, 'EPIC GAMES WARNT VOR TOKEN-ACCOUNTS', () => { pirateToken(0, -60, 120, { glow: 0.4 }); }); },
  sfx: [[59.65, 'siren'], [60.0, 'sting']] });
// ---- 33 · "Solche Accounts sind Betrug!" — the listing gets a red BETRUG stamp
S(61.98, { tr: 'cut', lift: 0, raise: 30, cam: [[61.98, 540, 960, 1.0], [64.11, 540, 950, 1.06]], punch: [[62.9, 0.07]],
  draw() { setDark('#3a0a12', '#05020a'); phoneShot(() => listingScreen('10.000 €', 1, clamp((TT - 62.9) / 0.15))); },
  ui() { stampMark('BETRUG!', 62.9, 540, 300, '#ff2e4d', 110); },
  sfx: [[62.9, 'stamp', 1.2], [62.95, 'shockHit']] });
// ---- 34 · "Jonas sitzt vor seinem Bildschirm und kann es nicht fassen." — dark room, a tear
S(64.11, { tr: 'iris', tense: 1, cam: CLOSE(64.11, 66.71),
  draw() { jRoom({ blur: 10 }); ctx.fillStyle = 'rgba(5,5,20,0.45)'; ctx.fillRect(-600, -400, 2300, 2800); glow(540, 950, 400, '#52b8ff', 0.2); jn(540, FLOOR + 170, 1.05, { pose: [[0, 'sad']], emo: [[0, 'sad']], extras: { tear: 1 } }); },
  sfx: [[64.2, 'sadTrombone', 0.7]] });

// =====================================================================  30 DAYS, THE LAST CHEST
// ---- 35 · "Kevin hat inzwischen 30 Tage lang…" — calendar days flip 10 → 30
S(66.71, { tr: 'whipL', lift: 0, raise: 0, cam: [[66.71, 540, 960, 1.0], [69.08, 540, 950, 1.08]], hud: kHud(() => lerp(10000, 30000, clamp((TT - 66.8) / 2.1))),
  draw() { rays('#2a2060', '#3a2a8a', { cy: 960, spin: 0.2 }); const d = Math.round(lerp(10, 30, clamp((TT - 66.8) / 2.0))); ctx.save(); ctx.translate(540, 1020); calendarPage(0, 0, 1.3, 'TAG', d); ctx.restore(); },
  sfx: [[66.8, 'flip'], [67.2, 'flip', 1.1], [67.6, 'flip', 1.2], [68.0, 'flip', 1.3], [68.4, 'flip', 1.4], [68.8, 'ding']] });
// ---- 36 · "…jeden Tag 1.000 Truhen geöffnet." — a mountain of opened chests behind tired Kevin, 30.000
S(69.08, { tr: 'slash', lift: 0, cam: WD(69.08, 71.16, 1080, 1.0, 1.1), hud: kHud(30000),
  draw() { pirateCove({ blur: 2 }); for (let i = 0; i < 40; i++) { const R = RNG('pile', i); lootChest(540 + R.n(460), 1100 + R.f() * 260 - (i % 5) * 40, 0.22 + R.f() * 0.1, { open: 1 }); } kv(540, FLOOR + 60, 0.9, { pose: [[0, 'hips']], emo: [[0, 'sleepy']], extras: { sweat: 1 } }); },
  ui() { fact('30.000 TRUHEN 📦', 69.3, 540, 450, { size: 62, bg: '#1d3fb0' }); },
  sfx: [[69.3, 'pop', 1], [69.6, 'coinPour'], [70.4, 'breath']] });
// ---- 37 · "Morgen endet das Event." — the red event timer
S(71.16, { tr: 'glitch', tense: 1, lift: 0, raise: 0, cam: [[71.16, 540, 960, 1.0], [72.55, 540, 950, 1.1]],
  draw() { setDark('#3a0a12', '#05020a'); pirateToken(540, 640, 170, { sx: Math.cos(TT * 3), glow: 0.6 }); eventTimer(540, 1060, 1.1, 'EVENT ENDET IN ' + fmtClock(86399 - (TT - 71.16) * 1200)); },
  sfx: [[71.2, 'alarmRing', 0.5], [71.6, 'tick'], [72.0, 'tick']] });
// ---- 38 · "Er öffnet die allerletzte Truhe," — Kevin's hand on the mouse, one chest on the screen
S(72.55, { tr: 'zoomIn', tense: 1, lift: 0, raise: 0, cam: [[72.55, 540, 960, 1.0], [74.61, 540, 940, 1.15]], hud: kHud(29999),
  draw() { kRoom({ dark: 1, blur: 10 }); fillRR(90, 600, 900, 640, 24, '#15131f'); fillRR(110, 620, 860, 600, 14, '#0b1a33'); glow(540, 920, 420, '#52b8ff', 0.3); lootChest(540, 1080, 0.9, { open: clamp((TT - 74.1) / 0.5) * 0.3 });
    const u = EZ.io(clamp((TT - 72.7) / 1.2)); ctx.save(); ctx.translate(lerp(900, 560, u), lerp(1180, 930, u)); poly([[0, 0], [0, 70], [18, 54], [32, 84], [44, 78], [30, 50], [54, 50]], '#ffffff'); ctx.restore(); },
  ui() { info('DIE ALLERLETZTE TRUHE…', 72.7, { size: 48 }); },
  sfx: [[72.7, 'pop', 0.8], [73.0, 'heartbeat', 1.6], [74.1, 'creak', 1.3]] });
// ---- 39 · "…und sie leuchtet golden." — the chest bursts into gold light
S(74.61, { tr: 'flash', lift: 0, raise: 0, cam: [[74.61, 540, 960, 1.0], [75.89, 540, 950, 1.1]], shake: [[74.65, 14, 0.5]], hud: kHud(30000),
  draw() { setDark('#3a2a00', '#0a0600'); lootChest(540, 1250, 1.4, { gold: 1, open: 0.15 + 0.05 * Math.sin(TT * 10) }); twinkles('t39', 200, 500, 680, 700, 14, { s: 30 }); },
  ui() { popText('GOLDEN?! ✨', 540, 430, 74.7, 100, '#ffe14d', -0.05, 0); },
  sfx: [[74.65, 'choir'], [74.7, 'bling'], [74.9, 'sparkle']] });
// ---- 40 · "Aber wie viele Truhen fehlen Kevin eigentlich noch…" — both stare at the golden glow; the sum with ???
S(75.89, { tr: 'push', tense: 1, lift: 0, cam: [[75.89, 540, 1040, 1.05], [78.55, 540, 1020, 1.15]], hud: kHud(30000),
  draw() { setDark('#3a2a00', '#0a0600'); glow(540, 900, 600, '#ffd23f', 0.35); kv(330, FLOOR + 80, 0.9, { emo: [[0, 'shock']], look: [0.4, -0.3] }); jn(770, FLOOR + 80, 0.9, { emo: [[0, 'shock']], look: [-0.4, -0.3] }); },
  ui() { fact('137.500 – 30.000 = ???', 76.3, 540, 520, { size: 64, bg: '#ffe14d', fg: '#1b1530' }); },
  sfx: [[76.3, 'stamp'], [76.6, 'coinTicks', 0.8, 5], [77.6, 'heartbeat', 1.0]] });
// ---- 41 · "…bis er den Token statistisch bekommt?" — the chest, closed, pulsing; the question
S(78.55, { tr: 'rgb', tense: 1, lift: 0, raise: 0, cam: [[78.55, 540, 960, 1.05], [81.0, 540, 940, 1.2]], punch: [[79.2, 0.05]],
  draw() { setDark('#3a2a00', '#0a0600'); lootChest(540, 1200, 1.3, { gold: 0.7 + 0.3 * Math.sin(TT * 5) }); },
  ui() { fact('WIE VIELE TRUHEN FEHLEN? 🤔', 78.7, 540, 420, { size: 52, bg: '#141026' }); },
  sfx: [[78.7, 'pop', 1], [79.2, 'whoosh', 1.1], [80.2, 'heartbeat', 0.8]] });
