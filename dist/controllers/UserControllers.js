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
const user_service_1 = require("../services/user.service");
const createUser_schema_1 = require("../schemaValidators/userValidators/createUser.schema");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const updateUser_schema_1 = require("../schemaValidators/userValidators/updateUser.schema");
const userServices = new user_service_1.UserService();
class UserControllers {
    constructor() {
        this.schemas = {
            createUserSchema: createUser_schema_1.createUserSchema,
            updateUserSchema: updateUser_schema_1.updateUserSchema,
        };
        this.createNewUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const newTodo = yield userServices.createNewUser(req.body);
            res.status(201).json({ status: 'success', data: newTodo });
        }));
        this.getUsers = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { page, limit } = req.query;
            // Define default values for page and limit
            const defaultPage = 1;
            const defaultLimit = 10;
            // Parse page and limit as integers, use default values if not provided
            const parsedPage = page ? parseInt(page, 10) : defaultPage;
            const parsedLimit = limit ? parseInt(limit, 10) : defaultLimit;
            const users = yield userServices.getUsers(parsedLimit, parsedPage);
            res.status(200).json({ users });
        }));
        this.getUserById = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield userServices.getUserById(id);
            if (!user) {
                return next(new appError_1.default('User not found', 404));
            }
            res.status(200).json(user);
        }));
        this.updateUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userData = req.body;
            const updatedUser = yield userServices.updateUser(id, userData);
            if (!updatedUser) {
                return next(new appError_1.default('User not found', 404));
            }
            res.status(200).json(updatedUser);
        }));
        this.deleteUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield userServices.deleteUser(id);
            res.status(204).send();
        }));
    }
}
exports.default = UserControllers;
//# sourceMappingURL=UserControllers.js.map