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
exports.createCommentReaction = exports.createPostReaction = void 0;
const db_1 = __importDefault(require("../utils/db"));
const createPostReaction = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const checkDuplicate = yield db_1.default.postReaction.findFirst({
        where: {
            postId: data.postId,
            userId: data.userId
        }
    });
    if (checkDuplicate) {
        return;
    }
    return yield db_1.default.postReaction.create({
        data,
    });
});
exports.createPostReaction = createPostReaction;
const createCommentReaction = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const checkDuplicate = yield db_1.default.commentReaction.findFirst({
        where: {
            commentId: data.commentId,
            userId: data.userId
        }
    });
    if (checkDuplicate) {
        return;
    }
    return yield db_1.default.commentReaction.create({
        data,
    });
});
exports.createCommentReaction = createCommentReaction;
