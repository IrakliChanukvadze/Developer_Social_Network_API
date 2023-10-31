import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Models } from '../interfaces/general';
import { User } from './user.model';

export interface ExperienceAttributes {
  id: number;
  user_id: number;
  company_name: string;
  role: string;
  startDate: Date;
  endDate: Date;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Experience
  extends Model<ExperienceAttributes, Optional<ExperienceAttributes, 'id'>>
  implements ExperienceAttributes
{
  id: number;
  user_id: number;
  company_name: string;
  role: string;
  startDate: Date;
  endDate: Date;
  description: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static defineSchema(sequelize: Sequelize) {
    Experience.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: User,
            key: 'id',
          },
        },
        company_name: {
          type: new DataTypes.STRING(255), // Adjust the max length as needed
          allowNull: false,
        },
        role: {
          type: new DataTypes.STRING(255), // Adjust the max length as needed
          allowNull: false,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        tableName: 'experiences',
        underscored: true,
        sequelize,
      },
    );
  }

  static associate(models: Models) {
    // Define associations here, if needed.
    Experience.belongsTo(models.user, { foreignKey: 'user_id', as: 'user' });
  }
}
