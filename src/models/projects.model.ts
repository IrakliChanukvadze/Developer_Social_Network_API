import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Models } from '../interfaces/general';
import { User } from './user.model';

export interface ProjectAttributes {
  id: number;
  image: string;
  description: string;
  user_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Project
  extends Model<ProjectAttributes, Optional<ProjectAttributes, 'id'>>
  implements ProjectAttributes
{
  id: number;
  image: string;
  description: string;
  user_id: number; // Include user_id

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static defineSchema(sequelize: Sequelize) {
    Project.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        image: {
          type: new DataTypes.STRING(256),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: User,
            key: 'id',
          },
        },
      },
      {
        tableName: 'projects',
        underscored: true,
        sequelize,
      },
    );
  }

  static associate(models: Models) {
    // Define associations here, if needed.
    Project.belongsTo(models.user, { foreignKey: 'user_id', as: 'user' });
  }
}
