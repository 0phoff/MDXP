/** @jsx jsx */
import {jsx} from 'theme-ui';
import {useState} from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p sx={{m: 0, p: 0}}>{count}</p>
      <button
        sx={{width: '50px', height: '50px', fontWeight: 'bold'}}
        onClick={() => setCount(count - 1)}
      >
      -
      </button>
      <button
        sx={{width: '50px', height: '50px', fontWeight: 'bold'}}
        onClick={() => setCount(count + 1)}>
      +
      </button>
    </div>
  );
};
