/** @jsx jsx */
import {jsx} from 'theme-ui';
import {useLayoutEffect, useRef, useState} from 'react';

const ZoomBox = ({children}) => {
  const [alert, setAlert] = useState(false);
  const [zoom, setZoom] = useState(false);
  const wrapper = useRef();
  const scaleElement = useRef();

  const updateScale = () => {
    if (window.innerWidth <= 1000) {
      setZoom(true);
      if (wrapper.current && scaleElement.current) {
        const scale = Math.min( 
          (wrapper.current.offsetWidth) / scaleElement.current.offsetWidth, 
          (wrapper.current.offsetHeight) / scaleElement.current.offsetHeight 
        );
        scaleElement.current.style = `transform: scale(${scale})`
      }
    } else {
      setZoom(false);
    }
  };

  useLayoutEffect(() => {
    if (window.innerWidth <= 1000) {
      updateScale();
      if (!alert) {
        window.alert('MDXP is presentation software and is thus not optimised for small displays. While it is possible to go through this slide deck, it is highly recommended to view it on a bigger display.');
      }
    }
    
    setAlert(true);
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [zoom, alert]);

  if (zoom) {
    return (
      <div
        ref={wrapper}
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          overflow: 'hidden',
        }}
      >
        <div
          ref={scaleElement}
          sx={{
            boxSizing: 'border-box',
            position: 'absolute',
            overflow: 'hidden',
            width: '1000px',
            height: '560px',
            transformOrigin: '0 0',
          }}
        >
          {children}
        </div>
      </div>
    );
  } else {
    return (
      <div
        sx={{
          width: '100vw',
          height: '100vh'
        }}
      >
        {children}
      </div>
    );
  }
};

export default ZoomBox;
