import { bfsParsing } from "./utils/bfs-parsing.utils";

const Parsefy = {
  this: bfsParsing,
  parse: bfsParsing,
};

export { Parsefy };
export { JSONFlattener } from "./decorators/json-flattener.decorator";
export { JSONObject, JSONPrimitives } from "./types/json-record.type";
export { TransformFnParams } from "./types/json-flattener.types";
export default Parsefy;
