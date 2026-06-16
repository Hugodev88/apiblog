import { prisma } from "../../lib/prisma";

export const postService = {
    async create(data: {
        title: string;
        content: string;
        authorId: string;
    }) {
        const post = await prisma.post.create({
        data: {
            title: data.title,
            content: data.content,
            authorId: data.authorId,
        },
        });

        return post;
    },

    async list(){
        const posts = await prisma.post.findMany()
        return posts
    }
};