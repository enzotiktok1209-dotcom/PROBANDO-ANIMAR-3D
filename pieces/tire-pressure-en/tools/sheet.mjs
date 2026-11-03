// contact sheet: one frame at each time (default: the middle of every shot), tiled, with the time burnt in
import { createRequire } from 'node:module'; import fs from 'node:fs'; import path from 'node:path'; import { execSync } from 'node:child_process';
const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const [dir, out, list, cols = '6'] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
await p.goto('file://' + path.resolve(dir, 'index.html') + '?export=1'); await p.waitForFunction(() => window.TIMELINE);
const times = list && list !== 'mid' ? list.split(',').map(Number) : await p.evaluate(() => TIMELINE.shots.map((s) => +(s.t0 + (s.t1 - s.t0) * 0.6).toFixed(2)));
const tmp = fs.mkdtempSync('/tmp/sheet-'); let i = 0; const t0 = Date.now();
for (const t of times) {
  const d = await p.evaluate((t) => { renderFrame(t); return document.getElementById('c').toDataURL('image/png'); }, t);
  fs.writeFileSync(`${tmp}/f${String(i++).padStart(3, '0')}.png`, Buffer.from(d.split(',')[1], 'base64'));
}
console.log(`${times.length} frames, ${((Date.now() - t0) / times.length).toFixed(0)} ms/frame`, errs.slice(0, 5));
const c = +cols, r = Math.ceil(times.length / c);
execSync(`ffmpeg -v error -y -framerate 1 -i ${tmp}/f%03d.png -vf "scale=270:-1,drawtext=text='%{n}':x=6:y=6:fontsize=22:fontcolor=yellow,tile=${c}x${r}" -frames:v 1 ${out}`);
await b.close();
