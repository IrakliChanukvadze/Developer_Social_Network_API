import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Models } from '../interfaces/general';
import bcrypt from 'bcrypt';

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  image?: string;
  title: string;
  summary: string;
  role: 'Admin' | 'User';
  email: string;
  password: string;
}

export class User
  extends Model<UserAttributes, Optional<UserAttributes, 'id'>>
  implements UserAttributes
{
  id: number;
  firstName: string;
  lastName: string;
  image: string | null;
  title: string;
  summary: string;
  role: 'Admin' | 'User';
  email: string;
  password: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  async validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
  static defineSchema(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        firstName: {
          field: 'first_name',
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        lastName: {
          field: 'last_name',
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        image: {
          type: new DataTypes.STRING(256),
          allowNull: true,
          defaultValue: '',
        },
        title: {
          type: new DataTypes.STRING(256),
          allowNull: false,
        },
        summary: {
          type: new DataTypes.STRING(256),
          allowNull: false,
        },
        role: {
          type: new DataTypes.STRING(50),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'users',
        underscored: true,
        sequelize,
      },
    );
  }

  static associate(models: Models, sequelize: Sequelize) {
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
