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
exports.Nationality = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var actors_1 = require("./actors");
var Nationality = /** @class */ (function (_super) {
    __extends(Nationality, _super);
    function Nationality() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Nationality.prototype, "tableName", {
        get: function () {
            return 'nationalities';
        },
        enumerable: false,
        configurable: true
    });
    // one-to-many relationship with Actor
    Nationality.prototype.actor = function () {
        return this.hasMany(actors_1.Actor, 'actorId', 'id');
    };
    return Nationality;
}(knexconfig_1.bookshelf.Model));
exports.Nationality = Nationality;
