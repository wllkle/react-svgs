import {getNameObj} from "./index";

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
            },
            {
                input: "test-name.svg",
                expect: "testName"
            }
        ];

        names.forEach(n => {
            const nameObj = getNameObj(n.input);
            expect(nameObj.camel).toBe(n.expect);
        });
    });
});
