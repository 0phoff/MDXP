const getComponentType = Component => {
  if (Component.hasOwnProperty('props') && Component.props.hasOwnProperty('originalType')) {
    return Component.props.originalType;
  }

  if (Component.hasOwnProperty('type')) {
    return Component.type;
  }
};

export default getComponentType;
