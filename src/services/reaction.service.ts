import { ICreateCommentReaction, ICreatePostReaction } from "../interface/reaction.interface";
import prisma from "../utils/db";

export const createPostReaction = async (data: ICreatePostReaction) => {
    const checkDuplicate = await prisma.postReaction.findFirst({
        where: {
            postId: data.postId,
            userId: data.userId
        }
    });

    if(checkDuplicate){
        return;
    }
    
    return await prisma.postReaction.create({
        data,
    });
};

export const createCommentReaction = async (data: ICreateCommentReaction) => {
    const checkDuplicate = await prisma.commentReaction.findFirst({
        where: {
            commentId: data.commentId,
            userId: data.userId
        }
    });

    if(checkDuplicate){
        return;
    }
    
    return await prisma.commentReaction.create({
        data,
    });
};