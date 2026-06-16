import { prisma } from "../../lib/prisma"

export const commentService = {
    async list() {
        return prisma.comment.findMany()
    }

}