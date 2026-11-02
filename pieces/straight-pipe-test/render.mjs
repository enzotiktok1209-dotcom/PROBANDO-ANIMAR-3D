import http from 'http'; import fs from 'fs'; import path from 'path'; import pw from '/opt/node-tools/node_modules/playwright/index.js'; const {chromium}=pw;
const root=process.cwd(); const types={'.html':'text/html','.js':'text/javascript','.ttf':'font/ttf'};
const srv=http.createServer((q,r)=>{const p=path.join(root,decodeURIComponent(q.url.split('?')[0]));fs.readFile(p,(e,d)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':types[path.extname(p)]||'application/octet-stream'});r.end(d)})}).listen(8765);
const times=process.argv[2]==='all'?[...Array(150)].map((_,i)=>i/30):process.argv[2].split(',').map(Number);
const out=process.argv[3]||'frames'; fs.mkdirSync(out,{recursive:true});
const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('console',m=>console.log('PAGE',m.text())); p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8765/index.html'); await p.waitForFunction('window.READY===true',null,{timeout:60000});
const t0=Date.now();
for(let i=0;i<times.length;i++){await p.evaluate(t=>window.renderFrame(t),times[i]);await p.screenshot({path:`${out}/f${String(i).padStart(4,'0')}.png`});}
console.log('frames',times.length,'ms/frame',(Date.now()-t0)/times.length|0);
await b.close(); srv.close();
