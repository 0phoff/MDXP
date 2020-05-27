/** @jsx jsx */
import {useEffect, useLayoutEffect, useState} from 'react';
import {jsx, useThemeUI} from 'theme-ui';
import useRoot from '../hooks/use-root.js';
import useDeck from '../hooks/use-deck.js';
import useNavigation from '../hooks/use-navigation.js';
import DeckState from './deck-state.jsx';


export const PreviewDeckState = ({children}) => {
  const deck = useDeck();
  let slide = deck.slideIndex;
  if (deck.stepIndex >= (deck.stepLength - 1)) {
    slide++;
  }

  return (
    <DeckState slide={slide} step={0} preview={true}>
      {children}
    </DeckState>
  );
};


export const Navigation = ({sx={}, ...props}) => {
  const {theme} = useThemeUI();
  const color = theme?.mdxp?.presenter?.color || 'white';

  const deck = useDeck();
  const {next, nextSlide, previous, previousSlide, navigate} = useNavigation();

  return (
    <div
      sx={{
        variant: 'mdxp.presenter',
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        '& > button': {
          width: 'auto',
          height: '75%',
          mx: '5px',
          cursor: 'hand',
          bg: 'transparent',
          border: 'none',
        },
        '& > span': {
          mx: '30px',
        },
        ...sx
      }}
      {...props}
    >
      <button onClick={() => navigate(0, 0, true)} onMouseDown={e => e.preventDefault()}>
        <svg height="100%" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle r="30.5" transform="matrix(-1 0 0 1 33 33)" stroke={color} strokeWidth="5"/>
          <path d="M33.2078 32.8312l12.3094-6.7115v-5.8898L27.0637 30.3735v4.9789l18.4535 10.1648v-5.911l-12.3094-6.775zM20.2299 45.5172h4.0459V20.2299h-4.0459v25.2873z" fill={color}/>
        </svg>
      </button>
      <button onClick={() => previousSlide()} onMouseDown={e => e.preventDefault()}>
        <svg height="100%" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle r="30.5" transform="matrix(-1 0 0 1 33 33)" stroke={color} strokeWidth="5"/>
          <path d="M40.5412 32.8312l12.3094-6.7115v-5.8898L34.3971 30.3735v4.9789l18.4535 10.1648v-5.911l-12.3094-6.775zM20.3113 32.8312l12.3094-6.7115v-5.8898L14.1672 30.3735v4.9789l18.4535 10.1648v-5.911l-12.3094-6.775z" fill={color}/>
        </svg>
      </button>
      <button onClick={() => previous()} onMouseDown={e => e.preventDefault()}>
        <svg height="100%" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle r="30.125" transform="matrix(-1 0 0 1 32.625 32.625)" stroke={color} strokeWidth="5"/>
          <path d="M29.0805 32.4581L41.25 25.8229V20L23.0062 30.0284v4.9223L41.25 45v-5.8439l-12.1695-6.698z" fill={color} />
        </svg>
      </button>
      <span>{deck.slideIndex+1} / {deck.slideLength}</span>
      <button onClick={() => next()} onMouseDown={e => e.preventDefault()}>
        <svg height="100%" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32.625" cy="32.625" r="30.125" stroke={color} strokeWidth="5"/>
          <path d="M36.1695 32.4581L24 25.8229V20l18.2438 10.0284v4.9223L24 45v-5.8439l12.1695-6.698z" fill={color} />
        </svg>
      </button>
      <button onClick={() => nextSlide()} onMouseDown={e => e.preventDefault()}>
        <svg height="100%" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32.625" cy="32.625" r="30.125" stroke={color} strokeWidth="5"/>
          <path d="M26.1695 32.4581L14 25.8229V20l18.2438 10.0284v4.9223L14 45v-5.8439l12.1695-6.698zm20 0L34 25.8229V20l18.2438 10.0284v4.9223L34 45v-5.8439l12.1695-6.698z" fill={color} />
        </svg>
      </button>
      <button onClick={() => navigate(-1, -1, true)} onMouseDown={e => e.preventDefault()}>
        <svg height="100%" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32.625" cy="32.625" r="30.125" stroke={color} strokeWidth="5"/>
          <path d="M32.1695 32.4581L20 25.8229V20l18.2438 10.0284v4.9223L20 45v-5.8439l12.1695-6.698zM45 45h-4V20h4v25z" fill={color} />
        </svg>
      </button>
    </div>
  );
};


const hhmmss = (h, m, s, sep=':') => {
  let timeString = ('0' + h).slice(-2) + sep + ('0' + m).slice(-2);
  if (s !== undefined && s !== null) {
    timeString += sep + ('0' + s).slice(-2)
  }
  return timeString;
}

const toHMS = s => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return [h, m, s % 60];
};

export const Time = ({sx={}, ...props}) => {
  const {theme} = useThemeUI();
  const color = theme?.mdxp?.presenter?.color || 'white';

  const [timer, setTimer] = useState(0);
  const [play, setPlay] = useState(false);
  const [datetime, setDatetime] = useState("00:00");

  useLayoutEffect(() => {
    const date = new Date();
    setDatetime(hhmmss(date.getHours(), date.getMinutes()));

    const dateUpdate = setInterval(() => {
      const date = new Date();
      setDatetime(hhmmss(date.getHours(), date.getMinutes()));
    }, 5000);
    return () => clearInterval(dateUpdate);
  }, []);

  useEffect(() => {
    if (play) {
      const timerUpdate = setInterval(() => {
        setTimer(t => t+1);
      }, 1000);
      return () => clearInterval(timerUpdate);
    }
  }, [play]);

  return (
    <div
      sx={{
        variant: 'mdxp.presenter',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-end',
        '&>div:first-child': {
          fontWeight: '300'
        },
        '&>div:last-child': {
          width: '100%',
          display: 'flex',
          fontSize: '2em',
          alignItems: 'baseline',
          justifyContent: 'flex-start',
          '&>button': {
            bg: 'transparent',
            border: 'none',
            cursor: 'hand',
            mx: '5px',
          },
          '& div:first-child': {
            mr: '10px'
          }
        },
        ...sx
      }}
      {...props}
    >
      <div>{datetime}</div>
      <div>
        <div>{hhmmss(...toHMS(timer), ' : ')}</div>
        <button onClick={() => setPlay(!play)} onMouseDown={e => e.preventDefault()}>
          <svg height="2em" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          {play ?
            (<path fillRule="evenodd" clipRule="evenodd" d="M7 25V0h3.3333v25H7zm8.6667 0V0H19v25h-3.3333z" fill={color} />)
            :
            (<path d="M1 23.3333V1.5702l21.7631 10.1561L1 23.3333z" stroke={color} strokeWidth="2"/>)
          }
          </svg>
        </button>
        <button onClick={() => {setPlay(false); setTimer(0)}} onMouseDown={e => e.preventDefault()}>
          <svg height="2em" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.41177 4.41176L11.0294 0v2.94118c2.1814 0 4.3138.64686 6.1276 1.85879 1.8138 1.21192 3.2275 2.93448 4.0623 4.94984.8347 2.01539 1.0532 4.23299.6276 6.37249-.4256 2.1395-1.476 4.1048-3.0185 5.6473-1.5425 1.5424-3.5078 2.5929-5.6473 3.0185-2.1395.4255-4.3571.2071-6.37246-.6277-2.01536-.8348-3.73792-2.2484-4.94985-4.0622C.646864 18.2844 0 16.152 0 13.9706h2c0 1.7858.52957 3.5316 1.52173 5.0165.99216 1.4848 2.40237 2.6422 4.05227 3.3256 1.64991.6834 3.4654.8622 5.217.5138 1.7515-.3484 3.3604-1.2084 4.6232-2.4712 1.2628-1.2627 2.1227-2.8716 2.4711-4.6232.3484-1.7515.1696-3.567-.5138-5.2169-.6834-1.64993-1.8407-3.06013-3.3256-4.05229-1.4849-.99217-3.2306-1.52173-5.0165-1.52173v3.88235L4.41177 4.41176z" fill={color} />
          </svg>
        </button>
      </div>
    </div>
  );
};


export const Notes = ({sx={}, ...props}) => {
  const {extracted} = useRoot();
  const {slideIndex} = useDeck();
  return (
    <div
      sx={{
        variant: 'mdxp.note',
        ...sx
      }}
      {...props}
    >
      {extracted[slideIndex].note}
    </div>
  );
};
