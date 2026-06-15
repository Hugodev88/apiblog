import { Router } from "express";
import { listUsers } from "./user.controller";

export const userRoutes = Router();

userRoutes.get("/", listUsers);