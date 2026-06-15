import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";

export const routes = Router();

routes.use("/users", userRoutes);