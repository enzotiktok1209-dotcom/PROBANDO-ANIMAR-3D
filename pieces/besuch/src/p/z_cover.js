// ---------- portadas (fuera del vídeo) ----------
// v0: Mia y yo de la mano sobre el hielo al atardecer (el reflejo solo de ella, sin destripar); texto en medio.
// v1: Opa riendo en la mesa con la familia sonriendo de más y el espejo tapado; texto en medio.
function coverTxt(l1, l2, y0 = .43) { const c = octx; c.save(); c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
  for (const [t, y, sz] of [[l1, H * y0, 112], [l2, H * (y0 + .068), 126]]) { c.font = `700 ${sz}px ${FONT}`; const tw = c.measureText(t).width, k = Math.min(1, W * .86 / tw); c.save(); c.translate(W / 2, y); c.scale(k, k);
    c.shadowColor = 'rgba(0,0,0,.55)'; c.shadowBlur = 22; c.shadowOffsetY = 8; c.lineWidth = sz * .24; c.strokeStyle = '#000'; c.strokeText(t, 0, 0); c.shadowColor = 'transparent'; c.fillStyle = '#E2FD07'; c.fillText(t, 0, 0); c.restore(); }
  c.restore(); }
window.renderCover = v => { const T = 3.1; hideAll(); BAD_.length = 0; BIRDSON = 0;
  if (v === 0) { pond(.3); SNOWF = .5; put(mia, TXX(2.2), .1, MZ, PI - .15); put(ich, TXX(5.2), .1, MZ, PI + .15); applyPose(mia, { ...handR, aRx: .5, aRz: .6, headY: -.3 }); applyPose(ich, { ...handL, aLx: .5, aLz: .6, headY: .3 });
    cara(mia, T, { expr: 'sad', eyes: 'normal', mouth: 'frown', noBlink: 1 }); tears(mia, T); cara(ich, T, { expr: 'happy', eyes: 'normal', mouth: 'smile', noBlink: 1 });
    cam([TXX(3.7), 3.0, MZ - 15], [TXX(3.7), 4.6, MZ], 46); sh(V(TXX(4), 0, MZ), 20); AIR.update(T, camera.position.clone().add(V(0, 0, 10)), 'nieve', .5); }
  else { stubeOn(); visitor(opa); const o = put(opa, SX(-1), 0, -7.6, 0); applyPose(o, { lean: -.1, headX: -.15, aLx: .5, aLz: .5, aRx: .5, aRz: .5 }); cara(o, T, { eyes: 'happy', mouth: 'laugh', noBlink: 1 });
    show(PANC, SX(-1), 3.1, -4, 0, .55); [[mama, -4.2, -6.2, .4], [papa, 2.2, -6.2, -.4], [KD[0], -2.9, -.2, .3], [KD[1], .9, -.2, -.3]].forEach(([c, x, z, r], i) => { put(c, SX(x), 0, z, r); applyPose(c, i < 2 ? { aLx: .3, aRx: .3 } : GEST.cheer); grin(c, T, { noBlink: 1 }); }); sweat(papa, T, 2);
    cam([SX(-1), 6.2, 11], [SX(-1), 4.2, -5], 52); }
  grade.uniforms.sharp.value = 1.5; grade.uniforms.vig.value = .6; grade.uniforms.sat.value = 1.55; grade.uniforms.blurAmt.value = 0; grade.uniforms.flash.value = 0; grade.uniforms.sepia.value = 0; camera.updateProjectionMatrix();
  sky.sky.position.copy(camera.position); composer.render(); octx.fillStyle = '#000'; octx.fillRect(0, 0, W, H); octx.drawImage(renderer.domElement, 0, 0, W, H);
  if (v === 0) coverTxt('JEDER TOTE BEKOMMT', 'EINEN TAG MEHR', .3); else coverTxt('SAG IHNEN NIE,', 'DASS SIE TOT SIND', .5); };
