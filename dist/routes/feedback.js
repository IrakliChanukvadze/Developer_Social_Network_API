"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFeedbackRouter = void 0;
const express_1 = __importDefault(require("express"));
const mutlerConfig_1 = __importDefault(require("../middleware/mutlerConfig"));
const checkAdminPermision_1 = require("../middleware/permisionMiddlwares/checkAdminPermision");
const verifyJWT_1 = require("../middleware/verifyJWT");
const schemaValidator_1 = require("../middleware/schemaValidator");
const checkUserPermision_1 = require("../middleware/permisionMiddlwares/checkUserPermision");
const checkAdminOrUserPermision_1 = require("../middleware/permisionMiddlwares/checkAdminOrUserPermision");
const FeedbackControllers_1 = __importDefault(require("../controllers/FeedbackControllers"));
const feedbackControllers = new FeedbackControllers_1.default();
const makeFeedbackRouter = (context) => {
    const router = express_1.default.Router();
    router
        .route('/')
        .post(verifyJWT_1.verifyJWT, checkAdminOrUserPermision_1.checkAdminOrUserPermission, mutlerConfig_1.default.any(), (0, schemaValidator_1.schemaValidator)(feedbackControllers.schemas.addFeedbackSchema), feedbackControllers.createFeedback);
    router
        .route('/')
        .get(verifyJWT_1.verifyJWT, checkAdminPermision_1.checkAdminPermission, feedbackControllers.getFeedbacks);
    router.route('/:id').get(feedbackControllers.getFeedbackById);
    router
        .route('/:id')
        .put(verifyJWT_1.verifyJWT, checkUserPermision_1.checkUserPermission, mutlerConfig_1.default.any(), feedbackControllers.updateFeedback);
    router
        .route('/:id')
        .delete(verifyJWT_1.verifyJWT, checkAdminOrUserPermision_1.checkAdminOrUserPermission, feedbackControllers.deleteFeedback);
    return router;
};
exports.makeFeedbackRouter = makeFeedbackRouter;
//# sourceMappingURL=feedback.js.map