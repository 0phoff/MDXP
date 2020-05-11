import React from 'react';
import PropTypes from 'prop-types';
import cloneElement from '../util/clone.js';

const Styling = ({children, sx = {}}) => {
  const child = React.Children.only(children);
  return cloneElement(child, {sx: {...child.props.sx, ...sx}});
};

Styling.propTypes = {
  /** You can style the element by giving an sx property. This is set as a Theme-UI sx property and can thus accept theme aware values. */
  sx: PropTypes.object,

  /** Single child that gets styled according to the sx property. */
  children: PropTypes.element.isRequired,
};

export default Styling;
