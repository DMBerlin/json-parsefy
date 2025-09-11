# JSON-PARSEFY

[![CI](https://github.com/DMBerlin/json-parsefy/actions/workflows/ci.yml/badge.svg)](https://github.com/DMBerlin/json-parsefy/actions/workflows/ci.yml)
[![CodeQL](https://github.com/DMBerlin/json-parsefy/actions/workflows/codeql.yml/badge.svg)](https://github.com/DMBerlin/json-parsefy/actions/workflows/codeql.yml)
[![npm version](https://badge.fury.io/js/json-parsefy.svg)](https://badge.fury.io/js/json-parsefy)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A powerful TypeScript library that corrects malformed JSON strings that have been through multiple stringify operations. It intelligently parses nested stringified JSON data using BFS (Breadth-First Search) algorithms to restore proper JSON structure.

## ✨ Features

- 🔄 **Smart JSON Parsing**: Handles deeply nested stringified JSON data
- 🌳 **Multiple Parsing Strategies**: BFS, recursive, and tree-based parsing
- 🛡️ **Type Safety**: Full TypeScript support with comprehensive type definitions  
- 🧪 **Well Tested**: Comprehensive test suite with high coverage
- 🚀 **Production Ready**: CI/CD pipeline with automated testing and releases
- 📦 **Zero Dependencies**: Lightweight with minimal footprint

## 📦 Installation

```bash
# Using npm
npm install json-parsefy

# Using yarn
yarn add json-parsefy

# Using pnpm
pnpm add json-parsefy
```

## 🚀 Quick Start

```typescript
import { Parsefy } from "json-parsefy";

const malformedJson = "{\"name\": \"John Doe\",\"age\": \"30\",\"location\": {\"city\": \"Some City\",\"state\": \"Some State\",\"geo\": \"{\\\"lat\\\": \\\"40000\\\",\\\"lng\\\": \\\"40000\\\"}\"},\"rules\": {\"localWork\": \"true\",\"onlineWork\": \"true\",\"applications\": {\"admin\": \"true\",\"time\": \"no-time\"}},\"availability\": \"{\\\"online\\\": \\\"true\\\"}\"}";

// Parse the malformed JSON
const result = Parsefy.this(malformedJson);

console.log(result);
// Output:
// {
//   name: "John Doe",
//   age: 30,
//   location: {
//     city: "Some City",
//     state: "Some State",
//     geo: { lat: 40000, lng: 40000 }
//   },
//   rules: {
//     localWork: true,
//     onlineWork: true,
//     applications: { admin: true, time: "no-time" }
//   },
//   availability: { online: true }
// }
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ (recommended: use the version specified in `.nvmrc`)
- Yarn (this project uses Yarn for package management)

### Setup

```bash
# Clone the repository
git clone https://github.com/DMBerlin/json-parsefy.git
cd json-parsefy

# Install dependencies
yarn install

# Set up development environment
make dev-setup
```

### Available Scripts

```bash
# Development
yarn build          # Build the project
yarn build:prod     # Build for production
yarn clean          # Clean build artifacts

# Testing
yarn test           # Run tests
yarn test:watch     # Run tests in watch mode
yarn test:cov       # Run tests with coverage

# Code Quality
yarn lint           # Run linter with auto-fix
yarn lint:check     # Run linter without fixing
yarn format         # Format code with Prettier
yarn format:check   # Check code formatting

# Release
yarn release        # Create patch release
yarn release:minor  # Create minor release
yarn release:major  # Create major release
```

### Using Makefile

This project includes a comprehensive Makefile for common development tasks:

```bash
make help           # Show all available commands
make install        # Install dependencies
make test           # Run tests
make check          # Run all quality checks
make ci             # Simulate CI pipeline locally
make clean          # Clean build artifacts
```

## 🚀 CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

### Workflows

- **CI Pipeline** (`ci.yml`): Runs on every push and PR
  - Tests on Node.js 18.x, 20.x, and 22.x
  - Linting and code formatting checks
  - Security auditing
  - Code coverage reporting
  
- **Release Pipeline** (`release.yml`): Automated releases
  - Version bumping
  - Changelog generation
  - NPM publishing
  - GitHub releases

- **CodeQL Analysis** (`codeql.yml`): Security scanning
  - Static analysis for vulnerabilities
  - Runs weekly and on code changes

### Dependabot

Automated dependency updates are configured for:
- NPM packages (weekly updates)
- GitHub Actions (weekly updates)
- Grouped updates for development dependencies

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`make check`)
5. Commit your changes (follows [Conventional Commits](https://conventionalcommits.org/))
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Commit Message Format

This project uses [Conventional Commits](https://conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by real-world JSON parsing challenges
- Built with TypeScript for type safety and developer experience
- Designed for modern JavaScript/TypeScript applications

---

**Made with ❤️ by Daniel Marinho**
