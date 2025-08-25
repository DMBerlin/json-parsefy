import { isJsonParsable } from "@utils/data-validation.utils";

describe("isJsonParsable", () => {
  it("should return true for json strings", () => {
    expect(isJsonParsable(JSON.stringify({ name: "John Doe" }))).toBe(true);
  });
  it("should return false for objects", () => {
    expect(isJsonParsable({ name: "John Doe" })).toBe(false);
  });
});
