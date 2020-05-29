import {useEffect} from 'react';
import useRoot from './use-root.js';
import useNavigation from './use-navigation';

const getRelativeCoord = (x, y, rect) => [
  (x - rect.left) / (rect.right - rect.left),
  (y - rect.top) / (rect.bottom - rect.top)
];

const useTouch = (target, deltaThreshold = 15, slideNav = true, modeNav = true) => {
  const {mode} = useRoot();
  const {next, nextSlide, previous, previousSlide, setMode} = useNavigation();
  const state = {
    touchMove: false,
    x: 0,
    y: 0,
    relX: 0,
    relY: 0
  };

  const onTap = ({relX: x}) => {
    if (slideNav) {
      if (x >= 0.5) {
        next();
      } else {
        previous();
      }
    }
  };

  const onSwipe = ({deltaX: dx, deltaY: dy}) => {
    if (Math.abs(dx) >= Math.abs(dy)) {
      if (slideNav) {
        if (dx > 0) {
          previousSlide();
        } else if (dx < 0) {
          nextSlide();
        }
      }
    } else if (modeNav) {
      if (dy > 0) {
        const newMode = (mode === 0) ? 2 : mode - 1;
        setMode(newMode);
      } else {
        const newMode = (mode === 2) ? 0 : mode + 1;
        setMode(newMode);
      }
    }
  };

  const onTouchStart = e => {
    const {clientX: x = 0, clientY: y = 0} = e.touches[0];
    const [relX, relY] = getRelativeCoord(x, y, e.currentTarget.getBoundingClientRect());
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
    const [relX, relY] = getRelativeCoord(x, y, e.currentTarget.getBoundingClientRect());
    const deltaX = x - state.x;
    const deltaY = y - state.y;

    if (state.touchMove && ((Math.abs(deltaX) >= deltaThreshold) || (Math.abs(deltaY) >= deltaThreshold))) {
      let target = e.target;
      while (target.tagName.toLowerCase() !== 'body') {
        const {overflowX, overflowY} = getComputedStyle(target);
        if (
          (((overflowX === 'scroll') || (overflowX === 'auto')) && (target.scrollWidth > target.clientWidth)) ||
          (((overflowY === 'scroll') || (overflowY === 'auto')) && (target.scrollHeight > target.clientHeight))
        ) {
          return;
        }

        target = target.parentNode;
      }

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
      // Skip onTap if element is one of following:
      const skipElements = new Set(['button', 'a', 'canvas', 'video']);
      let target = e.target;
      while (target.tagName.toLowerCase() !== 'body') {
        if (skipElements.has(target.tagName.toLowerCase())) {
          return;
        }

        target = target.parentNode;
      }

      // Generate onTap
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
  }, [target, slideNav, modeNav, mode, next, nextSlide, previous, previousSlide, setMode]);
};

export default useTouch;
