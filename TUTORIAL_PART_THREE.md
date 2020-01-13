Our React application is missing a critical component: Tests. In this section, we will configure Jest and Enzyme step-by-step. At the end of the tutorial, we should be able to run tests against a simple component.

## Setting up Jest

Jest is a testing framework that is commonly used for testing React apps. 

> **Note:** Actually, you can test pretty much all the major frameworks on the market today with Jest.
### Dependencies
```bash
$ yarn add jest babel-jest @types/jest -D
```

### Basic example

```bash
$ touch src/sample.test.js
$ open src/sample.test.js
```
```js
describe('Sample test', () => {
  test('should be equal to 1', () => {
    expect(1).toBe(1)
  })
})
```
Now head on to your package.json file and add a new script for running tests:
```bash
$ open package.json
```
```json
{
  "scripts": {
    "build": "webpack",
    "test": "jest"
  },
  ...
}  
```
```bash
$ yarn test
```
![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/frryjvk6x4go7upkbum3.png)

### Adding support to React

The previous setup allows you to run tests against plain javascript objects only. In order to make Jest "understand" React, you need to use Babel. 

You can add this configuration in an external file or inside package.json. For the sake of simplicity, I'm using package.json to configure Jest.

```bash
$ open package.json
```
```json
{
  "scripts": {
    "build": "webpack",
    "build:watch": "webpack --watch",
    "test": "jest"
  },
  "babel": {
    "presets": [
      "@babel/env",
      "@babel/react"
    ]
  },
  ...
}  
```

## Enzyme

Enzyme is a testing utility that allows you to manipulate and traverse React components. It really comes in handy when you need to test whether a callback was fired via user interaction or, for instance,  whether a component has subcomponents.

### Dependencies

```bash
$ yarn add enzyme jest-enzyme enzyme-adapter-react-16 -D
```
### Configuration file
```bash
$ touch src/setupTests.js
$ open src/setupTests.js
```
```js
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
```
> **Note:** In order to be fully compatible with React, Enzyme provides an adapter to each React version. 

### Package.json

Last but not least, we need to configure Jest to run Enzyme's configuration file after the test environment has been installed.

```bash
$ open package.json
```

```json
{
  "scripts": {
    "build": "webpack",
    "build:watch": "webpack --watch",
    "test": "jest"
  },
  "jest": {
    "setupFilesAfterEnv": [
      "<rootDir>/src/setupTests.js"
    ],
    "testPathIgnorePatterns": [
      "<rootDir>/node_modules/"
    ]
  },
  "babel": {
    "presets": [
      "@babel/env",
      "@babel/react"
    ]
  },
  ...
}
```
  
## Putting it all together

Remember that App component we created in the previous tutorial? We will move it to its own file and run a basic test to check whether or not it's rendering correctly.

### Move App component to its own file

```bash
$ touch src/App.jsx
$ open src/App.jsx
```
```jsx
import React from 'react'

const App = () => (
  <div>
	 <h1>App component</h1>
	 <p>Hello world!</p>   
  </div>
)

export default App
```

### Update index.js 

```bash
$ open src/index.js
```
```js
import React from 'react'
import { render } from 'react-dom'

import './App.scss'
import App from './App.jsx'

render(
  <App />,
  document.getElementById('app')
)
```

### Test drive

```bash
$ touch src/App.test.js
$ open src/App.test.js
```
```js
import React from 'react'
import { shallow } from 'enzyme'

import App from './App'

describe('App', () => {
  test('should render', () => {
    const wrapper = shallow(
      <App />
    )

    expect(wrapper.exists()).toBeTruthy()
  })
})
```
And finally run the test:
```bash
$ yarn test
```
![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/s3hi6zc14905etl8mk60.png)

### Module Mappings

Thanks to Loaders, we can import things like style sheets or images from a javascript file as if they were modules. 

If you attempt to load such a module from your React component, you'll get an error like the one below:

> **SyntaxError:** Invalid or unexpected token


The recommended approach is to create a folder with two files: one for styles and another for files.



```bash
# Create a directory at the root level
$ mkdir __mocks__
```
### Mock module for dealing with files
```bash
$ touch __mocks__/fileMock.js
$ open __mocks__/fileMock.js
```
```js
// __mocks__/fileMock.js

module.exports = {}
```
### Mock module for dealing with styles 
```bash
$ touch __mocks__/styleMock.js
$ open __mocks__/styleMock.js
```
```js
// __mocks__/styleMock.js

module.exports = {}
```
### Mapping the file types to their respective mock modules
```bash
$ open package.json
```
```json
{
  "scripts": {
    "build": "webpack",
    "build:watch": "webpack --watch",
    "test": "jest",
    "test:watch": "jest --watchAll"
  },
  "jest": {
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js"
    },
    "setupFilesAfterEnv": [
      "<rootDir>/src/setupTests.js"
    ],
    "testPathIgnorePatterns": [
      "<rootDir>/node_modules/"
    ]
  },
  ...
}  
```
> **Note:** I added a new script called "test:watch" under "scripts". As you might have guessed, this allows us to edit our source code / tests and have Jest re-run them for us.


## Conclusion

This tutorial was supposed to be a 3 parts series on how to set up a basic React app without CRA, but due to the lengthy explanations, I'm planning on expanding it to.

In the next section, we will add support to linting and use a few webpack plugins to improve our development experience.
