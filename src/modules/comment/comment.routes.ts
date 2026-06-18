import { Router } from "express";
import { commentController } from "./comment.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

export const commentRoutes = Router()

commentRoutes.get('/', commentController.listComments)

commentRoutes.post('/', authMiddleware, commentController.createComment)
commentRoutes.patch("/:id", authMiddleware, commentController.updateComment);
commentRoutes.delete("/:id", authMiddleware, commentController.deleteComment)