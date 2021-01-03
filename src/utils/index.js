import {
  isServer,
  detectOS,
  getEventListenerOptions
} from './utils';

let lockedNum = 0;
let initialClientY = 0;
let initialClientX = 0;
let documentListenerAdded = false 
let unLockCallback;

const lockedElements = [];
const eventListenerOptions = getEventListenerOptions({ passive: false });

const preventDefault = (event) => {
  if (!event.cancelable) return

  event.preventDefault()
}

const setOverflowHiddenMobile = () => {
  const $html = document.documentElement;
  const $body = document.body;
  const scrollTop = $html.scrollTop || $body.scrollTop;
  const htmlStyle = { ...$html.style };
  const bodyStyle = { ...$body.style };

  $html.style.height = '100%';
  $html.style.overflow = 'hidden';

  $body.style.top = `-${scrollTop}px`;
  $body.style.width = '100%';
  $body.style.height = 'auto';
  $body.style.position = 'fixed';
  $body.style.overflow = 'hidden';

  return () => {
      $html.style.height = htmlStyle.height || '';
      $html.style.overflow = htmlStyle.overflow || '';

      ['top', 'width', 'height', 'overflow', 'position'].forEach((x) => {
          $body.style[x] = bodyStyle[x] || '';
      })

      window.scrollTo(0, scrollTop);
  }
}

const handleScroll = (event, targetElement) => {
  if (targetElement) {
    const {
      scrollTop,
      scrollLeft,
      scrollWidth,
      scrollHeight,
      clientWidth,
      clientHeight,
    } = targetElement;
    const clientX = event.targetTouches[0].clientX - initialClientX;
    const clientY = event.targetTouches[0].clientY - initialClientY;
    const isVertical = Math.abs(clientY) > Math.abs(clientX);

    const isOnTop = clientY > 0 && scrollTop === 0;
    const isOnLeft = clientX > 0 && scrollLeft === 0;
    const isOnRight = clientX < 0 && scrollLeft + clientWidth + 1 >= scrollWidth;
    const isOnBottom = clientY < 0 && scrollTop + clientHeight + 1 >= scrollHeight;

    if (
        (isVertical && (isOnTop || isOnBottom)) ||
        (!isVertical && (isOnLeft || isOnRight))
    ) {
        return preventDefault(event);
    }
  }

  event.stopPropagation();
  return true;
}


const lock = (targetElement) => {
  if (lockedNum >= 1) return;
  if (isServer()) return;
  if (detectOS().ios) {
    // ios
    if (targetElement) {
      if (targetElement && lockedElements.indexOf(targetElement) === -1) {
        targetElement.ontouchstart = (event) => {
          initialClientX = event.targetTouches[0].clientX;
          initialClientY = event.targetTouches[0].clientY;
        }

        targetElement.ontouchmove = (event) => {
          if (event.targetTouches.length !== 1) return;
          
          handleScroll(event, targetElement);
        }

        lockedElements.push(targetElement);
      }
    }

    if (!documentListenerAdded) {
      document.addEventListener('touchmove', preventDefault, eventListenerOptions)
      documentListenerAdded = true
    }
  } else if (detectOS().android) {
    unLockCallback = setOverflowHiddenMobile()
  }

  lockedNum += 1;
}

const unlock = (targetElement) => {
  if (lockedNum <=0 ) return;
  if (isServer()) return;
  lockedNum -= 1;

  if (
      !detectOS().ios &&
      typeof unLockCallback === 'function'
  ) {
      unLockCallback();
      return;
  }
  // IOS
  if (targetElement) {
    const index = lockedElements.indexOf(targetElement);
    if (index !== -1) {
      targetElement.ontouchstart = null;
      targetElement.ontouchmove = null;
      lockedElements.splice(index, 1);
    }
  }

  if (documentListenerAdded) {
    document.removeEventListener('touchmove', preventDefault, eventListenerOptions);
    documentListenerAdded = false;
  }
} 

export { lock, unlock}