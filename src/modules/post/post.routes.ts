import { Router } from "express";
import { postController } from "./post.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { likeController } from "../like/like.controller";

export const postRoutes = Router()

postRoutes.get('/feed', authMiddleware, postController.listFeed)
postRoutes.get('/', authMiddleware ,postController.listPosts)
postRoutes.get("/:id", postController.getById)

postRoutes.post("/",authMiddleware, postController.createPost);
postRoutes.patch("/:id", authMiddleware, postController.updatePost)
postRoutes.delete("/:id", authMiddleware, postController.deletePost)

// LIKES

postRoutes.post("/:id/like", authMiddleware, likeController.likePost);
postRoutes.delete("/:id/like", authMiddleware, likeController.unlikePost);

// feed
