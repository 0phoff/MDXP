import GridMode from '../components/deck-mode-grid.jsx';
import NormalMode from '../components/deck-mode-normal.jsx';
import PresenterMode from '../components/deck-mode-presenter.jsx';
import PrintMode from '../components/deck-mode-print.jsx';

const deckModes = {
  NORMAL: 0,
  PRESENTER: 1,
  GRID: 2,
  OVERVIEW: 3,
  PRINT: 4,

  properties: [
    {name: 'NormalMode', Component: NormalMode, path: 'normal'},
    {name: 'PresenterMode', Component: PresenterMode, path: 'presenter'},
    {name: 'GridMode', Component: GridMode, path: 'grid'},
    {name: 'OverviewMode', Component: NormalMode, path: 'overview'},
    {name: 'PrintMode', Component: PrintMode, path: 'print'}
  ]
};
export default deckModes;
