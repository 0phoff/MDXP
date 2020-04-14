import React from 'react';
import DeckMode from './deck-mode.jsx';
import componentTypes, {getComponentType} from '../util/component-types.jsx';

const wrapper = (DefaultLayout, passedProps) => {
  const wrapLayout = (elements, key) => {
    if ((elements.length === 1) && (getComponentType(elements[0]) == componentTypes.LAYOUT)) {
      return React.cloneElement(elements[0], {key: key});
    }
    else {
      return (
        <DefaultLayout key={key}>{elements}</DefaultLayout>
      );
    }
  };

  const Wrapper = (props) => {
    const children = React.Children.toArray(props.children);

    // Get split indices
    const splits = [];
    children.forEach((child, i) => {
      if (child.props.mdxType === 'hr') {
        splits.push(i);
      }
    });

    // Split elements into slides
    const slides = [];
    let previousSplit = 0;
    splits.forEach(i => {
      slides.push(wrapLayout(children.slice(previousSplit, i), `layout_${slides.length}`));
      previousSplit = i + 1;
    });
    slides.push(wrapLayout(children.slice(previousSplit), `layout_${slides.length}`));

    return (<DeckMode {...passedProps}>{slides}</DeckMode>);
  };

  return Wrapper
};

export default wrapper;
