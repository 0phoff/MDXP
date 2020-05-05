import React from 'react';
import {useMDXComponents} from '@mdx-js/react';
import DeckMode from './deck-mode.jsx';
import MDXPTypes, {checkMDXPType} from '../util/mdxp-types.jsx';

/** Create slide object */
const createSlideObject = (elements, wrappers = []) => {
  if (Array.isArray(elements)) {
    return {wrappers, elements};
  }

  return {wrappers, elements: [elements]};
};

/** Transform slide object into a valid React Component */
const createSlideComponent = DefaultLayout => (slideObject, key, shortCodeComponents) => {
  const {elements, wrappers} = slideObject;
  const wrapperHasLayout = wrappers.some(element => checkMDXPType(element, MDXPTypes.LAYOUT, shortCodeComponents));
  let slide;

  if (wrapperHasLayout) {
    slide = elements;
  } else if ((elements.length === 1) && checkMDXPType(elements[0], MDXPTypes.LAYOUT, shortCodeComponents)) {
    slide = React.cloneElement(elements[0], {key: key});
  } else {
    slide = (<DefaultLayout key={key}>{elements}</DefaultLayout>);
  }

  return wrappers.reduceRight((children, Component) => {
    return React.cloneElement(Component, {key: 'wrapper_' + key}, children);
  }, slide);
};

/** Split a list of elements into a list of individual slideObjects */
const splitSlides = (elements, shortCodeComponents, wrappers = []) => {
  let startIndex = 0;
  return elements.reduce((acc, element, idx) => {
    if (checkMDXPType(element, MDXPTypes.WRAPPER, shortCodeComponents)) {
      startIndex = idx + 1;
      const children = React.Children.toArray(element.props.children);
      const newWrappers = [...wrappers, element];
      return [...acc, ...splitSlides(children, shortCodeComponents, newWrappers)];
    }

    if (element.props.mdxType === 'hr') {
      const newAcc = [...acc, createSlideObject(elements.slice(startIndex, idx), wrappers)];
      startIndex = idx + 1;
      return newAcc;
    }

    if (idx === elements.length - 1) {
      return [...acc, createSlideObject(elements.slice(startIndex), wrappers)];
    }

    return acc;
  }, []);
};

/** Higher-order Wrapper component creator */
const wrapper = (DefaultLayout, passedProps, components) => {
  const slideCreator = createSlideComponent(DefaultLayout);

  return props => {
    const mdxComponents = useMDXComponents();
    const shortCodeComponents = components || mdxComponents;
    const children = React.Children.toArray(props.children);

    const slides =
      splitSlides(children, shortCodeComponents)
        .filter(slideObject => slideObject.elements.length > 0)
        .map((slideObject, idx) => slideCreator(slideObject, `layout_${idx}`, shortCodeComponents));

    return (
      <DeckMode {...passedProps}>
        {slides}
      </DeckMode>
    );
  };
};

export default wrapper;
