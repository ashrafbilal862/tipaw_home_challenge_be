"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const UserType = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        firstName: { type: graphql_1.GraphQLString },
        lastName: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString },
        isEmailVerified: { type: graphql_1.GraphQLBoolean },
    }),
});
const QueryUsersFilterType = new graphql_1.GraphQLInputObjectType({
    name: "QueryUsersFilter",
    fields: () => ({
        page: { type: graphql_1.GraphQLInt },
        limit: { type: graphql_1.GraphQLInt },
    }),
});
const UserUpdateBodyInput = new graphql_1.GraphQLInputObjectType({
    name: "UserUpdateBody",
    fields: () => ({
        firstName: { type: graphql_1.GraphQLString },
        lastName: { type: graphql_1.GraphQLString },
    }),
});
exports.default = { UserType, UserUpdateBodyInput, QueryUsersFilterType };
