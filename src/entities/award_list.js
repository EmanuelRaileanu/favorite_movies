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
exports.AwardName = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var awards_1 = require("./awards");
var AwardName = /** @class */ (function (_super) {
    __extends(AwardName, _super);
    function AwardName() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AwardName.prototype, "tableName", {
        get: function () {
            return 'award_list';
        },
        enumerable: false,
        configurable: true
    });
    // one-to-many relationship with Award
    AwardName.prototype.awards = function () {
        return this.hasMany(awards_1.Award, 'awardId', 'id');
    };
    return AwardName;
}(knexconfig_1.bookshelf.Model));
exports.AwardName = AwardName;
