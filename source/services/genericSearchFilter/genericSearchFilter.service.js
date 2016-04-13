'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var object_service_1 = require('../object/object.service');
var string_service_1 = require('../string/string.service');
var search_service_1 = require('../search/search.service');
var filter_1 = require('../../filters/filter');
exports.moduleName = 'rl.utilities.services.genericSearchFilter';
exports.factoryName = 'genericSearchFilterFactory';
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
genericSearchFilterFactory.$inject = [object_service_1.serviceName, string_service_1.serviceName];
function genericSearchFilterFactory(object, stringUtility) {
    'use strict';
    return {
        getInstance: function (tokenized) {
            return new GenericSearchFilter(object, stringUtility, tokenized);
        }
    };
}
angular.module(exports.moduleName, [object_service_1.moduleName, string_service_1.moduleName])
    .factory(exports.factoryName, genericSearchFilterFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFHNUIsK0JBSU8sMEJBQTBCLENBQUMsQ0FBQTtBQUVsQywrQkFJTywwQkFBMEIsQ0FBQyxDQUFBO0FBRWxDLHVCQUE4RSxzQkFBc0IsQ0FBQyxDQUFBO0FBRTFGLGtCQUFVLEdBQVcsMkNBQTJDLENBQUM7QUFDakUsbUJBQVcsR0FBVyw0QkFBNEIsQ0FBQztBQUNuRCxrQkFBVSxHQUFXLFFBQVEsQ0FBQztBQVV6QztJQUF5Qyx1Q0FBMEI7SUFNbEUsNkJBQXNCLE1BQXNCLEVBQVUsTUFBNkI7UUFDbEYsaUJBQU8sQ0FBQztRQURhLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7UUFMbkYsU0FBSSxHQUFXLGtCQUFVLENBQUM7UUFDMUIsb0JBQWUsR0FBVyxDQUFDLENBQUM7UUFDNUIsa0JBQWEsR0FBWSxLQUFLLENBQUM7SUFLL0IsQ0FBQztJQUVELHNCQUFJLDJDQUFVO2FBQWQ7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN6QixDQUFDO2FBRUQsVUFBZSxLQUFhO1lBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEIsQ0FBQzs7O09BTEE7SUFPRCx1Q0FBUyxHQUFUO1FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxlQUFlO2NBQzdFLElBQUksQ0FBQyxVQUFVO2NBQ2YsSUFBSSxDQUFDO0lBQ1QsQ0FBQztJQUVELG9DQUFNLEdBQU4sVUFBa0IsSUFBZTtRQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDakcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVPLDBDQUFZLEdBQXBCLFVBQWdDLElBQWUsRUFBRSxNQUFjLEVBQUUsYUFBc0I7UUFBdkYsaUJBY0M7UUFiQSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLE1BQU0sR0FBUSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQVUsSUFBZ0IsTUFBTSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdHLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLElBQUksVUFBVSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXBELEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDOUIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QyxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRCxDQUFDO0lBQ0YsQ0FBQztJQUNGLDBCQUFDO0FBQUQsQ0FBQyxBQWhERCxDQUF5QywyQkFBa0IsR0FnRDFEO0FBaERZLDJCQUFtQixzQkFnRC9CLENBQUE7QUFNRCwwQkFBMEIsQ0FBQyxPQUFPLEdBQUcsQ0FBQyw0QkFBaUIsRUFBRSw0QkFBaUIsQ0FBQyxDQUFDO0FBQzVFLG9DQUFvQyxNQUFzQixFQUN6RCxhQUFvQztJQUVwQyxZQUFZLENBQUM7SUFFYixNQUFNLENBQUM7UUFDTixXQUFXO1lBQ1YsTUFBTSxDQUFDLElBQUksbUJBQW1CLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7S0FDRCxDQUFDO0FBQ0gsQ0FBQztBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLDJCQUFnQixFQUFFLDJCQUFnQixDQUFDLENBQUM7S0FDOUQsT0FBTyxDQUFDLG1CQUFXLEVBQUUsMEJBQTBCLENBQUMsQ0FBQyJ9
