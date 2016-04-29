"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./aliasConverter/aliasConverter'));
__export(require('./dateConverter/dateConverter'));
__export(require('./enumConverter/enumConverter'));
__export(require('./timeConverter/timeConverter'));
var _ = require('lodash');
var object_service_1 = require('../../object/object.service');
var ConverterService = (function () {
    function ConverterService() {
    }
    ConverterService.prototype.applyTransform = function (data, transform, toServer, parent) {
        var _this = this;
        if (transform == null || (parent == null && object_service_1.objectUtility.isNullOrEmpty(data))) {
            return data;
        }
        if (_.isArray(data)) {
            return _.map(data, function (item) { return _this.applyTransform(item, transform, toServer); });
        }
        if (this.isConverter(transform)) {
            var transformFunc = toServer
                ? transform.toServer
                : transform.fromServer;
            return transformFunc(data, parent);
        }
        else {
            var mappedData_1 = _.clone(data);
            _.each(transform, function (childTransform, key) {
                mappedData_1[key] = _this.applyTransform(_.get(mappedData_1, key), childTransform, toServer, mappedData_1);
            });
            return mappedData_1;
        }
    };
    ConverterService.prototype.isConverter = function (object) {
        return _.isFunction(object.fromServer)
            || _.isFunction(object.toServer);
    };
    return ConverterService;
}());
exports.ConverterService = ConverterService;
exports.converterService = new ConverterService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLGlCQUFjLGlDQUFpQyxDQUFDLEVBQUE7QUFDaEQsaUJBQWMsK0JBQStCLENBQUMsRUFBQTtBQUM5QyxpQkFBYywrQkFBK0IsQ0FBQyxFQUFBO0FBQzlDLGlCQUFjLCtCQUErQixDQUFDLEVBQUE7QUFFOUMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDNUIsK0JBQThCLDZCQUE2QixDQUFDLENBQUE7QUFlNUQ7SUFBQTtJQTRCQSxDQUFDO0lBM0JBLHlDQUFjLEdBQWQsVUFBZSxJQUFTLEVBQUUsU0FBOEMsRUFBRSxRQUFpQixFQUFFLE1BQVk7UUFBekcsaUJBcUJDO1FBcEJBLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLDhCQUFhLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDYixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQUMsSUFBUyxJQUFZLE1BQU0sQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxhQUFhLEdBQXVDLFFBQVE7a0JBQzNDLFNBQVUsQ0FBQyxRQUFRO2tCQUNuQixTQUFVLENBQUMsVUFBVSxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLElBQUksWUFBVSxHQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBQyxjQUFtQixFQUFFLEdBQVc7Z0JBQ2xELFlBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBVSxFQUFFLEdBQUcsQ0FBQyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsWUFBVSxDQUFDLENBQUM7WUFDckcsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsWUFBVSxDQUFDO1FBQ25CLENBQUM7SUFDRixDQUFDO0lBRU8sc0NBQVcsR0FBbkIsVUFBb0IsTUFBVztRQUM5QixNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO2VBQ2xDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDRix1QkFBQztBQUFELENBQUMsQUE1QkQsSUE0QkM7QUE1Qlksd0JBQWdCLG1CQTRCNUIsQ0FBQTtBQUVVLHdCQUFnQixHQUFzQixJQUFJLGdCQUFnQixFQUFFLENBQUMifQ==