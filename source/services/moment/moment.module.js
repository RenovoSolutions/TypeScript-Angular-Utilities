'use strict';
var angular = require('angular');
var moment = require('moment');
exports.moduleName = 'rl.utilities.services.momentWrapper';
exports.serviceName = 'momentWrapper';
function momentWrapper() {
    'use strict';
    // Using `any` instead of MomentStatic because
    //  createFromInputFallback doesn't appear to be
    //  defined in MomentStatic... :-(
    var momentWrapper = moment; // moment must already be loaded
    // Set default method for handling non-ISO date conversions.
    // See 4/28 comment in https://github.com/moment/moment/issues/1407
    // This also prevents the deprecation warning message to the console.
    momentWrapper.createFromInputFallback = function (config) {
        config._d = new Date(config._i);
    };
    return momentWrapper;
}
exports.momentWrapper = momentWrapper;
angular.module(exports.moduleName, [])
    .factory(exports.serviceName, momentWrapper);
//# sourceMappingURL=moment.module.js.map