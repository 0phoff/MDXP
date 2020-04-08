import React from 'react';
import componentTypes, {getComponentType} from '../util/component-types.jsx';

const wrapper = (DefaultLayout) => {
  const Wrapper = (props) => {
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

    const children = React.Children.toArray(props.children);

    // Get split indices
    const splits = [];
    React.Children.forEach(children, (child, i) => {
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

    return slides;
  };

  return Wrapper
};

export default wrapper;
