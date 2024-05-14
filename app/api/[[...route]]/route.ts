import { Hono } from "hono";
import { z } from "zod";
import { handle } from "hono/vercel";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { get } from "http";

export const runtime = "edge";

const app = new Hono().basePath("/api");
app.use("/api", clerkMiddleware());

app.get("/hello", clerkMiddleware(), (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      error: "You are not authenticated",
    });
  }
  return c.json({
    message: "Hello Authenticated!",
    userId: auth.userId,
  });
});

export const GET = handle(app);
export const POST = handle(app);
