// the cover: its own composition (not a frame of the film): 100 €/STUNDE vs 1 CENT/SEKUNDE, Toni in shock with the calculator (36), Kevin smirking with a fan of 100 € bills
import { createRequire } from 'node:module'; import { execSync } from 'node:child_process'; import fs from 'node:fs'; import path from 'node:path';
const req = createRequire(import.meta.url); let pw; try { pw = req('playwright'); } catch { pw = req(execSync('npm root -g').toString().trim() + '/playwright'); }
const out = process.argv[2] || 'renders/stunde-cover.png';
const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 2560 } });
await p.goto('file://' + path.resolve('index.html')); await p.waitForFunction(() => window.renderFrame);
const d = await p.evaluate(() => {
  SHOTS.length = 0;
  S(0, { tr: 'cut', lift: 0, raise: 0, noCap: true, cam: [[0, 540, 960, 1]],
    draw() {
      rays('#2a0b45', '#45136a', { cy: 1050, spin: 0, n: 22 }); glow(540, 1050, 620, '#ff8a1e', 0.35);
      // Kevin peeks in from the right, smug, a fan of 100 € bills
      for (let i = 0; i < 5; i++) euro100(905 + (i - 2) * 34, 1090 - Math.abs(i - 2) * 8, 190, (i - 2) * 0.16);
      char('kevin', 900, 2080, 1.3, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], look: [-0.7, 0] });
      // Toni huge in the middle-left: shock, shades up, sweat
      char('toni', 400, 2190, 1.6, { pose: [[0, 'headGrab']], emo: [[0, 'shock']], extras: { chain: 1, shadesUp: 1, sweat: 1 }, look: [0.2, -0.2] });
      // the red result tag next to his face
      ctx.save(); ctx.translate(800, 760); ctx.rotate(0.08); fillRR(-170 + 10, -95 + 12, 340, 190, 30, 'rgba(0,0,0,0.45)'); fillRR(-170, -95, 340, 190, 30, '#ff2e4d');
      tText('NUR', 0, -48, 40, { color: '#ffd0d6', shadow: false, letter: 4 }); tText('36 €', 0, 22, 104, { color: '#ffffff', stroke: '#7a0012', strokeW: 10 }); ctx.restore();
      ctx.save(); ctx.translate(800, 890); ctx.rotate(0.08); tText('PRO STUNDE 😱', 0, 0, 40, { color: '#ffffff', stroke: '#0b0912', strokeW: 10 }); ctx.restore(); },
    ui() {
      ctx.save(); ctx.translate(540, 420); ctx.rotate(-0.04); tText('1 CENT', 0, 0, 200, { color: '#ff9a3c', stroke: '#0b0912', strokeW: 26 }); ctx.restore();
      ctx.save(); ctx.translate(540, 575); ctx.rotate(-0.04); tText('PRO SEKUNDE?', 0, 0, 104, { color: '#ffffff', stroke: '#0b0912', strokeW: 20 }); ctx.restore();
      fact('ODER 100 € PRO STUNDE?', 0, 540, 1600, { size: 66, bg: '#d9a520', fg: '#141026', rot: -0.03 }); } });
  SHOTS[0].t1 = null; finalizeShots(); window.renderFrame(0.6); return document.getElementById('c').toDataURL('image/png'); });
fs.writeFileSync(out, Buffer.from(d.split(',')[1], 'base64')); console.log('wrote', out); await b.close();
