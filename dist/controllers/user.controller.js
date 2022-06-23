"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../utils");
const services_1 = require("../services");
const createUser = (_parent, args, _context, _info) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log("createUser, success", args);
});
const getUser = (_parent, args, _context, _info) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield services_1.userService.getUserById(args.userId);
        return user;
    }
    catch (err) {
        throw (0, utils_1.ApiResponse)(err);
    }
});
const getUsers = (_parent, args, _req, _gql) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield services_1.userService.queryUsers(args.filters);
        return users;
    }
    catch (err) {
        throw (0, utils_1.ApiResponse)(err);
    }
});
const updateUser = (_parent, args, _context, _info) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield services_1.userService.updateUserById(args.userId, args.updateBody);
        return user;
    }
    catch (err) {
        throw (0, utils_1.ApiResponse)(err);
    }
});
const deleteUser = (_parent, args, _context, _info) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield services_1.userService.deleteUserById(args.userId);
        return user;
    }
    catch (err) {
        throw (0, utils_1.ApiResponse)(err);
    }
});
exports.default = {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
};
