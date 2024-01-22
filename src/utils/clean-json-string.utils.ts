export function cleanJsonString(result: string): string {
  try {
    while (typeof (result = JSON.parse(result)) === "string") {}
    return JSON.stringify(result);
  } catch (error) {
    // Handle parsing errors here
    return null;
  }
}
