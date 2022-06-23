"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../utils");
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const AuthRoutes = ["login", "register", "IntrospectionQuery"];
const verifySecurityHeader = (header) => {
    try {
        const accessToken = header.split(" ")[1];
        const result = jsonwebtoken_1.default.verify(accessToken, config_1.config.jwt.secret);
        return !!result;
    }
    catch (error) {
        throw new utils_1.ApiError(http_status_1.default.UNAUTHORIZED, "Please authenticate");
    }
};
const auth = (req, _res, next) => {
    const operationName = req.body.operationName;
    if (AuthRoutes.includes(operationName)) {
        next();
        return;
    }
    const isVerified = verifySecurityHeader(req.headers.authorization);
    if (isVerified) {
        next();
    }
    else {
        throw new utils_1.ApiError(http_status_1.default.UNAUTHORIZED, "Please authenticate");
    }
};
exports.default = auth;
