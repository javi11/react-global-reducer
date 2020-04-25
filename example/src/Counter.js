import React from 'react';
import PropTypes from 'prop-types';

import { createGlobalSlice } from 'react-global-reducer';

const [Provider, useCounter, actions] = createGlobalSlice({
  initialValue: 0,
  reducers: {
    increment: s => s + 1,
    decrement: s => s - 1
  }
});

export const CounterProvider = Provider;

export default function Counter({ name }) {
  const [value, dispatch] = useCounter();

  return (
    <div>
      <h2>{name}</h2>
      {value}
      <button onClick={() => dispatch(actions.increment())}>+</button>
      <button onClick={() => dispatch(actions.decrement())}>-</button>
    </div>
  );
}

Counter.propTypes = {
  name: PropTypes.string
};
