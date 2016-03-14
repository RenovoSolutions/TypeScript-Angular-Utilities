'use strict';
var angular = require('angular');
exports.moduleName = 'rl.utilities.services.number';
exports.serviceName = 'numberUtility';
var Sign;
(function (Sign) {
    Sign[Sign["positive"] = 1] = "positive";
    Sign[Sign["negative"] = -1] = "negative";
})(Sign || (Sign = {}));
var NumberUtility = (function () {
    function NumberUtility() {
    }
    NumberUtility.prototype.preciseRound = function (num, decimals) {
        var sign = num >= 0 ? Sign.positive : Sign.negative;
        return (Math.round((num * Math.pow(10, decimals)) + (sign * 0.001)) / Math.pow(10, decimals));
    };
    NumberUtility.prototype.integerDivide = function (dividend, divisor) {
        return Math.floor(dividend / divisor);
    };
    NumberUtility.prototype.roundToStep = function (num, step) {
        if (!step) {
            return num;
        }
        var remainder = num % step;
        if (remainder >= step / 2) {
            return num + (step - remainder);
        }
        else {
            return num - remainder;
        }
    };
    return NumberUtility;
}());
angular.module(exports.moduleName, [])
    .service(exports.serviceName, NumberUtility);
//# sourceMappingURL=number.service.js.map