import { Request, Response, NextFunction } from "express";
import { createPostSchema } from "./post.schemas";
import { postService } from "./post.service";

export const postController = {
    async createPost(req: Request,res: Response,next: NextFunction) {
        try {
        const parsed = createPostSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
            message: "Validation error",
            errors: parsed.error.flatten(),
            });
        }

        const post = await postService.create({
            title: parsed.data.title,
            content: parsed.data.content,
            authorId: req.userId,
        });

        return res.status(201).json(post);
        } catch (error) {
        next(error);
        }
    },

    async listPosts(req: Request, res: Response) {
        const posts = await postService.list()
        res.json(posts)
    },
};