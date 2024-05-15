import {beforeAll, beforeEach, describe, expect, test} from "bun:test";
import {TodoHandler} from "~/main/todo/todo.handler";
import {TodoData } from "~/main/todo/todo.data";
import {Todo, TodoDto} from "~/main/todo/todo.model";


describe("Todo Handle Test Bundle", () => {


    test("FindAll", async () => {
        const expected = TodoData.todoData;
        const actual = TodoHandler.findAll();

        expect(actual).toEqual(expected);
    });

    test("FindById", async () => {
        const expected = TodoData.todoData[0];
        const actual = TodoHandler.findById(1);
        expect(actual).toEqual(expected);
    });

    describe("adding", async () => {

            let expected : Todo;
            let actual: Todo;

            const todo : TodoDto = {
                title: "Test Todo",
                status: "done",
            }

        beforeEach(() => {
            TodoData.initialize();
            actual = TodoHandler.add(todo);
            expected = {
                id : actual.id,
                    ...todo,
            }
        });

        test("Add1", async () => {
                expect(actual).toEqual(expected);
        })

        test("Add2", async () => {
            expect(TodoData.todoData).toContainEqual(expected);
        })

    });

    describe("updating", async () => {
            let actual : Todo | {};
            let expected : Todo;

            const dummy : TodoDto = {
                title: "dummy 1",
                status: "done"
            }
            const updated : TodoDto = {
                title: "Update Todo",
                status: "done",
            }

            beforeEach(() => {
                TodoData.initialize();
                const {id} = TodoHandler.add(dummy);
                expected = {id, ...updated};
                actual = TodoHandler.update(id, updated);
            });

        test("Update 1", async () => {
                expect(actual).toEqual(expected);
        })

        test("Update 2", async () => {
            expect(TodoData.todoData).toContainEqual(expected);
        })

    });

    describe("removing", async () => {
        let actual : Todo | {};
        let expected : Todo;

        const dummy : TodoDto = {
            title: "dummy 1",
            status: "done"
        }

        beforeEach(() => {
            TodoData.initialize();
            const {id} = TodoHandler.add(dummy);
            expected = {id, ...dummy};
            actual = TodoHandler.remove(id) as Todo;
        });

        test("Remove 1", async () => {
            expect(actual).toEqual(expected);
        })

        test("Remove 2", async () => {
            expect(TodoData.todoData).not.toContainEqual(expected);
        })

    });
});
