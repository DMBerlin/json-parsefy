# Changelog

## [1.5.0](https://github.com/DMBerlin/json-parsefy/compare/v1.4.0...v1.5.0) (2026-09-13)


### Features

* **core:** harden codebase, optimize BFS to O(N), add safe options, and export types ([#94](https://github.com/DMBerlin/json-parsefy/issues/94)) ([8090999](https://github.com/DMBerlin/json-parsefy/commit/8090999558768c85e893203149247e28dfc56c61))
* create test for json parsable ([#4](https://github.com/DMBerlin/json-parsefy/issues/4)) ([99917f8](https://github.com/DMBerlin/json-parsefy/commit/99917f8100f127dafbb8116f10c83eb61f63b822))
* json tree parsing ([#3](https://github.com/DMBerlin/json-parsefy/issues/3)) ([8b040fb](https://github.com/DMBerlin/json-parsefy/commit/8b040fb8bcc115fc4c44db6c9b11ce65601c7929))
* optional decorator impl ([#39](https://github.com/DMBerlin/json-parsefy/issues/39)) ([48f134e](https://github.com/DMBerlin/json-parsefy/commit/48f134e58846a8a1ef899711c11050d1d319f86a))
* update ci, packages and configs ([#24](https://github.com/DMBerlin/json-parsefy/issues/24)) ([65f9a06](https://github.com/DMBerlin/json-parsefy/commit/65f9a069b6d13efa8ff80ab67a57b079e189ad40))
* update configs ([#2](https://github.com/DMBerlin/json-parsefy/issues/2)) ([a52fd9c](https://github.com/DMBerlin/json-parsefy/commit/a52fd9c1490a6eeb6548abe8475486bbb03ba712))
* update export ([#19](https://github.com/DMBerlin/json-parsefy/issues/19)) ([a0087eb](https://github.com/DMBerlin/json-parsefy/commit/a0087eb02c5b5fd451892878be8e50b63e5b9847))
* **version:** update version ([#21](https://github.com/DMBerlin/json-parsefy/issues/21)) ([0314842](https://github.com/DMBerlin/json-parsefy/commit/0314842d7e1fcac577906aacfc1739e656d50dfd))


### Bug Fixes

* **1.2.1:** file path aliases ([#22](https://github.com/DMBerlin/json-parsefy/issues/22)) ([28b8b02](https://github.com/DMBerlin/json-parsefy/commit/28b8b02197ae903c2973a2d350cd8d243e73b702))
* **deps:** override transitive vulnerabilities for js-yaml, @xmldom/xmldom, and baseline-browser-mapping ([#83](https://github.com/DMBerlin/json-parsefy/issues/83)) ([b4418a2](https://github.com/DMBerlin/json-parsefy/commit/b4418a2ae5e03cf7bf804edf9949efcf78ca7fa0))
* **deps:** override vulnerabilities for browserslist, fast-uri, and brace-expansion ([#84](https://github.com/DMBerlin/json-parsefy/issues/84)) ([af6d4f0](https://github.com/DMBerlin/json-parsefy/commit/af6d4f0307264872ee2fb0b6210fdcd6b4ee3c77))
* **deps:** resolve remaining vulnerabilities and add dependabot ignore rules ([#85](https://github.com/DMBerlin/json-parsefy/issues/85)) ([593ed80](https://github.com/DMBerlin/json-parsefy/commit/593ed803433f11d28f1e94b35c2b326d39e9453b))
* release pipeline ([#40](https://github.com/DMBerlin/json-parsefy/issues/40)) ([8d1a59c](https://github.com/DMBerlin/json-parsefy/commit/8d1a59cabfe553f540c958bf813963740b4a7c04))

## [1.4.0]

### Bug Fixes

* **release pipeline:** fix version mismatch between package.json and release-please-manifest.json
* **release pipeline:** ensure proper release workflow triggers
* **release pipeline:** fix release pipeline configuration

### Chores

* **readme:** update documentation
* **version:** update version management

## [1.3.0](https://github.com/DMBerlin/json-parsefy/compare/v1.2.1...v1.3.0) (2025-09-12)


### Features

* create test for json parsable ([#4](https://github.com/DMBerlin/json-parsefy/issues/4)) ([99917f8](https://github.com/DMBerlin/json-parsefy/commit/99917f8100f127dafbb8116f10c83eb61f63b822))
* json tree parsing ([#3](https://github.com/DMBerlin/json-parsefy/issues/3)) ([8b040fb](https://github.com/DMBerlin/json-parsefy/commit/8b040fb8bcc115fc4c44db6c9b11ce65601c7929))
* update ci, packages and configs ([#24](https://github.com/DMBerlin/json-parsefy/issues/24)) ([65f9a06](https://github.com/DMBerlin/json-parsefy/commit/65f9a069b6d13efa8ff80ab67a57b079e189ad40))
* update configs ([#2](https://github.com/DMBerlin/json-parsefy/issues/2)) ([a52fd9c](https://github.com/DMBerlin/json-parsefy/commit/a52fd9c1490a6eeb6548abe8475486bbb03ba712))
* update export ([#19](https://github.com/DMBerlin/json-parsefy/issues/19)) ([a0087eb](https://github.com/DMBerlin/json-parsefy/commit/a0087eb02c5b5fd451892878be8e50b63e5b9847))
* **version:** update version ([#21](https://github.com/DMBerlin/json-parsefy/issues/21)) ([0314842](https://github.com/DMBerlin/json-parsefy/commit/0314842d7e1fcac577906aacfc1739e656d50dfd))


### Bug Fixes

* **1.2.1:** file path aliases ([#22](https://github.com/DMBerlin/json-parsefy/issues/22)) ([28b8b02](https://github.com/DMBerlin/json-parsefy/commit/28b8b02197ae903c2973a2d350cd8d243e73b702))

## [1.2.1](https://github.com/DMBerlin/json-parsefy/compare/v1.2.0...v1.2.1) (2024-XX-XX)

### Bug Fixes

* Setup automated release pipeline with release-please

## Previous Releases

Previous releases were managed manually. Starting from version 1.2.2, all releases will be automated using release-please and follow conventional commits.
