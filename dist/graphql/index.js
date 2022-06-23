"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const mutations_1 = tslib_1.__importDefault(require("./mutations"));
const queries_1 = tslib_1.__importDefault(require("./queries"));
const schema = new graphql_1.GraphQLSchema({ query: queries_1.default, mutation: mutations_1.default });
exports.default = schema;
