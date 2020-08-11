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
exports.Actor = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var files_1 = require("./files");
var movies_1 = require("./movies");
var studies_1 = require("./studies");
var awards_1 = require("./awards");
var nationalities_1 = require("./nationalities");
var movie_scenes_1 = require("./movie_scenes");
var Actor = /** @class */ (function (_super) {
    __extends(Actor, _super);
    function Actor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Actor.prototype, "tableName", {
        get: function () {
            return 'actors';
        },
        enumerable: false,
        configurable: true
    });
    // one-to-one relationship with File
    Actor.prototype.actorPhoto = function () {
        return this.hasOne(files_1.File, 'id', 'recentPhotoId');
    };
    // many-to-many relationship with Movie
    Actor.prototype.movies = function () {
        return this.belongsToMany(movies_1.Movie, 'movies_actors', 'actorId', 'movieId');
    };
    // one-to-many relationship with Studies
    Actor.prototype.studies = function () {
        return this.hasMany(studies_1.Studies, 'actorId', 'id');
    };
    // one-to-many relationship with Award
    Actor.prototype.awards = function () {
        return this.hasMany(awards_1.Award, 'actorId', 'id');
    };
    // one-to-many relationship with Nationality
    Actor.prototype.nationality = function () {
        return this.belongsTo(nationalities_1.Nationality, 'actorId', 'id');
    };
    // many-to-many relationship wtih MovieScene
    Actor.prototype.movieScenes = function () {
        return this.belongsToMany(movie_scenes_1.MovieScene, 'actors_movie_scenes', 'actorId', 'sceneId');
    };
    return Actor;
}(knexconfig_1.bookshelf.Model));
exports.Actor = Actor;
