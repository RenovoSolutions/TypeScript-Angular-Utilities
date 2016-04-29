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
var _ = require('lodash');
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var HttpUtility = (function () {
    function HttpUtility(http) {
        this.http = http;
    }
    HttpUtility.prototype.buildQueryString = function (params) {
        var searchParams = new http_1.URLSearchParams();
        _.each(params, function (param, key) {
            searchParams.set(key, param);
        });
        return searchParams;
    };
    HttpUtility.prototype.get = function (endpoint, params) {
        return this.http.get(endpoint, { search: this.buildQueryString(params) })
            .map(function (response) { return response.json(); });
    };
    HttpUtility.prototype.post = function (endpoint, data) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(endpoint, JSON.stringify(data), options)
            .map(function (response) { return response.json(); });
    };
    HttpUtility.prototype.put = function (endpoint, data) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(endpoint, JSON.stringify(data), options)
            .map(function (response) { return response.json(); });
    };
    HttpUtility.prototype.delete = function (endpoint, params) {
        return this.http.delete(endpoint, { search: this.buildQueryString(params) })
            .map(function () { return null; });
    };
    HttpUtility = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HttpUtility);
    return HttpUtility;
}());
exports.HttpUtility = HttpUtility;
exports.httpToken = new core_1.OpaqueToken('Wrapper for http client');
exports.HTTP_PROVIDER = new core_1.Provider(exports.httpToken, {
    useClass: HttpUtility,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaHR0cC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUM1QixxQkFBMEQsZUFBZSxDQUFDLENBQUE7QUFFMUUscUJBQXlFLGVBQWUsQ0FBQyxDQUFBO0FBYXpGO0lBR0MscUJBQTBCLElBQVU7UUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVELHNDQUFnQixHQUFoQixVQUFpQixNQUFXO1FBQzNCLElBQU0sWUFBWSxHQUFvQixJQUFJLHNCQUFlLEVBQUUsQ0FBQztRQUM1RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQVUsRUFBRSxHQUFXO1lBQ3RDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUNyQixDQUFDO0lBRUQseUJBQUcsR0FBSCxVQUFlLFFBQWdCLEVBQUUsTUFBWTtRQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2FBQ3ZFLEdBQUcsQ0FBQyxVQUFDLFFBQWtCLElBQWdCLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCwwQkFBSSxHQUFKLFVBQWdCLFFBQWdCLEVBQUUsSUFBUztRQUMxQyxJQUFNLE9BQU8sR0FBWSxJQUFJLGNBQU8sQ0FBQztZQUNwQyxjQUFjLEVBQUUsa0JBQWtCO1NBQ2xDLENBQUMsQ0FBQztRQUNILElBQU0sT0FBTyxHQUFtQixJQUFJLHFCQUFjLENBQUMsRUFBRSxTQUFBLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQzthQUM1RCxHQUFHLENBQUMsVUFBQyxRQUFrQixJQUFLLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCx5QkFBRyxHQUFILFVBQWUsUUFBZ0IsRUFBRSxJQUFTO1FBQ3pDLElBQU0sT0FBTyxHQUFZLElBQUksY0FBTyxDQUFDO1lBQ3BDLGNBQWMsRUFBRSxrQkFBa0I7U0FDbEMsQ0FBQyxDQUFDO1FBQ0gsSUFBTSxPQUFPLEdBQW1CLElBQUkscUJBQWMsQ0FBQyxFQUFFLFNBQUEsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUVoRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDO2FBQzNELEdBQUcsQ0FBQyxVQUFDLFFBQWtCLElBQUssT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELDRCQUFNLEdBQU4sVUFBTyxRQUFnQixFQUFFLE1BQVk7UUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQzthQUMxRSxHQUFHLENBQUMsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBNUNGO1FBQUMsaUJBQVUsRUFBRTttQkFJQyxhQUFNLENBQUMsV0FBSSxDQUFDOzttQkFKYjtJQTZDYixrQkFBQztBQUFELENBQUMsQUE1Q0QsSUE0Q0M7QUE1Q1ksbUJBQVcsY0E0Q3ZCLENBQUE7QUFFWSxpQkFBUyxHQUFnQixJQUFJLGtCQUFXLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUVwRSxxQkFBYSxHQUFhLElBQUksZUFBUSxDQUFDLGlCQUFTLEVBQUU7SUFDOUQsUUFBUSxFQUFFLFdBQVc7Q0FDckIsQ0FBQyxDQUFDIn0=