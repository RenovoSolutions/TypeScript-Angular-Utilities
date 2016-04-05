'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./aliasConverter/aliasConverter'));
__export(require('./dateConverter/dateConverter'));
__export(require('./enumConverter/enumConverter'));
__export(require('./timeConverter/timeConverter'));
var ConverterService = (function () {
    function ConverterService() {
    }
    ConverterService.prototype.applyTransform = function (data, transform, toServer, parent) {
        var _this = this;
        if (transform == null) {
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
//# sourceMappingURL=converters.js.map