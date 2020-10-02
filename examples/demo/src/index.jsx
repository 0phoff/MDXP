/** @jsx jsx */
import {jsx} from 'theme-ui';
import ReactDOM from 'react-dom';
import Deck, {Zoom} from '@mdxp/core';
import * as components from '@mdxp/components';

import theme from './theme/theme.js';
import themeComponents from './theme/theme-components.js';

import './index.css';
import MDXPresentation from './presentation.mdx';

ReactDOM.render(
  <Zoom
    maxWidth={1000}
    width={1000}
    aspectRatio={16 / 9}
    sx={{maxWidth: '100vw', maxHeight: '100vh'}}
  >
    <Deck
      components={{...components, ...themeComponents}}
      Layout={themeComponents.MDXPHeaderLayout}
      layoutOptions={{showSlideNum: false}}
      theme={theme}
      keyboardTarget={window}
    >
      <MDXPresentation />
    </Deck>
  </Zoom>,
  document.getElementById('root')
);
