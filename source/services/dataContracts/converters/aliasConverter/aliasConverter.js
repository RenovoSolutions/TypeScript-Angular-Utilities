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
            delete parent[_this.alias];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXNDb252ZXJ0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbGlhc0NvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFJNUI7SUFDQyx3QkFBb0IsS0FBYSxFQUNyQixpQkFBeUM7UUFGdEQsaUJBNEJDO1FBM0JvQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ3JCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBd0I7UUFFckQsZUFBVSxHQUEyQyxVQUFDLEdBQVEsRUFBRSxNQUFXO1lBQzFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNiLENBQUM7WUFFRCxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixPQUFPLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFMUIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLE1BQU0sQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN2RCxDQUFDO1lBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNaLENBQUMsQ0FBQTtRQUVELGFBQVEsR0FBMEMsVUFBQyxJQUFlLEVBQUUsTUFBVztZQUM5RSxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3RELENBQUM7WUFFRCxNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztZQUUxQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQyxDQUFBO0lBekJ3RCxDQUFDO0lBMEIzRCxxQkFBQztBQUFELENBQUMsQUE1QkQsSUE0QkM7QUE1Qlksc0JBQWMsaUJBNEIxQixDQUFBIn0=