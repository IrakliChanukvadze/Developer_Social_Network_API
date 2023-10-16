"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const sequelize_1 = require("sequelize");
const user_model_1 = require("./user.model");
class Project extends sequelize_1.Model {
    static defineSchema(sequelize) {
        Project.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            image: {
                type: new sequelize_1.DataTypes.STRING(256),
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: user_model_1.User,
                    key: 'id',
                },
            },
        }, {
            tableName: 'projects',
            underscored: true,
            sequelize,
        });
    }
    static associate(models, sequelize) {
        // Define associations here, if needed.
        Project.belongsTo(models.user, { foreignKey: 'user_id' });
    }
}
exports.Project = Project;
//# sourceMappingURL=projects.model.js.map