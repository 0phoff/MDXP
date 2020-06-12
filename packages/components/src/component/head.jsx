import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {MDXPTypes, setMDXPType} from '@mdxp/core';

const Head = ({
  slideIndex,
  slide,
  length,
  children
}) => {
  if ((slideIndex < slide) || (length !== undefined && (slide+length <= slideIndex))) {
    return null;
  }

  children = React.Children.toArray(children)
    .filter(child => child.hasOwnProperty('props'))
    .map((child, i) => {
      const {originalType, mdxType: _mdxType, parentName: _parentName, ...childProps} = child.props;
      return React.createElement(originalType, {
        key: i,
        ...childProps
      });
    });

  return ReactDOM.createPortal(children, document.head);
};

Head.propTypes = {
  /** Valid elements that can be set in the HTML Head section through react-helmet. */
  children: PropTypes.node,

  /** Optional length that tells for how many slides this Head should be rendered. */
  length: PropTypes.number,
};

export default setMDXPType(Head, MDXPTypes.EXTRACT);
