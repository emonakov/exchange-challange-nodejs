let yaml = require('js-yaml');
let fs   = require('fs');
let doc = yaml.safeLoad(fs.readFileSync(__dirname + '/config.yml', 'utf8'));
module.exports = doc;