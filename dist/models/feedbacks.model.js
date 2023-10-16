"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
const sequelize_1 = require("sequelize");
const user_model_1 = require("./user.model");
class Feedback extends sequelize_1.Model {
    static defineSchema(sequelize) {
        Feedback.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            from_user: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: user_model_1.User,
                    key: 'id',
                },
            },
            to_user: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: user_model_1.User,
                    key: 'id',
                },
            },
            content: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            company_name: {
                type: new sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
        }, {
            tableName: 'feedbacks',
            underscored: true,
            sequelize,
        });
    }
    static associate(models, sequelize) {
        // Define associations here, if needed.
        Feedback.belongsTo(models.user, {
            foreignKey: 'from_user',
            as: 'fromUser',
        });
        Feedback.belongsTo(models.user, { foreignKey: 'to_user', as: 'toUser' });
    }
}
exports.Feedback = Feedback;
//# sourceMappingURL=feedbacks.model.js.map