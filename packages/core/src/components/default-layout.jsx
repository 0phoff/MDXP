/** @jsx jsx */
import {jsx} from 'theme-ui';
import PropTypes from 'prop-types';
import MDXPTypes from '../util/mdxp-types.js';
import {setMDXPType} from '../util/mdxp-type-util.jsx';

const DefaultLayout = ({children, sx = {}, ...props}) => (
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

DefaultLayout.propTypes = {
  sx: PropTypes.object,
  props: PropTypes.object
};

export default setMDXPType(DefaultLayout, MDXPTypes.LAYOUT);
