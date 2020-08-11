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
exports.Language = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var movies_1 = require("./movies");
var Language = /** @class */ (function (_super) {
    __extends(Language, _super);
    function Language() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Language.prototype, "tableName", {
        get: function () {
            return 'languages';
        },
        enumerable: false,
        configurable: true
    });
    // many-to-many relationship with Movie
    Language.prototype.movies = function () {
        return this.belongsToMany(movies_1.Movie, 'movies_languages', 'languageId', 'movieId');
    };
    return Language;
}(knexconfig_1.bookshelf.Model));
exports.Language = Language;
