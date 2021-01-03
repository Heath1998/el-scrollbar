export const isServer = () => typeof window === 'undefined';

export const detectOS = (ua) => {
  ua = ua || navigator.userAgent
  const ipad = /(iPad).*OS\s([\d_]+)/.test(ua)
  const iphone = !ipad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
  const android = /(Android);?[\s/]+([\d.]+)?/.test(ua)
  const ios = iphone || ipad

  return { ios, android }
}

export function getEventListenerOptions (options) {
  /* istanbul ignore if */
  if (isServer()) return false

  if (!options) {
      throw new Error('options must be provided')
  }
  let isSupportOptions = false
  const listenerOptions = {
      get passive () {
          isSupportOptions = true
          return
      },
  }

  /* istanbul ignore next */
  const noop = () => {}
  const testEvent = '__TUA_BSL_TEST_PASSIVE__'
  window.addEventListener(testEvent, noop, listenerOptions)
  window.removeEventListener(testEvent, noop, listenerOptions)

  const { capture } = options

  /* istanbul ignore next */
  return isSupportOptions
      ? options
      : typeof capture !== 'undefined'
          ? capture
          : false
}
