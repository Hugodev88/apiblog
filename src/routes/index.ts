import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { postRoutes } from "../modules/post/post.routes";
import { commentRoutes } from "../modules/comment/comment.routes";

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/auth", authRoutes);
routes.use("/posts", postRoutes);
routes.use("/comments", commentRoutes)