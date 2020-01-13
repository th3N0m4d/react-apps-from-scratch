## Environment variables

When developing an application, you usually define a context for running your code in, such as development or production. You do not test your application against the production database, as an extreme example. 

It's common to use the variables defined by your system, such as `PATH` or `PORT`. Often times you end up creating your own (i.e. database connection strings).

In this part of the tutorial, we'll install and setup `dotenv` and create its context file from which its configuration will be loaded from.

### Installing the dependencies

```bash
$ yarn add dotenv -D
```
- **[dotenv](https://www.npmjs.com/package/dotenv):** A module that loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env).

### Configuration

```bash
$ open webpack.config.js
```
```js
const  path  =  require('path')
const  HtmlWebPackPlugin  =  require('html-webpack-plugin')
const { CleanWebpackPlugin } =  require('clean-webpack-plugin')

require('dotenv').config()

// Content omitted for better readability
// ...
```
### Create the context file
```bash
$ touch .env
$ open .env
```
```text
NODE_ENV=development
```

> **Warning:** It's recommended that you do not add this .env file to your repo because of the sensitive information it might contain.

### Untrack .env (recommended)
```bash
$ open .gitignore
```
```text
node_modules
dist
.env
```

## Serving files from a local server

So far we've been testing our app by going to the dist folder and opening index.html file with a browser. 

There's a much easier and better way to do that: enter WebpackDevServer.

### Installing the dependencies

```bash
$ yarn add webpack-dev-server -D
```
- **[webpack-dev-server](https://webpack.js.org/configuration/dev-server/):** Allows you to serve your app from a local server.

### Add script to start up the server

```json
{
  "scripts": {
    "build": "yarn lint && yarn test && webpack",
    "build:watch": "yarn build --watch",
    "test": "yarn lint && yarn jest",
    "test:watch": "jest --watchAll",
    "lint": "standard",
    "start": "webpack-dev-server"
  },
  ...
}
```
```bash
$ yarn start
```

### Configuration

WebpackDevServer is highly [configurable](https://webpack.js.org/configuration/dev-server/). If you want to override its default behavior, such as the port number or whether to serve your app in a new browser tab, you just need to provide it under `devServer`, like in the example below:

```bash
$ open webpack.config.js
```
```js
// ...
// Content omitted for better readability

const devServer = {
  port: 9000,
  open: true
}

module.exports  = {
	devServer,
	// ...
}
```
```bash
$ yarn start
```

## Conclusion

In this tutorial we learned how to work with environment variables and how to serve our app with Webpack's dev server. 

In the next section we'll explore the basics of code splitting and optimization in general.