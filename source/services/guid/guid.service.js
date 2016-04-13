'use strict';
var angular = require('angular');
var uuid = require('uuid');
exports.moduleName = 'rl.utilities.services.guid';
exports.serviceName = 'guidService';
var GuidService = (function () {
    function GuidService() {
    }
    GuidService.prototype.time = function () {
        return uuid.v1();
    };
    GuidService.prototype.random = function () {
        return uuid.v4();
    };
    return GuidService;
}());
exports.guid = new GuidService();
angular.module(exports.moduleName, [])
    .service(exports.serviceName, GuidService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ3VpZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLElBQVksSUFBSSxXQUFNLE1BQU0sQ0FBQyxDQUFBO0FBRWxCLGtCQUFVLEdBQVcsNEJBQTRCLENBQUM7QUFDbEQsbUJBQVcsR0FBVyxhQUFhLENBQUM7QUFPL0M7SUFBQTtJQVFBLENBQUM7SUFQQSwwQkFBSSxHQUFKO1FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsNEJBQU0sR0FBTjtRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUNGLGtCQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFFVSxZQUFJLEdBQWlCLElBQUksV0FBVyxFQUFFLENBQUM7QUFFbEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixPQUFPLENBQUMsbUJBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyJ9