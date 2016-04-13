'use strict';
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.utilities.services.string';
exports.serviceName = 'stringUtilityService';
var StringUtilityService = (function () {
    function StringUtilityService() {
    }
    StringUtilityService.prototype.toNumber = function (string) {
        return +string;
    };
    StringUtilityService.prototype.contains = function (str, substring) {
        if (substring) {
            return str.indexOf(substring) !== -1;
        }
        return true;
    };
    StringUtilityService.prototype.substitute = function (formatString) {
        var _this = this;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        _.each(params, function (param, index) {
            formatString = _this.replaceAll(formatString, '\\{' + index + '\\}', param);
        });
        return formatString;
    };
    StringUtilityService.prototype.replaceAll = function (str, patternToFind, replacementString) {
        return str.replace(new RegExp(patternToFind, 'gi'), replacementString);
    };
    return StringUtilityService;
}());
exports.StringUtilityService = StringUtilityService;
exports.stringUtility = new StringUtilityService();
angular.module(exports.moduleName, [])
    .service(exports.serviceName, StringUtilityService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHJpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUVqQixrQkFBVSxHQUFXLDhCQUE4QixDQUFDO0FBQ3BELG1CQUFXLEdBQVcsc0JBQXNCLENBQUM7QUFTeEQ7SUFBQTtJQXVCQSxDQUFDO0lBdEJBLHVDQUFRLEdBQVIsVUFBUyxNQUFjO1FBQ3RCLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsdUNBQVEsR0FBUixVQUFTLEdBQVcsRUFBRSxTQUFrQjtRQUN2QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDYixDQUFDO0lBRUQseUNBQVUsR0FBVixVQUFXLFlBQW9CO1FBQS9CLGlCQUtDO1FBTGdDLGdCQUFtQjthQUFuQixXQUFtQixDQUFuQixzQkFBbUIsQ0FBbkIsSUFBbUI7WUFBbkIsK0JBQW1COztRQUNuRCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQWEsRUFBRSxLQUFhO1lBQzNDLFlBQVksR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1RSxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDckIsQ0FBQztJQUVELHlDQUFVLEdBQVYsVUFBVyxHQUFXLEVBQUUsYUFBcUIsRUFBRSxpQkFBeUI7UUFDdkUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUNGLDJCQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQztBQXZCWSw0QkFBb0IsdUJBdUJoQyxDQUFBO0FBRVUscUJBQWEsR0FBMEIsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO0FBRTdFLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsT0FBTyxDQUFDLG1CQUFXLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyJ9