import {buildNameObj} from "./";

describe("util tests", () => {
    test("getNameObj", () => {
        const names = [
            {
                input: "test",
                expect: "test"
            },
            {
                input: "test-name",
                expect: "testName"
            }
        ];

        names.forEach(n => {
            const nameObj = buildNameObj(n.input);
            expect(nameObj.camel).toBe(n.expect);
        });
    });
});
