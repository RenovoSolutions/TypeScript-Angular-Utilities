'use strict';
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.utilities.services.transform';
exports.serviceName = 'transformService';
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
angular.module(exports.moduleName, [])
    .service(exports.serviceName, TransformService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cmFuc2Zvcm0uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUVqQixrQkFBVSxHQUFXLGlDQUFpQyxDQUFDO0FBQ3ZELG1CQUFXLEdBQVcsa0JBQWtCLENBQUM7QUFNcEQ7SUFBQTtJQWNBLENBQUM7SUFiQSxtQ0FBUSxHQUFSLFVBQWlDLElBQWUsRUFBRSxTQUFzRDtRQUN2RyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDYixDQUFDO1FBRUQsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO2NBQ1UsU0FBVSxDQUFDLElBQUksQ0FBQztjQUNyRCxJQUFJLENBQVMsU0FBUyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNGLHVCQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFkWSx3QkFBZ0IsbUJBYzVCLENBQUE7QUFFVSxpQkFBUyxHQUFzQixJQUFJLGdCQUFnQixFQUFFLENBQUM7QUFFakUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixPQUFPLENBQUMsbUJBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDIn0=