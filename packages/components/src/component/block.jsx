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
  variant,
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
  ...props
}) => {
  const {shortCodeComponents} = useRoot();
  Element = getAsComponent(Element, shortCodeComponents);

  if ((typeof variant === 'string' || variant instanceof String)) {
    variant = 'mdxp.block.' + variant;
  }

  return (
    <Element
      sx={cleanSx({
        variant,
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
      {...props}
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

  /** Variant from 'mdxp.block.' */
  variant: PropTypes.string,
  width: PropTypes.any,
  height: PropTypes.any,
  bg: PropTypes.any,

  /** You can also use the `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr` shortcuts. */
  padding: PropTypes.any,

  /** You can also use the `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` shortcuts. */
  margin: PropTypes.any,

  order: PropTypes.any,
  flexGrow: PropTypes.any,
  flexShrink: PropTypes.any,
  flexBasis: PropTypes.any,
  flex: PropTypes.any,
  alignSelf: PropTypes.any,
  gridColumnStart: PropTypes.any,
  gridColumnEnd: PropTypes.any,
  gridRowStart: PropTypes.any,
  gridRowEnd: PropTypes.any,
  gridColumn: PropTypes.any,
  gridRow: PropTypes.any,
  gridArea: PropTypes.any,
  justifySelf: PropTypes.any,
  placeSelf: PropTypes.any,

  /** Extra properties that are added to the element. */
  props: PropTypes.object,
};

export default Block;
