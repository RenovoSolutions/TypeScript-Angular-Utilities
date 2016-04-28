"use strict";
var core_1 = require('angular2/core');
var BooleanUtility = (function () {
    function BooleanUtility() {
    }
    BooleanUtility.prototype.toBool = function (object) {
        return !!object;
    };
    return BooleanUtility;
}());
exports.BooleanUtility = BooleanUtility;
exports.booleanToken = new core_1.OpaqueToken('A utility for working with booleans');
exports.BOOLEAN_PROVIDER = new core_1.Provider(exports.booleanToken, {
    useClass: BooleanUtility,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbGVhbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm9vbGVhbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBc0MsZUFBZSxDQUFDLENBQUE7QUFNdEQ7SUFBQTtJQUlBLENBQUM7SUFIQSwrQkFBTSxHQUFOLFVBQU8sTUFBVztRQUNqQixNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNqQixDQUFDO0lBQ0YscUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLHNCQUFjLGlCQUkxQixDQUFBO0FBRVksb0JBQVksR0FBZ0IsSUFBSSxrQkFBVyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7QUFFbkYsd0JBQWdCLEdBQWEsSUFBSSxlQUFRLENBQUMsb0JBQVksRUFBRTtJQUNwRSxRQUFRLEVBQUUsY0FBYztDQUN4QixDQUFDLENBQUMifQ==