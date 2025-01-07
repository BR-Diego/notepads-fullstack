import { z } from "zod";

const content = z
  .string()
  .min(16, {
    message: "Content should have at least 16 characters.",
  })
  .max(270, {
    message: "Content should have 270 characters tops.",
  });

export const PostSchema = z.object({
  content,
});
