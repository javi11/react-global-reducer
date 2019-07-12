import { createGlobalReducer, createReducer } from 'react-global-reducer';

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

export const [PersonProvider, useGlobalPerson] = createGlobalReducer(
  createReducer({
    setName: (_, { payload }) => ({ name: payload })
  }),
  { name: 'pepe' },
  dispatch => ({
    setName: name => dispatch({ type: 'setName', payload: name })
  })
);
