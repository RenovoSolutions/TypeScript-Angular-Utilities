"use strict";
var core_1 = require('@angular/core');
var angular2_uuid_1 = require('angular2-uuid');
var GuidService = (function () {
    function GuidService() {
    }
    GuidService.prototype.random = function () {
        return angular2_uuid_1.UUID.UUID();
    };
    return GuidService;
}());
exports.guid = new GuidService();
exports.guidToken = new core_1.OpaqueToken('Service for generating guids');
exports.GUID_PROVIDER = new core_1.Provider(exports.guidToken, {
    useClass: GuidService,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ3VpZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBc0MsZUFBZSxDQUFDLENBQUE7QUFFdEQsOEJBQXFCLGVBQWUsQ0FBQyxDQUFBO0FBTXJDO0lBQUE7SUFJQSxDQUFDO0lBSEEsNEJBQU0sR0FBTjtRQUNDLE1BQU0sQ0FBQyxvQkFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDRixrQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBRVksWUFBSSxHQUFpQixJQUFJLFdBQVcsRUFBRSxDQUFDO0FBRXZDLGlCQUFTLEdBQWdCLElBQUksa0JBQVcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRXpFLHFCQUFhLEdBQWEsSUFBSSxlQUFRLENBQUMsaUJBQVMsRUFBRTtJQUM5RCxRQUFRLEVBQUUsV0FBVztDQUNyQixDQUFDLENBQUMifQ==