import staticPlugin from "@elysiajs/static";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { ErrorMessage } from "~/main/common/error.message";
import { ElysiaConfig } from "~/main/configure/elysia.config";
import { RdbmsConfig } from "~/main/configure/rdbms.config";
import { greetRouter } from "~/main/greet/greet.router";
import { TodoData } from "~/main/todo/todo.data";
import { todoRouter } from "~/main/todo/todo.router";
//db에 대한 초기화
RdbmsConfig.open();
RdbmsConfig.initialize();

const app = new Elysia()
  .use(greetRouter)
  .use(todoRouter)
  .use(ElysiaConfig.elysiaStaticPlugin)
  .use(ElysiaConfig.elysiaSwaggerPlugin)
  .get("/", () => Bun.file("resource/public/index.html"))
  .onError(({ code }) => ErrorMessage.elysiaErrorMessage(code))
  .listen(ElysiaConfig.elysiaOption);

console.info(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
