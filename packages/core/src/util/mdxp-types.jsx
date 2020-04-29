const MDXPTypes = {
  NONE: 0,
  LAYOUT: 1,
  GROUP: 2
};
export default MDXPTypes;

export const getMDXPType = Component => {
  if (Component.hasOwnProperty('props') && Component.props.hasOwnProperty('originalType')) {
    return Component.props.originalType.hasOwnProperty('MDXPType') ?
      Component.props.originalType.MDXPType : MDXPTypes.NONE;
  }

  return Component.hasOwnProperty('MDXPType') ? Component.MDXPType : MDXPTypes.NONE;
};

export const setMDXPType = (Component, MDXPType) => {
  Component.MDXPType = MDXPType;
  return Component;
};

export const setMDXPLayoutType = Component => setMDXPType(Component, MDXPTypes.LAYOUT);

export const setMDXPGroupType = Component => setMDXPType(Component, MDXPTypes.GROUP);
