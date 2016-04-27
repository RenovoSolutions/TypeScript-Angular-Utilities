"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var object_service_1 = require('../object/object.service');
var string_service_1 = require('../string/string.service');
var search_service_1 = require('../search/search.service');
var filter_1 = require('../../filters/filter');
exports.filterName = 'search';
var GenericSearchFilter = (function (_super) {
    __extends(GenericSearchFilter, _super);
    function GenericSearchFilter(object, string, tokenized) {
        _super.call(this);
        this.object = object;
        this.string = string;
        this.tokenized = tokenized;
        this.type = exports.filterName;
        this.minSearchLength = 1;
        this.caseSensitive = false;
    }
    Object.defineProperty(GenericSearchFilter.prototype, "searchText", {
        get: function () {
            return this._searchText;
        },
        set: function (value) {
            this._searchText = value;
            this.onChange(false);
        },
        enumerable: true,
        configurable: true
    });
    GenericSearchFilter.prototype.serialize = function () {
        return this.searchText != null && this.searchText.length >= this.minSearchLength
            ? this.searchText
            : null;
    };
    GenericSearchFilter.prototype.filter = function (item) {
        if (this.object.isNullOrEmpty(this.searchText) || this.searchText.length < this.minSearchLength) {
            return true;
        }
        if (this.tokenized) {
            return search_service_1.searchUtility.tokenizedSearch(item, this.searchText, this.caseSensitive);
        }
        return search_service_1.searchUtility.search(item, this.searchText, this.caseSensitive);
    };
    return GenericSearchFilter;
}(filter_1.SerializableFilter));
exports.GenericSearchFilter = GenericSearchFilter;
var GenericSearchFilterFactory = (function () {
    function GenericSearchFilterFactory(objectUtility, stringUtility) {
        this.objectUtility = objectUtility;
        this.stringUtility = stringUtility;
    }
    GenericSearchFilterFactory.prototype.getInstance = function (tokenized) {
        return new GenericSearchFilter(this.objectUtility, this.stringUtility, tokenized);
    };
    GenericSearchFilterFactory = __decorate([
        __param(0, core_1.Inject(object_service_1.objectToken)),
        __param(1, core_1.Inject(string_service_1.stringToken))
    ], GenericSearchFilterFactory);
    return GenericSearchFilterFactory;
}());
exports.GenericSearchFilterFactory = GenericSearchFilterFactory;
exports.genericSearchFilterToken = new core_1.OpaqueToken('A factory for getting generic search filters');
exports.GENERIC_SEARCH_FILTER_PROVIDER = new core_1.Provider(exports.genericSearchFilterToken, {
    useClass: GenericSearchFilterFactory,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUE4QyxlQUFlLENBQUMsQ0FBQTtBQUs5RCwrQkFHTywwQkFBMEIsQ0FBQyxDQUFBO0FBRWxDLCtCQUdPLDBCQUEwQixDQUFDLENBQUE7QUFDbEMsK0JBQThCLDBCQUEwQixDQUFDLENBQUE7QUFFekQsdUJBQXdELHNCQUFzQixDQUFDLENBQUE7QUFFcEUsa0JBQVUsR0FBVyxRQUFRLENBQUM7QUFVekM7SUFBeUMsdUNBQTBCO0lBTWxFLDZCQUFzQixNQUFzQixFQUNoQyxNQUE2QixFQUM3QixTQUFrQjtRQUM3QixpQkFBTyxDQUFDO1FBSGEsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7UUFDN0IsY0FBUyxHQUFULFNBQVMsQ0FBUztRQVA5QixTQUFJLEdBQVcsa0JBQVUsQ0FBQztRQUMxQixvQkFBZSxHQUFXLENBQUMsQ0FBQztRQUM1QixrQkFBYSxHQUFZLEtBQUssQ0FBQztJQU8vQixDQUFDO0lBRUQsc0JBQUksMkNBQVU7YUFBZDtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3pCLENBQUM7YUFFRCxVQUFlLEtBQWE7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QixDQUFDOzs7T0FMQTtJQU9ELHVDQUFTLEdBQVQ7UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGVBQWU7Y0FDN0UsSUFBSSxDQUFDLFVBQVU7Y0FDZixJQUFJLENBQUM7SUFDVCxDQUFDO0lBRUQsb0NBQU0sR0FBTixVQUFrQixJQUFlO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNqRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyw4QkFBYSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakYsQ0FBQztRQUVELE1BQU0sQ0FBQyw4QkFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUNGLDBCQUFDO0FBQUQsQ0FBQyxBQXRDRCxDQUF5QywyQkFBa0IsR0FzQzFEO0FBdENZLDJCQUFtQixzQkFzQy9CLENBQUE7QUFNRDtJQUlDLG9DQUFrQyxhQUE2QixFQUN6QyxhQUFvQztRQUN6RCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNwQyxDQUFDO0lBRUQsZ0RBQVcsR0FBWCxVQUFZLFNBQW1CO1FBQzlCLE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBUlk7bUJBQUMsYUFBTSxDQUFDLDRCQUFXLENBQUM7bUJBQy9CLGFBQU0sQ0FBQyw0QkFBVyxDQUFDO2tDQURZO0lBU2xDLGlDQUFDO0FBQUQsQ0FBQyxBQWJELElBYUM7QUFiWSxrQ0FBMEIsNkJBYXRDLENBQUE7QUFFWSxnQ0FBd0IsR0FBZ0IsSUFBSSxrQkFBVyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7QUFFeEcsc0NBQThCLEdBQWEsSUFBSSxlQUFRLENBQUMsZ0NBQXdCLEVBQUU7SUFDOUYsUUFBUSxFQUFFLDBCQUEwQjtDQUNwQyxDQUFDLENBQUMifQ==