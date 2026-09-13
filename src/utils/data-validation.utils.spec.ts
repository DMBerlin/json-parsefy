import { isJsonParsable } from "../utils/data-validation.utils";

describe("isJsonParsable", () => {
  it("should return true for valid json strings", () => {
    expect(isJsonParsable(JSON.stringify({ name: "John Doe" }))).toBe(true);
    expect(isJsonParsable('{"key": "value"}')).toBe(true);
    expect(isJsonParsable("[1, 2, 3]")).toBe(true);
  });

  it("should return false for non-string types", () => {
    expect(isJsonParsable({ name: "John Doe" })).toBe(false);
    expect(isJsonParsable(null)).toBe(false);
    expect(isJsonParsable(undefined)).toBe(false);
    expect(isJsonParsable(123)).toBe(false);
    expect(isJsonParsable(true)).toBe(false);
  });

  it("should return false for invalid json strings", () => {
    expect(isJsonParsable("not a json string")).toBe(false);
    expect(isJsonParsable("{ invalid json }")).toBe(false);
    expect(isJsonParsable("")).toBe(false);
  });
});
