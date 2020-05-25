export const baseTheme = {
  colors: {
    text: '#000',
    background: '#FFF'
  },
  fonts: {
    // Github default font stack
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
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
      objectFit: 'contain'
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit'
      }
    }
  },
  mdxp: {
    slide: {
      fontFamily: 'body',
      fontSize: '1.5rem'
    },
    presenter: {
      fontSize: '1.5rem',
      background: 'black',
      color: 'white',
    },
    notes: {
      
    },
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
      variant: 'text.heading'
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
    inlineCode: {
      fontFamily: 'monospace',
      color: 'accent'
    },
    table: {
      color: 'text',
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
