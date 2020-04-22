const isPOJO = o => (
  (Object(o) === o) && (Object.getPrototypeOf(o) === Object.prototype)
);

const mergeObjectOrArray = (a, b) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return [...a, ...b];
  }

  if ((Array.isArray(a) || isPOJO(a)) && (Array.isArray(b) || isPOJO(b))) {
    return {...a, ...b};
  }

  return b ? b : a;
};

export const mergeThemes = (...themes) => (
  themes.reduce(
    (accTheme, newTheme) => {
      const resTheme = {};
      const keys = new Set([...Object.keys(accTheme), ...Object.keys(newTheme)]);

      keys.forEach(key => {
        resTheme[key] = mergeObjectOrArray(accTheme[key], newTheme[key]);
      });

      return resTheme;
    },
    {}
  )
);

export const baseTheme = {
  colors: {
    text: '#000',
    background: '#FFF'
  },
  fonts: {
    body: 'system-ui, sans-serif',
    monospace: 'Menlo, monospace'
  },
  fontWeights: {
    body: 400
  },
  lineHeights: {
    body: 1.5
  },
  styles: {
    root: {
      fontFamily: 'system-ui, sans-serif'
    },
    img: {
      width: '100%',
      maxHeight: '100%',
      objectFit: 'contain'
    },
    code: {
      fontFamily: 'monospace'
    },
    pre: {
      fontFamily: 'monospace'
    },
    Slide: {
      fontFamily: 'body',
      fontSize: '1.5rem'
    }
  }
};

export const defaultTheme = {
  colors: {
    text: '#000',
    background: '#FFF',
    primary: '#CCC',
    secondary: '#555',
    accent: '#F9AC00',
    muted: '#888'
  },
  fonts: {
    heading: 'inherit'
  },
  fontWeights: {
    heading: 700
  },
  lineHeights: {
    heading: 1.125
  },
  text: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading'
    }
  },
  styles: {
    h1: {
      variant: 'text.heading',
      textTransform: 'uppercase'
    },
    h2: {
      variant: 'text.heading'
    },
    h3: {
      variant: 'text.heading'
    },
    h4: {
      variant: 'text.heading'
    },
    h5: {
      variant: 'text.heading'
    },
    h6: {
      variant: 'text.heading'
    }
  }
};
export default defaultTheme;
