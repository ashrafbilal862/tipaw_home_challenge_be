"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const _1 = require("./");
const ApiError_1 = tslib_1.__importDefault(require("../utils/ApiError"));
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const config_1 = require("../config/");
/**
 * Login with username and password
 */
const loginUserWithEmailAndPassword = (email, password) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield _1.userService.getUserByEmail(email);
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Incorrect email or password");
    }
    return user;
});
/**
 * Logout
 */
const logout = (refreshToken) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const refreshTokenDoc = yield _1.tokenService.getToken({
        token: refreshToken,
        type: config_1.token.tokenTypes.REFRESH,
    });
    if (!refreshTokenDoc) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Not found");
    }
    // await refreshTokenDoc.remove();
    yield _1.tokenService.deleteTokenById(refreshTokenDoc.id);
});
/**
 * Refresh auth tokens
 */
const refreshAuth = (refreshToken) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshTokenDoc = yield _1.tokenService.verifyToken(refreshToken, config_1.token.tokenTypes.REFRESH);
        const user = yield _1.userService.getUserById(refreshTokenDoc.userId);
        if (!user) {
            throw new Error();
        }
        yield _1.tokenService.deleteTokenById(refreshTokenDoc.id);
        const tokens = yield _1.tokenService.generateAuthTokens(user);
        return {
            user,
            tokens,
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Authentication failed, please login again");
    }
});
exports.default = {
    loginUserWithEmailAndPassword,
    logout,
    refreshAuth,
};
