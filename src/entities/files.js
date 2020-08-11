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
exports.File = void 0;
var knexconfig_1 = require("../utilities/knexconfig");
var movies_1 = require("./movies");
var absoluteUrl_1 = require("../utilities/absoluteUrl");
var actors_1 = require("./actors");
var File = /** @class */ (function (_super) {
    __extends(File, _super);
    function File() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.virtuals = {
            url: function () {
                return absoluteUrl_1.absoluteUrl + this.get('relativePath');
            }
        };
        return _this;
    }
    Object.defineProperty(File.prototype, "tableName", {
        get: function () {
            return 'files';
        },
        enumerable: false,
        configurable: true
    });
    // one-to-one relationship with Movie
    File.prototype.movie = function () {
        return this.belongsTo(movies_1.Movie, 'id', 'posterId');
    };
    // one-to-one relationship with Actor
    File.prototype.actor = function () {
        return this.belongsTo(actors_1.Actor, 'id', 'recentPhotoId');
    };
    return File;
}(knexconfig_1.bookshelf.Model));
exports.File = File;
