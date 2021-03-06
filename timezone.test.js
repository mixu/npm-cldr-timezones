var fs = require('fs'),
    assert = require('assert'),
    cldr = require('./index.js');

exports['it loads timezones'] = function() {
  var names = fs.readdirSync('./lib/');
  names.forEach(function(filename) {
    var locale = filename.match(/(.*)\.js/)[1];
    assert.deepEqual(cldr.load(locale), require('./lib/' + filename));
  });
};

exports['it get frienly locale'] = function() {
  var names = ["ja", "es-MX", "en-Dsrt-US"];
  names.forEach(function(locale) {
    var friendly_locale = locale.replace(/-/g, "_");
    var timezones_hash = cldr.load(locale);
    assert.deepEqual(cldr.load(locale), require('./lib/' + friendly_locale + '.js'));
  });
};


// if this module is the script being run, then run the tests:
if (module == require.main) {
  var mocha = require('child_process').spawn('./node_modules/.bin/mocha', [ '--colors', '--ui', 'exports', '--reporter', 'spec', __filename ]);
  mocha.stdout.pipe(process.stdout);
  mocha.stderr.pipe(process.stderr);
}
