"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../../controllers");
const graphql_1 = require("graphql");
const types_1 = require("../types");
const authQueries = {
    login: {
        type: types_1.AuthType.LoginType,
        args: {
            email: { type: graphql_1.GraphQLString },
            password: { type: graphql_1.GraphQLString },
        },
        resolve: (...rest) => controllers_1.authController.login(...rest),
    },
};
exports.default = authQueries;
