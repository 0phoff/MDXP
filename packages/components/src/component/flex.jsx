import React from 'react';
import PropTypes from 'prop-types';
import {useThemeUI} from 'theme-ui';
import Block from './block.jsx';

const Flex = ({
  children,
  sx = {},
  variant,
  display,
  width,
  height,
  flexDirection,
  flexWrap,
  flexFlow,
  justifyContent,
  alignItems,
  alignContent,
  ...props
}) => {
  const {theme} = useThemeUI();

  // Setup variant
  let variantValue = {};
  if ((typeof variant === 'string' || variant instanceof String)) {
    variant = 'mdxp.flex.' + variant;
    variantValue = variant.split('.').reduce((acc, val => acc?.[val]), theme) || {};
  }
  if (sx.variant && (typeof sx.variant === 'string' || sx.variant instanceof String)) {
    variantValue = sx.variant.split('.').reduce((acc, val => acc?.[val]), theme) || {};
  }

  // Default values
  display = display ?? variantValue.display ?? 'flex';
  width = width ?? variantValue.width ?? '100%';

  return (
    <Block
      sx={{
        variant,
        display,
        width,
        height,
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
};

Flex.propTypes = {
  /** You can style the block by giving an sx property. This is set as a Theme-UI sx property and can thus accept theme aware values. */
  sx: PropTypes.object,
  children: PropTypes.node,

  /** Variant from 'mdxp.flex.' */
  variant: PropTypes.string,

  /** Defaults to 'flex' if nothing is passed. */
  display: PropTypes.oneOf(['flex', 'inline-flex']),

  /** Defaults to '100%' if nothing is passed. */
  width: PropTypes.any,
  height: PropTypes.any,
  flexDirection: PropTypes.any,
  flexWrap: PropTypes.any,
  flexFlow: PropTypes.any,
  justifyContent: PropTypes.any,
  alignItems: PropTypes.any,
  alignContent: PropTypes.any,

  /** Extra properties that are passed to the underlying [Block](#block) component. */
  props: PropTypes.object
};

export default Flex;
