import MDXPTypes from './mdxp-types.js';

const createGroup = func => {
  const Group = ({children}) => children;
  Group.MDXPType = MDXPTypes.GROUP;
  Group.MDXPGroupFunc = func;
  return Group;
};

export const getMDXPGroupFunc = (Component, shortCodes = {}) => {
  // Component created by MDX
  if (Component.hasOwnProperty('props') && Component.props.hasOwnProperty('originalType')) {
    // Shortcode component
    if ((Component.props.originalType.name === 'MDXDefaultShortcode') || (Component.props.hasOwnProperty('mdxType'))) {
      if (Component.props.mdxType in shortCodes) {
        const scComponent = shortCodes[Component.props.mdxType];
        return '__emotion_base' in scComponent ? getMDXPGroupFunc(scComponent.__emotion_base, shortCodes) : getMDXPGroupFunc(scComponent, shortCodes);
      }
    }

    // Imported component
    return Component.props.originalType.hasOwnProperty('MDXPGroupFunc') ? Component.props.originalType.MDXPGroupFunc : i => i;
  }

  // Element by React
  if (Component.hasOwnProperty('type') && (Component.type.hasOwnProperty('MDXPGroupFunc'))) {
    return Component.type.MDXPGroupFunc;
  }

  // Raw component
  return Component.hasOwnProperty('MDXPGroupFunc') ? Component.MDXPGroupFunc : i => i;
};

export const setMDXPType = (Component, ...types) => {
  if (types.includes(MDXPTypes.GROUP)) {
    if (types.length > 1) {
      throw new Error('Cannot be MDXP Group type together with other types');
    }

    return createGroup(Component);
  }

  Component.MDXPType = types.reduce((a, b) => a | b);
  return Component;
};

export const getMDXPType = (Component, shortCodes = {}) => {
  // Component created by MDX
  if (Component.hasOwnProperty('props') && Component.props.hasOwnProperty('originalType')) {
    // Shortcode component
    if ((Component.props.originalType.name === 'MDXDefaultShortcode') || (Component.props.hasOwnProperty('mdxType'))) {
      if (Component.props.mdxType in shortCodes) {
        const scComponent = shortCodes[Component.props.mdxType];
        return '__emotion_base' in scComponent ? getMDXPType(scComponent.__emotion_base, shortCodes) : getMDXPType(scComponent, shortCodes);
      }
    }

    // Imported component
    return Component.props.originalType.hasOwnProperty('MDXPType') ? Component.props.originalType.MDXPType : MDXPTypes.NONE;
  }

  // Element by React
  if (Component.hasOwnProperty('type') && (Component.type.hasOwnProperty('MDXPType'))) {
    return Component.type.MDXPType;
  }

  // Raw component
  return Component.hasOwnProperty('MDXPType') ? Component.MDXPType : MDXPTypes.NONE;
};

export const checkMDXPType = (Component, MDXPType, shortCodes = {}) => (getMDXPType(Component, shortCodes) & MDXPType) === MDXPType;
