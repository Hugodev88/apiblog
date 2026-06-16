import { Router } from "express";
import { userController } from "./user.controller";

export const userRoutes = Router();

userRoutes.get("/", userController.listUsers);