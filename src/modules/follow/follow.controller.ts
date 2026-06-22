import { Request, Response, NextFunction } from "express";
import { followService } from "./follow.service";

type Params =  {
    id: string;
}

export const followController = {
    async followUser(req: Request<Params>, res: Response, next: NextFunction){
        try {
            const followerId = req.userId
            const followingId = req.params.id

            const result = await followService.follow(followerId, followingId)

            return res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    },

    async unfollowUser(req: Request<Params>, res: Response, next: NextFunction) {
        try {
            const followerId = req.userId
            const followingId = req.params.id
            const result = await followService.unfollow(followerId, followingId)
            return res.status(200).json(result);
        } catch (error) {
            next(error)
        } 
    },

    async listFollowers(req: Request<Params>, res: Response, next: NextFunction){
        try {
            const followingId = req.params.id
            const result = await followService.listFollowers(followingId)
            return res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    },

    async listFollowing(req: Request<Params>, res: Response, next: NextFunction) {
        try {
            const followerId = req.params.id
            const result = await followService.listFollowing(followerId)
            return res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }


}
