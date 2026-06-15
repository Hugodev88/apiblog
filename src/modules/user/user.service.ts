import { prisma } from "../../lib/prisma";

export const userService = {

  async list() {
    return prisma.user.findMany();
  },
  
};