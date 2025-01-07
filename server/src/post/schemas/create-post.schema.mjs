import { z } from "zod";

const content = z
  .string()
  .min(16, {
    message: "Content should have at least 16 characters.",
  })
  .max(270, {
    message: "Content should have 960 characters tops.",
  });

export const createPostSchema = z.object({
  content,
});
