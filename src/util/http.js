// If we wanted to polyfill the fetch API (recommended).
// https://github.com/github/fetch
// require('whatwg-fetch');

const baseUrl = 'http://localhost:3001';

/**
 * Wrap up fetch!
 * @param url
 * @param options
 */
export function request(uri, options = {}) {
  return fetch(`${baseUrl}/${uri}`, options);
}

/**
 * Convert an object to a query string
 * @param params
 * @return {void|XML|string|*}
 */
export function toQueryString(params) {
  return Object.keys(params)
    .map(key => [key, params[key]].map(encodeURIComponent))
    .reduce(
      (queryString, [key, val]) => `${queryString}${key}=${val}&`,
      '?'
    )
    .replace(/[?&]$/, '');
}
