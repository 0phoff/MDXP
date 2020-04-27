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
    body: 'system-ui, sans-serif'
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
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain'
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
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontWeights: {
    heading: 700
  },
  lineHeights: {
    heading: 1.125
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  text: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      textAlign: 'center'
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
    },
    code: {
      fontFamily: 'monospace'
    },
    pre: {
      fontFamily: 'monospace'
    },
    table: {
      fontSize: 'inherit',
      borderCollapse: 'collapse',
      borderStyle: 'hidden'
    },
    tr: {
      '& > :first-child': {paddingLeft: 0},
      '& > :last-child': {paddingRight: 0}
    },
    th: {
      fontWeight: 'bold',
      borderColor: 'inherit',
      borderStyle: 'solid',
      borderWidth: '0 0 2px 0',
      px: 3,
      py: 3
    },
    td: {
      borderColor: 'inherit',
      borderStyle: 'solid',
      borderWidth: '0 0 1px 0',
      px: 3,
      py: 2
    }
  }
};
export default defaultTheme;
