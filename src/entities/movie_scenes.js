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
exports.MovieScene = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var movie_sets_1 = require("./movie_sets");
var movies_1 = require("./movies");
var production_crew_1 = require("./production_crew");
var actors_1 = require("./actors");
var MovieScene = /** @class */ (function (_super) {
    __extends(MovieScene, _super);
    function MovieScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MovieScene.prototype, "tableName", {
        get: function () {
            return 'movie_scenes';
        },
        enumerable: false,
        configurable: true
    });
    // one-to-many relationship with MovieSet
    MovieScene.prototype.movieSet = function () {
        return this.belongsTo(movie_sets_1.MovieSet, 'setId', 'id');
    };
    // one-to-many relationship with Movie
    MovieScene.prototype.movie = function () {
        return this.belongsTo(movies_1.Movie, 'movieId', 'id');
    };
    // many-to-many relationship with ProductionCrew
    MovieScene.prototype.productionCrew = function () {
        return this.belongsToMany(production_crew_1.ProductionCrew, 'production_crew_movie_scenes', 'movieSceneId', 'productionCrewMemberId');
    };
    // many-to-many relationship with Actor
    MovieScene.prototype.actors = function () {
        return this.belongsToMany(actors_1.Actor, 'actors_movie_scenes', 'sceneId', 'actorId');
    };
    return MovieScene;
}(knexconfig_1.bookshelf.Model));
exports.MovieScene = MovieScene;
