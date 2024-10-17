
import { glob, globSync } from 'node:fs';

glob('*', (err, files) => {
  console.log('Glob func is called');
  if (err) {
    console.log(err);
    return;
  }
  console.log(files);
  // [ 'getData.js', 'glob.js', 'index.js' ]
});


const files = globSync('*.js');
console.log(files);
// [ 'getData.js', 'glob.js', 'index.js', 'otherfile.md' ]