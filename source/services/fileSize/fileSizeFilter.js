"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var number_service_1 = require('../number/number.service');
var fileSize_service_1 = require('./fileSize.service');
// Formats and optionally truncates and ellipsimogrifies a string for display in a card header
var FileSizePipe = (function () {
    function FileSizePipe(numberUtility) {
        this.numberUtility = numberUtility;
    }
    FileSizePipe.prototype.transform = function (bytes) {
        var fileSize = new fileSize_service_1.FileSize(this.numberUtility, bytes);
        return fileSize.display();
    };
    FileSizePipe = __decorate([
        core_1.Pipe({ name: 'fileSize' }),
        __param(0, core_1.Inject(number_service_1.numberUtilityToken))
    ], FileSizePipe);
    return FileSizePipe;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZVNpemVGaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlU2l6ZUZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTRDLGVBQWUsQ0FBQyxDQUFBO0FBRTVELCtCQUFtRCwwQkFBMEIsQ0FBQyxDQUFBO0FBRTlFLGlDQUF5QixvQkFBb0IsQ0FBQyxDQUFBO0FBRTlDLDhGQUE4RjtBQUc5RjtJQUdDLHNCQUF3QyxhQUE2QjtRQUNwRSxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNwQyxDQUFDO0lBRUQsZ0NBQVMsR0FBVCxVQUFVLEtBQWE7UUFDdEIsSUFBSSxRQUFRLEdBQWEsSUFBSSwyQkFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBWEY7UUFBQyxXQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFDLENBQUM7bUJBSVosYUFBTSxDQUFDLG1DQUFrQixDQUFDO29CQUpkO0lBWTFCLG1CQUFDO0FBQUQsQ0FBQyxBQVhELElBV0MifQ==