export function cleanJsonString(result: string): Record<string, any> {
  try {
    while (typeof (result = JSON.parse(result)) === "string") {}
    return result;
  } catch (error) {
    // Handle parsing errors here
    return {};
  }
}
