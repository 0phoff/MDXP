const getComponentType = Component => {
  if (Component.hasOwnProperty('props') && Component.props.hasOwnProperty('originalType')) {
    if (Component.props.hasOwnProperty('mdxType')) {
      return Component.props.mdxType;
    }

    return Component.props.originalType;
  }

  if (Component.hasOwnProperty('type')) {
    return Component.type;
  }
};

export default getComponentType;
