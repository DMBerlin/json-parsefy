import { bfsParsing } from "../utils/bfs-parsing.utils";

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

  it("should return undefined for invalid json strings", () => {
    expect(bfsParsing("not a json string")).toBeUndefined();
    expect(bfsParsing("")).toBeUndefined();
    expect(bfsParsing("{ broken: json }")).toBeUndefined();
  });

  it("should handle array root json", () => {
    const arrayData = ["item1", '{"nested": "value"}'];
    const result = bfsParsing(JSON.stringify(arrayData));
    expect(result).toEqual(["item1", { nested: "value" }]);
  });

  it("should return primitive values when root is not an object", () => {
    expect(bfsParsing(JSON.stringify("hello"))).toBe("hello");
    expect(bfsParsing(JSON.stringify(123))).toBe(123);
    expect(bfsParsing(JSON.stringify(null))).toBeNull();
  });

  it("should safely handle objects with repeated references or cycles", () => {
    const shared = { sharedProp: "value" };
    const data: any = { a: shared, b: shared };
    const jsonString = JSON.stringify(data);
    const result = bfsParsing(jsonString);
    expect(result).toEqual({
      a: { sharedProp: "value" },
      b: { sharedProp: "value" },
    });
  });
});
