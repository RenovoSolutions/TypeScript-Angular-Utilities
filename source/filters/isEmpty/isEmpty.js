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
var core_1 = require('@angular/core');
var object_service_1 = require('../../services/object/object.service');
var IsEmptyPipe = (function () {
    function IsEmptyPipe(objectUtility) {
        this.objectUtility = objectUtility;
    }
    IsEmptyPipe.prototype.transform = function (input, trueWhenEmpty) {
        var isEmpty = this.objectUtility.isNullOrEmpty(input);
        if (trueWhenEmpty === false) {
            return !isEmpty;
        }
        return isEmpty;
    };
    IsEmptyPipe = __decorate([
        core_1.Pipe({ name: 'isEmpty' }),
        __param(0, core_1.Inject(object_service_1.objectToken)), 
        __metadata('design:paramtypes', [Object])
    ], IsEmptyPipe);
    return IsEmptyPipe;
}());
exports.IsEmptyPipe = IsEmptyPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNFbXB0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlzRW1wdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUEwQyxlQUFlLENBQUMsQ0FBQTtBQUUxRCwrQkFHTyxzQ0FBc0MsQ0FBQyxDQUFBO0FBRzlDO0lBR0MscUJBQWtDLGFBQTZCO1FBQzlELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3BDLENBQUM7SUFDRCwrQkFBUyxHQUFULFVBQVUsS0FBVSxFQUFFLGFBQXVCO1FBQzVDLElBQUksT0FBTyxHQUFZLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRS9ELEVBQUUsQ0FBQyxDQUFDLGFBQWEsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNqQixDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNoQixDQUFDO0lBZEY7UUFBQyxXQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7bUJBSVgsYUFBTSxDQUFDLDRCQUFXLENBQUM7O21CQUpSO0lBZTFCLGtCQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFkWSxtQkFBVyxjQWN2QixDQUFBIn0=