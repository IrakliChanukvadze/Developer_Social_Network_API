"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdminPermission = void 0;
const user_model_1 = require("../../models/user.model");
const appError_1 = __importDefault(require("../../utils/appError"));
const checkAdminPermission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFromBase = yield user_model_1.User.findOne({
        //@ts-ignore
        where: { email: req === null || req === void 0 ? void 0 : req.user.email },
    });
    //@ts-ignore
    const permision = userFromBase.role === 'Admin';
    if (permision) {
        next();
    }
    else {
        next(new appError_1.default('Sorry you dont have permission', 400));
    }
});
exports.checkAdminPermission = checkAdminPermission;
//# sourceMappingURL=checkAdminPermision.js.map