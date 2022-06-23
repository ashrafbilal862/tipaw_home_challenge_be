"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const controllers_1 = require("../../controllers");
const userMutations = {
    updateUser: {
        type: types_1.UserType.UserType,
        args: {
            userId: { type: graphql_1.GraphQLString },
            updateBody: { type: types_1.UserType.UserUpdateBodyInput },
        },
        resolve: (...rest) => controllers_1.userController.updateUser(...rest),
    },
    deleteUser: {
        type: types_1.UserType.UserType,
        args: {
            userId: { type: graphql_1.GraphQLString },
        },
        resolve: (...rest) => controllers_1.userController.deleteUser(...rest),
    },
};
exports.default = userMutations;
