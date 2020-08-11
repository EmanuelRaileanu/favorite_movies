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
exports.Address = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var streets_1 = require("./streets");
var movie_sets_1 = require("./movie_sets");
var production_crew_1 = require("./production_crew");
var Address = /** @class */ (function (_super) {
    __extends(Address, _super);
    function Address() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Address.prototype, "tableName", {
        get: function () {
            return 'addresses';
        },
        enumerable: false,
        configurable: true
    });
    // one-to-many relationship with Street
    Address.prototype.street = function () {
        return this.belongsTo(streets_1.Street, 'streetId', 'id');
    };
    // one-to-many relatinoship with MovieSet
    Address.prototype.movieSet = function () {
        return this.hasMany(movie_sets_1.MovieSet, 'addressId', 'id');
    };
    // one-to-many relationship with ProductionCrew
    Address.prototype.productionCrew = function () {
        return this.hasMany(production_crew_1.ProductionCrew, 'addressId', 'id');
    };
    return Address;
}(knexconfig_1.bookshelf.Model));
exports.Address = Address;
