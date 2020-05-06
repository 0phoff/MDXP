/** @jsx jsx */
import React from 'react';
import {jsx} from 'theme-ui'
import {Link} from "gatsby";

const CTA = ({url, children, sx={}}) => (
<div style={{width:'100%', textAlign: 'center'}}>
  <Link
    to={url}
    sx={{
      backgroundColor: '#F9AC00',
      minWidth: '40%',
      color: 'white',
      py: '15px',
      px: '25px',
      margin: '10px',
      display: 'inline-block',
      borderRadius: '10px',
      fontSize: '30px',
      textTransform: 'uppercase',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      },
      ...sx
    }}
  >
    {children}
  </Link>
</div>
);

export default CTA;
