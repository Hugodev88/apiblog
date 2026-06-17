import { NextFunction, Request, Response } from "express";
import { commentService } from "./comment.service";
import { createCommentSchema } from "./comment.schema";

export const commentController = {
    async listComments(req: Request, res: Response) {
        const comments = await commentService.list()
        res.json(comments)
    },

    async createComment(req: Request, res: Response, next: NextFunction){
        try {
            const parsed = createCommentSchema.safeParse(req.body);

            if (!parsed.success) {
                return res.status(400).json({
                message: "Validation error",
                errors: parsed.error.flatten(),
                });
            }

            const comment = await commentService.create(
                req.userId,
                parsed.data.postId,
                parsed.data.content,
            );

            return res.status(201).json(comment);
        } catch (error) {
            next(error);
        }
    }
}

