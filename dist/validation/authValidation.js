"use strict";
exports.__esModule = true;
exports.loginValidation = exports.registerValidation = void 0;
var express_validator_1 = require("express-validator");
exports.registerValidation = [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 1 }),
    (0, express_validator_1.body)('name').isLength({ min: 1 }),
];
exports.loginValidation = [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 1 }),
];
