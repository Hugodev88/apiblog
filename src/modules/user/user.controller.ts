import { Request, Response } from "express";
import { userService } from "./user.service";

export async function createUser(req: Request, res: Response) {
  const user = await userService.create(req.body);
  res.json(user);
}

export async function listUsers(req: Request, res: Response) {
  const users = await userService.list();
  res.json(users);
}