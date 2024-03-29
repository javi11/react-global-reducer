# DEPRECATED USE OTHER ALTERNATIVES SUCH https://recoiljs.org/

# React global reducer [![Build Status](https://travis-ci.org/javi11/react-global-reducer.svg?branch=master)](https://travis-ci.org/javi11/react-global-reducer)

A React global state using the context and hooks API, without any dependencies.

## Usage

### Create global Provider and hook

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'inc':
      return state + 1;
    case 'dec':
      return state - 1;
    default:
      return state;
  }
}

const initialValue = 10;

export const [CounterProvider, useGlobalCounter] = createGlobalReducer(
  reducer,
  initialValue
);
```

### Using Provider

```jsx
import { CounterProvider } from './hooks';

export default () => (
  <CounterProvider>
    <App />
  </CounterProvider>
);
```

### Using global hook

```jsx
import { useGlobalCounter } from './hooks';

export default function Counter({ name }) {
  const [state, dispatch] = useGlobalCounter();

  const increment = useCallback(() => dispatch({ type: 'inc' }));
  const decrement = useCallback(() => dispatch({ type: 'dec' }));

  return (
    <div>
      <h2>{name}</h2>
      {state}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

## Or create the actions

```js

export const [CounterProvider, useGlobalCounter] = createGlobalReducer(
  createReducer({
    inc: x => x + 1,
    dec: x => x - 1
  }),
  10,
  dispatch => ({
    increment: () => setTimeout(() => dispatch({ type: 'inc' }), 300),
    decrement: () => dispatch({ type: 'dec' })
  })
);

export default function Counter({ name }) {
  const [state, , actions] = useGlobalCounter();

  return (
    <div>
      <h2>{name}</h2>
      {state}
      <button onClick={actions.increment}>+</button>
      <button onClick={actions.decrement}>-</button>
    </div>
  );
}

```

## Contributing

### Install

To install the project dependencies, run:

```console
npm install
```

It installs the `node_modules` dependencies.

### Testing

- To run all tests, use `npm run test`.
- To run the linter use, use `npm run lint`.

### CI and release

- To do a release, use `npm run release`.

### Git Commit Messages

- Use [conventional commits](https://www.conventionalcommits.org).
- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Limit the first line to 50 characters or less.
- Reference issues and pull requests explicitly.

### Contributors

- [View Contributors](https://github.com/javi11/react-global-reducer/graphs/contributors)
