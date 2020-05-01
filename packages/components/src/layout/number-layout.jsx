/** @jsx jsx */
import {jsx} from 'theme-ui';
import PropTypes from 'prop-types';
import {MDXPTypes, setMDXPType, useDeck} from '@mdxp/core';
import BlankLayout from './blank-layout.jsx';
import Place from '../component/place.jsx';

const NumberLayout = ({children, offset = 0, sx = {}, numberOptions = {bottom: '2%', right: '2%'}, ...props}) => {
  const {slideIndex} = useDeck();

  return (
    <BlankLayout sx={sx} {...props}>
      {children}
      <Place {...numberOptions}>{slideIndex + offset}</Place>
    </BlankLayout>
  );
};

NumberLayout.propTypes = {
  /** Offset that is added to the slideIndex. By default the first slide is marked as 0. */
  offset: PropTypes.number,

  /** Style that gets set to the layout div. This is set as a Theme-UI sx property and can thus accept theme aware values. */
  sx: PropTypes.object,

  /** Options that get passed on to the Place component with the slideIndex. See [Place](./components-components#place) for more information. */
  numberOptions: PropTypes.exact({
    top: PropTypes.any,
    bottom: PropTypes.any,
    left: PropTypes.any,
    right: PropTypes.any,
    sx: PropTypes.object
  }),

  children: PropTypes.node,

  /** Extra properties that are set to the layout div. */
  props: PropTypes.object
};

export default setMDXPType(NumberLayout, MDXPTypes.LAYOUT);
export {NumberLayout as _NumberLayout};
