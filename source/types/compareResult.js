'use strict';
(function (CompareResult) {
    CompareResult[CompareResult["greater"] = 1] = "greater";
    CompareResult[CompareResult["equal"] = 0] = "equal";
    CompareResult[CompareResult["less"] = -1] = "less";
})(exports.CompareResult || (exports.CompareResult = {}));
var CompareResult = exports.CompareResult;
function getCompareResult(num) {
    'use strict';
    if (num === 0) {
        return CompareResult.equal;
    }
    else if (num > 0) {
        return CompareResult.greater;
    }
    else {
        return CompareResult.less;
    }
}
exports.getCompareResult = getCompareResult;
//# sourceMappingURL=compareResult.js.map