"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-nocheck
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const services_1 = require("../services");
const register = (_parent, args, _context, _info) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield services_1.userService.createUser(args);
    const tokens = yield services_1.tokenService.generateAuthTokens(user);
    return { user, tokens };
});
const login = (_parent, args, _context, _info) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = args;
    const user = yield services_1.authService.loginUserWithEmailAndPassword(email, password);
    const tokens = yield services_1.tokenService.generateAuthTokens(user);
    return { user, tokens };
});
const logout = (_parent, args, _context, _info) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield services_1.authService.logout(args.refreshToken);
    return {
        status: http_status_1.default.OK,
        message: "Logged out",
    };
});
const refreshToken = (_parent, args, _context, _info) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { user, tokens } = yield services_1.authService.refreshAuth(args.refreshToken);
    return { user, tokens };
});
exports.default = {
    register,
    login,
    logout,
    refreshToken,
};
