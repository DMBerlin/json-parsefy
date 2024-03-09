export function isJsonParsable(json: unknown): boolean {
  try {
    if (typeof json === "string") {
      JSON.parse(json);
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}
