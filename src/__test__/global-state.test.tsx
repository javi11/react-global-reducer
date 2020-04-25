import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { createGlobalSlice } from '../index';

describe('Global reducer', () => {
  afterEach(cleanup);

  it('should create a global reducer with an inital state', () => {
    const [CounterProvider, useGlobalCounter, actions] = createGlobalSlice({
      initialValue: 0,
      reducers: {
        increment: s => s + 1,
        decrement: s => s - 1
      }
    });
    const Counter = () => {
      const [state, dispatch] = useGlobalCounter();
      return (
        <div>
          <span>{state}</span>
          <button type="button" onClick={() => dispatch(actions.increment())}>
            +1
          </button>
        </div>
      );
    };
    const App = () => (
      <CounterProvider>
        <Counter />
      </CounterProvider>
    );
    const { getByText } = render(<App />);
    expect(getByText('0')).toBeDefined();
    fireEvent.click(getByText('+1'));
    expect(getByText('1')).toBeDefined();
  });
});
