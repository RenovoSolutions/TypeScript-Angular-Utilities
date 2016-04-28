// Formats and optionally truncates and ellipsimogrifies a string for display in a card header
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var object_service_1 = require('../../services/object/object.service');
var TruncatePipe = (function () {
    function TruncatePipe(objectUtility) {
        this.objectUtility = objectUtility;
    }
    TruncatePipe.prototype.transform = function (input, truncateTo, includeEllipses) {
        includeEllipses = includeEllipses == null ? false : includeEllipses;
        var out = this.objectUtility.isNullOrWhitespace(input) ? '' : input.toString();
        if (out.length) {
            if (truncateTo != null && out.length > truncateTo) {
                out = out.substring(0, truncateTo);
                if (includeEllipses) {
                    out += '...';
                }
            }
        }
        return out;
    };
    TruncatePipe = __decorate([
        core_1.Pipe({ name: 'truncate' }),
        __param(0, core_1.Inject(object_service_1.objectToken)), 
        __metadata('design:paramtypes', [Object])
    ], TruncatePipe);
    return TruncatePipe;
}());
exports.TruncatePipe = TruncatePipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1bmNhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cnVuY2F0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4RkFBOEY7Ozs7Ozs7Ozs7Ozs7O0FBRTlGLHFCQUE0QyxlQUFlLENBQUMsQ0FBQTtBQUU1RCwrQkFHTyxzQ0FBc0MsQ0FBQyxDQUFBO0FBRzlDO0lBR0Msc0JBQWtDLGFBQTZCO1FBQzlELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxnQ0FBUyxHQUFULFVBQVUsS0FBdUIsRUFBRSxVQUFtQixFQUFFLGVBQXlCO1FBQ2hGLGVBQWUsR0FBRyxlQUFlLElBQUksSUFBSSxHQUFHLEtBQUssR0FBRyxlQUFlLENBQUM7UUFFcEUsSUFBSSxHQUFHLEdBQVcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZGLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxHQUFHLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ25DLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLEdBQUcsSUFBSSxLQUFLLENBQUM7Z0JBQ2QsQ0FBQztZQUNGLENBQUM7UUFDRixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFyQkY7UUFBQyxXQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7bUJBSVosYUFBTSxDQUFDLDRCQUFXLENBQUM7O29CQUpQO0lBc0IzQixtQkFBQztBQUFELENBQUMsQUFyQkQsSUFxQkM7QUFyQlksb0JBQVksZUFxQnhCLENBQUEifQ==