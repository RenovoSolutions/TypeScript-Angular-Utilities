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
var _ = require('lodash');
var object_service_1 = require('../object/object.service');
var string_service_1 = require('../string/string.service');
var SearchUtility = (function () {
    function SearchUtility(objectUtility, stringUtility) {
        this.objectUtility = objectUtility;
        this.stringUtility = stringUtility;
    }
    SearchUtility.prototype.search = function (object, search, caseSensitive) {
        var _this = this;
        if (this.objectUtility.isNullOrEmpty(search)) {
            return true;
        }
        if (_.isObject(object)) {
            var values = _.values(object);
            return _.some(values, function (value) { return _this.search(value, search, caseSensitive); });
        }
        else {
            var dataString = this.objectUtility.toString(object);
            if (!caseSensitive) {
                search = search.toLowerCase();
                dataString = dataString.toLowerCase();
            }
            return this.stringUtility.contains(dataString, search);
        }
    };
    SearchUtility.prototype.tokenizedSearch = function (object, search, caseSensitive) {
        var _this = this;
        if (search == null) {
            return true;
        }
        return _.every(search.split(' '), function (subsearch) {
            return _this.search(object, subsearch, caseSensitive);
        });
    };
    SearchUtility = __decorate([
        __param(0, core_1.Inject(object_service_1.objectToken)),
        __param(1, core_1.Inject(string_service_1.stringToken)), 
        __metadata('design:paramtypes', [Object, Object])
    ], SearchUtility);
    return SearchUtility;
}());
exports.searchUtility = new SearchUtility(object_service_1.objectUtility, string_service_1.stringUtility);
exports.searchToken = new core_1.OpaqueToken('A service for performing text search against an object');
exports.SEARCH_PROVIDER = new core_1.Provider(exports.searchToken, {
    useClass: SearchUtility,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEscUJBQTBELGVBQWUsQ0FBQyxDQUFBO0FBQzFFLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLCtCQUEyRCwwQkFBMEIsQ0FBQyxDQUFBO0FBQ3RGLCtCQUEyRCwwQkFBMEIsQ0FBQyxDQUFBO0FBT3RGO0lBSUMsdUJBQWtDLGFBQTZCLEVBQ3JDLGFBQTZCO1FBQ3RELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3BDLENBQUM7SUFFRCw4QkFBTSxHQUFOLFVBQU8sTUFBVyxFQUFFLE1BQWMsRUFBRSxhQUF1QjtRQUEzRCxpQkFrQkM7UUFqQkEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDYixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxNQUFNLEdBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFVLElBQWdCLE1BQU0sQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxJQUFJLFVBQVUsR0FBVyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU3RCxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzlCLFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkMsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEQsQ0FBQztJQUNGLENBQUM7SUFFRCx1Q0FBZSxHQUFmLFVBQWdCLE1BQVcsRUFBRSxNQUFjLEVBQUUsYUFBdUI7UUFBcEUsaUJBUUM7UUFQQSxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUVELE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBQyxTQUFpQjtZQUNuRCxNQUFNLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQWxDWTttQkFBQyxhQUFNLENBQUMsNEJBQVcsQ0FBQzttQkFDM0IsYUFBTSxDQUFDLDRCQUFXLENBQUM7O3FCQURRO0lBbUNsQyxvQkFBQztBQUFELENBQUMsQUF2Q0QsSUF1Q0M7QUFFVSxxQkFBYSxHQUFtQixJQUFJLGFBQWEsQ0FBQyw4QkFBYSxFQUFFLDhCQUFhLENBQUMsQ0FBQztBQUU5RSxtQkFBVyxHQUFnQixJQUFJLGtCQUFXLENBQUMsd0RBQXdELENBQUMsQ0FBQztBQUVyRyx1QkFBZSxHQUFhLElBQUksZUFBUSxDQUFDLG1CQUFXLEVBQUU7SUFDbEUsUUFBUSxFQUFFLGFBQWE7Q0FDdkIsQ0FBQyxDQUFDIn0=