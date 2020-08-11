"use strict";
exports.__esModule = true;
exports.absoluteUrl = void 0;
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
exports.absoluteUrl = "http://" + process.env.API_URL + ":" + process.env.SERVER_PORT + "/";
