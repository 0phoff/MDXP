/** @jsx jsx */
import {jsx} from 'theme-ui';
import ReactDOM from 'react-dom';
import Deck from '@mdxp/core';
import * as components from '@mdxp/components';
import MDXPresentation from './presentation.mdx';

ReactDOM.render(
  <Deck components={components}>
    <MDXPresentation />
  </Deck>,
  document.getElementById('root')
);
