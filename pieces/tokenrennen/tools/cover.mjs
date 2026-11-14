// the cover: its own composition (not a frame of the film): Kevin sprinting with the cash case, a giant red 23:59, Jonas with popcorn
import { createRequire } from 'node:module'; import { execSync } from 'node:child_process'; import fs from 'node:fs'; import path from 'node:path';
const req = createRequire(import.meta.url); let pw; try { pw = req('playwright'); } catch { pw = req(execSync('npm root -g').toString().trim() + '/playwright'); }
const out = process.argv[2] || 'renders/tokenrennen-cover.png';
const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 2560 } });
await p.goto('file://' + path.resolve('index.html')); await p.waitForFunction(() => window.renderFrame);
const d = await p.evaluate(() => {
  SHOTS.length = 0;
  S(0, { tr: 'cut', lift: 0, raise: 0, noCap: true, noHud: true, cam: [[0, 540, 960, 1]],
    draw() { rays('#3a2a00', '#8a6400', { cy: 760, spin: 0.2 }); ctx.fillStyle = 'rgba(10,6,30,0.35)'; ctx.fillRect(-600, -400, 2300, 2800);
      pirateToken(540, 760, 190, { sx: 1, glow: 1 });
      lootChest(250, 1380, 0.55, { gold: 1, open: 0.3 }); lootChest(830, 1380, 0.55, { gold: 1, open: 0.3 });
      kv(250, 1880, 0.9, { pose: [[0, 'holdBoth']], emo: [[0, 'serious']], look: [0.5, -0.5] }); jn(830, 1880, 0.9, { pose: [[0, 'holdBoth']], emo: [[0, 'grin']], look: [-0.5, -0.5], extras: { headset: 1 } }); },
    ui() { tText('1 MILLION', 540, 320, 128, { color: '#41f08a', stroke: '#0b0912', strokeW: 22 }); tText('FÜR DEN TOKEN', 540, 460, 96, { color: '#ffffff', stroke: '#0b0912', strokeW: 18 });
      fact('KEVIN 4 vs JONAS 20', 0, 540, 1060, { size: 56, bg: '#ff2e4d', rot: -0.03 }); } });
  SHOTS[0].t1 = null; finalizeShots(); window.renderFrame(0.6); return document.getElementById('c').toDataURL('image/png'); });
fs.writeFileSync(out, Buffer.from(d.split(',')[1], 'base64')); console.log('wrote', out); await b.close();
