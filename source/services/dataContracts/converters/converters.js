'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./aliasConverter/aliasConverter'));
__export(require('./dateConverter/dateConverter'));
__export(require('./enumConverter/enumConverter'));
__export(require('./timeConverter/timeConverter'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7O0FBRWIsaUJBQWMsaUNBQWlDLENBQUMsRUFBQTtBQUNoRCxpQkFBYywrQkFBK0IsQ0FBQyxFQUFBO0FBQzlDLGlCQUFjLCtCQUErQixDQUFDLEVBQUE7QUFDOUMsaUJBQWMsK0JBQStCLENBQUMsRUFBQTtBQUU5QywrQkFBOEIsNkJBQTZCLENBQUMsQ0FBQTtBQWU1RDtJQUFBO0lBNEJBLENBQUM7SUEzQkEseUNBQWMsR0FBZCxVQUFlLElBQVMsRUFBRSxTQUE4QyxFQUFFLFFBQWlCLEVBQUUsTUFBWTtRQUF6RyxpQkFxQkM7UUFwQkEsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksOEJBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEYsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBQyxJQUFTLElBQVksTUFBTSxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BHLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLGFBQWEsR0FBdUMsUUFBUTtrQkFDM0MsU0FBVSxDQUFDLFFBQVE7a0JBQ25CLFNBQVUsQ0FBQyxVQUFVLENBQUM7WUFDM0MsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsSUFBSSxZQUFVLEdBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFDLGNBQW1CLEVBQUUsR0FBVztnQkFDbEQsWUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFVLEVBQUUsR0FBRyxDQUFDLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxZQUFVLENBQUMsQ0FBQztZQUNyRyxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxZQUFVLENBQUM7UUFDbkIsQ0FBQztJQUNGLENBQUM7SUFFTyxzQ0FBVyxHQUFuQixVQUFvQixNQUFXO1FBQzlCLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7ZUFDbEMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNGLHVCQUFDO0FBQUQsQ0FBQyxBQTVCRCxJQTRCQztBQTVCWSx3QkFBZ0IsbUJBNEI1QixDQUFBO0FBRVUsd0JBQWdCLEdBQXNCLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyJ9