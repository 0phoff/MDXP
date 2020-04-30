/** @jsx jsx */
import {jsx} from 'theme-ui';
import PropTypes from 'prop-types';
import MDXPTypes, {setMDXPType} from '@mdxp/core';

const BlankLayout = ({children, sx = {}, ...props}) => (
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
      '& p': {textAlign: 'center'},
      ...sx
    }}
    {...props}
  >
    {children}
  </div>
);

BlankLayout.propTypes = {
  /** Style that gets set to the layout div. This is set as a Theme-UI sx property and can thus accept theme aware values */
  sx: PropTypes.object,

  /** Extra properties that are set to the layout div. */
  props: PropTypes.object
};

export default setMDXPType(BlankLayout, MDXPTypes.LAYOUT);
