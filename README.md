# react-scripts-svg :rocket:

Transform a directory of SVG files into easily usable React components.

## Installation

```shell
npm install react-scripts-svg --save-dev
```

## CLI Usage

`react-scripts-svg -p assets/svg -o src/components`

This will take SVG files from a directory `assets/svg` and generate a component within a folder called `components`, with the full path to the component being `src/components/icon.tsx`

`react-scripts-svg -p assets/svg -o src/components -t false -d`

This will do the same as above, but generate a JavaScript file instead of TypeScript; and the file will be called `index.jsx` inside a directory - with the full path to the component being `src/components/icon/index.jsx` 

### Usage in package.json

The script below can be run using `npm run svg`

```javascript
{
    ...
    "scripts": {
        ...
        "svg": "react-scripts-svg -p assets/svg -o src/components -d"
    }
}
```

### Parameters

| Parameter           | Description                                 | Type    | Default | Required |
|---------------------|---------------------------------------------|---------|---------|----------|
| --path, -p          | Path to directory containing SVG files      | string  |         | true     |
| --out, -o           | Output path                                 | string  |         | true     |
| --typescript, -t    | Output TypeScript files                     | boolean | true    | false    |
| --name, -n          | Generated React component name              | string  | icon    | false    |
| --directory, -d     | Generate directory containing component     | boolean | false   | false    |
| --fileName, -f      | File/directory name for generated component | string  | Icon    | false    |
| --defaultExport, -x | Use default exports                         | boolean | true    | false    |
| --className, -c     | Default className for generated component   | string  | icon    | false    |
| --jsx, -j           | Use JSX file extensions (.jsx, .tsx)        | boolean | true    | false    |
| --propTypes, --pt   | Generate PropTypes definition for component | boolean | true    | false    |

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
