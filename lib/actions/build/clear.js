
// rm all the '__build' directories generated by sbuild.

var fs = require('fs');
var path = require('path');

var util = require('../../util');
var CONFIG = require('../../config');


/**
 * Clear sbuild temporary files.
 * @param {string} basedir The basedir of sbuild working.
 */
exports.run = function(basedir) {
  console.log('Clearing ' + path.basename(basedir) + '...');
  clear(basedir);
  console.log('Clear successfully.');
};


function clear(basedir) {
  fs.readdirSync(basedir).forEach(function(file) {
    var p = path.join(basedir, file);
    if (file == CONFIG.DEFAULT_BUILD_DIR) {
      util.rmdirForce(p);
    }
    else if (file.indexOf('.') == -1) {
      if (fs.statSync(p).isDirectory()) {
        clear(p);
      }
    }
  });
}