"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination to the "public" folder
        cb(null, path_1.default.join(__dirname, '..', '..', 'public'));
    },
    filename: function (req, file, cb) {
        // Define a unique file name (e.g., timestamp + original name)
        cb(null, Date.now() + '-' + file.originalname);
    },
});
// Create an instance of multer with the specified storage options
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
//# sourceMappingURL=mutlerConfig.js.map