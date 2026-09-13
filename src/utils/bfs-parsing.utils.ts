import { isJsonParsable } from "../utils/data-validation.utils";
import { recursiveParsing } from "../utils/recursive-parsing.utils";

export function bfsParsing(
  jsonString: string,
): Record<string, any> | undefined {
  if (!isJsonParsable(jsonString)) {
    return undefined;
  }

  const jsonData = recursiveParsing(jsonString);
  if (jsonData === null || typeof jsonData !== "object") {
    return jsonData;
  }

  // Iterative Breadth-First Search (BFS) using a FIFO queue
  const queue: any[] = [jsonData];
  const visited = new Set<any>();
  visited.add(jsonData);

  while (queue.length > 0) {
    const current = queue.shift();

    for (const key of Object.keys(current)) {
      const val = current[key];

      if (isJsonParsable(val)) {
        const parsed = recursiveParsing(val);
        current[key] = parsed;
        if (
          parsed !== null &&
          typeof parsed === "object" &&
          !visited.has(parsed)
        ) {
          visited.add(parsed);
          queue.push(parsed);
        }
      } else if (val !== null && typeof val === "object" && !visited.has(val)) {
        visited.add(val);
        queue.push(val);
      }
    }
  }

  return jsonData;
}
