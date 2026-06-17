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
    }

}