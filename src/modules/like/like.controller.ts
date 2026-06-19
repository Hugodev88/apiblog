import { NextFunction, Request, Response } from "express";
import { likeService } from "./like.service";

type Params = {
    id: string;
}

export const likeController = {
    async likePost(req: Request<Params>, res: Response, next: NextFunction) {
        try {
            const postId = req.params.id
            const userId = req.userId

            const result = await likeService.like(postId, userId)

            return res.status(200).json(result);

        } catch (error) {
            next(error)
        }
    },

    async unlikePost(req: Request<Params>, res: Response, next: NextFunction){
        try {
            const postId = req.params.id
            const userId = req.userId

            const result = await likeService.unlike(postId, userId)

            return res.status(200).json(result);

        } catch (error) {
            next(error)
        }
    }
}