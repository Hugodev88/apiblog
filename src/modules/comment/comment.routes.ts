import { Router } from "express";
import { commentController } from "./comment.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

export const commentRoutes = Router()

commentRoutes.get('/', commentController.listComments)

commentRoutes.post('/', authMiddleware, commentController.createComment)