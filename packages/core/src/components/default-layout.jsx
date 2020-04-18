/** @jsx jsx */
import {jsx} from 'theme-ui';
import React from 'react';
import {setLayoutType} from '../util/mdxp-types.jsx';


const DefaultLayout = ({children, sx={}, ...props}) => (
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
    {children}
  </div>
);
export default setLayoutType(DefaultLayout);
