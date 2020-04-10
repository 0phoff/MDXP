import React from 'react';


const PrintMode = ({children, ...props}) => (
  <section {...props}>
    {
      children.map((child, i) => (
        <article
          style={{width: '100vw', height: '100vh', overflow: 'hidden'}}
          key={`slide_${i}`}
        >
          {child}
        </article>
      ))
    }
  </section>
);
export default PrintMode;
