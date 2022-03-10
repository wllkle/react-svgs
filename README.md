# react-scripts-svg :rocket:

Transform a directory of SVG files into an easily usable React component.

## Installation

```shell
npm install react-scripts-svg --save-dev
yarn add -D react-scripts-svg
```

## Usage

    react-scripts-svg -p src/assets/svg -o src/components -t -d vector

This will take SVG files from directory `src/assets/svg` and generate files containing the component and SVG data. From
the working directory where the command is executed; the generated files will be:

- `src/components/vector/index.tsx` - component
- `src/components/vector/types.ts` - data, TypeScript types (if `-t` flag is provided)

### Parameters

| Parameter           | Description                                 | Type    | Default | Required |
|---------------------|---------------------------------------------|---------|---------|----------|
| --path, -p          | Path to directory containing SVG files      | string  |         | ✔        |
| --out, -o           | Output path (directory will be created)     | string  |         | ✔        |
| --typescript, -t    | Output TypeScript files                     | boolean | false   | ❌        |
| --component, c      | Generated React component name              | string  | svg     | ❌        |
| --directory, -d     | Generated directory name                    | string  | SVG     | ❌        |
| --jsx, -j           | Use JSX file extensions (.jsx, .tsx)        | boolean | true    | ❌        |
| --propTypes, --pt   | Generate PropTypes definition for component | boolean | false   | ❌        |

### Usage in package.json

The script below can be run using `npm run svg`

##### package.json
```json
{
    "scripts": {
        "svg": "react-scripts-svg -p src/assets/svg -o src/components"
    }
}
```

### Component Usage

This example assumes all default values are used.

##### src/components/settings-icon/index.ts
```typescript jsx
import React from "react"
import Icon from "../icon"

export const SettingsIcon = () => (
    <Icon name="settings" className="settings-icon" style={{fill: "red"}}/>
);
```

### Component Props

| Prop      | Type                                                              | Required |
|-----------|-------------------------------------------------------------------|----------|
| name*     | string                                                            | ✔        |
| className | string                                                            | ❌        |
| style     | [CSSProperties](https://reactjs.org/docs/dom-elements.html#style) | ❌        |

_* name prop must be one of the strings exported in `types.js` or `types.ts` - if using TypeScript this will be enforced._

## Assumptions
- SVG file names must contain only letters or hyphens, such as:
    - `settings.svg` -> `settings`
    - `alarm-clock.svg` -> `alarmClock`
