import { isJsonParsable } from "./data-validation.utils";

export interface ParsefyOptions {
  /**
   * If true, also coerces primitive strings (e.g., "123", "true", "null") into JavaScript primitives.
   * @default false (prevents BigInt precision loss and preserves string types)
   */
  parsePrimitives?: boolean;
  /**
   * Maximum number of nodes to process in BFS queue to prevent DoS on maliciously nested payloads.
   * @default 10000
   */
  maxNodes?: number;
}

/**
 * Attempts to unwrap a JSON string in a single pass without redundant deserialization.
 * Only parses containers (objects/arrays) or multiply-stringified strings unless parsePrimitives is true.
 */
export function tryUnwrapJsonString(
  str: string,
  parsePrimitives: boolean = false,
): { success: boolean; value: any } {
  if (typeof str !== "string") {
    return { success: false, value: str };
  }

  const trimmed = str.trim();
  if (!trimmed) {
    return { success: false, value: str };
  }

  const isContainer =
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"));
  const isQuoted = trimmed.startsWith('"') && trimmed.endsWith('"');

  if (!parsePrimitives && !isContainer && !isQuoted) {
    return { success: false, value: str };
  }

  let current: any = str;
  let unwrappedAtLeastOnce = false;

  while (typeof current === "string") {
    try {
      const parsed = JSON.parse(current);

      if (!parsePrimitives) {
        if (typeof parsed === "object" && parsed !== null) {
          current = parsed;
          unwrappedAtLeastOnce = true;
          break;
        }

        if (typeof parsed === "string") {
          current = parsed;
          unwrappedAtLeastOnce = true;
          const nextTrimmed = parsed.trim();
          if (nextTrimmed.startsWith("{") || nextTrimmed.startsWith("[")) {
            continue;
          }
          break;
        }
      }

      current = parsed;
      unwrappedAtLeastOnce = true;
    } catch {
      break;
    }
  }

  return { success: unwrappedAtLeastOnce, value: current };
}

export function bfsParsing(
  jsonString: string,
  options: ParsefyOptions = {},
): Record<string, any> | any[] | undefined {
  if (!isJsonParsable(jsonString)) {
    return undefined;
  }

  const parsePrimitives = options.parsePrimitives ?? false;
  const maxNodes = options.maxNodes ?? 10000;

  let root: any;
  try {
    root = JSON.parse(jsonString);
    while (typeof root === "string") {
      const trimmed = root.trim();
      if (
        (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
        (trimmed.startsWith("[") && trimmed.endsWith("]"))
      ) {
        root = JSON.parse(root);
      } else {
        break;
      }
    }
  } catch {
    /* istanbul ignore next */
    return undefined;
  }

  if (root === null || typeof root !== "object") {
    return root;
  }

  // Linear O(N) iterative Breadth-First Search using pointer index
  const queue: any[] = [root];
  const visited = new Set<any>();
  visited.add(root);
  let head = 0;

  while (head < queue.length && head < maxNodes) {
    const current = queue[head++];

    for (const key of Object.keys(current)) {
      const val = current[key];

      if (typeof val === "string") {
        const unwrapped = tryUnwrapJsonString(val, parsePrimitives);
        if (unwrapped.success) {
          current[key] = unwrapped.value;
          const newVal = unwrapped.value;
          if (
            newVal !== null &&
            typeof newVal === "object" &&
            !visited.has(newVal)
          ) {
            visited.add(newVal);
            queue.push(newVal);
          }
        }
      } else if (val !== null && typeof val === "object" && !visited.has(val)) {
        visited.add(val);
        queue.push(val);
      }
    }
  }

  return root;
}
