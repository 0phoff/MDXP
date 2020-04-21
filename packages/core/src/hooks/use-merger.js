import {useReducer} from 'react';


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
