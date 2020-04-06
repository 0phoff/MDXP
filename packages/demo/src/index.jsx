import React from 'react';
import ReactDOM from 'react-dom';
import { Hello } from '@mdx-presenter/core';

const Greeting = () => (
  <div>
    <h1>Hello World!</h1>
    <Hello />
  </div>);

ReactDOM.render(
  <Greeting />,
  document.getElementById('root')
);
