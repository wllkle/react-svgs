# react-svgs 🚀

Transform a directory of SVG files into one easily usable React component.

![](https://img.shields.io/github/package-json/v/wllkle/react-svgs?label=version)
![](https://img.shields.io/npm/dm/react-svgs)
![](https://img.shields.io/badge/Coverage-100%25-83A603.svg?label=coverage&prefix=$coverage$)
![](https://img.shields.io/github/issues/wllkle/react-svgs)

## Installation

```shell
npm i -D react-svgs
yarn add -D react-svgs
```

## Usage

This tool can be used in two ways; with command line arguments or with a config object (`svg`) in your `package.json`
file.

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
| `--force`, `-f` 🔸   | Overwrite existing component file           | boolean | ❌        |
| `--nojsx`            | Use `.js` / `.ts` file extensions           | boolean | ❌        |
| `--proptypes`        | Generate PropTypes definition for component | boolean | ❌        |

🔸 _SVG data file is always overwritten to ensure it is up to date._

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

#### Props

| Prop      | Type                                                              | Required |
|-----------|-------------------------------------------------------------------|----------|
| name 🔸   | string                                                            | ✔        |
| className | string                                                            | ❌        |
| style     | [CSSProperties](https://reactjs.org/docs/dom-elements.html#style) | ❌        |

🔸 _name prop must be one of the strings exported in `types.js` or `types.ts` - if using TypeScript this will be
enforced._

#### Basic Example

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

#### Complete Example

This example demonstrates using a "wrapper" component around the generated component.

```json5
// package.json

{
    "scripts": {
        "icons": "react-svgs"
    },
    "svg": {
        "input": "src/assets",
        "output": "src/components/icon/svg",
        "typescript": true
    }
}
```

Run the script using one of the following commands:

```shell
npm run icons
yarn icons
react-svgs
```

```json5
// project structure

before                            after
------                            -----

src                               src
├── assets                        ├── assets
│   ├── alarm-clock.svg           │   ├── alarm-clock.svg
│   └── settings.svg              │   └── settings.svg
├── components                    ├── components
│   └── icon                      │   └── icon
│       └── index.tsx             │       ├── index.tsx
└── package.json                  │       └── svg
                                  │           ├── index.tsx
                                  │           └── types.ts
                                  └── package.json
```

```typescript jsx
// src/components/icon/index.tsx

import React from "react";
import SVG, {SVGTypes} from "./svg";

interface IconProps {
    icon: SVGTypes,
    size: "small" | "medium" | "large"
}

export const Icon = ({icon, size}: IconProps) => {
    const sizePx = size === "small" ? "10px" : "20px";

    return (
        <SVG
            name={icon}
            style={{
                width: sizePx,
                height: sizePx
            }}
        />
    );
};
```

## Assumptions

- SVG file names must contain only letters or hyphens, such as:
    - `settings.svg` -> `settings`
    - `alarm-clock.svg` -> `alarmClock`
