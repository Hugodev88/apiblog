import { Router } from "express";
import { postController } from "./post.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

export const postRoutes = Router()

postRoutes.get('/', postController.listPosts)
postRoutes.get("/:id", postController.getById)

postRoutes.post("/",authMiddleware, postController.createPost);
postRoutes.patch("/:id", authMiddleware, postController.updatePost)
postRoutes.delete("/:id", authMiddleware, postController.deletePost)