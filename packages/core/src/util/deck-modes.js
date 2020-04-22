import NormalMode from '../components/deck-mode-normal.jsx';
import PrintMode from '../components/deck-mode-print.jsx';

const deckModes = {
  NORMAL: 0,
  PRESENTER: 1,
  OVERVIEW: 2,
  GRID: 3,
  PRINT: 4,

  properties: [
    {name: 'NormalMode', Component: NormalMode, path: 'normal'},
    {name: 'PresenterMode', Component: PrintMode, path: 'presenter'},
    {name: 'OverviewMode', Component: PrintMode, path: 'overview'},
    {name: 'GridMode', Component: PrintMode, path: 'grid'},
    {name: 'PrintMode', Component: PrintMode, path: 'print'}
  ]
};
export default deckModes;
