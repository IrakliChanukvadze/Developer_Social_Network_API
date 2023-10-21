import { User } from '../models/user.model';
import { RegistrationRequest } from '../schemaValidators/authSchemaValidators/registration.schema';
import bcrypt from 'bcrypt';

export class UserService {
  async createNewUser(userData: RegistrationRequest) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create a new user
    const newUser = await User.create({
      firstName: userData.firstName,
      lastName: userData.lastName,
      title: userData.title,
      summary: userData.summary,
      email: userData.email,
      password: hashedPassword,
      role: 'User',
    });

    return newUser;
  }

  async getUsers(pageSize: number, page: number) {
    const limit = pageSize || 10; // Default page size
    const offset = (page - 1) * limit || 0; // Calculate offset based on the page

    const users = await User.findAll({
      limit,
      offset,
      attributes: [
        'id',
        'firstName',
        'lastName',
        'title',
        'summary',
        'email',
        'role',
      ],
    });
    return users;
  }

  async getUserCV(id: string) {
    const result = await User.findByPk(id, {
      include: [{ all: true }],
    });

    //@ts-ignore

    return result;
  }

  async getUserById(id: string) {
    const user = await User.findByPk(id, {
      attributes: [
        'id',
        'firstName',
        'lastName',
        'title',
        'summary',
        'email',
        'role',
      ],
    });

    return user;
  }

  async updateUser(id: string, userData: any) {
    userData.password = await bcrypt.hash(userData.password, 10);

    const userToUpdate = await this.getUserById(id);
    userToUpdate.update(userData);
    await userToUpdate.save();

    return userToUpdate;
  }

  async deleteUser(id: string): Promise<void> {
    const userToDelete = await this.getUserById(id);

    if (!userToDelete) {
      return null; // User not found
    }

    await userToDelete.destroy();
  }
}
