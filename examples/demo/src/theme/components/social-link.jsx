/** @jsx jsx */
import {jsx} from 'theme-ui';

const SocialLink = ({logo: Logo, href, sx = {}}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    sx={{
      height: '100px',
      width: 'auto',
      mx: 1,
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
