"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("./appError"));
function catchAsync(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                const errorMessage = 'The provided email is already in use.';
                return next(new appError_1.default(errorMessage, 400));
            }
            next(err);
        });
    };
}
exports.default = catchAsync;
//# sourceMappingURL=catchAsync.js.map