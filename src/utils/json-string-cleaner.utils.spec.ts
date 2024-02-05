import { cleanJsonString } from "@utils/json-string-cleaner.utils";

describe("cleanJson Utility Function", () => {
  it("should not change valid JSON strings", () => {
    const json: string = JSON.stringify({
      name: "John Doe",
      age: "30",
      address: {
        city: "Exampled",
        country: "Exampled",
      },
    });

    const actual: Record<string, any> = cleanJsonString(json);

    expect(actual).toMatchObject({
      name: "John Doe",
      age: "30",
      address: {
        city: "Exampled",
        country: "Exampled",
      },
    });
  });

  it("should clean a JSON from escaped quotes", () => {
    const json: string = JSON.stringify({
      // eslint-disable-next-line
      message: "This is a \"quoted\" message",
      data: {
        // eslint-disable-next-line
        description: "Another \"quoted\" string",
      },
    });

    const actual: Record<string, any> = cleanJsonString(json);

    expect(actual).toMatchObject({
      message: 'This is a "quoted" message',
      data: {
        description: 'Another "quoted" string',
      },
    });
  });

  it("should not change json with nested properties", () => {
    const json: string = JSON.stringify({
      items: [
        "item1",
        "item2",
        {
          nestedItem: "nestedItemValue",
        },
      ],
    });

    const actual: Record<string, any> = cleanJsonString(json);

    expect(actual).toMatchObject({
      items: [
        "item1",
        "item2",
        {
          nestedItem: "nestedItemValue",
        },
      ],
    });
  });

  it("should handle cleaning mixed json structures", () => {
    const json: string = JSON.stringify({
      name: "John Doe",
      age: 30,
      details: {
        address: {
          city: "Exampled",
          country: "Exampled",
        },
        nestedArray: ["item1", "item2", { key: "value" }],
        // eslint-disable-next-line
        message: "This is a \"quoted\" message",
      },
    });

    const actual: Record<string, any> = cleanJsonString(json);

    expect(actual).toMatchObject({
      name: "John Doe",
      age: 30,
      details: {
        address: {
          city: "Exampled",
          country: "Exampled",
        },
        nestedArray: ["item1", "item2", { key: "value" }],
        message: 'This is a "quoted" message',
      },
    });
  });

  it("should handle repeated stringifies loops", () => {
    const json: string = JSON.stringify(
      JSON.stringify(
        JSON.stringify({
          name: "John Doe",
          age: "30",
          address: {
            city: "Exampled",
            country: "Exampled",
          },
        }),
      ),
    );

    const actual: Record<string, any> = cleanJsonString(json);

    expect(actual).toMatchObject({
      name: "John Doe",
      age: "30",
      address: {
        city: "Exampled",
        country: "Exampled",
      },
    });
  });
});
