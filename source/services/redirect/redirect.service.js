"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var window_provider_1 = require('../window/window.provider');
// This sevice implementation is browser specific and will NOT work for server side rendering!!!!
var RedirectService = (function () {
    function RedirectService(window) {
        this.window = window;
    }
    RedirectService.prototype.getCurrentLocationAsParam = function () {
        var baseUrl = this.window.location.pathname;
        var queryString = this.window.location.search || '';
        return encodeURIComponent(baseUrl + queryString);
    };
    RedirectService.prototype.to = function (target, newTab) {
        if (!newTab) {
            this.window.open(target);
        }
        else {
            var win = this.window.open(target, '_blank');
            win.focus();
        }
    };
    RedirectService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(window_provider_1.windowToken)), 
        __metadata('design:paramtypes', [Window])
    ], RedirectService);
    return RedirectService;
}());
exports.RedirectService = RedirectService;
exports.redirectToken = new core_1.OpaqueToken('A service for redirecting to a new page');
exports.REDIRECT_PROVIDER = new core_1.Provider(exports.redirectToken, {
    useClass: RedirectService,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXJlY3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlZGlyZWN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUEwRCxlQUFlLENBQUMsQ0FBQTtBQUMxRSxnQ0FBMEIsMkJBQTJCLENBQUMsQ0FBQTtBQVF0RCxpR0FBaUc7QUFHakc7SUFHQyx5QkFBaUMsTUFBYztRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN0QixDQUFDO0lBRUQsbURBQXlCLEdBQXpCO1FBQ0MsSUFBTSxPQUFPLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ3RELElBQU0sV0FBVyxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDOUQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsNEJBQUUsR0FBRixVQUFHLE1BQWMsRUFBRSxNQUFnQjtRQUNsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxJQUFNLEdBQUcsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDdkQsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsQ0FBQztJQUNGLENBQUM7SUFyQkY7UUFBQyxpQkFBVSxFQUFFO21CQUlDLGFBQU0sQ0FBQyw2QkFBVyxDQUFDOzt1QkFKcEI7SUFzQmIsc0JBQUM7QUFBRCxDQUFDLEFBckJELElBcUJDO0FBckJZLHVCQUFlLGtCQXFCM0IsQ0FBQTtBQUVZLHFCQUFhLEdBQWdCLElBQUksa0JBQVcsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0FBRXhGLHlCQUFpQixHQUFhLElBQUksZUFBUSxDQUFDLHFCQUFhLEVBQUU7SUFDdEUsUUFBUSxFQUFFLGVBQWU7Q0FDekIsQ0FBQyxDQUFDIn0=