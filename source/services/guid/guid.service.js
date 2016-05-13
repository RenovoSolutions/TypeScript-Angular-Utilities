"use strict";
var core_1 = require('@angular/core');
var uuid = require('node-uuid');
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
exports.guidToken = new core_1.OpaqueToken('Service for generating guids');
exports.GUID_PROVIDER = new core_1.Provider(exports.guidToken, {
    useClass: GuidService,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ3VpZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBc0MsZUFBZSxDQUFDLENBQUE7QUFFdEQsSUFBWSxJQUFJLFdBQU0sV0FBVyxDQUFDLENBQUE7QUFPbEM7SUFBQTtJQVFBLENBQUM7SUFQQSwwQkFBSSxHQUFKO1FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsNEJBQU0sR0FBTjtRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUNGLGtCQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFFWSxZQUFJLEdBQWlCLElBQUksV0FBVyxFQUFFLENBQUM7QUFFdkMsaUJBQVMsR0FBZ0IsSUFBSSxrQkFBVyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFFekUscUJBQWEsR0FBYSxJQUFJLGVBQVEsQ0FBQyxpQkFBUyxFQUFFO0lBQzlELFFBQVEsRUFBRSxXQUFXO0NBQ3JCLENBQUMsQ0FBQyJ9