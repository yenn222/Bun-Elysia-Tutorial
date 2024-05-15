import { Elysia } from "elysia";

import { GreetHandler } from "~/main/greet/greet.handler";
export const greetRouter = new Elysia({ prefix: "/greets" }).get("/", () =>
  GreetHandler.helloElysia(),
);
