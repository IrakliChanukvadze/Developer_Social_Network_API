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
exports.ExperienceService = void 0;
const experience_model_1 = require("../models/experience.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class ExperienceService {
    createExperience(experienceData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newExperiences = yield experience_model_1.Experience.create(experienceData);
            return newExperiences;
        });
    }
    getExperiences(page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = pageSize || 10; // Default page size
            const offset = (page - 1) * limit || 0; // Calculate offset based on the page
            const experiences = yield experience_model_1.Experience.findAll();
            console.log(experiences, 'asdasdasdasdasdasdasd');
            return experiences;
        });
    }
    getExperienceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield experience_model_1.Experience.findByPk(id);
            return user;
        });
    }
    updateExperience(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const experienceToUpdate = yield this.getExperienceById(id);
            experienceToUpdate.update(userData);
            yield experienceToUpdate.save();
            return experienceToUpdate;
        });
    }
    deleteExperience(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const experienceToDelete = yield this.getExperienceById(id);
            if (!experienceToDelete) {
                return null; // User not found
            }
            yield experienceToDelete.destroy();
        });
    }
}
exports.ExperienceService = ExperienceService;
//# sourceMappingURL=experience.service.js.map