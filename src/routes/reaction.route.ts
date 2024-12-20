import express from "express"
import { createCommentReaction, createPostReaction } from "../services/reaction.service";

const reactionRoute = express.Router();

reactionRoute.post("/posts", async (req, res) => {
    try {
        const body = req.body;

        const create = await createPostReaction(body);

        return res.status(200).json(create);
    } catch (err) {
        return res.status(500).json(err);
    }
});

reactionRoute.post("/comments", async (req, res) => {
    try {
        const body = req.body;

        const create = await createCommentReaction(body);

        return res.status(200).json(create);
    } catch (err) {
        return res.status(500).json(err);
    }
});

export default reactionRoute;
