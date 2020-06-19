import React from 'react';
import PropTypes from 'prop-types';
import cloneElement from '../util/clone.js';

const Styling = ({
  children,
  sx = {},
  variant,
  ...props
}) => {
  if ((typeof variant === 'string' || variant instanceof String)) {
    variant = 'mdxp.styling.' + variant;
  }

  const child = React.Children.only(children);
  return cloneElement(child, {sx: {...child.props.sx, variant, ...sx}, ...props});
};

Styling.propTypes = {
  /** Single child that gets styled according to the sx property. */
  children: PropTypes.element.isRequired,

  /** You can style the element by giving an sx property. This is set as a Theme-UI sx property and can thus accept theme aware values. */
  sx: PropTypes.object,

  /** Variant from 'mdxp.styling.' */
  variant: PropTypes.string,

  /** Extra properties that get added to the child element. */
  props: PropTypes.object
};

export default Styling;
