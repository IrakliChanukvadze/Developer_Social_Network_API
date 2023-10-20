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
const createFeedback_1 = require("../schemaValidators/feedbackSchemaValidators/createFeedback");
const feedback_service_1 = require("../services/feedback.service");
const appError_1 = __importDefault(require("../utils/appError"));
const feedbackService = new feedback_service_1.FeedbackService();
class FeedbackController {
    constructor() {
        this.schemas = { addFeedbackSchema: createFeedback_1.addFeedbackSchema };
        this.createFeedback = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const feedbackData = req.body;
            //@ts-ignore
            feedbackData.from_user = req.user.id;
            const newFeedback = yield feedbackService.createFeedback(feedbackData);
            res.status(201).json(newFeedback);
        });
        this.getFeedbacks = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { page, pageSize } = req.query;
            // Define default values for page and pageSize
            const defaultPage = 1;
            const defaultPageSize = 10;
            // Parse page and pageSize as integers, use default values if not provided
            const parsedPage = page ? parseInt(page, 10) : defaultPage;
            const parsedPageSize = pageSize
                ? parseInt(pageSize, 10)
                : defaultPageSize;
            const feedbacks = yield feedbackService.getFeedbacks(parsedPage, parsedPageSize);
            res.status(200).json({ feedbacks });
        }));
        this.getFeedbackById = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const feedback = yield feedbackService.getFeedbackById(id);
            if (!feedback) {
                return next(new appError_1.default('Feedback not found', 404));
            }
            res.status(200).json(feedback);
        }));
        this.updateFeedback = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userData = req.body;
            const updatedFeedback = yield feedbackService.updateFeedback(id, userData);
            if (!updatedFeedback) {
                return next(new appError_1.default('Feedback not found', 404));
            }
            res.status(200).json(updatedFeedback);
        }));
        this.deleteFeedback = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield feedbackService.deleteFeedback(id);
            res.status(204).send();
        }));
    }
}
exports.default = FeedbackController;
//# sourceMappingURL=FeedbackControllers.js.map