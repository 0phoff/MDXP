/** @jsx jsx */
import React from 'react';
import {jsx} from 'theme-ui';
import PropTypes from 'prop-types';
import MDXPTypes, {setMDXPType} from '@mdxp/core';
import BlankLayout from './blank-layout.jsx';
import getComponentType from '../util/component-type.js';
import cloneElement from '../util/clone.js';

const headers = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

const HeaderLayout = ({children, sx = {}, sxHeader = {}, Footer, ...props}) => {
  children = React.Children.toArray(children);

  let header;
  if ((children.length >= 1) && headers.has(getComponentType(children[0]))) {
    header = cloneElement(children[0], {
      sx: {...children[0].props.sx, ...sxHeader}
    });
    children = children.slice(1);
  }

  return (
    <div
      sx={{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {header && header}
      <BlankLayout sx={{height: 'auto', flexGrow: '1', ...sx}} {...props}>
        {children}
      </BlankLayout>
      {Footer && <Footer />}
    </div>
  );
};

HeaderLayout.propTypes = {
  /** Style that gets set to the header element. This is set as a Theme-UI sx property and can thus accept theme aware values */
  sxHeader: PropTypes.object,

  /** Style that gets set to the layout div. This is set as a Theme-UI sx property and can thus accept theme aware values */
  sx: PropTypes.object,

  /** Extra properties that are set to the layout div. */
  props: PropTypes.object
};

export default setMDXPType(HeaderLayout, MDXPTypes.LAYOUT);
