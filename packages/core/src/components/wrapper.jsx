import React from 'react';
import DeckMode from './deck-mode.jsx';
import MDXPTypes, {getMDXPType} from '../util/mdxp-types.jsx';

/** Create slide object */
const createSlideObject = (elements, context = null) => {
  if (Array.isArray(elements)) {
    return {context, elements};
  }

  return {context, elements: [elements]};
};

/** Transform slide object into a valid React Component */
const createSlideComponent = DefaultLayout => (slideObject, key) => {
  const {elements, context} = slideObject;
  let slide;

  if ((elements.length === 1) && (getMDXPType(elements[0]) === MDXPTypes.LAYOUT)) {
    slide = React.cloneElement(elements[0], {key: key});
  } else {
    slide = (<DefaultLayout key={key}>{elements}</DefaultLayout>);
  }

  if (context) {
    slide = React.cloneElement(context, {key: 'context_' + key}, slide);
  }

  return slide;
};

/** Split a list of elements into a list of individual slideObjects */
const splitSlides = (elements, context = null) => {
  let startIndex = 0;
  return elements.reduce((acc, element, idx) => {
    if (getMDXPType(element) === MDXPTypes.GROUP) {
      startIndex = idx + 1;
      const children = element.props.children || [];
      return [...acc, ...splitSlides(children, element)];
    }

    if (element.props.mdxType === 'hr') {
      const newAcc = [...acc, createSlideObject(elements.slice(startIndex, idx), context)];
      startIndex = idx + 1;
      return newAcc;
    }

    if (idx === elements.length - 1) {
      return [...acc, createSlideObject(elements.slice(startIndex), context)];
    }

    return acc;
  }, []);
};

/** Higher-order Wrapper component creator */
const wrapper = (DefaultLayout, passedProps) => {
  const slideCreator = createSlideComponent(DefaultLayout);

  return props => {
    const children = React.Children.toArray(props.children);
    const slides =
      splitSlides(children)
        .filter(slideObject => slideObject.elements.length > 0)
        .map((slideObject, idx) => slideCreator(slideObject, `layout_${idx}`));

    return (
      <DeckMode {...passedProps}>
        {slides}
      </DeckMode>
    );
  };
};

export default wrapper;
