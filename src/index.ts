import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

export interface Action {
  type: string;
}

export type ReducerBuilder<S, A extends Action> = (state: S, action: A) => S;

export interface Reducer<S, A extends Action> {
  [Key: string]: ReducerBuilder<S, A>;
}

export type Dispatch<A extends Action> = (action: A) => void;

export interface Actions<A extends Action> {
  [Key: string]: (...args: any[]) => void;
}

export type ActionsFactory<S, A extends Action> = (dispatch: Dispatch<A>, state: S) => Actions<A>;

export type Handler<S> = React.Dispatch<React.SetStateAction<S>>;

export type GlobalReducerHook<S, A extends Action> = [S, Dispatch<A>, Actions<A>];

export type GlobalReducer<S, A extends Action> = [
  React.ComponentType,
  () => GlobalReducerHook<S, A>
];

export function createGlobalReducer<S, A extends Action>(
  reducer: ReducerBuilder<S, A>,
  initialState: S,
  actionsFactory?: ActionsFactory<S, A>
): GlobalReducer<S, A> {
  const Context = createContext(initialState);
  const handlers: Handler<S>[] = [];

  function useGlobalReducer(): GlobalReducerHook<S, A> {
    const state = useContext(Context);
    const dispatch = useCallback(
      action => {
        const newState = reducer(state, action);
        handlers.forEach(handler => handler(newState));
      },
      [state]
    );

    const actions = useMemo(() => {
      if (typeof actionsFactory === 'function') {
        return actionsFactory(dispatch, state);
      }
      return {};
    }, [state, dispatch]);

    return [state, dispatch, actions];
  }

  const Provider: React.ComponentType = ({ children }) => {
    const [value, setValue] = useState(initialState);
    useEffect(() => {
      handlers.push(setValue);
      return () => {
        const index = handlers.indexOf(setValue);
        handlers.splice(index, 1);
      };
    }, [setValue]);
    return createElement(Context.Provider, { value }, children);
  };

  return [Provider, useGlobalReducer];
}

export function createReducer<S, A extends Action>(map: Reducer<S, A> = {}): ReducerBuilder<S, A> {
  return function reducer(state, action) {
    const handler = map[action.type];
    if (typeof handler === 'function') {
      return handler(state, action);
    }
    return state;
  };
}
