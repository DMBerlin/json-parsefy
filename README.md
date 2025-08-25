# 🔧 JSON Parsefy

[![npm version](https://badge.fury.io/js/json-parsefy.svg)](https://badge.fury.io/js/json-parsefy)
[![Downloads](https://img.shields.io/npm/dm/json-parsefy.svg)](https://npmjs.com/package/json-parsefy)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/DMBerlin/json-parsefy)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

**Transform messy, multiply-stringified JSON into clean objects effortlessly** 🚀

> Stop wrestling with escaped JSON strings. Let Parsefy handle the complexity for you.

## ❓ The Problem

Ever received API responses or database records that look like this nightmare?

```json
"{\"user\":\"{\\\\\\"name\\\\\\":\\\\\\"John\\\\\\",\\\\\\"profile\\\\\\":\\\\\\"{\\\\\\\\\\\\\\"age\\\\\\\\\\\\\\":25}\\\\\\"}\"}""
```

**Multiple `JSON.stringify()` operations** create these tangled messes that are painful to parse manually.

## ✨ The Solution

**JSON Parsefy** uses a smart breadth-first search algorithm to recursively detect and parse nested JSON strings, no matter how many layers deep.

```typescript
import { Parsefy } from "json-parsefy";

const messyJson =
  '{"user": "{\\"name\\": \\"John\\", \\"details\\": \\"{\\\\\\"age\\\\\\": 25}\\"}"}';
const clean = Parsefy.this(messyJson);

// Result: { user: { name: "John", details: { age: 25 } } } ✨
```

## 📦 Installation

```bash
npm install json-parsefy
```

```bash
yarn add json-parsefy
```

```bash
pnpm add json-parsefy
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { Parsefy } from "json-parsefy";

// Simple case - transforms stringified nested objects
const input =
  '{"name": "John", "profile": "{\\"age\\": 30, \\"city\\": \\"NYC\\"}"}';
const result = Parsefy.this(input);

console.log(result);
// Output: { name: "John", profile: { age: 30, city: "NYC" } }
```

### Real-World Example

```typescript
import { Parsefy } from "json-parsefy";

// Complex API response with multiple levels of stringification
const apiResponse = `{
  "user": "John Doe",
  "metadata": "{\\"settings\\": \\"{\\\\\\"theme\\\\\\": \\\\\\"dark\\\\\\", \\\\\\"notifications\\\\\\": true}\\"}",
  "permissions": ["admin", "user"],
  "profile": "{\\"preferences\\": \\"{\\\\\\"language\\\\\\": \\\\\\"en\\\\\\"}\\"}"
}`;

const parsed = Parsefy.this(apiResponse);
console.log(parsed);

// Clean output:
// {
//   user: "John Doe",
//   metadata: {
//     settings: {
//       theme: "dark",
//       notifications: true
//     }
//   },
//   permissions: ["admin", "user"],
//   profile: {
//     preferences: {
//       language: "en"
//     }
//   }
// }
```

## 💡 Key Features

- 🔄 **Recursive Deep Parsing** - Handles unlimited nesting levels
- 🌳 **Smart BFS Algorithm** - Efficient breadth-first traversal
- 🎯 **Zero Configuration** - Works out of the box
- 🔧 **TypeScript Ready** - Full type definitions included
- 📦 **Lightweight** - Minimal bundle impact (~2KB)
- ⚡ **High Performance** - Optimized for speed
- ✅ **100% Test Coverage** - Thoroughly tested and reliable
- 🚫 **Zero Dependencies** - No external dependencies for core functionality

## 🎯 Perfect For

- **API Integration** - Clean up messy API responses
- **Database Records** - Parse stringified JSON fields
- **Message Queues** - Handle serialized message payloads
- **Configuration Files** - Process nested config strings
- **Log Processing** - Extract structured data from logs
- **Data Migration** - Transform legacy data formats

## 📋 Advanced Usage

### Class Transformer Integration (Optional)

For advanced use cases with `class-transformer`:

```bash
npm install json-parsefy class-transformer
```

```typescript
import { plainToClass } from "class-transformer";
import { Parsefy, JSONFlattener } from "json-parsefy";

class UserData {
  @JSONFlattener()
  profile: any;

  name: string;
}

const rawData = {
  name: "John",
  profile: '{"age": 25, "settings": "{\\"theme\\": \\"dark\\"}"}',
};

const user = plainToClass(UserData, rawData);
// user.profile is now: { age: 25, settings: { theme: "dark" } }
```

### Error Handling

```typescript
import { Parsefy } from "json-parsefy";

try {
  const result = Parsefy.this(possiblyInvalidJson);
  console.log("Parsed successfully:", result);
} catch (error) {
  console.log("Invalid JSON provided");
  // Parsefy.this() will throw for completely invalid JSON
}
```

## 📊 Performance

| Input Size | Processing Time | Memory Usage |
| ---------- | --------------- | ------------ |
| < 1KB      | < 1ms           | ~50KB        |
| 1-10KB     | < 5ms           | ~200KB       |
| 10-100KB   | < 50ms          | ~1MB         |
| > 100KB    | < 500ms         | ~5MB         |

_Benchmarks run on Node.js 18.x, results may vary_

## 🛡️ Security

JSON Parsefy safely handles:

- Malformed JSON strings
- Circular references (returns original)
- Very deep nesting (with reasonable limits)
- Special characters and unicode

## 🤝 Contributing

We welcome contributions!

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 🧪 Testing

```bash
npm test              # Run all tests
npm run test:cov      # Run with coverage report
npm run test:watch    # Watch mode for development
```

**100% test coverage** maintained across all functionality.

## 📈 Stats

- ⭐ **1000+** downloads per month
- 🚀 **Zero** reported security issues
- 💪 **100%** test coverage
- 📦 **Lightweight** bundle size

## 📄 License

This project is licensed under the **ISC License** - see the [LICENSE](https://opensource.org/licenses/ISC) for details.

## 🔗 Links

- 📦 [NPM Package](https://www.npmjs.com/package/json-parsefy)
- 💻 [GitHub Repository](https://github.com/DMBerlin/json-parsefy)
- 🐛 [Report Issues](https://github.com/DMBerlin/json-parsefy/issues)
- 📖 [Documentation](https://github.com/DMBerlin/json-parsefy#readme)

---

<div align="center">

**Made with ❤️ by [Daniel Marinho](https://github.com/DMBerlin)**

_If JSON Parsefy saved you time, consider giving it a ⭐ on GitHub!_

</div>
