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
const token_1 = require("../utils/token");
const authRoute = express_1.default.Router();
authRoute.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield (0, auth_service_1.getUserByUsername)(username);
        if (!user) {
            return res.status(401).json({ message: "Invalid username" });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        if (!user.isApproved) {
            return res.status(401).json({ message: "Account was not been approved yet" });
        }
        const payload = {
            id: user.id,
            username: user.username,
            created: new Date(),
        };
        const token = (0, token_1.signToken)(payload);
        console.log("token", token);
        return res.status(200).json({ user, token });
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
authRoute.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = yield (0, auth_service_1.getUserByUsername)(body.username);
        if (user) {
            return res.status(400).json({ message: "Username is not available" });
        }
        const create = yield (0, auth_service_1.createUser)(body);
        return res.status(200).json(create);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
exports.default = authRoute;
