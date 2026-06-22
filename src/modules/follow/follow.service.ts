import { AppError } from "../../errors/AppError"
import { prisma } from "../../lib/prisma"

export const followService = {
    async follow(followerId: string, followingId: string){

        if (followerId === followingId) {
            throw new AppError("You cannot follow yourself", 400);
        }

        const user = await prisma.user.findUnique({
            where: {
                id: followingId
            }
        })

        if(!user) {
            throw new AppError("User not found", 404)
        }

        const alreadyFollowing = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId,
                },
            },
        });

        if (alreadyFollowing) {
            return { message: "Already following" };
        }

        await prisma.follow.create({data: {followerId,followingId,}})

        return { "following": true };
    },

    async unfollow(followerId: string, followingId: string) {
        if (followerId === followingId) {
            throw new AppError("You cannot unfollow yourself", 400);
        }

        await prisma.follow.deleteMany({
            where: {
                followerId,
                followingId,
            },
        });

        return { unfollowing: true };
    },

    async listFollowers(userId: string) {

        const followers = await prisma.follow.findMany({
            where: {
                followingId: userId,
            },
            select: {
                follower: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return followers
    },

    async listFollowing(userId: string) {

        const followers = await prisma.follow.findMany({
            where: {
                followerId: userId,
            },
            select: {
                following: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return followers
    },
}