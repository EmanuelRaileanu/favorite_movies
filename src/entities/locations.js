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
exports.Location = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var countries_1 = require("./countries");
var streets_1 = require("./streets");
var Location = /** @class */ (function (_super) {
    __extends(Location, _super);
    function Location() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Location.prototype, "tableName", {
        get: function () {
            return 'locations';
        },
        enumerable: false,
        configurable: true
    });
    // one-to-many relationship with Country
    Location.prototype.country = function () {
        return this.belongsTo(countries_1.Country, 'countryId', 'id');
    };
    // one-to-many relationship with Street
    Location.prototype.street = function () {
        return this.hasMany(streets_1.Street, 'locationId', 'id');
    };
    return Location;
}(knexconfig_1.bookshelf.Model));
exports.Location = Location;
