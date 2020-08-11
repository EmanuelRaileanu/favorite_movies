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
exports.MovieSet = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var addresses_1 = require("./addresses");
var movie_scenes_1 = require("./movie_scenes");
var MovieSet = /** @class */ (function (_super) {
    __extends(MovieSet, _super);
    function MovieSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MovieSet.prototype, "tableName", {
        get: function () {
            return 'movie_sets';
        },
        enumerable: false,
        configurable: true
    });
    // one-to-many relationship with Address
    MovieSet.prototype.address = function () {
        return this.belongsTo(addresses_1.Address, 'addressId', 'id');
    };
    // one-to-many relationship with MovieScene
    MovieSet.prototype.movieScene = function () {
        return this.hasMany(movie_scenes_1.MovieScene, 'setId', 'id');
    };
    return MovieSet;
}(knexconfig_1.bookshelf.Model));
exports.MovieSet = MovieSet;
