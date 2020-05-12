import React from 'react';
import PropTypes from 'prop-types';
import Block from './block.jsx';

const Grid = ({
  children,
  sx = {},
  width = '100%',
  height = '100%',
  display = 'grid',
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
  if (Array.isArray(gridTemplateAreas)) {
    gridTemplateAreas = '"' + gridTemplateAreas.join('" "') + '"';
  } else if (gridTemplateAreas && !gridTemplateAreas.match(/^['"].*['"]$/)) {
    gridTemplateAreas = '"' + gridTemplateAreas + '"';
  }

  return (
    <Block
      sx={{
        width,
        height,
        display,
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
        ...sx,
      }}
      {...props}
    >
      {children}
    </Block>
  );
};

Grid.propTypes = {
  /** Type of the surrounding grid block. */
  as: PropTypes.elementType,

  /** You can style the block by giving an sx property. This is set as a Theme-UI sx property and can thus accept theme aware values. */
  sx: PropTypes.object,

  children: PropTypes.node,
  display: PropTypes.oneOf(['grid', 'inline-grid']),
  grid: PropTypes.any,
  gridTemplateColumns: PropTypes.any,
  gridTemplateRows: PropTypes.any,

  /** If you give an array of strings, they will be considered as different rows and thus joined by surrounding each item within double quotes. */
  gridTemplateAreas: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
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
