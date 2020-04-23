/** @jsx jsx */
import {jsx} from 'theme-ui';
import PropTypes from 'prop-types';
import {setMDXPLayoutType} from '../util/mdxp-types.jsx';

/**
 * Default Layout Component
 * This is the component that is used as default layout,
 * if you do not choose your own Layout component option in your `Deck`.
 * See `Deck` for more information about the Layout option.
 */
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
  /** Theme-UI `sx` property that can be used to set and/or overwrite any styling of the layout div */
  sx: PropTypes.object,

  /** Additional props which will be added to the layout div */
  props: PropTypes.object
};

export default setMDXPLayoutType(DefaultLayout);
