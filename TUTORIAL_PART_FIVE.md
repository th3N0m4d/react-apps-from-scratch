
## Environment variables

When developing an application, we must make a distinction between production and development environments. This is where environment variables come in handy. You probably encountered such variables before such as `PATH` or `PORT`. 

In this part of the tutorial, we'll install and setup `dotenv` and create its environment file with a few variables.

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
# Overrides the NODE_ENV and PORT number
NODE_ENV=development
PORT=9000
```

> **Warning:** It's recommended that you do not add this .env file to your repo because of the sensitive information it might contain (e.g, connection strings, username and password...).

### Untrack .env (recommended)
```bash
$ open .gitignore
```
```text
node_modules
dist
.env
```

## Serving files from dev server

So far we've been testing our app by going to the dist folder and opening index.html file from our favorite browser. 

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

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/vep2txsg2drlnjopuphf.png)

### Configuration

WebpackDevServer is highly [configurable](https://webpack.js.org/configuration/dev-server/). If you want to override its default behavior, such as the port number or whether to serve your app in a new browser tab, you just need to provide it under `devServer`, like in the example below:

```bash
$ open webpack.config.js
```
```js
// ...
// Content omitted for better readability

/*
	1. Destruct process.env object
	2. Rename PORT to port
	3. Rename NODE_ENV to mode
*/
const {
  PORT: port,
  NODE_ENV: mode
} = process.env

const devServer = {
  port,
  open: true
}

module.exports  = {
	mode,
	devServer,
	// ...
}
```
```bash
$ yarn start
```

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/f0jfq44mijsceongdkq9.png)

## Conclusion

In this tutorial, we learned how to work with environment variables and how to serve our app with Webpack's dev server. 
