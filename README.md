# webpack-source-maps

The goal of this is to have webpack produce a source map which is usable across all environments:
1. Has no `sourcesContent`.
1. Has a `sourceRoot`.
1. `sources` are relative to the `sourceRoot`.

For example:
```json
{
  "version": 3,
  "sources": [
    "index.ts"
  ],
  "names": [
    "Error"
  ],
  "mappings": "mBAAA,MAAM,IAAIA,MAAM,U",
  "file": "bundle.js",
  "sourceRoot": "src"
}
```

## Setup

```shell
npm install
```

## Build

```shell
npm run build
```

## Start

```shell
npm start
```
