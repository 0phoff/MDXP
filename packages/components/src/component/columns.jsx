/** @jsx jsx */
import React from 'react';
import {jsx} from 'theme-ui';
import PropTypes from 'prop-types';
import cloneElement from '../util/clone.js';

const getStyleFromProps = (props, idx) => {
  return Object.entries(props).reduce((style, [key, value]) => {
    if (!Array.isArray(value)) {
      return {...style, [key]: value};
    }

    if (value.length > idx) {
      return {...style, [key]: value[idx]};
    }

    return style;
  }, {});
};

const Columns = ({children, sx = {}, ...props}) => (
  <div
    sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      ...sx
    }}
  >
    {
      React.Children.map(children, (child, i) => (
        cloneElement(child, {sx: {...child.props.sx, ...getStyleFromProps(props, i)}})
      ))
    }
  </div>
);

Columns.propTypes = {
  /** Style that gets set to the columns div. This is set as a Theme-UI sx property and can thus accept theme aware values. */
  sx: PropTypes.object,

  /** Each child becomes a separate column */
  children: PropTypes.node,

  /** Styles that get applied to the different columns. If you give an array, each column gets a separate value from the array. */
  props: PropTypes.object
};

export default Columns;
