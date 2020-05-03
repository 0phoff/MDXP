import React, {useEffect} from 'react';
import {useConfig} from 'docz';
import {Styled} from 'theme-ui';
import Highlight, { defaultProps } from 'prism-react-renderer';
import stringifyObject from 'stringify-object';

const filterProperties = (include, exclude) => (object, property) => {
  let retBool = true;

  if (include) {
    if (Array.isArray(include)) {
      retBool = include.includes(property);
    } else {
      const includeRegex = new RegExp(include);
      retBool = includeRegex.test(property);
    }
  }

  if (exclude) {
    if (Array.isArray(exclude)) {
      retBool = retBool && !exclude.includes(property);
    } else {
      const excludeRegex = new RegExp(exclude);
      retBool = retBool && !excludeRegex.test(property);
    }
  }

  return retBool;
}


const ObjectProps = ({of: object, include, exclude, transform, pre='', post=''}) => {
  const {themeConfig} = useConfig();
  const filter = filterProperties(include, exclude);
  const code = (pre + stringifyObject(object, {indent: '  ', filter, transform}) + post).trim();

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
