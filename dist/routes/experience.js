"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExperienceRouter = void 0;
const express_1 = __importDefault(require("express"));
const mutlerConfig_1 = __importDefault(require("../middleware/mutlerConfig"));
const checkAdminPermision_1 = require("../middleware/permisionMiddlwares/checkAdminPermision");
const verifyJWT_1 = require("../middleware/verifyJWT");
const schemaValidator_1 = require("../middleware/schemaValidator");
const checkUserPermision_1 = require("../middleware/permisionMiddlwares/checkUserPermision");
const checkAdminOrUserPermision_1 = require("../middleware/permisionMiddlwares/checkAdminOrUserPermision");
const ExperienceControllers_1 = __importDefault(require("../controllers/ExperienceControllers"));
const experienceController = new ExperienceControllers_1.default();
const makeExperienceRouter = (context) => {
    const router = express_1.default.Router();
    router
        .route('/')
        .post(verifyJWT_1.verifyJWT, checkAdminOrUserPermision_1.checkAdminOrUserPermission, mutlerConfig_1.default.any(), (0, schemaValidator_1.schemaValidator)(experienceController.schemas.addExperienceSchema), experienceController.createExperience);
    router
        .route('/')
        .get(verifyJWT_1.verifyJWT, checkAdminPermision_1.checkAdminPermission, experienceController.getExperiences);
    router.route('/:id').get(experienceController.getExperienceById);
    router
        .route('/:id')
        .put(verifyJWT_1.verifyJWT, checkUserPermision_1.checkUserPermission, mutlerConfig_1.default.any(), experienceController.updateExperience);
    router
        .route('/:id')
        .delete(verifyJWT_1.verifyJWT, checkAdminOrUserPermision_1.checkAdminOrUserPermission, experienceController.deleteExperience);
    return router;
};
exports.makeExperienceRouter = makeExperienceRouter;
//# sourceMappingURL=experience.js.map