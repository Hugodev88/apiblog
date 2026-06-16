import { prisma } from "../../lib/prisma"

export const postService = {
    async list() {
        return prisma.post.findMany()
    }
}
