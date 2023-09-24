const fse = require('fs-extra');
const path = require('path');
const topDir = __dirname;
fse.emptyDirSync(path.join(topDir, 'public', 'tinymce'));
fse.copySync(
  path.join(topDir, 'node_modules', 'tinymce'),
  path.join(topDir, 'public', 'tinymce'),
  { overwrite: true }
);

fse.emptyDirSync(path.join(topDir, 'public', 'assets'));
fse.copySync(
  path.join(topDir, 'assets'),
  path.join(topDir, 'public', 'assets'),
  { overwrite: true }
);
