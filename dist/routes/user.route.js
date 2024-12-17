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
const express_1 = __importDefault(require("express"));
const auth_service_1 = require("../services/auth.service");
const upload_1 = require("../utils/upload");
const userRoute = express_1.default.Router();
userRoute.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, auth_service_1.getAllUsers)();
        return res.status(200).json(users);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
userRoute.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield (0, auth_service_1.getUserByid)(id);
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
userRoute.post("/update", upload_1.upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const image = req.file;
        let payload;
        if (image) {
            payload = Object.assign(Object.assign({}, body), { image: image.filename, batch: Number(body.batch) });
        }
        else {
            payload = Object.assign(Object.assign({}, body), { batch: Number(body.batch) });
        }
        const user = yield (0, auth_service_1.updateUser)(body.id, payload);
        return res.status(200).json(user);
    }
    catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json(err);
    }
}));
userRoute.post("/approved", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = yield (0, auth_service_1.userApproved)(body.id);
        return res.status(200).json(user);
    }
    catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json(err);
    }
}));
userRoute.post("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = yield (0, auth_service_1.deleteUser)(body.id);
        return res.status(200).json(user);
    }
    catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json(err);
    }
}));
userRoute.get("/pending/list", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, auth_service_1.countUnapprovedUsers)();
        return res.status(200).json(user);
    }
    catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json(err);
    }
}));
exports.default = userRoute;
