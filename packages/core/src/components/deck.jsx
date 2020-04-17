import React  from 'react';
import {ThemeProvider} from 'theme-ui';
import wrapper from './wrapper.jsx';
import defaultTheme from '../util/theme.js';
import DefaultLayout from './default-layout.jsx';
import defaultComponents from './default-components.js';


const Deck = ({children, theme=defaultTheme, Layout=DefaultLayout, components={}, ...props}) => {
  return (
    <ThemeProvider
      theme={theme}
      components={{
        ...components,
        ...defaultComponents,
        DefaultLayout: Layout,
        wrapper: wrapper(Layout, props),
      }}
    >
      {children}
    </ThemeProvider>
  );
};
export default Deck;
