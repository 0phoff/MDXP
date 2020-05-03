/** @jsx jsx */
import {jsx} from 'theme-ui';
import PropTypes from 'prop-types';

const Place = ({children, top, bottom, left, right, sx = {}, ...props}) => {
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
    <div
      sx={{
        position: 'absolute',
        top,
        bottom,
        left,
        right,
        ...sx
      }}
      {...props}
    >
      {children}
    </div>
  );
};

Place.propTypes = {
  /** CSS top property for the surrounding div. This is set as a Theme-UI sx property and can thus accept theme aware values. */
  top: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func
  ]),

  /** CSS bottom property for the surrounding div. This is set as a Theme-UI sx property and can thus accept theme aware values. */
  bottom: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func
  ]),

  /** CSS left property for the surrounding div. This is set as a Theme-UI sx property and can thus accept theme aware values. */
  left: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func
  ]),

  /** CSS right property for the surrounding div. This is set as a Theme-UI sx property and can thus accept theme aware values. */
  right: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func
  ]),

  /** Additional styles that get applied to the surrounding div. */
  sx: PropTypes.object,

  children: PropTypes.node
};

export default Place;
