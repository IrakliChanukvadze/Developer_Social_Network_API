"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const createNewProject_1 = require("../schemaValidators/projectSchemaValidators/createNewProject");
const project_service_1 = require("../services/project.service");
const projectService = new project_service_1.ProjectService();
class ProjectControllers {
    constructor() {
        this.schemas = {
            createNewProject: createNewProject_1.createNewProject,
        };
        this.createProject = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const projectData = req.body;
            //@ts-ignore
            projectData.user_id = req.user.id;
            const newProject = yield projectService.createProject(projectData, req.file);
            res.status(201).json(newProject);
        }));
        this.getProjects = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { page, pageSize } = req.query;
            // Define default values for page and pageSize
            const defaultPage = 1;
            const defaultPageSize = 10;
            // Parse page and pageSize as integers, use default values if not provided
            const parsedPage = page ? parseInt(page, 10) : defaultPage;
            const parsedPageSize = pageSize
                ? parseInt(pageSize, 10)
                : defaultPageSize;
            const projects = yield projectService.getProjects(parsedPage, parsedPageSize);
            res.status(200).json({ projects });
        }));
        this.getProjectById = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const project = yield projectService.getProjectById(id);
            if (!project) {
                return next(new appError_1.default('Project not found', 404));
            }
            res.status(200).json(project);
        }));
    }
}
exports.default = ProjectControllers;
//# sourceMappingURL=ProjectsControllers.js.map