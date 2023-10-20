"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidator = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const schemaValidator = (schema) => {
    return (req, res, next) => {
        if (!schema)
            next();
        const { error } = schema.validate(req.body);
        const valid = !error;
        if (valid) {
            next();
        }
        else {
            const { details } = error;
            const message = details
                .map((i) => i.message)
                .join(',');
            next(new appError_1.default(message, 422));
        }
    };
};
exports.schemaValidator = schemaValidator;
//# sourceMappingURL=schemaValidator.js.map