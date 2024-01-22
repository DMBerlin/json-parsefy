type JSONPrimitives =
  | string
  | number
  | boolean
  | null
  | Array<any>
  | Record<string, any>;
export type JSONObject = Record<string, JSONPrimitives>;
