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
exports.ContentRating = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var movies_1 = require("./movies");
var ContentRating = /** @class */ (function (_super) {
    __extends(ContentRating, _super);
    function ContentRating() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ContentRating.prototype, "tableName", {
        get: function () {
            return 'content_ratings';
        },
        enumerable: false,
        configurable: true
    });
    // one-to-many relationship with Movie
    ContentRating.prototype.movies = function () {
        return this.hasMany(movies_1.Movie, 'contentRatingId', 'id');
    };
    return ContentRating;
}(knexconfig_1.bookshelf.Model));
exports.ContentRating = ContentRating;
