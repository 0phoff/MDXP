import React from 'react';
import {Block} from '@mdxp/components';

const Card = ({children, sx = {}, ...props}) => (
  <Block
    sx={{
      p: 2,
      boxShadow: '4px 4px 4px rgba(51, 51, 51, 0.25)',
      width: '100%',
      '& > *': {m: 0, p: 0},
      ...sx
    }}
    {...props}
  >
    {children}
  </Block>
);

export default Card;
