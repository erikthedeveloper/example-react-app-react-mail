# ReactMail

An Example [React.js](https://facebook.github.io/react/index.html) App for Practical Learning Purposes

Let me begin by saying that there are many great resources out there for learning React etc...

- Pete Hunt's react-howto: https://github.com/petehunt/react-howto
- Tyler McGinnis' React.js Program: http://www.reactjsprogram.com/
- React docs: https://facebook.github.io/react/docs/thinking-in-react.html
- Egghead.io Videos: https://egghead.io/technologies/react
- So many more...

My goal with this project, is for it to serve as a practical example that goes beyond a basic TODO list.

**Contributions, Feedback, and Code Review are welcome!** Please, feel free to reach out with any questions, suggestions for improvements, or ideally Issues and/or Pull Requests :)

## The App

```
# Install dependencies
npm install

# Start development servers (client + API)
npm start

# Run tests
npm test
```

![reactmaillistanimation](https://cloud.githubusercontent.com/assets/1240178/14709257/f80d4ec6-078c-11e6-95bc-63c5c2817da8.gif)

Some Basic Features/Highlights. _Hint: these should become tests :)_

- Fetch data from JSON API (read)
- Submit data to the JSON API (write)
- Maintain local state
- View a listing of messages
  - Text search
  - "Sort by"
  - Filter by "flagged"
  - "Load More" (i.e. pagination)
  - Toggle a message's "flagged" status
  - Delete a message
- View a single message
  - Toggle a message's "flagged" status
  - Delete a message
  - Navigate directly to `/:id` route and have appropriate message requested
  - Redirect back to "messages" when `/:id` is not found OR is deleted
- Animation via [ReactCSSTransitionGroup](https://facebook.github.io/react/docs/animation.html)

### React

- [Stateless Function Components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions)
- [React Class Components](https://facebook.github.io/react/docs/component-specs.html)
- Reacting to state changes.
  - See [MessageBrowserContainer.componentDidUpdate](./src/components/MessageBrowser/MessageBrowserContainer.js) for an example.
- Separating logic/http/state from presenation using "container" and "presentational" components
  - See [MessageBrowser.js](./src/components/MessageBrowser/MessageBrowser.js) and [MessageBrowserContainer.js](./src/components/MessageBrowser/MessageBrowserContainer.js) for an example.
  - Read: Dan Abromov's [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.nxmg5vhby)
  - Read: [Container Components](https://medium.com/@learnreact/container-components-c0e67432e005#.o2nv78kp1)
  - Watch: [Egghead.io Video](https://egghead.io/lessons/react-increasing-reusability-with-react-container-components)
- Illustrate by example that JSX is merely a light layer of sugar on top of Javascript function calls.
  - See [Header.js](./src/components/Header.js) for equivalent examples both with JSX and without JSX

### [React Router](https://github.com/reactjs/react-router) (2.x)

- Setup basic routes [routes.js](./src/routes.js)
- Utilize React component lifecycle to initiate our HTTP requests based on entry route

### Setting up a React, ES6+, Webpack, Babel Environment

Just kidding. We'll let [nwb](https://github.com/insin/nwb) do all of that for us :)

All you need to know is 2 commands

- `npm install`: Install dependencies
- `npm start`: Start development server (along w/ hot reloading and all the related goodness)
- Now you can open your browser to http://localhost:3000/ and you should see the app running

This way we don't get hung up on the myriad of ways we *could* go about this.

### Communicating With a JSON API

Using [axios](https://github.com/mzabriskie/axios), a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) based HTTP client, we communicate with a JSON API (powered by [json-server](https://github.com/typicode/json-server)) to:

- Retreive a resource listing (`GET /`)
  - Work with managing our "query parameters" for pagination, filtering, and search
- Retreive a single resource (`GET /:id`)
- Update a single resource (`PATCH /:id`)
- Destroy a single resource (`DELETE /:id`)

### Utility Libraries (embrace open source)

- [lodash](https://lodash.com/docs) general Javascript utility library
- [classsnames](https://github.com/JedWatson/classnames) to make dynamic HTML classNames more pleasant

### Testing

- Test runner: [mocha](http://mochajs.org/)
- Assertions (and spies): [expect](https://www.npmjs.com/package/expect)
- Unit testing React components with shallow rendering [Enzyme](http://airbnb.io/enzyme/docs/api/shallow.html)

Unit tests live directly adjacent to the file under test. Example:

```
src/some/path/someModule.js
src/some/path/someModule.test.js
```

Running Tests
- Run all tests: `npm test`
- Run specific tests: `npm test -- --grep='some pattern here'`
- Run tests with a watch: `npm test -- --watch`

### Some Visual Highlights

![image](https://cloud.githubusercontent.com/assets/1240178/14581298/7b94dd6c-03a6-11e6-9a2e-b083e7f01746.png)

![image](https://cloud.githubusercontent.com/assets/1240178/14581305/bccbd18c-03a6-11e6-9023-a71a0d2f7676.png)

![embracethejsx](https://cloud.githubusercontent.com/assets/1240178/14581308/ca584060-03a6-11e6-8155-e3dd735bfe66.png)
