import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Action, createGlobalReducer, createReducer } from '../index';

describe('Global reducer', () => {
  afterEach(cleanup);

  it('should create a global reducer with an inital state', () => {
    const reducer = createReducer<number, Action>({
      inc: () => 1
    });
    const [CounterProvider, useGlobalCounter] = createGlobalReducer(reducer, 0, dispatch => ({
      increment: () => dispatch({ type: 'inc' })
    }));
    const Counter = () => {
      const [state, , actions] = useGlobalCounter();
      return (
        <div>
          <span>{state}</span>
          <button type="button" onClick={actions.increment}>
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

  it('should create a global reducer and accept parameters on the dispatcher', () => {
    interface MyAction extends Action {
      payload: string;
    }
    const [PersonProvider, useGlobalPerson] = createGlobalReducer(
      createReducer<{ name: string }, MyAction>({
        setName: (_, { payload }) => ({ name: payload })
      }),
      { name: 'pepe' },
      dispatch => ({
        setName: name => dispatch({ type: 'setName', payload: name })
      })
    );
    const PersonForm = () => {
      const [person, , { setName }] = useGlobalPerson();
      return (
        <div>
          <h3>Name</h3>
          <input
            data-testid="1"
            value={person.name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
      );
    };
    const App = () => (
      <PersonProvider>
        <PersonForm />
      </PersonProvider>
    );
    const { getByTestId } = render(<App />);
    const element = getByTestId('1') as HTMLInputElement;
    expect(element.value).toEqual('pepe');
    fireEvent.change(element, { target: { value: 'antonio' } });
    expect(element.value).toEqual('antonio');
  });
});
