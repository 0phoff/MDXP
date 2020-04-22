import {useContext} from 'react';
import RootContext from '../util/root-context.js';

export const useRoot = () => useContext(RootContext)[0];
export default useRoot;

export const useSetRoot = () => useContext(RootContext);
