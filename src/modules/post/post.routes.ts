import { Router } from "express";
import { postController } from "./post.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

export const postRoutes = Router()

postRoutes.get('/', postController.listPosts)
postRoutes.post("/",authMiddleware,postController.createPost);
