/** @jsx jsx */
import {jsx, Styled} from 'theme-ui';

const ExampleLink = ({children, text, link, codeLink}) => (
  <div sx={{pb: [3, 4, 5]}}>
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
    <div sx={{px: [1, 2, 3]}}>
      {children}
    </div>
  </div>
);

export default ExampleLink;
