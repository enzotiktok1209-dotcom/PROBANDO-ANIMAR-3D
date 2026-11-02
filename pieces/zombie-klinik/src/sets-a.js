// =====================================================================
//  SETS A — the room: curtain, faces, monitors, the city window, the bed, the dog, hands and the IV.
//  Every scene: (args, era) -> draws in world coords; lt = time in the shot, d = shot length. Ends with endScene().
// =====================================================================
const SCENES = {};
const shotT = (i) => { const t0 = SHOT_LIST[i][0], d = ERA_LIST[i][1] - t0; return { lt: TT - t0, d, u: clamp((TT - t0) / d) }; };
const tAt = (s) => at(s);
// a pulsing alarm wash: red multiply + a rotating beacon glow
function alarmWash(k = 1) {
  const p = 0.5 + 0.5 * Math.sin(TT * TAU * 1.6);
  fcTint(mixHex('#ffffff', '#ff8f8f', k * (0.75 + 0.25 * p)).replace('rgb', 'rgb'), 1);
  fcTint('rgba(200,20,30,1)', k * (0.08 + 0.1 * p), 'source-over');
}
function darkWash(k) { fcTint(`rgba(4,6,12,${k})`, 1, 'source-over'); }
// ---- room background: wall, rail, headwall with outlets, a curtain edge; variant 'red' adds the alarm
function roomBg(o = {}) {
  fillAll(FC.wall);
  fcRect(-10, 1180, W + 20, 22, FC.wallL, { w: 2 });
  fcRect(-10, 1202, W + 20, 800, FC.wallD, { line: false });
  if (o.headwall !== false) {
    fcRect(30, 380, 600, 200, '#5c6e8e', { r: 10 });
    [[90, 430], [170, 430]].forEach(([x, y]) => { fcRect(x, y, 56, 70, '#e8ebf0', { r: 6, w: 2.5 }); fcRect(x + 14, y + 18, 8, 14, '#333', { line: false }); fcRect(x + 34, y + 18, 8, 14, '#333', { line: false }); });
    [[300, 430], [380, 430]].forEach(([x, y]) => { fcRect(x, y, 50, 66, '#c43c35', { r: 6, w: 2.5 }); fcCirc(x + 25, y + 33, 12, '#7a1f1b', { w: 2 }); });
    fcRect(470, 430, 120, 70, '#2b3346', { r: 6, w: 2.5 });
    fcCirc(530, 465, 8, (F % 40) < 20 ? '#4be08f' : '#1d5a3b', { line: false });
  }
  if (o.curtain !== false) {   // the green curtain's edge on the right
    for (let k = 0; k < 4; k++) fcRect(900 + k * 50, 160, 52, 1100, k % 2 ? '#5f8a62' : '#6f9b70', { w: 2 });
    fcLine([[880, 150], [1100, 150]], '#9aa6bb', 10);
  }
}
// ---- 1. the curtain: lit green from behind, a shadow on it. state: lying | rise | arm | sit | stand
SCENES.curtain = (a, i) => {
  const { lt, u } = shotT(i);
  fillAll('#26303f');
  fcRect(-10, 1300, W + 20, 700, '#1f2633', { line: false });
  fcLine([[60, 190], [1080, 190]], '#8a96aa', 12);
  // the curtain: folds, lit from behind (a warm-green glow where the light is)
  const cx0 = 90, cy0 = 200, cw = 990, ch = 1120, folds = 11;
  const build = (g) => { g.moveTo(cx0, cy0); for (let k = 0; k <= folds; k++) g.lineTo(cx0 + k * cw / folds + (k % 2 ? 8 : -8), cy0 + (k % 2 ? 6 : 0)); g.lineTo(cx0 + cw, cy0 + ch); for (let k = folds; k >= 0; k--) g.lineTo(cx0 + k * cw / folds + Math.sin(k * 1.7 + TT * 0.8) * 10, cy0 + ch + (k % 2 ? 18 : 0)); g.closePath(); };
  fcPath(build, a.calm ? '#7ea167' : '#8db46f');
  fcClip(build, () => {
    fcGlow(640, 720, 620, 'rgba(235,255,190,1)', a.calm ? 0.45 : 0.6);
    for (let k = 0; k < folds; k++) { ctx.fillStyle = k % 2 ? 'rgba(20,40,10,0.16)' : 'rgba(255,255,220,0.06)'; ctx.fillRect(cx0 + k * cw / folds, cy0, cw / folds, ch + 30); }
    // the bed's shadow
    ctx.fillStyle = 'rgba(18,32,12,0.82)'; ctx.fillRect(250, 960, 760, 40); ctx.fillRect(280, 1000, 30, 250); ctx.fillRect(950, 1000, 30, 250);
    ctx.fillRect(240, 880, 24, 120); ctx.fillRect(990, 900, 24, 100);
    const sh = { fill: 'rgba(18,32,12,0.9)', rim: 'rgba(18,32,12,0.9)', noEyes: true };
    if (a.state === 'lying') { fcPath((g) => { g.ellipse(360, 930, 66, 56, 0, 0, TAU); g.ellipse(640, 945, 260, 44, 0, 0, TAU); }, 'rgba(18,32,12,0.88)', { line: false }); }
    else if (a.state === 'rise') {
      const k = EZ.io(clamp(lt / 1.0)), ang = lerp(-1.45, -0.15, k);
      ctx.save(); ctx.translate(640, 960); ctx.rotate(ang); fcZombie(0, 0, 0.75, { ...sh, arms: 0.4, lean: 0, seed: 2 }); ctx.restore();
      fcPath((g) => g.ellipse(820, 948, 200, 40, 0, 0, TAU), 'rgba(18,32,12,0.88)', { line: false });
    } else if (a.state === 'arm') {
      const k = EZ.o3(clamp(lt / 0.8));
      fcZombie(560, 1380, 1.5, { ...sh, armUp: k, arms: 0.3, lean: -0.1, seed: 4 });
    } else if (a.state === 'sit') fcZombie(600, 1000, 0.85, { ...sh, arms: 0.2, lean: 0.25 + Math.sin(TT * 3) * 0.05, seed: 5 });
    else if (a.state === 'stand') { const s = a.near ? lerp(1.35, 1.6, u) : 1.1; fcZombie(560, 1330, s, { ...sh, arms: 0.9, lean: 0.06, seed: 6 }); }
  });
  fcPath(build, null);
  // rings on the track
  for (let k = 0; k <= folds; k++) fcCirc(cx0 + k * cw / folds, 196, 10, '#b7c0cf', { w: 2 });
  // foreground: Lukas's feet under the blanket (orange grip socks) and Keks peeking in
  if (!a.close) {
    fcPath((g) => { g.moveTo(-20, 1500); g.quadraticCurveTo(200, 1330, 460, 1380); g.lineTo(520, 1700); g.lineTo(-20, 1700); g.closePath(); }, '#c8d1e2');
    fcCirc(330, 1350, 46, '#e8823a', { ry: 34, rot: -0.4 }); fcCirc(430, 1370, 46, '#e8823a', { ry: 34, rot: -0.2 });
    fcLine([[300, 1335], [355, 1360]], '#fff3', 4);
    fcDog(860, 1560, 0.9, { pose: 'sit', flip: true, earUp: !a.calm });
  }
  if (a.alarm) { const p = 0.5 + 0.5 * Math.sin(TT * TAU * 2.2); fcGlow(540, 120, 700, 'rgba(255,40,40,1)', 0.25 + 0.35 * p); fcTint('rgba(255,30,40,1)', 0.08 * p, 'source-over'); }
  if (a.title) fcDefer(() => titleTag(EZ.o3(clamp((lt - 0.1) / 0.3))));
  endScene(a.calm ? 0.05 : 0);
};
// the title: a patient wristband card
function titleTag(u) {
  const x = 540, y = 230 - (1 - u) * 40, w = 760, h = 230;
  ctx.save(); ctx.globalAlpha = u; ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 30; ctx.fillStyle = '#f3f1ec'; ctx.beginPath(); ctx.roundRect(x - w / 2, y, w, h, 18); ctx.fill(); ctx.shadowColor = 'transparent';
  ctx.fillStyle = '#2a5ea8'; ctx.beginPath(); ctx.roundRect(x - w / 2, y, w, 46, [18, 18, 0, 0]); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = `600 24px ${FCF}`; ctx.letterSpacing = '2px'; ctx.fillText('PATIENT · STATION 3 · ZI 317-B', x - w / 2 + 24, y + 32); ctx.fillStyle = '#ffd34d'; ctx.textAlign = 'right'; ctx.fillText('STURZGEFAHR', x + w / 2 - 22, y + 32); ctx.textAlign = 'left';
  for (let k = 0; k < 26; k++) { ctx.fillStyle = '#16181d'; ctx.fillRect(x - w / 2 + 30 + k * 6.2, y + 70, k % 3 ? 3 : 5, 130); }
  ctx.letterSpacing = '0px'; ctx.fillStyle = FC.ink; ctx.font = `700 60px ${FCF}`; ctx.fillText('ZOMBIE-APOKALYPSE', x - w / 2 + 210, y + 128);
  ctx.fillStyle = FC.red; ctx.fillText('IM KRANKENHAUS', x - w / 2 + 220, y + 200);
  ctx.restore();
}
// ---- character close-ups: who, face, bg: room | red | redRoom | bath | stairs
function faceBg(bg) {
  if (bg === 'bath') { fillAll('#8fa3b3'); for (let y = 0; y < H; y += 90) for (let x = (y / 90 % 2) * 45; x < W; x += 90) fcRect(x, y, 88, 88, '#9db0c0', { w: 1.5, line: '#7e93a4' }); fcRect(720, 240, 280, 360, '#c7d6e2', { r: 14 }); fcRect(740, 260, 240, 320, '#e4eef6', { r: 10, w: 2 }); return; }
  if (bg === 'stairs') { fillAll('#5d6470'); fcRect(-10, 1150, W + 20, 900, '#4a505b', { line: false }); ctx.save(); ctx.font = `700 520px ${FCF}`; ctx.fillStyle = '#6b7380'; ctx.fillText('3', 80, 900); ctx.restore(); fcLine([[0, 1000], [1080, 760]], '#c9a227', 14); fcLine([[0, 1000], [1080, 760]], FC.line, 2); fcRect(820, 220, 200, 70, '#c62f2a', { r: 6 }); ctx.save(); ctx.fillStyle = '#fff'; ctx.font = `700 46px ${FCF}`; ctx.fillText('AUSGANG', 836, 274); ctx.restore(); return; }
  roomBg({ headwall: true });
  fcMonitorSmall(660, 300, 360, 260);
}
function fcMonitorSmall(x, y, w, h, o = {}) { fcLine([[x + w * 0.6, y - 120], [x + w * 0.6, y]], '#2a3140', 16); fcMonitor(x, y, w, h, o.hr ?? bpmAt(TT), o); }
SCENES.face = (a, i) => {
  const { lt } = shotT(i);
  faceBg(a.bg);
  const tremble = a.face === 'panic' ? Math.sin(TT * 41) * 3 : 0, look = a.face === 'panic' ? [Math.sin(TT * 2.5) * 0.6, 0] : [-0.3, 0];
  const face = Object.assign({}, FC_EXPR[a.face], { look });
  let arms = null;
  if (a.hands) { const k = EZ.o3(clamp(lt / 0.3)); arms = { l: [[-1.5, 1.7 - 0.3 * k], [-1.05, 0.7 + 0.6 * (1 - k)], 'open'], r: [[1.5, 1.7 - 0.3 * k], [1.05, 0.7 + 0.6 * (1 - k)], 'open'] }; }
  fcBust(a.who, 540 + tremble, 740, 1.2, { face, arms, talk: a.who === 'jana' && a.face !== 'worried' });
  if (a.bg === 'red' || a.bg === 'redRoom') alarmWash(a.bg === 'red' ? 1 : 0.8);
  if (a.bg === 'stairs') fcTint('rgba(40,60,90,1)', 0.12, 'source-over');
  endScene();
};
// ---- the bedside monitor, big. hr: [from, to]; alarm; beep; rule (REGEL #1); silenceAt; hand
function monitorBig(x, y, w, h, o) {
  const alarm = o.alarm && !o.muted, p = 0.5 + 0.5 * Math.sin(TT * TAU * 2.2);
  fcRect(x - 14, y - 14, w + 28, h + 28, '#262c38', { r: 34 });
  fcRect(x, y, w, h, '#2f3645', { r: 26 });
  const sx = x + 26, sy = y + 26, sw = w - 52, shh = h - 140;
  fcRect(sx, sy, sw, shh, FC.mon, { r: 12, w: 2, line: alarm ? (p > 0.5 ? '#ff4b3e' : '#7a1d18') : FC.line });
  if (alarm) { ctx.save(); ctx.lineWidth = 8; ctx.strokeStyle = `rgba(255,60,50,${0.5 + 0.5 * p})`; ctx.strokeRect(sx + 4, sy + 4, sw - 8, shh - 8); ctx.restore(); fcRect(sx + 20, sy + 18, sw * 0.62, 56, '#c0271f', { r: 6, line: false }); ctx.save(); ctx.fillStyle = '#fff'; ctx.font = `700 40px ${FCF}`; ctx.fillText('SPO2 SONDE AB', sx + 38, sy + 61); ctx.restore(); }
  else { ctx.save(); ctx.fillStyle = '#7e8aa0'; ctx.font = `600 28px ${FCF}`; ctx.fillText(o.title || '317-A   ERW.', sx + 24, sy + 48); ctx.textAlign = 'right'; ctx.fillText('06:4' + (o.min ?? 2), sx + sw - 24, sy + 48); ctx.restore(); }
  const bpm = o.hr, speed = 300 * bpm / 60;
  fcEcg(sx + 24, sy + shh * 0.42, sw * 0.6, shh * 0.17, o.flat ? '#3fd28a' : '#3fd28a', { flat: o.flat, beat: 300, speed, w: 6 });
  if (o.flat || alarm) { ctx.save(); ctx.setLineDash([12, 12]); fcLine([[sx + 24, sy + shh * 0.72], [sx + 24 + sw * 0.6, sy + shh * 0.72]], '#5aa9e6', 4); ctx.restore(); }
  else fcWave(sx + 24, sy + shh * 0.74, sw * 0.6, shh * 0.1, FC.spo);
  ctx.save(); ctx.textAlign = 'right';
  const beatK = Math.exp(-((TT * bpm / 60) % 1) * 6);
  ctx.fillStyle = o.flat ? '#ff4b3e' : '#3fd28a'; ctx.font = `700 ${shh * 0.42}px ${FCF}`; ctx.fillText(o.flat ? '0' : String(bpm), sx + sw - 30, sy + shh * 0.55);
  if (!o.flat) { ctx.fillStyle = `rgba(255,80,90,${0.4 + 0.6 * beatK})`; ctx.font = `700 50px ${FCF}`; ctx.fillText('♥', sx + sw - 30, sy + 110); }
  ctx.fillStyle = '#5aa9e6'; ctx.font = `700 ${shh * 0.2}px ${FCF}`; ctx.fillText(o.flat || alarm ? '--' : '97', sx + sw - 30, sy + shh * 0.86);
  ctx.fillStyle = '#7e8aa0'; ctx.font = `600 24px ${FCF}`; ctx.fillText('HF', sx + sw - 30, sy + 150 - 60); ctx.restore();
  // the alarm-mute button
  const bx = x + w * 0.62, by = y + h - 96;
  for (let k = 0; k < 3; k++) fcRect(x + 40 + k * 120, y + h - 86, 100, 40, '#3a4252', { r: 8, w: 2 });
  fcRect(bx, by, 170, 70, o.muted ? '#5a6272' : alarm ? (p > 0.5 ? '#ffb02e' : '#c9861e') : '#c9961e', { r: 12 });
  ctx.save(); ctx.fillStyle = '#1b1d22'; ctx.font = `700 40px ${FCF}`; ctx.textAlign = 'center'; ctx.fillText(o.muted ? '🔕' : '🔔', bx + 85, by + 50); ctx.restore();
  if (alarm) fcGlow(bx + 85, by + 35, 180, 'rgba(255,170,40,1)', 0.25 * p);
  return { bx: bx + 85, by: by + 35 };
}
SCENES.monitor = (a, i) => {
  const { lt, u } = shotT(i), muteT = a.silenceAt ? tAt(a.silenceAt) : 1e9, muted = TT >= muteT;
  roomBg({ headwall: false, curtain: false });
  fcRect(-10, 1260, W + 20, 700, '#cdd6e6', { w: 3 });   // the bed's edge in front
  fcLine([[540, 0], [540, 300]], '#2a3140', 26);
  const hr = Math.round(lerp(a.hr[0], a.hr[1], u));
  const B0 = monitorBig(110, a.rule ? 560 : 300, 860, a.rule ? 700 : 760, { hr, alarm: a.alarm, muted, min: 2 + Math.floor(u) });
  // cables down to the patient
  fcLine([[300, 1060], [260, 1300]], '#e9edf3', 6); fcLine([[360, 1060], [420, 1300]], '#c43c35', 6);
  if (a.hand) { const k = springMove(0.15 + SHOT_LIST[i][0], 0, 1, SPRING.smooth), hy = lerp(1900, 1250, k) + Math.sin(TT * 9) * 6; fcArm([700, 2100], [700, hy + 260], [640, hy], 'lukas', { pose: 'point', band: true, w: 70 }); }
  if (a.rule) {
    const r0 = tAt('l28');
    fcDefer(() => fcRule(1, 'ERST DEN ALARM', 'STUMM SCHALTEN', { u: EZ.o3(clamp((TT - r0) / 0.3)), y: 230, size: 76 }));
    // Jana's hand comes in and presses mute
    const k = EZ.io(clamp((TT - (muteT - 0.45)) / 0.4)), press = TT > muteT ? 1 - EZ.o3(clamp((TT - muteT) / 0.25)) * 0.3 : 1;
    if (k > 0) { const tx = B0.bx + 30, ty = B0.by + 10; fcArm([1300, 1500], [lerp(1300, tx + 200, k), lerp(1500, ty + 200, k)], [lerp(1300, tx + 40, k) * press + tx * (1 - press) * 0, lerp(1500, ty + 30, k)], 'jana', { pose: 'point', w: 70 }); }
  }
  if (a.alarm && !muted) alarmWash(0.9);
  else if (a.alarm && muted) alarmWash(0.9 * (1 - clamp((TT - muteT) / 0.5)));
  endScene();
};
// bed B's monitor: flat line, a zero, behind the curtain's edge
SCENES.monitorB = (a, i) => {
  roomBg({ headwall: false, curtain: false });
  fcLine([[540, 0], [540, 300]], '#2a3140', 26);
  monitorBig(140, 330, 820, 700, { hr: 0, flat: true, title: '317-B   ERW.', min: 2 });
  for (let k = 0; k < 4; k++) fcRect(-40 + k * 55, 120, 57, 1300, k % 2 ? '#5f8a62' : '#6f9b70', { w: 2 });
  fcRect(-10, 1300, W + 20, 700, '#1f2633', { line: false });
  fcDefer(() => fcSign('BETT B', 'VOR 6 MINUTEN', 760, 1120, { size: 80 }));
  endScene(0.05);
};
// ---- Leipzig at dawn through the window: towers, the monument, smoke from fires
SCENES.city = (a, i) => {
  const g = ctx.createLinearGradient(0, 200, 0, 1300); g.addColorStop(0, '#1b2440'); g.addColorStop(0.6, '#4a3f6b'); g.addColorStop(1, '#d9875a'); fillAll('#1b2440'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const R = RNG('stars'); for (let k = 0; k < 70; k++) { const x = R.r(0, W), y = R.r(150, 700), tw = 0.5 + 0.5 * Math.sin(TT * 3 + k); fcCirc(x, y, R.r(1.5, 3.5) * (0.6 + 0.4 * tw), '#f1f3ff', { line: false }); }
  // smoke plumes drifting
  for (const [sx, s0] of [[300, 1], [760, 2], [930, 3]]) for (let k = 0; k < 9; k++) { const y = 1040 - k * 90 - ((TT * 40) % 90), r = 30 + k * 16; ctx.save(); ctx.globalAlpha = 0.35 - k * 0.03; ctx.fillStyle = '#2a2633'; ctx.beginPath(); ctx.arc(sx + Math.sin(k * 0.9 + TT * 0.6 + s0) * 30 + k * 18, y, r, 0, TAU); ctx.fill(); ctx.restore(); }
  // skyline: the City-Hochhaus (tall, rounded crown), the monument (stepped dome), blocks
  const sk = '#151827';
  const R2 = RNG('blocks'); for (let x = -20; x < W; x += R2.r(50, 110)) { const h = R2.r(120, 330); fcRect(x, 1260 - h, R2.r(60, 120), h + 40, sk, { line: false }); }
  fcPath((g2) => { g2.moveTo(470, 1260); g2.lineTo(470, 560); g2.quadraticCurveTo(540, 510, 610, 560); g2.lineTo(610, 1260); g2.closePath(); }, sk, { line: false });
  fcLine([[540, 525], [540, 450]], sk, 6);
  fcPath((g2) => { g2.moveTo(790, 1260); g2.lineTo(800, 980); g2.lineTo(840, 950); g2.quadraticCurveTo(880, 840, 920, 950); g2.lineTo(960, 980); g2.lineTo(970, 1260); g2.closePath(); }, sk, { line: false });
  fcLine([[880, 860], [880, 800]], sk, 6);
  // lit windows (some flicker out)
  const R3 = RNG('win'); for (let k = 0; k < 90; k++) { const x = R3.r(0, W), y = R3.r(900, 1240), on = (R3.f() > 0.35) && Math.sin(TT * 1.3 + k * 7) > -0.7; if (on) fcRect(x, y, 8, 10, '#f3c86b', { line: false }); }
  for (let k = 0; k < 14; k++) fcRect(480 + (k % 4) * 30, 600 + Math.floor(k / 4) * 70, 12, 22, Math.sin(TT * 2 + k) > 0 ? '#f3c86b' : '#3a3550', { line: false });
  // a helicopter light, blinking across the sky
  const hx = 120 + TT * 30 % 900; if ((F % 30) < 6) fcGlow(hx, 420, 30, 'rgba(255,60,60,1)', 0.9);
  // the window: frame, mullion, half-open blinds, the sill with a get-well card
  fcRect(-10, -10, W + 20, 170, FC.wall, { line: false }); fcRect(-10, 1290, W + 20, 700, FC.wall, { line: false });
  fcRect(-10, 150, 70, 1150, FC.wall, { line: false }); fcRect(1020, 150, 80, 1150, FC.wall, { line: false });
  fcRect(60, 160, 960, 1130, null, { w: 14, line: '#c8d0dc' }); fcRect(530, 160, 20, 1130, '#c8d0dc', { w: 3 });
  for (let k = 0; k < 6; k++) fcRect(60, 160 + k * 22, 960, 18, '#d6dbe3', { w: 2 });
  fcRect(20, 1280, 1040, 50, '#dfe4ec', { w: 3 });
  ctx.save(); ctx.translate(840, 1280); ctx.rotate(-0.06); fcPoly([[-60, 0], [60, 0], [40, -120], [-80, -120]], '#f6e7d2'); ctx.fillStyle = '#c0392b'; ctx.font = `700 26px ${FCF}`; ctx.fillText('GUTE', -60, -80); ctx.fillText('BESSERUNG', -66, -50); ctx.restore();
  endScene();
};
// ---- Lukas in bed (wide): the label shot
function bedWide(o = {}) {
  roomBg(); fcMonitorSmall(640, 250, 400, 300, { hr: o.hr ?? 88 });
  fcLine([[150, 160], [150, 1500]], '#9aa6bb', 9);
  fcPath((g) => g.roundRect(100, 200, 100, 150, 18), 'rgba(225,236,245,0.85)');
  fcPoly([[130, 1200], [400, 620], [560, 690], [330, 1230]], FC.sheet);
  fcCirc(440, 700, 150, '#e6ebf3', { ry: 90, rot: -0.5 });
  fcRect(40, 1290, 1060, 70, FC.steel, { r: 14 });
  fcRect(90, 1360, 26, 160, FC.steelD); fcRect(960, 1360, 26, 160, FC.steelD); fcCirc(103, 1530, 26, '#2b3140'); fcCirc(973, 1530, 26, '#2b3140');
  fcBust('lukas', 470, 640, 0.92, { face: o.face || { mouth: 'flat', brows: 0.5, look: [-0.4, 0] }, arms: { r: [[1.4, 2.6], [2.3, 2.7], 'open'] } });
  fcPath((g) => { g.moveTo(300, 1290); g.quadraticCurveTo(280, 1120, 520, 1100); g.lineTo(980, 1140); g.quadraticCurveTo(1040, 1200, 1000, 1290); g.closePath(); }, FC.sheet);
  fcLine([[560, 1150], [960, 1180]], FC.sheetD, 4); fcLine([[520, 1210], [940, 1240]], FC.sheetD, 4);
  fcCirc(1000, 1170, 50, '#e8823a', { ry: 62, rot: -0.3 });
  ctx.save(); ctx.beginPath(); ctx.moveTo(150, 350); ctx.bezierCurveTo(160, 900, 420, 1200, 700, 1000); ctx.lineWidth = 3.5; ctx.strokeStyle = 'rgba(230,240,250,0.9)'; ctx.stroke(); ctx.restore();
}
SCENES.roomBed = (a, i) => { bedWide(); endScene(); };
SCENES.lukasSide = (a, i) => {
  const { lt } = shotT(i), k = clamp(lt / 1.2);
  roomBg();
  fcBust('lukas', 520, 700, 1.25, { face: lt < 1.1 ? 'wince' : 'worried', arms: { r: [[1.6, 2.6], [0.5 + Math.sin(TT * 2) * 0.05, 2.75], 'open'], l: [[-1.5, 2.7], [-1.1, 3.2], 'open'] } });
  // a fresh dressing peeking out of the gown, with a hint of the scar
  fcRect(330, 1180, 150, 90, '#f7f7f2', { r: 10 }); fcLine([[360, 1225], [450, 1215]], '#d76b6b', 4);
  fcDefer(() => fcSign('OP', 'GESTERN NACHT', 860, 300, { size: 70 }));
  endScene();
};
// ---- Keks: petted (close), on night shift
SCENES.dogPet = (a, i) => {
  roomBg({ headwall: false });
  fcRect(-10, 1150, W + 20, 800, '#cdd6e6', { w: 3 });
  fcDog(300, 1560, 2.1, { pose: 'sit', pant: true, wag: 12 });
  const k = Math.sin(TT * 3.2), hx = 420 + k * 50, hy = 900 + Math.abs(k) * 12;
  fcArm([-200, 300], [200, 420 + k * 10], [hx, hy], 'lukas', { pose: 'open', band: true, w: 74 });
  endScene();
};
SCENES.dogNap = (a, i) => {
  const { lt } = shotT(i);
  fillAll('#3a4560'); fcRect(-10, 1150, W + 20, 800, '#2f3850', { line: false });
  fcRect(120, 260, 360, 160, '#1d2230', { r: 12 }); ctx.save(); ctx.fillStyle = '#ff5a4a'; ctx.font = `700 120px ${FCF}`; ctx.fillText('06:1' + (2 + Math.floor(lt)), 150, 385); ctx.restore();
  fcPath((g) => g.ellipse(540, 1260, 380, 110, 0, 0, TAU), '#7a5a8c');
  fcPath((g) => g.ellipse(540, 1240, 330, 80, 0, 0, TAU), '#9b7bae', { w: 2 });
  fcDog(520, 1250, 1.5, { pose: 'lie', pant: lt > 0.3 && lt < 0.8 });
  fcDefer(() => fcSign('NACHTSCHICHT', '22:00 – 07:00', 780, 300, { size: 64 }));
  endScene();
};
// ---- the man from bed B: his feet touch the floor under the curtain
SCENES.feet = (a, i) => {
  const { lt } = shotT(i);
  fillAll('#26303f'); fcRect(-10, 1150, W + 20, 800, '#3a4458', { line: false });
  for (let k = 0; k < 12; k++) fcRect(-20 + k * 95, 0, 98, 1060 + (k % 2) * 18, k % 2 ? '#6f9b6c' : '#80ab78', { w: 2 });
  fcGlow(560, 700, 600, 'rgba(235,255,190,1)', 0.25);
  fcRect(180, 1000, 30, 200, FC.steelD); fcRect(860, 1000, 30, 200, FC.steelD); fcCirc(195, 1210, 28, '#22262f'); fcCirc(875, 1210, 28, '#22262f');
  const k1 = EZ.io(clamp((lt - 0.1) / 0.6)), k2 = EZ.io(clamp((lt - 0.45) / 0.6));
  const foot = (x, k, tag) => { const y = lerp(880, 1290, k); fcLimb([[x, 600], [x + 6, y - 60]], '#7c8288', 70); fcPath((g) => g.ellipse(x + 50, y - 20, 85, 36, 0, 0, TAU), '#7c8288'); if (tag) { fcLine([[x + 110, y - 30], [x + 160, y + 20]], '#ddd', 3); fcRect(x + 140, y + 10, 70, 44, '#f1eee7', { r: 4, w: 2.5, rot: 0.2 }); } };
  foot(470, k1, true); foot(620, k2, false);
  fcPath((g) => g.ellipse(560, 1310, 260, 26, 0, 0, TAU), 'rgba(0,0,0,0.3)', { line: false });
  endScene(0.1);
};
// ---- the finger clip: reach, then pull it off
function fingerClip(x, y, s, off) {
  const ox = off * 260, a = -0.15;
  ctx.save(); ctx.translate(x + ox, y - off * 60); ctx.rotate(a + off * 0.5); ctx.scale(s, s);
  fcRect(-70, -48, 140, 96, '#9aa5b8', { r: 30 }); fcRect(-70, -48, 140, 40, '#c3cad6', { r: 20 });
  fcCirc(0, -10, 10, off > 0.1 ? '#4a1a1a' : '#ff3b30', { line: false }); if (off < 0.1) fcGlow(0, -10, 40, 'rgba(255,40,40,1)', 0.6);
  ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.moveTo(x + ox - 60, y - off * 60); ctx.bezierCurveTo(x + ox - 260, y - 300, x - 120, y - 600 + Math.sin(TT * 4) * 20 * off, x - 40, y - 900); ctx.lineWidth = 9; ctx.strokeStyle = '#e7ebf0'; ctx.stroke(); ctx.restore();
}
SCENES.reach = (a, i) => {
  const { lt } = shotT(i);
  fillAll('#cdd6e6'); for (let k = 0; k < 5; k++) fcLine([[0, 300 + k * 260], [W, 340 + k * 260]], FC.sheetD, 5);
  fcArm([-300, 1500], [120, 1150], [460, 960], 'lukas', { pose: 'open', band: true, w: 96 });
  fingerClip(640, 925, 1.2, 0);
  const k = springMove(SHOT_LIST[i][0] + 0.2, 0, 1, SPRING.smooth);
  fcArm([1400, 1800], [lerp(1300, 980, k), lerp(1500, 1260, k)], [lerp(1200, 790, k), lerp(1300, 1010, k)], 'lukas', { pose: 'pinch', w: 96 });
  endScene();
};
SCENES.clip = (a, i) => {
  const { lt } = shotT(i), off = springMove(SHOT_LIST[i][0] + 0.25, 0, 1, SPRING.snappy);
  fillAll('#cdd6e6'); for (let k = 0; k < 5; k++) fcLine([[0, 300 + k * 260], [W, 340 + k * 260]], FC.sheetD, 5);
  fcArm([-300, 1600], [100, 1250], [420, 1020], 'lukas', { pose: 'open', band: true, w: 110 });
  fingerClip(640, 990, 1.45, off);
  fcArm([1500, 1700], [1180 + off * 200, 1240 - off * 40], [820 + off * 250, 1040 - off * 60], 'lukas', { pose: 'pinch', w: 110 });
  if (off > 0.2 && lt < 0.8) for (let k = 0; k < 6; k++) { const ang = k / 6 * TAU, r0 = 120 + lt * 200; fcLine([[640 + Math.cos(ang) * r0, 990 + Math.sin(ang) * r0], [640 + Math.cos(ang) * (r0 + 60), 990 + Math.sin(ang) * (r0 + 60)]], '#ffffff', 8); }
  endScene();
};
// ---- the nurses' station: a wall of monitors, one goes red
SCENES.station = (a, i) => {
  fillAll('#33405a'); fcRect(-10, 1150, W + 20, 800, '#2a3347', { line: false });
  fcRect(70, 220, 940, 640, '#151a22', { r: 16 });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
    const x = 100 + c * 305, y = 250 + r * 150, red = r === 3 && c === 2, p = 0.5 + 0.5 * Math.sin(TT * TAU * 2.2);
    fcRect(x, y, 285, 135, red ? (p > 0.5 ? '#c0271f' : '#5e1410') : '#0e1319', { r: 6, w: 2 });
    ctx.save(); ctx.fillStyle = red ? '#fff' : '#7e8aa0'; ctx.font = `600 24px ${FCF}`; ctx.fillText(red ? '317-A' : `3${String(r * 3 + c + 1).padStart(2, '0')}`, x + 12, y + 30); ctx.restore();
    if (red) { ctx.save(); ctx.fillStyle = '#fff'; ctx.font = `700 36px ${FCF}`; ctx.fillText('SPO2 SONDE AB', x + 20, y + 95); ctx.restore(); }
    else { fcEcg(x + 12, y + 90, 170, 26, '#3fd28a', { beat: 60, speed: 80 + c * 15, w: 3 }); ctx.save(); ctx.fillStyle = '#3fd28a'; ctx.font = `700 54px ${FCF}`; ctx.textAlign = 'right'; ctx.fillText(String(70 + ((r * 7 + c * 13) % 40)), x + 272, y + 110); ctx.restore(); }
  }
  ctx.save(); ctx.fillStyle = '#9aa7bd'; ctx.font = `600 28px ${FCF}`; ctx.letterSpacing = '3px'; ctx.textAlign = 'center'; ctx.fillText('ZENTRALE ÜBERWACHUNG · STATION 3', 540, 900); ctx.restore();
  fcRect(-10, 1000, W + 20, 60, '#c9ced8', { w: 3 }); fcRect(-10, 1060, W + 20, 300, '#8d96a8', { w: 3 });
  fcRect(130, 860, 300, 150, '#1c2230', { r: 8 }); fcRect(145, 875, 270, 115, '#3c6fb0', { w: 2 }); for (let k = 0; k < 4; k++) fcLine([[165, 900 + k * 22], [330 - k * 20, 900 + k * 22]], '#d8e6f8', 6);
  fcPoly([[700, 1000], [770, 1000], [760, 920], [710, 920]], '#e9e2d4'); for (let k = 0; k < 3; k++) { const y = 890 - ((TT * 50 + k * 30) % 90); ctx.save(); ctx.globalAlpha = 0.5 * (1 - (890 - y) / 90); fcLine([[735 + Math.sin(y * 0.1) * 8, y], [735 + Math.sin(y * 0.1 + 1) * 8, y - 20]], '#fff', 4); ctx.restore(); }
  // the empty chair, still turning
  ctx.save(); ctx.translate(560, 1500); ctx.rotate(Math.sin(TT * 1.4) * 0.12); fcRect(-150, -330, 300, 260, '#202634', { r: 40 }); fcRect(-170, -80, 340, 70, '#202634', { r: 20 }); ctx.restore();
  fcLine([[560, 1490], [560, 1640]], '#4a5368', 20); fcLine([[420, 1660], [700, 1660]], '#4a5368', 16);
  endScene();
};
// ---- Jana bursts in: "Runter!"
SCENES.burst = (a, i) => {
  const { lt } = shotT(i), k = springMove(SHOT_LIST[i][0], 0, 1, SPRING.snappy);
  roomBg({ headwall: true, curtain: false });
  fcRect(700, 300, 330, 1000, '#0b0d12', { w: 4 }); for (let z = 0; z < 4; z++) { fcCirc(790 + z * 60, 620 + (z % 2) * 30, 5, '#e8f0ff', { line: false }); fcCirc(805 + z * 60, 620 + (z % 2) * 30, 5, '#e8f0ff', { line: false }); }
  fcFigure('jana', lerp(980, 700, k), 1500, 1050, { arms: 'reach', armsB: 'push', face: 'shout', walk: true });
  fcBust('lukas', 260, 900, 0.7, { face: 'panic' });
  fcRect(-10, 1300, 700, 200, FC.sheet, { w: 3 });
  alarmWash(1);
  endScene();
};
SCENES.janaDog = (a, i) => {
  roomBg({ curtain: false });
  fcFigure('jana', 420, 1560, 1150, { arms: 'hold', face: { mouth: 'flat', brows: -0.4, look: [0.6, 0.5] } });
  fcDog(760, 1560, 1.3, { pose: 'sit', flip: true, earUp: true });
  ctx.save(); ctx.beginPath(); ctx.moveTo(560, 1050); ctx.quadraticCurveTo(700, 1300, 760, 1200); ctx.lineWidth = 6; ctx.strokeStyle = '#c73a32'; ctx.stroke(); ctx.restore();
  alarmWash(0.7);
  endScene();
};
// ---- the bed: 180 kilos, and brakes
SCENES.bedWheel = (a, i) => {
  fillAll('#3d4c68'); fcRect(-10, 1300, W + 20, 700, '#56637a', { line: false });
  fcRect(-100, 560, 1300, 120, FC.steel, { r: 20 }); fcRect(-100, 680, 1300, 70, FC.steelD, { line: false });
  fcRect(-100, 760, 1300, 260, '#cfd7e6', { w: 3 }); fcLine([[-100, 860], [1200, 880]], FC.sheetD, 5);
  fcRect(470, 1020, 90, 200, FC.steelD); fcRect(330, 1180, 370, 60, '#2b3140', { r: 10 });
  ctx.save(); ctx.translate(515, 1380); ctx.rotate(TT * 0.2); fcCirc(0, 0, 230, '#22262f'); fcCirc(0, 0, 110, '#8e9ab0'); for (let k = 0; k < 6; k++) { ctx.rotate(TAU / 6); fcLine([[0, 0], [0, 95]], '#5a6272', 12); } fcCirc(0, 0, 28, '#3d4452'); ctx.restore();
  ctx.save(); ctx.fillStyle = '#ffffff'; ctx.font = `700 200px ${FCF}`; ctx.globalAlpha = 0.08; ctx.fillText('180', 600, 760); ctx.restore();
  fcDefer(() => fcSign('180 KG', 'EIN KRANKENHAUSBETT', 540, 240, { size: 120 }));
  alarmWash(0.6);
  endScene();
};
SCENES.brake = (a, i) => {
  const { lt } = shotT(i), k = EZ.o3(clamp((lt - 0.1) / 0.12));
  fillAll('#3d4c68'); fcRect(-10, 1300, W + 20, 700, '#56637a', { line: false });
  fcRect(-100, 500, 1300, 100, FC.steel, { r: 20 });
  fcCirc(380, 1180, 170, '#22262f'); fcCirc(380, 1180, 80, '#8e9ab0');
  ctx.save(); ctx.translate(560, 1010); ctx.rotate(-0.35 + k * 0.35); fcRect(0, -30, 330, 60, '#d6372c', { r: 12 }); for (let s = 0; s < 6; s++) fcLine([[40 + s * 45, -24], [40 + s * 45, 24]], '#8f1d16', 4); ctx.restore();
  const fy = lerp(560, 900, k);
  fcLimb([[760, -50], [780, fy - 120]], CAST.jana.cloth, 120);
  fcPath((g) => g.roundRect(640, fy - 120, 300, 130, 50), '#f1f2f5');
  if (k > 0.9 && lt < 0.6) for (let s = 0; s < 5; s++) fcLine([[600 - s * 30, 950 + s * 30], [540 - s * 40, 980 + s * 40]], '#fff', 6);
  fcDefer(() => fcSign('BREMSE', 'FESTGESTELLT', 540, 240, { size: 100 }));
  alarmWash(0.5);
  endScene();
};
// ---- the leads come off, then the IV in four steps
SCENES.leads = (a, i) => {
  const { lt } = shotT(i);
  roomBg({ headwall: false, curtain: false });
  fcBust('lukas', 540, 200, 2.1, { face: 'scared' });
  const pads = [[380, 900, '#e9edf3'], [700, 900, '#c43c35'], [540, 1250, '#3fd28a']];
  pads.forEach(([x, y, c], k) => { const off = EZ.o3(clamp((lt - 0.08 - k * 0.15) / 0.12)); fcLine([[x, y - off * 200], [x + (k - 1) * 200, -100]], c, 8); fcCirc(x, y - off * 200, 46, '#f6f6f2'); fcCirc(x, y - off * 200, 14, '#b9bec7'); });
  fcArm([1300, 600], [1050, 800], [760, 880 - EZ.o3(clamp(lt / 0.5)) * 160], 'jana', { pose: 'pinch', w: 100 });
  endScene();
};
function ivHand(x, y, s, o = {}) {   // Lukas's hand, palm down, with a cannula taped on
  fcArm([x - 900 * s, y + 300 * s], [x - 450 * s, y + 120 * s], [x, y], 'lukas', { pose: 'open', band: true, w: 120 * s });
  if (!o.out) { ctx.save(); ctx.translate(x + 90 * s + (o.slide || 0), y - 10 * s); ctx.rotate(-0.25); fcRect(-80 * s, -18 * s, 160 * s, 36 * s, '#f2e7cf', { r: 8 }); fcRect(10 * s, -26 * s, 70 * s, 52 * s, '#e8eef6', { r: 10 }); fcCirc(80 * s, 0, 18 * s, '#f0c419'); ctx.restore(); }
  if (o.tape !== false) { ctx.save(); ctx.translate(x + 100 * s, y - 20 * s); ctx.rotate(-0.3 - (o.peel || 0) * 0.8); fcRect(-90 * s, -60 * s, 180 * s, 120 * s, 'rgba(240,244,250,0.85)', { r: 10 }); ctx.restore(); }
  ctx.save(); ctx.beginPath(); ctx.moveTo(x + 170 * s + (o.slide || 0), y - 40 * s); ctx.bezierCurveTo(x + 300 * s, y - 300 * s, x + 200 * s, y - 700 * s, x + 350 * s, y - 1200 * s); ctx.lineWidth = 12 * s; ctx.strokeStyle = 'rgba(235,242,250,0.95)'; ctx.stroke(); ctx.restore();
}
SCENES.iv = (a, i) => {
  const { lt } = shotT(i);
  fillAll('#cdd6e6'); for (let k = 0; k < 5; k++) fcLine([[0, 300 + k * 260], [W, 340 + k * 260]], FC.sheetD, 5);
  if (a.step === 'warn') {
    ivHand(520, 1000, 1, {});
    const k = springMove(SHOT_LIST[i][0] + 0.3, 0, 1, SPRING.snappy);
    fcArm([1400, 300], [1150, 380], [lerp(1150, 830, k), lerp(450, 640, k)], 'lukas', { pose: 'fist', w: 110 });
    const p = (F % 20) < 12, cx = 540, cy = 520;
    if (lt > 0.6 && p) { ctx.save(); ctx.lineWidth = 26; ctx.strokeStyle = '#e8443a'; ctx.beginPath(); ctx.arc(cx, cy, 170, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx - 120, cy - 120); ctx.lineTo(cx + 120, cy + 120); ctx.stroke(); ctx.restore(); }
  } else if (a.step === 'clamp') {
    fcLine([[540, -50], [540, 1950]], 'rgba(235,242,250,0.95)', 26);
    fcRect(400, 650, 280, 560, '#eef2f7', { r: 30 }); fcRect(450, 700, 180, 460, '#cfd8e4', { r: 20 });
    ctx.save(); ctx.translate(540, 900 + EZ.io(clamp(lt / 0.5)) * 150); ctx.rotate(TT * 6); fcCirc(0, 0, 90, '#2d6fd3'); for (let k = 0; k < 12; k++) { ctx.rotate(TAU / 12); fcLine([[0, 70], [0, 90]], '#1b4a94', 6); } ctx.restore();
    fcHandShape(700, 1000 + EZ.io(clamp(lt / 0.5)) * 150, Math.PI, 110, CAST.jana.skin, 'open');
  } else if (a.step === 'tape') {
    ivHand(480, 1050, 1.2, { peel: EZ.io(clamp(lt / 0.5)) });
    fcHandShape(700 - EZ.io(clamp(lt / 0.5)) * 80, 850 - EZ.io(clamp(lt / 0.5)) * 120, -0.6, 90, CAST.jana.skin, 'pinch');
  } else if (a.step === 'pull') {
    const k = EZ.i2(clamp(lt / 0.5));
    ivHand(480, 1050, 1.2, { tape: false, slide: k * 300, out: false });
    fcHandShape(640 + k * 300, 960, -0.3, 90, CAST.jana.skin, 'pinch');
  } else {
    ivHand(480, 1050, 1.2, { tape: false, out: true });
    fcCirc(620, 1030, 9, '#b0201a', { line: false });
    const k = EZ.o3(clamp(lt / 0.2));
    fcRect(560, 970, 130, 110, '#ffffff', { r: 14 });
    fcHandShape(640, lerp(820, 990, k), Math.PI / 2, 100, CAST.jana.skin, 'point');
  }
  endScene();
};
