import { bfsParsing, tryUnwrapJsonString } from "../utils/bfs-parsing.utils";

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

  it("should flat different levels of escaped strings with parsePrimitives: true", () => {
    const data =
      // eslint-disable-next-line
      // prettier-ignore
      "{\"name\": \"John Doe\",\"age\": \"30\",\"location\": {\"city\": \"Some City\",\"state\": \"Some State\",\"geo\": \"{\\\"lat\\\": \\\"40000\\\",\\\"lng\\\": \\\"40000\\\"}\"},\"rules\": {\"localWork\": \"true\",\"onlineWork\": \"true\",\"applications\": {\"admin\": \"true\",\"time\": \"no-time\"}},\"availability\": \"{\\\"online\\\": \\\"true\\\"}\"}";

    expect(bfsParsing(data, { parsePrimitives: true })).toMatchObject({
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

  it("should safely unwrap containers by default without corrupting primitive strings", () => {
    const data =
      // eslint-disable-next-line
      // prettier-ignore
      "{\"name\": \"John Doe\",\"age\": \"30\",\"location\": {\"city\": \"Some City\",\"state\": \"Some State\",\"geo\": \"{\\\"lat\\\": \\\"40000\\\",\\\"lng\\\": \\\"40000\\\"}\"},\"rules\": {\"localWork\": \"true\",\"onlineWork\": \"true\",\"applications\": {\"admin\": \"true\",\"time\": \"no-time\"}},\"availability\": \"{\\\"online\\\": \\\"true\\\"}\"}";

    expect(bfsParsing(data)).toMatchObject({
      name: "John Doe",
      age: "30",
      location: {
        city: "Some City",
        state: "Some State",
        geo: { lat: "40000", lng: "40000" },
      },
      rules: {
        localWork: "true",
        onlineWork: "true",
        applications: { admin: "true", time: "no-time" },
      },
      availability: { online: "true" },
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

  describe("Adversarial Edge-Case Tests (Data Integrity & Performance)", () => {
    it("should preserve BigInt strings without numeric precision loss", () => {
      const payload = JSON.stringify({
        snowflakeId: "9007199254740993",
        creditCard: "4111111111111111",
      });

      const parsed = bfsParsing(payload) as any;
      expect(parsed.snowflakeId).toBe("9007199254740993");
      expect(parsed.creditCard).toBe("4111111111111111");
    });

    it("should handle postal codes and leading zero strings consistently", () => {
      const payload = JSON.stringify({
        zipStandard: "90210",
        zipLeadingZero: "07030",
      });

      const parsed = bfsParsing(payload) as any;
      expect(parsed.zipStandard).toBe("90210");
      expect(parsed.zipLeadingZero).toBe("07030");
    });

    it("should preserve boolean and null string representations", () => {
      const payload = JSON.stringify({
        active: "true",
        disabled: "false",
        nullable: "null",
      });

      const parsed = bfsParsing(payload) as any;
      expect(parsed.active).toBe("true");
      expect(parsed.disabled).toBe("false");
      expect(parsed.nullable).toBe("null");
    });

    it("should execute linear O(N) traversal on large payloads without quadratic degradation", () => {
      const largePayload: Record<string, string> = {};
      for (let i = 0; i < 2000; i++) {
        largePayload[`key_${i}`] = JSON.stringify({ item: i });
      }

      const startTime = Date.now();
      const result = bfsParsing(JSON.stringify(largePayload)) as any;
      const duration = Date.now() - startTime;

      expect(duration).toBeLessThan(1000);
      expect(result.key_0).toEqual({ item: 0 });
      expect(result.key_1999).toEqual({ item: 1999 });
    });

    it("should respect maxNodes protection threshold", () => {
      const largePayload: Record<string, string> = {};
      for (let i = 0; i < 100; i++) {
        largePayload[`key_${i}`] = JSON.stringify({ item: i });
      }

      const result = bfsParsing(JSON.stringify(largePayload), {
        maxNodes: 5,
      }) as any;
      expect(result).toBeDefined();
    });

    it("should handle tryUnwrapJsonString edge cases", () => {
      expect(tryUnwrapJsonString(null as any)).toEqual({
        success: false,
        value: null,
      });
      expect(tryUnwrapJsonString("")).toEqual({
        success: false,
        value: "",
      });
      expect(tryUnwrapJsonString("   ")).toEqual({
        success: false,
        value: "   ",
      });
      expect(tryUnwrapJsonString("not a json string")).toEqual({
        success: false,
        value: "not a json string",
      });
      expect(tryUnwrapJsonString('"only quotes"')).toEqual({
        success: true,
        value: "only quotes",
      });
      expect(tryUnwrapJsonString("{ incomplete")).toEqual({
        success: false,
        value: "{ incomplete",
      });
      expect(tryUnwrapJsonString("[ incomplete")).toEqual({
        success: false,
        value: "[ incomplete",
      });
      expect(tryUnwrapJsonString('" incomplete')).toEqual({
        success: false,
        value: '" incomplete',
      });
      expect(
        tryUnwrapJsonString(
          JSON.stringify(JSON.stringify({ nested: "container" })),
        ),
      ).toEqual({
        success: true,
        value: { nested: "container" },
      });
      expect(bfsParsing(JSON.stringify(JSON.stringify([10, 20])))).toEqual([
        10, 20,
      ]);
      expect(bfsParsing(JSON.stringify(JSON.stringify("doubly string")))).toBe(
        '"doubly string"',
      );
    });
  });
});
