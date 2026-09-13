import {
  loadClassTransformer,
  warnMissingDependency,
} from "./class-transformer-loader.utils";

describe("class-transformer-loader.utils", () => {
  it("should load class-transformer when installed", () => {
    const loaded = loadClassTransformer();
    expect(loaded).toBeDefined();
    expect(typeof loaded.Transform).toBe("function");
  });

  it("should return null if require throws", () => {
    const mockRequire = () => {
      throw new Error("Module not found");
    };

    const loaded = loadClassTransformer(mockRequire);
    expect(loaded).toBeNull();
  });

  it("should warn when class-transformer is missing", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    warnMissingDependency();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "JSONFlattener decorator requires 'class-transformer'",
      ),
    );
    warnSpy.mockRestore();
  });
});
