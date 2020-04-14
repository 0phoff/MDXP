import React from 'react';


const PrintMode = ({children, ...props}) => {
  const slides = React.Children.only(children).props.children;

  return (
    <section>
      {
        slides.map((child, i) => (
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
};
export default PrintMode;
