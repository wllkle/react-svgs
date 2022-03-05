# react-scripts-svg :rocket:

Transform a directory of SVG files into easily usable React components.

## Installation

```shell
npm install react-scripts-svg --save-dev
```

## Requirements

- SVG file names must contain only letters or hyphens, such as:
  - `settings.svg` -> `settings`
  - `alarm-clock.svg` -> `alarmClock`

## CLI Usage

`react-scripts-svg -p src/assets/svg -o src/components`

This will take SVG files from a directory `src/assets/svg` and generate a component within a folder called `components`, with the full path to the component being `src/components/icon.tsx`

`react-scripts-svg -p src/assets/svg -o src/components -t false -d`

This will do the same as above, but generate a JavaScript file instead of TypeScript; and the file will be called `index.jsx` inside a directory - with the full path to the component being `src/components/icon/index.jsx` 

### Usage in package.json

The script below can be run using `npm run svg`

##### package.json
```javascript
{
    ...
    "scripts": {
        ...
        "svg": "react-scripts-svg -p src/assets/svg -o src/components"
    }
}
```

### Parameters

| Parameter           | Description                                 | Type    | Default | Required |
|---------------------|---------------------------------------------|---------|---------|----------|
| --path, -p          | Path to directory containing SVG files      | string  |         | true     |
| --out, -o           | Output path (directory will be created)     | string  |         | true     |
| --typescript, -t    | Output TypeScript files                     | boolean | true    | false    |
| --component, c      | Generated React component name              | string  | icon    | false    |
| --directory, -d     | Generated directory name                    | string  | Icon    | false    |
| --jsx, -j           | Use JSX file extensions (.jsx, .tsx)        | boolean | true    | false    |
| --propTypes, --pt   | Generate PropTypes definition for component | boolean | false   | false    |

## Component Usage

This example assumes all default values are used.

##### src/components/settings-icon/index.tsx
```typescript jsx
import React from "react"
import Icon from "../icon"

export const SettingsIcon = () => (
    <Icon name="settings" className="settings-icon" style={{fill: "red"}} />
);
```
