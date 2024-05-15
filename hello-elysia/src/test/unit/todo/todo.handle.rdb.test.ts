import {afterEach, beforeAll, beforeEach, describe, expect, test} from "bun:test";
import {TodoHandler} from "~/main/todo/todo.handler";
import { TodoData } from "~/main/todo/todo.data";
import {Todo, TodoDto} from "~/main/todo/todo.model";
import {RdbmsConfig} from "~/main/configure/rdbms.config";
import {TodoHandlerRdbms} from "~/main/todo/todo.handler.rdb";


describe("Todo Handle RDBMS Test Bundle", () => {

    beforeEach(() => {
        TodoData.initialize();
        RdbmsConfig.open();
        RdbmsConfig.initialize();
    })

    afterEach(() => {
        RdbmsConfig.close();
    })

    test("FindAll", async () => {
        //Todo[]와 같은 데이터 타입을 지정해줄 것.
        const expected:Todo[] = TodoData.todoData;
        const actual:Todo[] = TodoHandlerRdbms.findAll() as Todo[];

        expect(actual).toEqual(expected);
    });

    test("FindById", async () => {
        const expected: Todo = TodoData.todoData[0];
        const actual: Todo = TodoHandler.findById(1) as Todo;
        expect(actual).toEqual(expected);
    });

    test("adding", async () => {
            const todo : TodoDto = {
                title: "Test Todo",
                status: "done",
            }

            const actual: Todo = TodoHandlerRdbms.add(todo) as Todo;
            const expected: Todo = {
                id : actual.id,
                    ...todo,
            };

            expect(actual).toEqual(expected);
    });

    test("updating", async () => {
        const dummy : TodoDto = {
            title: "dummy 1",
            status: "done"
        }

        const updated : TodoDto = {
            title: "Update Todo",
            status: "done",
        }

        const {id} = TodoHandlerRdbms.add(dummy) as Todo;
        const expected: Todo = {id, ...updated};
        const actual: Todo = TodoHandlerRdbms.update(id, updated) as Todo;

        expect(actual).toEqual(expected);
    });

    test("removing", async () => {
        const dummy : TodoDto = {
            title: "dummy 1",
            status: "done"
        }
            const {id} = TodoHandlerRdbms.add(dummy) as Todo;
            const expected: Todo = {id, ...dummy};
            const actual : Todo = TodoHandlerRdbms.remove(id) as Todo;

    expect(actual).toEqual(expected);
    });

});
