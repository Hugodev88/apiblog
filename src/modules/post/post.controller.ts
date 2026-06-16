import { Request, Response } from "express";
import { postService } from "./post.service";

export const postController = {
    async listPosts(req: Request, res: Response) {
        const posts = await postService.list()
        res.json(posts)
    } 
}