import React from 'react';
import ReactDOM from 'react-dom';
import Deck from '@MDXP/core';

import MDXPresentation from './presentation.mdx';

ReactDOM.render(
  <Deck>
    <MDXPresentation />
  </Deck>,
  document.getElementById('root')
);
