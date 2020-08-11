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
exports.Movie = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var production_companies_1 = require("./production_companies");
var movie_categories_1 = require("./movie_categories");
var files_1 = require("./files");
var actors_1 = require("./actors");
var movie_scenes_1 = require("./movie_scenes");
var production_crew_1 = require("./production_crew");
var content_ratings_1 = require("./content_ratings");
var countries_1 = require("./countries");
var languages_1 = require("./languages");
var Movie = /** @class */ (function (_super) {
    __extends(Movie, _super);
    function Movie() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Movie.prototype, "tableName", {
        get: function () {
            return 'movies';
        },
        enumerable: false,
        configurable: true
    });
    // many-to-many relationship with MovieCategory
    Movie.prototype.categories = function () {
        return this.belongsToMany(movie_categories_1.MovieCategory, 'movies_movie_categories', 'movieId', 'categoryId');
    };
    // one-to-many relationshop with ProductionCompany
    Movie.prototype.productionCompany = function () {
        return this.belongsTo(production_companies_1.ProductionCompany, 'ProductionCompanyId', 'id');
    };
    // one-to-one relationship with File
    Movie.prototype.poster = function () {
        return this.hasOne(files_1.File, 'id', 'posterId');
    };
    // many-to-many relationship with Actor
    Movie.prototype.actors = function () {
        return this.belongsToMany(actors_1.Actor, 'movies_actors', 'movieId', 'actorId');
    };
    // one-to-many relationship with MovieScene
    Movie.prototype.movieScenes = function () {
        return this.hasMany(movie_scenes_1.MovieScene, 'movieId', 'id');
    };
    // many-to-many relationship with ProductionCrew
    Movie.prototype.productionCrew = function () {
        return this.belongsToMany(production_crew_1.ProductionCrew, 'production_crew_movies', 'movieId', 'productionCrewMemberId');
    };
    // one-to-many relationship with ContentRating
    Movie.prototype.rated = function () {
        return this.belongsTo(content_ratings_1.ContentRating, 'contentRatingId', 'id');
    };
    // one-to-many relationship with Country
    Movie.prototype.country = function () {
        return this.belongsTo(countries_1.Country, 'countryId', 'id');
    };
    // many-to-many relationship with Language
    Movie.prototype.languages = function () {
        return this.belongsToMany(languages_1.Language, 'movies_languages', 'movieId', 'languageId');
    };
    return Movie;
}(knexconfig_1.bookshelf.Model));
exports.Movie = Movie;
