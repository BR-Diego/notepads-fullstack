import express from "express";
import "express-async-errors";
import cors from "cors";
import { ZodError } from "zod";
import { postController } from "./post/post.controller.mjs";

const port = 8080;
const host = "0.0.0.0";
const app = express();

function handleErrorMiddleware(err, req, res, next) {
  if (err instanceof ZodError) {
    console.log(err);
    return res.status(422).json(err);
  }
  throw err;
}

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/posts", postController);
app.use(handleErrorMiddleware);

app.listen(port, host, () => {
  console.log(`Servidor em express iniciado em http://${host}:${port}`);
});
