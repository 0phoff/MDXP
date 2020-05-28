/** @jsx jsx */
import {jsx} from 'theme-ui';
import React, {useState, useEffect, useRef} from 'react';

const isNumber = value => (value !== null) && !isNaN(value);


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
  sx={},
  ...props
}) => {
  const wrapperElement = useRef();
  const scaleElement = useRef();

  const updateScale = () => {
    let targetWidth = width;
    let targetHeight = height;
    if (sizeReference && sizeReference.current) {
      if (!isNumber(targetWidth)) {
        targetWidth = 1;
      }
      if (!isNumber(targetHeight)) {
        targetHeight = 1;
      }

      targetWidth *= sizeReference.current.offsetWidth;
      if (isNumber(aspectRatio)) {
        targetHeight = targetWidth / aspectRatio;
      } else {
        targetHeight *= sizeReference.current.offsetHeight;
      }
    } else if (!isNumber(targetWidth) && !isNumber(targetHeight)) {
      targetWidth = window.innerWidth;
      if (isNumber(aspectRatio)) {
        targetHeight = targetWidth / aspectRatio;
      } else {
        targetHeight = window.innerHeight;
      }
    } else if (!isNumber(targetWidth)) {
      if (isNumber(aspectRatio)) {
        targetWidth = targetHeight * aspectRatio;
      } else {
        targetWidth = window.innerWidth;
      }
    } else if (!isNumber(targetHeight)) {
      if (isNumber(aspectRatio)) {
        targetHeight = width / aspectRatio;
      } else {
        targetHeight = window.innerHeight;
      }
    }
    
    if (wrapperElement.current && scaleElement.current) {
      scaleElement.current.style.width = `${targetWidth}px`;
      scaleElement.current.style.height = `${targetHeight}px`;

      if (
        (!isNumber(maxWidth) && !isNumber(maxHeight)) ||
        (isNumber(maxWidth) && (wrapperElement.current.offsetWidth <= maxWidth)) ||
        (isNumber(maxHeight) && (wrapperElement.current.offsetHeight <= maxHeight))
      ) {
        
        let scale;
        if (scaleOn === 'width') {
          scale = (wrapperElement.current.offsetWidth) / targetWidth;
          wrapperElement.current.style.height = `${targetHeight * scale}px`
        } else if (scaleOn === 'height') {
          scale = (wrapperElement.current.offsetHeight) / targetHeight;
          wrapperElement.current.style.width = `${targetWidth * scale}px`
        } else {
          scale = Math.min( 
            (wrapperElement.current.offsetWidth) / targetWidth, 
            (wrapperElement.current.offsetHeight) / targetHeight
          );
        }

        let offsetX = 0;
        switch(alignX) {
          case 'center':
            offsetX = Math.max(0, wrapperElement.current.offsetWidth - (scale * targetWidth)) / 2;
            break;

          case 'right':
            offsetX = Math.max(0, wrapperElement.current.offsetWidth - (scale * targetWidth));
            break;
        }

        let offsetY = 0;
        switch(alignX) {
          case 'center':
            offsetY = Math.max(0, wrapperElement.current.offsetHeight - (scale * targetHeight)) / 2;
            break;

          case 'bottom':
            offsetY = Math.max(0, wrapperElement.current.offsetHeight - (scale * targetHeight));
            break;
        }

        scaleElement.current.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`
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
      sx={{
        overflow: 'hidden',
        ...sx
      }}
      {...props}
    > 
      <div
        ref={scaleElement}
        sx={{
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          transformOrigin: '0 0',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Zoom;
