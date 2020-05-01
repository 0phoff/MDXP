import React from 'react';
import PropTypes from 'prop-types';
import cloneElement from '../util/clone.js';

const Styling = ({children, ...props}) => {
  const child = React.Children.only(children);
  return cloneElement(child, {sx: {...child.props.sx, ...props}});
};

Styling.propTypes = {
  /** Single child that gets styled according to the sx property. */
  children: PropTypes.element.isRequired,

  /** Style that gets applied to the child. This is set as a Theme-UI sx property and can thus accept theme aware values. */
  props: PropTypes.object
};

export default Styling;
