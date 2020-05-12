/** @jsx jsx */
import {jsx} from 'theme-ui';
import PropTypes from 'prop-types';
import {useRoot} from '@mdxp/core';
import cleanSx from '../util/clean-sx.js';
import getAsComponent from '../util/get-as-component.js';

const Block = ({
  children,
  as: Element = 'div',
  sx = {},
  width,
  height,
  bg,
  padding, p, px, py, pt, pb, pl, pr,
  margin, m, mx, my, mt, mb, ml, mr,
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
}) => {
  const {shortCodeComponents} = useRoot();
  Element = getAsComponent(Element, shortCodeComponents);

  return (
    <Element
      sx={cleanSx({
        width,
        height,
        bg,
        padding, p, px, py, pt, pb, pl, pr,
        margin, m, mx, my, mt, mb, ml, mr,
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
};

Block.propTypes = {
  /** Type of the surrounding styled block. HTML elements will be styled using theme-ui's `Styled.*` components. If you passed any components to your [Deck](/core-components#deck), you can access them by writing their name as a string. */
  as: PropTypes.elementType,

  /** You can style the block by giving an sx property. This is set as a Theme-UI sx property and can thus accept theme aware values. */
  sx: PropTypes.object,

  children: PropTypes.node,
  width: PropTypes.string,
  height: PropTypes.string,
  bg: PropTypes.string,

  /** You can also use the `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr` shortcuts. */
  padding: PropTypes.string,

  /** You can also use the `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` shortcuts. */
  margin: PropTypes.string,

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
