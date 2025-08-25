import { bfsParsing } from "@utils/bfs-parsing.utils";

describe("Tree Json Parsing", () => {
  it("should work on normal json string data", () => {
    const data = {
      name: "John Doe",
      age: 30,
      address: {
        city: "City Address",
        country: "City Country",
      },
    };

    expect(bfsParsing(JSON.stringify(data))).toMatchObject(data);
  });

  it("should work with different valid data types", () => {
    const data = {
      name: "John Doe",
      age: 30,
      address: {
        city: "City Address",
        country: "City Country",
      },
      items: [
        "A",
        true,
        48,
        null,
        { validation: "success", status: { val: false } },
      ],
    };

    expect(bfsParsing(JSON.stringify(data))).toMatchObject(data);
  });

  it("should unescape escaped strings", () => {
    const data = {
      name: "John Doe",
      age: 30,
      details: {
        address: {
          city: "Exampled",
          country: "Exampled",
        },
        nestedArray: [
          "item1",
          "item2",
          // eslint-disable-next-line
          // prettier-ignore
          "{ \"key\": \"value\", \"data\": \"{ \\\"nested\\\": \\\"nested value\\\" }\" }",
        ],
        // eslint-disable-next-line
        // prettier-ignore
        message: "This is a \"quoted\" message",
      },
    };

    expect(bfsParsing(JSON.stringify(data))).toMatchObject({
      name: "John Doe",
      age: 30,
      details: {
        address: {
          city: "Exampled",
          country: "Exampled",
        },
        nestedArray: [
          "item1",
          "item2",
          { key: "value", data: { nested: "nested value" } },
        ],
        message: 'This is a "quoted" message',
      },
    });
  });

  it("should flat different levels of escaped strings", () => {
    const data =
      // eslint-disable-next-line
      // prettier-ignore
      "{\"name\": \"John Doe\",\"age\": \"30\",\"location\": {\"city\": \"Some City\",\"state\": \"Some State\",\"geo\": \"{\\\"lat\\\": \\\"40000\\\",\\\"lng\\\": \\\"40000\\\"}\"},\"rules\": {\"localWork\": \"true\",\"onlineWork\": \"true\",\"applications\": {\"admin\": \"true\",\"time\": \"no-time\"}},\"availability\": \"{\\\"online\\\": \\\"true\\\"}\"}";

    expect(bfsParsing(data)).toMatchObject({
      name: "John Doe",
      age: 30,
      location: {
        city: "Some City",
        state: "Some State",
        geo: { lat: 40000, lng: 40000 },
      },
      rules: {
        localWork: true,
        onlineWork: true,
        applications: { admin: true, time: "no-time" },
      },
      availability: { online: true },
    });
  });

  it("should return undefined for invalid JSON strings", () => {
    const invalidJsonString = "not a valid json string";

    expect(bfsParsing(invalidJsonString)).toBeUndefined();
  });
});
