const MDXPTypes = {
  NONE: 0b0001,
  LAYOUT: 0b0010,
  GROUP: 0b0100,
  WRAPPER: 0b1100
};
export default MDXPTypes;

export const setMDXPType = (Component, ...MDXPTypes) => {
  Component.MDXPType = MDXPTypes.reduce((a, b) => a | b);
  return Component;
};

export const getMDXPType = Component => {
  if (Component.hasOwnProperty('props') && Component.props.hasOwnProperty('originalType')) {
    return Component.props.originalType.hasOwnProperty('MDXPType') ?
      Component.props.originalType.MDXPType : MDXPTypes.NONE;
  }

  return Component.hasOwnProperty('MDXPType') ? Component.MDXPType : MDXPTypes.NONE;
};

export const checkMDXPType = (Component, MDXPType) => getMDXPType(Component) & MDXPType;
