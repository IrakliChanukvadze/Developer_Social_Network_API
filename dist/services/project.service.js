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
exports.ProjectService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const projects_model_1 = require("../models/projects.model");
dotenv_1.default.config();
class ProjectService {
    createProject(projectData, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = Object.assign(Object.assign({}, projectData), { image: image.filename });
            const newProject = yield projects_model_1.Project.create(data);
            return newProject;
        });
    }
    getProjects(page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = pageSize || 10; // Default page size
            const offset = (page - 1) * limit || 0; // Calculate offset based on the page
            const projects = yield projects_model_1.Project.findAll({
                limit,
                offset,
            });
            return projects;
        });
    }
    getProjectById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield projects_model_1.Project.findByPk(id);
            return project;
        });
    }
}
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map