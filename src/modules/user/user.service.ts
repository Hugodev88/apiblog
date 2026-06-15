import { prisma } from "../../lib/prisma";

export const userService = {
  async create(data: { name: string; email: string; password: string }) {
    return prisma.user.create({ data });
  },

  async list() {
    return prisma.user.findMany();
  },
};