/** @jsx jsx */
import {jsx} from 'theme-ui';
import React from 'react';
import {setLayoutType} from '@MDXP/core';


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
      '& > p': {textAlign: 'center'},
      ...sx
    }}
    {...props}
  >
    <div sx={{height: '10vh', width: '100vw', bg: 'red'}}></div>
    {children}
  </div>
);
export default setLayoutType(DummyLayout);
