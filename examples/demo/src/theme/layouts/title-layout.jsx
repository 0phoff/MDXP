/** @jsx jsx */
import {jsx, Styled} from 'theme-ui';
import {MDXPTypes, setMDXPType, useStep} from '@mdxp/core';
import {AutoStepper, BlankLayout, Place} from '@mdxp/components';
import {ReactComponent as Logo} from '../assets/logo-animate.svg';

const MDXPTitleLayout = ({subtitle = ''}) => {
  const step = useStep(2);
  const styles = step === 0 ?
    {
      '& .letter': {
        fill: t => t.colors.MDXPGray1,
        '&.hide': {
          fillOpacity: 0
        }
      },
      '& .arrow-up': {
        fill: t => t.colors.MDXPYellow,
        fillOpacity: 1
      },
      '& .arrow-down': {
        fill: t => t.colors.MDXPYellow,
        fillOpacity: 1
      },
      '& h2': {
        opacity: 0
      }
    } :
    {
      '& .letter': {
        fill: t => t.colors.MDXPGray1,
        '&.hide': {
          fillOpacity: 1,
          transition: 'all 0.5s ease-in 1s'
        }
      },
      '& .arrow-up': {
        fill: t => t.colors.MDXPYellow,
        fillOpacity: 0,
        transform: 'translate(0, -150%)',
        transition: 'all 0.5s cubic-bezier(0.9,-0.45, 1, 1)'
      },
      '& .arrow-down': {
        fill: t => t.colors.MDXPYellow,
        fillOpacity: 0,
        transform: 'translate(0, 150%)',
        transition: 'all 0.5s cubic-bezier(0.9,-0.45, 1, 1)'
      },
      '& h2': {
        opacity: 1,
        transition: 'all 0.5s ease-in-out 1s'
      }
    };

  return (
    <BlankLayout
      sx={{
        variant: 'gradient.light',
        '& svg': {
          width: '60%',
          height: 'auto'
        },
        ...styles
      }}
    >
      <Place top="20%" sx={{width: '100%', textAlign: 'center'}}>
        <Logo />
        <Styled.h2 sx={{color: 'MDXPYellow'}}>{subtitle}</Styled.h2>
      </Place>
      <AutoStepper time={1500} />
    </BlankLayout>
  );
};

export default setMDXPType(MDXPTitleLayout, MDXPTypes.LAYOUT);
