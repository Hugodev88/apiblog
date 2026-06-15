import { Request, Response } from "express";
import { userService } from "./user.service";

export async function listUsers(req: Request, res: Response) {
  const users = await userService.list();
  res.json(users);
}