"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.authUser = exports.loginUser = exports.createUser = exports.updateSomeUsers = exports.updateUserData = exports.deleteSomeUsers = exports.getUserById = exports.getUserByEmail = exports.getUsers = void 0;
var user_1 = require("../models/user");
var createAuthUserData_1 = require("../utils/createAuthUserData");
var throwError_1 = require("../utils/throwError");
var createUsersData_1 = require("../utils/createUsersData");
var createData_1 = require("../utils/createData");
var bcrypt = require("bcrypt");
var getUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.User.find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, users.map(function (user) { return (0, createUsersData_1.createUsersData)(user); })];
            case 2:
                error_1 = _a.sent();
                (0, throwError_1.throwError)();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var getUserByEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.User.findOne({ email: new RegExp(email) })];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                error_2 = _a.sent();
                (0, throwError_1.throwError)();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserByEmail = getUserByEmail;
var getUserById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.User.findById(id)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                error_3 = _a.sent();
                (0, throwError_1.throwError)();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
var deleteSomeUsers = function (users) { return __awaiter(void 0, void 0, void 0, function () {
    var error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, user_1.User.deleteMany({ _id: { $in: users.id } })];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, exports.getUsers)()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_4 = _a.sent();
                return [2 /*return*/, (0, throwError_1.throwError)()];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteSomeUsers = deleteSomeUsers;
var updateUserData = function (id, updateData) { return __awaiter(void 0, void 0, void 0, function () {
    var error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.User.findByIdAndUpdate(id, updateData, { upsert: true })];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                error_5 = _a.sent();
                (0, throwError_1.throwError)();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUserData = updateUserData;
var updateSomeUsers = function (users, data) { return __awaiter(void 0, void 0, void 0, function () {
    var error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, user_1.User.updateMany({ _id: { $in: users } }, { $set: { status: data } })];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, exports.getUsers)()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_6 = _a.sent();
                return [2 /*return*/, (0, throwError_1.throwError)()];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateSomeUsers = updateSomeUsers;
var createUser = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var timeLastLogin, status_1, userNew, salt, _a, user, creatingUser, userSend, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                timeLastLogin = new Date();
                status_1 = 'active';
                userNew = __assign(__assign({}, payload), { timeLastLogin: timeLastLogin, status: status_1 });
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 1:
                salt = _b.sent();
                _a = userNew;
                return [4 /*yield*/, bcrypt.hash(userNew.password, salt)];
            case 2:
                _a.password = _b.sent();
                user = new user_1.User(__assign({}, userNew));
                return [4 /*yield*/, user.save()];
            case 3:
                creatingUser = _b.sent();
                userSend = (0, createAuthUserData_1.createAuthUserData)(creatingUser);
                return [4 /*yield*/, userSend];
            case 4: return [2 /*return*/, _b.sent()];
            case 5:
                error_7 = _b.sent();
                (0, throwError_1.throwError)();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var loginUser = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var user, isValidPassword, userUpdate, userSend, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                return [4 /*yield*/, (0, exports.getUserByEmail)(payload.email)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 7];
                return [4 /*yield*/, bcrypt.compare(payload.password, user.password)];
            case 2:
                isValidPassword = _a.sent();
                if (!isValidPassword) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, exports.updateUserData)(user._id, { timeLastLogin: (0, createData_1.createData)() })];
            case 3:
                userUpdate = _a.sent();
                userSend = (0, createAuthUserData_1.createAuthUserData)(userUpdate);
                return [4 /*yield*/, userSend];
            case 4: return [2 /*return*/, _a.sent()];
            case 5: return [2 /*return*/, (0, throwError_1.throwError)()];
            case 6: return [3 /*break*/, 8];
            case 7: return [2 /*return*/, (0, throwError_1.throwError)()];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_8 = _a.sent();
                (0, throwError_1.throwError)();
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
var authUser = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userSend, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, (0, exports.getUserById)(id)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                userSend = (0, createAuthUserData_1.createAuthUserData)(user);
                return [4 /*yield*/, userSend];
            case 2: return [2 /*return*/, _a.sent()];
            case 3: return [2 /*return*/, null];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_9 = _a.sent();
                return [2 /*return*/, null];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.authUser = authUser;
