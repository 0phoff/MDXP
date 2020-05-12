/** @jsx jsx */
import {jsx} from 'theme-ui';
import PropTypes from 'prop-types';
import {useRoot} from '@mdxp/core';
import cleanSx from '../util/clean-sx.js';
import getAsComponent from '../util/get-as-component.js';

const Place = ({
  children,
  as: Element = 'div',
  sx = {},
  width,
  height,
  bg,
  top,
  bottom,
  left,
  right,
  ...props
}) => {
  const {shortCodeComponents} = useRoot();
  Element = getAsComponent(Element, shortCodeComponents);

  let centerX = false;
  let centerY = false;
  if (!top && !bottom) {
    top = '50%';
    bottom = 'auto';
    centerY = true;
  }
  if (!left && !right) {
    left = '50%';
    right = 'auto';
    centerX = true;
  }

  if (centerX && centerY) {
    sx = {transform: 'translate(-50%, -50%)', ...sx};
  } else if (centerX) {
    sx = {transform: 'translate(-50%, 0)', ...sx};
  } else if (centerY) {
    sx = {transform: 'translate(0, -50%)', ...sx};
  }

  return (
    <Element
      sx={cleanSx({
        position: 'absolute',
        width,
        height,
        bg,
        top,
        bottom,
        left,
        right,
        ...sx
      })}
      {...props}
    >
      {children}
    </Element>
  );
};

Place.propTypes = {
  /** Type of the surrounding styled block. HTML elements will be styled using theme-ui's `Styled.*` components. If you passed any components to your [Deck](/core-components#deck), you can access them by writing their name as a string. */
  as: PropTypes.elementType,

  /** You can style the block by giving an sx property. This is set as a Theme-UI sx property and can thus accept theme aware values. */
  sx: PropTypes.object,

  children: PropTypes.node,
  width: PropTypes.any,
  height: PropTypes.any,
  bg: PropTypes.any,
  top: PropTypes.any,
  bottom: PropTypes.any,
  left: PropTypes.any,
  right: PropTypes.any,

  /** Extra properties that are set to the surrounding element. */
  props: PropTypes.object
};

export default Place;
