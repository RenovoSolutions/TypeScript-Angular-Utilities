/* global require: false, exports: false */

var replace = require('gulp-replace');
var _ = require('lodash');

var references = require('./../libReferences.json');

exports.config = function (gulp) {
	gulp.task('resolve', ['resolve.debug']);

	gulp.task('resolve.debug', function() {
		return resolve('debug');
	});

    gulp.task('resolve.release', function() {
	    return resolve('release');
    });
    
    function resolve (target) {
    	var index = target + '/index.html';
    	var scripts = buildScripts(exports.getBowerReferences());
        
        // Find <!-- build:js scripts/vendor --> ... <!-- endbuild -->
        // Replace internal block <!-- bower:js --> ... <!-- endbower --> with the script tags
        //                  Find build tag start for vendor scripts....match any content..find bower ref area..match previous bower refs to end..match any content..find end build tag
        //                                  |                                   |                  |               |               |                  |                   |
        //                                  V                                   V                  V               V               V                  V                   V
        var findBowerScriptArea = /<!--\s*build:js\s*scripts\/vendor\s*-->((?:\n|\r|.)*?)<!--\s*bower:js\s*-->(?:\n|\r|.)*<!--\s*endbower\s*-->((?:\n|\r|.)*?)<!--\s*endbuild\s*-->/gim;
        var bowerReferences = '<!--build:js scripts\/vendor-->' +
                              '$1' +
                              '<!--bower:js-->\n' + 
                              scripts +
                              '\t<!--endbower-->' +
                              '$2' +
                              '<!--endbuild-->';

        return gulp.src(index)
            .pipe(replace(findBowerScriptArea, bowerReferences))
            .pipe(gulp.dest(target));
    }
    
    function buildScripts(references) {
        var scriptTemplate = '\t<script type="text/javascript" src="{0}"></script>';
        return _.reduce(references, function (scripts, reference) {
            return scripts +
                scriptTemplate.replace('{0}', reference) + '\n';
        }, '');        
    }
};

exports.getBowerReferences = function () {
    var libraryPath = 'libraries/bower/';
    var adjustedReferences = _.map(references.bower.js, function(script) { return libraryPath + script; });

    return adjustedReferences;
};