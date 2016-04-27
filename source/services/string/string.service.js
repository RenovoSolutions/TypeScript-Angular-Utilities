"use strict";
var core_1 = require('angular2/core');
var _ = require('lodash');
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
exports.stringToken = new core_1.OpaqueToken('A service for working with strings');
exports.STRING_PROVIDER = new core_1.Provider(exports.stringToken, {
    useClass: StringUtilityService,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHJpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQXNDLGVBQWUsQ0FBQyxDQUFBO0FBRXRELElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBUzVCO0lBQUE7SUF1QkEsQ0FBQztJQXRCQSx1Q0FBUSxHQUFSLFVBQVMsTUFBYztRQUN0QixNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELHVDQUFRLEdBQVIsVUFBUyxHQUFXLEVBQUUsU0FBa0I7UUFDdkMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVELHlDQUFVLEdBQVYsVUFBVyxZQUFvQjtRQUEvQixpQkFLQztRQUxnQyxnQkFBbUI7YUFBbkIsV0FBbUIsQ0FBbkIsc0JBQW1CLENBQW5CLElBQW1CO1lBQW5CLCtCQUFtQjs7UUFDbkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFhLEVBQUUsS0FBYTtZQUMzQyxZQUFZLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3JCLENBQUM7SUFFRCx5Q0FBVSxHQUFWLFVBQVcsR0FBVyxFQUFFLGFBQXFCLEVBQUUsaUJBQXlCO1FBQ3ZFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFDRiwyQkFBQztBQUFELENBQUMsQUF2QkQsSUF1QkM7QUF2QlksNEJBQW9CLHVCQXVCaEMsQ0FBQTtBQUVVLHFCQUFhLEdBQTBCLElBQUksb0JBQW9CLEVBQUUsQ0FBQztBQUVoRSxtQkFBVyxHQUFnQixJQUFJLGtCQUFXLENBQUMsb0NBQW9DLENBQUMsQ0FBQztBQUVqRix1QkFBZSxHQUFhLElBQUksZUFBUSxDQUFDLG1CQUFXLEVBQUU7SUFDbEUsUUFBUSxFQUFFLG9CQUFvQjtDQUM5QixDQUFDLENBQUMifQ==