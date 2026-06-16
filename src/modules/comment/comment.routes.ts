import { Router } from "express";
import { commentController } from "./comment.controller";

export const commentRoutes = Router()

commentRoutes.get('/', commentController.listComments)