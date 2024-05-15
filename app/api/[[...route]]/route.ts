import { Hono } from "hono";
import { z } from "zod";
import { handle } from "hono/vercel";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { get } from "http";
import accounts from "./accounts";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// app.use("/api", clerkMiddleware());

const routes = app.route("/accounts", accounts);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
