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
exports.FeedbackService = void 0;
const feedbacks_model_1 = require("../models/feedbacks.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class FeedbackService {
    createFeedback(feedbackData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(feedbackData);
            const newFeedback = yield feedbacks_model_1.Feedback.create(feedbackData);
            return newFeedback;
        });
    }
    getFeedbacks(page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = pageSize || 10; // Default page size
            const offset = (page - 1) * limit || 0; // Calculate offset based on the page
            const feedbacks = yield feedbacks_model_1.Feedback.findAll({
                limit,
                offset,
            });
            return feedbacks;
        });
    }
    getFeedbackById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const feedback = yield feedbacks_model_1.Feedback.findByPk(id);
            return feedback;
        });
    }
    updateFeedback(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const feedbackToUpdate = yield this.getFeedbackById(id);
            feedbackToUpdate.update(userData);
            yield feedbackToUpdate.save();
            return feedbackToUpdate;
        });
    }
    deleteFeedback(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const feedbackToDelete = yield this.getFeedbackById(id);
            if (!feedbackToDelete) {
                return null;
            }
            yield feedbackToDelete.destroy();
        });
    }
}
exports.FeedbackService = FeedbackService;
//# sourceMappingURL=feedback.service.js.map