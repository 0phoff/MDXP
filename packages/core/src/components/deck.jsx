import React  from 'react';
import PropTypes from 'prop-types';
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

Deck.propTypes = {
  /** Theme-UI theme object. */
  theme: PropTypes.object,

  /** Component that gets used as a default layout, when a slide is not wrapped inside an own layout component. */
  Layout: PropTypes.elementType,

  /** The elements inside this object get passed to MDXProvider and allow you to specify components, so that you do not need to import them in your presentations. */
  components: PropTypes.objectOf(PropTypes.elementType),
  
  /** Additional props which will be passed to the main Router of the Deck. */
  props: PropTypes.object,
};

export default Deck;
