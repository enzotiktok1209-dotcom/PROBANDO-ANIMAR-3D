// =====================================================================
//  styles/flucht/hud.js — the series HUD (scene tag, rule checklist, top-right counter, FRAUEN AUF DER ERDE),
//  the REGEL card, ID / name tags, the news card, ECG, and the karaoke subtitles. All drawn in screen space.
// =====================================================================
function flText(str, x, y, size, color, o = {}) {
  ctx.save(); ctx.font = `${o.weight ?? 900} ${size}px ${o.font || FL_FONT}`; ctx.textAlign = o.align || 'center'; ctx.textBaseline = o.base || 'alphabetic';
  if (o.ls) ctx.letterSpacing = o.ls + 'px';
  if (o.shadow !== false) { ctx.shadowColor = 'rgba(0,0,0,0.65)'; ctx.shadowBlur = o.blur ?? 10; ctx.shadowOffsetY = 3; }
  if (o.stroke) { ctx.lineWidth = o.stroke; ctx.strokeStyle = o.strokeC || 'rgba(0,0,0,0.55)'; ctx.lineJoin = 'round'; ctx.strokeText(str, x, y); }
  ctx.fillStyle = color; ctx.fillText(str, x, y); const w = ctx.measureText(str).width; ctx.restore(); return w;
}
function flMeasure(str, size, weight = 900, font = FL_FONT) { ctx.save(); ctx.font = `${weight} ${size}px ${font}`; const w = ctx.measureText(str).width; ctx.restore(); return w; }
// a monospace chip with a coloured border (the scene tag / checklist rows / counters of the reference)
function flChip(str, x, y, o = {}) {
  const size = o.size ?? 26, padX = 16, w = flMeasure(str, size, 800, FL_MONO) + padX * 2, h = size + 18, al = o.align || 'center';
  const x0 = al === 'center' ? x - w / 2 : al === 'right' ? x - w : x, k = o.k ?? 1;
  ctx.save(); ctx.globalAlpha *= k;
  flRect(x0, y, w, h, 6, o.bg || 'rgba(10,12,20,0.78)');
  ctx.lineWidth = 3; ctx.strokeStyle = o.c || FL.hudW; ctx.beginPath(); ctx.roundRect(x0, y, w, h, 6); ctx.stroke();
  flText(str, x0 + padX, y + h / 2 + size * 0.36, size, o.tc || o.c || FL.hudW, { font: FL_MONO, weight: 800, align: 'left', shadow: false });
  if (o.bar != null) { flRect(x0, y + h + 8, w, 7, 3, 'rgba(255,255,255,0.15)'); flRect(x0, y + h + 8, w * clamp(o.bar), 7, 3, o.c || FL.hudW); }
  ctx.restore(); return w;
}
// the rule checklist (top-left). items: [{ text, t, done }]
function flChecklist(items) {
  let y = 165;
  for (const it of items) { if (TT < it.t) continue; const k = flIn(it.t); ctx.save(); ctx.translate(30 - (1 - k) * 40, 0); ctx.globalAlpha = clamp(k); flChip(it.text + (it.done != null && TT >= it.done ? ' ✓' : ''), 0, y, { size: 22, align: 'left', c: it.done != null && TT >= it.done ? FL.hudG : FL.hudW }); ctx.restore(); if (it.done != null && TT >= it.done && TT < it.done + 0.4) flGlow(160, y + 20, 160 * (1 - (TT - it.done) / 0.4), 'rgba(59,227,122,0.6)'); y += 54; }
}
// the series counter "FRAUEN AUF DER ERDE: n"
function flWomenCounter(x, y, n, o = {}) {
  const k = o.k ?? 1; if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(lerp(0.6, 1, k), lerp(0.6, 1, k)); ctx.globalAlpha *= clamp(k);
  flRect(-230, -12, 460, 120, 12, 'rgba(10,12,22,0.85)'); ctx.lineWidth = 4; ctx.strokeStyle = FL.pink; ctx.beginPath(); ctx.roundRect(-230, -12, 460, 120, 12); ctx.stroke();
  flText('FRAUEN AUF DER ERDE', 0, 26, 24, '#ffb3dc', { font: FL_MONO, weight: 800, shadow: false });
  const g = o.glitch ? (Math.floor(TT * 18) % 3 === 0) : false;
  if (g) { flText(String(o.alt ?? n), 6, 94, 70, '#2fe8ff', { shadow: false }); flText(String(o.alt ?? n), -6, 94, 70, '#ff2b6a', { shadow: false }); }
  flText(String(g ? (o.alt ?? n) : n), 0, 94, 70, '#ffffff', { shadow: false });
  ctx.restore();
}
// the big REGEL card (dark navy, REGEL white, the number huge yellow with an underline)
function flRegelCard(n, t0) {
  flBg([[0, '#161c30'], [1, '#0b0f1c']]);
  const k = flIn(t0 + 0.05), k2 = flIn(t0 + 0.15);
  flText('REGEL', W / 2, 640, 120, '#ffffff', { ls: 4 });
  ctx.save(); ctx.translate(W / 2, 880); ctx.scale(k2, k2); flText(String(n), 0, 120, 380, FL.yellow, { blur: 30 }); ctx.restore();
  flRect(W / 2 - 220 * k, 1040, 440 * k, 12, 6, FL.yellow);
}
// the ID card from the viral (NAME / ALTER)
function flIdCard(x, y, k, o = {}) {
  if (k <= 0) return; ctx.save(); ctx.translate(x + (1 - k) * 300, y); ctx.globalAlpha *= clamp(k);
  flRect(0, 0, 330, 200, 14, 'rgba(12,15,26,0.9)'); ctx.lineWidth = 4; ctx.strokeStyle = '#d9b24a'; ctx.beginPath(); ctx.roundRect(0, 0, 330, 200, 14); ctx.stroke();
  flRect(18, 18, 92, 110, 10, '#2a3048'); flGretaHead(64, 78, 34, { mood: 'neutral', blink: false });
  flText('NAME:', 128, 60, 22, '#aab0c0', { font: FL_MONO, align: 'left', weight: 700, shadow: false }); flText('GRETA', 128, 92, 30, '#ffffff', { font: FL_MONO, align: 'left', weight: 800, shadow: false });
  flText('ALTER: 23', 128, 132, 22, '#aab0c0', { font: FL_MONO, align: 'left', weight: 700, shadow: false });
  flText(o.status || 'STATUS: DIE LETZTE', 18, 180, 22, FL.red, { font: FL_MONO, align: 'left', weight: 800, shadow: false });
  ctx.restore();
}
// the pink name tag (KLAUS / DER KOPFGELDJÄGER)
function flNameTag(name, sub, x, y, k) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); const s = lerp(1.6, 1, clamp(k)); ctx.scale(s, s); ctx.globalAlpha *= clamp(k * 1.5);
  flText(name, 0, 0, 96, FL.pink, { stroke: 8, blur: 20 });
  const w = flMeasure(sub, 28, 800, FL_MONO) + 40; flRect(-w / 2, 22, w, 52, 6, 'rgba(10,10,18,0.85)'); ctx.lineWidth = 3; ctx.strokeStyle = FL.pink; ctx.beginPath(); ctx.roundRect(-w / 2, 22, w, 52, 6); ctx.stroke();
  flText(sub, 0, 58, 28, '#ffffff', { font: FL_MONO, weight: 800, shadow: false });
  ctx.restore();
}
// an ECG strip
function flECG(x, y, w, h, bpm, c, o = {}) {
  ctx.save(); flRect(x, y, w, h, 12, 'rgba(8,10,16,0.82)'); ctx.lineWidth = 3; ctx.strokeStyle = c; ctx.beginPath(); ctx.roundRect(x, y, w, h, 12); ctx.stroke();
  flText(o.label ?? 'PULS', x + 18, y + 34, 22, c, { font: FL_MONO, align: 'left', weight: 800, shadow: false });
  flText(String(bpm), x + w - 18, y + 34, 30, c, { font: FL_MONO, align: 'right', weight: 800, shadow: false });
  ctx.beginPath(); const per = 60 / Math.max(1, bpm), mid = y + h * 0.66;
  for (let i = 0; i <= 120; i++) { const u = i / 120, tt = TT - (1 - u) * 2.2, ph = mod(tt, per) / per; let v = 0; if (!o.flat) { if (ph > 0.1 && ph < 0.14) v = -0.3; else if (ph >= 0.14 && ph < 0.18) v = 1; else if (ph >= 0.18 && ph < 0.22) v = -0.45; else if (ph > 0.4 && ph < 0.5) v = 0.18 * Math.sin((ph - 0.4) / 0.1 * Math.PI); } const px = x + 20 + u * (w - 40), py = mid - v * h * 0.38; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.shadowColor = c; ctx.shadowBlur = 12; ctx.stroke(); ctx.restore();
}
// the breaking-news card (EILMELDUNG · NEWS 24)
function flNewsCard(x, y, k, stamp) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(lerp(0.7, 1, k), lerp(0.7, 1, k)); ctx.globalAlpha *= clamp(k * 1.4);
  flRect(-380, -260, 760, 520, 20, '#151a2c'); ctx.lineWidth = 6; ctx.strokeStyle = FL.red; ctx.beginPath(); ctx.roundRect(-380, -260, 760, 520, 20); ctx.stroke();
  flRect(-380, -260, 760, 70, [20, 20, 0, 0], FL.red); flText('EILMELDUNG · NEWS 24', -350, -212, 32, '#ffffff', { font: FL_MONO, align: 'left', weight: 800, shadow: false });
  flText('LETZTE FRAU TOT', 0, -120, 62, '#ffffff', {});
  flRect(-170, -80, 340, 300, 14, '#3a4058'); ctx.save(); ctx.beginPath(); ctx.roundRect(-170, -80, 340, 300, 14); ctx.clip(); ctx.filter = 'blur(6px)'; flGretaBust(0, 50, 80, { mood: 'neutral', blink: false }); ctx.restore();
  if (stamp > 0) { ctx.save(); ctx.translate(40, 80); ctx.rotate(-0.25); const s = lerp(2.4, 1, clamp(stamp)); ctx.scale(s, s); ctx.globalAlpha *= clamp(stamp * 2); ctx.lineWidth = 10; ctx.strokeStyle = FL.red; ctx.strokeRect(-150, -62, 300, 124); flText('TOT', 0, 38, 110, FL.red, { shadow: false }); ctx.restore(); }
  ctx.restore();
}
// a big number / word slammed into the centre
function flSlam(str, x, y, size, c, t0, o = {}) { if (TT < t0) return; const k = clamp((TT - t0) / 0.18), s = lerp(o.from ?? 2.2, 1, EZ.o3(k)); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= clamp(k * 2) * (o.a ?? 1); flText(str, 0, size * 0.36, size, c, { stroke: o.stroke ?? 0, blur: 28 }); ctx.restore(); }

// ---------------------------------------------------------------- KARAOKE SUBTITLES
// From VOICE: chunks of ≤ ~30 characters (two lines max), words grey until spoken, then white (or the keyword colour).
const FL_KWC = { red: FL.red, yellow: FL.yellow, blue: FL.blue, green: FL.green, pink: FL.pink, white: '#ffffff' };
let FL_CHUNKS = null;
function flBuildChunks() {
  FL_CHUNKS = [];
  const norm = (w) => w.toLowerCase().replace(/[^a-zäöüß0-9]/g, '');
  VOICE.lines.forEach((L, li) => {
    const kw = (typeof SUB_KW !== 'undefined' && SUB_KW[L.id]) || [];
    let cur = [];
    const flush = () => { if (cur.length) FL_CHUNKS.push({ line: li, words: cur, t0: cur[0].t0 }); cur = []; };
    L.words.forEach((w, i) => {
      const len = cur.reduce((a, x) => a + x.w.length + 1, 0);
      if (cur.length && len + w.w.length > 30) flush();
      const k = kw.find((q) => norm(q[0]) === norm(w.w));
      cur.push({ w: w.w.toUpperCase(), t0: w.t0, t1: w.t1, c: k ? FL_KWC[k[1]] : null });
      if (/[.?!:…“]$/.test(w.w) && i < L.words.length - 1 && cur.reduce((a, x) => a + x.w.length + 1, 0) > 14) flush();
    });
    flush();
  });
  FL_CHUNKS.forEach((c, i) => { const nx = FL_CHUNKS[i + 1]; const last = c.words[c.words.length - 1]; c.t1 = nx ? Math.min(nx.t0, last.t1 + 0.9) : last.t1 + 1.2; });
}
function flSubs() {
  if (typeof VOICE === 'undefined') return;
  if (!FL_CHUNKS) flBuildChunks();
  const t = TT, ch = FL_CHUNKS.find((c) => t >= c.t0 - 0.04 && t < c.t1);
  if (!ch) return;
  const size = 68, maxW = 860, lh = 80, y0 = 1288;
  // wrap into lines
  const lines = [[]]; let lw = 0; const sp = flMeasure(' ', size);
  for (const w of ch.words) { const ww = flMeasure(w.w, size); if (lines[lines.length - 1].length && lw + sp + ww > maxW) { lines.push([]); lw = 0; } lines[lines.length - 1].push({ ...w, ww }); lw += (lw ? sp : 0) + ww; }
  const pop = clamp((t - ch.t0) / 0.12);
  lines.forEach((L, i) => {
    const tw = L.reduce((a, w) => a + w.ww, 0) + sp * (L.length - 1); let x = W / 2 - tw / 2; const y = y0 + i * lh - (lines.length - 1) * lh * 0.5 + (1 - EZ.o3(pop)) * 18;
    for (const w of L) {
      const said = t >= w.t0 - 0.02, c = said ? (w.c || '#ffffff') : '#7f8492';
      const ks = w.c && said ? 1 + 0.14 * Math.max(0, 1 - (t - w.t0) / 0.18) * Math.sin(clamp((t - w.t0) / 0.18) * Math.PI) : 1;
      ctx.save(); ctx.translate(x + w.ww / 2, y - size * 0.34); ctx.scale(ks, ks);
      flText(w.w, 0, size * 0.34, size, c, { stroke: 7, strokeC: 'rgba(0,0,0,0.6)', blur: 14 });
      if (w.c && said) { ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.25; flText(w.w, 0, size * 0.34, size, c, { shadow: false, blur: 0 }); }
      ctx.restore();
      x += w.ww + sp;
    }
  });
}
