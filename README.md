# JSON-STRING-FLATTENER
This project helps with flattening JSON strings who have repeatedly through a stringed process.
It applies a `JSONParse` method on a stringify data and repeat the process through each node, flattening it until it becomes a JSON object.

Example:

```ts
const before: string = "{\"name\": \"John Doe\",\"age\": \"30\",\"location\": {\"city\": \"Some City\",\"state\": \"Some State\",\"geo\": \"{\\\"lat\\\": \\\"40000\\\",\\\"lng\\\": \\\"40000\\\"}\"},\"rules\": {\"localWork\": \"true\",\"onlineWork\": \"true\",\"applications\": {\"admin\": \"true\",\"time\": \"no-time\"}},\"availability\": \"{\\\"online\\\": \\\"true\\\"}\"}";
```

Use `treeParsing` to do a BFS JSON parse on the string.

```ts
import { treeParsing } from "json-string-flattener";
const after = treeParsing(before);
```

How it should look after parsing:

```ts
const after: Record<string, any> = {
  name: "John Doe",
    age: 30,
  location: {
  city: "Some City",
    state: "Some State",
    geo: { lat: 40000, lng: 40000 },
},
  rules: {
    localWork: true,
      onlineWork: true,
      applications: { admin: true, time: "no-time" },
  },
  availability: { online: true },
};
```
