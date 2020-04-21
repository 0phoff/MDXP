import React, {useState} from 'react';
import {Link} from 'gatsby';


export const Logo = () => {
  const [hover, setHover] = useState(false);
  const textStyle = hover ?
    {fill: '#000000', fillOpacity: 1, transition: 'fill-opacity 0.3s ease-in 0.5s'} :
    {fill: '#000000', fillOpacity: 0};
  const arrowStyleUp = hover ?
    {fill: '#f9ac00', fillOpacity: 0, transform: 'translate(0, -175%)', transition: 'all 0.5s ease-out'} :
    {fill: '#f9ac00', fillOpacity: 1,};
  const arrowStyleDown = hover ?
    {fill: '#f9ac00', fillOpacity: 0, transform: 'translate(0, 175%)', transition: 'all 0.5s ease-out'} :
    {fill: '#f9ac00', fillOpacity: 1,};

  return (
    <Link to='/'>
      <div onMouseEnter={() => {setHover(true)}} onMouseLeave={() => {setHover(false)}}>
        <svg
           version="1.1"
           viewBox="0 0 33.142164 8.0894299"
           height="30.574223"
           width="125.26172"
        >
        <g
          transform="translate(-61.401812,-57.553338)"
          id="layer1"
        >
          <text
            id="text1458"
            y="65.34201"
            x="60.994602"
            style={{fontWeight:'bold',fontSize:'10.58333302px',lineHeight:1,fontFamily:'Roboto',fill:'#000000',fillOpacity:1,stroke:'none',letterSpacing:'1.32291663px'}}
          >
            M<tspan style={textStyle}>D</tspan>X<tspan style={textStyle}>P</tspan>
          </text>
        
          <path
            style={arrowStyleUp}
            d="m 88.573382,59.69791 2.738851,-1.879989 h 0.14986 l 2.73885,1.879989 v 1.281576 l -2.043288,-1.443839 v 5.842537 h -1.540987 v -5.842537 l -2.043286,1.443839 z"
          />
          <path
            style={arrowStyleDown}
            d="m 72.299074,63.462021 2.738851,1.879989 h 0.14986 l 2.73885,-1.879989 v -1.281576 l -2.043288,1.443839 V 57.817921 H 74.34236 v 5.806363 l -2.043286,-1.443839 z"
          />
        </g>
        </svg>
      </div>
    </Link>
  );
};
