import {useReducer} from 'react';


/**
 * Higher-Order Reducer
 * It takes a function as new state, which should compute a new state based on the old state.
 *
 * @param   {T} defaultState
 *          Default state the reducer starts with
 * @return  {(oldState:T => newState:T) => void}
 *          Reducer function, which takes a function to compute the new state
 * @template T
 */
const useHOReducer = (defaultState) => {
  return useReducer(
    (state, newState) => {
      return newState(state);
    },
    defaultState
  );
};

