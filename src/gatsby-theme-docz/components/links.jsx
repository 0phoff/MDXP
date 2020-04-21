import React from 'react';
import {Link} from 'docz';


export const ComponentLink = ({to, name, ...props}) => {
  name = name || to.split('#').pop();
  return (<Link to={to.toLowerCase()} {...props}>{name}</Link>);
}
