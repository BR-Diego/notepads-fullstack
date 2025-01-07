import { z } from "zod";

const message = z
  .string()
  .min(4, {
    message: "Content should have at least 04 characters.",
  })
  .max(96, {
    message: "Content should have 96 characters tops.",
  });

export const createPostCommentSchema = z.object({
  message,
});
