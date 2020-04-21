import React from 'react';


export const Box = ({children, color='#FCFBFA', headColor=null, head=null, style={}, ...props}) => {
  headColor = headColor || color;

  return (
    <div
      style={{
        backgroundColor: color,
        padding: '0',
        margin: '0 0 16px 0',
        ...style
      }}
      {...props}
    >
      {
        head && (
          <h4
            style={{
              color: 'white',
              backgroundColor: headColor,
              margin: '0',
              paddingLeft: '5px',
              textTransform: 'uppercase',
            }}
          >
            {head}
          </h4>
      )}
      <div style={{padding: '10px 10px'}}>
        {children}
      </div>
    </div>
  );
}


export const Note = ({children, ...props}) => (
  <Box head='Note' color='rgb(231, 242, 250)' headColor='rgb(106, 176, 222)' {...props}>{children}</Box>
);


export const Warning = (props) => (
  <Box head='Warning' color='rgb(255, 237, 204)' headColor='rgb(240, 179, 126)' {...props} />
);
