import React from 'react';
import PropTypes from 'prop-types';
import {ThemeProvider} from 'theme-ui';
import {MDXPTypes, setMDXPType} from '@mdxp/core';

const ThemeWrapper = ({newTheme, children}) => (
  <ThemeProvider theme={newTheme}>
    {children}
  </ThemeProvider>
);

ThemeWrapper.propTypes = {
  /** New theme that gets merged into the existing theme. Use a functional theme to avoid deep merging the themes. */
  newTheme: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]).isRequired,

  children: PropTypes.node
};

export default setMDXPType(ThemeWrapper, MDXPTypes.WRAPPER);
export {ThemeWrapper as _ThemeWrapper};
