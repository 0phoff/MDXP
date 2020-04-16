import {useContext} from 'react';
import RootContext from '../root-context.js';

export const useRoot = () => useContext(RootContext);
export default useRoot;

