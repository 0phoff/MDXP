import MDXPTypes from './mdxp-types.js';
import createGroup from '../components/group.jsx';


export const setMDXPType = (Component, ...types) => {
  if (types.includes(MDXPTypes.GROUP)) {
    if (types.length > 1) {
      throw 'Cannot be MDXP Group type together with other types';
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
    if (Component.props.originalType.name === 'MDXDefaultShortcode') {
      if (Component.props.mdxType in shortCodes) {
        const scComponent = shortCodes[Component.props.mdxType];
        return '__emotion_base' in scComponent ? getMDXPType(scComponent.__emotion_base, shortCodes) : getMDXPType(scComponent, shortCodes);
      }
    }

    // Shortcode component 2
    if (Component.props.hasOwnProperty('mdxType')) {
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
