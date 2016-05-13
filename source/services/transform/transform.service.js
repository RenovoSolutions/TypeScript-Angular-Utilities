"use strict";
var core_1 = require('@angular/core');
var _ = require('lodash');
var TransformService = (function () {
    function TransformService() {
    }
    TransformService.prototype.getValue = function (item, transform) {
        if (item == null) {
            return null;
        }
        if (transform == null) {
            return item;
        }
        return _.isFunction(transform)
            ? transform(item)
            : item[transform];
    };
    return TransformService;
}());
exports.TransformService = TransformService;
exports.transform = new TransformService();
exports.transformServiceToken = new core_1.OpaqueToken('transform service token');
exports.TRANSFORM_SERVICE_PROVIDER = new core_1.Provider(exports.transformServiceToken, {
    useClass: TransformService
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cmFuc2Zvcm0uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQXNDLGVBQWUsQ0FBQyxDQUFBO0FBQ3RELElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBTTVCO0lBQUE7SUFjQSxDQUFDO0lBYkEsbUNBQVEsR0FBUixVQUFpQyxJQUFlLEVBQUUsU0FBc0Q7UUFDdkcsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUVELE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztjQUNVLFNBQVUsQ0FBQyxJQUFJLENBQUM7Y0FDckQsSUFBSSxDQUFTLFNBQVMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRix1QkFBQztBQUFELENBQUMsQUFkRCxJQWNDO0FBZFksd0JBQWdCLG1CQWM1QixDQUFBO0FBRVksaUJBQVMsR0FBc0IsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO0FBRXRELDZCQUFxQixHQUFnQixJQUFJLGtCQUFXLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUVoRixrQ0FBMEIsR0FBYSxJQUFJLGVBQVEsQ0FBQyw2QkFBcUIsRUFBRTtJQUN2RixRQUFRLEVBQUUsZ0JBQWdCO0NBQzFCLENBQUMsQ0FBQyJ9