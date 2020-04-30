import React from 'react';
import PropTypes from 'prop-types';
import {useThemeUI} from 'theme-ui';
import {ThemeProvider} from 'theme-ui';
import {MDXPTypes, setMDXPType} from '@mdxp/core';

const InvertWrapper = ({children}) => {
  const {theme} = useThemeUI();

  return (
    <ThemeProvider theme={{colors: {background: theme.colors.text, text: theme.colors.background}}}>
      {children}
    </ThemeProvider>
  );
};

InvertWrapper.propTypes = {
  children: PropTypes.node
};

export default setMDXPType(InvertWrapper, MDXPTypes.WRAPPER);
export {InvertWrapper as _InvertWrapper};
