/** @jsx jsx */
import {jsx} from 'theme-ui';
import PropTypes from 'prop-types';
import cleanSx from '../util/clean-sx.js';

const Block = ({
  children,
  as: Element = 'div',
  sx = {},
  width,
  height,
  order,
  flexGrow,
  flexShrink,
  flexBasis,
  flex,
  alignSelf,
  gridColumnStart,
  gridColumnEnd,
  gridRowStart,
  gridRowEnd,
  gridColumn,
  gridRow,
  gridArea,
  justifySelf,
  placeSelf
}) => (
  <Element
    sx={cleanSx({
      width,
      height,
      order,
      flexGrow,
      flexShrink,
      flexBasis,
      flex,
      alignSelf,
      gridColumnStart,
      gridColumnEnd,
      gridRowStart,
      gridRowEnd,
      gridColumn,
      gridRow,
      gridArea,
      justifySelf,
      placeSelf,
      ...sx,
    })}
  >
    {children}
  </Element>
);

Block.propTypes = {
  /** Type of the surrounding styled block. */
  as: PropTypes.elementType,

  /** You can style the block by giving an sx property. This is set as a Theme-UI sx property and can thus accept theme aware values. */
  sx: PropTypes.object,

  children: PropTypes.node,
  width: PropTypes.string,
  height: PropTypes.string,
  order: PropTypes.string,
  flexGrow: PropTypes.string,
  flexShrink: PropTypes.string,
  flexBasis: PropTypes.string,
  flex: PropTypes.string,
  alignSelf: PropTypes.string,
  gridColumnStart: PropTypes.string,
  gridColumnEnd: PropTypes.string,
  gridRowStart: PropTypes.string,
  gridRowEnd: PropTypes.string,
  gridColumn: PropTypes.string,
  gridRow: PropTypes.string,
  gridArea: PropTypes.string,
  justifySelf: PropTypes.string,
  placeSelf: PropTypes.string,
};

export default Block;
