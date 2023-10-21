import { Experience, ExperienceAttributes } from '../models/experience.model';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';
dotenv.config();
export class ExperienceService {
  async createExperience(experienceData: ExperienceAttributes) {
    const newExperiences = await Experience.create(experienceData);

    return newExperiences;
  }

  async getExperiences(page: number, pageSize: number) {
    const limit = pageSize || 10; // Default page size
    const offset = (page - 1) * limit || 0; // Calculate offset based on the page

    const experiences = await Experience.findAll();

    return experiences;
  }

  async getExperienceById(id: string) {
    const user = await Experience.findByPk(id);

    return user;
  }

  async updateExperience(id: string, userData: any) {
    const experienceToUpdate = await this.getExperienceById(id);
    experienceToUpdate.update(userData);
    await experienceToUpdate.save();

    return experienceToUpdate;
  }

  async deleteExperience(id: string): Promise<void> {
    const experienceToDelete = await this.getExperienceById(id);

    if (!experienceToDelete) {
      return null; // User not found
    }

    await experienceToDelete.destroy();
  }
}
