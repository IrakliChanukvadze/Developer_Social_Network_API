"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../routes/auth");
const globalErrorHandler_1 = __importDefault(require("../middleware/globalErrorHandler"));
const appError_1 = __importDefault(require("../utils/appError"));
const user_1 = require("../routes/user");
const experience_1 = require("../routes/experience");
const feedback_1 = require("../routes/feedback");
const project_1 = require("../routes/project");
const loadRoutes = (app, context) => {
    app.use(express_1.default.json());
    app.use('/api/auth', (0, auth_1.makeAuthRouter)(context));
    app.use('/api/users', (0, user_1.makeUserRouter)(context));
    app.use('/api/experience', (0, experience_1.makeExperienceRouter)(context));
    app.use('/api/feedback', (0, feedback_1.makeFeedbackRouter)(context));
    app.use('/api/project', (0, project_1.makeProjectRouter)(context));
    app.all('*', (req, res, next) => {
        next(new appError_1.default(`Can't find ${req.originalUrl} on this server`, 404));
    });
    app.use(globalErrorHandler_1.default);
};
exports.loadRoutes = loadRoutes;
//# sourceMappingURL=routes.js.map