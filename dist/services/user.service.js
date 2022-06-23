"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_status_1 = tslib_1.__importDefault(require("http-status"));
// import { User } from '../models';
const ApiError_1 = tslib_1.__importDefault(require("../utils/ApiError"));
const config_1 = require("../config");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
/**
 * Create a user
 */
const createUser = (userBody) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = userBody;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 8);
    const user = yield config_1.prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
        },
    });
    return user;
});
/**
 * Query for users
 */
const queryUsers = (filter) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const limit = filter.limit || 10;
    const skip = (filter.page - 1) * limit || 0;
    const users = yield config_1.prisma.user.findMany({
        skip,
        take: limit,
    });
    return users;
});
/**
 * Get user by id
 */
const getUserById = (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield config_1.prisma.user.findUnique({
        where: {
            id,
        },
    });
});
/**
 * Get user by email
 */
const getUserByEmail = (email) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield config_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
});
/**
 * Check if email is taken by another user
 */
const isEmailTaken = (email, userId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield config_1.prisma.user.findFirst({
        where: {
            email: email,
            NOT: {
                id: userId,
            },
        },
    });
});
/**
 * Update user by id
 */
const updateUserById = (userId, updateBody) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUserById(userId);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (updateBody.email && (yield isEmailTaken(updateBody.email, user.id))) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Email already taken");
    }
    const updatedUser = yield config_1.prisma.user.update({
        where: {
            id: userId,
        },
        data: updateBody,
    });
    return updatedUser;
});
/**
 * Delete user by id
 */
const deleteUserById = (userId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const result = yield config_1.prisma.user.delete({
        where: {
            id: userId,
        },
    });
    return result;
});
exports.default = {
    createUser,
    queryUsers,
    isEmailTaken,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
};
