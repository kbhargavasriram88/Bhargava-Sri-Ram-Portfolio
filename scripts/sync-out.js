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

// 3. Find 404.html or page.html with #fl-root and write to out/index.html, out/200.html, out/404.html
const htmlPath = path.join(nextDir, 'server', 'pages', '404.html');
if (fs.existsSync(htmlPath)) {
  const content = fs.readFileSync(htmlPath, 'utf8');
  fs.writeFileSync(path.join(outDir, 'index.html'), content, 'utf8');
  fs.writeFileSync(path.join(outDir, '200.html'), content, 'utf8');
  fs.writeFileSync(path.join(outDir, '404.html'), content, 'utf8');
  console.log('✓ Generated out/index.html, out/200.html, and out/404.html with #fl-root splash loader!');
} else {
  console.warn('⚠️ 404.html not found in .next/server/pages');
}

// 4. Ensure _redirects exists in out/ for Netlify SPA routing
const redirectsPath = path.join(outDir, '_redirects');
fs.writeFileSync(redirectsPath, '/*   /index.html   200\n', 'utf8');
console.log('✓ Created out/_redirects for Netlify SPA route rewrites!');
