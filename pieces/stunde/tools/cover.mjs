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
      ctx.save(); ctx.beginPath(); ctx.moveTo(-600, -400); ctx.lineTo(1700, -400); ctx.lineTo(1700, 700); ctx.lineTo(-600, 1500); ctx.closePath(); ctx.clip(); rays('#6a1030', '#a3264a', { cy: 700, cx: 760, spin: 0 }); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.moveTo(-600, 1500); ctx.lineTo(1700, 700); ctx.lineTo(1700, 2400); ctx.lineTo(-600, 2400); ctx.closePath(); ctx.clip(); rays('#1f0a40', '#4a1370', { cy: 1300, cx: 300, spin: 0 }); ctx.restore();
      line(-600, 1500, 1700, 700, 14, '#ffe14d'); glow(540, 1100, 700, '#ffe14d', 0.18);
      for (let i = 0; i < 7; i++) euro100(830 + (i - 3) * 40, 1060 - Math.abs(i - 3) * 8, 170, (i - 3) * 0.15);
      char('kevin', 820, 1880, 0.92, { pose: [[0, 'armsCross']], emo: [[0, 'smug']], look: [-0.6, 0] });
      for (let i = 0; i < 9; i++) { const R = RNG('cv', i); copperCent(80 + R.f() * 920, 760 + R.f() * 260, 24 + R.f() * 14, { sx: 0.8 }); }
      char('toni', 330, 1950, 1.08, { pose: [[0, 'holdBoth']], emo: [[0, 'shock']], extras: { chain: 1, shadesUp: 1, sweat: 1 }, look: [0.4, 0.3] });
      calc2(560, 1280, 0.62, '36');
      ctx.save(); ctx.translate(560, 1000); ctx.rotate(-0.1); tText('?!', 0, 0, 120, { color: '#ff2e4d', stroke: '#0b0912', strokeW: 18 }); ctx.restore(); },
    ui() {
      ctx.save(); ctx.translate(540, 360); ctx.rotate(-0.04); fillRR(-500, -100, 1000, 200, 30, '#141026'); tText('100 € / STUNDE', 0, 4, 116, { color: '#ffd23f', stroke: '#5a3a00', strokeW: 8, maxW: 940 }); ctx.restore();
      ctx.save(); ctx.translate(540, 512); circ(0, 0, 70, '#ffffff'); tText('VS', 0, 4, 64, { color: '#141026', shadow: false }); ctx.restore();
      ctx.save(); ctx.translate(540, 660); ctx.rotate(0.03); fillRR(-500, -100, 1000, 200, 30, '#e8641e'); tText('1 CENT / SEKUNDE', 0, 4, 104, { color: '#ffffff', stroke: '#7a2a00', strokeW: 8, maxW: 940 }); ctx.restore();
      fact('WER HAT NACH 24 H MEHR? 🤔', 0, 540, 1590, { size: 58, bg: '#ff2e4d', rot: -0.03 }); } });
  SHOTS[0].t1 = null; finalizeShots(); window.renderFrame(0.6); return document.getElementById('c').toDataURL('image/png'); });
fs.writeFileSync(out, Buffer.from(d.split(',')[1], 'base64')); console.log('wrote', out); await b.close();
