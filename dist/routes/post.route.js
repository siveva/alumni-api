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
const post_service_1 = require("../services/post.service");
const auth_service_1 = require("../services/auth.service");
const sms_service_1 = require("../services/sms.service");
//import { upload } from "../utils/upload";
const postRoute = express_1.default.Router();
postRoute.get("/:type", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const type = req.params.type;
        const posts = yield (0, post_service_1.getAllPosts)(type);
        return res.status(200).json(posts);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
postRoute.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const create = yield (0, post_service_1.createPost)(body);
        if (!create) {
            return res.status(404).json({ message: "Unable to create post" });
        }
        const users = yield (0, auth_service_1.getAllUsers)();
        if ((users === null || users === void 0 ? void 0 : users.length) > 0) {
            const recepients = users.map((user) => (user === null || user === void 0 ? void 0 : user.contact) || '');
            const messages = (create === null || create === void 0 ? void 0 : create.title) + " \n " + (create === null || create === void 0 ? void 0 : create.description);
            try {
                yield Promise.all(recepients.map((recipient) => (0, sms_service_1.sentTwilioSms)(recipient, messages)));
            }
            catch (error) {
                console.error(error);
            }
        }
        return res.status(200).json(create);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
postRoute.post("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const update = yield (0, post_service_1.updatePost)(Number(body.id), body);
        return res.status(200).json(update);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
postRoute.post("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const update = yield (0, post_service_1.deletePost)(Number(body.id));
        return res.status(200).json(update);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
postRoute.post("/join-event", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const update = yield (0, post_service_1.joinEvent)(Number(body.id), body.userId);
        return res.status(200).json(update);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}));
exports.default = postRoute;
