// =====================================================================
//  OVERLAYS at screen size, after the grade (STYLE.post -> pieceOverlay):
//  flashes on the big cuts, the HUD pill (pulse -> blackout timer), name labels, word-by-word captions
// =====================================================================
// ---- key words: yellow (y) or red (r)
const HL = {
  blau: 'r', '317': 'y', b: 'y', 'zombie-apokalypse': 'r', krankenhaus: 'y', niemals: 'r', herzmonitor: 'r', leipzig: 'y', eins: 'y', '18': 'y',
  blinddarm: 'y', keks: 'y', therapiehund: 'y', nachtschicht: 'y', vorhang: 'y', gestorben: 'r', steht: 'r', auf: 'r', rast: 'r', schlag: 'r',
  sensor: 'y', schreit: 'r', los: 'r', zimmer: 'y', stationszimmer: 'y', infizierte: 'r', runter: 'r', jana: 'y', hundeführerin: 'y',
  '180': 'y', kilo: 'y', bremsen: 'y', alarm: 'r', stumm: 'y', kabel: 'y', zugang: 'r', abklemmen: 'y', pflaster: 'y', rausziehen: 'y',
  draufdrücken: 'y', türklinke: 'r', schloss: 'y', personal: 'y', andere: 'r', '6:48': 'y', strom: 'r', '15': 'y', sekunden: 'y',
  notstrom: 'y', flur: 'r', tür: 'r', bad: 'y', zwei: 'y', still: 'y', nichts: 'r', offen: 'y', tausendmal: 'y', nein: 'r', aufzug: 'r',
  pling: 'y', essen: 'r', fertig: 'r', rollstuhl: 'y', nähten: 'y', yilmaz: 'y', notaufnahme: 'r', vier: 'y', sieben: 'y',
  hubschrauberlandeplatz: 'y', dach: 'y',
};
const hlKey = (w) => w.toLowerCase().replace(/[„“"’'.,!?…:–-]+$/g, '').replace(/^[„“"]+/, '').replace(/’s$/, '');
// ---- chunks of 1-3 words, each shown from its first word until the next chunk (or a beat after its last word)
const CAPS = (() => {
  const out = [];
  VOICE.lines.forEach((L) => {
    let cur = [];
    const flush = () => { if (cur.length) out.push({ words: cur, t0: cur[0].t0, t1: cur[cur.length - 1].t1 }); cur = []; };
    // "6:" + "48 Uhr." are one line in the script
    L.words.forEach((w) => {
      if (w.w === '–') return;
      cur.push(w);
      const chars = cur.reduce((a, x) => a + x.w.length + 1, 0);
      if (cur.length >= 3 || chars > 15 || /[.,!?…:“]$/.test(w.w)) flush();
    });
    flush();
  });
  for (let i = 0; i < out.length; i++) { const nx = out[i + 1]; out[i].end = nx && nx.t0 - out[i].t1 < 0.7 ? nx.t0 : out[i].t1 + 0.4; }
  // join the clock: "6:" + "48 UHR."
  return out.filter((c, i) => !(c.words.length === 1 && c.words[0].w === '6:' && (out[i + 1].words[0].w = '6:' + out[i + 1].words[0].w) && (out[i + 1].t0 = c.t0)));
})();
function drawCaption(t) {
  const c = CAPS.find((x) => t >= x.t0 - 0.03 && t < x.end);
  if (!c || t > DURATION - 2.6) return;
  const str = c.words.map((w) => { const k = HL[hlKey(w.w)]; return k === 'y' ? `*${w.w}*` : k === 'r' ? `^${w.w}^` : w.w; }).join(' ').replace(/[„“]/g, '');
  const pop = 1 + 0.16 * (1 - EZ.o3(clamp((t - c.t0 + 0.03) / 0.12)));
  const y = SHOT_LIST[eraAt(t)][3].capY || 1540;
  fcCaption(str, { pop, y });
}
// ---- the HUD: pulse pill while the heart races, then the blackout timer, then the generator
const BPM_KEYS = [[at('l14'), 132], [at('l15'), 138], [at('l17'), 142], [at('l18'), 147], [at('l22'), 153], [at('l23'), 158], [at('l26'), 150], [at('l29'), 146], [at('l30'), 139]];
function bpmAt(t) { if (t < BPM_KEYS[0][0]) return t < at('l05') ? Math.round(lerp(112, 124, clamp(t / at('l05')))) : 88; let v = BPM_KEYS[0][1]; for (let i = 0; i < BPM_KEYS.length; i++) { const [k, b] = BPM_KEYS[i]; if (t >= k) { const n = BPM_KEYS[i + 1]; v = n ? Math.round(lerp(b, n[1], clamp((t - k) / Math.max(0.5, n[0] - k)) ** 3)) : b; } } return v; }
function hudPill(text, color, icon) {
  const cx = W / 2, y = 150, h = 62;
  ctx.save(); ctx.font = `700 34px ${FCF}`; ctx.letterSpacing = '2px'; const w = ctx.measureText(text).width + 100;
  ctx.fillStyle = 'rgba(16,14,18,0.88)'; ctx.beginPath(); ctx.roundRect(cx - w / 2, y, w, h, 31); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = color; ctx.stroke();
  ctx.fillStyle = color; ctx.font = `700 34px ${FCF}`; ctx.fillText(icon, cx - w / 2 + 26, y + 44); ctx.fillStyle = '#f2ece6'; ctx.fillText(text, cx - w / 2 + 70, y + 44); ctx.restore();
}
function drawHUD(t) {
  const sc = SHOT_LIST[eraAt(t)][1];
  if (sc === 'endcard' || sc === 'blueprint') return;
  if (t >= at('l14') && t < at('l30')) fcPill(bpmAt(t));
  else if (t >= at('l30') && t < at('l40')) hudPill('KABEL AB', '#a3302b', '♥');
  else if (t >= at('l40') && t < at('l42') + 0.25) hudPill('6:48 UHR', '#c0392b', '●');
  else if (t >= at('l42') + 0.25 && t < at('l45')) hudPill(`STROMAUSFALL · 0:${String(Math.floor(t - at('l42'))).padStart(2, '0')}`, '#f5b731', '⚡');
  else if (t >= at('l45') && t < at('l48')) hudPill(`NOTSTROM · 0:${String(Math.floor(t - at('l42'))).padStart(2, '0')}`, '#3fd28a', '⚡');
  else if (sc === 'city') hudPill('LEIPZIG · TAG 1 · 6:12 UHR', '#c0392b', '●');
}
// ---- flashes: a white pop on the big hits, a black dip into the blackout
const FLASHES = [[0.53, '#ff2a2a', 0.15], [at('l12'), '#ffffff', 0.12], [at('l18'), '#ff3b30', 0.25], [at('l23'), '#ffffff', 0.12], [at('l39'), '#ffffff', 0.1], [at('l45'), '#cfe6ff', 0.2], [at('l55'), '#ffffff', 0.15]];
function drawFlash(t) { for (const [t0, c, d] of FLASHES) { const k = (t - t0) / d; if (k >= 0 && k < 1) { ctx.save(); ctx.globalAlpha = (1 - k) * (c === '#ff2a2a' ? 0.4 : 0.7); ctx.fillStyle = c; ctx.fillRect(0, 0, W, H); ctx.restore(); } } }
function drawLabel(t) {
  const e = eraAt(t), a = SHOT_LIST[e][3];
  if (!a.label) return;
  const u = EZ.o3(clamp((t - SHOT_LIST[e][0] - 0.12) / 0.3));
  DEFER = null; ctx.save(); ctx.translate(-60 * (1 - u), 0); fcLabel(a.label[0], a.label[1], { a: u, y: 250 }); ctx.restore();
}
function pieceOverlay() {
  const t = TT; DEFER = null;
  drawFlash(t); drawHUD(t); drawLabel(t); drawCaption(t);
}
