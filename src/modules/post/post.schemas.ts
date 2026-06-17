import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must have at least 3 characters"),

  content: z
    .string()
    .min(10, "Content must have at least 10 characters"),
});

export const updatePostSchema = createPostSchema.partial();