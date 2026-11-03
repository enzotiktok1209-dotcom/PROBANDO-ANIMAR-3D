// =====================================================================
//  shots.js — the 31 shots, each cut on a spoken word (WT(word, n) = when the n-th such word starts).
//  World: the car's front wheel centre at (0,0), ground at y = WR. A shot's cam puts a world point at (540, FOCUS_Y).
// =====================================================================
const T = {
  fill: WT('fill'), at: WT('at'), station: WT('station'), next: WT('next'), lower: WT('lower'),
  leaking: WT('leaking'), not2: WT('not', 2), bubble: WT('bubble'), every: WT('every'), inside: WT('inside'),
  heres: WT("here's"), every2: WT('every', 2), rubber: WT('rubber') - 0.2, squashed: WT('squashed'), springs: WT('springs'),
  about: WT('about'), n800: WT('800'), mile: WT('mile'), and3: WT('because') - 0.16, heats: WT('heats'), its: WT("it's"),
  paper: WT('paper'), bend: WT('bend'), forth: WT('forth'), warm: WT('warm'), heat: WT('heat') - 0.24, so: WT('so'),
  pushes: WT('pushes'), thats: WT("that's"), pump: WT('pump'), gauge: WT('gauge') - 0.16, four1: WT('4'), high: WT('high'),
  so2: WT('so', 2), stop: WT('stop'), early: WT('early'), then: WT('then'), cools: WT('cools'), air5: WT('shrinks') - 0.44,
  shrinks: WT('shrinks'), drops: WT('drops'), four2: WT('4', 2), inch2: WT('inch', 2), its2: WT("it's", 3),
  balloon: WT('balloon'), car: WT('car'), freezing: WT('freezing'), by2: WT('by', 2), wrinkled: WT('wrinkled'),
  even: WT('even'), hasnt: WT("hasn't"), air9: WT('air', 5), so3: WT('so', 3), full: WT('full'),
  thats3: WT("that's", 2), cold: WT('cold'), or: WT('or'), driving: WT('driving'), add: WT('add'), psi: WT('psi'),
  top: WT('top'), and9: WT('want') - 0.36, follow: WT('follow'), account: WT('account'),
};
const rotOf = (t0, speed) => -(TT - t0) * speed / WR;          // a car driving left at `speed` px/s turns its wheels this way
const HOT_ENV = { rim: '#ffb070', hi: '#ffd2b0', top: '#ff8a70', glassTop: '#6a4a6a' };
const NIGHT_ENV = { rim: '#9fc0ff', hi: '#cfe0ff', glassTop: '#2a3a5a' };
const DAY_ENV = { hi: '#ffffff', top: '#ff7070', glassTop: '#8aa6c8' };

// ---------- 1. HOOK — filling up at the pump (fast push-in on the wheel)
S(0, { title: 'filling at the pump', tr: 'cut',
  cam: [[0, -10, -10, 3.6], [0.42, -10, -10, 2.25, 'o3'], [T.at, -30, -10, 2.05]], shake: [[0.0, 10, 0.35]],
  draw() {
    const fillK = EZ.io(seg(TT, 0.2, 1.6)), vp = valvePt(WR, 0, -2.2, 0, 0, 0.45 * (1 - fillK));
    setGasNight({ psi: lerp(26, 32, fillK), flow: 1, hoseTo: [vp[0] - 8, vp[1] - 10], chuckA: -0.6 });
    drawCar(0, 0, { lights: 1, env: NIGHT_ENV, wheel: { sag: 0.45 * (1 - fillK), heat: 0.4 } });
    airMachine(-560, GY - 40, { psi: lerp(26, 32, fillK), flow: 1, hoseTo: [vp[0] - 8, vp[1] - 10], hose: true });
  },
  sfx: [[0, 'riser', 4.1], [0, 'hitStart'], [0.05, 'nightAmb', 1.7], [0.12, 'airHiss', 1.5], [0.12, 'compressor', 1.6]],
});
// ---------- 2. "at the gas station" — the wide establishing shot, display at 32 green
S(T.at, { title: 'the gas station', tr: 'zoomOut',
  cam: [[T.at, -260, -430, 0.56], [T.next, -240, -420, 0.62]],
  draw() {
    const vp = valvePt();
    setGasNight({ psi: 32, flow: 0.6, hoseTo: [vp[0] - 8, vp[1] - 10] });
    drawCar(0, 0, { lights: 1, env: NIGHT_ENV, wheel: { heat: 0.4 } });
    airMachine(-560, GY - 40, { psi: 32, flow: 0.6, hoseTo: [vp[0] - 8, vp[1] - 10] });
  },
  ui() { const [x, y] = ws(-560, -610); tag('32 PSI', x, y - 70, T.station, { icon: (ix, iy, r) => checkIcon(ix, iy, r), fg: '#bfffd6', size: 46 }); },
  sfx: [[T.at, 'nightAmb', 1.9], [T.at + 0.05, 'airHiss', 0.9], [T.station + 0.05, 'beep2'], [T.station + 0.3, 'chuckOff']],
});
// ---------- 3. "the very next morning they're lower?" — time cut, frost, the gauge reads 28 in red (tension)
S(T.next, { title: 'next morning: lower', tr: 'flash', tense: [T.next + 0.1, T.leaking],
  cam: [[T.next, -40, -40, 1.75], [T.leaking, -20, -10, 2.2, 'i2']], punch: [[T.lower, 0.07]], shake: [[T.lower, 8, 0.4]],
  draw() {
    setHome({ night: 0, frost: 0.8 });
    drawCar(0, 0, { env: DAY_ENV, wheel: { sag: 0.6 }, frost: 0.5 });
    const vp = valvePt(WR, 0, -2.2, 0, 0, 0.6); handGauge(vp[0], vp[1] - 4, 0.55, 28, '#ff3b3b', { s: 0.9 });
  },
  ui() { const [x, y] = ws(-30, -250); tag('28 PSI', x - 60, y - 40, T.lower, { bg: 'rgba(120,10,14,0.9)', edge: 'rgba(255,120,120,0.6)', icon: (ix, iy, r) => warnIcon(ix, iy, r), size: 50 }); },
  sfx: [[T.next, 'timeCut'], [T.next + 0.1, 'morningAmb', 1.4], [T.next + 0.3, 'gaugePress'], [T.lower, 'braam'], [T.lower + 0.05, 'beepBad']],
});
// ---------- 4. "They're not leaking." — the wheel goes into the water tub
S(T.leaking - 0.44, { title: 'the water test', tr: 'whipL',
  cam: [[T.leaking - 0.44, 0, -40, 0.95], [T.not2, 0, 40, 1.08]],
  draw() {
    setWorkshop();
    const R = 250, d = EZ.i2(seg(TT, T.leaking - 0.3, T.leaking + 0.12)), y = lerp(-560, 120, d);
    tubBack(0, -60, 760, 520);
    drawWheel(0, y, R, { rot: 0.2 + (1 - d) * 0.3, wet: d });
    tubFront(0, -60, 760, 520, 20, { slosh: clamp(1 - (TT - T.leaking - 0.12) / 0.8) * (TT > T.leaking + 0.12 ? 1 : 0) });
    splash(0, 20, T.leaking + 0.12, 40, 1);
  },
  sfx: [[T.leaking - 0.44, 'garageAmb', 1.4], [T.leaking + 0.1, 'splash'], [T.leaking + 0.4, 'waterSettle', 0.6]],
});
// ---------- 5. "Not a single bubble." — close, underwater, the counter stays at 0
S(T.not2, { title: 'zero bubbles', tr: 'cut',
  cam: [[T.not2, 0, 80, 1.9], [T.every, 0, 70, 2.1]],
  draw() {
    setWorkshop();
    tubBack(0, -60, 760, 520);
    drawWheel(0, 120, 250, { rot: 0.5, wet: 1 });
    tubFront(0, -60, 760, 520, 20);
    dust(30, 'uw', -380, 380, 40, 440, '#cfeaff', 0.35, 4, -6);
  },
  ui() { const [x, y] = ws(0, -180); tag('0 bubbles', x, y - 30, T.bubble - 0.15, { size: 54, icon: (ix, iy, r) => { ctx.strokeStyle = '#9fd8ff'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(ix, iy, r * 0.75, 0, TAU); ctx.stroke(); }, fg: '#dff3ff' }); },
  sfx: [[T.not2, 'underwater', 1.25], [T.bubble - 0.15, 'tick']],
});
// ---------- 6. "Every bit of that air is still inside." — the x-ray scan
S(T.every, { title: 'x-ray: the air is inside', tr: 'zoomIn',
  cam: [[T.every, 0, 0, 0.82], [T.heres, 0, 0, 0.95]],
  draw() {
    setXray({ R: 250 });
    const u = seg(TT, T.every + 0.05, T.every + 0.95);
    drawWheel(0, 0, 250, { rot: 0.3, xray: EZ.o2(u), temp: -0.15, energy: 0.7 });
    scanBeam(250, u);
    shockRing(0, 0, T.inside, 200, 520, '#7fd0ff', 0.7, 10);
  },
  ui() { hudFrame('SCAN 01 · AIR VOLUME', T.every + 0.1); const [x, y] = ws(0, -400); tag('100% of the air', x, y, T.inside, { fg: '#bfe6ff', size: 46, icon: (ix, iy, r) => checkIcon(ix, iy, r, '#7fd0ff') }); },
  sfx: [[T.every, 'labHum', 2.0], [T.every + 0.05, 'scan', 0.9], [T.inside, 'confirm']],
});
// ---------- 7. "Here's why:" — dark stage, rim-lit wheel, slow push (tension)
S(T.heres, { title: "here's why", tr: 'cut', tense: [T.heres, T.every2],
  cam: [[T.heres, 0, 0, 0.88], [T.every2, 0, 0, 1.0, 'i2']],
  draw() {
    setVoid();
    drawWheel(0, 0, 250, { rot: 0.1 });
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = 'rgba(170,200,255,0.5)'; ctx.lineWidth = 6; ctx.shadowColor = '#9fc0ff'; ctx.shadowBlur = 40; ctx.beginPath(); ctx.arc(0, 0, 252, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); ctx.restore();
  },
  sfx: [[T.heres, 'lowHit'], [T.heres, 'drone', 0.7, 55]],
});
// ---------- 8. "every time the wheel turns," — driving at sunset, the yellow mark shows the turning
S(T.every2, { title: 'driving: the wheel turns', tr: 'whipR',
  cam: [[T.every2, 260, -140, 0.6], [T.rubber, 160, -90, 0.74]],
  draw() { const tr = (TT - T.every2) * 900; setRoad({ travel: tr + 2000, speed: 0.6 }); drawCar(0, 0, { lights: 1, env: HOT_ENV, wheel: { rot: rotOf(T.every2, 900), marker: 1 } }); },
  sfx: [[T.every2, 'engine', T.rubber - T.every2 + 0.1], [T.every2, 'roadRoar', T.rubber - T.every2 + 0.1], [T.every2, 'wind', 1.4]],
});
// ---------- 9. "the rubber gets squashed against the road and springs back," — macro on the contact patch (slow motion)
S(T.rubber, { title: 'macro: squashed', tr: 'zoomIn',
  cam: [[T.rubber, 0, -40, 1.05], [T.about, 0, 0, 1.25]], punch: [[T.squashed, 0.08], [T.springs, -0.04]],
  draw() {
    setMacro({ travel: (TT - T.rubber) * 160 });
    const sq = TT < T.squashed ? 0.2 : TT < T.springs ? 0.2 + 0.65 * springEase(TT - T.squashed, 260, 18) : 0.85 - 0.75 * springEase(TT - T.springs, 300, 9);
    drawWheel(0, GY - 420, 420, { rot: rotOf(T.rubber, 120) * (WR / 420), sag: clamp(sq), marker: 1 });
    // compression lines at the contact patch
    withAlpha(clamp(sq - 0.3) * 1.5, () => { ctx.strokeStyle = 'rgba(255,220,180,0.8)'; ctx.lineWidth = 6; for (const s of [-1, 1]) for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(s * (330 + i * 40), GY - 30 - i * 26); ctx.lineTo(s * (390 + i * 40), GY - 30 - i * 26); ctx.stroke(); } });
  },
  ui() { const [x, y] = ws(0, -520); tag('squash', x - 170, y, T.squashed, { size: 42, out: T.springs, fg: '#ffd9b0' }); tag('spring back', x + 150, y, T.springs, { size: 42, fg: '#ffd9b0' }); },
  sfx: [[T.rubber, 'roadRoarSlow', T.about - T.rubber], [T.squashed, 'squish'], [T.springs + 0.05, 'rubberBounce']],
});
// ---------- 10. "about 800 times every mile." — the car passes a mile marker, the counter runs
S(T.about, { title: '800 turns a mile', tr: 'zoomOut',
  cam: [[T.about, 320, -230, 0.5], [T.and3, 280, -220, 0.56]],
  draw() {
    const tr = (TT - T.about) * 1400; setRoad({ travel: tr + 5000, speed: 1 });
    mileMarker(-1900 + (TT - T.about) * 1400, -60);
    drawCar(0, 0, { lights: 1, env: HOT_ENV, wheel: { rot: rotOf(T.about, 1400), marker: 1, spin: 0.3 } });
  },
  ui() { counter(W / 2, 470, T.n800 - 0.05, T.mile + 0.1, 0, 800, 'turns'); tag('in 1 mile', W / 2, 640, T.mile, { size: 44, bg: '#1f7a3e', edge: 'rgba(255,255,255,0.5)' }); },
  sfx: [[T.about, 'engine', 1.9], [T.about, 'roadRoar', 1.9], [T.n800 - 0.05, 'tickRun', T.mile - T.n800 + 0.1], [T.mile, 'ding'], [T.about + 0.5, 'passBy']],
});
// ---------- 11. "And because rubber that bends that much heats up," — the tyre heats while driving
S(T.and3, { title: 'the rubber heats up', tr: 'cut',
  cam: [[T.and3, 20, -30, 1.85], [T.its, 10, -20, 2.25, 'i2']], punch: [[T.heats, 0.06]],
  draw() {
    const tr = (TT - T.and3) * 900; setRoad({ travel: tr + 9000, speed: 0.5 });
    const h = EZ.io(seg(TT, T.and3 + 0.2, T.heats + 0.25));
    drawCar(0, 0, { lights: 1, env: HOT_ENV, wheel: { rot: rotOf(T.and3, 900), heat: h, marker: 1 } });
    heatWaves(0, -60, 260, 360, h, 'tyre');
  },
  ui() { const [x, y] = ws(0, -230); tag('hot', x, y - 40, T.heats, { size: 48, bg: 'rgba(150,50,10,0.92)', icon: (ix, iy, r) => flameIcon(ix, iy, r), fg: '#ffe0c0' }); },
  sfx: [[T.and3, 'engine', T.its - T.and3], [T.and3, 'roadRoar', T.its - T.and3], [T.and3 + 0.3, 'sizzle', T.its - T.and3]],
});
// ---------- 12. "it's just like a paper clip" — the desk, the clip drops in
S(T.its, { title: 'a paper clip', tr: 'whipL',
  cam: [[T.its, 0, 0, 1.0], [T.bend, 30, -20, 1.12]],
  draw() { setDesk(); const d = springEase(TT - (T.paper - 0.12), 260, 14); paperclip(lerp(-600, 0, d), lerp(-700, 0, d), 1.8, 0, 0); },
  sfx: [[T.its, 'roomTone', T.bend - T.its + 0.2], [T.paper + 0.05, 'clink']],
});
// ---------- 13. "you bend back and forth until it's warm." — bending, the hinge glows, a wisp of smoke
S(T.bend, { title: 'bend it back and forth', tr: 'cut',
  cam: [[T.bend, 170, -60, 1.75], [T.heat, 190, -80, 2.0]],
  draw() {
    setDesk();
    const ph = (TT - T.bend) * 2.0 * Math.PI * 1.1, active = TT < T.warm + 0.1 ? 1 : 0.2;
    const bend = (0.55 + 0.5 * Math.sin(ph)) * active, hot = EZ.io(seg(TT, T.bend + 0.2, T.warm + 0.1));
    paperclip(0, 0, 1.8, bend, hot);
    heatWaves(216, -110, 120, 300, hot, 'clip');
  },
  sfx: [[T.bend, 'roomTone', T.heat - T.bend], ...[0, 1, 2, 3].map((i) => [T.bend + 0.12 + i * 0.45, 'creak']), [T.warm, 'sizzleShort']],
});
// ---------- 14. "That heat soaks into the air inside," — x-ray: the air warms from blue to orange
S(T.heat, { title: 'the heat goes into the air', tr: 'zoomIn',
  cam: [[T.heat, 0, 0, 0.84], [T.so, 0, 0, 0.94]],
  draw() {
    setXray({ R: 250 });
    const k = EZ.io(seg(TT, T.heat + 0.15, T.so - 0.1));
    drawWheel(0, 0, 250, { rot: (TT - T.heat) * -0.6, xray: 1, temp: lerp(-0.15, 1, k), energy: lerp(0.7, 1.6, k), heat: 0.6 });
    for (let i = 0; i < 3; i++) shockRing(0, 0, T.heat + 0.3 + i * 0.55, 330, 220, '#ff8a2a', 0.55, 8);   // heat flowing inward
  },
  ui() { hudFrame('SCAN 02 · AIR TEMPERATURE', T.heat); },
  sfx: [[T.heat, 'labHum', 2.1], [T.heat + 0.2, 'warmSwell', 1.8]],
});
// ---------- 15. "so the hot air pushes harder." — close on the air, it pushes the tyre out (tension)
S(T.so, { title: 'hot air pushes harder', tr: 'cut', tense: [T.so, T.thats],
  cam: [[T.so, 0, -120, 1.45], [T.thats, 0, -130, 1.78, 'i2']], punch: [[T.pushes, 0.1]], shake: [[T.pushes, 12, 0.45]],
  draw() {
    setXray({ R: 250 });
    const p = springEase(TT - T.pushes, 200, 10);
    drawWheel(0, 0, 250, { rot: (TT - T.so) * -0.6, xray: 1, temp: 1, energy: 2.3, cavity: 1 + 0.08 * p, heat: 0.7 });
    shockRing(0, 0, T.pushes, 230, 520, '#ff9a3a', 0.6, 16);
  },
  ui() { const [x, y] = ws(0, -420); tag('pressure ↑', x, y, T.pushes, { size: 50, bg: 'rgba(150,50,10,0.92)', fg: '#ffe0c0' }); },
  sfx: [[T.so, 'drone', T.thats - T.so, 49], [T.so, 'particles', T.thats - T.so], [T.pushes, 'impact']],
});
// ---------- 16. "That's why, at the pump, the gauge" — back at the station with a hot tyre
S(T.thats, { title: 'hot tyre at the pump', tr: 'whipR',
  cam: [[T.thats, -200, -160, 0.78], [T.gauge, -260, -190, 0.86]],
  draw() {
    const vp = valvePt();
    setGasNight({ psi: 32, flow: 1, hoseTo: [vp[0] - 8, vp[1] - 10] });
    drawCar(0, 0, { lights: 1, env: NIGHT_ENV, wheel: { heat: 0.9 } });
    heatWaves(0, -60, 260, 320, 0.8, 'tyre2');
    airMachine(-560, GY - 40, { psi: lerp(29, 32, EZ.o2(seg(TT, T.thats, T.gauge))), flow: 1, hoseTo: [vp[0] - 8, vp[1] - 10] });
  },
  sfx: [[T.thats, 'nightAmb', 1.2], [T.thats + 0.1, 'airHiss', 1.0], [T.thats + 0.1, 'compressor', 1.0]],
});
// ---------- 17. "reads about 4 psi too high," — the display, +4 from heat
S(T.gauge, { title: 'the display reads high', tr: 'zoomIn',
  cam: [[T.gauge, -560, -410, 2.3], [T.so2, -560, -420, 2.6]], punch: [[T.high, 0.07]],
  draw() {
    const vp = valvePt(); setGasNight({ psi: 32, flow: 1, hoseTo: [vp[0] - 8, vp[1] - 10] });
    drawCar(0, 0, { lights: 1, env: NIGHT_ENV, wheel: { heat: 0.9 } });
    airMachine(-560, GY - 40, { psi: 32, psiC: TT > T.high ? '#ffb03a' : '#46ff8a', flow: 1, hoseTo: [vp[0] - 8, vp[1] - 10] });
  },
  ui() { tag('+4 PSI from heat', W / 2, 300, T.four1, { size: 50, bg: 'rgba(160,40,20,0.94)', edge: 'rgba(255,170,120,0.6)', icon: (ix, iy, r) => flameIcon(ix, iy, r) }); tag('too high', W / 2, 1180, T.high, { size: 50, bg: 'rgba(120,10,14,0.92)', icon: (ix, iy, r) => warnIcon(ix, iy, r) }); },
  sfx: [[T.gauge, 'nightAmb', 3.1], [T.gauge, 'compressor', 0.9], [T.four1, 'tagPop'], [T.high, 'beepBad']],
});
// ---------- 18. "so you stop filling too early." — the chuck comes off; the real (cold) value is 28
S(T.so2, { title: 'you stop too early', tr: 'cut',
  cam: [[T.so2, -260, -180, 0.95], [T.then, -270, -180, 1.02]],
  draw() {
    const off = EZ.io(seg(TT, T.stop + 0.05, T.stop + 0.35)), vp = valvePt();
    setGasNight({ psi: 32 });
    drawCar(0, 0, { lights: 1, env: NIGHT_ENV, wheel: { heat: 0.85 } });
    airMachine(-560, GY - 40, { psi: 32, hoseTo: [lerp(vp[0] - 8, -330, off), lerp(vp[1] - 10, 40, off)], chuckA: lerp(-0.6, 0.3, off) });
  },
  ui() { const [x, y] = ws(0, -260); tag('real: 28 PSI', x, y - 30, T.early, { size: 52, bg: 'rgba(120,10,14,0.92)', edge: 'rgba(255,120,120,0.6)', icon: (ix, iy, r) => flakeIcon(ix, iy, r) }); },
  sfx: [[T.so2, 'nightAmb', 1.7], [T.stop + 0.05, 'chuckOff'], [T.early, 'stamp']],
});
// ---------- 19. "Then overnight, the tire cools down," — time-lapse night at home: moon, lights off, frost
S(T.then, { title: 'overnight it cools', tr: 'dissolve',
  cam: [[T.then, 260, -470, 0.54], [T.air5, 240, -430, 0.6]],
  draw() {
    const u = seg(TT, T.then, T.air5);
    setHome({ night: 1, moonA: lerp(0.15, 0.75, u), starRot: u * 0.25, winOn: 1 - u * 1.2, frost: u * 0.7 });
    drawCar(0, 0, { env: NIGHT_ENV, wheel: { heat: 0.75 * (1 - EZ.io(seg(TT, T.then + 0.3, T.cools + 0.35))) }, frost: u * 0.6 });
  },
  ui() { thermometer(930, 520, lerp(70, 34, EZ.io(seg(TT, T.then + 0.2, T.air5))), { s: 0.8 }); },
  sfx: [[T.then, 'timelapse', T.air5 - T.then], [T.then, 'crickets', T.air5 - T.then + 0.2]],
});
// ---------- 20. "the air shrinks, and the pressure" — x-ray: the air cools, slows, shrinks; the tyre sags (tension)
S(T.air5, { title: 'the air shrinks', tr: 'cut', tense: [T.air5, T.drops + 0.6],
  cam: [[T.air5, 0, 0, 0.9], [T.drops, 0, 30, 1.12, 'i2']], punch: [[T.shrinks, -0.05]],
  draw() {
    setXray({ R: 250 });
    const k = EZ.io(seg(TT, T.air5, T.shrinks + 0.4));
    drawWheel(0, 0, 250, { xray: 1, temp: lerp(0.5, -0.9, k), energy: lerp(1.2, 0.35, k), cavity: lerp(1, 0.9, k), sag: 0.55 * k });
  },
  ui() { hudFrame('SCAN 03 · 4:00 AM', T.air5); },
  sfx: [[T.air5, 'labHum', T.drops - T.air5], [T.air5, 'coldSwell', 1.4], [T.shrinks, 'shrinkDown'], [T.air5 + 0.2, 'heartbeat', T.drops - T.air5]],
});
// ---------- 21. "drops by exactly those 4 psi." — the handheld gauge counts down 32 → 28
S(T.drops, { title: 'down by 4 psi', tr: 'zoomIn', tense: [T.drops, T.its2],
  cam: [[T.drops, -30, -250, 1.9], [T.its2, -30, -260, 2.15, 'i2']], punch: [[T.four2, 0.06]],
  draw() {
    setHome({ night: 1, moonA: 0.8, frost: 0.8, winOn: 0 });
    drawCar(0, 0, { env: NIGHT_ENV, wheel: { sag: 0.6 }, frost: 0.7 });
    const v = Math.round(lerp(32, 28, EZ.io(seg(TT, T.drops + 0.15, T.four2 + 0.25)))), vp = valvePt(WR, 0, -2.2, 0, 0, 0.6);
    handGauge(vp[0], vp[1] - 4, 0.55, v, v <= 28 ? '#ff3b3b' : '#ffb03a', { s: 0.9 });
  },
  ui() { tag('−4 PSI', W / 2 + 230, 560, T.four2, { size: 56, bg: 'rgba(120,10,14,0.92)', edge: 'rgba(255,120,120,0.6)' }); },
  sfx: [[T.drops, 'nightAmb', T.its2 - T.drops], [T.drops + 0.15, 'countDown', 0.9], [T.four2, 'beepBad'], [T.inch2, 'lowHit']],
});
// ---------- 22. "It's the same thing that happens to a balloon left in your car" — a balloon on the seat at night
S(T.its2, { title: 'a balloon in the car', tr: 'whipL',
  cam: [[T.its2, -120, -640, 0.78], [T.freezing - 0.48, -140, -680, 0.88]],
  draw() { setInterior({ morning: 0, frost: 0.2, tempLabel: '34°F' }); balloon(-150, -720, 240, 0); },
  sfx: [[T.its2, 'carInterior', T.freezing - T.its2], [T.balloon, 'balloonRub']],
});
// ---------- 23. "on a freezing night:" — outside: snow, the sign reads 23 °F
S(T.freezing - 0.48, { title: 'a freezing night', tr: 'cut',
  cam: [[T.freezing - 0.48, 240, -320, 0.6], [T.by2, 230, -320, 0.68]], punch: [[T.freezing, 0.06]],
  draw() { setSnowLot({ temp: '23' }); drawCar(0, 0, { env: NIGHT_ENV, frost: 0.9, wheel: {} }); snowfall(160, 'snow', -1600, 2200, -2200, 1400, 1); },
  sfx: [[T.freezing - 0.48, 'windHowl', T.by2 - T.freezing + 0.6], [T.freezing, 'freezeHit']],
});
// ---------- 24. "by morning it's wrinkled," — the balloon shrinks and wrinkles, frost on the glass
S(T.by2, { title: 'wrinkled by morning', tr: 'flash',
  cam: [[T.by2, -140, -680, 0.92], [T.even, -150, -690, 1.02]], punch: [[T.wrinkled, 0.07]],
  draw() { setInterior({ morning: 1, frost: 1, tempLabel: '23°F' }); balloon(-150, -720, 240, EZ.io(seg(TT, T.by2 + 0.15, T.wrinkled + 0.3))); },
  sfx: [[T.by2, 'timeCut'], [T.by2 + 0.05, 'carInterior', T.even - T.by2], [T.by2 + 0.2, 'balloonShrink', 0.8]],
});
// ---------- 25. "even though it hasn't lost any air." — the knot, still tied
S(T.even, { title: 'the knot is still tied', tr: 'cut',
  cam: [[T.even, -150, -470, 2.0], [T.so3, -150, -480, 2.2]],
  draw() { setInterior({ morning: 1, frost: 1, tempLabel: '23°F' }); balloon(-150, -720, 240, 1, { bob: 0 }); },
  ui() { tag('knot still tied', W / 2, 1110, T.hasnt, { size: 46, icon: (ix, iy, r) => checkIcon(ix, iy, r) }); tag('0 air lost', W / 2, 1230, T.air9, { size: 46, bg: 'rgba(20,70,40,0.92)', fg: '#c9ffd9' }); },
  sfx: [[T.even, 'carInterior', T.so3 - T.even], [T.hasnt, 'tagPop'], [T.air9, 'tagPop']],
});
// ---------- 26. "So they didn't go down. They were never really full." — the low tyre, then the green outline (tension → hit)
S(T.so3, { title: 'never really full', tr: 'whipR', tense: [T.so3, T.full],
  cam: [[T.so3, -20, -20, 1.55], [T.full, 0, 0, 2.05, 'i2'], [T.thats3, 0, 0, 1.95, 'o3']], punch: [[T.full, 0.09]], shake: [[T.full, 14, 0.5]],
  draw() {
    setHome({ night: 0, frost: 0.6 });
    drawCar(0, 0, { env: DAY_ENV, wheel: { sag: 0.6, outline: EZ.o3(seg(TT, T.full, T.full + 0.4)) } });
  },
  ui() { const [x, y] = ws(0, -240); tag('never full', x, y - 40, T.full, { size: 54, bg: 'rgba(20,90,45,0.94)', edge: 'rgba(120,255,170,0.6)', fg: '#d7ffe4' }); },
  sfx: [[T.so3, 'morningAmb', T.thats3 - T.so3], [T.so3, 'riserShort', T.full - T.so3], [T.full, 'payoffHit']],
});
// ---------- 27. "That's why you should check them cold," — the gauge on the cold tyre: fill to 32, green
S(T.thats3, { title: 'check them cold', tr: 'zoomOut',
  cam: [[T.thats3, -40, -170, 1.45], [T.or, -40, -180, 1.62]], punch: [[T.cold, 0.06]],
  draw() {
    setHome({ night: 0, frost: 0.6 });
    const k = EZ.io(seg(TT, T.thats3 + 0.3, T.cold + 0.2)), v = Math.round(lerp(28, 32, k));
    drawCar(0, 0, { env: DAY_ENV, wheel: { sag: 0.6 * (1 - k) } });
    const vp = valvePt(WR, 0, -2.2, 0, 0, 0.6 * (1 - k)); handGauge(vp[0], vp[1] - 4, 0.55, v, v >= 32 ? '#46ff8a' : '#ffb03a', { s: 0.9 });
  },
  ui() { tag('cold: 32 PSI', W / 2, 470, T.cold, { size: 52, bg: 'rgba(16,60,110,0.94)', edge: 'rgba(150,210,255,0.6)', icon: (ix, iy, r) => flakeIcon(ix, iy, r), fg: '#dff1ff' }); },
  sfx: [[T.thats3, 'morningAmb', T.or - T.thats3], [T.thats3 + 0.3, 'airHiss', 0.9], [T.cold, 'ding']],
});
// ---------- 28. "or if you've just been driving," — on the road again, hot tyres
S(T.or, { title: 'just been driving', tr: 'whipL',
  cam: [[T.or, 280, -130, 0.62], [T.add, 200, -100, 0.74]],
  draw() { setRoad({ travel: (TT - T.or) * 1000 + 15000, speed: 0.7 }); drawCar(0, 0, { lights: 1, env: HOT_ENV, wheel: { rot: rotOf(T.or, 1000), heat: 0.85, marker: 1 } }); heatWaves(0, -60, 260, 320, 0.8, 'tyre3'); },
  sfx: [[T.or, 'engine', T.add - T.or], [T.or, 'roadRoar', T.add - T.or], [T.or, 'wind', 1.2]],
});
// ---------- 29. "add 4 PSI on top." — at the pump: 32 → 36 with the hot tyre
S(T.add, { title: 'add 4 when hot', tr: 'zoomIn',
  cam: [[T.add, -500, -330, 1.55], [T.and9, -500, -340, 1.75]], punch: [[T.top, 0.06]],
  draw() {
    const vp = valvePt(), v = lerp(32, 36, EZ.io(seg(TT, T.add + 0.2, T.top)));
    setGasNight({ psi: v, flow: 1, hoseTo: [vp[0] - 8, vp[1] - 10] });
    drawCar(0, 0, { lights: 1, env: NIGHT_ENV, wheel: { heat: 0.85 } });
    airMachine(-560, GY - 40, { psi: v, flow: 1, hoseTo: [vp[0] - 8, vp[1] - 10] });
  },
  ui() { tag('hot: +4 PSI', W / 2, 330, T.psi - 0.1, { size: 52, bg: 'rgba(160,40,20,0.94)', edge: 'rgba(255,170,120,0.6)', icon: (ix, iy, r) => flameIcon(ix, iy, r) }); tag('36 PSI', W / 2, 1200, T.top, { size: 50, icon: (ix, iy, r) => checkIcon(ix, iy, r), fg: '#bfffd6' }); },
  sfx: [[T.add, 'nightAmb', T.and9 - T.add], [T.add + 0.2, 'airHiss', 1.4], [T.add + 0.2, 'compressor', 1.4], [T.top, 'ding']],
});
// ---------- 30. "And if you want more tricks like this for your car," — the beauty shot at sunset
S(T.and9, { title: 'beauty shot', tr: 'whipR',
  cam: [[T.and9, 380, -170, 0.58], [T.follow, 300, -150, 0.7]],
  draw() { setRoad({ travel: (TT - T.and9) * 1600 + 30000, speed: 1 }); drawCar(0, 0, { lights: 1, env: HOT_ENV, wheel: { rot: rotOf(T.and9, 1600), spin: 0.8 } }); },
  sfx: [[T.and9, 'engineRev', T.follow - T.and9], [T.and9, 'roadRoar', T.follow - T.and9], [T.and9, 'wind', 2.0]],
});
// ---------- 31. "follow this account." — the follow card
S(T.follow, { title: 'follow', tr: 'cut',
  cam: [[T.follow, 300, -150, 0.7], [DURATION, 280, -150, 0.74]],
  draw() { setRoad({ travel: (TT - T.and9) * 1600 + 30000, speed: 1 }); drawCar(0, 0, { lights: 1, env: HOT_ENV, wheel: { rot: rotOf(T.and9, 1600), spin: 0.8 } }); ctx.fillStyle = 'rgba(5,6,12,0.55)'; ctx.fillRect(-4000, -4000, 8000, 8000); },
  ui() { followCard(T.follow, T.account + 0.05); },
  sfx: [[T.follow, 'engine', 1.0], [T.follow, 'tagPop'], [T.account + 0.05, 'tap'], [T.account + 0.1, 'notify'], [T.account + 0.4, 'endHit']],
});
