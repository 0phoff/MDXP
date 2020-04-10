import React, {useReducer} from 'react';
import {ThemeProvider} from 'theme-ui';
import wrapper from './wrapper.jsx';
import DeckState from './deck-state.jsx';
import DeckMode from './deck-mode.jsx';
import defaultTheme from '../theme.js';
import DefaultLayout from './layouts/default.jsx';
import defaultComponents from './default-components.js';


const Deck = ({children, theme=defaultTheme, Layout=DefaultLayout, components={}, ...props}) => {
  return (
    <DeckState>
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
    </DeckState>
  );
};
export default Deck;
