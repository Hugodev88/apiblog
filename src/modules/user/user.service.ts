import { AppError } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

export const userService = {

	async list() {
		return prisma.user.findMany(
			{
				select: {
					id: true,
					name: true,
					email: true,
				}
			}
		);
	},

	async getUserById(profileUserId: string, currentUserId: string) {
		const user = await prisma.user.findUnique({
			where: {
			id: profileUserId,
			},
			select: {
			id: true,
			name: true,
			email: true,

			_count: {
				select: {
				posts: true,
				followers: true,
				following: true,
				},
			},
			},
		});

		if (!user) {
			throw new AppError("User not found", 404);
		}

		const isFollowing = await prisma.follow.findUnique({
			where: {
			followerId_followingId: {
				followerId: currentUserId,
				followingId: profileUserId,
			},
			},
		});

		return {
			id: user.id,
			name: user.name,
			email: user.email,

			postsCount: user._count.posts,
			followersCount: user._count.followers,
			followingCount: user._count.following,

			isFollowing: !!isFollowing,
		};
	}

};