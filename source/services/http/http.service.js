"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        core_1.Injectable()
    ], HttpUtility);
    return HttpUtility;
}());
exports.HttpUtility = HttpUtility;
exports.httpToken = new core_1.OpaqueToken('Wrapper for http client');
exports.HTTP_PROVIDER = new core_1.Provider(exports.httpToken, {
    useClass: HttpUtility,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaHR0cC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxxQkFBa0QsZUFBZSxDQUFDLENBQUE7QUFFbEUscUJBQXlFLGVBQWUsQ0FBQyxDQUFBO0FBYXpGO0lBR0MscUJBQVksSUFBVTtRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDO0lBRUQsc0NBQWdCLEdBQWhCLFVBQWlCLE1BQVc7UUFDM0IsSUFBTSxZQUFZLEdBQW9CLElBQUksc0JBQWUsRUFBRSxDQUFDO1FBQzVELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQUMsS0FBVSxFQUFFLEdBQVc7WUFDdEMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3JCLENBQUM7SUFFRCx5QkFBRyxHQUFILFVBQWUsUUFBZ0IsRUFBRSxNQUFZO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7YUFDdkUsR0FBRyxDQUFDLFVBQUMsUUFBa0IsSUFBZ0IsT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELDBCQUFJLEdBQUosVUFBZ0IsUUFBZ0IsRUFBRSxJQUFTO1FBQzFDLElBQU0sT0FBTyxHQUFZLElBQUksY0FBTyxDQUFDO1lBQ3BDLGNBQWMsRUFBRSxrQkFBa0I7U0FDbEMsQ0FBQyxDQUFDO1FBQ0gsSUFBTSxPQUFPLEdBQW1CLElBQUkscUJBQWMsQ0FBQyxFQUFFLFNBQUEsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUVoRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDO2FBQzVELEdBQUcsQ0FBQyxVQUFDLFFBQWtCLElBQUssT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELHlCQUFHLEdBQUgsVUFBZSxRQUFnQixFQUFFLElBQVM7UUFDekMsSUFBTSxPQUFPLEdBQVksSUFBSSxjQUFPLENBQUM7WUFDcEMsY0FBYyxFQUFFLGtCQUFrQjtTQUNsQyxDQUFDLENBQUM7UUFDSCxJQUFNLE9BQU8sR0FBbUIsSUFBSSxxQkFBYyxDQUFDLEVBQUUsU0FBQSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRWhFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUM7YUFDM0QsR0FBRyxDQUFDLFVBQUMsUUFBa0IsSUFBSyxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsNEJBQU0sR0FBTixVQUFPLFFBQWdCLEVBQUUsTUFBWTtRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2FBQzFFLEdBQUcsQ0FBQyxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUE1Q0Y7UUFBQyxpQkFBVSxFQUFFO21CQUFBO0lBNkNiLGtCQUFDO0FBQUQsQ0FBQyxBQTVDRCxJQTRDQztBQTVDWSxtQkFBVyxjQTRDdkIsQ0FBQTtBQUVZLGlCQUFTLEdBQWdCLElBQUksa0JBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBRXBFLHFCQUFhLEdBQWEsSUFBSSxlQUFRLENBQUMsaUJBQVMsRUFBRTtJQUM5RCxRQUFRLEVBQUUsV0FBVztDQUNyQixDQUFDLENBQUMifQ==