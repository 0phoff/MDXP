import {Styled} from 'theme-ui';

const getAsComponent = (type, shortCodeComponents) => {
  if ((typeof (type) === 'string') || (type instanceof String)) {
    if (type in Styled) {
      return Styled[type];
    }

    if (type in shortCodeComponents) {
      return shortCodeComponents[type];
    }
  }

  return type;
};

export default getAsComponent;
