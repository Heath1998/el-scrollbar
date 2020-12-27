export const BAR_MAP = {
    vertical: {
      offset: 'offsetHeight',
      scroll: 'scrollTop',
      scrollSize: 'scrollHeight',
      size: 'height',
      key: 'vertical',
      axis: 'Y',
      client: 'clientY',
      direction: 'top'
    },
    horizontal: {
      offset: 'offsetWidth',
      scroll: 'scrollLeft',
      scrollSize: 'scrollWidth',
      size: 'width',
      key: 'horizontal',
      axis: 'X',
      client: 'clientX',
      direction: 'left'
    }
  };
  
  export function renderThumbStyle({ move, size, bar }) {
    const style = {};
    const translate = `translate${bar.axis}(${ move }%)`;
  
    style[bar.size] = size;
    style.transform = translate;
    style.msTransform = translate;
    style.webkitTransform = translate;
  
    return style;
  };

  function extend(to, _from) {
    for (let key in _from) {
      to[key] = _from[key];
    }
    return to;
  };

  export function toObject(arr) {
    var res = {};
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) {
        extend(res, arr[i]);
      }
    }
    return res;
  };

  export function styleToObject(str){
    const res = {}
    const arr = str.split(';').filter(item=>item);
    for(let i = 0; i < arr.length; i++) {
      const itemArr = arr[i].split(':');
      res[itemArr[0].trim()] = itemArr[1].trim();
    }
    return res;
  }
  