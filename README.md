# react-svgs :rocket:

Transform a directory of SVG files into an easily usable React component.

## Installation

```shell
npm i -D react-svgs
yarn add -D react-svgs
```

## Usage

This tool can be used in two ways; with command line arguments or with a config file object in your `package.json` file.

### Command Line Arguments

```shell
react-svgs -i src/assets/svg -o src/components/vector -t
```

This will take SVG files from directory `src/assets/svg` and generate TypeScript files containing the component and SVG
data. From the directory where the command is executed; the generated files will be:

- `src/components/vector/index.tsx` - component
- `src/components/vector/types.ts` - SVG data, TypeScript types (if `-t` flag is provided)

### Parameters

| Parameter            | Description                                 | Type    | Required |
|----------------------|---------------------------------------------|---------|----------|
| `--input`, `-i`      | Path to directory containing SVG files      | string  | ✔        |
| `--out`, `-o`        | Output path (directory will be created)     | string  | ✔        |
| `--name`, `-n`       | Generated React component name              | string  | ❌        |
| `--typescript`, `-t` | Output TypeScript files                     | boolean | ❌        |
| `--nojsx`            | Use `.js` / `.ts` file extensions           | boolean | ❌        |
| `--proptypes`        | Generate PropTypes definition for component | boolean | ❌        |

### Usage in package.json

The scripts below can be run using `npm run svg`, both examples achieve the same result.

```json5
// package.json

{
    "scripts": {
        "svg": "react-svgs -i src/assets/svg -o src/components/vector -n Vector -t"
    }
}
```

```json5
// package.json

{
    "scripts": {
        "svg": "react-svgs"
    },
    "svg": {
        "input": "src/assets/svg",
        "output": "src/components/vector",
        "name": "Vector",
        "typescript": true
    }
}
```

### Component Usage

This example assumes all default values are used.

```typescript jsx
// src/components/settings-icon/index.jsx

import React from "react"
import SVG from "../svg"

export const SettingsIcon = () => (
    <SVG
        name="settings"
        className="settings-icon"
        style={{fill: "red"}}
    />
);
```

### Component Props

| Prop      | Type                                                              | Required |
|-----------|-------------------------------------------------------------------|----------|
| name*     | string                                                            | ✔        |
| className | string                                                            | ❌        |
| style     | [CSSProperties](https://reactjs.org/docs/dom-elements.html#style) | ❌        |

_* name prop must be one of the strings exported in `types.js` or `types.ts` - if using TypeScript this will be
enforced._

## Assumptions

- SVG file names must contain only letters or hyphens, such as:
    - `settings.svg` -> `settings`
    - `alarm-clock.svg` -> `alarmClock`
