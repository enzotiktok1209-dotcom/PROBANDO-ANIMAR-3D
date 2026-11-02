// =====================================================================
//  NATIVE 1440p: the world stays 1080x1920 (every scene's coordinates), the output canvas is 1440x2560.
//  Every setTransform is premultiplied by K = 4/3 on hi-res canvases, and a hi-res canvas drawn at (x, y)
//  is drawn at its logical size, so the whole frame is rasterised at 1440p (sharp lines and text, no upscale).
// =====================================================================
const OUT_W = 1440, OUT_H = 2560;
(() => {
  const P = CanvasRenderingContext2D.prototype, st = P.setTransform, di = P.drawImage;
  P.setTransform = function (...a) { const k = this.canvas.__k || 1; return k !== 1 && a.length === 6 ? st.call(this, a[0] * k, a[1] * k, a[2] * k, a[3] * k, a[4] * k, a[5] * k) : st.apply(this, a); };
  P.drawImage = function (src, ...a) { return a.length === 2 && src && src.__k ? di.call(this, src, a[0], a[1], src.width / src.__k, src.height / src.__k) : di.call(this, src, ...a); };
  const c = document.getElementById('c'); c.width = OUT_W; c.height = OUT_H; c.__k = OUT_W / W;
  const L = document.createElement('canvas'); L.width = OUT_W; L.height = OUT_H; L.__k = OUT_W / W; LAYER[0] = L;
  const RF = window.renderFrame;
  window.renderFrame = (t, canvas, sub) => { const cv = canvas || document.getElementById('c'); cv.__k = cv.width / W; return RF(t, cv, sub); };
})();
TIMELINE.width = OUT_W; TIMELINE.height = OUT_H;
