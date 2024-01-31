export const isJsonParsable = (json: string | object): boolean => {
  try {
    if (typeof json === "string") {
      JSON.parse(json);
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
