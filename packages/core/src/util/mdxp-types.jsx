const MDXPTypes = {
  NONE: 0,
  LAYOUT: 1,
};
export default MDXPTypes;


export const getMDXPType = (Component) => {
  if (Component.hasOwnProperty('props') &&  Component.props.hasOwnProperty('originalType')) {
    return Component.props.originalType.hasOwnProperty('MDXPType') ?
      Component.props.originalType.MDXPType : MDXPTypes.NONE;
  }
  else {
    return Component.hasOwnProperty('MDXPType') ? Component.MDXPType : MDXPTypes.NONE;
  }
};


export const setMDXPType = (Component, MDXPType) => {
  Component.MDXPType = MDXPType;
  return Component;
}


export const setMDXPLayoutType = (Component) => setMDXPType(Component, MDXPTypes.LAYOUT);
