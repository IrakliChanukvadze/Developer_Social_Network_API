import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Models } from '../interfaces/general';
import { User } from './user.model';

export interface FeedbackAttributes {
  id: number;
  from_user: number;
  to_user: number;
  content: string;
  company_name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Feedback
  extends Model<FeedbackAttributes, Optional<FeedbackAttributes, 'id'>>
  implements FeedbackAttributes
{
  id: number;
  from_user: number;
  to_user: number;
  content: string;
  company_name: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static defineSchema(sequelize: Sequelize) {
    Feedback.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        from_user: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: User,
            key: 'id',
          },
        },
        to_user: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: User,
            key: 'id',
          },
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        company_name: {
          type: new DataTypes.STRING(255), // Adjust the max length as needed
          allowNull: false,
        },
      },
      {
        tableName: 'feedbacks',
        underscored: true,
        sequelize,
      },
    );
  }

  static associate(models: Models, sequelize: Sequelize) {
    // Define associations here, if needed.
    Feedback.belongsTo(models.user, {
      foreignKey: 'from_user',
      as: 'fromUser',
    });
    Feedback.belongsTo(models.user, { foreignKey: 'to_user', as: 'toUser' });
  }
}
