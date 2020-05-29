import React from 'react';
import PropTypes from 'prop-types';
import {ThemeProvider, merge} from 'theme-ui';
import {Helmet} from 'react-helmet';
import wrapper from './wrapper.jsx';
import {defaultTheme, baseTheme} from '../util/theme.js';
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
        {googleFont.map((font, i) => (<link rel="stylesheet" href={font} key={i} />))}
      </Helmet>
    );
  }

  return (
    <Helmet>
      <link rel="stylesheet" href={googleFont} />
    </Helmet>
  );
};

const Deck = ({
  children,
  theme = defaultTheme,
  Layout = DefaultLayout,
  layoutOptions = {},
  components = {},
  keyboardTarget,
  touchTarget,
  slideNavigation=true,
  modeNavigation=true,
  ...props
}) => {
  // Setup theme
  if (Array.isArray(theme)) {
    theme = merge(baseTheme, ...theme);
  } else {
    theme = merge(baseTheme, theme);
  }

  // Setup default layout
  const DefaultLayoutWrapper = props => {
    props = {...layoutOptions, ...props}; // Shallow merging!
    return (<Layout {...props} />);
  };

  return (
    <React.Fragment>
      <GoogleFont theme={theme} />

      <ThemeProvider
        theme={theme}
        components={{
          ...defaultComponents,
          DefaultLayout: DefaultLayoutWrapper,
          ...components,
          wrapper: wrapper(
            DefaultLayoutWrapper,
            {...props, keyboardTarget, touchTarget, slideNavigation, modeNavigation}
          )
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

  /** Options that are passed to the default layout component. */
  layoutOptions: PropTypes.object,

  /** The elements inside this object get passed to MDXProvider and allow you to specify components, so that you do not need to import them in your presentations. */
  components: PropTypes.objectOf(PropTypes.elementType),

  /** Target for all keyboard event handlers. Defaults to the surrounding div. */
  keyboardTarget: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]),

  /** Target for all touch event handlers. Defaults to the surrounding div. */
  touchTarget: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]),

  /** Whether or not you want to be able to navigate through the slides with the keyboard and touch actions. */
  slideNavigation: PropTypes.bool,

  /** Whether or not you want to be able to change modes with the keyboard and touch actions. */
  modeNavigation: PropTypes.bool,

  /** Additional props which will be passed to the main Router of the Deck. */
  props: PropTypes.object,

  children: PropTypes.node.isRequired
};

export default Deck;
