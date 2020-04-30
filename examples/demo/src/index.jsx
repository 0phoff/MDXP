/** @jsx jsx */
import {jsx} from 'theme-ui';
import ReactDOM from 'react-dom';
import Deck, {useDeck} from '@mdxp/core';
import {HeaderLayout} from '@mdxp/components';
import MDXPresentation from './presentation.mdx';

const Footer = () => {
  const {slideIndex} = useDeck();

  return (
    <div
      sx={{
        width: '100%',
        px: '5%',
        py: '10px',
        bg: 'secondary',
        color: 'background',
        textAlign: 'right',
        fontSize: '1.5em'
      }}
    >
      {slideIndex + 1}
    </div>
  );
};

ReactDOM.render(
  <Deck Layout={HeaderLayout} layoutOptions={{sxHeader: {width: '100%', bg: 'text', color: 'background'}, Footer}}>
    <MDXPresentation />
  </Deck>,
  document.getElementById('root')
);
