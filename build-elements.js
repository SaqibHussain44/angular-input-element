const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/input-element/runtime.js',
    './dist/input-element/polyfills.js',
    './dist/input-element/scripts.js',
    './dist/input-element/main.js'
  ];

  await fs.ensureDir('elements');
  await concat(files, 'elements/app-email-element.js');
})();