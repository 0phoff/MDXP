import React from 'react';
import PropTypes from 'prop-types';
import {useThemeUI} from 'theme-ui';
import Block from './block.jsx';

const Grid = ({
  children,
  sx = {},
  variant,
  display,
  width,
  height,
  grid,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridTemplate,
  gridColumnGap,
  gridRowGap,
  gridGap,
  justifyItems,
  alignItems,
  placeItems,
  justifyContent,
  alignContent,
  placeContent,
  gridAutoColumns,
  gridAutoRows,
  gridAutoFlow,
  ...props
}) => {
  const {theme} = useThemeUI();

  // Setup variant
  let variantValue = {};
  if ((typeof variant === 'string' || variant instanceof String)) {
    variant = 'mdxp.grid.' + variant;
    variantValue = variant.split('.').reduce((acc, val) => acc?.[val], theme) || {};
  }

  if (sx.variant && (typeof sx.variant === 'string' || sx.variant instanceof String)) {
    variantValue = sx.variant.split('.').reduce((acc, val) => acc?.[val], theme) || {};
  }

  // Default values
  display = display ?? variantValue.display ?? 'grid';
  width = width ?? variantValue.width ?? '100%';
  height = height ?? variantValue.height ?? '100%';

  if (Array.isArray(gridTemplateAreas)) {
    gridTemplateAreas = '"' + gridTemplateAreas.join('" "') + '"';
  } else if (gridTemplateAreas && !gridTemplateAreas.match(/^['"].*['"]$/)) {
    gridTemplateAreas = '"' + gridTemplateAreas + '"';
  }

  return (
    <Block
      sx={{
        variant,
        display,
        width,
        height,
        grid,
        gridTemplateColumns,
        gridTemplateRows,
        gridTemplateAreas,
        gridTemplate,
        gridColumnGap,
        gridRowGap,
        gridGap,
        justifyItems,
        alignItems,
        placeItems,
        justifyContent,
        alignContent,
        placeContent,
        gridAutoColumns,
        gridAutoRows,
        gridAutoFlow,
        ...sx
      }}
      {...props}
    >
      {children}
    </Block>
  );
};

Grid.propTypes = {
  /** You can style the block by giving an sx property. This is set as a Theme-UI sx property and can thus accept theme aware values. */
  sx: PropTypes.object,
  children: PropTypes.node,

  /** Variant from 'mdxp.grid.' */
  variant: PropTypes.string,

  /** Defaults to 'grid' if nothing is passed. */
  display: PropTypes.oneOf(['grid', 'inline-grid']),

  /** Defaults to '100%' if nothing is passed. */
  width: PropTypes.any,

  /** Defaults to '100%' if nothing is passed. */
  height: PropTypes.any,
  grid: PropTypes.any,
  gridTemplateColumns: PropTypes.any,
  gridTemplateRows: PropTypes.any,

  /** If you give an array of strings, they will be considered as different rows and thus joined by surrounding each item within double quotes. */
  gridTemplateAreas: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),

  gridTemplate: PropTypes.any,
  gridColumnGap: PropTypes.any,
  gridRowGap: PropTypes.any,
  gridGap: PropTypes.any,
  justifyItems: PropTypes.any,
  alignItems: PropTypes.any,
  placeItems: PropTypes.any,
  justifyContent: PropTypes.any,
  alignContent: PropTypes.any,
  placeContent: PropTypes.any,
  gridAutoColumns: PropTypes.any,
  gridAutoRows: PropTypes.any,
  gridAutoFlow: PropTypes.any,

  /** Extra properties that are passed to the underlying [Block](#block) component. */
  props: PropTypes.object
};

export default Grid;
