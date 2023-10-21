import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    // Assuming 'User' is a Sequelize Model defined using sequelize-typescript
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'default_user',
          email: 'user@example.com',
          password: 'hashed_password', // Replace with a hashed password
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
