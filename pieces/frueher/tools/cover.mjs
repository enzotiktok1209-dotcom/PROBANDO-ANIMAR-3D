// render one shot's frame without captions as a full-size PNG (the cover): node tools/cover.mjs <t> <shotIndex> <out.png>
import { createRequire } from 'node:module'; import { execSync } from 'node:child_process'; import fs from 'node:fs'; import path from 'node:path';
const req = createRequire(import.meta.url); let pw; try { pw = req('playwright'); } catch { pw = req(execSync('npm root -g').toString().trim() + '/playwright'); }
const [t, idx, out] = [Number(process.argv[2]), Number(process.argv[3]), process.argv[4]];
const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 2560 } });
await p.goto('file://' + path.resolve('index.html')); await p.waitForFunction(() => window.renderFrame);
const d = await p.evaluate(([t, i]) => { SHOTS[i].noCap = true; window.renderFrame(t); return document.getElementById('c').toDataURL('image/png'); }, [t, idx]);
fs.writeFileSync(out, Buffer.from(d.split(',')[1], 'base64')); console.log('wrote', out); await b.close();
