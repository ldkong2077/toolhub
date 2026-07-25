import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const outDir = join(process.cwd(), 'out');

function fixFile(filePath) {
  let content = readFileSync(filePath, 'utf-8');
  const original = content;

  content = content.replace(/href="\/favicon\.ico[^"]*"/g, 'href="./favicon.ico"');
  content = content.replace(/href="\/_next\//g, 'href="./_next/');
  content = content.replace(/src="\/_next\//g, 'src="./_next/');
  content = content.replace(/"\/_next\//g, '"./_next/');
  content = content.replace(/"\/favicon\.ico[^"]*"/g, '"./favicon.ico"');
  content = content.replace(/"href":"\/"/g, '"href":"./"');
  content = content.replace(/ href="\/"/g, ' href="./"');
  content = content.replace(/window\.location\.href="\/"/g, 'window.location.href="./"');

  if (content !== original) {
    writeFileSync(filePath, content, 'utf-8');
    console.log('  Fixed: ' + filePath);
  }
}

// Inject a polyfill into index.html that overrides document.currentScript.src
// for all scripts when opened via file:// protocol, so Next.js runtime
// invariant (expects '/_next/' in script src) passes correctly.
function injectPolyfill() {
  const htmlPath = join(outDir, 'index.html');
  let content = readFileSync(htmlPath, 'utf-8');

  if (content.includes('toolhub-file-polyfill')) {
    console.log('  Polyfill already injected');
    return;
  }

  const polyfill = `<script id="toolhub-file-polyfill">(function(){if(location.protocol!=="file:")return;var o=Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype,"src");Object.defineProperty(HTMLScriptElement.prototype,"src",{get:function(){var v=o.get.call(this);if(v&&v.indexOf("file://")===0){var i=v.indexOf("/_next/");if(i!==-1)return v.substring(i)}return v},configurable:true})})();</script>`;

  // Inject right before the first <script> tag
  content = content.replace(/<script/, polyfill + '<script');

  writeFileSync(htmlPath, content, 'utf-8');
  console.log('  Injected polyfill into index.html');

  // Also inject into 404.html
  const notFoundPath = join(outDir, '404.html');
  if (existsSync(notFoundPath)) {
    let nf = readFileSync(notFoundPath, 'utf-8');
    if (!nf.includes('toolhub-file-polyfill')) {
      nf = nf.replace(/<script/, polyfill + '<script');
      writeFileSync(notFoundPath, nf, 'utf-8');
      console.log('  Injected polyfill into 404.html');
    }
  }
}

function processDir(dir, handler) {
  if (!existsSync(dir)) return;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath, handler);
    } else if (entry.name.endsWith('.html') || entry.name.endsWith('.js')) {
      handler(fullPath);
    }
  }
}

console.log('Fixing paths for file:// protocol compatibility...');
processDir(outDir, fixFile);

console.log('Injecting file:// polyfill...');
injectPolyfill();

console.log('Done! The out/ directory can now be opened via file:// protocol.');
