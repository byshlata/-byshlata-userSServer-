"use strict";
exports.__esModule = true;
exports.decipherToken = void 0;
var jwt = require('jsonwebtoken');
var decipherToken = function (token, secret) { return (jwt.verify(token, secret))._id; };
exports.decipherToken = decipherToken;
