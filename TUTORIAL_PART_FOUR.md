## Plugins

A Plugin is an object that has access to Webpack's compiler. This means that in practice, developers can hook into Webpack's build process and have access to the build's life-cycle callbacks.

In this section, we will be using two useful plugins: HtmlWebPackPlugin and CleanWebpackPlugin.

### Installing the dependencies
```bash
$ yarn add HTML-webpack-plugin clean-webpack-plugin -D
```
- **[html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/):** Useful whenever we need to create an HTML file to serve our bundles. You can either configure this object to create a brand new file for you or use an existing one;
- **[cleaning-up-the-dist-folder](https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder):** Cleans up the dist folder before each build, leaving only the newly generated files.

### Moving index.html file from dist to src

```bash
$ mv dist/index.html src/index.html
```
### Remove the script tag from the index.html file

 HtmlWebpackPlugin will add a script tag with the generated bundle to the index.html file automatically, hence the need to remove the one we added previously.

```html
<!DOCTYPE html>
<html>

<head>
    <title></title>
</head>

<body>
    <div id='app' />
</body>

</html>
```
### Import the plugins and add them to our config file
```bash
$ open webpack.config.js
```
```js
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const APP_DIR = path.join(__dirname, 'src')

const plugins = [
  new HtmlWebPackPlugin({
    template: `${APP_DIR}/index.html`
  }),
  new CleanWebpackPlugin()
]

module.exports = {
  // Add plugins to the config file
  plugins,
  module: [
	  // Content omitted for better readability
  ]
}  
 ```

```bash
$ yarn build
```

## Linting

A linting tool is a program that checks your code against a set of style rules. This is quite useful in enforcing code consistency across your team / organization. 

I've used standarjs for quite some time and I grew fond of this tool. There are other linting tools out there for you to pick. In this tutorial, I'm sticking to my old buddy standarjs.

### Installing the dependencies
```bash
$ yarn add standard babel-eslint -D
```
- **[standard](https://standardjs.com/#why-should-i-use-javascript-standard-style):** Allows you to standardize your code with no required configuration (although you can customize its default preset);
- **[babel-eslint](https://github.com/babel/babel-eslint):** babel-eslint is a parser that allows ESLint to run on source code that is transformed by Babel.

### Update package.json file
```bash
$ open package.json
```
### Add lint script
```json
{
  "scripts": {
    "build": "yarn lint && yarn test && webpack",
    "build:watch": "yarn build --watch",
    "test": "yarn lint && yarn jest",
    "test:watch": "jest --watchAll",
    "lint": "standard"
  },
  ...
}
```
> **Note:** It's good practice to lint your code, run the tests and only then build the project. This approach ensures we build our project only when the tests are passing and the code is following the code convetions we adopted.


### Configure standard to use babel-eslint
```json
{
  ...
  "standard": {
    "parser": "babel-eslint",
    "env": [
      "jest"
    ],
    "ignore": [
      "dist/**"
    ]
  },
  ...
}
```

> **Note:** To avoid linting errors in your test files such as, "describe is not defined" or similar warning errors, you need to add jest to the env variable under standard's configuration.

## Conclusion

In this section, we learned a thing or two about Plugins and the importance of maintaining our code base consistent by adopting a linting tool, such as Standarjs. 