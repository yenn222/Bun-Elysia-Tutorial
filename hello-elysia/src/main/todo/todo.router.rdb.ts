import { Elysia } from "elysia";
import { TodoHandlerRdbms as TodoHandler } from "~/main/todo/todo.handler.rdb";
import { TodoModel } from "~/main/todo/todo.model";

export const todoRouter = new Elysia({ prefix: "/todos" })
  .use(TodoModel)
  .get("/", () => TodoHandler.findAll(), {
    detail: {
      tags: ["Todo"],
      description: "Todo 서비스를 제공하는 API입니다. 모든 목록을 조회합니다.",
    },
  })
  .get("/:id", ({ params }) => TodoHandler.findById(params.id), {
    detail: {
      tags: ["Todo"],
      description:
        "Todo 서비스를 제공하는 API입니다. 특정 ID를 통해 조회합니다.",
    },
    params: "todo.id",
    transform({ params }) {
      params.id = Number(params.id);
    },
  })
  .post(
    "/",
    ({ set, body }) => {
      set.status = 201;
      TodoHandler.add(body);
    },
    {
      detail: {
        tags: ["Todo"],
        description: "Todo 서비스를 제공하는 API입니다. body를 등록합니다.",
      },
      body: "todo.todoDto",
    },
  )
  .patch("/:id", ({ params, body }) => TodoHandler.update(params.id, body), {
    detail: {
      tags: ["Todo"],
      description:
        "Todo 서비스를 제공하는 API입니다. 특정 ID를 통해 수정합니다.",
    },
    params: "todo.id",
    transform({ params }) {
      params.id = Number(params.id);
    },
    body: "todo.todoDto",
  })

  .delete("/:id", ({ params }) => TodoHandler.remove(params.id), {
    detail: {
      tags: ["Todo"],
      description:
        "Todo 서비스를 제공하는 API입니다. 특정 ID를 통해 삭제합니다.",
    },
    params: "todo.id",
    transform({ params }) {
      params.id = Number(params.id);
    },
  });
