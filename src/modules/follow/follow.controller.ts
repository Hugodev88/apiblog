import { Request, Response, NextFunction } from "express";
import { followService } from "./follow.service";

export const followController = {
    async followUser(req: Request, res: Response, next: NextFunction){
        try {
            const followerId = req.userId
            const followingId = req.params.id as string

            const result = await followService.follow(followerId, followingId)

            return res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    },

    async unfollowUser(req: Request, res: Response, next: NextFunction) {
        const followerId = req.userId
        const followingId = req.params.id as string

        const result = await followService.unfollow(followerId, followingId)

        return res.status(200).json(result);
    }
}
