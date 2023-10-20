"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeProjectRouter = void 0;
const express_1 = __importDefault(require("express"));
const mutlerConfig_1 = __importDefault(require("../middleware/mutlerConfig"));
const checkAdminPermision_1 = require("../middleware/permisionMiddlwares/checkAdminPermision");
const verifyJWT_1 = require("../middleware/verifyJWT");
const schemaValidator_1 = require("../middleware/schemaValidator");
const checkAdminOrUserPermision_1 = require("../middleware/permisionMiddlwares/checkAdminOrUserPermision");
const ProjectsControllers_1 = __importDefault(require("../controllers/ProjectsControllers"));
const projectControllers = new ProjectsControllers_1.default();
const makeProjectRouter = (context) => {
    const router = express_1.default.Router();
    router
        .route('/')
        .post(verifyJWT_1.verifyJWT, checkAdminOrUserPermision_1.checkAdminOrUserPermission, mutlerConfig_1.default.single('image'), (0, schemaValidator_1.schemaValidator)(projectControllers.schemas.createNewProject), projectControllers.createProject);
    router
        .route('/')
        .get(verifyJWT_1.verifyJWT, checkAdminPermision_1.checkAdminPermission, projectControllers.getProjects);
    router.route('/:id').get(projectControllers.getProjectById);
    return router;
};
exports.makeProjectRouter = makeProjectRouter;
//# sourceMappingURL=project.js.map