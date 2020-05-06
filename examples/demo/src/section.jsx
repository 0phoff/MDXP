import React from 'react';
import {MDXPTypes, setMDXPType} from '@mdxp/core';
import {BlankLayout, ThemeWrapper} from '@mdxp/components';

const Section = ({children, color}) => {
  return (
  <>
    <BlankLayout sx={{bg: color}}>
      <h1>SECTION</h1>
    </BlankLayout>
    <hr />
    <ThemeWrapper theme={{colors: {text: color}}}>
      {children}
    </ThemeWrapper>
  </>
  );
};

export default setMDXPType(Section, MDXPTypes.GROUP);
