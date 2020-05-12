/** @jsx jsx */
import {jsx} from 'theme-ui';

const SocialLink = ({logo: Logo, href, sx={}}) => (
  <a
    href={href}
    target="_blank"
    sx={{
      height: '100px',
      '& .hover': {
        fill: t => t.colors.MDXPGray1
      },
      '&:hover .hover': {
        fill: t => t.colors.MDXPGray6
      },
      ...sx
    }}
  >
    <Logo sx={{height: '100%'}}/>
  </a>
);

export default SocialLink;
