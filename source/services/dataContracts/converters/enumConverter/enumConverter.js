'use strict';
var EnumConverter = (function () {
    function EnumConverter(enumType) {
        var _this = this;
        this.enumType = enumType;
        this.fromServer = function (raw) {
            return _this.enumType.get(raw);
        };
        this.toServer = function (data) {
            return data != null
                ? data.value
                : null;
        };
    }
    return EnumConverter;
}());
exports.EnumConverter = EnumConverter;
;
//# sourceMappingURL=enumConverter.js.map