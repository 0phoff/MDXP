import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import MDXPTypes from '../util/mdxp-types.js';
import {setMDXPType} from '../util/mdxp-type-util.jsx';

const Head = ({children}) => {
  children = React.Children.toArray(children)
    .filter(child => child.hasOwnProperty('props'))
    .map((child, i) => {
      const {originalType, _mdxType, _parentName, ...childProps} = child.props;
      return React.createElement(originalType, {
        key: i,
        ...childProps
      });
    });

  return (
    <Helmet>
      {children}
    </Helmet>
  );
};

Head.propTypes = {
  /** Valid elements that can be set in the HTML Head section through react-helmet. */
  children: PropTypes.node
};

export default setMDXPType(Head, MDXPTypes.EXTRACT);
