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
const addExperienceSchema_1 = require("../schemaValidators/experienceSchemaValidators/addExperienceSchema");
const experience_service_1 = require("../services/experience.service");
const experienceService = new experience_service_1.ExperienceService();
class ExperienceController {
    constructor() {
        this.schemas = { addExperienceSchema: addExperienceSchema_1.addExperienceSchema };
        this.createExperience = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const experienceData = req.body;
            if (!experienceData.user_id) {
                //@ts-ignore
                experienceData.user_id = req.user.id;
            }
            const newExperience = yield experienceService.createExperience(experienceData);
            res.status(201).json(newExperience);
        }));
        this.getExperiences = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { page, limit } = req.query;
            // Define default values for page and limit
            const defaultPage = 1;
            const defaultLimit = 10;
            // Parse page and limit as integers, use default values if not provided
            const parsedPage = page ? parseInt(page, 10) : defaultPage;
            const parsedLimit = limit ? parseInt(limit, 10) : defaultLimit;
            const experience = yield experienceService.getExperiences(parsedLimit, parsedPage);
            res.status(200).json({ experience });
        }));
        this.getExperienceById = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield experienceService.getExperienceById(id);
            if (!user) {
                return next(new appError_1.default('User not found', 404));
            }
            res.status(200).json(user);
        }));
        this.updateExperience = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userData = req.body;
            const updatedUser = yield experienceService.updateExperience(id, userData);
            if (!updatedUser) {
                return next(new appError_1.default('User not found', 404));
            }
            res.status(200).json(updatedUser);
        }));
        this.deleteExperience = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield experienceService.deleteExperience(id);
            res.status(204).send();
        }));
    }
}
exports.default = ExperienceController;
//# sourceMappingURL=ExperienceControllers.js.map