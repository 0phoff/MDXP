/** @jsx jsx */
import {jsx} from 'theme-ui';
import ReactDOM from 'react-dom';
import Deck from '@mdxp/core';
import components from '@mdxp/components';

import ZoomBox from './zoom-box.jsx';
import theme from './theme/theme.js';
import themeComponents  from './theme/theme-components.js';
import MDXPresentation from './presentation.mdx';

ReactDOM.render(
  <ZoomBox>
    <Deck
      components={{...components, ...themeComponents}}
      Layout={themeComponents.MDXPHeaderLayout}
      layoutOptions={{showSlideNum: false}}
      theme={theme}
      keyboardTarget={window}
    >
      <MDXPresentation />
    </Deck>
  </ZoomBox>,
  document.getElementById('root')
);
