import { AppError } from "../../errors/AppError";
import { prisma } from "../../lib/prisma"

export const commentService = {
    async list() {
        return prisma.comment.findMany()
    },

    async create(userId:string, postId: string, content: string){
        const post = prisma.post.findUnique({where: {id: postId}})

        if(!post) {
            throw new AppError("Post not found", 404);
        }

        const comment = prisma.comment.create({
            data: {
                content,
                postId,
                userId,
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return comment
    },

    async update(commentId: string, userId: string, data: { content: string }) {
        const comment = await prisma.comment.findUnique({
            where: {
            id: commentId,
            },
        });

        if (!comment) {
            throw new AppError("Comment not found", 404);
        }

        if (comment.userId !== userId) {
            throw new AppError("You are not allowed to edit this comment", 403);
        }

        const updatedComment = await prisma.comment.update({
            where: {
                id: commentId,
            },
            data: {
                content: data.content,
            },
            select: {
                id: true,
                content: true,
            },
        });

        return updatedComment;
    },

    async delete(commentId: string, userId: string){
        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId,
            },
        });

        if (!comment) {
            throw new AppError("Comment not found", 404);
        }

        if (comment.userId !== userId) {
            throw new AppError("You are not allowed to delete this post", 403);
        }

        await prisma.comment.delete({
            where: {
                id: commentId,
            },
        });
    },
    

}