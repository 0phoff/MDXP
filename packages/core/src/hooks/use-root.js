import {useContext} from 'react';
import RootContext from '../util/root-context.js';


/**
 * Use Root Context
 * This hook returns the root context (read-only).
 *
 * @return  {object} 
 *          Root context object
 */
export const useRoot = () => useContext(RootContext)[0];
export default useRoot;


/**
 * Use Root Context and Setter function
 * This hook returns the root context and its setter function.
 *
 * Note that you should use the setter function inside of a useEffect().
 *
 * @return  {Array} context
 * @return  {object} context[0]
 *          Root context object
 * @return  {newState => void} context[1]
 *          Root context setter, generated with useMerger()
 */
export const useSetRoot = () => useContext(RootContext)
