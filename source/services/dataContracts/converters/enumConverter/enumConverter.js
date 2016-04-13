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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bUNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVudW1Db252ZXJ0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBU2I7SUFDQyx1QkFBb0IsUUFBOEI7UUFEbkQsaUJBV0M7UUFWb0IsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7UUFFbEQsZUFBVSxHQUFpQyxVQUFDLEdBQVc7WUFDdEQsTUFBTSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQTtRQUNELGFBQVEsR0FBa0MsVUFBQyxJQUFlO1lBQ3pELE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSTtrQkFDaEIsSUFBSSxDQUFDLEtBQUs7a0JBQ1YsSUFBSSxDQUFDO1FBQ1QsQ0FBQyxDQUFBO0lBVG9ELENBQUM7SUFVdkQsb0JBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQVhZLHFCQUFhLGdCQVd6QixDQUFBO0FBQUEsQ0FBQyJ9