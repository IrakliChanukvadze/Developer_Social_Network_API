"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadModels = void 0;
const experience_model_1 = require("../models/experience.model");
const user_model_1 = require("../models/user.model");
const projects_model_1 = require("../models/projects.model");
const feedbacks_model_1 = require("../models/feedbacks.model");
const loadModels = (sequelize) => {
    const models = {
        user: user_model_1.User,
        experience: experience_model_1.Experience,
        project: projects_model_1.Project,
        feedback: feedbacks_model_1.Feedback,
    };
    for (const model of Object.values(models)) {
        model.defineSchema(sequelize);
    }
    for (const model of Object.values(models)) {
        model.associate(models, sequelize);
    }
    return models;
};
exports.loadModels = loadModels;
//# sourceMappingURL=models.js.map