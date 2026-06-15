import { Router } from "express";
import { createUser, listUsers } from "./user.controller";

export const userRoutes = Router();

userRoutes.post("/", createUser);
userRoutes.get("/", listUsers);