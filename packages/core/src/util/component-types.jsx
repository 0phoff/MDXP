const componentTypes = {
  NONE: 0,
  LAYOUT: 1,

};
export default componentTypes;


export const getComponentType = (Component) => {
  if (('props' in Component) && ('originalType' in Component.props)) {
    return 'mdxPresenterType' in Component.props.originalType ? Component.props.originalType.mdxPresenterType : componentTypes.NONE;
  }
  else {
    return 'mdxPresenterType' in Component ? Component.mdxPresenterType : componentTypes.NONE;
  }
};


export const setComponentType = (Component, componentType) => {
  Component.mdxPresenterType = componentType;
  return Component;
}


export const setLayoutComponent = (Component) => setComponentType(Component, componentTypes.LAYOUT);
