"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.storage = multer_1.default.diskStorage({
    //@ts-ignore
    destination: function (_, __, cb) {
        console.log('desti ', __dirname + '/../uploads/');
        cb(null, __dirname + '/../uploads/'); // Destination folder for uploaded files
    },
    //@ts-ignore
    filename: function (_, file, cb) {
        console.log('file', file);
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname)); // File naming convention
    }
});
// Initialize multer with the storage configuration
exports.upload = (0, multer_1.default)({ storage: exports.storage });
