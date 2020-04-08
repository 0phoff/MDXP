import {useReducer} from 'react';


const useDeckState = (defaultState={}) => (
  useReducer(
    (state, action) => {
      let next;
      if (typeof action === 'function') {
        next = action(state);
      }
      else {
        next = action;
      }

      return {
        ...state,
        ...next
      };
    },
    defaultState
  )
);
export default useDeckState;
