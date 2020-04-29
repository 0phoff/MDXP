import React, {createElement} from 'react';
import {useComponents, Props} from 'docz';
import marksy from 'marksy';


export const Arguments = ({children, of: component, input=true}) => {
  const components = useComponents();
  const compileMD = marksy({createElement, components});

  // Extract data
  if (!Array.isArray(children)) {
    children = [children];
  }

  const computedProps = component ? null : Object.fromEntries(
    children.map(child => {
      const data = {};
      data.defaultValue = child.default ? {computed: true, value: compileMD(child.default).tree[0].props.children} : {};
      data.description = (child.desc || child.description) ? compileMD(child.desc || child.description).tree : null;
      data.required = input && !child.hasOwnProperty('default');
      data.type = compileMD(child.type).tree[0].props.children;

      return [child.name, data];
    })
  );

  // Render
  const PropsComponent = components.props;
  if (component) {
    return (<Props of={component} />);
  } else if (!PropsComponent) {
    return null;
  } else {
    return (
      <PropsComponent
        props={computedProps}
        of={component}
        getPropType={(prop) => prop.type}
      />
    );
  }
};
export default Arguments;
