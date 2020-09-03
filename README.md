# File Concatenation Plugin

A dead simple webpack plugin for concatenating files together.

## Usage

```js
// webpack.config.js
const FileConcatenationPlugin = require('webpack-file-concat-plugin')

module.exports = {
  plugins: [
    // ...other plugins
    new FileConcatenationPlugin({
      // These paths are relative to output.path
      source: 'foo/*.css',
      destination: 'styles.css',
    }),
  ],
}
```

## Options

| Option              | Type      | Default | Description                                                       |
| ------------------- | --------- | ------- | ----------------------------------------------------------------- |
| source              | `string`  | -       | A glob path specifying the files you would like to concatenate    |
| destination         | `string`  | -       | The file you would like to output the concatenated text to        |
| deleteSourceFiles   | `boolean` | `false` | True will delete the source files being concatenated              |
| appendToDestination | `boolean` | `false` | True will append to the destination file instead of overriding it |

## FAQ

### How do I write multiple destination files?

To write multiple destination files, or to specify multiple source globs, simply create multiple instances of the `FileConcatenationPlugin`.

## Alternatives

There are several other webpack plugins relating to concatenation of files that might suit your needs if the File Concatenation Plugin doesn't.

Each of these are more complicated than File Concatenation Plugin, which could be good or bad depending on what you're looking for.

- [ModuleConcatenationPlugin](https://webpack.js.org/plugins/module-concatenation-plugin)
- [webpack-concat-plugin](https://www.npmjs.com/package/webpack-concat-plugin)
- [webpack-concat-files-plugin](https://www.npmjs.com/package/webpack-concat-files-plugin)
