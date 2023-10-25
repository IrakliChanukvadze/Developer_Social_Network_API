import dotenv from 'dotenv';
import { Project, ProjectAttributes } from '../models/projects.model';
dotenv.config();
import { CacheService } from './cache.service';
const cacheService = new CacheService();

export class ProjectService {
  async createProject(projectData: ProjectAttributes, image: any) {
    const data = { ...projectData, image: image.filename };
    cacheService.clearCache(projectData.user_id);
    const newProject = await Project.create(data);

    return newProject;
  }

  async getProjects(page: number, pageSize: number) {
    const limit = pageSize || 10; // Default page size
    const offset = (page - 1) * limit || 0; // Calculate offset based on the page

    const projects = await Project.findAll({
      limit,
      offset,
    });

    return projects;
  }

  async getProjectById(id: string) {
    const project = await Project.findByPk(id);

    return project;
  }

  async updateProject(id: string, projectData: any) {
    const projectToUpdate = await this.getProjectById(id);
    projectToUpdate.update(projectData);
    await projectToUpdate.save();

    return projectToUpdate;
  }
  async deleteProject(id: string): Promise<void> {
    const projectToDelete = await this.getProjectById(id);
    if (!projectToDelete) {
      return null;
    }
    cacheService.clearCache(parseInt(id));

    await projectToDelete.destroy();
  }
}
