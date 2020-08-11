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
exports.ProductionCrew = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var production_crew_types_1 = require("./production_crew_types");
var addresses_1 = require("./addresses");
var production_companies_1 = require("./production_companies");
var movies_1 = require("./movies");
var movie_scenes_1 = require("./movie_scenes");
var ProductionCrew = /** @class */ (function (_super) {
    __extends(ProductionCrew, _super);
    function ProductionCrew() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ProductionCrew.prototype, "tableName", {
        get: function () {
            return 'production_crew';
        },
        enumerable: false,
        configurable: true
    });
    // one-to-many relationship with ProductionCrewType
    ProductionCrew.prototype.productionCrewType = function () {
        return this.belongsTo(production_crew_types_1.ProductionCrewType, 'typeId', 'id');
    };
    // one-to-many relationship with ProductionCompany
    ProductionCrew.prototype.productionCompany = function () {
        return this.belongsTo(production_companies_1.ProductionCompany, 'productionCompanyId', 'id');
    };
    // one-to-many relationship with Address
    ProductionCrew.prototype.address = function () {
        return this.belongsTo(addresses_1.Address, 'addressId', 'id');
    };
    // many-to-many relationship with Movie
    ProductionCrew.prototype.movies = function () {
        return this.belongsToMany(movies_1.Movie, 'production_crew_movies', 'productionCrewMemberId', 'movieId');
    };
    // many-to-many relationship with MovieScene
    ProductionCrew.prototype.movieScenes = function () {
        return this.belongsToMany(movie_scenes_1.MovieScene, 'production_crew_movie_scenes', 'productionCrewMemberId', 'movieSceneId');
    };
    return ProductionCrew;
}(knexconfig_1.bookshelf.Model));
exports.ProductionCrew = ProductionCrew;
