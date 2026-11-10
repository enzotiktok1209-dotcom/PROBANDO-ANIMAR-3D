// =====================================================================
//  styles/flat-noite/ui.js — subtitles (karaoke, keyword colour), HUD (chapter pill, HOMENS: 1), tags,
//  post (saturation, vignette, grain, flashes) and the STYLE hooks.
// =====================================================================
const SUB_Y = 1300, SUB_SIZE = 86;
const SUB_COL = { y: FN.yellow, r: FN.red, g: '#33d16a', b: FN.blueL, p: FN.pink, w: '#ffffff' };
// subtitles from TIMELINE.subs = [{ t0, t1, lines: [[{ w, t0, c }...], ...] }]
function fnSubtitles() {
  const S = (TIMELINE.subs || []).find((s) => TT >= s.t0 - 1e-6 && TT < s.t1 - 1e-6); if (!S) return;
  const k = clamp((TT - S.t0) / 0.12); let sc = 0.82 + 0.18 * EZ.back(k);
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.font = `900 ${SUB_SIZE}px ${FONT_SUB}`; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
  const LH = SUB_SIZE * 1.02, y0 = SUB_Y - (S.lines.length - 1) * LH / 2;
  const maxW = Math.max(...S.lines.map((line) => line.reduce((a, t) => a + ctx.measureText(t.w + ' ').width, 0))); const fit = Math.min(1, 940 / maxW);
  sc *= fit;
  S.lines.forEach((line, li) => {
    const sp = ctx.measureText(' ').width * 0.85, ws = line.map((t) => ctx.measureText(t.w).width), tot = ws.reduce((a, b) => a + b, 0) + sp * (line.length - 1);
    let x = W / 2 - tot / 2 * sc; const y = y0 + li * LH;
    line.forEach((t, i) => {
      const on = TT >= t.t0 - 0.02, pk = clamp((TT - t.t0) / 0.1), ws1 = ws[i] * sc;
      ctx.save(); ctx.translate(x + ws1 / 2, y); const s2 = sc * (on ? 1 + 0.1 * Math.sin(pk * Math.PI) : 1); ctx.scale(s2, s2);
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillText(t.w, 0, 7);
      ctx.lineWidth = 11; ctx.strokeStyle = FN.navy0; ctx.strokeText(t.w, 0, 0);
      ctx.fillStyle = on ? (SUB_COL[t.c] || '#ffffff') : '#9aa0c0'; ctx.fillText(t.w, 0, 0);
      ctx.restore();
      x += ws1 + sp * sc;
    });
  });
  ctx.restore();
}
// chapter pill (top centre) + men counter (top left)
function fnHUD(label, o = {}) {
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.font = `800 30px ${FONT_MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const w = ctx.measureText(label).width + 56, x = W / 2 - w / 2, y = 112;
  fnRR(x, y, w, 58, 8, 'rgba(11,15,36,0.82)'); ctx.lineWidth = 2.5; ctx.strokeStyle = FN.win; ctx.beginPath(); ctx.roundRect(x, y, w, 58, 8); ctx.stroke();
  ctx.fillStyle = FN.win; ctx.fillText(label, W / 2, y + 30);
  if (o.men !== false) {
    const blink = 0.75 + 0.25 * (mod(TT, 4) < 0.15 ? 0 : 1);
    ctx.font = `700 22px ${FONT_MONO}`; const cw = Math.max(300, ctx.measureText(o.counter || 'HOMENS: 1').width + 34); fnRR(36, 196, cw, 40, 6, 'rgba(11,15,36,0.75)'); ctx.lineWidth = 2; ctx.strokeStyle = FN.blue; ctx.beginPath(); ctx.roundRect(36, 196, cw, 40, 6); ctx.stroke();
    ctx.textAlign = 'left'; ctx.font = `700 22px ${FONT_MONO}`; ctx.fillStyle = `rgba(160,200,255,${blink})`; ctx.fillText(o.counter || 'HOMENS: 1', 52, 217);
  }
  if (o.extra) o.extra.forEach(([txt, col], i) => { const yy = 246 + i * 44; fnRR(36, yy, 300, 38, 6, 'rgba(11,15,36,0.75)'); ctx.lineWidth = 2; ctx.strokeStyle = col; ctx.beginPath(); ctx.roundRect(36, yy, 300, 38, 6); ctx.stroke(); ctx.font = `700 21px ${FONT_MONO}`; ctx.fillStyle = col; ctx.fillText(txt, 52, yy + 20); });
  ctx.restore();
}
// alert pill (red) popping in at t, drawn in screen space at (x, y)
function fnTag(txt, x, y, t, col = FN.red, size = 34, txtCol = '#ffffff') {
  const k = fnPop(t); if (k <= 0) return;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(x, y); ctx.scale(k, k);
  ctx.font = `800 ${size}px ${FONT_MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const w = ctx.measureText(txt).width + size * 1.3, h = size * 1.7;
  fnGlow(0, 0, w * 0.7, col, 0.25);
  fnRR(-w / 2, -h / 2, w, h, h / 2, col); ctx.fillStyle = txtCol; ctx.fillText(txt, 0, 2);
  ctx.restore();
}
// a speech bubble in world space
function fnBubble(txt, x, y, t, o = {}) {
  const k = fnPop(t, 0.22); if (k <= 0) return;
  const sh = o.shake ? fnShake(t, 10, 0.5, txt) : [0, 0];
  ctx.save(); ctx.translate(x + sh[0], y + sh[1]); ctx.scale(k, k);
  ctx.font = `900 ${o.size || 54}px ${FONT_SUB}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const lines = txt.split('\n'), w = Math.max(...lines.map((l) => ctx.measureText(l).width)) + 70, h = lines.length * (o.size || 54) * 1.15 + 44;
  fnRR(-w / 2, -h / 2, w, h, 26, o.bg || '#ffffff'); fnPoly([[-24, h / 2 - 2], [24, h / 2 - 2], [(o.tail || 0) * 40 - 6, h / 2 + 40]], o.bg || '#ffffff');
  ctx.fillStyle = o.fg || FN.navy0; lines.forEach((l, i) => ctx.fillText(l, 0, -h / 2 + 22 + (i + 0.55) * (o.size || 54) * 1.15));
  ctx.restore();
}
// mono label in world space
function fnMono(txt, x, y, size, col, align = 'center') { ctx.save(); ctx.font = `800 ${size}px ${FONT_MONO}`; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillStyle = col; ctx.fillText(txt, x, y); ctx.restore(); }
function fnBold(txt, x, y, size, col, align = 'center', stroke = 0) { ctx.save(); ctx.font = `900 ${size}px ${FONT_SUB}`; ctx.textAlign = align; ctx.textBaseline = 'middle'; if (stroke) { ctx.lineJoin = 'round'; ctx.lineWidth = stroke; ctx.strokeStyle = FN.navy0; ctx.strokeText(txt, x, y); } ctx.fillStyle = col; ctx.fillText(txt, x, y); ctx.restore(); }

// ---------- post: saturation, vignette (stronger in tension), grain, flashes
let FN_GRAIN = null;
function fnGrainTile() {
  if (FN_GRAIN) return FN_GRAIN;
  const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), im = g.createImageData(256, 256), R = RNG('grain');
  for (let i = 0; i < im.data.length; i += 4) { const v = R.f() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; }
  g.putImageData(im, 0, 0); FN_GRAIN = c; return c;
}
function fnPost() {
  const cv = ctx.canvas, tmp = layer(1);
  const tc = tmp.getContext('2d'); tc.setTransform(1, 0, 0, 1, 0, 0); tc.filter = 'saturate(1.22) contrast(1.06)'; tc.drawImage(cv, 0, 0); tc.filter = 'none';
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'copy'; ctx.drawImage(tmp, 0, 0); ctx.globalCompositeOperation = 'source-over';
  ctx.save(); ctx.globalCompositeOperation = 'soft-light'; const gr = ctx.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, 'rgba(255,170,90,0.35)'); gr.addColorStop(0.55, 'rgba(128,128,128,0)'); gr.addColorStop(1, 'rgba(20,40,110,0.55)'); ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H); ctx.restore();
  const vig = typeof pieceVignette === 'function' ? pieceVignette(TT) : 0.35;
  const g = ctx.createRadialGradient(W / 2, H * 0.42, H * (0.42 - vig * 0.2), W / 2, H * 0.45, H * 0.78);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,8,${clamp(0.35 + vig * 0.6, 0, 0.95)})`);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalAlpha = 0.06; ctx.globalCompositeOperation = 'overlay'; const gt = fnGrainTile(), ox = (F * 73) % 256, oy = (F * 151) % 256;
  ctx.translate(-ox, -oy); ctx.fillStyle = ctx.createPattern(gt, 'repeat'); ctx.fillRect(0, 0, W + 256, H + 256); ctx.restore();
  if (typeof pieceOverlay === 'function') pieceOverlay(TT);
  if (typeof pieceHUD === 'function') pieceHUD(TT);
  fnSubtitles();
}
const STYLE = {
  name: 'flat-noite', paper: '#0b0f24', ones: true,
  backdrop(c) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = c; ctx.fillRect(0, 0, W, H); ctx.restore(); },
  window(P, key, src) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); fnPath(P); ctx.clip(); ctx.drawImage(src, 0, 0); ctx.restore(); },
  blob(P, c) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); fnPoly(P, c); ctx.restore(); },
  hero(x, y, r) { fnCirc(x, y, r, FN.skin); }, heroColor: '#a8683f',
  post() { fnPost(); },
};
