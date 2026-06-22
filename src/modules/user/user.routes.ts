import { Router } from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { followController } from "../follow/follow.controller";

export const userRoutes = Router();

userRoutes.get("/", userController.listUsers);

// follow

userRoutes.post("/:id/follow", authMiddleware, followController.followUser)
userRoutes.delete("/:id/follow", authMiddleware, followController.unfollowUser)