// the cover: its own composition (not a frame of the film): Kevin sprinting with the cash case, a giant red 23:59, Jonas with popcorn
import { createRequire } from 'node:module'; import { execSync } from 'node:child_process'; import fs from 'node:fs'; import path from 'node:path';
const req = createRequire(import.meta.url); let pw; try { pw = req('playwright'); } catch { pw = req(execSync('npm root -g').toString().trim() + '/playwright'); }
const out = process.argv[2] || 'renders/million24-cover.png';
const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 2560 } });
await p.goto('file://' + path.resolve('index.html')); await p.waitForFunction(() => window.renderFrame);
const d = await p.evaluate(() => {
  SHOTS.length = 0;
  S(0, { tr: 'cut', lift: 0, raise: 0, noCap: true, noHud: true, cam: [[0, 540, 960, 1]],
    draw() { setNightStreet(); ctx.fillStyle = 'rgba(40,0,10,0.35)'; ctx.fillRect(-600, -400, 2300, 2800); ledBoard(540, 720, 1.2, 86340);
      speedLines(30, 0.35, 'cv'); jn(860, 1500, 0.62, { pose: [[0, 'holdR']], emo: [[0, 'smug']], holdL: () => popcorn(0, 60, 0.45) });
      kv(470, 1960, 1.12, { run: 1, emo: [[0, 'grin']], holdR: () => briefcase(0, 90, 0.38, 1) }); billRain('cv', -0.6, 30, { spread: 1.5 }); },
    ui() { tText('1 MIO. IN', 540, 250, 130, { color: '#ffffff', stroke: '#0b0912', strokeW: 24 }); tText('24 STUNDEN', 540, 400, 130, { color: '#ffe14d', stroke: '#0b0912', strokeW: 24 });
      fact('ALLES AUSGEBEN?! 💸', 0, 540, 935, { size: 64, bg: '#ff2e4d', rot: -0.05 }); } });
  SHOTS[0].t1 = null; finalizeShots(); window.renderFrame(0.6); return document.getElementById('c').toDataURL('image/png'); });
fs.writeFileSync(out, Buffer.from(d.split(',')[1], 'base64')); console.log('wrote', out); await b.close();
