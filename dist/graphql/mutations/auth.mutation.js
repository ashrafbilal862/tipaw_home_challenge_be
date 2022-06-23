"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const controllers_1 = require("../../controllers");
const authMutations = {
    createUser: {
        type: types_1.AuthType.RegisterType,
        args: {
            firstName: { type: graphql_1.GraphQLString },
            lastName: { type: graphql_1.GraphQLString },
            email: { type: graphql_1.GraphQLString },
            password: { type: graphql_1.GraphQLString },
            acceptedTerms: { type: graphql_1.GraphQLBoolean },
        },
        resolve: (...rest) => controllers_1.authController.register(...rest),
    },
    logout: {
        type: types_1.ResponseType.ResponseType,
        args: {
            refreshToken: { type: graphql_1.GraphQLString },
        },
        resolve: (...rest) => controllers_1.authController.logout(...rest),
    },
    refreshToken: {
        type: types_1.AuthType.RefreshTokenType,
        args: {
            refreshToken: { type: graphql_1.GraphQLString },
        },
        resolve: (...rest) => controllers_1.authController.refreshToken(...rest),
    },
};
exports.default = authMutations;
