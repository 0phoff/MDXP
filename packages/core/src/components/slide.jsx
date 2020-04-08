/** @jsx jsx */
import {jsx} from 'theme-ui';
import React from 'react';


const Slide = ({children, sx={}, ...props}) => (
  <article
    sx={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      boxSizing: 'border-box',
      ...sx
    }}
    {...props}
  >
    {children}
  </article>
);
export default Slide;
