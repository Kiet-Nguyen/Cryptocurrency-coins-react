
const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '/assets/icons')).filter(x => x.includes('svg'));
const ex = `{\n${files.map(x => `'${x.split('.svg')[0]}': require('./${x}'),`).join('\n')}}`;
const res = `export default ${ex}`;
fs.writeFileSync(path.join(__dirname, '/assets/icons/index.js'), res);
