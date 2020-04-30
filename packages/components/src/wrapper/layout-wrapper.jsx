import React from 'react';
import PropTypes from 'prop-types';
import {MDXPTypes, setMDXPType, checkMDXPType} from '@mdxp/core';

const LayoutWrapper = ({Layout, layoutProps = {}, children}) => {
  children = React.Children.toArray(children);
  if ((children.length === 1) && (checkMDXPType(children[0], MDXPTypes.LAYOUT))) {
    return children;
  }

  return (<Layout {...layoutProps}>{children}</Layout>);
};

LayoutWrapper.propTypes = {
  /** Layout that gets applied to all slides that don't already have a layout */
  Layout: PropTypes.elementType.isRequired,

  /** Extra properties that are passed to the layout */
  layoutProps: PropTypes.object,

  children: PropTypes.node
};

export default setMDXPType(LayoutWrapper, MDXPTypes.WRAPPER, MDXPTypes.LAYOUT);
export {LayoutWrapper as _LayoutWrapper};
