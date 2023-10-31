import { Experience, ExperienceAttributes } from '../models/experience.model';
import { CacheService } from './cache.service';
const cacheService = new CacheService();

import dotenv from 'dotenv';
dotenv.config();
export class ExperienceService {
  async createExperience(experienceData: ExperienceAttributes) {
    const newExperiences = await Experience.create(experienceData);

    cacheService.clearCache(newExperiences.user_id);

    return newExperiences;
  }

  async getExperiences(page: number, pageSize: number) {
    const limit = pageSize || 10; // Default page size
    const offset = (page - 1) * limit || 0; // Calculate offset based on the page

    const experiences = await Experience.findAll({
      limit,
      offset,
    });

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
    cacheService.clearCache(parseInt(id));
    return experienceToUpdate;
  }

  async deleteExperience(id: string): Promise<void> {
    const experienceToDelete = await this.getExperienceById(id);
    if (!experienceToDelete) {
      return null; // User not found
    }
    cacheService.clearCache(parseInt(id));

    await experienceToDelete.destroy();
  }
}
