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
exports.ProductionCompany = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var movies_1 = require("./movies");
var production_crew_1 = require("./production_crew");
var ProductionCompany = /** @class */ (function (_super) {
    __extends(ProductionCompany, _super);
    function ProductionCompany() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ProductionCompany.prototype, "tableName", {
        get: function () {
            return 'production_companies';
        },
        enumerable: false,
        configurable: true
    });
    // one-to-many relationship with Movie
    ProductionCompany.prototype.movies = function () {
        return this.hasMany(movies_1.Movie, 'ProductionCompanyId', 'id');
    };
    // one-to-many relationship with ProductionCrew
    ProductionCompany.prototype.productionCrew = function () {
        return this.hasMany(production_crew_1.ProductionCrew, 'productionCompanyId', 'id');
    };
    return ProductionCompany;
}(knexconfig_1.bookshelf.Model));
exports.ProductionCompany = ProductionCompany;
