# JSON-STRING-FLATTENER
This project helps with flattening JSON strings who have repeatedly through a stringed process.
It applies a `JSONParse` method on a stringify data and repeat the process through each node, flattening it until it becomes a JSON object.

Example:

```ts
// From this:
const before: string = "{\"name\": \"John Doe\",\"age\": \"30\",\"location\": {\"city\": \"Some City\",\"state\": \"Some State\",\"geo\": \"{\\\"lat\\\": \\\"40000\\\",\\\"lng\\\": \\\"40000\\\"}\"},\"rules\": {\"localWork\": \"true\",\"onlineWork\": \"true\",\"applications\": {\"admin\": \"true\",\"time\": \"no-time\"}},\"availability\": \"{\\\"online\\\": \\\"true\\\"}\"}";

// To this:
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
