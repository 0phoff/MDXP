/** @jsx jsx */
import React, {useState} from 'react';
import {jsx} from 'theme-ui';
import useKeyboard from '../hooks/use-keyboard.js';
import useTouch from '../hooks/use-touch.js';
import useStorageNavigation from '../hooks/use-storage-navigation.js';


const keyBindings = {
  'Global': {
    'Next Step': ['Right Arrow', 'Space', 'Tap Right Side'],
    'Previous Step': ['Left Arrow', 'Shift + Space', 'Tap Left Side'],
    'Next Slide': ['Shift + Right Arrow', 'Swipe Left'],
    'Previous Slide': ['Shift + Left Arrow', 'Swipe Right'],
    'Toggle Normal Mode': ['Alt + N'],
    'Toggle Presenter Mode': ['Alt + P'],
    'Toggle Grid Mode': ['Alt + G'],
    'Cycle Modes': ['Swipe Up', 'Swipe Down'],
    'Toggle Help': ['Alt + H'],
  },

  'Presenter Mode': {
    'Toggle Timer': ['Alt + T'],
    'Reset Timer': ['Alt + R'],
  },

  'Grid Mode': {
    'Start of Slide': ['Click'],
    'End of Slide': ['Shift + Click'],
  },
};


const Navigation = ({keyboardReference, touchReference, slideNav=true, modeNav=true, storageNav=true}) => {
  const [help, setHelp] = useState(false);
  useKeyboard(keyboardReference, slideNav, modeNav, setHelp);
  useTouch(touchReference, 15, slideNav, modeNav);
  useStorageNavigation(storageNav);
  
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
            Object.entries(keyBindings).map(([mode, bindings], i) => (
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
                      Object.entries(bindings).map(([action, keys], ii) => (
                        <div sx={{display: 'flex'}} key={`binding_${i}_${ii}`}>
                          <div sx={{width: '55%'}}>{action}</div>
                          <div sx={{width: '45%', fontWeight: '300', textAlign: 'right'}}>
                            {
                              keys.map((k, iii) => (
                                <React.Fragment key={`key_${i}_${ii}_${iii}`}>
                                  <span>{k}</span>
                                  {(iii !== (keys.length - 1)) && <br />}
                                </React.Fragment>
                              ))
                            }
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                {(i !== (Object.keys(keyBindings).length - 1)) && <hr />}
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
