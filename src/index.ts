import { createContext, createElement, useContext, useReducer } from 'react';

export interface Action {
  readonly type: string;
  readonly payload?: any;
}
export type Dispatch<A extends Action> = (action: A) => void;
export type Reducer<S, A extends Action> = (state: S, action: A) => S;
export type ReducerHook<S, A extends Action> = () => [S, Dispatch<A>];

export function createGlobalReducer<S, A extends Action>(
  reducer: Reducer<S, A>,
  initialState: S
): [React.ComponentType, ReducerHook<S, A>] {
  const Context = createContext<[S, Dispatch<A>]>([initialState, () => {}]);

  const useGlobalReducer = () => useContext(Context);

  const Provider: React.ComponentType = ({ children }) => {
    const value = useReducer(reducer, initialState);
    return createElement(Context.Provider, { value }, children);
  };

  return [Provider, useGlobalReducer];
}

export interface ReducerBuilder<S, A extends Action> {
  [type: string]: Reducer<S, A>;
}

export type Actions<R> = {
  [P in keyof R]: (payload?: any) => Action;
};

export function mergeReducers<S, A extends Action>(builder: ReducerBuilder<S, A>): Reducer<S, A> {
  return function reducer(state, action) {
    const handler = builder[action.type];
    return handler(state, action);
  };
}

export function createActions<R extends ReducerBuilder<any, any>>(builder: R): Actions<R> {
  return Object.keys(builder).reduce(
    (actions, type) =>
      Object.assign(actions, { [type]: (payload?: any): Action => ({ type, payload }) }),
    {}
  ) as Actions<R>;
}

export interface SliceConfig<S, A extends Action, R extends ReducerBuilder<S, A>> {
  initialValue: S;
  reducers: R;
}

export function createGlobalSlice<S, A extends Action, R extends ReducerBuilder<S, A>>(
  config: SliceConfig<S, A, R>
): [React.ComponentType, ReducerHook<S, A>, Actions<R>] {
  const reducer = mergeReducers(config.reducers);
  const actions = createActions(config.reducers);
  const [Provider, useGlobalReducer] = createGlobalReducer(reducer, config.initialValue);
  return [Provider, useGlobalReducer, actions];
}
