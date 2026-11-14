// the cover: its own composition (not a frame of the film): Kevin sprinting with the cash case, a giant red 23:59, Jonas with popcorn
import { createRequire } from 'node:module'; import { execSync } from 'node:child_process'; import fs from 'node:fs'; import path from 'node:path';
const req = createRequire(import.meta.url); let pw; try { pw = req('playwright'); } catch { pw = req(execSync('npm root -g').toString().trim() + '/playwright'); }
const out = process.argv[2] || 'renders/million24-cover.png';
const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 2560 } });
await p.goto('file://' + path.resolve('index.html')); await p.waitForFunction(() => window.renderFrame);
const d = await p.evaluate(() => {
  SHOTS.length = 0;
  S(0, { tr: 'cut', lift: 0, raise: 0, noCap: true, noHud: true, cam: [[0, 540, 960, 1]],
    draw() { setNightStreet(); ctx.fillStyle = 'rgba(40,0,10,0.35)'; ctx.fillRect(-600, -400, 2300, 2800); ledBoard(540, 690, 0.95, 86340);
      speedLines(30, 0.3, 'cv'); glow(540, 1300, 700, '#ffd27a', 0.18);
      jn(800, 1690, 0.92, { pose: [[0, 'holdR']], emo: [[0, 'smug']], look: [-0.4, -0.1], flip: 1, holdL: () => popcorn(0, 60, 0.45) });
      kv(300, 1700, 1.0, { pose: [[0, 'cheer']], emo: [[0, 'laugh']], look: [0.3, -0.2] }); glow(560, 1380, 260, '#a6f0b4', 0.45); briefcase(560, 1470, 0.5, 1); billRain('cv', -0.6, 26, { spread: 1.5 }); },
    // everything inside the centre 3:4 (layout y 240..1680): TikTok crops the cover to 3:4 in the profile grid
    ui() { tText('1 MIO. IN', 540, 345, 118, { color: '#ffffff', stroke: '#0b0912', strokeW: 22 }); tText('24 STUNDEN', 540, 480, 118, { color: '#ffe14d', stroke: '#0b0912', strokeW: 22 });
      fact('ALLES AUSGEBEN?! 💸', 0, 540, 1560, { size: 62, bg: '#ff2e4d', rot: -0.04 }); } });
  SHOTS[0].t1 = null; finalizeShots(); window.renderFrame(0.6); return document.getElementById('c').toDataURL('image/png'); });
fs.writeFileSync(out, Buffer.from(d.split(',')[1], 'base64')); console.log('wrote', out); await b.close();
