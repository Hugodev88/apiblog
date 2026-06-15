import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/auth", authRoutes);