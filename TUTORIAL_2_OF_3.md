# Setting up a minimal React app from scratch - Part 2/3

In part one of this series, we learned the bare minimum configuration and setup to build our very first React component and have it rendered into the browser. 

In part two we will discuss a concept very useful in webpack called Loaders and why they are so important. 

> **Note:** If you inspect the webpack.config.js file from the previous example, you'll see that we used a loader to transform .jsx source code into regular javascript code.

## Loaders

According to the [docs](https://webpack.js.org/concepts/loaders/):

> Loaders are transformations that are applied to the source code of a module. They allow you to pre-process files as you `import` or “load” them.

As of now, we configured webpack to only transform .jsx files. Let's see what happens when we try to import a .css file from our index.js file.

```bash
$ touch src/App.css
$ open src/App.css
```
```css
body {
    background: rgb(246, 174, 45);
    color: #1f2d3d;
}
```

Head on to our index.js file and import the newly created css file:

```bash
$ open src/index.js
```
```jsx
import React from 'react'
import { render } from 'react-dom'

import './App.css'

const App = () => (
  <div>Hello world!</div>
)

render(
  <App />,
  document.getElementById('app')
)
```

This time, instead of executing webpack manually by running `yarn webpack`, let us create a more semantic command in our package.json file. We can also leverage webpack to automatically build our project whenever a file is changed, by adding the --watch flag:

```bash
$ open package.json
```
```json
{
  ...
  "scripts": {
    "build": "yarn webpack --watch"
  },
  ...
 }
  ```

Now if you run `$ yarn build` you will get a pretty self-explanatory error:

> ERROR: You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file

To fix this, we'll need first to install two packages: css-loader and style-loader.

```bash
$ yarn add css-loader style-loader -D
```

- **css-loader:** Allows css files to be imported as regular javascript modules;
- **style-loader:** Inserts the imported css into DOM's header tag;

```bash
$ open ./webpack.config.js
```
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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
```

- **test:** A regular expression used to match the loader against the file you are interested in;
- **use:** The name(s) of the loader(s) that will load/transform the target file. 

> **Note:** Your loaders will be evaluated from right to left. In the example above css-loader will be executed first, and style-loader after.

If you refresh the page there should be no errors this time. Also, when the page opens with our rendered React component, try inspecting the header tag. You should see that whatever styles we put on App.css will be injected into the `<style />` tag.

## Adding support to .scss files

To support .scss files you just need to install `sass-loader` along with `node-sass` and create a configuration similar to that of our .css loader. 

```bash
$ yarn add sass-loader node-sass -D
```

- **sass-loader:** Loads a Sass/SCSS file and compiles it to CSS;
- **node-sass:** Allows .scss compilation to .css and is required by `sass-loader`

> **Note:** Because we are installing new packages and webpack is watching the files, it may crash. It's better to always run yarn build whenever you install something new.

Add a new rule to allow webpack to load .scss files:

```bash
$ open webpack.config.js
```
```js
module.exports = {
  module: {
    rules: [
	  // Content ommited for better readability...
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}
```

```bash
# Rename the .css extension to .scss
$ mv src/App.css src/App.scss
```

Fix the import from index.js:

```bash
$ open src/index.js
```
```jsx
import React from 'react'
import { render } from 'react-dom'

import './App.scss'

const App = () => (
  <div>Hello world!</div>
)

render(
  <App />,
  document.getElementById('app')
)
```

Great job! Now your project supports .scss files!

## Loading assets

Working with images, or any other kind of file extensions for that matter is fairly straightforward. We'll be using `file-loader` to emit the imported file into the output folder.

> **Note:** You could also inline your assets as data uri or import them as string, but that requires other loaders such as url-loader or raw-loader.

```bash
$ yarn add file-loader -D
$ open webpack.config.js
```
```jsx
module.exports = {
  module: {
    rules: [
      // Content omitted for better readability...
      {
        test: /\.(jpe?g|png|svg)$/,
        use: 'file-loader'
      }
    ]
  }
}
```
For testing purposes, let's add an image to our src folder and have it imported from our `./src/App.scss`.

> **Note:** There's a sample image named "let-there-be-sun.png" in the [repo](https://github.com/th3N0m4d/react-apps-from-scratch). I'm using it in this example.

```bash
$ open src/App.scss
```

```css
body {
    background-image: url(./let-there-be-sun.png);
    color: #1f2d3d;
}
```

If you refresh the browser you will notice that the background image is loaded as expected. 

> **Note:** With this configuration you can even import images from .jsx files!

### Loading Fonts

Depending on your needs, you might want to load fonts hosted on external servers (CDN) or those hosted on your own (i.e, woff2, woff, eot...).

#### CDN

Say you want to load the free version of LinearIcons  font in your project. You could accomplish this task by simply importing it in your .css file without additional configuration.

```bash
$ open src/App.scss
```
```css
@import url(https://cdn.linearicons.com/free/1.0.0/icon-font.min.css);

body {
    background-image: url(./let-there-be-sun.png);
    color: #1f2d3d;
}
```

#### Local assets

On the other hand, you might want to use the version you have installed on your project. 

> **Note:** You can find the fonts for this example in the [repo](https://github.com/th3N0m4d/react-apps-from-scratch).

1) We will start by defining the fonts we want file-loader to load for us:

```js
module.exports = {
  module: {
    rules: [
       // Content omitted for better readability...
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  }
}
```
2) In your .scss file, configure which fonts you want to load from your local server:
```bash
$ open src/App.scss
```
```css
@font-face {
	font-family: 'Linearicons-Free';	
		src:url('fonts/Linearicons-Free.woff2') format('woff2'),
		url('fonts/Linearicons-Free.woff') format('woff');
	font-weight: normal;
	font-style: normal;
}

.lnr-clock:before {
	content: "\e864";
}

body {
	font-family: "Linearicons-Free";
    background-image: url(./let-there-be-sun.png);
    color: #1f2d3d;
}
```
3) Use the font in your component:
```jsx
import React from 'react'
import { render } from 'react-dom'

import './App.scss'

const App = () => <span className='lnr lnr-clock' />

render(
  <App />,
  document.getElementById('app')
)
```

## Conclusion

In this tutorial, we learned that thanks to Loaders, we can import and transform files by simply defining which extensions our loader has to load from.

Up to this point, our project supports compiling .jsx files to regular js, .scss into .css  and also loading assets such as images and fonts. 

In the next and final part of this tutorial, we'll set up Jest with Enzyme and add Plugins to automate some tasks for us, such as cleaning the dist directory before every build and moving our index.html file to dist among other things.  