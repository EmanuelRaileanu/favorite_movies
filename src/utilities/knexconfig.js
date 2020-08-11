"use strict";
exports.__esModule = true;
exports.bookshelf = exports.knex = void 0;
var knex_1 = require("knex");
var config = require("../../knexfile.js");
var bookshelf_1 = require("bookshelf");
exports.knex = knex_1["default"](config.development);
exports.bookshelf = bookshelf_1["default"](exports.knex);
exports.bookshelf.plugin('bookshelf-virtuals-plugin');
