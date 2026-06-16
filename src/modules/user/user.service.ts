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

	async edit(){

	},

};