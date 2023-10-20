"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const schemaValidator_1 = require("../middleware/schemaValidator");
const AuthControllers_1 = __importDefault(require("../controllers/AuthControllers"));
const mutlerConfig_1 = __importDefault(require("../middleware/mutlerConfig"));
const authControllers = new AuthControllers_1.default();
const makeAuthRouter = (context) => {
    const router = express_1.default.Router();
    router
        .route('/registration')
        .post(mutlerConfig_1.default.single('image'), (0, schemaValidator_1.schemaValidator)(authControllers.schemas.createnewUserSchema), authControllers.createNewUser);
    router
        .route('/login')
        .post(mutlerConfig_1.default.any(), (0, schemaValidator_1.schemaValidator)(authControllers.schemas.authenticateUserSchema), authControllers.authenticateUser);
    return router;
};
exports.makeAuthRouter = makeAuthRouter;
//# sourceMappingURL=auth.js.map