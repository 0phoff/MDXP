import {jsx} from 'theme-ui';

const cloneElement = (element, props, children) => {
  children = children || element.props.children;

  return jsx(element.type, {
    key: element.key,
    ref: element.ref,
    ...element.props,
    ...props,
    children
  });
};

export default cloneElement;
