import debounce from './debounce';

const FUNC_ERROR_TEXT = 'Expected function';

export default function throttle(func, wait, options) {
  let leading = true;
  let trailing = true;

  if (typeof func !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (typeof options === 'object') {
    leading = 'leading' in options
      ? !!options.leading
      : leading;
    trailing = 'trailing' in options
      ? !!options.trailing
      : trailing;
  }
  return debounce(func, wait, {
    leading,
    maxWait: wait,
    trailing,
  });
}