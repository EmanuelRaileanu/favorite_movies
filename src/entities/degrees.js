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
exports.Degree = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var studies_1 = require("./studies");
var Degree = /** @class */ (function (_super) {
    __extends(Degree, _super);
    function Degree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Degree.prototype, "tableName", {
        get: function () {
            return 'degrees';
        },
        enumerable: false,
        configurable: true
    });
    // one-to-many relationship with Studies
    Degree.prototype.studies = function () {
        return this.hasMany(studies_1.Studies, 'degreeId', 'id');
    };
    return Degree;
}(knexconfig_1.bookshelf.Model));
exports.Degree = Degree;
