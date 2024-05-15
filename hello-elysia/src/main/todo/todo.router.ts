import { Elysia } from "elysia";
import { TodoHandler } from "~/main/todo/todo.handler";
import { TodoModel } from "~/main/todo/todo.model";

export const todoRouter = new Elysia({ prefix: "/todos" })
  .use(TodoModel)
  .get("/", () => TodoHandler.findAll())
  .get("/:id", ({ params }) => TodoHandler.findById(params.id), {
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
      body: "todo.todoDto",
    },
  )
  .patch("/:id", ({ params, body }) => TodoHandler.update(params.id, body), {
    params: "todo.id",
    transform({ params }) {
      params.id = Number(params.id);
    },
    body: "todo.todoDto",
  })

  .delete("/:id", ({ params }) => TodoHandler.remove(params.id), {
    params: "todo.id",
    transform({ params }) {
      params.id = Number(params.id);
    },
  });
