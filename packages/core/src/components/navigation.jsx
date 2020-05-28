/** @jsx jsx */
import {jsx} from 'theme-ui';
import useKeyboard from '../hooks/use-keyboard.js';
import useTouch from '../hooks/use-touch.js';
import useStorageNavigation from '../hooks/use-storage-navigation.js';


const Navigation = ({keyboardReference, touchReference}) => {
  useKeyboard(keyboardReference);
  useTouch(touchReference, 15);
  useStorageNavigation();
  
  return null;
};

export default Navigation;
