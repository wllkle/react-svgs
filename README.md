# react-svgs :rocket:

Transform a directory of SVG files into one easily usable React component.

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

#### Props

| Prop      | Type                                                              | Required |
|-----------|-------------------------------------------------------------------|----------|
| name*     | string                                                            | ✔        |
| className | string                                                            | ❌        |
| style     | [CSSProperties](https://reactjs.org/docs/dom-elements.html#style) | ❌        |

_* name prop must be one of the strings exported in `types.js` or `types.ts` - if using TypeScript this will be
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

This example demonstrates using a "wrapper" component around the generated component. This example assumes the existing
project structure is as follows:

<pre>
<span style="color: dodgerblue">src</span>
├── <span style="color: dodgerblue">assets</span>
│   ├── alarm-clock.svg
│   └── settings.svg
├── <span style="color: dodgerblue">components</span>
│   └── <span style="color: dodgerblue">icon</span>
│       └── index.tsx
└── package.json
</pre>

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

To run the script use one of the following commands:

```shell
npm run icons
yarn icons
react-svgs
```

After running the script the project should look like this:

<pre>
<span style="color: dodgerblue">src</span>
├── <span style="color: dodgerblue">assets</span>
│   ├── alarm-clock.svg
│   └── settings.svg
├── <span style="color: dodgerblue">components</span>
│   └── <span style="color: dodgerblue">icon</span>
│       ├── index.tsx
│       └── <span style="color: dodgerblue">svg</span>
│           ├── <span style="color: limegreen">index.tsx</span>
│           └── <span style="color: limegreen">types.ts</span>
└── package.json
</pre>

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
