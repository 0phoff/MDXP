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

export const getMDXPType = (Component, shortCodes = {}) => {
  if (Component.hasOwnProperty('props') && Component.props.hasOwnProperty('originalType')) {
    if (Component.props.originalType.name === 'MDXDefaultShortcode') {
      if (Component.props.mdxType in shortCodes) {
        const scComponent = shortCodes[Component.props.mdxType];
        return '__emotion_base' in scComponent ? getMDXPType(scComponent.__emotion_base, shortCodes) : getMDXPType(scComponent, shortCodes);
      }

      return MDXPTypes.NONE;
    }

    return Component.props.originalType.hasOwnProperty('MDXPType') ? Component.props.originalType.MDXPType : MDXPTypes.NONE;
  }

  return Component.hasOwnProperty('MDXPType') ? Component.MDXPType : MDXPTypes.NONE;
};

export const checkMDXPType = (Component, MDXPType, shortCodes = {}) => getMDXPType(Component, shortCodes) & MDXPType;
