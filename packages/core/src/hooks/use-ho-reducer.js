import {useReducer} from 'react';


const useHOReducer = (defaultState) => {
  return useReducer(
    (state, newState) => {
      return newState(state);
    },
    defaultState
  );
};
export default useHOReducer;
