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
exports.Institution = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var studies_1 = require("./studies");
var Institution = /** @class */ (function (_super) {
    __extends(Institution, _super);
    function Institution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Institution.prototype, "tableName", {
        get: function () {
            return 'institutions';
        },
        enumerable: false,
        configurable: true
    });
    // one-to-many relationship with Studies
    Institution.prototype.studies = function () {
        return this.hasMany(studies_1.Studies, 'institutionId', 'id');
    };
    return Institution;
}(knexconfig_1.bookshelf.Model));
exports.Institution = Institution;
