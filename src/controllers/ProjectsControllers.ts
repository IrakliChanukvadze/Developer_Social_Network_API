import catchAsync from '../utils/catchAsync';
import { NextFunction, Response, Request } from 'express';
import { Context } from '../interfaces/general';
import AppError from '../utils/appError';
import { createNewProject } from '../schemaValidators/projectSchemaValidators/createNewProject';
import { IRequestWithUser } from '../middleware/permisionMiddlwares/checkAdminOrUserPermision';

class ProjectControllers {
  public readonly schemas = {
    createNewProject,
  };

  constructor(private context: Context) {}
  createProject = catchAsync(async (req: IRequestWithUser, res: Response) => {
    const projectData = req.body;
   
    projectData.user_id = req.user.id;

    const newProject = await this.context.services.projectService.createProject(
      projectData,
      req.file,
    );

    res.status(201).json(newProject);
  });

  getProjects = catchAsync(async (req: Request, res: Response) => {
    const { page, pageSize } = req.query;

    // Define default values for page and pageSize
    const defaultPage = 1;
    const defaultPageSize = 10;

    // Parse page and pageSize as integers, use default values if not provided
    const parsedPage = page ? parseInt(page as string, 10) : defaultPage;
    const parsedPageSize = pageSize
      ? parseInt(pageSize as string, 10)
      : defaultPageSize;

    const projects = await this.context.services.projectService.getProjects(
      parsedPage,
      parsedPageSize,
    );

    res.status(200).json({ projects });
  });

  getProjectById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const project =
        await this.context.services.projectService.getProjectById(id);

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

      const updatedProject =
        await this.context.services.projectService.updateProject(
          id,
          projectData,
        );

      if (!updatedProject) {
        return next(new AppError('Project not found', 404));
      }

      res.status(200).json(updatedProject);
    },
  );

  deleteProject = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.context.services.projectService.deleteProject(id);

    res.status(204).send();
  });
}

export default ProjectControllers;
