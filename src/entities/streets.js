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
exports.Street = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var locations_1 = require("./locations");
var addresses_1 = require("./addresses");
var Street = /** @class */ (function (_super) {
    __extends(Street, _super);
    function Street() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Street.prototype, "tableName", {
        get: function () {
            return 'streets';
        },
        enumerable: false,
        configurable: true
    });
    // one-to-many relationship with Location
    Street.prototype.location = function () {
        return this.belongsTo(locations_1.Location, 'locationId', 'id');
    };
    // one-to-many relationship with Address
    Street.prototype.address = function () {
        return this.hasMany(addresses_1.Address, 'streetId', 'id');
    };
    return Street;
}(knexconfig_1.bookshelf.Model));
exports.Street = Street;
