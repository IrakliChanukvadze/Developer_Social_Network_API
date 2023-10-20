import catchAsync from '../utils/catchAsync';
import { NextFunction, Response, Request } from 'express';

import AppError from '../utils/appError';
import { createNewProject } from '../schemaValidators/projectSchemaValidators/createNewProject';
import { ProjectService } from '../services/project.service';
const projectService = new ProjectService();

class ProjectControllers {
  public readonly schemas = {
    createNewProject,
  };

  constructor() {}
  createProject = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const projectData = req.body;
      //@ts-ignore
      projectData.user_id = req.user.id;

      const newProject = await projectService.createProject(
        projectData,
        req.file,
      );

      res.status(201).json(newProject);
    },
  );

  getProjects = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      let { page, pageSize } = req.query;

      // Define default values for page and pageSize
      const defaultPage = 1;
      const defaultPageSize = 10;

      // Parse page and pageSize as integers, use default values if not provided
      const parsedPage = page ? parseInt(page as string, 10) : defaultPage;
      const parsedPageSize = pageSize
        ? parseInt(pageSize as string, 10)
        : defaultPageSize;

      const projects = await projectService.getProjects(
        parsedPage,
        parsedPageSize,
      );

      res.status(200).json({ projects });
    },
  );

  getProjectById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const project = await projectService.getProjectById(id);

      if (!project) {
        return next(new AppError('Project not found', 404));
      }

      res.status(200).json(project);
    },
  );

  updateProject = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const projectData = req.body;

      const updatedProject = await projectService.updateProject(
        id,
        projectData,
      );

      if (!updatedProject) {
        return next(new AppError('Project not found', 404));
      }

      res.status(200).json(updatedProject);
    },
  );

  deleteProject = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      await projectService.deleteProject(id);

      res.status(204).send();
    },
  );
}

export default ProjectControllers;