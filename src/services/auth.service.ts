import { User } from '../models/user.model';
import AppError from '../utils/appError';
import bcrypt from 'bcrypt';
import { RegistrationRequest } from '../schemaValidators/authSchemaValidators/registration.schema';
import { LoginRequest } from '../schemaValidators/authSchemaValidators/login.schema';
import comparePasswords from '../utils/comparePasswords';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class AuthService {
  async createNewUser(userData: RegistrationRequest, image: any) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create a new user
    const newUser = await User.create({
      firstName: userData.firstName,
      lastName: userData.lastName,
      title: userData.title,
      summary: userData.summary,
      email: userData.email,
      password: hashedPassword,
      role: userData.role as 'Admin' | 'User',
      image: image.filename,
    });

    return newUser;
  }

  async getSingleUser(email: string) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async authenticateUser(body: LoginRequest) {
    const userFromBase = await this.getSingleUser(body.email);

    if (!userFromBase) {
      throw new AppError("User with that id couldn't find", 400);
    }
    if (await comparePasswords(body.password, userFromBase.password)) {
      const token = jwt.sign(
        { id: userFromBase.id, email: userFromBase.email },
        process.env.SECRET_KEY,
        {
          expiresIn: '90d',
        },
      );
      return { user: userFromBase, token };
    } else {
      throw new AppError('Incorrect email or pass', 401);
    }
  }
}
