import { describe, test, expect } from "bun:test";
import {GreetHandler} from "~/main/greet/greet.handler";

describe("Greet Handle Test Bundle", () => { //묶음
    test("HelloElysia should be return 'Hello, Elysia'", () => { //테스트 세부
        //expect
        const expected = "Hello, Elysia";
        //actual
        const actual = GreetHandler.helloElysia();
        //compare
        expect(actual).toEqual(expected);
    });
});
