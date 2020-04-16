import {useReducer} from 'react';


const useMerger = (defaultState) => {
  return useReducer(
    (state, next) => {
      return {
        ...state,
        ...next,
      }
    },
    defaultState
  );
};
export default useMerger;
