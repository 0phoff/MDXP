import {useReducer} from 'react';


export const useDeckState = (defaultState={}, context) => {
  let contextValues, contextKeys, contextSetter;
  if (context === undefined) {
    contextValues = {};
    contextSetter = () => {};
    contextKeys = new Set();
  }
  else {
    contextValues = context[0];
    contextSetter = context[1];
    contextKeys = new Set(Object.keys(contextValues));
    for (const key of Object.keys(contextValues)) {
      if (contextKeys.has(key)) {
        contextKeys.delete(key);
      }
    }
  }

  return useReducer(
    (state, next) => {
      let contextNext = {};
      for (const [key, value] of Object.entries(next)) {
        if (contextKeys.has(key)) {
          contextNext[key] = value;
        }
      }
      if (Object.keys(contextNext).length > 0) {
        contextSetter(contextNext);
      }
      
      return {
        ...state,
        ...next
      };
    },
    {...contextValues, ...defaultState}
  )
};
export default useDeckState;
