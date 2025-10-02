# JSON-Parsefy

[![npm version](https://badge.fury.io/js/json-parsefy.svg)](https://badge.fury.io/js/json-parsefy)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

**Fix malformed JSON strings that have been through multiple stringify operations.**

JSON-Parsefy intelligently parses deeply nested stringified JSON data, automatically converting escaped strings back to proper JSON objects and arrays. Perfect for handling data from APIs, databases, or any source that has been over-stringified.

## The Problem

When JSON data goes through multiple `JSON.stringify()` operations, it becomes deeply escaped and unreadable:

```javascript
// Original data
const user = {
  name: "John Doe",
  age: 30,
  location: { city: "New York", geo: { lat: 40.7128, lng: -74.0060 } }
};

// After multiple stringify operations
const malformed = "{\"name\":\"John Doe\",\"age\":\"30\",\"location\":\"{\\\"city\\\":\\\"New York\\\",\\\"geo\\\":\\\"{\\\\\\\"lat\\\\\\\":40.7128,\\\\\\\"lng\\\\\\\":-74.0060}\\\"}\"}";

// This fails with JSON.parse()
JSON.parse(malformed); // ❌ Error: Unexpected token
```

## The Solution

JSON-Parsefy automatically detects and fixes these issues:

```javascript
import { Parsefy } from "json-parsefy";

const fixed = Parsefy.this(malformed);
console.log(fixed);
// ✅ { name: "John Doe", age: 30, location: { city: "New York", geo: { lat: 40.7128, lng: -74.0060 } } }
```

## Installation

```bash
npm install json-parsefy
# or
yarn add json-parsefy
# or
pnpm add json-parsefy
```

## Usage

### Basic Usage

```typescript
import { Parsefy } from "json-parsefy";

const malformedJson = `{"name":"John","data":"{\\"items\\":[1,2,3],\\"active\\":true}"}`;

const result = Parsefy.this(malformedJson);
// Result: { name: "John", data: { items: [1,2,3], active: true } }
```

### With Class Decorator (Optional)

For automatic parsing in class properties, you can use the decorator feature. This requires installing `class-transformer` as a peer dependency:

```bash
npm install class-transformer
# or
yarn add class-transformer
# or
pnpm add class-transformer
```

```typescript
import { plainToClass } from "class-transformer";
import { JSONFlattener } from "json-parsefy";

class User {
  @JSONFlattener()
  profile: any; // Will be automatically parsed if it's a string
}

const userData = {
  profile: '{"name":"John","settings":"{\\"theme\\":\\"dark\\"}"}'
};

const user = plainToClass(User, userData);
console.log(user.profile);
// Result: { name: "John", settings: { theme: "dark" } }
```

**Note:** The decorator feature is optional. If you don't install `class-transformer`, the decorator will display a warning and act as a no-op, but your main parsing functionality will still work perfectly.

## Real-World Examples

### API Response Cleanup

```typescript
// Common scenario: API returns over-stringified data
const apiResponse = `{
  "user": "{\\"id\\":123,\\"name\\":\\"John\\",\\"preferences\\":\\"{\\\\\\"theme\\\\\\":\\\\\\"dark\\\\\\"}\\"}",
  "status": "success"
}`;

const cleanData = Parsefy.this(apiResponse);
// Result: { user: { id: 123, name: "John", preferences: { theme: "dark" } }, status: "success" }
```

### Database Field Parsing

```typescript
// Database stores JSON as escaped strings
const dbRecord = {
  id: 1,
  metadata: '{"tags":"[\\"urgent\\",\\"important\\"]","config":"{\\"notifications\\":true}"}'
};

const parsed = Parsefy.this(JSON.stringify(dbRecord));
// Result: { id: 1, metadata: { tags: ["urgent", "important"], config: { notifications: true } } }
```

### Complex Nested Data

```typescript
const complexData = `{
  "user": "{\\"profile\\":\\"{\\\\\\"name\\\\\\":\\\\\\"John\\\\\\",\\\\\\"settings\\\\\\":\\\\\\"{\\\\\\\\\\\\\\"theme\\\\\\\\\\\\\\":\\\\\\\\\\\\\\"dark\\\\\\\\\\\\\\"}\\\\\\"}\\"}",
  "permissions": "{\\"admin\\":true,\\"roles\\":\\"[\\\\\\"user\\\\\\",\\\\\\"editor\\\\\\"]\\"}"
}`;

const result = Parsefy.this(complexData);
// Result: { 
//   user: { profile: { name: "John", settings: { theme: "dark" } } },
//   permissions: { admin: true, roles: ["user", "editor"] }
// }
```

## Features

- **🔄 Smart Detection**: Automatically identifies stringified JSON within strings
- **🌳 Deep Parsing**: Handles unlimited nesting levels using BFS algorithm
- **🛡️ Type Safe**: Full TypeScript support with proper type definitions
- **⚡ Performance**: Optimized parsing with minimal overhead
- **🎯 Optional Decorator Support**: Seamless integration with class-transformer (when installed)
- **🧪 Well Tested**: Comprehensive test coverage with edge cases
- **📦 Minimal Dependencies**: Lightweight with optional peer dependencies

## How It Works

JSON-Parsefy uses a two-step process:

1. **Recursive Parsing**: Continuously parses stringified JSON until no more parsing is possible
2. **BFS Traversal**: Uses breadth-first search to systematically process all nested objects and arrays

This approach ensures that even deeply nested and multiply-escaped JSON strings are properly restored to their original structure.

## API Reference

### `Parsefy.this(jsonString: string): Record<string, any>`

Main parsing function that takes a malformed JSON string and returns a properly structured object.

**Parameters:**
- `jsonString`: The malformed JSON string to parse

**Returns:**
- Properly structured JavaScript object

**Throws:**
- Error if the input is not a valid JSON string

### `@JSONFlattener()`

Class property decorator that automatically parses stringified JSON values. Requires `class-transformer` as a peer dependency.

**Usage:**
```typescript
class MyClass {
  @JSONFlattener()
  jsonField: any;
}
```

**Note:** If `class-transformer` is not installed, the decorator will log a warning and act as a no-op decorator.

## Development

### Setup

```bash
git clone https://github.com/DMBerlin/json-parsefy.git
cd json-parsefy
pnpm install
```

### Scripts

```bash
pnpm build          # Build the project
pnpm test           # Run tests
pnpm test:watch     # Run tests in watch mode
pnpm test:cov       # Run tests with coverage
pnpm lint           # Run linter
```

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Commit your changes
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

- 🐛 [Report Issues](https://github.com/DMBerlin/json-parsefy/issues)
- 💬 [Discussions](https://github.com/DMBerlin/json-parsefy/discussions)
- 📧 [Contact](mailto:your-email@example.com)

---

**Made with ❤️ by Daniel Marinho**# Fix release pipeline configuration
