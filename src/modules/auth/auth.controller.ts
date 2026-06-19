import { Request, Response } from "express";
import { authService } from "./auth.service";
import { registerSchema, loginSchema } from "./auth.schemas";

export const authController = {
    async register(req: Request, res: Response) {
        const parsed = registerSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation error",
                errors: parsed.error.flatten(),
            });
        }

        const user = await authService.register(parsed.data);

        res.json(user);
    },

    async login(req: Request, res: Response) {
      const parsed = loginSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          message: "Validation error",
          errors: parsed.error.flatten(),
        });
      }

      const result = await authService.login(parsed.data);

      res.json(result);
    },
};