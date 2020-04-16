const componentTypes = {
  NONE: 0,
  LAYOUT: 1,
};
export default componentTypes;


export const getComponentType = (Component) => {
  if (Component.hasOwnProperty('props') &&  Component.props.hasOwnProperty('originalType')) {
    return Component.props.originalType.hasOwnProperty('MDXPType') ? Component.props.originalType.MDXPType : componentTypes.NONE;
  }
  else {
    return Component.hasOwnProperty('MDXPType') ? Component.MDXPType : componentTypes.NONE;
  }
};


export const setComponentType = (Component, componentType) => {
  Component.MDXPType = componentType;
  return Component;
}


export const setLayoutComponent = (Component) => setComponentType(Component, componentTypes.LAYOUT);
