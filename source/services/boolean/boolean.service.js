'use strict';
var angular = require('angular');
exports.moduleName = 'rl.utilities.services.boolean';
exports.serviceName = 'booleanUtility';
var BooleanUtility = (function () {
    function BooleanUtility() {
    }
    BooleanUtility.prototype.toBool = function (object) {
        return !!object;
    };
    return BooleanUtility;
}());
angular.module(exports.moduleName, [])
    .service(exports.serviceName, BooleanUtility);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbGVhbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm9vbGVhbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRXhCLGtCQUFVLEdBQVcsK0JBQStCLENBQUM7QUFDckQsbUJBQVcsR0FBVyxnQkFBZ0IsQ0FBQztBQU1sRDtJQUFBO0lBSUEsQ0FBQztJQUhBLCtCQUFNLEdBQU4sVUFBTyxNQUFXO1FBQ2pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ2pCLENBQUM7SUFDRixxQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixPQUFPLENBQUMsbUJBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQyJ9