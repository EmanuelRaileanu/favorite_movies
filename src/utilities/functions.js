"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getLanguageId = exports.getActorId = exports.getProductionCrewMemberId = exports.getCountryId = exports.getCategoryId = exports.getProductionCompanyId = exports.getContentRatingId = exports.getProductionCrewTypeId = exports.getNationalityId = exports.checkIfLanguageExists = exports.checkIfProductionCompanyExists = exports.checkIfProductionCrewMemberExists = exports.checkIfActorExistsByName = exports.checkIfActorExists = exports.checkIfNationalityExists = exports.checkIfAwardExists = exports.checkIfDegreeExists = exports.checkIfInstitutionExists = exports.checkIfMovieExistsByTitle = exports.checkIfMovieExists = exports.checkIfCategoryExists = void 0;
var movie_categories_1 = require("../entities/movie_categories");
var movies_1 = require("../entities/movies");
var actors_1 = require("../entities/actors");
var nationalities_1 = require("../entities/nationalities");
var institutions_1 = require("../entities/institutions");
var degrees_1 = require("../entities/degrees");
var award_list_1 = require("../entities/award_list");
var production_crew_types_1 = require("../entities/production_crew_types");
var content_ratings_1 = require("../entities/content_ratings");
var production_crew_1 = require("../entities/production_crew");
var production_companies_1 = require("../entities/production_companies");
var countries_1 = require("../entities/countries");
var languages_1 = require("../entities/languages");
function checkIfCategoryExists(categoryId) {
    return __awaiter(this, void 0, void 0, function () {
        var find;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new movie_categories_1.MovieCategory({ id: categoryId }).fetch({ require: false })];
                case 1:
                    find = _a.sent();
                    if (!find) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.checkIfCategoryExists = checkIfCategoryExists;
function checkIfMovieExists(id) {
    return __awaiter(this, void 0, void 0, function () {
        var find;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new movies_1.Movie({ id: id }).fetch({ require: false })];
                case 1:
                    find = _a.sent();
                    if (!find) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.checkIfMovieExists = checkIfMovieExists;
function checkIfMovieExistsByTitle(title) {
    return __awaiter(this, void 0, void 0, function () {
        var find;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new movies_1.Movie({ title: title }).fetch({ require: false })];
                case 1:
                    find = _a.sent();
                    if (!find) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.checkIfMovieExistsByTitle = checkIfMovieExistsByTitle;
function checkIfInstitutionExists(id) {
    return __awaiter(this, void 0, void 0, function () {
        var find;
        return __generator(this, function (_a) {
            find = new institutions_1.Institution({ id: id }).fetch({ require: false });
            if (!find) {
                return [2 /*return*/, false];
            }
            return [2 /*return*/, true];
        });
    });
}
exports.checkIfInstitutionExists = checkIfInstitutionExists;
function checkIfDegreeExists(id) {
    return __awaiter(this, void 0, void 0, function () {
        var find;
        return __generator(this, function (_a) {
            find = new degrees_1.Degree({ id: id }).fetch({ require: false });
            if (!find) {
                return [2 /*return*/, false];
            }
            return [2 /*return*/, true];
        });
    });
}
exports.checkIfDegreeExists = checkIfDegreeExists;
function checkIfAwardExists(id) {
    return __awaiter(this, void 0, void 0, function () {
        var find;
        return __generator(this, function (_a) {
            find = new award_list_1.AwardName({ id: id }).fetch({ require: false });
            if (!find) {
                return [2 /*return*/, false];
            }
            return [2 /*return*/, true];
        });
    });
}
exports.checkIfAwardExists = checkIfAwardExists;
function checkIfNationalityExists(nationality) {
    return __awaiter(this, void 0, void 0, function () {
        var find;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new nationalities_1.Nationality({ nationality: nationality }).fetch({ require: false })];
                case 1:
                    find = _a.sent();
                    if (!find) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.checkIfNationalityExists = checkIfNationalityExists;
function checkIfActorExists(id) {
    return __awaiter(this, void 0, void 0, function () {
        var find;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new actors_1.Actor({ id: id }).fetch({ require: false })];
                case 1:
                    find = _a.sent();
                    if (!find) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.checkIfActorExists = checkIfActorExists;
function checkIfActorExistsByName(name) {
    return __awaiter(this, void 0, void 0, function () {
        var find;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new actors_1.Actor(name).fetch({ require: false })];
                case 1:
                    find = _a.sent();
                    if (!find) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.checkIfActorExistsByName = checkIfActorExistsByName;
function checkIfProductionCrewMemberExists(name) {
    return __awaiter(this, void 0, void 0, function () {
        var find;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new production_crew_1.ProductionCrew(name).fetch({ require: false })];
                case 1:
                    find = _a.sent();
                    if (!find) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.checkIfProductionCrewMemberExists = checkIfProductionCrewMemberExists;
function checkIfProductionCompanyExists(name) {
    return __awaiter(this, void 0, void 0, function () {
        var find;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new production_companies_1.ProductionCompany({ name: name }).fetch({ require: false })];
                case 1:
                    find = _a.sent();
                    if (!find) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.checkIfProductionCompanyExists = checkIfProductionCompanyExists;
function checkIfLanguageExists(language) {
    return __awaiter(this, void 0, void 0, function () {
        var find;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new languages_1.Language(language).fetch({ require: false })];
                case 1:
                    find = _a.sent();
                    if (!find) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.checkIfLanguageExists = checkIfLanguageExists;
function getNationalityId(nationality) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new nationalities_1.Nationality({ nationality: nationality }).fetch({ require: false })];
                case 1: return [4 /*yield*/, (_a.sent()).get('id')];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getNationalityId = getNationalityId;
function getProductionCrewTypeId(type) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new production_crew_types_1.ProductionCrewType({ type: type }).fetch({ require: false })];
                case 1: return [4 /*yield*/, (_a.sent()).get('id')];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getProductionCrewTypeId = getProductionCrewTypeId;
function getContentRatingId(rating) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new content_ratings_1.ContentRating({ rating: rating }).fetch({ require: false })];
                case 1: return [4 /*yield*/, (_a.sent()).get('id')];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getContentRatingId = getContentRatingId;
function getProductionCompanyId(name) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new production_companies_1.ProductionCompany({ name: name }).fetch({ require: false })];
                case 1: return [4 /*yield*/, (_a.sent()).get('id')];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getProductionCompanyId = getProductionCompanyId;
function getCategoryId(category) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new movie_categories_1.MovieCategory({ category: category }).fetch({ require: false })];
                case 1: return [4 /*yield*/, (_a.sent()).get('id')];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getCategoryId = getCategoryId;
function getCountryId(countryName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new countries_1.Country({ countryName: countryName }).fetch({ require: false })];
                case 1: return [4 /*yield*/, (_a.sent()).get('id')];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getCountryId = getCountryId;
function getProductionCrewMemberId(name) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new production_crew_1.ProductionCrew(name).fetch({ require: false })];
                case 1: return [4 /*yield*/, (_a.sent()).get('id')];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getProductionCrewMemberId = getProductionCrewMemberId;
function getActorId(name) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new actors_1.Actor(name).fetch({ require: false })];
                case 1: return [4 /*yield*/, (_a.sent()).get('id')];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getActorId = getActorId;
function getLanguageId(language) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new languages_1.Language({ language: language }).fetch({ require: false })];
                case 1: return [4 /*yield*/, (_a.sent()).get('id')];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getLanguageId = getLanguageId;
