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
exports.numberUtility = new NumberUtility();
angular.module(exports.moduleName, [])
    .service(exports.serviceName, NumberUtility);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJudW1iZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUV4QixrQkFBVSxHQUFXLDhCQUE4QixDQUFDO0FBQ3BELG1CQUFXLEdBQVcsZUFBZSxDQUFDO0FBRWpELElBQUssSUFHSjtBQUhELFdBQUssSUFBSTtJQUNSLHVDQUFZLENBQUE7SUFDWix3Q0FBYSxDQUFBO0FBQ2QsQ0FBQyxFQUhJLElBQUksS0FBSixJQUFJLFFBR1I7QUFRRDtJQUFBO0lBdUJBLENBQUM7SUF0QkEsb0NBQVksR0FBWixVQUFhLEdBQVcsRUFBRSxRQUFnQjtRQUN6QyxJQUFJLElBQUksR0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMxRCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBUyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3ZHLENBQUM7SUFFRCxxQ0FBYSxHQUFiLFVBQWMsUUFBZ0IsRUFBRSxPQUFlO1FBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsbUNBQVcsR0FBWCxVQUFZLEdBQVcsRUFBRSxJQUFZO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDWixDQUFDO1FBRUQsSUFBSSxTQUFTLEdBQVcsR0FBRyxHQUFHLElBQUksQ0FBQztRQUVuQyxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxNQUFNLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztRQUN4QixDQUFDO0lBQ0YsQ0FBQztJQUNGLG9CQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQztBQUVVLHFCQUFhLEdBQW1CLElBQUksYUFBYSxFQUFFLENBQUM7QUFFL0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixPQUFPLENBQUMsbUJBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQyJ9