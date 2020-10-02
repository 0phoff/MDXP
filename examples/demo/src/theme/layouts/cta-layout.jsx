import React from 'react';
import {setMDXPType, MDXPTypes} from '@mdxp/core';
import {BlankLayout, Grid, Block, Place} from '@mdxp/components';
import SocialLink from '../components/social-link.jsx';
import poweredBy from '../assets/powered-by.svg';
import logoArrows from '../assets/logo-arrows.svg';
import {ReactComponent as Github} from '../assets/social-github.svg';
import {ReactComponent as KoFi} from '../assets/social-kofi.svg';
import {ReactComponent as Website} from '../assets/social-website.svg';

const MDXPCtaLayout = () => (
  <BlankLayout
    sx={{
      variant: 'gradient.yellow'
    }}
  >
    <Grid
      width="100%" height="38%"
      px="3" mt="-100px"
      gridTemplateColumns={['2fr 1fr', '4fr 3fr', '2fr 1fr']}
      gridTemplateRows="5fr 2fr"
      gridTemplateAreas={['cta logo', 'buttons logo']}
      gridGap={['100px', '25px', '50px', '100px']}
    >
      <Block
        gridArea="cta"
        width="100%"
        height="fit-content"
        alignSelf="end"
        bg="MDXPGray6"
        sx={{
          variant: 'text.title',
          textAlign: 'center',
          borderRadius: '10px',
          boxShadow: '4px 4px 4px rgba(51, 51, 51, 0.25)',
          color: 'MDXPGray1',
          textDecoration: 'none',
          '&:hover': {
            bg: 'MDXPGray1',
            color: 'MDXPGray6'
          }
        }}

        as="a"
        target="_blank"
        href="https://0phoff.github.io/MDXP/getting-started"
      >
        Get Started
      </Block>

      <Block
        gridArea="buttons"
        width="100%"
        height="100%"
        alignSelf="start"
        sx={{
          textAlign: 'center'
        }}
      >
        <SocialLink logo={Github} href="https://github.com/0phoff/MDXP" />
        <SocialLink logo={Website} href="https://0phoff.github.io/MDXP" />
        <SocialLink logo={KoFi} href="https://ko-fi.com/D1D31LPHE" />
      </Block>

      <Block gridArea="logo" width="100%" height="100%">
        <img
          src={logoArrows}
          alt="Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: '100% 50%'
          }}
        />
      </Block>
    </Grid>

    <Place bottom="30px" right="50px" width="400px">
      <img src={poweredBy} alt="Powered By" style={{width: '100%'}} />
    </Place>
  </BlankLayout>
);

export default setMDXPType(MDXPCtaLayout, MDXPTypes.LAYOUT);
