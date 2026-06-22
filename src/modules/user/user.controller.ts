import { Request, Response } from "express";
import { userService } from "./user.service";

type Params = {
  id: string;
}

export const userController = {
  async listUsers(req: Request, res: Response) {
    const users = await userService.list();
    res.json(users);
  },

  async getUserById(req: Request<Params>, res: Response) {
    const profileUserId = req.params.id
    const currentUserId = req.userId

    const result = await userService.getUserById(profileUserId, currentUserId);

    res.status(200).json(result);
  },
}