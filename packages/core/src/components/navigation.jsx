/** @jsx jsx */
import {jsx} from 'theme-ui';
import useKeyboard from '../hooks/use-keyboard.js';
import useTouch from '../hooks/use-touch.js';
import useStorageNavigation from '../hooks/use-storage-navigation.js';


const Navigation = ({keyboardReference, touchReference, slideNav=true, modeNav=true, storageNav=true}) => {
  useKeyboard(keyboardReference, slideNav, modeNav);
  useTouch(touchReference, 15, slideNav, modeNav);
  useStorageNavigation(storageNav);
  
  return null;
};

export default Navigation;
