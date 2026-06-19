import { AppError } from "../../errors/AppError"
import { prisma } from "../../lib/prisma"

export const likeService = {
    async like(postId: string, userId: string) {
        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            throw new AppError("Post not found", 404);
        }

        const likeExists = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId
                }
            }
        });

        if (likeExists) {
            return { message: "Post already liked" };
        }

        await prisma.like.create({
            data: {
                postId,
                userId
            }
        });

        return { message: "Post liked" };
    },

    async unlike(postId: string, userId: string) {
        const like = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });

        if (!like) {
            throw new AppError("Like not found", 404);
        }

        await prisma.like.delete({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });

        return { message: "Post unliked" };
    }
}