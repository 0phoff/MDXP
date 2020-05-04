import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useSetRoot} from './use-root.js';
import {
  next,
  nextSlide,
  previous,
  previousSlide,
  setMode as _setMode
} from '../util/navigation.js';

const getRelativeCoord = (x, y, rect) => [
  (x - rect.left) / (rect.right - rect.left),
  (y - rect.top) / (rect.bottom - rect.top)
];

const useTouch = (target, deck, setDeck, deltaThreshold = 10) => {
  const history = useHistory();
  const [root, _setRoot] = useSetRoot();
  const state = {
    touchMove: false,
    x: 0,
    y: 0,
    relX: 0,
    relY: 0
  };

  const onTap = ({relX: x}) => {
    if (x >= 0.5) {
      next(history, root, deck, setDeck);
    } else {
      previous(history, root, deck, setDeck);
    }
  };

  const onSwipe = ({deltaX: dx, deltaY: dy}) => {
    if (Math.abs(dx) >= Math.abs(dy)) {
      if (dx > 0) {
        previousSlide(history, root, deck, setDeck);
      } else if (dx < 0) {
        nextSlide(history, root, deck, setDeck);
      }
    }
  };

  const onTouchStart = e => {
    const {clientX: x = 0, clientY: y = 0} = e.touches[0];
    const [relX, relY] = getRelativeCoord(x, y, e.target.getBoundingClientRect());
    state.touchMove = false;
    state.x = x;
    state.y = y;
    state.relX = relX;
    state.relY = relY;
  };

  const onTouchMove = () => {
    state.touchMove = true;
  };

  const onTouchEnd = e => {
    const {clientX: x = 0, clientY: y = 0} = e.changedTouches[0];
    const [relX, relY] = getRelativeCoord(x, y, e.target.getBoundingClientRect());
    const deltaX = x - state.x;
    const deltaY = y - state.y;

    if (state.touchMove && ((Math.abs(deltaX) >= deltaThreshold) || (Math.abs(deltaY) >= deltaThreshold))) {
      onSwipe({
        startX: state.x,
        startY: state.y,
        endX: x,
        endY: y,
        deltaX,
        deltaY,
        relStartX: state.relX,
        relStartY: state.relY,
        relEndX: relX,
        relEndY: relY,
        relDeltaX: relX - state.relX,
        relDeltaY: relY - state.relY
      });
    } else {
      onTap({
        x,
        y,
        relX,
        relY
      });
    }
  };

  useEffect(() => {
    const currentTarget = (target && target.hasOwnProperty('current')) ? target.current : target;
    if (currentTarget) {
      currentTarget.addEventListener('touchstart', onTouchStart);
      currentTarget.addEventListener('touchmove', onTouchMove);
      currentTarget.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      if (currentTarget) {
        currentTarget.removeEventListener('touchstart', onTouchStart);
        currentTarget.removeEventListener('touchmove', onTouchMove);
        currentTarget.removeEventListener('touchend', onTouchEnd);
      }
    };
  }, [root, deck, target]);
};

export default useTouch;
