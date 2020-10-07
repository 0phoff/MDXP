/** @jsx jsx */
import {useRef, useLayoutEffect} from 'react';
import {jsx} from 'theme-ui';
import {useResizeObserver} from '@mdxp/core';

const SlideInSlide = ({children, sx = {}}) => {
  const [wrapper, wrapperWidth, wrapperHeight] = useResizeObserver();
  const scaleElement = useRef();

  useLayoutEffect(() => {
    if (wrapperWidth && wrapperHeight && scaleElement.current) {
      const scale = Math.min(
        wrapperWidth / scaleElement.current.offsetWidth,
        wrapperHeight / scaleElement.current.offsetHeight
      );
      scaleElement.current.style = `transform: scale(${scale})`;
    }
  }, [wrapperWidth, wrapperHeight, scaleElement]);

  return (
    <div
      sx={{
        width: '100%',
        paddingBottom: '56.25%',
        height: '0',
        position: 'relative'
      }}
    >
      <div
        ref={wrapper}
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflow: 'hidden'
        }}
      >
        <div
          ref={scaleElement}
          sx={{
            boxSizing: 'border-box',
            position: 'absolute',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text',
            bg: 'white',
            width: '960px',
            height: '540px',
            transformOrigin: '0 0',
            '& p': {textAlign: 'center', mt: 0},
            '& h1': {mb: 0},
            ...sx
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default SlideInSlide;
