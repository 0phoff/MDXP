/** @jsx jsx */
import {jsx, Styled} from 'theme-ui';

const ExampleLink = ({text, link, codeLink}) => (
  <Styled.p>
    <Styled.a
      href={link}
      target="_blank"
    >
      {text}
    </Styled.a>
    &nbsp;&nbsp;&nbsp;
    {codeLink &&
      <Styled.a
        href={codeLink}
        target="_blank"
        sx={{
          fontSize: 2,
          color: 'rgb(249, 172, 0)',
          textTransform: 'lowercase',
          fontVariant: 'small-caps',
        }}
      >
        (Code)
      </Styled.a>
    }
  </Styled.p>
);

export default ExampleLink;
