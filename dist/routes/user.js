"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserRouter = void 0;
const express_1 = __importDefault(require("express"));
const mutlerConfig_1 = __importDefault(require("../middleware/mutlerConfig"));
const checkAdminPermision_1 = require("../middleware/permisionMiddlwares/checkAdminPermision");
const verifyJWT_1 = require("../middleware/verifyJWT");
const UserControllers_1 = __importDefault(require("../controllers/UserControllers"));
const schemaValidator_1 = require("../middleware/schemaValidator");
const checkUserPermision_1 = require("../middleware/permisionMiddlwares/checkUserPermision");
const checkAdminOrUserPermision_1 = require("../middleware/permisionMiddlwares/checkAdminOrUserPermision");
const userControllers = new UserControllers_1.default();
const makeUserRouter = (context) => {
    const router = express_1.default.Router();
    router
        .route('/')
        .post(verifyJWT_1.verifyJWT, checkAdminPermision_1.checkAdminPermission, mutlerConfig_1.default.any(), (0, schemaValidator_1.schemaValidator)(userControllers.schemas.createUserSchema), userControllers.createNewUser);
    router
        .route('/')
        .get(verifyJWT_1.verifyJWT, checkAdminPermision_1.checkAdminPermission, userControllers.getUsers);
    router.route('/:id').get(userControllers.getUserById);
    router
        .route('/:id')
        .put(verifyJWT_1.verifyJWT, checkUserPermision_1.checkUserPermission, mutlerConfig_1.default.single('image'), userControllers.updateUser);
    router
        .route('/:id')
        .put(verifyJWT_1.verifyJWT, checkUserPermision_1.checkUserPermission, mutlerConfig_1.default.single('image'), userControllers.updateUser);
    router
        .route('/:id')
        .delete(verifyJWT_1.verifyJWT, checkAdminOrUserPermision_1.checkAdminOrUserPermission, userControllers.deleteUser);
    return router;
};
exports.makeUserRouter = makeUserRouter;
//# sourceMappingURL=user.js.map