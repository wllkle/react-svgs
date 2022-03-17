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
            }
        ];


        names.forEach(name => {
            const nameObj = getNameObj(name.input);
            console.log(nameObj);
            expect(nameObj.camel).toBe(name.expect);
        });
    });
});
