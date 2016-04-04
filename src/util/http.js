// If we wanted to polyfill the fetch API (recommended).
// https://github.com/github/fetch
// require('whatwg-fetch');

const baseUrl = 'http://localhost:3001';

/**
 * Wrap up fetch!
 * @param uri
 * @param options
 */
export function request(uri, options = {}) {
  return fetch(`${baseUrl}/${uri}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options,
  })
    .then(checkStatus)
    .then(res => res.json());
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
      ''
    )
    .replace(/[?&]$/, '');
}

/**
 * Reject the bad apples!
 * @param res
 * @return {*}
 */
function checkStatus(res) {
  if (res.status > 300) {
    const error = new Error(res.statusText);
    error.response = res;
    throw error;
  }

  return res;
}
