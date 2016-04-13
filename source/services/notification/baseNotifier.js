'use strict';
var BaseNotifier = (function () {
    function BaseNotifier() {
    }
    BaseNotifier.prototype.info = function (message) {
        this.notify(message);
    };
    BaseNotifier.prototype.warning = function (message) {
        this.notify(message);
    };
    BaseNotifier.prototype.error = function (message) {
        this.notify(message);
    };
    BaseNotifier.prototype.success = function (message) {
        this.notify(message);
    };
    BaseNotifier.prototype.notify = function (message) {
        window.alert(message);
        console.log(message);
    };
    return BaseNotifier;
}());
exports.BaseNotifier = BaseNotifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZU5vdGlmaWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzZU5vdGlmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUliO0lBQUE7SUFxQkEsQ0FBQztJQXBCQSwyQkFBSSxHQUFKLFVBQUssT0FBZTtRQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCw4QkFBTyxHQUFQLFVBQVEsT0FBZTtRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCw0QkFBSyxHQUFMLFVBQU0sT0FBZTtRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCw4QkFBTyxHQUFQLFVBQVEsT0FBZTtRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFTyw2QkFBTSxHQUFkLFVBQWUsT0FBZTtRQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUNGLG1CQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQztBQXJCWSxvQkFBWSxlQXFCeEIsQ0FBQSJ9