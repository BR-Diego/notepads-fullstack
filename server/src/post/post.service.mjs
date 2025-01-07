import { db } from "../db.mjs";
import { createPostSchema } from "./schemas/create-post.schema.mjs";
import { createPostCommentSchema } from "./schemas/create-post-comment.schema.mjs";

export async function listPosts({ limit, offset }) {
  const posts = db
    .prepare(
      `
    SELECT * FROM posts
    ORDER BY id DESC
    LIMIT ? OFFSET ?;`
    )
    .all(limit, offset);
  const { posts_count: count } = db
    .prepare(`SELECT COUNT(id) as posts_count FROM posts`)
    .get();
  return {
    posts,
    count,
  };
}

export async function createPost(data) {
  await createPostSchema.parseAsync(data);
  const nextPost = db
    .prepare(
      `INSERT INTO posts (content)
          VALUES (?) returning *;`
    )
    .get(data.content);
  return nextPost;
}

export async function readPost(id) {
  const post = db
    .prepare(
      `
    SELECT * FROM posts WHERE id=?;
    `
    )
    .get(id);
  return post;
}

export async function updatePost(id, data) {
  const post = db
    .prepare(
      `
  UPDATE posts
	SET content = ?
	WHERE id = ? returning *;`
    )
    .get(data.content, id);
  return post;
}

export async function deletePost(id) {
  const post = db.prepare(`DELETE FROM posts WHERE id=? returning *;`).get(id);
  return post;
}

export async function listPostComments(postId) {
  const comments = db
    .prepare(`SELECT id, message, created_at FROM comments WHERE post_id = ?`)
    .all(postId);
  return comments;
}

export async function createPostComments(postId, data) {
  await createPostCommentSchema.parseAsync(data);
  const comment = db
    .prepare(
      `
      INSERT INTO comments (message, post_id)
      VALUES (?, ?) returning *`
    )
    .get(data.message, postId);
  return comment;
}
