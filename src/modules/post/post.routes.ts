import { Router } from "express";
import { postController } from "./post.controller";

export const postRoutes = Router()

postRoutes.get('/', postController.listPosts)