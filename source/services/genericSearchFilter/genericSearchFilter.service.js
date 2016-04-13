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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFJbkMsK0JBSU8sMEJBQTBCLENBQUMsQ0FBQTtBQUVsQywrQkFJTywwQkFBMEIsQ0FBQyxDQUFBO0FBQ2xDLCtCQUE4QiwwQkFBMEIsQ0FBQyxDQUFBO0FBRXpELHVCQUE4RSxzQkFBc0IsQ0FBQyxDQUFBO0FBRTFGLGtCQUFVLEdBQVcsMkNBQTJDLENBQUM7QUFDakUsbUJBQVcsR0FBVyw0QkFBNEIsQ0FBQztBQUNuRCxrQkFBVSxHQUFXLFFBQVEsQ0FBQztBQVV6QztJQUF5Qyx1Q0FBMEI7SUFNbEUsNkJBQXNCLE1BQXNCLEVBQ2hDLE1BQTZCLEVBQzdCLFNBQWtCO1FBQzdCLGlCQUFPLENBQUM7UUFIYSxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUF1QjtRQUM3QixjQUFTLEdBQVQsU0FBUyxDQUFTO1FBUDlCLFNBQUksR0FBVyxrQkFBVSxDQUFDO1FBQzFCLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBQzVCLGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBTy9CLENBQUM7SUFFRCxzQkFBSSwyQ0FBVTthQUFkO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQWUsS0FBYTtZQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLENBQUM7OztPQUxBO0lBT0QsdUNBQVMsR0FBVDtRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsZUFBZTtjQUM3RSxJQUFJLENBQUMsVUFBVTtjQUNmLElBQUksQ0FBQztJQUNULENBQUM7SUFFRCxvQ0FBTSxHQUFOLFVBQWtCLElBQWU7UUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ2pHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDYixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLDhCQUFhLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRixDQUFDO1FBRUQsTUFBTSxDQUFDLDhCQUFhLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBQ0YsMEJBQUM7QUFBRCxDQUFDLEFBdENELENBQXlDLDJCQUFrQixHQXNDMUQ7QUF0Q1ksMkJBQW1CLHNCQXNDL0IsQ0FBQTtBQU1ELDBCQUEwQixDQUFDLE9BQU8sR0FBRyxDQUFDLDRCQUFpQixFQUFFLDRCQUFpQixDQUFDLENBQUM7QUFDNUUsb0NBQW9DLE1BQXNCLEVBQ3pELGFBQW9DO0lBRXBDLFlBQVksQ0FBQztJQUViLE1BQU0sQ0FBQztRQUNOLFdBQVcsWUFBQyxTQUFtQjtZQUM5QixNQUFNLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7S0FDRCxDQUFDO0FBQ0gsQ0FBQztBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLDJCQUFnQixFQUFFLDJCQUFnQixDQUFDLENBQUM7S0FDOUQsT0FBTyxDQUFDLG1CQUFXLEVBQUUsMEJBQTBCLENBQUMsQ0FBQyJ9