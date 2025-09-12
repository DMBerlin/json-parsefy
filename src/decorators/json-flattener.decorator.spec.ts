import { plainToClass } from "class-transformer";
import {
  JSONFlattener,
  loadClassTransformer,
  warnMissingDependency,
} from "../decorators/json-flattener.decorator";
import * as bfsParsingModule from "../utils/bfs-parsing.utils";
import * as decoratorModule from "../decorators/json-flattener.decorator";

class TestClass {
  @JSONFlattener()
  jsonProperty: any;
}

const mockConsoleWarn = jest
  .spyOn(console, "warn")
  .mockImplementation(() => {});

describe("JSONFlattener Decorator", () => {
  it("should work on json objects", () => {
    const jsonObject = {
      place: {
        name: "place-name",
        country: "place-country",
      },
      something: "something",
      local: {
        status: false,
        reference: 45796,
        mix: [125, false, "true"],
      },
    };

    const testClass: TestClass = plainToClass(TestClass, {
      jsonProperty: jsonObject,
    });
    expect(testClass.jsonProperty).toMatchObject(jsonObject);
  });

  it("should parse normal json string into object", async () => {
    const jsonString = JSON.stringify({
      name: "user-name",
      email: "user-email",
      prop: {
        nested: {},
        someProp: "some-prop",
      },
      identity: "user-identity",
    });

    const testClass: TestClass = plainToClass(TestClass, {
      jsonProperty: jsonString,
    });
    expect(testClass.jsonProperty).toMatchObject(JSON.parse(jsonString));
  });

  it("should work on json strings with escaped characters", () => {
    const escapedJsonString =
      '"{\\r\\n    \\"glossary\\": {\\r\\n        \\"title\\": \\"example glossary\\",\\r\\n        \\"GlossDiv\\": {\\r\\n            \\"title\\": \\"S\\",\\r\\n            \\"GlossList\\": {\\r\\n                \\"GlossEntry\\": {\\r\\n                    \\"ID\\": \\"SGML\\",\\r\\n                    \\"SortAs\\": \\"SGML\\",\\r\\n                    \\"GlossTerm\\": \\"Standard Generalized Markup Language\\",\\r\\n                    \\"Acronym\\": \\"SGML\\",\\r\\n                    \\"Abbrev\\": \\"ISO 8879:1986\\",\\r\\n                    \\"GlossDef\\": {\\r\\n                        \\"para\\": \\"A meta-markup language, used to create markup languages such as DocBook.\\",\\r\\n                        \\"GlossSeeAlso\\": [\\"GML\\", \\"XML\\"]\\r\\n                    },\\r\\n                    \\"GlossSee\\": \\"markup\\"\\r\\n                }\\r\\n            }\\r\\n        }\\r\\n    }\\r\\n}"';

    const unescapedJsonString = {
      glossary: {
        title: "example glossary",
        GlossDiv: {
          title: "S",
          GlossList: {
            GlossEntry: {
              ID: "SGML",
              SortAs: "SGML",
              GlossTerm: "Standard Generalized Markup Language",
              Acronym: "SGML",
              Abbrev: "ISO 8879:1986",
              GlossDef: {
                para: "A meta-markup language, used to create markup languages such as DocBook.",
                GlossSeeAlso: ["GML", "XML"],
              },
              GlossSee: "markup",
            },
          },
        },
      },
    };

    const testClass: TestClass = plainToClass(TestClass, {
      jsonProperty: escapedJsonString,
    });

    expect(testClass.jsonProperty).toMatchObject(unescapedJsonString);
  });

  describe("Error handling scenarios", () => {
    beforeEach(() => {
      mockConsoleWarn.mockClear();
    });

    it("should handle transform errors gracefully", () => {
      const mockBfsParsing = jest
        .spyOn(bfsParsingModule, "bfsParsing")
        .mockImplementation(() => {
          throw new Error("Parsing error");
        });

      class ErrorTestClass {
        @JSONFlattener()
        jsonProperty: any;
      }

      expect(() => {
        plainToClass(ErrorTestClass, {
          jsonProperty: '{"valid": "json"}',
        });
      }).toThrow("{}");

      mockBfsParsing.mockRestore();
    });

    it("should handle empty strings that cause errors", () => {
      const mockBfsParsing = jest
        .spyOn(bfsParsingModule, "bfsParsing")
        .mockImplementation(() => {
          throw new Error("Empty string error");
        });

      class EmptyStringTestClass {
        @JSONFlattener()
        jsonProperty: any;
      }

      expect(() => {
        plainToClass(EmptyStringTestClass, {
          jsonProperty: "",
        });
      }).toThrow("{}");

      mockBfsParsing.mockRestore();
    });

    it("should handle strings that return undefined from bfsParsing", () => {
      class NonParsableTestClass {
        @JSONFlattener()
        jsonProperty: any;
      }

      const testClass: NonParsableTestClass = plainToClass(
        NonParsableTestClass,
        {
          jsonProperty: "not json",
        },
      );

      expect(testClass.jsonProperty).toBeUndefined();
    });

    it("should return non-string values unchanged", () => {
      const numberValue = 42;
      const booleanValue = true;
      const objectValue = { key: "value" };
      const arrayValue = [1, 2, 3];
      const nullValue = null;
      const undefinedValue = undefined;

      class MultiTypeTestClass {
        @JSONFlattener()
        numberProp: any;

        @JSONFlattener()
        booleanProp: any;

        @JSONFlattener()
        objectProp: any;

        @JSONFlattener()
        arrayProp: any;

        @JSONFlattener()
        nullProp: any;

        @JSONFlattener()
        undefinedProp: any;
      }

      const testClass: MultiTypeTestClass = plainToClass(MultiTypeTestClass, {
        numberProp: numberValue,
        booleanProp: booleanValue,
        objectProp: objectValue,
        arrayProp: arrayValue,
        nullProp: nullValue,
        undefinedProp: undefinedValue,
      });

      expect(testClass.numberProp).toBe(numberValue);
      expect(testClass.booleanProp).toBe(booleanValue);
      expect(testClass.objectProp).toEqual(objectValue);
      expect(testClass.arrayProp).toEqual(arrayValue);
      expect(testClass.nullProp).toBe(nullValue);
      expect(testClass.undefinedProp).toBe(undefinedValue);
    });
  });

  describe("Helper functions", () => {
    beforeEach(() => {
      mockConsoleWarn.mockClear();
    });

    it("should test loadClassTransformer function", () => {
      const result = loadClassTransformer();
      expect(result).toBeTruthy();
      expect(result.Transform).toBeDefined();
    });

    it("should test warnMissingDependency function", () => {
      warnMissingDependency();
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        "JSONFlattener decorator requires 'class-transformer' as a peer dependency. Install it with: npm install class-transformer",
      );
    });

    it("should test loadClassTransformer error path", () => {
      const originalEval = globalThis.eval;
      globalThis.eval = jest.fn().mockImplementation(() => {
        throw new Error("Module not found");
      });

      const result = loadClassTransformer();
      expect(result).toBeNull();
      globalThis.eval = originalEval;
    });

    it("should create decorator with no class-transformer", () => {
      const mockLoadClassTransformer = jest
        .spyOn(decoratorModule, "loadClassTransformer")
        .mockReturnValue(null);
      const mockWarn = jest
        .spyOn(decoratorModule, "warnMissingDependency")
        .mockImplementation(() => {});

      const decorator = JSONFlattener();
      expect(decorator).toBeInstanceOf(Function);

      mockLoadClassTransformer.mockRestore();
      mockWarn.mockRestore();
    });

    it("should create decorator with incomplete class-transformer", () => {
      const mockLoadClassTransformer = jest
        .spyOn(decoratorModule, "loadClassTransformer")
        .mockReturnValue({
          plainToClass: jest.fn(),
        });
      const mockWarn = jest
        .spyOn(decoratorModule, "warnMissingDependency")
        .mockImplementation(() => {});

      const decorator = JSONFlattener();
      expect(decorator).toBeInstanceOf(Function);

      mockLoadClassTransformer.mockRestore();
      mockWarn.mockRestore();
    });
  });
});
