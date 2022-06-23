"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const config_1 = require("../config");
const config_2 = require("../config/");
/**
 * Generate token
 */
const generateToken = (userId, expires, type, secret = config_1.config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: (0, moment_1.default)().unix(),
        exp: expires.unix(),
        type,
    };
    return jsonwebtoken_1.default.sign(payload, secret);
};
/**
 * Save a token
 */
const saveToken = (token, userId, expires, type, _blacklisted = false) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const tokenDoc = yield config_1.prisma.token.create({
        data: {
            token,
            userId,
            expires: expires.toDate(),
            type,
        },
    });
    return tokenDoc;
});
/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = (token, type) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const payload = jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret);
    const tokenDoc = yield config_1.prisma.token.findFirst({
        where: {
            token,
            type,
            userId: payload.sub.toString(),
        },
    });
    if (!tokenDoc) {
        throw new Error("Token not found");
    }
    return tokenDoc;
});
/**
 * Generate auth tokens
 */
const generateAuthTokens = (user) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const accessTokenExpires = (0, moment_1.default)().add(config_1.config.jwt.accessExpirationMinutes, "minutes");
    const accessToken = generateToken(user.id, accessTokenExpires, config_2.token.tokenTypes.ACCESS);
    const refreshTokenExpires = (0, moment_1.default)().add(config_1.config.jwt.refreshExpirationDays, "days");
    const refreshToken = generateToken(user.id, refreshTokenExpires, config_2.token.tokenTypes.REFRESH);
    yield saveToken(refreshToken, user.id, refreshTokenExpires, config_2.token.tokenTypes.REFRESH);
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
});
/**
 * get Token
 */
const getToken = (searchBody) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const response = yield config_1.prisma.token.findFirst({
        where: Object.assign({}, searchBody),
    });
    return response;
});
/**
 * Delete Token by id
 */
const deleteTokenById = (tokenId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const response = yield config_1.prisma.token.delete({
        where: {
            id: tokenId,
        },
    });
    return response;
});
// /**
//  * Generate reset password token
//  */
// const generateResetPasswordToken = async (email) => {
//   const user = await userService.getUserByEmail(email);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
//   }
//   const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
//   const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
//   await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);
//   return resetPasswordToken;
// };
// /**
//  * Generate verify email token
//  */
// const generateVerifyEmailToken = async (user) => {
//   const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
//   const verifyEmailToken = generateToken(user.id, expires, tokenTypes.VERIFY_EMAIL);
//   await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
//   return verifyEmailToken;
// };
exports.default = {
    generateToken,
    saveToken,
    verifyToken,
    generateAuthTokens,
    deleteTokenById,
    getToken,
    // generateResetPasswordToken,
    // generateVerifyEmailToken,
};
