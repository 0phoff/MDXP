import React, {useState} from 'react';
import {Link} from 'gatsby';
import data from '@core/package.json';

export const Logo = () => {
  const [hover, setHover] = useState(false);
  const textStyle = hover ?
    {fill: '#000000', fillOpacity: 1, transition: 'fill-opacity 0.3s ease-in 0.5s'} :
    {fill: '#000000', fillOpacity: 0};
  const arrowStyleUp = hover ?
    {fill: '#f9ac00', fillOpacity: 0, transform: 'translate(0, -175%)', transition: 'all 0.5s ease-out'} :
    {fill: '#f9ac00', fillOpacity: 1};
  const arrowStyleDown = hover ?
    {fill: '#f9ac00', fillOpacity: 0, transform: 'translate(0, 175%)', transition: 'all 0.5s ease-out'} :
    {fill: '#f9ac00', fillOpacity: 1};

  return (
    <Link to="/" style={{textDecoration: 'none'}}>
      <div
        onMouseEnter={() => {
        setHover(true);
        }}
        onMouseLeave={() => {
        setHover(false);
        }}
      >
        <svg
          viewBox="0 0 33.142164 8.08943"
          height="30.574223"
          width="125.26172"
        >
          <g aria-label="MDXP">
            <path
              d="M2.2903.264584l1.932698 5.457031L6.145362.264584h2.036051v7.524088H6.625952V5.731951l.15503-3.550171-2.030884 5.606892H3.685564L1.659847 2.186947l.15503 3.545004v2.056721H.264584V.264584z"
              fill="#000000"
            />
            <path
              d="M10.868588 7.788672V.264584h2.315104q.992187 0 1.772501.449585.785482.444417 1.224732 1.27124.439249.821656.439249 1.870687v.346232q0 1.049032-.434082 1.865519-.428914.816488-1.214396 1.266073-.785481.449585-1.772501.454752zm1.550293-6.268351v5.02295h.749308q.909505 0 1.390096-.594279t.490926-1.700155v-.397909q0-1.147216-.475423-1.736328-.475423-.594279-1.390096-.594279z"
              style={textStyle}
            />
            <path
              d="M21.767147 2.858741L23.177913.264584h1.782837l-2.191081 3.731038 2.247925 3.79305h-1.803507l-1.44694-2.635497-1.44694 2.635497h-1.803508l2.247925-3.79305L18.573543.264584h1.782837z"
              fill="#000000"
            />
            <path
              d="M28.665951 5.137672v2.651h-1.550293V.264584h2.935221q.847494 0 1.488281.310059.645956.310058.992188.883667.346232.56844.346232 1.297078 0 1.105876-.759643 1.746664-.754476.63562-2.092896.63562zm0-1.255738h1.384928q.61495 0 .935344-.289388.325561-.289388.325561-.826823 0-.552937-.325561-.894002-.325562-.341064-.89917-.3514h-1.421102z"
              style={textStyle}
            />
          </g>
        
          <path
            d="M27.17157 2.144572L29.910421.264583h.14986l2.73885 1.879989v1.281576l-2.043288-1.443839v5.842537h-1.540987V1.982309L27.17157 3.426148z"
            style={arrowStyleUp}
          />
          <path
            d="M10.897262 5.908683l2.738851 1.879989h.14986l2.73885-1.879989V4.627107l-2.043288 1.443839V.264583h-1.540987v5.806363l-2.043286-1.443839z"
            style={arrowStyleDown}
          />
        </svg>
      </div>
    </Link>
  );
};
