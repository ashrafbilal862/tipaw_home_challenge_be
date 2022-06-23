"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-nocheck
const express_1 = tslib_1.__importDefault(require("express"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const passport_1 = tslib_1.__importDefault(require("passport"));
const utils_1 = require("./utils");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const error_1 = require("./middleware/error");
const express_graphql_1 = require("express-graphql");
// import routes from "./routes/api/index";
const graphql_1 = tslib_1.__importDefault(require("./graphql"));
const validations_1 = require("./graphql/validations");
const app = (0, express_1.default)();
if (config_1.config.env !== "test") {
    app.use(config_1.morgan.successHandler);
    app.use(config_1.morgan.errorHandler);
}
// set security HTTP headers
// app.use(helmet()); // NOTE graphql gives error
// parse json request body
app.use(express_1.default.json());
// parse urlencoded request body
app.use(express_1.default.urlencoded({ extended: true }));
// gzip compression
app.use((0, compression_1.default)());
// enable cors
app.use((0, cors_1.default)(config_1.corsOptions));
// app.options('*', cors);
// jwt authentication
app.use(passport_1.default.initialize());
passport_1.default.use("jwt", config_1.jwtPassport.jwtStrategy);
// limit repeated failed requests to auth operations
// if (config.env === "production") {
//   app.use((req, res, next) => {
//     if (req.body.operationName === "auth") {
//       console.log("auth");
//       authLimiter(req, res, next);
//     }
//     next();
//   });
// }
app.use("/graphql", middleware_1.authLimiter);
app.use(middleware_1.auth);
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: graphql_1.default,
    validationRules: [validations_1.DisallowNoOperationName],
    // async customExecuteFn(args) {
    //   const result = await execute(args);
    //   if (args.operationName === "IntrospectionQuery") return result;
    //   const operationResult = result.data[args.operationName];
    //   if (!operationResult || operationResult.status.code >= 400) {
    //     throw new GraphQLError(
    //       operationResult.status.message || "Something went wrong"
    //     );
    //   }
    //   return result;
    // },
}));
// v1 api routes
// app.use("/api", routes);
// send back a 404 error for any unknown api request
app.use((req, _res, next) => {
    if (req.url !== "/graphql") {
        next(new utils_1.ApiError(http_status_1.default.NOT_FOUND, "api Not found"));
    }
    next();
});
// convert error to ApiError, if needed
app.use(error_1.errorConverter);
// handle error
app.use(error_1.errorHandler);
exports.default = app;
