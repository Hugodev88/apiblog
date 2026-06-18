import { Request, Response, NextFunction } from "express";
import { createPostSchema, updatePostSchema } from "./post.schemas";
import { postService } from "./post.service";

type PostParams = {
    id: string;
}

export const postController = {

    async listPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const cursor = req.query.cursor as string | undefined
            const limit = Number(req.query.limit) || 10

            const result = await postService.list(cursor, limit);

            return res.json(result);
        } catch (error) {
            next(error);
        }
    },

    async getById(req: Request<PostParams>, res: Response, next: NextFunction) {
        try {
            const postId = req.params.id;
            const post = await postService.findbyId(postId);
            res.json(post);
        } catch (error) {
            next(error);
        }
    },

    async createPost(req: Request, res: Response, next: NextFunction) {
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

    async updatePost(req: Request<PostParams>, res: Response, next: NextFunction) {
        try {
            const postId = req.params.id;

            const parsed = updatePostSchema.safeParse(req.body);

            if (!parsed.success) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: parsed.error.flatten(),
                });
            }

            const post = await postService.update(postId, {
                title: parsed.data.title,
                content: parsed.data.content,
                authorId: req.userId,
            });

            return res.status(200).json(post);
        } catch (error) {
            next(error);
        }
    }, 

    async deletePost(req: Request<PostParams>, res: Response, next: NextFunction){
        try {
            const postId = req.params.id;
            await postService.delete(postId, req.userId);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
};