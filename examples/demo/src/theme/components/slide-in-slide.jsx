/** @jsx jsx */
import {useRef, useLayoutEffect} from 'react';
import {jsx} from 'theme-ui';
import {BlankLayout} from '@mdxp/components';

const updateScale = (wrapper, element) => () => {
  const scale = Math.min( 
    (wrapper.offsetWidth) / element.offsetWidth, 
    (wrapper.offsetHeight) / element.offsetHeight 
  );

  element.style = `transform: scale(${scale})`
};

const SlideInSlide = ({children, sx={}}) => {
  const wrapper = useRef();
  const scaleElement = useRef();

  useLayoutEffect(() => {
    if (wrapper.current && scaleElement.current) {
      const updater = updateScale(wrapper.current, scaleElement.current);
      updater();
      window.addEventListener('resize', updater);
      return () => window.removeEventListener('resize', updater);
    }
  }, [wrapper, scaleElement]);

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
