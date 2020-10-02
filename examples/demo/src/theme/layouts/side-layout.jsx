import React from 'react';
import {MDXPTypes, setMDXPType, useDeck} from '@mdxp/core';
import {Grid, Block, Flex, Place, Styling} from '@mdxp/components';
import {ReactComponent as Logo} from '../assets/logo-text.svg';

const MDXPSideLayout = ({children, split = 1, showSlideNum = true}) => {
  const {slideIndex} = useDeck();
  children = React.Children.toArray(children);
  const col1 = children.slice(0, split);
  const col2 = children.slice(split);

  return (
    <Block
      sx={{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        color: 'text',
        bg: 'background'
      }}
    >
      <Grid
        gridTemplateColumns="38% 62%"
        gridTemplateRows="100%"
      >
        <Block
          bg="MDXPYellow"
          m="0"
          px="2"
          sx={{
            '& h2': {
              marginBlockStart: ['0.83em', '0.3em', '0.83em', '0.83em'],
              marginBlockEnd: ['0.83em', '0.3em', '0.83em', '0.83em']
            },
            '& *:first-child': {
              mt: 1
            }
          }}
        >
          {col1}
        </Block>
        <Flex
          m="0"
          px="4"
          flexFlow="column nowrap"
          alignItems="center"
          justifyContent="center"
        >
          {col2}
        </Flex>
      </Grid>

      <Place bottom="0" sx={{width: '100%', zIndex: 1}}>
        <Styling
          sx={{
            height: [t => t.fontSizes.large, t => t.fontSizes.small, t => t.fontSizes.large, t => t.fontSizes.large],
            position: 'absolute',
            bottom: 0,
            ml: 2,
            mb: 1,
            '& path': {
              fill: 'MDXPGray1'
            }
          }}
        >
          <Logo />
        </Styling>

        {showSlideNum && (
          <Block
            sx={{
              variant: 'text.subtitle',
              fontSize: ['large', 'large', 'small', 'large'],
              float: 'right',
              lineHeight: '100%',
              mr: 2,
              mb: 1
            }}
          >
            {slideIndex}
          </Block>
        )}
      </Place>
    </Block>
  );
};

export default setMDXPType(MDXPSideLayout, MDXPTypes.LAYOUT);
