import {appendToListObject, buildFileName, buildNameObject, buildPathObject, buildStyleObject} from "./";

describe("util tests", () => {
    test("buildNameObj", () => {
        const tests = [
            {input: "test", expect: "test"},
            {input: "test-name", expect: "testName"},
            {input: " test-name ", expect: "testName"},
            {input: "test-name-", expect: "testName"},
            {input: "-test-name-", expect: "testName"},
            {input: "TEST-NAME", expect: "testName"}
        ];

        tests.forEach(t => {
            const name = buildNameObject(t.input);
            expect(name.camel).toBe(t.expect);
        });
    });

    test("buildStyleObject", () => {
        const tests = [
            {input: "color: #fff", expect: {color: "#fff"}},
            {input: "color: #fff;", expect: {color: "#fff"}},
            {input: "color: #fff; margin: 2rem;", expect: {color: "#fff", margin: "2rem"}},
            {
                input: "color: #fff; margin: 2rem; border-radius: 0.5rem;",
                expect: {color: "#fff", margin: "2rem", borderRadius: "0.5rem"}
            }
        ];

        tests.forEach(test => {
            const style = buildStyleObject(test.input);
            expect(style).toEqual(test.expect);
        });
    });

    test("buildPathObject", () => {
        // due to variations of paths between operating systems and machines
        // this is hard to test, this is purely for code coverage's sake

        const pathObject = buildPathObject("assets/svg");
        expect(pathObject).toEqual(pathObject);
    });

    test("buildFileName", () => {
        const tests = [
            {name: "icon", ts: false, expect: "icon.js"},
            {name: "icon", ts: false, jsx: false, expect: "icon.js"},
            {name: "icon", ts: true, expect: "icon.ts"},
            {name: "icon", ts: true, jsx: false, expect: "icon.ts"},
            {name: "icon", ts: false, jsx: true, expect: "icon.jsx"},
            {name: "icon", ts: true, jsx: true, expect: "icon.tsx"}
        ];

        tests.forEach(test => {
            const fileName = buildFileName(test.name, test.ts, test.jsx);
            expect(fileName).toEqual(test.expect);
        });
    });

    test("appendToListObject", () => {
        const svgData: SVGData[] = [
            {
                name: {
                    camel: "svgOne",
                    hyphen: "svg-one"
                },
                element: {
                    name: "title",
                    type: "print",
                    value: "svg-one"
                }
            },
            {
                name: {
                    camel: "svgTwo",
                    hyphen: "svg-two"
                },
                element: {
                    name: "title",
                    type: "print",
                    value: "svg-two"
                }
            }
        ];

        let list: SVGList = {};
        svgData.forEach((data: SVGData, index: number) => {
            list = appendToListObject(data, list);
            expect(Object.keys(list).length).toBe(index + 1);

            for (let i = 0; i <= index; i++) {
                const {camel, hyphen: name} = svgData[i].name;
                const {attributes, children} = svgData[i].element;
                expect(list[camel]).toEqual({name, attributes, children});
            }
        });
    });
});
