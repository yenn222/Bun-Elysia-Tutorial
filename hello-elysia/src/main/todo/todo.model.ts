import { Elysia, Static, t } from "elysia";

const status = t.Union([
  t.Literal("done"), //값 그대로 데이터타입으로 생각하겠다는 뜻
  t.Literal("pending"),
  t.Literal("progress"),
]);

const todo = t.Object({
  id: t.Number(),
  title: t.String(),
  status,
});

export type Todo = Static<typeof todo>;

const todoDto = t.Object({
  title: t.String(),
  status,
});

export type TodoDto = Static<typeof todoDto>;

export const TodoModel = new Elysia().model({
  "todo.todo": t.Object({
    todo: todo,
  }),
  "todo.todos": t.Object({
    todos: t.Array(todo),
  }),
  "todo.id": t.Object({
    id: t.Number(),
  }),
  "todo.todoDto": todoDto,
});
