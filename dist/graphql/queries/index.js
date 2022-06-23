"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const auth_queries_1 = tslib_1.__importDefault(require("./auth.queries"));
const user_queries_1 = tslib_1.__importDefault(require("./user.queries"));
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: Object.assign(Object.assign({}, user_queries_1.default), auth_queries_1.default),
});
exports.default = RootQuery;
