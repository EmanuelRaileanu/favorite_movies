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
exports.Studies = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var actors_1 = require("./actors");
var institutions_1 = require("./institutions");
var degrees_1 = require("./degrees");
var Studies = /** @class */ (function (_super) {
    __extends(Studies, _super);
    function Studies() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Studies.prototype, "tableName", {
        get: function () {
            return 'studies';
        },
        enumerable: false,
        configurable: true
    });
    // one-to-many relationship with Actor
    Studies.prototype.actor = function () {
        return this.belongsTo(actors_1.Actor, 'actorId', 'id');
    };
    // one-to-many relationship with Institution
    Studies.prototype.institution = function () {
        return this.belongsTo(institutions_1.Institution, 'institutionId', 'id');
    };
    // one-to-many relationship with Degree
    Studies.prototype.degree = function () {
        return this.belongsTo(degrees_1.Degree, 'degreeId', 'id');
    };
    return Studies;
}(knexconfig_1.bookshelf.Model));
exports.Studies = Studies;
