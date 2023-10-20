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
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserService {
    createNewUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
            // Create a new user
            const newUser = yield user_model_1.User.create({
                firstName: userData.firstName,
                lastName: userData.lastName,
                title: userData.title,
                summary: userData.summary,
                email: userData.email,
                password: hashedPassword,
                role: 'User',
            });
            return newUser;
        });
    }
    getUsers(pageSize, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = pageSize || 10; // Default page size
            const offset = (page - 1) * limit || 0; // Calculate offset based on the page
            const users = yield user_model_1.User.findAll({
                limit,
                offset,
                attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'title',
                    'summary',
                    'email',
                    'role',
                ],
            });
            return users;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findByPk(id, {
                attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'title',
                    'summary',
                    'email',
                    'role',
                ],
            });
            return user;
        });
    }
    updateUser(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            userData.password = yield bcrypt_1.default.hash(userData.password, 10);
            const userToUpdate = yield this.getUserById(id);
            userToUpdate.update(userData);
            yield userToUpdate.save();
            return userToUpdate;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToDelete = yield this.getUserById(id);
            if (!userToDelete) {
                return null; // User not found
            }
            yield userToDelete.destroy();
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map