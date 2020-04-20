import React  from 'react';
import {ThemeProvider} from 'theme-ui';
import {Helmet} from 'react-helmet';
import wrapper from './wrapper.jsx';
import defaultTheme, {baseTheme, mergeThemes} from '../util/theme.js';
import DefaultLayout from './default-layout.jsx';
import defaultComponents from './default-components.js';


const GoogleFont = ({theme}) => {
  if (!theme.googleFont) {
    return false;
  }

  const {googleFont} = theme;
  if (Array.isArray(googleFont)) {
    return (
      <Helmet>
        {googleFont.map((font) => (<link rel="stylesheet" href={font} />))}
      </Helmet>
    );
  }
  else {
    return (
      <Helmet>
        <link rel="stylesheet" href={googleFont} />
      </Helmet>
    );
  }
}


/**
 * TODO
 */
const Deck = ({children, theme=defaultTheme, Layout=DefaultLayout, components={}, ...props}) => {
  if (Array.isArray(theme)) {
    theme = mergeThemes(baseTheme, ...theme);
  }
  else {
    theme = mergeThemes(baseTheme, theme);
  }

  return (
    <React.Fragment>
      <GoogleFont theme={theme} />

      <ThemeProvider
        theme={theme}
        components={{
          ...defaultComponents,
          DefaultLayout: Layout,
          ...components,
          wrapper: wrapper(Layout, props),
        }}
      >
        {children}
      </ThemeProvider>
    </React.Fragment>
  );
};
export default Deck;
