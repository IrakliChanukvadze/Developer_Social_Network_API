"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const makeAuthRouter = (context) => {
    const router = express_1.default.Router();
    // Define routes
    router.route('/').get((req, res) => {
        res.status(201).json({ status: 'success', data: 'data' });
    });
    return router;
};
exports.makeAuthRouter = makeAuthRouter;
//# sourceMappingURL=auth.js.map