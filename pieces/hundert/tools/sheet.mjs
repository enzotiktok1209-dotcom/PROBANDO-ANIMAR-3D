// render frames at given times (or each shot's middle) into review/s_<t>.png, report JS errors
import { createRequire } from 'node:module'; import { execSync } from 'node:child_process'; const req = createRequire(import.meta.url); let pw; try { pw = req('playwright'); } catch { pw = req(execSync('npm root -g').toString().trim() + '/playwright'); } const { chromium } = pw;
import path from 'node:path';
const times = process.argv.slice(2).map(Number);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 2560 } });
const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
await p.goto('file://' + path.resolve('index.html')); await p.waitForFunction(() => window.renderFrame);
let T = times.length ? times : await p.evaluate(() => TIMELINE.shots.map((s) => +(s.t0 + Math.min(0.9, (s.t1 - s.t0) * 0.6)).toFixed(2)));
for (const t of T) {
  let d; try { d = await p.evaluate((t) => { window.renderFrame(t); return document.getElementById('c').toDataURL('image/jpeg', 0.8); }, t); } catch (e) { errs.push(t + ': ' + e.message.split('\n')[0]); continue; }
  (await import('node:fs')).writeFileSync(`review6/s_${t.toFixed(2).padStart(6, '0')}.jpg`, Buffer.from(d.split(',')[1], 'base64'));
}
console.log(T.length, 'frames; errors:', errs.slice(0, 10));
await b.close();
