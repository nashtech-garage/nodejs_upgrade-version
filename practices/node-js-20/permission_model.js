const allow_write = process.permission.has('fs.write');
const allow_write_protected = process.permission.has('fs.write', '/home/nodejs/protected-folder');
const allow_write_tmp = process.permission.has('fs.write', '/tmp');
const allow_read_tmp = process.permission.has('fs.read', '/tmp');

console.log('Allow write all: ', allow_write, 
'\nAllow write protected folder:', allow_write_protected,
'\nAllow read tmp folder:', allow_read_tmp,
'\nAllow write tmp folder:', allow_write_protected);
