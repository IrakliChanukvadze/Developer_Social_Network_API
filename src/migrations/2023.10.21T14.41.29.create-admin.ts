import { loadSequelize } from '../loaders/sequelize';
import { config } from '../config';
import { loadModels } from '../loaders/models';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const sequelize = loadSequelize(config);
const { user } = loadModels(sequelize);

module.exports = {
  up: async () => {
    const hashedPassword = await bcrypt.hash(
      process.env.DEFAULT_ADMIN_PASS,
      10,
    );
    await user.create({
      firstName: 'Admin',
      lastName: 'Admin',
      title: 'Admin',
      summary: 'Admin',
      email: 'Admin@gmail.com',
      password: hashedPassword,
      role: 'Admin',
      image: '',
    });
  },

  down: async () => {
    await user.destroy({
      where: {
        email: 'Admin@gmail.com',
      },
    });
  },
};
