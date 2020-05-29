import {useLayoutEffect} from 'react';
import {useSetRoot} from './use-root.js';

const useSetMode = deckMode => {
  const [root, setRoot] = useSetRoot();
  useLayoutEffect(() => {
    if (root.mode !== deckMode) {
      setRoot({previousMode: root.mode, mode: deckMode});
    }
  }, []);
};

export default useSetMode;
