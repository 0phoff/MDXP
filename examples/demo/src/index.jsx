import React from 'react';
import ReactDOM from 'react-dom';
import Deck from '@mdxp/core';

import MDXPresentation from './presentation.mdx';

ReactDOM.render(
  <Deck>
    <MDXPresentation />
  </Deck>,
  document.getElementById('root')
);
