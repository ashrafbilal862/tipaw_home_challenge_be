"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const logger_1 = tslib_1.__importDefault(require("./logger"));
const prisma = new client_1.PrismaClient();
const connect = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$connect();
        logger_1.default.info("DB connected");
    }
    catch (err) {
        logger_1.default.error((err === null || err === void 0 ? void 0 : err.message) || "Database connection failed");
    }
});
exports.connect = connect;
exports.default = prisma;
