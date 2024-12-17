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
exports.joinEvent = exports.deletePost = exports.updatePost = exports.getAllPosts = exports.createPost = void 0;
const db_1 = __importDefault(require("../utils/db"));
//import fs from "fs/promises";
const createPost = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, createdById, postType } = data;
    return yield db_1.default.post.create({
        data: {
            title,
            description,
            createdById,
            postType
        }
    });
});
exports.createPost = createPost;
// export const uploadPostImage = async (file: any[], postId: number) => {
//     const images = await Promise.all(
//         file.map(async (image) => {
//         //   const fileBuffer = await fs.readFile(image.path);
//         //   const base64Image = fileBuffer.toString("base64");
//           return {
//             postId,
//             image: `/uploads/${image.filename}`,
//           };
//         })
//     );
//     return await prisma.postImages.createMany({
//         data: images,
//     })
// }
const getAllPosts = (type) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield db_1.default.post.findMany({
        where: {
            isDeleted: false,
            postType: type,
        },
        include: {
            comment: {
                include: {
                    user: true,
                    commentReaction: {
                        include: {
                            user: true
                        }
                    }
                },
            },
            postReaction: {
                include: {
                    user: true,
                },
            },
            eventRegistration: {
                include: {
                    user: true,
                }
            },
            createdBy: true,
        },
        orderBy: { createdAt: "desc" },
    });
    if (posts.length === 0) {
        return [];
    }
    const formattedPosts = posts.map((post) => {
        const likeCount = post.postReaction.filter((reaction) => reaction.type === 'LIKE').length;
        const loveCount = post.postReaction.filter((reaction) => reaction.type === 'LOVE').length;
        const formattedComments = post.comment.map((comment) => {
            const likeCount = comment.commentReaction.filter((reaction) => reaction.type === 'LIKE').length;
            const loveCount = comment.commentReaction.filter((reaction) => reaction.type === 'LOVE').length;
            return Object.assign(Object.assign({}, comment), { likeCount,
                loveCount });
        });
        return Object.assign(Object.assign({}, post), { likeCount,
            loveCount, comment: formattedComments });
    });
    return formattedPosts;
});
exports.getAllPosts = getAllPosts;
const updatePost = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = data;
    return yield db_1.default.post.update({
        where: {
            id
        },
        data: {
            title,
            description
        }
    });
});
exports.updatePost = updatePost;
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.post.update({
        where: {
            id
        },
        data: {
            isDeleted: true
        }
    });
});
exports.deletePost = deletePost;
const joinEvent = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.eventRegistration.create({
        data: {
            eventId: id,
            userId
        }
    });
});
exports.joinEvent = joinEvent;
