import { AppError } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

export const postService = {

    async list({userId,cursor,limit = 10,sort,}: {userId?: string;cursor?: string;limit?: number; sort?: string;}) {
    const orderBy =sort === "likes"? {
        likes: {
            _count: "desc" as const,
        },
        }: {
            createdAt: "desc" as const,
        };

    const posts = await prisma.post.findMany({
        take: limit,

        ...(cursor &&
        sort !== "likes" && {
            cursor: {
            id: cursor,
            },
            skip: 1,
        }),

        orderBy,

        select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,

        author: {
            select: {
            name: true,
            },
        },

        _count: {
            select: {
            comments: true,
            likes: true,
            },
        },

        likes: {
            where: {
            userId,
            },
            select: {
            userId: true,
            },
        },
        },
    });

    const lastPost = posts[posts.length - 1];

    return {
        data: posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,

        author: post.author,

        commentsCount: post._count.comments,
        likesCount: post._count.likes,

        likedByMe: post.likes.length > 0,
        })),

        nextCursor:
        sort === "likes"
            ? null
            : lastPost?.id ?? null,

        hasNextPage:
        sort === "likes"
            ? false
            : posts.length === limit,
    };
    },

    async findbyId(postId: string){
        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: { 
                        name: true,
                        id: true, 
                    },
                },
                comments: {
                    select: {
                        content: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        if (!post) {
            throw new AppError("Post not found", 404);
        }

        return post
    },

    async create(data: {title: string;content: string;authorId: string;}) {
        const post = await prisma.post.create({
            data: {
                title: data.title,
                content: data.content,
                authorId: data.authorId,
            },
        });

        return post;
    },

    async update(postId: string, data: {title?: string; content?: string; authorId: string;}){
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            }
        })

        if(!post) {
            throw new AppError("Post not found", 404);
        }

        if(post.authorId !== data.authorId){
            throw new AppError("You are not allowed to edit this post", 403);
        }

        return prisma.post.update({
            where: {
                id: postId,
                },
            data: {
                title: data.title,
                content: data.content,
            },
        });
    },

    async delete(postId: string, userId: string){
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });

        if (!post) {
            throw new AppError("Post not found", 404);
        }

        if (post.authorId !== userId) {
            throw new AppError("You are not allowed to delete this post", 403);
        }

        await prisma.post.delete({
            where: {
                id: postId,
            },
        });
    },   
    
};