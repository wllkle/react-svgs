# react-scripts-svg :rocket:

## Installation

`npm i react-scripts-svg --save-dev`

`yarn add react-scripts-svg --dev`

## Usage

### Basic Usage
`react-scripts-svg -p assets/svg -o components`

This will take SVG files from a directory `assets/svg` and generate a component within a folder called `components`, with the full path to the component being `components/icon.tsx`.

`react-scripts-svg -p assets/svg -o components -t false -d`

This will do the same as above, but generate a JavaScript file instead of TypeScript; and the file will be called `index.tsx` inside a directory - with the full path to the component being `components/icon/index.jsx`. 

### Usage in package.json

Below can be ran using `npm run svg` or `yarn svg`.

```javascript
{
    ...
    "scripts": {
        ...
        "svg": "react-scripts-svg -p assets/svg -d"
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
