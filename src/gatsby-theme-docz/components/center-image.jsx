/** @jsx jsx */
import {jsx} from 'theme-ui';

const CenterImage = ({src, alt, width=['100%', '75%']}) => (
  <div
    sx={{
      width: '100%',
      textAlign: 'center',
      '&>img': {
        width
      },
    }}
  >
    <img alt={alt} src={src} />
  </div>
);

export default CenterImage;
