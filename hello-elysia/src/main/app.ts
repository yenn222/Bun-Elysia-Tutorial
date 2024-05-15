import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";
import { greetRouter } from "~/main/greet/greet.router";
import { TodoData } from "~/main/todo/todo.data";
import { todoRouter } from "~/main/todo/todo.router";

const elysiaOption = {
  port: Bun.env.PORT || 3000, //or연산자로 PORT값 지켜주기
  tls: {
    key: Bun.file("resource/cert/privkey.pem"),
    cert: Bun.file("resource/cert/fullchain.pem"),
  },
};

TodoData.initialize();

const app = new Elysia()
  .use(
    staticPlugin({
      assets: "resource/public",
    }),
  )
  .use(greetRouter)
  .use(todoRouter)
  .get("/", () => Bun.file("resource/public/index.html"))
  .onError(({ code }) => {
    if (code === "NOT_FOUND") {
      return "Route not found";
    }
  })
  .listen(elysiaOption);

console.info(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
