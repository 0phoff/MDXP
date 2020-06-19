/** @jsx jsx */
import {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {jsx} from 'theme-ui';

const isNumber = value => (value !== null) && !isNaN(value);

const getTargetSize = (ref, width, height, aspectRatio) => {
  if (ref && ref.current) {
    width = isNumber(width) ? (width * ref.current.offsetWidth) : ref.current.offsetWidth;
    if (isNumber(aspectRatio)) {
      height = width / aspectRatio;
    } else {
      height = isNumber(height) ? (height * ref.current.offsetHeight) : ref.current.offsetHeight;
    }
  } else if (!isNumber(width) && !isNumber(height)) {
    width = window.innerWidth;
    height = isNumber(aspectRatio) ? (width / aspectRatio) : window.innerHeight;
  } else if (!isNumber(width)) {
    width = isNumber(aspectRatio) ? (height * aspectRatio) : window.innerWidth;
  } else if (!isNumber(height)) {
    height = isNumber(aspectRatio) ? (width / aspectRatio) : window.innerHeight;
  }

  return [width, height];
};

const Zoom = ({
  children,
  width,
  height,
  aspectRatio,
  sizeReference,
  alignX = 'left',
  alignY = 'top',
  scaleOn = 'both',
  maxWidth,
  maxHeight,
  sx = {},
  ...props
}) => {
  const wrapperElement = useRef();
  const scaleElement = useRef();

  const updateScale = () => {
    if (wrapperElement.current && scaleElement.current) {
      if (
        (!isNumber(maxWidth) && !isNumber(maxHeight)) ||
        (isNumber(maxWidth) && (wrapperElement.current.offsetWidth <= maxWidth)) ||
        (isNumber(maxHeight) && (wrapperElement.current.offsetHeight <= maxHeight))
      ) {
        const [targetWidth, targetHeight] = getTargetSize(sizeReference, width, height, aspectRatio);

        let scale;
        if (scaleOn === 'width') {
          scale = (wrapperElement.current.offsetWidth) / targetWidth;
          wrapperElement.current.style.height = `${targetHeight * scale}px`;
        } else if (scaleOn === 'height') {
          scale = (wrapperElement.current.offsetHeight) / targetHeight;
          wrapperElement.current.style.width = `${targetWidth * scale}px`;
        } else {
          scale = Math.min(
            (wrapperElement.current.offsetWidth) / targetWidth,
            (wrapperElement.current.offsetHeight) / targetHeight
          );
        }

        let offsetX = 0;
        if (alignX === 'center') {
          offsetX = Math.max(0, wrapperElement.current.offsetWidth - (scale * targetWidth)) / 2;
        } else if (alignX === 'right') {
          offsetX = Math.max(0, wrapperElement.current.offsetWidth - (scale * targetWidth));
        }

        let offsetY = 0;
        if (alignY === 'center') {
          offsetY = Math.max(0, wrapperElement.current.offsetHeight - (scale * targetHeight)) / 2;
        } else if (alignY === 'bottom') {
          offsetY = Math.max(0, wrapperElement.current.offsetHeight - (scale * targetHeight));
        }

        scaleElement.current.style.width = `${targetWidth}px`;
        scaleElement.current.style.height = `${targetHeight}px`;
        scaleElement.current.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
      } else {
        scaleElement.current.style.width = null;
        scaleElement.current.style.height = null;
        scaleElement.current.style.transform = null;
      }
    }
  };

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [sizeReference, width, height, aspectRatio, alignX, alignY, scaleOn, maxWidth, maxHeight]);

  return (
    <div
      ref={wrapperElement}
      sx={sx}
      {...props}
    >
      <div
        ref={scaleElement}
        sx={{
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          transformOrigin: '0 0'
        }}
      >
        {children}
      </div>
    </div>
  );
};

Zoom.propTypes = {
  /** Target width for the inner content. */
  width: PropTypes.number,

  /** Target width for the inner content. */
  height: PropTypes.number,

  /** Instead of giving a width and height, one can give a width and aspectRatio or height and aspectRatio. */
  aspectRatio: PropTypes.number,

  /** If given, the target width/height is multiplied with this element's size. */
  sizeReference: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({current: PropTypes.any})
  ]),

  /** How to align the inner content. */
  alignX: PropTypes.oneOf(['left', 'center', 'right']),

  /** How to align the inner content. */
  alignY: PropTypes.oneOf(['top', 'center', 'bottom']),

  /** Whether to only consider the width/height when deciding whether to scale the content. */
  scaleOn: PropTypes.oneOf(['width', 'height', 'both']),

  /** If defined, the wrapper width must be smaller than this number for the scaling to take effect. */
  maxWidth: PropTypes.number,

  /** If defined, the wrapper height must be smaller than this number for the scaling to take effect. */
  maxHeight: PropTypes.number,

  /** You can style the surrounding div by giving an sx property. This is set as a Theme-UI sx property and can thus accept theme aware values. */
  sx: PropTypes.object,

  /** Additional props which will be set to a surrounding div. */
  props: PropTypes.object,

  children: PropTypes.node
};

export default Zoom;
