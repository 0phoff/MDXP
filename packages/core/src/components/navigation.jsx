/** @jsx jsx */
import React, {useState} from 'react';
import {jsx} from 'theme-ui';
import useKeyboard from '../hooks/use-keyboard.js';
import useTouch from '../hooks/use-touch.js';
import useStorageNavigation from '../hooks/use-storage-navigation.js';


const keyBindings = {
  'Global': {
    'Next Step': {
      keys: ['Right Arrow', 'Space', 'Tap Right Side'],
      type: 'slide'
    },
    'Previous Step': {
      keys: ['Left Arrow', 'Shift + Space', 'Tap Left Side'],
      type: 'slide'
    },
    'Next Slide': {
      keys: ['Shift + Right Arrow', 'Swipe Left'],
      type: 'slide'
    },
    'Previous Slide': {
      keys: ['Shift + Left Arrow', 'Swipe Right'],
      type : 'slide'
    },
    'Toggle Normal Mode': {
      keys: ['Alt + N'],
      type: 'mode'
    },
    'Toggle Presenter Mode': {
      keys: ['Alt + P'],
      type: 'mode'
    },
    'Toggle Grid Mode': {
      keys: ['Alt + G'],
      type: 'mode'
    },
    'Cycle Modes': {
      keys: ['Swipe Up', 'Swipe Down'],
      type: 'mode'
    },
    'Toggle Help': {
      keys: ['Alt + H'],
    },
  },

  'Presenter Mode': {
    'Toggle Timer': {
      keys: ['Alt + T'],
      type: 'mode'
    },
    'Reset Timer': {
      keys: ['Alt + R'],
      type: 'mode'
    },
  },

  'Grid Mode': {
    'Start of Slide': {
      keys: ['Click'],
      type: 'mode'
    },
    'End of Slide': {
      keys: ['Shift + Click'],
      type: 'mode'
    },
  },
};

const filterKeyBindings = (slide, mode) => {
  return Object.fromEntries(
    Object.entries(keyBindings)
    .map(([modeGroup, keys]) => {
      const newKeys = Object.fromEntries(
        Object.entries(keys)
        .reduce((acc, [action, data]) => {
          switch (data.type) {
            case 'slide':
              if (slide) {
                return [...acc, [action, data]];
              } else {
                return acc;
              }
              break;

            case 'mode':
              if (mode) {
                return [...acc, [action, data]];
              } else {
                return acc;
              }
              break;

            default:
              return [...acc, [action, data]];

          } 
        }, [])
      );
      return [modeGroup, newKeys];
    })
    .filter(([modeGroup, keys]) => Object.keys(keys).length)
  );
}

const Navigation = ({
  keyboardReference,
  touchReference,
  slideNavigation=true,
  modeNavigation=true,
  storageNavigation=true
}) => {
  const filteredKeyBindings = filterKeyBindings(slideNavigation, modeNavigation);
  const [help, setHelp] = useState(false);
  useKeyboard(keyboardReference, slideNavigation, modeNavigation, setHelp);
  useTouch(touchReference, 15, slideNavigation, modeNavigation);
  useStorageNavigation(storageNavigation);

  if (help) {
    return (
      <div
        sx={{
          bg: 'rgba(0,0,0,.8)',
          color: 'white',
          position: 'absolute',
          maxHeight: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '10',
          p: '30px 50px',
          borderRadius: '20px',
          fontSize: '1.25rem',
          maxWidth: '1200px',
          width: '95%',
          '@media screen and (min-width: 64em)': {
            width: '85%'
          },
          '& h1': {
            fontSize: '1.2em',
            lineHeight: '120%',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            width: '100%',
            textAlign: 'center',
          },
          '& h2': {
            fontSize: '1.1em',
            lineHeight: '120%',
            textTransform: 'uppercase',
            fontWeight: 'normal',
            mt: '0px',
          },
          '& hr': {
            borderTop: '2px solid white',
            height: '0px',
            width: '100%',
            my: '30px',
          }
        }}
      >
        <h1>MDXP Help</h1>
        <div
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: '0px',
          }}
        >
          {
            Object.entries(filteredKeyBindings).map(([mode, keys], i) => (
              <React.Fragment key={`mode_${i}`}>
                <div>
                  <h2>{mode}</h2>
                  <div
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(325px, 1fr))',
                      gridGap: '30px 100px'
                    }}
                  >
                    {
                      Object.entries(keys).map(([action, data], ii) => (
                        <div sx={{display: 'flex'}} key={`binding_${i}_${ii}`}>
                          <div sx={{width: '55%'}}>{action}</div>
                          <div sx={{width: '45%', fontWeight: '300', textAlign: 'right'}}>
                            {
                              data.keys.map((k, iii) => (
                                <React.Fragment key={`key_${i}_${ii}_${iii}`}>
                                  <span>{k}</span>
                                  {(iii !== (data.keys.length - 1)) && <br />}
                                </React.Fragment>
                              ))
                            }
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                {(i !== (Object.keys(filteredKeyBindings).length - 1)) && <hr />}
              </React.Fragment>
            ))
          }
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Navigation;
