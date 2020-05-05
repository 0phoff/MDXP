export * from './layout';
export * from './wrapper';
export * from './component';

import {
  BlankLayout,
  HeaderLayout,
  NumberLayout
} from './layout';
import {
  InvertWrapper,
  LayoutWrapper,
  ThemeWrapper
} from './wrapper';
import {
  Block,
  Columns,
  Place,
  Styling
} from './component';

// Clean export for use in <Deck />
export default {
  BlankLayout,
  HeaderLayout,
  NumberLayout,

  InvertWrapper,
  LayoutWrapper,
  ThemeWrapper,

  Block,
  Columns,
  Place,
  Styling
};
