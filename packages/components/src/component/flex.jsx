import React from 'react';
import PropTypes from 'prop-types';
import Block from './block.jsx';

const Flex = ({
  children,
  sx = {},
  width = '100%',
  height,
  display = 'flex',
  flexDirection,
  flexWrap,
  flexFlow,
  justifyContent,
  alignItems,
  alignContent,
  ...props
}) => (
  <Block
    sx={{
      width,
      height,
      display,
      flexDirection,
      flexWrap,
      flexFlow,
      justifyContent,
      alignItems,
      alignContent,
      ...sx
    }}
    {...props}
  >
    {children}
  </Block>
);

Flex.propTypes = {
  /** You can style the block by giving an sx property. This is set as a Theme-UI sx property and can thus accept theme aware values. */
  sx: PropTypes.object,

  children: PropTypes.node,
  width: PropTypes.string,
  height: PropTypes.string,
  display: PropTypes.oneOf(['flex', 'inline-flex']),
  flexDirection: PropTypes.string,
  flexWrap: PropTypes.string,
  flexFlow: PropTypes.string,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  alignContent: PropTypes.string,

  /** Extra properties that are passed to the underlying [Block](#block) component. */
  props: PropTypes.object
};

export default Flex;
