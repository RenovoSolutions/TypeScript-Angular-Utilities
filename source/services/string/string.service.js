"use strict";
var core_1 = require('@angular/core');
var _ = require('lodash');
var StringUtility = (function () {
    function StringUtility() {
    }
    StringUtility.prototype.toNumber = function (string) {
        return +string;
    };
    StringUtility.prototype.contains = function (str, substring) {
        if (substring) {
            return str.indexOf(substring) !== -1;
        }
        return true;
    };
    StringUtility.prototype.substitute = function (formatString) {
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
    StringUtility.prototype.replaceAll = function (str, patternToFind, replacementString) {
        return str.replace(new RegExp(patternToFind, 'gi'), replacementString);
    };
    return StringUtility;
}());
exports.StringUtility = StringUtility;
exports.stringUtility = new StringUtility();
exports.stringToken = new core_1.OpaqueToken('A service for working with strings');
exports.STRING_PROVIDER = new core_1.Provider(exports.stringToken, {
    useClass: StringUtility,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHJpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQXNDLGVBQWUsQ0FBQyxDQUFBO0FBRXRELElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBUzVCO0lBQUE7SUF1QkEsQ0FBQztJQXRCQSxnQ0FBUSxHQUFSLFVBQVMsTUFBYztRQUN0QixNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELGdDQUFRLEdBQVIsVUFBUyxHQUFXLEVBQUUsU0FBa0I7UUFDdkMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVELGtDQUFVLEdBQVYsVUFBVyxZQUFvQjtRQUEvQixpQkFLQztRQUxnQyxnQkFBbUI7YUFBbkIsV0FBbUIsQ0FBbkIsc0JBQW1CLENBQW5CLElBQW1CO1lBQW5CLCtCQUFtQjs7UUFDbkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFhLEVBQUUsS0FBYTtZQUMzQyxZQUFZLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxrQ0FBVSxHQUFWLFVBQVcsR0FBVyxFQUFFLGFBQXFCLEVBQUUsaUJBQXlCO1FBQ3ZFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFDRixvQkFBQztBQUFELENBQUMsQUF2QkQsSUF1QkM7QUF2QlkscUJBQWEsZ0JBdUJ6QixDQUFBO0FBRVUscUJBQWEsR0FBbUIsSUFBSSxhQUFhLEVBQUUsQ0FBQztBQUVsRCxtQkFBVyxHQUFnQixJQUFJLGtCQUFXLENBQUMsb0NBQW9DLENBQUMsQ0FBQztBQUVqRix1QkFBZSxHQUFhLElBQUksZUFBUSxDQUFDLG1CQUFXLEVBQUU7SUFDbEUsUUFBUSxFQUFFLGFBQWE7Q0FDdkIsQ0FBQyxDQUFDIn0=