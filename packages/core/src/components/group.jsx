import React from 'react';
import MDXPTypes from '../util/mdxp-types.js';

const createGroup = (func) => {
  const Group = ({children}) => children;
  Group.MDXPType = MDXPTypes.GROUP;
  Group.MDXPGroupFunc = func;
  return Group;
};

export default createGroup;
