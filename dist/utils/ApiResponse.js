"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
// type responseStatus = 200 | 201 | 204 | 400 | 404 | 500;
// const messages = {
//   200: "OK",
//   201: "Accepted",
//   204: "No Content",
//   400: "Bad request",
//   404: "Not found",
//   500: "Internal server error",
// };
const ApiResponse = (err) => {
    return new graphql_1.GraphQLError((err === null || err === void 0 ? void 0 : err.message) || err || "Something went wrong");
};
exports.default = ApiResponse;
