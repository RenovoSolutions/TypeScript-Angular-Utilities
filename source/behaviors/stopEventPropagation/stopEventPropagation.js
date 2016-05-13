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
var core_1 = require('@angular/core');
var StopEventPropagation = (function () {
    function StopEventPropagation(element) {
        this.element = element;
    }
    StopEventPropagation.prototype.ngAfterContentInit = function () {
        this.element.nativeElement.on(this.event, function (event) {
            event.preventDefault();
            event.stopPropagation();
        });
    };
    __decorate([
        core_1.Input('rl-stop-event-propagation'), 
        __metadata('design:type', String)
    ], StopEventPropagation.prototype, "event", void 0);
    StopEventPropagation = __decorate([
        core_1.Directive({
            selector: '[rl-stop-event-propagation]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], StopEventPropagation);
    return StopEventPropagation;
}());
exports.StopEventPropagation = StopEventPropagation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcEV2ZW50UHJvcGFnYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9wRXZlbnRQcm9wYWdhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQStELGVBQWUsQ0FBQyxDQUFBO0FBSy9FO0lBTUMsOEJBQVksT0FBbUI7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELGlEQUFrQixHQUFsQjtRQUNDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQUMsS0FBVTtZQUNwRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQVpEO1FBQUMsWUFBSyxDQUFDLDJCQUEyQixDQUFDOzt1REFBQTtJQU5wQztRQUFDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsNkJBQTZCO1NBQ3ZDLENBQUM7OzRCQUFBO0lBaUJGLDJCQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQztBQWhCWSw0QkFBb0IsdUJBZ0JoQyxDQUFBIn0=