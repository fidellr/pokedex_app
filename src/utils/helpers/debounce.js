const nativeMax = Math.max;
const nativeMin = Math.min;
const FUNC_ERROR_TEXT = 'Expected function';

export default function debounce(func, wait, options) {
  let lastArgs;
  let lastThis;
  let maxWait;
  let result;
  let timerId;
  let lastCallTime;
  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;

  if (typeof func !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = Number(wait) || 0;
  if (typeof options === 'object') {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing
      ? nativeMax(Number(options.maxWait) || 0, wait)
      : maxWait;
    trailing = 'trailing' in options
      ? !!options.trailing
      : trailing;
  }

  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = undefined;
    lastThis = undefined;

    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    // Either this is the first call, activity has stopped and we're at the trailing
    // edge, the system time has gone backwards and we're treating it as the
    // trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined ||
      (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been debounced at
    // least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = undefined;
    lastThis = undefined;
    return result;
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const waitResult = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(waitResult, maxWait - timeSinceLastInvoke)
      : waitResult;
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }

    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading
      ? invokeFunc(time)
      : result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = undefined;
    lastCallTime = undefined;
    lastThis = undefined;
    timerId = undefined;
  }

  function flush() {
    return timerId === undefined
      ? result
      : trailingEdge(Date.now());
  }

  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
