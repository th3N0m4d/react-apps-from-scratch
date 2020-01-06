# Setting up a minimal React app from scratch - Part 1/3

Creating React apps nowadays is fairly straightforward thanks to the amazing create-react-app CLI (CRA for short). If you are not familiar with CRA you can learn more about it [here](https://create-react-app.dev/docs/getting-started/). 

With CRA you can build and test React apps with ease without requiring any configuration at all. Still, you might find yourself having to deal with some configuration down the road because not every React project is created equal. Also, learning the basics of what happens under the hood allows you to fully customize your project to fit your needs. 

The main goal of this tutorial is to help you understand basic webpack concepts as well as the required setup for producing a modern React application from scratch.

## Installing Webpack

Let's start by creating a package.json file before we jump into installing webpack.

`$ npm init -y`

With a basic package.json in place, go ahead and run the command line below:

`$ yarn add webpack webpack-cli -D`

> **Note:** The webpack-cli is necessary to run webpack in the terminal.

## Bundling your first file

According to the official webpack v4 docs:

> Out of the box, webpack won't require you to use a configuration file. However, it will assume the entry point of your project is `src/index` and will output the result in `dist/main.js` minified and optimized for production.

From the docs, we understand that webpack expects that the entry file is named index.js and it resides inside of a folder named src.

Let's go ahead and create both this directory along with the entry file:

```bash
$ mkdir src
$ touch src/index.js
$ open src/index.js
```

For demonstration purposes, let's `console.log` the ubiquitous "Hello world!" message. 

### ./src/index.js

```js
console.log('Hello world!')
```

On the terminal run `$ yarn webpack` and check your project folder. You will notice that after running this command line, webpack will create a dist folder along with a main.js file. 

> **Note:** If you want to check the unminified version of the bundle, go to your terminal and type in yarn webpack --mode=development

## Setting up a minimal React app

We'll start by installing the absolute minimal dependencies to run our React project:

```bash
$ yarn add react react-dom
$ yarn add @babel/core @babel/preset-env @babel/preset-react babel-loader -D
```

- **react:** This package provides the necessary tools for us to build React apps, such as components and elements;
- **react-dom:** Allows React to be rendered into the browser;
- **@babel/core, @babel/preset-env, babel-loader:** These three packages are commonly installed together whenever you want to take advantage of the latest Javascript features without worrying about backward compatibility with older browsers;
- **@babel/preset-react:** Allows Babel to transform .jsx files into regular javascript files;

At this point, we have installed all the necessary packages to create a basic React component and render it into the browser. The only thing we need to do is tell webpack how this is going to happen.

Start by creating the configuration file:

```bash
$ touch webpack.config.js
$ open webpack.config.js
```

### #1 ./webpack.config.js
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  }
}
```

> Check the official  [webpack docs](https://webpack.js.org/concepts/) for more information on how to structure your config file and what each object expects/does.


### #2. ./src/index.js

```js
import React from 'react'
import { render } from 'react-dom'

const App = () => (
  <div>Hello world!</div>
)

render(
  <App />,
  document.getElementById('app')
)
```


### #3 ./dist/index.html
```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
    <div id='app' />
    <script src="main.js"></script>
</body>
</html>
```

Time to render our modest component into the browser:

1. `$ yarn webpack`
2. `$ open dist/index.html`

If everything went well, you should see that our React component was rendered correctly.

## Conclusion

In this short tutorial, we had a gentle introduction to webpack and what are the minimal packages that we need to build a basic React component.

In the next section, we'll be exploring how to manage our application assets. Last but not least, we'll install and configure Jest, Enzyme, and PropTypes.