"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Award = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var actors_1 = require("./actors");
var award_list_1 = require("./award_list");
var Award = /** @class */ (function (_super) {
    __extends(Award, _super);
    function Award() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Award.prototype, "tableName", {
        get: function () {
            return 'awards';
        },
        enumerable: false,
        configurable: true
    });
    // one-to-many relationship with Actor
    Award.prototype.actor = function () {
        return this.belongsTo(actors_1.Actor, 'actorId', 'id');
    };
    // one-to-many relationship with AwardName
    Award.prototype.award = function () {
        return this.belongsTo(award_list_1.AwardName, 'awardId', 'id');
    };
    return Award;
}(knexconfig_1.bookshelf.Model));
exports.Award = Award;
