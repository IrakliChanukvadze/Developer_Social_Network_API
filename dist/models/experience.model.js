"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Experience = void 0;
const sequelize_1 = require("sequelize");
const user_model_1 = require("./user.model");
class Experience extends sequelize_1.Model {
    static defineSchema(sequelize) {
        Experience.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: user_model_1.User,
                    key: 'id',
                },
            },
            company_name: {
                type: new sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            role: {
                type: new sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            startDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            endDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
        }, {
            tableName: 'experiences',
            underscored: true,
            sequelize,
        });
    }
    static associate(models, sequelize) {
        // Define associations here, if needed.
        Experience.belongsTo(models.user, { foreignKey: 'user_id', as: 'user' });
    }
}
exports.Experience = Experience;
//# sourceMappingURL=experience.model.js.map