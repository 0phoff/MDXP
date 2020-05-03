/** @jsx jsx */
import {jsx} from 'theme-ui';
import PropTypes from 'prop-types';

const Block = ({children, as: Element = 'div', sx = {}, ...props}) => (
  <Element
    sx={{
      ...sx,
      ...props
    }}
  >
    {children}
  </Element>
);

Block.propTypes = {
  /** Type of the surrounding styled block. */
  as: PropTypes.elementType,

  /** You can style the block by giving an sx property. This is set as a Theme-UI sx property and can thus accept theme aware values. */
  sx: PropTypes.object,

  children: PropTypes.node,

  /** Alternatively, you can also apply styles by adding them as properties straight away. */
  props: PropTypes.object

};

export default Block;
