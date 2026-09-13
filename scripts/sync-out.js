const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'out');
const nextDir = path.join(rootDir, '.next');
const publicDir = path.join(rootDir, 'public');

// Ensure out/ directory exists
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Copy public directory to out/
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, outDir, { recursive: true });
  console.log('✓ Copied public assets to out/');
}

// 2. Copy .next/static to out/_next/static
const nextStaticDir = path.join(nextDir, 'static');
const outNextStaticDir = path.join(outDir, '_next', 'static');
if (fs.existsSync(nextStaticDir)) {
  fs.mkdirSync(path.dirname(outNextStaticDir), { recursive: true });
  fs.cpSync(nextStaticDir, outNextStaticDir, { recursive: true });
  console.log('✓ Copied .next/static to out/_next/static');
}

// 3. Generate clean, valid futuristic fallback HTML shell (NEVER copy Next.js 404 error page)
const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Bhargava Sri Ram - Portfolio</title>
  <link rel="icon" href="/favicon.ico" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #020617; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; overflow: hidden; height: 100vh; width: 100vw; }
    @keyframes fl-cw  { to { transform: rotate(360deg);  } }
    @keyframes fl-ccw { to { transform: rotate(-360deg); } }
    @keyframes fl-pr  { 0%,100%{ opacity:.5; transform:scale(.95); } 50%{ opacity:1; transform:scale(1.08); } }
    @keyframes fl-pd  { 0%,100%{ opacity:1; } 50%{ opacity:.3; } }
    @keyframes fl-scan { 0%{ top:-10%; } 100%{ top:110%; } }
    #fl-r1 { position:absolute; width:256px; height:256px; border-radius:50%; border:2px dashed rgba(16,185,129,.5); box-shadow:0 0 40px rgba(16,185,129,.3); animation:fl-cw 12s linear infinite; }
    #fl-r2 { position:absolute; width:208px; height:208px; border-radius:50%; border:2px dashed rgba(6,182,212,.6); box-shadow:0 0 30px rgba(6,182,212,.3); animation:fl-ccw 8s linear infinite; }
    #fl-r3 { position:absolute; width:160px; height:160px; border-radius:50%; border:1px solid rgba(52,211,153,.8); box-shadow:0 0 50px #10b981; animation:fl-pr 2.5s ease-in-out infinite; }
    #fl-scanline { position:absolute; left:0; right:0; height:3px; background:linear-gradient(to right,transparent,#10b981 30%,#22d3ee 70%,transparent); box-shadow:0 0 25px #10b981, 0 0 10px #22d3ee; animation:fl-scan 2.2s linear infinite; opacity:.85; pointer-events:none; }
    .fl-pulse-dot { animation:fl-pd 1s ease-in-out infinite; }
  </style>
</head>
<body>
  <div id="fl-root" style="position:fixed;inset:0;z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#020617;overflow:hidden;">
    <div style="position:absolute;inset:0;background-image:linear-gradient(to right,#10b98115 1px,transparent 1px),linear-gradient(to bottom,#10b98115 1px,transparent 1px);background-size:40px 40px"></div>
    <div style="position:absolute;width:500px;height:500px;background:radial-gradient(circle,rgba(16,185,129,.18) 0%,rgba(6,182,212,.12) 50%,transparent 80%);border-radius:50%;pointer-events:none"></div>
    <div id="fl-scanline"></div>
    <div style="position:relative;display:flex;align-items:center;justify-content:center;margin-bottom:40px;width:280px;height:280px">
      <div id="fl-r1"></div>
      <div id="fl-r2"></div>
      <div id="fl-r3"></div>
      <div style="position:relative;z-index:10;padding:16px;border-radius:24px;background:rgba(15,23,42,.9);border:1px solid rgba(16,185,129,.5);box-shadow:0 0 45px rgba(16,185,129,.4)">
        <img src="/logo.webp" alt="Bhargav Tech" width="80" height="80" style="border-radius:16px;display:block;" onerror="this.src='logo.webp'" />
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:12px;z-index:10">
      <div style="display:flex;align-items:baseline;gap:4px;font-family:monospace">
        <span id="fl-num" style="font-size:3rem;font-weight:900;letter-spacing:-.05em;background:linear-gradient(90deg,#fff 0%,#a7f3d0 50%,#67e8f9 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">00</span>
        <span style="font-size:1.25rem;font-weight:700;color:#34d399">%</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:4px 12px;border-radius:999px;background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.3);color:#6ee7b7;font-size:11px;font-family:monospace;letter-spacing:.12em;text-transform:uppercase">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fl-pulse-dot"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9c3.9 3.9 3.9 10.3 0 14.2"/></svg>
        <span id="fl-txt">CONNECTING TO BHARGAV TECH...</span>
      </div>
      <div style="width:260px;height:8px;background:#0f172a;border-radius:999px;overflow:hidden;border:1px solid rgba(16,185,129,.4);padding:2px">
        <div id="fl-bar" style="height:100%;border-radius:999px;background:linear-gradient(90deg,#10b981,#2dd4bf,#22d3ee);box-shadow:0 0 15px #10b981;width:0%;transition:width .15s ease"></div>
      </div>
      <div style="display:flex;align-items:center;gap:16px;font-size:10px;color:rgba(110,231,183,.6);font-family:monospace;text-transform:uppercase;letter-spacing:.1em;margin-top:8px">
        <span>⬡ BHARGAV TECH 4.0</span>
        <span>•</span>
        <span>✦ SECURE V1.0</span>
      </div>
    </div>
  </div>
  <script>
    (function() {
      var p = 0;
      var num = document.getElementById('fl-num');
      var bar = document.getElementById('fl-bar');
      var txt = document.getElementById('fl-txt');
      var iv = setInterval(function() {
        p += Math.floor(Math.random() * 6) + 4;
        if (p >= 100) p = 100;
        if (num) num.textContent = (p < 10 ? '0' : '') + p;
        if (bar) bar.style.width = p + '%';
        if (p < 30) { if (txt) txt.textContent = 'CONNECTING TO QUANTUM SERVER...'; }
        else if (p < 70) { if (txt) txt.textContent = 'ESTABLISHING NEURAL LINK...'; }
        else if (p < 100) { if (txt) txt.textContent = 'SYSTEM ALMOST READY...'; }
        else {
          clearInterval(iv);
          if (txt) txt.textContent = 'SYSTEM 100% READY';
        }
      }, 50);
    })();
  </script>
</body>
</html>`;

// 3. Copy full pre-rendered Next.js HTML pages into out/
const appServerDir = path.join(nextDir, 'server', 'app');
const appIndexHtml = path.join(appServerDir, 'index.html');
const appLoginHtml = path.join(appServerDir, 'login.html');
const appNotFoundHtml = path.join(appServerDir, '_not-found.html');

let mainHtmlContent = fallbackHtml;
if (fs.existsSync(appIndexHtml)) {
  mainHtmlContent = fs.readFileSync(appIndexHtml, 'utf8');
  console.log('✓ Found pre-rendered app/index.html (' + Math.round(mainHtmlContent.length / 1024) + ' KB)');
}

// Write base HTML files
fs.writeFileSync(path.join(outDir, 'index.html'), mainHtmlContent, 'utf8');
fs.writeFileSync(path.join(outDir, '200.html'), mainHtmlContent, 'utf8');

if (fs.existsSync(appNotFoundHtml)) {
  fs.copyFileSync(appNotFoundHtml, path.join(outDir, '404.html'));
} else {
  fs.writeFileSync(path.join(outDir, '404.html'), mainHtmlContent, 'utf8');
}

// Login route
const loginDir = path.join(outDir, 'login');
if (!fs.existsSync(loginDir)) fs.mkdirSync(loginDir, { recursive: true });
if (fs.existsSync(appLoginHtml)) {
  const loginContent = fs.readFileSync(appLoginHtml, 'utf8');
  fs.writeFileSync(path.join(loginDir, 'index.html'), loginContent, 'utf8');
  fs.writeFileSync(path.join(outDir, 'login.html'), loginContent, 'utf8');
} else {
  fs.writeFileSync(path.join(loginDir, 'index.html'), mainHtmlContent, 'utf8');
  fs.writeFileSync(path.join(outDir, 'login.html'), mainHtmlContent, 'utf8');
}

// Admin, client & subroutes
const routes = [
  'request-website',
  'admin',
  'admin/requests',
  'admin/projects',
  'admin/skills',
  'admin/services',
  'admin/experience',
  'admin/certificates',
  'admin/testimonials',
  'admin/messages',
  'admin/settings',
  'admin/freelance'
];

for (const route of routes) {
  const routeDir = path.join(outDir, route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  fs.writeFileSync(path.join(routeDir, 'index.html'), mainHtmlContent, 'utf8');
  fs.writeFileSync(path.join(outDir, `${route.replace(/\//g, '_')}.html`), mainHtmlContent, 'utf8');
}

console.log('✓ Successfully synced all pre-rendered Next.js pages to out/!');

// 4. Ensure _redirects exists in out/ for Netlify SPA routing
const redirectsPath = path.join(outDir, '_redirects');
fs.writeFileSync(redirectsPath, '/*   /index.html   200\n', 'utf8');
console.log('✓ Created out/_redirects for Netlify SPA route rewrites!');


