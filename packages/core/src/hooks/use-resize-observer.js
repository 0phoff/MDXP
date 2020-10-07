import {useRef, useLayoutEffect, useState, useCallback} from 'react';

// CODE STOLEN FROM:
// https://tobbelindstrom.com/blog/resize-observer-hook/

const useResizeObserver = () => {
  const [observerEntry, setObserverEntry] = useState([undefined, undefined]);
  const [node, setNode] = useState(null);
  const observer = useRef(null);

  const disconnect = useCallback(() => observer.current?.disconnect(), []);
  const observe = useCallback(() => {
    observer.current = new ResizeObserver(([entry]) => {
      setObserverEntry([entry.contentRect.width, entry.contentRect.height]);
    });
    if (node) {
      observer.current.observe(node);
    }
  }, [node]);

  useLayoutEffect(() => {
    observe();
    return () => disconnect();
  }, [disconnect, observe]);

  return [setNode, ...observerEntry];
};

export default useResizeObserver;
