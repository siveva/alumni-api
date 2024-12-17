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
const reaction_service_1 = require("../services/reaction.service");
const reactionRoute = express_1.default.Router();
reactionRoute.post("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const create = yield (0, reaction_service_1.createPostReaction)(body);
        return res.status(200).json(create);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
reactionRoute.post("/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const create = yield (0, reaction_service_1.createCommentReaction)(body);
        return res.status(200).json(create);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
exports.default = reactionRoute;
