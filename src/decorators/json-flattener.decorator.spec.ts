import { JSONFlattener } from "./json-flattener.decorator";
import { plainToClass } from "class-transformer";

class TestClass {
  @JSONFlattener()
  jsonProperty: any;
}

describe("JSONFlattener Decorator", () => {
  let jsonObject: Record<string, any>;
  let validJSONString: string;
  let messyJSONString: string;
  let unMessifiedJSONString: string;

  beforeAll(() => {
    jsonObject = {
      place: {
        name: "place-name",
        countr: "place-country",
      },
      something: "something",
      local: {
        status: false,
        reference: 45796,
        mix: [125, false, "true"],
      },
    };
    validJSONString = JSON.stringify({
      name: "user-name",
      email: "user-email",
      prop: {
        nested: {},
        someProp: "some-prop",
      },
      identity: "user-identity",
    });
    messyJSONString =
      '"{\\r\\n    \\"glossary\\": {\\r\\n        \\"title\\": \\"example glossary\\",\\r\\n        \\"GlossDiv\\": {\\r\\n            \\"title\\": \\"S\\",\\r\\n            \\"GlossList\\": {\\r\\n                \\"GlossEntry\\": {\\r\\n                    \\"ID\\": \\"SGML\\",\\r\\n                    \\"SortAs\\": \\"SGML\\",\\r\\n                    \\"GlossTerm\\": \\"Standard Generalized Markup Language\\",\\r\\n                    \\"Acronym\\": \\"SGML\\",\\r\\n                    \\"Abbrev\\": \\"ISO 8879:1986\\",\\r\\n                    \\"GlossDef\\": {\\r\\n                        \\"para\\": \\"A meta-markup language, used to create markup languages such as DocBook.\\",\\r\\n                        \\"GlossSeeAlso\\": [\\"GML\\", \\"XML\\"]\\r\\n                    },\\r\\n                    \\"GlossSee\\": \\"markup\\"\\r\\n                }\\r\\n            }\\r\\n        }\\r\\n    }\\r\\n}"';
    unMessifiedJSONString = JSON.stringify({
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
    });
  });

  it("should work on valid json strings", async () => {
    const testClass: TestClass = plainToClass(TestClass, {
      jsonProperty: validJSONString,
    });
    expect(testClass.jsonProperty).toEqual(validJSONString);
  });

  it("should work on messy json strings", () => {
    const testClass: TestClass = plainToClass(TestClass, {
      jsonProperty: messyJSONString,
    });
    expect(testClass.jsonProperty).toEqual(unMessifiedJSONString);
  });

  it("should work on json objects", () => {
    const testClass: TestClass = plainToClass(TestClass, {
      jsonProperty: jsonObject,
    });
    expect(testClass.jsonProperty).toEqual(jsonObject);
  });
});
