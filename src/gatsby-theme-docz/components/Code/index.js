/** @jsx jsx */
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { jsx, Styled, ThemeProvider } from 'theme-ui';
import {useConfig} from 'docz';
import MDX from '@mdx-js/runtime';
import {
  defaultTheme,
  wrapper,
  Step
} from '@mdxp/core';
import mdxpComponents from '@mdxp/components';

const CodeHighlight = ({children, language, className: outerClassName}) => {
  const theme = useConfig().themeConfig.prism.light;
  
  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Styled.pre
          className={`${outerClassName || ''} ${className}`}
          style={{ ...style, overflowX: 'auto' }}
          data-testid="code"
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span
                  {...getTokenProps({ token, key })}
                  sx={{ display: 'inline-block' }}
                />
              ))}
            </div>
          ))}
        </Styled.pre>
      )}
    </Highlight>
  );
};

const MDXPDemo = ({code, onOuterClick, show=false}) => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (show && ref.current) {
      ref.current.focus();
    }
  });

  if (show) {
    return (
      <div
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(50,50,50,.5)',
          bottom: '0',
          right: '0',
          zIndex: 1
        }}
        onClick={onOuterClick}
        onKeyDown={e => {
          if (e.keyCode === 27) {
            onOuterClick(e);
          }
        }}
      >
        <div
          tabIndex={-1}
          ref={ref}
          style={{
            position: 'relative',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '70vw',
            height: '40vw',
            margin: 'auto'
          }}
          onClick={e => e.stopPropagation()}
        >
          <ThemeProvider theme={defaultTheme}>
            <MDX
              components={{
                ...mdxpComponents,
                Step,
                wrapper: wrapper(mdxpComponents.BlankLayout, {target: ref}, mdxpComponents)
              }}
            >
              {code}
            </MDX>
          </ThemeProvider>
        </div>
      </div>
    );
  }
  return null;
};

const MDXPCodeHighlight = ({children}) => {
  const theme = useConfig().themeConfig.prism.light;
  const [showState, setShowState] = useState(false);

  const show = () => {
    document.prevScroll = document.scrollingElement.scrollTop;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${document.prevScroll}px`;
    document.body.style.width = '100%';

    window.location.hash = '';
    setShowState(true);
  };
  const hide = () => {
    setShowState(false);

    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');
    window.scrollTo(0, document.prevScroll);
  };

  return (
    <React.Fragment>
      <Highlight
        {...defaultProps}
        code={children.trim()}
        language='md'
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Styled.pre
            className={`language-md ${className}`}
            style={{ ...style, position: 'relative', overflowX: 'auto' }}
            data-testid="code"
          >
            <span
              sx={{
                fontSize: 1,
                position: 'absolute',
                top: '10px',
                right: '10px',
                color: 'rgb(249, 172, 0)',
                textTransform: 'uppercase',
                letterSpacing: 'caps',
                cursor: 'pointer',
                '&:hover': {
                  top: '11px',
                  right: '11px',
                  fontWeight: 'bold'
                },
                '&:active': {
                  top: '11px',
                  right: '11px',
                  fontWeight: 'bold'
                },
                '@media screen and (max-width: 920px)': {
                  display: 'none'
                }
              }}
              onClick={show}
            >
              Show
            </span>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span
                    {...getTokenProps({ token, key })}
                    sx={{ display: 'inline-block' }}
                  />
                ))}
              </div>
            ))}
          </Styled.pre>
        )}
      </Highlight>
      <MDXPDemo code={children} onOuterClick={hide} show={showState} />
    </React.Fragment>
  );
};

export const Code = ({ children, className: outerClassName }) => {
  const [language] = outerClassName
    ? outerClassName.replace(/language-/, '').split(' ')
    : ['text']

  if (language === 'mdxp') {
    return (<MDXPCodeHighlight>{children}</MDXPCodeHighlight>);
  } else {
    return (<CodeHighlight language={language} className={outerClassName}>{children}</CodeHighlight>);
  }

};
