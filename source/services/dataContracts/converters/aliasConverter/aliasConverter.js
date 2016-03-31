"use strict";
var _ = require('lodash');
var AliasConverter = (function () {
    function AliasConverter(alias, composedConverter) {
        var _this = this;
        this.alias = alias;
        this.composedConverter = composedConverter;
        this.fromServer = function (raw, parent) {
            if (!_.has(parent, _this.alias)) {
                return null;
            }
            raw = parent[_this.alias];
            if (_this.composedConverter != null) {
                return _this.composedConverter.fromServer(raw, parent);
            }
            return raw;
        };
        this.toServer = function (data, parent) {
            if (_this.composedConverter != null) {
                data = _this.composedConverter.toServer(data, parent);
            }
            parent[_this.alias] = data;
            return null;
        };
    }
    return AliasConverter;
}());
exports.AliasConverter = AliasConverter;
//# sourceMappingURL=aliasConverter.js.map