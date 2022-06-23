"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ResponseType = new graphql_1.GraphQLObjectType({
    name: "Response",
    fields: () => ({
        status: { type: graphql_1.GraphQLInt },
        message: { type: graphql_1.GraphQLString },
    }),
});
exports.default = { ResponseType };
