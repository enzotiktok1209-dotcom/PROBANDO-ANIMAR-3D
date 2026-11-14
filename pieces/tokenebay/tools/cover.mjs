// the cover: its own composition (not a frame of the film): Kevin sprinting with the cash case, a giant red 23:59, Jonas with popcorn
import { createRequire } from 'node:module'; import { execSync } from 'node:child_process'; import fs from 'node:fs'; import path from 'node:path';
const req = createRequire(import.meta.url); let pw; try { pw = req('playwright'); } catch { pw = req(execSync('npm root -g').toString().trim() + '/playwright'); }
const out = process.argv[2] || 'renders/tokenebay-cover.png';
const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 2560 } });
await p.goto('file://' + path.resolve('index.html')); await p.waitForFunction(() => window.renderFrame);
const d = await p.evaluate(() => {
  SHOTS.length = 0;
  S(0, { tr: 'cut', lift: 0, raise: 0, noCap: true, noHud: true, cam: [[0, 540, 960, 1]],
    draw() { pirateCove({ blur: 4 }); ctx.fillStyle = 'rgba(10,6,30,0.45)'; ctx.fillRect(-600, -400, 2300, 2800);
      for (let i = 0; i < 9; i++) { const R = RNG('cvc', i); lootChest(700 + R.n(260), 1600 - (i % 3) * 70, 0.3, { open: 0 }); } lootChest(820, 1500, 0.42, { gold: 1 });
      pirateToken(540, 720, 150, { sx: 1 });
      jn(270, 1840, 0.9, { pose: [[0, 'phoneR']], emo: [[0, 'grin']], look: [0.4, -0.2], holdR: () => phone(0, -30, 0.42, 0.15, () => listingScreen('10.000 €')) });
      kv(770, 1850, 0.85, { pose: [[0, 'cheer']], emo: [[0, 'laugh']] }); },
    // all inside the centre 3:4 (layout y 240..1680)
    ui() { tText('KAUFEN', 540, 330, 120, { color: '#ffffff', stroke: '#0b0912', strokeW: 22 }); tText('ODER SUCHEN?', 540, 470, 104, { color: '#ffe14d', stroke: '#0b0912', strokeW: 20 });
      fact('10.000 €', 0, 250, 930, { size: 62, bg: '#18a34a', rot: -0.06 }); fact('1 : 137.500', 0, 820, 930, { size: 62, bg: '#ff2e4d', rot: 0.06 }); } });
  SHOTS[0].t1 = null; finalizeShots(); window.renderFrame(0.6); return document.getElementById('c').toDataURL('image/png'); });
fs.writeFileSync(out, Buffer.from(d.split(',')[1], 'base64')); console.log('wrote', out); await b.close();
