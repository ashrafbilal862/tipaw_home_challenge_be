"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const auth_mutation_1 = tslib_1.__importDefault(require("./auth.mutation"));
const user_mutation_1 = tslib_1.__importDefault(require("./user.mutation"));
const RootMutations = new graphql_1.GraphQLObjectType({
    name: "RootMutation",
    fields: Object.assign(Object.assign({}, user_mutation_1.default), auth_mutation_1.default),
});
exports.default = RootMutations;
