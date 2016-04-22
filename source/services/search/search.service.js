'use strict';
var _ = require('lodash');
var object_service_1 = require('../object/object.service');
var string_service_1 = require('../string/string.service');
var SearchUtility = (function () {
    function SearchUtility() {
    }
    SearchUtility.prototype.search = function (object, search, caseSensitive) {
        var _this = this;
        if (object_service_1.objectUtility.isNullOrEmpty(search)) {
            return true;
        }
        if (_.isObject(object)) {
            var values = _.values(object);
            return _.some(values, function (value) { return _this.search(value, search, caseSensitive); });
        }
        else {
            var dataString = object_service_1.objectUtility.toString(object);
            if (!caseSensitive) {
                search = search.toLowerCase();
                dataString = dataString.toLowerCase();
            }
            return string_service_1.stringUtility.contains(dataString, search);
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
    return SearchUtility;
}());
exports.searchUtility = new SearchUtility();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1QiwrQkFBOEIsMEJBQTBCLENBQUMsQ0FBQTtBQUN6RCwrQkFBOEIsMEJBQTBCLENBQUMsQ0FBQTtBQU96RDtJQUFBO0lBOEJBLENBQUM7SUE3QkEsOEJBQU0sR0FBTixVQUFPLE1BQVcsRUFBRSxNQUFjLEVBQUUsYUFBdUI7UUFBM0QsaUJBa0JDO1FBakJBLEVBQUUsQ0FBQyxDQUFDLDhCQUFhLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksTUFBTSxHQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQUMsS0FBVSxJQUFnQixNQUFNLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkcsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsSUFBSSxVQUFVLEdBQVcsOEJBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUM5QixVQUFVLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZDLENBQUM7WUFFRCxNQUFNLENBQUMsOEJBQWEsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELENBQUM7SUFDRixDQUFDO0lBRUQsdUNBQWUsR0FBZixVQUFnQixNQUFXLEVBQUUsTUFBYyxFQUFFLGFBQXVCO1FBQXBFLGlCQVFDO1FBUEEsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7UUFFRCxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQUMsU0FBaUI7WUFDbkQsTUFBTSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRixvQkFBQztBQUFELENBQUMsQUE5QkQsSUE4QkM7QUFFVSxxQkFBYSxHQUFtQixJQUFJLGFBQWEsRUFBRSxDQUFDIn0=