import { cleanJsonString } from "./clean-json-string.utils";

describe("cleanJson Utility Function", () => {
  it("should clean a JSON object with string values", () => {
    const jsonObject = {
      name: "John Doe",
      age: "30",
      address: {
        city: "Exampleville",
        country: "Exampleland",
      },
    };

    cleanJsonString(jsonObject);

    expect(jsonObject).toEqual({
      name: "John Doe",
      age: "30",
      address: {
        city: "Exampleville",
        country: "Exampleland",
      },
    });
  });

  it("should clean a JSON object with escaped double quotes", () => {
    const jsonObject = {
      message: 'This is a \\"quoted\\" message',
      data: {
        description: 'Another \\"escaped\\" string',
      },
    };

    cleanJsonString(jsonObject);

    expect(jsonObject).toEqual({
      message: 'This is a "quoted" message',
      data: {
        description: 'Another "escaped" string',
      },
    });
  });

  it("should handle cleaning nested arrays", () => {
    const jsonObject = {
      items: [
        "item1",
        "item2",
        {
          nestedItem: "nestedItemValue",
        },
      ],
    };

    cleanJsonString(jsonObject);

    expect(jsonObject).toEqual({
      items: [
        "item1",
        "item2",
        {
          nestedItem: "nestedItemValue",
        },
      ],
    });
  });

  it("should handle cleaning mixed JSON structures", () => {
    const jsonObject = {
      name: "John Doe",
      age: 30,
      details: {
        address: {
          city: "Exampleville",
          country: "Exampleland",
        },
        nestedArray: ["item1", "item2", { key: "value" }],
        message: 'This is a \\"quoted\\" message',
      },
    };

    cleanJsonString(jsonObject);

    expect(jsonObject).toEqual({
      name: "John Doe",
      age: 30,
      details: {
        address: {
          city: "Exampleville",
          country: "Exampleland",
        },
        nestedArray: ["item1", "item2", { key: "value" }],
        message: 'This is a "quoted" message',
      },
    });
  });
});
