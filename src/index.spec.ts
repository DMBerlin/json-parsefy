import ParsefyDefault, { Parsefy, JSONFlattener } from "./index";

describe("index entry point", () => {
  it("should export Parsefy with .this and .parse functions", () => {
    expect(typeof Parsefy.this).toBe("function");
    expect(typeof Parsefy.parse).toBe("function");
    expect(Parsefy.this).toBe(Parsefy.parse);
  });

  it("should provide working default export matching named export", () => {
    expect(ParsefyDefault).toBe(Parsefy);
    const parsed = ParsefyDefault.parse(JSON.stringify({ test: "val" }));
    expect(parsed).toEqual({ test: "val" });
  });

  it("should export JSONFlattener decorator", () => {
    expect(typeof JSONFlattener).toBe("function");
  });
});
