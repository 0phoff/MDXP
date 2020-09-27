export {default} from './components/deck.jsx';

// UTIL
export {default as defaultTheme} from './util/theme.js';
export {default as deckModes} from './util/deck-modes.js';
export {default as getComponentType} from './util/component-type.js';
export {default as MDXPTypes} from './util/mdxp-types.js';
export {
  setMDXPType,
  getMDXPType,
  checkMDXPType
} from './util/mdxp-type-util.jsx';

// HOOKS
export {default as useRoot} from './hooks/use-root.js';
export {default as useDeck} from './hooks/use-deck.js';
export {default as useStep} from './hooks/use-step.js';
export {default as useNavigation} from './hooks/use-navigation.js';

// COMPONENTS
export {default as Deck} from './components/deck.jsx';
export {default as Note} from './components/note.jsx';
export {default as Step} from './components/step.jsx';
export {default as Zoom} from './components/zoom.jsx';
export {default as wrapper} from './components/wrapper.jsx';
