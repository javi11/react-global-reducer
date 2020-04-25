# React global reducer [![Build Status](https://travis-ci.org/javi11/react-global-reducer.svg?branch=master)](https://travis-ci.org/javi11/react-global-reducer)

A React global state using the context and hooks API, without any dependencies.

## Usage

### Create global Provider and hook

```jsx
import React from 'react';
import { createGlobalSlice } from 'react-global-reducer';

const [Provider, useCounter, actions] = createGlobalSlice({
  initialValue: 0,
  reducers: {
    increment: s => s + 1,
    decrement: s => s - 1,
    sum: (state, action) => state + action.payload
  }
});

export const CounterProvider = Provider;

export default function Counter() {
  const [value, dispatch] = useCounter();

  return (
    <div>
      {value}
      <button onClick={() => dispatch(actions.increment())}>+</button>
      <button onClick={() => dispatch(actions.decrement())}>-</button>
      <button onClick={() => dispatch(actions.sum(5))}>+5</button>
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
