import React, {useEffect} from 'react';
import {useConfig} from 'docz';
import {Styled} from 'theme-ui';
import Highlight, { defaultProps } from 'prism-react-renderer';
import stringifyObject from 'stringify-object';

const ObjectProps = ({of: object, pre='', post=''}) => {
  const {themeConfig} = useConfig();
  const code = (pre + stringifyObject(object, {indent: '  '}) + post).trim();

  return (
    <Highlight {...defaultProps} theme={themeConfig.prism.light} code={code} language='js'>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Styled.pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Styled.pre>
      )}
    </Highlight>
  );
};

export default ObjectProps;
