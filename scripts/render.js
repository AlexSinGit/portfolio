/* =====================================================================
   Renders src/pug/index.pug + data/portfolio.js → dist/index.html.
   Data is baked in at build time: the resulting HTML is static and
   loads nothing at runtime.
   ===================================================================== */

const fs = require('fs');
const path = require('path');
const pug = require('pug');

const root = path.join(__dirname, '..');
const dataFile = path.join(root, 'data', 'portfolio.js');
const exampleFile = path.join(root, 'data', 'portfolio.example.js');

if (!fs.existsSync(dataFile)) {
  fs.copyFileSync(exampleFile, dataFile);
  console.log('data/portfolio.js not found — created from data/portfolio.example.js');
}

const data = require(dataFile);

if (!data || !Array.isArray(data.projects)) {
  console.error('Error: data/portfolio.js must export { settings, projects: [...] }');
  process.exit(1);
}

const html = pug.renderFile(path.join(root, 'src', 'pug', 'index.pug'), {
  pretty: true,
  settings: data.settings || {},
  projects: data.projects,
});

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist', 'index.html'), html);
console.log(`dist/index.html rendered (projects: ${data.projects.length})`);
