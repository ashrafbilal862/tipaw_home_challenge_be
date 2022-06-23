"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const passport_jwt_1 = require("passport-jwt");
const _1 = require("./");
const _2 = require("./");
const services_1 = require("../services");
const jwtOptions = {
    secretOrKey: _1.config.jwt.secret,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const jwtVerify = (payload, done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        if (payload.type !== _2.token.tokenTypes.ACCESS) {
            throw new Error("Invalid token type");
        }
        const user = yield services_1.userService.getUserById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
});
const jwtStrategy = new passport_jwt_1.Strategy(jwtOptions, jwtVerify);
exports.default = {
    jwtStrategy,
};
