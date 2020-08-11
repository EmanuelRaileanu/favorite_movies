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
exports.Country = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var locations_1 = require("./locations");
var movies_1 = require("./movies");
var Country = /** @class */ (function (_super) {
    __extends(Country, _super);
    function Country() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Country.prototype, "tableName", {
        get: function () {
            return 'countries';
        },
        enumerable: false,
        configurable: true
    });
    // one-to-many relationship with Location
    Country.prototype.location = function () {
        return this.hasMany(locations_1.Location, 'movieId', 'id');
    };
    // one-to-many relationship with Movie
    Country.prototype.movies = function () {
        return this.hasMany(movies_1.Movie, 'countryId', 'id');
    };
    return Country;
}(knexconfig_1.bookshelf.Model));
exports.Country = Country;
