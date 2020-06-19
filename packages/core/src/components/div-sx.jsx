/** @jsx jsx */
import {jsx} from 'theme-ui';

const DivSx = ({children, sx = {}, ...props}) => (<div sx={sx} {...props}>{children}</div>);
export default DivSx;
