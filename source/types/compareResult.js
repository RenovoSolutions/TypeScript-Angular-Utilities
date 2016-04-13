'use strict';
(function (CompareResult) {
    CompareResult[CompareResult["greater"] = 1] = "greater";
    CompareResult[CompareResult["equal"] = 0] = "equal";
    CompareResult[CompareResult["less"] = -1] = "less";
    CompareResult[CompareResult["invalid"] = null] = "invalid";
})(exports.CompareResult || (exports.CompareResult = {}));
var CompareResult = exports.CompareResult;
function getCompareResult(num) {
    'use strict';
    if (num == null) {
        return CompareResult.invalid;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFyZVJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbXBhcmVSZXN1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsV0FBWSxhQUFhO0lBQ3hCLHVEQUFXLENBQUE7SUFDWCxtREFBUyxDQUFBO0lBQ1Qsa0RBQVMsQ0FBQTtJQUNULHlDQUFVLElBQUksYUFBQSxDQUFBO0FBQ2YsQ0FBQyxFQUxXLHFCQUFhLEtBQWIscUJBQWEsUUFLeEI7QUFMRCxJQUFZLGFBQWEsR0FBYixxQkFLWCxDQUFBO0FBRUQsMEJBQWlDLEdBQVc7SUFDM0MsWUFBWSxDQUFDO0lBQ2IsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7SUFDOUIsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2YsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztJQUM5QixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDUCxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztJQUMzQixDQUFDO0FBQ0YsQ0FBQztBQWJlLHdCQUFnQixtQkFhL0IsQ0FBQSJ9