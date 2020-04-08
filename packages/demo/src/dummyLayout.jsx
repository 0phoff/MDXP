/** @jsx jsx */
import {jsx} from 'theme-ui';
import React from 'react';
import {setLayoutComponent} from '@mdx-presenter/core';


const DummyLayout = ({children, sx={}, ...props}) => (
  <div
    sx={{
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'text',
      bg: 'background',
      ...sx
    }}
    {...props}
  >
    <div sx={{height: '10vh', width: '100vw', bg: 'rgba(255, 0, 0, 0.5)'}}></div>
    {children}
  </div>
);
export default setLayoutComponent(DummyLayout);
