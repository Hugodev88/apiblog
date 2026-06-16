import { Request, Response } from "express";
import { commentService } from "./comment.service";

export const commentController = {
    async listComments(req: Request, res: Response) {
        const comments = await commentService.list()
        res.json(comments)
    },
}

