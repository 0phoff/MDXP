import {useReducer} from 'react';


/**
 * Merging Reducer
 * It takes a new state and merges it with the old state, overwriting any properties with the new state values.
 * The new state can also be a function, which computes the new state from the old state.
 *
 * @param   {object} defaultState
 *          Default state the reducer starts with
 * @return  {newState => void}
 *          Reducer function which computes the new state by merging the old and new state objects
 */
const useMerger = (defaultState) => {
  return useReducer(
    (state, next) => {
      if (typeof next === 'function') {
        next = next(state);
      }
      return {
        ...state,
        ...next,
      }
    },
    defaultState
  );
};
export default useMerger;
