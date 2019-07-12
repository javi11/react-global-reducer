import React from 'react';

import { useGlobalCounter } from './hooks';

export default function Counter({ name }) {
  const [state, , actions] = useGlobalCounter();

  console.log(`render ${name}, state: ${state}`);

  return (
    <div>
      <h2>{name}</h2>
      {state}
      <button onClick={actions.increment}>+</button>
      <button onClick={actions.decrement}>-</button>
    </div>
  );
}
