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
exports.User = exports.UserRole = void 0;
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "Admin";
    UserRole["User"] = "User";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
class User extends sequelize_1.Model {
    validatePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt_1.default.compare(password, this.password);
        });
    }
    static defineSchema(sequelize) {
        User.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            firstName: {
                field: 'first_name',
                type: new sequelize_1.DataTypes.STRING(128),
                allowNull: false,
            },
            lastName: {
                field: 'last_name',
                type: new sequelize_1.DataTypes.STRING(128),
                allowNull: false,
            },
            image: {
                type: new sequelize_1.DataTypes.STRING(256),
                allowNull: true,
                defaultValue: '',
            },
            title: {
                type: new sequelize_1.DataTypes.STRING(256),
                allowNull: false,
            },
            summary: {
                type: new sequelize_1.DataTypes.STRING(256),
                allowNull: false,
            },
            role: {
                type: new sequelize_1.DataTypes.STRING(50),
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            tableName: 'users',
            underscored: true,
            sequelize,
        });
    }
    static associate(models, sequelize) {
        User.hasMany(models.experience, {
            foreignKey: 'user_id',
            as: 'experiences', // optional alias for the association
        });
        User.hasMany(models.feedback, {
            foreignKey: 'from_user',
            as: 'givenFeedbacks', // optional alias for the association
        });
        User.hasMany(models.feedback, {
            foreignKey: 'to_user',
            as: 'receivedFeedbacks', // optional alias for the association
        });
        User.hasMany(models.project, {
            foreignKey: 'user_id',
            as: 'projects', // optional alias for the association
        });
    }
}
exports.User = User;
//# sourceMappingURL=user.model.js.map