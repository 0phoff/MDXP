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
  grid: PropTypes.string,
  gridTemplateColumns: PropTypes.string,
  gridTemplateRows: PropTypes.string,

  /** If you give an array of strings, they will be considered as different rows and thus joined by surrounding each item within double quotes. */
  gridTemplateAreas: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  gridTemplate: PropTypes.string,
  gridColumnGap: PropTypes.string,
  gridRowGap: PropTypes.string,
  gridGap: PropTypes.string,
  justifyItems: PropTypes.string,
  alignItems: PropTypes.string,
  placeItems: PropTypes.string,
  justifyContent: PropTypes.string,
  alignContent: PropTypes.string,
  placeContent: PropTypes.string,
  gridAutoColumns: PropTypes.string,
  gridAutoRows: PropTypes.string,
  gridAutoFlow: PropTypes.string,

  /** Extra properties that are passed to the underlying [Block](#block) component. */
  props: PropTypes.object
};

export default Grid;
