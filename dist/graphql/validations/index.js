"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisallowNoOperationName = void 0;
const graphql_1 = require("graphql");
const DisallowNoOperationName = (context) => {
    return {
        OperationDefinition: (node) => {
            const operationName = node.name;
            if (!operationName) {
                context.reportError(new graphql_1.GraphQLError(`Validation: Operation name is missing!`));
            }
        },
    };
};
exports.DisallowNoOperationName = DisallowNoOperationName;
