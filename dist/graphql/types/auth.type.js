"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const _1 = require(".");
const TokenType = new graphql_1.GraphQLObjectType({
    name: "Token",
    fields: () => ({
        expires: { type: graphql_1.GraphQLString },
        token: { type: graphql_1.GraphQLString },
    }),
});
const TokensType = new graphql_1.GraphQLObjectType({
    name: "Tokens",
    fields: () => ({
        access: { type: TokenType },
        refresh: { type: TokenType },
    }),
});
const LoginType = new graphql_1.GraphQLObjectType({
    name: "Login",
    fields: () => ({
        user: { type: _1.UserType.UserType },
        tokens: { type: TokensType },
    }),
});
const RegisterType = new graphql_1.GraphQLObjectType({
    name: "Register",
    fields: () => ({
        user: { type: _1.UserType.UserType },
        tokens: { type: TokensType },
    }),
});
const RefreshTokenType = new graphql_1.GraphQLObjectType({
    name: "RefreshToken",
    fields: () => ({
        user: { type: _1.UserType.UserType },
        tokens: { type: TokensType },
    }),
});
exports.default = {
    TokenType,
    TokensType,
    LoginType,
    RegisterType,
    RefreshTokenType,
};
