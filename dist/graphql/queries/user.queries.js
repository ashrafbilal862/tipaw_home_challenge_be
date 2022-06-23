"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types/");
const controllers_1 = require("../../controllers");
const userQueries = {
    queryUsers: {
        type: (0, graphql_1.GraphQLList)(types_1.UserType.UserType),
        args: {
            filters: { type: types_1.UserType.QueryUsersFilterType },
        },
        resolve: (...rest) => controllers_1.userController.getUsers(...rest),
    },
    getUser: {
        type: types_1.UserType.UserType,
        args: { userId: { type: graphql_1.GraphQLString } },
        resolve: (...rest) => controllers_1.userController.getUser(...rest),
    },
};
exports.default = userQueries;
